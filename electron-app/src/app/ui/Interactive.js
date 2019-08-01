import { DropTarget } from 'react-dnd';
import { fabric } from 'fabric'
import { withSize } from 'react-sizeme'
import React, { useRef, useEffect, useContext } from 'react'

import { AudioSrcValue } from '../components/AudioSrc';
import { PlayerInstance } from '../misc/Player';
import { audioDeviceGet } from '../domain/state/audioDevice';
import { connectTree } from '../domain/state/tree/react';
import {
  // currentlyEnded,
  // currentlyPaused,
  currentlyPlaying,
  currentlyPlayingStatus,
} from '../domain/state/playbackState';
import { deletedEntriesList } from '../domain/state/deletedEntries';
import { isEditingState } from '../domain/state/mainState';
import { positionedEntriesList } from '../domain/state/positionedEntries';
import Audio from '../components/Audio';
import doUnArrange from '../domain/doUnArrange';


let getEditingState = isEditingState
let getCurrentlyPlayingStatus = currentlyPlayingStatus
let getCurrentlyPlaying = currentlyPlaying
// let getCurrentlyPaused = currentlyPaused
// let getCurrentlyEnded = currentlyEnded
let globalFabricCanvas = null

function getFabricState() {
  if (!globalFabricCanvas) return
  return globalFabricCanvas.toJSON(['fileName', 'entryData'])
}
function setFabricState(data) {
  if (!globalFabricCanvas) return setTimeout(
    () => setFabricState(data),
    100
  )
  globalFabricCanvas.loadFromJSON(data)
  fabricUpdateDeletedStyle()
}
function fabricUpdateDeletedStyle() {
  let recurse = () => fabricUpdateDeletedStyle()
  if (!globalFabricCanvas) return setTimeout(recurse, 100)

  let deleted = deletedEntriesList.get()
  globalFabricCanvas.getObjects().forEach( x =>
    updateOneDeletedStyle(x, deleted)
  )
}

function updateOneDeletedStyle(obj, deleted) {
  let { entryData } = obj
  if (!entryData) return

  let { fileName } = entryData
  if (!fileName) return

  if (deleted.find(x => x.fileName === fileName)) {
    obj.set({ linethrough: true })
    obj.canvas.renderAll()
  }
}

export { getFabricState, setFabricState }

const GRID_STEP = 20
const SOME_DELTA = -24 // acconts for padding or so
const DELTA_X = -10
const DELTA_Y = -10
const TEXT_STYLE = defaultTextStyle()

const DRAGGABLE_ENTRY = 'DRAGGABLE_ENTRY'
const squareTarget = {
  drop(props, monitor) {
    // let dropPoint = monitor.getSourceClientOffset()
    let dropPoint = monitor.getClientOffset()
    dropPoint.x += SOME_DELTA + DELTA_X
    dropPoint.y += SOME_DELTA + DELTA_Y
    dropPoint = pointSnapToGrid(dropPoint)
    return { dropPoint }
  },
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}


// let Root = styled.div`
//   height: 100%;
// `

let Interactive = ({
  positionedEntriesList,
  audioDeviceGet,
  isEditingState,
  // currentlyEnded,
  // currentlyPaused,
  currentlyPlaying,
  currentlyPlayingStatus,
  // deletedEntriesList,
  isOver, connectDropTarget, size: { width, height } }) => {

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
      fireRightClick: true,
    })
    globalFabricCanvas = canvas
    canvas.on('selection:created', options => {
      options.target.set({
        lockUniScaling: true,
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

    // canvas.on('mouse:over', options => {
    //   hoverStyle(options.target)
    // })
    // canvas.on('mouse:out', options => {
    //   if (!options.target.entryData) return
    //   defaultStyle(options.target)
    // })

    // canvas.on('selection:created', ({ e, target }) => {
    //   // let isEditing = getEditingState.get()
    //   console.log(e)
    //   e.preventDefault()
    //   e.cancelBubble = true
    //   return false
    // })

    canvas.on('object:rotating', options => {
      snapAngleToGrid(options)
    })
    canvas.on('mouse:down', ({ e, target }) => {
      if (e.button === 2 || (!isEditingState)) {
        if (!target) return
        let { entryData } = target
        playPreview(refs.current, entryData, isEditingState, e.button)
      }
    })

    canvas.on('mouse:up', options => {
      // saveChange(options.target)
      // styleMoving(options.target)
      let { transform } = options
      if (!transform) return
      let drag = transform.action == 'drag'
      if (!drag) return

      if (isInDeleteCorner(options)) {
        canvas.getActiveObjects().forEach(
          x => {
            doUnArrange(x.entryData)
            canvas.remove(x)
          }
        )
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        //     canvas.remove(canvas.getActiveObject())
        //   }
        // if (canvas.getActiveGroup()) {
        //   canvas.getActiveGroup().forEachObject(a => {
        //     canvas.remove(a)
        //   })
        //   canvas.discardActiveGroup()
        // } else {
        //   if (canvas.getActiveObject()) {
        //     canvas.remove(canvas.getActiveObject())
        //   }
        // }
        // options.target.remove()
      }
    })

		canvasRef.current = canvas
		elementCanvasRef.current = elementCanvas
	}, [])

  useEffect(() => {
		let canvas = canvasRef.current
		canvas.setDimensions({ width, height })
  }, [width, height])

  let relevant = positionedEntriesList.map(x =>
    [x.name, x.position.x, x.position.y, x.uid].join('+')
  ).join(' - ') || 'empty'

  let urls = useContext(AudioSrcValue)

  useEffect(() => {
		let canvas = canvasRef.current

    let them = canvas.getObjects()

    let extractFileName = x =>
      x && x.entryData && x.entryData.fileName

    // XXX: some bs behavior...
    if (!them) return
    let having = them.map(extractFileName)
      .filter(x => !!x)
    let toAdd = positionedEntriesList.filter(x =>
      !having.find(y => y == x.fileName)
    )

		// canvas.clear()
    // let toAdd = positionedEntriesList

    toAdd.forEach(x => {
      // let dynamicStyle = {}
      // if (deletedEntriesList.find(y => y.fileName == x.fileName)) {
      //   dynamicStyle = {
      //     color: 'orange'
      //   }
      // }

      let style = {
          left: x.position.x,
          top: x.position.y,
          ...TEXT_STYLE,
      }
      const AUDIO = 'AUDIO'
      if (x.kind === AUDIO) {
        let text = new fabric.IText(x.name, style)
        text.set('entryData', x)
        omgStyle(text)
        canvas.add(text)
      } else {

        let url = urls[x.fileName]
        fabric.Image.fromURL(url, function(obj) {
          obj.set(style)
          obj.set('entryData', x)
          canvas.add(obj)
        })
      }
    })
    canvas.renderAll()
  },[relevant])

  useEffect(() => {
    // return () => {
      // let isEditingState = getEditingState.get() // XXX: ugly
			let canvas = canvasRef.current
      // canvas.getObjects().forEach( x =>
      //   reactToEditing(x, isEditingState)
      // )
      canvas.discardActiveObject()

      // canvas.deactivateAll()
      // canvas.renderAll()

      canvas.forEachObject(function(object){
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
		// }
	}, [isEditingState])

  function playingStyle(x) {
    x.set({
      underline: true,
      textBackgroundColor: 'rgba(255,255,255, 1)'
    })
  }
  function pausedStyle(x) {
    x.set({
      underline: true,
      textBackgroundColor: 'rgba(255,255,255, 0)'
    })
  }
  function endedStyle(x) {
    x.set({
      underline: false,
      textBackgroundColor: 'rgba(255,255,255, 0)'
    })
  }

  useEffect(() => {
    let status = currentlyPlayingStatus
    // let status = getCurrentlyPlayingStatus.get()
    // let currentlyPlaying = getCurrentlyPlaying.get()
    if (!currentlyPlaying) return
    let { name: current } = currentlyPlaying

    // let currentlyPaused = getCurrentlyPaused.get()
    // let currentlyEnded = getCurrentlyEnded.get()
    // if (!currentlyPlaying) return

    // if (sta)

    let canvas = canvasRef.current

    canvas.forEachObject(function(object){
      let matched = false
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

      /*
        if (object.entryData && currentlyPaused && object.entryData.fileName == currentlyPaused.name) {
          object.set({
            underline: true,
            textBackgroundColor: 'rgba(255,255,255, 0)'
          })
          matched = true
        }
        if (object.entryData && currentlyPlaying && object.entryData.fileName == currentlyPlaying.name) {
          object.set({
            underline: true,
            textBackgroundColor: 'rgba(255,255,255, 1)'
          })
          matched = true
        }
        if (object.entryData && currentlyEnded && object.entryData.fileName == currentlyEnded.name) {
          object.set({
            underline: false,
            textBackgroundColor: 'rgba(255,255,255, -1)'
          })
          matched = true
        }
        */
          // if (status === 'pause') {
          //   object.set({
          //     underline: true,
          //     textBackgroundColor: 'rgba(255,255,255, 0)'
          //   })
          // } else if (status === 'ended') {
          //   object.set({
          //     underline: false,
          //     textBackgroundColor: 'rgba(255,255,255, -1)'
          //   })
          // } else if (status === 'play') {
          //   object.set({
          //     underline: true,
          //     textBackgroundColor: 'rgba(255,255,255, 1)'
          //   })
          // }
        // } else if (object.entryData && object.underline) {
        //   object.set({
        //     underline: false,
        //     textBackgroundColor: 'rgba(255,255,255, 0)'
        //   })
        // }
        // if (!matched) {
        //   if (object.entryData && object.underline) { // XXX: quick mess
        //     object.set({
        //       underline: false,
        //       textBackgroundColor: 'rgba(255,255,255, 0)'
        //     })
        //   }
        // }
      // })

			// canvas.requestRenderAll()
		// }
  }, [currentlyPlaying, currentlyPlayingStatus])
    //currentlyPaused, currentlyEnded])

  useEffect(() => {
    return () => {
			let canvas = canvasRef.current
			let div = rootRef.current
			let elementCanvas = elementCanvasRef.current

      globalFabricCanvas = null
      canvas.dispose()
      div.removeChild(elementCanvas)
		}
	}, [])

  return connectDropTarget(
		<div style={{ height: '100%' }}>
      { /*<CustomDragLayer />*/ }
			<div ref={rootRef} style={{ height: '100%' }}>
			</div>
      {positionedEntriesList.map( x =>
        <Audio name={x.fileName} key={x.fileName}
          audioDeviceGet={audioDeviceGet}
          ref={y => {
            refs.current[x.fileName] = y
          }}
        />
      )}
    </div>
  )
}

const grid = GRID_STEP
const angleGrid = 18

function pointSnapToGrid(point) {
  return {
    x: Math.round(point.x / grid) * grid,
    y: Math.round(point.y / grid) * grid
  }
}
function withSnapBehavior(e) {
  let someKey = e.shiftKey || e.ctrlKey || e.metaKey || e.altKey
  return !someKey
}
function scaleGrid(value) {
  let grid = 1
  if (value < 1) grid = 0.5
  if (value >= 3) grid = 2
  return grid
}
function snapScale({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target
  let value = obj.scaleX
  let grid = scaleGrid(value)
  value = Math.round(value / grid) * grid

  obj.set({
    scaleX: value,
    scaleY: value
  }).setCoords()
}
function snapToGrid({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target

  obj.set({
    left: Math.round(obj.left / grid) * grid,
    top: Math.round(obj.top / grid) * grid
  }).setCoords()
}
function snapAngleToGrid({ e, target }) {
  if (!withSnapBehavior(e)) return
  let obj = target

  setOriginToCenter(obj)

  obj.set({
    angle: Math.round(obj.angle / angleGrid) * angleGrid,
  }).setCoords()

  setCenterToOrigin(obj)
}


function setOriginToCenter (obj) {
    obj._originalOriginX = obj.originX;
    obj._originalOriginY = obj.originY;

    var center = obj.getCenterPoint();

    obj.set({
        originX: 'center',
        originY: 'center',
        left: center.x,
        top: center.y
    });
};

function setCenterToOrigin (obj) {
    var originPoint = obj.translateToOriginPoint(
    obj.getCenterPoint(),
    obj._originalOriginX,
    obj._originalOriginY);

    obj.set({
        originX: obj._originalOriginX,
        originY: obj._originalOriginY,
        left: originPoint.x,
        top: originPoint.y
    });
};


function hoverStyle(obj) {
  if (!obj) return
  obj.set({
    underline: true,
    // borderColor: 'orange',
    // hasBorders: true,
  })
  obj.canvas.renderAll()
}
function defaultStyle(obj) {
  if (!obj) return
  obj.set({
    underline: false,
    ...TEXT_STYLE
    // borderColor: 'orange',
    // hasBorders: false,
  })
  obj.canvas.renderAll()
}

function defaultTextStyle() {
  return {
    // padding: 16,
    padding: 10,
    // padding: 20,
        fontSize: 24,
        fontFamily: 'Courier',
        lockUniScaling: true,
        fill: '#373d3f',

        // originX: 'center',
        // originY: 'center',
        // fill: 'white',
        // textBackgroundColor: '#3f51b5',
        // textBackgroundColor: 'rgb(0,200,0)'
        // fill: '#093145',
  }
}

const DELETE_CORNER = 100
function styleMoving(given) {
  let obj = given.target
  if (!obj) return
  if (isInDeleteCorner(given)) {
    let them = obj.canvas.getActiveObjects()
    them.forEach(x => x.set({ fill: 'red' }) )
    // obj.set({ fill: 'red' })
  } else {
    let them = obj.canvas.getActiveObjects()
    them.forEach(x => x.set(TEXT_STYLE) )
    // obj.set(TEXT_STYLE)
  }
}
function isInDeleteCorner(given) {
  let obj = given.target
  if (!obj) return
  let x = given.e.clientX
  let y = given.e.clientY
  let canvas = obj.canvas
  let width = canvas.getWidth()
  let height = canvas.getHeight()

  return x > width - DELETE_CORNER && y > height - DELETE_CORNER
}

function playPreview(refs,entry,isEditing, mouseButton) {
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
  // audio.play()
}

function omgStyle(x) {
  x.lockScalingFlip = true
  x.setControlsVisibility({
    tl: false,
    tr: false,
    bl: false,
  })
}

function reactToEditing(x, isEditing) {
	x.set({ hasControls: isEditing, selectable: isEditing })
}

Interactive = withSize({ monitorHeight: true })(Interactive)
Interactive = DropTarget(DRAGGABLE_ENTRY, squareTarget, collect)(Interactive)

let connection = [
  positionedEntriesList,
  audioDeviceGet,
  isEditingState,
  currentlyPlaying,
  currentlyPlayingStatus,
  // currentlyPaused,
  // currentlyEnded,
  // deletedEntriesList,
]

let InteractivePureIsh = Interactive
export { InteractivePureIsh }
export default connectTree(connection)(Interactive)
