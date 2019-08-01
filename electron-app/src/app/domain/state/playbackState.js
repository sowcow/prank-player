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

// branch = addBranch('currentlyPaused', null) // key, default value
// export const currentlyPaused = branch() // getter - same name!
// export const setCurrentlyPaused = branch().setter()

// branch = addBranch('currentlyEnded', null) // key, default value
// export const currentlyEnded = branch() // getter - same name!
// export const setCurrentlyEnded = branch().setter()

// branch = addBranch('currentlyPlayingStatus', null) // key, default value
// export const currentlyPlayingStatus = branch() // getter - same name!
// export const setCurrentlyPlayingStatus = branch().setter()
