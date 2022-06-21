(function($) {
  if (!window.pagination) {
    window.pagination = new window.Pagination()
  }
  const detectLink = () => {
    const $search = $('#rhs,#search [data-hveid]').find('a:not([target="_blank"]):not([href="#"])')
    if ($search.length) {
      $search.each(function() {$(this).attr('target', '_blank')})
    }
    const $rso = $('#rso > div.g, #rso > div > div.g')
    if ($rso.css('width')) {
      $rso.css('width', 'auto')
    }
    setTimeout(detectLink, 10)
  }
  const paginationSelector = '#botstuff table.AaVjTc'
  window.Pagination.prototype.nextPage = function() {
    const next = $('#pnnext')
    if (!next.length || this.iframe.attr('src') === next.attr('href')) {
      return
    }
    if ($(paginationSelector).find('.tuner-loading-block').length) {
      return
    }
    $(paginationSelector).parent().css('position', 'relative')
    console.log('自动加载下一页')
    this.reloadFrame()
    $('#page').css({ 'position': 'relative' })
    const loading = $.loading.mask(paginationSelector).start()
    this.iframe.attr('src', next.attr('href'))
    const detectFrame = () => {
      const contents = this.iframe.contents()
      if (!contents.find('#search #rso').length || !contents.find(paginationSelector).length) {
        setTimeout(detectFrame, 100)
        return
      }
      $('#search #rso').append(this.select('#search #rso').html())
      $(paginationSelector).parent().html(this.select(paginationSelector).parent().html())
      loading.end().remove()
      console.log('下一页加载完成')
    }
    setTimeout(detectFrame, 100)
  }
  const key = 'google-search'
  chrome.storage.local.get([key], function(data) {
    console.log('成功收到Google配置信息')
    const config = { ...data[key] }
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
  })
})(window.jQuery)
