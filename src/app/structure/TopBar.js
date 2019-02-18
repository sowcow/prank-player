import React from 'react'

import { connectTree } from '../domain/state/tree/react'

const TopBarPure = () => (
  <>
    <div>TODO: TopBar</div>
  </>
)

let connection = []

export { TopBarPure }
export default connectTree(connection)(TopBarPure)
