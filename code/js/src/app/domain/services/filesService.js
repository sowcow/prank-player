import { deletedEntriesSet } from '../state/deletedEntries';
import { newEntriesSet } from '../state/newEntries';
import { positionedEntriesSet } from '../state/positionedEntries';

export function setFilesForTray(entryFileObjects) {
  let files = entryFileObjects.map(preprocessFile)
  newEntriesSet(null, files)
}

export function setPositionedEntries(xs) {
  positionedEntriesSet(null, xs)
}

export function setDeletedEntries(xs) {
  deletedEntriesSet(null, xs)
}


const PREPARE_NAME = [
  x => x.replace('.mp3', ''),
  x => x.replace(/^[\d\s]+/, ''),
  x => x.replace(/_/g, ' '),
  x => x.replace(/\s+/g, ' '),
  x => x.trim(),
]

function preprocessFile(file) {
  let fileName = file.name
  let name = fileName
  PREPARE_NAME.forEach( x => {
    name = x(name)
  })
  return { name, fileName }
}
