(function($) {
  chrome.runtime.onMessage.addListener(function(data, sender, callback) {
    console.log(data)
    console.log(sender)
    console.log(callback)
    callback('成功收到360doc配置信息')

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
