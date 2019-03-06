require 'paths'
require 'scenario'

desc 'collect scenarios into accessible data in temp file'
task :collect_scenarios do
  dir = Paths.scenarios_dir
  files = Dir[File.join dir, ?*]
  files.sort_by! { |x| x.scan(/\d+/).map &:to_i }

  scenarios = files.map { |x|
    Scenario.from_markdown File.read x
  }
  result = scenarios.map &:to_h

  text = JSON.pretty_generate result
  output = Paths.collected_scenarios
  File.write output, text
end
