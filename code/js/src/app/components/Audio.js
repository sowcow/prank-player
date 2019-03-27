import React, { useContext, useRef, useImperativeHandle, useEffect } from 'react'

import { AudioSrcValue } from './AudioSrc';
import { connectTree } from '../domain/state/tree/react';

const HAVE_ENOUGH_DATA = 4

// NOTE: very ugly manual passing of audioDeviceGet from all parents
// cuz imperative stuff breaks if ya wrap this
// gotta use context the next time!
let Audio = ({ name, children, audioDeviceGet }, ref) => {
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

  let { deviceId } = audioDeviceGet
  useEffect(() => {
    let audio = audioRef.current
    if (!audio) return
    audio.setSinkId(deviceId)
  }, [deviceId])

  return <audio preload='auto' key={url} ref={audioRef}>
    <source
      src={url}
    />
  </audio>
}

let result = Audio
result = React.forwardRef(result)

export default result
