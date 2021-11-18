(function () {
  'use strict';

  const activeTab = {
    active: true,
    lastFocusedWindow: true
  };
  const siteMappings = [
    {
      expect: tab => /http(s)?:\/\/(www.)?baidu.com.*/.test(tab.url),
      panelName: 'BaiduConfig',
      inject: {
        state: 'loading',
        style: ["hack/baidu/search.css"],
        script: [
          "hack/pagination.js",
          "hack/baidu/search.js"
        ]
      }
    },
    {
      expect: tab => /http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
      panelName: 'BingConfig',
      inject: {
        state: 'loading',
        style: ["hack/bing/search.css"],
        script: [
          "hack/pagination.js",
          "hack/bing/search.js"
        ]
      }
    },
    {
      expect: tab => /http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
      panelName: 'GoogleConfig',
      inject: {
        state: 'loading',
        style: ["hack/google/search.css"],
        script: [
          "hack/pagination.js",
          "hack/google/search.js"
        ]
      }
    },
    {
      expect: tab => /http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/douyu/live-directory.css"],
        script: ["hack/douyu/live-directory.js"]
      }
    },
    {
      expect: tab => /http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(tab.url),
      panelName: 'DouyuLive',
      inject: {
        state: 'loading',
        style: ["hack/douyu/live-room.css"],
        script: ["hack/douyu/live-room.js"]
      }
    },
    {
      expect: tab => /http(s)?:\/\/www.bilibili.com\/((bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)([a-zA-Z0-9]+)))/.test(tab.url),
      panelName: 'BilibiliConfig',
      inject: {
        state: 'loading',
        style: ["hack/bilibili/video.css"],
        script: ["hack/bilibili/video.js"]
      }
    },
    {
      expect: tab => {
        return /http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/[^.]+[.]shtml#@page=[0-9]+/.test(tab.url)
          || /http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/?/.test(tab.url)
          || /http(s)?:\/\/manhua.dmzj.com\/?/.test(tab.url)
          || /http(s)?:\/\/www.dmzj.com\/view\/[^\/]+\/[^.]+[.]html#@page=[0-9]+/.test(tab.url)
          || /http(s)?:\/\/www.dmzj.com\/info\/[^.]+[.]html/.test(tab.url)
          || /http(s)?:\/\/www.dmzj.com\/?/.test(tab.url)
      },
      inject: {
        state: 'loading',
        style: ["hack/snippet/snippet.css"],
        script: ["hack/snippet/snippet.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/pc6/software.css"],
        script: ["hack/pc6/software.js"]
      }
    },
    {
      expect: tab => /http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/zhihu/question.css"],
        script: ["hack/zhihu/question.js"]
      }
    },
    {
      expect: tab => /http[s]:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/zhihu/zhuanlan.css"],
        script: ["hack/zhihu/zhuanlan.js"]
      }
    },
    {
      expect: tab => /http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/51cto/blog.css"],
        script: ["hack/51cto/blog.js"]
      }
    },
    {
      expect: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/segmentfault/question.css"],
        script: ["hack/segmentfault/question.js"]
      }
    },
    {
      expect: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/segmentfault/articles.css"],
        script: ["hack/segmentfault/articles.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/cnblogs/articles.css"],
        script: ["hack/cnblogs/articles.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/iteye/magazines.css"],
        script: ["hack/iteye/magazines.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/iteye/blog.css"],
        script: ["hack/iteye/blog.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/chinaunix/article.css"],
        script: ["hack/chinaunix/article.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www.bejson.com\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/bejson/json.css"],
        script: ["hack/bejson/json.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/linuxidc/article.css"],
        script: ["hack/linuxidc/article.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/tencent/article.css"],
        script: ["hack/tencent/article.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/jianshu/article.css"],
        script: ["hack/jianshu/article.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/([\w]+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/csdn/article.css"],
        script: ["hack/csdn/article.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/csdn/topics.css"],
        script: ["hack/csdn/topics.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/7down/soft.css"],
        script: ["hack/7down/soft.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/jb51/artical.css"],
        script: ["hack/jb51/artical.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/baidu/baijiahao.css"],
        script: ["hack/baidu/baijiahao.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/baidu/jingyan.css"],
        script: ["hack/baidu/jingyan.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/zhidao[.]baidu[.]com\/(link\?url=.*|question\/.*.html)/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/baidu/zhidao.css"],
        script: ["hack/baidu/zhidao.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/(www.)?mvcat[.]com\/.*/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/mvcat/style.css"],
        script: ["hack/mvcat/script.js"]
      }
    },
    {
      expect: tab => /http[s]?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(tab.url),
      inject: {
        state: 'loading',
        style: ["hack/360/article.css"],
        script: ["hack/360/article.js"]
      }
    }
  ];

  function flatDirectory(e) {
    if (e.isDirectory) {
      return filesInDirectory(e)
    }
    return new Promise(resolve => e.file(resolve))
  }

  const filesInDirectory = dir => {
    return new Promise(resolve => {
      return dir.createReader().readEntries(entries => {
        return Promise.all(entries.filter(e => e.name[0] !== '.').map(e => flatDirectory(e)))
          .then(files => [].concat(...files))
          .then(resolve)
      })
    })
  };
  const watchChanges = (dir, lastTimestamp) => filesInDirectory(dir)
    .then(files => files.map(f => f.name + f.lastModifiedDate).join())
    .then(timestamp => {
      if (!lastTimestamp || (lastTimestamp === timestamp)) {
        setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
      } else {
        setTimeout(chrome.runtime.reload, 1000);
      }
    });
  // iframe => https://codingdict.com/questions/13895
  const pageHacker = (tabId, changeInfo, tab) => {
    if (!tab || !tab.url) {
      return
    }
    const site = siteMappings.find(mapping => mapping.expect(tab));
    if (!site) {
      return
    }
    site.panelName && chrome.pageAction.show(tabId);
    const status = changeInfo && changeInfo.status;
    if (site.inject && status === site.inject.state) {
      const styles = site.inject.style;
      chrome.tabs.insertCSS(tabId, {
        file: '/hack/common.css',
        runAt: site.inject.runAt || 'document_start'
      });
      styles.length && styles.forEach(style => chrome.tabs.insertCSS(tabId, {
        file: style,
        runAt: site.inject.runAt || 'document_start'
      }), () => console.log(`完成${tabId}(${tab.title})样式注入: ${tab.url}`));
      chrome.tabs.executeScript(tabId, {
        file: '/hack/injected.js',
        runAt: site.inject.runAt || 'document_start'
      }, () => {
        console.log(`完成${tabId}(${tab.title})脚本注入: ${tab.url}`);
        const data = { [site.panelName]: [] };
        findConfig.call({}, data, (configs) => {
          const config = configs[site.panelName] || {};
          if (site.injectConfig) {
            config.injectConfig = site.injectConfig;
          }
          // 提供回调的话，接收方需要三个参数：transferData, sender, sendResponse，
          // 为了让扩展不提示The message port closed before a response was received，
          // 还需要在接收方调用sendResponse方法传递响应数据
          chrome.tabs.sendMessage(tabId, Object.assign({}, site, { config }));
          // chrome.tabs.sendMessage(tabId, message, console.log)
        });
        // chrome.tabs.sendMessage(tabId, message, console.log)
      });
    }
  };
  const findConfig = function(data, callback) {
    if (!chrome.storage || !chrome.storage.local) {
      return
    }
    chrome.storage.local.get(data, config => {
      callback && callback(config);
      Object.keys(config).forEach(name => {
        config[name] && Object.keys(config[name]).forEach(key => {
          this[key] = config[name][key];
        });
      });
    });
  };

  chrome.tabs.onCreated.addListener(pageHacker);
  chrome.tabs.onUpdated.addListener(pageHacker);
  chrome.webRequest.onBeforeRequest.addListener(details => {
    return {
      redirectUrl: details.url.replace('ajax.googleapis.com', 'cdn.bootcdn.net')
    }
  }, { urls: ["*://ajax.googleapis.com/*.js"] }, ["blocking"]);
  chrome.webRequest.onBeforeRequest.addListener(details => {
    return {
      redirectUrl: details.url.replace('cdnjs.cloudflare.com', 'cdn.bootcdn.net')
    }
  }, { urls: ["*://cdnjs.cloudflare.com/*.js"] }, ["blocking"]);
  chrome.webRequest.onBeforeRequest.addListener(details => {
    return {
      redirectUrl: details.url.replace('maxcdn.bootstrapcdn.com/bootstrap', 'cdn.bootcdn.net/ajax/libs/twitter-bootstrap')
    }
  }, { urls: ["*://maxcdn.bootstrapcdn.com/bootstrap/*.js"] }, ["blocking"]);
  chrome.webRequest.onBeforeRequest.addListener(details => {
    return {
      redirectUrl: details.url.replace('static.cloudflareinsights.com/beacon.min.js', 'cdn.bootcdn.net/ajax/libs/respond.js/1.4.2/respond.min.js')
    }
  }, { urls: ["*://static.cloudflareinsights.com/beacon.min.js"] }, ["blocking"]);
  chrome.webRequest.onBeforeRequest.addListener(details => {
    return {
      redirectUrl: details.url.replace(/\/.*[.]vo[.]msecnd[.]net\//, '/vscode.cdn.azure.cn/')
    }
  }, { urls: ["*://*.vo.msecnd.net/*.exe"] }, ["blocking"]);
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
  ]);
  chrome.management.getSelf(self => {
    if (self.installType === 'development') {
      chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
      chrome.tabs.query(activeTab, tabs => tabs[0] && chrome.tabs.reload(tabs[0].id));
    }
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request) {
      sendResponse(JSON.stringify({}));
      return true
    }
    if (request.type === 'ajax') {
      const data = request.data;
      const xhr = new XMLHttpRequest();
      xhr.open(data.type, data.url);
      xhr.send(data.body);
      //绑定响应状态事件监听函数
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          sendResponse(JSON.stringify({
            url: data.url,
            status: xhr.status,
            responseURL: xhr.responseURL,
            responseText: xhr.responseText
          }));
        }
      };
      return true
    }
    sendResponse(JSON.stringify({}));
    return true
  });

})();
