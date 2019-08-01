import {
  setCurrentlyPlaying,
  setCurrentlyPlayingStatus
} from '../state/playbackState';


// actually you want to have it another way
// some updated can be missed in the ui

// omg

export function playbackUpdate(eventName, payload) {
  setCurrentlyPlayingStatus(null, eventName)
  setCurrentlyPlaying(null, payload)

  // console.log(event, payload)
  // setCurrentlyPlayingStatus(null, eventName)

  // if (eventName === 'play') {
  //   setCurrentlyPlaying(null, payload)
  //   setCurrentlyPaused(null, null)
  //   setCurrentlyEnded(null, null)
  //   return
  // }
  // if (eventName === 'pause') {
  //   setCurrentlyPaused(null, payload)
  //   return
  // }

  // if (eventName === 'ended') {
  //   setCurrentlyPlaying(null, null)
  // } else if (eventName === 'play') {
  //   setCurrentlyPlaying(null, payload)
  // } else if (eventName === 'pause') {
  // }

    // eventName === 'ended' ||
    // eventName === 'pause'
  // ) {
    // setCurrentlyPlaying(null, payload)
  // }
}
