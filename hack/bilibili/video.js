(function($) {
  if ($.bilibiliLoaded) {
    console.log('页面已经被标记')
    return
  }
  $.bilibiliLoaded = {}
  const key = 'bilibili-video'
  chrome.storage.local.get([key], function(data) {
    console.log('成功收到Bilibili配置信息')
    const config = { ...data[key] }
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
      const selector = [
        '.bilibili-player-video video',
        '.bpx-player-primary-area video',
        '.bilibili-player-video bwp-video'
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
        '.bpx-player-ctrl-next',
        '.bilibili-player-video-btn-next'
      ].join(',')
      return document.querySelector(selector)
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
      ].join(",")
      return document.querySelectorAll(selector)
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
        this.start()
        console.log(`收到事件: ${type}`)
      }
      window.EventBus.prototype.clear = function() {
        this.events.length = 0
      }
      window.EventBus.prototype.start = function() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (!this.events.length) {
          console.log('事件队列为空')
          return
        }
        this.timer = setTimeout(this.start.bind(this), 100)
        const event = this.events.shift()
        if (!event) {
          console.log('无效的事件对象')
          return
        }
        const handler = window[event.type]
        if (typeof handler !== 'function') {
          this.events.push(event)
          return
        }
        if (handler.call(window, event.data, this)) {
          console.log(`${event.type}事件执行完成`)
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
        return playButton.className.indexOf('video-state-pause') < 0 || !document.querySelector('.bpx-state-paused')
      }
      data.autoPlaySwitch && playButton.click()
      console.log(`开始播放视频`)
      return false
    }
    window.skipSponsor = function() {
      const buttons = Array.from(electricJumpButton())
      if (!buttons.length || buttons.filter(button => !button.offsetParent).length === buttons.length) {
        return false
      }
      buttons.forEach(element => element.click())
      console.log(`跳过等待或连播`)
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
        return option.click() || classList.contains('bilibili-player-active')
          || classList.contains('active') || classList.contains('bpx-state-active')
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
        return document.querySelector('.bpx-player-ctrl-web.bpx-state-entered')
      }
      console.log('启动网页全屏')
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
        console.log('清除所有事件', event)
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
