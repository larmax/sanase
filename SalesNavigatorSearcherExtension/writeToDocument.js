chrome.windows.create({
    type: 'popup',
    url: "https://www.google.co.in/"
}, function (newWindow) {
    console.log(newWindow);
    chrome.tabs.executeScript(newWindow.tabs[0].id, {
        code: 'document.write(localStorage.getItem(localMerged));'
    });
});
