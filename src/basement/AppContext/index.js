import { CssBaseline } from '@material-ui/core'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react'

import { injectTree } from '../../app/domain/state/tree/react';

let AppContext = ({ children }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <CssBaseline />
    {children}
  </DragDropContextProvider>
)

AppContext = injectTree(AppContext)

export default AppContext
