(function ($) {
  if ($('body[google]').length) {
    return console.log('脚本重复注入')
  }
  // 筛选搜索条目的选择器 a[data-ved][href^=http]:has(h3)
  // 整页翻译 https://translate.google.com/translate?hl=zh-CN&sl=auto&u=<page_url>&prev=search&pto=aue
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    console.log('Google script is on standby')
    callback({ msg: 'google-script-injected' })
    const config = data.config || {}
    if (config.hasOwnProperty('autoPaging') && !config.autoPaging) {
      return
    }
    if (!window.pagination) {
      window.pagination = new window.Pagination()
    }
    const paginationSelector = '#botstuff table.AaVjTc'
    window.Pagination.prototype.nextPage = function () {
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
          return requestAnimationFrame(detectFrame)
        }
        const scrollX = window.scrollX
        const scrollY = window.scrollY
        $('#search #rso')[0].appendChild(this.select('#search #rso')[0])
        $(paginationSelector).parent().html(this.select(paginationSelector).parent().html())
        window.scrollTo(scrollX, scrollY)
        loading.end().remove()
        console.log('下一页加载完成')
      }
      requestAnimationFrame(detectFrame)
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

  function initialize () {
    const $body = $('body')
    if (!$body.length) {
      return requestAnimationFrame(initialize)
    }
    $body.attr('google', '')
    requestAnimationFrame(detectLink)
  }

  requestAnimationFrame(initialize)
})(window.jQuery)
