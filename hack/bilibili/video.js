(function ($) {
  if ($.bilibiliLoaded) {
    return console.log(`${window.logPrefix} ===> 脚本重复注入`, window.logStyle)
  }
  console.log(`${window.logPrefix}%c ===> 开始初始化 Bilibili 脚本`, window.logStyle, '')
  $.bilibiliLoaded = {}
  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (!data.site || data.site.id !== 'bilibili-video') {
      return
    }
    console.log(`${window.logPrefix}%c ===> []~(￣▽￣)~* 脚本已准备就绪 `, window.logStyle, '', data)
    callback({ msg: '[]~(￣▽￣)~*-script-injected' })
    const config = data.config || {}
    if (!config.hasOwnProperty('playbackRate') || config.playbackRate <= 0) {
      config.playbackRate = 1.25
    }
    config.autoStartPlay = !config.hasOwnProperty('autoStartPlay') || config.autoStartPlay
    config.fullWebScreen = !config.hasOwnProperty('fullWebScreen') || config.fullWebScreen
    const videoPlayerObject = () => {
      const selector = [
        '.bilibili-player-video video',
        '.bpx-player-primary-area video',
        '.bilibili-player-video bwp-video',
        '.bpx-player-primary-area bwp-video'
      ].join(',')
      return document.querySelector(selector)
    }
    const startPlayButton = () => {
      const selector = [
        '.squirtle-video-start',
        '.bpx-player-ctrl-play',
        '.bilibili-player-video-btn-start'
      ].join(',')
      return document.querySelector(selector)
    }
    const playNextVideoButton = () => {
      const selector = [
        '.squirtle-video-next',
        '.bpx-player-ctrl-next',
        '.bilibili-player-video-btn-next'
      ].join(',')
      return document.querySelector(selector)
    }
    const playLoopOption = () => {
      const selector = [
        '.squirtle-setting-loop',
        '.bpx-player-ctrl-setting-loop input'
      ].join(',')
      return document.querySelector(selector) || { checked: false }
    }
    const electricJumpButton = () => {
      const selector = [
        '.bpx-player-ending-related-item-cancel',
        '.bilibili-player-electric-panel-jump-content'
      ].join(',')
      return document.querySelectorAll(selector)
    }
    const fullscreenButtonArea = () => {
      const selector = [
        '.squirtle-video-pagefullscreen',
        '.bilibili-player-video-web-fullscreen',
        '.bpx-player-ctrl-web:not(.bpx-state-entered)'
      ].join(',')
      return document.querySelector(selector)
    }
    const videoSpeedRateOptions = () => {
      const selector = [
        '.squirtle-video-speed ul li',
        '.bpx-player-ctrl-playbackrate ul li',
        '.bilibili-player-video-btn-speed-menu-list'
      ].join(',')
      return document.querySelectorAll(selector)
    }
    if (!window.EventBus) {
      window.EventBus = function () {
        this.uuid = new Date().getTime()
        this.events = []
        console.log(`${window.logPrefix} ===> 创建事件总线`, window.logStyle, this.uuid)
      }
      window.EventBus.prototype.emit = function (type, data) {
        this.events.push({
          type,
          data
        })
        this.start()
        console.log(`${window.logPrefix} ===> 收到事件`, window.logStyle, type)
      }
      window.EventBus.prototype.clear = function () {
        this.events.length = 0
      }
      window.EventBus.prototype.start = function () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (!this.events.length) {
          console.log(`${window.logPrefix} ===> 事件队列为空`, window.logStyle)
          return
        }
        this.timer = setTimeout(this.start.bind(this), 100)
        const event = this.events.shift()
        if (!event) {
          console.log(`${window.logPrefix} ===> 无效的事件对象`, window.logStyle)
          return
        }
        const handler = window[event.type]
        if (typeof handler !== 'function') {
          this.events.push(event)
          return
        }
        if (handler.call(window, event.data, this)) {
          console.log(`${window.logPrefix} ===> 事件执行完成`, window.logStyle)
          return
        }
        this.events.push(event)
      }
    }
    const onVideoFinish = function () {
      window.bus.clear()
      const nextButton = playNextVideoButton()
      if (!playLoopOption().checked && nextButton) {
        nextButton.click()
        window.bus.emit('startPlay', config)
        return
      }
      window.bus.emit('skipSponsor', config)
    }
    const onVideoStart = function () {
      console.log(`${window.logPrefix} ===> 补充播放结束事件`, window.logStyle)
      this.removeEventListener('ended', onVideoFinish)
      window.bus.emit('adjustSpeed', config)
      this.addEventListener('ended', onVideoFinish)
    }
    window.startPlay = function (data) {
      const playButton = startPlayButton()
      const player = videoPlayerObject()
      if (!player || !playButton) {
        return false
      }
      if (!player.paused) {
        onVideoStart.call(player)
        return playButton.className.indexOf('video-state-pause') < 0 || !document.querySelector('.bpx-state-paused')
      }
      data.autoStartPlay && playButton.click()
      console.log(`${window.logPrefix} ===> 开始播放视频`, window.logStyle)
      return false
    }
    window.skipSponsor = function () {
      const buttons = Array.from(electricJumpButton())
      if (!buttons.length || buttons.filter(button => !button.offsetParent).length === buttons.length) {
        return false
      }
      buttons.forEach(element => element.click())
      console.log(`${window.logPrefix} ===> 跳过等待或连播`, window.logStyle)
      return true
    }
    const filterSpeedOption = function (speed, option) {
      const attribute = option.attributes['data-value']
      const value = (attribute && attribute.value) || option.innerText
      return String(parseFloat(value)) === String(speed)
    }
    window.adjustSpeed = function (data) {
      const options = videoSpeedRateOptions()
      if (!options || !options.length) {
        return false
      }
      console.log(`${window.logPrefix} ===> 将播放速度调整为`, window.logStyle, data.playbackRate)
      const option = Array.from(options).find(option => filterSpeedOption(data.playbackRate, option))
      if (option) {
        const classList = option.classList
        return option.click() || classList.contains('bilibili-player-active')
          || classList.contains('active') || classList.contains('bpx-state-active')
      }
      const player = videoPlayerObject()
      return player && (player.playbackRate = data.playbackRate)
    }
    window.fullWebScreen = function (data) {
      if (!data.fullWebScreen) {
        return true
      }
      const buttonArea = fullscreenButtonArea()
      if (!buttonArea) {
        return document.querySelector('.bpx-player-ctrl-web.bpx-state-entered')
      }
      console.log(`${window.logPrefix} ===> 启动网页全屏`, window.logStyle)
      const selector = [
        '.bpx-player-ctrl-web-enter',
        '.squirtle-pagefullscreen-inactive',
        '.bilibili-player-iconfont-web-fullscreen-off'
      ].join(',')
      const fullscreenButton = buttonArea.querySelector(selector)
      fullscreenButton.offsetWidth && fullscreenButton.click()
      const classList = buttonArea.classList
      return classList.contains('closed') || classList.contains('active') || classList.contains('bpx-state-entered')
    }
    if (!window.bus) {
      window.bus = new window.EventBus()
      window.bus.start()
      window.navigation.addEventListener('navigate', event => {
        window.bus.clear()
        console.log(`${window.logPrefix} ===> 清除所有事件`, window.logStyle, event)
        setTimeout(initialize, 1000)
      })
    }
    const initialize = () => {
      window.bus.emit('startPlay', config)
      window.bus.emit('fullWebScreen', config)
    }
    initialize()
  })
})(window.jQuery)
