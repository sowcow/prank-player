module App
  module_function

  def url
    'http://localhost:3000/'
  end

  def set_state browser, state
    js = SET_STATE_JS % state
    browser.run js
  end

  def get_state browser
    browser.run GET_STATE_JS
  end

  GET_STATE_JS = 'return JSON.stringify(window.getAppState(),null,2)'
  SET_STATE_JS = 'window.setAppState(%s)'
end
