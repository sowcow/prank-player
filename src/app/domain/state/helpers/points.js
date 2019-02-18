class Points {
  constructor (
    name,
    path,
    directState = null,
    reset = null
  ) {
    this.state = directState // used in tests
    this.reset = reset // used in tests
    this.name = name
    this.path = path
  }
  reset () {
    // used in tests
    this.reset()
    this.state.commit()
  }
  get () {
    // used in tests
    return this.state.get()
  }
  to (newName) {
    return new Points(newName, this.path)
  }
  at (newName) {
    return this.to(newName)
  }
}

function points (name, path, directState, reset) {
  return new Points(name, path, directState, reset)
}

export default points
