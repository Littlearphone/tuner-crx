(function ($) {
  if ($('body[doc360]').length) {
    return console.log('脚本重复注入')
  }

  function initialize () {
    const $body = $('body')
    if (!$body.length) {
      return requestAnimationFrame(initialize)
    }
    $body.attr('doc360', '')
  }

  requestAnimationFrame(initialize)
})(window.jQuery)
