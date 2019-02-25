import { DragSource } from 'react-dnd'
import styled from 'styled-components'
import React from 'react'

const DRAGGABLE_ENTRY = 'DRAGGABLE_ENTRY'

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

let rootStyle = {
  margin: 0,
  padding: 0,
  display: 'flex',
  paddingRight: 16,
  paddingLeft: 16,
  width: 150,

  flexShrink: 0,
  color: 'white',
  textAlign: 'center',
  height: 50,
}

let Ellipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;

  margin: 0;
  padding: 0;

  margin: auto;
`

let Entry = ({ entry, isDragging, connectDragSource }) => {
  let name = isDragging ? '' : entry.name

  return connectDragSource(
    <div
      className='new-entries-item'
      style={rootStyle}
    >
        <Ellipsis>
          {name}
        </Ellipsis>
    </div>
  )
}

let draggable = DragSource(
  DRAGGABLE_ENTRY,
  cardSource,
  collect
)(Entry)

export default draggable
