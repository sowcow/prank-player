import React, { Component } from 'react'
// import classnames from 'classnames'
// import { Flex, Box } from 'reflexbox'
import { styled } from '@material-ui/styles'
import withStyles from 'react-jss'

class New extends Component {
  render () {
    return <div />
  }
}

let component = withStyles({
  root: {
    // width: '100%',
    // height: '100%',
    outline: 'solid 3px orange'
  }
})(New)

export default component

// export default styled(New)(style)
