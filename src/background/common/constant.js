export const DefaultConfig = {
  configLabel: '配置开关'
}
export const ActiveTab = {
  active: true,
  currentWindow: true
}
export const HackMappings = [{
  id: 'baidu-search',
  expectUrl: tab => /http(s)?:\/\/(www.)?baidu.com.*/.test(tab.url),
  matchPatterns: [
    '*://baidu.com/*',
    '*://www.baidu.com/*'
  ],
  cssFiles: ['hack/common.css', 'hack/baidu/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/baidu/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
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
  id: 'baidu-zhidao',
  expectUrl: tab => /http[s]?:\/\/zhidao[.]baidu[.]com\/question\/.*.html/.test(tab.url),
  matchPatterns: [
    '*://zhidao.baidu.com/question/*.html'
  ],
  cssFiles: 'hack/baidu/zhidao.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/zhidao.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"知道"配置开关',
    fields: []
  }
}, {
  id: 'baidu-jingyan',
  expectUrl: tab => /http[s]?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(tab.url),
  matchPatterns: [
    '*://jingyan.baidu.com/article/*.html'
  ],
  cssFiles: 'hack/baidu/jingyan.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/jingyan.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"经验"配置开关',
    fields: []
  }
}, {
  id: 'baidu-baijiahao',
  expectUrl: tab => /http[s]?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(tab.url),
  matchPatterns: [
    '*://baijiahao.baidu.com/s*'
  ],
  cssFiles: 'hack/baidu/baijiahao.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/baidu/baijiahao.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"震惊"配置开关',
    fields: []
  }
}, {
  id: 'bing-search',
  expectUrl: tab => /http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  matchPatterns: [
    '*://cn.bing.com/search*&q=*',
    '*://cn.bing.com/search*?q=*'
  ],
  cssFiles: ['hack/common.css', 'hack/bing/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/bing/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"搜索"配置开关',
    fields: []
  }
}, {
  id: 'google-search',
  expectUrl: tab => /http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  matchPatterns: [
    '*://www.google.com/search*&q=*',
    '*://www.google.com/search*?q=*'
  ],
  cssFiles: ['hack/common.css', 'hack/google/search.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/google/search.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"搜索"配置开关',
    fields: []
  }
}, {
  id: 'douyu-follow',
  expectUrl: tab => /http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(tab.url),
  matchPatterns: [
    '*://www.douyu.com/directory/all',
    '*://www.douyu.com/directory/myFollow'
  ],
  cssFiles: 'hack/douyu/live-directory.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/douyu/live-directory.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"关注"配置开关',
    fields: []
  }
}, {
  id: 'douyu-room',
  expectUrl: tab => /http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(tab.url),
  matchPatterns: [
    '*://www.douyu.com/*',
    '*://www.douyu.com/topic/*?rid=*'
  ],
  cssFiles: ['hack/common.css', 'hack/douyu/live-room.css'],
  scriptFiles: ['hack/jquery.min.js', "hack/common.js", 'hack/douyu/live-room.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"直播"配置开关',
    fields: []
  }
}, {
  id: 'bilibili-video',
  expectUrl: tab => {
    return /http(s)?:\/\/www.bilibili.com\/((medialist\/play\/([0-9]+|ml[0-9]+\/BV[a-zA-Z0-9]+))|(bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)[a-zA-Z0-9]+))(\?.*)?/.test(tab.url)
  },
  matchPatterns: [
    '*://www.bilibili.com/medialist/play/*',
    '*://www.bilibili.com/bangumi/play/ep*',
    '*://www.bilibili.com/bangumi/play/ss*',
    '*://www.bilibili.com/video/av*',
    '*://www.bilibili.com/video/BV*'
  ],
  cssFiles: 'hack/bilibili/video.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/bilibili/video.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"视频"配置开关',
    fields: [
      {
        key: 'autoStartPlay',
        label: '自动播放',
        type: 'SwitchField',
        default: true
      },
      {
        key: 'fullWebScreen',
        label: '网页全屏',
        type: 'SwitchField',
        default: true
      },
      {
        key: 'playbackRate',
        label: '播放速率',
        type: 'SliderField',
        showInput: false,
        default: 1.25,
        min: 0.1,
        max: 5.0,
        marks: {
          1.0: '1.0',
          2.0: '2.0',
          3.0: '3.0',
          4.0: '4.0'
        }
      }
    ]
  }
}, {
  id: 'pc6-software',
  expectUrl: tab => /http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(tab.url),
  matchPatterns: [
    '*://www.pc6.com/softview/SoftView_*.html'
  ],
  cssFiles: 'hack/pc6/software.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/pc6/software.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"应用"配置开关',
    fields: []
  }
}, {
  id: 'zhihu-question',
  expectUrl: tab => /http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(tab.url),
  matchPatterns: [
    '*://www.zhihu.com/search?*',
    '*://www.zhihu.com/question/*'
  ],
  cssFiles: 'hack/zhihu/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/zhihu/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}, {
  id: 'zhihu-zhuanlan',
  expectUrl: tab => /http[s]:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(tab.url),
  matchPatterns: [
    '*://zhuanlan.zhihu.com/p/*'
  ],
  cssFiles: 'hack/zhihu/zhuanlan.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/zhihu/zhuanlan.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"专栏"配置开关',
    fields: []
  }
}, {
  id: '51cto-blog',
  expectUrl: tab => /http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(tab.url),
  matchPatterns: [
    '*://blog.51cto.com/*/*'
  ],
  cssFiles: 'hack/51cto/blog.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/51cto/blog.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"博客"配置开关',
    fields: []
  }
}, {
  id: 'segmentfault-question',
  expectUrl: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(tab.url),
  matchPatterns: [
    '*://*.segmentfault.com/q/*'
  ],
  cssFiles: 'hack/segmentfault/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/segmentfault/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}, {
  id: 'segmentfault-articles',
  expectUrl: tab => /http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(tab.url),
  matchPatterns: [
    '*://*.segmentfault.com/a/*'
  ],
  cssFiles: 'hack/segmentfault/articles.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/segmentfault/articles.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'cnblogs-articles',
  expectUrl: tab => /http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(tab.url),
  matchPatterns: [
    '*://www.cnblogs.com/*/p/*.html',
    '*://www.cnblogs.com/*/archive/*.html',
    '*://www.cnblogs.com/*/articles/*.html'
  ],
  cssFiles: 'hack/cnblogs/articles.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/cnblogs/articles.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'iteye-magazines',
  expectUrl: tab => /http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(tab.url),
  matchPatterns: [
    '*://www.iteye.com/magazines/*'
  ],
  cssFiles: 'hack/iteye/magazines.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/iteye/magazines.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"杂志"配置开关',
    fields: []
  }
}, {
  id: 'iteye-blog',
  expectUrl: tab => /http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(tab.url),
  matchPatterns: [
    '*://www.iteye.com/blog/*'
  ],
  cssFiles: 'hack/iteye/blog.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/iteye/blog.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"博客"配置开关',
    fields: []
  }
}, {
  id: 'chinaunix-article',
  expectUrl: tab => /http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(tab.url),
  matchPatterns: [
    '*://blog.chinaunix.net/*'
  ],
  cssFiles: 'hack/chinaunix/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/chinaunix/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'bejson-json',
  expectUrl: tab => /http[s]?:\/\/www.bejson.com\/.*/.test(tab.url),
  matchPatterns: [
    '*://www.bejson.com/*'
  ],
  cssFiles: 'hack/bejson/json.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/bejson/json.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"JSON"配置开关',
    fields: []
  }
}, {
  id: 'linuxidc-article',
  expectUrl: tab => /http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(tab.url),
  matchPatterns: [
    '*://www.linuxidc.com/Linux/*.htm*'
  ],
  cssFiles: 'hack/linuxidc/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/linuxidc/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'tencent-article',
  expectUrl: tab => /http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(tab.url),
  matchPatterns: [
    '*://cloud.tencent.com/developer/article/*'
  ],
  cssFiles: 'hack/tencent/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/tencent/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'jianshu-article',
  expectUrl: tab => /http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(tab.url),
  matchPatterns: [
    '*://www.jianshu.com/p/*'
  ],
  cssFiles: 'hack/jianshu/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/jianshu/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'csdn-article',
  expectUrl: tab => /http[s]?:\/\/([\w]+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(tab.url),
  matchPatterns: [
    '*://*.blog.csdn.net/article/details/*',
    '*://blog.csdn.net/*/article/details/*'
  ],
  cssFiles: 'hack/csdn/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/csdn/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'csdn-topics',
  expectUrl: tab => /http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(tab.url),
  matchPatterns: [
    '*://bbs.csdn.net/topics/*'
  ],
  cssFiles: 'hack/csdn/topics.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/csdn/topics.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"话题"配置开关',
    fields: []
  }
}, {
  id: '7down-soft',
  expectUrl: tab => /http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(tab.url),
  matchPatterns: [
    '*://www.7down.com/soft/*.html'
  ],
  cssFiles: 'hack/7down/soft.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/7down/soft.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"软件"配置开关',
    fields: []
  }
}, {
  id: 'jb51-artical',
  expectUrl: tab => /http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(tab.url),
  matchPatterns: [
    '*://www.jb51.net/*.html',
    '*://www.jb51.net/artical/*.html'
  ],
  cssFiles: 'hack/jb51/artical.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/jb51/artical.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'mvcat-inject',
  expectUrl: tab => /http[s]?:\/\/(www.)?mvcat[.]com\/.*/.test(tab.url),
  matchPatterns: [
    '*://www.mvcat.net/*'
  ],
  cssFiles: 'hack/mvcat/style.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/mvcat/script.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"导航"配置开关',
    fields: []
  }
}, {
  id: '360-article',
  expectUrl: tab => /http[s]?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(tab.url),
  matchPatterns: [
    '*://360doc.cn/article/*.html',
    '*://360doc.cn/content/*.html',
    '*://360doc.com/article/*.html',
    '*://360doc.com/content/*.html',
    '*://www.360doc.cn/article/*.html',
    '*://www.360doc.cn/content/*.html',
    '*://www.360doc.com/article/*.html',
    '*://www.360doc.com/content/*.html'
  ],
  cssFiles: 'hack/360/article.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/360/article.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'stackoverflow-question',
  expectUrl: tab => /http[s]?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(tab.url),
  matchPatterns: [
    '*://stackoverflow.com/questions/*/*'
  ],
  cssFiles: 'hack/stackoverflow/question.css',
  scriptFiles: ['hack/jquery.min.js', 'hack/stackoverflow/question.js'],
  configDescription: {
    enable: true,
    injectCss: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}]
