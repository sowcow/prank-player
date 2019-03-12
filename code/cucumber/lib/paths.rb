require 'pathname'

module Paths
  module_function

  def shots
    exists 'shots'
  end

  def exists x
    Pathname(x).mkpath
    x
  end
end
