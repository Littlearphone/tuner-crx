export const activeTab = {
  active: true,
  lastFocusedWindow: true
}
export const siteMappings = [
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
  },
  {
    expect: tab => /http[s]?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(tab.url),
    inject: {
      state: 'loading',
      style: ["hack/stackoverflow/question.css"],
      script: ["hack/stackoverflow/question.js"]
    }
  }
]
