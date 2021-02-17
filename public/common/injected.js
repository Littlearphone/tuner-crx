import FaviconMapping from './favicons.js'

export default [
  {
    expect: tab => /http(s)?:\/\/www.baidu.com.*/.test(tab.url),
    panelName: 'Baidu',
    injectCss: "hack/baidu/search.css",
    injectScript: "hack/baidu/search.js",
    injectConfig: { FaviconMapping }
  },
  {
    expect: tab => /http(s)?:\/\/cn.bing.com\/search.*/.test(tab.url),
    panelName: 'Bing',
    injectCss: "hack/bing/search.css",
    injectScript: "hack/bing/search.js",
    injectConfig: { FaviconMapping }
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
    panelName: 'Douyu',
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
