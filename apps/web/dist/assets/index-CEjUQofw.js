(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const jp=!1,qp=(n,e)=>n===e,ri=Symbol("solid-proxy"),Eh=typeof Proxy=="function",zp=Symbol("solid-track"),si={equals:qp};let wh=Sh;const ln=1,ii=2,Th={owned:null,cleanups:null,context:null,owner:null};var be=null;let xo=null,Hp=null,_e=null,Fe=null,Pt=null,Di=0;function Gs(n,e){const t=_e,r=be,s=n.length===0,i=e===void 0?r:e,a=s?Th:{owned:null,cleanups:null,context:i?i.context:null,owner:i},c=s?n:()=>n(()=>Nt(()=>Wr(a)));be=a,_e=null;try{return hs(c,!0)}finally{_e=t,be=r}}function Y(n,e){e=e?Object.assign({},si,e):si;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=s=>(typeof s=="function"&&(s=s(t.value)),Ah(t,s));return[bh.bind(t),r]}function ue(n,e,t){const r=Ta(n,e,!1,ln);us(r)}function Ih(n,e,t){wh=Qp;const r=Ta(n,e,!1,ln);r.user=!0,Pt?Pt.push(r):us(r)}function er(n,e,t){t=t?Object.assign({},si,t):si;const r=Ta(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,us(r),bh.bind(r)}function Nt(n){if(_e===null)return n();const e=_e;_e=null;try{return n()}finally{_e=e}}function Gp(n){Ih(()=>Nt(n))}function oi(n){return be===null||(be.cleanups===null?be.cleanups=[n]:be.cleanups.push(n)),n}function bh(){if(this.sources&&this.state)if(this.state===ln)us(this);else{const n=Fe;Fe=null,hs(()=>ci(this),!1),Fe=n}if(_e){const n=this.observers;if(!n||n[n.length-1]!==_e){const e=n?n.length:0;_e.sources?(_e.sources.push(this),_e.sourceSlots.push(e)):(_e.sources=[this],_e.sourceSlots=[e]),n?(n.push(_e),this.observerSlots.push(_e.sources.length-1)):(this.observers=[_e],this.observerSlots=[_e.sources.length-1])}}return this.value}function Ah(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&hs(()=>{for(let s=0;s<n.observers.length;s+=1){const i=n.observers[s],a=xo&&xo.running;a&&xo.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?Fe.push(i):Pt.push(i),i.observers&&Rh(i)),a||(i.state=ln)}if(Fe.length>1e6)throw Fe=[],new Error},!1)),e}function us(n){if(!n.fn)return;Wr(n);const e=Di;Wp(n,n.value,e)}function Wp(n,e,t){let r;const s=be,i=_e;_e=be=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=ln,n.owned&&n.owned.forEach(Wr),n.owned=null),n.updatedAt=t+1,Ch(a)}finally{_e=i,be=s}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?Ah(n,r):n.value=r,n.updatedAt=t)}function Ta(n,e,t,r=ln,s){const i={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:be,context:be?be.context:null,pure:t};return be===null||be!==Th&&(be.owned?be.owned.push(i):be.owned=[i]),i}function ai(n){if(n.state===0)return;if(n.state===ii)return ci(n);if(n.suspense&&Nt(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<Di);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===ln)us(n);else if(n.state===ii){const r=Fe;Fe=null,hs(()=>ci(n,e[0]),!1),Fe=r}}function hs(n,e){if(Fe)return n();let t=!1;e||(Fe=[]),Pt?t=!0:Pt=[],Di++;try{const r=n();return Kp(t),r}catch(r){t||(Pt=null),Fe=null,Ch(r)}}function Kp(n){if(Fe&&(Sh(Fe),Fe=null),n)return;const e=Pt;Pt=null,e.length&&hs(()=>wh(e),!1)}function Sh(n){for(let e=0;e<n.length;e++)ai(n[e])}function Qp(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:ai(r)}for(e=0;e<t;e++)ai(n[e])}function ci(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const s=r.state;s===ln?r!==e&&(!r.updatedAt||r.updatedAt<Di)&&ai(r):s===ii&&ci(r,e)}}}function Rh(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=ii,t.pure?Fe.push(t):Pt.push(t),t.observers&&Rh(t))}}function Wr(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),s=t.observers;if(s&&s.length){const i=s.pop(),a=t.observerSlots.pop();r<s.length&&(i.sourceSlots[a]=r,s[r]=i,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)Wr(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)Wr(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Jp(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function Ch(n,e=be){throw Jp(n)}const Yp=Symbol("fallback");function Cl(n){for(let e=0;e<n.length;e++)n[e]()}function Xp(n,e,t={}){let r=[],s=[],i=[],a=0,c=e.length>1?[]:null;return oi(()=>Cl(i)),()=>{let u=n()||[],h=u.length,f,m;return u[zp],Nt(()=>{let A,R,P,N,O,F,M,G,H;if(h===0)a!==0&&(Cl(i),i=[],r=[],s=[],a=0,c&&(c=[])),t.fallback&&(r=[Yp],s[0]=Gs(j=>(i[0]=j,t.fallback())),a=1);else if(a===0){for(s=new Array(h),m=0;m<h;m++)r[m]=u[m],s[m]=Gs(w);a=h}else{for(P=new Array(h),N=new Array(h),c&&(O=new Array(h)),F=0,M=Math.min(a,h);F<M&&r[F]===u[F];F++);for(M=a-1,G=h-1;M>=F&&G>=F&&r[M]===u[G];M--,G--)P[G]=s[M],N[G]=i[M],c&&(O[G]=c[M]);for(A=new Map,R=new Array(G+1),m=G;m>=F;m--)H=u[m],f=A.get(H),R[m]=f===void 0?-1:f,A.set(H,m);for(f=F;f<=M;f++)H=r[f],m=A.get(H),m!==void 0&&m!==-1?(P[m]=s[f],N[m]=i[f],c&&(O[m]=c[f]),m=R[m],A.set(H,m)):i[f]();for(m=F;m<h;m++)m in P?(s[m]=P[m],i[m]=N[m],c&&(c[m]=O[m],c[m](m))):s[m]=Gs(w);s=s.slice(0,a=h),r=u.slice(0)}return s});function w(A){if(i[m]=A,c){const[R,P]=Y(m);return c[m]=P,e(u[m],R)}return e(u[m])}}}function V(n,e){return Nt(()=>n(e||{}))}function Fs(){return!0}const Ko={get(n,e,t){return e===ri?t:n.get(e)},has(n,e){return e===ri?!0:n.has(e)},set:Fs,deleteProperty:Fs,getOwnPropertyDescriptor(n,e){return{configurable:!0,enumerable:!0,get(){return n.get(e)},set:Fs,deleteProperty:Fs}},ownKeys(n){return n.keys()}};function No(n){return(n=typeof n=="function"?n():n)?n:{}}function Zp(){for(let n=0,e=this.length;n<e;++n){const t=this[n]();if(t!==void 0)return t}}function Pe(...n){let e=!1;for(let a=0;a<n.length;a++){const c=n[a];e=e||!!c&&ri in c,n[a]=typeof c=="function"?(e=!0,er(c)):c}if(Eh&&e)return new Proxy({get(a){for(let c=n.length-1;c>=0;c--){const u=No(n[c])[a];if(u!==void 0)return u}},has(a){for(let c=n.length-1;c>=0;c--)if(a in No(n[c]))return!0;return!1},keys(){const a=[];for(let c=0;c<n.length;c++)a.push(...Object.keys(No(n[c])));return[...new Set(a)]}},Ko);const t={},r=Object.create(null);for(let a=n.length-1;a>=0;a--){const c=n[a];if(!c)continue;const u=Object.getOwnPropertyNames(c);for(let h=u.length-1;h>=0;h--){const f=u[h];if(f==="__proto__"||f==="constructor")continue;const m=Object.getOwnPropertyDescriptor(c,f);if(!r[f])r[f]=m.get?{enumerable:!0,configurable:!0,get:Zp.bind(t[f]=[m.get.bind(c)])}:m.value!==void 0?m:void 0;else{const w=t[f];w&&(m.get?w.push(m.get.bind(c)):m.value!==void 0&&w.push(()=>m.value))}}}const s={},i=Object.keys(r);for(let a=i.length-1;a>=0;a--){const c=i[a],u=r[c];u&&u.get?Object.defineProperty(s,c,u):s[c]=u?u.value:void 0}return s}function Ph(n,...e){const t=e.length;if(Eh&&ri in n){const s=t>1?e.flat():e[0],i=e.map(a=>new Proxy({get(c){return a.includes(c)?n[c]:void 0},has(c){return a.includes(c)&&c in n},keys(){return a.filter(c=>c in n)}},Ko));return i.push(new Proxy({get(a){return s.includes(a)?void 0:n[a]},has(a){return s.includes(a)?!1:a in n},keys(){return Object.keys(n).filter(a=>!s.includes(a))}},Ko)),i}const r=[];for(let s=0;s<=t;s++)r[s]={};for(const s of Object.getOwnPropertyNames(n)){let i=t;for(let u=0;u<e.length;u++)if(e[u].includes(s)){i=u;break}const a=Object.getOwnPropertyDescriptor(n,s);!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable?r[i][s]=a.value:Object.defineProperty(r[i],s,a)}return r}function em(n){const e="fallback"in n&&{fallback:()=>n.fallback};return er(Xp(()=>n.each,n.children,e||void 0))}const tm=["allowfullscreen","async","alpha","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","adauctionheaders","browsingtopics","credentialless","defaultchecked","defaultmuted","defaultselected","defer","disablepictureinpicture","disableremoteplayback","preservespitch","shadowrootclonable","shadowrootcustomelementregistry","shadowrootdelegatesfocus","shadowrootserializable","sharedstoragewritable"],nm=new Set(["className","value","readOnly","noValidate","formNoValidate","isMap","noModule","playsInline","adAuctionHeaders","allowFullscreen","browsingTopics","defaultChecked","defaultMuted","defaultSelected","disablePictureInPicture","disableRemotePlayback","preservesPitch","shadowRootClonable","shadowRootCustomElementRegistry","shadowRootDelegatesFocus","shadowRootSerializable","sharedStorageWritable",...tm]),rm=new Set(["innerHTML","textContent","innerText","children"]),sm=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),im=Object.assign(Object.create(null),{class:"className",novalidate:{$:"noValidate",FORM:1},formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1},adauctionheaders:{$:"adAuctionHeaders",IFRAME:1},allowfullscreen:{$:"allowFullscreen",IFRAME:1},browsingtopics:{$:"browsingTopics",IMG:1},defaultchecked:{$:"defaultChecked",INPUT:1},defaultmuted:{$:"defaultMuted",AUDIO:1,VIDEO:1},defaultselected:{$:"defaultSelected",OPTION:1},disablepictureinpicture:{$:"disablePictureInPicture",VIDEO:1},disableremoteplayback:{$:"disableRemotePlayback",AUDIO:1,VIDEO:1},preservespitch:{$:"preservesPitch",AUDIO:1,VIDEO:1},shadowrootclonable:{$:"shadowRootClonable",TEMPLATE:1},shadowrootdelegatesfocus:{$:"shadowRootDelegatesFocus",TEMPLATE:1},shadowrootserializable:{$:"shadowRootSerializable",TEMPLATE:1},sharedstoragewritable:{$:"sharedStorageWritable",IFRAME:1,IMG:1}});function om(n,e){const t=im[n];return typeof t=="object"?t[e]?t.$:void 0:t}const am=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),cm=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),lm={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},Ue=n=>er(()=>n());function um(n,e,t){let r=t.length,s=e.length,i=r,a=0,c=0,u=e[s-1].nextSibling,h=null;for(;a<s||c<i;){if(e[a]===t[c]){a++,c++;continue}for(;e[s-1]===t[i-1];)s--,i--;if(s===a){const f=i<r?c?t[c-1].nextSibling:t[i-c]:u;for(;c<i;)n.insertBefore(t[c++],f)}else if(i===c)for(;a<s;)(!h||!h.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[i-1]&&t[c]===e[s-1]){const f=e[--s].nextSibling;n.insertBefore(t[c++],e[a++].nextSibling),n.insertBefore(t[--i],f),e[s]=t[i]}else{if(!h){h=new Map;let m=c;for(;m<i;)h.set(t[m],m++)}const f=h.get(e[a]);if(f!=null)if(c<f&&f<i){let m=a,w=1,A;for(;++m<s&&m<i&&!((A=h.get(e[m]))==null||A!==f+w);)w++;if(w>f-c){const R=e[a];for(;c<f;)n.insertBefore(t[c++],R)}else n.replaceChild(t[c++],e[a++])}else a++;else e[a++].remove()}}}const Pl="_$DX_DELEGATE";function hm(n,e,t,r={}){let s;return Gs(i=>{s=i,e===document?n():x(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{s(),e.textContent=""}}function B(n,e,t,r){let s;const i=()=>{const c=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return c.innerHTML=n,t?c.content.firstChild.firstChild:r?c.firstChild:c.content.firstChild},a=e?()=>Nt(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return a.cloneNode=a,a}function un(n,e=window.document){const t=e[Pl]||(e[Pl]=new Set);for(let r=0,s=n.length;r<s;r++){const i=n[r];t.has(i)||(t.add(i),e.addEventListener(i,ym))}}function ne(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function dm(n,e,t,r){r==null?n.removeAttributeNS(e,t):n.setAttributeNS(e,t,r)}function fm(n,e,t){t?n.setAttribute(e,""):n.removeAttribute(e)}function Ia(n,e){e==null?n.removeAttribute("class"):n.className=e}function ba(n,e,t,r){if(r)Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t;else if(Array.isArray(t)){const s=t[0];n.addEventListener(e,t[0]=i=>s.call(n,t[1],i))}else n.addEventListener(e,t,typeof t!="function"&&t)}function ar(n,e,t={}){const r=Object.keys(e||{}),s=Object.keys(t);let i,a;for(i=0,a=s.length;i<a;i++){const c=s[i];!c||c==="undefined"||e[c]||(kl(n,c,!1),delete t[c])}for(i=0,a=r.length;i<a;i++){const c=r[i],u=!!e[c];!c||c==="undefined"||t[c]===u||!u||(kl(n,c,!0),t[c]=u)}return t}function pm(n,e,t){if(!e)return t?ne(n,"style"):e;const r=n.style;if(typeof e=="string")return r.cssText=e;typeof t=="string"&&(r.cssText=t=void 0),t||(t={}),e||(e={});let s,i;for(i in t)e[i]==null&&r.removeProperty(i),delete t[i];for(i in e)s=e[i],s!==t[i]&&(r.setProperty(i,s),t[i]=s);return t}function kh(n,e={},t,r){const s={};return r||ue(()=>s.children=Kr(n,e.children,s.children)),ue(()=>typeof e.ref=="function"&&mm(e.ref,n)),ue(()=>gm(n,e,t,!0,s,!0)),s}function mm(n,e,t){return Nt(()=>n(e,t))}function x(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return Kr(n,e,r,t);ue(s=>Kr(n,e(),s,t),r)}function gm(n,e,t,r,s={},i=!1){e||(e={});for(const a in s)if(!(a in e)){if(a==="children")continue;s[a]=xl(n,a,null,s[a],t,i,e)}for(const a in e){if(a==="children")continue;const c=e[a];s[a]=xl(n,a,c,s[a],t,i,e)}}function _m(n){return n.toLowerCase().replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}function kl(n,e,t){const r=e.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)n.classList.toggle(r[s],t)}function xl(n,e,t,r,s,i,a){let c,u,h,f,m;if(e==="style")return pm(n,t,r);if(e==="classList")return ar(n,t,r);if(t===r)return r;if(e==="ref")i||t(n);else if(e.slice(0,3)==="on:"){const w=e.slice(3);r&&n.removeEventListener(w,r,typeof r!="function"&&r),t&&n.addEventListener(w,t,typeof t!="function"&&t)}else if(e.slice(0,10)==="oncapture:"){const w=e.slice(10);r&&n.removeEventListener(w,r,!0),t&&n.addEventListener(w,t,!0)}else if(e.slice(0,2)==="on"){const w=e.slice(2).toLowerCase(),A=am.has(w);if(!A&&r){const R=Array.isArray(r)?r[0]:r;n.removeEventListener(w,R)}(A||t)&&(ba(n,w,t,A),A&&un([w]))}else if(e.slice(0,5)==="attr:")ne(n,e.slice(5),t);else if(e.slice(0,5)==="bool:")fm(n,e.slice(5),t);else if((m=e.slice(0,5)==="prop:")||(h=rm.has(e))||!s&&((f=om(e,n.tagName))||(u=nm.has(e)))||(c=n.nodeName.includes("-")||"is"in a))m&&(e=e.slice(5),u=!0),e==="class"||e==="className"?Ia(n,t):c&&!u&&!h?n[_m(e)]=t:n[f||e]=t;else{const w=s&&e.indexOf(":")>-1&&lm[e.split(":")[0]];w?dm(n,w,e,t):ne(n,sm[e]||e,t)}return t}function ym(n){let e=n.target;const t=`$$${n.type}`,r=n.target,s=n.currentTarget,i=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const h=e[`${t}Data`];if(h!==void 0?u.call(e,h,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&i(e.host),!0},c=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();i(u[0]);for(let h=0;h<u.length-2&&(e=u[h],!!a());h++){if(e._$host){e=e._$host,c();break}if(e.parentNode===s)break}}else c();i(r)}function Kr(n,e,t,r,s){for(;typeof t=="function";)t=t();if(e===t)return t;const i=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,i==="string"||i==="number"){if(i==="number"&&(e=e.toString(),e===t))return t;if(a){let c=t[0];c&&c.nodeType===3?c.data!==e&&(c.data=e):c=document.createTextNode(e),t=qn(n,t,r,c)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||i==="boolean")t=qn(n,t,r);else{if(i==="function")return ue(()=>{let c=e();for(;typeof c=="function";)c=c();t=Kr(n,c,t,r)}),()=>t;if(Array.isArray(e)){const c=[],u=t&&Array.isArray(t);if(Qo(c,e,t,s))return ue(()=>t=Kr(n,c,t,r,!0)),()=>t;if(c.length===0){if(t=qn(n,t,r),a)return t}else u?t.length===0?Nl(n,c,r):um(n,t,c):(t&&qn(n),Nl(n,c));t=c}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=qn(n,t,r,e);qn(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function Qo(n,e,t,r){let s=!1;for(let i=0,a=e.length;i<a;i++){let c=e[i],u=t&&t[n.length],h;if(!(c==null||c===!0||c===!1))if((h=typeof c)=="object"&&c.nodeType)n.push(c);else if(Array.isArray(c))s=Qo(n,c,u)||s;else if(h==="function")if(r){for(;typeof c=="function";)c=c();s=Qo(n,Array.isArray(c)?c:[c],Array.isArray(u)?u:[u])||s}else n.push(c),s=!0;else{const f=String(c);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return s}function Nl(n,e,t=null){for(let r=0,s=e.length;r<s;r++)n.insertBefore(e[r],t)}function qn(n,e,t,r){if(t===void 0)return n.textContent="";const s=r||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const c=e[a];if(s!==c){const u=c.parentNode===n;!i&&!a?u?n.replaceChild(s,c):n.insertBefore(s,t):u&&c.remove()}else i=!0}}else n.insertBefore(s,t);return[s]}const vm="http://www.w3.org/2000/svg";function Em(n,e=!1,t=void 0){return e?document.createElementNS(vm,n):document.createElement(n,{is:t})}function wm(n,e){const t=er(n);return er(()=>{const r=t();switch(typeof r){case"function":return Nt(()=>r(e));case"string":const s=cm.has(r),i=Em(r,s,Nt(()=>e.is));return kh(i,e,s),i}})}function Tm(n){const[,e]=Ph(n,["component"]);return wm(()=>n.component,e)}/**
* @license lucide-solid v0.475.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var Im={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},zn=Im,bm=B("<svg>"),Am=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Sm=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim(),Rm=n=>{const[e,t]=Ph(n,["color","size","strokeWidth","children","class","name","iconNode","absoluteStrokeWidth"]);return(()=>{var r=bm();return kh(r,Pe(zn,{get width(){return e.size??zn.width},get height(){return e.size??zn.height},get stroke(){return e.color??zn.stroke},get"stroke-width"(){return Ue(()=>!!e.absoluteStrokeWidth)()?Number(e.strokeWidth??zn["stroke-width"])*24/Number(e.size):Number(e.strokeWidth??zn["stroke-width"])},get class(){return Sm("lucide","lucide-icon",e.name!=null?`lucide-${Am(e?.name)}`:void 0,e.class!=null?e.class:"")}},t),!0,!0),x(r,V(em,{get each(){return e.iconNode},children:([s,i])=>V(Tm,Pe({component:s},i))})),r})()},je=Rm,Cm=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Pm=n=>V(je,Pe(n,{name:"Activity",iconNode:Cm})),xh=Pm,km=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],xm=n=>V(je,Pe(n,{name:"CalendarClock",iconNode:km})),Dl=xm,Nm=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Dm=n=>V(je,Pe(n,{name:"Camera",iconNode:Nm})),Vl=Dm,Vm=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Om=n=>V(je,Pe(n,{name:"ChartColumn",iconNode:Vm})),Aa=Om,Mm=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Lm=n=>V(je,Pe(n,{name:"Check",iconNode:Mm})),Nh=Lm,$m=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Fm=n=>V(je,Pe(n,{name:"ChevronRight",iconNode:$m})),Ol=Fm,Um=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Bm=n=>V(je,Pe(n,{name:"CircleAlert",iconNode:Um})),Dh=Bm,jm=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],qm=n=>V(je,Pe(n,{name:"FileJson",iconNode:jm})),Jo=qm,zm=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Hm=n=>V(je,Pe(n,{name:"FileText",iconNode:zm})),Gm=Hm,Wm=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Km=n=>V(je,Pe(n,{name:"LogOut",iconNode:Wm})),Qm=Km,Jm=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Ym=n=>V(je,Pe(n,{name:"Mail",iconNode:Jm})),Xm=Ym,Zm=[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]],eg=n=>V(je,Pe(n,{name:"Mic",iconNode:Zm})),Ml=eg,tg=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],ng=n=>V(je,Pe(n,{name:"Plus",iconNode:tg})),rg=ng,sg=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],ig=n=>V(je,Pe(n,{name:"RefreshCcw",iconNode:sg})),Vi=ig,og=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],ag=n=>V(je,Pe(n,{name:"Trash2",iconNode:og})),Ll=ag,cg=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],lg=n=>V(je,Pe(n,{name:"Utensils",iconNode:cg})),Qr=lg;const ug=()=>{};var $l={};/**
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
 */const Vh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},hg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Oh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let w=(c&15)<<2|h>>6,A=h&63;u||(A=64,a||(w=64)),r.push(t[f],t[m],t[w],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):hg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new dg;const w=i<<2|c>>4;if(r.push(w),h!==64){const A=c<<4&240|h>>2;if(r.push(A),m!==64){const R=h<<6&192|m;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class dg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const fg=function(n){const e=Vh(n);return Oh.encodeByteArray(e,!0)},li=function(n){return fg(n).replace(/\./g,"")},Mh=function(n){try{return Oh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function pg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const mg=()=>pg().__FIREBASE_DEFAULTS__,gg=()=>{if(typeof process>"u"||typeof $l>"u")return;const n=$l.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_g=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mh(n[1]);return e&&JSON.parse(e)},Oi=()=>{try{return ug()||mg()||gg()||_g()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lh=n=>Oi()?.emulatorHosts?.[n],$h=n=>{const e=Lh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Fh=()=>Oi()?.config,Uh=n=>Oi()?.[`_${n}`];/**
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
 */class yg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function vg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[li(JSON.stringify(t)),li(JSON.stringify(a)),""].join(".")}/**
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
 */function Be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Eg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Be())}function wg(){const n=Oi()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Tg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ig(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function bg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ag(){const n=Be();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Sg(){return!wg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Rg(){try{return typeof indexedDB=="object"}catch{return!1}}function Cg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Pg="FirebaseError";class dt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Pg,Object.setPrototypeOf(this,dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ds.prototype.create)}}class ds{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?kg(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new dt(s,c,r)}}function kg(n,e){return n.replace(xg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const xg=/\{\$([^}]+)}/g;function Ng(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Pn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Fl(i)&&Fl(a)){if(!Pn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Fl(n){return n!==null&&typeof n=="object"}/**
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
 */function fs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Vr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Or(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Dg(n,e){const t=new Vg(n,e);return t.subscribe.bind(t)}class Vg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Og(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Do),s.error===void 0&&(s.error=Do),s.complete===void 0&&(s.complete=Do);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Og(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Do(){}/**
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
 */function ge(n){return n&&n._delegate?n._delegate:n}/**
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
 */function On(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Sa(n){return(await fetch(n,{credentials:"include"})).ok}class Zt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Tn="[DEFAULT]";/**
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
 */class Mg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new yg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($g(e))try{this.getOrInitializeService({instanceIdentifier:Tn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tn){return this.instances.has(e)}getOptions(e=Tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tn){return this.component?this.component.multipleInstances?e:Tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lg(n){return n===Tn?void 0:n}function $g(n){return n.instantiationMode==="EAGER"}/**
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
 */class Fg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Mg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ee;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ee||(ee={}));const Ug={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},Bg=ee.INFO,jg={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},qg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=jg[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ra{constructor(e){this.name=e,this._logLevel=Bg,this._logHandler=qg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ug[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const zg=(n,e)=>e.some(t=>n instanceof t);let Ul,Bl;function Hg(){return Ul||(Ul=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gg(){return Bl||(Bl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bh=new WeakMap,Yo=new WeakMap,jh=new WeakMap,Vo=new WeakMap,Ca=new WeakMap;function Wg(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Qt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Bh.set(t,n)}).catch(()=>{}),Ca.set(e,n),e}function Kg(n){if(Yo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Yo.set(n,e)}let Xo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Yo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||jh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qg(n){Xo=n(Xo)}function Jg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Oo(this),e,...t);return jh.set(r,e.sort?e.sort():[e]),Qt(r)}:Gg().includes(n)?function(...e){return n.apply(Oo(this),e),Qt(Bh.get(this))}:function(...e){return Qt(n.apply(Oo(this),e))}}function Yg(n){return typeof n=="function"?Jg(n):(n instanceof IDBTransaction&&Kg(n),zg(n,Hg())?new Proxy(n,Xo):n)}function Qt(n){if(n instanceof IDBRequest)return Wg(n);if(Vo.has(n))return Vo.get(n);const e=Yg(n);return e!==n&&(Vo.set(n,e),Ca.set(e,n)),e}const Oo=n=>Ca.get(n);function Xg(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Qt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Qt(a.result),u.oldVersion,u.newVersion,Qt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Zg=["get","getKey","getAll","getAllKeys","count"],e_=["put","add","delete","clear"],Mo=new Map;function jl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Mo.get(e))return Mo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=e_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Zg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Mo.set(e,i),i}Qg(n=>({...n,get:(e,t,r)=>jl(e,t)||n.get(e,t,r),has:(e,t)=>!!jl(e,t)||n.has(e,t)}));/**
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
 */class t_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(n_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function n_(n){return n.getComponent()?.type==="VERSION"}const Zo="@firebase/app",ql="0.14.13";/**
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
 */const Dt=new Ra("@firebase/app"),r_="@firebase/app-compat",s_="@firebase/analytics-compat",i_="@firebase/analytics",o_="@firebase/app-check-compat",a_="@firebase/app-check",c_="@firebase/auth",l_="@firebase/auth-compat",u_="@firebase/database",h_="@firebase/data-connect",d_="@firebase/database-compat",f_="@firebase/functions",p_="@firebase/functions-compat",m_="@firebase/installations",g_="@firebase/installations-compat",__="@firebase/messaging",y_="@firebase/messaging-compat",v_="@firebase/performance",E_="@firebase/performance-compat",w_="@firebase/remote-config",T_="@firebase/remote-config-compat",I_="@firebase/storage",b_="@firebase/storage-compat",A_="@firebase/firestore",S_="@firebase/ai",R_="@firebase/firestore-compat",C_="firebase",P_="12.14.0";/**
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
 */const ea="[DEFAULT]",k_={[Zo]:"fire-core",[r_]:"fire-core-compat",[i_]:"fire-analytics",[s_]:"fire-analytics-compat",[a_]:"fire-app-check",[o_]:"fire-app-check-compat",[c_]:"fire-auth",[l_]:"fire-auth-compat",[u_]:"fire-rtdb",[h_]:"fire-data-connect",[d_]:"fire-rtdb-compat",[f_]:"fire-fn",[p_]:"fire-fn-compat",[m_]:"fire-iid",[g_]:"fire-iid-compat",[__]:"fire-fcm",[y_]:"fire-fcm-compat",[v_]:"fire-perf",[E_]:"fire-perf-compat",[w_]:"fire-rc",[T_]:"fire-rc-compat",[I_]:"fire-gcs",[b_]:"fire-gcs-compat",[A_]:"fire-fst",[R_]:"fire-fst-compat",[S_]:"fire-vertex","fire-js":"fire-js",[C_]:"fire-js-all"};/**
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
 */const Jr=new Map,x_=new Map,ta=new Map;function zl(n,e){try{n.container.addComponent(e)}catch(t){Dt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function kn(n){const e=n.name;if(ta.has(e))return Dt.debug(`There were multiple attempts to register component ${e}.`),!1;ta.set(e,n);for(const t of Jr.values())zl(t,n);for(const t of x_.values())zl(t,n);return!0}function Mi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ke(n){return n==null?!1:n.settings!==void 0}/**
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
 */const N_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new ds("app","Firebase",N_);/**
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
 */class D_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
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
 */const cr=P_;function qh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ea,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(t||(t=Fh()),!t)throw Jt.create("no-options");const i=Jr.get(s);if(i){if(Pn(t,i.options)&&Pn(r,i.config))return i;throw Jt.create("duplicate-app",{appName:s})}const a=new Fg(s);for(const u of ta.values())a.addComponent(u);const c=new D_(t,r,a);return Jr.set(s,c),c}function Li(n=ea){const e=Jr.get(n);if(!e&&n===ea&&Fh())return qh();if(!e)throw Jt.create("no-app",{appName:n});return e}function V_(){return Array.from(Jr.values())}function _t(n,e,t){let r=k_[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Dt.warn(a.join(" "));return}kn(new Zt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const O_="firebase-heartbeat-database",M_=1,Yr="firebase-heartbeat-store";let Lo=null;function zh(){return Lo||(Lo=Xg(O_,M_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Yr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),Lo}async function L_(n){try{const t=(await zh()).transaction(Yr),r=await t.objectStore(Yr).get(Hh(n));return await t.done,r}catch(e){if(e instanceof dt)Dt.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e?.message});Dt.warn(t.message)}}}async function Hl(n,e){try{const r=(await zh()).transaction(Yr,"readwrite");await r.objectStore(Yr).put(e,Hh(n)),await r.done}catch(t){if(t instanceof dt)Dt.warn(t.message);else{const r=Jt.create("idb-set",{originalErrorMessage:t?.message});Dt.warn(r.message)}}}function Hh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const $_=1024,F_=30;class U_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new j_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Gl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>F_){const s=q_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Gl(),{heartbeatsToSend:t,unsentEntries:r}=B_(this._heartbeatsCache.heartbeats),s=li(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Dt.warn(e),""}}}function Gl(){return new Date().toISOString().substring(0,10)}function B_(n,e=$_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Wl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Wl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class j_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rg()?Cg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await L_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Hl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Hl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Wl(n){return li(JSON.stringify({version:2,heartbeats:n})).length}function q_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function z_(n){kn(new Zt("platform-logger",e=>new t_(e),"PRIVATE")),kn(new Zt("heartbeat",e=>new U_(e),"PRIVATE")),_t(Zo,ql,n),_t(Zo,ql,"esm2020"),_t("fire-js","")}z_("");function Gh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const H_=Gh,Wh=new ds("auth","Firebase",Gh());/**
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
 */const ui=new Ra("@firebase/auth");function G_(n,...e){ui.logLevel<=ee.WARN&&ui.warn(`Auth (${cr}): ${n}`,...e)}function Ws(n,...e){ui.logLevel<=ee.ERROR&&ui.error(`Auth (${cr}): ${n}`,...e)}/**
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
 */function st(n,...e){throw ka(n,...e)}function ct(n,...e){return ka(n,...e)}function Pa(n,e,t){const r={...H_(),[e]:t};return new ds("auth","Firebase",r).create(e,{appName:n.name})}function kt(n){return Pa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function W_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&st(n,"argument-error"),Pa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ka(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wh.create(n,...e)}function q(n,e,...t){if(!n)throw ka(e,...t)}function St(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ws(e),new Error(e)}function Vt(n,e){n||St(e)}/**
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
 */function na(){return typeof self<"u"&&self.location?.href||""}function K_(){return Kl()==="http:"||Kl()==="https:"}function Kl(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Q_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(K_()||Ig()||"connection"in navigator)?navigator.onLine:!0}function J_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ps{constructor(e,t){this.shortDelay=e,this.longDelay=t,Vt(t>e,"Short delay should be less than long delay!"),this.isMobile=Eg()||bg()}get(){return Q_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function xa(n,e){Vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Kh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;St("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;St("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;St("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Y_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const X_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Z_=new ps(3e4,6e4);function hn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function dn(n,e,t,r,s={}){return Qh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=fs({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return Tg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&On(n.emulatorConfig.host)&&(h.credentials="include"),Kh.fetch()(await Jh(n,n.config.apiHost,t,c),h)})}async function Qh(n,e,t){n._canInitEmulator=!1;const r={...Y_,...e};try{const s=new ty(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Us(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Us(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Us(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Us(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Pa(n,f,h);st(n,f)}}catch(s){if(s instanceof dt)throw s;st(n,"network-request-failed",{message:String(s)})}}async function ms(n,e,t,r,s={}){const i=await dn(n,e,t,r,s);return"mfaPendingCredential"in i&&st(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Jh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?xa(n.config,s):`${n.config.apiScheme}://${s}`;return X_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function ey(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ty{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ct(this.auth,"network-request-failed")),Z_.get())})}}function Us(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ct(n,e,r);return s.customData._tokenResponse=t,s}function Ql(n){return n!==void 0&&n.enterprise!==void 0}class ny{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ey(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ry(n,e){return dn(n,"GET","/v2/recaptchaConfig",hn(n,e))}/**
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
 */async function sy(n,e){return dn(n,"POST","/v1/accounts:delete",e)}async function hi(n,e){return dn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Br(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function iy(n,e=!1){const t=ge(n),r=await t.getIdToken(e),s=Na(r);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Br($o(s.auth_time)),issuedAtTime:Br($o(s.iat)),expirationTime:Br($o(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function $o(n){return Number(n)*1e3}function Na(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ws("JWT malformed, contained fewer than 3 sections"),null;try{const s=Mh(t);return s?JSON.parse(s):(Ws("Failed to decode base64 JWT payload"),null)}catch(s){return Ws("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Jl(n){const e=Na(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Xr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof dt&&oy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function oy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class ay{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ra{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Br(this.lastLoginAt),this.creationTime=Br(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function di(n){const e=n.auth,t=await n.getIdToken(),r=await Xr(n,hi(e,{idToken:t}));q(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Yh(s.providerUserInfo):[],a=ly(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ra(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function cy(n){const e=ge(n);await di(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ly(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Yh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function uy(n,e){const t=await Qh(n,{},async()=>{const r=fs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Jh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&On(n.emulatorConfig.host)&&(u.credentials="include"),Kh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hy(n,e){return dn(n,"POST","/v2/accounts:revokeToken",hn(n,e))}/**
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
 */class Qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Jl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Jl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await uy(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Qn;return r&&(q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(q(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qn,this.toJSON())}_performRefresh(){return St("not implemented")}}/**
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
 */function Ht(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class at{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ay(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ra(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Xr(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return iy(this,e)}reload(){return cy(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new at({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await di(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(kt(this.auth));const e=await this.getIdToken();return await Xr(this,sy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:w,isAnonymous:A,providerData:R,stsTokenManager:P}=t;q(m&&P,e,"internal-error");const N=Qn.fromJSON(this.name,P);q(typeof m=="string",e,"internal-error"),Ht(r,e.name),Ht(s,e.name),q(typeof w=="boolean",e,"internal-error"),q(typeof A=="boolean",e,"internal-error"),Ht(i,e.name),Ht(a,e.name),Ht(c,e.name),Ht(u,e.name),Ht(h,e.name),Ht(f,e.name);const O=new at({uid:m,auth:e,email:s,emailVerified:w,displayName:r,isAnonymous:A,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:N,createdAt:h,lastLoginAt:f});return R&&Array.isArray(R)&&(O.providerData=R.map(F=>({...F}))),u&&(O._redirectEventId=u),O}static async _fromIdTokenResponse(e,t,r=!1){const s=new Qn;s.updateFromServerResponse(t);const i=new at({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await di(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Yh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Qn;c.updateFromIdToken(r);const u=new at({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ra(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
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
 */const Yl=new Map;function Rt(n){Vt(n instanceof Function,"Expected a class definition");let e=Yl.get(n);return e?(Vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Yl.set(n,e),e)}/**
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
 */class Xh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Xh.type="NONE";const Xl=Xh;/**
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
 */function Ks(n,e,t){return`firebase:${n}:${e}:${t}`}class Jn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ks(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ks("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await hi(this.auth,{idToken:e}).catch(()=>{});return t?at._fromGetAccountInfoResponse(this.auth,t,e):null}return at._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Jn(Rt(Xl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Rt(Xl);const a=Ks(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const w=await hi(e,{idToken:f}).catch(()=>{});if(!w)break;m=await at._fromGetAccountInfoResponse(e,w,f)}else m=at._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Jn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Jn(i,e,r))}}/**
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
 */function Zl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(nd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Zh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(sd(e))return"Blackberry";if(id(e))return"Webos";if(ed(e))return"Safari";if((e.includes("chrome/")||td(e))&&!e.includes("edge/"))return"Chrome";if(rd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Zh(n=Be()){return/firefox\//i.test(n)}function ed(n=Be()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function td(n=Be()){return/crios\//i.test(n)}function nd(n=Be()){return/iemobile/i.test(n)}function rd(n=Be()){return/android/i.test(n)}function sd(n=Be()){return/blackberry/i.test(n)}function id(n=Be()){return/webos/i.test(n)}function Da(n=Be()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function dy(n=Be()){return Da(n)&&!!window.navigator?.standalone}function fy(){return Ag()&&document.documentMode===10}function od(n=Be()){return Da(n)||rd(n)||id(n)||sd(n)||/windows phone/i.test(n)||nd(n)}/**
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
 */function ad(n,e=[]){let t;switch(n){case"Browser":t=Zl(Be());break;case"Worker":t=`${Zl(Be())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${cr}/${r}`}/**
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
 */class py{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function my(n,e={}){return dn(n,"GET","/v2/passwordPolicy",hn(n,e))}/**
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
 */const gy=6;class _y{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??gy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class yy{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eu(this),this.idTokenSubscription=new eu(this),this.beforeStateQueue=new py(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Rt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Jn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await hi(this,{idToken:e}),r=await at._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ke(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await di(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=J_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(kt(this));const t=e?ge(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(kt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(kt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await my(this),t=new _y(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ds("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await hy(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Rt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await Jn.create(this,[Rt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ad(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ke(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&G_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fn(n){return ge(n)}class eu{constructor(e){this.auth=e,this.observer=null,this.addObserver=Dg(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let $i={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function vy(n){$i=n}function cd(n){return $i.loadJS(n)}function Ey(){return $i.recaptchaEnterpriseScript}function wy(){return $i.gapiScript}function Ty(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Iy{constructor(){this.enterprise=new by}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class by{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ay="recaptcha-enterprise",ld="NO_RECAPTCHA";class Sy{constructor(e){this.type=Ay,this.auth=fn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{ry(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new ny(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;Ql(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(ld)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Iy().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Ql(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Ey();u.length!==0&&(u+=c),cd(u).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function tu(n,e,t,r=!1,s=!1){const i=new Sy(n);let a;if(s)a=ld;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function sa(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await tu(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await tu(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
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
 */function Ry(n,e){const t=Mi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Pn(i,e??{}))return s;st(s,"already-initialized")}return t.initialize({options:e})}function Cy(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Rt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Py(n,e,t){const r=fn(n);q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ud(e),{host:a,port:c}=ky(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),q(Pn(h,r.config.emulator)&&Pn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,On(a)?Sa(`${i}//${a}${u}`):xy()}function ud(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ky(n){const e=ud(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:nu(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:nu(a)}}}function nu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function xy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Va{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return St("not implemented")}_getIdTokenResponse(e){return St("not implemented")}_linkToIdToken(e,t){return St("not implemented")}_getReauthenticationResolver(e){return St("not implemented")}}async function Ny(n,e){return dn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Dy(n,e){return ms(n,"POST","/v1/accounts:signInWithPassword",hn(n,e))}/**
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
 */async function Vy(n,e){return ms(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}async function Oy(n,e){return ms(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}/**
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
 */class Zr extends Va{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Zr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Zr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return sa(e,t,"signInWithPassword",Dy);case"emailLink":return Vy(e,{email:this._email,oobCode:this._password});default:st(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return sa(e,r,"signUpPassword",Ny);case"emailLink":return Oy(e,{idToken:t,email:this._email,oobCode:this._password});default:st(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Yn(n,e){return ms(n,"POST","/v1/accounts:signInWithIdp",hn(n,e))}/**
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
 */const My="http://localhost";class xn extends Va{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):st("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new xn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Yn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yn(e,t)}buildRequest(){const e={requestUri:My,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fs(t)}return e}}/**
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
 */function Ly(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $y(n){const e=Vr(Or(n)).link,t=e?Vr(Or(e)).deep_link_id:null,r=Vr(Or(n)).deep_link_id;return(r?Vr(Or(r)).link:null)||r||t||e||n}class Oa{constructor(e){const t=Vr(Or(e)),r=t.apiKey??null,s=t.oobCode??null,i=Ly(t.mode??null);q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=$y(e);try{return new Oa(t)}catch{return null}}}/**
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
 */class lr{constructor(){this.providerId=lr.PROVIDER_ID}static credential(e,t){return Zr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Oa.parseLink(t);return q(r,"argument-error"),Zr._fromEmailAndCode(e,r.code,r.tenantId)}}lr.PROVIDER_ID="password";lr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";lr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ma{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class gs extends Ma{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Gt extends gs{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gt.PROVIDER_ID="facebook.com";/**
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
 */class At extends gs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xn._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return At.credential(t,r)}catch{return null}}}At.GOOGLE_SIGN_IN_METHOD="google.com";At.PROVIDER_ID="google.com";/**
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
 */class Wt extends gs{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.GITHUB_SIGN_IN_METHOD="github.com";Wt.PROVIDER_ID="github.com";/**
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
 */class Kt extends gs{constructor(){super("twitter.com")}static credential(e,t){return xn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Kt.credential(t,r)}catch{return null}}}Kt.TWITTER_SIGN_IN_METHOD="twitter.com";Kt.PROVIDER_ID="twitter.com";/**
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
 */async function Fy(n,e){return ms(n,"POST","/v1/accounts:signUp",hn(n,e))}/**
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
 */class Nn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await at._fromIdTokenResponse(e,r,s),a=ru(r);return new Nn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ru(r);return new Nn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ru(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class fi extends dt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,fi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new fi(e,t,r,s)}}function hd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?fi._fromErrorAndOperation(n,i,e,r):i})}async function Uy(n,e,t=!1){const r=await Xr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Nn._forOperation(n,"link",r)}/**
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
 */async function By(n,e,t=!1){const{auth:r}=n;if(Ke(r.app))return Promise.reject(kt(r));const s="reauthenticate";try{const i=await Xr(n,hd(r,s,e,n),t);q(i.idToken,r,"internal-error");const a=Na(i.idToken);q(a,r,"internal-error");const{sub:c}=a;return q(n.uid===c,r,"user-mismatch"),Nn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&st(r,"user-mismatch"),i}}/**
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
 */async function dd(n,e,t=!1){if(Ke(n.app))return Promise.reject(kt(n));const r="signIn",s=await hd(n,r,e),i=await Nn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function jy(n,e){return dd(fn(n),e)}/**
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
 */async function fd(n){const e=fn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function qy(n,e,t){if(Ke(n.app))return Promise.reject(kt(n));const r=fn(n),a=await sa(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Fy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&fd(n),u}),c=await Nn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function zy(n,e,t){return Ke(n.app)?Promise.reject(kt(n)):jy(ge(n),lr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&fd(n),r})}function Hy(n,e,t,r){return ge(n).onIdTokenChanged(e,t,r)}function Gy(n,e,t){return ge(n).beforeAuthStateChanged(e,t)}function Wy(n,e,t,r){return ge(n).onAuthStateChanged(e,t,r)}function Ky(n){return ge(n).signOut()}const pi="__sak";/**
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
 */class pd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(pi,"1"),this.storage.removeItem(pi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Qy=1e3,Jy=10;class md extends pd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=od(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);fy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Jy):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Qy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}md.type="LOCAL";const Yy=md;/**
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
 */class gd extends pd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gd.type="SESSION";const _d=gd;/**
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
 */function Xy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Fi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Fi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),u=await Xy(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fi.receivers=[];/**
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
 */function La(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Zy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=La("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const w=m;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function yt(){return window}function ev(n){yt().location.href=n}/**
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
 */function yd(){return typeof yt().WorkerGlobalScope<"u"&&typeof yt().importScripts=="function"}async function tv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function nv(){return navigator?.serviceWorker?.controller||null}function rv(){return yd()?self:null}/**
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
 */const vd="firebaseLocalStorageDb",sv=1,mi="firebaseLocalStorage",Ed="fbase_key";class _s{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ui(n,e){return n.transaction([mi],e?"readwrite":"readonly").objectStore(mi)}function iv(){const n=indexedDB.deleteDatabase(vd);return new _s(n).toPromise()}function wd(){const n=indexedDB.open(vd,sv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(mi,{keyPath:Ed})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(mi)?e(r):(r.close(),await iv(),e(await wd()))})})}async function su(n,e,t){const r=Ui(n,!0).put({[Ed]:e,value:t});return new _s(r).toPromise()}async function ov(n,e){const t=Ui(n,!1).get(e),r=await new _s(t).toPromise();return r===void 0?null:r.value}function iu(n,e){const t=Ui(n,!0).delete(e);return new _s(t).toPromise()}const av=800,cv=3;class Td{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=wd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>cv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return yd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fi._getInstance(rv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await tv(),!this.activeServiceWorker)return;this.sender=new Zy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||nv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await su(e,pi,"1"),await iu(e,pi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>su(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>ov(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>iu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ui(s,!1).getAll();return new _s(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),av)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Td.type="LOCAL";const lv=Td;new ps(3e4,6e4);/**
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
 */function Id(n,e){return e?Rt(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class $a extends Va{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function uv(n){return dd(n.auth,new $a(n),n.bypassAuthState)}function hv(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),By(t,new $a(n),n.bypassAuthState)}async function dv(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Uy(t,new $a(n),n.bypassAuthState)}/**
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
 */class bd{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uv;case"linkViaPopup":case"linkViaRedirect":return dv;case"reauthViaPopup":case"reauthViaRedirect":return hv;default:st(this.auth,"internal-error")}}resolve(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const fv=new ps(2e3,1e4);async function pv(n,e,t){if(Ke(n.app))return Promise.reject(ct(n,"operation-not-supported-in-this-environment"));const r=fn(n);W_(n,e,Ma);const s=Id(r,t);return new In(r,"signInViaPopup",e,s).executeNotNull()}class In extends bd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,In.currentPopupAction&&In.currentPopupAction.cancel(),In.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){Vt(this.filter.length===1,"Popup operations only handle one event");const e=La();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,In.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fv.get())};e()}}In.currentPopupAction=null;/**
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
 */const mv="pendingRedirect",Qs=new Map;class gv extends bd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Qs.get(this.auth._key());if(!e){try{const r=await _v(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Qs.set(this.auth._key(),e)}return this.bypassAuthState||Qs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _v(n,e){const t=Ev(e),r=vv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function yv(n,e){Qs.set(n._key(),e)}function vv(n){return Rt(n._redirectPersistence)}function Ev(n){return Ks(mv,n.config.apiKey,n.name)}async function wv(n,e,t=!1){if(Ke(n.app))return Promise.reject(kt(n));const r=fn(n),s=Id(r,e),a=await new gv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Tv=600*1e3;class Iv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ad(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ct(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tv&&this.cachedEventUids.clear(),this.cachedEventUids.has(ou(e))}saveEventToCache(e){this.cachedEventUids.add(ou(e)),this.lastProcessedEventTime=Date.now()}}function ou(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ad({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function bv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ad(n);default:return!1}}/**
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
 */async function Av(n,e={}){return dn(n,"GET","/v1/projects",e)}/**
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
 */const Sv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rv=/^https?/;async function Cv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Av(n);for(const t of e)try{if(Pv(t))return}catch{}st(n,"unauthorized-domain")}function Pv(n){const e=na(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Rv.test(t))return!1;if(Sv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const kv=new ps(3e4,6e4);function au(){const n=yt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xv(n){return new Promise((e,t)=>{function r(){au(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{au(),t(ct(n,"network-request-failed"))},timeout:kv.get()})}if(yt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(yt().gapi?.load)r();else{const s=Ty("iframefcb");return yt()[s]=()=>{gapi.load?r():t(ct(n,"network-request-failed"))},cd(`${wy()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Js=null,e})}let Js=null;function Nv(n){return Js=Js||xv(n),Js}/**
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
 */const Dv=new ps(5e3,15e3),Vv="__/auth/iframe",Ov="emulator/auth/iframe",Mv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Lv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $v(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?xa(e,Ov):`https://${n.config.authDomain}/${Vv}`,r={apiKey:e.apiKey,appName:n.name,v:cr},s=Lv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${fs(r).slice(1)}`}async function Fv(n){const e=await Nv(n),t=yt().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:$v(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Mv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=ct(n,"network-request-failed"),c=yt().setTimeout(()=>{i(a)},Dv.get());function u(){yt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Uv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bv=500,jv=600,qv="_blank",zv="http://localhost";class cu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Hv(n,e,t,r=Bv,s=jv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Uv,width:r.toString(),height:s.toString(),top:i,left:a},h=Be().toLowerCase();t&&(c=td(h)?qv:t),Zh(h)&&(e=e||zv,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[A,R])=>`${w}${A}=${R},`,"");if(dy(h)&&c!=="_self")return Gv(e||"",c),new cu(null);const m=window.open(e||"",c,f);q(m,n,"popup-blocked");try{m.focus()}catch{}return new cu(m)}function Gv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Wv="__/auth/handler",Kv="emulator/auth/handler",Qv=encodeURIComponent("fac");async function lu(n,e,t,r,s,i){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:cr,eventId:s};if(e instanceof Ma){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Ng(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof gs){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Qv}=${encodeURIComponent(u)}`:"";return`${Jv(n)}?${fs(c).slice(1)}${h}`}function Jv({config:n}){return n.emulator?xa(n,Kv):`https://${n.authDomain}/${Wv}`}/**
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
 */const Fo="webStorageSupport";class Yv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_d,this._completeRedirectFn=wv,this._overrideRedirectResult=yv}async _openPopup(e,t,r,s){Vt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await lu(e,t,r,na(),s);return Hv(e,i,La())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await lu(e,t,r,na(),s);return ev(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Vt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Fv(e),r=new Iv(e);return t.register("authEvent",s=>(q(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Fo,{type:Fo},s=>{const i=s?.[0]?.[Fo];i!==void 0&&t(!!i),st(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return od()||ed()||Da()}}const Xv=Yv;var uu="@firebase/auth",hu="1.13.2";/**
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
 */class Zv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function eE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tE(n){kn(new Zt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ad(n)},h=new yy(r,s,i,u);return Cy(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),kn(new Zt("auth-internal",e=>{const t=fn(e.getProvider("auth").getImmediate());return(r=>new Zv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),_t(uu,hu,eE(n)),_t(uu,hu,"esm2020")}/**
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
 */const nE=300,rE=Uh("authIdTokenMaxAge")||nE;let du=null;const sE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>rE)return;const s=t?.token;du!==s&&(du=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function iE(n=Li()){const e=Mi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ry(n,{popupRedirectResolver:Xv,persistence:[lv,Yy,_d]}),r=Uh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=sE(i.toString());Gy(t,a,()=>a(t.currentUser)),Hy(t,c=>a(c))}}const s=Lh("auth");return s&&Py(t,`http://${s}`),t}function oE(){return document.getElementsByTagName("head")?.[0]??document}vy({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ct("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",oE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tE("Browser");var aE="firebase",cE="12.14.0";/**
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
 */_t(aE,cE,"app");var fu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,Sd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function y(){}y.prototype=_.prototype,T.F=_.prototype,T.prototype=new y,T.prototype.constructor=T,T.D=function(E,v,I){for(var g=Array(arguments.length-2),K=2;K<arguments.length;K++)g[K-2]=arguments[K];return _.prototype[v].apply(E,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,y){y||(y=0);const E=Array(16);if(typeof _=="string")for(var v=0;v<16;++v)E[v]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(v=0;v<16;++v)E[v]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=T.g[0],y=T.g[1],v=T.g[2];let I=T.g[3],g;g=_+(I^y&(v^I))+E[0]+3614090360&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+E[1]+3905402710&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+E[2]+606105819&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+E[3]+3250441966&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+E[4]+4118548399&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+E[5]+1200080426&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+E[6]+2821735955&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+E[7]+4249261313&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+E[8]+1770035416&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+E[9]+2336552879&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+E[10]+4294925233&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+E[11]+2304563134&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+E[12]+1804603682&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+E[13]+4254626195&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+E[14]+2792965006&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+E[15]+1236535329&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(v^I&(y^v))+E[1]+4129170786&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+E[6]+3225465664&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+E[11]+643717713&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+E[0]+3921069994&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+E[5]+3593408605&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+E[10]+38016083&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+E[15]+3634488961&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+E[4]+3889429448&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+E[9]+568446438&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+E[14]+3275163606&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+E[3]+4107603335&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+E[8]+1163531501&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+E[13]+2850285829&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+E[2]+4243563512&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+E[7]+1735328473&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+E[12]+2368359562&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(y^v^I)+E[5]+4294588738&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+E[8]+2272392833&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+E[11]+1839030562&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+E[14]+4259657740&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+E[1]+2763975236&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+E[4]+1272893353&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+E[7]+4139469664&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+E[10]+3200236656&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+E[13]+681279174&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+E[0]+3936430074&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+E[3]+3572445317&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+E[6]+76029189&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+E[9]+3654602809&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+E[12]+3873151461&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+E[15]+530742520&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+E[2]+3299628645&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(v^(y|~I))+E[0]+4096336452&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+E[7]+1126891415&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+E[14]+2878612391&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+E[5]+4237533241&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+E[12]+1700485571&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+E[3]+2399980690&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+E[10]+4293915773&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+E[1]+2240044497&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+E[8]+1873313359&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+E[15]+4264355552&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+E[6]+2734768916&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+E[13]+1309151649&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+E[4]+4149444226&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+E[11]+3174756917&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+E[2]+718787259&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+v&4294967295,T.g[3]=T.g[3]+I&4294967295}r.prototype.v=function(T,_){_===void 0&&(_=T.length);const y=_-this.blockSize,E=this.C;let v=this.h,I=0;for(;I<_;){if(v==0)for(;I<=y;)s(this,T,I),I+=this.blockSize;if(typeof T=="string"){for(;I<_;)if(E[v++]=T.charCodeAt(I++),v==this.blockSize){s(this,E),v=0;break}}else for(;I<_;)if(E[v++]=T[I++],v==this.blockSize){s(this,E),v=0;break}}this.h=v,this.o+=_},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var y=T.length-8;y<T.length;++y)T[y]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,y=0;y<4;++y)for(let E=0;E<32;E+=8)T[_++]=this.g[y]>>>E&255;return T};function i(T,_){var y=c;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=_(T)}function a(T,_){this.h=_;const y=[];let E=!0;for(let v=T.length-1;v>=0;v--){const I=T[v]|0;E&&I==_||(y[v]=I,E=!1)}this.g=y}var c={};function u(T){return-128<=T&&T<128?i(T,function(_){return new a([_|0],_<0?-1:0)}):new a([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return N(h(-T));const _=[];let y=1;for(let E=0;T>=y;E++)_[E]=T/y|0,y*=4294967296;return new a(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return N(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(_,8));let E=m;for(let I=0;I<T.length;I+=8){var v=Math.min(8,T.length-I);const g=parseInt(T.substring(I,I+v),_);v<8?(v=h(Math.pow(_,v)),E=E.j(v).add(h(g))):(E=E.j(y),E=E.add(h(g)))}return E}var m=u(0),w=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(P(this))return-N(this).m();let T=0,_=1;for(let y=0;y<this.g.length;y++){const E=this.i(y);T+=(E>=0?E:4294967296+E)*_,_*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(R(this))return"0";if(P(this))return"-"+N(this).toString(T);const _=h(Math.pow(T,6));var y=this;let E="";for(;;){const v=G(y,_).g;y=O(y,v.j(_));let I=((y.g.length>0?y.g[0]:y.h)>>>0).toString(T);if(y=v,R(y))return I+E;for(;I.length<6;)I="0"+I;E=I+E}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function R(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function P(T){return T.h==-1}n.l=function(T){return T=O(this,T),P(T)?-1:R(T)?0:1};function N(T){const _=T.g.length,y=[];for(let E=0;E<_;E++)y[E]=~T.g[E];return new a(y,~T.h).add(w)}n.abs=function(){return P(this)?N(this):this},n.add=function(T){const _=Math.max(this.g.length,T.g.length),y=[];let E=0;for(let v=0;v<=_;v++){let I=E+(this.i(v)&65535)+(T.i(v)&65535),g=(I>>>16)+(this.i(v)>>>16)+(T.i(v)>>>16);E=g>>>16,I&=65535,g&=65535,y[v]=g<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function O(T,_){return T.add(N(_))}n.j=function(T){if(R(this)||R(T))return m;if(P(this))return P(T)?N(this).j(N(T)):N(N(this).j(T));if(P(T))return N(this.j(N(T)));if(this.l(A)<0&&T.l(A)<0)return h(this.m()*T.m());const _=this.g.length+T.g.length,y=[];for(var E=0;E<2*_;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(let v=0;v<T.g.length;v++){const I=this.i(E)>>>16,g=this.i(E)&65535,K=T.i(v)>>>16,ae=T.i(v)&65535;y[2*E+2*v]+=g*ae,F(y,2*E+2*v),y[2*E+2*v+1]+=I*ae,F(y,2*E+2*v+1),y[2*E+2*v+1]+=g*K,F(y,2*E+2*v+1),y[2*E+2*v+2]+=I*K,F(y,2*E+2*v+2)}for(T=0;T<_;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=_;T<2*_;T++)y[T]=0;return new a(y,0)};function F(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function M(T,_){this.g=T,this.h=_}function G(T,_){if(R(_))throw Error("division by zero");if(R(T))return new M(m,m);if(P(T))return _=G(N(T),_),new M(N(_.g),N(_.h));if(P(_))return _=G(T,N(_)),new M(N(_.g),_.h);if(T.g.length>30){if(P(T)||P(_))throw Error("slowDivide_ only works with positive integers.");for(var y=w,E=_;E.l(T)<=0;)y=H(y),E=H(E);var v=j(y,1),I=j(E,1);for(E=j(E,2),y=j(y,2);!R(E);){var g=I.add(E);g.l(T)<=0&&(v=v.add(y),I=g),E=j(E,1),y=j(y,1)}return _=O(T,v.j(_)),new M(v,_)}for(v=m;T.l(_)>=0;){for(y=Math.max(1,Math.floor(T.m()/_.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),I=h(y),g=I.j(_);P(g)||g.l(T)>0;)y-=E,I=h(y),g=I.j(_);R(I)&&(I=w),v=v.add(I),T=O(T,g)}return new M(v,T)}n.B=function(T){return G(this,T).h},n.and=function(T){const _=Math.max(this.g.length,T.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)&T.i(E);return new a(y,this.h&T.h)},n.or=function(T){const _=Math.max(this.g.length,T.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)|T.i(E);return new a(y,this.h|T.h)},n.xor=function(T){const _=Math.max(this.g.length,T.g.length),y=[];for(let E=0;E<_;E++)y[E]=this.i(E)^T.i(E);return new a(y,this.h^T.h)};function H(T){const _=T.g.length+1,y=[];for(let E=0;E<_;E++)y[E]=T.i(E)<<1|T.i(E-1)>>>31;return new a(y,T.h)}function j(T,_){const y=_>>5;_%=32;const E=T.g.length-y,v=[];for(let I=0;I<E;I++)v[I]=_>0?T.i(I+y)>>>_|T.i(I+y+1)<<32-_:T.i(I+y);return new a(v,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Sd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Yt=a}).apply(typeof fu<"u"?fu:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Rd,Mr,Cd,Ys,ia,Pd,kd,xd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var b=o[p];if(!(b in d))break e;d=d[b]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=u,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function m(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(p,b,S){for(var D=Array(arguments.length-2),J=2;J<arguments.length;J++)D[J-2]=arguments[J];return l.prototype[b].apply(p,D)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function A(o){const l=o.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function R(o,l){for(let p=1;p<arguments.length;p++){const b=arguments[p];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=o.length||0;const S=b.length||0;o.length=d+S;for(let D=0;D<S;D++)o[d+D]=b[D]}else o.push(b)}}class P{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function N(o){a.setTimeout(()=>{throw o},0)}function O(){var o=T;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class F{constructor(){this.h=this.g=null}add(l,d){const p=M.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var M=new P(()=>new G,o=>o.reset());class G{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let H,j=!1,T=new F,_=()=>{const o=Promise.resolve(void 0);H=()=>{o.then(y)}};function y(){for(var o;o=O();){try{o.h.call(o.g)}catch(d){N(d)}var l=M;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}j=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var I=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function K(o,l){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}m(K,v),K.prototype.init=function(o,l){const d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&K.Z.h.call(this)},K.prototype.h=function(){K.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ae="closure_listenable_"+(Math.random()*1e6|0),it=0;function qe(o,l,d,p,b){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=b,this.key=++it,this.da=this.fa=!1}function ze(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ve(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function ft(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function nt(o){const l={};for(const d in o)l[d]=o[d];return l}const Se="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function de(o,l){let d,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(d in p)o[d]=p[d];for(let S=0;S<Se.length;S++)d=Se[S],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function fe(o){this.src=o,this.g={},this.h=0}fe.prototype.add=function(o,l,d,p,b){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const D=ot(o,l,p,b);return D>-1?(l=o[D],d||(l.fa=!1)):(l=new qe(l,this.src,S,!!p,b),l.fa=d,o.push(l)),l};function ke(o,l){const d=l.type;if(d in o.g){var p=o.g[d],b=Array.prototype.indexOf.call(p,l,void 0),S;(S=b>=0)&&Array.prototype.splice.call(p,b,1),S&&(ze(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function ot(o,l,d,p){for(let b=0;b<o.length;++b){const S=o[b];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return b}return-1}var Xe="closure_lm_"+(Math.random()*1e6|0),$t={};function $n(o,l,d,p,b){if(Array.isArray(l)){for(let S=0;S<l.length;S++)$n(o,l[S],d,p,b);return null}return d=Dc(d),o&&o[ae]?o.J(l,d,c(p)?!!p.capture:!1,b):As(o,l,d,!1,p,b)}function As(o,l,d,p,b,S){if(!l)throw Error("Invalid event type");const D=c(b)?!!b.capture:!!b;let J=mr(o);if(J||(o[Xe]=J=new fe(o)),d=J.add(l,d,p,D,S),d.proxy)return d;if(p=ho(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)I||(b=D),b===void 0&&(b=!1),o.addEventListener(l.toString(),p,b);else if(o.attachEvent)o.attachEvent(ce(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function ho(){function o(d){return l.call(o.src,o.listener,d)}const l=bt;return o}function Ss(o,l,d,p,b){if(Array.isArray(l))for(var S=0;S<l.length;S++)Ss(o,l[S],d,p,b);else p=c(p)?!!p.capture:!!p,d=Dc(d),o&&o[ae]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],d=ot(l,d,p,b),d>-1&&(ze(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=mr(o))&&(l=o.g[l.toString()],o=-1,l&&(o=ot(l,d,p,b)),(d=o>-1?l[o]:null)&&Fn(d))}function Fn(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[ae])ke(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(ce(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=mr(l))?(ke(d,o),d.h==0&&(d.src=null,l[Xe]=null)):ze(o)}}}function ce(o){return o in $t?$t[o]:$t[o]="on"+o}function bt(o,l){if(o.da)o=!0;else{l=new K(l,this);const d=o.listener,p=o.ha||o.src;o.fa&&Fn(o),o=d.call(p,l)}return o}function mr(o){return o=o[Xe],o instanceof fe?o:null}var fo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Dc(o){return typeof o=="function"?o:(o[fo]||(o[fo]=function(l){return o.handleEvent(l)}),o[fo])}function Oe(){E.call(this),this.i=new fe(this),this.M=this,this.G=null}m(Oe,E),Oe.prototype[ae]=!0,Oe.prototype.removeEventListener=function(o,l,d,p){Ss(this,o,l,d,p)};function He(o,l){var d,p=o.G;if(p)for(d=[];p;p=p.G)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new v(l,o);else if(l instanceof v)l.target=l.target||o;else{var b=l;l=new v(p,o),de(l,b)}b=!0;let S,D;if(d)for(D=d.length-1;D>=0;D--)S=l.g=d[D],b=Rs(S,p,!0,l)&&b;if(S=l.g=o,b=Rs(S,p,!0,l)&&b,b=Rs(S,p,!1,l)&&b,d)for(D=0;D<d.length;D++)S=l.g=d[D],b=Rs(S,p,!1,l)&&b}Oe.prototype.N=function(){if(Oe.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let p=0;p<d.length;p++)ze(d[p]);delete o.g[l],o.h--}}this.G=null},Oe.prototype.J=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},Oe.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function Rs(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let S=0;S<l.length;++S){const D=l[S];if(D&&!D.da&&D.capture==d){const J=D.listener,Te=D.ha||D.src;D.fa&&ke(o.i,D),b=J.call(Te,p)!==!1&&b}}return b&&!p.defaultPrevented}function gp(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Vc(o){o.g=gp(()=>{o.g=null,o.i&&(o.i=!1,Vc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class _p extends E{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Vc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gr(o){E.call(this),this.h=o,this.g={}}m(gr,E);var Oc=[];function Mc(o){Ve(o.g,function(l,d){this.g.hasOwnProperty(d)&&Fn(l)},o),o.g={}}gr.prototype.N=function(){gr.Z.N.call(this),Mc(this)},gr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var po=a.JSON.stringify,yp=a.JSON.parse,vp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Lc(){}function $c(){}var _r={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function mo(){v.call(this,"d")}m(mo,v);function go(){v.call(this,"c")}m(go,v);var _n={},Fc=null;function Cs(){return Fc=Fc||new Oe}_n.Ia="serverreachability";function Uc(o){v.call(this,_n.Ia,o)}m(Uc,v);function yr(o){const l=Cs();He(l,new Uc(l))}_n.STAT_EVENT="statevent";function Bc(o,l){v.call(this,_n.STAT_EVENT,o),this.stat=l}m(Bc,v);function Ge(o){const l=Cs();He(l,new Bc(l,o))}_n.Ja="timingevent";function jc(o,l){v.call(this,_n.Ja,o),this.size=l}m(jc,v);function vr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Er(){this.g=!0}Er.prototype.ua=function(){this.g=!1};function Ep(o,l,d,p,b,S){o.info(function(){if(o.g)if(S){var D="",J=S.split("&");for(let se=0;se<J.length;se++){var Te=J[se].split("=");if(Te.length>1){const Re=Te[0];Te=Te[1];const mt=Re.split("_");D=mt.length>=2&&mt[1]=="type"?D+(Re+"="+Te+"&"):D+(Re+"=redacted&")}}}else D=null;else D=S;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+l+`
`+d+`
`+D})}function wp(o,l,d,p,b,S,D){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+l+`
`+d+`
`+S+" "+D})}function Un(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Ip(o,d)+(p?" "+p:"")})}function Tp(o,l){o.info(function(){return"TIMEOUT: "+l})}Er.prototype.info=function(){};function Ip(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var b=p[0];if(b!="noop"&&b!="stop"&&b!="close")for(let D=1;D<p.length;D++)p[D]=""}}}}return po(S)}catch{return l}}var Ps={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},qc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},zc;function _o(){}m(_o,Lc),_o.prototype.g=function(){return new XMLHttpRequest},zc=new _o;function wr(o){return encodeURIComponent(String(o))}function bp(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function Ft(o,l,d,p){this.j=o,this.i=l,this.l=d,this.S=p||1,this.V=new gr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Hc}function Hc(){this.i=null,this.g="",this.h=!1}var Gc={},yo={};function vo(o,l,d){o.M=1,o.A=xs(pt(l)),o.u=d,o.R=!0,Wc(o,null)}function Wc(o,l){o.F=Date.now(),ks(o),o.B=pt(o.A);var d=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),ol(d.i,"t",p),o.C=0,d=o.j.L,o.h=new Hc,o.g=bl(o.j,d?l:null,!o.u),o.P>0&&(o.O=new _p(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,p=o.ba;var b="readystatechange";Array.isArray(b)||(b&&(Oc[0]=b.toString()),b=Oc);for(let S=0;S<b.length;S++){const D=$n(d,b[S],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=o.J?nt(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),yr(),Ep(o.i,o.v,o.B,o.l,o.S,o.u)}Ft.prototype.ba=function(o){o=o.target;const l=this.O;l&&jt(o)==3?l.j():this.Y(o)},Ft.prototype.Y=function(o){try{if(o==this.g)e:{const J=jt(this.g),Te=this.g.ya(),se=this.g.ca();if(!(J<3)&&(J!=3||this.g&&(this.h.h||this.g.la()||fl(this.g)))){this.K||J!=4||Te==7||(Te==8||se<=0?yr(3):yr(2)),Eo(this);var l=this.g.ca();this.X=l;var d=Ap(this);if(this.o=l==200,wp(this.i,this.v,this.B,this.l,this.S,J,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,b=this.g;if((p=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(p)){var S=p;break t}}S=null}if(o=S)Un(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,wo(this,o);else{this.o=!1,this.m=3,Ge(12),yn(this),Tr(this);break e}}if(this.R){o=!0;let Re;for(;!this.K&&this.C<d.length;)if(Re=Sp(this,d),Re==yo){J==4&&(this.m=4,Ge(14),o=!1),Un(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==Gc){this.m=4,Ge(15),Un(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Un(this.i,this.l,Re,null),wo(this,Re);if(Kc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||d.length!=0||this.h.h||(this.m=1,Ge(16),o=!1),this.o=this.o&&o,!o)Un(this.i,this.l,d,"[Invalid Chunked Response]"),yn(this),Tr(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Po(D),D.P=!0,Ge(11))}}else Un(this.i,this.l,d,null),wo(this,d);J==4&&yn(this),this.o&&!this.K&&(J==4?El(this.j,this):(this.o=!1,ks(this)))}else Up(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Ge(12)):(this.m=0,Ge(13)),yn(this),Tr(this)}}}catch{}finally{}};function Ap(o){if(!Kc(o))return o.g.la();const l=fl(o.g);if(l==="")return"";let d="";const p=l.length,b=jt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return yn(o),Tr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<p;S++)o.h.h=!0,d+=o.h.i.decode(l[S],{stream:!(b&&S==p-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function Kc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Sp(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?yo:(d=Number(l.substring(d,p)),isNaN(d)?Gc:(p+=1,p+d>l.length?yo:(l=l.slice(p,p+d),o.C=p+d,l)))}Ft.prototype.cancel=function(){this.K=!0,yn(this)};function ks(o){o.T=Date.now()+o.H,Qc(o,o.H)}function Qc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=vr(h(o.aa,o),l)}function Eo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ft.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Tp(this.i,this.B),this.M!=2&&(yr(),Ge(17)),yn(this),this.m=2,Tr(this)):Qc(this,this.T-o)};function Tr(o){o.j.I==0||o.K||El(o.j,o)}function yn(o){Eo(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,Mc(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function wo(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||To(d.h,o))){if(!o.L&&To(d.h,o)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Ms(d),Vs(d);else break e;Co(d),Ge(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=vr(h(d.Va,d),6e3));Xc(d.h)<=1&&d.ta&&(d.ta=void 0)}else En(d,11)}else if((o.L||d.g==o)&&Ms(d),!g(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let se=b[l];const Re=se[0];if(!(Re<=d.K))if(d.K=Re,se=se[1],d.I==2)if(se[0]=="c"){d.M=se[1],d.ba=se[2];const mt=se[3];mt!=null&&(d.ka=mt,d.j.info("VER="+d.ka));const wn=se[4];wn!=null&&(d.za=wn,d.j.info("SVER="+d.za));const qt=se[5];qt!=null&&typeof qt=="number"&&qt>0&&(p=1.5*qt,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const zt=o.g;if(zt){const $s=zt.g?zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($s){var S=p.h;S.g||$s.indexOf("spdy")==-1&&$s.indexOf("quic")==-1&&$s.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Io(S,S.h),S.h=null))}if(p.G){const ko=zt.g?zt.g.getResponseHeader("X-HTTP-Session-Id"):null;ko&&(p.wa=ko,le(p.J,p.G,ko))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var D=o;if(p.na=Il(p,p.L?p.ba:null,p.W),D.L){Zc(p.h,D);var J=D,Te=p.O;Te&&(J.H=Te),J.D&&(Eo(J),ks(J)),p.g=D}else yl(p);d.i.length>0&&Os(d)}else se[0]!="stop"&&se[0]!="close"||En(d,7);else d.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?En(d,7):Ro(d):se[0]!="noop"&&d.l&&d.l.qa(se),d.A=0)}}yr(4)}catch{}}var Rp=class{constructor(o,l){this.g=o,this.map=l}};function Jc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Yc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Xc(o){return o.h?1:o.g?o.g.size:0}function To(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Io(o,l){o.g?o.g.add(l):o.h=l}function Zc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Jc.prototype.cancel=function(){if(this.i=el(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function el(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return A(o.i)}var tl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cp(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const p=o[d].indexOf("=");let b,S=null;p>=0?(b=o[d].substring(0,p),S=o[d].substring(p+1)):b=o[d],l(b,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Ut(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Ut?(this.l=o.l,Ir(this,o.j),this.o=o.o,this.g=o.g,br(this,o.u),this.h=o.h,bo(this,al(o.i)),this.m=o.m):o&&(l=String(o).match(tl))?(this.l=!1,Ir(this,l[1]||"",!0),this.o=Ar(l[2]||""),this.g=Ar(l[3]||"",!0),br(this,l[4]),this.h=Ar(l[5]||"",!0),bo(this,l[6]||"",!0),this.m=Ar(l[7]||"")):(this.l=!1,this.i=new Rr(null,this.l))}Ut.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Sr(l,nl,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Sr(l,nl,!0),"@"),o.push(wr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Sr(d,d.charAt(0)=="/"?xp:kp,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Sr(d,Dp)),o.join("")},Ut.prototype.resolve=function(o){const l=pt(this);let d=!!o.j;d?Ir(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var p=o.h;if(d)br(l,o.u);else if(d=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var b=l.h.lastIndexOf("/");b!=-1&&(p=l.h.slice(0,b+1)+p)}if(b=p,b==".."||b==".")p="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){p=b.lastIndexOf("/",0)==0,b=b.split("/");const S=[];for(let D=0;D<b.length;){const J=b[D++];J=="."?p&&D==b.length&&S.push(""):J==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),p&&D==b.length&&S.push("")):(S.push(J),p=!0)}p=S.join("/")}else p=b}return d?l.h=p:d=o.i.toString()!=="",d?bo(l,al(o.i)):d=!!o.m,d&&(l.m=o.m),l};function pt(o){return new Ut(o)}function Ir(o,l,d){o.j=d?Ar(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function br(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function bo(o,l,d){l instanceof Rr?(o.i=l,Vp(o.i,o.l)):(d||(l=Sr(l,Np)),o.i=new Rr(l,o.l))}function le(o,l,d){o.i.set(l,d)}function xs(o){return le(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Ar(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Sr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Pp),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var nl=/[#\/\?@]/g,kp=/[#\?:]/g,xp=/[#\?]/g,Np=/[#\?@]/g,Dp=/#/g;function Rr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function vn(o){o.g||(o.g=new Map,o.h=0,o.i&&Cp(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Rr.prototype,n.add=function(o,l){vn(this),this.i=null,o=Bn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function rl(o,l){vn(o),l=Bn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function sl(o,l){return vn(o),l=Bn(o,l),o.g.has(l)}n.forEach=function(o,l){vn(this),this.g.forEach(function(d,p){d.forEach(function(b){o.call(l,b,p,this)},this)},this)};function il(o,l){vn(o);let d=[];if(typeof l=="string")sl(o,l)&&(d=d.concat(o.g.get(Bn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}n.set=function(o,l){return vn(this),this.i=null,o=Bn(this,o),sl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=il(this,o),o.length>0?String(o[0]):l):l};function ol(o,l,d){rl(o,l),d.length>0&&(o.i=null,o.g.set(Bn(o,l),A(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const b=wr(d);d=il(this,d);for(let S=0;S<d.length;S++){let D=b;d[S]!==""&&(D+="="+wr(d[S])),o.push(D)}}return this.i=o.join("&")};function al(o){const l=new Rr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Bn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Vp(o,l){l&&!o.j&&(vn(o),o.i=null,o.g.forEach(function(d,p){const b=p.toLowerCase();p!=b&&(rl(this,p),ol(this,b,d))},o)),o.j=l}function Op(o,l){const d=new Er;if(a.Image){const p=new Image;p.onload=f(Bt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Bt,d,"TestLoadImage: error",!1,l,p),p.onabort=f(Bt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Bt,d,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function Mp(o,l){const d=new Er,p=new AbortController,b=setTimeout(()=>{p.abort(),Bt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(S=>{clearTimeout(b),S.ok?Bt(d,"TestPingServer: ok",!0,l):Bt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Bt(d,"TestPingServer: error",!1,l)})}function Bt(o,l,d,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(d)}catch{}}function Lp(){this.g=new vp}function Ao(o){this.i=o.Sb||null,this.h=o.ab||!1}m(Ao,Lc),Ao.prototype.g=function(){return new Ns(this.i,this.h)};function Ns(o,l){Oe.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ns,Oe),n=Ns.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,Pr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Pr(this)),this.g&&(this.readyState=3,Pr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;cl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function cl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Cr(this):Pr(this),this.readyState==3&&cl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Cr(this))},n.Na=function(o){this.g&&(this.response=o,Cr(this))},n.ga=function(){this.g&&Cr(this)};function Cr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Pr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Pr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ns.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function ll(o){let l="";return Ve(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function So(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=ll(d),typeof o=="string"?d!=null&&wr(d):le(o,l,d))}function pe(o){Oe.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(pe,Oe);var $p=/^https?$/i,Fp=["POST","PUT"];n=pe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():zc.g(),this.g.onreadystatechange=w(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){ul(this,S);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)d.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),b=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Fp,l,void 0)>=0)||p||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of d)this.g.setRequestHeader(S,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){ul(this,S)}};function ul(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,hl(o),Ds(o)}function hl(o){o.A||(o.A=!0,He(o,"complete"),He(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,He(this,"complete"),He(this,"abort"),Ds(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ds(this,!0)),pe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?dl(this):this.Xa())},n.Xa=function(){dl(this)};function dl(o){if(o.h&&typeof i<"u"){if(o.v&&jt(o)==4)setTimeout(o.Ca.bind(o),0);else if(He(o,"readystatechange"),jt(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=S===0){let D=String(o.D).match(tl)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),p=!$p.test(D?D.toLowerCase():"")}d=p}if(d)He(o,"complete"),He(o,"success");else{o.o=6;try{var b=jt(o)>2?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.ca()+"]",hl(o)}}finally{Ds(o)}}}}function Ds(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||He(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function jt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return jt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),yp(l)}};function fl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Up(o){const l={};o=(o.g&&jt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(g(o[p]))continue;var d=bp(o[p]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[b]||[];l[b]=S,S.push(d)}ft(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function kr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function pl(o){this.za=0,this.i=[],this.j=new Er,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=kr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=kr("baseRetryDelayMs",5e3,o),this.Za=kr("retryDelaySeedMs",1e4,o),this.Ta=kr("forwardChannelMaxRetries",2,o),this.va=kr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Jc(o&&o.concurrentRequestLimit),this.Ba=new Lp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=pl.prototype,n.ka=8,n.I=1,n.connect=function(o,l,d,p){Ge(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=Il(this,null,this.W),Os(this)};function Ro(o){if(ml(o),o.I==3){var l=o.V++,d=pt(o.J);if(le(d,"SID",o.M),le(d,"RID",l),le(d,"TYPE","terminate"),xr(o,d),l=new Ft(o,o.j,l),l.M=2,l.A=xs(pt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=bl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ks(l)}Tl(o)}function Vs(o){o.g&&(Po(o),o.g.cancel(),o.g=null)}function ml(o){Vs(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ms(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Os(o){if(!Yc(o.h)&&!o.m){o.m=!0;var l=o.Ea;H||_(),j||(H(),j=!0),T.add(l,o),o.D=0}}function Bp(o,l){return Xc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=vr(h(o.Ea,o,l),wl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const b=new Ft(this,this.j,o);let S=this.o;if(this.U&&(S?(S=nt(S),de(S,this.U)):S=this.U),this.u!==null||this.R||(b.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=_l(this,b,l),d=pt(this.J),le(d,"RID",o),le(d,"CVER",22),this.G&&le(d,"X-HTTP-Session-Id",this.G),xr(this,d),S&&(this.R?l="headers="+wr(ll(S))+"&"+l:this.u&&So(d,this.u,S)),Io(this.h,b),this.Ra&&le(d,"TYPE","init"),this.S?(le(d,"$req",l),le(d,"SID","null"),b.U=!0,vo(b,d,null)):vo(b,d,l),this.I=2}}else this.I==3&&(o?gl(this,o):this.i.length==0||Yc(this.h)||gl(this))};function gl(o,l){var d;l?d=l.l:d=o.V++;const p=pt(o.J);le(p,"SID",o.M),le(p,"RID",d),le(p,"AID",o.K),xr(o,p),o.u&&o.o&&So(p,o.u,o.o),d=new Ft(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=_l(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Io(o.h,d),vo(d,p,l)}function xr(o,l){o.H&&Ve(o.H,function(d,p){le(l,p,d)}),o.l&&Ve({},function(d,p){le(l,p,d)})}function _l(o,l,d){d=Math.min(o.i.length,d);const p=o.l?h(o.l.Ka,o.l,o):null;e:{var b=o.i;let J=-1;for(;;){const Te=["count="+d];J==-1?d>0?(J=b[0].g,Te.push("ofs="+J)):J=0:Te.push("ofs="+J);let se=!0;for(let Re=0;Re<d;Re++){var S=b[Re].g;const mt=b[Re].map;if(S-=J,S<0)J=Math.max(0,b[Re].g-100),se=!1;else try{S="req"+S+"_"||"";try{var D=mt instanceof Map?mt:Object.entries(mt);for(const[wn,qt]of D){let zt=qt;c(qt)&&(zt=po(qt)),Te.push(S+wn+"="+encodeURIComponent(zt))}}catch(wn){throw Te.push(S+"type="+encodeURIComponent("_badmap")),wn}}catch{p&&p(mt)}}if(se){D=Te.join("&");break e}}D=void 0}return o=o.i.splice(0,d),l.G=o,D}function yl(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;H||_(),j||(H(),j=!0),T.add(l,o),o.A=0}}function Co(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=vr(h(o.Da,o),wl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,vl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=vr(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ge(10),Vs(this),vl(this))};function Po(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function vl(o){o.g=new Ft(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=pt(o.na);le(l,"RID","rpc"),le(l,"SID",o.M),le(l,"AID",o.K),le(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&le(l,"TO",o.ia),le(l,"TYPE","xmlhttp"),xr(o,l),o.u&&o.o&&So(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=xs(pt(l)),d.u=null,d.R=!0,Wc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Vs(this),Co(this),Ge(19))};function Ms(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function El(o,l){var d=null;if(o.g==l){Ms(o),Po(o),o.g=null;var p=2}else if(To(o.h,l))d=l.G,Zc(o.h,l),p=1;else return;if(o.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=o.D;p=Cs(),He(p,new jc(p,d)),Os(o)}else yl(o);else if(b=l.m,b==3||b==0&&l.X>0||!(p==1&&Bp(o,l)||p==2&&Co(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),b){case 1:En(o,5);break;case 4:En(o,10);break;case 3:En(o,6);break;default:En(o,2)}}}function wl(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function En(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),p=o.Ua;const b=!p;p=new Ut(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ir(p,"https"),xs(p),b?Op(p.toString(),d):Mp(p.toString(),d)}else Ge(2);o.I=0,o.l&&o.l.pa(l),Tl(o),ml(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ge(2)):(this.j.info("Failed to ping google.com"),Ge(1))};function Tl(o){if(o.I=0,o.ja=[],o.l){const l=el(o.h);(l.length!=0||o.i.length!=0)&&(R(o.ja,l),R(o.ja,o.i),o.h.i.length=0,A(o.i),o.i.length=0),o.l.oa()}}function Il(o,l,d){var p=d instanceof Ut?pt(d):new Ut(d);if(p.g!="")l&&(p.g=l+"."+p.g),br(p,p.u);else{var b=a.location;p=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const S=new Ut(null);p&&Ir(S,p),l&&(S.g=l),b&&br(S,b),d&&(S.h=d),p=S}return d=o.G,l=o.wa,d&&l&&le(p,d,l),le(p,"VER",o.ka),xr(o,p),p}function bl(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new pe(new Ao({ab:d})):new pe(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Al(){}n=Al.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ls(){}Ls.prototype.g=function(o,l){return new Ze(o,l)};function Ze(o,l){Oe.call(this),this.g=new pl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!g(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new jn(this)}m(Ze,Oe),Ze.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ze.prototype.close=function(){Ro(this.g)},Ze.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=po(o),o=d);l.i.push(new Rp(l.Ya++,o)),l.I==3&&Os(l)},Ze.prototype.N=function(){this.g.l=null,delete this.j,Ro(this.g),delete this.g,Ze.Z.N.call(this)};function Sl(o){mo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}m(Sl,mo);function Rl(){go.call(this),this.status=1}m(Rl,go);function jn(o){this.g=o}m(jn,Al),jn.prototype.ra=function(){He(this.g,"a")},jn.prototype.qa=function(o){He(this.g,new Sl(o))},jn.prototype.pa=function(o){He(this.g,new Rl)},jn.prototype.oa=function(){He(this.g,"b")},Ls.prototype.createWebChannel=Ls.prototype.g,Ze.prototype.send=Ze.prototype.o,Ze.prototype.open=Ze.prototype.m,Ze.prototype.close=Ze.prototype.close,xd=function(){return new Ls},kd=function(){return Cs()},Pd=_n,ia={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ps.NO_ERROR=0,Ps.TIMEOUT=8,Ps.HTTP_ERROR=6,Ys=Ps,qc.COMPLETE="complete",Cd=qc,$c.EventType=_r,_r.OPEN="a",_r.CLOSE="b",_r.ERROR="c",_r.MESSAGE="d",Oe.prototype.listen=Oe.prototype.J,Mr=$c,pe.prototype.listenOnce=pe.prototype.K,pe.prototype.getLastError=pe.prototype.Ha,pe.prototype.getLastErrorCode=pe.prototype.ya,pe.prototype.getStatus=pe.prototype.ca,pe.prototype.getResponseJson=pe.prototype.La,pe.prototype.getResponseText=pe.prototype.la,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Fa,Rd=pe}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class Le{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Le.UNAUTHENTICATED=new Le(null),Le.GOOGLE_CREDENTIALS=new Le("google-credentials-uid"),Le.FIRST_PARTY=new Le("first-party-uid"),Le.MOCK_USER=new Le("mock-user");/**
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
 */let ur="12.14.0";function lE(n){ur=n}/**
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
 */const Dn=new Ra("@firebase/firestore");function Hn(){return Dn.logLevel}function L(n,...e){if(Dn.logLevel<=ee.DEBUG){const t=e.map(Fa);Dn.debug(`Firestore (${ur}): ${n}`,...t)}}function Ot(n,...e){if(Dn.logLevel<=ee.ERROR){const t=e.map(Fa);Dn.error(`Firestore (${ur}): ${n}`,...t)}}function Vn(n,...e){if(Dn.logLevel<=ee.WARN){const t=e.map(Fa);Dn.warn(`Firestore (${ur}): ${n}`,...t)}}function Fa(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Nd(n,r,t)}function Nd(n,e,t){let r=`FIRESTORE (${ur}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ot(r),new Error(r)}function re(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Nd(e,s,r)}function Q(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $ extends dt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class xt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class Dd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class uE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Le.UNAUTHENTICATED)))}shutdown(){}}class hE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class dE{constructor(e){this.t=e,this.currentUser=Le.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){re(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new xt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new xt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new xt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(re(typeof r.accessToken=="string",31837,{l:r}),new Dd(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return re(e===null||typeof e=="string",2055,{h:e}),new Le(e)}}class fE{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Le.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class pE{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new fE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Le.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class pu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ke(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){re(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new pu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(re(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new pu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function gE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Ua{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=gE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function oa(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Uo(s)===Uo(i)?X(s,i):Uo(s)?1:-1}return X(n.length,e.length)}const _E=55296,yE=57343;function Uo(n){const e=n.charCodeAt(0);return e>=_E&&e<=yE}function tr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */const mu="__name__";class gt{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return gt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof gt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=gt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return X(e.length,t.length)}static compareSegments(e,t){const r=gt.isNumericId(e),s=gt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?gt.extractNumericId(e).compare(gt.extractNumericId(t)):oa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Yt.fromString(e.substring(4,e.length-2))}}class ie extends gt{construct(e,t,r){return new ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new $(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new ie(t)}static emptyPath(){return new ie([])}}const vE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ne extends gt{construct(e,t,r){return new Ne(e,t,r)}static isValidIdentifier(e){return vE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ne.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===mu}static keyField(){return new Ne([mu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new $(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new $(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new $(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new $(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ne(t)}static emptyPath(){return new Ne([])}}/**
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
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(ie.fromString(e))}static fromName(e){return new U(ie.fromString(e).popFirst(5))}static empty(){return new U(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new ie(e.slice()))}}/**
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
 */function Vd(n,e,t){if(!t)throw new $(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function EE(n,e,t,r){if(e===!0&&r===!0)throw new $(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function gu(n){if(!U.isDocumentKey(n))throw new $(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function _u(n){if(U.isDocumentKey(n))throw new $(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Od(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Bi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function tt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new $(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Bi(n);throw new $(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function we(n,e){const t={typeString:n};return e&&(t.value=e),t}function ys(n,e){if(!Od(n))throw new $(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new $(C.INVALID_ARGUMENT,t);return!0}/**
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
 */const yu=-62135596800,vu=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*vu);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new $(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new $(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yu)throw new $(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vu}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ys(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:we("string",oe._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};/**
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
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new oe(0,0))}static max(){return new W(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const es=-1;function wE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new en(s,U.empty(),e)}function TE(n){return new en(n.readTime,n.key,es)}class en{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new en(W.min(),U.empty(),es)}static max(){return new en(W.max(),U.empty(),es)}}function IE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
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
 */const bE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class AE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function hr(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==bE)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):k.reject(t)}static resolve(e){return new k(((t,r)=>{t(e)}))}static reject(e){return new k(((t,r)=>{r(e)}))}static waitFor(e){return new k(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next((s=>s?k.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new k(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new k(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function SE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function dr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ji{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ji.ce=-1;/**
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
 */const Ba=-1;function qi(n){return n==null}function gi(n){return n===0&&1/n==-1/0}function RE(n){return typeof n=="number"&&Number.isInteger(n)&&!gi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Md="";function CE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Eu(e)),e=PE(n.get(t),e);return Eu(e)}function PE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Md:t+="";break;default:t+=i}}return t}function Eu(n){return n+Md+""}/**
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
 */function wu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ld(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||xe.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,xe.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new js(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new js(this.root,e,this.comparator,!1)}getReverseIterator(){return new js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new js(this.root,e,this.comparator,!0)}}class js{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class xe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??xe.RED,this.left=s??xe.EMPTY,this.right=i??xe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new xe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return xe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return xe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,xe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,xe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}xe.EMPTY=null,xe.RED=!0,xe.BLACK=!1;xe.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ae{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Tu(this.data.getIterator())}getIteratorFrom(e){return new Tu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class Tu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class et{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new et([])}unionWith(e){let t=new Ae(Ne.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new et(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return tr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class $d extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class De{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new $d("Invalid base64 string: "+i):i}})(e);return new De(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new De(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}De.EMPTY_BYTE_STRING=new De("");const kE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(n){if(re(!!n,39018),typeof n=="string"){let e=0;const t=kE.exec(n);if(re(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ye(n.seconds),nanos:ye(n.nanos)}}function ye(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?De.fromBase64String(n):De.fromUint8Array(n)}/**
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
 */const Fd="server_timestamp",Ud="__type__",Bd="__previous_value__",jd="__local_write_time__";function ja(n){return(n?.mapValue?.fields||{})[Ud]?.stringValue===Fd}function zi(n){const e=n.mapValue.fields[Bd];return ja(e)?zi(e):e}function ts(n){const e=tn(n.mapValue.fields[jd].timestampValue);return new oe(e.seconds,e.nanos)}/**
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
 */class xE{constructor(e,t,r,s,i,a,c,u,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const _i="(default)";class ns{constructor(e,t){this.projectId=e,this.database=t||_i}static empty(){return new ns("","")}get isDefaultDatabase(){return this.database===_i}isEqual(e){return e instanceof ns&&e.projectId===this.projectId&&e.database===this.database}}function NE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new $(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ns(n.options.projectId,e)}/**
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
 */const qd="__type__",DE="__max__",qs={mapValue:{}},zd="__vector__",yi="value";function rn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ja(n)?4:OE(n)?9007199254740991:VE(n)?10:11:z(28295,{value:n})}function Tt(n,e){if(n===e)return!0;const t=rn(n);if(t!==rn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ts(n).isEqual(ts(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=tn(s.timestampValue),c=tn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return nn(s.bytesValue).isEqual(nn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ye(s.geoPointValue.latitude)===ye(i.geoPointValue.latitude)&&ye(s.geoPointValue.longitude)===ye(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ye(s.integerValue)===ye(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ye(s.doubleValue),c=ye(i.doubleValue);return a===c?gi(a)===gi(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return tr(n.arrayValue.values||[],e.arrayValue.values||[],Tt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(wu(a)!==wu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Tt(a[u],c[u])))return!1;return!0})(n,e);default:return z(52216,{left:n})}}function rs(n,e){return(n.values||[]).find((t=>Tt(t,e)))!==void 0}function nr(n,e){if(n===e)return 0;const t=rn(n),r=rn(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=ye(i.integerValue||i.doubleValue),u=ye(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return Iu(n.timestampValue,e.timestampValue);case 4:return Iu(ts(n),ts(e));case 5:return oa(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=nn(i),u=nn(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=X(c[h],u[h]);if(f!==0)return f}return X(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=X(ye(i.latitude),ye(a.latitude));return c!==0?c:X(ye(i.longitude),ye(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return bu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},u=a.fields||{},h=c[yi]?.arrayValue,f=u[yi]?.arrayValue,m=X(h?.values?.length||0,f?.values?.length||0);return m!==0?m:bu(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===qs.mapValue&&a===qs.mapValue)return 0;if(i===qs.mapValue)return 1;if(a===qs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const w=oa(u[m],f[m]);if(w!==0)return w;const A=nr(c[u[m]],h[f[m]]);if(A!==0)return A}return X(u.length,f.length)})(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function Iu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=tn(n),r=tn(e),s=X(t.seconds,r.seconds);return s!==0?s:X(t.nanos,r.nanos)}function bu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=nr(t[s],r[s]);if(i)return i}return X(t.length,r.length)}function rr(n){return aa(n)}function aa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=tn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return nn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return U.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=aa(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${aa(t.fields[a])}`;return s+"}"})(n.mapValue):z(61005,{value:n})}function Xs(n){switch(rn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zi(n);return e?16+Xs(e):16;case 5:return 2*n.stringValue.length;case 6:return nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Xs(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return pn(r.fields,((i,a)=>{s+=i.length+Xs(a)})),s})(n.mapValue);default:throw z(13486,{value:n})}}function Au(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ss(n){return!!n&&"integerValue"in n}function Hd(n){return ss(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function qa(n){return!!n&&"arrayValue"in n}function Su(n){return!!n&&"nullValue"in n}function Ru(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zs(n){return!!n&&"mapValue"in n}function VE(n){return(n?.mapValue?.fields||{})[qd]?.stringValue===zd}function jr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return pn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=jr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=jr(n.arrayValue.values[t]);return e}return{...n}}function OE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===DE}/**
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
 */class Qe{constructor(e){this.value=e}static empty(){return new Qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Zs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=jr(t)}setAll(e){let t=Ne.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=jr(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Zs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Zs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){pn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Qe(jr(this.value))}}function Gd(n){const e=[];return pn(n.fields,((t,r)=>{const s=new Ne([t]);if(Zs(r)){const i=Gd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new et(e)}/**
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
 */class $e{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new $e(e,0,W.min(),W.min(),W.min(),Qe.empty(),0)}static newFoundDocument(e,t,r,s){return new $e(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new $e(e,2,t,W.min(),W.min(),Qe.empty(),0)}static newUnknownDocument(e,t){return new $e(e,3,t,W.min(),W.min(),Qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof $e&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new $e(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class vi{constructor(e,t){this.position=e,this.inclusive=t}}function Cu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),t.key):r=nr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Pu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Tt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class is{constructor(e,t="asc"){this.field=e,this.dir=t}}function ME(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Wd{}class Ee extends Wd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new $E(e,t,r):t==="array-contains"?new BE(e,r):t==="in"?new jE(e,r):t==="not-in"?new qE(e,r):t==="array-contains-any"?new zE(e,r):new Ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new FE(e,r):new UE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(nr(t,this.value)):t!==null&&rn(this.value)===rn(t)&&this.matchesComparison(nr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ht extends Wd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ht(e,t)}matches(e){return Kd(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Kd(n){return n.op==="and"}function Qd(n){return LE(n)&&Kd(n)}function LE(n){for(const e of n.filters)if(e instanceof ht)return!1;return!0}function ca(n){if(n instanceof Ee)return n.field.canonicalString()+n.op.toString()+rr(n.value);if(Qd(n))return n.filters.map((e=>ca(e))).join(",");{const e=n.filters.map((t=>ca(t))).join(",");return`${n.op}(${e})`}}function Jd(n,e){return n instanceof Ee?(function(r,s){return s instanceof Ee&&r.op===s.op&&r.field.isEqual(s.field)&&Tt(r.value,s.value)})(n,e):n instanceof ht?(function(r,s){return s instanceof ht&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&Jd(a,s.filters[c])),!0):!1})(n,e):void z(19439)}function Yd(n){return n instanceof Ee?(function(t){return`${t.field.canonicalString()} ${t.op} ${rr(t.value)}`})(n):n instanceof ht?(function(t){return t.op.toString()+" {"+t.getFilters().map(Yd).join(" ,")+"}"})(n):"Filter"}class $E extends Ee{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class FE extends Ee{constructor(e,t){super(e,"in",t),this.keys=Xd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class UE extends Ee{constructor(e,t){super(e,"not-in",t),this.keys=Xd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Xd(n,e){return(e.arrayValue?.values||[]).map((t=>U.fromName(t.referenceValue)))}class BE extends Ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return qa(t)&&rs(t.arrayValue,this.value)}}class jE extends Ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&rs(this.value.arrayValue,t)}}class qE extends Ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(rs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!rs(this.value.arrayValue,t)}}class zE extends Ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!qa(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>rs(this.value.arrayValue,r)))}}/**
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
 */class HE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function ku(n,e=null,t=[],r=[],s=null,i=null,a=null){return new HE(n,e,t,r,s,i,a)}function za(n){const e=Q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>ca(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),qi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>rr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>rr(r))).join(",")),e.Te=t}return e.Te}function Ha(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ME(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Jd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Pu(n.startAt,e.startAt)&&Pu(n.endAt,e.endAt)}function la(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class fr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function GE(n,e,t,r,s,i,a,c){return new fr(n,e,t,r,s,i,a,c)}function Hi(n){return new fr(n)}function xu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function WE(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Zd(n){return n.collectionGroup!==null}function qr(n){const e=Q(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(Ne.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new is(i,r))})),t.has(Ne.keyField().canonicalString())||e.Ie.push(new is(Ne.keyField(),r))}return e.Ie}function vt(n){const e=Q(n);return e.Ee||(e.Ee=KE(e,qr(n))),e.Ee}function KE(n,e){if(n.limitType==="F")return ku(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new is(s.field,i)}));const t=n.endAt?new vi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vi(n.startAt.position,n.startAt.inclusive):null;return ku(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ua(n,e){const t=n.filters.concat([e]);return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function QE(n,e){const t=n.explicitOrderBy.concat([e]);return new fr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ei(n,e,t){return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Gi(n,e){return Ha(vt(n),vt(e))&&n.limitType===e.limitType}function ef(n){return`${za(vt(n))}|lt:${n.limitType}`}function Gn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Yd(s))).join(", ")}]`),qi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>rr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>rr(s))).join(",")),`Target(${r})`})(vt(n))}; limitType=${n.limitType})`}function Wi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,u){const h=Cu(a,c,u);return a.inclusive?h<=0:h<0})(r.startAt,qr(r),s)||r.endAt&&!(function(a,c,u){const h=Cu(a,c,u);return a.inclusive?h>=0:h>0})(r.endAt,qr(r),s))})(n,e)}function JE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function tf(n){return(e,t)=>{let r=!1;for(const s of qr(n)){const i=YE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function YE(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):(function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?nr(u,h):z(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
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
 */class Mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){pn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Ld(this.inner)}size(){return this.innerSize}}/**
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
 */const XE=new he(U.comparator);function Mt(){return XE}const nf=new he(U.comparator);function Lr(...n){let e=nf;for(const t of n)e=e.insert(t.key,t);return e}function rf(n){let e=nf;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function bn(){return zr()}function sf(){return zr()}function zr(){return new Mn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ZE=new he(U.comparator),ew=new Ae(U.comparator);function Z(...n){let e=ew;for(const t of n)e=e.add(t);return e}const tw=new Ae(X);function nw(){return tw}/**
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
 */function Ki(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gi(e)?"-0":e}}function Ga(n){return{integerValue:""+n}}function rw(n,e){return RE(e)?Ga(e):Ki(n,e)}/**
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
 */class Qi{constructor(){this._=void 0}}function sw(n,e,t){return n instanceof os?(function(s,i){const a={fields:{[Ud]:{stringValue:Fd},[jd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ja(i)&&(i=zi(i)),i&&(a.fields[Bd]=i),{mapValue:a}})(t,e):n instanceof as?af(n,e):n instanceof cs?cf(n,e):n instanceof ls?(function(s,i){const a=of(s,i),c=Ii(a)+Ii(s.Ae);return ss(a)&&ss(s.Ae)?Ga(c):Ki(s.serializer,c)})(n,e):n instanceof wi?(function(s,i){return Nu(s,i,Math.min)})(n,e):n instanceof Ti?(function(s,i){return Nu(s,i,Math.max)})(n,e):void 0}function iw(n,e,t){return n instanceof as?af(n,e):n instanceof cs?cf(n,e):t}function of(n,e){return n instanceof ls?Hd(e)?e:{integerValue:0}:null}class os extends Qi{}class as extends Qi{constructor(e){super(),this.elements=e}}function af(n,e){const t=lf(e);for(const r of n.elements)t.some((s=>Tt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class cs extends Qi{constructor(e){super(),this.elements=e}}function cf(n,e){let t=lf(e);for(const r of n.elements)t=t.filter((s=>!Tt(s,r)));return{arrayValue:{values:t}}}class Wa extends Qi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class ls extends Wa{}class wi extends Wa{}class Ti extends Wa{}function Nu(n,e,t){if(!Hd(e))return n.Ae;const r=t(Ii(e),Ii(n.Ae));return ss(e)&&ss(n.Ae)?Ga(r):Ki(n.serializer,r)}function Ii(n){return ye(n.integerValue||n.doubleValue)}function lf(n){return qa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class ow{constructor(e,t){this.field=e,this.transform=t}}function aw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof as&&s instanceof as||r instanceof cs&&s instanceof cs?tr(r.elements,s.elements,Tt):r instanceof ls&&s instanceof ls||r instanceof wi&&s instanceof wi||r instanceof Ti&&s instanceof Ti?Tt(r.Ae,s.Ae):r instanceof os&&s instanceof os})(n.transform,e.transform)}class cw{constructor(e,t){this.version=e,this.transformResults=t}}class lt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new lt}static exists(e){return new lt(void 0,e)}static updateTime(e){return new lt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ei(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ji{}function uf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ka(n.key,lt.none()):new vs(n.key,n.data,lt.none());{const t=n.data,r=Qe.empty();let s=new Ae(Ne.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new mn(n.key,r,new et(s.toArray()),lt.none())}}function lw(n,e,t){n instanceof vs?(function(s,i,a){const c=s.value.clone(),u=Vu(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof mn?(function(s,i,a){if(!ei(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Vu(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(hf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Hr(n,e,t,r){return n instanceof vs?(function(i,a,c,u){if(!ei(i.precondition,a))return c;const h=i.value.clone(),f=Ou(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof mn?(function(i,a,c,u){if(!ei(i.precondition,a))return c;const h=Ou(i.fieldTransforms,u,a),f=a.data;return f.setAll(hf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,a,c){return ei(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function uw(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=of(r.transform,s||null);i!=null&&(t===null&&(t=Qe.empty()),t.set(r.field,i))}return t||null}function Du(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&tr(r,s,((i,a)=>aw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class vs extends Ji{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class mn extends Ji{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function hf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Vu(n,e,t){const r=new Map;re(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,iw(a,c,t[s]))}return r}function Ou(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,sw(i,a,e))}return r}class Ka extends Ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hw extends Ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class dw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&lw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=sf();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=uf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(W.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Z())}isEqual(e){return this.batchId===e.batchId&&tr(this.mutations,e.mutations,((t,r)=>Du(t,r)))&&tr(this.baseMutations,e.baseMutations,((t,r)=>Du(t,r)))}}class Qa{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){re(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return ZE})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Qa(e,t,r,s)}}/**
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
 */class fw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class pw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ve,te;function mw(n){switch(n){case C.OK:return z(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function df(n){if(n===void 0)return Ot("GRPC error has no .code"),C.UNKNOWN;switch(n){case ve.OK:return C.OK;case ve.CANCELLED:return C.CANCELLED;case ve.UNKNOWN:return C.UNKNOWN;case ve.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case ve.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case ve.INTERNAL:return C.INTERNAL;case ve.UNAVAILABLE:return C.UNAVAILABLE;case ve.UNAUTHENTICATED:return C.UNAUTHENTICATED;case ve.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case ve.NOT_FOUND:return C.NOT_FOUND;case ve.ALREADY_EXISTS:return C.ALREADY_EXISTS;case ve.PERMISSION_DENIED:return C.PERMISSION_DENIED;case ve.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case ve.ABORTED:return C.ABORTED;case ve.OUT_OF_RANGE:return C.OUT_OF_RANGE;case ve.UNIMPLEMENTED:return C.UNIMPLEMENTED;case ve.DATA_LOSS:return C.DATA_LOSS;default:return z(39323,{code:n})}}(te=ve||(ve={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function gw(){return new TextEncoder}/**
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
 */const _w=new Yt([4294967295,4294967295],0);function Mu(n){const e=gw().encode(n),t=new Sd;return t.update(e),new Uint8Array(t.digest())}function Lu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Yt([t,r],0),new Yt([s,i],0)]}class Ja{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new $r(`Invalid padding: ${t}`);if(r<0)throw new $r(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new $r(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new $r(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Yt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Yt.fromNumber(r)));return s.compare(_w)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Mu(e),[r,s]=Lu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ja(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=Mu(e),[r,s]=Lu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class $r extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Es{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ws.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Es(W.min(),s,new he(X),Mt(),Z())}}class ws{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ws(r,t,Z(),Z(),Z())}}/**
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
 */class ti{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class ff{constructor(e,t){this.targetId=e,this.Ce=t}}class pf{constructor(e,t,r=De.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class $u{constructor(e){this.targetId=e,this.ve=0,this.Fe=Fu(),this.Me=De.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Z(),t=Z(),r=Z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}})),new ws(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Fu()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,re(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const Nr="WatchChangeAggregator";class yw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Mt(),this.Je=zs(),this.He=zs(),this.Ze=new he(X)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}else L(Nr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(la(i))if(r===0){const a=new U(i.path);this.et(t,a,$e.newNoDocument(a,W.min()))}else re(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=nn(r).toUint8Array()}catch(u){if(u instanceof $d)return Vn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ja(a,s,i)}catch(u){return Vn(u instanceof $r?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.st(a);if(c){if(i.current&&la(c.target)){const u=new U(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.et(a,u,$e.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=Z();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new Es(e,t,this.Ze,this.je,r);return this.je=Mt(),this.Je=zs(),this.He=zs(),this.Ze=new he(X),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void L(Nr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):L(Nr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(L(Nr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new $u(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new Ae(X),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new Ae(X),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||L(Nr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new $u(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function zs(){return new he(U.comparator)}function Fu(){return new he(U.comparator)}const vw={asc:"ASCENDING",desc:"DESCENDING"},Ew={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ww={and:"AND",or:"OR"};class Tw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ha(n,e){return n.useProto3Json||qi(e)?e:{value:e}}function bi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function mf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Iw(n,e){return bi(n,e.toTimestamp())}function Et(n){return re(!!n,49232),W.fromTimestamp((function(t){const r=tn(t);return new oe(r.seconds,r.nanos)})(n))}function Ya(n,e){return da(n,e).canonicalString()}function da(n,e){const t=(function(s){return new ie(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function gf(n){const e=ie.fromString(n);return re(wf(e),10190,{key:e.toString()}),e}function fa(n,e){return Ya(n.databaseId,e.path)}function Bo(n,e){const t=gf(e);if(t.get(1)!==n.databaseId.projectId)throw new $(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new $(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(yf(t))}function _f(n,e){return Ya(n.databaseId,e)}function bw(n){const e=gf(n);return e.length===4?ie.emptyPath():yf(e)}function pa(n){return new ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function yf(n){return re(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Uu(n,e,t){return{name:fa(n,e),fields:t.value.mapValue.fields}}function Aw(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:z(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(re(f===void 0||typeof f=="string",58123),De.fromBase64String(f||"")):(re(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),De.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?C.UNKNOWN:df(h.code);return new $(f,h.message||"")})(a);t=new pf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bo(n,r.document.name),i=Et(r.document.updateTime),a=r.document.createTime?Et(r.document.createTime):W.min(),c=new Qe({mapValue:{fields:r.document.fields}}),u=$e.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ti(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Bo(n,r.document),i=r.readTime?Et(r.readTime):W.min(),a=$e.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ti([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Bo(n,r.document),i=r.removedTargetIds||[];t=new ti([],i,s,null)}else{if(!("filter"in e))return z(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new pw(s,i),c=r.targetId;t=new ff(c,a)}}return t}function Sw(n,e){let t;if(e instanceof vs)t={update:Uu(n,e.key,e.value)};else if(e instanceof Ka)t={delete:fa(n,e.key)};else if(e instanceof mn)t={update:Uu(n,e.key,e.data),updateMask:Ow(e.fieldMask)};else{if(!(e instanceof hw))return z(16599,{Vt:e.type});t={verify:fa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof os)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof as)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof cs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ls)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof wi)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof Ti)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw z(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Iw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)})(n,e.precondition)),t}function Rw(n,e){return n&&n.length>0?(re(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Et(s.updateTime):Et(i);return a.isEqual(W.min())&&(a=Et(i)),new cw(a,s.transformResults||[])})(t,e)))):[]}function Cw(n,e){return{documents:[_f(n,e.path)]}}function Pw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=_f(n,s);const i=(function(h){if(h.length!==0)return Ef(ht.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(w){return{field:Wn(w.field),direction:Nw(w.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ha(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{dt:t,parent:s}}function kw(n){let e=bw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){re(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const w=vf(m);return w instanceof ht&&Qd(w)?w.getFilters():[w]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((w=>(function(R){return new is(Kn(R.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(w)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let w;return w=typeof m=="object"?m.value:m,qi(w)?null:w})(t.limit));let u=null;t.startAt&&(u=(function(m){const w=!!m.before,A=m.values||[];return new vi(A,w)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const w=!m.before,A=m.values||[];return new vi(A,w)})(t.endAt)),GE(e,s,a,i,c,"F",u,h)}function xw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function vf(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Kn(t.unaryFilter.field);return Ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Kn(t.unaryFilter.field);return Ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kn(t.unaryFilter.field);return Ee.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Kn(t.unaryFilter.field);return Ee.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Ee.create(Kn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ht.create(t.compositeFilter.filters.map((r=>vf(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}})(t.compositeFilter.op))})(n):z(30097,{filter:n})}function Nw(n){return vw[n]}function Dw(n){return Ew[n]}function Vw(n){return ww[n]}function Wn(n){return{fieldPath:n.canonicalString()}}function Kn(n){return Ne.fromServerFormat(n.fieldPath)}function Ef(n){return n instanceof Ee?(function(t){if(t.op==="=="){if(Ru(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(Su(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ru(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(Su(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:Dw(t.op),value:t.value}}})(n):n instanceof ht?(function(t){const r=t.getFilters().map((s=>Ef(s)));return r.length===1?r[0]:{compositeFilter:{op:Vw(t.op),filters:r}}})(n):z(54877,{filter:n})}function Ow(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function wf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Tf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class Ct{constructor(e,t,r,s,i=W.min(),a=W.min(),c=De.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Mw{constructor(e){this.gt=e}}function Lw(n){const e=kw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ei(e,e.limit,"L"):e}/**
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
 */class $w{constructor(){this.Sn=new Fw}addToCollectionParentIndex(e,t){return this.Sn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(en.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(en.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class Fw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ae(ie.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ae(ie.comparator)).toArray()}}/**
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
 */const Bu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},If=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(If,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);/**
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
 */class sn{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new sn(0)}static _r(){return new sn(-1)}}/**
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
 */const ju="LruGarbageCollector",Uw=1048576;function qu([n,e],[t,r]){const s=X(n,t);return s===0?X(e,r):s}class Bw{constructor(e){this.hr=e,this.buffer=new Ae(qu),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();qu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class jw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){L(ju,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){dr(t)?L(ju,"Ignoring IndexedDB error during garbage collection: ",t):await hr(t)}await this.Rr(3e5)}))}}class qw{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return k.resolve(ji.ce);const r=new Bw(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(Bu)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Bu):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Hn()<=ee.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function zw(n,e){return new qw(n,e)}/**
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
 */class Hw{constructor(){this.changes=new Mn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,$e.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Gw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Ww{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Hr(r.mutation,s,et.empty(),oe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Z()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Z()){const s=bn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Lr();return i.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=bn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Z())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=Mt();const a=zr(),c=(function(){return zr()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof mn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Hr(f.mutation,h,f.mutation.getFieldMask(),oe.now())):a.set(h.key,et.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new Gw(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=zr();let s=new he(((a,c)=>a-c)),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||et.empty();f=c.applyToLocalView(h,f),r.set(u,f);const m=(s.get(c.batchId)||Z()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=sf();f.forEach((w=>{if(!i.has(w)){const A=uf(t.get(w),r.get(w));A!==null&&m.set(w,A),i=i.add(w)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return k.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return WE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Zd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):k.resolve(bn());let c=es,u=i;return a.next((h=>k.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next((w=>{u=u.insert(f,w)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,Z()))).next((f=>({batchId:c,changes:rf(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next((r=>{let s=Lr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Lr();return this.indexManager.getCollectionParents(e,i).next((c=>k.forEach(c,(u=>{const h=(function(m,w){return new fr(w,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((m,w)=>{a=a.insert(m,w)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,$e.newInvalidDocument(f)))}));let c=Lr();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Hr(f.mutation,h,et.empty(),oe.now()),Wi(t,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class Kw{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return k.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Et(s.createTime)}})(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:Lw(s.bundledQuery),readTime:Et(s.readTime)}})(t)),k.resolve()}}/**
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
 */class Qw{constructor(){this.overlays=new he(U.comparator),this.Br=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=bn();return k.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),k.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const s=bn(),i=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return k.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new he(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=bn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=bn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return k.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new fw(t,r));let i=this.Br.get(t);i===void 0&&(i=Z(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
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
 */class Jw{constructor(){this.sessionToken=De.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class Xa{constructor(){this.Lr=new Ae(Ce.kr),this.qr=new Ae(Ce.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Ce(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Ce(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new U(new ie([])),r=new Ce(t,e),s=new Ce(t,e+1),i=[];return this.qr.forEachInRange([r,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new U(new ie([])),r=new Ce(t,e),s=new Ce(t,e+1);let i=Z();return this.qr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Ce(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ce{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return U.comparator(e.key,t.key)||X(e.jr,t.jr)}static Kr(e,t){return X(e.jr,t.jr)||U.comparator(e.key,t.key)}}/**
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
 */class Yw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new Ae(Ce.kr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new dw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Ce(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?Ba:this.Xn-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ce(t,0),s=new Ce(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(a=>{const c=this.Hr(a.jr);i.push(c)})),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(X);return t.forEach((s=>{const i=new Ce(s,0),a=new Ce(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(c=>{r=r.add(c.jr)}))})),k.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const a=new Ce(new U(i),0);let c=new Ae(X);return this.Jr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.jr)),!0)}),a),k.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){re(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return k.forEach(t.mutations,(s=>{const i=new Ce(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Ce(t,0),s=this.Jr.firstAfterOrEqual(r);return k.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Xw{constructor(e){this.ei=e,this.docs=(function(){return new he(U.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():$e.newInvalidDocument(t))}getEntries(e,t){let r=Mt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():$e.newInvalidDocument(s))})),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Mt();const a=t.path,c=new U(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||IE(TE(f),r)<=0||(s.has(f.key)||Wi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,r,s){z(9500)}ti(e,t){return k.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Zw(this)}getSize(e){return k.resolve(this.size)}}class Zw extends Hw{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),k.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
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
 */class eT{constructor(e){this.persistence=e,this.ni=new Mn((t=>za(t)),Ha),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.ri=0,this.ii=new Xa,this.targetCount=0,this.si=sn.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),k.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new sn(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.cr(t),k.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),k.waitFor(i).next((()=>s))}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.ii.containsKey(t))}}/**
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
 */class bf{constructor(e,t){this.oi={},this.overlays={},this._i=new ji(0),this.ai=!1,this.ai=!0,this.ui=new Jw,this.referenceDelegate=e(this),this.ci=new eT(this),this.indexManager=new $w,this.remoteDocumentCache=(function(s){return new Xw(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Mw(t),this.hi=new Kw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Qw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new Yw(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new tT(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return k.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class tT extends AE{constructor(e){super(),this.currentSequenceNumber=e}}class Za{constructor(e){this.persistence=e,this.Ei=new Xa,this.Ri=null}static Ai(e){return new Za(e)}get Vi(){if(this.Ri)return this.Ri;throw z(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.Vi,(r=>{const s=U.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,W.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return k.or([()=>k.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ai{constructor(e,t){this.persistence=e,this.mi=new Mn((r=>CE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=zw(this,t)}static Ai(e,t){return new Ai(e,t)}Pi(){}Ti(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return k.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?k.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(a=>this.yr(e,a,t).next((c=>{c||(r++,i.removeEntry(a,W.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Xs(e.data.value)),t}yr(e,t,r){return k.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return k.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class ec{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ec(e,t.fromCache,r,s)}}/**
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
 */class nT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class rT{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Sg()?8:SE(Be())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new nT;return this.ps(e,t,a).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(Hn()<=ee.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),k.resolve()):(Hn()<=ee.DEBUG&&L("QueryEngine","Query:",Gn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(Hn()<=ee.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,vt(t))):k.resolve())}fs(e,t){if(xu(t))return k.resolve(null);let r=vt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Ei(t,null,"F"),r=vt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=Z(...i);return this.ds.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.ws(t,c);return this.Ss(t,h,a,u.readTime)?this.fs(e,Ei(t,null,"F")):this.bs(e,h,t,u)}))))})))))}gs(e,t,r,s){return xu(t)||s.isEqual(W.min())?k.resolve(null):this.ds.getDocuments(e,r).next((i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?k.resolve(null):(Hn()<=ee.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Gn(t)),this.bs(e,a,t,wE(s,es)).next((c=>c)))}))}ws(e,t){let r=new Ae(tf(e));return t.forEach(((s,i)=>{Wi(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return Hn()<=ee.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Gn(t)),this.ds.getDocumentsMatchingQuery(e,t,en.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const tc="LocalStore",sT=3e8;class iT{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new he(X),this.vs=new Mn((i=>za(i)),Ha),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ww(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function oT(n,e,t,r){return new iT(n,e,t,r)}async function Af(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let u=Z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({Os:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function aT(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,w=m.keys();let A=k.resolve();return w.forEach((R=>{A=A.next((()=>f.getEntry(u,R))).next((P=>{const N=h.docVersions.get(R);re(N!==null,48541),P.version.compareTo(N)<0&&(m.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),f.addEntry(P)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=Z();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Sf(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function cT(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((f,m)=>{const w=s.get(m);if(!w)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.ci.addMatchingKeys(i,f.addedDocuments,m))));let A=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(De.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(m,A),(function(P,N,O){return P.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=sT?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0})(w,A,f)&&c.push(t.ci.updateTargetData(i,A))}));let u=Mt(),h=Z();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(lT(i,a,e.documentUpdates).next((f=>{u=f.Ns,h=f.Bs}))),!r.isEqual(W.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next((m=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return k.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Cs=s,i)))}function lT(n,e,t){let r=Z(),s=Z();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=Mt();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(W.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):L(tc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Ns:a,Bs:s}}))}function uT(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ba),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function hT(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,k.resolve(s)):t.ci.allocateTargetId(r).next((a=>(s=new Ct(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function ma(n,e,t){const r=Q(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!dr(a))throw a;L(tc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function zu(n,e,t){const r=Q(n);let s=W.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const m=Q(u),w=m.vs.get(f);return w!==void 0?k.resolve(m.Cs.get(w)):m.ci.getTargetData(h,f)})(r,a,vt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next((u=>{i=u}))})).next((()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:W.min(),t?i:Z()))).next((c=>(dT(r,JE(e),c),{documents:c,Ls:i})))))}function dT(n,e,t){let r=n.Fs.get(e)||W.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Hu{constructor(){this.activeTargetIds=nw()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class fT{constructor(){this.Co=new Hu,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Hu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class pT{Fo(e){}shutdown(){}}/**
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
 */const Gu="ConnectivityMonitor";class Wu{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){L(Gu,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){L(Gu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Hs=null;function ga(){return Hs===null?Hs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Hs++,"0x"+Hs.toString(16)}/**
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
 */const jo="RestConnection",mT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class gT{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===_i?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=ga(),c=this.Wo(e,t.toUriEncodedString());L(jo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:h}=new URL(c),f=On(h);return this.Go(e,c,u,r,f).then((m=>(L(jo,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw Vn(jo,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m}))}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ur})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=mT[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class _T{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
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
 */const Me="WebChannelConnection",Dr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Xn extends gT{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Xn.u_){const e=kd();Dr(e,Pd.STAT_EVENT,(t=>{t.stat===ia.PROXY?L(Me,"STAT_EVENT: detected buffering proxy"):t.stat===ia.NOPROXY&&L(Me,"STAT_EVENT: detected no buffering proxy")})),Xn.u_=!0}}Go(e,t,r,s,i){const a=ga();return new Promise(((c,u)=>{const h=new Rd;h.setWithCredentials(!0),h.listenOnce(Cd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ys.NO_ERROR:const m=h.getResponseJson();L(Me,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case Ys.TIMEOUT:L(Me,`RPC '${e}' ${a} timed out`),u(new $(C.DEADLINE_EXCEEDED,"Request time out"));break;case Ys.HTTP_ERROR:const w=h.getStatus();if(L(Me,`RPC '${e}' ${a} failed with status:`,w,"response text:",h.getResponseText()),w>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const R=A?.error;if(R&&R.status&&R.message){const P=(function(O){const F=O.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(F)>=0?F:C.UNKNOWN})(R.status);u(new $(P,R.message))}else u(new $(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new $(C.UNAVAILABLE,"Connection failed."));break;default:z(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{L(Me,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);L(Me,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=ga(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");L(Me,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.T_(f);let m=!1,w=!1;const A=new _T({jo:R=>{w?L(Me,`Not sending because RPC '${e}' stream ${s} is closed:`,R):(m||(L(Me,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),L(Me,`RPC '${e}' stream ${s} sending:`,R),f.send(R))},Jo:()=>f.close()});return Dr(f,Mr.EventType.OPEN,(()=>{w||(L(Me,`RPC '${e}' stream ${s} transport opened.`),A.r_())})),Dr(f,Mr.EventType.CLOSE,(()=>{w||(w=!0,L(Me,`RPC '${e}' stream ${s} transport closed`),A.s_(),this.I_(f))})),Dr(f,Mr.EventType.ERROR,(R=>{w||(w=!0,Vn(Me,`RPC '${e}' stream ${s} transport errored. Name:`,R.name,"Message:",R.message),A.s_(new $(C.UNAVAILABLE,"The operation could not be completed")))})),Dr(f,Mr.EventType.MESSAGE,(R=>{if(!w){const P=R.data[0];re(!!P,16349);const N=P,O=N?.error||N[0]?.error;if(O){L(Me,`RPC '${e}' stream ${s} received error:`,O);const F=O.status;let M=(function(j){const T=ve[j];if(T!==void 0)return df(T)})(F),G=O.message;F==="NOT_FOUND"&&G.includes("database")&&G.includes("does not exist")&&G.includes(this.databaseId.database)&&Vn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),M===void 0&&(M=C.INTERNAL,G="Unknown error status: "+F+" with message "+O.message),w=!0,A.s_(new $(M,G)),f.close()}else L(Me,`RPC '${e}' stream ${s} received:`,P),A.o_(P)}})),Xn.a_(),setTimeout((()=>{A.i_()}),0),A}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return xd()}}/**
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
 */function yT(n){return new Xn(n)}function qo(){return typeof document<"u"?document:null}/**
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
 */function Yi(n){return new Tw(n,!0)}/**
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
 */Xn.u_=!1;class Rf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Ku="PersistentStream";class Cf{constructor(e,t,r,s,i,a,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Rf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Ot(t.toString()),Ot("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new $(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return L(Ku,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(L(Ku,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class vT extends Cf{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Aw(this.serializer,e),r=(function(i){if(!("targetChange"in i))return W.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?Et(a.readTime):W.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=pa(this.serializer),t.addTarget=(function(i,a){let c;const u=a.target;if(c=la(u)?{documents:Cw(i,u)}:{query:Pw(i,u).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=mf(i,a.resumeToken);const h=ha(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(W.min())>0){c.readTime=bi(i,a.snapshotVersion.toTimestamp());const h=ha(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=xw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=pa(this.serializer),t.removeTarget=e,this.k_(t)}}class ET extends Cf{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return re(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,re(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){re(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Rw(e.writeResults,e.commitTime),r=Et(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=pa(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Sw(this.serializer,r)))};this.k_(t)}}/**
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
 */class wT{}class TT extends wT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new $(C.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(e,da(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new $(C.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.zo(e,da(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new $(C.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function IT(n,e,t,r){return new TT(n,e,t,r)}class bT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Ot(t),this._a=!1):L("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const It="RemoteStore";class AT{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new sn(1e3),this.Aa=new sn(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{r.enqueueAndForget((async()=>{Ln(this)&&(L(It,"Restarting streams for network reachability change."),await(async function(u){const h=Q(u);h.Va.add(4),await Ts(h),h.fa.set("Unknown"),h.Va.delete(4),await Xi(h)})(this))}))})),this.fa=new bT(r,s)}}async function Xi(n){if(Ln(n))for(const e of n.da)await e(!0)}async function Ts(n){for(const e of n.da)await e(!1)}function _a(n,e){return n.Ia.get(e)||void 0}function Pf(n,e){const t=Q(n),r=_a(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,u){const h=_a(c,u);h!==void 0&&c.Ea.delete(h);const f=(function(w,A){return A%2!=0?w.Aa.next():w.Ra.next()})(c,u);return c.Ia.set(u,f),c.Ea.set(f,u),f})(t,e.targetId);L(It,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Ct(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),ic(t)?sc(t):pr(t).x_()&&rc(t,i)}function nc(n,e){const t=Q(n),r=pr(t),s=_a(t,e);L(It,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&kf(t,s),t.Ta.size===0&&(r.x_()?r.B_():Ln(t)&&t.fa.set("Unknown"))}function rc(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void L(It,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}pr(n).H_(e)}function kf(n,e){n.ga.$e(e),pr(n).Z_(e)}function sc(n){n.ga=new yw({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):Z()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),pr(n).start(),n.fa.aa()}function ic(n){return Ln(n)&&!pr(n).M_()&&n.Ta.size>0}function Ln(n){return Q(n).Va.size===0}function xf(n){n.ga=void 0}async function ST(n){n.fa.set("Online")}async function RT(n){n.Ta.forEach(((e,t)=>{rc(n,e)}))}async function CT(n,e){xf(n),ic(n)?(n.fa.la(e),sc(n)):n.fa.set("Unknown")}async function PT(n,e,t){if(n.fa.set("Online"),e instanceof pf&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){L(It,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Si(n,r)}else if(e instanceof ti?n.ga.Xe(e):e instanceof ff?n.ga.it(e):n.ga.tt(e),!t.isEqual(W.min()))try{const r=await Sf(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ta.get(f);m&&i.Ta.set(f,m.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const m=i.Ta.get(h);if(!m)return;i.Ta.set(h,m.withResumeToken(De.EMPTY_BYTE_STRING,m.snapshotVersion)),kf(i,h);const w=new Ct(m.target,h,f,m.sequenceNumber);rc(i,w)}));const u=(function(f,m){const w=new Map;m.targetChanges.forEach(((R,P)=>{const N=f.Ea.get(P);N!==void 0&&w.set(N,R)}));let A=new he(X);return m.targetMismatches.forEach(((R,P)=>{const N=f.Ea.get(R);N!==void 0&&(A=A.insert(N,P))})),new Es(m.snapshotVersion,w,A,m.documentUpdates,m.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){L(It,"Failed to raise snapshot:",r),await Si(n,r)}}async function Si(n,e,t){if(!dr(e))throw e;n.Va.add(1),await Ts(n),n.fa.set("Offline"),t||(t=()=>Sf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{L(It,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await Xi(n)}))}function Nf(n,e){return e().catch((t=>Si(n,t,e)))}async function Zi(n){const e=Q(n),t=on(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ba;for(;kT(e);)try{const s=await uT(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,xT(e,s)}catch(s){await Si(e,s)}Df(e)&&Vf(e)}function kT(n){return Ln(n)&&n.Pa.length<10}function xT(n,e){n.Pa.push(e);const t=on(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function Df(n){return Ln(n)&&!on(n).M_()&&n.Pa.length>0}function Vf(n){on(n).start()}async function NT(n){on(n).na()}async function DT(n){const e=on(n);for(const t of n.Pa)e.Y_(t.mutations)}async function VT(n,e,t){const r=n.Pa.shift(),s=Qa.from(r,e,t);await Nf(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Zi(n)}async function OT(n,e){e&&on(n).X_&&await(async function(r,s){if((function(a){return mw(a)&&a!==C.ABORTED})(s.code)){const i=r.Pa.shift();on(r).N_(),await Nf(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Zi(r)}})(n,e),Df(n)&&Vf(n)}async function Qu(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),L(It,"RemoteStore received new credentials");const r=Ln(t);t.Va.add(3),await Ts(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await Xi(t)}async function MT(n,e){const t=Q(n);e?(t.Va.delete(2),await Xi(t)):e||(t.Va.add(2),await Ts(t),t.fa.set("Unknown"))}function pr(n){return n.pa||(n.pa=(function(t,r,s){const i=Q(t);return i.ia(),new vT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:ST.bind(null,n),Xo:RT.bind(null,n),e_:CT.bind(null,n),J_:PT.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),ic(n)?sc(n):n.fa.set("Unknown")):(await n.pa.stop(),xf(n))}))),n.pa}function on(n){return n.ya||(n.ya=(function(t,r,s){const i=Q(t);return i.ia(),new ET(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:NT.bind(null,n),e_:OT.bind(null,n),ea:DT.bind(null,n),ta:VT.bind(null,n)}),n.da.push((async e=>{e?(n.ya.N_(),await Zi(n)):(await n.ya.stop(),n.Pa.length>0&&(L(It,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ya}/**
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
 */class oc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new oc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new $(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ac(n,e){if(Ot("AsyncQueue",`${e}: ${n}`),dr(n))return new $(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Ju{constructor(){this.wa=new he(U.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):z(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class sr{constructor(e,t,r,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new sr(e,t,Zn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Gi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class LT{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class $T{constructor(){this.queries=Yu(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=Q(t),i=s.queries;s.queries=Yu(),i.forEach(((a,c)=>{for(const u of c.Ca)u.onError(r)}))})(this,new $(C.ABORTED,"Firestore shutting down"))}}function Yu(){return new Mn((n=>ef(n)),Gi)}async function cc(n,e){const t=Q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new LT,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=ac(a,`Initialization of query '${Gn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&uc(t)}async function lc(n,e){const t=Q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function FT(n,e){const t=Q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&uc(t)}function UT(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function uc(n){n.Ma.forEach((e=>{e.next()}))}var ya,Xu;(Xu=ya||(ya={})).Na="default",Xu.Cache="cache";class hc{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new sr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=sr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==ya.Cache}}/**
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
 */class Of{constructor(e){this.key=e}}class Mf{constructor(e){this.key=e}}class BT{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=Z(),this.mutatedKeys=Z(),this.ru=tf(e),this.iu=new Zn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new Ju,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const w=s.get(f),A=Wi(this.query,m)?m:null,R=!!w&&this.mutatedKeys.has(w.key),P=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;w&&A?w.data.isEqual(A.data)?R!==P&&(r.track({type:3,doc:A}),N=!0):this.au(w,A)||(r.track({type:2,doc:A}),N=!0,(u&&this.ru(A,u)>0||h&&this.ru(A,h)<0)&&(c=!0)):!w&&A?(r.track({type:0,doc:A}),N=!0):w&&!A&&(r.track({type:1,doc:w}),N=!0,(u||h)&&(c=!0)),N&&(A?(a=a.add(A),i=P?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort(((f,m)=>(function(A,R){const P=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{At:N})}};return P(A)-P(R)})(f.type,m.type)||this.ru(f.doc,m.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,h=u!==this.tu;return this.tu=u,a.length!==0||h?{snapshot:new sr(this.query,e.iu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Ju,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=Z(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new Mf(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new Of(r))})),t}Pu(e){this.eu=e.Ls,this.nu=Z();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return sr.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const dc="SyncEngine";class jT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class qT{constructor(e){this.key=e,this.Iu=!1}}class zT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new Mn((c=>ef(c)),Gi),this.Au=new Map,this.Vu=new Set,this.du=new he(U.comparator),this.mu=new Map,this.fu=new Xa,this.gu={},this.pu=new Map,this.yu=sn._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function HT(n,e,t=!0){const r=jf(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await Lf(r,e,t,!0),s}async function GT(n,e){const t=jf(n);await Lf(t,e,!0,!1)}async function Lf(n,e,t,r){const s=await hT(n.localStore,vt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await WT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Pf(n.remoteStore,s),c}async function WT(n,e,t,r,s){n.Su=(m,w,A)=>(async function(P,N,O,F){let M=N.view.ou(O);M.Ss&&(M=await zu(P.localStore,N.query,!1).then((({documents:T})=>N.view.ou(T,M))));const G=F&&F.targetChanges.get(N.targetId),H=F&&F.targetMismatches.get(N.targetId)!=null,j=N.view.applyChanges(M,P.isPrimaryClient,G,H);return eh(P,N.targetId,j.lu),j.snapshot})(n,m,w,A);const i=await zu(n.localStore,e,!0),a=new BT(e,i.Ls),c=a.ou(i.documents),u=ws.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);eh(n,t,h.lu);const f=new jT(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),h.snapshot}async function KT(n,e,t){const r=Q(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((a=>!Gi(a,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ma(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&nc(r.remoteStore,s.targetId),va(r,s.targetId)})).catch(hr)):(va(r,s.targetId),await ma(r.localStore,s.targetId,!0))}async function QT(n,e){const t=Q(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),nc(t.remoteStore,r.targetId))}async function JT(n,e,t){const r=rI(n);try{const s=await(function(a,c){const u=Q(a),h=oe.now(),f=c.reduce(((A,R)=>A.add(R.key)),Z());let m,w;return u.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let R=Mt(),P=Z();return u.Ms.getEntries(A,f).next((N=>{R=N,R.forEach(((O,F)=>{F.isValidDocument()||(P=P.add(O))}))})).next((()=>u.localDocuments.getOverlayedDocuments(A,R))).next((N=>{m=N;const O=[];for(const F of c){const M=uw(F,m.get(F.key).overlayedDocument);M!=null&&O.push(new mn(F.key,M,Gd(M.value.mapValue),lt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,O,c)})).next((N=>{w=N;const O=N.applyToLocalDocumentSet(m,P);return u.documentOverlayCache.saveOverlays(A,N.batchId,O)}))})).then((()=>({batchId:w.batchId,changes:rf(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.gu[a.currentUser.toKey()];h||(h=new he(X)),h=h.insert(c,u),a.gu[a.currentUser.toKey()]=h})(r,s.batchId,t),await Is(r,s.changes),await Zi(r.remoteStore)}catch(s){const i=ac(s,"Failed to persist write");t.reject(i)}}async function $f(n,e){const t=Q(n);try{const r=await cT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.mu.get(i);a&&(re(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?re(a.Iu,14607):s.removedDocuments.size>0&&(re(a.Iu,42227),a.Iu=!1))})),await Is(t,r,e)}catch(r){await hr(r)}}function Zu(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=Q(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const w of m.Ca)w.xa(c)&&(h=!0)})),h&&uc(u)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function YT(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new he(U.comparator);a=a.insert(i,$e.newNoDocument(i,W.min()));const c=Z().add(i),u=new Es(W.min(),new Map,new he(X),a,c);await $f(r,u),r.du=r.du.remove(i),r.mu.delete(e),fc(r)}else await ma(r.localStore,e,!1).then((()=>va(r,e,t))).catch(hr)}async function XT(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await aT(t.localStore,e);Uf(t,r,null),Ff(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Is(t,s)}catch(s){await hr(s)}}async function ZT(n,e,t){const r=Q(n);try{const s=await(function(a,c){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(re(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Uf(r,e,t),Ff(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Is(r,s)}catch(s){await hr(s)}}function Ff(n,e){(n.pu.get(e)||[]).forEach((t=>{t.resolve()})),n.pu.delete(e)}function Uf(n,e,t){const r=Q(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function va(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||Bf(n,r)}))}function Bf(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(nc(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),fc(n))}function eh(n,e,t){for(const r of t)r instanceof Of?(n.fu.addReference(r.key,e),eI(n,r)):r instanceof Mf?(L(dc,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Bf(n,r.key)):z(19791,{Du:r})}function eI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(L(dc,"New document in limbo: "+t),n.Vu.add(r),fc(n))}function fc(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new U(ie.fromString(e)),r=n.yu.next();n.mu.set(r,new qT(t)),n.du=n.du.insert(t,r),Pf(n.remoteStore,new Ct(vt(Hi(t.path)),r,"TargetPurposeLimboResolution",ji.ce))}}async function Is(n,e,t){const r=Q(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,u)=>{a.push(r.Su(u,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=ec.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(a),r.Eu.J_(s),await(async function(u,h){const f=Q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>k.forEach(h,(w=>k.forEach(w.Ps,(A=>f.persistence.referenceDelegate.addReference(m,w.targetId,A))).next((()=>k.forEach(w.Ts,(A=>f.persistence.referenceDelegate.removeReference(m,w.targetId,A)))))))))}catch(m){if(!dr(m))throw m;L(tc,"Failed to update sequence numbers: "+m)}for(const m of h){const w=m.targetId;if(!m.fromCache){const A=f.Cs.get(w),R=A.snapshotVersion,P=A.withLastLimboFreeSnapshotVersion(R);f.Cs=f.Cs.insert(w,P)}}})(r.localStore,i))}async function tI(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){L(dc,"User change. New user:",e.toKey());const r=await Af(t.localStore,e);t.currentUser=e,(function(i,a){i.pu.forEach((c=>{c.forEach((u=>{u.reject(new $(C.CANCELLED,a))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Is(t,r.Os)}}function nI(n,e){const t=Q(n),r=t.mu.get(e);if(r&&r.Iu)return Z().add(r.key);{let s=Z();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function jf(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$f.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=nI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=YT.bind(null,e),e.Eu.J_=FT.bind(null,e.eventManager),e.Eu.bu=UT.bind(null,e.eventManager),e}function rI(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=XT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ZT.bind(null,e),e}class Ri{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Yi(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return oT(this.persistence,new rT,e.initialUser,this.serializer)}Mu(e){return new bf(Za.Ai,this.serializer)}Fu(e){return new fT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ri.provider={build:()=>new Ri};class sI extends Ri{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){re(this.persistence.referenceDelegate instanceof Ai,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new jw(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new bf((r=>Ai.Ai(r,t)),this.serializer)}}class Ea{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Zu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=tI.bind(null,this.syncEngine),await MT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new $T})()}createDatastore(e){const t=Yi(e.databaseInfo.databaseId),r=yT(e.databaseInfo);return IT(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new AT(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Zu(this.syncEngine,t,0)),(function(){return Wu.v()?new Wu:new pT})())}createSyncEngine(e,t){return(function(s,i,a,c,u,h,f){const m=new zT(s,i,a,c,u,h);return f&&(m.wu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=Q(t);L(It,"RemoteStore shutting down."),r.Va.add(5),await Ts(r),r.ma.shutdown(),r.fa.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ea.provider={build:()=>new Ea};/**
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
 */class pc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):Ot("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const an="FirestoreClient";class iI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Le.UNAUTHENTICATED,this.clientId=Ua.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{L(an,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(L(an,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new xt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ac(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function zo(n,e){n.asyncQueue.verifyOperationInProgress(),L(an,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Af(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function th(n,e){n.asyncQueue.verifyOperationInProgress();const t=await oI(n);L(an,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Qu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Qu(e.remoteStore,s))),n._onlineComponents=e}async function oI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(an,"Using user provided OfflineComponentProvider");try{await zo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Vn("Error using user provided cache. Falling back to memory cache: "+t),await zo(n,new Ri)}}else L(an,"Using default OfflineComponentProvider"),await zo(n,new sI(void 0));return n._offlineComponents}async function qf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(an,"Using user provided OnlineComponentProvider"),await th(n,n._uninitializedComponentsProvider._online)):(L(an,"Using default OnlineComponentProvider"),await th(n,new Ea))),n._onlineComponents}function aI(n){return qf(n).then((e=>e.syncEngine))}async function Ci(n){const e=await qf(n),t=e.eventManager;return t.onListen=HT.bind(null,e.syncEngine),t.onUnlisten=KT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=GT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=QT.bind(null,e.syncEngine),t}function cI(n,e,t,r){const s=new pc(r),i=new hc(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>cc(await Ci(n),i))),()=>{s.ku(),n.asyncQueue.enqueueAndForget((async()=>lc(await Ci(n),i)))}}function lI(n,e,t={}){const r=new xt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new pc({next:w=>{f.ku(),a.enqueueAndForget((()=>lc(i,m)));const A=w.docs.has(c);!A&&w.fromCache?h.reject(new $(C.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&w.fromCache&&u&&u.source==="server"?h.reject(new $(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(w)},error:w=>h.reject(w)}),m=new hc(Hi(c.path),f,{includeMetadataChanges:!0,$a:!0});return cc(i,m)})(await Ci(n),n.asyncQueue,e,t,r))),r.promise}function uI(n,e,t={}){const r=new xt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new pc({next:w=>{f.ku(),a.enqueueAndForget((()=>lc(i,m))),w.fromCache&&u.source==="server"?h.reject(new $(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(w)},error:w=>h.reject(w)}),m=new hc(c,f,{includeMetadataChanges:!0,$a:!0});return cc(i,m)})(await Ci(n),n.asyncQueue,e,t,r))),r.promise}function hI(n,e){const t=new xt;return n.asyncQueue.enqueueAndForget((async()=>JT(await aI(n),e,t))),t.promise}/**
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
 */function zf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const dI="ComponentProvider",nh=new Map;function fI(n,e,t,r,s){return new xE(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,zf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const Hf="firestore.googleapis.com",rh=!0;class sh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new $(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Hf,this.ssl=rh}else this.host=e.host,this.ssl=e.ssl??rh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=If;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Uw)throw new $(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}EE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zf(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new $(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class eo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new $(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new uE;switch(r.type){case"firstParty":return new pE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new $(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=nh.get(t);r&&(L(dI,"Removing Datastore"),nh.delete(t),r.terminate())})(this),Promise.resolve()}}function pI(n,e,t,r={}){n=tt(n,eo);const s=On(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Sa(`https://${c}`),i.host!==Hf&&i.host!==c&&Vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Pn(u,a)&&(n._setSettings(u),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=Le.MOCK_USER;else{h=vg(r.mockUserToken,n._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new $(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Le(m)}n._authCredentials=new hE(new Dd(h,f))}}/**
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
 */class Lt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Lt(this.firestore,e,this._query)}}class me{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Xt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new me(this.firestore,e,this._key)}toJSON(){return{type:me._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ys(t,me._jsonSchema))return new me(e,r||null,new U(ie.fromString(t.referencePath)))}}me._jsonSchemaVersion="firestore/documentReference/1.0",me._jsonSchema={type:we("string",me._jsonSchemaVersion),referencePath:we("string")};class Xt extends Lt{constructor(e,t,r){super(e,t,Hi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new me(this.firestore,null,new U(e))}withConverter(e){return new Xt(this.firestore,e,this._path)}}function to(n,e,...t){if(n=ge(n),Vd("collection","path",e),n instanceof eo){const r=ie.fromString(e,...t);return _u(r),new Xt(n,null,r)}{if(!(n instanceof me||n instanceof Xt))throw new $(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ie.fromString(e,...t));return _u(r),new Xt(n.firestore,null,r)}}function no(n,e,...t){if(n=ge(n),arguments.length===1&&(e=Ua.newId()),Vd("doc","path",e),n instanceof eo){const r=ie.fromString(e,...t);return gu(r),new me(n,null,new U(r))}{if(!(n instanceof me||n instanceof Xt))throw new $(C.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ie.fromString(e,...t));return gu(r),new me(n.firestore,n instanceof Xt?n.converter:null,new U(r))}}/**
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
 */const ih="AsyncQueue";class oh{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Rf(this,"async_queue_retry"),this.cc=()=>{const r=qo();r&&L(ih,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=qo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=qo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new xt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!dr(e))throw e;L(ih,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,Ot("INTERNAL UNHANDLED ERROR: ",ah(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=oc.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&z(47125,{Ec:ah(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function ah(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class cn extends eo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new oh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new oh(e),this._firestoreClient=void 0,await e}}}function mI(n,e){const t=typeof n=="object"?n:Li(),r=typeof n=="string"?n:_i,s=Mi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=$h("firestore");i&&pI(s,...i)}return s}function ro(n){if(n._terminated)throw new $(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||gI(n),n._firestoreClient}function gI(n){const e=n._freezeSettings(),t=fI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new iI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
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
 */class rt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new rt(De.fromBase64String(e))}catch(t){throw new $(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new rt(De.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ys(e,rt._jsonSchema))return rt.fromBase64String(e.bytes)}}rt._jsonSchemaVersion="firestore/bytes/1.0",rt._jsonSchema={type:we("string",rt._jsonSchemaVersion),bytes:we("string")};/**
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
 */class mc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new $(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ne(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class so{constructor(e){this._methodName=e}}/**
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
 */class wt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new $(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new $(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:wt._jsonSchemaVersion}}static fromJSON(e){if(ys(e,wt._jsonSchema))return new wt(e.latitude,e.longitude)}}wt._jsonSchemaVersion="firestore/geoPoint/1.0",wt._jsonSchema={type:we("string",wt._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};/**
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
 */class ut{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ys(e,ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new ut(e.vectorValues);throw new $(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ut._jsonSchemaVersion="firestore/vectorValue/1.0",ut._jsonSchema={type:we("string",ut._jsonSchemaVersion),vectorValues:we("object")};/**
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
 */const _I=/^__.*__$/;class yI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new mn(e,this.data,this.fieldMask,t,this.fieldTransforms):new vs(e,this.data,t,this.fieldTransforms)}}class Gf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new mn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Wf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{dataSource:n})}}class gc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new gc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Pi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if(Wf(this.dataSource)&&_I.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class vI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Yi(e)}V(e,t,r,s=!1){return new gc({dataSource:e,methodName:t,targetDoc:r,path:Ne.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _c(n){const e=n._freezeSettings(),t=Yi(n._databaseId);return new vI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function EI(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);vc("Data must be an object, but it was:",a,r);const c=Kf(r,a);let u,h;if(i.merge)u=new et(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const w=ir(e,m,t);if(!a.contains(w))throw new $(C.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Yf(f,w)||f.push(w)}u=new et(f),h=a.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=a.fieldTransforms;return new yI(new Qe(c),u,h)}class io extends so{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.bc(`${this._methodName}() can only appear at the top level of your update data`):e.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof io}}class yc extends so{_toFieldTransform(e){return new ow(e.path,new os)}isEqual(e){return e instanceof yc}}function wI(n,e,t,r){const s=n.V(1,e,t);vc("Data must be an object, but it was:",s,r);const i=[],a=Qe.empty();pn(r,((u,h)=>{const f=Jf(e,u,t);h=ge(h);const m=s.wc(f);if(h instanceof io)i.push(f);else{const w=bs(h,m);w!=null&&(i.push(f),a.set(f,w))}}));const c=new et(i);return new Gf(a,c,s.fieldTransforms)}function TI(n,e,t,r,s,i){const a=n.V(1,e,t),c=[ir(e,r,t)],u=[s];if(i.length%2!=0)throw new $(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<i.length;w+=2)c.push(ir(e,i[w])),u.push(i[w+1]);const h=[],f=Qe.empty();for(let w=c.length-1;w>=0;--w)if(!Yf(h,c[w])){const A=c[w];let R=u[w];R=ge(R);const P=a.wc(A);if(R instanceof io)h.push(A);else{const N=bs(R,P);N!=null&&(h.push(A),f.set(A,N))}}const m=new et(h);return new Gf(f,m,a.fieldTransforms)}function II(n,e,t,r=!1){return bs(t,n.V(r?4:3,e))}function bs(n,e){if(Qf(n=ge(n)))return vc("Unsupported field value:",e,n),Kf(n,e);if(n instanceof so)return(function(r,s){if(!Wf(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let u=bs(c,s.Sc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=ge(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return rw(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=oe.fromDate(r);return{timestampValue:bi(s.serializer,i)}}if(r instanceof oe){const i=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:bi(s.serializer,i)}}if(r instanceof wt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof rt)return{bytesValue:mf(s.serializer,r._byteString)};if(r instanceof me){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ya(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ut)return(function(a,c){const u=a instanceof ut?a.toArray():a;return{mapValue:{fields:{[qd]:{stringValue:zd},[yi]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return Ki(c.serializer,f)}))}}}}}})(r,s);if(Tf(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Bi(r)}`)})(n,e)}function Kf(n,e){const t={};return Ld(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):pn(n,((r,s)=>{const i=bs(s,e.gc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Qf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof wt||n instanceof rt||n instanceof me||n instanceof so||n instanceof ut||Tf(n))}function vc(n,e,t){if(!Qf(t)||!Od(t)){const r=Bi(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function ir(n,e,t){if((e=ge(e))instanceof mc)return e._internalPath;if(typeof e=="string")return Jf(n,e);throw Pi("Field path arguments must be of type string or ",n,!1,void 0,t)}const bI=new RegExp("[~\\*/\\[\\]]");function Jf(n,e,t){if(e.search(bI)>=0)throw Pi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new mc(...e.split("."))._internalPath}catch{throw Pi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Pi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new $(C.INVALID_ARGUMENT,c+n+u)}function Yf(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class AI{convertValue(e,t="none"){switch(rn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return pn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[yi].arrayValue?.values?.map((r=>ye(r.doubleValue)));return new ut(t)}convertGeoPoint(e){return new wt(ye(e.latitude),ye(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=zi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ts(e));default:return null}}convertTimestamp(e){const t=tn(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ie.fromString(e);re(wf(r),9688,{name:e});const s=new ns(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(t)||Ot(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class Ec extends AI{constructor(e){super(),this.firestore=e}convertBytes(e){return new rt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new me(this.firestore,null,t)}}function Ho(){return new yc("serverTimestamp")}const ch="@firebase/firestore",lh="4.15.0";/**
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
 */function uh(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
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
 */class Xf{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new SI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(ir("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class SI extends Xf{data(){return super.data()}}/**
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
 */function Zf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new $(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class wc{}class Tc extends wc{}function oo(n,e,...t){let r=[];e instanceof wc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof bc)).length,c=i.filter((u=>u instanceof Ic)).length;if(a>1||a>0&&c>0)throw new $(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Ic extends Tc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ic(e,t,r)}_apply(e){const t=this._parse(e);return tp(e._query,t),new Lt(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=_c(e.firestore);return(function(i,a,c,u,h,f,m){let w;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new $(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){dh(m,f);const R=[];for(const P of m)R.push(hh(u,i,P));w={arrayValue:{values:R}}}else w=hh(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||dh(m,f),w=II(c,a,m,f==="in"||f==="not-in");return Ee.create(h,f,w)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class bc extends wc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new bc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ht.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)tp(a,u),a=ua(a,u)})(e._query,t),new Lt(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ac extends Tc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ac(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new $(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new $(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new is(i,a)})(e._query,this._field,this._direction);return new Lt(e.firestore,e.converter,QE(e._query,t))}}function ao(n,e="asc"){const t=e,r=ir("orderBy",n);return Ac._create(r,t)}class Sc extends Tc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Sc(e,t,r)}_apply(e){return new Lt(e.firestore,e.converter,Ei(e._query,this._limit,this._limitType))}}function ep(n){return Sc._create("limit",n,"F")}function hh(n,e,t){if(typeof(t=ge(t))=="string"){if(t==="")throw new $(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Zd(e)&&t.indexOf("/")!==-1)throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ie.fromString(t));if(!U.isDocumentKey(r))throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Au(n,new U(r))}if(t instanceof me)return Au(n,t._key);throw new $(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Bi(t)}.`)}function dh(n,e){if(!Array.isArray(n)||n.length===0)throw new $(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function tp(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new $(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new $(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function RI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Fr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Rn extends Xf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ni(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ir("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new $(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Rn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Rn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Rn._jsonSchema={type:we("string",Rn._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};class ni extends Rn{data(e={}){return super.data(e)}}class Cn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Fr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ni(this._firestore,this._userDataWriter,r.key,r,new Fr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new $(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:CI(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new $(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Cn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ua.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function CI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
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
 */Cn._jsonSchemaVersion="firestore/querySnapshot/1.0",Cn._jsonSchema={type:we("string",Cn._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};/**
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
 */function PI(n){n=tt(n,me);const e=tt(n.firestore,cn),t=ro(e);return lI(t,n._key).then((r=>sp(e,n,r)))}function np(n){n=tt(n,Lt);const e=tt(n.firestore,cn),t=ro(e),r=new Ec(e);return Zf(n._query),uI(t,n._query).then((s=>new Cn(e,r,n,s)))}function kI(n,e,t){n=tt(n,me);const r=tt(n.firestore,cn),s=RI(n.converter,e),i=_c(r);return Cc(r,[EI(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,lt.none())])}function xI(n,e,t,...r){n=tt(n,me);const s=tt(n.firestore,cn),i=_c(s);let a;return a=typeof(e=ge(e))=="string"||e instanceof mc?TI(i,"updateDoc",n._key,e,t,r):wI(i,"updateDoc",n._key,e),Cc(s,[a.toMutation(n._key,lt.exists(!0))])}function rp(n){return Cc(tt(n.firestore,cn),[new Ka(n._key,lt.none())])}function Rc(n,...e){n=ge(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||uh(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(uh(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,a,c;if(n instanceof me)a=tt(n.firestore,cn),c=Hi(n._key.path),i={next:h=>{e[r]&&e[r](sp(a,n,h))},error:e[r+1],complete:e[r+2]};else{const h=tt(n,Lt);a=tt(h.firestore,cn),c=h._query;const f=new Ec(a);i={next:m=>{e[r]&&e[r](new Cn(a,f,h,m))},error:e[r+1],complete:e[r+2]},Zf(n._query)}const u=ro(a);return cI(u,c,s,i)}function Cc(n,e){const t=ro(n);return hI(t,e)}function sp(n,e,t){const r=t.docs.get(e._key),s=new Ec(n);return new Rn(n,s,e._key,r,new Fr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){lE(cr),kn(new Zt("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new cn(new dE(r.getProvider("auth-internal")),new mE(a,r.getProvider("app-check-internal")),NE(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),_t(ch,lh,e),_t(ch,lh,"esm2020")})();/**
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
 */const NI="type.googleapis.com/google.protobuf.Int64Value",DI="type.googleapis.com/google.protobuf.UInt64Value";function ip(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function ki(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>ki(e));if(typeof n=="function"||typeof n=="object")return ip(n,e=>ki(e));throw new Error("Data cannot be encoded in JSON: "+n)}function or(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case NI:case DI:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>or(e)):typeof n=="function"||typeof n=="object"?ip(n,e=>or(e)):n}/**
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
 */const Pc="functions";/**
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
 */const fh={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Je extends dt{constructor(e,t,r){super(`${Pc}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,Je.prototype)}}function VI(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function xi(n,e){let t=VI(n),r=t,s;try{const i=e&&e.error;if(i){const a=i.status;if(typeof a=="string"){if(!fh[a])return new Je("internal","internal");t=fh[a],r=a}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=or(s))}}catch{}return t==="ok"?null:new Je(t,r,s)}/**
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
 */class OI{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Ke(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{return(await this.auth.getToken())?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const wa="us-central1",MI=/^data: (.*?)(?:\n|$)/;function LI(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Je("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class $I{constructor(e,t,r,s,i=wa,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new OI(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=wa}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function FI(n,e,t){const r=On(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&Sa(n.emulatorOrigin+"/backends")}function UI(n,e,t){const r=s=>jI(n,e,s,{});return r.stream=(s,i)=>zI(n,e,s,i),r}function op(n){return n.emulatorOrigin&&On(n.emulatorOrigin)?"include":void 0}async function BI(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:op(s)})}catch{return{status:0,json:null}}let a=null;try{a=await i.json()}catch{}return{status:i.status,json:a}}async function ap(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function jI(n,e,t,r){const s=n._url(e);return qI(n,s,t,r)}async function qI(n,e,t,r){t=ki(t);const s={data:t},i=await ap(n,r),a=r.timeout||7e4,c=LI(a),u=await Promise.race([BI(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new Je("cancelled","Firebase Functions instance was deleted.");const h=xi(u.status,u.json);if(h)throw h;if(!u.json)throw new Je("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new Je("internal","Response is missing data field.");return{data:or(f)}}function zI(n,e,t,r){const s=n._url(e);return HI(n,s,t,r||{})}async function HI(n,e,t,r){t=ki(t);const s={data:t},i=await ap(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let a;try{a=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r?.signal,credentials:op(n)})}catch(w){if(w instanceof Error&&w.name==="AbortError"){const R=new Je("cancelled","Request was cancelled.");return{data:Promise.reject(R),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(R)}}}}}}const A=xi(0,null);return{data:Promise.reject(A),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(A)}}}}}}let c,u;const h=new Promise((w,A)=>{c=w,u=A});r?.signal?.addEventListener("abort",()=>{const w=new Je("cancelled","Request was cancelled.");u(w)});const f=a.body.getReader(),m=GI(f,c,u,r?.signal);return{stream:{[Symbol.asyncIterator](){const w=m.getReader();return{async next(){const{value:A,done:R}=await w.read();return{value:A,done:R}},async return(){return await w.cancel(),{done:!0,value:void 0}}}}},data:h}}function GI(n,e,t,r){const s=(a,c)=>{const u=a.match(MI);if(!u)return;const h=u[1];try{const f=JSON.parse(h);if("result"in f){e(or(f.result));return}if("message"in f){c.enqueue(or(f.message));return}if("error"in f){const m=xi(0,f);c.error(m),t(m);return}}catch(f){if(f instanceof Je){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r?.aborted){const h=new Je("cancelled","Request was cancelled");return a.error(h),t(h),Promise.resolve()}try{const{value:h,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),a),a.close();return}if(r?.aborted){const w=new Je("cancelled","Request was cancelled");a.error(w),t(w),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const w of m)w.trim()&&s(w.trim(),a);return u()}catch(h){const f=h instanceof Je?h:xi(0,null);a.error(f),t(f)}}},cancel(){return n.cancel()}})}const ph="@firebase/functions",mh="0.13.5";/**
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
 */const WI="auth-internal",KI="app-check-internal",QI="messaging-internal";function JI(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(WI),a=t.getProvider(QI),c=t.getProvider(KI);return new $I(s,i,a,c,r)};kn(new Zt(Pc,e,"PUBLIC").setMultipleInstances(!0)),_t(ph,mh,n),_t(ph,mh,"esm2020")}/**
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
 */function YI(n=Li(),e=wa){const r=Mi(ge(n),Pc).getImmediate({identifier:e}),s=$h("functions");return s&&XI(r,...s),r}function XI(n,e,t){FI(ge(n),e,t)}function co(n,e,t){return UI(ge(n),e)}JI();const Ur={apiKey:"AIzaSyBdkhrlBR-Q2S19LJAPA8WsMBXYcLUP_pA",authDomain:"meal-tracker-46346.firebaseapp.com",projectId:"meal-tracker-46346",storageBucket:"meal-tracker-46346.firebasestorage.app",messagingSenderId:"134287587849",appId:"1:134287587849:web:1bab3a94fa9c197e6896d8",measurementId:""},ZI=!!(Ur.apiKey&&Ur.authDomain&&Ur.projectId&&Ur.appId),kc=V_().length?Li():qh(Ur),Gr=iE(kc),gn=mI(kc),lo=YI(kc),eb={"auth/email-already-in-use":"An account already exists for that email address.","auth/invalid-credential":"Email or password is incorrect.","auth/invalid-email":"Enter a valid email address.","auth/popup-closed-by-user":"Google sign-in was closed before it finished.","auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.","auth/weak-password":"Use a password with at least 6 characters.","functions/failed-precondition":"The request cannot be completed yet.","functions/invalid-argument":"Some submitted information is invalid.","functions/not-found":"The requested record was not found.","functions/permission-denied":"You do not have access to that record.","functions/resource-exhausted":"The request is too large or the service is busy.","functions/unauthenticated":"Sign in before making changes.","permission-denied":"You do not have access to this data.",unavailable:"The service is temporarily unavailable. Try again shortly."};function Ye(n,e){return n instanceof dt?eb[n.code]??n.message??e:n instanceof Error&&n.message||e}var tb=B('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="grid size-11 place-items-center rounded-lg bg-brand text-background"></div><div><h1 class="text-xl font-semibold">Meal Signal</h1><p class="text-sm text-muted">Private meal and symptom tracking</p></div></div><form class="grid gap-4"><label class="grid gap-1 text-sm font-medium text-muted-strong">Email<span class=relative><input class="h-11 w-full rounded-lg border border-border-strong bg-surface pl-10 pr-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=email autocomplete=email required></span></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Password<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=password minlength=6 required></label><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"></button></form><div class="my-4 flex items-center gap-3 text-xs font-medium uppercase text-muted"><span class="h-px flex-1 bg-border"></span>Or<span class="h-px flex-1 bg-border"></span></div><button type=button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60">Continue with Google</button><button type=button class="mt-4 w-full text-center text-sm font-medium text-brand">'),nb=B('<p class="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger"aria-live=polite>');function rb(){const[n,e]=Y("signin"),[t,r]=Y(""),[s,i]=Y(""),[a,c]=Y(!1),[u,h]=Y("");async function f(w){w.preventDefault(),c(!0),h("");try{n()==="signin"?await zy(Gr,t(),s()):await qy(Gr,t(),s())}catch(A){h(Ye(A,"Authentication failed."))}finally{c(!1)}}async function m(){c(!0),h("");try{const w=new At;w.setCustomParameters({prompt:"select_account"}),await pv(Gr,w)}catch(w){h(Ye(w,"Google sign-in failed."))}finally{c(!1)}}return(()=>{var w=tb(),A=w.firstChild,R=A.firstChild,P=R.firstChild,N=R.nextSibling,O=N.firstChild,F=O.firstChild,M=F.nextSibling,G=M.firstChild,H=O.nextSibling,j=H.firstChild,T=j.nextSibling,_=H.nextSibling,y=N.nextSibling,E=y.nextSibling;E.firstChild;var v=E.nextSibling;return x(P,V(Qr,{size:20,"aria-hidden":!0})),N.addEventListener("submit",f),x(M,V(Xm,{class:"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",size:17,"aria-hidden":!0}),G),G.$$input=I=>r(I.target.value),T.$$input=I=>i(I.target.value),x(N,(()=>{var I=Ue(()=>!!u());return()=>I()?(()=>{var g=nb();return x(g,u),g})():null})(),_),x(_,(()=>{var I=Ue(()=>!!a());return()=>I()?"Working...":n()==="signin"?"Sign in":"Create account"})(),null),x(_,V(Ol,{size:17,"aria-hidden":!0}),null),E.$$click=m,x(E,V(Ol,{size:17,"aria-hidden":!0}),null),v.$$click=()=>e(n()==="signin"?"signup":"signin"),x(v,()=>n()==="signin"?"Create a new account":"Sign in instead"),ue(I=>{var g=n()==="signin"?"current-password":"new-password",K=a(),ae=a();return g!==I.e&&ne(T,"autocomplete",I.e=g),K!==I.t&&(_.disabled=I.t=K),ae!==I.a&&(E.disabled=I.a=ae),I},{e:void 0,t:void 0,a:void 0}),ue(()=>G.value=t()),ue(()=>T.value=s()),w})()}un(["input","click"]);const sb=co(lo,"createMeal"),ib=co(lo,"createGiEvent"),ob=co(lo,"analyzeCorrelations"),ab=co(lo,"reanalyzeMeal");async function cb(n){return(await sb(n)).data.meal}async function lb(n){return(await ib(n)).data.event}async function ub(){return(await ob()).data.analysis}async function hb(n){return(await ab({mealId:n})).data.meal}function Ni(n){const e=n.getTimezoneOffset();return new Date(n.getTime()-e*6e4).toISOString().slice(0,16)}function gh(n){const e=Date.now()-n.getTime(),t=Math.round(e/6e4);if(t<1)return"just now";if(t<60)return`${t}m ago`;const r=Math.round(t/60);if(r<24)return`${r}h ago`;const s=Math.round(r/24);return s<7?`${s}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===new Date().getFullYear()?void 0:"numeric"})}const db=["cramping","bloating","reflux","nausea","diarrhea","constipation","gas","pain"],_h=5*1024*1024;var cp=B("<button type=button>"),fb=B('<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),lp=B("<p aria-live=polite>"),pb=B('<div class="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-sm"><div class="mb-2 text-brand"></div><p class="truncate text-xs font-medium uppercase text-muted"></p><p class="truncate text-lg font-semibold">'),mb=B("<div>"),gb=B('<div class="grid place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-muted"><div class="mb-2 text-muted"></div><p class="text-sm font-medium">'),_b=B('<main class="grid min-h-screen place-items-center bg-background text-muted-strong">'),yb=B('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><h1 class="mb-2 text-lg font-semibold">Firebase config missing</h1><p class="text-sm text-muted-strong">Add the Firebase Web App values to `.env.local` or the Vite environment variables.');function yh({active:n,children:e,icon:t,onClick:r}){return(()=>{var s=cp();return ba(s,"click",r,!0),x(s,t,null),x(s,e,null),ue(i=>ar(s,{"flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition":!0,"bg-brand text-background shadow-sm":n,"text-muted-strong hover:bg-surface-muted":!n},i)),s})()}function Go({active:n,children:e,icon:t,onClick:r}){return(()=>{var s=cp();return ba(s,"click",r,!0),x(s,t,null),x(s,e,null),ue(i=>ar(s,{"flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition":!0,"border-brand bg-brand text-background":n,"border-border-strong bg-surface text-muted-strong hover:border-muted":!n},i)),s})()}function up({busy:n,disabled:e,label:t,message:r,tone:s="info"}){const i=s==="error"?"text-danger":s==="success"?"text-brand":"text-muted-strong";return(()=>{var a=fb(),c=a.firstChild;return c.disabled=e,x(c,n?"Saving...":t,null),x(c,n?V(Vi,{class:"animate-spin",size:16,"aria-hidden":!0}):V(Nh,{size:16,"aria-hidden":!0}),null),x(a,r?(()=>{var u=lp();return Ia(u,`text-sm ${i}`),x(u,r),u})():null,null),a})()}function Wo({icon:n,label:e,value:t}){return(()=>{var r=pb(),s=r.firstChild,i=s.nextSibling,a=i.nextSibling;return x(s,n),x(i,e),x(a,t),r})()}function vh({ready:n,label:e}){return(()=>{var t=mb();return x(t,n?V(Nh,{size:16,"aria-hidden":!0}):V(Dh,{size:16,"aria-hidden":!0}),null),x(t,n?e:"No media selected",null),ue(r=>ar(t,{"flex items-center gap-2 text-sm":!0,"text-brand":n,"text-muted":!n},r)),t})()}function hp({icon:n,title:e}){return(()=>{var t=gb(),r=t.firstChild,s=r.nextSibling;return x(r,n),x(s,e),t})()}function xc({children:n,tone:e="info"}){const t=e==="error"?"border-danger/30 bg-danger-soft text-danger-strong":"border-border bg-surface-muted text-muted-strong";return(()=>{var r=lp();return Ia(r,`rounded-lg border px-3 py-2 text-sm ${t}`),x(r,n),r})()}function vb(){return(()=>{var n=_b();return x(n,V(Vi,{class:"animate-spin",size:22,"aria-label":"Loading"})),n})()}function Eb(){return yb()}un(["click"]);var wb=B('<svg class="h-12 w-20 shrink-0"viewBox="0 0 80 48"role=img>'),Tb=B("<svg><circle cx=22 cy=26 r=7 stroke-width=2></svg>",!1,!0,!1),Ib=B("<svg><circle cx=38 cy=20 r=6 stroke-width=2></svg>",!1,!0,!1),bb=B("<svg><circle cx=52 cy=29 r=7 stroke-width=2></svg>",!1,!0,!1),Ab=B("<svg><circle cx=62 cy=18 r=5 stroke-width=2></svg>",!1,!0,!1),Sb=B("<svg><ellipse cx=40 cy=25 rx=29 ry=11 stroke-width=2></svg>",!1,!0,!1),Rb=B('<svg><path d="M18 24c8-8 16 7 24-1s14 6 22-1"fill=none stroke=#f3efe7 stroke-width=3></svg>',!1,!0,!1),Cb=B("<svg><ellipse cx=40 cy=25 rx=30 ry=10 stroke-width=2></svg>",!1,!0,!1),Pb=B('<svg><path d="M25 18l5 8M40 16l-3 10M53 19l-5 8"stroke=#f3efe7 stroke-width=3 stroke-linecap=round></svg>',!1,!0,!1),kb=B('<svg><path d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"stroke-width=2></svg>',!1,!0,!1),xb=B("<svg><ellipse cx=24 cy=27 rx=11 ry=9 stroke-width=2></svg>",!1,!0,!1),Nb=B("<svg><ellipse cx=43 cy=22 rx=12 ry=9 stroke-width=2></svg>",!1,!0,!1),Db=B("<svg><ellipse cx=57 cy=31 rx=10 ry=8 stroke-width=2></svg>",!1,!0,!1),Vb=B('<svg><path d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z"stroke-width=2></svg>',!1,!0,!1),Ob=B('<svg><path d="M29 22l-6 5M43 20l4 6M53 33l-7 4"stroke=#f3efe7 stroke-width=2 stroke-linecap=round></svg>',!1,!0,!1),Mb=B("<svg><ellipse cx=40 cy=29 rx=31 ry=10 fill=#8b6f47 opacity=0.55></svg>",!1,!0,!1),Lb=B("<svg><ellipse cx=31 cy=26 rx=9 ry=4 opacity=0.7></svg>",!1,!0,!1),$b=B("<svg><ellipse cx=52 cy=31 rx=11 ry=4 opacity=0.6></svg>",!1,!0,!1),Fb=B('<svg><path d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"stroke-width=2></svg>',!1,!0,!1),Ub=B('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">GI event</h2><p class="text-sm text-muted">Record timing, severity, and symptoms.</p></div></div><form class="grid gap-4"><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Occurred at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Severity: <input class="h-11 accent-brand"type=range min=1 max=10></label></div><div class="grid gap-2"><span class="text-sm font-medium text-muted-strong">Symptoms</span><div class="flex flex-wrap gap-2"></div></div><div class="grid gap-4 sm:grid-cols-3"><div class="grid gap-2 text-sm font-medium text-muted-strong sm:col-span-1"><a class="w-fit underline decoration-border-strong underline-offset-4 transition hover:text-brand hover:decoration-brand"href=https://en.wikipedia.org/wiki/Bristol_stool_scale target=_blank rel=noreferrer>Stool type</a><div class="rounded-lg border border-border-strong bg-surface p-3"><div class="mb-3 flex min-h-14 items-center gap-3"><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><p class="text-base font-semibold text-foreground"></p></div><p class="line-clamp-2 text-xs font-medium text-muted"></p></div></div><input class="h-6 w-full accent-brand"type=range min=1 max=7 step=1 aria-label="Bristol stool type"><div class="mt-1 flex justify-between text-[11px] font-medium text-muted"><span>1</span><span>7</span></div></div></div><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Minutes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=number min=1 max=1440></label><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20">'),Bb=B("<button type=button>"),jb=B('<button type=button class="rounded px-1.5 py-0.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-muted-strong">Clear');const qb=[{value:1,label:"Separate hard lumps"},{value:2,label:"Lumpy sausage"},{value:3,label:"Cracked sausage"},{value:4,label:"Smooth soft sausage"},{value:5,label:"Soft blobs"},{value:6,label:"Mushy pieces"},{value:7,label:"Watery"}];function zb(n){const e=Number(n);return qb.find(t=>t.value===e)??null}function Hb({type:n}){const e=n?"#5f4b32":"#d6d3d1",t=n?"#3f3323":"#a8a29e";return(()=>{var r=wb();return ne(r,"aria-label",n?`Bristol stool type ${n}`:"No stool type selected"),x(r,n===1?[(()=>{var s=Tb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Ib();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=bb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Ab();return ne(s,"fill",e),ne(s,"stroke",t),s})()]:null,null),x(r,n===2?[(()=>{var s=Sb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),Rb()]:null,null),x(r,n===3?[(()=>{var s=Cb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),Pb()]:null,null),x(r,n===4?(()=>{var s=kb();return ne(s,"fill",e),ne(s,"stroke",t),s})():null,null),x(r,n===5?[(()=>{var s=xb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Nb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),(()=>{var s=Db();return ne(s,"fill",e),ne(s,"stroke",t),s})()]:null,null),x(r,n===6?[(()=>{var s=Vb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),Ob()]:null,null),x(r,n===7?[Mb(),(()=>{var s=Lb();return ne(s,"fill",e),s})(),(()=>{var s=$b();return ne(s,"fill",e),s})()]:null,null),x(r,n?null:(()=>{var s=Fb();return ne(s,"fill",e),ne(s,"stroke",t),s})(),null),r})()}function Gb(){const[n,e]=Y(Ni(new Date)),[t,r]=Y(4),[s,i]=Y([]),[a,c]=Y(""),[u,h]=Y(""),[f,m]=Y(""),[w,A]=Y(!1),[R,P]=Y(""),[N,O]=Y("info"),F=()=>zb(u());function M(H){const j=s();i(j.includes(H)?j.filter(T=>T!==H):[...j,H])}async function G(H){H.preventDefault(),A(!0),P(""),O("info");const j=new Date(n());if(Number.isNaN(j.getTime())){O("error"),P("Choose a valid event time."),A(!1);return}if(s().length===0&&!u()){O("error"),P("Choose a symptom or stool type."),A(!1);return}try{await lb({occurredAt:j.toISOString(),severity:t(),symptoms:s(),notes:a().trim()||void 0,stoolType:u()?Number(u()):void 0,durationMinutes:f()?Number(f()):void 0}),e(Ni(new Date)),r(4),i([]),c(""),h(""),m(""),O("success"),P("Event saved.")}catch(T){O("error"),P(Ye(T,"Event could not be saved."))}finally{A(!1)}}return(()=>{var H=Ub(),j=H.firstChild;j.firstChild;var T=j.nextSibling,_=T.firstChild,y=_.firstChild,E=y.firstChild,v=E.nextSibling,I=y.nextSibling,g=I.firstChild,K=g.nextSibling,ae=_.nextSibling,it=ae.firstChild,qe=it.nextSibling,ze=ae.nextSibling,Ve=ze.firstChild,ft=Ve.firstChild,nt=ft.nextSibling,Se=nt.firstChild,de=Se.firstChild,fe=de.firstChild,ke=fe.firstChild,ot=fe.nextSibling,Xe=Se.nextSibling,$t=Ve.nextSibling,$n=$t.firstChild,As=$n.nextSibling,ho=$t.nextSibling,Ss=ho.firstChild,Fn=Ss.nextSibling;return x(j,V(xh,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),T.addEventListener("submit",G),v.$$input=ce=>e(ce.target.value),x(I,t,K),K.addEventListener("change",ce=>r(Number(ce.target.value))),x(qe,()=>db.map(ce=>(()=>{var bt=Bb();return bt.$$click=()=>M(ce),x(bt,ce),ue(mr=>ar(bt,{"h-9 rounded-md border px-3 text-sm font-medium transition":!0,"border-brand bg-brand text-background":s().includes(ce),"border-border-strong bg-surface text-muted-strong hover:border-muted":!s().includes(ce)},mr)),bt})())),x(Se,V(Hb,{get type(){return F()?.value??null}}),de),x(ke,(()=>{var ce=Ue(()=>!!F());return()=>ce()?`Type ${F().value}`:"Not set"})()),x(fe,(()=>{var ce=Ue(()=>!!F());return()=>ce()?(()=>{var bt=jb();return bt.$$click=()=>h(""),bt})():null})(),null),x(ot,()=>F()?.label??"Move slider to set"),Xe.$$keydown=ce=>{!u()&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(ce.key)&&h("4")},Xe.addEventListener("change",ce=>h(ce.target.value)),Xe.$$pointerdown=()=>h(ce=>ce||"4"),As.$$input=ce=>m(ce.target.value),Fn.$$input=ce=>c(ce.target.value),x(T,V(up,{get busy(){return w()},get disabled(){return Ue(()=>s().length===0)()&&!u()||w()},get message(){return R()},get tone(){return N()},label:"Save event"}),null),ue(()=>v.value=n()),ue(()=>K.value=t()),ue(()=>Xe.value=u()||"4"),ue(()=>As.value=f()),ue(()=>Fn.value=a()),H})()}un(["input","pointerdown","keydown","click"]);var Wb=B('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">Meal</h2><p class="text-sm text-muted">Capture what you ate and when.</p></div></div><form class="grid gap-4"><div class="grid grid-cols-3 gap-2"></div><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Eaten at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Portion, stress, meds">'),Kb=B('<label class="grid gap-1 text-sm font-medium text-muted-strong">Meal text<textarea class="min-h-28 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Turkey sandwich, chips, iced coffee">'),Qb=B('<div class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3"><button type=button>'),Jb=B('<label class="grid gap-3 rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 text-sm font-medium text-muted-strong"><span class="flex items-center gap-2">Meal photo</span><input class="block w-full text-sm text-muted-strong file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"type=file accept=image/* capture=environment>');function Yb(){const[n,e]=Y("text"),[t,r]=Y(""),[s,i]=Y(""),[a,c]=Y(Ni(new Date)),[u,h]=Y(""),[f,m]=Y(""),[w,A]=Y(!1),[R,P]=Y(!1),[N,O]=Y(""),[F,M]=Y("info");let G=null,H=null,j=[];oi(()=>{G?.stop(),H?.getTracks().forEach(v=>v.stop())});async function T(v){v.preventDefault(),P(!0),O(""),M("info");const I=new Date(a());if(Number.isNaN(I.getTime())){M("error"),O("Choose a valid meal time."),P(!1);return}try{await cb({mode:n(),text:n()==="text"?t():void 0,mediaBase64:n()==="text"?void 0:u(),mimeType:n()==="text"?void 0:f(),eatenAt:I.toISOString(),notes:s().trim()||void 0}),r(""),i(""),h(""),m(""),c(Ni(new Date)),M("success"),O("Meal saved.")}catch(g){M("error"),O(Ye(g,"Meal could not be saved."))}finally{P(!1)}}async function _(v){if(O(""),M("info"),!!v){if(v.size>_h){h(""),m(""),M("error"),O("Use an image smaller than 5 MB.");return}try{const I=await Xb(v);h(I),m(v.type),M("success"),O("Image ready.")}catch(I){M("error"),O(Ye(I,"Image could not be read."))}}}async function y(){if(O(""),M("info"),w()){G?.stop();return}if(!navigator.mediaDevices?.getUserMedia){M("error"),O("Audio recording is not available in this browser.");return}try{const v=await navigator.mediaDevices.getUserMedia({audio:!0}),I=new MediaRecorder(v);j=[],G=I,H=v,I.ondataavailable=g=>{g.data.size&&j.push(g.data)},I.onerror=()=>{M("error"),O("Audio recording failed.")},I.onstop=async()=>{const g=new Blob(j,{type:I.mimeType||"audio/webm"});if(H?.getTracks().forEach(K=>K.stop()),H=null,A(!1),g.size>_h){h(""),m(""),M("error"),O("Use a shorter recording under 5 MB.");return}try{h(await dp(g)),m(g.type),M("success"),O("Audio ready.")}catch(K){M("error"),O(Ye(K,"Audio could not be prepared."))}},I.start(),A(!0)}catch(v){M("error"),O(Ye(v,"Microphone access was not granted."))}}const E=()=>n()==="text"?t().trim().length>2:u().length>0&&f().length>0;return(()=>{var v=Wb(),I=v.firstChild;I.firstChild;var g=I.nextSibling,K=g.firstChild,ae=K.nextSibling,it=ae.firstChild,qe=it.firstChild,ze=qe.nextSibling,Ve=it.nextSibling,ft=Ve.firstChild,nt=ft.nextSibling;return x(I,V(Qr,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),g.addEventListener("submit",T),x(K,V(Go,{get active(){return n()==="text"},onClick:()=>e("text"),get icon(){return V(Qr,{size:17})},children:"Text"}),null),x(K,V(Go,{get active(){return n()==="voice"},onClick:()=>e("voice"),get icon(){return V(Ml,{size:17})},children:"Voice"}),null),x(K,V(Go,{get active(){return n()==="image"},onClick:()=>e("image"),get icon(){return V(Vl,{size:17})},children:"Image"}),null),x(g,(()=>{var Se=Ue(()=>n()==="text");return()=>Se()?(()=>{var de=Kb(),fe=de.firstChild,ke=fe.nextSibling;return ke.$$input=ot=>r(ot.target.value),ue(()=>ke.value=t()),de})():Ue(()=>n()==="voice")()?(()=>{var de=Qb(),fe=de.firstChild;return fe.$$click=y,x(fe,V(Ml,{size:18,"aria-hidden":!0}),null),x(fe,(()=>{var ke=Ue(()=>!!w());return()=>ke()?"Stop recording":u()?"Record again":"Record"})(),null),x(de,V(vh,{get ready(){return!!u()},label:"Audio ready"}),null),ue(ke=>ar(fe,{"flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition":!0,"bg-danger text-background hover:bg-danger-strong":w(),"bg-brand text-background hover:bg-brand-hover":!w()},ke)),de})():(()=>{var de=Jb(),fe=de.firstChild,ke=fe.firstChild,ot=fe.nextSibling;return x(fe,V(Vl,{size:18,"aria-hidden":!0}),ke),ot.addEventListener("change",Xe=>_(Xe.target.files?.[0])),x(de,V(vh,{get ready(){return!!u()},label:"Image ready"}),null),de})()})(),ae),ze.$$input=Se=>c(Se.target.value),nt.$$input=Se=>i(Se.target.value),x(g,V(up,{get busy(){return R()},get disabled(){return!E()||R()},get message(){return N()},get tone(){return F()},label:"Save meal"}),null),ue(()=>ze.value=a()),ue(()=>nt.value=s()),v})()}function Xb(n){return dp(n)}function dp(n){return new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=String(r.result??"");e(s.includes(",")?s.split(",")[1]:s)},r.onerror=()=>t(r.error),r.readAsDataURL(n)})}un(["input","click"]);function An(n){return n?n.toISOString():void 0}function Ie(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Zb(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"meal"}function Nc(n){return{...n,eatenAt:An(n.eatenAt),createdAt:An(n.createdAt),updatedAt:An(n.updatedAt),reanalyzedAt:An(n.reanalyzedAt)}}function eA(n){return{...n,occurredAt:An(n.occurredAt),createdAt:An(n.createdAt)}}function tA(n){return n?{...n,generatedAt:An(n.generatedAt)}:null}function uo(n,e,t){const r=new Blob([t],{type:e}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=n,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function nA(n){const e=Zb(n.analysis.mealName||n.id);uo(`meal-signal-meal-${e}-${n.eatenAt.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),meal:Nc(n)},null,2))}function rA(n){uo(`meal-signal-meals-${new Date().toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),mealCount:n.length,meals:n.map(Nc)},null,2))}function sA({analysis:n,meals:e,events:t,exportedAt:r=new Date}){uo(`meal-signal-analysis-${r.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:r.toISOString(),analysis:tA(n),meals:e.map(Nc),giEvents:t.map(eA)},null,2))}function iA({analysis:n,meals:e,events:t,exportedAt:r=new Date}){const s=n?.findings??[],i=n?.dataQualityNotes??[],a=e.slice(0,50),c=t.slice(0,50),u=`<!doctype html>
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
    <p class="muted">Exported ${Ie(r.toLocaleString())}${n?` · analysis generated ${Ie(n.generatedAt.toLocaleString())}`:""}</p>
    <div class="summary">
      <h2 style="margin-top:0;padding-top:0;border-top:0;">Summary</h2>
      <p>${Ie(n?.summary??"No analysis has been generated yet.")}</p>
      <p class="muted">${e.length} meals and ${t.length} GI events included in this export.</p>
    </div>

    <h2>Findings</h2>
    <div class="grid">
      ${s.length?s.map(h=>`<article class="card">
        <div class="row"><h3>${Ie(h.irritant)}</h3><strong>${Ie(Math.round(h.confidence*100))}%</strong></div>
        <p class="muted">${Ie(h.direction.replaceAll("_"," "))} within ${Ie(h.windowHours)}h</p>
        <p>${Ie(h.evidence)}</p>
        <p><strong>${Ie(h.suggestedAction)}</strong></p>
      </article>`).join(""):'<p class="muted">No findings available.</p>'}
    </div>

    <h2>Data Notes</h2>
    ${i.length?`<ul>${i.map(h=>`<li>${Ie(h)}</li>`).join("")}</ul>`:'<p class="muted">No data quality notes.</p>'}

    <h2>Recent Meals</h2>
    <table>
      <thead><tr><th>When</th><th>Meal</th><th>Foods</th><th>Irritants</th></tr></thead>
      <tbody>
        ${a.map(h=>`<tr>
          <td>${Ie(h.eatenAt.toLocaleString())}</td>
          <td><strong>${Ie(h.analysis.mealName)}</strong><br><span class="muted">${Ie(h.interpretedText)}</span></td>
          <td>${Ie(h.analysis.foods.join(", ")||"None")}</td>
          <td>${h.analysis.irritants.map(f=>`<span class="pill">${Ie(f.name)}</span>`).join("")||"None"}</td>
        </tr>`).join("")}
      </tbody>
    </table>

    <h2>Recent GI Events</h2>
    <table>
      <thead><tr><th>When</th><th>Severity</th><th>Details</th><th>Notes</th></tr></thead>
      <tbody>
        ${c.map(h=>`<tr>
          <td>${Ie(h.occurredAt.toLocaleString())}</td>
          <td>${Ie(h.severity)}</td>
          <td>${Ie([...h.symptoms,h.stoolType?`stool type ${h.stoolType}`:""].filter(Boolean).join(", ")||"No details recorded")}</td>
          <td>${Ie(h.notes??"")}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </main>
</body>
</html>`;uo(`meal-signal-analysis-${r.toISOString().slice(0,10)}.html`,"text/html",u)}function Sn(n){if(n instanceof oe)return n.toDate();if(n instanceof Date)return n;if(typeof n=="string"){const e=new Date(n);return Number.isNaN(e.getTime())?new Date:e}return new Date}function fp(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function pp(n){const e=n.data();return{id:n.id,uid:e.uid,inputMode:e.inputMode,rawInput:e.rawInput??"",interpretedText:e.interpretedText??"",eatenAt:Sn(e.eatenAt),notes:e.notes,status:e.status??"needs_review",analysis:e.analysis??{mealName:"Meal",foods:[],irritants:[],summary:""},createdAt:Sn(e.createdAt),updatedAt:Sn(e.updatedAt),reanalyzedAt:e.reanalyzedAt?Sn(e.reanalyzedAt):void 0}}function mp(n){const e=n.data();return{id:n.id,uid:e.uid,occurredAt:Sn(e.occurredAt),severity:e.severity??1,symptoms:fp(e.symptoms),notes:e.notes,stoolType:e.stoolType,durationMinutes:e.durationMinutes,createdAt:Sn(e.createdAt)}}function oA(n){const e=n.data();return{id:n.id,uid:e.uid,status:e.status??"insufficient_data",generatedAt:Sn(e.generatedAt),mealCount:e.mealCount??0,eventCount:e.eventCount??0,summary:e.summary??"No analysis has been generated yet.",findings:Array.isArray(e.findings)?e.findings:[],dataQualityNotes:fp(e.dataQualityNotes)}}async function aA(n){const e=no(gn,"users",n.uid);if((await PI(e)).exists()){await xI(e,{email:n.email,displayName:n.displayName,updatedAt:Ho()});return}await kI(e,{uid:n.uid,email:n.email,displayName:n.displayName,updatedAt:Ho(),createdAt:Ho()})}async function cA(n,e){await rp(no(gn,"users",n,"meals",e))}async function lA(n,e){await rp(no(gn,"users",n,"events",e))}async function uA(n){const e=oo(to(gn,"users",n,"meals"),ao("eatenAt","desc"));return(await np(e)).docs.map(pp)}async function hA(n){const e=oo(to(gn,"users",n,"events"),ao("occurredAt","desc"));return(await np(e)).docs.map(mp)}function dA(n,e,t){const r=oo(to(gn,"users",n,"meals"),ao("eatenAt","desc"),ep(25));return Rc(r,s=>e(s.docs.map(pp)),t)}function fA(n,e,t){const r=oo(to(gn,"users",n,"events"),ao("occurredAt","desc"),ep(25));return Rc(r,s=>e(s.docs.map(mp)),t)}function pA(n,e,t){return Rc(no(gn,"users",n,"analyses","current"),r=>e(r.exists()?oA(r):null),t)}var mA=B('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 class="text-lg font-semibold">Correlation analysis</h2><p class="text-sm text-muted"></p></div><div class="flex flex-wrap items-center gap-2"><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis HTML"title="Export analysis HTML"></button><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis JSON"title="Export analysis JSON"></button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export all meals JSON"title="Export all meals JSON">Meals</button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),gA=B("<div class=mb-4>"),_A=B('<div class="grid gap-4"><div class="rounded-lg bg-surface-accent p-4"><p class="text-sm font-medium text-brand"></p><p class="mt-2 text-xs text-muted-strong"> meals, <!> GI events</p></div><div class="grid gap-3">'),yA=B('<article class="rounded-lg border border-border p-4"><div class="flex items-start justify-between gap-3"><div><h3 class=font-semibold></h3><p class="text-sm text-muted"> within <!>h</p></div><span class="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">%</span></div><p class="mt-3 text-sm text-muted-strong"></p><p class="mt-2 text-sm font-medium text-brand">'),vA=B('<div class="rounded-lg border border-warning-border bg-warning-soft p-4"><div class="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">Data notes</div><ul class="grid gap-1 text-sm text-warning">'),EA=B("<li>");function wA({uid:n,analysis:e,mealCount:t,eventCount:r}){const[s,i]=Y(!1),[a,c]=Y(""),[u,h]=Y(""),[f,m]=Y(!1);async function w(){i(!0),h(""),m(!1);try{await ub(),h("Analysis queued.")}catch(P){m(!0),h(Ye(P,"Analysis could not be started."))}finally{i(!1)}}async function A(){const[P,N]=await Promise.all([uA(n),hA(n)]);return{meals:P,events:N}}async function R(P){c(P),h(""),m(!1);try{const{meals:N,events:O}=await A();P==="analysis-html"?(iA({analysis:e,meals:N,events:O}),h("Analysis HTML exported.")):P==="analysis-json"?(sA({analysis:e,meals:N,events:O}),h("Analysis JSON exported.")):(rA(N),h("Meals JSON exported."))}catch(N){m(!0),h(Ye(N,"Export could not be prepared."))}finally{c("")}}return(()=>{var P=mA(),N=P.firstChild,O=N.firstChild,F=O.firstChild,M=F.nextSibling,G=O.nextSibling,H=G.firstChild,j=H.nextSibling,T=j.nextSibling,_=T.firstChild,y=T.nextSibling;return x(M,()=>e?`Updated ${e.generatedAt.toLocaleString()}`:`${t} meals and ${r} GI events available`),H.$$click=()=>R("analysis-html"),x(H,V(Gm,{size:17,"aria-hidden":!0})),j.$$click=()=>R("analysis-json"),x(j,V(Jo,{size:17,"aria-hidden":!0})),T.$$click=()=>R("meals-json"),x(T,V(Jo,{size:16,"aria-hidden":!0}),_),y.$$click=w,x(y,V(Vi,{size:16,get class(){return s()?"animate-spin":""},"aria-hidden":!0}),null),x(y,()=>s()?"Starting":"Run",null),x(P,(()=>{var E=Ue(()=>!!u());return()=>E()?(()=>{var v=gA();return x(v,V(xc,{get tone(){return f()?"error":"info"},get children(){return u()}})),v})():null})(),null),x(P,e?(()=>{var E=_A(),v=E.firstChild,I=v.firstChild,g=I.nextSibling,K=g.firstChild,ae=K.nextSibling;ae.nextSibling;var it=v.nextSibling;return x(I,()=>e.summary),x(g,()=>e.mealCount,K),x(g,()=>e.eventCount,ae),x(it,()=>e.findings.map(qe=>(()=>{var ze=yA(),Ve=ze.firstChild,ft=Ve.firstChild,nt=ft.firstChild,Se=nt.nextSibling,de=Se.firstChild,fe=de.nextSibling;fe.nextSibling;var ke=ft.nextSibling,ot=ke.firstChild,Xe=Ve.nextSibling,$t=Xe.nextSibling;return x(nt,()=>qe.irritant),x(Se,(()=>{var $n=Ue(()=>qe.direction==="possible_trigger");return()=>$n()?"possible sensitivity":qe.direction.replaceAll("_"," ")})(),de),x(Se,()=>qe.windowHours,fe),x(ke,()=>Math.round(qe.confidence*100),ot),x(Xe,()=>qe.evidence),x($t,()=>qe.suggestedAction),ze})())),x(E,(()=>{var qe=Ue(()=>!!e.dataQualityNotes.length);return()=>qe()?(()=>{var ze=vA(),Ve=ze.firstChild,ft=Ve.firstChild,nt=Ve.nextSibling;return x(Ve,V(Dh,{size:16,"aria-hidden":!0}),ft),x(nt,()=>e.dataQualityNotes.map(Se=>(()=>{var de=EA();return x(de,Se),de})())),ze})():null})(),null),E})():V(hp,{get icon(){return V(Aa,{size:22})},title:"No analysis yet"}),null),ue(E=>{var v=!!a(),I=!!a(),g=!!a(),K=s();return v!==E.e&&(H.disabled=E.e=v),I!==E.t&&(j.disabled=E.t=I),g!==E.a&&(T.disabled=E.a=g),K!==E.o&&(y.disabled=E.o=K),E},{e:void 0,t:void 0,a:void 0,o:void 0}),P})()}un(["click"]);var TA=B('<section class="grid grid-cols-3 gap-2">'),IA=B('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm"><div class="mb-3 flex items-center gap-2"><h2 class=font-semibold>Recent'),bA=B("<div class=mb-3>"),AA=B('<div class="grid gap-3">'),SA=B('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold"></h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Redo meal analysis"title="Redo meal analysis"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export meal JSON"title="Export meal JSON"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete meal"title="Delete meal"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 line-clamp-2 text-sm text-muted-strong"></p><div class="mt-2 flex flex-wrap gap-1">'),RA=B('<span class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong">'),CA=B('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold">Severity </h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete event"title="Delete event"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 text-sm text-muted-strong">');function PA(n){const e=[...n.symptoms];return n.stoolType&&e.push(`stool type ${n.stoolType}`),e.length?e.join(", "):"No details recorded"}function kA({meals:n,events:e,analysis:t}){const r=er(()=>{const s=new Map;for(const i of n)for(const a of i.analysis.irritants??[])s.set(a.name,(s.get(a.name)??0)+1);return[...s.entries()].sort((i,a)=>a[1]-i[1])[0]?.[0]??"None"});return(()=>{var s=TA();return x(s,V(Wo,{get icon(){return V(Qr,{size:17})},label:"Meals",get value(){return n.length.toString()}}),null),x(s,V(Wo,{get icon(){return V(xh,{size:17})},label:"Events",get value(){return e.length.toString()}}),null),x(s,V(Wo,{get icon(){return V(Aa,{size:17})},label:"Signal",get value(){return t?r():"Pending"}}),null),s})()}function xA({uid:n,meals:e,events:t}){const[r,s]=Y(""),[i,a]=Y(""),[c,u]=Y(""),[h,f]=Y(!1),m=[...e.map(R=>({kind:"meal",date:R.eatenAt,meal:R})),...t.map(R=>({kind:"event",date:R.occurredAt,event:R}))].sort((R,P)=>P.date.getTime()-R.date.getTime()).slice(0,12);async function w(R){s(R),u(""),f(!1);try{await hb(R),u("Meal analysis refreshed.")}catch(P){f(!0),u(Ye(P,"Meal analysis could not be refreshed."))}finally{s("")}}async function A(R){const P=R.kind==="meal"?"meal":"event";if(window.confirm(`Delete this ${P}? This cannot be undone.`)){a(`${R.kind}-${R.id}`),u(""),f(!1);try{R.kind==="meal"?await cA(n,R.id):await lA(n,R.id),u(`${P==="meal"?"Meal":"Event"} deleted.`)}catch(O){f(!0),u(Ye(O,`The ${P} could not be deleted.`))}finally{a("")}}}return(()=>{var R=IA(),P=R.firstChild,N=P.firstChild;return x(P,V(Dl,{size:18,class:"text-brand","aria-hidden":!0}),N),x(R,(()=>{var O=Ue(()=>!!c());return()=>O()?(()=>{var F=bA();return x(F,V(xc,{get tone(){return h()?"error":"info"},get children(){return c()}})),F})():null})(),null),x(R,(()=>{var O=Ue(()=>!!m.length);return()=>O()?(()=>{var F=AA();return x(F,()=>m.map(M=>M.kind==="meal"?(()=>{var G=SA(),H=G.firstChild,j=H.firstChild,T=j.nextSibling,_=T.firstChild,y=_.nextSibling,E=y.nextSibling,v=E.nextSibling,I=H.nextSibling,g=I.nextSibling;return x(j,()=>M.meal.analysis.mealName),_.$$click=()=>w(M.meal.id),x(_,V(Vi,{size:14,get class(){return r()===M.meal.id?"animate-spin":""},"aria-hidden":!0})),y.$$click=()=>nA(M.meal),x(y,V(Jo,{size:14,"aria-hidden":!0})),E.$$click=()=>A({kind:"meal",id:M.meal.id}),x(E,V(Ll,{size:14,"aria-hidden":!0})),x(v,()=>gh(M.date)),x(I,()=>M.meal.interpretedText),x(g,()=>M.meal.analysis.irritants.slice(0,3).map(K=>(()=>{var ae=RA();return x(ae,()=>K.name),ae})())),ue(K=>{var ae=r()===M.meal.id,it=i()===`meal-${M.meal.id}`;return ae!==K.e&&(_.disabled=K.e=ae),it!==K.t&&(E.disabled=K.t=it),K},{e:void 0,t:void 0}),G})():(()=>{var G=CA(),H=G.firstChild,j=H.firstChild;j.firstChild;var T=j.nextSibling,_=T.firstChild,y=_.nextSibling,E=H.nextSibling;return x(j,()=>M.event.severity,null),_.$$click=()=>A({kind:"event",id:M.event.id}),x(_,V(Ll,{size:14,"aria-hidden":!0})),x(y,()=>gh(M.date)),x(E,()=>PA(M.event)),ue(()=>_.disabled=i()===`event-${M.event.id}`),G})())),F})():V(hp,{get icon(){return V(Dl,{size:22})},title:"No entries yet"})})(),null),R})()}un(["click"]);var NA=B('<main class="min-h-screen bg-background text-foreground"><header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"><div class="flex min-w-0 items-center gap-3"><div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"></div><div class=min-w-0><h1 class="truncate text-base font-semibold">Meal Signal</h1><p class="truncate text-sm text-muted"></p></div></div><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"aria-label="Sign out"title="Sign out"></button></div></header><div class="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section class=min-w-0><div class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm"></div></section><aside class="grid content-start gap-5">'),DA=B("<div class=mb-4>"),VA=B('<div class="grid gap-5">');function OA(){const[n,e]=Y(null),[t,r]=Y(!1),[s,i]=Y("log"),[a,c]=Y([]),[u,h]=Y([]),[f,m]=Y(null),[w,A]=Y("");Gp(()=>{const P=Wy(Gr,N=>{e(N),r(!0),A(""),N?aA(N).catch(O=>{A(Ye(O,"Your profile could not be prepared."))}):(c([]),h([]),m(null))});oi(()=>P())}),Ih(()=>{const P=n();if(!P)return;const N=G=>{A(Ye(G,"Live updates are temporarily unavailable."))},O=dA(P.uid,c,N),F=fA(P.uid,h,N),M=pA(P.uid,m,N);oi(()=>{O(),F(),M()})});async function R(){A("");try{await Ky(Gr)}catch(P){A(Ye(P,"Sign out failed."))}}return ZI?t()?n()?(()=>{var P=NA(),N=P.firstChild,O=N.firstChild,F=O.firstChild,M=F.firstChild,G=M.nextSibling,H=G.firstChild,j=H.nextSibling,T=F.nextSibling,_=N.nextSibling,y=_.firstChild,E=y.firstChild,v=y.nextSibling;return x(M,V(Qr,{size:19,"aria-hidden":!0})),x(j,()=>n().email),T.$$click=R,x(T,V(Qm,{size:18,"aria-hidden":!0})),x(y,(()=>{var I=Ue(()=>!!w());return()=>I()?(()=>{var g=DA();return x(g,V(xc,{tone:"error",get children(){return w()}})),g})():null})(),E),x(E,V(yh,{get active(){return s()==="log"},onClick:()=>i("log"),get icon(){return V(rg,{size:17})},children:"Log"}),null),x(E,V(yh,{get active(){return s()==="analysis"},onClick:()=>i("analysis"),get icon(){return V(Aa,{size:17})},children:"Analysis"}),null),x(y,(()=>{var I=Ue(()=>s()==="log");return()=>I()?(()=>{var g=VA();return x(g,V(Yb,{}),null),x(g,V(Gb,{}),null),g})():V(wA,{get uid(){return n().uid},get analysis(){return f()},get mealCount(){return a().length},get eventCount(){return u().length}})})(),null),x(v,V(kA,{get meals(){return a()},get events(){return u()},get analysis(){return f()}}),null),x(v,V(xA,{get uid(){return n().uid},get meals(){return a()},get events(){return u()}}),null),P})():V(rb,{}):V(vb,{}):V(Eb,{})}un(["click"]);function MA(){return V(OA,{})}hm(()=>V(MA,{}),document.getElementById("root"));if("serviceWorker"in navigator){let n=!0;const e=()=>{n&&navigator.serviceWorker.register("/sw.js",{scope:"/",updateViaCache:"none"}).catch(t=>{console.error("Service worker registration failed.",t)})};document.readyState==="complete"?e():window.addEventListener("load",e,{once:!0}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(n=!1)})}
