// singleton service
// it knows about mapping of urls and file names
//
// it is fed with a collection of actual file objects
// it can be asked for url by name (or object that has name)
//
// it frees old urls

class Urls {
  constructor() {
    this.urls = {}
  }

  // it is fed with a collection of actual file objects
  thisIsTheGirl(dirName, updateSrc, files) {
    this._revokeUrls()
    this.urls = this._getUrls(dirName, files)
    updateSrc(this.urls)
  }

  // it can be asked for url by name (or object that has name)
  getUrl(name) {
    name = name.name ? name.name : name
    return this.urls[name]
  }

  _revokeUrls() {
    // Object.keys(this.urls).forEach( x =>
    //   URL.revokeObjectURL(this.urls[x])
    // )
  }

  _getUrls(dirName, files) {
    let urls = {}
    files.forEach(x => {
      let url = `soundboard://${dirName}/${x}`
      // urls[x.name] = URL.createObjectURL(x)
      urls[x] = url //URL.createObjectURL(x)
    })
    return urls
  }
}

let urlsService = new Urls()

export default urlsService
