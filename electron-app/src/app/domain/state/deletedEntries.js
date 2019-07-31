import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// boilerplate
//
let lastPart = /([^/]+).js$/
let fileName = 'deletedEntries.js'
fileName = fileName.match(lastPart)[1]
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('deletedEntriesList', [])
export const deletedEntriesList = branch()
export const deletedEntriesSet = branch().setter()
export const deletedEntriesClear = branch().setter([])

// export const deletedEntriesPush = branch(
//   (state, given) => state.push(given)
// )
