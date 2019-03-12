Then 'user sees new entry {string}' do |string|
  expect(@bro.see? new_entry: string).to be true
end
