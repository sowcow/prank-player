import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Forward, Publish, SaveAlt as Save } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'
import React, { Component } from 'react';
import styled from 'styled-components'

import { audioDeviceGet, audioDeviceSet } from '../domain/state/audioDevice';
import { connectTree } from '../domain/state/tree/react';
import ChooseOutput from './ChooseOutput';
import doSave from '../domain/doSave';

let Root = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
`

let style = {
  // '& .button': {
  //   marginLeft: -12,
  //   marginRight: 20
  // }

  '& .button': {
    position: 'fixed',
    left: 0,
    top: 0,
    'z-index': 10
  }

  // '& .asterisk': {
  //   color: '#444',
  // },
  // '& .text': {
  //   color: '#444',
  // },
  // position: 'fixed',
  // bottom: 0,
  // right: 0,
}

const sideList = that =>
  <div>
    <List>
      <ListItem button onClick={() => that.chooseOutput()}>
        <ListItemIcon>
          <Forward />
        </ListItemIcon>
        <ListItemText primary={`Output: ${that.outputName()}`} />
      </ListItem>
      <ListItem button onClick={() => doSave()}>
        <ListItemIcon>
          <Save />
        </ListItemIcon>
        <ListItemText primary='Save' />
      </ListItem>
      {/*
      <ListItem button onClick={() => {}}>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary='Upload' />
      </ListItem>
      */}

  {/*
      <input
        id='file-upload-menu'
        webkitdirectory='true'
        mozdirectory='true'
      />

      <label for='file-upload-menu'>
      <ListItem button onClick={() => {}}>
        <ListItemIcon>
          <ArrowUpward />
        </ListItemIcon>
        <ListItemText primary='Upload' />
      </ListItem>
      </label>
    */}

    </List>
    {/*<Divider />*/}
  </div>

function setOutputDevice(x) {
  console.log(x)
  console.log(x)
  console.log(x)
}

class MainMenu extends Component {
  state = {
    isOpen: false,
    isChoosingOutput: false,
    audioDevices: [],
    selectedAudio: 'default',
  }
  openIt = () => this.setState({ isOpen: true })
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
      // setOutputDevice(given)
      // this.setState({ selectedAudio: given.deviceId })
      let { deviceId, label } = given
      audioDeviceSet(null, { deviceId, label })
    }
    this.chooseOutput(false)
  }

  render () {
    // let [ isOpen, setOpen ] = useState(false)
    let { isOpen, isChoosingOutput, selectedAudio,
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
        >
          <MenuIcon />
        </IconButton>
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
