function renderStatus(statusText, showtime = 750, permanent = false) {
  var status = document.getElementById("status");
  status.textContent = statusText;
  if (!permanent) {
    setTimeout(function () {
      status.textContent = "";
    }, showtime);
  }
}

function OpenSettings() {
  chrome.tabs.create({ url: "listviewer.html" });
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  document
  .querySelector("#settingsIcon")
  .addEventListener("click", OpenSettings);

    var manifestData = chrome.runtime.getManifest();
  document.querySelector("#title").innerText =
    "Rev Proj crawl V" + manifestData.version;
});
