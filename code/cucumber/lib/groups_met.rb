require 'singleton'

class GroupsMetService
  include Singleton

  def initialize
    @met = {}
  end

  def met? x
    @met.key? x
  end

  def meet x
    @met[x] = true
  end
end

GroupsMet = GroupsMetService.instance
