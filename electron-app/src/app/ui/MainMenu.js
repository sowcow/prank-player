import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import React, { Component, useContext } from 'react';
import styled from 'styled-components'

import { AudioSrcUpdate } from '../components/AudioSrc';
import { audioDeviceGet, audioDeviceSet } from '../domain/state/audioDevice';
import { connectTree } from '../domain/state/tree/react';
import { getBoards, getOneBoard } from '../../electron';
import ChooseOutput from './ChooseOutput';
import doUpload from '../domain/doUpload';

import useMousetrap from 'react-hook-mousetrap'

let Root = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
`

let BoardItem = ({ item }) => {
  let updateSrc = useContext(AudioSrcUpdate)
  let chooseBoard = item => {
    getOneBoard(item).then( x => {
      let dirName = x.name
      let { files, data } = x
      doUpload(dirName, updateSrc, files, data)
    })
  }

  return (
    <ListItem button
      onClick={() => chooseBoard(item)}
    >
      <ListItemText primary={item.name} />
    </ListItem>
  )
}

const sideList = that =>
  <div>
    <List>
      <ListItem button onClick={() => that.chooseOutput()}>
        <ListItemText primary={`Output: ${that.outputName()}`} />
      </ListItem>
      <Divider />
      {
      that.state.boards.map((x, i) =>
        <BoardItem item={x} key={i} />
      )
      }
    </List>
  </div>

let TabHandler = ({ action }) => {
  useMousetrap('tab', action)
  return null
}

class MainMenu extends Component {
  state = {
    isOpen: false,
    isChoosingOutput: false,
    audioDevices: [],
    boards: [],
  }
  toggleIt = () => {
    if (this.state.isOpen) {
      this.closeIt()
    } else {
      this.openIt()
    }
  }
  openIt = () => {
    this.setState({ isOpen: true })
    getBoards().then(xs => {
      this.setState({ boards: xs })
    })
  }
  closeIt = () => this.setState({ isOpen: false })

  outputName = () =>
    this.props.audioDeviceGet.label

  chooseOutput = async (isChoosingOutput = true) => {
    if (isChoosingOutput) {
      let constraints = { audio: true }
      await navigator.mediaDevices.getUserMedia(constraints)
      let devices = await navigator.mediaDevices.enumerateDevices()
      let audioDevices = devices.filter(x => x.kind === 'audiooutput')
      this.setState({ audioDevices })
    }
    this.setState({ isChoosingOutput })
  }
  chosenOutput = async given => {
    if (given) {
      let { deviceId, label } = given
      audioDeviceSet(null, { deviceId, label })
    }
    this.chooseOutput(false)
  }

  render () {
    let { isOpen, isChoosingOutput,
      audioDevices
    } = this.state

    let { audioDeviceGet } = this.props

    return (
      <Root>
        <ChooseOutput
          title='Choose audio output device'
          open={isChoosingOutput}
          onClose={this.chosenOutput}
          selectedValue={audioDeviceGet}
          options={audioDevices}
        />
        <IconButton
          className='button body-bg'
          onClick={this.openIt}
          color='inherit'
          tabIndex='-1'
          onFocus={() => {
            document.activeElement.blur()
          }}
        >
          <MenuIcon />
        </IconButton>
        <TabHandler action={this.toggleIt} />
        <Drawer open={isOpen} onClose={this.closeIt}>
          <div
            tabIndex={0}
            role='button'
            onClick={this.closeIt}
            onKeyDown={this.closeIt}
          >
            {sideList(this)}
          </div>
        </Drawer>
      </Root>
    )
  }
}

let connection = [
  audioDeviceGet,
]

export default connectTree(connection)(MainMenu)
