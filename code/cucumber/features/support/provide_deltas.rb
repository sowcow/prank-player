require_relative '../../lib/deltas'


Before '@deltas' do
  @deltas = Deltas.new { @bro.relevant_events @app }
end

AfterStep '@deltas' do |scenario|
  @deltas.update
end
