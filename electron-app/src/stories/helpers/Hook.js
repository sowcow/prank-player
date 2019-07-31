import React, { useEffect } from 'react'

export default ({ mount, unmount, children }) => {
  useEffect(() => {
    mount && mount()
    return () => {
      unmount && unmount()
    }
  },[])

  return children
}
