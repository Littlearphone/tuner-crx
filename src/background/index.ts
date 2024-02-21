import {ajaxProxy, pageHacker} from '~/common/support'

// chrome.tabs.onCreated.addListener(tab => {
//   if (typeof tab.id !== "number") {
//     return
//   }
//   console.log('create tab', tab)
//   pageHacker(tab.id, {status: tab.status}, tab);
// })
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log('update tab', tab)
//   pageHacker(tabId, changeInfo, tab)
// })
// chrome.webRequest.onBeforeRequest.addListener(details => {
//   return {
//     redirectUrl: details.url.replace('ajax.googleapis.com', 'cdn.bootcdn.net')
//   }
// }, { urls: ["*://*/portal/login/ajax/submit.do"] }, ["blocking"])
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
