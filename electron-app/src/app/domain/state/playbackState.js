import nestedAt from './helpers/nestedAt'
import treeRoot from './tree/treeRoot'

// boilerplate
//
let lastPart = /([^/]+).js$/
let fileName = 'playbackState.js'
fileName = fileName.match(lastPart)[1]
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('currentlyPlaying', null) // key, default value
export const currentlyPlaying = branch() // getter - same name!
export const setCurrentlyPlaying = branch().setter()

branch = addBranch('currentlyPlayingStatus', null) // key, default value
export const currentlyPlayingStatus = branch() // getter - same name!
export const setCurrentlyPlayingStatus = branch().setter()
