
document.addEventListener('DOMContentLoaded', function() {
  let stop = false;
  stopButton.addEventListener("click", function(){
    console.log('stop!');
        var vOneLS = localStorage.getItem("onePageRes");
        console.log(vOneLS);
    stop = true;
  });
  startButton.addEventListener("click", function(){
    console.log('start');
    console.log( chrome.runtime.id);
    chrome.tabs.executeScript(null, {

        file: 'getPagesSource.js'


  });

});
});
