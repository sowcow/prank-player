require 'org-ruby'
require 'pathname'

require_relative './lib/book'

# headline named "scenarios" has many Scenario
# Scenario has many Step
# Step has nested stuff that is ignored
# but checkboxes that are marked by "!" should be collected
#
# the goal is to have all this stuff -> to a json file or so
# then have 1:1 mappnig between tests and these scenarios
# and save app data for each such step
# having app state - create storybook pages for each step
# (render the whole app)
# also put a checklist from org file(s) to the storybook!
#
# so those storybook branches are 100% generated from tests...
# and they only exist as a way
# to check/review the app at different stages
# and to document of course

PROJECT_ROOT = Pathname(__dir__) + '..' + '..'
ORG_FILE = PROJECT_ROOT + 'process.org'

# special stories category (=steps)?
desc '.org steps -> checklists/states for stories'
task :org do
  text = File.read ORG_FILE
  doc = Orgmode::Parser.new text

  book = Book.new
  inside = false
  doc.headlines.each { |x|
    if x.clean_headline_text == 'scenarios'
      inside = true
      next
    end
    next unless inside
    if x.level == 1
      inside = false
    end
    next unless inside

    if x.level == 2
      book.add_scenario x
    elsif x.level == 3
      book.add_step x
    else
      book.add_other x
    end
  }
  puts book.show
end

module Orgmode
  class Headline < Line
    CLEARERS = [
      -> x { x.sub /^\[\d*\/\d*\]\s+/, '' },
      -> x { x.sub /^WIP\s+/, '' },
    ]
    def clean_headline_text
      text = headline_text
      CLEARERS.each { |x| text = x.call text }
      text
    end
  end
end
