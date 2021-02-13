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
  const faviconMapping = config.injectConfig.faviconMapping
  const defaultIcon = 'https://baidu.com/favicon.ico'
  const resultSelector = '[baidu] #container.sam_newgrid #content_left .result'

  function faviconParse(result) {
    const footer = result.querySelector('.se_st_footer')
    if (!footer) {
      return defaultIcon
    }
    const text = footer.childNodes[0].innerText
    const key = Object.keys(faviconMapping).find(regex => new RegExp(regex, 'gi').test(text))
    if (key) {
      return faviconMapping[key]
    }
    const hostIndex = text.indexOf('/')
    if (hostIndex >= 0) {
      return 'http://' + text.substring(0, hostIndex) + '/favicon.ico'
    }
    return defaultIcon
  }

  document.body.setAttribute('baidu', location.href.indexOf('wd=') >= 0 ? 'wd' : '')
  const results = document.querySelectorAll(resultSelector)
  Array.from(results).forEach(result => {
    const h3 = result.querySelector('h3')
    if (!h3) {
      return
    }
    let icon = h3.querySelector("img")
    if (!icon) {
      icon = document.createElement('IMG')
    }
    icon.style.width = '24px'
    icon.style.height = '24px'
    icon.style.margin = '0 5px'
    icon.style.display = 'inline-block'
    icon.src = faviconParse(result)
    icon.onerror = function() {this.src = defaultIcon}
    h3.insertBefore(icon, h3.childNodes[0])
  })
})
