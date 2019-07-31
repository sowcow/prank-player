import { newEntriesList, newEntriesSet } from './state/newEntries';
import {
  positionedEntriesList,
  positionedEntriesPush,
  positionedEntriesSet,
} from './state/positionedEntries';

export default function (entry, position) {
  let finder = x => x.fileName === entry.fileName
  deleteFromList(newEntriesList.get(), newEntriesSet, finder)
  deleteFromList(positionedEntriesList.get(), positionedEntriesSet, finder)
  let item = { ...entry, position }
  positionedEntriesPush(null, item)
}


function deleteFromList(list, setter, f) {
  if (list.find(f)) {
    list = list.filter(x => !f(x))
    setter(null, list)
  }
}
