
console.log('backround.js');
startSaving = false;
output = [];
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  console.log('This is the response',response);
if (response == 'save') {
console.log('saving!');
startSaving = false;
}else {
if (!isArrayInArray(output, response)) {
console.log('fine');
  output.push(response)

}else {
  console.log('includes');
}




}
function isArrayInArray(out,res ){
  var res_as_string = JSON.stringify(res);

  var contains = out.some(function(out){
    return JSON.stringify(out) === res_as_string;
  });
  return contains;
}
uniq_fast(output)
console.log('output',output);

if (output[output.length - 1] === 'end') {
startSaving(output);
}

function startSaving(output){
  var port = chrome.runtime.connect(laserExtensionId);
  console.log('addListener');
    port.postMessage({starter: starter});

}
