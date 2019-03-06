require 'watir'
require 'forwardable'
require_relative 'paths'
require_relative 'see'
require_relative 'temp_dir_files'

HEADLESS_BROWSER = false
# HEADLESS_BROWSER = true

class Browser
  attr_reader :watir

  def initialize
    @watir = Watir::Browser.new(
      :chrome,
      {
        chromeOptions: {
          args: [
            HEADLESS_BROWSER ? '--headless' : nil,
            '--window-size=800x600'
          ].compact
        }
      }
    )
  end

  def done
    @watir.close
  end

  def shot name
    dir = Paths.shots
    name = File.join dir, "#{name}.png"
    @watir.driver.save_screenshot name
  end

  def upload(dir:, files:)
    TempDirFiles.use dir, files do |path|
      @watir.file_field.set path
    end
  end

  def see? what
    (kind, info) = what.first
    question = "#{kind}?"
    See.public_send question, self, info
  end

  def run js
    @watir.execute_script js
  end

  extend Forwardable
  delegate %i[
    button
    div
    goto
  ] => :@watir
end
