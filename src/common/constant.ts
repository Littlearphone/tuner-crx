export const DefaultConfig = {
  fields: [],
  enable: true,
  injectCSS: true,
  injectScript: true,
  configLabel: '配置开关',
}
export const ActiveTab = {
  active: true,
  currentWindow: true
}
export const HackMappings = [{
  id: 'baidu-search',
  expectUrl: (tab: any) => /http(s)?:\/\/(www.)?baidu.com.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: ['hack/baidu/search.css'],
    script: ['hack/jquery.min.js', "hack/common.js", 'hack/baidu/search.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    autoPaging: true,
    injectScript: true,
    configLabel: '"搜索"配置开关',
    fields: [
      {
        key: 'autoPaging',
        label: '自动翻页',
        type: 'SwitchField',
      }
    ]
  }
}, {
  id: 'baidu-zhidao',
  expectUrl: (tab: any) => /https?:\/\/zhidao[.]baidu[.]com\/question\/.*.html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/baidu/zhidao.css',
    script: ['hack/jquery.min.js', 'hack/baidu/zhidao.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"知道"配置开关',
    fields: []
  }
}, {
  id: 'baidu-jingyan',
  expectUrl: (tab: any) => /https?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/baidu/jingyan.css',
    script: ['hack/jquery.min.js', 'hack/baidu/jingyan.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"经验"配置开关',
    fields: []
  }
}, {
  id: 'baidu-baijiahao',
  expectUrl: (tab: any) => /https?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/baidu/baijiahao.css',
    script: ['hack/jquery.min.js', 'hack/baidu/baijiahao.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"震惊"配置开关',
    fields: []
  }
}, {
  id: 'bing-search',
  expectUrl: (tab: any) => /http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: ['hack/bing/search.css'],
    script: ['hack/jquery.min.js', "hack/common.js", 'hack/bing/search.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    enableHta: true,
    autoPaging: true,
    injectScript: true,
    configLabel: '"搜索"配置开关',
    fields: [
      {
        key: 'autoPaging',
        label: '自动翻页',
        type: 'SwitchField',
      },
      {
        key: 'enableHta',
        label: '划词翻译',
        type: 'SwitchField',
      }
    ]
  }
}, {
  id: 'google-search',
  expectUrl: (tab: any) => /http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: ['hack/google/search.css'],
    script: ['hack/jquery.min.js', "hack/common.js", 'hack/google/search.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    autoPaging: true,
    injectScript: true,
    configLabel: '"搜索"配置开关',
    fields: [
      {
        key: 'autoPaging',
        label: '自动翻页',
        type: 'SwitchField',
      }
    ]
  }
}, {
  id: 'douyu-follow',
  expectUrl: (tab: any) => /http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/douyu/live-directory.css',
    script: ['hack/jquery.min.js', 'hack/douyu/live-directory.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"关注"配置开关',
    fields: []
  }
}, {
  id: 'douyu-room',
  expectUrl: (tab: any) => /http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(tab.url),
  hacker: {
    state: 'loading',
    style: ['hack/douyu/live-room.css'],
    script: ['hack/jquery.min.js', "hack/common.js", 'hack/douyu/live-room.js'],
  }, description: {
    enable: true,
    danMuSize: 30,
    injectCSS: true,
    injectScript: true,
    fullWebScreen: true,
    configLabel: '"直播"配置开关',
    fields: [
      {
        key: 'fullWebScreen',
        label: '网页全屏',
        type: 'SwitchField',
      },
      {
        key: 'danMuSize',
        label: '弹幕大小',
        type: 'SliderField',
        showInput: false,
        step: 1,
        min: 12,
        max: 100,
        marks: {
          24: '24',
          48: '48',
          72: '72',
        }
      }
    ]
  }
}, {
  id: 'bilibili-video',
  expectUrl: (tab: any) => {
    return /http(s)?:\/\/www.bilibili.com\/((medialist\/play\/([0-9]+|ml[0-9]+\/BV[a-zA-Z0-9]+))|(bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)[a-zA-Z0-9]+))(\?.*)?/.test(tab.url)
  },
  hacker: {
    state: 'loading',
    style: 'hack/bilibili/video.css',
    script: ['hack/jquery.min.js', 'hack/bilibili/video.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    playbackRate: 1.25,
    injectScript: true,
    autoStartPlay: true,
    fullWebScreen: true,
    configLabel: '"视频"配置开关',
    fields: [
      {
        key: 'autoStartPlay',
        label: '自动播放',
        type: 'SwitchField',
      },
      {
        key: 'fullWebScreen',
        label: '网页全屏',
        type: 'SwitchField',
      },
      {
        key: 'playbackRate',
        label: '播放速率',
        type: 'SliderField',
        showInput: false,
        step: 0.05,
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
  expectUrl: (tab: any) => /https?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/pc6/software.css',
    script: ['hack/jquery.min.js', 'hack/pc6/software.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"应用"配置开关',
    fields: []
  }
}, {
  id: 'zhihu-question',
  expectUrl: (tab: any) => /https?:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/zhihu/question.css',
    script: ['hack/jquery.min.js', 'hack/zhihu/question.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}, {
  id: 'zhihu-zhuanlan',
  expectUrl: (tab: any) => /https?:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/zhihu/zhuanlan.css',
    script: ['hack/jquery.min.js', 'hack/zhihu/zhuanlan.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"专栏"配置开关',
    fields: []
  }
}, {
  id: '51cto-blog',
  expectUrl: (tab: any) => /https?:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/51cto/blog.css',
    script: ['hack/jquery.min.js', 'hack/51cto/blog.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"博客"配置开关',
    fields: []
  }
}, {
  id: 'segmentfault-question',
  expectUrl: (tab: any) => /http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/segmentfault/question.css',
    script: ['hack/jquery.min.js', 'hack/segmentfault/question.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}, {
  id: 'segmentfault-articles',
  expectUrl: (tab: any) => /http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/segmentfault/articles.css',
    script: ['hack/jquery.min.js', 'hack/segmentfault/articles.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'cnblogs-articles',
  expectUrl: (tab: any) => /https?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/cnblogs/articles.css',
    script: ['hack/jquery.min.js', 'hack/cnblogs/articles.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'iteye-magazines',
  expectUrl: (tab: any) => /https?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/iteye/magazines.css',
    script: ['hack/jquery.min.js', 'hack/iteye/magazines.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"杂志"配置开关',
    fields: []
  }
}, {
  id: 'iteye-blog',
  expectUrl: (tab: any) => /https?:\/\/www[.]iteye[.]com\/blog\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/iteye/blog.css',
    script: ['hack/jquery.min.js', 'hack/iteye/blog.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"博客"配置开关',
    fields: []
  }
}, {
  id: 'chinaunix-article',
  expectUrl: (tab: any) => /https?:\/\/blog[.]chinaunix[.]net\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/chinaunix/article.css',
    script: ['hack/jquery.min.js', 'hack/chinaunix/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'bejson-json',
  expectUrl: (tab: any) => /https?:\/\/www.bejson.com\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/bejson/json.css',
    script: ['hack/jquery.min.js', 'hack/bejson/json.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"JSON"配置开关',
    fields: []
  }
}, {
  id: 'linuxidc-article',
  expectUrl: (tab: any) => /https?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]html?/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/linuxidc/article.css',
    script: ['hack/jquery.min.js', 'hack/linuxidc/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'tencent-article',
  expectUrl: (tab: any) => /https?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/tencent/article.css',
    script: ['hack/jquery.min.js', 'hack/tencent/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'jianshu-article',
  expectUrl: (tab: any) => /https?:\/\/www[.]jianshu[.]com\/p\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/jianshu/article.css',
    script: ['hack/jquery.min.js', 'hack/jianshu/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'csdn-article',
  expectUrl: (tab: any) => /https?:\/\/(\w+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/csdn/article.css',
    script: ['hack/jquery.min.js', 'hack/csdn/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'csdn-topics',
  expectUrl: (tab: any) => /https?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/csdn/topics.css',
    script: ['hack/jquery.min.js', 'hack/csdn/topics.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"话题"配置开关',
    fields: []
  }
}, {
  id: '7down-soft',
  expectUrl: (tab: any) => /https?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/7down/soft.css',
    script: ['hack/jquery.min.js', 'hack/7down/soft.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"软件"配置开关',
    fields: []
  }
}, {
  id: 'jb51-artical',
  expectUrl: (tab: any) => /https?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/jb51/artical.css',
    script: ['hack/jquery.min.js', 'hack/jb51/artical.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'mvcat-inject',
  expectUrl: (tab: any) => /https?:\/\/(www.)?mvcat[.]com\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/mvcat/style.css',
    script: ['hack/jquery.min.js', 'hack/mvcat/script.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"导航"配置开关',
    fields: []
  }
}, {
  id: '360-article',
  expectUrl: (tab: any) => /https?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/360/article.css',
    script: ['hack/jquery.min.js', 'hack/360/article.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"文章"配置开关',
    fields: []
  }
}, {
  id: 'stackoverflow-question',
  expectUrl: (tab: any) => /https?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(tab.url),
  hacker: {
    state: 'loading',
    style: 'hack/stackoverflow/question.css',
    script: ['hack/jquery.min.js', 'hack/stackoverflow/question.js'],
  }, description: {
    enable: true,
    injectCSS: true,
    injectScript: true,
    configLabel: '"问答"配置开关',
    fields: []
  }
}]
