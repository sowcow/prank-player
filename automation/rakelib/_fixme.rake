require 'erb'



# task :default => %i[
#   structure_tests
#   ui_tests
# ]

STRUCTURE_DIR = File.join __dir__, '..', 'src', 'structure'
STR_TEST_FILE = File.join STRUCTURE_DIR, 'test.js'

UI_DIR = File.join __dir__, '..', 'src', 'ui'
UI_TEST_FILE = File.join UI_DIR, 'test.js'

desc 'generates test files for ui/'
task :ui_tests do
  create_tests_at UI_DIR, UI_TEST_FILE
end

desc 'generates test files for structure/'
task :structure_tests do
  create_tests_at STRUCTURE_DIR, STR_TEST_FILE
end

def create_tests_at dir, result_file
  Dir.chdir dir do
    files = Dir['*.js'].reject { |x| x =~ /test\.js/ }
    _create_tests files, result_file
    prettify_js result_file
  end
end

def _create_tests files, result_file
  text = TEMPLATE.result binding
  File.write result_file, text
end

IMPORTS = <<end.strip
end

TEMPLATE = ERB.new <<end.strip, trim_mode: ?>
import React from 'react'
import ReactDOM from 'react-dom'

<% files.each do |file| %>
import <%= var_name file %> from './<%= var_name file %>'
<% end %>

<% files.each do |file| %>
it('renders without crashing: <%= var_name file %>', () => {
  const div = document.createElement('div')
  ReactDOM.render(<<%= var_name file %> />, div)
  ReactDOM.unmountComponentAtNode(div)
})

<% end %>
end

@var_names = {}
def var_name file
  @var_names[file] ||= file.sub /\.js/, ''
end

def prettify_js file
  system 'yarn prettier-standard %s' % file.inspect
end
__END__
def process_js file
  system 'importjs fix --overwrite %s' % file.inspect
  prettify_js file
end
