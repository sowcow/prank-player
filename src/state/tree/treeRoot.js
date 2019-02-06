import Baobab from 'baobab'

import { DEBUG, log } from '../../debug'

const tree = new Baobab({})

DEBUG && tree.on('update', () => log(tree.serialize()))

export default tree
