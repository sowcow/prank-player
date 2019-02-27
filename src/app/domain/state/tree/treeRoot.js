import Baobab from 'baobab'

import { DEBUG, PRODUCTION, log } from '../../../misc/debug'

let options = {
  immutable: !PRODUCTION
}

const tree = new Baobab({}, options)

window.getAppState = () => tree.get() // used in automation

DEBUG && tree.on('update', () => log(tree.serialize()))

export default tree
