import { deletedEntriesSet } from '../state/deletedEntries'
import { newEntriesSet } from '../state/newEntries'
import { positionedEntriesSet } from '../state/positionedEntries'

export function setFilesForTray (entryFileObjects) {
  let files = entryFileObjects.map(preprocessFile)
  newEntriesSet(null, files)
}

export function setPositionedEntries (xs) {
  positionedEntriesSet(null, xs)
}

export function setDeletedEntries (xs) {
  deletedEntriesSet(null, xs)
}

const EXTENSION = /\.([^.]+)$/

const PREPARE_NAME = [
  x => x.replace(EXTENSION, ''),
  x => x.replace(/^[\d\s\W]+/, ''),
  x => x.replace(/_/g, ' '),
  x => x.replace(/\s+/g, ' '),
  x => x.trim()
]

function preprocessFile (file) {
  let fileName = file
  let name = fileName
  PREPARE_NAME.forEach(x => {
    let newName = x(name)
    if (newName) name = newName
  })
  let kind = getEntryKind(fileName)
  return { name, fileName, kind }
}

const IS_IMAGE = /\.(svg|jpeg|jpg|bmp|png|gif)$/
const IS_AUDIO = /\.(mp3)$/
const IMAGE = 'IMAGE'
const AUDIO = 'AUDIO'

const getEntryKind = fileName => {
  if (IS_IMAGE.test(fileName)) return IMAGE
  if (IS_AUDIO.test(fileName)) return AUDIO
  return null
}
const isValidEntry = x => getEntryKind(x) != null

const DATA_NAME = 'soundboard.html'
const isDataFile = x => x.name === DATA_NAME
export { isValidEntry, isDataFile }
