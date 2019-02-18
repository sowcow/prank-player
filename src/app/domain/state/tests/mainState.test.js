import { isUploadingState, setUploadingState } from '../mainState';

beforeEach(() => {
  ;[isUploadingState].forEach(x => x.reset())
})

it('has default value', () => {
  expect(isUploadingState.get()).toEqual(true)
})

it('can be changed', () => {
  setUploadingState(null, false)
  expect(isUploadingState.get()).toEqual(false)
  setUploadingState(null, true)
  expect(isUploadingState.get()).toEqual(true)
})
