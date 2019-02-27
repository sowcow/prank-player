require 'singleton'

class GroupsMetService
  include Singleton

  def initialize
    @met = {}
  end

  def met? x
    @met.has_key? x
  end

  def meet x
    @met[x] = true
  end
end

GroupsMet = GroupsMetService.instance
