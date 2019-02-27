module MethodBuilder
  class Builder
    def method_missing *a
      raise "oops: #{a.inspect}" unless a.count == 2
      (name, value) = a
      @stuff ||= []
      @stuff << [name, value]
      self.define_singleton_method name do value end
    end

    def self.apply builder, other
      stuff = builder.instance_variable_get :@stuff
      stuff.each { |name, value|
        other.define_singleton_method name do value end
      }
    end
  end

  def build_methods &block
    builder = Builder.new
    builder.instance_eval &block
    Builder.apply builder, self
  end
end
