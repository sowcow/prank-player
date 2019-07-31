import { useEffect } from 'react'

import { audioDeviceGet } from '../domain/state/audioDevice'
import { connectTree } from '../domain/state/tree/react'
import { uploadDirName } from '../domain/state/dirName'

let TRIM_AT = 50

let Title = ({ uploadDirName, audioDeviceGet }) => {
  useEffect(() => {
    let device = audioDeviceGet.label
    if (device === 'Default') device = ''

    let title = ''

    if (uploadDirName) title = title + uploadDirName
    if (device) {
      if (title) {
        title = title + ' - ' + device
      } else {
        title = device
      }
    }
    if (title === '') title = 'Prank Player'
    title = title.substr(0, TRIM_AT)
    if (title.length === TRIM_AT) title += '…'

    document.title = title
  }, [uploadDirName, audioDeviceGet])

  return null
}

let connection = [
  audioDeviceGet,
  uploadDirName, // NOTE: inconsistent naming?
]

export default connectTree(connection)(Title)
