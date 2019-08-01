import React, { useContext, useRef, useImperativeHandle, useEffect } from 'react'

import { AudioSrcValue } from './AudioSrc';
import { playbackUpdate } from '../domain/services/playbackUpdate';

const HAVE_ENOUGH_DATA = 4

function isPlaying(x) {
    return x
        && x.currentTime > 0
        && !x.paused
        && !x.ended
        && x.readyState > -2
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForReady(audioRef, tries = 100, pause = 10) {
  let currentTry = 0
  for (let i = 0; i < tries; i++) {
    if (isAudioReady(audioRef)) return true
    await sleep(pause)
  }
  throw new Error('audio is not ready within expectations')
}

// can throw, use inside promises
function isAudioReady(audioRef) {
  let audio = audioRef.current
  if (!audio) throw new Error('audio element has been removed or so')
  return audio.readyState === HAVE_ENOUGH_DATA
}

// can throw, use inside promises
function audioStop(audioRef) {
  let audio = audioRef.current
  if (!audio) throw new Error('audio element has been removed or so')
  audio.pause()
  audio.currentTime = 0
}

// can throw, use inside promises
function audioPause(audioRef) {
  let audio = audioRef.current
  if (!audio) throw new Error('audio element has been removed or so')
  audio.pause()
}

// can throw, use inside promises
function audioPlay(audioRef) {
  let audio = audioRef.current
  if (!audio) throw new Error('audio element has been removed or so')
  audio.play()
}

async function performStop(audioRef) {
  await waitForReady(audioRef)
  audioStop(audioRef)
}

async function performPlayFromStart(audioRef) {
  await waitForReady(audioRef)
  audioStop(audioRef)
  await waitForReady(audioRef)
  audioPlay(audioRef)
}

async function performPauseOrResume(audioRef) {
  await waitForReady(audioRef)
  if (isPlaying(audioRef.current)) {
    audioPause(audioRef)
  } else {
    audioPlay(audioRef)
  }
}
      // let audio = audioRef.current
      // if (!audio) return
      // if (audio.readyState !== HAVE_ENOUGH_DATA) return

      // if (isPlaying(audio)) {
      //   audio.pause()
      //   return false
      // }

      // audio.play()
      // return true

// function doPlayFromStart(audioRef) {
//   let audio = audioRef.current
//   if (!audio) return
//   if (audio.readyState !== HAVE_ENOUGH_DATA) {
//     return setTimeout(() => { // XXX
//       doPlayFromStart(audioRef)
//     },10)
//   }

//   // if (isPlaying(audio)) return audio.pause()

//   audio.pause()
//   audio.currentTime = 0
//   audio.play()
// }

// function doStop(audioRef, promise = new Promise) {
//   // let audio = audioRef.current
//   // if (!audio) return
//   // if (audio.readyState !== HAVE_ENOUGH_DATA) {
//   //   setTimeout(() => { // XXX: gotta be simpler but smells somehow still
//   //     doPlayFromStart(audioRef, promise)
//   //   },10)
//   //   return promise
//   // }

//   // audio.pause()
//   // audio.currentTime = 0
//   // promise.reso
//   // return promise
// }

// NOTE: very ugly manual passing of audioDeviceGet from all parents
// cuz imperative stuff breaks if ya wrap this
// gotta use context the next time!
let Audio = ({ name, children, audioDeviceGet }, ref) => {
  let audioRef = useRef()
  let urls = useContext(AudioSrcValue)
  let url = urls[name]

  useImperativeHandle(ref, () => ({
    stop: () => {
      return performStop(audioRef)
      // let audio = audioRef.current
      // if (!audio) return
      // if (audio.readyState !== HAVE_ENOUGH_DATA) return
      // audio.pause()
      // audio.currentTime = 0
      // console.log('stop')
    },

    pause: () => {
      let audio = audioRef.current
      if (!audio) return
      if (audio.readyState !== HAVE_ENOUGH_DATA) return
      audio.pause()
    },

    pauseOrResume: () => {
      return performPauseOrResume(audioRef).then(
        () => console.log('ok: pauseOrResume')
      ).catch(
        () => console.log('error: pauseOrResume')
      )
    },

    // setCurrentTime: n => {
    //   let audio = audioRef.current
    //   if (!audio) return
    //   if (audio.readyState !== HAVE_ENOUGH_DATA) return
    //   audio.currentTime = n
    // },

    playFromStart:  () => {
      return performPlayFromStart(audioRef).then(
        () => console.log('ok: playFromStart')
      ).catch(
        () => console.log('error: playFromStart')
      )
    },

    playOrPause: () => {
      let audio = audioRef.current
      if (!audio) return
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
      if (!audio) return
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

  useEffect(() => {
    let audio = audioRef.current
    if (!audio) return console.error('impossible')
    let events = ['ended', 'pause', 'play'] //, 'timeupdate']
    events.forEach( eventName => {
      audio.addEventListener(eventName, () => {
        playbackUpdate(eventName, { name, url })
      })
    })
  }, [])

  return <audio preload='auto' key={url} ref={audioRef}>
    <source
      src={url}
    />
  </audio>
}

let result = Audio
result = React.forwardRef(result)

export default result
