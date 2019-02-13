#!/bin/ruby

name = ARGV.pop
return puts "give me a name for the new directory" unless name

dir = File.join __dir__, name
# return puts "this directory already existis" if Dir.exist? dir

$NAME = name

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
const #{$NAME}Pure = () =>
  <>
    <div>TODO</div>
  </>

let connected = connectTree(
)

const #$NAME = connected(#{$NAME}Pure)

export { #{$NAME}Pure }

export default #$NAME
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
