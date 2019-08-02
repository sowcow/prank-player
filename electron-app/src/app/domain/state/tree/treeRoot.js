import Baobab from 'baobab'

import { PRODUCTION } from '../../../misc/debug'

let options = {
  immutable: !PRODUCTION,
  monkeyBusiness: false,

  // autoCommit: false,
}

const treeRoot = new Baobab({}, options)

export default treeRoot
