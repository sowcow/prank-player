import Baobab from 'baobab'

import { DEBUG, PRODUCTION, log } from '../../../misc/debug'

let options = {
  immutable: !PRODUCTION,
  // immutable: false,
  monkeyBusiness: false,
  // autoCommit: false,
}

const tree = new Baobab({}, options)

// used in automation
window.getAppState = () => tree.get()
window.setAppState = x => tree.set(x)
// window.setAppState = x => tree.set(JSON.parse(JSON.stringify(x)))

// debug
DEBUG && tree.on('update', () => log(tree.serialize()))

export default tree
