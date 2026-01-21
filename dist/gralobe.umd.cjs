(function(Z,ot){typeof exports=="object"&&typeof module<"u"?ot(exports,require("three"),require("three/examples/jsm/controls/OrbitControls.js"),require("three/examples/jsm/renderers/CSS2DRenderer.js")):typeof define=="function"&&define.amd?define(["exports","three","three/examples/jsm/controls/OrbitControls.js","three/examples/jsm/renderers/CSS2DRenderer.js"],ot):(Z=typeof globalThis<"u"?globalThis:Z||self,ot(Z.Gralobe={},Z.THREE,Z.OrbitControls_js,Z.CSS2DRenderer_js))})(this,(function(Z,ot,Cn,Wt){"use strict";function Pn(o){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(o){for(const t in o)if(t!=="default"){const i=Object.getOwnPropertyDescriptor(o,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>o[t]})}}return e.default=o,Object.freeze(e)}const A=Pn(ot);function _e(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function ji(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.__proto__=e}var se={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},We={duration:.5,overwrite:!1,delay:0},qt,W,F,he=1e8,R=1/he,Xt=Math.PI*2,An=Xt/4,Sn=0,Hi=Math.sqrt,Tn=Math.cos,Mn=Math.sin,Y=function(e){return typeof e=="string"},B=function(e){return typeof e=="function"},ve=function(e){return typeof e=="number"},Zt=function(e){return typeof e>"u"},me=function(e){return typeof e=="object"},Q=function(e){return e!==!1},Kt=function(){return typeof window<"u"},Tt=function(e){return B(e)||Y(e)},Yi=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},q=Array.isArray,Jt=/(?:-?\.?\d|\.)+/gi,Wi=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qe=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Qt=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,qi=/[+-]=-?[.\d]+/,Xi=/[^,'"\[\]\s]+/gi,Dn=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,z,ge,ei,ti,ae={},Mt={},Zi,Ki=function(e){return(Mt=Ze(e,ae))&&ie},ii=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},lt=function(e,t){return!t&&console.warn(e)},Ji=function(e,t){return e&&(ae[e]=t)&&Mt&&(Mt[e]=t)||ae},ct=function(){return 0},Ln={suppressEvents:!0,isStart:!0,kill:!1},Dt={suppressEvents:!0,kill:!1},In={suppressEvents:!0},ri={},Pe=[],ni={},Qi,oe={},si={},er=30,Lt=[],ai="",oi=function(e){var t=e[0],i,r;if(me(t)||B(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Lt.length;r--&&!Lt[r].targetTest(t););i=Lt[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Mr(e[r],i)))||e.splice(r,1);return e},ke=function(e){return e._gsap||oi(pe(e))[0]._gsap},tr=function(e,t,i){return(i=e[t])&&B(i)?e[t]():Zt(i)&&e.getAttribute&&e.getAttribute(t)||i},ee=function(e,t){return(e=e.split(",")).forEach(t)||e},G=function(e){return Math.round(e*1e5)/1e5||0},V=function(e){return Math.round(e*1e7)/1e7||0},Xe=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},Rn=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},It=function(){var e=Pe.length,t=Pe.slice(0),i,r;for(ni={},Pe.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},li=function(e){return!!(e._initted||e._startAt||e.add)},ir=function(e,t,i,r){Pe.length&&!W&&It(),e.render(t,i,!!(W&&t<0&&li(e))),Pe.length&&!W&&It()},rr=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Xi).length<2?t:Y(e)?e.trim():e},nr=function(e){return e},le=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},kn=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},Ze=function(e,t){for(var i in t)e[i]=t[i];return e},sr=function o(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=me(t[i])?o(e[i]||(e[i]={}),t[i]):t[i]);return e},Rt=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},ut=function(e){var t=e.parent||z,i=e.keyframes?kn(q(e.keyframes)):le;if(Q(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},On=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},ar=function(e,t,i,r,n){var s=e[r],a;if(n)for(a=t[n];s&&s[n]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=s,t.parent=t._dp=e,t},kt=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var n=t._prev,s=t._next;n?n._next=s:e[i]===t&&(e[i]=s),s?s._prev=n:e[r]===t&&(e[r]=n),t._next=t._prev=t.parent=null},Ae=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Oe=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Fn=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ci=function(e,t,i,r){return e._startAt&&(W?e._startAt.revert(Dt):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Un=function o(e){return!e||e._ts&&o(e.parent)},or=function(e){return e._repeat?Ke(e._tTime,e=e.duration()+e._rDelay)*e:0},Ke=function(e,t){var i=Math.floor(e=V(e/t));return e&&i===e?i-1:i},Ot=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ft=function(e){return e._end=V(e._start+(e._tDur/Math.abs(e._ts||e._rts||R)||0))},Ut=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=V(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ft(e),i._dirty||Oe(i,e)),e},lr=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ot(e.rawTime(),t),(!t._dur||dt(0,t.totalDuration(),i)-t._tTime>R)&&t.render(i,!0)),Oe(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-R}},ye=function(e,t,i,r){return t.parent&&Ae(t),t._start=V((ve(i)?i:i||e!==z?de(e,i,t):e._time)+t._delay),t._end=V(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),ar(e,t,"_first","_last",e._sort?"_start":0),ui(t)||(e._recent=t),r||lr(e,t),e._ts<0&&Ut(e,e._tTime),e},cr=function(e,t){return(ae.ScrollTrigger||ii("scrollTrigger",t))&&ae.ScrollTrigger.create(t,e)},ur=function(e,t,i,r,n){if(xi(e,t,n),!e._initted)return 1;if(!i&&e._pt&&!W&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Qi!==ue.frame)return Pe.push(e),e._lazy=[n,r],1},zn=function o(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||o(t))},ui=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Nn=function(e,t,i,r){var n=e.ratio,s=t<0||!t&&(!e._start&&zn(e)&&!(!e._initted&&ui(e))||(e._ts<0||e._dp._ts<0)&&!ui(e))?0:1,a=e._rDelay,l=0,u,c,h;if(a&&e._repeat&&(l=dt(0,e._tDur,t),c=Ke(l,a),e._yoyo&&c&1&&(s=1-s),c!==Ke(e._tTime,a)&&(n=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==n||W||r||e._zTime===R||!t&&e._zTime){if(!e._initted&&ur(e,t,r,i,l))return;for(h=e._zTime,e._zTime=t||(i?R:0),i||(i=t&&!h),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,u=e._pt;u;)u.r(s,u.d),u=u._next;t<0&&ci(e,t,i,!0),e._onUpdate&&!i&&ce(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&ce(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Ae(e,1),!i&&!W&&(ce(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Bn=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Je=function(e,t,i,r){var n=e._repeat,s=V(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=s/e._dur),e._dur=s,e._tDur=n?n<0?1e10:V(s*(n+1)+e._rDelay*n):s,a>0&&!r&&Ut(e,e._tTime=e._tDur*a),e.parent&&Ft(e),i||Oe(e.parent,e),e},hr=function(e){return e instanceof K?Oe(e):Je(e,e._dur)},$n={_start:0,endTime:ct,totalDuration:ct},de=function o(e,t,i){var r=e.labels,n=e._recent||$n,s=e.duration()>=he?n.endTime(!1):e._dur,a,l,u;return Y(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?n:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=s),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&i&&(l=l/100*(q(i)?i[0]:i).totalDuration()),a>1?o(e,t.substr(0,a-1),i)+l:s+l)):t==null?s:+t},ht=function(e,t,i){var r=ve(t[1]),n=(r?2:1)+(e<2?0:1),s=t[n],a,l;if(r&&(s.duration=t[1]),s.parent=i,e){for(a=s,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Q(l.vars.inherit)&&l.parent;s.immediateRender=Q(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[n-1]}return new j(t[0],s,t[n+1])},Se=function(e,t){return e||e===0?t(e):t},dt=function(e,t,i){return i<e?e:i>t?t:i},X=function(e,t){return!Y(e)||!(t=Dn.exec(e))?"":t[1]},Gn=function(e,t,i){return Se(i,function(r){return dt(e,t,r)})},hi=[].slice,dr=function(e,t){return e&&me(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&me(e[0]))&&!e.nodeType&&e!==ge},Vn=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var n;return Y(r)&&!t||dr(r,1)?(n=i).push.apply(n,pe(r)):i.push(r)})||i},pe=function(e,t,i){return F&&!t&&F.selector?F.selector(e):Y(e)&&!i&&(ei||!et())?hi.call((t||ti).querySelectorAll(e),0):q(e)?Vn(e,i):dr(e)?hi.call(e,0):e?[e]:[]},di=function(e){return e=pe(e)[0]||lt("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return pe(t,i.querySelectorAll?i:i===e?lt("Invalid scope")||ti.createElement("div"):e)}},pr=function(e){return e.sort(function(){return .5-Math.random()})},fr=function(e){if(B(e))return e;var t=me(e)?e:{each:e},i=Fe(t.ease),r=t.from||0,n=parseFloat(t.base)||0,s={},a=r>0&&r<1,l=isNaN(r)||a,u=t.axis,c=r,h=r;return Y(r)?c=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(c=r[0],h=r[1]),function(p,f,m){var d=(m||t).length,g=s[d],y,b,_,E,v,C,x,P,w;if(!g){if(w=t.grid==="auto"?0:(t.grid||[1,he])[1],!w){for(x=-he;x<(x=m[w++].getBoundingClientRect().left)&&w<d;);w<d&&w--}for(g=s[d]=[],y=l?Math.min(w,d)*c-.5:r%w,b=w===he?0:l?d*h/w-.5:r/w|0,x=0,P=he,C=0;C<d;C++)_=C%w-y,E=b-(C/w|0),g[C]=v=u?Math.abs(u==="y"?E:_):Hi(_*_+E*E),v>x&&(x=v),v<P&&(P=v);r==="random"&&pr(g),g.max=x-P,g.min=P,g.v=d=(parseFloat(t.amount)||parseFloat(t.each)*(w>d?d-1:u?u==="y"?d/w:w:Math.max(w,d/w))||0)*(r==="edges"?-1:1),g.b=d<0?n-d:n,g.u=X(t.amount||t.each)||0,i=i&&d<0?Ar(i):i}return d=(g[p]-g.min)/g.max||0,V(g.b+(i?i(d):d)*g.v)+g.u}},pi=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=V(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(ve(i)?0:X(i))}},mr=function(e,t){var i=q(e),r,n;return!i&&me(e)&&(r=i=e.radius||he,e.values?(e=pe(e.values),(n=!ve(e[0]))&&(r*=r)):e=pi(e.increment)),Se(t,i?B(e)?function(s){return n=e(s),Math.abs(n-s)<=r?n:s}:function(s){for(var a=parseFloat(n?s.x:s),l=parseFloat(n?s.y:0),u=he,c=0,h=e.length,p,f;h--;)n?(p=e[h].x-a,f=e[h].y-l,p=p*p+f*f):p=Math.abs(e[h]-a),p<u&&(u=p,c=h);return c=!r||u<=r?e[c]:s,n||c===s||ve(s)?c:c+X(s)}:pi(e))},gr=function(e,t,i,r){return Se(q(e)?!t:i===!0?!!(i=0):!r,function(){return q(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},jn=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(n,s){return s(n)},r)}},Hn=function(e,t){return function(i){return e(parseFloat(i))+(t||X(i))}},Yn=function(e,t,i){return br(e,t,0,1,i)},yr=function(e,t,i){return Se(i,function(r){return e[~~t(r)]})},Wn=function o(e,t,i){var r=t-e;return q(e)?yr(e,o(0,e.length),t):Se(i,function(n){return(r+(n-e)%r)%r+e})},qn=function o(e,t,i){var r=t-e,n=r*2;return q(e)?yr(e,o(0,e.length-1),t):Se(i,function(s){return s=(n+(s-e)%n)%n||0,e+(s>r?n-s:s)})},pt=function(e){for(var t=0,i="",r,n,s,a;~(r=e.indexOf("random(",t));)s=e.indexOf(")",r),a=e.charAt(r+7)==="[",n=e.substr(r+7,s-r-7).match(a?Xi:Jt),i+=e.substr(t,r-t)+gr(a?n:+n[0],a?0:+n[1],+n[2]||1e-5),t=s+1;return i+e.substr(t,e.length-t)},br=function(e,t,i,r,n){var s=t-e,a=r-i;return Se(n,function(l){return i+((l-e)/s*a||0)})},Xn=function o(e,t,i,r){var n=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!n){var s=Y(e),a={},l,u,c,h,p;if(i===!0&&(r=1)&&(i=null),s)e={p:e},t={p:t};else if(q(e)&&!q(t)){for(c=[],h=e.length,p=h-2,u=1;u<h;u++)c.push(o(e[u-1],e[u]));h--,n=function(m){m*=h;var d=Math.min(p,~~m);return c[d](m-d)},i=t}else r||(e=Ze(q(e)?[]:{},e));if(!c){for(l in t)yi.call(a,e,l,"get",t[l]);n=function(m){return Ei(m,a)||(s?e.p:e)}}}return Se(i,n)},xr=function(e,t,i){var r=e.labels,n=he,s,a,l;for(s in r)a=r[s]-t,a<0==!!i&&a&&n>(a=Math.abs(a))&&(l=s,n=a);return l},ce=function(e,t,i){var r=e.vars,n=r[t],s=F,a=e._ctx,l,u,c;if(n)return l=r[t+"Params"],u=r.callbackScope||e,i&&Pe.length&&It(),a&&(F=a),c=l?n.apply(u,l):n.call(u),F=s,c},ft=function(e){return Ae(e),e.scrollTrigger&&e.scrollTrigger.kill(!!W),e.progress()<1&&ce(e,"onInterrupt"),e},Qe,_r=[],vr=function(e){if(e)if(e=!e.name&&e.default||e,Kt()||e.headless){var t=e.name,i=B(e),r=t&&!i&&e.init?function(){this._props=[]}:e,n={init:ct,render:Ei,add:yi,kill:hs,modifier:us,rawVars:0},s={targetTest:0,get:0,getSetter:vi,aliases:{},register:0};if(et(),e!==r){if(oe[t])return;le(r,le(Rt(e,n),s)),Ze(r.prototype,Ze(n,Rt(e,s))),oe[r.prop=t]=r,e.targetTest&&(Lt.push(r),ri[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Ji(t,r),e.register&&e.register(ie,r,te)}else _r.push(e)},k=255,mt={aqua:[0,k,k],lime:[0,k,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,k],navy:[0,0,128],white:[k,k,k],olive:[128,128,0],yellow:[k,k,0],orange:[k,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[k,0,0],pink:[k,192,203],cyan:[0,k,k],transparent:[k,k,k,0]},fi=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*k+.5|0},Er=function(e,t,i){var r=e?ve(e)?[e>>16,e>>8&k,e&k]:0:mt.black,n,s,a,l,u,c,h,p,f,m;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),mt[e])r=mt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(n=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+n+n+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&k,r&k,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&k,e&k]}else if(e.substr(0,3)==="hsl"){if(r=m=e.match(Jt),!t)l=+r[0]%360/360,u=+r[1]/100,c=+r[2]/100,s=c<=.5?c*(u+1):c+u-c*u,n=c*2-s,r.length>3&&(r[3]*=1),r[0]=fi(l+1/3,n,s),r[1]=fi(l,n,s),r[2]=fi(l-1/3,n,s);else if(~e.indexOf("="))return r=e.match(Wi),i&&r.length<4&&(r[3]=1),r}else r=e.match(Jt)||mt.transparent;r=r.map(Number)}return t&&!m&&(n=r[0]/k,s=r[1]/k,a=r[2]/k,h=Math.max(n,s,a),p=Math.min(n,s,a),c=(h+p)/2,h===p?l=u=0:(f=h-p,u=c>.5?f/(2-h-p):f/(h+p),l=h===n?(s-a)/f+(s<a?6:0):h===s?(a-n)/f+2:(n-s)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(u*100+.5),r[2]=~~(c*100+.5)),i&&r.length<4&&(r[3]=1),r},wr=function(e){var t=[],i=[],r=-1;return e.split(Te).forEach(function(n){var s=n.match(qe)||[];t.push.apply(t,s),i.push(r+=s.length+1)}),t.c=i,t},Cr=function(e,t,i){var r="",n=(e+r).match(Te),s=t?"hsla(":"rgba(",a=0,l,u,c,h;if(!n)return e;if(n=n.map(function(p){return(p=Er(p,t,1))&&s+(t?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),i&&(c=wr(e),l=i.c,l.join(r)!==c.c.join(r)))for(u=e.replace(Te,"1").split(qe),h=u.length-1;a<h;a++)r+=u[a]+(~l.indexOf(a)?n.shift()||s+"0,0,0,0)":(c.length?c:n.length?n:i).shift());if(!u)for(u=e.split(Te),h=u.length-1;a<h;a++)r+=u[a]+n[a];return r+u[h]},Te=(function(){var o="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in mt)o+="|"+e+"\\b";return new RegExp(o+")","gi")})(),Zn=/hsl[a]?\(/,Pr=function(e){var t=e.join(" "),i;if(Te.lastIndex=0,Te.test(t))return i=Zn.test(t),e[1]=Cr(e[1],i),e[0]=Cr(e[0],i,wr(e[1])),!0},gt,ue=(function(){var o=Date.now,e=500,t=33,i=o(),r=i,n=1e3/240,s=n,a=[],l,u,c,h,p,f,m=function d(g){var y=o()-r,b=g===!0,_,E,v,C;if((y>e||y<0)&&(i+=y-t),r+=y,v=r-i,_=v-s,(_>0||b)&&(C=++h.frame,p=v-h.time*1e3,h.time=v=v/1e3,s+=_+(_>=n?4:n-_),E=1),b||(l=u(d)),E)for(f=0;f<a.length;f++)a[f](v,p,C,g)};return h={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(g){return p/(1e3/(g||60))},wake:function(){Zi&&(!ei&&Kt()&&(ge=ei=window,ti=ge.document||{},ae.gsap=ie,(ge.gsapVersions||(ge.gsapVersions=[])).push(ie.version),Ki(Mt||ge.GreenSockGlobals||!ge.gsap&&ge||{}),_r.forEach(vr)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),u=c||function(g){return setTimeout(g,s-h.time*1e3+1|0)},gt=1,m(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(l),gt=0,u=ct},lagSmoothing:function(g,y){e=g||1/0,t=Math.min(y||33,e)},fps:function(g){n=1e3/(g||240),s=h.time*1e3+n},add:function(g,y,b){var _=y?function(E,v,C,x){g(E,v,C,x),h.remove(_)}:g;return h.remove(g),a[b?"unshift":"push"](_),et(),_},remove:function(g,y){~(y=a.indexOf(g))&&a.splice(y,1)&&f>=y&&f--},_listeners:a},h})(),et=function(){return!gt&&ue.wake()},D={},Kn=/^[\d.\-M][\d.\-,\s]/,Jn=/["']/g,Qn=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],n=1,s=i.length,a,l,u;n<s;n++)l=i[n],a=n!==s-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[r]=isNaN(u)?u.replace(Jn,"").trim():+u,r=l.substr(a+1).trim();return t},es=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},ts=function(e){var t=(e+"").split("("),i=D[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Qn(t[1])]:es(e).split(",").map(rr)):D._CE&&Kn.test(e)?D._CE("",e):i},Ar=function(e){return function(t){return 1-e(1-t)}},Sr=function o(e,t){for(var i=e._first,r;i;)i instanceof K?o(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?o(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},Fe=function(e,t){return e&&(B(e)?e:D[e]||ts(e))||t},Ue=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var n={easeIn:t,easeOut:i,easeInOut:r},s;return ee(e,function(a){D[a]=ae[a]=n,D[s=a.toLowerCase()]=i;for(var l in n)D[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=D[a+"."+l]=n[l]}),n},Tr=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},mi=function o(e,t,i){var r=t>=1?t:1,n=(i||(e?.3:.45))/(t<1?t:1),s=n/Xt*(Math.asin(1/r)||0),a=function(c){return c===1?1:r*Math.pow(2,-10*c)*Mn((c-s)*n)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:Tr(a);return n=Xt/n,l.config=function(u,c){return o(e,u,c)},l},gi=function o(e,t){t===void 0&&(t=1.70158);var i=function(s){return s?--s*s*((t+1)*s+t)+1:0},r=e==="out"?i:e==="in"?function(n){return 1-i(1-n)}:Tr(i);return r.config=function(n){return o(e,n)},r};ee("Linear,Quad,Cubic,Quart,Quint,Strong",function(o,e){var t=e<5?e+1:e;Ue(o+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})}),D.Linear.easeNone=D.none=D.Linear.easeIn,Ue("Elastic",mi("in"),mi("out"),mi()),(function(o,e){var t=1/e,i=2*t,r=2.5*t,n=function(a){return a<t?o*a*a:a<i?o*Math.pow(a-1.5/e,2)+.75:a<r?o*(a-=2.25/e)*a+.9375:o*Math.pow(a-2.625/e,2)+.984375};Ue("Bounce",function(s){return 1-n(1-s)},n)})(7.5625,2.75),Ue("Expo",function(o){return Math.pow(2,10*(o-1))*o+o*o*o*o*o*o*(1-o)}),Ue("Circ",function(o){return-(Hi(1-o*o)-1)}),Ue("Sine",function(o){return o===1?1:-Tn(o*An)+1}),Ue("Back",gi("in"),gi("out"),gi()),D.SteppedEase=D.steps=ae.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),n=t?1:0,s=1-R;return function(a){return((r*dt(0,s,a)|0)+n)*i}}},We.ease=D["quad.out"],ee("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(o){return ai+=o+","+o+"Params,"});var Mr=function(e,t){this.id=Sn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:tr,this.set=t?t.getSetter:vi},yt=(function(){function o(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Je(this,+t.duration,1,1),this.data=t.data,F&&(this._ctx=F,F.data.push(this)),gt||ue.wake()}var e=o.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Je(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(et(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Ut(this,i),!n._dp||n.parent||lr(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ye(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===R||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),ir(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+or(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+or(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*n,r):this._repeat?Ke(this._tTime,n)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-R?0:this._rts;if(this._rts===i)return this;var n=this.parent&&this._ts?Ot(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-R?0:this._rts,this.totalTime(dt(-Math.abs(this._delay),this.totalDuration(),n),r!==!1),Ft(this),Fn(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(et(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==R&&(this._tTime-=R)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ye(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Q(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ot(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=In);var r=W;return W=i,li(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),W=r,this},e.globalTime=function(i){for(var r=this,n=arguments.length?i:r.rawTime();r;)n=r._start+n/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):n},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,hr(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,hr(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(de(this,i),Q(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Q(r)),this._dur||(this._zTime=-R),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-R:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-R,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,n;return!!(!i||this._ts&&this._initted&&i.isActive()&&(n=i.rawTime(!0))>=r&&n<this.endTime(!0)-R)},e.eventCallback=function(i,r,n){var s=this.vars;return arguments.length>1?(r?(s[i]=r,n&&(s[i+"Params"]=n),i==="onUpdate"&&(this._onUpdate=r)):delete s[i],this):s[i]},e.then=function(i){var r=this;return new Promise(function(n){var s=B(i)?i:nr,a=function(){var u=r.then;r.then=null,B(s)&&(s=s(r))&&(s.then||s===r)&&(r.then=u),n(s),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){ft(this)},o})();le(yt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-R,_prom:0,_ps:!1,_rts:1});var K=(function(o){ji(e,o);function e(i,r){var n;return i===void 0&&(i={}),n=o.call(this,i)||this,n.labels={},n.smoothChildTiming=!!i.smoothChildTiming,n.autoRemoveChildren=!!i.autoRemoveChildren,n._sort=Q(i.sortChildren),z&&ye(i.parent||z,_e(n),r),i.reversed&&n.reverse(),i.paused&&n.paused(!0),i.scrollTrigger&&cr(_e(n),i.scrollTrigger),n}var t=e.prototype;return t.to=function(r,n,s){return ht(0,arguments,this),this},t.from=function(r,n,s){return ht(1,arguments,this),this},t.fromTo=function(r,n,s,a){return ht(2,arguments,this),this},t.set=function(r,n,s){return n.duration=0,n.parent=this,ut(n).repeatDelay||(n.repeat=0),n.immediateRender=!!n.immediateRender,new j(r,n,de(this,s),1),this},t.call=function(r,n,s){return ye(this,j.delayedCall(0,r,n),s)},t.staggerTo=function(r,n,s,a,l,u,c){return s.duration=n,s.stagger=s.stagger||a,s.onComplete=u,s.onCompleteParams=c,s.parent=this,new j(r,s,de(this,l)),this},t.staggerFrom=function(r,n,s,a,l,u,c){return s.runBackwards=1,ut(s).immediateRender=Q(s.immediateRender),this.staggerTo(r,n,s,a,l,u,c)},t.staggerFromTo=function(r,n,s,a,l,u,c,h){return a.startAt=s,ut(a).immediateRender=Q(a.immediateRender),this.staggerTo(r,n,a,l,u,c,h)},t.render=function(r,n,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,c=r<=0?0:V(r),h=this._zTime<0!=r<0&&(this._initted||!u),p,f,m,d,g,y,b,_,E,v,C,x;if(this!==z&&c>l&&r>=0&&(c=l),c!==this._tTime||s||h){if(a!==this._time&&u&&(c+=this._time-a,r+=this._time-a),p=c,E=this._start,_=this._ts,y=!_,h&&(u||(a=this._zTime),(r||!n)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,g=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(g*100+r,n,s);if(p=V(c%g),c===l?(d=this._repeat,p=u):(v=V(c/g),d=~~v,d&&d===v&&(p=u,d--),p>u&&(p=u)),v=Ke(this._tTime,g),!a&&this._tTime&&v!==d&&this._tTime-v*g-this._dur<=0&&(v=d),C&&d&1&&(p=u-p,x=1),d!==v&&!this._lock){var P=C&&v&1,w=P===(C&&d&1);if(d<v&&(P=!P),a=P?0:c%u?u:c,this._lock=1,this.render(a||(x?0:V(d*g)),n,!u)._lock=0,this._tTime=c,!n&&this.parent&&ce(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1),a&&a!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,w&&(this._lock=2,a=P?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!y)return this;Sr(this,x)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Bn(this,V(a),V(p)),b&&(c-=p-(p=b._start))),this._tTime=c,this._time=p,this._act=!_,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&c&&!n&&!v&&(ce(this,"onStart"),this._tTime!==c))return this;if(p>=a&&r>=0)for(f=this._first;f;){if(m=f._next,(f._act||p>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,n,s);if(f.render(f._ts>0?(p-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(p-f._start)*f._ts,n,s),p!==this._time||!this._ts&&!y){b=0,m&&(c+=this._zTime=-R);break}}f=m}else{f=this._last;for(var S=r<0?r:p;f;){if(m=f._prev,(f._act||S<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,n,s);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,n,s||W&&li(f)),p!==this._time||!this._ts&&!y){b=0,m&&(c+=this._zTime=S?-R:R);break}}f=m}}if(b&&!n&&(this.pause(),b.render(p>=a?0:-R)._zTime=p>=a?1:-1,this._ts))return this._start=E,Ft(this),this.render(r,n,s);this._onUpdate&&!n&&ce(this,"onUpdate",!0),(c===l&&this._tTime>=this.totalDuration()||!c&&a)&&(E===this._start||Math.abs(_)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(c===l&&this._ts>0||!c&&this._ts<0)&&Ae(this,1),!n&&!(r<0&&!a)&&(c||a||!l)&&(ce(this,c===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,n){var s=this;if(ve(n)||(n=de(this,n,r)),!(r instanceof yt)){if(q(r))return r.forEach(function(a){return s.add(a,n)}),this;if(Y(r))return this.addLabel(r,n);if(B(r))r=j.delayedCall(0,r);else return this}return this!==r?ye(this,r,n):this},t.getChildren=function(r,n,s,a){r===void 0&&(r=!0),n===void 0&&(n=!0),s===void 0&&(s=!0),a===void 0&&(a=-he);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof j?n&&l.push(u):(s&&l.push(u),r&&l.push.apply(l,u.getChildren(!0,n,s)))),u=u._next;return l},t.getById=function(r){for(var n=this.getChildren(1,1,1),s=n.length;s--;)if(n[s].vars.id===r)return n[s]},t.remove=function(r){return Y(r)?this.removeLabel(r):B(r)?this.killTweensOf(r):(r.parent===this&&kt(this,r),r===this._recent&&(this._recent=this._last),Oe(this))},t.totalTime=function(r,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=V(ue.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),o.prototype.totalTime.call(this,r,n),this._forcing=0,this):this._tTime},t.addLabel=function(r,n){return this.labels[r]=de(this,n),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,n,s){var a=j.delayedCall(0,n||ct,s);return a.data="isPause",this._hasPause=1,ye(this,a,de(this,r))},t.removePause=function(r){var n=this._first;for(r=de(this,r);n;)n._start===r&&n.data==="isPause"&&Ae(n),n=n._next},t.killTweensOf=function(r,n,s){for(var a=this.getTweensOf(r,s),l=a.length;l--;)Me!==a[l]&&a[l].kill(r,n);return this},t.getTweensOf=function(r,n){for(var s=[],a=pe(r),l=this._first,u=ve(n),c;l;)l instanceof j?Rn(l._targets,a)&&(u?(!Me||l._initted&&l._ts)&&l.globalTime(0)<=n&&l.globalTime(l.totalDuration())>n:!n||l.isActive())&&s.push(l):(c=l.getTweensOf(a,n)).length&&s.push.apply(s,c),l=l._next;return s},t.tweenTo=function(r,n){n=n||{};var s=this,a=de(s,r),l=n,u=l.startAt,c=l.onStart,h=l.onStartParams,p=l.immediateRender,f,m=j.to(s,le({ease:n.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:n.duration||Math.abs((a-(u&&"time"in u?u.time:s._time))/s.timeScale())||R,onStart:function(){if(s.pause(),!f){var g=n.duration||Math.abs((a-(u&&"time"in u?u.time:s._time))/s.timeScale());m._dur!==g&&Je(m,g,0,1).render(m._time,!0,!0),f=1}c&&c.apply(m,h||[])}},n));return p?m.render(0):m},t.tweenFromTo=function(r,n,s){return this.tweenTo(n,le({startAt:{time:de(this,r)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),xr(this,de(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),xr(this,de(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+R)},t.shiftChildren=function(r,n,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,u;a;)a._start>=s&&(a._start+=r,a._end+=r),a=a._next;if(n)for(u in l)l[u]>=s&&(l[u]+=r);return Oe(this)},t.invalidate=function(r){var n=this._first;for(this._lock=0;n;)n.invalidate(r),n=n._next;return o.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var n=this._first,s;n;)s=n._next,this.remove(n),n=s;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Oe(this)},t.totalDuration=function(r){var n=0,s=this,a=s._last,l=he,u,c,h;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-r:r));if(s._dirty){for(h=s.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),c=a._start,c>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,ye(s,a,c-a._delay,1)._lock=0):l=c,c<0&&a._ts&&(n-=c,(!h&&!s._dp||h&&h.smoothChildTiming)&&(s._start+=c/s._ts,s._time-=c,s._tTime-=c),s.shiftChildren(-c,!1,-1/0),l=0),a._end>n&&a._ts&&(n=a._end),a=u;Je(s,s===z&&s._time>n?s._time:n,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(r){if(z._ts&&(ir(z,Ot(r,z)),Qi=ue.frame),ue.frame>=er){er+=se.autoSleep||120;var n=z._first;if((!n||!n._ts)&&se.autoSleep&&ue._listeners.length<2){for(;n&&!n._ts;)n=n._next;n||ue.sleep()}}},e})(yt);le(K.prototype,{_lock:0,_hasPause:0,_forcing:0});var is=function(e,t,i,r,n,s,a){var l=new te(this._pt,e,t,0,1,Or,null,n),u=0,c=0,h,p,f,m,d,g,y,b;for(l.b=i,l.e=r,i+="",r+="",(y=~r.indexOf("random("))&&(r=pt(r)),s&&(b=[i,r],s(b,e,t),i=b[0],r=b[1]),p=i.match(Qt)||[];h=Qt.exec(r);)m=h[0],d=r.substring(u,h.index),f?f=(f+1)%5:d.substr(-5)==="rgba("&&(f=1),m!==p[c++]&&(g=parseFloat(p[c-1])||0,l._pt={_next:l._pt,p:d||c===1?d:",",s:g,c:m.charAt(1)==="="?Xe(g,m)-g:parseFloat(m)-g,m:f&&f<4?Math.round:0},u=Qt.lastIndex);return l.c=u<r.length?r.substring(u,r.length):"",l.fp=a,(qi.test(r)||y)&&(l.e=0),this._pt=l,l},yi=function(e,t,i,r,n,s,a,l,u,c){B(r)&&(r=r(n||0,e,s));var h=e[t],p=i!=="get"?i:B(h)?u?e[t.indexOf("set")||!B(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():h,f=B(h)?u?os:Rr:_i,m;if(Y(r)&&(~r.indexOf("random(")&&(r=pt(r)),r.charAt(1)==="="&&(m=Xe(p,r)+(X(p)||0),(m||m===0)&&(r=m))),!c||p!==r||bi)return!isNaN(p*r)&&r!==""?(m=new te(this._pt,e,t,+p||0,r-(p||0),typeof h=="boolean"?cs:kr,0,f),u&&(m.fp=u),a&&m.modifier(a,this,e),this._pt=m):(!h&&!(t in e)&&ii(t,r),is.call(this,e,t,p,r,f,l||se.stringFilter,u))},rs=function(e,t,i,r,n){if(B(e)&&(e=bt(e,n,t,i,r)),!me(e)||e.style&&e.nodeType||q(e)||Yi(e))return Y(e)?bt(e,n,t,i,r):e;var s={},a;for(a in e)s[a]=bt(e[a],n,t,i,r);return s},Dr=function(e,t,i,r,n,s){var a,l,u,c;if(oe[e]&&(a=new oe[e]).init(n,a.rawVars?t[e]:rs(t[e],r,n,s,i),i,r,s)!==!1&&(i._pt=l=new te(i._pt,n,e,0,1,a.render,a,0,a.priority),i!==Qe))for(u=i._ptLookup[i._targets.indexOf(n)],c=a._props.length;c--;)u[a._props[c]]=l;return a},Me,bi,xi=function o(e,t,i){var r=e.vars,n=r.ease,s=r.startAt,a=r.immediateRender,l=r.lazy,u=r.onUpdate,c=r.runBackwards,h=r.yoyoEase,p=r.keyframes,f=r.autoRevert,m=e._dur,d=e._startAt,g=e._targets,y=e.parent,b=y&&y.data==="nested"?y.vars.targets:g,_=e._overwrite==="auto"&&!qt,E=e.timeline,v,C,x,P,w,S,M,T,L,I,$,U,O;if(E&&(!p||!n)&&(n="none"),e._ease=Fe(n,We.ease),e._yEase=h?Ar(Fe(h===!0?n:h,We.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!E&&!!r.runBackwards,!E||p&&!r.stagger){if(T=g[0]?ke(g[0]).harness:0,U=T&&r[T.prop],v=Rt(r,ri),d&&(d._zTime<0&&d.progress(1),t<0&&c&&a&&!f?d.render(-1,!0):d.revert(c&&m?Dt:Ln),d._lazy=0),s){if(Ae(e._startAt=j.set(g,le({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!d&&Q(l),startAt:null,delay:0,onUpdate:u&&function(){return ce(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W||!a&&!f)&&e._startAt.revert(Dt),a&&m&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&m&&!d){if(t&&(a=!1),x=le({overwrite:!1,data:"isFromStart",lazy:a&&!d&&Q(l),immediateRender:a,stagger:0,parent:y},v),U&&(x[T.prop]=U),Ae(e._startAt=j.set(g,x)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W?e._startAt.revert(Dt):e._startAt.render(-1,!0)),e._zTime=t,!a)o(e._startAt,R,R);else if(!t)return}for(e._pt=e._ptCache=0,l=m&&Q(l)||l&&!m,C=0;C<g.length;C++){if(w=g[C],M=w._gsap||oi(g)[C]._gsap,e._ptLookup[C]=I={},ni[M.id]&&Pe.length&&It(),$=b===g?C:b.indexOf(w),T&&(L=new T).init(w,U||v,e,$,b)!==!1&&(e._pt=P=new te(e._pt,w,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(ne){I[ne]=P}),L.priority&&(S=1)),!T||U)for(x in v)oe[x]&&(L=Dr(x,v,e,$,w,b))?L.priority&&(S=1):I[x]=P=yi.call(e,w,x,"get",v[x],$,b,0,r.stringFilter);e._op&&e._op[C]&&e.kill(w,e._op[C]),_&&e._pt&&(Me=e,z.killTweensOf(w,I,e.globalTime(t)),O=!e.parent,Me=0),e._pt&&l&&(ni[M.id]=1)}S&&Fr(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!O,p&&t<=0&&E.render(he,!0,!0)},ns=function(e,t,i,r,n,s,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,h,p,f;if(!u)for(u=e._ptCache[t]=[],p=e._ptLookup,f=e._targets.length;f--;){if(c=p[f][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return bi=1,e.vars[t]="+=0",xi(e,a),bi=0,l?lt(t+" not eligible for reset"):1;u.push(c)}for(f=u.length;f--;)h=u[f],c=h._pt||h,c.s=(r||r===0)&&!n?r:c.s+(r||0)+s*c.c,c.c=i-c.s,h.e&&(h.e=G(i)+X(h.e)),h.b&&(h.b=c.s+X(h.b))},ss=function(e,t){var i=e[0]?ke(e[0]).harness:0,r=i&&i.aliases,n,s,a,l;if(!r)return t;n=Ze({},t);for(s in r)if(s in n)for(l=r[s].split(","),a=l.length;a--;)n[l[a]]=n[s];return n},as=function(e,t,i,r){var n=t.ease||r||"power1.inOut",s,a;if(q(t))a=i[e]||(i[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:n})});else for(s in t)a=i[s]||(i[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:n})},bt=function(e,t,i,r,n){return B(e)?e.call(t,i,r,n):Y(e)&&~e.indexOf("random(")?pt(e):e},Lr=ai+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ir={};ee(Lr+",id,stagger,delay,duration,paused,scrollTrigger",function(o){return Ir[o]=1});var j=(function(o){ji(e,o);function e(i,r,n,s){var a;typeof r=="number"&&(n.duration=r,r=n,n=null),a=o.call(this,s?r:ut(r))||this;var l=a.vars,u=l.duration,c=l.delay,h=l.immediateRender,p=l.stagger,f=l.overwrite,m=l.keyframes,d=l.defaults,g=l.scrollTrigger,y=l.yoyoEase,b=r.parent||z,_=(q(i)||Yi(i)?ve(i[0]):"length"in r)?[i]:pe(i),E,v,C,x,P,w,S,M;if(a._targets=_.length?oi(_):lt("GSAP target "+i+" not found. https://gsap.com",!se.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,m||p||Tt(u)||Tt(c)){if(r=a.vars,E=a.timeline=new K({data:"nested",defaults:d||{},targets:b&&b.data==="nested"?b.vars.targets:_}),E.kill(),E.parent=E._dp=_e(a),E._start=0,p||Tt(u)||Tt(c)){if(x=_.length,S=p&&fr(p),me(p))for(P in p)~Lr.indexOf(P)&&(M||(M={}),M[P]=p[P]);for(v=0;v<x;v++)C=Rt(r,Ir),C.stagger=0,y&&(C.yoyoEase=y),M&&Ze(C,M),w=_[v],C.duration=+bt(u,_e(a),v,w,_),C.delay=(+bt(c,_e(a),v,w,_)||0)-a._delay,!p&&x===1&&C.delay&&(a._delay=c=C.delay,a._start+=c,C.delay=0),E.to(w,C,S?S(v,w,_):0),E._ease=D.none;E.duration()?u=c=0:a.timeline=0}else if(m){ut(le(E.vars.defaults,{ease:"none"})),E._ease=Fe(m.ease||r.ease||"none");var T=0,L,I,$;if(q(m))m.forEach(function(U){return E.to(_,U,">")}),E.duration();else{C={};for(P in m)P==="ease"||P==="easeEach"||as(P,m[P],C,m.easeEach);for(P in C)for(L=C[P].sort(function(U,O){return U.t-O.t}),T=0,v=0;v<L.length;v++)I=L[v],$={ease:I.e,duration:(I.t-(v?L[v-1].t:0))/100*u},$[P]=I.v,E.to(_,$,T),T+=$.duration;E.duration()<u&&E.to({},{duration:u-E.duration()})}}u||a.duration(u=E.duration())}else a.timeline=0;return f===!0&&!qt&&(Me=_e(a),z.killTweensOf(_),Me=0),ye(b,_e(a),n),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!u&&!m&&a._start===V(b._time)&&Q(h)&&Un(_e(a))&&b.data!=="nested")&&(a._tTime=-R,a.render(Math.max(0,-c)||0)),g&&cr(_e(a),g),a}var t=e.prototype;return t.render=function(r,n,s){var a=this._time,l=this._tDur,u=this._dur,c=r<0,h=r>l-R&&!c?l:r<R?0:r,p,f,m,d,g,y,b,_,E;if(!u)Nn(this,r,n,s);else if(h!==this._tTime||!r||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(p=h,_=this.timeline,this._repeat){if(d=u+this._rDelay,this._repeat<-1&&c)return this.totalTime(d*100+r,n,s);if(p=V(h%d),h===l?(m=this._repeat,p=u):(g=V(h/d),m=~~g,m&&m===g?(p=u,m--):p>u&&(p=u)),y=this._yoyo&&m&1,y&&(E=this._yEase,p=u-p),g=Ke(this._tTime,d),p===a&&!s&&this._initted&&m===g)return this._tTime=h,this;m!==g&&(_&&this._yEase&&Sr(_,y),this.vars.repeatRefresh&&!y&&!this._lock&&p!==d&&this._initted&&(this._lock=s=1,this.render(V(d*m),!0).invalidate()._lock=0))}if(!this._initted){if(ur(this,c?r:p,s,n,h))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&m!==g))return this;if(u!==this._dur)return this.render(r,n,s)}if(this._tTime=h,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(E||this._ease)(p/u),this._from&&(this.ratio=b=1-b),!a&&h&&!n&&!g&&(ce(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;_&&_.render(r<0?r:_._dur*_._ease(p/this._dur),n,s)||this._startAt&&(this._zTime=r),this._onUpdate&&!n&&(c&&ci(this,r,n,s),ce(this,"onUpdate")),this._repeat&&m!==g&&this.vars.onRepeat&&!n&&this.parent&&ce(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(c&&!this._onUpdate&&ci(this,r,!0,!0),(r||!u)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ae(this,1),!n&&!(c&&!a)&&(h||a||y)&&(ce(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),o.prototype.invalidate.call(this,r)},t.resetTo=function(r,n,s,a,l){gt||ue.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||xi(this,u),c=this._ease(u/this._dur),ns(this,r,n,s,a,c,u,l)?this.resetTo(r,n,s,a,1):(Ut(this,0),this.parent||ar(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,n){if(n===void 0&&(n="all"),!r&&(!n||n==="all"))return this._lazy=this._pt=0,this.parent?ft(this):this.scrollTrigger&&this.scrollTrigger.kill(!!W),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(r,n,Me&&Me.vars.overwrite!==!0)._first||ft(this),this.parent&&s!==this.timeline.totalDuration()&&Je(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=r?pe(r):a,u=this._ptLookup,c=this._pt,h,p,f,m,d,g,y;if((!n||n==="all")&&On(a,l))return n==="all"&&(this._pt=0),ft(this);for(h=this._op=this._op||[],n!=="all"&&(Y(n)&&(d={},ee(n,function(b){return d[b]=1}),n=d),n=ss(a,n)),y=a.length;y--;)if(~l.indexOf(a[y])){p=u[y],n==="all"?(h[y]=n,m=p,f={}):(f=h[y]=h[y]||{},m=n);for(d in m)g=p&&p[d],g&&((!("kill"in g.d)||g.d.kill(d)===!0)&&kt(this,g,"_pt"),delete p[d]),f!=="all"&&(f[d]=1)}return this._initted&&!this._pt&&c&&ft(this),this},e.to=function(r,n){return new e(r,n,arguments[2])},e.from=function(r,n){return ht(1,arguments)},e.delayedCall=function(r,n,s,a){return new e(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:n,onReverseComplete:n,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(r,n,s){return ht(2,arguments)},e.set=function(r,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new e(r,n)},e.killTweensOf=function(r,n,s){return z.killTweensOf(r,n,s)},e})(yt);le(j.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ee("staggerTo,staggerFrom,staggerFromTo",function(o){j[o]=function(){var e=new K,t=hi.call(arguments,0);return t.splice(o==="staggerFromTo"?5:4,0,0),e[o].apply(e,t)}});var _i=function(e,t,i){return e[t]=i},Rr=function(e,t,i){return e[t](i)},os=function(e,t,i,r){return e[t](r.fp,i)},ls=function(e,t,i){return e.setAttribute(t,i)},vi=function(e,t){return B(e[t])?Rr:Zt(e[t])&&e.setAttribute?ls:_i},kr=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},cs=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Or=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Ei=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},us=function(e,t,i,r){for(var n=this._pt,s;n;)s=n._next,n.p===r&&n.modifier(e,t,i),n=s},hs=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?kt(this,t,"_pt"):t.dep||(i=1),t=r;return!i},ds=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Fr=function(e){for(var t=e._pt,i,r,n,s;t;){for(i=t._next,r=n;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:s)?t._prev._next=t:n=t,(t._next=r)?r._prev=t:s=t,t=i}e._pt=n},te=(function(){function o(t,i,r,n,s,a,l,u,c){this.t=i,this.s=n,this.c=s,this.p=r,this.r=a||kr,this.d=l||this,this.set=u||_i,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=o.prototype;return e.modifier=function(i,r,n){this.mSet=this.mSet||this.set,this.set=ds,this.m=i,this.mt=n,this.tween=r},o})();ee(ai+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(o){return ri[o]=1}),ae.TweenMax=ae.TweenLite=j,ae.TimelineLite=ae.TimelineMax=K,z=new K({sortChildren:!1,defaults:We,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),se.stringFilter=Pr;var ze=[],zt={},ps=[],Ur=0,fs=0,wi=function(e){return(zt[e]||ps).map(function(t){return t()})},Ci=function(){var e=Date.now(),t=[];e-Ur>2&&(wi("matchMediaInit"),ze.forEach(function(i){var r=i.queries,n=i.conditions,s,a,l,u;for(a in r)s=ge.matchMedia(r[a]).matches,s&&(l=1),s!==n[a]&&(n[a]=s,u=1);u&&(i.revert(),l&&t.push(i))}),wi("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Ur=e,wi("matchMedia"))},zr=(function(){function o(t,i){this.selector=i&&di(i),this.data=[],this._r=[],this.isReverted=!1,this.id=fs++,t&&this.add(t)}var e=o.prototype;return e.add=function(i,r,n){B(i)&&(n=r,r=i,i=B);var s=this,a=function(){var u=F,c=s.selector,h;return u&&u!==s&&u.data.push(s),n&&(s.selector=di(n)),F=s,h=r.apply(s,arguments),B(h)&&s._r.push(h),F=u,s.selector=c,s.isReverted=!1,h};return s.last=a,i===B?a(s,function(l){return s.add(null,l)}):i?s[i]=a:a},e.ignore=function(i){var r=F;F=null,i(this),F=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof o?i.push.apply(i,r.getTweens()):r instanceof j&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var n=this;if(i?(function(){for(var a=n.getTweens(),l=n.data.length,u;l--;)u=n.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(c){return a.splice(a.indexOf(c),1)}));for(a.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,h){return h.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),l=n.data.length;l--;)u=n.data[l],u instanceof K?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof j)&&u.revert&&u.revert(i);n._r.forEach(function(c){return c(i,n)}),n.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var s=ze.length;s--;)ze[s].id===this.id&&ze.splice(s,1)},e.revert=function(i){this.kill(i||{})},o})(),ms=(function(){function o(t){this.contexts=[],this.scope=t,F&&F.data.push(this)}var e=o.prototype;return e.add=function(i,r,n){me(i)||(i={matches:i});var s=new zr(0,n||this.scope),a=s.conditions={},l,u,c;F&&!s.selector&&(s.selector=F.selector),this.contexts.push(s),r=s.add("onMatch",r),s.queries=i;for(u in i)u==="all"?c=1:(l=ge.matchMedia(i[u]),l&&(ze.indexOf(s)<0&&ze.push(s),(a[u]=l.matches)&&(c=1),l.addListener?l.addListener(Ci):l.addEventListener("change",Ci)));return c&&r(s,function(h){return s.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},o})(),Nt={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return vr(r)})},timeline:function(e){return new K(e)},getTweensOf:function(e,t){return z.getTweensOf(e,t)},getProperty:function(e,t,i,r){Y(e)&&(e=pe(e)[0]);var n=ke(e||{}).get,s=i?nr:rr;return i==="native"&&(i=""),e&&(t?s((oe[t]&&oe[t].get||n)(e,t,i,r)):function(a,l,u){return s((oe[a]&&oe[a].get||n)(e,a,l,u))})},quickSetter:function(e,t,i){if(e=pe(e),e.length>1){var r=e.map(function(c){return ie.quickSetter(c,t,i)}),n=r.length;return function(c){for(var h=n;h--;)r[h](c)}}e=e[0]||{};var s=oe[t],a=ke(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=s?function(c){var h=new s;Qe._pt=0,h.init(e,i?c+i:c,Qe,0,[e]),h.render(1,h),Qe._pt&&Ei(1,Qe)}:a.set(e,l);return s?u:function(c){return u(e,l,i?c+i:c,a,1)}},quickTo:function(e,t,i){var r,n=ie.to(e,le((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),s=function(l,u,c){return n.resetTo(t,l,u,c)};return s.tween=n,s},isTweening:function(e){return z.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Fe(e.ease,We.ease)),sr(We,e||{})},config:function(e){return sr(se,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,n=e.defaults,s=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!oe[a]&&!ae[a]&&lt(t+" effect requires "+a+" plugin.")}),si[t]=function(a,l,u){return i(pe(a),le(l||{},n),u)},s&&(K.prototype[t]=function(a,l,u){return this.add(si[t](a,me(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){D[e]=Fe(t)},parseEase:function(e,t){return arguments.length?Fe(e,t):D},getById:function(e){return z.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new K(e),r,n;for(i.smoothChildTiming=Q(e.smoothChildTiming),z.remove(i),i._dp=0,i._time=i._tTime=z._time,r=z._first;r;)n=r._next,(t||!(!r._dur&&r instanceof j&&r.vars.onComplete===r._targets[0]))&&ye(i,r,r._start-r._delay),r=n;return ye(z,i,0),i},context:function(e,t){return e?new zr(e,t):F},matchMedia:function(e){return new ms(e)},matchMediaRefresh:function(){return ze.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||Ci()},addEventListener:function(e,t){var i=zt[e]||(zt[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=zt[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:Wn,wrapYoyo:qn,distribute:fr,random:gr,snap:mr,normalize:Yn,getUnit:X,clamp:Gn,splitColor:Er,toArray:pe,selector:di,mapRange:br,pipe:jn,unitize:Hn,interpolate:Xn,shuffle:pr},install:Ki,effects:si,ticker:ue,updateRoot:K.updateRoot,plugins:oe,globalTimeline:z,core:{PropTween:te,globals:Ji,Tween:j,Timeline:K,Animation:yt,getCache:ke,_removeLinkedListItem:kt,reverting:function(){return W},context:function(e){return e&&F&&(F.data.push(e),e._ctx=F),F},suppressOverwrites:function(e){return qt=e}}};ee("to,from,fromTo,delayedCall,set,killTweensOf",function(o){return Nt[o]=j[o]}),ue.add(K.updateRoot),Qe=Nt.to({},{duration:0});var gs=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},ys=function(e,t){var i=e._targets,r,n,s;for(r in t)for(n=i.length;n--;)s=e._ptLookup[n][r],s&&(s=s.d)&&(s._pt&&(s=gs(s,r)),s&&s.modifier&&s.modifier(t[r],e,i[n],r))},Pi=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,n,s){s._onInit=function(a){var l,u;if(Y(n)&&(l={},ee(n,function(c){return l[c]=1}),n=l),t){l={};for(u in n)l[u]=t(n[u]);n=l}ys(a,n)}}}},ie=Nt.registerPlugin({name:"attr",init:function(e,t,i,r,n){var s,a,l;this.tween=i;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],r,n,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var i=t._pt;i;)W?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Pi("roundProps",pi),Pi("modifiers"),Pi("snap",mr))||Nt;j.version=K.version=ie.version="3.13.0",Zi=1,Kt()&&et(),D.Power0,D.Power1,D.Power2,D.Power3,D.Power4,D.Linear,D.Quad,D.Cubic,D.Quart,D.Quint,D.Strong,D.Elastic,D.Back,D.SteppedEase,D.Bounce,D.Sine,D.Expo,D.Circ;var Nr,De,tt,Ai,Ne,Br,Si,bs=function(){return typeof window<"u"},Ee={},Be=180/Math.PI,it=Math.PI/180,rt=Math.atan2,$r=1e8,Ti=/([A-Z])/g,xs=/(left|right|width|margin|padding|x)/i,_s=/[\s,\(]\S/,be={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Mi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},vs=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Es=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ws=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Gr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Vr=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Cs=function(e,t,i){return e.style[t]=i},Ps=function(e,t,i){return e.style.setProperty(t,i)},As=function(e,t,i){return e._gsap[t]=i},Ss=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Ts=function(e,t,i,r,n){var s=e._gsap;s.scaleX=s.scaleY=i,s.renderTransform(n,s)},Ms=function(e,t,i,r,n){var s=e._gsap;s[t]=i,s.renderTransform(n,s)},N="transform",re=N+"Origin",Ds=function o(e,t){var i=this,r=this.target,n=r.style,s=r._gsap;if(e in Ee&&n){if(this.tfm=this.tfm||{},e!=="transform")e=be[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=we(r,a)}):this.tfm[e]=s.x?s[e]:we(r,e),e===re&&(this.tfm.zOrigin=s.zOrigin);else return be.transform.split(",").forEach(function(a){return o.call(i,a,t)});if(this.props.indexOf(N)>=0)return;s.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(re,t,"")),e=N}(n||t)&&this.props.push(e,t,n[e])},jr=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Ls=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,n,s;for(n=0;n<e.length;n+=3)e[n+1]?e[n+1]===2?t[e[n]](e[n+2]):t[e[n]]=e[n+2]:e[n+2]?i[e[n]]=e[n+2]:i.removeProperty(e[n].substr(0,2)==="--"?e[n]:e[n].replace(Ti,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)r[s]=this.tfm[s];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),n=Si(),(!n||!n.isStart)&&!i[N]&&(jr(i),r.zOrigin&&i[re]&&(i[re]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Hr=function(e,t){var i={target:e,props:[],revert:Ls,save:Ds};return e._gsap||ie.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},Yr,Di=function(e,t){var i=De.createElementNS?De.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):De.createElement(e);return i&&i.style?i:De.createElement(e)},fe=function o(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Ti,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&o(e,nt(t)||t,1)||""},Wr="O,Moz,ms,Ms,Webkit".split(","),nt=function(e,t,i){var r=t||Ne,n=r.style,s=5;if(e in n&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Wr[s]+e in n););return s<0?null:(s===3?"ms":s>=0?Wr[s]:"")+e},Li=function(){bs()&&window.document&&(Nr=window,De=Nr.document,tt=De.documentElement,Ne=Di("div")||{style:{}},Di("div"),N=nt(N),re=N+"Origin",Ne.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Yr=!!nt("perspective"),Si=ie.core.reverting,Ai=1)},qr=function(e){var t=e.ownerSVGElement,i=Di("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),n;r.style.display="block",i.appendChild(r),tt.appendChild(i);try{n=r.getBBox()}catch{}return i.removeChild(r),tt.removeChild(i),n},Xr=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Zr=function(e){var t,i;try{t=e.getBBox()}catch{t=qr(e),i=1}return t&&(t.width||t.height)||i||(t=qr(e)),t&&!t.width&&!t.x&&!t.y?{x:+Xr(e,["x","cx","x1"])||0,y:+Xr(e,["y","cy","y1"])||0,width:0,height:0}:t},Kr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Zr(e))},$e=function(e,t){if(t){var i=e.style,r;t in Ee&&t!==re&&(t=N),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Ti,"-$1").toLowerCase())):i.removeAttribute(t)}},Le=function(e,t,i,r,n,s){var a=new te(e._pt,t,i,0,1,s?Vr:Gr);return e._pt=a,a.b=r,a.e=n,e._props.push(i),a},Jr={deg:1,rad:1,turn:1},Is={grid:1,flex:1},Ie=function o(e,t,i,r){var n=parseFloat(i)||0,s=(i+"").trim().substr((n+"").length)||"px",a=Ne.style,l=xs.test(t),u=e.tagName.toLowerCase()==="svg",c=(u?"client":"offset")+(l?"Width":"Height"),h=100,p=r==="px",f=r==="%",m,d,g,y;if(r===s||!n||Jr[r]||Jr[s])return n;if(s!=="px"&&!p&&(n=o(e,t,i,"px")),y=e.getCTM&&Kr(e),(f||s==="%")&&(Ee[t]||~t.indexOf("adius")))return m=y?e.getBBox()[l?"width":"height"]:e[c],G(f?n/m*h:n/100*m);if(a[l?"width":"height"]=h+(p?s:r),d=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!u?e:e.parentNode,y&&(d=(e.ownerSVGElement||{}).parentNode),(!d||d===De||!d.appendChild)&&(d=De.body),g=d._gsap,g&&f&&g.width&&l&&g.time===ue.time&&!g.uncache)return G(n/g.width*h);if(f&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=h+r,m=e[c],b?e.style[t]=b:$e(e,t)}else(f||s==="%")&&!Is[fe(d,"display")]&&(a.position=fe(e,"position")),d===e&&(a.position="static"),d.appendChild(Ne),m=Ne[c],d.removeChild(Ne),a.position="absolute";return l&&f&&(g=ke(d),g.time=ue.time,g.width=d[c]),G(p?m*n/h:m&&n?h/m*n:0)},we=function(e,t,i,r){var n;return Ai||Li(),t in be&&t!=="transform"&&(t=be[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ee[t]&&t!=="transform"?(n=_t(e,r),n=t!=="transformOrigin"?n[t]:n.svg?n.origin:$t(fe(e,re))+" "+n.zOrigin+"px"):(n=e.style[t],(!n||n==="auto"||r||~(n+"").indexOf("calc("))&&(n=Bt[t]&&Bt[t](e,t,i)||fe(e,t)||tr(e,t)||(t==="opacity"?1:0))),i&&!~(n+"").trim().indexOf(" ")?Ie(e,t,n,i)+i:n},Rs=function(e,t,i,r){if(!i||i==="none"){var n=nt(t,e,1),s=n&&fe(e,n,1);s&&s!==i?(t=n,i=s):t==="borderColor"&&(i=fe(e,"borderTopColor"))}var a=new te(this._pt,e.style,t,0,1,Or),l=0,u=0,c,h,p,f,m,d,g,y,b,_,E,v;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=fe(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(d=e.style[t],e.style[t]=r,r=fe(e,t)||r,d?e.style[t]=d:$e(e,t)),c=[i,r],Pr(c),i=c[0],r=c[1],p=i.match(qe)||[],v=r.match(qe)||[],v.length){for(;h=qe.exec(r);)g=h[0],b=r.substring(l,h.index),m?m=(m+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(m=1),g!==(d=p[u++]||"")&&(f=parseFloat(d)||0,E=d.substr((f+"").length),g.charAt(1)==="="&&(g=Xe(f,g)+E),y=parseFloat(g),_=g.substr((y+"").length),l=qe.lastIndex-_.length,_||(_=_||se.units[t]||E,l===r.length&&(r+=_,a.e+=_)),E!==_&&(f=Ie(e,t,d,_)||0),a._pt={_next:a._pt,p:b||u===1?b:",",s:f,c:y-f,m:m&&m<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Vr:Gr;return qi.test(r)&&(a.e=0),this._pt=a,a},Qr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ks=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Qr[i]||i,t[1]=Qr[r]||r,t.join(" ")},Os=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,n=t.u,s=i._gsap,a,l,u;if(n==="all"||n===!0)r.cssText="",l=1;else for(n=n.split(","),u=n.length;--u>-1;)a=n[u],Ee[a]&&(l=1,a=a==="transformOrigin"?re:N),$e(i,a);l&&($e(i,N),s&&(s.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",_t(i,1),s.uncache=1,jr(r)))}},Bt={clearProps:function(e,t,i,r,n){if(n.data!=="isFromStart"){var s=e._pt=new te(e._pt,t,i,0,0,Os);return s.u=r,s.pr=-10,s.tween=n,e._props.push(i),1}}},xt=[1,0,0,1,0,0],en={},tn=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},rn=function(e){var t=fe(e,N);return tn(t)?xt:t.substr(7).match(Wi).map(G)},Ii=function(e,t){var i=e._gsap||ke(e),r=e.style,n=rn(e),s,a,l,u;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,n=[l.a,l.b,l.c,l.d,l.e,l.f],n.join(",")==="1,0,0,1,0,0"?xt:n):(n===xt&&!e.offsetParent&&e!==tt&&!i.svg&&(l=r.display,r.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,a=e.nextElementSibling,tt.appendChild(e)),n=rn(e),l?r.display=l:$e(e,"display"),u&&(a?s.insertBefore(e,a):s?s.appendChild(e):tt.removeChild(e))),t&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n)},Ri=function(e,t,i,r,n,s){var a=e._gsap,l=n||Ii(e,!0),u=a.xOrigin||0,c=a.yOrigin||0,h=a.xOffset||0,p=a.yOffset||0,f=l[0],m=l[1],d=l[2],g=l[3],y=l[4],b=l[5],_=t.split(" "),E=parseFloat(_[0])||0,v=parseFloat(_[1])||0,C,x,P,w;i?l!==xt&&(x=f*g-m*d)&&(P=E*(g/x)+v*(-d/x)+(d*b-g*y)/x,w=E*(-m/x)+v*(f/x)-(f*b-m*y)/x,E=P,v=w):(C=Zr(e),E=C.x+(~_[0].indexOf("%")?E/100*C.width:E),v=C.y+(~(_[1]||_[0]).indexOf("%")?v/100*C.height:v)),r||r!==!1&&a.smooth?(y=E-u,b=v-c,a.xOffset=h+(y*f+b*d)-y,a.yOffset=p+(y*m+b*g)-b):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=v,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[re]="0px 0px",s&&(Le(s,a,"xOrigin",u,E),Le(s,a,"yOrigin",c,v),Le(s,a,"xOffset",h,a.xOffset),Le(s,a,"yOffset",p,a.yOffset)),e.setAttribute("data-svg-origin",E+" "+v)},_t=function(e,t){var i=e._gsap||new Mr(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,n=i.scaleX<0,s="px",a="deg",l=getComputedStyle(e),u=fe(e,re)||"0",c,h,p,f,m,d,g,y,b,_,E,v,C,x,P,w,S,M,T,L,I,$,U,O,ne,Pt,At,St,He,wn,Ce,Ye;return c=h=p=d=g=y=b=_=E=0,f=m=1,i.svg=!!(e.getCTM&&Kr(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[N]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[N]!=="none"?l[N]:"")),r.scale=r.rotate=r.translate="none"),x=Ii(e,i.svg),i.svg&&(i.uncache?(ne=e.getBBox(),u=i.xOrigin-ne.x+"px "+(i.yOrigin-ne.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),Ri(e,O||u,!!O||i.originIsAbsolute,i.smooth!==!1,x)),v=i.xOrigin||0,C=i.yOrigin||0,x!==xt&&(M=x[0],T=x[1],L=x[2],I=x[3],c=$=x[4],h=U=x[5],x.length===6?(f=Math.sqrt(M*M+T*T),m=Math.sqrt(I*I+L*L),d=M||T?rt(T,M)*Be:0,b=L||I?rt(L,I)*Be+d:0,b&&(m*=Math.abs(Math.cos(b*it))),i.svg&&(c-=v-(v*M+C*L),h-=C-(v*T+C*I))):(Ye=x[6],wn=x[7],At=x[8],St=x[9],He=x[10],Ce=x[11],c=x[12],h=x[13],p=x[14],P=rt(Ye,He),g=P*Be,P&&(w=Math.cos(-P),S=Math.sin(-P),O=$*w+At*S,ne=U*w+St*S,Pt=Ye*w+He*S,At=$*-S+At*w,St=U*-S+St*w,He=Ye*-S+He*w,Ce=wn*-S+Ce*w,$=O,U=ne,Ye=Pt),P=rt(-L,He),y=P*Be,P&&(w=Math.cos(-P),S=Math.sin(-P),O=M*w-At*S,ne=T*w-St*S,Pt=L*w-He*S,Ce=I*S+Ce*w,M=O,T=ne,L=Pt),P=rt(T,M),d=P*Be,P&&(w=Math.cos(P),S=Math.sin(P),O=M*w+T*S,ne=$*w+U*S,T=T*w-M*S,U=U*w-$*S,M=O,$=ne),g&&Math.abs(g)+Math.abs(d)>359.9&&(g=d=0,y=180-y),f=G(Math.sqrt(M*M+T*T+L*L)),m=G(Math.sqrt(U*U+Ye*Ye)),P=rt($,U),b=Math.abs(P)>2e-4?P*Be:0,E=Ce?1/(Ce<0?-Ce:Ce):0),i.svg&&(O=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!tn(fe(e,N)),O&&e.setAttribute("transform",O))),Math.abs(b)>90&&Math.abs(b)<270&&(n?(f*=-1,b+=d<=0?180:-180,d+=d<=0?180:-180):(m*=-1,b+=b<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+s,i.y=h-((i.yPercent=h&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+s,i.z=p+s,i.scaleX=G(f),i.scaleY=G(m),i.rotation=G(d)+a,i.rotationX=G(g)+a,i.rotationY=G(y)+a,i.skewX=b+a,i.skewY=_+a,i.transformPerspective=E+s,(i.zOrigin=parseFloat(u.split(" ")[2])||!t&&i.zOrigin||0)&&(r[re]=$t(u)),i.xOffset=i.yOffset=0,i.force3D=se.force3D,i.renderTransform=i.svg?Us:Yr?nn:Fs,i.uncache=0,i},$t=function(e){return(e=e.split(" "))[0]+" "+e[1]},ki=function(e,t,i){var r=X(t);return G(parseFloat(t)+parseFloat(Ie(e,"x",i+"px",r)))+r},Fs=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,nn(e,t)},Ge="0deg",vt="0px",Ve=") ",nn=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,s=i.x,a=i.y,l=i.z,u=i.rotation,c=i.rotationY,h=i.rotationX,p=i.skewX,f=i.skewY,m=i.scaleX,d=i.scaleY,g=i.transformPerspective,y=i.force3D,b=i.target,_=i.zOrigin,E="",v=y==="auto"&&e&&e!==1||y===!0;if(_&&(h!==Ge||c!==Ge)){var C=parseFloat(c)*it,x=Math.sin(C),P=Math.cos(C),w;C=parseFloat(h)*it,w=Math.cos(C),s=ki(b,s,x*w*-_),a=ki(b,a,-Math.sin(C)*-_),l=ki(b,l,P*w*-_+_)}g!==vt&&(E+="perspective("+g+Ve),(r||n)&&(E+="translate("+r+"%, "+n+"%) "),(v||s!==vt||a!==vt||l!==vt)&&(E+=l!==vt||v?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+Ve),u!==Ge&&(E+="rotate("+u+Ve),c!==Ge&&(E+="rotateY("+c+Ve),h!==Ge&&(E+="rotateX("+h+Ve),(p!==Ge||f!==Ge)&&(E+="skew("+p+", "+f+Ve),(m!==1||d!==1)&&(E+="scale("+m+", "+d+Ve),b.style[N]=E||"translate(0, 0)"},Us=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,s=i.x,a=i.y,l=i.rotation,u=i.skewX,c=i.skewY,h=i.scaleX,p=i.scaleY,f=i.target,m=i.xOrigin,d=i.yOrigin,g=i.xOffset,y=i.yOffset,b=i.forceCSS,_=parseFloat(s),E=parseFloat(a),v,C,x,P,w;l=parseFloat(l),u=parseFloat(u),c=parseFloat(c),c&&(c=parseFloat(c),u+=c,l+=c),l||u?(l*=it,u*=it,v=Math.cos(l)*h,C=Math.sin(l)*h,x=Math.sin(l-u)*-p,P=Math.cos(l-u)*p,u&&(c*=it,w=Math.tan(u-c),w=Math.sqrt(1+w*w),x*=w,P*=w,c&&(w=Math.tan(c),w=Math.sqrt(1+w*w),v*=w,C*=w)),v=G(v),C=G(C),x=G(x),P=G(P)):(v=h,P=p,C=x=0),(_&&!~(s+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(_=Ie(f,"x",s,"px"),E=Ie(f,"y",a,"px")),(m||d||g||y)&&(_=G(_+m-(m*v+d*x)+g),E=G(E+d-(m*C+d*P)+y)),(r||n)&&(w=f.getBBox(),_=G(_+r/100*w.width),E=G(E+n/100*w.height)),w="matrix("+v+","+C+","+x+","+P+","+_+","+E+")",f.setAttribute("transform",w),b&&(f.style[N]=w)},zs=function(e,t,i,r,n){var s=360,a=Y(n),l=parseFloat(n)*(a&&~n.indexOf("rad")?Be:1),u=l-r,c=r+u+"deg",h,p;return a&&(h=n.split("_")[1],h==="short"&&(u%=s,u!==u%(s/2)&&(u+=u<0?s:-s)),h==="cw"&&u<0?u=(u+s*$r)%s-~~(u/s)*s:h==="ccw"&&u>0&&(u=(u-s*$r)%s-~~(u/s)*s)),e._pt=p=new te(e._pt,t,i,r,u,vs),p.e=c,p.u="deg",e._props.push(i),p},sn=function(e,t){for(var i in t)e[i]=t[i];return e},Ns=function(e,t,i){var r=sn({},i._gsap),n="perspective,force3D,transformOrigin,svgOrigin",s=i.style,a,l,u,c,h,p,f,m;r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),s[N]=t,a=_t(i,1),$e(i,N),i.setAttribute("transform",u)):(u=getComputedStyle(i)[N],s[N]=t,a=_t(i,1),s[N]=u);for(l in Ee)u=r[l],c=a[l],u!==c&&n.indexOf(l)<0&&(f=X(u),m=X(c),h=f!==m?Ie(i,l,u,m):parseFloat(u),p=parseFloat(c),e._pt=new te(e._pt,a,l,h,p-h,Mi),e._pt.u=m||0,e._props.push(l));sn(a,r)};ee("padding,margin,Width,Radius",function(o,e){var t="Top",i="Right",r="Bottom",n="Left",s=(e<3?[t,i,r,n]:[t+n,t+i,r+i,r+n]).map(function(a){return e<2?o+a:"border"+a+o});Bt[e>1?"border"+o:o]=function(a,l,u,c,h){var p,f;if(arguments.length<4)return p=s.map(function(m){return we(a,m,u)}),f=p.join(" "),f.split(p[0]).length===5?p[0]:f;p=(c+"").split(" "),f={},s.forEach(function(m,d){return f[m]=p[d]=p[d]||p[(d-1)/2|0]}),a.init(l,f,h)}});var an={name:"css",register:Li,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,n){var s=this._props,a=e.style,l=i.vars.startAt,u,c,h,p,f,m,d,g,y,b,_,E,v,C,x,P;Ai||Li(),this.styles=this.styles||Hr(e),P=this.styles.props,this.tween=i;for(d in t)if(d!=="autoRound"&&(c=t[d],!(oe[d]&&Dr(d,t,i,r,e,n)))){if(f=typeof c,m=Bt[d],f==="function"&&(c=c.call(i,r,e,n),f=typeof c),f==="string"&&~c.indexOf("random(")&&(c=pt(c)),m)m(this,e,d,c,i)&&(x=1);else if(d.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(d)+"").trim(),c+="",Te.lastIndex=0,Te.test(u)||(g=X(u),y=X(c)),y?g!==y&&(u=Ie(e,d,u,y)+y):g&&(c+=g),this.add(a,"setProperty",u,c,r,n,0,0,d),s.push(d),P.push(d,0,a[d]);else if(f!=="undefined"){if(l&&d in l?(u=typeof l[d]=="function"?l[d].call(i,r,e,n):l[d],Y(u)&&~u.indexOf("random(")&&(u=pt(u)),X(u+"")||u==="auto"||(u+=se.units[d]||X(we(e,d))||""),(u+"").charAt(1)==="="&&(u=we(e,d))):u=we(e,d),p=parseFloat(u),b=f==="string"&&c.charAt(1)==="="&&c.substr(0,2),b&&(c=c.substr(2)),h=parseFloat(c),d in be&&(d==="autoAlpha"&&(p===1&&we(e,"visibility")==="hidden"&&h&&(p=0),P.push("visibility",0,a.visibility),Le(this,a,"visibility",p?"inherit":"hidden",h?"inherit":"hidden",!h)),d!=="scale"&&d!=="transform"&&(d=be[d],~d.indexOf(",")&&(d=d.split(",")[0]))),_=d in Ee,_){if(this.styles.save(d),f==="string"&&c.substring(0,6)==="var(--"&&(c=fe(e,c.substring(4,c.indexOf(")"))),h=parseFloat(c)),E||(v=e._gsap,v.renderTransform&&!t.parseTransform||_t(e,t.parseTransform),C=t.smoothOrigin!==!1&&v.smooth,E=this._pt=new te(this._pt,a,N,0,1,v.renderTransform,v,0,-1),E.dep=1),d==="scale")this._pt=new te(this._pt,v,"scaleY",v.scaleY,(b?Xe(v.scaleY,b+h):h)-v.scaleY||0,Mi),this._pt.u=0,s.push("scaleY",d),d+="X";else if(d==="transformOrigin"){P.push(re,0,a[re]),c=ks(c),v.svg?Ri(e,c,0,C,0,this):(y=parseFloat(c.split(" ")[2])||0,y!==v.zOrigin&&Le(this,v,"zOrigin",v.zOrigin,y),Le(this,a,d,$t(u),$t(c)));continue}else if(d==="svgOrigin"){Ri(e,c,1,C,0,this);continue}else if(d in en){zs(this,v,d,p,b?Xe(p,b+c):c);continue}else if(d==="smoothOrigin"){Le(this,v,"smooth",v.smooth,c);continue}else if(d==="force3D"){v[d]=c;continue}else if(d==="transform"){Ns(this,c,e);continue}}else d in a||(d=nt(d)||d);if(_||(h||h===0)&&(p||p===0)&&!_s.test(c)&&d in a)g=(u+"").substr((p+"").length),h||(h=0),y=X(c)||(d in se.units?se.units[d]:g),g!==y&&(p=Ie(e,d,u,y)),this._pt=new te(this._pt,_?v:a,d,p,(b?Xe(p,b+h):h)-p,!_&&(y==="px"||d==="zIndex")&&t.autoRound!==!1?ws:Mi),this._pt.u=y||0,g!==y&&y!=="%"&&(this._pt.b=u,this._pt.r=Es);else if(d in a)Rs.call(this,e,d,u,b?b+c:c);else if(d in e)this.add(e,d,u||e[d],b?b+c:c,r,n);else if(d!=="parseTransform"){ii(d,c);continue}_||(d in a?P.push(d,0,a[d]):typeof e[d]=="function"?P.push(d,2,e[d]()):P.push(d,1,u||e[d])),s.push(d)}}x&&Fr(this)},render:function(e,t){if(t.tween._time||!Si())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:we,aliases:be,getSetter:function(e,t,i){var r=be[t];return r&&r.indexOf(",")<0&&(t=r),t in Ee&&t!==re&&(e._gsap.x||we(e,"x"))?i&&Br===i?t==="scale"?Ss:As:(Br=i||{})&&(t==="scale"?Ts:Ms):e.style&&!Zt(e.style[t])?Cs:~t.indexOf("-")?Ps:vi(e,t)},core:{_removeProperty:$e,_getMatrix:Ii}};ie.utils.checkPrefix=nt,ie.core.getStyleSaver=Hr,(function(o,e,t,i){var r=ee(o+","+e+","+t,function(n){Ee[n]=1});ee(e,function(n){se.units[n]="deg",en[n]=1}),be[r[13]]=o+","+e,ee(i,function(n){var s=n.split(":");be[s[1]]=r[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),ee("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(o){se.units[o]="px"}),ie.registerPlugin(an);var H=ie.registerPlugin(an)||ie;H.core.Tween;class xe{constructor(e,t,i,r,n="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(n),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),xe.nextNameID=xe.nextNameID||0,this.$name.id=`lil-gui-name-${++xe.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Bs extends xe{constructor(e,t,i){super(e,t,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Oi(o){let e,t;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const $s={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Oi,toHexString:Oi},Et={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},Gs=[$s,Et,{isPrimitive:!1,match:o=>Array.isArray(o)||ArrayBuffer.isView(o),fromHexString(o,e,t=1){const i=Et.fromHexString(o);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([o,e,t],i=1){i=255/i;const r=o*i<<16^e*i<<8^t*i<<0;return Et.toHexString(r)}},{isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,t=1){const i=Et.fromHexString(o);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:o,g:e,b:t},i=1){i=255/i;const r=o*i<<16^e*i<<8^t*i<<0;return Et.toHexString(r)}}];function Vs(o){return Gs.find(e=>e.match(o))}class js extends xe{constructor(e,t,i,r){super(e,t,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Vs(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Oi(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Fi extends xe{constructor(e,t,i){super(e,t,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Hs extends xe{constructor(e,t,i,r,n,s){super(e,t,i,"lil-number"),this._initInput(),this.min(r),this.max(n);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._stepExplicit&&(b=this._snap(b)),this.setValue(this._clamp(b)))},i=b=>{const _=parseFloat(this.$input.value);isNaN(_)||(this._snapClampSetValue(_+b),this.$input.value=this.getValue())},r=b=>{b.key==="Enter"&&this.$input.blur(),b.code==="ArrowUp"&&(b.preventDefault(),i(this._step*this._arrowKeyMultiplier(b))),b.code==="ArrowDown"&&(b.preventDefault(),i(this._step*this._arrowKeyMultiplier(b)*-1))},n=b=>{this._inputFocused&&(b.preventDefault(),i(this._step*this._normalizeMouseWheel(b)))};let s=!1,a,l,u,c,h;const p=5,f=b=>{a=b.clientX,l=u=b.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",d)},m=b=>{if(s){const _=b.clientX-a,E=b.clientY-l;Math.abs(E)>p?(b.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(_)>p&&d()}if(!s){const _=b.clientY-u;h-=_*this._step*this._arrowKeyMultiplier(b),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}u=b.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",d)},g=()=>{this._inputFocused=!0},y=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",y)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(y,b,_,E,v)=>(y-b)/(_-b)*(v-E)+E,t=y=>{const b=this.$slider.getBoundingClientRect();let _=e(y,b.left,b.right,this._min,this._max);this._snapClampSetValue(_)},i=y=>{this._setDraggingStyle(!0),t(y.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",n)},r=y=>{t(y.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",n)};let s=!1,a,l;const u=y=>{y.preventDefault(),this._setDraggingStyle(!0),t(y.touches[0].clientX),s=!1},c=y=>{y.touches.length>1||(this._hasScrollBar?(a=y.touches[0].clientX,l=y.touches[0].clientY,s=!0):u(y),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",p))},h=y=>{if(s){const b=y.touches[0].clientX-a,_=y.touches[0].clientY-l;Math.abs(b)>Math.abs(_)?u(y):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",p))}else y.preventDefault(),t(y.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",p)},f=this._callOnFinishChange.bind(this),m=400;let d;const g=y=>{if(Math.abs(y.deltaX)<Math.abs(y.deltaY)&&this._hasScrollBar)return;y.preventDefault();const _=this._normalizeMouseWheel(y)*this._step;this._snapClampSetValue(this.getValue()+_),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(f,m)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ys extends xe{constructor(e,t,i,r){super(e,t,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Ws extends xe{constructor(e,t,i){super(e,t,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var qs=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function Xs(o){const e=document.createElement("style");e.innerHTML=o;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let on=!1;class Gt{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:r,title:n="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),l&&this.domElement.classList.add("lil-allow-touch-styles"),!on&&a&&(Xs(qs),on=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=s}add(e,t,i,r,n){if(Object(i)===i)return new Ys(this,e,t,i);const s=e[t];switch(typeof s){case"number":return new Hs(this,e,t,i,r,n);case"boolean":return new Bs(this,e,t);case"string":return new Ws(this,e,t);case"function":return new Fi(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,s)}addColor(e,t,i=1){return new js(this,e,t,i)}addFolder(e){const t=new Gt({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Fi||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Fi)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const st=[{id:"156",code:"CN",name:"China",population:1412,gdpPerCapita:21476,co2Emissions:8,lifeExpectancy:78.2,humanDevIndex:.768,internetUsers:73,renewableEnergy:15,urbanPopulation:64.7,healthExpenditure:5.4,educationExpenditure:3.6,forestArea:23.3,accessElectricity:100},{id:"356",code:"IN",name:"India",population:1408,gdpPerCapita:8379,co2Emissions:1.9,lifeExpectancy:70.8,humanDevIndex:.633,internetUsers:47,renewableEnergy:38,urbanPopulation:35.9,healthExpenditure:3,educationExpenditure:4.5,forestArea:24.3,accessElectricity:99.6},{id:"840",code:"US",name:"United States",population:332,gdpPerCapita:76399,co2Emissions:14.4,lifeExpectancy:77.5,humanDevIndex:.921,internetUsers:92,renewableEnergy:13,urbanPopulation:83.1,healthExpenditure:18.3,educationExpenditure:6.1,forestArea:33.9,accessElectricity:100},{id:"360",code:"ID",name:"Indonesia",population:276,gdpPerCapita:14535,co2Emissions:2.3,lifeExpectancy:71.9,humanDevIndex:.705,internetUsers:62,renewableEnergy:12,urbanPopulation:57.9,healthExpenditure:2.9,educationExpenditure:3.5,forestArea:49.1,accessElectricity:99},{id:"586",code:"PK",name:"Pakistan",population:225,gdpPerCapita:6470,co2Emissions:1,lifeExpectancy:67.3,humanDevIndex:.544,internetUsers:21,renewableEnergy:34,urbanPopulation:37.4,healthExpenditure:2.8,educationExpenditure:2.3,forestArea:1.9,accessElectricity:95},{id:"076",code:"BR",name:"Brazil",population:215,gdpPerCapita:16154,co2Emissions:2.2,lifeExpectancy:76,humanDevIndex:.754,internetUsers:81,renewableEnergy:47,urbanPopulation:87.6,healthExpenditure:10.3,educationExpenditure:6.3,forestArea:59.4,accessElectricity:100},{id:"566",code:"NG",name:"Nigeria",population:219,gdpPerCapita:5860,co2Emissions:.6,lifeExpectancy:53.9,humanDevIndex:.535,internetUsers:36,renewableEnergy:86,urbanPopulation:53,healthExpenditure:3,educationExpenditure:.5,forestArea:7.2,accessElectricity:59.5},{id:"050",code:"BD",name:"Bangladesh",population:167,gdpPerCapita:7066,co2Emissions:.6,lifeExpectancy:73.2,humanDevIndex:.661,internetUsers:39,renewableEnergy:3,urbanPopulation:39.4,healthExpenditure:2.3,educationExpenditure:1.8,forestArea:11.2,accessElectricity:99.4},{id:"643",code:"RU",name:"Russia",population:144,gdpPerCapita:30820,co2Emissions:11.4,lifeExpectancy:72.8,humanDevIndex:.822,internetUsers:85,renewableEnergy:7,urbanPopulation:75.1,healthExpenditure:5.6,educationExpenditure:3.7,forestArea:49.8,accessElectricity:100},{id:"484",code:"MX",name:"Mexico",population:130,gdpPerCapita:20824,co2Emissions:3.5,lifeExpectancy:75.1,humanDevIndex:.758,internetUsers:72,renewableEnergy:9,urbanPopulation:81,healthExpenditure:5.4,educationExpenditure:4.3,forestArea:33.6,accessElectricity:100},{id:"392",code:"JP",name:"Japan",population:125,gdpPerCapita:45546,co2Emissions:8.5,lifeExpectancy:84.6,humanDevIndex:.925,internetUsers:93,renewableEnergy:12,urbanPopulation:91.9,healthExpenditure:11,educationExpenditure:3.4,forestArea:68.4,accessElectricity:100},{id:"231",code:"ET",name:"Ethiopia",population:121,gdpPerCapita:2771,co2Emissions:.2,lifeExpectancy:66.6,humanDevIndex:.498,internetUsers:17,renewableEnergy:93,urbanPopulation:22.2,healthExpenditure:3.5,educationExpenditure:4.5,forestArea:12.5,accessElectricity:51.1},{id:"608",code:"PH",name:"Philippines",population:115,gdpPerCapita:9746,co2Emissions:1.3,lifeExpectancy:72.1,humanDevIndex:.699,internetUsers:53,renewableEnergy:29,urbanPopulation:47.7,healthExpenditure:5.1,educationExpenditure:3.6,forestArea:27,accessElectricity:97.2},{id:"818",code:"EG",name:"Egypt",population:106,gdpPerCapita:14927,co2Emissions:2.4,lifeExpectancy:72,humanDevIndex:.731,internetUsers:72,renewableEnergy:10,urbanPopulation:42.8,healthExpenditure:4.6,educationExpenditure:4,forestArea:.1,accessElectricity:100},{id:"704",code:"VN",name:"Vietnam",population:99,gdpPerCapita:12756,co2Emissions:3.5,lifeExpectancy:75.8,humanDevIndex:.703,internetUsers:70,renewableEnergy:21,urbanPopulation:38.1,healthExpenditure:4.7,educationExpenditure:4.2,forestArea:47.6,accessElectricity:100},{id:"276",code:"DE",name:"Germany",population:84,gdpPerCapita:58780,co2Emissions:8.1,lifeExpectancy:81.4,humanDevIndex:.942,internetUsers:93,renewableEnergy:20,urbanPopulation:77.6,healthExpenditure:12.8,educationExpenditure:4.9,forestArea:32.7,accessElectricity:100},{id:"792",code:"TR",name:"Turkey",population:85,gdpPerCapita:36879,co2Emissions:4.8,lifeExpectancy:78.6,humanDevIndex:.838,internetUsers:83,renewableEnergy:17,urbanPopulation:76.6,healthExpenditure:4.3,educationExpenditure:3.1,forestArea:28.6,accessElectricity:100},{id:"364",code:"IR",name:"Iran",population:87,gdpPerCapita:16261,co2Emissions:8.3,lifeExpectancy:76.7,humanDevIndex:.774,internetUsers:78,renewableEnergy:6,urbanPopulation:76.3,healthExpenditure:5.2,educationExpenditure:3.6,forestArea:6.6,accessElectricity:100},{id:"764",code:"TH",name:"Thailand",population:70,gdpPerCapita:19169,co2Emissions:3.8,lifeExpectancy:79.3,humanDevIndex:.8,internetUsers:78,renewableEnergy:15,urbanPopulation:52.2,healthExpenditure:3.8,educationExpenditure:2.9,forestArea:38.8,accessElectricity:100},{id:"826",code:"GB",name:"United Kingdom",population:68,gdpPerCapita:49675,co2Emissions:4.7,lifeExpectancy:81.8,humanDevIndex:.929,internetUsers:97,renewableEnergy:15,urbanPopulation:84.2,healthExpenditure:12,educationExpenditure:5.5,forestArea:13.2,accessElectricity:100},{id:"250",code:"FR",name:"France",population:68,gdpPerCapita:50728,co2Emissions:4.3,lifeExpectancy:82.7,humanDevIndex:.903,internetUsers:91,renewableEnergy:12,urbanPopulation:81.5,healthExpenditure:12.2,educationExpenditure:5.5,forestArea:31.4,accessElectricity:100},{id:"380",code:"IT",name:"Italy",population:59,gdpPerCapita:45936,co2Emissions:5.3,lifeExpectancy:83.5,humanDevIndex:.895,internetUsers:86,renewableEnergy:20,urbanPopulation:71.3,healthExpenditure:8.7,educationExpenditure:4.3,forestArea:32.1,accessElectricity:100},{id:"710",code:"ZA",name:"South Africa",population:60,gdpPerCapita:15e3,co2Emissions:6.7,lifeExpectancy:65.3,humanDevIndex:.713,internetUsers:70,renewableEnergy:6,urbanPopulation:68,healthExpenditure:8.1,educationExpenditure:6.6,forestArea:7.6,accessElectricity:85},{id:"834",code:"TZ",name:"Tanzania",population:63,gdpPerCapita:2990,co2Emissions:.2,lifeExpectancy:66.2,humanDevIndex:.549,internetUsers:25,renewableEnergy:85,urbanPopulation:37,healthExpenditure:3.8,educationExpenditure:3.4,forestArea:48.1,accessElectricity:42.7},{id:"404",code:"KE",name:"Kenya",population:55,gdpPerCapita:5494,co2Emissions:.4,lifeExpectancy:67,humanDevIndex:.575,internetUsers:29,renewableEnergy:75,urbanPopulation:28.5,healthExpenditure:4.3,educationExpenditure:5.1,forestArea:7.8,accessElectricity:75},{id:"410",code:"KR",name:"South Korea",population:52,gdpPerCapita:50071,co2Emissions:11.5,lifeExpectancy:83.7,humanDevIndex:.925,internetUsers:97,renewableEnergy:4,urbanPopulation:81.4,healthExpenditure:8.4,educationExpenditure:5.1,forestArea:63.4,accessElectricity:100},{id:"170",code:"CO",name:"Colombia",population:52,gdpPerCapita:17063,co2Emissions:1.8,lifeExpectancy:77.3,humanDevIndex:.752,internetUsers:73,renewableEnergy:27,urbanPopulation:81.7,healthExpenditure:7.7,educationExpenditure:4.5,forestArea:52.7,accessElectricity:100},{id:"724",code:"ES",name:"Spain",population:47,gdpPerCapita:42190,co2Emissions:5,lifeExpectancy:83.6,humanDevIndex:.905,internetUsers:94,renewableEnergy:21,urbanPopulation:81.1,healthExpenditure:10.7,educationExpenditure:4.8,forestArea:37.4,accessElectricity:100},{id:"032",code:"AR",name:"Argentina",population:46,gdpPerCapita:24678,co2Emissions:3.8,lifeExpectancy:77.1,humanDevIndex:.842,internetUsers:87,renewableEnergy:13,urbanPopulation:92.2,healthExpenditure:10,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"800",code:"UG",name:"Uganda",population:48,gdpPerCapita:2566,co2Emissions:.1,lifeExpectancy:64.4,humanDevIndex:.525,internetUsers:18,renewableEnergy:89,urbanPopulation:25.6,healthExpenditure:3.8,educationExpenditure:2.7,forestArea:9.7,accessElectricity:46},{id:"012",code:"DZ",name:"Algeria",population:45,gdpPerCapita:12667,co2Emissions:3.7,lifeExpectancy:77.1,humanDevIndex:.745,internetUsers:71,renewableEnergy:1,urbanPopulation:74.3,healthExpenditure:5.3,educationExpenditure:5.6,forestArea:.8,accessElectricity:100},{id:"804",code:"UA",name:"Ukraine",population:41,gdpPerCapita:14220,co2Emissions:4.5,lifeExpectancy:72.1,humanDevIndex:.773,internetUsers:75,renewableEnergy:8,urbanPopulation:69.6,healthExpenditure:7,educationExpenditure:5.4,forestArea:16.7,accessElectricity:100},{id:"368",code:"IQ",name:"Iraq",population:43,gdpPerCapita:10474,co2Emissions:4,lifeExpectancy:71.1,humanDevIndex:.686,internetUsers:75,renewableEnergy:3,urbanPopulation:71.1,healthExpenditure:4.6,educationExpenditure:4.7,forestArea:1.9,accessElectricity:100},{id:"616",code:"PL",name:"Poland",population:38,gdpPerCapita:40343,co2Emissions:8,lifeExpectancy:78.7,humanDevIndex:.876,internetUsers:87,renewableEnergy:17,urbanPopulation:60,healthExpenditure:6.5,educationExpenditure:4.6,forestArea:30.9,accessElectricity:100},{id:"124",code:"CA",name:"Canada",population:39,gdpPerCapita:54966,co2Emissions:14.3,lifeExpectancy:82.4,humanDevIndex:.936,internetUsers:93,renewableEnergy:18,urbanPopulation:81.8,healthExpenditure:12.8,educationExpenditure:5.3,forestArea:38.7,accessElectricity:100},{id:"504",code:"MA",name:"Morocco",population:37,gdpPerCapita:9339,co2Emissions:1.9,lifeExpectancy:77,humanDevIndex:.683,internetUsers:84,renewableEnergy:13,urbanPopulation:64.6,healthExpenditure:5.3,educationExpenditure:6.8,forestArea:12.8,accessElectricity:100},{id:"682",code:"SA",name:"Saudi Arabia",population:36,gdpPerCapita:56817,co2Emissions:15.3,lifeExpectancy:76.9,humanDevIndex:.875,internetUsers:98,renewableEnergy:0,urbanPopulation:84.7,healthExpenditure:6.4,educationExpenditure:5.1,forestArea:.5,accessElectricity:100},{id:"604",code:"PE",name:"Peru",population:34,gdpPerCapita:14225,co2Emissions:1.6,lifeExpectancy:77.4,humanDevIndex:.762,internetUsers:71,renewableEnergy:25,urbanPopulation:78.6,healthExpenditure:5.2,educationExpenditure:4,forestArea:57.3,accessElectricity:97},{id:"036",code:"AU",name:"Australia",population:26,gdpPerCapita:59934,co2Emissions:15,lifeExpectancy:84,humanDevIndex:.951,internetUsers:96,renewableEnergy:12,urbanPopulation:86.4,healthExpenditure:10.7,educationExpenditure:6.1,forestArea:17.4,accessElectricity:100},{id:"458",code:"MY",name:"Malaysia",population:34,gdpPerCapita:33550,co2Emissions:7.6,lifeExpectancy:76.9,humanDevIndex:.803,internetUsers:90,renewableEnergy:8,urbanPopulation:78,healthExpenditure:3.8,educationExpenditure:3.9,forestArea:57.7,accessElectricity:100},{id:"288",code:"GH",name:"Ghana",population:33,gdpPerCapita:6754,co2Emissions:.6,lifeExpectancy:64.9,humanDevIndex:.632,internetUsers:53,renewableEnergy:42,urbanPopulation:58,healthExpenditure:3.4,educationExpenditure:4,forestArea:34.5,accessElectricity:85.9},{id:"524",code:"NP",name:"Nepal",population:30,gdpPerCapita:4199,co2Emissions:.5,lifeExpectancy:71.7,humanDevIndex:.602,internetUsers:48,renewableEnergy:86,urbanPopulation:21,healthExpenditure:4.4,educationExpenditure:4.2,forestArea:25.4,accessElectricity:90},{id:"862",code:"VE",name:"Venezuela",population:29,gdpPerCapita:7045,co2Emissions:3.1,lifeExpectancy:72.1,humanDevIndex:.691,internetUsers:72,renewableEnergy:68,urbanPopulation:88.3,healthExpenditure:3.9,educationExpenditure:6.9,forestArea:52.1,accessElectricity:99.9},{id:"450",code:"MG",name:"Madagascar",population:29,gdpPerCapita:1724,co2Emissions:.2,lifeExpectancy:67,humanDevIndex:.501,internetUsers:10,renewableEnergy:68,urbanPopulation:39.5,healthExpenditure:3.9,educationExpenditure:2.9,forestArea:21.4,accessElectricity:34},{id:"120",code:"CM",name:"Cameroon",population:28,gdpPerCapita:3977,co2Emissions:.4,lifeExpectancy:60.3,humanDevIndex:.576,internetUsers:34,renewableEnergy:74,urbanPopulation:58.4,healthExpenditure:3.3,educationExpenditure:3.2,forestArea:45.6,accessElectricity:65},{id:"528",code:"NL",name:"Netherlands",population:18,gdpPerCapita:64654,co2Emissions:8.1,lifeExpectancy:82.3,humanDevIndex:.941,internetUsers:98,renewableEnergy:13,urbanPopulation:92.5,healthExpenditure:11.2,educationExpenditure:5.3,forestArea:11.2,accessElectricity:100},{id:"152",code:"CL",name:"Chile",population:19,gdpPerCapita:28526,co2Emissions:4.3,lifeExpectancy:80.7,humanDevIndex:.855,internetUsers:88,renewableEnergy:27,urbanPopulation:87.9,healthExpenditure:9.3,educationExpenditure:5.4,forestArea:24.4,accessElectricity:100},{id:"752",code:"SE",name:"Sweden",population:10,gdpPerCapita:60239,co2Emissions:3.5,lifeExpectancy:83.2,humanDevIndex:.947,internetUsers:96,renewableEnergy:56,urbanPopulation:88.2,healthExpenditure:11.4,educationExpenditure:7.6,forestArea:68.9,accessElectricity:100},{id:"578",code:"NO",name:"Norway",population:5,gdpPerCapita:82236,co2Emissions:7.5,lifeExpectancy:83.2,humanDevIndex:.961,internetUsers:98,renewableEnergy:72,urbanPopulation:83.4,healthExpenditure:11.4,educationExpenditure:7.9,forestArea:33.2,accessElectricity:100},{id:"702",code:"SG",name:"Singapore",population:6,gdpPerCapita:116527,co2Emissions:8.9,lifeExpectancy:84.1,humanDevIndex:.939,internetUsers:96,renewableEnergy:2,urbanPopulation:100,healthExpenditure:6.1,educationExpenditure:2.9,forestArea:22.5,accessElectricity:100},{id:"554",code:"NZ",name:"New Zealand",population:5,gdpPerCapita:48249,co2Emissions:6.8,lifeExpectancy:82.5,humanDevIndex:.937,internetUsers:95,renewableEnergy:40,urbanPopulation:86.7,healthExpenditure:9.7,educationExpenditure:6.3,forestArea:38.6,accessElectricity:100},{id:"372",code:"IE",name:"Ireland",population:5,gdpPerCapita:106998,co2Emissions:7.3,lifeExpectancy:82.8,humanDevIndex:.945,internetUsers:94,renewableEnergy:14,urbanPopulation:64.2,healthExpenditure:7.1,educationExpenditure:3.5,forestArea:11,accessElectricity:100},{id:"376",code:"IL",name:"Israel",population:9,gdpPerCapita:52170,co2Emissions:6.9,lifeExpectancy:83.5,humanDevIndex:.919,internetUsers:90,renewableEnergy:6,urbanPopulation:92.8,healthExpenditure:7.5,educationExpenditure:7.1,forestArea:7.6,accessElectricity:100},{id:"784",code:"AE",name:"United Arab Emirates",population:10,gdpPerCapita:77272,co2Emissions:20.7,lifeExpectancy:78.7,humanDevIndex:.911,internetUsers:100,renewableEnergy:1,urbanPopulation:87.4,healthExpenditure:5,educationExpenditure:3.9,forestArea:4.5,accessElectricity:100},{id:"756",code:"CH",name:"Switzerland",population:9,gdpPerCapita:81867,co2Emissions:4,lifeExpectancy:84,humanDevIndex:.962,internetUsers:96,renewableEnergy:28,urbanPopulation:74,healthExpenditure:11.3,educationExpenditure:5,forestArea:31.9,accessElectricity:100},{id:"040",code:"AT",name:"Austria",population:9,gdpPerCapita:58013,co2Emissions:6.8,lifeExpectancy:82,humanDevIndex:.916,internetUsers:93,renewableEnergy:36,urbanPopulation:59,healthExpenditure:10.4,educationExpenditure:5.4,forestArea:47.3,accessElectricity:100},{id:"620",code:"PT",name:"Portugal",population:10,gdpPerCapita:38147,co2Emissions:4,lifeExpectancy:82.6,humanDevIndex:.866,internetUsers:85,renewableEnergy:34,urbanPopulation:66.8,healthExpenditure:10.6,educationExpenditure:5,forestArea:36.1,accessElectricity:100},{id:"300",code:"GR",name:"Greece",population:10,gdpPerCapita:33393,co2Emissions:5.3,lifeExpectancy:81.4,humanDevIndex:.887,internetUsers:79,renewableEnergy:22,urbanPopulation:80.1,healthExpenditure:7.8,educationExpenditure:4.4,forestArea:32.5,accessElectricity:100},{id:"203",code:"CZ",name:"Czech Republic",population:11,gdpPerCapita:45499,co2Emissions:9.3,lifeExpectancy:79.4,humanDevIndex:.889,internetUsers:88,renewableEnergy:17,urbanPopulation:74.1,healthExpenditure:9.2,educationExpenditure:4.4,forestArea:34.7,accessElectricity:100},{id:"056",code:"BE",name:"Belgium",population:12,gdpPerCapita:55521,co2Emissions:8,lifeExpectancy:82.2,humanDevIndex:.937,internetUsers:94,renewableEnergy:13,urbanPopulation:98.1,healthExpenditure:11.1,educationExpenditure:6.4,forestArea:22.8,accessElectricity:100},{id:"348",code:"HU",name:"Hungary",population:10,gdpPerCapita:37935,co2Emissions:4.6,lifeExpectancy:77,humanDevIndex:.846,internetUsers:89,renewableEnergy:14,urbanPopulation:72.3,healthExpenditure:6.4,educationExpenditure:4.6,forestArea:22.9,accessElectricity:100},{id:"246",code:"FI",name:"Finland",population:6,gdpPerCapita:53654,co2Emissions:6.5,lifeExpectancy:82.2,humanDevIndex:.94,internetUsers:96,renewableEnergy:44,urbanPopulation:85.5,healthExpenditure:9.6,educationExpenditure:6.3,forestArea:73.7,accessElectricity:100},{id:"208",code:"DK",name:"Denmark",population:6,gdpPerCapita:67803,co2Emissions:4.4,lifeExpectancy:81.6,humanDevIndex:.948,internetUsers:98,renewableEnergy:40,urbanPopulation:88.2,healthExpenditure:10.5,educationExpenditure:6.9,forestArea:14.7,accessElectricity:100},{id:"352",code:"IS",name:"Iceland",population:.4,gdpPerCapita:68727,co2Emissions:9.7,lifeExpectancy:83.1,humanDevIndex:.959,internetUsers:99,renewableEnergy:85,urbanPopulation:93.9,healthExpenditure:8.9,educationExpenditure:7.7,forestArea:.5,accessElectricity:100},{id:"180",code:"CD",name:"DR Congo",population:99,gdpPerCapita:1099,co2Emissions:.04,lifeExpectancy:60.7,humanDevIndex:.479,internetUsers:9,renewableEnergy:97,urbanPopulation:46.2,healthExpenditure:3.3,educationExpenditure:1.5,forestArea:67.3,accessElectricity:19.1},{id:"729",code:"SD",name:"Sudan",population:46,gdpPerCapita:4232,co2Emissions:.5,lifeExpectancy:66.1,humanDevIndex:.508,internetUsers:31,renewableEnergy:62,urbanPopulation:35.6,healthExpenditure:4.5,educationExpenditure:2.2,forestArea:9.7,accessElectricity:55.5},{id:"024",code:"AO",name:"Angola",population:35,gdpPerCapita:6938,co2Emissions:.8,lifeExpectancy:62,humanDevIndex:.586,internetUsers:36,renewableEnergy:55,urbanPopulation:68.1,healthExpenditure:2.6,educationExpenditure:2.4,forestArea:46.3,accessElectricity:46},{id:"508",code:"MZ",name:"Mozambique",population:33,gdpPerCapita:1346,co2Emissions:.2,lifeExpectancy:60.9,humanDevIndex:.456,internetUsers:10,renewableEnergy:79,urbanPopulation:38,healthExpenditure:7.5,educationExpenditure:5.5,forestArea:48.2,accessElectricity:31},{id:"384",code:"CI",name:"Ivory Coast",population:28,gdpPerCapita:5972,co2Emissions:.4,lifeExpectancy:59.3,humanDevIndex:.55,internetUsers:45,renewableEnergy:68,urbanPopulation:52.7,healthExpenditure:3.3,educationExpenditure:3.4,forestArea:9.3,accessElectricity:70},{id:"562",code:"NE",name:"Niger",population:26,gdpPerCapita:1318,co2Emissions:.1,lifeExpectancy:63,humanDevIndex:.4,internetUsers:5,renewableEnergy:80,urbanPopulation:16.8,healthExpenditure:5.2,educationExpenditure:3.5,forestArea:.9,accessElectricity:19.3},{id:"854",code:"BF",name:"Burkina Faso",population:22,gdpPerCapita:2445,co2Emissions:.2,lifeExpectancy:62.7,humanDevIndex:.449,internetUsers:18,renewableEnergy:79,urbanPopulation:31.5,healthExpenditure:5.6,educationExpenditure:5.4,forestArea:19.3,accessElectricity:19},{id:"466",code:"ML",name:"Mali",population:22,gdpPerCapita:2462,co2Emissions:.2,lifeExpectancy:59.3,humanDevIndex:.428,internetUsers:27,renewableEnergy:76,urbanPopulation:44.6,healthExpenditure:3.8,educationExpenditure:3.8,forestArea:3.9,accessElectricity:53},{id:"686",code:"SN",name:"Senegal",population:17,gdpPerCapita:3942,co2Emissions:.7,lifeExpectancy:68.6,humanDevIndex:.511,internetUsers:58,renewableEnergy:47,urbanPopulation:48.6,healthExpenditure:3.5,educationExpenditure:5.5,forestArea:42.5,accessElectricity:70.4},{id:"894",code:"ZM",name:"Zambia",population:20,gdpPerCapita:3574,co2Emissions:.4,lifeExpectancy:65,humanDevIndex:.565,internetUsers:16,renewableEnergy:88,urbanPopulation:45.2,healthExpenditure:4.9,educationExpenditure:4.6,forestArea:59.8,accessElectricity:43},{id:"716",code:"ZW",name:"Zimbabwe",population:16,gdpPerCapita:2622,co2Emissions:.8,lifeExpectancy:61.5,humanDevIndex:.593,internetUsers:35,renewableEnergy:78,urbanPopulation:32.2,healthExpenditure:3.4,educationExpenditure:5,forestArea:36.4,accessElectricity:49},{id:"646",code:"RW",name:"Rwanda",population:14,gdpPerCapita:2359,co2Emissions:.1,lifeExpectancy:69.6,humanDevIndex:.534,internetUsers:30,renewableEnergy:84,urbanPopulation:17.6,healthExpenditure:7.5,educationExpenditure:3.1,forestArea:28.8,accessElectricity:48},{id:"004",code:"AF",name:"Afghanistan",population:41,gdpPerCapita:2065,co2Emissions:.2,lifeExpectancy:62,humanDevIndex:.478,internetUsers:18,renewableEnergy:45,urbanPopulation:26.3,healthExpenditure:18.2,educationExpenditure:4.1,forestArea:1.9,accessElectricity:97.7},{id:"104",code:"MM",name:"Myanmar",population:55,gdpPerCapita:5699,co2Emissions:.6,lifeExpectancy:67.8,humanDevIndex:.585,internetUsers:44,renewableEnergy:51,urbanPopulation:31.4,healthExpenditure:4.8,educationExpenditure:2,forestArea:42.2,accessElectricity:70},{id:"408",code:"KP",name:"North Korea",population:26,gdpPerCapita:1800,co2Emissions:2,lifeExpectancy:72.6,humanDevIndex:.733,internetUsers:0,renewableEnergy:12,urbanPopulation:63,healthExpenditure:6,educationExpenditure:4,forestArea:41,accessElectricity:26},{id:"496",code:"MN",name:"Mongolia",population:3.4,gdpPerCapita:12896,co2Emissions:14,lifeExpectancy:70.9,humanDevIndex:.739,internetUsers:84,renewableEnergy:7,urbanPopulation:68.8,healthExpenditure:4,educationExpenditure:4.7,forestArea:7.1,accessElectricity:100},{id:"144",code:"LK",name:"Sri Lanka",population:22,gdpPerCapita:14509,co2Emissions:1,lifeExpectancy:77.4,humanDevIndex:.782,internetUsers:47,renewableEnergy:51,urbanPopulation:18.9,healthExpenditure:3.8,educationExpenditure:2.1,forestArea:29.4,accessElectricity:100},{id:"398",code:"KZ",name:"Kazakhstan",population:19,gdpPerCapita:30500,co2Emissions:13.2,lifeExpectancy:74.4,humanDevIndex:.811,internetUsers:91,renewableEnergy:2,urbanPopulation:57.8,healthExpenditure:2.8,educationExpenditure:2.9,forestArea:1.2,accessElectricity:100},{id:"860",code:"UZ",name:"Uzbekistan",population:35,gdpPerCapita:9127,co2Emissions:3.5,lifeExpectancy:73.8,humanDevIndex:.727,internetUsers:71,renewableEnergy:11,urbanPopulation:50.4,healthExpenditure:6.8,educationExpenditure:5.3,forestArea:7.7,accessElectricity:100},{id:"192",code:"CU",name:"Cuba",population:11,gdpPerCapita:9478,co2Emissions:2.3,lifeExpectancy:79,humanDevIndex:.764,internetUsers:71,renewableEnergy:32,urbanPopulation:77.2,healthExpenditure:11.7,educationExpenditure:12.8,forestArea:33,accessElectricity:100},{id:"218",code:"EC",name:"Ecuador",population:18,gdpPerCapita:12171,co2Emissions:2.3,lifeExpectancy:77.9,humanDevIndex:.74,internetUsers:70,renewableEnergy:31,urbanPopulation:64.2,healthExpenditure:8.3,educationExpenditure:4.4,forestArea:50.1,accessElectricity:100},{id:"320",code:"GT",name:"Guatemala",population:18,gdpPerCapita:9547,co2Emissions:1,lifeExpectancy:74.3,humanDevIndex:.627,internetUsers:51,renewableEnergy:62,urbanPopulation:52.4,healthExpenditure:5.8,educationExpenditure:3.4,forestArea:33,accessElectricity:98},{id:"068",code:"BO",name:"Bolivia",population:12,gdpPerCapita:9484,co2Emissions:1.8,lifeExpectancy:72.1,humanDevIndex:.692,internetUsers:66,renewableEnergy:24,urbanPopulation:70.4,healthExpenditure:6.9,educationExpenditure:7.3,forestArea:50.1,accessElectricity:99.3},{id:"340",code:"HN",name:"Honduras",population:10,gdpPerCapita:6289,co2Emissions:1,lifeExpectancy:75.3,humanDevIndex:.621,internetUsers:48,renewableEnergy:61,urbanPopulation:59,healthExpenditure:7.9,educationExpenditure:6.1,forestArea:38.1,accessElectricity:94},{id:"600",code:"PY",name:"Paraguay",population:7,gdpPerCapita:15030,co2Emissions:1.1,lifeExpectancy:74.3,humanDevIndex:.717,internetUsers:77,renewableEnergy:78,urbanPopulation:62.5,healthExpenditure:7.6,educationExpenditure:3.4,forestArea:38.6,accessElectricity:100},{id:"858",code:"UY",name:"Uruguay",population:3.5,gdpPerCapita:25041,co2Emissions:2,lifeExpectancy:78.4,humanDevIndex:.83,internetUsers:87,renewableEnergy:55,urbanPopulation:95.6,healthExpenditure:9.3,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"188",code:"CR",name:"Costa Rica",population:5,gdpPerCapita:23101,co2Emissions:1.5,lifeExpectancy:80.8,humanDevIndex:.809,internetUsers:81,renewableEnergy:73,urbanPopulation:81.4,healthExpenditure:7.3,educationExpenditure:6.7,forestArea:59,accessElectricity:100},{id:"591",code:"PA",name:"Panama",population:4.4,gdpPerCapita:35317,co2Emissions:2.5,lifeExpectancy:79.2,humanDevIndex:.805,internetUsers:68,renewableEnergy:35,urbanPopulation:68.4,healthExpenditure:7.3,educationExpenditure:3.2,forestArea:62.1,accessElectricity:95}],Ui=[{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],accessor:o=>o.humanDevIndex,format:o=>o.toFixed(3)},{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],accessor:o=>o.gdpPerCapita,format:o=>`$${(o/1e3).toFixed(1)}k`},{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],accessor:o=>o.co2Emissions,format:o=>`${o.toFixed(1)}t`},{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],accessor:o=>o.lifeExpectancy,format:o=>`${o.toFixed(1)} yrs`},{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],accessor:o=>o.renewableEnergy,format:o=>`${o.toFixed(0)}%`},{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],accessor:o=>o.internetUsers,format:o=>`${o.toFixed(0)}%`},{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],accessor:o=>o.urbanPopulation,format:o=>`${o.toFixed(0)}%`},{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],accessor:o=>o.healthExpenditure,format:o=>`${o.toFixed(1)}%`},{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],accessor:o=>o.forestArea,format:o=>`${o.toFixed(0)}%`},{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffffd4","#fed98e","#cc4c02"],domain:[15,100],accessor:o=>o.accessElectricity,format:o=>`${o.toFixed(0)}%`}];function Zs(o,e){const[t,i]=o.domain;return Math.max(0,Math.min(1,(e-t)/(i-t)))}const Ks={US:"840",USA:"840","UNITED STATES":"840",AMERICA:"840",CA:"124",CAN:"124",CANADA:"124",MX:"484",MEX:"484",MEXICO:"484",DE:"276",DEU:"276",GERMANY:"276",DEUTSCHLAND:"276",FR:"250",FRA:"250",FRANCE:"250",GB:"826",GBR:"826",UK:"826","UNITED KINGDOM":"826",BRITAIN:"826",ENGLAND:"826",IT:"380",ITA:"380",ITALY:"380",ES:"724",ESP:"724",SPAIN:"724",PT:"620",PRT:"620",PORTUGAL:"620",NL:"528",NLD:"528",NETHERLANDS:"528",HOLLAND:"528",BE:"056",BEL:"056",BELGIUM:"056",AT:"040",AUT:"040",AUSTRIA:"040",CH:"756",CHE:"756",SWITZERLAND:"756",PL:"616",POL:"616",POLAND:"616",SE:"752",SWE:"752",SWEDEN:"752",NO:"578",NOR:"578",NORWAY:"578",DK:"208",DNK:"208",DENMARK:"208",FI:"246",FIN:"246",FINLAND:"246",IE:"372",IRL:"372",IRELAND:"372",GR:"300",GRC:"300",GREECE:"300",CZ:"203",CZE:"203","CZECH REPUBLIC":"203",CZECHIA:"203",RO:"642",ROU:"642",ROMANIA:"642",HU:"348",HUN:"348",HUNGARY:"348",UA:"804",UKR:"804",UKRAINE:"804",RU:"643",RUS:"643",RUSSIA:"643","RUSSIAN FEDERATION":"643",CN:"156",CHN:"156",CHINA:"156",JP:"392",JPN:"392",JAPAN:"392",KR:"410",KOR:"410","SOUTH KOREA":"410",KOREA:"410",IN:"356",IND:"356",INDIA:"356",ID:"360",IDN:"360",INDONESIA:"360",TH:"764",THA:"764",THAILAND:"764",VN:"704",VNM:"704",VIETNAM:"704",PH:"608",PHL:"608",PHILIPPINES:"608",MY:"458",MYS:"458",MALAYSIA:"458",SG:"702",SGP:"702",SINGAPORE:"702",PK:"586",PAK:"586",PAKISTAN:"586",BD:"050",BGD:"050",BANGLADESH:"050",TR:"792",TUR:"792",TURKEY:"792",TURKIYE:"792",SA:"682",SAU:"682","SAUDI ARABIA":"682",AE:"784",ARE:"784",UAE:"784","UNITED ARAB EMIRATES":"784",IL:"376",ISR:"376",ISRAEL:"376",IR:"364",IRN:"364",IRAN:"364",IQ:"368",IRQ:"368",IRAQ:"368",AU:"036",AUS:"036",AUSTRALIA:"036",NZ:"554",NZL:"554","NEW ZEALAND":"554",BR:"076",BRA:"076",BRAZIL:"076",AR:"032",ARG:"032",ARGENTINA:"032",CL:"152",CHL:"152",CHILE:"152",CO:"170",COL:"170",COLOMBIA:"170",PE:"604",PER:"604",PERU:"604",VE:"862",VEN:"862",VENEZUELA:"862",ZA:"710",ZAF:"710","SOUTH AFRICA":"710",EG:"818",EGY:"818",EGYPT:"818",NG:"566",NGA:"566",NIGERIA:"566",KE:"404",KEN:"404",KENYA:"404",ET:"231",ETH:"231",ETHIOPIA:"231",MA:"504",MAR:"504",MOROCCO:"504",DZ:"012",DZA:"012",ALGERIA:"012",TN:"788",TUN:"788",TUNISIA:"788",GH:"288",GHA:"288",GHANA:"288"};function zi(o){const e=o.toUpperCase().trim();return/^\d{1,3}$/.test(o)?o.padStart(3,"0"):Ks[e]||o}function ln(o){const e={};return o instanceof Map?o.forEach((t,i)=>{e[zi(i)]=t}):Object.entries(o).forEach(([t,i])=>{e[zi(t)]=i}),e}const Vt=4096,jt=2048,Js=`
  self.onmessage = async (e) => {
    const { url, objectName, idProperty, topojsonUrl } = e.data;
    
    try {
      if (!self.topojson) {
        self.postMessage({ status: "Loading dependencies..." });
        importScripts(topojsonUrl);
      }
      self.postMessage({ status: "Fetching data...", progress: 0.1 });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
      
      const data = await response.json();
      let features;

      // Check if it's already GeoJSON
      if (data.type === 'FeatureCollection') {
        features = data.features;
      } else {
      // Assume TopoJSON
      self.postMessage({ status: "Processing TopoJSON...", progress: 0.4 });
      const topology = data;
        let objects = topology.objects[objectName];
        
        if (!objects) {
          // Fallback to first object if specific name not found
          const firstKey = Object.keys(topology.objects)[0];
          if (firstKey) {
            console.warn('Object "' + objectName + '" not found, falling back to "' + firstKey + '"');
            objects = topology.objects[firstKey];
          } else {
            throw new Error('Object "' + objectName + '" not found and no objects available');
          }
        }

        // Convert to GeoJSON features
        // @ts-ignore - topojson is loaded via importScripts
        const geojson = topojson.feature(topology, objects);
        features = geojson.features;
      }

      // Map custom ID property if specified
      if (idProperty && features) {
        features.forEach(f => {
          if (f.properties && f.properties[idProperty]) {
            f.id = f.properties[idProperty];
          }
        });
      }
      
      self.postMessage({ status: "Complete", progress: 1.0 });
      self.postMessage({ 
        success: true, 
        features: features 
      });
    } catch (error) {
      self.postMessage({ 
        success: false, 
        error: error.message 
      });
    }
  };
`;class at{canvas;ctx;countries=[];loaded=!1;statsMap;featureLabels=[];topologyConfig;currentRenderId=0;onProgress;onTextureUpdate;static cache=new Map;constructor(e,t,i){this.canvas=document.createElement("canvas"),this.canvas.width=Vt,this.canvas.height=jt,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.onProgress=t,this.onTextureUpdate=i,this.topologyConfig={url:e?.url??"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",objectName:e?.objectName||"countries",disableNormalization:e?.disableNormalization||!1,idProperty:e?.idProperty,labelProperty:e?.labelProperty},this.statsMap=new Map,st.forEach(r=>{this.statsMap.set(r.id,r)}),this.loadCountries()}async loadCountries(){const e=`${this.topologyConfig.url}|${this.topologyConfig.objectName}|${this.topologyConfig.idProperty||""}`;if(!this.topologyConfig.url){this.loaded=!0,this.onProgress?.(1);return}if(this.onProgress?.(.1),!at.cache.has(e)){const t=(async()=>{try{let i;i=await this.loadInWorker(this.topologyConfig.url,this.topologyConfig.objectName,this.topologyConfig.idProperty),this.onProgress?.(.4);const r=200,n=i.length;for(let s=0;s<n;s+=r){i.slice(s,s+r).forEach(u=>{u.path=this.createPath(u)});const l=.4+.6*(s+r)/n;this.onProgress?.(Math.min(.99,l)),await new Promise(u=>setTimeout(u,0))}return console.log(`Loaded and processed ${i.length} boundaries from ${this.topologyConfig.objectName}`),i}catch(i){throw console.error("Failed to load map boundaries:",i),i}})();at.cache.set(e,t)}try{this.countries=await at.cache.get(e),this.loaded=!0,this.updateFeatureLabels(),this.onProgress?.(1)}catch(t){at.cache.delete(e),console.error("Error loading cached topology:",t),this.loaded=!0}}loadInWorker(e,t,i){return new Promise((r,n)=>{const s=new Blob([Js],{type:"application/javascript"}),a=URL.createObjectURL(s),l=new Worker(a),u=setTimeout(()=>{l.terminate(),URL.revokeObjectURL(a),n(new Error(`Worker timed out after 15s loading ${t}`))},15e3);l.onmessage=p=>{if(p.data.status){this.onProgress?.(p.data.progress||0,p.data.status);return}clearTimeout(u),URL.revokeObjectURL(a),l.terminate(),p.data.success?r(p.data.features):n(new Error(p.data.error))},l.onerror=p=>{clearTimeout(u),URL.revokeObjectURL(a),l.terminate(),n(new Error("Worker error: "+p.message))};const c=new URL(e,window.location.href).href;l.postMessage({url:c,objectName:t,idProperty:i,topojsonUrl:"https://unpkg.com/topojson-client@3/dist/topojson-client.min.js"})})}async waitForLoad(){const e=Date.now();for(;!this.loaded;){if(Date.now()-e>2e4){console.error("ChoroplethRenderer.waitForLoad timed out after 20s. Forcing continuation."),this.loaded=!0;break}await new Promise(t=>setTimeout(t,100))}}setFeatures(e){e.forEach(t=>{t.path||(t.path=this.createPath(t))}),this.countries=e,this.loaded=!0,this.topologyConfig&&(this.topologyConfig.disableNormalization=!0),this.updateFeatureLabels()}addFeatures(e){e.forEach(t=>{t.path||(t.path=this.createPath(t))}),this.countries=[...this.countries,...e],this.topologyConfig&&(this.topologyConfig.disableNormalization=!0),this.updateFeatureLabels()}updateFeatureLabels(){this.featureLabels=this.countries.map(e=>{const t=this.computeCentroid(e);if(!t)return null;let i="";if(this.topologyConfig?.labelProperty&&(i=e.properties?.[this.topologyConfig.labelProperty]||""),i||(i=e.properties?.name||e.properties?.NAME||e.properties?.Name||e.properties?.label||e.properties?.LABEL||""),!i&&e.properties){const n=Object.keys(e.properties);for(const s of n){const a=s.toLowerCase(),l=e.properties[s];if(typeof l=="string"&&(a.includes("name")||a.includes("label")||a.includes("title"))){i=l;break}}}let r=e.id||e.properties?.id;return this.topologyConfig?.idProperty&&(r=e.properties?.[this.topologyConfig.idProperty]),{id:String(r||""),name:i,lat:t[1],lon:t[0]}}).filter(e=>e!==null&&e.id!==""&&e.name!=="")}getFeatureLabels(){return this.featureLabels}computeCentroid(e){const t=e.geometry;if(!t)return null;let i=[];if(t.type==="Point")return t.coordinates;if(t.type==="Polygon")i=t.coordinates.flat();else if(t.type==="MultiPolygon")i=t.coordinates.flat(2);else return null;if(i.length===0)return null;let r=0,n=0;for(const s of i)r+=s[0],n+=s[1];return[r/i.length,n/i.length]}renderTexture(e){this.currentRenderId++;const t=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,Vt,jt),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const i=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const r=500,n=this.countries.length;let s=0;const a=()=>{if(this.currentRenderId!==t)return;const l=Math.min(s+r,n);for(let u=s;u<l;u++){const c=this.countries[u],h=this.statsMap.get(c.id);let p="#2a2a2a";if(h){const f=e.accessor(h),m=Zs(e,f);p=this.interpolateColor(e.colorScale,m)}this.drawFeature(c,p,i)}s=l,this.onTextureUpdate?.(),s<n&&requestAnimationFrame(a)};return requestAnimationFrame(a),this.canvas}drawFeature(e,t,i){const r=e.path;r&&(this.ctx.fillStyle=t,this.ctx.fill(r),i&&this.ctx.stroke(r))}createPath(e){const t=new Path2D,{geometry:i}=e;if(i.type==="Polygon")this.addPolygonToPath(t,i.coordinates);else if(i.type==="MultiPolygon")i.coordinates.forEach(r=>{this.addPolygonToPath(t,r)});else if(i.type==="Point"){const[r,n]=i.coordinates,[s,a]=this.projectPoint(r,n);t.arc(s,a,4,0,Math.PI*2)}return t}addPolygonToPath(e,t){t.forEach(i=>{let r=null;i.forEach((n,s)=>{const a=n[0],l=n[1],[u,c]=this.projectPoint(a,l),h=r!==null&&Math.abs(a-r)>180;s===0||h?e.moveTo(u,c):e.lineTo(u,c),r=a}),e.closePath()})}projectPoint(e,t){const i=(e+180)/360*Vt,r=(90-t)/180*jt;return[i,r]}interpolateColor(e,t){const i=c=>({r:parseInt(c.slice(1,3),16),g:parseInt(c.slice(3,5),16),b:parseInt(c.slice(5,7),16)}),[r,n,s]=e.map(i);let a,l,u;if(t<.5){const c=t*2;a=Math.round(r.r+(n.r-r.r)*c),l=Math.round(r.g+(n.g-r.g)*c),u=Math.round(r.b+(n.b-r.b)*c)}else{const c=(t-.5)*2;a=Math.round(n.r+(s.r-n.r)*c),l=Math.round(n.g+(s.g-n.g)*c),u=Math.round(n.b+(s.b-n.b)*c)}return`rgb(${a}, ${l}, ${u})`}renderCustomTexture(e,t,i){this.currentRenderId++;const r=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,Vt,jt),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const n=this.topologyConfig?.disableNormalization?e instanceof Map?Object.fromEntries(e):e:ln(e),s=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const a=500,l=this.countries.length;let u=0;const c=()=>{if(this.currentRenderId!==r)return;const h=Math.min(u+a,l);for(let p=u;p<h;p++){const f=this.countries[p],m=n[f.id];let d="#2a2a2a";if(m!==void 0){const g=Math.max(0,Math.min(1,(m-i[0])/(i[1]-i[0])));d=this.interpolateColor(t,g)}this.drawFeature(f,d,s)}u=h,this.onTextureUpdate?.(),u<l&&requestAnimationFrame(c)};return requestAnimationFrame(c),this.canvas}getCanvas(){return this.canvas}getDataURL(){return this.canvas.toDataURL("image/png")}getStatsMap(){return this.statsMap}getFeatureName(e){let t=this.featureLabels.find(r=>r.id===e);if(!t&&e.startsWith("0")){const r=String(parseInt(e,10));t=this.featureLabels.find(n=>n.id===r)}if(t)return t.name;const i=this.countries.find(r=>r.id===e||r.properties?.id===e);if(i)return i.properties.name||i.properties.NAME||i.properties.Name||i.id}getBounds(){if(this.countries.length===0)return null;let e=1/0,t=-1/0,i=1/0,r=-1/0,n=0,s=1/0,a=-1/0,l=1/0,u=-1/0,c=0;const h=y=>{if(typeof y[0]=="number"){const b=y[0],_=y[1];b<0?(b<e&&(e=b),b>t&&(t=b),_<i&&(i=_),_>r&&(r=_),n++):(b<s&&(s=b),b>a&&(a=b),_<l&&(l=_),_>u&&(u=_),c++)}else y.forEach(h)};if(this.countries.forEach(y=>{y.geometry&&h(y.geometry.coordinates)}),n===0&&c===0)return null;if(n===0)return[s,l,a,u];if(c===0)return[e,i,t,r];const p=Math.min(e,s),f=Math.max(t,a);if(f-p>180){if(n>c*2)return[e,i,t,r];if(c>n*2)return[s,l,a,u]}const d=Math.min(i,l),g=Math.max(r,u);return[p,d,f,g]}}const Qs={CN:[35,105],IN:[22,78],US:[39,-98],ID:[-2,118],PK:[30,70],BR:[-10,-55],NG:[9,8],BD:[24,90],RU:[60,100],MX:[23,-102],JP:[36,138],ET:[9,38.5],PH:[12,122],EG:[27,30],VN:[16,108],DE:[51,10],TR:[39,35],IR:[32,53],TH:[15,101],GB:[54,-2],FR:[46,2],IT:[42.5,12.5],ZA:[-29,24],TZ:[-6,35],KE:[0,38],KR:[36,128],CO:[4,-72],ES:[40,-4],AR:[-34,-64],UG:[1,32],DZ:[28,3],UA:[49,32],IQ:[33,44],PL:[52,20],CA:[56,-106],MA:[32,-5],SA:[24,45],PE:[-10,-76],AU:[-25,134],MY:[4,109.5],GH:[8,-1],NP:[28,84],VE:[7,-66],MG:[-19,47],CM:[6,12],NL:[52.5,5.5],CL:[-34,-71],SE:[62,15],NO:[64,10],SG:[1.3,103.8],NZ:[-42,174],IE:[53,-8],IL:[31,35],AE:[24,54],CH:[47,8],AT:[47.5,14.5],PT:[39.5,-8],GR:[39,22],CZ:[49.8,15.5],BE:[50.8,4],HU:[47,20],FI:[64,26],DK:[56,10],IS:[65,-18],CD:[-3,22],SD:[16,30],AO:[-12.5,18.5],MZ:[-18,35],CI:[7.5,-5.5],NE:[17,10],BF:[12,-1.5],ML:[17,-4],SN:[14.5,-14.5],ZM:[-15,28],ZW:[-19,29.5],RW:[-2,30],AF:[33,65],MM:[21,96],KP:[40,127],MN:[46,105],LK:[7.8,80.8],KZ:[48,67],UZ:[41,64],CU:[22,-79.5],EC:[-1.5,-78.5],GT:[15.5,-90.3],BO:[-17,-65],HN:[15,-86.5],PY:[-23,-58],UY:[-33,-56],CR:[10,-84],PA:[9,-80]},ea=new Set(["CN","IN","US","BR","RU","JP","DE","GB","FR","AU","CA","MX","ID","SA","ZA","EG","NG","AR","IT","ES","KR","TR","PL","NL","CH","SE","NO","PK","BD","VN"]),ta=new Set(["CN","IN","US","BR","RU","AU","CA"]),ia=new Set(["RU","CA","US","CN","BR","AU"]),ra=new Set(["IN","AR","KZ","DZ","CD","SA","MX","ID","SD","LY","IR","MN","PE","TD","NE","AO","ML","ZA","CO","ET","BO","MR","EG","TZ","NG","VE","PK","TR","CL","MM"]),na=new Set(["AF","UA","MG","MZ","FR","ES","TH","CM","PG","JP","DE","VN","MY","CI","PL","IT","PH","EC","BF","NZ","GB","GH","RO","LA","GY","OM","BY","KH","SN","UG","NO","SE","FI","MR","ZM","ZW","NP","MA","IQ","BD"]);class sa{labelRenderer;labels=[];labelGroup;currentStyle="none";sphereRadius;currentMorph=0;globe=null;camera=null;dataIds=new Set;constructor(e,t){this.sphereRadius=t,this.labelRenderer=new Wt.CSS2DRenderer;const i=e.clientWidth||800,r=e.clientHeight||600;this.labelRenderer.setSize(i,r),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.left="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.zIndex="5",e.appendChild(this.labelRenderer.domElement),this.labelGroup=new A.Group,this.injectStyles(),this.createLabels()}injectStyles(){const e=document.createElement("style");e.textContent=`
      .country-label {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 1),
          0 0 3px rgba(0, 0, 0, 0.9),
          0 0 5px rgba(0, 0, 0, 0.7);
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        transform: translateX(-50%);
        transition: opacity 0.3s ease;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      /* Size categories - proportional to country size */
      .country-label.size-large {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 1.5px;
        color: rgba(255, 255, 255, 0.95);
      }

      .country-label.size-medium {
        font-size: 7px;
        font-weight: 500;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.9);
      }

      .country-label.size-small {
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.8);
      }

      .country-label.size-tiny {
        font-size: 5px;
        letter-spacing: 0.2px;
        color: rgba(255, 255, 255, 0.7);
      }

      .country-label.hidden {
        opacity: 0 !important;
        visibility: hidden;
      }

      /* Minimal style - bold for the 7 largest */
      .label-style-minimal .country-label.size-large {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #fff;
      }

      /* Major style - balanced visibility */
      .label-style-major .country-label.size-large {
        font-size: 9px;
        font-weight: 600;
      }

      .label-style-major .country-label.size-medium {
        font-size: 7px;
      }

      /* All style - harmonized visibility */
      .label-style-all .country-label {
        color: rgba(255, 255, 255, 0.85);
      }

      .label-style-all .country-label.size-large {
        font-size: 8px;
        color: rgba(255, 255, 255, 0.95);
      }

      .label-style-all .country-label.size-tiny {
        font-size: 4.5px;
        color: rgba(255, 255, 255, 0.8);
      }
    `,document.head.appendChild(e)}getSizeCategory(e){return ia.has(e)?"large":ra.has(e)?"medium":na.has(e)?"small":"tiny"}createLabels(){st.forEach(e=>{const t=Qs[e.code];if(!t)return;const[i,r]=t,n=this.getSizeCategory(e.code),s=document.createElement("div");s.className=`country-label hidden size-${n}`,s.textContent=e.name;const a=new Wt.CSS2DObject(s),l={element:s,object:a,country:e,lat:i,lon:r,sizeCategory:n};this.labelGroup.add(a),this.labels.push(l),this.updateLabelPosition(a,l,this.currentMorph)})}addCustomLabels(e){e.forEach(t=>{const i=f=>String(parseInt(f)||f).toLowerCase(),r=f=>f.toLowerCase().replace(/^the\s+/,"").trim(),n=i(t.id),s=r(t.name);if(this.labels.some(f=>{const m=i(f.country.id),d=r(f.country.name);return m===n||d===s}))return;const l=t.size||"small",u=document.createElement("div");u.className=`country-label hidden size-${l} custom-label`,u.textContent=t.name;const c=new Wt.CSS2DObject(u),h={id:t.id,code:t.id,name:t.name},p={element:u,object:c,country:h,lat:t.lat,lon:t.lon,sizeCategory:l};this.labelGroup.add(c),this.labels.push(p),this.dataIds.add(t.id),this.updateLabelPosition(c,p,this.currentMorph)}),this.setStyle(this.currentStyle)}clearCustomLabels(){this.labels.filter(t=>t.element.classList.contains("custom-label")).forEach(t=>{this.labelGroup.remove(t.object),t.element.remove(),this.dataIds.delete(t.country.code)}),this.labels=this.labels.filter(t=>!t.element.classList.contains("custom-label"))}localPos=new A.Vector3;worldPos=new A.Vector3;cameraDirection=new A.Vector3;labelNormal=new A.Vector3;updateLabelPosition(e,t,i){const{lat:r,lon:n,element:s}=t,a=(n+180)/360,l=(r+90)/180,u=(a-.5)*2*Math.PI,c=(l-.5)*Math.PI,h=this.sphereRadius+.3,p=h*Math.cos(c)*Math.sin(u),f=h*Math.sin(c),m=h*Math.cos(c)*Math.cos(u),d=2*Math.PI*this.sphereRadius,g=Math.PI*this.sphereRadius,y=(a-.5)*d,b=(l-.5)*g,_=.3,E=i*i*(3-2*i);if(this.localPos.set(y+E*(p-y),b+E*(f-b),_+E*(m-_)),this.globe){this.worldPos.copy(this.localPos),this.worldPos.applyMatrix4(this.globe.matrixWorld),e.position.copy(this.worldPos);let v=1;this.camera&&E>.5&&(this.cameraDirection.copy(this.camera.position).normalize(),this.labelNormal.set(p,f,m).normalize(),this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize(),v=this.labelNormal.dot(this.cameraDirection)>.15?1:0);let C=1;if(this.camera){let P=150;switch(E>.5?P=this.camera.position.length():P=Math.abs(this.camera.position.z),t.sizeCategory){case"tiny":C=1-Math.min(1,Math.max(0,(P-120)/30));break;case"small":C=1-Math.min(1,Math.max(0,(P-150)/40));break;case"medium":C=1-Math.min(1,Math.max(0,(P-200)/50));break;case"large":C=1-Math.min(1,Math.max(0,(P-300)/100));break}}const x=v*C;x<.05?s.style.opacity="0":s.style.opacity=String(x)}else{e.position.copy(this.localPos);let v=1;if(this.camera){const C=Math.abs(this.camera.position.z);switch(t.sizeCategory){case"tiny":v=1-Math.min(1,Math.max(0,(C-120)/30));break;case"small":v=1-Math.min(1,Math.max(0,(C-150)/40));break;case"medium":v=1-Math.min(1,Math.max(0,(C-200)/50));break}}s.style.opacity=v<.05?"0":String(v)}}getGroup(){return this.labelGroup}setStyle(e){this.currentStyle=e,this.labels.forEach(t=>{const i=t.country.code;let r=!1;switch(e){case"none":r=!1;break;case"minimal":r=ta.has(i);break;case"major":r=ea.has(i);break;case"all":case"capitals":r=!0;break;case"all-countries":r=!0;break;case"data":r=this.dataIds.has(i);break}e==="all-countries"&&t.element.classList.contains("custom-label")&&(r=!1),t.element.classList.toggle("hidden",!r)}),this.labelRenderer.domElement.className=`label-style-${e}`}setMorph(e){this.currentMorph=e}setGlobe(e){this.globe=e}setCamera(e){this.camera=e}setDataIds(e){this.dataIds=new Set(e),this.currentStyle==="data"&&this.setStyle("data")}update(){this.currentStyle!=="none"&&this.labels.forEach(e=>{this.updateLabelPosition(e.object,e,this.currentMorph)})}render(e,t){this.currentStyle!=="none"&&this.labelRenderer.render(e,t)}resize(e,t){this.labelRenderer.setSize(e,t)}getStyle(){return this.currentStyle}getVisibleLabelsForCanvas(e,t,i){if(this.currentStyle==="none")return[];const r=[],n=new A.Vector3;return this.labels.forEach(s=>{const a=s.element.style.opacity,l=a===""?1:parseFloat(a)||0;if(l<.1||s.element.classList.contains("hidden"))return;s.object.getWorldPosition(n),n.project(e);const u=(n.x*.5+.5)*t,c=(-n.y*.5+.5)*i;u>=0&&u<=t&&c>=0&&c<=i&&n.z<1&&r.push({text:s.country.name,x:u,y:c,opacity:l})}),r}dispose(){this.labels.forEach(e=>{this.labelGroup.remove(e.object),e.element.remove()}),this.labels=[],this.labelRenderer.domElement.remove()}}let cn=!1;function aa(){if(cn)return;cn=!0;const o=document.createElement("style");o.setAttribute("data-gralobe-datagrid","true"),o.textContent=`
    .gralobe-datagrid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 5, 10, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .gralobe-datagrid-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .gralobe-datagrid-modal {
      width: 90%;
      height: 80%;
      max-width: 600px;
      background: #0d1117;
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      transform: scale(0.95) translateY(10px);
      transition: transform 0.3s ease;
    }

    .gralobe-datagrid-overlay.visible .gralobe-datagrid-modal {
      transform: scale(1) translateY(0);
    }

    .gralobe-datagrid-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(100, 150, 200, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .gralobe-datagrid-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #4af;
      font-family: inherit;
    }

    .gralobe-datagrid-close {
      background: none;
      border: none;
      color: #666;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: color 0.2s ease;
    }

    .gralobe-datagrid-close:hover {
      color: #fff;
    }

    .gralobe-datagrid-body {
      flex: 1;
      overflow-y: auto;
      padding: 0;
    }

    .gralobe-datagrid-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      color: #ccc;
      font-family: inherit;
    }

    .gralobe-datagrid-table th {
      position: sticky;
      top: 0;
      background: #161b22;
      text-align: left;
      padding: 12px 20px;
      font-weight: 600;
      color: #888;
      border-bottom: 1px solid rgba(100, 150, 200, 0.15);
      z-index: 1;
    }

    .gralobe-datagrid-table td {
      padding: 10px 20px;
      border-bottom: 1px solid rgba(100, 150, 200, 0.05);
    }

    .gralobe-datagrid-table tr:hover {
      background: rgba(100, 150, 200, 0.05);
    }

    .gralobe-datagrid-val {
      text-align: right;
      font-family: monospace;
      color: #fff;
    }

    .gralobe-datagrid-name {
      font-weight: 500;
    }
  `,document.head.appendChild(o)}class oa{element;parentContainer;visible=!1;constructor(e){aa(),this.parentContainer=e,this.element=document.createElement("div"),this.element.className="gralobe-datagrid-overlay",this.element.innerHTML=`
      <div class="gralobe-datagrid-modal">
        <div class="gralobe-datagrid-header">
          <h3 class="gralobe-datagrid-title">Data Explorer</h3>
          <button class="gralobe-datagrid-close">&times;</button>
        </div>
        <div class="gralobe-datagrid-body">
          <table class="gralobe-datagrid-table">
            <thead>
              <tr>
                <th>Location</th>
                <th style="text-align: right">Value</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `,this.element.querySelector(".gralobe-datagrid-close")?.addEventListener("click",()=>this.hide()),this.element.addEventListener("click",i=>{i.target===this.element&&this.hide()}),e.appendChild(this.element)}show(e,t){const i=this.element.querySelector(".gralobe-datagrid-title");i&&(i.textContent=`Data: ${e}`);const r=this.element.querySelector("tbody");if(r){const n=Object.entries(t).sort((s,a)=>a[1]-s[1]);r.innerHTML=n.map(([s,a])=>`
          <tr>
            <td class="gralobe-datagrid-name">${s}</td>
            <td class="gralobe-datagrid-val">${a.toLocaleString()}</td>
          </tr>
        `).join("")}this.element.classList.add("visible"),this.visible=!0}hide(){this.element.classList.remove("visible"),this.visible=!1}dispose(){this.element.remove()}}var la={trailer:59};function un(o=256){let e=0,t=new Uint8Array(o);return{get buffer(){return t.buffer},reset(){e=0},bytesView(){return t.subarray(0,e)},bytes(){return t.slice(0,e)},writeByte(r){i(e+1),t[e]=r,e++},writeBytes(r,n=0,s=r.length){i(e+s);for(let a=0;a<s;a++)t[e++]=r[a+n]},writeBytesView(r,n=0,s=r.byteLength){i(e+s),t.set(r.subarray(n,n+s),e),e+=s}};function i(r){var n=t.length;if(n>=r)return;var s=1024*1024;r=Math.max(r,n*(n<s?2:1.125)>>>0),n!=0&&(r=Math.max(r,256));let a=t;t=new Uint8Array(r),e>0&&t.set(a.subarray(0,e),0)}}var Ni=12,hn=5003,ca=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function ua(o,e,t,i,r=un(512),n=new Uint8Array(256),s=new Int32Array(hn),a=new Int32Array(hn)){let l=s.length,u=Math.max(2,i);n.fill(0),a.fill(0),s.fill(-1);let c=0,h=0,p=u+1,f=p,m=!1,d=f,g=(1<<d)-1,y=1<<p-1,b=y+1,_=y+2,E=0,v=t[0],C=0;for(let w=l;w<65536;w*=2)++C;C=8-C,r.writeByte(u),P(y);let x=t.length;for(let w=1;w<x;w++)e:{let S=t[w],M=(S<<Ni)+v,T=S<<C^v;if(s[T]===M){v=a[T];break e}let L=T===0?1:l-T;for(;s[T]>=0;)if(T-=L,T<0&&(T+=l),s[T]===M){v=a[T];break e}P(v),v=S,_<1<<Ni?(a[T]=_++,s[T]=M):(s.fill(-1),_=y+2,m=!0,P(y))}return P(v),P(b),r.writeByte(0),r.bytesView();function P(w){for(c&=ca[h],h>0?c|=w<<h:c=w,h+=d;h>=8;)n[E++]=c&255,E>=254&&(r.writeByte(E),r.writeBytesView(n,0,E),E=0),c>>=8,h-=8;if((_>g||m)&&(m?(d=f,g=(1<<d)-1,m=!1):(++d,g=d===Ni?1<<d:(1<<d)-1)),w==b){for(;h>0;)n[E++]=c&255,E>=254&&(r.writeByte(E),r.writeBytesView(n,0,E),E=0),c>>=8,h-=8;E>0&&(r.writeByte(E),r.writeBytesView(n,0,E),E=0)}}}var ha=ua;function dn(o,e,t){return o<<8&63488|e<<2&992|t>>3}function pn(o,e,t,i){return o>>4|e&240|(t&240)<<4|(i&240)<<8}function fn(o,e,t){return o>>4<<8|e&240|t>>4}function Ht(o,e,t){return o<e?e:o>t?t:o}function Yt(o){return o*o}function mn(o,e,t){var i=0,r=1e100;let n=o[e],s=n.cnt;n.ac;let a=n.rc,l=n.gc,u=n.bc;for(var c=n.fw;c!=0;c=o[c].fw){let p=o[c],f=p.cnt,m=s*f/(s+f);if(!(m>=r)){var h=0;h+=m*Yt(p.rc-a),!(h>=r)&&(h+=m*Yt(p.gc-l),!(h>=r)&&(h+=m*Yt(p.bc-u),!(h>=r)&&(r=h,i=c)))}}n.err=r,n.nn=i}function Bi(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function da(o,e){let t=e==="rgb444"?4096:65536,i=new Array(t),r=o.length;if(e==="rgba4444")for(let n=0;n<r;++n){let s=o[n],a=s>>24&255,l=s>>16&255,u=s>>8&255,c=s&255,h=pn(c,u,l,a),p=h in i?i[h]:i[h]=Bi();p.rc+=c,p.gc+=u,p.bc+=l,p.ac+=a,p.cnt++}else if(e==="rgb444")for(let n=0;n<r;++n){let s=o[n],a=s>>16&255,l=s>>8&255,u=s&255,c=fn(u,l,a),h=c in i?i[c]:i[c]=Bi();h.rc+=u,h.gc+=l,h.bc+=a,h.cnt++}else for(let n=0;n<r;++n){let s=o[n],a=s>>16&255,l=s>>8&255,u=s&255,c=dn(u,l,a),h=c in i?i[c]:i[c]=Bi();h.rc+=u,h.gc+=l,h.bc+=a,h.cnt++}return i}function pa(o,e,t={}){let{format:i="rgb565",clearAlpha:r=!0,clearAlphaColor:n=0,clearAlphaThreshold:s=0,oneBitAlpha:a=!1}=t;if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let l=new Uint32Array(o.buffer),u=t.useSqrt!==!1,c=i==="rgba4444",h=da(l,i),p=h.length,f=p-1,m=new Uint32Array(p+1);for(var d=0,g=0;g<p;++g){let I=h[g];if(I!=null){var y=1/I.cnt;c&&(I.ac*=y),I.rc*=y,I.gc*=y,I.bc*=y,h[d++]=I}}Yt(e)/d<.022&&(u=!1);for(var g=0;g<d-1;++g)h[g].fw=g+1,h[g+1].bk=g,u&&(h[g].cnt=Math.sqrt(h[g].cnt));u&&(h[g].cnt=Math.sqrt(h[g].cnt));var b,_,E;for(g=0;g<d;++g){mn(h,g);var v=h[g].err;for(_=++m[0];_>1&&(E=_>>1,!(h[b=m[E]].err<=v));_=E)m[_]=b;m[_]=g}var C=d-e;for(g=0;g<C;){for(var x;;){var P=m[1];if(x=h[P],x.tm>=x.mtm&&h[x.nn].mtm<=x.tm)break;x.mtm==f?P=m[1]=m[m[0]--]:(mn(h,P),x.tm=g);var v=h[P].err;for(_=1;(E=_+_)<=m[0]&&(E<m[0]&&h[m[E]].err>h[m[E+1]].err&&E++,!(v<=h[b=m[E]].err));_=E)m[_]=b;m[_]=P}var w=h[x.nn],S=x.cnt,M=w.cnt,y=1/(S+M);c&&(x.ac=y*(S*x.ac+M*w.ac)),x.rc=y*(S*x.rc+M*w.rc),x.gc=y*(S*x.gc+M*w.gc),x.bc=y*(S*x.bc+M*w.bc),x.cnt+=w.cnt,x.mtm=++g,h[w.bk].fw=w.fw,h[w.fw].bk=w.bk,w.mtm=f}let T=[];var L=0;for(g=0;;++L){let I=Ht(Math.round(h[g].rc),0,255),$=Ht(Math.round(h[g].gc),0,255),U=Ht(Math.round(h[g].bc),0,255),O=255;c&&(O=Ht(Math.round(h[g].ac),0,255),a&&(O=O<=(typeof a=="number"?a:127)?0:255),r&&O<=s&&(I=$=U=n,O=0));let ne=c?[I,$,U,O]:[I,$,U];if(fa(T,ne)||T.push(ne),(g=h[g].fw)==0)break}return T}function fa(o,e){for(let t=0;t<o.length;t++){let i=o[t],r=i[0]===e[0]&&i[1]===e[1]&&i[2]===e[2],n=i.length>=4&&e.length>=4?i[3]===e[3]:!0;if(r&&n)return!0}return!1}function ma(o,e,t="rgb565"){if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let i=new Uint32Array(o.buffer),r=i.length,n=t==="rgb444"?4096:65536,s=new Uint8Array(r),a=new Array(n);if(t==="rgba4444")for(let l=0;l<r;l++){let u=i[l],c=u>>24&255,h=u>>16&255,p=u>>8&255,f=u&255,m=pn(f,p,h,c),d=m in a?a[m]:a[m]=ga(f,p,h,c,e);s[l]=d}else{let l=t==="rgb444"?fn:dn;for(let u=0;u<r;u++){let c=i[u],h=c>>16&255,p=c>>8&255,f=c&255,m=l(f,p,h),d=m in a?a[m]:a[m]=ya(f,p,h,e);s[u]=d}}return s}function ga(o,e,t,i,r){let n=0,s=1e100;for(let a=0;a<r.length;a++){let l=r[a],u=l[3],c=je(u-i);if(c>s)continue;let h=l[0];if(c+=je(h-o),c>s)continue;let p=l[1];if(c+=je(p-e),c>s)continue;let f=l[2];c+=je(f-t),!(c>s)&&(s=c,n=a)}return n}function ya(o,e,t,i){let r=0,n=1e100;for(let s=0;s<i.length;s++){let a=i[s],l=a[0],u=je(l-o);if(u>n)continue;let c=a[1];if(u+=je(c-e),u>n)continue;let h=a[2];u+=je(h-t),!(u>n)&&(n=u,r=s)}return r}function je(o){return o*o}function ba(o={}){let{initialCapacity:e=4096,auto:t=!0}=o,i=un(e),r=5003,n=new Uint8Array(256),s=new Int32Array(r),a=new Int32Array(r),l=!1;return{reset(){i.reset(),l=!1},finish(){i.writeByte(la.trailer)},bytes(){return i.bytes()},bytesView(){return i.bytesView()},get buffer(){return i.buffer},get stream(){return i},writeHeader:u,writeFrame(c,h,p,f={}){let{transparent:m=!1,transparentIndex:d=0,delay:g=0,palette:y=null,repeat:b=0,colorDepth:_=8,dispose:E=-1}=f,v=!1;if(t?l||(v=!0,u(),l=!0):v=!!f.first,h=Math.max(0,Math.floor(h)),p=Math.max(0,Math.floor(p)),v){if(!y)throw new Error("First frame must include a { palette } option");_a(i,h,p,y,_),gn(i,y),b>=0&&va(i,b)}let C=Math.round(g/10);xa(i,E,C,m,d);let x=!!y&&!v;Ea(i,h,p,x?y:null),x&&gn(i,y),wa(i,c,h,p,_,n,s,a)}};function u(){yn(i,"GIF89a")}}function xa(o,e,t,i,r){o.writeByte(33),o.writeByte(249),o.writeByte(4),r<0&&(r=0,i=!1);var n,s;i?(n=1,s=2):(n=0,s=0),e>=0&&(s=e&7),s<<=2,o.writeByte(0|s|0|n),Re(o,t),o.writeByte(r||0),o.writeByte(0)}function _a(o,e,t,i,r=8){let n=1,s=0,a=$i(i.length)-1,l=n<<7|r-1<<4|s<<3|a;Re(o,e),Re(o,t),o.writeBytes([l,0,0])}function va(o,e){o.writeByte(33),o.writeByte(255),o.writeByte(11),yn(o,"NETSCAPE2.0"),o.writeByte(3),o.writeByte(1),Re(o,e),o.writeByte(0)}function gn(o,e){let t=1<<$i(e.length);for(let i=0;i<t;i++){let r=[0,0,0];i<e.length&&(r=e[i]),o.writeByte(r[0]),o.writeByte(r[1]),o.writeByte(r[2])}}function Ea(o,e,t,i){if(o.writeByte(44),Re(o,0),Re(o,0),Re(o,e),Re(o,t),i){let r=0,n=0,s=$i(i.length)-1;o.writeByte(128|r|n|0|s)}else o.writeByte(0)}function wa(o,e,t,i,r=8,n,s,a){ha(t,i,e,r,o,n,s,a)}function Re(o,e){o.writeByte(e&255),o.writeByte(e>>8&255)}function yn(o,e){for(var t=0;t<e.length;t++)o.writeByte(e.charCodeAt(t))}function $i(o){return Math.max(Math.ceil(Math.log2(o)),1)}class Ca{renderer;scene;camera;isRecording=!1;frames=[];mediaRecorder=null;recordedChunks=[];captureCanvas;captureCtx;compositeCanvas;compositeCtx;gifWidth=480;gifHeight=270;legendElement=null;countryLabels=null;constructor(e,t,i){this.renderer=e,this.scene=t,this.camera=i,this.captureCanvas=document.createElement("canvas"),this.captureCtx=this.captureCanvas.getContext("2d",{willReadFrequently:!0}),this.compositeCanvas=document.createElement("canvas"),this.compositeCtx=this.compositeCanvas.getContext("2d")}setLegendElement(e){this.legendElement=e}setCountryLabels(e){this.countryLabels=e}drawCountryLabelsOnCanvas(e,t,i,r){if(this.countryLabels)try{this.countryLabels.getVisibleLabelsForCanvas(r||this.camera,t,i).forEach(s=>{e.save(),e.globalAlpha=s.opacity,e.font="bold 12px Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.strokeStyle="rgba(0, 0, 0, 0.8)",e.lineWidth=3,e.strokeText(s.text,s.x,s.y),e.fillStyle="#ffffff",e.fillText(s.text,s.x,s.y),e.restore()})}catch(n){console.warn("Failed to draw country labels:",n)}}drawOverlaysOnCanvas(e,t,i,r){this.drawCountryLabelsOnCanvas(e,t,i,r),this.drawLegendOnCanvas(e,t,i)}drawLegendOnCanvas(e,t,i){try{if(!this.legendElement||!this.legendElement.classList.contains("visible"))return;const r=this.legendElement,n=r.querySelector(".gralobe-legend-title")||r.querySelector(".legend-title"),s=r.querySelector(".gralobe-legend-gradient")||r.querySelector(".legend-gradient"),a=r.querySelector(".gralobe-legend-min")||r.querySelector(".legend-min"),l=r.querySelector(".gralobe-legend-max")||r.querySelector(".legend-max"),u=r.querySelector(".gralobe-legend-description")||r.querySelector(".legend-description");if(!n||!s)return;const c=280,h=100,p=20,f=t-c-p,m=i-h-p,d=12;e.fillStyle="rgba(0, 10, 20, 0.9)",e.strokeStyle="rgba(100, 170, 255, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect?e.roundRect(f,m,c,h,d):e.rect(f,m,c,h),e.fill(),e.stroke(),e.fillStyle="#44aaff",e.font="bold 18px Arial, sans-serif",e.fillText(n.textContent||"",f+16,m+28);const g=f+16,y=m+40,b=c-32,_=20,E=s.style.background||"";let v=[];const C=E.match(/rgba?\([^)]+\)/g);if(C&&C.length>=2)v=C;else{const x=E.match(/#[0-9a-fA-F]{3,8}/g);x&&x.length>=2&&(v=x)}if(v.length>=2){const x=e.createLinearGradient(g,0,g+b,0);x.addColorStop(0,v[0]),v.length>=3?(x.addColorStop(.5,v[1]),x.addColorStop(1,v[2])):x.addColorStop(1,v[1]),e.fillStyle=x,e.beginPath(),e.roundRect?e.roundRect(g,y,b,_,4):e.rect(g,y,b,_),e.fill()}else{const x=e.createLinearGradient(g,0,g+b,0);x.addColorStop(0,"#cc6600"),x.addColorStop(.5,"#ffaa44"),x.addColorStop(1,"#ffeecc"),e.fillStyle=x,e.beginPath(),e.roundRect?e.roundRect(g,y,b,_,4):e.rect(g,y,b,_),e.fill(),console.log("Legend gradient style:",E)}if(e.fillStyle="#cccccc",e.font="14px Arial, sans-serif",a&&e.fillText(a.textContent||"",g,m+78),l){const x=l.textContent||"",P=e.measureText(x).width;e.fillText(x,g+b-P,m+78)}u&&u.textContent&&(e.fillStyle="#888888",e.font="italic 12px Arial, sans-serif",e.fillText(u.textContent,g,m+95))}catch(r){console.warn("Failed to draw legend on canvas:",r)}}screenshot(e={}){const{width:t=1920,height:i=1080,filename:r}=e,n=new A.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0});n.setSize(t,i),n.setPixelRatio(1);const s=this.camera.clone();s.aspect=t/i,s.updateProjectionMatrix(),n.render(this.scene,s),this.compositeCanvas.width=t,this.compositeCanvas.height=i,this.compositeCtx.drawImage(n.domElement,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,t,i,s);const a=this.compositeCanvas.toDataURL("image/png");n.dispose();const l=r?`${r}.png`:`globe-${Date.now()}.png`;this.downloadFile(a,l)}startVideoRecording(e={}){return new Promise(t=>{if(this.isRecording){t();return}const i=this.renderer.domElement;this.compositeCanvas.width=i.width,this.compositeCanvas.height=i.height,this.compositeCtx.drawImage(i,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,this.compositeCanvas.width,this.compositeCanvas.height);const r=this.compositeCanvas.captureStream(60),n=[{mime:"video/mp4;codecs=avc1",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=h264",ext:"webm"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];let s="video/webm",a="webm";for(const{mime:u,ext:c}of n)if(MediaRecorder.isTypeSupported(u)){s=u,a=c,console.log(`Video recording using: ${u}`);break}this.mediaRecorder=new MediaRecorder(r,{mimeType:s,videoBitsPerSecond:8e6}),this.recordedChunks=[];const l=a;this.mediaRecorder.ondataavailable=u=>{u.data.size>0&&this.recordedChunks.push(u.data)},this.mediaRecorder.onstop=()=>{const u=s.split(";")[0],c=new Blob(this.recordedChunks,{type:u}),h=URL.createObjectURL(c);this.downloadFile(h,`globe-${Date.now()}.${l}`),URL.revokeObjectURL(h)},this.mediaRecorder.onstart=()=>{this.isRecording=!0,setTimeout(()=>t(),50)},this.mediaRecorder.start(100)})}updateVideoFrame(){if(!this.isRecording||!this.mediaRecorder)return;const e=this.compositeCanvas.width,t=this.compositeCanvas.height;this.compositeCtx.drawImage(this.renderer.domElement,0,0,e,t),this.drawOverlaysOnCanvas(this.compositeCtx,e,t)}stopVideoRecording(){!this.isRecording||!this.mediaRecorder||(this.mediaRecorder.stop(),this.isRecording=!1)}startGifCapture(e={}){if(this.isRecording)return;this.frames=[],this.isRecording=!0;const{width:t=480,height:i=270}=e;this.gifWidth=t,this.gifHeight=i,this.captureCanvas.width=t,this.captureCanvas.height=i}captureGifFrame(){if(!this.isRecording)return;const e=this.renderer.domElement,t=this.gifWidth,i=this.gifHeight;this.captureCtx.drawImage(e,0,0,t,i),this.drawOverlaysOnCanvas(this.captureCtx,t,i);const r=this.captureCtx.getImageData(0,0,t,i);this.frames.push({data:new Uint8ClampedArray(r.data),width:t,height:i})}async stopGifCapture(e={}){if(!this.isRecording)return;if(this.isRecording=!1,this.frames.length===0){console.warn("No frames captured for GIF");return}const{fps:t=20,filename:i}=e,r=Math.round(1e3/t);console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);try{const n=this.frames[0],s=n.width,a=n.height,l=pa(n.data,256),u=ba();for(let m=0;m<this.frames.length;m++){const d=this.frames[m],g=ma(d.data,l);u.writeFrame(g,s,a,{palette:m===0?l:void 0,delay:r,repeat:m===0?0:void 0}),m%10===0&&await new Promise(y=>setTimeout(y,0))}u.finish();const c=u.bytes(),h=new Blob([c],{type:"image/gif"}),p=URL.createObjectURL(h),f=i||`globe-${Date.now()}.gif`;this.downloadFile(p,f),setTimeout(()=>URL.revokeObjectURL(p),1e3),console.log(`GIF saved: ${f} (${this.frames.length} frames, ${(h.size/1024).toFixed(1)}KB)`)}catch(n){console.error("Failed to generate GIF:",n)}this.frames=[]}getIsRecording(){return this.isRecording}getFrameCount(){return this.frames.length}downloadFile(e,t){const i=document.createElement("a");i.href=e,i.download=t,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}const bn={"%":o=>`${o.toFixed(1)}%`,$:o=>`$${o.toLocaleString()}`,years:o=>`${o.toFixed(1)} yrs`,"% GDP":o=>`${o.toFixed(1)}%`,"% of GDP":o=>`${o.toFixed(1)}%`,index:o=>o.toFixed(3),"":o=>o.toFixed(3)},Pa=["per capita","per 100","per 1000"];function Gi(o){return bn[o]?bn[o]:Pa.some(e=>o.includes(e))?e=>`${e.toFixed(1)}`:e=>{const t=Number.isInteger(e)?e.toLocaleString():e.toFixed(1);return o?`${t} ${o}`:t}}function Aa(o,e,t){return(t??Gi(e))(o)}let xn=!1;function Sa(){if(xn)return;xn=!0;const o=document.createElement("style");o.setAttribute("data-gralobe-legend","true"),o.textContent=`
    .gralobe-legend {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 10, 20, 0.92);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 6px;
      padding: 8px 12px;
      font-family: system-ui, -apple-system, sans-serif;
      color: #ddd;
      opacity: 0;
      transform: translateY(8px) scale(0.95);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      z-index: 10;
      transform-origin: bottom left;
    }

    .gralobe-legend.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Size variants based on container size */
    .gralobe-legend.size-lg {
      padding: 10px 14px;
      min-width: 180px;
      max-width: 280px;
      border-radius: 8px;
      bottom: 15px;
      left: 15px;
    }
    .gralobe-legend.size-lg .gralobe-legend-title { font-size: 13px; margin-bottom: 6px; }
    .gralobe-legend.size-lg .gralobe-legend-gradient { height: 10px; margin-bottom: 4px; }
    .gralobe-legend.size-lg .gralobe-legend-labels { font-size: 10px; margin-bottom: 6px; }
    .gralobe-legend.size-lg .gralobe-legend-description { font-size: 10px; }
    .gralobe-legend.size-lg .gralobe-legend-hint { font-size: 9px; margin-bottom: 6px; padding-bottom: 5px; }

    .gralobe-legend.size-md {
      padding: 7px 10px;
      min-width: 140px;
      max-width: 220px;
      bottom: 10px;
      left: 10px;
    }
    .gralobe-legend.size-md .gralobe-legend-title { font-size: 11px; margin-bottom: 4px; }
    .gralobe-legend.size-md .gralobe-legend-gradient { height: 8px; margin-bottom: 3px; }
    .gralobe-legend.size-md .gralobe-legend-labels { font-size: 9px; margin-bottom: 4px; }
    .gralobe-legend.size-md .gralobe-legend-description { font-size: 9px; }
    .gralobe-legend.size-md .gralobe-legend-hint { font-size: 8px; margin-bottom: 4px; padding-bottom: 4px; }

    .gralobe-legend.size-sm {
      padding: 5px 8px;
      min-width: 100px;
      max-width: 160px;
      border-radius: 4px;
      bottom: 6px;
      left: 6px;
    }
    .gralobe-legend.size-sm .gralobe-legend-title { font-size: 10px; margin-bottom: 3px; }
    .gralobe-legend.size-sm .gralobe-legend-gradient { height: 6px; margin-bottom: 2px; border-radius: 2px; }
    .gralobe-legend.size-sm .gralobe-legend-labels { font-size: 8px; margin-bottom: 0; }
    .gralobe-legend.size-sm .gralobe-legend-description { display: none; }
    .gralobe-legend.size-sm .gralobe-legend-hint { display: none; }

    .gralobe-legend.size-xs {
      padding: 3px 5px;
      min-width: 60px;
      max-width: 100px;
      border-radius: 3px;
      bottom: 4px;
      left: 4px;
    }
    .gralobe-legend.size-xs .gralobe-legend-title { font-size: 7px; margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .gralobe-legend.size-xs .gralobe-legend-gradient { height: 3px; margin-bottom: 1px; border-radius: 1px; }
    .gralobe-legend.size-xs .gralobe-legend-labels { font-size: 6px; margin-bottom: 0; }
    .gralobe-legend.size-xs .gralobe-legend-description { display: none; }
    .gralobe-legend.size-xs .gralobe-legend-hint { display: none; }

    /* Mobile-specific: even smaller for very small screens */
    @media (max-width: 480px) {
      .gralobe-legend.size-sm {
        padding: 4px 6px;
        min-width: 80px;
        max-width: 130px;
      }
      .gralobe-legend.size-sm .gralobe-legend-title { font-size: 8px; }
      .gralobe-legend.size-sm .gralobe-legend-gradient { height: 5px; }
      .gralobe-legend.size-sm .gralobe-legend-labels { font-size: 7px; }
      .gralobe-legend.size-sm .gralobe-legend-description { display: none; }
      .gralobe-legend.size-sm .gralobe-legend-hint { display: none; }
      
      .gralobe-legend.size-md {
        padding: 5px 8px;
        min-width: 100px;
        max-width: 160px;
      }
      .gralobe-legend.size-md .gralobe-legend-title { font-size: 9px; }
      .gralobe-legend.size-md .gralobe-legend-gradient { height: 6px; }
      .gralobe-legend.size-md .gralobe-legend-labels { font-size: 8px; }
      .gralobe-legend.size-md .gralobe-legend-description { display: none; }
      .gralobe-legend.size-md .gralobe-legend-hint { display: none; }
    }

    .gralobe-legend-title {
      font-weight: 600;
      color: #4af;
      line-height: 1.3;
    }

    .gralobe-legend-gradient {
      border-radius: 3px;
    }

    .gralobe-legend-labels {
      display: flex;
      justify-content: space-between;
      color: #aaa;
    }

    .gralobe-legend-description {
      color: #666;
      font-style: italic;
      line-height: 1.3;
    }

    .gralobe-legend-hint {
      color: #444;
      border-bottom: 1px solid rgba(100, 150, 200, 0.15);
    }
  `,document.head.appendChild(o)}class Ta{element;parentContainer;visible=!1;resizeObserver=null;constructor(e){Sa(),this.parentContainer=e,getComputedStyle(e).position==="static"&&(e.style.position="relative"),this.element=document.createElement("div"),this.element.className="gralobe-legend",this.element.setAttribute("data-testid","globe-legend"),this.element.innerHTML=`
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `,e.appendChild(this.element),this.updateSize(),this.resizeObserver=new ResizeObserver(()=>this.updateSize()),this.resizeObserver.observe(e)}getSizeClass(e,t){const i=Math.min(e,t);return i<200?"xs":i<300?"sm":i<450?"md":"lg"}updateSize(){const e=this.parentContainer.clientWidth,t=this.parentContainer.clientHeight,i=this.getSizeClass(e,t);this.element.classList.remove("size-xs","size-sm","size-md","size-lg"),this.element.classList.add(`size-${i}`)}show(e){const t=this.element.querySelector(".gralobe-legend-title"),i=this.element.querySelector(".gralobe-legend-gradient"),r=this.element.querySelector(".gralobe-legend-min"),n=this.element.querySelector(".gralobe-legend-max"),s=this.element.querySelector(".gralobe-legend-description");t.textContent=e.name,s.textContent=e.description;const[a,l,u]=e.colorScale;i.style.background=`linear-gradient(to right, ${a}, ${l}, ${u})`;const c=e.format??Gi(e.unit);r.textContent=c(e.domain[0]),n.textContent=c(e.domain[1]),this.element.classList.add("visible"),this.visible=!0}hide(){this.element.classList.remove("visible"),this.visible=!1}isVisible(){return this.visible}getElement(){return this.element}dispose(){this.resizeObserver?.disconnect(),this.element.remove()}}const J=50,Ma=`
uniform float uMorph;
uniform float uTime;
uniform float uParchment;
uniform float uExtremeParchment;
uniform sampler2D uDataTexture;
uniform float uExtrudeHeight;
uniform float uDataOverlay;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

const float PI = 3.14159265359;
const float RADIUS = ${J.toFixed(1)};

// Hash functions for procedural variation
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// Smooth noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// 3D noise for seamless spherical sampling
float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n000 = hash3(i);
    float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
    
    float nx00 = mix(n000, n100, f.x);
    float nx10 = mix(n010, n110, f.x);
    float nx01 = mix(n001, n101, f.x);
    float nx11 = mix(n011, n111, f.x);
    
    float nxy0 = mix(nx00, nx10, f.y);
    float nxy1 = mix(nx01, nx11, f.y);
    
    return mix(nxy0, nxy1, f.z);
}

// FBM using 3D noise for seamless spherical clouds
float fbm3D(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise3D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Fractal Brownian Motion for natural-looking tears
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vUv = uv;
    vTornEdge = 0.0;
    vCornerCurl = 0.0;
    vCrease = 0.0;
    vTornCorner = 0.0;
    vDiscard = 0.0;
    vExtrudeAmount = 0.0;

    // Sample data texture to get statistic value for height extrusion
    vec4 dataColor = texture2D(uDataTexture, uv);
    float dataLuminance = dot(dataColor.rgb, vec3(0.299, 0.587, 0.114));
    float hasData = step(0.15, dataLuminance) * uDataOverlay;
    float extrudeValue = dataLuminance * hasData * uExtrudeHeight;
    vExtrudeAmount = extrudeValue;

    // Longitude and latitude from UV
    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    // Spherical position with height extrusion
    float extrudedRadius = RADIUS + extrudeValue * 15.0;
    vec3 spherePos = vec3(
        extrudedRadius * cos(lat) * sin(lon),
        extrudedRadius * sin(lat),
        extrudedRadius * cos(lat) * cos(lon)
    );

    // Flat position (Mercator-like) with height extrusion
    float flatWidth = 2.0 * PI * RADIUS;
    float flatHeight = PI * RADIUS;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        extrudeValue * 20.0
    );

    // Parchment curl effect - only when completely flat
    if (uMorph < 0.01 && uParchment > 0.01) {
        float edgeL = uv.x;
        float edgeR = 1.0 - uv.x;
        float edgeB = uv.y;
        float edgeT = 1.0 - uv.y;
        float minEdge = min(min(edgeL, edgeR), min(edgeB, edgeT));

        float boundaryFade = smoothstep(0.0, 0.02, edgeL) * smoothstep(0.0, 0.02, edgeR)
                           * smoothstep(0.0, 0.02, edgeB) * smoothstep(0.0, 0.02, edgeT);

        // Torn edges
        float tearNoiseL = fbm(vec2(uv.y * 15.0, 1.0)) * 0.03;
        float tearNoiseR = fbm(vec2(uv.y * 12.0, 2.0)) * 0.035;
        float tearNoiseB = fbm(vec2(uv.x * 14.0, 3.0)) * 0.025;
        float tearNoiseT = fbm(vec2(uv.x * 11.0, 4.0)) * 0.04;

        float tornL = smoothstep(tearNoiseL + 0.02, tearNoiseL, edgeL);
        float tornR = smoothstep(tearNoiseR + 0.025, tearNoiseR, edgeR);
        float tornB = smoothstep(tearNoiseB + 0.015, tearNoiseB, edgeB);
        float tornT = smoothstep(tearNoiseT + 0.03, tearNoiseT, edgeT);
        vTornEdge = max(max(tornL, tornR), max(tornB, tornT)) * uParchment;

        // Corner curls
        vec2 cornerBL = vec2(edgeL, edgeB);
        vec2 cornerBR = vec2(edgeR, edgeB);
        vec2 cornerTL = vec2(edgeL, edgeT);
        vec2 cornerTR = vec2(edgeR, edgeT);

        float distBL = length(cornerBL);
        float distBR = length(cornerBR);
        float distTL = length(cornerTL);
        float distTR = length(cornerTR);

        float curlBL = pow(1.0 - smoothstep(0.0, 0.22, distBL), 3.0) * 1.4;
        curlBL *= (0.8 + 0.4 * noise(cornerBL * 10.0));
        float curlBR = pow(1.0 - smoothstep(0.0, 0.28, distBR), 2.5) * 1.6;
        curlBR *= (0.7 + 0.5 * noise(cornerBR * 8.0));
        float curlTL = pow(1.0 - smoothstep(0.0, 0.18, distTL), 2.8) * 1.1;
        curlTL *= (0.9 + 0.3 * noise(cornerTL * 12.0));
        float curlTR = pow(1.0 - smoothstep(0.0, 0.32, distTR), 2.2) * 2.0;
        curlTR *= (0.6 + 0.6 * noise(cornerTR * 7.0));

        float totalCornerCurl = curlBL + curlBR + curlTL + curlTR;
        vCornerCurl = totalCornerCurl * uParchment;

        // Edge curls
        float curlL = pow(1.0 - smoothstep(0.02, 0.12, edgeL), 2.2);
        curlL *= (0.5 + 0.7 * noise(vec2(uv.y * 6.0, 1.0)));
        float curlR = pow(1.0 - smoothstep(0.02, 0.14, edgeR), 2.0);
        curlR *= (0.6 + 0.6 * noise(vec2(uv.y * 5.0, 2.0)));
        float curlB = pow(1.0 - smoothstep(0.02, 0.10, edgeB), 2.3);
        curlB *= (0.7 + 0.5 * noise(vec2(uv.x * 7.0, 3.0)));
        float curlT = pow(1.0 - smoothstep(0.02, 0.09, edgeT), 2.5);
        curlT *= (0.4 + 0.8 * noise(vec2(uv.x * 8.0, 4.0)));

        // Fold creases
        float crease1 = abs(uv.x + uv.y - 1.0);
        crease1 = 1.0 - smoothstep(0.0, 0.02, crease1);
        crease1 *= smoothstep(0.1, 0.3, minEdge);
        float crease2 = abs(uv.y - 0.5);
        crease2 = 1.0 - smoothstep(0.0, 0.015, crease2);
        crease2 *= smoothstep(0.05, 0.15, min(edgeL, edgeR));
        float crease3 = abs(uv.x - 0.5);
        crease3 = 1.0 - smoothstep(0.0, 0.012, crease3);
        crease3 *= smoothstep(0.05, 0.15, min(edgeB, edgeT));
        float totalCrease = (crease1 * 0.6 + crease2 * 0.4 + crease3 * 0.3);
        vCrease = totalCrease * uParchment;

        // Apply deformations
        float p = uParchment;
        float cornerZ = (curlBL * 25.0 + curlBR * 30.0 + curlTL * 20.0 + curlTR * 35.0);
        float edgeZ = (curlL + curlR + curlB + curlT) * 15.0;
        float creaseZ = totalCrease * 8.0;

        flatPos.z -= (cornerZ + edgeZ) * p * boundaryFade;
        flatPos.z += creaseZ * p * boundaryFade;

        float inwardX = (curlBR + curlTR - curlBL - curlTL) * 8.0;
        float inwardY = (curlTL + curlTR - curlBL - curlBR) * 7.0;
        flatPos.x += inwardX * p * boundaryFade;
        flatPos.y += inwardY * p * boundaryFade;

        flatPos.x += (curlR - curlL) * 5.0 * p * boundaryFade;
        flatPos.y += (curlT - curlB) * 4.0 * p * boundaryFade;

        float tornDisp = vTornEdge * 2.0;
        flatPos.z -= tornDisp * boundaryFade;

        // Surface waviness
        float interiorFade = smoothstep(0.0, 0.1, minEdge);
        float wave1 = sin(uv.x * 20.0 + uv.y * 12.0) * 0.4;
        float wave2 = sin(uv.y * 25.0 - uv.x * 8.0) * 0.3;
        float wave3 = sin((uv.x + uv.y) * 35.0) * 0.2;
        float wave4 = noise(uv * 40.0) * 0.5;
        float waves = (wave1 + wave2 + wave3 + wave4) * p * interiorFade;
        flatPos.z += waves * 0.6;

        flatPos.z += crease1 * 3.0 * p * boundaryFade;
        flatPos.z += crease2 * 2.0 * p * boundaryFade;
        flatPos.z += crease3 * 1.5 * p * boundaryFade;
    }

    // Smooth morph with easing
    float t = uMorph;
    t = t * t * (3.0 - 2.0 * t);

    vec3 pos = mix(flatPos, spherePos, t);

    // Normal calculation
    vec3 sphereNormal = normalize(spherePos);
    vec3 flatNormal = vec3(0.0, 0.0, 1.0);
    vNormal = normalize(mix(flatNormal, sphereNormal, t));

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,Da=`
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform sampler2D uCloudTexture;
uniform sampler2D uNightTexture;
uniform float uDataOpacity;
uniform vec3 uSunDir;
uniform float uMorph;
uniform float uParchment;
uniform float uExtremeParchment;
uniform float uTime;
uniform float uTransitionEffect;

// Effect uniforms
uniform float uClouds;
uniform float uCloudSpeed;
uniform float uCloudOpacity;
uniform float uAtmosphereIntensity;
uniform float uAurora;
uniform float uAuroraIntensity;
uniform float uCityLights;
uniform float uCityLightsIntensity;
uniform float uOceanSpecular;
uniform float uSpecularIntensity;
uniform float uSunGlow;
uniform float uGridLines;
uniform float uGridOpacity;
uniform float uScanEffect;
uniform float uScanSpeed;
uniform float uHologram;
uniform vec3 uHologramColor;
uniform float uVintage;
uniform float uThermal;
uniform float uBlueprint;
uniform float uGlowPulse;
uniform vec3 uGlowColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// 3D hash for volumetric noise
float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// 3D noise for seamless spherical sampling
float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n000 = hash3(i);
    float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
    
    float nx00 = mix(n000, n100, f.x);
    float nx10 = mix(n010, n110, f.x);
    float nx01 = mix(n001, n101, f.x);
    float nx11 = mix(n011, n111, f.x);
    
    float nxy0 = mix(nx00, nx10, f.y);
    float nxy1 = mix(nx01, nx11, f.y);
    
    return mix(nxy0, nxy1, f.z);
}

// FBM using 3D noise for seamless spherical clouds
float fbm3D(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise3D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    if (vDiscard > 0.5) {
        discard;
    }

    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDir);

    float sunDot = dot(normal, sunDir);
    float dayFactor = smoothstep(-0.2, 0.4, sunDot);

    vec4 baseColor = texture2D(uTexture, vUv);
    vec4 dataColor = texture2D(uDataTexture, vUv);

    vec3 color = mix(baseColor.rgb, dataColor.rgb, uDataOpacity * dataColor.a);
    color *= (0.4 + 0.6 * dayFactor);

    float viewDot = max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = 1.0 - viewDot;

    // Atmosphere effect
    if (uAtmosphereIntensity > 0.01) {
        float innerGlow = pow(rim, 2.0) * 0.4;
        float midGlow = pow(rim, 4.0) * 0.6;
        float outerGlow = pow(rim, 6.0) * 0.8;

        vec3 atmosphereInner = vec3(0.4, 0.7, 1.0);
        vec3 atmosphereMid = vec3(0.3, 0.5, 0.9);
        vec3 atmosphereOuter = vec3(0.5, 0.3, 0.8);

        vec3 atmosColor = atmosphereInner * innerGlow +
                          atmosphereMid * midGlow +
                          atmosphereOuter * outerGlow;

        float fresnelAtmos = pow(1.0 - viewDot, 3.0) * uMorph * uAtmosphereIntensity;
        color += atmosColor * fresnelAtmos * 0.35;

        float sunRim = max(dot(normal, sunDir), 0.0);
        float scatter = pow(rim, 2.5) * sunRim * uMorph * uAtmosphereIntensity;
        color += vec3(1.0, 0.9, 0.7) * scatter * 0.15;
    }

    // Cloud layer - use spherical 3D coordinates for seamless wrapping
    if (uClouds > 0.01) {
        // Convert UV to spherical 3D coordinates (naturally wraps without seams)
        float lon = vUv.x * 2.0 * 3.14159;
        float lat = (vUv.y - 0.5) * 3.14159;
        
        // Add time-based rotation for cloud movement
        float cloudLon = lon + uTime * uCloudSpeed * 0.02;
        
        // Create 3D point on sphere surface
        vec3 spherePoint = vec3(
            cos(lat) * cos(cloudLon),
            sin(lat),
            cos(lat) * sin(cloudLon)
        );
        
        // Sample noise at different scales using 3D coordinates
        float cloud1 = fbm3D(spherePoint * 3.0 + uTime * uCloudSpeed * 0.01);
        float cloud2 = fbm3D(spherePoint * 6.0 - uTime * uCloudSpeed * 0.005);
        float cloud3 = fbm3D(spherePoint * 1.5 + uTime * uCloudSpeed * 0.003);

        float clouds = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;
        clouds = smoothstep(0.35, 0.65, clouds);

        vec3 cloudColor = vec3(1.0, 1.0, 1.0);
        float cloudLight = 0.7 + 0.3 * dayFactor;
        cloudColor *= cloudLight;

        color *= 1.0 - clouds * 0.15 * uClouds;
        color = mix(color, cloudColor, clouds * uCloudOpacity * uClouds);
    }

    // Grid lines
    if (uGridLines > 0.01) {
        float latLine = abs(sin(vUv.y * 3.14159 * 12.0));
        latLine = 1.0 - smoothstep(0.97, 1.0, latLine);
        float lonLine = abs(sin(vUv.x * 3.14159 * 24.0));
        lonLine = 1.0 - smoothstep(0.97, 1.0, lonLine);
        float equator = 1.0 - smoothstep(0.005, 0.01, abs(vUv.y - 0.5));
        float primeMeridian = 1.0 - smoothstep(0.003, 0.006, abs(vUv.x - 0.5));
        float gridTotal = max(max(latLine, lonLine), max(equator * 2.0, primeMeridian * 2.0));
        vec3 gridColor = vec3(0.3, 0.6, 1.0);
        color = mix(color, gridColor, gridTotal * uGridOpacity * uGridLines);
    }

    // Glow pulse
    if (uGlowPulse > 0.01) {
        float glowPulseIntensity = sin(uTime * 2.0) * 0.5 + 0.5;
        float edgePulse = pow(rim, 2.0) * glowPulseIntensity;
        color += uGlowColor * edgePulse * 0.4 * uGlowPulse * uMorph;
    }

    gl_FragColor = vec4(color, 1.0);
}
`,La=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

const float PI = 3.14159265359;
const float RADIUS = ${J.toFixed(1)};

void main() {
    vNormal = normalize(normalMatrix * normal);

    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    float atmosRadius = RADIUS * 1.15;
    vec3 spherePos = vec3(
        atmosRadius * cos(lat) * sin(lon),
        atmosRadius * sin(lat),
        atmosRadius * cos(lat) * cos(lon)
    );

    float flatWidth = 2.0 * PI * atmosRadius;
    float flatHeight = PI * atmosRadius;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        -5.0
    );

    float t = uMorph * uMorph * (3.0 - 2.0 * uMorph);
    vec3 pos = mix(flatPos, spherePos, t);

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,Ia=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uOpacity;
uniform float uMorph;

void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    intensity *= uMorph;

    vec3 innerColor = vec3(0.3, 0.6, 1.0);
    vec3 outerColor = vec3(0.1, 0.2, 0.5);
    vec3 color = mix(innerColor, outerColor, intensity);

    gl_FragColor = vec4(color, intensity * 0.6 * uOpacity);
}
`,Ra=`
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform float uTwinkle;
varying float vOpacity;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float twinkle = sin(uTime * 2.0 + aPhase) * 0.3 + 0.7;
    twinkle = mix(1.0, twinkle, uTwinkle);
    vOpacity = twinkle;

    gl_PointSize = aSize * (300.0 / -mvPosition.z) * twinkle;
    gl_Position = projectionMatrix * mvPosition;
}
`,ka=`
uniform float uOpacity;
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9 * uOpacity);
}
`,_n=Math.PI/180;function Oa(o,e,t=J){const i=(90-o)*_n,r=(e+180)*_n;return new A.Vector3(-t*Math.sin(i)*Math.cos(r),t*Math.cos(i),t*Math.sin(i)*Math.sin(r))}function Fa(o,e){const t=2*Math.PI*J,i=Math.PI*J;return new A.Vector3(e/180*(t/2),o/90*(i/2),0)}const Ua={style:"spike",color:"#0ea5e9",maxHeight:15,pulseAnimation:!0,opacity:.9};class za{group;markers=[];config;markerMeshes=[];glowMeshes=[];morph=1;time=0;markerMaterial;glowMaterial;constructor(e={}){this.group=new A.Group,this.config={...Ua,...e},this.markerMaterial=new A.MeshBasicMaterial({color:new A.Color(this.config.color),transparent:!0,opacity:this.config.opacity}),this.glowMaterial=new A.ShaderMaterial({uniforms:{uColor:{value:new A.Color(this.config.color)},uTime:{value:0},uPulse:{value:this.config.pulseAnimation?1:0}},vertexShader:`
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uPulse;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          float pulse = 1.0 + sin(uTime * 3.0) * 0.3 * uPulse;
          vec3 glow = uColor * intensity * pulse;
          float alpha = intensity * 0.6 * pulse;
          gl_FragColor = vec4(glow, alpha);
        }
      `,transparent:!0,blending:A.AdditiveBlending,side:A.BackSide,depthWrite:!1})}getGroup(){return this.group}setMarkers(e){this.markers=e,this.rebuild()}setConfig(e){this.config={...this.config,...e},e.color&&(this.markerMaterial.color.set(e.color),this.glowMaterial.uniforms.uColor.value.set(e.color)),e.opacity!==void 0&&(this.markerMaterial.opacity=e.opacity),e.pulseAnimation!==void 0&&(this.glowMaterial.uniforms.uPulse.value=e.pulseAnimation?1:0),this.rebuild()}setMorph(e){this.morph=e,this.updatePositions()}update(e){this.time=e,this.glowMaterial.uniforms.uTime.value=e}rebuild(){if(this.group.clear(),this.markerMeshes=[],this.glowMeshes=[],this.markers.length===0)return;const e=this.markers.map(i=>i.value),t=Math.max(...e,1);for(const i of this.markers){const r=i.value/t,n=this.createMarkerMesh(i,r);if(this.markerMeshes.push(n),this.group.add(n),this.config.style!=="dot"){const s=this.createGlowMesh(i,r);this.glowMeshes.push(s),this.group.add(s)}}this.updatePositions()}createMarkerMesh(e,t){let i;const r=2+t*this.config.maxHeight;switch(this.config.style){case"dot":i=new A.SphereGeometry(1+t*2,16,12);break;case"pin":i=new A.ConeGeometry(1.5,r,8);break;case"spike":default:i=new A.CylinderGeometry(.3,1.2,r,8);break}const n=e.color?new A.MeshBasicMaterial({color:new A.Color(e.color),transparent:!0,opacity:this.config.opacity}):this.markerMaterial,s=new A.Mesh(i,n);return s.userData={marker:e,height:r},s}createGlowMesh(e,t){const i=2+t*3,r=new A.SphereGeometry(i,16,12),n=e.color?new A.ShaderMaterial({...this.glowMaterial,uniforms:{...this.glowMaterial.uniforms,uColor:{value:new A.Color(e.color)}}}):this.glowMaterial,s=new A.Mesh(r,n);return s.userData={marker:e},s}updatePositions(){for(let e=0;e<this.markerMeshes.length;e++){const t=this.markerMeshes[e],i=t.userData.marker,r=t.userData.height,n=Oa(i.lat,i.lng,J),s=Fa(i.lat,i.lng),a=this.morph*this.morph*(3-2*this.morph);if(t.position.lerpVectors(s,n,a),a>.01){if(t.lookAt(t.position.clone().multiplyScalar(2)),this.config.style==="spike"||this.config.style==="pin"){t.rotateX(Math.PI/2);const l=n.clone().normalize().multiplyScalar(r/2);t.position.add(l.multiplyScalar(a))}}else t.rotation.set(-Math.PI/2,0,0),(this.config.style==="spike"||this.config.style==="pin")&&(t.position.z=r/2);this.glowMeshes[e]&&this.glowMeshes[e].position.copy(t.position)}}getMarkerAtPosition(e,t,i){e.setFromCamera(i,t);const r=e.intersectObjects(this.markerMeshes);return r.length>0?r[0].object.userData.marker:null}dispose(){this.group.clear(),this.markerMaterial.dispose(),this.glowMaterial.dispose();for(const e of this.markerMeshes)e.geometry.dispose(),e.material!==this.markerMaterial&&e.material.dispose();for(const e of this.glowMeshes)e.geometry.dispose(),e.material!==this.glowMaterial&&e.material.dispose();this.markerMeshes=[],this.glowMeshes=[]}}let vn=!1;function Na(){if(vn)return;vn=!0;const o=document.createElement("style");o.setAttribute("data-gralobe-toolbar","true"),o.textContent=`
    .gralobe-toolbar {
      position: absolute;
      bottom: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
      z-index: 100;
      pointer-events: auto;
    }

    .gralobe-toolbar-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: rgba(0, 10, 20, 0.85);
      border: 1px solid rgba(100, 150, 200, 0.3);
      color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      padding: 0;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .gralobe-toolbar-btn:hover {
      background: rgba(20, 40, 60, 0.95);
      border-color: rgba(100, 180, 255, 0.6);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .gralobe-toolbar-btn:active {
      transform: translateY(0);
    }

    .gralobe-toolbar-btn svg {
      width: 18px;
      height: 18px;
    }
  `,document.head.appendChild(o)}class wt{element;parentContainer;projectionBtn;static GLOBE_ICON=`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  `;static MAP_ICON=`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  `;constructor(e,t){Na(),this.parentContainer=e,this.element=document.createElement("div"),this.element.className="gralobe-toolbar";const i=document.createElement("button");i.className="gralobe-toolbar-btn",i.title="View Raw Data",i.innerHTML=`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    `,i.onclick=s=>{s.stopPropagation(),t.onShowData()},this.projectionBtn=document.createElement("button"),this.projectionBtn.className="gralobe-toolbar-btn",this.projectionBtn.title="Toggle Projection (G)",this.projectionBtn.innerHTML=wt.MAP_ICON,this.projectionBtn.onclick=s=>{s.stopPropagation(),t.onToggleProjection()};const r=document.createElement("button");r.className="gralobe-toolbar-btn",r.title="Toggle Fullscreen",r.innerHTML=`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
      </svg>
    `,r.onclick=s=>{s.stopPropagation(),t.onToggleFullscreen()},this.element.appendChild(i),this.element.appendChild(this.projectionBtn),this.element.appendChild(r),getComputedStyle(e).position==="static"&&(e.style.position="relative"),e.appendChild(this.element)}updateProjectionIcon(e){e?(this.projectionBtn.innerHTML=wt.MAP_ICON,this.projectionBtn.title="View as Flat Map (G)"):(this.projectionBtn.innerHTML=wt.GLOBE_ICON,this.projectionBtn.title="View as Globe (G)")}dispose(){this.element.remove()}}const Ct={lifeExpectancy:{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],format:o=>`${o.toFixed(1)} years`},humanDevIndex:{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],format:o=>o.toFixed(3)},gdpPerCapita:{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],format:o=>`$${(o/1e3).toFixed(1)}k`},co2Emissions:{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],format:o=>`${o.toFixed(1)}t`},renewableEnergy:{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},internetUsers:{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},urbanPopulation:{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],format:o=>`${o.toFixed(0)}%`},healthExpenditure:{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],format:o=>`${o.toFixed(1)}%`},forestArea:{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],format:o=>`${o.toFixed(0)}%`},population:{id:"population",name:"Population",unit:"millions",description:"Total population",colorScale:["#fff7bc","#fec44f","#d95f0e"],domain:[1,1500],format:o=>`${o.toFixed(0)}M`},accessElectricity:{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffeda0","#feb24c","#f03b20"],domain:[20,100],format:o=>`${o.toFixed(0)}%`},educationExpenditure:{id:"educationExpenditure",name:"Education Spending",unit:"% GDP",description:"Government expenditure on education as percentage of GDP",colorScale:["#edf8fb","#7bccc4","#0868ac"],domain:[1,10],format:o=>`${o.toFixed(1)}%`}};Ct.lifeExpectancy;const Ba="https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_urban_areas.geojson";class $a{static urbanFeatures=null;static isLoading=!1;static loadPromise=null;static async loadBaseTopology(){return this.urbanFeatures?this.urbanFeatures:this.loadPromise?this.loadPromise:(this.isLoading=!0,this.loadPromise=(async()=>{try{const e=await fetch(Ba);if(!e.ok)throw new Error("Failed to load urban areas");const t=await e.json();return this.urbanFeatures=t.features,this.urbanFeatures||[]}catch(e){return console.error("UrbanMapper load error:",e),[]}finally{this.isLoading=!1}})(),this.loadPromise)}static generateSyntheticBoundary(e,t,i=85){const n=[],a=i/6371*(180/Math.PI),l=a/Math.cos(e*Math.PI/180);for(let u=0;u<=16;u++){const c=u/16*2*Math.PI,h=e+a*Math.sin(c),p=t+l*Math.cos(c);n.push([p,h])}return{type:"Feature",id:`synthetic_${e.toFixed(4)}_${t.toFixed(4)}_${i}`,properties:{name:"Unknown City",featurecla:"Synthetic Urban Area"},geometry:{type:"Polygon",coordinates:[n]}}}static async mapPointsToTopology(e,t=85,i=!1){console.log("UrbanMapper.mapPointsToTopology called with radius:",t,"forceSynthetic:",i);const r=i?[]:await this.loadBaseTopology(),n=[],s={},a=new Set;for(const l of e){let u=null;if(!i){for(const c of r)if(this.isPointInFeature(l,c)){u=c;break}}if(u){const c=u.properties.name_conve||u.properties.name||`ua_${Math.random()}`,h=a.has(c)?null:JSON.parse(JSON.stringify(u));h&&(h.id=c,l.name?h.properties.name=l.name:h.properties.name||(h.properties.name=c),n.push(h),a.add(c)),s[c]=(s[c]||0)+l.value}else{const c=this.generateSyntheticBoundary(l.lat,l.lon,t);l.id&&(c.id=l.id),l.name&&(c.properties.name=l.name),n.push(c),s[c.id]=l.value}}return{features:n,statistics:s}}static isPointInFeature(e,t){const{lat:i,lon:r}=e,n=t.geometry;if(!n)return!1;const s=n.coordinates;if(n.type==="Polygon")return this.pointInPolygon([r,i],s);if(n.type==="MultiPolygon"){for(const a of s)if(this.pointInPolygon([r,i],a))return!0}return!1}static pointInPolygon(e,t){const i=e[0],r=e[1];let n=!1;const s=t[0];for(let a=0,l=s.length-1;a<s.length;l=a++){const u=s[a][0],c=s[a][1],h=s[l][0],p=s[l][1];c>r!=p>r&&i<(h-u)*(r-c)/(p-c)+u&&(n=!n)}return n}}const Vi={satellite:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",natural:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",dark:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",light:"https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",night:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",topographic:"https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"},En={texture:"satellite",labels:"data",statistic:"lifeExpectancy",autoRotate:!1,initialView:"globe",showControls:!1,showDebug:!1,showToolbar:!1,showLegend:!0,effects:{atmosphereIntensity:0,atmosphere:!1,clouds:!1,cloudSpeed:1,cloudOpacity:.6,starTwinkle:!0,aurora:!1,cityLights:!1,oceanSpecular:!1,gridLines:!1,gridOpacity:.5,hologramMode:!1,vintageMode:!1,thermalMode:!1,blueprintMode:!1,glowPulse:!1},extrudeHeight:!1,pointRadius:140};class Ga{container;config;scene;camera;renderer;controls;globe=null;material=null;atmosphere=null;stars=null;gui=null;choropleth=null;legend=null;exporter=null;countryLabels=null;markerLayer=null;toolbar=null;dataGrid=null;textureLoader=new A.TextureLoader;dataTexture=null;morph=0;currentStatistic=null;currentValues=null;animationId=null;isDestroyed=!1;urbanPoints=null;ready;resolveReady;rejectReady;constructor(e,t={}){if(typeof e=="string"){const i=document.querySelector(e);if(!i)throw new Error(`Container not found: ${e}`);this.container=i}else this.container=e;this.container.classList.add("gralobe-viz-container"),this.config={...En,...t,effects:{...En.effects,...t.effects||{}}},console.log("GlobeViz v5 initialized",this.config.effects),this.ready=new Promise((i,r)=>{this.resolveReady=i,this.rejectReady=r}),this.init()}async init(){try{const e=this.config.width||this.container.clientWidth||800,t=this.config.height||this.container.clientHeight||600;this.scene=new A.Scene,this.scene.background=new A.Color(2066),this.camera=new A.PerspectiveCamera(50,e/t,.1,1e3),this.camera.position.set(0,0,this.config.initialView==="flat"?350:150),this.renderer=new A.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement),this.controls=new Cn.OrbitControls(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.minDistance=2,this.controls.maxDistance=400,this.choropleth=new at(this.config.topology,(r,n)=>{this.config.onLoadProgress?.(r,n)},()=>{this.material&&this.material.uniforms.uDataTexture.value&&(this.material.uniforms.uDataTexture.value.needsUpdate=!0,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value===0&&H.to(this.material.uniforms.uDataOpacity,{value:.7,duration:1}))}),this.config.showLegend&&(this.legend=new Ta(this.container)),await this.createGlobe(),this.createStars(),this.config.effects.atmosphere&&this.createAtmosphere(),this.countryLabels=new sa(this.container,J),this.scene.add(this.countryLabels.getGroup()),this.globe&&this.countryLabels.setGlobe(this.globe),this.countryLabels.setCamera(this.camera),this.countryLabels.setStyle(this.config.labels),this.exporter=new Ca(this.renderer,this.scene,this.camera),this.legend&&this.exporter.setLegendElement(this.legend.getElement()),this.countryLabels&&this.exporter.setCountryLabels(this.countryLabels),(this.config.showControls||this.config.showDebug)&&this.createGUI(),this.setupInteraction(),await this.choropleth.waitForLoad();const i=this.choropleth.getFeatureLabels();i.length>0&&this.addCustomLabels(i),this.setStatistic(this.config.statistic),this.morph=this.config.initialView==="globe"?1:0,this.material&&(this.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),window.addEventListener("resize",this.handleResize),document.addEventListener("fullscreenchange",this.handleFullscreenChange),this.renderer.domElement.tabIndex=0,this.renderer.domElement.style.outline="none",this.renderer.domElement.addEventListener("mousedown",()=>{this.renderer.domElement.focus()}),this.renderer.domElement.addEventListener("keydown",this.handleKeydown),this.animate(),(this.config.showToolbar||this.config.showControls)&&(this.toolbar=new wt(this.container,{onShowData:()=>{const n=(this.currentStatistic?this.getStatisticMetadata(this.currentStatistic):null)?.definition.name||"Current Data";this.dataGrid?.show(n,this.getCurrentData())},onToggleFullscreen:()=>this.toggleFullscreen(),onToggleProjection:()=>this.toggleProjection()}),this.dataGrid=new oa(this.container),this.toolbar.updateProjectionIcon(this.config.initialView==="globe")),this.resolveReady()}catch(e){console.error("GlobeViz init failed:",e),this.rejectReady(e)}}handleKeydown=e=>{this.isDestroyed||document.activeElement===this.renderer.domElement&&((e.key==="g"||e.key==="G")&&this.toggleProjection(),(e.key==="f"||e.key==="F")&&this.toggleFullscreen())};async createGlobe(){const e=this.textureLoader.loadAsync(Vi[this.config.texture]),t=new Promise((s,a)=>setTimeout(()=>a(new Error("Texture load timed out after 10s")),1e4)),i=await Promise.race([e,t]);if(this.isDestroyed||!this.renderer)return;i.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),i.minFilter=A.LinearMipmapLinearFilter,i.magFilter=A.LinearFilter;const r=document.createElement("canvas");r.width=2048,r.height=1024,this.dataTexture=new A.CanvasTexture(r);const n=new A.PlaneGeometry(Math.PI*2*J,Math.PI*J,256,128);this.material=new A.ShaderMaterial({vertexShader:Ma,fragmentShader:Da,uniforms:{uMorph:{value:0},uTime:{value:0},uParchment:{value:0},uExtremeParchment:{value:0},uTransitionEffect:{value:0},uTexture:{value:i},uDataTexture:{value:this.dataTexture},uCloudTexture:{value:null},uNightTexture:{value:null},uDataOpacity:{value:0},uDataOverlay:{value:0},uExtrudeHeight:{value:this.config.extrudeHeight?1:0},uSunDir:{value:new A.Vector3(1,.5,1).normalize()},uClouds:{value:this.config.effects.clouds?1:0},uCloudSpeed:{value:this.config.effects.cloudSpeed||1},uCloudOpacity:{value:this.config.effects.cloudOpacity||.6},uAtmosphereIntensity:{value:this.config.effects.atmosphereIntensity||0},uAurora:{value:this.config.effects.aurora?1:0},uAuroraIntensity:{value:1},uCityLights:{value:this.config.effects.cityLights?1:0},uCityLightsIntensity:{value:1},uOceanSpecular:{value:this.config.effects.oceanSpecular?1:0},uSpecularIntensity:{value:1},uSunGlow:{value:0},uGridLines:{value:this.config.effects.gridLines?1:0},uGridOpacity:{value:this.config.effects.gridOpacity||.5},uScanEffect:{value:0},uScanSpeed:{value:1},uHologram:{value:this.config.effects.hologramMode?1:0},uHologramColor:{value:new A.Color(65535)},uVintage:{value:this.config.effects.vintageMode?1:0},uThermal:{value:this.config.effects.thermalMode?1:0},uBlueprint:{value:this.config.effects.blueprintMode?1:0},uGlowPulse:{value:this.config.effects.glowPulse?1:0},uGlowColor:{value:new A.Color(4491519)}},side:A.DoubleSide}),this.globe=new A.Mesh(n,this.material),this.scene.add(this.globe)}createAtmosphere(){const e=new A.PlaneGeometry(Math.PI*2*J*1.15,Math.PI*J*1.15,128,64),t=new A.ShaderMaterial({vertexShader:La,fragmentShader:Ia,uniforms:{uMorph:{value:0},uOpacity:{value:1}},side:A.BackSide,transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.atmosphere=new A.Mesh(e,t),this.scene.add(this.atmosphere)}createStars(){const t=new A.BufferGeometry,i=new Float32Array(3e3*3),r=new Float32Array(3e3),n=new Float32Array(3e3);for(let a=0;a<3e3;a++){const l=300+Math.random()*300,u=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);i[a*3]=l*Math.sin(c)*Math.cos(u),i[a*3+1]=l*Math.sin(c)*Math.sin(u),i[a*3+2]=l*Math.cos(c),r[a]=.5+Math.random()*1.5,n[a]=Math.random()*Math.PI*2}t.setAttribute("position",new A.BufferAttribute(i,3)),t.setAttribute("aSize",new A.BufferAttribute(r,1)),t.setAttribute("aPhase",new A.BufferAttribute(n,1));const s=new A.ShaderMaterial({vertexShader:Ra,fragmentShader:ka,uniforms:{uTime:{value:0},uTwinkle:{value:this.config.effects.starTwinkle?1:0},uOpacity:{value:1}},transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.stars=new A.Points(t,s),this.scene.add(this.stars)}createGUI(){getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative"),console.warn("Creating GUI v6 (Two-Stage Navigation)");let t=document.querySelector("style#gralobe-gui-style");if(t||(t=document.createElement("style"),t.id="gralobe-gui-style",document.head.appendChild(t)),t.textContent=`
        /* Root container helper */
        .gralobe-viz-container {
            position: relative;
        }

        /* 1. Main Toggle Button (Top Right) */
        .gralobe-gui-toggle {
          position: absolute !important;
          top: 12px !important;
          right: 12px !important;
          width: 32px !important;
          height: 32px !important;
          background: rgba(0, 5, 15, 0.9) !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          border-radius: 6px !important;
          color: #ddd !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          z-index: 1002 !important;
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(4px) !important;
          transition: all 0.2s ease !important;
          padding: 0 !important;
        }

        .gralobe-gui-toggle:hover {
          background: rgba(20, 40, 60, 0.95) !important;
          border-color: rgba(100, 180, 255, 0.6) !important;
          color: #fff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }

        .gralobe-gui-toggle.expanded svg {
          transform: rotate(180deg) !important;
          color: #4af !important;
        }
        
        .gralobe-gui-toggle svg {
           width: 18px !important;
           height: 18px !important;
           stroke: currentColor !important;
           transition: transform 0.3s ease !important;
        }

        /* 2. Category Toolbar (Vertical Stack beneath Toggle) */
        .gralobe-category-bar {
          position: absolute !important;
          top: 50px !important;
          right: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
          z-index: 1001 !important;
          transition: opacity 0.2s ease, transform 0.2s ease !important;
          pointer-events: none !important;
          opacity: 0 !important;
          transform: translateX(20px) !important;
        }

        .gralobe-category-bar.visible {
          pointer-events: auto !important;
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .gralobe-category-btn {
          background: rgba(0, 10, 20, 0.85) !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          color: #ddd !important;
          padding: 6px 12px !important;
          border-radius: 4px !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 8px !important;
          text-align: right !important;
          cursor: pointer !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.2s ease !important;
          min-width: 80px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        }

        .gralobe-category-btn:hover {
          background: rgba(20, 40, 70, 0.9) !important;
          border-color: #4af !important;
          color: #fff !important;
          transform: translateX(-2px) !important;
        }

        .gralobe-category-btn.active {
          background: rgba(0, 60, 120, 0.9) !important;
          border-color: #4af !important;
          color: #4af !important;
          font-weight: 600 !important;
        }

        /* 3. Transient Panels (lil-gui instances) */
        .gralobe-viz-container .lil-gui.root {
          position: absolute !important;
          top: 50px !important; /* Align with top of toolbar */
          right: 100px !important; /* To the left of the toolbar */
          width: 160px !important;
          z-index: 1000 !important;
          
          --background-color: rgba(0, 10, 20, 0.9) !important;
          --text-color: #ddd !important;
          --widget-color: rgba(60, 110, 170, 0.3) !important;
          --hover-color: rgba(70, 160, 255, 0.4) !important;
          --focus-color: #4af !important;
          --number-color: #4af !important;
          
          border-radius: 6px !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
          
          transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateX(10px) !important;
          display: none !important; /* Hide by default */
        }

        .gralobe-viz-container .lil-gui.root.active-panel {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateX(0) !important;
          display: flex !important;
        }

        /* 4. Global Font Overrides */
        .gralobe-viz-container .lil-gui,
        .gralobe-viz-container .lil-gui * {
          font-size: 7px !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          line-height: 1.2 !important;
        }
        
        /* Hide internal titles */
        .gralobe-viz-container .lil-gui.root > .title {
            display: none !important;
        }

        /* Compact inputs */
        .gralobe-viz-container .lil-gui input[type="checkbox"] {
          width: 8px !important; height: 8px !important; margin-top: 1px !important;
        }
        .gralobe-viz-container .lil-gui input[type="text"],
        .gralobe-viz-container .lil-gui input[type="number"],
        .gralobe-viz-container .lil-gui select {
            height: 12px !important;
            font-size: 7px !important;
        }
        .gralobe-viz-container .lil-gui .controller {
            margin: 2px 0 !important;
        }
    `,this.gui){try{this.gui.destroy()}catch{}this.gui=null}const i=this.container.querySelector(".gralobe-gui-toggle");i&&i.remove();const r=this.container.querySelector(".gralobe-category-bar");r&&r.remove(),this.gui=new Gt({container:this.container,title:"Controls"});const n=document.createElement("button");n.className="gralobe-gui-toggle",n.innerHTML=`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `,n.title="Toggle Toolbar",this.container.appendChild(n);const s=document.createElement("div");s.className="gralobe-category-bar",this.container.appendChild(s);let a=!1,l=null;const u={},c={},h=()=>{Object.keys(u).forEach(x=>{u[x].domElement.classList.remove("active-panel"),c[x].classList.remove("active")}),l=null},p=x=>{l===x?h():(h(),l=x,u[x].domElement.classList.add("active-panel"),c[x].classList.add("active"))},f=x=>{a=x,a?(s.classList.add("visible"),n.classList.add("expanded")):(s.classList.remove("visible"),n.classList.remove("expanded"),h())};n.onclick=x=>{x.stopPropagation(),f(!a)},f(!1);const m=(x,P)=>{const w=document.createElement("button");w.className="gralobe-category-btn",w.innerText=P,w.onclick=M=>{M.stopPropagation(),p(x)},s.appendChild(w),c[x]=w;const S=new Gt({container:this.container,title:x});return S.domElement.classList.add("root"),u[x]=S,S};m("texture","Texture").add(this.config,"texture",Object.keys(Vi)).name("Theme").onChange(x=>this.setTexture(x));const g=m("nav","Navigation");g.add({toGlobe:()=>this.toGlobe()},"toGlobe").name("→ Globe"),g.add({toFlat:()=>this.toFlat()},"toFlat").name("→ Flat"),g.add({morph:this.morph},"morph",0,1).name("Morph").listen().onChange(x=>this.setMorph(x));const y=m("stats","Data"),b=typeof this.config.statistic=="string"?this.config.statistic:this.config.statistic.definition.id;y.add({stat:b},"stat",Object.keys(Ct)).name("Metric").onChange(x=>this.setStatistic(x));const _=m("fx","Effects"),E=this.config.effects;_.add(E,"clouds").onChange(x=>{this.material&&(this.material.uniforms.uClouds.value=x?1:0)}),_.add(E,"atmosphere").onChange(x=>{this.material&&(this.material.uniforms.uAtmosphereIntensity.value=x?1:0)}),_.add(E,"cityLights").name("City Lights").onChange(x=>{this.material&&(this.material.uniforms.uCityLights.value=x?1:0)});const v=_.addFolder("Special Modes");v.add(E,"hologramMode").name("Hologram").onChange(x=>{this.material&&(this.material.uniforms.uHologram.value=x?1:0)}),v.add(E,"vintageMode").name("Vintage").onChange(x=>{this.material&&(this.material.uniforms.uVintage.value=x?1:0)});const C=m("settings","Settings");C.add({labels:this.config.labels},"labels",["none","minimal","all","data"]).onChange(x=>this.setLabels(x)),C.add(this.config,"autoRotate").name("Auto Rotate"),C.add({screenshot:()=>this.screenshot({width:1920,height:1080})},"screenshot").name("Screenshot")}handleResize=()=>{if(this.isDestroyed)return;const e=this.config.width||this.container.clientWidth,t=this.config.height||this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.countryLabels?.resize(e,t)};handleFullscreenChange=()=>{this.isDestroyed||setTimeout(()=>this.handleResize(),50)};animate=()=>{if(this.isDestroyed)return;this.animationId=requestAnimationFrame(this.animate);const e=performance.now()*.001;this.material&&(this.material.uniforms.uTime.value=e),this.stars&&(this.stars.material.uniforms.uTime.value=e),this.controls.update(),this.config.autoRotate&&this.globe&&(this.globe.rotation.y+=.002*this.morph),this.countryLabels?.update(),this.markerLayer?.update(e),this.renderer.render(this.scene,this.camera),this.countryLabels?.render(this.scene,this.camera)};toGlobe(){this.controls.enableRotate=!0,this.controls.minAzimuthAngle=-1/0,this.controls.maxAzimuthAngle=1/0,this.controls.minPolarAngle=0,this.controls.maxPolarAngle=Math.PI,this.controls.screenSpacePanning=!1,this.controls.mouseButtons={LEFT:A.MOUSE.ROTATE,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.PAN};let e=0;const t=this.choropleth?.getBounds();if(t){const[i,r,n,s]=t;e=-((i+n)/2)*(Math.PI/180)}H.to(this,{morph:1,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("globe",this.morph)}}),H.to(this.camera.position,{x:0,y:0,z:200,duration:2.5,ease:"power2.inOut"}),H.to(this.controls.target,{x:0,y:0,z:0,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.controls.update()}}),this.globe&&H.to(this.globe.rotation,{y:e,x:0,z:0,duration:2.5,ease:"power2.inOut"}),this.stars&&H.to(this.stars.material.uniforms.uOpacity,{value:1,duration:1}),this.atmosphere&&H.to(this.atmosphere.material.uniforms.uOpacity,{value:1,duration:1}),this.toolbar?.updateProjectionIcon(!0)}toFlat(){const e=this.choropleth?.getBounds(),t=Math.PI*2*J,i=Math.PI*J;let r=0,n=0,s=t,a=i;if(e){const[f,m,d,g]=e,y=f/180*(t/2),b=d/180*(t/2),_=m/90*(i/2),E=g/90*(i/2);r=(y+b)/2,n=(_+E)/2,s=(b-y)*1.2,a=(E-_)*1.2}const l=this.camera.fov*Math.PI/180,u=this.camera.aspect,c=a/2/Math.tan(l/2),h=s/(2*Math.tan(l/2)*u),p=Math.max(c,h);this.controls.enabled=!1,H.to(this,{morph:0,duration:2,ease:"power3.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("flat",this.morph)},onComplete:()=>{this.controls.enabled=!0,this.controls.enableRotate=!1,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.minAzimuthAngle=0,this.controls.maxAzimuthAngle=0,this.controls.minPolarAngle=Math.PI/2,this.controls.maxPolarAngle=Math.PI/2,this.controls.target.set(r,n,0),this.controls.update()}}),this.globe&&H.to(this.globe.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),this.atmosphere&&H.to(this.atmosphere.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),H.to(this.camera.position,{x:r,y:n,z:p,duration:2,ease:"power3.inOut"}),H.to(this.controls.target,{x:r,y:n,z:0,duration:2,ease:"power3.inOut"}),H.to(this.camera.up,{x:0,y:1,z:0,duration:2,ease:"power3.inOut"}),this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:A.MOUSE.PAN,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.ROTATE},this.stars&&H.to(this.stars.material.uniforms.uOpacity,{value:0,duration:1}),this.atmosphere&&H.to(this.atmosphere.material.uniforms.uOpacity,{value:0,duration:1}),this.toolbar?.updateProjectionIcon(!1)}setupInteraction(){const e=new A.Raycaster,t=new A.Vector2,i=new A.Plane(new A.Vector3(0,0,1),0),r=new A.Vector3;let n=!1,s=new Date().getTime();this.renderer.domElement.addEventListener("mousedown",()=>{n=!1,s=new Date().getTime()}),this.renderer.domElement.addEventListener("mousemove",()=>{n=!0}),this.renderer.domElement.addEventListener("click",a=>{if(n&&new Date().getTime()-s>200)return;const l=this.renderer.domElement.getBoundingClientRect();if(t.x=(a.clientX-l.left)/l.width*2-1,t.y=-((a.clientY-l.top)/l.height)*2+1,this.morph<.1&&(e.setFromCamera(t,this.camera),e.ray.intersectPlane(i,r),r)){const u=Math.PI*J,c=Math.PI*J/2;Math.abs(r.x)<=u&&Math.abs(r.y)<=c&&(H.to(this.controls.target,{x:r.x,y:r.y,z:0,duration:1.5,ease:"power2.inOut"}),H.to(this.camera.position,{x:r.x,y:r.y,z:50,duration:1.5,ease:"power2.inOut"}))}})}setMorph(e){this.morph=e,this.material&&(this.material.uniforms.uMorph.value=e),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=e),this.countryLabels?.setMorph(e),this.markerLayer?.setMorph(e)}getMorph(){return this.morph}setStatistic(e){if(this.isDestroyed)return;let t=null;if(typeof e=="string"?(t=this.getStatisticMetadata(e),this.currentStatistic=e):(t=e,this.currentStatistic=t.definition.id),t&&(this.currentValues=t.values instanceof Map?Object.fromEntries(t.values):t.values,this.choropleth)){const i=this.choropleth.renderCustomTexture(t.values,t.definition.colorScale,t.definition.domain);if(this.material&&i){const r=new A.CanvasTexture(i);r.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),r.needsUpdate=!0,this.material.uniforms.uDataTexture.value=r,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value===0&&H.to(this.material.uniforms.uDataOpacity,{value:.7,duration:1})}this.legend&&this.legend.show(t.definition)}}setLabels(e){this.countryLabels?.setStyle(e)}addCustomLabels(e){this.countryLabels?.addCustomLabels(e)}clearCustomLabels(){this.countryLabels?.clearCustomLabels()}async setTexture(e){const t=Vi[e];if(!(!t||!this.material))try{const i=await this.textureLoader.loadAsync(t);i.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),i.minFilter=A.LinearMipmapLinearFilter,i.magFilter=A.LinearFilter,this.material.uniforms.uTexture.value=i}catch(i){console.error("Failed to load texture:",e,i)}}setAutoRotate(e){this.config.autoRotate=e}screenshot(e){this.exporter?.screenshot(e)}async recordGif(e){if(!this.exporter)return;const t=e?.duration||5,i=e?.fps||20,r=t*i;this.exporter.startGifCapture(e);for(let n=0;n<r;n++)this.exporter.captureGifFrame(),await new Promise(s=>setTimeout(s,1e3/i))}async recordVideo(e){if(!this.exporter)return;const t=e?.duration||5;await this.exporter.startVideoRecording(e),await new Promise(i=>setTimeout(i,t*1e3)),this.exporter.stopVideoRecording()}setEffects(e){Object.assign(this.config.effects,e),this.material&&(e.atmosphere!==void 0&&(e.atmosphere&&!this.atmosphere?this.createAtmosphere():!e.atmosphere&&this.atmosphere&&(this.scene.remove(this.atmosphere),this.atmosphere.geometry.dispose(),this.atmosphere.material.dispose(),this.atmosphere=null)),e.clouds!==void 0&&(this.material.uniforms.uClouds.value=e.clouds?1:0),e.cloudSpeed!==void 0&&(this.material.uniforms.uCloudSpeed.value=e.cloudSpeed),e.cloudOpacity!==void 0&&(this.material.uniforms.uCloudOpacity.value=e.cloudOpacity),e.atmosphereIntensity!==void 0&&(this.material.uniforms.uAtmosphereIntensity.value=e.atmosphereIntensity),e.gridLines!==void 0&&(this.material.uniforms.uGridLines.value=e.gridLines?1:0),e.gridOpacity!==void 0&&(this.material.uniforms.uGridOpacity.value=e.gridOpacity),e.glowPulse!==void 0&&(this.material.uniforms.uGlowPulse.value=e.glowPulse?1:0),e.starTwinkle!==void 0&&this.stars&&(this.stars.material.uniforms.uTwinkle.value=e.starTwinkle?1:0))}setMarkers(e,t){this.markerLayer?t&&this.markerLayer.setConfig(t):(this.markerLayer=new za(t),this.scene.add(this.markerLayer.getGroup()),this.markerLayer.setMorph(this.morph)),this.markerLayer.setMarkers(e)}async setUrbanData(e){if(!this.choropleth)return;this.urbanPoints=e;const t=this.config.pointRadius||140,i=await $a.mapPointsToTopology(e,t,!0);this.choropleth.setFeatures(i.features);const r=this.choropleth.getFeatureLabels();r.length>0&&this.addCustomLabels(r);let n=["#ffffb2","#fd8d3c","#bd0026"];if(this.currentStatistic){const c=this.getStatisticMetadata(this.currentStatistic);c&&c.definition.colorScale&&(n=c.definition.colorScale)}const s=Object.values(i.statistics),a=Math.max(...s,1);this.choropleth.renderCustomTexture(i.statistics,n,[0,a]),this.material&&this.material.uniforms.uDataTexture.value&&(this.material.uniforms.uDataTexture.value.needsUpdate=!0,this.material.uniforms.uDataOverlay.value=1);const l={};let u=!1;if(e.forEach(c=>{if(c.name||c.label){u=!0;const h=c.name||c.label||c.id||"Unknown";l[h]=c.value}}),this.currentValues=u?l:i.statistics,this.material&&(this.material.uniforms.uCityLights.value=1,this.config.effects.cityLights=!0),this.countryLabels&&(this.countryLabels.getGroup().visible=!0),this.gui){let c=this.gui.folders.find(f=>f._title==="Display");if(c||(c=this.gui.addFolder("Display")),!c.controllers.some(f=>f.property==="pointRadius")){const f={pointRadius:this.config.pointRadius||140},m=c.add(f,"pointRadius",10,500,5).name("Point Marker Radius").onChange(async d=>{this.config.pointRadius=d,this.urbanPoints&&await this.setUrbanData(this.urbanPoints)});this.addTooltip(m,"<b>Synthetic Geometry Radius</b><br><br>If our data consists of point locations (like cities) without defined 2D borders, we generate synthetic circular boundaries for them.<br><br>This control scales the size (in km) of these generated circles. Larger values make small cities more visible on the global map.")}}}resize(e,t){this.config.width=e,this.config.height=t,this.handleResize()}toggleProjection(){this.morph>.5?this.toFlat():this.toGlobe()}async toggleFullscreen(){document.fullscreenElement?(await document.exitFullscreen(),setTimeout(()=>this.handleResize(),100)):(await this.container.requestFullscreen(),setTimeout(()=>this.handleResize(),100))}isFullscreen(){return document.fullscreenElement===this.container}getCurrentData(){if(this.currentStatistic){if(this.currentValues){if(this.choropleth){const t={},i=Array.isArray(this.currentValues)?this.currentValues:Object.entries(this.currentValues);for(const[r,n]of i){const s=this.choropleth.getFeatureName(r)||r;t[s]=n}return t}return this.currentValues}const e=Ui.find(t=>t.id===this.currentStatistic);if(e){const t={},i=this.choropleth?.getStatsMap();return i&&i.size>0?i.forEach((n,s)=>{const a=e.accessor(n),l=n.name||s;a!=null&&(t[l]=a)}):st.forEach(n=>{const s=e.accessor(n);s!=null&&(t[n.name||n.code]=s)}),t}}return{}}destroy(){this.isDestroyed=!0,this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.handleResize),window.removeEventListener("keydown",this.handleKeydown),document.removeEventListener("fullscreenchange",this.handleFullscreenChange),this.gui?.destroy(),this.legend?.dispose(),this.countryLabels?.dispose(),this.markerLayer?.dispose(),this.controls?.dispose(),this.toolbar?.dispose(),this.dataGrid?.dispose(),document.querySelectorAll(".lil-gui-tooltip").forEach(e=>e.remove()),this.globe?.geometry.dispose(),this.globe?.material?.dispose(),this.atmosphere?.geometry.dispose(),this.atmosphere?.material?.dispose(),this.stars?.geometry.dispose(),this.stars?.material?.dispose(),this.dataTexture?.dispose(),this.scene?.clear();try{this.renderer?.dispose(),this.renderer?.forceContextLoss(),this.renderer?.getContext()?.getExtension("WEBGL_lose_context")?.loseContext()}catch(e){console.warn("Error forcing context loss:",e)}this.renderer?.domElement&&this.container?.contains(this.renderer.domElement)&&this.container.removeChild(this.renderer.domElement),this.renderer=null,this.scene=null,this.camera=null}addTooltip(e,t){const i=e.domElement;i&&(i.title=t.replace(/<br>/g,`
`).replace(/<b>|<\/b>/g,""),i.parentElement.addEventListener("mouseenter",r=>{const n=document.createElement("div");n.className="lil-gui-tooltip",n.innerHTML=t,n.style.position="fixed",n.style.background="rgba(0, 0, 0, 0.9)",n.style.color="#fff",n.style.padding="8px 12px",n.style.borderRadius="4px",n.style.fontSize="12px",n.style.maxWidth="200px",n.style.pointerEvents="none",n.style.zIndex="10000",n.style.border="1px solid #333",n.style.boxShadow="0 4px 12px rgba(0,0,0,0.5)",document.body.appendChild(n);const s=l=>{n.style.left=l.clientX+10+"px",n.style.top=l.clientY+10+"px"};window.addEventListener("mousemove",s);const a=()=>{n.remove(),window.removeEventListener("mousemove",s),i.parentElement.removeEventListener("mouseleave",a)};i.parentElement.addEventListener("mouseleave",a)}))}getStatisticMetadata(e){if(Ct[e]){const i=Ct[e],r=Ui.find(s=>s.id===e),n={};return r&&st.forEach(s=>{const a=r.accessor(s);a!=null&&(n[s.id]=a)}),{definition:i,values:n}}const t=Ui.find(i=>i.id===e);if(t){const i={};return st.forEach(r=>{const n=t.accessor(r);n!=null&&(i[r.id]=n)}),{definition:{id:t.id,name:t.name,unit:t.unit,description:t.description,colorScale:t.colorScale,domain:t.domain,format:t.format},values:i}}return null}}Z.BUILT_IN_STATISTICS=Ct,Z.GlobeViz=Ga,Z.WORLD_STATISTICS=st,Z.createFormatter=Gi,Z.formatValue=Aa,Z.normalizeCountryValues=ln,Z.toNumericCode=zi,Object.defineProperty(Z,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=gralobe.umd.cjs.map
