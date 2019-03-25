import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import Audio from '../components/Audio';
import doArrange from '../domain/doArrange';

const DRAGGABLE_ENTRY = 'DRAGGABLE_ENTRY'

const cardSource = {
  beginDrag (props) {
    return {}
  },
  endDrag(props, monitor) {
    if (!monitor.getDropResult()) return
    let { entry } = props
    let { dropPoint } = monitor.getDropResult()
    doArrange(entry, dropPoint)
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

let rootStyle = {
  cursor: 'move',

  margin: 0,
  padding: 0,
  display: 'flex',
  paddingRight: 16,
  paddingLeft: 16,
  width: 150,

  flexShrink: 0,
  textAlign: 'center',
  height: 50,

  // color: 'white',
  color: '#f2f3f4',
  fontFamily: 'Courier',
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

let Entry = ({ entry, isDragging, connectDragSource,
  connectDragPreview
}) => {
  let { name, fileName } = entry
  let text = isDragging ? '' : name
  let audioRef = useRef()

  useEffect(() => {
    if (connectDragPreview) {
      connectDragPreview(
        getEmptyImage(),
        {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
    }
  },[])

  return connectDragSource(
    <div
      className='new-entries-item'
      style={rootStyle}
      onClick={() => audioRef.current && audioRef.current.play()}
    >
      <Audio name={fileName} ref={audioRef} />
      <Ellipsis>
        {text}
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