(function ($) {
  if ($ && !$.loading) {
    const TEMPLATE = `
      <i class="tuner-loading-layer displayNone">
        <i class="tuner-loading-wrapper">
          <i class="tuner-loading-block">
            <i class="tuner-loading-path1"></i>
            <i class="tuner-loading-path2"></i>
            <i class="tuner-loading-path3"></i>
            <i class="tuner-loading-path4"></i>
          </i>
        </i>
      </i>`
    const LoadingMask = function (options) {
      const selector = options.selector || 'body'
      const layerStyle = $.extend({}, options.layerStyle)
      const spinnerStyle = $.extend({}, options.spinnerStyle)
      this.loaded = $(TEMPLATE).css(layerStyle)
        .find('.tuner-loading-block').css(spinnerStyle).end()
        .appendTo(selector)
    }
    LoadingMask.prototype.start = function (countDown) {
      countDown = countDown || 0
      if (this.countDown) {
        this.countDown += countDown
      } else {
        this.countDown = countDown
      }
      this.loaded.removeClass('displayNone')
      return this
    }
    LoadingMask.prototype.end = function () {
      if (this.countDown) {
        this.countDown--
      }
      if (this.countDown > 0) {
        return this
      }
      this.loaded.addClass('displayNone')
      return this
    }
    LoadingMask.prototype.remove = function () {
      return this.loaded.remove()
    }
    $.loading = new LoadingMask({})
    $.loading.mask = function () {
      if (arguments.length <= 0) {
        return $.loading
      }
      let options = {}
      const selector = arguments[0]
      if (typeof selector === 'string') {
        options.selector = selector
      } else if (typeof selector === 'object') {
        options = $.extend(options, selector)
      }
      options.layerStyle = $.extend({ 'position': 'absolute' }, options.layerStyle)
      return new LoadingMask(options)
    }
  }
  if ($ && !$.detect) {
    $.detect = function (selector, callback) {
      const element = $(selector)
      if (!element.length) {
        return requestAnimationFrame(() => $.detect(selector, callback))
      }
      logger.debug(`检测到 ${selector} ==> %o`, element)
      typeof callback === 'function' && callback(element)
    }
  }
  if ($ && !$.Pagination) {
    function Pagination() {
      this.initial()
    }
    // Listen for the scroll event
    function scrollListener(event) {
      if (window.innerHeight >= document.body.scrollHeight) {
        return window.pagination && window.pagination.nextPage()
      }
      if (window.innerHeight + window.scrollY < document.body.scrollHeight - window.PRELOAD_MARGIN) {
        return
      }
      window.pagination && window.pagination.nextPage()
    }
    Pagination.prototype.initial = function (selector) {
      this.iframe = $('iframe#tuner-crx')
      if (!this.iframe.length) {
        logger.debug('创建隐藏的iframe用于自动分页')
        this.iframe = $('<iframe></iframe>')
      }
      this.iframe.hide()
      this.iframe.attr('id', 'tuner-crx')
      this.iframe.appendTo('body')
    }
    Pagination.prototype.select = function (selector) {
      return $(selector, this.iframe.prop('contentDocument'))
    }
    Pagination.prototype.reloadFrame = function () {
      this.iframe.remove()
      this.initial()
    }
    Pagination.prototype.nextPage = function () {
      logger.debug('自动加载下一页')
    }
    Pagination.prototype.scrollListener = scrollListener
    window.PRELOAD_MARGIN = 200
    document.removeEventListener('scroll', scrollListener)
    document.addEventListener('scroll', scrollListener)
    $.Pagination = Pagination
  }
})(window.jQuery)
