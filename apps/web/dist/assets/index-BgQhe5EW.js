(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Lm=!1,$m=(n,e)=>n===e,ti=Symbol("solid-proxy"),ph=typeof Proxy=="function",Fm=Symbol("solid-track"),ni={equals:$m};let gh=wh;const cn=1,ri=2,_h={owned:null,cleanups:null,context:null,owner:null};var be=null;let Ao=null,Um=null,pe=null,Le=null,xt=null,ki=0;function zs(n,e){const t=pe,r=be,s=n.length===0,i=e===void 0?r:e,a=s?_h:{owned:null,cleanups:null,context:i?i.context:null,owner:i},c=s?n:()=>n(()=>ut(()=>Hr(a)));be=a,pe=null;try{return ls(c,!0)}finally{pe=t,be=r}}function X(n,e){e=e?Object.assign({},ni,e):ni;const t={value:n,observers:null,observerSlots:null,comparator:e.equals||void 0},r=s=>(typeof s=="function"&&(s=s(t.value)),Eh(t,s));return[vh.bind(t),r]}function J(n,e,t){const r=ga(n,e,!1,cn);cs(r)}function yh(n,e,t){gh=zm;const r=ga(n,e,!1,cn);r.user=!0,xt?xt.push(r):cs(r)}function gt(n,e,t){t=t?Object.assign({},ni,t):ni;const r=ga(n,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=t.equals||void 0,cs(r),vh.bind(r)}function ut(n){if(pe===null)return n();const e=pe;pe=null;try{return n()}finally{pe=e}}function Bm(n){yh(()=>ut(n))}function si(n){return be===null||(be.cleanups===null?be.cleanups=[n]:be.cleanups.push(n)),n}function vh(){if(this.sources&&this.state)if(this.state===cn)cs(this);else{const n=Le;Le=null,ls(()=>oi(this),!1),Le=n}if(pe){const n=this.observers;if(!n||n[n.length-1]!==pe){const e=n?n.length:0;pe.sources?(pe.sources.push(this),pe.sourceSlots.push(e)):(pe.sources=[this],pe.sourceSlots=[e]),n?(n.push(pe),this.observerSlots.push(pe.sources.length-1)):(this.observers=[pe],this.observerSlots=[pe.sources.length-1])}}return this.value}function Eh(n,e,t){let r=n.value;return(!n.comparator||!n.comparator(r,e))&&(n.value=e,n.observers&&n.observers.length&&ls(()=>{for(let s=0;s<n.observers.length;s+=1){const i=n.observers[s],a=Ao&&Ao.running;a&&Ao.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?Le.push(i):xt.push(i),i.observers&&Th(i)),a||(i.state=cn)}if(Le.length>1e6)throw Le=[],new Error},!1)),e}function cs(n){if(!n.fn)return;Hr(n);const e=ki;jm(n,n.value,e)}function jm(n,e,t){let r;const s=be,i=pe;pe=be=n;try{r=n.fn(e)}catch(a){return n.pure&&(n.state=cn,n.owned&&n.owned.forEach(Hr),n.owned=null),n.updatedAt=t+1,Ih(a)}finally{pe=i,be=s}(!n.updatedAt||n.updatedAt<=t)&&(n.updatedAt!=null&&"observers"in n?Eh(n,r):n.value=r,n.updatedAt=t)}function ga(n,e,t,r=cn,s){const i={fn:n,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:be,context:be?be.context:null,pure:t};return be===null||be!==_h&&(be.owned?be.owned.push(i):be.owned=[i]),i}function ii(n){if(n.state===0)return;if(n.state===ri)return oi(n);if(n.suspense&&ut(n.suspense.inFallback))return n.suspense.effects.push(n);const e=[n];for(;(n=n.owner)&&(!n.updatedAt||n.updatedAt<ki);)n.state&&e.push(n);for(let t=e.length-1;t>=0;t--)if(n=e[t],n.state===cn)cs(n);else if(n.state===ri){const r=Le;Le=null,ls(()=>oi(n,e[0]),!1),Le=r}}function ls(n,e){if(Le)return n();let t=!1;e||(Le=[]),xt?t=!0:xt=[],ki++;try{const r=n();return qm(t),r}catch(r){t||(xt=null),Le=null,Ih(r)}}function qm(n){if(Le&&(wh(Le),Le=null),n)return;const e=xt;xt=null,e.length&&ls(()=>gh(e),!1)}function wh(n){for(let e=0;e<n.length;e++)ii(n[e])}function zm(n){let e,t=0;for(e=0;e<n.length;e++){const r=n[e];r.user?n[t++]=r:ii(r)}for(e=0;e<t;e++)ii(n[e])}function oi(n,e){n.state=0;for(let t=0;t<n.sources.length;t+=1){const r=n.sources[t];if(r.sources){const s=r.state;s===cn?r!==e&&(!r.updatedAt||r.updatedAt<ki)&&ii(r):s===ri&&oi(r,e)}}}function Th(n){for(let e=0;e<n.observers.length;e+=1){const t=n.observers[e];t.state||(t.state=ri,t.pure?Le.push(t):xt.push(t),t.observers&&Th(t))}}function Hr(n){let e;if(n.sources)for(;n.sources.length;){const t=n.sources.pop(),r=n.sourceSlots.pop(),s=t.observers;if(s&&s.length){const i=s.pop(),a=t.observerSlots.pop();r<s.length&&(i.sourceSlots[a]=r,s[r]=i,t.observerSlots[r]=a)}}if(n.tOwned){for(e=n.tOwned.length-1;e>=0;e--)Hr(n.tOwned[e]);delete n.tOwned}if(n.owned){for(e=n.owned.length-1;e>=0;e--)Hr(n.owned[e]);n.owned=null}if(n.cleanups){for(e=n.cleanups.length-1;e>=0;e--)n.cleanups[e]();n.cleanups=null}n.state=0}function Hm(n){return n instanceof Error?n:new Error(typeof n=="string"?n:"Unknown error",{cause:n})}function Ih(n,e=be){throw Hm(n)}const Gm=Symbol("fallback");function Tl(n){for(let e=0;e<n.length;e++)n[e]()}function Wm(n,e,t={}){let r=[],s=[],i=[],a=0,c=e.length>1?[]:null;return si(()=>Tl(i)),()=>{let u=n()||[],h=u.length,f,p;return u[Fm],ut(()=>{let b,k,D,x,N,F,$,q,G;if(h===0)a!==0&&(Tl(i),i=[],r=[],s=[],a=0,c&&(c=[])),t.fallback&&(r=[Gm],s[0]=zs(B=>(i[0]=B,t.fallback())),a=1);else if(a===0){for(s=new Array(h),p=0;p<h;p++)r[p]=u[p],s[p]=zs(E);a=h}else{for(D=new Array(h),x=new Array(h),c&&(N=new Array(h)),F=0,$=Math.min(a,h);F<$&&r[F]===u[F];F++);for($=a-1,q=h-1;$>=F&&q>=F&&r[$]===u[q];$--,q--)D[q]=s[$],x[q]=i[$],c&&(N[q]=c[$]);for(b=new Map,k=new Array(q+1),p=q;p>=F;p--)G=u[p],f=b.get(G),k[p]=f===void 0?-1:f,b.set(G,p);for(f=F;f<=$;f++)G=r[f],p=b.get(G),p!==void 0&&p!==-1?(D[p]=s[f],x[p]=i[f],c&&(N[p]=c[f]),p=k[p],b.set(G,p)):i[f]();for(p=F;p<h;p++)p in D?(s[p]=D[p],i[p]=x[p],c&&(c[p]=N[p],c[p](p))):s[p]=zs(E);s=s.slice(0,a=h),r=u.slice(0)}return s});function E(b){if(i[p]=b,c){const[k,D]=X(p);return c[p]=D,e(u[p],k)}return e(u[p])}}}function V(n,e){return ut(()=>n(e||{}))}function Ls(){return!0}const jo={get(n,e,t){return e===ti?t:n.get(e)},has(n,e){return e===ti?!0:n.has(e)},set:Ls,deleteProperty:Ls,getOwnPropertyDescriptor(n,e){return{configurable:!0,enumerable:!0,get(){return n.get(e)},set:Ls,deleteProperty:Ls}},ownKeys(n){return n.keys()}};function So(n){return(n=typeof n=="function"?n():n)?n:{}}function Km(){for(let n=0,e=this.length;n<e;++n){const t=this[n]();if(t!==void 0)return t}}function Pe(...n){let e=!1;for(let a=0;a<n.length;a++){const c=n[a];e=e||!!c&&ti in c,n[a]=typeof c=="function"?(e=!0,gt(c)):c}if(ph&&e)return new Proxy({get(a){for(let c=n.length-1;c>=0;c--){const u=So(n[c])[a];if(u!==void 0)return u}},has(a){for(let c=n.length-1;c>=0;c--)if(a in So(n[c]))return!0;return!1},keys(){const a=[];for(let c=0;c<n.length;c++)a.push(...Object.keys(So(n[c])));return[...new Set(a)]}},jo);const t={},r=Object.create(null);for(let a=n.length-1;a>=0;a--){const c=n[a];if(!c)continue;const u=Object.getOwnPropertyNames(c);for(let h=u.length-1;h>=0;h--){const f=u[h];if(f==="__proto__"||f==="constructor")continue;const p=Object.getOwnPropertyDescriptor(c,f);if(!r[f])r[f]=p.get?{enumerable:!0,configurable:!0,get:Km.bind(t[f]=[p.get.bind(c)])}:p.value!==void 0?p:void 0;else{const E=t[f];E&&(p.get?E.push(p.get.bind(c)):p.value!==void 0&&E.push(()=>p.value))}}}const s={},i=Object.keys(r);for(let a=i.length-1;a>=0;a--){const c=i[a],u=r[c];u&&u.get?Object.defineProperty(s,c,u):s[c]=u?u.value:void 0}return s}function bh(n,...e){const t=e.length;if(ph&&ti in n){const s=t>1?e.flat():e[0],i=e.map(a=>new Proxy({get(c){return a.includes(c)?n[c]:void 0},has(c){return a.includes(c)&&c in n},keys(){return a.filter(c=>c in n)}},jo));return i.push(new Proxy({get(a){return s.includes(a)?void 0:n[a]},has(a){return s.includes(a)?!1:a in n},keys(){return Object.keys(n).filter(a=>!s.includes(a))}},jo)),i}const r=[];for(let s=0;s<=t;s++)r[s]={};for(const s of Object.getOwnPropertyNames(n)){let i=t;for(let u=0;u<e.length;u++)if(e[u].includes(s)){i=u;break}const a=Object.getOwnPropertyDescriptor(n,s);!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable?r[i][s]=a.value:Object.defineProperty(r[i],s,a)}return r}const Qm=n=>`Stale read from <${n}>.`;function Jm(n){const e="fallback"in n&&{fallback:()=>n.fallback};return gt(Wm(()=>n.each,n.children,e||void 0))}function Ro(n){const e=n.keyed,t=gt(()=>n.when,void 0,void 0),r=e?t:gt(t,void 0,{equals:(s,i)=>!s==!i});return gt(()=>{const s=r();if(s){const i=n.children;return typeof i=="function"&&i.length>0?ut(()=>i(e?s:()=>{if(!ut(r))throw Qm("Show");return t()})):i}return n.fallback},void 0,void 0)}const Ym=["allowfullscreen","async","alpha","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected","adauctionheaders","browsingtopics","credentialless","defaultchecked","defaultmuted","defaultselected","defer","disablepictureinpicture","disableremoteplayback","preservespitch","shadowrootclonable","shadowrootcustomelementregistry","shadowrootdelegatesfocus","shadowrootserializable","sharedstoragewritable"],Xm=new Set(["className","value","readOnly","noValidate","formNoValidate","isMap","noModule","playsInline","adAuctionHeaders","allowFullscreen","browsingTopics","defaultChecked","defaultMuted","defaultSelected","disablePictureInPicture","disableRemotePlayback","preservesPitch","shadowRootClonable","shadowRootCustomElementRegistry","shadowRootDelegatesFocus","shadowRootSerializable","sharedStorageWritable",...Ym]),Zm=new Set(["innerHTML","textContent","innerText","children"]),ep=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),tp=Object.assign(Object.create(null),{class:"className",novalidate:{$:"noValidate",FORM:1},formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1},adauctionheaders:{$:"adAuctionHeaders",IFRAME:1},allowfullscreen:{$:"allowFullscreen",IFRAME:1},browsingtopics:{$:"browsingTopics",IMG:1},defaultchecked:{$:"defaultChecked",INPUT:1},defaultmuted:{$:"defaultMuted",AUDIO:1,VIDEO:1},defaultselected:{$:"defaultSelected",OPTION:1},disablepictureinpicture:{$:"disablePictureInPicture",VIDEO:1},disableremoteplayback:{$:"disableRemotePlayback",AUDIO:1,VIDEO:1},preservespitch:{$:"preservesPitch",AUDIO:1,VIDEO:1},shadowrootclonable:{$:"shadowRootClonable",TEMPLATE:1},shadowrootdelegatesfocus:{$:"shadowRootDelegatesFocus",TEMPLATE:1},shadowrootserializable:{$:"shadowRootSerializable",TEMPLATE:1},sharedstoragewritable:{$:"sharedStorageWritable",IFRAME:1,IMG:1}});function np(n,e){const t=tp[n];return typeof t=="object"?t[e]?t.$:void 0:t}const rp=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),sp=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),ip={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},re=n=>gt(()=>n());function op(n,e,t){let r=t.length,s=e.length,i=r,a=0,c=0,u=e[s-1].nextSibling,h=null;for(;a<s||c<i;){if(e[a]===t[c]){a++,c++;continue}for(;e[s-1]===t[i-1];)s--,i--;if(s===a){const f=i<r?c?t[c-1].nextSibling:t[i-c]:u;for(;c<i;)n.insertBefore(t[c++],f)}else if(i===c)for(;a<s;)(!h||!h.has(e[a]))&&e[a].remove(),a++;else if(e[a]===t[i-1]&&t[c]===e[s-1]){const f=e[--s].nextSibling;n.insertBefore(t[c++],e[a++].nextSibling),n.insertBefore(t[--i],f),e[s]=t[i]}else{if(!h){h=new Map;let p=c;for(;p<i;)h.set(t[p],p++)}const f=h.get(e[a]);if(f!=null)if(c<f&&f<i){let p=a,E=1,b;for(;++p<s&&p<i&&!((b=h.get(e[p]))==null||b!==f+E);)E++;if(E>f-c){const k=e[a];for(;c<f;)n.insertBefore(t[c++],k)}else n.replaceChild(t[c++],e[a++])}else a++;else e[a++].remove()}}}const Il="_$DX_DELEGATE";function ap(n,e,t,r={}){let s;return zs(i=>{s=i,e===document?n():P(e,n(),e.firstChild?null:void 0,t)},r.owner),()=>{s(),e.textContent=""}}function j(n,e,t,r){let s;const i=()=>{const c=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return c.innerHTML=n,t?c.content.firstChild.firstChild:r?c.firstChild:c.content.firstChild},a=e?()=>ut(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return a.cloneNode=a,a}function ln(n,e=window.document){const t=e[Il]||(e[Il]=new Set);for(let r=0,s=n.length;r<s;r++){const i=n[r];t.has(i)||(t.add(i),e.addEventListener(i,mp))}}function se(n,e,t){t==null?n.removeAttribute(e):n.setAttribute(e,t)}function cp(n,e,t,r){r==null?n.removeAttributeNS(e,t):n.setAttributeNS(e,t,r)}function lp(n,e,t){t?n.setAttribute(e,""):n.removeAttribute(e)}function _a(n,e){e==null?n.removeAttribute("class"):n.className=e}function ya(n,e,t,r){if(r)Array.isArray(t)?(n[`$$${e}`]=t[0],n[`$$${e}Data`]=t[1]):n[`$$${e}`]=t;else if(Array.isArray(t)){const s=t[0];n.addEventListener(e,t[0]=i=>s.call(n,t[1],i))}else n.addEventListener(e,t,typeof t!="function"&&t)}function or(n,e,t={}){const r=Object.keys(e||{}),s=Object.keys(t);let i,a;for(i=0,a=s.length;i<a;i++){const c=s[i];!c||c==="undefined"||e[c]||(bl(n,c,!1),delete t[c])}for(i=0,a=r.length;i<a;i++){const c=r[i],u=!!e[c];!c||c==="undefined"||t[c]===u||!u||(bl(n,c,!0),t[c]=u)}return t}function up(n,e,t){if(!e)return t?se(n,"style"):e;const r=n.style;if(typeof e=="string")return r.cssText=e;typeof t=="string"&&(r.cssText=t=void 0),t||(t={}),e||(e={});let s,i;for(i in t)e[i]==null&&r.removeProperty(i),delete t[i];for(i in e)s=e[i],s!==t[i]&&(r.setProperty(i,s),t[i]=s);return t}function Ah(n,e={},t,r){const s={};return r||J(()=>s.children=Gr(n,e.children,s.children)),J(()=>typeof e.ref=="function"&&hp(e.ref,n)),J(()=>dp(n,e,t,!0,s,!0)),s}function hp(n,e,t){return ut(()=>n(e,t))}function P(n,e,t,r){if(t!==void 0&&!r&&(r=[]),typeof e!="function")return Gr(n,e,r,t);J(s=>Gr(n,e(),s,t),r)}function dp(n,e,t,r,s={},i=!1){e||(e={});for(const a in s)if(!(a in e)){if(a==="children")continue;s[a]=Al(n,a,null,s[a],t,i,e)}for(const a in e){if(a==="children")continue;const c=e[a];s[a]=Al(n,a,c,s[a],t,i,e)}}function fp(n){return n.toLowerCase().replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}function bl(n,e,t){const r=e.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)n.classList.toggle(r[s],t)}function Al(n,e,t,r,s,i,a){let c,u,h,f,p;if(e==="style")return up(n,t,r);if(e==="classList")return or(n,t,r);if(t===r)return r;if(e==="ref")i||t(n);else if(e.slice(0,3)==="on:"){const E=e.slice(3);r&&n.removeEventListener(E,r,typeof r!="function"&&r),t&&n.addEventListener(E,t,typeof t!="function"&&t)}else if(e.slice(0,10)==="oncapture:"){const E=e.slice(10);r&&n.removeEventListener(E,r,!0),t&&n.addEventListener(E,t,!0)}else if(e.slice(0,2)==="on"){const E=e.slice(2).toLowerCase(),b=rp.has(E);if(!b&&r){const k=Array.isArray(r)?r[0]:r;n.removeEventListener(E,k)}(b||t)&&(ya(n,E,t,b),b&&ln([E]))}else if(e.slice(0,5)==="attr:")se(n,e.slice(5),t);else if(e.slice(0,5)==="bool:")lp(n,e.slice(5),t);else if((p=e.slice(0,5)==="prop:")||(h=Zm.has(e))||!s&&((f=np(e,n.tagName))||(u=Xm.has(e)))||(c=n.nodeName.includes("-")||"is"in a))p&&(e=e.slice(5),u=!0),e==="class"||e==="className"?_a(n,t):c&&!u&&!h?n[fp(e)]=t:n[f||e]=t;else{const E=s&&e.indexOf(":")>-1&&ip[e.split(":")[0]];E?cp(n,E,e,t):se(n,ep[e]||e,t)}return t}function mp(n){let e=n.target;const t=`$$${n.type}`,r=n.target,s=n.currentTarget,i=u=>Object.defineProperty(n,"target",{configurable:!0,value:u}),a=()=>{const u=e[t];if(u&&!e.disabled){const h=e[`${t}Data`];if(h!==void 0?u.call(e,h,n):u.call(e,n),n.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(n.target)&&i(e.host),!0},c=()=>{for(;a()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(n,"currentTarget",{configurable:!0,get(){return e||document}}),n.composedPath){const u=n.composedPath();i(u[0]);for(let h=0;h<u.length-2&&(e=u[h],!!a());h++){if(e._$host){e=e._$host,c();break}if(e.parentNode===s)break}}else c();i(r)}function Gr(n,e,t,r,s){for(;typeof t=="function";)t=t();if(e===t)return t;const i=typeof e,a=r!==void 0;if(n=a&&t[0]&&t[0].parentNode||n,i==="string"||i==="number"){if(i==="number"&&(e=e.toString(),e===t))return t;if(a){let c=t[0];c&&c.nodeType===3?c.data!==e&&(c.data=e):c=document.createTextNode(e),t=jn(n,t,r,c)}else t!==""&&typeof t=="string"?t=n.firstChild.data=e:t=n.textContent=e}else if(e==null||i==="boolean")t=jn(n,t,r);else{if(i==="function")return J(()=>{let c=e();for(;typeof c=="function";)c=c();t=Gr(n,c,t,r)}),()=>t;if(Array.isArray(e)){const c=[],u=t&&Array.isArray(t);if(qo(c,e,t,s))return J(()=>t=Gr(n,c,t,r,!0)),()=>t;if(c.length===0){if(t=jn(n,t,r),a)return t}else u?t.length===0?Sl(n,c,r):op(n,t,c):(t&&jn(n),Sl(n,c));t=c}else if(e.nodeType){if(Array.isArray(t)){if(a)return t=jn(n,t,r,e);jn(n,t,null,e)}else t==null||t===""||!n.firstChild?n.appendChild(e):n.replaceChild(e,n.firstChild);t=e}}return t}function qo(n,e,t,r){let s=!1;for(let i=0,a=e.length;i<a;i++){let c=e[i],u=t&&t[n.length],h;if(!(c==null||c===!0||c===!1))if((h=typeof c)=="object"&&c.nodeType)n.push(c);else if(Array.isArray(c))s=qo(n,c,u)||s;else if(h==="function")if(r){for(;typeof c=="function";)c=c();s=qo(n,Array.isArray(c)?c:[c],Array.isArray(u)?u:[u])||s}else n.push(c),s=!0;else{const f=String(c);u&&u.nodeType===3&&u.data===f?n.push(u):n.push(document.createTextNode(f))}}return s}function Sl(n,e,t=null){for(let r=0,s=e.length;r<s;r++)n.insertBefore(e[r],t)}function jn(n,e,t,r){if(t===void 0)return n.textContent="";const s=r||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const c=e[a];if(s!==c){const u=c.parentNode===n;!i&&!a?u?n.replaceChild(s,c):n.insertBefore(s,t):u&&c.remove()}else i=!0}}else n.insertBefore(s,t);return[s]}const pp="http://www.w3.org/2000/svg";function gp(n,e=!1,t=void 0){return e?document.createElementNS(pp,n):document.createElement(n,{is:t})}function _p(n,e){const t=gt(n);return gt(()=>{const r=t();switch(typeof r){case"function":return ut(()=>r(e));case"string":const s=sp.has(r),i=gp(r,s,ut(()=>e.is));return Ah(i,e,s),i}})}function yp(n){const[,e]=bh(n,["component"]);return _p(()=>n.component,e)}/**
* @license lucide-solid v0.475.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var vp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},qn=vp,Ep=j("<svg>"),wp=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Tp=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim(),Ip=n=>{const[e,t]=bh(n,["color","size","strokeWidth","children","class","name","iconNode","absoluteStrokeWidth"]);return(()=>{var r=Ep();return Ah(r,Pe(qn,{get width(){return e.size??qn.width},get height(){return e.size??qn.height},get stroke(){return e.color??qn.stroke},get"stroke-width"(){return re(()=>!!e.absoluteStrokeWidth)()?Number(e.strokeWidth??qn["stroke-width"])*24/Number(e.size):Number(e.strokeWidth??qn["stroke-width"])},get class(){return Tp("lucide","lucide-icon",e.name!=null?`lucide-${wp(e?.name)}`:void 0,e.class!=null?e.class:"")}},t),!0,!0),P(r,V(Jm,{get each(){return e.iconNode},children:([s,i])=>V(yp,Pe({component:s},i))})),r})()},Fe=Ip,bp=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Ap=n=>V(Fe,Pe(n,{name:"Activity",iconNode:bp})),Sh=Ap,Sp=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],Rp=n=>V(Fe,Pe(n,{name:"CalendarClock",iconNode:Sp})),Rl=Rp,Cp=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Pp=n=>V(Fe,Pe(n,{name:"Camera",iconNode:Cp})),Cl=Pp,kp=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],xp=n=>V(Fe,Pe(n,{name:"ChartColumn",iconNode:kp})),va=xp,Np=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Dp=n=>V(Fe,Pe(n,{name:"Check",iconNode:Np})),Rh=Dp,Vp=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Op=n=>V(Fe,Pe(n,{name:"ChevronRight",iconNode:Vp})),Pl=Op,Mp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Lp=n=>V(Fe,Pe(n,{name:"CircleAlert",iconNode:Mp})),Ch=Lp,$p=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],Fp=n=>V(Fe,Pe(n,{name:"FileJson",iconNode:$p})),zo=Fp,Up=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Bp=n=>V(Fe,Pe(n,{name:"FileText",iconNode:Up})),jp=Bp,qp=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],zp=n=>V(Fe,Pe(n,{name:"LogOut",iconNode:qp})),Hp=zp,Gp=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Wp=n=>V(Fe,Pe(n,{name:"Mail",iconNode:Gp})),Kp=Wp,Qp=[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]],Jp=n=>V(Fe,Pe(n,{name:"Mic",iconNode:Qp})),kl=Jp,Yp=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Xp=n=>V(Fe,Pe(n,{name:"Plus",iconNode:Yp})),Zp=Xp,eg=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],tg=n=>V(Fe,Pe(n,{name:"RefreshCcw",iconNode:eg})),xi=tg,ng=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],rg=n=>V(Fe,Pe(n,{name:"Trash2",iconNode:ng})),xl=rg,sg=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],ig=n=>V(Fe,Pe(n,{name:"Utensils",iconNode:sg})),Wr=ig;const og=()=>{};var Nl={};/**
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
 */const Ph=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ag=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},kh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,b=h&63;u||(b=64,a||(E=64)),r.push(t[f],t[p],t[E],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ph(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ag(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new cg;const E=i<<2|c>>4;if(r.push(E),h!==64){const b=c<<4&240|h>>2;if(r.push(b),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class cg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lg=function(n){const e=Ph(n);return kh.encodeByteArray(e,!0)},xh=function(n){return lg(n).replace(/\./g,"")},Nh=function(n){try{return kh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */const hg=()=>ug().__FIREBASE_DEFAULTS__,dg=()=>{if(typeof process>"u"||typeof Nl>"u")return;const n=Nl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Nh(n[1]);return e&&JSON.parse(e)},Ni=()=>{try{return og()||hg()||dg()||fg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dh=n=>Ni()?.emulatorHosts?.[n],mg=n=>{const e=Dh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Vh=()=>Ni()?.config,Oh=n=>Ni()?.[`_${n}`];/**
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
 */class pg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function $e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($e())}function _g(){const n=Ni()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function yg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Eg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wg(){const n=$e();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Tg(){return!_g()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ig(){try{return typeof indexedDB=="object"}catch{return!1}}function bg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Ag="FirebaseError";class dt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ag,Object.setPrototypeOf(this,dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,us.prototype.create)}}class us{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Sg(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new dt(s,c,r)}}function Sg(n,e){return n.replace(Rg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Rg=/\{\$([^}]+)}/g;function Cg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Sn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Dl(i)&&Dl(a)){if(!Sn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Dl(n){return n!==null&&typeof n=="object"}/**
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
 */function hs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Dr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Pg(n,e){const t=new kg(n,e);return t.subscribe.bind(t)}class kg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");xg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Co),s.error===void 0&&(s.error=Co),s.complete===void 0&&(s.complete=Co);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Co(){}/**
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
 */function Se(n){return n&&n._delegate?n._delegate:n}/**
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
 */function Nn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ea(n){return(await fetch(n,{credentials:"include"})).ok}class Zt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const vn="[DEFAULT]";/**
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
 */class Ng{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new pg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Vg(e))try{this.getOrInitializeService({instanceIdentifier:vn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=vn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=vn){return this.instances.has(e)}getOptions(e=vn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Dg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=vn){return this.component?this.component.multipleInstances?e:vn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dg(n){return n===vn?void 0:n}function Vg(n){return n.instantiationMode==="EAGER"}/**
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
 */var te;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(te||(te={}));const Mg={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},Lg=te.INFO,$g={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},Fg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=$g[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wa{constructor(e){this.name=e,this._logLevel=Lg,this._logHandler=Fg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const Ug=(n,e)=>e.some(t=>n instanceof t);let Vl,Ol;function Bg(){return Vl||(Vl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jg(){return Ol||(Ol=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mh=new WeakMap,Ho=new WeakMap,Lh=new WeakMap,Po=new WeakMap,Ta=new WeakMap;function qg(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Qt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Mh.set(t,n)}).catch(()=>{}),Ta.set(e,n),e}function zg(n){if(Ho.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ho.set(n,e)}let Go={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ho.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Lh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Hg(n){Go=n(Go)}function Gg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ko(this),e,...t);return Lh.set(r,e.sort?e.sort():[e]),Qt(r)}:jg().includes(n)?function(...e){return n.apply(ko(this),e),Qt(Mh.get(this))}:function(...e){return Qt(n.apply(ko(this),e))}}function Wg(n){return typeof n=="function"?Gg(n):(n instanceof IDBTransaction&&zg(n),Ug(n,Bg())?new Proxy(n,Go):n)}function Qt(n){if(n instanceof IDBRequest)return qg(n);if(Po.has(n))return Po.get(n);const e=Wg(n);return e!==n&&(Po.set(n,e),Ta.set(e,n)),e}const ko=n=>Ta.get(n);function Kg(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Qt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Qt(a.result),u.oldVersion,u.newVersion,Qt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Qg=["get","getKey","getAll","getAllKeys","count"],Jg=["put","add","delete","clear"],xo=new Map;function Ml(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xo.get(e))return xo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Jg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Qg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return xo.set(e,i),i}Hg(n=>({...n,get:(e,t,r)=>Ml(e,t)||n.get(e,t,r),has:(e,t)=>!!Ml(e,t)||n.has(e,t)}));/**
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
 */const Vt=new wa("@firebase/app"),Zg="@firebase/app-compat",e_="@firebase/analytics-compat",t_="@firebase/analytics",n_="@firebase/app-check-compat",r_="@firebase/app-check",s_="@firebase/auth",i_="@firebase/auth-compat",o_="@firebase/database",a_="@firebase/data-connect",c_="@firebase/database-compat",l_="@firebase/functions",u_="@firebase/functions-compat",h_="@firebase/installations",d_="@firebase/installations-compat",f_="@firebase/messaging",m_="@firebase/messaging-compat",p_="@firebase/performance",g_="@firebase/performance-compat",__="@firebase/remote-config",y_="@firebase/remote-config-compat",v_="@firebase/storage",E_="@firebase/storage-compat",w_="@firebase/firestore",T_="@firebase/ai",I_="@firebase/firestore-compat",b_="firebase",A_="12.14.0";/**
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
 */const Ko="[DEFAULT]",S_={[Wo]:"fire-core",[Zg]:"fire-core-compat",[t_]:"fire-analytics",[e_]:"fire-analytics-compat",[r_]:"fire-app-check",[n_]:"fire-app-check-compat",[s_]:"fire-auth",[i_]:"fire-auth-compat",[o_]:"fire-rtdb",[a_]:"fire-data-connect",[c_]:"fire-rtdb-compat",[l_]:"fire-fn",[u_]:"fire-fn-compat",[h_]:"fire-iid",[d_]:"fire-iid-compat",[f_]:"fire-fcm",[m_]:"fire-fcm-compat",[p_]:"fire-perf",[g_]:"fire-perf-compat",[__]:"fire-rc",[y_]:"fire-rc-compat",[v_]:"fire-gcs",[E_]:"fire-gcs-compat",[w_]:"fire-fst",[I_]:"fire-fst-compat",[T_]:"fire-vertex","fire-js":"fire-js",[b_]:"fire-js-all"};/**
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
 */const Kr=new Map,R_=new Map,Qo=new Map;function $l(n,e){try{n.container.addComponent(e)}catch(t){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rn(n){const e=n.name;if(Qo.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;Qo.set(e,n);for(const t of Kr.values())$l(t,n);for(const t of R_.values())$l(t,n);return!0}function Di(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ke(n){return n==null?!1:n.settings!==void 0}/**
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
 */const C_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new us("app","Firebase",C_);/**
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
 */class P_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
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
 */const ar=A_;function $h(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Ko,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(t||(t=Vh()),!t)throw Jt.create("no-options");const i=Kr.get(s);if(i){if(Sn(t,i.options)&&Sn(r,i.config))return i;throw Jt.create("duplicate-app",{appName:s})}const a=new Og(s);for(const u of Qo.values())a.addComponent(u);const c=new P_(t,r,a);return Kr.set(s,c),c}function Ia(n=Ko){const e=Kr.get(n);if(!e&&n===Ko&&Vh())return $h();if(!e)throw Jt.create("no-app",{appName:n});return e}function k_(){return Array.from(Kr.values())}function _t(n,e,t){let r=S_[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(a.join(" "));return}Rn(new Zt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const x_="firebase-heartbeat-database",N_=1,Qr="firebase-heartbeat-store";let No=null;function Fh(){return No||(No=Kg(x_,N_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Qr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),No}async function D_(n){try{const t=(await Fh()).transaction(Qr),r=await t.objectStore(Qr).get(Uh(n));return await t.done,r}catch(e){if(e instanceof dt)Vt.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e?.message});Vt.warn(t.message)}}}async function Fl(n,e){try{const r=(await Fh()).transaction(Qr,"readwrite");await r.objectStore(Qr).put(e,Uh(n)),await r.done}catch(t){if(t instanceof dt)Vt.warn(t.message);else{const r=Jt.create("idb-set",{originalErrorMessage:t?.message});Vt.warn(r.message)}}}function Uh(n){return`${n.name}!${n.options.appId}`}/**
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
 */function U_(n){Rn(new Zt("platform-logger",e=>new Yg(e),"PRIVATE")),Rn(new Zt("heartbeat",e=>new M_(e),"PRIVATE")),_t(Wo,Ll,n),_t(Wo,Ll,"esm2020"),_t("fire-js","")}U_("");function Bh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const B_=Bh,jh=new us("auth","Firebase",Bh());/**
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
 */const ai=new wa("@firebase/auth");function j_(n,...e){ai.logLevel<=te.WARN&&ai.warn(`Auth (${ar}): ${n}`,...e)}function Hs(n,...e){ai.logLevel<=te.ERROR&&ai.error(`Auth (${ar}): ${n}`,...e)}/**
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
 */function rt(n,...e){throw Aa(n,...e)}function ct(n,...e){return Aa(n,...e)}function ba(n,e,t){const r={...B_(),[e]:t};return new us("auth","Firebase",r).create(e,{appName:n.name})}function Nt(n){return ba(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function q_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&rt(n,"argument-error"),ba(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Aa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return jh.create(n,...e)}function z(n,e,...t){if(!n)throw Aa(e,...t)}function Ct(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Hs(e),new Error(e)}function Ot(n,e){n||Ct(e)}/**
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
 */class ds{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ot(t>e,"Short delay should be less than long delay!"),this.isMobile=gg()||Eg()}get(){return H_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */class qh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const K_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Q_=new ds(3e4,6e4);function un(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function hn(n,e,t,r,s={}){return zh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=hs({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return yg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Nn(n.emulatorConfig.host)&&(h.credentials="include"),qh.fetch()(await Hh(n,n.config.apiHost,t,c),h)})}async function zh(n,e,t){n._canInitEmulator=!1;const r={...W_,...e};try{const s=new Y_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw $s(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw $s(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw $s(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw $s(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ba(n,f,h);rt(n,f)}}catch(s){if(s instanceof dt)throw s;rt(n,"network-request-failed",{message:String(s)})}}async function fs(n,e,t,r,s={}){const i=await hn(n,e,t,r,s);return"mfaPendingCredential"in i&&rt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Hh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Sa(n.config,s):`${n.config.apiScheme}://${s}`;return K_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function J_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Y_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ct(this.auth,"network-request-failed")),Q_.get())})}}function $s(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ct(n,e,r);return s.customData._tokenResponse=t,s}function ql(n){return n!==void 0&&n.enterprise!==void 0}class X_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return J_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Z_(n,e){return hn(n,"GET","/v2/recaptchaConfig",un(n,e))}/**
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
 */async function ey(n,e){return hn(n,"POST","/v1/accounts:delete",e)}async function ci(n,e){return hn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ur(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ty(n,e=!1){const t=Se(n),r=await t.getIdToken(e),s=Ra(r);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Ur(Do(s.auth_time)),issuedAtTime:Ur(Do(s.iat)),expirationTime:Ur(Do(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Do(n){return Number(n)*1e3}function Ra(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Hs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Nh(t);return s?JSON.parse(s):(Hs("Failed to decode base64 JWT payload"),null)}catch(s){return Hs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function zl(n){const e=Ra(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Jr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof dt&&ny(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ny({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Yo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ur(this.lastLoginAt),this.creationTime=Ur(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function li(n){const e=n.auth,t=await n.getIdToken(),r=await Jr(n,ci(e,{idToken:t}));z(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Gh(s.providerUserInfo):[],a=iy(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function sy(n){const e=Se(n);await li(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iy(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Gh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function oy(n,e){const t=await zh(n,{},async()=>{const r=hs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Hh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Nn(n.emulatorConfig.host)&&(u.credentials="include"),qh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ay(n,e){return hn(n,"POST","/v2/accounts:revokeToken",un(n,e))}/**
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
 */class Kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=zl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await oy(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Kn;return r&&(z(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(z(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Kn,this.toJSON())}_performRefresh(){return Ct("not implemented")}}/**
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
 */function Ht(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ot{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ry(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Yo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Jr(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ty(this,e)}reload(){return sy(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ot({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await li(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(Nt(this.auth));const e=await this.getIdToken();return await Jr(this,ey(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:E,isAnonymous:b,providerData:k,stsTokenManager:D}=t;z(p&&D,e,"internal-error");const x=Kn.fromJSON(this.name,D);z(typeof p=="string",e,"internal-error"),Ht(r,e.name),Ht(s,e.name),z(typeof E=="boolean",e,"internal-error"),z(typeof b=="boolean",e,"internal-error"),Ht(i,e.name),Ht(a,e.name),Ht(c,e.name),Ht(u,e.name),Ht(h,e.name),Ht(f,e.name);const N=new ot({uid:p,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:x,createdAt:h,lastLoginAt:f});return k&&Array.isArray(k)&&(N.providerData=k.map(F=>({...F}))),u&&(N._redirectEventId=u),N}static async _fromIdTokenResponse(e,t,r=!1){const s=new Kn;s.updateFromServerResponse(t);const i=new ot({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await li(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Gh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Kn;c.updateFromIdToken(r);const u=new ot({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
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
 */const Hl=new Map;function Pt(n){Ot(n instanceof Function,"Expected a class definition");let e=Hl.get(n);return e?(Ot(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Hl.set(n,e),e)}/**
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
 */function Gs(n,e,t){return`firebase:${n}:${e}:${t}`}class Qn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Gs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Gs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ci(this.auth,{idToken:e}).catch(()=>{});return t?ot._fromGetAccountInfoResponse(this.auth,t,e):null}return ot._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Qn(Pt(Gl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Pt(Gl);const a=Gs(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const E=await ci(e,{idToken:f}).catch(()=>{});if(!E)break;p=await ot._fromGetAccountInfoResponse(e,E,f)}else p=ot._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Qn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Qn(i,e,r))}}/**
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
 */function Wl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zh(e))return"Blackberry";if(ed(e))return"Webos";if(Qh(e))return"Safari";if((e.includes("chrome/")||Jh(e))&&!e.includes("edge/"))return"Chrome";if(Xh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Kh(n=$e()){return/firefox\//i.test(n)}function Qh(n=$e()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jh(n=$e()){return/crios\//i.test(n)}function Yh(n=$e()){return/iemobile/i.test(n)}function Xh(n=$e()){return/android/i.test(n)}function Zh(n=$e()){return/blackberry/i.test(n)}function ed(n=$e()){return/webos/i.test(n)}function Ca(n=$e()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function cy(n=$e()){return Ca(n)&&!!window.navigator?.standalone}function ly(){return wg()&&document.documentMode===10}function td(n=$e()){return Ca(n)||Xh(n)||ed(n)||Zh(n)||/windows phone/i.test(n)||Yh(n)}/**
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
 */function nd(n,e=[]){let t;switch(n){case"Browser":t=Wl($e());break;case"Worker":t=`${Wl($e())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
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
 */async function hy(n,e={}){return hn(n,"GET","/v2/passwordPolicy",un(n,e))}/**
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
 */class my{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kl(this),this.idTokenSubscription=new Kl(this),this.beforeStateQueue=new uy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Qn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ci(this,{idToken:e}),r=await ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ke(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await li(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=G_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(Nt(this));const t=e?Se(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(Nt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(Nt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hy(this),t=new fy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new us("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ay(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Pt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await Qn.create(this,[Pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ke(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&j_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function dn(n){return Se(n)}class Kl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Pg(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function py(n){Vi=n}function rd(n){return Vi.loadJS(n)}function gy(){return Vi.recaptchaEnterpriseScript}function _y(){return Vi.gapiScript}function yy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class vy{constructor(){this.enterprise=new Ey}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ey{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const wy="recaptcha-enterprise",sd="NO_RECAPTCHA";class Ty{constructor(e){this.type=wy,this.auth=dn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{Z_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new X_(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;ql(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(sd)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new vy().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&ql(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=gy();u.length!==0&&(u+=c),rd(u).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function Ql(n,e,t,r=!1,s=!1){const i=new Ty(n);let a;if(s)a=sd;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Xo(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ql(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Ql(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
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
 */function Iy(n,e){const t=Di(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Sn(i,e??{}))return s;rt(s,"already-initialized")}return t.initialize({options:e})}function by(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Pt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ay(n,e,t){const r=dn(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=id(e),{host:a,port:c}=Sy(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(Sn(h,r.config.emulator)&&Sn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Nn(a)?Ea(`${i}//${a}${u}`):Ry()}function id(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Sy(n){const e=id(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Jl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Jl(a)}}}function Jl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ry(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Pa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ct("not implemented")}_getIdTokenResponse(e){return Ct("not implemented")}_linkToIdToken(e,t){return Ct("not implemented")}_getReauthenticationResolver(e){return Ct("not implemented")}}async function Cy(n,e){return hn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Py(n,e){return fs(n,"POST","/v1/accounts:signInWithPassword",un(n,e))}/**
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
 */async function ky(n,e){return fs(n,"POST","/v1/accounts:signInWithEmailLink",un(n,e))}async function xy(n,e){return fs(n,"POST","/v1/accounts:signInWithEmailLink",un(n,e))}/**
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
 */class Yr extends Pa{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Yr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Yr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xo(e,t,"signInWithPassword",Py);case"emailLink":return ky(e,{email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xo(e,r,"signUpPassword",Cy);case"emailLink":return xy(e,{idToken:t,email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Jn(n,e){return fs(n,"POST","/v1/accounts:signInWithIdp",un(n,e))}/**
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
 */const Ny="http://localhost";class Cn extends Pa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Cn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Cn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Jn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Jn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Jn(e,t)}buildRequest(){const e={requestUri:Ny,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=hs(t)}return e}}/**
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
 */function Dy(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vy(n){const e=Dr(Vr(n)).link,t=e?Dr(Vr(e)).deep_link_id:null,r=Dr(Vr(n)).deep_link_id;return(r?Dr(Vr(r)).link:null)||r||t||e||n}class ka{constructor(e){const t=Dr(Vr(e)),r=t.apiKey??null,s=t.oobCode??null,i=Dy(t.mode??null);z(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Vy(e);try{return new ka(t)}catch{return null}}}/**
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
 */class cr{constructor(){this.providerId=cr.PROVIDER_ID}static credential(e,t){return Yr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ka.parseLink(t);return z(r,"argument-error"),Yr._fromEmailAndCode(e,r.code,r.tenantId)}}cr.PROVIDER_ID="password";cr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";cr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Gt extends ms{constructor(){super("facebook.com")}static credential(e){return Cn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gt.PROVIDER_ID="facebook.com";/**
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
 */class Rt extends ms{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Cn._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Rt.credential(t,r)}catch{return null}}}Rt.GOOGLE_SIGN_IN_METHOD="google.com";Rt.PROVIDER_ID="google.com";/**
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
 */class Wt extends ms{constructor(){super("github.com")}static credential(e){return Cn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.GITHUB_SIGN_IN_METHOD="github.com";Wt.PROVIDER_ID="github.com";/**
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
 */class Kt extends ms{constructor(){super("twitter.com")}static credential(e,t){return Cn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Kt.credential(t,r)}catch{return null}}}Kt.TWITTER_SIGN_IN_METHOD="twitter.com";Kt.PROVIDER_ID="twitter.com";/**
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
 */async function Oy(n,e){return fs(n,"POST","/v1/accounts:signUp",un(n,e))}/**
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
 */class Pn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ot._fromIdTokenResponse(e,r,s),a=Yl(r);return new Pn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Yl(r);return new Pn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Yl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ui extends dt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ui.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ui(e,t,r,s)}}function od(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ui._fromErrorAndOperation(n,i,e,r):i})}async function My(n,e,t=!1){const r=await Jr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Pn._forOperation(n,"link",r)}/**
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
 */async function Ly(n,e,t=!1){const{auth:r}=n;if(Ke(r.app))return Promise.reject(Nt(r));const s="reauthenticate";try{const i=await Jr(n,od(r,s,e,n),t);z(i.idToken,r,"internal-error");const a=Ra(i.idToken);z(a,r,"internal-error");const{sub:c}=a;return z(n.uid===c,r,"user-mismatch"),Pn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&rt(r,"user-mismatch"),i}}/**
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
 */async function ad(n,e,t=!1){if(Ke(n.app))return Promise.reject(Nt(n));const r="signIn",s=await od(n,r,e),i=await Pn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function $y(n,e){return ad(dn(n),e)}/**
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
 */async function cd(n){const e=dn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Fy(n,e,t){if(Ke(n.app))return Promise.reject(Nt(n));const r=dn(n),a=await Xo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Oy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&cd(n),u}),c=await Pn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function Uy(n,e,t){return Ke(n.app)?Promise.reject(Nt(n)):$y(Se(n),cr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&cd(n),r})}function By(n,e,t,r){return Se(n).onIdTokenChanged(e,t,r)}function jy(n,e,t){return Se(n).beforeAuthStateChanged(e,t)}function qy(n,e,t,r){return Se(n).onAuthStateChanged(e,t,r)}function zy(n){return Se(n).signOut()}const hi="__sak";/**
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
 */class Qy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=Na("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const E=p;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function yt(){return window}function Jy(n){yt().location.href=n}/**
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
 */function fd(){return typeof yt().WorkerGlobalScope<"u"&&typeof yt().importScripts=="function"}async function Yy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xy(){return navigator?.serviceWorker?.controller||null}function Zy(){return fd()?self:null}/**
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
 */const md="firebaseLocalStorageDb",ev=1,di="firebaseLocalStorage",pd="fbase_key";class ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Mi(n,e){return n.transaction([di],e?"readwrite":"readonly").objectStore(di)}function tv(){const n=indexedDB.deleteDatabase(md);return new ps(n).toPromise()}function gd(){const n=indexedDB.open(md,ev);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(di,{keyPath:pd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(di)?e(r):(r.close(),await tv(),e(await gd()))})})}async function Xl(n,e,t){const r=Mi(n,!0).put({[pd]:e,value:t});return new ps(r).toPromise()}async function nv(n,e){const t=Mi(n,!1).get(e),r=await new ps(t).toPromise();return r===void 0?null:r.value}function Zl(n,e){const t=Mi(n,!0).delete(e);return new ps(t).toPromise()}const rv=800,sv=3;class _d{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=gd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>sv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return fd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oi._getInstance(Zy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Yy(),!this.activeServiceWorker)return;this.sender=new Qy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Xl(e,hi,"1"),await Zl(e,hi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Xl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>nv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Zl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Mi(s,!1).getAll();return new ps(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}_d.type="LOCAL";const iv=_d;new ds(3e4,6e4);/**
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
 */function yd(n,e){return e?Pt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Da extends Pa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ov(n){return ad(n.auth,new Da(n),n.bypassAuthState)}function av(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),Ly(t,new Da(n),n.bypassAuthState)}async function cv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),My(t,new Da(n),n.bypassAuthState)}/**
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
 */const lv=new ds(2e3,1e4);async function uv(n,e,t){if(Ke(n.app))return Promise.reject(ct(n,"operation-not-supported-in-this-environment"));const r=dn(n);q_(n,e,xa);const s=yd(r,t);return new En(r,"signInViaPopup",e,s).executeNotNull()}class En extends vd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,En.currentPopupAction&&En.currentPopupAction.cancel(),En.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){Ot(this.filter.length===1,"Popup operations only handle one event");const e=Na();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,En.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lv.get())};e()}}En.currentPopupAction=null;/**
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
 */const hv="pendingRedirect",Ws=new Map;class dv extends vd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ws.get(this.auth._key());if(!e){try{const r=await fv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ws.set(this.auth._key(),e)}return this.bypassAuthState||Ws.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fv(n,e){const t=gv(e),r=pv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function mv(n,e){Ws.set(n._key(),e)}function pv(n){return Pt(n._redirectPersistence)}function gv(n){return Gs(hv,n.config.apiKey,n.name)}async function _v(n,e,t=!1){if(Ke(n.app))return Promise.reject(Nt(n));const r=dn(n),s=yd(r,e),a=await new dv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const yv=600*1e3;class vv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ev(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ed(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ct(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yv&&this.cachedEventUids.clear(),this.cachedEventUids.has(eu(e))}saveEventToCache(e){this.cachedEventUids.add(eu(e)),this.lastProcessedEventTime=Date.now()}}function eu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ed({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Ev(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ed(n);default:return!1}}/**
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
 */async function wv(n,e={}){return hn(n,"GET","/v1/projects",e)}/**
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
 */const Sv=new ds(3e4,6e4);function tu(){const n=yt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Rv(n){return new Promise((e,t)=>{function r(){tu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{tu(),t(ct(n,"network-request-failed"))},timeout:Sv.get()})}if(yt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(yt().gapi?.load)r();else{const s=yy("iframefcb");return yt()[s]=()=>{gapi.load?r():t(ct(n,"network-request-failed"))},rd(`${_y()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Ks=null,e})}let Ks=null;function Cv(n){return Ks=Ks||Rv(n),Ks}/**
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
 */const Pv=new ds(5e3,15e3),kv="__/auth/iframe",xv="emulator/auth/iframe",Nv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Dv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Vv(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Sa(e,xv):`https://${n.config.authDomain}/${kv}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=Dv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${hs(r).slice(1)}`}async function Ov(n){const e=await Cv(n),t=yt().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:Vv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Nv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=ct(n,"network-request-failed"),c=yt().setTimeout(()=>{i(a)},Pv.get());function u(){yt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Mv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Lv=500,$v=600,Fv="_blank",Uv="http://localhost";class nu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bv(n,e,t,r=Lv,s=$v){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Mv,width:r.toString(),height:s.toString(),top:i,left:a},h=$e().toLowerCase();t&&(c=Jh(h)?Fv:t),Kh(h)&&(e=e||Uv,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[b,k])=>`${E}${b}=${k},`,"");if(cy(h)&&c!=="_self")return jv(e||"",c),new nu(null);const p=window.open(e||"",c,f);z(p,n,"popup-blocked");try{p.focus()}catch{}return new nu(p)}function jv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const qv="__/auth/handler",zv="emulator/auth/handler",Hv=encodeURIComponent("fac");async function ru(n,e,t,r,s,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof xa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Cg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof ms){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Hv}=${encodeURIComponent(u)}`:"";return`${Gv(n)}?${hs(c).slice(1)}${h}`}function Gv({config:n}){return n.emulator?Sa(n,zv):`https://${n.authDomain}/${qv}`}/**
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
 */const Vo="webStorageSupport";class Wv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=dd,this._completeRedirectFn=_v,this._overrideRedirectResult=mv}async _openPopup(e,t,r,s){Ot(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ru(e,t,r,Jo(),s);return Bv(e,i,Na())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await ru(e,t,r,Jo(),s);return Jy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Ot(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ov(e),r=new vv(e);return t.register("authEvent",s=>(z(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vo,{type:Vo},s=>{const i=s?.[0]?.[Vo];i!==void 0&&t(!!i),rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=bv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return td()||Qh()||Ca()}}const Kv=Wv;var su="@firebase/auth",iu="1.13.2";/**
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
 */class Qv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Jv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Yv(n){Rn(new Zt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;z(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nd(n)},h=new my(r,s,i,u);return by(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rn(new Zt("auth-internal",e=>{const t=dn(e.getProvider("auth").getImmediate());return(r=>new Qv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),_t(su,iu,Jv(n)),_t(su,iu,"esm2020")}/**
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
 */const Xv=300,Zv=Oh("authIdTokenMaxAge")||Xv;let ou=null;const eE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Zv)return;const s=t?.token;ou!==s&&(ou=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function tE(n=Ia()){const e=Di(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Iy(n,{popupRedirectResolver:Kv,persistence:[iv,Wy,dd]}),r=Oh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=eE(i.toString());jy(t,a,()=>a(t.currentUser)),By(t,c=>a(c))}}const s=Dh("auth");return s&&Ay(t,`http://${s}`),t}function nE(){return document.getElementsByTagName("head")?.[0]??document}py({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ct("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",nE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Yv("Browser");var rE="firebase",sE="12.14.0";/**
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
 */_t(rE,sE,"app");var au=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,wd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function y(){}y.prototype=_.prototype,w.F=_.prototype,w.prototype=new y,w.prototype.constructor=w,w.D=function(T,v,I){for(var g=Array(arguments.length-2),W=2;W<arguments.length;W++)g[W-2]=arguments[W];return _.prototype[v].apply(T,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,y){y||(y=0);const T=Array(16);if(typeof _=="string")for(var v=0;v<16;++v)T[v]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(v=0;v<16;++v)T[v]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=w.g[0],y=w.g[1],v=w.g[2];let I=w.g[3],g;g=_+(I^y&(v^I))+T[0]+3614090360&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+T[1]+3905402710&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+T[2]+606105819&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+T[3]+3250441966&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+T[4]+4118548399&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+T[5]+1200080426&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+T[6]+2821735955&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+T[7]+4249261313&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+T[8]+1770035416&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+T[9]+2336552879&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+T[10]+4294925233&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+T[11]+2304563134&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(I^y&(v^I))+T[12]+1804603682&4294967295,_=y+(g<<7&4294967295|g>>>25),g=I+(v^_&(y^v))+T[13]+4254626195&4294967295,I=_+(g<<12&4294967295|g>>>20),g=v+(y^I&(_^y))+T[14]+2792965006&4294967295,v=I+(g<<17&4294967295|g>>>15),g=y+(_^v&(I^_))+T[15]+1236535329&4294967295,y=v+(g<<22&4294967295|g>>>10),g=_+(v^I&(y^v))+T[1]+4129170786&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+T[6]+3225465664&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+T[11]+643717713&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+T[0]+3921069994&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+T[5]+3593408605&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+T[10]+38016083&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+T[15]+3634488961&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+T[4]+3889429448&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+T[9]+568446438&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+T[14]+3275163606&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+T[3]+4107603335&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+T[8]+1163531501&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(v^I&(y^v))+T[13]+2850285829&4294967295,_=y+(g<<5&4294967295|g>>>27),g=I+(y^v&(_^y))+T[2]+4243563512&4294967295,I=_+(g<<9&4294967295|g>>>23),g=v+(_^y&(I^_))+T[7]+1735328473&4294967295,v=I+(g<<14&4294967295|g>>>18),g=y+(I^_&(v^I))+T[12]+2368359562&4294967295,y=v+(g<<20&4294967295|g>>>12),g=_+(y^v^I)+T[5]+4294588738&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+T[8]+2272392833&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+T[11]+1839030562&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+T[14]+4259657740&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+T[1]+2763975236&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+T[4]+1272893353&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+T[7]+4139469664&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+T[10]+3200236656&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+T[13]+681279174&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+T[0]+3936430074&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+T[3]+3572445317&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+T[6]+76029189&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(y^v^I)+T[9]+3654602809&4294967295,_=y+(g<<4&4294967295|g>>>28),g=I+(_^y^v)+T[12]+3873151461&4294967295,I=_+(g<<11&4294967295|g>>>21),g=v+(I^_^y)+T[15]+530742520&4294967295,v=I+(g<<16&4294967295|g>>>16),g=y+(v^I^_)+T[2]+3299628645&4294967295,y=v+(g<<23&4294967295|g>>>9),g=_+(v^(y|~I))+T[0]+4096336452&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+T[7]+1126891415&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+T[14]+2878612391&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+T[5]+4237533241&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+T[12]+1700485571&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+T[3]+2399980690&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+T[10]+4293915773&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+T[1]+2240044497&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+T[8]+1873313359&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+T[15]+4264355552&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+T[6]+2734768916&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+T[13]+1309151649&4294967295,y=v+(g<<21&4294967295|g>>>11),g=_+(v^(y|~I))+T[4]+4149444226&4294967295,_=y+(g<<6&4294967295|g>>>26),g=I+(y^(_|~v))+T[11]+3174756917&4294967295,I=_+(g<<10&4294967295|g>>>22),g=v+(_^(I|~y))+T[2]+718787259&4294967295,v=I+(g<<15&4294967295|g>>>17),g=y+(I^(v|~_))+T[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,w.g[2]=w.g[2]+v&4294967295,w.g[3]=w.g[3]+I&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const y=_-this.blockSize,T=this.C;let v=this.h,I=0;for(;I<_;){if(v==0)for(;I<=y;)s(this,w,I),I+=this.blockSize;if(typeof w=="string"){for(;I<_;)if(T[v++]=w.charCodeAt(I++),v==this.blockSize){s(this,T),v=0;break}}else for(;I<_;)if(T[v++]=w[I++],v==this.blockSize){s(this,T),v=0;break}}this.h=v,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var y=w.length-8;y<w.length;++y)w[y]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,y=0;y<4;++y)for(let T=0;T<32;T+=8)w[_++]=this.g[y]>>>T&255;return w};function i(w,_){var y=c;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=_(w)}function a(w,_){this.h=_;const y=[];let T=!0;for(let v=w.length-1;v>=0;v--){const I=w[v]|0;T&&I==_||(y[v]=I,T=!1)}this.g=y}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new a([_|0],_<0?-1:0)}):new a([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return x(h(-w));const _=[];let y=1;for(let T=0;w>=y;T++)_[T]=w/y|0,y*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return x(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(_,8));let T=p;for(let I=0;I<w.length;I+=8){var v=Math.min(8,w.length-I);const g=parseInt(w.substring(I,I+v),_);v<8?(v=h(Math.pow(_,v)),T=T.j(v).add(h(g))):(T=T.j(y),T=T.add(h(g)))}return T}var p=u(0),E=u(1),b=u(16777216);n=a.prototype,n.m=function(){if(D(this))return-x(this).m();let w=0,_=1;for(let y=0;y<this.g.length;y++){const T=this.i(y);w+=(T>=0?T:4294967296+T)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(k(this))return"0";if(D(this))return"-"+x(this).toString(w);const _=h(Math.pow(w,6));var y=this;let T="";for(;;){const v=q(y,_).g;y=N(y,v.j(_));let I=((y.g.length>0?y.g[0]:y.h)>>>0).toString(w);if(y=v,k(y))return I+T;for(;I.length<6;)I="0"+I;T=I+T}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function k(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function D(w){return w.h==-1}n.l=function(w){return w=N(this,w),D(w)?-1:k(w)?0:1};function x(w){const _=w.g.length,y=[];for(let T=0;T<_;T++)y[T]=~w.g[T];return new a(y,~w.h).add(E)}n.abs=function(){return D(this)?x(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),y=[];let T=0;for(let v=0;v<=_;v++){let I=T+(this.i(v)&65535)+(w.i(v)&65535),g=(I>>>16)+(this.i(v)>>>16)+(w.i(v)>>>16);T=g>>>16,I&=65535,g&=65535,y[v]=g<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function N(w,_){return w.add(x(_))}n.j=function(w){if(k(this)||k(w))return p;if(D(this))return D(w)?x(this).j(x(w)):x(x(this).j(w));if(D(w))return x(this.j(x(w)));if(this.l(b)<0&&w.l(b)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,y=[];for(var T=0;T<2*_;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(let v=0;v<w.g.length;v++){const I=this.i(T)>>>16,g=this.i(T)&65535,W=w.i(v)>>>16,ce=w.i(v)&65535;y[2*T+2*v]+=g*ce,F(y,2*T+2*v),y[2*T+2*v+1]+=I*ce,F(y,2*T+2*v+1),y[2*T+2*v+1]+=g*W,F(y,2*T+2*v+1),y[2*T+2*v+2]+=I*W,F(y,2*T+2*v+2)}for(w=0;w<_;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=_;w<2*_;w++)y[w]=0;return new a(y,0)};function F(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function $(w,_){this.g=w,this.h=_}function q(w,_){if(k(_))throw Error("division by zero");if(k(w))return new $(p,p);if(D(w))return _=q(x(w),_),new $(x(_.g),x(_.h));if(D(_))return _=q(w,x(_)),new $(x(_.g),_.h);if(w.g.length>30){if(D(w)||D(_))throw Error("slowDivide_ only works with positive integers.");for(var y=E,T=_;T.l(w)<=0;)y=G(y),T=G(T);var v=B(y,1),I=B(T,1);for(T=B(T,2),y=B(y,2);!k(T);){var g=I.add(T);g.l(w)<=0&&(v=v.add(y),I=g),T=B(T,1),y=B(y,1)}return _=N(w,v.j(_)),new $(v,_)}for(v=p;w.l(_)>=0;){for(y=Math.max(1,Math.floor(w.m()/_.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),I=h(y),g=I.j(_);D(g)||g.l(w)>0;)y-=T,I=h(y),g=I.j(_);k(I)&&(I=E),v=v.add(I),w=N(w,g)}return new $(v,w)}n.B=function(w){return q(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let T=0;T<_;T++)y[T]=this.i(T)&w.i(T);return new a(y,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let T=0;T<_;T++)y[T]=this.i(T)|w.i(T);return new a(y,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),y=[];for(let T=0;T<_;T++)y[T]=this.i(T)^w.i(T);return new a(y,this.h^w.h)};function G(w){const _=w.g.length+1,y=[];for(let T=0;T<_;T++)y[T]=w.i(T)<<1|w.i(T-1)>>>31;return new a(y,w.h)}function B(w,_){const y=_>>5;_%=32;const T=w.g.length-y,v=[];for(let I=0;I<T;I++)v[I]=_>0?w.i(I+y)>>>_|w.i(I+y+1)<<32-_:w.i(I+y);return new a(v,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,wd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Yt=a}).apply(typeof au<"u"?au:typeof self<"u"?self:typeof window<"u"?window:{});var Fs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Td,Or,Id,Qs,Zo,bd,Ad,Sd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fs=="object"&&Fs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in d))break e;d=d[A]}o=o[o.length-1],m=d[o],l=l(m),l!=m&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=u,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,A,S){for(var O=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)O[Y-2]=arguments[Y];return l.prototype[A].apply(m,O)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const l=o.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=o[m];return d}return[]}function k(o,l){for(let m=1;m<arguments.length;m++){const A=arguments[m];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=o.length||0;const S=A.length||0;o.length=d+S;for(let O=0;O<S;O++)o[d+O]=A[O]}else o.push(A)}}class D{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(o){a.setTimeout(()=>{throw o},0)}function N(){var o=w;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class F{constructor(){this.h=this.g=null}add(l,d){const m=$.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var $=new D(()=>new q,o=>o.reset());class q{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let G,B=!1,w=new F,_=()=>{const o=Promise.resolve(void 0);G=()=>{o.then(y)}};function y(){for(var o;o=N();){try{o.h.call(o.g)}catch(d){x(d)}var l=$;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}B=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var I=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function W(o,l){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(W,v),W.prototype.init=function(o,l){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&W.Z.h.call(this)},W.prototype.h=function(){W.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ce="closure_listenable_"+(Math.random()*1e6|0),Ue=0;function Ze(o,l,d,m,A){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=A,this.key=++Ue,this.da=this.fa=!1}function ze(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function He(o,l,d){for(const m in o)l.call(d,o[m],m,o)}function st(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function Ye(o){const l={};for(const d in o)l[d]=o[d];return l}const Be="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function we(o,l){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)o[d]=m[d];for(let S=0;S<Be.length;S++)d=Be[S],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function me(o){this.src=o,this.g={},this.h=0}me.prototype.add=function(o,l,d,m,A){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const O=it(o,l,m,A);return O>-1?(l=o[O],d||(l.fa=!1)):(l=new Ze(l,this.src,S,!!m,A),l.fa=d,o.push(l)),l};function ke(o,l){const d=l.type;if(d in o.g){var m=o.g[d],A=Array.prototype.indexOf.call(m,l,void 0),S;(S=A>=0)&&Array.prototype.splice.call(m,A,1),S&&(ze(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function it(o,l,d,m){for(let A=0;A<o.length;++A){const S=o[A];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==m)return A}return-1}var et="closure_lm_"+(Math.random()*1e6|0),Ln={};function Ts(o,l,d,m,A){if(Array.isArray(l)){for(let S=0;S<l.length;S++)Ts(o,l[S],d,m,A);return null}return d=Rc(d),o&&o[ce]?o.J(l,d,c(m)?!!m.capture:!1,A):Is(o,l,d,!1,m,A)}function Is(o,l,d,m,A,S){if(!l)throw Error("Invalid event type");const O=c(A)?!!A.capture:!!A;let Y=mr(o);if(Y||(o[et]=Y=new me(o)),d=Y.add(l,d,m,O,S),d.proxy)return d;if(m=io(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)I||(A=O),A===void 0&&(A=!1),o.addEventListener(l.toString(),m,A);else if(o.attachEvent)o.attachEvent(ue(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function io(){function o(d){return l.call(o.src,o.listener,d)}const l=St;return o}function bs(o,l,d,m,A){if(Array.isArray(l))for(var S=0;S<l.length;S++)bs(o,l[S],d,m,A);else m=c(m)?!!m.capture:!!m,d=Rc(d),o&&o[ce]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],d=it(l,d,m,A),d>-1&&(ze(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=mr(o))&&(l=o.g[l.toString()],o=-1,l&&(o=it(l,d,m,A)),(d=o>-1?l[o]:null)&&$n(d))}function $n(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[ce])ke(l.i,o);else{var d=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(d,m,o.capture):l.detachEvent?l.detachEvent(ue(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=mr(l))?(ke(d,o),d.h==0&&(d.src=null,l[et]=null)):ze(o)}}}function ue(o){return o in Ln?Ln[o]:Ln[o]="on"+o}function St(o,l){if(o.da)o=!0;else{l=new W(l,this);const d=o.listener,m=o.ha||o.src;o.fa&&$n(o),o=d.call(m,l)}return o}function mr(o){return o=o[et],o instanceof me?o:null}var oo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Rc(o){return typeof o=="function"?o:(o[oo]||(o[oo]=function(l){return o.handleEvent(l)}),o[oo])}function Ve(){T.call(this),this.i=new me(this),this.M=this,this.G=null}p(Ve,T),Ve.prototype[ce]=!0,Ve.prototype.removeEventListener=function(o,l,d,m){bs(this,o,l,d,m)};function je(o,l){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new v(l,o);else if(l instanceof v)l.target=l.target||o;else{var A=l;l=new v(m,o),we(l,A)}A=!0;let S,O;if(d)for(O=d.length-1;O>=0;O--)S=l.g=d[O],A=As(S,m,!0,l)&&A;if(S=l.g=o,A=As(S,m,!0,l)&&A,A=As(S,m,!1,l)&&A,d)for(O=0;O<d.length;O++)S=l.g=d[O],A=As(S,m,!1,l)&&A}Ve.prototype.N=function(){if(Ve.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let m=0;m<d.length;m++)ze(d[m]);delete o.g[l],o.h--}}this.G=null},Ve.prototype.J=function(o,l,d,m){return this.i.add(String(o),l,!1,d,m)},Ve.prototype.K=function(o,l,d,m){return this.i.add(String(o),l,!0,d,m)};function As(o,l,d,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let S=0;S<l.length;++S){const O=l[S];if(O&&!O.da&&O.capture==d){const Y=O.listener,Te=O.ha||O.src;O.fa&&ke(o.i,O),A=Y.call(Te,m)!==!1&&A}}return A&&!m.defaultPrevented}function hm(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Cc(o){o.g=hm(()=>{o.g=null,o.i&&(o.i=!1,Cc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class dm extends T{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Cc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pr(o){T.call(this),this.h=o,this.g={}}p(pr,T);var Pc=[];function kc(o){He(o.g,function(l,d){this.g.hasOwnProperty(d)&&$n(l)},o),o.g={}}pr.prototype.N=function(){pr.Z.N.call(this),kc(this)},pr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ao=a.JSON.stringify,fm=a.JSON.parse,mm=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function xc(){}function Nc(){}var gr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function co(){v.call(this,"d")}p(co,v);function lo(){v.call(this,"c")}p(lo,v);var mn={},Dc=null;function Ss(){return Dc=Dc||new Ve}mn.Ia="serverreachability";function Vc(o){v.call(this,mn.Ia,o)}p(Vc,v);function _r(o){const l=Ss();je(l,new Vc(l))}mn.STAT_EVENT="statevent";function Oc(o,l){v.call(this,mn.STAT_EVENT,o),this.stat=l}p(Oc,v);function qe(o){const l=Ss();je(l,new Oc(l,o))}mn.Ja="timingevent";function Mc(o,l){v.call(this,mn.Ja,o),this.size=l}p(Mc,v);function yr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function vr(){this.g=!0}vr.prototype.ua=function(){this.g=!1};function pm(o,l,d,m,A,S){o.info(function(){if(o.g)if(S){var O="",Y=S.split("&");for(let oe=0;oe<Y.length;oe++){var Te=Y[oe].split("=");if(Te.length>1){const Re=Te[0];Te=Te[1];const mt=Re.split("_");O=mt.length>=2&&mt[1]=="type"?O+(Re+"="+Te+"&"):O+(Re+"=redacted&")}}}else O=null;else O=S;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+d+`
`+O})}function gm(o,l,d,m,A,S,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+d+`
`+S+" "+O})}function Fn(o,l,d,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+ym(o,d)+(m?" "+m:"")})}function _m(o,l){o.info(function(){return"TIMEOUT: "+l})}vr.prototype.info=function(){};function ym(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let O=1;O<m.length;O++)m[O]=""}}}}return ao(S)}catch{return l}}var Rs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Lc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},$c;function uo(){}p(uo,xc),uo.prototype.g=function(){return new XMLHttpRequest},$c=new uo;function Er(o){return encodeURIComponent(String(o))}function vm(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function Ft(o,l,d,m){this.j=o,this.i=l,this.l=d,this.S=m||1,this.V=new pr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Fc}function Fc(){this.i=null,this.g="",this.h=!1}var Uc={},ho={};function fo(o,l,d){o.M=1,o.A=Ps(ft(l)),o.u=d,o.R=!0,Bc(o,null)}function Bc(o,l){o.F=Date.now(),Cs(o),o.B=ft(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),el(d.i,"t",m),o.C=0,d=o.j.L,o.h=new Fc,o.g=yl(o.j,d?l:null,!o.u),o.P>0&&(o.O=new dm(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,m=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(Pc[0]=A.toString()),A=Pc);for(let S=0;S<A.length;S++){const O=Ts(d,A[S],m||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.J?Ye(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),_r(),pm(o.i,o.v,o.B,o.l,o.S,o.u)}Ft.prototype.ba=function(o){o=o.target;const l=this.O;l&&jt(o)==3?l.j():this.Y(o)},Ft.prototype.Y=function(o){try{if(o==this.g)e:{const Y=jt(this.g),Te=this.g.ya(),oe=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||al(this.g)))){this.K||Y!=4||Te==7||(Te==8||oe<=0?_r(3):_r(2)),mo(this);var l=this.g.ca();this.X=l;var d=Em(this);if(this.o=l==200,gm(this.i,this.v,this.B,this.l,this.S,Y,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(m)){var S=m;break t}}S=null}if(o=S)Fn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,po(this,o);else{this.o=!1,this.m=3,qe(12),pn(this),wr(this);break e}}if(this.R){o=!0;let Re;for(;!this.K&&this.C<d.length;)if(Re=wm(this,d),Re==ho){Y==4&&(this.m=4,qe(14),o=!1),Fn(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==Uc){this.m=4,qe(15),Fn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Fn(this.i,this.l,Re,null),po(this,Re);if(jc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||d.length!=0||this.h.h||(this.m=1,qe(16),o=!1),this.o=this.o&&o,!o)Fn(this.i,this.l,d,"[Invalid Chunked Response]"),pn(this),wr(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Io(O),O.P=!0,qe(11))}}else Fn(this.i,this.l,d,null),po(this,d);Y==4&&pn(this),this.o&&!this.K&&(Y==4?ml(this.j,this):(this.o=!1,Cs(this)))}else Om(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,qe(12)):(this.m=0,qe(13)),pn(this),wr(this)}}}catch{}finally{}};function Em(o){if(!jc(o))return o.g.la();const l=al(o.g);if(l==="")return"";let d="";const m=l.length,A=jt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return pn(o),wr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<m;S++)o.h.h=!0,d+=o.h.i.decode(l[S],{stream:!(A&&S==m-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function jc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function wm(o,l){var d=o.C,m=l.indexOf(`
`,d);return m==-1?ho:(d=Number(l.substring(d,m)),isNaN(d)?Uc:(m+=1,m+d>l.length?ho:(l=l.slice(m,m+d),o.C=m+d,l)))}Ft.prototype.cancel=function(){this.K=!0,pn(this)};function Cs(o){o.T=Date.now()+o.H,qc(o,o.H)}function qc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=yr(h(o.aa,o),l)}function mo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ft.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(_m(this.i,this.B),this.M!=2&&(_r(),qe(17)),pn(this),this.m=2,wr(this)):qc(this,this.T-o)};function wr(o){o.j.I==0||o.K||ml(o.j,o)}function pn(o){mo(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,kc(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function po(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||go(d.h,o))){if(!o.L&&go(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Vs(d),Ns(d);else break e;To(d),qe(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=yr(h(d.Va,d),6e3));Gc(d.h)<=1&&d.ta&&(d.ta=void 0)}else _n(d,11)}else if((o.L||d.g==o)&&Vs(d),!g(l))for(A=d.Ba.g.parse(l),l=0;l<A.length;l++){let oe=A[l];const Re=oe[0];if(!(Re<=d.K))if(d.K=Re,oe=oe[1],d.I==2)if(oe[0]=="c"){d.M=oe[1],d.ba=oe[2];const mt=oe[3];mt!=null&&(d.ka=mt,d.j.info("VER="+d.ka));const yn=oe[4];yn!=null&&(d.za=yn,d.j.info("SVER="+d.za));const qt=oe[5];qt!=null&&typeof qt=="number"&&qt>0&&(m=1.5*qt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const zt=o.g;if(zt){const Ms=zt.g?zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ms){var S=m.h;S.g||Ms.indexOf("spdy")==-1&&Ms.indexOf("quic")==-1&&Ms.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(_o(S,S.h),S.h=null))}if(m.G){const bo=zt.g?zt.g.getResponseHeader("X-HTTP-Session-Id"):null;bo&&(m.wa=bo,he(m.J,m.G,bo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var O=o;if(m.na=_l(m,m.L?m.ba:null,m.W),O.L){Wc(m.h,O);var Y=O,Te=m.O;Te&&(Y.H=Te),Y.D&&(mo(Y),Cs(Y)),m.g=O}else dl(m);d.i.length>0&&Ds(d)}else oe[0]!="stop"&&oe[0]!="close"||_n(d,7);else d.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?_n(d,7):wo(d):oe[0]!="noop"&&d.l&&d.l.qa(oe),d.A=0)}}_r(4)}catch{}}var Tm=class{constructor(o,l){this.g=o,this.map=l}};function zc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Hc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Gc(o){return o.h?1:o.g?o.g.size:0}function go(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function _o(o,l){o.g?o.g.add(l):o.h=l}function Wc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}zc.prototype.cancel=function(){if(this.i=Kc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Kc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return b(o.i)}var Qc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Im(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let A,S=null;m>=0?(A=o[d].substring(0,m),S=o[d].substring(m+1)):A=o[d],l(A,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Ut(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Ut?(this.l=o.l,Tr(this,o.j),this.o=o.o,this.g=o.g,Ir(this,o.u),this.h=o.h,yo(this,tl(o.i)),this.m=o.m):o&&(l=String(o).match(Qc))?(this.l=!1,Tr(this,l[1]||"",!0),this.o=br(l[2]||""),this.g=br(l[3]||"",!0),Ir(this,l[4]),this.h=br(l[5]||"",!0),yo(this,l[6]||"",!0),this.m=br(l[7]||"")):(this.l=!1,this.i=new Sr(null,this.l))}Ut.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Ar(l,Jc,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Ar(l,Jc,!0),"@"),o.push(Er(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ar(d,d.charAt(0)=="/"?Sm:Am,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ar(d,Cm)),o.join("")},Ut.prototype.resolve=function(o){const l=ft(this);let d=!!o.j;d?Tr(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var m=o.h;if(d)Ir(l,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=l.h.lastIndexOf("/");A!=-1&&(m=l.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const S=[];for(let O=0;O<A.length;){const Y=A[O++];Y=="."?m&&O==A.length&&S.push(""):Y==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),m&&O==A.length&&S.push("")):(S.push(Y),m=!0)}m=S.join("/")}else m=A}return d?l.h=m:d=o.i.toString()!=="",d?yo(l,tl(o.i)):d=!!o.m,d&&(l.m=o.m),l};function ft(o){return new Ut(o)}function Tr(o,l,d){o.j=d?br(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Ir(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function yo(o,l,d){l instanceof Sr?(o.i=l,Pm(o.i,o.l)):(d||(l=Ar(l,Rm)),o.i=new Sr(l,o.l))}function he(o,l,d){o.i.set(l,d)}function Ps(o){return he(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function br(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ar(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,bm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function bm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Jc=/[#\/\?@]/g,Am=/[#\?:]/g,Sm=/[#\?]/g,Rm=/[#\?@]/g,Cm=/#/g;function Sr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function gn(o){o.g||(o.g=new Map,o.h=0,o.i&&Im(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Sr.prototype,n.add=function(o,l){gn(this),this.i=null,o=Un(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Yc(o,l){gn(o),l=Un(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Xc(o,l){return gn(o),l=Un(o,l),o.g.has(l)}n.forEach=function(o,l){gn(this),this.g.forEach(function(d,m){d.forEach(function(A){o.call(l,A,m,this)},this)},this)};function Zc(o,l){gn(o);let d=[];if(typeof l=="string")Xc(o,l)&&(d=d.concat(o.g.get(Un(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}n.set=function(o,l){return gn(this),this.i=null,o=Un(this,o),Xc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=Zc(this,o),o.length>0?String(o[0]):l):l};function el(o,l,d){Yc(o,l),d.length>0&&(o.i=null,o.g.set(Un(o,l),b(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const A=Er(d);d=Zc(this,d);for(let S=0;S<d.length;S++){let O=A;d[S]!==""&&(O+="="+Er(d[S])),o.push(O)}}return this.i=o.join("&")};function tl(o){const l=new Sr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Un(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Pm(o,l){l&&!o.j&&(gn(o),o.i=null,o.g.forEach(function(d,m){const A=m.toLowerCase();m!=A&&(Yc(this,m),el(this,A,d))},o)),o.j=l}function km(o,l){const d=new vr;if(a.Image){const m=new Image;m.onload=f(Bt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(Bt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(Bt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(Bt,d,"TestLoadImage: timeout",!1,l,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function xm(o,l){const d=new vr,m=new AbortController,A=setTimeout(()=>{m.abort(),Bt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(S=>{clearTimeout(A),S.ok?Bt(d,"TestPingServer: ok",!0,l):Bt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Bt(d,"TestPingServer: error",!1,l)})}function Bt(o,l,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Nm(){this.g=new mm}function vo(o){this.i=o.Sb||null,this.h=o.ab||!1}p(vo,xc),vo.prototype.g=function(){return new ks(this.i,this.h)};function ks(o,l){Ve.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ks,Ve),n=ks.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,Cr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Rr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Cr(this)),this.g&&(this.readyState=3,Cr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;nl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function nl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Rr(this):Cr(this),this.readyState==3&&nl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Rr(this))},n.Na=function(o){this.g&&(this.response=o,Rr(this))},n.ga=function(){this.g&&Rr(this)};function Rr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Cr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Cr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ks.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function rl(o){let l="";return He(o,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Eo(o,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=rl(d),typeof o=="string"?d!=null&&Er(d):he(o,l,d))}function fe(o){Ve.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(fe,Ve);var Dm=/^https?$/i,Vm=["POST","PUT"];n=fe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():$c.g(),this.g.onreadystatechange=E(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){sl(this,S);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Vm,l,void 0)>=0)||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){sl(this,S)}};function sl(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,il(o),xs(o)}function il(o){o.A||(o.A=!0,je(o,"complete"),je(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,je(this,"complete"),je(this,"abort"),xs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xs(this,!0)),fe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?ol(this):this.Xa())},n.Xa=function(){ol(this)};function ol(o){if(o.h&&typeof i<"u"){if(o.v&&jt(o)==4)setTimeout(o.Ca.bind(o),0);else if(je(o,"readystatechange"),jt(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=S===0){let O=String(o.D).match(Qc)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),m=!Dm.test(O?O.toLowerCase():"")}d=m}if(d)je(o,"complete"),je(o,"success");else{o.o=6;try{var A=jt(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",il(o)}}finally{xs(o)}}}}function xs(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||je(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function jt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return jt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),fm(l)}};function al(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Om(o){const l={};o=(o.g&&jt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(g(o[m]))continue;var d=vm(o[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[A]||[];l[A]=S,S.push(d)}st(l,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Pr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function cl(o){this.za=0,this.i=[],this.j=new vr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Pr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Pr("baseRetryDelayMs",5e3,o),this.Za=Pr("retryDelaySeedMs",1e4,o),this.Ta=Pr("forwardChannelMaxRetries",2,o),this.va=Pr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new zc(o&&o.concurrentRequestLimit),this.Ba=new Nm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=cl.prototype,n.ka=8,n.I=1,n.connect=function(o,l,d,m){qe(0),this.W=o,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=_l(this,null,this.W),Ds(this)};function wo(o){if(ll(o),o.I==3){var l=o.V++,d=ft(o.J);if(he(d,"SID",o.M),he(d,"RID",l),he(d,"TYPE","terminate"),kr(o,d),l=new Ft(o,o.j,l),l.M=2,l.A=Ps(ft(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=yl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Cs(l)}gl(o)}function Ns(o){o.g&&(Io(o),o.g.cancel(),o.g=null)}function ll(o){Ns(o),o.v&&(a.clearTimeout(o.v),o.v=null),Vs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Ds(o){if(!Hc(o.h)&&!o.m){o.m=!0;var l=o.Ea;G||_(),B||(G(),B=!0),w.add(l,o),o.D=0}}function Mm(o,l){return Gc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=yr(h(o.Ea,o,l),pl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new Ft(this,this.j,o);let S=this.o;if(this.U&&(S?(S=Ye(S),we(S,this.U)):S=this.U),this.u!==null||this.R||(A.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=hl(this,A,l),d=ft(this.J),he(d,"RID",o),he(d,"CVER",22),this.G&&he(d,"X-HTTP-Session-Id",this.G),kr(this,d),S&&(this.R?l="headers="+Er(rl(S))+"&"+l:this.u&&Eo(d,this.u,S)),_o(this.h,A),this.Ra&&he(d,"TYPE","init"),this.S?(he(d,"$req",l),he(d,"SID","null"),A.U=!0,fo(A,d,null)):fo(A,d,l),this.I=2}}else this.I==3&&(o?ul(this,o):this.i.length==0||Hc(this.h)||ul(this))};function ul(o,l){var d;l?d=l.l:d=o.V++;const m=ft(o.J);he(m,"SID",o.M),he(m,"RID",d),he(m,"AID",o.K),kr(o,m),o.u&&o.o&&Eo(m,o.u,o.o),d=new Ft(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=hl(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),_o(o.h,d),fo(d,m,l)}function kr(o,l){o.H&&He(o.H,function(d,m){he(l,m,d)}),o.l&&He({},function(d,m){he(l,m,d)})}function hl(o,l,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;e:{var A=o.i;let Y=-1;for(;;){const Te=["count="+d];Y==-1?d>0?(Y=A[0].g,Te.push("ofs="+Y)):Y=0:Te.push("ofs="+Y);let oe=!0;for(let Re=0;Re<d;Re++){var S=A[Re].g;const mt=A[Re].map;if(S-=Y,S<0)Y=Math.max(0,A[Re].g-100),oe=!1;else try{S="req"+S+"_"||"";try{var O=mt instanceof Map?mt:Object.entries(mt);for(const[yn,qt]of O){let zt=qt;c(qt)&&(zt=ao(qt)),Te.push(S+yn+"="+encodeURIComponent(zt))}}catch(yn){throw Te.push(S+"type="+encodeURIComponent("_badmap")),yn}}catch{m&&m(mt)}}if(oe){O=Te.join("&");break e}}O=void 0}return o=o.i.splice(0,d),l.G=o,O}function dl(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;G||_(),B||(G(),B=!0),w.add(l,o),o.A=0}}function To(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=yr(h(o.Da,o),pl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,fl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=yr(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,qe(10),Ns(this),fl(this))};function Io(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function fl(o){o.g=new Ft(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=ft(o.na);he(l,"RID","rpc"),he(l,"SID",o.M),he(l,"AID",o.K),he(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&he(l,"TO",o.ia),he(l,"TYPE","xmlhttp"),kr(o,l),o.u&&o.o&&Eo(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Ps(ft(l)),d.u=null,d.R=!0,Bc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Ns(this),To(this),qe(19))};function Vs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function ml(o,l){var d=null;if(o.g==l){Vs(o),Io(o),o.g=null;var m=2}else if(go(o.h,l))d=l.G,Wc(o.h,l),m=1;else return;if(o.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var A=o.D;m=Ss(),je(m,new Mc(m,d)),Ds(o)}else dl(o);else if(A=l.m,A==3||A==0&&l.X>0||!(m==1&&Mm(o,l)||m==2&&To(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),A){case 1:_n(o,5);break;case 4:_n(o,10);break;case 3:_n(o,6);break;default:_n(o,2)}}}function pl(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function _n(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),m=o.Ua;const A=!m;m=new Ut(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Tr(m,"https"),Ps(m),A?km(m.toString(),d):xm(m.toString(),d)}else qe(2);o.I=0,o.l&&o.l.pa(l),gl(o),ll(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),qe(2)):(this.j.info("Failed to ping google.com"),qe(1))};function gl(o){if(o.I=0,o.ja=[],o.l){const l=Kc(o.h);(l.length!=0||o.i.length!=0)&&(k(o.ja,l),k(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function _l(o,l,d){var m=d instanceof Ut?ft(d):new Ut(d);if(m.g!="")l&&(m.g=l+"."+m.g),Ir(m,m.u);else{var A=a.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const S=new Ut(null);m&&Tr(S,m),l&&(S.g=l),A&&Ir(S,A),d&&(S.h=d),m=S}return d=o.G,l=o.wa,d&&l&&he(m,d,l),he(m,"VER",o.ka),kr(o,m),m}function yl(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new fe(new vo({ab:d})):new fe(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function vl(){}n=vl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Os(){}Os.prototype.g=function(o,l){return new Xe(o,l)};function Xe(o,l){Ve.call(this),this.g=new cl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!g(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Bn(this)}p(Xe,Ve),Xe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Xe.prototype.close=function(){wo(this.g)},Xe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=ao(o),o=d);l.i.push(new Tm(l.Ya++,o)),l.I==3&&Ds(l)},Xe.prototype.N=function(){this.g.l=null,delete this.j,wo(this.g),delete this.g,Xe.Z.N.call(this)};function El(o){co.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(El,co);function wl(){lo.call(this),this.status=1}p(wl,lo);function Bn(o){this.g=o}p(Bn,vl),Bn.prototype.ra=function(){je(this.g,"a")},Bn.prototype.qa=function(o){je(this.g,new El(o))},Bn.prototype.pa=function(o){je(this.g,new wl)},Bn.prototype.oa=function(){je(this.g,"b")},Os.prototype.createWebChannel=Os.prototype.g,Xe.prototype.send=Xe.prototype.o,Xe.prototype.open=Xe.prototype.m,Xe.prototype.close=Xe.prototype.close,Sd=function(){return new Os},Ad=function(){return Ss()},bd=mn,Zo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Rs.NO_ERROR=0,Rs.TIMEOUT=8,Rs.HTTP_ERROR=6,Qs=Rs,Lc.COMPLETE="complete",Id=Lc,Nc.EventType=gr,gr.OPEN="a",gr.CLOSE="b",gr.ERROR="c",gr.MESSAGE="d",Ve.prototype.listen=Ve.prototype.J,Or=Nc,fe.prototype.listenOnce=fe.prototype.K,fe.prototype.getLastError=fe.prototype.Ha,fe.prototype.getLastErrorCode=fe.prototype.ya,fe.prototype.getStatus=fe.prototype.ca,fe.prototype.getResponseJson=fe.prototype.La,fe.prototype.getResponseText=fe.prototype.la,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Fa,Td=fe}).apply(typeof Fs<"u"?Fs:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class Ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ge.UNAUTHENTICATED=new Ge(null),Ge.GOOGLE_CREDENTIALS=new Ge("google-credentials-uid"),Ge.FIRST_PARTY=new Ge("first-party-uid"),Ge.MOCK_USER=new Ge("mock-user");/**
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
 */let lr="12.14.0";function iE(n){lr=n}/**
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
 */const kn=new wa("@firebase/firestore");function zn(){return kn.logLevel}function M(n,...e){if(kn.logLevel<=te.DEBUG){const t=e.map(Va);kn.debug(`Firestore (${lr}): ${n}`,...t)}}function Mt(n,...e){if(kn.logLevel<=te.ERROR){const t=e.map(Va);kn.error(`Firestore (${lr}): ${n}`,...t)}}function er(n,...e){if(kn.logLevel<=te.WARN){const t=e.map(Va);kn.warn(`Firestore (${lr}): ${n}`,...t)}}function Va(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function H(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Rd(n,r,t)}function Rd(n,e,t){let r=`FIRESTORE (${lr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Mt(r),new Error(r)}function ie(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Rd(e,s,r)}function Q(n,e){return n}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends dt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class oE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class aE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ge.UNAUTHENTICATED)))}shutdown(){}}class cE{constructor(e){this.t=e,this.currentUser=Ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Dt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Dt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Dt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string",31837,{l:r}),new oE(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string",2055,{h:e}),new Ge(e)}}class lE{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ge.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class uE{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new lE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ge.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class cu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ke(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ie(this.o===void 0,3512);const r=i=>{i.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new cu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ie(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new cu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */class Oa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=dE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Z(n,e){return n<e?-1:n>e?1:0}function ea(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Oo(s)===Oo(i)?Z(s,i):Oo(s)?1:-1}return Z(n.length,e.length)}const fE=55296,mE=57343;function Oo(n){const e=n.charCodeAt(0);return e>=fE&&e<=mE}function tr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */const lu="__name__";class pt{constructor(e,t,r){t===void 0?t=0:t>e.length&&H(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&H(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof pt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=pt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Z(e.length,t.length)}static compareSegments(e,t){const r=pt.isNumericId(e),s=pt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?pt.extractNumericId(e).compare(pt.extractNumericId(t)):ea(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Yt.fromString(e.substring(4,e.length-2))}}class le extends pt{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new L(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new le(t)}static emptyPath(){return new le([])}}const pE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ne extends pt{construct(e,t,r){return new Ne(e,t,r)}static isValidIdentifier(e){return pE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ne.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===lu}static keyField(){return new Ne([lu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new L(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new L(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new L(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new L(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ne(t)}static emptyPath(){return new Ne([])}}/**
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
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(le.fromString(e))}static fromName(e){return new U(le.fromString(e).popFirst(5))}static empty(){return new U(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return le.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new le(e.slice()))}}/**
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
 */function Cd(n,e,t){if(!t)throw new L(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function gE(n,e,t,r){if(e===!0&&r===!0)throw new L(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function uu(n){if(!U.isDocumentKey(n))throw new L(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function hu(n){if(U.isDocumentKey(n))throw new L(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Pd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Li(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H(12329,{type:typeof n})}function vt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Li(n);throw new L(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Ee(n,e){const t={typeString:n};return e&&(t.value=e),t}function gs(n,e){if(!Pd(n))throw new L(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new L(R.INVALID_ARGUMENT,t);return!0}/**
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
 */const du=-62135596800,fu=1e6;class ae{static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*fu);return new ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<du)throw new L(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/fu}_compareTo(e){return this.seconds===e.seconds?Z(this.nanoseconds,e.nanoseconds):Z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ae._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(gs(e,ae._jsonSchema))return new ae(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-du;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ae._jsonSchemaVersion="firestore/timestamp/1.0",ae._jsonSchema={type:Ee("string",ae._jsonSchemaVersion),seconds:Ee("number"),nanoseconds:Ee("number")};/**
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
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new ae(0,0))}static max(){return new K(new ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Xr=-1;function _E(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(r===1e9?new ae(t+1,0):new ae(t,r));return new en(s,U.empty(),e)}function yE(n){return new en(n.readTime,n.key,Xr)}class en{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new en(K.min(),U.empty(),Xr)}static max(){return new en(K.max(),U.empty(),Xr)}}function vE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:Z(n.largestBatchId,e.largestBatchId))}/**
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
 */async function ur(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==EE)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):C.reject(t)}static resolve(e){return new C(((t,r)=>{t(e)}))}static reject(e){return new C(((t,r)=>{r(e)}))}static waitFor(e){return new C(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next((s=>s?C.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new C(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new C(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function TE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function hr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */const kd="";function bE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=mu(e)),e=AE(n.get(t),e);return mu(e)}function AE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case kd:t+="";break;default:t+=i}}return t}function mu(n){return n+kd+""}/**
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
 */function pu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Dn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function xd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class de{constructor(e,t){this.comparator=e,this.root=t||xe.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,xe.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Us(this.root,e,this.comparator,!1)}getReverseIterator(){return new Us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Us(this.root,e,this.comparator,!0)}}class Us{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class xe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??xe.RED,this.left=s??xe.EMPTY,this.right=i??xe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new xe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return xe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return xe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,xe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,xe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw H(43730,{key:this.key,value:this.value});if(this.right.isRed())throw H(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw H(27949);return e+(this.isRed()?0:1)}}xe.EMPTY=null,xe.RED=!0,xe.BLACK=!1;xe.EMPTY=new class{constructor(){this.size=0}get key(){throw H(57766)}get value(){throw H(16141)}get color(){throw H(16727)}get left(){throw H(29726)}get right(){throw H(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ae{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gu(this.data.getIterator())}getIteratorFrom(e){return new gu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class gu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class at{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new at([])}unionWith(e){let t=new Ae(Ne.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new at(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return tr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class De{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Nd("Invalid base64 string: "+i):i}})(e);return new De(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new De(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}De.EMPTY_BYTE_STRING=new De("");const SE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(n){if(ie(!!n,39018),typeof n=="string"){let e=0;const t=SE.exec(n);if(ie(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?De.fromBase64String(n):De.fromUint8Array(n)}/**
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
 */const Dd="server_timestamp",Vd="__type__",Od="__previous_value__",Md="__local_write_time__";function La(n){return(n?.mapValue?.fields||{})[Vd]?.stringValue===Dd}function Ui(n){const e=n.mapValue.fields[Od];return La(e)?Ui(e):e}function Zr(n){const e=tn(n.mapValue.fields[Md].timestampValue);return new ae(e.seconds,e.nanos)}/**
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
 */class RE{constructor(e,t,r,s,i,a,c,u,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const mi="(default)";class es{constructor(e,t){this.projectId=e,this.database=t||mi}static empty(){return new es("","")}get isDefaultDatabase(){return this.database===mi}isEqual(e){return e instanceof es&&e.projectId===this.projectId&&e.database===this.database}}function CE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new L(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new es(n.options.projectId,e)}/**
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
 */const Ld="__type__",PE="__max__",Bs={mapValue:{}},$d="__vector__",pi="value";function rn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?La(n)?4:xE(n)?9007199254740991:kE(n)?10:11:H(28295,{value:n})}function bt(n,e){if(n===e)return!0;const t=rn(n);if(t!==rn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Zr(n).isEqual(Zr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=tn(s.timestampValue),c=tn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return nn(s.bytesValue).isEqual(nn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ge(s.geoPointValue.latitude)===ge(i.geoPointValue.latitude)&&ge(s.geoPointValue.longitude)===ge(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ge(s.integerValue)===ge(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ge(s.doubleValue),c=ge(i.doubleValue);return a===c?fi(a)===fi(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return tr(n.arrayValue.values||[],e.arrayValue.values||[],bt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(pu(a)!==pu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!bt(a[u],c[u])))return!1;return!0})(n,e);default:return H(52216,{left:n})}}function ts(n,e){return(n.values||[]).find((t=>bt(t,e)))!==void 0}function nr(n,e){if(n===e)return 0;const t=rn(n),r=rn(e);if(t!==r)return Z(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Z(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=ge(i.integerValue||i.doubleValue),u=ge(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return _u(n.timestampValue,e.timestampValue);case 4:return _u(Zr(n),Zr(e));case 5:return ea(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=nn(i),u=nn(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=Z(c[h],u[h]);if(f!==0)return f}return Z(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=Z(ge(i.latitude),ge(a.latitude));return c!==0?c:Z(ge(i.longitude),ge(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return yu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},u=a.fields||{},h=c[pi]?.arrayValue,f=u[pi]?.arrayValue,p=Z(h?.values?.length||0,f?.values?.length||0);return p!==0?p:yu(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Bs.mapValue&&a===Bs.mapValue)return 0;if(i===Bs.mapValue)return 1;if(a===Bs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const E=ea(u[p],f[p]);if(E!==0)return E;const b=nr(c[u[p]],h[f[p]]);if(b!==0)return b}return Z(u.length,f.length)})(n.mapValue,e.mapValue);default:throw H(23264,{he:t})}}function _u(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Z(n,e);const t=tn(n),r=tn(e),s=Z(t.seconds,r.seconds);return s!==0?s:Z(t.nanos,r.nanos)}function yu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=nr(t[s],r[s]);if(i)return i}return Z(t.length,r.length)}function rr(n){return ta(n)}function ta(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=tn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return nn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return U.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ta(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ta(t.fields[a])}`;return s+"}"})(n.mapValue):H(61005,{value:n})}function Js(n){switch(rn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ui(n);return e?16+Js(e):16;case 5:return 2*n.stringValue.length;case 6:return nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Js(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Dn(r.fields,((i,a)=>{s+=i.length+Js(a)})),s})(n.mapValue);default:throw H(13486,{value:n})}}function vu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ns(n){return!!n&&"integerValue"in n}function Fd(n){return ns(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function $a(n){return!!n&&"arrayValue"in n}function Eu(n){return!!n&&"nullValue"in n}function wu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ys(n){return!!n&&"mapValue"in n}function kE(n){return(n?.mapValue?.fields||{})[Ld]?.stringValue===$d}function Br(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Dn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Br(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Br(n.arrayValue.values[t]);return e}return{...n}}function xE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===PE}/**
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
 */class tt{constructor(e){this.value=e}static empty(){return new tt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ys(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Br(t)}setAll(e){let t=Ne.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Br(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Ys(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ys(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Dn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new tt(Br(this.value))}}function Ud(n){const e=[];return Dn(n.fields,((t,r)=>{const s=new Ne([t]);if(Ys(r)){const i=Ud(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new at(e)}/**
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
 */class Me{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,K.min(),K.min(),K.min(),tt.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,K.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,K.min(),K.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,K.min(),K.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class gi{constructor(e,t){this.position=e,this.inclusive=t}}function Tu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),t.key):r=nr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Iu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!bt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class rs{constructor(e,t="asc"){this.field=e,this.dir=t}}function NE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Bd{}class ve extends Bd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new VE(e,t,r):t==="array-contains"?new LE(e,r):t==="in"?new $E(e,r):t==="not-in"?new FE(e,r):t==="array-contains-any"?new UE(e,r):new ve(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new OE(e,r):new ME(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(nr(t,this.value)):t!==null&&rn(this.value)===rn(t)&&this.matchesComparison(nr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ht extends Bd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ht(e,t)}matches(e){return jd(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function jd(n){return n.op==="and"}function qd(n){return DE(n)&&jd(n)}function DE(n){for(const e of n.filters)if(e instanceof ht)return!1;return!0}function na(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+rr(n.value);if(qd(n))return n.filters.map((e=>na(e))).join(",");{const e=n.filters.map((t=>na(t))).join(",");return`${n.op}(${e})`}}function zd(n,e){return n instanceof ve?(function(r,s){return s instanceof ve&&r.op===s.op&&r.field.isEqual(s.field)&&bt(r.value,s.value)})(n,e):n instanceof ht?(function(r,s){return s instanceof ht&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&zd(a,s.filters[c])),!0):!1})(n,e):void H(19439)}function Hd(n){return n instanceof ve?(function(t){return`${t.field.canonicalString()} ${t.op} ${rr(t.value)}`})(n):n instanceof ht?(function(t){return t.op.toString()+" {"+t.getFilters().map(Hd).join(" ,")+"}"})(n):"Filter"}class VE extends ve{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class OE extends ve{constructor(e,t){super(e,"in",t),this.keys=Gd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ME extends ve{constructor(e,t){super(e,"not-in",t),this.keys=Gd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Gd(n,e){return(e.arrayValue?.values||[]).map((t=>U.fromName(t.referenceValue)))}class LE extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $a(t)&&ts(t.arrayValue,this.value)}}class $E extends ve{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ts(this.value.arrayValue,t)}}class FE extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(ts(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ts(this.value.arrayValue,t)}}class UE extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$a(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ts(this.value.arrayValue,r)))}}/**
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
 */class BE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function bu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new BE(n,e,t,r,s,i,a)}function Fa(n){const e=Q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>na(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Fi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>rr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>rr(r))).join(",")),e.Te=t}return e.Te}function Ua(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!NE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!zd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Iu(n.startAt,e.startAt)&&Iu(n.endAt,e.endAt)}function ra(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class dr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function jE(n,e,t,r,s,i,a,c){return new dr(n,e,t,r,s,i,a,c)}function Bi(n){return new dr(n)}function Au(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qE(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Wd(n){return n.collectionGroup!==null}function jr(n){const e=Q(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(Ne.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new rs(i,r))})),t.has(Ne.keyField().canonicalString())||e.Ie.push(new rs(Ne.keyField(),r))}return e.Ie}function Et(n){const e=Q(n);return e.Ee||(e.Ee=zE(e,jr(n))),e.Ee}function zE(n,e){if(n.limitType==="F")return bu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new rs(s.field,i)}));const t=n.endAt?new gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gi(n.startAt.position,n.startAt.inclusive):null;return bu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function sa(n,e){const t=n.filters.concat([e]);return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function HE(n,e){const t=n.explicitOrderBy.concat([e]);return new dr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function _i(n,e,t){return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ji(n,e){return Ua(Et(n),Et(e))&&n.limitType===e.limitType}function Kd(n){return`${Fa(Et(n))}|lt:${n.limitType}`}function Hn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Hd(s))).join(", ")}]`),Fi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>rr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>rr(s))).join(",")),`Target(${r})`})(Et(n))}; limitType=${n.limitType})`}function qi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of jr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,u){const h=Tu(a,c,u);return a.inclusive?h<=0:h<0})(r.startAt,jr(r),s)||r.endAt&&!(function(a,c,u){const h=Tu(a,c,u);return a.inclusive?h>=0:h>0})(r.endAt,jr(r),s))})(n,e)}function GE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Qd(n){return(e,t)=>{let r=!1;for(const s of jr(n)){const i=WE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function WE(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):(function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?nr(u,h):H(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return H(19790,{direction:n.dir})}}/**
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
 */class Vn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Dn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return xd(this.inner)}size(){return this.innerSize}}/**
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
 */const KE=new de(U.comparator);function Lt(){return KE}const Jd=new de(U.comparator);function Mr(...n){let e=Jd;for(const t of n)e=e.insert(t.key,t);return e}function Yd(n){let e=Jd;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function wn(){return qr()}function Xd(){return qr()}function qr(){return new Vn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const QE=new de(U.comparator),JE=new Ae(U.comparator);function ee(...n){let e=JE;for(const t of n)e=e.add(t);return e}const YE=new Ae(Z);function XE(){return YE}/**
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
 */class Hi{constructor(){this._=void 0}}function ew(n,e,t){return n instanceof ss?(function(s,i){const a={fields:{[Vd]:{stringValue:Dd},[Md]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&La(i)&&(i=Ui(i)),i&&(a.fields[Od]=i),{mapValue:a}})(t,e):n instanceof is?ef(n,e):n instanceof os?tf(n,e):n instanceof as?(function(s,i){const a=Zd(s,i),c=Ei(a)+Ei(s.Ae);return ns(a)&&ns(s.Ae)?Ba(c):zi(s.serializer,c)})(n,e):n instanceof yi?(function(s,i){return Su(s,i,Math.min)})(n,e):n instanceof vi?(function(s,i){return Su(s,i,Math.max)})(n,e):void 0}function tw(n,e,t){return n instanceof is?ef(n,e):n instanceof os?tf(n,e):t}function Zd(n,e){return n instanceof as?Fd(e)?e:{integerValue:0}:null}class ss extends Hi{}class is extends Hi{constructor(e){super(),this.elements=e}}function ef(n,e){const t=nf(e);for(const r of n.elements)t.some((s=>bt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class os extends Hi{constructor(e){super(),this.elements=e}}function tf(n,e){let t=nf(e);for(const r of n.elements)t=t.filter((s=>!bt(s,r)));return{arrayValue:{values:t}}}class ja extends Hi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class as extends ja{}class yi extends ja{}class vi extends ja{}function Su(n,e,t){if(!Fd(e))return n.Ae;const r=t(Ei(e),Ei(n.Ae));return ns(e)&&ns(n.Ae)?Ba(r):zi(n.serializer,r)}function Ei(n){return ge(n.integerValue||n.doubleValue)}function nf(n){return $a(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class nw{constructor(e,t){this.field=e,this.transform=t}}function rw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof is&&s instanceof is||r instanceof os&&s instanceof os?tr(r.elements,s.elements,bt):r instanceof as&&s instanceof as||r instanceof yi&&s instanceof yi||r instanceof vi&&s instanceof vi?bt(r.Ae,s.Ae):r instanceof ss&&s instanceof ss})(n.transform,e.transform)}class sw{constructor(e,t){this.version=e,this.transformResults=t}}class wt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new wt}static exists(e){return new wt(void 0,e)}static updateTime(e){return new wt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Xs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Gi{}function rf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new qa(n.key,wt.none()):new _s(n.key,n.data,wt.none());{const t=n.data,r=tt.empty();let s=new Ae(Ne.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new On(n.key,r,new at(s.toArray()),wt.none())}}function iw(n,e,t){n instanceof _s?(function(s,i,a){const c=s.value.clone(),u=Cu(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof On?(function(s,i,a){if(!Xs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Cu(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(sf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function zr(n,e,t,r){return n instanceof _s?(function(i,a,c,u){if(!Xs(i.precondition,a))return c;const h=i.value.clone(),f=Pu(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof On?(function(i,a,c,u){if(!Xs(i.precondition,a))return c;const h=Pu(i.fieldTransforms,u,a),f=a.data;return f.setAll(sf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,a,c){return Xs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function ow(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Zd(r.transform,s||null);i!=null&&(t===null&&(t=tt.empty()),t.set(r.field,i))}return t||null}function Ru(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&tr(r,s,((i,a)=>rw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class _s extends Gi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class On extends Gi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function sf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Cu(n,e,t){const r=new Map;ie(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,tw(a,c,t[s]))}return r}function Pu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,ew(i,a,e))}return r}class qa extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class aw extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class cw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&iw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Xd();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=rf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(K.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ee())}isEqual(e){return this.batchId===e.batchId&&tr(this.mutations,e.mutations,((t,r)=>Ru(t,r)))&&tr(this.baseMutations,e.baseMutations,((t,r)=>Ru(t,r)))}}class za{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ie(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return QE})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new za(e,t,r,s)}}/**
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
 */var ye,ne;function hw(n){switch(n){case R.OK:return H(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return H(15467,{code:n})}}function of(n){if(n===void 0)return Mt("GRPC error has no .code"),R.UNKNOWN;switch(n){case ye.OK:return R.OK;case ye.CANCELLED:return R.CANCELLED;case ye.UNKNOWN:return R.UNKNOWN;case ye.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case ye.INTERNAL:return R.INTERNAL;case ye.UNAVAILABLE:return R.UNAVAILABLE;case ye.UNAUTHENTICATED:return R.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case ye.NOT_FOUND:return R.NOT_FOUND;case ye.ALREADY_EXISTS:return R.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return R.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case ye.ABORTED:return R.ABORTED;case ye.OUT_OF_RANGE:return R.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return R.UNIMPLEMENTED;case ye.DATA_LOSS:return R.DATA_LOSS;default:return H(39323,{code:n})}}(ne=ye||(ye={}))[ne.OK=0]="OK",ne[ne.CANCELLED=1]="CANCELLED",ne[ne.UNKNOWN=2]="UNKNOWN",ne[ne.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ne[ne.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ne[ne.NOT_FOUND=5]="NOT_FOUND",ne[ne.ALREADY_EXISTS=6]="ALREADY_EXISTS",ne[ne.PERMISSION_DENIED=7]="PERMISSION_DENIED",ne[ne.UNAUTHENTICATED=16]="UNAUTHENTICATED",ne[ne.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ne[ne.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ne[ne.ABORTED=10]="ABORTED",ne[ne.OUT_OF_RANGE=11]="OUT_OF_RANGE",ne[ne.UNIMPLEMENTED=12]="UNIMPLEMENTED",ne[ne.INTERNAL=13]="INTERNAL",ne[ne.UNAVAILABLE=14]="UNAVAILABLE",ne[ne.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const fw=new Yt([4294967295,4294967295],0);function ku(n){const e=dw().encode(n),t=new wd;return t.update(e),new Uint8Array(t.digest())}function xu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Yt([t,r],0),new Yt([s,i],0)]}class Ha{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Lr(`Invalid padding: ${t}`);if(r<0)throw new Lr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Lr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Lr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Yt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Yt.fromNumber(r)));return s.compare(fw)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ku(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ha(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=ku(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Lr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ys{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,vs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ys(K.min(),s,new de(Z),Lt(),ee())}}class vs{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new vs(r,t,ee(),ee(),ee())}}/**
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
 */class Zs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class af{constructor(e,t){this.targetId=e,this.Ce=t}}class cf{constructor(e,t,r=De.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Nu{constructor(e){this.targetId=e,this.ve=0,this.Fe=Du(),this.Me=De.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ee(),t=ee(),r=ee();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:H(38017,{changeType:i})}})),new vs(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Du()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ie(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const xr="WatchChangeAggregator";class mw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Lt(),this.Je=js(),this.He=js(),this.Ze=new de(Z)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:H(56790,{state:e.state})}else M(xr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(ra(i))if(r===0){const a=new U(i.path);this.et(t,a,Me.newNoDocument(a,K.min()))}else ie(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=nn(r).toUint8Array()}catch(u){if(u instanceof Nd)return er("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ha(a,s,i)}catch(u){return er(u instanceof Lr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.st(a);if(c){if(i.current&&ra(c.target)){const u=new U(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.et(a,u,Me.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=ee();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new ys(e,t,this.Ze,this.je,r);return this.je=Lt(),this.Je=js(),this.He=js(),this.Ze=new de(Z),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void M(xr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):M(xr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(M(xr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Nu(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new Ae(Z),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new Ae(Z),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||M(xr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new Nu(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function js(){return new de(U.comparator)}function Du(){return new de(U.comparator)}const pw={asc:"ASCENDING",desc:"DESCENDING"},gw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_w={and:"AND",or:"OR"};class yw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ia(n,e){return n.useProto3Json||Fi(e)?e:{value:e}}function wi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function lf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function vw(n,e){return wi(n,e.toTimestamp())}function Tt(n){return ie(!!n,49232),K.fromTimestamp((function(t){const r=tn(t);return new ae(r.seconds,r.nanos)})(n))}function Ga(n,e){return oa(n,e).canonicalString()}function oa(n,e){const t=(function(s){return new le(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function uf(n){const e=le.fromString(n);return ie(pf(e),10190,{key:e.toString()}),e}function aa(n,e){return Ga(n.databaseId,e.path)}function Mo(n,e){const t=uf(e);if(t.get(1)!==n.databaseId.projectId)throw new L(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new L(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(df(t))}function hf(n,e){return Ga(n.databaseId,e)}function Ew(n){const e=uf(n);return e.length===4?le.emptyPath():df(e)}function ca(n){return new le(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function df(n){return ie(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Vu(n,e,t){return{name:aa(n,e),fields:t.value.mapValue.fields}}function ww(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:H(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(ie(f===void 0||typeof f=="string",58123),De.fromBase64String(f||"")):(ie(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),De.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?R.UNKNOWN:of(h.code);return new L(f,h.message||"")})(a);t=new cf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Mo(n,r.document.name),i=Tt(r.document.updateTime),a=r.document.createTime?Tt(r.document.createTime):K.min(),c=new tt({mapValue:{fields:r.document.fields}}),u=Me.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Zs(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Mo(n,r.document),i=r.readTime?Tt(r.readTime):K.min(),a=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Zs([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Mo(n,r.document),i=r.removedTargetIds||[];t=new Zs([],i,s,null)}else{if(!("filter"in e))return H(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new uw(s,i),c=r.targetId;t=new af(c,a)}}return t}function Tw(n,e){let t;if(e instanceof _s)t={update:Vu(n,e.key,e.value)};else if(e instanceof qa)t={delete:aa(n,e.key)};else if(e instanceof On)t={update:Vu(n,e.key,e.data),updateMask:xw(e.fieldMask)};else{if(!(e instanceof aw))return H(16599,{Vt:e.type});t={verify:aa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof ss)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof is)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof os)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof as)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof yi)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof vi)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw H(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:vw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:H(27497)})(n,e.precondition)),t}function Iw(n,e){return n&&n.length>0?(ie(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Tt(s.updateTime):Tt(i);return a.isEqual(K.min())&&(a=Tt(i)),new sw(a,s.transformResults||[])})(t,e)))):[]}function bw(n,e){return{documents:[hf(n,e.path)]}}function Aw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=hf(n,s);const i=(function(h){if(h.length!==0)return mf(ht.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(E){return{field:Gn(E.field),direction:Cw(E.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ia(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{dt:t,parent:s}}function Sw(n){let e=Ew(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ie(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const E=ff(p);return E instanceof ht&&qd(E)?E.getFilters():[E]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((E=>(function(k){return new rs(Wn(k.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let E;return E=typeof p=="object"?p.value:p,Fi(E)?null:E})(t.limit));let u=null;t.startAt&&(u=(function(p){const E=!!p.before,b=p.values||[];return new gi(b,E)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const E=!p.before,b=p.values||[];return new gi(b,E)})(t.endAt)),jE(e,s,a,i,c,"F",u,h)}function Rw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ff(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Wn(t.unaryFilter.field);return ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Wn(t.unaryFilter.field);return ve.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Wn(t.unaryFilter.field);return ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Wn(t.unaryFilter.field);return ve.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return H(61313);default:return H(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ve.create(Wn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return H(58110);default:return H(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ht.create(t.compositeFilter.filters.map((r=>ff(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return H(1026)}})(t.compositeFilter.op))})(n):H(30097,{filter:n})}function Cw(n){return pw[n]}function Pw(n){return gw[n]}function kw(n){return _w[n]}function Gn(n){return{fieldPath:n.canonicalString()}}function Wn(n){return Ne.fromServerFormat(n.fieldPath)}function mf(n){return n instanceof ve?(function(t){if(t.op==="=="){if(wu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NAN"}};if(Eu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NAN"}};if(Eu(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gn(t.field),op:Pw(t.op),value:t.value}}})(n):n instanceof ht?(function(t){const r=t.getFilters().map((s=>mf(s)));return r.length===1?r[0]:{compositeFilter:{op:kw(t.op),filters:r}}})(n):H(54877,{filter:n})}function xw(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function pf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function gf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class kt{constructor(e,t,r,s,i=K.min(),a=K.min(),c=De.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new kt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new kt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Vw{constructor(){this.Sn=new Ow}addToCollectionParentIndex(e,t){return this.Sn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(en.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(en.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Ow{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ae(le.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ae(le.comparator)).toArray()}}/**
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
 */const Ou={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_f=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(_f,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);/**
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
 */const Mu="LruGarbageCollector",yf=1048576;function Lu([n,e],[t,r]){const s=Z(n,t);return s===0?Z(e,r):s}class Mw{constructor(e){this.hr=e,this.buffer=new Ae(Lu),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Lu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Lw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){M(Mu,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){hr(t)?M(Mu,"Ignoring IndexedDB error during garbage collection: ",t):await ur(t)}await this.Rr(3e5)}))}}class $w{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return C.resolve($i.ce);const r=new Mw(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Ou)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ou):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),zn()<=te.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Fw(n,e){return new $w(n,e)}/**
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
 */class Uw{constructor(){this.changes=new Vn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class jw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&zr(r.mutation,s,at.empty(),ae.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,ee()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=ee()){const s=wn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Mr();return i.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=wn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,ee())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=Lt();const a=qr(),c=(function(){return qr()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof On)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),zr(f.mutation,h,f.mutation.getFieldMask(),ae.now())):a.set(h.key,at.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new Bw(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=qr();let s=new de(((a,c)=>a-c)),i=ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||at.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||ee()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=Xd();f.forEach((E=>{if(!i.has(E)){const b=rf(t.get(E),r.get(E));b!==null&&p.set(E,b),i=i.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return C.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return qE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(wn());let c=Xr,u=i;return a.next((h=>C.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next((E=>{u=u.insert(f,E)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,ee()))).next((f=>({batchId:c,changes:Yd(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next((r=>{let s=Mr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Mr();return this.indexManager.getCollectionParents(e,i).next((c=>C.forEach(c,(u=>{const h=(function(p,E){return new dr(E,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,E)=>{a=a.insert(p,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Me.newInvalidDocument(f)))}));let c=Mr();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&zr(f.mutation,h,at.empty(),ae.now()),qi(t,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class qw{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return C.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Tt(s.createTime)}})(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:Dw(s.bundledQuery),readTime:Tt(s.readTime)}})(t)),C.resolve()}}/**
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
 */class zw{constructor(){this.overlays=new de(U.comparator),this.Br=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=wn();return C.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=wn(),i=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new de(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=wn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=wn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return C.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new lw(t,r));let i=this.Br.get(t);i===void 0&&(i=ee(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
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
 */class Hw{constructor(){this.sessionToken=De.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class Wa{constructor(){this.Lr=new Ae(Ce.kr),this.qr=new Ae(Ce.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Ce(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Ce(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new U(new le([])),r=new Ce(t,e),s=new Ce(t,e+1),i=[];return this.qr.forEachInRange([r,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new U(new le([])),r=new Ce(t,e),s=new Ce(t,e+1);let i=ee();return this.qr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Ce(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ce{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return U.comparator(e.key,t.key)||Z(e.jr,t.jr)}static Kr(e,t){return Z(e.jr,t.jr)||U.comparator(e.key,t.key)}}/**
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
 */class Gw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new Ae(Ce.kr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new cw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Ce(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?Ma:this.Xn-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ce(t,0),s=new Ce(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(a=>{const c=this.Hr(a.jr);i.push(c)})),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(Z);return t.forEach((s=>{const i=new Ce(s,0),a=new Ce(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(c=>{r=r.add(c.jr)}))})),C.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const a=new Ce(new U(i),0);let c=new Ae(Z);return this.Jr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.jr)),!0)}),a),C.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ie(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return C.forEach(t.mutations,(s=>{const i=new Ce(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Ce(t,0),s=this.Jr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ww{constructor(e){this.ei=e,this.docs=(function(){return new de(U.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=Lt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))})),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Lt();const a=t.path,c=new U(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||vE(yE(f),r)<=0||(s.has(f.key)||qi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){H(9500)}ti(e,t){return C.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Kw(this)}getSize(e){return C.resolve(this.size)}}class Kw extends Uw{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),C.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
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
 */class Qw{constructor(e){this.persistence=e,this.ni=new Vn((t=>Fa(t)),Ua),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.ri=0,this.ii=new Wa,this.targetCount=0,this.si=sn.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),C.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new sn(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.cr(t),C.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),C.waitFor(i).next((()=>s))}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.ii.containsKey(t))}}/**
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
 */class vf{constructor(e,t){this.oi={},this.overlays={},this._i=new $i(0),this.ai=!1,this.ai=!0,this.ui=new Hw,this.referenceDelegate=e(this),this.ci=new Qw(this),this.indexManager=new Vw,this.remoteDocumentCache=(function(s){return new Ww(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Nw(t),this.hi=new qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new zw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new Gw(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const s=new Jw(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return C.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class Jw extends wE{constructor(e){super(),this.currentSequenceNumber=e}}class Ka{constructor(e){this.persistence=e,this.Ei=new Wa,this.Ri=null}static Ai(e){return new Ka(e)}get Vi(){if(this.Ri)return this.Ri;throw H(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.Vi,(r=>{const s=U.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,K.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return C.or([()=>C.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ti{constructor(e,t){this.persistence=e,this.mi=new Vn((r=>bE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Fw(this,t)}static Ai(e,t){return new Ti(e,t)}Pi(){}Ti(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return C.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?C.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(a=>this.yr(e,a,t).next((c=>{c||(r++,i.removeEntry(a,K.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),C.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Js(e.data.value)),t}yr(e,t,r){return C.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Qa{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=ee(),s=ee();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Qa(e,t.fromCache,r,s)}}/**
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
 */class Xw{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Tg()?8:TE($e())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new Yw;return this.ps(e,t,a).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(zn()<=te.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),C.resolve()):(zn()<=te.DEBUG&&M("QueryEngine","Query:",Hn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(zn()<=te.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Et(t))):C.resolve())}fs(e,t){if(Au(t))return C.resolve(null);let r=Et(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=_i(t,null,"F"),r=Et(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=ee(...i);return this.ds.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.ws(t,c);return this.Ss(t,h,a,u.readTime)?this.fs(e,_i(t,null,"F")):this.bs(e,h,t,u)}))))})))))}gs(e,t,r,s){return Au(t)||s.isEqual(K.min())?C.resolve(null):this.ds.getDocuments(e,r).next((i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?C.resolve(null):(zn()<=te.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hn(t)),this.bs(e,a,t,_E(s,Xr)).next((c=>c)))}))}ws(e,t){let r=new Ae(Qd(e));return t.forEach(((s,i)=>{qi(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return zn()<=te.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.ds.getDocumentsMatchingQuery(e,t,en.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const Ja="LocalStore",Zw=3e8;class eT{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new de(Z),this.vs=new Vn((i=>Fa(i)),Ua),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jw(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function tT(n,e,t,r){return new eT(n,e,t,r)}async function Ef(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let u=ee();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({Os:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function nT(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,E=p.keys();let b=C.resolve();return E.forEach((k=>{b=b.next((()=>f.getEntry(u,k))).next((D=>{const x=h.docVersions.get(k);ie(x!==null,48541),D.version.compareTo(x)<0&&(p.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))}))})),b.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=ee();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function wf(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function rT(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((f,p)=>{const E=s.get(p);if(!E)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.ci.addMatchingKeys(i,f.addedDocuments,p))));let b=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(De.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),s=s.insert(p,b),(function(D,x,N){return D.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=Zw?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0})(E,b,f)&&c.push(t.ci.updateTargetData(i,b))}));let u=Lt(),h=ee();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(sT(i,a,e.documentUpdates).next((f=>{u=f.Ns,h=f.Bs}))),!r.isEqual(K.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next((p=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return C.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Cs=s,i)))}function sT(n,e,t){let r=ee(),s=ee();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=Lt();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(K.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):M(Ja,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Ns:a,Bs:s}}))}function iT(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ma),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function oT(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,C.resolve(s)):t.ci.allocateTargetId(r).next((a=>(s=new kt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function la(n,e,t){const r=Q(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!hr(a))throw a;M(Ja,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function $u(n,e,t){const r=Q(n);let s=K.min(),i=ee();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const p=Q(u),E=p.vs.get(f);return E!==void 0?C.resolve(p.Cs.get(E)):p.ci.getTargetData(h,f)})(r,a,Et(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next((u=>{i=u}))})).next((()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:K.min(),t?i:ee()))).next((c=>(aT(r,GE(e),c),{documents:c,Ls:i})))))}function aT(n,e,t){let r=n.Fs.get(e)||K.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Fu{constructor(){this.activeTargetIds=XE()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class cT{constructor(){this.Co=new Fu,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Fu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */const Uu="ConnectivityMonitor";class Bu{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){M(Uu,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){M(Uu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */const Lo="RestConnection",uT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class hT{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===mi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=ua(),c=this.Wo(e,t.toUriEncodedString());M(Lo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:h}=new URL(c),f=Nn(h);return this.Go(e,c,u,r,f).then((p=>(M(Lo,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw er(Lo,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+lr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=uT[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */const Oe="WebChannelConnection",Nr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Yn extends hT{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Yn.u_){const e=Ad();Nr(e,bd.STAT_EVENT,(t=>{t.stat===Zo.PROXY?M(Oe,"STAT_EVENT: detected buffering proxy"):t.stat===Zo.NOPROXY&&M(Oe,"STAT_EVENT: detected no buffering proxy")})),Yn.u_=!0}}Go(e,t,r,s,i){const a=ua();return new Promise(((c,u)=>{const h=new Td;h.setWithCredentials(!0),h.listenOnce(Id.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Qs.NO_ERROR:const p=h.getResponseJson();M(Oe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case Qs.TIMEOUT:M(Oe,`RPC '${e}' ${a} timed out`),u(new L(R.DEADLINE_EXCEEDED,"Request time out"));break;case Qs.HTTP_ERROR:const E=h.getStatus();if(M(Oe,`RPC '${e}' ${a} failed with status:`,E,"response text:",h.getResponseText()),E>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const k=b?.error;if(k&&k.status&&k.message){const D=(function(N){const F=N.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(F)>=0?F:R.UNKNOWN})(k.status);u(new L(D,k.message))}else u(new L(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new L(R.UNAVAILABLE,"Connection failed."));break;default:H(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{M(Oe,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);M(Oe,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=ua(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");M(Oe,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.T_(f);let p=!1,E=!1;const b=new dT({jo:k=>{E?M(Oe,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(p||(M(Oe,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),M(Oe,`RPC '${e}' stream ${s} sending:`,k),f.send(k))},Jo:()=>f.close()});return Nr(f,Or.EventType.OPEN,(()=>{E||(M(Oe,`RPC '${e}' stream ${s} transport opened.`),b.r_())})),Nr(f,Or.EventType.CLOSE,(()=>{E||(E=!0,M(Oe,`RPC '${e}' stream ${s} transport closed`),b.s_(),this.I_(f))})),Nr(f,Or.EventType.ERROR,(k=>{E||(E=!0,er(Oe,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),b.s_(new L(R.UNAVAILABLE,"The operation could not be completed")))})),Nr(f,Or.EventType.MESSAGE,(k=>{if(!E){const D=k.data[0];ie(!!D,16349);const x=D,N=x?.error||x[0]?.error;if(N){M(Oe,`RPC '${e}' stream ${s} received error:`,N);const F=N.status;let $=(function(B){const w=ye[B];if(w!==void 0)return of(w)})(F),q=N.message;F==="NOT_FOUND"&&q.includes("database")&&q.includes("does not exist")&&q.includes(this.databaseId.database)&&er(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),$===void 0&&($=R.INTERNAL,q="Unknown error status: "+F+" with message "+N.message),E=!0,b.s_(new L($,q)),f.close()}else M(Oe,`RPC '${e}' stream ${s} received:`,D),b.o_(D)}})),Yn.a_(),setTimeout((()=>{b.i_()}),0),b}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Sd()}}/**
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
 */function fT(n){return new Yn(n)}function $o(){return typeof document<"u"?document:null}/**
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
 */Yn.u_=!1;class Tf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
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
 */const ju="PersistentStream";class If{constructor(e,t,r,s,i,a,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Tf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Mt(t.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new L(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return M(ju,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(M(ju,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class mT extends If{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=ww(this.serializer,e),r=(function(i){if(!("targetChange"in i))return K.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?Tt(a.readTime):K.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=ca(this.serializer),t.addTarget=(function(i,a){let c;const u=a.target;if(c=ra(u)?{documents:bw(i,u)}:{query:Aw(i,u).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=lf(i,a.resumeToken);const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(K.min())>0){c.readTime=wi(i,a.snapshotVersion.toTimestamp());const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Rw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=ca(this.serializer),t.removeTarget=e,this.k_(t)}}class pT extends If{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return ie(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ie(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Iw(e.writeResults,e.commitTime),r=Tt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=ca(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Tw(this.serializer,r)))};this.k_(t)}}/**
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
 */class gT{}class _T extends gT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new L(R.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(e,oa(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new L(R.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.zo(e,oa(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new L(R.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function yT(n,e,t,r){return new _T(n,e,t,r)}class vT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Mt(t),this._a=!1):M("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const At="RemoteStore";class ET{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new sn(1e3),this.Aa=new sn(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{r.enqueueAndForget((async()=>{Mn(this)&&(M(At,"Restarting streams for network reachability change."),await(async function(u){const h=Q(u);h.Va.add(4),await Es(h),h.fa.set("Unknown"),h.Va.delete(4),await Ki(h)})(this))}))})),this.fa=new vT(r,s)}}async function Ki(n){if(Mn(n))for(const e of n.da)await e(!0)}async function Es(n){for(const e of n.da)await e(!1)}function ha(n,e){return n.Ia.get(e)||void 0}function bf(n,e){const t=Q(n),r=ha(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,u){const h=ha(c,u);h!==void 0&&c.Ea.delete(h);const f=(function(E,b){return b%2!=0?E.Aa.next():E.Ra.next()})(c,u);return c.Ia.set(u,f),c.Ea.set(f,u),f})(t,e.targetId);M(At,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new kt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),ec(t)?Za(t):fr(t).x_()&&Xa(t,i)}function Ya(n,e){const t=Q(n),r=fr(t),s=ha(t,e);M(At,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&Af(t,s),t.Ta.size===0&&(r.x_()?r.B_():Mn(t)&&t.fa.set("Unknown"))}function Xa(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void M(At,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}fr(n).H_(e)}function Af(n,e){n.ga.$e(e),fr(n).Z_(e)}function Za(n){n.ga=new mw({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):ee()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),fr(n).start(),n.fa.aa()}function ec(n){return Mn(n)&&!fr(n).M_()&&n.Ta.size>0}function Mn(n){return Q(n).Va.size===0}function Sf(n){n.ga=void 0}async function wT(n){n.fa.set("Online")}async function TT(n){n.Ta.forEach(((e,t)=>{Xa(n,e)}))}async function IT(n,e){Sf(n),ec(n)?(n.fa.la(e),Za(n)):n.fa.set("Unknown")}async function bT(n,e,t){if(n.fa.set("Online"),e instanceof cf&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){M(At,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ii(n,r)}else if(e instanceof Zs?n.ga.Xe(e):e instanceof af?n.ga.it(e):n.ga.tt(e),!t.isEqual(K.min()))try{const r=await wf(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ta.get(f);p&&i.Ta.set(f,p.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const p=i.Ta.get(h);if(!p)return;i.Ta.set(h,p.withResumeToken(De.EMPTY_BYTE_STRING,p.snapshotVersion)),Af(i,h);const E=new kt(p.target,h,f,p.sequenceNumber);Xa(i,E)}));const u=(function(f,p){const E=new Map;p.targetChanges.forEach(((k,D)=>{const x=f.Ea.get(D);x!==void 0&&E.set(x,k)}));let b=new de(Z);return p.targetMismatches.forEach(((k,D)=>{const x=f.Ea.get(k);x!==void 0&&(b=b.insert(x,D))})),new ys(p.snapshotVersion,E,b,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){M(At,"Failed to raise snapshot:",r),await Ii(n,r)}}async function Ii(n,e,t){if(!hr(e))throw e;n.Va.add(1),await Es(n),n.fa.set("Offline"),t||(t=()=>wf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{M(At,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await Ki(n)}))}function Rf(n,e){return e().catch((t=>Ii(n,t,e)))}async function Qi(n){const e=Q(n),t=on(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ma;for(;AT(e);)try{const s=await iT(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,ST(e,s)}catch(s){await Ii(e,s)}Cf(e)&&Pf(e)}function AT(n){return Mn(n)&&n.Pa.length<10}function ST(n,e){n.Pa.push(e);const t=on(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function Cf(n){return Mn(n)&&!on(n).M_()&&n.Pa.length>0}function Pf(n){on(n).start()}async function RT(n){on(n).na()}async function CT(n){const e=on(n);for(const t of n.Pa)e.Y_(t.mutations)}async function PT(n,e,t){const r=n.Pa.shift(),s=za.from(r,e,t);await Rf(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Qi(n)}async function kT(n,e){e&&on(n).X_&&await(async function(r,s){if((function(a){return hw(a)&&a!==R.ABORTED})(s.code)){const i=r.Pa.shift();on(r).N_(),await Rf(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Qi(r)}})(n,e),Cf(n)&&Pf(n)}async function qu(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),M(At,"RemoteStore received new credentials");const r=Mn(t);t.Va.add(3),await Es(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await Ki(t)}async function xT(n,e){const t=Q(n);e?(t.Va.delete(2),await Ki(t)):e||(t.Va.add(2),await Es(t),t.fa.set("Unknown"))}function fr(n){return n.pa||(n.pa=(function(t,r,s){const i=Q(t);return i.ia(),new mT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:wT.bind(null,n),Xo:TT.bind(null,n),e_:IT.bind(null,n),J_:bT.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),ec(n)?Za(n):n.fa.set("Unknown")):(await n.pa.stop(),Sf(n))}))),n.pa}function on(n){return n.ya||(n.ya=(function(t,r,s){const i=Q(t);return i.ia(),new pT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:RT.bind(null,n),e_:kT.bind(null,n),ea:CT.bind(null,n),ta:PT.bind(null,n)}),n.da.push((async e=>{e?(n.ya.N_(),await Qi(n)):(await n.ya.stop(),n.Pa.length>0&&(M(At,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ya}/**
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
 */class tc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new tc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nc(n,e){if(Mt("AsyncQueue",`${e}: ${n}`),hr(n))return new L(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Xn{static emptySet(e){return new Xn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||U.comparator(t.key,r.key):(t,r)=>U.comparator(t.key,r.key),this.keyedMap=Mr(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Xn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
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
 */class zu{constructor(){this.wa=new de(U.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):H(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class sr{constructor(e,t,r,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new sr(e,t,Xn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ji(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class NT{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class DT{constructor(){this.queries=Hu(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=Q(t),i=s.queries;s.queries=Hu(),i.forEach(((a,c)=>{for(const u of c.Ca)u.onError(r)}))})(this,new L(R.ABORTED,"Firestore shutting down"))}}function Hu(){return new Vn((n=>Kd(n)),ji)}async function rc(n,e){const t=Q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new NT,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=nc(a,`Initialization of query '${Hn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&ic(t)}async function sc(n,e){const t=Q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function VT(n,e){const t=Q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&ic(t)}function OT(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function ic(n){n.Ma.forEach((e=>{e.next()}))}var da,Gu;(Gu=da||(da={})).Na="default",Gu.Cache="cache";class oc{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new sr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=sr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==da.Cache}}/**
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
 */class kf{constructor(e){this.key=e}}class xf{constructor(e){this.key=e}}class MT{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=ee(),this.mutatedKeys=ee(),this.ru=Qd(e),this.iu=new Xn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new zu,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const E=s.get(f),b=qi(this.query,p)?p:null,k=!!E&&this.mutatedKeys.has(E.key),D=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let x=!1;E&&b?E.data.isEqual(b.data)?k!==D&&(r.track({type:3,doc:b}),x=!0):this.au(E,b)||(r.track({type:2,doc:b}),x=!0,(u&&this.ru(b,u)>0||h&&this.ru(b,h)<0)&&(c=!0)):!E&&b?(r.track({type:0,doc:b}),x=!0):E&&!b&&(r.track({type:1,doc:E}),x=!0,(u||h)&&(c=!0)),x&&(b?(a=a.add(b),i=D?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort(((f,p)=>(function(b,k){const D=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H(20277,{At:x})}};return D(b)-D(k)})(f.type,p.type)||this.ru(f.doc,p.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,h=u!==this.tu;return this.tu=u,a.length!==0||h?{snapshot:new sr(this.query,e.iu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new zu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=ee(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new xf(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new kf(r))})),t}Pu(e){this.eu=e.Ls,this.nu=ee();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return sr.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const ac="SyncEngine";class LT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class $T{constructor(e){this.key=e,this.Iu=!1}}class FT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new Vn((c=>Kd(c)),ji),this.Au=new Map,this.Vu=new Set,this.du=new de(U.comparator),this.mu=new Map,this.fu=new Wa,this.gu={},this.pu=new Map,this.yu=sn._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function UT(n,e,t=!0){const r=Lf(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await Nf(r,e,t,!0),s}async function BT(n,e){const t=Lf(n);await Nf(t,e,!0,!1)}async function Nf(n,e,t,r){const s=await oT(n.localStore,Et(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await jT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&bf(n.remoteStore,s),c}async function jT(n,e,t,r,s){n.Su=(p,E,b)=>(async function(D,x,N,F){let $=x.view.ou(N);$.Ss&&($=await $u(D.localStore,x.query,!1).then((({documents:w})=>x.view.ou(w,$))));const q=F&&F.targetChanges.get(x.targetId),G=F&&F.targetMismatches.get(x.targetId)!=null,B=x.view.applyChanges($,D.isPrimaryClient,q,G);return Ku(D,x.targetId,B.lu),B.snapshot})(n,p,E,b);const i=await $u(n.localStore,e,!0),a=new MT(e,i.Ls),c=a.ou(i.documents),u=vs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);Ku(n,t,h.lu);const f=new LT(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),h.snapshot}async function qT(n,e,t){const r=Q(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((a=>!ji(a,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await la(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ya(r.remoteStore,s.targetId),fa(r,s.targetId)})).catch(ur)):(fa(r,s.targetId),await la(r.localStore,s.targetId,!0))}async function zT(n,e){const t=Q(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ya(t.remoteStore,r.targetId))}async function HT(n,e,t){const r=XT(n);try{const s=await(function(a,c){const u=Q(a),h=ae.now(),f=c.reduce(((b,k)=>b.add(k.key)),ee());let p,E;return u.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let k=Lt(),D=ee();return u.Ms.getEntries(b,f).next((x=>{k=x,k.forEach(((N,F)=>{F.isValidDocument()||(D=D.add(N))}))})).next((()=>u.localDocuments.getOverlayedDocuments(b,k))).next((x=>{p=x;const N=[];for(const F of c){const $=ow(F,p.get(F.key).overlayedDocument);$!=null&&N.push(new On(F.key,$,Ud($.value.mapValue),wt.exists(!0)))}return u.mutationQueue.addMutationBatch(b,h,N,c)})).next((x=>{E=x;const N=x.applyToLocalDocumentSet(p,D);return u.documentOverlayCache.saveOverlays(b,x.batchId,N)}))})).then((()=>({batchId:E.batchId,changes:Yd(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.gu[a.currentUser.toKey()];h||(h=new de(Z)),h=h.insert(c,u),a.gu[a.currentUser.toKey()]=h})(r,s.batchId,t),await ws(r,s.changes),await Qi(r.remoteStore)}catch(s){const i=nc(s,"Failed to persist write");t.reject(i)}}async function Df(n,e){const t=Q(n);try{const r=await rT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.mu.get(i);a&&(ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?ie(a.Iu,14607):s.removedDocuments.size>0&&(ie(a.Iu,42227),a.Iu=!1))})),await ws(t,r,e)}catch(r){await ur(r)}}function Wu(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=Q(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const E of p.Ca)E.xa(c)&&(h=!0)})),h&&ic(u)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function GT(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new de(U.comparator);a=a.insert(i,Me.newNoDocument(i,K.min()));const c=ee().add(i),u=new ys(K.min(),new Map,new de(Z),a,c);await Df(r,u),r.du=r.du.remove(i),r.mu.delete(e),cc(r)}else await la(r.localStore,e,!1).then((()=>fa(r,e,t))).catch(ur)}async function WT(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await nT(t.localStore,e);Of(t,r,null),Vf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ws(t,s)}catch(s){await ur(s)}}async function KT(n,e,t){const r=Q(n);try{const s=await(function(a,c){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(ie(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Of(r,e,t),Vf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ws(r,s)}catch(s){await ur(s)}}function Vf(n,e){(n.pu.get(e)||[]).forEach((t=>{t.resolve()})),n.pu.delete(e)}function Of(n,e,t){const r=Q(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function fa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||Mf(n,r)}))}function Mf(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ya(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),cc(n))}function Ku(n,e,t){for(const r of t)r instanceof kf?(n.fu.addReference(r.key,e),QT(n,r)):r instanceof xf?(M(ac,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Mf(n,r.key)):H(19791,{Du:r})}function QT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(M(ac,"New document in limbo: "+t),n.Vu.add(r),cc(n))}function cc(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new U(le.fromString(e)),r=n.yu.next();n.mu.set(r,new $T(t)),n.du=n.du.insert(t,r),bf(n.remoteStore,new kt(Et(Bi(t.path)),r,"TargetPurposeLimboResolution",$i.ce))}}async function ws(n,e,t){const r=Q(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,u)=>{a.push(r.Su(u,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Qa.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(a),r.Eu.J_(s),await(async function(u,h){const f=Q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>C.forEach(h,(E=>C.forEach(E.Ps,(b=>f.persistence.referenceDelegate.addReference(p,E.targetId,b))).next((()=>C.forEach(E.Ts,(b=>f.persistence.referenceDelegate.removeReference(p,E.targetId,b)))))))))}catch(p){if(!hr(p))throw p;M(Ja,"Failed to update sequence numbers: "+p)}for(const p of h){const E=p.targetId;if(!p.fromCache){const b=f.Cs.get(E),k=b.snapshotVersion,D=b.withLastLimboFreeSnapshotVersion(k);f.Cs=f.Cs.insert(E,D)}}})(r.localStore,i))}async function JT(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){M(ac,"User change. New user:",e.toKey());const r=await Ef(t.localStore,e);t.currentUser=e,(function(i,a){i.pu.forEach((c=>{c.forEach((u=>{u.reject(new L(R.CANCELLED,a))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ws(t,r.Os)}}function YT(n,e){const t=Q(n),r=t.mu.get(e);if(r&&r.Iu)return ee().add(r.key);{let s=ee();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function Lf(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Df.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=YT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=GT.bind(null,e),e.Eu.J_=VT.bind(null,e.eventManager),e.Eu.bu=OT.bind(null,e.eventManager),e}function XT(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=KT.bind(null,e),e}class bi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wi(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return tT(this.persistence,new Xw,e.initialUser,this.serializer)}Mu(e){return new vf(Ka.Ai,this.serializer)}Fu(e){return new cT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}bi.provider={build:()=>new bi};class ZT extends bi{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){ie(this.persistence.referenceDelegate instanceof Ti,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Lw(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new vf((r=>Ti.Ai(r,t)),this.serializer)}}class ma{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Wu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=JT.bind(null,this.syncEngine),await xT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new DT})()}createDatastore(e){const t=Wi(e.databaseInfo.databaseId),r=fT(e.databaseInfo);return yT(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new ET(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Wu(this.syncEngine,t,0)),(function(){return Bu.v()?new Bu:new lT})())}createSyncEngine(e,t){return(function(s,i,a,c,u,h,f){const p=new FT(s,i,a,c,u,h);return f&&(p.wu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=Q(t);M(At,"RemoteStore shutting down."),r.Va.add(5),await Es(r),r.ma.shutdown(),r.fa.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ma.provider={build:()=>new ma};/**
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
 */const an="FirestoreClient";class eI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ge.UNAUTHENTICATED,this.clientId=Oa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{M(an,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(M(an,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=nc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Fo(n,e){n.asyncQueue.verifyOperationInProgress(),M(an,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Ef(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Qu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await tI(n);M(an,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>qu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>qu(e.remoteStore,s))),n._onlineComponents=e}async function tI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(an,"Using user provided OfflineComponentProvider");try{await Fo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;er("Error using user provided cache. Falling back to memory cache: "+t),await Fo(n,new bi)}}else M(an,"Using default OfflineComponentProvider"),await Fo(n,new ZT(void 0));return n._offlineComponents}async function $f(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(an,"Using user provided OnlineComponentProvider"),await Qu(n,n._uninitializedComponentsProvider._online)):(M(an,"Using default OnlineComponentProvider"),await Qu(n,new ma))),n._onlineComponents}function nI(n){return $f(n).then((e=>e.syncEngine))}async function Ai(n){const e=await $f(n),t=e.eventManager;return t.onListen=UT.bind(null,e.syncEngine),t.onUnlisten=qT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=BT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=zT.bind(null,e.syncEngine),t}function rI(n,e,t,r){const s=new lc(r),i=new oc(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>rc(await Ai(n),i))),()=>{s.ku(),n.asyncQueue.enqueueAndForget((async()=>sc(await Ai(n),i)))}}function sI(n,e,t={}){const r=new Dt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new lc({next:E=>{f.ku(),a.enqueueAndForget((()=>sc(i,p)));const b=E.docs.has(c);!b&&E.fromCache?h.reject(new L(R.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&E.fromCache&&u&&u.source==="server"?h.reject(new L(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(E)},error:E=>h.reject(E)}),p=new oc(Bi(c.path),f,{includeMetadataChanges:!0,$a:!0});return rc(i,p)})(await Ai(n),n.asyncQueue,e,t,r))),r.promise}function iI(n,e,t={}){const r=new Dt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new lc({next:E=>{f.ku(),a.enqueueAndForget((()=>sc(i,p))),E.fromCache&&u.source==="server"?h.reject(new L(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(E)},error:E=>h.reject(E)}),p=new oc(c,f,{includeMetadataChanges:!0,$a:!0});return rc(i,p)})(await Ai(n),n.asyncQueue,e,t,r))),r.promise}function oI(n,e){const t=new Dt;return n.asyncQueue.enqueueAndForget((async()=>HT(await nI(n),e,t))),t.promise}/**
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
 */const lI="firestore.googleapis.com",Yu=!0;class Xu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new L(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lI,this.ssl=Yu}else this.host=e.host,this.ssl=e.ssl??Yu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=_f;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yf)throw new L(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ff(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class uc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new aE;switch(r.type){case"firstParty":return new uE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new L(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Ju.get(t);r&&(M(aI,"Removing Datastore"),Ju.delete(t),r.terminate())})(this),Promise.resolve()}}/**
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
 */class $t{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new $t(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Xt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(gs(t,_e._jsonSchema))return new _e(e,r||null,new U(le.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:Ee("string",_e._jsonSchemaVersion),referencePath:Ee("string")};class Xt extends $t{constructor(e,t,r){super(e,t,Bi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new U(e))}withConverter(e){return new Xt(this.firestore,e,this._path)}}function Ji(n,e,...t){if(n=Se(n),Cd("collection","path",e),n instanceof uc){const r=le.fromString(e,...t);return hu(r),new Xt(n,null,r)}{if(!(n instanceof _e||n instanceof Xt))throw new L(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return hu(r),new Xt(n.firestore,null,r)}}function Yi(n,e,...t){if(n=Se(n),arguments.length===1&&(e=Oa.newId()),Cd("doc","path",e),n instanceof uc){const r=le.fromString(e,...t);return uu(r),new _e(n,null,new U(r))}{if(!(n instanceof _e||n instanceof Xt))throw new L(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return uu(r),new _e(n.firestore,n instanceof Xt?n.converter:null,new U(r))}}/**
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
 */const Zu="AsyncQueue";class eh{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Tf(this,"async_queue_retry"),this.cc=()=>{const r=$o();r&&M(Zu,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=$o();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=$o();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new Dt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!hr(e))throw e;M(Zu,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,Mt("INTERNAL UNHANDLED ERROR: ",th(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=tc.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&H(47125,{Ec:th(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function th(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class xn extends uc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new eh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new eh(e),this._firestoreClient=void 0,await e}}}function uI(n,e,t){t||(t=mi);const r=Di(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Sn(i,e))return s;throw new L(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new L(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yf)throw new L(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Nn(e.host)&&Ea(e.host),r.initialize({options:e,instanceIdentifier:t})}function Xi(n){if(n._terminated)throw new L(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||hI(n),n._firestoreClient}function hI(n){const e=n._freezeSettings(),t=cI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new eI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
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
 */class nt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nt(De.fromBase64String(e))}catch(t){throw new L(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new nt(De.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(gs(e,nt._jsonSchema))return nt.fromBase64String(e.bytes)}}nt._jsonSchemaVersion="firestore/bytes/1.0",nt._jsonSchema={type:Ee("string",nt._jsonSchemaVersion),bytes:Ee("string")};/**
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
 */class Uf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ne(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class It{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Z(this._lat,e._lat)||Z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:It._jsonSchemaVersion}}static fromJSON(e){if(gs(e,It._jsonSchema))return new It(e.latitude,e.longitude)}}It._jsonSchemaVersion="firestore/geoPoint/1.0",It._jsonSchema={type:Ee("string",It._jsonSchemaVersion),latitude:Ee("number"),longitude:Ee("number")};/**
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
 */class lt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:lt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(gs(e,lt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new lt(e.vectorValues);throw new L(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}lt._jsonSchemaVersion="firestore/vectorValue/1.0",lt._jsonSchema={type:Ee("string",lt._jsonSchemaVersion),vectorValues:Ee("object")};/**
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
 */const dI=/^__.*__$/;class fI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new On(e,this.data,this.fieldMask,t,this.fieldTransforms):new _s(e,this.data,t,this.fieldTransforms)}}function Bf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H(40011,{dataSource:n})}}class dc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new dc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Si(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if(Bf(this.dataSource)&&dI.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class mI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Wi(e)}V(e,t,r,s=!1){return new dc({dataSource:e,methodName:t,targetDoc:r,path:Ne.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function jf(n){const e=n._freezeSettings(),t=Wi(n._databaseId);return new mI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function pI(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);Hf("Data must be an object, but it was:",a,r);const c=qf(r,a);let u,h;if(i.merge)u=new at(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const E=Zi(e,p,t);if(!a.contains(E))throw new L(R.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);vI(f,E)||f.push(E)}u=new at(f),h=a.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=a.fieldTransforms;return new fI(new tt(c),u,h)}class fc extends hc{_toFieldTransform(e){return new nw(e.path,new ss)}isEqual(e){return e instanceof fc}}function gI(n,e,t,r=!1){return mc(t,n.V(r?4:3,e))}function mc(n,e){if(zf(n=Se(n)))return Hf("Unsupported field value:",e,n),qf(n,e);if(n instanceof hc)return(function(r,s){if(!Bf(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let u=mc(c,s.Sc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZE(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ae.fromDate(r);return{timestampValue:wi(s.serializer,i)}}if(r instanceof ae){const i=new ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wi(s.serializer,i)}}if(r instanceof It)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof nt)return{bytesValue:lf(s.serializer,r._byteString)};if(r instanceof _e){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ga(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof lt)return(function(a,c){const u=a instanceof lt?a.toArray():a;return{mapValue:{fields:{[Ld]:{stringValue:$d},[pi]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return zi(c.serializer,f)}))}}}}}})(r,s);if(gf(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Li(r)}`)})(n,e)}function qf(n,e){const t={};return xd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Dn(n,((r,s)=>{const i=mc(s,e.gc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function zf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ae||n instanceof It||n instanceof nt||n instanceof _e||n instanceof hc||n instanceof lt||gf(n))}function Hf(n,e,t){if(!zf(t)||!Pd(t)){const r=Li(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function Zi(n,e,t){if((e=Se(e))instanceof Uf)return e._internalPath;if(typeof e=="string")return yI(n,e);throw Si("Field path arguments must be of type string or ",n,!1,void 0,t)}const _I=new RegExp("[~\\*/\\[\\]]");function yI(n,e,t){if(e.search(_I)>=0)throw Si(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Uf(...e.split("."))._internalPath}catch{throw Si(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Si(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new L(R.INVALID_ARGUMENT,c+n+u)}function vI(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class EI{convertValue(e,t="none"){switch(rn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Dn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[pi].arrayValue?.values?.map((r=>ge(r.doubleValue)));return new lt(t)}convertGeoPoint(e){return new It(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ui(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Zr(e));default:return null}}convertTimestamp(e){const t=tn(e);return new ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=le.fromString(e);ie(pf(r),9688,{name:e});const s=new es(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(t)||Mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class pc extends EI{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}function nh(){return new fc("serverTimestamp")}const rh="@firebase/firestore",sh="4.15.0";/**
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
 */function Wf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gc{}class _c extends gc{}function eo(n,e,...t){let r=[];e instanceof gc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof vc)).length,c=i.filter((u=>u instanceof yc)).length;if(a>1||a>0&&c>0)throw new L(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class yc extends _c{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new yc(e,t,r)}_apply(e){const t=this._parse(e);return Qf(e._query,t),new $t(e.firestore,e.converter,sa(e._query,t))}_parse(e){const t=jf(e.firestore);return(function(i,a,c,u,h,f,p){let E;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new L(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ah(p,f);const k=[];for(const D of p)k.push(oh(u,i,D));E={arrayValue:{values:k}}}else E=oh(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ah(p,f),E=gI(c,a,p,f==="in"||f==="not-in");return ve.create(h,f,E)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class vc extends gc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ht.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Qf(a,u),a=sa(a,u)})(e._query,t),new $t(e.firestore,e.converter,sa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ec extends _c{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ec(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new L(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new L(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new rs(i,a)})(e._query,this._field,this._direction);return new $t(e.firestore,e.converter,HE(e._query,t))}}function to(n,e="asc"){const t=e,r=Zi("orderBy",n);return Ec._create(r,t)}class wc extends _c{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new wc(e,t,r)}_apply(e){return new $t(e.firestore,e.converter,_i(e._query,this._limit,this._limitType))}}function Kf(n){return wc._create("limit",n,"F")}function oh(n,e,t){if(typeof(t=Se(t))=="string"){if(t==="")throw new L(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wd(e)&&t.indexOf("/")!==-1)throw new L(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(le.fromString(t));if(!U.isDocumentKey(r))throw new L(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vu(n,new U(r))}if(t instanceof _e)return vu(n,t._key);throw new L(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Li(t)}.`)}function ah(n,e){if(!Array.isArray(n)||n.length===0)throw new L(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Qf(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new L(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new L(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function TI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class $r{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class bn extends Gf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ei(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Zi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=bn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}bn._jsonSchemaVersion="firestore/documentSnapshot/1.0",bn._jsonSchema={type:Ee("string",bn._jsonSchemaVersion),bundleSource:Ee("string","DocumentSnapshot"),bundleName:Ee("string"),bundle:Ee("string")};class ei extends bn{data(e={}){return super.data(e)}}class An{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new $r(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ei(this._firestore,this._userDataWriter,r.key,r,new $r(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new ei(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $r(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ei(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $r(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:II(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=An._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Oa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function II(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H(61501,{type:n})}}/**
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
 */An._jsonSchemaVersion="firestore/querySnapshot/1.0",An._jsonSchema={type:Ee("string",An._jsonSchemaVersion),bundleSource:Ee("string","QuerySnapshot"),bundleName:Ee("string"),bundle:Ee("string")};/**
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
 */function bI(n){n=vt(n,_e);const e=vt(n.firestore,xn),t=Xi(e);return sI(t,n._key).then((r=>Zf(e,n,r)))}function Jf(n){n=vt(n,$t);const e=vt(n.firestore,xn),t=Xi(e),r=new pc(e);return Wf(n._query),iI(t,n._query).then((s=>new An(e,r,n,s)))}function AI(n,e,t){n=vt(n,_e);const r=vt(n.firestore,xn),s=TI(n.converter,e),i=jf(r);return Xf(r,[pI(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,wt.none())])}function Yf(n){return Xf(vt(n.firestore,xn),[new qa(n._key,wt.none())])}function Tc(n,...e){n=Se(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ih(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ih(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,a,c;if(n instanceof _e)a=vt(n.firestore,xn),c=Bi(n._key.path),i={next:h=>{e[r]&&e[r](Zf(a,n,h))},error:e[r+1],complete:e[r+2]};else{const h=vt(n,$t);a=vt(h.firestore,xn),c=h._query;const f=new pc(a);i={next:p=>{e[r]&&e[r](new An(a,f,h,p))},error:e[r+1],complete:e[r+2]},Wf(n._query)}const u=Xi(a);return rI(u,c,s,i)}function Xf(n,e){const t=Xi(n);return oI(t,e)}function Zf(n,e,t){const r=t.docs.get(e._key),s=new pc(n);return new bn(n,s,e._key,r,new $r(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){iE(ar),Rn(new Zt("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new xn(new cE(r.getProvider("auth-internal")),new hE(a,r.getProvider("app-check-internal")),CE(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),_t(rh,sh,e),_t(rh,sh,"esm2020")})();/**
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
 */const SI="type.googleapis.com/google.protobuf.Int64Value",RI="type.googleapis.com/google.protobuf.UInt64Value";function em(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Ri(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Ri(e));if(typeof n=="function"||typeof n=="object")return em(n,e=>Ri(e));throw new Error("Data cannot be encoded in JSON: "+n)}function ir(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case SI:case RI:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>ir(e)):typeof n=="function"||typeof n=="object"?em(n,e=>ir(e)):n}/**
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
 */const ch={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Qe extends dt{constructor(e,t,r){super(`${Ic}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,Qe.prototype)}}function CI(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Ci(n,e){let t=CI(n),r=t,s;try{const i=e&&e.error;if(i){const a=i.status;if(typeof a=="string"){if(!ch[a])return new Qe("internal","internal");t=ch[a],r=a}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=ir(s))}}catch{}return t==="ok"?null:new Qe(t,r,s)}/**
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
 */class PI{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Ke(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{return(await this.auth.getToken())?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const pa="us-central1",kI=/^data: (.*?)(?:\n|$)/;function xI(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Qe("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class NI{constructor(e,t,r,s,i=pa,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new PI(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=pa}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function DI(n,e,t){const r=Nn(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&Ea(n.emulatorOrigin+"/backends")}function VI(n,e,t){const r=s=>MI(n,e,s,{});return r.stream=(s,i)=>$I(n,e,s,i),r}function tm(n){return n.emulatorOrigin&&Nn(n.emulatorOrigin)?"include":void 0}async function OI(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:tm(s)})}catch{return{status:0,json:null}}let a=null;try{a=await i.json()}catch{}return{status:i.status,json:a}}async function nm(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function MI(n,e,t,r){const s=n._url(e);return LI(n,s,t,r)}async function LI(n,e,t,r){t=Ri(t);const s={data:t},i=await nm(n,r),a=r.timeout||7e4,c=xI(a),u=await Promise.race([OI(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new Qe("cancelled","Firebase Functions instance was deleted.");const h=Ci(u.status,u.json);if(h)throw h;if(!u.json)throw new Qe("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new Qe("internal","Response is missing data field.");return{data:ir(f)}}function $I(n,e,t,r){const s=n._url(e);return FI(n,s,t,r||{})}async function FI(n,e,t,r){t=Ri(t);const s={data:t},i=await nm(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let a;try{a=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r?.signal,credentials:tm(n)})}catch(E){if(E instanceof Error&&E.name==="AbortError"){const k=new Qe("cancelled","Request was cancelled.");return{data:Promise.reject(k),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(k)}}}}}}const b=Ci(0,null);return{data:Promise.reject(b),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(b)}}}}}}let c,u;const h=new Promise((E,b)=>{c=E,u=b});r?.signal?.addEventListener("abort",()=>{const E=new Qe("cancelled","Request was cancelled.");u(E)});const f=a.body.getReader(),p=UI(f,c,u,r?.signal);return{stream:{[Symbol.asyncIterator](){const E=p.getReader();return{async next(){const{value:b,done:k}=await E.read();return{value:b,done:k}},async return(){return await E.cancel(),{done:!0,value:void 0}}}}},data:h}}function UI(n,e,t,r){const s=(a,c)=>{const u=a.match(kI);if(!u)return;const h=u[1];try{const f=JSON.parse(h);if("result"in f){e(ir(f.result));return}if("message"in f){c.enqueue(ir(f.message));return}if("error"in f){const p=Ci(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof Qe){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r?.aborted){const h=new Qe("cancelled","Request was cancelled");return a.error(h),t(h),Promise.resolve()}try{const{value:h,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),a),a.close();return}if(r?.aborted){const E=new Qe("cancelled","Request was cancelled");a.error(E),t(E),await n.cancel();return}c+=i.decode(h,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const E of p)E.trim()&&s(E.trim(),a);return u()}catch(h){const f=h instanceof Qe?h:Ci(0,null);a.error(f),t(f)}}},cancel(){return n.cancel()}})}const lh="@firebase/functions",uh="0.13.5";/**
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
 */const BI="auth-internal",jI="app-check-internal",qI="messaging-internal";function zI(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(BI),a=t.getProvider(qI),c=t.getProvider(jI);return new NI(s,i,a,c,r)};Rn(new Zt(Ic,e,"PUBLIC").setMultipleInstances(!0)),_t(lh,uh,n),_t(lh,uh,"esm2020")}/**
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
 */function HI(n=Ia(),e=pa){const r=Di(Se(n),Ic).getImmediate({identifier:e}),s=mg("functions");return s&&GI(r,...s),r}function GI(n,e,t){DI(Se(n),e,t)}function no(n,e,t){return VI(Se(n),e)}zI();const Fr={apiKey:"AIzaSyBdkhrlBR-Q2S19LJAPA8WsMBXYcLUP_pA",authDomain:typeof window<"u"&&window.location.hostname==="meal.amritr.xyz"?"meal.amritr.xyz":"meal-tracker-46346.firebaseapp.com",projectId:"meal-tracker-46346",storageBucket:"meal-tracker-46346.firebasestorage.app",messagingSenderId:"134287587849",appId:"1:134287587849:web:1bab3a94fa9c197e6896d8",measurementId:""},WI=!!(Fr.apiKey&&Fr.authDomain&&Fr.projectId&&Fr.appId),bc=k_().length?Ia():$h(Fr),Zn=tE(bc),fn=uI(bc,{experimentalForceLongPolling:!0}),ro=HI(bc),KI={"auth/email-already-in-use":"An account already exists for that email address.","auth/invalid-credential":"Email or password is incorrect.","auth/invalid-email":"Enter a valid email address.","auth/network-request-failed":"The sign-in service could not be reached. Try again shortly.","auth/operation-not-allowed":"This sign-in method is not enabled for this app.","auth/popup-closed-by-user":"Google sign-in was closed before it finished.","auth/popup-blocked":"The browser blocked the Google sign-in popup.","auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.","auth/unauthorized-domain":"This domain is not authorized for Firebase sign-in.","auth/user-disabled":"This account has been disabled.","auth/weak-password":"Use a password with at least 6 characters.","functions/failed-precondition":"The request cannot be completed yet.","functions/invalid-argument":"Some submitted information is invalid.","functions/not-found":"The requested record was not found.","functions/permission-denied":"You do not have access to that record.","functions/resource-exhausted":"The request is too large or the service is busy.","functions/unauthenticated":"Sign in before making changes.","permission-denied":"You do not have access to this data.",unavailable:"The service is temporarily unavailable. Try again shortly."};function Je(n,e){return n instanceof dt?KI[n.code]??n.message??e:n instanceof Error&&n.message||e}var QI=j('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="grid size-11 place-items-center rounded-lg bg-brand text-background"></div><div><h1 class="text-xl font-semibold">Meal Signal</h1><p class="text-sm text-muted">Private meal and symptom tracking</p></div></div><form class="grid gap-4"><label class="grid gap-1 text-sm font-medium text-muted-strong">Email<span class=relative><input class="h-11 w-full rounded-lg border border-border-strong bg-surface pl-10 pr-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=email autocomplete=email required></span></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Password<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=password minlength=6 required></label><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"></button></form><div class="my-4 flex items-center gap-3 text-xs font-medium uppercase text-muted"><span class="h-px flex-1 bg-border"></span>Or<span class="h-px flex-1 bg-border"></span></div><button type=button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60">Continue with Google</button><button type=button class="mt-4 w-full text-center text-sm font-medium text-brand">'),JI=j('<p class="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger"aria-live=polite>');function YI(n){const[e,t]=X("signin"),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1),[h,f]=X("");async function p(b){b.preventDefault(),u(!0),f("");try{if(e()==="signin"){const k=await Uy(Zn,r(),i());n.onAuthenticated?.(k.user)}else{const k=await Fy(Zn,r(),i());n.onAuthenticated?.(k.user)}}catch(k){f(Je(k,"Authentication failed."))}finally{u(!1)}}async function E(){u(!0),f("");try{const b=new Rt;b.setCustomParameters({prompt:"select_account"});const k=await uv(Zn,b);n.onAuthenticated?.(k.user)}catch(b){f(Je(b,"Google sign-in failed."))}finally{u(!1)}}return(()=>{var b=QI(),k=b.firstChild,D=k.firstChild,x=D.firstChild,N=D.nextSibling,F=N.firstChild,$=F.firstChild,q=$.nextSibling,G=q.firstChild,B=F.nextSibling,w=B.firstChild,_=w.nextSibling,y=B.nextSibling,T=N.nextSibling,v=T.nextSibling;v.firstChild;var I=v.nextSibling;return P(x,V(Wr,{size:20,"aria-hidden":!0})),N.addEventListener("submit",p),P(q,V(Kp,{class:"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",size:17,"aria-hidden":!0}),G),G.$$input=g=>s(g.target.value),_.$$input=g=>a(g.target.value),P(N,(()=>{var g=re(()=>!!h());return()=>g()?(()=>{var W=JI();return P(W,h),W})():null})(),y),P(y,(()=>{var g=re(()=>!!c());return()=>g()?"Working...":e()==="signin"?"Sign in":"Create account"})(),null),P(y,V(Pl,{size:17,"aria-hidden":!0}),null),v.$$click=E,P(v,V(Pl,{size:17,"aria-hidden":!0}),null),I.$$click=()=>t(e()==="signin"?"signup":"signin"),P(I,()=>e()==="signin"?"Create a new account":"Sign in instead"),J(g=>{var W=e()==="signin"?"current-password":"new-password",ce=c(),Ue=c();return W!==g.e&&se(_,"autocomplete",g.e=W),ce!==g.t&&(y.disabled=g.t=ce),Ue!==g.a&&(v.disabled=g.a=Ue),g},{e:void 0,t:void 0,a:void 0}),J(()=>G.value=r()),J(()=>_.value=i()),b})()}ln(["input","click"]);const XI=no(ro,"createMeal"),ZI=no(ro,"createGiEvent"),eb=no(ro,"analyzeCorrelations"),tb=no(ro,"reanalyzeMeal");async function nb(n){return(await XI(n)).data.meal}async function rb(n){return(await ZI(n)).data.event}async function sb(){return(await eb()).data.analysis}async function ib(n){return(await tb({mealId:n})).data.meal}function Pi(n){const e=n.getTimezoneOffset();return new Date(n.getTime()-e*6e4).toISOString().slice(0,16)}function hh(n){const e=Date.now()-n.getTime(),t=Math.round(e/6e4);if(t<1)return"just now";if(t<60)return`${t}m ago`;const r=Math.round(t/60);if(r<24)return`${r}h ago`;const s=Math.round(r/24);return s<7?`${s}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric",year:n.getFullYear()===new Date().getFullYear()?void 0:"numeric"})}const ob=["cramping","bloating","reflux","nausea","diarrhea","constipation","gas","pain"],dh=5*1024*1024;var rm=j("<button type=button>"),ab=j('<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type=submit class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),sm=j("<p aria-live=polite>"),cb=j('<div class="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-sm"><div class="mb-2 text-brand"></div><p class="truncate text-xs font-medium uppercase text-muted"></p><p class="truncate text-lg font-semibold">'),lb=j("<div>"),ub=j('<div class="grid place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-muted"><div class="mb-2 text-muted"></div><p class="text-sm font-medium">'),hb=j('<main class="grid min-h-screen place-items-center bg-background text-muted-strong">'),db=j('<main class="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm"><h1 class="mb-2 text-lg font-semibold">Firebase config missing</h1><p class="text-sm text-muted-strong">Add the Firebase Web App values to `.env.local` or the Vite environment variables.');function fh(n){return(()=>{var e=rm();return ya(e,"click",n.onClick,!0),P(e,()=>n.icon,null),P(e,()=>n.children,null),J(t=>or(e,{"flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition":!0,"bg-brand text-background shadow-sm":n.active,"text-muted-strong hover:bg-surface-muted":!n.active},t)),e})()}function Uo(n){return(()=>{var e=rm();return ya(e,"click",n.onClick,!0),P(e,()=>n.icon,null),P(e,()=>n.children,null),J(t=>or(e,{"flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition":!0,"border-brand bg-brand text-background":n.active,"border-border-strong bg-surface text-muted-strong hover:border-muted":!n.active},t)),e})()}function im(n){const e=()=>n.tone==="error"?"text-danger":n.tone==="success"?"text-brand":"text-muted-strong";return(()=>{var t=ab(),r=t.firstChild;return P(r,(()=>{var s=re(()=>!!n.busy);return()=>s()?"Saving...":n.label})(),null),P(r,(()=>{var s=re(()=>!!n.busy);return()=>s()?V(xi,{class:"animate-spin",size:16,"aria-hidden":!0}):V(Rh,{size:16,"aria-hidden":!0})})(),null),P(t,(()=>{var s=re(()=>!!n.message);return()=>s()?(()=>{var i=sm();return P(i,()=>n.message),J(()=>_a(i,`text-sm ${e()}`)),i})():null})(),null),J(()=>r.disabled=n.disabled),t})()}function Bo(n){return(()=>{var e=cb(),t=e.firstChild,r=t.nextSibling,s=r.nextSibling;return P(t,()=>n.icon),P(r,()=>n.label),P(s,()=>n.value),e})()}function mh(n){return(()=>{var e=lb();return P(e,(()=>{var t=re(()=>!!n.ready);return()=>t()?V(Rh,{size:16,"aria-hidden":!0}):V(Ch,{size:16,"aria-hidden":!0})})(),null),P(e,(()=>{var t=re(()=>!!n.ready);return()=>t()?n.label:"No media selected"})(),null),J(t=>or(e,{"flex items-center gap-2 text-sm":!0,"text-brand":n.ready,"text-muted":!n.ready},t)),e})()}function om(n){return(()=>{var e=ub(),t=e.firstChild,r=t.nextSibling;return P(t,()=>n.icon),P(r,()=>n.title),e})()}function Ac(n){const e=()=>n.tone==="error"?"border-danger/30 bg-danger-soft text-danger-strong":"border-border bg-surface-muted text-muted-strong";return(()=>{var t=sm();return P(t,()=>n.children),J(()=>_a(t,`rounded-lg border px-3 py-2 text-sm ${e()}`)),t})()}function fb(){return(()=>{var n=hb();return P(n,V(xi,{class:"animate-spin",size:22,"aria-label":"Loading"})),n})()}function mb(){return db()}ln(["click"]);var pb=j('<svg class="h-12 w-20 shrink-0"viewBox="0 0 80 48"role=img>'),gb=j("<svg><circle cx=22 cy=26 r=7 stroke-width=2></svg>",!1,!0,!1),_b=j("<svg><circle cx=38 cy=20 r=6 stroke-width=2></svg>",!1,!0,!1),yb=j("<svg><circle cx=52 cy=29 r=7 stroke-width=2></svg>",!1,!0,!1),vb=j("<svg><circle cx=62 cy=18 r=5 stroke-width=2></svg>",!1,!0,!1),Eb=j("<svg><ellipse cx=40 cy=25 rx=29 ry=11 stroke-width=2></svg>",!1,!0,!1),wb=j('<svg><path d="M18 24c8-8 16 7 24-1s14 6 22-1"fill=none stroke=#f3efe7 stroke-width=3></svg>',!1,!0,!1),Tb=j("<svg><ellipse cx=40 cy=25 rx=30 ry=10 stroke-width=2></svg>",!1,!0,!1),Ib=j('<svg><path d="M25 18l5 8M40 16l-3 10M53 19l-5 8"stroke=#f3efe7 stroke-width=3 stroke-linecap=round></svg>',!1,!0,!1),bb=j('<svg><path d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"stroke-width=2></svg>',!1,!0,!1),Ab=j("<svg><ellipse cx=24 cy=27 rx=11 ry=9 stroke-width=2></svg>",!1,!0,!1),Sb=j("<svg><ellipse cx=43 cy=22 rx=12 ry=9 stroke-width=2></svg>",!1,!0,!1),Rb=j("<svg><ellipse cx=57 cy=31 rx=10 ry=8 stroke-width=2></svg>",!1,!0,!1),Cb=j('<svg><path d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z"stroke-width=2></svg>',!1,!0,!1),Pb=j('<svg><path d="M29 22l-6 5M43 20l4 6M53 33l-7 4"stroke=#f3efe7 stroke-width=2 stroke-linecap=round></svg>',!1,!0,!1),kb=j("<svg><ellipse cx=40 cy=29 rx=31 ry=10 fill=#8b6f47 opacity=0.55></svg>",!1,!0,!1),xb=j("<svg><ellipse cx=31 cy=26 rx=9 ry=4 opacity=0.7></svg>",!1,!0,!1),Nb=j("<svg><ellipse cx=52 cy=31 rx=11 ry=4 opacity=0.6></svg>",!1,!0,!1),Db=j('<svg><path d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"stroke-width=2></svg>',!1,!0,!1),Vb=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">GI event</h2><p class="text-sm text-muted">Record timing, severity, and symptoms.</p></div></div><form class="grid gap-4"><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Occurred at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Severity: <input class="h-11 accent-brand"type=range min=1 max=10></label></div><div class="grid gap-2"><span class="text-sm font-medium text-muted-strong">Symptoms</span><div class="flex flex-wrap gap-2"></div></div><div class="grid gap-4 sm:grid-cols-3"><div class="grid gap-2 text-sm font-medium text-muted-strong sm:col-span-1"><a class="w-fit underline decoration-border-strong underline-offset-4 transition hover:text-brand hover:decoration-brand"href=https://en.wikipedia.org/wiki/Bristol_stool_scale target=_blank rel=noreferrer>Stool type</a><div class="rounded-lg border border-border-strong bg-surface p-3"><div class="mb-3 flex min-h-14 items-center gap-3"><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><p class="text-base font-semibold text-foreground"></p></div><p class="line-clamp-2 text-xs font-medium text-muted"></p></div></div><input class="h-6 w-full accent-brand"type=range min=1 max=7 step=1 aria-label="Bristol stool type"><div class="mt-1 flex justify-between text-[11px] font-medium text-muted"><span>1</span><span>7</span></div></div></div><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Minutes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=number min=1 max=1440></label><label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20">'),Ob=j("<button type=button>"),Mb=j('<button type=button class="rounded px-1.5 py-0.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-muted-strong">Clear');const Lb=[{value:1,label:"Separate hard lumps"},{value:2,label:"Lumpy sausage"},{value:3,label:"Cracked sausage"},{value:4,label:"Smooth soft sausage"},{value:5,label:"Soft blobs"},{value:6,label:"Mushy pieces"},{value:7,label:"Watery"}];function $b(n){const e=Number(n);return Lb.find(t=>t.value===e)??null}function Fb(n){const e=()=>n.type?"#5f4b32":"#d6d3d1",t=()=>n.type?"#3f3323":"#a8a29e";return(()=>{var r=pb();return P(r,(()=>{var s=re(()=>n.type===1);return()=>s()?[(()=>{var i=gb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=_b();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=yb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=vb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})()]:null})(),null),P(r,(()=>{var s=re(()=>n.type===2);return()=>s()?[(()=>{var i=Eb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),wb()]:null})(),null),P(r,(()=>{var s=re(()=>n.type===3);return()=>s()?[(()=>{var i=Tb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),Ib()]:null})(),null),P(r,(()=>{var s=re(()=>n.type===4);return()=>s()?(()=>{var i=bb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})():null})(),null),P(r,(()=>{var s=re(()=>n.type===5);return()=>s()?[(()=>{var i=Ab();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=Sb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),(()=>{var i=Rb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})()]:null})(),null),P(r,(()=>{var s=re(()=>n.type===6);return()=>s()?[(()=>{var i=Cb();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})(),Pb()]:null})(),null),P(r,(()=>{var s=re(()=>n.type===7);return()=>s()?[kb(),(()=>{var i=xb();return J(()=>se(i,"fill",e())),i})(),(()=>{var i=Nb();return J(()=>se(i,"fill",e())),i})()]:null})(),null),P(r,(()=>{var s=re(()=>!n.type);return()=>s()?(()=>{var i=Db();return J(a=>{var c=e(),u=t();return c!==a.e&&se(i,"fill",a.e=c),u!==a.t&&se(i,"stroke",a.t=u),a},{e:void 0,t:void 0}),i})():null})(),null),J(()=>se(r,"aria-label",n.type?`Bristol stool type ${n.type}`:"No stool type selected")),r})()}function Ub(){const[n,e]=X(Pi(new Date)),[t,r]=X(4),[s,i]=X([]),[a,c]=X(""),[u,h]=X(""),[f,p]=X(""),[E,b]=X(!1),[k,D]=X(""),[x,N]=X("info"),F=()=>$b(u());function $(G){const B=s();i(B.includes(G)?B.filter(w=>w!==G):[...B,G])}async function q(G){G.preventDefault(),b(!0),D(""),N("info");const B=new Date(n());if(Number.isNaN(B.getTime())){N("error"),D("Choose a valid event time."),b(!1);return}if(s().length===0&&!u()){N("error"),D("Choose a symptom or stool type."),b(!1);return}try{await rb({occurredAt:B.toISOString(),severity:t(),symptoms:s(),notes:a().trim()||void 0,stoolType:u()?Number(u()):void 0,durationMinutes:f()?Number(f()):void 0}),e(Pi(new Date)),r(4),i([]),c(""),h(""),p(""),N("success"),D("Event saved.")}catch(w){N("error"),D(Je(w,"Event could not be saved."))}finally{b(!1)}}return(()=>{var G=Vb(),B=G.firstChild;B.firstChild;var w=B.nextSibling,_=w.firstChild,y=_.firstChild,T=y.firstChild,v=T.nextSibling,I=y.nextSibling,g=I.firstChild,W=g.nextSibling,ce=_.nextSibling,Ue=ce.firstChild,Ze=Ue.nextSibling,ze=ce.nextSibling,He=ze.firstChild,st=He.firstChild,Ye=st.nextSibling,Be=Ye.firstChild,we=Be.firstChild,me=we.firstChild,ke=me.firstChild,it=me.nextSibling,et=Be.nextSibling,Ln=He.nextSibling,Ts=Ln.firstChild,Is=Ts.nextSibling,io=Ln.nextSibling,bs=io.firstChild,$n=bs.nextSibling;return P(B,V(Sh,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),w.addEventListener("submit",q),v.$$input=ue=>e(ue.target.value),P(I,t,W),W.addEventListener("change",ue=>r(Number(ue.target.value))),P(Ze,()=>ob.map(ue=>(()=>{var St=Ob();return St.$$click=()=>$(ue),P(St,ue),J(mr=>or(St,{"h-9 rounded-md border px-3 text-sm font-medium transition":!0,"border-brand bg-brand text-background":s().includes(ue),"border-border-strong bg-surface text-muted-strong hover:border-muted":!s().includes(ue)},mr)),St})())),P(Be,V(Fb,{get type(){return F()?.value??null}}),we),P(ke,(()=>{var ue=re(()=>!!F());return()=>ue()?`Type ${F().value}`:"Not set"})()),P(me,(()=>{var ue=re(()=>!!F());return()=>ue()?(()=>{var St=Mb();return St.$$click=()=>h(""),St})():null})(),null),P(it,()=>F()?.label??"Move slider to set"),et.$$keydown=ue=>{!u()&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(ue.key)&&h("4")},et.addEventListener("change",ue=>h(ue.target.value)),et.$$pointerdown=()=>h(ue=>ue||"4"),Is.$$input=ue=>p(ue.target.value),$n.$$input=ue=>c(ue.target.value),P(w,V(im,{get busy(){return E()},get disabled(){return re(()=>s().length===0)()&&!u()||E()},get message(){return k()},get tone(){return x()},label:"Save event"}),null),J(()=>v.value=n()),J(()=>W.value=t()),J(()=>et.value=u()||"4"),J(()=>Is.value=f()),J(()=>$n.value=a()),G})()}ln(["input","pointerdown","keydown","click"]);var Bb=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-4 flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">Meal</h2><p class="text-sm text-muted">Capture what you ate and when.</p></div></div><form class="grid gap-4"><div class="grid grid-cols-3 gap-2"></div><div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-1 text-sm font-medium text-muted-strong">Eaten at<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"type=datetime-local required></label><label class="grid gap-1 text-sm font-medium text-muted-strong">Notes<input class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Portion, stress, meds">'),jb=j('<label class="grid gap-1 text-sm font-medium text-muted-strong">Meal text<textarea class="min-h-28 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"placeholder="Turkey sandwich, chips, iced coffee">'),qb=j('<div class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3"><button type=button>'),zb=j('<label class="grid gap-3 rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 text-sm font-medium text-muted-strong"><span class="flex items-center gap-2">Meal photo</span><input class="block w-full text-sm text-muted-strong file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"type=file accept=image/* capture=environment>');function Hb(){const[n,e]=X("text"),[t,r]=X(""),[s,i]=X(""),[a,c]=X(Pi(new Date)),[u,h]=X(""),[f,p]=X(""),[E,b]=X(!1),[k,D]=X(!1),[x,N]=X(""),[F,$]=X("info");let q=null,G=null,B=[];si(()=>{q?.stop(),G?.getTracks().forEach(v=>v.stop())});async function w(v){v.preventDefault(),D(!0),N(""),$("info");const I=new Date(a());if(Number.isNaN(I.getTime())){$("error"),N("Choose a valid meal time."),D(!1);return}try{await nb({mode:n(),text:n()==="text"?t():void 0,mediaBase64:n()==="text"?void 0:u(),mimeType:n()==="text"?void 0:f(),eatenAt:I.toISOString(),notes:s().trim()||void 0}),r(""),i(""),h(""),p(""),c(Pi(new Date)),$("success"),N("Meal saved.")}catch(g){$("error"),N(Je(g,"Meal could not be saved."))}finally{D(!1)}}async function _(v){if(N(""),$("info"),!!v){if(v.size>dh){h(""),p(""),$("error"),N("Use an image smaller than 5 MB.");return}try{const I=await Gb(v);h(I),p(v.type),$("success"),N("Image ready.")}catch(I){$("error"),N(Je(I,"Image could not be read."))}}}async function y(){if(N(""),$("info"),E()){q?.stop();return}if(!navigator.mediaDevices?.getUserMedia){$("error"),N("Audio recording is not available in this browser.");return}try{const v=await navigator.mediaDevices.getUserMedia({audio:!0}),I=new MediaRecorder(v);B=[],q=I,G=v,I.ondataavailable=g=>{g.data.size&&B.push(g.data)},I.onerror=()=>{$("error"),N("Audio recording failed.")},I.onstop=async()=>{const g=new Blob(B,{type:I.mimeType||"audio/webm"});if(G?.getTracks().forEach(W=>W.stop()),G=null,b(!1),g.size>dh){h(""),p(""),$("error"),N("Use a shorter recording under 5 MB.");return}try{h(await am(g)),p(g.type),$("success"),N("Audio ready.")}catch(W){$("error"),N(Je(W,"Audio could not be prepared."))}},I.start(),b(!0)}catch(v){$("error"),N(Je(v,"Microphone access was not granted."))}}const T=()=>n()==="text"?t().trim().length>2:u().length>0&&f().length>0;return(()=>{var v=Bb(),I=v.firstChild;I.firstChild;var g=I.nextSibling,W=g.firstChild,ce=W.nextSibling,Ue=ce.firstChild,Ze=Ue.firstChild,ze=Ze.nextSibling,He=Ue.nextSibling,st=He.firstChild,Ye=st.nextSibling;return P(I,V(Wr,{class:"mt-1 text-brand",size:20,"aria-hidden":!0}),null),g.addEventListener("submit",w),P(W,V(Uo,{get active(){return n()==="text"},onClick:()=>e("text"),get icon(){return V(Wr,{size:17})},children:"Text"}),null),P(W,V(Uo,{get active(){return n()==="voice"},onClick:()=>e("voice"),get icon(){return V(kl,{size:17})},children:"Voice"}),null),P(W,V(Uo,{get active(){return n()==="image"},onClick:()=>e("image"),get icon(){return V(Cl,{size:17})},children:"Image"}),null),P(g,(()=>{var Be=re(()=>n()==="text");return()=>Be()?(()=>{var we=jb(),me=we.firstChild,ke=me.nextSibling;return ke.$$input=it=>r(it.target.value),J(()=>ke.value=t()),we})():re(()=>n()==="voice")()?(()=>{var we=qb(),me=we.firstChild;return me.$$click=y,P(me,V(kl,{size:18,"aria-hidden":!0}),null),P(me,(()=>{var ke=re(()=>!!E());return()=>ke()?"Stop recording":u()?"Record again":"Record"})(),null),P(we,V(mh,{get ready(){return!!u()},label:"Audio ready"}),null),J(ke=>or(me,{"flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition":!0,"bg-danger text-background hover:bg-danger-strong":E(),"bg-brand text-background hover:bg-brand-hover":!E()},ke)),we})():(()=>{var we=zb(),me=we.firstChild,ke=me.firstChild,it=me.nextSibling;return P(me,V(Cl,{size:18,"aria-hidden":!0}),ke),it.addEventListener("change",et=>_(et.target.files?.[0])),P(we,V(mh,{get ready(){return!!u()},label:"Image ready"}),null),we})()})(),ce),ze.$$input=Be=>c(Be.target.value),Ye.$$input=Be=>i(Be.target.value),P(g,V(im,{get busy(){return k()},get disabled(){return!T()||k()},get message(){return x()},get tone(){return F()},label:"Save meal"}),null),J(()=>ze.value=a()),J(()=>Ye.value=s()),v})()}function Gb(n){return am(n)}function am(n){return new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=String(r.result??"");e(s.includes(",")?s.split(",")[1]:s)},r.onerror=()=>t(r.error),r.readAsDataURL(n)})}ln(["input","click"]);function Tn(n){return n?n.toISOString():void 0}function Ie(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Wb(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"meal"}function Sc(n){return{...n,eatenAt:Tn(n.eatenAt),createdAt:Tn(n.createdAt),updatedAt:Tn(n.updatedAt),reanalyzedAt:Tn(n.reanalyzedAt)}}function Kb(n){return{...n,occurredAt:Tn(n.occurredAt),createdAt:Tn(n.createdAt)}}function Qb(n){return n?{...n,generatedAt:Tn(n.generatedAt)}:null}function so(n,e,t){const r=new Blob([t],{type:e}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=n,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function Jb(n){const e=Wb(n.analysis.mealName||n.id);so(`meal-signal-meal-${e}-${n.eatenAt.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),meal:Sc(n)},null,2))}function Yb(n){so(`meal-signal-meals-${new Date().toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:new Date().toISOString(),mealCount:n.length,meals:n.map(Sc)},null,2))}function Xb({analysis:n,meals:e,events:t,exportedAt:r=new Date}){so(`meal-signal-analysis-${r.toISOString().slice(0,10)}.json`,"application/json",JSON.stringify({exportedAt:r.toISOString(),analysis:Qb(n),meals:e.map(Sc),giEvents:t.map(Kb)},null,2))}function Zb({analysis:n,meals:e,events:t,exportedAt:r=new Date}){const s=n?.findings??[],i=n?.dataQualityNotes??[],a=e.slice(0,50),c=t.slice(0,50),u=`<!doctype html>
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
</html>`;so(`meal-signal-analysis-${r.toISOString().slice(0,10)}.html`,"text/html",u)}function In(n){if(n instanceof ae)return n.toDate();if(n instanceof Date)return n;if(typeof n=="string"){const e=new Date(n);return Number.isNaN(e.getTime())?new Date:e}return new Date}function cm(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function lm(n){const e=n.data();return{id:n.id,uid:e.uid,inputMode:e.inputMode,rawInput:e.rawInput??"",interpretedText:e.interpretedText??"",eatenAt:In(e.eatenAt),notes:e.notes,status:e.status??"needs_review",analysis:e.analysis??{mealName:"Meal",foods:[],irritants:[],summary:""},createdAt:In(e.createdAt),updatedAt:In(e.updatedAt),reanalyzedAt:e.reanalyzedAt?In(e.reanalyzedAt):void 0}}function um(n){const e=n.data();return{id:n.id,uid:e.uid,occurredAt:In(e.occurredAt),severity:e.severity??1,symptoms:cm(e.symptoms),notes:e.notes,stoolType:e.stoolType,durationMinutes:e.durationMinutes,createdAt:In(e.createdAt)}}function eA(n){const e=n.data();return{id:n.id,uid:e.uid,status:e.status??"insufficient_data",generatedAt:In(e.generatedAt),mealCount:e.mealCount??0,eventCount:e.eventCount??0,summary:e.summary??"No analysis has been generated yet.",findings:Array.isArray(e.findings)?e.findings:[],dataQualityNotes:cm(e.dataQualityNotes)}}async function tA(n){const e=Yi(fn,"users",n.uid),t=await bI(e),r=t.exists()?t.data().createdAt:null;await AI(e,{uid:n.uid,email:n.email,displayName:n.displayName,updatedAt:nh(),createdAt:r instanceof ae?r:nh()})}async function nA(n,e){await Yf(Yi(fn,"users",n,"meals",e))}async function rA(n,e){await Yf(Yi(fn,"users",n,"events",e))}async function sA(n){const e=eo(Ji(fn,"users",n,"meals"),to("eatenAt","desc"));return(await Jf(e)).docs.map(lm)}async function iA(n){const e=eo(Ji(fn,"users",n,"events"),to("occurredAt","desc"));return(await Jf(e)).docs.map(um)}function oA(n,e,t){const r=eo(Ji(fn,"users",n,"meals"),to("eatenAt","desc"),Kf(25));return Tc(r,s=>e(s.docs.map(lm)),t)}function aA(n,e,t){const r=eo(Ji(fn,"users",n,"events"),to("occurredAt","desc"),Kf(25));return Tc(r,s=>e(s.docs.map(um)),t)}function cA(n,e,t){return Tc(Yi(fn,"users",n,"analyses","current"),r=>e(r.exists()?eA(r):null),t)}var lA=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"><div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 class="text-lg font-semibold">Correlation analysis</h2><p class="text-sm text-muted"></p></div><div class="flex flex-wrap items-center gap-2"><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis HTML"title="Export analysis HTML"></button><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export analysis JSON"title="Export analysis JSON"></button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export all meals JSON"title="Export all meals JSON">Meals</button><button type=button class="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">'),uA=j("<div class=mb-4>"),hA=j('<div class="grid gap-4"><div class="rounded-lg bg-surface-accent p-4"><p class="text-sm font-medium text-brand"></p><p class="mt-2 text-xs text-muted-strong"> meals, <!> GI events</p></div><div class="grid gap-3">'),dA=j('<article class="rounded-lg border border-border p-4"><div class="flex items-start justify-between gap-3"><div><h3 class=font-semibold></h3><p class="text-sm text-muted"> within <!>h</p></div><span class="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">%</span></div><p class="mt-3 text-sm text-muted-strong"></p><p class="mt-2 text-sm font-medium text-brand">'),fA=j('<div class="rounded-lg border border-warning-border bg-warning-soft p-4"><div class="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">Data notes</div><ul class="grid gap-1 text-sm text-warning">'),mA=j("<li>");function pA(n){const[e,t]=X(!1),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1);async function h(){t(!0),a(""),u(!1);try{await sb(),a("Analysis queued.")}catch(E){u(!0),a(Je(E,"Analysis could not be started."))}finally{t(!1)}}async function f(){const[E,b]=await Promise.all([sA(n.uid),iA(n.uid)]);return{meals:E,events:b}}async function p(E){s(E),a(""),u(!1);try{const{meals:b,events:k}=await f();E==="analysis-html"?(Zb({analysis:n.analysis,meals:b,events:k}),a("Analysis HTML exported.")):E==="analysis-json"?(Xb({analysis:n.analysis,meals:b,events:k}),a("Analysis JSON exported.")):(Yb(b),a("Meals JSON exported."))}catch(b){u(!0),a(Je(b,"Export could not be prepared."))}finally{s("")}}return(()=>{var E=lA(),b=E.firstChild,k=b.firstChild,D=k.firstChild,x=D.nextSibling,N=k.nextSibling,F=N.firstChild,$=F.nextSibling,q=$.nextSibling,G=q.firstChild,B=q.nextSibling;return P(x,(()=>{var w=re(()=>!!n.analysis);return()=>w()?`Updated ${n.analysis.generatedAt.toLocaleString()}`:`${n.mealCount} meals and ${n.eventCount} GI events available`})()),F.$$click=()=>p("analysis-html"),P(F,V(jp,{size:17,"aria-hidden":!0})),$.$$click=()=>p("analysis-json"),P($,V(zo,{size:17,"aria-hidden":!0})),q.$$click=()=>p("meals-json"),P(q,V(zo,{size:16,"aria-hidden":!0}),G),B.$$click=h,P(B,V(xi,{size:16,get class(){return e()?"animate-spin":""},"aria-hidden":!0}),null),P(B,()=>e()?"Starting":"Run",null),P(E,(()=>{var w=re(()=>!!i());return()=>w()?(()=>{var _=uA();return P(_,V(Ac,{get tone(){return c()?"error":"info"},get children(){return i()}})),_})():null})(),null),P(E,(()=>{var w=re(()=>!!n.analysis);return()=>w()?(()=>{var _=hA(),y=_.firstChild,T=y.firstChild,v=T.nextSibling,I=v.firstChild,g=I.nextSibling;g.nextSibling;var W=y.nextSibling;return P(T,()=>n.analysis.summary),P(v,()=>n.analysis.mealCount,I),P(v,()=>n.analysis.eventCount,g),P(W,()=>n.analysis.findings.map(ce=>(()=>{var Ue=dA(),Ze=Ue.firstChild,ze=Ze.firstChild,He=ze.firstChild,st=He.nextSibling,Ye=st.firstChild,Be=Ye.nextSibling;Be.nextSibling;var we=ze.nextSibling,me=we.firstChild,ke=Ze.nextSibling,it=ke.nextSibling;return P(He,()=>ce.irritant),P(st,(()=>{var et=re(()=>ce.direction==="possible_trigger");return()=>et()?"possible sensitivity":ce.direction.replaceAll("_"," ")})(),Ye),P(st,()=>ce.windowHours,Be),P(we,()=>Math.round(ce.confidence*100),me),P(ke,()=>ce.evidence),P(it,()=>ce.suggestedAction),Ue})())),P(_,(()=>{var ce=re(()=>!!n.analysis.dataQualityNotes.length);return()=>ce()?(()=>{var Ue=fA(),Ze=Ue.firstChild,ze=Ze.firstChild,He=Ze.nextSibling;return P(Ze,V(Ch,{size:16,"aria-hidden":!0}),ze),P(He,()=>n.analysis.dataQualityNotes.map(st=>(()=>{var Ye=mA();return P(Ye,st),Ye})())),Ue})():null})(),null),_})():V(om,{get icon(){return V(va,{size:22})},title:"No analysis yet"})})(),null),J(w=>{var _=!!r(),y=!!r(),T=!!r(),v=e();return _!==w.e&&(F.disabled=w.e=_),y!==w.t&&($.disabled=w.t=y),T!==w.a&&(q.disabled=w.a=T),v!==w.o&&(B.disabled=w.o=v),w},{e:void 0,t:void 0,a:void 0,o:void 0}),E})()}ln(["click"]);var gA=j('<section class="grid grid-cols-3 gap-2">'),_A=j('<section class="rounded-lg border border-border bg-surface p-4 shadow-sm"><div class="mb-3 flex items-center gap-2"><h2 class=font-semibold>Recent'),yA=j("<div class=mb-3>"),vA=j('<div class="grid gap-3">'),EA=j('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold"></h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Redo meal analysis"title="Redo meal analysis"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"aria-label="Export meal JSON"title="Export meal JSON"></button><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete meal"title="Delete meal"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 line-clamp-2 text-sm text-muted-strong"></p><div class="mt-2 flex flex-wrap gap-1">'),wA=j('<span class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong">'),TA=j('<article class="rounded-lg bg-surface-muted p-3"><div class="flex items-start justify-between gap-3"><h3 class="text-sm font-semibold">Severity </h3><div class="flex shrink-0 items-center gap-2"><button type=button class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"aria-label="Delete event"title="Delete event"></button><span class="text-xs text-muted"></span></div></div><p class="mt-1 text-sm text-muted-strong">');function IA(n){const e=[...n.symptoms];return n.stoolType&&e.push(`stool type ${n.stoolType}`),e.length?e.join(", "):"No details recorded"}function bA(n){const e=gt(()=>{const t=new Map;for(const r of n.meals)for(const s of r.analysis.irritants??[])t.set(s.name,(t.get(s.name)??0)+1);return[...t.entries()].sort((r,s)=>s[1]-r[1])[0]?.[0]??"None"});return(()=>{var t=gA();return P(t,V(Bo,{get icon(){return V(Wr,{size:17})},label:"Meals",get value(){return n.meals.length.toString()}}),null),P(t,V(Bo,{get icon(){return V(Sh,{size:17})},label:"Events",get value(){return n.events.length.toString()}}),null),P(t,V(Bo,{get icon(){return V(va,{size:17})},label:"Signal",get value(){return re(()=>!!n.analysis)()?e():"Pending"}}),null),t})()}function AA(n){const[e,t]=X(""),[r,s]=X(""),[i,a]=X(""),[c,u]=X(!1),h=gt(()=>[...n.meals.map(E=>({kind:"meal",date:E.eatenAt,meal:E})),...n.events.map(E=>({kind:"event",date:E.occurredAt,event:E}))].sort((E,b)=>b.date.getTime()-E.date.getTime()).slice(0,12));async function f(E){t(E),a(""),u(!1);try{await ib(E),a("Meal analysis refreshed.")}catch(b){u(!0),a(Je(b,"Meal analysis could not be refreshed."))}finally{t("")}}async function p(E){const b=E.kind==="meal"?"meal":"event";if(window.confirm(`Delete this ${b}? This cannot be undone.`)){s(`${E.kind}-${E.id}`),a(""),u(!1);try{E.kind==="meal"?await nA(n.uid,E.id):await rA(n.uid,E.id),a(`${b==="meal"?"Meal":"Event"} deleted.`)}catch(D){u(!0),a(Je(D,`The ${b} could not be deleted.`))}finally{s("")}}}return(()=>{var E=_A(),b=E.firstChild,k=b.firstChild;return P(b,V(Rl,{size:18,class:"text-brand","aria-hidden":!0}),k),P(E,(()=>{var D=re(()=>!!i());return()=>D()?(()=>{var x=yA();return P(x,V(Ac,{get tone(){return c()?"error":"info"},get children(){return i()}})),x})():null})(),null),P(E,(()=>{var D=re(()=>!!h().length);return()=>D()?(()=>{var x=vA();return P(x,()=>h().map(N=>N.kind==="meal"?(()=>{var F=EA(),$=F.firstChild,q=$.firstChild,G=q.nextSibling,B=G.firstChild,w=B.nextSibling,_=w.nextSibling,y=_.nextSibling,T=$.nextSibling,v=T.nextSibling;return P(q,()=>N.meal.analysis.mealName),B.$$click=()=>f(N.meal.id),P(B,V(xi,{size:14,get class(){return e()===N.meal.id?"animate-spin":""},"aria-hidden":!0})),w.$$click=()=>Jb(N.meal),P(w,V(zo,{size:14,"aria-hidden":!0})),_.$$click=()=>p({kind:"meal",id:N.meal.id}),P(_,V(xl,{size:14,"aria-hidden":!0})),P(y,()=>hh(N.date)),P(T,()=>N.meal.interpretedText),P(v,()=>N.meal.analysis.irritants.slice(0,3).map(I=>(()=>{var g=wA();return P(g,()=>I.name),g})())),J(I=>{var g=e()===N.meal.id,W=r()===`meal-${N.meal.id}`;return g!==I.e&&(B.disabled=I.e=g),W!==I.t&&(_.disabled=I.t=W),I},{e:void 0,t:void 0}),F})():(()=>{var F=TA(),$=F.firstChild,q=$.firstChild;q.firstChild;var G=q.nextSibling,B=G.firstChild,w=B.nextSibling,_=$.nextSibling;return P(q,()=>N.event.severity,null),B.$$click=()=>p({kind:"event",id:N.event.id}),P(B,V(xl,{size:14,"aria-hidden":!0})),P(w,()=>hh(N.date)),P(_,()=>IA(N.event)),J(()=>B.disabled=r()===`event-${N.event.id}`),F})())),x})():V(om,{get icon(){return V(Rl,{size:22})},title:"No entries yet"})})(),null),E})()}ln(["click"]);var SA=j('<main class="min-h-screen bg-background text-foreground"><header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"><div class="flex min-w-0 items-center gap-3"><div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"></div><div class=min-w-0><h1 class="truncate text-base font-semibold">Meal Signal</h1><p class="truncate text-sm text-muted"></p></div></div><button type=button class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"aria-label="Sign out"title="Sign out"></button></div></header><div class="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]"><section class=min-w-0><div class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm"></div></section><aside class="grid content-start gap-5">'),RA=j("<div class=mb-4>"),CA=j('<div class="grid gap-5">');function PA(){const[n,e]=X(Zn.currentUser),[t,r]=X(!0),[s,i]=X("log"),[a,c]=X([]),[u,h]=X([]),[f,p]=X(null),[E,b]=X("");function k(x){if(e(x),r(!0),b(""),!x){c([]),h([]),p(null);return}tA(x).catch(N=>{b(Je(N,"Your profile could not be prepared."))})}Bm(()=>{const x=qy(Zn,k);si(()=>x())}),yh(()=>{const x=n();if(!x)return;const N=G=>{b(Je(G,"Live updates are temporarily unavailable."))},F=oA(x.uid,c,N),$=aA(x.uid,h,N),q=cA(x.uid,p,N);si(()=>{F(),$(),q()})});async function D(){b("");try{await zy(Zn)}catch(x){b(Je(x,"Sign out failed."))}}return V(Ro,{when:WI,get fallback(){return V(mb,{})},get children(){return V(Ro,{get when(){return t()},get fallback(){return V(fb,{})},get children(){return V(Ro,{get when(){return n()},get fallback(){return V(YI,{onAuthenticated:k})},get children(){var x=SA(),N=x.firstChild,F=N.firstChild,$=F.firstChild,q=$.firstChild,G=q.nextSibling,B=G.firstChild,w=B.nextSibling,_=$.nextSibling,y=N.nextSibling,T=y.firstChild,v=T.firstChild,I=T.nextSibling;return P(q,V(Wr,{size:19,"aria-hidden":!0})),P(w,()=>n().email),_.$$click=D,P(_,V(Hp,{size:18,"aria-hidden":!0})),P(T,(()=>{var g=re(()=>!!E());return()=>g()?(()=>{var W=RA();return P(W,V(Ac,{tone:"error",get children(){return E()}})),W})():null})(),v),P(v,V(fh,{get active(){return s()==="log"},onClick:()=>i("log"),get icon(){return V(Zp,{size:17})},children:"Log"}),null),P(v,V(fh,{get active(){return s()==="analysis"},onClick:()=>i("analysis"),get icon(){return V(va,{size:17})},children:"Analysis"}),null),P(T,(()=>{var g=re(()=>s()==="log");return()=>g()?(()=>{var W=CA();return P(W,V(Hb,{}),null),P(W,V(Ub,{}),null),W})():V(pA,{get uid(){return n().uid},get analysis(){return f()},get mealCount(){return a().length},get eventCount(){return u().length}})})(),null),P(I,V(bA,{get meals(){return a()},get events(){return u()},get analysis(){return f()}}),null),P(I,V(AA,{get uid(){return n().uid},get meals(){return a()},get events(){return u()}}),null),x}})}})}})}ln(["click"]);function kA(){return V(PA,{})}ap(()=>V(kA,{}),document.getElementById("root"));if("serviceWorker"in navigator){let n=!0;const e=()=>{n&&navigator.serviceWorker.register("/sw.js",{scope:"/",updateViaCache:"none"}).catch(t=>{console.error("Service worker registration failed.",t)})};document.readyState==="complete"?e():window.addEventListener("load",e,{once:!0}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(n=!1)})}
