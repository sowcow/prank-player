import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { SaveAlt as Save } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'
import React, { Component } from 'react';
import styled from 'styled-components'

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

const sideList = (
  <div>
    <List>
      <ListItem button onClick={() => doSave()}>
        <ListItemIcon>
          <Save />
        </ListItemIcon>
        <ListItemText primary='Save' />
      </ListItem>

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
)

class MainMenu extends Component {
  state = {
    isOpen: false
  }
  openIt = () => this.setState({ isOpen: true })
  closeIt = () => this.setState({ isOpen: false })

  render () {
    // let [ isOpen, setOpen ] = useState(false)
    let { isOpen } = this.state

    return (
      <Root>
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
            {sideList}
          </div>
        </Drawer>
      </Root>
    )
  }
}

export default MainMenu
