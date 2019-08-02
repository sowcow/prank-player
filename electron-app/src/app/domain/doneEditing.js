import { isEditingState, setEditingState } from './state/mainState'
import doSave from './doSave'

export default async function doneEditing () {
  await doSave()
  setEditingState(null, false)
}

export async function toggleEditing () {
  let editingState = isEditingState.get()
  if (editingState) {
    doneEditing()
  } else {
    setEditingState(null, true)
  }
}
