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
  if (!window.pagingScrollListener) {
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

    window.PRELOAD_MARGIN = 200
    window.pagingScrollListener = scrollListener
    document.removeEventListener('scroll', scrollListener)
    document.addEventListener('scroll', scrollListener)
  }
})(window.jQuery)
