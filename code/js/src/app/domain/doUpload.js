import {
  isDataFile,
  isValidEntry,
  setDeletedEntries,
  setFilesForTray
} from './services/filesService';
import { setUploadingState } from './state/mainState';
import { uploadDirNameSet } from './state/dirName'
import UrlsService from './services/UrlsService';
import getFilesDirName from '../misc/getFilesDirName';
import loadSavedData from './services/loadSavedData';


// boundary - so it takes fileObjects
// and sends domain/state related messages to the specialists
export default function (updateSrc, fileObjects) {
  setUploadingState(null, false)

  let entryFileObjects = fileObjects.filter(isValidEntry)

  let dirName = getFilesDirName(entryFileObjects)
  uploadDirNameSet(null, dirName)

  UrlsService.thisIsTheGirl(updateSrc, entryFileObjects)

  let dataFile = fileObjects.find(isDataFile)
  if (dataFile) {
    let reader = new FileReader()
    reader.onload = () => loadSavedData(reader.result, entryFileObjects)
    reader.readAsText(dataFile)
  } else {
    setFilesForTray(entryFileObjects)
    setDeletedEntries([])
  }
}
