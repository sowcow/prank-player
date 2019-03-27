import { setFabricState } from '../../ui/Interactive';
import { setFilesForTray, setPositionedEntries, setDeletedEntries } from './filesService';

let extractFileName = x =>
  x && x.entryData && x.entryData.fileName

export default (text, entryFileObjects) => {
  let parser = new DOMParser()
  let doc = parser.parseFromString(text, 'text/html')
  let element = doc.getElementById('json')
  let json = element.innerText
  let data = JSON.parse(json)

  // let added = []
  let deleted = []
  let positioned = []
  let nonPositioned = []

  let givenFiles = entryFileObjects.map(x => x.name)
  let hasFile = x => !!givenFiles.find(y => y === x)
  let fabricEntries = data.fabric.objects.map(x => x.entryData)
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
    if (!positioned.find(x => x.fileName === file.name)) {
      nonPositioned.push(file)
    }
  })

  setFilesForTray(nonPositioned)
  setPositionedEntries(positioned)
  setDeletedEntries(deleted)

  setFabricState(data.fabric)
}
