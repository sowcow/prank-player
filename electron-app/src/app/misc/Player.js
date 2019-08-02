// coordinates audio tags so they receive the right commands in the right order
// no two audio tags are playing simultaneously when one Player is in charge
class Player {
  last = null

  pauseOrResume (audio) {
    if (this.last) {
      this.last.pauseOrResume()
    }
  }

  playOrPause (audio) {
    if (audio.playOrPause()) {
      this.silencePrevious()
      this.last = audio // started playing new audio
    } else {
      this.last = null // just paused that audio
    }
  }

  // previous may not exist, so ignore the result
  silencePrevious() {
    if (this.last) this.last.stop()
  }

  playFromStart (audio) {
    this.silencePrevious()
    audio.playFromStart()
    this.last = audio
  }
}

export const PlayerInstance = new Player()

export default Player
