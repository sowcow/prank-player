import { Box, Flex } from 'reflexbox'
import {
  CheckBox,
  CheckBoxOutlineBlank
} from '@material-ui/icons'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@material-ui/core'
import React from 'react'
import withStyles from 'react-jss'

import AppContext from '../../basement/AppContext'

let ExampleArea = ({ children, classes }) => (
  <Paper className={classes.paper}>{children}</Paper>
)
ExampleArea = withStyles({
  paper: {
    width: '100%',
    height: 400
  }
})(ExampleArea)

let Example = ({ features, children }) => (
  <AppContext>
    <Flex p={2}>
      <Box w='50%' p={1}>
        <ExampleArea>{children}</ExampleArea>
      </Box>
      <Box w='50%' p={1}>
        <ShowList contents={features} />
      </Box>
    </Flex>
  </AppContext>
)

let ShowList = ({ contents }) => {
  let items = contents
    .split('\n')
    .map(x => x.trim())
    .filter(x => !!x)
    .map(x => {
      let breakRegex = /^-+$/
      if (breakRegex.test(x)) return { break: true }
      let regex = /^x /
      if (regex.test(x)) {
        x = x.replace(regex, '')
        return { done: true, text: x }
      } else {
        return { done: false, text: x }
      }
    })

  if (!items.length) return null

  return (
    <Flex mb={2}>
      <Paper elevation={1}>
        <Flex>
          <Box>
            <div
              style={{
                backgroundColor: '#2196f3', //desaturate(0.5, lighten(0.5, '#08a')),
                width: 10,
                height: '100%',
                borderRadius: '4px 0 0 4px'
              }}
            />
          </Box>
          <Box>
            <List component='nav'>
              {items.map((x, i) =>
                x.break ? (
                  <Divider key={i} />
                ) : (
                  <ListItem key={i} dense>
                    <ListItemIcon>
                      {x.done ? (
                        <CheckBox />
                      ) : (
                        <CheckBoxOutlineBlank />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={x.text} />
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Flex>
      </Paper>
    </Flex>
  )
}

export default Example
