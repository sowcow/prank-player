import React from 'react'
import withStyles from 'react-jss'

import NewEntriesButton from './NewEntriesButton'

const EDITING = 'editing'

let component = ({ newEntries, mode, classes }) => {
  let isEditing = mode === EDITING
  let showButton = newEntries.length && isEditing

  return (
    <div className={classes.root}>
      {showButton && (
        <NewEntriesButton entries={newEntries} />
      )}
    </div>
  )
}

component = withStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
    // outline: 'solid 3px orange',
  }
})(component)

export default component
