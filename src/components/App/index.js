import React, { Component } from 'react';
import Uploading from '../Uploading'
import './style.css';

class App extends Component {
  state = {
    files: [],
    uris: [],
  }
  gotFile = file => {
    let { files, uris } = this.state
    if (!uris[file.name]) {
      uris[file.name] = URL.createObjectURL(file)
    }
    files.push(file)
    this.setState({ files, uris })
  }

  render() {
    let { files, uris } = this.state

      // sound.src = URL.createObjectURL(this.files[0]);
  // not really needed in this exact case, but since it is really important in other cases,
  // don't forget to revoke the blobURI when you don't need it
  // sound.onend = function(e) {
    // URL.revokeObjectURL(this.src);
  // }

    return (
      <div className="App">
        <header className="App-header">
          header
        </header>
        body
        <Uploading gotFile={this.gotFile} />
        {
          files.map( file =>
            <div key={ file.name }>
              { file.name }
              <audio controls>
                // <source src="horse.ogg" type="audio/ogg" />
                <source src={ uris[file.name] } type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
