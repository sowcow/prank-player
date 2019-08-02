import { isEditingState } from './state/mainState'
import { uploadDirName } from './state/dirName'
import doSave from './doSave'

export default function () {
  let editing = isEditingState.get()
  let current = uploadDirName.get()

  if (current && editing) {
    return doSave()
  } else {
    return Promise.resolve()
  }
}
