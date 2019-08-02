import {
  positionedEntriesDrop,
  positionedEntriesList,
  positionedEntriesPush
} from '../positionedEntries'

let uid = expect.any(Number)

beforeEach(() => {
  ;[positionedEntriesList].forEach(x => x.reset())
})

it('has default value', () => {
  expect(positionedEntriesList.get()).toEqual([])
})

it('pushes object, adds uid', () => {
  positionedEntriesPush(null, { a: 1 })
  expect(positionedEntriesList.get()).toEqual([
    { a: 1, uid }
  ])
})
it('same again', () => {
  positionedEntriesPush(null, { a: 1 })
  expect(positionedEntriesList.get()).toEqual([
    { a: 1, uid }
  ])
})

it('deletes item by pattern', () => {
  positionedEntriesPush(null, { a: 1 })
  positionedEntriesPush(null, { a: 2 })
  positionedEntriesDrop(null, { a: 1 })
  expect(positionedEntriesList.get()).toEqual([
    { a: 2, uid }
  ])
})
