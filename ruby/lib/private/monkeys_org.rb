require 'org-ruby'

# monkeys

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
