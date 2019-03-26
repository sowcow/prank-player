import { getFabricState } from '../ui/Interactive';
import { newEntriesList } from './state/newEntries';
import { positionedEntriesList } from './state/positionedEntries';

export default () => {
  // let name = 'soundboard.json'
  let data = {
    newEntriesList: newEntriesList.get(),
    positionedEntriesList: positionedEntriesList.get(),
    fabric: getFabricState(),
  }
  let text = JSON.stringify(data)

  // var html = '<html><head></head><body>ohai</body></html>';
// var uri = "data:text/html," + encodeURIComponent(html);
  let param = encodeURIComponent(text)
  var uri = 'http://localhost:3000?text=' + param
  var newWindow = window.open(uri);

  // newWindow.focus()

  // var tab = window.open('about:blank', '_blank');
// tab.document.write(text); // where 'html' is a variable containing your HTML
// tab.document.close(); // to finish loading the page

  // let win = window.open("data:text/html," + encodeURIComponent(text),
  //   '_blank','')
  //                        // "_blank", "width=200,height=100");
  // win.focus();

  // let file = toBlob(text)
  // saveAs(file, name)
}

// const type = { type: "application/octet-stream" }
// const type = { type: "attachment/csv;charset=utf-8" }
// function toBlob(text) {
//   return new Blob([text], type)
// }
