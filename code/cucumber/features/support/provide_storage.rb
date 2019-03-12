require_relative '../../lib/storage'
require 'pathname'


tmp_dir = File.join __dir__,
  *4.times.map { '..' },
  'tmp'

dir = File.join tmp_dir, 'e2e_storage'
dir = File.expand_path dir

if __FILE__ == $0
  p dir
  exit 0
end

Pathname(dir).rmtree if Dir.exist? dir
Pathname(dir).mkpath

$storage = Storage.new dir
Before do
  @storage = $storage
  @storage.enter_clean_state
end

at_exit do
  $storage.current_state_directory.rmtree
  json = JSON.pretty_generate $storage.to_h
  file = File.join tmp_dir, 'testingSnapshots.json'
  File.write file, json
end
