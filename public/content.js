chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message", message);
  console.log("sender", sender);
  if (message === "openNewTab") {
    chrome.tabs.create({
      url: "chrome-extension://" + chrome.runtime.id,
    });
  }
});
