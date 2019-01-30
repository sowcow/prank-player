import './firstThings'

import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { StoreProvider } from './redux/store'

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'

let app = (
  <StoreProvider>
    <CssBaseline />
    <App />
  </StoreProvider>
)

let element = document.getElementById('root')

ReactDOM.render(app, element)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
