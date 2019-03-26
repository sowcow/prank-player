import { newEntriesSet } from '../state/newEntries';
import { positionedEntriesSet } from '../state/positionedEntries';
import { setFabricState } from '../../ui/Interactive';

export default text => {
  let parser = new DOMParser()
  let doc = parser.parseFromString(text, 'text/html')
  let element = doc.getElementById('json')
  let json = element.innerText
  let data = JSON.parse(json)

  positionedEntriesSet(null, data.positionedEntriesList)
  newEntriesSet(null, data.newEntriesList)
  setFabricState(data.fabric)
}
