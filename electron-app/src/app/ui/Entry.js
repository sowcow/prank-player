import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import { audioDeviceGet } from '../domain/state/audioDevice';
import { connectTree } from '../domain/state/tree/react';
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

  color: '#f2f3f4',
  fontFamily: 'Courier',
}

let fakeStyle = {
  ...rootStyle,
  width: 0,
  padding: 0,
  paddingLeft: 0,
  paddingRight: 0,
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
  audioDeviceGet,
  connectDragPreview,
  fake
}) => {
  if (fake) entry = {}
  let { name, fileName } = entry
  let text = isDragging ? '' : name
  let audioRef = useRef()

  useEffect(() => {
    if (connectDragPreview) {
      connectDragPreview(
        getEmptyImage(),
        {
        captureDraggingState: true,
      });
    }
  // eslint-disable-next-line
  },[])

  if (fake) {
    return (
      <div
        className='new-entries-item'
        style={fakeStyle}
      >
      </div>
    )
  }

  return connectDragSource(
    <div
      className='new-entries-item'
      style={rootStyle}
      onMouseDown={e => {
        let { current } = audioRef
        if (!current) return

        let LEFT = 0
        let RIGHT = 2
        if (e.button === LEFT) {
        } else if (e.button === RIGHT) {
          current.playFromStart()
        }
      }}
      onClick={e => {
        let { current } = audioRef
        if (!current) return

        let LEFT = 0
        let RIGHT = 2
        if (e.button === LEFT) {
          current.playOrPause()
        } else if (e.button === RIGHT) {
          current.playFromStart()
        }
      }}
    >
      <Audio name={fileName} ref={audioRef}
        audioDeviceGet={audioDeviceGet}
      />
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

let connection = [
  audioDeviceGet,
]
let result = connectTree(connection)(draggable)

export default result
