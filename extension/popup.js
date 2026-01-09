document.getElementById("start").onclick = async () => {
  const url = chrome.runtime.getURL("capture.html");

  const tabs = await chrome.tabs.query({ url });

  if (tabs.length > 0) {
    chrome.tabs.update(tabs[0].id, { active: true });
  } else {
    chrome.tabs.create({ url });
  }
};
