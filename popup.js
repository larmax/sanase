document.addEventListener('DOMContentLoaded', function() {
  startButton.addEventListener("click", function(){
    console.log('clicked');
    chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  });

});
});
