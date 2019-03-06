require "minitest/autorun"
  class Meme
    def i_can_has_cheezburger?
      'OHAI!'
    end
    def will_it_blend?
      'yeeea'
    end
  end

describe Meme do

  before do
    @meme = Meme.new
  end

  describe "when asked about cheeseburgers" do
    it "must respond positively" do
      @meme.i_can_has_cheezburger?.must_equal "OHAI!"
    end
  end

  describe "when asked about blending possibilities" do
    it "won't say no" do
      @meme.will_it_blend?.wont_match /^no/i
    end
  end
end
