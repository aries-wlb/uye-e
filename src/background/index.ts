chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Transform',
    id: 'uye-menu-1',
    type: 'normal',
    contexts:['all']
  });
});

/**
 * 右键菜单点击事件
 */
chrome.contextMenus.onClicked.addListener(async (info) => {
  if(info.menuItemId=='uye-menu-1'){
    const selectedText = info.selectionText;
    // Here you can add your logic to analyze the selected text
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    console.log("Selected text:", selectedText);
    // For now, we'll just send an alert with the selected text
    chrome.tabs.sendMessage(tab.id!, {
      action: "transformJSON",
      text: selectedText
    });
  }
});
