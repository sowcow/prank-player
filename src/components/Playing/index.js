import React, { Component } from 'react'
// import classnames from 'classnames'
import Dropzone from 'react-dropzone'

import { Flex, Box } from 'reflexbox'
import Button from '@material-ui/core/Button';

  // const App = () => (
  //   <Button variant="contained" color="primary">
  //     Hello World
  //   </Button>
  // );

class Playing extends Component {
  buttonClick = (e) => {
    e.preventDefault() // context menu

    let leftButton = e.button === 0
    let rightButton = e.button === 2

    let audio = e.target.getElementsByTagName('audio')[0]
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
  }

  render() {
    let { files, uris } = this.props

    return <>
      {
        files.map( file =>
          <div key={ file.name }>
            <Button variant="contained" color="primary"
              onClick={ this.buttonClick }
              onContextMenu={ this.buttonClick }
            >
              { file.name }
              <audio>
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
