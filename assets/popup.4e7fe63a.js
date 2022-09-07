import{_ as d,c as p,a as k,t as _,b as u,f as h,o as r,h as m,w as j,F as C,r as S,i as F,g as v,k as x,l as q}from"./plugin-vue_export-helper.3fe5ecfa.js";const P=function(e,i){const t=new XMLHttpRequest;t.open("GET",e),t.send(null),t.onreadystatechange=function(){t.readyState===4&&t.status===200&&i(t.responseText)}},w={configLabel:"\u914D\u7F6E\u5F00\u5173"},L={active:!0,currentWindow:!0},y=[{id:"baidu-search",expectUrl:e=>/http(s)?:\/\/(www.)?baidu.com.*/.test(e.url),matchPatterns:["*://baidu.com/*","*://www.baidu.com/*"],cssFiles:["hack/common.css","hack/baidu/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/baidu/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"baidu-zhidao",expectUrl:e=>/http[s]?:\/\/zhidao[.]baidu[.]com\/question\/.*.html/.test(e.url),matchPatterns:["*://zhidao.baidu.com/question/*.html"],cssFiles:"hack/baidu/zhidao.css",scriptFiles:["hack/jquery.min.js","hack/baidu/zhidao.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u77E5\u9053"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"baidu-jingyan",expectUrl:e=>/http[s]?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(e.url),matchPatterns:["*://jingyan.baidu.com/article/*.html"],cssFiles:"hack/baidu/jingyan.css",scriptFiles:["hack/jquery.min.js","hack/baidu/jingyan.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u7ECF\u9A8C"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"baidu-baijiahao",expectUrl:e=>/http[s]?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(e.url),matchPatterns:["*://baijiahao.baidu.com/s*"],cssFiles:"hack/baidu/baijiahao.css",scriptFiles:["hack/jquery.min.js","hack/baidu/baijiahao.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u9707\u60CA"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"bing-search",expectUrl:e=>/http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(e.url),matchPatterns:["*://cn.bing.com/search*&q=*","*://cn.bing.com/search*?q=*"],cssFiles:["hack/common.css","hack/bing/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/bing/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"google-search",expectUrl:e=>/http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(e.url),matchPatterns:["*://www.google.com/search*&q=*","*://www.google.com/search*?q=*"],cssFiles:["hack/common.css","hack/google/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/google/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"douyu-follow",expectUrl:e=>/http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(e.url),matchPatterns:["*://www.douyu.com/directory/all","*://www.douyu.com/directory/myFollow"],cssFiles:"hack/douyu/live-directory.css",scriptFiles:["hack/jquery.min.js","hack/douyu/live-directory.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u5173\u6CE8"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"douyu-room",expectUrl:e=>/http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(e.url),matchPatterns:["*://www.douyu.com/*","*://www.douyu.com/topic/*?rid=*"],cssFiles:["hack/common.css","hack/douyu/live-room.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/douyu/live-room.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u76F4\u64AD"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"bilibili-video",expectUrl:e=>/http(s)?:\/\/www.bilibili.com\/((medialist\/play\/([0-9]+|ml[0-9]+\/BV[a-zA-Z0-9]+))|(bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)[a-zA-Z0-9]+))(\?.*)?/.test(e.url),matchPatterns:["*://www.bilibili.com/medialist/play/*","*://www.bilibili.com/bangumi/play/ep*","*://www.bilibili.com/bangumi/play/ss*","*://www.bilibili.com/video/av*","*://www.bilibili.com/video/BV*"],cssFiles:"hack/bilibili/video.css",scriptFiles:["hack/jquery.min.js","hack/bilibili/video.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u89C6\u9891"\u914D\u7F6E\u5F00\u5173',fields:[{key:"autoStartPlay",label:"\u81EA\u52A8\u64AD\u653E",type:"SwitchField",default:!0},{key:"fullWebScreen",label:"\u7F51\u9875\u5168\u5C4F",type:"SwitchField",default:!0},{key:"playbackRate",label:"\u64AD\u653E\u901F\u7387",type:"SliderField",showInput:!1,default:1.25,step:.05,min:.1,max:5,marks:{1:"1.0",2:"2.0",3:"3.0",4:"4.0"}}]}},{id:"pc6-software",expectUrl:e=>/http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(e.url),matchPatterns:["*://www.pc6.com/softview/SoftView_*.html"],cssFiles:"hack/pc6/software.css",scriptFiles:["hack/jquery.min.js","hack/pc6/software.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u5E94\u7528"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"zhihu-question",expectUrl:e=>/http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(e.url),matchPatterns:["*://www.zhihu.com/search?*","*://www.zhihu.com/question/*"],cssFiles:"hack/zhihu/question.css",scriptFiles:["hack/jquery.min.js","hack/zhihu/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"zhihu-zhuanlan",expectUrl:e=>/http[s]:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(e.url),matchPatterns:["*://zhuanlan.zhihu.com/p/*"],cssFiles:"hack/zhihu/zhuanlan.css",scriptFiles:["hack/jquery.min.js","hack/zhihu/zhuanlan.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u4E13\u680F"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"51cto-blog",expectUrl:e=>/http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(e.url),matchPatterns:["*://blog.51cto.com/*/*"],cssFiles:"hack/51cto/blog.css",scriptFiles:["hack/jquery.min.js","hack/51cto/blog.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u535A\u5BA2"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"segmentfault-question",expectUrl:e=>/http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(e.url),matchPatterns:["*://*.segmentfault.com/q/*"],cssFiles:"hack/segmentfault/question.css",scriptFiles:["hack/jquery.min.js","hack/segmentfault/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"segmentfault-articles",expectUrl:e=>/http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(e.url),matchPatterns:["*://*.segmentfault.com/a/*"],cssFiles:"hack/segmentfault/articles.css",scriptFiles:["hack/jquery.min.js","hack/segmentfault/articles.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"cnblogs-articles",expectUrl:e=>/http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(e.url),matchPatterns:["*://www.cnblogs.com/*/p/*.html","*://www.cnblogs.com/*/archive/*.html","*://www.cnblogs.com/*/articles/*.html"],cssFiles:"hack/cnblogs/articles.css",scriptFiles:["hack/jquery.min.js","hack/cnblogs/articles.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"iteye-magazines",expectUrl:e=>/http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(e.url),matchPatterns:["*://www.iteye.com/magazines/*"],cssFiles:"hack/iteye/magazines.css",scriptFiles:["hack/jquery.min.js","hack/iteye/magazines.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6742\u5FD7"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"iteye-blog",expectUrl:e=>/http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(e.url),matchPatterns:["*://www.iteye.com/blog/*"],cssFiles:"hack/iteye/blog.css",scriptFiles:["hack/jquery.min.js","hack/iteye/blog.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u535A\u5BA2"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"chinaunix-article",expectUrl:e=>/http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(e.url),matchPatterns:["*://blog.chinaunix.net/*"],cssFiles:"hack/chinaunix/article.css",scriptFiles:["hack/jquery.min.js","hack/chinaunix/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"bejson-json",expectUrl:e=>/http[s]?:\/\/www.bejson.com\/.*/.test(e.url),matchPatterns:["*://www.bejson.com/*"],cssFiles:"hack/bejson/json.css",scriptFiles:["hack/jquery.min.js","hack/bejson/json.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"JSON"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"linuxidc-article",expectUrl:e=>/http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(e.url),matchPatterns:["*://www.linuxidc.com/Linux/*.htm*"],cssFiles:"hack/linuxidc/article.css",scriptFiles:["hack/jquery.min.js","hack/linuxidc/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"tencent-article",expectUrl:e=>/http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(e.url),matchPatterns:["*://cloud.tencent.com/developer/article/*"],cssFiles:"hack/tencent/article.css",scriptFiles:["hack/jquery.min.js","hack/tencent/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"jianshu-article",expectUrl:e=>/http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(e.url),matchPatterns:["*://www.jianshu.com/p/*"],cssFiles:"hack/jianshu/article.css",scriptFiles:["hack/jquery.min.js","hack/jianshu/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"csdn-article",expectUrl:e=>/http[s]?:\/\/([\w]+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(e.url),matchPatterns:["*://*.blog.csdn.net/article/details/*","*://blog.csdn.net/*/article/details/*"],cssFiles:"hack/csdn/article.css",scriptFiles:["hack/jquery.min.js","hack/csdn/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"csdn-topics",expectUrl:e=>/http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(e.url),matchPatterns:["*://bbs.csdn.net/topics/*"],cssFiles:"hack/csdn/topics.css",scriptFiles:["hack/jquery.min.js","hack/csdn/topics.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u8BDD\u9898"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"7down-soft",expectUrl:e=>/http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(e.url),matchPatterns:["*://www.7down.com/soft/*.html"],cssFiles:"hack/7down/soft.css",scriptFiles:["hack/jquery.min.js","hack/7down/soft.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u8F6F\u4EF6"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"jb51-artical",expectUrl:e=>/http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(e.url),matchPatterns:["*://www.jb51.net/*.html","*://www.jb51.net/artical/*.html"],cssFiles:"hack/jb51/artical.css",scriptFiles:["hack/jquery.min.js","hack/jb51/artical.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"mvcat-inject",expectUrl:e=>/http[s]?:\/\/(www.)?mvcat[.]com\/.*/.test(e.url),matchPatterns:["*://www.mvcat.net/*"],cssFiles:"hack/mvcat/style.css",scriptFiles:["hack/jquery.min.js","hack/mvcat/script.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u5BFC\u822A"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"360-article",expectUrl:e=>/http[s]?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(e.url),matchPatterns:["*://360doc.cn/article/*.html","*://360doc.cn/content/*.html","*://360doc.com/article/*.html","*://360doc.com/content/*.html","*://www.360doc.cn/article/*.html","*://www.360doc.cn/content/*.html","*://www.360doc.com/article/*.html","*://www.360doc.com/content/*.html"],cssFiles:"hack/360/article.css",scriptFiles:["hack/jquery.min.js","hack/360/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{id:"stackoverflow-question",expectUrl:e=>/http[s]?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(e.url),matchPatterns:["*://stackoverflow.com/questions/*/*"],cssFiles:"hack/stackoverflow/question.css",scriptFiles:["hack/jquery.min.js","hack/stackoverflow/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}}];const D={name:"SliderField",props:{config:{type:Object,default:{}}},watch:{},data(){return{}},methods:{onChange(e){this.config.handler&&typeof this.config.handler=="function"&&this.config.handler.call(this,e),this.$emit("store-config",{fields:[{key:this.config.key,value:this.config.value}]})}}},U={class:"el-slider__wrapper"},z={class:"el-slider__label"};function V(e,i,t,n,c,s){const a=h("el-slider");return r(),p("div",U,[k("span",z,_(t.config.label),1),u(a,{min:t.config.min,max:t.config.max,onChange:s.onChange,step:t.config.step,marks:t.config.marks,modelValue:t.config.value,"onUpdate:modelValue":i[0]||(i[0]=l=>t.config.value=l),"show-input":t.config.showInput},null,8,["min","max","onChange","step","marks","modelValue","show-input"])])}var O=d(D,[["render",V]]),I=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));const A={name:"SwitchField",props:{config:{type:Object,default:{}}},watch:{},data(){return{}},methods:{onChange(e){this.config.handler&&typeof this.config.handler=="function"&&this.config.handler.call(this,e),this.$emit("store-config",{fields:[{key:this.config.key,value:this.config.value}]})}}};function E(e,i,t,n,c,s){const a=h("el-switch");return r(),m(a,{modelValue:t.config.value,"onUpdate:modelValue":i[0]||(i[0]=l=>t.config.value=l),"active-text":t.config.label,onChange:s.onChange},null,8,["modelValue","active-text","onChange"])}var N=d(A,[["render",E]]),B=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"}));const f=function(e,i){if(!(!e||!chrome.storage||!chrome.storage.local)){if(typeof e=="string"||Array.isArray(e)){chrome.storage.local.get(e,i||(t=>console.log(`\u53D6\u503C\u6210\u529F: ${JSON.stringify(t)}`)));return}chrome.storage.local.set(e,i||(()=>console.log(`\u4FDD\u5B58\u6210\u529F: ${JSON.stringify(e)}`)))}};const g={"../component/SliderField.vue":I,"../component/SwitchField.vue":B},M=Object.keys(g).reduce((e,i)=>{const t=i.lastIndexOf("/")+1,n=i.lastIndexOf("."),c=i.substring(t,n);return e[c]=g[i].default||g[i],e},{}),J={name:"PopupConfig",components:M,props:{description:{type:Object,default:w}},watch:{description:{deep:!0,immediate:!0,handler(e){f(e.configId,i=>{this.configLabel=e.configLabel;const t=i[e.configId]||{};this.enable=t.hasOwnProperty("enable")?t.enable:!0,this.injectCss=t.hasOwnProperty("injectCss")?t.injectCss:!0,this.injectScript=t.hasOwnProperty("injectScript")?t.injectScript:!0;const n=[];(e.fields||[]).map(c=>({...c})).forEach(c=>{c.hasOwnProperty("value")||(c.value=c.default),t.hasOwnProperty(c.key)&&(c.value=t[c.key]),n.push(c)}),this.fields=n,console.log(JSON.stringify(t))})}}},computed:{enableCss(){return this.enable&&this.injectCss},enableScript(){return this.enable&&this.injectScript}},data(){const e=y.find(t=>t.id===this.description.configId),i=e&&e.configDescription.fields||[];return i.forEach(t=>t.value=t.default),{enable:!0,injectCss:!0,injectScript:!0,configLabel:"",fields:i||[]}},methods:{onEnableSwitchChange(e){this.storePopupConfig({enable:e})},onCssSwitchChange(e){this.injectCss=e,this.storePopupConfig({injectCss:e})},onScriptSwitchChange(e){this.injectScript=e,this.storePopupConfig({injectScript:e})},storePopupConfig(e){const i={};e.fields&&e.fields.forEach(n=>{i[n.key]=n.value});const t=this.description.configId;f(t,n=>{const c=n&&n[t]||{};c.enable=e.enable||this.enable,c.injectCss=e.injectCss||this.injectCss,c.injectScript=e.injectScript||this.injectScript,Object.keys(i).forEach(s=>{c[s]=i[s]}),f({[t]:c})})}}},T={class:"popup-page-wrapper"};function H(e,i,t,n,c,s){const a=h("el-switch"),l=h("el-card");return r(),p("div",T,[u(l,{class:"config-switch-card"},{default:j(()=>[u(a,{modelValue:c.enable,"onUpdate:modelValue":i[0]||(i[0]=o=>c.enable=o),"active-text":c.configLabel,onChange:s.onEnableSwitchChange},null,8,["modelValue","active-text","onChange"]),u(a,{modelValue:s.enableCss,"onUpdate:modelValue":i[1]||(i[1]=o=>s.enableCss=o),"active-text":"\u6CE8\u5165\u9884\u8BBE\u6837\u5F0F",onChange:s.onCssSwitchChange},null,8,["modelValue","onChange"]),u(a,{modelValue:s.enableScript,"onUpdate:modelValue":i[2]||(i[2]=o=>s.enableScript=o),"active-text":"\u6CE8\u5165\u9884\u8BBE\u811A\u672C",onChange:s.onScriptSwitchChange},null,8,["modelValue","onChange"])]),_:1}),c.enable&&c.fields.length?(r(),m(l,{key:0,class:"options-wrapper"},{default:j(()=>[(r(!0),p(C,null,S(c.fields,o=>(r(),m(F(o.type),{key:o.key,config:o,onStoreConfig:s.storePopupConfig},null,40,["config","onStoreConfig"]))),128))]),_:1})):v("",!0)])}var R=d(J,[["render",H]]);const W=!0,b={...w,configId:""},Z={name:"PopupIndex",components:{PopupConfig:R},beforeMount(){P("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",function(e){const i=JSON.parse(e).images;document.body.style.backgroundImage=i.map(t=>`url('http://cn.bing.com${t.url}')`).join(",")})},data(){return chrome.tabs&&chrome.tabs.query(L).then(([e])=>{const i=y.find(t=>t.expectUrl(e));i&&(this.empty=!1,this.configDescription=Object.assign(b,{configId:i.id},i.configDescription))}),{empty:W,configDescription:b}}},G={key:0,class:"empty-content"};function X(e,i,t,n,c,s){const a=h("popup-config");return c.empty?(r(),p("h3",G,"\u5F53\u524D\u9875\u9762\u65E0\u53EF\u914D\u7F6E\u9879")):(r(),m(a,{key:1,description:c.configDescription},null,8,["description"]))}var K=d(Z,[["render",X]]);x(K).use(q).mount("#app");