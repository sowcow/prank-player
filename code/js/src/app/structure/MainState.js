import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import { newEntriesList } from '../domain/state/newEntries';
import NewEntriesList from '../ui/NewEntriesList';


const MainStatePure = ({ newEntriesList }) => (
  <NewEntriesList
    entries={newEntriesList}
    opened={true}
  />
)

let connection = [
  newEntriesList,
]

export { MainStatePure }
export default connectTree(connection)(MainStatePure)
