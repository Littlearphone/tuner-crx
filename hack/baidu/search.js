(function ($) {
  if ($('body[baidu]').length) {
    return logger.debug('脚本重复注入')
  }
  window.indirectUrls = []

  function testDomain(domain, url) {
    return new RegExp(`https?://([^/]+.)?${domain}($|.+)`).test(url)
  }

  function resolveRealAddress() {
    if (!window.indirectUrls.length) {
      return
    }
    const action = window.indirectUrls.shift()
    const linkNode = $(`[href='${action.data.originalUrl}']`)
    if (linkNode && linkNode.parents('.result[mu]')) {
      linkNode.attr('href', linkNode.parents('.result[mu]').attr('mu'))
      return window.baiduLinkResolver = requestAnimationFrame(resolveRealAddress)
    }
    chrome && chrome.runtime && chrome.runtime.sendMessage(action, function (response) {
      window.baiduLinkResolver = requestAnimationFrame(resolveRealAddress)
      if (response) {
        linkNode.attr('href', response.responseURL)
      }
    })
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
    if (window.baiduLinkResolver) {
      cancelAnimationFrame(window.baiduLinkResolver)
    }
    const $headers = $('[baidu] h3 a[data-click]')
    if (!$headers.length) {
      return window.baiduLinkResolver = requestAnimationFrame(detectLink)
    }
    $headers.each(acceptFakeLink)
    const $links = $('[baidu] a[href*="://www.baidu.com/link?"]')
    $links.length && $links.each(acceptFakeLink)
    $(`[baidu] a.kuaizhao:not([target='_blank'])`).attr('target', '_blank')
    $(`[baidu] [data-click*='snapshot']:not([target='_blank'])`).attr('target', '_blank')
    return window.baiduLinkResolver = requestAnimationFrame(resolveRealAddress)
  }

  function cleanAdsStyle() {
    $('[baidu] #content_left > div:not(.result):not(.result-op):not(.c-group-wrapper)').each(function () {
      this.style = 'display: none !important;'
    })
    window.baiduAdBlocker = requestAnimationFrame(cleanAdsStyle)
  }

  function initialize() {
    $('body').attr('baidu', location.href.indexOf('wd=') >= 0 ? 'wd' : '')
    if (window !== top) {
      $('body').attr('inline', '')
    }
    const $baidu = $('[baidu] #content_left')
    if (!$baidu.length) {
      return requestAnimationFrame(initialize)
    }
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    new MutationObserver(mutations => {
      mutations.flatMap(mutation => Array.from(mutation.addedNodes))
        .filter(node => node.querySelector && node.querySelector('[class*="ec_tuiguang_pplink"]'))
        .forEach(node => (node.className += ' tuner-ads-block'))
    }).observe($baidu[0], { childList: true })
    window.baiduAdBlocker = requestAnimationFrame(cleanAdsStyle)
    window.baiduLinkResolver = requestAnimationFrame(detectLink)
    // observer.disconnect()
  }

  function injectBlockStyle(list) {
    if (!list) {
      return
    }
    let styleElement = document.querySelector('#baidu-blocked-domain-style')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'baidu-blocked-domain-style'
    }
    styleElement.innerHTML = list.split(',')
      .map(domain => `.result[mu*="${domain}"] {display: none !important;}`)
      .join('\n')
    document.head.appendChild(styleElement)
  }

  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'baidu-search') {
      return
    }
    logger.debug('Baidu 脚本已准备就绪')
    callback({ msg: 'baidu-script-injected' })
    $.detect('body', () => {
      const config = data.config || {}
      injectBlockStyle(config.blockedDomains)
      if (config.backgroundImage) {
        document.body.style.setProperty('--baidu-background-image', `url(${config.backgroundImage})`)
      }
      document.body.style.setProperty('--baidu-background-color', config.backgroundColor || '#f6f6f6')
      document.body.style.setProperty('--baidu-background-blur', `${config.backgroundBlur}px` || '12px')
      requestAnimationFrame(initialize)
      if (config.hasOwnProperty('autoPaging') && !config.autoPaging) {
        return
      }
      if (!window.pagination && !$('body[inline]').length) {
        window.pagination = new $.Pagination()
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
          const nextPageNo = parseInt($('#page strong').text().trim()) + 1
          logger.debug('自动加载下一页', nextPageNo)
          const loading = $.loading.mask('#page').start()
          const nextPage = $(`<iframe src="${this.iframe}" class="tuner-page-frame" scrolling="no"/>`)
          nextPage.height(0)
          $('#content_left ~ script[data-for="result"]').before(nextPage.on('load', function () {
            loading.end().remove()
            const page = nextPage.contents()
            nextPage.height(page.find('#content_left').height()).show()
            $('.result-molecule:has(#page)').html(page.find('.result-molecule:has(#page)').html())
            // requestAnimationFrame(detectLink)
            // const children = page.find('#content_left').children()
            // logger.debug('下一页加载完成', nextPageNo, 'size', children.length)
            // if (children.length) {
            //   $('#content_left').append(children)
            //   // } else if (page.find('.content_none').length) {
            //   //   window.pagination.iframe = ''
            //   //   next.attr('href', $('#page strong').next().attr('href'))
            //   //   return setTimeout(() => window.pagination.nextPage(), 1000)
            // }
            // $('#page [class^="page-inner"]').html(page.find('#page [class^="page-inner"]').html())
            // injectBlockStyle(config.blockedDomains)
            window.pagination.scrollListener()
          }))
          $('#page').css({ 'position': 'relative' })
        }
        $(() => window.pagination.scrollListener())
      }
    })
  })

})(window.jQuery)
