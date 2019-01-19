import React, { Component } from 'react'
import classnames from 'classnames'

import { Flex, Box } from 'reflexbox'
import Asterisk from '@material-ui/icons/InfoOutlined'

import { styled } from '@material-ui/styles'
// import styled from 'styled-components'

let style = {
  '& .asterisk': {
    color: '#444',
  },
  '& .text': {
    color: '#444',
  },
  position: 'fixed',
  bottom: 0,
  right: 0,
}

class Note extends Component {
  render() {
    let { text, children, className } = this.props

    return (
      <Flex
      className={classnames('Note', className)}
      align='center'
      mt={1}
      mr={1}
      >
        <Asterisk className='asterisk' />
        <Box className='text'>
          { text || children }
        </Box>
      </Flex>
    )
  }
}

class Notes extends Component {
  // static Note = Note

  render() {
    let { className } = this.props

    return (
      <Flex column={ true }
      className={classnames('Notes', className)}
      mb={1}
      >
        { this.props.children }
      </Flex>
    )
  }
}


export default styled(Notes)(style)
export { Note as Note } // omg
