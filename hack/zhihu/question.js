(function($) {
  function scavenger() {
    const loginModal = $('div').find('.signFlowModal')
    if (loginModal.length) {
      loginModal.parents('div').remove()
    }
    setTimeout(scavenger, 1000)
  }

  scavenger()
})(jQuery)
