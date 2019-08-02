import { ArrowUpward } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import React from 'react'

import classnames from 'classnames'

const UploadButton = ({ ok: onDrop }) => {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={classnames('dropzone', {
            'dropzone--isActive': isDragActive
          })}
        >
          <input
            id='file-upload'
            {...getInputProps()}
            webkitdirectory='true'
            mozdirectory='true'
          />
          {isDragActive ? (
            <p>Drop files here...</p>
          ) : (
            <Button variant='contained' color='primary'>
              Choose a directory with mp3s
            </Button>
          )}
        </div>
      )}
    </Dropzone>
  )
}

export default UploadButton
