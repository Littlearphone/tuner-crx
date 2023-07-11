(function ($) {
  function removeCsdnRestrict() {
    $('#content_views').off('copy').off('keydown').unbind('copy').unbind('keydown')
    setTimeout(removeCsdnRestrict, 100)
  }

  setTimeout(removeCsdnRestrict, 100)
})(jQuery)
