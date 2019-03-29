// import { useInternalUid } from './helpers/uid'
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
branch = addBranch('positionedEntriesList', [])
export const positionedEntriesList = branch()
export const positionedEntriesSet = branch(
  (state, given) => {
    // given = useInternalUid(given)
    state.set(given)
  }
)
export const positionedEntriesPush = branch(
  (state, given) => {
    // given = useInternalUid(given)
    state.push(given)
  }
)
// export const positionedEntriesMerge = branch(
//   (state, given) => {
//     let selector = { uid: given.uid }
//     state.merge(selector, given)
//   }
// )
// export const positionedEntriesDrop = branch(
//   (state, given) => state.unset(given)
// )
// export const positionedEntriesClear = branch(state =>
//   state.set([])
// )
