const KEY = 'text'

export default () => {
  let params = new URLSearchParams(window.location.search)

  if (!params.has(KEY)) return

  return params.get(KEY)
}
