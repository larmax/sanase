
console.log('backround.js');
startSaving = false;
output = [];
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  console.log('This is the response',response);
if (response == 'save') {
console.log('saving!');
startSaving = false;
}else {
if (!output.includes(response)) {
  output.push(response)

}




}
uniq_fast(output)
console.log('output',output);
function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
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
