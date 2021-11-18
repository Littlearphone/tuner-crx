import { siteMappings } from './options.js'

function flatDirectory(e) {
  if (e.isDirectory) {
    return filesInDirectory(e)
  }
  return new Promise(resolve => e.file(resolve))
}

export const filesInDirectory = dir => {
  return new Promise(resolve => {
    return dir.createReader().readEntries(entries => {
      return Promise.all(entries.filter(e => e.name[0] !== '.').map(e => flatDirectory(e)))
        .then(files => [].concat(...files))
        .then(resolve)
    })
  })
}
export const watchChanges = (dir, lastTimestamp) => filesInDirectory(dir)
  .then(files => files.map(f => f.name + f.lastModifiedDate).join())
  .then(timestamp => {
    if (!lastTimestamp || (lastTimestamp === timestamp)) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      setTimeout(chrome.runtime.reload, 1000)
    }
  })
// iframe => https://codingdict.com/questions/13895
export const pageHacker = (tabId, changeInfo, tab) => {
  if (!tab || !tab.url) {
    return
  }
  const site = siteMappings.find(mapping => mapping.expect(tab))
  if (!site) {
    return
  }
  site.panelName && chrome.pageAction.show(tabId)
  const status = changeInfo && changeInfo.status
  if (site.inject && status === site.inject.state) {
    const styles = site.inject.style
    chrome.tabs.insertCSS(tabId, {
      file: '/hack/common.css',
      runAt: site.inject.runAt || 'document_start'
    })
    styles.length && styles.forEach(style => chrome.tabs.insertCSS(tabId, {
      file: style,
      runAt: site.inject.runAt || 'document_start'
    }), () => console.log(`完成${tabId}(${tab.title})样式注入: ${tab.url}`))
    chrome.tabs.executeScript(tabId, {
      file: '/hack/injected.js',
      runAt: site.inject.runAt || 'document_start'
    }, () => {
      console.log(`完成${tabId}(${tab.title})脚本注入: ${tab.url}`)
      const data = { [site.panelName]: [] }
      findConfig.call({}, data, (configs) => {
        const config = configs[site.panelName] || {}
        if (site.injectConfig) {
          config.injectConfig = site.injectConfig
        }
        // 提供回调的话，接收方需要三个参数：transferData, sender, sendResponse，
        // 为了让扩展不提示The message port closed before a response was received，
        // 还需要在接收方调用sendResponse方法传递响应数据
        chrome.tabs.sendMessage(tabId, Object.assign({}, site, { config }))
        // chrome.tabs.sendMessage(tabId, message, console.log)
      })
      // chrome.tabs.sendMessage(tabId, message, console.log)
    })
  }
}
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
  chrome.storage.local.set(data, () => console.log('保存成功！'))
}
export const isVideo = function(headers) {
  const contentType = headers.find(header => header.name.toLowerCase() === 'content-type')
  if (!contentType) {
    return false
  }
  if (contentType.value.startsWith('video/')) {
    return true
  }
  const contentRange = headers.find(header => header.name.toLowerCase() === 'content-range')
  return contentType.value.startsWith('application/octet-stream') && contentRange
}
