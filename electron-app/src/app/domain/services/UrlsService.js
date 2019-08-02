// singleton service
// it knows about mapping of urls and file names

class Urls {
  constructor() {
    this.urls = {}
  }

  thisIsTheGirl(dirName, updateSrc, files) {
    this.urls = this._getUrls(dirName, files)
    updateSrc(this.urls)
  }

  // it can be asked for url by name (or object that has name)
  getUrl(name) {
    name = name.name ? name.name : name
    return this.urls[name]
  }

  _getUrls(dirName, files) {
    let urls = {}
    files.forEach(x => {
      let url = `soundboard://${dirName}/${x}`
      urls[x] = url
    })
    return urls
  }
}

let urlsService = new Urls()

export default urlsService
