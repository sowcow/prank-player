import { newEntriesSet } from './state/newEntries'
import { setUploadingState } from './state/mainState';
import { uploadDirNameSet } from './state/dirName'
import UrlsService from './services/UrlsService';
import getFilesDirName from '../misc/getFilesDirName';


// boundary - so it takes fileObjects
// and sends domain/state related messages to the specialists
export default function (fileObjects) {
  setUploadingState(null, false)

  let dirName = getFilesDirName(fileObjects)
  uploadDirNameSet(null, dirName)

  let files = fileObjects.map(preprocessFile)
  newEntriesSet(null, files)

  UrlsService.thisIsTheGirl(fileObjects)
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
