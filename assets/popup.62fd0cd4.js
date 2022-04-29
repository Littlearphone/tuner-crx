import{_ as m,r as p,o as l,h,c as j,b as u,w as b,F as k,f as w,i as y,g as C,k as F,l as S}from"./plugin-vue_export-helper.b6db102c.js";const x=function(e,i){const t=new XMLHttpRequest;t.open("GET",e),t.send(null),t.onreadystatechange=function(){t.readyState===4&&t.status===200&&i(t.responseText)}},d={configLabel:"\u914D\u7F6E\u5F00\u5173"},_={active:!0,currentWindow:!0},v=[{id:"baidu-portal",expectUrl:e=>/http(s)?:\/\/(www.)?baidu.com.*/.test(e.url),matchPatterns:["*://baidu.com*","*://www.baidu.com*"],cssFiles:["hack/common.css","hack/baidu/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/baidu/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"baidu-search",configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/zhidao[.]baidu[.]com\/question\/.*.html/.test(e.url),cssFiles:"hack/baidu/zhidao.css",scriptFiles:["hack/jquery.min.js","hack/baidu/zhidao.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"baidu-zhidao",configLabel:'"\u77E5\u9053"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/jingyan[.]baidu[.]com\/article\/.*.html/.test(e.url),cssFiles:"hack/baidu/jingyan.css",scriptFiles:["hack/jquery.min.js","hack/baidu/jingyan.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"baidu-jingyan",configLabel:'"\u7ECF\u9A8C"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/baijiahao[.]baidu[.]com\/s.*/.test(e.url),cssFiles:"hack/baidu/baijiahao.css",scriptFiles:["hack/jquery.min.js","hack/baidu/baijiahao.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"baidu-baijiahao",configLabel:'"\u9707\u60CA"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/cn.bing.com(\/search)?.*([?&]q=.*).*/.test(e.url),cssFiles:["hack/common.css","hack/bing/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/bing/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"bing-search",configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/www.google.com(\/search)?.*([?&]q=.*).*/.test(e.url),cssFiles:["hack/common.css","hack/google/search.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/google/search.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"google-search",configLabel:'"\u641C\u7D22"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/www.douyu.com\/directory\/(myFollow|all)/.test(e.url),cssFiles:"hack/douyu/live-directory.css",scriptFiles:["hack/jquery.min.js","hack/douyu/live-directory.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"douyu-follow",configLabel:'"\u5173\u6CE8"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/www.douyu.com\/([0-9]+|topic\/.*[?]rid=[0-9]+)/.test(e.url),cssFiles:["hack/common.css","hack/douyu/live-room.css"],scriptFiles:["hack/jquery.min.js","hack/common.js","hack/douyu/live-room.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"douyu-room",configLabel:'"\u76F4\u64AD"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/www.bilibili.com\/((bangumi\/play\/(ep|ss)[0-9]+)|(video\/(av|BV)([a-zA-Z0-9]+)))/.test(e.url),cssFiles:"hack/bilibili/video.css",scriptFiles:["hack/jquery.min.js","hack/bilibili/video.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"bilibili-video",configLabel:'"\u89C6\u9891"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/[^.]+[.]shtml#@page=[0-9]+/.test(e.url)||/http(s)?:\/\/manhua.dmzj.com\/[^\/]+\/?/.test(e.url)||/http(s)?:\/\/manhua.dmzj.com\/?/.test(e.url)||/http(s)?:\/\/www.dmzj.com\/view\/[^\/]+\/[^.]+[.]html#@page=[0-9]+/.test(e.url)||/http(s)?:\/\/www.dmzj.com\/info\/[^.]+[.]html/.test(e.url)||/http(s)?:\/\/www.dmzj.com\/?/.test(e.url),cssFiles:"hack/snippet/snippet.css",scriptFiles:["hack/jquery.min.js","hack/snippet/snippet.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"snippet-inject",configLabel:'"\u6DF7\u5408"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]pc6[.]com\/softview\/SoftView_.*[.]html/.test(e.url),cssFiles:"hack/pc6/software.css",scriptFiles:["hack/jquery.min.js","hack/pc6/software.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"pc6-software",configLabel:'"\u5E94\u7528"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]:\/\/www[.]zhihu[.]com\/(search?.*|question\/.*)/.test(e.url),cssFiles:"hack/zhihu/question.css",scriptFiles:["hack/jquery.min.js","hack/zhihu/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"zhihu-question",configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]:\/\/zhuanlan[.]zhihu[.]com\/p\/.*/.test(e.url),cssFiles:"hack/zhihu/zhuanlan.css",scriptFiles:["hack/jquery.min.js","hack/zhihu/zhuanlan.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"zhihu-zhuanlan",configLabel:'"\u4E13\u680F"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]:\/\/blog[.]51cto[.]com\/[0-9]+\/[0-9]+/.test(e.url),cssFiles:"hack/51cto/blog.css",scriptFiles:["hack/jquery.min.js","hack/51cto/blog.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"51cto-blog",configLabel:'"\u535A\u5BA2"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http.?:\/\/(.*[.])?segmentfault[.]com\/q\/.*/.test(e.url),cssFiles:"hack/segmentfault/question.css",scriptFiles:["hack/jquery.min.js","hack/segmentfault/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"segmentfault-question",configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http.?:\/\/(.*[.])?segmentfault[.]com\/a\/.*/.test(e.url),cssFiles:"hack/segmentfault/articles.css",scriptFiles:["hack/jquery.min.js","hack/segmentfault/articles.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"segmentfault-articles",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]cnblogs[.]com\/.*\/(p|articles|archive)\/.*[.]html/.test(e.url),cssFiles:"hack/cnblogs/articles.css",scriptFiles:["hack/jquery.min.js","hack/cnblogs/articles.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"cnblogs-articles",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]iteye[.]com\/magazines\/.*/.test(e.url),cssFiles:"hack/iteye/magazines.css",scriptFiles:["hack/jquery.min.js","hack/iteye/magazines.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"iteye-magazines",configLabel:'"\u6742\u5FD7"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]iteye[.]com\/blog\/.*/.test(e.url),cssFiles:"hack/iteye/blog.css",scriptFiles:["hack/jquery.min.js","hack/iteye/blog.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"iteye-blog",configLabel:'"\u535A\u5BA2"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/blog[.]chinaunix[.]net\/.*/.test(e.url),cssFiles:"hack/chinaunix/article.css",scriptFiles:["hack/jquery.min.js","hack/chinaunix/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"chinaunix-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www.bejson.com\/.*/.test(e.url),cssFiles:"hack/bejson/json.css",scriptFiles:["hack/jquery.min.js","hack/bejson/json.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"bejson-json",configLabel:'"JSON"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]linuxidc[.]com\/Linux\/.*[.]htm[l]?/.test(e.url),cssFiles:"hack/linuxidc/article.css",scriptFiles:["hack/jquery.min.js","hack/linuxidc/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"linuxidc-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/cloud[.]tencent[.]com\/developer\/article\/.*/.test(e.url),cssFiles:"hack/tencent/article.css",scriptFiles:["hack/jquery.min.js","hack/tencent/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"tencent-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]jianshu[.]com\/p\/.*/.test(e.url),cssFiles:"hack/jianshu/article.css",scriptFiles:["hack/jquery.min.js","hack/jianshu/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"jianshu-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/([\w]+[.])?blog[.]csdn[.]net\/(.*\/)?article\/details\/.*/.test(e.url),cssFiles:"hack/csdn/article.css",scriptFiles:["hack/jquery.min.js","hack/csdn/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"csdn-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/bbs[.]csdn[.]net\/topics\/.*/.test(e.url),cssFiles:"hack/csdn/topics.css",scriptFiles:["hack/jquery.min.js","hack/csdn/topics.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"csdn-topics",configLabel:'"\u8BDD\u9898"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]7down[.]com\/soft\/.*[.]html/.test(e.url),cssFiles:"hack/7down/soft.css",scriptFiles:["hack/jquery.min.js","hack/7down/soft.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"7down-soft",configLabel:'"\u8F6F\u4EF6"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/www[.]jb51[.]net\/(artical\/)?.*[.]htm(l)?/.test(e.url),cssFiles:"hack/jb51/artical.css",scriptFiles:["hack/jquery.min.js","hack/jb51/artical.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"jb51-artical",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/(www.)?mvcat[.]com\/.*/.test(e.url),cssFiles:"hack/mvcat/style.css",scriptFiles:["hack/jquery.min.js","hack/mvcat/script.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"mvcat-inject",configLabel:'"\u5BFC\u822A"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/(www.)?360doc[.](com|cn)\/(article|content)\/.*html/.test(e.url),cssFiles:"hack/360/article.css",scriptFiles:["hack/jquery.min.js","hack/360/article.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"360-article",configLabel:'"\u6587\u7AE0"\u914D\u7F6E\u5F00\u5173',fields:[]}},{expectUrl:e=>/http[s]?:\/\/stackoverflow.com\/questions\/[0-9]+\/.*/.test(e.url),cssFiles:"hack/stackoverflow/question.css",scriptFiles:["hack/jquery.min.js","hack/stackoverflow/question.js"],configDescription:{enable:!0,injectCss:!0,injectScript:!0,configId:"stackoverflow-question",configLabel:'"\u95EE\u7B54"\u914D\u7F6E\u5F00\u5173',fields:[]}}];const q={name:"SwitchField",props:{config:{type:Object,default:{}}},watch:{},data(){return{}},methods:{onChange(e){this.config.handler&&typeof this.config.handler=="function"&&this.config.handler.call(this,e),this.$emit("store-config",{fields:[{key:this.config.key,value:this.config.value}]})}}};function I(e,i,t,n,s,c){const o=p("el-switch");return l(),h(o,{modelValue:t.config.value,"onUpdate:modelValue":i[0]||(i[0]=a=>t.config.value=a),"active-text":t.config.label,onChange:c.onChange},null,8,["modelValue","active-text","onChange"])}var L=m(q,[["render",I]]),D=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));const f=function(e,i){if(!(!e||!chrome.storage||!chrome.storage.local)){if(typeof e=="string"||Array.isArray(e)){chrome.storage.local.get(e,i||(t=>console.log(`\u53D6\u503C\u6210\u529F: ${JSON.stringify(t)}`)));return}chrome.storage.local.set(e,i||(()=>console.log(`\u4FDD\u5B58\u6210\u529F: ${JSON.stringify(e)}`)))}};const g={"../component/SwitchField.vue":D},U=Object.keys(g).reduce((e,i)=>{const t=i.lastIndexOf("/")+1,n=i.lastIndexOf("."),s=i.substring(t,n);return e[s]=g[i].default||g[i],e},{}),z={name:"PopupConfig",components:U,props:{description:{type:Object,default:d}},watch:{description:{deep:!0,immediate:!0,handler(e){f(e.configId,i=>{this.configLabel=e.configLabel;const t=i[e.configId]||{};this.enable=t.hasOwnProperty("enable")?t.enable:!0,this.injectCss=t.hasOwnProperty("injectCss")?t.injectCss:!0,this.injectScript=t.hasOwnProperty("injectScript")?t.injectScript:!0,(e.fields||[]).forEach(s=>{this.fields.push(s),s.hasOwnProperty("value")||(s.value=s.default)}),console.log(JSON.stringify(t))})}}},computed:{enableCss(){return this.enable&&this.injectCss},enableScript(){return this.enable&&this.injectScript}},data(){return{enable:!0,injectCss:!0,injectScript:!0,configLabel:"",fields:[]}},methods:{onEnableSwitchChange(e){this.storePopupConfig({enable:e})},onCssSwitchChange(e){this.injectCss=e,this.storePopupConfig({injectCss:e})},onScriptSwitchChange(e){this.injectScript=e,this.storePopupConfig({injectScript:e})},storePopupConfig(e){const i={};e.fields&&e.fields.forEach(n=>{i[n.key]=n.value});const t=this.description.configId;f(t,n=>{const s=n&&n[t]||{};s.enable=e.enable||this.enable,s.injectCss=e.injectCss||this.injectCss,s.injectScript=e.injectScript||this.injectScript,s.fields=this.fields.map(c=>({key:c.key,value:i.value||c.value})),f({[t]:s})})}}},O={class:"popup-page-wrapper"};function P(e,i,t,n,s,c){const o=p("el-switch"),a=p("el-card");return l(),j("div",O,[u(a,{class:"config-switch-card"},{default:b(()=>[u(o,{modelValue:s.enable,"onUpdate:modelValue":i[0]||(i[0]=r=>s.enable=r),"active-text":s.configLabel,onChange:c.onEnableSwitchChange},null,8,["modelValue","active-text","onChange"]),u(o,{modelValue:c.enableCss,"onUpdate:modelValue":i[1]||(i[1]=r=>c.enableCss=r),"active-text":"\u6CE8\u5165\u9884\u8BBE\u6837\u5F0F",onChange:c.onCssSwitchChange},null,8,["modelValue","onChange"]),u(o,{modelValue:c.enableScript,"onUpdate:modelValue":i[2]||(i[2]=r=>c.enableScript=r),"active-text":"\u6CE8\u5165\u9884\u8BBE\u811A\u672C",onChange:c.onScriptSwitchChange},null,8,["modelValue","onChange"])]),_:1}),s.enable&&s.fields.length?(l(),h(a,{key:0,class:"options-wrapper"},{default:b(()=>[(l(!0),j(k,null,w(s.fields,r=>(l(),h(y(r.type),{key:r.key,config:r,onStoreConfig:c.storePopupConfig},null,8,["config","onStoreConfig"]))),128))]),_:1})):C("",!0)])}var V=m(z,[["render",P]]);const A={name:"PopupIndex",components:{PopupConfig:V},beforeMount(){x("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",function(e){const i=JSON.parse(e).images;document.body.style.backgroundImage=i.map(t=>`url('http://cn.bing.com${t.url}')`).join(",")})},data(){return chrome.tabs&&chrome.tabs.query(_).then(([e])=>{const i=v.find(t=>t.expectUrl(e));i&&(this.empty=!1,this.configDescription=Object.assign({},d,i.configDescription))}),{empty:!0,configDescription:d}}},N={key:0,class:"empty-content"};function E(e,i,t,n,s,c){const o=p("popup-config");return s.empty?(l(),j("h3",N,"\u5F53\u524D\u9875\u9762\u65E0\u53EF\u914D\u7F6E\u9879")):(l(),h(o,{key:1,description:s.configDescription},null,8,["description"]))}var J=m(A,[["render",E]]);F(J).use(S).mount("#app");
