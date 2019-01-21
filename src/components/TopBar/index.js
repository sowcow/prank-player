import React, { Component } from 'react'
// import classnames from 'classnames'
// import { Flex, Box } from 'reflexbox'
import { styled } from '@material-ui/styles'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Helmet} from "react-helmet";

import MainMenu from '../MainMenu'


let style = {
}

class TopBar extends Component {
  state = {
    title: '',
  }

  render() {
    let { title } = this.state

    return (
      <div>
        <Helmet onChangeClientState={(newState) => this.setState({ title: newState.title }) } />
        <AppBar position="static">
          <Toolbar>
            <MainMenu />
            <Typography variant="h6" color="inherit">
              { title }
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default styled(TopBar)(style)
