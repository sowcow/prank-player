import { Flex } from 'reflexbox'
import { Paper, Slide } from '@material-ui/core'
import React from 'react'
import indigo from '@material-ui/core/colors/indigo'
import withStyles from 'react-jss'

// import {
//   getNewButtonOpened,
//   toggleNewButton
// } from '../../state/ui'
import Entry from './Entry'
let getNewButtonOpened = () => {}
let toggleNewButton = () => {}

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
            {entries.map((x, i) => (
              <Entry entry={x} key={i} />
            ))}
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

let mapStateToProps = state => ({
  opened: getNewButtonOpened(state)
})

// component = connect(
//   mapStateToProps,
//   { toggleNewButton }
// )(component)

export default component
