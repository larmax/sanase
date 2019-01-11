
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

console.log('output',output);

let last_of_output = output[response.length - 1];
if (last_of_output == "end") {
startSaving(output);
console.log('end',last_of_output);
}else {
  console.log('not end',last_of_output);
}

function startSaving(output){
  console.log('startSaving');
  document.oncopy = function(event) {
    event.clipboardData.setData('text/plain', output);
    event.preventDefault();
  };
  document.execCommand("copy", false, null);
}
});
