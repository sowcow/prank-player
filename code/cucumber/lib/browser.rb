require 'watir'
require 'forwardable'
require_relative 'paths'
require_relative 'see'


SELENIUM = {
  url: 'http://localhost:4444/wd/hub',
  loggingPrefs: {browser: 'ALL'}
}


HEADLESS_BROWSER = false
# HEADLESS_BROWSER = true

class Browser
  attr_reader :watir

  def initialize
    options = {
      chromeOptions: {
        args: [
          HEADLESS_BROWSER ? '--headless' : nil,
          '--window-size=800x600',
          # '--disable-web-security',
        ].compact
      }
    }
    options.merge! SELENIUM
    @watir = Watir::Browser.new(
      :chrome,
      options
    )
  end

  def at_the_page?
    @at_the_page
  end

  def done
    @watir.close
  end

  def shot name
    dir = Paths.shots
    name = File.join dir, "#{name}.png"
    @watir.driver.save_screenshot name
  end

  def upload path
    @watir.file_field.set path
  end

  def click what
    (kind, info) = what.first
    target = See.public_send kind, self, info
    target.click
  end

  def see? what
    (kind, info) = what.first
    question = "#{kind}?"
    See.public_send question, self, info
  end

  def run js
    @watir.execute_script js
  end

  def goto url
    @watir.goto url
    @at_the_page = true
  end

  def relevant_events app
    json = app.get_events self
    JSON.load json
  end

  extend Forwardable
  delegate %i[
    button
    div
  ] => :@watir
end
