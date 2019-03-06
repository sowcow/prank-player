import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import React, { Component } from 'react';

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
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
        (text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon />
              ) : (
                <MailIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )
      )}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
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

    let { className } = this.props

    return (
      <div className={className}>
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
      </div>
    )
  }
}

export default MainMenu
