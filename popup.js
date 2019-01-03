document.addEventListener('DOMContentLoaded', function() {
  let stop = false;
  stopButton.addEventListener("click", function(){
    console.log('stop!');
    stop = true;
  });
  startButton.addEventListener("click", function(){
    console.log('start');
    chrome.tabs.executeScript(null, {

        file: 'getPagesSource.js'

  });

});
});
