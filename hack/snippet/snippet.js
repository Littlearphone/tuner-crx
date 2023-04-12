(function () {
  const attribute = location.hostname.replaceAll('.', '-')

  function initialPage() {
    if (!document.body) {
      return requestAnimationFrame(initialPage)
    }
    document.body.setAttribute(attribute, '')
    const dmzj = document.querySelector('body[manhua-dmzj-com]')
    if (dmzj) {
      dmzj.querySelector('#moreLi').click()
      const scrollSwitch = dmzj.querySelector('#qiehuan_txt')
      scrollSwitch.innerText.indexOf('上下滚动') >= 0 && scrollSwitch.click()
    }
  }

  requestAnimationFrame(initialPage)
})()
