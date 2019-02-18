import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import UploadButton from '../ui/UploadButton'
import doUpload from '../domain/doUpload'
import getFilesDirName from '../misc/getFilesDirName'

const gotFiles = files => {
  let dirName = getFilesDirName(files)
  doUpload(dirName, files)
}

const MainAreaPure = () => (
  <>
    <UploadButton gotFiles={gotFiles} />
  </>
)

let connection = []

export { MainAreaPure }
export default connectTree(connection)(MainAreaPure)
