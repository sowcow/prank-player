import { DEBUG, log } from '../misc/debug'
import treeRoot from '../domain/state/tree/treeRoot'

DEBUG && treeRoot.on('update', () => log(treeRoot.serialize()))
