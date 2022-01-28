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
const ofFiles = injectData => {
  if (typeof injectData === 'string') {
    return [{ files: [injectData] }]
  }
  if (!Array.isArray(injectData)) {
    return [{ files: injectData.file }]
  }
  return injectData.flatMap(ofFiles)
}

function injectFiles(tabId, site) {
  chrome.action.enable(tabId).then(console.log)
  chrome.action.setBadgeText({ text: 'ON' }).then(console.log)
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' }).then(console.log)
  const description = site.configDescription
  const configId = description && description.configId
  if (configId) {
    chromeStorage(configId, configs => {
      const data = configs && configs[configId] || {}
      if (data.hasOwnProperty('enable') && !data.enable) {
        return
      }
      // 设了个寂寞的files，目前chrome官方显示只支持一个文件
      const baseInjection = { target: { tabId } }
      if (data.injectCss || !data.hasOwnProperty('injectCss')) {
        injectCssRecursive(ofFiles(site.cssFiles), baseInjection, () => console.log('完成css的注入'))
      }
      if (data.injectScript || !data.hasOwnProperty('injectScript')) {
        injectScriptRecursive(ofFiles(site.scriptFiles), baseInjection, () => {
          console.log('完成script的注入')
          chrome.tabs.sendMessage(tabId, { data }, response => {
            console.log(`成功注入data到${tabId}: ${JSON.stringify(response)}`)
          })
        })
      }
    })
  }
}

function injectCssRecursive(files, baseInjection, callback) {
  if (!files || !files.length) {
    return
  }
  const injection = Object.assign(files.shift(), baseInjection)
  chrome.scripting.insertCSS(injection).then(() => {
    console.log(`成功注入css: ${injection.files}`)
    !files.length && typeof callback === 'function' && callback()
    injectCssRecursive(files, baseInjection, callback)
  })
}

function injectScriptRecursive(files, baseInjection, callback) {
  if (!files || !files.length) {
    return
  }
  const injection = Object.assign(files.shift(), baseInjection)
  chrome.scripting.executeScript(injection).then(() => {
    console.log(`成功注入script: ${injection.files}`)
    !files.length && typeof callback === 'function' && callback()
    injectScriptRecursive(files, baseInjection, callback)
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
