chrome.runtime.onMessage.addListener(function(transferData, sender, sendResponse) {
  console.log(sender)
  console.log(sendResponse)
  const config = { ...transferData }
  if (!config.hasOwnProperty('enable')) {
    config.enable = true
  }
  if (!config.enable) {
    return
  }
  const createElement = function(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className || ''
    return element
  }
  const layoutPlayer = document.querySelector('.layout-Player')
  const createToggleButton = function(options) {
    const container = layoutPlayer.querySelector(options.containerClass)
    if (options.createCondition && options.createCondition.call(container)) {
      container.appendChild(createElement('I', options.toggleClass))
      const titleToggleButton = container.querySelector(`.${options.toggleClass}`)
      titleToggleButton.onclick = options.toggleCallback || function() {}
      return
    }
    setTimeout(function() {createToggleButton(options)}, 500)
  }
  const toggleLayoutCallback = function() {
    if (layoutPlayer.className.indexOf('toggle-layout-fold') >= 0) {
      layoutPlayer.className = layoutPlayer.className.replace('toggle-layout-fold', '')
    } else {
      layoutPlayer.className += ' toggle-layout-fold'
    }
  }
  createToggleButton({
    containerClass: '.layout-Player-title',
    toggleClass: 'title-toggle-button',
    createCondition: function() {return this.querySelector('.Title-followBtnBox')},
    toggleCallback: toggleLayoutCallback
  })
  createToggleButton({
    containerClass: '.layout-Player-toolbar',
    toggleClass: 'toolbar-toggle-button',
    createCondition: function() {return this.querySelector('.PlayerToolbar')},
    toggleCallback: toggleLayoutCallback
  })
  const siblingElements = function(dom) {
    const siblings = []
    let sibling = dom.previousElementSibling
    while (sibling) {
      siblings.push(sibling)
      sibling = sibling.previousElementSibling
    }
    sibling = dom.nextElementSibling
    while (sibling) {
      siblings.push(sibling)
      sibling = sibling.nextElementSibling
    }
    return siblings
  }
  const ancestorSearch = function(dom) {
    siblingElements(dom).forEach(element => (element.style.display = 'none'))
    const parentNode = dom.parentNode
    if (!parentNode || parentNode.tagName.toLowerCase() === 'body') {
      return
    }
    ancestorSearch(parentNode)
  }
  ancestorSearch(layoutPlayer)
})
