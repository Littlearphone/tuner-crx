export function getRequest(url: string, callback: Function) {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url)
  xhr.send(null)
  //绑定响应状态事件监听函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText)
    }
  }
}
