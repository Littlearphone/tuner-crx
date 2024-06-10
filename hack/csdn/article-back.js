(function ($) {
  function liftRestriction() {
    window.οncοntextmenu = document.οncοntextmenu = document.οncοpy = null
    const advert = document.querySelector('.toolbar-advert')
    if (advert) {
      advert.remove()
    }
    ;[...document.querySelectorAll('body')].forEach(dom => dom.outerHTML = dom.outerHTML);
    [...document.querySelectorAll('body, body *')].forEach(dom => {
      [
        'onselect',
        'onselectstart',
        'onselectend',
        'ondragstart',
        'ondragend',
        'oncontextmenu',
        'oncopy'
      ].forEach(ev => dom.removeAttribute(ev))
      dom.style['user-select'] = 'auto'
    })
    const content = document.querySelector('#article_content')
    if (content) {
      content.removeAttribute('style')
    }
    const text = document.querySelector('.follow-text')
    if (text && text.parentElement && text.parentElement.parentElement) {
      text.parentElement.parentElement.removeChild(follow_text.parentElement)
    }
    const box = document.querySelector('.hide-article-box')
    if (box && box.parentElement) {
      box.parentElement.removeChild(hide_article_box)
    }
  }

  setTimeout(liftRestriction, 1000)
})(jQuery)
