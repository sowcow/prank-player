import { newEntriesSet } from './state/newEntries';
import { uploadDirNameSet } from './state/dirName';

export default function(dirName, files) {
  uploadDirNameSet(null, dirName)
  newEntriesSet(null, files)
  // uris should be handled somewhere there I believe
  // with some service
}
