let lastRecord = null
let record = name => {
  let point = +new Date()
  let delta = point - lastRecord
  lastRecord = point
  console.log('(' + delta + 'ms) then: ' + name)
}
export { record }
