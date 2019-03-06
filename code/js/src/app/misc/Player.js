// coordinates audio tags so they receive the right commands in the right order
// no two audio tags are playing simultaneously when one Player is in charge
class Player {
  last = null

  playOrPause (audio) {
    if (this.isPlaying(audio)) {
      audio.pause()
    } else {
      this.start(audio)
    }
  }

  playFromStart (audio) {
    this.stop()
    this.stop(audio)
    this.start(audio)
  }

  // private

  start (audio) {
    if (this.last !== audio) {
      this.stop(this.last)
    }

    audio.play()
    this.last = audio
  }

  stop (audio) {
    audio = audio || this.last
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  isPlaying (audio) {
    return audio.duration > 0 && !audio.paused
  }
}

export default Player
