require_relative '../../lib/browser'


$bro = Browser.new

Before do
  @bro = $bro
  @watir = @bro.watir
end

at_exit do
  $bro.done
end
