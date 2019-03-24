import { DropTarget } from 'react-dnd';
import { fabric } from 'fabric'
import { withSize } from 'react-sizeme'
import React, { useRef, useEffect } from 'react'

import { connectTree } from '../domain/state/tree/react';
import { positionedEntriesList } from '../domain/state/positionedEntries';
import Audio from '../components/Audio';
import doUnArrange from '../domain/doUnArrange';


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
    canvas.on('selection:created', options => {
      options.target.set({
        lockUniScaling: true,
      })
    })
    canvas.on('object:moving', options => {
      snapToGrid(options.target)
      styleMoving(options)
    })
    // canvas.on('mouse:over', options => {
    //   hoverStyle(options.target)
    // })
    // canvas.on('mouse:out', options => {
    //   defaultStyle(options.target)
    // })

    // canvas.on('object:rotating', options => {
    //   snapAngleToGrid(options.target)
    // })
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
        // console.log(options.target)
        // options.target.remove()
      }
    })
    canvas.on('object:modified', () => {
      // console.log(333)
      // console.log(canvas.toJSON(['fileName', 'entryData']))
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
      canvas.add(text)
    })
    canvas.renderAll()
  },[relevant])

  useEffect(() => {
    return () => {
			let canvas = canvasRef.current
			let div = rootRef.current
			let elementCanvas = elementCanvasRef.current

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

// function saveChange(obj) {
//   console.log(555)
//   console.log(obj)
// }

const grid = GRID_STEP
const angleGrid = 18

function pointSnapToGrid(point) {
  return {
    x: Math.round(point.x / grid) * grid,
    y: Math.round(point.y / grid) * grid
  }
}
function snapToGrid(obj) {
  obj.set({
    left: Math.round(obj.left / grid) * grid,
    top: Math.round(obj.top / grid) * grid
  }).setCoords()
}
function snapAngleToGrid(obj) {
  obj.set({
    angle: Math.round(obj.angle / angleGrid) * angleGrid,
  }).setCoords()
}

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
  console.log(11111)
  console.log(entry)
  if (!entry) return
  let { fileName } = entry
  console.log(fileName)
  if (!fileName) return
  let audio = refs[fileName]
  console.log(audio)
  console.log(refs)
  if (!audio) return
  audio.play()
}

Interactive = withSize({ monitorHeight: true })(Interactive)
Interactive = DropTarget(DRAGGABLE_ENTRY, squareTarget, collect)(Interactive)

let connection = [
  positionedEntriesList,
]

let InteractivePureIsh = Interactive
export { InteractivePureIsh }
export default connectTree(connection)(Interactive)
