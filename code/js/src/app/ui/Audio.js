// it is using a service

class Audio {
  render() {
    let { filename } = this.props

    // let srcByFile = {}
    let src = srcByFile[filename]
    return (
      <audio preload='auto'>
        <source
          src={src}
          type='audio/mpeg'
        >
      </audio>
    )
  }
}

export default Audio
