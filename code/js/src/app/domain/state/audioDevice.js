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
branch = addBranch('audioDeviceGet', { deviceId: 'default', label: 'Default' })
export const audioDeviceGet = branch()
export const audioDeviceSet = branch().setter()
