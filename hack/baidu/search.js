(function($) {
  if (window !== top) {
    return
  }
  if (!window.pagination) {
    window.pagination = new window.Pagination()
  }
  if ($('body[baidu]').length) {
    console.log('页面已经被标记')
    return
  }
  window.indirectUrls = []
  const callback = function() {
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
  const parseUrl = function() {
    if (window.indirectUrls.length) {
      const action = window.indirectUrls.shift()
      chrome && chrome.runtime && chrome.runtime.sendMessage(action, response => {
        parseUrl()
        if (!response) {
          return
        }
        const data = JSON.parse(response)
        $(`[href='${action.data.originalUrl}']`).attr('href', data.responseURL)
      })
    }
  }
  const detectLink = function() {
    const $headers = $('[baidu] h3 a[data-click]')
    if (!$headers.length) {
      setTimeout(detectLink, 10)
      return
    }
    $headers.each(callback)
    const $links = $('[baidu] a[href*="://www.baidu.com/link?"]')
    $links.length && $links.each(callback)
    $(`[baidu] a.kuaizhao:not([target='_blank'])`).attr('target', '_blank')
    $(`[baidu] [data-click*='snapshot']:not([target='_blank'])`).attr('target', '_blank')
    parseUrl()
  }
  const cleanAdsStyle = function() {
    const $elements = $('[baidu] #content_left > div:not(.result):not(.result-op):not(.c-group-wrapper)')
    $elements.each(function() {this.style = 'display: none !important;' })
    window.adBlocker = setTimeout(cleanAdsStyle, 100)
  }
  window.adBlocker = setTimeout(cleanAdsStyle, 100)
  window.Pagination.prototype.nextPage = function() {
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
    console.log('开始加载下一页')
    const loading = $.loading.mask('#page').start()
    $.get(next.attr('href'), function(data) {
      const page = $(data)
      loading.end().remove()
      console.log('下一页加载完成')
      setTimeout(detectLink, 10)
      $('#content_left').append(page.find('#content_left').html())
      $('#page [class^="page-inner"]').html(page.find('#page [class^="page-inner"]').html())
    })
    $('#page').css({ 'position': 'relative' })
  }
  const key = 'baidu-search'
  chrome.storage.local.get([key], function(data) {
    console.log('成功收到百度配置信息')
    const config = { ...data[key] }
    if (!config.hasOwnProperty('enable')) {
      config.enable = true
    }
    if (!config.hasOwnProperty('autoPaging')) {
      config.autoPaging = true
    }
    if (!config.enable) {
      // sendResponse('未开启百度页面配置')
      return
    }
    if (!config.autoPaging) {
      window.Pagination.prototype.nextPage = function() {
      }
    }

    function initial() {
      const $body = $('body')
      if (!$body.length) {
        setTimeout(initial)
        return
      }
      $body.attr('baidu', location.href.indexOf('wd=') >= 0 ? 'wd' : '')
      // Firefox和Chrome早期版本中带有前缀
      const $baidu = $('[baidu] #content_left')
      if (!$baidu.length) {
        setTimeout(initial)
        return
      }
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      // 选择目标节点
      // 配置观察选项,传入目标节点和观察选项
      new MutationObserver(mutations => {
        mutations.flatMap(mutation => Array.from(mutation.addedNodes))
          .filter(node => node.querySelector && node.querySelector('[class*="ec_tuiguang_pplink"]'))
          .forEach(node => (node.className += ' tuner-ads-block'))
      }).observe($baidu[0], { childList: true })
      setTimeout(detectLink, 10)
      // 随后,你还可以停止观察
      // observer.disconnect()
      // sendResponse('已完成百度页面配置初始化')
    }

    setTimeout(initial)
  })
})(window.jQuery)
