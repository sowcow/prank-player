describe 'User uploads file' do
  example do
    @bro.goto @app.url
    @bro.upload dir: 'album', files: %w[
      greeting.mp3
      bait.mp3
      punch.mp3
    ]
    expect(@bro.see? new_button: 'greeting').to be true
    expect(@bro.see? new_button: 'bait').to be true
    expect(@bro.see? new_button: 'punch').to be true
  end
end
