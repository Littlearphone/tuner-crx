(function($) {
  if (!window.pagination) {
    window.pagination = new window.Pagination()
  }
  const detectLink = () => {
    const $search = $('#rhs,#search [data-hveid]').find('a:not([target="_blank"]):not([href="#"])')
    if ($search.length) {
      $search.each(function() {$(this).attr('target', '_blank')})
    }
    setTimeout(detectLink, 10)
  }
  window.Pagination.prototype.nextPage = function() {
    const next = $('#pnnext')
    if (!next.length || this.iframe.attr('src') === next.attr('href')) {
      return
    }
    if ($('#xjs .tuner-loading-block').length) {
      return
    }
    console.log('自动加载下一页')
    this.reloadFrame()
    $('#page').css({ 'position': 'relative' })
    const loading = $.loading.mask('#xjs').start()
    this.iframe.attr('src', next.attr('href'))
    const detectFrame = () => {
      const contents = this.iframe.contents()
      const results = contents.find('#search #rso')
      if (!results.length) {
        setTimeout(detectFrame, 100)
        return
      }
      const pages = this.select('#search #rso')
      pages.find('svg').parents('g-popup').remove()
      $('#search #rso').append(pages.html())
      $('#xjs').html(this.select('#xjs').html())
      loading.end().remove()
      console.log('下一页加载完成')
    }
    setTimeout(detectFrame, 100)
  }
  return function(data) {
    const config = { ...data }
    if (!config.hasOwnProperty('enable')) {
      config.enable = true
    }
    if (!config.hasOwnProperty('autoPaging')) {
      config.autoPaging = true
    }
    if (!config.enable) {
      // sendResponse('未开启Google页面配置')
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
      $body.attr('google', '')
    }

    setTimeout(initial, 10)
    setTimeout(detectLink, 10)
  }
})(jQuery)
