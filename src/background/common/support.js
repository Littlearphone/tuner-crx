import { ActiveTab, HackMappings } from './constant'

export const watchChanges = () => {
  self.fetch(chrome.runtime.getURL('manifest.json'))
    .then(response => response.json())
    .then(data => {
      if (data.version === chrome.runtime.getManifest().version) {
        setTimeout(watchChanges, 5000)
        return
      }
      setTimeout(() => {
        chrome.runtime.reload()
        chrome.tabs.query(ActiveTab)
          .then(([tab]) => chrome.tabs.reload(tab.id))
      }, 1000)
    })
}
const ofFiles = (site, data) => {
  const option = {
    matches: site.matchPatterns,
    id: site.id || 'undefined',
    runAt: 'document_start',
    allFrames: true
  }
  if (data.injectCss || !data.hasOwnProperty('injectCss')) {
    option.css = site.cssFiles
  }
  if (data.injectScript || !data.hasOwnProperty('injectScript')) {
    option.js = site.scriptFiles
  }
  return [option]
}

function injectFiles(tabId, site) {
  chrome.action.enable(tabId).then(console.log)
  chrome.action.setBadgeText({ text: 'ON' }).then(console.log)
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' }).then(console.log)
  const description = site.configDescription
  const configId = description && description.configId
  if (!configId) {
    return
  }
  chromeStorage(configId, configs => {
    const data = configs && configs[configId] || {}
    if (data.hasOwnProperty('enable') && !data.enable) {
      return
    }
    injectScriptRecursive(ofFiles(site, data), () => {
      console.log('完成动态脚本与样式注入')
      chrome.tabs.sendMessage(tabId, { data }, response => {
        console.log(`成功注入data到${tabId}: ${JSON.stringify(response)}`)
      })
    })
  })
}

function injectScriptRecursive(files, callback) {
  if (!files || !files.length) {
    return
  }
  const ids = files.map(file => file.id || 'undefined')
  chrome.scripting.unregisterContentScripts({ ids }, () => {
    chrome.scripting.registerContentScripts(files).then(() => {
      files.length && typeof callback === 'function' && callback()
    })
  })
}

// iframe => https://codingdict.com/questions/13895
export const pageHacker = (tabId, changeInfo, tab) => {
  if (!tab || !tab.url) {
    return
  }
  const site = HackMappings.find(mapping => mapping.expectUrl(tab))
  if (!site) {
    return
  }
  if (!site.expectStatus) {
    site.expectStatus = info => info && info.status === 'loading'
  }
  if (!site.expectStatus(changeInfo)) {
    return
  }
  injectFiles(tabId, site)
}
export const chromeStorage = function(keys, callback) {
  if (!keys || !chrome.storage || !chrome.storage.local) {
    return
  }
  if (typeof keys === 'string' || Array.isArray(keys)) {
    chrome.storage.local.get(keys, callback || (config => console.log(`取值成功: ${JSON.stringify(config)}`)))
    return
  }
  chrome.storage.local.set(keys, callback || (() => console.log(`保存成功: ${JSON.stringify(keys)}`)))
}
