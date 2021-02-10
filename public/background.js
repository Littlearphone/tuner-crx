const filesInDirectory = dir => new Promise(resolve =>
  dir.createReader().readEntries(entries =>
    Promise.all(entries.filter(e => e.name[0] !== '.')
      .map(e => e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))))
      .then(files => [].concat(...files))
      .then(resolve)
  )
)
const timestampForFilesInDirectory = dir => filesInDirectory(dir)
  .then(files => files.map(f => f.name + f.lastModifiedDate).join())
const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || (lastTimestamp === timestamp)) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      chrome.runtime.reload()
    }
  })
}
chrome.management.getSelf(self => {
  if (self.installType === 'development') {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
      // NB: see https://github.com/xpl/crx-hotreload/issues/5
      tabs[0] && chrome.tabs.reload(tabs[0].id)
    })
  }
})
chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // 只有打开百度才显示pageAction
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'localhost' } })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})
chrome.webRequest.onBeforeRequest.addListener(details => {
  return { redirectUrl: details.url.replace('ajax.googleapis.com', 'cdn.bootcdn.net') }
  // // cancel 表示取消本次请求
  // if (!details.url) {
  //   return { cancel: true }
  // }
  // if (details.url.indexOf('ajax.googleapis.com') >= 0) {
  //   // chrome.notifications.create(null, {
  //   //   type: 'basic',
  //   //   iconUrl: 'img/icon.png',
  //   //   title: '检测到音视频',
  //   //   message: '音视频地址：' + details.url
  //   // })
  //   return { redirectUrl: details.url.replace('ajax.googleapis.com','cdn.bootcdn.net') }
  // }
}, { urls: ["*://ajax.googleapis.com/*.js"] }, ["blocking"])

function showAction(tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.url && changeInfo.url.indexOf('baidu.com') >= 0) {
    chrome.pageAction.show(tabId)
  }
}

chrome.tabs.onCreated.addListener(showAction)
chrome.tabs.onUpdated.addListener(showAction)
