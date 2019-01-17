import React, { Component } from 'react'
// import classnames from 'classnames'
import Dropzone from 'react-dropzone'

import { Flex, Box } from 'reflexbox'
import Button from '@material-ui/core/Button';

// coordinates audio tags so they receive the right commands in the right order
// no two audio tags are playing simultaneously
class Player {
  last = null

  playOrPause(audio) {
    if (this.isPlaying(audio)) {
      audio.pause()
    } else {
      this.start(audio)
    }
  }

  playFromStart(audio) {
    this.stop()
    this.stop(audio)
    this.start(audio)
  }

  /////

  start(audio) {
    if (this.last !== audio) {
      this.stop(this.last)
    }

    audio.play()
    this.last = audio
  }

  stop(audio) {
    audio = audio || this.last
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  isPlaying(audio) {
    return audio.duration > 0 && !audio.paused
  }
}


class Playing extends Component {

  player = new Player()

  buttonClick = (file, e, options = {}) => {
    let leftButton = e.button === 0
    let rightButton = e.button === 2
    if (options.leftButton) {
      leftButton = true
      rightButton = false
    }

    let audio = e.target.getElementsByTagName('audio')[0]

    if (rightButton) {
      this.player.playFromStart(audio)
    } if (leftButton) {
      this.player.playOrPause(audio)
    }

    /*
    let isPlaying = audio.duration > 0 && !audio.paused

    if (rightButton) {
      if (isPlaying) {
        audio.pause()
        audio.currentTime = 0
      }
      audio.play()
      return
    }

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    */
  }

  render() {
    let { files, uris } = this.props

    return <>
      {
        files.map( file =>
          <div key={ file.name }>
            <Button variant="contained"
              onMouseDown={ e => this.buttonClick(file, e) }
              onContextMenu={ e => e.preventDefault() }
            >
              { file.name }
          <audio preload='auto'
            // onPlay={ this.onPlay }
            // onLoad={ this.onLoad }
          >
                <source src={ uris[file.name] } type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </Button>
          </div>
        )
      }
    </>
  }
}


export default Playing
