(function ($) {
  if ($('body[bing]').length) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'bing-search') {
      return
    }
    console.log(`${window.logPrefix}%c ===> Bing 脚本已准备就绪`, window.logStyle, '', data)
    callback({ msg: 'bing-script-injected' })
    const config = data.config || {}
    config.enableHta = !config.hasOwnProperty('enableHta') || config.enableHta
    const htaConfig = 'hta=' + (config.enableHta ? 'on' : 'off')
    const htaReverse = 'hta=' + (config.enableHta ? 'off' : 'on')
    if (document.cookie.indexOf('_FP=' + htaConfig) < 0) {
      if (location.href.indexOf(htaReverse) >= 0) {
        location.href = location.href.toString().replaceAll(htaReverse, htaConfig)
      } else if (location.href.indexOf(htaConfig) < 0) {
        location.href += '&' + htaConfig
      }
    }
    if (config.hasOwnProperty('autoPaging') && !config.autoPaging) {
      return
    }
    const paginationSelector = '#b_results li.b_pag'
    if (!window.pagination) {
      window.pagination = {
        nextPage() {
          if (window !== top) {
            return
          }
          const nextLink = $('li a.sb_pagN')
          if (!nextLink.length || $(`iframe[src='${nextLink.attr('href')}']`).length) {
            return
          }
          console.log(`${window.logPrefix}%c ===> 自动加载下一页`, window.logStyle, '')
          if ($(paginationSelector).find('.tuner-loading-block').length) {
            return
          }
          // $(paginationSelector).parent().css('position', 'relative')
          // $('#page').css({ 'position': 'relative' })
          const loading = $.loading.mask(paginationSelector).start()
          const nextPage = $(`<iframe src="${nextLink.attr('href')}" class="tuner-page-frame" scrolling="no"/>`)
          $(paginationSelector).before(nextPage.on('load', function () {
            // const scrollX = window.scrollX
            // const scrollY = window.scrollY
            const contents = nextPage.contents()
            const center = contents.find('[bing=iframe] #b_results')
            const width = $('[bing] #b_content').width()
            const height = center.height()
            nextPage.width(width).height(height)
            $(paginationSelector).html(contents.find(paginationSelector).html())
            console.log(`${window.logPrefix}%c ===> 下一页加载完成`, window.logStyle, '')
            // window.scrollTo(scrollX, scrollY)
            loading.end().remove()
          }))
        }
      }
    }
  })
  const FaviconMapping = {}
  const defaultIcon = 'https://cn.bing.com/favicon.ico'

  function faviconParse(result) {
    const cite = result.querySelector('cite')
    if (!cite) {
      return `url("${defaultIcon}")`
    }
    const text = cite.innerText
    const key = Object.keys(FaviconMapping).find(regex => new RegExp(regex, 'gi').test(text))
    if (key) {
      return `url("${FaviconMapping[key]}"), url("${defaultIcon}")`
    }
    const urls = text.split('://')
    if (urls.length > 1) {
      return `url("${urls[0] + '://' + urls[1].split('/')[0] + '/favicon.ico'}"), url("${defaultIcon}")`
    }
    return `url("${'//' + urls[0].split('/')[0] + '/favicon.ico'}"), url("${defaultIcon}")`
  }

  function initialPage() {
    if (!document.body) {
      return requestAnimationFrame(initialize)
    }
    $('body').attr('bing', window !== top ? 'iframe' : '')
    $('[bing] #b_content #b_results li').each(function () {
      const h2 = $(this).find('h2')
      if (h2.find('i')) {
        return
      }
      $('<i></i>').css({
        'width': '24px',
        'height': '24px',
        'margin': '0 5px',
        'display': 'inline-block',
        'background-size': '100%',
        'background-image': faviconParse(this)
      }).prependTo(h2)
    })
  }

  requestAnimationFrame(initialPage)
})(window.jQuery)
