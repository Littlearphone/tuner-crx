// https://juejin.cn/post/7300100800907575305
const ev = ['copy', 'keydown']
const onev = ev.map(name => 'on' + name)
const o = {
  value: null,
  writable: false
}
onev.forEach(name => {
  Object.defineProperty(HTMLElement.prototype, name, o)
  Object.defineProperty(Document.prototype, name, o)
  Object.defineProperty(window, name, o)
})

HTMLElement.prototype._addEventListener = Element.prototype.addEventListener
Document.prototype._addEventListener = Document.prototype.addEventListener
Window.prototype._addEventListener = Window.prototype.addEventListener
HTMLElement.prototype.addEventListener = _xAddEventListener
Document.prototype.addEventListener = _xAddEventListener
Window.prototype.addEventListener = _xAddEventListener

function _xAddEventListener(a, b, c) {
  if (!ev.includes(a) && this && this._addEventListener) {
    this._addEventListener(a, b, c)
  } else {
    console.trace(a)
  }
}

window.addEventListener('DOMContentLoaded', function () {
  onev.forEach(name => {
    const clicks = [...document.querySelectorAll('[' + name + ']')]
    clicks.forEach((item) => {
      item.removeAttribute(name)
    })
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = '*{user-select: auto!important;}'
  document.querySelector('head').appendChild(style)
})
console.log('snippet脚本已加载')
