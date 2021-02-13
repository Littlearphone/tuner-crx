chrome.runtime.onMessage.addListener(function(transferData, sender, sendResponse) {
  console.log(sender)
  console.log(sendResponse)
  // TODO 划词翻译参数hta：on开启，off关闭
  const config = { ...transferData }
  if (!config.hasOwnProperty('enable')) {
    config.enable = true
  }
  if (!config.enable) {
    return
  }
  const faviconMapping = config.injectConfig.faviconMapping
  const defaultIcon = 'https://cn.bing.com/favicon.ico'
  const resultSelector = '[bing] #b_content #b_results li'

  function faviconParse(result) {
    const cite = result.querySelector('cite')
    if (!cite) {
      return defaultIcon
    }
    const text = cite.innerText
    const key = Object.keys(faviconMapping).find(regex => new RegExp(regex, 'gi').test(text))
    if (key) {
      return faviconMapping[key]
    }
    const urls = text.split('://')
    if (urls.length > 1) {
      return urls[0] + '://' + urls[1].split('/')[0] + '/favicon.ico'
    }
    return '//' + urls[0].split('/')[0] + '/favicon.ico'
  }

  function prependDom(dom, wrapper) {
    let icon = dom.querySelector("I")
    if (!icon) {
      icon = document.createElement('I')
    }
    icon.style.width = '24px'
    icon.style.height = '24px'
    icon.style.margin = '0 5px'
    icon.style.display = 'inline-block'
    icon.style.backgroundSize = '100%'
    icon.style.backgroundImage = `url('${faviconParse(wrapper)}')`
    // icon.style.backgroundImage = `url('${faviconParse(wrapper)}'), url('${defaultIcon}')`
    dom.insertBefore(icon, dom.childNodes[0])
  }

  document.body.setAttribute('bing', '')
  const results = document.querySelectorAll(resultSelector)
  Array.from(results).forEach(result => {
    const h2 = result.querySelector('h2')
    h2 && prependDom(h2, result)
  })
})
