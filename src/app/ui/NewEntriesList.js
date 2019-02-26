import { Flex } from 'reflexbox'
import { Paper, Slide } from '@material-ui/core'
import React from 'react'
import indigo from '@material-ui/core/colors/indigo'
import withStyles from 'react-jss'
import styled from 'styled-components'
import Entry from './Entry'

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

// import {
//   getNewButtonOpened,
//   toggleNewButton
// } from '../../state/ui'
// let getNewButtonOpened = () => {}
// let toggleNewButton = () => {}

// connected component in ui dir...

let NewEntriesList = ({
  entries,
  classes,
  toggleNewButton,
  opened
}) => {
  // if (!opened) return null
  // entries = []
  toggleNewButton = () => {}
  opened = true // XXX

  return (
    <Slide
      direction='up'
      in={opened}
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.root}>
        <Paper>
          <Flex className={classes.insidePaper}>
            {entries.map((x, i) =>
              <div key={i} style={{ display: 'flex' }}>
                { i === 0 ? null :
                  <Divider>
                    <DividerInside />
                  </Divider>
                }
                <Entry entry={x} />
              </div>
            )}
          </Flex>
        </Paper>
      </div>
    </Slide>
  )
}
let component = NewEntriesList

let margin = '0px'
let marginRight = '0px'

component = withStyles({
  root: {
    // height: 100,
    position: 'absolute',
    bottom: margin,
    left: margin,
    right: marginRight
    // outline: 'solid 3px orange',
  },
  insidePaper: {
    overflowX: 'auto',
    backgroundColor: indigo[500],
    // minHeight: 'min-content'
  }
})(component)

// todo: use the new way

// let mapStateToProps = state => ({
//   opened: getNewButtonOpened(state)
// })

// component = connect(
//   mapStateToProps,
//   { toggleNewButton }
// )(component)

export default component
