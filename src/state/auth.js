import { createAction, handleActions, combineActions } from 'redux-actions'

// const { increment, decrement } = createActions({
//   INCREMENT: (amount = 1) => ({ amount }),
//   DECREMENT: (amount = 1) => ({ amount: -amount })
// });

export const increment = createAction('INCREMENT')
export const decrement = createAction('INCREMENT')

// export {
//   increment,
//   decrement,
// }

const defaultState = { counter: 10 }

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (state, { payload }) => {
      return { ...state, counter: payload }
    }
  },
  defaultState
)

export default reducer
