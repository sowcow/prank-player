import { DropTarget } from 'react-dnd';
import { fabric } from 'fabric'
import { withSize } from 'react-sizeme'
import React, { useRef, useEffect } from 'react'

import { connectTree } from '../domain/state/tree/react';
import { positionedEntriesList } from '../domain/state/positionedEntries';
import Audio from '../components/Audio';
import doUnArrange from '../domain/doUnArrange';


let globalFabricCanvas = null

function getFabricState() {
  if (!globalFabricCanvas) return
  return globalFabricCanvas.toJSON(['fileName', 'entryData'])
}
function setFabricState(data) {
  if (!globalFabricCanvas) return setTimeout(
    () => setFabricState(data),
    500
  )
  return globalFabricCanvas.loadFromJSON(data)
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

    canvas.on('object:rotating', options => {
      snapAngleToGrid(options)
    })
    canvas.on('mouse:up', ({ e, target }) => {
      if (e.button === 2) {
        if (!target) return
        let { entryData } = target
        playPreview(refs.current, entryData)
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

  useEffect(() => {
		let canvas = canvasRef.current

    let them = canvas.getObjects()

    // XXX: some bs behavior...
    if (!them) return
    let having = them.map(x => x.fileName)
      .filter(x => !!x)
    let toAdd = positionedEntriesList.filter(x =>
      !having.find(y => y == x.fileName)
    )

		// canvas.clear()
    // let toAdd = positionedEntriesList

    toAdd.forEach(x => {
      let text = new fabric.IText(x.name, {
        left: x.position.x,
        top: x.position.y,
        ...TEXT_STYLE,
      })
      text.set('fileName', x.fileName)
      text.set('entryData', x)
      omgStyle(text)
      canvas.add(text)
    })
    canvas.renderAll()
  },[relevant])

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
function useSnapBehavior(e) {
  let someKey = e.shiftKey || e.ctrlKey || e.metaKey
  return !someKey
}
function scaleGrid(value) {
  let grid = 1
  if (value < 1) grid = 0.5
  if (value >= 3) grid = 2
  return grid
}
function snapScale({ e, target }) {
  if (!useSnapBehavior(e)) return
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
  if (!useSnapBehavior(e)) return
  let obj = target

  obj.set({
    left: Math.round(obj.left / grid) * grid,
    top: Math.round(obj.top / grid) * grid
  }).setCoords()
}
function snapAngleToGrid({ e, target }) {
  if (!useSnapBehavior(e)) return
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

function playPreview(refs,entry) {
  if (!entry) return
  let { fileName } = entry
  if (!fileName) return
  let audio = refs[fileName]
  if (!audio) return
  audio.play()
}

function omgStyle(x) {
  x.lockScalingFlip = true
  x.setControlsVisibility({
    tl: false,
    tr: false,
    bl: false,
  })
}

Interactive = withSize({ monitorHeight: true })(Interactive)
Interactive = DropTarget(DRAGGABLE_ENTRY, squareTarget, collect)(Interactive)

let connection = [
  positionedEntriesList,
]

let InteractivePureIsh = Interactive
export { InteractivePureIsh }
export default connectTree(connection)(Interactive)
