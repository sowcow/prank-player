import points from './points'

function nestedAt (treeRoot, path) {
  return (key, defaultValue) =>
    addBranch_(
      treeRoot,
      key,
      path.concat(key),
      defaultValue
    )
}

export default nestedAt

function addBranch_ (
  treeRoot,
  keyName,
  path,
  defaultValue
) {
  let state = treeRoot.select(path)
  // let reads = (a, b = null) => points(a, path.concat(b || a))

  state.exists() && console.log('rewriting the key!:', path)
  state.set(defaultValue)

  return function (givenFunction = null) {
    if (givenFunction == null) {
      return points(keyName, path)
    } else {
      return function (tree, ...givenParams) {
        givenFunction(state, ...givenParams)
      }
    }
  }
}
