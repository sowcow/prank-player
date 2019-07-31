// coordinates audio tags so they receive the right commands in the right order
// no two audio tags are playing simultaneously when one Player is in charge
class Player {
  last = null

  playOrPause (audio) {
    if (audio.playOrPause()) {
      this.last = audio
      this.silencePrevious()
    } else {
      this.last = null
    }
    // if (this.isPlaying(audio)) {
    //   audio.pause()
    // } else {
    //   this.start(audio)
    // }
  }

  silencePrevious() {
    if (this.last) this.last.stop()
  }

  playFromStart (audio) {
    this.silencePrevious()
    audio.playFromStart()
    this.last = audio
    // this.stop()
    // this.stop(audio)
    // this.start(audio)
  }

  // private

  start (audio) {
    console.log(555)
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
      // if (audio.setCurrentTime) audio.setCurrentTime(0)
    }
  }

  isPlaying (audio) {
    return audio.duration > 0 && !audio.paused
  }
}

export const PlayerInstance = new Player()

export default Player
