import { ajaxProxy, contentScripts } from './common/support'

chrome.runtime.onInstalled.addListener(() => {
  const scripts = contentScripts()
  chrome.scripting.unregisterContentScripts({ ids: scripts.map(script => script.id) }, () => {
    chrome.scripting.registerContentScripts(scripts, () => {
      scripts.forEach(script => console.log(`Inject content script: ${script.id}`))
    })
  })
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) {
    sendResponse(JSON.stringify({}))
    return true
  }
  if (request.type === 'ajax') {
    ajaxProxy(request, sender, sendResponse)
    return true
  }
  sendResponse(JSON.stringify({}))
  return true
})
