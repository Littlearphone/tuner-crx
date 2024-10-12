(function () {
  let attribute = location.hostname.replaceAll('.', '-')
  if (attribute.match(/^\d/)) {
    attribute = `http-${attribute}`
  }

  function initialPage() {
    if (!document.body) {
      return requestAnimationFrame(initialPage)
    }
    if (attribute) {
      document.body && document.body.setAttribute(attribute, '')
    }
    if (window.location.host === 'link.zhihu.com') {
      const array = /\?target=([^&]+)(&|$)/.exec(location.search)
      if (array.length > 1 && array[1]) {
        return window.location.replace(decodeURIComponent(array[1]))
      }
    }
    if (window.location.host === 'link.juejin.cn') {
      const array = /\?target=([^&]+)(&|$)/.exec(location.search)
      if (array.length > 1 && array[1]) {
        return window.location.replace(decodeURIComponent(array[1]))
      }
    }
    if (document.body.hasAttribute('manhua-dmzj-com')) {
      document.querySelector('#moreLi').click()
      const scrollSwitch = dmzj.querySelector('#qiehuan_txt')
      scrollSwitch.innerText.indexOf('上下滚动') >= 0 && scrollSwitch.click()
    }
    if (document.body.hasAttribute('blog-51cto-com')) {
      logger.info('去除页面默认的复制监听', () => {
        const script = document.createElement('script')
        script.src = chrome.runtime.getURL('hack/snippet/inline.js')
        document.head.appendChild(script)
      })
    }
  }

  requestAnimationFrame(initialPage)
})()
