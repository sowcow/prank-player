Then 'user sees new entry {string}' do |string|
  expect(@bro.see? new_entry: string).to be true
end

Then 'it should play {string}' do |string|
  event = { 'type' => 'play_audio', 'filename' => string }
  expect(@deltas.deltas.last).to include event
end

