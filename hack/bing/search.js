(function ($) {
  if ($('body[bing]').length) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    console.log(`${window.logPrefix}%c ===> Bing 脚本已准备就绪`, window.logStyle, '')
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
    if (!window.pagination) {
      window.pagination = new $.Pagination()
    }
    $.Pagination.prototype.nextPage = function () {
      const next = $('li a.sb_pagN')
      if (!next.length || this.iframe.attr('src') === next.attr('href')) {
        return
      }
      console.log(`${window.logPrefix}%c ===> 自动加载下一页`, window.logStyle, '')
      if (!$('iframe#tuner-crx').length) {
        this.reloadFrame()
      }
      this.lastPosition = window.scrollY
      const loading = $.loading.mask('li.b_pag').start()
      this.iframe.on('load', () => {
        $('li.b_pag').html(this.select('li.b_pag').html())
        loading.end().remove()
        const results = this.select('#b_results li.b_algo')
        if (!results.length) {
          return
        }
        const list = $('#b_results li.b_algo')
        if (list.length) {
          list.last().after(results)
        }
        if (window.scrollY >= this.lastPosition) {
          window.scrollTo(window.scrollX, this.lastPosition)
        }
        console.log(`${window.logPrefix}%c ===> 下一页加载完成`, window.logStyle, '')
      })
      this.iframe.attr('src', next.attr('href'))
    }
  })
  const FaviconMapping = {}
  const defaultIcon = 'https://cn.bing.com/favicon.ico'

  function faviconParse (result) {
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

  function initialPage () {
    if (!document.body) {
      return requestAnimationFrame(initialPage)
    }
    document.body.setAttribute('bing', '')
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
