(function($) {
  chrome.runtime.onMessage.addListener(function(data, sender, callback) {
    console.log(data)
    console.log(sender)
    console.log(callback)
    callback('成功收到Douyu配置信息')
    const config = { ...data }
    if (!config.hasOwnProperty('enable')) {
      config.enable = true
    }
    if (!config.hasOwnProperty('fullPage')) {
      config.fullPage = true
    }
    if (!config.hasOwnProperty('danmuSize')) {
      config.danmuSize = 30
    }
    if (!config.enable) {
      return
    }
    (function() {
      const innerHTML = `
        .layout-Player #comment-higher-container [class*="danmuItem-"],
        .layout-Player [class*="comment-"] [class*="danmu-"] [class*="danmuItem-"] {
          font-size: ${config.danmuSize}px !important
        }
      `
      $('<style></style>').attr('rel', 'stylesheet').html(innerHTML).appendTo('head')
    })()
    $.detect('.layout-Player', player => {
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
      if (config.fullPage) {
        player.addClass('toggle-layout-fold')
        return
      }
      player.removeClass('toggle-layout-fold')
    })
  })
})(jQuery)
