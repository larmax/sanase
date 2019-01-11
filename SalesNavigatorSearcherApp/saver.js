var response = [];
document.addEventListener('DOMContentLoaded', function() {
  saveButton.addEventListener("click", function(){
      saveAs();
  });
  });
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  console.log(response);
response = response;
});
function saveAs(toSave) {
  console.log('saveAs');
  chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(response) {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    fileEntry.createWriter(function(fileWriter) {
    var blob = new Blob([response], {type: 'text/plain'});
      fileWriter.write(blob);
    });
  });
}
