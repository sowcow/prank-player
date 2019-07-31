#!/bin/ruby

name = ARGV.pop
return puts "give me a name for the new file" unless name

file = File.join __dir__, name
file += '.js'
return puts "this file already existis" if File.exist? file

$NAME = name
$PURE = "#{name}Pure"

TEXT = <<END.strip
const #$PURE = () =>
  <>
    <div>TODO: #{$NAME}</div>
  </>

let connection = [
]

export { #$PURE }
export default connectTree(connection)(#$PURE)
END

def main file, text
  File.write file, text
  process_js file
end

def process_js file
  system 'importjs fix --overwrite %s' % file.inspect
  system 'yarn prettier-standard %s' % file.inspect
end

main file, TEXT

__END__
name = ARGV.pop
return puts "give me a name for the new directory" unless name

dir = File.join __dir__, name
# return puts "this directory already existis" if Dir.exist? dir

$NAME = name
$PURE = "#{name}Pure"

END {
  add dir, files: {
    'index.js': STATEFUL,
    'test.js': TEST,
    # 'state.js': STATE,
  }
}

def add(dir, files:)
  Dir.mkdir dir unless Dir.exists? dir
  files.each { |name, contents|
    file_path = File.join dir, name.to_s
    if File.exists? file_path
      puts "skipping existing file: #{name}"
      next
    end
    File.write file_path, contents
    if file_path =~ /\.js$/
      system 'importjs fix --overwrite %s' % file_path.inspect
      system 'yarn prettier-standard %s' % file_path.inspect
    end
  }
end



STATEFUL = <<END.strip
const #$PURE = () =>
  <>
    <div>TODO: #{$NAME}</div>
  </>

let connection = [
]

export { #$PURE }
export default connectTree(connection)(#$PURE)
END


TEST = <<END.strip
import React from 'react'
import ReactDOM from 'react-dom'

import Subj from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Subj />, div)
  ReactDOM.unmountComponentAtNode(div)
})
END
