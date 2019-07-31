import { Button } from '@material-ui/core';
import React, { useContext, useRef } from 'react';

import { newEntriesSet } from '../app/domain/state/newEntries';
import { positionedEntriesSet } from '../app/domain/state/positionedEntries';
import Audio from '../app/components/Audio';
import AudioSrc, {
  AudioSrcUpdate,
  AudioSrcValue
} from '../app/components/AudioSrc';
import Hook from './helpers/Hook';
import MainState, { MainStatePure } from '../app/structure/MainState';
import featuresFor from './helpers/featuresFor'



featuresFor(
  'manual testing',
  'audio tag',
  `
  x plays static mp3
`,
  <audio controls>
    <source src='/A Good Bass for Gambling CC0.mp3' />
  </audio>
)


let TestAudioSrc = () => {
  let update = useContext(AudioSrcUpdate)
  let value = useContext(AudioSrcValue)

  let NAME = 'some.mp3'

  let url = value[NAME]
  let REAL_URL = '/A Good Bass for Gambling CC0.mp3'

  return <>
    <audio controls>
      <source
        src={REAL_URL}
      />
    </audio>
    <audio controls key={url}>
      <source
        src={url}
      />
    </audio>
    <Button
      onClick={() => {
        let src = REAL_URL
        update({ [NAME]: src })
      }}
    >
      simulate uploading
    </Button>
  </>
}

featuresFor(
  'manual testing',
  'AudioSrc',
  `
  x it holds urls of audio files...
`,
  <AudioSrc>
    <TestAudioSrc />
  </AudioSrc>
)

let TestAudio = () => {
  let update = useContext(AudioSrcUpdate)
  let audioRef = useRef()

  let NAME = 'some.mp3'
  let REAL_URL = '/A Good Bass for Gambling CC0.mp3'


  return <>
    <Audio name={NAME} ref={audioRef} />
    <Button
      onClick={() => {
        let src = REAL_URL
        update({ [NAME]: src })
      }}
    >
      simulate uploading
    </Button>
    <Button
      onClick={() => {
        audioRef.current.play()
      }}
    >
      play
    </Button>
  </>
}

featuresFor(
  'manual testing',
  'Audio',
  `
  x it plays named audio if url is available
`,
  <AudioSrc>
    <TestAudio />
  </AudioSrc>
)

featuresFor(
  'manual testing',
  'MainStatePure',
  `
    temp here
`,
  <MainStatePure
    newEntriesList={[
      { name: 'bait', fileName: 'bait.mp3' },
      { name: 'hello', fileName: 'hello.mp3' },
    ]}
  />
)

featuresFor(
  'manual testing',
  'MainState',
  `
    one can put stuff on it
`,
  <Hook
    mount={() => {
      positionedEntriesSet(null, [])
      newEntriesSet(null, [
        { name: 'bait', fileName: 'bait.mp3' },
        { name: 'hello', fileName: 'hello.mp3' },
        { name: 'very long name one can find here', fileName: 'long.mp3' },
        { name: 'hi', fileName: 'hi.mp3' },
        { name: 'a', fileName: 'a.mp3' },
        { name: 'b', fileName: 'b.mp3' },
        { name: 'c', fileName: 'c.mp3' },
        { name: 'привет', fileName: 'privet.mp3' },
      ])
    }}
  >
    <MainState />
  </Hook>
)
