import { DragSource } from 'react-dnd'
import React, { useRef } from 'react'
import styled from 'styled-components'

import Audio from '../components/Audio';

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
  cursor: 'move',

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

const playAudio = (x, audio) => {
  audio.play()

  // TODO: move, automation-only btw
  window.AppEvents.push({
    type: 'play_audio',
    filename: x.fileName
  })
}

let Entry = ({ entry, isDragging, connectDragSource }) => {
  let { name, fileName } = entry
  let text = isDragging ? '' : name
  let audioRef = useRef()

  return connectDragSource(
    <div
      className='new-entries-item'
      style={rootStyle}
      onClick={() => playAudio(entry, audioRef.current)}
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
