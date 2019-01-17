import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

class MyDropzone extends React.Component {
   onDrop = (acceptedFiles, rejectedFiles) => {
     console.log(acceptedFiles, rejectedFiles)
      acceptedFiles.forEach(file => {
        this.props.gotFile(file)
       // console.log(file.name, file.fileObject)
      });
     // Do something with files
   }

   render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} webkitdirectory='true' mozdirectory='true' />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Dropzone>
    );
  }
}

export default MyDropzone;
