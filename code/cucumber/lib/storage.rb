require 'pathname'
require 'fileutils'

class Storage
  STATE_FILE = 'app_state.json'
  CURRENT_STATE = 'current'

  def initialize directory
    @directory = Pathname directory
    enter_clean_state
  end

  def enter_clean_state
    @state_name = CURRENT_STATE
    no_files
  end

  def app_state= value
    File.write state_file, value
  end

  def app_state
    File.read state_file
  end

  def name_the_state name
    old = current_state_directory
    new = state_directory name
    FileUtils.copy_entry old, new
    # @state_name = name   # named ones are immutable
  end

  def take_current_state_from name
    source = state_directory name
    dest = current_state_directory
    FileUtils.remove_entry dest
    FileUtils.copy_entry source, dest
  end

  def directory *path
    directory = current_state_directory
    path.each { |x| directory = directory + x }
    directory.mkpath
    directory
  end

  def file *path
    file = current_state_directory
    path.each { |x| file = file + x }
    file.parent.mkpath
    file
  end

  # def save_app_state name, value
  #   save_state_file value
  #   name_the_state name
  # end

  def inspect
    system 'tree %s' % @directory.to_s.inspect
    dir = current_state_directory.to_s
    files = Dir[@directory + '**/*.json']
    files += Dir[@directory + '**/*.txt']
    files.uniq!
    files.each { |x|
      text = File.read x
      x = Pathname x
      name = [x.parent.basename, x.basename].map(&:to_s).join ?/
      puts "%s - %s" % [name, text]
    }
    "\n-----\n"
  end

  # def restore_app_state name
  # end

  def current_state_directory
    directory = state_directory @state_name
    directory.mkpath
    directory
  end

  # dump snapshots with app states to use in storybook
  def to_h
    snapshots = Dir[@directory+?*].select { |x| File.directory? x }
    entries = snapshots.map { |x|
      file = File.join x, STATE_FILE
      app_state = JSON.load File.read file
      name = File.basename x
      { name: name, app_state: app_state }
    }
    { entries: entries }
  end

  private
  def state_file
    file = current_state_directory + STATE_FILE
    file
  end
  # def read_state_file
  #   file = current_state_directory + STATE_FILE
  #   File.read file
  # end
  # def save_state_file value
  #   file = current_state_directory + STATE_FILE
  #   File.write file, value
  # end

  def no_files
    current_state_directory.rmtree
    current_state_directory
  end

  def state_directory name
    @directory + name
  end

end


if __FILE__ == $0
  require 'tmpdir'
  Dir.mktmpdir 'test_storage_' do |dir|
    subj = Storage.new dir
    subj.app_state 'some-json'
    subj.name_the_state 'first_snapshot'

    file = subj.file 'abc', 'def.txt'
    File.write file, 'helos'
    subj.app_state 'other-json'
    subj.name_the_state 'second_snapshot'

    subj.enter_clean_state
    subj.app_state 'any-json'
    dir = subj.directory 'hello', 'world'
    File.write dir + 'some.txt', 'any-content'
    subj.name_the_state 'third_snapshot'

    p subj
  end
  #
end
