import { getFabricState } from '../ui/Interactive';
import { saveBoardData } from '../../electron';
import { uploadDirName } from './state/dirName';

// let text_to_send = null

// export function sendUpdatesOnNeed() {
//   const channel = new BroadcastChannel('saving_mode')
//   channel.onmessage = function(e) {
//     if (e.data.type === 'get_text') {
//       channel.postMessage({
//         type: 'text_value',
        // value: text_to_send
//       })
//     }
//   }
// }
// channel.close();


export default () => {
  let board = { name: uploadDirName.get() }
  let data = { fabric: getFabricState() }
  saveBoardData(board, data).then(() =>
    console.log('saved successfully')
  ).catch(() =>
    console.log('error saving')
  )
}

/*
  // let name = 'soundboard.json'
  let data = {
    // newEntriesList: newEntriesList.get(),
    // positionedEntriesList: positionedEntriesList.get(),
    fabric: getFabricState(),
  }
  let text = JSON.stringify(data)
  text_to_send = text



  // var html = '<html><head></head><body>ohai</body></html>';
// var uri = "data:text/html," + encodeURIComponent(html);
  // let param = encodeURIComponent(text)
  // let param = encodeURIComponent(text)


  let param = 'to-save'
  // param = btoa(param)
  param = encodeURIComponent(param)
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
*/
// const type = { type: "application/octet-stream" }
// const type = { type: "attachment/csv;charset=utf-8" }
// function toBlob(text) {
//   return new Blob([text], type)
// }
