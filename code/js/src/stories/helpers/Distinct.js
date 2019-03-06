import styled from 'styled-components'

export default styled.div`
  border: solid 1px #333;
  color: #333;
  padding: 10px;
  white-space: pre;
  background-color: ${p => randomColor()};
  text-align: center;
`

function randomColor () {
  let result = '#'
  result += randomLetter()
  result += randomLetter()
  result += randomLetter()
  return result
}
const LETTERS = ['9', 'c', 'f']
function randomLetter () {
  let items = LETTERS
  return items[Math.floor(Math.random() * items.length)]
}
