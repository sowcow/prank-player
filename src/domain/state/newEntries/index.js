import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// constants
//
const KEY = ['new-entries']

// boilerplate
//
var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('newEntriesIsOpen', false) // key, default value
export const newEntriesIsOpen = branch() // getter - same name as the key
export const newEntriesSetOpen = branch(state =>
  state.set(true)
)
export const newEntriesSetClose = branch(state =>
  state.set(false)
)

branch = addBranch('newEntriesList', [])
export const newEntriesList = branch()
export const newEntriesSet = branch((state, given) =>
  state.set(given)
)
export const newEntriesClear = branch(state =>
  state.set([])
)
