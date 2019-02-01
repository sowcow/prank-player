import { Add, Close } from '@material-ui/icons';
import { Fab } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import withStyles from 'react-jss'

import {
  getNewButtonOpened,
  toggleNewButton
} from '../../state/ui'
import NewEntriesList from './NewEntriesList'

// connected component in ui dir...

let NewEntriesButton = ({
  entries,
  classes,
  toggleNewButton,
  opened
}) => {
  let color = 'primary'
  return (
    <>
      <NewEntriesList entries={entries} show={opened} />
      <div className={classes.root}>
        <Fab color={color} onClick={toggleNewButton}>
          { !opened ?
            <Add /> :
            <Close />
          }
        </Fab>
      </div>
    </>
  )
}
let component = NewEntriesButton

let margin = '10px'

component = withStyles({
  root: {
    position: 'absolute',
    bottom: margin,
    right: margin
    // outline: 'solid 3px orange',
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
