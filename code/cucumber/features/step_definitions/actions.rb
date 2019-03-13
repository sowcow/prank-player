When 'user clicks {string}' do |pair|
  (kind, text) = pair.split(?:).map &:strip
  kind = kind.gsub ' ', ?_
  @bro.click kind => text
end

