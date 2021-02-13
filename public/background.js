const faviconMapping = {
  '.*(博客园|cnblogs).*': '//common.cnblogs.com/favicon.svg',
  '.*(脚本之家).*': 'https://www.jb51.net/favicon.ico',
  '.*(道客巴巴).*': 'http://www.doc88.com/favicon.ico',
  '.*(豆瓣).*': 'https://img3.doubanio.com/favicon.ico',
  '.*(新浪博客).*': 'http://blog.sina.com.cn/favicon.ico',
  '.*(个人图书馆).*': 'http://www.360doc.com/favicon.ico',
  '.*(腾讯云).*': 'https://cloud.tencent.com/favicon.ico',
  '.*(csdn).*': '//g.csdnimg.cn/static/logo/favicon32.ico',
  '.*(github).*': '//github.githubassets.com/favicons/favicon.png',
  '.*(w3school).*': 'https://www.w3school.com.cn/ui2019/logo-96-red.png',
  '.*(oschina|开源中国).*': 'https://static.oschina.net/new-osc/img/favicon.ico',
  '.*(segmentfault).*': 'http://cdn.segmentfault.com/v-5feb05cf/global/img/favicon.ico',
  '.*(51cto).*': 'https://s5.51cto.com/oss/202010/13/fa4588900383b7f5386d4e0ff11830ca.ico',
  '.*(weixin.qq).*': 'https://res.wx.qq.com/a/wx_fed/wechat_search_common_assets/res/developers/3x/developers-db8b687441.ico'
}
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
const pageHacker = function(tabId, changeInfo, tab) {
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
    getConfig.call({}, data, function(config) {
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
window.SiteMappings = [
  {
    expect: tab => /http(s)?:\/\/www.baidu.com.*/.test(tab.url),
    panelName: 'Baidu',
    injectCss: "hack/baidu/search.css",
    injectScript: "hack/baidu/search.js",
    injectConfig: { faviconMapping }
  },
  {
    expect: tab => /http(s)?:\/\/cn.bing.com\/search.*/.test(tab.url),
    panelName: 'Bing',
    injectCss: "hack/bing/search.css",
    injectScript: "hack/bing/search.js",
    injectConfig: { faviconMapping }
  },
  {
    expect: tab => /http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(tab.url),
    // panelName: 'Pc6',
    injectCss: "hack/pc6/software.css",
    injectScript: "hack/pc6/software.js"
  },
  {
    expect: tab => /http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(tab.url),
    // panelName: 'Zhihu',
    injectCss: "hack/zhihu/question.css",
    injectScript: "hack/zhihu/question.js"
  },
  {
    expect: tab => /http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(tab.url),
    // panelName: '51cto',
    injectCss: "hack/51cto/blog.css",
    injectScript: "hack/51cto/blog.js"
  },
  {
    expect: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(tab.url),
    // panelName: 'Segmentfault',
    injectCss: "hack/segmentfault/question.css",
    injectScript: "hack/segmentfault/question.js"
  },
  {
    expect: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(tab.url),
    // panelName: 'Segmentfault',
    injectCss: "hack/segmentfault/articles.css",
    injectScript: "hack/segmentfault/articles.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles)\/.*[.]html/.test(tab.url),
    // panelName: 'Cnblogs',
    injectCss: "hack/cnblogs/articles.css",
    injectScript: "hack/cnblogs/articles.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(tab.url),
    // panelName: 'Iteye',
    injectCss: "hack/iteye/magazines.css",
    injectScript: "hack/iteye/magazines.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(tab.url),
    // panelName: 'Iteye',
    injectCss: "hack/iteye/blog.css",
    injectScript: "hack/iteye/blog.js"
  },
  {
    expect: tab => /http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(tab.url),
    // panelName: 'Chinaunix',
    injectCss: "hack/chinaunix/article.css",
    injectScript: "hack/chinaunix/article.js"
  },
  {
    expect: tab => /http[s]?:\/\/www.bejson.com\/.*/.test(tab.url),
    // panelName: 'Bejson',
    injectCss: "hack/bejson/json.css",
    injectScript: "hack/bejson/json.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(tab.url),
    // panelName: 'Linuxidc',
    injectCss: "hack/linuxidc/article.css",
    injectScript: "hack/linuxidc/article.js"
  },
  {
    expect: tab => /http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(tab.url),
    // panelName: 'Tencent',
    injectCss: "hack/tencent/article.css",
    injectScript: "hack/tencent/article.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(tab.url),
    // panelName: 'Jianshu',
    injectCss: "hack/jianshu/article.css",
    injectScript: "hack/jianshu/article.js"
  },
  {
    expect: tab => /http[s]?:\/\/blog[.]csdn[.]net\/.*\/article\/details\/.*/.test(tab.url),
    // panelName: 'Csdn',
    injectCss: "hack/csdn/article.css",
    injectScript: "hack/csdn/article.js"
  },
  {
    expect: tab => /http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(tab.url),
    // panelName: 'Csdn',
    injectCss: "hack/csdn/topics.css",
    injectScript: "hack/csdn/topics.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(tab.url),
    // panelName: '7down',
    injectCss: "hack/7down/soft.css",
    injectScript: "hack/7down/soft.js"
  },
  {
    expect: tab => /http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(tab.url),
    // panelName: 'Jb51',
    injectCss: "hack/jb51/artical.css",
    injectScript: "hack/jb51/artical.js"
  },
  {
    expect: tab => /http(s)?:\/\/www.douyu.com\/directory\/myFollow/.test(tab.url),
    // panelName: 'Douyu',
    injectCss: "hack/douyu/my-follow.css",
    injectScript: "hack/douyu/my-follow.js"
  },
  {
    expect: tab => /http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(tab.url),
    // panelName: 'Douyu',
    injectCss: "hack/douyu/live-room.css",
    injectScript: "hack/douyu/live-room.js"
  },
  {
    expect: tab => /http(s)?:\/\/www.bilibili.com\/((bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)([a-zA-Z0-9]+)))/.test(tab.url),
    panelName: 'Bilibili',
    injectCss: "hack/bilibili/video.css",
    injectScript: "hack/bilibili/video.js"
  }
]
window.getConfig = function(data, callback) {
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
window.saveConfig = function(data) {
  if (!chrome.storage || !chrome.storage.local) {
    return
  }
  chrome.storage.local.set(data, () => {
    console.log('保存成功！')
  })
}
chrome.tabs.onCreated.addListener(pageHacker)
chrome.tabs.onUpdated.addListener(pageHacker)
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
