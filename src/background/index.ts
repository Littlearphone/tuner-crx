import {ajaxProxy, pageHacker} from '~/common/support'
import {useOptionConfigStore} from '~/stores/option-config'

// chrome.tabs.onCreated.addListener(tab => {
//   if (typeof tab.id !== "number") {
//     return
//   }
//   console.log('create tab', tab)
//   pageHacker(tab.id, {status: tab.status}, tab);
// })
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('update tab', tabId, tab)
  pageHacker(tabId, changeInfo, tab)
})
chrome.webNavigation.onCommitted.addListener(function (e) {
  if (e.url === 'about:blank') {
    return
  }
  pageHacker(e.tabId, {status: true}, e)
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) {
    return sendResponse({})
  }
  if (request.type === 'ajax') {
    ajaxProxy(request, sender, sendResponse)
    return true
  }
  return sendResponse({})
})

function autoReload() {
  setTimeout(autoReload, 5000)
  const manifest = chrome.runtime.getManifest()
  fetch('/manifest.json').then(res => res.json()).then(json => {
    if (json.version !== manifest.version) {
      chrome.runtime.reload()
    }
  })
}

chrome.management.getSelf(result => {
  useOptionConfigStore()
  if (result.installType === 'development') {
    autoReload()
  }
})
