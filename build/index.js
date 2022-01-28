// 引入fs模块
const fs = require('fs')

function increaseVersion(path) {
  const content = fs.readFileSync(path, 'utf-8')
  const data = JSON.parse(content)
  const segment = data.version.split('.')
  segment[segment.length - 1] = parseInt(segment[segment.length - 1]) + 1
  data.version = segment.join('.')
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

increaseVersion('public/manifest.json')
increaseVersion('dist/manifest.json')
