import{p as r,a as i}from"./support.js";chrome.webNavigation.onCommitted.addListener(function(e){e.url!=="about:blank"&&r(e.tabId,{status:!0},e)});chrome.runtime.onMessage.addListener((e,t,a)=>e?e.type==="ajax"?(i(e,t,a),!0):a({}):a({}));function n(){setTimeout(n,5e3);const e=chrome.runtime.getManifest();fetch("/manifest.json").then(t=>t.json()).then(t=>{t.version!==e.version&&chrome.runtime.reload()})}chrome.management.getSelf(e=>{e.installType==="development"&&n()});
