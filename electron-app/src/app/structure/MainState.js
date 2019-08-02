import React from 'react'
import useMousetrap from 'react-hook-mousetrap'

import { connectTree } from '../domain/state/tree/react'
import { isEditingState } from '../domain/state/mainState'
import { newEntriesList } from '../domain/state/newEntries'
import { toggleEditing } from '../domain/doneEditing'
import { uploadDirName } from '../domain/state/dirName'
import HandleTitle from '../components/HandleTitle'
import Interactive from '../ui/Interactive'
import MainMenu from '../ui/MainMenu'
import NewEntriesList from '../ui/NewEntriesList'

const MainStatePure = ({ newEntriesList, uploadDirName, isEditingState }) => {
  let atABoard = !!uploadDirName
  let opened = atABoard && isEditingState

  useMousetrap('space', () => {
    toggleEditing()
  })

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <MainMenu />
      <Interactive />
      <NewEntriesList
        entries={newEntriesList}
        opened={opened}
        atABoard={atABoard}
      />
      <HandleTitle />
    </div>
  )
}

let connection = [newEntriesList, uploadDirName, isEditingState]

export { MainStatePure }
export default connectTree(connection)(MainStatePure)
