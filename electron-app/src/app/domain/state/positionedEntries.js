import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// boilerplate
//
let lastPart = /([^/]+).js$/
let fileName = 'positionedEntries.js'
fileName = fileName.match(lastPart)[1]
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('positionedEntriesList', [])
export const positionedEntriesList = branch()
export const positionedEntriesSet = branch((state, given) => {
  state.set(given)
})
export const positionedEntriesPush = branch((state, given) => {
  state.push(given)
})
