(function(q,at){typeof exports=="object"&&typeof module<"u"?at(exports,require("three"),require("three/examples/jsm/controls/OrbitControls.js"),require("three/examples/jsm/renderers/CSS2DRenderer.js")):typeof define=="function"&&define.amd?define(["exports","three","three/examples/jsm/controls/OrbitControls.js","three/examples/jsm/renderers/CSS2DRenderer.js"],at):(q=typeof globalThis<"u"?globalThis:q||self,at(q.Gralobe={},q.THREE,q.OrbitControls_js,q.CSS2DRenderer_js))})(this,(function(q,at,bn,Ht){"use strict";function vn(o){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(o){for(const t in o)if(t!=="default"){const i=Object.getOwnPropertyDescriptor(o,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>o[t]})}}return e.default=o,Object.freeze(e)}const A=vn(at);function be(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function Bi(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.__proto__=e}var se={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},We={duration:.5,overwrite:!1,delay:0},jt,W,F,he=1e8,R=1/he,Yt=Math.PI*2,En=Yt/4,wn=0,Gi=Math.sqrt,Cn=Math.cos,Pn=Math.sin,j=function(e){return typeof e=="string"},$=function(e){return typeof e=="function"},ve=function(e){return typeof e=="number"},Wt=function(e){return typeof e>"u"},me=function(e){return typeof e=="object"},Q=function(e){return e!==!1},Zt=function(){return typeof window<"u"},Pt=function(e){return $(e)||j(e)},Vi=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Z=Array.isArray,Xt=/(?:-?\.?\d|\.)+/gi,Hi=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ze=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,qt=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ji=/[+-]=-?[.\d]+/,Yi=/[^,'"\[\]\s]+/gi,An=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,z,ge,Kt,Jt,ae={},At={},Wi,Zi=function(e){return(At=qe(e,ae))&&ie},Qt=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ot=function(e,t){return!t&&console.warn(e)},Xi=function(e,t){return e&&(ae[e]=t)&&At&&(At[e]=t)||ae},lt=function(){return 0},Sn={suppressEvents:!0,isStart:!0,kill:!1},St={suppressEvents:!0,kill:!1},Tn={suppressEvents:!0},ei={},Pe=[],ti={},qi,oe={},ii={},Ki=30,Tt=[],ri="",ni=function(e){var t=e[0],i,r;if(me(t)||$(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Tt.length;r--&&!Tt[r].targetTest(t););i=Tt[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ar(e[r],i)))||e.splice(r,1);return e},Oe=function(e){return e._gsap||ni(fe(e))[0]._gsap},Ji=function(e,t,i){return(i=e[t])&&$(i)?e[t]():Wt(i)&&e.getAttribute&&e.getAttribute(t)||i},ee=function(e,t){return(e=e.split(",")).forEach(t)||e},G=function(e){return Math.round(e*1e5)/1e5||0},V=function(e){return Math.round(e*1e7)/1e7||0},Xe=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},Mn=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Mt=function(){var e=Pe.length,t=Pe.slice(0),i,r;for(ti={},Pe.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},si=function(e){return!!(e._initted||e._startAt||e.add)},Qi=function(e,t,i,r){Pe.length&&!W&&Mt(),e.render(t,i,!!(W&&t<0&&si(e))),Pe.length&&!W&&Mt()},er=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Yi).length<2?t:j(e)?e.trim():e},tr=function(e){return e},le=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Dn=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},qe=function(e,t){for(var i in t)e[i]=t[i];return e},ir=function o(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=me(t[i])?o(e[i]||(e[i]={}),t[i]):t[i]);return e},Dt=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},ct=function(e){var t=e.parent||z,i=e.keyframes?Dn(Z(e.keyframes)):le;if(Q(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},In=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},rr=function(e,t,i,r,n){var s=e[r],a;if(n)for(a=t[n];s&&s[n]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=s,t.parent=t._dp=e,t},It=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var n=t._prev,s=t._next;n?n._next=s:e[i]===t&&(e[i]=s),s?s._prev=n:e[r]===t&&(e[r]=n),t._next=t._prev=t.parent=null},Ae=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ke=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Ln=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ai=function(e,t,i,r){return e._startAt&&(W?e._startAt.revert(St):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Rn=function o(e){return!e||e._ts&&o(e.parent)},nr=function(e){return e._repeat?Ke(e._tTime,e=e.duration()+e._rDelay)*e:0},Ke=function(e,t){var i=Math.floor(e=V(e/t));return e&&i===e?i-1:i},Lt=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Rt=function(e){return e._end=V(e._start+(e._tDur/Math.abs(e._ts||e._rts||R)||0))},Ot=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=V(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Rt(e),i._dirty||ke(i,e)),e},sr=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Lt(e.rawTime(),t),(!t._dur||ht(0,t.totalDuration(),i)-t._tTime>R)&&t.render(i,!0)),ke(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-R}},ye=function(e,t,i,r){return t.parent&&Ae(t),t._start=V((ve(i)?i:i||e!==z?de(e,i,t):e._time)+t._delay),t._end=V(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),rr(e,t,"_first","_last",e._sort?"_start":0),oi(t)||(e._recent=t),r||sr(e,t),e._ts<0&&Ot(e,e._tTime),e},ar=function(e,t){return(ae.ScrollTrigger||Qt("scrollTrigger",t))&&ae.ScrollTrigger.create(t,e)},or=function(e,t,i,r,n){if(gi(e,t,n),!e._initted)return 1;if(!i&&e._pt&&!W&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&qi!==ue.frame)return Pe.push(e),e._lazy=[n,r],1},On=function o(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||o(t))},oi=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},kn=function(e,t,i,r){var n=e.ratio,s=t<0||!t&&(!e._start&&On(e)&&!(!e._initted&&oi(e))||(e._ts<0||e._dp._ts<0)&&!oi(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=ht(0,e._tDur,t),u=Ke(l,a),e._yoyo&&u&1&&(s=1-s),u!==Ke(e._tTime,a)&&(n=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==n||W||r||e._zTime===R||!t&&e._zTime){if(!e._initted&&or(e,t,r,i,l))return;for(h=e._zTime,e._zTime=t||(i?R:0),i||(i=t&&!h),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&ai(e,t,i,!0),e._onUpdate&&!i&&ce(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&ce(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Ae(e,1),!i&&!W&&(ce(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Fn=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Je=function(e,t,i,r){var n=e._repeat,s=V(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=s/e._dur),e._dur=s,e._tDur=n?n<0?1e10:V(s*(n+1)+e._rDelay*n):s,a>0&&!r&&Ot(e,e._tTime=e._tDur*a),e.parent&&Rt(e),i||ke(e.parent,e),e},lr=function(e){return e instanceof K?ke(e):Je(e,e._dur)},Un={_start:0,endTime:lt,totalDuration:lt},de=function o(e,t,i){var r=e.labels,n=e._recent||Un,s=e.duration()>=he?n.endTime(!1):e._dur,a,l,c;return j(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?n:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=s),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(Z(i)?i[0]:i).totalDuration()),a>1?o(e,t.substr(0,a-1),i)+l:s+l)):t==null?s:+t},ut=function(e,t,i){var r=ve(t[1]),n=(r?2:1)+(e<2?0:1),s=t[n],a,l;if(r&&(s.duration=t[1]),s.parent=i,e){for(a=s,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Q(l.vars.inherit)&&l.parent;s.immediateRender=Q(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[n-1]}return new H(t[0],s,t[n+1])},Se=function(e,t){return e||e===0?t(e):t},ht=function(e,t,i){return i<e?e:i>t?t:i},X=function(e,t){return!j(e)||!(t=An.exec(e))?"":t[1]},zn=function(e,t,i){return Se(i,function(r){return ht(e,t,r)})},li=[].slice,cr=function(e,t){return e&&me(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&me(e[0]))&&!e.nodeType&&e!==ge},Nn=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var n;return j(r)&&!t||cr(r,1)?(n=i).push.apply(n,fe(r)):i.push(r)})||i},fe=function(e,t,i){return F&&!t&&F.selector?F.selector(e):j(e)&&!i&&(Kt||!et())?li.call((t||Jt).querySelectorAll(e),0):Z(e)?Nn(e,i):cr(e)?li.call(e,0):e?[e]:[]},ci=function(e){return e=fe(e)[0]||ot("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return fe(t,i.querySelectorAll?i:i===e?ot("Invalid scope")||Jt.createElement("div"):e)}},ur=function(e){return e.sort(function(){return .5-Math.random()})},hr=function(e){if($(e))return e;var t=me(e)?e:{each:e},i=Fe(t.ease),r=t.from||0,n=parseFloat(t.base)||0,s={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,h=r;return j(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(f,p,m){var d=(m||t).length,g=s[d],y,_,x,v,b,C,E,P,w;if(!g){if(w=t.grid==="auto"?0:(t.grid||[1,he])[1],!w){for(E=-he;E<(E=m[w++].getBoundingClientRect().left)&&w<d;);w<d&&w--}for(g=s[d]=[],y=l?Math.min(w,d)*u-.5:r%w,_=w===he?0:l?d*h/w-.5:r/w|0,E=0,P=he,C=0;C<d;C++)x=C%w-y,v=_-(C/w|0),g[C]=b=c?Math.abs(c==="y"?v:x):Gi(x*x+v*v),b>E&&(E=b),b<P&&(P=b);r==="random"&&ur(g),g.max=E-P,g.min=P,g.v=d=(parseFloat(t.amount)||parseFloat(t.each)*(w>d?d-1:c?c==="y"?d/w:w:Math.max(w,d/w))||0)*(r==="edges"?-1:1),g.b=d<0?n-d:n,g.u=X(t.amount||t.each)||0,i=i&&d<0?wr(i):i}return d=(g[f]-g.min)/g.max||0,V(g.b+(i?i(d):d)*g.v)+g.u}},ui=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=V(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(ve(i)?0:X(i))}},dr=function(e,t){var i=Z(e),r,n;return!i&&me(e)&&(r=i=e.radius||he,e.values?(e=fe(e.values),(n=!ve(e[0]))&&(r*=r)):e=ui(e.increment)),Se(t,i?$(e)?function(s){return n=e(s),Math.abs(n-s)<=r?n:s}:function(s){for(var a=parseFloat(n?s.x:s),l=parseFloat(n?s.y:0),c=he,u=0,h=e.length,f,p;h--;)n?(f=e[h].x-a,p=e[h].y-l,f=f*f+p*p):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!r||c<=r?e[u]:s,n||u===s||ve(s)?u:u+X(s)}:ui(e))},fr=function(e,t,i,r){return Se(Z(e)?!t:i===!0?!!(i=0):!r,function(){return Z(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},$n=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(n,s){return s(n)},r)}},Bn=function(e,t){return function(i){return e(parseFloat(i))+(t||X(i))}},Gn=function(e,t,i){return mr(e,t,0,1,i)},pr=function(e,t,i){return Se(i,function(r){return e[~~t(r)]})},Vn=function o(e,t,i){var r=t-e;return Z(e)?pr(e,o(0,e.length),t):Se(i,function(n){return(r+(n-e)%r)%r+e})},Hn=function o(e,t,i){var r=t-e,n=r*2;return Z(e)?pr(e,o(0,e.length-1),t):Se(i,function(s){return s=(n+(s-e)%n)%n||0,e+(s>r?n-s:s)})},dt=function(e){for(var t=0,i="",r,n,s,a;~(r=e.indexOf("random(",t));)s=e.indexOf(")",r),a=e.charAt(r+7)==="[",n=e.substr(r+7,s-r-7).match(a?Yi:Xt),i+=e.substr(t,r-t)+fr(a?n:+n[0],a?0:+n[1],+n[2]||1e-5),t=s+1;return i+e.substr(t,e.length-t)},mr=function(e,t,i,r,n){var s=t-e,a=r-i;return Se(n,function(l){return i+((l-e)/s*a||0)})},jn=function o(e,t,i,r){var n=isNaN(e+t)?0:function(p){return(1-p)*e+p*t};if(!n){var s=j(e),a={},l,c,u,h,f;if(i===!0&&(r=1)&&(i=null),s)e={p:e},t={p:t};else if(Z(e)&&!Z(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(o(e[c-1],e[c]));h--,n=function(m){m*=h;var d=Math.min(f,~~m);return u[d](m-d)},i=t}else r||(e=qe(Z(e)?[]:{},e));if(!u){for(l in t)pi.call(a,e,l,"get",t[l]);n=function(m){return xi(m,a)||(s?e.p:e)}}}return Se(i,n)},gr=function(e,t,i){var r=e.labels,n=he,s,a,l;for(s in r)a=r[s]-t,a<0==!!i&&a&&n>(a=Math.abs(a))&&(l=s,n=a);return l},ce=function(e,t,i){var r=e.vars,n=r[t],s=F,a=e._ctx,l,c,u;if(n)return l=r[t+"Params"],c=r.callbackScope||e,i&&Pe.length&&Mt(),a&&(F=a),u=l?n.apply(c,l):n.call(c),F=s,u},ft=function(e){return Ae(e),e.scrollTrigger&&e.scrollTrigger.kill(!!W),e.progress()<1&&ce(e,"onInterrupt"),e},Qe,yr=[],_r=function(e){if(e)if(e=!e.name&&e.default||e,Zt()||e.headless){var t=e.name,i=$(e),r=t&&!i&&e.init?function(){this._props=[]}:e,n={init:lt,render:xi,add:pi,kill:os,modifier:as,rawVars:0},s={targetTest:0,get:0,getSetter:_i,aliases:{},register:0};if(et(),e!==r){if(oe[t])return;le(r,le(Dt(e,n),s)),qe(r.prototype,qe(n,Dt(e,s))),oe[r.prop=t]=r,e.targetTest&&(Tt.push(r),ei[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Xi(t,r),e.register&&e.register(ie,r,te)}else yr.push(e)},O=255,pt={aqua:[0,O,O],lime:[0,O,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,O],navy:[0,0,128],white:[O,O,O],olive:[128,128,0],yellow:[O,O,0],orange:[O,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[O,0,0],pink:[O,192,203],cyan:[0,O,O],transparent:[O,O,O,0]},hi=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*O+.5|0},xr=function(e,t,i){var r=e?ve(e)?[e>>16,e>>8&O,e&O]:0:pt.black,n,s,a,l,c,u,h,f,p,m;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),pt[e])r=pt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(n=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+n+n+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&O,r&O,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&O,e&O]}else if(e.substr(0,3)==="hsl"){if(r=m=e.match(Xt),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,s=u<=.5?u*(c+1):u+c-u*c,n=u*2-s,r.length>3&&(r[3]*=1),r[0]=hi(l+1/3,n,s),r[1]=hi(l,n,s),r[2]=hi(l-1/3,n,s);else if(~e.indexOf("="))return r=e.match(Hi),i&&r.length<4&&(r[3]=1),r}else r=e.match(Xt)||pt.transparent;r=r.map(Number)}return t&&!m&&(n=r[0]/O,s=r[1]/O,a=r[2]/O,h=Math.max(n,s,a),f=Math.min(n,s,a),u=(h+f)/2,h===f?l=c=0:(p=h-f,c=u>.5?p/(2-h-f):p/(h+f),l=h===n?(s-a)/p+(s<a?6:0):h===s?(a-n)/p+2:(n-s)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},br=function(e){var t=[],i=[],r=-1;return e.split(Te).forEach(function(n){var s=n.match(Ze)||[];t.push.apply(t,s),i.push(r+=s.length+1)}),t.c=i,t},vr=function(e,t,i){var r="",n=(e+r).match(Te),s=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!n)return e;if(n=n.map(function(f){return(f=xr(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(u=br(e),l=i.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Te,"1").split(Ze),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?n.shift()||s+"0,0,0,0)":(u.length?u:n.length?n:i).shift());if(!c)for(c=e.split(Te),h=c.length-1;a<h;a++)r+=c[a]+n[a];return r+c[h]},Te=(function(){var o="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in pt)o+="|"+e+"\\b";return new RegExp(o+")","gi")})(),Yn=/hsl[a]?\(/,Er=function(e){var t=e.join(" "),i;if(Te.lastIndex=0,Te.test(t))return i=Yn.test(t),e[1]=vr(e[1],i),e[0]=vr(e[0],i,br(e[1])),!0},mt,ue=(function(){var o=Date.now,e=500,t=33,i=o(),r=i,n=1e3/240,s=n,a=[],l,c,u,h,f,p,m=function d(g){var y=o()-r,_=g===!0,x,v,b,C;if((y>e||y<0)&&(i+=y-t),r+=y,b=r-i,x=b-s,(x>0||_)&&(C=++h.frame,f=b-h.time*1e3,h.time=b=b/1e3,s+=x+(x>=n?4:n-x),v=1),_||(l=c(d)),v)for(p=0;p<a.length;p++)a[p](b,f,C,g)};return h={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){Wi&&(!Kt&&Zt()&&(ge=Kt=window,Jt=ge.document||{},ae.gsap=ie,(ge.gsapVersions||(ge.gsapVersions=[])).push(ie.version),Zi(At||ge.GreenSockGlobals||!ge.gsap&&ge||{}),yr.forEach(_r)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(g){return setTimeout(g,s-h.time*1e3+1|0)},mt=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),mt=0,c=lt},lagSmoothing:function(g,y){e=g||1/0,t=Math.min(y||33,e)},fps:function(g){n=1e3/(g||240),s=h.time*1e3+n},add:function(g,y,_){var x=y?function(v,b,C,E){g(v,b,C,E),h.remove(x)}:g;return h.remove(g),a[_?"unshift":"push"](x),et(),x},remove:function(g,y){~(y=a.indexOf(g))&&a.splice(y,1)&&p>=y&&p--},_listeners:a},h})(),et=function(){return!mt&&ue.wake()},M={},Wn=/^[\d.\-M][\d.\-,\s]/,Zn=/["']/g,Xn=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],n=1,s=i.length,a,l,c;n<s;n++)l=i[n],a=n!==s-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(Zn,"").trim():+c,r=l.substr(a+1).trim();return t},qn=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},Kn=function(e){var t=(e+"").split("("),i=M[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Xn(t[1])]:qn(e).split(",").map(er)):M._CE&&Wn.test(e)?M._CE("",e):i},wr=function(e){return function(t){return 1-e(1-t)}},Cr=function o(e,t){for(var i=e._first,r;i;)i instanceof K?o(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?o(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},Fe=function(e,t){return e&&($(e)?e:M[e]||Kn(e))||t},Ue=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var n={easeIn:t,easeOut:i,easeInOut:r},s;return ee(e,function(a){M[a]=ae[a]=n,M[s=a.toLowerCase()]=i;for(var l in n)M[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=M[a+"."+l]=n[l]}),n},Pr=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},di=function o(e,t,i){var r=t>=1?t:1,n=(i||(e?.3:.45))/(t<1?t:1),s=n/Yt*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Pn((u-s)*n)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Pr(a);return n=Yt/n,l.config=function(c,u){return o(e,c,u)},l},fi=function o(e,t){t===void 0&&(t=1.70158);var i=function(s){return s?--s*s*((t+1)*s+t)+1:0},r=e==="out"?i:e==="in"?function(n){return 1-i(1-n)}:Pr(i);return r.config=function(n){return o(e,n)},r};ee("Linear,Quad,Cubic,Quart,Quint,Strong",function(o,e){var t=e<5?e+1:e;Ue(o+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})}),M.Linear.easeNone=M.none=M.Linear.easeIn,Ue("Elastic",di("in"),di("out"),di()),(function(o,e){var t=1/e,i=2*t,r=2.5*t,n=function(a){return a<t?o*a*a:a<i?o*Math.pow(a-1.5/e,2)+.75:a<r?o*(a-=2.25/e)*a+.9375:o*Math.pow(a-2.625/e,2)+.984375};Ue("Bounce",function(s){return 1-n(1-s)},n)})(7.5625,2.75),Ue("Expo",function(o){return Math.pow(2,10*(o-1))*o+o*o*o*o*o*o*(1-o)}),Ue("Circ",function(o){return-(Gi(1-o*o)-1)}),Ue("Sine",function(o){return o===1?1:-Cn(o*En)+1}),Ue("Back",fi("in"),fi("out"),fi()),M.SteppedEase=M.steps=ae.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),n=t?1:0,s=1-R;return function(a){return((r*ht(0,s,a)|0)+n)*i}}},We.ease=M["quad.out"],ee("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(o){return ri+=o+","+o+"Params,"});var Ar=function(e,t){this.id=wn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ji,this.set=t?t.getSetter:_i},gt=(function(){function o(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Je(this,+t.duration,1,1),this.data=t.data,F&&(this._ctx=F,F.data.push(this)),mt||ue.wake()}var e=o.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Je(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(et(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Ot(this,i),!n._dp||n.parent||sr(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ye(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===R||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Qi(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+nr(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+nr(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*n,r):this._repeat?Ke(this._tTime,n)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-R?0:this._rts;if(this._rts===i)return this;var n=this.parent&&this._ts?Lt(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-R?0:this._rts,this.totalTime(ht(-Math.abs(this._delay),this.totalDuration(),n),r!==!1),Rt(this),Ln(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(et(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==R&&(this._tTime-=R)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ye(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Q(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Lt(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Tn);var r=W;return W=i,si(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),W=r,this},e.globalTime=function(i){for(var r=this,n=arguments.length?i:r.rawTime();r;)n=r._start+n/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):n},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,lr(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,lr(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(de(this,i),Q(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Q(r)),this._dur||(this._zTime=-R),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-R:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-R,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,n;return!!(!i||this._ts&&this._initted&&i.isActive()&&(n=i.rawTime(!0))>=r&&n<this.endTime(!0)-R)},e.eventCallback=function(i,r,n){var s=this.vars;return arguments.length>1?(r?(s[i]=r,n&&(s[i+"Params"]=n),i==="onUpdate"&&(this._onUpdate=r)):delete s[i],this):s[i]},e.then=function(i){var r=this;return new Promise(function(n){var s=$(i)?i:tr,a=function(){var c=r.then;r.then=null,$(s)&&(s=s(r))&&(s.then||s===r)&&(r.then=c),n(s),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){ft(this)},o})();le(gt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-R,_prom:0,_ps:!1,_rts:1});var K=(function(o){Bi(e,o);function e(i,r){var n;return i===void 0&&(i={}),n=o.call(this,i)||this,n.labels={},n.smoothChildTiming=!!i.smoothChildTiming,n.autoRemoveChildren=!!i.autoRemoveChildren,n._sort=Q(i.sortChildren),z&&ye(i.parent||z,be(n),r),i.reversed&&n.reverse(),i.paused&&n.paused(!0),i.scrollTrigger&&ar(be(n),i.scrollTrigger),n}var t=e.prototype;return t.to=function(r,n,s){return ut(0,arguments,this),this},t.from=function(r,n,s){return ut(1,arguments,this),this},t.fromTo=function(r,n,s,a){return ut(2,arguments,this),this},t.set=function(r,n,s){return n.duration=0,n.parent=this,ct(n).repeatDelay||(n.repeat=0),n.immediateRender=!!n.immediateRender,new H(r,n,de(this,s),1),this},t.call=function(r,n,s){return ye(this,H.delayedCall(0,r,n),s)},t.staggerTo=function(r,n,s,a,l,c,u){return s.duration=n,s.stagger=s.stagger||a,s.onComplete=c,s.onCompleteParams=u,s.parent=this,new H(r,s,de(this,l)),this},t.staggerFrom=function(r,n,s,a,l,c,u){return s.runBackwards=1,ct(s).immediateRender=Q(s.immediateRender),this.staggerTo(r,n,s,a,l,c,u)},t.staggerFromTo=function(r,n,s,a,l,c,u,h){return a.startAt=s,ct(a).immediateRender=Q(a.immediateRender),this.staggerTo(r,n,a,l,c,u,h)},t.render=function(r,n,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:V(r),h=this._zTime<0!=r<0&&(this._initted||!c),f,p,m,d,g,y,_,x,v,b,C,E;if(this!==z&&u>l&&r>=0&&(u=l),u!==this._tTime||s||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),f=u,v=this._start,x=this._ts,y=!x,h&&(c||(a=this._zTime),(r||!n)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,g=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(g*100+r,n,s);if(f=V(u%g),u===l?(d=this._repeat,f=c):(b=V(u/g),d=~~b,d&&d===b&&(f=c,d--),f>c&&(f=c)),b=Ke(this._tTime,g),!a&&this._tTime&&b!==d&&this._tTime-b*g-this._dur<=0&&(b=d),C&&d&1&&(f=c-f,E=1),d!==b&&!this._lock){var P=C&&b&1,w=P===(C&&d&1);if(d<b&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:V(d*g)),n,!c)._lock=0,this._tTime=u,!n&&this.parent&&ce(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!y)return this;Cr(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(_=Fn(this,V(a),V(f)),_&&(u-=f-(f=_._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!n&&!b&&(ce(this,"onStart"),this._tTime!==u))return this;if(f>=a&&r>=0)for(p=this._first;p;){if(m=p._next,(p._act||f>=p._start)&&p._ts&&_!==p){if(p.parent!==this)return this.render(r,n,s);if(p.render(p._ts>0?(f-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(f-p._start)*p._ts,n,s),f!==this._time||!this._ts&&!y){_=0,m&&(u+=this._zTime=-R);break}}p=m}else{p=this._last;for(var T=r<0?r:f;p;){if(m=p._prev,(p._act||T<=p._end)&&p._ts&&_!==p){if(p.parent!==this)return this.render(r,n,s);if(p.render(p._ts>0?(T-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(T-p._start)*p._ts,n,s||W&&si(p)),f!==this._time||!this._ts&&!y){_=0,m&&(u+=this._zTime=T?-R:R);break}}p=m}}if(_&&!n&&(this.pause(),_.render(f>=a?0:-R)._zTime=f>=a?1:-1,this._ts))return this._start=v,Rt(this),this.render(r,n,s);this._onUpdate&&!n&&ce(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ae(this,1),!n&&!(r<0&&!a)&&(u||a||!l)&&(ce(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,n){var s=this;if(ve(n)||(n=de(this,n,r)),!(r instanceof gt)){if(Z(r))return r.forEach(function(a){return s.add(a,n)}),this;if(j(r))return this.addLabel(r,n);if($(r))r=H.delayedCall(0,r);else return this}return this!==r?ye(this,r,n):this},t.getChildren=function(r,n,s,a){r===void 0&&(r=!0),n===void 0&&(n=!0),s===void 0&&(s=!0),a===void 0&&(a=-he);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof H?n&&l.push(c):(s&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,n,s)))),c=c._next;return l},t.getById=function(r){for(var n=this.getChildren(1,1,1),s=n.length;s--;)if(n[s].vars.id===r)return n[s]},t.remove=function(r){return j(r)?this.removeLabel(r):$(r)?this.killTweensOf(r):(r.parent===this&&It(this,r),r===this._recent&&(this._recent=this._last),ke(this))},t.totalTime=function(r,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=V(ue.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),o.prototype.totalTime.call(this,r,n),this._forcing=0,this):this._tTime},t.addLabel=function(r,n){return this.labels[r]=de(this,n),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,n,s){var a=H.delayedCall(0,n||lt,s);return a.data="isPause",this._hasPause=1,ye(this,a,de(this,r))},t.removePause=function(r){var n=this._first;for(r=de(this,r);n;)n._start===r&&n.data==="isPause"&&Ae(n),n=n._next},t.killTweensOf=function(r,n,s){for(var a=this.getTweensOf(r,s),l=a.length;l--;)Me!==a[l]&&a[l].kill(r,n);return this},t.getTweensOf=function(r,n){for(var s=[],a=fe(r),l=this._first,c=ve(n),u;l;)l instanceof H?Mn(l._targets,a)&&(c?(!Me||l._initted&&l._ts)&&l.globalTime(0)<=n&&l.globalTime(l.totalDuration())>n:!n||l.isActive())&&s.push(l):(u=l.getTweensOf(a,n)).length&&s.push.apply(s,u),l=l._next;return s},t.tweenTo=function(r,n){n=n||{};var s=this,a=de(s,r),l=n,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,p,m=H.to(s,le({ease:n.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:n.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale())||R,onStart:function(){if(s.pause(),!p){var g=n.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale());m._dur!==g&&Je(m,g,0,1).render(m._time,!0,!0),p=1}u&&u.apply(m,h||[])}},n));return f?m.render(0):m},t.tweenFromTo=function(r,n,s){return this.tweenTo(n,le({startAt:{time:de(this,r)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),gr(this,de(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),gr(this,de(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+R)},t.shiftChildren=function(r,n,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,c;a;)a._start>=s&&(a._start+=r,a._end+=r),a=a._next;if(n)for(c in l)l[c]>=s&&(l[c]+=r);return ke(this)},t.invalidate=function(r){var n=this._first;for(this._lock=0;n;)n.invalidate(r),n=n._next;return o.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var n=this._first,s;n;)s=n._next,this.remove(n),n=s;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),ke(this)},t.totalDuration=function(r){var n=0,s=this,a=s._last,l=he,c,u,h;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-r:r));if(s._dirty){for(h=s.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,ye(s,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(n-=u,(!h&&!s._dp||h&&h.smoothChildTiming)&&(s._start+=u/s._ts,s._time-=u,s._tTime-=u),s.shiftChildren(-u,!1,-1/0),l=0),a._end>n&&a._ts&&(n=a._end),a=c;Je(s,s===z&&s._time>n?s._time:n,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(r){if(z._ts&&(Qi(z,Lt(r,z)),qi=ue.frame),ue.frame>=Ki){Ki+=se.autoSleep||120;var n=z._first;if((!n||!n._ts)&&se.autoSleep&&ue._listeners.length<2){for(;n&&!n._ts;)n=n._next;n||ue.sleep()}}},e})(gt);le(K.prototype,{_lock:0,_hasPause:0,_forcing:0});var Jn=function(e,t,i,r,n,s,a){var l=new te(this._pt,e,t,0,1,Lr,null,n),c=0,u=0,h,f,p,m,d,g,y,_;for(l.b=i,l.e=r,i+="",r+="",(y=~r.indexOf("random("))&&(r=dt(r)),s&&(_=[i,r],s(_,e,t),i=_[0],r=_[1]),f=i.match(qt)||[];h=qt.exec(r);)m=h[0],d=r.substring(c,h.index),p?p=(p+1)%5:d.substr(-5)==="rgba("&&(p=1),m!==f[u++]&&(g=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:d||u===1?d:",",s:g,c:m.charAt(1)==="="?Xe(g,m)-g:parseFloat(m)-g,m:p&&p<4?Math.round:0},c=qt.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(ji.test(r)||y)&&(l.e=0),this._pt=l,l},pi=function(e,t,i,r,n,s,a,l,c,u){$(r)&&(r=r(n||0,e,s));var h=e[t],f=i!=="get"?i:$(h)?c?e[t.indexOf("set")||!$(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,p=$(h)?c?rs:Dr:yi,m;if(j(r)&&(~r.indexOf("random(")&&(r=dt(r)),r.charAt(1)==="="&&(m=Xe(f,r)+(X(f)||0),(m||m===0)&&(r=m))),!u||f!==r||mi)return!isNaN(f*r)&&r!==""?(m=new te(this._pt,e,t,+f||0,r-(f||0),typeof h=="boolean"?ss:Ir,0,p),c&&(m.fp=c),a&&m.modifier(a,this,e),this._pt=m):(!h&&!(t in e)&&Qt(t,r),Jn.call(this,e,t,f,r,p,l||se.stringFilter,c))},Qn=function(e,t,i,r,n){if($(e)&&(e=yt(e,n,t,i,r)),!me(e)||e.style&&e.nodeType||Z(e)||Vi(e))return j(e)?yt(e,n,t,i,r):e;var s={},a;for(a in e)s[a]=yt(e[a],n,t,i,r);return s},Sr=function(e,t,i,r,n,s){var a,l,c,u;if(oe[e]&&(a=new oe[e]).init(n,a.rawVars?t[e]:Qn(t[e],r,n,s,i),i,r,s)!==!1&&(i._pt=l=new te(i._pt,n,e,0,1,a.render,a,0,a.priority),i!==Qe))for(c=i._ptLookup[i._targets.indexOf(n)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Me,mi,gi=function o(e,t,i){var r=e.vars,n=r.ease,s=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,f=r.keyframes,p=r.autoRevert,m=e._dur,d=e._startAt,g=e._targets,y=e.parent,_=y&&y.data==="nested"?y.vars.targets:g,x=e._overwrite==="auto"&&!jt,v=e.timeline,b,C,E,P,w,T,D,S,I,L,B,U,k;if(v&&(!f||!n)&&(n="none"),e._ease=Fe(n,We.ease),e._yEase=h?wr(Fe(h===!0?n:h,We.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!v&&!!r.runBackwards,!v||f&&!r.stagger){if(S=g[0]?Oe(g[0]).harness:0,U=S&&r[S.prop],b=Dt(r,ei),d&&(d._zTime<0&&d.progress(1),t<0&&u&&a&&!p?d.render(-1,!0):d.revert(u&&m?St:Sn),d._lazy=0),s){if(Ae(e._startAt=H.set(g,le({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!d&&Q(l),startAt:null,delay:0,onUpdate:c&&function(){return ce(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W||!a&&!p)&&e._startAt.revert(St),a&&m&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&m&&!d){if(t&&(a=!1),E=le({overwrite:!1,data:"isFromStart",lazy:a&&!d&&Q(l),immediateRender:a,stagger:0,parent:y},b),U&&(E[S.prop]=U),Ae(e._startAt=H.set(g,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W?e._startAt.revert(St):e._startAt.render(-1,!0)),e._zTime=t,!a)o(e._startAt,R,R);else if(!t)return}for(e._pt=e._ptCache=0,l=m&&Q(l)||l&&!m,C=0;C<g.length;C++){if(w=g[C],D=w._gsap||ni(g)[C]._gsap,e._ptLookup[C]=L={},ti[D.id]&&Pe.length&&Mt(),B=_===g?C:_.indexOf(w),S&&(I=new S).init(w,U||b,e,B,_)!==!1&&(e._pt=P=new te(e._pt,w,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(ne){L[ne]=P}),I.priority&&(T=1)),!S||U)for(E in b)oe[E]&&(I=Sr(E,b,e,B,w,_))?I.priority&&(T=1):L[E]=P=pi.call(e,w,E,"get",b[E],B,_,0,r.stringFilter);e._op&&e._op[C]&&e.kill(w,e._op[C]),x&&e._pt&&(Me=e,z.killTweensOf(w,L,e.globalTime(t)),k=!e.parent,Me=0),e._pt&&l&&(ti[D.id]=1)}T&&Rr(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!k,f&&t<=0&&v.render(he,!0,!0)},es=function(e,t,i,r,n,s,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,p;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,p=e._targets.length;p--;){if(u=f[p][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return mi=1,e.vars[t]="+=0",gi(e,a),mi=0,l?ot(t+" not eligible for reset"):1;c.push(u)}for(p=c.length;p--;)h=c[p],u=h._pt||h,u.s=(r||r===0)&&!n?r:u.s+(r||0)+s*u.c,u.c=i-u.s,h.e&&(h.e=G(i)+X(h.e)),h.b&&(h.b=u.s+X(h.b))},ts=function(e,t){var i=e[0]?Oe(e[0]).harness:0,r=i&&i.aliases,n,s,a,l;if(!r)return t;n=qe({},t);for(s in r)if(s in n)for(l=r[s].split(","),a=l.length;a--;)n[l[a]]=n[s];return n},is=function(e,t,i,r){var n=t.ease||r||"power1.inOut",s,a;if(Z(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:n})});else for(s in t)a=i[s]||(i[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:n})},yt=function(e,t,i,r,n){return $(e)?e.call(t,i,r,n):j(e)&&~e.indexOf("random(")?dt(e):e},Tr=ri+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Mr={};ee(Tr+",id,stagger,delay,duration,paused,scrollTrigger",function(o){return Mr[o]=1});var H=(function(o){Bi(e,o);function e(i,r,n,s){var a;typeof r=="number"&&(n.duration=r,r=n,n=null),a=o.call(this,s?r:ct(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,p=l.overwrite,m=l.keyframes,d=l.defaults,g=l.scrollTrigger,y=l.yoyoEase,_=r.parent||z,x=(Z(i)||Vi(i)?ve(i[0]):"length"in r)?[i]:fe(i),v,b,C,E,P,w,T,D;if(a._targets=x.length?ni(x):ot("GSAP target "+i+" not found. https://gsap.com",!se.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,m||f||Pt(c)||Pt(u)){if(r=a.vars,v=a.timeline=new K({data:"nested",defaults:d||{},targets:_&&_.data==="nested"?_.vars.targets:x}),v.kill(),v.parent=v._dp=be(a),v._start=0,f||Pt(c)||Pt(u)){if(E=x.length,T=f&&hr(f),me(f))for(P in f)~Tr.indexOf(P)&&(D||(D={}),D[P]=f[P]);for(b=0;b<E;b++)C=Dt(r,Mr),C.stagger=0,y&&(C.yoyoEase=y),D&&qe(C,D),w=x[b],C.duration=+yt(c,be(a),b,w,x),C.delay=(+yt(u,be(a),b,w,x)||0)-a._delay,!f&&E===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(w,C,T?T(b,w,x):0),v._ease=M.none;v.duration()?c=u=0:a.timeline=0}else if(m){ct(le(v.vars.defaults,{ease:"none"})),v._ease=Fe(m.ease||r.ease||"none");var S=0,I,L,B;if(Z(m))m.forEach(function(U){return v.to(x,U,">")}),v.duration();else{C={};for(P in m)P==="ease"||P==="easeEach"||is(P,m[P],C,m.easeEach);for(P in C)for(I=C[P].sort(function(U,k){return U.t-k.t}),S=0,b=0;b<I.length;b++)L=I[b],B={ease:L.e,duration:(L.t-(b?I[b-1].t:0))/100*c},B[P]=L.v,v.to(x,B,S),S+=B.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return p===!0&&!jt&&(Me=be(a),z.killTweensOf(x),Me=0),ye(_,be(a),n),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!m&&a._start===V(_._time)&&Q(h)&&Rn(be(a))&&_.data!=="nested")&&(a._tTime=-R,a.render(Math.max(0,-u)||0)),g&&ar(be(a),g),a}var t=e.prototype;return t.render=function(r,n,s){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-R&&!u?l:r<R?0:r,f,p,m,d,g,y,_,x,v;if(!c)kn(this,r,n,s);else if(h!==this._tTime||!r||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,x=this.timeline,this._repeat){if(d=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(d*100+r,n,s);if(f=V(h%d),h===l?(m=this._repeat,f=c):(g=V(h/d),m=~~g,m&&m===g?(f=c,m--):f>c&&(f=c)),y=this._yoyo&&m&1,y&&(v=this._yEase,f=c-f),g=Ke(this._tTime,d),f===a&&!s&&this._initted&&m===g)return this._tTime=h,this;m!==g&&(x&&this._yEase&&Cr(x,y),this.vars.repeatRefresh&&!y&&!this._lock&&f!==d&&this._initted&&(this._lock=s=1,this.render(V(d*m),!0).invalidate()._lock=0))}if(!this._initted){if(or(this,u?r:f,s,n,h))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&m!==g))return this;if(c!==this._dur)return this.render(r,n,s)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=_=(v||this._ease)(f/c),this._from&&(this.ratio=_=1-_),!a&&h&&!n&&!g&&(ce(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(_,p.d),p=p._next;x&&x.render(r<0?r:x._dur*x._ease(f/this._dur),n,s)||this._startAt&&(this._zTime=r),this._onUpdate&&!n&&(u&&ai(this,r,n,s),ce(this,"onUpdate")),this._repeat&&m!==g&&this.vars.onRepeat&&!n&&this.parent&&ce(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&ai(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ae(this,1),!n&&!(u&&!a)&&(h||a||y)&&(ce(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),o.prototype.invalidate.call(this,r)},t.resetTo=function(r,n,s,a,l){mt||ue.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||gi(this,c),u=this._ease(c/this._dur),es(this,r,n,s,a,u,c,l)?this.resetTo(r,n,s,a,1):(Ot(this,0),this.parent||rr(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,n){if(n===void 0&&(n="all"),!r&&(!n||n==="all"))return this._lazy=this._pt=0,this.parent?ft(this):this.scrollTrigger&&this.scrollTrigger.kill(!!W),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(r,n,Me&&Me.vars.overwrite!==!0)._first||ft(this),this.parent&&s!==this.timeline.totalDuration()&&Je(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=r?fe(r):a,c=this._ptLookup,u=this._pt,h,f,p,m,d,g,y;if((!n||n==="all")&&In(a,l))return n==="all"&&(this._pt=0),ft(this);for(h=this._op=this._op||[],n!=="all"&&(j(n)&&(d={},ee(n,function(_){return d[_]=1}),n=d),n=ts(a,n)),y=a.length;y--;)if(~l.indexOf(a[y])){f=c[y],n==="all"?(h[y]=n,m=f,p={}):(p=h[y]=h[y]||{},m=n);for(d in m)g=f&&f[d],g&&((!("kill"in g.d)||g.d.kill(d)===!0)&&It(this,g,"_pt"),delete f[d]),p!=="all"&&(p[d]=1)}return this._initted&&!this._pt&&u&&ft(this),this},e.to=function(r,n){return new e(r,n,arguments[2])},e.from=function(r,n){return ut(1,arguments)},e.delayedCall=function(r,n,s,a){return new e(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:n,onReverseComplete:n,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(r,n,s){return ut(2,arguments)},e.set=function(r,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new e(r,n)},e.killTweensOf=function(r,n,s){return z.killTweensOf(r,n,s)},e})(gt);le(H.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ee("staggerTo,staggerFrom,staggerFromTo",function(o){H[o]=function(){var e=new K,t=li.call(arguments,0);return t.splice(o==="staggerFromTo"?5:4,0,0),e[o].apply(e,t)}});var yi=function(e,t,i){return e[t]=i},Dr=function(e,t,i){return e[t](i)},rs=function(e,t,i,r){return e[t](r.fp,i)},ns=function(e,t,i){return e.setAttribute(t,i)},_i=function(e,t){return $(e[t])?Dr:Wt(e[t])&&e.setAttribute?ns:yi},Ir=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},ss=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Lr=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},xi=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},as=function(e,t,i,r){for(var n=this._pt,s;n;)s=n._next,n.p===r&&n.modifier(e,t,i),n=s},os=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?It(this,t,"_pt"):t.dep||(i=1),t=r;return!i},ls=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Rr=function(e){for(var t=e._pt,i,r,n,s;t;){for(i=t._next,r=n;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:s)?t._prev._next=t:n=t,(t._next=r)?r._prev=t:s=t,t=i}e._pt=n},te=(function(){function o(t,i,r,n,s,a,l,c,u){this.t=i,this.s=n,this.c=s,this.p=r,this.r=a||Ir,this.d=l||this,this.set=c||yi,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=o.prototype;return e.modifier=function(i,r,n){this.mSet=this.mSet||this.set,this.set=ls,this.m=i,this.mt=n,this.tween=r},o})();ee(ri+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(o){return ei[o]=1}),ae.TweenMax=ae.TweenLite=H,ae.TimelineLite=ae.TimelineMax=K,z=new K({sortChildren:!1,defaults:We,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),se.stringFilter=Er;var ze=[],kt={},cs=[],Or=0,us=0,bi=function(e){return(kt[e]||cs).map(function(t){return t()})},vi=function(){var e=Date.now(),t=[];e-Or>2&&(bi("matchMediaInit"),ze.forEach(function(i){var r=i.queries,n=i.conditions,s,a,l,c;for(a in r)s=ge.matchMedia(r[a]).matches,s&&(l=1),s!==n[a]&&(n[a]=s,c=1);c&&(i.revert(),l&&t.push(i))}),bi("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Or=e,bi("matchMedia"))},kr=(function(){function o(t,i){this.selector=i&&ci(i),this.data=[],this._r=[],this.isReverted=!1,this.id=us++,t&&this.add(t)}var e=o.prototype;return e.add=function(i,r,n){$(i)&&(n=r,r=i,i=$);var s=this,a=function(){var c=F,u=s.selector,h;return c&&c!==s&&c.data.push(s),n&&(s.selector=ci(n)),F=s,h=r.apply(s,arguments),$(h)&&s._r.push(h),F=c,s.selector=u,s.isReverted=!1,h};return s.last=a,i===$?a(s,function(l){return s.add(null,l)}):i?s[i]=a:a},e.ignore=function(i){var r=F;F=null,i(this),F=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof o?i.push.apply(i,r.getTweens()):r instanceof H&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var n=this;if(i?(function(){for(var a=n.getTweens(),l=n.data.length,c;l--;)c=n.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=n.data.length;l--;)c=n.data[l],c instanceof K?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof H)&&c.revert&&c.revert(i);n._r.forEach(function(u){return u(i,n)}),n.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var s=ze.length;s--;)ze[s].id===this.id&&ze.splice(s,1)},e.revert=function(i){this.kill(i||{})},o})(),hs=(function(){function o(t){this.contexts=[],this.scope=t,F&&F.data.push(this)}var e=o.prototype;return e.add=function(i,r,n){me(i)||(i={matches:i});var s=new kr(0,n||this.scope),a=s.conditions={},l,c,u;F&&!s.selector&&(s.selector=F.selector),this.contexts.push(s),r=s.add("onMatch",r),s.queries=i;for(c in i)c==="all"?u=1:(l=ge.matchMedia(i[c]),l&&(ze.indexOf(s)<0&&ze.push(s),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(vi):l.addEventListener("change",vi)));return u&&r(s,function(h){return s.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},o})(),Ft={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return _r(r)})},timeline:function(e){return new K(e)},getTweensOf:function(e,t){return z.getTweensOf(e,t)},getProperty:function(e,t,i,r){j(e)&&(e=fe(e)[0]);var n=Oe(e||{}).get,s=i?tr:er;return i==="native"&&(i=""),e&&(t?s((oe[t]&&oe[t].get||n)(e,t,i,r)):function(a,l,c){return s((oe[a]&&oe[a].get||n)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=fe(e),e.length>1){var r=e.map(function(u){return ie.quickSetter(u,t,i)}),n=r.length;return function(u){for(var h=n;h--;)r[h](u)}}e=e[0]||{};var s=oe[t],a=Oe(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=s?function(u){var h=new s;Qe._pt=0,h.init(e,i?u+i:u,Qe,0,[e]),h.render(1,h),Qe._pt&&xi(1,Qe)}:a.set(e,l);return s?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,n=ie.to(e,le((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),s=function(l,c,u){return n.resetTo(t,l,c,u)};return s.tween=n,s},isTweening:function(e){return z.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Fe(e.ease,We.ease)),ir(We,e||{})},config:function(e){return ir(se,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,n=e.defaults,s=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!oe[a]&&!ae[a]&&ot(t+" effect requires "+a+" plugin.")}),ii[t]=function(a,l,c){return i(fe(a),le(l||{},n),c)},s&&(K.prototype[t]=function(a,l,c){return this.add(ii[t](a,me(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){M[e]=Fe(t)},parseEase:function(e,t){return arguments.length?Fe(e,t):M},getById:function(e){return z.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new K(e),r,n;for(i.smoothChildTiming=Q(e.smoothChildTiming),z.remove(i),i._dp=0,i._time=i._tTime=z._time,r=z._first;r;)n=r._next,(t||!(!r._dur&&r instanceof H&&r.vars.onComplete===r._targets[0]))&&ye(i,r,r._start-r._delay),r=n;return ye(z,i,0),i},context:function(e,t){return e?new kr(e,t):F},matchMedia:function(e){return new hs(e)},matchMediaRefresh:function(){return ze.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||vi()},addEventListener:function(e,t){var i=kt[e]||(kt[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=kt[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:Vn,wrapYoyo:Hn,distribute:hr,random:fr,snap:dr,normalize:Gn,getUnit:X,clamp:zn,splitColor:xr,toArray:fe,selector:ci,mapRange:mr,pipe:$n,unitize:Bn,interpolate:jn,shuffle:ur},install:Zi,effects:ii,ticker:ue,updateRoot:K.updateRoot,plugins:oe,globalTimeline:z,core:{PropTween:te,globals:Xi,Tween:H,Timeline:K,Animation:gt,getCache:Oe,_removeLinkedListItem:It,reverting:function(){return W},context:function(e){return e&&F&&(F.data.push(e),e._ctx=F),F},suppressOverwrites:function(e){return jt=e}}};ee("to,from,fromTo,delayedCall,set,killTweensOf",function(o){return Ft[o]=H[o]}),ue.add(K.updateRoot),Qe=Ft.to({},{duration:0});var ds=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},fs=function(e,t){var i=e._targets,r,n,s;for(r in t)for(n=i.length;n--;)s=e._ptLookup[n][r],s&&(s=s.d)&&(s._pt&&(s=ds(s,r)),s&&s.modifier&&s.modifier(t[r],e,i[n],r))},Ei=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,n,s){s._onInit=function(a){var l,c;if(j(n)&&(l={},ee(n,function(u){return l[u]=1}),n=l),t){l={};for(c in n)l[c]=t(n[c]);n=l}fs(a,n)}}}},ie=Ft.registerPlugin({name:"attr",init:function(e,t,i,r,n){var s,a,l;this.tween=i;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],r,n,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var i=t._pt;i;)W?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Ei("roundProps",ui),Ei("modifiers"),Ei("snap",dr))||Ft;H.version=K.version=ie.version="3.13.0",Wi=1,Zt()&&et(),M.Power0,M.Power1,M.Power2,M.Power3,M.Power4,M.Linear,M.Quad,M.Cubic,M.Quart,M.Quint,M.Strong,M.Elastic,M.Back,M.SteppedEase,M.Bounce,M.Sine,M.Expo,M.Circ;var Fr,De,tt,wi,Ne,Ur,Ci,ps=function(){return typeof window<"u"},Ee={},$e=180/Math.PI,it=Math.PI/180,rt=Math.atan2,zr=1e8,Pi=/([A-Z])/g,ms=/(left|right|width|margin|padding|x)/i,gs=/[\s,\(]\S/,_e={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ai=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ys=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},_s=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},xs=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Nr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},$r=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},bs=function(e,t,i){return e.style[t]=i},vs=function(e,t,i){return e.style.setProperty(t,i)},Es=function(e,t,i){return e._gsap[t]=i},ws=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Cs=function(e,t,i,r,n){var s=e._gsap;s.scaleX=s.scaleY=i,s.renderTransform(n,s)},Ps=function(e,t,i,r,n){var s=e._gsap;s[t]=i,s.renderTransform(n,s)},N="transform",re=N+"Origin",As=function o(e,t){var i=this,r=this.target,n=r.style,s=r._gsap;if(e in Ee&&n){if(this.tfm=this.tfm||{},e!=="transform")e=_e[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=we(r,a)}):this.tfm[e]=s.x?s[e]:we(r,e),e===re&&(this.tfm.zOrigin=s.zOrigin);else return _e.transform.split(",").forEach(function(a){return o.call(i,a,t)});if(this.props.indexOf(N)>=0)return;s.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(re,t,"")),e=N}(n||t)&&this.props.push(e,t,n[e])},Br=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Ss=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,n,s;for(n=0;n<e.length;n+=3)e[n+1]?e[n+1]===2?t[e[n]](e[n+2]):t[e[n]]=e[n+2]:e[n+2]?i[e[n]]=e[n+2]:i.removeProperty(e[n].substr(0,2)==="--"?e[n]:e[n].replace(Pi,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)r[s]=this.tfm[s];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),n=Ci(),(!n||!n.isStart)&&!i[N]&&(Br(i),r.zOrigin&&i[re]&&(i[re]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Gr=function(e,t){var i={target:e,props:[],revert:Ss,save:As};return e._gsap||ie.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},Vr,Si=function(e,t){var i=De.createElementNS?De.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):De.createElement(e);return i&&i.style?i:De.createElement(e)},pe=function o(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Pi,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&o(e,nt(t)||t,1)||""},Hr="O,Moz,ms,Ms,Webkit".split(","),nt=function(e,t,i){var r=t||Ne,n=r.style,s=5;if(e in n&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Hr[s]+e in n););return s<0?null:(s===3?"ms":s>=0?Hr[s]:"")+e},Ti=function(){ps()&&window.document&&(Fr=window,De=Fr.document,tt=De.documentElement,Ne=Si("div")||{style:{}},Si("div"),N=nt(N),re=N+"Origin",Ne.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Vr=!!nt("perspective"),Ci=ie.core.reverting,wi=1)},jr=function(e){var t=e.ownerSVGElement,i=Si("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),n;r.style.display="block",i.appendChild(r),tt.appendChild(i);try{n=r.getBBox()}catch{}return i.removeChild(r),tt.removeChild(i),n},Yr=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Wr=function(e){var t,i;try{t=e.getBBox()}catch{t=jr(e),i=1}return t&&(t.width||t.height)||i||(t=jr(e)),t&&!t.width&&!t.x&&!t.y?{x:+Yr(e,["x","cx","x1"])||0,y:+Yr(e,["y","cy","y1"])||0,width:0,height:0}:t},Zr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Wr(e))},Be=function(e,t){if(t){var i=e.style,r;t in Ee&&t!==re&&(t=N),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Pi,"-$1").toLowerCase())):i.removeAttribute(t)}},Ie=function(e,t,i,r,n,s){var a=new te(e._pt,t,i,0,1,s?$r:Nr);return e._pt=a,a.b=r,a.e=n,e._props.push(i),a},Xr={deg:1,rad:1,turn:1},Ts={grid:1,flex:1},Le=function o(e,t,i,r){var n=parseFloat(i)||0,s=(i+"").trim().substr((n+"").length)||"px",a=Ne.style,l=ms.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=r==="px",p=r==="%",m,d,g,y;if(r===s||!n||Xr[r]||Xr[s])return n;if(s!=="px"&&!f&&(n=o(e,t,i,"px")),y=e.getCTM&&Zr(e),(p||s==="%")&&(Ee[t]||~t.indexOf("adius")))return m=y?e.getBBox()[l?"width":"height"]:e[u],G(p?n/m*h:n/100*m);if(a[l?"width":"height"]=h+(f?s:r),d=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,y&&(d=(e.ownerSVGElement||{}).parentNode),(!d||d===De||!d.appendChild)&&(d=De.body),g=d._gsap,g&&p&&g.width&&l&&g.time===ue.time&&!g.uncache)return G(n/g.width*h);if(p&&(t==="height"||t==="width")){var _=e.style[t];e.style[t]=h+r,m=e[u],_?e.style[t]=_:Be(e,t)}else(p||s==="%")&&!Ts[pe(d,"display")]&&(a.position=pe(e,"position")),d===e&&(a.position="static"),d.appendChild(Ne),m=Ne[u],d.removeChild(Ne),a.position="absolute";return l&&p&&(g=Oe(d),g.time=ue.time,g.width=d[u]),G(f?m*n/h:m&&n?h/m*n:0)},we=function(e,t,i,r){var n;return wi||Ti(),t in _e&&t!=="transform"&&(t=_e[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ee[t]&&t!=="transform"?(n=xt(e,r),n=t!=="transformOrigin"?n[t]:n.svg?n.origin:zt(pe(e,re))+" "+n.zOrigin+"px"):(n=e.style[t],(!n||n==="auto"||r||~(n+"").indexOf("calc("))&&(n=Ut[t]&&Ut[t](e,t,i)||pe(e,t)||Ji(e,t)||(t==="opacity"?1:0))),i&&!~(n+"").trim().indexOf(" ")?Le(e,t,n,i)+i:n},Ms=function(e,t,i,r){if(!i||i==="none"){var n=nt(t,e,1),s=n&&pe(e,n,1);s&&s!==i?(t=n,i=s):t==="borderColor"&&(i=pe(e,"borderTopColor"))}var a=new te(this._pt,e.style,t,0,1,Lr),l=0,c=0,u,h,f,p,m,d,g,y,_,x,v,b;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=pe(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(d=e.style[t],e.style[t]=r,r=pe(e,t)||r,d?e.style[t]=d:Be(e,t)),u=[i,r],Er(u),i=u[0],r=u[1],f=i.match(Ze)||[],b=r.match(Ze)||[],b.length){for(;h=Ze.exec(r);)g=h[0],_=r.substring(l,h.index),m?m=(m+1)%5:(_.substr(-5)==="rgba("||_.substr(-5)==="hsla(")&&(m=1),g!==(d=f[c++]||"")&&(p=parseFloat(d)||0,v=d.substr((p+"").length),g.charAt(1)==="="&&(g=Xe(p,g)+v),y=parseFloat(g),x=g.substr((y+"").length),l=Ze.lastIndex-x.length,x||(x=x||se.units[t]||v,l===r.length&&(r+=x,a.e+=x)),v!==x&&(p=Le(e,t,d,x)||0),a._pt={_next:a._pt,p:_||c===1?_:",",s:p,c:y-p,m:m&&m<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?$r:Nr;return ji.test(r)&&(a.e=0),this._pt=a,a},qr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Ds=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=qr[i]||i,t[1]=qr[r]||r,t.join(" ")},Is=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,n=t.u,s=i._gsap,a,l,c;if(n==="all"||n===!0)r.cssText="",l=1;else for(n=n.split(","),c=n.length;--c>-1;)a=n[c],Ee[a]&&(l=1,a=a==="transformOrigin"?re:N),Be(i,a);l&&(Be(i,N),s&&(s.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",xt(i,1),s.uncache=1,Br(r)))}},Ut={clearProps:function(e,t,i,r,n){if(n.data!=="isFromStart"){var s=e._pt=new te(e._pt,t,i,0,0,Is);return s.u=r,s.pr=-10,s.tween=n,e._props.push(i),1}}},_t=[1,0,0,1,0,0],Kr={},Jr=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Qr=function(e){var t=pe(e,N);return Jr(t)?_t:t.substr(7).match(Hi).map(G)},Mi=function(e,t){var i=e._gsap||Oe(e),r=e.style,n=Qr(e),s,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,n=[l.a,l.b,l.c,l.d,l.e,l.f],n.join(",")==="1,0,0,1,0,0"?_t:n):(n===_t&&!e.offsetParent&&e!==tt&&!i.svg&&(l=r.display,r.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,tt.appendChild(e)),n=Qr(e),l?r.display=l:Be(e,"display"),c&&(a?s.insertBefore(e,a):s?s.appendChild(e):tt.removeChild(e))),t&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n)},Di=function(e,t,i,r,n,s){var a=e._gsap,l=n||Mi(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,p=l[0],m=l[1],d=l[2],g=l[3],y=l[4],_=l[5],x=t.split(" "),v=parseFloat(x[0])||0,b=parseFloat(x[1])||0,C,E,P,w;i?l!==_t&&(E=p*g-m*d)&&(P=v*(g/E)+b*(-d/E)+(d*_-g*y)/E,w=v*(-m/E)+b*(p/E)-(p*_-m*y)/E,v=P,b=w):(C=Wr(e),v=C.x+(~x[0].indexOf("%")?v/100*C.width:v),b=C.y+(~(x[1]||x[0]).indexOf("%")?b/100*C.height:b)),r||r!==!1&&a.smooth?(y=v-c,_=b-u,a.xOffset=h+(y*p+_*d)-y,a.yOffset=f+(y*m+_*g)-_):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=b,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[re]="0px 0px",s&&(Ie(s,a,"xOrigin",c,v),Ie(s,a,"yOrigin",u,b),Ie(s,a,"xOffset",h,a.xOffset),Ie(s,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+b)},xt=function(e,t){var i=e._gsap||new Ar(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,n=i.scaleX<0,s="px",a="deg",l=getComputedStyle(e),c=pe(e,re)||"0",u,h,f,p,m,d,g,y,_,x,v,b,C,E,P,w,T,D,S,I,L,B,U,k,ne,Et,wt,Ct,je,xn,Ce,Ye;return u=h=f=d=g=y=_=x=v=0,p=m=1,i.svg=!!(e.getCTM&&Zr(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[N]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[N]!=="none"?l[N]:"")),r.scale=r.rotate=r.translate="none"),E=Mi(e,i.svg),i.svg&&(i.uncache?(ne=e.getBBox(),c=i.xOrigin-ne.x+"px "+(i.yOrigin-ne.y)+"px",k=""):k=!t&&e.getAttribute("data-svg-origin"),Di(e,k||c,!!k||i.originIsAbsolute,i.smooth!==!1,E)),b=i.xOrigin||0,C=i.yOrigin||0,E!==_t&&(D=E[0],S=E[1],I=E[2],L=E[3],u=B=E[4],h=U=E[5],E.length===6?(p=Math.sqrt(D*D+S*S),m=Math.sqrt(L*L+I*I),d=D||S?rt(S,D)*$e:0,_=I||L?rt(I,L)*$e+d:0,_&&(m*=Math.abs(Math.cos(_*it))),i.svg&&(u-=b-(b*D+C*I),h-=C-(b*S+C*L))):(Ye=E[6],xn=E[7],wt=E[8],Ct=E[9],je=E[10],Ce=E[11],u=E[12],h=E[13],f=E[14],P=rt(Ye,je),g=P*$e,P&&(w=Math.cos(-P),T=Math.sin(-P),k=B*w+wt*T,ne=U*w+Ct*T,Et=Ye*w+je*T,wt=B*-T+wt*w,Ct=U*-T+Ct*w,je=Ye*-T+je*w,Ce=xn*-T+Ce*w,B=k,U=ne,Ye=Et),P=rt(-I,je),y=P*$e,P&&(w=Math.cos(-P),T=Math.sin(-P),k=D*w-wt*T,ne=S*w-Ct*T,Et=I*w-je*T,Ce=L*T+Ce*w,D=k,S=ne,I=Et),P=rt(S,D),d=P*$e,P&&(w=Math.cos(P),T=Math.sin(P),k=D*w+S*T,ne=B*w+U*T,S=S*w-D*T,U=U*w-B*T,D=k,B=ne),g&&Math.abs(g)+Math.abs(d)>359.9&&(g=d=0,y=180-y),p=G(Math.sqrt(D*D+S*S+I*I)),m=G(Math.sqrt(U*U+Ye*Ye)),P=rt(B,U),_=Math.abs(P)>2e-4?P*$e:0,v=Ce?1/(Ce<0?-Ce:Ce):0),i.svg&&(k=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Jr(pe(e,N)),k&&e.setAttribute("transform",k))),Math.abs(_)>90&&Math.abs(_)<270&&(n?(p*=-1,_+=d<=0?180:-180,d+=d<=0?180:-180):(m*=-1,_+=_<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+s,i.y=h-((i.yPercent=h&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+s,i.z=f+s,i.scaleX=G(p),i.scaleY=G(m),i.rotation=G(d)+a,i.rotationX=G(g)+a,i.rotationY=G(y)+a,i.skewX=_+a,i.skewY=x+a,i.transformPerspective=v+s,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[re]=zt(c)),i.xOffset=i.yOffset=0,i.force3D=se.force3D,i.renderTransform=i.svg?Rs:Vr?en:Ls,i.uncache=0,i},zt=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ii=function(e,t,i){var r=X(t);return G(parseFloat(t)+parseFloat(Le(e,"x",i+"px",r)))+r},Ls=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,en(e,t)},Ge="0deg",bt="0px",Ve=") ",en=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,s=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,h=i.rotationX,f=i.skewX,p=i.skewY,m=i.scaleX,d=i.scaleY,g=i.transformPerspective,y=i.force3D,_=i.target,x=i.zOrigin,v="",b=y==="auto"&&e&&e!==1||y===!0;if(x&&(h!==Ge||u!==Ge)){var C=parseFloat(u)*it,E=Math.sin(C),P=Math.cos(C),w;C=parseFloat(h)*it,w=Math.cos(C),s=Ii(_,s,E*w*-x),a=Ii(_,a,-Math.sin(C)*-x),l=Ii(_,l,P*w*-x+x)}g!==bt&&(v+="perspective("+g+Ve),(r||n)&&(v+="translate("+r+"%, "+n+"%) "),(b||s!==bt||a!==bt||l!==bt)&&(v+=l!==bt||b?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+Ve),c!==Ge&&(v+="rotate("+c+Ve),u!==Ge&&(v+="rotateY("+u+Ve),h!==Ge&&(v+="rotateX("+h+Ve),(f!==Ge||p!==Ge)&&(v+="skew("+f+", "+p+Ve),(m!==1||d!==1)&&(v+="scale("+m+", "+d+Ve),_.style[N]=v||"translate(0, 0)"},Rs=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,s=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,h=i.scaleX,f=i.scaleY,p=i.target,m=i.xOrigin,d=i.yOrigin,g=i.xOffset,y=i.yOffset,_=i.forceCSS,x=parseFloat(s),v=parseFloat(a),b,C,E,P,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=it,c*=it,b=Math.cos(l)*h,C=Math.sin(l)*h,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=it,w=Math.tan(c-u),w=Math.sqrt(1+w*w),E*=w,P*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),b*=w,C*=w)),b=G(b),C=G(C),E=G(E),P=G(P)):(b=h,P=f,C=E=0),(x&&!~(s+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Le(p,"x",s,"px"),v=Le(p,"y",a,"px")),(m||d||g||y)&&(x=G(x+m-(m*b+d*E)+g),v=G(v+d-(m*C+d*P)+y)),(r||n)&&(w=p.getBBox(),x=G(x+r/100*w.width),v=G(v+n/100*w.height)),w="matrix("+b+","+C+","+E+","+P+","+x+","+v+")",p.setAttribute("transform",w),_&&(p.style[N]=w)},Os=function(e,t,i,r,n){var s=360,a=j(n),l=parseFloat(n)*(a&&~n.indexOf("rad")?$e:1),c=l-r,u=r+c+"deg",h,f;return a&&(h=n.split("_")[1],h==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-s)),h==="cw"&&c<0?c=(c+s*zr)%s-~~(c/s)*s:h==="ccw"&&c>0&&(c=(c-s*zr)%s-~~(c/s)*s)),e._pt=f=new te(e._pt,t,i,r,c,ys),f.e=u,f.u="deg",e._props.push(i),f},tn=function(e,t){for(var i in t)e[i]=t[i];return e},ks=function(e,t,i){var r=tn({},i._gsap),n="perspective,force3D,transformOrigin,svgOrigin",s=i.style,a,l,c,u,h,f,p,m;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),s[N]=t,a=xt(i,1),Be(i,N),i.setAttribute("transform",c)):(c=getComputedStyle(i)[N],s[N]=t,a=xt(i,1),s[N]=c);for(l in Ee)c=r[l],u=a[l],c!==u&&n.indexOf(l)<0&&(p=X(c),m=X(u),h=p!==m?Le(i,l,c,m):parseFloat(c),f=parseFloat(u),e._pt=new te(e._pt,a,l,h,f-h,Ai),e._pt.u=m||0,e._props.push(l));tn(a,r)};ee("padding,margin,Width,Radius",function(o,e){var t="Top",i="Right",r="Bottom",n="Left",s=(e<3?[t,i,r,n]:[t+n,t+i,r+i,r+n]).map(function(a){return e<2?o+a:"border"+a+o});Ut[e>1?"border"+o:o]=function(a,l,c,u,h){var f,p;if(arguments.length<4)return f=s.map(function(m){return we(a,m,c)}),p=f.join(" "),p.split(f[0]).length===5?f[0]:p;f=(u+"").split(" "),p={},s.forEach(function(m,d){return p[m]=f[d]=f[d]||f[(d-1)/2|0]}),a.init(l,p,h)}});var rn={name:"css",register:Ti,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,n){var s=this._props,a=e.style,l=i.vars.startAt,c,u,h,f,p,m,d,g,y,_,x,v,b,C,E,P;wi||Ti(),this.styles=this.styles||Gr(e),P=this.styles.props,this.tween=i;for(d in t)if(d!=="autoRound"&&(u=t[d],!(oe[d]&&Sr(d,t,i,r,e,n)))){if(p=typeof u,m=Ut[d],p==="function"&&(u=u.call(i,r,e,n),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=dt(u)),m)m(this,e,d,u,i)&&(E=1);else if(d.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(d)+"").trim(),u+="",Te.lastIndex=0,Te.test(c)||(g=X(c),y=X(u)),y?g!==y&&(c=Le(e,d,c,y)+y):g&&(u+=g),this.add(a,"setProperty",c,u,r,n,0,0,d),s.push(d),P.push(d,0,a[d]);else if(p!=="undefined"){if(l&&d in l?(c=typeof l[d]=="function"?l[d].call(i,r,e,n):l[d],j(c)&&~c.indexOf("random(")&&(c=dt(c)),X(c+"")||c==="auto"||(c+=se.units[d]||X(we(e,d))||""),(c+"").charAt(1)==="="&&(c=we(e,d))):c=we(e,d),f=parseFloat(c),_=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),_&&(u=u.substr(2)),h=parseFloat(u),d in _e&&(d==="autoAlpha"&&(f===1&&we(e,"visibility")==="hidden"&&h&&(f=0),P.push("visibility",0,a.visibility),Ie(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),d!=="scale"&&d!=="transform"&&(d=_e[d],~d.indexOf(",")&&(d=d.split(",")[0]))),x=d in Ee,x){if(this.styles.save(d),p==="string"&&u.substring(0,6)==="var(--"&&(u=pe(e,u.substring(4,u.indexOf(")"))),h=parseFloat(u)),v||(b=e._gsap,b.renderTransform&&!t.parseTransform||xt(e,t.parseTransform),C=t.smoothOrigin!==!1&&b.smooth,v=this._pt=new te(this._pt,a,N,0,1,b.renderTransform,b,0,-1),v.dep=1),d==="scale")this._pt=new te(this._pt,b,"scaleY",b.scaleY,(_?Xe(b.scaleY,_+h):h)-b.scaleY||0,Ai),this._pt.u=0,s.push("scaleY",d),d+="X";else if(d==="transformOrigin"){P.push(re,0,a[re]),u=Ds(u),b.svg?Di(e,u,0,C,0,this):(y=parseFloat(u.split(" ")[2])||0,y!==b.zOrigin&&Ie(this,b,"zOrigin",b.zOrigin,y),Ie(this,a,d,zt(c),zt(u)));continue}else if(d==="svgOrigin"){Di(e,u,1,C,0,this);continue}else if(d in Kr){Os(this,b,d,f,_?Xe(f,_+u):u);continue}else if(d==="smoothOrigin"){Ie(this,b,"smooth",b.smooth,u);continue}else if(d==="force3D"){b[d]=u;continue}else if(d==="transform"){ks(this,u,e);continue}}else d in a||(d=nt(d)||d);if(x||(h||h===0)&&(f||f===0)&&!gs.test(u)&&d in a)g=(c+"").substr((f+"").length),h||(h=0),y=X(u)||(d in se.units?se.units[d]:g),g!==y&&(f=Le(e,d,c,y)),this._pt=new te(this._pt,x?b:a,d,f,(_?Xe(f,_+h):h)-f,!x&&(y==="px"||d==="zIndex")&&t.autoRound!==!1?xs:Ai),this._pt.u=y||0,g!==y&&y!=="%"&&(this._pt.b=c,this._pt.r=_s);else if(d in a)Ms.call(this,e,d,c,_?_+u:u);else if(d in e)this.add(e,d,c||e[d],_?_+u:u,r,n);else if(d!=="parseTransform"){Qt(d,u);continue}x||(d in a?P.push(d,0,a[d]):typeof e[d]=="function"?P.push(d,2,e[d]()):P.push(d,1,c||e[d])),s.push(d)}}E&&Rr(this)},render:function(e,t){if(t.tween._time||!Ci())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:we,aliases:_e,getSetter:function(e,t,i){var r=_e[t];return r&&r.indexOf(",")<0&&(t=r),t in Ee&&t!==re&&(e._gsap.x||we(e,"x"))?i&&Ur===i?t==="scale"?ws:Es:(Ur=i||{})&&(t==="scale"?Cs:Ps):e.style&&!Wt(e.style[t])?bs:~t.indexOf("-")?vs:_i(e,t)},core:{_removeProperty:Be,_getMatrix:Mi}};ie.utils.checkPrefix=nt,ie.core.getStyleSaver=Gr,(function(o,e,t,i){var r=ee(o+","+e+","+t,function(n){Ee[n]=1});ee(e,function(n){se.units[n]="deg",Kr[n]=1}),_e[r[13]]=o+","+e,ee(i,function(n){var s=n.split(":");_e[s[1]]=r[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),ee("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(o){se.units[o]="px"}),ie.registerPlugin(rn);var Y=ie.registerPlugin(rn)||ie;Y.core.Tween;class xe{constructor(e,t,i,r,n="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(n),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),xe.nextNameID=xe.nextNameID||0,this.$name.id=`lil-gui-name-${++xe.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Fs extends xe{constructor(e,t,i){super(e,t,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Li(o){let e,t;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Us={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Li,toHexString:Li},vt={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},zs=[Us,vt,{isPrimitive:!1,match:o=>Array.isArray(o)||ArrayBuffer.isView(o),fromHexString(o,e,t=1){const i=vt.fromHexString(o);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([o,e,t],i=1){i=255/i;const r=o*i<<16^e*i<<8^t*i<<0;return vt.toHexString(r)}},{isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,t=1){const i=vt.fromHexString(o);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:o,g:e,b:t},i=1){i=255/i;const r=o*i<<16^e*i<<8^t*i<<0;return vt.toHexString(r)}}];function Ns(o){return zs.find(e=>e.match(o))}class $s extends xe{constructor(e,t,i,r){super(e,t,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ns(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Li(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Ri extends xe{constructor(e,t,i){super(e,t,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Bs extends xe{constructor(e,t,i,r,n,s){super(e,t,i,"lil-number"),this._initInput(),this.min(r),this.max(n);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let _=parseFloat(this.$input.value);isNaN(_)||(this._stepExplicit&&(_=this._snap(_)),this.setValue(this._clamp(_)))},i=_=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+_),this.$input.value=this.getValue())},r=_=>{_.key==="Enter"&&this.$input.blur(),_.code==="ArrowUp"&&(_.preventDefault(),i(this._step*this._arrowKeyMultiplier(_))),_.code==="ArrowDown"&&(_.preventDefault(),i(this._step*this._arrowKeyMultiplier(_)*-1))},n=_=>{this._inputFocused&&(_.preventDefault(),i(this._step*this._normalizeMouseWheel(_)))};let s=!1,a,l,c,u,h;const f=5,p=_=>{a=_.clientX,l=c=_.clientY,s=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",d)},m=_=>{if(s){const x=_.clientX-a,v=_.clientY-l;Math.abs(v)>f?(_.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>f&&d()}if(!s){const x=_.clientY-c;h-=x*this._step*this._arrowKeyMultiplier(_),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)}c=_.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",d)},g=()=>{this._inputFocused=!0},y=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",y)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(y,_,x,v,b)=>(y-_)/(x-_)*(b-v)+v,t=y=>{const _=this.$slider.getBoundingClientRect();let x=e(y,_.left,_.right,this._min,this._max);this._snapClampSetValue(x)},i=y=>{this._setDraggingStyle(!0),t(y.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",n)},r=y=>{t(y.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",n)};let s=!1,a,l;const c=y=>{y.preventDefault(),this._setDraggingStyle(!0),t(y.touches[0].clientX),s=!1},u=y=>{y.touches.length>1||(this._hasScrollBar?(a=y.touches[0].clientX,l=y.touches[0].clientY,s=!0):c(y),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",f))},h=y=>{if(s){const _=y.touches[0].clientX-a,x=y.touches[0].clientY-l;Math.abs(_)>Math.abs(x)?c(y):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",f))}else y.preventDefault(),t(y.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",f)},p=this._callOnFinishChange.bind(this),m=400;let d;const g=y=>{if(Math.abs(y.deltaX)<Math.abs(y.deltaY)&&this._hasScrollBar)return;y.preventDefault();const x=this._normalizeMouseWheel(y)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(p,m)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Gs extends xe{constructor(e,t,i,r){super(e,t,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Vs extends xe{constructor(e,t,i){super(e,t,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Hs=`.lil-gui {
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
}`;function js(o){const e=document.createElement("style");e.innerHTML=o;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let nn=!1;class Oi{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:r,title:n="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),l&&this.domElement.classList.add("lil-allow-touch-styles"),!nn&&a&&(js(Hs),nn=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=s}add(e,t,i,r,n){if(Object(i)===i)return new Gs(this,e,t,i);const s=e[t];switch(typeof s){case"number":return new Bs(this,e,t,i,r,n);case"boolean":return new Fs(this,e,t);case"string":return new Vs(this,e,t);case"function":return new Ri(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,s)}addColor(e,t,i=1){return new $s(this,e,t,i)}addFolder(e){const t=new Oi({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Ri||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Ri)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const ki=[{id:"156",code:"CN",name:"China",population:1412,gdpPerCapita:21476,co2Emissions:8,lifeExpectancy:78.2,humanDevIndex:.768,internetUsers:73,renewableEnergy:15,urbanPopulation:64.7,healthExpenditure:5.4,educationExpenditure:3.6,forestArea:23.3,accessElectricity:100},{id:"356",code:"IN",name:"India",population:1408,gdpPerCapita:8379,co2Emissions:1.9,lifeExpectancy:70.8,humanDevIndex:.633,internetUsers:47,renewableEnergy:38,urbanPopulation:35.9,healthExpenditure:3,educationExpenditure:4.5,forestArea:24.3,accessElectricity:99.6},{id:"840",code:"US",name:"United States",population:332,gdpPerCapita:76399,co2Emissions:14.4,lifeExpectancy:77.5,humanDevIndex:.921,internetUsers:92,renewableEnergy:13,urbanPopulation:83.1,healthExpenditure:18.3,educationExpenditure:6.1,forestArea:33.9,accessElectricity:100},{id:"360",code:"ID",name:"Indonesia",population:276,gdpPerCapita:14535,co2Emissions:2.3,lifeExpectancy:71.9,humanDevIndex:.705,internetUsers:62,renewableEnergy:12,urbanPopulation:57.9,healthExpenditure:2.9,educationExpenditure:3.5,forestArea:49.1,accessElectricity:99},{id:"586",code:"PK",name:"Pakistan",population:225,gdpPerCapita:6470,co2Emissions:1,lifeExpectancy:67.3,humanDevIndex:.544,internetUsers:21,renewableEnergy:34,urbanPopulation:37.4,healthExpenditure:2.8,educationExpenditure:2.3,forestArea:1.9,accessElectricity:95},{id:"076",code:"BR",name:"Brazil",population:215,gdpPerCapita:16154,co2Emissions:2.2,lifeExpectancy:76,humanDevIndex:.754,internetUsers:81,renewableEnergy:47,urbanPopulation:87.6,healthExpenditure:10.3,educationExpenditure:6.3,forestArea:59.4,accessElectricity:100},{id:"566",code:"NG",name:"Nigeria",population:219,gdpPerCapita:5860,co2Emissions:.6,lifeExpectancy:53.9,humanDevIndex:.535,internetUsers:36,renewableEnergy:86,urbanPopulation:53,healthExpenditure:3,educationExpenditure:.5,forestArea:7.2,accessElectricity:59.5},{id:"050",code:"BD",name:"Bangladesh",population:167,gdpPerCapita:7066,co2Emissions:.6,lifeExpectancy:73.2,humanDevIndex:.661,internetUsers:39,renewableEnergy:3,urbanPopulation:39.4,healthExpenditure:2.3,educationExpenditure:1.8,forestArea:11.2,accessElectricity:99.4},{id:"643",code:"RU",name:"Russia",population:144,gdpPerCapita:30820,co2Emissions:11.4,lifeExpectancy:72.8,humanDevIndex:.822,internetUsers:85,renewableEnergy:7,urbanPopulation:75.1,healthExpenditure:5.6,educationExpenditure:3.7,forestArea:49.8,accessElectricity:100},{id:"484",code:"MX",name:"Mexico",population:130,gdpPerCapita:20824,co2Emissions:3.5,lifeExpectancy:75.1,humanDevIndex:.758,internetUsers:72,renewableEnergy:9,urbanPopulation:81,healthExpenditure:5.4,educationExpenditure:4.3,forestArea:33.6,accessElectricity:100},{id:"392",code:"JP",name:"Japan",population:125,gdpPerCapita:45546,co2Emissions:8.5,lifeExpectancy:84.6,humanDevIndex:.925,internetUsers:93,renewableEnergy:12,urbanPopulation:91.9,healthExpenditure:11,educationExpenditure:3.4,forestArea:68.4,accessElectricity:100},{id:"231",code:"ET",name:"Ethiopia",population:121,gdpPerCapita:2771,co2Emissions:.2,lifeExpectancy:66.6,humanDevIndex:.498,internetUsers:17,renewableEnergy:93,urbanPopulation:22.2,healthExpenditure:3.5,educationExpenditure:4.5,forestArea:12.5,accessElectricity:51.1},{id:"608",code:"PH",name:"Philippines",population:115,gdpPerCapita:9746,co2Emissions:1.3,lifeExpectancy:72.1,humanDevIndex:.699,internetUsers:53,renewableEnergy:29,urbanPopulation:47.7,healthExpenditure:5.1,educationExpenditure:3.6,forestArea:27,accessElectricity:97.2},{id:"818",code:"EG",name:"Egypt",population:106,gdpPerCapita:14927,co2Emissions:2.4,lifeExpectancy:72,humanDevIndex:.731,internetUsers:72,renewableEnergy:10,urbanPopulation:42.8,healthExpenditure:4.6,educationExpenditure:4,forestArea:.1,accessElectricity:100},{id:"704",code:"VN",name:"Vietnam",population:99,gdpPerCapita:12756,co2Emissions:3.5,lifeExpectancy:75.8,humanDevIndex:.703,internetUsers:70,renewableEnergy:21,urbanPopulation:38.1,healthExpenditure:4.7,educationExpenditure:4.2,forestArea:47.6,accessElectricity:100},{id:"276",code:"DE",name:"Germany",population:84,gdpPerCapita:58780,co2Emissions:8.1,lifeExpectancy:81.4,humanDevIndex:.942,internetUsers:93,renewableEnergy:20,urbanPopulation:77.6,healthExpenditure:12.8,educationExpenditure:4.9,forestArea:32.7,accessElectricity:100},{id:"792",code:"TR",name:"Turkey",population:85,gdpPerCapita:36879,co2Emissions:4.8,lifeExpectancy:78.6,humanDevIndex:.838,internetUsers:83,renewableEnergy:17,urbanPopulation:76.6,healthExpenditure:4.3,educationExpenditure:3.1,forestArea:28.6,accessElectricity:100},{id:"364",code:"IR",name:"Iran",population:87,gdpPerCapita:16261,co2Emissions:8.3,lifeExpectancy:76.7,humanDevIndex:.774,internetUsers:78,renewableEnergy:6,urbanPopulation:76.3,healthExpenditure:5.2,educationExpenditure:3.6,forestArea:6.6,accessElectricity:100},{id:"764",code:"TH",name:"Thailand",population:70,gdpPerCapita:19169,co2Emissions:3.8,lifeExpectancy:79.3,humanDevIndex:.8,internetUsers:78,renewableEnergy:15,urbanPopulation:52.2,healthExpenditure:3.8,educationExpenditure:2.9,forestArea:38.8,accessElectricity:100},{id:"826",code:"GB",name:"United Kingdom",population:68,gdpPerCapita:49675,co2Emissions:4.7,lifeExpectancy:81.8,humanDevIndex:.929,internetUsers:97,renewableEnergy:15,urbanPopulation:84.2,healthExpenditure:12,educationExpenditure:5.5,forestArea:13.2,accessElectricity:100},{id:"250",code:"FR",name:"France",population:68,gdpPerCapita:50728,co2Emissions:4.3,lifeExpectancy:82.7,humanDevIndex:.903,internetUsers:91,renewableEnergy:12,urbanPopulation:81.5,healthExpenditure:12.2,educationExpenditure:5.5,forestArea:31.4,accessElectricity:100},{id:"380",code:"IT",name:"Italy",population:59,gdpPerCapita:45936,co2Emissions:5.3,lifeExpectancy:83.5,humanDevIndex:.895,internetUsers:86,renewableEnergy:20,urbanPopulation:71.3,healthExpenditure:8.7,educationExpenditure:4.3,forestArea:32.1,accessElectricity:100},{id:"710",code:"ZA",name:"South Africa",population:60,gdpPerCapita:15e3,co2Emissions:6.7,lifeExpectancy:65.3,humanDevIndex:.713,internetUsers:70,renewableEnergy:6,urbanPopulation:68,healthExpenditure:8.1,educationExpenditure:6.6,forestArea:7.6,accessElectricity:85},{id:"834",code:"TZ",name:"Tanzania",population:63,gdpPerCapita:2990,co2Emissions:.2,lifeExpectancy:66.2,humanDevIndex:.549,internetUsers:25,renewableEnergy:85,urbanPopulation:37,healthExpenditure:3.8,educationExpenditure:3.4,forestArea:48.1,accessElectricity:42.7},{id:"404",code:"KE",name:"Kenya",population:55,gdpPerCapita:5494,co2Emissions:.4,lifeExpectancy:67,humanDevIndex:.575,internetUsers:29,renewableEnergy:75,urbanPopulation:28.5,healthExpenditure:4.3,educationExpenditure:5.1,forestArea:7.8,accessElectricity:75},{id:"410",code:"KR",name:"South Korea",population:52,gdpPerCapita:50071,co2Emissions:11.5,lifeExpectancy:83.7,humanDevIndex:.925,internetUsers:97,renewableEnergy:4,urbanPopulation:81.4,healthExpenditure:8.4,educationExpenditure:5.1,forestArea:63.4,accessElectricity:100},{id:"170",code:"CO",name:"Colombia",population:52,gdpPerCapita:17063,co2Emissions:1.8,lifeExpectancy:77.3,humanDevIndex:.752,internetUsers:73,renewableEnergy:27,urbanPopulation:81.7,healthExpenditure:7.7,educationExpenditure:4.5,forestArea:52.7,accessElectricity:100},{id:"724",code:"ES",name:"Spain",population:47,gdpPerCapita:42190,co2Emissions:5,lifeExpectancy:83.6,humanDevIndex:.905,internetUsers:94,renewableEnergy:21,urbanPopulation:81.1,healthExpenditure:10.7,educationExpenditure:4.8,forestArea:37.4,accessElectricity:100},{id:"032",code:"AR",name:"Argentina",population:46,gdpPerCapita:24678,co2Emissions:3.8,lifeExpectancy:77.1,humanDevIndex:.842,internetUsers:87,renewableEnergy:13,urbanPopulation:92.2,healthExpenditure:10,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"800",code:"UG",name:"Uganda",population:48,gdpPerCapita:2566,co2Emissions:.1,lifeExpectancy:64.4,humanDevIndex:.525,internetUsers:18,renewableEnergy:89,urbanPopulation:25.6,healthExpenditure:3.8,educationExpenditure:2.7,forestArea:9.7,accessElectricity:46},{id:"012",code:"DZ",name:"Algeria",population:45,gdpPerCapita:12667,co2Emissions:3.7,lifeExpectancy:77.1,humanDevIndex:.745,internetUsers:71,renewableEnergy:1,urbanPopulation:74.3,healthExpenditure:5.3,educationExpenditure:5.6,forestArea:.8,accessElectricity:100},{id:"804",code:"UA",name:"Ukraine",population:41,gdpPerCapita:14220,co2Emissions:4.5,lifeExpectancy:72.1,humanDevIndex:.773,internetUsers:75,renewableEnergy:8,urbanPopulation:69.6,healthExpenditure:7,educationExpenditure:5.4,forestArea:16.7,accessElectricity:100},{id:"368",code:"IQ",name:"Iraq",population:43,gdpPerCapita:10474,co2Emissions:4,lifeExpectancy:71.1,humanDevIndex:.686,internetUsers:75,renewableEnergy:3,urbanPopulation:71.1,healthExpenditure:4.6,educationExpenditure:4.7,forestArea:1.9,accessElectricity:100},{id:"616",code:"PL",name:"Poland",population:38,gdpPerCapita:40343,co2Emissions:8,lifeExpectancy:78.7,humanDevIndex:.876,internetUsers:87,renewableEnergy:17,urbanPopulation:60,healthExpenditure:6.5,educationExpenditure:4.6,forestArea:30.9,accessElectricity:100},{id:"124",code:"CA",name:"Canada",population:39,gdpPerCapita:54966,co2Emissions:14.3,lifeExpectancy:82.4,humanDevIndex:.936,internetUsers:93,renewableEnergy:18,urbanPopulation:81.8,healthExpenditure:12.8,educationExpenditure:5.3,forestArea:38.7,accessElectricity:100},{id:"504",code:"MA",name:"Morocco",population:37,gdpPerCapita:9339,co2Emissions:1.9,lifeExpectancy:77,humanDevIndex:.683,internetUsers:84,renewableEnergy:13,urbanPopulation:64.6,healthExpenditure:5.3,educationExpenditure:6.8,forestArea:12.8,accessElectricity:100},{id:"682",code:"SA",name:"Saudi Arabia",population:36,gdpPerCapita:56817,co2Emissions:15.3,lifeExpectancy:76.9,humanDevIndex:.875,internetUsers:98,renewableEnergy:0,urbanPopulation:84.7,healthExpenditure:6.4,educationExpenditure:5.1,forestArea:.5,accessElectricity:100},{id:"604",code:"PE",name:"Peru",population:34,gdpPerCapita:14225,co2Emissions:1.6,lifeExpectancy:77.4,humanDevIndex:.762,internetUsers:71,renewableEnergy:25,urbanPopulation:78.6,healthExpenditure:5.2,educationExpenditure:4,forestArea:57.3,accessElectricity:97},{id:"036",code:"AU",name:"Australia",population:26,gdpPerCapita:59934,co2Emissions:15,lifeExpectancy:84,humanDevIndex:.951,internetUsers:96,renewableEnergy:12,urbanPopulation:86.4,healthExpenditure:10.7,educationExpenditure:6.1,forestArea:17.4,accessElectricity:100},{id:"458",code:"MY",name:"Malaysia",population:34,gdpPerCapita:33550,co2Emissions:7.6,lifeExpectancy:76.9,humanDevIndex:.803,internetUsers:90,renewableEnergy:8,urbanPopulation:78,healthExpenditure:3.8,educationExpenditure:3.9,forestArea:57.7,accessElectricity:100},{id:"288",code:"GH",name:"Ghana",population:33,gdpPerCapita:6754,co2Emissions:.6,lifeExpectancy:64.9,humanDevIndex:.632,internetUsers:53,renewableEnergy:42,urbanPopulation:58,healthExpenditure:3.4,educationExpenditure:4,forestArea:34.5,accessElectricity:85.9},{id:"524",code:"NP",name:"Nepal",population:30,gdpPerCapita:4199,co2Emissions:.5,lifeExpectancy:71.7,humanDevIndex:.602,internetUsers:48,renewableEnergy:86,urbanPopulation:21,healthExpenditure:4.4,educationExpenditure:4.2,forestArea:25.4,accessElectricity:90},{id:"862",code:"VE",name:"Venezuela",population:29,gdpPerCapita:7045,co2Emissions:3.1,lifeExpectancy:72.1,humanDevIndex:.691,internetUsers:72,renewableEnergy:68,urbanPopulation:88.3,healthExpenditure:3.9,educationExpenditure:6.9,forestArea:52.1,accessElectricity:99.9},{id:"450",code:"MG",name:"Madagascar",population:29,gdpPerCapita:1724,co2Emissions:.2,lifeExpectancy:67,humanDevIndex:.501,internetUsers:10,renewableEnergy:68,urbanPopulation:39.5,healthExpenditure:3.9,educationExpenditure:2.9,forestArea:21.4,accessElectricity:34},{id:"120",code:"CM",name:"Cameroon",population:28,gdpPerCapita:3977,co2Emissions:.4,lifeExpectancy:60.3,humanDevIndex:.576,internetUsers:34,renewableEnergy:74,urbanPopulation:58.4,healthExpenditure:3.3,educationExpenditure:3.2,forestArea:45.6,accessElectricity:65},{id:"528",code:"NL",name:"Netherlands",population:18,gdpPerCapita:64654,co2Emissions:8.1,lifeExpectancy:82.3,humanDevIndex:.941,internetUsers:98,renewableEnergy:13,urbanPopulation:92.5,healthExpenditure:11.2,educationExpenditure:5.3,forestArea:11.2,accessElectricity:100},{id:"152",code:"CL",name:"Chile",population:19,gdpPerCapita:28526,co2Emissions:4.3,lifeExpectancy:80.7,humanDevIndex:.855,internetUsers:88,renewableEnergy:27,urbanPopulation:87.9,healthExpenditure:9.3,educationExpenditure:5.4,forestArea:24.4,accessElectricity:100},{id:"752",code:"SE",name:"Sweden",population:10,gdpPerCapita:60239,co2Emissions:3.5,lifeExpectancy:83.2,humanDevIndex:.947,internetUsers:96,renewableEnergy:56,urbanPopulation:88.2,healthExpenditure:11.4,educationExpenditure:7.6,forestArea:68.9,accessElectricity:100},{id:"578",code:"NO",name:"Norway",population:5,gdpPerCapita:82236,co2Emissions:7.5,lifeExpectancy:83.2,humanDevIndex:.961,internetUsers:98,renewableEnergy:72,urbanPopulation:83.4,healthExpenditure:11.4,educationExpenditure:7.9,forestArea:33.2,accessElectricity:100},{id:"702",code:"SG",name:"Singapore",population:6,gdpPerCapita:116527,co2Emissions:8.9,lifeExpectancy:84.1,humanDevIndex:.939,internetUsers:96,renewableEnergy:2,urbanPopulation:100,healthExpenditure:6.1,educationExpenditure:2.9,forestArea:22.5,accessElectricity:100},{id:"554",code:"NZ",name:"New Zealand",population:5,gdpPerCapita:48249,co2Emissions:6.8,lifeExpectancy:82.5,humanDevIndex:.937,internetUsers:95,renewableEnergy:40,urbanPopulation:86.7,healthExpenditure:9.7,educationExpenditure:6.3,forestArea:38.6,accessElectricity:100},{id:"372",code:"IE",name:"Ireland",population:5,gdpPerCapita:106998,co2Emissions:7.3,lifeExpectancy:82.8,humanDevIndex:.945,internetUsers:94,renewableEnergy:14,urbanPopulation:64.2,healthExpenditure:7.1,educationExpenditure:3.5,forestArea:11,accessElectricity:100},{id:"376",code:"IL",name:"Israel",population:9,gdpPerCapita:52170,co2Emissions:6.9,lifeExpectancy:83.5,humanDevIndex:.919,internetUsers:90,renewableEnergy:6,urbanPopulation:92.8,healthExpenditure:7.5,educationExpenditure:7.1,forestArea:7.6,accessElectricity:100},{id:"784",code:"AE",name:"United Arab Emirates",population:10,gdpPerCapita:77272,co2Emissions:20.7,lifeExpectancy:78.7,humanDevIndex:.911,internetUsers:100,renewableEnergy:1,urbanPopulation:87.4,healthExpenditure:5,educationExpenditure:3.9,forestArea:4.5,accessElectricity:100},{id:"756",code:"CH",name:"Switzerland",population:9,gdpPerCapita:81867,co2Emissions:4,lifeExpectancy:84,humanDevIndex:.962,internetUsers:96,renewableEnergy:28,urbanPopulation:74,healthExpenditure:11.3,educationExpenditure:5,forestArea:31.9,accessElectricity:100},{id:"040",code:"AT",name:"Austria",population:9,gdpPerCapita:58013,co2Emissions:6.8,lifeExpectancy:82,humanDevIndex:.916,internetUsers:93,renewableEnergy:36,urbanPopulation:59,healthExpenditure:10.4,educationExpenditure:5.4,forestArea:47.3,accessElectricity:100},{id:"620",code:"PT",name:"Portugal",population:10,gdpPerCapita:38147,co2Emissions:4,lifeExpectancy:82.6,humanDevIndex:.866,internetUsers:85,renewableEnergy:34,urbanPopulation:66.8,healthExpenditure:10.6,educationExpenditure:5,forestArea:36.1,accessElectricity:100},{id:"300",code:"GR",name:"Greece",population:10,gdpPerCapita:33393,co2Emissions:5.3,lifeExpectancy:81.4,humanDevIndex:.887,internetUsers:79,renewableEnergy:22,urbanPopulation:80.1,healthExpenditure:7.8,educationExpenditure:4.4,forestArea:32.5,accessElectricity:100},{id:"203",code:"CZ",name:"Czech Republic",population:11,gdpPerCapita:45499,co2Emissions:9.3,lifeExpectancy:79.4,humanDevIndex:.889,internetUsers:88,renewableEnergy:17,urbanPopulation:74.1,healthExpenditure:9.2,educationExpenditure:4.4,forestArea:34.7,accessElectricity:100},{id:"056",code:"BE",name:"Belgium",population:12,gdpPerCapita:55521,co2Emissions:8,lifeExpectancy:82.2,humanDevIndex:.937,internetUsers:94,renewableEnergy:13,urbanPopulation:98.1,healthExpenditure:11.1,educationExpenditure:6.4,forestArea:22.8,accessElectricity:100},{id:"348",code:"HU",name:"Hungary",population:10,gdpPerCapita:37935,co2Emissions:4.6,lifeExpectancy:77,humanDevIndex:.846,internetUsers:89,renewableEnergy:14,urbanPopulation:72.3,healthExpenditure:6.4,educationExpenditure:4.6,forestArea:22.9,accessElectricity:100},{id:"246",code:"FI",name:"Finland",population:6,gdpPerCapita:53654,co2Emissions:6.5,lifeExpectancy:82.2,humanDevIndex:.94,internetUsers:96,renewableEnergy:44,urbanPopulation:85.5,healthExpenditure:9.6,educationExpenditure:6.3,forestArea:73.7,accessElectricity:100},{id:"208",code:"DK",name:"Denmark",population:6,gdpPerCapita:67803,co2Emissions:4.4,lifeExpectancy:81.6,humanDevIndex:.948,internetUsers:98,renewableEnergy:40,urbanPopulation:88.2,healthExpenditure:10.5,educationExpenditure:6.9,forestArea:14.7,accessElectricity:100},{id:"352",code:"IS",name:"Iceland",population:.4,gdpPerCapita:68727,co2Emissions:9.7,lifeExpectancy:83.1,humanDevIndex:.959,internetUsers:99,renewableEnergy:85,urbanPopulation:93.9,healthExpenditure:8.9,educationExpenditure:7.7,forestArea:.5,accessElectricity:100},{id:"180",code:"CD",name:"DR Congo",population:99,gdpPerCapita:1099,co2Emissions:.04,lifeExpectancy:60.7,humanDevIndex:.479,internetUsers:9,renewableEnergy:97,urbanPopulation:46.2,healthExpenditure:3.3,educationExpenditure:1.5,forestArea:67.3,accessElectricity:19.1},{id:"729",code:"SD",name:"Sudan",population:46,gdpPerCapita:4232,co2Emissions:.5,lifeExpectancy:66.1,humanDevIndex:.508,internetUsers:31,renewableEnergy:62,urbanPopulation:35.6,healthExpenditure:4.5,educationExpenditure:2.2,forestArea:9.7,accessElectricity:55.5},{id:"024",code:"AO",name:"Angola",population:35,gdpPerCapita:6938,co2Emissions:.8,lifeExpectancy:62,humanDevIndex:.586,internetUsers:36,renewableEnergy:55,urbanPopulation:68.1,healthExpenditure:2.6,educationExpenditure:2.4,forestArea:46.3,accessElectricity:46},{id:"508",code:"MZ",name:"Mozambique",population:33,gdpPerCapita:1346,co2Emissions:.2,lifeExpectancy:60.9,humanDevIndex:.456,internetUsers:10,renewableEnergy:79,urbanPopulation:38,healthExpenditure:7.5,educationExpenditure:5.5,forestArea:48.2,accessElectricity:31},{id:"384",code:"CI",name:"Ivory Coast",population:28,gdpPerCapita:5972,co2Emissions:.4,lifeExpectancy:59.3,humanDevIndex:.55,internetUsers:45,renewableEnergy:68,urbanPopulation:52.7,healthExpenditure:3.3,educationExpenditure:3.4,forestArea:9.3,accessElectricity:70},{id:"562",code:"NE",name:"Niger",population:26,gdpPerCapita:1318,co2Emissions:.1,lifeExpectancy:63,humanDevIndex:.4,internetUsers:5,renewableEnergy:80,urbanPopulation:16.8,healthExpenditure:5.2,educationExpenditure:3.5,forestArea:.9,accessElectricity:19.3},{id:"854",code:"BF",name:"Burkina Faso",population:22,gdpPerCapita:2445,co2Emissions:.2,lifeExpectancy:62.7,humanDevIndex:.449,internetUsers:18,renewableEnergy:79,urbanPopulation:31.5,healthExpenditure:5.6,educationExpenditure:5.4,forestArea:19.3,accessElectricity:19},{id:"466",code:"ML",name:"Mali",population:22,gdpPerCapita:2462,co2Emissions:.2,lifeExpectancy:59.3,humanDevIndex:.428,internetUsers:27,renewableEnergy:76,urbanPopulation:44.6,healthExpenditure:3.8,educationExpenditure:3.8,forestArea:3.9,accessElectricity:53},{id:"686",code:"SN",name:"Senegal",population:17,gdpPerCapita:3942,co2Emissions:.7,lifeExpectancy:68.6,humanDevIndex:.511,internetUsers:58,renewableEnergy:47,urbanPopulation:48.6,healthExpenditure:3.5,educationExpenditure:5.5,forestArea:42.5,accessElectricity:70.4},{id:"894",code:"ZM",name:"Zambia",population:20,gdpPerCapita:3574,co2Emissions:.4,lifeExpectancy:65,humanDevIndex:.565,internetUsers:16,renewableEnergy:88,urbanPopulation:45.2,healthExpenditure:4.9,educationExpenditure:4.6,forestArea:59.8,accessElectricity:43},{id:"716",code:"ZW",name:"Zimbabwe",population:16,gdpPerCapita:2622,co2Emissions:.8,lifeExpectancy:61.5,humanDevIndex:.593,internetUsers:35,renewableEnergy:78,urbanPopulation:32.2,healthExpenditure:3.4,educationExpenditure:5,forestArea:36.4,accessElectricity:49},{id:"646",code:"RW",name:"Rwanda",population:14,gdpPerCapita:2359,co2Emissions:.1,lifeExpectancy:69.6,humanDevIndex:.534,internetUsers:30,renewableEnergy:84,urbanPopulation:17.6,healthExpenditure:7.5,educationExpenditure:3.1,forestArea:28.8,accessElectricity:48},{id:"004",code:"AF",name:"Afghanistan",population:41,gdpPerCapita:2065,co2Emissions:.2,lifeExpectancy:62,humanDevIndex:.478,internetUsers:18,renewableEnergy:45,urbanPopulation:26.3,healthExpenditure:18.2,educationExpenditure:4.1,forestArea:1.9,accessElectricity:97.7},{id:"104",code:"MM",name:"Myanmar",population:55,gdpPerCapita:5699,co2Emissions:.6,lifeExpectancy:67.8,humanDevIndex:.585,internetUsers:44,renewableEnergy:51,urbanPopulation:31.4,healthExpenditure:4.8,educationExpenditure:2,forestArea:42.2,accessElectricity:70},{id:"408",code:"KP",name:"North Korea",population:26,gdpPerCapita:1800,co2Emissions:2,lifeExpectancy:72.6,humanDevIndex:.733,internetUsers:0,renewableEnergy:12,urbanPopulation:63,healthExpenditure:6,educationExpenditure:4,forestArea:41,accessElectricity:26},{id:"496",code:"MN",name:"Mongolia",population:3.4,gdpPerCapita:12896,co2Emissions:14,lifeExpectancy:70.9,humanDevIndex:.739,internetUsers:84,renewableEnergy:7,urbanPopulation:68.8,healthExpenditure:4,educationExpenditure:4.7,forestArea:7.1,accessElectricity:100},{id:"144",code:"LK",name:"Sri Lanka",population:22,gdpPerCapita:14509,co2Emissions:1,lifeExpectancy:77.4,humanDevIndex:.782,internetUsers:47,renewableEnergy:51,urbanPopulation:18.9,healthExpenditure:3.8,educationExpenditure:2.1,forestArea:29.4,accessElectricity:100},{id:"398",code:"KZ",name:"Kazakhstan",population:19,gdpPerCapita:30500,co2Emissions:13.2,lifeExpectancy:74.4,humanDevIndex:.811,internetUsers:91,renewableEnergy:2,urbanPopulation:57.8,healthExpenditure:2.8,educationExpenditure:2.9,forestArea:1.2,accessElectricity:100},{id:"860",code:"UZ",name:"Uzbekistan",population:35,gdpPerCapita:9127,co2Emissions:3.5,lifeExpectancy:73.8,humanDevIndex:.727,internetUsers:71,renewableEnergy:11,urbanPopulation:50.4,healthExpenditure:6.8,educationExpenditure:5.3,forestArea:7.7,accessElectricity:100},{id:"192",code:"CU",name:"Cuba",population:11,gdpPerCapita:9478,co2Emissions:2.3,lifeExpectancy:79,humanDevIndex:.764,internetUsers:71,renewableEnergy:32,urbanPopulation:77.2,healthExpenditure:11.7,educationExpenditure:12.8,forestArea:33,accessElectricity:100},{id:"218",code:"EC",name:"Ecuador",population:18,gdpPerCapita:12171,co2Emissions:2.3,lifeExpectancy:77.9,humanDevIndex:.74,internetUsers:70,renewableEnergy:31,urbanPopulation:64.2,healthExpenditure:8.3,educationExpenditure:4.4,forestArea:50.1,accessElectricity:100},{id:"320",code:"GT",name:"Guatemala",population:18,gdpPerCapita:9547,co2Emissions:1,lifeExpectancy:74.3,humanDevIndex:.627,internetUsers:51,renewableEnergy:62,urbanPopulation:52.4,healthExpenditure:5.8,educationExpenditure:3.4,forestArea:33,accessElectricity:98},{id:"068",code:"BO",name:"Bolivia",population:12,gdpPerCapita:9484,co2Emissions:1.8,lifeExpectancy:72.1,humanDevIndex:.692,internetUsers:66,renewableEnergy:24,urbanPopulation:70.4,healthExpenditure:6.9,educationExpenditure:7.3,forestArea:50.1,accessElectricity:99.3},{id:"340",code:"HN",name:"Honduras",population:10,gdpPerCapita:6289,co2Emissions:1,lifeExpectancy:75.3,humanDevIndex:.621,internetUsers:48,renewableEnergy:61,urbanPopulation:59,healthExpenditure:7.9,educationExpenditure:6.1,forestArea:38.1,accessElectricity:94},{id:"600",code:"PY",name:"Paraguay",population:7,gdpPerCapita:15030,co2Emissions:1.1,lifeExpectancy:74.3,humanDevIndex:.717,internetUsers:77,renewableEnergy:78,urbanPopulation:62.5,healthExpenditure:7.6,educationExpenditure:3.4,forestArea:38.6,accessElectricity:100},{id:"858",code:"UY",name:"Uruguay",population:3.5,gdpPerCapita:25041,co2Emissions:2,lifeExpectancy:78.4,humanDevIndex:.83,internetUsers:87,renewableEnergy:55,urbanPopulation:95.6,healthExpenditure:9.3,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"188",code:"CR",name:"Costa Rica",population:5,gdpPerCapita:23101,co2Emissions:1.5,lifeExpectancy:80.8,humanDevIndex:.809,internetUsers:81,renewableEnergy:73,urbanPopulation:81.4,healthExpenditure:7.3,educationExpenditure:6.7,forestArea:59,accessElectricity:100},{id:"591",code:"PA",name:"Panama",population:4.4,gdpPerCapita:35317,co2Emissions:2.5,lifeExpectancy:79.2,humanDevIndex:.805,internetUsers:68,renewableEnergy:35,urbanPopulation:68.4,healthExpenditure:7.3,educationExpenditure:3.2,forestArea:62.1,accessElectricity:95}],Ys=[{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],accessor:o=>o.humanDevIndex,format:o=>o.toFixed(3)},{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],accessor:o=>o.gdpPerCapita,format:o=>`$${(o/1e3).toFixed(1)}k`},{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],accessor:o=>o.co2Emissions,format:o=>`${o.toFixed(1)}t`},{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],accessor:o=>o.lifeExpectancy,format:o=>`${o.toFixed(1)} yrs`},{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],accessor:o=>o.renewableEnergy,format:o=>`${o.toFixed(0)}%`},{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],accessor:o=>o.internetUsers,format:o=>`${o.toFixed(0)}%`},{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],accessor:o=>o.urbanPopulation,format:o=>`${o.toFixed(0)}%`},{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],accessor:o=>o.healthExpenditure,format:o=>`${o.toFixed(1)}%`},{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],accessor:o=>o.forestArea,format:o=>`${o.toFixed(0)}%`},{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffffd4","#fed98e","#cc4c02"],domain:[15,100],accessor:o=>o.accessElectricity,format:o=>`${o.toFixed(0)}%`}];function Ws(o,e){const[t,i]=o.domain;return Math.max(0,Math.min(1,(e-t)/(i-t)))}const Zs={US:"840",USA:"840","UNITED STATES":"840",AMERICA:"840",CA:"124",CAN:"124",CANADA:"124",MX:"484",MEX:"484",MEXICO:"484",DE:"276",DEU:"276",GERMANY:"276",DEUTSCHLAND:"276",FR:"250",FRA:"250",FRANCE:"250",GB:"826",GBR:"826",UK:"826","UNITED KINGDOM":"826",BRITAIN:"826",ENGLAND:"826",IT:"380",ITA:"380",ITALY:"380",ES:"724",ESP:"724",SPAIN:"724",PT:"620",PRT:"620",PORTUGAL:"620",NL:"528",NLD:"528",NETHERLANDS:"528",HOLLAND:"528",BE:"056",BEL:"056",BELGIUM:"056",AT:"040",AUT:"040",AUSTRIA:"040",CH:"756",CHE:"756",SWITZERLAND:"756",PL:"616",POL:"616",POLAND:"616",SE:"752",SWE:"752",SWEDEN:"752",NO:"578",NOR:"578",NORWAY:"578",DK:"208",DNK:"208",DENMARK:"208",FI:"246",FIN:"246",FINLAND:"246",IE:"372",IRL:"372",IRELAND:"372",GR:"300",GRC:"300",GREECE:"300",CZ:"203",CZE:"203","CZECH REPUBLIC":"203",CZECHIA:"203",RO:"642",ROU:"642",ROMANIA:"642",HU:"348",HUN:"348",HUNGARY:"348",UA:"804",UKR:"804",UKRAINE:"804",RU:"643",RUS:"643",RUSSIA:"643","RUSSIAN FEDERATION":"643",CN:"156",CHN:"156",CHINA:"156",JP:"392",JPN:"392",JAPAN:"392",KR:"410",KOR:"410","SOUTH KOREA":"410",KOREA:"410",IN:"356",IND:"356",INDIA:"356",ID:"360",IDN:"360",INDONESIA:"360",TH:"764",THA:"764",THAILAND:"764",VN:"704",VNM:"704",VIETNAM:"704",PH:"608",PHL:"608",PHILIPPINES:"608",MY:"458",MYS:"458",MALAYSIA:"458",SG:"702",SGP:"702",SINGAPORE:"702",PK:"586",PAK:"586",PAKISTAN:"586",BD:"050",BGD:"050",BANGLADESH:"050",TR:"792",TUR:"792",TURKEY:"792",TURKIYE:"792",SA:"682",SAU:"682","SAUDI ARABIA":"682",AE:"784",ARE:"784",UAE:"784","UNITED ARAB EMIRATES":"784",IL:"376",ISR:"376",ISRAEL:"376",IR:"364",IRN:"364",IRAN:"364",IQ:"368",IRQ:"368",IRAQ:"368",AU:"036",AUS:"036",AUSTRALIA:"036",NZ:"554",NZL:"554","NEW ZEALAND":"554",BR:"076",BRA:"076",BRAZIL:"076",AR:"032",ARG:"032",ARGENTINA:"032",CL:"152",CHL:"152",CHILE:"152",CO:"170",COL:"170",COLOMBIA:"170",PE:"604",PER:"604",PERU:"604",VE:"862",VEN:"862",VENEZUELA:"862",ZA:"710",ZAF:"710","SOUTH AFRICA":"710",EG:"818",EGY:"818",EGYPT:"818",NG:"566",NGA:"566",NIGERIA:"566",KE:"404",KEN:"404",KENYA:"404",ET:"231",ETH:"231",ETHIOPIA:"231",MA:"504",MAR:"504",MOROCCO:"504",DZ:"012",DZA:"012",ALGERIA:"012",TN:"788",TUN:"788",TUNISIA:"788",GH:"288",GHA:"288",GHANA:"288"};function Fi(o){const e=o.toUpperCase().trim();return/^\d{1,3}$/.test(o)?o.padStart(3,"0"):Zs[e]||o}function sn(o){const e={};return o instanceof Map?o.forEach((t,i)=>{e[Fi(i)]=t}):Object.entries(o).forEach(([t,i])=>{e[Fi(t)]=i}),e}const Nt=4096,$t=2048,Xs=`
  importScripts('https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js');

  self.onmessage = async (e) => {
    const { url, objectName, idProperty } = e.data;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
      
      const data = await response.json();
      let features;

      // Check if it's already GeoJSON
      if (data.type === 'FeatureCollection') {
        features = data.features;
      } else {
        // Assume TopoJSON
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
`;class st{canvas;ctx;countries=[];loaded=!1;statsMap;featureLabels=[];topologyConfig;currentRenderId=0;onProgress;onTextureUpdate;static cache=new Map;constructor(e,t,i){this.canvas=document.createElement("canvas"),this.canvas.width=Nt,this.canvas.height=$t,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.onProgress=t,this.onTextureUpdate=i,this.topologyConfig={url:e?.url||"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",objectName:e?.objectName||"countries",disableNormalization:e?.disableNormalization||!1,idProperty:e?.idProperty,labelProperty:e?.labelProperty},this.statsMap=new Map,ki.forEach(r=>{this.statsMap.set(r.id,r)}),this.loadCountries()}async loadCountries(){const e=`${this.topologyConfig.url}|${this.topologyConfig.objectName}|${this.topologyConfig.idProperty||""}`;if(this.onProgress?.(.1),!st.cache.has(e)){const t=(async()=>{try{let i;i=await this.loadInWorker(this.topologyConfig.url,this.topologyConfig.objectName,this.topologyConfig.idProperty),this.onProgress?.(.4);const r=200,n=i.length;for(let s=0;s<n;s+=r){i.slice(s,s+r).forEach(c=>{c.path=this.createPath(c)});const l=.4+.6*(s+r)/n;this.onProgress?.(Math.min(.99,l)),await new Promise(c=>setTimeout(c,0))}return console.log(`Loaded and processed ${i.length} boundaries from ${this.topologyConfig.objectName}`),i}catch(i){throw console.error("Failed to load map boundaries:",i),i}})();st.cache.set(e,t)}try{this.countries=await st.cache.get(e),this.loaded=!0,this.updateFeatureLabels(),this.onProgress?.(1)}catch(t){st.cache.delete(e),console.error("Error loading cached topology:",t),this.loaded=!0}}loadInWorker(e,t,i){return new Promise((r,n)=>{const s=new Blob([Xs],{type:"application/javascript"}),a=URL.createObjectURL(s),l=new Worker(a);l.onmessage=c=>{URL.revokeObjectURL(a),l.terminate(),c.data.success?r(c.data.features):n(new Error(c.data.error))},l.onerror=c=>{URL.revokeObjectURL(a),l.terminate(),n(new Error("Worker error: "+c.message))},l.postMessage({url:e,objectName:t})})}async waitForLoad(){for(;!this.loaded;)await new Promise(e=>setTimeout(e,100))}setFeatures(e){e.forEach(t=>{t.path||(t.path=this.createPath(t))}),this.countries=e,this.loaded=!0,this.topologyConfig&&(this.topologyConfig.disableNormalization=!0),this.updateFeatureLabels()}updateFeatureLabels(){this.featureLabels=this.countries.map(e=>{const t=this.computeCentroid(e);if(!t)return null;let i="";if(this.topologyConfig?.labelProperty&&(i=e.properties?.[this.topologyConfig.labelProperty]||""),i||(i=e.properties?.name||e.properties?.NAME||e.properties?.Name||e.properties?.label||e.properties?.LABEL||""),!i&&e.properties){const n=Object.keys(e.properties);for(const s of n){const a=s.toLowerCase(),l=e.properties[s];if(typeof l=="string"&&(a.includes("name")||a.includes("label")||a.includes("title"))){i=l;break}}}let r=e.id||e.properties?.id;return this.topologyConfig?.idProperty&&(r=e.properties?.[this.topologyConfig.idProperty]),{id:String(r||""),name:i,lat:t[1],lon:t[0]}}).filter(e=>e!==null&&e.id!==""&&e.name!=="")}getFeatureLabels(){return this.featureLabels}computeCentroid(e){const t=e.geometry;if(!t)return null;let i=[];if(t.type==="Point")return t.coordinates;if(t.type==="Polygon")i=t.coordinates.flat();else if(t.type==="MultiPolygon")i=t.coordinates.flat(2);else return null;if(i.length===0)return null;let r=0,n=0;for(const s of i)r+=s[0],n+=s[1];return[r/i.length,n/i.length]}renderTexture(e){this.currentRenderId++;const t=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,Nt,$t),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const i=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const r=500,n=this.countries.length;let s=0;const a=()=>{if(this.currentRenderId!==t)return;const l=Math.min(s+r,n);for(let c=s;c<l;c++){const u=this.countries[c],h=this.statsMap.get(u.id);let f="#2a2a2a";if(h){const p=e.accessor(h),m=Ws(e,p);f=this.interpolateColor(e.colorScale,m)}this.drawFeature(u,f,i)}s=l,this.onTextureUpdate?.(),s<n&&requestAnimationFrame(a)};return requestAnimationFrame(a),this.canvas}drawFeature(e,t,i){const r=e.path;r&&(this.ctx.fillStyle=t,this.ctx.fill(r),i&&this.ctx.stroke(r))}createPath(e){const t=new Path2D,{geometry:i}=e;if(i.type==="Polygon")this.addPolygonToPath(t,i.coordinates);else if(i.type==="MultiPolygon")i.coordinates.forEach(r=>{this.addPolygonToPath(t,r)});else if(i.type==="Point"){const[r,n]=i.coordinates,[s,a]=this.projectPoint(r,n);t.arc(s,a,4,0,Math.PI*2)}return t}addPolygonToPath(e,t){t.forEach(i=>{let r=null;i.forEach((n,s)=>{const a=n[0],l=n[1],[c,u]=this.projectPoint(a,l),h=r!==null&&Math.abs(a-r)>180;s===0||h?e.moveTo(c,u):e.lineTo(c,u),r=a}),e.closePath()})}projectPoint(e,t){const i=(e+180)/360*Nt,r=(90-t)/180*$t;return[i,r]}interpolateColor(e,t){const i=u=>({r:parseInt(u.slice(1,3),16),g:parseInt(u.slice(3,5),16),b:parseInt(u.slice(5,7),16)}),[r,n,s]=e.map(i);let a,l,c;if(t<.5){const u=t*2;a=Math.round(r.r+(n.r-r.r)*u),l=Math.round(r.g+(n.g-r.g)*u),c=Math.round(r.b+(n.b-r.b)*u)}else{const u=(t-.5)*2;a=Math.round(n.r+(s.r-n.r)*u),l=Math.round(n.g+(s.g-n.g)*u),c=Math.round(n.b+(s.b-n.b)*u)}return`rgb(${a}, ${l}, ${c})`}renderCustomTexture(e,t,i){this.currentRenderId++;const r=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,Nt,$t),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const n=this.topologyConfig?.disableNormalization?e instanceof Map?Object.fromEntries(e):e:sn(e),s=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const a=500,l=this.countries.length;let c=0;const u=()=>{if(this.currentRenderId!==r)return;const h=Math.min(c+a,l);for(let f=c;f<h;f++){const p=this.countries[f],m=n[p.id];let d="#2a2a2a";if(m!==void 0){const g=Math.max(0,Math.min(1,(m-i[0])/(i[1]-i[0])));d=this.interpolateColor(t,g)}this.drawFeature(p,d,s)}c=h,this.onTextureUpdate?.(),c<l&&requestAnimationFrame(u)};return requestAnimationFrame(u),this.canvas}getCanvas(){return this.canvas}getDataURL(){return this.canvas.toDataURL("image/png")}getStatsMap(){return this.statsMap}getBounds(){if(this.countries.length===0)return null;let e=1/0,t=-1/0,i=1/0,r=-1/0,n=0,s=1/0,a=-1/0,l=1/0,c=-1/0,u=0;const h=y=>{if(typeof y[0]=="number"){const _=y[0],x=y[1];_<0?(_<e&&(e=_),_>t&&(t=_),x<i&&(i=x),x>r&&(r=x),n++):(_<s&&(s=_),_>a&&(a=_),x<l&&(l=x),x>c&&(c=x),u++)}else y.forEach(h)};if(this.countries.forEach(y=>{y.geometry&&h(y.geometry.coordinates)}),n===0&&u===0)return null;if(n===0)return[s,l,a,c];if(u===0)return[e,i,t,r];const f=Math.min(e,s),p=Math.max(t,a);if(p-f>180){if(n>u*2)return[e,i,t,r];if(u>n*2)return[s,l,a,c]}const d=Math.min(i,l),g=Math.max(r,c);return[f,d,p,g]}}const qs={CN:[35,105],IN:[22,78],US:[39,-98],ID:[-2,118],PK:[30,70],BR:[-10,-55],NG:[9,8],BD:[24,90],RU:[60,100],MX:[23,-102],JP:[36,138],ET:[9,38.5],PH:[12,122],EG:[27,30],VN:[16,108],DE:[51,10],TR:[39,35],IR:[32,53],TH:[15,101],GB:[54,-2],FR:[46,2],IT:[42.5,12.5],ZA:[-29,24],TZ:[-6,35],KE:[0,38],KR:[36,128],CO:[4,-72],ES:[40,-4],AR:[-34,-64],UG:[1,32],DZ:[28,3],UA:[49,32],IQ:[33,44],PL:[52,20],CA:[56,-106],MA:[32,-5],SA:[24,45],PE:[-10,-76],AU:[-25,134],MY:[4,109.5],GH:[8,-1],NP:[28,84],VE:[7,-66],MG:[-19,47],CM:[6,12],NL:[52.5,5.5],CL:[-34,-71],SE:[62,15],NO:[64,10],SG:[1.3,103.8],NZ:[-42,174],IE:[53,-8],IL:[31,35],AE:[24,54],CH:[47,8],AT:[47.5,14.5],PT:[39.5,-8],GR:[39,22],CZ:[49.8,15.5],BE:[50.8,4],HU:[47,20],FI:[64,26],DK:[56,10],IS:[65,-18],CD:[-3,22],SD:[16,30],AO:[-12.5,18.5],MZ:[-18,35],CI:[7.5,-5.5],NE:[17,10],BF:[12,-1.5],ML:[17,-4],SN:[14.5,-14.5],ZM:[-15,28],ZW:[-19,29.5],RW:[-2,30],AF:[33,65],MM:[21,96],KP:[40,127],MN:[46,105],LK:[7.8,80.8],KZ:[48,67],UZ:[41,64],CU:[22,-79.5],EC:[-1.5,-78.5],GT:[15.5,-90.3],BO:[-17,-65],HN:[15,-86.5],PY:[-23,-58],UY:[-33,-56],CR:[10,-84],PA:[9,-80]},Ks=new Set(["CN","IN","US","BR","RU","JP","DE","GB","FR","AU","CA","MX","ID","SA","ZA","EG","NG","AR","IT","ES","KR","TR","PL","NL","CH","SE","NO","PK","BD","VN"]),Js=new Set(["CN","IN","US","BR","RU","AU","CA"]),Qs=new Set(["RU","CA","US","CN","BR","AU"]),ea=new Set(["IN","AR","KZ","DZ","CD","SA","MX","ID","SD","LY","IR","MN","PE","TD","NE","AO","ML","ZA","CO","ET","BO","MR","EG","TZ","NG","VE","PK","TR","CL","MM"]),ta=new Set(["AF","UA","MG","MZ","FR","ES","TH","CM","PG","JP","DE","VN","MY","CI","PL","IT","PH","EC","BF","NZ","GB","GH","RO","LA","GY","OM","BY","KH","SN","UG","NO","SE","FI","MR","ZM","ZW","NP","MA","IQ","BD"]);class ia{labelRenderer;labels=[];labelGroup;currentStyle="none";sphereRadius;currentMorph=0;globe=null;camera=null;dataIds=new Set;constructor(e,t){this.sphereRadius=t,this.labelRenderer=new Ht.CSS2DRenderer;const i=e.clientWidth||800,r=e.clientHeight||600;this.labelRenderer.setSize(i,r),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.left="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.zIndex="5",e.appendChild(this.labelRenderer.domElement),this.labelGroup=new A.Group,this.injectStyles(),this.createLabels()}injectStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getSizeCategory(e){return Qs.has(e)?"large":ea.has(e)?"medium":ta.has(e)?"small":"tiny"}createLabels(){ki.forEach(e=>{const t=qs[e.code];if(!t)return;const[i,r]=t,n=this.getSizeCategory(e.code),s=document.createElement("div");s.className=`country-label hidden size-${n}`,s.textContent=e.name;const a=new Ht.CSS2DObject(s),l={element:s,object:a,country:e,lat:i,lon:r,sizeCategory:n};this.labelGroup.add(a),this.labels.push(l),this.updateLabelPosition(a,l,this.currentMorph)})}addCustomLabels(e){e.forEach(t=>{const i=p=>String(parseInt(p)||p).toLowerCase(),r=p=>p.toLowerCase().replace(/^the\s+/,"").trim(),n=i(t.id),s=r(t.name);if(this.labels.some(p=>{const m=i(p.country.id),d=r(p.country.name);return m===n||d===s}))return;const l=t.size||"small",c=document.createElement("div");c.className=`country-label hidden size-${l} custom-label`,c.textContent=t.name;const u=new Ht.CSS2DObject(c),h={id:t.id,code:t.id,name:t.name},f={element:c,object:u,country:h,lat:t.lat,lon:t.lon,sizeCategory:l};this.labelGroup.add(u),this.labels.push(f),this.dataIds.add(t.id),this.updateLabelPosition(u,f,this.currentMorph)}),this.setStyle(this.currentStyle)}clearCustomLabels(){this.labels.filter(t=>t.element.classList.contains("custom-label")).forEach(t=>{this.labelGroup.remove(t.object),t.element.remove(),this.dataIds.delete(t.country.code)}),this.labels=this.labels.filter(t=>!t.element.classList.contains("custom-label"))}localPos=new A.Vector3;worldPos=new A.Vector3;cameraDirection=new A.Vector3;labelNormal=new A.Vector3;updateLabelPosition(e,t,i){const{lat:r,lon:n,element:s}=t,a=(n+180)/360,l=(r+90)/180,c=(a-.5)*2*Math.PI,u=(l-.5)*Math.PI,h=this.sphereRadius+.3,f=h*Math.cos(u)*Math.sin(c),p=h*Math.sin(u),m=h*Math.cos(u)*Math.cos(c),d=2*Math.PI*this.sphereRadius,g=Math.PI*this.sphereRadius,y=(a-.5)*d,_=(l-.5)*g,x=.3,v=i*i*(3-2*i);if(this.localPos.set(y+v*(f-y),_+v*(p-_),x+v*(m-x)),this.globe){this.worldPos.copy(this.localPos),this.worldPos.applyMatrix4(this.globe.matrixWorld),e.position.copy(this.worldPos);let b=1;this.camera&&v>.5&&(this.cameraDirection.copy(this.camera.position).normalize(),this.labelNormal.set(f,p,m).normalize(),this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize(),b=this.labelNormal.dot(this.cameraDirection)>.15?1:0);let C=1;if(this.camera){let P=150;switch(v>.5?P=this.camera.position.length():P=Math.abs(this.camera.position.z),t.sizeCategory){case"tiny":C=1-Math.min(1,Math.max(0,(P-120)/30));break;case"small":C=1-Math.min(1,Math.max(0,(P-150)/40));break;case"medium":C=1-Math.min(1,Math.max(0,(P-200)/50));break;case"large":C=1-Math.min(1,Math.max(0,(P-300)/100));break}}const E=b*C;E<.05?s.style.opacity="0":s.style.opacity=String(E)}else{e.position.copy(this.localPos);let b=1;if(this.camera){const C=Math.abs(this.camera.position.z);switch(t.sizeCategory){case"tiny":b=1-Math.min(1,Math.max(0,(C-120)/30));break;case"small":b=1-Math.min(1,Math.max(0,(C-150)/40));break;case"medium":b=1-Math.min(1,Math.max(0,(C-200)/50));break}}s.style.opacity=b<.05?"0":String(b)}}getGroup(){return this.labelGroup}setStyle(e){this.currentStyle=e,this.labels.forEach(t=>{const i=t.country.code;let r=!1;switch(e){case"none":r=!1;break;case"minimal":r=Js.has(i);break;case"major":r=Ks.has(i);break;case"all":case"capitals":r=!0;break;case"all-countries":r=!0;break;case"data":r=this.dataIds.has(i);break}e==="all-countries"&&t.element.classList.contains("custom-label")&&(r=!1),t.element.classList.toggle("hidden",!r)}),this.labelRenderer.domElement.className=`label-style-${e}`}setMorph(e){this.currentMorph=e}setGlobe(e){this.globe=e}setCamera(e){this.camera=e}setDataIds(e){this.dataIds=new Set(e),this.currentStyle==="data"&&this.setStyle("data")}update(){this.currentStyle!=="none"&&this.labels.forEach(e=>{this.updateLabelPosition(e.object,e,this.currentMorph)})}render(e,t){this.currentStyle!=="none"&&this.labelRenderer.render(e,t)}resize(e,t){this.labelRenderer.setSize(e,t)}getStyle(){return this.currentStyle}getVisibleLabelsForCanvas(e,t,i){if(this.currentStyle==="none")return[];const r=[],n=new A.Vector3;return this.labels.forEach(s=>{const a=s.element.style.opacity,l=a===""?1:parseFloat(a)||0;if(l<.1||s.element.classList.contains("hidden"))return;s.object.getWorldPosition(n),n.project(e);const c=(n.x*.5+.5)*t,u=(-n.y*.5+.5)*i;c>=0&&c<=t&&u>=0&&u<=i&&n.z<1&&r.push({text:s.country.name,x:c,y:u,opacity:l})}),r}dispose(){this.labels.forEach(e=>{this.labelGroup.remove(e.object),e.element.remove()}),this.labels=[],this.labelRenderer.domElement.remove()}}var ra={trailer:59};function an(o=256){let e=0,t=new Uint8Array(o);return{get buffer(){return t.buffer},reset(){e=0},bytesView(){return t.subarray(0,e)},bytes(){return t.slice(0,e)},writeByte(r){i(e+1),t[e]=r,e++},writeBytes(r,n=0,s=r.length){i(e+s);for(let a=0;a<s;a++)t[e++]=r[a+n]},writeBytesView(r,n=0,s=r.byteLength){i(e+s),t.set(r.subarray(n,n+s),e),e+=s}};function i(r){var n=t.length;if(n>=r)return;var s=1024*1024;r=Math.max(r,n*(n<s?2:1.125)>>>0),n!=0&&(r=Math.max(r,256));let a=t;t=new Uint8Array(r),e>0&&t.set(a.subarray(0,e),0)}}var Ui=12,on=5003,na=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function sa(o,e,t,i,r=an(512),n=new Uint8Array(256),s=new Int32Array(on),a=new Int32Array(on)){let l=s.length,c=Math.max(2,i);n.fill(0),a.fill(0),s.fill(-1);let u=0,h=0,f=c+1,p=f,m=!1,d=p,g=(1<<d)-1,y=1<<f-1,_=y+1,x=y+2,v=0,b=t[0],C=0;for(let w=l;w<65536;w*=2)++C;C=8-C,r.writeByte(c),P(y);let E=t.length;for(let w=1;w<E;w++)e:{let T=t[w],D=(T<<Ui)+b,S=T<<C^b;if(s[S]===D){b=a[S];break e}let I=S===0?1:l-S;for(;s[S]>=0;)if(S-=I,S<0&&(S+=l),s[S]===D){b=a[S];break e}P(b),b=T,x<1<<Ui?(a[S]=x++,s[S]=D):(s.fill(-1),x=y+2,m=!0,P(y))}return P(b),P(_),r.writeByte(0),r.bytesView();function P(w){for(u&=na[h],h>0?u|=w<<h:u=w,h+=d;h>=8;)n[v++]=u&255,v>=254&&(r.writeByte(v),r.writeBytesView(n,0,v),v=0),u>>=8,h-=8;if((x>g||m)&&(m?(d=p,g=(1<<d)-1,m=!1):(++d,g=d===Ui?1<<d:(1<<d)-1)),w==_){for(;h>0;)n[v++]=u&255,v>=254&&(r.writeByte(v),r.writeBytesView(n,0,v),v=0),u>>=8,h-=8;v>0&&(r.writeByte(v),r.writeBytesView(n,0,v),v=0)}}}var aa=sa;function ln(o,e,t){return o<<8&63488|e<<2&992|t>>3}function cn(o,e,t,i){return o>>4|e&240|(t&240)<<4|(i&240)<<8}function un(o,e,t){return o>>4<<8|e&240|t>>4}function Bt(o,e,t){return o<e?e:o>t?t:o}function Gt(o){return o*o}function hn(o,e,t){var i=0,r=1e100;let n=o[e],s=n.cnt;n.ac;let a=n.rc,l=n.gc,c=n.bc;for(var u=n.fw;u!=0;u=o[u].fw){let f=o[u],p=f.cnt,m=s*p/(s+p);if(!(m>=r)){var h=0;h+=m*Gt(f.rc-a),!(h>=r)&&(h+=m*Gt(f.gc-l),!(h>=r)&&(h+=m*Gt(f.bc-c),!(h>=r)&&(r=h,i=u)))}}n.err=r,n.nn=i}function zi(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function oa(o,e){let t=e==="rgb444"?4096:65536,i=new Array(t),r=o.length;if(e==="rgba4444")for(let n=0;n<r;++n){let s=o[n],a=s>>24&255,l=s>>16&255,c=s>>8&255,u=s&255,h=cn(u,c,l,a),f=h in i?i[h]:i[h]=zi();f.rc+=u,f.gc+=c,f.bc+=l,f.ac+=a,f.cnt++}else if(e==="rgb444")for(let n=0;n<r;++n){let s=o[n],a=s>>16&255,l=s>>8&255,c=s&255,u=un(c,l,a),h=u in i?i[u]:i[u]=zi();h.rc+=c,h.gc+=l,h.bc+=a,h.cnt++}else for(let n=0;n<r;++n){let s=o[n],a=s>>16&255,l=s>>8&255,c=s&255,u=ln(c,l,a),h=u in i?i[u]:i[u]=zi();h.rc+=c,h.gc+=l,h.bc+=a,h.cnt++}return i}function la(o,e,t={}){let{format:i="rgb565",clearAlpha:r=!0,clearAlphaColor:n=0,clearAlphaThreshold:s=0,oneBitAlpha:a=!1}=t;if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let l=new Uint32Array(o.buffer),c=t.useSqrt!==!1,u=i==="rgba4444",h=oa(l,i),f=h.length,p=f-1,m=new Uint32Array(f+1);for(var d=0,g=0;g<f;++g){let L=h[g];if(L!=null){var y=1/L.cnt;u&&(L.ac*=y),L.rc*=y,L.gc*=y,L.bc*=y,h[d++]=L}}Gt(e)/d<.022&&(c=!1);for(var g=0;g<d-1;++g)h[g].fw=g+1,h[g+1].bk=g,c&&(h[g].cnt=Math.sqrt(h[g].cnt));c&&(h[g].cnt=Math.sqrt(h[g].cnt));var _,x,v;for(g=0;g<d;++g){hn(h,g);var b=h[g].err;for(x=++m[0];x>1&&(v=x>>1,!(h[_=m[v]].err<=b));x=v)m[x]=_;m[x]=g}var C=d-e;for(g=0;g<C;){for(var E;;){var P=m[1];if(E=h[P],E.tm>=E.mtm&&h[E.nn].mtm<=E.tm)break;E.mtm==p?P=m[1]=m[m[0]--]:(hn(h,P),E.tm=g);var b=h[P].err;for(x=1;(v=x+x)<=m[0]&&(v<m[0]&&h[m[v]].err>h[m[v+1]].err&&v++,!(b<=h[_=m[v]].err));x=v)m[x]=_;m[x]=P}var w=h[E.nn],T=E.cnt,D=w.cnt,y=1/(T+D);u&&(E.ac=y*(T*E.ac+D*w.ac)),E.rc=y*(T*E.rc+D*w.rc),E.gc=y*(T*E.gc+D*w.gc),E.bc=y*(T*E.bc+D*w.bc),E.cnt+=w.cnt,E.mtm=++g,h[w.bk].fw=w.fw,h[w.fw].bk=w.bk,w.mtm=p}let S=[];var I=0;for(g=0;;++I){let L=Bt(Math.round(h[g].rc),0,255),B=Bt(Math.round(h[g].gc),0,255),U=Bt(Math.round(h[g].bc),0,255),k=255;u&&(k=Bt(Math.round(h[g].ac),0,255),a&&(k=k<=(typeof a=="number"?a:127)?0:255),r&&k<=s&&(L=B=U=n,k=0));let ne=u?[L,B,U,k]:[L,B,U];if(ca(S,ne)||S.push(ne),(g=h[g].fw)==0)break}return S}function ca(o,e){for(let t=0;t<o.length;t++){let i=o[t],r=i[0]===e[0]&&i[1]===e[1]&&i[2]===e[2],n=i.length>=4&&e.length>=4?i[3]===e[3]:!0;if(r&&n)return!0}return!1}function ua(o,e,t="rgb565"){if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let i=new Uint32Array(o.buffer),r=i.length,n=t==="rgb444"?4096:65536,s=new Uint8Array(r),a=new Array(n);if(t==="rgba4444")for(let l=0;l<r;l++){let c=i[l],u=c>>24&255,h=c>>16&255,f=c>>8&255,p=c&255,m=cn(p,f,h,u),d=m in a?a[m]:a[m]=ha(p,f,h,u,e);s[l]=d}else{let l=t==="rgb444"?un:ln;for(let c=0;c<r;c++){let u=i[c],h=u>>16&255,f=u>>8&255,p=u&255,m=l(p,f,h),d=m in a?a[m]:a[m]=da(p,f,h,e);s[c]=d}}return s}function ha(o,e,t,i,r){let n=0,s=1e100;for(let a=0;a<r.length;a++){let l=r[a],c=l[3],u=He(c-i);if(u>s)continue;let h=l[0];if(u+=He(h-o),u>s)continue;let f=l[1];if(u+=He(f-e),u>s)continue;let p=l[2];u+=He(p-t),!(u>s)&&(s=u,n=a)}return n}function da(o,e,t,i){let r=0,n=1e100;for(let s=0;s<i.length;s++){let a=i[s],l=a[0],c=He(l-o);if(c>n)continue;let u=a[1];if(c+=He(u-e),c>n)continue;let h=a[2];c+=He(h-t),!(c>n)&&(n=c,r=s)}return r}function He(o){return o*o}function fa(o={}){let{initialCapacity:e=4096,auto:t=!0}=o,i=an(e),r=5003,n=new Uint8Array(256),s=new Int32Array(r),a=new Int32Array(r),l=!1;return{reset(){i.reset(),l=!1},finish(){i.writeByte(ra.trailer)},bytes(){return i.bytes()},bytesView(){return i.bytesView()},get buffer(){return i.buffer},get stream(){return i},writeHeader:c,writeFrame(u,h,f,p={}){let{transparent:m=!1,transparentIndex:d=0,delay:g=0,palette:y=null,repeat:_=0,colorDepth:x=8,dispose:v=-1}=p,b=!1;if(t?l||(b=!0,c(),l=!0):b=!!p.first,h=Math.max(0,Math.floor(h)),f=Math.max(0,Math.floor(f)),b){if(!y)throw new Error("First frame must include a { palette } option");ma(i,h,f,y,x),dn(i,y),_>=0&&ga(i,_)}let C=Math.round(g/10);pa(i,v,C,m,d);let E=!!y&&!b;ya(i,h,f,E?y:null),E&&dn(i,y),_a(i,u,h,f,x,n,s,a)}};function c(){fn(i,"GIF89a")}}function pa(o,e,t,i,r){o.writeByte(33),o.writeByte(249),o.writeByte(4),r<0&&(r=0,i=!1);var n,s;i?(n=1,s=2):(n=0,s=0),e>=0&&(s=e&7),s<<=2,o.writeByte(0|s|0|n),Re(o,t),o.writeByte(r||0),o.writeByte(0)}function ma(o,e,t,i,r=8){let n=1,s=0,a=Ni(i.length)-1,l=n<<7|r-1<<4|s<<3|a;Re(o,e),Re(o,t),o.writeBytes([l,0,0])}function ga(o,e){o.writeByte(33),o.writeByte(255),o.writeByte(11),fn(o,"NETSCAPE2.0"),o.writeByte(3),o.writeByte(1),Re(o,e),o.writeByte(0)}function dn(o,e){let t=1<<Ni(e.length);for(let i=0;i<t;i++){let r=[0,0,0];i<e.length&&(r=e[i]),o.writeByte(r[0]),o.writeByte(r[1]),o.writeByte(r[2])}}function ya(o,e,t,i){if(o.writeByte(44),Re(o,0),Re(o,0),Re(o,e),Re(o,t),i){let r=0,n=0,s=Ni(i.length)-1;o.writeByte(128|r|n|0|s)}else o.writeByte(0)}function _a(o,e,t,i,r=8,n,s,a){aa(t,i,e,r,o,n,s,a)}function Re(o,e){o.writeByte(e&255),o.writeByte(e>>8&255)}function fn(o,e){for(var t=0;t<e.length;t++)o.writeByte(e.charCodeAt(t))}function Ni(o){return Math.max(Math.ceil(Math.log2(o)),1)}class xa{renderer;scene;camera;isRecording=!1;frames=[];mediaRecorder=null;recordedChunks=[];captureCanvas;captureCtx;compositeCanvas;compositeCtx;gifWidth=480;gifHeight=270;legendElement=null;countryLabels=null;constructor(e,t,i){this.renderer=e,this.scene=t,this.camera=i,this.captureCanvas=document.createElement("canvas"),this.captureCtx=this.captureCanvas.getContext("2d",{willReadFrequently:!0}),this.compositeCanvas=document.createElement("canvas"),this.compositeCtx=this.compositeCanvas.getContext("2d")}setLegendElement(e){this.legendElement=e}setCountryLabels(e){this.countryLabels=e}drawCountryLabelsOnCanvas(e,t,i,r){if(this.countryLabels)try{this.countryLabels.getVisibleLabelsForCanvas(r||this.camera,t,i).forEach(s=>{e.save(),e.globalAlpha=s.opacity,e.font="bold 12px Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.strokeStyle="rgba(0, 0, 0, 0.8)",e.lineWidth=3,e.strokeText(s.text,s.x,s.y),e.fillStyle="#ffffff",e.fillText(s.text,s.x,s.y),e.restore()})}catch(n){console.warn("Failed to draw country labels:",n)}}drawOverlaysOnCanvas(e,t,i,r){this.drawCountryLabelsOnCanvas(e,t,i,r),this.drawLegendOnCanvas(e,t,i)}drawLegendOnCanvas(e,t,i){try{if(!this.legendElement||!this.legendElement.classList.contains("visible"))return;const r=this.legendElement,n=r.querySelector(".gralobe-legend-title")||r.querySelector(".legend-title"),s=r.querySelector(".gralobe-legend-gradient")||r.querySelector(".legend-gradient"),a=r.querySelector(".gralobe-legend-min")||r.querySelector(".legend-min"),l=r.querySelector(".gralobe-legend-max")||r.querySelector(".legend-max"),c=r.querySelector(".gralobe-legend-description")||r.querySelector(".legend-description");if(!n||!s)return;const u=280,h=100,f=20,p=t-u-f,m=i-h-f,d=12;e.fillStyle="rgba(0, 10, 20, 0.9)",e.strokeStyle="rgba(100, 170, 255, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect?e.roundRect(p,m,u,h,d):e.rect(p,m,u,h),e.fill(),e.stroke(),e.fillStyle="#44aaff",e.font="bold 18px Arial, sans-serif",e.fillText(n.textContent||"",p+16,m+28);const g=p+16,y=m+40,_=u-32,x=20,v=s.style.background||"";let b=[];const C=v.match(/rgba?\([^)]+\)/g);if(C&&C.length>=2)b=C;else{const E=v.match(/#[0-9a-fA-F]{3,8}/g);E&&E.length>=2&&(b=E)}if(b.length>=2){const E=e.createLinearGradient(g,0,g+_,0);E.addColorStop(0,b[0]),b.length>=3?(E.addColorStop(.5,b[1]),E.addColorStop(1,b[2])):E.addColorStop(1,b[1]),e.fillStyle=E,e.beginPath(),e.roundRect?e.roundRect(g,y,_,x,4):e.rect(g,y,_,x),e.fill()}else{const E=e.createLinearGradient(g,0,g+_,0);E.addColorStop(0,"#cc6600"),E.addColorStop(.5,"#ffaa44"),E.addColorStop(1,"#ffeecc"),e.fillStyle=E,e.beginPath(),e.roundRect?e.roundRect(g,y,_,x,4):e.rect(g,y,_,x),e.fill(),console.log("Legend gradient style:",v)}if(e.fillStyle="#cccccc",e.font="14px Arial, sans-serif",a&&e.fillText(a.textContent||"",g,m+78),l){const E=l.textContent||"",P=e.measureText(E).width;e.fillText(E,g+_-P,m+78)}c&&c.textContent&&(e.fillStyle="#888888",e.font="italic 12px Arial, sans-serif",e.fillText(c.textContent,g,m+95))}catch(r){console.warn("Failed to draw legend on canvas:",r)}}screenshot(e={}){const{width:t=1920,height:i=1080,filename:r}=e,n=new A.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0});n.setSize(t,i),n.setPixelRatio(1);const s=this.camera.clone();s.aspect=t/i,s.updateProjectionMatrix(),n.render(this.scene,s),this.compositeCanvas.width=t,this.compositeCanvas.height=i,this.compositeCtx.drawImage(n.domElement,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,t,i,s);const a=this.compositeCanvas.toDataURL("image/png");n.dispose();const l=r?`${r}.png`:`globe-${Date.now()}.png`;this.downloadFile(a,l)}startVideoRecording(e={}){return new Promise(t=>{if(this.isRecording){t();return}const i=this.renderer.domElement;this.compositeCanvas.width=i.width,this.compositeCanvas.height=i.height,this.compositeCtx.drawImage(i,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,this.compositeCanvas.width,this.compositeCanvas.height);const r=this.compositeCanvas.captureStream(60),n=[{mime:"video/mp4;codecs=avc1",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=h264",ext:"webm"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];let s="video/webm",a="webm";for(const{mime:c,ext:u}of n)if(MediaRecorder.isTypeSupported(c)){s=c,a=u,console.log(`Video recording using: ${c}`);break}this.mediaRecorder=new MediaRecorder(r,{mimeType:s,videoBitsPerSecond:8e6}),this.recordedChunks=[];const l=a;this.mediaRecorder.ondataavailable=c=>{c.data.size>0&&this.recordedChunks.push(c.data)},this.mediaRecorder.onstop=()=>{const c=s.split(";")[0],u=new Blob(this.recordedChunks,{type:c}),h=URL.createObjectURL(u);this.downloadFile(h,`globe-${Date.now()}.${l}`),URL.revokeObjectURL(h)},this.mediaRecorder.onstart=()=>{this.isRecording=!0,setTimeout(()=>t(),50)},this.mediaRecorder.start(100)})}updateVideoFrame(){if(!this.isRecording||!this.mediaRecorder)return;const e=this.compositeCanvas.width,t=this.compositeCanvas.height;this.compositeCtx.drawImage(this.renderer.domElement,0,0,e,t),this.drawOverlaysOnCanvas(this.compositeCtx,e,t)}stopVideoRecording(){!this.isRecording||!this.mediaRecorder||(this.mediaRecorder.stop(),this.isRecording=!1)}startGifCapture(e={}){if(this.isRecording)return;this.frames=[],this.isRecording=!0;const{width:t=480,height:i=270}=e;this.gifWidth=t,this.gifHeight=i,this.captureCanvas.width=t,this.captureCanvas.height=i}captureGifFrame(){if(!this.isRecording)return;const e=this.renderer.domElement,t=this.gifWidth,i=this.gifHeight;this.captureCtx.drawImage(e,0,0,t,i),this.drawOverlaysOnCanvas(this.captureCtx,t,i);const r=this.captureCtx.getImageData(0,0,t,i);this.frames.push({data:new Uint8ClampedArray(r.data),width:t,height:i})}async stopGifCapture(e={}){if(!this.isRecording)return;if(this.isRecording=!1,this.frames.length===0){console.warn("No frames captured for GIF");return}const{fps:t=20,filename:i}=e,r=Math.round(1e3/t);console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);try{const n=this.frames[0],s=n.width,a=n.height,l=la(n.data,256),c=fa();for(let m=0;m<this.frames.length;m++){const d=this.frames[m],g=ua(d.data,l);c.writeFrame(g,s,a,{palette:m===0?l:void 0,delay:r,repeat:m===0?0:void 0}),m%10===0&&await new Promise(y=>setTimeout(y,0))}c.finish();const u=c.bytes(),h=new Blob([u],{type:"image/gif"}),f=URL.createObjectURL(h),p=i||`globe-${Date.now()}.gif`;this.downloadFile(f,p),setTimeout(()=>URL.revokeObjectURL(f),1e3),console.log(`GIF saved: ${p} (${this.frames.length} frames, ${(h.size/1024).toFixed(1)}KB)`)}catch(n){console.error("Failed to generate GIF:",n)}this.frames=[]}getIsRecording(){return this.isRecording}getFrameCount(){return this.frames.length}downloadFile(e,t){const i=document.createElement("a");i.href=e,i.download=t,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}const pn={"%":o=>`${o.toFixed(1)}%`,$:o=>`$${o.toLocaleString()}`,years:o=>`${o.toFixed(1)} yrs`,"% GDP":o=>`${o.toFixed(1)}%`,"% of GDP":o=>`${o.toFixed(1)}%`,index:o=>o.toFixed(3),"":o=>o.toFixed(3)},ba=["per capita","per 100","per 1000"];function $i(o){return pn[o]?pn[o]:ba.some(e=>o.includes(e))?e=>`${e.toFixed(1)}`:e=>{const t=Number.isInteger(e)?e.toLocaleString():e.toFixed(1);return o?`${t} ${o}`:t}}function va(o,e,t){return(t??$i(e))(o)}let mn=!1;function Ea(){if(mn)return;mn=!0;const o=document.createElement("style");o.setAttribute("data-gralobe-legend","true"),o.textContent=`
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
  `,document.head.appendChild(o)}class wa{element;parentContainer;visible=!1;resizeObserver=null;constructor(e){Ea(),this.parentContainer=e,getComputedStyle(e).position==="static"&&(e.style.position="relative"),this.element=document.createElement("div"),this.element.className="gralobe-legend",this.element.setAttribute("data-testid","globe-legend"),this.element.innerHTML=`
      <div class="gralobe-legend-hint">G: view · F: fullscreen</div>
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `,e.appendChild(this.element),this.updateSize(),this.resizeObserver=new ResizeObserver(()=>this.updateSize()),this.resizeObserver.observe(e)}getSizeClass(e,t){const i=Math.min(e,t);return i<200?"xs":i<300?"sm":i<450?"md":"lg"}updateSize(){const e=this.parentContainer.clientWidth,t=this.parentContainer.clientHeight,i=this.getSizeClass(e,t);this.element.classList.remove("size-xs","size-sm","size-md","size-lg"),this.element.classList.add(`size-${i}`)}show(e){const t=this.element.querySelector(".gralobe-legend-title"),i=this.element.querySelector(".gralobe-legend-gradient"),r=this.element.querySelector(".gralobe-legend-min"),n=this.element.querySelector(".gralobe-legend-max"),s=this.element.querySelector(".gralobe-legend-description");t.textContent=e.name,s.textContent=e.description;const[a,l,c]=e.colorScale;i.style.background=`linear-gradient(to right, ${a}, ${l}, ${c})`;const u=e.format??$i(e.unit);r.textContent=u(e.domain[0]),n.textContent=u(e.domain[1]),this.element.classList.add("visible"),this.visible=!0}hide(){this.element.classList.remove("visible"),this.visible=!1}isVisible(){return this.visible}getElement(){return this.element}dispose(){this.resizeObserver?.disconnect(),this.element.remove()}}const J=50,Ca=`
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
`,Pa=`
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
`,Aa=`
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
`,Sa=`
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
`,Ta=`
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
`,Ma=`
uniform float uOpacity;
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9 * uOpacity);
}
`,gn=Math.PI/180;function Da(o,e,t=J){const i=(90-o)*gn,r=(e+180)*gn;return new A.Vector3(-t*Math.sin(i)*Math.cos(r),t*Math.cos(i),t*Math.sin(i)*Math.sin(r))}function Ia(o,e){const t=2*Math.PI*J,i=Math.PI*J;return new A.Vector3(e/180*(t/2),o/90*(i/2),0)}const La={style:"spike",color:"#0ea5e9",maxHeight:15,pulseAnimation:!0,opacity:.9};class Ra{group;markers=[];config;markerMeshes=[];glowMeshes=[];morph=1;time=0;markerMaterial;glowMaterial;constructor(e={}){this.group=new A.Group,this.config={...La,...e},this.markerMaterial=new A.MeshBasicMaterial({color:new A.Color(this.config.color),transparent:!0,opacity:this.config.opacity}),this.glowMaterial=new A.ShaderMaterial({uniforms:{uColor:{value:new A.Color(this.config.color)},uTime:{value:0},uPulse:{value:this.config.pulseAnimation?1:0}},vertexShader:`
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
      `,transparent:!0,blending:A.AdditiveBlending,side:A.BackSide,depthWrite:!1})}getGroup(){return this.group}setMarkers(e){this.markers=e,this.rebuild()}setConfig(e){this.config={...this.config,...e},e.color&&(this.markerMaterial.color.set(e.color),this.glowMaterial.uniforms.uColor.value.set(e.color)),e.opacity!==void 0&&(this.markerMaterial.opacity=e.opacity),e.pulseAnimation!==void 0&&(this.glowMaterial.uniforms.uPulse.value=e.pulseAnimation?1:0),this.rebuild()}setMorph(e){this.morph=e,this.updatePositions()}update(e){this.time=e,this.glowMaterial.uniforms.uTime.value=e}rebuild(){if(this.group.clear(),this.markerMeshes=[],this.glowMeshes=[],this.markers.length===0)return;const e=this.markers.map(i=>i.value),t=Math.max(...e,1);for(const i of this.markers){const r=i.value/t,n=this.createMarkerMesh(i,r);if(this.markerMeshes.push(n),this.group.add(n),this.config.style!=="dot"){const s=this.createGlowMesh(i,r);this.glowMeshes.push(s),this.group.add(s)}}this.updatePositions()}createMarkerMesh(e,t){let i;const r=2+t*this.config.maxHeight;switch(this.config.style){case"dot":i=new A.SphereGeometry(1+t*2,16,12);break;case"pin":i=new A.ConeGeometry(1.5,r,8);break;case"spike":default:i=new A.CylinderGeometry(.3,1.2,r,8);break}const n=e.color?new A.MeshBasicMaterial({color:new A.Color(e.color),transparent:!0,opacity:this.config.opacity}):this.markerMaterial,s=new A.Mesh(i,n);return s.userData={marker:e,height:r},s}createGlowMesh(e,t){const i=2+t*3,r=new A.SphereGeometry(i,16,12),n=e.color?new A.ShaderMaterial({...this.glowMaterial,uniforms:{...this.glowMaterial.uniforms,uColor:{value:new A.Color(e.color)}}}):this.glowMaterial,s=new A.Mesh(r,n);return s.userData={marker:e},s}updatePositions(){for(let e=0;e<this.markerMeshes.length;e++){const t=this.markerMeshes[e],i=t.userData.marker,r=t.userData.height,n=Da(i.lat,i.lng,J),s=Ia(i.lat,i.lng),a=this.morph*this.morph*(3-2*this.morph);if(t.position.lerpVectors(s,n,a),a>.01){if(t.lookAt(t.position.clone().multiplyScalar(2)),this.config.style==="spike"||this.config.style==="pin"){t.rotateX(Math.PI/2);const l=n.clone().normalize().multiplyScalar(r/2);t.position.add(l.multiplyScalar(a))}}else t.rotation.set(-Math.PI/2,0,0),(this.config.style==="spike"||this.config.style==="pin")&&(t.position.z=r/2);this.glowMeshes[e]&&this.glowMeshes[e].position.copy(t.position)}}getMarkerAtPosition(e,t,i){e.setFromCamera(i,t);const r=e.intersectObjects(this.markerMeshes);return r.length>0?r[0].object.userData.marker:null}dispose(){this.group.clear(),this.markerMaterial.dispose(),this.glowMaterial.dispose();for(const e of this.markerMeshes)e.geometry.dispose(),e.material!==this.markerMaterial&&e.material.dispose();for(const e of this.glowMeshes)e.geometry.dispose(),e.material!==this.glowMaterial&&e.material.dispose();this.markerMeshes=[],this.glowMeshes=[]}}const Vt={lifeExpectancy:{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],format:o=>`${o.toFixed(1)} years`},humanDevIndex:{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],format:o=>o.toFixed(3)},gdpPerCapita:{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],format:o=>`$${(o/1e3).toFixed(1)}k`},co2Emissions:{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],format:o=>`${o.toFixed(1)}t`},renewableEnergy:{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},internetUsers:{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},urbanPopulation:{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],format:o=>`${o.toFixed(0)}%`},healthExpenditure:{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],format:o=>`${o.toFixed(1)}%`},forestArea:{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],format:o=>`${o.toFixed(0)}%`},population:{id:"population",name:"Population",unit:"millions",description:"Total population",colorScale:["#fff7bc","#fec44f","#d95f0e"],domain:[1,1500],format:o=>`${o.toFixed(0)}M`},accessElectricity:{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffeda0","#feb24c","#f03b20"],domain:[20,100],format:o=>`${o.toFixed(0)}%`},educationExpenditure:{id:"educationExpenditure",name:"Education Spending",unit:"% GDP",description:"Government expenditure on education as percentage of GDP",colorScale:["#edf8fb","#7bccc4","#0868ac"],domain:[1,10],format:o=>`${o.toFixed(1)}%`}};Vt.lifeExpectancy;const Oa="https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_urban_areas.geojson";class ka{static urbanFeatures=null;static isLoading=!1;static loadPromise=null;static async loadBaseTopology(){return this.urbanFeatures?this.urbanFeatures:this.loadPromise?this.loadPromise:(this.isLoading=!0,this.loadPromise=(async()=>{try{const e=await fetch(Oa);if(!e.ok)throw new Error("Failed to load urban areas");const t=await e.json();return this.urbanFeatures=t.features,this.urbanFeatures||[]}catch(e){return console.error("UrbanMapper load error:",e),[]}finally{this.isLoading=!1}})(),this.loadPromise)}static generateSyntheticBoundary(e,t,i=20){const n=[],a=i/6371*(180/Math.PI),l=a/Math.cos(e*Math.PI/180);for(let c=0;c<=16;c++){const u=c/16*2*Math.PI,h=e+a*Math.sin(u),f=t+l*Math.cos(u);n.push([f,h])}return{type:"Feature",id:`synthetic_${e.toFixed(4)}_${t.toFixed(4)}`,properties:{name:"Unknown City",featurecla:"Synthetic Urban Area"},geometry:{type:"Polygon",coordinates:[n]}}}static async mapPointsToTopology(e){const t=await this.loadBaseTopology(),i=[],r={},n=new Set;for(const s of e){let a=null;for(const l of t)if(this.isPointInFeature(s,l)){a=l;break}if(a){const l=a.properties.name_conve||a.properties.name||`ua_${Math.random()}`,c=n.has(l)?null:JSON.parse(JSON.stringify(a));c&&(c.id=l,i.push(c),n.add(l)),r[l]=(r[l]||0)+s.value}else{const l=this.generateSyntheticBoundary(s.lat,s.lon);s.id&&(l.id=s.id),i.push(l),r[l.id]=s.value}}return{features:i,statistics:r}}static isPointInFeature(e,t){const{lat:i,lon:r}=e,n=t.geometry;if(!n)return!1;const s=n.coordinates;if(n.type==="Polygon")return this.pointInPolygon([r,i],s);if(n.type==="MultiPolygon"){for(const a of s)if(this.pointInPolygon([r,i],a))return!0}return!1}static pointInPolygon(e,t){const i=e[0],r=e[1];let n=!1;const s=t[0];for(let a=0,l=s.length-1;a<s.length;l=a++){const c=s[a][0],u=s[a][1],h=s[l][0],f=s[l][1];u>r!=f>r&&i<(h-c)*(r-u)/(f-u)+c&&(n=!n)}return n}}const yn={satellite:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",natural:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",dark:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",light:"https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",night:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",topographic:"https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"},_n={texture:"satellite",labels:"data",statistic:"lifeExpectancy",autoRotate:!1,initialView:"globe",showControls:!1,showLegend:!0,effects:{atmosphereIntensity:0,atmosphere:!1,clouds:!1,starTwinkle:!0},extrudeHeight:!1};class Fa{container;config;scene;camera;renderer;controls;globe=null;material=null;atmosphere=null;stars=null;gui=null;choropleth=null;legend=null;exporter=null;countryLabels=null;markerLayer=null;textureLoader=new A.TextureLoader;dataTexture=null;morph=0;currentStatistic=null;animationId=null;isDestroyed=!1;ready;resolveReady;constructor(e,t={}){if(typeof e=="string"){const i=document.querySelector(e);if(!i)throw new Error(`Container not found: ${e}`);this.container=i}else this.container=e;this.config={..._n,...t,effects:{..._n.effects,...t.effects}},this.ready=new Promise(i=>{this.resolveReady=i}),this.init()}async init(){const e=this.config.width||this.container.clientWidth||800,t=this.config.height||this.container.clientHeight||600;this.scene=new A.Scene,this.scene.background=new A.Color(2066),this.camera=new A.PerspectiveCamera(50,e/t,.1,1e3),this.camera.position.set(0,0,this.config.initialView==="flat"?350:150),this.renderer=new A.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement),this.controls=new bn.OrbitControls(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.minDistance=2,this.controls.maxDistance=400;try{this.choropleth=new st(this.config.topology,this.config.onLoadProgress,()=>{this.material&&this.material.uniforms.uDataTexture.value&&(this.material.uniforms.uDataTexture.value.needsUpdate=!0,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value===0&&Y.to(this.material.uniforms.uDataOpacity,{value:.7,duration:1}))}),this.config.showLegend&&(this.legend=new wa(this.container)),await this.createGlobe(),this.createStars(),this.config.effects.atmosphere&&this.createAtmosphere(),this.countryLabels=new ia(this.container,J),this.scene.add(this.countryLabels.getGroup()),this.globe&&this.countryLabels.setGlobe(this.globe),this.countryLabels.setCamera(this.camera),this.countryLabels.setStyle(this.config.labels),this.exporter=new xa(this.renderer,this.scene,this.camera),this.legend&&this.exporter.setLegendElement(this.legend.getElement()),this.countryLabels&&this.exporter.setCountryLabels(this.countryLabels),this.config.showControls&&this.createGUI(),this.setupInteraction(),await this.choropleth.waitForLoad();const i=this.choropleth.getFeatureLabels();i.length>0&&this.addCustomLabels(i),this.setStatistic(this.config.statistic)}catch(i){console.error("GlobeViz init failed:",i)}this.morph=this.config.initialView==="globe"?1:0,this.material&&(this.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),window.addEventListener("resize",this.handleResize),document.addEventListener("fullscreenchange",this.handleFullscreenChange),this.renderer.domElement.tabIndex=0,this.renderer.domElement.style.outline="none",this.renderer.domElement.addEventListener("mousedown",()=>{this.renderer.domElement.focus()}),this.renderer.domElement.addEventListener("keydown",this.handleKeydown),this.animate(),this.resolveReady()}handleKeydown=e=>{this.isDestroyed||document.activeElement===this.renderer.domElement&&((e.key==="g"||e.key==="G")&&(this.morph>.5?this.toFlat():this.toGlobe()),(e.key==="f"||e.key==="F")&&this.toggleFullscreen())};async createGlobe(){const e=await this.textureLoader.loadAsync(yn[this.config.texture]);e.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),e.minFilter=A.LinearMipmapLinearFilter,e.magFilter=A.LinearFilter;const t=document.createElement("canvas");t.width=2048,t.height=1024,this.dataTexture=new A.CanvasTexture(t);const i=new A.PlaneGeometry(Math.PI*2*J,Math.PI*J,256,128);this.material=new A.ShaderMaterial({vertexShader:Ca,fragmentShader:Pa,uniforms:{uMorph:{value:0},uTime:{value:0},uParchment:{value:0},uExtremeParchment:{value:0},uTransitionEffect:{value:0},uTexture:{value:e},uDataTexture:{value:this.dataTexture},uCloudTexture:{value:null},uNightTexture:{value:null},uDataOpacity:{value:0},uDataOverlay:{value:0},uExtrudeHeight:{value:this.config.extrudeHeight?1:0},uSunDir:{value:new A.Vector3(1,.5,1).normalize()},uClouds:{value:this.config.effects.clouds?1:0},uCloudSpeed:{value:this.config.effects.cloudSpeed||1},uCloudOpacity:{value:this.config.effects.cloudOpacity||.6},uAtmosphereIntensity:{value:this.config.effects.atmosphereIntensity||0},uAurora:{value:this.config.effects.aurora?1:0},uAuroraIntensity:{value:1},uCityLights:{value:this.config.effects.cityLights?1:0},uCityLightsIntensity:{value:1},uOceanSpecular:{value:this.config.effects.oceanSpecular?1:0},uSpecularIntensity:{value:1},uSunGlow:{value:0},uGridLines:{value:this.config.effects.gridLines?1:0},uGridOpacity:{value:this.config.effects.gridOpacity||.5},uScanEffect:{value:0},uScanSpeed:{value:1},uHologram:{value:this.config.effects.hologramMode?1:0},uHologramColor:{value:new A.Color(65535)},uVintage:{value:this.config.effects.vintageMode?1:0},uThermal:{value:this.config.effects.thermalMode?1:0},uBlueprint:{value:this.config.effects.blueprintMode?1:0},uGlowPulse:{value:this.config.effects.glowPulse?1:0},uGlowColor:{value:new A.Color(4491519)}},side:A.DoubleSide}),this.globe=new A.Mesh(i,this.material),this.scene.add(this.globe)}createAtmosphere(){const e=new A.PlaneGeometry(Math.PI*2*J*1.15,Math.PI*J*1.15,128,64),t=new A.ShaderMaterial({vertexShader:Aa,fragmentShader:Sa,uniforms:{uMorph:{value:0},uOpacity:{value:1}},side:A.BackSide,transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.atmosphere=new A.Mesh(e,t),this.scene.add(this.atmosphere)}createStars(){const t=new A.BufferGeometry,i=new Float32Array(3e3*3),r=new Float32Array(3e3),n=new Float32Array(3e3);for(let a=0;a<3e3;a++){const l=300+Math.random()*300,c=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1);i[a*3]=l*Math.sin(u)*Math.cos(c),i[a*3+1]=l*Math.sin(u)*Math.sin(c),i[a*3+2]=l*Math.cos(u),r[a]=.5+Math.random()*1.5,n[a]=Math.random()*Math.PI*2}t.setAttribute("position",new A.BufferAttribute(i,3)),t.setAttribute("aSize",new A.BufferAttribute(r,1)),t.setAttribute("aPhase",new A.BufferAttribute(n,1));const s=new A.ShaderMaterial({vertexShader:Ta,fragmentShader:Ma,uniforms:{uTime:{value:0},uTwinkle:{value:this.config.effects.starTwinkle?1:0},uOpacity:{value:1}},transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.stars=new A.Points(t,s),this.scene.add(this.stars)}createGUI(){getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative"),this.gui=new Oi({container:this.container,title:"⚙ Controls",width:220,closeFolders:!0});const t=this.gui.domElement;t.style.position="absolute",t.style.top="8px",t.style.right="8px",t.style.zIndex="100",this.gui.close();const i=this.gui.addFolder("View");i.add({toGlobe:()=>this.toGlobe()},"toGlobe").name("→ Globe"),i.add({toFlat:()=>this.toFlat()},"toFlat").name("→ Flat"),i.add({morph:this.morph},"morph",0,1).name("Morph").onChange(l=>this.setMorph(l));const r=this.gui.addFolder("Statistics"),n=Object.keys(Vt);r.add({stat:this.config.statistic},"stat",n).name("Statistic").onChange(l=>this.setStatistic(l));const s=["none","minimal","major","all","all-countries","data"];this.gui.addFolder("Display").add({labels:this.config.labels},"labels",s).name("Labels").onChange(l=>this.setLabels(l)),this.gui.add(this.config,"autoRotate").name("Auto Rotate"),this.gui.addFolder("Export").add({screenshot:()=>this.screenshot({width:1920,height:1080})},"screenshot").name("📷 Screenshot")}handleResize=()=>{if(this.isDestroyed)return;const e=this.config.width||this.container.clientWidth,t=this.config.height||this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.countryLabels?.resize(e,t)};handleFullscreenChange=()=>{this.isDestroyed||setTimeout(()=>this.handleResize(),50)};animate=()=>{if(this.isDestroyed)return;this.animationId=requestAnimationFrame(this.animate);const e=performance.now()*.001;this.material&&(this.material.uniforms.uTime.value=e),this.stars&&(this.stars.material.uniforms.uTime.value=e),this.controls.update(),this.config.autoRotate&&this.globe&&(this.globe.rotation.y+=.002*this.morph),this.countryLabels?.update(),this.markerLayer?.update(e),this.renderer.render(this.scene,this.camera),this.countryLabels?.render(this.scene,this.camera)};toGlobe(){this.controls.enableRotate=!0,this.controls.minAzimuthAngle=-1/0,this.controls.maxAzimuthAngle=1/0,this.controls.minPolarAngle=0,this.controls.maxPolarAngle=Math.PI,this.controls.screenSpacePanning=!1,this.controls.mouseButtons={LEFT:A.MOUSE.ROTATE,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.PAN};let e=0;const t=this.choropleth?.getBounds();if(t){const[i,r,n,s]=t;e=-((i+n)/2)*(Math.PI/180)}Y.to(this,{morph:1,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("globe",this.morph)}}),Y.to(this.camera.position,{x:0,y:0,z:200,duration:2.5,ease:"power2.inOut"}),Y.to(this.controls.target,{x:0,y:0,z:0,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.controls.update()}}),this.globe&&Y.to(this.globe.rotation,{y:e,x:0,z:0,duration:2.5,ease:"power2.inOut"}),this.stars&&Y.to(this.stars.material.uniforms.uOpacity,{value:1,duration:1}),this.atmosphere&&Y.to(this.atmosphere.material.uniforms.uOpacity,{value:1,duration:1})}toFlat(){const e=this.choropleth?.getBounds(),t=Math.PI*2*J,i=Math.PI*J;let r=0,n=0,s=t,a=i;if(e){const[p,m,d,g]=e,y=p/180*(t/2),_=d/180*(t/2),x=m/90*(i/2),v=g/90*(i/2);r=(y+_)/2,n=(x+v)/2,s=(_-y)*1.2,a=(v-x)*1.2}const l=this.camera.fov*Math.PI/180,c=this.camera.aspect,u=a/2/Math.tan(l/2),h=s/(2*Math.tan(l/2)*c),f=Math.max(u,h);this.controls.enabled=!1,Y.to(this,{morph:0,duration:2,ease:"power3.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("flat",this.morph)},onComplete:()=>{this.controls.enabled=!0,this.controls.enableRotate=!1,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.minAzimuthAngle=0,this.controls.maxAzimuthAngle=0,this.controls.minPolarAngle=Math.PI/2,this.controls.maxPolarAngle=Math.PI/2,this.controls.target.set(r,n,0),this.controls.update()}}),this.globe&&Y.to(this.globe.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),this.atmosphere&&Y.to(this.atmosphere.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),Y.to(this.camera.position,{x:r,y:n,z:f,duration:2,ease:"power3.inOut"}),Y.to(this.controls.target,{x:r,y:n,z:0,duration:2,ease:"power3.inOut"}),Y.to(this.camera.up,{x:0,y:1,z:0,duration:2,ease:"power3.inOut"}),this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:A.MOUSE.PAN,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.ROTATE},this.stars&&Y.to(this.stars.material.uniforms.uOpacity,{value:0,duration:1}),this.atmosphere&&Y.to(this.atmosphere.material.uniforms.uOpacity,{value:0,duration:1})}setupInteraction(){const e=new A.Raycaster,t=new A.Vector2,i=new A.Plane(new A.Vector3(0,0,1),0),r=new A.Vector3;let n=!1,s=new Date().getTime();this.renderer.domElement.addEventListener("mousedown",()=>{n=!1,s=new Date().getTime()}),this.renderer.domElement.addEventListener("mousemove",()=>{n=!0}),this.renderer.domElement.addEventListener("click",a=>{if(n&&new Date().getTime()-s>200)return;const l=this.renderer.domElement.getBoundingClientRect();if(t.x=(a.clientX-l.left)/l.width*2-1,t.y=-((a.clientY-l.top)/l.height)*2+1,this.morph<.1&&(e.setFromCamera(t,this.camera),e.ray.intersectPlane(i,r),r)){const c=Math.PI*J,u=Math.PI*J/2;Math.abs(r.x)<=c&&Math.abs(r.y)<=u&&(Y.to(this.controls.target,{x:r.x,y:r.y,z:0,duration:1.5,ease:"power2.inOut"}),Y.to(this.camera.position,{x:r.x,y:r.y,z:50,duration:1.5,ease:"power2.inOut"}))}}),this.renderer.domElement.addEventListener("dblclick",()=>{this.morph<.1&&this.toFlat()})}setMorph(e){this.morph=Math.max(0,Math.min(1,e)),this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph)}getMorph(){return this.morph}setStatistic(e){if(typeof e=="string"){if(!Vt[e]){console.warn(`Unknown statistic: ${e}`);return}this.currentStatistic=e;const i=Ys.find(r=>r.id===e);if(i&&this.choropleth){const r=this.choropleth.renderTexture(i);if(this.material&&r){const n=new A.CanvasTexture(r);n.needsUpdate=!0,this.material.uniforms.uDataTexture.value=n,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}if(this.legend&&i&&this.legend.show(i),this.countryLabels&&this.choropleth){const r=this.choropleth.getStatsMap(),n=r?Array.from(r.values()).map(s=>s.code):[];this.countryLabels.setDataIds(n)}}else{const t=e;if(this.currentStatistic=t.definition.id,this.choropleth){const i=this.choropleth.renderCustomTexture(t.values,t.definition.colorScale,t.definition.domain);if(this.material&&i){const r=new A.CanvasTexture(i);r.needsUpdate=!0,this.material.uniforms.uDataTexture.value=r,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}if(this.legend&&this.legend.show(t.definition),this.countryLabels){const i=t.values instanceof Map?Object.fromEntries(t.values):t.values;this.countryLabels.setDataIds(Object.keys(i))}}}setLabels(e){this.countryLabels?.setStyle(e)}addCustomLabels(e){this.countryLabels?.addCustomLabels(e)}clearCustomLabels(){this.countryLabels?.clearCustomLabels()}async setTexture(e){const t=yn[e];if(!(!t||!this.material))try{const i=await this.textureLoader.loadAsync(t);i.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),i.minFilter=A.LinearMipmapLinearFilter,i.magFilter=A.LinearFilter,this.material.uniforms.uTexture.value=i}catch(i){console.error("Failed to load texture:",e,i)}}setAutoRotate(e){this.config.autoRotate=e}screenshot(e){this.exporter?.screenshot(e)}async recordGif(e){if(!this.exporter)return;const t=e?.duration||5,i=e?.fps||20,r=t*i;this.exporter.startGifCapture(e);for(let n=0;n<r;n++)this.exporter.captureGifFrame(),await new Promise(s=>setTimeout(s,1e3/i))}async recordVideo(e){if(!this.exporter)return;const t=e?.duration||5;await this.exporter.startVideoRecording(e),await new Promise(i=>setTimeout(i,t*1e3)),this.exporter.stopVideoRecording()}setEffects(e){Object.assign(this.config.effects,e),this.material&&(e.atmosphere!==void 0&&(e.atmosphere&&!this.atmosphere?this.createAtmosphere():!e.atmosphere&&this.atmosphere&&(this.scene.remove(this.atmosphere),this.atmosphere.geometry.dispose(),this.atmosphere.material.dispose(),this.atmosphere=null)),e.clouds!==void 0&&(this.material.uniforms.uClouds.value=e.clouds?1:0),e.cloudSpeed!==void 0&&(this.material.uniforms.uCloudSpeed.value=e.cloudSpeed),e.cloudOpacity!==void 0&&(this.material.uniforms.uCloudOpacity.value=e.cloudOpacity),e.atmosphereIntensity!==void 0&&(this.material.uniforms.uAtmosphereIntensity.value=e.atmosphereIntensity),e.gridLines!==void 0&&(this.material.uniforms.uGridLines.value=e.gridLines?1:0),e.gridOpacity!==void 0&&(this.material.uniforms.uGridOpacity.value=e.gridOpacity),e.glowPulse!==void 0&&(this.material.uniforms.uGlowPulse.value=e.glowPulse?1:0),e.starTwinkle!==void 0&&this.stars&&(this.stars.material.uniforms.uTwinkle.value=e.starTwinkle?1:0))}setMarkers(e,t){this.markerLayer?t&&this.markerLayer.setConfig(t):(this.markerLayer=new Ra(t),this.scene.add(this.markerLayer.getGroup()),this.markerLayer.setMorph(this.morph)),this.markerLayer.setMarkers(e)}async setUrbanData(e){if(!this.choropleth)return;const t=await ka.mapPointsToTopology(e);this.choropleth.setFeatures(t.features);const i=this.choropleth.getFeatureLabels();i.length>0&&this.addCustomLabels(i);const r=["#ffffb2","#fd8d3c","#bd0026"],n=Object.values(t.statistics),s=Math.max(...n,1);this.choropleth.renderCustomTexture(t.statistics,r,[0,s]),this.material&&(this.material.uniforms.uCityLights.value=1,this.config.effects.cityLights=!0),this.countryLabels&&(this.countryLabels.getGroup().visible=!1)}resize(e,t){this.config.width=e,this.config.height=t,this.handleResize()}async toggleFullscreen(){document.fullscreenElement?(await document.exitFullscreen(),setTimeout(()=>this.handleResize(),100)):(await this.container.requestFullscreen(),setTimeout(()=>this.handleResize(),100))}isFullscreen(){return document.fullscreenElement===this.container}destroy(){this.isDestroyed=!0,this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.handleResize),window.removeEventListener("keydown",this.handleKeydown),document.removeEventListener("fullscreenchange",this.handleFullscreenChange),this.gui?.destroy(),this.legend?.dispose(),this.countryLabels?.dispose(),this.markerLayer?.dispose(),this.globe?.geometry.dispose(),this.globe?.material?.dispose(),this.atmosphere?.geometry.dispose(),this.atmosphere?.material?.dispose(),this.stars?.geometry.dispose(),this.stars?.material?.dispose(),this.renderer.dispose(),this.container.removeChild(this.renderer.domElement)}}q.BUILT_IN_STATISTICS=Vt,q.GlobeViz=Fa,q.WORLD_STATISTICS=ki,q.createFormatter=$i,q.formatValue=va,q.normalizeCountryValues=sn,q.toNumericCode=Fi,Object.defineProperty(q,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=gralobe.umd.cjs.map
