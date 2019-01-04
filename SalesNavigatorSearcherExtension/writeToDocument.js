output = [];
console.log('writeToDocument');
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//             output.push(request.source)
//             console.log('request.source',requst.source);
// sendResponse('working?')
//   });
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "ouput");
output.push(msg.output)
console.log('msg output', msg.output);
  });

console.log('writeToDocument end');
