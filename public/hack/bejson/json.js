(function ($) {
  if ($('body[bejson]').length) {
    return console.log('脚本重复注入')
  }

  function initialize () {
    const body = document.querySelector('body')
    if (!body) {
      return requestAnimationFrame(initialize)
    }
    body.setAttribute('bejson', location.pathname)
  }

  requestAnimationFrame(initialize)
})(window.jQuery)
