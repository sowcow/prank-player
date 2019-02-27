require_relative './lib/paths'

file_name = -> name {
  name = name.strip
  name = name.gsub /\s+/, '_'
  "#{name}_spec.rb"
}

file_content = -> x {
<<doc.strip
describe "#{x['name']}" do
  it "works" do
    pending
  end
end
doc
}

task :org_to_tests do
  data = JSON.load File.read Paths.org_to_stories
  p data

  data.each { |scenario|
    (name, steps) = scenario.values_at 'name', 'steps'
    dir = Paths.scenario_tests + name
    dir.mkpath
    steps.each { |step|
      (name, checkboxes) = step.values_at 'name', 'checkboxes'
      file = dir + file_name[name]
      unless file.exists?
        File.write file, file_content[step]
      end
    }
  }
end

