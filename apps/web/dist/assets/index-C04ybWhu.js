(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const jm=!1,qm=(n,e)=>n===e,ri=Symbol("solid-proxy"),vh=typeof Proxy=="function",zm=Symbol("solid-track"),si={equals:qm};let Eh=Ah;const ln=1,ii=2,wh={owned:null,cleanups:null,context:null,owner:null};var be=null;let Ro=null,Hm=null,pe=null,Ue=null,Nt=null,Di=0;function Gs(n,e){const t=pe,r=be,s=n.length===0,i=e===void 0?r:e,a=s?wh:{owned:null,cleanups:null,context:i?i.context:null,owner:i},c=s?n:()=>n(()=>ht(()=>Kr(a)));be=a,pe=null;try{return ds(c,!0)}finally{pe=t,be=r}}function X(n,e){e=e?Object.assign({},si,e):si;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=s=>(typeof s=="function"&&(s=s(t.value)),bh(t,s));return[Ih.bind(t),r]}function Q(n,e,t){const r=ya(n,e,!1,ln);hs(r)}function Th(n,e,t){Eh=Qm;const r=ya(n,e,!1,ln);r.user=!0,Nt?Nt.push(r):hs(r)}function ct(n,e,t){t=t?Object.assign({},si,t):si;const r=ya(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,hs(r),Ih.bind(r)}function ht(n){if(pe===null)return n();const e=pe;pe=null;try{return n()}finally{pe=e}}function Gm(n){Th(()=>ht(n))}function oi(n){return be===null||(be.cleanups===null?be.cleanups=[n]:be.cleanups.push(n)),n}function Ih(){if(this.sources&&this.state)if(this.state===ln)hs(this);else{const n=Ue;Ue=null,ds(()=>ci(this),!1),Ue=n}if(pe){const n=this.observers;if(!n||n[n.length-1]!==pe){const e=n?n.length:0;pe.sources?(pe.sources.push(this),pe.sourceSlots.push(e)):(pe.sources=[this],pe.sourceSlots=[e]),n?(n.push(pe),this.observerSlots.push(pe.sources.length-1)):(this.observers=[pe],this.observerSlots=[pe.sources.length-1])}}return this.value}function bh(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&ds(()=>{for(let s=0;s<n.observers.length;s+=1){const i=n.observers[s],a=Ro&&Ro.running;a&&Ro.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?Ue.push(i):Nt.push(i),i.observers&&Sh(i)),a||(i.state=ln)}if(Ue.length>1e6)throw Ue=[],new Error},!1)),e}function hs(n){if(!n.fn)return;Kr(n);const e=Di;Wm(n,n.value,e)}function Wm(n,e,t){let r;const s=be,i=pe;pe=be=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=ln,n.owned&&n.owned.forEach(Kr),n.owned=null),n.updatedAt=t+1,Rh(a)}finally{pe=i,be=s}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?bh(n,r):n.value=r,n.updatedAt=t)}function ya(n,e,t,r=ln,s){const i={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:be,context:be?be.context:null,pure:t};return be===null||be!==wh&&(be.owned?be.owned.push(i):be.owned=[i]),i}function ai(n){if(n.state===0)return;if(n.state===ii)return ci(n);if(n.suspense&&ht(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<Di);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===ln)hs(n);else if(n.state===ii){const r=Ue;Ue=null,ds(()=>ci(n,e[0]),!1),Ue=r}}function ds(n,e){if(Ue)return n();let t=!1;e||(Ue=[]),Nt?t=!0:Nt=[],Di++;try{const r=n();return Km(t),r}catch(r){t||(Nt=null),Ue=null,Rh(r)}}function Km(n){if(Ue&&(Ah(Ue),Ue=null),n)return;const e=Nt;Nt=null,e.length&&ds(()=>Eh(e),!1)}function Ah(n){for(let e=0;e<n.length;e++)ai(n[e])}function Qm(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:ai(r)}for(e=0;e<t;e++)ai(n[e])}function ci(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const s=r.state;s===ln?r!==e&&(!r.updatedAt||r.updatedAt<Di)&&ai(r):s===ii&&ci(r,e)}}}function Sh(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=ii,t.pure?Ue.push(t):Nt.push(t),t.observers&&Sh(t))}}function Kr(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),s=t.observers;if(s&&s.length){const i=s.pop(),a=t.observerSlots.pop();r<s.length&&(i.sourceSlots[a]=r,s[r]=i,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)Kr(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)Kr(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Jm(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function Rh(n,e=be){throw Jm(n)}const Ym=Symbol("fallback");function Il(n){for(let e=0;e<n.length;e++)n[e]()}function Xm(n,e,t={}){let r=[],s=[],i=[],a=0,c=e.length>1?[]:null;return oi(()=>Il(i)),()=>{let u=n()||[],h=u.length,f,p;return u[zm],ht(()=>{let A,C,N,x,M,V,B,U,Z;if(h===0)a!==0&&(Il(i),i=[],r=[],s=[],a=0,c&&(c=[])),t.fallback&&(r=[Ym],s[0]=Gs(j=>(i[0]=j,t.fallback())),a=1);else if(a===0){for(s=new Array(h),p=0;p<h;p++)r[p]=u[p],s[p]=Gs(E);a=h}else{for(N=new Array(h),x=new Array(h),c&&(M=new Array(h)),V=0,B=Math.min(a,h);V<B&&r[V]===u[V];V++);for(B=a-1,U=h-1;B>=V&&U>=V&&r[B]===u[U];B--,U--)N[U]=s[B],x[U]=i[B],c&&(M[U]=c[B]);for(A=new Map,C=new Array(U+1),p=U;p>=V;p--)Z=u[p],f=A.get(Z),C[p]=f===void 0?-1:f,A.set(Z,p);for(f=V;f<=B;f++)Z=r[f],p=A.get(Z),p!==void 0&&p!==-1?(N[p]=s[f],x[p]=i[f],c&&(M[p]=c[f]),p=C[p],A.set(Z,p)):i[f]();for(p=V;p<h;p++)p in N?(s[p]=N[p],i[p]=x[p],c&&(c[p]=M[p],c[p](p))):s[p]=Gs(E);s=s.slice(0,a=h),r=u.slice(0)}return s});function E(A){if(i[p]=A,c){const[C,N]=X(p);return c[p]=N,e(u[p],C)}return e(u[p])}}}function D(n,e){return ht(()=>n(e||{}))}function Fs(){return!0}const zo={get(n,e,t){return e===ri?t:n.get(e)},has(n,e){return e===ri?!0:n.has(e)},set:Fs,deleteProperty:Fs,getOwnPropertyDescriptor(n,e){return{configurable:!0,enumerable:!0,get(){return n.get(e)},set:Fs,deleteProperty:Fs}},ownKeys(n){return n.keys()}};function Co(n){return(n=typeof n=="function"?n():n)?n:{}}function Zm(){for(let n=0,e=this.length;n<e;++n){const t=this[n]();if(t!==void 0)return t}}function Se(...n){let e=!1;for(let a=0;a<n.length;a++){const c=n[a];e=e||!!c&&ri in c,n[a]=typeof c=="function"?(e=!0,ct(c)):c}if(vh&&e)return new Proxy({get(a){for(let c=n.length-1;c>=0;c--){const u=Co(n[c])[a];if(u!==void 0)return u}},has(a){for(let c=n.length-1;c>=0;c--)if(a in Co(n[c]))return!0;return!1},keys(){const a=[];for(let c=0;c<n.length;c++)a.push(...Object.keys(Co(n[c])));return[...new Set(a)]}},zo);const t={},r=Object.create(null);for(let a=n.length-1;a>=0;a--){const c=n[a];if(!c)continue;const u=Object.getOwnPropertyNames(c);for(let h=u.length-1;h>=0;h--){const f=u[h];if(f==="__proto__"||f==="constructor")continue;const p=Object.getOwnPropertyDescriptor(c,f);if(!r[f])r[f]=p.get?{enumerable:!0,configurable:!0,get:Zm.bind(t[f]=[p.get.bind(c)])}:p.value!==void 0?p:void 0;else{const E=t[f];E&&(p.get?E.push(p.get.bind(c)):p.value!==void 0&&E.push(()=>p.value))}}}const s={},i=Object.keys(r);for(let a=i.length-1;a>=0;a--){const c=i[a],u=r[c];u&&u.get?Object.defineProperty(s,c,u):s[c]=u?u.value:void 0}return s}function Ch(n,...e){const t=e.length;if(vh&&ri in n){const s=t>1?e.flat():e[0],i=e.map(a=>new Proxy({get(c){return a.includes(c)?n[c]:void 0},has(c){return a.includes(c)&&c in n},keys(){return a.filter(c=>c in n)}},zo));return i.push(new Proxy({get(a){return s.includes(a)?void 0:n[a]},has(a){return s.includes(a)?!1:a in n},keys(){return Object.keys(n).filter(a=>!s.includes(a))}},zo)),i}const r=[];for(let s=0;s<=t;s++)r[s]={};for(const s of Object.getOwnPropertyNames(n)){let i=t;for(let u=0;u<e.length;u++)if(e[u].includes(s)){i=u;break}const a=Object.getOwnPropertyDescriptor(n,s);!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable?r[i][s]=a.value:Object.defineProperty(r[i],s,a)}return r}const ep=n=>`Stale read from <${n}>.`;function tp(n){const e="fallback"in n&&{fallback:()=>n.fallback};return ct(Xm(()=>n.each,n.children,e||void 0))}function Po(n){const e=n.keyed,t=ct(()=>n.when,void 0,void 0),r=e?t:ct(t,void 0,{equals:(s,i)=>!s==!i});return ct(()=>{const s=r();if(s){const i=n.children;return typeof i=="function"&&i.length>0?ht(()=>i(e?s:()=>{if(!ht(r))throw ep("Show");return t()})):i}return n.fallback},void 0,void 0)}const np=["allowfullscreen","async","alpha","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","adauctionheaders","browsingtopics","credentialless","defaultchecked","defaultmuted","defaultselected","defer","disablepictureinpicture","disableremoteplayback","preservespitch","shadowrootclonable","shadowrootcustomelementregistry","shadowrootdelegatesfocus","shadowrootserializable","sharedstoragewritable"],rp=new Set(["className","value","readOnly","noValidate","formNoValidate","isMap","noModule","playsInline","adAuctionHeaders","allowFullscreen","browsingTopics","defaultChecked","defaultMuted","defaultSelected","disablePictureInPicture","disableRemotePlayback","preservesPitch","shadowRootClonable","shadowRootCustomElementRegistry","shadowRootDelegatesFocus","shadowRootSerializable","sharedStorageWritable",...np]),sp=new Set(["innerHTML","textContent","innerText","children"]),ip=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),op=Object.assign(Object.create(null),{class:"className",novalidate:{$:"noValidate",FORM:1},formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1},adauctionheaders:{$:"adAuctionHeaders",IFRAME:1},allowfullscreen:{$:"allowFullscreen",IFRAME:1},browsingtopics:{$:"browsingTopics",IMG:1},defaultchecked:{$:"defaultChecked",INPUT:1},defaultmuted:{$:"defaultMuted",AUDIO:1,VIDEO:1},defaultselected:{$:"defaultSelected",OPTION:1},disablepictureinpicture:{$:"disablePictureInPicture",VIDEO:1},disableremoteplayback:{$:"disableRemotePlayback",AUDIO:1,VIDEO:1},preservespitch:{$:"preservesPitch",AUDIO:1,VIDEO:1},shadowrootclonable:{$:"shadowRootClonable",TEMPLATE:1},shadowrootdelegatesfocus:{$:"shadowRootDelegatesFocus",TEMPLATE:1},shadowrootserializable:{$:"shadowRootSerializable",TEMPLATE:1},sharedstoragewritable:{$:"sharedStorageWritable",IFRAME:1,IMG:1}});function ap(n,e){const t=op[n];return typeof t=="object"?t[e]?t.$:void 0:t}const cp=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),lp=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),up={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},se=n=>ct(()=>n());function hp(n,e,t){let r=t.length,s=e.length,i=r,a=0,c=0,u=e[s-1].nextSibling,h=null;for(;a<s||c<i;){if(e[a]===t[c]){a++,c++;continue}for(;e[s-1]===t[i-1];)s--,i--;if(s===a){const f=i<r?c?t[c-1].nextSibling:t[i-c]:u;for(;c<i;)n.insertBefore(t[c++],f)}else if(i===c)for(;a<s;)(!h||!h.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[i-1]&&t[c]===e[s-1]){const f=e[--s].nextSibling;n.insertBefore(t[c++],e[a++].nextSibling),n.insertBefore(t[--i],f),e[s]=t[i]}else{if(!h){h=new Map;let p=c;for(;p<i;)h.set(t[p],p++)}const f=h.get(e[a]);if(f!=null)if(c<f&&f<i){let p=a,E=1,A;for(;++p<s&&p<i&&!((A=h.get(e[p]))==null||A!==f+E);)E++;if(E>f-c){const C=e[a];for(;c<f;)n.insertBefore(t[c++],C)}else n.replaceChild(t[c++],e[a++])}else a++;else e[a++].remove()}}}const bl="_$DX_DELEGATE";function dp(n,e,t,r={}){let s;return Gs(i=>{s=i,e===document?n():P(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{s(),e.textContent=""}}function z(n,e,t,r){let s;const i=()=>{const c=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return c.innerHTML=n,t?c.content.firstChild.firstChild:r?c.firstChild:c.content.firstChild},a=e?()=>ht(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return a.cloneNode=a,a}function un(n,e=window.document){const t=e[bl]||(e[bl]=new Set);for(let r=0,s=n.length;r<s;r++){const i=n[r];t.has(i)||(t.add(i),e.addEventListener(i,vp))}}function ie(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function fp(n,e,t,r){r==null?n.removeAttributeNS(e,t):n.setAttributeNS(e,t,r)}function mp(n,e,t){t?n.setAttribute(e,""):n.removeAttribute(e)}function va(n,e){e==null?n.removeAttribute("class"):n.className=e}function Ea(n,e,t,r){if(r)Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t;else if(Array.isArray(t)){const s=t[0];n.addEventListener(e,t[0]=i=>s.call(n,t[1],i))}else n.addEventListener(e,t,typeof t!="function"&&t)}function or(n,e,t={}){const r=Object.keys(e||{}),s=Object.keys(t);let i,a;for(i=0,a=s.length;i<a;i++){const c=s[i];!c||c==="undefined"||e[c]||(Al(n,c,!1),delete t[c])}for(i=0,a=r.length;i<a;i++){const c=r[i],u=!!e[c];!c||c==="undefined"||t[c]===u||!u||(Al(n,c,!0),t[c]=u)}return t}function pp(n,e,t){if(!e)return t?ie(n,"style"):e;const r=n.style;if(typeof e=="string")return r.cssText=e;typeof t=="string"&&(r.cssText=t=void 0),t||(t={}),e||(e={});let s,i;for(i in t)e[i]==null&&r.removeProperty(i),delete t[i];for(i in e)s=e[i],s!==t[i]&&(r.setProperty(i,s),t[i]=s);return t}function Ph(n,e={},t,r){const s={};return r||Q(()=>s.children=Qr(n,e.children,s.children)),Q(()=>typeof e.ref=="function"&&gp(e.ref,n)),Q(()=>_p(n,e,t,!0,s,!0)),s}function gp(n,e,t){return ht(()=>n(e,t))}function P(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return Qr(n,e,r,t);Q(s=>Qr(n,e(),s,t),r)}function _p(n,e,t,r,s={},i=!1){e||(e={});for(const a in s)if(!(a in e)){if(a==="children")continue;s[a]=Sl(n,a,null,s[a],t,i,e)}for(const a in e){if(a==="children")continue;const c=e[a];s[a]=Sl(n,a,c,s[a],t,i,e)}}function yp(n){return n.toLowerCase().replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}function Al(n,e,t){const r=e.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)n.classList.toggle(r[s],t)}function Sl(n,e,t,r,s,i,a){let c,u,h,f,p;if(e==="style")return pp(n,t,r);if(e==="classList")return or(n,t,r);if(t===r)return r;if(e==="ref")i||t(n);else if(e.slice(0,3)==="on:"){const E=e.slice(3);r&&n.removeEventListener(E,r,typeof r!="function"&&r),t&&n.addEventListener(E,t,typeof t!="function"&&t)}else if(e.slice(0,10)==="oncapture:"){const E=e.slice(10);r&&n.removeEventListener(E,r,!0),t&&n.addEventListener(E,t,!0)}else if(e.slice(0,2)==="on"){const E=e.slice(2).toLowerCase(),A=cp.has(E);if(!A&&r){const C=Array.isArray(r)?r[0]:r;n.removeEventListener(E,C)}(A||t)&&(Ea(n,E,t,A),A&&un([E]))}else if(e.slice(0,5)==="attr:")ie(n,e.slice(5),t);else if(e.slice(0,5)==="bool:")mp(n,e.slice(5),t);else if((p=e.slice(0,5)==="prop:")||(h=sp.has(e))||!s&&((f=ap(e,n.tagName))||(u=rp.has(e)))||(c=n.nodeName.includes("-")||"is"in a))p&&(e=e.slice(5),u=!0),e==="class"||e==="className"?va(n,t):c&&!u&&!h?n[yp(e)]=t:n[f||e]=t;else{const E=s&&e.indexOf(":")>-1&&up[e.split(":")[0]];E?fp(n,E,e,t):ie(n,ip[e]||e,t)}return t}function vp(n){let e=n.target;const t=`$$${n.type}`,r=n.target,s=n.currentTarget,i=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const h=e[`${t}Data`];if(h!==void 0?u.call(e,h,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&i(e.host),!0},c=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();i(u[0]);for(let h=0;h<u.length-2&&(e=u[h],!!a());h++){if(e._$host){e=e._$host,c();break}if(e.parentNode===s)break}}else c();i(r)}function Qr(n,e,t,r,s){for(;typeof t=="function";)t=t();if(e===t)return t;const i=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,i==="string"||i==="number"){if(i==="number"&&(e=e.toString(),e===t))return t;if(a){let c=t[0];c&&c.nodeType===3?c.data!==e&&(c.data=e):c=document.createTextNode(e),t=jn(n,t,r,c)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||i==="boolean")t=jn(n,t,r);else{if(i==="function")return Q(()=>{let c=e();for(;typeof c=="function";)c=c();t=Qr(n,c,t,r)}),()=>t;if(Array.isArray(e)){const c=[],u=t&&Array.isArray(t);if(Ho(c,e,t,s))return Q(()=>t=Qr(n,c,t,r,!0)),()=>t;if(c.length===0){if(t=jn(n,t,r),a)return t}else u?t.length===0?Rl(n,c,r):hp(n,t,c):(t&&jn(n),Rl(n,c));t=c}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=jn(n,t,r,e);jn(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function Ho(n,e,t,r){let s=!1;for(let i=0,a=e.length;i<a;i++){let c=e[i],u=t&&t[n.length],h;if(!(c==null||c===!0||c===!1))if((h=typeof c)=="object"&&c.nodeType)n.push(c);else if(Array.isArray(c))s=Ho(n,c,u)||s;else if(h==="function")if(r){for(;typeof c=="function";)c=c();s=Ho(n,Array.isArray(c)?c:[c],Array.isArray(u)?u:[u])||s}else n.push(c),s=!0;else{const f=String(c);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return s}function Rl(n,e,t=null){for(let r=0,s=e.length;r<s;r++)n.insertBefore(e[r],t)}function jn(n,e,t,r){if(t===void 0)return n.textContent="";const s=r||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const c=e[a];if(s!==c){const u=c.parentNode===n;!i&&!a?u?n.replaceChild(s,c):n.insertBefore(s,t):u&&c.remove()}else i=!0}}else n.insertBefore(s,t);return[s]}const Ep="http://www.w3.org/2000/svg";function wp(n,e=!1,t=void 0){return e?document.createElementNS(Ep,n):document.createElement(n,{is:t})}function Tp(n,e){const t=ct(n);return ct(()=>{const r=t();switch(typeof r){case"function":return ht(()=>r(e));case"string":const s=lp.has(r),i=wp(r,s,ht(()=>e.is));return Ph(i,e,s),i}})}function Ip(n){const[,e]=Ch(n,["component"]);return Tp(()=>n.component,e)}/**
* @license lucide-solid v0.475.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var bp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},qn=bp,Ap=z("<svg>"),Sp=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Rp=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim(),Cp=n=>{const[e,t]=Ch(n,["color","size","strokeWidth","children","class","name","iconNode","absoluteStrokeWidth"]);return(()=>{var r=Ap();return Ph(r,Se(qn,{get width(){return e.size??qn.width},get height(){return e.size??qn.height},get stroke(){return e.color??qn.stroke},get"stroke-width"(){return se(()=>!!e.absoluteStrokeWidth)()?Number(e.strokeWidth??qn["stroke-width"])*24/Number(e.size):Number(e.strokeWidth??qn["stroke-width"])},get class(){return Rp("lucide","lucide-icon",e.name!=null?`lucide-${Sp(e?.name)}`:void 0,e.class!=null?e.class:"")}},t),!0,!0),P(r,D(tp,{get each(){return e.iconNode},children:([s,i])=>D(Ip,Se({component:s},i))})),r})()},De=Cp,Pp=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],kp=n=>D(De,Se(n,{name:"Activity",iconNode:Pp})),kh=kp,xp=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],Np=n=>D(De,Se(n,{name:"CalendarClock",iconNode:xp})),Cl=Np,Dp=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Vp=n=>D(De,Se(n,{name:"Camera",iconNode:Dp})),Pl=Vp,Op=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Mp=n=>D(De,Se(n,{name:"ChartColumn",iconNode:Op})),wa=Mp,Lp=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],$p=n=>D(De,Se(n,{name:"Check",iconNode:Lp})),xh=$p,Fp=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Up=n=>D(De,Se(n,{name:"ChevronRight",iconNode:Fp})),kl=Up,Bp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],jp=n=>D(De,Se(n,{name:"CircleAlert",iconNode:Bp})),Nh=jp,qp=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],zp=n=>D(De,Se(n,{name:"Eye",iconNode:qp})),Hp=zp,Gp=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],Wp=n=>D(De,Se(n,{name:"FileJson",iconNode:Gp})),Go=Wp,Kp=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Qp=n=>D(De,Se(n,{name:"FileText",iconNode:Kp})),Jp=Qp,Yp=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Xp=n=>D(De,Se(n,{name:"LogOut",iconNode:Yp})),Zp=Xp,eg=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],tg=n=>D(De,Se(n,{name:"Mail",iconNode:eg})),ng=tg,rg=[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]],sg=n=>D(De,Se(n,{name:"Mic",iconNode:rg})),xl=sg,ig=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],og=n=>D(De,Se(n,{name:"Plus",iconNode:ig})),ag=og,cg=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],lg=n=>D(De,Se(n,{name:"RefreshCcw",iconNode:cg})),Vi=lg,ug=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],hg=n=>D(De,Se(n,{name:"Trash2",iconNode:ug})),Nl=hg,dg=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],fg=n=>D(De,Se(n,{name:"Utensils",iconNode:dg})),Jr=fg;const mg=()=>{};var Dl={};/**
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
 */const Dh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},pg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Vh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,A=h&63;u||(A=64,a||(E=64)),r.push(t[f],t[p],t[E],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):pg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new gg;const E=i<<2|c>>4;if(r.push(E),h!==64){const A=c<<4&240|h>>2;if(r.push(A),p!==64){const C=h<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class gg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _g=function(n){const e=Dh(n);return Vh.encodeByteArray(e,!0)},Oh=function(n){return _g(n).replace(/\./g,"")},Mh=function(n){try{return Vh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function yg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const vg=()=>yg().__FIREBASE_DEFAULTS__,Eg=()=>{if(typeof process>"u"||typeof Dl>"u")return;const n=Dl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},wg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mh(n[1]);return e&&JSON.parse(e)},Oi=()=>{try{return mg()||vg()||Eg()||wg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lh=n=>Oi()?.emulatorHosts?.[n],Tg=n=>{const e=Lh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},$h=()=>Oi()?.config,Fh=n=>Oi()?.[`_${n}`];/**
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
 */class Ig{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Be())}function Ag(){const n=Oi()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Rg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pg(){const n=Be();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function kg(){return!Ag()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function xg(){try{return typeof indexedDB=="object"}catch{return!1}}function Ng(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Dg="FirebaseError";class ft extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Dg,Object.setPrototypeOf(this,ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Vg(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new ft(s,c,r)}}function Vg(n,e){return n.replace(Og,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Og=/\{\$([^}]+)}/g;function Mg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Cn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Vl(i)&&Vl(a)){if(!Cn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Vl(n){return n!==null&&typeof n=="object"}/**
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
 */function ms(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Mr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Lr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Lg(n,e){const t=new $g(n,e);return t.subscribe.bind(t)}class $g{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Fg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ko),s.error===void 0&&(s.error=ko),s.complete===void 0&&(s.complete=ko);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ko(){}/**
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
 */function Re(n){return n&&n._delegate?n._delegate:n}/**
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
 */function Vn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ta(n){return(await fetch(n,{credentials:"include"})).ok}class en{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Ug{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ig;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jg(e))try{this.getOrInitializeService({instanceIdentifier:En})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=En){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=En){return this.instances.has(e)}getOptions(e=En){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Bg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=En){return this.component?this.component.multipleInstances?e:En:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Bg(n){return n===En?void 0:n}function jg(n){return n.instantiationMode==="EAGER"}/**
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
 */class qg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ug(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const zg={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},Hg=ne.INFO,Gg={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},Wg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Gg[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ia{constructor(e){this.name=e,this._logLevel=Hg,this._logHandler=Wg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const Kg=(n,e)=>e.some(t=>n instanceof t);let Ol,Ml;function Qg(){return Ol||(Ol=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jg(){return Ml||(Ml=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Uh=new WeakMap,Wo=new WeakMap,Bh=new WeakMap,xo=new WeakMap,ba=new WeakMap;function Yg(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Jt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Uh.set(t,n)}).catch(()=>{}),ba.set(e,n),e}function Xg(n){if(Wo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Wo.set(n,e)}let Ko={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Bh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Jt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Zg(n){Ko=n(Ko)}function e_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(No(this),e,...t);return Bh.set(r,e.sort?e.sort():[e]),Jt(r)}:Jg().includes(n)?function(...e){return n.apply(No(this),e),Jt(Uh.get(this))}:function(...e){return Jt(n.apply(No(this),e))}}function t_(n){return typeof n=="function"?e_(n):(n instanceof IDBTransaction&&Xg(n),Kg(n,Qg())?new Proxy(n,Ko):n)}function Jt(n){if(n instanceof IDBRequest)return Yg(n);if(xo.has(n))return xo.get(n);const e=t_(n);return e!==n&&(xo.set(n,e),ba.set(e,n)),e}const No=n=>ba.get(n);function n_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Jt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Jt(a.result),u.oldVersion,u.newVersion,Jt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const r_=["get","getKey","getAll","getAllKeys","count"],s_=["put","add","delete","clear"],Do=new Map;function Ll(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Do.get(e))return Do.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=s_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||r_.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Do.set(e,i),i}Zg(n=>({...n,get:(e,t,r)=>Ll(e,t)||n.get(e,t,r),has:(e,t)=>!!Ll(e,t)||n.has(e,t)}));/**
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
 */class i_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(o_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function o_(n){return n.getComponent()?.type==="VERSION"}const Qo="@firebase/app",$l="0.14.13";/**
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
 */const Ot=new Ia("@firebase/app"),a_="@firebase/app-compat",c_="@firebase/analytics-compat",l_="@firebase/analytics",u_="@firebase/app-check-compat",h_="@firebase/app-check",d_="@firebase/auth",f_="@firebase/auth-compat",m_="@firebase/database",p_="@firebase/data-connect",g_="@firebase/database-compat",__="@firebase/functions",y_="@firebase/functions-compat",v_="@firebase/installations",E_="@firebase/installations-compat",w_="@firebase/messaging",T_="@firebase/messaging-compat",I_="@firebase/performance",b_="@firebase/performance-compat",A_="@firebase/remote-config",S_="@firebase/remote-config-compat",R_="@firebase/storage",C_="@firebase/storage-compat",P_="@firebase/firestore",k_="@firebase/ai",x_="@firebase/firestore-compat",N_="firebase",D_="12.14.0";/**
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
 */const Jo="[DEFAULT]",V_={[Qo]:"fire-core",[a_]:"fire-core-compat",[l_]:"fire-analytics",[c_]:"fire-analytics-compat",[h_]:"fire-app-check",[u_]:"fire-app-check-compat",[d_]:"fire-auth",[f_]:"fire-auth-compat",[m_]:"fire-rtdb",[p_]:"fire-data-connect",[g_]:"fire-rtdb-compat",[__]:"fire-fn",[y_]:"fire-fn-compat",[v_]:"fire-iid",[E_]:"fire-iid-compat",[w_]:"fire-fcm",[T_]:"fire-fcm-compat",[I_]:"fire-perf",[b_]:"fire-perf-compat",[A_]:"fire-rc",[S_]:"fire-rc-compat",[R_]:"fire-gcs",[C_]:"fire-gcs-compat",[P_]:"fire-fst",[x_]:"fire-fst-compat",[k_]:"fire-vertex","fire-js":"fire-js",[N_]:"fire-js-all"};/**
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
 */const Yr=new Map,O_=new Map,Yo=new Map;function Fl(n,e){try{n.container.addComponent(e)}catch(t){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Pn(n){const e=n.name;if(Yo.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;Yo.set(e,n);for(const t of Yr.values())Fl(t,n);for(const t of O_.values())Fl(t,n);return!0}function Mi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const M_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Yt=new fs("app","Firebase",M_);/**
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
 */class L_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new en("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Yt.create("app-deleted",{appName:this._name})}}/**
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
 */const ar=D_;function jh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Jo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Yt.create("bad-app-name",{appName:String(s)});if(t||(t=$h()),!t)throw Yt.create("no-options");const i=Yr.get(s);if(i){if(Cn(t,i.options)&&Cn(r,i.config))return i;throw Yt.create("duplicate-app",{appName:s})}const a=new qg(s);for(const u of Yo.values())a.addComponent(u);const c=new L_(t,r,a);return Yr.set(s,c),c}function Aa(n=Jo){const e=Yr.get(n);if(!e&&n===Jo&&$h())return jh();if(!e)throw Yt.create("no-app",{appName:n});return e}function $_(){return Array.from(Yr.values())}function vt(n,e,t){let r=V_[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(a.join(" "));return}Pn(new en(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const F_="firebase-heartbeat-database",U_=1,Xr="firebase-heartbeat-store";let Vo=null;function qh(){return Vo||(Vo=n_(F_,U_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Xr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Yt.create("idb-open",{originalErrorMessage:n.message})})),Vo}async function B_(n){try{const t=(await qh()).transaction(Xr),r=await t.objectStore(Xr).get(zh(n));return await t.done,r}catch(e){if(e instanceof ft)Ot.warn(e.message);else{const t=Yt.create("idb-get",{originalErrorMessage:e?.message});Ot.warn(t.message)}}}async function Ul(n,e){try{const r=(await qh()).transaction(Xr,"readwrite");await r.objectStore(Xr).put(e,zh(n)),await r.done}catch(t){if(t instanceof ft)Ot.warn(t.message);else{const r=Yt.create("idb-set",{originalErrorMessage:t?.message});Ot.warn(r.message)}}}function zh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const j_=1024,q_=30;class z_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new G_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Bl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>q_){const s=W_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ot.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Bl(),{heartbeatsToSend:t,unsentEntries:r}=H_(this._heartbeatsCache.heartbeats),s=Oh(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ot.warn(e),""}}}function Bl(){return new Date().toISOString().substring(0,10)}function H_(n,e=j_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),jl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),jl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class G_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return xg()?Ng().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await B_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ul(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ul(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function jl(n){return Oh(JSON.stringify({version:2,heartbeats:n})).length}function W_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function K_(n){Pn(new en("platform-logger",e=>new i_(e),"PRIVATE")),Pn(new en("heartbeat",e=>new z_(e),"PRIVATE")),vt(Qo,$l,n),vt(Qo,$l,"esm2020"),vt("fire-js","")}K_("");function Hh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Q_=Hh,Gh=new fs("auth","Firebase",Hh());/**
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
 */const li=new Ia("@firebase/auth");function J_(n,...e){li.logLevel<=ne.WARN&&li.warn(`Auth (${ar}): ${n}`,...e)}function Ws(n,...e){li.logLevel<=ne.ERROR&&li.error(`Auth (${ar}): ${n}`,...e)}/**
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
 */function rt(n,...e){throw Ra(n,...e)}function lt(n,...e){return Ra(n,...e)}function Sa(n,e,t){const r={...Q_(),[e]:t};return new fs("auth","Firebase",r).create(e,{appName:n.name})}function Dt(n){return Sa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Y_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&rt(n,"argument-error"),Sa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ra(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Gh.create(n,...e)}function H(n,e,...t){if(!n)throw Ra(e,...t)}function Pt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ws(e),new Error(e)}function Mt(n,e){n||Pt(e)}/**
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
 */function Xo(){return typeof self<"u"&&self.location?.href||""}function X_(){return ql()==="http:"||ql()==="https:"}function ql(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Z_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(X_()||Rg()||"connection"in navigator)?navigator.onLine:!0}function ey(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ps{constructor(e,t){this.shortDelay=e,this.longDelay=t,Mt(t>e,"Short delay should be less than long delay!"),this.isMobile=bg()||Cg()}get(){return Z_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ca(n,e){Mt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Wh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ty={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ny=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ry=new ps(3e4,6e4);function hn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function dn(n,e,t,r,s={}){return Kh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ms({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return Sg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Vn(n.emulatorConfig.host)&&(h.credentials="include"),Wh.fetch()(await Qh(n,n.config.apiHost,t,c),h)})}async function Kh(n,e,t){n._canInitEmulator=!1;const r={...ty,...e};try{const s=new iy(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Us(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Us(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Us(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Us(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Sa(n,f,h);rt(n,f)}}catch(s){if(s instanceof ft)throw s;rt(n,"network-request-failed",{message:String(s)})}}async function gs(n,e,t,r,s={}){const i=await dn(n,e,t,r,s);return"mfaPendingCredential"in i&&rt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Qh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Ca(n.config,s):`${n.config.apiScheme}://${s}`;return ny.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function sy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class iy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(lt(this.auth,"network-request-failed")),ry.get())})}}function Us(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=lt(n,e,r);return s.customData._tokenResponse=t,s}function zl(n){return n!==void 0&&n.enterprise!==void 0}class oy{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return sy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ay(n,e){return dn(n,"GET","/v2/recaptchaConfig",hn(n,e))}/**
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
 */async function cy(n,e){return dn(n,"POST","/v1/accounts:delete",e)}async function ui(n,e){return dn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function qr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ly(n,e=!1){const t=Re(n),r=await t.getIdToken(e),s=Pa(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:qr(Oo(s.auth_time)),issuedAtTime:qr(Oo(s.iat)),expirationTime:qr(Oo(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Oo(n){return Number(n)*1e3}function Pa(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ws("JWT malformed, contained fewer than 3 sections"),null;try{const s=Mh(t);return s?JSON.parse(s):(Ws("Failed to decode base64 JWT payload"),null)}catch(s){return Ws("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Hl(n){const e=Pa(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Zr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ft&&uy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function uy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class hy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Zo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qr(this.lastLoginAt),this.creationTime=qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function hi(n){const e=n.auth,t=await n.getIdToken(),r=await Zr(n,ui(e,{idToken:t}));H(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Jh(s.providerUserInfo):[],a=fy(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Zo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function dy(n){const e=Re(n);await hi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fy(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Jh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function my(n,e){const t=await Kh(n,{},async()=>{const r=ms({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Qh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Vn(n.emulatorConfig.host)&&(u.credentials="include"),Wh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function py(n,e){return dn(n,"POST","/v2/accounts:revokeToken",hn(n,e))}/**
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
 */class Kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=Hl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await my(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Kn;return r&&(H(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Kn,this.toJSON())}_performRefresh(){return Pt("not implemented")}}/**
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
 */function Gt(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ot{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new hy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Zo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Zr(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ly(this,e)}reload(){return dy(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ot({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await hi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(Dt(this.auth));const e=await this.getIdToken();return await Zr(this,cy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:E,isAnonymous:A,providerData:C,stsTokenManager:N}=t;H(p&&N,e,"internal-error");const x=Kn.fromJSON(this.name,N);H(typeof p=="string",e,"internal-error"),Gt(r,e.name),Gt(s,e.name),H(typeof E=="boolean",e,"internal-error"),H(typeof A=="boolean",e,"internal-error"),Gt(i,e.name),Gt(a,e.name),Gt(c,e.name),Gt(u,e.name),Gt(h,e.name),Gt(f,e.name);const M=new ot({uid:p,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:A,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:x,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&(M.providerData=C.map(V=>({...V}))),u&&(M._redirectEventId=u),M}static async _fromIdTokenResponse(e,t,r=!1){const s=new Kn;s.updateFromServerResponse(t);const i=new ot({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await hi(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Jh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Kn;c.updateFromIdToken(r);const u=new ot({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Zo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
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
 */const Gl=new Map;function kt(n){Mt(n instanceof Function,"Expected a class definition");let e=Gl.get(n);return e?(Mt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Gl.set(n,e),e)}/**
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
 */class Yh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Yh.type="NONE";const Wl=Yh;/**
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
 */function Ks(n,e,t){return`firebase:${n}:${e}:${t}`}class Qn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ks(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ks("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ui(this.auth,{idToken:e}).catch(()=>{});return t?ot._fromGetAccountInfoResponse(this.auth,t,e):null}return ot._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Qn(kt(Wl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||kt(Wl);const a=Ks(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const E=await ui(e,{idToken:f}).catch(()=>{});if(!E)break;p=await ot._fromGetAccountInfoResponse(e,E,f)}else p=ot._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Qn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Qn(i,e,r))}}/**
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
 */function Kl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(td(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rd(e))return"Blackberry";if(sd(e))return"Webos";if(Zh(e))return"Safari";if((e.includes("chrome/")||ed(e))&&!e.includes("edge/"))return"Chrome";if(nd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Xh(n=Be()){return/firefox\//i.test(n)}function Zh(n=Be()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ed(n=Be()){return/crios\//i.test(n)}function td(n=Be()){return/iemobile/i.test(n)}function nd(n=Be()){return/android/i.test(n)}function rd(n=Be()){return/blackberry/i.test(n)}function sd(n=Be()){return/webos/i.test(n)}function ka(n=Be()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gy(n=Be()){return ka(n)&&!!window.navigator?.standalone}function _y(){return Pg()&&document.documentMode===10}function id(n=Be()){return ka(n)||nd(n)||sd(n)||rd(n)||/windows phone/i.test(n)||td(n)}/**
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
 */function od(n,e=[]){let t;switch(n){case"Browser":t=Kl(Be());break;case"Worker":t=`${Kl(Be())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
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
 */class yy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function vy(n,e={}){return dn(n,"GET","/v2/passwordPolicy",hn(n,e))}/**
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
 */const Ey=6;class wy{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ey,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Ty{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ql(this),this.idTokenSubscription=new Ql(this),this.beforeStateQueue=new yy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Qn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ui(this,{idToken:e}),r=await ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Qe(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await hi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ey()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(Dt(this));const t=e?Re(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(Dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(Dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await vy(this),t=new wy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await py(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await Qn.create(this,[kt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=od(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&J_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fn(n){return Re(n)}class Ql{constructor(e){this.auth=e,this.observer=null,this.addObserver=Lg(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Li={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Iy(n){Li=n}function ad(n){return Li.loadJS(n)}function by(){return Li.recaptchaEnterpriseScript}function Ay(){return Li.gapiScript}function Sy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Ry{constructor(){this.enterprise=new Cy}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Cy{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Py="recaptcha-enterprise",cd="NO_RECAPTCHA";class ky{constructor(e){this.type=Py,this.auth=fn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{ay(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new oy(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;zl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(cd)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ry().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&zl(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=by();u.length!==0&&(u+=c),ad(u).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function Jl(n,e,t,r=!1,s=!1){const i=new ky(n);let a;if(s)a=cd;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function ea(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Jl(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Jl(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
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
 */function xy(n,e){const t=Mi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Cn(i,e??{}))return s;rt(s,"already-initialized")}return t.initialize({options:e})}function Ny(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(kt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Dy(n,e,t){const r=fn(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ld(e),{host:a,port:c}=Vy(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Cn(h,r.config.emulator)&&Cn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Vn(a)?Ta(`${i}//${a}${u}`):Oy()}function ld(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Vy(n){const e=ld(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Yl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Yl(a)}}}function Yl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Oy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class xa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pt("not implemented")}_getIdTokenResponse(e){return Pt("not implemented")}_linkToIdToken(e,t){return Pt("not implemented")}_getReauthenticationResolver(e){return Pt("not implemented")}}async function My(n,e){return dn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Ly(n,e){return gs(n,"POST","/v1/accounts:signInWithPassword",hn(n,e))}/**
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
 */async function $y(n,e){return gs(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}async function Fy(n,e){return gs(n,"POST","/v1/accounts:signInWithEmailLink",hn(n,e))}/**
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
 */class es extends xa{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new es(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new es(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ea(e,t,"signInWithPassword",Ly);case"emailLink":return $y(e,{email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ea(e,r,"signUpPassword",My);case"emailLink":return Fy(e,{idToken:t,email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Jn(n,e){return gs(n,"POST","/v1/accounts:signInWithIdp",hn(n,e))}/**
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
 */const Uy="http://localhost";class kn extends xa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new kn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new kn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Jn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Jn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Jn(e,t)}buildRequest(){const e={requestUri:Uy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ms(t)}return e}}/**
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
 */function By(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jy(n){const e=Mr(Lr(n)).link,t=e?Mr(Lr(e)).deep_link_id:null,r=Mr(Lr(n)).deep_link_id;return(r?Mr(Lr(r)).link:null)||r||t||e||n}class Na{constructor(e){const t=Mr(Lr(e)),r=t.apiKey??null,s=t.oobCode??null,i=By(t.mode??null);H(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=jy(e);try{return new Na(t)}catch{return null}}}/**
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
 */class cr{constructor(){this.providerId=cr.PROVIDER_ID}static credential(e,t){return es._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Na.parseLink(t);return H(r,"argument-error"),es._fromEmailAndCode(e,r.code,r.tenantId)}}cr.PROVIDER_ID="password";cr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";cr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Da{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class _s extends Da{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Wt extends _s{constructor(){super("facebook.com")}static credential(e){return kn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";/**
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
 */class Ct extends _s{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return kn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ct.credential(t,r)}catch{return null}}}Ct.GOOGLE_SIGN_IN_METHOD="google.com";Ct.PROVIDER_ID="google.com";/**
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
 */class Kt extends _s{constructor(){super("github.com")}static credential(e){return kn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.GITHUB_SIGN_IN_METHOD="github.com";Kt.PROVIDER_ID="github.com";/**
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
 */class Qt extends _s{constructor(){super("twitter.com")}static credential(e,t){return kn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Qt.credential(t,r)}catch{return null}}}Qt.TWITTER_SIGN_IN_METHOD="twitter.com";Qt.PROVIDER_ID="twitter.com";/**
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
 */async function qy(n,e){return gs(n,"POST","/v1/accounts:signUp",hn(n,e))}/**
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
 */class xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ot._fromIdTokenResponse(e,r,s),a=Xl(r);return new xn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Xl(r);return new xn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Xl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class di extends ft{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,di.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new di(e,t,r,s)}}function ud(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?di._fromErrorAndOperation(n,i,e,r):i})}async function zy(n,e,t=!1){const r=await Zr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xn._forOperation(n,"link",r)}/**
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
 */async function Hy(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(Dt(r));const s="reauthenticate";try{const i=await Zr(n,ud(r,s,e,n),t);H(i.idToken,r,"internal-error");const a=Pa(i.idToken);H(a,r,"internal-error");const{sub:c}=a;return H(n.uid===c,r,"user-mismatch"),xn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&rt(r,"user-mismatch"),i}}/**
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
 */async function hd(n,e,t=!1){if(Qe(n.app))return Promise.reject(Dt(n));const r="signIn",s=await ud(n,r,e),i=await xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Gy(n,e){return hd(fn(n),e)}/**
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
 */async function dd(n){const e=fn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Wy(n,e,t){if(Qe(n.app))return Promise.reject(Dt(n));const r=fn(n),a=await ea(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",qy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&dd(n),u}),c=await xn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function Zl(n,e,t){return Qe(n.app)?Promise.reject(Dt(n)):Gy(Re(n),cr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&dd(n),r})}function Ky(n,e,t,r){return Re(n).onIdTokenChanged(e,t,r)}function Qy(n,e,t){return Re(n).beforeAuthStateChanged(e,t)}function Jy(n,e,t,r){return Re(n).onAuthStateChanged(e,t,r)}function Yy(n){return Re(n).signOut()}const fi="__sak";/**
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
 */class fd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fi,"1"),this.storage.removeItem(fi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Xy=1e3,Zy=10;class md extends fd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=id(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);_y()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Zy):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Xy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}md.type="LOCAL";const ev=md;/**
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
 */class pd extends fd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}pd.type="SESSION";const gd=pd;/**
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
 */function tv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class $i{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new $i(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),u=await tv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$i.receivers=[];/**
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
 */function Va(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class nv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=Va("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const E=p;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Et(){return window}function rv(n){Et().location.href=n}/**
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
 */function _d(){return typeof Et().WorkerGlobalScope<"u"&&typeof Et().importScripts=="function"}async function sv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iv(){return navigator?.serviceWorker?.controller||null}function ov(){return _d()?self:null}/**
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
 */const yd="firebaseLocalStorageDb",av=1,mi="firebaseLocalStorage",vd="fbase_key";class ys{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Fi(n,e){return n.transaction([mi],e?"readwrite":"readonly").objectStore(mi)}function cv(){const n=indexedDB.deleteDatabase(yd);return new ys(n).toPromise()}function Ed(){const n=indexedDB.open(yd,av);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(mi,{keyPath:vd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(mi)?e(r):(r.close(),await cv(),e(await Ed()))})})}async function eu(n,e,t){const r=Fi(n,!0).put({[vd]:e,value:t});return new ys(r).toPromise()}async function lv(n,e){const t=Fi(n,!1).get(e),r=await new ys(t).toPromise();return r===void 0?null:r.value}function tu(n,e){const t=Fi(n,!0).delete(e);return new ys(t).toPromise()}const uv=800,hv=3;class wd{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Ed(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return _d()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$i._getInstance(ov()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await sv(),!this.activeServiceWorker)return;this.sender=new nv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await eu(e,fi,"1"),await tu(e,fi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>eu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>lv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Fi(s,!1).getAll();return new ys(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}wd.type="LOCAL";const dv=wd;new ps(3e4,6e4);/**
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
 */function Td(n,e){return e?kt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Oa extends xa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fv(n){return hd(n.auth,new Oa(n),n.bypassAuthState)}function mv(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),Hy(t,new Oa(n),n.bypassAuthState)}async function pv(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),zy(t,new Oa(n),n.bypassAuthState)}/**
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
 */class Id{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fv;case"linkViaPopup":case"linkViaRedirect":return pv;case"reauthViaPopup":case"reauthViaRedirect":return mv;default:rt(this.auth,"internal-error")}}resolve(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const gv=new ps(2e3,1e4);async function _v(n,e,t){if(Qe(n.app))return Promise.reject(lt(n,"operation-not-supported-in-this-environment"));const r=fn(n);Y_(n,e,Da);const s=Td(r,t);return new wn(r,"signInViaPopup",e,s).executeNotNull()}class wn extends Id{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,wn.currentPopupAction&&wn.currentPopupAction.cancel(),wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Mt(this.filter.length===1,"Popup operations only handle one event");const e=Va();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gv.get())};e()}}wn.currentPopupAction=null;/**
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
 */const yv="pendingRedirect",Qs=new Map;class vv extends Id{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Qs.get(this.auth._key());if(!e){try{const r=await Ev(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Qs.set(this.auth._key(),e)}return this.bypassAuthState||Qs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ev(n,e){const t=Iv(e),r=Tv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function wv(n,e){Qs.set(n._key(),e)}function Tv(n){return kt(n._redirectPersistence)}function Iv(n){return Ks(yv,n.config.apiKey,n.name)}async function bv(n,e,t=!1){if(Qe(n.app))return Promise.reject(Dt(n));const r=fn(n),s=Td(r,e),a=await new vv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Av=600*1e3;class Sv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Rv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!bd(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(lt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Av&&this.cachedEventUids.clear(),this.cachedEventUids.has(nu(e))}saveEventToCache(e){this.cachedEventUids.add(nu(e)),this.lastProcessedEventTime=Date.now()}}function nu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function bd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Rv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bd(n);default:return!1}}/**
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
 */async function Cv(n,e={}){return dn(n,"GET","/v1/projects",e)}/**
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
 */const Pv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kv=/^https?/;async function xv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cv(n);for(const t of e)try{if(Nv(t))return}catch{}rt(n,"unauthorized-domain")}function Nv(n){const e=Xo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!kv.test(t))return!1;if(Pv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Dv=new ps(3e4,6e4);function ru(){const n=Et().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Vv(n){return new Promise((e,t)=>{function r(){ru(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ru(),t(lt(n,"network-request-failed"))},timeout:Dv.get()})}if(Et().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Et().gapi?.load)r();else{const s=Sy("iframefcb");return Et()[s]=()=>{gapi.load?r():t(lt(n,"network-request-failed"))},ad(`${Ay()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Js=null,e})}let Js=null;function Ov(n){return Js=Js||Vv(n),Js}/**
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
 */const Mv=new ps(5e3,15e3),Lv="__/auth/iframe",$v="emulator/auth/iframe",Fv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Uv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bv(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ca(e,$v):`https://${n.config.authDomain}/${Lv}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=Uv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ms(r).slice(1)}`}async function jv(n){const e=await Ov(n),t=Et().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:Bv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=lt(n,"network-request-failed"),c=Et().setTimeout(()=>{i(a)},Mv.get());function u(){Et().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const qv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zv=500,Hv=600,Gv="_blank",Wv="http://localhost";class su{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Kv(n,e,t,r=zv,s=Hv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...qv,width:r.toString(),height:s.toString(),top:i,left:a},h=Be().toLowerCase();t&&(c=ed(h)?Gv:t),Xh(h)&&(e=e||Wv,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[A,C])=>`${E}${A}=${C},`,"");if(gy(h)&&c!=="_self")return Qv(e||"",c),new su(null);const p=window.open(e||"",c,f);H(p,n,"popup-blocked");try{p.focus()}catch{}return new su(p)}function Qv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Jv="__/auth/handler",Yv="emulator/auth/handler",Xv=encodeURIComponent("fac");async function iu(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof Da){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Mg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof _s){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Xv}=${encodeURIComponent(u)}`:"";return`${Zv(n)}?${ms(c).slice(1)}${h}`}function Zv({config:n}){return n.emulator?Ca(n,Yv):`https://${n.authDomain}/${Jv}`}/**
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
 */const Mo="webStorageSupport";class eE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gd,this._completeRedirectFn=bv,this._overrideRedirectResult=wv}async _openPopup(e,t,r,s){Mt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await iu(e,t,r,Xo(),s);return Kv(e,i,Va())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await iu(e,t,r,Xo(),s);return rv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Mt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await jv(e),r=new Sv(e);return t.register("authEvent",s=>(H(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Mo,{type:Mo},s=>{const i=s?.[0]?.[Mo];i!==void 0&&t(!!i),rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=xv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return id()||Zh()||ka()}}const tE=eE;var ou="@firebase/auth",au="1.13.2";/**
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
 */class nE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function rE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sE(n){Pn(new en("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:od(n)},h=new Ty(r,s,i,u);return Ny(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Pn(new en("auth-internal",e=>{const t=fn(e.getProvider("auth").getImmediate());return(r=>new nE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(ou,au,rE(n)),vt(ou,au,"esm2020")}/**
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
 */const iE=300,oE=Fh("authIdTokenMaxAge")||iE;let cu=null;const aE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>oE)return;const s=t?.token;cu!==s&&(cu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function cE(n=Aa()){const e=Mi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=xy(n,{popupRedirectResolver:tE,persistence:[dv,ev,gd]}),r=Fh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=aE(i.toString());Qy(t,a,()=>a(t.currentUser)),Ky(t,c=>a(c))}}const s=Lh("auth");return s&&Dy(t,`http://${s}`),t}function lE(){return document.getElementsByTagName("head")?.[0]??document}Iy({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=lt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",lE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sE("Browser");var uE="firebase",hE="12.14.0";/**
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
 */vt(uE,hE,"app");var lu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xt,Ad;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,_){function y(){}y.prototype=_.prototype,v.F=_.prototype,v.prototype=new y,v.prototype.constructor=v,v.D=function(I,w,T){for(var g=Array(arguments.length-2),F=2;F<arguments.length;F++)g[F-2]=arguments[F];return _.prototype[w].apply(I,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,_,y){y||(y=0);const I=Array(16);if(typeof _=="string")for(var w=0;w<16;++w)I[w]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(w=0;w<16;++w)I[w]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=v.g[0],y=v.g[1],w=v.g[2];let T=v.g[3],g;g=_+(T^y&(w^T))+I[0]+3614090360&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(w^_&(y^w))+I[1]+3905402710&4294967295,T=_+(g<<12&4294967295|g>>>20),g=w+(y^T&(_^y))+I[2]+606105819&4294967295,w=T+(g<<17&4294967295|g>>>15),g=y+(_^w&(T^_))+I[3]+3250441966&4294967295,y=w+(g<<22&4294967295|g>>>10),g=_+(T^y&(w^T))+I[4]+4118548399&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(w^_&(y^w))+I[5]+1200080426&4294967295,T=_+(g<<12&4294967295|g>>>20),g=w+(y^T&(_^y))+I[6]+2821735955&4294967295,w=T+(g<<17&4294967295|g>>>15),g=y+(_^w&(T^_))+I[7]+4249261313&4294967295,y=w+(g<<22&4294967295|g>>>10),g=_+(T^y&(w^T))+I[8]+1770035416&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(w^_&(y^w))+I[9]+2336552879&4294967295,T=_+(g<<12&4294967295|g>>>20),g=w+(y^T&(_^y))+I[10]+4294925233&4294967295,w=T+(g<<17&4294967295|g>>>15),g=y+(_^w&(T^_))+I[11]+2304563134&4294967295,y=w+(g<<22&4294967295|g>>>10),g=_+(T^y&(w^T))+I[12]+1804603682&4294967295,_=y+(g<<7&4294967295|g>>>25),g=T+(w^_&(y^w))+I[13]+4254626195&4294967295,T=_+(g<<12&4294967295|g>>>20),g=w+(y^T&(_^y))+I[14]+2792965006&4294967295,w=T+(g<<17&4294967295|g>>>15),g=y+(_^w&(T^_))+I[15]+1236535329&4294967295,y=w+(g<<22&4294967295|g>>>10),g=_+(w^T&(y^w))+I[1]+4129170786&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^w&(_^y))+I[6]+3225465664&4294967295,T=_+(g<<9&4294967295|g>>>23),g=w+(_^y&(T^_))+I[11]+643717713&4294967295,w=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(w^T))+I[0]+3921069994&4294967295,y=w+(g<<20&4294967295|g>>>12),g=_+(w^T&(y^w))+I[5]+3593408605&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^w&(_^y))+I[10]+38016083&4294967295,T=_+(g<<9&4294967295|g>>>23),g=w+(_^y&(T^_))+I[15]+3634488961&4294967295,w=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(w^T))+I[4]+3889429448&4294967295,y=w+(g<<20&4294967295|g>>>12),g=_+(w^T&(y^w))+I[9]+568446438&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^w&(_^y))+I[14]+3275163606&4294967295,T=_+(g<<9&4294967295|g>>>23),g=w+(_^y&(T^_))+I[3]+4107603335&4294967295,w=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(w^T))+I[8]+1163531501&4294967295,y=w+(g<<20&4294967295|g>>>12),g=_+(w^T&(y^w))+I[13]+2850285829&4294967295,_=y+(g<<5&4294967295|g>>>27),g=T+(y^w&(_^y))+I[2]+4243563512&4294967295,T=_+(g<<9&4294967295|g>>>23),g=w+(_^y&(T^_))+I[7]+1735328473&4294967295,w=T+(g<<14&4294967295|g>>>18),g=y+(T^_&(w^T))+I[12]+2368359562&4294967295,y=w+(g<<20&4294967295|g>>>12),g=_+(y^w^T)+I[5]+4294588738&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^w)+I[8]+2272392833&4294967295,T=_+(g<<11&4294967295|g>>>21),g=w+(T^_^y)+I[11]+1839030562&4294967295,w=T+(g<<16&4294967295|g>>>16),g=y+(w^T^_)+I[14]+4259657740&4294967295,y=w+(g<<23&4294967295|g>>>9),g=_+(y^w^T)+I[1]+2763975236&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^w)+I[4]+1272893353&4294967295,T=_+(g<<11&4294967295|g>>>21),g=w+(T^_^y)+I[7]+4139469664&4294967295,w=T+(g<<16&4294967295|g>>>16),g=y+(w^T^_)+I[10]+3200236656&4294967295,y=w+(g<<23&4294967295|g>>>9),g=_+(y^w^T)+I[13]+681279174&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^w)+I[0]+3936430074&4294967295,T=_+(g<<11&4294967295|g>>>21),g=w+(T^_^y)+I[3]+3572445317&4294967295,w=T+(g<<16&4294967295|g>>>16),g=y+(w^T^_)+I[6]+76029189&4294967295,y=w+(g<<23&4294967295|g>>>9),g=_+(y^w^T)+I[9]+3654602809&4294967295,_=y+(g<<4&4294967295|g>>>28),g=T+(_^y^w)+I[12]+3873151461&4294967295,T=_+(g<<11&4294967295|g>>>21),g=w+(T^_^y)+I[15]+530742520&4294967295,w=T+(g<<16&4294967295|g>>>16),g=y+(w^T^_)+I[2]+3299628645&4294967295,y=w+(g<<23&4294967295|g>>>9),g=_+(w^(y|~T))+I[0]+4096336452&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~w))+I[7]+1126891415&4294967295,T=_+(g<<10&4294967295|g>>>22),g=w+(_^(T|~y))+I[14]+2878612391&4294967295,w=T+(g<<15&4294967295|g>>>17),g=y+(T^(w|~_))+I[5]+4237533241&4294967295,y=w+(g<<21&4294967295|g>>>11),g=_+(w^(y|~T))+I[12]+1700485571&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~w))+I[3]+2399980690&4294967295,T=_+(g<<10&4294967295|g>>>22),g=w+(_^(T|~y))+I[10]+4293915773&4294967295,w=T+(g<<15&4294967295|g>>>17),g=y+(T^(w|~_))+I[1]+2240044497&4294967295,y=w+(g<<21&4294967295|g>>>11),g=_+(w^(y|~T))+I[8]+1873313359&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~w))+I[15]+4264355552&4294967295,T=_+(g<<10&4294967295|g>>>22),g=w+(_^(T|~y))+I[6]+2734768916&4294967295,w=T+(g<<15&4294967295|g>>>17),g=y+(T^(w|~_))+I[13]+1309151649&4294967295,y=w+(g<<21&4294967295|g>>>11),g=_+(w^(y|~T))+I[4]+4149444226&4294967295,_=y+(g<<6&4294967295|g>>>26),g=T+(y^(_|~w))+I[11]+3174756917&4294967295,T=_+(g<<10&4294967295|g>>>22),g=w+(_^(T|~y))+I[2]+718787259&4294967295,w=T+(g<<15&4294967295|g>>>17),g=y+(T^(w|~_))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+_&4294967295,v.g[1]=v.g[1]+(w+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+w&4294967295,v.g[3]=v.g[3]+T&4294967295}r.prototype.v=function(v,_){_===void 0&&(_=v.length);const y=_-this.blockSize,I=this.C;let w=this.h,T=0;for(;T<_;){if(w==0)for(;T<=y;)s(this,v,T),T+=this.blockSize;if(typeof v=="string"){for(;T<_;)if(I[w++]=v.charCodeAt(T++),w==this.blockSize){s(this,I),w=0;break}}else for(;T<_;)if(I[w++]=v[T++],w==this.blockSize){s(this,I),w=0;break}}this.h=w,this.o+=_},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var _=1;_<v.length-8;++_)v[_]=0;_=this.o*8;for(var y=v.length-8;y<v.length;++y)v[y]=_&255,_/=256;for(this.v(v),v=Array(16),_=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)v[_++]=this.g[y]>>>I&255;return v};function i(v,_){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=_(v)}function a(v,_){this.h=_;const y=[];let I=!0;for(let w=v.length-1;w>=0;w--){const T=v[w]|0;I&&T==_||(y[w]=T,I=!1)}this.g=y}var c={};function u(v){return-128<=v&&v<128?i(v,function(_){return new a([_|0],_<0?-1:0)}):new a([v|0],v<0?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return x(h(-v));const _=[];let y=1;for(let I=0;v>=y;I++)_[I]=v/y|0,y*=4294967296;return new a(_,0)}function f(v,_){if(v.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(v.charAt(0)=="-")return x(f(v.substring(1),_));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(_,8));let I=p;for(let T=0;T<v.length;T+=8){var w=Math.min(8,v.length-T);const g=parseInt(v.substring(T,T+w),_);w<8?(w=h(Math.pow(_,w)),I=I.j(w).add(h(g))):(I=I.j(y),I=I.add(h(g)))}return I}var p=u(0),E=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-x(this).m();let v=0,_=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);v+=(I>=0?I:4294967296+I)*_,_*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(N(this))return"-"+x(this).toString(v);const _=h(Math.pow(v,6));var y=this;let I="";for(;;){const w=U(y,_).g;y=M(y,w.j(_));let T=((y.g.length>0?y.g[0]:y.h)>>>0).toString(v);if(y=w,C(y))return T+I;for(;T.length<6;)T="0"+T;I=T+I}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(let _=0;_<v.g.length;_++)if(v.g[_]!=0)return!1;return!0}function N(v){return v.h==-1}n.l=function(v){return v=M(this,v),N(v)?-1:C(v)?0:1};function x(v){const _=v.g.length,y=[];for(let I=0;I<_;I++)y[I]=~v.g[I];return new a(y,~v.h).add(E)}n.abs=function(){return N(this)?x(this):this},n.add=function(v){const _=Math.max(this.g.length,v.g.length),y=[];let I=0;for(let w=0;w<=_;w++){let T=I+(this.i(w)&65535)+(v.i(w)&65535),g=(T>>>16)+(this.i(w)>>>16)+(v.i(w)>>>16);I=g>>>16,T&=65535,g&=65535,y[w]=g<<16|T}return new a(y,y[y.length-1]&-2147483648?-1:0)};function M(v,_){return v.add(x(_))}n.j=function(v){if(C(this)||C(v))return p;if(N(this))return N(v)?x(this).j(x(v)):x(x(this).j(v));if(N(v))return x(this.j(x(v)));if(this.l(A)<0&&v.l(A)<0)return h(this.m()*v.m());const _=this.g.length+v.g.length,y=[];for(var I=0;I<2*_;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let w=0;w<v.g.length;w++){const T=this.i(I)>>>16,g=this.i(I)&65535,F=v.i(w)>>>16,W=v.i(w)&65535;y[2*I+2*w]+=g*W,V(y,2*I+2*w),y[2*I+2*w+1]+=T*W,V(y,2*I+2*w+1),y[2*I+2*w+1]+=g*F,V(y,2*I+2*w+1),y[2*I+2*w+2]+=T*F,V(y,2*I+2*w+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new a(y,0)};function V(v,_){for(;(v[_]&65535)!=v[_];)v[_+1]+=v[_]>>>16,v[_]&=65535,_++}function B(v,_){this.g=v,this.h=_}function U(v,_){if(C(_))throw Error("division by zero");if(C(v))return new B(p,p);if(N(v))return _=U(x(v),_),new B(x(_.g),x(_.h));if(N(_))return _=U(v,x(_)),new B(x(_.g),_.h);if(v.g.length>30){if(N(v)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var y=E,I=_;I.l(v)<=0;)y=Z(y),I=Z(I);var w=j(y,1),T=j(I,1);for(I=j(I,2),y=j(y,2);!C(I);){var g=T.add(I);g.l(v)<=0&&(w=w.add(y),T=g),I=j(I,1),y=j(y,1)}return _=M(v,w.j(_)),new B(w,_)}for(w=p;v.l(_)>=0;){for(y=Math.max(1,Math.floor(v.m()/_.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),T=h(y),g=T.j(_);N(g)||g.l(v)>0;)y-=I,T=h(y),g=T.j(_);C(T)&&(T=E),w=w.add(T),v=M(v,g)}return new B(w,v)}n.B=function(v){return U(this,v).h},n.and=function(v){const _=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<_;I++)y[I]=this.i(I)&v.i(I);return new a(y,this.h&v.h)},n.or=function(v){const _=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<_;I++)y[I]=this.i(I)|v.i(I);return new a(y,this.h|v.h)},n.xor=function(v){const _=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<_;I++)y[I]=this.i(I)^v.i(I);return new a(y,this.h^v.h)};function Z(v){const _=v.g.length+1,y=[];for(let I=0;I<_;I++)y[I]=v.i(I)<<1|v.i(I-1)>>>31;return new a(y,v.h)}function j(v,_){const y=_>>5;_%=32;const I=v.g.length-y,w=[];for(let T=0;T<I;T++)w[T]=_>0?v.i(T+y)>>>_|v.i(T+y+1)<<32-_:v.i(T+y);return new a(w,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Ad=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Xt=a}).apply(typeof lu<"u"?lu:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sd,$r,Rd,Ys,ta,Cd,Pd,kd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in d))break e;d=d[b]}o=o[o.length-1],m=d[o],l=l(m),l!=m&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=u,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,b,S){for(var O=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)O[Y-2]=arguments[Y];return l.prototype[b].apply(m,O)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function A(o){const l=o.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=o[m];return d}return[]}function C(o,l){for(let m=1;m<arguments.length;m++){const b=arguments[m];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=o.length||0;const S=b.length||0;o.length=d+S;for(let O=0;O<S;O++)o[d+O]=b[O]}else o.push(b)}}class N{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(o){a.setTimeout(()=>{throw o},0)}function M(){var o=v;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class V{constructor(){this.h=this.g=null}add(l,d){const m=B.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var B=new N(()=>new U,o=>o.reset());class U{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Z,j=!1,v=new V,_=()=>{const o=Promise.resolve(void 0);Z=()=>{o.then(y)}};function y(){for(var o;o=M();){try{o.h.call(o.g)}catch(d){x(d)}var l=B;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}j=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var T=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function F(o,l){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(F,w),F.prototype.init=function(o,l){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&F.Z.h.call(this)},F.prototype.h=function(){F.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var W="closure_listenable_"+(Math.random()*1e6|0),Ve=0;function Oe(o,l,d,m,b){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=b,this.key=++Ve,this.da=this.fa=!1}function Ye(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ge(o,l,d){for(const m in o)l.call(d,o[m],m,o)}function Ze(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function et(o){const l={};for(const d in o)l[d]=o[d];return l}const mt="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function je(o,l){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)o[d]=m[d];for(let S=0;S<mt.length;S++)d=mt[S],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function ye(o){this.src=o,this.g={},this.h=0}ye.prototype.add=function(o,l,d,m,b){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const O=Me(o,l,m,b);return O>-1?(l=o[O],d||(l.fa=!1)):(l=new Oe(l,this.src,S,!!m,b),l.fa=d,o.push(l)),l};function me(o,l){const d=l.type;if(d in o.g){var m=o.g[d],b=Array.prototype.indexOf.call(m,l,void 0),S;(S=b>=0)&&Array.prototype.splice.call(m,b,1),S&&(Ye(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Me(o,l,d,m){for(let b=0;b<o.length;++b){const S=o[b];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==m)return b}return-1}var st="closure_lm_"+(Math.random()*1e6|0),pt={};function mr(o,l,d,m,b){if(Array.isArray(l)){for(let S=0;S<l.length;S++)mr(o,l[S],d,m,b);return null}return d=Cc(d),o&&o[W]?o.J(l,d,c(m)?!!m.capture:!1,b):co(o,l,d,!1,m,b)}function co(o,l,d,m,b,S){if(!l)throw Error("Invalid event type");const O=c(b)?!!b.capture:!!b;let Y=it(o);if(Y||(o[st]=Y=new ye(o)),d=Y.add(l,d,m,O,S),d.proxy)return d;if(m=As(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)T||(b=O),b===void 0&&(b=!1),o.addEventListener(l.toString(),m,b);else if(o.attachEvent)o.attachEvent(gr(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function As(){function o(d){return l.call(o.src,o.listener,d)}const l=he;return o}function Ss(o,l,d,m,b){if(Array.isArray(l))for(var S=0;S<l.length;S++)Ss(o,l[S],d,m,b);else m=c(m)?!!m.capture:!!m,d=Cc(d),o&&o[W]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],d=Me(l,d,m,b),d>-1&&(Ye(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=it(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Me(l,d,m,b)),(d=o>-1?l[o]:null)&&pr(d))}function pr(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[W])me(l.i,o);else{var d=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(d,m,o.capture):l.detachEvent?l.detachEvent(gr(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=it(l))?(me(d,o),d.h==0&&(d.src=null,l[st]=null)):Ye(o)}}}function gr(o){return o in pt?pt[o]:pt[o]="on"+o}function he(o,l){if(o.da)o=!0;else{l=new F(l,this);const d=o.listener,m=o.ha||o.src;o.fa&&pr(o),o=d.call(m,l)}return o}function it(o){return o=o[st],o instanceof ye?o:null}var _r="__closure_events_fn_"+(Math.random()*1e9>>>0);function Cc(o){return typeof o=="function"?o:(o[_r]||(o[_r]=function(l){return o.handleEvent(l)}),o[_r])}function Le(){I.call(this),this.i=new ye(this),this.M=this,this.G=null}p(Le,I),Le.prototype[W]=!0,Le.prototype.removeEventListener=function(o,l,d,m){Ss(this,o,l,d,m)};function qe(o,l){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new w(l,o);else if(l instanceof w)l.target=l.target||o;else{var b=l;l=new w(m,o),je(l,b)}b=!0;let S,O;if(d)for(O=d.length-1;O>=0;O--)S=l.g=d[O],b=Rs(S,m,!0,l)&&b;if(S=l.g=o,b=Rs(S,m,!0,l)&&b,b=Rs(S,m,!1,l)&&b,d)for(O=0;O<d.length;O++)S=l.g=d[O],b=Rs(S,m,!1,l)&&b}Le.prototype.N=function(){if(Le.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let m=0;m<d.length;m++)Ye(d[m]);delete o.g[l],o.h--}}this.G=null},Le.prototype.J=function(o,l,d,m){return this.i.add(String(o),l,!1,d,m)},Le.prototype.K=function(o,l,d,m){return this.i.add(String(o),l,!0,d,m)};function Rs(o,l,d,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let S=0;S<l.length;++S){const O=l[S];if(O&&!O.da&&O.capture==d){const Y=O.listener,Te=O.ha||O.src;O.fa&&me(o.i,O),b=Y.call(Te,m)!==!1&&b}}return b&&!m.defaultPrevented}function gm(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Pc(o){o.g=gm(()=>{o.g=null,o.i&&(o.i=!1,Pc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class _m extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Pc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yr(o){I.call(this),this.h=o,this.g={}}p(yr,I);var kc=[];function xc(o){Ge(o.g,function(l,d){this.g.hasOwnProperty(d)&&pr(l)},o),o.g={}}yr.prototype.N=function(){yr.Z.N.call(this),xc(this)},yr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lo=a.JSON.stringify,ym=a.JSON.parse,vm=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Nc(){}function Dc(){}var vr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function uo(){w.call(this,"d")}p(uo,w);function ho(){w.call(this,"c")}p(ho,w);var pn={},Vc=null;function Cs(){return Vc=Vc||new Le}pn.Ia="serverreachability";function Oc(o){w.call(this,pn.Ia,o)}p(Oc,w);function Er(o){const l=Cs();qe(l,new Oc(l))}pn.STAT_EVENT="statevent";function Mc(o,l){w.call(this,pn.STAT_EVENT,o),this.stat=l}p(Mc,w);function ze(o){const l=Cs();qe(l,new Mc(l,o))}pn.Ja="timingevent";function Lc(o,l){w.call(this,pn.Ja,o),this.size=l}p(Lc,w);function wr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Tr(){this.g=!0}Tr.prototype.ua=function(){this.g=!1};function Em(o,l,d,m,b,S){o.info(function(){if(o.g)if(S){var O="",Y=S.split("&");for(let ae=0;ae<Y.length;ae++){var Te=Y[ae].split("=");if(Te.length>1){const Ce=Te[0];Te=Te[1];const _t=Ce.split("_");O=_t.length>=2&&_t[1]=="type"?O+(Ce+"="+Te+"&"):O+(Ce+"=redacted&")}}}else O=null;else O=S;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+l+`
`+d+`
`+O})}function wm(o,l,d,m,b,S,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+l+`
`+d+`
`+S+" "+O})}function Fn(o,l,d,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Im(o,d)+(m?" "+m:"")})}function Tm(o,l){o.info(function(){return"TIMEOUT: "+l})}Tr.prototype.info=function(){};function Im(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var b=m[0];if(b!="noop"&&b!="stop"&&b!="close")for(let O=1;O<m.length;O++)m[O]=""}}}}return lo(S)}catch{return l}}var Ps={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},$c={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Fc;function fo(){}p(fo,Nc),fo.prototype.g=function(){return new XMLHttpRequest},Fc=new fo;function Ir(o){return encodeURIComponent(String(o))}function bm(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function Ut(o,l,d,m){this.j=o,this.i=l,this.l=d,this.S=m||1,this.V=new yr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Uc}function Uc(){this.i=null,this.g="",this.h=!1}var Bc={},mo={};function po(o,l,d){o.M=1,o.A=xs(gt(l)),o.u=d,o.R=!0,jc(o,null)}function jc(o,l){o.F=Date.now(),ks(o),o.B=gt(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),tl(d.i,"t",m),o.C=0,d=o.j.L,o.h=new Uc,o.g=vl(o.j,d?l:null,!o.u),o.P>0&&(o.O=new _m(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,m=o.ba;var b="readystatechange";Array.isArray(b)||(b&&(kc[0]=b.toString()),b=kc);for(let S=0;S<b.length;S++){const O=mr(d,b[S],m||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.J?et(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),Er(),Em(o.i,o.v,o.B,o.l,o.S,o.u)}Ut.prototype.ba=function(o){o=o.target;const l=this.O;l&&qt(o)==3?l.j():this.Y(o)},Ut.prototype.Y=function(o){try{if(o==this.g)e:{const Y=qt(this.g),Te=this.g.ya(),ae=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||cl(this.g)))){this.K||Y!=4||Te==7||(Te==8||ae<=0?Er(3):Er(2)),go(this);var l=this.g.ca();this.X=l;var d=Am(this);if(this.o=l==200,wm(this.i,this.v,this.B,this.l,this.S,Y,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,b=this.g;if((m=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(m)){var S=m;break t}}S=null}if(o=S)Fn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,_o(this,o);else{this.o=!1,this.m=3,ze(12),gn(this),br(this);break e}}if(this.R){o=!0;let Ce;for(;!this.K&&this.C<d.length;)if(Ce=Sm(this,d),Ce==mo){Y==4&&(this.m=4,ze(14),o=!1),Fn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ce==Bc){this.m=4,ze(15),Fn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Fn(this.i,this.l,Ce,null),_o(this,Ce);if(qc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||d.length!=0||this.h.h||(this.m=1,ze(16),o=!1),this.o=this.o&&o,!o)Fn(this.i,this.l,d,"[Invalid Chunked Response]"),gn(this),br(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Ao(O),O.P=!0,ze(11))}}else Fn(this.i,this.l,d,null),_o(this,d);Y==4&&gn(this),this.o&&!this.K&&(Y==4?pl(this.j,this):(this.o=!1,ks(this)))}else Um(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,ze(12)):(this.m=0,ze(13)),gn(this),br(this)}}}catch{}finally{}};function Am(o){if(!qc(o))return o.g.la();const l=cl(o.g);if(l==="")return"";let d="";const m=l.length,b=qt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return gn(o),br(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<m;S++)o.h.h=!0,d+=o.h.i.decode(l[S],{stream:!(b&&S==m-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function qc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Sm(o,l){var d=o.C,m=l.indexOf(`
`,d);return m==-1?mo:(d=Number(l.substring(d,m)),isNaN(d)?Bc:(m+=1,m+d>l.length?mo:(l=l.slice(m,m+d),o.C=m+d,l)))}Ut.prototype.cancel=function(){this.K=!0,gn(this)};function ks(o){o.T=Date.now()+o.H,zc(o,o.H)}function zc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=wr(h(o.aa,o),l)}function go(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ut.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Tm(this.i,this.B),this.M!=2&&(Er(),ze(17)),gn(this),this.m=2,br(this)):zc(this,this.T-o)};function br(o){o.j.I==0||o.K||pl(o.j,o)}function gn(o){go(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,xc(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function _o(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||yo(d.h,o))){if(!o.L&&yo(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Ms(d),Vs(d);else break e;bo(d),ze(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=wr(h(d.Va,d),6e3));Wc(d.h)<=1&&d.ta&&(d.ta=void 0)}else yn(d,11)}else if((o.L||d.g==o)&&Ms(d),!g(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let ae=b[l];const Ce=ae[0];if(!(Ce<=d.K))if(d.K=Ce,ae=ae[1],d.I==2)if(ae[0]=="c"){d.M=ae[1],d.ba=ae[2];const _t=ae[3];_t!=null&&(d.ka=_t,d.j.info("VER="+d.ka));const vn=ae[4];vn!=null&&(d.za=vn,d.j.info("SVER="+d.za));const zt=ae[5];zt!=null&&typeof zt=="number"&&zt>0&&(m=1.5*zt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Ht=o.g;if(Ht){const $s=Ht.g?Ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($s){var S=m.h;S.g||$s.indexOf("spdy")==-1&&$s.indexOf("quic")==-1&&$s.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(vo(S,S.h),S.h=null))}if(m.G){const So=Ht.g?Ht.g.getResponseHeader("X-HTTP-Session-Id"):null;So&&(m.wa=So,ue(m.J,m.G,So))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var O=o;if(m.na=yl(m,m.L?m.ba:null,m.W),O.L){Kc(m.h,O);var Y=O,Te=m.O;Te&&(Y.H=Te),Y.D&&(go(Y),ks(Y)),m.g=O}else fl(m);d.i.length>0&&Os(d)}else ae[0]!="stop"&&ae[0]!="close"||yn(d,7);else d.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?yn(d,7):Io(d):ae[0]!="noop"&&d.l&&d.l.qa(ae),d.A=0)}}Er(4)}catch{}}var Rm=class{constructor(o,l){this.g=o,this.map=l}};function Hc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Gc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Wc(o){return o.h?1:o.g?o.g.size:0}function yo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function vo(o,l){o.g?o.g.add(l):o.h=l}function Kc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Hc.prototype.cancel=function(){if(this.i=Qc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Qc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return A(o.i)}var Jc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cm(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let b,S=null;m>=0?(b=o[d].substring(0,m),S=o[d].substring(m+1)):b=o[d],l(b,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Bt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Bt?(this.l=o.l,Ar(this,o.j),this.o=o.o,this.g=o.g,Sr(this,o.u),this.h=o.h,Eo(this,nl(o.i)),this.m=o.m):o&&(l=String(o).match(Jc))?(this.l=!1,Ar(this,l[1]||"",!0),this.o=Rr(l[2]||""),this.g=Rr(l[3]||"",!0),Sr(this,l[4]),this.h=Rr(l[5]||"",!0),Eo(this,l[6]||"",!0),this.m=Rr(l[7]||"")):(this.l=!1,this.i=new Pr(null,this.l))}Bt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Cr(l,Yc,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Cr(l,Yc,!0),"@"),o.push(Ir(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Cr(d,d.charAt(0)=="/"?xm:km,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Cr(d,Dm)),o.join("")},Bt.prototype.resolve=function(o){const l=gt(this);let d=!!o.j;d?Ar(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var m=o.h;if(d)Sr(l,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var b=l.h.lastIndexOf("/");b!=-1&&(m=l.h.slice(0,b+1)+m)}if(b=m,b==".."||b==".")m="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){m=b.lastIndexOf("/",0)==0,b=b.split("/");const S=[];for(let O=0;O<b.length;){const Y=b[O++];Y=="."?m&&O==b.length&&S.push(""):Y==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),m&&O==b.length&&S.push("")):(S.push(Y),m=!0)}m=S.join("/")}else m=b}return d?l.h=m:d=o.i.toString()!=="",d?Eo(l,nl(o.i)):d=!!o.m,d&&(l.m=o.m),l};function gt(o){return new Bt(o)}function Ar(o,l,d){o.j=d?Rr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Sr(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Eo(o,l,d){l instanceof Pr?(o.i=l,Vm(o.i,o.l)):(d||(l=Cr(l,Nm)),o.i=new Pr(l,o.l))}function ue(o,l,d){o.i.set(l,d)}function xs(o){return ue(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Rr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Cr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Pm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Yc=/[#\/\?@]/g,km=/[#\?:]/g,xm=/[#\?]/g,Nm=/[#\?@]/g,Dm=/#/g;function Pr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function _n(o){o.g||(o.g=new Map,o.h=0,o.i&&Cm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Pr.prototype,n.add=function(o,l){_n(this),this.i=null,o=Un(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Xc(o,l){_n(o),l=Un(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Zc(o,l){return _n(o),l=Un(o,l),o.g.has(l)}n.forEach=function(o,l){_n(this),this.g.forEach(function(d,m){d.forEach(function(b){o.call(l,b,m,this)},this)},this)};function el(o,l){_n(o);let d=[];if(typeof l=="string")Zc(o,l)&&(d=d.concat(o.g.get(Un(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}n.set=function(o,l){return _n(this),this.i=null,o=Un(this,o),Zc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=el(this,o),o.length>0?String(o[0]):l):l};function tl(o,l,d){Xc(o,l),d.length>0&&(o.i=null,o.g.set(Un(o,l),A(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const b=Ir(d);d=el(this,d);for(let S=0;S<d.length;S++){let O=b;d[S]!==""&&(O+="="+Ir(d[S])),o.push(O)}}return this.i=o.join("&")};function nl(o){const l=new Pr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Un(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Vm(o,l){l&&!o.j&&(_n(o),o.i=null,o.g.forEach(function(d,m){const b=m.toLowerCase();m!=b&&(Xc(this,m),tl(this,b,d))},o)),o.j=l}function Om(o,l){const d=new Tr;if(a.Image){const m=new Image;m.onload=f(jt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(jt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(jt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(jt,d,"TestLoadImage: timeout",!1,l,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function Mm(o,l){const d=new Tr,m=new AbortController,b=setTimeout(()=>{m.abort(),jt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(S=>{clearTimeout(b),S.ok?jt(d,"TestPingServer: ok",!0,l):jt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),jt(d,"TestPingServer: error",!1,l)})}function jt(o,l,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function Lm(){this.g=new vm}function wo(o){this.i=o.Sb||null,this.h=o.ab||!1}p(wo,Nc),wo.prototype.g=function(){return new Ns(this.i,this.h)};function Ns(o,l){Le.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ns,Le),n=Ns.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,xr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,kr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,xr(this)),this.g&&(this.readyState=3,xr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;rl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function rl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?kr(this):xr(this),this.readyState==3&&rl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,kr(this))},n.Na=function(o){this.g&&(this.response=o,kr(this))},n.ga=function(){this.g&&kr(this)};function kr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,xr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function xr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ns.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function sl(o){let l="";return Ge(o,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function To(o,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=sl(d),typeof o=="string"?d!=null&&Ir(d):ue(o,l,d))}function fe(o){Le.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(fe,Le);var $m=/^https?$/i,Fm=["POST","PUT"];n=fe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Fc.g(),this.g.onreadystatechange=E(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){il(this,S);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),b=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Fm,l,void 0)>=0)||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){il(this,S)}};function il(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,ol(o),Ds(o)}function ol(o){o.A||(o.A=!0,qe(o,"complete"),qe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,qe(this,"complete"),qe(this,"abort"),Ds(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ds(this,!0)),fe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?al(this):this.Xa())},n.Xa=function(){al(this)};function al(o){if(o.h&&typeof i<"u"){if(o.v&&qt(o)==4)setTimeout(o.Ca.bind(o),0);else if(qe(o,"readystatechange"),qt(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=S===0){let O=String(o.D).match(Jc)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),m=!$m.test(O?O.toLowerCase():"")}d=m}if(d)qe(o,"complete"),qe(o,"success");else{o.o=6;try{var b=qt(o)>2?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.ca()+"]",ol(o)}}finally{Ds(o)}}}}function Ds(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||qe(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function qt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),ym(l)}};function cl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Um(o){const l={};o=(o.g&&qt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(g(o[m]))continue;var d=bm(o[m]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[b]||[];l[b]=S,S.push(d)}Ze(l,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function ll(o){this.za=0,this.i=[],this.j=new Tr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Nr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Nr("baseRetryDelayMs",5e3,o),this.Za=Nr("retryDelaySeedMs",1e4,o),this.Ta=Nr("forwardChannelMaxRetries",2,o),this.va=Nr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Hc(o&&o.concurrentRequestLimit),this.Ba=new Lm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ll.prototype,n.ka=8,n.I=1,n.connect=function(o,l,d,m){ze(0),this.W=o,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=yl(this,null,this.W),Os(this)};function Io(o){if(ul(o),o.I==3){var l=o.V++,d=gt(o.J);if(ue(d,"SID",o.M),ue(d,"RID",l),ue(d,"TYPE","terminate"),Dr(o,d),l=new Ut(o,o.j,l),l.M=2,l.A=xs(gt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=vl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ks(l)}_l(o)}function Vs(o){o.g&&(Ao(o),o.g.cancel(),o.g=null)}function ul(o){Vs(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ms(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Os(o){if(!Gc(o.h)&&!o.m){o.m=!0;var l=o.Ea;Z||_(),j||(Z(),j=!0),v.add(l,o),o.D=0}}function Bm(o,l){return Wc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=wr(h(o.Ea,o,l),gl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const b=new Ut(this,this.j,o);let S=this.o;if(this.U&&(S?(S=et(S),je(S,this.U)):S=this.U),this.u!==null||this.R||(b.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=dl(this,b,l),d=gt(this.J),ue(d,"RID",o),ue(d,"CVER",22),this.G&&ue(d,"X-HTTP-Session-Id",this.G),Dr(this,d),S&&(this.R?l="headers="+Ir(sl(S))+"&"+l:this.u&&To(d,this.u,S)),vo(this.h,b),this.Ra&&ue(d,"TYPE","init"),this.S?(ue(d,"$req",l),ue(d,"SID","null"),b.U=!0,po(b,d,null)):po(b,d,l),this.I=2}}else this.I==3&&(o?hl(this,o):this.i.length==0||Gc(this.h)||hl(this))};function hl(o,l){var d;l?d=l.l:d=o.V++;const m=gt(o.J);ue(m,"SID",o.M),ue(m,"RID",d),ue(m,"AID",o.K),Dr(o,m),o.u&&o.o&&To(m,o.u,o.o),d=new Ut(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=dl(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),vo(o.h,d),po(d,m,l)}function Dr(o,l){o.H&&Ge(o.H,function(d,m){ue(l,m,d)}),o.l&&Ge({},function(d,m){ue(l,m,d)})}function dl(o,l,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;e:{var b=o.i;let Y=-1;for(;;){const Te=["count="+d];Y==-1?d>0?(Y=b[0].g,Te.push("ofs="+Y)):Y=0:Te.push("ofs="+Y);let ae=!0;for(let Ce=0;Ce<d;Ce++){var S=b[Ce].g;const _t=b[Ce].map;if(S-=Y,S<0)Y=Math.max(0,b[Ce].g-100),ae=!1;else try{S="req"+S+"_"||"";try{var O=_t instanceof Map?_t:Object.entries(_t);for(const[vn,zt]of O){let Ht=zt;c(zt)&&(Ht=lo(zt)),Te.push(S+vn+"="+encodeURIComponent(Ht))}}catch(vn){throw Te.push(S+"type="+encodeURIComponent("_badmap")),vn}}catch{m&&m(_t)}}if(ae){O=Te.join("&");break e}}O=void 0}return o=o.i.splice(0,d),l.G=o,O}function fl(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;Z||_(),j||(Z(),j=!0),v.add(l,o),o.A=0}}function bo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=wr(h(o.Da,o),gl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,ml(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=wr(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ze(10),Vs(this),ml(this))};function Ao(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function ml(o){o.g=new Ut(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=gt(o.na);ue(l,"RID","rpc"),ue(l,"SID",o.M),ue(l,"AID",o.K),ue(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ue(l,"TO",o.ia),ue(l,"TYPE","xmlhttp"),Dr(o,l),o.u&&o.o&&To(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=xs(gt(l)),d.u=null,d.R=!0,jc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Vs(this),bo(this),ze(19))};function Ms(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function pl(o,l){var d=null;if(o.g==l){Ms(o),Ao(o),o.g=null;var m=2}else if(yo(o.h,l))d=l.G,Kc(o.h,l),m=1;else return;if(o.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=o.D;m=Cs(),qe(m,new Lc(m,d)),Os(o)}else fl(o);else if(b=l.m,b==3||b==0&&l.X>0||!(m==1&&Bm(o,l)||m==2&&bo(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),b){case 1:yn(o,5);break;case 4:yn(o,10);break;case 3:yn(o,6);break;default:yn(o,2)}}}function gl(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function yn(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),m=o.Ua;const b=!m;m=new Bt(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ar(m,"https"),xs(m),b?Om(m.toString(),d):Mm(m.toString(),d)}else ze(2);o.I=0,o.l&&o.l.pa(l),_l(o),ul(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),ze(2)):(this.j.info("Failed to ping google.com"),ze(1))};function _l(o){if(o.I=0,o.ja=[],o.l){const l=Qc(o.h);(l.length!=0||o.i.length!=0)&&(C(o.ja,l),C(o.ja,o.i),o.h.i.length=0,A(o.i),o.i.length=0),o.l.oa()}}function yl(o,l,d){var m=d instanceof Bt?gt(d):new Bt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Sr(m,m.u);else{var b=a.location;m=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const S=new Bt(null);m&&Ar(S,m),l&&(S.g=l),b&&Sr(S,b),d&&(S.h=d),m=S}return d=o.G,l=o.wa,d&&l&&ue(m,d,l),ue(m,"VER",o.ka),Dr(o,m),m}function vl(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new fe(new wo({ab:d})):new fe(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function El(){}n=El.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ls(){}Ls.prototype.g=function(o,l){return new Xe(o,l)};function Xe(o,l){Le.call(this),this.g=new ll(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!g(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Bn(this)}p(Xe,Le),Xe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Xe.prototype.close=function(){Io(this.g)},Xe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=lo(o),o=d);l.i.push(new Rm(l.Ya++,o)),l.I==3&&Os(l)},Xe.prototype.N=function(){this.g.l=null,delete this.j,Io(this.g),delete this.g,Xe.Z.N.call(this)};function wl(o){uo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(wl,uo);function Tl(){ho.call(this),this.status=1}p(Tl,ho);function Bn(o){this.g=o}p(Bn,El),Bn.prototype.ra=function(){qe(this.g,"a")},Bn.prototype.qa=function(o){qe(this.g,new wl(o))},Bn.prototype.pa=function(o){qe(this.g,new Tl)},Bn.prototype.oa=function(){qe(this.g,"b")},Ls.prototype.createWebChannel=Ls.prototype.g,Xe.prototype.send=Xe.prototype.o,Xe.prototype.open=Xe.prototype.m,Xe.prototype.close=Xe.prototype.close,kd=function(){return new Ls},Pd=function(){return Cs()},Cd=pn,ta={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ps.NO_ERROR=0,Ps.TIMEOUT=8,Ps.HTTP_ERROR=6,Ys=Ps,$c.COMPLETE="complete",Rd=$c,Dc.EventType=vr,vr.OPEN="a",vr.CLOSE="b",vr.ERROR="c",vr.MESSAGE="d",Le.prototype.listen=Le.prototype.J,$r=Dc,fe.prototype.listenOnce=fe.prototype.K,fe.prototype.getLastError=fe.prototype.Ha,fe.prototype.getLastErrorCode=fe.prototype.ya,fe.prototype.getStatus=fe.prototype.ca,fe.prototype.getResponseJson=fe.prototype.La,fe.prototype.getResponseText=fe.prototype.la,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Fa,Sd=fe}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */let lr="12.14.0";function dE(n){lr=n}/**
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
 */const Nn=new Ia("@firebase/firestore");function zn(){return Nn.logLevel}function L(n,...e){if(Nn.logLevel<=ne.DEBUG){const t=e.map(Ma);Nn.debug(`Firestore (${lr}): ${n}`,...t)}}function Lt(n,...e){if(Nn.logLevel<=ne.ERROR){const t=e.map(Ma);Nn.error(`Firestore (${lr}): ${n}`,...t)}}function Zn(n,...e){if(Nn.logLevel<=ne.WARN){const t=e.map(Ma);Nn.warn(`Firestore (${lr}): ${n}`,...t)}}function Ma(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function G(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,xd(n,r,t)}function xd(n,e,t){let r=`FIRESTORE (${lr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Lt(r),new Error(r)}function oe(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||xd(e,s,r)}function J(n,e){return n}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $ extends ft{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Vt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class fE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class mE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(We.UNAUTHENTICATED)))}shutdown(){}}class pE{constructor(e){this.t=e,this.currentUser=We.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){oe(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Vt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Vt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Vt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(oe(typeof r.accessToken=="string",31837,{l:r}),new fE(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oe(e===null||typeof e=="string",2055,{h:e}),new We(e)}}class gE{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=We.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class _E{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new gE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(We.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class uu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class yE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){oe(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new uu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(oe(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new uu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function vE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class La{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=vE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ee(n,e){return n<e?-1:n>e?1:0}function na(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Lo(s)===Lo(i)?ee(s,i):Lo(s)?1:-1}return ee(n.length,e.length)}const EE=55296,wE=57343;function Lo(n){const e=n.charCodeAt(0);return e>=EE&&e<=wE}function er(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */const hu="__name__";class yt{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&G(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return yt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof yt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=yt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ee(e.length,t.length)}static compareSegments(e,t){const r=yt.isNumericId(e),s=yt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?yt.extractNumericId(e).compare(yt.extractNumericId(t)):na(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Xt.fromString(e.substring(4,e.length-2))}}class le extends yt{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new $(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new le(t)}static emptyPath(){return new le([])}}const TE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xe extends yt{construct(e,t,r){return new xe(e,t,r)}static isValidIdentifier(e){return TE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===hu}static keyField(){return new xe([hu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new $(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new $(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new $(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new $(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new xe(t)}static emptyPath(){return new xe([])}}/**
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
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(le.fromString(e))}static fromName(e){return new q(le.fromString(e).popFirst(5))}static empty(){return new q(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return le.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new le(e.slice()))}}/**
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
 */function Nd(n,e,t){if(!t)throw new $(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function IE(n,e,t,r){if(e===!0&&r===!0)throw new $(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function du(n){if(!q.isDocumentKey(n))throw new $(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function fu(n){if(q.isDocumentKey(n))throw new $(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Dd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ui(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function wt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new $(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ui(n);throw new $(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function we(n,e){const t={typeString:n};return e&&(t.value=e),t}function vs(n,e){if(!Dd(n))throw new $(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new $(R.INVALID_ARGUMENT,t);return!0}/**
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
 */const mu=-62135596800,pu=1e6;class ce{static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*pu);return new ce(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new $(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new $(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<mu)throw new $(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pu}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(vs(e,ce._jsonSchema))return new ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-mu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ce._jsonSchemaVersion="firestore/timestamp/1.0",ce._jsonSchema={type:we("string",ce._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};/**
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
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new ce(0,0))}static max(){return new K(new ce(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ts=-1;function bE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(r===1e9?new ce(t+1,0):new ce(t,r));return new tn(s,q.empty(),e)}function AE(n){return new tn(n.readTime,n.key,ts)}class tn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new tn(K.min(),q.empty(),ts)}static max(){return new tn(K.max(),q.empty(),ts)}}function SE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
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
 */const RE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class CE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function ur(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==RE)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):k.reject(t)}static resolve(e){return new k(((t,r)=>{t(e)}))}static reject(e){return new k(((t,r)=>{r(e)}))}static waitFor(e){return new k(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next((s=>s?k.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new k(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new k(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function PE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function hr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Bi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Bi.ce=-1;/**
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
 */const $a=-1;function ji(n){return n==null}function pi(n){return n===0&&1/n==-1/0}function kE(n){return typeof n=="number"&&Number.isInteger(n)&&!pi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Vd="";function xE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=gu(e)),e=NE(n.get(t),e);return gu(e)}function NE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Vd:t+="";break;default:t+=i}}return t}function gu(n){return n+Vd+""}/**
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
 */function _u(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function On(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Od(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class de{constructor(e,t){this.comparator=e,this.root=t||ke.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ke.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new js(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new js(this.root,e,this.comparator,!1)}getReverseIterator(){return new js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new js(this.root,e,this.comparator,!0)}}class js{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ke{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??ke.RED,this.left=s??ke.EMPTY,this.right=i??ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new ke(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ke.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}ke.EMPTY=null,ke.RED=!0,ke.BLACK=!1;ke.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ae{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yu(this.data.getIterator())}getIteratorFrom(e){return new yu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class yu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class at{constructor(e){this.fields=e,e.sort(xe.comparator)}static empty(){return new at([])}unionWith(e){let t=new Ae(xe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new at(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return er(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class Md extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ne{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Md("Invalid base64 string: "+i):i}})(e);return new Ne(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new Ne(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ne.EMPTY_BYTE_STRING=new Ne("");const DE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nn(n){if(oe(!!n,39018),typeof n=="string"){let e=0;const t=DE.exec(n);if(oe(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function rn(n){return typeof n=="string"?Ne.fromBase64String(n):Ne.fromUint8Array(n)}/**
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
 */const Ld="server_timestamp",$d="__type__",Fd="__previous_value__",Ud="__local_write_time__";function Fa(n){return(n?.mapValue?.fields||{})[$d]?.stringValue===Ld}function qi(n){const e=n.mapValue.fields[Fd];return Fa(e)?qi(e):e}function ns(n){const e=nn(n.mapValue.fields[Ud].timestampValue);return new ce(e.seconds,e.nanos)}/**
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
 */class VE{constructor(e,t,r,s,i,a,c,u,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const gi="(default)";class rs{constructor(e,t){this.projectId=e,this.database=t||gi}static empty(){return new rs("","")}get isDefaultDatabase(){return this.database===gi}isEqual(e){return e instanceof rs&&e.projectId===this.projectId&&e.database===this.database}}function OE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new $(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rs(n.options.projectId,e)}/**
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
 */const Bd="__type__",ME="__max__",qs={mapValue:{}},jd="__vector__",_i="value";function sn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Fa(n)?4:$E(n)?9007199254740991:LE(n)?10:11:G(28295,{value:n})}function St(n,e){if(n===e)return!0;const t=sn(n);if(t!==sn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ns(n).isEqual(ns(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=nn(s.timestampValue),c=nn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return rn(s.bytesValue).isEqual(rn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ge(s.geoPointValue.latitude)===ge(i.geoPointValue.latitude)&&ge(s.geoPointValue.longitude)===ge(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ge(s.integerValue)===ge(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ge(s.doubleValue),c=ge(i.doubleValue);return a===c?pi(a)===pi(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return er(n.arrayValue.values||[],e.arrayValue.values||[],St);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(_u(a)!==_u(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!St(a[u],c[u])))return!1;return!0})(n,e);default:return G(52216,{left:n})}}function ss(n,e){return(n.values||[]).find((t=>St(t,e)))!==void 0}function tr(n,e){if(n===e)return 0;const t=sn(n),r=sn(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=ge(i.integerValue||i.doubleValue),u=ge(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return vu(n.timestampValue,e.timestampValue);case 4:return vu(ns(n),ns(e));case 5:return na(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=rn(i),u=rn(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=ee(c[h],u[h]);if(f!==0)return f}return ee(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=ee(ge(i.latitude),ge(a.latitude));return c!==0?c:ee(ge(i.longitude),ge(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Eu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},u=a.fields||{},h=c[_i]?.arrayValue,f=u[_i]?.arrayValue,p=ee(h?.values?.length||0,f?.values?.length||0);return p!==0?p:Eu(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===qs.mapValue&&a===qs.mapValue)return 0;if(i===qs.mapValue)return 1;if(a===qs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const E=na(u[p],f[p]);if(E!==0)return E;const A=tr(c[u[p]],h[f[p]]);if(A!==0)return A}return ee(u.length,f.length)})(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function vu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=nn(n),r=nn(e),s=ee(t.seconds,r.seconds);return s!==0?s:ee(t.nanos,r.nanos)}function Eu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=tr(t[s],r[s]);if(i)return i}return ee(t.length,r.length)}function nr(n){return ra(n)}function ra(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=nn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return rn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return q.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ra(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ra(t.fields[a])}`;return s+"}"})(n.mapValue):G(61005,{value:n})}function Xs(n){switch(sn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qi(n);return e?16+Xs(e):16;case 5:return 2*n.stringValue.length;case 6:return rn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Xs(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return On(r.fields,((i,a)=>{s+=i.length+Xs(a)})),s})(n.mapValue);default:throw G(13486,{value:n})}}function wu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function is(n){return!!n&&"integerValue"in n}function qd(n){return is(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function Ua(n){return!!n&&"arrayValue"in n}function Tu(n){return!!n&&"nullValue"in n}function Iu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zs(n){return!!n&&"mapValue"in n}function LE(n){return(n?.mapValue?.fields||{})[Bd]?.stringValue===jd}function zr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return On(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=zr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=zr(n.arrayValue.values[t]);return e}return{...n}}function $E(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ME}/**
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
 */class tt{constructor(e){this.value=e}static empty(){return new tt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Zs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=zr(t)}setAll(e){let t=xe.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=zr(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Zs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return St(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Zs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){On(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new tt(zr(this.value))}}function zd(n){const e=[];return On(n.fields,((t,r)=>{const s=new xe([t]);if(Zs(r)){const i=zd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new at(e)}/**
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
 */class Fe{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Fe(e,0,K.min(),K.min(),K.min(),tt.empty(),0)}static newFoundDocument(e,t,r,s){return new Fe(e,1,t,K.min(),r,s,0)}static newNoDocument(e,t){return new Fe(e,2,t,K.min(),K.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new Fe(e,3,t,K.min(),K.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class yi{constructor(e,t){this.position=e,this.inclusive=t}}function bu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=q.comparator(q.fromName(a.referenceValue),t.key):r=tr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Au(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!St(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class os{constructor(e,t="asc"){this.field=e,this.dir=t}}function FE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Hd{}class Ee extends Hd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new BE(e,t,r):t==="array-contains"?new zE(e,r):t==="in"?new HE(e,r):t==="not-in"?new GE(e,r):t==="array-contains-any"?new WE(e,r):new Ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new jE(e,r):new qE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(tr(t,this.value)):t!==null&&sn(this.value)===sn(t)&&this.matchesComparison(tr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class dt extends Hd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new dt(e,t)}matches(e){return Gd(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Gd(n){return n.op==="and"}function Wd(n){return UE(n)&&Gd(n)}function UE(n){for(const e of n.filters)if(e instanceof dt)return!1;return!0}function sa(n){if(n instanceof Ee)return n.field.canonicalString()+n.op.toString()+nr(n.value);if(Wd(n))return n.filters.map((e=>sa(e))).join(",");{const e=n.filters.map((t=>sa(t))).join(",");return`${n.op}(${e})`}}function Kd(n,e){return n instanceof Ee?(function(r,s){return s instanceof Ee&&r.op===s.op&&r.field.isEqual(s.field)&&St(r.value,s.value)})(n,e):n instanceof dt?(function(r,s){return s instanceof dt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&Kd(a,s.filters[c])),!0):!1})(n,e):void G(19439)}function Qd(n){return n instanceof Ee?(function(t){return`${t.field.canonicalString()} ${t.op} ${nr(t.value)}`})(n):n instanceof dt?(function(t){return t.op.toString()+" {"+t.getFilters().map(Qd).join(" ,")+"}"})(n):"Filter"}class BE extends Ee{constructor(e,t,r){super(e,t,r),this.key=q.fromName(r.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class jE extends Ee{constructor(e,t){super(e,"in",t),this.keys=Jd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class qE extends Ee{constructor(e,t){super(e,"not-in",t),this.keys=Jd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Jd(n,e){return(e.arrayValue?.values||[]).map((t=>q.fromName(t.referenceValue)))}class zE extends Ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ua(t)&&ss(t.arrayValue,this.value)}}class HE extends Ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ss(this.value.arrayValue,t)}}class GE extends Ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(ss(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ss(this.value.arrayValue,t)}}class WE extends Ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ua(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ss(this.value.arrayValue,r)))}}/**
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
 */class KE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Su(n,e=null,t=[],r=[],s=null,i=null,a=null){return new KE(n,e,t,r,s,i,a)}function Ba(n){const e=J(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>sa(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ji(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>nr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>nr(r))).join(",")),e.Te=t}return e.Te}function ja(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!FE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Kd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Au(n.startAt,e.startAt)&&Au(n.endAt,e.endAt)}function ia(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class dr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function QE(n,e,t,r,s,i,a,c){return new dr(n,e,t,r,s,i,a,c)}function zi(n){return new dr(n)}function Ru(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function JE(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Yd(n){return n.collectionGroup!==null}function Hr(n){const e=J(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(xe.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new os(i,r))})),t.has(xe.keyField().canonicalString())||e.Ie.push(new os(xe.keyField(),r))}return e.Ie}function Tt(n){const e=J(n);return e.Ee||(e.Ee=YE(e,Hr(n))),e.Ee}function YE(n,e){if(n.limitType==="F")return Su(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new os(s.field,i)}));const t=n.endAt?new yi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new yi(n.startAt.position,n.startAt.inclusive):null;return Su(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function oa(n,e){const t=n.filters.concat([e]);return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function XE(n,e){const t=n.explicitOrderBy.concat([e]);return new dr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function vi(n,e,t){return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Hi(n,e){return ja(Tt(n),Tt(e))&&n.limitType===e.limitType}function Xd(n){return`${Ba(Tt(n))}|lt:${n.limitType}`}function Hn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Qd(s))).join(", ")}]`),ji(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>nr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>nr(s))).join(",")),`Target(${r})`})(Tt(n))}; limitType=${n.limitType})`}function Gi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):q.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Hr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,u){const h=bu(a,c,u);return a.inclusive?h<=0:h<0})(r.startAt,Hr(r),s)||r.endAt&&!(function(a,c,u){const h=bu(a,c,u);return a.inclusive?h>=0:h>0})(r.endAt,Hr(r),s))})(n,e)}function ZE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Zd(n){return(e,t)=>{let r=!1;for(const s of Hr(n)){const i=ew(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ew(n,e,t){const r=n.field.isKeyField()?q.comparator(e.key,t.key):(function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?tr(u,h):G(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
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
 */class Mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){On(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Od(this.inner)}size(){return this.innerSize}}/**
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
 */const tw=new de(q.comparator);function $t(){return tw}const ef=new de(q.comparator);function Fr(...n){let e=ef;for(const t of n)e=e.insert(t.key,t);return e}function tf(n){let e=ef;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Tn(){return Gr()}function nf(){return Gr()}function Gr(){return new Mn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const nw=new de(q.comparator),rw=new Ae(q.comparator);function te(...n){let e=rw;for(const t of n)e=e.add(t);return e}const sw=new Ae(ee);function iw(){return sw}/**
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
 */function Wi(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:pi(e)?"-0":e}}function qa(n){return{integerValue:""+n}}function ow(n,e){return kE(e)?qa(e):Wi(n,e)}/**
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
 */class Ki{constructor(){this._=void 0}}function aw(n,e,t){return n instanceof as?(function(s,i){const a={fields:{[$d]:{stringValue:Ld},[Ud]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Fa(i)&&(i=qi(i)),i&&(a.fields[Fd]=i),{mapValue:a}})(t,e):n instanceof cs?sf(n,e):n instanceof ls?of(n,e):n instanceof us?(function(s,i){const a=rf(s,i),c=Ti(a)+Ti(s.Ae);return is(a)&&is(s.Ae)?qa(c):Wi(s.serializer,c)})(n,e):n instanceof Ei?(function(s,i){return Cu(s,i,Math.min)})(n,e):n instanceof wi?(function(s,i){return Cu(s,i,Math.max)})(n,e):void 0}function cw(n,e,t){return n instanceof cs?sf(n,e):n instanceof ls?of(n,e):t}function rf(n,e){return n instanceof us?qd(e)?e:{integerValue:0}:null}class as extends Ki{}class cs extends Ki{constructor(e){super(),this.elements=e}}function sf(n,e){const t=af(e);for(const r of n.elements)t.some((s=>St(s,r)))||t.push(r);return{arrayValue:{values:t}}}class ls extends Ki{constructor(e){super(),this.elements=e}}function of(n,e){let t=af(e);for(const r of n.elements)t=t.filter((s=>!St(s,r)));return{arrayValue:{values:t}}}class za extends Ki{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class us extends za{}class Ei extends za{}class wi extends za{}function Cu(n,e,t){if(!qd(e))return n.Ae;const r=t(Ti(e),Ti(n.Ae));return is(e)&&is(n.Ae)?qa(r):Wi(n.serializer,r)}function Ti(n){return ge(n.integerValue||n.doubleValue)}function af(n){return Ua(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class lw{constructor(e,t){this.field=e,this.transform=t}}function uw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof cs&&s instanceof cs||r instanceof ls&&s instanceof ls?er(r.elements,s.elements,St):r instanceof us&&s instanceof us||r instanceof Ei&&s instanceof Ei||r instanceof wi&&s instanceof wi?St(r.Ae,s.Ae):r instanceof as&&s instanceof as})(n.transform,e.transform)}class hw{constructor(e,t){this.version=e,this.transformResults=t}}class It{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new It}static exists(e){return new It(void 0,e)}static updateTime(e){return new It(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ei(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Qi{}function cf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ha(n.key,It.none()):new Es(n.key,n.data,It.none());{const t=n.data,r=tt.empty();let s=new Ae(xe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ln(n.key,r,new at(s.toArray()),It.none())}}function dw(n,e,t){n instanceof Es?(function(s,i,a){const c=s.value.clone(),u=ku(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Ln?(function(s,i,a){if(!ei(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=ku(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(lf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Wr(n,e,t,r){return n instanceof Es?(function(i,a,c,u){if(!ei(i.precondition,a))return c;const h=i.value.clone(),f=xu(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof Ln?(function(i,a,c,u){if(!ei(i.precondition,a))return c;const h=xu(i.fieldTransforms,u,a),f=a.data;return f.setAll(lf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,a,c){return ei(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function fw(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=rf(r.transform,s||null);i!=null&&(t===null&&(t=tt.empty()),t.set(r.field,i))}return t||null}function Pu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&er(r,s,((i,a)=>uw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Es extends Qi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ln extends Qi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function lf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function ku(n,e,t){const r=new Map;oe(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,cw(a,c,t[s]))}return r}function xu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,aw(i,a,e))}return r}class Ha extends Qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mw extends Qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class pw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Wr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Wr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=nf();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=cf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(K.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),te())}isEqual(e){return this.batchId===e.batchId&&er(this.mutations,e.mutations,((t,r)=>Pu(t,r)))&&er(this.baseMutations,e.baseMutations,((t,r)=>Pu(t,r)))}}class Ga{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){oe(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return nw})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Ga(e,t,r,s)}}/**
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
 */class gw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class _w{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ve,re;function yw(n){switch(n){case R.OK:return G(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function uf(n){if(n===void 0)return Lt("GRPC error has no .code"),R.UNKNOWN;switch(n){case ve.OK:return R.OK;case ve.CANCELLED:return R.CANCELLED;case ve.UNKNOWN:return R.UNKNOWN;case ve.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case ve.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case ve.INTERNAL:return R.INTERNAL;case ve.UNAVAILABLE:return R.UNAVAILABLE;case ve.UNAUTHENTICATED:return R.UNAUTHENTICATED;case ve.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case ve.NOT_FOUND:return R.NOT_FOUND;case ve.ALREADY_EXISTS:return R.ALREADY_EXISTS;case ve.PERMISSION_DENIED:return R.PERMISSION_DENIED;case ve.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case ve.ABORTED:return R.ABORTED;case ve.OUT_OF_RANGE:return R.OUT_OF_RANGE;case ve.UNIMPLEMENTED:return R.UNIMPLEMENTED;case ve.DATA_LOSS:return R.DATA_LOSS;default:return G(39323,{code:n})}}(re=ve||(ve={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function vw(){return new TextEncoder}/**
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
 */const Ew=new Xt([4294967295,4294967295],0);function Nu(n){const e=vw().encode(n),t=new Ad;return t.update(e),new Uint8Array(t.digest())}function Du(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Xt([t,r],0),new Xt([s,i],0)]}class Wa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ur(`Invalid padding: ${t}`);if(r<0)throw new Ur(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ur(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ur(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Xt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Xt.fromNumber(r)));return s.compare(Ew)===1&&(s=new Xt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Nu(e),[r,s]=Du(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Wa(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=Nu(e),[r,s]=Du(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ur extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ws{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ts.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ws(K.min(),s,new de(ee),$t(),te())}}class Ts{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ts(r,t,te(),te(),te())}}/**
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
 */class ti{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class hf{constructor(e,t){this.targetId=e,this.Ce=t}}class df{constructor(e,t,r=Ne.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Vu{constructor(e){this.targetId=e,this.ve=0,this.Fe=Ou(),this.Me=Ne.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=te(),t=te(),r=te();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:G(38017,{changeType:i})}})),new Ts(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Ou()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,oe(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const Vr="WatchChangeAggregator";class ww{constructor(e){this.Ge=e,this.ze=new Map,this.je=$t(),this.Je=zs(),this.He=zs(),this.Ze=new de(ee)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:G(56790,{state:e.state})}else L(Vr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(ia(i))if(r===0){const a=new q(i.path);this.et(t,a,Fe.newNoDocument(a,K.min()))}else oe(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=rn(r).toUint8Array()}catch(u){if(u instanceof Md)return Zn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Wa(a,s,i)}catch(u){return Zn(u instanceof Ur?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.st(a);if(c){if(i.current&&ia(c.target)){const u=new q(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.et(a,u,Fe.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=te();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new ws(e,t,this.Ze,this.je,r);return this.je=$t(),this.Je=zs(),this.He=zs(),this.Ze=new de(ee),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void L(Vr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):L(Vr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(L(Vr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Vu(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new Ae(ee),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new Ae(ee),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||L(Vr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new Vu(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function zs(){return new de(q.comparator)}function Ou(){return new de(q.comparator)}const Tw={asc:"ASCENDING",desc:"DESCENDING"},Iw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},bw={and:"AND",or:"OR"};class Aw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function aa(n,e){return n.useProto3Json||ji(e)?e:{value:e}}function Ii(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ff(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Sw(n,e){return Ii(n,e.toTimestamp())}function bt(n){return oe(!!n,49232),K.fromTimestamp((function(t){const r=nn(t);return new ce(r.seconds,r.nanos)})(n))}function Ka(n,e){return ca(n,e).canonicalString()}function ca(n,e){const t=(function(s){return new le(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function mf(n){const e=le.fromString(n);return oe(vf(e),10190,{key:e.toString()}),e}function la(n,e){return Ka(n.databaseId,e.path)}function $o(n,e){const t=mf(e);if(t.get(1)!==n.databaseId.projectId)throw new $(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new $(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(gf(t))}function pf(n,e){return Ka(n.databaseId,e)}function Rw(n){const e=mf(n);return e.length===4?le.emptyPath():gf(e)}function ua(n){return new le(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function gf(n){return oe(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Mu(n,e,t){return{name:la(n,e),fields:t.value.mapValue.fields}}function Cw(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:G(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(oe(f===void 0||typeof f=="string",58123),Ne.fromBase64String(f||"")):(oe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ne.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?R.UNKNOWN:uf(h.code);return new $(f,h.message||"")})(a);t=new df(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=$o(n,r.document.name),i=bt(r.document.updateTime),a=r.document.createTime?bt(r.document.createTime):K.min(),c=new tt({mapValue:{fields:r.document.fields}}),u=Fe.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ti(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=$o(n,r.document),i=r.readTime?bt(r.readTime):K.min(),a=Fe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ti([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=$o(n,r.document),i=r.removedTargetIds||[];t=new ti([],i,s,null)}else{if(!("filter"in e))return G(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new _w(s,i),c=r.targetId;t=new hf(c,a)}}return t}function Pw(n,e){let t;if(e instanceof Es)t={update:Mu(n,e.key,e.value)};else if(e instanceof Ha)t={delete:la(n,e.key)};else if(e instanceof Ln)t={update:Mu(n,e.key,e.data),updateMask:$w(e.fieldMask)};else{if(!(e instanceof mw))return G(16599,{Vt:e.type});t={verify:la(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof as)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof cs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ls)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof us)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof Ei)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof wi)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw G(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Sw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:G(27497)})(n,e.precondition)),t}function kw(n,e){return n&&n.length>0?(oe(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?bt(s.updateTime):bt(i);return a.isEqual(K.min())&&(a=bt(i)),new hw(a,s.transformResults||[])})(t,e)))):[]}function xw(n,e){return{documents:[pf(n,e.path)]}}function Nw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=pf(n,s);const i=(function(h){if(h.length!==0)return yf(dt.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(E){return{field:Gn(E.field),direction:Ow(E.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=aa(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{dt:t,parent:s}}function Dw(n){let e=Rw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){oe(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const E=_f(p);return E instanceof dt&&Wd(E)?E.getFilters():[E]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((E=>(function(C){return new os(Wn(C.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let E;return E=typeof p=="object"?p.value:p,ji(E)?null:E})(t.limit));let u=null;t.startAt&&(u=(function(p){const E=!!p.before,A=p.values||[];return new yi(A,E)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const E=!p.before,A=p.values||[];return new yi(A,E)})(t.endAt)),QE(e,s,a,i,c,"F",u,h)}function Vw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function _f(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Wn(t.unaryFilter.field);return Ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Wn(t.unaryFilter.field);return Ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Wn(t.unaryFilter.field);return Ee.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Wn(t.unaryFilter.field);return Ee.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Ee.create(Wn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return dt.create(t.compositeFilter.filters.map((r=>_f(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return G(1026)}})(t.compositeFilter.op))})(n):G(30097,{filter:n})}function Ow(n){return Tw[n]}function Mw(n){return Iw[n]}function Lw(n){return bw[n]}function Gn(n){return{fieldPath:n.canonicalString()}}function Wn(n){return xe.fromServerFormat(n.fieldPath)}function yf(n){return n instanceof Ee?(function(t){if(t.op==="=="){if(Iu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NAN"}};if(Tu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Iu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NAN"}};if(Tu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gn(t.field),op:Mw(t.op),value:t.value}}})(n):n instanceof dt?(function(t){const r=t.getFilters().map((s=>yf(s)));return r.length===1?r[0]:{compositeFilter:{op:Lw(t.op),filters:r}}})(n):G(54877,{filter:n})}function $w(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function vf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Ef(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class xt{constructor(e,t,r,s,i=K.min(),a=K.min(),c=Ne.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new xt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Fw{constructor(e){this.gt=e}}function Uw(n){const e=Dw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?vi(e,e.limit,"L"):e}/**
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
 */class Bw{constructor(){this.Sn=new jw}addToCollectionParentIndex(e,t){return this.Sn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(tn.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(tn.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class jw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ae(le.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ae(le.comparator)).toArray()}}/**
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
 */const Lu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},wf=41943040;class Ke{static withCacheSize(e){return new Ke(e,Ke.DEFAULT_COLLECTION_PERCENTILE,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ke.DEFAULT_COLLECTION_PERCENTILE=10,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ke.DEFAULT=new Ke(wf,Ke.DEFAULT_COLLECTION_PERCENTILE,Ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ke.DISABLED=new Ke(-1,0,0);/**
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
 */const $u="LruGarbageCollector",Tf=1048576;function Fu([n,e],[t,r]){const s=ee(n,t);return s===0?ee(e,r):s}class qw{constructor(e){this.hr=e,this.buffer=new Ae(Fu),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Fu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){L($u,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){hr(t)?L($u,"Ignoring IndexedDB error during garbage collection: ",t):await ur(t)}await this.Rr(3e5)}))}}class Hw{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Bi.ce);const r=new qw(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(Lu)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Lu):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),zn()<=ne.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Gw(n,e){return new Hw(n,e)}/**
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
 */class Ww{constructor(){this.changes=new Mn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Kw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Qw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Wr(r.mutation,s,at.empty(),ce.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,te()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=te()){const s=Tn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Fr();return i.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Tn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,te())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=$t();const a=Gr(),c=(function(){return Gr()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Ln)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Wr(f.mutation,h,f.mutation.getFieldMask(),ce.now())):a.set(h.key,at.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new Kw(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Gr();let s=new de(((a,c)=>a-c)),i=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||at.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||te()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=nf();f.forEach((E=>{if(!i.has(E)){const A=cf(t.get(E),r.get(E));A!==null&&p.set(E,A),i=i.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return k.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return JE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Yd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):k.resolve(Tn());let c=ts,u=i;return a.next((h=>k.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next((E=>{u=u.insert(f,E)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,te()))).next((f=>({batchId:c,changes:tf(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next((r=>{let s=Fr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Fr();return this.indexManager.getCollectionParents(e,i).next((c=>k.forEach(c,(u=>{const h=(function(p,E){return new dr(E,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,E)=>{a=a.insert(p,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Fe.newInvalidDocument(f)))}));let c=Fr();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Wr(f.mutation,h,at.empty(),ce.now()),Gi(t,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class Jw{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return k.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:bt(s.createTime)}})(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:Uw(s.bundledQuery),readTime:bt(s.readTime)}})(t)),k.resolve()}}/**
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
 */class Yw{constructor(){this.overlays=new de(q.comparator),this.Br=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Tn();return k.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),k.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const s=Tn(),i=t.length+1,a=new q(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return k.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new de(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Tn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Tn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return k.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new gw(t,r));let i=this.Br.get(t);i===void 0&&(i=te(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
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
 */class Xw{constructor(){this.sessionToken=Ne.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class Qa{constructor(){this.Lr=new Ae(Pe.kr),this.qr=new Ae(Pe.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Pe(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Pe(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new q(new le([])),r=new Pe(t,e),s=new Pe(t,e+1),i=[];return this.qr.forEachInRange([r,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new q(new le([])),r=new Pe(t,e),s=new Pe(t,e+1);let i=te();return this.qr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Pe(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Pe{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return q.comparator(e.key,t.key)||ee(e.jr,t.jr)}static Kr(e,t){return ee(e.jr,t.jr)||q.comparator(e.key,t.key)}}/**
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
 */class Zw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new Ae(Pe.kr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new pw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Pe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?$a:this.Xn-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Pe(t,0),s=new Pe(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(a=>{const c=this.Hr(a.jr);i.push(c)})),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(ee);return t.forEach((s=>{const i=new Pe(s,0),a=new Pe(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(c=>{r=r.add(c.jr)}))})),k.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;q.isDocumentKey(i)||(i=i.child(""));const a=new Pe(new q(i),0);let c=new Ae(ee);return this.Jr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.jr)),!0)}),a),k.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){oe(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return k.forEach(t.mutations,(s=>{const i=new Pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Pe(t,0),s=this.Jr.firstAfterOrEqual(r);return k.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class eT{constructor(e){this.ei=e,this.docs=(function(){return new de(q.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():Fe.newInvalidDocument(t))}getEntries(e,t){let r=$t();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Fe.newInvalidDocument(s))})),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=$t();const a=t.path,c=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||SE(AE(f),r)<=0||(s.has(f.key)||Gi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,r,s){G(9500)}ti(e,t){return k.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new tT(this)}getSize(e){return k.resolve(this.size)}}class tT extends Ww{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),k.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
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
 */class nT{constructor(e){this.persistence=e,this.ni=new Mn((t=>Ba(t)),ja),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.ri=0,this.ii=new Qa,this.targetCount=0,this.si=on.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),k.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new on(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.cr(t),k.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),k.waitFor(i).next((()=>s))}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.ii.containsKey(t))}}/**
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
 */class If{constructor(e,t){this.oi={},this.overlays={},this._i=new Bi(0),this.ai=!1,this.ai=!0,this.ui=new Xw,this.referenceDelegate=e(this),this.ci=new nT(this),this.indexManager=new Bw,this.remoteDocumentCache=(function(s){return new eT(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Fw(t),this.hi=new Jw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Yw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new Zw(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new rT(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return k.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class rT extends CE{constructor(e){super(),this.currentSequenceNumber=e}}class Ja{constructor(e){this.persistence=e,this.Ei=new Qa,this.Ri=null}static Ai(e){return new Ja(e)}get Vi(){if(this.Ri)return this.Ri;throw G(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.Vi,(r=>{const s=q.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,K.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return k.or([()=>k.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class bi{constructor(e,t){this.persistence=e,this.mi=new Mn((r=>xE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Gw(this,t)}static Ai(e,t){return new bi(e,t)}Pi(){}Ti(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return k.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?k.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(a=>this.yr(e,a,t).next((c=>{c||(r++,i.removeEntry(a,K.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Xs(e.data.value)),t}yr(e,t,r){return k.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return k.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Ya{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=te(),s=te();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ya(e,t.fromCache,r,s)}}/**
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
 */class sT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class iT{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return kg()?8:PE(Be())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new sT;return this.ps(e,t,a).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(zn()<=ne.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),k.resolve()):(zn()<=ne.DEBUG&&L("QueryEngine","Query:",Hn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(zn()<=ne.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Tt(t))):k.resolve())}fs(e,t){if(Ru(t))return k.resolve(null);let r=Tt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=vi(t,null,"F"),r=Tt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=te(...i);return this.ds.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.ws(t,c);return this.Ss(t,h,a,u.readTime)?this.fs(e,vi(t,null,"F")):this.bs(e,h,t,u)}))))})))))}gs(e,t,r,s){return Ru(t)||s.isEqual(K.min())?k.resolve(null):this.ds.getDocuments(e,r).next((i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?k.resolve(null):(zn()<=ne.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hn(t)),this.bs(e,a,t,bE(s,ts)).next((c=>c)))}))}ws(e,t){let r=new Ae(Zd(e));return t.forEach(((s,i)=>{Gi(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return zn()<=ne.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.ds.getDocumentsMatchingQuery(e,t,tn.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const Xa="LocalStore",oT=3e8;class aT{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new de(ee),this.vs=new Mn((i=>Ba(i)),ja),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Qw(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function cT(n,e,t,r){return new aT(n,e,t,r)}async function bf(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let u=te();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({Os:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function lT(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,E=p.keys();let A=k.resolve();return E.forEach((C=>{A=A.next((()=>f.getEntry(u,C))).next((N=>{const x=h.docVersions.get(C);oe(x!==null,48541),N.version.compareTo(x)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=te();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Af(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function uT(n,e){const t=J(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((f,p)=>{const E=s.get(p);if(!E)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.ci.addMatchingKeys(i,f.addedDocuments,p))));let A=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(Ne.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),(function(N,x,M){return N.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=oT?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0})(E,A,f)&&c.push(t.ci.updateTargetData(i,A))}));let u=$t(),h=te();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(hT(i,a,e.documentUpdates).next((f=>{u=f.Ns,h=f.Bs}))),!r.isEqual(K.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next((p=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return k.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Cs=s,i)))}function hT(n,e,t){let r=te(),s=te();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=$t();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(K.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):L(Xa,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Ns:a,Bs:s}}))}function dT(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=$a),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function fT(n,e){const t=J(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,k.resolve(s)):t.ci.allocateTargetId(r).next((a=>(s=new xt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function ha(n,e,t){const r=J(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!hr(a))throw a;L(Xa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function Uu(n,e,t){const r=J(n);let s=K.min(),i=te();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const p=J(u),E=p.vs.get(f);return E!==void 0?k.resolve(p.Cs.get(E)):p.ci.getTargetData(h,f)})(r,a,Tt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next((u=>{i=u}))})).next((()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:K.min(),t?i:te()))).next((c=>(mT(r,ZE(e),c),{documents:c,Ls:i})))))}function mT(n,e,t){let r=n.Fs.get(e)||K.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Bu{constructor(){this.activeTargetIds=iw()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class pT{constructor(){this.Co=new Bu,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Bu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class gT{Fo(e){}shutdown(){}}/**
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
 */const ju="ConnectivityMonitor";class qu{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){L(ju,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){L(ju,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Hs=null;function da(){return Hs===null?Hs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Hs++,"0x"+Hs.toString(16)}/**
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
 */const Fo="RestConnection",_T={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class yT{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===gi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=da(),c=this.Wo(e,t.toUriEncodedString());L(Fo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:h}=new URL(c),f=Vn(h);return this.Go(e,c,u,r,f).then((p=>(L(Fo,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw Zn(Fo,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+lr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=_T[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class vT{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
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
 */const $e="WebChannelConnection",Or=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Yn extends yT{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Yn.u_){const e=Pd();Or(e,Cd.STAT_EVENT,(t=>{t.stat===ta.PROXY?L($e,"STAT_EVENT: detected buffering proxy"):t.stat===ta.NOPROXY&&L($e,"STAT_EVENT: detected no buffering proxy")})),Yn.u_=!0}}Go(e,t,r,s,i){const a=da();return new Promise(((c,u)=>{const h=new Sd;h.setWithCredentials(!0),h.listenOnce(Rd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ys.NO_ERROR:const p=h.getResponseJson();L($e,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case Ys.TIMEOUT:L($e,`RPC '${e}' ${a} timed out`),u(new $(R.DEADLINE_EXCEEDED,"Request time out"));break;case Ys.HTTP_ERROR:const E=h.getStatus();if(L($e,`RPC '${e}' ${a} failed with status:`,E,"response text:",h.getResponseText()),E>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const C=A?.error;if(C&&C.status&&C.message){const N=(function(M){const V=M.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(V)>=0?V:R.UNKNOWN})(C.status);u(new $(N,C.message))}else u(new $(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new $(R.UNAVAILABLE,"Connection failed."));break;default:G(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{L($e,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);L($e,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=da(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");L($e,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.T_(f);let p=!1,E=!1;const A=new vT({jo:C=>{E?L($e,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(L($e,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),L($e,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Jo:()=>f.close()});return Or(f,$r.EventType.OPEN,(()=>{E||(L($e,`RPC '${e}' stream ${s} transport opened.`),A.r_())})),Or(f,$r.EventType.CLOSE,(()=>{E||(E=!0,L($e,`RPC '${e}' stream ${s} transport closed`),A.s_(),this.I_(f))})),Or(f,$r.EventType.ERROR,(C=>{E||(E=!0,Zn($e,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),A.s_(new $(R.UNAVAILABLE,"The operation could not be completed")))})),Or(f,$r.EventType.MESSAGE,(C=>{if(!E){const N=C.data[0];oe(!!N,16349);const x=N,M=x?.error||x[0]?.error;if(M){L($e,`RPC '${e}' stream ${s} received error:`,M);const V=M.status;let B=(function(j){const v=ve[j];if(v!==void 0)return uf(v)})(V),U=M.message;V==="NOT_FOUND"&&U.includes("database")&&U.includes("does not exist")&&U.includes(this.databaseId.database)&&Zn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),B===void 0&&(B=R.INTERNAL,U="Unknown error status: "+V+" with message "+M.message),E=!0,A.s_(new $(B,U)),f.close()}else L($e,`RPC '${e}' stream ${s} received:`,N),A.o_(N)}})),Yn.a_(),setTimeout((()=>{A.i_()}),0),A}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return kd()}}/**
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
 */function ET(n){return new Yn(n)}function Uo(){return typeof document<"u"?document:null}/**
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
 */function Ji(n){return new Aw(n,!0)}/**
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
 */Yn.u_=!1;class Sf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
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
 */const zu="PersistentStream";class Rf{constructor(e,t,r,s,i,a,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Sf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Lt(t.toString()),Lt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new $(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return L(zu,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(L(zu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class wT extends Rf{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Cw(this.serializer,e),r=(function(i){if(!("targetChange"in i))return K.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?bt(a.readTime):K.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=ua(this.serializer),t.addTarget=(function(i,a){let c;const u=a.target;if(c=ia(u)?{documents:xw(i,u)}:{query:Nw(i,u).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=ff(i,a.resumeToken);const h=aa(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(K.min())>0){c.readTime=Ii(i,a.snapshotVersion.toTimestamp());const h=aa(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Vw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=ua(this.serializer),t.removeTarget=e,this.k_(t)}}class TT extends Rf{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return oe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,oe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){oe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=kw(e.writeResults,e.commitTime),r=bt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=ua(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Pw(this.serializer,r)))};this.k_(t)}}/**
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
 */class IT{}class bT extends IT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new $(R.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(e,ca(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new $(R.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.zo(e,ca(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new $(R.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function AT(n,e,t,r){return new bT(n,e,t,r)}class ST{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Lt(t),this._a=!1):L("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const Rt="RemoteStore";class RT{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new on(1e3),this.Aa=new on(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{r.enqueueAndForget((async()=>{$n(this)&&(L(Rt,"Restarting streams for network reachability change."),await(async function(u){const h=J(u);h.Va.add(4),await Is(h),h.fa.set("Unknown"),h.Va.delete(4),await Yi(h)})(this))}))})),this.fa=new ST(r,s)}}async function Yi(n){if($n(n))for(const e of n.da)await e(!0)}async function Is(n){for(const e of n.da)await e(!1)}function fa(n,e){return n.Ia.get(e)||void 0}function Cf(n,e){const t=J(n),r=fa(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,u){const h=fa(c,u);h!==void 0&&c.Ea.delete(h);const f=(function(E,A){return A%2!=0?E.Aa.next():E.Ra.next()})(c,u);return c.Ia.set(u,f),c.Ea.set(f,u),f})(t,e.targetId);L(Rt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new xt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),nc(t)?tc(t):fr(t).x_()&&ec(t,i)}function Za(n,e){const t=J(n),r=fr(t),s=fa(t,e);L(Rt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&Pf(t,s),t.Ta.size===0&&(r.x_()?r.B_():$n(t)&&t.fa.set("Unknown"))}function ec(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void L(Rt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}fr(n).H_(e)}function Pf(n,e){n.ga.$e(e),fr(n).Z_(e)}function tc(n){n.ga=new ww({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):te()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),fr(n).start(),n.fa.aa()}function nc(n){return $n(n)&&!fr(n).M_()&&n.Ta.size>0}function $n(n){return J(n).Va.size===0}function kf(n){n.ga=void 0}async function CT(n){n.fa.set("Online")}async function PT(n){n.Ta.forEach(((e,t)=>{ec(n,e)}))}async function kT(n,e){kf(n),nc(n)?(n.fa.la(e),tc(n)):n.fa.set("Unknown")}async function xT(n,e,t){if(n.fa.set("Online"),e instanceof df&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){L(Rt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ai(n,r)}else if(e instanceof ti?n.ga.Xe(e):e instanceof hf?n.ga.it(e):n.ga.tt(e),!t.isEqual(K.min()))try{const r=await Af(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ta.get(f);p&&i.Ta.set(f,p.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const p=i.Ta.get(h);if(!p)return;i.Ta.set(h,p.withResumeToken(Ne.EMPTY_BYTE_STRING,p.snapshotVersion)),Pf(i,h);const E=new xt(p.target,h,f,p.sequenceNumber);ec(i,E)}));const u=(function(f,p){const E=new Map;p.targetChanges.forEach(((C,N)=>{const x=f.Ea.get(N);x!==void 0&&E.set(x,C)}));let A=new de(ee);return p.targetMismatches.forEach(((C,N)=>{const x=f.Ea.get(C);x!==void 0&&(A=A.insert(x,N))})),new ws(p.snapshotVersion,E,A,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){L(Rt,"Failed to raise snapshot:",r),await Ai(n,r)}}async function Ai(n,e,t){if(!hr(e))throw e;n.Va.add(1),await Is(n),n.fa.set("Offline"),t||(t=()=>Af(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{L(Rt,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await Yi(n)}))}function xf(n,e){return e().catch((t=>Ai(n,t,e)))}async function Xi(n){const e=J(n),t=an(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:$a;for(;NT(e);)try{const s=await dT(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,DT(e,s)}catch(s){await Ai(e,s)}Nf(e)&&Df(e)}function NT(n){return $n(n)&&n.Pa.length<10}function DT(n,e){n.Pa.push(e);const t=an(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function Nf(n){return $n(n)&&!an(n).M_()&&n.Pa.length>0}function Df(n){an(n).start()}async function VT(n){an(n).na()}async function OT(n){const e=an(n);for(const t of n.Pa)e.Y_(t.mutations)}async function MT(n,e,t){const r=n.Pa.shift(),s=Ga.from(r,e,t);await xf(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Xi(n)}async function LT(n,e){e&&an(n).X_&&await(async function(r,s){if((function(a){return yw(a)&&a!==R.ABORTED})(s.code)){const i=r.Pa.shift();an(r).N_(),await xf(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Xi(r)}})(n,e),Nf(n)&&Df(n)}async function Hu(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),L(Rt,"RemoteStore received new credentials");const r=$n(t);t.Va.add(3),await Is(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await Yi(t)}async function $T(n,e){const t=J(n);e?(t.Va.delete(2),await Yi(t)):e||(t.Va.add(2),await Is(t),t.fa.set("Unknown"))}function fr(n){return n.pa||(n.pa=(function(t,r,s){const i=J(t);return i.ia(),new wT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:CT.bind(null,n),Xo:PT.bind(null,n),e_:kT.bind(null,n),J_:xT.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),nc(n)?tc(n):n.fa.set("Unknown")):(await n.pa.stop(),kf(n))}))),n.pa}function an(n){return n.ya||(n.ya=(function(t,r,s){const i=J(t);return i.ia(),new TT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:VT.bind(null,n),e_:LT.bind(null,n),ea:OT.bind(null,n),ta:MT.bind(null,n)}),n.da.push((async e=>{e?(n.ya.N_(),await Xi(n)):(await n.ya.stop(),n.Pa.length>0&&(L(Rt,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ya}/**
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
 */class rc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new rc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new $(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sc(n,e){if(Lt("AsyncQueue",`${e}: ${n}`),hr(n))return new $(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Xn{static emptySet(e){return new Xn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||q.comparator(t.key,r.key):(t,r)=>q.comparator(t.key,r.key),this.keyedMap=Fr(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Xn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Xn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Gu{constructor(){this.wa=new de(q.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):G(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class rr{constructor(e,t,r,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new rr(e,t,Xn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class FT{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class UT{constructor(){this.queries=Wu(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=J(t),i=s.queries;s.queries=Wu(),i.forEach(((a,c)=>{for(const u of c.Ca)u.onError(r)}))})(this,new $(R.ABORTED,"Firestore shutting down"))}}function Wu(){return new Mn((n=>Xd(n)),Hi)}async function ic(n,e){const t=J(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new FT,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=sc(a,`Initialization of query '${Hn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&ac(t)}async function oc(n,e){const t=J(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function BT(n,e){const t=J(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&ac(t)}function jT(n,e,t){const r=J(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function ac(n){n.Ma.forEach((e=>{e.next()}))}var ma,Ku;(Ku=ma||(ma={})).Na="default",Ku.Cache="cache";class cc{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new rr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=rr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==ma.Cache}}/**
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
 */class Vf{constructor(e){this.key=e}}class Of{constructor(e){this.key=e}}class qT{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=te(),this.mutatedKeys=te(),this.ru=Zd(e),this.iu=new Xn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new Gu,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const E=s.get(f),A=Gi(this.query,p)?p:null,C=!!E&&this.mutatedKeys.has(E.key),N=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let x=!1;E&&A?E.data.isEqual(A.data)?C!==N&&(r.track({type:3,doc:A}),x=!0):this.au(E,A)||(r.track({type:2,doc:A}),x=!0,(u&&this.ru(A,u)>0||h&&this.ru(A,h)<0)&&(c=!0)):!E&&A?(r.track({type:0,doc:A}),x=!0):E&&!A&&(r.track({type:1,doc:E}),x=!0,(u||h)&&(c=!0)),x&&(A?(a=a.add(A),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort(((f,p)=>(function(A,C){const N=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{At:x})}};return N(A)-N(C)})(f.type,p.type)||this.ru(f.doc,p.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,h=u!==this.tu;return this.tu=u,a.length!==0||h?{snapshot:new rr(this.query,e.iu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Gu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=te(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new Of(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new Vf(r))})),t}Pu(e){this.eu=e.Ls,this.nu=te();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return rr.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const lc="SyncEngine";class zT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class HT{constructor(e){this.key=e,this.Iu=!1}}class GT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new Mn((c=>Xd(c)),Hi),this.Au=new Map,this.Vu=new Set,this.du=new de(q.comparator),this.mu=new Map,this.fu=new Qa,this.gu={},this.pu=new Map,this.yu=on._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function WT(n,e,t=!0){const r=Bf(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await Mf(r,e,t,!0),s}async function KT(n,e){const t=Bf(n);await Mf(t,e,!0,!1)}async function Mf(n,e,t,r){const s=await fT(n.localStore,Tt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await QT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Cf(n.remoteStore,s),c}async function QT(n,e,t,r,s){n.Su=(p,E,A)=>(async function(N,x,M,V){let B=x.view.ou(M);B.Ss&&(B=await Uu(N.localStore,x.query,!1).then((({documents:v})=>x.view.ou(v,B))));const U=V&&V.targetChanges.get(x.targetId),Z=V&&V.targetMismatches.get(x.targetId)!=null,j=x.view.applyChanges(B,N.isPrimaryClient,U,Z);return Ju(N,x.targetId,j.lu),j.snapshot})(n,p,E,A);const i=await Uu(n.localStore,e,!0),a=new qT(e,i.Ls),c=a.ou(i.documents),u=Ts.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);Ju(n,t,h.lu);const f=new zT(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),h.snapshot}async function JT(n,e,t){const r=J(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((a=>!Hi(a,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ha(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Za(r.remoteStore,s.targetId),pa(r,s.targetId)})).catch(ur)):(pa(r,s.targetId),await ha(r.localStore,s.targetId,!0))}async function YT(n,e){const t=J(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Za(t.remoteStore,r.targetId))}async function XT(n,e,t){const r=iI(n);try{const s=await(function(a,c){const u=J(a),h=ce.now(),f=c.reduce(((A,C)=>A.add(C.key)),te());let p,E;return u.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let C=$t(),N=te();return u.Ms.getEntries(A,f).next((x=>{C=x,C.forEach(((M,V)=>{V.isValidDocument()||(N=N.add(M))}))})).next((()=>u.localDocuments.getOverlayedDocuments(A,C))).next((x=>{p=x;const M=[];for(const V of c){const B=fw(V,p.get(V.key).overlayedDocument);B!=null&&M.push(new Ln(V.key,B,zd(B.value.mapValue),It.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,M,c)})).next((x=>{E=x;const M=x.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(A,x.batchId,M)}))})).then((()=>({batchId:E.batchId,changes:tf(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.gu[a.currentUser.toKey()];h||(h=new de(ee)),h=h.insert(c,u),a.gu[a.currentUser.toKey()]=h})(r,s.batchId,t),await bs(r,s.changes),await Xi(r.remoteStore)}catch(s){const i=sc(s,"Failed to persist write");t.reject(i)}}async function Lf(n,e){const t=J(n);try{const r=await uT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.mu.get(i);a&&(oe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?oe(a.Iu,14607):s.removedDocuments.size>0&&(oe(a.Iu,42227),a.Iu=!1))})),await bs(t,r,e)}catch(r){await ur(r)}}function Qu(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=J(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const E of p.Ca)E.xa(c)&&(h=!0)})),h&&ac(u)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ZT(n,e,t){const r=J(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new de(q.comparator);a=a.insert(i,Fe.newNoDocument(i,K.min()));const c=te().add(i),u=new ws(K.min(),new Map,new de(ee),a,c);await Lf(r,u),r.du=r.du.remove(i),r.mu.delete(e),uc(r)}else await ha(r.localStore,e,!1).then((()=>pa(r,e,t))).catch(ur)}async function eI(n,e){const t=J(n),r=e.batch.batchId;try{const s=await lT(t.localStore,e);Ff(t,r,null),$f(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await bs(t,s)}catch(s){await ur(s)}}async function tI(n,e,t){const r=J(n);try{const s=await(function(a,c){const u=J(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(oe(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Ff(r,e,t),$f(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await bs(r,s)}catch(s){await ur(s)}}function $f(n,e){(n.pu.get(e)||[]).forEach((t=>{t.resolve()})),n.pu.delete(e)}function Ff(n,e,t){const r=J(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function pa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||Uf(n,r)}))}function Uf(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Za(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),uc(n))}function Ju(n,e,t){for(const r of t)r instanceof Vf?(n.fu.addReference(r.key,e),nI(n,r)):r instanceof Of?(L(lc,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Uf(n,r.key)):G(19791,{Du:r})}function nI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(L(lc,"New document in limbo: "+t),n.Vu.add(r),uc(n))}function uc(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new q(le.fromString(e)),r=n.yu.next();n.mu.set(r,new HT(t)),n.du=n.du.insert(t,r),Cf(n.remoteStore,new xt(Tt(zi(t.path)),r,"TargetPurposeLimboResolution",Bi.ce))}}async function bs(n,e,t){const r=J(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,u)=>{a.push(r.Su(u,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Ya.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(a),r.Eu.J_(s),await(async function(u,h){const f=J(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>k.forEach(h,(E=>k.forEach(E.Ps,(A=>f.persistence.referenceDelegate.addReference(p,E.targetId,A))).next((()=>k.forEach(E.Ts,(A=>f.persistence.referenceDelegate.removeReference(p,E.targetId,A)))))))))}catch(p){if(!hr(p))throw p;L(Xa,"Failed to update sequence numbers: "+p)}for(const p of h){const E=p.targetId;if(!p.fromCache){const A=f.Cs.get(E),C=A.snapshotVersion,N=A.withLastLimboFreeSnapshotVersion(C);f.Cs=f.Cs.insert(E,N)}}})(r.localStore,i))}async function rI(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){L(lc,"User change. New user:",e.toKey());const r=await bf(t.localStore,e);t.currentUser=e,(function(i,a){i.pu.forEach((c=>{c.forEach((u=>{u.reject(new $(R.CANCELLED,a))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await bs(t,r.Os)}}function sI(n,e){const t=J(n),r=t.mu.get(e);if(r&&r.Iu)return te().add(r.key);{let s=te();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function Bf(n){const e=J(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Lf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=sI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ZT.bind(null,e),e.Eu.J_=BT.bind(null,e.eventManager),e.Eu.bu=jT.bind(null,e.eventManager),e}function iI(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=eI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=tI.bind(null,e),e}class Si{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ji(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return cT(this.persistence,new iT,e.initialUser,this.serializer)}Mu(e){return new If(Ja.Ai,this.serializer)}Fu(e){return new pT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Si.provider={build:()=>new Si};class oI extends Si{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){oe(this.persistence.referenceDelegate instanceof bi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new zw(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?Ke.withCacheSize(this.cacheSizeBytes):Ke.DEFAULT;return new If((r=>bi.Ai(r,t)),this.serializer)}}class ga{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=rI.bind(null,this.syncEngine),await $T(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new UT})()}createDatastore(e){const t=Ji(e.databaseInfo.databaseId),r=ET(e.databaseInfo);return AT(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new RT(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Qu(this.syncEngine,t,0)),(function(){return qu.v()?new qu:new gT})())}createSyncEngine(e,t){return(function(s,i,a,c,u,h,f){const p=new GT(s,i,a,c,u,h);return f&&(p.wu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=J(t);L(Rt,"RemoteStore shutting down."),r.Va.add(5),await Is(r),r.ma.shutdown(),r.fa.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ga.provider={build:()=>new ga};/**
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
 */class hc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):Lt("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const cn="FirestoreClient";class aI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=We.UNAUTHENTICATED,this.clientId=La.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{L(cn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(L(cn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=sc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Bo(n,e){n.asyncQueue.verifyOperationInProgress(),L(cn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await bf(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Yu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await cI(n);L(cn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Hu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Hu(e.remoteStore,s))),n._onlineComponents=e}async function cI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(cn,"Using user provided OfflineComponentProvider");try{await Bo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Zn("Error using user provided cache. Falling back to memory cache: "+t),await Bo(n,new Si)}}else L(cn,"Using default OfflineComponentProvider"),await Bo(n,new oI(void 0));return n._offlineComponents}async function jf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(cn,"Using user provided OnlineComponentProvider"),await Yu(n,n._uninitializedComponentsProvider._online)):(L(cn,"Using default OnlineComponentProvider"),await Yu(n,new ga))),n._onlineComponents}function lI(n){return jf(n).then((e=>e.syncEngine))}async function Ri(n){const e=await jf(n),t=e.eventManager;return t.onListen=WT.bind(null,e.syncEngine),t.onUnlisten=JT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=KT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=YT.bind(null,e.syncEngine),t}function uI(n,e,t,r){const s=new hc(r),i=new cc(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>ic(await Ri(n),i))),()=>{s.ku(),n.asyncQueue.enqueueAndForget((async()=>oc(await Ri(n),i)))}}function hI(n,e,t={}){const r=new Vt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new hc({next:E=>{f.ku(),a.enqueueAndForget((()=>oc(i,p)));const A=E.docs.has(c);!A&&E.fromCache?h.reject(new $(R.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&E.fromCache&&u&&u.source==="server"?h.reject(new $(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(E)},error:E=>h.reject(E)}),p=new cc(zi(c.path),f,{includeMetadataChanges:!0,$a:!0});return ic(i,p)})(await Ri(n),n.asyncQueue,e,t,r))),r.promise}function dI(n,e,t={}){const r=new Vt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new hc({next:E=>{f.ku(),a.enqueueAndForget((()=>oc(i,p))),E.fromCache&&u.source==="server"?h.reject(new $(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(E)},error:E=>h.reject(E)}),p=new cc(c,f,{includeMetadataChanges:!0,$a:!0});return ic(i,p)})(await Ri(n),n.asyncQueue,e,t,r))),r.promise}function fI(n,e){const t=new Vt;return n.asyncQueue.enqueueAndForget((async()=>XT(await lI(n),e,t))),t.promise}/**
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
 */function qf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const mI="ComponentProvider",Xu=new Map;function pI(n,e,t,r,s){return new VE(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,qf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const gI="firestore.googleapis.com",Zu=!0;class eh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new $(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gI,this.ssl=Zu}else this.host=e.host,this.ssl=e.ssl??Zu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=wf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Tf)throw new $(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}IE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=qf(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new $(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new $(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new $(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class dc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new eh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new $(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new eh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new mE;switch(r.type){case"firstParty":return new _E(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new $(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Xu.get(t);r&&(L(mI,"Removing Datastore"),Xu.delete(t),r.terminate())})(this),Promise.resolve()}}/**
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
 */class Ft{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ft(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Zt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(vs(t,_e._jsonSchema))return new _e(e,r||null,new q(le.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:we("string",_e._jsonSchemaVersion),referencePath:we("string")};class Zt extends Ft{constructor(e,t,r){super(e,t,zi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new q(e))}withConverter(e){return new Zt(this.firestore,e,this._path)}}function Zi(n,e,...t){if(n=Re(n),Nd("collection","path",e),n instanceof dc){const r=le.fromString(e,...t);return fu(r),new Zt(n,null,r)}{if(!(n instanceof _e||n instanceof Zt))throw new $(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return fu(r),new Zt(n.firestore,null,r)}}function eo(n,e,...t){if(n=Re(n),arguments.length===1&&(e=La.newId()),Nd("doc","path",e),n instanceof dc){const r=le.fromString(e,...t);return du(r),new _e(n,null,new q(r))}{if(!(n instanceof _e||n instanceof Zt))throw new $(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return du(r),new _e(n.firestore,n instanceof Zt?n.converter:null,new q(r))}}/**
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
 */const th="AsyncQueue";class nh{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Sf(this,"async_queue_retry"),this.cc=()=>{const r=Uo();r&&L(th,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=Uo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=Uo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new Vt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!hr(e))throw e;L(th,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,Lt("INTERNAL UNHANDLED ERROR: ",rh(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=rc.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&G(47125,{Ec:rh(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function rh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Dn extends dc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new nh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new nh(e),this._firestoreClient=void 0,await e}}}function _I(n,e,t){t||(t=gi);const r=Mi(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Cn(i,e))return s;throw new $(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new $(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Tf)throw new $(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Vn(e.host)&&Ta(e.host),r.initialize({options:e,instanceIdentifier:t})}function to(n){if(n._terminated)throw new $(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yI(n),n._firestoreClient}function yI(n){const e=n._freezeSettings(),t=pI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new aI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
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
 */class nt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nt(Ne.fromBase64String(e))}catch(t){throw new $(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new nt(Ne.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(vs(e,nt._jsonSchema))return nt.fromBase64String(e.bytes)}}nt._jsonSchemaVersion="firestore/bytes/1.0",nt._jsonSchema={type:we("string",nt._jsonSchemaVersion),bytes:we("string")};/**
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
 */class zf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new $(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class fc{constructor(e){this._methodName=e}}/**
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
 */class At{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new $(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new $(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:At._jsonSchemaVersion}}static fromJSON(e){if(vs(e,At._jsonSchema))return new At(e.latitude,e.longitude)}}At._jsonSchemaVersion="firestore/geoPoint/1.0",At._jsonSchema={type:we("string",At._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};/**
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
 */class ut{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(vs(e,ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new ut(e.vectorValues);throw new $(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ut._jsonSchemaVersion="firestore/vectorValue/1.0",ut._jsonSchema={type:we("string",ut._jsonSchemaVersion),vectorValues:we("object")};/**
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
 */const vI=/^__.*__$/;class EI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ln(e,this.data,this.fieldMask,t,this.fieldTransforms):new Es(e,this.data,t,this.fieldTransforms)}}function Hf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{dataSource:n})}}class mc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new mc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Ci(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if(Hf(this.dataSource)&&vI.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class wI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ji(e)}V(e,t,r,s=!1){return new mc({dataSource:e,methodName:t,targetDoc:r,path:xe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gf(n){const e=n._freezeSettings(),t=Ji(n._databaseId);return new wI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function TI(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);Qf("Data must be an object, but it was:",a,r);const c=Wf(r,a);let u,h;if(i.merge)u=new at(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const E=no(e,p,t);if(!a.contains(E))throw new $(R.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);SI(f,E)||f.push(E)}u=new at(f),h=a.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=a.fieldTransforms;return new EI(new tt(c),u,h)}class pc extends fc{_toFieldTransform(e){return new lw(e.path,new as)}isEqual(e){return e instanceof pc}}function II(n,e,t,r=!1){return gc(t,n.V(r?4:3,e))}function gc(n,e){if(Kf(n=Re(n)))return Qf("Unsupported field value:",e,n),Wf(n,e);if(n instanceof fc)return(function(r,s){if(!Hf(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let u=gc(c,s.Sc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Re(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ow(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ce.fromDate(r);return{timestampValue:Ii(s.serializer,i)}}if(r instanceof ce){const i=new ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ii(s.serializer,i)}}if(r instanceof At)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof nt)return{bytesValue:ff(s.serializer,r._byteString)};if(r instanceof _e){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ka(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ut)return(function(a,c){const u=a instanceof ut?a.toArray():a;return{mapValue:{fields:{[Bd]:{stringValue:jd},[_i]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return Wi(c.serializer,f)}))}}}}}})(r,s);if(Ef(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Ui(r)}`)})(n,e)}function Wf(n,e){const t={};return Od(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):On(n,((r,s)=>{const i=gc(s,e.gc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Kf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof At||n instanceof nt||n instanceof _e||n instanceof fc||n instanceof ut||Ef(n))}function Qf(n,e,t){if(!Kf(t)||!Dd(t)){const r=Ui(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function no(n,e,t){if((e=Re(e))instanceof zf)return e._internalPath;if(typeof e=="string")return AI(n,e);throw Ci("Field path arguments must be of type string or ",n,!1,void 0,t)}const bI=new RegExp("[~\\*/\\[\\]]");function AI(n,e,t){if(e.search(bI)>=0)throw Ci(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new zf(...e.split("."))._internalPath}catch{throw Ci(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ci(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new $(R.INVALID_ARGUMENT,c+n+u)}function SI(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class RI{convertValue(e,t="none"){switch(sn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return On(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[_i].arrayValue?.values?.map((r=>ge(r.doubleValue)));return new ut(t)}convertGeoPoint(e){return new At(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=qi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ns(e));default:return null}}convertTimestamp(e){const t=nn(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=le.fromString(e);oe(vf(r),9688,{name:e});const s=new rs(r.get(1),r.get(3)),i=new q(r.popFirst(5));return s.isEqual(t)||Lt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class _c extends RI{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}function sh(){return new pc("serverTimestamp")}const ih="@firebase/firestore",oh="4.15.0";/**
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
 */function ah(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
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
 */class Jf{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new CI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(no("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class CI extends Jf{data(){return super.data()}}/**
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
 */function Yf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new $(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class yc{}class vc extends yc{}function ro(n,e,...t){let r=[];e instanceof yc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof wc)).length,c=i.filter((u=>u instanceof Ec)).length;if(a>1||a>0&&c>0)throw new $(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Ec extends vc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=this._parse(e);return Zf(e._query,t),new Ft(e.firestore,e.converter,oa(e._query,t))}_parse(e){const t=Gf(e.firestore);return(function(i,a,c,u,h,f,p){let E;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new $(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){lh(p,f);const C=[];for(const N of p)C.push(ch(u,i,N));E={arrayValue:{values:C}}}else E=ch(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||lh(p,f),E=II(c,a,p,f==="in"||f==="not-in");return Ee.create(h,f,E)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class wc extends yc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new wc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:dt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Zf(a,u),a=oa(a,u)})(e._query,t),new Ft(e.firestore,e.converter,oa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tc extends vc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tc(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new $(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new $(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new os(i,a)})(e._query,this._field,this._direction);return new Ft(e.firestore,e.converter,XE(e._query,t))}}function so(n,e="asc"){const t=e,r=no("orderBy",n);return Tc._create(r,t)}class Ic extends vc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ic(e,t,r)}_apply(e){return new Ft(e.firestore,e.converter,vi(e._query,this._limit,this._limitType))}}function Xf(n){return Ic._create("limit",n,"F")}function ch(n,e,t){if(typeof(t=Re(t))=="string"){if(t==="")throw new $(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Yd(e)&&t.indexOf("/")!==-1)throw new $(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(le.fromString(t));if(!q.isDocumentKey(r))throw new $(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return wu(n,new q(r))}if(t instanceof _e)return wu(n,t._key);throw new $(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ui(t)}.`)}function lh(n,e){if(!Array.isArray(n)||n.length===0)throw new $(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zf(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new $(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new $(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function PI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Br{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sn extends Jf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ni(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(no("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new $(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Sn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Sn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Sn._jsonSchema={type:we("string",Sn._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};class ni extends Sn{data(e={}){return super.data(e)}}class Rn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Br(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ni(this._firestore,this._userDataWriter,r.key,r,new Br(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new $(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Br(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Br(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:kI(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new $(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Rn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=La.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function kI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
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
 */Rn._jsonSchemaVersion="firestore/querySnapshot/1.0",Rn._jsonSchema={type:we("string",Rn._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};/**
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
 */function xI(n){n=wt(n,_e);const e=wt(n.firestore,Dn),t=to(e);return hI(t,n._key).then((r=>rm(e,n,r)))}function em(n){n=wt(n,Ft);const e=wt(n.firestore,Dn),t=to(e),r=new _c(e);return Yf(n._query),dI(t,n._query).then((s=>new Rn(e,r,n,s)))}function NI(n,e,t){n=wt(n,_e);const r=wt(n.firestore,Dn),s=PI(n.converter,e),i=Gf(r);return nm(r,[TI(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,It.none())])}function tm(n){return nm(wt(n.firestore,Dn),[new Ha(n._key,It.none())])}function bc(n,...e){n=Re(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ah(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ah(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,a,c;if(n instanceof _e)a=wt(n.firestore,Dn),c=zi(n._key.path),i={next:h=>{e[r]&&e[r](rm(a,n,h))},error:e[r+1],complete:e[r+2]};else{const h=wt(n,Ft);a=wt(h.firestore,Dn),c=h._query;const f=new _c(a);i={next:p=>{e[r]&&e[r](new Rn(a,f,h,p))},error:e[r+1],complete:e[r+2]},Yf(n._query)}const u=to(a);return uI(u,c,s,i)}function nm(n,e){const t=to(n);return fI(t,e)}function rm(n,e,t){const r=t.docs.get(e._key),s=new _c(n);return new Sn(n,s,e._key,r,new Br(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){dE(ar),Pn(new en("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Dn(new pE(r.getProvider("auth-internal")),new yE(a,r.getProvider("app-check-internal")),OE(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),vt(ih,oh,e),vt(ih,oh,"esm2020")})();/**
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
 */const DI="type.googleapis.com/google.protobuf.Int64Value",VI="type.googleapis.com/google.protobuf.UInt64Value";function sm(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Pi(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Pi(e));if(typeof n=="function"||typeof n=="object")return sm(n,e=>Pi(e));throw new Error("Data cannot be encoded in JSON: "+n)}function sr(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case DI:case VI:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>sr(e)):typeof n=="function"||typeof n=="object"?sm(n,e=>sr(e)):n}/**
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
 */const Ac="functions";/**
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
 */const uh={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Je extends ft{constructor(e,t,r){super(`${Ac}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,Je.prototype)}}function OI(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ki(n,e){let t=OI(n),r=t,s;try{const i=e&&e.error;if(i){const a=i.status;if(typeof a=="string"){if(!uh[a])return new Je("internal","internal");t=uh[a],r=a}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=sr(s))}}catch{}return t==="ok"?null:new Je(t,r,s)}/**
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
 */class MI{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Qe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{return(await this.auth.getToken())?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const _a="us-central1",LI=/^data: (.*?)(?:\n|$)/;function $I(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Je("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class FI{constructor(e,t,r,s,i=_a,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new MI(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=_a}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function UI(n,e,t){const r=Vn(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&Ta(n.emulatorOrigin+"/backends")}function BI(n,e,t){const r=s=>qI(n,e,s,{});return r.stream=(s,i)=>HI(n,e,s,i),r}function im(n){return n.emulatorOrigin&&Vn(n.emulatorOrigin)?"include":void 0}async function jI(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:im(s)})}catch{return{status:0,json:null}}let a=null;try{a=await i.json()}catch{}return{status:i.status,json:a}}async function om(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function qI(n,e,t,r){const s=n._url(e);return zI(n,s,t,r)}async function zI(n,e,t,r){t=Pi(t);const s={data:t},i=await om(n,r),a=r.timeout||7e4,c=$I(a),u=await Promise.race([jI(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new Je("cancelled","Firebase Functions instance was deleted.");const h=ki(u.status,u.json);if(h)throw h;if(!u.json)throw new Je("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new Je("internal","Response is missing data field.");return{data:sr(f)}}function HI(n,e,t,r){const s=n._url(e);return GI(n,s,t,r||{})}async function GI(n,e,t,r){t=Pi(t);const s={data:t},i=await om(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let a;try{a=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r?.signal,credentials:im(n)})}catch(E){if(E instanceof Error&&E.name==="AbortError"){const C=new Je("cancelled","Request was cancelled.");return{data:Promise.reject(C),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(C)}}}}}}const A=ki(0,null);return{data:Promise.reject(A),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(A)}}}}}}let c,u;const h=new Promise((E,A)=>{c=E,u=A});r?.signal?.addEventListener("abort",()=>{const E=new Je("cancelled","Request was cancelled.");u(E)});const f=a.body.getReader(),p=WI(f,c,u,r?.signal);return{stream:{[Symbol.asyncIterator](){const E=p.getReader();return{async next(){const{value:A,done:C}=await E.read();return{value:A,done:C}},async return(){return await E.cancel(),{done:!0,value:void 0}}}}},data:h}}function WI(n,e,t,r){const s=(a,c)=>{const u=a.match(LI);if(!u)return;const h=u[1];try{const f=JSON.parse(h);if("result"in f){e(sr(f.result));return}if("message"in f){c.enqueue(sr(f.message));return}if("error"in f){const p=ki(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof Je){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r?.aborted){const h=new Je("cancelled","Request was cancelled");return a.error(h),t(h),Promise.resolve()}try{const{value:h,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),a),a.close();return}if(r?.aborted){const E=new Je("cancelled","Request was cancelled");a.error(E),t(E),await n.cancel();return}c+=i.decode(h,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const E of p)E.trim()&&s(E.trim(),a);return u()}catch(h){const f=h instanceof Je?h:ki(0,null);a.error(f),t(f)}}},cancel(){return n.cancel()}})}const hh="@firebase/functions",dh="0.13.5";/**
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
 */const KI="auth-internal",QI="app-check-internal",JI="messaging-internal";function YI(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(KI),a=t.getProvider(JI),c=t.getProvider(QI);return new FI(s,i,a,c,r)};Pn(new en(Ac,e,"PUBLIC").setMultipleInstances(!0)),vt(hh,dh,n),vt(hh,dh,"esm2020")}/**
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
 */function XI(n=Aa(),e=_a){const r=Mi(Re(n),Ac).getImmediate({identifier:e}),s=Tg("functions");return s&&ZI(r,...s),r}function ZI(n,e,t){UI(Re(n),e,t)}function io(n,e,t){return BI(Re(n),e)}YI();const jr={apiKey:"AIzaSyBdkhrlBR-Q2S19LJAPA8WsMBXYcLUP_pA",authDomain:typeof window<"u"&&window.location.hostname==="meal.amritr.xyz"?"meal.amritr.xyz":"meal-tracker-46346.firebaseapp.com",projectId:"meal-tracker-46346",storageBucket:"meal-tracker-46346.firebasestorage.app",messagingSenderId:"134287587849",appId:"1:134287587849:web:1bab3a94fa9c197e6896d8",measurementId:""},eb=!!(jr.apiKey&&jr.authDomain&&jr.projectId&&jr.appId),Sc=$_().length?Aa():jh(jr),In=cE(Sc),mn=_I(Sc,{experimentalForceLongPolling:!0}),oo=XI(Sc),tb="WiIKxxa28abvJzcfpVdmBJ0gmeJ3",nb="demo@meal-signal.app",am="DemoMealSignal!2026",ir="Demo mode is read-only. Sign out and create or use your own account to save changes.",rb=!!am;function fh(n){return!!(n&&n.uid===tb)}const sb={"auth/email-already-in-use":"An account already exists for that email address.","auth/invalid-credential":"Email or password is incorrect.","auth/invalid-email":"Enter a valid email address.","auth/network-request-failed":"The sign-in service could not be reached. Try again shortly.","auth/operation-not-allowed":"This sign-in method is not enabled for this app.","auth/popup-closed-by-user":"Google sign-in was closed before it finished.","auth/popup-blocked":"The browser blocked the Google sign-in popup.","auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.","auth/unauthorized-domain":"This domain is not authorized for Firebase sign-in.","auth/user-disabled":"This account has been disabled.","auth/weak-password":"Use a password with at least 6 characters.","functions/failed-precondition":"The request cannot be completed yet.","functions/invalid-argument":"Some submitted information is invalid.","functions/not-found":"The requested record was not found.","functions/permission-denied":"You do not have access to that record.","functions/resource-exhausted":"The request is too large or the service is busy.","functions/unauthenticated":"Sign in before making changes.","permission-denied":"You do not have access to this data.",unavailable:"The service is temporarily unavailable. Try again shortly."};function He(n,e){return n instanceof ft?sb[n.code]??n.message??e:n instanceof Error&&n.message||e}var ib=z('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="grid size-11 place-items-center rounded-lg bg-brand text-background"></div><div><h1 class="text-xl font-semibold">Meal Signal</h1><p class="text-sm text-muted">Private meal and symptom tracking</p></div></div><form class="grid gap-4"><label class="grid gap-1 text-sm font-medium text-muted-strong">Email<span class=relative><input class="h-11 w-full rounded-lg border border-border-strong bg-surface pl-10 pr-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=email autocomplete=email required></span></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Password<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=password minlength=6 required></label><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"></button></form><div class="my-4 flex items-center gap-3 text-xs font-medium uppercase text-muted"><span class="h-px flex-1 bg-border"></span>Or<span class="h-px flex-1 bg-border"></span></div><button type=button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60">Continue with Google</button><button type=button class="mt-4 w-full text-center text-sm font-medium text-brand">'),ob=z('<p class="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger"aria-live=polite>'),ab=z('<button type=button class="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand bg-brand-soft px-4 text-sm font-semibold text-brand transition hover:border-brand-hover disabled:cursor-not-allowed disabled:opacity-60">View demo');function cb(n){const[e,t]=X("signin"),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1),[h,f]=X("");async function p(C){C.preventDefault(),u(!0),f("");try{if(e()==="signin"){const N=await Zl(In,r(),i());n.onAuthenticated?.(N.user)}else{const N=await Wy(In,r(),i());n.onAuthenticated?.(N.user)}}catch(N){f(He(N,"Authentication failed."))}finally{u(!1)}}async function E(){u(!0),f("");try{const C=new Ct;C.setCustomParameters({prompt:"select_account"});const N=await _v(In,C);n.onAuthenticated?.(N.user)}catch(C){f(He(C,"Google sign-in failed."))}finally{u(!1)}}async function A(){u(!0),f("");try{const C=await Zl(In,nb,am);n.onAuthenticated?.(C.user)}catch(C){f(He(C,"Demo sign-in failed."))}finally{u(!1)}}return(()=>{var C=ib(),N=C.firstChild,x=N.firstChild,M=x.firstChild,V=x.nextSibling,B=V.firstChild,U=B.firstChild,Z=U.nextSibling,j=Z.firstChild,v=B.nextSibling,_=v.firstChild,y=_.nextSibling,I=v.nextSibling,w=V.nextSibling,T=w.nextSibling;T.firstChild;var g=T.nextSibling;return P(M,D(Jr,{size:20,"aria-hidden":!0})),V.addEventListener("submit",p),P(Z,D(ng,{class:"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",size:17,"aria-hidden":!0}),j),j.$$input=F=>s(F.target.value),y.$$input=F=>a(F.target.value),P(V,(()=>{var F=se(()=>!!h());return()=>F()?(()=>{var W=ob();return P(W,h),W})():null})(),I),P(I,(()=>{var F=se(()=>!!c());return()=>F()?"Working...":e()==="signin"?"Sign in":"Create account"})(),null),P(I,D(kl,{size:17,"aria-hidden":!0}),null),T.$$click=E,P(T,D(kl,{size:17,"aria-hidden":!0}),null),P(N,rb?(()=>{var F=ab(),W=F.firstChild;return F.$$click=A,P(F,D(Hp,{size:17,"aria-hidden":!0}),W),Q(()=>F.disabled=c()),F})():null,g),g.$$click=()=>t(e()==="signin"?"signup":"signin"),P(g,()=>e()==="signin"?"Create a new account":"Sign in instead"),Q(F=>{var W=e()==="signin"?"current-password":"new-password",Ve=c(),Oe=c();return W!==F.e&&ie(y,"autocomplete",F.e=W),Ve!==F.t&&(I.disabled=F.t=Ve),Oe!==F.a&&(T.disabled=F.a=Oe),F},{e:void 0,t:void 0,a:void 0}),Q(()=>j.value=r()),Q(()=>y.value=i()),C})()}un(["input","click"]);const lb=io(oo,"createMeal"),ub=io(oo,"createGiEvent"),hb=io(oo,"analyzeCorrelations"),db=io(oo,"reanalyzeMeal");async function fb(n){return(await lb(n)).data.meal}async function mb(n){return(await ub(n)).data.event}async function pb(){return(await hb()).data.analysis}async function gb(n){return(await db({mealId:n})).data.meal}function xi(n){const e=n.getTimezoneOffset();return new Date(n.getTime()-e*6e4).toISOString().slice(0,16)}function mh(n){const e=Date.now()-n.getTime(),t=Math.round(e/6e4);if(t<1)return"just now";if(t<60)return`${t}m ago`;const r=Math.round(t/60);if(r<24)return`${r}h ago`;const s=Math.round(r/24);return s<7?`${s}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===new Date().getFullYear()?void 0:"numeric"})}const _b=["cramping","bloating","reflux","nausea","diarrhea","constipation","gas","pain"],ph=5*1024*1024;var cm=z("<button type=button>"),yb=z('<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),lm=z("<p aria-live=polite>"),vb=z('<div class="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-sm"><div class="mb-2 text-brand"></div><p class="truncate text-xs font-medium uppercase text-muted"></p><p class="truncate text-lg font-semibold">'),Eb=z("<div>"),wb=z('<div class="grid place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-muted"><div class="mb-2 text-muted"></div><p class="text-sm font-medium">'),Tb=z('<main class="grid min-h-screen place-items-center bg-background text-muted-strong">'),Ib=z('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><h1 class="mb-2 text-lg font-semibold">Firebase config missing</h1><p class="text-sm text-muted-strong">Add the Firebase Web App values to `.env.local` or the Vite environment variables.');function gh(n){return(()=>{var e=cm();return Ea(e,"click",n.onClick,!0),P(e,()=>n.icon,null),P(e,()=>n.children,null),Q(t=>or(e,{"flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition":!0,"bg-brand text-background shadow-sm":n.active,"text-muted-strong hover:bg-surface-muted":!n.active},t)),e})()}function jo(n){return(()=>{var e=cm();return Ea(e,"click",n.onClick,!0),P(e,()=>n.icon,null),P(e,()=>n.children,null),Q(t=>or(e,{"flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition":!0,"border-brand bg-brand text-background":n.active,"border-border-strong bg-surface text-muted-strong hover:border-muted":!n.active},t)),e})()}function um(n){const e=()=>n.tone==="error"?"text-danger":n.tone==="success"?"text-brand":"text-muted-strong";return(()=>{var t=yb(),r=t.firstChild;return P(r,(()=>{var s=se(()=>!!n.busy);return()=>s()?"Saving...":n.label})(),null),P(r,(()=>{var s=se(()=>!!n.busy);return()=>s()?D(Vi,{class:"animate-spin",size:16,"aria-hidden":!0}):D(xh,{size:16,"aria-hidden":!0})})(),null),P(t,(()=>{var s=se(()=>!!n.message);return()=>s()?(()=>{var i=lm();return P(i,()=>n.message),Q(()=>va(i,`text-sm ${e()}`)),i})():null})(),null),Q(()=>r.disabled=n.disabled),t})()}function qo(n){return(()=>{var e=vb(),t=e.firstChild,r=t.nextSibling,s=r.nextSibling;return P(t,()=>n.icon),P(r,()=>n.label),P(s,()=>n.value),e})()}function _h(n){return(()=>{var e=Eb();return P(e,(()=>{var t=se(()=>!!n.ready);return()=>t()?D(xh,{size:16,"aria-hidden":!0}):D(Nh,{size:16,"aria-hidden":!0})})(),null),P(e,(()=>{var t=se(()=>!!n.ready);return()=>t()?n.label:"No media selected"})(),null),Q(t=>or(e,{"flex items-center gap-2 text-sm":!0,"text-brand":n.ready,"text-muted":!n.ready},t)),e})()}function hm(n){return(()=>{var e=wb(),t=e.firstChild,r=t.nextSibling;return P(t,()=>n.icon),P(r,()=>n.title),e})()}function Ni(n){const e=()=>n.tone==="error"?"border-danger/30 bg-danger-soft text-danger-strong":"border-border bg-surface-muted text-muted-strong";return(()=>{var t=lm();return P(t,()=>n.children),Q(()=>va(t,`rounded-lg border px-3 py-2 text-sm ${e()}`)),t})()}function bb(){return(()=>{var n=Tb();return P(n,D(Vi,{class:"animate-spin",size:22,"aria-label":"Loading"})),n})()}function Ab(){return Ib()}un(["click"]);var Sb=z('<svg class="h-12 w-20 shrink-0"viewBox="0 0 80 48"role=img>'),Rb=z("<svg><circle cx=22 cy=26 r=7 stroke-width=2></svg>",!1,!0,!1),Cb=z("<svg><circle cx=38 cy=20 r=6 stroke-width=2></svg>",!1,!0,!1),Pb=z("<svg><circle cx=52 cy=29 r=7 stroke-width=2></svg>",!1,!0,!1),kb=z("<svg><circle cx=62 cy=18 r=5 stroke-width=2></svg>",!1,!0,!1),xb=z("<svg><ellipse cx=40 cy=25 rx=29 ry=11 stroke-width=2></svg>",!1,!0,!1),Nb=z('<svg><path d="M18 24c8-8 16 7 24-1s14 6 22-1"fill=none stroke=#f3efe7 stroke-width=3></svg>',!1,!0,!1),Db=z("<svg><ellipse cx=40 cy=25 rx=30 ry=10 stroke-width=2></svg>",!1,!0,!1),Vb=z('<svg><path d="M25 18l5 8M40 16l-3 10M53 19l-5 8"stroke=#f3efe7 stroke-width=3 stroke-linecap=round></svg>',!1,!0,!1),Ob=z('<svg><path d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"stroke-width=2></svg>',!1,!0,!1),Mb=z("<svg><ellipse cx=24 cy=27 rx=11 ry=9 stroke-width=2></svg>",!1,!0,!1),Lb=z("<svg><ellipse cx=43 cy=22 rx=12 ry=9 stroke-width=2></svg>",!1,!0,!1),$b=z("<svg><ellipse cx=57 cy=31 rx=10 ry=8 stroke-width=2></svg>",!1,!0,!1),Fb=z('<svg><path d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z"stroke-width=2></svg>',!1,!0,!1),Ub=z('<svg><path d="M29 22l-6 5M43 20l4 6M53 33l-7 4"stroke=#f3efe7 stroke-width=2 stroke-linecap=round></svg>',!1,!0,!1),Bb=z("<svg><ellipse cx=40 cy=29 rx=31 ry=10 fill=#8b6f47 opacity=0.55></svg>",!1,!0,!1),jb=z("<svg><ellipse cx=31 cy=26 rx=9 ry=4 opacity=0.7></svg>",!1,!0,!1),qb=z("<svg><ellipse cx=52 cy=31 rx=11 ry=4 opacity=0.6></svg>",!1,!0,!1),zb=z('<svg><path d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"stroke-width=2></svg>',!1,!0,!1),Hb=z('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">GI event</h2><p class="text-sm text-muted">Record timing, severity, and symptoms.</p></div></div><form class="grid gap-4"><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Occurred at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Severity: <input class="h-11 accent-brand"type=range min=1 max=10></label></div><div class="grid gap-2"><span class="text-sm font-medium text-muted-strong">Symptoms</span><div class="flex flex-wrap gap-2"></div></div><div class="grid gap-4 sm:grid-cols-3"><div class="grid gap-2 text-sm font-medium text-muted-strong sm:col-span-1"><a class="w-fit underline decoration-border-strong underline-offset-4 transition hover:text-brand hover:decoration-brand"href=https://en.wikipedia.org/wiki/Bristol_stool_scale target=_blank rel=noreferrer>Stool type</a><div class="rounded-lg border border-border-strong bg-surface p-3"><div class="mb-3 flex min-h-14 items-center gap-3"><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><p class="text-base font-semibold text-foreground"></p></div><p class="line-clamp-2 text-xs font-medium text-muted"></p></div></div><input class="h-6 w-full accent-brand"type=range min=1 max=7 step=1 aria-label="Bristol stool type"><div class="mt-1 flex justify-between text-[11px] font-medium text-muted"><span>1</span><span>7</span></div></div></div><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Minutes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=number min=1 max=1440></label><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20">'),Gb=z("<button type=button>"),Wb=z('<button type=button class="rounded px-1.5 py-0.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-muted-strong">Clear');const Kb=[{value:1,label:"Separate hard lumps"},{value:2,label:"Lumpy sausage"},{value:3,label:"Cracked sausage"},{value:4,label:"Smooth soft sausage"},{value:5,label:"Soft blobs"},{value:6,label:"Mushy pieces"},{value:7,label:"Watery"}];function Qb(n){const e=Number(n);return Kb.find(t=>t.value===e)??null}function Jb(n){const e=()=>n.type?"#5f4b32":"#d6d3d1",t=()=>n.type?"#3f3323":"#a8a29e";return(()=>{var r=Sb();return P(r,(()=>{var s=se(()=>n.type===1);return()=>s()?[(()=>{var i=Rb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=Cb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=Pb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=kb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})()]:null})(),null),P(r,(()=>{var s=se(()=>n.type===2);return()=>s()?[(()=>{var i=xb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),Nb()]:null})(),null),P(r,(()=>{var s=se(()=>n.type===3);return()=>s()?[(()=>{var i=Db();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),Vb()]:null})(),null),P(r,(()=>{var s=se(()=>n.type===4);return()=>s()?(()=>{var i=Ob();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})():null})(),null),P(r,(()=>{var s=se(()=>n.type===5);return()=>s()?[(()=>{var i=Mb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=Lb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=$b();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})()]:null})(),null),P(r,(()=>{var s=se(()=>n.type===6);return()=>s()?[(()=>{var i=Fb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),Ub()]:null})(),null),P(r,(()=>{var s=se(()=>n.type===7);return()=>s()?[Bb(),(()=>{var i=jb();return Q(()=>ie(i,"fill",e())),i})(),(()=>{var i=qb();return Q(()=>ie(i,"fill",e())),i})()]:null})(),null),P(r,(()=>{var s=se(()=>!n.type);return()=>s()?(()=>{var i=zb();return Q(a=>{var c=e(),u=t();return c!==a.e&&ie(i,"fill",a.e=c),u!==a.t&&ie(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})():null})(),null),Q(()=>ie(r,"aria-label",n.type?`Bristol stool type ${n.type}`:"No stool type selected")),r})()}function Yb(n){const[e,t]=X(xi(new Date)),[r,s]=X(4),[i,a]=X([]),[c,u]=X(""),[h,f]=X(""),[p,E]=X(""),[A,C]=X(!1),[N,x]=X(""),[M,V]=X("info"),B=()=>Qb(h());function U(j){const v=i();a(v.includes(j)?v.filter(_=>_!==j):[...v,j])}async function Z(j){if(j.preventDefault(),C(!0),x(""),V("info"),n.readOnly){x(ir),C(!1);return}const v=new Date(e());if(Number.isNaN(v.getTime())){V("error"),x("Choose a valid event time."),C(!1);return}if(i().length===0&&!h()){V("error"),x("Choose a symptom or stool type."),C(!1);return}try{await mb({occurredAt:v.toISOString(),severity:r(),symptoms:i(),notes:c().trim()||void 0,stoolType:h()?Number(h()):void 0,durationMinutes:p()?Number(p()):void 0}),t(xi(new Date)),s(4),a([]),u(""),f(""),E(""),V("success"),x("Event saved.")}catch(_){V("error"),x(He(_,"Event could not be saved."))}finally{C(!1)}}return(()=>{var j=Hb(),v=j.firstChild;v.firstChild;var _=v.nextSibling,y=_.firstChild,I=y.firstChild,w=I.firstChild,T=w.nextSibling,g=I.nextSibling,F=g.firstChild,W=F.nextSibling,Ve=y.nextSibling,Oe=Ve.firstChild,Ye=Oe.nextSibling,Ge=Ve.nextSibling,Ze=Ge.firstChild,et=Ze.firstChild,mt=et.nextSibling,je=mt.firstChild,ye=je.firstChild,me=ye.firstChild,Me=me.firstChild,st=me.nextSibling,pt=je.nextSibling,mr=Ze.nextSibling,co=mr.firstChild,As=co.nextSibling,Ss=mr.nextSibling,pr=Ss.firstChild,gr=pr.nextSibling;return P(v,D(kh,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),_.addEventListener("submit",Z),T.$$input=he=>t(he.target.value),P(g,r,W),W.addEventListener("change",he=>s(Number(he.target.value))),P(Ye,()=>_b.map(he=>(()=>{var it=Gb();return it.$$click=()=>U(he),P(it,he),Q(_r=>or(it,{"h-9 rounded-md border px-3 text-sm font-medium transition":!0,"border-brand bg-brand text-background":i().includes(he),"border-border-strong bg-surface text-muted-strong hover:border-muted":!i().includes(he)},_r)),it})())),P(je,D(Jb,{get type(){return B()?.value??null}}),ye),P(Me,(()=>{var he=se(()=>!!B());return()=>he()?`Type ${B().value}`:"Not set"})()),P(me,(()=>{var he=se(()=>!!B());return()=>he()?(()=>{var it=Wb();return it.$$click=()=>f(""),it})():null})(),null),P(st,()=>B()?.label??"Move slider to set"),pt.$$keydown=he=>{!h()&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(he.key)&&f("4")},pt.addEventListener("change",he=>f(he.target.value)),pt.$$pointerdown=()=>f(he=>he||"4"),As.$$input=he=>E(he.target.value),gr.$$input=he=>u(he.target.value),P(_,D(um,{get busy(){return A()},get disabled(){return se(()=>i().length===0)()&&!h()||A()},get message(){return N()},get tone(){return M()},label:"Save event"}),null),Q(()=>T.value=e()),Q(()=>W.value=r()),Q(()=>pt.value=h()||"4"),Q(()=>As.value=p()),Q(()=>gr.value=c()),j})()}un(["input","pointerdown","keydown","click"]);var Xb=z('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">Meal</h2><p class="text-sm text-muted">Capture what you ate and when.</p></div></div><form class="grid gap-4"><div class="grid grid-cols-3 gap-2"></div><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Eaten at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Portion, stress, meds">'),Zb=z('<label class="grid gap-1 text-sm font-medium text-muted-strong">Meal text<textarea class="min-h-28 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Turkey sandwich, chips, iced coffee">'),eA=z('<div class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3"><button type=button>'),tA=z('<label class="grid gap-3 rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 text-sm font-medium text-muted-strong"><span class="flex items-center gap-2">Meal photo</span><input class="block w-full text-sm text-muted-strong file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"type=file accept=image/* capture=environment>');function nA(n){const[e,t]=X("text"),[r,s]=X(""),[i,a]=X(""),[c,u]=X(xi(new Date)),[h,f]=X(""),[p,E]=X(""),[A,C]=X(!1),[N,x]=X(!1),[M,V]=X(""),[B,U]=X("info");let Z=null,j=null,v=[];oi(()=>{Z?.stop(),j?.getTracks().forEach(T=>T.stop())});async function _(T){if(T.preventDefault(),x(!0),V(""),U("info"),n.readOnly){V(ir),x(!1);return}const g=new Date(c());if(Number.isNaN(g.getTime())){U("error"),V("Choose a valid meal time."),x(!1);return}try{await fb({mode:e(),text:e()==="text"?r():void 0,mediaBase64:e()==="text"?void 0:h(),mimeType:e()==="text"?void 0:p(),eatenAt:g.toISOString(),notes:i().trim()||void 0}),s(""),a(""),f(""),E(""),u(xi(new Date)),U("success"),V("Meal saved.")}catch(F){U("error"),V(He(F,"Meal could not be saved."))}finally{x(!1)}}async function y(T){if(V(""),U("info"),!!T){if(T.size>ph){f(""),E(""),U("error"),V("Use an image smaller than 5 MB.");return}try{const g=await rA(T);f(g),E(T.type),U("success"),V("Image ready.")}catch(g){U("error"),V(He(g,"Image could not be read."))}}}async function I(){if(V(""),U("info"),A()){Z?.stop();return}if(!navigator.mediaDevices?.getUserMedia){U("error"),V("Audio recording is not available in this browser.");return}try{const T=await navigator.mediaDevices.getUserMedia({audio:!0}),g=new MediaRecorder(T);v=[],Z=g,j=T,g.ondataavailable=F=>{F.data.size&&v.push(F.data)},g.onerror=()=>{U("error"),V("Audio recording failed.")},g.onstop=async()=>{const F=new Blob(v,{type:g.mimeType||"audio/webm"});if(j?.getTracks().forEach(W=>W.stop()),j=null,C(!1),F.size>ph){f(""),E(""),U("error"),V("Use a shorter recording under 5 MB.");return}try{f(await dm(F)),E(F.type),U("success"),V("Audio ready.")}catch(W){U("error"),V(He(W,"Audio could not be prepared."))}},g.start(),C(!0)}catch(T){U("error"),V(He(T,"Microphone access was not granted."))}}const w=()=>e()==="text"?r().trim().length>2:h().length>0&&p().length>0;return(()=>{var T=Xb(),g=T.firstChild;g.firstChild;var F=g.nextSibling,W=F.firstChild,Ve=W.nextSibling,Oe=Ve.firstChild,Ye=Oe.firstChild,Ge=Ye.nextSibling,Ze=Oe.nextSibling,et=Ze.firstChild,mt=et.nextSibling;return P(g,D(Jr,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),F.addEventListener("submit",_),P(W,D(jo,{get active(){return e()==="text"},onClick:()=>t("text"),get icon(){return D(Jr,{size:17})},children:"Text"}),null),P(W,D(jo,{get active(){return e()==="voice"},onClick:()=>t("voice"),get icon(){return D(xl,{size:17})},children:"Voice"}),null),P(W,D(jo,{get active(){return e()==="image"},onClick:()=>t("image"),get icon(){return D(Pl,{size:17})},children:"Image"}),null),P(F,(()=>{var je=se(()=>e()==="text");return()=>je()?(()=>{var ye=Zb(),me=ye.firstChild,Me=me.nextSibling;return Me.$$input=st=>s(st.target.value),Q(()=>Me.value=r()),ye})():se(()=>e()==="voice")()?(()=>{var ye=eA(),me=ye.firstChild;return me.$$click=I,P(me,D(xl,{size:18,"aria-hidden":!0}),null),P(me,(()=>{var Me=se(()=>!!A());return()=>Me()?"Stop recording":h()?"Record again":"Record"})(),null),P(ye,D(_h,{get ready(){return!!h()},label:"Audio ready"}),null),Q(Me=>or(me,{"flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition":!0,"bg-danger text-background hover:bg-danger-strong":A(),"bg-brand text-background hover:bg-brand-hover":!A()},Me)),ye})():(()=>{var ye=tA(),me=ye.firstChild,Me=me.firstChild,st=me.nextSibling;return P(me,D(Pl,{size:18,"aria-hidden":!0}),Me),st.addEventListener("change",pt=>y(pt.target.files?.[0])),P(ye,D(_h,{get ready(){return!!h()},label:"Image ready"}),null),ye})()})(),Ve),Ge.$$input=je=>u(je.target.value),mt.$$input=je=>a(je.target.value),P(F,D(um,{get busy(){return N()},get disabled(){return!w()||N()},get message(){return M()},get tone(){return B()},label:"Save meal"}),null),Q(()=>Ge.value=c()),Q(()=>mt.value=i()),T})()}function rA(n){return dm(n)}function dm(n){return new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=String(r.result??"");e(s.includes(",")?s.split(",")[1]:s)},r.onerror=()=>t(r.error),r.readAsDataURL(n)})}un(["input","click"]);function bn(n){return n?n.toISOString():void 0}function Ie(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function sA(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"meal"}function Rc(n){return{...n,eatenAt:bn(n.eatenAt),createdAt:bn(n.createdAt),updatedAt:bn(n.updatedAt),reanalyzedAt:bn(n.reanalyzedAt)}}function iA(n){return{...n,occurredAt:bn(n.occurredAt),createdAt:bn(n.createdAt)}}function oA(n){return n?{...n,generatedAt:bn(n.generatedAt)}:null}function ao(n,e,t){const r=new Blob([t],{type:e}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=n,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function aA(n){const e=sA(n.analysis.mealName||n.id);ao(`meal-signal-meal-${e}-${n.eatenAt.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),meal:Rc(n)},null,2))}function cA(n){ao(`meal-signal-meals-${new Date().toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),mealCount:n.length,meals:n.map(Rc)},null,2))}function lA({analysis:n,meals:e,events:t,exportedAt:r=new Date}){ao(`meal-signal-analysis-${r.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:r.toISOString(),analysis:oA(n),meals:e.map(Rc),giEvents:t.map(iA)},null,2))}function uA({analysis:n,meals:e,events:t,exportedAt:r=new Date}){const s=n?.findings??[],i=n?.dataQualityNotes??[],a=e.slice(0,50),c=t.slice(0,50),u=`<!doctype html>
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
</html>`;ao(`meal-signal-analysis-${r.toISOString().slice(0,10)}.html`,"text/html",u)}function An(n){if(n instanceof ce)return n.toDate();if(n instanceof Date)return n;if(typeof n=="string"){const e=new Date(n);return Number.isNaN(e.getTime())?new Date:e}return new Date}function fm(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function mm(n){const e=n.data();return{id:n.id,uid:e.uid,inputMode:e.inputMode,rawInput:e.rawInput??"",interpretedText:e.interpretedText??"",eatenAt:An(e.eatenAt),notes:e.notes,status:e.status??"needs_review",analysis:e.analysis??{mealName:"Meal",foods:[],irritants:[],summary:""},createdAt:An(e.createdAt),updatedAt:An(e.updatedAt),reanalyzedAt:e.reanalyzedAt?An(e.reanalyzedAt):void 0}}function pm(n){const e=n.data();return{id:n.id,uid:e.uid,occurredAt:An(e.occurredAt),severity:e.severity??1,symptoms:fm(e.symptoms),notes:e.notes,stoolType:e.stoolType,durationMinutes:e.durationMinutes,createdAt:An(e.createdAt)}}function hA(n){const e=n.data();return{id:n.id,uid:e.uid,status:e.status??"insufficient_data",generatedAt:An(e.generatedAt),mealCount:e.mealCount??0,eventCount:e.eventCount??0,summary:e.summary??"No analysis has been generated yet.",findings:Array.isArray(e.findings)?e.findings:[],dataQualityNotes:fm(e.dataQualityNotes)}}async function dA(n){const e=eo(mn,"users",n.uid),t=await xI(e),r=t.exists()?t.data().createdAt:null;await NI(e,{uid:n.uid,email:n.email,displayName:n.displayName,updatedAt:sh(),createdAt:r instanceof ce?r:sh()})}async function fA(n,e){await tm(eo(mn,"users",n,"meals",e))}async function mA(n,e){await tm(eo(mn,"users",n,"events",e))}async function pA(n){const e=ro(Zi(mn,"users",n,"meals"),so("eatenAt","desc"));return(await em(e)).docs.map(mm)}async function gA(n){const e=ro(Zi(mn,"users",n,"events"),so("occurredAt","desc"));return(await em(e)).docs.map(pm)}function _A(n,e,t){const r=ro(Zi(mn,"users",n,"meals"),so("eatenAt","desc"),Xf(25));return bc(r,s=>e(s.docs.map(mm)),t)}function yA(n,e,t){const r=ro(Zi(mn,"users",n,"events"),so("occurredAt","desc"),Xf(25));return bc(r,s=>e(s.docs.map(pm)),t)}function vA(n,e,t){return bc(eo(mn,"users",n,"analyses","current"),r=>e(r.exists()?hA(r):null),t)}var EA=z('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 class="text-lg font-semibold">Correlation analysis</h2><p class="text-sm text-muted"></p></div><div class="flex flex-wrap items-center gap-2"><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis HTML"title="Export analysis HTML"></button><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis JSON"title="Export analysis JSON"></button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export all meals JSON"title="Export all meals JSON">Meals</button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),wA=z("<div class=mb-4>"),TA=z('<div class="grid gap-4"><div class="rounded-lg bg-surface-accent p-4"><p class="text-sm font-medium text-brand"></p><p class="mt-2 text-xs text-muted-strong"> meals, <!> GI events</p></div><div class="grid gap-3">'),IA=z('<article class="rounded-lg border border-border p-4"><div class="flex items-start justify-between gap-3"><div><h3 class=font-semibold></h3><p class="text-sm text-muted"> within <!>h</p></div><span class="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">%</span></div><p class="mt-3 text-sm text-muted-strong"></p><p class="mt-2 text-sm font-medium text-brand">'),bA=z('<div class="rounded-lg border border-warning-border bg-warning-soft p-4"><div class="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">Data notes</div><ul class="grid gap-1 text-sm text-warning">'),AA=z("<li>");function SA(n){const[e,t]=X(!1),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1);async function h(){if(t(!0),a(""),u(!1),n.readOnly){a(ir),t(!1);return}try{await pb(),a("Analysis queued.")}catch(E){u(!0),a(He(E,"Analysis could not be started."))}finally{t(!1)}}async function f(){const[E,A]=await Promise.all([pA(n.uid),gA(n.uid)]);return{meals:E,events:A}}async function p(E){s(E),a(""),u(!1);try{const{meals:A,events:C}=await f();E==="analysis-html"?(uA({analysis:n.analysis,meals:A,events:C}),a("Analysis HTML exported.")):E==="analysis-json"?(lA({analysis:n.analysis,meals:A,events:C}),a("Analysis JSON exported.")):(cA(A),a("Meals JSON exported."))}catch(A){u(!0),a(He(A,"Export could not be prepared."))}finally{s("")}}return(()=>{var E=EA(),A=E.firstChild,C=A.firstChild,N=C.firstChild,x=N.nextSibling,M=C.nextSibling,V=M.firstChild,B=V.nextSibling,U=B.nextSibling,Z=U.firstChild,j=U.nextSibling;return P(x,(()=>{var v=se(()=>!!n.analysis);return()=>v()?`Updated ${n.analysis.generatedAt.toLocaleString()}`:`${n.mealCount} meals and ${n.eventCount} GI events available`})()),V.$$click=()=>p("analysis-html"),P(V,D(Jp,{size:17,"aria-hidden":!0})),B.$$click=()=>p("analysis-json"),P(B,D(Go,{size:17,"aria-hidden":!0})),U.$$click=()=>p("meals-json"),P(U,D(Go,{size:16,"aria-hidden":!0}),Z),j.$$click=h,P(j,D(Vi,{size:16,get class(){return e()?"animate-spin":""},"aria-hidden":!0}),null),P(j,()=>e()?"Starting":"Run",null),P(E,(()=>{var v=se(()=>!!i());return()=>v()?(()=>{var _=wA();return P(_,D(Ni,{get tone(){return c()?"error":"info"},get children(){return i()}})),_})():null})(),null),P(E,(()=>{var v=se(()=>!!n.analysis);return()=>v()?(()=>{var _=TA(),y=_.firstChild,I=y.firstChild,w=I.nextSibling,T=w.firstChild,g=T.nextSibling;g.nextSibling;var F=y.nextSibling;return P(I,()=>n.analysis.summary),P(w,()=>n.analysis.mealCount,T),P(w,()=>n.analysis.eventCount,g),P(F,()=>n.analysis.findings.map(W=>(()=>{var Ve=IA(),Oe=Ve.firstChild,Ye=Oe.firstChild,Ge=Ye.firstChild,Ze=Ge.nextSibling,et=Ze.firstChild,mt=et.nextSibling;mt.nextSibling;var je=Ye.nextSibling,ye=je.firstChild,me=Oe.nextSibling,Me=me.nextSibling;return P(Ge,()=>W.irritant),P(Ze,(()=>{var st=se(()=>W.direction==="possible_trigger");return()=>st()?"possible sensitivity":W.direction.replaceAll("_"," ")})(),et),P(Ze,()=>W.windowHours,mt),P(je,()=>Math.round(W.confidence*100),ye),P(me,()=>W.evidence),P(Me,()=>W.suggestedAction),Ve})())),P(_,(()=>{var W=se(()=>!!n.analysis.dataQualityNotes.length);return()=>W()?(()=>{var Ve=bA(),Oe=Ve.firstChild,Ye=Oe.firstChild,Ge=Oe.nextSibling;return P(Oe,D(Nh,{size:16,"aria-hidden":!0}),Ye),P(Ge,()=>n.analysis.dataQualityNotes.map(Ze=>(()=>{var et=AA();return P(et,Ze),et})())),Ve})():null})(),null),_})():D(hm,{get icon(){return D(wa,{size:22})},title:"No analysis yet"})})(),null),Q(v=>{var _=!!r(),y=!!r(),I=!!r(),w=e();return _!==v.e&&(V.disabled=v.e=_),y!==v.t&&(B.disabled=v.t=y),I!==v.a&&(U.disabled=v.a=I),w!==v.o&&(j.disabled=v.o=w),v},{e:void 0,t:void 0,a:void 0,o:void 0}),E})()}un(["click"]);var RA=z('<section class="grid grid-cols-3 gap-2">'),CA=z('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm"><div class="mb-3 flex items-center gap-2"><h2 class=font-semibold>Recent'),PA=z("<div class=mb-3>"),kA=z('<div class="grid gap-3">'),xA=z('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold"></h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Redo meal analysis"title="Redo meal analysis"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export meal JSON"title="Export meal JSON"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete meal"title="Delete meal"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 line-clamp-2 text-sm text-muted-strong"></p><div class="mt-2 flex flex-wrap gap-1">'),NA=z('<span class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong">'),DA=z('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold">Severity </h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete event"title="Delete event"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 text-sm text-muted-strong">');function VA(n){const e=[...n.symptoms];return n.stoolType&&e.push(`stool type ${n.stoolType}`),e.length?e.join(", "):"No details recorded"}function OA(n){const e=ct(()=>{const t=new Map;for(const r of n.meals)for(const s of r.analysis.irritants??[])t.set(s.name,(t.get(s.name)??0)+1);return[...t.entries()].sort((r,s)=>s[1]-r[1])[0]?.[0]??"None"});return(()=>{var t=RA();return P(t,D(qo,{get icon(){return D(Jr,{size:17})},label:"Meals",get value(){return n.meals.length.toString()}}),null),P(t,D(qo,{get icon(){return D(kh,{size:17})},label:"Events",get value(){return n.events.length.toString()}}),null),P(t,D(qo,{get icon(){return D(wa,{size:17})},label:"Signal",get value(){return se(()=>!!n.analysis)()?e():"Pending"}}),null),t})()}function MA(n){const[e,t]=X(""),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1),h=ct(()=>[...n.meals.map(E=>({kind:"meal",date:E.eatenAt,meal:E})),...n.events.map(E=>({kind:"event",date:E.occurredAt,event:E}))].sort((E,A)=>A.date.getTime()-E.date.getTime()).slice(0,12));async function f(E){if(t(E),a(""),u(!1),n.readOnly){a(ir),t("");return}try{await gb(E),a("Meal analysis refreshed.")}catch(A){u(!0),a(He(A,"Meal analysis could not be refreshed."))}finally{t("")}}async function p(E){const A=E.kind==="meal"?"meal":"event";if(n.readOnly){a(ir),u(!1);return}if(window.confirm(`Delete this ${A}? This cannot be undone.`)){s(`${E.kind}-${E.id}`),a(""),u(!1);try{E.kind==="meal"?await fA(n.uid,E.id):await mA(n.uid,E.id),a(`${A==="meal"?"Meal":"Event"} deleted.`)}catch(N){u(!0),a(He(N,`The ${A} could not be deleted.`))}finally{s("")}}}return(()=>{var E=CA(),A=E.firstChild,C=A.firstChild;return P(A,D(Cl,{size:18,class:"text-brand","aria-hidden":!0}),C),P(E,(()=>{var N=se(()=>!!i());return()=>N()?(()=>{var x=PA();return P(x,D(Ni,{get tone(){return c()?"error":"info"},get children(){return i()}})),x})():null})(),null),P(E,(()=>{var N=se(()=>!!h().length);return()=>N()?(()=>{var x=kA();return P(x,()=>h().map(M=>M.kind==="meal"?(()=>{var V=xA(),B=V.firstChild,U=B.firstChild,Z=U.nextSibling,j=Z.firstChild,v=j.nextSibling,_=v.nextSibling,y=_.nextSibling,I=B.nextSibling,w=I.nextSibling;return P(U,()=>M.meal.analysis.mealName),j.$$click=()=>f(M.meal.id),P(j,D(Vi,{size:14,get class(){return e()===M.meal.id?"animate-spin":""},"aria-hidden":!0})),v.$$click=()=>aA(M.meal),P(v,D(Go,{size:14,"aria-hidden":!0})),_.$$click=()=>p({kind:"meal",id:M.meal.id}),P(_,D(Nl,{size:14,"aria-hidden":!0})),P(y,()=>mh(M.date)),P(I,()=>M.meal.interpretedText),P(w,()=>M.meal.analysis.irritants.slice(0,3).map(T=>(()=>{var g=NA();return P(g,()=>T.name),g})())),Q(T=>{var g=e()===M.meal.id,F=r()===`meal-${M.meal.id}`;return g!==T.e&&(j.disabled=T.e=g),F!==T.t&&(_.disabled=T.t=F),T},{e:void 0,t:void 0}),V})():(()=>{var V=DA(),B=V.firstChild,U=B.firstChild;U.firstChild;var Z=U.nextSibling,j=Z.firstChild,v=j.nextSibling,_=B.nextSibling;return P(U,()=>M.event.severity,null),j.$$click=()=>p({kind:"event",id:M.event.id}),P(j,D(Nl,{size:14,"aria-hidden":!0})),P(v,()=>mh(M.date)),P(_,()=>VA(M.event)),Q(()=>j.disabled=r()===`event-${M.event.id}`),V})())),x})():D(hm,{get icon(){return D(Cl,{size:22})},title:"No entries yet"})})(),null),E})()}un(["click"]);var LA=z('<main class="min-h-screen bg-background text-foreground"><header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"><div class="flex min-w-0 items-center gap-3"><div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"></div><div class=min-w-0><h1 class="truncate text-base font-semibold">Meal Signal</h1><p class="truncate text-sm text-muted"></p></div></div><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"aria-label="Sign out"title="Sign out"></button></div></header><div class="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section class=min-w-0><div class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm"></div></section><aside class="grid content-start gap-5">'),yh=z("<div class=mb-4>"),$A=z('<div class="grid gap-5">');function FA(){const[n,e]=X(In.currentUser),[t,r]=X(!0),[s,i]=X("log"),[a,c]=X([]),[u,h]=X([]),[f,p]=X(null),[E,A]=X(""),C=ct(()=>fh(n()));function N(M){if(e(M),r(!0),A(""),!M){c([]),h([]),p(null);return}fh(M)||dA(M).catch(V=>{A(He(V,"Your profile could not be prepared."))})}Gm(()=>{const M=Jy(In,N);oi(()=>M())}),Th(()=>{const M=n();if(!M)return;const V=j=>{A(He(j,"Live updates are temporarily unavailable."))},B=_A(M.uid,c,V),U=yA(M.uid,h,V),Z=vA(M.uid,p,V);oi(()=>{B(),U(),Z()})});async function x(){A("");try{await Yy(In)}catch(M){A(He(M,"Sign out failed."))}}return D(Po,{when:eb,get fallback(){return D(Ab,{})},get children(){return D(Po,{get when(){return t()},get fallback(){return D(bb,{})},get children(){return D(Po,{get when(){return n()},get fallback(){return D(cb,{onAuthenticated:N})},get children(){var M=LA(),V=M.firstChild,B=V.firstChild,U=B.firstChild,Z=U.firstChild,j=Z.nextSibling,v=j.firstChild,_=v.nextSibling,y=U.nextSibling,I=V.nextSibling,w=I.firstChild,T=w.firstChild,g=w.nextSibling;return P(Z,D(Jr,{size:19,"aria-hidden":!0})),P(_,()=>n().email),y.$$click=x,P(y,D(Zp,{size:18,"aria-hidden":!0})),P(w,(()=>{var F=se(()=>!!E());return()=>F()?(()=>{var W=yh();return P(W,D(Ni,{tone:"error",get children(){return E()}})),W})():null})(),T),P(w,(()=>{var F=se(()=>!!C());return()=>F()?(()=>{var W=yh();return P(W,D(Ni,{children:ir})),W})():null})(),T),P(T,D(gh,{get active(){return s()==="log"},onClick:()=>i("log"),get icon(){return D(ag,{size:17})},children:"Log"}),null),P(T,D(gh,{get active(){return s()==="analysis"},onClick:()=>i("analysis"),get icon(){return D(wa,{size:17})},children:"Analysis"}),null),P(w,(()=>{var F=se(()=>s()==="log");return()=>F()?(()=>{var W=$A();return P(W,D(nA,{get readOnly(){return C()}}),null),P(W,D(Yb,{get readOnly(){return C()}}),null),W})():D(SA,{get uid(){return n().uid},get analysis(){return f()},get mealCount(){return a().length},get eventCount(){return u().length},get readOnly(){return C()}})})(),null),P(g,D(OA,{get meals(){return a()},get events(){return u()},get analysis(){return f()}}),null),P(g,D(MA,{get uid(){return n().uid},get meals(){return a()},get events(){return u()},get readOnly(){return C()}}),null),M}})}})}})}un(["click"]);function UA(){return D(FA,{})}dp(()=>D(UA,{}),document.getElementById("root"));if("serviceWorker"in navigator){let n=!0;const e=()=>{n&&navigator.serviceWorker.register("/sw.js",{scope:"/",updateViaCache:"none"}).catch(t=>{console.error("Service worker registration failed.",t)})};document.readyState==="complete"?e():window.addEventListener("load",e,{once:!0}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(n=!1)})}
