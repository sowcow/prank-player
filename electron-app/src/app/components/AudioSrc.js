import React from 'react'

let ValueContext = React.createContext()
let UpdateContext = React.createContext()

class AudioSrc extends React.Component {
  state = { value: {} }

  updateValue = value => this.setState({ value })

  render () {
    let { value } = this.state
    let { updateValue } = this
    let { children } = this.props

    return (
      <ValueContext.Provider value={value}>
        <UpdateContext.Provider value={updateValue}>
          {children}
        </UpdateContext.Provider>
      </ValueContext.Provider>
    )
  }
}

let AudioSrcUpdate = UpdateContext
let AudioSrcValue = ValueContext
export { AudioSrcUpdate, AudioSrcValue }

export default AudioSrc
