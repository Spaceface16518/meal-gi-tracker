(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Lp=!1,$p=(n,e)=>n===e,ti=Symbol("solid-proxy"),mh=typeof Proxy=="function",Fp=Symbol("solid-track"),ni={equals:$p};let gh=wh;const ln=1,ri=2,_h={owned:null,cleanups:null,context:null,owner:null};var Ie=null;let Ao=null,Up=null,me=null,$e=null,kt=null,ki=0;function zs(n,e){const t=me,r=Ie,s=n.length===0,i=e===void 0?r:e,a=s?_h:{owned:null,cleanups:null,context:i?i.context:null,owner:i},c=s?n:()=>n(()=>lt(()=>Gr(a)));Ie=a,me=null;try{return us(c,!0)}finally{me=t,Ie=r}}function Y(n,e){e=e?Object.assign({},ni,e):ni;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=s=>(typeof s=="function"&&(s=s(t.value)),Eh(t,s));return[vh.bind(t),r]}function ue(n,e,t){const r=ga(n,e,!1,ln);ls(r)}function yh(n,e,t){gh=zp;const r=ga(n,e,!1,ln);r.user=!0,kt?kt.push(r):ls(r)}function xt(n,e,t){t=t?Object.assign({},ni,t):ni;const r=ga(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,ls(r),vh.bind(r)}function lt(n){if(me===null)return n();const e=me;me=null;try{return n()}finally{me=e}}function Bp(n){yh(()=>lt(n))}function si(n){return Ie===null||(Ie.cleanups===null?Ie.cleanups=[n]:Ie.cleanups.push(n)),n}function vh(){if(this.sources&&this.state)if(this.state===ln)ls(this);else{const n=$e;$e=null,us(()=>oi(this),!1),$e=n}if(me){const n=this.observers;if(!n||n[n.length-1]!==me){const e=n?n.length:0;me.sources?(me.sources.push(this),me.sourceSlots.push(e)):(me.sources=[this],me.sourceSlots=[e]),n?(n.push(me),this.observerSlots.push(me.sources.length-1)):(this.observers=[me],this.observerSlots=[me.sources.length-1])}}return this.value}function Eh(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&us(()=>{for(let s=0;s<n.observers.length;s+=1){const i=n.observers[s],a=Ao&&Ao.running;a&&Ao.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?$e.push(i):kt.push(i),i.observers&&Th(i)),a||(i.state=ln)}if($e.length>1e6)throw $e=[],new Error},!1)),e}function ls(n){if(!n.fn)return;Gr(n);const e=ki;jp(n,n.value,e)}function jp(n,e,t){let r;const s=Ie,i=me;me=Ie=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=ln,n.owned&&n.owned.forEach(Gr),n.owned=null),n.updatedAt=t+1,Ih(a)}finally{me=i,Ie=s}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?Eh(n,r):n.value=r,n.updatedAt=t)}function ga(n,e,t,r=ln,s){const i={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:Ie,context:Ie?Ie.context:null,pure:t};return Ie===null||Ie!==_h&&(Ie.owned?Ie.owned.push(i):Ie.owned=[i]),i}function ii(n){if(n.state===0)return;if(n.state===ri)return oi(n);if(n.suspense&&lt(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<ki);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===ln)ls(n);else if(n.state===ri){const r=$e;$e=null,us(()=>oi(n,e[0]),!1),$e=r}}function us(n,e){if($e)return n();let t=!1;e||($e=[]),kt?t=!0:kt=[],ki++;try{const r=n();return qp(t),r}catch(r){t||(kt=null),$e=null,Ih(r)}}function qp(n){if($e&&(wh($e),$e=null),n)return;const e=kt;kt=null,e.length&&us(()=>gh(e),!1)}function wh(n){for(let e=0;e<n.length;e++)ii(n[e])}function zp(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:ii(r)}for(e=0;e<t;e++)ii(n[e])}function oi(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const s=r.state;s===ln?r!==e&&(!r.updatedAt||r.updatedAt<ki)&&ii(r):s===ri&&oi(r,e)}}}function Th(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=ri,t.pure?$e.push(t):kt.push(t),t.observers&&Th(t))}}function Gr(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),s=t.observers;if(s&&s.length){const i=s.pop(),a=t.observerSlots.pop();r<s.length&&(i.sourceSlots[a]=r,s[r]=i,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)Gr(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)Gr(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Hp(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function Ih(n,e=Ie){throw Hp(n)}const Gp=Symbol("fallback");function Tl(n){for(let e=0;e<n.length;e++)n[e]()}function Wp(n,e,t={}){let r=[],s=[],i=[],a=0,c=e.length>1?[]:null;return si(()=>Tl(i)),()=>{let u=n()||[],h=u.length,f,m;return u[Fp],lt(()=>{let A,R,x,N,D,F,M,W,q;if(h===0)a!==0&&(Tl(i),i=[],r=[],s=[],a=0,c&&(c=[])),t.fallback&&(r=[Gp],s[0]=zs(z=>(i[0]=z,t.fallback())),a=1);else if(a===0){for(s=new Array(h),m=0;m<h;m++)r[m]=u[m],s[m]=zs(I);a=h}else{for(x=new Array(h),N=new Array(h),c&&(D=new Array(h)),F=0,M=Math.min(a,h);F<M&&r[F]===u[F];F++);for(M=a-1,W=h-1;M>=F&&W>=F&&r[M]===u[W];M--,W--)x[W]=s[M],N[W]=i[M],c&&(D[W]=c[M]);for(A=new Map,R=new Array(W+1),m=W;m>=F;m--)q=u[m],f=A.get(q),R[m]=f===void 0?-1:f,A.set(q,m);for(f=F;f<=M;f++)q=r[f],m=A.get(q),m!==void 0&&m!==-1?(x[m]=s[f],N[m]=i[f],c&&(D[m]=c[f]),m=R[m],A.set(q,m)):i[f]();for(m=F;m<h;m++)m in x?(s[m]=x[m],i[m]=N[m],c&&(c[m]=D[m],c[m](m))):s[m]=zs(I);s=s.slice(0,a=h),r=u.slice(0)}return s});function I(A){if(i[m]=A,c){const[R,x]=Y(m);return c[m]=x,e(u[m],R)}return e(u[m])}}}function V(n,e){return lt(()=>n(e||{}))}function Ls(){return!0}const jo={get(n,e,t){return e===ti?t:n.get(e)},has(n,e){return e===ti?!0:n.has(e)},set:Ls,deleteProperty:Ls,getOwnPropertyDescriptor(n,e){return{configurable:!0,enumerable:!0,get(){return n.get(e)},set:Ls,deleteProperty:Ls}},ownKeys(n){return n.keys()}};function So(n){return(n=typeof n=="function"?n():n)?n:{}}function Kp(){for(let n=0,e=this.length;n<e;++n){const t=this[n]();if(t!==void 0)return t}}function Pe(...n){let e=!1;for(let a=0;a<n.length;a++){const c=n[a];e=e||!!c&&ti in c,n[a]=typeof c=="function"?(e=!0,xt(c)):c}if(mh&&e)return new Proxy({get(a){for(let c=n.length-1;c>=0;c--){const u=So(n[c])[a];if(u!==void 0)return u}},has(a){for(let c=n.length-1;c>=0;c--)if(a in So(n[c]))return!0;return!1},keys(){const a=[];for(let c=0;c<n.length;c++)a.push(...Object.keys(So(n[c])));return[...new Set(a)]}},jo);const t={},r=Object.create(null);for(let a=n.length-1;a>=0;a--){const c=n[a];if(!c)continue;const u=Object.getOwnPropertyNames(c);for(let h=u.length-1;h>=0;h--){const f=u[h];if(f==="__proto__"||f==="constructor")continue;const m=Object.getOwnPropertyDescriptor(c,f);if(!r[f])r[f]=m.get?{enumerable:!0,configurable:!0,get:Kp.bind(t[f]=[m.get.bind(c)])}:m.value!==void 0?m:void 0;else{const I=t[f];I&&(m.get?I.push(m.get.bind(c)):m.value!==void 0&&I.push(()=>m.value))}}}const s={},i=Object.keys(r);for(let a=i.length-1;a>=0;a--){const c=i[a],u=r[c];u&&u.get?Object.defineProperty(s,c,u):s[c]=u?u.value:void 0}return s}function bh(n,...e){const t=e.length;if(mh&&ti in n){const s=t>1?e.flat():e[0],i=e.map(a=>new Proxy({get(c){return a.includes(c)?n[c]:void 0},has(c){return a.includes(c)&&c in n},keys(){return a.filter(c=>c in n)}},jo));return i.push(new Proxy({get(a){return s.includes(a)?void 0:n[a]},has(a){return s.includes(a)?!1:a in n},keys(){return Object.keys(n).filter(a=>!s.includes(a))}},jo)),i}const r=[];for(let s=0;s<=t;s++)r[s]={};for(const s of Object.getOwnPropertyNames(n)){let i=t;for(let u=0;u<e.length;u++)if(e[u].includes(s)){i=u;break}const a=Object.getOwnPropertyDescriptor(n,s);!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable?r[i][s]=a.value:Object.defineProperty(r[i],s,a)}return r}const Qp=n=>`Stale read from <${n}>.`;function Jp(n){const e="fallback"in n&&{fallback:()=>n.fallback};return xt(Wp(()=>n.each,n.children,e||void 0))}function Ro(n){const e=n.keyed,t=xt(()=>n.when,void 0,void 0),r=e?t:xt(t,void 0,{equals:(s,i)=>!s==!i});return xt(()=>{const s=r();if(s){const i=n.children;return typeof i=="function"&&i.length>0?lt(()=>i(e?s:()=>{if(!lt(r))throw Qp("Show");return t()})):i}return n.fallback},void 0,void 0)}const Yp=["allowfullscreen","async","alpha","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","adauctionheaders","browsingtopics","credentialless","defaultchecked","defaultmuted","defaultselected","defer","disablepictureinpicture","disableremoteplayback","preservespitch","shadowrootclonable","shadowrootcustomelementregistry","shadowrootdelegatesfocus","shadowrootserializable","sharedstoragewritable"],Xp=new Set(["className","value","readOnly","noValidate","formNoValidate","isMap","noModule","playsInline","adAuctionHeaders","allowFullscreen","browsingTopics","defaultChecked","defaultMuted","defaultSelected","disablePictureInPicture","disableRemotePlayback","preservesPitch","shadowRootClonable","shadowRootCustomElementRegistry","shadowRootDelegatesFocus","shadowRootSerializable","sharedStorageWritable",...Yp]),Zp=new Set(["innerHTML","textContent","innerText","children"]),em=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),tm=Object.assign(Object.create(null),{class:"className",novalidate:{$:"noValidate",FORM:1},formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1},adauctionheaders:{$:"adAuctionHeaders",IFRAME:1},allowfullscreen:{$:"allowFullscreen",IFRAME:1},browsingtopics:{$:"browsingTopics",IMG:1},defaultchecked:{$:"defaultChecked",INPUT:1},defaultmuted:{$:"defaultMuted",AUDIO:1,VIDEO:1},defaultselected:{$:"defaultSelected",OPTION:1},disablepictureinpicture:{$:"disablePictureInPicture",VIDEO:1},disableremoteplayback:{$:"disableRemotePlayback",AUDIO:1,VIDEO:1},preservespitch:{$:"preservesPitch",AUDIO:1,VIDEO:1},shadowrootclonable:{$:"shadowRootClonable",TEMPLATE:1},shadowrootdelegatesfocus:{$:"shadowRootDelegatesFocus",TEMPLATE:1},shadowrootserializable:{$:"shadowRootSerializable",TEMPLATE:1},sharedstoragewritable:{$:"sharedStorageWritable",IFRAME:1,IMG:1}});function nm(n,e){const t=tm[n];return typeof t=="object"?t[e]?t.$:void 0:t}const rm=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),sm=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),im={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},Fe=n=>xt(()=>n());function om(n,e,t){let r=t.length,s=e.length,i=r,a=0,c=0,u=e[s-1].nextSibling,h=null;for(;a<s||c<i;){if(e[a]===t[c]){a++,c++;continue}for(;e[s-1]===t[i-1];)s--,i--;if(s===a){const f=i<r?c?t[c-1].nextSibling:t[i-c]:u;for(;c<i;)n.insertBefore(t[c++],f)}else if(i===c)for(;a<s;)(!h||!h.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[i-1]&&t[c]===e[s-1]){const f=e[--s].nextSibling;n.insertBefore(t[c++],e[a++].nextSibling),n.insertBefore(t[--i],f),e[s]=t[i]}else{if(!h){h=new Map;let m=c;for(;m<i;)h.set(t[m],m++)}const f=h.get(e[a]);if(f!=null)if(c<f&&f<i){let m=a,I=1,A;for(;++m<s&&m<i&&!((A=h.get(e[m]))==null||A!==f+I);)I++;if(I>f-c){const R=e[a];for(;c<f;)n.insertBefore(t[c++],R)}else n.replaceChild(t[c++],e[a++])}else a++;else e[a++].remove()}}}const Il="_$DX_DELEGATE";function am(n,e,t,r={}){let s;return zs(i=>{s=i,e===document?n():k(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{s(),e.textContent=""}}function j(n,e,t,r){let s;const i=()=>{const c=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return c.innerHTML=n,t?c.content.firstChild.firstChild:r?c.firstChild:c.content.firstChild},a=e?()=>lt(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return a.cloneNode=a,a}function un(n,e=window.document){const t=e[Il]||(e[Il]=new Set);for(let r=0,s=n.length;r<s;r++){const i=n[r];t.has(i)||(t.add(i),e.addEventListener(i,pm))}}function ne(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function cm(n,e,t,r){r==null?n.removeAttributeNS(e,t):n.setAttributeNS(e,t,r)}function lm(n,e,t){t?n.setAttribute(e,""):n.removeAttribute(e)}function _a(n,e){e==null?n.removeAttribute("class"):n.className=e}function ya(n,e,t,r){if(r)Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t;else if(Array.isArray(t)){const s=t[0];n.addEventListener(e,t[0]=i=>s.call(n,t[1],i))}else n.addEventListener(e,t,typeof t!="function"&&t)}function ar(n,e,t={}){const r=Object.keys(e||{}),s=Object.keys(t);let i,a;for(i=0,a=s.length;i<a;i++){const c=s[i];!c||c==="undefined"||e[c]||(bl(n,c,!1),delete t[c])}for(i=0,a=r.length;i<a;i++){const c=r[i],u=!!e[c];!c||c==="undefined"||t[c]===u||!u||(bl(n,c,!0),t[c]=u)}return t}function um(n,e,t){if(!e)return t?ne(n,"style"):e;const r=n.style;if(typeof e=="string")return r.cssText=e;typeof t=="string"&&(r.cssText=t=void 0),t||(t={}),e||(e={});let s,i;for(i in t)e[i]==null&&r.removeProperty(i),delete t[i];for(i in e)s=e[i],s!==t[i]&&(r.setProperty(i,s),t[i]=s);return t}function Ah(n,e={},t,r){const s={};return r||ue(()=>s.children=Wr(n,e.children,s.children)),ue(()=>typeof e.ref=="function"&&hm(e.ref,n)),ue(()=>dm(n,e,t,!0,s,!0)),s}function hm(n,e,t){return lt(()=>n(e,t))}function k(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return Wr(n,e,r,t);ue(s=>Wr(n,e(),s,t),r)}function dm(n,e,t,r,s={},i=!1){e||(e={});for(const a in s)if(!(a in e)){if(a==="children")continue;s[a]=Al(n,a,null,s[a],t,i,e)}for(const a in e){if(a==="children")continue;const c=e[a];s[a]=Al(n,a,c,s[a],t,i,e)}}function fm(n){return n.toLowerCase().replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}function bl(n,e,t){const r=e.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)n.classList.toggle(r[s],t)}function Al(n,e,t,r,s,i,a){let c,u,h,f,m;if(e==="style")return um(n,t,r);if(e==="classList")return ar(n,t,r);if(t===r)return r;if(e==="ref")i||t(n);else if(e.slice(0,3)==="on:"){const I=e.slice(3);r&&n.removeEventListener(I,r,typeof r!="function"&&r),t&&n.addEventListener(I,t,typeof t!="function"&&t)}else if(e.slice(0,10)==="oncapture:"){const I=e.slice(10);r&&n.removeEventListener(I,r,!0),t&&n.addEventListener(I,t,!0)}else if(e.slice(0,2)==="on"){const I=e.slice(2).toLowerCase(),A=rm.has(I);if(!A&&r){const R=Array.isArray(r)?r[0]:r;n.removeEventListener(I,R)}(A||t)&&(ya(n,I,t,A),A&&un([I]))}else if(e.slice(0,5)==="attr:")ne(n,e.slice(5),t);else if(e.slice(0,5)==="bool:")lm(n,e.slice(5),t);else if((m=e.slice(0,5)==="prop:")||(h=Zp.has(e))||!s&&((f=nm(e,n.tagName))||(u=Xp.has(e)))||(c=n.nodeName.includes("-")||"is"in a))m&&(e=e.slice(5),u=!0),e==="class"||e==="className"?_a(n,t):c&&!u&&!h?n[fm(e)]=t:n[f||e]=t;else{const I=s&&e.indexOf(":")>-1&&im[e.split(":")[0]];I?cm(n,I,e,t):ne(n,em[e]||e,t)}return t}function pm(n){let e=n.target;const t=`$$${n.type}`,r=n.target,s=n.currentTarget,i=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const h=e[`${t}Data`];if(h!==void 0?u.call(e,h,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&i(e.host),!0},c=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();i(u[0]);for(let h=0;h<u.length-2&&(e=u[h],!!a());h++){if(e._$host){e=e._$host,c();break}if(e.parentNode===s)break}}else c();i(r)}function Wr(n,e,t,r,s){for(;typeof t=="function";)t=t();if(e===t)return t;const i=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,i==="string"||i==="number"){if(i==="number"&&(e=e.toString(),e===t))return t;if(a){let c=t[0];c&&c.nodeType===3?c.data!==e&&(c.data=e):c=document.createTextNode(e),t=qn(n,t,r,c)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||i==="boolean")t=qn(n,t,r);else{if(i==="function")return ue(()=>{let c=e();for(;typeof c=="function";)c=c();t=Wr(n,c,t,r)}),()=>t;if(Array.isArray(e)){const c=[],u=t&&Array.isArray(t);if(qo(c,e,t,s))return ue(()=>t=Wr(n,c,t,r,!0)),()=>t;if(c.length===0){if(t=qn(n,t,r),a)return t}else u?t.length===0?Sl(n,c,r):om(n,t,c):(t&&qn(n),Sl(n,c));t=c}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=qn(n,t,r,e);qn(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function qo(n,e,t,r){let s=!1;for(let i=0,a=e.length;i<a;i++){let c=e[i],u=t&&t[n.length],h;if(!(c==null||c===!0||c===!1))if((h=typeof c)=="object"&&c.nodeType)n.push(c);else if(Array.isArray(c))s=qo(n,c,u)||s;else if(h==="function")if(r){for(;typeof c=="function";)c=c();s=qo(n,Array.isArray(c)?c:[c],Array.isArray(u)?u:[u])||s}else n.push(c),s=!0;else{const f=String(c);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return s}function Sl(n,e,t=null){for(let r=0,s=e.length;r<s;r++)n.insertBefore(e[r],t)}function qn(n,e,t,r){if(t===void 0)return n.textContent="";const s=r||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const c=e[a];if(s!==c){const u=c.parentNode===n;!i&&!a?u?n.replaceChild(s,c):n.insertBefore(s,t):u&&c.remove()}else i=!0}}else n.insertBefore(s,t);return[s]}const mm="http://www.w3.org/2000/svg";function gm(n,e=!1,t=void 0){return e?document.createElementNS(mm,n):document.createElement(n,{is:t})}function _m(n,e){const t=xt(n);return xt(()=>{const r=t();switch(typeof r){case"function":return lt(()=>r(e));case"string":const s=sm.has(r),i=gm(r,s,lt(()=>e.is));return Ah(i,e,s),i}})}function ym(n){const[,e]=bh(n,["component"]);return _m(()=>n.component,e)}/**
* @license lucide-solid v0.475.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var vm={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},zn=vm,Em=j("<svg>"),wm=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Tm=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim(),Im=n=>{const[e,t]=bh(n,["color","size","strokeWidth","children","class","name","iconNode","absoluteStrokeWidth"]);return(()=>{var r=Em();return Ah(r,Pe(zn,{get width(){return e.size??zn.width},get height(){return e.size??zn.height},get stroke(){return e.color??zn.stroke},get"stroke-width"(){return Fe(()=>!!e.absoluteStrokeWidth)()?Number(e.strokeWidth??zn["stroke-width"])*24/Number(e.size):Number(e.strokeWidth??zn["stroke-width"])},get class(){return Tm("lucide","lucide-icon",e.name!=null?`lucide-${wm(e?.name)}`:void 0,e.class!=null?e.class:"")}},t),!0,!0),k(r,V(Jp,{get each(){return e.iconNode},children:([s,i])=>V(ym,Pe({component:s},i))})),r})()},Be=Im,bm=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Am=n=>V(Be,Pe(n,{name:"Activity",iconNode:bm})),Sh=Am,Sm=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],Rm=n=>V(Be,Pe(n,{name:"CalendarClock",iconNode:Sm})),Rl=Rm,Cm=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Pm=n=>V(Be,Pe(n,{name:"Camera",iconNode:Cm})),Cl=Pm,km=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],xm=n=>V(Be,Pe(n,{name:"ChartColumn",iconNode:km})),va=xm,Nm=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Dm=n=>V(Be,Pe(n,{name:"Check",iconNode:Nm})),Rh=Dm,Vm=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Om=n=>V(Be,Pe(n,{name:"ChevronRight",iconNode:Vm})),Pl=Om,Mm=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Lm=n=>V(Be,Pe(n,{name:"CircleAlert",iconNode:Mm})),Ch=Lm,$m=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],Fm=n=>V(Be,Pe(n,{name:"FileJson",iconNode:$m})),zo=Fm,Um=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Bm=n=>V(Be,Pe(n,{name:"FileText",iconNode:Um})),jm=Bm,qm=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],zm=n=>V(Be,Pe(n,{name:"LogOut",iconNode:qm})),Hm=zm,Gm=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Wm=n=>V(Be,Pe(n,{name:"Mail",iconNode:Gm})),Km=Wm,Qm=[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]],Jm=n=>V(Be,Pe(n,{name:"Mic",iconNode:Qm})),kl=Jm,Ym=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Xm=n=>V(Be,Pe(n,{name:"Plus",iconNode:Ym})),Zm=Xm,eg=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],tg=n=>V(Be,Pe(n,{name:"RefreshCcw",iconNode:eg})),xi=tg,ng=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],rg=n=>V(Be,Pe(n,{name:"Trash2",iconNode:ng})),xl=rg,sg=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],ig=n=>V(Be,Pe(n,{name:"Utensils",iconNode:sg})),Kr=ig;const og=()=>{};var Nl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ag=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},kh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let I=(c&15)<<2|h>>6,A=h&63;u||(A=64,a||(I=64)),r.push(t[f],t[m],t[I],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ph(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ag(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new cg;const I=i<<2|c>>4;if(r.push(I),h!==64){const A=c<<4&240|h>>2;if(r.push(A),m!==64){const R=h<<6&192|m;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class cg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lg=function(n){const e=Ph(n);return kh.encodeByteArray(e,!0)},xh=function(n){return lg(n).replace(/\./g,"")},Nh=function(n){try{return kh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ug(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=()=>ug().__FIREBASE_DEFAULTS__,dg=()=>{if(typeof process>"u"||typeof Nl>"u")return;const n=Nl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Nh(n[1]);return e&&JSON.parse(e)},Ni=()=>{try{return og()||hg()||dg()||fg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dh=n=>Ni()?.emulatorHosts?.[n],pg=n=>{const e=Dh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Vh=()=>Ni()?.config,Oh=n=>Ni()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ue())}function _g(){const n=Ni()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function yg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Eg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wg(){const n=Ue();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Tg(){return!_g()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ig(){try{return typeof indexedDB=="object"}catch{return!1}}function bg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag="FirebaseError";class ht extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ag,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hs.prototype.create)}}class hs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Sg(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new ht(s,c,r)}}function Sg(n,e){return n.replace(Rg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Rg=/\{\$([^}]+)}/g;function Cg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Rn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Dl(i)&&Dl(a)){if(!Rn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Dl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Vr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Or(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Pg(n,e){const t=new kg(n,e);return t.subscribe.bind(t)}class kg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");xg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Co),s.error===void 0&&(s.error=Co),s.complete===void 0&&(s.complete=Co);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Co(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ea(n){return(await fetch(n,{credentials:"include"})).ok}class en{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new mg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Vg(e))try{this.getOrInitializeService({instanceIdentifier:En})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=En){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=En){return this.instances.has(e)}getOptions(e=En){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Dg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=En){return this.component?this.component.multipleInstances?e:En:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dg(n){return n===En?void 0:n}function Vg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ng(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ee||(ee={}));const Mg={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},Lg=ee.INFO,$g={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},Fg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=$g[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wa{constructor(e){this.name=e,this._logLevel=Lg,this._logHandler=Fg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const Ug=(n,e)=>e.some(t=>n instanceof t);let Vl,Ol;function Bg(){return Vl||(Vl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jg(){return Ol||(Ol=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mh=new WeakMap,Ho=new WeakMap,Lh=new WeakMap,Po=new WeakMap,Ta=new WeakMap;function qg(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Jt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Mh.set(t,n)}).catch(()=>{}),Ta.set(e,n),e}function zg(n){if(Ho.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ho.set(n,e)}let Go={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ho.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Lh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Jt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Hg(n){Go=n(Go)}function Gg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ko(this),e,...t);return Lh.set(r,e.sort?e.sort():[e]),Jt(r)}:jg().includes(n)?function(...e){return n.apply(ko(this),e),Jt(Mh.get(this))}:function(...e){return Jt(n.apply(ko(this),e))}}function Wg(n){return typeof n=="function"?Gg(n):(n instanceof IDBTransaction&&zg(n),Ug(n,Bg())?new Proxy(n,Go):n)}function Jt(n){if(n instanceof IDBRequest)return qg(n);if(Po.has(n))return Po.get(n);const e=Wg(n);return e!==n&&(Po.set(n,e),Ta.set(e,n)),e}const ko=n=>Ta.get(n);function Kg(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Jt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Jt(a.result),u.oldVersion,u.newVersion,Jt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Qg=["get","getKey","getAll","getAllKeys","count"],Jg=["put","add","delete","clear"],xo=new Map;function Ml(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xo.get(e))return xo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Jg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Qg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return xo.set(e,i),i}Hg(n=>({...n,get:(e,t,r)=>Ml(e,t)||n.get(e,t,r),has:(e,t)=>!!Ml(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Xg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Xg(n){return n.getComponent()?.type==="VERSION"}const Wo="@firebase/app",Ll="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new wa("@firebase/app"),Zg="@firebase/app-compat",e_="@firebase/analytics-compat",t_="@firebase/analytics",n_="@firebase/app-check-compat",r_="@firebase/app-check",s_="@firebase/auth",i_="@firebase/auth-compat",o_="@firebase/database",a_="@firebase/data-connect",c_="@firebase/database-compat",l_="@firebase/functions",u_="@firebase/functions-compat",h_="@firebase/installations",d_="@firebase/installations-compat",f_="@firebase/messaging",p_="@firebase/messaging-compat",m_="@firebase/performance",g_="@firebase/performance-compat",__="@firebase/remote-config",y_="@firebase/remote-config-compat",v_="@firebase/storage",E_="@firebase/storage-compat",w_="@firebase/firestore",T_="@firebase/ai",I_="@firebase/firestore-compat",b_="firebase",A_="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko="[DEFAULT]",S_={[Wo]:"fire-core",[Zg]:"fire-core-compat",[t_]:"fire-analytics",[e_]:"fire-analytics-compat",[r_]:"fire-app-check",[n_]:"fire-app-check-compat",[s_]:"fire-auth",[i_]:"fire-auth-compat",[o_]:"fire-rtdb",[a_]:"fire-data-connect",[c_]:"fire-rtdb-compat",[l_]:"fire-fn",[u_]:"fire-fn-compat",[h_]:"fire-iid",[d_]:"fire-iid-compat",[f_]:"fire-fcm",[p_]:"fire-fcm-compat",[m_]:"fire-perf",[g_]:"fire-perf-compat",[__]:"fire-rc",[y_]:"fire-rc-compat",[v_]:"fire-gcs",[E_]:"fire-gcs-compat",[w_]:"fire-fst",[I_]:"fire-fst-compat",[T_]:"fire-vertex","fire-js":"fire-js",[b_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=new Map,R_=new Map,Qo=new Map;function $l(n,e){try{n.container.addComponent(e)}catch(t){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Cn(n){const e=n.name;if(Qo.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;Qo.set(e,n);for(const t of Qr.values())$l(t,n);for(const t of R_.values())$l(t,n);return!0}function Di(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Yt=new hs("app","Firebase",C_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new en("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Yt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=A_;function $h(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Ko,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Yt.create("bad-app-name",{appName:String(s)});if(t||(t=Vh()),!t)throw Yt.create("no-options");const i=Qr.get(s);if(i){if(Rn(t,i.options)&&Rn(r,i.config))return i;throw Yt.create("duplicate-app",{appName:s})}const a=new Og(s);for(const u of Qo.values())a.addComponent(u);const c=new P_(t,r,a);return Qr.set(s,c),c}function Ia(n=Ko){const e=Qr.get(n);if(!e&&n===Ko&&Vh())return $h();if(!e)throw Yt.create("no-app",{appName:n});return e}function k_(){return Array.from(Qr.values())}function gt(n,e,t){let r=S_[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(a.join(" "));return}Cn(new en(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_="firebase-heartbeat-database",N_=1,Jr="firebase-heartbeat-store";let No=null;function Fh(){return No||(No=Kg(x_,N_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Jr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Yt.create("idb-open",{originalErrorMessage:n.message})})),No}async function D_(n){try{const t=(await Fh()).transaction(Jr),r=await t.objectStore(Jr).get(Uh(n));return await t.done,r}catch(e){if(e instanceof ht)Vt.warn(e.message);else{const t=Yt.create("idb-get",{originalErrorMessage:e?.message});Vt.warn(t.message)}}}async function Fl(n,e){try{const r=(await Fh()).transaction(Jr,"readwrite");await r.objectStore(Jr).put(e,Uh(n)),await r.done}catch(t){if(t instanceof ht)Vt.warn(t.message);else{const r=Yt.create("idb-set",{originalErrorMessage:t?.message});Vt.warn(r.message)}}}function Uh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_=1024,O_=30;class M_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ul();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>O_){const s=F_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Vt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ul(),{heartbeatsToSend:t,unsentEntries:r}=L_(this._heartbeatsCache.heartbeats),s=xh(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Vt.warn(e),""}}}function Ul(){return new Date().toISOString().substring(0,10)}function L_(n,e=V_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Bl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Bl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class $_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ig()?bg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await D_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Bl(n){return xh(JSON.stringify({version:2,heartbeats:n})).length}function F_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(n){Cn(new en("platform-logger",e=>new Yg(e),"PRIVATE")),Cn(new en("heartbeat",e=>new M_(e),"PRIVATE")),gt(Wo,Ll,n),gt(Wo,Ll,"esm2020"),gt("fire-js","")}U_("");function Bh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const B_=Bh,jh=new hs("auth","Firebase",Bh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=new wa("@firebase/auth");function j_(n,...e){ai.logLevel<=ee.WARN&&ai.warn(`Auth (${cr}): ${n}`,...e)}function Hs(n,...e){ai.logLevel<=ee.ERROR&&ai.error(`Auth (${cr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,...e){throw Aa(n,...e)}function at(n,...e){return Aa(n,...e)}function ba(n,e,t){const r={...B_(),[e]:t};return new hs("auth","Firebase",r).create(e,{appName:n.name})}function Nt(n){return ba(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function q_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&rt(n,"argument-error"),ba(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Aa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return jh.create(n,...e)}function H(n,e,...t){if(!n)throw Aa(e,...t)}function Rt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Hs(e),new Error(e)}function Ot(n,e){n||Rt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(){return typeof self<"u"&&self.location?.href||""}function z_(){return jl()==="http:"||jl()==="https:"}function jl(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(z_()||vg()||"connection"in navigator)?navigator.onLine:!0}function G_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ot(t>e,"Short delay should be less than long delay!"),this.isMobile=gg()||Eg()}get(){return H_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n,e){Ot(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Q_=new fs(3e4,6e4);function hn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function dn(n,e,t,r,s={}){return zh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ds({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return yg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Dn(n.emulatorConfig.host)&&(h.credentials="include"),qh.fetch()(await Hh(n,n.config.apiHost,t,c),h)})}async function zh(n,e,t){n._canInitEmulator=!1;const r={...W_,...e};try{const s=new Y_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw $s(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw $s(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw $s(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw $s(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ba(n,f,h);rt(n,f)}}catch(s){if(s instanceof ht)throw s;rt(n,"network-request-failed",{message:String(s)})}}async function ps(n,e,t,r,s={}){const i=await dn(n,e,t,r,s);return"mfaPendingCredential"in i&&rt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Hh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Sa(n.config,s):`${n.config.apiScheme}://${s}`;return K_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function J_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Y_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(at(this.auth,"network-request-failed")),Q_.get())})}}function $s(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=at(n,e,r);return s.customData._tokenResponse=t,s}function ql(n){return n!==void 0&&n.enterprise!==void 0}class X_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return J_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Z_(n,e){return dn(n,"GET","/v2/recaptchaConfig",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ey(n,e){return dn(n,"POST","/v1/accounts:delete",e)}async function ci(n,e){return dn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ty(n,e=!1){const t=Ae(n),r=await t.getIdToken(e),s=Ra(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Br(Do(s.auth_time)),issuedAtTime:Br(Do(s.iat)),expirationTime:Br(Do(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Do(n){return Number(n)*1e3}function Ra(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Hs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Nh(t);return s?JSON.parse(s):(Hs("Failed to decode base64 JWT payload"),null)}catch(s){return Hs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function zl(n){const e=Ra(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ht&&ny(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ny({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Br(this.lastLoginAt),this.creationTime=Br(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function li(n){const e=n.auth,t=await n.getIdToken(),r=await Yr(n,ci(e,{idToken:t}));H(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Gh(s.providerUserInfo):[],a=iy(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function sy(n){const e=Ae(n);await li(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iy(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Gh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oy(n,e){const t=await zh(n,{},async()=>{const r=ds({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Hh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Dn(n.emulatorConfig.host)&&(u.credentials="include"),qh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ay(n,e){return dn(n,"POST","/v2/accounts:revokeToken",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=zl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await oy(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Qn;return r&&(H(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qn,this.toJSON())}_performRefresh(){return Rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class it{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ry(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Yo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Yr(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ty(this,e)}reload(){return sy(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new it({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await li(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(Nt(this.auth));const e=await this.getIdToken();return await Yr(this,ey(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:I,isAnonymous:A,providerData:R,stsTokenManager:x}=t;H(m&&x,e,"internal-error");const N=Qn.fromJSON(this.name,x);H(typeof m=="string",e,"internal-error"),Gt(r,e.name),Gt(s,e.name),H(typeof I=="boolean",e,"internal-error"),H(typeof A=="boolean",e,"internal-error"),Gt(i,e.name),Gt(a,e.name),Gt(c,e.name),Gt(u,e.name),Gt(h,e.name),Gt(f,e.name);const D=new it({uid:m,auth:e,email:s,emailVerified:I,displayName:r,isAnonymous:A,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:N,createdAt:h,lastLoginAt:f});return R&&Array.isArray(R)&&(D.providerData=R.map(F=>({...F}))),u&&(D._redirectEventId=u),D}static async _fromIdTokenResponse(e,t,r=!1){const s=new Qn;s.updateFromServerResponse(t);const i=new it({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await li(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Gh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Qn;c.updateFromIdToken(r);const u=new it({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=new Map;function Ct(n){Ot(n instanceof Function,"Expected a class definition");let e=Hl.get(n);return e?(Ot(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Hl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Wh.type="NONE";const Gl=Wh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(n,e,t){return`firebase:${n}:${e}:${t}`}class Jn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Gs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Gs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ci(this.auth,{idToken:e}).catch(()=>{});return t?it._fromGetAccountInfoResponse(this.auth,t,e):null}return it._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Jn(Ct(Gl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Ct(Gl);const a=Gs(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const I=await ci(e,{idToken:f}).catch(()=>{});if(!I)break;m=await it._fromGetAccountInfoResponse(e,I,f)}else m=it._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Jn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Jn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zh(e))return"Blackberry";if(ed(e))return"Webos";if(Qh(e))return"Safari";if((e.includes("chrome/")||Jh(e))&&!e.includes("edge/"))return"Chrome";if(Xh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Kh(n=Ue()){return/firefox\//i.test(n)}function Qh(n=Ue()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jh(n=Ue()){return/crios\//i.test(n)}function Yh(n=Ue()){return/iemobile/i.test(n)}function Xh(n=Ue()){return/android/i.test(n)}function Zh(n=Ue()){return/blackberry/i.test(n)}function ed(n=Ue()){return/webos/i.test(n)}function Ca(n=Ue()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function cy(n=Ue()){return Ca(n)&&!!window.navigator?.standalone}function ly(){return wg()&&document.documentMode===10}function td(n=Ue()){return Ca(n)||Xh(n)||ed(n)||Zh(n)||/windows phone/i.test(n)||Yh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nd(n,e=[]){let t;switch(n){case"Browser":t=Wl(Ue());break;case"Worker":t=`${Wl(Ue())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${cr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hy(n,e={}){return dn(n,"GET","/v2/passwordPolicy",hn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy=6;class fy{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??dy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kl(this),this.idTokenSubscription=new Kl(this),this.beforeStateQueue=new uy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ct(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Jn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ci(this,{idToken:e}),r=await it._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Qe(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await li(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=G_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(Nt(this));const t=e?Ae(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(Nt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(Nt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hy(this),t=new fy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new hs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ay(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ct(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await Jn.create(this,[Ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&j_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fn(n){return Ae(n)}class Kl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Pg(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function my(n){Vi=n}function rd(n){return Vi.loadJS(n)}function gy(){return Vi.recaptchaEnterpriseScript}function _y(){return Vi.gapiScript}function yy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class vy{constructor(){this.enterprise=new Ey}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ey{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const wy="recaptcha-enterprise",sd="NO_RECAPTCHA";class Ty{constructor(e){this.type=wy,this.auth=fn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{Z_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new X_(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;ql(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(sd)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new vy().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&ql(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=gy();u.length!==0&&(u+=c),rd(u).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function Ql(n,e,t,r=!1,s=!1){const i=new Ty(n);let a;if(s)a=sd;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Xo(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ql(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Ql(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(n,e){const t=Di(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Rn(i,e??{}))return s;rt(s,"already-initialized")}return t.initialize({options:e})}function by(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Ct);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ay(n,e,t){const r=fn(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=id(e),{host:a,port:c}=Sy(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Rn(h,r.config.emulator)&&Rn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Dn(a)?Ea(`${i}//${a}${u}`):Ry()}function id(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Sy(n){const e=id(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Jl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Jl(a)}}}function Jl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ry(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Rt("not implemented")}_getIdTokenResponse(e){return Rt("not implemented")}_linkToIdToken(e,t){return Rt("not implemented")}_getReauthenticationResolver(e){return Rt("not implemented")}}async function Cy(n,e){return dn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Py(n,e){return ps(n,"POST","/v1/accounts:signInWithPassword",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(n,e){return ps(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}async function xy(n,e){return ps(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Pa{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Xr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Xr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xo(e,t,"signInWithPassword",Py);case"emailLink":return ky(e,{email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xo(e,r,"signUpPassword",Cy);case"emailLink":return xy(e,{idToken:t,email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yn(n,e){return ps(n,"POST","/v1/accounts:signInWithIdp",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny="http://localhost";class Pn extends Pa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Pn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Pn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Yn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yn(e,t)}buildRequest(){const e={requestUri:Ny,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ds(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dy(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vy(n){const e=Vr(Or(n)).link,t=e?Vr(Or(e)).deep_link_id:null,r=Vr(Or(n)).deep_link_id;return(r?Vr(Or(r)).link:null)||r||t||e||n}class ka{constructor(e){const t=Vr(Or(e)),r=t.apiKey??null,s=t.oobCode??null,i=Dy(t.mode??null);H(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Vy(e);try{return new ka(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(){this.providerId=lr.PROVIDER_ID}static credential(e,t){return Xr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ka.parseLink(t);return H(r,"argument-error"),Xr._fromEmailAndCode(e,r.code,r.tenantId)}}lr.PROVIDER_ID="password";lr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";lr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms extends xa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends ms{constructor(){super("facebook.com")}static credential(e){return Pn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends ms{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Pn._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return St.credential(t,r)}catch{return null}}}St.GOOGLE_SIGN_IN_METHOD="google.com";St.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends ms{constructor(){super("github.com")}static credential(e){return Pn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.GITHUB_SIGN_IN_METHOD="github.com";Kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends ms{constructor(){super("twitter.com")}static credential(e,t){return Pn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Qt.credential(t,r)}catch{return null}}}Qt.TWITTER_SIGN_IN_METHOD="twitter.com";Qt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oy(n,e){return ps(n,"POST","/v1/accounts:signUp",hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await it._fromIdTokenResponse(e,r,s),a=Yl(r);return new kn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Yl(r);return new kn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Yl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends ht{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ui.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ui(e,t,r,s)}}function od(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ui._fromErrorAndOperation(n,i,e,r):i})}async function My(n,e,t=!1){const r=await Yr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return kn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ly(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(Nt(r));const s="reauthenticate";try{const i=await Yr(n,od(r,s,e,n),t);H(i.idToken,r,"internal-error");const a=Ra(i.idToken);H(a,r,"internal-error");const{sub:c}=a;return H(n.uid===c,r,"user-mismatch"),kn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&rt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ad(n,e,t=!1){if(Qe(n.app))return Promise.reject(Nt(n));const r="signIn",s=await od(n,r,e),i=await kn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function $y(n,e){return ad(fn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cd(n){const e=fn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Fy(n,e,t){if(Qe(n.app))return Promise.reject(Nt(n));const r=fn(n),a=await Xo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Oy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&cd(n),u}),c=await kn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function Uy(n,e,t){return Qe(n.app)?Promise.reject(Nt(n)):$y(Ae(n),lr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&cd(n),r})}function By(n,e,t,r){return Ae(n).onIdTokenChanged(e,t,r)}function jy(n,e,t){return Ae(n).beforeAuthStateChanged(e,t)}function qy(n,e,t,r){return Ae(n).onAuthStateChanged(e,t,r)}function zy(n){return Ae(n).signOut()}const hi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(hi,"1"),this.storage.removeItem(hi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy=1e3,Gy=10;class ud extends ld{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=td(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);ly()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Gy):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Hy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ud.type="LOCAL";const Wy=ud;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd extends ld{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}hd.type="SESSION";const dd=hd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ky(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Oi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),u=await Ky(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=Na("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const I=m;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(I.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(){return window}function Jy(n){_t().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(){return typeof _t().WorkerGlobalScope<"u"&&typeof _t().importScripts=="function"}async function Yy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xy(){return navigator?.serviceWorker?.controller||null}function Zy(){return fd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd="firebaseLocalStorageDb",ev=1,di="firebaseLocalStorage",md="fbase_key";class gs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Mi(n,e){return n.transaction([di],e?"readwrite":"readonly").objectStore(di)}function tv(){const n=indexedDB.deleteDatabase(pd);return new gs(n).toPromise()}function gd(){const n=indexedDB.open(pd,ev);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(di,{keyPath:md})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(di)?e(r):(r.close(),await tv(),e(await gd()))})})}async function Xl(n,e,t){const r=Mi(n,!0).put({[md]:e,value:t});return new gs(r).toPromise()}async function nv(n,e){const t=Mi(n,!1).get(e),r=await new gs(t).toPromise();return r===void 0?null:r.value}function Zl(n,e){const t=Mi(n,!0).delete(e);return new gs(t).toPromise()}const rv=800,sv=3;class _d{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=gd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>sv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return fd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oi._getInstance(Zy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Yy(),!this.activeServiceWorker)return;this.sender=new Qy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Xl(e,hi,"1"),await Zl(e,hi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Xl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>nv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Zl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Mi(s,!1).getAll();return new gs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}_d.type="LOCAL";const iv=_d;new fs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(n,e){return e?Ct(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da extends Pa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ov(n){return ad(n.auth,new Da(n),n.bypassAuthState)}function av(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),Ly(t,new Da(n),n.bypassAuthState)}async function cv(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),My(t,new Da(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ov;case"linkViaPopup":case"linkViaRedirect":return cv;case"reauthViaPopup":case"reauthViaRedirect":return av;default:rt(this.auth,"internal-error")}}resolve(e){Ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lv=new fs(2e3,1e4);async function uv(n,e,t){if(Qe(n.app))return Promise.reject(at(n,"operation-not-supported-in-this-environment"));const r=fn(n);q_(n,e,xa);const s=yd(r,t);return new wn(r,"signInViaPopup",e,s).executeNotNull()}class wn extends vd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,wn.currentPopupAction&&wn.currentPopupAction.cancel(),wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Ot(this.filter.length===1,"Popup operations only handle one event");const e=Na();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lv.get())};e()}}wn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv="pendingRedirect",Ws=new Map;class dv extends vd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ws.get(this.auth._key());if(!e){try{const r=await fv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ws.set(this.auth._key(),e)}return this.bypassAuthState||Ws.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fv(n,e){const t=gv(e),r=mv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function pv(n,e){Ws.set(n._key(),e)}function mv(n){return Ct(n._redirectPersistence)}function gv(n){return Gs(hv,n.config.apiKey,n.name)}async function _v(n,e,t=!1){if(Qe(n.app))return Promise.reject(Nt(n));const r=fn(n),s=yd(r,e),a=await new dv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=600*1e3;class vv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ev(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ed(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(at(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yv&&this.cachedEventUids.clear(),this.cachedEventUids.has(eu(e))}saveEventToCache(e){this.cachedEventUids.add(eu(e)),this.lastProcessedEventTime=Date.now()}}function eu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ed({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Ev(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ed(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wv(n,e={}){return dn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Iv=/^https?/;async function bv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await wv(n);for(const t of e)try{if(Av(t))return}catch{}rt(n,"unauthorized-domain")}function Av(n){const e=Jo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Iv.test(t))return!1;if(Tv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv=new fs(3e4,6e4);function tu(){const n=_t().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Rv(n){return new Promise((e,t)=>{function r(){tu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{tu(),t(at(n,"network-request-failed"))},timeout:Sv.get()})}if(_t().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(_t().gapi?.load)r();else{const s=yy("iframefcb");return _t()[s]=()=>{gapi.load?r():t(at(n,"network-request-failed"))},rd(`${_y()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Ks=null,e})}let Ks=null;function Cv(n){return Ks=Ks||Rv(n),Ks}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pv=new fs(5e3,15e3),kv="__/auth/iframe",xv="emulator/auth/iframe",Nv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Dv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Vv(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Sa(e,xv):`https://${n.config.authDomain}/${kv}`,r={apiKey:e.apiKey,appName:n.name,v:cr},s=Dv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ds(r).slice(1)}`}async function Ov(n){const e=await Cv(n),t=_t().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:Vv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Nv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=at(n,"network-request-failed"),c=_t().setTimeout(()=>{i(a)},Pv.get());function u(){_t().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Lv=500,$v=600,Fv="_blank",Uv="http://localhost";class nu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bv(n,e,t,r=Lv,s=$v){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Mv,width:r.toString(),height:s.toString(),top:i,left:a},h=Ue().toLowerCase();t&&(c=Jh(h)?Fv:t),Kh(h)&&(e=e||Uv,u.scrollbars="yes");const f=Object.entries(u).reduce((I,[A,R])=>`${I}${A}=${R},`,"");if(cy(h)&&c!=="_self")return jv(e||"",c),new nu(null);const m=window.open(e||"",c,f);H(m,n,"popup-blocked");try{m.focus()}catch{}return new nu(m)}function jv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv="__/auth/handler",zv="emulator/auth/handler",Hv=encodeURIComponent("fac");async function ru(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:cr,eventId:s};if(e instanceof xa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Cg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof ms){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Hv}=${encodeURIComponent(u)}`:"";return`${Gv(n)}?${ds(c).slice(1)}${h}`}function Gv({config:n}){return n.emulator?Sa(n,zv):`https://${n.authDomain}/${qv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="webStorageSupport";class Wv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=dd,this._completeRedirectFn=_v,this._overrideRedirectResult=pv}async _openPopup(e,t,r,s){Ot(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ru(e,t,r,Jo(),s);return Bv(e,i,Na())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await ru(e,t,r,Jo(),s);return Jy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Ot(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ov(e),r=new vv(e);return t.register("authEvent",s=>(H(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vo,{type:Vo},s=>{const i=s?.[0]?.[Vo];i!==void 0&&t(!!i),rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=bv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return td()||Qh()||Ca()}}const Kv=Wv;var su="@firebase/auth",iu="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Yv(n){Cn(new en("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nd(n)},h=new py(r,s,i,u);return by(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Cn(new en("auth-internal",e=>{const t=fn(e.getProvider("auth").getImmediate());return(r=>new Qv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),gt(su,iu,Jv(n)),gt(su,iu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=300,Zv=Oh("authIdTokenMaxAge")||Xv;let ou=null;const eE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Zv)return;const s=t?.token;ou!==s&&(ou=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function tE(n=Ia()){const e=Di(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Iy(n,{popupRedirectResolver:Kv,persistence:[iv,Wy,dd]}),r=Oh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=eE(i.toString());jy(t,a,()=>a(t.currentUser)),By(t,c=>a(c))}}const s=Dh("auth");return s&&Ay(t,`http://${s}`),t}function nE(){return document.getElementsByTagName("head")?.[0]??document}my({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=at("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",nE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Yv("Browser");var rE="firebase",sE="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gt(rE,sE,"app");var au=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xt,wd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function y(){}y.prototype=_.prototype,w.F=_.prototype,w.prototype=new y,w.prototype.constructor=w,w.D=function(E,v,T){for(var g=Array(arguments.length-2),B=2;B<arguments.length;B++)g[B-2]=arguments[B];return _.prototype[v].apply(E,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,y){y||(y=0);const E=Array(16);if(typeof _=="string")for(var v=0;v<16;++v)E[v]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(v=0;v<16;++v)E[v]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=w.g[0],y=w.g[1],v=w.g[2];let T=w.g[3],g;g=_+(T^y&(v^T))+E[0]+3614090360&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(v^_&(y^v))+E[1]+3905402710&4294967295,T=_+(g<<12&4294967295|g>>>20),g=v+(y^T&(_^y))+E[2]+606105819&4294967295,v=T+(g<<17&4294967295|g>>>15),g=y+(_^v&(T^_))+E[3]+3250441966&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(T^y&(v^T))+E[4]+4118548399&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(v^_&(y^v))+E[5]+1200080426&4294967295,T=_+(g<<12&4294967295|g>>>20),g=v+(y^T&(_^y))+E[6]+2821735955&4294967295,v=T+(g<<17&4294967295|g>>>15),g=y+(_^v&(T^_))+E[7]+4249261313&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(T^y&(v^T))+E[8]+1770035416&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(v^_&(y^v))+E[9]+2336552879&4294967295,T=_+(g<<12&4294967295|g>>>20),g=v+(y^T&(_^y))+E[10]+4294925233&4294967295,v=T+(g<<17&4294967295|g>>>15),g=y+(_^v&(T^_))+E[11]+2304563134&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(T^y&(v^T))+E[12]+1804603682&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(v^_&(y^v))+E[13]+4254626195&4294967295,T=_+(g<<12&4294967295|g>>>20),g=v+(y^T&(_^y))+E[14]+2792965006&4294967295,v=T+(g<<17&4294967295|g>>>15),g=y+(_^v&(T^_))+E[15]+1236535329&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(v^T&(y^v))+E[1]+4129170786&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^v&(_^y))+E[6]+3225465664&4294967295,T=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(T^_))+E[11]+643717713&4294967295,v=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(v^T))+E[0]+3921069994&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^T&(y^v))+E[5]+3593408605&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^v&(_^y))+E[10]+38016083&4294967295,T=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(T^_))+E[15]+3634488961&4294967295,v=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(v^T))+E[4]+3889429448&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^T&(y^v))+E[9]+568446438&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^v&(_^y))+E[14]+3275163606&4294967295,T=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(T^_))+E[3]+4107603335&4294967295,v=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(v^T))+E[8]+1163531501&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^T&(y^v))+E[13]+2850285829&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^v&(_^y))+E[2]+4243563512&4294967295,T=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(T^_))+E[7]+1735328473&4294967295,v=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(v^T))+E[12]+2368359562&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(y^v^T)+E[5]+4294588738&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^v)+E[8]+2272392833&4294967295,T=_+(g<<11&4294967295|g>>>21),g=v+(T^_^y)+E[11]+1839030562&4294967295,v=T+(g<<16&4294967295|g>>>16),g=y+(v^T^_)+E[14]+4259657740&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^T)+E[1]+2763975236&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^v)+E[4]+1272893353&4294967295,T=_+(g<<11&4294967295|g>>>21),g=v+(T^_^y)+E[7]+4139469664&4294967295,v=T+(g<<16&4294967295|g>>>16),g=y+(v^T^_)+E[10]+3200236656&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^T)+E[13]+681279174&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^v)+E[0]+3936430074&4294967295,T=_+(g<<11&4294967295|g>>>21),g=v+(T^_^y)+E[3]+3572445317&4294967295,v=T+(g<<16&4294967295|g>>>16),g=y+(v^T^_)+E[6]+76029189&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^T)+E[9]+3654602809&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^v)+E[12]+3873151461&4294967295,T=_+(g<<11&4294967295|g>>>21),g=v+(T^_^y)+E[15]+530742520&4294967295,v=T+(g<<16&4294967295|g>>>16),g=y+(v^T^_)+E[2]+3299628645&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(v^(y|~T))+E[0]+4096336452&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~v))+E[7]+1126891415&4294967295,T=_+(g<<10&4294967295|g>>>22),g=v+(_^(T|~y))+E[14]+2878612391&4294967295,v=T+(g<<15&4294967295|g>>>17),g=y+(T^(v|~_))+E[5]+4237533241&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~T))+E[12]+1700485571&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~v))+E[3]+2399980690&4294967295,T=_+(g<<10&4294967295|g>>>22),g=v+(_^(T|~y))+E[10]+4293915773&4294967295,v=T+(g<<15&4294967295|g>>>17),g=y+(T^(v|~_))+E[1]+2240044497&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~T))+E[8]+1873313359&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~v))+E[15]+4264355552&4294967295,T=_+(g<<10&4294967295|g>>>22),g=v+(_^(T|~y))+E[6]+2734768916&4294967295,v=T+(g<<15&4294967295|g>>>17),g=y+(T^(v|~_))+E[13]+1309151649&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~T))+E[4]+4149444226&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~v))+E[11]+3174756917&4294967295,T=_+(g<<10&4294967295|g>>>22),g=v+(_^(T|~y))+E[2]+718787259&4294967295,v=T+(g<<15&4294967295|g>>>17),g=y+(T^(v|~_))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,w.g[2]=w.g[2]+v&4294967295,w.g[3]=w.g[3]+T&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const y=_-this.blockSize,E=this.C;let v=this.h,T=0;for(;T<_;){if(v==0)for(;T<=y;)s(this,w,T),T+=this.blockSize;if(typeof w=="string"){for(;T<_;)if(E[v++]=w.charCodeAt(T++),v==this.blockSize){s(this,E),v=0;break}}else for(;T<_;)if(E[v++]=w[T++],v==this.blockSize){s(this,E),v=0;break}}this.h=v,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var y=w.length-8;y<w.length;++y)w[y]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,y=0;y<4;++y)for(let E=0;E<32;E+=8)w[_++]=this.g[y]>>>E&255;return w};function i(w,_){var y=c;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=_(w)}function a(w,_){this.h=_;const y=[];let E=!0;for(let v=w.length-1;v>=0;v--){const T=w[v]|0;E&&T==_||(y[v]=T,E=!1)}this.g=y}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new a([_|0],_<0?-1:0)}):new a([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return m;if(w<0)return N(h(-w));const _=[];let y=1;for(let E=0;w>=y;E++)_[E]=w/y|0,y*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return N(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(_,8));let E=m;for(let T=0;T<w.length;T+=8){var v=Math.min(8,w.length-T);const g=parseInt(w.substring(T,T+v),_);v<8?(v=h(Math.pow(_,v)),E=E.j(v).add(h(g))):(E=E.j(y),E=E.add(h(g)))}return E}var m=u(0),I=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(x(this))return-N(this).m();let w=0,_=1;for(let y=0;y<this.g.length;y++){const E=this.i(y);w+=(E>=0?E:4294967296+E)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(R(this))return"0";if(x(this))return"-"+N(this).toString(w);const _=h(Math.pow(w,6));var y=this;let E="";for(;;){const v=W(y,_).g;y=D(y,v.j(_));let T=((y.g.length>0?y.g[0]:y.h)>>>0).toString(w);if(y=v,R(y))return T+E;for(;T.length<6;)T="0"+T;E=T+E}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function R(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function x(w){return w.h==-1}n.l=function(w){return w=D(this,w),x(w)?-1:R(w)?0:1};function N(w){const _=w.g.length,y=[];for(let E=0;E<_;E++)y[E]=~w.g[E];return new a(y,~w.h).add(I)}n.abs=function(){return x(this)?N(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),y=[];let E=0;for(let v=0;v<=_;v++){let T=E+(this.i(v)&65535)+(w.i(v)&65535),g=(T>>>16)+(this.i(v)>>>16)+(w.i(v)>>>16);E=g>>>16,T&=65535,g&=65535,y[v]=g<<16|T}return new a(y,y[y.length-1]&-2147483648?-1:0)};function D(w,_){return w.add(N(_))}n.j=function(w){if(R(this)||R(w))return m;if(x(this))return x(w)?N(this).j(N(w)):N(N(this).j(w));if(x(w))return N(this.j(N(w)));if(this.l(A)<0&&w.l(A)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,y=[];for(var E=0;E<2*_;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(let v=0;v<w.g.length;v++){const T=this.i(E)>>>16,g=this.i(E)&65535,B=w.i(v)>>>16,ae=w.i(v)&65535;y[2*E+2*v]+=g*ae,F(y,2*E+2*v),y[2*E+2*v+1]+=T*ae,F(y,2*E+2*v+1),y[2*E+2*v+1]+=g*B,F(y,2*E+2*v+1),y[2*E+2*v+2]+=T*B,F(y,2*E+2*v+2)}for(w=0;w<_;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=_;w<2*_;w++)y[w]=0;return new a(y,0)};function F(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function M(w,_){this.g=w,this.h=_}function W(w,_){if(R(_))throw Error("division by zero");if(R(w))return new M(m,m);if(x(w))return _=W(N(w),_),new M(N(_.g),N(_.h));if(x(_))return _=W(w,N(_)),new M(N(_.g),_.h);if(w.g.length>30){if(x(w)||x(_))throw Error("slowDivide_ only works with positive integers.");for(var y=I,E=_;E.l(w)<=0;)y=q(y),E=q(E);var v=z(y,1),T=z(E,1);for(E=z(E,2),y=z(y,2);!R(E);){var g=T.add(E);g.l(w)<=0&&(v=v.add(y),T=g),E=z(E,1),y=z(y,1)}return _=D(w,v.j(_)),new M(v,_)}for(v=m;w.l(_)>=0;){for(y=Math.max(1,Math.floor(w.m()/_.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),T=h(y),g=T.j(_);x(g)||g.l(w)>0;)y-=E,T=h(y),g=T.j(_);R(T)&&(T=I),v=v.add(T),w=D(w,g)}return new M(v,w)}n.B=function(w){return W(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)&w.i(E);return new a(y,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)|w.i(E);return new a(y,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)^w.i(E);return new a(y,this.h^w.h)};function q(w){const _=w.g.length+1,y=[];for(let E=0;E<_;E++)y[E]=w.i(E)<<1|w.i(E-1)>>>31;return new a(y,w.h)}function z(w,_){const y=_>>5;_%=32;const E=w.g.length-y,v=[];for(let T=0;T<E;T++)v[T]=_>0?w.i(T+y)>>>_|w.i(T+y+1)<<32-_:w.i(T+y);return new a(v,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,wd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Xt=a}).apply(typeof au<"u"?au:typeof self<"u"?self:typeof window<"u"?window:{});var Fs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Td,Mr,Id,Qs,Zo,bd,Ad,Sd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fs=="object"&&Fs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var b=o[p];if(!(b in d))break e;d=d[b]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=u,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function m(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(p,b,S){for(var O=Array(arguments.length-2),J=2;J<arguments.length;J++)O[J-2]=arguments[J];return l.prototype[b].apply(p,O)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function A(o){const l=o.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function R(o,l){for(let p=1;p<arguments.length;p++){const b=arguments[p];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=o.length||0;const S=b.length||0;o.length=d+S;for(let O=0;O<S;O++)o[d+O]=b[O]}else o.push(b)}}class x{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function N(o){a.setTimeout(()=>{throw o},0)}function D(){var o=w;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class F{constructor(){this.h=this.g=null}add(l,d){const p=M.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var M=new x(()=>new W,o=>o.reset());class W{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let q,z=!1,w=new F,_=()=>{const o=Promise.resolve(void 0);q=()=>{o.then(y)}};function y(){for(var o;o=D();){try{o.h.call(o.g)}catch(d){N(d)}var l=M;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}z=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var T=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function B(o,l){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}m(B,v),B.prototype.init=function(o,l){const d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&B.Z.h.call(this)},B.prototype.h=function(){B.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ae="closure_listenable_"+(Math.random()*1e6|0),Ge=0;function je(o,l,d,p,b){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=b,this.key=++Ge,this.da=this.fa=!1}function qe(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ve(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function dt(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function et(o){const l={};for(const d in o)l[d]=o[d];return l}const Se="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function de(o,l){let d,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(d in p)o[d]=p[d];for(let S=0;S<Se.length;S++)d=Se[S],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function fe(o){this.src=o,this.g={},this.h=0}fe.prototype.add=function(o,l,d,p,b){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const O=st(o,l,p,b);return O>-1?(l=o[O],d||(l.fa=!1)):(l=new je(l,this.src,S,!!p,b),l.fa=d,o.push(l)),l};function ke(o,l){const d=l.type;if(d in o.g){var p=o.g[d],b=Array.prototype.indexOf.call(p,l,void 0),S;(S=b>=0)&&Array.prototype.splice.call(p,b,1),S&&(qe(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function st(o,l,d,p){for(let b=0;b<o.length;++b){const S=o[b];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return b}return-1}var Xe="closure_lm_"+(Math.random()*1e6|0),Ft={};function $n(o,l,d,p,b){if(Array.isArray(l)){for(let S=0;S<l.length;S++)$n(o,l[S],d,p,b);return null}return d=Rc(d),o&&o[ae]?o.J(l,d,c(p)?!!p.capture:!1,b):Is(o,l,d,!1,p,b)}function Is(o,l,d,p,b,S){if(!l)throw Error("Invalid event type");const O=c(b)?!!b.capture:!!b;let J=mr(o);if(J||(o[Xe]=J=new fe(o)),d=J.add(l,d,p,O,S),d.proxy)return d;if(p=io(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)T||(b=O),b===void 0&&(b=!1),o.addEventListener(l.toString(),p,b);else if(o.attachEvent)o.attachEvent(ce(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function io(){function o(d){return l.call(o.src,o.listener,d)}const l=At;return o}function bs(o,l,d,p,b){if(Array.isArray(l))for(var S=0;S<l.length;S++)bs(o,l[S],d,p,b);else p=c(p)?!!p.capture:!!p,d=Rc(d),o&&o[ae]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],d=st(l,d,p,b),d>-1&&(qe(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=mr(o))&&(l=o.g[l.toString()],o=-1,l&&(o=st(l,d,p,b)),(d=o>-1?l[o]:null)&&Fn(d))}function Fn(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[ae])ke(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(ce(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=mr(l))?(ke(d,o),d.h==0&&(d.src=null,l[Xe]=null)):qe(o)}}}function ce(o){return o in Ft?Ft[o]:Ft[o]="on"+o}function At(o,l){if(o.da)o=!0;else{l=new B(l,this);const d=o.listener,p=o.ha||o.src;o.fa&&Fn(o),o=d.call(p,l)}return o}function mr(o){return o=o[Xe],o instanceof fe?o:null}var oo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Rc(o){return typeof o=="function"?o:(o[oo]||(o[oo]=function(l){return o.handleEvent(l)}),o[oo])}function Oe(){E.call(this),this.i=new fe(this),this.M=this,this.G=null}m(Oe,E),Oe.prototype[ae]=!0,Oe.prototype.removeEventListener=function(o,l,d,p){bs(this,o,l,d,p)};function ze(o,l){var d,p=o.G;if(p)for(d=[];p;p=p.G)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new v(l,o);else if(l instanceof v)l.target=l.target||o;else{var b=l;l=new v(p,o),de(l,b)}b=!0;let S,O;if(d)for(O=d.length-1;O>=0;O--)S=l.g=d[O],b=As(S,p,!0,l)&&b;if(S=l.g=o,b=As(S,p,!0,l)&&b,b=As(S,p,!1,l)&&b,d)for(O=0;O<d.length;O++)S=l.g=d[O],b=As(S,p,!1,l)&&b}Oe.prototype.N=function(){if(Oe.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let p=0;p<d.length;p++)qe(d[p]);delete o.g[l],o.h--}}this.G=null},Oe.prototype.J=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},Oe.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function As(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let S=0;S<l.length;++S){const O=l[S];if(O&&!O.da&&O.capture==d){const J=O.listener,we=O.ha||O.src;O.fa&&ke(o.i,O),b=J.call(we,p)!==!1&&b}}return b&&!p.defaultPrevented}function hp(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Cc(o){o.g=hp(()=>{o.g=null,o.i&&(o.i=!1,Cc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class dp extends E{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Cc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gr(o){E.call(this),this.h=o,this.g={}}m(gr,E);var Pc=[];function kc(o){Ve(o.g,function(l,d){this.g.hasOwnProperty(d)&&Fn(l)},o),o.g={}}gr.prototype.N=function(){gr.Z.N.call(this),kc(this)},gr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ao=a.JSON.stringify,fp=a.JSON.parse,pp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function xc(){}function Nc(){}var _r={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function co(){v.call(this,"d")}m(co,v);function lo(){v.call(this,"c")}m(lo,v);var mn={},Dc=null;function Ss(){return Dc=Dc||new Oe}mn.Ia="serverreachability";function Vc(o){v.call(this,mn.Ia,o)}m(Vc,v);function yr(o){const l=Ss();ze(l,new Vc(l))}mn.STAT_EVENT="statevent";function Oc(o,l){v.call(this,mn.STAT_EVENT,o),this.stat=l}m(Oc,v);function He(o){const l=Ss();ze(l,new Oc(l,o))}mn.Ja="timingevent";function Mc(o,l){v.call(this,mn.Ja,o),this.size=l}m(Mc,v);function vr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Er(){this.g=!0}Er.prototype.ua=function(){this.g=!1};function mp(o,l,d,p,b,S){o.info(function(){if(o.g)if(S){var O="",J=S.split("&");for(let se=0;se<J.length;se++){var we=J[se].split("=");if(we.length>1){const Re=we[0];we=we[1];const pt=Re.split("_");O=pt.length>=2&&pt[1]=="type"?O+(Re+"="+we+"&"):O+(Re+"=redacted&")}}}else O=null;else O=S;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+l+`
`+d+`
`+O})}function gp(o,l,d,p,b,S,O){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+l+`
`+d+`
`+S+" "+O})}function Un(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+yp(o,d)+(p?" "+p:"")})}function _p(o,l){o.info(function(){return"TIMEOUT: "+l})}Er.prototype.info=function(){};function yp(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var b=p[0];if(b!="noop"&&b!="stop"&&b!="close")for(let O=1;O<p.length;O++)p[O]=""}}}}return ao(S)}catch{return l}}var Rs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Lc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},$c;function uo(){}m(uo,xc),uo.prototype.g=function(){return new XMLHttpRequest},$c=new uo;function wr(o){return encodeURIComponent(String(o))}function vp(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function Ut(o,l,d,p){this.j=o,this.i=l,this.l=d,this.S=p||1,this.V=new gr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Fc}function Fc(){this.i=null,this.g="",this.h=!1}var Uc={},ho={};function fo(o,l,d){o.M=1,o.A=Ps(ft(l)),o.u=d,o.R=!0,Bc(o,null)}function Bc(o,l){o.F=Date.now(),Cs(o),o.B=ft(o.A);var d=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),el(d.i,"t",p),o.C=0,d=o.j.L,o.h=new Fc,o.g=yl(o.j,d?l:null,!o.u),o.P>0&&(o.O=new dp(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,p=o.ba;var b="readystatechange";Array.isArray(b)||(b&&(Pc[0]=b.toString()),b=Pc);for(let S=0;S<b.length;S++){const O=$n(d,b[S],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.J?et(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),yr(),mp(o.i,o.v,o.B,o.l,o.S,o.u)}Ut.prototype.ba=function(o){o=o.target;const l=this.O;l&&qt(o)==3?l.j():this.Y(o)},Ut.prototype.Y=function(o){try{if(o==this.g)e:{const J=qt(this.g),we=this.g.ya(),se=this.g.ca();if(!(J<3)&&(J!=3||this.g&&(this.h.h||this.g.la()||al(this.g)))){this.K||J!=4||we==7||(we==8||se<=0?yr(3):yr(2)),po(this);var l=this.g.ca();this.X=l;var d=Ep(this);if(this.o=l==200,gp(this.i,this.v,this.B,this.l,this.S,J,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,b=this.g;if((p=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(p)){var S=p;break t}}S=null}if(o=S)Un(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,mo(this,o);else{this.o=!1,this.m=3,He(12),gn(this),Tr(this);break e}}if(this.R){o=!0;let Re;for(;!this.K&&this.C<d.length;)if(Re=wp(this,d),Re==ho){J==4&&(this.m=4,He(14),o=!1),Un(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==Uc){this.m=4,He(15),Un(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Un(this.i,this.l,Re,null),mo(this,Re);if(jc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||d.length!=0||this.h.h||(this.m=1,He(16),o=!1),this.o=this.o&&o,!o)Un(this.i,this.l,d,"[Invalid Chunked Response]"),gn(this),Tr(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Io(O),O.P=!0,He(11))}}else Un(this.i,this.l,d,null),mo(this,d);J==4&&gn(this),this.o&&!this.K&&(J==4?pl(this.j,this):(this.o=!1,Cs(this)))}else Op(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,He(12)):(this.m=0,He(13)),gn(this),Tr(this)}}}catch{}finally{}};function Ep(o){if(!jc(o))return o.g.la();const l=al(o.g);if(l==="")return"";let d="";const p=l.length,b=qt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return gn(o),Tr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<p;S++)o.h.h=!0,d+=o.h.i.decode(l[S],{stream:!(b&&S==p-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function jc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function wp(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?ho:(d=Number(l.substring(d,p)),isNaN(d)?Uc:(p+=1,p+d>l.length?ho:(l=l.slice(p,p+d),o.C=p+d,l)))}Ut.prototype.cancel=function(){this.K=!0,gn(this)};function Cs(o){o.T=Date.now()+o.H,qc(o,o.H)}function qc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=vr(h(o.aa,o),l)}function po(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ut.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(_p(this.i,this.B),this.M!=2&&(yr(),He(17)),gn(this),this.m=2,Tr(this)):qc(this,this.T-o)};function Tr(o){o.j.I==0||o.K||pl(o.j,o)}function gn(o){po(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,kc(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function mo(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||go(d.h,o))){if(!o.L&&go(d.h,o)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Vs(d),Ns(d);else break e;To(d),He(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=vr(h(d.Va,d),6e3));Gc(d.h)<=1&&d.ta&&(d.ta=void 0)}else yn(d,11)}else if((o.L||d.g==o)&&Vs(d),!g(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let se=b[l];const Re=se[0];if(!(Re<=d.K))if(d.K=Re,se=se[1],d.I==2)if(se[0]=="c"){d.M=se[1],d.ba=se[2];const pt=se[3];pt!=null&&(d.ka=pt,d.j.info("VER="+d.ka));const vn=se[4];vn!=null&&(d.za=vn,d.j.info("SVER="+d.za));const zt=se[5];zt!=null&&typeof zt=="number"&&zt>0&&(p=1.5*zt,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ht=o.g;if(Ht){const Ms=Ht.g?Ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ms){var S=p.h;S.g||Ms.indexOf("spdy")==-1&&Ms.indexOf("quic")==-1&&Ms.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(_o(S,S.h),S.h=null))}if(p.G){const bo=Ht.g?Ht.g.getResponseHeader("X-HTTP-Session-Id"):null;bo&&(p.wa=bo,le(p.J,p.G,bo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var O=o;if(p.na=_l(p,p.L?p.ba:null,p.W),O.L){Wc(p.h,O);var J=O,we=p.O;we&&(J.H=we),J.D&&(po(J),Cs(J)),p.g=O}else dl(p);d.i.length>0&&Ds(d)}else se[0]!="stop"&&se[0]!="close"||yn(d,7);else d.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?yn(d,7):wo(d):se[0]!="noop"&&d.l&&d.l.qa(se),d.A=0)}}yr(4)}catch{}}var Tp=class{constructor(o,l){this.g=o,this.map=l}};function zc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Hc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Gc(o){return o.h?1:o.g?o.g.size:0}function go(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function _o(o,l){o.g?o.g.add(l):o.h=l}function Wc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}zc.prototype.cancel=function(){if(this.i=Kc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Kc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return A(o.i)}var Qc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ip(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const p=o[d].indexOf("=");let b,S=null;p>=0?(b=o[d].substring(0,p),S=o[d].substring(p+1)):b=o[d],l(b,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Bt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Bt?(this.l=o.l,Ir(this,o.j),this.o=o.o,this.g=o.g,br(this,o.u),this.h=o.h,yo(this,tl(o.i)),this.m=o.m):o&&(l=String(o).match(Qc))?(this.l=!1,Ir(this,l[1]||"",!0),this.o=Ar(l[2]||""),this.g=Ar(l[3]||"",!0),br(this,l[4]),this.h=Ar(l[5]||"",!0),yo(this,l[6]||"",!0),this.m=Ar(l[7]||"")):(this.l=!1,this.i=new Rr(null,this.l))}Bt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Sr(l,Jc,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Sr(l,Jc,!0),"@"),o.push(wr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Sr(d,d.charAt(0)=="/"?Sp:Ap,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Sr(d,Cp)),o.join("")},Bt.prototype.resolve=function(o){const l=ft(this);let d=!!o.j;d?Ir(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var p=o.h;if(d)br(l,o.u);else if(d=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var b=l.h.lastIndexOf("/");b!=-1&&(p=l.h.slice(0,b+1)+p)}if(b=p,b==".."||b==".")p="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){p=b.lastIndexOf("/",0)==0,b=b.split("/");const S=[];for(let O=0;O<b.length;){const J=b[O++];J=="."?p&&O==b.length&&S.push(""):J==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),p&&O==b.length&&S.push("")):(S.push(J),p=!0)}p=S.join("/")}else p=b}return d?l.h=p:d=o.i.toString()!=="",d?yo(l,tl(o.i)):d=!!o.m,d&&(l.m=o.m),l};function ft(o){return new Bt(o)}function Ir(o,l,d){o.j=d?Ar(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function br(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function yo(o,l,d){l instanceof Rr?(o.i=l,Pp(o.i,o.l)):(d||(l=Sr(l,Rp)),o.i=new Rr(l,o.l))}function le(o,l,d){o.i.set(l,d)}function Ps(o){return le(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Ar(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Sr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,bp),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function bp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Jc=/[#\/\?@]/g,Ap=/[#\?:]/g,Sp=/[#\?]/g,Rp=/[#\?@]/g,Cp=/#/g;function Rr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function _n(o){o.g||(o.g=new Map,o.h=0,o.i&&Ip(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Rr.prototype,n.add=function(o,l){_n(this),this.i=null,o=Bn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Yc(o,l){_n(o),l=Bn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Xc(o,l){return _n(o),l=Bn(o,l),o.g.has(l)}n.forEach=function(o,l){_n(this),this.g.forEach(function(d,p){d.forEach(function(b){o.call(l,b,p,this)},this)},this)};function Zc(o,l){_n(o);let d=[];if(typeof l=="string")Xc(o,l)&&(d=d.concat(o.g.get(Bn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}n.set=function(o,l){return _n(this),this.i=null,o=Bn(this,o),Xc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=Zc(this,o),o.length>0?String(o[0]):l):l};function el(o,l,d){Yc(o,l),d.length>0&&(o.i=null,o.g.set(Bn(o,l),A(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const b=wr(d);d=Zc(this,d);for(let S=0;S<d.length;S++){let O=b;d[S]!==""&&(O+="="+wr(d[S])),o.push(O)}}return this.i=o.join("&")};function tl(o){const l=new Rr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Bn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Pp(o,l){l&&!o.j&&(_n(o),o.i=null,o.g.forEach(function(d,p){const b=p.toLowerCase();p!=b&&(Yc(this,p),el(this,b,d))},o)),o.j=l}function kp(o,l){const d=new Er;if(a.Image){const p=new Image;p.onload=f(jt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(jt,d,"TestLoadImage: error",!1,l,p),p.onabort=f(jt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(jt,d,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function xp(o,l){const d=new Er,p=new AbortController,b=setTimeout(()=>{p.abort(),jt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(S=>{clearTimeout(b),S.ok?jt(d,"TestPingServer: ok",!0,l):jt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),jt(d,"TestPingServer: error",!1,l)})}function jt(o,l,d,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(d)}catch{}}function Np(){this.g=new pp}function vo(o){this.i=o.Sb||null,this.h=o.ab||!1}m(vo,xc),vo.prototype.g=function(){return new ks(this.i,this.h)};function ks(o,l){Oe.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(ks,Oe),n=ks.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,Pr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Pr(this)),this.g&&(this.readyState=3,Pr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;nl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function nl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Cr(this):Pr(this),this.readyState==3&&nl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Cr(this))},n.Na=function(o){this.g&&(this.response=o,Cr(this))},n.ga=function(){this.g&&Cr(this)};function Cr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Pr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Pr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ks.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function rl(o){let l="";return Ve(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Eo(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=rl(d),typeof o=="string"?d!=null&&wr(d):le(o,l,d))}function pe(o){Oe.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(pe,Oe);var Dp=/^https?$/i,Vp=["POST","PUT"];n=pe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():$c.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){sl(this,S);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)d.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),b=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Vp,l,void 0)>=0)||p||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){sl(this,S)}};function sl(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,il(o),xs(o)}function il(o){o.A||(o.A=!0,ze(o,"complete"),ze(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,ze(this,"complete"),ze(this,"abort"),xs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xs(this,!0)),pe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?ol(this):this.Xa())},n.Xa=function(){ol(this)};function ol(o){if(o.h&&typeof i<"u"){if(o.v&&qt(o)==4)setTimeout(o.Ca.bind(o),0);else if(ze(o,"readystatechange"),qt(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=S===0){let O=String(o.D).match(Qc)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),p=!Dp.test(O?O.toLowerCase():"")}d=p}if(d)ze(o,"complete"),ze(o,"success");else{o.o=6;try{var b=qt(o)>2?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.ca()+"]",il(o)}}finally{xs(o)}}}}function xs(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||ze(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function qt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),fp(l)}};function al(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Op(o){const l={};o=(o.g&&qt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(g(o[p]))continue;var d=vp(o[p]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[b]||[];l[b]=S,S.push(d)}dt(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function kr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function cl(o){this.za=0,this.i=[],this.j=new Er,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=kr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=kr("baseRetryDelayMs",5e3,o),this.Za=kr("retryDelaySeedMs",1e4,o),this.Ta=kr("forwardChannelMaxRetries",2,o),this.va=kr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new zc(o&&o.concurrentRequestLimit),this.Ba=new Np,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=cl.prototype,n.ka=8,n.I=1,n.connect=function(o,l,d,p){He(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=_l(this,null,this.W),Ds(this)};function wo(o){if(ll(o),o.I==3){var l=o.V++,d=ft(o.J);if(le(d,"SID",o.M),le(d,"RID",l),le(d,"TYPE","terminate"),xr(o,d),l=new Ut(o,o.j,l),l.M=2,l.A=Ps(ft(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=yl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Cs(l)}gl(o)}function Ns(o){o.g&&(Io(o),o.g.cancel(),o.g=null)}function ll(o){Ns(o),o.v&&(a.clearTimeout(o.v),o.v=null),Vs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Ds(o){if(!Hc(o.h)&&!o.m){o.m=!0;var l=o.Ea;q||_(),z||(q(),z=!0),w.add(l,o),o.D=0}}function Mp(o,l){return Gc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=vr(h(o.Ea,o,l),ml(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const b=new Ut(this,this.j,o);let S=this.o;if(this.U&&(S?(S=et(S),de(S,this.U)):S=this.U),this.u!==null||this.R||(b.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=hl(this,b,l),d=ft(this.J),le(d,"RID",o),le(d,"CVER",22),this.G&&le(d,"X-HTTP-Session-Id",this.G),xr(this,d),S&&(this.R?l="headers="+wr(rl(S))+"&"+l:this.u&&Eo(d,this.u,S)),_o(this.h,b),this.Ra&&le(d,"TYPE","init"),this.S?(le(d,"$req",l),le(d,"SID","null"),b.U=!0,fo(b,d,null)):fo(b,d,l),this.I=2}}else this.I==3&&(o?ul(this,o):this.i.length==0||Hc(this.h)||ul(this))};function ul(o,l){var d;l?d=l.l:d=o.V++;const p=ft(o.J);le(p,"SID",o.M),le(p,"RID",d),le(p,"AID",o.K),xr(o,p),o.u&&o.o&&Eo(p,o.u,o.o),d=new Ut(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=hl(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),_o(o.h,d),fo(d,p,l)}function xr(o,l){o.H&&Ve(o.H,function(d,p){le(l,p,d)}),o.l&&Ve({},function(d,p){le(l,p,d)})}function hl(o,l,d){d=Math.min(o.i.length,d);const p=o.l?h(o.l.Ka,o.l,o):null;e:{var b=o.i;let J=-1;for(;;){const we=["count="+d];J==-1?d>0?(J=b[0].g,we.push("ofs="+J)):J=0:we.push("ofs="+J);let se=!0;for(let Re=0;Re<d;Re++){var S=b[Re].g;const pt=b[Re].map;if(S-=J,S<0)J=Math.max(0,b[Re].g-100),se=!1;else try{S="req"+S+"_"||"";try{var O=pt instanceof Map?pt:Object.entries(pt);for(const[vn,zt]of O){let Ht=zt;c(zt)&&(Ht=ao(zt)),we.push(S+vn+"="+encodeURIComponent(Ht))}}catch(vn){throw we.push(S+"type="+encodeURIComponent("_badmap")),vn}}catch{p&&p(pt)}}if(se){O=we.join("&");break e}}O=void 0}return o=o.i.splice(0,d),l.G=o,O}function dl(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;q||_(),z||(q(),z=!0),w.add(l,o),o.A=0}}function To(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=vr(h(o.Da,o),ml(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,fl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=vr(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,He(10),Ns(this),fl(this))};function Io(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function fl(o){o.g=new Ut(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=ft(o.na);le(l,"RID","rpc"),le(l,"SID",o.M),le(l,"AID",o.K),le(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&le(l,"TO",o.ia),le(l,"TYPE","xmlhttp"),xr(o,l),o.u&&o.o&&Eo(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Ps(ft(l)),d.u=null,d.R=!0,Bc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Ns(this),To(this),He(19))};function Vs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function pl(o,l){var d=null;if(o.g==l){Vs(o),Io(o),o.g=null;var p=2}else if(go(o.h,l))d=l.G,Wc(o.h,l),p=1;else return;if(o.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=o.D;p=Ss(),ze(p,new Mc(p,d)),Ds(o)}else dl(o);else if(b=l.m,b==3||b==0&&l.X>0||!(p==1&&Mp(o,l)||p==2&&To(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),b){case 1:yn(o,5);break;case 4:yn(o,10);break;case 3:yn(o,6);break;default:yn(o,2)}}}function ml(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function yn(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),p=o.Ua;const b=!p;p=new Bt(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ir(p,"https"),Ps(p),b?kp(p.toString(),d):xp(p.toString(),d)}else He(2);o.I=0,o.l&&o.l.pa(l),gl(o),ll(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),He(2)):(this.j.info("Failed to ping google.com"),He(1))};function gl(o){if(o.I=0,o.ja=[],o.l){const l=Kc(o.h);(l.length!=0||o.i.length!=0)&&(R(o.ja,l),R(o.ja,o.i),o.h.i.length=0,A(o.i),o.i.length=0),o.l.oa()}}function _l(o,l,d){var p=d instanceof Bt?ft(d):new Bt(d);if(p.g!="")l&&(p.g=l+"."+p.g),br(p,p.u);else{var b=a.location;p=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const S=new Bt(null);p&&Ir(S,p),l&&(S.g=l),b&&br(S,b),d&&(S.h=d),p=S}return d=o.G,l=o.wa,d&&l&&le(p,d,l),le(p,"VER",o.ka),xr(o,p),p}function yl(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new pe(new vo({ab:d})):new pe(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function vl(){}n=vl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Os(){}Os.prototype.g=function(o,l){return new Ze(o,l)};function Ze(o,l){Oe.call(this),this.g=new cl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!g(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new jn(this)}m(Ze,Oe),Ze.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ze.prototype.close=function(){wo(this.g)},Ze.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=ao(o),o=d);l.i.push(new Tp(l.Ya++,o)),l.I==3&&Ds(l)},Ze.prototype.N=function(){this.g.l=null,delete this.j,wo(this.g),delete this.g,Ze.Z.N.call(this)};function El(o){co.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}m(El,co);function wl(){lo.call(this),this.status=1}m(wl,lo);function jn(o){this.g=o}m(jn,vl),jn.prototype.ra=function(){ze(this.g,"a")},jn.prototype.qa=function(o){ze(this.g,new El(o))},jn.prototype.pa=function(o){ze(this.g,new wl)},jn.prototype.oa=function(){ze(this.g,"b")},Os.prototype.createWebChannel=Os.prototype.g,Ze.prototype.send=Ze.prototype.o,Ze.prototype.open=Ze.prototype.m,Ze.prototype.close=Ze.prototype.close,Sd=function(){return new Os},Ad=function(){return Ss()},bd=mn,Zo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Rs.NO_ERROR=0,Rs.TIMEOUT=8,Rs.HTTP_ERROR=6,Qs=Rs,Lc.COMPLETE="complete",Id=Lc,Nc.EventType=_r,_r.OPEN="a",_r.CLOSE="b",_r.ERROR="c",_r.MESSAGE="d",Oe.prototype.listen=Oe.prototype.J,Mr=Nc,pe.prototype.listenOnce=pe.prototype.K,pe.prototype.getLastError=pe.prototype.Ha,pe.prototype.getLastErrorCode=pe.prototype.ya,pe.prototype.getStatus=pe.prototype.ca,pe.prototype.getResponseJson=pe.prototype.La,pe.prototype.getResponseText=pe.prototype.la,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Fa,Td=pe}).apply(typeof Fs<"u"?Fs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}We.UNAUTHENTICATED=new We(null),We.GOOGLE_CREDENTIALS=new We("google-credentials-uid"),We.FIRST_PARTY=new We("first-party-uid"),We.MOCK_USER=new We("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ur="12.14.0";function iE(n){ur=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new wa("@firebase/firestore");function Hn(){return xn.logLevel}function L(n,...e){if(xn.logLevel<=ee.DEBUG){const t=e.map(Va);xn.debug(`Firestore (${ur}): ${n}`,...t)}}function Mt(n,...e){if(xn.logLevel<=ee.ERROR){const t=e.map(Va);xn.error(`Firestore (${ur}): ${n}`,...t)}}function tr(n,...e){if(xn.logLevel<=ee.WARN){const t=e.map(Va);xn.warn(`Firestore (${ur}): ${n}`,...t)}}function Va(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Rd(n,r,t)}function Rd(n,e,t){let r=`FIRESTORE (${ur}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Mt(r),new Error(r)}function re(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Rd(e,s,r)}function Q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $ extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class aE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(We.UNAUTHENTICATED)))}shutdown(){}}class cE{constructor(e){this.t=e,this.currentUser=We.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){re(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Dt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Dt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Dt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(re(typeof r.accessToken=="string",31837,{l:r}),new oE(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return re(e===null||typeof e=="string",2055,{h:e}),new We(e)}}class lE{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=We.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class uE{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new lE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(We.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class cu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){re(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new cu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(re(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new cu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=dE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function ea(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Oo(s)===Oo(i)?X(s,i):Oo(s)?1:-1}return X(n.length,e.length)}const fE=55296,pE=57343;function Oo(n){const e=n.charCodeAt(0);return e>=fE&&e<=pE}function nr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="__name__";class mt{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&G(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=mt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return X(e.length,t.length)}static compareSegments(e,t){const r=mt.isNumericId(e),s=mt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?mt.extractNumericId(e).compare(mt.extractNumericId(t)):ea(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Xt.fromString(e.substring(4,e.length-2))}}class oe extends mt{construct(e,t,r){return new oe(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new $(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new oe(t)}static emptyPath(){return new oe([])}}const mE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ne extends mt{construct(e,t,r){return new Ne(e,t,r)}static isValidIdentifier(e){return mE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ne.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===lu}static keyField(){return new Ne([lu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new $(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new $(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new $(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new $(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ne(t)}static emptyPath(){return new Ne([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(oe.fromString(e))}static fromName(e){return new U(oe.fromString(e).popFirst(5))}static empty(){return new U(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new oe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(n,e,t){if(!t)throw new $(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function gE(n,e,t,r){if(e===!0&&r===!0)throw new $(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function uu(n){if(!U.isDocumentKey(n))throw new $(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function hu(n){if(U.isDocumentKey(n))throw new $(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Pd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Li(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function yt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new $(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Li(n);throw new $(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(n,e){const t={typeString:n};return e&&(t.value=e),t}function _s(n,e){if(!Pd(n))throw new $(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new $(C.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=-62135596800,fu=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*fu);return new ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new $(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new $(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<du)throw new $(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/fu}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(_s(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-du;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:Ee("string",ie._jsonSchemaVersion),seconds:Ee("number"),nanoseconds:Ee("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new ie(0,0))}static max(){return new K(new ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=-1;function _E(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(r===1e9?new ie(t+1,0):new ie(t,r));return new tn(s,U.empty(),e)}function yE(n){return new tn(n.readTime,n.key,Zr)}class tn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new tn(K.min(),U.empty(),Zr)}static max(){return new tn(K.max(),U.empty(),Zr)}}function vE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class wE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==EE)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):P.reject(t)}static resolve(e){return new P(((t,r)=>{t(e)}))}static reject(e){return new P(((t,r)=>{r(e)}))}static waitFor(e){return new P(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next((s=>s?P.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new P(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new P(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function TE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function dr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}$i.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=-1;function Fi(n){return n==null}function fi(n){return n===0&&1/n==-1/0}function IE(n){return typeof n=="number"&&Number.isInteger(n)&&!fi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd="";function bE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=pu(e)),e=AE(n.get(t),e);return pu(e)}function AE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case kd:t+="";break;default:t+=i}}return t}function pu(n){return n+kd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Vn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function xd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t){this.comparator=e,this.root=t||xe.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,xe.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Us(this.root,e,this.comparator,!1)}getReverseIterator(){return new Us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Us(this.root,e,this.comparator,!0)}}class Us{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class xe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??xe.RED,this.left=s??xe.EMPTY,this.right=i??xe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new xe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return xe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return xe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,xe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,xe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}xe.EMPTY=null,xe.RED=!0,xe.BLACK=!1;xe.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gu(this.data.getIterator())}getIteratorFrom(e){return new gu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof be)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new be(this.comparator);return t.data=e,t}}class gu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new ot([])}unionWith(e){let t=new be(Ne.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ot(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return nr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Nd("Invalid base64 string: "+i):i}})(e);return new De(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new De(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}De.EMPTY_BYTE_STRING=new De("");const SE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nn(n){if(re(!!n,39018),typeof n=="string"){let e=0;const t=SE.exec(n);if(re(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function rn(n){return typeof n=="string"?De.fromBase64String(n):De.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="server_timestamp",Vd="__type__",Od="__previous_value__",Md="__local_write_time__";function La(n){return(n?.mapValue?.fields||{})[Vd]?.stringValue===Dd}function Ui(n){const e=n.mapValue.fields[Od];return La(e)?Ui(e):e}function es(n){const e=nn(n.mapValue.fields[Md].timestampValue);return new ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e,t,r,s,i,a,c,u,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const pi="(default)";class ts{constructor(e,t){this.projectId=e,this.database=t||pi}static empty(){return new ts("","")}get isDefaultDatabase(){return this.database===pi}isEqual(e){return e instanceof ts&&e.projectId===this.projectId&&e.database===this.database}}function CE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new $(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ts(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld="__type__",PE="__max__",Bs={mapValue:{}},$d="__vector__",mi="value";function sn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?La(n)?4:xE(n)?9007199254740991:kE(n)?10:11:G(28295,{value:n})}function It(n,e){if(n===e)return!0;const t=sn(n);if(t!==sn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return es(n).isEqual(es(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=nn(s.timestampValue),c=nn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return rn(s.bytesValue).isEqual(rn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ge(s.geoPointValue.latitude)===ge(i.geoPointValue.latitude)&&ge(s.geoPointValue.longitude)===ge(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ge(s.integerValue)===ge(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ge(s.doubleValue),c=ge(i.doubleValue);return a===c?fi(a)===fi(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return nr(n.arrayValue.values||[],e.arrayValue.values||[],It);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(mu(a)!==mu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!It(a[u],c[u])))return!1;return!0})(n,e);default:return G(52216,{left:n})}}function ns(n,e){return(n.values||[]).find((t=>It(t,e)))!==void 0}function rr(n,e){if(n===e)return 0;const t=sn(n),r=sn(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=ge(i.integerValue||i.doubleValue),u=ge(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return _u(n.timestampValue,e.timestampValue);case 4:return _u(es(n),es(e));case 5:return ea(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=rn(i),u=rn(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=X(c[h],u[h]);if(f!==0)return f}return X(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=X(ge(i.latitude),ge(a.latitude));return c!==0?c:X(ge(i.longitude),ge(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return yu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},u=a.fields||{},h=c[mi]?.arrayValue,f=u[mi]?.arrayValue,m=X(h?.values?.length||0,f?.values?.length||0);return m!==0?m:yu(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Bs.mapValue&&a===Bs.mapValue)return 0;if(i===Bs.mapValue)return 1;if(a===Bs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const I=ea(u[m],f[m]);if(I!==0)return I;const A=rr(c[u[m]],h[f[m]]);if(A!==0)return A}return X(u.length,f.length)})(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function _u(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=nn(n),r=nn(e),s=X(t.seconds,r.seconds);return s!==0?s:X(t.nanos,r.nanos)}function yu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=rr(t[s],r[s]);if(i)return i}return X(t.length,r.length)}function sr(n){return ta(n)}function ta(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=nn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return rn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return U.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ta(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ta(t.fields[a])}`;return s+"}"})(n.mapValue):G(61005,{value:n})}function Js(n){switch(sn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ui(n);return e?16+Js(e):16;case 5:return 2*n.stringValue.length;case 6:return rn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Js(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Vn(r.fields,((i,a)=>{s+=i.length+Js(a)})),s})(n.mapValue);default:throw G(13486,{value:n})}}function vu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function rs(n){return!!n&&"integerValue"in n}function Fd(n){return rs(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function $a(n){return!!n&&"arrayValue"in n}function Eu(n){return!!n&&"nullValue"in n}function wu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ys(n){return!!n&&"mapValue"in n}function kE(n){return(n?.mapValue?.fields||{})[Ld]?.stringValue===$d}function jr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Vn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=jr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=jr(n.arrayValue.values[t]);return e}return{...n}}function xE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===PE}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.value=e}static empty(){return new tt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ys(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=jr(t)}setAll(e){let t=Ne.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=jr(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Ys(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return It(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ys(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Vn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new tt(jr(this.value))}}function Ud(n){const e=[];return Vn(n.fields,((t,r)=>{const s=new Ne([t]);if(Ys(r)){const i=Ud(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new ot(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Le(e,0,K.min(),K.min(),K.min(),tt.empty(),0)}static newFoundDocument(e,t,r,s){return new Le(e,1,t,K.min(),r,s,0)}static newNoDocument(e,t){return new Le(e,2,t,K.min(),K.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new Le(e,3,t,K.min(),K.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,t){this.position=e,this.inclusive=t}}function Tu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),t.key):r=rr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Iu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!It(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,t="asc"){this.field=e,this.dir=t}}function NE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{}class ve extends Bd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new VE(e,t,r):t==="array-contains"?new LE(e,r):t==="in"?new $E(e,r):t==="not-in"?new FE(e,r):t==="array-contains-any"?new UE(e,r):new ve(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new OE(e,r):new ME(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(rr(t,this.value)):t!==null&&sn(this.value)===sn(t)&&this.matchesComparison(rr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ut extends Bd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ut(e,t)}matches(e){return jd(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function jd(n){return n.op==="and"}function qd(n){return DE(n)&&jd(n)}function DE(n){for(const e of n.filters)if(e instanceof ut)return!1;return!0}function na(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+sr(n.value);if(qd(n))return n.filters.map((e=>na(e))).join(",");{const e=n.filters.map((t=>na(t))).join(",");return`${n.op}(${e})`}}function zd(n,e){return n instanceof ve?(function(r,s){return s instanceof ve&&r.op===s.op&&r.field.isEqual(s.field)&&It(r.value,s.value)})(n,e):n instanceof ut?(function(r,s){return s instanceof ut&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&zd(a,s.filters[c])),!0):!1})(n,e):void G(19439)}function Hd(n){return n instanceof ve?(function(t){return`${t.field.canonicalString()} ${t.op} ${sr(t.value)}`})(n):n instanceof ut?(function(t){return t.op.toString()+" {"+t.getFilters().map(Hd).join(" ,")+"}"})(n):"Filter"}class VE extends ve{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class OE extends ve{constructor(e,t){super(e,"in",t),this.keys=Gd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ME extends ve{constructor(e,t){super(e,"not-in",t),this.keys=Gd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Gd(n,e){return(e.arrayValue?.values||[]).map((t=>U.fromName(t.referenceValue)))}class LE extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $a(t)&&ns(t.arrayValue,this.value)}}class $E extends ve{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ns(this.value.arrayValue,t)}}class FE extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(ns(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ns(this.value.arrayValue,t)}}class UE extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$a(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ns(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function bu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new BE(n,e,t,r,s,i,a)}function Fa(n){const e=Q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>na(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Fi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>sr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>sr(r))).join(",")),e.Te=t}return e.Te}function Ua(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!NE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!zd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Iu(n.startAt,e.startAt)&&Iu(n.endAt,e.endAt)}function ra(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function jE(n,e,t,r,s,i,a,c){return new fr(n,e,t,r,s,i,a,c)}function Bi(n){return new fr(n)}function Au(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qE(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Wd(n){return n.collectionGroup!==null}function qr(n){const e=Q(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new be(Ne.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new ss(i,r))})),t.has(Ne.keyField().canonicalString())||e.Ie.push(new ss(Ne.keyField(),r))}return e.Ie}function vt(n){const e=Q(n);return e.Ee||(e.Ee=zE(e,qr(n))),e.Ee}function zE(n,e){if(n.limitType==="F")return bu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ss(s.field,i)}));const t=n.endAt?new gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gi(n.startAt.position,n.startAt.inclusive):null;return bu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function sa(n,e){const t=n.filters.concat([e]);return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function HE(n,e){const t=n.explicitOrderBy.concat([e]);return new fr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function _i(n,e,t){return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ji(n,e){return Ua(vt(n),vt(e))&&n.limitType===e.limitType}function Kd(n){return`${Fa(vt(n))}|lt:${n.limitType}`}function Gn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Hd(s))).join(", ")}]`),Fi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>sr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>sr(s))).join(",")),`Target(${r})`})(vt(n))}; limitType=${n.limitType})`}function qi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,u){const h=Tu(a,c,u);return a.inclusive?h<=0:h<0})(r.startAt,qr(r),s)||r.endAt&&!(function(a,c,u){const h=Tu(a,c,u);return a.inclusive?h>=0:h>0})(r.endAt,qr(r),s))})(n,e)}function GE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Qd(n){return(e,t)=>{let r=!1;for(const s of qr(n)){const i=WE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function WE(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):(function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?rr(u,h):G(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Vn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return xd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE=new he(U.comparator);function Lt(){return KE}const Jd=new he(U.comparator);function Lr(...n){let e=Jd;for(const t of n)e=e.insert(t.key,t);return e}function Yd(n){let e=Jd;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Tn(){return zr()}function Xd(){return zr()}function zr(){return new On((n=>n.toString()),((n,e)=>n.isEqual(e)))}const QE=new he(U.comparator),JE=new be(U.comparator);function Z(...n){let e=JE;for(const t of n)e=e.add(t);return e}const YE=new be(X);function XE(){return YE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fi(e)?"-0":e}}function Ba(n){return{integerValue:""+n}}function ZE(n,e){return IE(e)?Ba(e):zi(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(){this._=void 0}}function ew(n,e,t){return n instanceof is?(function(s,i){const a={fields:{[Vd]:{stringValue:Dd},[Md]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&La(i)&&(i=Ui(i)),i&&(a.fields[Od]=i),{mapValue:a}})(t,e):n instanceof os?ef(n,e):n instanceof as?tf(n,e):n instanceof cs?(function(s,i){const a=Zd(s,i),c=Ei(a)+Ei(s.Ae);return rs(a)&&rs(s.Ae)?Ba(c):zi(s.serializer,c)})(n,e):n instanceof yi?(function(s,i){return Su(s,i,Math.min)})(n,e):n instanceof vi?(function(s,i){return Su(s,i,Math.max)})(n,e):void 0}function tw(n,e,t){return n instanceof os?ef(n,e):n instanceof as?tf(n,e):t}function Zd(n,e){return n instanceof cs?Fd(e)?e:{integerValue:0}:null}class is extends Hi{}class os extends Hi{constructor(e){super(),this.elements=e}}function ef(n,e){const t=nf(e);for(const r of n.elements)t.some((s=>It(s,r)))||t.push(r);return{arrayValue:{values:t}}}class as extends Hi{constructor(e){super(),this.elements=e}}function tf(n,e){let t=nf(e);for(const r of n.elements)t=t.filter((s=>!It(s,r)));return{arrayValue:{values:t}}}class ja extends Hi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class cs extends ja{}class yi extends ja{}class vi extends ja{}function Su(n,e,t){if(!Fd(e))return n.Ae;const r=t(Ei(e),Ei(n.Ae));return rs(e)&&rs(n.Ae)?Ba(r):zi(n.serializer,r)}function Ei(n){return ge(n.integerValue||n.doubleValue)}function nf(n){return $a(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e,t){this.field=e,this.transform=t}}function rw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof os&&s instanceof os||r instanceof as&&s instanceof as?nr(r.elements,s.elements,It):r instanceof cs&&s instanceof cs||r instanceof yi&&s instanceof yi||r instanceof vi&&s instanceof vi?It(r.Ae,s.Ae):r instanceof is&&s instanceof is})(n.transform,e.transform)}class sw{constructor(e,t){this.version=e,this.transformResults=t}}class Et{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Et}static exists(e){return new Et(void 0,e)}static updateTime(e){return new Et(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Xs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Gi{}function rf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new qa(n.key,Et.none()):new ys(n.key,n.data,Et.none());{const t=n.data,r=tt.empty();let s=new be(Ne.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Mn(n.key,r,new ot(s.toArray()),Et.none())}}function iw(n,e,t){n instanceof ys?(function(s,i,a){const c=s.value.clone(),u=Cu(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Mn?(function(s,i,a){if(!Xs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Cu(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(sf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Hr(n,e,t,r){return n instanceof ys?(function(i,a,c,u){if(!Xs(i.precondition,a))return c;const h=i.value.clone(),f=Pu(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof Mn?(function(i,a,c,u){if(!Xs(i.precondition,a))return c;const h=Pu(i.fieldTransforms,u,a),f=a.data;return f.setAll(sf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,a,c){return Xs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function ow(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Zd(r.transform,s||null);i!=null&&(t===null&&(t=tt.empty()),t.set(r.field,i))}return t||null}function Ru(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&nr(r,s,((i,a)=>rw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ys extends Gi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Mn extends Gi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function sf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Cu(n,e,t){const r=new Map;re(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,tw(a,c,t[s]))}return r}function Pu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,ew(i,a,e))}return r}class qa extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class aw extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&iw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Xd();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=rf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(K.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Z())}isEqual(e){return this.batchId===e.batchId&&nr(this.mutations,e.mutations,((t,r)=>Ru(t,r)))&&nr(this.baseMutations,e.baseMutations,((t,r)=>Ru(t,r)))}}class za{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){re(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return QE})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new za(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye,te;function hw(n){switch(n){case C.OK:return G(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function of(n){if(n===void 0)return Mt("GRPC error has no .code"),C.UNKNOWN;switch(n){case ye.OK:return C.OK;case ye.CANCELLED:return C.CANCELLED;case ye.UNKNOWN:return C.UNKNOWN;case ye.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case ye.INTERNAL:return C.INTERNAL;case ye.UNAVAILABLE:return C.UNAVAILABLE;case ye.UNAUTHENTICATED:return C.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case ye.NOT_FOUND:return C.NOT_FOUND;case ye.ALREADY_EXISTS:return C.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return C.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case ye.ABORTED:return C.ABORTED;case ye.OUT_OF_RANGE:return C.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return C.UNIMPLEMENTED;case ye.DATA_LOSS:return C.DATA_LOSS;default:return G(39323,{code:n})}}(te=ye||(ye={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fw=new Xt([4294967295,4294967295],0);function ku(n){const e=dw().encode(n),t=new wd;return t.update(e),new Uint8Array(t.digest())}function xu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Xt([t,r],0),new Xt([s,i],0)]}class Ha{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new $r(`Invalid padding: ${t}`);if(r<0)throw new $r(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new $r(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new $r(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Xt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Xt.fromNumber(r)));return s.compare(fw)===1&&(s=new Xt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ku(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ha(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=ku(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class $r extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Es.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new vs(K.min(),s,new he(X),Lt(),Z())}}class Es{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Es(r,t,Z(),Z(),Z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class af{constructor(e,t){this.targetId=e,this.Ce=t}}class cf{constructor(e,t,r=De.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Nu{constructor(e){this.targetId=e,this.ve=0,this.Fe=Du(),this.Me=De.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Z(),t=Z(),r=Z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:G(38017,{changeType:i})}})),new Es(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Du()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,re(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const Nr="WatchChangeAggregator";class pw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Lt(),this.Je=js(),this.He=js(),this.Ze=new he(X)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:G(56790,{state:e.state})}else L(Nr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(ra(i))if(r===0){const a=new U(i.path);this.et(t,a,Le.newNoDocument(a,K.min()))}else re(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=rn(r).toUint8Array()}catch(u){if(u instanceof Nd)return tr("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ha(a,s,i)}catch(u){return tr(u instanceof $r?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.st(a);if(c){if(i.current&&ra(c.target)){const u=new U(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.et(a,u,Le.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=Z();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new vs(e,t,this.Ze,this.je,r);return this.je=Lt(),this.Je=js(),this.He=js(),this.Ze=new he(X),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void L(Nr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):L(Nr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(L(Nr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Nu(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new be(X),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new be(X),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||L(Nr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new Nu(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function js(){return new he(U.comparator)}function Du(){return new he(U.comparator)}const mw={asc:"ASCENDING",desc:"DESCENDING"},gw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_w={and:"AND",or:"OR"};class yw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ia(n,e){return n.useProto3Json||Fi(e)?e:{value:e}}function wi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function lf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function vw(n,e){return wi(n,e.toTimestamp())}function wt(n){return re(!!n,49232),K.fromTimestamp((function(t){const r=nn(t);return new ie(r.seconds,r.nanos)})(n))}function Ga(n,e){return oa(n,e).canonicalString()}function oa(n,e){const t=(function(s){return new oe(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function uf(n){const e=oe.fromString(n);return re(mf(e),10190,{key:e.toString()}),e}function aa(n,e){return Ga(n.databaseId,e.path)}function Mo(n,e){const t=uf(e);if(t.get(1)!==n.databaseId.projectId)throw new $(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new $(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(df(t))}function hf(n,e){return Ga(n.databaseId,e)}function Ew(n){const e=uf(n);return e.length===4?oe.emptyPath():df(e)}function ca(n){return new oe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function df(n){return re(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Vu(n,e,t){return{name:aa(n,e),fields:t.value.mapValue.fields}}function ww(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:G(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(re(f===void 0||typeof f=="string",58123),De.fromBase64String(f||"")):(re(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),De.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?C.UNKNOWN:of(h.code);return new $(f,h.message||"")})(a);t=new cf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Mo(n,r.document.name),i=wt(r.document.updateTime),a=r.document.createTime?wt(r.document.createTime):K.min(),c=new tt({mapValue:{fields:r.document.fields}}),u=Le.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Zs(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Mo(n,r.document),i=r.readTime?wt(r.readTime):K.min(),a=Le.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Zs([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Mo(n,r.document),i=r.removedTargetIds||[];t=new Zs([],i,s,null)}else{if(!("filter"in e))return G(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new uw(s,i),c=r.targetId;t=new af(c,a)}}return t}function Tw(n,e){let t;if(e instanceof ys)t={update:Vu(n,e.key,e.value)};else if(e instanceof qa)t={delete:aa(n,e.key)};else if(e instanceof Mn)t={update:Vu(n,e.key,e.data),updateMask:xw(e.fieldMask)};else{if(!(e instanceof aw))return G(16599,{Vt:e.type});t={verify:aa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof is)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof os)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof as)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof cs)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof yi)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof vi)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw G(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:vw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:G(27497)})(n,e.precondition)),t}function Iw(n,e){return n&&n.length>0?(re(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?wt(s.updateTime):wt(i);return a.isEqual(K.min())&&(a=wt(i)),new sw(a,s.transformResults||[])})(t,e)))):[]}function bw(n,e){return{documents:[hf(n,e.path)]}}function Aw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=hf(n,s);const i=(function(h){if(h.length!==0)return pf(ut.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(I){return{field:Wn(I.field),direction:Cw(I.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ia(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{dt:t,parent:s}}function Sw(n){let e=Ew(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){re(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const I=ff(m);return I instanceof ut&&qd(I)?I.getFilters():[I]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((I=>(function(R){return new ss(Kn(R.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(I)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let I;return I=typeof m=="object"?m.value:m,Fi(I)?null:I})(t.limit));let u=null;t.startAt&&(u=(function(m){const I=!!m.before,A=m.values||[];return new gi(A,I)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const I=!m.before,A=m.values||[];return new gi(A,I)})(t.endAt)),jE(e,s,a,i,c,"F",u,h)}function Rw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ff(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Kn(t.unaryFilter.field);return ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Kn(t.unaryFilter.field);return ve.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kn(t.unaryFilter.field);return ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Kn(t.unaryFilter.field);return ve.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ve.create(Kn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ut.create(t.compositeFilter.filters.map((r=>ff(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return G(1026)}})(t.compositeFilter.op))})(n):G(30097,{filter:n})}function Cw(n){return mw[n]}function Pw(n){return gw[n]}function kw(n){return _w[n]}function Wn(n){return{fieldPath:n.canonicalString()}}function Kn(n){return Ne.fromServerFormat(n.fieldPath)}function pf(n){return n instanceof ve?(function(t){if(t.op==="=="){if(wu(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(Eu(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wu(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(Eu(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:Pw(t.op),value:t.value}}})(n):n instanceof ut?(function(t){const r=t.getFilters().map((s=>pf(s)));return r.length===1?r[0]:{compositeFilter:{op:kw(t.op),filters:r}}})(n):G(54877,{filter:n})}function xw(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function mf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function gf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t,r,s,i=K.min(),a=K.min(),c=De.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Pt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e){this.gt=e}}function Dw(n){const e=Sw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_i(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(){this.Sn=new Ow}addToCollectionParentIndex(e,t){return this.Sn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(tn.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(tn.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class Ow{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new be(oe.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new be(oe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_f=41943040;class Ke{static withCacheSize(e){return new Ke(e,Ke.DEFAULT_COLLECTION_PERCENTILE,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ke.DEFAULT_COLLECTION_PERCENTILE=10,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ke.DEFAULT=new Ke(_f,Ke.DEFAULT_COLLECTION_PERCENTILE,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ke.DISABLED=new Ke(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new on(0)}static _r(){return new on(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="LruGarbageCollector",yf=1048576;function Lu([n,e],[t,r]){const s=X(n,t);return s===0?X(e,r):s}class Mw{constructor(e){this.hr=e,this.buffer=new be(Lu),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Lu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Lw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){L(Mu,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){dr(t)?L(Mu,"Ignoring IndexedDB error during garbage collection: ",t):await hr(t)}await this.Rr(3e5)}))}}class $w{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return P.resolve($i.ce);const r=new Mw(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Ou)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ou):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Hn()<=ee.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Fw(n,e){return new $w(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.changes=new On((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Hr(r.mutation,s,ot.empty(),ie.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Z()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Z()){const s=Tn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Lr();return i.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Tn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Z())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=Lt();const a=zr(),c=(function(){return zr()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Mn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Hr(f.mutation,h,f.mutation.getFieldMask(),ie.now())):a.set(h.key,ot.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new Bw(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=zr();let s=new he(((a,c)=>a-c)),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||ot.empty();f=c.applyToLocalView(h,f),r.set(u,f);const m=(s.get(c.batchId)||Z()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Xd();f.forEach((I=>{if(!i.has(I)){const A=rf(t.get(I),r.get(I));A!==null&&m.set(I,A),i=i.add(I)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return P.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return qE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(Tn());let c=Zr,u=i;return a.next((h=>P.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next((I=>{u=u.insert(f,I)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,Z()))).next((f=>({batchId:c,changes:Yd(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next((r=>{let s=Lr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Lr();return this.indexManager.getCollectionParents(e,i).next((c=>P.forEach(c,(u=>{const h=(function(m,I){return new fr(I,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((m,I)=>{a=a.insert(m,I)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Le.newInvalidDocument(f)))}));let c=Lr();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Hr(f.mutation,h,ot.empty(),ie.now()),qi(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return P.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:wt(s.createTime)}})(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:Dw(s.bundledQuery),readTime:wt(s.readTime)}})(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(){this.overlays=new he(U.comparator),this.Br=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Tn();return P.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=Tn(),i=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new he(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Tn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Tn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return P.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new lw(t,r));let i=this.Br.get(t);i===void 0&&(i=Z(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(){this.sessionToken=De.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(){this.Lr=new be(Ce.kr),this.qr=new be(Ce.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Ce(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Ce(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new U(new oe([])),r=new Ce(t,e),s=new Ce(t,e+1),i=[];return this.qr.forEachInRange([r,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new U(new oe([])),r=new Ce(t,e),s=new Ce(t,e+1);let i=Z();return this.qr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Ce(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ce{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return U.comparator(e.key,t.key)||X(e.jr,t.jr)}static Kr(e,t){return X(e.jr,t.jr)||U.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new be(Ce.kr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new cw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Ce(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Ma:this.Xn-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ce(t,0),s=new Ce(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(a=>{const c=this.Hr(a.jr);i.push(c)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new be(X);return t.forEach((s=>{const i=new Ce(s,0),a=new Ce(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(c=>{r=r.add(c.jr)}))})),P.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const a=new Ce(new U(i),0);let c=new be(X);return this.Jr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.jr)),!0)}),a),P.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){re(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return P.forEach(t.mutations,(s=>{const i=new Ce(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Ce(t,0),s=this.Jr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e){this.ei=e,this.docs=(function(){return new he(U.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Le.newInvalidDocument(t))}getEntries(e,t){let r=Lt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Le.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Lt();const a=t.path,c=new U(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||vE(yE(f),r)<=0||(s.has(f.key)||qi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){G(9500)}ti(e,t){return P.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Kw(this)}getSize(e){return P.resolve(this.size)}}class Kw extends Uw{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),P.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.persistence=e,this.ni=new On((t=>Fa(t)),Ua),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.ri=0,this.ii=new Wa,this.targetCount=0,this.si=on.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),P.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new on(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.cr(t),P.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.ii.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t){this.oi={},this.overlays={},this._i=new $i(0),this.ai=!1,this.ai=!0,this.ui=new Hw,this.referenceDelegate=e(this),this.ci=new Qw(this),this.indexManager=new Vw,this.remoteDocumentCache=(function(s){return new Ww(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Nw(t),this.hi=new qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new zw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new Gw(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new Jw(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return P.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class Jw extends wE{constructor(e){super(),this.currentSequenceNumber=e}}class Ka{constructor(e){this.persistence=e,this.Ei=new Wa,this.Ri=null}static Ai(e){return new Ka(e)}get Vi(){if(this.Ri)return this.Ri;throw G(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Vi,(r=>{const s=U.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,K.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return P.or([()=>P.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ti{constructor(e,t){this.persistence=e,this.mi=new On((r=>bE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Fw(this,t)}static Ai(e,t){return new Ti(e,t)}Pi(){}Ti(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return P.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?P.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(a=>this.yr(e,a,t).next((c=>{c||(r++,i.removeEntry(a,K.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),P.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Js(e.data.value)),t}yr(e,t,r){return P.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Qa(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Tg()?8:TE(Ue())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new Yw;return this.ps(e,t,a).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(Hn()<=ee.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),P.resolve()):(Hn()<=ee.DEBUG&&L("QueryEngine","Query:",Gn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(Hn()<=ee.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,vt(t))):P.resolve())}fs(e,t){if(Au(t))return P.resolve(null);let r=vt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=_i(t,null,"F"),r=vt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=Z(...i);return this.ds.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.ws(t,c);return this.Ss(t,h,a,u.readTime)?this.fs(e,_i(t,null,"F")):this.bs(e,h,t,u)}))))})))))}gs(e,t,r,s){return Au(t)||s.isEqual(K.min())?P.resolve(null):this.ds.getDocuments(e,r).next((i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?P.resolve(null):(Hn()<=ee.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Gn(t)),this.bs(e,a,t,_E(s,Zr)).next((c=>c)))}))}ws(e,t){let r=new be(Qd(e));return t.forEach(((s,i)=>{qi(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return Hn()<=ee.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Gn(t)),this.ds.getDocumentsMatchingQuery(e,t,tn.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja="LocalStore",Zw=3e8;class eT{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new he(X),this.vs=new On((i=>Fa(i)),Ua),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jw(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function tT(n,e,t,r){return new eT(n,e,t,r)}async function Ef(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let u=Z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({Os:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function nT(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,I=m.keys();let A=P.resolve();return I.forEach((R=>{A=A.next((()=>f.getEntry(u,R))).next((x=>{const N=h.docVersions.get(R);re(N!==null,48541),x.version.compareTo(N)<0&&(m.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=Z();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function wf(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function rT(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((f,m)=>{const I=s.get(m);if(!I)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.ci.addMatchingKeys(i,f.addedDocuments,m))));let A=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(De.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(m,A),(function(x,N,D){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Zw?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0})(I,A,f)&&c.push(t.ci.updateTargetData(i,A))}));let u=Lt(),h=Z();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(sT(i,a,e.documentUpdates).next((f=>{u=f.Ns,h=f.Bs}))),!r.isEqual(K.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next((m=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return P.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Cs=s,i)))}function sT(n,e,t){let r=Z(),s=Z();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=Lt();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(K.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):L(Ja,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Ns:a,Bs:s}}))}function iT(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ma),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function oT(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,P.resolve(s)):t.ci.allocateTargetId(r).next((a=>(s=new Pt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function la(n,e,t){const r=Q(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!dr(a))throw a;L(Ja,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function $u(n,e,t){const r=Q(n);let s=K.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const m=Q(u),I=m.vs.get(f);return I!==void 0?P.resolve(m.Cs.get(I)):m.ci.getTargetData(h,f)})(r,a,vt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next((u=>{i=u}))})).next((()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:K.min(),t?i:Z()))).next((c=>(aT(r,GE(e),c),{documents:c,Ls:i})))))}function aT(n,e,t){let r=n.Fs.get(e)||K.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Fu{constructor(){this.activeTargetIds=XE()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class cT{constructor(){this.Co=new Fu,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Fu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{Fo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu="ConnectivityMonitor";class Bu{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){L(Uu,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){L(Uu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qs=null;function ua(){return qs===null?qs=(function(){return 268435456+Math.round(2147483648*Math.random())})():qs++,"0x"+qs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="RestConnection",uT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class hT{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===pi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=ua(),c=this.Wo(e,t.toUriEncodedString());L(Lo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:h}=new URL(c),f=Dn(h);return this.Go(e,c,u,r,f).then((m=>(L(Lo,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw tr(Lo,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m}))}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ur})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=uT[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="WebChannelConnection",Dr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Xn extends hT{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Xn.u_){const e=Ad();Dr(e,bd.STAT_EVENT,(t=>{t.stat===Zo.PROXY?L(Me,"STAT_EVENT: detected buffering proxy"):t.stat===Zo.NOPROXY&&L(Me,"STAT_EVENT: detected no buffering proxy")})),Xn.u_=!0}}Go(e,t,r,s,i){const a=ua();return new Promise(((c,u)=>{const h=new Td;h.setWithCredentials(!0),h.listenOnce(Id.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Qs.NO_ERROR:const m=h.getResponseJson();L(Me,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case Qs.TIMEOUT:L(Me,`RPC '${e}' ${a} timed out`),u(new $(C.DEADLINE_EXCEEDED,"Request time out"));break;case Qs.HTTP_ERROR:const I=h.getStatus();if(L(Me,`RPC '${e}' ${a} failed with status:`,I,"response text:",h.getResponseText()),I>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const R=A?.error;if(R&&R.status&&R.message){const x=(function(D){const F=D.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(F)>=0?F:C.UNKNOWN})(R.status);u(new $(x,R.message))}else u(new $(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new $(C.UNAVAILABLE,"Connection failed."));break;default:G(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{L(Me,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);L(Me,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=ua(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");L(Me,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.T_(f);let m=!1,I=!1;const A=new dT({jo:R=>{I?L(Me,`Not sending because RPC '${e}' stream ${s} is closed:`,R):(m||(L(Me,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),L(Me,`RPC '${e}' stream ${s} sending:`,R),f.send(R))},Jo:()=>f.close()});return Dr(f,Mr.EventType.OPEN,(()=>{I||(L(Me,`RPC '${e}' stream ${s} transport opened.`),A.r_())})),Dr(f,Mr.EventType.CLOSE,(()=>{I||(I=!0,L(Me,`RPC '${e}' stream ${s} transport closed`),A.s_(),this.I_(f))})),Dr(f,Mr.EventType.ERROR,(R=>{I||(I=!0,tr(Me,`RPC '${e}' stream ${s} transport errored. Name:`,R.name,"Message:",R.message),A.s_(new $(C.UNAVAILABLE,"The operation could not be completed")))})),Dr(f,Mr.EventType.MESSAGE,(R=>{if(!I){const x=R.data[0];re(!!x,16349);const N=x,D=N?.error||N[0]?.error;if(D){L(Me,`RPC '${e}' stream ${s} received error:`,D);const F=D.status;let M=(function(z){const w=ye[z];if(w!==void 0)return of(w)})(F),W=D.message;F==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&tr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),M===void 0&&(M=C.INTERNAL,W="Unknown error status: "+F+" with message "+D.message),I=!0,A.s_(new $(M,W)),f.close()}else L(Me,`RPC '${e}' stream ${s} received:`,x),A.o_(x)}})),Xn.a_(),setTimeout((()=>{A.i_()}),0),A}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Sd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fT(n){return new Xn(n)}function $o(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n){return new yw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xn.u_=!1;class Tf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju="PersistentStream";class If{constructor(e,t,r,s,i,a,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Tf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Mt(t.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new $(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return L(ju,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(L(ju,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class pT extends If{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=ww(this.serializer,e),r=(function(i){if(!("targetChange"in i))return K.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?wt(a.readTime):K.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=ca(this.serializer),t.addTarget=(function(i,a){let c;const u=a.target;if(c=ra(u)?{documents:bw(i,u)}:{query:Aw(i,u).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=lf(i,a.resumeToken);const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(K.min())>0){c.readTime=wi(i,a.snapshotVersion.toTimestamp());const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Rw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=ca(this.serializer),t.removeTarget=e,this.k_(t)}}class mT extends If{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return re(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,re(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){re(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Iw(e.writeResults,e.commitTime),r=wt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=ca(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Tw(this.serializer,r)))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{}class _T extends gT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new $(C.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(e,oa(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new $(C.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.zo(e,oa(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new $(C.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function yT(n,e,t,r){return new _T(n,e,t,r)}class vT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Mt(t),this._a=!1):L("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt="RemoteStore";class ET{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new on(1e3),this.Aa=new on(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{r.enqueueAndForget((async()=>{Ln(this)&&(L(bt,"Restarting streams for network reachability change."),await(async function(u){const h=Q(u);h.Va.add(4),await ws(h),h.fa.set("Unknown"),h.Va.delete(4),await Ki(h)})(this))}))})),this.fa=new vT(r,s)}}async function Ki(n){if(Ln(n))for(const e of n.da)await e(!0)}async function ws(n){for(const e of n.da)await e(!1)}function ha(n,e){return n.Ia.get(e)||void 0}function bf(n,e){const t=Q(n),r=ha(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,u){const h=ha(c,u);h!==void 0&&c.Ea.delete(h);const f=(function(I,A){return A%2!=0?I.Aa.next():I.Ra.next()})(c,u);return c.Ia.set(u,f),c.Ea.set(f,u),f})(t,e.targetId);L(bt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Pt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),ec(t)?Za(t):pr(t).x_()&&Xa(t,i)}function Ya(n,e){const t=Q(n),r=pr(t),s=ha(t,e);L(bt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&Af(t,s),t.Ta.size===0&&(r.x_()?r.B_():Ln(t)&&t.fa.set("Unknown"))}function Xa(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void L(bt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}pr(n).H_(e)}function Af(n,e){n.ga.$e(e),pr(n).Z_(e)}function Za(n){n.ga=new pw({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):Z()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),pr(n).start(),n.fa.aa()}function ec(n){return Ln(n)&&!pr(n).M_()&&n.Ta.size>0}function Ln(n){return Q(n).Va.size===0}function Sf(n){n.ga=void 0}async function wT(n){n.fa.set("Online")}async function TT(n){n.Ta.forEach(((e,t)=>{Xa(n,e)}))}async function IT(n,e){Sf(n),ec(n)?(n.fa.la(e),Za(n)):n.fa.set("Unknown")}async function bT(n,e,t){if(n.fa.set("Online"),e instanceof cf&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){L(bt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ii(n,r)}else if(e instanceof Zs?n.ga.Xe(e):e instanceof af?n.ga.it(e):n.ga.tt(e),!t.isEqual(K.min()))try{const r=await wf(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ta.get(f);m&&i.Ta.set(f,m.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const m=i.Ta.get(h);if(!m)return;i.Ta.set(h,m.withResumeToken(De.EMPTY_BYTE_STRING,m.snapshotVersion)),Af(i,h);const I=new Pt(m.target,h,f,m.sequenceNumber);Xa(i,I)}));const u=(function(f,m){const I=new Map;m.targetChanges.forEach(((R,x)=>{const N=f.Ea.get(x);N!==void 0&&I.set(N,R)}));let A=new he(X);return m.targetMismatches.forEach(((R,x)=>{const N=f.Ea.get(R);N!==void 0&&(A=A.insert(N,x))})),new vs(m.snapshotVersion,I,A,m.documentUpdates,m.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){L(bt,"Failed to raise snapshot:",r),await Ii(n,r)}}async function Ii(n,e,t){if(!dr(e))throw e;n.Va.add(1),await ws(n),n.fa.set("Offline"),t||(t=()=>wf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{L(bt,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await Ki(n)}))}function Rf(n,e){return e().catch((t=>Ii(n,t,e)))}async function Qi(n){const e=Q(n),t=an(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ma;for(;AT(e);)try{const s=await iT(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,ST(e,s)}catch(s){await Ii(e,s)}Cf(e)&&Pf(e)}function AT(n){return Ln(n)&&n.Pa.length<10}function ST(n,e){n.Pa.push(e);const t=an(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function Cf(n){return Ln(n)&&!an(n).M_()&&n.Pa.length>0}function Pf(n){an(n).start()}async function RT(n){an(n).na()}async function CT(n){const e=an(n);for(const t of n.Pa)e.Y_(t.mutations)}async function PT(n,e,t){const r=n.Pa.shift(),s=za.from(r,e,t);await Rf(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Qi(n)}async function kT(n,e){e&&an(n).X_&&await(async function(r,s){if((function(a){return hw(a)&&a!==C.ABORTED})(s.code)){const i=r.Pa.shift();an(r).N_(),await Rf(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Qi(r)}})(n,e),Cf(n)&&Pf(n)}async function qu(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),L(bt,"RemoteStore received new credentials");const r=Ln(t);t.Va.add(3),await ws(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await Ki(t)}async function xT(n,e){const t=Q(n);e?(t.Va.delete(2),await Ki(t)):e||(t.Va.add(2),await ws(t),t.fa.set("Unknown"))}function pr(n){return n.pa||(n.pa=(function(t,r,s){const i=Q(t);return i.ia(),new pT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:wT.bind(null,n),Xo:TT.bind(null,n),e_:IT.bind(null,n),J_:bT.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),ec(n)?Za(n):n.fa.set("Unknown")):(await n.pa.stop(),Sf(n))}))),n.pa}function an(n){return n.ya||(n.ya=(function(t,r,s){const i=Q(t);return i.ia(),new mT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:RT.bind(null,n),e_:kT.bind(null,n),ea:CT.bind(null,n),ta:PT.bind(null,n)}),n.da.push((async e=>{e?(n.ya.N_(),await Qi(n)):(await n.ya.stop(),n.Pa.length>0&&(L(bt,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new tc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new $(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nc(n,e){if(Mt("AsyncQueue",`${e}: ${n}`),dr(n))return new $(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{static emptySet(e){return new Zn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||U.comparator(t.key,r.key):(t,r)=>U.comparator(t.key,r.key),this.keyedMap=Lr(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Zn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Zn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(){this.wa=new he(U.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):G(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class ir{constructor(e,t,r,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new ir(e,t,Zn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ji(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class DT{constructor(){this.queries=Hu(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=Q(t),i=s.queries;s.queries=Hu(),i.forEach(((a,c)=>{for(const u of c.Ca)u.onError(r)}))})(this,new $(C.ABORTED,"Firestore shutting down"))}}function Hu(){return new On((n=>Kd(n)),ji)}async function rc(n,e){const t=Q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new NT,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=nc(a,`Initialization of query '${Gn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&ic(t)}async function sc(n,e){const t=Q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function VT(n,e){const t=Q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&ic(t)}function OT(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function ic(n){n.Ma.forEach((e=>{e.next()}))}var da,Gu;(Gu=da||(da={})).Na="default",Gu.Cache="cache";class oc{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ir(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=ir.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==da.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e){this.key=e}}class xf{constructor(e){this.key=e}}class MT{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=Z(),this.mutatedKeys=Z(),this.ru=Qd(e),this.iu=new Zn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new zu,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const I=s.get(f),A=qi(this.query,m)?m:null,R=!!I&&this.mutatedKeys.has(I.key),x=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;I&&A?I.data.isEqual(A.data)?R!==x&&(r.track({type:3,doc:A}),N=!0):this.au(I,A)||(r.track({type:2,doc:A}),N=!0,(u&&this.ru(A,u)>0||h&&this.ru(A,h)<0)&&(c=!0)):!I&&A?(r.track({type:0,doc:A}),N=!0):I&&!A&&(r.track({type:1,doc:I}),N=!0,(u||h)&&(c=!0)),N&&(A?(a=a.add(A),i=x?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort(((f,m)=>(function(A,R){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{At:N})}};return x(A)-x(R)})(f.type,m.type)||this.ru(f.doc,m.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,h=u!==this.tu;return this.tu=u,a.length!==0||h?{snapshot:new ir(this.query,e.iu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new zu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=Z(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new xf(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new kf(r))})),t}Pu(e){this.eu=e.Ls,this.nu=Z();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return ir.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const ac="SyncEngine";class LT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class $T{constructor(e){this.key=e,this.Iu=!1}}class FT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new On((c=>Kd(c)),ji),this.Au=new Map,this.Vu=new Set,this.du=new he(U.comparator),this.mu=new Map,this.fu=new Wa,this.gu={},this.pu=new Map,this.yu=on._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function UT(n,e,t=!0){const r=Lf(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await Nf(r,e,t,!0),s}async function BT(n,e){const t=Lf(n);await Nf(t,e,!0,!1)}async function Nf(n,e,t,r){const s=await oT(n.localStore,vt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await jT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&bf(n.remoteStore,s),c}async function jT(n,e,t,r,s){n.Su=(m,I,A)=>(async function(x,N,D,F){let M=N.view.ou(D);M.Ss&&(M=await $u(x.localStore,N.query,!1).then((({documents:w})=>N.view.ou(w,M))));const W=F&&F.targetChanges.get(N.targetId),q=F&&F.targetMismatches.get(N.targetId)!=null,z=N.view.applyChanges(M,x.isPrimaryClient,W,q);return Ku(x,N.targetId,z.lu),z.snapshot})(n,m,I,A);const i=await $u(n.localStore,e,!0),a=new MT(e,i.Ls),c=a.ou(i.documents),u=Es.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);Ku(n,t,h.lu);const f=new LT(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),h.snapshot}async function qT(n,e,t){const r=Q(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((a=>!ji(a,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await la(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ya(r.remoteStore,s.targetId),fa(r,s.targetId)})).catch(hr)):(fa(r,s.targetId),await la(r.localStore,s.targetId,!0))}async function zT(n,e){const t=Q(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ya(t.remoteStore,r.targetId))}async function HT(n,e,t){const r=XT(n);try{const s=await(function(a,c){const u=Q(a),h=ie.now(),f=c.reduce(((A,R)=>A.add(R.key)),Z());let m,I;return u.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let R=Lt(),x=Z();return u.Ms.getEntries(A,f).next((N=>{R=N,R.forEach(((D,F)=>{F.isValidDocument()||(x=x.add(D))}))})).next((()=>u.localDocuments.getOverlayedDocuments(A,R))).next((N=>{m=N;const D=[];for(const F of c){const M=ow(F,m.get(F.key).overlayedDocument);M!=null&&D.push(new Mn(F.key,M,Ud(M.value.mapValue),Et.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,D,c)})).next((N=>{I=N;const D=N.applyToLocalDocumentSet(m,x);return u.documentOverlayCache.saveOverlays(A,N.batchId,D)}))})).then((()=>({batchId:I.batchId,changes:Yd(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.gu[a.currentUser.toKey()];h||(h=new he(X)),h=h.insert(c,u),a.gu[a.currentUser.toKey()]=h})(r,s.batchId,t),await Ts(r,s.changes),await Qi(r.remoteStore)}catch(s){const i=nc(s,"Failed to persist write");t.reject(i)}}async function Df(n,e){const t=Q(n);try{const r=await rT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.mu.get(i);a&&(re(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?re(a.Iu,14607):s.removedDocuments.size>0&&(re(a.Iu,42227),a.Iu=!1))})),await Ts(t,r,e)}catch(r){await hr(r)}}function Wu(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=Q(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const I of m.Ca)I.xa(c)&&(h=!0)})),h&&ic(u)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function GT(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new he(U.comparator);a=a.insert(i,Le.newNoDocument(i,K.min()));const c=Z().add(i),u=new vs(K.min(),new Map,new he(X),a,c);await Df(r,u),r.du=r.du.remove(i),r.mu.delete(e),cc(r)}else await la(r.localStore,e,!1).then((()=>fa(r,e,t))).catch(hr)}async function WT(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await nT(t.localStore,e);Of(t,r,null),Vf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ts(t,s)}catch(s){await hr(s)}}async function KT(n,e,t){const r=Q(n);try{const s=await(function(a,c){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(re(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Of(r,e,t),Vf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ts(r,s)}catch(s){await hr(s)}}function Vf(n,e){(n.pu.get(e)||[]).forEach((t=>{t.resolve()})),n.pu.delete(e)}function Of(n,e,t){const r=Q(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function fa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||Mf(n,r)}))}function Mf(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ya(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),cc(n))}function Ku(n,e,t){for(const r of t)r instanceof kf?(n.fu.addReference(r.key,e),QT(n,r)):r instanceof xf?(L(ac,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Mf(n,r.key)):G(19791,{Du:r})}function QT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(L(ac,"New document in limbo: "+t),n.Vu.add(r),cc(n))}function cc(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new U(oe.fromString(e)),r=n.yu.next();n.mu.set(r,new $T(t)),n.du=n.du.insert(t,r),bf(n.remoteStore,new Pt(vt(Bi(t.path)),r,"TargetPurposeLimboResolution",$i.ce))}}async function Ts(n,e,t){const r=Q(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,u)=>{a.push(r.Su(u,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Qa.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(a),r.Eu.J_(s),await(async function(u,h){const f=Q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>P.forEach(h,(I=>P.forEach(I.Ps,(A=>f.persistence.referenceDelegate.addReference(m,I.targetId,A))).next((()=>P.forEach(I.Ts,(A=>f.persistence.referenceDelegate.removeReference(m,I.targetId,A)))))))))}catch(m){if(!dr(m))throw m;L(Ja,"Failed to update sequence numbers: "+m)}for(const m of h){const I=m.targetId;if(!m.fromCache){const A=f.Cs.get(I),R=A.snapshotVersion,x=A.withLastLimboFreeSnapshotVersion(R);f.Cs=f.Cs.insert(I,x)}}})(r.localStore,i))}async function JT(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){L(ac,"User change. New user:",e.toKey());const r=await Ef(t.localStore,e);t.currentUser=e,(function(i,a){i.pu.forEach((c=>{c.forEach((u=>{u.reject(new $(C.CANCELLED,a))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ts(t,r.Os)}}function YT(n,e){const t=Q(n),r=t.mu.get(e);if(r&&r.Iu)return Z().add(r.key);{let s=Z();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function Lf(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Df.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=YT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=GT.bind(null,e),e.Eu.J_=VT.bind(null,e.eventManager),e.Eu.bu=OT.bind(null,e.eventManager),e}function XT(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=KT.bind(null,e),e}class bi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wi(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return tT(this.persistence,new Xw,e.initialUser,this.serializer)}Mu(e){return new vf(Ka.Ai,this.serializer)}Fu(e){return new cT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}bi.provider={build:()=>new bi};class ZT extends bi{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){re(this.persistence.referenceDelegate instanceof Ti,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Lw(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?Ke.withCacheSize(this.cacheSizeBytes):Ke.DEFAULT;return new vf((r=>Ti.Ai(r,t)),this.serializer)}}class pa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Wu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=JT.bind(null,this.syncEngine),await xT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new DT})()}createDatastore(e){const t=Wi(e.databaseInfo.databaseId),r=fT(e.databaseInfo);return yT(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new ET(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Wu(this.syncEngine,t,0)),(function(){return Bu.v()?new Bu:new lT})())}createSyncEngine(e,t){return(function(s,i,a,c,u,h,f){const m=new FT(s,i,a,c,u,h);return f&&(m.wu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=Q(t);L(bt,"RemoteStore shutting down."),r.Va.add(5),await ws(r),r.ma.shutdown(),r.fa.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}pa.provider={build:()=>new pa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):Mt("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="FirestoreClient";class eI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=We.UNAUTHENTICATED,this.clientId=Oa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{L(cn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(L(cn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=nc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Fo(n,e){n.asyncQueue.verifyOperationInProgress(),L(cn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Ef(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Qu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await tI(n);L(cn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>qu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>qu(e.remoteStore,s))),n._onlineComponents=e}async function tI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(cn,"Using user provided OfflineComponentProvider");try{await Fo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;tr("Error using user provided cache. Falling back to memory cache: "+t),await Fo(n,new bi)}}else L(cn,"Using default OfflineComponentProvider"),await Fo(n,new ZT(void 0));return n._offlineComponents}async function $f(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(cn,"Using user provided OnlineComponentProvider"),await Qu(n,n._uninitializedComponentsProvider._online)):(L(cn,"Using default OnlineComponentProvider"),await Qu(n,new pa))),n._onlineComponents}function nI(n){return $f(n).then((e=>e.syncEngine))}async function Ai(n){const e=await $f(n),t=e.eventManager;return t.onListen=UT.bind(null,e.syncEngine),t.onUnlisten=qT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=BT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=zT.bind(null,e.syncEngine),t}function rI(n,e,t,r){const s=new lc(r),i=new oc(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>rc(await Ai(n),i))),()=>{s.ku(),n.asyncQueue.enqueueAndForget((async()=>sc(await Ai(n),i)))}}function sI(n,e,t={}){const r=new Dt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new lc({next:I=>{f.ku(),a.enqueueAndForget((()=>sc(i,m)));const A=I.docs.has(c);!A&&I.fromCache?h.reject(new $(C.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&I.fromCache&&u&&u.source==="server"?h.reject(new $(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new oc(Bi(c.path),f,{includeMetadataChanges:!0,$a:!0});return rc(i,m)})(await Ai(n),n.asyncQueue,e,t,r))),r.promise}function iI(n,e,t={}){const r=new Dt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new lc({next:I=>{f.ku(),a.enqueueAndForget((()=>sc(i,m))),I.fromCache&&u.source==="server"?h.reject(new $(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new oc(c,f,{includeMetadataChanges:!0,$a:!0});return rc(i,m)})(await Ai(n),n.asyncQueue,e,t,r))),r.promise}function oI(n,e){const t=new Dt;return n.asyncQueue.enqueueAndForget((async()=>HT(await nI(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI="ComponentProvider",Ju=new Map;function cI(n,e,t,r,s){return new RE(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Ff(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI="firestore.googleapis.com",Yu=!0;class Xu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new $(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lI,this.ssl=Yu}else this.host=e.host,this.ssl=e.ssl??Yu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=_f;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yf)throw new $(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ff(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class uc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new $(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new aE;switch(r.type){case"firstParty":return new uE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new $(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Ju.get(t);r&&(L(aI,"Removing Datastore"),Ju.delete(t),r.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new $t(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Zt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(_s(t,_e._jsonSchema))return new _e(e,r||null,new U(oe.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:Ee("string",_e._jsonSchemaVersion),referencePath:Ee("string")};class Zt extends $t{constructor(e,t,r){super(e,t,Bi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new U(e))}withConverter(e){return new Zt(this.firestore,e,this._path)}}function Ji(n,e,...t){if(n=Ae(n),Cd("collection","path",e),n instanceof uc){const r=oe.fromString(e,...t);return hu(r),new Zt(n,null,r)}{if(!(n instanceof _e||n instanceof Zt))throw new $(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(oe.fromString(e,...t));return hu(r),new Zt(n.firestore,null,r)}}function Yi(n,e,...t){if(n=Ae(n),arguments.length===1&&(e=Oa.newId()),Cd("doc","path",e),n instanceof uc){const r=oe.fromString(e,...t);return uu(r),new _e(n,null,new U(r))}{if(!(n instanceof _e||n instanceof Zt))throw new $(C.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(oe.fromString(e,...t));return uu(r),new _e(n.firestore,n instanceof Zt?n.converter:null,new U(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu="AsyncQueue";class eh{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Tf(this,"async_queue_retry"),this.cc=()=>{const r=$o();r&&L(Zu,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=$o();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=$o();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new Dt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!dr(e))throw e;L(Zu,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,Mt("INTERNAL UNHANDLED ERROR: ",th(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=tc.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&G(47125,{Ec:th(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function th(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Nn extends uc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new eh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new eh(e),this._firestoreClient=void 0,await e}}}function uI(n,e,t){t||(t=pi);const r=Di(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Rn(i,e))return s;throw new $(C.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new $(C.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yf)throw new $(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Dn(e.host)&&Ea(e.host),r.initialize({options:e,instanceIdentifier:t})}function Xi(n){if(n._terminated)throw new $(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||hI(n),n._firestoreClient}function hI(n){const e=n._freezeSettings(),t=cI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new eI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nt(De.fromBase64String(e))}catch(t){throw new $(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new nt(De.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(_s(e,nt._jsonSchema))return nt.fromBase64String(e.bytes)}}nt._jsonSchemaVersion="firestore/bytes/1.0",nt._jsonSchema={type:Ee("string",nt._jsonSchemaVersion),bytes:Ee("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new $(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ne(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new $(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new $(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Tt._jsonSchemaVersion}}static fromJSON(e){if(_s(e,Tt._jsonSchema))return new Tt(e.latitude,e.longitude)}}Tt._jsonSchemaVersion="firestore/geoPoint/1.0",Tt._jsonSchema={type:Ee("string",Tt._jsonSchemaVersion),latitude:Ee("number"),longitude:Ee("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ct._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(_s(e,ct._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new ct(e.vectorValues);throw new $(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ct._jsonSchemaVersion="firestore/vectorValue/1.0",ct._jsonSchema={type:Ee("string",ct._jsonSchemaVersion),vectorValues:Ee("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=/^__.*__$/;class fI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Mn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ys(e,this.data,t,this.fieldTransforms)}}function Bf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{dataSource:n})}}class dc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new dc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Si(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if(Bf(this.dataSource)&&dI.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class pI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Wi(e)}V(e,t,r,s=!1){return new dc({dataSource:e,methodName:t,targetDoc:r,path:Ne.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function jf(n){const e=n._freezeSettings(),t=Wi(n._databaseId);return new pI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function mI(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);Hf("Data must be an object, but it was:",a,r);const c=qf(r,a);let u,h;if(i.merge)u=new ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const I=Zi(e,m,t);if(!a.contains(I))throw new $(C.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);vI(f,I)||f.push(I)}u=new ot(f),h=a.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=a.fieldTransforms;return new fI(new tt(c),u,h)}class fc extends hc{_toFieldTransform(e){return new nw(e.path,new is)}isEqual(e){return e instanceof fc}}function gI(n,e,t,r=!1){return pc(t,n.V(r?4:3,e))}function pc(n,e){if(zf(n=Ae(n)))return Hf("Unsupported field value:",e,n),qf(n,e);if(n instanceof hc)return(function(r,s){if(!Bf(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let u=pc(c,s.Sc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Ae(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZE(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ie.fromDate(r);return{timestampValue:wi(s.serializer,i)}}if(r instanceof ie){const i=new ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wi(s.serializer,i)}}if(r instanceof Tt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof nt)return{bytesValue:lf(s.serializer,r._byteString)};if(r instanceof _e){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ga(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ct)return(function(a,c){const u=a instanceof ct?a.toArray():a;return{mapValue:{fields:{[Ld]:{stringValue:$d},[mi]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return zi(c.serializer,f)}))}}}}}})(r,s);if(gf(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Li(r)}`)})(n,e)}function qf(n,e){const t={};return xd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Vn(n,((r,s)=>{const i=pc(s,e.gc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function zf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof Tt||n instanceof nt||n instanceof _e||n instanceof hc||n instanceof ct||gf(n))}function Hf(n,e,t){if(!zf(t)||!Pd(t)){const r=Li(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function Zi(n,e,t){if((e=Ae(e))instanceof Uf)return e._internalPath;if(typeof e=="string")return yI(n,e);throw Si("Field path arguments must be of type string or ",n,!1,void 0,t)}const _I=new RegExp("[~\\*/\\[\\]]");function yI(n,e,t){if(e.search(_I)>=0)throw Si(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Uf(...e.split("."))._internalPath}catch{throw Si(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Si(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new $(C.INVALID_ARGUMENT,c+n+u)}function vI(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{convertValue(e,t="none"){switch(sn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Vn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[mi].arrayValue?.values?.map((r=>ge(r.doubleValue)));return new ct(t)}convertGeoPoint(e){return new Tt(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ui(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(es(e));default:return null}}convertTimestamp(e){const t=nn(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=oe.fromString(e);re(mf(r),9688,{name:e});const s=new ts(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(t)||Mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc extends EI{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}function nh(){return new fc("serverTimestamp")}const rh="@firebase/firestore",sh="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ih(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new wI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Zi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class wI extends Gf{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new $(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gc{}class _c extends gc{}function eo(n,e,...t){let r=[];e instanceof gc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof vc)).length,c=i.filter((u=>u instanceof yc)).length;if(a>1||a>0&&c>0)throw new $(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class yc extends _c{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new yc(e,t,r)}_apply(e){const t=this._parse(e);return Qf(e._query,t),new $t(e.firestore,e.converter,sa(e._query,t))}_parse(e){const t=jf(e.firestore);return(function(i,a,c,u,h,f,m){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new $(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ah(m,f);const R=[];for(const x of m)R.push(oh(u,i,x));I={arrayValue:{values:R}}}else I=oh(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ah(m,f),I=gI(c,a,m,f==="in"||f==="not-in");return ve.create(h,f,I)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class vc extends gc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ut.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Qf(a,u),a=sa(a,u)})(e._query,t),new $t(e.firestore,e.converter,sa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ec extends _c{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ec(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new $(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new $(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ss(i,a)})(e._query,this._field,this._direction);return new $t(e.firestore,e.converter,HE(e._query,t))}}function to(n,e="asc"){const t=e,r=Zi("orderBy",n);return Ec._create(r,t)}class wc extends _c{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new wc(e,t,r)}_apply(e){return new $t(e.firestore,e.converter,_i(e._query,this._limit,this._limitType))}}function Kf(n){return wc._create("limit",n,"F")}function oh(n,e,t){if(typeof(t=Ae(t))=="string"){if(t==="")throw new $(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wd(e)&&t.indexOf("/")!==-1)throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(oe.fromString(t));if(!U.isDocumentKey(r))throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vu(n,new U(r))}if(t instanceof _e)return vu(n,t._key);throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Li(t)}.`)}function ah(n,e){if(!Array.isArray(n)||n.length===0)throw new $(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Qf(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new $(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new $(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function TI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Fr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class An extends Gf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ei(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Zi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new $(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=An._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}An._jsonSchemaVersion="firestore/documentSnapshot/1.0",An._jsonSchema={type:Ee("string",An._jsonSchemaVersion),bundleSource:Ee("string","DocumentSnapshot"),bundleName:Ee("string"),bundle:Ee("string")};class ei extends An{data(e={}){return super.data(e)}}class Sn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Fr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ei(this._firestore,this._userDataWriter,r.key,r,new Fr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new $(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new ei(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ei(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:II(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new $(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Sn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Oa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function II(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Sn._jsonSchemaVersion="firestore/querySnapshot/1.0",Sn._jsonSchema={type:Ee("string",Sn._jsonSchemaVersion),bundleSource:Ee("string","QuerySnapshot"),bundleName:Ee("string"),bundle:Ee("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(n){n=yt(n,_e);const e=yt(n.firestore,Nn),t=Xi(e);return sI(t,n._key).then((r=>Zf(e,n,r)))}function Jf(n){n=yt(n,$t);const e=yt(n.firestore,Nn),t=Xi(e),r=new mc(e);return Wf(n._query),iI(t,n._query).then((s=>new Sn(e,r,n,s)))}function AI(n,e,t){n=yt(n,_e);const r=yt(n.firestore,Nn),s=TI(n.converter,e),i=jf(r);return Xf(r,[mI(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Et.none())])}function Yf(n){return Xf(yt(n.firestore,Nn),[new qa(n._key,Et.none())])}function Tc(n,...e){n=Ae(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ih(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ih(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,a,c;if(n instanceof _e)a=yt(n.firestore,Nn),c=Bi(n._key.path),i={next:h=>{e[r]&&e[r](Zf(a,n,h))},error:e[r+1],complete:e[r+2]};else{const h=yt(n,$t);a=yt(h.firestore,Nn),c=h._query;const f=new mc(a);i={next:m=>{e[r]&&e[r](new Sn(a,f,h,m))},error:e[r+1],complete:e[r+2]},Wf(n._query)}const u=Xi(a);return rI(u,c,s,i)}function Xf(n,e){const t=Xi(n);return oI(t,e)}function Zf(n,e,t){const r=t.docs.get(e._key),s=new mc(n);return new An(n,s,e._key,r,new Fr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){iE(cr),Cn(new en("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Nn(new cE(r.getProvider("auth-internal")),new hE(a,r.getProvider("app-check-internal")),CE(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),gt(rh,sh,e),gt(rh,sh,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SI="type.googleapis.com/google.protobuf.Int64Value",RI="type.googleapis.com/google.protobuf.UInt64Value";function ep(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Ri(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Ri(e));if(typeof n=="function"||typeof n=="object")return ep(n,e=>Ri(e));throw new Error("Data cannot be encoded in JSON: "+n)}function or(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case SI:case RI:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>or(e)):typeof n=="function"||typeof n=="object"?ep(n,e=>or(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Je extends ht{constructor(e,t,r){super(`${Ic}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,Je.prototype)}}function CI(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Ci(n,e){let t=CI(n),r=t,s;try{const i=e&&e.error;if(i){const a=i.status;if(typeof a=="string"){if(!ch[a])return new Je("internal","internal");t=ch[a],r=a}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=or(s))}}catch{}return t==="ok"?null:new Je(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Qe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{return(await this.auth.getToken())?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="us-central1",kI=/^data: (.*?)(?:\n|$)/;function xI(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Je("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class NI{constructor(e,t,r,s,i=ma,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new PI(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=ma}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function DI(n,e,t){const r=Dn(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&Ea(n.emulatorOrigin+"/backends")}function VI(n,e,t){const r=s=>MI(n,e,s,{});return r.stream=(s,i)=>$I(n,e,s,i),r}function tp(n){return n.emulatorOrigin&&Dn(n.emulatorOrigin)?"include":void 0}async function OI(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:tp(s)})}catch{return{status:0,json:null}}let a=null;try{a=await i.json()}catch{}return{status:i.status,json:a}}async function np(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function MI(n,e,t,r){const s=n._url(e);return LI(n,s,t,r)}async function LI(n,e,t,r){t=Ri(t);const s={data:t},i=await np(n,r),a=r.timeout||7e4,c=xI(a),u=await Promise.race([OI(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new Je("cancelled","Firebase Functions instance was deleted.");const h=Ci(u.status,u.json);if(h)throw h;if(!u.json)throw new Je("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new Je("internal","Response is missing data field.");return{data:or(f)}}function $I(n,e,t,r){const s=n._url(e);return FI(n,s,t,r||{})}async function FI(n,e,t,r){t=Ri(t);const s={data:t},i=await np(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let a;try{a=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r?.signal,credentials:tp(n)})}catch(I){if(I instanceof Error&&I.name==="AbortError"){const R=new Je("cancelled","Request was cancelled.");return{data:Promise.reject(R),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(R)}}}}}}const A=Ci(0,null);return{data:Promise.reject(A),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(A)}}}}}}let c,u;const h=new Promise((I,A)=>{c=I,u=A});r?.signal?.addEventListener("abort",()=>{const I=new Je("cancelled","Request was cancelled.");u(I)});const f=a.body.getReader(),m=UI(f,c,u,r?.signal);return{stream:{[Symbol.asyncIterator](){const I=m.getReader();return{async next(){const{value:A,done:R}=await I.read();return{value:A,done:R}},async return(){return await I.cancel(),{done:!0,value:void 0}}}}},data:h}}function UI(n,e,t,r){const s=(a,c)=>{const u=a.match(kI);if(!u)return;const h=u[1];try{const f=JSON.parse(h);if("result"in f){e(or(f.result));return}if("message"in f){c.enqueue(or(f.message));return}if("error"in f){const m=Ci(0,f);c.error(m),t(m);return}}catch(f){if(f instanceof Je){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r?.aborted){const h=new Je("cancelled","Request was cancelled");return a.error(h),t(h),Promise.resolve()}try{const{value:h,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),a),a.close();return}if(r?.aborted){const I=new Je("cancelled","Request was cancelled");a.error(I),t(I),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const I of m)I.trim()&&s(I.trim(),a);return u()}catch(h){const f=h instanceof Je?h:Ci(0,null);a.error(f),t(f)}}},cancel(){return n.cancel()}})}const lh="@firebase/functions",uh="0.13.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI="auth-internal",jI="app-check-internal",qI="messaging-internal";function zI(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(BI),a=t.getProvider(qI),c=t.getProvider(jI);return new NI(s,i,a,c,r)};Cn(new en(Ic,e,"PUBLIC").setMultipleInstances(!0)),gt(lh,uh,n),gt(lh,uh,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(n=Ia(),e=ma){const r=Di(Ae(n),Ic).getImmediate({identifier:e}),s=pg("functions");return s&&GI(r,...s),r}function GI(n,e,t){DI(Ae(n),e,t)}function no(n,e,t){return VI(Ae(n),e)}zI();const Ur={apiKey:"AIzaSyBdkhrlBR-Q2S19LJAPA8WsMBXYcLUP_pA",authDomain:typeof window<"u"&&window.location.hostname==="meal.amritr.xyz"?"meal.amritr.xyz":"meal-tracker-46346.firebaseapp.com",projectId:"meal-tracker-46346",storageBucket:"meal-tracker-46346.firebasestorage.app",messagingSenderId:"134287587849",appId:"1:134287587849:web:1bab3a94fa9c197e6896d8",measurementId:""},WI=!!(Ur.apiKey&&Ur.authDomain&&Ur.projectId&&Ur.appId),bc=k_().length?Ia():$h(Ur),er=tE(bc),pn=uI(bc,{experimentalForceLongPolling:!0}),ro=HI(bc),KI={"auth/email-already-in-use":"An account already exists for that email address.","auth/invalid-credential":"Email or password is incorrect.","auth/invalid-email":"Enter a valid email address.","auth/network-request-failed":"The sign-in service could not be reached. Try again shortly.","auth/operation-not-allowed":"This sign-in method is not enabled for this app.","auth/popup-closed-by-user":"Google sign-in was closed before it finished.","auth/popup-blocked":"The browser blocked the Google sign-in popup.","auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.","auth/unauthorized-domain":"This domain is not authorized for Firebase sign-in.","auth/user-disabled":"This account has been disabled.","auth/weak-password":"Use a password with at least 6 characters.","functions/failed-precondition":"The request cannot be completed yet.","functions/invalid-argument":"Some submitted information is invalid.","functions/not-found":"The requested record was not found.","functions/permission-denied":"You do not have access to that record.","functions/resource-exhausted":"The request is too large or the service is busy.","functions/unauthenticated":"Sign in before making changes.","permission-denied":"You do not have access to this data.",unavailable:"The service is temporarily unavailable. Try again shortly."};function Ye(n,e){return n instanceof ht?KI[n.code]??n.message??e:n instanceof Error&&n.message||e}var QI=j('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="grid size-11 place-items-center rounded-lg bg-brand text-background"></div><div><h1 class="text-xl font-semibold">Meal Signal</h1><p class="text-sm text-muted">Private meal and symptom tracking</p></div></div><form class="grid gap-4"><label class="grid gap-1 text-sm font-medium text-muted-strong">Email<span class=relative><input class="h-11 w-full rounded-lg border border-border-strong bg-surface pl-10 pr-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=email autocomplete=email required></span></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Password<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=password minlength=6 required></label><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"></button></form><div class="my-4 flex items-center gap-3 text-xs font-medium uppercase text-muted"><span class="h-px flex-1 bg-border"></span>Or<span class="h-px flex-1 bg-border"></span></div><button type=button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60">Continue with Google</button><button type=button class="mt-4 w-full text-center text-sm font-medium text-brand">'),JI=j('<p class="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger"aria-live=polite>');function YI(n){const[e,t]=Y("signin"),[r,s]=Y(""),[i,a]=Y(""),[c,u]=Y(!1),[h,f]=Y("");async function m(A){A.preventDefault(),u(!0),f("");try{if(e()==="signin"){const R=await Uy(er,r(),i());n.onAuthenticated?.(R.user)}else{const R=await Fy(er,r(),i());n.onAuthenticated?.(R.user)}}catch(R){f(Ye(R,"Authentication failed."))}finally{u(!1)}}async function I(){u(!0),f("");try{const A=new St;A.setCustomParameters({prompt:"select_account"});const R=await uv(er,A);n.onAuthenticated?.(R.user)}catch(A){f(Ye(A,"Google sign-in failed."))}finally{u(!1)}}return(()=>{var A=QI(),R=A.firstChild,x=R.firstChild,N=x.firstChild,D=x.nextSibling,F=D.firstChild,M=F.firstChild,W=M.nextSibling,q=W.firstChild,z=F.nextSibling,w=z.firstChild,_=w.nextSibling,y=z.nextSibling,E=D.nextSibling,v=E.nextSibling;v.firstChild;var T=v.nextSibling;return k(N,V(Kr,{size:20,"aria-hidden":!0})),D.addEventListener("submit",m),k(W,V(Km,{class:"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",size:17,"aria-hidden":!0}),q),q.$$input=g=>s(g.target.value),_.$$input=g=>a(g.target.value),k(D,(()=>{var g=Fe(()=>!!h());return()=>g()?(()=>{var B=JI();return k(B,h),B})():null})(),y),k(y,(()=>{var g=Fe(()=>!!c());return()=>g()?"Working...":e()==="signin"?"Sign in":"Create account"})(),null),k(y,V(Pl,{size:17,"aria-hidden":!0}),null),v.$$click=I,k(v,V(Pl,{size:17,"aria-hidden":!0}),null),T.$$click=()=>t(e()==="signin"?"signup":"signin"),k(T,()=>e()==="signin"?"Create a new account":"Sign in instead"),ue(g=>{var B=e()==="signin"?"current-password":"new-password",ae=c(),Ge=c();return B!==g.e&&ne(_,"autocomplete",g.e=B),ae!==g.t&&(y.disabled=g.t=ae),Ge!==g.a&&(v.disabled=g.a=Ge),g},{e:void 0,t:void 0,a:void 0}),ue(()=>q.value=r()),ue(()=>_.value=i()),A})()}un(["input","click"]);const XI=no(ro,"createMeal"),ZI=no(ro,"createGiEvent"),eb=no(ro,"analyzeCorrelations"),tb=no(ro,"reanalyzeMeal");async function nb(n){return(await XI(n)).data.meal}async function rb(n){return(await ZI(n)).data.event}async function sb(){return(await eb()).data.analysis}async function ib(n){return(await tb({mealId:n})).data.meal}function Pi(n){const e=n.getTimezoneOffset();return new Date(n.getTime()-e*6e4).toISOString().slice(0,16)}function hh(n){const e=Date.now()-n.getTime(),t=Math.round(e/6e4);if(t<1)return"just now";if(t<60)return`${t}m ago`;const r=Math.round(t/60);if(r<24)return`${r}h ago`;const s=Math.round(r/24);return s<7?`${s}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===new Date().getFullYear()?void 0:"numeric"})}const ob=["cramping","bloating","reflux","nausea","diarrhea","constipation","gas","pain"],dh=5*1024*1024;var rp=j("<button type=button>"),ab=j('<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),sp=j("<p aria-live=polite>"),cb=j('<div class="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-sm"><div class="mb-2 text-brand"></div><p class="truncate text-xs font-medium uppercase text-muted"></p><p class="truncate text-lg font-semibold">'),lb=j("<div>"),ub=j('<div class="grid place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-muted"><div class="mb-2 text-muted"></div><p class="text-sm font-medium">'),hb=j('<main class="grid min-h-screen place-items-center bg-background text-muted-strong">'),db=j('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><h1 class="mb-2 text-lg font-semibold">Firebase config missing</h1><p class="text-sm text-muted-strong">Add the Firebase Web App values to `.env.local` or the Vite environment variables.');function fh({active:n,children:e,icon:t,onClick:r}){return(()=>{var s=rp();return ya(s,"click",r,!0),k(s,t,null),k(s,e,null),ue(i=>ar(s,{"flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition":!0,"bg-brand text-background shadow-sm":n,"text-muted-strong hover:bg-surface-muted":!n},i)),s})()}function Uo({active:n,children:e,icon:t,onClick:r}){return(()=>{var s=rp();return ya(s,"click",r,!0),k(s,t,null),k(s,e,null),ue(i=>ar(s,{"flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition":!0,"border-brand bg-brand text-background":n,"border-border-strong bg-surface text-muted-strong hover:border-muted":!n},i)),s})()}function ip({busy:n,disabled:e,label:t,message:r,tone:s="info"}){const i=s==="error"?"text-danger":s==="success"?"text-brand":"text-muted-strong";return(()=>{var a=ab(),c=a.firstChild;return c.disabled=e,k(c,n?"Saving...":t,null),k(c,n?V(xi,{class:"animate-spin",size:16,"aria-hidden":!0}):V(Rh,{size:16,"aria-hidden":!0}),null),k(a,r?(()=>{var u=sp();return _a(u,`text-sm ${i}`),k(u,r),u})():null,null),a})()}function Bo({icon:n,label:e,value:t}){return(()=>{var r=cb(),s=r.firstChild,i=s.nextSibling,a=i.nextSibling;return k(s,n),k(i,e),k(a,t),r})()}function ph({ready:n,label:e}){return(()=>{var t=lb();return k(t,n?V(Rh,{size:16,"aria-hidden":!0}):V(Ch,{size:16,"aria-hidden":!0}),null),k(t,n?e:"No media selected",null),ue(r=>ar(t,{"flex items-center gap-2 text-sm":!0,"text-brand":n,"text-muted":!n},r)),t})()}function op({icon:n,title:e}){return(()=>{var t=ub(),r=t.firstChild,s=r.nextSibling;return k(r,n),k(s,e),t})()}function Ac({children:n,tone:e="info"}){const t=e==="error"?"border-danger/30 bg-danger-soft text-danger-strong":"border-border bg-surface-muted text-muted-strong";return(()=>{var r=sp();return _a(r,`rounded-lg border px-3 py-2 text-sm ${t}`),k(r,n),r})()}function fb(){return(()=>{var n=hb();return k(n,V(xi,{class:"animate-spin",size:22,"aria-label":"Loading"})),n})()}function pb(){return db()}un(["click"]);var mb=j('<svg class="h-12 w-20 shrink-0"viewBox="0 0 80 48"role=img>'),gb=j("<svg><circle cx=22 cy=26 r=7 stroke-width=2></svg>",!1,!0,!1),_b=j("<svg><circle cx=38 cy=20 r=6 stroke-width=2></svg>",!1,!0,!1),yb=j("<svg><circle cx=52 cy=29 r=7 stroke-width=2></svg>",!1,!0,!1),vb=j("<svg><circle cx=62 cy=18 r=5 stroke-width=2></svg>",!1,!0,!1),Eb=j("<svg><ellipse cx=40 cy=25 rx=29 ry=11 stroke-width=2></svg>",!1,!0,!1),wb=j('<svg><path d="M18 24c8-8 16 7 24-1s14 6 22-1"fill=none stroke=#f3efe7 stroke-width=3></svg>',!1,!0,!1),Tb=j("<svg><ellipse cx=40 cy=25 rx=30 ry=10 stroke-width=2></svg>",!1,!0,!1),Ib=j('<svg><path d="M25 18l5 8M40 16l-3 10M53 19l-5 8"stroke=#f3efe7 stroke-width=3 stroke-linecap=round></svg>',!1,!0,!1),bb=j('<svg><path d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"stroke-width=2></svg>',!1,!0,!1),Ab=j("<svg><ellipse cx=24 cy=27 rx=11 ry=9 stroke-width=2></svg>",!1,!0,!1),Sb=j("<svg><ellipse cx=43 cy=22 rx=12 ry=9 stroke-width=2></svg>",!1,!0,!1),Rb=j("<svg><ellipse cx=57 cy=31 rx=10 ry=8 stroke-width=2></svg>",!1,!0,!1),Cb=j('<svg><path d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z"stroke-width=2></svg>',!1,!0,!1),Pb=j('<svg><path d="M29 22l-6 5M43 20l4 6M53 33l-7 4"stroke=#f3efe7 stroke-width=2 stroke-linecap=round></svg>',!1,!0,!1),kb=j("<svg><ellipse cx=40 cy=29 rx=31 ry=10 fill=#8b6f47 opacity=0.55></svg>",!1,!0,!1),xb=j("<svg><ellipse cx=31 cy=26 rx=9 ry=4 opacity=0.7></svg>",!1,!0,!1),Nb=j("<svg><ellipse cx=52 cy=31 rx=11 ry=4 opacity=0.6></svg>",!1,!0,!1),Db=j('<svg><path d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"stroke-width=2></svg>',!1,!0,!1),Vb=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">GI event</h2><p class="text-sm text-muted">Record timing, severity, and symptoms.</p></div></div><form class="grid gap-4"><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Occurred at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Severity: <input class="h-11 accent-brand"type=range min=1 max=10></label></div><div class="grid gap-2"><span class="text-sm font-medium text-muted-strong">Symptoms</span><div class="flex flex-wrap gap-2"></div></div><div class="grid gap-4 sm:grid-cols-3"><div class="grid gap-2 text-sm font-medium text-muted-strong sm:col-span-1"><a class="w-fit underline decoration-border-strong underline-offset-4 transition hover:text-brand hover:decoration-brand"href=https://en.wikipedia.org/wiki/Bristol_stool_scale target=_blank rel=noreferrer>Stool type</a><div class="rounded-lg border border-border-strong bg-surface p-3"><div class="mb-3 flex min-h-14 items-center gap-3"><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><p class="text-base font-semibold text-foreground"></p></div><p class="line-clamp-2 text-xs font-medium text-muted"></p></div></div><input class="h-6 w-full accent-brand"type=range min=1 max=7 step=1 aria-label="Bristol stool type"><div class="mt-1 flex justify-between text-[11px] font-medium text-muted"><span>1</span><span>7</span></div></div></div><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Minutes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=number min=1 max=1440></label><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20">'),Ob=j("<button type=button>"),Mb=j('<button type=button class="rounded px-1.5 py-0.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-muted-strong">Clear');const Lb=[{value:1,label:"Separate hard lumps"},{value:2,label:"Lumpy sausage"},{value:3,label:"Cracked sausage"},{value:4,label:"Smooth soft sausage"},{value:5,label:"Soft blobs"},{value:6,label:"Mushy pieces"},{value:7,label:"Watery"}];function $b(n){const e=Number(n);return Lb.find(t=>t.value===e)??null}function Fb({type:n}){const e=n?"#5f4b32":"#d6d3d1",t=n?"#3f3323":"#a8a29e";return(()=>{var r=mb();return ne(r,"aria-label",n?`Bristol stool type ${n}`:"No stool type selected"),k(r,n===1?[(()=>{var s=gb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=_b();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=yb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=vb();return ne(s,"fill",e),ne(s,"stroke",t),s})()]:null,null),k(r,n===2?[(()=>{var s=Eb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),wb()]:null,null),k(r,n===3?[(()=>{var s=Tb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),Ib()]:null,null),k(r,n===4?(()=>{var s=bb();return ne(s,"fill",e),ne(s,"stroke",t),s})():null,null),k(r,n===5?[(()=>{var s=Ab();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Sb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Rb();return ne(s,"fill",e),ne(s,"stroke",t),s})()]:null,null),k(r,n===6?[(()=>{var s=Cb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),Pb()]:null,null),k(r,n===7?[kb(),(()=>{var s=xb();return ne(s,"fill",e),s})(),(()=>{var s=Nb();return ne(s,"fill",e),s})()]:null,null),k(r,n?null:(()=>{var s=Db();return ne(s,"fill",e),ne(s,"stroke",t),s})(),null),r})()}function Ub(){const[n,e]=Y(Pi(new Date)),[t,r]=Y(4),[s,i]=Y([]),[a,c]=Y(""),[u,h]=Y(""),[f,m]=Y(""),[I,A]=Y(!1),[R,x]=Y(""),[N,D]=Y("info"),F=()=>$b(u());function M(q){const z=s();i(z.includes(q)?z.filter(w=>w!==q):[...z,q])}async function W(q){q.preventDefault(),A(!0),x(""),D("info");const z=new Date(n());if(Number.isNaN(z.getTime())){D("error"),x("Choose a valid event time."),A(!1);return}if(s().length===0&&!u()){D("error"),x("Choose a symptom or stool type."),A(!1);return}try{await rb({occurredAt:z.toISOString(),severity:t(),symptoms:s(),notes:a().trim()||void 0,stoolType:u()?Number(u()):void 0,durationMinutes:f()?Number(f()):void 0}),e(Pi(new Date)),r(4),i([]),c(""),h(""),m(""),D("success"),x("Event saved.")}catch(w){D("error"),x(Ye(w,"Event could not be saved."))}finally{A(!1)}}return(()=>{var q=Vb(),z=q.firstChild;z.firstChild;var w=z.nextSibling,_=w.firstChild,y=_.firstChild,E=y.firstChild,v=E.nextSibling,T=y.nextSibling,g=T.firstChild,B=g.nextSibling,ae=_.nextSibling,Ge=ae.firstChild,je=Ge.nextSibling,qe=ae.nextSibling,Ve=qe.firstChild,dt=Ve.firstChild,et=dt.nextSibling,Se=et.firstChild,de=Se.firstChild,fe=de.firstChild,ke=fe.firstChild,st=fe.nextSibling,Xe=Se.nextSibling,Ft=Ve.nextSibling,$n=Ft.firstChild,Is=$n.nextSibling,io=Ft.nextSibling,bs=io.firstChild,Fn=bs.nextSibling;return k(z,V(Sh,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),w.addEventListener("submit",W),v.$$input=ce=>e(ce.target.value),k(T,t,B),B.addEventListener("change",ce=>r(Number(ce.target.value))),k(je,()=>ob.map(ce=>(()=>{var At=Ob();return At.$$click=()=>M(ce),k(At,ce),ue(mr=>ar(At,{"h-9 rounded-md border px-3 text-sm font-medium transition":!0,"border-brand bg-brand text-background":s().includes(ce),"border-border-strong bg-surface text-muted-strong hover:border-muted":!s().includes(ce)},mr)),At})())),k(Se,V(Fb,{get type(){return F()?.value??null}}),de),k(ke,(()=>{var ce=Fe(()=>!!F());return()=>ce()?`Type ${F().value}`:"Not set"})()),k(fe,(()=>{var ce=Fe(()=>!!F());return()=>ce()?(()=>{var At=Mb();return At.$$click=()=>h(""),At})():null})(),null),k(st,()=>F()?.label??"Move slider to set"),Xe.$$keydown=ce=>{!u()&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(ce.key)&&h("4")},Xe.addEventListener("change",ce=>h(ce.target.value)),Xe.$$pointerdown=()=>h(ce=>ce||"4"),Is.$$input=ce=>m(ce.target.value),Fn.$$input=ce=>c(ce.target.value),k(w,V(ip,{get busy(){return I()},get disabled(){return Fe(()=>s().length===0)()&&!u()||I()},get message(){return R()},get tone(){return N()},label:"Save event"}),null),ue(()=>v.value=n()),ue(()=>B.value=t()),ue(()=>Xe.value=u()||"4"),ue(()=>Is.value=f()),ue(()=>Fn.value=a()),q})()}un(["input","pointerdown","keydown","click"]);var Bb=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">Meal</h2><p class="text-sm text-muted">Capture what you ate and when.</p></div></div><form class="grid gap-4"><div class="grid grid-cols-3 gap-2"></div><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Eaten at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Portion, stress, meds">'),jb=j('<label class="grid gap-1 text-sm font-medium text-muted-strong">Meal text<textarea class="min-h-28 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Turkey sandwich, chips, iced coffee">'),qb=j('<div class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3"><button type=button>'),zb=j('<label class="grid gap-3 rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 text-sm font-medium text-muted-strong"><span class="flex items-center gap-2">Meal photo</span><input class="block w-full text-sm text-muted-strong file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"type=file accept=image/* capture=environment>');function Hb(){const[n,e]=Y("text"),[t,r]=Y(""),[s,i]=Y(""),[a,c]=Y(Pi(new Date)),[u,h]=Y(""),[f,m]=Y(""),[I,A]=Y(!1),[R,x]=Y(!1),[N,D]=Y(""),[F,M]=Y("info");let W=null,q=null,z=[];si(()=>{W?.stop(),q?.getTracks().forEach(v=>v.stop())});async function w(v){v.preventDefault(),x(!0),D(""),M("info");const T=new Date(a());if(Number.isNaN(T.getTime())){M("error"),D("Choose a valid meal time."),x(!1);return}try{await nb({mode:n(),text:n()==="text"?t():void 0,mediaBase64:n()==="text"?void 0:u(),mimeType:n()==="text"?void 0:f(),eatenAt:T.toISOString(),notes:s().trim()||void 0}),r(""),i(""),h(""),m(""),c(Pi(new Date)),M("success"),D("Meal saved.")}catch(g){M("error"),D(Ye(g,"Meal could not be saved."))}finally{x(!1)}}async function _(v){if(D(""),M("info"),!!v){if(v.size>dh){h(""),m(""),M("error"),D("Use an image smaller than 5 MB.");return}try{const T=await Gb(v);h(T),m(v.type),M("success"),D("Image ready.")}catch(T){M("error"),D(Ye(T,"Image could not be read."))}}}async function y(){if(D(""),M("info"),I()){W?.stop();return}if(!navigator.mediaDevices?.getUserMedia){M("error"),D("Audio recording is not available in this browser.");return}try{const v=await navigator.mediaDevices.getUserMedia({audio:!0}),T=new MediaRecorder(v);z=[],W=T,q=v,T.ondataavailable=g=>{g.data.size&&z.push(g.data)},T.onerror=()=>{M("error"),D("Audio recording failed.")},T.onstop=async()=>{const g=new Blob(z,{type:T.mimeType||"audio/webm"});if(q?.getTracks().forEach(B=>B.stop()),q=null,A(!1),g.size>dh){h(""),m(""),M("error"),D("Use a shorter recording under 5 MB.");return}try{h(await ap(g)),m(g.type),M("success"),D("Audio ready.")}catch(B){M("error"),D(Ye(B,"Audio could not be prepared."))}},T.start(),A(!0)}catch(v){M("error"),D(Ye(v,"Microphone access was not granted."))}}const E=()=>n()==="text"?t().trim().length>2:u().length>0&&f().length>0;return(()=>{var v=Bb(),T=v.firstChild;T.firstChild;var g=T.nextSibling,B=g.firstChild,ae=B.nextSibling,Ge=ae.firstChild,je=Ge.firstChild,qe=je.nextSibling,Ve=Ge.nextSibling,dt=Ve.firstChild,et=dt.nextSibling;return k(T,V(Kr,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),g.addEventListener("submit",w),k(B,V(Uo,{get active(){return n()==="text"},onClick:()=>e("text"),get icon(){return V(Kr,{size:17})},children:"Text"}),null),k(B,V(Uo,{get active(){return n()==="voice"},onClick:()=>e("voice"),get icon(){return V(kl,{size:17})},children:"Voice"}),null),k(B,V(Uo,{get active(){return n()==="image"},onClick:()=>e("image"),get icon(){return V(Cl,{size:17})},children:"Image"}),null),k(g,(()=>{var Se=Fe(()=>n()==="text");return()=>Se()?(()=>{var de=jb(),fe=de.firstChild,ke=fe.nextSibling;return ke.$$input=st=>r(st.target.value),ue(()=>ke.value=t()),de})():Fe(()=>n()==="voice")()?(()=>{var de=qb(),fe=de.firstChild;return fe.$$click=y,k(fe,V(kl,{size:18,"aria-hidden":!0}),null),k(fe,(()=>{var ke=Fe(()=>!!I());return()=>ke()?"Stop recording":u()?"Record again":"Record"})(),null),k(de,V(ph,{get ready(){return!!u()},label:"Audio ready"}),null),ue(ke=>ar(fe,{"flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition":!0,"bg-danger text-background hover:bg-danger-strong":I(),"bg-brand text-background hover:bg-brand-hover":!I()},ke)),de})():(()=>{var de=zb(),fe=de.firstChild,ke=fe.firstChild,st=fe.nextSibling;return k(fe,V(Cl,{size:18,"aria-hidden":!0}),ke),st.addEventListener("change",Xe=>_(Xe.target.files?.[0])),k(de,V(ph,{get ready(){return!!u()},label:"Image ready"}),null),de})()})(),ae),qe.$$input=Se=>c(Se.target.value),et.$$input=Se=>i(Se.target.value),k(g,V(ip,{get busy(){return R()},get disabled(){return!E()||R()},get message(){return N()},get tone(){return F()},label:"Save meal"}),null),ue(()=>qe.value=a()),ue(()=>et.value=s()),v})()}function Gb(n){return ap(n)}function ap(n){return new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=String(r.result??"");e(s.includes(",")?s.split(",")[1]:s)},r.onerror=()=>t(r.error),r.readAsDataURL(n)})}un(["input","click"]);function In(n){return n?n.toISOString():void 0}function Te(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Wb(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"meal"}function Sc(n){return{...n,eatenAt:In(n.eatenAt),createdAt:In(n.createdAt),updatedAt:In(n.updatedAt),reanalyzedAt:In(n.reanalyzedAt)}}function Kb(n){return{...n,occurredAt:In(n.occurredAt),createdAt:In(n.createdAt)}}function Qb(n){return n?{...n,generatedAt:In(n.generatedAt)}:null}function so(n,e,t){const r=new Blob([t],{type:e}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=n,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function Jb(n){const e=Wb(n.analysis.mealName||n.id);so(`meal-signal-meal-${e}-${n.eatenAt.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),meal:Sc(n)},null,2))}function Yb(n){so(`meal-signal-meals-${new Date().toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),mealCount:n.length,meals:n.map(Sc)},null,2))}function Xb({analysis:n,meals:e,events:t,exportedAt:r=new Date}){so(`meal-signal-analysis-${r.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:r.toISOString(),analysis:Qb(n),meals:e.map(Sc),giEvents:t.map(Kb)},null,2))}function Zb({analysis:n,meals:e,events:t,exportedAt:r=new Date}){const s=n?.findings??[],i=n?.dataQualityNotes??[],a=e.slice(0,50),c=t.slice(0,50),u=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meal Signal Analysis Export</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #171717; background: #ffffff; }
    body { margin: 0; padding: 32px; line-height: 1.45; }
    main { max-width: 920px; margin: 0 auto; }
    h1, h2, h3 { margin: 0; line-height: 1.2; }
    h1 { font-size: 28px; }
    h2 { margin-top: 32px; padding-top: 18px; border-top: 1px solid #d7d7d7; font-size: 18px; }
    h3 { font-size: 15px; }
    p { margin: 6px 0 0; }
    .muted { color: #616161; font-size: 13px; }
    .summary { margin-top: 18px; padding: 16px; border: 1px solid #d7d7d7; border-radius: 8px; background: #f7f7f2; }
    .grid { display: grid; gap: 12px; }
    .card { break-inside: avoid; padding: 14px; border: 1px solid #d7d7d7; border-radius: 8px; }
    .row { display: flex; justify-content: space-between; gap: 16px; }
    .pill { display: inline-block; margin: 6px 6px 0 0; padding: 3px 7px; border-radius: 5px; background: #ecebe3; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
    th, td { text-align: left; vertical-align: top; border-bottom: 1px solid #e2e2e2; padding: 8px 6px; }
    th { font-size: 12px; text-transform: uppercase; color: #616161; }
    @media print { body { padding: 18px; } .card, .summary { break-inside: avoid; } }
  </style>
</head>
<body>
  <main>
    <h1>Meal Signal Analysis</h1>
    <p class="muted">Exported ${Te(r.toLocaleString())}${n?` · analysis generated ${Te(n.generatedAt.toLocaleString())}`:""}</p>
    <div class="summary">
      <h2 style="margin-top:0;padding-top:0;border-top:0;">Summary</h2>
      <p>${Te(n?.summary??"No analysis has been generated yet.")}</p>
      <p class="muted">${e.length} meals and ${t.length} GI events included in this export.</p>
    </div>

    <h2>Findings</h2>
    <div class="grid">
      ${s.length?s.map(h=>`<article class="card">
        <div class="row"><h3>${Te(h.irritant)}</h3><strong>${Te(Math.round(h.confidence*100))}%</strong></div>
        <p class="muted">${Te(h.direction.replaceAll("_"," "))} within ${Te(h.windowHours)}h</p>
        <p>${Te(h.evidence)}</p>
        <p><strong>${Te(h.suggestedAction)}</strong></p>
      </article>`).join(""):'<p class="muted">No findings available.</p>'}
    </div>

    <h2>Data Notes</h2>
    ${i.length?`<ul>${i.map(h=>`<li>${Te(h)}</li>`).join("")}</ul>`:'<p class="muted">No data quality notes.</p>'}

    <h2>Recent Meals</h2>
    <table>
      <thead><tr><th>When</th><th>Meal</th><th>Foods</th><th>Irritants</th></tr></thead>
      <tbody>
        ${a.map(h=>`<tr>
          <td>${Te(h.eatenAt.toLocaleString())}</td>
          <td><strong>${Te(h.analysis.mealName)}</strong><br><span class="muted">${Te(h.interpretedText)}</span></td>
          <td>${Te(h.analysis.foods.join(", ")||"None")}</td>
          <td>${h.analysis.irritants.map(f=>`<span class="pill">${Te(f.name)}</span>`).join("")||"None"}</td>
        </tr>`).join("")}
      </tbody>
    </table>

    <h2>Recent GI Events</h2>
    <table>
      <thead><tr><th>When</th><th>Severity</th><th>Details</th><th>Notes</th></tr></thead>
      <tbody>
        ${c.map(h=>`<tr>
          <td>${Te(h.occurredAt.toLocaleString())}</td>
          <td>${Te(h.severity)}</td>
          <td>${Te([...h.symptoms,h.stoolType?`stool type ${h.stoolType}`:""].filter(Boolean).join(", ")||"No details recorded")}</td>
          <td>${Te(h.notes??"")}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </main>
</body>
</html>`;so(`meal-signal-analysis-${r.toISOString().slice(0,10)}.html`,"text/html",u)}function bn(n){if(n instanceof ie)return n.toDate();if(n instanceof Date)return n;if(typeof n=="string"){const e=new Date(n);return Number.isNaN(e.getTime())?new Date:e}return new Date}function cp(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function lp(n){const e=n.data();return{id:n.id,uid:e.uid,inputMode:e.inputMode,rawInput:e.rawInput??"",interpretedText:e.interpretedText??"",eatenAt:bn(e.eatenAt),notes:e.notes,status:e.status??"needs_review",analysis:e.analysis??{mealName:"Meal",foods:[],irritants:[],summary:""},createdAt:bn(e.createdAt),updatedAt:bn(e.updatedAt),reanalyzedAt:e.reanalyzedAt?bn(e.reanalyzedAt):void 0}}function up(n){const e=n.data();return{id:n.id,uid:e.uid,occurredAt:bn(e.occurredAt),severity:e.severity??1,symptoms:cp(e.symptoms),notes:e.notes,stoolType:e.stoolType,durationMinutes:e.durationMinutes,createdAt:bn(e.createdAt)}}function eA(n){const e=n.data();return{id:n.id,uid:e.uid,status:e.status??"insufficient_data",generatedAt:bn(e.generatedAt),mealCount:e.mealCount??0,eventCount:e.eventCount??0,summary:e.summary??"No analysis has been generated yet.",findings:Array.isArray(e.findings)?e.findings:[],dataQualityNotes:cp(e.dataQualityNotes)}}async function tA(n){const e=Yi(pn,"users",n.uid),t=await bI(e),r=t.exists()?t.data().createdAt:null;await AI(e,{uid:n.uid,email:n.email,displayName:n.displayName,updatedAt:nh(),createdAt:r instanceof ie?r:nh()})}async function nA(n,e){await Yf(Yi(pn,"users",n,"meals",e))}async function rA(n,e){await Yf(Yi(pn,"users",n,"events",e))}async function sA(n){const e=eo(Ji(pn,"users",n,"meals"),to("eatenAt","desc"));return(await Jf(e)).docs.map(lp)}async function iA(n){const e=eo(Ji(pn,"users",n,"events"),to("occurredAt","desc"));return(await Jf(e)).docs.map(up)}function oA(n,e,t){const r=eo(Ji(pn,"users",n,"meals"),to("eatenAt","desc"),Kf(25));return Tc(r,s=>e(s.docs.map(lp)),t)}function aA(n,e,t){const r=eo(Ji(pn,"users",n,"events"),to("occurredAt","desc"),Kf(25));return Tc(r,s=>e(s.docs.map(up)),t)}function cA(n,e,t){return Tc(Yi(pn,"users",n,"analyses","current"),r=>e(r.exists()?eA(r):null),t)}var lA=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 class="text-lg font-semibold">Correlation analysis</h2><p class="text-sm text-muted"></p></div><div class="flex flex-wrap items-center gap-2"><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis HTML"title="Export analysis HTML"></button><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis JSON"title="Export analysis JSON"></button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export all meals JSON"title="Export all meals JSON">Meals</button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),uA=j("<div class=mb-4>"),hA=j('<div class="grid gap-4"><div class="rounded-lg bg-surface-accent p-4"><p class="text-sm font-medium text-brand"></p><p class="mt-2 text-xs text-muted-strong"> meals, <!> GI events</p></div><div class="grid gap-3">'),dA=j('<article class="rounded-lg border border-border p-4"><div class="flex items-start justify-between gap-3"><div><h3 class=font-semibold></h3><p class="text-sm text-muted"> within <!>h</p></div><span class="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">%</span></div><p class="mt-3 text-sm text-muted-strong"></p><p class="mt-2 text-sm font-medium text-brand">'),fA=j('<div class="rounded-lg border border-warning-border bg-warning-soft p-4"><div class="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">Data notes</div><ul class="grid gap-1 text-sm text-warning">'),pA=j("<li>");function mA({uid:n,analysis:e,mealCount:t,eventCount:r}){const[s,i]=Y(!1),[a,c]=Y(""),[u,h]=Y(""),[f,m]=Y(!1);async function I(){i(!0),h(""),m(!1);try{await sb(),h("Analysis queued.")}catch(x){m(!0),h(Ye(x,"Analysis could not be started."))}finally{i(!1)}}async function A(){const[x,N]=await Promise.all([sA(n),iA(n)]);return{meals:x,events:N}}async function R(x){c(x),h(""),m(!1);try{const{meals:N,events:D}=await A();x==="analysis-html"?(Zb({analysis:e,meals:N,events:D}),h("Analysis HTML exported.")):x==="analysis-json"?(Xb({analysis:e,meals:N,events:D}),h("Analysis JSON exported.")):(Yb(N),h("Meals JSON exported."))}catch(N){m(!0),h(Ye(N,"Export could not be prepared."))}finally{c("")}}return(()=>{var x=lA(),N=x.firstChild,D=N.firstChild,F=D.firstChild,M=F.nextSibling,W=D.nextSibling,q=W.firstChild,z=q.nextSibling,w=z.nextSibling,_=w.firstChild,y=w.nextSibling;return k(M,()=>e?`Updated ${e.generatedAt.toLocaleString()}`:`${t} meals and ${r} GI events available`),q.$$click=()=>R("analysis-html"),k(q,V(jm,{size:17,"aria-hidden":!0})),z.$$click=()=>R("analysis-json"),k(z,V(zo,{size:17,"aria-hidden":!0})),w.$$click=()=>R("meals-json"),k(w,V(zo,{size:16,"aria-hidden":!0}),_),y.$$click=I,k(y,V(xi,{size:16,get class(){return s()?"animate-spin":""},"aria-hidden":!0}),null),k(y,()=>s()?"Starting":"Run",null),k(x,(()=>{var E=Fe(()=>!!u());return()=>E()?(()=>{var v=uA();return k(v,V(Ac,{get tone(){return f()?"error":"info"},get children(){return u()}})),v})():null})(),null),k(x,e?(()=>{var E=hA(),v=E.firstChild,T=v.firstChild,g=T.nextSibling,B=g.firstChild,ae=B.nextSibling;ae.nextSibling;var Ge=v.nextSibling;return k(T,()=>e.summary),k(g,()=>e.mealCount,B),k(g,()=>e.eventCount,ae),k(Ge,()=>e.findings.map(je=>(()=>{var qe=dA(),Ve=qe.firstChild,dt=Ve.firstChild,et=dt.firstChild,Se=et.nextSibling,de=Se.firstChild,fe=de.nextSibling;fe.nextSibling;var ke=dt.nextSibling,st=ke.firstChild,Xe=Ve.nextSibling,Ft=Xe.nextSibling;return k(et,()=>je.irritant),k(Se,(()=>{var $n=Fe(()=>je.direction==="possible_trigger");return()=>$n()?"possible sensitivity":je.direction.replaceAll("_"," ")})(),de),k(Se,()=>je.windowHours,fe),k(ke,()=>Math.round(je.confidence*100),st),k(Xe,()=>je.evidence),k(Ft,()=>je.suggestedAction),qe})())),k(E,(()=>{var je=Fe(()=>!!e.dataQualityNotes.length);return()=>je()?(()=>{var qe=fA(),Ve=qe.firstChild,dt=Ve.firstChild,et=Ve.nextSibling;return k(Ve,V(Ch,{size:16,"aria-hidden":!0}),dt),k(et,()=>e.dataQualityNotes.map(Se=>(()=>{var de=pA();return k(de,Se),de})())),qe})():null})(),null),E})():V(op,{get icon(){return V(va,{size:22})},title:"No analysis yet"}),null),ue(E=>{var v=!!a(),T=!!a(),g=!!a(),B=s();return v!==E.e&&(q.disabled=E.e=v),T!==E.t&&(z.disabled=E.t=T),g!==E.a&&(w.disabled=E.a=g),B!==E.o&&(y.disabled=E.o=B),E},{e:void 0,t:void 0,a:void 0,o:void 0}),x})()}un(["click"]);var gA=j('<section class="grid grid-cols-3 gap-2">'),_A=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm"><div class="mb-3 flex items-center gap-2"><h2 class=font-semibold>Recent'),yA=j("<div class=mb-3>"),vA=j('<div class="grid gap-3">'),EA=j('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold"></h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Redo meal analysis"title="Redo meal analysis"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export meal JSON"title="Export meal JSON"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete meal"title="Delete meal"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 line-clamp-2 text-sm text-muted-strong"></p><div class="mt-2 flex flex-wrap gap-1">'),wA=j('<span class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong">'),TA=j('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold">Severity </h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete event"title="Delete event"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 text-sm text-muted-strong">');function IA(n){const e=[...n.symptoms];return n.stoolType&&e.push(`stool type ${n.stoolType}`),e.length?e.join(", "):"No details recorded"}function bA({meals:n,events:e,analysis:t}){const r=xt(()=>{const s=new Map;for(const i of n)for(const a of i.analysis.irritants??[])s.set(a.name,(s.get(a.name)??0)+1);return[...s.entries()].sort((i,a)=>a[1]-i[1])[0]?.[0]??"None"});return(()=>{var s=gA();return k(s,V(Bo,{get icon(){return V(Kr,{size:17})},label:"Meals",get value(){return n.length.toString()}}),null),k(s,V(Bo,{get icon(){return V(Sh,{size:17})},label:"Events",get value(){return e.length.toString()}}),null),k(s,V(Bo,{get icon(){return V(va,{size:17})},label:"Signal",get value(){return t?r():"Pending"}}),null),s})()}function AA({uid:n,meals:e,events:t}){const[r,s]=Y(""),[i,a]=Y(""),[c,u]=Y(""),[h,f]=Y(!1),m=[...e.map(R=>({kind:"meal",date:R.eatenAt,meal:R})),...t.map(R=>({kind:"event",date:R.occurredAt,event:R}))].sort((R,x)=>x.date.getTime()-R.date.getTime()).slice(0,12);async function I(R){s(R),u(""),f(!1);try{await ib(R),u("Meal analysis refreshed.")}catch(x){f(!0),u(Ye(x,"Meal analysis could not be refreshed."))}finally{s("")}}async function A(R){const x=R.kind==="meal"?"meal":"event";if(window.confirm(`Delete this ${x}? This cannot be undone.`)){a(`${R.kind}-${R.id}`),u(""),f(!1);try{R.kind==="meal"?await nA(n,R.id):await rA(n,R.id),u(`${x==="meal"?"Meal":"Event"} deleted.`)}catch(D){f(!0),u(Ye(D,`The ${x} could not be deleted.`))}finally{a("")}}}return(()=>{var R=_A(),x=R.firstChild,N=x.firstChild;return k(x,V(Rl,{size:18,class:"text-brand","aria-hidden":!0}),N),k(R,(()=>{var D=Fe(()=>!!c());return()=>D()?(()=>{var F=yA();return k(F,V(Ac,{get tone(){return h()?"error":"info"},get children(){return c()}})),F})():null})(),null),k(R,(()=>{var D=Fe(()=>!!m.length);return()=>D()?(()=>{var F=vA();return k(F,()=>m.map(M=>M.kind==="meal"?(()=>{var W=EA(),q=W.firstChild,z=q.firstChild,w=z.nextSibling,_=w.firstChild,y=_.nextSibling,E=y.nextSibling,v=E.nextSibling,T=q.nextSibling,g=T.nextSibling;return k(z,()=>M.meal.analysis.mealName),_.$$click=()=>I(M.meal.id),k(_,V(xi,{size:14,get class(){return r()===M.meal.id?"animate-spin":""},"aria-hidden":!0})),y.$$click=()=>Jb(M.meal),k(y,V(zo,{size:14,"aria-hidden":!0})),E.$$click=()=>A({kind:"meal",id:M.meal.id}),k(E,V(xl,{size:14,"aria-hidden":!0})),k(v,()=>hh(M.date)),k(T,()=>M.meal.interpretedText),k(g,()=>M.meal.analysis.irritants.slice(0,3).map(B=>(()=>{var ae=wA();return k(ae,()=>B.name),ae})())),ue(B=>{var ae=r()===M.meal.id,Ge=i()===`meal-${M.meal.id}`;return ae!==B.e&&(_.disabled=B.e=ae),Ge!==B.t&&(E.disabled=B.t=Ge),B},{e:void 0,t:void 0}),W})():(()=>{var W=TA(),q=W.firstChild,z=q.firstChild;z.firstChild;var w=z.nextSibling,_=w.firstChild,y=_.nextSibling,E=q.nextSibling;return k(z,()=>M.event.severity,null),_.$$click=()=>A({kind:"event",id:M.event.id}),k(_,V(xl,{size:14,"aria-hidden":!0})),k(y,()=>hh(M.date)),k(E,()=>IA(M.event)),ue(()=>_.disabled=i()===`event-${M.event.id}`),W})())),F})():V(op,{get icon(){return V(Rl,{size:22})},title:"No entries yet"})})(),null),R})()}un(["click"]);var SA=j('<main class="min-h-screen bg-background text-foreground"><header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"><div class="flex min-w-0 items-center gap-3"><div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"></div><div class=min-w-0><h1 class="truncate text-base font-semibold">Meal Signal</h1><p class="truncate text-sm text-muted"></p></div></div><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"aria-label="Sign out"title="Sign out"></button></div></header><div class="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section class=min-w-0><div class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm"></div></section><aside class="grid content-start gap-5">'),RA=j("<div class=mb-4>"),CA=j('<div class="grid gap-5">');function PA(){const[n,e]=Y(er.currentUser),[t,r]=Y(!0),[s,i]=Y("log"),[a,c]=Y([]),[u,h]=Y([]),[f,m]=Y(null),[I,A]=Y("");function R(N){if(e(N),r(!0),A(""),!N){c([]),h([]),m(null);return}tA(N).catch(D=>{A(Ye(D,"Your profile could not be prepared."))})}Bp(()=>{const N=qy(er,R);si(()=>N())}),yh(()=>{const N=n();if(!N)return;const D=q=>{A(Ye(q,"Live updates are temporarily unavailable."))},F=oA(N.uid,c,D),M=aA(N.uid,h,D),W=cA(N.uid,m,D);si(()=>{F(),M(),W()})});async function x(){A("");try{await zy(er)}catch(N){A(Ye(N,"Sign out failed."))}}return V(Ro,{when:WI,get fallback(){return V(pb,{})},get children(){return V(Ro,{get when(){return t()},get fallback(){return V(fb,{})},get children(){return V(Ro,{get when(){return n()},get fallback(){return V(YI,{onAuthenticated:R})},get children(){var N=SA(),D=N.firstChild,F=D.firstChild,M=F.firstChild,W=M.firstChild,q=W.nextSibling,z=q.firstChild,w=z.nextSibling,_=M.nextSibling,y=D.nextSibling,E=y.firstChild,v=E.firstChild,T=E.nextSibling;return k(W,V(Kr,{size:19,"aria-hidden":!0})),k(w,()=>n().email),_.$$click=x,k(_,V(Hm,{size:18,"aria-hidden":!0})),k(E,(()=>{var g=Fe(()=>!!I());return()=>g()?(()=>{var B=RA();return k(B,V(Ac,{tone:"error",get children(){return I()}})),B})():null})(),v),k(v,V(fh,{get active(){return s()==="log"},onClick:()=>i("log"),get icon(){return V(Zm,{size:17})},children:"Log"}),null),k(v,V(fh,{get active(){return s()==="analysis"},onClick:()=>i("analysis"),get icon(){return V(va,{size:17})},children:"Analysis"}),null),k(E,(()=>{var g=Fe(()=>s()==="log");return()=>g()?(()=>{var B=CA();return k(B,V(Hb,{}),null),k(B,V(Ub,{}),null),B})():V(mA,{get uid(){return n().uid},get analysis(){return f()},get mealCount(){return a().length},get eventCount(){return u().length}})})(),null),k(T,V(bA,{get meals(){return a()},get events(){return u()},get analysis(){return f()}}),null),k(T,V(AA,{get uid(){return n().uid},get meals(){return a()},get events(){return u()}}),null),N}})}})}})}un(["click"]);function kA(){return V(PA,{})}am(()=>V(kA,{}),document.getElementById("root"));if("serviceWorker"in navigator){let n=!0;const e=()=>{n&&navigator.serviceWorker.register("/sw.js",{scope:"/",updateViaCache:"none"}).catch(t=>{console.error("Service worker registration failed.",t)})};document.readyState==="complete"?e():window.addEventListener("load",e,{once:!0}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(n=!1)})}
