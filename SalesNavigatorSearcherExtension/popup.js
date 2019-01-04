chrome.extension.getBackgroundPage()
document.addEventListener('DOMContentLoaded', function() {
  let stop = false;
  stopButton.addEventListener("click", function(){
    console.log('stop!');
    stop = true;
chrome.runtime.sendMessage('save');
  });

startButton.addEventListener("click", function(){
    console.log('start');
    chrome.tabs.executeScript(null, {

          file: 'writeToDocument.js'

    });
var i = 0;
  var intervalId = setInterval(function(){
    chrome.tabs.executeScript(null, {

        file: 'getPagesSource.js'

  });

     if(stop){
        clearInterval(intervalId);
     }

     i++;
     console.log(i);
  }, 1000);
      function getPagesSource (){
      chrome.tabs.executeScript(null, {

          file: 'getPagesSource.js'

    });
    }


});

});
