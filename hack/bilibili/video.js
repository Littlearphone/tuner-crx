(function($) {
  if ($.bilibiliLoaded) {
    console.log('页面已经被标记')
    return
  }
  $.bilibiliLoaded = {}
  chrome.runtime.onMessage.addListener(function(data, sender, callback) {
    console.log(data)
    console.log(sender)
    console.log(callback)
    callback('成功收到Bilibili配置信息')
    const config = { ...data }
    if (!config.hasOwnProperty('enable')) {
      config.enable = true
    }
    if (!config.hasOwnProperty('speedRate')) {
      config.speedRate = 1.25
    }
    if (!config.hasOwnProperty('autoPlaySwitch')) {
      config.autoPlaySwitch = true
    }
    if (!config.hasOwnProperty('videoJumpSwitch')) {
      config.videoJumpSwitch = true
    }
    if (!config.hasOwnProperty('fullWebScreenSwitch')) {
      config.fullWebScreenSwitch = true
    }
    if (!config.enable) {
      return
    }
    const historyJumpButton = () => document.querySelector('.bilibili-player-video-toast-item-jump')
    const videoPlayerObject = () => {
      return document.querySelector('.bilibili-player-video video,.bilibili-player-video bwp-video,.bpx-player-primary-area video')
    }
    const startPlayButton = () => {
      return document.querySelector('.bilibili-player-video-btn-start,.squirtle-video-start')
    }
    const playNextVideoButton = () => document.querySelector('.bilibili-player-video-btn-next')
    const electricJumpButton = () => document.querySelector('.bilibili-player-electric-panel-jump-content')
    const fullscreenButtonArea = () => {
      return document.querySelector('.bilibili-player-video-web-fullscreen,.squirtle-video-pagefullscreen')
    }
    const videoSpeedRateOptions = () => {
      return document.querySelectorAll('.bilibili-player-video-btn-speed-menu-list,.squirtle-video-speed ul li')
    }
    if (!window.EventBus) {
      window.EventBus = function() {
        this.uuid = new Date().getTime()
        this.events = []
        console.log(`创建事件总线: ${this.uuid}`)
      }
      window.EventBus.prototype.emit = function(type, data) {
        this.events.push({
          type,
          data
        })
        console.log(`收到事件: ${type}`)
      }
      window.EventBus.prototype.start = function() {
        setTimeout(this.start.bind(this), 100)
        const event = this.events.shift()
        if (!event) {
          return
        }
        const handler = window[event.type]
        if (typeof handler !== 'function') {
          this.events.push(event)
          return
        }
        if (handler.call(window, event.data, this)) {
          return
        }
        this.events.push(event)
      }
    }
    const onVideoFinish = function() {
      const nextButton = playNextVideoButton()
      if (nextButton) {
        nextButton.click()
        window.bus.emit('startPlay', config)
        return
      }
      window.bus.emit('skipSponsor', config)
    }
    // const onVideoSeeking = function(event) {
    //     console.log(`Video seeking: ${this.currentTime}`)
    // }
    // const onVideoCanplay = function(event) {
    //   console.log(`Video canplay: ${this.currentTime}`)
    // }
    window.videoJump = function(data) {
      if (!data.videoJumpSwitch) {
        return true
      }
      const button = historyJumpButton()
      if (button) {
        button.click()
        return true
      }
    }
    const onVideoStart = function() {
      console.log(`补充播放结束事件`)
      this.removeEventListener('ended', onVideoFinish)
      // this.removeEventListener('seeking', onVideoSeeking)
      // this.removeEventListener('canplaythrough', onVideoCanplay)
      window.bus.emit('videoJump', config)
      window.bus.emit('adjustSpeed', config)
      this.addEventListener('ended', onVideoFinish)
      // this.addEventListener('seeking', onVideoSeeking)
      // this.addEventListener('canplaythrough', onVideoCanplay)
    }
    window.startPlay = function(data) {
      const playButton = startPlayButton()
      const player = videoPlayerObject()
      if (!player || !playButton) {
        return false
      }
      if (!player.paused) {
        onVideoStart.call(player)
        return playButton.className.indexOf('video-state-pause') < 0
      }
      data.autoPlaySwitch && playButton.click()
      console.log(`开始播放视频`)
      return false
    }
    window.skipSponsor = function() {
      const jumpButton = electricJumpButton()
      if (!jumpButton || !jumpButton.offsetParent) {
        return false
      }
      jumpButton.click()
      console.log(`跳过赞助页面`)
      return true
    }
    const filterSpeedOption = function(speed, option) {
      const attribute = option.attributes['data-value']
      const value = (attribute && attribute.value) || option.innerText
      return String(parseFloat(value)) === String(speed)
    }
    window.adjustSpeed = function(data) {
      const options = videoSpeedRateOptions()
      if (!options || !options.length) {
        return false
      }
      console.log(`将播放速度调整为: ${data.speedRate}`)
      const option = Array.from(options).find(option => filterSpeedOption(data.speedRate, option))
      if (option) {
        const classList = option.classList
        return option.click() || classList.contains('bilibili-player-active') || classList.contains('active')
      }
      const player = videoPlayerObject()
      return player && (player.playbackRate = data.speedRate)
    }
    window.fullWebScreen = function(data) {
      if (!data.fullWebScreenSwitch) {
        return true
      }
      const buttonArea = fullscreenButtonArea()
      if (!buttonArea) {
        return false
      }
      console.log('启动网页全屏')
      const fullscreenButton = buttonArea.querySelector('.bilibili-player-iconfont-web-fullscreen-off') || buttonArea.querySelector('.squirtle-pagefullscreen-inactive')
      fullscreenButton.offsetWidth && fullscreenButton.click()
      return buttonArea.classList.contains('closed') || buttonArea.classList.contains('active')
    }
    if (!window.bus) {
      window.bus = new window.EventBus()
      window.bus.start()
    }
    window.bus.emit('startPlay', config)
    window.bus.emit('fullWebScreen', config)
  })
})(jQuery)
