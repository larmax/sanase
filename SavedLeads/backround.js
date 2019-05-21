
console.log('backround.js');
var saving = false;
var output = [];
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  console.log('This is the response',response);
if (response == 'save') {
console.log('saving!');
saving = false;
}else {
if (!isArrayInArray(output, response)) {
console.log('fine');
  output.push(response)

}else {
  console.log(response[response.length - 1]);
if (response[response.length - 1] === "end") {

  startSaving(output);

  }
}


}

console.log('output',output);
// for (var i = 0; i < output.length; i++) {
//   console.log(output[i]+" ");
// }
if (response[response.length - 1] === "end") {
  saving = true;
startSaving(output);
console.log('end',response[response.length - 1]);
}else {
console.log('not end',response[response.length - 1]);
}

function startSaving(output){
  console.log('startSaving', output);
  let clip =[];
  for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
    clip.push(output[i].join('\n'));
  }
clip = clip.join('\n');
  document.oncopy = function(event) {
console.log("oncopy",clip);
  event.clipboardData.setData('text/plain', "");
    event.clipboardData.setData('text/plain', clip);

    event.preventDefault();
  };

  try {
    document.execCommand("copy");
  } catch (e) {
    console.error(e);
  }finally{
    clip = [];
    output = []
  }


}
function isArrayInArray(out,res ){
let res2 = [...res];
if (res2[res2.length-1] === "end") {
res2.splice(-1,1);
}

let  contains;
if (out.length === 0) {
  return contains;
}
for (var i = 0; i < out.length; i++) {

if (JSON.stringify(out[i]).includes(JSON.stringify(res2))) {
contains = true
}else {
  contains = false
}
}
  console.log("contains "+contains);
  return contains;
}
});
