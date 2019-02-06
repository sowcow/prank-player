import { CssBaseline } from '@material-ui/core'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react'

// import { StoreProvider } from './redux/store';
import { injectTree } from './state/tree/react'

let AppContext = ({ children }) => (
  // <StoreProvider>
  <DragDropContextProvider backend={HTML5Backend}>
    <CssBaseline />
    {children}
  </DragDropContextProvider>
)
// </StoreProvider>

AppContext = injectTree(AppContext)

export default AppContext
