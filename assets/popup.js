var We=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);import{ab as M,ac as Ze,ad as Q,ae as Se,af as L,ag as ee,ah as te,ai as Qe,i as k,aj as ne,ak as et,al as tt,am as Pe,r as re,an as A,f as nt,H as rt,d as B,ao as we,ap as ot,aq as at,g as it,E as st,a0 as ct,k as ut,ar as ft,l as lt,j as N,A as D,s as pt,V as dt,B as z,m as b,n as C,o as gt,p as J,x as g,L as q,F as ht,a7 as yt,K as vt,as as _t,a6 as bt,aa as mt}from"./__uno.js";import{n as St,p as Te,o as Pt}from"./popper.js";import{D as Oe,s as wt,g as Tt,A as Ot,H as jt}from"./support.js";var Lr=We((h,y)=>{function je(e){return e}var ce=Object.create,Ct=function(){function e(){}return function(t){if(!M(t))return{};if(ce)return ce(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();const xt=Ct;function At(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function Et(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}var $t=800,It=16,Vt=Date.now;function Ut(e){var t=0,n=0;return function(){var r=Vt(),o=It-(r-n);if(n=r,o>0){if(++t>=$t)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function Ft(e){return function(){return e}}var Mt=function(){try{var e=Ze(Object,"defineProperty");return e({},"",{}),e}catch{}}();const R=Mt;var Lt=R?function(e,t){return R(e,"toString",{configurable:!0,enumerable:!1,value:Ft(t),writable:!0})}:je;const Bt=Lt;var Dt=Ut(Bt);const Rt=Dt;var Nt=9007199254740991,Ht=/^(?:0|[1-9]\d*)$/;function Ce(e,t){var n=typeof e;return t=t??Nt,!!t&&(n=="number"||n!="symbol"&&Ht.test(e))&&e>-1&&e%1==0&&e<t}function oe(e,t,n){t=="__proto__"&&R?R(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}var qt=Object.prototype,Gt=qt.hasOwnProperty;function kt(e,t,n){var r=e[t];(!(Gt.call(e,t)&&Q(r,n))||n===void 0&&!(t in e))&&oe(e,t,n)}function zt(e,t,n,r){var o=!n;n||(n={});for(var i=-1,s=t.length;++i<s;){var a=t[i],c=r?r(n[a],e[a],a,n,e):void 0;c===void 0&&(c=e[a]),o?oe(n,a,c):kt(n,a,c)}return n}var ue=Math.max;function Jt(e,t,n){return t=ue(t===void 0?e.length-1:t,0),function(){for(var r=arguments,o=-1,i=ue(r.length-t,0),s=Array(i);++o<i;)s[o]=r[t+o];o=-1;for(var a=Array(t+1);++o<t;)a[o]=r[o];return a[t]=n(s),At(e,this,a)}}function Kt(e,t){return Rt(Jt(e,t,je),e+"")}var Xt=9007199254740991;function xe(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Xt}function ae(e){return e!=null&&xe(e.length)&&!Se(e)}function Yt(e,t,n){if(!M(n))return!1;var r=typeof t;return(r=="number"?ae(n)&&Ce(t,n.length):r=="string"&&t in n)?Q(n[t],e):!1}function Wt(e){return Kt(function(t,n){var r=-1,o=n.length,i=o>1?n[o-1]:void 0,s=o>2?n[2]:void 0;for(i=e.length>3&&typeof i=="function"?(o--,i):void 0,s&&Yt(n[0],n[1],s)&&(i=o<3?void 0:i,o=1),t=Object(t);++r<o;){var a=n[r];a&&e(t,a,r,i)}return t})}var Zt=Object.prototype;function Ae(e){var t=e&&e.constructor,n=typeof t=="function"&&t.prototype||Zt;return e===n}function Qt(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}var en="[object Arguments]";function fe(e){return L(e)&&ee(e)==en}var Ee=Object.prototype,tn=Ee.hasOwnProperty,nn=Ee.propertyIsEnumerable,rn=fe(function(){return arguments}())?fe:function(e){return L(e)&&tn.call(e,"callee")&&!nn.call(e,"callee")};const K=rn;function on(){return!1}var $e=typeof h=="object"&&h&&!h.nodeType&&h,le=$e&&typeof y=="object"&&y&&!y.nodeType&&y,an=le&&le.exports===$e,pe=an?te.Buffer:void 0,sn=pe?pe.isBuffer:void 0,cn=sn||on;const Ie=cn;var un="[object Arguments]",fn="[object Array]",ln="[object Boolean]",pn="[object Date]",dn="[object Error]",gn="[object Function]",hn="[object Map]",yn="[object Number]",vn="[object Object]",_n="[object RegExp]",bn="[object Set]",mn="[object String]",Sn="[object WeakMap]",Pn="[object ArrayBuffer]",wn="[object DataView]",Tn="[object Float32Array]",On="[object Float64Array]",jn="[object Int8Array]",Cn="[object Int16Array]",xn="[object Int32Array]",An="[object Uint8Array]",En="[object Uint8ClampedArray]",$n="[object Uint16Array]",In="[object Uint32Array]",l={};l[Tn]=l[On]=l[jn]=l[Cn]=l[xn]=l[An]=l[En]=l[$n]=l[In]=!0;l[un]=l[fn]=l[Pn]=l[ln]=l[wn]=l[pn]=l[dn]=l[gn]=l[hn]=l[yn]=l[vn]=l[_n]=l[bn]=l[mn]=l[Sn]=!1;function Vn(e){return L(e)&&xe(e.length)&&!!l[ee(e)]}function Un(e){return function(t){return e(t)}}var Ve=typeof h=="object"&&h&&!h.nodeType&&h,U=Ve&&typeof y=="object"&&y&&!y.nodeType&&y,Fn=U&&U.exports===Ve,G=Fn&&Qe.process,Mn=function(){try{var e=U&&U.require&&U.require("util").types;return e||G&&G.binding&&G.binding("util")}catch{}}();const de=Mn;var ge=de&&de.isTypedArray,Ln=ge?Un(ge):Vn;const Ue=Ln;var Bn=Object.prototype,Dn=Bn.hasOwnProperty;function Rn(e,t){var n=k(e),r=!n&&K(e),o=!n&&!r&&Ie(e),i=!n&&!r&&!o&&Ue(e),s=n||r||o||i,a=s?Qt(e.length,String):[],c=a.length;for(var p in e)(t||Dn.call(e,p))&&!(s&&(p=="length"||o&&(p=="offset"||p=="parent")||i&&(p=="buffer"||p=="byteLength"||p=="byteOffset")||Ce(p,c)))&&a.push(p);return a}function Nn(e,t){return function(n){return e(t(n))}}function Hn(e){var t=[];if(e!=null)for(var n in Object(e))t.push(n);return t}var qn=Object.prototype,Gn=qn.hasOwnProperty;function kn(e){if(!M(e))return Hn(e);var t=Ae(e),n=[];for(var r in e)r=="constructor"&&(t||!Gn.call(e,r))||n.push(r);return n}function Fe(e){return ae(e)?Rn(e,!0):kn(e)}var zn=Nn(Object.getPrototypeOf,Object);const Me=zn;var Jn="[object Object]",Kn=Function.prototype,Xn=Object.prototype,Le=Kn.toString,Yn=Xn.hasOwnProperty,Wn=Le.call(Object);function Zn(e){if(!L(e)||ee(e)!=Jn)return!1;var t=Me(e);if(t===null)return!0;var n=Yn.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&Le.call(n)==Wn}function Qn(){this.__data__=new ne,this.size=0}function er(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}function tr(e){return this.__data__.get(e)}function nr(e){return this.__data__.has(e)}var rr=200;function or(e,t){var n=this.__data__;if(n instanceof ne){var r=n.__data__;if(!et||r.length<rr-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new tt(r)}return n.set(e,t),this.size=n.size,this}function E(e){var t=this.__data__=new ne(e);this.size=t.size}E.prototype.clear=Qn;E.prototype.delete=er;E.prototype.get=tr;E.prototype.has=nr;E.prototype.set=or;var Be=typeof h=="object"&&h&&!h.nodeType&&h,he=Be&&typeof y=="object"&&y&&!y.nodeType&&y,ar=he&&he.exports===Be,ye=ar?te.Buffer:void 0,ve=ye?ye.allocUnsafe:void 0;function ir(e,t){if(t)return e.slice();var n=e.length,r=ve?ve(n):new e.constructor(n);return e.copy(r),r}var sr=te.Uint8Array;const _e=sr;function cr(e){var t=new e.constructor(e.byteLength);return new _e(t).set(new _e(e)),t}function ur(e,t){var n=t?cr(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}function fr(e){return typeof e.constructor=="function"&&!Ae(e)?xt(Me(e)):{}}function lr(e){return function(t,n,r){for(var o=-1,i=Object(t),s=r(t),a=s.length;a--;){var c=s[e?a:++o];if(n(i[c],c,i)===!1)break}return t}}var pr=lr();const dr=pr;function X(e,t,n){(n!==void 0&&!Q(e[t],n)||n===void 0&&!(t in e))&&oe(e,t,n)}function gr(e){return L(e)&&ae(e)}function Y(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}function hr(e){return zt(e,Fe(e))}function yr(e,t,n,r,o,i,s){var a=Y(e,n),c=Y(t,n),p=s.get(c);if(p){X(e,n,p);return}var u=i?i(a,c,n+"",e,t,s):void 0,v=u===void 0;if(v){var m=k(c),S=!m&&Ie(c),T=!m&&!S&&Ue(c);u=c,m||S||T?k(a)?u=a:gr(a)?u=Et(a):S?(v=!1,u=ir(c,!0)):T?(v=!1,u=ur(c,!0)):u=[]:Zn(c)||K(c)?(u=a,K(a)?u=hr(a):(!M(a)||Se(a))&&(u=fr(c))):v=!1}v&&(s.set(c,u),o(u,c,r,i,s),s.delete(c)),X(e,n,u)}function De(e,t,n,r,o){e!==t&&dr(t,function(i,s){if(o||(o=new E),M(i))yr(e,t,s,n,De,r,o);else{var a=r?r(Y(e,s),i,s+"",e,t,o):void 0;a===void 0&&(a=i),X(e,s,a)}},Fe)}var vr=Wt(function(e,t,n){De(e,t,n)});const _r=vr;var br=!1;/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let Re;const H=e=>Re=e,Ne=Symbol();function W(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var F;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(F||(F={}));function mr(){const e=Pe(!0),t=e.run(()=>re({}));let n=[],r=[];const o=A({install(i){H(o),o._a=i,i.provide(Ne,o),i.config.globalProperties.$pinia=o,r.forEach(s=>n.push(s)),r=[]},use(i){return!this._a&&!br?r.push(i):n.push(i),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return o}const He=()=>{};function be(e,t,n,r=He){e.push(t);const o=()=>{const i=e.indexOf(t);i>-1&&(e.splice(i,1),r())};return!n&&at()&&it(o),o}function x(e,...t){e.slice().forEach(n=>{n(...t)})}function Z(e,t){e instanceof Map&&t instanceof Map&&t.forEach((n,r)=>e.set(r,n)),e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const r=t[n],o=e[n];W(o)&&W(r)&&e.hasOwnProperty(n)&&!B(r)&&!we(r)?e[n]=Z(o,r):e[n]=r}return e}const Sr=Symbol();function Pr(e){return!W(e)||!e.hasOwnProperty(Sr)}const{assign:O}=Object;function wr(e){return!!(B(e)&&e.effect)}function Tr(e,t,n,r){const{state:o,actions:i,getters:s}=t,a=n.state.value[e];let c;function p(){a||(n.state.value[e]=o?o():{});const u=ft(n.state.value[e]);return O(u,i,Object.keys(s||{}).reduce((v,m)=>(v[m]=A(lt(()=>{H(n);const S=n._s.get(e);return s[m].call(S,S)})),v),{}))}return c=qe(e,p,t,n,r,!0),c}function qe(e,t,n={},r,o,i){let s;const a=O({actions:{}},n),c={deep:!0};let p,u,v=A([]),m=A([]),S;const T=r.state.value[e];!i&&!T&&(r.state.value[e]={}),re({});let ie;function se(d){let f;p=u=!1,typeof d=="function"?(d(r.state.value[e]),f={type:F.patchFunction,storeId:e,events:S}):(Z(r.state.value[e],d),f={type:F.patchObject,payload:d,storeId:e,events:S});const w=ie=Symbol();st().then(()=>{ie===w&&(p=!0)}),u=!0,x(v,f,r.state.value[e])}const ke=i?function(){const{state:f}=n,w=f?f():{};this.$patch(j=>{O(j,w)})}:He;function ze(){s.stop(),v=[],m=[],r._s.delete(e)}function Je(d,f){return function(){H(r);const w=Array.from(arguments),j=[],I=[];function Xe(_){j.push(_)}function Ye(_){I.push(_)}x(m,{args:w,name:d,store:P,after:Xe,onError:Ye});let V;try{V=f.apply(this&&this.$id===e?this:P,w)}catch(_){throw x(I,_),_}return V instanceof Promise?V.then(_=>(x(j,_),_)).catch(_=>(x(I,_),Promise.reject(_))):(x(j,V),V)}}const Ke={_p:r,$id:e,$onAction:be.bind(null,m),$patch:se,$reset:ke,$subscribe(d,f={}){const w=be(v,d,f.detached,()=>j()),j=s.run(()=>nt(()=>r.state.value[e],I=>{(f.flush==="sync"?u:p)&&d({storeId:e,type:F.direct,events:S},I)},O({},c,f)));return w},$dispose:ze},P=rt(Ke);r._s.set(e,P);const $=r._e.run(()=>(s=Pe(),s.run(()=>t())));for(const d in $){const f=$[d];if(B(f)&&!wr(f)||we(f))i||(T&&Pr(f)&&(B(f)?f.value=T[d]:Z(f,T[d])),r.state.value[e][d]=f);else if(typeof f=="function"){const w=Je(d,f);$[d]=w,a.actions[d]=f}}return O(P,$),O(ot(P),$),Object.defineProperty(P,"$state",{get:()=>r.state.value[e],set:d=>{se(f=>{O(f,d)})}}),r._p.forEach(d=>{O(P,s.run(()=>d({store:P,app:r._a,pinia:r,options:a})))}),T&&i&&n.hydrate&&n.hydrate(P.$state,T),p=!0,u=!0,P}function Or(e,t,n){let r,o;const i=typeof t=="function";typeof e=="string"?(r=e,o=i?n:t):(o=e,r=e.id);function s(a,c){const p=ct();return a=a||p&&ut(Ne,null),a&&H(a),a=Re,a._s.has(r)||(i?qe(r,t,o,a):Tr(r,o,a)),a._s.get(r)}return s.$id=r,s}function jr(e,t){const n=new XMLHttpRequest;n.open("GET",e),n.send(null),n.onreadystatechange=function(){n.readyState===4&&n.status===200&&t(n.responseText)}}const Cr={class:"ep-slider__wrapper"},xr={class:"ep-slider__label"},Ar=N({__name:"SliderField",props:{config:null},emits:["store-config"],setup(e,{emit:t}){const n=e;function r(o){n.config.handler&&typeof n.config.handler=="function"&&n.config.handler(o),t("store-config",{fields:[{key:n.config.key,value:n.config.value}]})}return(o,i)=>{const s=St;return b(),D("div",Cr,[pt("span",xr,dt(e.config.label),1),z(s,{min:e.config.min,max:e.config.max,onChange:r,step:e.config.step,marks:e.config.marks,modelValue:e.config.value,"onUpdate:modelValue":i[0]||(i[0]=a=>e.config.value=a),"show-input":e.config.showInput},null,8,["min","max","step","marks","modelValue","show-input"])])}}}),Er=N({__name:"SwitchField",props:{config:null},emits:["store-config"],setup(e,{emit:t}){const n=e;function r(o){n.config.handler&&typeof n.config.handler=="function"&&n.config.handler(o),t("store-config",{fields:[{key:n.config.key,value:n.config.value}]})}return(o,i)=>{const s=Te;return b(),C(s,{modelValue:e.config.value,"onUpdate:modelValue":i[0]||(i[0]=a=>e.config.value=a),"active-text":e.config.label,onChange:r},null,8,["modelValue","active-text"])}}}),me={SliderField:A(Ar),SwitchField:A(Er)},{VITE_POPUP_ID:$r,VITE_EMPTY_POPUP:Ir}={VITE_EMPTY_POPUP:"true",VITE_POPUP_ID:""},Ge=Or("popup-config",{state:()=>({empty:Ir==="true",description:{...Oe,configId:$r}}),actions:{saveDescription(e){const t=this.description.configId,n={[t]:{...this.description,...e,fields:[]}};(e.fields||[]).forEach(o=>{n[t][o.key]=o.value}),wt(JSON.parse(JSON.stringify(n))).then(()=>console.log("保存成功: ",n))},enableConfig(){this.empty=!1},mergeConfig(e){this.description.configId=e.id,_r(this.description,e.description),(this.description.fields||[]).forEach(t=>{this.description.hasOwnProperty(t.key)&&(t.value=this.description[t.key]),me.hasOwnProperty(t.type)&&(t.type=me[t.type])})}}}),Vr={class:"popup-page-wrapper"},Ur=N({__name:"PopupConfig",setup(e){const t=Ge();re({...Oe});function n(s="",a){Tt(s).then(c=>{t.mergeConfig({description:{...c[s],configId:s,configLabel:a}})})}function r(s){t.saveDescription({enable:s})}function o(s){t.saveDescription({injectCSS:s})}function i(s){t.saveDescription({injectScript:s})}return gt(()=>{n(t.description.configId,t.description.configLabel)}),(s,a)=>{const c=Te,p=Pt;return b(),D("div",Vr,[z(p,{class:"config-switch-card"},{default:J(()=>[z(c,{onChange:r,modelValue:g(t).description.enable,"onUpdate:modelValue":a[0]||(a[0]=u=>g(t).description.enable=u),"active-text":g(t).description.configLabel},null,8,["modelValue","active-text"]),g(t).description.enable?(b(),C(c,{key:0,"active-text":"注入预设样式",onChange:o,modelValue:g(t).description.injectCSS,"onUpdate:modelValue":a[1]||(a[1]=u=>g(t).description.injectCSS=u)},null,8,["modelValue"])):q("",!0),g(t).description.enable?(b(),C(c,{key:1,"active-text":"注入预设脚本",onChange:i,modelValue:g(t).description.injectScript,"onUpdate:modelValue":a[2]||(a[2]=u=>g(t).description.injectScript=u)},null,8,["modelValue"])):q("",!0)]),_:1}),g(t).description.enable&&g(t).description.fields.length?(b(),C(p,{key:0,class:"options-wrapper"},{default:J(()=>[(b(!0),D(ht,null,yt(g(t).description.fields,u=>(b(),C(vt(u.type),{config:u,key:u.key,onStoreConfig:g(t).saveDescription},null,40,["config","onStoreConfig"]))),128))]),_:1})):q("",!0)])}}}),Fr={key:0,class:"empty-content"},Mr=N({__name:"App",setup(e){const t=Ge();return chrome.tabs&&chrome.tabs.query(Ot).then(([n])=>{const r=jt.find(o=>o.expectUrl(n));r&&(t.enableConfig(),t.mergeConfig(r))}),_t(()=>{jr("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",n=>{const r=JSON.parse(n).images;document.body.style.backgroundImage=r.map(o=>`url('http://cn.bing.com${o.url}')`).join(",")})}),(n,r)=>{const o=bt;return b(),C(o,{namespace:"ep"},{default:J(()=>[g(t).empty?(b(),D("h3",Fr,"当前页面无可配置项")):(b(),C(Ur,{key:1}))]),_:1})}}});mt(Mr).use(mr()).mount("#app")});export default Lr();
