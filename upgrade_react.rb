require 'tmpdir'
require 'json'
require 'pathname'
require 'fileutils'


END {
  replace_with_the_newest_ejected_cra_stuff %w[
    config/
    scripts/
    package.json
    yarn.lock
  ]

  run_commands <<-end
    npx -p @storybook/cli sb init

    yarn add --dev flow-watch
    yarn add --dev onchange
    yarn add --dev prettier-standard

    yarn add @material-ui/core
    yarn add @material-ui/icons
    yarn add @material-ui/styles

    yarn add baobab baobab-react

    yarn add polished
    yarn add ramda
    yarn add react-dnd react-dnd-html5-backend

    yarn add react-dropzone
    yarn add react-helmet
    yarn add reflexbox

    yarn add styled-components
    yarn add typeface-roboto
  end

  add_to_json 'package.json', scripts: {
    "dev": "tmuxinator start -p ./tmuxinator.yml",
    "autorun-dev-stuff": "onchange -i 'src/state/*.js' -e 'src/state/index.js' -- yarn generate-index-js",
    "generate-index-js": "create-index src/stories",
    "format": "prettier-standard 'src/**/*.js'",
    "flow": "flow",
    "flow:watch": "flow-watch",
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js",
    "storybook": "start-storybook -p 9009 -s public",
    "build-storybook": "build-storybook -s public"
  }

  add_line_after 'config/webpack.config.js',
    'node: {',
    %|"__filename": true, // ADDED|
}

def add_to_json file, hash
  hash = JSON.parse JSON.dump hash
  data = JSON.parse File.read file
  hash.each { |key,value|
    data[key] = value
  }
  text = JSON.pretty_generate data
  File.write file, text
end

def add_line_after file, after, to_add
  text = File.read file
  lines = text.lines
  lines.find { |x|
    x[after]
  } << "#{ to_add }\n"
  text = lines.join
  File.write file, text
end

def replace_with_the_newest_ejected_cra_stuff entries
  root = Pathname __dir__
  Dir.mktmpdir('upgrade_react') { |dir|
    Dir.chdir dir do
      system 'npx create-react-app latest'
      Dir.chdir 'latest' do
        eject_here
        # p Dir.pwd
        # p Dir['*']
        entries.each { |x|
          FileUtils.rm_r root + x
          FileUtils.cp_r x, root
        }
      end
    end
  }
end

def eject_here
  io = IO.popen %w[ yarn eject ], 'r+'
  sleep 5
  io.puts ?y
  Process.wait io.pid
end

def run_commands text
  lines = text.strip.lines.map &:strip
  lines.reject! { |x| x.empty? }
  lines.each { |x| system x }
end
