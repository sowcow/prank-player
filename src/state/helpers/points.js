class Points {
  constructor (name, path) {
    this.name = name
    this.path = path
  }
  to (newName) {
    return new Points(newName, this.path)
  }
  at (newName) {
    return this.to(newName)
  }
}

function points (name, path) {
  return new Points(name, path)
}

export default points
