(function ($) {
  if ($('body[douyu]').length) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'douyu-room') {
      return
    }
    console.log(`${window.logPrefix}%c ===> Douyu 脚本已准备就绪 `, window.logStyle, '', data)
    callback({ msg: 'douyu-script-injected' })
    const config = data.config || {}
    (function () {
      if (!config.hasOwnProperty('danMuSize') || config.danMuSize <= 0) {
        config.danMuSize = 30
      }
      const innerHTML = `
        .layout-Player #comment-higher-container [class*="danmuItem-"],
        .layout-Player [class*="comment-"] [class*="danmu-"] [class*="danmuItem-"] {
          font-size: ${config.danMuSize}px !important
        }
      `
      $('<style></style>').attr('rel', 'stylesheet').html(innerHTML).appendTo('head')
    })();
    (function () {
      $.detect && $.detect('.layout-Player', player => {
        $.detect('.layout-Player-video', video => {
          $.detect('#js-player-video', () => {
            if (!video.find('title-toggle-button').length) {
              $('<i></i>').appendTo(video).addClass('title-toggle-button')
                .on('click', () => player.toggleClass('toggle-layout-fold'))
            }
            if (!video.find('toolbar-toggle-button').length) {
              $('<i></i>').appendTo(video).addClass('toolbar-toggle-button')
                .on('click', () => player.toggleClass('toggle-layout-fold'))
            }
          })
        })
        player.siblings().hide().parents().each(element => $(element).siblings().hide())
        if (!config.hasOwnProperty('fullPage') || config.fullPage) {
          return player.addClass('toggle-layout-fold')
        }
        player.removeClass('toggle-layout-fold')
      })
    })()
  })

  function initialize () {
    const $body = $('body')
    if (!$body.length) {
      return requestAnimationFrame(initialize)
    }
    $body.attr('douyu', '')
  }

  requestAnimationFrame(initialize)
})(window.jQuery)
