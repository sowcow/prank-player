import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Forward, Save } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'
import React, { Component, useContext } from 'react';
import styled from 'styled-components'

import { AudioSrcUpdate } from '../components/AudioSrc';
import { audioDeviceGet, audioDeviceSet } from '../domain/state/audioDevice';
import { connectTree } from '../domain/state/tree/react';
import { getBoards, getOneBoard } from '../../electron';
import ChooseOutput from './ChooseOutput';
import doSave from '../domain/doSave';
import doUpload from '../domain/doUpload';

import useMousetrap from 'react-hook-mousetrap'

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
        <ListItemIcon>
          <Forward />
        </ListItemIcon>
        <ListItemText primary={`Output: ${that.outputName()}`} />
      </ListItem>
      {///*
      <ListItem button onClick={() => doSave()}>
        <ListItemIcon>
          <Save />
        </ListItemIcon>
        <ListItemText primary='Save' />
      </ListItem>
      //*/
      }
      <Divider />
      {
      that.state.boards.map((x, i) =>
        <BoardItem item={x} key={i} />
      )
      }
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

let TabHandler = ({ action }) => {
  useMousetrap('tab', action)
  return null
}

class MainMenu extends Component {
  state = {
    isOpen: false,
    isChoosingOutput: false,
    audioDevices: [],
    selectedAudio: 'default',
    boards: [],
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
      KeyboardButtonProps={{ tabIndex: "-1" }}
      onFocus={() => {
        document.activeElement.blur()
      }}
        >
          { /*onFocusVisible={this.openIt}*/ }
          <MenuIcon />
        </IconButton>
        <TabHandler action={x => this.setState({ isOpen: !isOpen })} />
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
