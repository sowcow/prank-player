require 'json'

require 'org_to_book'
require 'paths'

# NOTE: gona try canvas and this introduces new questions to tests
#       so this nice feature will wait
# ALSO: this may be a part of slideshow/video generation so
#       the feature is a must-have
# ALTHOUGH: it will simplify stories so much that
#           I really wanna do this now

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


# special stories category (=steps)?
desc '.org steps -> checklists/states for stories'
task :org_to_json do
  text = File.read Paths.org_file
  book = OrgToBook.convert text

  text = JSON.pretty_generate book.show

  file = Paths.org_to_stories
  file.parent.mkpath
  File.write file, text
end
