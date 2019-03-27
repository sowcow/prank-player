import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import { isUploadingState } from '../domain/state/mainState';
import MainState from './MainState';
import UploadingState from '../page/UploadingState';

// import '../ui/MainMenu'  // so baobab state is set!
// import { audioDeviceGet, audioDeviceSet } from '../domain/state/audioDevice';

const AppPure = ({ isUploadingState }) => {
  if (isUploadingState) return <UploadingState />
  return <MainState />
}

let connection = [
  isUploadingState,
]

export { AppPure }
export default connectTree(connection)(AppPure)
