import { uploadDirName, uploadDirNameSet } from '../dirName'

beforeEach(() => {
  ;[uploadDirName].forEach(x => x.reset())
})

it('has default value', () => {
  expect(uploadDirName.get()).toEqual('')
})

it('has setter', () => {
  uploadDirNameSet(null, 'hello')
  expect(uploadDirName.get()).toEqual('hello')
})
