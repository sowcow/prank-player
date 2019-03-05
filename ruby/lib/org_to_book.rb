require_relative './private/monkeys_org'


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

module OrgToBook

  def self.convert text
    doc = Orgmode::Parser.new text

    book = OrgParsing::Book.new
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
    book
  end


  class Book
    def initialize
      @scenarios = []
      @last = nil
    end

    def add_scenario x
      @last = it = Scenario.from x
      @scenarios.push it
    end

    def add_step x
      @last.add_step x
    end

    def add_other x
      @last.add_other x
    end

    def show
      data = { scenarios: @scenarios.map { |x| x.show } }
    end

    def show_yaml
      require 'yaml'
      YAML.dump show
    end
  end


  class Scenario
    def self.from x
      name = x.clean_headline_text
      new name
    end

    def initialize name
      @name = name
      @steps = []
      @last = nil
    end

    def add_step x
      @last = it = Step.from x
      @steps.push it
    end

    def add_other x
      @last.add_other x
    end

    def show
      { name: @name, steps: @steps.map { |x| x.show } }
    end
  end


  class Step
    def self.from x
      name = x.clean_headline_text
      new name
    end

    def initialize name
      @name = name
      @checkboxes = []
    end

    def add_other x
      body = x.body_lines[1..-1]
      list_items = body.filter { |x|
        # p x.to_s
        # p x.to_s =~ /^- \[[X ]\] /
        # x.to_s =~ /^- \[[X ]\] /
        x.determine_major_mode == :unordered_list
      }
      list_items.each { |x|
        add_checkbox x
      }
    end

    def add_checkbox x
      it = Checkbox.from x
      @checkboxes.push it
      @checkboxes.compact!
    end

    def show
      { name: @name, checkboxes: @checkboxes.map { |x| x.show } }
    end
  end


  class Checkbox
    FILTER = /!/

    CHECKED = /^- \[X\]/
    UNCHECKED = /^- \[ \]/

    CLEAR_NAME = -> x {
      x.sub(CHECKED, '').sub(UNCHECKED, '').strip
    }

    def self.from x
      name = x.to_s
      return nil unless name =~ FILTER
      name[FILTER] = ''
      name.strip!
      checked = !!(name =~ CHECKED)
      name = CLEAR_NAME.call name
      new name, checked
    end

    def initialize name, checked
      @name = name
      @checked = checked
    end

    def show
      [@checked, @name]
    end
  end
end
