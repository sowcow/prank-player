import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import { newEntriesList } from '../domain/state/newEntries';
import Interactive from '../ui/Interactive';
import MainMenu from '../ui/MainMenu';
import NewEntriesList from '../ui/NewEntriesList';


const MainStatePure = ({ newEntriesList }) => (
  <div style={{position: 'relative', height: '100%'}}>
    <MainMenu />
    <Interactive />
    <NewEntriesList
      entries={newEntriesList}
      opened={true}
    />
  </div>
)

let connection = [
  newEntriesList,
]

export { MainStatePure }
export default connectTree(connection)(MainStatePure)
