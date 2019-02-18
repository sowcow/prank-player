import nestedAt from '../helpers/nestedAt';
import treeRoot from '../tree/treeRoot';


// constants
//

const KEY = ['main-state']

// boilerplate
//
var branch
let addBranch = nestedAt(treeRoot, KEY)

// branches definition
//
branch = addBranch('isUploadingState', true) // key, default value
export const isUploadingState = branch() // getter - same name as the key
export const setUploadingState = branch((state, value) =>
  state.set(!! value)
)
