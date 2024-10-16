chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "scrollToAnswer" });
  }
});
