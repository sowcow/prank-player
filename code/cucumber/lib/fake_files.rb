class FakeFiles
  def initialize dir
    @dir = dir
  end

  def create given
    if given.kind_of? Array
      given.each { |x| create x }
    else
      create_one given
    end
  end

  def create_one name
    file = @dir + name
    File.write file, content_for(File.basename file)
  end

  def content_for _file
    'FAKE_FILE'
  end
end
