
console.log('backround.js');
startSaving = false;
output = [];
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  console.log('This is the response',response);
if (response == 'save') {
console.log('saving!');
startSaving = false;
}else {
  output.push(response)

  console.log('output',output);


}
if (startSaving) {
  console.log('saving started!');
  // The ID of the extension we want to talk to.
  var AppId = " bfhbipndjpokfgadlfdgeihjdhkjcdbb";
console.log('sending to', AppId);
  // Make a simple request:
  chrome.runtime.sendMessage(AppId, {getTargetData: true},
    function(response) {
      if (targetInRange(response.targetData))
        chrome.runtime.sendMessage(AppId, output);
    });
}
});
