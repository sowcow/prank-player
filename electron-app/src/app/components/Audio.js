import React, { useContext, useRef, useImperativeHandle, useEffect } from 'react'

import { AudioSrcValue } from './AudioSrc';
import AppEvents from '../automation/AppEvents';

const HAVE_ENOUGH_DATA = 4

function isPlaying(x) {
    return x
        && x.currentTime > 0
        && !x.paused
        && !x.ended
        && x.readyState > -2
}

// NOTE: very ugly manual passing of audioDeviceGet from all parents
// cuz imperative stuff breaks if ya wrap this
// gotta use context the next time!
let Audio = ({ name, children, audioDeviceGet }, ref) => {
  let audioRef = useRef()
  let urls = useContext(AudioSrcValue)
  let url = urls[name]

  useImperativeHandle(ref, () => ({
    stop: () => {
      let audio = audioRef.current
      // if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.currentTime = 0
      audio.pause()
    },

    pause: () => {
      let audio = audioRef.current
      // if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.pause()
    },

    setCurrentTime: n => {
      let audio = audioRef.current
      // if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.currentTime = n
    },

    playFromStart:  () => {
      let audio = audioRef.current
      if (audio.readyState !== HAVE_ENOUGH_DATA) return

      // if (isPlaying(audio)) {
      //   return audio.pause()
      // }

      audio.currentTime = 0
      audio.play()
    },

    playOrPause: () => {
      let audio = audioRef.current
      if (audio.readyState !== HAVE_ENOUGH_DATA) return

      if (isPlaying(audio)) {
        audio.pause()
        return false
      }

      audio.play()
      return true
    },

    play: (kind) => {
      let audio = audioRef.current
      if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.play()

      // console.log(kind)
      // console.log(isPlaying(audio))
      // if (isPlaying(audio)) {
      //   audio.pause()
      // } else {
      //   audio.play()
      // }

      // NOTE: automation-only btw
      // AppEvents.push({
      //   type: 'play_audio',
      //   filename: name
      // })
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
