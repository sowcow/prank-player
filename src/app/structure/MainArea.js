import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import NewEntriesList from '../ui/NewEntriesList';
import UploadButton from '../ui/UploadButton'
import doUpload from '../domain/doUpload'
import { newEntriesList } from '../domain/state/newEntries'

const MainAreaPure = ({newEntriesList}) => (
  <>
    <UploadButton gotFiles={doUpload} />
    <NewEntriesList given={newEntriesList} />
  </>
)

let connection = [
  newEntriesList
]

export { MainAreaPure }
export default connectTree(connection)(MainAreaPure)
