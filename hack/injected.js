(function ($) {
  window.logPrefix = '%cTuner-crx'
  window.logStyle = 'color: white;background: #409eff;padding: 0 8px;'
  if (window.tunerLoaded) {
    return
  }
  window.tunerLoaded = {}

  function insertScript(urls) {
    while (urls.length) {
      const url = urls.shift()
      if (document.getElementById(url)) {
        continue
      }
      if (!document.body) {
        return requestAnimationFrame(() => urls.unshift(url) && insertScript(urls))
      }
      const style = document.createElement('script')
      style.setAttribute('id', url)
      style.setAttribute('src', url)
      style.setAttribute('type', 'text/javascript')
      document.body.appendChild(style)
    }
  }

  console.groupCollapsed(`${window.logPrefix}%c ===> ${document.title || location.hostname}`, window.logStyle, '')
  console.log(location.href)
  console.groupEnd()
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (window.tunerLoaded.config) {
      return true
    }
    console.groupCollapsed(`${window.logPrefix}%c <=== ${data.site.id}`, window.logStyle, '')
    console.log('%cdata.config', window.logStyle)
    console.table(data.config)
    console.log('%cdata.site.hacker', window.logStyle)
    console.table(data.site.hacker)
    console.log('%cdata.site.description', window.logStyle)
    console.table(data.site.description)
    console.groupEnd()
    callback({ msg: 'hack-injected' })
    const site = data.site || {}
    const config = data.config || {}
    const insert = site.insert || []
    // 注入的脚本和页面加载的脚本是相互隔离的，
    // 如果需要读取页面脚本的数据就需要在页面嵌入脚本
    window.tunerLoaded.config = config
    insertScript(insert.map(url => chrome.runtime.getURL(url)))
    return true
  })
})(window.jQuery)
