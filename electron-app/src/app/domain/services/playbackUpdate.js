import {
  setCurrentlyPlaying,
  setCurrentlyPlayingStatus
} from '../state/playbackState';

export function playbackUpdate(eventName, payload) {
  setCurrentlyPlayingStatus(null, eventName)
  setCurrentlyPlaying(null, payload)
}
