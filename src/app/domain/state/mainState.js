import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// boilerplate
//
let lastPart = /([^/]+).js$/
let fileName = __filename
fileName = fileName.match(lastPart)[1]
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('isUploadingState', true) // key, default value
export const isUploadingState = branch() // getter - same name!
export const setUploadingState = branch().mapSet(x => !!x)
