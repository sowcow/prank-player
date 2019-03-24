import {
  newEntriesList,
  newEntriesPush,
  newEntriesSet
} from './state/newEntries';
import {
  positionedEntriesList,
  positionedEntriesSet,
} from './state/positionedEntries';

export default function (entry) {
  let finder = x => x.fileName == entry.fileName
  deleteFromList(newEntriesList.get(), newEntriesSet, finder)
  deleteFromList(positionedEntriesList.get(), positionedEntriesSet, finder)
  newEntriesPush(null, entry)
}


function deleteFromList(list, setter, f) {
  if (list.find(f)) {
    list = list.filter(x => !f(x))
    setter(null, list)
  }
}
