
chrome.extension.getBackgroundPage()
chrome.tabs.executeScript(null, {

    file: 'getPagesSource.js'

});
document.addEventListener('DOMContentLoaded', function() {

  let stop = false;
  stopButton.addEventListener("click", function(){
      var port = chrome.runtime.connect({name: 'starter'});
    port.postMessage({startstop:'stop'});
    console.log('stop!');
    stop = true;
  });

startButton.addEventListener("click", function(){
    console.log('start');

var i = 0;

  var intervalId = setInterval(function(){
    var port = chrome.runtime.connect({name: 'starter'});
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
