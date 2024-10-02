import { HackMappings } from './constant'

export function ajaxProxy(request: any, sender: any, sendResponse: Function) {
  const data = request.data
  fetch(data.url, {
    method: data.type,
    body: data.body
  }).then(async response => sendResponse({
    url: data.url,
    status: response.status,
    responseURL: response.url,
    responseText: await response.text()
  })).catch(error => sendResponse('') || console.warn('跨域请求失败：', error) || console.table(data))
}

function asArray(maybeString: string | any[]) {
  if (typeof maybeString === 'string') {
    return [maybeString]
  }
  return maybeString
}

function asBoolean(config: any, key: string): boolean {
  return !config.hasOwnProperty(key) || config[key]
}

async function insertScript(site: any, tabId: number, tab: any, config: any) {
  if (!asBoolean(config, 'enable') || !asBoolean(config, 'injectScript')) {
    return console.log('该页面脚本注入未启用')
  }
  const files = ['hack/injected.js']
  const script = asArray(site.hacker.script) || []
  script.forEach(file => files.push(file))
  const target: chrome.scripting.InjectionTarget = {
    allFrames: !tab.frameId,
    tabId
  }
  if (tab.frameId) {
    target.frameIds = [tab.frameId]
  }
  await chrome.scripting.executeScript({ files, target, injectImmediately: true })
  console.log('页面脚本注入完成: ', tab.url)
  console.table(files)
  // 提供回调的话，接收方需要三个参数：transferData, sender, callback，
  // 为了让扩展不提示The message port closed before a response was received，
  // 还需要在接收方调用callback方法传递响应数据
  messageTab(tabId, Object.assign({ site }, { config }), (response: any) => console.log('传递页面配置完成', response))
}

async function insertCss(site: any, tabId: number, tab: any, config: any) {
  if (!asBoolean(config, 'enable') || !asBoolean(config, 'injectCSS')) {
    return console.log('该页面样式注入未启用')
  }
  const files = ['hack/common.css']
  const style = asArray(site.hacker.style) || []
  style.forEach(file => files.push(file))
  const target: chrome.scripting.InjectionTarget = {
    allFrames: !tab.frameId,
    tabId
  }
  if (tab.frameId) {
    target.frameIds = [tab.frameId]
  }
  await chrome.scripting.insertCSS({ files, target })
  console.log('页面样式注入完成: ', tab.url)
  console.table(files)
}

function handleRuntimeError() {
  const error: any = chrome.runtime.lastError;
  if (error) {
    throw new Error(error);
  }
}

async function handleError(tabId: any) {
  const tab = await chrome.tabs.get(tabId)
  try {
    handleRuntimeError();
    return tab;
  } catch (e: any) {
    console.log('safeGetTab', e.message);
  }
}

const loadingPage: any = {}

// iframe => https://codingdict.com/questions/13895
export function pageHacker(tabId: number, changeInfo: any, tab: any) {
  if (!tab || !tab.url || !tab.url.startsWith('http://') && !tab.url.startsWith('https://')) {
    return
  }
  const site = HackMappings.find(mapping => mapping.expectUrl(tab)) || {
    hacker: { state: undefined },
    description: { enable: false },
    id: new Date().toISOString()
  }
  handleError(tabId).then(async () => {
    site.id && chrome.action.enable(tabId)
    const status = changeInfo && changeInfo.status
    if (!site.hacker || (status !== site.hacker.state && status !== true)) {
      return
    }
    if (loadingPage[tab.url]) {
      return
    }
    loadingPage[tab.url] = true
    try {
      const response: any = await getStorage(site.id)
      const config = Object.assign({ configId: site.id }, site.description, response[site.id])
      console.log('页面配置获取成功: ', tab.url)
      console.table(config)
      await insertCss(site, tabId, tab, config)
      await insertScript(site, tabId, tab, config)
    } finally {
      delete loadingPage[tab.url]
    }
  })
}

export function messageTab(tabId: number, message: any, callback: (response: any) => void) {
  handleError(tabId).then(() => chrome.tabs.sendMessage(tabId, message, callback))
}

export function setStorage(keys: any) {
  if (!keys || !chrome.storage || !chrome.storage.local) {
    return new Promise(resolve => resolve({}))
  }
  return chrome.storage.local.set(keys)
}

export function getStorage(keys?: string | string[] | { [key: string]: any } | null) {
  if (!keys || !chrome.storage || !chrome.storage.local) {
    return new Promise(resolve => resolve({}))
  }
  if (typeof keys === 'string') {
    return chrome.storage.local.get([keys])
  }
  if (Array.isArray(keys)) {
    return chrome.storage.local.get(keys)
  }
  return chrome.storage.local.get(keys)
}
