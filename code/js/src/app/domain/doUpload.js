import { newEntriesSet } from './state/newEntries'
import { setUploadingState } from './state/mainState';
import { uploadDirNameSet } from './state/dirName'
import UrlsService from './services/UrlsService';
import getFilesDirName from '../misc/getFilesDirName';
import loadSavedData from './services/loadSavedData';


// boundary - so it takes fileObjects
// and sends domain/state related messages to the specialists
export default function (updateSrc, fileObjects) {
  setUploadingState(null, false)

  let entryFileObjects = fileObjects.filter(validEntry)

  let dirName = getFilesDirName(entryFileObjects)
  uploadDirNameSet(null, dirName)

  let files = entryFileObjects.map(preprocessFile)
  newEntriesSet(null, files)

  UrlsService.thisIsTheGirl(updateSrc, entryFileObjects)

  let dataFile = fileObjects.find(isDataFile)
  if (dataFile) {
    let reader = new FileReader()
    reader.onload = () => loadSavedData(reader.result)
    reader.readAsText(dataFile)
  }
}

const VALID_EXT = /\.mp3$/
const validEntry = x => VALID_EXT.test(x.name)

const DATA_NAME = 'soundboard.html'
const isDataFile = x => x.name === DATA_NAME

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
