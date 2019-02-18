import React from 'react'
import styled from 'styled-components'

// probably there will be fillCenter
// that will divide the main area if bottom/top are used
// not sure if I'm going to do this division with corners/bottom/top
//
// maybe like fill/put center/corner
//
// or even composition can do that - just bottom -> flex box inside
// so something like Vertical/Horizontal + center can do

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`

const Center = styled.div`
  margin: auto;
`

const RightBottom = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`

const RightTop = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const LeftTop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const LeftBottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`

const Bottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

const Top = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`

export default ({
  top,
  bottom,
  leftTop,
  rightTop,
  leftBottom,
  rightBottom,
  center
}) => (
  <Root>
    {top && <Top>{top}</Top>}
    {bottom && <Bottom>{bottom}</Bottom>}
    {leftTop && <LeftTop>{leftTop}</LeftTop>}
    {rightTop && <RightTop>{rightTop}</RightTop>}
    {leftBottom && <LeftBottom>{leftBottom}</LeftBottom>}
    {rightBottom && (
      <RightBottom>{rightBottom}</RightBottom>
    )}
    {center && <Center>{center}</Center>}
  </Root>
)
