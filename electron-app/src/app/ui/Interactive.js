import { DropTarget } from 'react-dnd'
import { fabric } from 'fabric'
import { withSize } from 'react-sizeme'
import React, { useRef, useEffect, useContext } from 'react'

import { AudioSrcValue } from '../components/AudioSrc'
import { PlayerInstance } from '../misc/Player'
import { audioDeviceGet } from '../domain/state/audioDevice'
import { connectTree } from '../domain/state/tree/react'
import {
  currentlyPlaying,
  currentlyPlayingStatus
} from '../domain/state/playbackState'
import { deletedEntriesList } from '../domain/state/deletedEntries'
import { isEditingState } from '../domain/state/mainState'
import { positionedEntriesList } from '../domain/state/positionedEntries'
import Audio from '../components/Audio'
import doUnArrange from '../domain/doUnArrange'

let getEditingState = isEditingState
let globalFabricCanvas = null

function defaultize (canvas) {
  canvas.forEachObject(function (object) {
    defaultStyle(object)
  })
}
function getFabricState () {
  if (!globalFabricCanvas) return
  defaultize(globalFabricCanvas)
  return globalFabricCanvas.toJSON(['fileName', 'entryData'])
}
let makePromise = () => {
  let doResolve
  let doReject
  let promise = new Promise((resolve, reject) => {
    doResolve = resolve
    doReject = reject
  })
  promise.resolve = doResolve
  promise.reject = doReject
  return promise
}

function setFabricState (data, promise = null) {
  promise = promise || makePromise()

  if (!globalFabricCanvas) {
    setTimeout(() => setFabricState(data, promise), 10)
    return promise
  }

  globalFabricCanvas.loadFromJSON(data, () => {
    promise.resolve()
  })
  return promise
}
function fabricUpdateDeletedStyle () {
  let recurse = () => fabricUpdateDeletedStyle()
  if (!globalFabricCanvas) return setTimeout(recurse, 100)

  let deleted = deletedEntriesList.get()
  globalFabricCanvas
    .getObjects()
    .forEach(x => updateOneDeletedStyle(x, deleted))
}

function updateOneDeletedStyle (obj, deleted) {
  let { entryData } = obj
  if (!entryData) return

  let { fileName } = entryData
  if (!fileName) return

  if (deleted.find(x => x.fileName === fileName)) {
    obj.set({ linethrough: true })
    obj.canvas.renderAll()
  }
}

export { getFabricState, setFabricState, fabricUpdateDeletedStyle }

const GRID_STEP = 20
const SOME_DELTA = -24 // acconts for padding or so
const DELTA_X = -10
const DELTA_Y = -10
const TEXT_STYLE = defaultTextStyle()

const DRAGGABLE_ENTRY = 'DRAGGABLE_ENTRY'
const squareTarget = {
  drop (props, monitor) {
    let dropPoint = monitor.getClientOffset()
    dropPoint.x += SOME_DELTA + DELTA_X
    dropPoint.y += SOME_DELTA + DELTA_Y
    dropPoint = pointSnapToGrid(dropPoint)
    return { dropPoint }
  }
}
function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

let Interactive = ({
  positionedEntriesList,
  audioDeviceGet,
  isEditingState,
  currentlyPlaying,
  currentlyPlayingStatus,
  isOver,
  connectDropTarget,
  size: { width, height }
}) => {
  let rootRef = useRef()
  let canvasRef = useRef()
  let elementCanvasRef = useRef()
  let refs = useRef({})

  useEffect(() => {
    let div = rootRef.current
    let elementCanvas = document.createElement('canvas')
    div.appendChild(elementCanvas)
    let canvas = new fabric.Canvas(elementCanvas, {
      stopContextMenu: true,
      fireRightClick: true
    })
    globalFabricCanvas = canvas
    canvas.on('selection:created', options => {
      options.target.set({
        lockUniScaling: true
      })
    })
    canvas.on('object:moving', options => {
      snapToGrid(options)
      styleMoving(options)
    })
    canvas.on('object:scaling', options => {
      snapScale(options)
    })
    canvas.on('selection:created', options => {
      omgStyle(options.target)
    })

    canvas.on('object:rotating', options => {
      snapAngleToGrid(options)
    })
    canvas.on('mouse:down', ({ e, target }) => {
      let RIGHT = 2
      let isEditingState = getEditingState.get()

      if (!isEditingState || e.button === RIGHT) {
        if (!target) return
        let { entryData } = target
        playPreview(refs.current, entryData, isEditingState, e.button)
      }
    })

    canvas.on('mouse:up', options => {
      let { transform } = options
      if (!transform) return
      let drag = transform.action === 'drag'
      if (!drag) return

      if (isInDeleteCorner(options)) {
        canvas.getActiveObjects().forEach(x => {
          doUnArrange(x.entryData)
          canvas.remove(x)
        })
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }
    })

    canvasRef.current = canvas
    elementCanvasRef.current = elementCanvas
  }, [])

  useEffect(() => {
    let canvas = canvasRef.current
    canvas.setDimensions({ width, height })
  }, [width, height])

  let relevant =
    positionedEntriesList
      .map(x => [x.name, x.position.x, x.position.y, x.uid].join('+'))
      .join(' - ') || 'empty'

  let urls = useContext(AudioSrcValue)

  useEffect(() => {
    let canvas = canvasRef.current

    let them = canvas.getObjects()

    let extractFileName = x => x && x.entryData && x.entryData.fileName

    // XXX: some bs behavior...
    if (!them) return
    let having = them.map(extractFileName).filter(x => !!x)
    let toAdd = positionedEntriesList.filter(
      x => !having.find(y => y === x.fileName)
    )

    toAdd.forEach(x => {
      let style = {
        left: x.position.x,
        top: x.position.y,
        ...TEXT_STYLE
      }
      const AUDIO = 'AUDIO'
      if (x.kind === AUDIO) {
        let text = new fabric.IText(x.name, style)
        text.set('entryData', x)
        omgStyle(text)
        canvas.add(text)
      } else {
        let url = urls[x.fileName]
        fabric.Image.fromURL(url, function (obj) {
          obj.set(style)
          obj.set('entryData', x)
          canvas.add(obj)
        })
      }
    })
    canvas.renderAll()
    // eslint-disable-next-line
  }, [relevant])

  useEffect(() => {
    let canvas = canvasRef.current
    canvas.discardActiveObject()

    canvas.forEachObject(function (object) {
      defaultStyle(object)
      object.selectable = isEditingState
      if (object.editable != null) {
        object.editable = isEditingState
      }
    })

    canvas.selection = isEditingState

    if (isEditingState) {
      canvas.hoverCursor = 'move'
    } else {
      canvas.hoverCursor = 'default'
    }

    canvas.requestRenderAll()
  }, [isEditingState, relevant])

  function playingStyle (x) {
    x.set({
      underline: true,
      textBackgroundColor: 'rgba(255,255,255, 0)'
    })
  }
  function pausedStyle (x) {
    x.set({
      underline: true,
      textBackgroundColor: 'rgba(255,255,255, 0)'
    })
  }
  function endedStyle (x) {
    x.set({
      underline: false,
      textBackgroundColor: 'rgba(255,255,255, 0)'
    })
  }

  useEffect(() => {
    let status = currentlyPlayingStatus
    if (!currentlyPlaying) return
    let { name: current } = currentlyPlaying

    let canvas = canvasRef.current

    canvas.forEachObject(function (object) {
      let { entryData } = object
      if (!entryData) return
      let { fileName } = entryData

      if (fileName === current) {
        if (status === 'pause') {
          pausedStyle(object)
        } else if (status === 'ended') {
          endedStyle(object)
        } else if (status === 'play') {
          playingStyle(object)
        }
      } else {
        if (object.underline) endedStyle(object) // NOTE:
      }
    })
    canvas.requestRenderAll()
  }, [currentlyPlaying, currentlyPlayingStatus])

  useEffect(() => {
    let div = rootRef.current
    let canvas = canvasRef.current
    let elementCanvas = elementCanvasRef.current

    return () => {
      globalFabricCanvas = null
      canvas.dispose()
      div.removeChild(elementCanvas)
    }
  }, [])

  return connectDropTarget(
    <div style={{ height: '100%' }}>
      <div ref={rootRef} style={{ height: '100%' }} />
      {positionedEntriesList.map(x => (
        <Audio
          name={x.fileName}
          key={x.fileName}
          audioDeviceGet={audioDeviceGet}
          ref={y => {
            refs.current[x.fileName] = y
          }}
        />
      ))}
    </div>
  )
}

const grid = GRID_STEP
const angleGrid = 18

function pointSnapToGrid (point) {
  return {
    x: Math.round(point.x / grid) * grid,
    y: Math.round(point.y / grid) * grid
  }
}
function withSnapBehavior (e) {
  let someKey = e.shiftKey || e.ctrlKey || e.metaKey || e.altKey
  return !someKey
}
function scaleGrid (value) {
  let grid = 1
  if (value < 1) grid = 0.5
  if (value >= 3) grid = 2
  return grid
}
function snapScale ({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target
  let value = obj.scaleX
  let grid = scaleGrid(value)
  value = Math.round(value / grid) * grid

  obj
    .set({
      scaleX: value,
      scaleY: value
    })
    .setCoords()
}
function snapToGrid ({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target

  obj
    .set({
      left: Math.round(obj.left / grid) * grid,
      top: Math.round(obj.top / grid) * grid
    })
    .setCoords()
}
function snapAngleToGrid ({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target

  setOriginToCenter(obj)

  obj
    .set({
      angle: Math.round(obj.angle / angleGrid) * angleGrid
    })
    .setCoords()

  setCenterToOrigin(obj)
}

function setOriginToCenter (obj) {
  obj._originalOriginX = obj.originX
  obj._originalOriginY = obj.originY

  var center = obj.getCenterPoint()

  obj.set({
    originX: 'center',
    originY: 'center',
    left: center.x,
    top: center.y
  })
}

function setCenterToOrigin (obj) {
  var originPoint = obj.translateToOriginPoint(
    obj.getCenterPoint(),
    obj._originalOriginX,
    obj._originalOriginY
  )

  obj.set({
    originX: obj._originalOriginX,
    originY: obj._originalOriginY,
    left: originPoint.x,
    top: originPoint.y
  })
}

function defaultStyle (obj) {
  if (!obj) return
  obj.set({
    underline: false,
    ...TEXT_STYLE
  })
  obj.canvas.renderAll()
}

function defaultTextStyle () {
  return {
    underline: false,
    textBackgroundColor: 'rgba(255,255,255, 0)',
    padding: 10,
    fontSize: 24,
    fontFamily: 'Courier',
    lockUniScaling: true,
    fill: '#373d3f'
  }
}

const DELETE_CORNER = 100
function styleMoving (given) {
  let obj = given.target
  if (!obj) return
  if (isInDeleteCorner(given)) {
    let them = obj.canvas.getActiveObjects()
    them.forEach(x => x.set({ fill: 'red' }))
  } else {
    let them = obj.canvas.getActiveObjects()
    them.forEach(x => x.set(TEXT_STYLE))
  }
}
function isInDeleteCorner (given) {
  let obj = given.target
  if (!obj) return
  let x = given.e.clientX
  let y = given.e.clientY
  let canvas = obj.canvas
  let width = canvas.getWidth()
  let height = canvas.getHeight()

  return x > width - DELETE_CORNER && y > height - DELETE_CORNER
}

function playPreview (refs, entry, isEditing, mouseButton) {
  if (!entry) return
  let { fileName } = entry
  if (!fileName) return
  let audio = refs[fileName]
  if (!audio) return

  let LEFT = 0
  let RIGHT = 2

  if (isEditing && mouseButton === RIGHT) {
    PlayerInstance.playFromStart(audio, isEditing)
  } else if (!isEditing && mouseButton === LEFT) {
    PlayerInstance.playOrPause(audio, isEditing)
  } else if (!isEditing && mouseButton === RIGHT) {
    PlayerInstance.playFromStart(audio, isEditing)
  }
}

function omgStyle (x) {
  x.lockScalingFlip = true
  x.setControlsVisibility({
    tl: false,
    tr: false,
    bl: false
  })
}

Interactive = withSize({ monitorHeight: true })(Interactive)
Interactive = DropTarget(DRAGGABLE_ENTRY, squareTarget, collect)(Interactive)

let connection = [
  positionedEntriesList,
  audioDeviceGet,
  isEditingState,
  currentlyPlaying,
  currentlyPlayingStatus
]

let InteractivePureIsh = Interactive
export { InteractivePureIsh }
export default connectTree(connection)(Interactive)
