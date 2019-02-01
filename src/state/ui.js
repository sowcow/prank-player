import {
  createAction,
  handleActions,
  combineActions
} from 'redux-actions'

// will build reducers functionally

const NESTED_AT = 'ui'
const KEY = 'new_button_opened' // in store
const DEFAULT_STATE = { [KEY]: false }

const PREFIX = NESTED_AT + '/'
export const showNewButton = createAction(PREFIX + 'SHOW')
export const hideNewButton = createAction(PREFIX + 'HIDE')
export const toggleNewButton = createAction(
  PREFIX + 'TOGGLE'
)

let reducer = handleActions(
  {
    [combineActions(showNewButton, hideNewButton)]: (
      state,
      { payload }
    ) => {
      return { ...state, [KEY]: payload }
    },
    [combineActions(toggleNewButton)]: (state, _action) => {
      return { ...state, [KEY]: !state[KEY] }
    }
  },
  DEFAULT_STATE
)

export const getNewButtonOpened = state =>
  state[NESTED_AT][KEY]

export default reducer
