const INITIAL_CONFIG = { buttons: [] }

class SoundBoardConfig {
  constructor(width, height, files, configData = INITIAL_CONFIG) {
    super()
    this.width = width
    this.height = height
    this.configData = configData
    this.initGrid(files)
  }

  buttonData(name) {
    return this.configData.buttons[name]
  }

  // private

  initGrid(files) {
    let { buttons } = this.configData

    let newFiles = []
    files.forEach( x => {
      let neu = !this.buttonData(x.name)
      if (neu) {
        newFiles.push(x)
      }
    })
  }
}

export default SoundBoardConfig
