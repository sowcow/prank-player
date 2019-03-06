xdescribe 'User uploads file' do
  # older way to do it (raw)
  example do
    @bro.goto @app.url
    @bro.upload dir: 'album', files: %w[
      greeting.mp3
      bait.mp3
      punch.mp3
    ]
    expect(@bro.see? new_entry: 'greeting').to be true
    expect(@bro.see? new_entry: 'bait').to be true
    expect(@bro.see? new_entry: 'punch').to be true
  end
end
