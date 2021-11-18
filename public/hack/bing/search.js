(function($) {
  if ($('body[bing]').length) {
    return
  }
  window.Pagination.prototype.nextPage = function() {
    const next = $('li a.sb_pagN')
    if (!next.length || this.iframe.attr('src') === next.attr('href')) {
      return
    }
    console.log('自动加载下一页')
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
    })
    this.iframe.attr('src', next.attr('href'))
  }
  window.pagination = new window.Pagination()
  return function(data) {
    const config = { ...data }
    if (!config.hasOwnProperty('enable')) {
      config.enable = true
    }
    if (!config.hasOwnProperty('hta')) {
      config.hta = true
    }
    if (!config.hasOwnProperty('autoPaging')) {
      config.autoPaging = true
    }
    if (!config.enable) {
      return
    }
    if (!config.autoPaging) {
      window.Pagination.prototype.nextPage = function() {
      }
    }
    const htaConfig = 'hta=' + (config.hta ? 'on' : 'off')
    const htaReverse = 'hta=' + (config.hta ? 'off' : 'on')
    if (document.cookie.indexOf('_FP=' + htaConfig) < 0) {
      if (location.href.indexOf(htaReverse) >= 0) {
        location.href = location.href.toString().replaceAll(htaReverse, htaConfig)
      } else if (location.href.indexOf(htaConfig) < 0) {
        location.href += '&' + htaConfig
      }
    }
    const FaviconMapping = config.injectConfig && config.injectConfig.FaviconMapping || {}
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
        setTimeout(initialPage, 100)
        return
      }
      document.body.setAttribute('bing', '')
      $('[bing] #b_content #b_results li').each(function() {
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

    setTimeout(initialPage, 100)
  }
})(jQuery)
