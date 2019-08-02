import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import { isUploadingState } from '../domain/state/mainState';
import MainState from './MainState';

const AppPure = ({ isUploadingState }) => {
  return <MainState />
}

let connection = [
  isUploadingState,
]

export { AppPure }
export default connectTree(connection)(AppPure)
