import React from 'react'

import { connectTree } from '../../domain/state/tree/react'

const AppPure = () => (
  <>
    <div>TODO</div>
  </>
)

let connected = connectTree()

const App = connected(AppPure)

export { AppPure }

export default App
