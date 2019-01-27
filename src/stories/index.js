import { Box, Flex } from 'reflexbox';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@material-ui/core';
import React from 'react'

import { storiesOf } from '@storybook/react'

import SoundBoard from '../components/ui/SoundBoard';
import withStyles from 'react-jss'


let ExampleArea = ({children, classes}) =>
  <Paper className={classes.paper}>
    {children}
  </Paper>
ExampleArea = withStyles({
  paper: {
    width: 600,
    height: 400,
  }
})(ExampleArea)

let Example = ({ features, children }) =>
  <Flex column p={2}>
    <ShowList contents={features} />
    <ExampleArea>
      {children}
    </ExampleArea>
  </Flex>

let ShowList = ({contents}) =>
  <Flex mb={2}>
    <Paper elevation={1}>
      <Flex>
        <Box>
  <div
style={{ backgroundColor: '#018786', width: 10, height: '100%', borderRadius: '4px 0 0 4px' }}
    />
        </Box>
        <Box>
        <List component="nav">
          {
            contents.split("\n")
            .map(x => x.trim())
            .filter(x => !!x)
            .map(x => {
              let regex = /^x /
                if (regex.test(x)) {
                  x = x.replace(regex, '')
                  return { done: true, text: x }
                } else {
                  return { done: false, text: x }
                }
            })
            .map(x =>
              <ListItem dense>
                <ListItemIcon>
                  {  x.done ? <CheckBox /> : <CheckBoxOutlineBlank /> }
                </ListItemIcon>
                <ListItemText primary={x.text} />
              </ListItem>
            )
          }
        </List>
        </Box>
      </Flex>
    </Paper>
  </Flex>

storiesOf('SoundBoard', module)
  .add('with new entries', () => (
    <Example
      features={`
          User sees a button that hides new entries
          User can click it to see them
          They take space from the button to the right or left side (the longest part)
          They are clickable buttons that play audio
          They can be dragged to the main area where they are positioned this way
      `}
    >
      <SoundBoard newEntries={
        [
          { name: 'First entry', },
          { name: 'Second entry', },
        ]
      } />
    </Example>
  ))
  .add('with positioned buttons', () => (
    <SoundBoard positionedEntries={
      [
        { name: 'First entry', },
        { name: 'Second entry', },
      ]
    } />
  ))
