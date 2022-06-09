(function() {
  const key = 'bejson-json'
  chrome.storage.local.get([key], function(data) {
    const config = data[key]
    console.log(config)

    function mark() {
      const body = document.querySelector('body')
      if (!body) {
        return setTimeout(mark, 100)
      }
      body.setAttribute('bejson', location.pathname)
    }

    setTimeout(mark, 100)
  })
})()
