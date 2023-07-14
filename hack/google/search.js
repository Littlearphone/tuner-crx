(function ($) {
  if (window !== top && !parent.document.querySelector(`iframe[src*="${location.pathname}${location.search}"]`).scrollHeight) {
    console.groupCollapsed(`${window.logPrefix}%c ===> 不可见窗口`, window.logStyle, '')
    console.log(location.href)
    return console.groupEnd()
  }
  if ($('body[google]').length) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  // 筛选搜索条目的选择器 a[data-ved][href^=http]:has(h3)
  // 整页翻译 https://translate.google.com/translate?hl=zh-CN&sl=auto&u=<page_url>&prev=search&pto=aue
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    console.log(`${window.logPrefix}%c ===> Google 脚本已准备就绪`, window.logStyle, '')
    callback({ msg: 'google-script-injected' })
    const config = data.config || {}
    if (config.hasOwnProperty('autoPaging') && !config.autoPaging) {
      return
    }
    const paginationSelector = '#botstuff table.AaVjTc'
    if (!window.pagination) {
      window.pagination = {
        nextPage() {
          if (window !== top) {
            return
          }
          const nextLink = $('#pnnext')
          if (!nextLink.length || $(`iframe[src='${nextLink.attr('href')}']`).length) {
            return
          }
          console.log(`${window.logPrefix}%c ===> 自动加载下一页`, window.logStyle, '')
          if ($(paginationSelector).find('.tuner-loading-block').length) {
            return
          }
          $(paginationSelector).parent().css('position', 'relative')
          // $('#page').css({ 'position': 'relative' })
          const loading = $.loading.mask(paginationSelector).start()
          const nextPage = $(`<iframe src="${nextLink.attr('href')}" class="tuner-page-frame" scrolling="no"/>`)
          $('#botstuff').before(nextPage.on('load', function () {
            // const scrollX = window.scrollX
            // const scrollY = window.scrollY
            const contents = nextPage.contents()
            const center = contents.find('[google=iframe] #center_col')
            const width = center.width() + 10
            const height = center.height() + 10
            nextPage.width(width).height(height)
            $(paginationSelector).parent().html(contents.find(paginationSelector).parent().html())
            console.log(`${window.logPrefix}%c ===> 下一页加载完成`, window.logStyle, '')
            // window.scrollTo(scrollX, scrollY)
            loading.end().remove()
          }))
        }
      }
    }
  })
  const detectLink = () => {
    const $search = $('#rhs,#search [data-hveid]').find('a:not([target="_blank"]):not([href="#"])')
    if ($search.length) {
      $search.each(function () {$(this).attr('target', '_blank')})
    }
    const $rso = $('#rso > div.g, #rso > div > div.g')
    if ($rso.css('width')) {
      $rso.css('width', 'auto')
    }
    requestAnimationFrame(detectLink)
  }

  function initialize() {
    if (!document.body) {
      return requestAnimationFrame(initialize)
    }
    $('body').attr('google', window !== top ? 'iframe' : '')
    requestAnimationFrame(detectLink)
  }

  requestAnimationFrame(initialize)
})(window.jQuery)
