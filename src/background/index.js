import { pageHacker, watchChanges } from './common/support'

setTimeout(watchChanges, 5000)
chrome.tabs.onCreated.addListener(pageHacker)
chrome.tabs.onUpdated.addListener(pageHacker)
// BeforeRequest.forEach(request => {
//   chrome.declarativeNetRequest.onBeforeRequest.addListener(request.handler, request.filter, request.options)
// })
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) {
    sendResponse(JSON.stringify({}))
    return true
  }
  if (request.type === 'ajax') {
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
    }).catch(error => console.log(data, error));
    return true
  }
  sendResponse(JSON.stringify({}))
  return true
})
