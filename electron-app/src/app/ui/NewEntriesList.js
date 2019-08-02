import { Flex } from 'reflexbox'
import { IconButton, Paper, Slide } from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import React from 'react'
import indigo from '@material-ui/core/colors/indigo'
import styled from 'styled-components'
import withStyles from 'react-jss'

import { setEditingState } from '../domain/state/mainState'
import Entry from './Entry'
import doneEditing from '../domain/doneEditing'

let Divider = styled.div`
  width: 1px;
  height: 100%;

  padding-top: 5px;
  padding-bottom: 5px;

  position: relative;
`

let DividerInside = styled.div`
  background-color: white;
  opacity: 0.2;

  position: absolute;
  top: 20%;
  bottom: 20%;
  left: 0;
  right: 0;
`

let NewEntriesList = ({
  entries,
  classes,
  toggleNewButton,
  opened,
  atABoard
}) => {
  let upVisibility = atABoard ? 'visible' : 'hidden'
  toggleNewButton = () => {}

  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          visibility: upVisibility
        }}
      >
        <IconButton
          className='button'
          onClick={() => setEditingState(null, true)}
          tabIndex='-1'
          onFocus={() => {
            document.activeElement.blur()
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>
      <Slide direction='up' in={opened}>
        <div className={classes.root}>
          <Paper>
            <Flex className={classes.insidePaper}>
              <div>
                <Entry fake={true} />
              </div>
              {entries.map((x, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  {i === 0 ? null : (
                    <Divider>
                      <DividerInside />
                    </Divider>
                  )}
                  <Entry entry={x} />
                </div>
              ))}
              <div style={{ position: 'absolute', right: 0 }}>
                <IconButton
                  className='button tray-button'
                  onClick={() => doneEditing()}
                  tabIndex='-1'
                  onFocus={() => {
                    document.activeElement.blur()
                  }}
                >
                  <KeyboardArrowDown />
                </IconButton>
              </div>
            </Flex>
          </Paper>
        </div>
      </Slide>
    </>
  )
}
let component = NewEntriesList

let margin = '0px'
let marginRight = '0px'

component = withStyles({
  root: {
    position: 'absolute',
    bottom: margin,
    left: margin,
    right: marginRight
  },
  insidePaper: {
    overflowX: 'auto',
    backgroundColor: indigo[500]
  }
})(component)

export default component
