(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ec(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const gt={},kr=[],Zn=()=>{},oh=()=>!1,Ka=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),yc=n=>n.startsWith("onUpdate:"),$t=Object.assign,bc=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},op=Object.prototype.hasOwnProperty,ut=(n,e)=>op.call(n,e),Ye=Array.isArray,Gr=n=>ja(n)==="[object Map]",lh=n=>ja(n)==="[object Set]",$e=n=>typeof n=="function",Pt=n=>typeof n=="string",Gi=n=>typeof n=="symbol",xt=n=>n!==null&&typeof n=="object",ch=n=>(xt(n)||$e(n))&&$e(n.then)&&$e(n.catch),uh=Object.prototype.toString,ja=n=>uh.call(n),lp=n=>ja(n).slice(8,-1),fh=n=>ja(n)==="[object Object]",Tc=n=>Pt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,bs=Ec(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Za=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},cp=/-\w/g,Bi=Za(n=>n.replace(cp,e=>e.slice(1).toUpperCase())),up=/\B([A-Z])/g,Hi=Za(n=>n.replace(up,"-$1").toLowerCase()),hh=Za(n=>n.charAt(0).toUpperCase()+n.slice(1)),xo=Za(n=>n?`on${hh(n)}`:""),Oi=(n,e)=>!Object.is(n,e),Aa=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},dh=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Ac=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let uu;const Ja=()=>uu||(uu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Qa(n){if(Ye(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Pt(i)?pp(i):Qa(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Pt(n)||xt(n))return n}const fp=/;(?![^(]*\))/g,hp=/:([^]+)/,dp=/\/\*[^]*?\*\//g;function pp(n){const e={};return n.replace(dp,"").split(fp).forEach(t=>{if(t){const i=t.split(hp);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function $n(n){let e="";if(Pt(n))e=n;else if(Ye(n))for(let t=0;t<n.length;t++){const i=$n(n[t]);i&&(e+=i+" ")}else if(xt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const mp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",gp=Ec(mp);function ph(n){return!!n||n===""}const mh=n=>!!(n&&n.__v_isRef===!0),mt=n=>Pt(n)?n:n==null?"":Ye(n)||xt(n)&&(n.toString===uh||!$e(n.toString))?mh(n)?mt(n.value):JSON.stringify(n,gh,2):String(n),gh=(n,e)=>mh(e)?gh(n,e.value):Gr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Mo(i,s)+" =>"]=r,t),{})}:lh(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Mo(t))}:Gi(e)?Mo(e):xt(e)&&!Ye(e)&&!fh(e)?String(e):e,Mo=(n,e="")=>{var t;return Gi(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let on;class _p{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=on,!e&&on&&(this.index=(on.scopes||(on.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=on;try{return on=this,e()}finally{on=t}}}on(){++this._on===1&&(this.prevScope=on,on=this)}off(){this._on>0&&--this._on===0&&(on=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function vp(){return on}let vt;const So=new WeakSet;class _h{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,on&&on.active&&on.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,So.has(this)&&(So.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||xh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,fu(this),Mh(this);const e=vt,t=On;vt=this,On=!0;try{return this.fn()}finally{Sh(this),vt=e,On=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Cc(e);this.deps=this.depsTail=void 0,fu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?So.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){hl(this)&&this.run()}get dirty(){return hl(this)}}let vh=0,Ts,As;function xh(n,e=!1){if(n.flags|=8,e){n.next=As,As=n;return}n.next=Ts,Ts=n}function wc(){vh++}function Rc(){if(--vh>0)return;if(As){let e=As;for(As=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Ts;){let e=Ts;for(Ts=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Mh(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Sh(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),Cc(i),xp(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function hl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Eh(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Eh(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Us)||(n.globalVersion=Us,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!hl(n))))return;n.flags|=2;const e=n.dep,t=vt,i=On;vt=n,On=!0;try{Mh(n);const r=n.fn(n._value);(e.version===0||Oi(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{vt=t,On=i,Sh(n),n.flags&=-3}}function Cc(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Cc(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function xp(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let On=!0;const yh=[];function gi(){yh.push(On),On=!1}function _i(){const n=yh.pop();On=n===void 0?!0:n}function fu(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=vt;vt=void 0;try{e()}finally{vt=t}}}let Us=0;class Mp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Pc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!vt||!On||vt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==vt)t=this.activeLink=new Mp(vt,this),vt.deps?(t.prevDep=vt.depsTail,vt.depsTail.nextDep=t,vt.depsTail=t):vt.deps=vt.depsTail=t,bh(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=vt.depsTail,t.nextDep=void 0,vt.depsTail.nextDep=t,vt.depsTail=t,vt.deps===t&&(vt.deps=i)}return t}trigger(e){this.version++,Us++,this.notify(e)}notify(e){wc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Rc()}}}function bh(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)bh(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const dl=new WeakMap,hr=Symbol(""),pl=Symbol(""),Ns=Symbol("");function qt(n,e,t){if(On&&vt){let i=dl.get(n);i||dl.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new Pc),r.map=i,r.key=t),r.track()}}function fi(n,e,t,i,r,s){const a=dl.get(n);if(!a){Us++;return}const o=l=>{l&&l.trigger()};if(wc(),e==="clear")a.forEach(o);else{const l=Ye(n),c=l&&Tc(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,h)=>{(h==="length"||h===Ns||!Gi(h)&&h>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(Ns)),e){case"add":l?c&&o(a.get("length")):(o(a.get(hr)),Gr(n)&&o(a.get(pl)));break;case"delete":l||(o(a.get(hr)),Gr(n)&&o(a.get(pl)));break;case"set":Gr(n)&&o(a.get(hr));break}}Rc()}function Er(n){const e=ct(n);return e===n?e:(qt(e,"iterate",Ns),yn(n)?e:e.map(Vn))}function eo(n){return qt(n=ct(n),"iterate",Ns),n}function Pi(n,e){return vi(n)?dr(n)?Yr(Vn(e)):Yr(e):Vn(e)}const Sp={__proto__:null,[Symbol.iterator](){return Eo(this,Symbol.iterator,n=>Pi(this,n))},concat(...n){return Er(this).concat(...n.map(e=>Ye(e)?Er(e):e))},entries(){return Eo(this,"entries",n=>(n[1]=Pi(this,n[1]),n))},every(n,e){return ii(this,"every",n,e,void 0,arguments)},filter(n,e){return ii(this,"filter",n,e,t=>t.map(i=>Pi(this,i)),arguments)},find(n,e){return ii(this,"find",n,e,t=>Pi(this,t),arguments)},findIndex(n,e){return ii(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ii(this,"findLast",n,e,t=>Pi(this,t),arguments)},findLastIndex(n,e){return ii(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ii(this,"forEach",n,e,void 0,arguments)},includes(...n){return yo(this,"includes",n)},indexOf(...n){return yo(this,"indexOf",n)},join(n){return Er(this).join(n)},lastIndexOf(...n){return yo(this,"lastIndexOf",n)},map(n,e){return ii(this,"map",n,e,void 0,arguments)},pop(){return us(this,"pop")},push(...n){return us(this,"push",n)},reduce(n,...e){return hu(this,"reduce",n,e)},reduceRight(n,...e){return hu(this,"reduceRight",n,e)},shift(){return us(this,"shift")},some(n,e){return ii(this,"some",n,e,void 0,arguments)},splice(...n){return us(this,"splice",n)},toReversed(){return Er(this).toReversed()},toSorted(n){return Er(this).toSorted(n)},toSpliced(...n){return Er(this).toSpliced(...n)},unshift(...n){return us(this,"unshift",n)},values(){return Eo(this,"values",n=>Pi(this,n))}};function Eo(n,e,t){const i=eo(n),r=i[e]();return i!==n&&!yn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Ep=Array.prototype;function ii(n,e,t,i,r,s){const a=eo(n),o=a!==n&&!yn(n),l=a[e];if(l!==Ep[e]){const f=l.apply(n,s);return o?Vn(f):f}let c=t;a!==n&&(o?c=function(f,h){return t.call(this,Pi(n,f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(a,c,i);return o&&r?r(u):u}function hu(n,e,t,i){const r=eo(n);let s=t;return r!==n&&(yn(n)?t.length>3&&(s=function(a,o,l){return t.call(this,a,o,l,n)}):s=function(a,o,l){return t.call(this,a,Pi(n,o),l,n)}),r[e](s,...i)}function yo(n,e,t){const i=ct(n);qt(i,"iterate",Ns);const r=i[e](...t);return(r===-1||r===!1)&&Lc(t[0])?(t[0]=ct(t[0]),i[e](...t)):r}function us(n,e,t=[]){gi(),wc();const i=ct(n)[e].apply(n,t);return Rc(),_i(),i}const yp=Ec("__proto__,__v_isRef,__isVue"),Th=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Gi));function bp(n){Gi(n)||(n=String(n));const e=ct(this);return qt(e,"has",n),e.hasOwnProperty(n)}class Ah{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Up:Ph:s?Ch:Rh).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Ye(e);if(!r){let l;if(a&&(l=Sp[t]))return l;if(t==="hasOwnProperty")return bp}const o=Reflect.get(e,t,zt(e)?e:i);if((Gi(t)?Th.has(t):yp(t))||(r||qt(e,"get",t),s))return o;if(zt(o)){const l=a&&Tc(t)?o:o.value;return r&&xt(l)?gl(l):l}return xt(o)?r?gl(o):to(o):o}}class wh extends Ah{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];const a=Ye(e)&&Tc(t);if(!this._isShallow){const c=vi(s);if(!yn(i)&&!vi(i)&&(s=ct(s),i=ct(i)),!a&&zt(s)&&!zt(i))return c||(s.value=i),!0}const o=a?Number(t)<e.length:ut(e,t),l=Reflect.set(e,t,i,zt(e)?e:r);return e===ct(r)&&(o?Oi(i,s)&&fi(e,"set",t,i):fi(e,"add",t,i)),l}deleteProperty(e,t){const i=ut(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&fi(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!Gi(t)||!Th.has(t))&&qt(e,"has",t),i}ownKeys(e){return qt(e,"iterate",Ye(e)?"length":hr),Reflect.ownKeys(e)}}class Tp extends Ah{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Ap=new wh,wp=new Tp,Rp=new wh(!0);const ml=n=>n,na=n=>Reflect.getPrototypeOf(n);function Cp(n,e,t){return function(...i){const r=this.__v_raw,s=ct(r),a=Gr(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=t?ml:e?Yr:Vn;return!e&&qt(s,"iterate",l?pl:hr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function ia(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Pp(n,e){const t={get(r){const s=this.__v_raw,a=ct(s),o=ct(r);n||(Oi(r,o)&&qt(a,"get",r),qt(a,"get",o));const{has:l}=na(a),c=e?ml:n?Yr:Vn;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!n&&qt(ct(r),"iterate",hr),r.size},has(r){const s=this.__v_raw,a=ct(s),o=ct(r);return n||(Oi(r,o)&&qt(a,"has",r),qt(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=ct(o),c=e?ml:n?Yr:Vn;return!n&&qt(l,"iterate",hr),o.forEach((u,f)=>r.call(s,c(u),c(f),a))}};return $t(t,n?{add:ia("add"),set:ia("set"),delete:ia("delete"),clear:ia("clear")}:{add(r){!e&&!yn(r)&&!vi(r)&&(r=ct(r));const s=ct(this);return na(s).has.call(s,r)||(s.add(r),fi(s,"add",r,r)),this},set(r,s){!e&&!yn(s)&&!vi(s)&&(s=ct(s));const a=ct(this),{has:o,get:l}=na(a);let c=o.call(a,r);c||(r=ct(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?Oi(s,u)&&fi(a,"set",r,s):fi(a,"add",r,s),this},delete(r){const s=ct(this),{has:a,get:o}=na(s);let l=a.call(s,r);l||(r=ct(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&fi(s,"delete",r,void 0),c},clear(){const r=ct(this),s=r.size!==0,a=r.clear();return s&&fi(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Cp(r,n,e)}),t}function Dc(n,e){const t=Pp(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(ut(t,r)&&r in i?t:i,r,s)}const Dp={get:Dc(!1,!1)},Ip={get:Dc(!1,!0)},Lp={get:Dc(!0,!1)};const Rh=new WeakMap,Ch=new WeakMap,Ph=new WeakMap,Up=new WeakMap;function Np(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Fp(n){return n.__v_skip||!Object.isExtensible(n)?0:Np(lp(n))}function to(n){return vi(n)?n:Ic(n,!1,Ap,Dp,Rh)}function Dh(n){return Ic(n,!1,Rp,Ip,Ch)}function gl(n){return Ic(n,!0,wp,Lp,Ph)}function Ic(n,e,t,i,r){if(!xt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=Fp(n);if(s===0)return n;const a=r.get(n);if(a)return a;const o=new Proxy(n,s===2?i:t);return r.set(n,o),o}function dr(n){return vi(n)?dr(n.__v_raw):!!(n&&n.__v_isReactive)}function vi(n){return!!(n&&n.__v_isReadonly)}function yn(n){return!!(n&&n.__v_isShallow)}function Lc(n){return n?!!n.__v_raw:!1}function ct(n){const e=n&&n.__v_raw;return e?ct(e):n}function Op(n){return!ut(n,"__v_skip")&&Object.isExtensible(n)&&dh(n,"__v_skip",!0),n}const Vn=n=>xt(n)?to(n):n,Yr=n=>xt(n)?gl(n):n;function zt(n){return n?n.__v_isRef===!0:!1}function Ke(n){return Ih(n,!1)}function Bp(n){return Ih(n,!0)}function Ih(n,e){return zt(n)?n:new Vp(n,e)}class Vp{constructor(e,t){this.dep=new Pc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ct(e),this._value=t?e:Vn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||yn(e)||vi(e);e=i?e:ct(e),Oi(e,t)&&(this._rawValue=e,this._value=i?e:Vn(e),this.dep.trigger())}}function ot(n){return zt(n)?n.value:n}const zp={get:(n,e,t)=>e==="__v_raw"?n:ot(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return zt(r)&&!zt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function Lh(n){return dr(n)?n:new Proxy(n,zp)}class kp{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Pc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Us-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&vt!==this)return xh(this,!0),!0}get value(){const e=this.dep.track();return Eh(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Gp(n,e,t=!1){let i,r;return $e(n)?i=n:(i=n.get,r=n.set),new kp(i,r,t)}const ra={},Fa=new WeakMap;let ir;function Hp(n,e=!1,t=ir){if(t){let i=Fa.get(t);i||Fa.set(t,i=[]),i.push(n)}}function Wp(n,e,t=gt){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=E=>r?E:yn(E)||r===!1||r===0?hi(E,1):hi(E);let u,f,h,d,g=!1,v=!1;if(zt(n)?(f=()=>n.value,g=yn(n)):dr(n)?(f=()=>c(n),g=!0):Ye(n)?(v=!0,g=n.some(E=>dr(E)||yn(E)),f=()=>n.map(E=>{if(zt(E))return E.value;if(dr(E))return c(E);if($e(E))return l?l(E,2):E()})):$e(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){gi();try{h()}finally{_i()}}const E=ir;ir=u;try{return l?l(n,3,[d]):n(d)}finally{ir=E}}:f=Zn,e&&r){const E=f,w=r===!0?1/0:r;f=()=>hi(E(),w)}const m=vp(),p=()=>{u.stop(),m&&m.active&&bc(m.effects,u)};if(s&&e){const E=e;e=(...w)=>{E(...w),p()}}let M=v?new Array(n.length).fill(ra):ra;const b=E=>{if(!(!(u.flags&1)||!u.dirty&&!E))if(e){const w=u.run();if(r||g||(v?w.some((D,C)=>Oi(D,M[C])):Oi(w,M))){h&&h();const D=ir;ir=u;try{const C=[w,M===ra?void 0:v&&M[0]===ra?[]:M,d];M=w,l?l(e,3,C):e(...C)}finally{ir=D}}}else u.run()};return o&&o(b),u=new _h(f),u.scheduler=a?()=>a(b,!1):b,d=E=>Hp(E,!1,u),h=u.onStop=()=>{const E=Fa.get(u);if(E){if(l)l(E,4);else for(const w of E)w();Fa.delete(u)}},e?i?b(!0):M=u.run():a?a(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function hi(n,e=1/0,t){if(e<=0||!xt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,zt(n))hi(n.value,e,t);else if(Ye(n))for(let i=0;i<n.length;i++)hi(n[i],e,t);else if(lh(n)||Gr(n))n.forEach(i=>{hi(i,e,t)});else if(fh(n)){for(const i in n)hi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&hi(n[i],e,t)}return n}function qs(n,e,t,i){try{return i?n(...i):n()}catch(r){no(r,e,t)}}function ei(n,e,t,i){if($e(n)){const r=qs(n,e,t,i);return r&&ch(r)&&r.catch(s=>{no(s,e,t)}),r}if(Ye(n)){const r=[];for(let s=0;s<n.length;s++)r.push(ei(n[s],e,t,i));return r}}function no(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||gt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(s){gi(),qs(s,null,10,[n,l,c]),_i();return}}Xp(n,t,r,i,a)}function Xp(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const en=[];let Xn=-1;const Hr=[];let Di=null,Or=0;const Uh=Promise.resolve();let Oa=null;function Nh(n){const e=Oa||Uh;return n?e.then(this?n.bind(this):n):e}function qp(n){let e=Xn+1,t=en.length;for(;e<t;){const i=e+t>>>1,r=en[i],s=Fs(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function Uc(n){if(!(n.flags&1)){const e=Fs(n),t=en[en.length-1];!t||!(n.flags&2)&&e>=Fs(t)?en.push(n):en.splice(qp(e),0,n),n.flags|=1,Fh()}}function Fh(){Oa||(Oa=Uh.then(Bh))}function Yp(n){Ye(n)?Hr.push(...n):Di&&n.id===-1?Di.splice(Or+1,0,n):n.flags&1||(Hr.push(n),n.flags|=1),Fh()}function du(n,e,t=Xn+1){for(;t<en.length;t++){const i=en[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;en.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Oh(n){if(Hr.length){const e=[...new Set(Hr)].sort((t,i)=>Fs(t)-Fs(i));if(Hr.length=0,Di){Di.push(...e);return}for(Di=e,Or=0;Or<Di.length;Or++){const t=Di[Or];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Di=null,Or=0}}const Fs=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Bh(n){try{for(Xn=0;Xn<en.length;Xn++){const e=en[Xn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),qs(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xn<en.length;Xn++){const e=en[Xn];e&&(e.flags&=-2)}Xn=-1,en.length=0,Oh(),Oa=null,(en.length||Hr.length)&&Bh()}}let En=null,Vh=null;function Ba(n){const e=En;return En=n,Vh=n&&n.type.__scopeId||null,e}function $p(n,e=En,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&ka(-1);const s=Ba(e);let a;try{a=n(...r)}finally{Ba(s),i._d&&ka(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function It(n,e){if(En===null)return n;const t=ao(En),i=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[s,a,o,l=gt]=e[r];s&&($e(s)&&(s={mounted:s,updated:s}),s.deep&&hi(a),i.push({dir:s,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function Ki(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(gi(),ei(l,t,8,[n.el,o,n,e]),_i())}}function wa(n,e){if(tn){let t=tn.provides;const i=tn.parent&&tn.parent.provides;i===t&&(t=tn.provides=Object.create(i)),t[n]=e}}function Bn(n,e,t=!1){const i=Ym();if(i||Wr){let r=Wr?Wr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&$e(e)?e.call(i&&i.proxy):e}}const Kp=Symbol.for("v-scx"),jp=()=>Bn(Kp);function bn(n,e,t){return zh(n,e,t)}function zh(n,e,t=gt){const{immediate:i,deep:r,flush:s,once:a}=t,o=$t({},t),l=e&&i||!e&&s!=="post";let c;if(Bs){if(s==="sync"){const d=jp();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=Zn,d.resume=Zn,d.pause=Zn,d}}const u=tn;o.call=(d,g,v)=>ei(d,u,g,v);let f=!1;s==="post"?o.scheduler=d=>{gn(d,u&&u.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(d,g)=>{g?d():Uc(d)}),o.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=Wp(n,e,o);return Bs&&(c?c.push(h):l&&h()),h}function Zp(n,e,t){const i=this.proxy,r=Pt(n)?n.includes(".")?kh(i,n):()=>i[n]:n.bind(i,i);let s;$e(e)?s=e:(s=e.handler,t=e);const a=Ys(this),o=zh(r,s.bind(i),t);return a(),o}function kh(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Jp=Symbol("_vte"),Qp=n=>n.__isTeleport,em=Symbol("_leaveCb");function Nc(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Nc(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Gh(n,e){return $e(n)?$t({name:n.name},e,{setup:n}):n}function Hh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Va=new WeakMap;function ws(n,e,t,i,r=!1){if(Ye(n)){n.forEach((g,v)=>ws(g,e&&(Ye(e)?e[v]:e),t,i,r));return}if(Rs(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ws(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?ao(i.component):i.el,a=r?null:s,{i:o,r:l}=n,c=e&&e.r,u=o.refs===gt?o.refs={}:o.refs,f=o.setupState,h=ct(f),d=f===gt?oh:g=>ut(h,g);if(c!=null&&c!==l){if(pu(e),Pt(c))u[c]=null,d(c)&&(f[c]=null);else if(zt(c)){c.value=null;const g=e;g.k&&(u[g.k]=null)}}if($e(l))qs(l,o,12,[a,u]);else{const g=Pt(l),v=zt(l);if(g||v){const m=()=>{if(n.f){const p=g?d(l)?f[l]:u[l]:l.value;if(r)Ye(p)&&bc(p,s);else if(Ye(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],d(l)&&(f[l]=u[l]);else{const M=[s];l.value=M,n.k&&(u[n.k]=M)}}else g?(u[l]=a,d(l)&&(f[l]=a)):v&&(l.value=a,n.k&&(u[n.k]=a))};if(a){const p=()=>{m(),Va.delete(n)};p.id=-1,Va.set(n,p),gn(p,t)}else pu(n),m()}}}function pu(n){const e=Va.get(n);e&&(e.flags|=8,Va.delete(n))}Ja().requestIdleCallback;Ja().cancelIdleCallback;const Rs=n=>!!n.type.__asyncLoader,Wh=n=>n.type.__isKeepAlive;function tm(n,e){Xh(n,"a",e)}function nm(n,e){Xh(n,"da",e)}function Xh(n,e,t=tn){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(io(e,i,t),t){let r=t.parent;for(;r&&r.parent;)Wh(r.parent.vnode)&&im(i,e,t,r),r=r.parent}}function im(n,e,t,i){const r=io(e,n,i,!0);ns(()=>{bc(i[e],r)},t)}function io(n,e,t=tn,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...a)=>{gi();const o=Ys(t),l=ei(e,t,n,a);return o(),_i(),l});return i?r.unshift(s):r.push(s),s}}const Si=n=>(e,t=tn)=>{(!Bs||n==="sp")&&io(n,(...i)=>e(...i),t)},rm=Si("bm"),vr=Si("m"),sm=Si("bu"),am=Si("u"),om=Si("bum"),ns=Si("um"),lm=Si("sp"),cm=Si("rtg"),um=Si("rtc");function fm(n,e=tn){io("ec",n,e)}const hm=Symbol.for("v-ndc");function dm(n,e,t,i){let r;const s=t,a=Ye(n);if(a||Pt(n)){const o=a&&dr(n);let l=!1,c=!1;o&&(l=!yn(n),c=vi(n),n=eo(n)),r=new Array(n.length);for(let u=0,f=n.length;u<f;u++)r[u]=e(l?c?Yr(Vn(n[u])):Vn(n[u]):n[u],u,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let o=0;o<n;o++)r[o]=e(o+1,o,void 0,s)}else if(xt(n))if(n[Symbol.iterator])r=Array.from(n,(o,l)=>e(o,l,void 0,s));else{const o=Object.keys(n);r=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];r[l]=e(n[u],u,l,s)}}else r=[];return r}const _l=n=>n?fd(n)?ao(n):_l(n.parent):null,Cs=$t(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>_l(n.parent),$root:n=>_l(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Yh(n),$forceUpdate:n=>n.f||(n.f=()=>{Uc(n.update)}),$nextTick:n=>n.n||(n.n=Nh.bind(n.proxy)),$watch:n=>Zp.bind(n)}),bo=(n,e)=>n!==gt&&!n.__isScriptSetup&&ut(n,e),pm={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const h=a[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(bo(i,e))return a[e]=1,i[e];if(r!==gt&&ut(r,e))return a[e]=2,r[e];if(ut(s,e))return a[e]=3,s[e];if(t!==gt&&ut(t,e))return a[e]=4,t[e];vl&&(a[e]=0)}}const c=Cs[e];let u,f;if(c)return e==="$attrs"&&qt(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==gt&&ut(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,ut(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return bo(r,e)?(r[e]=t,!0):i!==gt&&ut(i,e)?(i[e]=t,!0):ut(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,props:s,type:a}},o){let l;return!!(t[o]||n!==gt&&o[0]!=="$"&&ut(n,o)||bo(e,o)||ut(s,o)||ut(i,o)||ut(Cs,o)||ut(r.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ut(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function mu(n){return Ye(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let vl=!0;function mm(n){const e=Yh(n),t=n.proxy,i=n.ctx;vl=!1,e.beforeCreate&&gu(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:v,deactivated:m,beforeDestroy:p,beforeUnmount:M,destroyed:b,unmounted:E,render:w,renderTracked:D,renderTriggered:C,errorCaptured:k,serverPrefetch:x,expose:T,inheritAttrs:V,components:j,directives:Y,filters:q}=e;if(c&&gm(c,i,null),a)for(const B in a){const W=a[B];$e(W)&&(i[B]=W.bind(t))}if(r){const B=r.call(t,t);xt(B)&&(n.data=to(B))}if(vl=!0,s)for(const B in s){const W=s[B],se=$e(W)?W.bind(t,t):$e(W.get)?W.get.bind(t,t):Zn,oe=!$e(W)&&$e(W.set)?W.set.bind(t):Zn,me=un({get:se,set:oe});Object.defineProperty(i,B,{enumerable:!0,configurable:!0,get:()=>me.value,set:Te=>me.value=Te})}if(o)for(const B in o)qh(o[B],i,t,B);if(l){const B=$e(l)?l.call(t):l;Reflect.ownKeys(B).forEach(W=>{wa(W,B[W])})}u&&gu(u,n,"c");function H(B,W){Ye(W)?W.forEach(se=>B(se.bind(t))):W&&B(W.bind(t))}if(H(rm,f),H(vr,h),H(sm,d),H(am,g),H(tm,v),H(nm,m),H(fm,k),H(um,D),H(cm,C),H(om,M),H(ns,E),H(lm,x),Ye(T))if(T.length){const B=n.exposed||(n.exposed={});T.forEach(W=>{Object.defineProperty(B,W,{get:()=>t[W],set:se=>t[W]=se,enumerable:!0})})}else n.exposed||(n.exposed={});w&&n.render===Zn&&(n.render=w),V!=null&&(n.inheritAttrs=V),j&&(n.components=j),Y&&(n.directives=Y),x&&Hh(n)}function gm(n,e,t=Zn){Ye(n)&&(n=xl(n));for(const i in n){const r=n[i];let s;xt(r)?"default"in r?s=Bn(r.from||i,r.default,!0):s=Bn(r.from||i):s=Bn(r),zt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function gu(n,e,t){ei(Ye(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function qh(n,e,t,i){let r=i.includes(".")?kh(t,i):()=>t[i];if(Pt(n)){const s=e[n];$e(s)&&bn(r,s)}else if($e(n))bn(r,n.bind(t));else if(xt(n))if(Ye(n))n.forEach(s=>qh(s,e,t,i));else{const s=$e(n.handler)?n.handler.bind(t):e[n.handler];$e(s)&&bn(r,s,n)}}function Yh(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>za(l,c,a,!0)),za(l,e,a)),xt(e)&&s.set(e,l),l}function za(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&za(n,s,t,!0),r&&r.forEach(a=>za(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=_m[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const _m={data:_u,props:vu,emits:vu,methods:Ss,computed:Ss,beforeCreate:Zt,created:Zt,beforeMount:Zt,mounted:Zt,beforeUpdate:Zt,updated:Zt,beforeDestroy:Zt,beforeUnmount:Zt,destroyed:Zt,unmounted:Zt,activated:Zt,deactivated:Zt,errorCaptured:Zt,serverPrefetch:Zt,components:Ss,directives:Ss,watch:xm,provide:_u,inject:vm};function _u(n,e){return e?n?function(){return $t($e(n)?n.call(this,this):n,$e(e)?e.call(this,this):e)}:e:n}function vm(n,e){return Ss(xl(n),xl(e))}function xl(n){if(Ye(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Zt(n,e){return n?[...new Set([].concat(n,e))]:e}function Ss(n,e){return n?$t(Object.create(null),n,e):e}function vu(n,e){return n?Ye(n)&&Ye(e)?[...new Set([...n,...e])]:$t(Object.create(null),mu(n),mu(e??{})):e}function xm(n,e){if(!n)return e;if(!e)return n;const t=$t(Object.create(null),n);for(const i in e)t[i]=Zt(n[i],e[i]);return t}function $h(){return{app:null,config:{isNativeTag:oh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Mm=0;function Sm(n,e){return function(i,r=null){$e(i)||(i=$t({},i)),r!=null&&!xt(r)&&(r=null);const s=$h(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:Mm++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Qm,get config(){return s.config},set config(u){},use(u,...f){return a.has(u)||(u&&$e(u.install)?(a.add(u),u.install(c,...f)):$e(u)&&(a.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||St(i,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,ao(d.component)}},onUnmount(u){o.push(u)},unmount(){l&&(ei(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Wr;Wr=c;try{return u()}finally{Wr=f}}};return c}}let Wr=null;const Em=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Bi(e)}Modifiers`]||n[`${Hi(e)}Modifiers`];function ym(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||gt;let r=t;const s=e.startsWith("update:"),a=s&&Em(i,e.slice(7));a&&(a.trim&&(r=t.map(u=>Pt(u)?u.trim():u)),a.number&&(r=t.map(Ac)));let o,l=i[o=xo(e)]||i[o=xo(Bi(e))];!l&&s&&(l=i[o=xo(Hi(e))]),l&&ei(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,ei(c,n,6,r)}}const bm=new WeakMap;function Kh(n,e,t=!1){const i=t?bm:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!$e(n)){const l=c=>{const u=Kh(c,e,!0);u&&(o=!0,$t(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(xt(n)&&i.set(n,null),null):(Ye(s)?s.forEach(l=>a[l]=null):$t(a,s),xt(n)&&i.set(n,a),a)}function ro(n,e){return!n||!Ka(e)?!1:(e=e.slice(2).replace(/Once$/,""),ut(n,e[0].toLowerCase()+e.slice(1))||ut(n,Hi(e))||ut(n,e))}function xu(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:v}=n,m=Ba(n);let p,M;try{if(t.shapeFlag&4){const E=r||i,w=E;p=qn(c.call(w,E,u,f,d,h,g)),M=o}else{const E=e;p=qn(E.length>1?E(f,{attrs:o,slots:a,emit:l}):E(f,null)),M=e.props?o:Tm(o)}}catch(E){Ps.length=0,no(E,n,1),p=St(Vi)}let b=p;if(M&&v!==!1){const E=Object.keys(M),{shapeFlag:w}=b;E.length&&w&7&&(s&&E.some(yc)&&(M=Am(M,s)),b=$r(b,M,!1,!0))}return t.dirs&&(b=$r(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(t.dirs):t.dirs),t.transition&&Nc(b,t.transition),p=b,Ba(m),p}const Tm=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ka(t))&&((e||(e={}))[t]=n[t]);return e},Am=(n,e)=>{const t={};for(const i in n)(!yc(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function wm(n,e,t){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Mu(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(a[h]!==i[h]&&!ro(c,h))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Mu(i,a,c):!0:!!a;return!1}function Mu(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!ro(t,s))return!0}return!1}function Rm({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const jh={},Zh=()=>Object.create(jh),Jh=n=>Object.getPrototypeOf(n)===jh;function Cm(n,e,t,i=!1){const r={},s=Zh();n.propsDefaults=Object.create(null),Qh(n,e,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);t?n.props=i?r:Dh(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function Pm(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=ct(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(ro(n.emitsOptions,h))continue;const d=e[h];if(l)if(ut(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=Bi(h);r[g]=Ml(l,o,g,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{Qh(n,e,r,s)&&(c=!0);let u;for(const f in o)(!e||!ut(e,f)&&((u=Hi(f))===f||!ut(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Ml(l,o,f,void 0,n,!0)):delete r[f]);if(s!==o)for(const f in s)(!e||!ut(e,f))&&(delete s[f],c=!0)}c&&fi(n.attrs,"set","")}function Qh(n,e,t,i){const[r,s]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(bs(l))continue;const c=e[l];let u;r&&ut(r,u=Bi(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:ro(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=ct(t),c=o||gt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Ml(r,l,f,c[f],n,!ut(c,f))}}return a}function Ml(n,e,t,i,r,s){const a=n[t];if(a!=null){const o=ut(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&$e(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=Ys(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===Hi(t))&&(i=!0))}return i}const Dm=new WeakMap;function ed(n,e,t=!1){const i=t?Dm:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!$e(n)){const u=f=>{l=!0;const[h,d]=ed(f,e,!0);$t(a,h),d&&o.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return xt(n)&&i.set(n,kr),kr;if(Ye(s))for(let u=0;u<s.length;u++){const f=Bi(s[u]);Su(f)&&(a[f]=gt)}else if(s)for(const u in s){const f=Bi(u);if(Su(f)){const h=s[u],d=a[f]=Ye(h)||$e(h)?{type:h}:$t({},h),g=d.type;let v=!1,m=!0;if(Ye(g))for(let p=0;p<g.length;++p){const M=g[p],b=$e(M)&&M.name;if(b==="Boolean"){v=!0;break}else b==="String"&&(m=!1)}else v=$e(g)&&g.name==="Boolean";d[0]=v,d[1]=m,(v||ut(d,"default"))&&o.push(f)}}const c=[a,o];return xt(n)&&i.set(n,c),c}function Su(n){return n[0]!=="$"&&!bs(n)}const Fc=n=>n==="_"||n==="_ctx"||n==="$stable",Oc=n=>Ye(n)?n.map(qn):[qn(n)],Im=(n,e,t)=>{if(e._n)return e;const i=$p((...r)=>Oc(e(...r)),t);return i._c=!1,i},td=(n,e,t)=>{const i=n._ctx;for(const r in n){if(Fc(r))continue;const s=n[r];if($e(s))e[r]=Im(r,s,i);else if(s!=null){const a=Oc(s);e[r]=()=>a}}},nd=(n,e)=>{const t=Oc(e);n.slots.default=()=>t},id=(n,e,t)=>{for(const i in e)(t||!Fc(i))&&(n[i]=e[i])},Lm=(n,e,t)=>{const i=n.slots=Zh();if(n.vnode.shapeFlag&32){const r=e._;r?(id(i,e,t),t&&dh(i,"_",r,!0)):td(e,i)}else e&&nd(n,e)},Um=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,a=gt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:id(r,e,t):(s=!e.$stable,td(e,r)),a=e}else e&&(nd(n,e),a={default:1});if(s)for(const o in r)!Fc(o)&&a[o]==null&&delete r[o]},gn=Vm;function Nm(n){return Fm(n)}function Fm(n,e){const t=Ja();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=Zn,insertStaticContent:g}=n,v=(R,P,G,ne=null,te=null,le=null,A=void 0,Ee=null,ge=!!P.dynamicChildren)=>{if(R===P)return;R&&!fs(R,P)&&(ne=I(R),Te(R,te,le,!0),R=null),P.patchFlag===-2&&(ge=!1,P.dynamicChildren=null);const{type:ue,ref:fe,shapeFlag:S}=P;switch(ue){case so:m(R,P,G,ne);break;case Vi:p(R,P,G,ne);break;case Ao:R==null&&M(P,G,ne,A);break;case Dn:j(R,P,G,ne,te,le,A,Ee,ge);break;default:S&1?w(R,P,G,ne,te,le,A,Ee,ge):S&6?Y(R,P,G,ne,te,le,A,Ee,ge):(S&64||S&128)&&ue.process(R,P,G,ne,te,le,A,Ee,ge,pe)}fe!=null&&te?ws(fe,R&&R.ref,le,P||R,!P):fe==null&&R&&R.ref!=null&&ws(R.ref,null,le,R,!0)},m=(R,P,G,ne)=>{if(R==null)i(P.el=o(P.children),G,ne);else{const te=P.el=R.el;P.children!==R.children&&c(te,P.children)}},p=(R,P,G,ne)=>{R==null?i(P.el=l(P.children||""),G,ne):P.el=R.el},M=(R,P,G,ne)=>{[R.el,R.anchor]=g(R.children,P,G,ne,R.el,R.anchor)},b=({el:R,anchor:P},G,ne)=>{let te;for(;R&&R!==P;)te=h(R),i(R,G,ne),R=te;i(P,G,ne)},E=({el:R,anchor:P})=>{let G;for(;R&&R!==P;)G=h(R),r(R),R=G;r(P)},w=(R,P,G,ne,te,le,A,Ee,ge)=>{if(P.type==="svg"?A="svg":P.type==="math"&&(A="mathml"),R==null)D(P,G,ne,te,le,A,Ee,ge);else{const ue=R.el&&R.el._isVueCE?R.el:null;try{ue&&ue._beginPatch(),x(R,P,te,le,A,Ee,ge)}finally{ue&&ue._endPatch()}}},D=(R,P,G,ne,te,le,A,Ee)=>{let ge,ue;const{props:fe,shapeFlag:S,transition:_,dirs:F}=R;if(ge=R.el=a(R.type,le,fe&&fe.is,fe),S&8?u(ge,R.children):S&16&&k(R.children,ge,null,ne,te,To(R,le),A,Ee),F&&Ki(R,null,ne,"created"),C(ge,R,R.scopeId,A,ne),fe){for(const U in fe)U!=="value"&&!bs(U)&&s(ge,U,null,fe[U],le,ne);"value"in fe&&s(ge,"value",null,fe.value,le),(ue=fe.onVnodeBeforeMount)&&Hn(ue,ne,R)}F&&Ki(R,null,ne,"beforeMount");const O=Om(te,_);O&&_.beforeEnter(ge),i(ge,P,G),((ue=fe&&fe.onVnodeMounted)||O||F)&&gn(()=>{ue&&Hn(ue,ne,R),O&&_.enter(ge),F&&Ki(R,null,ne,"mounted")},te)},C=(R,P,G,ne,te)=>{if(G&&d(R,G),ne)for(let le=0;le<ne.length;le++)d(R,ne[le]);if(te){let le=te.subTree;if(P===le||od(le.type)&&(le.ssContent===P||le.ssFallback===P)){const A=te.vnode;C(R,A,A.scopeId,A.slotScopeIds,te.parent)}}},k=(R,P,G,ne,te,le,A,Ee,ge=0)=>{for(let ue=ge;ue<R.length;ue++){const fe=R[ue]=Ee?Ii(R[ue]):qn(R[ue]);v(null,fe,P,G,ne,te,le,A,Ee)}},x=(R,P,G,ne,te,le,A)=>{const Ee=P.el=R.el;let{patchFlag:ge,dynamicChildren:ue,dirs:fe}=P;ge|=R.patchFlag&16;const S=R.props||gt,_=P.props||gt;let F;if(G&&ji(G,!1),(F=_.onVnodeBeforeUpdate)&&Hn(F,G,P,R),fe&&Ki(P,R,G,"beforeUpdate"),G&&ji(G,!0),(S.innerHTML&&_.innerHTML==null||S.textContent&&_.textContent==null)&&u(Ee,""),ue?T(R.dynamicChildren,ue,Ee,G,ne,To(P,te),le):A||W(R,P,Ee,null,G,ne,To(P,te),le,!1),ge>0){if(ge&16)V(Ee,S,_,G,te);else if(ge&2&&S.class!==_.class&&s(Ee,"class",null,_.class,te),ge&4&&s(Ee,"style",S.style,_.style,te),ge&8){const O=P.dynamicProps;for(let U=0;U<O.length;U++){const N=O[U],Me=S[N],Z=_[N];(Z!==Me||N==="value")&&s(Ee,N,Me,Z,te,G)}}ge&1&&R.children!==P.children&&u(Ee,P.children)}else!A&&ue==null&&V(Ee,S,_,G,te);((F=_.onVnodeUpdated)||fe)&&gn(()=>{F&&Hn(F,G,P,R),fe&&Ki(P,R,G,"updated")},ne)},T=(R,P,G,ne,te,le,A)=>{for(let Ee=0;Ee<P.length;Ee++){const ge=R[Ee],ue=P[Ee],fe=ge.el&&(ge.type===Dn||!fs(ge,ue)||ge.shapeFlag&198)?f(ge.el):G;v(ge,ue,fe,null,ne,te,le,A,!0)}},V=(R,P,G,ne,te)=>{if(P!==G){if(P!==gt)for(const le in P)!bs(le)&&!(le in G)&&s(R,le,P[le],null,te,ne);for(const le in G){if(bs(le))continue;const A=G[le],Ee=P[le];A!==Ee&&le!=="value"&&s(R,le,Ee,A,te,ne)}"value"in G&&s(R,"value",P.value,G.value,te)}},j=(R,P,G,ne,te,le,A,Ee,ge)=>{const ue=P.el=R?R.el:o(""),fe=P.anchor=R?R.anchor:o("");let{patchFlag:S,dynamicChildren:_,slotScopeIds:F}=P;F&&(Ee=Ee?Ee.concat(F):F),R==null?(i(ue,G,ne),i(fe,G,ne),k(P.children||[],G,fe,te,le,A,Ee,ge)):S>0&&S&64&&_&&R.dynamicChildren&&R.dynamicChildren.length===_.length?(T(R.dynamicChildren,_,G,te,le,A,Ee),(P.key!=null||te&&P===te.subTree)&&rd(R,P,!0)):W(R,P,G,fe,te,le,A,Ee,ge)},Y=(R,P,G,ne,te,le,A,Ee,ge)=>{P.slotScopeIds=Ee,R==null?P.shapeFlag&512?te.ctx.activate(P,G,ne,A,ge):q(P,G,ne,te,le,A,ge):L(R,P,ge)},q=(R,P,G,ne,te,le,A)=>{const Ee=R.component=qm(R,ne,te);if(Wh(R)&&(Ee.ctx.renderer=pe),$m(Ee,!1,A),Ee.asyncDep){if(te&&te.registerDep(Ee,H,A),!R.el){const ge=Ee.subTree=St(Vi);p(null,ge,P,G),R.placeholder=ge.el}}else H(Ee,R,P,G,te,le,A)},L=(R,P,G)=>{const ne=P.component=R.component;if(wm(R,P,G))if(ne.asyncDep&&!ne.asyncResolved){B(ne,P,G);return}else ne.next=P,ne.update();else P.el=R.el,ne.vnode=P},H=(R,P,G,ne,te,le,A)=>{const Ee=()=>{if(R.isMounted){let{next:S,bu:_,u:F,parent:O,vnode:U}=R;{const xe=sd(R);if(xe){S&&(S.el=U.el,B(R,S,A)),xe.asyncDep.then(()=>{R.isUnmounted||Ee()});return}}let N=S,Me;ji(R,!1),S?(S.el=U.el,B(R,S,A)):S=U,_&&Aa(_),(Me=S.props&&S.props.onVnodeBeforeUpdate)&&Hn(Me,O,S,U),ji(R,!0);const Z=xu(R),ve=R.subTree;R.subTree=Z,v(ve,Z,f(ve.el),I(ve),R,te,le),S.el=Z.el,N===null&&Rm(R,Z.el),F&&gn(F,te),(Me=S.props&&S.props.onVnodeUpdated)&&gn(()=>Hn(Me,O,S,U),te)}else{let S;const{el:_,props:F}=P,{bm:O,m:U,parent:N,root:Me,type:Z}=R,ve=Rs(P);ji(R,!1),O&&Aa(O),!ve&&(S=F&&F.onVnodeBeforeMount)&&Hn(S,N,P),ji(R,!0);{Me.ce&&Me.ce._def.shadowRoot!==!1&&Me.ce._injectChildStyle(Z);const xe=R.subTree=xu(R);v(null,xe,G,ne,R,te,le),P.el=xe.el}if(U&&gn(U,te),!ve&&(S=F&&F.onVnodeMounted)){const xe=P;gn(()=>Hn(S,N,xe),te)}(P.shapeFlag&256||N&&Rs(N.vnode)&&N.vnode.shapeFlag&256)&&R.a&&gn(R.a,te),R.isMounted=!0,P=G=ne=null}};R.scope.on();const ge=R.effect=new _h(Ee);R.scope.off();const ue=R.update=ge.run.bind(ge),fe=R.job=ge.runIfDirty.bind(ge);fe.i=R,fe.id=R.uid,ge.scheduler=()=>Uc(fe),ji(R,!0),ue()},B=(R,P,G)=>{P.component=R;const ne=R.vnode.props;R.vnode=P,R.next=null,Pm(R,P.props,ne,G),Um(R,P.children,G),gi(),du(R),_i()},W=(R,P,G,ne,te,le,A,Ee,ge=!1)=>{const ue=R&&R.children,fe=R?R.shapeFlag:0,S=P.children,{patchFlag:_,shapeFlag:F}=P;if(_>0){if(_&128){oe(ue,S,G,ne,te,le,A,Ee,ge);return}else if(_&256){se(ue,S,G,ne,te,le,A,Ee,ge);return}}F&8?(fe&16&&$(ue,te,le),S!==ue&&u(G,S)):fe&16?F&16?oe(ue,S,G,ne,te,le,A,Ee,ge):$(ue,te,le,!0):(fe&8&&u(G,""),F&16&&k(S,G,ne,te,le,A,Ee,ge))},se=(R,P,G,ne,te,le,A,Ee,ge)=>{R=R||kr,P=P||kr;const ue=R.length,fe=P.length,S=Math.min(ue,fe);let _;for(_=0;_<S;_++){const F=P[_]=ge?Ii(P[_]):qn(P[_]);v(R[_],F,G,null,te,le,A,Ee,ge)}ue>fe?$(R,te,le,!0,!1,S):k(P,G,ne,te,le,A,Ee,ge,S)},oe=(R,P,G,ne,te,le,A,Ee,ge)=>{let ue=0;const fe=P.length;let S=R.length-1,_=fe-1;for(;ue<=S&&ue<=_;){const F=R[ue],O=P[ue]=ge?Ii(P[ue]):qn(P[ue]);if(fs(F,O))v(F,O,G,null,te,le,A,Ee,ge);else break;ue++}for(;ue<=S&&ue<=_;){const F=R[S],O=P[_]=ge?Ii(P[_]):qn(P[_]);if(fs(F,O))v(F,O,G,null,te,le,A,Ee,ge);else break;S--,_--}if(ue>S){if(ue<=_){const F=_+1,O=F<fe?P[F].el:ne;for(;ue<=_;)v(null,P[ue]=ge?Ii(P[ue]):qn(P[ue]),G,O,te,le,A,Ee,ge),ue++}}else if(ue>_)for(;ue<=S;)Te(R[ue],te,le,!0),ue++;else{const F=ue,O=ue,U=new Map;for(ue=O;ue<=_;ue++){const de=P[ue]=ge?Ii(P[ue]):qn(P[ue]);de.key!=null&&U.set(de.key,ue)}let N,Me=0;const Z=_-O+1;let ve=!1,xe=0;const ee=new Array(Z);for(ue=0;ue<Z;ue++)ee[ue]=0;for(ue=F;ue<=S;ue++){const de=R[ue];if(Me>=Z){Te(de,te,le,!0);continue}let ye;if(de.key!=null)ye=U.get(de.key);else for(N=O;N<=_;N++)if(ee[N-O]===0&&fs(de,P[N])){ye=N;break}ye===void 0?Te(de,te,le,!0):(ee[ye-O]=ue+1,ye>=xe?xe=ye:ve=!0,v(de,P[ye],G,null,te,le,A,Ee,ge),Me++)}const be=ve?Bm(ee):kr;for(N=be.length-1,ue=Z-1;ue>=0;ue--){const de=O+ue,ye=P[de],_e=P[de+1],Fe=de+1<fe?_e.el||ad(_e):ne;ee[ue]===0?v(null,ye,G,Fe,te,le,A,Ee,ge):ve&&(N<0||ue!==be[N]?me(ye,G,Fe,2):N--)}}},me=(R,P,G,ne,te=null)=>{const{el:le,type:A,transition:Ee,children:ge,shapeFlag:ue}=R;if(ue&6){me(R.component.subTree,P,G,ne);return}if(ue&128){R.suspense.move(P,G,ne);return}if(ue&64){A.move(R,P,G,pe);return}if(A===Dn){i(le,P,G);for(let S=0;S<ge.length;S++)me(ge[S],P,G,ne);i(R.anchor,P,G);return}if(A===Ao){b(R,P,G);return}if(ne!==2&&ue&1&&Ee)if(ne===0)Ee.beforeEnter(le),i(le,P,G),gn(()=>Ee.enter(le),te);else{const{leave:S,delayLeave:_,afterLeave:F}=Ee,O=()=>{R.ctx.isUnmounted?r(le):i(le,P,G)},U=()=>{le._isLeaving&&le[em](!0),S(le,()=>{O(),F&&F()})};_?_(le,O,U):U()}else i(le,P,G)},Te=(R,P,G,ne=!1,te=!1)=>{const{type:le,props:A,ref:Ee,children:ge,dynamicChildren:ue,shapeFlag:fe,patchFlag:S,dirs:_,cacheIndex:F}=R;if(S===-2&&(te=!1),Ee!=null&&(gi(),ws(Ee,null,G,R,!0),_i()),F!=null&&(P.renderCache[F]=void 0),fe&256){P.ctx.deactivate(R);return}const O=fe&1&&_,U=!Rs(R);let N;if(U&&(N=A&&A.onVnodeBeforeUnmount)&&Hn(N,P,R),fe&6)Ae(R.component,G,ne);else{if(fe&128){R.suspense.unmount(G,ne);return}O&&Ki(R,null,P,"beforeUnmount"),fe&64?R.type.remove(R,P,G,pe,ne):ue&&!ue.hasOnce&&(le!==Dn||S>0&&S&64)?$(ue,P,G,!1,!0):(le===Dn&&S&384||!te&&fe&16)&&$(ge,P,G),ne&&Ie(R)}(U&&(N=A&&A.onVnodeUnmounted)||O)&&gn(()=>{N&&Hn(N,P,R),O&&Ki(R,null,P,"unmounted")},G)},Ie=R=>{const{type:P,el:G,anchor:ne,transition:te}=R;if(P===Dn){Be(G,ne);return}if(P===Ao){E(R);return}const le=()=>{r(G),te&&!te.persisted&&te.afterLeave&&te.afterLeave()};if(R.shapeFlag&1&&te&&!te.persisted){const{leave:A,delayLeave:Ee}=te,ge=()=>A(G,le);Ee?Ee(R.el,le,ge):ge()}else le()},Be=(R,P)=>{let G;for(;R!==P;)G=h(R),r(R),R=G;r(P)},Ae=(R,P,G)=>{const{bum:ne,scope:te,job:le,subTree:A,um:Ee,m:ge,a:ue}=R;Eu(ge),Eu(ue),ne&&Aa(ne),te.stop(),le&&(le.flags|=8,Te(A,R,P,G)),Ee&&gn(Ee,P),gn(()=>{R.isUnmounted=!0},P)},$=(R,P,G,ne=!1,te=!1,le=0)=>{for(let A=le;A<R.length;A++)Te(R[A],P,G,ne,te)},I=R=>{if(R.shapeFlag&6)return I(R.component.subTree);if(R.shapeFlag&128)return R.suspense.next();const P=h(R.anchor||R.el),G=P&&P[Jp];return G?h(G):P};let Q=!1;const ae=(R,P,G)=>{let ne;R==null?P._vnode&&(Te(P._vnode,null,null,!0),ne=P._vnode.component):v(P._vnode||null,R,P,null,null,null,G),P._vnode=R,Q||(Q=!0,du(ne),Oh(),Q=!1)},pe={p:v,um:Te,m:me,r:Ie,mt:q,mc:k,pc:W,pbc:T,n:I,o:n};return{render:ae,hydrate:void 0,createApp:Sm(ae)}}function To({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ji({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Om(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function rd(n,e,t=!1){const i=n.children,r=e.children;if(Ye(i)&&Ye(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=Ii(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&rd(a,o)),o.type===so&&(o.patchFlag!==-1?o.el=a.el:o.__elIndex=s+(n.type===Dn?1:0)),o.type===Vi&&!o.el&&(o.el=a.el)}}function Bm(n){const e=n.slice(),t=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,n[t[o]]<c?s=o+1:a=o;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function sd(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sd(e)}function Eu(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function ad(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?ad(e.subTree):null}const od=n=>n.__isSuspense;function Vm(n,e){e&&e.pendingBranch?Ye(n)?e.effects.push(...n):e.effects.push(n):Yp(n)}const Dn=Symbol.for("v-fgt"),so=Symbol.for("v-txt"),Vi=Symbol.for("v-cmt"),Ao=Symbol.for("v-stc"),Ps=[];let xn=null;function at(n=!1){Ps.push(xn=n?null:[])}function zm(){Ps.pop(),xn=Ps[Ps.length-1]||null}let Os=1;function ka(n,e=!1){Os+=n,n<0&&xn&&e&&(xn.hasOnce=!0)}function ld(n){return n.dynamicChildren=Os>0?xn||kr:null,zm(),Os>0&&xn&&xn.push(n),n}function Mt(n,e,t,i,r,s){return ld(ce(n,e,t,i,r,s,!0))}function di(n,e,t,i,r){return ld(St(n,e,t,i,r,!0))}function Ga(n){return n?n.__v_isVNode===!0:!1}function fs(n,e){return n.type===e.type&&n.key===e.key}const cd=({key:n})=>n??null,Ra=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Pt(n)||zt(n)||$e(n)?{i:En,r:n,k:e,f:!!t}:n:null);function ce(n,e=null,t=null,i=0,r=null,s=n===Dn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&cd(e),ref:e&&Ra(e),scopeId:Vh,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:En};return o?(Bc(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Pt(t)?8:16),Os>0&&!a&&xn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&xn.push(l),l}const St=km;function km(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===hm)&&(n=Vi),Ga(n)){const o=$r(n,e,!0);return t&&Bc(o,t),Os>0&&!s&&xn&&(o.shapeFlag&6?xn[xn.indexOf(n)]=o:xn.push(o)),o.patchFlag=-2,o}if(Jm(n)&&(n=n.__vccOpts),e){e=Gm(e);let{class:o,style:l}=e;o&&!Pt(o)&&(e.class=$n(o)),xt(l)&&(Lc(l)&&!Ye(l)&&(l=$t({},l)),e.style=Qa(l))}const a=Pt(n)?1:od(n)?128:Qp(n)?64:xt(n)?4:$e(n)?2:0;return ce(n,e,t,i,r,a,s,!0)}function Gm(n){return n?Lc(n)||Jh(n)?$t({},n):n:null}function $r(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=e?Hm(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&cd(c),ref:e&&e.ref?t&&s?Ye(s)?s.concat(Ra(e)):[s,Ra(e)]:Ra(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Dn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&$r(n.ssContent),ssFallback:n.ssFallback&&$r(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Nc(u,l.clone(u)),u}function ud(n=" ",e=0){return St(so,null,n,e)}function Un(n="",e=!1){return e?(at(),di(Vi,null,n)):St(Vi,null,n)}function qn(n){return n==null||typeof n=="boolean"?St(Vi):Ye(n)?St(Dn,null,n.slice()):Ga(n)?Ii(n):St(so,null,String(n))}function Ii(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:$r(n)}function Bc(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ye(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Bc(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Jh(e)?e._ctx=En:r===3&&En&&(En.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else $e(e)?(e={default:e,_ctx:En},t=32):(e=String(e),i&64?(t=16,e=[ud(e)]):t=8);n.children=e,n.shapeFlag|=t}function Hm(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=$n([e.class,i.class]));else if(r==="style")e.style=Qa([e.style,i.style]);else if(Ka(r)){const s=e[r],a=i[r];a&&s!==a&&!(Ye(s)&&s.includes(a))&&(e[r]=s?[].concat(s,a):a)}else r!==""&&(e[r]=i[r])}return e}function Hn(n,e,t,i=null){ei(n,e,7,[t,i])}const Wm=$h();let Xm=0;function qm(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||Wm,s={uid:Xm++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new _p(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ed(i,r),emitsOptions:Kh(i,r),emit:null,emitted:null,propsDefaults:gt,inheritAttrs:i.inheritAttrs,ctx:gt,data:gt,props:gt,attrs:gt,slots:gt,refs:gt,setupState:gt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=ym.bind(null,s),n.ce&&n.ce(s),s}let tn=null;const Ym=()=>tn||En;let Ha,Sl;{const n=Ja(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};Ha=e("__VUE_INSTANCE_SETTERS__",t=>tn=t),Sl=e("__VUE_SSR_SETTERS__",t=>Bs=t)}const Ys=n=>{const e=tn;return Ha(n),n.scope.on(),()=>{n.scope.off(),Ha(e)}},yu=()=>{tn&&tn.scope.off(),Ha(null)};function fd(n){return n.vnode.shapeFlag&4}let Bs=!1;function $m(n,e=!1,t=!1){e&&Sl(e);const{props:i,children:r}=n.vnode,s=fd(n);Cm(n,i,s,e),Lm(n,r,t||e);const a=s?Km(n,e):void 0;return e&&Sl(!1),a}function Km(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,pm);const{setup:i}=t;if(i){gi();const r=n.setupContext=i.length>1?Zm(n):null,s=Ys(n),a=qs(i,n,0,[n.props,r]),o=ch(a);if(_i(),s(),(o||n.sp)&&!Rs(n)&&Hh(n),o){if(a.then(yu,yu),e)return a.then(l=>{bu(n,l)}).catch(l=>{no(l,n,0)});n.asyncDep=a}else bu(n,a)}else hd(n)}function bu(n,e,t){$e(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:xt(e)&&(n.setupState=Lh(e)),hd(n)}function hd(n,e,t){const i=n.type;n.render||(n.render=i.render||Zn);{const r=Ys(n);gi();try{mm(n)}finally{_i(),r()}}}const jm={get(n,e){return qt(n,"get",""),n[e]}};function Zm(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,jm),slots:n.slots,emit:n.emit,expose:e}}function ao(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Lh(Op(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Cs)return Cs[t](n)},has(e,t){return t in e||t in Cs}})):n.proxy}function Jm(n){return $e(n)&&"__vccOpts"in n}const un=(n,e)=>Gp(n,e,Bs);function Vs(n,e,t){try{ka(-1);const i=arguments.length;return i===2?xt(e)&&!Ye(e)?Ga(e)?St(n,null,[e]):St(n,e):St(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Ga(t)&&(t=[t]),St(n,e,t))}finally{ka(1)}}const Qm="3.5.26";let El;const Tu=typeof window<"u"&&window.trustedTypes;if(Tu)try{El=Tu.createPolicy("vue",{createHTML:n=>n})}catch{}const dd=El?n=>El.createHTML(n):n=>n,eg="http://www.w3.org/2000/svg",tg="http://www.w3.org/1998/Math/MathML",ui=typeof document<"u"?document:null,Au=ui&&ui.createElement("template"),ng={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?ui.createElementNS(eg,n):e==="mathml"?ui.createElementNS(tg,n):t?ui.createElement(n,{is:t}):ui.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>ui.createTextNode(n),createComment:n=>ui.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ui.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Au.innerHTML=dd(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Au.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},ig=Symbol("_vtc");function rg(n,e,t){const i=n[ig];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const wu=Symbol("_vod"),sg=Symbol("_vsh"),ag=Symbol(""),og=/(?:^|;)\s*display\s*:/;function lg(n,e,t){const i=n.style,r=Pt(t);let s=!1;if(t&&!r){if(e)if(Pt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&Ca(i,o,"")}else for(const a in e)t[a]==null&&Ca(i,a,"");for(const a in t)a==="display"&&(s=!0),Ca(i,a,t[a])}else if(r){if(e!==t){const a=i[ag];a&&(t+=";"+a),i.cssText=t,s=og.test(t)}}else e&&n.removeAttribute("style");wu in n&&(n[wu]=s?i.display:"",n[sg]&&(i.display="none"))}const Ru=/\s*!important$/;function Ca(n,e,t){if(Ye(t))t.forEach(i=>Ca(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=cg(n,e);Ru.test(t)?n.setProperty(Hi(i),t.replace(Ru,""),"important"):n[i]=t}}const Cu=["Webkit","Moz","ms"],wo={};function cg(n,e){const t=wo[e];if(t)return t;let i=Bi(e);if(i!=="filter"&&i in n)return wo[e]=i;i=hh(i);for(let r=0;r<Cu.length;r++){const s=Cu[r]+i;if(s in n)return wo[e]=s}return e}const Pu="http://www.w3.org/1999/xlink";function Du(n,e,t,i,r,s=gp(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Pu,e.slice(6,e.length)):n.setAttributeNS(Pu,e,t):t==null||s&&!ph(t)?n.removeAttribute(e):n.setAttribute(e,s?"":Gi(t)?String(t):t)}function Iu(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?dd(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=ph(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(r||e)}function Br(n,e,t,i){n.addEventListener(e,t,i)}function ug(n,e,t,i){n.removeEventListener(e,t,i)}const Lu=Symbol("_vei");function fg(n,e,t,i,r=null){const s=n[Lu]||(n[Lu]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=hg(e);if(i){const c=s[e]=mg(i,r);Br(n,o,c,l)}else a&&(ug(n,o,a,l),s[e]=void 0)}}const Uu=/(?:Once|Passive|Capture)$/;function hg(n){let e;if(Uu.test(n)){e={};let i;for(;i=n.match(Uu);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Hi(n.slice(2)),e]}let Ro=0;const dg=Promise.resolve(),pg=()=>Ro||(dg.then(()=>Ro=0),Ro=Date.now());function mg(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;ei(gg(i,t.value),e,5,[i])};return t.value=n,t.attached=pg(),t}function gg(n,e){if(Ye(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const Nu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,_g=(n,e,t,i,r,s)=>{const a=r==="svg";e==="class"?rg(n,i,a):e==="style"?lg(n,t,i):Ka(e)?yc(e)||fg(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):vg(n,e,i,a))?(Iu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Du(n,e,i,a,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Pt(i))?Iu(n,Bi(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Du(n,e,i,a))};function vg(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Nu(e)&&$e(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Nu(e)&&Pt(t)?!1:e in n}const Fu=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Ye(e)?t=>Aa(e,t):e};function xg(n){n.target.composing=!0}function Ou(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Co=Symbol("_assign");function Bu(n,e,t){return e&&(n=n.trim()),t&&(n=Ac(n)),n}const Lt={created(n,{modifiers:{lazy:e,trim:t,number:i}},r){n[Co]=Fu(r);const s=i||r.props&&r.props.type==="number";Br(n,e?"change":"input",a=>{a.target.composing||n[Co](Bu(n.value,t,s))}),(t||s)&&Br(n,"change",()=>{n.value=Bu(n.value,t,s)}),e||(Br(n,"compositionstart",xg),Br(n,"compositionend",Ou),Br(n,"change",Ou))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:r,number:s}},a){if(n[Co]=Fu(a),n.composing)return;const o=(s||n.type==="number")&&!/^0\d/.test(n.value)?Ac(n.value):n.value,l=e??"";o!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||r&&n.value.trim()===l)||(n.value=l))}},Mg={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Vu=(n,e)=>{const t=n._withKeys||(n._withKeys={}),i=e.join(".");return t[i]||(t[i]=(r=>{if(!("key"in r))return;const s=Hi(r.key);if(e.some(a=>a===s||Mg[a]===s))return n(r)}))},Sg=$t({patchProp:_g},ng);let zu;function Eg(){return zu||(zu=Nm(Sg))}const yg=((...n)=>{const e=Eg().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Tg(i);if(!r)return;const s=e._component;!$e(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,bg(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e});function bg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Tg(n){return Pt(n)?document.querySelector(n):n}const Vr=typeof document<"u";function pd(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function Ag(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&pd(n.default)}const lt=Object.assign;function Po(n,e){const t={};for(const i in e){const r=e[i];t[i]=zn(r)?r.map(n):n(r)}return t}const Ds=()=>{},zn=Array.isArray;function ku(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}const md=/#/g,wg=/&/g,Rg=/\//g,Cg=/=/g,Pg=/\?/g,gd=/\+/g,Dg=/%5B/g,Ig=/%5D/g,_d=/%5E/g,Lg=/%60/g,vd=/%7B/g,Ug=/%7C/g,xd=/%7D/g,Ng=/%20/g;function Vc(n){return n==null?"":encodeURI(""+n).replace(Ug,"|").replace(Dg,"[").replace(Ig,"]")}function Fg(n){return Vc(n).replace(vd,"{").replace(xd,"}").replace(_d,"^")}function yl(n){return Vc(n).replace(gd,"%2B").replace(Ng,"+").replace(md,"%23").replace(wg,"%26").replace(Lg,"`").replace(vd,"{").replace(xd,"}").replace(_d,"^")}function Og(n){return yl(n).replace(Cg,"%3D")}function Bg(n){return Vc(n).replace(md,"%23").replace(Pg,"%3F")}function Vg(n){return Bg(n).replace(Rg,"%2F")}function zs(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const zg=/\/$/,kg=n=>n.replace(zg,"");function Do(n,e,t="/"){let i,r={},s="",a="";const o=e.indexOf("#");let l=e.indexOf("?");return l=o>=0&&l>o?-1:l,l>=0&&(i=e.slice(0,l),s=e.slice(l,o>0?o:e.length),r=n(s.slice(1))),o>=0&&(i=i||e.slice(0,o),a=e.slice(o,e.length)),i=Xg(i??e,t),{fullPath:i+s+a,path:i,query:r,hash:zs(a)}}function Gg(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Gu(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function Hg(n,e,t){const i=e.matched.length-1,r=t.matched.length-1;return i>-1&&i===r&&Kr(e.matched[i],t.matched[r])&&Md(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Kr(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Md(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!Wg(n[t],e[t]))return!1;return!0}function Wg(n,e){return zn(n)?Hu(n,e):zn(e)?Hu(e,n):n?.valueOf()===e?.valueOf()}function Hu(n,e){return zn(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function Xg(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=t.length-1,a,o;for(a=0;a<i.length;a++)if(o=i[a],o!==".")if(o==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+i.slice(a).join("/")}const yi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let bl=(function(n){return n.pop="pop",n.push="push",n})({}),Io=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function qg(n){if(!n)if(Vr){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),kg(n)}const Yg=/^[^#]+#/;function $g(n,e){return n.replace(Yg,"#")+e}function Kg(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const oo=()=>({left:window.scrollX,top:window.scrollY});function jg(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=Kg(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Wu(n,e){return(history.state?history.state.position-e:-1)+n}const Tl=new Map;function Zg(n,e){Tl.set(n,e)}function Jg(n){const e=Tl.get(n);return Tl.delete(n),e}function Qg(n){return typeof n=="string"||n&&typeof n=="object"}function Sd(n){return typeof n=="string"||typeof n=="symbol"}let bt=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Ed=Symbol("");bt.MATCHER_NOT_FOUND+"",bt.NAVIGATION_GUARD_REDIRECT+"",bt.NAVIGATION_ABORTED+"",bt.NAVIGATION_CANCELLED+"",bt.NAVIGATION_DUPLICATED+"";function jr(n,e){return lt(new Error,{type:n,[Ed]:!0},e)}function ri(n,e){return n instanceof Error&&Ed in n&&(e==null||!!(n.type&e))}const e0=["params","query","hash"];function t0(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of e0)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function n0(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<t.length;++i){const r=t[i].replace(gd," "),s=r.indexOf("="),a=zs(s<0?r:r.slice(0,s)),o=s<0?null:zs(r.slice(s+1));if(a in e){let l=e[a];zn(l)||(l=e[a]=[l]),l.push(o)}else e[a]=o}return e}function Xu(n){let e="";for(let t in n){const i=n[t];if(t=Og(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(zn(i)?i.map(r=>r&&yl(r)):[i&&yl(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function i0(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=zn(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const r0=Symbol(""),qu=Symbol(""),lo=Symbol(""),zc=Symbol(""),Al=Symbol("");function hs(){let n=[];function e(i){return n.push(i),()=>{const r=n.indexOf(i);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Li(n,e,t,i,r,s=a=>a()){const a=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((o,l)=>{const c=h=>{h===!1?l(jr(bt.NAVIGATION_ABORTED,{from:t,to:e})):h instanceof Error?l(h):Qg(h)?l(jr(bt.NAVIGATION_GUARD_REDIRECT,{from:e,to:h})):(a&&i.enterCallbacks[r]===a&&typeof h=="function"&&a.push(h),o())},u=s(()=>n.call(i&&i.instances[r],e,t,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function Lo(n,e,t,i,r=s=>s()){const s=[];for(const a of n)for(const o in a.components){let l=a.components[o];if(!(e!=="beforeRouteEnter"&&!a.instances[o]))if(pd(l)){const c=(l.__vccOpts||l)[e];c&&s.push(Li(c,t,i,a,o,r))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${o}" at "${a.path}"`);const f=Ag(u)?u.default:u;a.mods[o]=u,a.components[o]=f;const h=(f.__vccOpts||f)[e];return h&&Li(h,t,i,a,o,r)()}))}}return s}function s0(n,e){const t=[],i=[],r=[],s=Math.max(e.matched.length,n.matched.length);for(let a=0;a<s;a++){const o=e.matched[a];o&&(n.matched.find(c=>Kr(c,o))?i.push(o):t.push(o));const l=n.matched[a];l&&(e.matched.find(c=>Kr(c,l))||r.push(l))}return[t,i,r]}let a0=()=>location.protocol+"//"+location.host;function yd(n,e){const{pathname:t,search:i,hash:r}=e,s=n.indexOf("#");if(s>-1){let a=r.includes(n.slice(s))?n.slice(s).length:1,o=r.slice(a);return o[0]!=="/"&&(o="/"+o),Gu(o,"")}return Gu(t,n)+i+r}function o0(n,e,t,i){let r=[],s=[],a=null;const o=({state:h})=>{const d=yd(n,location),g=t.value,v=e.value;let m=0;if(h){if(t.value=d,e.value=h,a&&a===g){a=null;return}m=v?h.position-v.position:0}else i(d);r.forEach(p=>{p(t.value,g,{delta:m,type:bl.pop,direction:m?m>0?Io.forward:Io.back:Io.unknown})})};function l(){a=t.value}function c(h){r.push(h);const d=()=>{const g=r.indexOf(h);g>-1&&r.splice(g,1)};return s.push(d),d}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(lt({},h.state,{scroll:oo()}),"")}}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",o),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",o),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function Yu(n,e,t,i=!1,r=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:r?oo():null}}function l0(n){const{history:e,location:t}=window,i={value:yd(n,t)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=n.indexOf("#"),h=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:a0()+n+l;try{e[u?"replaceState":"pushState"](c,"",h),r.value=c}catch(d){console.error(d),t[u?"replace":"assign"](h)}}function a(l,c){s(l,lt({},e.state,Yu(r.value.back,l,r.value.forward,!0),c,{position:r.value.position}),!0),i.value=l}function o(l,c){const u=lt({},r.value,e.state,{forward:l,scroll:oo()});s(u.current,u,!0),s(l,lt({},Yu(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:r,push:o,replace:a}}function c0(n){n=qg(n);const e=l0(n),t=o0(n,e.state,e.location,e.replace);function i(s,a=!0){a||t.pauseListeners(),history.go(s)}const r=lt({location:"",base:n,go:i,createHref:$g.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let or=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ut=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ut||{});const u0={type:or.Static,value:""},f0=/[a-zA-Z0-9_]/;function h0(n){if(!n)return[[]];if(n==="/")return[[u0]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(d){throw new Error(`ERR (${t})/"${c}": ${d}`)}let t=Ut.Static,i=t;const r=[];let s;function a(){s&&r.push(s),s=[]}let o=0,l,c="",u="";function f(){c&&(t===Ut.Static?s.push({type:or.Static,value:c}):t===Ut.Param||t===Ut.ParamRegExp||t===Ut.ParamRegExpEnd?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:or.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;o<n.length;){if(l=n[o++],l==="\\"&&t!==Ut.ParamRegExp){i=t,t=Ut.EscapeNext;continue}switch(t){case Ut.Static:l==="/"?(c&&f(),a()):l===":"?(f(),t=Ut.Param):h();break;case Ut.EscapeNext:h(),t=i;break;case Ut.Param:l==="("?t=Ut.ParamRegExp:f0.test(l)?h():(f(),t=Ut.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--);break;case Ut.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=Ut.ParamRegExpEnd:u+=l;break;case Ut.ParamRegExpEnd:f(),t=Ut.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--,u="";break;default:e("Unknown state");break}}return t===Ut.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),f(),a(),r}const $u="[^/]+?",d0={sensitive:!1,strict:!1,start:!0,end:!0};var Qt=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Qt||{});const p0=/[.+*?^${}()[\]/\\]/g;function m0(n,e){const t=lt({},d0,e),i=[];let r=t.start?"^":"";const s=[];for(const c of n){const u=c.length?[]:[Qt.Root];t.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=Qt.Segment+(t.sensitive?Qt.BonusCaseSensitive:0);if(h.type===or.Static)f||(r+="/"),r+=h.value.replace(p0,"\\$&"),d+=Qt.Static;else if(h.type===or.Param){const{value:g,repeatable:v,optional:m,regexp:p}=h;s.push({name:g,repeatable:v,optional:m});const M=p||$u;if(M!==$u){d+=Qt.BonusCustomRegExp;try{`${M}`}catch(E){throw new Error(`Invalid custom RegExp for param "${g}" (${M}): `+E.message)}}let b=v?`((?:${M})(?:/(?:${M}))*)`:`(${M})`;f||(b=m&&c.length<2?`(?:/${b})`:"/"+b),m&&(b+="?"),r+=b,d+=Qt.Dynamic,m&&(d+=Qt.BonusOptional),v&&(d+=Qt.BonusRepeatable),M===".*"&&(d+=Qt.BonusWildcard)}u.push(d)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=Qt.BonusStrict}t.strict||(r+="/?"),t.end?r+="$":t.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const a=new RegExp(r,t.sensitive?"":"i");function o(c){const u=c.match(a),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=s[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===or.Static)u+=d.value;else if(d.type===or.Param){const{value:g,repeatable:v,optional:m}=d,p=g in c?c[g]:"";if(zn(p)&&!v)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const M=zn(p)?p.join("/"):p;if(!M)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=M}}return u||"/"}return{re:a,score:i,keys:s,parse:o,stringify:l}}function g0(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===Qt.Static+Qt.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Qt.Static+Qt.Segment?1:-1:0}function bd(n,e){let t=0;const i=n.score,r=e.score;for(;t<i.length&&t<r.length;){const s=g0(i[t],r[t]);if(s)return s;t++}if(Math.abs(r.length-i.length)===1){if(Ku(i))return 1;if(Ku(r))return-1}return r.length-i.length}function Ku(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const _0={strict:!1,end:!0,sensitive:!1};function v0(n,e,t){const i=m0(h0(n.path),t),r=lt(i,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function x0(n,e){const t=[],i=new Map;e=ku(_0,e);function r(f){return i.get(f)}function s(f,h,d){const g=!d,v=Zu(f);v.aliasOf=d&&d.record;const m=ku(e,f),p=[v];if("alias"in f){const E=typeof f.alias=="string"?[f.alias]:f.alias;for(const w of E)p.push(Zu(lt({},v,{components:d?d.record.components:v.components,path:w,aliasOf:d?d.record:v})))}let M,b;for(const E of p){const{path:w}=E;if(h&&w[0]!=="/"){const D=h.record.path,C=D[D.length-1]==="/"?"":"/";E.path=h.record.path+(w&&C+w)}if(M=v0(E,h,m),d?d.alias.push(M):(b=b||M,b!==M&&b.alias.push(M),g&&f.name&&!Ju(M)&&a(f.name)),Td(M)&&l(M),v.children){const D=v.children;for(let C=0;C<D.length;C++)s(D[C],M,d&&d.children[C])}d=d||M}return b?()=>{a(b)}:Ds}function a(f){if(Sd(f)){const h=i.get(f);h&&(i.delete(f),t.splice(t.indexOf(h),1),h.children.forEach(a),h.alias.forEach(a))}else{const h=t.indexOf(f);h>-1&&(t.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(a),f.alias.forEach(a))}}function o(){return t}function l(f){const h=E0(f,t);t.splice(h,0,f),f.record.name&&!Ju(f)&&i.set(f.record.name,f)}function c(f,h){let d,g={},v,m;if("name"in f&&f.name){if(d=i.get(f.name),!d)throw jr(bt.MATCHER_NOT_FOUND,{location:f});m=d.record.name,g=lt(ju(h.params,d.keys.filter(b=>!b.optional).concat(d.parent?d.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),f.params&&ju(f.params,d.keys.map(b=>b.name))),v=d.stringify(g)}else if(f.path!=null)v=f.path,d=t.find(b=>b.re.test(v)),d&&(g=d.parse(v),m=d.record.name);else{if(d=h.name?i.get(h.name):t.find(b=>b.re.test(h.path)),!d)throw jr(bt.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=d.record.name,g=lt({},h.params,f.params),v=d.stringify(g)}const p=[];let M=d;for(;M;)p.unshift(M.record),M=M.parent;return{name:m,path:v,params:g,matched:p,meta:S0(p)}}n.forEach(f=>s(f));function u(){t.length=0,i.clear()}return{addRoute:s,resolve:c,removeRoute:a,clearRoutes:u,getRoutes:o,getRecordMatcher:r}}function ju(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function Zu(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:M0(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function M0(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function Ju(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function S0(n){return n.reduce((e,t)=>lt(e,t.meta),{})}function E0(n,e){let t=0,i=e.length;for(;t!==i;){const s=t+i>>1;bd(n,e[s])<0?i=s:t=s+1}const r=y0(n);return r&&(i=e.lastIndexOf(r,i-1)),i}function y0(n){let e=n;for(;e=e.parent;)if(Td(e)&&bd(n,e)===0)return e}function Td({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Qu(n){const e=Bn(lo),t=Bn(zc),i=un(()=>{const l=ot(n.to);return e.resolve(l)}),r=un(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const h=f.findIndex(Kr.bind(null,u));if(h>-1)return h;const d=ef(l[c-2]);return c>1&&ef(u)===d&&f[f.length-1].path!==d?f.findIndex(Kr.bind(null,l[c-2])):h}),s=un(()=>r.value>-1&&R0(t.params,i.value.params)),a=un(()=>r.value>-1&&r.value===t.matched.length-1&&Md(t.params,i.value.params));function o(l={}){if(w0(l)){const c=e[ot(n.replace)?"replace":"push"](ot(n.to)).catch(Ds);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:un(()=>i.value.href),isActive:s,isExactActive:a,navigate:o}}function b0(n){return n.length===1?n[0]:n}const T0=Gh({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Qu,setup(n,{slots:e}){const t=to(Qu(n)),{options:i}=Bn(lo),r=un(()=>({[tf(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[tf(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&b0(e.default(t));return n.custom?s:Vs("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},s)}}}),A0=T0;function w0(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function R0(n,e){for(const t in e){const i=e[t],r=n[t];if(typeof i=="string"){if(i!==r)return!1}else if(!zn(r)||r.length!==i.length||i.some((s,a)=>s.valueOf()!==r[a].valueOf()))return!1}return!0}function ef(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const tf=(n,e,t)=>n??e??t,C0=Gh({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=Bn(Al),r=un(()=>n.route||i.value),s=Bn(qu,0),a=un(()=>{let c=ot(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),o=un(()=>r.value.matched[a.value]);wa(qu,un(()=>a.value+1)),wa(r0,o),wa(Al,r);const l=Ke();return bn(()=>[l.value,o.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!Kr(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(v=>v(c))},{flush:"post"}),()=>{const c=r.value,u=n.name,f=o.value,h=f&&f.components[u];if(!h)return nf(t.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=Vs(h,lt({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return nf(t.default,{Component:m,route:c})||m}}});function nf(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const P0=C0;function D0(n){const e=x0(n.routes,n),t=n.parseQuery||n0,i=n.stringifyQuery||Xu,r=n.history,s=hs(),a=hs(),o=hs(),l=Bp(yi);let c=yi;Vr&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Po.bind(null,I=>""+I),f=Po.bind(null,Vg),h=Po.bind(null,zs);function d(I,Q){let ae,pe;return Sd(I)?(ae=e.getRecordMatcher(I),pe=Q):pe=I,e.addRoute(pe,ae)}function g(I){const Q=e.getRecordMatcher(I);Q&&e.removeRoute(Q)}function v(){return e.getRoutes().map(I=>I.record)}function m(I){return!!e.getRecordMatcher(I)}function p(I,Q){if(Q=lt({},Q||l.value),typeof I=="string"){const G=Do(t,I,Q.path),ne=e.resolve({path:G.path},Q),te=r.createHref(G.fullPath);return lt(G,ne,{params:h(ne.params),hash:zs(G.hash),redirectedFrom:void 0,href:te})}let ae;if(I.path!=null)ae=lt({},I,{path:Do(t,I.path,Q.path).path});else{const G=lt({},I.params);for(const ne in G)G[ne]==null&&delete G[ne];ae=lt({},I,{params:f(G)}),Q.params=f(Q.params)}const pe=e.resolve(ae,Q),De=I.hash||"";pe.params=u(h(pe.params));const R=Gg(i,lt({},I,{hash:Fg(De),path:pe.path})),P=r.createHref(R);return lt({fullPath:R,hash:De,query:i===Xu?i0(I.query):I.query||{}},pe,{redirectedFrom:void 0,href:P})}function M(I){return typeof I=="string"?Do(t,I,l.value.path):lt({},I)}function b(I,Q){if(c!==I)return jr(bt.NAVIGATION_CANCELLED,{from:Q,to:I})}function E(I){return C(I)}function w(I){return E(lt(M(I),{replace:!0}))}function D(I,Q){const ae=I.matched[I.matched.length-1];if(ae&&ae.redirect){const{redirect:pe}=ae;let De=typeof pe=="function"?pe(I,Q):pe;return typeof De=="string"&&(De=De.includes("?")||De.includes("#")?De=M(De):{path:De},De.params={}),lt({query:I.query,hash:I.hash,params:De.path!=null?{}:I.params},De)}}function C(I,Q){const ae=c=p(I),pe=l.value,De=I.state,R=I.force,P=I.replace===!0,G=D(ae,pe);if(G)return C(lt(M(G),{state:typeof G=="object"?lt({},De,G.state):De,force:R,replace:P}),Q||ae);const ne=ae;ne.redirectedFrom=Q;let te;return!R&&Hg(i,pe,ae)&&(te=jr(bt.NAVIGATION_DUPLICATED,{to:ne,from:pe}),me(pe,pe,!0,!1)),(te?Promise.resolve(te):T(ne,pe)).catch(le=>ri(le)?ri(le,bt.NAVIGATION_GUARD_REDIRECT)?le:oe(le):W(le,ne,pe)).then(le=>{if(le){if(ri(le,bt.NAVIGATION_GUARD_REDIRECT))return C(lt({replace:P},M(le.to),{state:typeof le.to=="object"?lt({},De,le.to.state):De,force:R}),Q||ne)}else le=j(ne,pe,!0,P,De);return V(ne,pe,le),le})}function k(I,Q){const ae=b(I,Q);return ae?Promise.reject(ae):Promise.resolve()}function x(I){const Q=Be.values().next().value;return Q&&typeof Q.runWithContext=="function"?Q.runWithContext(I):I()}function T(I,Q){let ae;const[pe,De,R]=s0(I,Q);ae=Lo(pe.reverse(),"beforeRouteLeave",I,Q);for(const G of pe)G.leaveGuards.forEach(ne=>{ae.push(Li(ne,I,Q))});const P=k.bind(null,I,Q);return ae.push(P),$(ae).then(()=>{ae=[];for(const G of s.list())ae.push(Li(G,I,Q));return ae.push(P),$(ae)}).then(()=>{ae=Lo(De,"beforeRouteUpdate",I,Q);for(const G of De)G.updateGuards.forEach(ne=>{ae.push(Li(ne,I,Q))});return ae.push(P),$(ae)}).then(()=>{ae=[];for(const G of R)if(G.beforeEnter)if(zn(G.beforeEnter))for(const ne of G.beforeEnter)ae.push(Li(ne,I,Q));else ae.push(Li(G.beforeEnter,I,Q));return ae.push(P),$(ae)}).then(()=>(I.matched.forEach(G=>G.enterCallbacks={}),ae=Lo(R,"beforeRouteEnter",I,Q,x),ae.push(P),$(ae))).then(()=>{ae=[];for(const G of a.list())ae.push(Li(G,I,Q));return ae.push(P),$(ae)}).catch(G=>ri(G,bt.NAVIGATION_CANCELLED)?G:Promise.reject(G))}function V(I,Q,ae){o.list().forEach(pe=>x(()=>pe(I,Q,ae)))}function j(I,Q,ae,pe,De){const R=b(I,Q);if(R)return R;const P=Q===yi,G=Vr?history.state:{};ae&&(pe||P?r.replace(I.fullPath,lt({scroll:P&&G&&G.scroll},De)):r.push(I.fullPath,De)),l.value=I,me(I,Q,ae,P),oe()}let Y;function q(){Y||(Y=r.listen((I,Q,ae)=>{if(!Ae.listening)return;const pe=p(I),De=D(pe,Ae.currentRoute.value);if(De){C(lt(De,{replace:!0,force:!0}),pe).catch(Ds);return}c=pe;const R=l.value;Vr&&Zg(Wu(R.fullPath,ae.delta),oo()),T(pe,R).catch(P=>ri(P,bt.NAVIGATION_ABORTED|bt.NAVIGATION_CANCELLED)?P:ri(P,bt.NAVIGATION_GUARD_REDIRECT)?(C(lt(M(P.to),{force:!0}),pe).then(G=>{ri(G,bt.NAVIGATION_ABORTED|bt.NAVIGATION_DUPLICATED)&&!ae.delta&&ae.type===bl.pop&&r.go(-1,!1)}).catch(Ds),Promise.reject()):(ae.delta&&r.go(-ae.delta,!1),W(P,pe,R))).then(P=>{P=P||j(pe,R,!1),P&&(ae.delta&&!ri(P,bt.NAVIGATION_CANCELLED)?r.go(-ae.delta,!1):ae.type===bl.pop&&ri(P,bt.NAVIGATION_ABORTED|bt.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),V(pe,R,P)}).catch(Ds)}))}let L=hs(),H=hs(),B;function W(I,Q,ae){oe(I);const pe=H.list();return pe.length?pe.forEach(De=>De(I,Q,ae)):console.error(I),Promise.reject(I)}function se(){return B&&l.value!==yi?Promise.resolve():new Promise((I,Q)=>{L.add([I,Q])})}function oe(I){return B||(B=!I,q(),L.list().forEach(([Q,ae])=>I?ae(I):Q()),L.reset()),I}function me(I,Q,ae,pe){const{scrollBehavior:De}=n;if(!Vr||!De)return Promise.resolve();const R=!ae&&Jg(Wu(I.fullPath,0))||(pe||!ae)&&history.state&&history.state.scroll||null;return Nh().then(()=>De(I,Q,R)).then(P=>P&&jg(P)).catch(P=>W(P,I,Q))}const Te=I=>r.go(I);let Ie;const Be=new Set,Ae={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:v,resolve:p,options:n,push:E,replace:w,go:Te,back:()=>Te(-1),forward:()=>Te(1),beforeEach:s.add,beforeResolve:a.add,afterEach:o.add,onError:H.add,isReady:se,install(I){I.component("RouterLink",A0),I.component("RouterView",P0),I.config.globalProperties.$router=Ae,Object.defineProperty(I.config.globalProperties,"$route",{enumerable:!0,get:()=>ot(l)}),Vr&&!Ie&&l.value===yi&&(Ie=!0,E(r.location).catch(pe=>{}));const Q={};for(const pe in yi)Object.defineProperty(Q,pe,{get:()=>l.value[pe],enumerable:!0});I.provide(lo,Ae),I.provide(zc,Dh(Q)),I.provide(Al,l);const ae=I.unmount;Be.add(I),I.unmount=function(){Be.delete(I),Be.size<1&&(c=yi,Y&&Y(),Y=null,l.value=yi,Ie=!1,B=!1),ae()}}};function $(I){return I.reduce((Q,ae)=>Q.then(()=>x(ae)),Promise.resolve())}return Ae}function Ad(){return Bn(lo)}function I0(n){return Bn(zc)}const rf=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),L0=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase()),U0=n=>{const e=L0(n);return e.charAt(0).toUpperCase()+e.slice(1)},N0=(...n)=>n.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim(),sf=n=>n==="";var ds={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const F0=({name:n,iconNode:e,absoluteStrokeWidth:t,"absolute-stroke-width":i,strokeWidth:r,"stroke-width":s,size:a=ds.width,color:o=ds.stroke,...l},{slots:c})=>Vs("svg",{...ds,...l,width:a,height:a,stroke:o,"stroke-width":sf(t)||sf(i)||t===!0||i===!0?Number(r||s||ds["stroke-width"])*24/Number(a):r||s||ds["stroke-width"],class:N0("lucide",l.class,...n?[`lucide-${rf(U0(n))}-icon`,`lucide-${rf(n)}`]:["lucide-icon"])},[...e.map(u=>Vs(...u)),...c.default?[c.default()]:[]]);const Wi=(n,e)=>(t,{slots:i,attrs:r})=>Vs(F0,{...r,...t,iconNode:e,name:n},i);const O0=Wi("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);const B0=Wi("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);const V0=Wi("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);const z0=Wi("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]);const k0=Wi("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);const af=Wi("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);const G0=Wi("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);const H0=Wi("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Xi=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},W0={class:"navbar"},X0={__name:"Navbar",props:{currentPage:String,isDark:Boolean},emits:["toggle-theme","set-page"],setup(n,{emit:e}){const t=e,i=s=>{t("set-page",s)},r=()=>{t("toggle-theme")};return(s,a)=>(at(),Mt("header",W0,[ce("nav",null,[ce("button",{onClick:a[0]||(a[0]=o=>i(1)),class:$n([{active:n.currentPage==="Shop"},"nav-button"])}," Explore ",2),ce("button",{onClick:a[1]||(a[1]=o=>i(2)),class:$n([{active:n.currentPage==="Create"},"nav-button"])}," Live View ",2),ce("button",{onClick:a[2]||(a[2]=o=>i(3)),class:$n([{active:n.currentPage==="Registro"},"nav-button"])}," Registro ",2),ce("button",{onClick:a[3]||(a[3]=o=>i(4)),class:$n([{active:n.currentPage==="Cenario"},"nav-button"])}," Cenário ",2)]),ce("button",{onClick:r,class:"theme-toggle"},[n.isDark?(at(),di(ot(G0),{key:0,size:20})):(at(),di(ot(z0),{key:1,size:20}))])]))}},q0=Xi(X0,[["__scopeId","data-v-472fcb27"]]),kc="theme-preference",mr=Ke(!1),of=()=>{const n=localStorage.getItem(kc);if(n)mr.value=n==="dark";else{const e=window.matchMedia("(prefers-color-scheme: dark)").matches;mr.value=e}},Y0=n=>{localStorage.setItem(kc,n)},$0=()=>{mr.value=!mr.value};bn(mr,n=>{Y0(n?"dark":"light")},{immediate:!1});const K0=()=>(!mr.value&&localStorage.getItem(kc)!=="light"&&of(),{isDark:mr,toggleTheme:$0,loadTheme:of});const Gc="182",j0=0,lf=1,Z0=2,Pa=1,ks=2,Es=3,zi=0,fn=1,In=2,pi=0,Xr=1,cf=2,uf=3,ff=4,J0=5,sr=100,Q0=101,e_=102,t_=103,n_=104,i_=200,r_=201,s_=202,a_=203,wl=204,Rl=205,o_=206,l_=207,c_=208,u_=209,f_=210,h_=211,d_=212,p_=213,m_=214,Cl=0,Pl=1,Dl=2,Zr=3,Il=4,Ll=5,Ul=6,Nl=7,Hc=0,g_=1,__=2,Jn=0,wd=1,Rd=2,Cd=3,Wc=4,Pd=5,Dd=6,Id=7,Ld=300,gr=301,Jr=302,Fl=303,Ol=304,co=306,Bl=1e3,Nn=1001,Vl=1002,Vt=1003,v_=1004,sa=1005,Bt=1006,Uo=1007,lr=1008,vn=1009,Ud=1010,Nd=1011,Gs=1012,Xc=1013,ti=1014,Kn=1015,xi=1016,qc=1017,Yc=1018,Hs=1020,Fd=35902,Od=35899,Bd=1021,Vd=1022,Fn=1023,Mi=1026,cr=1027,zd=1028,$c=1029,Qr=1030,Kc=1031,jc=1033,Da=33776,Ia=33777,La=33778,Ua=33779,zl=35840,kl=35841,Gl=35842,Hl=35843,Wl=36196,Xl=37492,ql=37496,Yl=37488,$l=37489,Kl=37490,jl=37491,Zl=37808,Jl=37809,Ql=37810,ec=37811,tc=37812,nc=37813,ic=37814,rc=37815,sc=37816,ac=37817,oc=37818,lc=37819,cc=37820,uc=37821,fc=36492,hc=36494,dc=36495,pc=36283,mc=36284,gc=36285,_c=36286,x_=3200,Zc=0,M_=1,Ui="",_n="srgb",es="srgb-linear",Wa="linear",ht="srgb",yr=7680,hf=519,S_=512,E_=513,y_=514,Jc=515,b_=516,T_=517,Qc=518,A_=519,df=35044,pf="300 es",jn=2e3,Xa=2001;function kd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function qa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function w_(){const n=qa("canvas");return n.style.display="block",n}const mf={};function gf(...n){const e="THREE."+n.shift();console.log(e,...n)}function qe(...n){const e="THREE."+n.shift();console.warn(e,...n)}function st(...n){const e="THREE."+n.shift();console.error(e,...n)}function Ws(...n){const e=n.join(" ");e in mf||(mf[e]=!0,qe(...n))}function R_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class is{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],No=Math.PI/180,vc=180/Math.PI;function $s(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function C_(n,e){return(n%e+e)%e}function Fo(n,e,t){return(1-t)*n+t*e}function ps(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function an(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class it{constructor(e=0,t=0){it.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ks{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],d=s[a+1],g=s[a+2],v=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o>=1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=v;return}if(f!==v||l!==h||c!==d||u!==g){let m=l*h+c*d+u*g+f*v;m<0&&(h=-h,d=-d,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const M=Math.acos(m),b=Math.sin(M);p=Math.sin(p*M)/b,o=Math.sin(o*M)/b,l=l*p+h*o,c=c*p+d*o,u=u*p+g*o,f=f*p+v*o}else{l=l*p+h*o,c=c*p+d*o,u=u*p+g*o,f=f*p+v*o;const M=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=M,c*=M,u*=M,f*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-o*d,e[t+2]=c*g+u*d+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),d=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,t=0,i=0){K.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_f.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oo.copy(this).projectOnVector(e),this.sub(Oo)}reflect(e){return this.sub(Oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oo=new K,_f=new Ks;class je{constructor(e,t,i,r,s,a,o,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],v=r[0],m=r[3],p=r[6],M=r[1],b=r[4],E=r[7],w=r[2],D=r[5],C=r[8];return s[0]=a*v+o*M+l*w,s[3]=a*m+o*b+l*D,s[6]=a*p+o*E+l*C,s[1]=c*v+u*M+f*w,s[4]=c*m+u*b+f*D,s[7]=c*p+u*E+f*C,s[2]=h*v+d*M+g*w,s[5]=h*m+d*b+g*D,s[8]=h*p+d*E+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,g=t*f+i*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(r*c-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bo.makeScale(e,t)),this}rotate(e){return this.premultiply(Bo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Bo=new je,vf=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xf=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function P_(){const n={enabled:!0,workingColorSpace:es,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ht&&(r.r=mi(r.r),r.g=mi(r.g),r.b=mi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(r.r=qr(r.r),r.g=qr(r.g),r.b=qr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ui?Wa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ws("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ws("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[es]:{primaries:e,whitePoint:i,transfer:Wa,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const nt=P_();function mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let br;class D_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{br===void 0&&(br=qa("canvas")),br.width=e.width,br.height=e.height;const r=br.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=br}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=mi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(mi(t[i]/255)*255):t[i]=mi(t[i]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let I_=0;class eu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:I_++}),this.uuid=$s(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Vo(r[a].image)):s.push(Vo(r[a]))}else s=Vo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?D_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let L_=0;const zo=new K;class Yt extends is{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,i=Nn,r=Nn,s=Bt,a=lr,o=Fn,l=vn,c=Yt.DEFAULT_ANISOTROPY,u=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:L_++}),this.uuid=$s(),this.name="",this.source=new eu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(zo).x}get height(){return this.source.getSize(zo).y}get depth(){return this.source.getSize(zo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ld)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bl:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Vl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bl:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Vl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Ld;Yt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,E=(d+1)/2,w=(p+1)/2,D=(u+h)/4,C=(f+v)/4,k=(g+m)/4;return b>E&&b>w?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=D/i,s=C/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=D/r,s=k/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=C/s,r=k/s),this.set(i,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-v)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class U_ extends is{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Yt(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new eu(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends U_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gd extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class N_ extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _r{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Rn):Rn.fromBufferAttribute(s,a),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),aa.copy(i.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ms),oa.subVectors(this.max,ms),Tr.subVectors(e.a,ms),Ar.subVectors(e.b,ms),wr.subVectors(e.c,ms),bi.subVectors(Ar,Tr),Ti.subVectors(wr,Ar),Zi.subVectors(Tr,wr);let t=[0,-bi.z,bi.y,0,-Ti.z,Ti.y,0,-Zi.z,Zi.y,bi.z,0,-bi.x,Ti.z,0,-Ti.x,Zi.z,0,-Zi.x,-bi.y,bi.x,0,-Ti.y,Ti.x,0,-Zi.y,Zi.x,0];return!ko(t,Tr,Ar,wr,oa)||(t=[1,0,0,0,1,0,0,0,1],!ko(t,Tr,Ar,wr,oa))?!1:(la.crossVectors(bi,Ti),t=[la.x,la.y,la.z],ko(t,Tr,Ar,wr,oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const si=[new K,new K,new K,new K,new K,new K,new K,new K],Rn=new K,aa=new _r,Tr=new K,Ar=new K,wr=new K,bi=new K,Ti=new K,Zi=new K,ms=new K,oa=new K,la=new K,Ji=new K;function ko(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ji.fromArray(n,s);const o=r.x*Math.abs(Ji.x)+r.y*Math.abs(Ji.y)+r.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),u=i.dot(Ji);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const F_=new _r,gs=new K,Go=new K;class tu{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):F_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gs.subVectors(e,this.center);const t=gs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(gs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Go.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gs.copy(e.center).add(Go)),this.expandByPoint(gs.copy(e.center).sub(Go))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ai=new K,Ho=new K,ca=new K,Ai=new K,Wo=new K,ua=new K,Xo=new K;class O_{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ho.copy(e).add(t).multiplyScalar(.5),ca.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Ho);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ca),o=Ai.dot(this.direction),l=-Ai.dot(ca),c=Ai.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*l-o,h=a*o-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ho).addScaledVector(ca,h),d}intersectSphere(e,t){ai.subVectors(e.center,this.origin);const i=ai.dot(this.direction),r=ai.dot(ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,i,r,s){Wo.subVectors(t,e),ua.subVectors(i,e),Xo.crossVectors(Wo,ua);let a=this.direction.dot(Xo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);const l=o*this.direction.dot(ua.crossVectors(Ai,ua));if(l<0)return null;const c=o*this.direction.dot(Wo.cross(Ai));if(c<0||l+c>a)return null;const u=-o*Ai.dot(Xo);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wt{constructor(e,t,i,r,s,a,o,l,c,u,f,h,d,g,v,m){wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,d,g,v,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,d,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Rr.setFromMatrixColumn(e,0).length(),s=1/Rr.setFromMatrixColumn(e,1).length(),a=1/Rr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,g=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,v=c*f;t[0]=h+v*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=o*u,v=o*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-v*f}else if(e.order==="XZY"){const h=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(B_,e,V_)}lookAt(e,t,i){const r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),wi.crossVectors(i,pn),wi.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),wi.crossVectors(i,pn)),wi.normalize(),fa.crossVectors(pn,wi),r[0]=wi.x,r[4]=fa.x,r[8]=pn.x,r[1]=wi.y,r[5]=fa.y,r[9]=pn.y,r[2]=wi.z,r[6]=fa.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],b=i[7],E=i[11],w=i[15],D=r[0],C=r[4],k=r[8],x=r[12],T=r[1],V=r[5],j=r[9],Y=r[13],q=r[2],L=r[6],H=r[10],B=r[14],W=r[3],se=r[7],oe=r[11],me=r[15];return s[0]=a*D+o*T+l*q+c*W,s[4]=a*C+o*V+l*L+c*se,s[8]=a*k+o*j+l*H+c*oe,s[12]=a*x+o*Y+l*B+c*me,s[1]=u*D+f*T+h*q+d*W,s[5]=u*C+f*V+h*L+d*se,s[9]=u*k+f*j+h*H+d*oe,s[13]=u*x+f*Y+h*B+d*me,s[2]=g*D+v*T+m*q+p*W,s[6]=g*C+v*V+m*L+p*se,s[10]=g*k+v*j+m*H+p*oe,s[14]=g*x+v*Y+m*B+p*me,s[3]=M*D+b*T+E*q+w*W,s[7]=M*C+b*V+E*L+w*se,s[11]=M*k+b*j+E*H+w*oe,s[15]=M*x+b*Y+E*B+w*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],v=e[7],m=e[11],p=e[15],M=l*d-c*h,b=o*d-c*f,E=o*h-l*f,w=a*d-c*u,D=a*h-l*u,C=a*f-o*u;return t*(v*M-m*b+p*E)-i*(g*M-m*w+p*D)+r*(g*b-v*w+p*C)-s*(g*E-v*D+m*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],v=e[13],m=e[14],p=e[15],M=f*m*c-v*h*c+v*l*d-o*m*d-f*l*p+o*h*p,b=g*h*c-u*m*c-g*l*d+a*m*d+u*l*p-a*h*p,E=u*v*c-g*f*c+g*o*d-a*v*d-u*o*p+a*f*p,w=g*f*l-u*v*l-g*o*h+a*v*h+u*o*m-a*f*m,D=t*M+i*b+r*E+s*w;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/D;return e[0]=M*C,e[1]=(v*h*s-f*m*s-v*r*d+i*m*d+f*r*p-i*h*p)*C,e[2]=(o*m*s-v*l*s+v*r*c-i*m*c-o*r*p+i*l*p)*C,e[3]=(f*l*s-o*h*s-f*r*c+i*h*c+o*r*d-i*l*d)*C,e[4]=b*C,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*C,e[6]=(g*l*s-a*m*s-g*r*c+t*m*c+a*r*p-t*l*p)*C,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*d+t*l*d)*C,e[8]=E*C,e[9]=(g*f*s-u*v*s-g*i*d+t*v*d+u*i*p-t*f*p)*C,e[10]=(a*v*s-g*o*s+g*i*c-t*v*c-a*i*p+t*o*p)*C,e[11]=(u*o*s-a*f*s-u*i*c+t*f*c+a*i*d-t*o*d)*C,e[12]=w*C,e[13]=(u*v*r-g*f*r+g*i*h-t*v*h-u*i*m+t*f*m)*C,e[14]=(g*o*r-a*v*r-g*i*l+t*v*l+a*i*m-t*o*m)*C,e[15]=(a*f*r-u*o*r+u*i*l-t*f*l-a*i*h+t*o*h)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,g=s*f,v=a*u,m=a*f,p=o*f,M=l*c,b=l*u,E=l*f,w=i.x,D=i.y,C=i.z;return r[0]=(1-(v+p))*w,r[1]=(d+E)*w,r[2]=(g-b)*w,r[3]=0,r[4]=(d-E)*D,r[5]=(1-(h+p))*D,r[6]=(m+M)*D,r[7]=0,r[8]=(g+b)*C,r[9]=(m-M)*C,r[10]=(1-(h+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;if(e.x=r[12],e.y=r[13],e.z=r[14],this.determinant()===0)return i.set(1,1,1),t.identity(),this;let s=Rr.set(r[0],r[1],r[2]).length();const a=Rr.set(r[4],r[5],r[6]).length(),o=Rr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),Cn.copy(this);const c=1/s,u=1/a,f=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=f,Cn.elements[9]*=f,Cn.elements[10]*=f,t.setFromRotationMatrix(Cn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=jn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===jn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Xa)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=jn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===jn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===Xa)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Rr=new K,Cn=new wt,B_=new K(0,0,0),V_=new K(1,1,1),wi=new K,fa=new K,pn=new K,Mf=new wt,Sf=new Ks;class kn{constructor(e=0,t=0,i=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Mf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sf.setFromEuler(this),this.setFromQuaternion(Sf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Hd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let z_=0;const Ef=new K,Cr=new Ks,oi=new wt,ha=new K,_s=new K,k_=new K,G_=new Ks,yf=new K(1,0,0),bf=new K(0,1,0),Tf=new K(0,0,1),Af={type:"added"},H_={type:"removed"},Pr={type:"childadded",child:null},qo={type:"childremoved",child:null};class kt extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=$s(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new K,t=new kn,i=new Ks,r=new K(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new je}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(yf,e)}rotateY(e){return this.rotateOnAxis(bf,e)}rotateZ(e){return this.rotateOnAxis(Tf,e)}translateOnAxis(e,t){return Ef.copy(e).applyQuaternion(this.quaternion),this.position.add(Ef.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yf,e)}translateY(e){return this.translateOnAxis(bf,e)}translateZ(e){return this.translateOnAxis(Tf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ha.copy(e):ha.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(_s,ha,this.up):oi.lookAt(ha,_s,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),Cr.setFromRotationMatrix(oi),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Af),Pr.child=e,this.dispatchEvent(Pr),Pr.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H_),qo.child=e,this.dispatchEvent(qo),qo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Af),Pr.child=e,this.dispatchEvent(Pr),Pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,e,k_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,G_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new K(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new K,li=new K,Yo=new K,ci=new K,Dr=new K,Ir=new K,wf=new K,$o=new K,Ko=new K,jo=new K,Zo=new Tt,Jo=new Tt,Qo=new Tt;class Ln{constructor(e=new K,t=new K,i=new K){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Pn.subVectors(e,t),r.cross(Pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Pn.subVectors(r,t),li.subVectors(i,t),Yo.subVectors(e,t);const a=Pn.dot(Pn),o=Pn.dot(li),l=Pn.dot(Yo),c=li.dot(li),u=li.dot(Yo),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ci.x),l.addScaledVector(a,ci.y),l.addScaledVector(o,ci.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Zo.setScalar(0),Jo.setScalar(0),Qo.setScalar(0),Zo.fromBufferAttribute(e,t),Jo.fromBufferAttribute(e,i),Qo.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Zo,s.x),a.addScaledVector(Jo,s.y),a.addScaledVector(Qo,s.z),a}static isFrontFacing(e,t,i,r){return Pn.subVectors(i,t),li.subVectors(e,t),Pn.cross(li).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Pn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Dr.subVectors(r,i),Ir.subVectors(s,i),$o.subVectors(e,i);const l=Dr.dot($o),c=Ir.dot($o);if(l<=0&&c<=0)return t.copy(i);Ko.subVectors(e,r);const u=Dr.dot(Ko),f=Ir.dot(Ko);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Dr,a);jo.subVectors(e,s);const d=Dr.dot(jo),g=Ir.dot(jo);if(g>=0&&d<=g)return t.copy(s);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ir,o);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return wf.subVectors(s,r),o=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(wf,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(i).addScaledVector(Dr,a).addScaledVector(Ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},da={h:0,s:0,l:0};function el(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=nt.workingColorSpace){if(e=C_(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=el(a,s,e+1/3),this.g=el(a,s,e),this.b=el(a,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,t=_n){function i(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_n){const i=Wd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=qr(e.r),this.g=qr(e.g),this.b=qr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return nt.workingToColorSpace(Xt.copy(this),e),Math.round(et(Xt.r*255,0,255))*65536+Math.round(et(Xt.g*255,0,255))*256+Math.round(et(Xt.b*255,0,255))}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Xt.copy(this),t);const i=Xt.r,r=Xt.g,s=Xt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=_n){nt.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,i=Xt.g,r=Xt.b;return e!==_n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(da);const i=Fo(Ri.h,da.h,t),r=Fo(Ri.s,da.s,t),s=Fo(Ri.l,da.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new We;We.NAMES=Wd;let W_=0;class rs extends is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=$s(),this.name="",this.type="Material",this.blending=Xr,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=Rl,this.blendEquation=sr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yr,this.stencilZFail=yr,this.stencilZPass=yr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xr&&(i.blending=this.blending),this.side!==zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wl&&(i.blendSrc=this.blendSrc),this.blendDst!==Rl&&(i.blendDst=this.blendDst),this.blendEquation!==sr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==yr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==yr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nu extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new K,pa=new it;let X_=0;class Tn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:X_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=df,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ps(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=an(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ps(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ps(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ps(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ps(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==df&&(e.usage=this.usage),e}}class Xd extends Tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class qd extends Tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class nn extends Tn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let q_=0;const Sn=new wt,tl=new kt,Lr=new K,mn=new _r,vs=new _r,Ot=new K;class Gn extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=$s(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kd(e)?qd:Xd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,i){return Sn.makeTranslation(e,t,i),this.applyMatrix4(Sn),this}scale(e,t,i){return Sn.makeScale(e,t,i),this.applyMatrix4(Sn),this}lookAt(e){return tl.lookAt(e),tl.updateMatrix(),this.applyMatrix4(tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nn(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(mn.min,vs.min),mn.expandByPoint(Ot),Ot.addVectors(mn.max,vs.max),mn.expandByPoint(Ot)):(mn.expandByPoint(vs.min),mn.expandByPoint(vs.max))}mn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ot.fromBufferAttribute(o,c),l&&(Lr.fromBufferAttribute(e,c),Ot.add(Lr)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let k=0;k<i.count;k++)o[k]=new K,l[k]=new K;const c=new K,u=new K,f=new K,h=new it,d=new it,g=new it,v=new K,m=new K;function p(k,x,T){c.fromBufferAttribute(i,k),u.fromBufferAttribute(i,x),f.fromBufferAttribute(i,T),h.fromBufferAttribute(s,k),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,T),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const V=1/(d.x*g.y-g.x*d.y);isFinite(V)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(V),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(V),o[k].add(v),o[x].add(v),o[T].add(v),l[k].add(m),l[x].add(m),l[T].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let k=0,x=M.length;k<x;++k){const T=M[k],V=T.start,j=T.count;for(let Y=V,q=V+j;Y<q;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const b=new K,E=new K,w=new K,D=new K;function C(k){w.fromBufferAttribute(r,k),D.copy(w);const x=o[k];b.copy(x),b.sub(w.multiplyScalar(w.dot(x))).normalize(),E.crossVectors(D,x);const V=E.dot(l[k])<0?-1:1;a.setXYZW(k,b.x,b.y,b.z,V)}for(let k=0,x=M.length;k<x;++k){const T=M[k],V=T.start,j=T.count;for(let Y=V,q=V+j;Y<q;Y+=3)C(e.getX(Y+0)),C(e.getX(Y+1)),C(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new K,s=new K,a=new K,o=new K,l=new K,c=new K,u=new K,f=new K;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Tn(h,u,f)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rf=new wt,Qi=new O_,ma=new tu,Cf=new K,ga=new K,_a=new K,va=new K,nl=new K,xa=new K,Pf=new K,Ma=new K;class At extends kt{constructor(e=new Gn,t=new nu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){xa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(nl.fromBufferAttribute(f,e),a?xa.addScaledVector(nl,u):xa.addScaledVector(nl.sub(t),u))}t.add(xa)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ma.copy(i.boundingSphere),ma.applyMatrix4(s),Qi.copy(e.ray).recast(e.near),!(ma.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(ma,Cf)===null||Qi.origin.distanceToSquared(Cf)>(e.far-e.near)**2))&&(Rf.copy(s).invert(),Qi.copy(e.ray).applyMatrix4(Rf),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let E=M,w=b;E<w;E+=3){const D=o.getX(E),C=o.getX(E+1),k=o.getX(E+2);r=Sa(this,p,e,i,c,u,f,D,C,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const M=o.getX(m),b=o.getX(m+1),E=o.getX(m+2);r=Sa(this,a,e,i,c,u,f,M,b,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let E=M,w=b;E<w;E+=3){const D=E,C=E+1,k=E+2;r=Sa(this,p,e,i,c,u,f,D,C,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const M=m,b=m+1,E=m+2;r=Sa(this,a,e,i,c,u,f,M,b,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Y_(n,e,t,i,r,s,a,o){let l;if(e.side===fn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===zi,o),l===null)return null;Ma.copy(o),Ma.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ma);return c<t.near||c>t.far?null:{distance:c,point:Ma.clone(),object:n}}function Sa(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ga),n.getVertexPosition(l,_a),n.getVertexPosition(c,va);const u=Y_(n,e,t,i,ga,_a,va,Pf);if(u){const f=new K;Ln.getBarycoord(Pf,ga,_a,va,f),r&&(u.uv=Ln.getInterpolatedAttribute(r,o,l,c,f,new it)),s&&(u.uv1=Ln.getInterpolatedAttribute(s,o,l,c,f,new it)),a&&(u.normal=Ln.getInterpolatedAttribute(a,o,l,c,f,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new K,materialIndex:0};Ln.getNormal(ga,_a,va,h.normal),u.face=h,u.barycoord=f}return u}class js extends Gn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new nn(c,3)),this.setAttribute("normal",new nn(u,3)),this.setAttribute("uv",new nn(f,2));function g(v,m,p,M,b,E,w,D,C,k,x){const T=E/C,V=w/k,j=E/2,Y=w/2,q=D/2,L=C+1,H=k+1;let B=0,W=0;const se=new K;for(let oe=0;oe<H;oe++){const me=oe*V-Y;for(let Te=0;Te<L;Te++){const Ie=Te*T-j;se[v]=Ie*M,se[m]=me*b,se[p]=q,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[p]=D>0?1:-1,u.push(se.x,se.y,se.z),f.push(Te/C),f.push(1-oe/k),B+=1}}for(let oe=0;oe<k;oe++)for(let me=0;me<C;me++){const Te=h+me+L*oe,Ie=h+me+L*(oe+1),Be=h+(me+1)+L*(oe+1),Ae=h+(me+1)+L*oe;l.push(Te,Ie,Ae),l.push(Ie,Be,Ae),W+=6}o.addGroup(d,W,x),d+=W,h+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ts(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Jt(n){const e={};for(let t=0;t<n.length;t++){const i=ts(n[t]);for(const r in i)e[r]=i[r]}return e}function $_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Yd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const K_={clone:ts,merge:Jt};var j_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Z_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j_,this.fragmentShader=Z_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ts(e.uniforms),this.uniformsGroups=$_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $d extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new K,Df=new it,If=new it;class cn extends $d{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(No*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vc*2*Math.atan(Math.tan(No*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Df,If),t.subVectors(If,Df)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(No*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ur=-90,Nr=1;class J_ extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new cn(Ur,Nr,e,t);r.layers=this.layers,this.add(r);const s=new cn(Ur,Nr,e,t);s.layers=this.layers,this.add(s);const a=new cn(Ur,Nr,e,t);a.layers=this.layers,this.add(a);const o=new cn(Ur,Nr,e,t);o.layers=this.layers,this.add(o);const l=new cn(Ur,Nr,e,t);l.layers=this.layers,this.add(l);const c=new cn(Ur,Nr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===jn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Kd extends Yt{constructor(e=[],t=gr,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jd extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Kd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new js(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:pi});s.uniforms.tEquirect.value=t;const a=new At(r,s),o=t.minFilter;return t.minFilter===lr&&(t.minFilter=Bt),new J_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class ur extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Q_={type:"move"};class il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Q_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ur;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Is{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new Is(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class iu extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ev extends Yt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Vt,u=Vt,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rl=new K,tv=new K,nv=new je;class rr{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=rl.subVectors(i,t).cross(tv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(rl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||nv.getNormalMatrix(e),r=this.coplanarPoint(rl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const er=new tu,iv=new it(.5,.5),Ea=new K;class ru{constructor(e=new rr,t=new rr,i=new rr,r=new rr,s=new rr,a=new rr){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=jn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],v=s[9],m=s[10],p=s[11],M=s[12],b=s[13],E=s[14],w=s[15];if(r[0].setComponents(c-a,d-u,p-g,w-M).normalize(),r[1].setComponents(c+a,d+u,p+g,w+M).normalize(),r[2].setComponents(c+o,d+f,p+v,w+b).normalize(),r[3].setComponents(c-o,d-f,p-v,w-b).normalize(),i)r[4].setComponents(l,h,m,E).normalize(),r[5].setComponents(c-l,d-h,p-m,w-E).normalize();else if(r[4].setComponents(c-l,d-h,p-m,w-E).normalize(),t===jn)r[5].setComponents(c+l,d+h,p+m,w+E).normalize();else if(t===Xa)r[5].setComponents(l,h,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),er.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),er.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(er)}intersectsSprite(e){er.center.set(0,0,0);const t=iv.distanceTo(e.center);return er.radius=.7071067811865476+t,er.applyMatrix4(e.matrixWorld),this.intersectsSphere(er)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ea.x=r.normal.x>0?e.max.x:e.min.x,Ea.y=r.normal.y>0?e.max.y:e.min.y,Ea.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rv extends Yt{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xs extends Yt{constructor(e,t,i=ti,r,s,a,o=Vt,l=Vt,c,u=Mi,f=1){if(u!==Mi&&u!==cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new eu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class sv extends Xs{constructor(e,t=ti,i=gr,r,s,a=Vt,o=Vt,l,c=Mi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zd extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ss extends Gn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let g=0;const v=[],m=i/2;let p=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new nn(f,3)),this.setAttribute("normal",new nn(h,3)),this.setAttribute("uv",new nn(d,2));function M(){const E=new K,w=new K;let D=0;const C=(t-e)/i;for(let k=0;k<=s;k++){const x=[],T=k/s,V=T*(t-e)+e;for(let j=0;j<=r;j++){const Y=j/r,q=Y*l+o,L=Math.sin(q),H=Math.cos(q);w.x=V*L,w.y=-T*i+m,w.z=V*H,f.push(w.x,w.y,w.z),E.set(L,C,H).normalize(),h.push(E.x,E.y,E.z),d.push(Y,1-T),x.push(g++)}v.push(x)}for(let k=0;k<r;k++)for(let x=0;x<s;x++){const T=v[x][k],V=v[x+1][k],j=v[x+1][k+1],Y=v[x][k+1];(e>0||x!==0)&&(u.push(T,V,Y),D+=3),(t>0||x!==s-1)&&(u.push(V,j,Y),D+=3)}c.addGroup(p,D,0),p+=D}function b(E){const w=g,D=new it,C=new K;let k=0;const x=E===!0?e:t,T=E===!0?1:-1;for(let j=1;j<=r;j++)f.push(0,m*T,0),h.push(0,T,0),d.push(.5,.5),g++;const V=g;for(let j=0;j<=r;j++){const q=j/r*l+o,L=Math.cos(q),H=Math.sin(q);C.x=x*H,C.y=m*T,C.z=x*L,f.push(C.x,C.y,C.z),h.push(0,T,0),D.x=L*.5+.5,D.y=H*.5*T+.5,d.push(D.x,D.y),g++}for(let j=0;j<r;j++){const Y=w+j,q=V+j;E===!0?u.push(q,q+1,Y):u.push(q+1,q,Y),k+=3}c.addGroup(p,k,E===!0?1:2),p+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uo extends ss{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new uo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ki extends Gn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const M=p*h-a;for(let b=0;b<c;b++){const E=b*f-s;g.push(E,-M,0),v.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const b=M+c*p,E=M+c*(p+1),w=M+1+c*(p+1),D=M+1+c*p;d.push(b,E,D),d.push(E,w,D)}this.setIndex(d),this.setAttribute("position",new nn(g,3)),this.setAttribute("normal",new nn(v,3)),this.setAttribute("uv",new nn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ni extends Gn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new K,h=new K,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],b=p/i;let E=0;p===0&&a===0?E=.5/t:p===i&&l===Math.PI&&(E=-.5/t);for(let w=0;w<=t;w++){const D=w/t;f.x=-e*Math.cos(r+D*s)*Math.sin(a+b*o),f.y=e*Math.cos(a+b*o),f.z=e*Math.sin(r+D*s)*Math.sin(a+b*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),m.push(D+E,1-b),M.push(c++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const b=u[p][M+1],E=u[p][M],w=u[p+1][M],D=u[p+1][M+1];(p!==0||a>0)&&d.push(b,E,D),(p!==i-1||l<Math.PI)&&d.push(E,w,D)}this.setIndex(d),this.setAttribute("position",new nn(g,3)),this.setAttribute("normal",new nn(v,3)),this.setAttribute("uv",new nn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class av extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ya extends rs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zc,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fr extends rs{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new We(16777215),this.specular=new We(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zc,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ov extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=x_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lv extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class su extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class cv extends su{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const sl=new wt,Lf=new K,Uf=new K;class uv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ru,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Lf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lf),Uf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Uf),t.updateMatrixWorld(),sl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class au extends $d{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fv extends uv{constructor(){super(new au(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pr extends su{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new fv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ou extends su{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class hv extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dv{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function Nf(n,e,t,i){const r=pv(i);switch(t){case Bd:return n*e;case zd:return n*e/r.components*r.byteLength;case $c:return n*e/r.components*r.byteLength;case Qr:return n*e*2/r.components*r.byteLength;case Kc:return n*e*2/r.components*r.byteLength;case Vd:return n*e*3/r.components*r.byteLength;case Fn:return n*e*4/r.components*r.byteLength;case jc:return n*e*4/r.components*r.byteLength;case Da:case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case La:case Ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kl:case Hl:return Math.max(n,16)*Math.max(e,8)/4;case zl:case Gl:return Math.max(n,8)*Math.max(e,8)/2;case Wl:case Xl:case Yl:case $l:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ql:case Kl:case jl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Jl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ql:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ec:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case tc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case nc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ic:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case rc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case sc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ac:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case oc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case lc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case cc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case uc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case fc:case hc:case dc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case pc:case mc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case gc:case _c:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pv(n){switch(n){case vn:case Ud:return{byteLength:1,components:1};case Gs:case Nd:case xi:return{byteLength:2,components:1};case qc:case Yc:return{byteLength:2,components:4};case ti:case Xc:case Kn:return{byteLength:4,components:1};case Fd:case Od:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gc}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gc);function Jd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function mv(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const v=f[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var gv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_v=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ev=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Av=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Dv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ov=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Vv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$v=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Kv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ix=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ax=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ox=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ux=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,px=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_x=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ax=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Px=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ix=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ux=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ox=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Vx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$x=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Jx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,iM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,EM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,TM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,UM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,FM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,OM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,YM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$M=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:gv,alphahash_pars_fragment:_v,alphamap_fragment:vv,alphamap_pars_fragment:xv,alphatest_fragment:Mv,alphatest_pars_fragment:Sv,aomap_fragment:Ev,aomap_pars_fragment:yv,batching_pars_vertex:bv,batching_vertex:Tv,begin_vertex:Av,beginnormal_vertex:wv,bsdfs:Rv,iridescence_fragment:Cv,bumpmap_pars_fragment:Pv,clipping_planes_fragment:Dv,clipping_planes_pars_fragment:Iv,clipping_planes_pars_vertex:Lv,clipping_planes_vertex:Uv,color_fragment:Nv,color_pars_fragment:Fv,color_pars_vertex:Ov,color_vertex:Bv,common:Vv,cube_uv_reflection_fragment:zv,defaultnormal_vertex:kv,displacementmap_pars_vertex:Gv,displacementmap_vertex:Hv,emissivemap_fragment:Wv,emissivemap_pars_fragment:Xv,colorspace_fragment:qv,colorspace_pars_fragment:Yv,envmap_fragment:$v,envmap_common_pars_fragment:Kv,envmap_pars_fragment:jv,envmap_pars_vertex:Zv,envmap_physical_pars_fragment:lx,envmap_vertex:Jv,fog_vertex:Qv,fog_pars_vertex:ex,fog_fragment:tx,fog_pars_fragment:nx,gradientmap_pars_fragment:ix,lightmap_pars_fragment:rx,lights_lambert_fragment:sx,lights_lambert_pars_fragment:ax,lights_pars_begin:ox,lights_toon_fragment:cx,lights_toon_pars_fragment:ux,lights_phong_fragment:fx,lights_phong_pars_fragment:hx,lights_physical_fragment:dx,lights_physical_pars_fragment:px,lights_fragment_begin:mx,lights_fragment_maps:gx,lights_fragment_end:_x,logdepthbuf_fragment:vx,logdepthbuf_pars_fragment:xx,logdepthbuf_pars_vertex:Mx,logdepthbuf_vertex:Sx,map_fragment:Ex,map_pars_fragment:yx,map_particle_fragment:bx,map_particle_pars_fragment:Tx,metalnessmap_fragment:Ax,metalnessmap_pars_fragment:wx,morphinstance_vertex:Rx,morphcolor_vertex:Cx,morphnormal_vertex:Px,morphtarget_pars_vertex:Dx,morphtarget_vertex:Ix,normal_fragment_begin:Lx,normal_fragment_maps:Ux,normal_pars_fragment:Nx,normal_pars_vertex:Fx,normal_vertex:Ox,normalmap_pars_fragment:Bx,clearcoat_normal_fragment_begin:Vx,clearcoat_normal_fragment_maps:zx,clearcoat_pars_fragment:kx,iridescence_pars_fragment:Gx,opaque_fragment:Hx,packing:Wx,premultiplied_alpha_fragment:Xx,project_vertex:qx,dithering_fragment:Yx,dithering_pars_fragment:$x,roughnessmap_fragment:Kx,roughnessmap_pars_fragment:jx,shadowmap_pars_fragment:Zx,shadowmap_pars_vertex:Jx,shadowmap_vertex:Qx,shadowmask_pars_fragment:eM,skinbase_vertex:tM,skinning_pars_vertex:nM,skinning_vertex:iM,skinnormal_vertex:rM,specularmap_fragment:sM,specularmap_pars_fragment:aM,tonemapping_fragment:oM,tonemapping_pars_fragment:lM,transmission_fragment:cM,transmission_pars_fragment:uM,uv_pars_fragment:fM,uv_pars_vertex:hM,uv_vertex:dM,worldpos_vertex:pM,background_vert:mM,background_frag:gM,backgroundCube_vert:_M,backgroundCube_frag:vM,cube_vert:xM,cube_frag:MM,depth_vert:SM,depth_frag:EM,distance_vert:yM,distance_frag:bM,equirect_vert:TM,equirect_frag:AM,linedashed_vert:wM,linedashed_frag:RM,meshbasic_vert:CM,meshbasic_frag:PM,meshlambert_vert:DM,meshlambert_frag:IM,meshmatcap_vert:LM,meshmatcap_frag:UM,meshnormal_vert:NM,meshnormal_frag:FM,meshphong_vert:OM,meshphong_frag:BM,meshphysical_vert:VM,meshphysical_frag:zM,meshtoon_vert:kM,meshtoon_frag:GM,points_vert:HM,points_frag:WM,shadow_vert:XM,shadow_frag:qM,sprite_vert:YM,sprite_frag:$M},Ue={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Yn={basic:{uniforms:Jt([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Jt([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new We(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Jt([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Jt([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Jt([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new We(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Jt([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Jt([Ue.points,Ue.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Jt([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Jt([Ue.common,Ue.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Jt([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Jt([Ue.sprite,Ue.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Jt([Ue.common,Ue.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Jt([Ue.lights,Ue.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Yn.physical={uniforms:Jt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const ba={r:0,b:0,g:0},tr=new kn,KM=new wt;function jM(n,e,t,i,r,s,a){const o=new We(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?t:e).get(E)),E}function v(b){let E=!1;const w=g(b);w===null?p(o,l):w&&w.isColor&&(p(w,1),E=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,E){const w=g(E);w&&(w.isCubeTexture||w.mapping===co)?(u===void 0&&(u=new At(new js(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:ts(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,C,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),tr.copy(E.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(KM.makeRotationFromEuler(tr)),u.material.toneMapped=nt.getTransfer(w.colorSpace)!==ht,(f!==w||h!==w.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=w,h=w.version,d=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new At(new ki(2,2),new ni({name:"BackgroundMaterial",uniforms:ts(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=nt.getTransfer(w.colorSpace)!==ht,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(f!==w||h!==w.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=w,h=w.version,d=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,E){b.getRGB(ba,Yd(n)),i.buffers.color.setClear(ba.r,ba.g,ba.b,E,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),l=E,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:v,addToRenderList:m,dispose:M}}function ZM(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(T,V,j,Y,q){let L=!1;const H=f(Y,j,V);s!==H&&(s=H,c(s.object)),L=d(T,Y,j,q),L&&g(T,Y,j,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,E(T,V,j,Y),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function f(T,V,j){const Y=j.wireframe===!0;let q=i[T.id];q===void 0&&(q={},i[T.id]=q);let L=q[V.id];L===void 0&&(L={},q[V.id]=L);let H=L[Y];return H===void 0&&(H=h(l()),L[Y]=H),H}function h(T){const V=[],j=[],Y=[];for(let q=0;q<t;q++)V[q]=0,j[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:j,attributeDivisors:Y,object:T,attributes:{},index:null}}function d(T,V,j,Y){const q=s.attributes,L=V.attributes;let H=0;const B=j.getAttributes();for(const W in B)if(B[W].location>=0){const oe=q[W];let me=L[W];if(me===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(me=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(me=T.instanceColor)),oe===void 0||oe.attribute!==me||me&&oe.data!==me.data)return!0;H++}return s.attributesNum!==H||s.index!==Y}function g(T,V,j,Y){const q={},L=V.attributes;let H=0;const B=j.getAttributes();for(const W in B)if(B[W].location>=0){let oe=L[W];oe===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(oe=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(oe=T.instanceColor));const me={};me.attribute=oe,oe&&oe.data&&(me.data=oe.data),q[W]=me,H++}s.attributes=q,s.attributesNum=H,s.index=Y}function v(){const T=s.newAttributes;for(let V=0,j=T.length;V<j;V++)T[V]=0}function m(T){p(T,0)}function p(T,V){const j=s.newAttributes,Y=s.enabledAttributes,q=s.attributeDivisors;j[T]=1,Y[T]===0&&(n.enableVertexAttribArray(T),Y[T]=1),q[T]!==V&&(n.vertexAttribDivisor(T,V),q[T]=V)}function M(){const T=s.newAttributes,V=s.enabledAttributes;for(let j=0,Y=V.length;j<Y;j++)V[j]!==T[j]&&(n.disableVertexAttribArray(j),V[j]=0)}function b(T,V,j,Y,q,L,H){H===!0?n.vertexAttribIPointer(T,V,j,q,L):n.vertexAttribPointer(T,V,j,Y,q,L)}function E(T,V,j,Y){v();const q=Y.attributes,L=j.getAttributes(),H=V.defaultAttributeValues;for(const B in L){const W=L[B];if(W.location>=0){let se=q[B];if(se===void 0&&(B==="instanceMatrix"&&T.instanceMatrix&&(se=T.instanceMatrix),B==="instanceColor"&&T.instanceColor&&(se=T.instanceColor)),se!==void 0){const oe=se.normalized,me=se.itemSize,Te=e.get(se);if(Te===void 0)continue;const Ie=Te.buffer,Be=Te.type,Ae=Te.bytesPerElement,$=Be===n.INT||Be===n.UNSIGNED_INT||se.gpuType===Xc;if(se.isInterleavedBufferAttribute){const I=se.data,Q=I.stride,ae=se.offset;if(I.isInstancedInterleavedBuffer){for(let pe=0;pe<W.locationSize;pe++)p(W.location+pe,I.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let pe=0;pe<W.locationSize;pe++)m(W.location+pe);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let pe=0;pe<W.locationSize;pe++)b(W.location+pe,me/W.locationSize,Be,oe,Q*Ae,(ae+me/W.locationSize*pe)*Ae,$)}else{if(se.isInstancedBufferAttribute){for(let I=0;I<W.locationSize;I++)p(W.location+I,se.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let I=0;I<W.locationSize;I++)m(W.location+I);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let I=0;I<W.locationSize;I++)b(W.location+I,me/W.locationSize,Be,oe,me*Ae,me/W.locationSize*I*Ae,$)}}else if(H!==void 0){const oe=H[B];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(W.location,oe);break;case 3:n.vertexAttrib3fv(W.location,oe);break;case 4:n.vertexAttrib4fv(W.location,oe);break;default:n.vertexAttrib1fv(W.location,oe)}}}}M()}function w(){k();for(const T in i){const V=i[T];for(const j in V){const Y=V[j];for(const q in Y)u(Y[q].object),delete Y[q];delete V[j]}delete i[T]}}function D(T){if(i[T.id]===void 0)return;const V=i[T.id];for(const j in V){const Y=V[j];for(const q in Y)u(Y[q].object),delete Y[q];delete V[j]}delete i[T.id]}function C(T){for(const V in i){const j=i[V];if(j[T.id]===void 0)continue;const Y=j[T.id];for(const q in Y)u(Y[q].object),delete Y[q];delete j[T.id]}}function k(){x(),a=!0,s!==r&&(s=r,c(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:k,resetDefaultState:x,dispose:w,releaseStatesOfGeometry:D,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function JM(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*h[v];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function QM(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==Fn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const k=C===xi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==vn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Kn&&!k)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),D=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:E,maxSamples:w,samples:D}}function eS(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new rr,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:i,b=M*4;let E=p.clippingState||null;l.value=E,E=u(g,h,b,d);for(let w=0;w!==b;++w)E[w]=t[w];p.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,g){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,E=d;b!==v;++b,E+=4)a.copy(f[b]).applyMatrix4(M,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function tS(n){let e=new WeakMap;function t(a,o){return o===Fl?a.mapping=gr:o===Ol&&(a.mapping=Jr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fl||o===Ol)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new jd(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Fi=4,Ff=[.125,.215,.35,.446,.526,.582],ar=20,nS=256,xs=new au,Of=new We;let al=null,ol=0,ll=0,cl=!1;const iS=new K;class Bf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=iS}=s;al=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(al,ol,ll),this._renderer.xr.enabled=cl,e.scissorTest=!1,Fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gr||e.mapping===Jr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),al=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:xi,format:Fn,colorSpace:es,depthBuffer:!1},r=Vf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vf(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rS(s)),this._blurMaterial=aS(s,e,t),this._ggxMaterial=sS(s,e,t)}return r}_compileMaterial(e){const t=new At(new Gn,e);this._renderer.compile(t,xs)}_sceneToCubeUV(e,t,i,r,s){const l=new cn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Of),f.toneMapping=Jn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new js,new nu({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(Of),p=!0);for(let b=0;b<6;b++){const E=b%3;E===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[b],s.y,s.z)):E===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[b]));const w=this._cubeSize;Fr(r,E*w,b>2?w:0,w,w),f.setRenderTarget(r),p&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===gr||e.mapping===Jr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Fr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,xs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:g}=this,v=this._sizeLods[i],m=3*v*(i>g-Fi?i-g+Fi:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=g-t,Fr(s,m,p,3*v,2*v),r.setRenderTarget(s),r.render(o,xs),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Fr(e,m,p,3*v,2*v),r.setRenderTarget(e),r.render(o,xs)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&st("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ar-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):ar;m>ar&&qe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ar}`);const p=[];let M=0;for(let C=0;C<ar;++C){const k=C/v,x=Math.exp(-k*k/2);p.push(x),C===0?M+=x:C<m&&(M+=2*x)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-i;const E=this._sizeLods[r],w=3*E*(r>b-Fi?r-b+Fi:0),D=4*(this._cubeSize-E);Fr(t,w,D,3*E,2*E),l.setRenderTarget(t),l.render(f,xs)}}function rS(n){const e=[],t=[],i=[];let r=n;const s=n-Fi+1+Ff.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Fi?l=Ff[a-n+Fi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*d),b=new Float32Array(m*g*d),E=new Float32Array(p*g*d);for(let D=0;D<d;D++){const C=D%3*2/3-1,k=D>2?0:-1,x=[C,k,0,C+2/3,k,0,C+2/3,k+1,0,C,k,0,C+2/3,k+1,0,C,k+1,0];M.set(x,v*g*D),b.set(h,m*g*D);const T=[D,D,D,D,D,D];E.set(T,p*g*D)}const w=new Gn;w.setAttribute("position",new Tn(M,v)),w.setAttribute("uv",new Tn(b,m)),w.setAttribute("faceIndex",new Tn(E,p)),i.push(new At(w,null)),r>Fi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Vf(n,e,t){const i=new Qn(n,e,t);return i.texture.mapping=co,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function sS(n,e,t){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function aS(n,e,t){const i=new Float32Array(ar),r=new K(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:ar,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function zf(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function kf(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function fo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function oS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Fl||l===Ol,u=l===gr||l===Jr;if(c||u){let f=e.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Bf(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Bf(n)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function lS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ws("WebGLRenderer: "+i+" extension not supported."),r}}}function cS(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let v=0;if(d!==null){const M=d.array;v=d.version;for(let b=0,E=M.length;b<E;b+=3){const w=M[b+0],D=M[b+1],C=M[b+2];h.push(w,D,D,C,C,w)}}else if(g!==void 0){const M=g.array;v=g.version;for(let b=0,E=M.length/3-1;b<E;b+=3){const w=b+0,D=b+1,C=b+2;h.push(w,D,D,C,C,w)}}else return;const m=new(kd(h)?qd:Xd)(h,1);m.version=v;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function uS(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function c(h,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,h*a,g),t.update(d,i,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,i,1)}function f(h,d,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,h,0,v,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*v[M];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function fS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:st("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function hS(n,e,t){const i=new WeakMap,r=new Tt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let T=function(){k.dispose(),i.delete(o),o.removeEventListener("dispose",T)};var d=T;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),v===!0&&(E=2),m===!0&&(E=3);let w=o.attributes.position.count*E,D=1;w>e.maxTextureSize&&(D=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const C=new Float32Array(w*D*4*f),k=new Gd(C,w,D,f);k.type=Kn,k.needsUpdate=!0;const x=E*4;for(let V=0;V<f;V++){const j=p[V],Y=M[V],q=b[V],L=w*D*4*V;for(let H=0;H<j.count;H++){const B=H*x;g===!0&&(r.fromBufferAttribute(j,H),C[L+B+0]=r.x,C[L+B+1]=r.y,C[L+B+2]=r.z,C[L+B+3]=0),v===!0&&(r.fromBufferAttribute(Y,H),C[L+B+4]=r.x,C[L+B+5]=r.y,C[L+B+6]=r.z,C[L+B+7]=0),m===!0&&(r.fromBufferAttribute(q,H),C[L+B+8]=r.x,C[L+B+9]=r.y,C[L+B+10]=r.z,C[L+B+11]=q.itemSize===4?r.w:1)}}h={count:f,texture:k,size:new it(w,D)},i.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function dS(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const pS={[wd]:"LINEAR_TONE_MAPPING",[Rd]:"REINHARD_TONE_MAPPING",[Cd]:"CINEON_TONE_MAPPING",[Wc]:"ACES_FILMIC_TONE_MAPPING",[Dd]:"AGX_TONE_MAPPING",[Id]:"NEUTRAL_TONE_MAPPING",[Pd]:"CUSTOM_TONE_MAPPING"};function mS(n,e,t,i,r){const s=new Qn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),a=new Qn(e,t,{type:xi,depthBuffer:!1,stencilBuffer:!1}),o=new Gn;o.setAttribute("position",new nn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new nn([0,2,0,0,2,0],2));const l=new av({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new At(o,l),u=new au(-1,1,1,-1,0,1);let f=null,h=null,d=!1,g,v=null,m=[],p=!1;this.setSize=function(M,b){s.setSize(M,b),a.setSize(M,b);for(let E=0;E<m.length;E++){const w=m[E];w.setSize&&w.setSize(M,b)}},this.setEffects=function(M){m=M,p=m.length>0&&m[0].isRenderPass===!0;const b=s.width,E=s.height;for(let w=0;w<m.length;w++){const D=m[w];D.setSize&&D.setSize(b,E)}},this.begin=function(M,b){if(d||M.toneMapping===Jn&&m.length===0)return!1;if(v=b,b!==null){const E=b.width,w=b.height;(s.width!==E||s.height!==w)&&this.setSize(E,w)}return p===!1&&M.setRenderTarget(s),g=M.toneMapping,M.toneMapping=Jn,!0},this.hasRenderPass=function(){return p},this.end=function(M,b){M.toneMapping=g,d=!0;let E=s,w=a;for(let D=0;D<m.length;D++){const C=m[D];if(C.enabled!==!1&&(C.render(M,w,E,b),C.needsSwap!==!1)){const k=E;E=w,w=k}}if(f!==M.outputColorSpace||h!==M.toneMapping){f=M.outputColorSpace,h=M.toneMapping,l.defines={},nt.getTransfer(f)===ht&&(l.defines.SRGB_TRANSFER="");const D=pS[h];D&&(l.defines[D]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(v),M.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Qd=new Yt,xc=new Xs(1,1),ep=new Gd,tp=new N_,np=new Kd,Gf=[],Hf=[],Wf=new Float32Array(16),Xf=new Float32Array(9),qf=new Float32Array(4);function as(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Gf[r];if(s===void 0&&(s=new Float32Array(r),Gf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ho(n,e){let t=Hf[e];t===void 0&&(t=new Int32Array(e),Hf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function gS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function _S(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function vS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function xS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function MS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;qf.set(i),n.uniformMatrix2fv(this.addr,!1,qf),Ft(t,i)}}function SS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Xf.set(i),n.uniformMatrix3fv(this.addr,!1,Xf),Ft(t,i)}}function ES(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Wf.set(i),n.uniformMatrix4fv(this.addr,!1,Wf),Ft(t,i)}}function yS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function TS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function AS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function wS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function RS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function CS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function PS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function DS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(xc.compareFunction=t.isReversedDepthBuffer()?Qc:Jc,s=xc):s=Qd,t.setTexture2D(e||s,r)}function IS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||tp,r)}function LS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||np,r)}function US(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||ep,r)}function NS(n){switch(n){case 5126:return gS;case 35664:return _S;case 35665:return vS;case 35666:return xS;case 35674:return MS;case 35675:return SS;case 35676:return ES;case 5124:case 35670:return yS;case 35667:case 35671:return bS;case 35668:case 35672:return TS;case 35669:case 35673:return AS;case 5125:return wS;case 36294:return RS;case 36295:return CS;case 36296:return PS;case 35678:case 36198:case 36298:case 36306:case 35682:return DS;case 35679:case 36299:case 36307:return IS;case 35680:case 36300:case 36308:case 36293:return LS;case 36289:case 36303:case 36311:case 36292:return US}}function FS(n,e){n.uniform1fv(this.addr,e)}function OS(n,e){const t=as(e,this.size,2);n.uniform2fv(this.addr,t)}function BS(n,e){const t=as(e,this.size,3);n.uniform3fv(this.addr,t)}function VS(n,e){const t=as(e,this.size,4);n.uniform4fv(this.addr,t)}function zS(n,e){const t=as(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function kS(n,e){const t=as(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function GS(n,e){const t=as(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function HS(n,e){n.uniform1iv(this.addr,e)}function WS(n,e){n.uniform2iv(this.addr,e)}function XS(n,e){n.uniform3iv(this.addr,e)}function qS(n,e){n.uniform4iv(this.addr,e)}function YS(n,e){n.uniform1uiv(this.addr,e)}function $S(n,e){n.uniform2uiv(this.addr,e)}function KS(n,e){n.uniform3uiv(this.addr,e)}function jS(n,e){n.uniform4uiv(this.addr,e)}function ZS(n,e,t){const i=this.cache,r=e.length,s=ho(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=xc:a=Qd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function JS(n,e,t){const i=this.cache,r=e.length,s=ho(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||tp,s[a])}function QS(n,e,t){const i=this.cache,r=e.length,s=ho(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||np,s[a])}function eE(n,e,t){const i=this.cache,r=e.length,s=ho(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ep,s[a])}function tE(n){switch(n){case 5126:return FS;case 35664:return OS;case 35665:return BS;case 35666:return VS;case 35674:return zS;case 35675:return kS;case 35676:return GS;case 5124:case 35670:return HS;case 35667:case 35671:return WS;case 35668:case 35672:return XS;case 35669:case 35673:return qS;case 5125:return YS;case 36294:return $S;case 36295:return KS;case 36296:return jS;case 35678:case 36198:case 36298:case 36306:case 35682:return ZS;case 35679:case 36299:case 36307:return JS;case 35680:case 36300:case 36308:case 36293:return QS;case 36289:case 36303:case 36311:case 36292:return eE}}class nE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=NS(t.type)}}class iE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tE(t.type)}}class rE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ul=/(\w+)(\])?(\[|\.)?/g;function Yf(n,e){n.seq.push(e),n.map[e.id]=e}function sE(n,e,t){const i=n.name,r=i.length;for(ul.lastIndex=0;;){const s=ul.exec(i),a=ul.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Yf(t,c===void 0?new nE(o,n,e):new iE(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new rE(o),Yf(t,f)),t=f}}}class Na{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sE(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function $f(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const aE=37297;let oE=0;function lE(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Kf=new je;function cE(n){nt._getMatrix(Kf,nt.workingColorSpace,n);const e=`mat3( ${Kf.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(n)){case Wa:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function jf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+lE(n.getShaderSource(e),o)}else return s}function uE(n,e){const t=cE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const fE={[wd]:"Linear",[Rd]:"Reinhard",[Cd]:"Cineon",[Wc]:"ACESFilmic",[Dd]:"AgX",[Id]:"Neutral",[Pd]:"Custom"};function hE(n,e){const t=fE[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ta=new K;function dE(){nt.getLuminanceCoefficients(Ta);const n=Ta.x.toFixed(4),e=Ta.y.toFixed(4),t=Ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)}function mE(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function gE(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ys(n){return n!==""}function Zf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _E=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mc(n){return n.replace(_E,xE)}const vE=new Map;function xE(n,e){let t=Ze[e];if(t===void 0){const i=vE.get(e);if(i!==void 0)t=Ze[i],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mc(t)}const ME=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qf(n){return n.replace(ME,SE)}function SE(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const EE={[Pa]:"SHADOWMAP_TYPE_PCF",[Es]:"SHADOWMAP_TYPE_VSM"};function yE(n){return EE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bE={[gr]:"ENVMAP_TYPE_CUBE",[Jr]:"ENVMAP_TYPE_CUBE",[co]:"ENVMAP_TYPE_CUBE_UV"};function TE(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":bE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const AE={[Jr]:"ENVMAP_MODE_REFRACTION"};function wE(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":AE[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const RE={[Hc]:"ENVMAP_BLENDING_MULTIPLY",[g_]:"ENVMAP_BLENDING_MIX",[__]:"ENVMAP_BLENDING_ADD"};function CE(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":RE[n.combine]||"ENVMAP_BLENDING_NONE"}function PE(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function DE(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=yE(t),c=TE(t),u=wE(t),f=CE(t),h=PE(t),d=pE(t),g=mE(s),v=r.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ys).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ys).join(`
`),p.length>0&&(p+=`
`)):(m=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),p=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Jn?hE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,uE("linearToOutputTexel",t.outputColorSpace),dE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ys).join(`
`)),a=Mc(a),a=Zf(a,t),a=Jf(a,t),o=Mc(o),o=Zf(o,t),o=Jf(o,t),a=Qf(a),o=Qf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===pf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=M+m+a,E=M+p+o,w=$f(r,r.VERTEX_SHADER,b),D=$f(r,r.FRAGMENT_SHADER,E);r.attachShader(v,w),r.attachShader(v,D),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(V){if(n.debug.checkShaderErrors){const j=r.getProgramInfoLog(v)||"",Y=r.getShaderInfoLog(w)||"",q=r.getShaderInfoLog(D)||"",L=j.trim(),H=Y.trim(),B=q.trim();let W=!0,se=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,D);else{const oe=jf(r,w,"vertex"),me=jf(r,D,"fragment");st("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+L+`
`+oe+`
`+me)}else L!==""?qe("WebGLProgram: Program Info Log:",L):(H===""||B==="")&&(se=!1);se&&(V.diagnostics={runnable:W,programLog:L,vertexShader:{log:H,prefix:m},fragmentShader:{log:B,prefix:p}})}r.deleteShader(w),r.deleteShader(D),k=new Na(r,v),x=gE(r,v)}let k;this.getUniforms=function(){return k===void 0&&C(this),k};let x;this.getAttributes=function(){return x===void 0&&C(this),x};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(v,aE)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=oE++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=D,this}let IE=0;class LE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new UE(e),t.set(e,i)),i}}class UE{constructor(e){this.id=IE++,this.code=e,this.usedTimes=0}}function NE(n,e,t,i,r,s,a){const o=new Hd,l=new LE,c=new Set,u=[],f=new Map,h=r.logarithmicDepthBuffer;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,T,V,j,Y){const q=j.fog,L=Y.geometry,H=x.isMeshStandardMaterial?j.environment:null,B=(x.isMeshStandardMaterial?t:e).get(x.envMap||H),W=B&&B.mapping===co?B.image.height:null,se=g[x.type];x.precision!==null&&(d=r.getMaxPrecision(x.precision),d!==x.precision&&qe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const oe=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,me=oe!==void 0?oe.length:0;let Te=0;L.morphAttributes.position!==void 0&&(Te=1),L.morphAttributes.normal!==void 0&&(Te=2),L.morphAttributes.color!==void 0&&(Te=3);let Ie,Be,Ae,$;if(se){const Qe=Yn[se];Ie=Qe.vertexShader,Be=Qe.fragmentShader}else Ie=x.vertexShader,Be=x.fragmentShader,l.update(x),Ae=l.getVertexShaderID(x),$=l.getFragmentShaderID(x);const I=n.getRenderTarget(),Q=n.state.buffers.depth.getReversed(),ae=Y.isInstancedMesh===!0,pe=Y.isBatchedMesh===!0,De=!!x.map,R=!!x.matcap,P=!!B,G=!!x.aoMap,ne=!!x.lightMap,te=!!x.bumpMap,le=!!x.normalMap,A=!!x.displacementMap,Ee=!!x.emissiveMap,ge=!!x.metalnessMap,ue=!!x.roughnessMap,fe=x.anisotropy>0,S=x.clearcoat>0,_=x.dispersion>0,F=x.iridescence>0,O=x.sheen>0,U=x.transmission>0,N=fe&&!!x.anisotropyMap,Me=S&&!!x.clearcoatMap,Z=S&&!!x.clearcoatNormalMap,ve=S&&!!x.clearcoatRoughnessMap,xe=F&&!!x.iridescenceMap,ee=F&&!!x.iridescenceThicknessMap,be=O&&!!x.sheenColorMap,de=O&&!!x.sheenRoughnessMap,ye=!!x.specularMap,_e=!!x.specularColorMap,Fe=!!x.specularIntensityMap,z=U&&!!x.transmissionMap,Ce=U&&!!x.thicknessMap,we=!!x.gradientMap,Pe=!!x.alphaMap,Se=x.alphaTest>0,he=!!x.alphaHash,Re=!!x.extensions;let He=Jn;x.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(He=n.toneMapping);const tt={shaderID:se,shaderType:x.type,shaderName:x.name,vertexShader:Ie,fragmentShader:Be,defines:x.defines,customVertexShaderID:Ae,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:pe,batchingColor:pe&&Y._colorsTexture!==null,instancing:ae,instancingColor:ae&&Y.instanceColor!==null,instancingMorph:ae&&Y.morphTexture!==null,outputColorSpace:I===null?n.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:es,alphaToCoverage:!!x.alphaToCoverage,map:De,matcap:R,envMap:P,envMapMode:P&&B.mapping,envMapCubeUVHeight:W,aoMap:G,lightMap:ne,bumpMap:te,normalMap:le,displacementMap:A,emissiveMap:Ee,normalMapObjectSpace:le&&x.normalMapType===M_,normalMapTangentSpace:le&&x.normalMapType===Zc,metalnessMap:ge,roughnessMap:ue,anisotropy:fe,anisotropyMap:N,clearcoat:S,clearcoatMap:Me,clearcoatNormalMap:Z,clearcoatRoughnessMap:ve,dispersion:_,iridescence:F,iridescenceMap:xe,iridescenceThicknessMap:ee,sheen:O,sheenColorMap:be,sheenRoughnessMap:de,specularMap:ye,specularColorMap:_e,specularIntensityMap:Fe,transmission:U,transmissionMap:z,thicknessMap:Ce,gradientMap:we,opaque:x.transparent===!1&&x.blending===Xr&&x.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Se,alphaHash:he,combine:x.combine,mapUv:De&&v(x.map.channel),aoMapUv:G&&v(x.aoMap.channel),lightMapUv:ne&&v(x.lightMap.channel),bumpMapUv:te&&v(x.bumpMap.channel),normalMapUv:le&&v(x.normalMap.channel),displacementMapUv:A&&v(x.displacementMap.channel),emissiveMapUv:Ee&&v(x.emissiveMap.channel),metalnessMapUv:ge&&v(x.metalnessMap.channel),roughnessMapUv:ue&&v(x.roughnessMap.channel),anisotropyMapUv:N&&v(x.anisotropyMap.channel),clearcoatMapUv:Me&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:Z&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:de&&v(x.sheenRoughnessMap.channel),specularMapUv:ye&&v(x.specularMap.channel),specularColorMapUv:_e&&v(x.specularColorMap.channel),specularIntensityMapUv:Fe&&v(x.specularIntensityMap.channel),transmissionMapUv:z&&v(x.transmissionMap.channel),thicknessMapUv:Ce&&v(x.thicknessMap.channel),alphaMapUv:Pe&&v(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(le||fe),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!L.attributes.uv&&(De||Pe),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Q,skinning:Y.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Te,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&V.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:De&&x.map.isVideoTexture===!0&&nt.getTransfer(x.map.colorSpace)===ht,decodeVideoTextureEmissive:Ee&&x.emissiveMap.isVideoTexture===!0&&nt.getTransfer(x.emissiveMap.colorSpace)===ht,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===In,flipSided:x.side===fn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Re&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&x.extensions.multiDraw===!0||pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return tt.vertexUv1s=c.has(1),tt.vertexUv2s=c.has(2),tt.vertexUv3s=c.has(3),c.clear(),tt}function p(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const V in x.defines)T.push(V),T.push(x.defines[V]);return x.isRawShaderMaterial===!1&&(M(T,x),b(T,x),T.push(n.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function M(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function b(x,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),x.push(o.mask)}function E(x){const T=g[x.type];let V;if(T){const j=Yn[T];V=K_.clone(j.uniforms)}else V=x.uniforms;return V}function w(x,T){let V=f.get(T);return V!==void 0?++V.usedTimes:(V=new DE(n,T,x,s),u.push(V),f.set(T,V)),V}function D(x){if(--x.usedTimes===0){const T=u.indexOf(x);u[T]=u[u.length-1],u.pop(),f.delete(x.cacheKey),x.destroy()}}function C(x){l.remove(x)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:w,releaseProgram:D,releaseShaderCache:C,programs:u,dispose:k}}function FE(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function OE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function th(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,h,d,g,v,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:v,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=v,p.group=m),e++,p}function o(f,h,d,g,v,m){const p=a(f,h,d,g,v,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,v,m){const p=a(f,h,d,g,v,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||OE),i.length>1&&i.sort(h||th),r.length>1&&r.sort(h||th)}function u(){for(let f=e,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function BE(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new nh,n.set(i,[a])):r>=s.length?(a=new nh,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function VE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new K,color:new We};break;case"SpotLight":t={position:new K,direction:new K,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new K,halfWidth:new K,halfHeight:new K};break}return n[e.id]=t,t}}}function zE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let kE=0;function GE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function HE(n){const e=new VE,t=zE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new K);const r=new K,s=new wt,a=new wt;function o(c){let u=0,f=0,h=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,M=0,b=0,E=0,w=0,D=0,C=0;c.sort(GE);for(let x=0,T=c.length;x<T;x++){const V=c[x],j=V.color,Y=V.intensity,q=V.distance;let L=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===Qr?L=V.shadow.map.texture:L=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)u+=j.r*Y,f+=j.g*Y,h+=j.b*Y;else if(V.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(V.sh.coefficients[H],Y);C++}else if(V.isDirectionalLight){const H=e.get(V);if(H.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const B=V.shadow,W=t.get(V);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,i.directionalShadow[d]=W,i.directionalShadowMap[d]=L,i.directionalShadowMatrix[d]=V.shadow.matrix,M++}i.directional[d]=H,d++}else if(V.isSpotLight){const H=e.get(V);H.position.setFromMatrixPosition(V.matrixWorld),H.color.copy(j).multiplyScalar(Y),H.distance=q,H.coneCos=Math.cos(V.angle),H.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),H.decay=V.decay,i.spot[v]=H;const B=V.shadow;if(V.map&&(i.spotLightMap[w]=V.map,w++,B.updateMatrices(V),V.castShadow&&D++),i.spotLightMatrix[v]=B.matrix,V.castShadow){const W=t.get(V);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,i.spotShadow[v]=W,i.spotShadowMap[v]=L,E++}v++}else if(V.isRectAreaLight){const H=e.get(V);H.color.copy(j).multiplyScalar(Y),H.halfWidth.set(V.width*.5,0,0),H.halfHeight.set(0,V.height*.5,0),i.rectArea[m]=H,m++}else if(V.isPointLight){const H=e.get(V);if(H.color.copy(V.color).multiplyScalar(V.intensity),H.distance=V.distance,H.decay=V.decay,V.castShadow){const B=V.shadow,W=t.get(V);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,W.shadowCameraNear=B.camera.near,W.shadowCameraFar=B.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=L,i.pointShadowMatrix[g]=V.shadow.matrix,b++}i.point[g]=H,g++}else if(V.isHemisphereLight){const H=e.get(V);H.skyColor.copy(V.color).multiplyScalar(Y),H.groundColor.copy(V.groundColor).multiplyScalar(Y),i.hemi[p]=H,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ue.LTC_FLOAT_1,i.rectAreaLTC2=Ue.LTC_FLOAT_2):(i.rectAreaLTC1=Ue.LTC_HALF_1,i.rectAreaLTC2=Ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const k=i.hash;(k.directionalLength!==d||k.pointLength!==g||k.spotLength!==v||k.rectAreaLength!==m||k.hemiLength!==p||k.numDirectionalShadows!==M||k.numPointShadows!==b||k.numSpotShadows!==E||k.numSpotMaps!==w||k.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=E+w-D,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=C,k.directionalLength=d,k.pointLength=g,k.spotLength=v,k.rectAreaLength=m,k.hemiLength=p,k.numDirectionalShadows=M,k.numPointShadows=b,k.numSpotShadows=E,k.numSpotMaps=w,k.numLightProbes=C,i.version=kE++)}function l(c,u){let f=0,h=0,d=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const b=c[p];if(b.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),f++}else if(b.isSpotLight){const E=i.spot[d];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function ih(n){const e=new HE(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function WE(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ih(n),e.set(r,[o])):s>=a.length?(o=new ih(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const XE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,YE=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],$E=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],rh=new wt,Ms=new K,fl=new K;function KE(n,e,t){let i=new ru;const r=new it,s=new it,a=new Tt,o=new ov,l=new lv,c={},u=t.maxTextureSize,f={[zi]:fn,[fn]:zi,[In]:In},h=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:XE,fragmentShader:qE}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Gn;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new At(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pa;let p=this.type;this.render=function(D,C,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;D.type===ks&&(qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),D.type=Pa);const x=n.getRenderTarget(),T=n.getActiveCubeFace(),V=n.getActiveMipmapLevel(),j=n.state;j.setBlending(pi),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const Y=p!==this.type;Y&&C.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(L=>L.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,L=D.length;q<L;q++){const H=D[q],B=H.shadow;if(B===void 0){qe("WebGLShadowMap:",H,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const W=B.getFrameExtents();if(r.multiply(W),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/W.x),r.x=s.x*W.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/W.y),r.y=s.y*W.y,B.mapSize.y=s.y)),B.map===null||Y===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Es){if(H.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Qn(r.x,r.y,{format:Qr,type:xi,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),B.map.texture.name=H.name+".shadowMap",B.map.depthTexture=new Xs(r.x,r.y,Kn),B.map.depthTexture.name=H.name+".shadowMapDepth",B.map.depthTexture.format=Mi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Vt,B.map.depthTexture.magFilter=Vt}else{H.isPointLight?(B.map=new jd(r.x),B.map.depthTexture=new sv(r.x,ti)):(B.map=new Qn(r.x,r.y),B.map.depthTexture=new Xs(r.x,r.y,ti)),B.map.depthTexture.name=H.name+".shadowMap",B.map.depthTexture.format=Mi;const oe=n.state.buffers.depth.getReversed();this.type===Pa?(B.map.depthTexture.compareFunction=oe?Qc:Jc,B.map.depthTexture.minFilter=Bt,B.map.depthTexture.magFilter=Bt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Vt,B.map.depthTexture.magFilter=Vt)}B.camera.updateProjectionMatrix()}const se=B.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<se;oe++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,oe),n.clear();else{oe===0&&(n.setRenderTarget(B.map),n.clear());const me=B.getViewport(oe);a.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),j.viewport(a)}if(H.isPointLight){const me=B.camera,Te=B.matrix,Ie=H.distance||me.far;Ie!==me.far&&(me.far=Ie,me.updateProjectionMatrix()),Ms.setFromMatrixPosition(H.matrixWorld),me.position.copy(Ms),fl.copy(me.position),fl.add(YE[oe]),me.up.copy($E[oe]),me.lookAt(fl),me.updateMatrixWorld(),Te.makeTranslation(-Ms.x,-Ms.y,-Ms.z),rh.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),B._frustum.setFromProjectionMatrix(rh,me.coordinateSystem,me.reversedDepth)}else B.updateMatrices(H);i=B.getFrustum(),E(C,k,B.camera,H,this.type)}B.isPointLightShadow!==!0&&this.type===Es&&M(B,k),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(x,T,V)};function M(D,C){const k=e.update(v);h.defines.VSM_SAMPLES!==D.blurSamples&&(h.defines.VSM_SAMPLES=D.blurSamples,d.defines.VSM_SAMPLES=D.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Qn(r.x,r.y,{format:Qr,type:xi})),h.uniforms.shadow_pass.value=D.map.depthTexture,h.uniforms.resolution.value=D.mapSize,h.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(C,null,k,h,v,null),d.uniforms.shadow_pass.value=D.mapPass.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(C,null,k,d,v,null)}function b(D,C,k,x){let T=null;const V=k.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(V!==void 0)T=V;else if(T=k.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const j=T.uuid,Y=C.uuid;let q=c[j];q===void 0&&(q={},c[j]=q);let L=q[Y];L===void 0&&(L=T.clone(),q[Y]=L,C.addEventListener("dispose",w)),T=L}if(T.visible=C.visible,T.wireframe=C.wireframe,x===Es?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:f[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,k.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const j=n.properties.get(T);j.light=k}return T}function E(D,C,k,x,T){if(D.visible===!1)return;if(D.layers.test(C.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&T===Es)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,D.matrixWorld);const Y=e.update(D),q=D.material;if(Array.isArray(q)){const L=Y.groups;for(let H=0,B=L.length;H<B;H++){const W=L[H],se=q[W.materialIndex];if(se&&se.visible){const oe=b(D,se,x,T);D.onBeforeShadow(n,D,C,k,Y,oe,W),n.renderBufferDirect(k,null,Y,oe,D,W),D.onAfterShadow(n,D,C,k,Y,oe,W)}}}else if(q.visible){const L=b(D,q,x,T);D.onBeforeShadow(n,D,C,k,Y,L,null),n.renderBufferDirect(k,null,Y,L,D,null),D.onAfterShadow(n,D,C,k,Y,L,null)}}const j=D.children;for(let Y=0,q=j.length;Y<q;Y++)E(j[Y],C,k,x,T)}function w(D){D.target.removeEventListener("dispose",w);for(const k in c){const x=c[k],T=D.target.uuid;T in x&&(x[T].dispose(),delete x[T])}}}const jE={[Cl]:Pl,[Dl]:Ul,[Il]:Nl,[Zr]:Ll,[Pl]:Cl,[Ul]:Dl,[Nl]:Il,[Ll]:Zr};function ZE(n,e){function t(){let z=!1;const Ce=new Tt;let we=null;const Pe=new Tt(0,0,0,0);return{setMask:function(Se){we!==Se&&!z&&(n.colorMask(Se,Se,Se,Se),we=Se)},setLocked:function(Se){z=Se},setClear:function(Se,he,Re,He,tt){tt===!0&&(Se*=He,he*=He,Re*=He),Ce.set(Se,he,Re,He),Pe.equals(Ce)===!1&&(n.clearColor(Se,he,Re,He),Pe.copy(Ce))},reset:function(){z=!1,we=null,Pe.set(-1,0,0,0)}}}function i(){let z=!1,Ce=!1,we=null,Pe=null,Se=null;return{setReversed:function(he){if(Ce!==he){const Re=e.get("EXT_clip_control");he?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),Ce=he;const He=Se;Se=null,this.setClear(He)}},getReversed:function(){return Ce},setTest:function(he){he?I(n.DEPTH_TEST):Q(n.DEPTH_TEST)},setMask:function(he){we!==he&&!z&&(n.depthMask(he),we=he)},setFunc:function(he){if(Ce&&(he=jE[he]),Pe!==he){switch(he){case Cl:n.depthFunc(n.NEVER);break;case Pl:n.depthFunc(n.ALWAYS);break;case Dl:n.depthFunc(n.LESS);break;case Zr:n.depthFunc(n.LEQUAL);break;case Il:n.depthFunc(n.EQUAL);break;case Ll:n.depthFunc(n.GEQUAL);break;case Ul:n.depthFunc(n.GREATER);break;case Nl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Pe=he}},setLocked:function(he){z=he},setClear:function(he){Se!==he&&(Ce&&(he=1-he),n.clearDepth(he),Se=he)},reset:function(){z=!1,we=null,Pe=null,Se=null,Ce=!1}}}function r(){let z=!1,Ce=null,we=null,Pe=null,Se=null,he=null,Re=null,He=null,tt=null;return{setTest:function(Qe){z||(Qe?I(n.STENCIL_TEST):Q(n.STENCIL_TEST))},setMask:function(Qe){Ce!==Qe&&!z&&(n.stencilMask(Qe),Ce=Qe)},setFunc:function(Qe,Dt,Gt){(we!==Qe||Pe!==Dt||Se!==Gt)&&(n.stencilFunc(Qe,Dt,Gt),we=Qe,Pe=Dt,Se=Gt)},setOp:function(Qe,Dt,Gt){(he!==Qe||Re!==Dt||He!==Gt)&&(n.stencilOp(Qe,Dt,Gt),he=Qe,Re=Dt,He=Gt)},setLocked:function(Qe){z=Qe},setClear:function(Qe){tt!==Qe&&(n.clearStencil(Qe),tt=Qe)},reset:function(){z=!1,Ce=null,we=null,Pe=null,Se=null,he=null,Re=null,He=null,tt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,v=!1,m=null,p=null,M=null,b=null,E=null,w=null,D=null,C=new We(0,0,0),k=0,x=!1,T=null,V=null,j=null,Y=null,q=null;const L=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,B=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=B>=1):W.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=B>=2);let se=null,oe={};const me=n.getParameter(n.SCISSOR_BOX),Te=n.getParameter(n.VIEWPORT),Ie=new Tt().fromArray(me),Be=new Tt().fromArray(Te);function Ae(z,Ce,we,Pe){const Se=new Uint8Array(4),he=n.createTexture();n.bindTexture(z,he),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Re=0;Re<we;Re++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(Ce,0,n.RGBA,1,1,Pe,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(Ce+Re,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return he}const $={};$[n.TEXTURE_2D]=Ae(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=Ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=Ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=Ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),I(n.DEPTH_TEST),a.setFunc(Zr),te(!1),le(lf),I(n.CULL_FACE),G(pi);function I(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Q(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function ae(z,Ce){return f[z]!==Ce?(n.bindFramebuffer(z,Ce),f[z]=Ce,z===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Ce),z===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Ce),!0):!1}function pe(z,Ce){let we=d,Pe=!1;if(z){we=h.get(Ce),we===void 0&&(we=[],h.set(Ce,we));const Se=z.textures;if(we.length!==Se.length||we[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Re=Se.length;he<Re;he++)we[he]=n.COLOR_ATTACHMENT0+he;we.length=Se.length,Pe=!0}}else we[0]!==n.BACK&&(we[0]=n.BACK,Pe=!0);Pe&&n.drawBuffers(we)}function De(z){return g!==z?(n.useProgram(z),g=z,!0):!1}const R={[sr]:n.FUNC_ADD,[Q0]:n.FUNC_SUBTRACT,[e_]:n.FUNC_REVERSE_SUBTRACT};R[t_]=n.MIN,R[n_]=n.MAX;const P={[i_]:n.ZERO,[r_]:n.ONE,[s_]:n.SRC_COLOR,[wl]:n.SRC_ALPHA,[f_]:n.SRC_ALPHA_SATURATE,[c_]:n.DST_COLOR,[o_]:n.DST_ALPHA,[a_]:n.ONE_MINUS_SRC_COLOR,[Rl]:n.ONE_MINUS_SRC_ALPHA,[u_]:n.ONE_MINUS_DST_COLOR,[l_]:n.ONE_MINUS_DST_ALPHA,[h_]:n.CONSTANT_COLOR,[d_]:n.ONE_MINUS_CONSTANT_COLOR,[p_]:n.CONSTANT_ALPHA,[m_]:n.ONE_MINUS_CONSTANT_ALPHA};function G(z,Ce,we,Pe,Se,he,Re,He,tt,Qe){if(z===pi){v===!0&&(Q(n.BLEND),v=!1);return}if(v===!1&&(I(n.BLEND),v=!0),z!==J0){if(z!==m||Qe!==x){if((p!==sr||E!==sr)&&(n.blendEquation(n.FUNC_ADD),p=sr,E=sr),Qe)switch(z){case Xr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cf:n.blendFunc(n.ONE,n.ONE);break;case uf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ff:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:st("WebGLState: Invalid blending: ",z);break}else switch(z){case Xr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cf:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case uf:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ff:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",z);break}M=null,b=null,w=null,D=null,C.set(0,0,0),k=0,m=z,x=Qe}return}Se=Se||Ce,he=he||we,Re=Re||Pe,(Ce!==p||Se!==E)&&(n.blendEquationSeparate(R[Ce],R[Se]),p=Ce,E=Se),(we!==M||Pe!==b||he!==w||Re!==D)&&(n.blendFuncSeparate(P[we],P[Pe],P[he],P[Re]),M=we,b=Pe,w=he,D=Re),(He.equals(C)===!1||tt!==k)&&(n.blendColor(He.r,He.g,He.b,tt),C.copy(He),k=tt),m=z,x=!1}function ne(z,Ce){z.side===In?Q(n.CULL_FACE):I(n.CULL_FACE);let we=z.side===fn;Ce&&(we=!we),te(we),z.blending===Xr&&z.transparent===!1?G(pi):G(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const Pe=z.stencilWrite;o.setTest(Pe),Pe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Ee(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?I(n.SAMPLE_ALPHA_TO_COVERAGE):Q(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(z){T!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),T=z)}function le(z){z!==j0?(I(n.CULL_FACE),z!==V&&(z===lf?n.cullFace(n.BACK):z===Z0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Q(n.CULL_FACE),V=z}function A(z){z!==j&&(H&&n.lineWidth(z),j=z)}function Ee(z,Ce,we){z?(I(n.POLYGON_OFFSET_FILL),(Y!==Ce||q!==we)&&(n.polygonOffset(Ce,we),Y=Ce,q=we)):Q(n.POLYGON_OFFSET_FILL)}function ge(z){z?I(n.SCISSOR_TEST):Q(n.SCISSOR_TEST)}function ue(z){z===void 0&&(z=n.TEXTURE0+L-1),se!==z&&(n.activeTexture(z),se=z)}function fe(z,Ce,we){we===void 0&&(se===null?we=n.TEXTURE0+L-1:we=se);let Pe=oe[we];Pe===void 0&&(Pe={type:void 0,texture:void 0},oe[we]=Pe),(Pe.type!==z||Pe.texture!==Ce)&&(se!==we&&(n.activeTexture(we),se=we),n.bindTexture(z,Ce||$[z]),Pe.type=z,Pe.texture=Ce)}function S(){const z=oe[se];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(z){st("WebGLState:",z)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(z){st("WebGLState:",z)}}function O(){try{n.texSubImage2D(...arguments)}catch(z){st("WebGLState:",z)}}function U(){try{n.texSubImage3D(...arguments)}catch(z){st("WebGLState:",z)}}function N(){try{n.compressedTexSubImage2D(...arguments)}catch(z){st("WebGLState:",z)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(z){st("WebGLState:",z)}}function Z(){try{n.texStorage2D(...arguments)}catch(z){st("WebGLState:",z)}}function ve(){try{n.texStorage3D(...arguments)}catch(z){st("WebGLState:",z)}}function xe(){try{n.texImage2D(...arguments)}catch(z){st("WebGLState:",z)}}function ee(){try{n.texImage3D(...arguments)}catch(z){st("WebGLState:",z)}}function be(z){Ie.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Ie.copy(z))}function de(z){Be.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Be.copy(z))}function ye(z,Ce){let we=c.get(Ce);we===void 0&&(we=new WeakMap,c.set(Ce,we));let Pe=we.get(z);Pe===void 0&&(Pe=n.getUniformBlockIndex(Ce,z.name),we.set(z,Pe))}function _e(z,Ce){const Pe=c.get(Ce).get(z);l.get(Ce)!==Pe&&(n.uniformBlockBinding(Ce,Pe,z.__bindingPointIndex),l.set(Ce,Pe))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},se=null,oe={},f={},h=new WeakMap,d=[],g=null,v=!1,m=null,p=null,M=null,b=null,E=null,w=null,D=null,C=new We(0,0,0),k=0,x=!1,T=null,V=null,j=null,Y=null,q=null,Ie.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:I,disable:Q,bindFramebuffer:ae,drawBuffers:pe,useProgram:De,setBlending:G,setMaterial:ne,setFlipSided:te,setCullFace:le,setLineWidth:A,setPolygonOffset:Ee,setScissorTest:ge,activeTexture:ue,bindTexture:fe,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:xe,texImage3D:ee,updateUBOMapping:ye,uniformBlockBinding:_e,texStorage2D:Z,texStorage3D:ve,texSubImage2D:O,texSubImage3D:U,compressedTexSubImage2D:N,compressedTexSubImage3D:Me,scissor:be,viewport:de,reset:Fe}}function JE(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,_){return d?new OffscreenCanvas(S,_):qa("canvas")}function v(S,_,F){let O=1;const U=fe(S);if((U.width>F||U.height>F)&&(O=F/Math.max(U.width,U.height)),O<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const N=Math.floor(O*U.width),Me=Math.floor(O*U.height);f===void 0&&(f=g(N,Me));const Z=_?g(N,Me):f;return Z.width=N,Z.height=Me,Z.getContext("2d").drawImage(S,0,0,N,Me),qe("WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+N+"x"+Me+")."),Z}else return"data"in S&&qe("WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),S;return S}function m(S){return S.generateMipmaps}function p(S){n.generateMipmap(S)}function M(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(S,_,F,O,U=!1){if(S!==null){if(n[S]!==void 0)return n[S];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let N=_;if(_===n.RED&&(F===n.FLOAT&&(N=n.R32F),F===n.HALF_FLOAT&&(N=n.R16F),F===n.UNSIGNED_BYTE&&(N=n.R8)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(N=n.R8UI),F===n.UNSIGNED_SHORT&&(N=n.R16UI),F===n.UNSIGNED_INT&&(N=n.R32UI),F===n.BYTE&&(N=n.R8I),F===n.SHORT&&(N=n.R16I),F===n.INT&&(N=n.R32I)),_===n.RG&&(F===n.FLOAT&&(N=n.RG32F),F===n.HALF_FLOAT&&(N=n.RG16F),F===n.UNSIGNED_BYTE&&(N=n.RG8)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(N=n.RG8UI),F===n.UNSIGNED_SHORT&&(N=n.RG16UI),F===n.UNSIGNED_INT&&(N=n.RG32UI),F===n.BYTE&&(N=n.RG8I),F===n.SHORT&&(N=n.RG16I),F===n.INT&&(N=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(N=n.RGB8UI),F===n.UNSIGNED_SHORT&&(N=n.RGB16UI),F===n.UNSIGNED_INT&&(N=n.RGB32UI),F===n.BYTE&&(N=n.RGB8I),F===n.SHORT&&(N=n.RGB16I),F===n.INT&&(N=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(N=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(N=n.RGBA16UI),F===n.UNSIGNED_INT&&(N=n.RGBA32UI),F===n.BYTE&&(N=n.RGBA8I),F===n.SHORT&&(N=n.RGBA16I),F===n.INT&&(N=n.RGBA32I)),_===n.RGB&&(F===n.UNSIGNED_INT_5_9_9_9_REV&&(N=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(N=n.R11F_G11F_B10F)),_===n.RGBA){const Me=U?Wa:nt.getTransfer(O);F===n.FLOAT&&(N=n.RGBA32F),F===n.HALF_FLOAT&&(N=n.RGBA16F),F===n.UNSIGNED_BYTE&&(N=Me===ht?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(N=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(N=n.RGB5_A1)}return(N===n.R16F||N===n.R32F||N===n.RG16F||N===n.RG32F||N===n.RGBA16F||N===n.RGBA32F)&&e.get("EXT_color_buffer_float"),N}function E(S,_){let F;return S?_===null||_===ti||_===Hs?F=n.DEPTH24_STENCIL8:_===Kn?F=n.DEPTH32F_STENCIL8:_===Gs&&(F=n.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ti||_===Hs?F=n.DEPTH_COMPONENT24:_===Kn?F=n.DEPTH_COMPONENT32F:_===Gs&&(F=n.DEPTH_COMPONENT16),F}function w(S,_){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==Vt&&S.minFilter!==Bt?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function D(S){const _=S.target;_.removeEventListener("dispose",D),k(_),_.isVideoTexture&&u.delete(_)}function C(S){const _=S.target;_.removeEventListener("dispose",C),T(_)}function k(S){const _=i.get(S);if(_.__webglInit===void 0)return;const F=S.source,O=h.get(F);if(O){const U=O[_.__cacheKey];U.usedTimes--,U.usedTimes===0&&x(S),Object.keys(O).length===0&&h.delete(F)}i.remove(S)}function x(S){const _=i.get(S);n.deleteTexture(_.__webglTexture);const F=S.source,O=h.get(F);delete O[_.__cacheKey],a.memory.textures--}function T(S){const _=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(_.__webglFramebuffer[O]))for(let U=0;U<_.__webglFramebuffer[O].length;U++)n.deleteFramebuffer(_.__webglFramebuffer[O][U]);else n.deleteFramebuffer(_.__webglFramebuffer[O]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[O])}else{if(Array.isArray(_.__webglFramebuffer))for(let O=0;O<_.__webglFramebuffer.length;O++)n.deleteFramebuffer(_.__webglFramebuffer[O]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let O=0;O<_.__webglColorRenderbuffer.length;O++)_.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[O]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=S.textures;for(let O=0,U=F.length;O<U;O++){const N=i.get(F[O]);N.__webglTexture&&(n.deleteTexture(N.__webglTexture),a.memory.textures--),i.remove(F[O])}i.remove(S)}let V=0;function j(){V=0}function Y(){const S=V;return S>=r.maxTextures&&qe("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),V+=1,S}function q(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function L(S,_){const F=i.get(S);if(S.isVideoTexture&&ge(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&F.__version!==S.version){const O=S.image;if(O===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(F,S,_);return}}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function H(S,_){const F=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){$(F,S,_);return}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function B(S,_){const F=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){$(F,S,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function W(S,_){const F=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&F.__version!==S.version){I(F,S,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const se={[Bl]:n.REPEAT,[Nn]:n.CLAMP_TO_EDGE,[Vl]:n.MIRRORED_REPEAT},oe={[Vt]:n.NEAREST,[v_]:n.NEAREST_MIPMAP_NEAREST,[sa]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[Uo]:n.LINEAR_MIPMAP_NEAREST,[lr]:n.LINEAR_MIPMAP_LINEAR},me={[S_]:n.NEVER,[A_]:n.ALWAYS,[E_]:n.LESS,[Jc]:n.LEQUAL,[y_]:n.EQUAL,[Qc]:n.GEQUAL,[b_]:n.GREATER,[T_]:n.NOTEQUAL};function Te(S,_){if(_.type===Kn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Bt||_.magFilter===Uo||_.magFilter===sa||_.magFilter===lr||_.minFilter===Bt||_.minFilter===Uo||_.minFilter===sa||_.minFilter===lr)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,se[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,se[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,se[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,oe[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,oe[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Vt||_.minFilter!==sa&&_.minFilter!==lr||_.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ie(S,_){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",D));const O=_.source;let U=h.get(O);U===void 0&&(U={},h.set(O,U));const N=q(_);if(N!==S.__cacheKey){U[N]===void 0&&(U[N]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),U[N].usedTimes++;const Me=U[S.__cacheKey];Me!==void 0&&(U[S.__cacheKey].usedTimes--,Me.usedTimes===0&&x(_)),S.__cacheKey=N,S.__webglTexture=U[N].texture}return F}function Be(S,_,F){return Math.floor(Math.floor(S/F)/_)}function Ae(S,_,F,O){const N=S.updateRanges;if(N.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,F,O,_.data);else{N.sort((ee,be)=>ee.start-be.start);let Me=0;for(let ee=1;ee<N.length;ee++){const be=N[Me],de=N[ee],ye=be.start+be.count,_e=Be(de.start,_.width,4),Fe=Be(be.start,_.width,4);de.start<=ye+1&&_e===Fe&&Be(de.start+de.count-1,_.width,4)===_e?be.count=Math.max(be.count,de.start+de.count-be.start):(++Me,N[Me]=de)}N.length=Me+1;const Z=n.getParameter(n.UNPACK_ROW_LENGTH),ve=n.getParameter(n.UNPACK_SKIP_PIXELS),xe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ee=0,be=N.length;ee<be;ee++){const de=N[ee],ye=Math.floor(de.start/4),_e=Math.ceil(de.count/4),Fe=ye%_.width,z=Math.floor(ye/_.width),Ce=_e,we=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,Fe,z,Ce,we,F,O,_.data)}S.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,Z),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ve),n.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function $(S,_,F){let O=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(O=n.TEXTURE_3D);const U=Ie(S,_),N=_.source;t.bindTexture(O,S.__webglTexture,n.TEXTURE0+F);const Me=i.get(N);if(N.version!==Me.__version||U===!0){t.activeTexture(n.TEXTURE0+F);const Z=nt.getPrimaries(nt.workingColorSpace),ve=_.colorSpace===Ui?null:nt.getPrimaries(_.colorSpace),xe=_.colorSpace===Ui||Z===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let ee=v(_.image,!1,r.maxTextureSize);ee=ue(_,ee);const be=s.convert(_.format,_.colorSpace),de=s.convert(_.type);let ye=b(_.internalFormat,be,de,_.colorSpace,_.isVideoTexture);Te(O,_);let _e;const Fe=_.mipmaps,z=_.isVideoTexture!==!0,Ce=Me.__version===void 0||U===!0,we=N.dataReady,Pe=w(_,ee);if(_.isDepthTexture)ye=E(_.format===cr,_.type),Ce&&(z?t.texStorage2D(n.TEXTURE_2D,1,ye,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,ye,ee.width,ee.height,0,be,de,null));else if(_.isDataTexture)if(Fe.length>0){z&&Ce&&t.texStorage2D(n.TEXTURE_2D,Pe,ye,Fe[0].width,Fe[0].height);for(let Se=0,he=Fe.length;Se<he;Se++)_e=Fe[Se],z?we&&t.texSubImage2D(n.TEXTURE_2D,Se,0,0,_e.width,_e.height,be,de,_e.data):t.texImage2D(n.TEXTURE_2D,Se,ye,_e.width,_e.height,0,be,de,_e.data);_.generateMipmaps=!1}else z?(Ce&&t.texStorage2D(n.TEXTURE_2D,Pe,ye,ee.width,ee.height),we&&Ae(_,ee,be,de)):t.texImage2D(n.TEXTURE_2D,0,ye,ee.width,ee.height,0,be,de,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){z&&Ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Pe,ye,Fe[0].width,Fe[0].height,ee.depth);for(let Se=0,he=Fe.length;Se<he;Se++)if(_e=Fe[Se],_.format!==Fn)if(be!==null)if(z){if(we)if(_.layerUpdates.size>0){const Re=Nf(_e.width,_e.height,_.format,_.type);for(const He of _.layerUpdates){const tt=_e.data.subarray(He*Re/_e.data.BYTES_PER_ELEMENT,(He+1)*Re/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Se,0,0,He,_e.width,_e.height,1,be,tt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Se,0,0,0,_e.width,_e.height,ee.depth,be,_e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Se,ye,_e.width,_e.height,ee.depth,0,_e.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?we&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Se,0,0,0,_e.width,_e.height,ee.depth,be,de,_e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Se,ye,_e.width,_e.height,ee.depth,0,be,de,_e.data)}else{z&&Ce&&t.texStorage2D(n.TEXTURE_2D,Pe,ye,Fe[0].width,Fe[0].height);for(let Se=0,he=Fe.length;Se<he;Se++)_e=Fe[Se],_.format!==Fn?be!==null?z?we&&t.compressedTexSubImage2D(n.TEXTURE_2D,Se,0,0,_e.width,_e.height,be,_e.data):t.compressedTexImage2D(n.TEXTURE_2D,Se,ye,_e.width,_e.height,0,_e.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?we&&t.texSubImage2D(n.TEXTURE_2D,Se,0,0,_e.width,_e.height,be,de,_e.data):t.texImage2D(n.TEXTURE_2D,Se,ye,_e.width,_e.height,0,be,de,_e.data)}else if(_.isDataArrayTexture)if(z){if(Ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Pe,ye,ee.width,ee.height,ee.depth),we)if(_.layerUpdates.size>0){const Se=Nf(ee.width,ee.height,_.format,_.type);for(const he of _.layerUpdates){const Re=ee.data.subarray(he*Se/ee.data.BYTES_PER_ELEMENT,(he+1)*Se/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,he,ee.width,ee.height,1,be,de,Re)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,be,de,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ye,ee.width,ee.height,ee.depth,0,be,de,ee.data);else if(_.isData3DTexture)z?(Ce&&t.texStorage3D(n.TEXTURE_3D,Pe,ye,ee.width,ee.height,ee.depth),we&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,be,de,ee.data)):t.texImage3D(n.TEXTURE_3D,0,ye,ee.width,ee.height,ee.depth,0,be,de,ee.data);else if(_.isFramebufferTexture){if(Ce)if(z)t.texStorage2D(n.TEXTURE_2D,Pe,ye,ee.width,ee.height);else{let Se=ee.width,he=ee.height;for(let Re=0;Re<Pe;Re++)t.texImage2D(n.TEXTURE_2D,Re,ye,Se,he,0,be,de,null),Se>>=1,he>>=1}}else if(Fe.length>0){if(z&&Ce){const Se=fe(Fe[0]);t.texStorage2D(n.TEXTURE_2D,Pe,ye,Se.width,Se.height)}for(let Se=0,he=Fe.length;Se<he;Se++)_e=Fe[Se],z?we&&t.texSubImage2D(n.TEXTURE_2D,Se,0,0,be,de,_e):t.texImage2D(n.TEXTURE_2D,Se,ye,be,de,_e);_.generateMipmaps=!1}else if(z){if(Ce){const Se=fe(ee);t.texStorage2D(n.TEXTURE_2D,Pe,ye,Se.width,Se.height)}we&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,de,ee)}else t.texImage2D(n.TEXTURE_2D,0,ye,be,de,ee);m(_)&&p(O),Me.__version=N.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function I(S,_,F){if(_.image.length!==6)return;const O=Ie(S,_),U=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+F);const N=i.get(U);if(U.version!==N.__version||O===!0){t.activeTexture(n.TEXTURE0+F);const Me=nt.getPrimaries(nt.workingColorSpace),Z=_.colorSpace===Ui?null:nt.getPrimaries(_.colorSpace),ve=_.colorSpace===Ui||Me===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const xe=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,be=[];for(let he=0;he<6;he++)!xe&&!ee?be[he]=v(_.image[he],!0,r.maxCubemapSize):be[he]=ee?_.image[he].image:_.image[he],be[he]=ue(_,be[he]);const de=be[0],ye=s.convert(_.format,_.colorSpace),_e=s.convert(_.type),Fe=b(_.internalFormat,ye,_e,_.colorSpace),z=_.isVideoTexture!==!0,Ce=N.__version===void 0||O===!0,we=U.dataReady;let Pe=w(_,de);Te(n.TEXTURE_CUBE_MAP,_);let Se;if(xe){z&&Ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Pe,Fe,de.width,de.height);for(let he=0;he<6;he++){Se=be[he].mipmaps;for(let Re=0;Re<Se.length;Re++){const He=Se[Re];_.format!==Fn?ye!==null?z?we&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re,0,0,He.width,He.height,ye,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re,Fe,He.width,He.height,0,He.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re,0,0,He.width,He.height,ye,_e,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re,Fe,He.width,He.height,0,ye,_e,He.data)}}}else{if(Se=_.mipmaps,z&&Ce){Se.length>0&&Pe++;const he=fe(be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Pe,Fe,he.width,he.height)}for(let he=0;he<6;he++)if(ee){z?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,be[he].width,be[he].height,ye,_e,be[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Fe,be[he].width,be[he].height,0,ye,_e,be[he].data);for(let Re=0;Re<Se.length;Re++){const tt=Se[Re].image[he].image;z?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re+1,0,0,tt.width,tt.height,ye,_e,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re+1,Fe,tt.width,tt.height,0,ye,_e,tt.data)}}else{z?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ye,_e,be[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Fe,ye,_e,be[he]);for(let Re=0;Re<Se.length;Re++){const He=Se[Re];z?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re+1,0,0,ye,_e,He.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re+1,Fe,ye,_e,He.image[he])}}}m(_)&&p(n.TEXTURE_CUBE_MAP),N.__version=U.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Q(S,_,F,O,U,N){const Me=s.convert(F.format,F.colorSpace),Z=s.convert(F.type),ve=b(F.internalFormat,Me,Z,F.colorSpace),xe=i.get(_),ee=i.get(F);if(ee.__renderTarget=_,!xe.__hasExternalTextures){const be=Math.max(1,_.width>>N),de=Math.max(1,_.height>>N);U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?t.texImage3D(U,N,ve,be,de,_.depth,0,Me,Z,null):t.texImage2D(U,N,ve,be,de,0,Me,Z,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),Ee(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,U,ee.__webglTexture,0,A(_)):(U===n.TEXTURE_2D||U>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&U<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,U,ee.__webglTexture,N),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(S,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer){const O=_.depthTexture,U=O&&O.isDepthTexture?O.type:null,N=E(_.stencilBuffer,U),Me=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ee(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,A(_),N,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,A(_),N,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,N,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,S)}else{const O=_.textures;for(let U=0;U<O.length;U++){const N=O[U],Me=s.convert(N.format,N.colorSpace),Z=s.convert(N.type),ve=b(N.internalFormat,Me,Z,N.colorSpace);Ee(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,A(_),ve,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,A(_),ve,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ve,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pe(S,_,F){const O=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const U=i.get(_.depthTexture);if(U.__renderTarget=_,(!U.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),O){if(U.__webglInit===void 0&&(U.__webglInit=!0,_.depthTexture.addEventListener("dispose",D)),U.__webglTexture===void 0){U.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),Te(n.TEXTURE_CUBE_MAP,_.depthTexture);const xe=s.convert(_.depthTexture.format),ee=s.convert(_.depthTexture.type);let be;_.depthTexture.format===Mi?be=n.DEPTH_COMPONENT24:_.depthTexture.format===cr&&(be=n.DEPTH24_STENCIL8);for(let de=0;de<6;de++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,be,_.width,_.height,0,xe,ee,null)}}else L(_.depthTexture,0);const N=U.__webglTexture,Me=A(_),Z=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,ve=_.depthTexture.format===cr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Mi)Ee(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ve,Z,N,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ve,Z,N,0);else if(_.depthTexture.format===cr)Ee(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ve,Z,N,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ve,Z,N,0);else throw new Error("Unknown depthTexture format")}function De(S){const _=i.get(S),F=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){const O=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),O){const U=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,O.removeEventListener("dispose",U)};O.addEventListener("dispose",U),_.__depthDisposeCallback=U}_.__boundDepthTexture=O}if(S.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let O=0;O<6;O++)pe(_.__webglFramebuffer[O],S,O);else{const O=S.texture.mipmaps;O&&O.length>0?pe(_.__webglFramebuffer[0],S,0):pe(_.__webglFramebuffer,S,0)}else if(F){_.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[O]),_.__webglDepthbuffer[O]===void 0)_.__webglDepthbuffer[O]=n.createRenderbuffer(),ae(_.__webglDepthbuffer[O],S,!1);else{const U=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,N=_.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,N),n.framebufferRenderbuffer(n.FRAMEBUFFER,U,n.RENDERBUFFER,N)}}else{const O=S.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ae(_.__webglDepthbuffer,S,!1);else{const U=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,N=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,N),n.framebufferRenderbuffer(n.FRAMEBUFFER,U,n.RENDERBUFFER,N)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function R(S,_,F){const O=i.get(S);_!==void 0&&Q(O.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&De(S)}function P(S){const _=S.texture,F=i.get(S),O=i.get(_);S.addEventListener("dispose",C);const U=S.textures,N=S.isWebGLCubeRenderTarget===!0,Me=U.length>1;if(Me||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=_.version,a.memory.textures++),N){F.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[Z]=[];for(let ve=0;ve<_.mipmaps.length;ve++)F.__webglFramebuffer[Z][ve]=n.createFramebuffer()}else F.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let Z=0;Z<_.mipmaps.length;Z++)F.__webglFramebuffer[Z]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Me)for(let Z=0,ve=U.length;Z<ve;Z++){const xe=i.get(U[Z]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&Ee(S)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Z=0;Z<U.length;Z++){const ve=U[Z];F.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[Z]);const xe=s.convert(ve.format,ve.colorSpace),ee=s.convert(ve.type),be=b(ve.internalFormat,xe,ee,ve.colorSpace,S.isXRRenderTarget===!0),de=A(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,de,be,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,F.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ae(F.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(N){t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),Te(n.TEXTURE_CUBE_MAP,_);for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)Q(F.__webglFramebuffer[Z][ve],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ve);else Q(F.__webglFramebuffer[Z],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let Z=0,ve=U.length;Z<ve;Z++){const xe=U[Z],ee=i.get(xe);let be=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(be=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(be,ee.__webglTexture),Te(be,xe),Q(F.__webglFramebuffer,S,xe,n.COLOR_ATTACHMENT0+Z,be,0),m(xe)&&p(be)}t.unbindTexture()}else{let Z=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Z=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,O.__webglTexture),Te(Z,_),_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)Q(F.__webglFramebuffer[ve],S,_,n.COLOR_ATTACHMENT0,Z,ve);else Q(F.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,Z,0);m(_)&&p(Z),t.unbindTexture()}S.depthBuffer&&De(S)}function G(S){const _=S.textures;for(let F=0,O=_.length;F<O;F++){const U=_[F];if(m(U)){const N=M(S),Me=i.get(U).__webglTexture;t.bindTexture(N,Me),p(N),t.unbindTexture()}}}const ne=[],te=[];function le(S){if(S.samples>0){if(Ee(S)===!1){const _=S.textures,F=S.width,O=S.height;let U=n.COLOR_BUFFER_BIT;const N=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(S),Z=_.length>1;if(Z)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ve=S.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(U|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(U|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[xe]);const ee=i.get(_[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,F,O,0,0,F,O,U,n.NEAREST),l===!0&&(ne.length=0,te.length=0,ne.push(n.COLOR_ATTACHMENT0+xe),S.depthBuffer&&S.resolveDepthBuffer===!1&&(ne.push(N),te.push(N),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,te)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,Me.__webglColorRenderbuffer[xe]);const ee=i.get(_[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const _=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function A(S){return Math.min(r.maxSamples,S.samples)}function Ee(S){const _=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ge(S){const _=a.render.frame;u.get(S)!==_&&(u.set(S,_),S.update())}function ue(S,_){const F=S.colorSpace,O=S.format,U=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||F!==es&&F!==Ui&&(nt.getTransfer(F)===ht?(O!==Fn||U!==vn)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",F)),_}function fe(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=j,this.setTexture2D=L,this.setTexture2DArray=H,this.setTexture3D=B,this.setTextureCube=W,this.rebindTextures=R,this.setupRenderTarget=P,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function QE(n,e){function t(i,r=Ui){let s;const a=nt.getTransfer(r);if(i===vn)return n.UNSIGNED_BYTE;if(i===qc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Fd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Od)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ud)return n.BYTE;if(i===Nd)return n.SHORT;if(i===Gs)return n.UNSIGNED_SHORT;if(i===Xc)return n.INT;if(i===ti)return n.UNSIGNED_INT;if(i===Kn)return n.FLOAT;if(i===xi)return n.HALF_FLOAT;if(i===Bd)return n.ALPHA;if(i===Vd)return n.RGB;if(i===Fn)return n.RGBA;if(i===Mi)return n.DEPTH_COMPONENT;if(i===cr)return n.DEPTH_STENCIL;if(i===zd)return n.RED;if(i===$c)return n.RED_INTEGER;if(i===Qr)return n.RG;if(i===Kc)return n.RG_INTEGER;if(i===jc)return n.RGBA_INTEGER;if(i===Da||i===Ia||i===La||i===Ua)if(a===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Da)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ia)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===La)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Da)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ia)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===La)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ua)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zl||i===kl||i===Gl||i===Hl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===kl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wl||i===Xl||i===ql||i===Yl||i===$l||i===Kl||i===jl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Wl||i===Xl)return a===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ql)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Yl)return s.COMPRESSED_R11_EAC;if(i===$l)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Kl)return s.COMPRESSED_RG11_EAC;if(i===jl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zl||i===Jl||i===Ql||i===ec||i===tc||i===nc||i===ic||i===rc||i===sc||i===ac||i===oc||i===lc||i===cc||i===uc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Jl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ql)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ec)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===tc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ic)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===sc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ac)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===oc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uc)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fc||i===hc||i===dc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===fc)return a===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===hc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pc||i===mc||i===gc||i===_c)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===pc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===mc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===gc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_c)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const ey=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ty=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ny{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Zd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ni({vertexShader:ey,fragmentShader:ty,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class iy extends is{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new ny,p={},M=t.getContextAttributes();let b=null,E=null;const w=[],D=[],C=new it;let k=null;const x=new cn;x.viewport=new Tt;const T=new cn;T.viewport=new Tt;const V=[x,T],j=new hv;let Y=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let I=w[$];return I===void 0&&(I=new il,w[$]=I),I.getTargetRaySpace()},this.getControllerGrip=function($){let I=w[$];return I===void 0&&(I=new il,w[$]=I),I.getGripSpace()},this.getHand=function($){let I=w[$];return I===void 0&&(I=new il,w[$]=I),I.getHandSpace()};function L($){const I=D.indexOf($.inputSource);if(I===-1)return;const Q=w[I];Q!==void 0&&(Q.update($.inputSource,$.frame,c||a),Q.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){r.removeEventListener("select",L),r.removeEventListener("selectstart",L),r.removeEventListener("selectend",L),r.removeEventListener("squeeze",L),r.removeEventListener("squeezestart",L),r.removeEventListener("squeezeend",L),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",B);for(let $=0;$<w.length;$++){const I=D[$];I!==null&&(D[$]=null,w[$].disconnect(I))}Y=null,q=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(b),d=null,h=null,f=null,r=null,E=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(k),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",L),r.addEventListener("selectstart",L),r.addEventListener("selectend",L),r.addEventListener("squeeze",L),r.addEventListener("squeezestart",L),r.addEventListener("squeezeend",L),r.addEventListener("end",H),r.addEventListener("inputsourceschange",B),M.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,ae=null,pe=null;M.depth&&(pe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=M.stencil?cr:Mi,ae=M.stencil?Hs:ti);const De={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(De),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),E=new Qn(h.textureWidth,h.textureHeight,{format:Fn,type:vn,depthTexture:new Xs(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Q={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Q),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),E=new Qn(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ae.setContext(r),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B($){for(let I=0;I<$.removed.length;I++){const Q=$.removed[I],ae=D.indexOf(Q);ae>=0&&(D[ae]=null,w[ae].disconnect(Q))}for(let I=0;I<$.added.length;I++){const Q=$.added[I];let ae=D.indexOf(Q);if(ae===-1){for(let De=0;De<w.length;De++)if(De>=D.length){D.push(Q),ae=De;break}else if(D[De]===null){D[De]=Q,ae=De;break}if(ae===-1)break}const pe=w[ae];pe&&pe.connect(Q)}}const W=new K,se=new K;function oe($,I,Q){W.setFromMatrixPosition(I.matrixWorld),se.setFromMatrixPosition(Q.matrixWorld);const ae=W.distanceTo(se),pe=I.projectionMatrix.elements,De=Q.projectionMatrix.elements,R=pe[14]/(pe[10]-1),P=pe[14]/(pe[10]+1),G=(pe[9]+1)/pe[5],ne=(pe[9]-1)/pe[5],te=(pe[8]-1)/pe[0],le=(De[8]+1)/De[0],A=R*te,Ee=R*le,ge=ae/(-te+le),ue=ge*-te;if(I.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ue),$.translateZ(ge),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),pe[10]===-1)$.projectionMatrix.copy(I.projectionMatrix),$.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const fe=R+ge,S=P+ge,_=A-ue,F=Ee+(ae-ue),O=G*P/S*fe,U=ne*P/S*fe;$.projectionMatrix.makePerspective(_,F,O,U,fe,S),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function me($,I){I===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(I.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let I=$.near,Q=$.far;m.texture!==null&&(m.depthNear>0&&(I=m.depthNear),m.depthFar>0&&(Q=m.depthFar)),j.near=T.near=x.near=I,j.far=T.far=x.far=Q,(Y!==j.near||q!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),Y=j.near,q=j.far),j.layers.mask=$.layers.mask|6,x.layers.mask=j.layers.mask&3,T.layers.mask=j.layers.mask&5;const ae=$.parent,pe=j.cameras;me(j,ae);for(let De=0;De<pe.length;De++)me(pe[De],ae);pe.length===2?oe(j,x,T):j.projectionMatrix.copy(x.projectionMatrix),Te($,j,ae)};function Te($,I,Q){Q===null?$.matrix.copy(I.matrixWorld):($.matrix.copy(Q.matrixWorld),$.matrix.invert(),$.matrix.multiply(I.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(I.projectionMatrix),$.projectionMatrixInverse.copy(I.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=vc*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(j)},this.getCameraTexture=function($){return p[$]};let Ie=null;function Be($,I){if(u=I.getViewerPose(c||a),g=I,u!==null){const Q=u.views;d!==null&&(e.setRenderTargetFramebuffer(E,d.framebuffer),e.setRenderTarget(E));let ae=!1;Q.length!==j.cameras.length&&(j.cameras.length=0,ae=!0);for(let P=0;P<Q.length;P++){const G=Q[P];let ne=null;if(d!==null)ne=d.getViewport(G);else{const le=f.getViewSubImage(h,G);ne=le.viewport,P===0&&(e.setRenderTargetTextures(E,le.colorTexture,le.depthStencilTexture),e.setRenderTarget(E))}let te=V[P];te===void 0&&(te=new cn,te.layers.enable(P),te.viewport=new Tt,V[P]=te),te.matrix.fromArray(G.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(G.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ne.x,ne.y,ne.width,ne.height),P===0&&(j.matrix.copy(te.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),ae===!0&&j.cameras.push(te)}const pe=r.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const P=f.getDepthInformation(Q[0]);P&&P.isValid&&P.texture&&m.init(P,r.renderState)}if(pe&&pe.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let P=0;P<Q.length;P++){const G=Q[P].camera;if(G){let ne=p[G];ne||(ne=new Zd,p[G]=ne);const te=f.getCameraImage(G);ne.sourceTexture=te}}}}for(let Q=0;Q<w.length;Q++){const ae=D[Q],pe=w[Q];ae!==null&&pe!==void 0&&pe.update(ae,I,c||a)}Ie&&Ie($,I),I.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:I}),g=null}const Ae=new Jd;Ae.setAnimationLoop(Be),this.setAnimationLoop=function($){Ie=$},this.dispose=function(){}}}const nr=new kn,ry=new wt;function sy(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,b,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,E)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===fn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===fn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),b=M.envMap,E=M.envMapRotation;b&&(m.envMap.value=b,nr.copy(E),nr.x*=-1,nr.y*=-1,nr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),m.envMapRotation.value.setFromMatrix4(ry.makeRotationFromEuler(nr)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ay(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){const E=b.program;i.uniformBlockBinding(M,E)}function c(M,b){let E=r[M.id];E===void 0&&(g(M),E=u(M),r[M.id]=E,M.addEventListener("dispose",m));const w=b.program;i.updateUBOMapping(M,w);const D=e.render.frame;s[M.id]!==D&&(h(M),s[M.id]=D)}function u(M){const b=f();M.__bindingPointIndex=b;const E=n.createBuffer(),w=M.__size,D=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,w,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,E),E}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const b=r[M.id],E=M.uniforms,w=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let D=0,C=E.length;D<C;D++){const k=Array.isArray(E[D])?E[D]:[E[D]];for(let x=0,T=k.length;x<T;x++){const V=k[x];if(d(V,D,x,w)===!0){const j=V.__offset,Y=Array.isArray(V.value)?V.value:[V.value];let q=0;for(let L=0;L<Y.length;L++){const H=Y[L],B=v(H);typeof H=="number"||typeof H=="boolean"?(V.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,j+q,V.__data)):H.isMatrix3?(V.__data[0]=H.elements[0],V.__data[1]=H.elements[1],V.__data[2]=H.elements[2],V.__data[3]=0,V.__data[4]=H.elements[3],V.__data[5]=H.elements[4],V.__data[6]=H.elements[5],V.__data[7]=0,V.__data[8]=H.elements[6],V.__data[9]=H.elements[7],V.__data[10]=H.elements[8],V.__data[11]=0):(H.toArray(V.__data,q),q+=B.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,V.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,b,E,w){const D=M.value,C=b+"_"+E;if(w[C]===void 0)return typeof D=="number"||typeof D=="boolean"?w[C]=D:w[C]=D.clone(),!0;{const k=w[C];if(typeof D=="number"||typeof D=="boolean"){if(k!==D)return w[C]=D,!0}else if(k.equals(D)===!1)return k.copy(D),!0}return!1}function g(M){const b=M.uniforms;let E=0;const w=16;for(let C=0,k=b.length;C<k;C++){const x=Array.isArray(b[C])?b[C]:[b[C]];for(let T=0,V=x.length;T<V;T++){const j=x[T],Y=Array.isArray(j.value)?j.value:[j.value];for(let q=0,L=Y.length;q<L;q++){const H=Y[q],B=v(H),W=E%w,se=W%B.boundary,oe=W+se;E+=se,oe!==0&&w-oe<B.storage&&(E+=w-oe),j.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=E,E+=B.storage}}}const D=E%w;return D>0&&(E+=w-D),M.__size=E,M.__cache={},this}function v(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):qe("WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function p(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}const oy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wn=null;function ly(){return Wn===null&&(Wn=new ev(oy,16,16,Qr,xi),Wn.name="DFG_LUT",Wn.minFilter=Bt,Wn.magFilter=Bt,Wn.wrapS=Nn,Wn.wrapT=Nn,Wn.generateMipmaps=!1,Wn.needsUpdate=!0),Wn}class lu{constructor(e={}){const{canvas:t=w_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=vn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=d,m=new Set([jc,Kc,$c]),p=new Set([vn,ti,Gs,Hs,qc,Yc]),M=new Uint32Array(4),b=new Int32Array(4);let E=null,w=null;const D=[],C=[];let k=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let T=!1;this._outputColorSpace=_n;let V=0,j=0,Y=null,q=-1,L=null;const H=new Tt,B=new Tt;let W=null;const se=new We(0);let oe=0,me=t.width,Te=t.height,Ie=1,Be=null,Ae=null;const $=new Tt(0,0,me,Te),I=new Tt(0,0,me,Te);let Q=!1;const ae=new ru;let pe=!1,De=!1;const R=new wt,P=new K,G=new Tt,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function le(){return Y===null?Ie:1}let A=i;function Ee(y,X){return t.getContext(y,X)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gc}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",Qe,!1),A===null){const X="webgl2";if(A=Ee(X,y),A===null)throw Ee(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw st("WebGLRenderer: "+y.message),y}let ge,ue,fe,S,_,F,O,U,N,Me,Z,ve,xe,ee,be,de,ye,_e,Fe,z,Ce,we,Pe,Se;function he(){ge=new lS(A),ge.init(),we=new QE(A,ge),ue=new QM(A,ge,e,we),fe=new ZE(A,ge),ue.reversedDepthBuffer&&h&&fe.buffers.depth.setReversed(!0),S=new fS(A),_=new FE,F=new JE(A,ge,fe,_,ue,we,S),O=new tS(x),U=new oS(x),N=new mv(A),Pe=new ZM(A,N),Me=new cS(A,N,S,Pe),Z=new dS(A,Me,N,S),Fe=new hS(A,ue,F),de=new eS(_),ve=new NE(x,O,U,ge,ue,Pe,de),xe=new sy(x,_),ee=new BE,be=new WE(ge),_e=new jM(x,O,U,fe,Z,g,l),ye=new KE(x,Z,ue),Se=new ay(A,S,ue,fe),z=new JM(A,ge,S),Ce=new uS(A,ge,S),S.programs=ve.programs,x.capabilities=ue,x.extensions=ge,x.properties=_,x.renderLists=ee,x.shadowMap=ye,x.state=fe,x.info=S}he(),v!==vn&&(k=new mS(v,t.width,t.height,r,s));const Re=new iy(x,A);this.xr=Re,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const y=ge.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ge.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(y){y!==void 0&&(Ie=y,this.setSize(me,Te,!1))},this.getSize=function(y){return y.set(me,Te)},this.setSize=function(y,X,re=!0){if(Re.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}me=y,Te=X,t.width=Math.floor(y*Ie),t.height=Math.floor(X*Ie),re===!0&&(t.style.width=y+"px",t.style.height=X+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,y,X)},this.getDrawingBufferSize=function(y){return y.set(me*Ie,Te*Ie).floor()},this.setDrawingBufferSize=function(y,X,re){me=y,Te=X,Ie=re,t.width=Math.floor(y*re),t.height=Math.floor(X*re),this.setViewport(0,0,y,X)},this.setEffects=function(y){if(v===vn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let X=0;X<y.length;X++)if(y[X].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(H)},this.getViewport=function(y){return y.copy($)},this.setViewport=function(y,X,re,ie){y.isVector4?$.set(y.x,y.y,y.z,y.w):$.set(y,X,re,ie),fe.viewport(H.copy($).multiplyScalar(Ie).round())},this.getScissor=function(y){return y.copy(I)},this.setScissor=function(y,X,re,ie){y.isVector4?I.set(y.x,y.y,y.z,y.w):I.set(y,X,re,ie),fe.scissor(B.copy(I).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(y){fe.setScissorTest(Q=y)},this.setOpaqueSort=function(y){Be=y},this.setTransparentSort=function(y){Ae=y},this.getClearColor=function(y){return y.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(y=!0,X=!0,re=!0){let ie=0;if(y){let J=!1;if(Y!==null){const Le=Y.texture.format;J=m.has(Le)}if(J){const Le=Y.texture.type,Oe=p.has(Le),Ne=_e.getClearColor(),Ve=_e.getClearAlpha(),ze=Ne.r,Xe=Ne.g,ke=Ne.b;Oe?(M[0]=ze,M[1]=Xe,M[2]=ke,M[3]=Ve,A.clearBufferuiv(A.COLOR,0,M)):(b[0]=ze,b[1]=Xe,b[2]=ke,b[3]=Ve,A.clearBufferiv(A.COLOR,0,b))}else ie|=A.COLOR_BUFFER_BIT}X&&(ie|=A.DEPTH_BUFFER_BIT),re&&(ie|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",Qe,!1),_e.dispose(),ee.dispose(),be.dispose(),_.dispose(),O.dispose(),U.dispose(),Z.dispose(),Pe.dispose(),Se.dispose(),ve.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Ei),Re.removeEventListener("sessionend",Zs),Kt.stop()};function He(y){y.preventDefault(),gf("WebGLRenderer: Context Lost."),T=!0}function tt(){gf("WebGLRenderer: Context Restored."),T=!1;const y=S.autoReset,X=ye.enabled,re=ye.autoUpdate,ie=ye.needsUpdate,J=ye.type;he(),S.autoReset=y,ye.enabled=X,ye.autoUpdate=re,ye.needsUpdate=ie,ye.type=J}function Qe(y){st("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Dt(y){const X=y.target;X.removeEventListener("dispose",Dt),Gt(X)}function Gt(y){An(y),_.remove(y)}function An(y){const X=_.get(y).programs;X!==void 0&&(X.forEach(function(re){ve.releaseProgram(re)}),y.isShaderMaterial&&ve.releaseShaderCache(y))}this.renderBufferDirect=function(y,X,re,ie,J,Le){X===null&&(X=ne);const Oe=J.isMesh&&J.matrixWorld.determinant()<0,Ne=po(y,X,re,ie,J);fe.setMaterial(ie,Oe);let Ve=re.index,ze=1;if(ie.wireframe===!0){if(Ve=Me.getWireframeAttribute(re),Ve===void 0)return;ze=2}const Xe=re.drawRange,ke=re.attributes.position;let Je=Xe.start*ze,dt=(Xe.start+Xe.count)*ze;Le!==null&&(Je=Math.max(Je,Le.start*ze),dt=Math.min(dt,(Le.start+Le.count)*ze)),Ve!==null?(Je=Math.max(Je,0),dt=Math.min(dt,Ve.count)):ke!=null&&(Je=Math.max(Je,0),dt=Math.min(dt,ke.count));const Et=dt-Je;if(Et<0||Et===1/0)return;Pe.setup(J,ie,Ne,re,Ve);let yt,pt=z;if(Ve!==null&&(yt=N.get(Ve),pt=Ce,pt.setIndex(yt)),J.isMesh)ie.wireframe===!0?(fe.setLineWidth(ie.wireframeLinewidth*le()),pt.setMode(A.LINES)):pt.setMode(A.TRIANGLES);else if(J.isLine){let Ge=ie.linewidth;Ge===void 0&&(Ge=1),fe.setLineWidth(Ge*le()),J.isLineSegments?pt.setMode(A.LINES):J.isLineLoop?pt.setMode(A.LINE_LOOP):pt.setMode(A.LINE_STRIP)}else J.isPoints?pt.setMode(A.POINTS):J.isSprite&&pt.setMode(A.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)Ws("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))pt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Ge=J._multiDrawStarts,ft=J._multiDrawCounts,rt=J._multiDrawCount,hn=Ve?N.get(Ve).bytesPerElement:1,Sr=_.get(ie).currentProgram.getUniforms();for(let dn=0;dn<rt;dn++)Sr.setValue(A,"_gl_DrawID",dn),pt.render(Ge[dn]/hn,ft[dn])}else if(J.isInstancedMesh)pt.renderInstances(Je,Et,J.count);else if(re.isInstancedBufferGeometry){const Ge=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,ft=Math.min(re.instanceCount,Ge);pt.renderInstances(Je,Et,ft)}else pt.render(Je,Et)};function wn(y,X,re){y.transparent===!0&&y.side===In&&y.forceSinglePass===!1?(y.side=fn,y.needsUpdate=!0,qi(y,X,re),y.side=zi,y.needsUpdate=!0,qi(y,X,re),y.side=In):qi(y,X,re)}this.compile=function(y,X,re=null){re===null&&(re=y),w=be.get(re),w.init(X),C.push(w),re.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(w.pushLight(J),J.castShadow&&w.pushShadow(J))}),y!==re&&y.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(w.pushLight(J),J.castShadow&&w.pushShadow(J))}),w.setupLights();const ie=new Set;return y.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Le=J.material;if(Le)if(Array.isArray(Le))for(let Oe=0;Oe<Le.length;Oe++){const Ne=Le[Oe];wn(Ne,re,J),ie.add(Ne)}else wn(Le,re,J),ie.add(Le)}),w=C.pop(),ie},this.compileAsync=function(y,X,re=null){const ie=this.compile(y,X,re);return new Promise(J=>{function Le(){if(ie.forEach(function(Oe){_.get(Oe).currentProgram.isReady()&&ie.delete(Oe)}),ie.size===0){J(y);return}setTimeout(Le,10)}ge.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let Rt=null;function Ht(y){Rt&&Rt(y)}function Ei(){Kt.stop()}function Zs(){Kt.start()}const Kt=new Jd;Kt.setAnimationLoop(Ht),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(y){Rt=y,Re.setAnimationLoop(y),y===null?Kt.stop():Kt.start()},Re.addEventListener("sessionstart",Ei),Re.addEventListener("sessionend",Zs),this.render=function(y,X){if(X!==void 0&&X.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;const re=Re.enabled===!0&&Re.isPresenting===!0,ie=k!==null&&(Y===null||re)&&k.begin(x,Y);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(X),X=Re.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,X,Y),w=be.get(y,C.length),w.init(X),C.push(w),R.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ae.setFromProjectionMatrix(R,jn,X.reversedDepth),De=this.localClippingEnabled,pe=de.init(this.clippingPlanes,De),E=ee.get(y,D.length),E.init(),D.push(E),Re.enabled===!0&&Re.isPresenting===!0){const Oe=x.xr.getDepthSensingMesh();Oe!==null&&xr(Oe,X,-1/0,x.sortObjects)}xr(y,X,0,x.sortObjects),E.finish(),x.sortObjects===!0&&E.sort(Be,Ae),te=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,te&&_e.addToRenderList(E,y),this.info.render.frame++,pe===!0&&de.beginShadows();const J=w.state.shadowsArray;if(ye.render(J,y,X),pe===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ie&&k.hasRenderPass())===!1){const Oe=E.opaque,Ne=E.transmissive;if(w.setupLights(),X.isArrayCamera){const Ve=X.cameras;if(Ne.length>0)for(let ze=0,Xe=Ve.length;ze<Xe;ze++){const ke=Ve[ze];Qs(Oe,Ne,y,ke)}te&&_e.render(y);for(let ze=0,Xe=Ve.length;ze<Xe;ze++){const ke=Ve[ze];Js(E,y,ke,ke.viewport)}}else Ne.length>0&&Qs(Oe,Ne,y,X),te&&_e.render(y),Js(E,y,X)}Y!==null&&j===0&&(F.updateMultisampleRenderTarget(Y),F.updateRenderTargetMipmap(Y)),ie&&k.end(x),y.isScene===!0&&y.onAfterRender(x,y,X),Pe.resetDefaultState(),q=-1,L=null,C.pop(),C.length>0?(w=C[C.length-1],pe===!0&&de.setGlobalState(x.clippingPlanes,w.state.camera)):w=null,D.pop(),D.length>0?E=D[D.length-1]:E=null};function xr(y,X,re,ie){if(y.visible===!1)return;if(y.layers.test(X.layers)){if(y.isGroup)re=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(X);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ae.intersectsSprite(y)){ie&&G.setFromMatrixPosition(y.matrixWorld).applyMatrix4(R);const Oe=Z.update(y),Ne=y.material;Ne.visible&&E.push(y,Oe,Ne,re,G.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ae.intersectsObject(y))){const Oe=Z.update(y),Ne=y.material;if(ie&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),G.copy(y.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),G.copy(Oe.boundingSphere.center)),G.applyMatrix4(y.matrixWorld).applyMatrix4(R)),Array.isArray(Ne)){const Ve=Oe.groups;for(let ze=0,Xe=Ve.length;ze<Xe;ze++){const ke=Ve[ze],Je=Ne[ke.materialIndex];Je&&Je.visible&&E.push(y,Oe,Je,re,G.z,ke)}}else Ne.visible&&E.push(y,Oe,Ne,re,G.z,null)}}const Le=y.children;for(let Oe=0,Ne=Le.length;Oe<Ne;Oe++)xr(Le[Oe],X,re,ie)}function Js(y,X,re,ie){const{opaque:J,transmissive:Le,transparent:Oe}=y;w.setupLightsView(re),pe===!0&&de.setGlobalState(x.clippingPlanes,re),ie&&fe.viewport(H.copy(ie)),J.length>0&&Mr(J,X,re),Le.length>0&&Mr(Le,X,re),Oe.length>0&&Mr(Oe,X,re),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Qs(y,X,re,ie){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ie.id]===void 0){const Je=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ie.id]=new Qn(1,1,{generateMipmaps:!0,type:Je?xi:vn,minFilter:lr,samples:ue.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const Le=w.state.transmissionRenderTarget[ie.id],Oe=ie.viewport||H;Le.setSize(Oe.z*x.transmissionResolutionScale,Oe.w*x.transmissionResolutionScale);const Ne=x.getRenderTarget(),Ve=x.getActiveCubeFace(),ze=x.getActiveMipmapLevel();x.setRenderTarget(Le),x.getClearColor(se),oe=x.getClearAlpha(),oe<1&&x.setClearColor(16777215,.5),x.clear(),te&&_e.render(re);const Xe=x.toneMapping;x.toneMapping=Jn;const ke=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),w.setupLightsView(ie),pe===!0&&de.setGlobalState(x.clippingPlanes,ie),Mr(y,re,ie),F.updateMultisampleRenderTarget(Le),F.updateRenderTargetMipmap(Le),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let dt=0,Et=X.length;dt<Et;dt++){const yt=X[dt],{object:pt,geometry:Ge,material:ft,group:rt}=yt;if(ft.side===In&&pt.layers.test(ie.layers)){const hn=ft.side;ft.side=fn,ft.needsUpdate=!0,ea(pt,re,ie,Ge,ft,rt),ft.side=hn,ft.needsUpdate=!0,Je=!0}}Je===!0&&(F.updateMultisampleRenderTarget(Le),F.updateRenderTargetMipmap(Le))}x.setRenderTarget(Ne,Ve,ze),x.setClearColor(se,oe),ke!==void 0&&(ie.viewport=ke),x.toneMapping=Xe}function Mr(y,X,re){const ie=X.isScene===!0?X.overrideMaterial:null;for(let J=0,Le=y.length;J<Le;J++){const Oe=y[J],{object:Ne,geometry:Ve,group:ze}=Oe;let Xe=Oe.material;Xe.allowOverride===!0&&ie!==null&&(Xe=ie),Ne.layers.test(re.layers)&&ea(Ne,X,re,Ve,Xe,ze)}}function ea(y,X,re,ie,J,Le){y.onBeforeRender(x,X,re,ie,J,Le),y.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),J.onBeforeRender(x,X,re,ie,y,Le),J.transparent===!0&&J.side===In&&J.forceSinglePass===!1?(J.side=fn,J.needsUpdate=!0,x.renderBufferDirect(re,X,ie,J,y,Le),J.side=zi,J.needsUpdate=!0,x.renderBufferDirect(re,X,ie,J,y,Le),J.side=In):x.renderBufferDirect(re,X,ie,J,y,Le),y.onAfterRender(x,X,re,ie,J,Le)}function qi(y,X,re){X.isScene!==!0&&(X=ne);const ie=_.get(y),J=w.state.lights,Le=w.state.shadowsArray,Oe=J.state.version,Ne=ve.getParameters(y,J.state,Le,X,re),Ve=ve.getProgramCacheKey(Ne);let ze=ie.programs;ie.environment=y.isMeshStandardMaterial?X.environment:null,ie.fog=X.fog,ie.envMap=(y.isMeshStandardMaterial?U:O).get(y.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&y.envMap===null?X.environmentRotation:y.envMapRotation,ze===void 0&&(y.addEventListener("dispose",Dt),ze=new Map,ie.programs=ze);let Xe=ze.get(Ve);if(Xe!==void 0){if(ie.currentProgram===Xe&&ie.lightsStateVersion===Oe)return ls(y,Ne),Xe}else Ne.uniforms=ve.getUniforms(y),y.onBeforeCompile(Ne,x),Xe=ve.acquireProgram(Ne,Ve),ze.set(Ve,Xe),ie.uniforms=Ne.uniforms;const ke=ie.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ke.clippingPlanes=de.uniform),ls(y,Ne),ie.needsLights=ta(y),ie.lightsStateVersion=Oe,ie.needsLights&&(ke.ambientLightColor.value=J.state.ambient,ke.lightProbe.value=J.state.probe,ke.directionalLights.value=J.state.directional,ke.directionalLightShadows.value=J.state.directionalShadow,ke.spotLights.value=J.state.spot,ke.spotLightShadows.value=J.state.spotShadow,ke.rectAreaLights.value=J.state.rectArea,ke.ltc_1.value=J.state.rectAreaLTC1,ke.ltc_2.value=J.state.rectAreaLTC2,ke.pointLights.value=J.state.point,ke.pointLightShadows.value=J.state.pointShadow,ke.hemisphereLights.value=J.state.hemi,ke.directionalShadowMap.value=J.state.directionalShadowMap,ke.directionalShadowMatrix.value=J.state.directionalShadowMatrix,ke.spotShadowMap.value=J.state.spotShadowMap,ke.spotLightMatrix.value=J.state.spotLightMatrix,ke.spotLightMap.value=J.state.spotLightMap,ke.pointShadowMap.value=J.state.pointShadowMap,ke.pointShadowMatrix.value=J.state.pointShadowMatrix),ie.currentProgram=Xe,ie.uniformsList=null,Xe}function os(y){if(y.uniformsList===null){const X=y.currentProgram.getUniforms();y.uniformsList=Na.seqWithValue(X.seq,y.uniforms)}return y.uniformsList}function ls(y,X){const re=_.get(y);re.outputColorSpace=X.outputColorSpace,re.batching=X.batching,re.batchingColor=X.batchingColor,re.instancing=X.instancing,re.instancingColor=X.instancingColor,re.instancingMorph=X.instancingMorph,re.skinning=X.skinning,re.morphTargets=X.morphTargets,re.morphNormals=X.morphNormals,re.morphColors=X.morphColors,re.morphTargetsCount=X.morphTargetsCount,re.numClippingPlanes=X.numClippingPlanes,re.numIntersection=X.numClipIntersection,re.vertexAlphas=X.vertexAlphas,re.vertexTangents=X.vertexTangents,re.toneMapping=X.toneMapping}function po(y,X,re,ie,J){X.isScene!==!0&&(X=ne),F.resetTextureUnits();const Le=X.fog,Oe=ie.isMeshStandardMaterial?X.environment:null,Ne=Y===null?x.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:es,Ve=(ie.isMeshStandardMaterial?U:O).get(ie.envMap||Oe),ze=ie.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,Xe=!!re.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),ke=!!re.morphAttributes.position,Je=!!re.morphAttributes.normal,dt=!!re.morphAttributes.color;let Et=Jn;ie.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Et=x.toneMapping);const yt=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,pt=yt!==void 0?yt.length:0,Ge=_.get(ie),ft=w.state.lights;if(pe===!0&&(De===!0||y!==L)){const jt=y===L&&ie.id===q;de.setState(ie,y,jt)}let rt=!1;ie.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==ft.state.version||Ge.outputColorSpace!==Ne||J.isBatchedMesh&&Ge.batching===!1||!J.isBatchedMesh&&Ge.batching===!0||J.isBatchedMesh&&Ge.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Ge.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Ge.instancing===!1||!J.isInstancedMesh&&Ge.instancing===!0||J.isSkinnedMesh&&Ge.skinning===!1||!J.isSkinnedMesh&&Ge.skinning===!0||J.isInstancedMesh&&Ge.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Ge.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Ge.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Ge.instancingMorph===!1&&J.morphTexture!==null||Ge.envMap!==Ve||ie.fog===!0&&Ge.fog!==Le||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==de.numPlanes||Ge.numIntersection!==de.numIntersection)||Ge.vertexAlphas!==ze||Ge.vertexTangents!==Xe||Ge.morphTargets!==ke||Ge.morphNormals!==Je||Ge.morphColors!==dt||Ge.toneMapping!==Et||Ge.morphTargetsCount!==pt)&&(rt=!0):(rt=!0,Ge.__version=ie.version);let hn=Ge.currentProgram;rt===!0&&(hn=qi(ie,X,J));let Sr=!1,dn=!1,cs=!1;const _t=hn.getUniforms(),rn=Ge.uniforms;if(fe.useProgram(hn.program)&&(Sr=!0,dn=!0,cs=!0),ie.id!==q&&(q=ie.id,dn=!0),Sr||L!==y){fe.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),_t.setValue(A,"projectionMatrix",y.projectionMatrix),_t.setValue(A,"viewMatrix",y.matrixWorldInverse);const sn=_t.map.cameraPosition;sn!==void 0&&sn.setValue(A,P.setFromMatrixPosition(y.matrixWorld)),ue.logarithmicDepthBuffer&&_t.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&_t.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),L!==y&&(L=y,dn=!0,cs=!0)}if(Ge.needsLights&&(ft.state.directionalShadowMap.length>0&&_t.setValue(A,"directionalShadowMap",ft.state.directionalShadowMap,F),ft.state.spotShadowMap.length>0&&_t.setValue(A,"spotShadowMap",ft.state.spotShadowMap,F),ft.state.pointShadowMap.length>0&&_t.setValue(A,"pointShadowMap",ft.state.pointShadowMap,F)),J.isSkinnedMesh){_t.setOptional(A,J,"bindMatrix"),_t.setOptional(A,J,"bindMatrixInverse");const jt=J.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),_t.setValue(A,"boneTexture",jt.boneTexture,F))}J.isBatchedMesh&&(_t.setOptional(A,J,"batchingTexture"),_t.setValue(A,"batchingTexture",J._matricesTexture,F),_t.setOptional(A,J,"batchingIdTexture"),_t.setValue(A,"batchingIdTexture",J._indirectTexture,F),_t.setOptional(A,J,"batchingColorTexture"),J._colorsTexture!==null&&_t.setValue(A,"batchingColorTexture",J._colorsTexture,F));const Mn=re.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&Fe.update(J,re,hn),(dn||Ge.receiveShadow!==J.receiveShadow)&&(Ge.receiveShadow=J.receiveShadow,_t.setValue(A,"receiveShadow",J.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(rn.envMap.value=Ve,rn.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&X.environment!==null&&(rn.envMapIntensity.value=X.environmentIntensity),rn.dfgLUT!==void 0&&(rn.dfgLUT.value=ly()),dn&&(_t.setValue(A,"toneMappingExposure",x.toneMappingExposure),Ge.needsLights&&mo(rn,cs),Le&&ie.fog===!0&&xe.refreshFogUniforms(rn,Le),xe.refreshMaterialUniforms(rn,ie,Ie,Te,w.state.transmissionRenderTarget[y.id]),Na.upload(A,os(Ge),rn,F)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Na.upload(A,os(Ge),rn,F),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&_t.setValue(A,"center",J.center),_t.setValue(A,"modelViewMatrix",J.modelViewMatrix),_t.setValue(A,"normalMatrix",J.normalMatrix),_t.setValue(A,"modelMatrix",J.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){const jt=ie.uniformsGroups;for(let sn=0,vo=jt.length;sn<vo;sn++){const $i=jt[sn];Se.update($i,hn),Se.bind($i,hn)}}return hn}function mo(y,X){y.ambientLightColor.needsUpdate=X,y.lightProbe.needsUpdate=X,y.directionalLights.needsUpdate=X,y.directionalLightShadows.needsUpdate=X,y.pointLights.needsUpdate=X,y.pointLightShadows.needsUpdate=X,y.spotLights.needsUpdate=X,y.spotLightShadows.needsUpdate=X,y.rectAreaLights.needsUpdate=X,y.hemisphereLights.needsUpdate=X}function ta(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(y,X,re){const ie=_.get(y);ie.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),_.get(y.texture).__webglTexture=X,_.get(y.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:re,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,X){const re=_.get(y);re.__webglFramebuffer=X,re.__useDefaultFramebuffer=X===void 0};const go=A.createFramebuffer();this.setRenderTarget=function(y,X=0,re=0){Y=y,V=X,j=re;let ie=null,J=!1,Le=!1;if(y){const Ne=_.get(y);if(Ne.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(A.FRAMEBUFFER,Ne.__webglFramebuffer),H.copy(y.viewport),B.copy(y.scissor),W=y.scissorTest,fe.viewport(H),fe.scissor(B),fe.setScissorTest(W),q=-1;return}else if(Ne.__webglFramebuffer===void 0)F.setupRenderTarget(y);else if(Ne.__hasExternalTextures)F.rebindTextures(y,_.get(y.texture).__webglTexture,_.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Xe=y.depthTexture;if(Ne.__boundDepthTexture!==Xe){if(Xe!==null&&_.has(Xe)&&(y.width!==Xe.image.width||y.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");F.setupDepthRenderbuffer(y)}}const Ve=y.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Le=!0);const ze=_.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(ze[X])?ie=ze[X][re]:ie=ze[X],J=!0):y.samples>0&&F.useMultisampledRTT(y)===!1?ie=_.get(y).__webglMultisampledFramebuffer:Array.isArray(ze)?ie=ze[re]:ie=ze,H.copy(y.viewport),B.copy(y.scissor),W=y.scissorTest}else H.copy($).multiplyScalar(Ie).floor(),B.copy(I).multiplyScalar(Ie).floor(),W=Q;if(re!==0&&(ie=go),fe.bindFramebuffer(A.FRAMEBUFFER,ie)&&fe.drawBuffers(y,ie),fe.viewport(H),fe.scissor(B),fe.setScissorTest(W),J){const Ne=_.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ne.__webglTexture,re)}else if(Le){const Ne=X;for(let Ve=0;Ve<y.textures.length;Ve++){const ze=_.get(y.textures[Ve]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ve,ze.__webglTexture,re,Ne)}}else if(y!==null&&re!==0){const Ne=_.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ne.__webglTexture,re)}q=-1},this.readRenderTargetPixels=function(y,X,re,ie,J,Le,Oe,Ne=0){if(!(y&&y.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=_.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ve=Ve[Oe]),Ve){fe.bindFramebuffer(A.FRAMEBUFFER,Ve);try{const ze=y.textures[Ne],Xe=ze.format,ke=ze.type;if(!ue.textureFormatReadable(Xe)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(ke)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=y.width-ie&&re>=0&&re<=y.height-J&&(y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ne),A.readPixels(X,re,ie,J,we.convert(Xe),we.convert(ke),Le))}finally{const ze=Y!==null?_.get(Y).__webglFramebuffer:null;fe.bindFramebuffer(A.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(y,X,re,ie,J,Le,Oe,Ne=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=_.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ve=Ve[Oe]),Ve)if(X>=0&&X<=y.width-ie&&re>=0&&re<=y.height-J){fe.bindFramebuffer(A.FRAMEBUFFER,Ve);const ze=y.textures[Ne],Xe=ze.format,ke=ze.type;if(!ue.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Je),A.bufferData(A.PIXEL_PACK_BUFFER,Le.byteLength,A.STREAM_READ),y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ne),A.readPixels(X,re,ie,J,we.convert(Xe),we.convert(ke),0);const dt=Y!==null?_.get(Y).__webglFramebuffer:null;fe.bindFramebuffer(A.FRAMEBUFFER,dt);const Et=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await R_(A,Et,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Je),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Le),A.deleteBuffer(Je),A.deleteSync(Et),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,X=null,re=0){const ie=Math.pow(2,-re),J=Math.floor(y.image.width*ie),Le=Math.floor(y.image.height*ie),Oe=X!==null?X.x:0,Ne=X!==null?X.y:0;F.setTexture2D(y,0),A.copyTexSubImage2D(A.TEXTURE_2D,re,0,0,Oe,Ne,J,Le),fe.unbindTexture()};const _o=A.createFramebuffer(),Yi=A.createFramebuffer();this.copyTextureToTexture=function(y,X,re=null,ie=null,J=0,Le=null){Le===null&&(J!==0?(Ws("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Le=J,J=0):Le=0);let Oe,Ne,Ve,ze,Xe,ke,Je,dt,Et;const yt=y.isCompressedTexture?y.mipmaps[Le]:y.image;if(re!==null)Oe=re.max.x-re.min.x,Ne=re.max.y-re.min.y,Ve=re.isBox3?re.max.z-re.min.z:1,ze=re.min.x,Xe=re.min.y,ke=re.isBox3?re.min.z:0;else{const Mn=Math.pow(2,-J);Oe=Math.floor(yt.width*Mn),Ne=Math.floor(yt.height*Mn),y.isDataArrayTexture?Ve=yt.depth:y.isData3DTexture?Ve=Math.floor(yt.depth*Mn):Ve=1,ze=0,Xe=0,ke=0}ie!==null?(Je=ie.x,dt=ie.y,Et=ie.z):(Je=0,dt=0,Et=0);const pt=we.convert(X.format),Ge=we.convert(X.type);let ft;X.isData3DTexture?(F.setTexture3D(X,0),ft=A.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(F.setTexture2DArray(X,0),ft=A.TEXTURE_2D_ARRAY):(F.setTexture2D(X,0),ft=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,X.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,X.unpackAlignment);const rt=A.getParameter(A.UNPACK_ROW_LENGTH),hn=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Sr=A.getParameter(A.UNPACK_SKIP_PIXELS),dn=A.getParameter(A.UNPACK_SKIP_ROWS),cs=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,yt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,yt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ze),A.pixelStorei(A.UNPACK_SKIP_ROWS,Xe),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ke);const _t=y.isDataArrayTexture||y.isData3DTexture,rn=X.isDataArrayTexture||X.isData3DTexture;if(y.isDepthTexture){const Mn=_.get(y),jt=_.get(X),sn=_.get(Mn.__renderTarget),vo=_.get(jt.__renderTarget);fe.bindFramebuffer(A.READ_FRAMEBUFFER,sn.__webglFramebuffer),fe.bindFramebuffer(A.DRAW_FRAMEBUFFER,vo.__webglFramebuffer);for(let $i=0;$i<Ve;$i++)_t&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_.get(y).__webglTexture,J,ke+$i),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_.get(X).__webglTexture,Le,Et+$i)),A.blitFramebuffer(ze,Xe,Oe,Ne,Je,dt,Oe,Ne,A.DEPTH_BUFFER_BIT,A.NEAREST);fe.bindFramebuffer(A.READ_FRAMEBUFFER,null),fe.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(J!==0||y.isRenderTargetTexture||_.has(y)){const Mn=_.get(y),jt=_.get(X);fe.bindFramebuffer(A.READ_FRAMEBUFFER,_o),fe.bindFramebuffer(A.DRAW_FRAMEBUFFER,Yi);for(let sn=0;sn<Ve;sn++)_t?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Mn.__webglTexture,J,ke+sn):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Mn.__webglTexture,J),rn?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,jt.__webglTexture,Le,Et+sn):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,jt.__webglTexture,Le),J!==0?A.blitFramebuffer(ze,Xe,Oe,Ne,Je,dt,Oe,Ne,A.COLOR_BUFFER_BIT,A.NEAREST):rn?A.copyTexSubImage3D(ft,Le,Je,dt,Et+sn,ze,Xe,Oe,Ne):A.copyTexSubImage2D(ft,Le,Je,dt,ze,Xe,Oe,Ne);fe.bindFramebuffer(A.READ_FRAMEBUFFER,null),fe.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else rn?y.isDataTexture||y.isData3DTexture?A.texSubImage3D(ft,Le,Je,dt,Et,Oe,Ne,Ve,pt,Ge,yt.data):X.isCompressedArrayTexture?A.compressedTexSubImage3D(ft,Le,Je,dt,Et,Oe,Ne,Ve,pt,yt.data):A.texSubImage3D(ft,Le,Je,dt,Et,Oe,Ne,Ve,pt,Ge,yt):y.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Le,Je,dt,Oe,Ne,pt,Ge,yt.data):y.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Le,Je,dt,yt.width,yt.height,pt,yt.data):A.texSubImage2D(A.TEXTURE_2D,Le,Je,dt,Oe,Ne,pt,Ge,yt);A.pixelStorei(A.UNPACK_ROW_LENGTH,rt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,hn),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Sr),A.pixelStorei(A.UNPACK_SKIP_ROWS,dn),A.pixelStorei(A.UNPACK_SKIP_IMAGES,cs),Le===0&&X.generateMipmaps&&A.generateMipmap(ft),fe.unbindTexture()},this.initRenderTarget=function(y){_.get(y).__webglFramebuffer===void 0&&F.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?F.setTextureCube(y,0):y.isData3DTexture?F.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?F.setTexture2DArray(y,0):F.setTexture2D(y,0),fe.unbindTexture()},this.resetState=function(){V=0,j=0,Y=null,fe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const Ls=n=>{let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);e=(e<<5)-e+i,e=e&e}return Math.abs(e)},cy=n=>{if(!n||typeof n!="string")return!1;const e=n.length,t=e===8||e===12,i=/^[A-Z0-9]*$/i.test(n);return t&&i},Ya=(n,e,t="full")=>{const i=t==="simple"?6:8,r=t==="simple"?4:6;switch(e){case 0:return new Ni(n,i,r);case 1:const s=new Ni(n,i,r);return s.scale(.8,2,.8),s;case 2:const a=t==="simple"?n*1:n*1.2,o=t==="simple"?n*2:n*2.5;return new uo(a,o,i);case 3:const l=new Ni(n,i,r),c=t==="simple"?2:1.8,u=t==="simple"?.2:.4;return l.scale(c,u,c),l;default:return new Ni(n,i,r)}},uy=n=>new fr({color:new We(n[0],n[1],n[2])}),fy=n=>new fr({color:new We(n[0],n[1],n[2])});class ln{constructor(e){this.seed=e%2147483647,this.seed<=0&&(this.seed+=2147483646)}next(){return this.seed=this.seed*16807%2147483647,this.seed}random(){return(this.next()-1)/2147483646}range(e,t){return e+this.random()*(t-e)}int(e,t){return Math.floor(this.range(e,t+1))}}const hy=n=>{const e=new ln(n);return{trunkThickness:e.range(.02,.12),trunkHeight:e.range(.6,2),trunkTaper:e.range(.6,.95),trunkLean:e.range(0,.1),branchingFactor:e.int(5,7),branchingAngle:e.range(15,110),branchingReduction:e.range(.4,.9),maxBranches:e.int(15,80),lengthReduction:e.range(.4,.9),radiusReduction:e.range(.5,.9),maxDepth:e.int(4,6),leafDensity:e.range(0,1),leafSize:e.range(.8,1.5),leafClusters:e.int(1,3),leafVariation:e.range(.8,1.2),leafShape:e.int(0,3),trunkHue:e.range(0,80),trunkSaturation:e.range(.2,.9),trunkLightness:e.range(.15,.6),leafHue:e.range(40,180),leafSaturation:e.range(.3,1),leafLightness:e.range(.25,.7),upwardBias:e.range(-.2,.4),horizontalSpread:e.range(1.2,4),branchOpenness:e.range(.1,8),asymmetryFactor:e.range(0,.5),naturalVariation:e.range(.05,.4),rootHeight:e.range(.8,2.5),rootBaseRadius:e.range(2,5),rootTopRadius:e.range(.7,1.3),rootOvalness:e.range(.6,1.4),rootTwist:e.range(-.3,.3),rootLean:e.range(0,.15),rootLeanDirection:e.range(0,Math.PI*2),rootBumpiness:e.range(.8,1.2)}},zr=(n,e,t)=>{n/=360;const i=e*Math.min(t,1-t),r=s=>{const a=(s+n*12)%12;return t-i*Math.max(Math.min(a-3,9-a,1),-1)};return[r(0),r(8),r(4)]},Sc=(n,e,t,i)=>{const r=n*i.rootHeight,s=n*i.rootTopRadius,a=n*i.rootBaseRadius,o=dy(s,a,r,i),l=new At(o,t),c=r*.1,u=i.rootHeight*.05;if(l.position.set(0,c+u,0),Math.sqrt(e.x*e.x+e.z*e.z)>.05&&(l.rotation.x=e.x*.2,l.rotation.z=e.z*.2),i.rootLean>.02){const h=Math.cos(i.rootLeanDirection)*i.rootLean,d=Math.sin(i.rootLeanDirection)*i.rootLean;l.rotation.x+=h,l.rotation.z+=d}return Math.abs(i.rootTwist)>.05&&(l.rotation.y=i.rootTwist),l},dy=(n,e,t,i)=>{const a=new ss(n,e,t,12,4),o=a.attributes.position,l=new K;for(let c=0;c<o.count;c++){l.fromBufferAttribute(o,c);const u=(l.y+t/2)/t,f=n+(e-n)*u;if(f>0){const h=Math.atan2(l.z,l.x),d=Math.sqrt(l.x*l.x+l.z*l.z);if(d>0){const v=i.rootOvalness,m=i.rootBumpiness,p=.9+.2*Math.sin(h*3)*(m-1),M=d/f*f*p;l.x=Math.cos(h)*M*1,l.z=Math.sin(h)*M*v}}o.setXYZ(c,l.x,l.y,l.z)}return a.computeVertexNormals(),a},ip=async(n,e="simple",t=null)=>{const i=hy(n),r=new ln(n),s=new ur,a=[];let o=0,l=0;const c=i.leafDensity>.3,u=zr(i.trunkHue,i.trunkSaturation,i.trunkLightness),f=zr(i.leafHue,i.leafSaturation,i.leafLightness),h=fy(u),d=uy(f),g=async(p,M,b,E,w,D,C,k=null)=>{const x=p.y+M.y*b;if(o=Math.max(o,x),w<=0||b<.02){c&&b>.01&&a.push({position:p.clone(),size:Math.max(.08,E*i.leafSize*.5),shape:i.leafShape,rng:new ln(C.next())});return}const T=E*i.trunkTaper,V=e==="simple"?6:8,j=new ss(T,E,b,V),Y=new At(j,h),q=p.clone().add(M.clone().multiplyScalar(b));Y.position.copy(p.clone().add(q).multiplyScalar(.5)),Y.lookAt(q),Y.rotateX(Math.PI/2),e==="full"&&(Y.castShadow=!0,Y.receiveShadow=!0),s.add(Y),l++,t&&l%5===0&&(t(l),await new Promise(se=>setTimeout(se,1)));const L=i.maxDepth,H=e==="simple"?Math.min(i.maxBranches,50):i.maxBranches;if(l>=H)return;let B;w===L?B=C.int(4,6):w===L-1?B=C.int(3,4):w===L-2?B=C.int(2,3):B=C.int(1,2);const W=B;for(let se=0;se<W&&!(l>=H);se++){const oe=360/W,me=se*oe,Te=C.range(-oe*.2,oe*.2),Ie=i.asymmetryFactor*C.range(-20,20),Be=w/i.maxDepth,Ae=Be*.2,$=(me+Te+Ie)*Math.PI/180;let I=i.branchingAngle*C.range(.3,1.5)*Math.PI/180;I+=i.upwardBias*Math.PI/12,I+=Ae*Math.PI/10;let Q=new K(0,1,0);if(k&&w<i.maxDepth){const R=Math.min(.8,Be*1);Q=Q.lerp(k.clone().normalize(),R),Q.normalize()}let ae=Q.clone();ae.applyAxisAngle(Q,$);const pe=new K().crossVectors(ae,Q).normalize();if(pe.length()>0&&ae.applyAxisAngle(pe,I),i.branchOpenness>4){const R=i.branchOpenness>5?1.5:1,P=C.range(-Math.PI/8,Math.PI/8)*R,G=new K(C.range(-1,1),C.range(-.2,.2),C.range(-1,1)).normalize();ae.applyAxisAngle(G,P)}const De=i.naturalVariation*(.5+Be*.5);ae.x+=C.range(-De,De),ae.y+=C.range(-De*.2,De*.2),ae.z+=C.range(-De,De),ae.normalize(),await g(q.clone(),ae,b*i.lengthReduction*C.range(.7,1.3),E*i.radiusReduction*C.range(.7,1.3),w-1,D.clone(),new ln(C.next()),M.clone())}},v=new K(r.range(-i.trunkLean,i.trunkLean),1,r.range(-i.trunkLean,i.trunkLean)).normalize();await g(new K(0,0,0),v,i.trunkHeight,i.trunkThickness,i.maxDepth,new K(0,1,0),new ln(r.next()),null);const m=Sc(i.trunkThickness,v,h,i);if(s.add(m),c&&a.length>0)for(const p of a){const M=p.size*p.rng.range(1/i.leafVariation,i.leafVariation)*(e==="simple"?1.2:1.5),b=Ya(M,p.shape,e),E=new At(b,d);E.position.copy(p.position),E.rotation.x=p.rng.range(0,Math.PI*2),E.rotation.y=p.rng.range(0,Math.PI*2),E.rotation.z=p.rng.range(0,Math.PI*2),e==="full"&&(E.castShadow=!0,E.receiveShadow=!0),s.add(E);const w=e==="simple"?Math.min(i.leafClusters,2):i.leafClusters;for(let D=0;D<w;D++){const C=Ya(M,p.shape,e),k=new At(C,d),x=M*.3;k.position.copy(p.position),k.position.add(new K(p.rng.range(-x,x),p.rng.range(-x,x),p.rng.range(-x,x))),k.scale.setScalar(p.rng.range(.8,1.2)),k.rotation.x=p.rng.range(0,Math.PI*2),k.rotation.y=p.rng.range(0,Math.PI*2),k.rotation.z=p.rng.range(0,Math.PI*2),e==="full"&&(k.castShadow=!0,k.receiveShadow=!0),s.add(k)}}return{group:s,height:o,characteristics:i}},py={class:"cenario-page"},my={key:1,class:"controls-panel"},gy={class:"control-group"},_y={class:"seed-row"},vy={class:"control-group"},xy={class:"control-group"},My={class:"control-group"},Sy={class:"control-group"},Ey={class:"control-group"},yy={class:"control-group"},by={class:"control-group"},Ty={class:"control-group"},Ay={class:"control-group"},wy={class:"control-group"},Ry={class:"control-group"},Cy={class:"control-group"},Py={class:"control-group"},Dy={class:"control-group"},Iy={class:"control-group"},Ly={class:"control-group"},Uy={key:0,class:"tree-info"},Ny=["disabled"],Fy={key:0},Oy={key:1},By={class:"control-group"},Vy={key:0},zy={key:1},sh="cenario-terrain-config",ky={__name:"CenarioView",props:{isDark:Boolean,initialSeed:String},setup(n){const e=n,t=Ke(null);let i,r,s,a,o,l=null,c=[];const f=(()=>{try{const O=localStorage.getItem(sh);if(O)return JSON.parse(O)}catch(O){console.warn("Erro ao carregar config:",O)}return null})(),h=Ke(f?.seed??12345),d=Ke(f?.riverWidth??25),g=Ke(f?.riverSinuosity??.004),v=Ke(f?.riverAmplitude??90),m=Ke(f?.maxElevation??8),p=Ke(f?.terrainSmoothness??4),M=Ke(f?.terrainFrequency??.003),b=Ke(f?.colorSmoothness??3),E=Ke(f?.colorVariation??.15),w=Ke(f?.greenIntensity??.62),D=Ke(f?.bankWidth??20),C=Ke(f?.bankSmoothness??2),k=Ke(f?.grassPerlinSmoothness??2),x=Ke(f?.transitionZone??30),T=Ke(f?.transitionSmoothness??4),V=Ke(f?.treeDensity??50),j=Ke(f?.treeMinDistance??15),Y=Ke(f?.fogDensity??.0025),q=Ke([]),L=Ke(!1),H=Ke(!1),B=[];bn([h,d,g,v,m,p,M,b,E,w,D,C,k,x,T,V,j,Y],()=>{l&&clearTimeout(l),l=setTimeout(()=>{const O={seed:h.value,riverWidth:d.value,riverSinuosity:g.value,riverAmplitude:v.value,maxElevation:m.value,terrainSmoothness:p.value,terrainFrequency:M.value,colorSmoothness:b.value,colorVariation:E.value,greenIntensity:w.value,bankWidth:D.value,bankSmoothness:C.value,grassPerlinSmoothness:k.value,transitionZone:x.value,transitionSmoothness:T.value,treeDensity:V.value,treeMinDistance:j.value,fogDensity:Y.value};try{localStorage.setItem(sh,JSON.stringify(O))}catch(U){console.warn("Erro ao salvar config:",U)}},5e3)});const se=()=>{h.value=Math.floor(Math.random()*1e5),oe()},oe=()=>{i&&a&&(Ie(),Ae())},me=()=>{if(i){const O=e.isDark?1710638:13229544;i.fog=new Is(O,Y.value)}};bn(()=>e.isDark,()=>{if(i){const O=e.isDark?1710638:11064550;i.background=new We(O);const U=e.isDark?1710638:13229544;i.fog=new Is(U,Y.value)}}),vr(()=>{Te()}),ns(()=>{F(),l&&clearTimeout(l)});function Te(){i=new iu;const O=e.isDark?1710638:11064550;i.background=new We(O);const U=e.isDark?1710638:13229544;i.fog=new Is(U,Y.value),r=new cn(75,window.innerWidth/window.innerHeight,.1,1e3),r.position.set(0,80,120),r.lookAt(0,0,0),s=new lu({antialias:!0}),s.setSize(t.value.clientWidth,t.value.clientHeight),s.shadowMap.enabled=!0,s.shadowMap.type=ks,s.toneMapping=Wc,s.toneMappingExposure=1.2,s.outputColorSpace=_n,t.value.appendChild(s.domElement);const N=new ou(16774630,.5);i.add(N);const Me=new cv(16772829,4025149,.6);i.add(Me);const Z=new pr(16766118,1.8);Z.position.set(80,60,40),Z.castShadow=!0,Z.shadow.mapSize.width=4096,Z.shadow.mapSize.height=4096,Z.shadow.camera.near=.5,Z.shadow.camera.far=500,Z.shadow.camera.left=-200,Z.shadow.camera.right=200,Z.shadow.camera.top=200,Z.shadow.camera.bottom=-200,Z.shadow.bias=-1e-4,i.add(Z);const ve=new pr(8952268,.4);ve.position.set(-80,40,-30),i.add(ve);const xe=new pr(16772829,.3);xe.position.set(-50,20,80),i.add(xe),Ie(),Ae(),Q(),ae()}function Ie(){const Z=new ki(400,400,300,300),ve=Z.attributes.position.array,xe=new Float32Array(ve.length),ee=h.value*.01;for(let de=0;de<ve.length;de+=3){const ye=ve[de],_e=ve[de+1];let Fe=0;const z=1/p.value;Fe+=Math.sin(ye*.03*z+ee)*4,Fe+=Math.cos(_e*.06*z+ee)*3,Fe+=$(ye+ee*100,_e+ee*100,M.value,p.value)*m.value*.2;const Ce=v.value/90,we=Math.sin(_e*g.value+ee)*(90*Ce)+Math.sin(_e*g.value*.5+ee)*(60*Ce)+Math.cos(_e*g.value*1.75+ee)*(35*Ce),Pe=Math.abs(ye-we),Se=d.value+Math.sin(_e*.01+ee)*3,he=D.value+Math.sin(_e*.02+ee),Re=Math.max(0,1-Pe/(Se+he+40)),He=I(Re,T.value);let tt=0;tt+=Math.abs($(ye+ee*50,_e+ee*50,M.value*2.5,p.value)),tt+=Math.abs($(ye+100+ee*30,_e+50,M.value*.4,p.value))*m.value*.5,tt+=Math.abs($(ye-50,_e+100+ee*20,M.value*.5,p.value))*m.value*.4,Fe-=He*2.5;const Qe=-1.5,Dt=(tt+Fe+5)/2,Gt=he+x.value;if(Pe<Se)Fe=-3;else if(Pe<Se+Gt){const An=(Pe-Se)/Gt,wn=I(An,T.value);Fe=(Qe+.5)*(1-wn)+Dt*wn}else Fe=Dt;if(Pe<Se)xe[de]=.65+0,xe[de+1]=.55+0*.8,xe[de+2]=.38+0*.5;else{const An=Pe-Se,wn=Math.min(1,An/he),Rt=I(wn,C.value),Ht=.006/b.value,Ei=$(ye+ee*200,_e+ee*200,Ht*.5,k.value)*E.value*1.2,Zs=$(ye+200+ee*150,_e+150,Ht*1.5,k.value)*E.value*.8,Kt=$(ye-100,_e+300+ee*100,Ht*4,k.value)*E.value*.5,xr=$(ye+ee*500,_e+ee*500,Ht*.3,2),Js=.65+Kt*.1,Qs=.55+Kt*.08,Mr=.38+Kt*.05,ea=w.value,qi=.18+Ei*.8+xr*.05,os=ea+Ei*.5+Zs*.3+xr*.08,ls=.12+Ei*.3+Kt*.2;if(An<he)xe[de]=Js*(1-Rt)+qi*Rt,xe[de+1]=Qs*(1-Rt)+os*Rt,xe[de+2]=Mr*(1-Rt)+ls*Rt;else{const po=(Fe+6)/14,mo=Math.max(0,Math.min(1,po)),ta=.003/b.value,go=$(ye+ee*300,_e+ee*300,ta,k.value),_o=$(ye+500+ee*250,_e+200,ta*2.3,k.value);let Yi=qi,y=os,X=ls;const re=I((go+1)*.5,b.value);Yi+=(re-.5)*E.value*.8,y+=(re-.5)*E.value*.6,X+=(re-.5)*E.value*.2;const ie=I((_o+1)*.5,b.value);Yi+=(ie-.5)*E.value*.4,y+=(ie-.5)*E.value*.3,Yi+=Kt,y+=Kt,X+=Kt*.5;const J=(mo-.5)*.08;Yi+=J,y+=J,X+=J*.5,xe[de]=Math.max(.15,Math.min(.6,Yi)),xe[de+1]=Math.max(.4,Math.min(.8,y)),xe[de+2]=Math.max(.1,Math.min(.4,X))}}ve[de+2]=Fe}Z.computeVertexNormals(),Z.setAttribute("color",new Tn(xe,3));const be=new ya({vertexColors:!0,roughness:.85,metalness:0,flatShading:!1});a&&(i.remove(a),a.geometry.dispose(),a.material.dispose()),a=new At(Z,be),a.rotation.x=-Math.PI/2,a.receiveShadow=!0,a.castShadow=!0,i.add(a)}let Be=null;function Ae(){const Me=new ki(400,400,300,300),Z=Me.attributes.position.array,ve=new Float32Array(Z.length),xe=h.value*.01,ee=v.value/90;for(let de=0;de<Z.length;de+=3){const ye=Z[de],_e=Z[de+1],Fe=Math.sin(_e*g.value+xe)*(90*ee)+Math.sin(_e*g.value*.5+xe)*(60*ee)+Math.cos(_e*g.value*1.75+xe)*(35*ee),z=Math.abs(ye-Fe),Pe=d.value+Math.sin(_e*.01+xe)*3+15,Se=-1;if(z>Pe)Z[de+2]=-100,ve[de]=0,ve[de+1]=0,ve[de+2]=0;else{Z[de+2]=Se;const he=z/Pe,Re=$(ye*.5,_e*.5,.02,2)*.08;ve[de]=.18+he*.15+Re,ve[de+1]=.48+he*.2+Re,ve[de+2]=.58+he*.15+Re*.5}}Me.computeVertexNormals(),Me.setAttribute("color",new Tn(ve,3));const be=new ya({vertexColors:!0,roughness:.05,metalness:.6,transparent:!0,opacity:.65,side:In,envMapIntensity:2});Be&&(i.remove(Be),Be.geometry.dispose(),Be.material.dispose()),Be=new At(Me,be),Be.rotation.x=-Math.PI/2,Be.receiveShadow=!0,i.add(Be)}function $(O,U,N,Me=4){let Z=0,ve=1,xe=N;const ee=Math.max(1,Math.floor(Me)),be=.5/(Me*.25);for(let de=0;de<ee;de++)Z+=Math.sin(O*xe)*Math.cos(U*xe)*ve,Z+=Math.sin(O*xe*1.3+2.5)*Math.cos(U*xe*1.7+1.8)*ve*.7,xe*=2,ve*=be;return Z*.3}function I(O,U=1){O=Math.max(0,Math.min(1,O));for(let N=0;N<U;N++)O=O*O*(3-2*O);return O}function Q(){let O=!1,U=0,N=0;const Me=s.domElement;Me.addEventListener("mousedown",Z=>{ne&&(O=!0,U=Z.clientX,N=Z.clientY)}),Me.addEventListener("mouseup",()=>{O=!1}),Me.addEventListener("mousemove",Z=>{if(!O||!ne)return;const ve=Z.clientX-U,xe=Z.clientY-N,ee=new dv;ee.setFromVector3(r.position),ee.theta-=ve*.01,ee.phi+=xe*.01,ee.phi=Math.max(.1,Math.min(Math.PI-.1,ee.phi)),r.position.setFromSpherical(ee),r.lookAt(0,0,0),U=Z.clientX,N=Z.clientY}),Me.addEventListener("wheel",Z=>{if(!ne)return;const ve=r.position.length(),xe=Math.max(30,Math.min(300,ve+Z.deltaY*.2));r.position.normalize().multiplyScalar(xe)})}function ae(){o=requestAnimationFrame(ae),s.render(i,r)}function pe(O,U){const N=h.value*.01,Me=v.value/90,Z=Math.sin(U*g.value+N)*(90*Me)+Math.sin(U*g.value*.5+N)*(60*Me)+Math.cos(U*g.value*1.75+N)*(35*Me),ve=Math.abs(O-Z),xe=d.value+Math.sin(U*.01+N)*3,ee=D.value+Math.sin(U*.02+N);return ve>xe+ee}function De(O,U){const N=h.value*.01,Me=1/p.value;let Z=0;Z+=Math.sin(O*.03*Me+N)*4,Z+=Math.cos(U*.06*Me+N)*3,Z+=$(O+N*100,U+N*100,M.value,p.value)*m.value*.2;let ve=0;ve+=Math.abs($(O+N*50,U+N*50,M.value*2.5,p.value)),ve+=Math.abs($(O+100+N*30,U+50,M.value*.4,p.value))*m.value*.5;const xe=v.value/90,ee=Math.sin(U*g.value+N)*(90*xe)+Math.sin(U*g.value*.5+N)*(60*xe)+Math.cos(U*g.value*1.75+N)*(35*xe),be=Math.abs(O-ee),de=d.value+Math.sin(U*.01+N)*3,ye=D.value+Math.sin(U*.02+N),_e=-1.5,Fe=(ve+Z+5)/2,z=ye+x.value;if(be<de){const Ce=be/de,we=I(Ce,2),Pe=_e-(1-we)*.8,Se=I(Ce,3),he=Fe*.3+_e*.7;return Pe*(1-Se*.3)+he*(Se*.3)}else if(be<de+z){const Ce=(be-de)/z,we=I(Ce,T.value);return(_e+.5)*(1-we)+Fe*we}else return Fe}function R(){const O="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let U="";for(let N=0;N<8;N++)U+=O.charAt(Math.floor(Math.random()*O.length));return U}function P(){if(c.forEach(ee=>{i.remove(ee),ee.geometry.dispose(),ee.material.dispose()}),c=[],q.value=[],V.value===0||!i)return;const O=400,U=400,N=j.value,Me=[],Z=V.value*20;for(let ee=0;ee<Z&&Me.length<V.value;ee++){const be=(Math.random()-.5)*O*.9,de=(Math.random()-.5)*U*.9;if(!pe(be,de))continue;let ye=!1;for(const _e of Me){const Fe=_e.x-be,z=_e.z-de;if(Fe*Fe+z*z<N*N){ye=!0;break}}if(!ye){const _e=De(be,de);Me.push({x:be,y:_e,z:de,seed:R()})}}q.value=Me;const ve=new Ni(1.5,8,8),xe=new nu({color:16729156});Me.forEach(ee=>{const be=new At(ve.clone(),xe.clone());be.position.set(ee.x,ee.y+2,-ee.z),i.add(be),c.push(be)})}async function G(){if(q.value.length===0||L.value)return;L.value=!0;const O=[...q.value];for(let U=0;U<O.length;U++){const N=O[U];try{const Me=Ls(N.seed),{group:Z}=await ip(Me,"simple");Z.position.set(N.x,N.y,-N.z),Z.scale.setScalar(7),i.add(Z),B.push(Z),c[U]&&(i.remove(c[U]),c[U].geometry.dispose(),c[U].material.dispose()),q.value=O.slice(U+1),await new Promise(ve=>setTimeout(ve,100))}catch(Me){console.error(`Erro ao gerar árvore ${N.seed}:`,Me)}}c=[],q.value=[],L.value=!1}let ne=!0,te=[];function le(){te.forEach(xe=>{i.remove(xe),xe.geometry.dispose(),xe.material.dispose()}),te=[];const O=r.position.x,U=-r.position.z,N=80,Me=200,Z=h.value*.01,ve=v.value/90;for(let xe=0;xe<Me;xe++){const ee=Math.random()*Math.PI*2,be=Math.random()*N,de=O+Math.cos(ee)*be,ye=U+Math.sin(ee)*be,_e=Math.sin(ye*g.value+Z)*(90*ve)+Math.sin(ye*g.value*.5+Z)*(60*ve)+Math.cos(ye*g.value*1.75+Z)*(35*ve),Fe=Math.abs(de-_e),z=d.value+Math.sin(ye*.01+Z)*3,Ce=D.value+Math.sin(ye*.02+Z),we=Fe-z;if(we<0||we>Ce)continue;const Pe=1-we/Ce;if(Math.random()>Pe*.8+.2)continue;const Se=De(de,ye),he=.3+Math.random()*.6,Re=he*(.8+Math.random()*.4),He=he*(.3+Math.random()*.3),tt=he*(.8+Math.random()*.4),Qe=new Ni(1,6,4),Dt=Math.random(),Gt=.4+Dt*.25,An=.38+Dt*.2,wn=.32+Dt*.15,Rt=new ya({color:new We(Gt,An,wn),roughness:.9,metalness:.1,flatShading:!0}),Ht=new At(Qe,Rt);Ht.position.set(de,Se+He*.3,-ye),Ht.scale.set(Re,He,tt),Ht.rotation.set(Math.random()*.3,Math.random()*Math.PI*2,Math.random()*.3),Ht.castShadow=!0,Ht.receiveShadow=!0,i.add(Ht),te.push(Ht)}}function A(){te.forEach(O=>{i.remove(O),O.geometry.dispose(),O.material.dispose()}),te=[]}let Ee=[];function ge(){Ee.forEach(xe=>{i.remove(xe),xe.geometry.dispose(),xe.material.dispose()}),Ee=[];const O=r.position.x,U=-r.position.z,N=60,Me=400,Z=h.value*.01,ve=v.value/90;for(let xe=0;xe<Me;xe++){const ee=Math.random()*Math.PI*2,be=Math.random()*N,de=O+Math.cos(ee)*be,ye=U+Math.sin(ee)*be,_e=Math.sin(ye*g.value+Z)*(90*ve)+Math.sin(ye*g.value*.5+Z)*(60*ve)+Math.cos(ye*g.value*1.75+Z)*(35*ve),Fe=Math.abs(de-_e),z=d.value+Math.sin(ye*.01+Z)*3,Ce=D.value+Math.sin(ye*.02+Z);if(Fe-z<Ce)continue;const Pe=De(de,ye),Se=3+Math.floor(Math.random()*3);for(let he=0;he<Se;he++){const Re=.8+Math.random()*1.2,He=.08+Math.random()*.06,tt=new uo(He,Re,4,1);tt.translate(0,Re/2,0);const Qe=Math.random(),Dt=.15+Qe*.15,Gt=.45+Qe*.25,An=.1+Qe*.1,wn=new ya({color:new We(Dt,Gt,An),roughness:.8,metalness:0,side:In}),Rt=new At(tt,wn),Ht=(Math.random()-.5)*.3,Ei=(Math.random()-.5)*.3;Rt.position.set(de+Ht,Pe,-ye+Ei),Rt.rotation.set((Math.random()-.5)*.4,Math.random()*Math.PI*2,(Math.random()-.5)*.4),Rt.castShadow=!0,Rt.receiveShadow=!0,i.add(Rt),Ee.push(Rt)}}}function ue(){Ee.forEach(O=>{i.remove(O),O.geometry.dispose(),O.material.dispose()}),Ee=[]}let fe=[];function S(){fe.forEach(O=>{i.remove(O),O.geometry.dispose(),O.material.dispose()}),fe=[]}function _(){H.value=!H.value,H.value?(ne=!1,r.fov=55,r.updateProjectionMatrix(),le(),ge(),B.forEach(O=>{O.traverse(U=>{U.isMesh&&(U.castShadow=!0,U.receiveShadow=!0)})}),a&&(a.receiveShadow=!0,a.castShadow=!0)):(ne=!0,A(),ue(),S(),r.fov=75,r.updateProjectionMatrix())}function F(){o&&cancelAnimationFrame(o),c.forEach(O=>{i.remove(O),O.geometry.dispose(),O.material.dispose()}),c=[],B.forEach(O=>{i.remove(O),O.traverse(U=>{U.geometry&&U.geometry.dispose(),U.material&&U.material.dispose()})}),B.length=0,A(),ue(),S(),Be&&(i.remove(Be),Be.geometry.dispose(),Be.material.dispose(),Be=null),s&&(s.dispose(),t.value&&s.domElement&&t.value.removeChild(s.domElement)),a&&(a.geometry.dispose(),a.material.dispose())}return(O,U)=>(at(),Mt("div",py,[ce("div",{class:"terrain-container",ref_key:"terrainContainer",ref:t},null,512),H.value?(at(),Mt("button",{key:0,class:"btn-back-editor",onClick:_}," 🎮 Voltar ao Editor ")):Un("",!0),H.value?Un("",!0):(at(),Mt("div",my,[U[19]||(U[19]=ce("h3",null,"⛰️ Configurações do Terreno",-1)),ce("div",gy,[U[18]||(U[18]=ce("label",null,"Seed",-1)),ce("div",_y,[It(ce("input",{type:"number","onUpdate:modelValue":U[0]||(U[0]=N=>h.value=N),onChange:oe},null,544),[[Lt,h.value,void 0,{number:!0}]]),ce("button",{class:"btn-icon",onClick:se,title:"Seed aleatória"}," 🎲 ")])]),U[20]||(U[20]=ce("div",{class:"section-title"},"🌊 Rio",-1)),ce("div",vy,[ce("label",null,"Largura do Rio: "+mt(d.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[1]||(U[1]=N=>d.value=N),min:"5",max:"150",step:"1",onInput:oe},null,544),[[Lt,d.value,void 0,{number:!0}]])]),ce("div",xy,[ce("label",null,"Sinuosidade: "+mt(g.value.toFixed(3)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[2]||(U[2]=N=>g.value=N),min:"0.001",max:"0.05",step:"0.001",onInput:oe},null,544),[[Lt,g.value,void 0,{number:!0}]])]),ce("div",My,[ce("label",null,"Amplitude: "+mt(v.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[3]||(U[3]=N=>v.value=N),min:"10",max:"180",step:"5",onInput:oe},null,544),[[Lt,v.value,void 0,{number:!0}]])]),U[21]||(U[21]=ce("div",{class:"section-title"},"⛰️ Relevo",-1)),ce("div",Sy,[ce("label",null,"Altura Máxima: "+mt(m.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[4]||(U[4]=N=>m.value=N),min:"0.5",max:"40",step:"0.5",onInput:oe},null,544),[[Lt,m.value,void 0,{number:!0}]])]),ce("div",Ey,[ce("label",null,"Suavização Relevo: "+mt(p.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[5]||(U[5]=N=>p.value=N),min:"0.5",max:"20",step:"0.5",onInput:oe},null,544),[[Lt,p.value,void 0,{number:!0}]])]),ce("div",yy,[ce("label",null,"Frequência: "+mt(M.value.toFixed(4)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[6]||(U[6]=N=>M.value=N),min:"0.0001",max:"0.05",step:"0.0001",onInput:oe},null,544),[[Lt,M.value,void 0,{number:!0}]])]),U[22]||(U[22]=ce("div",{class:"section-title"},"🎨 Cores",-1)),ce("div",by,[ce("label",null,"Suavização Cor: "+mt(b.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[7]||(U[7]=N=>b.value=N),min:"1",max:"10",step:"0.5",onInput:oe},null,544),[[Lt,b.value,void 0,{number:!0}]])]),ce("div",Ty,[ce("label",null,"Variação de Cor: "+mt(E.value.toFixed(2)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[8]||(U[8]=N=>E.value=N),min:"0",max:"0.3",step:"0.01",onInput:oe},null,544),[[Lt,E.value,void 0,{number:!0}]])]),ce("div",Ay,[ce("label",null,"Intensidade Verde: "+mt(w.value.toFixed(2)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[9]||(U[9]=N=>w.value=N),min:"0.3",max:"0.9",step:"0.05",onInput:oe},null,544),[[Lt,w.value,void 0,{number:!0}]])]),U[23]||(U[23]=ce("div",{class:"section-title"},"🏖️ Margem",-1)),ce("div",wy,[ce("label",null,"Largura da Margem: "+mt(D.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[10]||(U[10]=N=>D.value=N),min:"5",max:"40",step:"1",onInput:oe},null,544),[[Lt,D.value,void 0,{number:!0}]])]),ce("div",Ry,[ce("label",null,"Suavização Margem: "+mt(C.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[11]||(U[11]=N=>C.value=N),min:"1",max:"5",step:"0.5",onInput:oe},null,544),[[Lt,C.value,void 0,{number:!0}]])]),U[24]||(U[24]=ce("div",{class:"section-title"},"✨ Suavização Global",-1)),ce("div",Cy,[ce("label",null,"Suavidade Grama (Perlin): "+mt(k.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[12]||(U[12]=N=>k.value=N),min:"0.5",max:"5",step:"0.25",onInput:oe},null,544),[[Lt,k.value,void 0,{number:!0}]])]),ce("div",Py,[ce("label",null,"Zona de Transição: "+mt(x.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[13]||(U[13]=N=>x.value=N),min:"5",max:"80",step:"5",onInput:oe},null,544),[[Lt,x.value,void 0,{number:!0}]])]),ce("div",Dy,[ce("label",null,"Suavidade Transição: "+mt(T.value.toFixed(1)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[14]||(U[14]=N=>T.value=N),min:"1",max:"8",step:"0.5",onInput:oe},null,544),[[Lt,T.value,void 0,{number:!0}]])]),U[25]||(U[25]=ce("div",{class:"section-title"},"🌳 Árvores",-1)),ce("div",Iy,[ce("label",null,"Fertilidade: "+mt(V.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[15]||(U[15]=N=>V.value=N),min:"0",max:"200",step:"5",onInput:P},null,544),[[Lt,V.value,void 0,{number:!0}]])]),ce("div",Ly,[ce("label",null,"Distância Mínima: "+mt(j.value),1),It(ce("input",{type:"range","onUpdate:modelValue":U[16]||(U[16]=N=>j.value=N),min:"5",max:"40",step:"1",onInput:P},null,544),[[Lt,j.value,void 0,{number:!0}]])]),q.value.length>0?(at(),Mt("div",Uy,[ce("span",null,mt(q.value.length)+" árvores posicionadas",1)])):Un("",!0),ce("button",{class:"btn-generate",onClick:G,disabled:q.value.length===0||L.value},[L.value?(at(),Mt("span",Fy,"⏳ Gerando...")):(at(),Mt("span",Oy,"🌲 Gerar Árvores"))],8,Ny),U[26]||(U[26]=ce("div",{class:"section-title"},"📷 Visualização",-1)),ce("div",By,[ce("label",null,"Neblina: "+mt(Y.value.toFixed(4)),1),It(ce("input",{type:"range","onUpdate:modelValue":U[17]||(U[17]=N=>Y.value=N),min:"0",max:"0.01",step:"0.0005",onInput:me},null,544),[[Lt,Y.value,void 0,{number:!0}]])]),ce("button",{class:$n(["btn-realistic",{active:H.value}]),onClick:_},[H.value?(at(),Mt("span",Vy,"🎮 Voltar ao Editor")):(at(),Mt("span",zy,"🎬 Modo Realista"))],2)]))]))}},Gy=Xi(ky,[["__scopeId","data-v-2657b4ca"]]);class Hy{constructor(e){this.rng=new ln(e),this.gradients=[];for(let t=0;t<256;t++){const i=this.rng.random()*Math.PI*2;this.gradients[t]={x:Math.cos(i),y:Math.sin(i)}}}fade(e){return e*e*e*(e*(e*6-15)+10)}lerp(e,t,i){return e+i*(t-e)}grad(e,t){const i=(Math.abs(e)*73+Math.abs(t)*37)%256;return this.gradients[i]}dot(e,t,i){return e.x*t+e.y*i}noise(e,t){e*=.1,t*=.1;const i=Math.floor(e),r=Math.floor(t),s=i+1,a=r+1,o=e-i,l=t-r,c=this.dot(this.grad(i,r),o,l),u=this.dot(this.grad(s,r),o-1,l),f=this.dot(this.grad(i,a),o,l-1),h=this.dot(this.grad(s,a),o-1,l-1),d=this.fade(o),g=this.fade(l),v=this.lerp(c,u,d),m=this.lerp(f,h,d);return this.lerp(v,m,g)}octaveNoise(e,t,i=3,r=.5){let s=0,a=1,o=1.5,l=0;for(let c=0;c<i;c++)s+=this.noise(e*o,t*o)*a,l+=a,a*=r,o*=2;return s/l}}const Wy=(n,e,t=10)=>{const i=new Hy(n+12345),r=document.createElement("canvas"),s=Math.max(512,t*50);r.width=s,r.height=s;const a=r.getContext("2d"),o=a.createImageData(s,s),l=o.data,c=e?{r:.2,g:.5,b:.2}:{r:.3,g:.7,b:.3},u=e?{r:.6,g:1,b:0}:{r:.8,g:1,b:0};for(let h=0;h<s;h++)for(let d=0;d<s;d++){const g=(h*s+d)*4,v=d/s*t,m=h/s*t,p=Math.floor(v*2),M=Math.floor(m*2),b=p*1e3+M*100+n,E=b*.1234%50,w=b*.5678%50,D=.8+b*.9876%.4,k=(i.octaveNoise(v*.8,m*.8,3,.5)+1)*.5,T=(i.octaveNoise(v*1.5+100,m*1.5+100,2,.6)+1)*.5,V=i.octaveNoise((v+E)*8*D+200,(m+w)*8*D+200,4,.7),j=i.octaveNoise((v+E*.7)*16*D+300,(m+w*.7)*16*D+300,3,.5),Y=i.octaveNoise((v+E*.3)*32*D+400,(m+w*.3)*32*D+400,2,.3),H=((V+j*.5+Y*.25)/1.75+1)*.5*.6+.7,B={r:c.r*(1-k)+u.r*k,g:c.g*(1-k)+u.g*k,b:c.b*(1-k)+u.b*k},se=(T*1+.4)*H,oe=Math.min(255,Math.max(0,B.r*se*255)),me=Math.min(255,Math.max(0,B.g*se*255)),Te=Math.min(255,Math.max(0,B.b*se*255));l[g]=oe,l[g+1]=me,l[g+2]=Te,l[g+3]=255}a.putImageData(o,0,0);const f=new rv(r);return f.wrapS=Nn,f.wrapT=Nn,f.repeat.set(1,1),f.generateMipmaps=!1,f.minFilter=Bt,f.magFilter=Bt,f},$a=(n,e,t=10)=>{const i=Wy(n,e,t),r=new ki(t,t),s=new fr({map:i,shininess:0}),a=new At(r,s);return a.rotation.x=-Math.PI/2,a.receiveShadow=!0,a},Xy=(n,e="full")=>{const t=e==="simple"?.5:.4,i=new ou(4210752,t);n.add(i);const r=e==="simple"?.8:1,s=new pr(16777215,r);s.position.set(5,5,3),s.castShadow=!0;const a=e==="simple"?512:1024;if(s.shadow.mapSize.width=a,s.shadow.mapSize.height=a,n.add(s),e==="full"){const o=new pr(16777215,.3);o.position.set(-3,2,-2),n.add(o)}return{ambientLight:i,directionalLight:s}},ah=(n,e,t=2,i="full")=>{const r=new cn(60,n/e,.1,100);let s,a;return i==="simple"?(s=Math.max(2.5,t*.8+1.5),a=Math.max(1.5,t*.4+1)):(s=Math.max(4,t*1.2+2),a=Math.max(2,t*.6+1)),r.position.set(s,a,s),r.lookAt(0,t*.3,0),{camera:r,cameraDistance:s,cameraHeight:a}},qy=n=>{const e=new iu;return e.background=new We(n?1710618:8900331),e},Yy=(n,e,t="full")=>{const i=new lu({antialias:!0});return i.setSize(n,e),i.shadowMap.enabled=!0,i.shadowMap.type=ks,i},$y=["src"],Ky={key:1,class:"generating-indicator"},jy={__name:"TreeGridCell",props:{isDark:Boolean,cellIndex:Number,seed:String},emits:["tree-frozen"],setup(n,{emit:e}){const t=n,i=e,r=Ke(null),s=Ke(null),a=Ke(!0);let o,l,c,u,f,h;const d=()=>{if(!c||!o||!l)return;c.render(o,l);const b=c.domElement.toDataURL("image/png");s.value=b,i("tree-frozen",b),g(),c.domElement&&c.domElement.parentNode&&c.domElement.parentNode.removeChild(c.domElement),c&&(c.dispose(),c=null),o=null,l=null,a.value=!1},g=()=>{u&&(u.traverse(M=>{M.isMesh&&(M.geometry&&M.geometry.dispose(),M.material&&(Array.isArray(M.material)?M.material.forEach(b=>{b.map&&b.map.dispose(),b.dispose()}):(M.material.map&&M.material.map.dispose(),M.material.dispose())))}),o&&o.remove(u),u=null),f&&(f.geometry&&f.geometry.dispose(),f.material&&(f.material.map&&f.material.map.dispose(),f.material.dispose()),o&&o.remove(f),f=null)},v=async()=>{if(!r.value)return;g(),o=qy(t.isDark);const{camera:M}=ah(r.value.clientWidth,r.value.clientHeight,2,"simple");l=M,c=Yy(r.value.clientWidth,r.value.clientHeight,"simple"),r.value.appendChild(c.domElement),Xy(o,"simple"),t.seed?(h=Ls(t.seed),console.log("TreeGridCell usando seed da prop:",t.seed,"->",h)):(h=t.cellIndex*87654321+Date.now()%1e6,console.log("TreeGridCell gerando seed aleatória:",h)),f=$a(h,t.isDark,10),o.add(f);const b=await ip(h,"simple");u=b.group;const E=b.height;o.add(u);const{camera:w,cameraDistance:D}=ah(r.value.clientWidth,r.value.clientHeight,E,"simple");l.position.copy(w.position),l.lookAt(0,E*.3,0);const C=Math.max(8,D*1.8);f.geometry.dispose(),f.geometry=new ki(C,C),c.render(o,l),await new Promise(k=>requestAnimationFrame(k)),setTimeout(()=>{d()},100)},m=async()=>{if(s.value){s.value=null,a.value=!0,await v();return}if(!o||!f||!c||!l||!h)return;o.background=new We(t.isDark?1710618:8900331);const M=$a(h,t.isDark,10);f.material&&(f.material.map&&f.material.map.dispose(),f.material.dispose()),f.material=M.material,c.render(o,l),setTimeout(()=>{d()},100)};bn(()=>t.isDark,()=>{m()});const p=()=>{!r.value||!l||!c||(l.aspect=r.value.clientWidth/r.value.clientHeight,l.updateProjectionMatrix(),c.setSize(r.value.clientWidth,r.value.clientHeight),c.render(o,l))};return vr(()=>{setTimeout(v,100),window.addEventListener("resize",p)}),ns(()=>{o&&(o.traverse(M=>{M.isMesh&&(M.geometry&&M.geometry.dispose(),M.material&&(Array.isArray(M.material)?M.material.forEach(b=>{b.map&&b.map.dispose(),b.dispose()}):(M.material.map&&M.material.map.dispose(),M.material.dispose())))}),o.clear()),c&&(c.dispose(),c.domElement&&c.domElement.parentNode&&c.domElement.parentNode.removeChild(c.domElement)),window.removeEventListener("resize",p)}),(M,b)=>(at(),Mt("div",{ref_key:"canvasContainer",ref:r,class:"tree-grid-cell-canvas"},[s.value&&!a.value?(at(),Mt("img",{key:0,src:s.value,alt:"Tree",class:"frozen-tree-image"},null,8,$y)):a.value?(at(),Mt("div",Ky,[...b[0]||(b[0]=[ce("div",{class:"loading-spinner"},null,-1)])])):Un("",!0)],512))}},rp=Xi(jy,[["__scopeId","data-v-2aadef1e"]]),Zy={key:1,class:"progress-indicator"},Jy={class:"progress-bar-small"},Qy={class:"progress-text-small"},eb={__name:"TreeGenerator3D",props:{isDark:Boolean,noGrass:Boolean,fixedCamera:Boolean},setup(n,{expose:e}){const t=n,i=Ke(null),r=Ke(""),s=Ke({}),a=Ke(!1),o=Ke(0),l=Ke(""),c=Ke(!1);let u,f,h,d,g=[],v,m=!1;const p=()=>{const q="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let L="";for(let H=0;H<12;H++)L+=q.charAt(Math.floor(Math.random()*q.length));return L},M=q=>{const L=new ln(Ls(q));return{trunkThickness:L.range(.06,.2),trunkHeight:L.range(1.2,3),trunkTaper:L.range(.7,.95),trunkLean:L.range(0,.25),branchingFactor:L.int(3,5),branchingAngle:L.range(10,60),branchingVariation:L.range(.5,1.5),branchingReduction:L.range(.6,.9),maxBranches:L.int(200,500),lengthReduction:L.range(.5,.9),radiusReduction:L.range(.6,.9),maxDepth:L.int(5,7),leafDensity:L.range(0,1),leafSize:L.range(.8,2),leafClusters:L.int(1,2),leafVariation:L.range(.8,1.2),leafShape:L.int(0,3),upwardBias:L.range(-.3,.5),horizontalSpread:L.range(.8,1.5),trunkHue:L.range(0,60),trunkSaturation:L.range(.3,.8),trunkLightness:L.range(.2,.5),leafHue:L.range(60,150),leafSaturation:L.range(.4,1),leafLightness:L.range(.3,.6),asymmetryFactor:L.range(0,.4),naturalVariation:L.range(.1,.5),continuityRatio:L.range(.5,.8),continuityAngleLimit:L.range(25,50),continuityStrength:L.range(.8,.95),rootHeight:L.range(.8,2.5),rootBaseRadius:L.range(2,5),rootTopRadius:L.range(.7,1.3),rootOvalness:L.range(.6,1.4),rootTwist:L.range(-.3,.3),rootLean:L.range(0,.15),rootLeanDirection:L.range(0,Math.PI*2),rootBumpiness:L.range(.8,1.2)}},b=()=>{if(!t.fixedCamera||!f||g.length===0)return;const q=new _r;g.forEach(Te=>{const Ie=new _r().setFromObject(Te);q.union(Ie)});const L=q.getCenter(new K),H=q.getSize(new K),B=Math.max(H.x,H.y,H.z),W=f.fov*(Math.PI/180);let se=Math.abs(B/Math.sin(W/2))*2;se=Math.max(se,18),se=Math.min(se,35);const oe=Math.PI/4,me=L.y+H.y*.5;f.position.set(L.x+Math.cos(oe)*se,me,L.z+Math.sin(oe)*se),f.lookAt(L),console.log("Auto-fitted camera to forest:",{forestSize:H,forestCenter:L,maxDimension:B,cameraDistance:se,cameraPosition:f.position,totalTrees:g.length})},E=()=>{if(!h||!u||!f||!d){console.error("Cannot capture tree: missing renderer, scene, camera or tree");return}const q=u.background;u.background=null,h.setClearColor(0,0),h.render(u,f);const H=h.domElement.toDataURL("image/png");u.background=q,h.setClearColor(t.isDark?1710618:15792368,1),h.render(u,f);const B=document.createElement("a"),W=g.length>1?`forest-${g.length}-trees`:"tree";B.download=`${W}-${r.value||"generated"}.png`,B.href=H,document.body.appendChild(B),B.click(),document.body.removeChild(B),console.log("Tree image downloaded successfully")},w=async q=>{if(!t.fixedCamera||!u||!d)return;const L=30,H=L-1;g=[d];for(let B=0;B<H;B++){l.value=`Gerando árvore ${B+2} de ${L}...`,o.value=Math.round((B+1)/H*100);try{const W=p(),se=M(W),oe=new ln(Ls(W)),me=new ur,Te=Math.floor(B/10),Ie=B%10/10*Math.PI*2,Be=5+Te*4+Math.random()*3,Ae=(Math.random()-.5)*2,$=Math.cos(Ie)*(Be+Ae)+(Math.random()-.5)*2,I=Math.sin(Ie)*(Be+Ae)+(Math.random()-.5)*2;me.position.set($,0,I);const Q=zr(se.trunkHue,se.trunkSaturation,se.trunkLightness),ae=zr(se.leafHue,se.leafSaturation,se.leafLightness),pe=new fr({color:new We(Q[0],Q[1],Q[2])}),De=new fr({color:new We(ae[0],ae[1],ae[2])}),R=new K(oe.range(-se.trunkLean,se.trunkLean),1,oe.range(-se.trunkLean,se.trunkLean)).normalize(),P=Sc(se.trunkThickness,R,pe,se);me.add(P),await C(me,se,oe,pe,De),u.add(me),g.push(me),console.log(`Tree ${B+2} generated at position:`,{x:$,z:I}),await new Promise(G=>setTimeout(G,100))}catch(W){console.error(`Error generating tree ${B+2}:`,W)}}l.value=`Mini floresta de ${L} árvores concluída!`,o.value=100,setTimeout(()=>{b(),setTimeout(()=>{E()},500)},200),console.log(`Forest generation complete! Generated ${g.length} trees total.`)},D=async q=>{if(m)return null;const L=M(q);s.value=L;const H=new ln(Ls(q)),B=new ur;u.add(B),d=B;const W=zr(L.trunkHue,L.trunkSaturation,L.trunkLightness),se=zr(L.leafHue,L.leafSaturation,L.leafLightness),oe=new fr({color:new We(W[0],W[1],W[2])}),me=new fr({color:new We(se[0],se[1],se[2])}),Te=new K(H.range(-L.trunkLean,L.trunkLean),1,H.range(-L.trunkLean,L.trunkLean)).normalize(),Ie=Sc(L.trunkThickness,Te,oe,L);return B.add(Ie),l.value="Construindo tronco e galhos...",await C(B,L,H,oe,me),l.value="Concluído!",o.value=100,t.fixedCamera&&setTimeout(()=>{w()},300),B},C=async(q,L,H,B,W)=>{const se=[],oe=[];let me=0;const Te=L.leafDensity>.3;se.push({startPos:new K(0,0,0),direction:new K(H.range(-L.trunkLean,L.trunkLean),1,H.range(-L.trunkLean,L.trunkLean)).normalize(),length:L.trunkHeight,radius:L.trunkThickness,depth:L.maxDepth,parentUp:new K(0,1,0),branchRng:new ln(H.next()),asymmetryOffset:0,parentDirection:null});const Ie=2;for(;se.length>0&&!m;){const Be=Math.min(Ie,se.length);for(let Ae=0;Ae<Be&&!m;Ae++){const $=se.shift();if(me>=L.maxBranches){const I=$.startPos.clone().add($.direction.clone().multiplyScalar($.length));Te&&oe.push({position:I,size:Math.max(.1,$.radius*L.leafSize*2),clusters:L.leafClusters,shape:L.leafShape,rng:new ln($.branchRng.next())});continue}await k($,se,oe,q,L,B,Te),me++,o.value=Math.min(85,me/L.maxBranches*85)}if(me>=L.maxBranches){for(;se.length>0;){const Ae=se.shift(),$=Ae.startPos.clone().add(Ae.direction.clone().multiplyScalar(Ae.length));Te&&oe.push({position:$,size:Math.max(.1,Ae.radius*L.leafSize*2),clusters:L.leafClusters,shape:L.leafShape,rng:new ln(Ae.branchRng.next())})}break}await new Promise(Ae=>requestAnimationFrame(Ae))}!m&&oe.length>0&&Te&&(l.value="Adicionando folhas...",await x(oe,q,W,L))},k=async(q,L,H,B,W,se,oe)=>{const{startPos:me,direction:Te,length:Ie,radius:Be,depth:Ae,parentUp:$,branchRng:I,asymmetryOffset:Q,parentDirection:ae}=q;if(Ae<=0||Ie<.05){Ie>.02&&oe&&H.push({position:me.clone(),size:Math.max(.1,Be*W.leafSize*2),clusters:W.leafClusters,shape:W.leafShape,rng:new ln(I.next())});return}const pe=Be*W.trunkTaper,De=new ss(pe,Be,Ie,6),R=new At(De,se),P=me.clone().add(Te.clone().multiplyScalar(Ie));R.position.copy(me.clone().add(P).multiplyScalar(.5)),R.lookAt(P),R.rotateX(Math.PI/2),R.castShadow=!0,R.receiveShadow=!0,B.add(R);const G=W.maxDepth,ne=Math.pow(W.branchingReduction,G-Ae),te=Math.max(1,Math.round(W.branchingFactor*ne)),A=Math.max(1,Math.min(W.branchingFactor,I.int(Math.max(1,te-1),te+1))),Ee=W.branchingAngle;for(let ge=0;ge<A;ge++){const ue=Ae<W.maxDepth&&I.random()<W.continuityRatio;let fe;if(ue){const F=W.continuityAngleLimit*Math.PI/180;let O=Te.clone().normalize();const U=W.continuityStrength;O=new K(0,1,0).lerp(O,U),O.normalize();const N=I.range(-F,F),Me=I.range(-F*.5,F*.5);fe=O.clone();const Z=new K(1,0,0),ve=new K(0,0,1);fe.applyAxisAngle(Z,Me),fe.applyAxisAngle(ve,N);const xe=W.naturalVariation*.3;fe.x+=I.range(-xe,xe),fe.y+=I.range(-xe*.1,xe*.1),fe.z+=I.range(-xe,xe),fe.normalize()}else{const F=Math.sin(Q+ge)*W.asymmetryFactor,O=W.branchingVariation,U=(I.range(0,360)+F*90)*Math.PI/180;let N=Ee*I.range(1/O,O)*Math.PI/180;N+=W.upwardBias*Math.PI/6,fe=Te.clone();const Me=new K().crossVectors(Te,$).normalize();Me.length()>0&&fe.applyAxisAngle(Me,N),fe.applyAxisAngle(Te,U*W.horizontalSpread);const Z=W.naturalVariation;fe.x+=I.range(-Z,Z),fe.y+=I.range(-Z*.5,Z*.5),fe.z+=I.range(-Z,Z),fe.normalize()}const S=I.range(.8,1.2),_=I.range(.8,1.2);L.push({startPos:P.clone(),direction:fe,length:Ie*W.lengthReduction*S,radius:Be*W.radiusReduction*_,depth:Ae-1,parentUp:$.clone(),branchRng:new ln(I.next()),asymmetryOffset:Q+ge*.5,parentDirection:Te.clone()})}},x=async(q,L,H,B)=>{for(let se=0;se<q.length&&!m;se+=3){const oe=Math.min(se+3,q.length);for(let me=se;me<oe;me++){const Te=q[me],Ie=Te.size*Te.rng.range(1/B.leafVariation,B.leafVariation)*1.5,Be=Ya(Ie,Te.shape,"full"),Ae=new At(Be,H);Ae.position.copy(Te.position),Ae.rotation.x=Te.rng.range(0,Math.PI*2),Ae.rotation.y=Te.rng.range(0,Math.PI*2),Ae.rotation.z=Te.rng.range(0,Math.PI*2),Ae.castShadow=!0,Ae.receiveShadow=!0,L.add(Ae);for(let $=0;$<Te.clusters;$++){const I=Ya(Ie,Te.shape,"full"),Q=new At(I,H);Q.position.copy(Te.position);const ae=Ie*.1;Q.position.add(new K(Te.rng.range(-ae,ae),Te.rng.range(-ae,ae),Te.rng.range(-ae,ae))),Q.scale.setScalar(Te.rng.range(.9,1.1)),Q.rotation.x=Te.rng.range(0,Math.PI*2),Q.rotation.y=Te.rng.range(0,Math.PI*2),Q.rotation.z=Te.rng.range(0,Math.PI*2),Q.castShadow=!0,Q.receiveShadow=!0,L.add(Q)}}o.value=85+se/q.length*15,await new Promise(me=>requestAnimationFrame(me))}},T=()=>{if(!i.value)return;if(u=new iu,u.background=new We(t.isDark?1710618:8900331),f=new cn(75,i.value.clientWidth/i.value.clientHeight,.1,1e3),f.position.set(6,4,6),f.lookAt(0,2,0),h=new lu({antialias:!0}),h.setSize(i.value.clientWidth,i.value.clientHeight),h.shadowMap.enabled=!0,h.shadowMap.type=ks,i.value.appendChild(h.domElement),t.fixedCamera)f.position.set(3,2,3),f.lookAt(0,1,0);else{let W=!1,se={x:0,y:0},oe=10,me=.5,Te=0;const Ie=()=>{const Ae=Math.cos(Te)*Math.cos(me)*oe,$=Math.sin(me)*oe,I=Math.sin(Te)*Math.cos(me)*oe;f.position.set(Ae,$+2,I),f.lookAt(0,2,0)};h.domElement.addEventListener("mousedown",Ae=>{W=!0,se={x:Ae.clientX,y:Ae.clientY}}),h.domElement.addEventListener("mousemove",Ae=>{if(W){const $=Ae.clientX-se.x,I=Ae.clientY-se.y;Te+=$*.01,me+=I*.01,me=Math.max(-Math.PI/2+.1,Math.min(Math.PI/2-.1,me)),Ie(),se={x:Ae.clientX,y:Ae.clientY}}}),h.domElement.addEventListener("mouseup",()=>{W=!1}),h.domElement.addEventListener("wheel",Ae=>{Ae.preventDefault(),oe+=Ae.deltaY*.01,oe=Math.max(3,Math.min(20,oe)),Ie()});let Be=0;h.domElement.addEventListener("touchstart",Ae=>{if(Ae.touches.length===1)W=!0,se={x:Ae.touches[0].clientX,y:Ae.touches[0].clientY};else if(Ae.touches.length===2){const $=Ae.touches[0].clientX-Ae.touches[1].clientX,I=Ae.touches[0].clientY-Ae.touches[1].clientY;Be=Math.sqrt($*$+I*I)}}),h.domElement.addEventListener("touchmove",Ae=>{if(Ae.preventDefault(),Ae.touches.length===1&&W){const $=Ae.touches[0].clientX-se.x,I=Ae.touches[0].clientY-se.y;Te+=$*.01,me+=I*.01,me=Math.max(-Math.PI/2+.1,Math.min(Math.PI/2-.1,me)),Ie(),se={x:Ae.touches[0].clientX,y:Ae.touches[0].clientY}}else if(Ae.touches.length===2){const $=Ae.touches[0].clientX-Ae.touches[1].clientX,I=Ae.touches[0].clientY-Ae.touches[1].clientY,Q=Math.sqrt($*$+I*I),ae=Q/Be;oe/=ae,oe=Math.max(3,Math.min(20,oe)),Ie(),Be=Q}}),h.domElement.addEventListener("touchend",()=>{W=!1}),Ie()}const q=new ou(4210752,.4);u.add(q);const L=new pr(16777215,.8);L.position.set(10,10,5),L.castShadow=!0,L.shadow.mapSize.width=1024,L.shadow.mapSize.height=1024,u.add(L);const H=new pr(16777215,.3);if(H.position.set(-5,5,-5),u.add(H),!t.noGrass){const W=$a(Date.now(),t.isDark,20);W.name="ground",u.add(W)}const B=()=>{v=requestAnimationFrame(B),h.render(u,f)};B()},V=async()=>{r.value=p(),await j(r.value)},j=async q=>{m=!0,await new Promise(L=>setTimeout(L,50)),m=!1,a.value=!0,o.value=0,l.value="Iniciando geração...",r.value=q;try{if(d&&(u.remove(d),d.traverse(L=>{L.isMesh&&(L.geometry&&L.geometry.dispose(),L.material&&L.material.dispose())})),g.length>0&&(g.forEach(L=>{u.remove(L),L.traverse(H=>{H.isMesh&&(H.geometry&&H.geometry.dispose(),H.material&&H.material.dispose())})}),g=[]),q.length===8){c.value=!0,h&&h.domElement&&(h.domElement.style.display="none");const L=M(q);s.value=L,o.value=100}else c.value=!1,h&&h.domElement&&(h.domElement.style.display="block"),await D(q)}catch(L){console.error("Error generating tree:",L)}finally{a.value=!1,o.value=0,l.value=""}},Y=()=>{!i.value||!f||!h||(f.aspect=i.value.clientWidth/i.value.clientHeight,f.updateProjectionMatrix(),h.setSize(i.value.clientWidth,i.value.clientHeight))};return bn(()=>t.isDark,()=>{if(u){u.background=new We(t.isDark?1710618:8900331);const q=u.getObjectByName("ground");if(q&&(u.remove(q),q.geometry.dispose(),q.material.map&&q.material.map.dispose(),q.material.dispose()),!t.noGrass){const L=$a(Date.now(),t.isDark,20);L.name="ground",u.add(L)}}}),vr(()=>{setTimeout(T,100),window.addEventListener("resize",Y)}),ns(()=>{m=!0,v&&cancelAnimationFrame(v),h&&h.dispose(),window.removeEventListener("resize",Y)}),e({generateRandomTree:V,generateTreeFromSeed:j,getCurrentSeed:()=>r.value,getTreeCharacteristics:()=>s.value,isGenerating:()=>a.value,getGenerationProgress:()=>o.value,getCurrentPhase:()=>l.value,captureAndDownloadTree:E}),(q,L)=>(at(),Mt("div",{ref_key:"canvasContainer",ref:i,class:"tree-canvas-3d"},[c.value?(at(),di(rp,{key:r.value,isDark:n.isDark,seed:r.value,cellIndex:1,class:"simple-tree-overlay"},null,8,["isDark","seed"])):Un("",!0),a.value?(at(),Mt("div",Zy,[ce("div",Jy,[ce("div",{class:"progress-fill-small",style:Qa({width:o.value+"%"})},null,4)]),ce("div",Qy,mt(Math.round(o.value))+"% ",1)])):Un("",!0)],512))}},sp=Xi(eb,[["__scopeId","data-v-eb4abba7"]]);function cu(){const n=Ke(""),e=Ke(!1),t=un(()=>cy(n.value));return{seedInput:n,showSeedActions:e,isValidSeed:t,generateFullSeed:(a=12)=>{const o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let l="";for(let c=0;c<a;c++)l+=o.charAt(Math.floor(Math.random()*o.length));return l},generateRandomSeed:()=>{const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let o="";for(let l=0;l<8;l++)o+=a.charAt(Math.floor(Math.random()*a.length));return o},handleSeedBlur:()=>{setTimeout(()=>{e.value=!1},200)}}}const tb={class:"create-page"},nb={class:"canvas-container"},ib={class:"seed-input-container"},rb={key:0,class:"seed-actions"},sb=["disabled","title"],ab={key:1,class:"seed-controls"},ob=["disabled"],lb={class:"tree-data-modal"},cb={key:0,class:"tree-data-content"},ub={class:"data-row"},fb={class:"data-value"},hb={class:"data-row"},db={class:"data-value"},pb={class:"data-row"},mb={class:"data-value"},gb={class:"data-row"},_b={class:"data-value"},vb={class:"data-row"},xb={class:"data-value"},Mb={__name:"CreateView",props:{isDark:Boolean,initialSeed:String},setup(n,{expose:e}){const t=n,i=Ke(null),{seedInput:r,showSeedActions:s,isValidSeed:a,generateFullSeed:o,handleSeedBlur:l}=cu(),c=async()=>{if(i.value)try{const d=o(12);r.value=d,i.value.generateTreeFromSeed&&await i.value.generateTreeFromSeed(d)}catch(d){console.error("Erro ao gerar nova árvore:",d)}},u=async()=>{if(!(!i.value||!a.value))try{const d=r.value.toUpperCase().trim();i.value.generateTreeFromSeed&&(await i.value.generateTreeFromSeed(d),s.value=!1)}catch(d){console.error("Erro ao confirmar seed:",d)}},f=()=>{if(!i.value){s.value=!1;return}try{if(i.value.getCurrentSeed){const d=i.value.getCurrentSeed();r.value=d}s.value=!1}catch(d){console.error("Erro ao cancelar seed:",d),s.value=!1}},h=async()=>{if(i.value)try{if(i.value.getCurrentSeed){const d=i.value.getCurrentSeed();try{await navigator.clipboard.writeText(d),r.value=d}catch(g){console.error("Erro ao copiar para área de transferência:",g),r.value=d}}}catch(d){console.error("Erro ao copiar seed:",d)}};return bn(()=>t.initialSeed,d=>{d&&(r.value=d,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(d)},100))}),vr(()=>{if(t.initialSeed)r.value=t.initialSeed,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(t.initialSeed)},100);else{const d=o(12);r.value=d,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(d)},100)}}),e({regenerateTree:d=>{r.value=d,i.value&&i.value.generateTreeFromSeed(d)}}),(d,g)=>(at(),Mt("div",tb,[ce("div",nb,[St(sp,{ref_key:"treeGenerator",ref:i,isDark:n.isDark,class:"tree-canvas-3d"},null,8,["isDark"]),ce("div",ib,[ce("div",{class:$n(["seed-input-group",{invalid:ot(s)&&!ot(a)}])},[It(ce("input",{"onUpdate:modelValue":g[0]||(g[0]=v=>zt(r)?r.value=v:null),onFocus:g[1]||(g[1]=v=>s.value=!0),onBlur:g[2]||(g[2]=(...v)=>ot(l)&&ot(l)(...v)),onKeyup:[Vu(u,["enter"]),Vu(f,["escape"])],class:"seed-input",placeholder:"8 ou 12 chars",maxlength:"12"},null,544),[[Lt,ot(r)]]),ot(s)?(at(),Mt("div",rb,[ce("button",{onClick:u,disabled:!ot(a),class:"seed-action confirm",title:ot(a)?"Gerar árvore":"Seed deve ter 8 ou 12 caracteres"},[St(ot(O0),{size:18})],8,sb),ce("button",{onClick:f,class:"seed-action cancel",title:"Cancelar"},[St(ot(H0),{size:18})])])):(at(),Mt("div",ab,[ce("button",{onClick:h,class:"seed-control copy",title:"Copiar seed"},[St(ot(B0),{size:18})]),ce("button",{onClick:c,class:"seed-control refresh",title:"Nova seed aleatória",disabled:i.value?.isGenerating?.()},[St(ot(k0),{size:18})],8,ob)]))],2)]),ce("div",lb,[g[8]||(g[8]=ce("div",{class:"tree-data-header"},[ce("div",{class:"tree-icon"},"🌳"),ce("span",{class:"tree-title"},"Tree Data")],-1)),i.value?.getTreeCharacteristics?.()?(at(),Mt("div",cb,[ce("div",ub,[g[3]||(g[3]=ce("span",{class:"data-label"},"Trunk",-1)),ce("span",fb,mt((i.value.getTreeCharacteristics().trunkThickness*100||0).toFixed(0))+"cm",1)]),ce("div",hb,[g[4]||(g[4]=ce("span",{class:"data-label"},"Height",-1)),ce("span",db,mt((i.value.getTreeCharacteristics().trunkHeight||0).toFixed(1))+"m",1)]),ce("div",pb,[g[5]||(g[5]=ce("span",{class:"data-label"},"Branches",-1)),ce("span",mb,mt(i.value.getTreeCharacteristics().branchingFactor)+"-1/node",1)]),ce("div",gb,[g[6]||(g[6]=ce("span",{class:"data-label"},"Angle",-1)),ce("span",_b,mt((i.value.getTreeCharacteristics().branchingAngle||0).toFixed(0))+"°",1)]),ce("div",vb,[g[7]||(g[7]=ce("span",{class:"data-label"},"Leaves",-1)),ce("span",xb,mt((i.value.getTreeCharacteristics().leafDensity*100||0).toFixed(0))+"%",1)])])):Un("",!0)])])]))}},Sb=Xi(Mb,[["__scopeId","data-v-571571ea"]]),Eb={class:"registro-page"},yb={class:"canvas-container"},bb=["disabled"],Tb={__name:"RegistroView",props:{isDark:Boolean,initialSeed:String},setup(n,{expose:e}){const t=n,i=Ke(null),{seedInput:r,generateFullSeed:s}=cu(),a=()=>{if(i.value)try{i.value.captureAndDownloadTree&&i.value.captureAndDownloadTree()}catch(o){console.error("Erro ao baixar árvore:",o)}};return bn(()=>t.initialSeed,o=>{o&&(r.value=o,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(o)},100))}),vr(()=>{if(t.initialSeed)r.value=t.initialSeed,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(t.initialSeed)},100);else{const o=s(12);r.value=o,setTimeout(()=>{i.value&&i.value.generateTreeFromSeed(o)},100)}}),e({regenerateTree:o=>{r.value=o,i.value&&i.value.generateTreeFromSeed(o)}}),(o,l)=>(at(),Mt("div",Eb,[ce("div",yb,[St(sp,{ref_key:"treeGenerator",ref:i,isDark:n.isDark,noGrass:!0,fixedCamera:!0,class:"tree-canvas-3d"},null,8,["isDark"]),ce("button",{onClick:a,disabled:i.value?.isGenerating?.(),class:"download-button",title:"Baixar árvore como PNG"},[St(ot(V0),{size:18}),l[0]||(l[0]=ud(" Baixar PNG ",-1))],8,bb)])]))}},Ab=Xi(Tb,[["__scopeId","data-v-fa3f60fe"]]),wb={class:"shop-page"},Rb={class:"banner"},Cb={class:"banner-content"},Pb={class:"banner-stats"},Db={class:"counter"},Ib={class:"products"},Lb={class:"product-grid"},Ub={class:"tree-canvas-preview"},Nb={class:"card-footer"},Fb={class:"seed-code"},Ob=["onClick"],Bb={class:"card-footer"},Vb={class:"view-button disabled",title:"Loading...",disabled:""},zb={__name:"ShopView",props:{isDark:Boolean},emits:["zoom-tree"],setup(n,{emit:e}){const t=e,i=Ad(),{generateRandomSeed:r}=cu(),s=Ke([]),a=Ke(null),o=Math.pow(36,8)+Math.pow(36,9)+Math.pow(36,10)+Math.pow(36,11)+Math.pow(36,12),l=un(()=>o.toLocaleString("pt-BR")),c=()=>{i.push("/create")};let u=null;const f=g=>{t("zoom-tree",g),i.push("/create")},h=()=>{for(let g=0;g<8;g++)s.value.push({seed:r()})},d=()=>{a.value&&(u=new IntersectionObserver(g=>{g.forEach(v=>{v.isIntersecting&&h()})},{threshold:.1,rootMargin:"0px"}),u.observe(a.value))};return vr(()=>{for(let g=0;g<8;g++)s.value.push({seed:r()});setTimeout(()=>{d()},100)}),ns(()=>{u&&u.disconnect()}),(g,v)=>(at(),Mt("div",wb,[ce("section",Rb,[v[3]||(v[3]=ce("div",{class:"banner-overlay"},null,-1)),ce("div",Cb,[v[1]||(v[1]=ce("h1",null,"Generative Forest",-1)),v[2]||(v[2]=ce("p",null,"Unique trees, procedurally generated just for you",-1)),ce("div",Pb,[ce("span",Db,mt(l.value),1),v[0]||(v[0]=ce("span",{class:"counter-label"},"possible trees for you",-1))]),ce("button",{class:"cta-button",onClick:c},"Generate My Tree")])]),ce("section",Ib,[ce("div",Lb,[(at(!0),Mt(Dn,null,dm(s.value,(m,p)=>(at(),Mt("div",{key:`tree-${m.seed}-${p}`,class:"product-card"},[ce("div",Ub,[(at(),di(rp,{key:`cell-${m.seed}`,isDark:n.isDark,seed:m.seed,shouldFreeze:!0,cardIndex:p},null,8,["isDark","seed","cardIndex"]))]),ce("div",Nb,[ce("p",Fb,mt(m.seed),1),ce("button",{class:"view-button",title:"Ver árvore em detalhes",onClick:M=>f(m.seed)},[St(ot(af),{size:22,"stroke-width":2.5})],8,Ob)])]))),128)),ce("div",{ref_key:"spinnerCard",ref:a,class:"product-card empty-card"},[v[5]||(v[5]=ce("div",{class:"tree-canvas-preview"},[ce("div",{class:"loading-spinner-container"},[ce("div",{class:"loading-spinner"})])],-1)),ce("div",Bb,[v[4]||(v[4]=ce("p",{class:"seed-code empty-seed"},"---",-1)),ce("button",Vb,[St(ot(af),{size:22,"stroke-width":2.5})])])],512)])])]))}},kb=Xi(zb,[["__scopeId","data-v-8783ac08"]]),Gb={class:"content"},Hb={__name:"App",setup(n){const e=I0(),t=Ad(),i=Ke(null),{isDark:r,toggleTheme:s}=K0(),a={1:"Shop",2:"Create",3:"Registro",4:"Cenario"},o=un(()=>{const u=e.query.aba,f=parseInt(u)||1;return a[f]||"Shop"}),l=u=>{i.value=u,t.push("/?aba=2")};bn(o,u=>{u!=="Create"&&(i.value=null)});const c=u=>{t.push(`/?aba=${u}`)};return(u,f)=>(at(),Mt("div",{class:$n([{"dark-theme":ot(r),"light-theme":!ot(r)},"app"])},[St(q0,{currentPage:o.value,isDark:ot(r),onToggleTheme:ot(s),onSetPage:c},null,8,["currentPage","isDark","onToggleTheme"]),ce("main",Gb,[o.value==="Create"?(at(),di(Sb,{key:0,isDark:ot(r),initialSeed:i.value},null,8,["isDark","initialSeed"])):Un("",!0),o.value==="Shop"?(at(),di(kb,{key:1,isDark:ot(r),onZoomTree:l},null,8,["isDark"])):Un("",!0),o.value==="Registro"?(at(),di(Ab,{key:2,isDark:ot(r),initialSeed:i.value},null,8,["isDark","initialSeed"])):Un("",!0),o.value==="Cenario"?(at(),di(Gy,{key:3,isDark:ot(r),initialSeed:i.value},null,8,["isDark","initialSeed"])):Un("",!0)])],2))}},ap=Xi(Hb,[["__scopeId","data-v-0c8f1c19"]]),Wb=[{path:"/",name:"Home",component:ap}],Xb=D0({history:c0("/tree-marketplace-b2c/"),routes:Wb});yg(ap).use(Xb).mount("#app");
