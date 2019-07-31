import { root, branch } from 'baobab-react/higher-order'

import treeRoot from './treeRoot'

export const injectTree = root(treeRoot)

let identity = x => x

// can take single array or a spread of options
//
export const connectTree = (...configurers) => {
  if (configurers.length === 0) {
    return identity
  }
  if (configurers.length === 1) {
    let first = configurers[0]
    if (Array.isArray(first)) {
      return connectTree(...first)
    }
  }

  let config = {}
  configurers.forEach(x => applyConfigurer(config, x))

  return component => branch(config, component)
}

/* usage sketch

component = connectTree(
  newEntriesOpen,
  newEntries.to('them'),
)(component)

*/

function applyConfigurer (config, given) {
  let { name, path } = given
  config[name] && console.log('rewriting the key!:', name)
  config[name] = path
}
