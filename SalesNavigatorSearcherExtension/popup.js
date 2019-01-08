chrome.extension.getBackgroundPage()
chrome.tabs.executeScript(null, {

    file: 'getPagesSource.js'

});
document.addEventListener('DOMContentLoaded', function() {
  var port = chrome.runtime.connect({name: 'starter'});
  let stop = false;
  stopButton.addEventListener("click", function(){
    port.postMessage({startstop:'stop'});
    console.log('stop!');
    stop = true;
chrome.runtime.sendMessage('save');
  });

startButton.addEventListener("click", function(){
    console.log('start');
        port.postMessage({startstop:'start'});
var i = 0;

  var intervalId = setInterval(function(){

port.postMessage({startstop:'start'});

     if(stop){
        clearInterval(intervalId);
     }

     i++;
     console.log(i);
  }, 1000);
    //   function getPagesSource (){
    //   chrome.tabs.executeScript(null, {
    //
    //       file: 'getPagesSource.js'
    //
    // });
    // }


});

});
