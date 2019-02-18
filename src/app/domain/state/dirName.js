// boilerplate
//
import nestedAt from './helpers/nestedAt';
import treeRoot from './tree/treeRoot';

let fileName = __filename.slice(1, __filename.length - 3)
console.log(fileName)
const KEY = [fileName]

var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('uploadDirName', '')
export const uploadDirName = branch()
export const uploadDirNameSet = branch((state, given) =>
  state.set(given)
)
