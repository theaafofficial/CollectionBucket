chrome.contextMenus.create({
  id: "saveTextAndUrl",
  title: "Save Text and URL",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveTextAndUrl") {
    const data = {
      title: tab.title,
      url: info.pageUrl,
      text: info.selectionText
    };

    // Generate a unique ID based on the current time
    const key = new Date().getTime().toString();

    chrome.storage.sync.set({[key]: data}, () => {
      console.log('Data is saved');
    });
  }
});
