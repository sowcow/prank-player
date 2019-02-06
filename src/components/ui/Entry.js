import { Box } from 'reflexbox'
import { DragSource } from 'react-dnd'
import React from 'react'

import { DRAGGABLE_ENTRY } from '../../lib/drag'

const cardSource = {
  beginDrag (props) {
    return {}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let ellipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

let Entry = ({ entry, isDragging, connectDragSource }) => {
  let name = isDragging ? '' : entry.name
  return connectDragSource(
    <div
      style={{
        // mr={2}
        // ml={2}
        // w={150}
        display: 'flex',
        paddingRight: 16,
        paddingLeft: 16,
        width: 150,

        // opacity: isDragging ? 0.5 : 1,
        flexShrink: 0,
        color: 'white',
        textAlign: 'center'
      }}
    >
      <div style={{ height: '100%', display: 'flex' }}>
        <span style={{ margin: 'auto', ...ellipsis }}>
          {name}
        </span>
      </div>
    </div>
  )
}

let draggable = DragSource(
  DRAGGABLE_ENTRY,
  cardSource,
  collect
)(Entry)

export default draggable
