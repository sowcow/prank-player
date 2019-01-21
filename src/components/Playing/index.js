import React, { Component } from 'react'
// import classnames from 'classnames'

import Button from '@material-ui/core/Button'

import Player from '../../lib/Player'
import MainMenu from '../MainMenu'

import { Helmet } from 'react-helmet'

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
    }
    if (leftButton) {
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

  render () {
    let { files, uris } = this.props

    let dirName = files[0].webkitRelativePath
    if (dirName) {
      dirName = dirName.replace(/\/.+/, '')
    } else {
      dirName = 'directory_name'
    }

    return (
      <>
        <MainMenu />
        <Helmet title={dirName} />
        {files.map(file => (
          <div key={file.name}>
            <Button
              onMouseDown={e => this.buttonClick(file, e)}
              onContextMenu={e => e.preventDefault()}
            >
              {file.name}
              <audio
                preload='auto'
                // onPlay={ this.onPlay }
                // onLoad={ this.onLoad }
              >
                <source src={uris[file.name]} type='audio/mpeg' />
                Your browser does not support the audio tag.
              </audio>
            </Button>
          </div>
        ))}
      </>
    )
  }
}

export default Playing
