(function(le,S){typeof exports=="object"&&typeof module<"u"?S(exports,require("three")):typeof define=="function"&&define.amd?define(["exports","three"],S):(le=typeof globalThis<"u"?globalThis:le||self,S(le.Gralobe={},le.THREE))})(this,(function(le,S){"use strict";function Ir(o){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(o){for(const t in o)if(t!=="default"){const i=Object.getOwnPropertyDescriptor(o,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>o[t]})}}return e.default=o,Object.freeze(e)}const A=Ir(S);function Pe(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function Zi(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.__proto__=e}var he={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},qe={duration:.5,overwrite:!1,delay:0},Kt,X,z,me=1e8,k=1/me,Xt=Math.PI*2,Lr=Xt/4,Rr=0,Wi=Math.sqrt,kr=Math.cos,Ur=Math.sin,W=function(e){return typeof e=="string"},V=function(e){return typeof e=="function"},Ce=function(e){return typeof e=="number"},qt=function(e){return typeof e>"u"},xe=function(e){return typeof e=="object"},te=function(e){return e!==!1},Qt=function(){return typeof window<"u"},Tt=function(e){return V(e)||W(e)},Ki=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},q=Array.isArray,Jt=/(?:-?\.?\d|\.)+/gi,Xi=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Qe=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ei=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,qi=/[+-]=-?[.\d]+/,Qi=/[^,'"\[\]\s]+/gi,Fr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,B,be,ti,ii,ce={},Dt={},Ji,en=function(e){return(Dt=et(e,ce))&&re},ni=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ut=function(e,t){return!t&&console.warn(e)},tn=function(e,t){return e&&(ce[e]=t)&&Dt&&(Dt[e]=t)||ce},dt=function(){return 0},zr={suppressEvents:!0,isStart:!0,kill:!1},Ot={suppressEvents:!0,kill:!1},Nr={suppressEvents:!0},ri={},Te=[],si={},nn,ue={},oi={},rn=30,It=[],ai="",li=function(e){var t=e[0],i,n;if(xe(t)||V(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=It.length;n--&&!It[n].targetTest(t););i=It[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new Ln(e[n],i)))||e.splice(n,1);return e},ze=function(e){return e._gsap||li(_e(e))[0]._gsap},sn=function(e,t,i){return(i=e[t])&&V(i)?e[t]():qt(i)&&e.getAttribute&&e.getAttribute(t)||i},ie=function(e,t){return(e=e.split(",")).forEach(t)||e},j=function(e){return Math.round(e*1e5)/1e5||0},Y=function(e){return Math.round(e*1e7)/1e7||0},Je=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},Br=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},Lt=function(){var e=Te.length,t=Te.slice(0),i,n;for(si={},Te.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},hi=function(e){return!!(e._initted||e._startAt||e.add)},on=function(e,t,i,n){Te.length&&!X&&Lt(),e.render(t,i,!!(X&&t<0&&hi(e))),Te.length&&!X&&Lt()},an=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Qi).length<2?t:W(e)?e.trim():e},ln=function(e){return e},de=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},$r=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},et=function(e,t){for(var i in t)e[i]=t[i];return e},hn=function o(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=xe(t[i])?o(e[i]||(e[i]={}),t[i]):t[i]);return e},Rt=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},pt=function(e){var t=e.parent||B,i=e.keyframes?$r(q(e.keyframes)):de;if(te(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},Vr=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},cn=function(e,t,i,n,r){var s=e[n],a;if(r)for(a=t[r];s&&s[r]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=s,t.parent=t._dp=e,t},kt=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,s=t._next;r?r._next=s:e[i]===t&&(e[i]=s),s?s._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},De=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ne=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Gr=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ci=function(e,t,i,n){return e._startAt&&(X?e._startAt.revert(Ot):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},jr=function o(e){return!e||e._ts&&o(e.parent)},un=function(e){return e._repeat?tt(e._tTime,e=e.duration()+e._rDelay)*e:0},tt=function(e,t){var i=Math.floor(e=Y(e/t));return e&&i===e?i-1:i},Ut=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ft=function(e){return e._end=Y(e._start+(e._tDur/Math.abs(e._ts||e._rts||k)||0))},zt=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Y(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ft(e),i._dirty||Ne(i,e)),e},dn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ut(e.rawTime(),t),(!t._dur||mt(0,t.totalDuration(),i)-t._tTime>k)&&t.render(i,!0)),Ne(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-k}},ve=function(e,t,i,n){return t.parent&&De(t),t._start=Y((Ce(i)?i:i||e!==B?ge(e,i,t):e._time)+t._delay),t._end=Y(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),cn(e,t,"_first","_last",e._sort?"_start":0),ui(t)||(e._recent=t),n||dn(e,t),e._ts<0&&zt(e,e._tTime),e},pn=function(e,t){return(ce.ScrollTrigger||ni("scrollTrigger",t))&&ce.ScrollTrigger.create(t,e)},fn=function(e,t,i,n,r){if(bi(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!X&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&nn!==fe.frame)return Te.push(e),e._lazy=[r,n],1},Yr=function o(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||o(t))},ui=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Hr=function(e,t,i,n){var r=e.ratio,s=t<0||!t&&(!e._start&&Yr(e)&&!(!e._initted&&ui(e))||(e._ts<0||e._dp._ts<0)&&!ui(e))?0:1,a=e._rDelay,l=0,h,c,u;if(a&&e._repeat&&(l=mt(0,e._tDur,t),c=tt(l,a),e._yoyo&&c&1&&(s=1-s),c!==tt(e._tTime,a)&&(r=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==r||X||n||e._zTime===k||!t&&e._zTime){if(!e._initted&&fn(e,t,n,i,l))return;for(u=e._zTime,e._zTime=t||(i?k:0),i||(i=t&&!u),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,h=e._pt;h;)h.r(s,h.d),h=h._next;t<0&&ci(e,t,i,!0),e._onUpdate&&!i&&pe(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&pe(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&De(e,1),!i&&!X&&(pe(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Zr=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},it=function(e,t,i,n){var r=e._repeat,s=Y(t)||0,a=e._tTime/e._tDur;return a&&!n&&(e._time*=s/e._dur),e._dur=s,e._tDur=r?r<0?1e10:Y(s*(r+1)+e._rDelay*r):s,a>0&&!n&&zt(e,e._tTime=e._tDur*a),e.parent&&Ft(e),i||Ne(e.parent,e),e},mn=function(e){return e instanceof J?Ne(e):it(e,e._dur)},Wr={_start:0,endTime:dt,totalDuration:dt},ge=function o(e,t,i){var n=e.labels,r=e._recent||Wr,s=e.duration()>=me?r.endTime(!1):e._dur,a,l,h;return W(t)&&(isNaN(t)||t in n)?(l=t.charAt(0),h=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(h?(a<0?r:i).totalDuration()/100:1)):a<0?(t in n||(n[t]=s),n[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),h&&i&&(l=l/100*(q(i)?i[0]:i).totalDuration()),a>1?o(e,t.substr(0,a-1),i)+l:s+l)):t==null?s:+t},ft=function(e,t,i){var n=Ce(t[1]),r=(n?2:1)+(e<2?0:1),s=t[r],a,l;if(n&&(s.duration=t[1]),s.parent=i,e){for(a=s,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=te(l.vars.inherit)&&l.parent;s.immediateRender=te(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[r-1]}return new H(t[0],s,t[r+1])},Oe=function(e,t){return e||e===0?t(e):t},mt=function(e,t,i){return i<e?e:i>t?t:i},Q=function(e,t){return!W(e)||!(t=Fr.exec(e))?"":t[1]},Kr=function(e,t,i){return Oe(i,function(n){return mt(e,t,n)})},di=[].slice,gn=function(e,t){return e&&xe(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&xe(e[0]))&&!e.nodeType&&e!==be},Xr=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return W(n)&&!t||gn(n,1)?(r=i).push.apply(r,_e(n)):i.push(n)})||i},_e=function(e,t,i){return z&&!t&&z.selector?z.selector(e):W(e)&&!i&&(ti||!rt())?di.call((t||ii).querySelectorAll(e),0):q(e)?Xr(e,i):gn(e)?di.call(e,0):e?[e]:[]},pi=function(e){return e=_e(e)[0]||ut("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return _e(t,i.querySelectorAll?i:i===e?ut("Invalid scope")||ii.createElement("div"):e)}},_n=function(e){return e.sort(function(){return .5-Math.random()})},yn=function(e){if(V(e))return e;var t=xe(e)?e:{each:e},i=Be(t.ease),n=t.from||0,r=parseFloat(t.base)||0,s={},a=n>0&&n<1,l=isNaN(n)||a,h=t.axis,c=n,u=n;return W(n)?c=u={center:.5,edges:.5,end:1}[n]||0:!a&&l&&(c=n[0],u=n[1]),function(f,g,p){var d=(p||t).length,m=s[d],_,y,x,b,v,P,E,C,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,me])[1],!w){for(E=-me;E<(E=p[w++].getBoundingClientRect().left)&&w<d;);w<d&&w--}for(m=s[d]=[],_=l?Math.min(w,d)*c-.5:n%w,y=w===me?0:l?d*u/w-.5:n/w|0,E=0,C=me,P=0;P<d;P++)x=P%w-_,b=y-(P/w|0),m[P]=v=h?Math.abs(h==="y"?b:x):Wi(x*x+b*b),v>E&&(E=v),v<C&&(C=v);n==="random"&&_n(m),m.max=E-C,m.min=C,m.v=d=(parseFloat(t.amount)||parseFloat(t.each)*(w>d?d-1:h?h==="y"?d/w:w:Math.max(w,d/w))||0)*(n==="edges"?-1:1),m.b=d<0?r-d:r,m.u=Q(t.amount||t.each)||0,i=i&&d<0?Dn(i):i}return d=(m[f]-m.min)/m.max||0,Y(m.b+(i?i(d):d)*m.v)+m.u}},fi=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=Y(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Ce(i)?0:Q(i))}},xn=function(e,t){var i=q(e),n,r;return!i&&xe(e)&&(n=i=e.radius||me,e.values?(e=_e(e.values),(r=!Ce(e[0]))&&(n*=n)):e=fi(e.increment)),Oe(t,i?V(e)?function(s){return r=e(s),Math.abs(r-s)<=n?r:s}:function(s){for(var a=parseFloat(r?s.x:s),l=parseFloat(r?s.y:0),h=me,c=0,u=e.length,f,g;u--;)r?(f=e[u].x-a,g=e[u].y-l,f=f*f+g*g):f=Math.abs(e[u]-a),f<h&&(h=f,c=u);return c=!n||h<=n?e[c]:s,r||c===s||Ce(s)?c:c+Q(s)}:fi(e))},bn=function(e,t,i,n){return Oe(q(e)?!t:i===!0?!!(i=0):!n,function(){return q(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},qr=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,s){return s(r)},n)}},Qr=function(e,t){return function(i){return e(parseFloat(i))+(t||Q(i))}},Jr=function(e,t,i){return En(e,t,0,1,i)},vn=function(e,t,i){return Oe(i,function(n){return e[~~t(n)]})},es=function o(e,t,i){var n=t-e;return q(e)?vn(e,o(0,e.length),t):Oe(i,function(r){return(n+(r-e)%n)%n+e})},ts=function o(e,t,i){var n=t-e,r=n*2;return q(e)?vn(e,o(0,e.length-1),t):Oe(i,function(s){return s=(r+(s-e)%r)%r||0,e+(s>n?r-s:s)})},gt=function(e){for(var t=0,i="",n,r,s,a;~(n=e.indexOf("random(",t));)s=e.indexOf(")",n),a=e.charAt(n+7)==="[",r=e.substr(n+7,s-n-7).match(a?Qi:Jt),i+=e.substr(t,n-t)+bn(a?r:+r[0],a?0:+r[1],+r[2]||1e-5),t=s+1;return i+e.substr(t,e.length-t)},En=function(e,t,i,n,r){var s=t-e,a=n-i;return Oe(r,function(l){return i+((l-e)/s*a||0)})},is=function o(e,t,i,n){var r=isNaN(e+t)?0:function(g){return(1-g)*e+g*t};if(!r){var s=W(e),a={},l,h,c,u,f;if(i===!0&&(n=1)&&(i=null),s)e={p:e},t={p:t};else if(q(e)&&!q(t)){for(c=[],u=e.length,f=u-2,h=1;h<u;h++)c.push(o(e[h-1],e[h]));u--,r=function(p){p*=u;var d=Math.min(f,~~p);return c[d](p-d)},i=t}else n||(e=et(q(e)?[]:{},e));if(!c){for(l in t)yi.call(a,e,l,"get",t[l]);r=function(p){return wi(p,a)||(s?e.p:e)}}}return Oe(i,r)},wn=function(e,t,i){var n=e.labels,r=me,s,a,l;for(s in n)a=n[s]-t,a<0==!!i&&a&&r>(a=Math.abs(a))&&(l=s,r=a);return l},pe=function(e,t,i){var n=e.vars,r=n[t],s=z,a=e._ctx,l,h,c;if(r)return l=n[t+"Params"],h=n.callbackScope||e,i&&Te.length&&Lt(),a&&(z=a),c=l?r.apply(h,l):r.call(h),z=s,c},_t=function(e){return De(e),e.scrollTrigger&&e.scrollTrigger.kill(!!X),e.progress()<1&&pe(e,"onInterrupt"),e},nt,Pn=[],Cn=function(e){if(e)if(e=!e.name&&e.default||e,Qt()||e.headless){var t=e.name,i=V(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:dt,render:wi,add:yi,kill:ys,modifier:_s,rawVars:0},s={targetTest:0,get:0,getSetter:Ei,aliases:{},register:0};if(rt(),e!==n){if(ue[t])return;de(n,de(Rt(e,r),s)),et(n.prototype,et(r,Rt(e,s))),ue[n.prop=t]=n,e.targetTest&&(It.push(n),ri[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}tn(t,n),e.register&&e.register(re,n,ne)}else Pn.push(e)},U=255,yt={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},mi=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*U+.5|0},An=function(e,t,i){var n=e?Ce(e)?[e>>16,e>>8&U,e&U]:0:yt.black,r,s,a,l,h,c,u,f,g,p;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),yt[e])n=yt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+r+r+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&U,n&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)==="hsl"){if(n=p=e.match(Jt),!t)l=+n[0]%360/360,h=+n[1]/100,c=+n[2]/100,s=c<=.5?c*(h+1):c+h-c*h,r=c*2-s,n.length>3&&(n[3]*=1),n[0]=mi(l+1/3,r,s),n[1]=mi(l,r,s),n[2]=mi(l-1/3,r,s);else if(~e.indexOf("="))return n=e.match(Xi),i&&n.length<4&&(n[3]=1),n}else n=e.match(Jt)||yt.transparent;n=n.map(Number)}return t&&!p&&(r=n[0]/U,s=n[1]/U,a=n[2]/U,u=Math.max(r,s,a),f=Math.min(r,s,a),c=(u+f)/2,u===f?l=h=0:(g=u-f,h=c>.5?g/(2-u-f):g/(u+f),l=u===r?(s-a)/g+(s<a?6:0):u===s?(a-r)/g+2:(r-s)/g+4,l*=60),n[0]=~~(l+.5),n[1]=~~(h*100+.5),n[2]=~~(c*100+.5)),i&&n.length<4&&(n[3]=1),n},Sn=function(e){var t=[],i=[],n=-1;return e.split(Ie).forEach(function(r){var s=r.match(Qe)||[];t.push.apply(t,s),i.push(n+=s.length+1)}),t.c=i,t},Mn=function(e,t,i){var n="",r=(e+n).match(Ie),s=t?"hsla(":"rgba(",a=0,l,h,c,u;if(!r)return e;if(r=r.map(function(f){return(f=An(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(c=Sn(e),l=i.c,l.join(n)!==c.c.join(n)))for(h=e.replace(Ie,"1").split(Qe),u=h.length-1;a<u;a++)n+=h[a]+(~l.indexOf(a)?r.shift()||s+"0,0,0,0)":(c.length?c:r.length?r:i).shift());if(!h)for(h=e.split(Ie),u=h.length-1;a<u;a++)n+=h[a]+r[a];return n+h[u]},Ie=(function(){var o="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in yt)o+="|"+e+"\\b";return new RegExp(o+")","gi")})(),ns=/hsl[a]?\(/,Tn=function(e){var t=e.join(" "),i;if(Ie.lastIndex=0,Ie.test(t))return i=ns.test(t),e[1]=Mn(e[1],i),e[0]=Mn(e[0],i,Sn(e[1])),!0},xt,fe=(function(){var o=Date.now,e=500,t=33,i=o(),n=i,r=1e3/240,s=r,a=[],l,h,c,u,f,g,p=function d(m){var _=o()-n,y=m===!0,x,b,v,P;if((_>e||_<0)&&(i+=_-t),n+=_,v=n-i,x=v-s,(x>0||y)&&(P=++u.frame,f=v-u.time*1e3,u.time=v=v/1e3,s+=x+(x>=r?4:r-x),b=1),y||(l=h(d)),b)for(g=0;g<a.length;g++)a[g](v,f,P,m)};return u={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Ji&&(!ti&&Qt()&&(be=ti=window,ii=be.document||{},ce.gsap=re,(be.gsapVersions||(be.gsapVersions=[])).push(re.version),en(Dt||be.GreenSockGlobals||!be.gsap&&be||{}),Pn.forEach(Cn)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),h=c||function(m){return setTimeout(m,s-u.time*1e3+1|0)},xt=1,p(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(l),xt=0,h=dt},lagSmoothing:function(m,_){e=m||1/0,t=Math.min(_||33,e)},fps:function(m){r=1e3/(m||240),s=u.time*1e3+r},add:function(m,_,y){var x=_?function(b,v,P,E){m(b,v,P,E),u.remove(x)}:m;return u.remove(m),a[y?"unshift":"push"](x),rt(),x},remove:function(m,_){~(_=a.indexOf(m))&&a.splice(_,1)&&g>=_&&g--},_listeners:a},u})(),rt=function(){return!xt&&fe.wake()},D={},rs=/^[\d.\-M][\d.\-,\s]/,ss=/["']/g,os=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,s=i.length,a,l,h;r<s;r++)l=i[r],a=r!==s-1?l.lastIndexOf(","):l.length,h=l.substr(0,a),t[n]=isNaN(h)?h.replace(ss,"").trim():+h,n=l.substr(a+1).trim();return t},as=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},ls=function(e){var t=(e+"").split("("),i=D[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[os(t[1])]:as(e).split(",").map(an)):D._CE&&rs.test(e)?D._CE("",e):i},Dn=function(e){return function(t){return 1-e(1-t)}},On=function o(e,t){for(var i=e._first,n;i;)i instanceof J?o(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?o(i.timeline,t):(n=i._ease,i._ease=i._yEase,i._yEase=n,i._yoyo=t)),i=i._next},Be=function(e,t){return e&&(V(e)?e:D[e]||ls(e))||t},$e=function(e,t,i,n){i===void 0&&(i=function(l){return 1-t(1-l)}),n===void 0&&(n=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},s;return ie(e,function(a){D[a]=ce[a]=r,D[s=a.toLowerCase()]=i;for(var l in r)D[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=D[a+"."+l]=r[l]}),r},In=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},gi=function o(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),s=r/Xt*(Math.asin(1/n)||0),a=function(c){return c===1?1:n*Math.pow(2,-10*c)*Ur((c-s)*r)+1},l=e==="out"?a:e==="in"?function(h){return 1-a(1-h)}:In(a);return r=Xt/r,l.config=function(h,c){return o(e,h,c)},l},_i=function o(e,t){t===void 0&&(t=1.70158);var i=function(s){return s?--s*s*((t+1)*s+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:In(i);return n.config=function(r){return o(e,r)},n};ie("Linear,Quad,Cubic,Quart,Quint,Strong",function(o,e){var t=e<5?e+1:e;$e(o+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})}),D.Linear.easeNone=D.none=D.Linear.easeIn,$e("Elastic",gi("in"),gi("out"),gi()),(function(o,e){var t=1/e,i=2*t,n=2.5*t,r=function(a){return a<t?o*a*a:a<i?o*Math.pow(a-1.5/e,2)+.75:a<n?o*(a-=2.25/e)*a+.9375:o*Math.pow(a-2.625/e,2)+.984375};$e("Bounce",function(s){return 1-r(1-s)},r)})(7.5625,2.75),$e("Expo",function(o){return Math.pow(2,10*(o-1))*o+o*o*o*o*o*o*(1-o)}),$e("Circ",function(o){return-(Wi(1-o*o)-1)}),$e("Sine",function(o){return o===1?1:-kr(o*Lr)+1}),$e("Back",_i("in"),_i("out"),_i()),D.SteppedEase=D.steps=ce.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,s=1-k;return function(a){return((n*mt(0,s,a)|0)+r)*i}}},qe.ease=D["quad.out"],ie("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(o){return ai+=o+","+o+"Params,"});var Ln=function(e,t){this.id=Rr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:sn,this.set=t?t.getSetter:Ei},bt=(function(){function o(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,it(this,+t.duration,1,1),this.data=t.data,z&&(this._ctx=z,z.data.push(this)),xt||fe.wake()}var e=o.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,it(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(rt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(zt(this,i),!r._dp||r.parent||dn(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ve(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===k||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),on(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+un(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+un(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?tt(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-k?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?Ut(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-k?0:this._rts,this.totalTime(mt(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),Ft(this),Gr(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(rt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==k&&(this._tTime-=k)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&ve(n,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(te(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ut(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Nr);var n=X;return X=i,hi(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),X=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,mn(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,mn(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(ge(this,i),te(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,te(n)),this._dur||(this._zTime=-k),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-k:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-k,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-k)},e.eventCallback=function(i,n,r){var s=this.vars;return arguments.length>1?(n?(s[i]=n,r&&(s[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete s[i],this):s[i]},e.then=function(i){var n=this;return new Promise(function(r){var s=V(i)?i:ln,a=function(){var h=n.then;n.then=null,V(s)&&(s=s(n))&&(s.then||s===n)&&(n.then=h),r(s),n.then=h};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?a():n._prom=a})},e.kill=function(){_t(this)},o})();de(bt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-k,_prom:0,_ps:!1,_rts:1});var J=(function(o){Zi(e,o);function e(i,n){var r;return i===void 0&&(i={}),r=o.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=te(i.sortChildren),B&&ve(i.parent||B,Pe(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&pn(Pe(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,s){return ft(0,arguments,this),this},t.from=function(n,r,s){return ft(1,arguments,this),this},t.fromTo=function(n,r,s,a){return ft(2,arguments,this),this},t.set=function(n,r,s){return r.duration=0,r.parent=this,pt(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new H(n,r,ge(this,s),1),this},t.call=function(n,r,s){return ve(this,H.delayedCall(0,n,r),s)},t.staggerTo=function(n,r,s,a,l,h,c){return s.duration=r,s.stagger=s.stagger||a,s.onComplete=h,s.onCompleteParams=c,s.parent=this,new H(n,s,ge(this,l)),this},t.staggerFrom=function(n,r,s,a,l,h,c){return s.runBackwards=1,pt(s).immediateRender=te(s.immediateRender),this.staggerTo(n,r,s,a,l,h,c)},t.staggerFromTo=function(n,r,s,a,l,h,c,u){return a.startAt=s,pt(a).immediateRender=te(a.immediateRender),this.staggerTo(n,r,a,l,h,c,u)},t.render=function(n,r,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,h=this._dur,c=n<=0?0:Y(n),u=this._zTime<0!=n<0&&(this._initted||!h),f,g,p,d,m,_,y,x,b,v,P,E;if(this!==B&&c>l&&n>=0&&(c=l),c!==this._tTime||s||u){if(a!==this._time&&h&&(c+=this._time-a,n+=this._time-a),f=c,b=this._start,x=this._ts,_=!x,u&&(h||(a=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(P=this._yoyo,m=h+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(m*100+n,r,s);if(f=Y(c%m),c===l?(d=this._repeat,f=h):(v=Y(c/m),d=~~v,d&&d===v&&(f=h,d--),f>h&&(f=h)),v=tt(this._tTime,m),!a&&this._tTime&&v!==d&&this._tTime-v*m-this._dur<=0&&(v=d),P&&d&1&&(f=h-f,E=1),d!==v&&!this._lock){var C=P&&v&1,w=C===(P&&d&1);if(d<v&&(C=!C),a=C?0:c%h?h:c,this._lock=1,this.render(a||(E?0:Y(d*m)),r,!h)._lock=0,this._tTime=c,!r&&this.parent&&pe(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(h=this._dur,l=this._tDur,w&&(this._lock=2,a=C?h:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;On(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Zr(this,Y(a),Y(f)),y&&(c-=f-(f=y._start))),this._tTime=c,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,a=0),!a&&c&&!r&&!v&&(pe(this,"onStart"),this._tTime!==c))return this;if(f>=a&&n>=0)for(g=this._first;g;){if(p=g._next,(g._act||f>=g._start)&&g._ts&&y!==g){if(g.parent!==this)return this.render(n,r,s);if(g.render(g._ts>0?(f-g._start)*g._ts:(g._dirty?g.totalDuration():g._tDur)+(f-g._start)*g._ts,r,s),f!==this._time||!this._ts&&!_){y=0,p&&(c+=this._zTime=-k);break}}g=p}else{g=this._last;for(var T=n<0?n:f;g;){if(p=g._prev,(g._act||T<=g._end)&&g._ts&&y!==g){if(g.parent!==this)return this.render(n,r,s);if(g.render(g._ts>0?(T-g._start)*g._ts:(g._dirty?g.totalDuration():g._tDur)+(T-g._start)*g._ts,r,s||X&&hi(g)),f!==this._time||!this._ts&&!_){y=0,p&&(c+=this._zTime=T?-k:k);break}}g=p}}if(y&&!r&&(this.pause(),y.render(f>=a?0:-k)._zTime=f>=a?1:-1,this._ts))return this._start=b,Ft(this),this.render(n,r,s);this._onUpdate&&!r&&pe(this,"onUpdate",!0),(c===l&&this._tTime>=this.totalDuration()||!c&&a)&&(b===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((n||!h)&&(c===l&&this._ts>0||!c&&this._ts<0)&&De(this,1),!r&&!(n<0&&!a)&&(c||a||!l)&&(pe(this,c===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var s=this;if(Ce(r)||(r=ge(this,r,n)),!(n instanceof bt)){if(q(n))return n.forEach(function(a){return s.add(a,r)}),this;if(W(n))return this.addLabel(n,r);if(V(n))n=H.delayedCall(0,n);else return this}return this!==n?ve(this,n,r):this},t.getChildren=function(n,r,s,a){n===void 0&&(n=!0),r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=-me);for(var l=[],h=this._first;h;)h._start>=a&&(h instanceof H?r&&l.push(h):(s&&l.push(h),n&&l.push.apply(l,h.getChildren(!0,r,s)))),h=h._next;return l},t.getById=function(n){for(var r=this.getChildren(1,1,1),s=r.length;s--;)if(r[s].vars.id===n)return r[s]},t.remove=function(n){return W(n)?this.removeLabel(n):V(n)?this.killTweensOf(n):(n.parent===this&&kt(this,n),n===this._recent&&(this._recent=this._last),Ne(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Y(fe.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),o.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=ge(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,s){var a=H.delayedCall(0,r||dt,s);return a.data="isPause",this._hasPause=1,ve(this,a,ge(this,n))},t.removePause=function(n){var r=this._first;for(n=ge(this,n);r;)r._start===n&&r.data==="isPause"&&De(r),r=r._next},t.killTweensOf=function(n,r,s){for(var a=this.getTweensOf(n,s),l=a.length;l--;)Le!==a[l]&&a[l].kill(n,r);return this},t.getTweensOf=function(n,r){for(var s=[],a=_e(n),l=this._first,h=Ce(r),c;l;)l instanceof H?Br(l._targets,a)&&(h?(!Le||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&s.push(l):(c=l.getTweensOf(a,r)).length&&s.push.apply(s,c),l=l._next;return s},t.tweenTo=function(n,r){r=r||{};var s=this,a=ge(s,n),l=r,h=l.startAt,c=l.onStart,u=l.onStartParams,f=l.immediateRender,g,p=H.to(s,de({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(h&&"time"in h?h.time:s._time))/s.timeScale())||k,onStart:function(){if(s.pause(),!g){var m=r.duration||Math.abs((a-(h&&"time"in h?h.time:s._time))/s.timeScale());p._dur!==m&&it(p,m,0,1).render(p._time,!0,!0),g=1}c&&c.apply(p,u||[])}},r));return f?p.render(0):p},t.tweenFromTo=function(n,r,s){return this.tweenTo(r,de({startAt:{time:ge(this,n)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),wn(this,ge(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),wn(this,ge(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+k)},t.shiftChildren=function(n,r,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,h;a;)a._start>=s&&(a._start+=n,a._end+=n),a=a._next;if(r)for(h in l)l[h]>=s&&(l[h]+=n);return Ne(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return o.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,s;r;)s=r._next,this.remove(r),r=s;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Ne(this)},t.totalDuration=function(n){var r=0,s=this,a=s._last,l=me,h,c,u;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-n:n));if(s._dirty){for(u=s.parent;a;)h=a._prev,a._dirty&&a.totalDuration(),c=a._start,c>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,ve(s,a,c-a._delay,1)._lock=0):l=c,c<0&&a._ts&&(r-=c,(!u&&!s._dp||u&&u.smoothChildTiming)&&(s._start+=c/s._ts,s._time-=c,s._tTime-=c),s.shiftChildren(-c,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=h;it(s,s===B&&s._time>r?s._time:r,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(n){if(B._ts&&(on(B,Ut(n,B)),nn=fe.frame),fe.frame>=rn){rn+=he.autoSleep||120;var r=B._first;if((!r||!r._ts)&&he.autoSleep&&fe._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||fe.sleep()}}},e})(bt);de(J.prototype,{_lock:0,_hasPause:0,_forcing:0});var hs=function(e,t,i,n,r,s,a){var l=new ne(this._pt,e,t,0,1,Nn,null,r),h=0,c=0,u,f,g,p,d,m,_,y;for(l.b=i,l.e=n,i+="",n+="",(_=~n.indexOf("random("))&&(n=gt(n)),s&&(y=[i,n],s(y,e,t),i=y[0],n=y[1]),f=i.match(ei)||[];u=ei.exec(n);)p=u[0],d=n.substring(h,u.index),g?g=(g+1)%5:d.substr(-5)==="rgba("&&(g=1),p!==f[c++]&&(m=parseFloat(f[c-1])||0,l._pt={_next:l._pt,p:d||c===1?d:",",s:m,c:p.charAt(1)==="="?Je(m,p)-m:parseFloat(p)-m,m:g&&g<4?Math.round:0},h=ei.lastIndex);return l.c=h<n.length?n.substring(h,n.length):"",l.fp=a,(qi.test(n)||_)&&(l.e=0),this._pt=l,l},yi=function(e,t,i,n,r,s,a,l,h,c){V(n)&&(n=n(r||0,e,s));var u=e[t],f=i!=="get"?i:V(u)?h?e[t.indexOf("set")||!V(e["get"+t.substr(3)])?t:"get"+t.substr(3)](h):e[t]():u,g=V(u)?h?fs:Fn:vi,p;if(W(n)&&(~n.indexOf("random(")&&(n=gt(n)),n.charAt(1)==="="&&(p=Je(f,n)+(Q(f)||0),(p||p===0)&&(n=p))),!c||f!==n||xi)return!isNaN(f*n)&&n!==""?(p=new ne(this._pt,e,t,+f||0,n-(f||0),typeof u=="boolean"?gs:zn,0,g),h&&(p.fp=h),a&&p.modifier(a,this,e),this._pt=p):(!u&&!(t in e)&&ni(t,n),hs.call(this,e,t,f,n,g,l||he.stringFilter,h))},cs=function(e,t,i,n,r){if(V(e)&&(e=vt(e,r,t,i,n)),!xe(e)||e.style&&e.nodeType||q(e)||Ki(e))return W(e)?vt(e,r,t,i,n):e;var s={},a;for(a in e)s[a]=vt(e[a],r,t,i,n);return s},Rn=function(e,t,i,n,r,s){var a,l,h,c;if(ue[e]&&(a=new ue[e]).init(r,a.rawVars?t[e]:cs(t[e],n,r,s,i),i,n,s)!==!1&&(i._pt=l=new ne(i._pt,r,e,0,1,a.render,a,0,a.priority),i!==nt))for(h=i._ptLookup[i._targets.indexOf(r)],c=a._props.length;c--;)h[a._props[c]]=l;return a},Le,xi,bi=function o(e,t,i){var n=e.vars,r=n.ease,s=n.startAt,a=n.immediateRender,l=n.lazy,h=n.onUpdate,c=n.runBackwards,u=n.yoyoEase,f=n.keyframes,g=n.autoRevert,p=e._dur,d=e._startAt,m=e._targets,_=e.parent,y=_&&_.data==="nested"?_.vars.targets:m,x=e._overwrite==="auto"&&!Kt,b=e.timeline,v,P,E,C,w,T,O,M,I,L,G,N,F;if(b&&(!f||!r)&&(r="none"),e._ease=Be(r,qe.ease),e._yEase=u?Dn(Be(u===!0?r:u,qe.ease)):0,u&&e._yoyo&&!e._repeat&&(u=e._yEase,e._yEase=e._ease,e._ease=u),e._from=!b&&!!n.runBackwards,!b||f&&!n.stagger){if(M=m[0]?ze(m[0]).harness:0,N=M&&n[M.prop],v=Rt(n,ri),d&&(d._zTime<0&&d.progress(1),t<0&&c&&a&&!g?d.render(-1,!0):d.revert(c&&p?Ot:zr),d._lazy=0),s){if(De(e._startAt=H.set(m,de({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!d&&te(l),startAt:null,delay:0,onUpdate:h&&function(){return pe(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(X||!a&&!g)&&e._startAt.revert(Ot),a&&p&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&p&&!d){if(t&&(a=!1),E=de({overwrite:!1,data:"isFromStart",lazy:a&&!d&&te(l),immediateRender:a,stagger:0,parent:_},v),N&&(E[M.prop]=N),De(e._startAt=H.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(X?e._startAt.revert(Ot):e._startAt.render(-1,!0)),e._zTime=t,!a)o(e._startAt,k,k);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&te(l)||l&&!p,P=0;P<m.length;P++){if(w=m[P],O=w._gsap||li(m)[P]._gsap,e._ptLookup[P]=L={},si[O.id]&&Te.length&&Lt(),G=y===m?P:y.indexOf(w),M&&(I=new M).init(w,N||v,e,G,y)!==!1&&(e._pt=C=new ne(e._pt,w,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(ae){L[ae]=C}),I.priority&&(T=1)),!M||N)for(E in v)ue[E]&&(I=Rn(E,v,e,G,w,y))?I.priority&&(T=1):L[E]=C=yi.call(e,w,E,"get",v[E],G,y,0,n.stringFilter);e._op&&e._op[P]&&e.kill(w,e._op[P]),x&&e._pt&&(Le=e,B.killTweensOf(w,L,e.globalTime(t)),F=!e.parent,Le=0),e._pt&&l&&(si[O.id]=1)}T&&Bn(e),e._onInit&&e._onInit(e)}e._onUpdate=h,e._initted=(!e._op||e._pt)&&!F,f&&t<=0&&b.render(me,!0,!0)},us=function(e,t,i,n,r,s,a,l){var h=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,u,f,g;if(!h)for(h=e._ptCache[t]=[],f=e._ptLookup,g=e._targets.length;g--;){if(c=f[g][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return xi=1,e.vars[t]="+=0",bi(e,a),xi=0,l?ut(t+" not eligible for reset"):1;h.push(c)}for(g=h.length;g--;)u=h[g],c=u._pt||u,c.s=(n||n===0)&&!r?n:c.s+(n||0)+s*c.c,c.c=i-c.s,u.e&&(u.e=j(i)+Q(u.e)),u.b&&(u.b=c.s+Q(u.b))},ds=function(e,t){var i=e[0]?ze(e[0]).harness:0,n=i&&i.aliases,r,s,a,l;if(!n)return t;r=et({},t);for(s in n)if(s in r)for(l=n[s].split(","),a=l.length;a--;)r[l[a]]=r[s];return r},ps=function(e,t,i,n){var r=t.ease||n||"power1.inOut",s,a;if(q(t))a=i[e]||(i[e]=[]),t.forEach(function(l,h){return a.push({t:h/(t.length-1)*100,v:l,e:r})});else for(s in t)a=i[s]||(i[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:r})},vt=function(e,t,i,n,r){return V(e)?e.call(t,i,n,r):W(e)&&~e.indexOf("random(")?gt(e):e},kn=ai+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Un={};ie(kn+",id,stagger,delay,duration,paused,scrollTrigger",function(o){return Un[o]=1});var H=(function(o){Zi(e,o);function e(i,n,r,s){var a;typeof n=="number"&&(r.duration=n,n=r,r=null),a=o.call(this,s?n:pt(n))||this;var l=a.vars,h=l.duration,c=l.delay,u=l.immediateRender,f=l.stagger,g=l.overwrite,p=l.keyframes,d=l.defaults,m=l.scrollTrigger,_=l.yoyoEase,y=n.parent||B,x=(q(i)||Ki(i)?Ce(i[0]):"length"in n)?[i]:_e(i),b,v,P,E,C,w,T,O;if(a._targets=x.length?li(x):ut("GSAP target "+i+" not found. https://gsap.com",!he.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=g,p||f||Tt(h)||Tt(c)){if(n=a.vars,b=a.timeline=new J({data:"nested",defaults:d||{},targets:y&&y.data==="nested"?y.vars.targets:x}),b.kill(),b.parent=b._dp=Pe(a),b._start=0,f||Tt(h)||Tt(c)){if(E=x.length,T=f&&yn(f),xe(f))for(C in f)~kn.indexOf(C)&&(O||(O={}),O[C]=f[C]);for(v=0;v<E;v++)P=Rt(n,Un),P.stagger=0,_&&(P.yoyoEase=_),O&&et(P,O),w=x[v],P.duration=+vt(h,Pe(a),v,w,x),P.delay=(+vt(c,Pe(a),v,w,x)||0)-a._delay,!f&&E===1&&P.delay&&(a._delay=c=P.delay,a._start+=c,P.delay=0),b.to(w,P,T?T(v,w,x):0),b._ease=D.none;b.duration()?h=c=0:a.timeline=0}else if(p){pt(de(b.vars.defaults,{ease:"none"})),b._ease=Be(p.ease||n.ease||"none");var M=0,I,L,G;if(q(p))p.forEach(function(N){return b.to(x,N,">")}),b.duration();else{P={};for(C in p)C==="ease"||C==="easeEach"||ps(C,p[C],P,p.easeEach);for(C in P)for(I=P[C].sort(function(N,F){return N.t-F.t}),M=0,v=0;v<I.length;v++)L=I[v],G={ease:L.e,duration:(L.t-(v?I[v-1].t:0))/100*h},G[C]=L.v,b.to(x,G,M),M+=G.duration;b.duration()<h&&b.to({},{duration:h-b.duration()})}}h||a.duration(h=b.duration())}else a.timeline=0;return g===!0&&!Kt&&(Le=Pe(a),B.killTweensOf(x),Le=0),ve(y,Pe(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(u||!h&&!p&&a._start===Y(y._time)&&te(u)&&jr(Pe(a))&&y.data!=="nested")&&(a._tTime=-k,a.render(Math.max(0,-c)||0)),m&&pn(Pe(a),m),a}var t=e.prototype;return t.render=function(n,r,s){var a=this._time,l=this._tDur,h=this._dur,c=n<0,u=n>l-k&&!c?l:n<k?0:n,f,g,p,d,m,_,y,x,b;if(!h)Hr(this,n,r,s);else if(u!==this._tTime||!n||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(f=u,x=this.timeline,this._repeat){if(d=h+this._rDelay,this._repeat<-1&&c)return this.totalTime(d*100+n,r,s);if(f=Y(u%d),u===l?(p=this._repeat,f=h):(m=Y(u/d),p=~~m,p&&p===m?(f=h,p--):f>h&&(f=h)),_=this._yoyo&&p&1,_&&(b=this._yEase,f=h-f),m=tt(this._tTime,d),f===a&&!s&&this._initted&&p===m)return this._tTime=u,this;p!==m&&(x&&this._yEase&&On(x,_),this.vars.repeatRefresh&&!_&&!this._lock&&f!==d&&this._initted&&(this._lock=s=1,this.render(Y(d*p),!0).invalidate()._lock=0))}if(!this._initted){if(fn(this,c?n:f,s,r,u))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&p!==m))return this;if(h!==this._dur)return this.render(n,r,s)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(b||this._ease)(f/h),this._from&&(this.ratio=y=1-y),!a&&u&&!r&&!m&&(pe(this,"onStart"),this._tTime!==u))return this;for(g=this._pt;g;)g.r(y,g.d),g=g._next;x&&x.render(n<0?n:x._dur*x._ease(f/this._dur),r,s)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(c&&ci(this,n,r,s),pe(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!r&&this.parent&&pe(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(c&&!this._onUpdate&&ci(this,n,!0,!0),(n||!h)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&De(this,1),!r&&!(c&&!a)&&(u||a||_)&&(pe(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),o.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,s,a,l){xt||fe.wake(),this._ts||this.play();var h=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||bi(this,h),c=this._ease(h/this._dur),us(this,n,r,s,a,c,h,l)?this.resetTo(n,r,s,a,1):(zt(this,0),this.parent||cn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?_t(this):this.scrollTrigger&&this.scrollTrigger.kill(!!X),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,Le&&Le.vars.overwrite!==!0)._first||_t(this),this.parent&&s!==this.timeline.totalDuration()&&it(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=n?_e(n):a,h=this._ptLookup,c=this._pt,u,f,g,p,d,m,_;if((!r||r==="all")&&Vr(a,l))return r==="all"&&(this._pt=0),_t(this);for(u=this._op=this._op||[],r!=="all"&&(W(r)&&(d={},ie(r,function(y){return d[y]=1}),r=d),r=ds(a,r)),_=a.length;_--;)if(~l.indexOf(a[_])){f=h[_],r==="all"?(u[_]=r,p=f,g={}):(g=u[_]=u[_]||{},p=r);for(d in p)m=f&&f[d],m&&((!("kill"in m.d)||m.d.kill(d)===!0)&&kt(this,m,"_pt"),delete f[d]),g!=="all"&&(g[d]=1)}return this._initted&&!this._pt&&c&&_t(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return ft(1,arguments)},e.delayedCall=function(n,r,s,a){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(n,r,s){return ft(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,s){return B.killTweensOf(n,r,s)},e})(bt);de(H.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ie("staggerTo,staggerFrom,staggerFromTo",function(o){H[o]=function(){var e=new J,t=di.call(arguments,0);return t.splice(o==="staggerFromTo"?5:4,0,0),e[o].apply(e,t)}});var vi=function(e,t,i){return e[t]=i},Fn=function(e,t,i){return e[t](i)},fs=function(e,t,i,n){return e[t](n.fp,i)},ms=function(e,t,i){return e.setAttribute(t,i)},Ei=function(e,t){return V(e[t])?Fn:qt(e[t])&&e.setAttribute?ms:vi},zn=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},gs=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Nn=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},wi=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},_s=function(e,t,i,n){for(var r=this._pt,s;r;)s=r._next,r.p===n&&r.modifier(e,t,i),r=s},ys=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?kt(this,t,"_pt"):t.dep||(i=1),t=n;return!i},xs=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},Bn=function(e){for(var t=e._pt,i,n,r,s;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:s)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:s=t,t=i}e._pt=r},ne=(function(){function o(t,i,n,r,s,a,l,h,c){this.t=i,this.s=r,this.c=s,this.p=n,this.r=a||zn,this.d=l||this,this.set=h||vi,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=o.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=xs,this.m=i,this.mt=r,this.tween=n},o})();ie(ai+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(o){return ri[o]=1}),ce.TweenMax=ce.TweenLite=H,ce.TimelineLite=ce.TimelineMax=J,B=new J({sortChildren:!1,defaults:qe,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),he.stringFilter=Tn;var Ve=[],Nt={},bs=[],$n=0,vs=0,Pi=function(e){return(Nt[e]||bs).map(function(t){return t()})},Ci=function(){var e=Date.now(),t=[];e-$n>2&&(Pi("matchMediaInit"),Ve.forEach(function(i){var n=i.queries,r=i.conditions,s,a,l,h;for(a in n)s=be.matchMedia(n[a]).matches,s&&(l=1),s!==r[a]&&(r[a]=s,h=1);h&&(i.revert(),l&&t.push(i))}),Pi("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),$n=e,Pi("matchMedia"))},Vn=(function(){function o(t,i){this.selector=i&&pi(i),this.data=[],this._r=[],this.isReverted=!1,this.id=vs++,t&&this.add(t)}var e=o.prototype;return e.add=function(i,n,r){V(i)&&(r=n,n=i,i=V);var s=this,a=function(){var h=z,c=s.selector,u;return h&&h!==s&&h.data.push(s),r&&(s.selector=pi(r)),z=s,u=n.apply(s,arguments),V(u)&&s._r.push(u),z=h,s.selector=c,s.isReverted=!1,u};return s.last=a,i===V?a(s,function(l){return s.add(null,l)}):i?s[i]=a:a},e.ignore=function(i){var n=z;z=null,i(this),z=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof o?i.push.apply(i,n.getTweens()):n instanceof H&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?(function(){for(var a=r.getTweens(),l=r.data.length,h;l--;)h=r.data[l],h.data==="isFlip"&&(h.revert(),h.getChildren(!0,!0,!1).forEach(function(c){return a.splice(a.indexOf(c),1)}));for(a.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,u){return u.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),l=r.data.length;l--;)h=r.data[l],h instanceof J?h.data!=="nested"&&(h.scrollTrigger&&h.scrollTrigger.revert(),h.kill()):!(h instanceof H)&&h.revert&&h.revert(i);r._r.forEach(function(c){return c(i,r)}),r.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),n)for(var s=Ve.length;s--;)Ve[s].id===this.id&&Ve.splice(s,1)},e.revert=function(i){this.kill(i||{})},o})(),Es=(function(){function o(t){this.contexts=[],this.scope=t,z&&z.data.push(this)}var e=o.prototype;return e.add=function(i,n,r){xe(i)||(i={matches:i});var s=new Vn(0,r||this.scope),a=s.conditions={},l,h,c;z&&!s.selector&&(s.selector=z.selector),this.contexts.push(s),n=s.add("onMatch",n),s.queries=i;for(h in i)h==="all"?c=1:(l=be.matchMedia(i[h]),l&&(Ve.indexOf(s)<0&&Ve.push(s),(a[h]=l.matches)&&(c=1),l.addListener?l.addListener(Ci):l.addEventListener("change",Ci)));return c&&n(s,function(u){return s.add(null,u)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},o})(),Bt={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return Cn(n)})},timeline:function(e){return new J(e)},getTweensOf:function(e,t){return B.getTweensOf(e,t)},getProperty:function(e,t,i,n){W(e)&&(e=_e(e)[0]);var r=ze(e||{}).get,s=i?ln:an;return i==="native"&&(i=""),e&&(t?s((ue[t]&&ue[t].get||r)(e,t,i,n)):function(a,l,h){return s((ue[a]&&ue[a].get||r)(e,a,l,h))})},quickSetter:function(e,t,i){if(e=_e(e),e.length>1){var n=e.map(function(c){return re.quickSetter(c,t,i)}),r=n.length;return function(c){for(var u=r;u--;)n[u](c)}}e=e[0]||{};var s=ue[t],a=ze(e),l=a.harness&&(a.harness.aliases||{})[t]||t,h=s?function(c){var u=new s;nt._pt=0,u.init(e,i?c+i:c,nt,0,[e]),u.render(1,u),nt._pt&&wi(1,nt)}:a.set(e,l);return s?h:function(c){return h(e,l,i?c+i:c,a,1)}},quickTo:function(e,t,i){var n,r=re.to(e,de((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),s=function(l,h,c){return r.resetTo(t,l,h,c)};return s.tween=r,s},isTweening:function(e){return B.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Be(e.ease,qe.ease)),hn(qe,e||{})},config:function(e){return hn(he,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,s=e.extendTimeline;(n||"").split(",").forEach(function(a){return a&&!ue[a]&&!ce[a]&&ut(t+" effect requires "+a+" plugin.")}),oi[t]=function(a,l,h){return i(_e(a),de(l||{},r),h)},s&&(J.prototype[t]=function(a,l,h){return this.add(oi[t](a,xe(l)?l:(h=l)&&{},this),h)})},registerEase:function(e,t){D[e]=Be(t)},parseEase:function(e,t){return arguments.length?Be(e,t):D},getById:function(e){return B.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new J(e),n,r;for(i.smoothChildTiming=te(e.smoothChildTiming),B.remove(i),i._dp=0,i._time=i._tTime=B._time,n=B._first;n;)r=n._next,(t||!(!n._dur&&n instanceof H&&n.vars.onComplete===n._targets[0]))&&ve(i,n,n._start-n._delay),n=r;return ve(B,i,0),i},context:function(e,t){return e?new Vn(e,t):z},matchMedia:function(e){return new Es(e)},matchMediaRefresh:function(){return Ve.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||Ci()},addEventListener:function(e,t){var i=Nt[e]||(Nt[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Nt[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:es,wrapYoyo:ts,distribute:yn,random:bn,snap:xn,normalize:Jr,getUnit:Q,clamp:Kr,splitColor:An,toArray:_e,selector:pi,mapRange:En,pipe:qr,unitize:Qr,interpolate:is,shuffle:_n},install:en,effects:oi,ticker:fe,updateRoot:J.updateRoot,plugins:ue,globalTimeline:B,core:{PropTween:ne,globals:tn,Tween:H,Timeline:J,Animation:bt,getCache:ze,_removeLinkedListItem:kt,reverting:function(){return X},context:function(e){return e&&z&&(z.data.push(e),e._ctx=z),z},suppressOverwrites:function(e){return Kt=e}}};ie("to,from,fromTo,delayedCall,set,killTweensOf",function(o){return Bt[o]=H[o]}),fe.add(J.updateRoot),nt=Bt.to({},{duration:0});var ws=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Ps=function(e,t){var i=e._targets,n,r,s;for(n in t)for(r=i.length;r--;)s=e._ptLookup[r][n],s&&(s=s.d)&&(s._pt&&(s=ws(s,n)),s&&s.modifier&&s.modifier(t[n],e,i[r],n))},Ai=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,s){s._onInit=function(a){var l,h;if(W(r)&&(l={},ie(r,function(c){return l[c]=1}),r=l),t){l={};for(h in r)l[h]=t(r[h]);r=l}Ps(a,r)}}}},re=Bt.registerPlugin({name:"attr",init:function(e,t,i,n,r){var s,a,l;this.tween=i;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],n,r,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var i=t._pt;i;)X?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Ai("roundProps",fi),Ai("modifiers"),Ai("snap",xn))||Bt;H.version=J.version=re.version="3.13.0",Ji=1,Qt()&&rt(),D.Power0,D.Power1,D.Power2,D.Power3,D.Power4,D.Linear,D.Quad,D.Cubic,D.Quart,D.Quint,D.Strong,D.Elastic,D.Back,D.SteppedEase,D.Bounce,D.Sine,D.Expo,D.Circ;var Gn,Re,st,Si,Ge,jn,Mi,Cs=function(){return typeof window<"u"},Ae={},je=180/Math.PI,ot=Math.PI/180,at=Math.atan2,Yn=1e8,Ti=/([A-Z])/g,As=/(left|right|width|margin|padding|x)/i,Ss=/[\s,\(]\S/,Ee={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Di=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ms=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ts=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ds=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Hn=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Zn=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Os=function(e,t,i){return e.style[t]=i},Is=function(e,t,i){return e.style.setProperty(t,i)},Ls=function(e,t,i){return e._gsap[t]=i},Rs=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},ks=function(e,t,i,n,r){var s=e._gsap;s.scaleX=s.scaleY=i,s.renderTransform(r,s)},Us=function(e,t,i,n,r){var s=e._gsap;s[t]=i,s.renderTransform(r,s)},$="transform",se=$+"Origin",Fs=function o(e,t){var i=this,n=this.target,r=n.style,s=n._gsap;if(e in Ae&&r){if(this.tfm=this.tfm||{},e!=="transform")e=Ee[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Se(n,a)}):this.tfm[e]=s.x?s[e]:Se(n,e),e===se&&(this.tfm.zOrigin=s.zOrigin);else return Ee.transform.split(",").forEach(function(a){return o.call(i,a,t)});if(this.props.indexOf($)>=0)return;s.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(se,t,"")),e=$}(r||t)&&this.props.push(e,t,r[e])},Wn=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},zs=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,s;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Ti,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)n[s]=this.tfm[s];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Mi(),(!r||!r.isStart)&&!i[$]&&(Wn(i),n.zOrigin&&i[se]&&(i[se]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},Kn=function(e,t){var i={target:e,props:[],revert:zs,save:Fs};return e._gsap||re.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},Xn,Oi=function(e,t){var i=Re.createElementNS?Re.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Re.createElement(e);return i&&i.style?i:Re.createElement(e)},ye=function o(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Ti,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&o(e,lt(t)||t,1)||""},qn="O,Moz,ms,Ms,Webkit".split(","),lt=function(e,t,i){var n=t||Ge,r=n.style,s=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(qn[s]+e in r););return s<0?null:(s===3?"ms":s>=0?qn[s]:"")+e},Ii=function(){Cs()&&window.document&&(Gn=window,Re=Gn.document,st=Re.documentElement,Ge=Oi("div")||{style:{}},Oi("div"),$=lt($),se=$+"Origin",Ge.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Xn=!!lt("perspective"),Mi=re.core.reverting,Si=1)},Qn=function(e){var t=e.ownerSVGElement,i=Oi("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),st.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),st.removeChild(i),r},Jn=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},er=function(e){var t,i;try{t=e.getBBox()}catch{t=Qn(e),i=1}return t&&(t.width||t.height)||i||(t=Qn(e)),t&&!t.width&&!t.x&&!t.y?{x:+Jn(e,["x","cx","x1"])||0,y:+Jn(e,["y","cy","y1"])||0,width:0,height:0}:t},tr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&er(e))},Ye=function(e,t){if(t){var i=e.style,n;t in Ae&&t!==se&&(t=$),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(Ti,"-$1").toLowerCase())):i.removeAttribute(t)}},ke=function(e,t,i,n,r,s){var a=new ne(e._pt,t,i,0,1,s?Zn:Hn);return e._pt=a,a.b=n,a.e=r,e._props.push(i),a},ir={deg:1,rad:1,turn:1},Ns={grid:1,flex:1},Ue=function o(e,t,i,n){var r=parseFloat(i)||0,s=(i+"").trim().substr((r+"").length)||"px",a=Ge.style,l=As.test(t),h=e.tagName.toLowerCase()==="svg",c=(h?"client":"offset")+(l?"Width":"Height"),u=100,f=n==="px",g=n==="%",p,d,m,_;if(n===s||!r||ir[n]||ir[s])return r;if(s!=="px"&&!f&&(r=o(e,t,i,"px")),_=e.getCTM&&tr(e),(g||s==="%")&&(Ae[t]||~t.indexOf("adius")))return p=_?e.getBBox()[l?"width":"height"]:e[c],j(g?r/p*u:r/100*p);if(a[l?"width":"height"]=u+(f?s:n),d=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!h?e:e.parentNode,_&&(d=(e.ownerSVGElement||{}).parentNode),(!d||d===Re||!d.appendChild)&&(d=Re.body),m=d._gsap,m&&g&&m.width&&l&&m.time===fe.time&&!m.uncache)return j(r/m.width*u);if(g&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=u+n,p=e[c],y?e.style[t]=y:Ye(e,t)}else(g||s==="%")&&!Ns[ye(d,"display")]&&(a.position=ye(e,"position")),d===e&&(a.position="static"),d.appendChild(Ge),p=Ge[c],d.removeChild(Ge),a.position="absolute";return l&&g&&(m=ze(d),m.time=fe.time,m.width=d[c]),j(f?p*r/u:p&&r?u/p*r:0)},Se=function(e,t,i,n){var r;return Si||Ii(),t in Ee&&t!=="transform"&&(t=Ee[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ae[t]&&t!=="transform"?(r=wt(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Vt(ye(e,se))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=$t[t]&&$t[t](e,t,i)||ye(e,t)||sn(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?Ue(e,t,r,i)+i:r},Bs=function(e,t,i,n){if(!i||i==="none"){var r=lt(t,e,1),s=r&&ye(e,r,1);s&&s!==i?(t=r,i=s):t==="borderColor"&&(i=ye(e,"borderTopColor"))}var a=new ne(this._pt,e.style,t,0,1,Nn),l=0,h=0,c,u,f,g,p,d,m,_,y,x,b,v;if(a.b=i,a.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=ye(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(d=e.style[t],e.style[t]=n,n=ye(e,t)||n,d?e.style[t]=d:Ye(e,t)),c=[i,n],Tn(c),i=c[0],n=c[1],f=i.match(Qe)||[],v=n.match(Qe)||[],v.length){for(;u=Qe.exec(n);)m=u[0],y=n.substring(l,u.index),p?p=(p+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(p=1),m!==(d=f[h++]||"")&&(g=parseFloat(d)||0,b=d.substr((g+"").length),m.charAt(1)==="="&&(m=Je(g,m)+b),_=parseFloat(m),x=m.substr((_+"").length),l=Qe.lastIndex-x.length,x||(x=x||he.units[t]||b,l===n.length&&(n+=x,a.e+=x)),b!==x&&(g=Ue(e,t,d,x)||0),a._pt={_next:a._pt,p:y||h===1?y:",",s:g,c:_-g,m:p&&p<4||t==="zIndex"?Math.round:0});a.c=l<n.length?n.substring(l,n.length):""}else a.r=t==="display"&&n==="none"?Zn:Hn;return qi.test(n)&&(a.e=0),this._pt=a,a},nr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},$s=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=nr[i]||i,t[1]=nr[n]||n,t.join(" ")},Vs=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,s=i._gsap,a,l,h;if(r==="all"||r===!0)n.cssText="",l=1;else for(r=r.split(","),h=r.length;--h>-1;)a=r[h],Ae[a]&&(l=1,a=a==="transformOrigin"?se:$),Ye(i,a);l&&(Ye(i,$),s&&(s.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",wt(i,1),s.uncache=1,Wn(n)))}},$t={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var s=e._pt=new ne(e._pt,t,i,0,0,Vs);return s.u=n,s.pr=-10,s.tween=r,e._props.push(i),1}}},Et=[1,0,0,1,0,0],rr={},sr=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},or=function(e){var t=ye(e,$);return sr(t)?Et:t.substr(7).match(Xi).map(j)},Li=function(e,t){var i=e._gsap||ze(e),n=e.style,r=or(e),s,a,l,h;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Et:r):(r===Et&&!e.offsetParent&&e!==st&&!i.svg&&(l=n.display,n.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(h=1,a=e.nextElementSibling,st.appendChild(e)),r=or(e),l?n.display=l:Ye(e,"display"),h&&(a?s.insertBefore(e,a):s?s.appendChild(e):st.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Ri=function(e,t,i,n,r,s){var a=e._gsap,l=r||Li(e,!0),h=a.xOrigin||0,c=a.yOrigin||0,u=a.xOffset||0,f=a.yOffset||0,g=l[0],p=l[1],d=l[2],m=l[3],_=l[4],y=l[5],x=t.split(" "),b=parseFloat(x[0])||0,v=parseFloat(x[1])||0,P,E,C,w;i?l!==Et&&(E=g*m-p*d)&&(C=b*(m/E)+v*(-d/E)+(d*y-m*_)/E,w=b*(-p/E)+v*(g/E)-(g*y-p*_)/E,b=C,v=w):(P=er(e),b=P.x+(~x[0].indexOf("%")?b/100*P.width:b),v=P.y+(~(x[1]||x[0]).indexOf("%")?v/100*P.height:v)),n||n!==!1&&a.smooth?(_=b-h,y=v-c,a.xOffset=u+(_*g+y*d)-_,a.yOffset=f+(_*p+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=b,a.yOrigin=v,a.smooth=!!n,a.origin=t,a.originIsAbsolute=!!i,e.style[se]="0px 0px",s&&(ke(s,a,"xOrigin",h,b),ke(s,a,"yOrigin",c,v),ke(s,a,"xOffset",u,a.xOffset),ke(s,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",b+" "+v)},wt=function(e,t){var i=e._gsap||new Ln(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,s="px",a="deg",l=getComputedStyle(e),h=ye(e,se)||"0",c,u,f,g,p,d,m,_,y,x,b,v,P,E,C,w,T,O,M,I,L,G,N,F,ae,At,St,Mt,Ke,Or,Me,Xe;return c=u=f=d=m=_=y=x=b=0,g=p=1,i.svg=!!(e.getCTM&&tr(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[$]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[$]!=="none"?l[$]:"")),n.scale=n.rotate=n.translate="none"),E=Li(e,i.svg),i.svg&&(i.uncache?(ae=e.getBBox(),h=i.xOrigin-ae.x+"px "+(i.yOrigin-ae.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),Ri(e,F||h,!!F||i.originIsAbsolute,i.smooth!==!1,E)),v=i.xOrigin||0,P=i.yOrigin||0,E!==Et&&(O=E[0],M=E[1],I=E[2],L=E[3],c=G=E[4],u=N=E[5],E.length===6?(g=Math.sqrt(O*O+M*M),p=Math.sqrt(L*L+I*I),d=O||M?at(M,O)*je:0,y=I||L?at(I,L)*je+d:0,y&&(p*=Math.abs(Math.cos(y*ot))),i.svg&&(c-=v-(v*O+P*I),u-=P-(v*M+P*L))):(Xe=E[6],Or=E[7],St=E[8],Mt=E[9],Ke=E[10],Me=E[11],c=E[12],u=E[13],f=E[14],C=at(Xe,Ke),m=C*je,C&&(w=Math.cos(-C),T=Math.sin(-C),F=G*w+St*T,ae=N*w+Mt*T,At=Xe*w+Ke*T,St=G*-T+St*w,Mt=N*-T+Mt*w,Ke=Xe*-T+Ke*w,Me=Or*-T+Me*w,G=F,N=ae,Xe=At),C=at(-I,Ke),_=C*je,C&&(w=Math.cos(-C),T=Math.sin(-C),F=O*w-St*T,ae=M*w-Mt*T,At=I*w-Ke*T,Me=L*T+Me*w,O=F,M=ae,I=At),C=at(M,O),d=C*je,C&&(w=Math.cos(C),T=Math.sin(C),F=O*w+M*T,ae=G*w+N*T,M=M*w-O*T,N=N*w-G*T,O=F,G=ae),m&&Math.abs(m)+Math.abs(d)>359.9&&(m=d=0,_=180-_),g=j(Math.sqrt(O*O+M*M+I*I)),p=j(Math.sqrt(N*N+Xe*Xe)),C=at(G,N),y=Math.abs(C)>2e-4?C*je:0,b=Me?1/(Me<0?-Me:Me):0),i.svg&&(F=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!sr(ye(e,$)),F&&e.setAttribute("transform",F))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(g*=-1,y+=d<=0?180:-180,d+=d<=0?180:-180):(p*=-1,y+=y<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+s,i.y=u-((i.yPercent=u&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+s,i.z=f+s,i.scaleX=j(g),i.scaleY=j(p),i.rotation=j(d)+a,i.rotationX=j(m)+a,i.rotationY=j(_)+a,i.skewX=y+a,i.skewY=x+a,i.transformPerspective=b+s,(i.zOrigin=parseFloat(h.split(" ")[2])||!t&&i.zOrigin||0)&&(n[se]=Vt(h)),i.xOffset=i.yOffset=0,i.force3D=he.force3D,i.renderTransform=i.svg?js:Xn?ar:Gs,i.uncache=0,i},Vt=function(e){return(e=e.split(" "))[0]+" "+e[1]},ki=function(e,t,i){var n=Q(t);return j(parseFloat(t)+parseFloat(Ue(e,"x",i+"px",n)))+n},Gs=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,ar(e,t)},He="0deg",Pt="0px",Ze=") ",ar=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,s=i.x,a=i.y,l=i.z,h=i.rotation,c=i.rotationY,u=i.rotationX,f=i.skewX,g=i.skewY,p=i.scaleX,d=i.scaleY,m=i.transformPerspective,_=i.force3D,y=i.target,x=i.zOrigin,b="",v=_==="auto"&&e&&e!==1||_===!0;if(x&&(u!==He||c!==He)){var P=parseFloat(c)*ot,E=Math.sin(P),C=Math.cos(P),w;P=parseFloat(u)*ot,w=Math.cos(P),s=ki(y,s,E*w*-x),a=ki(y,a,-Math.sin(P)*-x),l=ki(y,l,C*w*-x+x)}m!==Pt&&(b+="perspective("+m+Ze),(n||r)&&(b+="translate("+n+"%, "+r+"%) "),(v||s!==Pt||a!==Pt||l!==Pt)&&(b+=l!==Pt||v?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+Ze),h!==He&&(b+="rotate("+h+Ze),c!==He&&(b+="rotateY("+c+Ze),u!==He&&(b+="rotateX("+u+Ze),(f!==He||g!==He)&&(b+="skew("+f+", "+g+Ze),(p!==1||d!==1)&&(b+="scale("+p+", "+d+Ze),y.style[$]=b||"translate(0, 0)"},js=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,s=i.x,a=i.y,l=i.rotation,h=i.skewX,c=i.skewY,u=i.scaleX,f=i.scaleY,g=i.target,p=i.xOrigin,d=i.yOrigin,m=i.xOffset,_=i.yOffset,y=i.forceCSS,x=parseFloat(s),b=parseFloat(a),v,P,E,C,w;l=parseFloat(l),h=parseFloat(h),c=parseFloat(c),c&&(c=parseFloat(c),h+=c,l+=c),l||h?(l*=ot,h*=ot,v=Math.cos(l)*u,P=Math.sin(l)*u,E=Math.sin(l-h)*-f,C=Math.cos(l-h)*f,h&&(c*=ot,w=Math.tan(h-c),w=Math.sqrt(1+w*w),E*=w,C*=w,c&&(w=Math.tan(c),w=Math.sqrt(1+w*w),v*=w,P*=w)),v=j(v),P=j(P),E=j(E),C=j(C)):(v=u,C=f,P=E=0),(x&&!~(s+"").indexOf("px")||b&&!~(a+"").indexOf("px"))&&(x=Ue(g,"x",s,"px"),b=Ue(g,"y",a,"px")),(p||d||m||_)&&(x=j(x+p-(p*v+d*E)+m),b=j(b+d-(p*P+d*C)+_)),(n||r)&&(w=g.getBBox(),x=j(x+n/100*w.width),b=j(b+r/100*w.height)),w="matrix("+v+","+P+","+E+","+C+","+x+","+b+")",g.setAttribute("transform",w),y&&(g.style[$]=w)},Ys=function(e,t,i,n,r){var s=360,a=W(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?je:1),h=l-n,c=n+h+"deg",u,f;return a&&(u=r.split("_")[1],u==="short"&&(h%=s,h!==h%(s/2)&&(h+=h<0?s:-s)),u==="cw"&&h<0?h=(h+s*Yn)%s-~~(h/s)*s:u==="ccw"&&h>0&&(h=(h-s*Yn)%s-~~(h/s)*s)),e._pt=f=new ne(e._pt,t,i,n,h,Ms),f.e=c,f.u="deg",e._props.push(i),f},lr=function(e,t){for(var i in t)e[i]=t[i];return e},Hs=function(e,t,i){var n=lr({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",s=i.style,a,l,h,c,u,f,g,p;n.svg?(h=i.getAttribute("transform"),i.setAttribute("transform",""),s[$]=t,a=wt(i,1),Ye(i,$),i.setAttribute("transform",h)):(h=getComputedStyle(i)[$],s[$]=t,a=wt(i,1),s[$]=h);for(l in Ae)h=n[l],c=a[l],h!==c&&r.indexOf(l)<0&&(g=Q(h),p=Q(c),u=g!==p?Ue(i,l,h,p):parseFloat(h),f=parseFloat(c),e._pt=new ne(e._pt,a,l,u,f-u,Di),e._pt.u=p||0,e._props.push(l));lr(a,n)};ie("padding,margin,Width,Radius",function(o,e){var t="Top",i="Right",n="Bottom",r="Left",s=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(a){return e<2?o+a:"border"+a+o});$t[e>1?"border"+o:o]=function(a,l,h,c,u){var f,g;if(arguments.length<4)return f=s.map(function(p){return Se(a,p,h)}),g=f.join(" "),g.split(f[0]).length===5?f[0]:g;f=(c+"").split(" "),g={},s.forEach(function(p,d){return g[p]=f[d]=f[d]||f[(d-1)/2|0]}),a.init(l,g,u)}});var hr={name:"css",register:Ii,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var s=this._props,a=e.style,l=i.vars.startAt,h,c,u,f,g,p,d,m,_,y,x,b,v,P,E,C;Si||Ii(),this.styles=this.styles||Kn(e),C=this.styles.props,this.tween=i;for(d in t)if(d!=="autoRound"&&(c=t[d],!(ue[d]&&Rn(d,t,i,n,e,r)))){if(g=typeof c,p=$t[d],g==="function"&&(c=c.call(i,n,e,r),g=typeof c),g==="string"&&~c.indexOf("random(")&&(c=gt(c)),p)p(this,e,d,c,i)&&(E=1);else if(d.substr(0,2)==="--")h=(getComputedStyle(e).getPropertyValue(d)+"").trim(),c+="",Ie.lastIndex=0,Ie.test(h)||(m=Q(h),_=Q(c)),_?m!==_&&(h=Ue(e,d,h,_)+_):m&&(c+=m),this.add(a,"setProperty",h,c,n,r,0,0,d),s.push(d),C.push(d,0,a[d]);else if(g!=="undefined"){if(l&&d in l?(h=typeof l[d]=="function"?l[d].call(i,n,e,r):l[d],W(h)&&~h.indexOf("random(")&&(h=gt(h)),Q(h+"")||h==="auto"||(h+=he.units[d]||Q(Se(e,d))||""),(h+"").charAt(1)==="="&&(h=Se(e,d))):h=Se(e,d),f=parseFloat(h),y=g==="string"&&c.charAt(1)==="="&&c.substr(0,2),y&&(c=c.substr(2)),u=parseFloat(c),d in Ee&&(d==="autoAlpha"&&(f===1&&Se(e,"visibility")==="hidden"&&u&&(f=0),C.push("visibility",0,a.visibility),ke(this,a,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),d!=="scale"&&d!=="transform"&&(d=Ee[d],~d.indexOf(",")&&(d=d.split(",")[0]))),x=d in Ae,x){if(this.styles.save(d),g==="string"&&c.substring(0,6)==="var(--"&&(c=ye(e,c.substring(4,c.indexOf(")"))),u=parseFloat(c)),b||(v=e._gsap,v.renderTransform&&!t.parseTransform||wt(e,t.parseTransform),P=t.smoothOrigin!==!1&&v.smooth,b=this._pt=new ne(this._pt,a,$,0,1,v.renderTransform,v,0,-1),b.dep=1),d==="scale")this._pt=new ne(this._pt,v,"scaleY",v.scaleY,(y?Je(v.scaleY,y+u):u)-v.scaleY||0,Di),this._pt.u=0,s.push("scaleY",d),d+="X";else if(d==="transformOrigin"){C.push(se,0,a[se]),c=$s(c),v.svg?Ri(e,c,0,P,0,this):(_=parseFloat(c.split(" ")[2])||0,_!==v.zOrigin&&ke(this,v,"zOrigin",v.zOrigin,_),ke(this,a,d,Vt(h),Vt(c)));continue}else if(d==="svgOrigin"){Ri(e,c,1,P,0,this);continue}else if(d in rr){Ys(this,v,d,f,y?Je(f,y+c):c);continue}else if(d==="smoothOrigin"){ke(this,v,"smooth",v.smooth,c);continue}else if(d==="force3D"){v[d]=c;continue}else if(d==="transform"){Hs(this,c,e);continue}}else d in a||(d=lt(d)||d);if(x||(u||u===0)&&(f||f===0)&&!Ss.test(c)&&d in a)m=(h+"").substr((f+"").length),u||(u=0),_=Q(c)||(d in he.units?he.units[d]:m),m!==_&&(f=Ue(e,d,h,_)),this._pt=new ne(this._pt,x?v:a,d,f,(y?Je(f,y+u):u)-f,!x&&(_==="px"||d==="zIndex")&&t.autoRound!==!1?Ds:Di),this._pt.u=_||0,m!==_&&_!=="%"&&(this._pt.b=h,this._pt.r=Ts);else if(d in a)Bs.call(this,e,d,h,y?y+c:c);else if(d in e)this.add(e,d,h||e[d],y?y+c:c,n,r);else if(d!=="parseTransform"){ni(d,c);continue}x||(d in a?C.push(d,0,a[d]):typeof e[d]=="function"?C.push(d,2,e[d]()):C.push(d,1,h||e[d])),s.push(d)}}E&&Bn(this)},render:function(e,t){if(t.tween._time||!Mi())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Se,aliases:Ee,getSetter:function(e,t,i){var n=Ee[t];return n&&n.indexOf(",")<0&&(t=n),t in Ae&&t!==se&&(e._gsap.x||Se(e,"x"))?i&&jn===i?t==="scale"?Rs:Ls:(jn=i||{})&&(t==="scale"?ks:Us):e.style&&!qt(e.style[t])?Os:~t.indexOf("-")?Is:Ei(e,t)},core:{_removeProperty:Ye,_getMatrix:Li}};re.utils.checkPrefix=lt,re.core.getStyleSaver=Kn,(function(o,e,t,i){var n=ie(o+","+e+","+t,function(r){Ae[r]=1});ie(e,function(r){he.units[r]="deg",rr[r]=1}),Ee[n[13]]=o+","+e,ie(i,function(r){var s=r.split(":");Ee[s[1]]=n[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),ie("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(o){he.units[o]="px"}),re.registerPlugin(hr);var K=re.registerPlugin(hr)||re;K.core.Tween;class we{constructor(e,t,i,n,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),we.nextNameID=we.nextNameID||0,this.$name.id=`lil-gui-name-${++we.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Zs extends we{constructor(e,t,i){super(e,t,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ui(o){let e,t;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Ws={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:Ui,toHexString:Ui},Ct={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},Ks=[Ws,Ct,{isPrimitive:!1,match:o=>Array.isArray(o)||ArrayBuffer.isView(o),fromHexString(o,e,t=1){const i=Ct.fromHexString(o);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([o,e,t],i=1){i=255/i;const n=o*i<<16^e*i<<8^t*i<<0;return Ct.toHexString(n)}},{isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,t=1){const i=Ct.fromHexString(o);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:o,g:e,b:t},i=1){i=255/i;const n=o*i<<16^e*i<<8^t*i<<0;return Ct.toHexString(n)}}];function Xs(o){return Ks.find(e=>e.match(o))}class qs extends we{constructor(e,t,i,n){super(e,t,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Xs(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Ui(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Fi extends we{constructor(e,t,i){super(e,t,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Qs extends we{constructor(e,t,i,n,r,s){super(e,t,i,"lil-number"),this._initInput(),this.min(n),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},i=y=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+y),this.$input.value=this.getValue())},n=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y)*-1))},r=y=>{this._inputFocused&&(y.preventDefault(),i(this._step*this._normalizeMouseWheel(y)))};let s=!1,a,l,h,c,u;const f=5,g=y=>{a=y.clientX,l=h=y.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",d)},p=y=>{if(s){const x=y.clientX-a,b=y.clientY-l;Math.abs(b)>f?(y.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>f&&d()}if(!s){const x=y.clientY-h;u-=x*this._step*this._arrowKeyMultiplier(y),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}h=y.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",d)},m=()=>{this._inputFocused=!0},_=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",_)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(_,y,x,b,v)=>(_-y)/(x-y)*(v-b)+b,t=_=>{const y=this.$slider.getBoundingClientRect();let x=e(_,y.left,y.right,this._min,this._max);this._snapClampSetValue(x)},i=_=>{this._setDraggingStyle(!0),t(_.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",r)},n=_=>{t(_.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",r)};let s=!1,a,l;const h=_=>{_.preventDefault(),this._setDraggingStyle(!0),t(_.touches[0].clientX),s=!1},c=_=>{_.touches.length>1||(this._hasScrollBar?(a=_.touches[0].clientX,l=_.touches[0].clientY,s=!0):h(_),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",f))},u=_=>{if(s){const y=_.touches[0].clientX-a,x=_.touches[0].clientY-l;Math.abs(y)>Math.abs(x)?h(_):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f))}else _.preventDefault(),t(_.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f)},g=this._callOnFinishChange.bind(this),p=400;let d;const m=_=>{if(Math.abs(_.deltaX)<Math.abs(_.deltaY)&&this._hasScrollBar)return;_.preventDefault();const x=this._normalizeMouseWheel(_)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(g,p)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Js extends we{constructor(e,t,i,n){super(e,t,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class eo extends we{constructor(e,t,i){super(e,t,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var to=`.lil-gui {
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
}`;function io(o){const e=document.createElement("style");e.innerHTML=o;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let cr=!1;class zi{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:n,title:r="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),l&&this.domElement.classList.add("lil-allow-touch-styles"),!cr&&a&&(io(to),cr=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(e,t,i,n,r){if(Object(i)===i)return new Js(this,e,t,i);const s=e[t];switch(typeof s){case"number":return new Qs(this,e,t,i,n,r);case"boolean":return new Zs(this,e,t);case"string":return new eo(this,e,t);case"function":return new Fi(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,s)}addColor(e,t,i=1){return new qs(this,e,t,i)}addFolder(e){const t=new zi({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Fi||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Fi)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const n=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const ur={type:"change"},Ni={type:"start"},dr={type:"end"},Gt=new S.Ray,pr=new S.Plane,no=Math.cos(70*S.MathUtils.DEG2RAD),Z=new S.Vector3,oe=2*Math.PI,R={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bi=1e-6;class ro extends S.Controls{constructor(e,t=null){super(e,t),this.state=R.NONE,this.target=new S.Vector3,this.cursor=new S.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:S.MOUSE.ROTATE,MIDDLE:S.MOUSE.DOLLY,RIGHT:S.MOUSE.PAN},this.touches={ONE:S.TOUCH.ROTATE,TWO:S.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new S.Vector3,this._lastQuaternion=new S.Quaternion,this._lastTargetPosition=new S.Vector3,this._quat=new S.Quaternion().setFromUnitVectors(e.up,new S.Vector3(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new S.Spherical,this._sphericalDelta=new S.Spherical,this._scale=1,this._panOffset=new S.Vector3,this._rotateStart=new S.Vector2,this._rotateEnd=new S.Vector2,this._rotateDelta=new S.Vector2,this._panStart=new S.Vector2,this._panEnd=new S.Vector2,this._panDelta=new S.Vector2,this._dollyStart=new S.Vector2,this._dollyEnd=new S.Vector2,this._dollyDelta=new S.Vector2,this._dollyDirection=new S.Vector3,this._mouse=new S.Vector2,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=oo.bind(this),this._onPointerDown=so.bind(this),this._onPointerUp=ao.bind(this),this._onContextMenu=mo.bind(this),this._onMouseWheel=co.bind(this),this._onKeyDown=uo.bind(this),this._onTouchStart=po.bind(this),this._onTouchMove=fo.bind(this),this._onMouseDown=lo.bind(this),this._onMouseMove=ho.bind(this),this._interceptControlDown=go.bind(this),this._interceptControlUp=_o.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ur),this.update(),this.state=R.NONE}update(e=null){const t=this.object.position;Z.copy(t).sub(this.target),Z.applyQuaternion(this._quat),this._spherical.setFromVector3(Z),this.autoRotate&&this.state===R.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=oe:i>Math.PI&&(i-=oe),n<-Math.PI?n+=oe:n>Math.PI&&(n-=oe),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(Z.setFromSpherical(this._spherical),Z.applyQuaternion(this._quatInverse),t.copy(this.target).add(Z),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const a=Z.length();s=this._clampDistance(a*this._scale);const l=a-s;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new S.Vector3(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const h=new S.Vector3(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),s=Z.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Gt.origin.copy(this.object.position),Gt.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gt.direction))<no?this.object.lookAt(this.target):(pr.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gt.intersectPlane(pr,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Bi||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bi||this._lastTargetPosition.distanceToSquared(this.target)>Bi?(this.dispatchEvent(ur),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?oe/60*this.autoRotateSpeed*e:oe/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Z.setFromMatrixColumn(t,0),Z.multiplyScalar(-e),this._panOffset.add(Z)}_panUp(e,t){this.screenSpacePanning===!0?Z.setFromMatrixColumn(t,1):(Z.setFromMatrixColumn(t,0),Z.crossVectors(this.object.up,Z)),Z.multiplyScalar(e),this._panOffset.add(Z)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;Z.copy(n).sub(this.target);let r=Z.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,r=t-i.top,s=i.width,a=i.height;this._mouse.x=n/s*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(oe*this._rotateDelta.x/t.clientHeight),this._rotateUp(oe*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(oe*this._rotateDelta.x/t.clientHeight),this._rotateUp(oe*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(s,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new S.Vector2,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function so(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function oo(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function ao(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dr),this.state=R.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function lo(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case S.MOUSE.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=R.DOLLY;break;case S.MOUSE.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=R.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=R.ROTATE}break;case S.MOUSE.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=R.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=R.PAN}break;default:this.state=R.NONE}this.state!==R.NONE&&this.dispatchEvent(Ni)}function ho(o){switch(this.state){case R.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case R.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case R.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function co(o){this.enabled===!1||this.enableZoom===!1||this.state!==R.NONE||(o.preventDefault(),this.dispatchEvent(Ni),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(dr))}function uo(o){this.enabled!==!1&&this._handleKeyDown(o)}function po(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case S.TOUCH.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=R.TOUCH_ROTATE;break;case S.TOUCH.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=R.TOUCH_PAN;break;default:this.state=R.NONE}break;case 2:switch(this.touches.TWO){case S.TOUCH.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=R.TOUCH_DOLLY_PAN;break;case S.TOUCH.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=R.TOUCH_DOLLY_ROTATE;break;default:this.state=R.NONE}break;default:this.state=R.NONE}this.state!==R.NONE&&this.dispatchEvent(Ni)}function fo(o){switch(this._trackPointer(o),this.state){case R.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case R.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case R.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case R.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=R.NONE}}function mo(o){this.enabled!==!1&&o.preventDefault()}function go(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _o(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const $i=[{id:"156",code:"CN",name:"China",population:1412,gdpPerCapita:21476,co2Emissions:8,lifeExpectancy:78.2,humanDevIndex:.768,internetUsers:73,renewableEnergy:15,urbanPopulation:64.7,healthExpenditure:5.4,educationExpenditure:3.6,forestArea:23.3,accessElectricity:100},{id:"356",code:"IN",name:"India",population:1408,gdpPerCapita:8379,co2Emissions:1.9,lifeExpectancy:70.8,humanDevIndex:.633,internetUsers:47,renewableEnergy:38,urbanPopulation:35.9,healthExpenditure:3,educationExpenditure:4.5,forestArea:24.3,accessElectricity:99.6},{id:"840",code:"US",name:"United States",population:332,gdpPerCapita:76399,co2Emissions:14.4,lifeExpectancy:77.5,humanDevIndex:.921,internetUsers:92,renewableEnergy:13,urbanPopulation:83.1,healthExpenditure:18.3,educationExpenditure:6.1,forestArea:33.9,accessElectricity:100},{id:"360",code:"ID",name:"Indonesia",population:276,gdpPerCapita:14535,co2Emissions:2.3,lifeExpectancy:71.9,humanDevIndex:.705,internetUsers:62,renewableEnergy:12,urbanPopulation:57.9,healthExpenditure:2.9,educationExpenditure:3.5,forestArea:49.1,accessElectricity:99},{id:"586",code:"PK",name:"Pakistan",population:225,gdpPerCapita:6470,co2Emissions:1,lifeExpectancy:67.3,humanDevIndex:.544,internetUsers:21,renewableEnergy:34,urbanPopulation:37.4,healthExpenditure:2.8,educationExpenditure:2.3,forestArea:1.9,accessElectricity:95},{id:"076",code:"BR",name:"Brazil",population:215,gdpPerCapita:16154,co2Emissions:2.2,lifeExpectancy:76,humanDevIndex:.754,internetUsers:81,renewableEnergy:47,urbanPopulation:87.6,healthExpenditure:10.3,educationExpenditure:6.3,forestArea:59.4,accessElectricity:100},{id:"566",code:"NG",name:"Nigeria",population:219,gdpPerCapita:5860,co2Emissions:.6,lifeExpectancy:53.9,humanDevIndex:.535,internetUsers:36,renewableEnergy:86,urbanPopulation:53,healthExpenditure:3,educationExpenditure:.5,forestArea:7.2,accessElectricity:59.5},{id:"050",code:"BD",name:"Bangladesh",population:167,gdpPerCapita:7066,co2Emissions:.6,lifeExpectancy:73.2,humanDevIndex:.661,internetUsers:39,renewableEnergy:3,urbanPopulation:39.4,healthExpenditure:2.3,educationExpenditure:1.8,forestArea:11.2,accessElectricity:99.4},{id:"643",code:"RU",name:"Russia",population:144,gdpPerCapita:30820,co2Emissions:11.4,lifeExpectancy:72.8,humanDevIndex:.822,internetUsers:85,renewableEnergy:7,urbanPopulation:75.1,healthExpenditure:5.6,educationExpenditure:3.7,forestArea:49.8,accessElectricity:100},{id:"484",code:"MX",name:"Mexico",population:130,gdpPerCapita:20824,co2Emissions:3.5,lifeExpectancy:75.1,humanDevIndex:.758,internetUsers:72,renewableEnergy:9,urbanPopulation:81,healthExpenditure:5.4,educationExpenditure:4.3,forestArea:33.6,accessElectricity:100},{id:"392",code:"JP",name:"Japan",population:125,gdpPerCapita:45546,co2Emissions:8.5,lifeExpectancy:84.6,humanDevIndex:.925,internetUsers:93,renewableEnergy:12,urbanPopulation:91.9,healthExpenditure:11,educationExpenditure:3.4,forestArea:68.4,accessElectricity:100},{id:"231",code:"ET",name:"Ethiopia",population:121,gdpPerCapita:2771,co2Emissions:.2,lifeExpectancy:66.6,humanDevIndex:.498,internetUsers:17,renewableEnergy:93,urbanPopulation:22.2,healthExpenditure:3.5,educationExpenditure:4.5,forestArea:12.5,accessElectricity:51.1},{id:"608",code:"PH",name:"Philippines",population:115,gdpPerCapita:9746,co2Emissions:1.3,lifeExpectancy:72.1,humanDevIndex:.699,internetUsers:53,renewableEnergy:29,urbanPopulation:47.7,healthExpenditure:5.1,educationExpenditure:3.6,forestArea:27,accessElectricity:97.2},{id:"818",code:"EG",name:"Egypt",population:106,gdpPerCapita:14927,co2Emissions:2.4,lifeExpectancy:72,humanDevIndex:.731,internetUsers:72,renewableEnergy:10,urbanPopulation:42.8,healthExpenditure:4.6,educationExpenditure:4,forestArea:.1,accessElectricity:100},{id:"704",code:"VN",name:"Vietnam",population:99,gdpPerCapita:12756,co2Emissions:3.5,lifeExpectancy:75.8,humanDevIndex:.703,internetUsers:70,renewableEnergy:21,urbanPopulation:38.1,healthExpenditure:4.7,educationExpenditure:4.2,forestArea:47.6,accessElectricity:100},{id:"276",code:"DE",name:"Germany",population:84,gdpPerCapita:58780,co2Emissions:8.1,lifeExpectancy:81.4,humanDevIndex:.942,internetUsers:93,renewableEnergy:20,urbanPopulation:77.6,healthExpenditure:12.8,educationExpenditure:4.9,forestArea:32.7,accessElectricity:100},{id:"792",code:"TR",name:"Turkey",population:85,gdpPerCapita:36879,co2Emissions:4.8,lifeExpectancy:78.6,humanDevIndex:.838,internetUsers:83,renewableEnergy:17,urbanPopulation:76.6,healthExpenditure:4.3,educationExpenditure:3.1,forestArea:28.6,accessElectricity:100},{id:"364",code:"IR",name:"Iran",population:87,gdpPerCapita:16261,co2Emissions:8.3,lifeExpectancy:76.7,humanDevIndex:.774,internetUsers:78,renewableEnergy:6,urbanPopulation:76.3,healthExpenditure:5.2,educationExpenditure:3.6,forestArea:6.6,accessElectricity:100},{id:"764",code:"TH",name:"Thailand",population:70,gdpPerCapita:19169,co2Emissions:3.8,lifeExpectancy:79.3,humanDevIndex:.8,internetUsers:78,renewableEnergy:15,urbanPopulation:52.2,healthExpenditure:3.8,educationExpenditure:2.9,forestArea:38.8,accessElectricity:100},{id:"826",code:"GB",name:"United Kingdom",population:68,gdpPerCapita:49675,co2Emissions:4.7,lifeExpectancy:81.8,humanDevIndex:.929,internetUsers:97,renewableEnergy:15,urbanPopulation:84.2,healthExpenditure:12,educationExpenditure:5.5,forestArea:13.2,accessElectricity:100},{id:"250",code:"FR",name:"France",population:68,gdpPerCapita:50728,co2Emissions:4.3,lifeExpectancy:82.7,humanDevIndex:.903,internetUsers:91,renewableEnergy:12,urbanPopulation:81.5,healthExpenditure:12.2,educationExpenditure:5.5,forestArea:31.4,accessElectricity:100},{id:"380",code:"IT",name:"Italy",population:59,gdpPerCapita:45936,co2Emissions:5.3,lifeExpectancy:83.5,humanDevIndex:.895,internetUsers:86,renewableEnergy:20,urbanPopulation:71.3,healthExpenditure:8.7,educationExpenditure:4.3,forestArea:32.1,accessElectricity:100},{id:"710",code:"ZA",name:"South Africa",population:60,gdpPerCapita:15e3,co2Emissions:6.7,lifeExpectancy:65.3,humanDevIndex:.713,internetUsers:70,renewableEnergy:6,urbanPopulation:68,healthExpenditure:8.1,educationExpenditure:6.6,forestArea:7.6,accessElectricity:85},{id:"834",code:"TZ",name:"Tanzania",population:63,gdpPerCapita:2990,co2Emissions:.2,lifeExpectancy:66.2,humanDevIndex:.549,internetUsers:25,renewableEnergy:85,urbanPopulation:37,healthExpenditure:3.8,educationExpenditure:3.4,forestArea:48.1,accessElectricity:42.7},{id:"404",code:"KE",name:"Kenya",population:55,gdpPerCapita:5494,co2Emissions:.4,lifeExpectancy:67,humanDevIndex:.575,internetUsers:29,renewableEnergy:75,urbanPopulation:28.5,healthExpenditure:4.3,educationExpenditure:5.1,forestArea:7.8,accessElectricity:75},{id:"410",code:"KR",name:"South Korea",population:52,gdpPerCapita:50071,co2Emissions:11.5,lifeExpectancy:83.7,humanDevIndex:.925,internetUsers:97,renewableEnergy:4,urbanPopulation:81.4,healthExpenditure:8.4,educationExpenditure:5.1,forestArea:63.4,accessElectricity:100},{id:"170",code:"CO",name:"Colombia",population:52,gdpPerCapita:17063,co2Emissions:1.8,lifeExpectancy:77.3,humanDevIndex:.752,internetUsers:73,renewableEnergy:27,urbanPopulation:81.7,healthExpenditure:7.7,educationExpenditure:4.5,forestArea:52.7,accessElectricity:100},{id:"724",code:"ES",name:"Spain",population:47,gdpPerCapita:42190,co2Emissions:5,lifeExpectancy:83.6,humanDevIndex:.905,internetUsers:94,renewableEnergy:21,urbanPopulation:81.1,healthExpenditure:10.7,educationExpenditure:4.8,forestArea:37.4,accessElectricity:100},{id:"032",code:"AR",name:"Argentina",population:46,gdpPerCapita:24678,co2Emissions:3.8,lifeExpectancy:77.1,humanDevIndex:.842,internetUsers:87,renewableEnergy:13,urbanPopulation:92.2,healthExpenditure:10,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"800",code:"UG",name:"Uganda",population:48,gdpPerCapita:2566,co2Emissions:.1,lifeExpectancy:64.4,humanDevIndex:.525,internetUsers:18,renewableEnergy:89,urbanPopulation:25.6,healthExpenditure:3.8,educationExpenditure:2.7,forestArea:9.7,accessElectricity:46},{id:"012",code:"DZ",name:"Algeria",population:45,gdpPerCapita:12667,co2Emissions:3.7,lifeExpectancy:77.1,humanDevIndex:.745,internetUsers:71,renewableEnergy:1,urbanPopulation:74.3,healthExpenditure:5.3,educationExpenditure:5.6,forestArea:.8,accessElectricity:100},{id:"804",code:"UA",name:"Ukraine",population:41,gdpPerCapita:14220,co2Emissions:4.5,lifeExpectancy:72.1,humanDevIndex:.773,internetUsers:75,renewableEnergy:8,urbanPopulation:69.6,healthExpenditure:7,educationExpenditure:5.4,forestArea:16.7,accessElectricity:100},{id:"368",code:"IQ",name:"Iraq",population:43,gdpPerCapita:10474,co2Emissions:4,lifeExpectancy:71.1,humanDevIndex:.686,internetUsers:75,renewableEnergy:3,urbanPopulation:71.1,healthExpenditure:4.6,educationExpenditure:4.7,forestArea:1.9,accessElectricity:100},{id:"616",code:"PL",name:"Poland",population:38,gdpPerCapita:40343,co2Emissions:8,lifeExpectancy:78.7,humanDevIndex:.876,internetUsers:87,renewableEnergy:17,urbanPopulation:60,healthExpenditure:6.5,educationExpenditure:4.6,forestArea:30.9,accessElectricity:100},{id:"124",code:"CA",name:"Canada",population:39,gdpPerCapita:54966,co2Emissions:14.3,lifeExpectancy:82.4,humanDevIndex:.936,internetUsers:93,renewableEnergy:18,urbanPopulation:81.8,healthExpenditure:12.8,educationExpenditure:5.3,forestArea:38.7,accessElectricity:100},{id:"504",code:"MA",name:"Morocco",population:37,gdpPerCapita:9339,co2Emissions:1.9,lifeExpectancy:77,humanDevIndex:.683,internetUsers:84,renewableEnergy:13,urbanPopulation:64.6,healthExpenditure:5.3,educationExpenditure:6.8,forestArea:12.8,accessElectricity:100},{id:"682",code:"SA",name:"Saudi Arabia",population:36,gdpPerCapita:56817,co2Emissions:15.3,lifeExpectancy:76.9,humanDevIndex:.875,internetUsers:98,renewableEnergy:0,urbanPopulation:84.7,healthExpenditure:6.4,educationExpenditure:5.1,forestArea:.5,accessElectricity:100},{id:"604",code:"PE",name:"Peru",population:34,gdpPerCapita:14225,co2Emissions:1.6,lifeExpectancy:77.4,humanDevIndex:.762,internetUsers:71,renewableEnergy:25,urbanPopulation:78.6,healthExpenditure:5.2,educationExpenditure:4,forestArea:57.3,accessElectricity:97},{id:"036",code:"AU",name:"Australia",population:26,gdpPerCapita:59934,co2Emissions:15,lifeExpectancy:84,humanDevIndex:.951,internetUsers:96,renewableEnergy:12,urbanPopulation:86.4,healthExpenditure:10.7,educationExpenditure:6.1,forestArea:17.4,accessElectricity:100},{id:"458",code:"MY",name:"Malaysia",population:34,gdpPerCapita:33550,co2Emissions:7.6,lifeExpectancy:76.9,humanDevIndex:.803,internetUsers:90,renewableEnergy:8,urbanPopulation:78,healthExpenditure:3.8,educationExpenditure:3.9,forestArea:57.7,accessElectricity:100},{id:"288",code:"GH",name:"Ghana",population:33,gdpPerCapita:6754,co2Emissions:.6,lifeExpectancy:64.9,humanDevIndex:.632,internetUsers:53,renewableEnergy:42,urbanPopulation:58,healthExpenditure:3.4,educationExpenditure:4,forestArea:34.5,accessElectricity:85.9},{id:"524",code:"NP",name:"Nepal",population:30,gdpPerCapita:4199,co2Emissions:.5,lifeExpectancy:71.7,humanDevIndex:.602,internetUsers:48,renewableEnergy:86,urbanPopulation:21,healthExpenditure:4.4,educationExpenditure:4.2,forestArea:25.4,accessElectricity:90},{id:"862",code:"VE",name:"Venezuela",population:29,gdpPerCapita:7045,co2Emissions:3.1,lifeExpectancy:72.1,humanDevIndex:.691,internetUsers:72,renewableEnergy:68,urbanPopulation:88.3,healthExpenditure:3.9,educationExpenditure:6.9,forestArea:52.1,accessElectricity:99.9},{id:"450",code:"MG",name:"Madagascar",population:29,gdpPerCapita:1724,co2Emissions:.2,lifeExpectancy:67,humanDevIndex:.501,internetUsers:10,renewableEnergy:68,urbanPopulation:39.5,healthExpenditure:3.9,educationExpenditure:2.9,forestArea:21.4,accessElectricity:34},{id:"120",code:"CM",name:"Cameroon",population:28,gdpPerCapita:3977,co2Emissions:.4,lifeExpectancy:60.3,humanDevIndex:.576,internetUsers:34,renewableEnergy:74,urbanPopulation:58.4,healthExpenditure:3.3,educationExpenditure:3.2,forestArea:45.6,accessElectricity:65},{id:"528",code:"NL",name:"Netherlands",population:18,gdpPerCapita:64654,co2Emissions:8.1,lifeExpectancy:82.3,humanDevIndex:.941,internetUsers:98,renewableEnergy:13,urbanPopulation:92.5,healthExpenditure:11.2,educationExpenditure:5.3,forestArea:11.2,accessElectricity:100},{id:"152",code:"CL",name:"Chile",population:19,gdpPerCapita:28526,co2Emissions:4.3,lifeExpectancy:80.7,humanDevIndex:.855,internetUsers:88,renewableEnergy:27,urbanPopulation:87.9,healthExpenditure:9.3,educationExpenditure:5.4,forestArea:24.4,accessElectricity:100},{id:"752",code:"SE",name:"Sweden",population:10,gdpPerCapita:60239,co2Emissions:3.5,lifeExpectancy:83.2,humanDevIndex:.947,internetUsers:96,renewableEnergy:56,urbanPopulation:88.2,healthExpenditure:11.4,educationExpenditure:7.6,forestArea:68.9,accessElectricity:100},{id:"578",code:"NO",name:"Norway",population:5,gdpPerCapita:82236,co2Emissions:7.5,lifeExpectancy:83.2,humanDevIndex:.961,internetUsers:98,renewableEnergy:72,urbanPopulation:83.4,healthExpenditure:11.4,educationExpenditure:7.9,forestArea:33.2,accessElectricity:100},{id:"702",code:"SG",name:"Singapore",population:6,gdpPerCapita:116527,co2Emissions:8.9,lifeExpectancy:84.1,humanDevIndex:.939,internetUsers:96,renewableEnergy:2,urbanPopulation:100,healthExpenditure:6.1,educationExpenditure:2.9,forestArea:22.5,accessElectricity:100},{id:"554",code:"NZ",name:"New Zealand",population:5,gdpPerCapita:48249,co2Emissions:6.8,lifeExpectancy:82.5,humanDevIndex:.937,internetUsers:95,renewableEnergy:40,urbanPopulation:86.7,healthExpenditure:9.7,educationExpenditure:6.3,forestArea:38.6,accessElectricity:100},{id:"372",code:"IE",name:"Ireland",population:5,gdpPerCapita:106998,co2Emissions:7.3,lifeExpectancy:82.8,humanDevIndex:.945,internetUsers:94,renewableEnergy:14,urbanPopulation:64.2,healthExpenditure:7.1,educationExpenditure:3.5,forestArea:11,accessElectricity:100},{id:"376",code:"IL",name:"Israel",population:9,gdpPerCapita:52170,co2Emissions:6.9,lifeExpectancy:83.5,humanDevIndex:.919,internetUsers:90,renewableEnergy:6,urbanPopulation:92.8,healthExpenditure:7.5,educationExpenditure:7.1,forestArea:7.6,accessElectricity:100},{id:"784",code:"AE",name:"United Arab Emirates",population:10,gdpPerCapita:77272,co2Emissions:20.7,lifeExpectancy:78.7,humanDevIndex:.911,internetUsers:100,renewableEnergy:1,urbanPopulation:87.4,healthExpenditure:5,educationExpenditure:3.9,forestArea:4.5,accessElectricity:100},{id:"756",code:"CH",name:"Switzerland",population:9,gdpPerCapita:81867,co2Emissions:4,lifeExpectancy:84,humanDevIndex:.962,internetUsers:96,renewableEnergy:28,urbanPopulation:74,healthExpenditure:11.3,educationExpenditure:5,forestArea:31.9,accessElectricity:100},{id:"040",code:"AT",name:"Austria",population:9,gdpPerCapita:58013,co2Emissions:6.8,lifeExpectancy:82,humanDevIndex:.916,internetUsers:93,renewableEnergy:36,urbanPopulation:59,healthExpenditure:10.4,educationExpenditure:5.4,forestArea:47.3,accessElectricity:100},{id:"620",code:"PT",name:"Portugal",population:10,gdpPerCapita:38147,co2Emissions:4,lifeExpectancy:82.6,humanDevIndex:.866,internetUsers:85,renewableEnergy:34,urbanPopulation:66.8,healthExpenditure:10.6,educationExpenditure:5,forestArea:36.1,accessElectricity:100},{id:"300",code:"GR",name:"Greece",population:10,gdpPerCapita:33393,co2Emissions:5.3,lifeExpectancy:81.4,humanDevIndex:.887,internetUsers:79,renewableEnergy:22,urbanPopulation:80.1,healthExpenditure:7.8,educationExpenditure:4.4,forestArea:32.5,accessElectricity:100},{id:"203",code:"CZ",name:"Czech Republic",population:11,gdpPerCapita:45499,co2Emissions:9.3,lifeExpectancy:79.4,humanDevIndex:.889,internetUsers:88,renewableEnergy:17,urbanPopulation:74.1,healthExpenditure:9.2,educationExpenditure:4.4,forestArea:34.7,accessElectricity:100},{id:"056",code:"BE",name:"Belgium",population:12,gdpPerCapita:55521,co2Emissions:8,lifeExpectancy:82.2,humanDevIndex:.937,internetUsers:94,renewableEnergy:13,urbanPopulation:98.1,healthExpenditure:11.1,educationExpenditure:6.4,forestArea:22.8,accessElectricity:100},{id:"348",code:"HU",name:"Hungary",population:10,gdpPerCapita:37935,co2Emissions:4.6,lifeExpectancy:77,humanDevIndex:.846,internetUsers:89,renewableEnergy:14,urbanPopulation:72.3,healthExpenditure:6.4,educationExpenditure:4.6,forestArea:22.9,accessElectricity:100},{id:"246",code:"FI",name:"Finland",population:6,gdpPerCapita:53654,co2Emissions:6.5,lifeExpectancy:82.2,humanDevIndex:.94,internetUsers:96,renewableEnergy:44,urbanPopulation:85.5,healthExpenditure:9.6,educationExpenditure:6.3,forestArea:73.7,accessElectricity:100},{id:"208",code:"DK",name:"Denmark",population:6,gdpPerCapita:67803,co2Emissions:4.4,lifeExpectancy:81.6,humanDevIndex:.948,internetUsers:98,renewableEnergy:40,urbanPopulation:88.2,healthExpenditure:10.5,educationExpenditure:6.9,forestArea:14.7,accessElectricity:100},{id:"352",code:"IS",name:"Iceland",population:.4,gdpPerCapita:68727,co2Emissions:9.7,lifeExpectancy:83.1,humanDevIndex:.959,internetUsers:99,renewableEnergy:85,urbanPopulation:93.9,healthExpenditure:8.9,educationExpenditure:7.7,forestArea:.5,accessElectricity:100},{id:"180",code:"CD",name:"DR Congo",population:99,gdpPerCapita:1099,co2Emissions:.04,lifeExpectancy:60.7,humanDevIndex:.479,internetUsers:9,renewableEnergy:97,urbanPopulation:46.2,healthExpenditure:3.3,educationExpenditure:1.5,forestArea:67.3,accessElectricity:19.1},{id:"729",code:"SD",name:"Sudan",population:46,gdpPerCapita:4232,co2Emissions:.5,lifeExpectancy:66.1,humanDevIndex:.508,internetUsers:31,renewableEnergy:62,urbanPopulation:35.6,healthExpenditure:4.5,educationExpenditure:2.2,forestArea:9.7,accessElectricity:55.5},{id:"024",code:"AO",name:"Angola",population:35,gdpPerCapita:6938,co2Emissions:.8,lifeExpectancy:62,humanDevIndex:.586,internetUsers:36,renewableEnergy:55,urbanPopulation:68.1,healthExpenditure:2.6,educationExpenditure:2.4,forestArea:46.3,accessElectricity:46},{id:"508",code:"MZ",name:"Mozambique",population:33,gdpPerCapita:1346,co2Emissions:.2,lifeExpectancy:60.9,humanDevIndex:.456,internetUsers:10,renewableEnergy:79,urbanPopulation:38,healthExpenditure:7.5,educationExpenditure:5.5,forestArea:48.2,accessElectricity:31},{id:"384",code:"CI",name:"Ivory Coast",population:28,gdpPerCapita:5972,co2Emissions:.4,lifeExpectancy:59.3,humanDevIndex:.55,internetUsers:45,renewableEnergy:68,urbanPopulation:52.7,healthExpenditure:3.3,educationExpenditure:3.4,forestArea:9.3,accessElectricity:70},{id:"562",code:"NE",name:"Niger",population:26,gdpPerCapita:1318,co2Emissions:.1,lifeExpectancy:63,humanDevIndex:.4,internetUsers:5,renewableEnergy:80,urbanPopulation:16.8,healthExpenditure:5.2,educationExpenditure:3.5,forestArea:.9,accessElectricity:19.3},{id:"854",code:"BF",name:"Burkina Faso",population:22,gdpPerCapita:2445,co2Emissions:.2,lifeExpectancy:62.7,humanDevIndex:.449,internetUsers:18,renewableEnergy:79,urbanPopulation:31.5,healthExpenditure:5.6,educationExpenditure:5.4,forestArea:19.3,accessElectricity:19},{id:"466",code:"ML",name:"Mali",population:22,gdpPerCapita:2462,co2Emissions:.2,lifeExpectancy:59.3,humanDevIndex:.428,internetUsers:27,renewableEnergy:76,urbanPopulation:44.6,healthExpenditure:3.8,educationExpenditure:3.8,forestArea:3.9,accessElectricity:53},{id:"686",code:"SN",name:"Senegal",population:17,gdpPerCapita:3942,co2Emissions:.7,lifeExpectancy:68.6,humanDevIndex:.511,internetUsers:58,renewableEnergy:47,urbanPopulation:48.6,healthExpenditure:3.5,educationExpenditure:5.5,forestArea:42.5,accessElectricity:70.4},{id:"894",code:"ZM",name:"Zambia",population:20,gdpPerCapita:3574,co2Emissions:.4,lifeExpectancy:65,humanDevIndex:.565,internetUsers:16,renewableEnergy:88,urbanPopulation:45.2,healthExpenditure:4.9,educationExpenditure:4.6,forestArea:59.8,accessElectricity:43},{id:"716",code:"ZW",name:"Zimbabwe",population:16,gdpPerCapita:2622,co2Emissions:.8,lifeExpectancy:61.5,humanDevIndex:.593,internetUsers:35,renewableEnergy:78,urbanPopulation:32.2,healthExpenditure:3.4,educationExpenditure:5,forestArea:36.4,accessElectricity:49},{id:"646",code:"RW",name:"Rwanda",population:14,gdpPerCapita:2359,co2Emissions:.1,lifeExpectancy:69.6,humanDevIndex:.534,internetUsers:30,renewableEnergy:84,urbanPopulation:17.6,healthExpenditure:7.5,educationExpenditure:3.1,forestArea:28.8,accessElectricity:48},{id:"004",code:"AF",name:"Afghanistan",population:41,gdpPerCapita:2065,co2Emissions:.2,lifeExpectancy:62,humanDevIndex:.478,internetUsers:18,renewableEnergy:45,urbanPopulation:26.3,healthExpenditure:18.2,educationExpenditure:4.1,forestArea:1.9,accessElectricity:97.7},{id:"104",code:"MM",name:"Myanmar",population:55,gdpPerCapita:5699,co2Emissions:.6,lifeExpectancy:67.8,humanDevIndex:.585,internetUsers:44,renewableEnergy:51,urbanPopulation:31.4,healthExpenditure:4.8,educationExpenditure:2,forestArea:42.2,accessElectricity:70},{id:"408",code:"KP",name:"North Korea",population:26,gdpPerCapita:1800,co2Emissions:2,lifeExpectancy:72.6,humanDevIndex:.733,internetUsers:0,renewableEnergy:12,urbanPopulation:63,healthExpenditure:6,educationExpenditure:4,forestArea:41,accessElectricity:26},{id:"496",code:"MN",name:"Mongolia",population:3.4,gdpPerCapita:12896,co2Emissions:14,lifeExpectancy:70.9,humanDevIndex:.739,internetUsers:84,renewableEnergy:7,urbanPopulation:68.8,healthExpenditure:4,educationExpenditure:4.7,forestArea:7.1,accessElectricity:100},{id:"144",code:"LK",name:"Sri Lanka",population:22,gdpPerCapita:14509,co2Emissions:1,lifeExpectancy:77.4,humanDevIndex:.782,internetUsers:47,renewableEnergy:51,urbanPopulation:18.9,healthExpenditure:3.8,educationExpenditure:2.1,forestArea:29.4,accessElectricity:100},{id:"398",code:"KZ",name:"Kazakhstan",population:19,gdpPerCapita:30500,co2Emissions:13.2,lifeExpectancy:74.4,humanDevIndex:.811,internetUsers:91,renewableEnergy:2,urbanPopulation:57.8,healthExpenditure:2.8,educationExpenditure:2.9,forestArea:1.2,accessElectricity:100},{id:"860",code:"UZ",name:"Uzbekistan",population:35,gdpPerCapita:9127,co2Emissions:3.5,lifeExpectancy:73.8,humanDevIndex:.727,internetUsers:71,renewableEnergy:11,urbanPopulation:50.4,healthExpenditure:6.8,educationExpenditure:5.3,forestArea:7.7,accessElectricity:100},{id:"192",code:"CU",name:"Cuba",population:11,gdpPerCapita:9478,co2Emissions:2.3,lifeExpectancy:79,humanDevIndex:.764,internetUsers:71,renewableEnergy:32,urbanPopulation:77.2,healthExpenditure:11.7,educationExpenditure:12.8,forestArea:33,accessElectricity:100},{id:"218",code:"EC",name:"Ecuador",population:18,gdpPerCapita:12171,co2Emissions:2.3,lifeExpectancy:77.9,humanDevIndex:.74,internetUsers:70,renewableEnergy:31,urbanPopulation:64.2,healthExpenditure:8.3,educationExpenditure:4.4,forestArea:50.1,accessElectricity:100},{id:"320",code:"GT",name:"Guatemala",population:18,gdpPerCapita:9547,co2Emissions:1,lifeExpectancy:74.3,humanDevIndex:.627,internetUsers:51,renewableEnergy:62,urbanPopulation:52.4,healthExpenditure:5.8,educationExpenditure:3.4,forestArea:33,accessElectricity:98},{id:"068",code:"BO",name:"Bolivia",population:12,gdpPerCapita:9484,co2Emissions:1.8,lifeExpectancy:72.1,humanDevIndex:.692,internetUsers:66,renewableEnergy:24,urbanPopulation:70.4,healthExpenditure:6.9,educationExpenditure:7.3,forestArea:50.1,accessElectricity:99.3},{id:"340",code:"HN",name:"Honduras",population:10,gdpPerCapita:6289,co2Emissions:1,lifeExpectancy:75.3,humanDevIndex:.621,internetUsers:48,renewableEnergy:61,urbanPopulation:59,healthExpenditure:7.9,educationExpenditure:6.1,forestArea:38.1,accessElectricity:94},{id:"600",code:"PY",name:"Paraguay",population:7,gdpPerCapita:15030,co2Emissions:1.1,lifeExpectancy:74.3,humanDevIndex:.717,internetUsers:77,renewableEnergy:78,urbanPopulation:62.5,healthExpenditure:7.6,educationExpenditure:3.4,forestArea:38.6,accessElectricity:100},{id:"858",code:"UY",name:"Uruguay",population:3.5,gdpPerCapita:25041,co2Emissions:2,lifeExpectancy:78.4,humanDevIndex:.83,internetUsers:87,renewableEnergy:55,urbanPopulation:95.6,healthExpenditure:9.3,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"188",code:"CR",name:"Costa Rica",population:5,gdpPerCapita:23101,co2Emissions:1.5,lifeExpectancy:80.8,humanDevIndex:.809,internetUsers:81,renewableEnergy:73,urbanPopulation:81.4,healthExpenditure:7.3,educationExpenditure:6.7,forestArea:59,accessElectricity:100},{id:"591",code:"PA",name:"Panama",population:4.4,gdpPerCapita:35317,co2Emissions:2.5,lifeExpectancy:79.2,humanDevIndex:.805,internetUsers:68,renewableEnergy:35,urbanPopulation:68.4,healthExpenditure:7.3,educationExpenditure:3.2,forestArea:62.1,accessElectricity:95}],yo=[{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],accessor:o=>o.humanDevIndex,format:o=>o.toFixed(3)},{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],accessor:o=>o.gdpPerCapita,format:o=>`$${(o/1e3).toFixed(1)}k`},{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],accessor:o=>o.co2Emissions,format:o=>`${o.toFixed(1)}t`},{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],accessor:o=>o.lifeExpectancy,format:o=>`${o.toFixed(1)} yrs`},{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],accessor:o=>o.renewableEnergy,format:o=>`${o.toFixed(0)}%`},{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],accessor:o=>o.internetUsers,format:o=>`${o.toFixed(0)}%`},{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],accessor:o=>o.urbanPopulation,format:o=>`${o.toFixed(0)}%`},{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],accessor:o=>o.healthExpenditure,format:o=>`${o.toFixed(1)}%`},{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],accessor:o=>o.forestArea,format:o=>`${o.toFixed(0)}%`},{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffffd4","#fed98e","#cc4c02"],domain:[15,100],accessor:o=>o.accessElectricity,format:o=>`${o.toFixed(0)}%`}];function xo(o,e){const[t,i]=o.domain;return Math.max(0,Math.min(1,(e-t)/(i-t)))}const bo={US:"840",USA:"840","UNITED STATES":"840",AMERICA:"840",CA:"124",CAN:"124",CANADA:"124",MX:"484",MEX:"484",MEXICO:"484",DE:"276",DEU:"276",GERMANY:"276",DEUTSCHLAND:"276",FR:"250",FRA:"250",FRANCE:"250",GB:"826",GBR:"826",UK:"826","UNITED KINGDOM":"826",BRITAIN:"826",ENGLAND:"826",IT:"380",ITA:"380",ITALY:"380",ES:"724",ESP:"724",SPAIN:"724",PT:"620",PRT:"620",PORTUGAL:"620",NL:"528",NLD:"528",NETHERLANDS:"528",HOLLAND:"528",BE:"056",BEL:"056",BELGIUM:"056",AT:"040",AUT:"040",AUSTRIA:"040",CH:"756",CHE:"756",SWITZERLAND:"756",PL:"616",POL:"616",POLAND:"616",SE:"752",SWE:"752",SWEDEN:"752",NO:"578",NOR:"578",NORWAY:"578",DK:"208",DNK:"208",DENMARK:"208",FI:"246",FIN:"246",FINLAND:"246",IE:"372",IRL:"372",IRELAND:"372",GR:"300",GRC:"300",GREECE:"300",CZ:"203",CZE:"203","CZECH REPUBLIC":"203",CZECHIA:"203",RO:"642",ROU:"642",ROMANIA:"642",HU:"348",HUN:"348",HUNGARY:"348",UA:"804",UKR:"804",UKRAINE:"804",RU:"643",RUS:"643",RUSSIA:"643","RUSSIAN FEDERATION":"643",CN:"156",CHN:"156",CHINA:"156",JP:"392",JPN:"392",JAPAN:"392",KR:"410",KOR:"410","SOUTH KOREA":"410",KOREA:"410",IN:"356",IND:"356",INDIA:"356",ID:"360",IDN:"360",INDONESIA:"360",TH:"764",THA:"764",THAILAND:"764",VN:"704",VNM:"704",VIETNAM:"704",PH:"608",PHL:"608",PHILIPPINES:"608",MY:"458",MYS:"458",MALAYSIA:"458",SG:"702",SGP:"702",SINGAPORE:"702",PK:"586",PAK:"586",PAKISTAN:"586",BD:"050",BGD:"050",BANGLADESH:"050",TR:"792",TUR:"792",TURKEY:"792",TURKIYE:"792",SA:"682",SAU:"682","SAUDI ARABIA":"682",AE:"784",ARE:"784",UAE:"784","UNITED ARAB EMIRATES":"784",IL:"376",ISR:"376",ISRAEL:"376",IR:"364",IRN:"364",IRAN:"364",IQ:"368",IRQ:"368",IRAQ:"368",AU:"036",AUS:"036",AUSTRALIA:"036",NZ:"554",NZL:"554","NEW ZEALAND":"554",BR:"076",BRA:"076",BRAZIL:"076",AR:"032",ARG:"032",ARGENTINA:"032",CL:"152",CHL:"152",CHILE:"152",CO:"170",COL:"170",COLOMBIA:"170",PE:"604",PER:"604",PERU:"604",VE:"862",VEN:"862",VENEZUELA:"862",ZA:"710",ZAF:"710","SOUTH AFRICA":"710",EG:"818",EGY:"818",EGYPT:"818",NG:"566",NGA:"566",NIGERIA:"566",KE:"404",KEN:"404",KENYA:"404",ET:"231",ETH:"231",ETHIOPIA:"231",MA:"504",MAR:"504",MOROCCO:"504",DZ:"012",DZA:"012",ALGERIA:"012",TN:"788",TUN:"788",TUNISIA:"788",GH:"288",GHA:"288",GHANA:"288"};function Vi(o){const e=o.toUpperCase().trim();return/^\d{1,3}$/.test(o)?o.padStart(3,"0"):bo[e]||o}function fr(o){const e={};return o instanceof Map?o.forEach((t,i)=>{e[Vi(i)]=t}):Object.entries(o).forEach(([t,i])=>{e[Vi(t)]=i}),e}const jt=4096,Yt=2048,vo=`
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
`;class ht{canvas;ctx;countries=[];loaded=!1;statsMap;topologyConfig;currentRenderId=0;onProgress;onTextureUpdate;static cache=new Map;constructor(e,t,i){this.canvas=document.createElement("canvas"),this.canvas.width=jt,this.canvas.height=Yt,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.onProgress=t,this.onTextureUpdate=i,this.topologyConfig={url:e?.url||"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",objectName:e?.objectName||"countries",disableNormalization:e?.disableNormalization||!1,idProperty:e?.idProperty},this.statsMap=new Map,$i.forEach(n=>{this.statsMap.set(n.id,n)}),this.loadCountries()}async loadCountries(){const e=`${this.topologyConfig.url}|${this.topologyConfig.objectName}|${this.topologyConfig.idProperty||""}`;if(this.onProgress?.(.1),!ht.cache.has(e)){const t=(async()=>{try{let i;i=await this.loadInWorker(this.topologyConfig.url,this.topologyConfig.objectName,this.topologyConfig.idProperty),this.onProgress?.(.4);const n=200,r=i.length;for(let s=0;s<r;s+=n){i.slice(s,s+n).forEach(h=>{h.path=this.createPath(h)});const l=.4+.6*(s+n)/r;this.onProgress?.(Math.min(.99,l)),await new Promise(h=>setTimeout(h,0))}return console.log(`Loaded and processed ${i.length} boundaries from ${this.topologyConfig.objectName}`),i}catch(i){throw console.error("Failed to load map boundaries:",i),i}})();ht.cache.set(e,t)}try{this.countries=await ht.cache.get(e),this.loaded=!0,this.onProgress?.(1)}catch(t){ht.cache.delete(e),console.error("Error loading cached topology:",t),this.loaded=!0}}loadInWorker(e,t,i){return new Promise((n,r)=>{const s=new Blob([vo],{type:"application/javascript"}),a=URL.createObjectURL(s),l=new Worker(a);l.onmessage=h=>{URL.revokeObjectURL(a),l.terminate(),h.data.success?n(h.data.features):r(new Error(h.data.error))},l.onerror=h=>{URL.revokeObjectURL(a),l.terminate(),r(new Error("Worker error: "+h.message))},l.postMessage({url:e,objectName:t})})}async waitForLoad(){for(;!this.loaded;)await new Promise(e=>setTimeout(e,100))}renderTexture(e){this.currentRenderId++;const t=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,jt,Yt),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const i=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const n=500,r=this.countries.length;let s=0;const a=()=>{if(this.currentRenderId!==t)return;const l=Math.min(s+n,r);for(let h=s;h<l;h++){const c=this.countries[h],u=this.statsMap.get(c.id);let f="#2a2a2a";if(u){const g=e.accessor(u),p=xo(e,g);f=this.interpolateColor(e.colorScale,p)}this.drawFeature(c,f,i)}s=l,this.onTextureUpdate?.(),s<r&&requestAnimationFrame(a)};return requestAnimationFrame(a),this.canvas}drawFeature(e,t,i){const n=e.path;n&&(this.ctx.fillStyle=t,this.ctx.fill(n),i&&this.ctx.stroke(n))}createPath(e){const t=new Path2D,{geometry:i}=e;if(i.type==="Polygon")this.addPolygonToPath(t,i.coordinates);else if(i.type==="MultiPolygon")i.coordinates.forEach(n=>{this.addPolygonToPath(t,n)});else if(i.type==="Point"){const[n,r]=i.coordinates,[s,a]=this.projectPoint(n,r);t.arc(s,a,4,0,Math.PI*2)}return t}addPolygonToPath(e,t){t.forEach(i=>{let n=null;i.forEach((r,s)=>{const a=r[0],l=r[1],[h,c]=this.projectPoint(a,l),u=n!==null&&Math.abs(a-n)>180;s===0||u?e.moveTo(h,c):e.lineTo(h,c),n=a}),e.closePath()})}projectPoint(e,t){const i=(e+180)/360*jt,n=(90-t)/180*Yt;return[i,n]}interpolateColor(e,t){const i=c=>({r:parseInt(c.slice(1,3),16),g:parseInt(c.slice(3,5),16),b:parseInt(c.slice(5,7),16)}),[n,r,s]=e.map(i);let a,l,h;if(t<.5){const c=t*2;a=Math.round(n.r+(r.r-n.r)*c),l=Math.round(n.g+(r.g-n.g)*c),h=Math.round(n.b+(r.b-n.b)*c)}else{const c=(t-.5)*2;a=Math.round(r.r+(s.r-r.r)*c),l=Math.round(r.g+(s.g-r.g)*c),h=Math.round(r.b+(s.b-r.b)*c)}return`rgb(${a}, ${l}, ${h})`}renderCustomTexture(e,t,i){this.currentRenderId++;const n=this.currentRenderId;if(this.ctx.fillStyle="rgba(10, 20, 30, 0.9)",this.ctx.fillRect(0,0,jt,Yt),this.onTextureUpdate?.(),!this.loaded)return this.canvas;const r=this.topologyConfig?.disableNormalization?e instanceof Map?Object.fromEntries(e):e:fr(e),s=this.countries.length<1500;this.ctx.lineWidth=.5,this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)";const a=500,l=this.countries.length;let h=0;const c=()=>{if(this.currentRenderId!==n)return;const u=Math.min(h+a,l);for(let f=h;f<u;f++){const g=this.countries[f],p=r[g.id];let d="#2a2a2a";if(p!==void 0){const m=Math.max(0,Math.min(1,(p-i[0])/(i[1]-i[0])));d=this.interpolateColor(t,m)}this.drawFeature(g,d,s)}h=u,this.onTextureUpdate?.(),h<l&&requestAnimationFrame(c)};return requestAnimationFrame(c),this.canvas}getCanvas(){return this.canvas}getDataURL(){return this.canvas.toDataURL("image/png")}getBounds(){if(this.countries.length===0)return null;let e=1/0,t=-1/0,i=1/0,n=-1/0,r=0,s=1/0,a=-1/0,l=1/0,h=-1/0,c=0;const u=_=>{if(typeof _[0]=="number"){const y=_[0],x=_[1];y<0?(y<e&&(e=y),y>t&&(t=y),x<i&&(i=x),x>n&&(n=x),r++):(y<s&&(s=y),y>a&&(a=y),x<l&&(l=x),x>h&&(h=x),c++)}else _.forEach(u)};if(this.countries.forEach(_=>{_.geometry&&u(_.geometry.coordinates)}),r===0&&c===0)return null;if(r===0)return[s,l,a,h];if(c===0)return[e,i,t,n];const f=Math.min(e,s),g=Math.max(t,a);if(g-f>180){if(r>c*2)return[e,i,t,n];if(c>r*2)return[s,l,a,h]}const d=Math.min(i,l),m=Math.max(n,h);return[f,d,g,m]}}class Eo extends S.Object3D{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new S.Vector2(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const ct=new S.Vector3,mr=new S.Matrix4,gr=new S.Matrix4,_r=new S.Vector3,yr=new S.Vector3;class wo{constructor(e={}){const t=this;let i,n,r,s;const a={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:n}},this.render=function(p,d){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),mr.copy(d.matrixWorldInverse),gr.multiplyMatrices(d.projectionMatrix,mr),c(p,p,d),this.sortObjects&&g(p)},this.setSize=function(p,d){i=p,n=d,r=i/2,s=n/2,l.style.width=p+"px",l.style.height=d+"px"};function h(p){p.isCSS2DObject&&(p.element.style.display="none");for(let d=0,m=p.children.length;d<m;d++)h(p.children[d])}function c(p,d,m){if(p.visible===!1){h(p);return}if(p.isCSS2DObject){ct.setFromMatrixPosition(p.matrixWorld),ct.applyMatrix4(gr);const _=ct.z>=-1&&ct.z<=1&&p.layers.test(m.layers)===!0,y=p.element;y.style.display=_===!0?"":"none",_===!0&&(p.onBeforeRender(t,d,m),y.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(ct.x*r+r)+"px,"+(-ct.y*s+s)+"px)",y.parentNode!==l&&l.appendChild(y),p.onAfterRender(t,d,m));const x={distanceToCameraSquared:u(m,p)};a.objects.set(p,x)}for(let _=0,y=p.children.length;_<y;_++)c(p.children[_],d,m)}function u(p,d){return _r.setFromMatrixPosition(p.matrixWorld),yr.setFromMatrixPosition(d.matrixWorld),_r.distanceToSquared(yr)}function f(p){const d=[];return p.traverseVisible(function(m){m.isCSS2DObject&&d.push(m)}),d}function g(p){const d=f(p).sort(function(_,y){if(_.renderOrder!==y.renderOrder)return y.renderOrder-_.renderOrder;const x=a.objects.get(_).distanceToCameraSquared,b=a.objects.get(y).distanceToCameraSquared;return x-b}),m=d.length;for(let _=0,y=d.length;_<y;_++)d[_].element.style.zIndex=m-_}}}const Po={CN:[35,105],IN:[22,78],US:[39,-98],ID:[-2,118],PK:[30,70],BR:[-10,-55],NG:[9,8],BD:[24,90],RU:[60,100],MX:[23,-102],JP:[36,138],ET:[9,38.5],PH:[12,122],EG:[27,30],VN:[16,108],DE:[51,10],TR:[39,35],IR:[32,53],TH:[15,101],GB:[54,-2],FR:[46,2],IT:[42.5,12.5],ZA:[-29,24],TZ:[-6,35],KE:[0,38],KR:[36,128],CO:[4,-72],ES:[40,-4],AR:[-34,-64],UG:[1,32],DZ:[28,3],UA:[49,32],IQ:[33,44],PL:[52,20],CA:[56,-106],MA:[32,-5],SA:[24,45],PE:[-10,-76],AU:[-25,134],MY:[4,109.5],GH:[8,-1],NP:[28,84],VE:[7,-66],MG:[-19,47],CM:[6,12],NL:[52.5,5.5],CL:[-34,-71],SE:[62,15],NO:[64,10],SG:[1.3,103.8],NZ:[-42,174],IE:[53,-8],IL:[31,35],AE:[24,54],CH:[47,8],AT:[47.5,14.5],PT:[39.5,-8],GR:[39,22],CZ:[49.8,15.5],BE:[50.8,4],HU:[47,20],FI:[64,26],DK:[56,10],IS:[65,-18],CD:[-3,22],SD:[16,30],AO:[-12.5,18.5],MZ:[-18,35],CI:[7.5,-5.5],NE:[17,10],BF:[12,-1.5],ML:[17,-4],SN:[14.5,-14.5],ZM:[-15,28],ZW:[-19,29.5],RW:[-2,30],AF:[33,65],MM:[21,96],KP:[40,127],MN:[46,105],LK:[7.8,80.8],KZ:[48,67],UZ:[41,64],CU:[22,-79.5],EC:[-1.5,-78.5],GT:[15.5,-90.3],BO:[-17,-65],HN:[15,-86.5],PY:[-23,-58],UY:[-33,-56],CR:[10,-84],PA:[9,-80]},Co=new Set(["CN","IN","US","BR","RU","JP","DE","GB","FR","AU","CA","MX","ID","SA","ZA","EG","NG","AR","IT","ES","KR","TR","PL","NL","CH","SE","NO","PK","BD","VN"]),Ao=new Set(["CN","IN","US","BR","RU","AU","CA"]),So=new Set(["RU","CA","US","CN","BR","AU"]),Mo=new Set(["IN","AR","KZ","DZ","CD","SA","MX","ID","SD","LY","IR","MN","PE","TD","NE","AO","ML","ZA","CO","ET","BO","MR","EG","TZ","NG","VE","PK","TR","CL","MM"]),To=new Set(["AF","UA","MG","MZ","FR","ES","TH","CM","PG","JP","DE","VN","MY","CI","PL","IT","PH","EC","BF","NZ","GB","GH","RO","LA","GY","OM","BY","KH","SN","UG","NO","SE","FI","MR","ZM","ZW","NP","MA","IQ","BD"]);class Do{labelRenderer;labels=[];labelGroup;currentStyle="none";sphereRadius;currentMorph=0;globe=null;camera=null;constructor(e,t){this.sphereRadius=t,this.labelRenderer=new wo;const i=e.clientWidth||800,n=e.clientHeight||600;this.labelRenderer.setSize(i,n),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.left="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.zIndex="5",e.appendChild(this.labelRenderer.domElement),this.labelGroup=new A.Group,this.injectStyles(),this.createLabels()}injectStyles(){const e=document.createElement("style");e.textContent=`
      .country-label {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 1),
          0 0 4px rgba(0, 0, 0, 0.9),
          0 0 8px rgba(0, 0, 0, 0.7),
          0 0 12px rgba(0, 0, 0, 0.5);
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        transform: translateX(-50%);
        transition: opacity 0.3s ease;
        letter-spacing: 1px;
        text-transform: uppercase;
      }

      /* Size categories - proportional to country size */
      .country-label.size-large {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 2.5px;
        color: rgba(255, 255, 255, 0.95);
      }

      .country-label.size-medium {
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 1.5px;
        color: rgba(255, 255, 255, 0.9);
      }

      .country-label.size-small {
        font-size: 7px;
        font-weight: 500;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.8);
      }

      .country-label.size-tiny {
        font-size: 6px;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.7);
      }

      .country-label.hidden {
        opacity: 0 !important;
        visibility: hidden;
      }

      /* Minimal style - bold for the 7 largest */
      .label-style-minimal .country-label.size-large {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #fff;
      }

      /* Major style - balanced visibility */
      .label-style-major .country-label.size-large {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 2px;
      }

      .label-style-major .country-label.size-medium {
        font-size: 8px;
      }

      /* All style - slightly more subtle but still readable */
      .label-style-all .country-label {
        color: rgba(255, 255, 255, 0.85);
      }

      .label-style-all .country-label.size-large {
        font-size: 9px;
        color: rgba(255, 255, 255, 0.9);
      }

      .label-style-all .country-label.size-tiny {
        font-size: 5px;
        color: rgba(255, 255, 255, 0.6);
      }
    `,document.head.appendChild(e)}getSizeCategory(e){return So.has(e)?"large":Mo.has(e)?"medium":To.has(e)?"small":"tiny"}createLabels(){$i.forEach(e=>{const t=Po[e.code];if(!t)return;const[i,n]=t,r=this.getSizeCategory(e.code),s=document.createElement("div");s.className=`country-label hidden size-${r}`,s.textContent=e.name;const a=new Eo(s),l={element:s,object:a,country:e,lat:i,lon:n,sizeCategory:r};this.labelGroup.add(a),this.labels.push(l),this.updateLabelPosition(a,l,this.currentMorph)})}localPos=new A.Vector3;worldPos=new A.Vector3;cameraDirection=new A.Vector3;labelNormal=new A.Vector3;updateLabelPosition(e,t,i){const{lat:n,lon:r,element:s}=t,a=(r+180)/360,l=(n+90)/180,h=(a-.5)*2*Math.PI,c=(l-.5)*Math.PI,u=this.sphereRadius+.3,f=u*Math.cos(c)*Math.sin(h),g=u*Math.sin(c),p=u*Math.cos(c)*Math.cos(h),d=2*Math.PI*this.sphereRadius,m=Math.PI*this.sphereRadius,_=(a-.5)*d,y=(l-.5)*m,x=.3,b=i*i*(3-2*i);if(this.localPos.set(_+b*(f-_),y+b*(g-y),x+b*(p-x)),this.globe)if(this.worldPos.copy(this.localPos),this.worldPos.applyMatrix4(this.globe.matrixWorld),e.position.copy(this.worldPos),this.camera&&b>.5){this.cameraDirection.copy(this.camera.position).normalize(),this.labelNormal.set(f,g,p).normalize(),this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize();const v=this.labelNormal.dot(this.cameraDirection);s.style.opacity=v>.15?"":"0"}else s.style.opacity="";else e.position.copy(this.localPos),s.style.opacity=""}getGroup(){return this.labelGroup}setStyle(e){this.currentStyle=e,this.labels.forEach(t=>{const i=t.country.code;let n=!1;switch(e){case"none":n=!1;break;case"minimal":n=Ao.has(i);break;case"major":n=Co.has(i);break;case"all":case"capitals":n=!0;break}t.element.classList.toggle("hidden",!n)}),this.labelRenderer.domElement.className=`label-style-${e}`}setMorph(e){this.currentMorph=e}setGlobe(e){this.globe=e}setCamera(e){this.camera=e}update(){this.currentStyle!=="none"&&this.labels.forEach(e=>{this.updateLabelPosition(e.object,e,this.currentMorph)})}render(e,t){this.currentStyle!=="none"&&this.labelRenderer.render(e,t)}resize(e,t){this.labelRenderer.setSize(e,t)}getStyle(){return this.currentStyle}getVisibleLabelsForCanvas(e,t,i){if(this.currentStyle==="none")return[];const n=[],r=new A.Vector3;return this.labels.forEach(s=>{const a=s.element.style.opacity,l=a===""?1:parseFloat(a)||0;if(l<.1||s.element.classList.contains("hidden"))return;s.object.getWorldPosition(r),r.project(e);const h=(r.x*.5+.5)*t,c=(-r.y*.5+.5)*i;h>=0&&h<=t&&c>=0&&c<=i&&r.z<1&&n.push({text:s.country.name,x:h,y:c,opacity:l})}),n}dispose(){this.labels.forEach(e=>{this.labelGroup.remove(e.object),e.element.remove()}),this.labels=[],this.labelRenderer.domElement.remove()}}var Oo={trailer:59};function xr(o=256){let e=0,t=new Uint8Array(o);return{get buffer(){return t.buffer},reset(){e=0},bytesView(){return t.subarray(0,e)},bytes(){return t.slice(0,e)},writeByte(n){i(e+1),t[e]=n,e++},writeBytes(n,r=0,s=n.length){i(e+s);for(let a=0;a<s;a++)t[e++]=n[a+r]},writeBytesView(n,r=0,s=n.byteLength){i(e+s),t.set(n.subarray(r,r+s),e),e+=s}};function i(n){var r=t.length;if(r>=n)return;var s=1024*1024;n=Math.max(n,r*(r<s?2:1.125)>>>0),r!=0&&(n=Math.max(n,256));let a=t;t=new Uint8Array(n),e>0&&t.set(a.subarray(0,e),0)}}var Gi=12,br=5003,Io=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function Lo(o,e,t,i,n=xr(512),r=new Uint8Array(256),s=new Int32Array(br),a=new Int32Array(br)){let l=s.length,h=Math.max(2,i);r.fill(0),a.fill(0),s.fill(-1);let c=0,u=0,f=h+1,g=f,p=!1,d=g,m=(1<<d)-1,_=1<<f-1,y=_+1,x=_+2,b=0,v=t[0],P=0;for(let w=l;w<65536;w*=2)++P;P=8-P,n.writeByte(h),C(_);let E=t.length;for(let w=1;w<E;w++)e:{let T=t[w],O=(T<<Gi)+v,M=T<<P^v;if(s[M]===O){v=a[M];break e}let I=M===0?1:l-M;for(;s[M]>=0;)if(M-=I,M<0&&(M+=l),s[M]===O){v=a[M];break e}C(v),v=T,x<1<<Gi?(a[M]=x++,s[M]=O):(s.fill(-1),x=_+2,p=!0,C(_))}return C(v),C(y),n.writeByte(0),n.bytesView();function C(w){for(c&=Io[u],u>0?c|=w<<u:c=w,u+=d;u>=8;)r[b++]=c&255,b>=254&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0),c>>=8,u-=8;if((x>m||p)&&(p?(d=g,m=(1<<d)-1,p=!1):(++d,m=d===Gi?1<<d:(1<<d)-1)),w==y){for(;u>0;)r[b++]=c&255,b>=254&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0),c>>=8,u-=8;b>0&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0)}}}var Ro=Lo;function vr(o,e,t){return o<<8&63488|e<<2&992|t>>3}function Er(o,e,t,i){return o>>4|e&240|(t&240)<<4|(i&240)<<8}function wr(o,e,t){return o>>4<<8|e&240|t>>4}function Ht(o,e,t){return o<e?e:o>t?t:o}function Zt(o){return o*o}function Pr(o,e,t){var i=0,n=1e100;let r=o[e],s=r.cnt;r.ac;let a=r.rc,l=r.gc,h=r.bc;for(var c=r.fw;c!=0;c=o[c].fw){let f=o[c],g=f.cnt,p=s*g/(s+g);if(!(p>=n)){var u=0;u+=p*Zt(f.rc-a),!(u>=n)&&(u+=p*Zt(f.gc-l),!(u>=n)&&(u+=p*Zt(f.bc-h),!(u>=n)&&(n=u,i=c)))}}r.err=n,r.nn=i}function ji(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function ko(o,e){let t=e==="rgb444"?4096:65536,i=new Array(t),n=o.length;if(e==="rgba4444")for(let r=0;r<n;++r){let s=o[r],a=s>>24&255,l=s>>16&255,h=s>>8&255,c=s&255,u=Er(c,h,l,a),f=u in i?i[u]:i[u]=ji();f.rc+=c,f.gc+=h,f.bc+=l,f.ac+=a,f.cnt++}else if(e==="rgb444")for(let r=0;r<n;++r){let s=o[r],a=s>>16&255,l=s>>8&255,h=s&255,c=wr(h,l,a),u=c in i?i[c]:i[c]=ji();u.rc+=h,u.gc+=l,u.bc+=a,u.cnt++}else for(let r=0;r<n;++r){let s=o[r],a=s>>16&255,l=s>>8&255,h=s&255,c=vr(h,l,a),u=c in i?i[c]:i[c]=ji();u.rc+=h,u.gc+=l,u.bc+=a,u.cnt++}return i}function Uo(o,e,t={}){let{format:i="rgb565",clearAlpha:n=!0,clearAlphaColor:r=0,clearAlphaThreshold:s=0,oneBitAlpha:a=!1}=t;if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let l=new Uint32Array(o.buffer),h=t.useSqrt!==!1,c=i==="rgba4444",u=ko(l,i),f=u.length,g=f-1,p=new Uint32Array(f+1);for(var d=0,m=0;m<f;++m){let L=u[m];if(L!=null){var _=1/L.cnt;c&&(L.ac*=_),L.rc*=_,L.gc*=_,L.bc*=_,u[d++]=L}}Zt(e)/d<.022&&(h=!1);for(var m=0;m<d-1;++m)u[m].fw=m+1,u[m+1].bk=m,h&&(u[m].cnt=Math.sqrt(u[m].cnt));h&&(u[m].cnt=Math.sqrt(u[m].cnt));var y,x,b;for(m=0;m<d;++m){Pr(u,m);var v=u[m].err;for(x=++p[0];x>1&&(b=x>>1,!(u[y=p[b]].err<=v));x=b)p[x]=y;p[x]=m}var P=d-e;for(m=0;m<P;){for(var E;;){var C=p[1];if(E=u[C],E.tm>=E.mtm&&u[E.nn].mtm<=E.tm)break;E.mtm==g?C=p[1]=p[p[0]--]:(Pr(u,C),E.tm=m);var v=u[C].err;for(x=1;(b=x+x)<=p[0]&&(b<p[0]&&u[p[b]].err>u[p[b+1]].err&&b++,!(v<=u[y=p[b]].err));x=b)p[x]=y;p[x]=C}var w=u[E.nn],T=E.cnt,O=w.cnt,_=1/(T+O);c&&(E.ac=_*(T*E.ac+O*w.ac)),E.rc=_*(T*E.rc+O*w.rc),E.gc=_*(T*E.gc+O*w.gc),E.bc=_*(T*E.bc+O*w.bc),E.cnt+=w.cnt,E.mtm=++m,u[w.bk].fw=w.fw,u[w.fw].bk=w.bk,w.mtm=g}let M=[];var I=0;for(m=0;;++I){let L=Ht(Math.round(u[m].rc),0,255),G=Ht(Math.round(u[m].gc),0,255),N=Ht(Math.round(u[m].bc),0,255),F=255;c&&(F=Ht(Math.round(u[m].ac),0,255),a&&(F=F<=(typeof a=="number"?a:127)?0:255),n&&F<=s&&(L=G=N=r,F=0));let ae=c?[L,G,N,F]:[L,G,N];if(Fo(M,ae)||M.push(ae),(m=u[m].fw)==0)break}return M}function Fo(o,e){for(let t=0;t<o.length;t++){let i=o[t],n=i[0]===e[0]&&i[1]===e[1]&&i[2]===e[2],r=i.length>=4&&e.length>=4?i[3]===e[3]:!0;if(n&&r)return!0}return!1}function zo(o,e,t="rgb565"){if(!o||!o.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(o instanceof Uint8Array)&&!(o instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let i=new Uint32Array(o.buffer),n=i.length,r=t==="rgb444"?4096:65536,s=new Uint8Array(n),a=new Array(r);if(t==="rgba4444")for(let l=0;l<n;l++){let h=i[l],c=h>>24&255,u=h>>16&255,f=h>>8&255,g=h&255,p=Er(g,f,u,c),d=p in a?a[p]:a[p]=No(g,f,u,c,e);s[l]=d}else{let l=t==="rgb444"?wr:vr;for(let h=0;h<n;h++){let c=i[h],u=c>>16&255,f=c>>8&255,g=c&255,p=l(g,f,u),d=p in a?a[p]:a[p]=Bo(g,f,u,e);s[h]=d}}return s}function No(o,e,t,i,n){let r=0,s=1e100;for(let a=0;a<n.length;a++){let l=n[a],h=l[3],c=We(h-i);if(c>s)continue;let u=l[0];if(c+=We(u-o),c>s)continue;let f=l[1];if(c+=We(f-e),c>s)continue;let g=l[2];c+=We(g-t),!(c>s)&&(s=c,r=a)}return r}function Bo(o,e,t,i){let n=0,r=1e100;for(let s=0;s<i.length;s++){let a=i[s],l=a[0],h=We(l-o);if(h>r)continue;let c=a[1];if(h+=We(c-e),h>r)continue;let u=a[2];h+=We(u-t),!(h>r)&&(r=h,n=s)}return n}function We(o){return o*o}function $o(o={}){let{initialCapacity:e=4096,auto:t=!0}=o,i=xr(e),n=5003,r=new Uint8Array(256),s=new Int32Array(n),a=new Int32Array(n),l=!1;return{reset(){i.reset(),l=!1},finish(){i.writeByte(Oo.trailer)},bytes(){return i.bytes()},bytesView(){return i.bytesView()},get buffer(){return i.buffer},get stream(){return i},writeHeader:h,writeFrame(c,u,f,g={}){let{transparent:p=!1,transparentIndex:d=0,delay:m=0,palette:_=null,repeat:y=0,colorDepth:x=8,dispose:b=-1}=g,v=!1;if(t?l||(v=!0,h(),l=!0):v=!!g.first,u=Math.max(0,Math.floor(u)),f=Math.max(0,Math.floor(f)),v){if(!_)throw new Error("First frame must include a { palette } option");Go(i,u,f,_,x),Cr(i,_),y>=0&&jo(i,y)}let P=Math.round(m/10);Vo(i,b,P,p,d);let E=!!_&&!v;Yo(i,u,f,E?_:null),E&&Cr(i,_),Ho(i,c,u,f,x,r,s,a)}};function h(){Ar(i,"GIF89a")}}function Vo(o,e,t,i,n){o.writeByte(33),o.writeByte(249),o.writeByte(4),n<0&&(n=0,i=!1);var r,s;i?(r=1,s=2):(r=0,s=0),e>=0&&(s=e&7),s<<=2,o.writeByte(0|s|0|r),Fe(o,t),o.writeByte(n||0),o.writeByte(0)}function Go(o,e,t,i,n=8){let r=1,s=0,a=Yi(i.length)-1,l=r<<7|n-1<<4|s<<3|a;Fe(o,e),Fe(o,t),o.writeBytes([l,0,0])}function jo(o,e){o.writeByte(33),o.writeByte(255),o.writeByte(11),Ar(o,"NETSCAPE2.0"),o.writeByte(3),o.writeByte(1),Fe(o,e),o.writeByte(0)}function Cr(o,e){let t=1<<Yi(e.length);for(let i=0;i<t;i++){let n=[0,0,0];i<e.length&&(n=e[i]),o.writeByte(n[0]),o.writeByte(n[1]),o.writeByte(n[2])}}function Yo(o,e,t,i){if(o.writeByte(44),Fe(o,0),Fe(o,0),Fe(o,e),Fe(o,t),i){let n=0,r=0,s=Yi(i.length)-1;o.writeByte(128|n|r|0|s)}else o.writeByte(0)}function Ho(o,e,t,i,n=8,r,s,a){Ro(t,i,e,n,o,r,s,a)}function Fe(o,e){o.writeByte(e&255),o.writeByte(e>>8&255)}function Ar(o,e){for(var t=0;t<e.length;t++)o.writeByte(e.charCodeAt(t))}function Yi(o){return Math.max(Math.ceil(Math.log2(o)),1)}class Zo{renderer;scene;camera;isRecording=!1;frames=[];mediaRecorder=null;recordedChunks=[];captureCanvas;captureCtx;compositeCanvas;compositeCtx;gifWidth=480;gifHeight=270;legendElement=null;countryLabels=null;constructor(e,t,i){this.renderer=e,this.scene=t,this.camera=i,this.captureCanvas=document.createElement("canvas"),this.captureCtx=this.captureCanvas.getContext("2d",{willReadFrequently:!0}),this.compositeCanvas=document.createElement("canvas"),this.compositeCtx=this.compositeCanvas.getContext("2d")}setLegendElement(e){this.legendElement=e}setCountryLabels(e){this.countryLabels=e}drawCountryLabelsOnCanvas(e,t,i,n){if(this.countryLabels)try{this.countryLabels.getVisibleLabelsForCanvas(n||this.camera,t,i).forEach(s=>{e.save(),e.globalAlpha=s.opacity,e.font="bold 12px Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.strokeStyle="rgba(0, 0, 0, 0.8)",e.lineWidth=3,e.strokeText(s.text,s.x,s.y),e.fillStyle="#ffffff",e.fillText(s.text,s.x,s.y),e.restore()})}catch(r){console.warn("Failed to draw country labels:",r)}}drawOverlaysOnCanvas(e,t,i,n){this.drawCountryLabelsOnCanvas(e,t,i,n),this.drawLegendOnCanvas(e,t,i)}drawLegendOnCanvas(e,t,i){try{if(!this.legendElement||!this.legendElement.classList.contains("visible"))return;const n=this.legendElement,r=n.querySelector(".gralobe-legend-title")||n.querySelector(".legend-title"),s=n.querySelector(".gralobe-legend-gradient")||n.querySelector(".legend-gradient"),a=n.querySelector(".gralobe-legend-min")||n.querySelector(".legend-min"),l=n.querySelector(".gralobe-legend-max")||n.querySelector(".legend-max"),h=n.querySelector(".gralobe-legend-description")||n.querySelector(".legend-description");if(!r||!s)return;const c=280,u=100,f=20,g=t-c-f,p=i-u-f,d=12;e.fillStyle="rgba(0, 10, 20, 0.9)",e.strokeStyle="rgba(100, 170, 255, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect?e.roundRect(g,p,c,u,d):e.rect(g,p,c,u),e.fill(),e.stroke(),e.fillStyle="#44aaff",e.font="bold 18px Arial, sans-serif",e.fillText(r.textContent||"",g+16,p+28);const m=g+16,_=p+40,y=c-32,x=20,b=s.style.background||"";let v=[];const P=b.match(/rgba?\([^)]+\)/g);if(P&&P.length>=2)v=P;else{const E=b.match(/#[0-9a-fA-F]{3,8}/g);E&&E.length>=2&&(v=E)}if(v.length>=2){const E=e.createLinearGradient(m,0,m+y,0);E.addColorStop(0,v[0]),v.length>=3?(E.addColorStop(.5,v[1]),E.addColorStop(1,v[2])):E.addColorStop(1,v[1]),e.fillStyle=E,e.beginPath(),e.roundRect?e.roundRect(m,_,y,x,4):e.rect(m,_,y,x),e.fill()}else{const E=e.createLinearGradient(m,0,m+y,0);E.addColorStop(0,"#cc6600"),E.addColorStop(.5,"#ffaa44"),E.addColorStop(1,"#ffeecc"),e.fillStyle=E,e.beginPath(),e.roundRect?e.roundRect(m,_,y,x,4):e.rect(m,_,y,x),e.fill(),console.log("Legend gradient style:",b)}if(e.fillStyle="#cccccc",e.font="14px Arial, sans-serif",a&&e.fillText(a.textContent||"",m,p+78),l){const E=l.textContent||"",C=e.measureText(E).width;e.fillText(E,m+y-C,p+78)}h&&h.textContent&&(e.fillStyle="#888888",e.font="italic 12px Arial, sans-serif",e.fillText(h.textContent,m,p+95))}catch(n){console.warn("Failed to draw legend on canvas:",n)}}screenshot(e={}){const{width:t=1920,height:i=1080,filename:n}=e,r=new A.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0});r.setSize(t,i),r.setPixelRatio(1);const s=this.camera.clone();s.aspect=t/i,s.updateProjectionMatrix(),r.render(this.scene,s),this.compositeCanvas.width=t,this.compositeCanvas.height=i,this.compositeCtx.drawImage(r.domElement,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,t,i,s);const a=this.compositeCanvas.toDataURL("image/png");r.dispose();const l=n?`${n}.png`:`globe-${Date.now()}.png`;this.downloadFile(a,l)}startVideoRecording(e={}){return new Promise(t=>{if(this.isRecording){t();return}const i=this.renderer.domElement;this.compositeCanvas.width=i.width,this.compositeCanvas.height=i.height,this.compositeCtx.drawImage(i,0,0),this.drawOverlaysOnCanvas(this.compositeCtx,this.compositeCanvas.width,this.compositeCanvas.height);const n=this.compositeCanvas.captureStream(60),r=[{mime:"video/mp4;codecs=avc1",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=h264",ext:"webm"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];let s="video/webm",a="webm";for(const{mime:h,ext:c}of r)if(MediaRecorder.isTypeSupported(h)){s=h,a=c,console.log(`Video recording using: ${h}`);break}this.mediaRecorder=new MediaRecorder(n,{mimeType:s,videoBitsPerSecond:8e6}),this.recordedChunks=[];const l=a;this.mediaRecorder.ondataavailable=h=>{h.data.size>0&&this.recordedChunks.push(h.data)},this.mediaRecorder.onstop=()=>{const h=s.split(";")[0],c=new Blob(this.recordedChunks,{type:h}),u=URL.createObjectURL(c);this.downloadFile(u,`globe-${Date.now()}.${l}`),URL.revokeObjectURL(u)},this.mediaRecorder.onstart=()=>{this.isRecording=!0,setTimeout(()=>t(),50)},this.mediaRecorder.start(100)})}updateVideoFrame(){if(!this.isRecording||!this.mediaRecorder)return;const e=this.compositeCanvas.width,t=this.compositeCanvas.height;this.compositeCtx.drawImage(this.renderer.domElement,0,0,e,t),this.drawOverlaysOnCanvas(this.compositeCtx,e,t)}stopVideoRecording(){!this.isRecording||!this.mediaRecorder||(this.mediaRecorder.stop(),this.isRecording=!1)}startGifCapture(e={}){if(this.isRecording)return;this.frames=[],this.isRecording=!0;const{width:t=480,height:i=270}=e;this.gifWidth=t,this.gifHeight=i,this.captureCanvas.width=t,this.captureCanvas.height=i}captureGifFrame(){if(!this.isRecording)return;const e=this.renderer.domElement,t=this.gifWidth,i=this.gifHeight;this.captureCtx.drawImage(e,0,0,t,i),this.drawOverlaysOnCanvas(this.captureCtx,t,i);const n=this.captureCtx.getImageData(0,0,t,i);this.frames.push({data:new Uint8ClampedArray(n.data),width:t,height:i})}async stopGifCapture(e={}){if(!this.isRecording)return;if(this.isRecording=!1,this.frames.length===0){console.warn("No frames captured for GIF");return}const{fps:t=20,filename:i}=e,n=Math.round(1e3/t);console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);try{const r=this.frames[0],s=r.width,a=r.height,l=Uo(r.data,256),h=$o();for(let p=0;p<this.frames.length;p++){const d=this.frames[p],m=zo(d.data,l);h.writeFrame(m,s,a,{palette:p===0?l:void 0,delay:n,repeat:p===0?0:void 0}),p%10===0&&await new Promise(_=>setTimeout(_,0))}h.finish();const c=h.bytes(),u=new Blob([c],{type:"image/gif"}),f=URL.createObjectURL(u),g=i||`globe-${Date.now()}.gif`;this.downloadFile(f,g),setTimeout(()=>URL.revokeObjectURL(f),1e3),console.log(`GIF saved: ${g} (${this.frames.length} frames, ${(u.size/1024).toFixed(1)}KB)`)}catch(r){console.error("Failed to generate GIF:",r)}this.frames=[]}getIsRecording(){return this.isRecording}getFrameCount(){return this.frames.length}downloadFile(e,t){const i=document.createElement("a");i.href=e,i.download=t,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}function Hi(o){return o==="%"?e=>`${e.toFixed(1)}%`:o==="$"?e=>`$${e.toLocaleString()}`:o==="years"?e=>`${e.toFixed(1)} yrs`:o.includes("per capita")||o.includes("per 100")||o.includes("per 1000")?e=>`${e.toFixed(1)}`:o==="% GDP"||o==="% of GDP"?e=>`${e.toFixed(1)}%`:o===""||o==="index"?e=>e.toFixed(3):e=>{const t=Number.isInteger(e)?e.toLocaleString():e.toFixed(1);return o?`${t} ${o}`:t}}function Wo(o,e,t){return(t??Hi(e))(o)}let Sr=!1;function Ko(){if(Sr)return;Sr=!0;const o=document.createElement("style");o.setAttribute("data-gralobe-legend","true"),o.textContent=`
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
  `,document.head.appendChild(o)}class Xo{element;parentContainer;visible=!1;resizeObserver=null;constructor(e){Ko(),this.parentContainer=e,getComputedStyle(e).position==="static"&&(e.style.position="relative"),this.element=document.createElement("div"),this.element.className="gralobe-legend",this.element.setAttribute("data-testid","globe-legend"),this.element.innerHTML=`
      <div class="gralobe-legend-hint">G: view · F: fullscreen</div>
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `,e.appendChild(this.element),this.updateSize(),this.resizeObserver=new ResizeObserver(()=>this.updateSize()),this.resizeObserver.observe(e)}getSizeClass(e,t){const i=Math.min(e,t);return i<200?"xs":i<300?"sm":i<450?"md":"lg"}updateSize(){const e=this.parentContainer.clientWidth,t=this.parentContainer.clientHeight,i=this.getSizeClass(e,t);this.element.classList.remove("size-xs","size-sm","size-md","size-lg"),this.element.classList.add(`size-${i}`)}show(e){const t=this.element.querySelector(".gralobe-legend-title"),i=this.element.querySelector(".gralobe-legend-gradient"),n=this.element.querySelector(".gralobe-legend-min"),r=this.element.querySelector(".gralobe-legend-max"),s=this.element.querySelector(".gralobe-legend-description");t.textContent=e.name,s.textContent=e.description;const[a,l,h]=e.colorScale;i.style.background=`linear-gradient(to right, ${a}, ${l}, ${h})`;const c=e.format??Hi(e.unit);n.textContent=c(e.domain[0]),r.textContent=c(e.domain[1]),this.element.classList.add("visible"),this.visible=!0}hide(){this.element.classList.remove("visible"),this.visible=!1}isVisible(){return this.visible}getElement(){return this.element}dispose(){this.resizeObserver?.disconnect(),this.element.remove()}}const ee=50,qo=`
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
const float RADIUS = ${ee.toFixed(1)};

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
`,Qo=`
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
`,Jo=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

const float PI = 3.14159265359;
const float RADIUS = ${ee.toFixed(1)};

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
`,ea=`
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
`,ta=`
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
`,ia=`
uniform float uOpacity;
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9 * uOpacity);
}
`,Mr=Math.PI/180;function na(o,e,t=ee){const i=(90-o)*Mr,n=(e+180)*Mr;return new A.Vector3(-t*Math.sin(i)*Math.cos(n),t*Math.cos(i),t*Math.sin(i)*Math.sin(n))}function ra(o,e){const t=2*Math.PI*ee,i=Math.PI*ee;return new A.Vector3(e/180*(t/2),o/90*(i/2),0)}const sa={style:"spike",color:"#0ea5e9",maxHeight:15,pulseAnimation:!0,opacity:.9};class oa{group;markers=[];config;markerMeshes=[];glowMeshes=[];morph=1;time=0;markerMaterial;glowMaterial;constructor(e={}){this.group=new A.Group,this.config={...sa,...e},this.markerMaterial=new A.MeshBasicMaterial({color:new A.Color(this.config.color),transparent:!0,opacity:this.config.opacity}),this.glowMaterial=new A.ShaderMaterial({uniforms:{uColor:{value:new A.Color(this.config.color)},uTime:{value:0},uPulse:{value:this.config.pulseAnimation?1:0}},vertexShader:`
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
      `,transparent:!0,blending:A.AdditiveBlending,side:A.BackSide,depthWrite:!1})}getGroup(){return this.group}setMarkers(e){this.markers=e,this.rebuild()}setConfig(e){this.config={...this.config,...e},e.color&&(this.markerMaterial.color.set(e.color),this.glowMaterial.uniforms.uColor.value.set(e.color)),e.opacity!==void 0&&(this.markerMaterial.opacity=e.opacity),e.pulseAnimation!==void 0&&(this.glowMaterial.uniforms.uPulse.value=e.pulseAnimation?1:0),this.rebuild()}setMorph(e){this.morph=e,this.updatePositions()}update(e){this.time=e,this.glowMaterial.uniforms.uTime.value=e}rebuild(){if(this.group.clear(),this.markerMeshes=[],this.glowMeshes=[],this.markers.length===0)return;const e=this.markers.map(i=>i.value),t=Math.max(...e,1);for(const i of this.markers){const n=i.value/t,r=this.createMarkerMesh(i,n);if(this.markerMeshes.push(r),this.group.add(r),this.config.style!=="dot"){const s=this.createGlowMesh(i,n);this.glowMeshes.push(s),this.group.add(s)}}this.updatePositions()}createMarkerMesh(e,t){let i;const n=2+t*this.config.maxHeight;switch(this.config.style){case"dot":i=new A.SphereGeometry(1+t*2,16,12);break;case"pin":i=new A.ConeGeometry(1.5,n,8);break;case"spike":default:i=new A.CylinderGeometry(.3,1.2,n,8);break}const r=e.color?new A.MeshBasicMaterial({color:new A.Color(e.color),transparent:!0,opacity:this.config.opacity}):this.markerMaterial,s=new A.Mesh(i,r);return s.userData={marker:e,height:n},s}createGlowMesh(e,t){const i=2+t*3,n=new A.SphereGeometry(i,16,12),r=e.color?new A.ShaderMaterial({...this.glowMaterial,uniforms:{...this.glowMaterial.uniforms,uColor:{value:new A.Color(e.color)}}}):this.glowMaterial,s=new A.Mesh(n,r);return s.userData={marker:e},s}updatePositions(){for(let e=0;e<this.markerMeshes.length;e++){const t=this.markerMeshes[e],i=t.userData.marker,n=t.userData.height,r=na(i.lat,i.lng,ee),s=ra(i.lat,i.lng),a=this.morph*this.morph*(3-2*this.morph);if(t.position.lerpVectors(s,r,a),a>.01){if(t.lookAt(t.position.clone().multiplyScalar(2)),this.config.style==="spike"||this.config.style==="pin"){t.rotateX(Math.PI/2);const l=r.clone().normalize().multiplyScalar(n/2);t.position.add(l.multiplyScalar(a))}}else t.rotation.set(-Math.PI/2,0,0),(this.config.style==="spike"||this.config.style==="pin")&&(t.position.z=n/2);this.glowMeshes[e]&&this.glowMeshes[e].position.copy(t.position)}}getMarkerAtPosition(e,t,i){e.setFromCamera(i,t);const n=e.intersectObjects(this.markerMeshes);return n.length>0?n[0].object.userData.marker:null}dispose(){this.group.clear(),this.markerMaterial.dispose(),this.glowMaterial.dispose();for(const e of this.markerMeshes)e.geometry.dispose(),e.material!==this.markerMaterial&&e.material.dispose();for(const e of this.glowMeshes)e.geometry.dispose(),e.material!==this.glowMaterial&&e.material.dispose();this.markerMeshes=[],this.glowMeshes=[]}}const Wt={lifeExpectancy:{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],format:o=>`${o.toFixed(1)} years`},humanDevIndex:{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],format:o=>o.toFixed(3)},gdpPerCapita:{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],format:o=>`$${(o/1e3).toFixed(1)}k`},co2Emissions:{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],format:o=>`${o.toFixed(1)}t`},renewableEnergy:{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},internetUsers:{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],format:o=>`${o.toFixed(0)}%`},urbanPopulation:{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],format:o=>`${o.toFixed(0)}%`},healthExpenditure:{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],format:o=>`${o.toFixed(1)}%`},forestArea:{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],format:o=>`${o.toFixed(0)}%`},population:{id:"population",name:"Population",unit:"millions",description:"Total population",colorScale:["#fff7bc","#fec44f","#d95f0e"],domain:[1,1500],format:o=>`${o.toFixed(0)}M`},accessElectricity:{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffeda0","#feb24c","#f03b20"],domain:[20,100],format:o=>`${o.toFixed(0)}%`},educationExpenditure:{id:"educationExpenditure",name:"Education Spending",unit:"% GDP",description:"Government expenditure on education as percentage of GDP",colorScale:["#edf8fb","#7bccc4","#0868ac"],domain:[1,10],format:o=>`${o.toFixed(1)}%`}};Wt.lifeExpectancy;const Tr={satellite:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",natural:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",dark:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",light:"https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",night:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",topographic:"https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"},Dr={texture:"satellite",labels:"all",statistic:"lifeExpectancy",autoRotate:!1,initialView:"globe",showControls:!1,showLegend:!0,effects:{atmosphereIntensity:0,atmosphere:!1,clouds:!1,starTwinkle:!0},extrudeHeight:!1};class aa{container;config;scene;camera;renderer;controls;globe=null;material=null;atmosphere=null;stars=null;gui=null;choropleth=null;legend=null;exporter=null;countryLabels=null;markerLayer=null;textureLoader=new A.TextureLoader;dataTexture=null;morph=0;currentStatistic=null;animationId=null;isDestroyed=!1;ready;resolveReady;constructor(e,t={}){if(typeof e=="string"){const i=document.querySelector(e);if(!i)throw new Error(`Container not found: ${e}`);this.container=i}else this.container=e;this.config={...Dr,...t,effects:{...Dr.effects,...t.effects}},this.ready=new Promise(i=>{this.resolveReady=i}),this.init()}async init(){const e=this.config.width||this.container.clientWidth||800,t=this.config.height||this.container.clientHeight||600;this.scene=new A.Scene,this.scene.background=new A.Color(2066),this.camera=new A.PerspectiveCamera(50,e/t,1,1e3),this.camera.position.set(0,0,this.config.initialView==="flat"?350:150),this.renderer=new A.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement),this.controls=new ro(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.minDistance=10,this.controls.maxDistance=400;try{this.choropleth=new ht(this.config.topology,this.config.onLoadProgress,()=>{this.material&&this.material.uniforms.uDataTexture.value&&(this.material.uniforms.uDataTexture.value.needsUpdate=!0,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value===0&&K.to(this.material.uniforms.uDataOpacity,{value:.7,duration:1}))}),this.config.showLegend&&(this.legend=new Xo(this.container)),await this.createGlobe(),this.createStars(),this.config.effects.atmosphere&&this.createAtmosphere(),this.countryLabels=new Do(this.container,ee),this.scene.add(this.countryLabels.getGroup()),this.globe&&this.countryLabels.setGlobe(this.globe),this.countryLabels.setCamera(this.camera),this.countryLabels.setStyle(this.config.labels),this.exporter=new Zo(this.renderer,this.scene,this.camera),this.legend&&this.exporter.setLegendElement(this.legend.getElement()),this.countryLabels&&this.exporter.setCountryLabels(this.countryLabels),this.config.showControls&&this.createGUI(),this.setupInteraction(),await this.choropleth.waitForLoad(),this.setStatistic(this.config.statistic)}catch(i){console.error("GlobeViz init failed:",i)}this.morph=this.config.initialView==="globe"?1:0,this.material&&(this.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),window.addEventListener("resize",this.handleResize),document.addEventListener("fullscreenchange",this.handleFullscreenChange),this.renderer.domElement.tabIndex=0,this.renderer.domElement.style.outline="none",this.renderer.domElement.addEventListener("mousedown",()=>{this.renderer.domElement.focus()}),this.renderer.domElement.addEventListener("keydown",this.handleKeydown),this.animate(),this.resolveReady()}handleKeydown=e=>{this.isDestroyed||document.activeElement===this.renderer.domElement&&((e.key==="g"||e.key==="G")&&(this.morph>.5?this.toFlat():this.toGlobe()),(e.key==="f"||e.key==="F")&&this.toggleFullscreen())};async createGlobe(){const e=await this.textureLoader.loadAsync(Tr[this.config.texture]);e.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),e.minFilter=A.LinearMipmapLinearFilter,e.magFilter=A.LinearFilter;const t=document.createElement("canvas");t.width=2048,t.height=1024,this.dataTexture=new A.CanvasTexture(t);const i=new A.PlaneGeometry(Math.PI*2*ee,Math.PI*ee,256,128);this.material=new A.ShaderMaterial({vertexShader:qo,fragmentShader:Qo,uniforms:{uMorph:{value:0},uTime:{value:0},uParchment:{value:0},uExtremeParchment:{value:0},uTransitionEffect:{value:0},uTexture:{value:e},uDataTexture:{value:this.dataTexture},uCloudTexture:{value:null},uNightTexture:{value:null},uDataOpacity:{value:0},uDataOverlay:{value:0},uExtrudeHeight:{value:this.config.extrudeHeight?1:0},uSunDir:{value:new A.Vector3(1,.5,1).normalize()},uClouds:{value:this.config.effects.clouds?1:0},uCloudSpeed:{value:this.config.effects.cloudSpeed||1},uCloudOpacity:{value:this.config.effects.cloudOpacity||.6},uAtmosphereIntensity:{value:this.config.effects.atmosphereIntensity||0},uAurora:{value:this.config.effects.aurora?1:0},uAuroraIntensity:{value:1},uCityLights:{value:this.config.effects.cityLights?1:0},uCityLightsIntensity:{value:1},uOceanSpecular:{value:this.config.effects.oceanSpecular?1:0},uSpecularIntensity:{value:1},uSunGlow:{value:0},uGridLines:{value:this.config.effects.gridLines?1:0},uGridOpacity:{value:this.config.effects.gridOpacity||.5},uScanEffect:{value:0},uScanSpeed:{value:1},uHologram:{value:this.config.effects.hologramMode?1:0},uHologramColor:{value:new A.Color(65535)},uVintage:{value:this.config.effects.vintageMode?1:0},uThermal:{value:this.config.effects.thermalMode?1:0},uBlueprint:{value:this.config.effects.blueprintMode?1:0},uGlowPulse:{value:this.config.effects.glowPulse?1:0},uGlowColor:{value:new A.Color(4491519)}},side:A.DoubleSide}),this.globe=new A.Mesh(i,this.material),this.scene.add(this.globe)}createAtmosphere(){const e=new A.PlaneGeometry(Math.PI*2*ee*1.15,Math.PI*ee*1.15,128,64),t=new A.ShaderMaterial({vertexShader:Jo,fragmentShader:ea,uniforms:{uMorph:{value:0},uOpacity:{value:1}},side:A.BackSide,transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.atmosphere=new A.Mesh(e,t),this.scene.add(this.atmosphere)}createStars(){const t=new A.BufferGeometry,i=new Float32Array(3e3*3),n=new Float32Array(3e3),r=new Float32Array(3e3);for(let a=0;a<3e3;a++){const l=300+Math.random()*300,h=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);i[a*3]=l*Math.sin(c)*Math.cos(h),i[a*3+1]=l*Math.sin(c)*Math.sin(h),i[a*3+2]=l*Math.cos(c),n[a]=.5+Math.random()*1.5,r[a]=Math.random()*Math.PI*2}t.setAttribute("position",new A.BufferAttribute(i,3)),t.setAttribute("aSize",new A.BufferAttribute(n,1)),t.setAttribute("aPhase",new A.BufferAttribute(r,1));const s=new A.ShaderMaterial({vertexShader:ta,fragmentShader:ia,uniforms:{uTime:{value:0},uTwinkle:{value:this.config.effects.starTwinkle?1:0},uOpacity:{value:1}},transparent:!0,blending:A.AdditiveBlending,depthWrite:!1});this.stars=new A.Points(t,s),this.scene.add(this.stars)}createGUI(){getComputedStyle(this.container).position==="static"&&(this.container.style.position="relative"),this.gui=new zi({container:this.container,title:"⚙ Controls",width:220,closeFolders:!0});const t=this.gui.domElement;t.style.position="absolute",t.style.top="8px",t.style.right="8px",t.style.zIndex="100",this.gui.close();const i=this.gui.addFolder("View");i.add({toGlobe:()=>this.toGlobe()},"toGlobe").name("→ Globe"),i.add({toFlat:()=>this.toFlat()},"toFlat").name("→ Flat"),i.add({morph:this.morph},"morph",0,1).name("Morph").onChange(l=>this.setMorph(l));const n=this.gui.addFolder("Statistics"),r=Object.keys(Wt);n.add({stat:this.config.statistic},"stat",r).name("Statistic").onChange(l=>this.setStatistic(l));const s=["none","minimal","major","all"];this.gui.addFolder("Display").add({labels:this.config.labels},"labels",s).name("Labels").onChange(l=>this.setLabels(l)),this.gui.add(this.config,"autoRotate").name("Auto Rotate"),this.gui.addFolder("Export").add({screenshot:()=>this.screenshot({width:1920,height:1080})},"screenshot").name("📷 Screenshot")}handleResize=()=>{if(this.isDestroyed)return;const e=this.config.width||this.container.clientWidth,t=this.config.height||this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.countryLabels?.resize(e,t)};handleFullscreenChange=()=>{this.isDestroyed||setTimeout(()=>this.handleResize(),50)};animate=()=>{if(this.isDestroyed)return;this.animationId=requestAnimationFrame(this.animate);const e=performance.now()*.001;this.material&&(this.material.uniforms.uTime.value=e),this.stars&&(this.stars.material.uniforms.uTime.value=e),this.controls.update(),this.config.autoRotate&&this.globe&&(this.globe.rotation.y+=.002*this.morph),this.countryLabels?.update(),this.markerLayer?.update(e),this.renderer.render(this.scene,this.camera),this.countryLabels?.render(this.scene,this.camera)};toGlobe(){this.controls.enableRotate=!0,this.controls.minAzimuthAngle=-1/0,this.controls.maxAzimuthAngle=1/0,this.controls.minPolarAngle=0,this.controls.maxPolarAngle=Math.PI,this.controls.screenSpacePanning=!1,this.controls.mouseButtons={LEFT:A.MOUSE.ROTATE,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.PAN};let e=0;const t=this.choropleth?.getBounds();if(t){const[i,n,r,s]=t;e=-((i+r)/2)*(Math.PI/180)}K.to(this,{morph:1,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("globe",this.morph)}}),K.to(this.camera.position,{x:0,y:0,z:200,duration:2.5,ease:"power2.inOut"}),K.to(this.controls.target,{x:0,y:0,z:0,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.controls.update()}}),this.globe&&K.to(this.globe.rotation,{y:e,x:0,z:0,duration:2.5,ease:"power2.inOut"}),this.stars&&K.to(this.stars.material.uniforms.uOpacity,{value:1,duration:1}),this.atmosphere&&K.to(this.atmosphere.material.uniforms.uOpacity,{value:1,duration:1})}toFlat(){const e=this.choropleth?.getBounds(),t=Math.PI*2*ee,i=Math.PI*ee;let n=0,r=0,s=t,a=i;if(e){const[g,p,d,m]=e,_=g/180*(t/2),y=d/180*(t/2),x=p/90*(i/2),b=m/90*(i/2);n=(_+y)/2,r=(x+b)/2,s=(y-_)*1.2,a=(b-x)*1.2}const l=this.camera.fov*Math.PI/180,h=this.camera.aspect,c=a/2/Math.tan(l/2),u=s/(2*Math.tan(l/2)*h),f=Math.max(c,u);this.controls.enabled=!1,K.to(this,{morph:0,duration:2,ease:"power3.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph),this.config.onViewChange?.("flat",this.morph)},onComplete:()=>{this.controls.enabled=!0,this.controls.enableRotate=!1,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.minAzimuthAngle=0,this.controls.maxAzimuthAngle=0,this.controls.minPolarAngle=Math.PI/2,this.controls.maxPolarAngle=Math.PI/2,this.controls.target.set(n,r,0),this.controls.update()}}),this.globe&&K.to(this.globe.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),this.atmosphere&&K.to(this.atmosphere.rotation,{x:0,y:0,z:0,duration:2,ease:"power3.inOut"}),K.to(this.camera.position,{x:n,y:r,z:f,duration:2,ease:"power3.inOut"}),K.to(this.controls.target,{x:n,y:r,z:0,duration:2,ease:"power3.inOut"}),K.to(this.camera.up,{x:0,y:1,z:0,duration:2,ease:"power3.inOut"}),this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:A.MOUSE.PAN,MIDDLE:A.MOUSE.DOLLY,RIGHT:A.MOUSE.ROTATE},this.stars&&K.to(this.stars.material.uniforms.uOpacity,{value:0,duration:1}),this.atmosphere&&K.to(this.atmosphere.material.uniforms.uOpacity,{value:0,duration:1})}setupInteraction(){const e=new A.Raycaster,t=new A.Vector2,i=new A.Plane(new A.Vector3(0,0,1),0),n=new A.Vector3;let r=!1,s=new Date().getTime();this.renderer.domElement.addEventListener("mousedown",()=>{r=!1,s=new Date().getTime()}),this.renderer.domElement.addEventListener("mousemove",()=>{r=!0}),this.renderer.domElement.addEventListener("click",a=>{if(r&&new Date().getTime()-s>200)return;const l=this.renderer.domElement.getBoundingClientRect();if(t.x=(a.clientX-l.left)/l.width*2-1,t.y=-((a.clientY-l.top)/l.height)*2+1,this.morph<.1&&(e.setFromCamera(t,this.camera),e.ray.intersectPlane(i,n),n)){const h=Math.PI*ee,c=Math.PI*ee/2;Math.abs(n.x)<=h&&Math.abs(n.y)<=c&&(K.to(this.controls.target,{x:n.x,y:n.y,z:0,duration:1.5,ease:"power2.inOut"}),K.to(this.camera.position,{x:n.x,y:n.y,z:50,duration:1.5,ease:"power2.inOut"}))}}),this.renderer.domElement.addEventListener("dblclick",()=>{this.morph<.1&&this.toFlat()})}setMorph(e){this.morph=Math.max(0,Math.min(1,e)),this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.markerLayer?.setMorph(this.morph)}getMorph(){return this.morph}setStatistic(e){if(typeof e=="string"){if(!Wt[e]){console.warn(`Unknown statistic: ${e}`);return}this.currentStatistic=e;const i=yo.find(n=>n.id===e);if(i&&this.choropleth){const n=this.choropleth.renderTexture(i);if(this.material&&n){const r=new A.CanvasTexture(n);r.needsUpdate=!0,this.material.uniforms.uDataTexture.value=r,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}this.legend&&i&&this.legend.show(i)}else{const t=e;if(this.currentStatistic=t.definition.id,this.choropleth){const i=this.choropleth.renderCustomTexture(t.values,t.definition.colorScale,t.definition.domain);if(this.material&&i){const n=new A.CanvasTexture(i);n.needsUpdate=!0,this.material.uniforms.uDataTexture.value=n,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}this.legend&&this.legend.show(t.definition)}}setLabels(e){this.countryLabels?.setStyle(e)}async setTexture(e){const t=Tr[e];if(!(!t||!this.material))try{const i=await this.textureLoader.loadAsync(t);i.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),i.minFilter=A.LinearMipmapLinearFilter,i.magFilter=A.LinearFilter,this.material.uniforms.uTexture.value=i}catch(i){console.error("Failed to load texture:",e,i)}}setAutoRotate(e){this.config.autoRotate=e}screenshot(e){this.exporter?.screenshot(e)}async recordGif(e){if(!this.exporter)return;const t=e?.duration||5,i=e?.fps||20,n=t*i;this.exporter.startGifCapture(e);for(let r=0;r<n;r++)this.exporter.captureGifFrame(),await new Promise(s=>setTimeout(s,1e3/i))}async recordVideo(e){if(!this.exporter)return;const t=e?.duration||5;await this.exporter.startVideoRecording(e),await new Promise(i=>setTimeout(i,t*1e3)),this.exporter.stopVideoRecording()}setEffects(e){Object.assign(this.config.effects,e),this.material&&(e.atmosphere!==void 0&&(e.atmosphere&&!this.atmosphere?this.createAtmosphere():!e.atmosphere&&this.atmosphere&&(this.scene.remove(this.atmosphere),this.atmosphere.geometry.dispose(),this.atmosphere.material.dispose(),this.atmosphere=null)),e.clouds!==void 0&&(this.material.uniforms.uClouds.value=e.clouds?1:0),e.cloudSpeed!==void 0&&(this.material.uniforms.uCloudSpeed.value=e.cloudSpeed),e.cloudOpacity!==void 0&&(this.material.uniforms.uCloudOpacity.value=e.cloudOpacity),e.atmosphereIntensity!==void 0&&(this.material.uniforms.uAtmosphereIntensity.value=e.atmosphereIntensity),e.gridLines!==void 0&&(this.material.uniforms.uGridLines.value=e.gridLines?1:0),e.gridOpacity!==void 0&&(this.material.uniforms.uGridOpacity.value=e.gridOpacity),e.glowPulse!==void 0&&(this.material.uniforms.uGlowPulse.value=e.glowPulse?1:0),e.starTwinkle!==void 0&&this.stars&&(this.stars.material.uniforms.uTwinkle.value=e.starTwinkle?1:0))}setMarkers(e,t){this.markerLayer?t&&this.markerLayer.setConfig(t):(this.markerLayer=new oa(t),this.scene.add(this.markerLayer.getGroup()),this.markerLayer.setMorph(this.morph)),this.markerLayer.setMarkers(e)}resize(e,t){this.config.width=e,this.config.height=t,this.handleResize()}async toggleFullscreen(){document.fullscreenElement?(await document.exitFullscreen(),setTimeout(()=>this.handleResize(),100)):(await this.container.requestFullscreen(),setTimeout(()=>this.handleResize(),100))}isFullscreen(){return document.fullscreenElement===this.container}destroy(){this.isDestroyed=!0,this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.handleResize),window.removeEventListener("keydown",this.handleKeydown),document.removeEventListener("fullscreenchange",this.handleFullscreenChange),this.gui?.destroy(),this.legend?.dispose(),this.countryLabels?.dispose(),this.markerLayer?.dispose(),this.globe?.geometry.dispose(),this.globe?.material?.dispose(),this.atmosphere?.geometry.dispose(),this.atmosphere?.material?.dispose(),this.stars?.geometry.dispose(),this.stars?.material?.dispose(),this.renderer.dispose(),this.container.removeChild(this.renderer.domElement)}}le.BUILT_IN_STATISTICS=Wt,le.GlobeViz=aa,le.WORLD_STATISTICS=$i,le.createFormatter=Hi,le.formatValue=Wo,le.normalizeCountryValues=fr,le.toNumericCode=Vi,Object.defineProperty(le,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=gralobe.umd.cjs.map
