(function ($) {
  if ($('body[baidu]').length) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  window.indirectUrls = []

  function resolveRealAddress() {
    if (window.indirectUrls.length) {
      const action = window.indirectUrls.shift()
      chrome && chrome.runtime && chrome.runtime.sendMessage(action, function (response) {
        resolveRealAddress()
        if (!response) {
          return
        }
        $(`[href='${action.data.originalUrl}']`).attr('href', response.responseURL)
      })
    }
  }

  function acceptFakeLink() {
    const url = $(this).attr('href')
    window.indirectUrls.push({
      type: 'ajax',
      data: {
        type: 'GET',
        originalUrl: url,
        url: url.startsWith('http://') ? url.replace('http://', 'https://') : url
      }
    })
  }

  function detectLink() {
    const $headers = $('[baidu] h3 a[data-click]')
    if (!$headers.length) {
      return window.baiduLinkResolver = requestAnimationFrame(detectLink)
    }
    $headers.each(acceptFakeLink)
    const $links = $('[baidu] a[href*="://www.baidu.com/link?"]')
    $links.length && $links.each(acceptFakeLink)
    $(`[baidu] a.kuaizhao:not([target='_blank'])`).attr('target', '_blank')
    $(`[baidu] [data-click*='snapshot']:not([target='_blank'])`).attr('target', '_blank')
    resolveRealAddress()
  }

  function cleanAdsStyle() {
    $('[baidu] #content_left > div:not(.result):not(.result-op):not(.c-group-wrapper)').each(function () {
      this.style = 'display: none !important;'
    })
    window.baiduAdBlocker = requestAnimationFrame(cleanAdsStyle)
  }

  function initialize() {
    $('body').attr('baidu', location.href.indexOf('wd=') >= 0 ? 'wd' : '')
    const $baidu = $('[baidu] #content_left')
    if (!$baidu.length) {
      return requestAnimationFrame(initialize)
    }
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    new MutationObserver(mutations => {
      mutations.flatMap(mutation => Array.from(mutation.addedNodes))
        .filter(node => node.querySelector && node.querySelector('[class*="ec_tuiguang_pplink"]'))
        .forEach(node => (node.className += ' tuner-ads-block'))
    }).observe($baidu[0], {childList: true})
    window.baiduAdBlocker = requestAnimationFrame(cleanAdsStyle)
    window.baiduLinkResolver = requestAnimationFrame(detectLink)
    // observer.disconnect()
  }

  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'baidu-search') {
      return
    }
    console.log(`${window.logPrefix}%c ===> Baidu 脚本已准备就绪`, window.logStyle, '', data)
    callback({msg: 'baidu-script-injected'})
    $.detect('body', () => {
      initialize()
      const config = data.config || {}
      if (config.backgroundImage) {
        document.body.style.setProperty('--baidu-background-image', `url(${config.backgroundImage})`)
      }
      document.body.style.setProperty('--baidu-background-color', config.backgroundColor || '#f6f6f6')
      document.body.style.setProperty('--baidu-background-blur', `${config.backgroundBlur}px` || '12px')
      if (config.hasOwnProperty('autoPaging') && !config.autoPaging) {
        return
      }
      if (!window.pagination) {
        window.pagination = new $.Pagination()
      }
      $.Pagination.prototype.nextPage = function () {
        if (window !== top) {
          return
        }
        const next = $('#page a:contains("下一页")')
        if (!next.length || this.iframe === next.attr('href')) {
          return
        }
        this.iframe = next.attr('href')
        if ($('#page .tuner-loading-block').length) {
          return
        }
        console.log(`${window.logPrefix}%c ===> 自动加载下一页`, window.logStyle, '')
        const loading = $.loading.mask('#page').start()
        $.get(next.attr('href'), function (data) {
          const page = $(data)
          loading.end().remove()
          console.log(`${window.logPrefix}%c ===> 下一页加载完成`, window.logStyle, '')
          requestAnimationFrame(detectLink)
          const children = page.find('#content_left').children()
          if (children.length) {
            $('#content_left').append(children)
          }
          $('#page [class^="page-inner"]').html(page.find('#page [class^="page-inner"]').html())
        })
        $('#page').css({'position': 'relative'})
      }
    })
  })

})(window.jQuery)
