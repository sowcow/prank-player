import React, { Component } from 'react'
import classnames from 'classnames'

import { Flex, Box } from 'reflexbox'
// import Asterisk from '@material-ui/icons/InfoOutlined'

import { styled } from '@material-ui/styles'
// import styled from 'styled-components'

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { useState } from 'react';

let style = {
  '& .button': {
    position: 'fixed',
    left: 0,
    top: 0,
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
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

class MainMenu extends Component {
  render() {
    let [ isOpen, setOpen ] = useState(false)

    let { text, children, className } = this.props

    return (
      <div className={className}>
      <IconButton className='button'
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      </div>
    )
  }
}

export default styled(MainMenu)(style)
