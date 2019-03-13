state_name = -> name {
  name.to_s.gsub /\s+/, ?_
}

Given 'initial state' do
  @bro.goto @app.url unless @bro.at_the_page?
  # TODO: reset tree state
end

Given 'the state {string}' do |name|
  step 'initial state' unless @bro.at_the_page?

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
