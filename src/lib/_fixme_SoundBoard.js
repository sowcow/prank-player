// @flow

type Config = {|
  freeButtons: Array<Button>,
  modalGroups: Array<ModalGroup>
|}
const INITIAL_CONFIG: Config = {
  freeButtons: [],
  modalGroups: []
}
// type Config = typeof INITIAL_CONFIG

class Area {
  x: number
  y: number
  width: number
  height: number
}

class IconButton extends Area {
  icon: string
}

class MediaButton extends Area {
  mediaFile: MediaFile
}

type Button = IconButton | MediaButton

class ModalGroup {
  modalButton: Button
  modalArea: Area
  buttons: Array<Button>
}

class MediaFile {
  file: File
}

class SoundBoard {
  config: typeof INITIAL_CONFIG
  mediaFiles: Array<MediaFile>

  static load (rawFiles: Array<File>): SoundBoard {
    let config = INITIAL_CONFIG
    let mediaFiles = []

    return new SoundBoard(config, mediaFiles)
  }

  constructor (
    config: Config,
    mediaFiles: Array<MediaFile>
  ) {
    this.config = config
    this.mediaFiles = mediaFiles
  }

  /*
    // this.initGrid(files)
  buttonData (name) {
    return this.config.freeButtons.find(x => x.name === name)
  }

  // private

  initGrid (files) {
    let { freeButtons } = this.config

    let newFiles = []
    files.forEach(x => {
      let neu = !this.buttonData(x.name)
      if (neu) {
        newFiles.push(x)
      }
    })
  }
  */
}

export default SoundBoard
