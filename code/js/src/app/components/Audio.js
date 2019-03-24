import React, { useContext, useRef, useImperativeHandle } from 'react'

import { AudioSrcValue } from './AudioSrc';

const HAVE_ENOUGH_DATA = 4

let Audio = ({ name, children }, ref) => {
  let audioRef = useRef()
  let urls = useContext(AudioSrcValue)
  let url = urls[name]

  useImperativeHandle(ref, () => ({
    play: () => {
      let audio = audioRef.current
      if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.play()

      // NOTE: automation-only btw
      window.AppEvents.push({
        type: 'play_audio',
        filename: name
      })
    }
  }))

  return <audio preload='auto' key={url} ref={audioRef}>
    <source
      src={url}
    />
  </audio>
}

Audio = React.forwardRef(Audio)

export default Audio
