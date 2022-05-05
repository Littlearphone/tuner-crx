import { HackMappings } from './constant'

function injectFiles(tabId, site) {
  chrome.action.enable(tabId).then(console.log)
  chrome.action.setBadgeText({ text: 'ON' }).then(console.log)
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' }).then(console.log)
}

export const ajaxProxy = (request, sender, sendResponse) => {
  const data = request.data
  fetch(data.url, {
    method: data.type,
    body: data.body
  }).then(response => {
    response.text().then(text => {
      console.log(response.status, response.url)
      sendResponse(JSON.stringify({
        url: data.url,
        status: response.status,
        responseURL: response.url,
        responseText: text
      }))
    })
  }).catch(error => console.log(data, error))
}
export const contentScripts = () => {
  return HackMappings.filter(site => site.id).map(site => {
    const option = {
      matches: site.matchPatterns,
      id: site.id || 'undefined',
      runAt: 'document_start',
      allFrames: true
    }
    if (site.cssFiles) {
      option.css = Array.isArray(site.cssFiles) ? site.cssFiles : [site.cssFiles]
    }
    if (site.scriptFiles) {
      option.js = Array.isArray(site.scriptFiles) ? site.scriptFiles : [site.scriptFiles]
    }
    return option
  })
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
