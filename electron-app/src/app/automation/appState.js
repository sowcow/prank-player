import { PRODUCTION } from '../misc/debug'
import treeRoot from '../domain/state/tree/treeRoot'

if (!PRODUCTION) {
  window.getAppState = () => treeRoot.get()
  window.setAppState = x => treeRoot.set(x)
}
