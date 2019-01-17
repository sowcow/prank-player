import React, { Component } from 'react';
import Uploading from '../Uploading'
import Playing from '../Playing'
import './style.css';

const PLAYING = 'playing'


class App extends Component {
  state = {
    files: [],
    uris: [],
    scene: PLAYING,
  }
  gotFiles = newFiles => {
    let { files, uris } = this.state

    files.forEach( x => URL.revokeObjectURL(uris[x.name]) )
    files = []
    // maybe to refactor it to create/revoke on component lifecycle

    console.log(newFiles)
    newFiles.forEach( x => {
      if (!uris[x.name]) {
        uris[x.name] = URL.createObjectURL(x)
      }
      files.push(x)
    })

    this.setState({ files, uris })
  }

  contents() {
    let { files, uris, scene } = this.state

    if (!files.length) return <Uploading gotFiles={this.gotFiles} />
    if (scene === PLAYING) return (
      <Playing
        files={files}
        uris={uris}
      />
    )
  }

  render() {

    return (
      <div className="App">
        {
          this.contents()
        }
      </div>
    )
  }
}

export default App;


// TODO:
                // <source src="horse.ogg" type="audio/ogg" />
