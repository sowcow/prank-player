require 'pathname'
require_relative './misc/method_builder'

module Paths
  extend MethodBuilder
  build_methods do
    project_root Pathname(__dir__) + '..' + '..'
    org_file project_root + 'process.org'

    generated_dir project_root + 'generated'
    org_to_stories generated_dir + 'org_to_stories.json'

    scenario_tests project_root + 'e2e' + 'spec' + 'scenarios'
    steps_contexts generated_dir + 'steps_contexts.json'
  end
end


if __FILE__ == $0
  puts '---'
  puts "project_root: #{ Paths.project_root }"
  puts "org_file: #{ Paths.org_file.to_s }"
end
