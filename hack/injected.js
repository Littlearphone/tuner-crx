(function() {
  if (window.injected) {
    return
  }
  window.injected = {}

  function loadFile(url, callback) {
    if (window.injected[url]) {
      return window.injected[url]
    }
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.send(null)
    //绑定响应状态事件监听函数
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText)
      }
    }
  }

  function loadScript(urls, config) {
    if (!urls.length) {
      return
    }
    loadFile(urls.shift(), function(response) {
      const result = eval(response)
      if (typeof result === 'function') {
        result.call(this, config)
      }
      loadScript(urls, config)
    })
  }

  // function loadStyle(urls) {
  //   if (!urls.length) {
  //     return
  //   }
  //   const url = urls.shift()
  //   if (document.getElementById(url)) {
  //     return
  //   }
  //   const style = document.createElement('style')
  //   style.setAttribute('id', url)
  //   style.setAttribute('rel', 'stylesheet')
  //   style.setAttribute('type', 'text/css')
  //   document.head.appendChild(style)
  //   loadFile(url, function(response) {
  //     style.innerHTML = response
  //     loadStyle(urls)
  //   })
  // }
  chrome.runtime.onMessage.addListener(function(data, sender, callback) {
    console.log(sender)
    console.log(callback)
    const inject = data.inject || {}
    // const styles = inject.style && inject.style || []
    // if (!styles.find(style => style === '/hack/common.css')) {
    //   styles.unshift('/hack/common.css')
    // }
    // loadStyle(styles.map(url => chrome.extension.getURL(url)))
    const scripts = inject.script && inject.script || []
    if (!window.jQuery) {
      scripts.unshift('/hack/common.js')
      scripts.unshift('/hack/jquery.min.js')
    }
    loadScript(scripts.map(url => chrome.extension.getURL(url)), data.config || {})
  })
})()
