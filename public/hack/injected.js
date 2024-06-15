(function ($) {
  window.CONSOLE_BLUE = 'color: white;background: #409eff;padding: 0 8px;'
  window.CONSOLE_DEBUG = 'color: white;background: #909399;padding: 0 4px'
  window.CONSOLE_INFO = 'color: white;background: #67C23A;padding: 0 4px'
  window.CONSOLE_WARN = 'color: white;background: #E6A23C;padding: 0 4px'
  window.CONSOLE_ERROR = 'color: white;background: #F56C6C;padding: 0 4px'
  if (window.tuner) {
    return
  }

  function mergeArguments(from, to) {
    if (from && from.length) {
      Array.from(from).forEach(parameter => to.push(parameter))
    }
    return to
  }

  function formatMessage() {
    const parameters = Array.from(arguments)
    const level = parameters.shift()
    let message = document.title || location.hostname
    if (typeof parameters[0] === 'string' && parameters[0]) {
      message = parameters.shift()
    }
    let extraAction = null
    if (typeof parameters[0] === 'function') {
      extraAction = parameters.shift()
    }
    const prefix = logger.depth ? '' : '%cTuner-crx%c []~(￣▽￣)~* '
    const args = [
      prefix + `%c# ${message} %c`,
      CONSOLE_BLUE,
      '',
      level,
      ''
    ]
    if (logger.depth) {
      args.splice(1, 2)
    }
    if (parameters && parameters.length) {
      parameters.forEach(parameter => args.push(parameter))
    }
    if (!extraAction) {
      return console.log.apply(window, args)
    }
    console.groupCollapsed.apply(window, args)
    console.trace(location.href)
    if (typeof extraAction === 'function') {
      logger.depth++
      extraAction()
      logger.depth--
    }
    console.groupEnd()
  }

  window.tuner = {
    logger: {
      depth: 0,
      debug() {
        formatMessage.apply(this, mergeArguments(arguments, [CONSOLE_DEBUG]))
      },
      info() {
        formatMessage.apply(this, mergeArguments(arguments, [CONSOLE_INFO]))
      },
      warn() {
        formatMessage.apply(this, mergeArguments(arguments, [CONSOLE_WARN]))
      },
      error() {
        formatMessage.apply(this, mergeArguments(arguments, [CONSOLE_ERROR]))
      },
      table(name, data, columns) {
        console.log(`%c${name}`, CONSOLE_BLUE)
        console.table(data, columns)
      },
    }
  }
  window.logger = window.tuner.logger

  function insertScript(urls) {
    while (urls.length) {
      const url = urls.shift()
      if (document.getElementById(url)) {
        continue
      }
      if (!document.body) {
        return requestAnimationFrame(() => urls.unshift(url) && insertScript(urls))
      }
      const script = document.createElement('script')
      script.setAttribute('id', url)
      script.setAttribute('src', url)
      script.setAttribute('type', 'text/javascript')
      document.body.appendChild(script)
    }
  }

  chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    if (tuner.config) {
      return true
    }
    logger.info('inject 脚本注入完成', () => {
      logger.table('data.config', data.config)
      logger.table('data.site.hacker', data.site.hacker)
      logger.table('data.site.description', data.site.description)
    })
    callback({ msg: 'hack-injected' })
    const site = data.site || {}
    const config = data.config || {}
    const insert = site.insert || []
    // 注入的脚本和页面加载的脚本是相互隔离的，
    // 如果需要读取页面脚本的数据就需要在页面嵌入脚本
    window.tuner.config = config
    insertScript(insert.map(url => chrome.runtime.getURL(url)))
    return true
  })
})(window.jQuery)
