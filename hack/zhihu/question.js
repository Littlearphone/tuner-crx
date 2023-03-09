(function ($) {
  function scavenger () {
    const loginModal = $('div').find('.signFlowModal')
    if (loginModal.length) {
      loginModal.parents('div').remove()
    }
    requestAnimationFrame(scavenger)
  }

  requestAnimationFrame(scavenger)
})(window.jQuery)
