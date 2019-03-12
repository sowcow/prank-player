state_name = -> name {
  name.to_s.gsub /\s+/, ?_
}

Given 'initial state' do
  @bro.goto @app.url # old way! fixme
end

Given 'the state {string}' do |name|
  name = state_name.call name
  @storage.take_current_state_from name
  @app.set_state @bro, @storage.app_state
end

Then 'this state is {string}' do |name|
  name = state_name.call name
  json_string = @app.get_state @bro
  @storage.app_state = json_string
  @storage.name_the_state name
end
