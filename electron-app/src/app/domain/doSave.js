import { getFabricState } from '../ui/Interactive'
import { saveBoardData } from '../../electron'
import { uploadDirName } from './state/dirName'

export default () => {
  let name = uploadDirName.get()
  if (!name) return Promise.resolve()

  let board = { name }
  let data = { fabric: getFabricState() }
  return saveBoardData(board, data)
    .then(() => console.log('saved successfully'))
    .catch(() => console.log('error saving'))
}
