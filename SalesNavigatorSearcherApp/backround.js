console.log('backround');
chrome.app.runtime.onLaunched.addListener(function (launchData) {
  chrome.app.window.create('index.html', function(win) {
    win.contentWindow.launchData = launchData;
  });
});
var vrequest = [];
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

vrequest = request;

    });
    console.log('b4 err');
    chrome.runtime.sendMessage({greeting: vrequest}, function(response) {
    console.log(response);
  });
console.log('aftr err');
