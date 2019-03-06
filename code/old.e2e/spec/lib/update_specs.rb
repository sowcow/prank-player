require 'parser/current'
require 'unparser'
require 'ast'

# new stuff from emacs is added to the specs
#
# v1 - just enforce names and number of steps (no deleting though)
#    - so you can rename existing and append stuff automatically
#
# v2 - maybe smarter handling
#      only if it would benefit (based on experience)
#
# whitespace/parens can be enforced by rubocop

END {
  file = File.join __dir__, '../foo_scenarios/main_stuff_spec.rb'
  goal = [
    'hey',
    'ya',
  ]
  UpdateSpecs.perform file, goal
}


class UpdateSpecs
  def self.perform file, goal
    x = UpdateSpecs.load file
    x.perform_v1 goal
    x.save
  end

  def self.load file
    new file, File.read(file)
  end

  def see
    p @ast
  end

  def perform_v1 goal
    actualize = Actualize.build goal
    @ast = actualize.process @ast
	end

  def initialize file, text
    @file = file
    @ast, @comments = Unparser.parse_with_comments text
  end

  def to_s
    Unparser.unparse @ast, @comments
  end

  def save
    File.write @file, to_s
  end

	class Actualize
	  include AST::Processor::Mixin

    def self.build goal
      new.tap { |x| x.goal = goal }
    end
    attr_accessor :goal

    def on_block node
			node.updated(nil, process_all(node))
		end

    def current_text old
      @current_goal_index ||= -1
      @current_goal_index += 1
      goal[@current_goal_index] || old
    end

    def on_send node
      target, message, argument = *node
      if message == :step && target.nil?
        old, _ = *argument
        new_argument = argument.updated(nil, [current_text(old)])
        return node.updated(nil, [target, message, new_argument])
      end
      nil
    end

    def on_begin node
      @begin_count ||= 0
      @begin_count += 1
      if @begin_count == 1
        have = node.children.count
        if have < goal.count
					to_add = goal.count - have
          new_ones = to_add.times.map { |x| template_to_add }
          return node.updated(nil,
            (node.children + new_ones).map { |x| process x }
					)
        end
      end
			node.updated(nil, process_all(node))
    end

		def template_to_add
			s(:block,
				s(:send, nil, :step,
					s(:str, "TEMPLATE_TO_ADD")
				),
				s(:args),
				s(:send, nil, :pending)
			)
		end
		module AstBuilder
			def s(type, *children)
				Parser::AST::Node.new(type, children)
			end
		end
		include AstBuilder

		def on_load(node)
			nil
		end

		def on_each(node)
			node.updated(nil, process_all(node))
		end
	end
end
