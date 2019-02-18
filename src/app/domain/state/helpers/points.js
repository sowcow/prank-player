const UNSET = Symbol()
const ID = x => x

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
  mapSet(fun) {
    return this.setter(UNSET, fun)
  }
  setter(value = UNSET, mapping = ID) { // messy since it was copied from helpers/nestedAt.js
    return (tree, given = UNSET) => {
      let usedState = tree ? tree.select(this.path) : this.state
      if (value !== UNSET) {
        usedState.set(mapping(value))
      } else if (given !== UNSET) {
        usedState.set(mapping(given))
      } else {
        console.log('FIXME: give value in .setter() or on use!')
      }
    }
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
