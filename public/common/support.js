import SiteMappings from './injected.js'

const filesInDirectory = dir => new Promise(resolve =>
  dir.createReader().readEntries(entries => Promise.all(entries.filter(e => e.name[0] !== '.')
    .map(e => e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))))
    .then(files => [].concat(...files))
    .then(resolve))
)
const watchChanges = (dir, lastTimestamp) => filesInDirectory(dir)
  .then(files => files.map(f => f.name + f.lastModifiedDate).join())
  .then(timestamp => {
    if (!lastTimestamp || (lastTimestamp === timestamp)) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      chrome.runtime.reload()
    }
  })
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
const pageHacker = (tabId, changeInfo, tab) => {
  if (!changeInfo || changeInfo.status !== 'complete' || !tab || !tab.url) {
    return
  }
  const site = SiteMappings.find(mapping => mapping.expect(tab))
  if (!site) {
    return
  }
  site.panelName && chrome.pageAction.show(tabId)
  site.injectCss && chrome.tabs.insertCSS(tabId, { file: site.injectCss })
  site.injectScript && chrome.tabs.executeScript(tabId, { file: site.injectScript }, function() {
    const data = {}
    data[site.panelName] = {}
    findConfig.call({}, data, (config) => {
      const message = config[site.panelName] || {}
      if (site.injectConfig) {
        message.injectConfig = site.injectConfig
      }
      chrome.tabs.sendMessage(tabId, message, function() {
        console.log("注入页面参数成功")
      })
    })
  })
}
chrome.tabs.onCreated.addListener(pageHacker)
chrome.tabs.onUpdated.addListener(pageHacker)
// chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [
//         new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'localhost' } })
//       ],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }])
//   })
// })
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
export const findConfig = function(data, callback) {
  if (!chrome.storage || !chrome.storage.local) {
    return
  }
  chrome.storage.local.get(data, config => {
    callback && callback(config)
    Object.keys(config).forEach(name => {
      config[name] && Object.keys(config[name]).forEach(key => {
        this[key] = config[name][key]
      })
    })
  })
}
export const saveConfig = function(data) {
  if (!chrome.storage || !chrome.storage.local) {
    return
  }
  chrome.storage.local.set(data, () => {
    console.log('保存成功！')
  })
}
