(function ($) {
  if ($.bilibiliLoaded) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  console.log(`${window.logPrefix}%c ===> 开始初始化 Bilibili 脚本`, window.logStyle, '')
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
      document.body.classList.add('player-full-win', 'over-hidden', 'hide-aside-area')
    } else {
      document.body.classList.remove('player-full-win', 'over-hidden', 'hide-aside-area')
    }
    // danmaku-item-container
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
  }

  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    console.log(`${window.logPrefix}%c ===> []~(￣▽￣)~* 脚本已准备就绪 `, window.logStyle, '')
    callback({msg: '[]~(￣▽￣)~*-script-injected'})
    const config = data.config || {}
    config.fullWebScreen = !config.hasOwnProperty('fullWebScreen') || config.fullWebScreen
    $.detect('video', video => detectPlaying(video, config))
  })
})(window.jQuery)
