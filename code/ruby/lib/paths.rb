require 'pathname'
require_relative './misc/method_builder'

module Paths
  extend MethodBuilder
  UP = '..'
  build_methods do
    project_root Pathname(__dir__) + UP + UP + UP
    org_file project_root + 'process' + 'process.org'

    generated_dir project_root + 'tmp'
    org_to_stories generated_dir + 'org_to_stories.json'

    scenario_tests project_root + 'e2e' + 'spec' + 'scenarios'
    steps_contexts generated_dir + 'steps_contexts.json'
    scenarios_dir project_root + 'product' + 'scenarios'
    collected_scenarios generated_dir + 'collected_scenarios.json'
  end
end


if __FILE__ == $0
  puts '---'
  puts "project_root: #{ Paths.project_root }"
  added = Paths.methods - Paths.class.methods
  added -= [:project_root]
  added.each { |x|
    puts "#{x}: #{Paths.public_send x}"
  }
end
