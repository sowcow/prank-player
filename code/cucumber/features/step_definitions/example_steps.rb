Given("Alice is hungry") do
  @sate = 0
end

When("she eats {int} cucumbers") do |int|
  @sate += int
end

Then("she will be full") do
  expect(@sate).to be >= 3
end
