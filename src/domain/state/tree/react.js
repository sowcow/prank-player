import { root, branch } from 'baobab-react/higher-order'

import treeRoot from './treeRoot'

export const injectTree = root(treeRoot)

export const connectTree = (...configurers) => {
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
