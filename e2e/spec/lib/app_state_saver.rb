require 'singleton'
require_relative '../../../automation/rakelib/lib/paths'

class AppStateSaverService
  include Singleton

  def perform browser, step
    step_id = step.join('--')

    file = Paths.steps_contexts
    unless file.exist?
      initial = {}
      initial_text = JSON.dump initial
      File.write file, initial_text
    end
    state_string = browser.run GET_STATE_JS
    data = JSON.load File.read file
    data[step_id] = state_string
    text = JSON.pretty_generate data
    File.write file, text
  end

  GET_STATE_JS = 'return btoa(JSON.stringify(window.getAppState()))'
end

AppStateSaver = AppStateSaverService.instance
