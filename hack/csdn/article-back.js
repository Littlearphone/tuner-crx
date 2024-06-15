(function ($) {
  function liftRestriction() {
    window.οncοntextmenu = document.οncοntextmenu = document.οncοpy = null
    const advert = document.querySelector('.toolbar-advert')
    if (advert) {
      advert.remove()
    }
    logger.info('解除 CSDN 页面限制', () => {
      logger.debug('执行全文档内容替换')
      ;[...document.querySelectorAll('body')].forEach(dom => {
        try {
          dom.outerHTML = `${dom.outerHTML}`
        } catch (e) {
          logger.error(e)
        }
      })
      logger.debug('解锁全文档选择限制')
      ;[...document.querySelectorAll('body, body *')].forEach(dom => {
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
      logger.debug('屏蔽主体页面特殊样式')
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
