import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// boilerplate
//
let lastPart = /([^/]+).js$/
let fileName = 'newEntries.js'
fileName = fileName.match(lastPart)[1]
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('newEntriesIsOpen', false) // key, default value
export const newEntriesIsOpen = branch() // getter - same name!
export const newEntriesSetOpen = branch().setter(true)
export const newEntriesSetClose = branch().setter(false)

branch = addBranch('newEntriesList', [])
export const newEntriesList = branch()
export const newEntriesSet = branch().setter()
export const newEntriesClear = branch().setter([])

export const newEntriesPush = branch(
  (state, given) => state.push(given)
)
