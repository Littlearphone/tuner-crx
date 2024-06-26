(function ($) {
  if ($.bilibiliLoaded) {
    return logger.debug('脚本重复注入')
  }
  logger.debug('开始初始化 Bilibili 脚本')
  $.bilibiliLoaded = {}

  function detectPlaying(video, config) {
    if (video.paused) {
      return requestAnimationFrame(() => detectPlaying(video, config))
    }
    if (config.fullWebScreen && !document.body.classList.contains('player-full-win')) {
      const event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })
      document.getElementById('awesome-pk-vm').dispatchEvent(event)
      setTimeout(() => {
        document.body.classList.add('player-full-win', 'over-hidden', 'hide-aside-area')
        detectPlaying(video, config)
      }, 5000)
    }
    // danmaku-item-container
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
  }

  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'bilibili-live') {
      return
    }
    logger.debug('[]~(￣▽￣)~* 脚本已准备就绪')
    callback({msg: '[]~(￣▽￣)~*-script-injected'})
    const config = data.config || {}
    config.fullWebScreen = !config.hasOwnProperty('fullWebScreen') || config.fullWebScreen
    $.detect('video', video => detectPlaying(video, config))
  })
})(window.jQuery)
