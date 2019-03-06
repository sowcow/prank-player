require 'tmpdir'

module TempDirFiles
  module_function

  def use dir, files, &block
    Dir.mktmpdir('TempDirFiles') { |dir|
      files.each { |x|
        file = File.join dir, x
        # path = File.dirname file
        # FileUtils.mkpath path unless Dir.exists? path
        File.write file, content_for(File.basename x)
      }
      block.call dir
    }
  end

  def content_for file
    "FAKE_FILE"
  end
end
