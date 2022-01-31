export const DefaultConfig = {
  configLabel: '配置开关'
}
export const ActiveTab = {
  active: true,
  currentWindow: true
}
export const BeforeRequest = [{
  filter: { urls: ['*://ajax.googleapis.com/*.js'] },
  options: ['blocking'],
  handler(details) {
    return {
      redirectUrl: details.url.replace('ajax.googleapis.com', 'cdn.bootcdn.net')
    }
  }
}]
export const HackMappings = [{
  expectUrl: tab => /http(s)?:\/\/(www.)?baidu.com.*/.test(tab.url),
  cssFiles: ['hack/common.css', 'hack/baidu/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/baidu/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'baidu-search',
    configLabel: '"搜索"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/zhidao[.]baidu[.]com\/question\/.*.html/.test(tab.url),
  cssFiles: 'hack/baidu/zhidao.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/zhidao.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'baidu-zhidao',
    configLabel: '"知道"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(tab.url),
  cssFiles: 'hack/baidu/jingyan.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/jingyan.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'baidu-jingyan',
    configLabel: '"经验"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(tab.url),
  cssFiles: 'hack/baidu/baijiahao.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/baijiahao.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'baidu-baijiahao',
    configLabel: '"震惊"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  cssFiles: ['hack/common.css', 'hack/bing/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/bing/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'bing-search',
    configLabel: '"搜索"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  cssFiles: ['hack/common.css', 'hack/google/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/google/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'google-search',
    configLabel: '"搜索"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(tab.url),
  cssFiles: 'hack/douyu/live-directory.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/douyu/live-directory.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'douyu-follow',
    configLabel: '"关注"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(tab.url),
  cssFiles: ['hack/common.css', 'hack/douyu/live-room.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/douyu/live-room.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'douyu-room',
    configLabel: '"直播"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http(s)?:\/\/www.bilibili.com\/((bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)([a-zA-Z0-9]+)))/.test(tab.url),
  cssFiles: 'hack/bilibili/video.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/bilibili/video.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'bilibili-video',
    configLabel: '"视频"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => {
    return /http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/[^.]+[.]shtml#@page=[0-9]+/.test(tab.url) || /http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/?/.test(tab.url) || /http(s)?:\/\/manhua.dmzj.com\/?/.test(tab.url) || /http(s)?:\/\/www.dmzj.com\/view\/[^\/]+\/[^.]+[.]html#@page=[0-9]+/.test(tab.url) || /http(s)?:\/\/www.dmzj.com\/info\/[^.]+[.]html/.test(tab.url) || /http(s)?:\/\/www.dmzj.com\/?/.test(tab.url)
  },
  cssFiles: 'hack/snippet/snippet.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/snippet/snippet.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'snippet-inject',
    configLabel: '"混合"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(tab.url),
  cssFiles: 'hack/pc6/software.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/pc6/software.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'pc6-software',
    configLabel: '"应用"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(tab.url),
  cssFiles: 'hack/zhihu/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/zhihu/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'zhihu-question',
    configLabel: '"问答"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(tab.url),
  cssFiles: 'hack/zhihu/zhuanlan.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/zhihu/zhuanlan.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'zhihu-zhuanlan',
    configLabel: '"专栏"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(tab.url),
  cssFiles: 'hack/51cto/blog.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/51cto/blog.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: '51cto-blog',
    configLabel: '"博客"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(tab.url),
  cssFiles: 'hack/segmentfault/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/segmentfault/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'segmentfault-question',
    configLabel: '"问答"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(tab.url),
  cssFiles: 'hack/segmentfault/articles.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/segmentfault/articles.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'segmentfault-articles',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(tab.url),
  cssFiles: 'hack/cnblogs/articles.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/cnblogs/articles.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'cnblogs-articles',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(tab.url),
  cssFiles: 'hack/iteye/magazines.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/iteye/magazines.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'iteye-magazines',
    configLabel: '"杂志"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(tab.url),
  cssFiles: 'hack/iteye/blog.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/iteye/blog.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'iteye-blog',
    configLabel: '"博客"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(tab.url),
  cssFiles: 'hack/chinaunix/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/chinaunix/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'chinaunix-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www.bejson.com\/.*/.test(tab.url),
  cssFiles: 'hack/bejson/json.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/bejson/json.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'bejson-json',
    configLabel: '"JSON"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(tab.url),
  cssFiles: 'hack/linuxidc/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/linuxidc/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'linuxidc-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(tab.url),
  cssFiles: 'hack/tencent/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/tencent/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'tencent-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(tab.url),
  cssFiles: 'hack/jianshu/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/jianshu/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'jianshu-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/([\w]+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(tab.url),
  cssFiles: 'hack/csdn/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/csdn/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'csdn-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(tab.url),
  cssFiles: 'hack/csdn/topics.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/csdn/topics.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'csdn-topics',
    configLabel: '"话题"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(tab.url),
  cssFiles: 'hack/7down/soft.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/7down/soft.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: '7down-soft',
    configLabel: '"软件"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(tab.url),
  cssFiles: 'hack/jb51/artical.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/jb51/artical.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'jb51-artical',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/(www.)?mvcat[.]com\/.*/.test(tab.url),
  cssFiles: 'hack/mvcat/style.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/mvcat/script.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'mvcat-inject',
    configLabel: '"导航"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(tab.url),
  cssFiles: 'hack/360/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/360/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: '360-article',
    configLabel: '"文章"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}, {
  expectUrl: tab => /http[s]?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(tab.url),
  cssFiles: 'hack/stackoverflow/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/stackoverflow/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configId: 'stackoverflow-question',
    configLabel: '"问答"配置开关',
    fields: [// {
      //   key: 'injectCss',
      //   label: '注入样式',
      //   type: 'SwitchField',
      //   default: true
      // },
      // {
      //   key: 'injectScript',
      //   label: '注入脚本',
      //   type: 'SwitchField',
      //   default: true
      // }
    ]
  }
}]
