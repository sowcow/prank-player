import {
  setCurrentlyPlaying,
  setCurrentlyPlayingStatus,
} from '../state/playbackState'

export function playbackUpdate(eventName, payload) {
  // console.log(event, payload)
  setCurrentlyPlayingStatus(null, eventName)

  if (eventName === 'play') {
    setCurrentlyPlaying(null, payload)
  }
}
