import { activeTab } from './common/options.js'
import { pageHacker, watchChanges } from './common/support.js'

chrome.tabs.onCreated.addListener(pageHacker)
chrome.tabs.onUpdated.addListener(pageHacker)
chrome.webRequest.onBeforeRequest.addListener(details => {
  return {
    redirectUrl: details.url.replace('ajax.googleapis.com', 'cdn.bootcdn.net')
  }
}, { urls: ["*://ajax.googleapis.com/*.js"] }, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(details => {
  return {
    redirectUrl: details.url.replace('cdnjs.cloudflare.com', 'cdn.bootcdn.net')
  }
}, { urls: ["*://cdnjs.cloudflare.com/*.js"] }, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(details => {
  return {
    redirectUrl: details.url.replace('maxcdn.bootstrapcdn.com/bootstrap', 'cdn.bootcdn.net/ajax/libs/twitter-bootstrap')
  }
}, { urls: ["*://maxcdn.bootstrapcdn.com/bootstrap/*.js"] }, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(details => {
  return {
    redirectUrl: details.url.replace('static.cloudflareinsights.com/beacon.min.js', 'cdn.bootcdn.net/ajax/libs/respond.js/1.4.2/respond.min.js')
  }
}, { urls: ["*://static.cloudflareinsights.com/beacon.min.js"] }, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(details => {
  return {
    redirectUrl: details.url.replace(/\/.*[.]vo[.]msecnd[.]net\//, '/vscode.cdn.azure.cn/')
  }
}, { urls: ["*://*.vo.msecnd.net/*.exe"] }, ["blocking"])
chrome.webRequest.onHeadersReceived.addListener(details => {
  // if (details.responseHeaders) {
  //   const headers = details.responseHeaders
  //   const contentDisposition = headers.find(header => header.name.toLowerCase() === 'content-disposition')
  //   if (isVideo(headers)) {
  //     const queryStart = details.url.indexOf('?')
  //     const nameStart = details.url.lastIndexOf('/') + 1
  //     const contentType = headers.find(header => header.name.toLowerCase() === 'content-type')
  //     console.log(`[${contentType.value}]${details.url.substring(nameStart, queryStart)}`)
  //     if (contentDisposition) {
  //       contentDisposition.value = 'attachment:filename=123.mp4'
  //     } else {
  //       headers.push({
  //         name: 'Content-Disposition',
  //         value: 'attachment:filename=123.mp4'
  //       })
  //     }
  //   }
  //   return { responseHeaders: headers }
  // }
  return {}
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
}, { urls: ["<all_urls>"] }, [
  "blocking",
  "responseHeaders",
  "extraHeaders"
])
chrome.management.getSelf(self => {
  if (self.installType === 'development') {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
    chrome.tabs.query(activeTab, tabs => tabs[0] && chrome.tabs.reload(tabs[0].id))
  }
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) {
    sendResponse(JSON.stringify({}))
    return true
  }
  if (request.type === 'ajax') {
    const data = request.data
    const xhr = new XMLHttpRequest()
    xhr.open(data.type, data.url)
    xhr.send(data.body)
    //绑定响应状态事件监听函数
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        sendResponse(JSON.stringify({
          url: data.url,
          status: xhr.status,
          responseURL: xhr.responseURL,
          responseText: xhr.responseText
        }))
      }
    }
    return true
  }
  sendResponse(JSON.stringify({}))
  return true
})
