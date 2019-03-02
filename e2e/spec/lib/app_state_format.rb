module AppStateFormat
  module_function

  JOINER = ' -- '

  def step_to_id path
    path.join JOINER
  end

  def step_id_to_path string
    string.split JOINER
  end
end
