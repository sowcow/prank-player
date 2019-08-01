import { fabricUpdateDeletedStyle, setFabricState } from '../../ui/Interactive';
import { setEditingState } from '../state/mainState';
import { setFilesForTray, setPositionedEntries, setDeletedEntries } from './filesService';
import UrlsService from './UrlsService';

// let extractFileName = x =>
//   x && x.entryData && x.entryData.fileName

export default (data, entryFileObjects) => {
  let fabricData = data.fabric
  // let parser = new DOMParser()
  // let doc = parser.parseFromString(text, 'text/html')
  // let element = doc.getElementById('json')
  // let json = element.innerText
  // let data = JSON.parse(json)

  // let added = []
  let deleted = []
  let positioned = []
  let nonPositioned = []

  setImageUrls(fabricData.objects)

  let givenFiles = entryFileObjects //.map(x => x.name)
  let hasFile = x => !!givenFiles.find(y => y === x)
  let fabricEntries = fabricData.objects.map(x => x.entryData)
    .filter(x => !!x)

  fabricEntries.forEach(entry => {
    let fileName = entry.fileName
    if (!fileName) return

    if (hasFile(fileName)) {
      positioned.push(entry)
    } else {
      deleted.push(entry)
    }
  })

  entryFileObjects.forEach(file => {
    if (!positioned.find(x => x.fileName === file)) {
      nonPositioned.push(file)
    }
  })

  if (positioned.length) {
    setEditingState(null, false)
  } else {
    setEditingState(null, true)
  }

  setFabricState(fabricData).then(() => {
    setFilesForTray(nonPositioned)
    setPositionedEntries(positioned)
    setDeletedEntries(deleted)
    fabricUpdateDeletedStyle()
  })
}

const IMAGE = 'IMAGE'

function setImageUrls(xs) {
  let urls = UrlsService.urls
  xs.forEach(x => {
    let { kind, fileName } = x.entryData
    if (kind !== IMAGE) return

    let url = urls[fileName]
    x.src = url
  })
}
