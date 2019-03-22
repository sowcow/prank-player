import { PRODUCTION } from '../misc/debug'

var omg

if (PRODUCTION) {
  class AppEvents {
    push() {
    }
    clear() {
    }
    toArray() {
    }
  }
  omg = AppEvents
} else {
  class AppEvents {
    constructor() {
      this.events = []
    }
    push(x) {
      this.events.push(x)
    }
    clear() {
      this.events = []
    }
    toArray() {
      return this.events
    }
  }
  omg = AppEvents
}
const AppEvents = omg

let service = new AppEvents()

if (!PRODUCTION) window.AppEvents = service

export default service
