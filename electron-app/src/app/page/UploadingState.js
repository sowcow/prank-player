import React, { useContext } from 'react'

import { AudioSrcUpdate } from '../components/AudioSrc';
import CentralLayout from '../layout/CentralLayout'
import UploadButton from '../ui/UploadButton'
import doUpload from '../domain/doUpload'


export default () => {
  let updateSrc = useContext(AudioSrcUpdate)

  return <CentralLayout
    center={<UploadButton ok={x => doUpload(updateSrc, x)} />}
  />
}
