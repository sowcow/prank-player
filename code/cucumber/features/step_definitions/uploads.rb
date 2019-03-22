require_relative '../../lib/fake_files'

# When 'user uploads directory:' do |string|
#   data = YAML.safe_load string
#   (name, files) = data.values_at 'name', 'files'
#   @bro.upload dir: name, files: files
# end

When 'user has a directory:' do |string|
  data = YAML.safe_load string
  (name, files) = data.values_at 'name', 'files'

  directory = @storage.directory name
  FakeFiles.new(directory).create files
end

When 'user uploads the directory {string}' do |string|
  path = @storage.upload_directory string
  @bro.upload path
end

When 'user adds files for uploading:' do |string|
  pending
end

When 'user saves the progress file into {string}' do |string|
  pending
end
