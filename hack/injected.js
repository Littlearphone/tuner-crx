(function () {
  if (window.tunerLoaded) {
    return
  }
  window.tunerLoaded = {
    insertScript (urls) {
      while (urls.length) {
        const url = urls.shift()
        if (document.getElementById(url)) {
          return
        }
        const style = document.createElement('script')
        style.setAttribute('id', url)
        style.setAttribute('src', url)
        style.setAttribute('type', 'text/javascript')
        document.body.appendChild(style)
      }
    }
  }
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    console.log('Tuner-crx is on standby')
    callback({ msg: 'hack-injected' })
    const site = data.site || {}
    const config = data.config || {}
    const insert = site.insert || []
    // 注入的脚本和页面加载的脚本是相互隔离的，
    // 如果需要读取页面脚本的数据就需要在页面嵌入脚本
    window.tunerLoaded.config = config
    window.tunerLoaded.insertScript(insert.map(url => chrome.runtime.getURL(url)))
  })
})()
