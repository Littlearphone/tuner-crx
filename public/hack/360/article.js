(function($) {
  return function(data) {
    function initial() {
      const $body = $('body')
      if (!$body.length) {
        setTimeout(initial)
        return
      }
      $body.attr('doc360', '')
    }

    initial()
  }
})(jQuery)
