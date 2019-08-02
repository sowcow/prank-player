import React from 'react'
import { DragLayer } from 'react-dnd'

const DraggedEntry = () =>
  <div>
    hello
  </div>

const DRAGGABLE_ENTRY = 'DRAGGABLE_ENTRY'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform: transform,
    WebkitTransform: transform,
  }
}

function CustomDragLayer(props) {
  let { item, itemType, isDragging } = props
  if (!isDragging) {
    return null
  }

  function renderItem(type, item) {
    switch (type) {
      case DRAGGABLE_ENTRY:
        return <DraggedEntry />
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem(itemType, item)}</div>
    </div>
  )
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

export default DragLayer(collect)(CustomDragLayer)
