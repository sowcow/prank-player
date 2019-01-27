import React from 'react' // jsx
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import * as reducers from '../state/index'

let reducersObject = Object.keys(reducers).reduce((a, x) => {
  a[x] = reducers[x]
  return a
}, {})
let reducer = combineReducers(reducersObject)
let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

let StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default store
export { StoreProvider }
