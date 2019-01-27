import React, { Component } from 'react'
import Uploading from './Uploading'
import Playing from './Playing'
import { Helmet } from 'react-helmet'
// import TopBar from '../TopBar'
import { connect } from 'react-redux'
import SoundBoard from './ui/SoundBoard'

const PLAYING = 'playing'
const MP3s = /\.mp3$/

class App extends Component {
  state = {
    files: [],
    uris: [],
    scene: PLAYING
  }
  gotFiles = newFiles => {
    let { files, uris } = this.state

    files.forEach(x => URL.revokeObjectURL(uris[x.name]))
    files = []
    // maybe to refactor it to create/revoke on component lifecycle

    newFiles = newFiles.filter(x => MP3s.test(x.name))
    newFiles.forEach(x => {
      if (!uris[x.name]) {
        uris[x.name] = URL.createObjectURL(x)
      }
      files.push(x)
    })

    this.setState({ files, uris })
  }

  contents () {
    let { files, uris, scene } = this.state

    if (!files.length) return <Uploading gotFiles={this.gotFiles} />
    if (scene === PLAYING) return <Playing files={files} uris={uris} />
  }

  render () {
    return (
      <div className='App'>
        <Helmet title='PPv3' />
        {/*<TopBar />*/}
        {this.contents()}
        <SoundBoard />
      </div>
    )
  }
}

export default connect()(App)
