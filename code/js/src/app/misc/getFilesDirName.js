export default function getFilesDirName (files) {
  let dirName = files[0].webkitRelativePath
  if (dirName) {
    dirName = dirName.replace(/\/.+/, '')
  } else {
    dirName = 'directory_name'
  }
  return dirName
}
