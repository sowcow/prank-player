import React from 'react'

import { connectTree } from '../state/tree/react'
import {
  newEntriesIsOpen,
  newEntriesSetClose,
  newEntriesSetOpen
} from '../state/newEntries'

let connected = connectTree(newEntriesIsOpen.to('open'))

let DummyApp = ({ dispatch, open }) => {
  let setOpen = () => dispatch(newEntriesSetOpen)
  let setClose = () => dispatch(newEntriesSetClose)

  return (
    <div>
      <button onClick={setOpen}>+</button>
      <button onClick={setClose}>-</button>
      {open ? 'OPEN' : 'CLOSED'}
    </div>
  )
}

export default connected(DummyApp)
