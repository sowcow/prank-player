# it gets accumulated events lists
# and provides deltas

class Deltas
  def initialize needed_deltas = 3, &block
    @getter = block
    @needed_deltas = needed_deltas
    @history = [[]]
  end

  def update
    got = @getter.call
    @history << got
    @history.shift while @history.count > @needed_deltas + 1
  end

  def deltas
    @history.each_cons(2).map { |a,b|
      b.drop a.length
    }
  end
end


if __FILE__ == $0
  require 'minitest/autorun'
  describe Deltas do
    let(:browser) do
      Module.new do
        def self.produce_one_event
          @state ||= 0; @state += 1
          @last_update = @state.times.map { |x| { name: 'some_event', value: x + 1 } }
        end
        def self.relevant_events
          @last_update || []
        end
        def self.last_update
          @last_update
        end
      end
    end
    let(:subject) do
      Deltas.new { browser.relevant_events }
    end

    it 'has no deltas when there was no updates' do
      subject.deltas.must_equal []
    end

    it 'has a single delta when there was one update and the value is that data' do
      browser.produce_one_event
      subject.update
      subject.deltas.must_equal [browser.last_update]
    end

    it 'works with longer example' do
      4.times {
        browser.produce_one_event
        browser.produce_one_event
        browser.produce_one_event
        subject.update
      }
      subject.deltas.must_equal [
        [{:name=>"some_event", :value=>4},
         {:name=>"some_event", :value=>5},
         {:name=>"some_event", :value=>6}],
        [{:name=>"some_event", :value=>7},
         {:name=>"some_event", :value=>8},
         {:name=>"some_event", :value=>9}],
        [{:name=>"some_event", :value=>10},
         {:name=>"some_event", :value=>11},
         {:name=>"some_event", :value=>12}],
      ]
    end
  end
end
