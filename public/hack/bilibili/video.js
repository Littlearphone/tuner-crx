chrome.runtime.onMessage.addListener(function(transferData, sender, sendResponse) {
  console.log(sender)
  console.log(sendResponse)
  const config = { ...transferData }
  if (!config.hasOwnProperty('enable')) {
    config.enable = true
  }
  if (!config.hasOwnProperty('speedRate')) {
    config.speedRate = 1.25
  }
  if (!config.enable) {
    return
  }
  const messages = []
  const eventHandler = function() {
    setTimeout(eventHandler, 100)
    const message = messages.pop()
    if (!message) {
      return
    }
    if (!message.condition()) {
      messages.push(message)
      return
    }
    if (message.execute()) {
      return
    }
    messages.push(message)
  }
  const videoPlayerObject = () => document.querySelector('.bilibili-player-video video')
  const startPlayButton = () => document.querySelector('.bilibili-player-video-btn-start')
  const playNextVideoButton = () => document.querySelector('.bilibili-player-video-btn-next')
  const electricJumpButton = () => document.querySelector('.bilibili-player-electric-panel-jump-content')
  const fullscreenButtonArea = () => document.querySelector('.bilibili-player-video-web-fullscreen')
  const videoSpeedRateOption = speed => document.querySelector(`.bilibili-player-video-btn-speed-menu-list[data-value='${speed}']`)
  const videoSpeedCondition = function() {
    return videoSpeedRateOption(config.speedRate)
  }
  const videoSpeedExecution = function() {
    const speedButton = videoSpeedRateOption(config.speedRate)
    if (speedButton) {
      return speedButton.click() || speedButton.className.indexOf('bilibili-player-active') >= 0
    }
    const object = videoPlayerObject()
    return object && (object.playbackRate = config.speedRate)
  }
  const videoStartCondition = function() {
    const playButton = startPlayButton()
    const object = videoPlayerObject()
    return !object.paused || (playButton && playButton.className.indexOf('video-state-pause') >= 0)
  }
  const videoFinishListener = function() {
    const nextButton = playNextVideoButton()
    if (nextButton) {
      nextButton.click()
      messages.push({
        condition: videoStartCondition,
        execute: videoStartExecution
      })
      return
    }
    messages.push({
      condition: function() {
        return electricJumpButton() && electricJumpButton().offsetParent
      },
      execute: function() {
        electricJumpButton().click()
        return true
      }
    })
  }
  const videoFinishExecution = function() {
    this.removeEventListener('ended', videoFinishListener)
    this.addEventListener('ended', videoFinishListener)
  }
  const videoStartListener = function() {
    messages.push({
      condition: videoSpeedCondition,
      execute: videoSpeedExecution
    })
    videoSpeedExecution.call(this)
    videoFinishExecution.call(this)
  }
  const videoStartExecution = function() {
    const videoElement = videoPlayerObject()
    if (videoElement.paused) {
      videoElement.removeEventListener('play', videoStartListener)
      videoElement.addEventListener('play', videoStartListener)
      startPlayButton().click()
    }
    return !videoElement.paused
  }
  messages.push({
    condition: videoStartCondition,
    execute: videoStartExecution
  })
  messages.push({
    condition: function() {
      const fullscreenButton = fullscreenButtonArea()
      return fullscreenButton && fullscreenButton.className.indexOf('close') < 0
    },
    execute: function() {
      fullscreenButtonArea().querySelector('.bilibili-player-iconfont-web-fullscreen-off').click()
      return true
    }
  })
  setTimeout(eventHandler, 100)
})
