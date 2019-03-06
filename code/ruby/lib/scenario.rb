require 'kramdown'


Scenario = Struct.new :name, :steps do
  def self.from_markdown text
    doc = Kramdown::Document.new text
    v = Visitor.new doc.root, text
    Scenario.new v.name, v.steps
  end

  Step = Struct.new :name, :items do
    def to_h
      { name: name, items: items.map(&:to_h) }
    end
  end
  CheckItem = Struct.new :name, :done

  def to_h
    { name: name, steps: steps.map(&:to_h) }
  end

  Visitor = Struct.new :name, :steps do
    def initialize node, text
      @text = text
      self.steps = []
      visit_node node
    end

    def visit_node node
      visiting_method = method_name node
      public_send visiting_method, node
      node.children.each { |x| visit_node x }
    end

    def on_any_other node
      # p node.type
    end

    def on_header node
      node_name = extract_text node
      unless name
        self.name = node_name
      else
        step = Step.new node_name, []
        self.steps << step
      end
    end

    def on_li node
      node_name = extract_text node
      checked = get_checked node
      check_item = CheckItem.new node_name, checked
      steps.last.items << check_item
    end

    def get_checked node
      symbol = @text.lines[node.options[:location]-1].strip[0]
      return false if symbol == ?-
      return true if symbol == ?*
      raise 'wtf'
    end

    def method_name for_node
      name = "on_#{for_node.type}"
      respond_to?(name) ? name : :on_any_other
    end

    def extract_text node
      if node.value
        node.value.strip
      else
        extract_text node.children.first
      end
    end
  end

end


if __FILE__ == $0
  test_example = <<-doc.strip
# Toy scenario

any comments

# step 1: user does this

- some stuff that should be done
* some stuff that is done

# step 2: user does that

- other stuff to do
* other stuff that is done

# step 3: user finishes
  doc

  require 'minitest/autorun'
  describe Scenario do
    it 'works' do
      subj = Scenario.from_markdown test_example
      subj.to_h.must_equal({
        name: 'Toy scenario',
        steps: [
          { name: 'step 1: user does this', items: [
            { name: 'some stuff that should be done', done: false },
            { name: 'some stuff that is done', done: true },
          ] },
          { name: 'step 2: user does that', items: [
            { name: 'other stuff to do', done: false },
            { name: 'other stuff that is done', done: true },
          ] },
          { name: 'step 3: user finishes', items: [] },
        ],
      })
    end
  end
end
