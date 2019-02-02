import { Box, Flex } from 'reflexbox'
import { Paper, Slide } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import indigo from '@material-ui/core/colors/indigo'
import withStyles from 'react-jss'

import {
  getNewButtonOpened,
  toggleNewButton
} from '../../state/ui'

// connected component in ui dir...

let ellipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

let NewEntry = ({ entry }) => (
  <Box
    mr={2}
    ml={2}
    w={150}
    style={{
      flexShrink: 0,
      color: 'white',
      textAlign: 'center'
    }}
  >
    <div style={{ height: '100%', display: 'flex' }}>
      <span style={{ margin: 'auto', ...ellipsis }}>
        {entry.name}
      </span>
    </div>
  </Box>
)
//<Chip color='primary' label={entry.name} />

let NewEntriesList = ({
  entries,
  classes,
  toggleNewButton,
  opened
}) => {
  // if (!opened) return null

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
              <NewEntry entry={x} key={i} />
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
    overflowX: 'scroll',
    backgroundColor: indigo[500],
    minHeight: 'min-content'
  }
})(component)

// todo: use the new way

let mapStateToProps = state => ({
  opened: getNewButtonOpened(state)
})

component = connect(
  mapStateToProps,
  { toggleNewButton }
)(component)

export default component
