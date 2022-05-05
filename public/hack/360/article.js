(function($) {
  const key = '360-article'
  chrome.storage.local.get([key], function(data) {
    console.log('成功收到360doc配置信息')

    function initial() {
      const $body = $('body')
      if (!$body.length) {
        setTimeout(initial)
        return
      }
      $body.attr('doc360', '')
    }

    initial()
  })
})(window.jQuery)
