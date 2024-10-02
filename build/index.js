// 引入fs模块
import { readFileSync, writeFileSync } from 'fs'

function increaseVersion(path) {
  const content = readFileSync(`public/${path}`, 'utf-8')
  const data = JSON.parse(content)
  const now = new Date()
  let version = 0
  version += now.getHours() * 3600000
  version += now.getMinutes() * 60000
  version += now.getSeconds() * 1000
  version += now.getMilliseconds()
  const segment = data.version.split('.')
  segment[segment.length - 1] = version
  data.version = segment.join('.')
  writeFileSync(`dist/${path}`, JSON.stringify(data, null, 2))
}

increaseVersion('manifest.json')
