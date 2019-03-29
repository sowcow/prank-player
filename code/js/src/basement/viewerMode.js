const KEY = 'text'

export default () => {
  let params = new URLSearchParams(window.location.search)

  if (!params.has(KEY)) return

  let value = params.get(KEY)
  // value = atob(value)

  return value
}

export function savingModeRun() {
  const channel = new BroadcastChannel('saving_mode')
  channel.postMessage({ type: 'get_text' })
  channel.onmessage = function(e) {
    if (e.data.type === 'text_value') {
      setText(e.data.value)
    }
    channel.close()
  }
}

function setText(text) {
  let html = `
  <span style='color: green; font-size: 24pt'>press "ctrl+s" to save in the directory "with mp3s"</span>
  <hr />
  <div id='json'>${text}</div>
  `
  document.documentElement.innerHTML = html
  document.title = 'soundboard'
}
