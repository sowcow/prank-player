import { DropTarget } from 'react-dnd'
import React from 'react'
import withStyles from 'react-jss'

import { DRAGGABLE_ENTRY } from '../../lib/drag'
import NewEntriesButton from './NewEntriesButton'

const squareTarget = {
  drop (props, monitor) {
    const clientOffset = monitor.getClientOffset()
    console.log(111)
    console.log(clientOffset)
    console.log(monitor)
    console.log(props)
    // moveKnight(props.x, props.y);
  },
  hover (props, monitor, component) {
    console.log(222)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const EDITING = 'editing'

let component = ({
  newEntries,
  mode,
  classes,
  connectDropTarget,
  isOver
}) => {
  let isEditing = mode === EDITING
  let showButton = newEntries.length && isEditing

  console.log(111)

  return (
    <div className={classes.root}>
      {connectDropTarget(
        <div style={{ height: '100%' }}>
          {isOver ? 'over' : ''}
        </div>
      )}
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

let dropTarget = DropTarget(
  DRAGGABLE_ENTRY,
  squareTarget,
  collect
)(component)

export default dropTarget
