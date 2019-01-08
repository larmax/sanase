let starter = null;
chrome.extension.getBackgroundPage()

document.addEventListener('DOMContentLoaded', function() {

  let stop = false;
  stopButton.addEventListener("click", function(){
    console.log('stop!');
    starter = 'stop';

    stop = true;
  });

  startButton.addEventListener("click", function(){
    console.log('start');
    starter = 'start';
    var i = 0;

    var intervalId = setInterval(function(){


      chrome.runtime.onConnect.addListener(function(port){
      console.log('addListener');
        port.postMessage({starter: starter});
      });
      console.log('starter', starter);
      console.log('  port.postMessage');
      chrome.tabs.executeScript(null, {

        file: 'getPagesSource.js'

      });

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
