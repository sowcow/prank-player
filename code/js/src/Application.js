import React from 'react'

import App from './app/structure/App'
import AppContext from './basement/AppContext'
import './app/automation' // TODO: place


class Application extends React.Component {
  componentDidMount() {
    let { app_state } = this.props
    if (app_state) window.setAppState(app_state)
  }
  render() {
    return <AppContext>
      <App />
    </AppContext>
  }
}

export default Application
