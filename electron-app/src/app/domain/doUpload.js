import {
  isValidEntry,
  setDeletedEntries,
  setFilesForTray,
  setPositionedEntries
} from './services/filesService';
import { setEditingState, setUploadingState } from './state/mainState';
import { setFabricState } from '../ui/Interactive';
import { uploadDirNameSet } from './state/dirName'
import UrlsService from './services/UrlsService';
import loadSavedData from './services/loadSavedData';


// boundary - so it takes fileObjects
// and sends domain/state related messages to the specialists
export default function (dirName, updateSrc, fileObjects, data) {
  setUploadingState(null, false)

  let entryFileObjects = fileObjects.filter(isValidEntry)

  // let dirName = getFilesDirName(entryFileObjects)
  uploadDirNameSet(null, dirName)

  UrlsService.thisIsTheGirl(dirName, updateSrc, entryFileObjects)

  // let dataFile = fileObjects.find(isDataFile)
  if (data) {
    // let reader = new FileReader()
    // reader.onload = () => loadSavedData(reader.result, entryFileObjects)
    // reader.readAsText(dataFile)
    loadSavedData(data, entryFileObjects)
  } else {
    setEditingState(null, true)
    setFabricState('{}')
    setFilesForTray(entryFileObjects)
    setDeletedEntries([])
    setPositionedEntries([])
  }
}
