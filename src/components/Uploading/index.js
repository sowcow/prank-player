import React from 'react'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'

import Button from '@material-ui/core/Button';

import { Flex, Box } from 'reflexbox'

import Notes, { Note } from '../Note'
import Link from '@material-ui/core/Link';


class Uploading extends React.Component {
   onDrop = (acceptedFiles, rejectedFiles) => {
     this.props.gotFiles(acceptedFiles)
   }

   render() {
    return (
      <Flex className='Uploading' >
      <Box m='auto'>
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
     // console.log(getInputProps())
          let btn =
            <>
      <Button variant="contained" color="primary">
        Choose a directory with mp3s
      </Button>
            </>
          return (
            <div
              {...getRootProps()}
              className={classnames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input id='file-upload' {...getInputProps()} webkitdirectory='true' mozdirectory='true' />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  btn

                  // <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Dropzone>
      </Box>
        <Notes>
          <Note text='This is a 100% offline application' />
          <Note text='You may want to press F11 before using it' />
          <Note>
            Find the source code at <Link href='https://github.com/sowcow/prank-player'>github</Link>
          </Note>
        </Notes>
      </Flex>
    );
  }
}

export default Uploading
