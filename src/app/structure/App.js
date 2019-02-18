import React from 'react'

import { connectTree } from '../domain/state/tree/react'
import MainArea from './MainArea'
import TopBar from './TopBar'

const AppPure = () => (
  <>
    <TopBar />
    <MainArea />
  </>
)

let connection = []

export { AppPure }
export default connectTree(connection)(AppPure)
