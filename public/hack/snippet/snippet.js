(function () {
  let attribute = location.hostname.replaceAll('.', '-')
  if (attribute.match(/^\d/)) {
    attribute = `http-${attribute}`
  }

  function initialPage() {
    if (!document.body) {
      return requestAnimationFrame(initialPage)
    }
    document.body.setAttribute(attribute, '')
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
    const dmzj = document.querySelector('body[manhua-dmzj-com]')
    if (dmzj) {
      dmzj.querySelector('#moreLi').click()
      const scrollSwitch = dmzj.querySelector('#qiehuan_txt')
      scrollSwitch.innerText.indexOf('上下滚动') >= 0 && scrollSwitch.click()
    }
  }

  requestAnimationFrame(initialPage)
})()
