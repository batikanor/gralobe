import * as A from "three";
import { OrbitControls as _n } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer as xn, CSS2DObject as Fi } from "three/examples/jsm/renderers/CSS2DRenderer.js";
function be(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function hr(o, e) {
  o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.__proto__ = e;
}
var oe = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Qe = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, mi, W, U, he = 1e8, O = 1 / he, Jt = Math.PI * 2, bn = Jt / 4, vn = 0, dr = Math.sqrt, En = Math.cos, wn = Math.sin, Y = function(e) {
  return typeof e == "string";
}, B = function(e) {
  return typeof e == "function";
}, Ee = function(e) {
  return typeof e == "number";
}, gi = function(e) {
  return typeof e > "u";
}, _e = function(e) {
  return typeof e == "object";
}, Q = function(e) {
  return e !== !1;
}, yi = function() {
  return typeof window < "u";
}, wt = function(e) {
  return B(e) || Y(e);
}, pr = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Z = Array.isArray, Qt = /(?:-?\.?\d|\.)+/gi, fr = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, We = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Bt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, mr = /[+-]=-?[.\d]+/, gr = /[^,'"\[\]\s]+/gi, Cn = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, z, fe, ei, _i, le = {}, Lt = {}, yr, _r = function(e) {
  return (Lt = et(e, le)) && re;
}, xi = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, ft = function(e, t) {
  return !t && console.warn(e);
}, xr = function(e, t) {
  return e && (le[e] = t) && Lt && (Lt[e] = t) || le;
}, mt = function() {
  return 0;
}, Pn = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, St = {
  suppressEvents: !0,
  kill: !1
}, An = {
  suppressEvents: !0
}, bi = {}, Te = [], ti = {}, br, ne = {}, Gt = {}, Ui = 30, Tt = [], vi = "", Ei = function(e) {
  var t = e[0], i, r;
  if (_e(t) || B(t) || (e = [e]), !(i = (t._gsap || {}).harness)) {
    for (r = Tt.length; r-- && !Tt[r].targetTest(t); )
      ;
    i = Tt[r];
  }
  for (r = e.length; r--; )
    e[r] && (e[r]._gsap || (e[r]._gsap = new Hr(e[r], i))) || e.splice(r, 1);
  return e;
}, $e = function(e) {
  return e._gsap || Ei(de(e))[0]._gsap;
}, vr = function(e, t, i) {
  return (i = e[t]) && B(i) ? e[t]() : gi(i) && e.getAttribute && e.getAttribute(t) || i;
}, ee = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, G = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, H = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, qe = function(e, t) {
  var i = t.charAt(0), r = parseFloat(t.substr(2));
  return e = parseFloat(e), i === "+" ? e + r : i === "-" ? e - r : i === "*" ? e * r : e / r;
}, Sn = function(e, t) {
  for (var i = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Rt = function() {
  var e = Te.length, t = Te.slice(0), i, r;
  for (ti = {}, Te.length = 0, i = 0; i < e; i++)
    r = t[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, wi = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, Er = function(e, t, i, r) {
  Te.length && !W && Rt(), e.render(t, i, !!(W && t < 0 && wi(e))), Te.length && !W && Rt();
}, wr = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(gr).length < 2 ? t : Y(e) ? e.trim() : e;
}, Cr = function(e) {
  return e;
}, ce = function(e, t) {
  for (var i in t)
    i in e || (e[i] = t[i]);
  return e;
}, Tn = function(e) {
  return function(t, i) {
    for (var r in i)
      r in t || r === "duration" && e || r === "ease" || (t[r] = i[r]);
  };
}, et = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, zi = function o(e, t) {
  for (var i in t)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = _e(t[i]) ? o(e[i] || (e[i] = {}), t[i]) : t[i]);
  return e;
}, It = function(e, t) {
  var i = {}, r;
  for (r in e)
    r in t || (i[r] = e[r]);
  return i;
}, ht = function(e) {
  var t = e.parent || z, i = e.keyframes ? Tn(Z(e.keyframes)) : ce;
  if (Q(e.inherit))
    for (; t; )
      i(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, Mn = function(e, t) {
  for (var i = e.length, r = i === t.length; r && i-- && e[i] === t[i]; )
    ;
  return i < 0;
}, Pr = function(e, t, i, r, n) {
  var s = e[r], a;
  if (n)
    for (a = t[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (t._next = s._next, s._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = s, t.parent = t._dp = e, t;
}, zt = function(e, t, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = t._prev, s = t._next;
  n ? n._next = s : e[i] === t && (e[i] = s), s ? s._prev = n : e[r] === t && (e[r] = n), t._next = t._prev = t.parent = null;
}, De = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Be = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var i = e; i; )
      i._dirty = 1, i = i.parent;
  return e;
}, Dn = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, ii = function(e, t, i, r) {
  return e._startAt && (W ? e._startAt.revert(St) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
}, Ln = function o(e) {
  return !e || e._ts && o(e.parent);
}, Ni = function(e) {
  return e._repeat ? tt(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, tt = function(e, t) {
  var i = Math.floor(e = H(e / t));
  return e && i === e ? i - 1 : i;
}, Ot = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Nt = function(e) {
  return e._end = H(e._start + (e._tDur / Math.abs(e._ts || e._rts || O) || 0));
}, $t = function(e, t) {
  var i = e._dp;
  return i && i.smoothChildTiming && e._ts && (e._start = H(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Nt(e), i._dirty || Be(i, e)), e;
}, Ar = function(e, t) {
  var i;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = Ot(e.rawTime(), t), (!t._dur || Et(0, t.totalDuration(), i) - t._tTime > O) && t.render(i, !0)), Be(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (i = e; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    e._zTime = -O;
  }
}, me = function(e, t, i, r) {
  return t.parent && De(t), t._start = H((Ee(i) ? i : i || e !== z ? ue(e, i, t) : e._time) + t._delay), t._end = H(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Pr(e, t, "_first", "_last", e._sort ? "_start" : 0), ri(t) || (e._recent = t), r || Ar(e, t), e._ts < 0 && $t(e, e._tTime), e;
}, Sr = function(e, t) {
  return (le.ScrollTrigger || xi("scrollTrigger", t)) && le.ScrollTrigger.create(t, e);
}, Tr = function(e, t, i, r, n) {
  if (Pi(e, t, n), !e._initted)
    return 1;
  if (!i && e._pt && !W && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && br !== se.frame)
    return Te.push(e), e._lazy = [n, r], 1;
}, Rn = function o(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || o(t));
}, ri = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, In = function(e, t, i, r) {
  var n = e.ratio, s = t < 0 || !t && (!e._start && Rn(e) && !(!e._initted && ri(e)) || (e._ts < 0 || e._dp._ts < 0) && !ri(e)) ? 0 : 1, a = e._rDelay, l = 0, c, u, h;
  if (a && e._repeat && (l = Et(0, e._tDur, t), u = tt(l, a), e._yoyo && u & 1 && (s = 1 - s), u !== tt(e._tTime, a) && (n = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), s !== n || W || r || e._zTime === O || !t && e._zTime) {
    if (!e._initted && Tr(e, t, r, i, l))
      return;
    for (h = e._zTime, e._zTime = t || (i ? O : 0), i || (i = t && !h), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(s, c.d), c = c._next;
    t < 0 && ii(e, t, i, !0), e._onUpdate && !i && ae(e, "onUpdate"), l && e._repeat && !i && e.parent && ae(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === s && (s && De(e, 1), !i && !W && (ae(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, On = function(e, t, i) {
  var r;
  if (i > t)
    for (r = e._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > t)
        return r;
      r = r._next;
    }
  else
    for (r = e._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < t)
        return r;
      r = r._prev;
    }
}, it = function(e, t, i, r) {
  var n = e._repeat, s = H(t) || 0, a = e._tTime / e._tDur;
  return a && !r && (e._time *= s / e._dur), e._dur = s, e._tDur = n ? n < 0 ? 1e10 : H(s * (n + 1) + e._rDelay * n) : s, a > 0 && !r && $t(e, e._tTime = e._tDur * a), e.parent && Nt(e), i || Be(e.parent, e), e;
}, $i = function(e) {
  return e instanceof K ? Be(e) : it(e, e._dur);
}, kn = {
  _start: 0,
  endTime: mt,
  totalDuration: mt
}, ue = function o(e, t, i) {
  var r = e.labels, n = e._recent || kn, s = e.duration() >= he ? n.endTime(!1) : e._dur, a, l, c;
  return Y(t) && (isNaN(t) || t in r) ? (l = t.charAt(0), c = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (t in r || (r[t] = s), r[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), c && i && (l = l / 100 * (Z(i) ? i[0] : i).totalDuration()), a > 1 ? o(e, t.substr(0, a - 1), i) + l : s + l)) : t == null ? s : +t;
}, dt = function(e, t, i) {
  var r = Ee(t[1]), n = (r ? 2 : 1) + (e < 2 ? 0 : 1), s = t[n], a, l;
  if (r && (s.duration = t[1]), s.parent = i, e) {
    for (a = s, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = Q(l.vars.inherit) && l.parent;
    s.immediateRender = Q(a.immediateRender), e < 2 ? s.runBackwards = 1 : s.startAt = t[n - 1];
  }
  return new V(t[0], s, t[n + 1]);
}, Re = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Et = function(e, t, i) {
  return i < e ? e : i > t ? t : i;
}, X = function(e, t) {
  return !Y(e) || !(t = Cn.exec(e)) ? "" : t[1];
}, Fn = function(e, t, i) {
  return Re(i, function(r) {
    return Et(e, t, r);
  });
}, ni = [].slice, Mr = function(e, t) {
  return e && _e(e) && "length" in e && (!t && !e.length || e.length - 1 in e && _e(e[0])) && !e.nodeType && e !== fe;
}, Un = function(e, t, i) {
  return i === void 0 && (i = []), e.forEach(function(r) {
    var n;
    return Y(r) && !t || Mr(r, 1) ? (n = i).push.apply(n, de(r)) : i.push(r);
  }) || i;
}, de = function(e, t, i) {
  return U && !t && U.selector ? U.selector(e) : Y(e) && !i && (ei || !rt()) ? ni.call((t || _i).querySelectorAll(e), 0) : Z(e) ? Un(e, i) : Mr(e) ? ni.call(e, 0) : e ? [e] : [];
}, si = function(e) {
  return e = de(e)[0] || ft("Invalid scope") || {}, function(t) {
    var i = e.current || e.nativeElement || e;
    return de(t, i.querySelectorAll ? i : i === e ? ft("Invalid scope") || _i.createElement("div") : e);
  };
}, Dr = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Lr = function(e) {
  if (B(e))
    return e;
  var t = _e(e) ? e : {
    each: e
  }, i = Ge(t.ease), r = t.from || 0, n = parseFloat(t.base) || 0, s = {}, a = r > 0 && r < 1, l = isNaN(r) || a, c = t.axis, u = r, h = r;
  return Y(r) ? u = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && l && (u = r[0], h = r[1]), function(p, f, m) {
    var d = (m || t).length, g = s[d], y, _, x, v, b, C, E, P, w;
    if (!g) {
      if (w = t.grid === "auto" ? 0 : (t.grid || [1, he])[1], !w) {
        for (E = -he; E < (E = m[w++].getBoundingClientRect().left) && w < d; )
          ;
        w < d && w--;
      }
      for (g = s[d] = [], y = l ? Math.min(w, d) * u - 0.5 : r % w, _ = w === he ? 0 : l ? d * h / w - 0.5 : r / w | 0, E = 0, P = he, C = 0; C < d; C++)
        x = C % w - y, v = _ - (C / w | 0), g[C] = b = c ? Math.abs(c === "y" ? v : x) : dr(x * x + v * v), b > E && (E = b), b < P && (P = b);
      r === "random" && Dr(g), g.max = E - P, g.min = P, g.v = d = (parseFloat(t.amount) || parseFloat(t.each) * (w > d ? d - 1 : c ? c === "y" ? d / w : w : Math.max(w, d / w)) || 0) * (r === "edges" ? -1 : 1), g.b = d < 0 ? n - d : n, g.u = X(t.amount || t.each) || 0, i = i && d < 0 ? Br(i) : i;
    }
    return d = (g[p] - g.min) / g.max || 0, H(g.b + (i ? i(d) : d) * g.v) + g.u;
  };
}, ai = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(i) {
    var r = H(Math.round(parseFloat(i) / e) * e * t);
    return (r - r % 1) / t + (Ee(i) ? 0 : X(i));
  };
}, Rr = function(e, t) {
  var i = Z(e), r, n;
  return !i && _e(e) && (r = i = e.radius || he, e.values ? (e = de(e.values), (n = !Ee(e[0])) && (r *= r)) : e = ai(e.increment)), Re(t, i ? B(e) ? function(s) {
    return n = e(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), c = he, u = 0, h = e.length, p, f; h--; )
      n ? (p = e[h].x - a, f = e[h].y - l, p = p * p + f * f) : p = Math.abs(e[h] - a), p < c && (c = p, u = h);
    return u = !r || c <= r ? e[u] : s, n || u === s || Ee(s) ? u : u + X(s);
  } : ai(e));
}, Ir = function(e, t, i, r) {
  return Re(Z(e) ? !t : i === !0 ? !!(i = 0) : !r, function() {
    return Z(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * 0.99)) / i) * i * r) / r;
  });
}, zn = function() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return function(r) {
    return t.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, Nn = function(e, t) {
  return function(i) {
    return e(parseFloat(i)) + (t || X(i));
  };
}, $n = function(e, t, i) {
  return kr(e, t, 0, 1, i);
}, Or = function(e, t, i) {
  return Re(i, function(r) {
    return e[~~t(r)];
  });
}, Bn = function o(e, t, i) {
  var r = t - e;
  return Z(e) ? Or(e, o(0, e.length), t) : Re(i, function(n) {
    return (r + (n - e) % r) % r + e;
  });
}, Gn = function o(e, t, i) {
  var r = t - e, n = r * 2;
  return Z(e) ? Or(e, o(0, e.length - 1), t) : Re(i, function(s) {
    return s = (n + (s - e) % n) % n || 0, e + (s > r ? n - s : s);
  });
}, gt = function(e) {
  for (var t = 0, i = "", r, n, s, a; ~(r = e.indexOf("random(", t)); )
    s = e.indexOf(")", r), a = e.charAt(r + 7) === "[", n = e.substr(r + 7, s - r - 7).match(a ? gr : Qt), i += e.substr(t, r - t) + Ir(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), t = s + 1;
  return i + e.substr(t, e.length - t);
}, kr = function(e, t, i, r, n) {
  var s = t - e, a = r - i;
  return Re(n, function(l) {
    return i + ((l - e) / s * a || 0);
  });
}, Vn = function o(e, t, i, r) {
  var n = isNaN(e + t) ? 0 : function(f) {
    return (1 - f) * e + f * t;
  };
  if (!n) {
    var s = Y(e), a = {}, l, c, u, h, p;
    if (i === !0 && (r = 1) && (i = null), s)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (Z(e) && !Z(t)) {
      for (u = [], h = e.length, p = h - 2, c = 1; c < h; c++)
        u.push(o(e[c - 1], e[c]));
      h--, n = function(m) {
        m *= h;
        var d = Math.min(p, ~~m);
        return u[d](m - d);
      }, i = t;
    } else r || (e = et(Z(e) ? [] : {}, e));
    if (!u) {
      for (l in t)
        Ci.call(a, e, l, "get", t[l]);
      n = function(m) {
        return Ti(m, a) || (s ? e.p : e);
      };
    }
  }
  return Re(i, n);
}, Bi = function(e, t, i) {
  var r = e.labels, n = he, s, a, l;
  for (s in r)
    a = r[s] - t, a < 0 == !!i && a && n > (a = Math.abs(a)) && (l = s, n = a);
  return l;
}, ae = function(e, t, i) {
  var r = e.vars, n = r[t], s = U, a = e._ctx, l, c, u;
  if (n)
    return l = r[t + "Params"], c = r.callbackScope || e, i && Te.length && Rt(), a && (U = a), u = l ? n.apply(c, l) : n.call(c), U = s, u;
}, ct = function(e) {
  return De(e), e.scrollTrigger && e.scrollTrigger.kill(!!W), e.progress() < 1 && ae(e, "onInterrupt"), e;
}, Xe, Fr = [], Ur = function(e) {
  if (e)
    if (e = !e.name && e.default || e, yi() || e.headless) {
      var t = e.name, i = B(e), r = t && !i && e.init ? function() {
        this._props = [];
      } : e, n = {
        init: mt,
        render: Ti,
        add: Ci,
        kill: ss,
        modifier: ns,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Si,
        aliases: {},
        register: 0
      };
      if (rt(), e !== r) {
        if (ne[t])
          return;
        ce(r, ce(It(e, n), s)), et(r.prototype, et(n, It(e, s))), ne[r.prop = t] = r, e.targetTest && (Tt.push(r), bi[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      xr(t, r), e.register && e.register(re, r, te);
    } else
      Fr.push(e);
}, I = 255, ut = {
  aqua: [0, I, I],
  lime: [0, I, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, I],
  navy: [0, 0, 128],
  white: [I, I, I],
  olive: [128, 128, 0],
  yellow: [I, I, 0],
  orange: [I, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [I, 0, 0],
  pink: [I, 192, 203],
  cyan: [0, I, I],
  transparent: [I, I, I, 0]
}, Vt = function(e, t, i) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (i - t) * e * 6 : e < 0.5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * I + 0.5 | 0;
}, zr = function(e, t, i) {
  var r = e ? Ee(e) ? [e >> 16, e >> 8 & I, e & I] : 0 : ut.black, n, s, a, l, c, u, h, p, f, m;
  if (!r) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), ut[e])
      r = ut[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (n = e.charAt(1), s = e.charAt(2), a = e.charAt(3), e = "#" + n + n + s + s + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return r = parseInt(e.substr(1, 6), 16), [r >> 16, r >> 8 & I, r & I, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), r = [e >> 16, e >> 8 & I, e & I];
    } else if (e.substr(0, 3) === "hsl") {
      if (r = m = e.match(Qt), !t)
        l = +r[0] % 360 / 360, c = +r[1] / 100, u = +r[2] / 100, s = u <= 0.5 ? u * (c + 1) : u + c - u * c, n = u * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Vt(l + 1 / 3, n, s), r[1] = Vt(l, n, s), r[2] = Vt(l - 1 / 3, n, s);
      else if (~e.indexOf("="))
        return r = e.match(fr), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = e.match(Qt) || ut.transparent;
    r = r.map(Number);
  }
  return t && !m && (n = r[0] / I, s = r[1] / I, a = r[2] / I, h = Math.max(n, s, a), p = Math.min(n, s, a), u = (h + p) / 2, h === p ? l = c = 0 : (f = h - p, c = u > 0.5 ? f / (2 - h - p) : f / (h + p), l = h === n ? (s - a) / f + (s < a ? 6 : 0) : h === s ? (a - n) / f + 2 : (n - s) / f + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(c * 100 + 0.5), r[2] = ~~(u * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Nr = function(e) {
  var t = [], i = [], r = -1;
  return e.split(Me).forEach(function(n) {
    var s = n.match(We) || [];
    t.push.apply(t, s), i.push(r += s.length + 1);
  }), t.c = i, t;
}, Gi = function(e, t, i) {
  var r = "", n = (e + r).match(Me), s = t ? "hsla(" : "rgba(", a = 0, l, c, u, h;
  if (!n)
    return e;
  if (n = n.map(function(p) {
    return (p = zr(p, t, 1)) && s + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), i && (u = Nr(e), l = i.c, l.join(r) !== u.c.join(r)))
    for (c = e.replace(Me, "1").split(We), h = c.length - 1; a < h; a++)
      r += c[a] + (~l.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (u.length ? u : n.length ? n : i).shift());
  if (!c)
    for (c = e.split(Me), h = c.length - 1; a < h; a++)
      r += c[a] + n[a];
  return r + c[h];
}, Me = (function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in ut)
    o += "|" + e + "\\b";
  return new RegExp(o + ")", "gi");
})(), Hn = /hsl[a]?\(/, $r = function(e) {
  var t = e.join(" "), i;
  if (Me.lastIndex = 0, Me.test(t))
    return i = Hn.test(t), e[1] = Gi(e[1], i), e[0] = Gi(e[0], i, Nr(e[1])), !0;
}, yt, se = (function() {
  var o = Date.now, e = 500, t = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], l, c, u, h, p, f, m = function d(g) {
    var y = o() - r, _ = g === !0, x, v, b, C;
    if ((y > e || y < 0) && (i += y - t), r += y, b = r - i, x = b - s, (x > 0 || _) && (C = ++h.frame, p = b - h.time * 1e3, h.time = b = b / 1e3, s += x + (x >= n ? 4 : n - x), v = 1), _ || (l = c(d)), v)
      for (f = 0; f < a.length; f++)
        a[f](b, p, C, g);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(g) {
      return p / (1e3 / (g || 60));
    },
    wake: function() {
      yr && (!ei && yi() && (fe = ei = window, _i = fe.document || {}, le.gsap = re, (fe.gsapVersions || (fe.gsapVersions = [])).push(re.version), _r(Lt || fe.GreenSockGlobals || !fe.gsap && fe || {}), Fr.forEach(Ur)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && h.sleep(), c = u || function(g) {
        return setTimeout(g, s - h.time * 1e3 + 1 | 0);
      }, yt = 1, m(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(l), yt = 0, c = mt;
    },
    lagSmoothing: function(g, y) {
      e = g || 1 / 0, t = Math.min(y || 33, e);
    },
    fps: function(g) {
      n = 1e3 / (g || 240), s = h.time * 1e3 + n;
    },
    add: function(g, y, _) {
      var x = y ? function(v, b, C, E) {
        g(v, b, C, E), h.remove(x);
      } : g;
      return h.remove(g), a[_ ? "unshift" : "push"](x), rt(), x;
    },
    remove: function(g, y) {
      ~(y = a.indexOf(g)) && a.splice(y, 1) && f >= y && f--;
    },
    _listeners: a
  }, h;
})(), rt = function() {
  return !yt && se.wake();
}, M = {}, jn = /^[\d.\-M][\d.\-,\s]/, Yn = /["']/g, Wn = function(e) {
  for (var t = {}, i = e.substr(1, e.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, l, c; n < s; n++)
    l = i[n], a = n !== s - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), t[r] = isNaN(c) ? c.replace(Yn, "").trim() : +c, r = l.substr(a + 1).trim();
  return t;
}, Xn = function(e) {
  var t = e.indexOf("(") + 1, i = e.indexOf(")"), r = e.indexOf("(", t);
  return e.substring(t, ~r && r < i ? e.indexOf(")", i + 1) : i);
}, Zn = function(e) {
  var t = (e + "").split("("), i = M[t[0]];
  return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [Wn(t[1])] : Xn(e).split(",").map(wr)) : M._CE && jn.test(e) ? M._CE("", e) : i;
}, Br = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Gr = function o(e, t) {
  for (var i = e._first, r; i; )
    i instanceof K ? o(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? o(i.timeline, t) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = t)), i = i._next;
}, Ge = function(e, t) {
  return e && (B(e) ? e : M[e] || Zn(e)) || t;
}, je = function(e, t, i, r) {
  i === void 0 && (i = function(l) {
    return 1 - t(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: t,
    easeOut: i,
    easeInOut: r
  }, s;
  return ee(e, function(a) {
    M[a] = le[a] = n, M[s = a.toLowerCase()] = i;
    for (var l in n)
      M[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = M[a + "." + l] = n[l];
  }), n;
}, Vr = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Ht = function o(e, t, i) {
  var r = t >= 1 ? t : 1, n = (i || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), s = n / Jt * (Math.asin(1 / r) || 0), a = function(u) {
    return u === 1 ? 1 : r * Math.pow(2, -10 * u) * wn((u - s) * n) + 1;
  }, l = e === "out" ? a : e === "in" ? function(c) {
    return 1 - a(1 - c);
  } : Vr(a);
  return n = Jt / n, l.config = function(c, u) {
    return o(e, c, u);
  }, l;
}, jt = function o(e, t) {
  t === void 0 && (t = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((t + 1) * s + t) + 1 : 0;
  }, r = e === "out" ? i : e === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Vr(i);
  return r.config = function(n) {
    return o(e, n);
  }, r;
};
ee("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, e) {
  var t = e < 5 ? e + 1 : e;
  je(o + ",Power" + (t - 1), e ? function(i) {
    return Math.pow(i, t);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, t);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2;
  });
});
M.Linear.easeNone = M.none = M.Linear.easeIn;
je("Elastic", Ht("in"), Ht("out"), Ht());
(function(o, e) {
  var t = 1 / e, i = 2 * t, r = 2.5 * t, n = function(a) {
    return a < t ? o * a * a : a < i ? o * Math.pow(a - 1.5 / e, 2) + 0.75 : a < r ? o * (a -= 2.25 / e) * a + 0.9375 : o * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  je("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
je("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
je("Circ", function(o) {
  return -(dr(1 - o * o) - 1);
});
je("Sine", function(o) {
  return o === 1 ? 1 : -En(o * bn) + 1;
});
je("Back", jt("in"), jt("out"), jt());
M.SteppedEase = M.steps = le.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var i = 1 / e, r = e + (t ? 0 : 1), n = t ? 1 : 0, s = 1 - O;
    return function(a) {
      return ((r * Et(0, s, a) | 0) + n) * i;
    };
  }
};
Qe.ease = M["quad.out"];
ee("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return vi += o + "," + o + "Params,";
});
var Hr = function(e, t) {
  this.id = vn++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : vr, this.set = t ? t.getSetter : Si;
}, _t = /* @__PURE__ */ (function() {
  function o(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, it(this, +t.duration, 1, 1), this.data = t.data, U && (this._ctx = U, U.data.push(this)), yt || se.wake();
  }
  var e = o.prototype;
  return e.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, e.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, it(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(i, r) {
    if (rt(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for ($t(this, i), !n._dp || n.parent || Ar(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && me(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === O || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Er(this, i, r)), this;
  }, e.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ni(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, e.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ni(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? tt(this._tTime, n) + 1 : 1;
  }, e.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -O ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Ot(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -O ? 0 : this._rts, this.totalTime(Et(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Nt(this), Dn(this);
  }, e.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (rt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== O && (this._tTime -= O)))), this) : this._ps;
  }, e.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && me(r, this, i - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(i) {
    return this._start + (Q(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ot(r.rawTime(i), this) : this._tTime : this._tTime;
  }, e.revert = function(i) {
    i === void 0 && (i = An);
    var r = W;
    return W = i, wi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), W = r, this;
  }, e.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, e.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, $i(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, $i(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, e.seek = function(i, r) {
    return this.totalTime(ue(this, i), Q(r));
  }, e.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, Q(r)), this._dur || (this._zTime = -O), this;
  }, e.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, e.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, e.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -O : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -O, this;
  }, e.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - O);
  }, e.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, e.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var s = B(i) ? i : Cr, a = function() {
        var c = r.then;
        r.then = null, B(s) && (s = s(r)) && (s.then || s === r) && (r.then = c), n(s), r.then = c;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, e.kill = function() {
    ct(this);
  }, o;
})();
ce(_t.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -O,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var K = /* @__PURE__ */ (function(o) {
  hr(e, o);
  function e(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = Q(i.sortChildren), z && me(i.parent || z, be(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Sr(be(n), i.scrollTrigger), n;
  }
  var t = e.prototype;
  return t.to = function(r, n, s) {
    return dt(0, arguments, this), this;
  }, t.from = function(r, n, s) {
    return dt(1, arguments, this), this;
  }, t.fromTo = function(r, n, s, a) {
    return dt(2, arguments, this), this;
  }, t.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, ht(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new V(r, n, ue(this, s), 1), this;
  }, t.call = function(r, n, s) {
    return me(this, V.delayedCall(0, r, n), s);
  }, t.staggerTo = function(r, n, s, a, l, c, u) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = c, s.onCompleteParams = u, s.parent = this, new V(r, s, ue(this, l)), this;
  }, t.staggerFrom = function(r, n, s, a, l, c, u) {
    return s.runBackwards = 1, ht(s).immediateRender = Q(s.immediateRender), this.staggerTo(r, n, s, a, l, c, u);
  }, t.staggerFromTo = function(r, n, s, a, l, c, u, h) {
    return a.startAt = s, ht(a).immediateRender = Q(a.immediateRender), this.staggerTo(r, n, a, l, c, u, h);
  }, t.render = function(r, n, s) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, u = r <= 0 ? 0 : H(r), h = this._zTime < 0 != r < 0 && (this._initted || !c), p, f, m, d, g, y, _, x, v, b, C, E;
    if (this !== z && u > l && r >= 0 && (u = l), u !== this._tTime || s || h) {
      if (a !== this._time && c && (u += this._time - a, r += this._time - a), p = u, v = this._start, x = this._ts, y = !x, h && (c || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (C = this._yoyo, g = c + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(g * 100 + r, n, s);
        if (p = H(u % g), u === l ? (d = this._repeat, p = c) : (b = H(u / g), d = ~~b, d && d === b && (p = c, d--), p > c && (p = c)), b = tt(this._tTime, g), !a && this._tTime && b !== d && this._tTime - b * g - this._dur <= 0 && (b = d), C && d & 1 && (p = c - p, E = 1), d !== b && !this._lock) {
          var P = C && b & 1, w = P === (C && d & 1);
          if (d < b && (P = !P), a = P ? 0 : u % c ? c : u, this._lock = 1, this.render(a || (E ? 0 : H(d * g)), n, !c)._lock = 0, this._tTime = u, !n && this.parent && ae(this, "onRepeat"), this.vars.repeatRefresh && !E && (this.invalidate()._lock = 1), a && a !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, w && (this._lock = 2, a = P ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !E && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
          Gr(this, E);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (_ = On(this, H(a), H(p)), _ && (u -= p - (p = _._start))), this._tTime = u, this._time = p, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && u && !n && !b && (ae(this, "onStart"), this._tTime !== u))
        return this;
      if (p >= a && r >= 0)
        for (f = this._first; f; ) {
          if (m = f._next, (f._act || p >= f._start) && f._ts && _ !== f) {
            if (f.parent !== this)
              return this.render(r, n, s);
            if (f.render(f._ts > 0 ? (p - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (p - f._start) * f._ts, n, s), p !== this._time || !this._ts && !y) {
              _ = 0, m && (u += this._zTime = -O);
              break;
            }
          }
          f = m;
        }
      else {
        f = this._last;
        for (var T = r < 0 ? r : p; f; ) {
          if (m = f._prev, (f._act || T <= f._end) && f._ts && _ !== f) {
            if (f.parent !== this)
              return this.render(r, n, s);
            if (f.render(f._ts > 0 ? (T - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (T - f._start) * f._ts, n, s || W && wi(f)), p !== this._time || !this._ts && !y) {
              _ = 0, m && (u += this._zTime = T ? -O : O);
              break;
            }
          }
          f = m;
        }
      }
      if (_ && !n && (this.pause(), _.render(p >= a ? 0 : -O)._zTime = p >= a ? 1 : -1, this._ts))
        return this._start = v, Nt(this), this.render(r, n, s);
      this._onUpdate && !n && ae(this, "onUpdate", !0), (u === l && this._tTime >= this.totalDuration() || !u && a) && (v === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((r || !c) && (u === l && this._ts > 0 || !u && this._ts < 0) && De(this, 1), !n && !(r < 0 && !a) && (u || a || !l) && (ae(this, u === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(r, n) {
    var s = this;
    if (Ee(n) || (n = ue(this, n, r)), !(r instanceof _t)) {
      if (Z(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (Y(r))
        return this.addLabel(r, n);
      if (B(r))
        r = V.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? me(this, r, n) : this;
  }, t.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -he);
    for (var l = [], c = this._first; c; )
      c._start >= a && (c instanceof V ? n && l.push(c) : (s && l.push(c), r && l.push.apply(l, c.getChildren(!0, n, s)))), c = c._next;
    return l;
  }, t.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, t.remove = function(r) {
    return Y(r) ? this.removeLabel(r) : B(r) ? this.killTweensOf(r) : (r.parent === this && zt(this, r), r === this._recent && (this._recent = this._last), Be(this));
  }, t.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = H(se.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(r, n) {
    return this.labels[r] = ue(this, n), this;
  }, t.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, t.addPause = function(r, n, s) {
    var a = V.delayedCall(0, n || mt, s);
    return a.data = "isPause", this._hasPause = 1, me(this, a, ue(this, r));
  }, t.removePause = function(r) {
    var n = this._first;
    for (r = ue(this, r); n; )
      n._start === r && n.data === "isPause" && De(n), n = n._next;
  }, t.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), l = a.length; l--; )
      Ce !== a[l] && a[l].kill(r, n);
    return this;
  }, t.getTweensOf = function(r, n) {
    for (var s = [], a = de(r), l = this._first, c = Ee(n), u; l; )
      l instanceof V ? Sn(l._targets, a) && (c ? (!Ce || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (u = l.getTweensOf(a, n)).length && s.push.apply(s, u), l = l._next;
    return s;
  }, t.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = ue(s, r), l = n, c = l.startAt, u = l.onStart, h = l.onStartParams, p = l.immediateRender, f, m = V.to(s, ce({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (c && "time" in c ? c.time : s._time)) / s.timeScale()) || O,
      onStart: function() {
        if (s.pause(), !f) {
          var g = n.duration || Math.abs((a - (c && "time" in c ? c.time : s._time)) / s.timeScale());
          m._dur !== g && it(m, g, 0, 1).render(m._time, !0, !0), f = 1;
        }
        u && u.apply(m, h || []);
      }
    }, n));
    return p ? m.render(0) : m;
  }, t.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, ce({
      startAt: {
        time: ue(this, r)
      }
    }, s));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Bi(this, ue(this, r));
  }, t.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Bi(this, ue(this, r), 1);
  }, t.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + O);
  }, t.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (c in l)
        l[c] >= s && (l[c] += r);
    return Be(this);
  }, t.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, t.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Be(this);
  }, t.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, l = he, c, u, h;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (h = s.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), u = a._start, u > l && s._sort && a._ts && !s._lock ? (s._lock = 1, me(s, a, u - a._delay, 1)._lock = 0) : l = u, u < 0 && a._ts && (n -= u, (!h && !s._dp || h && h.smoothChildTiming) && (s._start += u / s._ts, s._time -= u, s._tTime -= u), s.shiftChildren(-u, !1, -1 / 0), l = 0), a._end > n && a._ts && (n = a._end), a = c;
      it(s, s === z && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, e.updateRoot = function(r) {
    if (z._ts && (Er(z, Ot(r, z)), br = se.frame), se.frame >= Ui) {
      Ui += oe.autoSleep || 120;
      var n = z._first;
      if ((!n || !n._ts) && oe.autoSleep && se._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || se.sleep();
      }
    }
  }, e;
})(_t);
ce(K.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var qn = function(e, t, i, r, n, s, a) {
  var l = new te(this._pt, e, t, 0, 1, qr, null, n), c = 0, u = 0, h, p, f, m, d, g, y, _;
  for (l.b = i, l.e = r, i += "", r += "", (y = ~r.indexOf("random(")) && (r = gt(r)), s && (_ = [i, r], s(_, e, t), i = _[0], r = _[1]), p = i.match(Bt) || []; h = Bt.exec(r); )
    m = h[0], d = r.substring(c, h.index), f ? f = (f + 1) % 5 : d.substr(-5) === "rgba(" && (f = 1), m !== p[u++] && (g = parseFloat(p[u - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || u === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: m.charAt(1) === "=" ? qe(g, m) - g : parseFloat(m) - g,
      m: f && f < 4 ? Math.round : 0
    }, c = Bt.lastIndex);
  return l.c = c < r.length ? r.substring(c, r.length) : "", l.fp = a, (mr.test(r) || y) && (l.e = 0), this._pt = l, l;
}, Ci = function(e, t, i, r, n, s, a, l, c, u) {
  B(r) && (r = r(n || 0, e, s));
  var h = e[t], p = i !== "get" ? i : B(h) ? c ? e[t.indexOf("set") || !B(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : h, f = B(h) ? c ? ts : Xr : Ai, m;
  if (Y(r) && (~r.indexOf("random(") && (r = gt(r)), r.charAt(1) === "=" && (m = qe(p, r) + (X(p) || 0), (m || m === 0) && (r = m))), !u || p !== r || oi)
    return !isNaN(p * r) && r !== "" ? (m = new te(this._pt, e, t, +p || 0, r - (p || 0), typeof h == "boolean" ? rs : Zr, 0, f), c && (m.fp = c), a && m.modifier(a, this, e), this._pt = m) : (!h && !(t in e) && xi(t, r), qn.call(this, e, t, p, r, f, l || oe.stringFilter, c));
}, Kn = function(e, t, i, r, n) {
  if (B(e) && (e = pt(e, n, t, i, r)), !_e(e) || e.style && e.nodeType || Z(e) || pr(e))
    return Y(e) ? pt(e, n, t, i, r) : e;
  var s = {}, a;
  for (a in e)
    s[a] = pt(e[a], n, t, i, r);
  return s;
}, jr = function(e, t, i, r, n, s) {
  var a, l, c, u;
  if (ne[e] && (a = new ne[e]()).init(n, a.rawVars ? t[e] : Kn(t[e], r, n, s, i), i, r, s) !== !1 && (i._pt = l = new te(i._pt, n, e, 0, 1, a.render, a, 0, a.priority), i !== Xe))
    for (c = i._ptLookup[i._targets.indexOf(n)], u = a._props.length; u--; )
      c[a._props[u]] = l;
  return a;
}, Ce, oi, Pi = function o(e, t, i) {
  var r = e.vars, n = r.ease, s = r.startAt, a = r.immediateRender, l = r.lazy, c = r.onUpdate, u = r.runBackwards, h = r.yoyoEase, p = r.keyframes, f = r.autoRevert, m = e._dur, d = e._startAt, g = e._targets, y = e.parent, _ = y && y.data === "nested" ? y.vars.targets : g, x = e._overwrite === "auto" && !mi, v = e.timeline, b, C, E, P, w, T, D, S, L, R, $, F, k;
  if (v && (!p || !n) && (n = "none"), e._ease = Ge(n, Qe.ease), e._yEase = h ? Br(Ge(h === !0 ? n : h, Qe.ease)) : 0, h && e._yoyo && !e._repeat && (h = e._yEase, e._yEase = e._ease, e._ease = h), e._from = !v && !!r.runBackwards, !v || p && !r.stagger) {
    if (S = g[0] ? $e(g[0]).harness : 0, F = S && r[S.prop], b = It(r, bi), d && (d._zTime < 0 && d.progress(1), t < 0 && u && a && !f ? d.render(-1, !0) : d.revert(u && m ? St : Pn), d._lazy = 0), s) {
      if (De(e._startAt = V.set(g, ce({
        data: "isStart",
        overwrite: !1,
        parent: y,
        immediateRender: !0,
        lazy: !d && Q(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return ae(e, "onUpdate");
        },
        stagger: 0
      }, s))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (W || !a && !f) && e._startAt.revert(St), a && m && t <= 0 && i <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (u && m && !d) {
      if (t && (a = !1), E = ce({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !d && Q(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, b), F && (E[S.prop] = F), De(e._startAt = V.set(g, E)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (W ? e._startAt.revert(St) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        o(e._startAt, O, O);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = m && Q(l) || l && !m, C = 0; C < g.length; C++) {
      if (w = g[C], D = w._gsap || Ei(g)[C]._gsap, e._ptLookup[C] = R = {}, ti[D.id] && Te.length && Rt(), $ = _ === g ? C : _.indexOf(w), S && (L = new S()).init(w, F || b, e, $, _) !== !1 && (e._pt = P = new te(e._pt, w, L.name, 0, 1, L.render, L, 0, L.priority), L._props.forEach(function(J) {
        R[J] = P;
      }), L.priority && (T = 1)), !S || F)
        for (E in b)
          ne[E] && (L = jr(E, b, e, $, w, _)) ? L.priority && (T = 1) : R[E] = P = Ci.call(e, w, E, "get", b[E], $, _, 0, r.stringFilter);
      e._op && e._op[C] && e.kill(w, e._op[C]), x && e._pt && (Ce = e, z.killTweensOf(w, R, e.globalTime(t)), k = !e.parent, Ce = 0), e._pt && l && (ti[D.id] = 1);
    }
    T && Kr(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !k, p && t <= 0 && v.render(he, !0, !0);
}, Jn = function(e, t, i, r, n, s, a, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], u, h, p, f;
  if (!c)
    for (c = e._ptCache[t] = [], p = e._ptLookup, f = e._targets.length; f--; ) {
      if (u = p[f][t], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== t && u.fp !== t; )
          u = u._next;
      if (!u)
        return oi = 1, e.vars[t] = "+=0", Pi(e, a), oi = 0, l ? ft(t + " not eligible for reset") : 1;
      c.push(u);
    }
  for (f = c.length; f--; )
    h = c[f], u = h._pt || h, u.s = (r || r === 0) && !n ? r : u.s + (r || 0) + s * u.c, u.c = i - u.s, h.e && (h.e = G(i) + X(h.e)), h.b && (h.b = u.s + X(h.b));
}, Qn = function(e, t) {
  var i = e[0] ? $e(e[0]).harness : 0, r = i && i.aliases, n, s, a, l;
  if (!r)
    return t;
  n = et({}, t);
  for (s in r)
    if (s in n)
      for (l = r[s].split(","), a = l.length; a--; )
        n[l[a]] = n[s];
  return n;
}, es = function(e, t, i, r) {
  var n = t.ease || r || "power1.inOut", s, a;
  if (Z(t))
    a = i[e] || (i[e] = []), t.forEach(function(l, c) {
      return a.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (s in t)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(e),
        v: t[s],
        e: n
      });
}, pt = function(e, t, i, r, n) {
  return B(e) ? e.call(t, i, r, n) : Y(e) && ~e.indexOf("random(") ? gt(e) : e;
}, Yr = vi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Wr = {};
ee(Yr + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return Wr[o] = 1;
});
var V = /* @__PURE__ */ (function(o) {
  hr(e, o);
  function e(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : ht(r)) || this;
    var l = a.vars, c = l.duration, u = l.delay, h = l.immediateRender, p = l.stagger, f = l.overwrite, m = l.keyframes, d = l.defaults, g = l.scrollTrigger, y = l.yoyoEase, _ = r.parent || z, x = (Z(i) || pr(i) ? Ee(i[0]) : "length" in r) ? [i] : de(i), v, b, C, E, P, w, T, D;
    if (a._targets = x.length ? Ei(x) : ft("GSAP target " + i + " not found. https://gsap.com", !oe.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = f, m || p || wt(c) || wt(u)) {
      if (r = a.vars, v = a.timeline = new K({
        data: "nested",
        defaults: d || {},
        targets: _ && _.data === "nested" ? _.vars.targets : x
      }), v.kill(), v.parent = v._dp = be(a), v._start = 0, p || wt(c) || wt(u)) {
        if (E = x.length, T = p && Lr(p), _e(p))
          for (P in p)
            ~Yr.indexOf(P) && (D || (D = {}), D[P] = p[P]);
        for (b = 0; b < E; b++)
          C = It(r, Wr), C.stagger = 0, y && (C.yoyoEase = y), D && et(C, D), w = x[b], C.duration = +pt(c, be(a), b, w, x), C.delay = (+pt(u, be(a), b, w, x) || 0) - a._delay, !p && E === 1 && C.delay && (a._delay = u = C.delay, a._start += u, C.delay = 0), v.to(w, C, T ? T(b, w, x) : 0), v._ease = M.none;
        v.duration() ? c = u = 0 : a.timeline = 0;
      } else if (m) {
        ht(ce(v.vars.defaults, {
          ease: "none"
        })), v._ease = Ge(m.ease || r.ease || "none");
        var S = 0, L, R, $;
        if (Z(m))
          m.forEach(function(F) {
            return v.to(x, F, ">");
          }), v.duration();
        else {
          C = {};
          for (P in m)
            P === "ease" || P === "easeEach" || es(P, m[P], C, m.easeEach);
          for (P in C)
            for (L = C[P].sort(function(F, k) {
              return F.t - k.t;
            }), S = 0, b = 0; b < L.length; b++)
              R = L[b], $ = {
                ease: R.e,
                duration: (R.t - (b ? L[b - 1].t : 0)) / 100 * c
              }, $[P] = R.v, v.to(x, $, S), S += $.duration;
          v.duration() < c && v.to({}, {
            duration: c - v.duration()
          });
        }
      }
      c || a.duration(c = v.duration());
    } else
      a.timeline = 0;
    return f === !0 && !mi && (Ce = be(a), z.killTweensOf(x), Ce = 0), me(_, be(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (h || !c && !m && a._start === H(_._time) && Q(h) && Ln(be(a)) && _.data !== "nested") && (a._tTime = -O, a.render(Math.max(0, -u) || 0)), g && Sr(be(a), g), a;
  }
  var t = e.prototype;
  return t.render = function(r, n, s) {
    var a = this._time, l = this._tDur, c = this._dur, u = r < 0, h = r > l - O && !u ? l : r < O ? 0 : r, p, f, m, d, g, y, _, x, v;
    if (!c)
      In(this, r, n, s);
    else if (h !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (p = h, x = this.timeline, this._repeat) {
        if (d = c + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(d * 100 + r, n, s);
        if (p = H(h % d), h === l ? (m = this._repeat, p = c) : (g = H(h / d), m = ~~g, m && m === g ? (p = c, m--) : p > c && (p = c)), y = this._yoyo && m & 1, y && (v = this._yEase, p = c - p), g = tt(this._tTime, d), p === a && !s && this._initted && m === g)
          return this._tTime = h, this;
        m !== g && (x && this._yEase && Gr(x, y), this.vars.repeatRefresh && !y && !this._lock && p !== d && this._initted && (this._lock = s = 1, this.render(H(d * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Tr(this, u ? r : p, s, n, h))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && m !== g))
          return this;
        if (c !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = h, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = _ = (v || this._ease)(p / c), this._from && (this.ratio = _ = 1 - _), !a && h && !n && !g && (ae(this, "onStart"), this._tTime !== h))
        return this;
      for (f = this._pt; f; )
        f.r(_, f.d), f = f._next;
      x && x.render(r < 0 ? r : x._dur * x._ease(p / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (u && ii(this, r, n, s), ae(this, "onUpdate")), this._repeat && m !== g && this.vars.onRepeat && !n && this.parent && ae(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (u && !this._onUpdate && ii(this, r, !0, !0), (r || !c) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && De(this, 1), !n && !(u && !a) && (h || a || y) && (ae(this, h === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, t.resetTo = function(r, n, s, a, l) {
    yt || se.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || Pi(this, c), u = this._ease(c / this._dur), Jn(this, r, n, s, a, u, c, l) ? this.resetTo(r, n, s, a, 1) : ($t(this, 0), this.parent || Pr(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? ct(this) : this.scrollTrigger && this.scrollTrigger.kill(!!W), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Ce && Ce.vars.overwrite !== !0)._first || ct(this), this.parent && s !== this.timeline.totalDuration() && it(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, l = r ? de(r) : a, c = this._ptLookup, u = this._pt, h, p, f, m, d, g, y;
    if ((!n || n === "all") && Mn(a, l))
      return n === "all" && (this._pt = 0), ct(this);
    for (h = this._op = this._op || [], n !== "all" && (Y(n) && (d = {}, ee(n, function(_) {
      return d[_] = 1;
    }), n = d), n = Qn(a, n)), y = a.length; y--; )
      if (~l.indexOf(a[y])) {
        p = c[y], n === "all" ? (h[y] = n, m = p, f = {}) : (f = h[y] = h[y] || {}, m = n);
        for (d in m)
          g = p && p[d], g && ((!("kill" in g.d) || g.d.kill(d) === !0) && zt(this, g, "_pt"), delete p[d]), f !== "all" && (f[d] = 1);
      }
    return this._initted && !this._pt && u && ct(this), this;
  }, e.to = function(r, n) {
    return new e(r, n, arguments[2]);
  }, e.from = function(r, n) {
    return dt(1, arguments);
  }, e.delayedCall = function(r, n, s, a) {
    return new e(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, e.fromTo = function(r, n, s) {
    return dt(2, arguments);
  }, e.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new e(r, n);
  }, e.killTweensOf = function(r, n, s) {
    return z.killTweensOf(r, n, s);
  }, e;
})(_t);
ce(V.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ee("staggerTo,staggerFrom,staggerFromTo", function(o) {
  V[o] = function() {
    var e = new K(), t = ni.call(arguments, 0);
    return t.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), e[o].apply(e, t);
  };
});
var Ai = function(e, t, i) {
  return e[t] = i;
}, Xr = function(e, t, i) {
  return e[t](i);
}, ts = function(e, t, i, r) {
  return e[t](r.fp, i);
}, is = function(e, t, i) {
  return e.setAttribute(t, i);
}, Si = function(e, t) {
  return B(e[t]) ? Xr : gi(e[t]) && e.setAttribute ? is : Ai;
}, Zr = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, rs = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, qr = function(e, t) {
  var i = t._pt, r = "";
  if (!e && t.b)
    r = t.b;
  else if (e === 1 && t.e)
    r = t.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + r, i = i._next;
    r += t.c;
  }
  t.set(t.t, t.p, r, t);
}, Ti = function(e, t) {
  for (var i = t._pt; i; )
    i.r(e, i.d), i = i._next;
}, ns = function(e, t, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(e, t, i), n = s;
}, ss = function(e) {
  for (var t = this._pt, i, r; t; )
    r = t._next, t.p === e && !t.op || t.op === e ? zt(this, t, "_pt") : t.dep || (i = 1), t = r;
  return !i;
}, as = function(e, t, i, r) {
  r.mSet(e, t, r.m.call(r.tween, i, r.mt), r);
}, Kr = function(e) {
  for (var t = e._pt, i, r, n, s; t; ) {
    for (i = t._next, r = n; r && r.pr > t.pr; )
      r = r._next;
    (t._prev = r ? r._prev : s) ? t._prev._next = t : n = t, (t._next = r) ? r._prev = t : s = t, t = i;
  }
  e._pt = n;
}, te = /* @__PURE__ */ (function() {
  function o(t, i, r, n, s, a, l, c, u) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Zr, this.d = l || this, this.set = c || Ai, this.pr = u || 0, this._next = t, t && (t._prev = this);
  }
  var e = o.prototype;
  return e.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = as, this.m = i, this.mt = n, this.tween = r;
  }, o;
})();
ee(vi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(o) {
  return bi[o] = 1;
});
le.TweenMax = le.TweenLite = V;
le.TimelineLite = le.TimelineMax = K;
z = new K({
  sortChildren: !1,
  defaults: Qe,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
oe.stringFilter = $r;
var Ve = [], Mt = {}, os = [], Vi = 0, ls = 0, Yt = function(e) {
  return (Mt[e] || os).map(function(t) {
    return t();
  });
}, li = function() {
  var e = Date.now(), t = [];
  e - Vi > 2 && (Yt("matchMediaInit"), Ve.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, l, c;
    for (a in r)
      s = fe.matchMedia(r[a]).matches, s && (l = 1), s !== n[a] && (n[a] = s, c = 1);
    c && (i.revert(), l && t.push(i));
  }), Yt("matchMediaRevert"), t.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Vi = e, Yt("matchMedia"));
}, Jr = /* @__PURE__ */ (function() {
  function o(t, i) {
    this.selector = i && si(i), this.data = [], this._r = [], this.isReverted = !1, this.id = ls++, t && this.add(t);
  }
  var e = o.prototype;
  return e.add = function(i, r, n) {
    B(i) && (n = r, r = i, i = B);
    var s = this, a = function() {
      var c = U, u = s.selector, h;
      return c && c !== s && c.data.push(s), n && (s.selector = si(n)), U = s, h = r.apply(s, arguments), B(h) && s._r.push(h), U = c, s.selector = u, s.isReverted = !1, h;
    };
    return s.last = a, i === B ? a(s, function(l) {
      return s.add(null, l);
    }) : i ? s[i] = a : a;
  }, e.ignore = function(i) {
    var r = U;
    U = null, i(this), U = r;
  }, e.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof V && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(i, r) {
    var n = this;
    if (i ? (function() {
      for (var a = n.getTweens(), l = n.data.length, c; l--; )
        c = n.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(u) {
          return a.splice(a.indexOf(u), 1);
        }));
      for (a.map(function(u) {
        return {
          g: u._dur || u._delay || u._sat && !u._sat.vars.immediateRender ? u.globalTime(0) : -1 / 0,
          t: u
        };
      }).sort(function(u, h) {
        return h.g - u.g || -1 / 0;
      }).forEach(function(u) {
        return u.t.revert(i);
      }), l = n.data.length; l--; )
        c = n.data[l], c instanceof K ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof V) && c.revert && c.revert(i);
      n._r.forEach(function(u) {
        return u(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Ve.length; s--; )
        Ve[s].id === this.id && Ve.splice(s, 1);
  }, e.revert = function(i) {
    this.kill(i || {});
  }, o;
})(), cs = /* @__PURE__ */ (function() {
  function o(t) {
    this.contexts = [], this.scope = t, U && U.data.push(this);
  }
  var e = o.prototype;
  return e.add = function(i, r, n) {
    _e(i) || (i = {
      matches: i
    });
    var s = new Jr(0, n || this.scope), a = s.conditions = {}, l, c, u;
    U && !s.selector && (s.selector = U.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (c in i)
      c === "all" ? u = 1 : (l = fe.matchMedia(i[c]), l && (Ve.indexOf(s) < 0 && Ve.push(s), (a[c] = l.matches) && (u = 1), l.addListener ? l.addListener(li) : l.addEventListener("change", li)));
    return u && r(s, function(h) {
      return s.add(null, h);
    }), this;
  }, e.revert = function(i) {
    this.kill(i || {});
  }, e.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
})(), kt = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    t.forEach(function(r) {
      return Ur(r);
    });
  },
  timeline: function(e) {
    return new K(e);
  },
  getTweensOf: function(e, t) {
    return z.getTweensOf(e, t);
  },
  getProperty: function(e, t, i, r) {
    Y(e) && (e = de(e)[0]);
    var n = $e(e || {}).get, s = i ? Cr : wr;
    return i === "native" && (i = ""), e && (t ? s((ne[t] && ne[t].get || n)(e, t, i, r)) : function(a, l, c) {
      return s((ne[a] && ne[a].get || n)(e, a, l, c));
    });
  },
  quickSetter: function(e, t, i) {
    if (e = de(e), e.length > 1) {
      var r = e.map(function(u) {
        return re.quickSetter(u, t, i);
      }), n = r.length;
      return function(u) {
        for (var h = n; h--; )
          r[h](u);
      };
    }
    e = e[0] || {};
    var s = ne[t], a = $e(e), l = a.harness && (a.harness.aliases || {})[t] || t, c = s ? function(u) {
      var h = new s();
      Xe._pt = 0, h.init(e, i ? u + i : u, Xe, 0, [e]), h.render(1, h), Xe._pt && Ti(1, Xe);
    } : a.set(e, l);
    return s ? c : function(u) {
      return c(e, l, i ? u + i : u, a, 1);
    };
  },
  quickTo: function(e, t, i) {
    var r, n = re.to(e, ce((r = {}, r[t] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(l, c, u) {
      return n.resetTo(t, l, c, u);
    };
    return s.tween = n, s;
  },
  isTweening: function(e) {
    return z.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Ge(e.ease, Qe.ease)), zi(Qe, e || {});
  },
  config: function(e) {
    return zi(oe, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, i = e.effect, r = e.plugins, n = e.defaults, s = e.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !ne[a] && !le[a] && ft(t + " effect requires " + a + " plugin.");
    }), Gt[t] = function(a, l, c) {
      return i(de(a), ce(l || {}, n), c);
    }, s && (K.prototype[t] = function(a, l, c) {
      return this.add(Gt[t](a, _e(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    M[e] = Ge(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? Ge(e, t) : M;
  },
  getById: function(e) {
    return z.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var i = new K(e), r, n;
    for (i.smoothChildTiming = Q(e.smoothChildTiming), z.remove(i), i._dp = 0, i._time = i._tTime = z._time, r = z._first; r; )
      n = r._next, (t || !(!r._dur && r instanceof V && r.vars.onComplete === r._targets[0])) && me(i, r, r._start - r._delay), r = n;
    return me(z, i, 0), i;
  },
  context: function(e, t) {
    return e ? new Jr(e, t) : U;
  },
  matchMedia: function(e) {
    return new cs(e);
  },
  matchMediaRefresh: function() {
    return Ve.forEach(function(e) {
      var t = e.conditions, i, r;
      for (r in t)
        t[r] && (t[r] = !1, i = 1);
      i && e.revert();
    }) || li();
  },
  addEventListener: function(e, t) {
    var i = Mt[e] || (Mt[e] = []);
    ~i.indexOf(t) || i.push(t);
  },
  removeEventListener: function(e, t) {
    var i = Mt[e], r = i && i.indexOf(t);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Bn,
    wrapYoyo: Gn,
    distribute: Lr,
    random: Ir,
    snap: Rr,
    normalize: $n,
    getUnit: X,
    clamp: Fn,
    splitColor: zr,
    toArray: de,
    selector: si,
    mapRange: kr,
    pipe: zn,
    unitize: Nn,
    interpolate: Vn,
    shuffle: Dr
  },
  install: _r,
  effects: Gt,
  ticker: se,
  updateRoot: K.updateRoot,
  plugins: ne,
  globalTimeline: z,
  core: {
    PropTween: te,
    globals: xr,
    Tween: V,
    Timeline: K,
    Animation: _t,
    getCache: $e,
    _removeLinkedListItem: zt,
    reverting: function() {
      return W;
    },
    context: function(e) {
      return e && U && (U.data.push(e), e._ctx = U), U;
    },
    suppressOverwrites: function(e) {
      return mi = e;
    }
  }
};
ee("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return kt[o] = V[o];
});
se.add(K.updateRoot);
Xe = kt.to({}, {
  duration: 0
});
var us = function(e, t) {
  for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
    i = i._next;
  return i;
}, hs = function(e, t) {
  var i = e._targets, r, n, s;
  for (r in t)
    for (n = i.length; n--; )
      s = e._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = us(s, r)), s && s.modifier && s.modifier(t[r], e, i[n], r));
}, Wt = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var l, c;
        if (Y(n) && (l = {}, ee(n, function(u) {
          return l[u] = 1;
        }), n = l), t) {
          l = {};
          for (c in n)
            l[c] = t(n[c]);
          n = l;
        }
        hs(a, n);
      };
    }
  };
}, re = kt.registerPlugin({
  name: "attr",
  init: function(e, t, i, r, n) {
    var s, a, l;
    this.tween = i;
    for (s in t)
      l = e.getAttribute(s) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[s], r, n, 0, 0, s), a.op = s, a.b = l, this._props.push(s);
  },
  render: function(e, t) {
    for (var i = t._pt; i; )
      W ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var i = t.length; i--; )
      this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1);
  }
}, Wt("roundProps", ai), Wt("modifiers"), Wt("snap", Rr)) || kt;
V.version = K.version = re.version = "3.13.0";
yr = 1;
yi() && rt();
M.Power0;
M.Power1;
M.Power2;
M.Power3;
M.Power4;
M.Linear;
M.Quad;
M.Cubic;
M.Quart;
M.Quint;
M.Strong;
M.Elastic;
M.Back;
M.SteppedEase;
M.Bounce;
M.Sine;
M.Expo;
M.Circ;
var Hi, Pe, Ke, Mi, ze, ji, Di, ds = function() {
  return typeof window < "u";
}, we = {}, Ue = 180 / Math.PI, Je = Math.PI / 180, Ye = Math.atan2, Yi = 1e8, Li = /([A-Z])/g, ps = /(left|right|width|margin|padding|x)/i, fs = /[\s,\(]\S/, ge = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ci = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, ms = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, gs = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, ys = function(e, t) {
  var i = t.s + t.c * e;
  t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
}, Qr = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, en = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, _s = function(e, t, i) {
  return e.style[t] = i;
}, xs = function(e, t, i) {
  return e.style.setProperty(t, i);
}, bs = function(e, t, i) {
  return e._gsap[t] = i;
}, vs = function(e, t, i) {
  return e._gsap.scaleX = e._gsap.scaleY = i;
}, Es = function(e, t, i, r, n) {
  var s = e._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, ws = function(e, t, i, r, n) {
  var s = e._gsap;
  s[t] = i, s.renderTransform(n, s);
}, N = "transform", ie = N + "Origin", Cs = function o(e, t) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (e in we && n) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = ge[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return i.tfm[a] = ve(r, a);
      }) : this.tfm[e] = s.x ? s[e] : ve(r, e), e === ie && (this.tfm.zOrigin = s.zOrigin);
    else
      return ge.transform.split(",").forEach(function(a) {
        return o.call(i, a, t);
      });
    if (this.props.indexOf(N) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ie, t, "")), e = N;
  }
  (n || t) && this.props.push(e, t, n[e]);
}, tn = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Ps = function() {
  var e = this.props, t = this.target, i = t.style, r = t._gsap, n, s;
  for (n = 0; n < e.length; n += 3)
    e[n + 1] ? e[n + 1] === 2 ? t[e[n]](e[n + 2]) : t[e[n]] = e[n + 2] : e[n + 2] ? i[e[n]] = e[n + 2] : i.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(Li, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), n = Di(), (!n || !n.isStart) && !i[N] && (tn(i), r.zOrigin && i[ie] && (i[ie] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, rn = function(e, t) {
  var i = {
    target: e,
    props: [],
    revert: Ps,
    save: Cs
  };
  return e._gsap || re.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, nn, ui = function(e, t) {
  var i = Pe.createElementNS ? Pe.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Pe.createElement(e);
  return i && i.style ? i : Pe.createElement(e);
}, pe = function o(e, t, i) {
  var r = getComputedStyle(e);
  return r[t] || r.getPropertyValue(t.replace(Li, "-$1").toLowerCase()) || r.getPropertyValue(t) || !i && o(e, nt(t) || t, 1) || "";
}, Wi = "O,Moz,ms,Ms,Webkit".split(","), nt = function(e, t, i) {
  var r = t || ze, n = r.style, s = 5;
  if (e in n && !i)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(Wi[s] + e in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Wi[s] : "") + e;
}, hi = function() {
  ds() && window.document && (Hi = window, Pe = Hi.document, Ke = Pe.documentElement, ze = ui("div") || {
    style: {}
  }, ui("div"), N = nt(N), ie = N + "Origin", ze.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", nn = !!nt("perspective"), Di = re.core.reverting, Mi = 1);
}, Xi = function(e) {
  var t = e.ownerSVGElement, i = ui("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = e.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Ke.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Ke.removeChild(i), n;
}, Zi = function(e, t) {
  for (var i = t.length; i--; )
    if (e.hasAttribute(t[i]))
      return e.getAttribute(t[i]);
}, sn = function(e) {
  var t, i;
  try {
    t = e.getBBox();
  } catch {
    t = Xi(e), i = 1;
  }
  return t && (t.width || t.height) || i || (t = Xi(e)), t && !t.width && !t.x && !t.y ? {
    x: +Zi(e, ["x", "cx", "x1"]) || 0,
    y: +Zi(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, an = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && sn(e));
}, He = function(e, t) {
  if (t) {
    var i = e.style, r;
    t in we && t !== ie && (t = N), i.removeProperty ? (r = t.substr(0, 2), (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), i.removeProperty(r === "--" ? t : t.replace(Li, "-$1").toLowerCase())) : i.removeAttribute(t);
  }
}, Ae = function(e, t, i, r, n, s) {
  var a = new te(e._pt, t, i, 0, 1, s ? en : Qr);
  return e._pt = a, a.b = r, a.e = n, e._props.push(i), a;
}, qi = {
  deg: 1,
  rad: 1,
  turn: 1
}, As = {
  grid: 1,
  flex: 1
}, Le = function o(e, t, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = ze.style, l = ps.test(t), c = e.tagName.toLowerCase() === "svg", u = (c ? "client" : "offset") + (l ? "Width" : "Height"), h = 100, p = r === "px", f = r === "%", m, d, g, y;
  if (r === s || !n || qi[r] || qi[s])
    return n;
  if (s !== "px" && !p && (n = o(e, t, i, "px")), y = e.getCTM && an(e), (f || s === "%") && (we[t] || ~t.indexOf("adius")))
    return m = y ? e.getBBox()[l ? "width" : "height"] : e[u], G(f ? n / m * h : n / 100 * m);
  if (a[l ? "width" : "height"] = h + (p ? s : r), d = r !== "rem" && ~t.indexOf("adius") || r === "em" && e.appendChild && !c ? e : e.parentNode, y && (d = (e.ownerSVGElement || {}).parentNode), (!d || d === Pe || !d.appendChild) && (d = Pe.body), g = d._gsap, g && f && g.width && l && g.time === se.time && !g.uncache)
    return G(n / g.width * h);
  if (f && (t === "height" || t === "width")) {
    var _ = e.style[t];
    e.style[t] = h + r, m = e[u], _ ? e.style[t] = _ : He(e, t);
  } else
    (f || s === "%") && !As[pe(d, "display")] && (a.position = pe(e, "position")), d === e && (a.position = "static"), d.appendChild(ze), m = ze[u], d.removeChild(ze), a.position = "absolute";
  return l && f && (g = $e(d), g.time = se.time, g.width = d[u]), G(p ? m * n / h : m && n ? h / m * n : 0);
}, ve = function(e, t, i, r) {
  var n;
  return Mi || hi(), t in ge && t !== "transform" && (t = ge[t], ~t.indexOf(",") && (t = t.split(",")[0])), we[t] && t !== "transform" ? (n = bt(e, r), n = t !== "transformOrigin" ? n[t] : n.svg ? n.origin : Ut(pe(e, ie)) + " " + n.zOrigin + "px") : (n = e.style[t], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Ft[t] && Ft[t](e, t, i) || pe(e, t) || vr(e, t) || (t === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Le(e, t, n, i) + i : n;
}, Ss = function(e, t, i, r) {
  if (!i || i === "none") {
    var n = nt(t, e, 1), s = n && pe(e, n, 1);
    s && s !== i ? (t = n, i = s) : t === "borderColor" && (i = pe(e, "borderTopColor"));
  }
  var a = new te(this._pt, e.style, t, 0, 1, qr), l = 0, c = 0, u, h, p, f, m, d, g, y, _, x, v, b;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = pe(e, r.substring(4, r.indexOf(")")))), r === "auto" && (d = e.style[t], e.style[t] = r, r = pe(e, t) || r, d ? e.style[t] = d : He(e, t)), u = [i, r], $r(u), i = u[0], r = u[1], p = i.match(We) || [], b = r.match(We) || [], b.length) {
    for (; h = We.exec(r); )
      g = h[0], _ = r.substring(l, h.index), m ? m = (m + 1) % 5 : (_.substr(-5) === "rgba(" || _.substr(-5) === "hsla(") && (m = 1), g !== (d = p[c++] || "") && (f = parseFloat(d) || 0, v = d.substr((f + "").length), g.charAt(1) === "=" && (g = qe(f, g) + v), y = parseFloat(g), x = g.substr((y + "").length), l = We.lastIndex - x.length, x || (x = x || oe.units[t] || v, l === r.length && (r += x, a.e += x)), v !== x && (f = Le(e, t, d, x) || 0), a._pt = {
        _next: a._pt,
        p: _ || c === 1 ? _ : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: f,
        c: y - f,
        m: m && m < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    a.r = t === "display" && r === "none" ? en : Qr;
  return mr.test(r) && (a.e = 0), this._pt = a, a;
}, Ki = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Ts = function(e) {
  var t = e.split(" "), i = t[0], r = t[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (e = i, i = r, r = e), t[0] = Ki[i] || i, t[1] = Ki[r] || r, t.join(" ");
}, Ms = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var i = t.t, r = i.style, n = t.u, s = i._gsap, a, l, c;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), c = n.length; --c > -1; )
        a = n[c], we[a] && (l = 1, a = a === "transformOrigin" ? ie : N), He(i, a);
    l && (He(i, N), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", bt(i, 1), s.uncache = 1, tn(r)));
  }
}, Ft = {
  clearProps: function(e, t, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = e._pt = new te(e._pt, t, i, 0, 0, Ms);
      return s.u = r, s.pr = -10, s.tween = n, e._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, xt = [1, 0, 0, 1, 0, 0], on = {}, ln = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Ji = function(e) {
  var t = pe(e, N);
  return ln(t) ? xt : t.substr(7).match(fr).map(G);
}, Ri = function(e, t) {
  var i = e._gsap || $e(e), r = e.style, n = Ji(e), s, a, l, c;
  return i.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? xt : n) : (n === xt && !e.offsetParent && e !== Ke && !i.svg && (l = r.display, r.display = "block", s = e.parentNode, (!s || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, a = e.nextElementSibling, Ke.appendChild(e)), n = Ji(e), l ? r.display = l : He(e, "display"), c && (a ? s.insertBefore(e, a) : s ? s.appendChild(e) : Ke.removeChild(e))), t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, di = function(e, t, i, r, n, s) {
  var a = e._gsap, l = n || Ri(e, !0), c = a.xOrigin || 0, u = a.yOrigin || 0, h = a.xOffset || 0, p = a.yOffset || 0, f = l[0], m = l[1], d = l[2], g = l[3], y = l[4], _ = l[5], x = t.split(" "), v = parseFloat(x[0]) || 0, b = parseFloat(x[1]) || 0, C, E, P, w;
  i ? l !== xt && (E = f * g - m * d) && (P = v * (g / E) + b * (-d / E) + (d * _ - g * y) / E, w = v * (-m / E) + b * (f / E) - (f * _ - m * y) / E, v = P, b = w) : (C = sn(e), v = C.x + (~x[0].indexOf("%") ? v / 100 * C.width : v), b = C.y + (~(x[1] || x[0]).indexOf("%") ? b / 100 * C.height : b)), r || r !== !1 && a.smooth ? (y = v - c, _ = b - u, a.xOffset = h + (y * f + _ * d) - y, a.yOffset = p + (y * m + _ * g) - _) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = b, a.smooth = !!r, a.origin = t, a.originIsAbsolute = !!i, e.style[ie] = "0px 0px", s && (Ae(s, a, "xOrigin", c, v), Ae(s, a, "yOrigin", u, b), Ae(s, a, "xOffset", h, a.xOffset), Ae(s, a, "yOffset", p, a.yOffset)), e.setAttribute("data-svg-origin", v + " " + b);
}, bt = function(e, t) {
  var i = e._gsap || new Hr(e);
  if ("x" in i && !t && !i.uncache)
    return i;
  var r = e.style, n = i.scaleX < 0, s = "px", a = "deg", l = getComputedStyle(e), c = pe(e, ie) || "0", u, h, p, f, m, d, g, y, _, x, v, b, C, E, P, w, T, D, S, L, R, $, F, k, J, st, at, ot, Ie, ki, xe, Oe;
  return u = h = p = d = g = y = _ = x = v = 0, f = m = 1, i.svg = !!(e.getCTM && an(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[N] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[N] !== "none" ? l[N] : "")), r.scale = r.rotate = r.translate = "none"), E = Ri(e, i.svg), i.svg && (i.uncache ? (J = e.getBBox(), c = i.xOrigin - J.x + "px " + (i.yOrigin - J.y) + "px", k = "") : k = !t && e.getAttribute("data-svg-origin"), di(e, k || c, !!k || i.originIsAbsolute, i.smooth !== !1, E)), b = i.xOrigin || 0, C = i.yOrigin || 0, E !== xt && (D = E[0], S = E[1], L = E[2], R = E[3], u = $ = E[4], h = F = E[5], E.length === 6 ? (f = Math.sqrt(D * D + S * S), m = Math.sqrt(R * R + L * L), d = D || S ? Ye(S, D) * Ue : 0, _ = L || R ? Ye(L, R) * Ue + d : 0, _ && (m *= Math.abs(Math.cos(_ * Je))), i.svg && (u -= b - (b * D + C * L), h -= C - (b * S + C * R))) : (Oe = E[6], ki = E[7], at = E[8], ot = E[9], Ie = E[10], xe = E[11], u = E[12], h = E[13], p = E[14], P = Ye(Oe, Ie), g = P * Ue, P && (w = Math.cos(-P), T = Math.sin(-P), k = $ * w + at * T, J = F * w + ot * T, st = Oe * w + Ie * T, at = $ * -T + at * w, ot = F * -T + ot * w, Ie = Oe * -T + Ie * w, xe = ki * -T + xe * w, $ = k, F = J, Oe = st), P = Ye(-L, Ie), y = P * Ue, P && (w = Math.cos(-P), T = Math.sin(-P), k = D * w - at * T, J = S * w - ot * T, st = L * w - Ie * T, xe = R * T + xe * w, D = k, S = J, L = st), P = Ye(S, D), d = P * Ue, P && (w = Math.cos(P), T = Math.sin(P), k = D * w + S * T, J = $ * w + F * T, S = S * w - D * T, F = F * w - $ * T, D = k, $ = J), g && Math.abs(g) + Math.abs(d) > 359.9 && (g = d = 0, y = 180 - y), f = G(Math.sqrt(D * D + S * S + L * L)), m = G(Math.sqrt(F * F + Oe * Oe)), P = Ye($, F), _ = Math.abs(P) > 2e-4 ? P * Ue : 0, v = xe ? 1 / (xe < 0 ? -xe : xe) : 0), i.svg && (k = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !ln(pe(e, N)), k && e.setAttribute("transform", k))), Math.abs(_) > 90 && Math.abs(_) < 270 && (n ? (f *= -1, _ += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (m *= -1, _ += _ <= 0 ? 180 : -180)), t = t || i.uncache, i.x = u - ((i.xPercent = u && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + s, i.y = h - ((i.yPercent = h && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + s, i.z = p + s, i.scaleX = G(f), i.scaleY = G(m), i.rotation = G(d) + a, i.rotationX = G(g) + a, i.rotationY = G(y) + a, i.skewX = _ + a, i.skewY = x + a, i.transformPerspective = v + s, (i.zOrigin = parseFloat(c.split(" ")[2]) || !t && i.zOrigin || 0) && (r[ie] = Ut(c)), i.xOffset = i.yOffset = 0, i.force3D = oe.force3D, i.renderTransform = i.svg ? Ls : nn ? cn : Ds, i.uncache = 0, i;
}, Ut = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Xt = function(e, t, i) {
  var r = X(t);
  return G(parseFloat(t) + parseFloat(Le(e, "x", i + "px", r))) + r;
}, Ds = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, cn(e, t);
}, ke = "0deg", lt = "0px", Fe = ") ", cn = function(e, t) {
  var i = t || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, l = i.z, c = i.rotation, u = i.rotationY, h = i.rotationX, p = i.skewX, f = i.skewY, m = i.scaleX, d = i.scaleY, g = i.transformPerspective, y = i.force3D, _ = i.target, x = i.zOrigin, v = "", b = y === "auto" && e && e !== 1 || y === !0;
  if (x && (h !== ke || u !== ke)) {
    var C = parseFloat(u) * Je, E = Math.sin(C), P = Math.cos(C), w;
    C = parseFloat(h) * Je, w = Math.cos(C), s = Xt(_, s, E * w * -x), a = Xt(_, a, -Math.sin(C) * -x), l = Xt(_, l, P * w * -x + x);
  }
  g !== lt && (v += "perspective(" + g + Fe), (r || n) && (v += "translate(" + r + "%, " + n + "%) "), (b || s !== lt || a !== lt || l !== lt) && (v += l !== lt || b ? "translate3d(" + s + ", " + a + ", " + l + ") " : "translate(" + s + ", " + a + Fe), c !== ke && (v += "rotate(" + c + Fe), u !== ke && (v += "rotateY(" + u + Fe), h !== ke && (v += "rotateX(" + h + Fe), (p !== ke || f !== ke) && (v += "skew(" + p + ", " + f + Fe), (m !== 1 || d !== 1) && (v += "scale(" + m + ", " + d + Fe), _.style[N] = v || "translate(0, 0)";
}, Ls = function(e, t) {
  var i = t || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, l = i.rotation, c = i.skewX, u = i.skewY, h = i.scaleX, p = i.scaleY, f = i.target, m = i.xOrigin, d = i.yOrigin, g = i.xOffset, y = i.yOffset, _ = i.forceCSS, x = parseFloat(s), v = parseFloat(a), b, C, E, P, w;
  l = parseFloat(l), c = parseFloat(c), u = parseFloat(u), u && (u = parseFloat(u), c += u, l += u), l || c ? (l *= Je, c *= Je, b = Math.cos(l) * h, C = Math.sin(l) * h, E = Math.sin(l - c) * -p, P = Math.cos(l - c) * p, c && (u *= Je, w = Math.tan(c - u), w = Math.sqrt(1 + w * w), E *= w, P *= w, u && (w = Math.tan(u), w = Math.sqrt(1 + w * w), b *= w, C *= w)), b = G(b), C = G(C), E = G(E), P = G(P)) : (b = h, P = p, C = E = 0), (x && !~(s + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (x = Le(f, "x", s, "px"), v = Le(f, "y", a, "px")), (m || d || g || y) && (x = G(x + m - (m * b + d * E) + g), v = G(v + d - (m * C + d * P) + y)), (r || n) && (w = f.getBBox(), x = G(x + r / 100 * w.width), v = G(v + n / 100 * w.height)), w = "matrix(" + b + "," + C + "," + E + "," + P + "," + x + "," + v + ")", f.setAttribute("transform", w), _ && (f.style[N] = w);
}, Rs = function(e, t, i, r, n) {
  var s = 360, a = Y(n), l = parseFloat(n) * (a && ~n.indexOf("rad") ? Ue : 1), c = l - r, u = r + c + "deg", h, p;
  return a && (h = n.split("_")[1], h === "short" && (c %= s, c !== c % (s / 2) && (c += c < 0 ? s : -s)), h === "cw" && c < 0 ? c = (c + s * Yi) % s - ~~(c / s) * s : h === "ccw" && c > 0 && (c = (c - s * Yi) % s - ~~(c / s) * s)), e._pt = p = new te(e._pt, t, i, r, c, ms), p.e = u, p.u = "deg", e._props.push(i), p;
}, Qi = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, Is = function(e, t, i) {
  var r = Qi({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, l, c, u, h, p, f, m;
  r.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), s[N] = t, a = bt(i, 1), He(i, N), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[N], s[N] = t, a = bt(i, 1), s[N] = c);
  for (l in we)
    c = r[l], u = a[l], c !== u && n.indexOf(l) < 0 && (f = X(c), m = X(u), h = f !== m ? Le(i, l, c, m) : parseFloat(c), p = parseFloat(u), e._pt = new te(e._pt, a, l, h, p - h, ci), e._pt.u = m || 0, e._props.push(l));
  Qi(a, r);
};
ee("padding,margin,Width,Radius", function(o, e) {
  var t = "Top", i = "Right", r = "Bottom", n = "Left", s = (e < 3 ? [t, i, r, n] : [t + n, t + i, r + i, r + n]).map(function(a) {
    return e < 2 ? o + a : "border" + a + o;
  });
  Ft[e > 1 ? "border" + o : o] = function(a, l, c, u, h) {
    var p, f;
    if (arguments.length < 4)
      return p = s.map(function(m) {
        return ve(a, m, c);
      }), f = p.join(" "), f.split(p[0]).length === 5 ? p[0] : f;
    p = (u + "").split(" "), f = {}, s.forEach(function(m, d) {
      return f[m] = p[d] = p[d] || p[(d - 1) / 2 | 0];
    }), a.init(l, f, h);
  };
});
var un = {
  name: "css",
  register: hi,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, i, r, n) {
    var s = this._props, a = e.style, l = i.vars.startAt, c, u, h, p, f, m, d, g, y, _, x, v, b, C, E, P;
    Mi || hi(), this.styles = this.styles || rn(e), P = this.styles.props, this.tween = i;
    for (d in t)
      if (d !== "autoRound" && (u = t[d], !(ne[d] && jr(d, t, i, r, e, n)))) {
        if (f = typeof u, m = Ft[d], f === "function" && (u = u.call(i, r, e, n), f = typeof u), f === "string" && ~u.indexOf("random(") && (u = gt(u)), m)
          m(this, e, d, u, i) && (E = 1);
        else if (d.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(d) + "").trim(), u += "", Me.lastIndex = 0, Me.test(c) || (g = X(c), y = X(u)), y ? g !== y && (c = Le(e, d, c, y) + y) : g && (u += g), this.add(a, "setProperty", c, u, r, n, 0, 0, d), s.push(d), P.push(d, 0, a[d]);
        else if (f !== "undefined") {
          if (l && d in l ? (c = typeof l[d] == "function" ? l[d].call(i, r, e, n) : l[d], Y(c) && ~c.indexOf("random(") && (c = gt(c)), X(c + "") || c === "auto" || (c += oe.units[d] || X(ve(e, d)) || ""), (c + "").charAt(1) === "=" && (c = ve(e, d))) : c = ve(e, d), p = parseFloat(c), _ = f === "string" && u.charAt(1) === "=" && u.substr(0, 2), _ && (u = u.substr(2)), h = parseFloat(u), d in ge && (d === "autoAlpha" && (p === 1 && ve(e, "visibility") === "hidden" && h && (p = 0), P.push("visibility", 0, a.visibility), Ae(this, a, "visibility", p ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), d !== "scale" && d !== "transform" && (d = ge[d], ~d.indexOf(",") && (d = d.split(",")[0]))), x = d in we, x) {
            if (this.styles.save(d), f === "string" && u.substring(0, 6) === "var(--" && (u = pe(e, u.substring(4, u.indexOf(")"))), h = parseFloat(u)), v || (b = e._gsap, b.renderTransform && !t.parseTransform || bt(e, t.parseTransform), C = t.smoothOrigin !== !1 && b.smooth, v = this._pt = new te(this._pt, a, N, 0, 1, b.renderTransform, b, 0, -1), v.dep = 1), d === "scale")
              this._pt = new te(this._pt, b, "scaleY", b.scaleY, (_ ? qe(b.scaleY, _ + h) : h) - b.scaleY || 0, ci), this._pt.u = 0, s.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              P.push(ie, 0, a[ie]), u = Ts(u), b.svg ? di(e, u, 0, C, 0, this) : (y = parseFloat(u.split(" ")[2]) || 0, y !== b.zOrigin && Ae(this, b, "zOrigin", b.zOrigin, y), Ae(this, a, d, Ut(c), Ut(u)));
              continue;
            } else if (d === "svgOrigin") {
              di(e, u, 1, C, 0, this);
              continue;
            } else if (d in on) {
              Rs(this, b, d, p, _ ? qe(p, _ + u) : u);
              continue;
            } else if (d === "smoothOrigin") {
              Ae(this, b, "smooth", b.smooth, u);
              continue;
            } else if (d === "force3D") {
              b[d] = u;
              continue;
            } else if (d === "transform") {
              Is(this, u, e);
              continue;
            }
          } else d in a || (d = nt(d) || d);
          if (x || (h || h === 0) && (p || p === 0) && !fs.test(u) && d in a)
            g = (c + "").substr((p + "").length), h || (h = 0), y = X(u) || (d in oe.units ? oe.units[d] : g), g !== y && (p = Le(e, d, c, y)), this._pt = new te(this._pt, x ? b : a, d, p, (_ ? qe(p, _ + h) : h) - p, !x && (y === "px" || d === "zIndex") && t.autoRound !== !1 ? ys : ci), this._pt.u = y || 0, g !== y && y !== "%" && (this._pt.b = c, this._pt.r = gs);
          else if (d in a)
            Ss.call(this, e, d, c, _ ? _ + u : u);
          else if (d in e)
            this.add(e, d, c || e[d], _ ? _ + u : u, r, n);
          else if (d !== "parseTransform") {
            xi(d, u);
            continue;
          }
          x || (d in a ? P.push(d, 0, a[d]) : typeof e[d] == "function" ? P.push(d, 2, e[d]()) : P.push(d, 1, c || e[d])), s.push(d);
        }
      }
    E && Kr(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Di())
      for (var i = t._pt; i; )
        i.r(e, i.d), i = i._next;
    else
      t.styles.revert();
  },
  get: ve,
  aliases: ge,
  getSetter: function(e, t, i) {
    var r = ge[t];
    return r && r.indexOf(",") < 0 && (t = r), t in we && t !== ie && (e._gsap.x || ve(e, "x")) ? i && ji === i ? t === "scale" ? vs : bs : (ji = i || {}) && (t === "scale" ? Es : ws) : e.style && !gi(e.style[t]) ? _s : ~t.indexOf("-") ? xs : Si(e, t);
  },
  core: {
    _removeProperty: He,
    _getMatrix: Ri
  }
};
re.utils.checkPrefix = nt;
re.core.getStyleSaver = rn;
(function(o, e, t, i) {
  var r = ee(o + "," + e + "," + t, function(n) {
    we[n] = 1;
  });
  ee(e, function(n) {
    oe.units[n] = "deg", on[n] = 1;
  }), ge[r[13]] = o + "," + e, ee(i, function(n) {
    var s = n.split(":");
    ge[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ee("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  oe.units[o] = "px";
});
re.registerPlugin(un);
var j = re.registerPlugin(un) || re;
j.core.Tween;
class ye {
  constructor(e, t, i, r, n = "div") {
    this.parent = e, this.object = t, this.property = i, this._disabled = !1, this._hidden = !1, this.initialValue = this.getValue(), this.domElement = document.createElement(n), this.domElement.classList.add("lil-controller"), this.domElement.classList.add(r), this.$name = document.createElement("div"), this.$name.classList.add("lil-name"), ye.nextNameID = ye.nextNameID || 0, this.$name.id = `lil-gui-name-${++ye.nextNameID}`, this.$widget = document.createElement("div"), this.$widget.classList.add("lil-widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.domElement.addEventListener("keydown", (s) => s.stopPropagation()), this.domElement.addEventListener("keyup", (s) => s.stopPropagation()), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(i);
  }
  /**
   * Sets the name of the controller and its label in the GUI.
   * @param {string} name
   * @returns {this}
   */
  name(e) {
    return this._name = e, this.$name.textContent = e, this;
  }
  /**
   * Pass a function to be called whenever the value is modified by this controller.
   * The function receives the new value as its first parameter. The value of `this` will be the
   * controller.
   *
   * For function controllers, the `onChange` callback will be fired on click, after the function
   * executes.
   * @param {Function} callback
   * @returns {this}
   * @example
   * const controller = gui.add( object, 'property' );
   *
   * controller.onChange( function( v ) {
   * 	console.log( 'The value is now ' + v );
   * 	console.assert( this === controller );
   * } );
   */
  onChange(e) {
    return this._onChange = e, this;
  }
  /**
   * Calls the onChange methods of this controller and its parent GUI.
   * @protected
   */
  _callOnChange() {
    this.parent._callOnChange(this), this._onChange !== void 0 && this._onChange.call(this, this.getValue()), this._changed = !0;
  }
  /**
   * Pass a function to be called after this controller has been modified and loses focus.
   * @param {Function} callback
   * @returns {this}
   * @example
   * const controller = gui.add( object, 'property' );
   *
   * controller.onFinishChange( function( v ) {
   * 	console.log( 'Changes complete: ' + v );
   * 	console.assert( this === controller );
   * } );
   */
  onFinishChange(e) {
    return this._onFinishChange = e, this;
  }
  /**
   * Should be called by Controller when its widgets lose focus.
   * @protected
   */
  _callOnFinishChange() {
    this._changed && (this.parent._callOnFinishChange(this), this._onFinishChange !== void 0 && this._onFinishChange.call(this, this.getValue())), this._changed = !1;
  }
  /**
   * Sets the controller back to its initial value.
   * @returns {this}
   */
  reset() {
    return this.setValue(this.initialValue), this._callOnFinishChange(), this;
  }
  /**
   * Enables this controller.
   * @param {boolean} enabled
   * @returns {this}
   * @example
   * controller.enable();
   * controller.enable( false ); // disable
   * controller.enable( controller._disabled ); // toggle
   */
  enable(e = !0) {
    return this.disable(!e);
  }
  /**
   * Disables this controller.
   * @param {boolean} disabled
   * @returns {this}
   * @example
   * controller.disable();
   * controller.disable( false ); // enable
   * controller.disable( !controller._disabled ); // toggle
   */
  disable(e = !0) {
    return e === this._disabled ? this : (this._disabled = e, this.domElement.classList.toggle("lil-disabled", e), this.$disable.toggleAttribute("disabled", e), this);
  }
  /**
   * Shows the Controller after it's been hidden.
   * @param {boolean} show
   * @returns {this}
   * @example
   * controller.show();
   * controller.show( false ); // hide
   * controller.show( controller._hidden ); // toggle
   */
  show(e = !0) {
    return this._hidden = !e, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  /**
   * Hides the Controller.
   * @returns {this}
   */
  hide() {
    return this.show(!1);
  }
  /**
   * Changes this controller into a dropdown of options.
   *
   * Calling this method on an option controller will simply update the options. However, if this
   * controller was not already an option controller, old references to this controller are
   * destroyed, and a new controller is added to the end of the GUI.
   * @example
   * // safe usage
   *
   * gui.add( obj, 'prop1' ).options( [ 'a', 'b', 'c' ] );
   * gui.add( obj, 'prop2' ).options( { Big: 10, Small: 1 } );
   * gui.add( obj, 'prop3' );
   *
   * // danger
   *
   * const ctrl1 = gui.add( obj, 'prop1' );
   * gui.add( obj, 'prop2' );
   *
   * // calling options out of order adds a new controller to the end...
   * const ctrl2 = ctrl1.options( [ 'a', 'b', 'c' ] );
   *
   * // ...and ctrl1 now references a controller that doesn't exist
   * assert( ctrl2 !== ctrl1 )
   * @param {object|Array} options
   * @returns {Controller}
   */
  options(e) {
    const t = this.parent.add(this.object, this.property, e);
    return t.name(this._name), this.destroy(), t;
  }
  /**
   * Sets the minimum value. Only works on number controllers.
   * @param {number} min
   * @returns {this}
   */
  min(e) {
    return this;
  }
  /**
   * Sets the maximum value. Only works on number controllers.
   * @param {number} max
   * @returns {this}
   */
  max(e) {
    return this;
  }
  /**
   * Values set by this controller will be rounded to multiples of `step`. Only works on number
   * controllers.
   * @param {number} step
   * @returns {this}
   */
  step(e) {
    return this;
  }
  /**
   * Rounds the displayed value to a fixed number of decimals, without affecting the actual value
   * like `step()`. Only works on number controllers.
   * @example
   * gui.add( object, 'property' ).listen().decimals( 4 );
   * @param {number} decimals
   * @returns {this}
   */
  decimals(e) {
    return this;
  }
  /**
   * Calls `updateDisplay()` every animation frame. Pass `false` to stop listening.
   * @param {boolean} listen
   * @returns {this}
   */
  listen(e = !0) {
    return this._listening = e, this._listenCallbackID !== void 0 && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this;
  }
  _listenCallback() {
    this._listenCallbackID = requestAnimationFrame(this._listenCallback);
    const e = this.save();
    e !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = e;
  }
  /**
   * Returns `object[ property ]`.
   * @returns {any}
   */
  getValue() {
    return this.object[this.property];
  }
  /**
   * Sets the value of `object[ property ]`, invokes any `onChange` handlers and updates the display.
   * @param {any} value
   * @returns {this}
   */
  setValue(e) {
    return this.getValue() !== e && (this.object[this.property] = e, this._callOnChange(), this.updateDisplay()), this;
  }
  /**
   * Updates the display to keep it in sync with the current value. Useful for updating your
   * controllers when their values have been modified outside of the GUI.
   * @returns {this}
   */
  updateDisplay() {
    return this;
  }
  load(e) {
    return this.setValue(e), this._callOnFinishChange(), this;
  }
  save() {
    return this.getValue();
  }
  /**
   * Destroys this controller and removes it from the parent GUI.
   */
  destroy() {
    this.listen(!1), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement);
  }
}
class Os extends ye {
  constructor(e, t, i) {
    super(e, t, i, "lil-boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => {
      this.setValue(this.$input.checked), this._callOnFinishChange();
    }), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.checked = this.getValue(), this;
  }
}
function pi(o) {
  let e, t;
  return (e = o.match(/(#|0x)?([a-f0-9]{6})/i)) ? t = e[2] : (e = o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? t = parseInt(e[1]).toString(16).padStart(2, 0) + parseInt(e[2]).toString(16).padStart(2, 0) + parseInt(e[3]).toString(16).padStart(2, 0) : (e = o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (t = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), t ? "#" + t : !1;
}
const ks = {
  isPrimitive: !0,
  match: (o) => typeof o == "string",
  fromHexString: pi,
  toHexString: pi
}, vt = {
  isPrimitive: !0,
  match: (o) => typeof o == "number",
  fromHexString: (o) => parseInt(o.substring(1), 16),
  toHexString: (o) => "#" + o.toString(16).padStart(6, 0)
}, Fs = {
  isPrimitive: !1,
  match: (o) => Array.isArray(o) || ArrayBuffer.isView(o),
  fromHexString(o, e, t = 1) {
    const i = vt.fromHexString(o);
    e[0] = (i >> 16 & 255) / 255 * t, e[1] = (i >> 8 & 255) / 255 * t, e[2] = (i & 255) / 255 * t;
  },
  toHexString([o, e, t], i = 1) {
    i = 255 / i;
    const r = o * i << 16 ^ e * i << 8 ^ t * i << 0;
    return vt.toHexString(r);
  }
}, Us = {
  isPrimitive: !1,
  match: (o) => Object(o) === o,
  fromHexString(o, e, t = 1) {
    const i = vt.fromHexString(o);
    e.r = (i >> 16 & 255) / 255 * t, e.g = (i >> 8 & 255) / 255 * t, e.b = (i & 255) / 255 * t;
  },
  toHexString({ r: o, g: e, b: t }, i = 1) {
    i = 255 / i;
    const r = o * i << 16 ^ e * i << 8 ^ t * i << 0;
    return vt.toHexString(r);
  }
}, zs = [ks, vt, Fs, Us];
function Ns(o) {
  return zs.find((e) => e.match(o));
}
class $s extends ye {
  constructor(e, t, i, r) {
    super(e, t, i, "lil-color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("lil-display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = Ns(this.initialValue), this._rgbScale = r, this._initialValueHexString = this.save(), this._textFocused = !1, this.$input.addEventListener("input", () => {
      this._setValueFromHexString(this.$input.value);
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$text.addEventListener("input", () => {
      const n = pi(this.$text.value);
      n && this._setValueFromHexString(n);
    }), this.$text.addEventListener("focus", () => {
      this._textFocused = !0, this.$text.select();
    }), this.$text.addEventListener("blur", () => {
      this._textFocused = !1, this.updateDisplay(), this._callOnFinishChange();
    }), this.$disable = this.$text, this.updateDisplay();
  }
  reset() {
    return this._setValueFromHexString(this._initialValueHexString), this;
  }
  _setValueFromHexString(e) {
    if (this._format.isPrimitive) {
      const t = this._format.fromHexString(e);
      this.setValue(t);
    } else
      this._format.fromHexString(e, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
  }
  save() {
    return this._format.toHexString(this.getValue(), this._rgbScale);
  }
  load(e) {
    return this._setValueFromHexString(e), this._callOnFinishChange(), this;
  }
  updateDisplay() {
    return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this;
  }
}
class Zt extends ye {
  constructor(e, t, i) {
    super(e, t, i, "lil-function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", (r) => {
      r.preventDefault(), this.getValue().call(this.object), this._callOnChange();
    }), this.$button.addEventListener("touchstart", () => {
    }, { passive: !0 }), this.$disable = this.$button;
  }
}
class Bs extends ye {
  constructor(e, t, i, r, n, s) {
    super(e, t, i, "lil-number"), this._initInput(), this.min(r), this.max(n);
    const a = s !== void 0;
    this.step(a ? s : this._getImplicitStep(), a), this.updateDisplay();
  }
  decimals(e) {
    return this._decimals = e, this.updateDisplay(), this;
  }
  min(e) {
    return this._min = e, this._onUpdateMinMax(), this;
  }
  max(e) {
    return this._max = e, this._onUpdateMinMax(), this;
  }
  step(e, t = !0) {
    return this._step = e, this._stepExplicit = t, this;
  }
  updateDisplay() {
    const e = this.getValue();
    if (this._hasSlider) {
      let t = (e - this._min) / (this._max - this._min);
      t = Math.max(0, Math.min(t, 1)), this.$fill.style.width = t * 100 + "%";
    }
    return this._inputFocused || (this.$input.value = this._decimals === void 0 ? e : e.toFixed(this._decimals)), this;
  }
  _initInput() {
    this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("aria-labelledby", this.$name.id), window.matchMedia("(pointer: coarse)").matches && (this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any")), this.$widget.appendChild(this.$input), this.$disable = this.$input;
    const t = () => {
      let _ = parseFloat(this.$input.value);
      isNaN(_) || (this._stepExplicit && (_ = this._snap(_)), this.setValue(this._clamp(_)));
    }, i = (_) => {
      const x = parseFloat(this.$input.value);
      isNaN(x) || (this._snapClampSetValue(x + _), this.$input.value = this.getValue());
    }, r = (_) => {
      _.key === "Enter" && this.$input.blur(), _.code === "ArrowUp" && (_.preventDefault(), i(this._step * this._arrowKeyMultiplier(_))), _.code === "ArrowDown" && (_.preventDefault(), i(this._step * this._arrowKeyMultiplier(_) * -1));
    }, n = (_) => {
      this._inputFocused && (_.preventDefault(), i(this._step * this._normalizeMouseWheel(_)));
    };
    let s = !1, a, l, c, u, h;
    const p = 5, f = (_) => {
      a = _.clientX, l = c = _.clientY, s = !0, u = this.getValue(), h = 0, window.addEventListener("mousemove", m), window.addEventListener("mouseup", d);
    }, m = (_) => {
      if (s) {
        const x = _.clientX - a, v = _.clientY - l;
        Math.abs(v) > p ? (_.preventDefault(), this.$input.blur(), s = !1, this._setDraggingStyle(!0, "vertical")) : Math.abs(x) > p && d();
      }
      if (!s) {
        const x = _.clientY - c;
        h -= x * this._step * this._arrowKeyMultiplier(_), u + h > this._max ? h = this._max - u : u + h < this._min && (h = this._min - u), this._snapClampSetValue(u + h);
      }
      c = _.clientY;
    }, d = () => {
      this._setDraggingStyle(!1, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", d);
    }, g = () => {
      this._inputFocused = !0;
    }, y = () => {
      this._inputFocused = !1, this.updateDisplay(), this._callOnFinishChange();
    };
    this.$input.addEventListener("input", t), this.$input.addEventListener("keydown", r), this.$input.addEventListener("wheel", n, { passive: !1 }), this.$input.addEventListener("mousedown", f), this.$input.addEventListener("focus", g), this.$input.addEventListener("blur", y);
  }
  _initSlider() {
    this._hasSlider = !0, this.$slider = document.createElement("div"), this.$slider.classList.add("lil-slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("lil-fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("lil-has-slider");
    const e = (y, _, x, v, b) => (y - _) / (x - _) * (b - v) + v, t = (y) => {
      const _ = this.$slider.getBoundingClientRect();
      let x = e(y, _.left, _.right, this._min, this._max);
      this._snapClampSetValue(x);
    }, i = (y) => {
      this._setDraggingStyle(!0), t(y.clientX), window.addEventListener("mousemove", r), window.addEventListener("mouseup", n);
    }, r = (y) => {
      t(y.clientX);
    }, n = () => {
      this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", n);
    };
    let s = !1, a, l;
    const c = (y) => {
      y.preventDefault(), this._setDraggingStyle(!0), t(y.touches[0].clientX), s = !1;
    }, u = (y) => {
      y.touches.length > 1 || (this._hasScrollBar ? (a = y.touches[0].clientX, l = y.touches[0].clientY, s = !0) : c(y), window.addEventListener("touchmove", h, { passive: !1 }), window.addEventListener("touchend", p));
    }, h = (y) => {
      if (s) {
        const _ = y.touches[0].clientX - a, x = y.touches[0].clientY - l;
        Math.abs(_) > Math.abs(x) ? c(y) : (window.removeEventListener("touchmove", h), window.removeEventListener("touchend", p));
      } else
        y.preventDefault(), t(y.touches[0].clientX);
    }, p = () => {
      this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", p);
    }, f = this._callOnFinishChange.bind(this), m = 400;
    let d;
    const g = (y) => {
      if (Math.abs(y.deltaX) < Math.abs(y.deltaY) && this._hasScrollBar) return;
      y.preventDefault();
      const x = this._normalizeMouseWheel(y) * this._step;
      this._snapClampSetValue(this.getValue() + x), this.$input.value = this.getValue(), clearTimeout(d), d = setTimeout(f, m);
    };
    this.$slider.addEventListener("mousedown", i), this.$slider.addEventListener("touchstart", u, { passive: !1 }), this.$slider.addEventListener("wheel", g, { passive: !1 });
  }
  _setDraggingStyle(e, t = "horizontal") {
    this.$slider && this.$slider.classList.toggle("lil-active", e), document.body.classList.toggle("lil-dragging", e), document.body.classList.toggle(`lil-${t}`, e);
  }
  _getImplicitStep() {
    return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
  }
  _onUpdateMinMax() {
    !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), !1), this._initSlider(), this.updateDisplay());
  }
  _normalizeMouseWheel(e) {
    let { deltaX: t, deltaY: i } = e;
    return Math.floor(e.deltaY) !== e.deltaY && e.wheelDelta && (t = 0, i = -e.wheelDelta / 120, i *= this._stepExplicit ? 1 : 10), t + -i;
  }
  _arrowKeyMultiplier(e) {
    let t = this._stepExplicit ? 1 : 10;
    return e.shiftKey ? t *= 10 : e.altKey && (t /= 10), t;
  }
  _snap(e) {
    let t = 0;
    return this._hasMin ? t = this._min : this._hasMax && (t = this._max), e -= t, e = Math.round(e / this._step) * this._step, e += t, e = parseFloat(e.toPrecision(15)), e;
  }
  _clamp(e) {
    return e < this._min && (e = this._min), e > this._max && (e = this._max), e;
  }
  _snapClampSetValue(e) {
    this.setValue(this._clamp(this._snap(e)));
  }
  get _hasScrollBar() {
    const e = this.parent.root.$children;
    return e.scrollHeight > e.clientHeight;
  }
  get _hasMin() {
    return this._min !== void 0;
  }
  get _hasMax() {
    return this._max !== void 0;
  }
}
class Gs extends ye {
  constructor(e, t, i, r) {
    super(e, t, i, "lil-option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("lil-display"), this.$select.addEventListener("change", () => {
      this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange();
    }), this.$select.addEventListener("focus", () => {
      this.$display.classList.add("lil-focus");
    }), this.$select.addEventListener("blur", () => {
      this.$display.classList.remove("lil-focus");
    }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.options(r);
  }
  options(e) {
    return this._values = Array.isArray(e) ? e : Object.values(e), this._names = Array.isArray(e) ? e : Object.keys(e), this.$select.replaceChildren(), this._names.forEach((t) => {
      const i = document.createElement("option");
      i.textContent = t, this.$select.appendChild(i);
    }), this.updateDisplay(), this;
  }
  updateDisplay() {
    const e = this.getValue(), t = this._values.indexOf(e);
    return this.$select.selectedIndex = t, this.$display.textContent = t === -1 ? e : this._names[t], this;
  }
}
class Vs extends ye {
  constructor(e, t, i) {
    super(e, t, i, "lil-string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("spellcheck", "false"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => {
      this.setValue(this.$input.value);
    }), this.$input.addEventListener("keydown", (r) => {
      r.code === "Enter" && this.$input.blur();
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.value = this.getValue(), this;
  }
}
var Hs = `.lil-gui {
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
}`;
function js(o) {
  const e = document.createElement("style");
  e.innerHTML = o;
  const t = document.querySelector("head link[rel=stylesheet], head style");
  t ? document.head.insertBefore(e, t) : document.head.appendChild(e);
}
let er = !1;
class Ii {
  /**
   * Creates a panel that holds controllers.
   * @example
   * new GUI();
   * new GUI( { container: document.getElementById( 'custom' ) } );
   *
   * @param {object} [options]
   * @param {boolean} [options.autoPlace=true]
   * Adds the GUI to `document.body` and fixes it to the top right of the page.
   *
   * @param {Node} [options.container]
   * Adds the GUI to this DOM element. Overrides `autoPlace`.
   *
   * @param {number} [options.width=245]
   * Width of the GUI in pixels, usually set when name labels become too long. Note that you can make
   * name labels wider in CSS with `.lil‑gui { ‑‑name‑width: 55% }`.
   *
   * @param {string} [options.title=Controls]
   * Name to display in the title bar.
   *
   * @param {boolean} [options.closeFolders=false]
   * Pass `true` to close all folders in this GUI by default.
   *
   * @param {boolean} [options.injectStyles=true]
   * Injects the default stylesheet into the page if this is the first GUI.
   * Pass `false` to use your own stylesheet.
   *
   * @param {number} [options.touchStyles=true]
   * Makes controllers larger on touch devices. Pass `false` to disable touch styles.
   *
   * @param {GUI} [options.parent]
   * Adds this GUI as a child in another GUI. Usually this is done for you by `addFolder()`.
   */
  constructor({
    parent: e,
    autoPlace: t = e === void 0,
    container: i,
    width: r,
    title: n = "Controls",
    closeFolders: s = !1,
    injectStyles: a = !0,
    touchStyles: l = !0
  } = {}) {
    if (this.parent = e, this.root = e ? e.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = !1, this._hidden = !1, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("button"), this.$title.classList.add("lil-title"), this.$title.setAttribute("aria-expanded", !0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("touchstart", () => {
    }, { passive: !0 }), this.$children = document.createElement("div"), this.$children.classList.add("lil-children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(n), this.parent) {
      this.parent.children.push(this), this.parent.folders.push(this), this.parent.$children.appendChild(this.domElement);
      return;
    }
    this.domElement.classList.add("lil-root"), l && this.domElement.classList.add("lil-allow-touch-styles"), !er && a && (js(Hs), er = !0), i ? i.appendChild(this.domElement) : t && (this.domElement.classList.add("lil-auto-place", "autoPlace"), document.body.appendChild(this.domElement)), r && this.domElement.style.setProperty("--width", r + "px"), this._closeFolders = s;
  }
  /**
   * Adds a controller to the GUI, inferring controller type using the `typeof` operator.
   * @example
   * gui.add( object, 'property' );
   * gui.add( object, 'number', 0, 100, 1 );
   * gui.add( object, 'options', [ 1, 2, 3 ] );
   *
   * @param {object} object The object the controller will modify.
   * @param {string} property Name of the property to control.
   * @param {number|object|Array} [$1] Minimum value for number controllers, or the set of
   * selectable values for a dropdown.
   * @param {number} [max] Maximum value for number controllers.
   * @param {number} [step] Step value for number controllers.
   * @returns {Controller}
   */
  add(e, t, i, r, n) {
    if (Object(i) === i)
      return new Gs(this, e, t, i);
    const s = e[t];
    switch (typeof s) {
      case "number":
        return new Bs(this, e, t, i, r, n);
      case "boolean":
        return new Os(this, e, t);
      case "string":
        return new Vs(this, e, t);
      case "function":
        return new Zt(this, e, t);
    }
    console.error(`gui.add failed
	property:`, t, `
	object:`, e, `
	value:`, s);
  }
  /**
   * Adds a color controller to the GUI.
   * @example
   * params = {
   * 	cssColor: '#ff00ff',
   * 	rgbColor: { r: 0, g: 0.2, b: 0.4 },
   * 	customRange: [ 0, 127, 255 ],
   * };
   *
   * gui.addColor( params, 'cssColor' );
   * gui.addColor( params, 'rgbColor' );
   * gui.addColor( params, 'customRange', 255 );
   *
   * @param {object} object The object the controller will modify.
   * @param {string} property Name of the property to control.
   * @param {number} rgbScale Maximum value for a color channel when using an RGB color. You may
   * need to set this to 255 if your colors are too bright.
   * @returns {Controller}
   */
  addColor(e, t, i = 1) {
    return new $s(this, e, t, i);
  }
  /**
   * Adds a folder to the GUI, which is just another GUI. This method returns
   * the nested GUI so you can add controllers to it.
   * @example
   * const folder = gui.addFolder( 'Position' );
   * folder.add( position, 'x' );
   * folder.add( position, 'y' );
   * folder.add( position, 'z' );
   *
   * @param {string} title Name to display in the folder's title bar.
   * @returns {GUI}
   */
  addFolder(e) {
    const t = new Ii({ parent: this, title: e });
    return this.root._closeFolders && t.close(), t;
  }
  /**
   * Recalls values that were saved with `gui.save()`.
   * @param {object} obj
   * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
   * @returns {this}
   */
  load(e, t = !0) {
    return e.controllers && this.controllers.forEach((i) => {
      i instanceof Zt || i._name in e.controllers && i.load(e.controllers[i._name]);
    }), t && e.folders && this.folders.forEach((i) => {
      i._title in e.folders && i.load(e.folders[i._title]);
    }), this;
  }
  /**
   * Returns an object mapping controller names to values. The object can be passed to `gui.load()` to
   * recall these values.
   * @example
   * {
   * 	controllers: {
   * 		prop1: 1,
   * 		prop2: 'value',
   * 		...
   * 	},
   * 	folders: {
   * 		folderName1: { controllers, folders },
   * 		folderName2: { controllers, folders }
   * 		...
   * 	}
   * }
   *
   * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
   * @returns {object}
   */
  save(e = !0) {
    const t = {
      controllers: {},
      folders: {}
    };
    return this.controllers.forEach((i) => {
      if (!(i instanceof Zt)) {
        if (i._name in t.controllers)
          throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);
        t.controllers[i._name] = i.save();
      }
    }), e && this.folders.forEach((i) => {
      if (i._title in t.folders)
        throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);
      t.folders[i._title] = i.save();
    }), t;
  }
  /**
   * Opens a GUI or folder. GUI and folders are open by default.
   * @param {boolean} open Pass false to close.
   * @returns {this}
   * @example
   * gui.open(); // open
   * gui.open( false ); // close
   * gui.open( gui._closed ); // toggle
   */
  open(e = !0) {
    return this._setClosed(!e), this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("lil-closed", this._closed), this;
  }
  /**
   * Closes the GUI.
   * @returns {this}
   */
  close() {
    return this.open(!1);
  }
  _setClosed(e) {
    this._closed !== e && (this._closed = e, this._callOnOpenClose(this));
  }
  /**
   * Shows the GUI after it's been hidden.
   * @param {boolean} show
   * @returns {this}
   * @example
   * gui.show();
   * gui.show( false ); // hide
   * gui.show( gui._hidden ); // toggle
   */
  show(e = !0) {
    return this._hidden = !e, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  /**
   * Hides the GUI.
   * @returns {this}
   */
  hide() {
    return this.show(!1);
  }
  openAnimated(e = !0) {
    return this._setClosed(!e), this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(() => {
      const t = this.$children.clientHeight;
      this.$children.style.height = t + "px", this.domElement.classList.add("lil-transition");
      const i = (n) => {
        n.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("lil-transition"), this.$children.removeEventListener("transitionend", i));
      };
      this.$children.addEventListener("transitionend", i);
      const r = e ? this.$children.scrollHeight : 0;
      this.domElement.classList.toggle("lil-closed", !e), requestAnimationFrame(() => {
        this.$children.style.height = r + "px";
      });
    }), this;
  }
  /**
   * Change the title of this GUI.
   * @param {string} title
   * @returns {this}
   */
  title(e) {
    return this._title = e, this.$title.textContent = e, this;
  }
  /**
   * Resets all controllers to their initial values.
   * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
   * @returns {this}
   */
  reset(e = !0) {
    return (e ? this.controllersRecursive() : this.controllers).forEach((i) => i.reset()), this;
  }
  /**
   * Pass a function to be called whenever a controller in this GUI changes.
   * @param {function({object:object, property:string, value:any, controller:Controller})} callback
   * @returns {this}
   * @example
   * gui.onChange( event => {
   * 	event.object     // object that was modified
   * 	event.property   // string, name of property
   * 	event.value      // new value of controller
   * 	event.controller // controller that was modified
   * } );
   */
  onChange(e) {
    return this._onChange = e, this;
  }
  _callOnChange(e) {
    this.parent && this.parent._callOnChange(e), this._onChange !== void 0 && this._onChange.call(this, {
      object: e.object,
      property: e.property,
      value: e.getValue(),
      controller: e
    });
  }
  /**
   * Pass a function to be called whenever a controller in this GUI has finished changing.
   * @param {function({object:object, property:string, value:any, controller:Controller})} callback
   * @returns {this}
   * @example
   * gui.onFinishChange( event => {
   * 	event.object     // object that was modified
   * 	event.property   // string, name of property
   * 	event.value      // new value of controller
   * 	event.controller // controller that was modified
   * } );
   */
  onFinishChange(e) {
    return this._onFinishChange = e, this;
  }
  _callOnFinishChange(e) {
    this.parent && this.parent._callOnFinishChange(e), this._onFinishChange !== void 0 && this._onFinishChange.call(this, {
      object: e.object,
      property: e.property,
      value: e.getValue(),
      controller: e
    });
  }
  /**
   * Pass a function to be called when this GUI or its descendants are opened or closed.
   * @param {function(GUI)} callback
   * @returns {this}
   * @example
   * gui.onOpenClose( changedGUI => {
   * 	console.log( changedGUI._closed );
   * } );
   */
  onOpenClose(e) {
    return this._onOpenClose = e, this;
  }
  _callOnOpenClose(e) {
    this.parent && this.parent._callOnOpenClose(e), this._onOpenClose !== void 0 && this._onOpenClose.call(this, e);
  }
  /**
   * Destroys all DOM elements and event listeners associated with this GUI.
   */
  destroy() {
    this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach((e) => e.destroy());
  }
  /**
   * Returns an array of controllers contained by this GUI and its descendents.
   * @returns {Controller[]}
   */
  controllersRecursive() {
    let e = Array.from(this.controllers);
    return this.folders.forEach((t) => {
      e = e.concat(t.controllersRecursive());
    }), e;
  }
  /**
   * Returns an array of folders contained by this GUI and its descendents.
   * @returns {GUI[]}
   */
  foldersRecursive() {
    let e = Array.from(this.folders);
    return this.folders.forEach((t) => {
      e = e.concat(t.foldersRecursive());
    }), e;
  }
}
const hn = [
  // Major economies and populous nations
  { id: "156", code: "CN", name: "China", population: 1412, gdpPerCapita: 21476, co2Emissions: 8, lifeExpectancy: 78.2, humanDevIndex: 0.768, internetUsers: 73, renewableEnergy: 15, urbanPopulation: 64.7, healthExpenditure: 5.4, educationExpenditure: 3.6, forestArea: 23.3, accessElectricity: 100 },
  { id: "356", code: "IN", name: "India", population: 1408, gdpPerCapita: 8379, co2Emissions: 1.9, lifeExpectancy: 70.8, humanDevIndex: 0.633, internetUsers: 47, renewableEnergy: 38, urbanPopulation: 35.9, healthExpenditure: 3, educationExpenditure: 4.5, forestArea: 24.3, accessElectricity: 99.6 },
  { id: "840", code: "US", name: "United States", population: 332, gdpPerCapita: 76399, co2Emissions: 14.4, lifeExpectancy: 77.5, humanDevIndex: 0.921, internetUsers: 92, renewableEnergy: 13, urbanPopulation: 83.1, healthExpenditure: 18.3, educationExpenditure: 6.1, forestArea: 33.9, accessElectricity: 100 },
  { id: "360", code: "ID", name: "Indonesia", population: 276, gdpPerCapita: 14535, co2Emissions: 2.3, lifeExpectancy: 71.9, humanDevIndex: 0.705, internetUsers: 62, renewableEnergy: 12, urbanPopulation: 57.9, healthExpenditure: 2.9, educationExpenditure: 3.5, forestArea: 49.1, accessElectricity: 99 },
  { id: "586", code: "PK", name: "Pakistan", population: 225, gdpPerCapita: 6470, co2Emissions: 1, lifeExpectancy: 67.3, humanDevIndex: 0.544, internetUsers: 21, renewableEnergy: 34, urbanPopulation: 37.4, healthExpenditure: 2.8, educationExpenditure: 2.3, forestArea: 1.9, accessElectricity: 95 },
  { id: "076", code: "BR", name: "Brazil", population: 215, gdpPerCapita: 16154, co2Emissions: 2.2, lifeExpectancy: 76, humanDevIndex: 0.754, internetUsers: 81, renewableEnergy: 47, urbanPopulation: 87.6, healthExpenditure: 10.3, educationExpenditure: 6.3, forestArea: 59.4, accessElectricity: 100 },
  { id: "566", code: "NG", name: "Nigeria", population: 219, gdpPerCapita: 5860, co2Emissions: 0.6, lifeExpectancy: 53.9, humanDevIndex: 0.535, internetUsers: 36, renewableEnergy: 86, urbanPopulation: 53, healthExpenditure: 3, educationExpenditure: 0.5, forestArea: 7.2, accessElectricity: 59.5 },
  { id: "050", code: "BD", name: "Bangladesh", population: 167, gdpPerCapita: 7066, co2Emissions: 0.6, lifeExpectancy: 73.2, humanDevIndex: 0.661, internetUsers: 39, renewableEnergy: 3, urbanPopulation: 39.4, healthExpenditure: 2.3, educationExpenditure: 1.8, forestArea: 11.2, accessElectricity: 99.4 },
  { id: "643", code: "RU", name: "Russia", population: 144, gdpPerCapita: 30820, co2Emissions: 11.4, lifeExpectancy: 72.8, humanDevIndex: 0.822, internetUsers: 85, renewableEnergy: 7, urbanPopulation: 75.1, healthExpenditure: 5.6, educationExpenditure: 3.7, forestArea: 49.8, accessElectricity: 100 },
  { id: "484", code: "MX", name: "Mexico", population: 130, gdpPerCapita: 20824, co2Emissions: 3.5, lifeExpectancy: 75.1, humanDevIndex: 0.758, internetUsers: 72, renewableEnergy: 9, urbanPopulation: 81, healthExpenditure: 5.4, educationExpenditure: 4.3, forestArea: 33.6, accessElectricity: 100 },
  { id: "392", code: "JP", name: "Japan", population: 125, gdpPerCapita: 45546, co2Emissions: 8.5, lifeExpectancy: 84.6, humanDevIndex: 0.925, internetUsers: 93, renewableEnergy: 12, urbanPopulation: 91.9, healthExpenditure: 11, educationExpenditure: 3.4, forestArea: 68.4, accessElectricity: 100 },
  { id: "231", code: "ET", name: "Ethiopia", population: 121, gdpPerCapita: 2771, co2Emissions: 0.2, lifeExpectancy: 66.6, humanDevIndex: 0.498, internetUsers: 17, renewableEnergy: 93, urbanPopulation: 22.2, healthExpenditure: 3.5, educationExpenditure: 4.5, forestArea: 12.5, accessElectricity: 51.1 },
  { id: "608", code: "PH", name: "Philippines", population: 115, gdpPerCapita: 9746, co2Emissions: 1.3, lifeExpectancy: 72.1, humanDevIndex: 0.699, internetUsers: 53, renewableEnergy: 29, urbanPopulation: 47.7, healthExpenditure: 5.1, educationExpenditure: 3.6, forestArea: 27, accessElectricity: 97.2 },
  { id: "818", code: "EG", name: "Egypt", population: 106, gdpPerCapita: 14927, co2Emissions: 2.4, lifeExpectancy: 72, humanDevIndex: 0.731, internetUsers: 72, renewableEnergy: 10, urbanPopulation: 42.8, healthExpenditure: 4.6, educationExpenditure: 4, forestArea: 0.1, accessElectricity: 100 },
  { id: "704", code: "VN", name: "Vietnam", population: 99, gdpPerCapita: 12756, co2Emissions: 3.5, lifeExpectancy: 75.8, humanDevIndex: 0.703, internetUsers: 70, renewableEnergy: 21, urbanPopulation: 38.1, healthExpenditure: 4.7, educationExpenditure: 4.2, forestArea: 47.6, accessElectricity: 100 },
  // Europe
  { id: "276", code: "DE", name: "Germany", population: 84, gdpPerCapita: 58780, co2Emissions: 8.1, lifeExpectancy: 81.4, humanDevIndex: 0.942, internetUsers: 93, renewableEnergy: 20, urbanPopulation: 77.6, healthExpenditure: 12.8, educationExpenditure: 4.9, forestArea: 32.7, accessElectricity: 100 },
  { id: "792", code: "TR", name: "Turkey", population: 85, gdpPerCapita: 36879, co2Emissions: 4.8, lifeExpectancy: 78.6, humanDevIndex: 0.838, internetUsers: 83, renewableEnergy: 17, urbanPopulation: 76.6, healthExpenditure: 4.3, educationExpenditure: 3.1, forestArea: 28.6, accessElectricity: 100 },
  { id: "364", code: "IR", name: "Iran", population: 87, gdpPerCapita: 16261, co2Emissions: 8.3, lifeExpectancy: 76.7, humanDevIndex: 0.774, internetUsers: 78, renewableEnergy: 6, urbanPopulation: 76.3, healthExpenditure: 5.2, educationExpenditure: 3.6, forestArea: 6.6, accessElectricity: 100 },
  { id: "764", code: "TH", name: "Thailand", population: 70, gdpPerCapita: 19169, co2Emissions: 3.8, lifeExpectancy: 79.3, humanDevIndex: 0.8, internetUsers: 78, renewableEnergy: 15, urbanPopulation: 52.2, healthExpenditure: 3.8, educationExpenditure: 2.9, forestArea: 38.8, accessElectricity: 100 },
  { id: "826", code: "GB", name: "United Kingdom", population: 68, gdpPerCapita: 49675, co2Emissions: 4.7, lifeExpectancy: 81.8, humanDevIndex: 0.929, internetUsers: 97, renewableEnergy: 15, urbanPopulation: 84.2, healthExpenditure: 12, educationExpenditure: 5.5, forestArea: 13.2, accessElectricity: 100 },
  { id: "250", code: "FR", name: "France", population: 68, gdpPerCapita: 50728, co2Emissions: 4.3, lifeExpectancy: 82.7, humanDevIndex: 0.903, internetUsers: 91, renewableEnergy: 12, urbanPopulation: 81.5, healthExpenditure: 12.2, educationExpenditure: 5.5, forestArea: 31.4, accessElectricity: 100 },
  { id: "380", code: "IT", name: "Italy", population: 59, gdpPerCapita: 45936, co2Emissions: 5.3, lifeExpectancy: 83.5, humanDevIndex: 0.895, internetUsers: 86, renewableEnergy: 20, urbanPopulation: 71.3, healthExpenditure: 8.7, educationExpenditure: 4.3, forestArea: 32.1, accessElectricity: 100 },
  { id: "710", code: "ZA", name: "South Africa", population: 60, gdpPerCapita: 15e3, co2Emissions: 6.7, lifeExpectancy: 65.3, humanDevIndex: 0.713, internetUsers: 70, renewableEnergy: 6, urbanPopulation: 68, healthExpenditure: 8.1, educationExpenditure: 6.6, forestArea: 7.6, accessElectricity: 85 },
  { id: "834", code: "TZ", name: "Tanzania", population: 63, gdpPerCapita: 2990, co2Emissions: 0.2, lifeExpectancy: 66.2, humanDevIndex: 0.549, internetUsers: 25, renewableEnergy: 85, urbanPopulation: 37, healthExpenditure: 3.8, educationExpenditure: 3.4, forestArea: 48.1, accessElectricity: 42.7 },
  { id: "404", code: "KE", name: "Kenya", population: 55, gdpPerCapita: 5494, co2Emissions: 0.4, lifeExpectancy: 67, humanDevIndex: 0.575, internetUsers: 29, renewableEnergy: 75, urbanPopulation: 28.5, healthExpenditure: 4.3, educationExpenditure: 5.1, forestArea: 7.8, accessElectricity: 75 },
  { id: "410", code: "KR", name: "South Korea", population: 52, gdpPerCapita: 50071, co2Emissions: 11.5, lifeExpectancy: 83.7, humanDevIndex: 0.925, internetUsers: 97, renewableEnergy: 4, urbanPopulation: 81.4, healthExpenditure: 8.4, educationExpenditure: 5.1, forestArea: 63.4, accessElectricity: 100 },
  { id: "170", code: "CO", name: "Colombia", population: 52, gdpPerCapita: 17063, co2Emissions: 1.8, lifeExpectancy: 77.3, humanDevIndex: 0.752, internetUsers: 73, renewableEnergy: 27, urbanPopulation: 81.7, healthExpenditure: 7.7, educationExpenditure: 4.5, forestArea: 52.7, accessElectricity: 100 },
  { id: "724", code: "ES", name: "Spain", population: 47, gdpPerCapita: 42190, co2Emissions: 5, lifeExpectancy: 83.6, humanDevIndex: 0.905, internetUsers: 94, renewableEnergy: 21, urbanPopulation: 81.1, healthExpenditure: 10.7, educationExpenditure: 4.8, forestArea: 37.4, accessElectricity: 100 },
  { id: "032", code: "AR", name: "Argentina", population: 46, gdpPerCapita: 24678, co2Emissions: 3.8, lifeExpectancy: 77.1, humanDevIndex: 0.842, internetUsers: 87, renewableEnergy: 13, urbanPopulation: 92.2, healthExpenditure: 10, educationExpenditure: 5, forestArea: 10.5, accessElectricity: 100 },
  { id: "800", code: "UG", name: "Uganda", population: 48, gdpPerCapita: 2566, co2Emissions: 0.1, lifeExpectancy: 64.4, humanDevIndex: 0.525, internetUsers: 18, renewableEnergy: 89, urbanPopulation: 25.6, healthExpenditure: 3.8, educationExpenditure: 2.7, forestArea: 9.7, accessElectricity: 46 },
  { id: "012", code: "DZ", name: "Algeria", population: 45, gdpPerCapita: 12667, co2Emissions: 3.7, lifeExpectancy: 77.1, humanDevIndex: 0.745, internetUsers: 71, renewableEnergy: 1, urbanPopulation: 74.3, healthExpenditure: 5.3, educationExpenditure: 5.6, forestArea: 0.8, accessElectricity: 100 },
  { id: "804", code: "UA", name: "Ukraine", population: 41, gdpPerCapita: 14220, co2Emissions: 4.5, lifeExpectancy: 72.1, humanDevIndex: 0.773, internetUsers: 75, renewableEnergy: 8, urbanPopulation: 69.6, healthExpenditure: 7, educationExpenditure: 5.4, forestArea: 16.7, accessElectricity: 100 },
  { id: "368", code: "IQ", name: "Iraq", population: 43, gdpPerCapita: 10474, co2Emissions: 4, lifeExpectancy: 71.1, humanDevIndex: 0.686, internetUsers: 75, renewableEnergy: 3, urbanPopulation: 71.1, healthExpenditure: 4.6, educationExpenditure: 4.7, forestArea: 1.9, accessElectricity: 100 },
  { id: "616", code: "PL", name: "Poland", population: 38, gdpPerCapita: 40343, co2Emissions: 8, lifeExpectancy: 78.7, humanDevIndex: 0.876, internetUsers: 87, renewableEnergy: 17, urbanPopulation: 60, healthExpenditure: 6.5, educationExpenditure: 4.6, forestArea: 30.9, accessElectricity: 100 },
  { id: "124", code: "CA", name: "Canada", population: 39, gdpPerCapita: 54966, co2Emissions: 14.3, lifeExpectancy: 82.4, humanDevIndex: 0.936, internetUsers: 93, renewableEnergy: 18, urbanPopulation: 81.8, healthExpenditure: 12.8, educationExpenditure: 5.3, forestArea: 38.7, accessElectricity: 100 },
  { id: "504", code: "MA", name: "Morocco", population: 37, gdpPerCapita: 9339, co2Emissions: 1.9, lifeExpectancy: 77, humanDevIndex: 0.683, internetUsers: 84, renewableEnergy: 13, urbanPopulation: 64.6, healthExpenditure: 5.3, educationExpenditure: 6.8, forestArea: 12.8, accessElectricity: 100 },
  { id: "682", code: "SA", name: "Saudi Arabia", population: 36, gdpPerCapita: 56817, co2Emissions: 15.3, lifeExpectancy: 76.9, humanDevIndex: 0.875, internetUsers: 98, renewableEnergy: 0, urbanPopulation: 84.7, healthExpenditure: 6.4, educationExpenditure: 5.1, forestArea: 0.5, accessElectricity: 100 },
  { id: "604", code: "PE", name: "Peru", population: 34, gdpPerCapita: 14225, co2Emissions: 1.6, lifeExpectancy: 77.4, humanDevIndex: 0.762, internetUsers: 71, renewableEnergy: 25, urbanPopulation: 78.6, healthExpenditure: 5.2, educationExpenditure: 4, forestArea: 57.3, accessElectricity: 97 },
  { id: "036", code: "AU", name: "Australia", population: 26, gdpPerCapita: 59934, co2Emissions: 15, lifeExpectancy: 84, humanDevIndex: 0.951, internetUsers: 96, renewableEnergy: 12, urbanPopulation: 86.4, healthExpenditure: 10.7, educationExpenditure: 6.1, forestArea: 17.4, accessElectricity: 100 },
  { id: "458", code: "MY", name: "Malaysia", population: 34, gdpPerCapita: 33550, co2Emissions: 7.6, lifeExpectancy: 76.9, humanDevIndex: 0.803, internetUsers: 90, renewableEnergy: 8, urbanPopulation: 78, healthExpenditure: 3.8, educationExpenditure: 3.9, forestArea: 57.7, accessElectricity: 100 },
  { id: "288", code: "GH", name: "Ghana", population: 33, gdpPerCapita: 6754, co2Emissions: 0.6, lifeExpectancy: 64.9, humanDevIndex: 0.632, internetUsers: 53, renewableEnergy: 42, urbanPopulation: 58, healthExpenditure: 3.4, educationExpenditure: 4, forestArea: 34.5, accessElectricity: 85.9 },
  { id: "524", code: "NP", name: "Nepal", population: 30, gdpPerCapita: 4199, co2Emissions: 0.5, lifeExpectancy: 71.7, humanDevIndex: 0.602, internetUsers: 48, renewableEnergy: 86, urbanPopulation: 21, healthExpenditure: 4.4, educationExpenditure: 4.2, forestArea: 25.4, accessElectricity: 90 },
  { id: "862", code: "VE", name: "Venezuela", population: 29, gdpPerCapita: 7045, co2Emissions: 3.1, lifeExpectancy: 72.1, humanDevIndex: 0.691, internetUsers: 72, renewableEnergy: 68, urbanPopulation: 88.3, healthExpenditure: 3.9, educationExpenditure: 6.9, forestArea: 52.1, accessElectricity: 99.9 },
  { id: "450", code: "MG", name: "Madagascar", population: 29, gdpPerCapita: 1724, co2Emissions: 0.2, lifeExpectancy: 67, humanDevIndex: 0.501, internetUsers: 10, renewableEnergy: 68, urbanPopulation: 39.5, healthExpenditure: 3.9, educationExpenditure: 2.9, forestArea: 21.4, accessElectricity: 34 },
  { id: "120", code: "CM", name: "Cameroon", population: 28, gdpPerCapita: 3977, co2Emissions: 0.4, lifeExpectancy: 60.3, humanDevIndex: 0.576, internetUsers: 34, renewableEnergy: 74, urbanPopulation: 58.4, healthExpenditure: 3.3, educationExpenditure: 3.2, forestArea: 45.6, accessElectricity: 65 },
  // Nordic & small high-HDI
  { id: "528", code: "NL", name: "Netherlands", population: 18, gdpPerCapita: 64654, co2Emissions: 8.1, lifeExpectancy: 82.3, humanDevIndex: 0.941, internetUsers: 98, renewableEnergy: 13, urbanPopulation: 92.5, healthExpenditure: 11.2, educationExpenditure: 5.3, forestArea: 11.2, accessElectricity: 100 },
  { id: "152", code: "CL", name: "Chile", population: 19, gdpPerCapita: 28526, co2Emissions: 4.3, lifeExpectancy: 80.7, humanDevIndex: 0.855, internetUsers: 88, renewableEnergy: 27, urbanPopulation: 87.9, healthExpenditure: 9.3, educationExpenditure: 5.4, forestArea: 24.4, accessElectricity: 100 },
  { id: "752", code: "SE", name: "Sweden", population: 10, gdpPerCapita: 60239, co2Emissions: 3.5, lifeExpectancy: 83.2, humanDevIndex: 0.947, internetUsers: 96, renewableEnergy: 56, urbanPopulation: 88.2, healthExpenditure: 11.4, educationExpenditure: 7.6, forestArea: 68.9, accessElectricity: 100 },
  { id: "578", code: "NO", name: "Norway", population: 5, gdpPerCapita: 82236, co2Emissions: 7.5, lifeExpectancy: 83.2, humanDevIndex: 0.961, internetUsers: 98, renewableEnergy: 72, urbanPopulation: 83.4, healthExpenditure: 11.4, educationExpenditure: 7.9, forestArea: 33.2, accessElectricity: 100 },
  { id: "702", code: "SG", name: "Singapore", population: 6, gdpPerCapita: 116527, co2Emissions: 8.9, lifeExpectancy: 84.1, humanDevIndex: 0.939, internetUsers: 96, renewableEnergy: 2, urbanPopulation: 100, healthExpenditure: 6.1, educationExpenditure: 2.9, forestArea: 22.5, accessElectricity: 100 },
  { id: "554", code: "NZ", name: "New Zealand", population: 5, gdpPerCapita: 48249, co2Emissions: 6.8, lifeExpectancy: 82.5, humanDevIndex: 0.937, internetUsers: 95, renewableEnergy: 40, urbanPopulation: 86.7, healthExpenditure: 9.7, educationExpenditure: 6.3, forestArea: 38.6, accessElectricity: 100 },
  { id: "372", code: "IE", name: "Ireland", population: 5, gdpPerCapita: 106998, co2Emissions: 7.3, lifeExpectancy: 82.8, humanDevIndex: 0.945, internetUsers: 94, renewableEnergy: 14, urbanPopulation: 64.2, healthExpenditure: 7.1, educationExpenditure: 3.5, forestArea: 11, accessElectricity: 100 },
  { id: "376", code: "IL", name: "Israel", population: 9, gdpPerCapita: 52170, co2Emissions: 6.9, lifeExpectancy: 83.5, humanDevIndex: 0.919, internetUsers: 90, renewableEnergy: 6, urbanPopulation: 92.8, healthExpenditure: 7.5, educationExpenditure: 7.1, forestArea: 7.6, accessElectricity: 100 },
  { id: "784", code: "AE", name: "United Arab Emirates", population: 10, gdpPerCapita: 77272, co2Emissions: 20.7, lifeExpectancy: 78.7, humanDevIndex: 0.911, internetUsers: 100, renewableEnergy: 1, urbanPopulation: 87.4, healthExpenditure: 5, educationExpenditure: 3.9, forestArea: 4.5, accessElectricity: 100 },
  { id: "756", code: "CH", name: "Switzerland", population: 9, gdpPerCapita: 81867, co2Emissions: 4, lifeExpectancy: 84, humanDevIndex: 0.962, internetUsers: 96, renewableEnergy: 28, urbanPopulation: 74, healthExpenditure: 11.3, educationExpenditure: 5, forestArea: 31.9, accessElectricity: 100 },
  { id: "040", code: "AT", name: "Austria", population: 9, gdpPerCapita: 58013, co2Emissions: 6.8, lifeExpectancy: 82, humanDevIndex: 0.916, internetUsers: 93, renewableEnergy: 36, urbanPopulation: 59, healthExpenditure: 10.4, educationExpenditure: 5.4, forestArea: 47.3, accessElectricity: 100 },
  { id: "620", code: "PT", name: "Portugal", population: 10, gdpPerCapita: 38147, co2Emissions: 4, lifeExpectancy: 82.6, humanDevIndex: 0.866, internetUsers: 85, renewableEnergy: 34, urbanPopulation: 66.8, healthExpenditure: 10.6, educationExpenditure: 5, forestArea: 36.1, accessElectricity: 100 },
  { id: "300", code: "GR", name: "Greece", population: 10, gdpPerCapita: 33393, co2Emissions: 5.3, lifeExpectancy: 81.4, humanDevIndex: 0.887, internetUsers: 79, renewableEnergy: 22, urbanPopulation: 80.1, healthExpenditure: 7.8, educationExpenditure: 4.4, forestArea: 32.5, accessElectricity: 100 },
  { id: "203", code: "CZ", name: "Czech Republic", population: 11, gdpPerCapita: 45499, co2Emissions: 9.3, lifeExpectancy: 79.4, humanDevIndex: 0.889, internetUsers: 88, renewableEnergy: 17, urbanPopulation: 74.1, healthExpenditure: 9.2, educationExpenditure: 4.4, forestArea: 34.7, accessElectricity: 100 },
  { id: "056", code: "BE", name: "Belgium", population: 12, gdpPerCapita: 55521, co2Emissions: 8, lifeExpectancy: 82.2, humanDevIndex: 0.937, internetUsers: 94, renewableEnergy: 13, urbanPopulation: 98.1, healthExpenditure: 11.1, educationExpenditure: 6.4, forestArea: 22.8, accessElectricity: 100 },
  { id: "348", code: "HU", name: "Hungary", population: 10, gdpPerCapita: 37935, co2Emissions: 4.6, lifeExpectancy: 77, humanDevIndex: 0.846, internetUsers: 89, renewableEnergy: 14, urbanPopulation: 72.3, healthExpenditure: 6.4, educationExpenditure: 4.6, forestArea: 22.9, accessElectricity: 100 },
  { id: "246", code: "FI", name: "Finland", population: 6, gdpPerCapita: 53654, co2Emissions: 6.5, lifeExpectancy: 82.2, humanDevIndex: 0.94, internetUsers: 96, renewableEnergy: 44, urbanPopulation: 85.5, healthExpenditure: 9.6, educationExpenditure: 6.3, forestArea: 73.7, accessElectricity: 100 },
  { id: "208", code: "DK", name: "Denmark", population: 6, gdpPerCapita: 67803, co2Emissions: 4.4, lifeExpectancy: 81.6, humanDevIndex: 0.948, internetUsers: 98, renewableEnergy: 40, urbanPopulation: 88.2, healthExpenditure: 10.5, educationExpenditure: 6.9, forestArea: 14.7, accessElectricity: 100 },
  { id: "352", code: "IS", name: "Iceland", population: 0.4, gdpPerCapita: 68727, co2Emissions: 9.7, lifeExpectancy: 83.1, humanDevIndex: 0.959, internetUsers: 99, renewableEnergy: 85, urbanPopulation: 93.9, healthExpenditure: 8.9, educationExpenditure: 7.7, forestArea: 0.5, accessElectricity: 100 },
  // Africa
  { id: "180", code: "CD", name: "DR Congo", population: 99, gdpPerCapita: 1099, co2Emissions: 0.04, lifeExpectancy: 60.7, humanDevIndex: 0.479, internetUsers: 9, renewableEnergy: 97, urbanPopulation: 46.2, healthExpenditure: 3.3, educationExpenditure: 1.5, forestArea: 67.3, accessElectricity: 19.1 },
  { id: "729", code: "SD", name: "Sudan", population: 46, gdpPerCapita: 4232, co2Emissions: 0.5, lifeExpectancy: 66.1, humanDevIndex: 0.508, internetUsers: 31, renewableEnergy: 62, urbanPopulation: 35.6, healthExpenditure: 4.5, educationExpenditure: 2.2, forestArea: 9.7, accessElectricity: 55.5 },
  { id: "024", code: "AO", name: "Angola", population: 35, gdpPerCapita: 6938, co2Emissions: 0.8, lifeExpectancy: 62, humanDevIndex: 0.586, internetUsers: 36, renewableEnergy: 55, urbanPopulation: 68.1, healthExpenditure: 2.6, educationExpenditure: 2.4, forestArea: 46.3, accessElectricity: 46 },
  { id: "508", code: "MZ", name: "Mozambique", population: 33, gdpPerCapita: 1346, co2Emissions: 0.2, lifeExpectancy: 60.9, humanDevIndex: 0.456, internetUsers: 10, renewableEnergy: 79, urbanPopulation: 38, healthExpenditure: 7.5, educationExpenditure: 5.5, forestArea: 48.2, accessElectricity: 31 },
  { id: "384", code: "CI", name: "Ivory Coast", population: 28, gdpPerCapita: 5972, co2Emissions: 0.4, lifeExpectancy: 59.3, humanDevIndex: 0.55, internetUsers: 45, renewableEnergy: 68, urbanPopulation: 52.7, healthExpenditure: 3.3, educationExpenditure: 3.4, forestArea: 9.3, accessElectricity: 70 },
  { id: "562", code: "NE", name: "Niger", population: 26, gdpPerCapita: 1318, co2Emissions: 0.1, lifeExpectancy: 63, humanDevIndex: 0.4, internetUsers: 5, renewableEnergy: 80, urbanPopulation: 16.8, healthExpenditure: 5.2, educationExpenditure: 3.5, forestArea: 0.9, accessElectricity: 19.3 },
  { id: "854", code: "BF", name: "Burkina Faso", population: 22, gdpPerCapita: 2445, co2Emissions: 0.2, lifeExpectancy: 62.7, humanDevIndex: 0.449, internetUsers: 18, renewableEnergy: 79, urbanPopulation: 31.5, healthExpenditure: 5.6, educationExpenditure: 5.4, forestArea: 19.3, accessElectricity: 19 },
  { id: "466", code: "ML", name: "Mali", population: 22, gdpPerCapita: 2462, co2Emissions: 0.2, lifeExpectancy: 59.3, humanDevIndex: 0.428, internetUsers: 27, renewableEnergy: 76, urbanPopulation: 44.6, healthExpenditure: 3.8, educationExpenditure: 3.8, forestArea: 3.9, accessElectricity: 53 },
  { id: "686", code: "SN", name: "Senegal", population: 17, gdpPerCapita: 3942, co2Emissions: 0.7, lifeExpectancy: 68.6, humanDevIndex: 0.511, internetUsers: 58, renewableEnergy: 47, urbanPopulation: 48.6, healthExpenditure: 3.5, educationExpenditure: 5.5, forestArea: 42.5, accessElectricity: 70.4 },
  { id: "894", code: "ZM", name: "Zambia", population: 20, gdpPerCapita: 3574, co2Emissions: 0.4, lifeExpectancy: 65, humanDevIndex: 0.565, internetUsers: 16, renewableEnergy: 88, urbanPopulation: 45.2, healthExpenditure: 4.9, educationExpenditure: 4.6, forestArea: 59.8, accessElectricity: 43 },
  { id: "716", code: "ZW", name: "Zimbabwe", population: 16, gdpPerCapita: 2622, co2Emissions: 0.8, lifeExpectancy: 61.5, humanDevIndex: 0.593, internetUsers: 35, renewableEnergy: 78, urbanPopulation: 32.2, healthExpenditure: 3.4, educationExpenditure: 5, forestArea: 36.4, accessElectricity: 49 },
  { id: "646", code: "RW", name: "Rwanda", population: 14, gdpPerCapita: 2359, co2Emissions: 0.1, lifeExpectancy: 69.6, humanDevIndex: 0.534, internetUsers: 30, renewableEnergy: 84, urbanPopulation: 17.6, healthExpenditure: 7.5, educationExpenditure: 3.1, forestArea: 28.8, accessElectricity: 48 },
  // Asia
  { id: "004", code: "AF", name: "Afghanistan", population: 41, gdpPerCapita: 2065, co2Emissions: 0.2, lifeExpectancy: 62, humanDevIndex: 0.478, internetUsers: 18, renewableEnergy: 45, urbanPopulation: 26.3, healthExpenditure: 18.2, educationExpenditure: 4.1, forestArea: 1.9, accessElectricity: 97.7 },
  { id: "104", code: "MM", name: "Myanmar", population: 55, gdpPerCapita: 5699, co2Emissions: 0.6, lifeExpectancy: 67.8, humanDevIndex: 0.585, internetUsers: 44, renewableEnergy: 51, urbanPopulation: 31.4, healthExpenditure: 4.8, educationExpenditure: 2, forestArea: 42.2, accessElectricity: 70 },
  { id: "408", code: "KP", name: "North Korea", population: 26, gdpPerCapita: 1800, co2Emissions: 2, lifeExpectancy: 72.6, humanDevIndex: 0.733, internetUsers: 0, renewableEnergy: 12, urbanPopulation: 63, healthExpenditure: 6, educationExpenditure: 4, forestArea: 41, accessElectricity: 26 },
  { id: "496", code: "MN", name: "Mongolia", population: 3.4, gdpPerCapita: 12896, co2Emissions: 14, lifeExpectancy: 70.9, humanDevIndex: 0.739, internetUsers: 84, renewableEnergy: 7, urbanPopulation: 68.8, healthExpenditure: 4, educationExpenditure: 4.7, forestArea: 7.1, accessElectricity: 100 },
  { id: "144", code: "LK", name: "Sri Lanka", population: 22, gdpPerCapita: 14509, co2Emissions: 1, lifeExpectancy: 77.4, humanDevIndex: 0.782, internetUsers: 47, renewableEnergy: 51, urbanPopulation: 18.9, healthExpenditure: 3.8, educationExpenditure: 2.1, forestArea: 29.4, accessElectricity: 100 },
  { id: "398", code: "KZ", name: "Kazakhstan", population: 19, gdpPerCapita: 30500, co2Emissions: 13.2, lifeExpectancy: 74.4, humanDevIndex: 0.811, internetUsers: 91, renewableEnergy: 2, urbanPopulation: 57.8, healthExpenditure: 2.8, educationExpenditure: 2.9, forestArea: 1.2, accessElectricity: 100 },
  { id: "860", code: "UZ", name: "Uzbekistan", population: 35, gdpPerCapita: 9127, co2Emissions: 3.5, lifeExpectancy: 73.8, humanDevIndex: 0.727, internetUsers: 71, renewableEnergy: 11, urbanPopulation: 50.4, healthExpenditure: 6.8, educationExpenditure: 5.3, forestArea: 7.7, accessElectricity: 100 },
  // Latin America
  { id: "192", code: "CU", name: "Cuba", population: 11, gdpPerCapita: 9478, co2Emissions: 2.3, lifeExpectancy: 79, humanDevIndex: 0.764, internetUsers: 71, renewableEnergy: 32, urbanPopulation: 77.2, healthExpenditure: 11.7, educationExpenditure: 12.8, forestArea: 33, accessElectricity: 100 },
  { id: "218", code: "EC", name: "Ecuador", population: 18, gdpPerCapita: 12171, co2Emissions: 2.3, lifeExpectancy: 77.9, humanDevIndex: 0.74, internetUsers: 70, renewableEnergy: 31, urbanPopulation: 64.2, healthExpenditure: 8.3, educationExpenditure: 4.4, forestArea: 50.1, accessElectricity: 100 },
  { id: "320", code: "GT", name: "Guatemala", population: 18, gdpPerCapita: 9547, co2Emissions: 1, lifeExpectancy: 74.3, humanDevIndex: 0.627, internetUsers: 51, renewableEnergy: 62, urbanPopulation: 52.4, healthExpenditure: 5.8, educationExpenditure: 3.4, forestArea: 33, accessElectricity: 98 },
  { id: "068", code: "BO", name: "Bolivia", population: 12, gdpPerCapita: 9484, co2Emissions: 1.8, lifeExpectancy: 72.1, humanDevIndex: 0.692, internetUsers: 66, renewableEnergy: 24, urbanPopulation: 70.4, healthExpenditure: 6.9, educationExpenditure: 7.3, forestArea: 50.1, accessElectricity: 99.3 },
  { id: "340", code: "HN", name: "Honduras", population: 10, gdpPerCapita: 6289, co2Emissions: 1, lifeExpectancy: 75.3, humanDevIndex: 0.621, internetUsers: 48, renewableEnergy: 61, urbanPopulation: 59, healthExpenditure: 7.9, educationExpenditure: 6.1, forestArea: 38.1, accessElectricity: 94 },
  { id: "600", code: "PY", name: "Paraguay", population: 7, gdpPerCapita: 15030, co2Emissions: 1.1, lifeExpectancy: 74.3, humanDevIndex: 0.717, internetUsers: 77, renewableEnergy: 78, urbanPopulation: 62.5, healthExpenditure: 7.6, educationExpenditure: 3.4, forestArea: 38.6, accessElectricity: 100 },
  { id: "858", code: "UY", name: "Uruguay", population: 3.5, gdpPerCapita: 25041, co2Emissions: 2, lifeExpectancy: 78.4, humanDevIndex: 0.83, internetUsers: 87, renewableEnergy: 55, urbanPopulation: 95.6, healthExpenditure: 9.3, educationExpenditure: 5, forestArea: 10.5, accessElectricity: 100 },
  { id: "188", code: "CR", name: "Costa Rica", population: 5, gdpPerCapita: 23101, co2Emissions: 1.5, lifeExpectancy: 80.8, humanDevIndex: 0.809, internetUsers: 81, renewableEnergy: 73, urbanPopulation: 81.4, healthExpenditure: 7.3, educationExpenditure: 6.7, forestArea: 59, accessElectricity: 100 },
  { id: "591", code: "PA", name: "Panama", population: 4.4, gdpPerCapita: 35317, co2Emissions: 2.5, lifeExpectancy: 79.2, humanDevIndex: 0.805, internetUsers: 68, renewableEnergy: 35, urbanPopulation: 68.4, healthExpenditure: 7.3, educationExpenditure: 3.2, forestArea: 62.1, accessElectricity: 95 }
], tr = [
  {
    id: "humanDevIndex",
    name: "Human Development Index",
    unit: "",
    description: "UN composite index of life expectancy, education, and income",
    colorScale: ["#fee5d9", "#fcae91", "#cb181d"],
    domain: [0.4, 1],
    accessor: (o) => o.humanDevIndex,
    format: (o) => o.toFixed(3)
  },
  {
    id: "gdpPerCapita",
    name: "GDP per Capita (PPP)",
    unit: "$",
    description: "Purchasing power parity adjusted GDP per person",
    colorScale: ["#edf8e9", "#74c476", "#006d2c"],
    domain: [1e3, 8e4],
    accessor: (o) => o.gdpPerCapita,
    format: (o) => `$${(o / 1e3).toFixed(1)}k`
  },
  {
    id: "co2Emissions",
    name: "CO₂ Emissions",
    unit: "t/capita",
    description: "Carbon dioxide emissions per capita",
    colorScale: ["#f7fbff", "#6baed6", "#08306b"],
    domain: [0, 20],
    accessor: (o) => o.co2Emissions,
    format: (o) => `${o.toFixed(1)}t`
  },
  {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Average life expectancy at birth",
    colorScale: ["#feedde", "#fdbe85", "#d94701"],
    domain: [55, 85],
    accessor: (o) => o.lifeExpectancy,
    format: (o) => `${o.toFixed(1)} yrs`
  },
  {
    id: "renewableEnergy",
    name: "Renewable Energy",
    unit: "%",
    description: "Share of renewable energy in total energy consumption",
    colorScale: ["#f7fcf5", "#74c476", "#00441b"],
    domain: [0, 100],
    accessor: (o) => o.renewableEnergy,
    format: (o) => `${o.toFixed(0)}%`
  },
  {
    id: "internetUsers",
    name: "Internet Penetration",
    unit: "%",
    description: "Percentage of population using the internet",
    colorScale: ["#f2f0f7", "#9e9ac8", "#54278f"],
    domain: [0, 100],
    accessor: (o) => o.internetUsers,
    format: (o) => `${o.toFixed(0)}%`
  },
  {
    id: "urbanPopulation",
    name: "Urbanization",
    unit: "%",
    description: "Percentage of population living in urban areas",
    colorScale: ["#fff5eb", "#fd8d3c", "#7f2704"],
    domain: [15, 100],
    accessor: (o) => o.urbanPopulation,
    format: (o) => `${o.toFixed(0)}%`
  },
  {
    id: "healthExpenditure",
    name: "Health Spending",
    unit: "% GDP",
    description: "Total health expenditure as percentage of GDP",
    colorScale: ["#fff5f0", "#fb6a4a", "#99000d"],
    domain: [2, 18],
    accessor: (o) => o.healthExpenditure,
    format: (o) => `${o.toFixed(1)}%`
  },
  {
    id: "forestArea",
    name: "Forest Coverage",
    unit: "%",
    description: "Forest area as percentage of total land area",
    colorScale: ["#f7fcf5", "#41ab5d", "#00441b"],
    domain: [0, 75],
    accessor: (o) => o.forestArea,
    format: (o) => `${o.toFixed(0)}%`
  },
  {
    id: "accessElectricity",
    name: "Electricity Access",
    unit: "%",
    description: "Percentage of population with access to electricity",
    colorScale: ["#ffffd4", "#fed98e", "#cc4c02"],
    domain: [15, 100],
    accessor: (o) => o.accessElectricity,
    format: (o) => `${o.toFixed(0)}%`
  }
];
function Ys(o, e) {
  const [t, i] = o.domain;
  return Math.max(0, Math.min(1, (e - t) / (i - t)));
}
const Ws = {
  // North America
  US: "840",
  USA: "840",
  "UNITED STATES": "840",
  AMERICA: "840",
  CA: "124",
  CAN: "124",
  CANADA: "124",
  MX: "484",
  MEX: "484",
  MEXICO: "484",
  // Europe
  DE: "276",
  DEU: "276",
  GERMANY: "276",
  DEUTSCHLAND: "276",
  FR: "250",
  FRA: "250",
  FRANCE: "250",
  GB: "826",
  GBR: "826",
  UK: "826",
  "UNITED KINGDOM": "826",
  BRITAIN: "826",
  ENGLAND: "826",
  IT: "380",
  ITA: "380",
  ITALY: "380",
  ES: "724",
  ESP: "724",
  SPAIN: "724",
  PT: "620",
  PRT: "620",
  PORTUGAL: "620",
  NL: "528",
  NLD: "528",
  NETHERLANDS: "528",
  HOLLAND: "528",
  BE: "056",
  BEL: "056",
  BELGIUM: "056",
  AT: "040",
  AUT: "040",
  AUSTRIA: "040",
  CH: "756",
  CHE: "756",
  SWITZERLAND: "756",
  PL: "616",
  POL: "616",
  POLAND: "616",
  SE: "752",
  SWE: "752",
  SWEDEN: "752",
  NO: "578",
  NOR: "578",
  NORWAY: "578",
  DK: "208",
  DNK: "208",
  DENMARK: "208",
  FI: "246",
  FIN: "246",
  FINLAND: "246",
  IE: "372",
  IRL: "372",
  IRELAND: "372",
  GR: "300",
  GRC: "300",
  GREECE: "300",
  CZ: "203",
  CZE: "203",
  "CZECH REPUBLIC": "203",
  CZECHIA: "203",
  RO: "642",
  ROU: "642",
  ROMANIA: "642",
  HU: "348",
  HUN: "348",
  HUNGARY: "348",
  UA: "804",
  UKR: "804",
  UKRAINE: "804",
  RU: "643",
  RUS: "643",
  RUSSIA: "643",
  "RUSSIAN FEDERATION": "643",
  // Asia
  CN: "156",
  CHN: "156",
  CHINA: "156",
  JP: "392",
  JPN: "392",
  JAPAN: "392",
  KR: "410",
  KOR: "410",
  "SOUTH KOREA": "410",
  KOREA: "410",
  IN: "356",
  IND: "356",
  INDIA: "356",
  ID: "360",
  IDN: "360",
  INDONESIA: "360",
  TH: "764",
  THA: "764",
  THAILAND: "764",
  VN: "704",
  VNM: "704",
  VIETNAM: "704",
  PH: "608",
  PHL: "608",
  PHILIPPINES: "608",
  MY: "458",
  MYS: "458",
  MALAYSIA: "458",
  SG: "702",
  SGP: "702",
  SINGAPORE: "702",
  PK: "586",
  PAK: "586",
  PAKISTAN: "586",
  BD: "050",
  BGD: "050",
  BANGLADESH: "050",
  TR: "792",
  TUR: "792",
  TURKEY: "792",
  TURKIYE: "792",
  SA: "682",
  SAU: "682",
  "SAUDI ARABIA": "682",
  AE: "784",
  ARE: "784",
  UAE: "784",
  "UNITED ARAB EMIRATES": "784",
  IL: "376",
  ISR: "376",
  ISRAEL: "376",
  IR: "364",
  IRN: "364",
  IRAN: "364",
  IQ: "368",
  IRQ: "368",
  IRAQ: "368",
  // Oceania
  AU: "036",
  AUS: "036",
  AUSTRALIA: "036",
  NZ: "554",
  NZL: "554",
  "NEW ZEALAND": "554",
  // South America
  BR: "076",
  BRA: "076",
  BRAZIL: "076",
  AR: "032",
  ARG: "032",
  ARGENTINA: "032",
  CL: "152",
  CHL: "152",
  CHILE: "152",
  CO: "170",
  COL: "170",
  COLOMBIA: "170",
  PE: "604",
  PER: "604",
  PERU: "604",
  VE: "862",
  VEN: "862",
  VENEZUELA: "862",
  // Africa
  ZA: "710",
  ZAF: "710",
  "SOUTH AFRICA": "710",
  EG: "818",
  EGY: "818",
  EGYPT: "818",
  NG: "566",
  NGA: "566",
  NIGERIA: "566",
  KE: "404",
  KEN: "404",
  KENYA: "404",
  ET: "231",
  ETH: "231",
  ETHIOPIA: "231",
  MA: "504",
  MAR: "504",
  MOROCCO: "504",
  DZ: "012",
  DZA: "012",
  ALGERIA: "012",
  TN: "788",
  TUN: "788",
  TUNISIA: "788",
  GH: "288",
  GHA: "288",
  GHANA: "288"
};
function ir(o) {
  const e = o.toUpperCase().trim();
  return /^\d{1,3}$/.test(o) ? o.padStart(3, "0") : Ws[e] || o;
}
function Xs(o) {
  const e = {};
  return o instanceof Map ? o.forEach((t, i) => {
    e[ir(i)] = t;
  }) : Object.entries(o).forEach(([t, i]) => {
    e[ir(t)] = i;
  }), e;
}
const Ct = 4096, Pt = 2048, Zs = `
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
`;
class Ze {
  canvas;
  ctx;
  countries = [];
  loaded = !1;
  statsMap;
  featureLabels = [];
  topologyConfig;
  // State for progressive rendering
  currentRenderId = 0;
  // Callback for loading progress (0-1)
  onProgress;
  // Callback when texture has been updated (for progressive rendering)
  onTextureUpdate;
  // Static cache to share loaded topology data across instances
  static cache = /* @__PURE__ */ new Map();
  constructor(e, t, i) {
    this.canvas = document.createElement("canvas"), this.canvas.width = Ct, this.canvas.height = Pt, this.ctx = this.canvas.getContext("2d", { willReadFrequently: !0 }), this.onProgress = t, this.onTextureUpdate = i, this.topologyConfig = {
      url: e?.url ?? "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
      objectName: e?.objectName || "countries",
      disableNormalization: e?.disableNormalization || !1,
      idProperty: e?.idProperty,
      labelProperty: e?.labelProperty
    }, this.statsMap = /* @__PURE__ */ new Map(), hn.forEach((r) => {
      this.statsMap.set(r.id, r);
    }), this.loadCountries();
  }
  async loadCountries() {
    const e = `${this.topologyConfig.url}|${this.topologyConfig.objectName}|${this.topologyConfig.idProperty || ""}`;
    if (!this.topologyConfig.url) {
      this.loaded = !0, this.onProgress?.(1);
      return;
    }
    if (this.onProgress?.(0.1), !Ze.cache.has(e)) {
      const t = (async () => {
        try {
          let i;
          i = await this.loadInWorker(
            this.topologyConfig.url,
            this.topologyConfig.objectName,
            this.topologyConfig.idProperty
          ), this.onProgress?.(0.4);
          const r = 200, n = i.length;
          for (let s = 0; s < n; s += r) {
            i.slice(s, s + r).forEach((c) => {
              c.path = this.createPath(c);
            });
            const l = 0.4 + 0.6 * (s + r) / n;
            this.onProgress?.(Math.min(0.99, l)), await new Promise((c) => setTimeout(c, 0));
          }
          return console.log(
            `Loaded and processed ${i.length} boundaries from ${this.topologyConfig.objectName}`
          ), i;
        } catch (i) {
          throw console.error("Failed to load map boundaries:", i), i;
        }
      })();
      Ze.cache.set(e, t);
    }
    try {
      this.countries = await Ze.cache.get(e), this.loaded = !0, this.updateFeatureLabels(), this.onProgress?.(1);
    } catch (t) {
      Ze.cache.delete(e), console.error("Error loading cached topology:", t), this.loaded = !0;
    }
  }
  /**
   * Run fetch and topojson conversion in a Web Worker
   */
  loadInWorker(e, t, i) {
    return new Promise((r, n) => {
      const s = new Blob([Zs], { type: "application/javascript" }), a = URL.createObjectURL(s), l = new Worker(a), c = setTimeout(() => {
        l.terminate(), URL.revokeObjectURL(a), n(new Error(`Worker timed out after 15s loading ${t}`));
      }, 15e3);
      l.onmessage = (p) => {
        if (p.data.status) {
          this.onProgress?.(p.data.progress || 0, p.data.status);
          return;
        }
        clearTimeout(c), URL.revokeObjectURL(a), l.terminate(), p.data.success ? r(p.data.features) : n(new Error(p.data.error));
      }, l.onerror = (p) => {
        clearTimeout(c), URL.revokeObjectURL(a), l.terminate(), n(new Error("Worker error: " + p.message));
      };
      const u = new URL(e, window.location.href).href, h = new URL(
        "/lib/topojson-client.min.js",
        window.location.href
      ).href;
      l.postMessage({
        url: u,
        objectName: t,
        idProperty: i,
        topojsonUrl: h
      });
    });
  }
  /**
   * Wait for country data to load
   */
  async waitForLoad() {
    const e = Date.now();
    for (; !this.loaded; ) {
      if (Date.now() - e > 2e4) {
        console.error(
          "ChoroplethRenderer.waitForLoad timed out after 20s. Forcing continuation."
        ), this.loaded = !0;
        break;
      }
      await new Promise((t) => setTimeout(t, 100));
    }
  }
  /**
   * manually set features (e.g. for Urban Mapper)
   */
  setFeatures(e) {
    e.forEach((t) => {
      t.path || (t.path = this.createPath(t));
    }), this.countries = e, this.loaded = !0, this.topologyConfig && (this.topologyConfig.disableNormalization = !0), this.updateFeatureLabels();
  }
  /**
   * Add features to the existing set (e.g. overlay cities on top of countries)
   */
  addFeatures(e) {
    e.forEach((t) => {
      t.path || (t.path = this.createPath(t));
    }), this.countries = [...this.countries, ...e], this.topologyConfig && (this.topologyConfig.disableNormalization = !0), this.updateFeatureLabels();
  }
  /**
   * Update feature labels from current countries
   */
  updateFeatureLabels() {
    this.featureLabels = this.countries.map((e) => {
      const t = this.computeCentroid(e);
      if (!t) return null;
      let i = "";
      if (this.topologyConfig?.labelProperty && (i = e.properties?.[this.topologyConfig.labelProperty] || ""), i || (i = e.properties?.name || e.properties?.NAME || e.properties?.Name || e.properties?.label || e.properties?.LABEL || ""), !i && e.properties) {
        const n = Object.keys(e.properties);
        for (const s of n) {
          const a = s.toLowerCase(), l = e.properties[s];
          if (typeof l == "string" && (a.includes("name") || a.includes("label") || a.includes("title"))) {
            i = l;
            break;
          }
        }
      }
      let r = e.id || e.properties?.id;
      return this.topologyConfig?.idProperty && (r = e.properties?.[this.topologyConfig.idProperty]), {
        id: String(r || ""),
        name: i,
        lat: t[1],
        lon: t[0]
      };
    }).filter(
      (e) => e !== null && e.id !== "" && e.name !== ""
    );
  }
  /**
   * Get labels for all custom features (with centroids)
   */
  getFeatureLabels() {
    return this.featureLabels;
  }
  /**
   * Compute centroid of a GeoJSON feature (simple average for polygons)
   */
  computeCentroid(e) {
    const t = e.geometry;
    if (!t) return null;
    let i = [];
    if (t.type === "Point")
      return t.coordinates;
    if (t.type === "Polygon")
      i = t.coordinates.flat();
    else if (t.type === "MultiPolygon")
      i = t.coordinates.flat(2);
    else
      return null;
    if (i.length === 0) return null;
    let r = 0, n = 0;
    for (const s of i)
      r += s[0], n += s[1];
    return [r / i.length, n / i.length];
  }
  /**
   * Render a choropleth texture for the given statistic
   * Now supporting Progressive Rendering to prevent UI freezes
   */
  renderTexture(e) {
    this.currentRenderId++;
    const t = this.currentRenderId;
    if (this.ctx.fillStyle = "rgba(10, 20, 30, 0.9)", this.ctx.fillRect(0, 0, Ct, Pt), this.onTextureUpdate?.(), !this.loaded)
      return this.canvas;
    const i = this.countries.length < 1500;
    this.ctx.lineWidth = 0.5, this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    const r = 500, n = this.countries.length;
    let s = 0;
    const a = () => {
      if (this.currentRenderId !== t) return;
      const l = Math.min(s + r, n);
      for (let c = s; c < l; c++) {
        const u = this.countries[c], h = this.statsMap.get(u.id);
        let p = "#2a2a2a";
        if (h) {
          const f = e.accessor(h), m = Ys(e, f);
          p = this.interpolateColor(e.colorScale, m);
        }
        this.drawFeature(u, p, i);
      }
      s = l, this.onTextureUpdate?.(), s < n && requestAnimationFrame(a);
    };
    return requestAnimationFrame(a), this.canvas;
  }
  // Optimized draw using cached Path2D
  drawFeature(e, t, i) {
    const r = e.path;
    r && (this.ctx.fillStyle = t, this.ctx.fill(r), i && this.ctx.stroke(r));
  }
  // Pre-calculate path for a feature
  createPath(e) {
    const t = new Path2D(), { geometry: i } = e;
    if (i.type === "Polygon")
      this.addPolygonToPath(t, i.coordinates);
    else if (i.type === "MultiPolygon")
      i.coordinates.forEach((r) => {
        this.addPolygonToPath(t, r);
      });
    else if (i.type === "Point") {
      const [r, n] = i.coordinates, [s, a] = this.projectPoint(r, n);
      t.arc(s, a, 4, 0, Math.PI * 2);
    }
    return t;
  }
  addPolygonToPath(e, t) {
    t.forEach((i) => {
      let r = null;
      i.forEach((n, s) => {
        const a = n[0], l = n[1], [c, u] = this.projectPoint(a, l), h = r !== null && Math.abs(a - r) > 180;
        s === 0 || h ? e.moveTo(c, u) : e.lineTo(c, u), r = a;
      }), e.closePath();
    });
  }
  projectPoint(e, t) {
    const i = (e + 180) / 360 * Ct, r = (90 - t) / 180 * Pt;
    return [i, r];
  }
  interpolateColor(e, t) {
    const i = (u) => ({
      r: parseInt(u.slice(1, 3), 16),
      g: parseInt(u.slice(3, 5), 16),
      b: parseInt(u.slice(5, 7), 16)
    }), [r, n, s] = e.map(i);
    let a, l, c;
    if (t < 0.5) {
      const u = t * 2;
      a = Math.round(r.r + (n.r - r.r) * u), l = Math.round(r.g + (n.g - r.g) * u), c = Math.round(r.b + (n.b - r.b) * u);
    } else {
      const u = (t - 0.5) * 2;
      a = Math.round(n.r + (s.r - n.r) * u), l = Math.round(n.g + (s.g - n.g) * u), c = Math.round(n.b + (s.b - n.b) * u);
    }
    return `rgb(${a}, ${l}, ${c})`;
  }
  /**
   * Render a choropleth texture with custom values
   */
  renderCustomTexture(e, t, i) {
    this.currentRenderId++;
    const r = this.currentRenderId;
    if (this.ctx.fillStyle = "rgba(10, 20, 30, 0.9)", this.ctx.fillRect(0, 0, Ct, Pt), this.onTextureUpdate?.(), !this.loaded)
      return this.canvas;
    const n = this.topologyConfig?.disableNormalization ? e instanceof Map ? Object.fromEntries(e) : e : Xs(e), s = this.countries.length < 1500;
    this.ctx.lineWidth = 0.5, this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    const a = 500, l = this.countries.length;
    let c = 0;
    const u = () => {
      if (this.currentRenderId !== r) return;
      const h = Math.min(c + a, l);
      for (let p = c; p < h; p++) {
        const f = this.countries[p], m = n[f.id];
        let d = "#2a2a2a";
        if (m !== void 0) {
          const g = Math.max(
            0,
            Math.min(1, (m - i[0]) / (i[1] - i[0]))
          );
          d = this.interpolateColor(t, g);
        }
        this.drawFeature(f, d, s);
      }
      c = h, this.onTextureUpdate?.(), c < l && requestAnimationFrame(u);
    };
    return requestAnimationFrame(u), this.canvas;
  }
  getCanvas() {
    return this.canvas;
  }
  getDataURL() {
    return this.canvas.toDataURL("image/png");
  }
  /**
   * Get the statistics map (for data label mode)
   */
  getStatsMap() {
    return this.statsMap;
  }
  /**
   * Get the name of a feature by its ID (using pre-computed feature labels)
   */
  getFeatureName(e) {
    let t = this.featureLabels.find((r) => r.id === e);
    if (!t && e.startsWith("0")) {
      const r = String(parseInt(e, 10));
      t = this.featureLabels.find((n) => n.id === r);
    }
    if (t) return t.name;
    const i = this.countries.find(
      (r) => r.id === e || r.properties?.id === e
    );
    if (i)
      return i.properties.name || i.properties.NAME || i.properties.Name || i.id;
  }
  getBounds() {
    if (this.countries.length === 0) return null;
    let e = 1 / 0, t = -1 / 0, i = 1 / 0, r = -1 / 0, n = 0, s = 1 / 0, a = -1 / 0, l = 1 / 0, c = -1 / 0, u = 0;
    const h = (y) => {
      if (typeof y[0] == "number") {
        const _ = y[0], x = y[1];
        _ < 0 ? (_ < e && (e = _), _ > t && (t = _), x < i && (i = x), x > r && (r = x), n++) : (_ < s && (s = _), _ > a && (a = _), x < l && (l = x), x > c && (c = x), u++);
      } else
        y.forEach(h);
    };
    if (this.countries.forEach((y) => {
      y.geometry && h(y.geometry.coordinates);
    }), n === 0 && u === 0) return null;
    if (n === 0) return [s, l, a, c];
    if (u === 0) return [e, i, t, r];
    const p = Math.min(e, s), f = Math.max(t, a);
    if (f - p > 180) {
      if (n > u * 2)
        return [e, i, t, r];
      if (u > n * 2)
        return [s, l, a, c];
    }
    const d = Math.min(i, l), g = Math.max(r, c);
    return [p, d, f, g];
  }
}
const qs = {
  // Major economies
  CN: [35, 105],
  IN: [22, 78],
  US: [39, -98],
  ID: [-2, 118],
  PK: [30, 70],
  BR: [-10, -55],
  NG: [9, 8],
  BD: [24, 90],
  RU: [60, 100],
  MX: [23, -102],
  JP: [36, 138],
  ET: [9, 38.5],
  PH: [12, 122],
  EG: [27, 30],
  VN: [16, 108],
  // Europe
  DE: [51, 10],
  TR: [39, 35],
  IR: [32, 53],
  TH: [15, 101],
  GB: [54, -2],
  FR: [46, 2],
  IT: [42.5, 12.5],
  ZA: [-29, 24],
  TZ: [-6, 35],
  KE: [0, 38],
  KR: [36, 128],
  CO: [4, -72],
  ES: [40, -4],
  AR: [-34, -64],
  UG: [1, 32],
  DZ: [28, 3],
  UA: [49, 32],
  IQ: [33, 44],
  PL: [52, 20],
  CA: [56, -106],
  MA: [32, -5],
  SA: [24, 45],
  PE: [-10, -76],
  AU: [-25, 134],
  MY: [4, 109.5],
  GH: [8, -1],
  NP: [28, 84],
  VE: [7, -66],
  MG: [-19, 47],
  CM: [6, 12],
  // Nordic & small high-HDI
  NL: [52.5, 5.5],
  CL: [-34, -71],
  SE: [62, 15],
  NO: [64, 10],
  SG: [1.3, 103.8],
  NZ: [-42, 174],
  IE: [53, -8],
  IL: [31, 35],
  AE: [24, 54],
  CH: [47, 8],
  AT: [47.5, 14.5],
  PT: [39.5, -8],
  GR: [39, 22],
  CZ: [49.8, 15.5],
  BE: [50.8, 4],
  HU: [47, 20],
  FI: [64, 26],
  DK: [56, 10],
  IS: [65, -18],
  // Africa
  CD: [-3, 22],
  SD: [16, 30],
  AO: [-12.5, 18.5],
  MZ: [-18, 35],
  CI: [7.5, -5.5],
  NE: [17, 10],
  BF: [12, -1.5],
  ML: [17, -4],
  SN: [14.5, -14.5],
  ZM: [-15, 28],
  ZW: [-19, 29.5],
  RW: [-2, 30],
  // Asia
  AF: [33, 65],
  MM: [21, 96],
  KP: [40, 127],
  MN: [46, 105],
  LK: [7.8, 80.8],
  KZ: [48, 67],
  UZ: [41, 64],
  // Latin America
  CU: [22, -79.5],
  EC: [-1.5, -78.5],
  GT: [15.5, -90.3],
  BO: [-17, -65],
  HN: [15, -86.5],
  PY: [-23, -58],
  UY: [-33, -56],
  CR: [10, -84],
  PA: [9, -80]
}, Ks = /* @__PURE__ */ new Set([
  "CN",
  "IN",
  "US",
  "BR",
  "RU",
  "JP",
  "DE",
  "GB",
  "FR",
  "AU",
  "CA",
  "MX",
  "ID",
  "SA",
  "ZA",
  "EG",
  "NG",
  "AR",
  "IT",
  "ES",
  "KR",
  "TR",
  "PL",
  "NL",
  "CH",
  "SE",
  "NO",
  "PK",
  "BD",
  "VN"
]), Js = /* @__PURE__ */ new Set(["CN", "IN", "US", "BR", "RU", "AU", "CA"]), Qs = /* @__PURE__ */ new Set(["RU", "CA", "US", "CN", "BR", "AU"]), ea = /* @__PURE__ */ new Set([
  "IN",
  "AR",
  "KZ",
  "DZ",
  "CD",
  "SA",
  "MX",
  "ID",
  "SD",
  "LY",
  "IR",
  "MN",
  "PE",
  "TD",
  "NE",
  "AO",
  "ML",
  "ZA",
  "CO",
  "ET",
  "BO",
  "MR",
  "EG",
  "TZ",
  "NG",
  "VE",
  "PK",
  "TR",
  "CL",
  "MM"
]), ta = /* @__PURE__ */ new Set([
  "AF",
  "UA",
  "MG",
  "MZ",
  "FR",
  "ES",
  "TH",
  "CM",
  "PG",
  "JP",
  "DE",
  "VN",
  "MY",
  "CI",
  "PL",
  "IT",
  "PH",
  "EC",
  "BF",
  "NZ",
  "GB",
  "GH",
  "RO",
  "LA",
  "GY",
  "OM",
  "BY",
  "KH",
  "SN",
  "UG",
  "NO",
  "SE",
  "FI",
  "MR",
  "ZM",
  "ZW",
  "NP",
  "MA",
  "IQ",
  "BD"
]);
class ia {
  labelRenderer;
  labels = [];
  labelGroup;
  currentStyle = "none";
  sphereRadius;
  currentMorph = 0;
  globe = null;
  camera = null;
  dataIds = /* @__PURE__ */ new Set();
  constructor(e, t) {
    this.sphereRadius = t, this.labelRenderer = new xn();
    const i = e.clientWidth || 800, r = e.clientHeight || 600;
    this.labelRenderer.setSize(i, r), this.labelRenderer.domElement.style.position = "absolute", this.labelRenderer.domElement.style.top = "0", this.labelRenderer.domElement.style.left = "0", this.labelRenderer.domElement.style.pointerEvents = "none", this.labelRenderer.domElement.style.zIndex = "5", e.appendChild(this.labelRenderer.domElement), this.labelGroup = new A.Group(), this.injectStyles(), this.createLabels();
  }
  injectStyles() {
    const e = document.createElement("style");
    e.textContent = `
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
    `, document.head.appendChild(e);
  }
  getSizeCategory(e) {
    return Qs.has(e) ? "large" : ea.has(e) ? "medium" : ta.has(e) ? "small" : "tiny";
  }
  createLabels() {
    hn.forEach((e) => {
      const t = qs[e.code];
      if (!t) return;
      const [i, r] = t, n = this.getSizeCategory(e.code), s = document.createElement("div");
      s.className = `country-label hidden size-${n}`, s.textContent = e.name;
      const a = new Fi(s), l = {
        element: s,
        object: a,
        country: e,
        lat: i,
        lon: r,
        sizeCategory: n
      };
      this.labelGroup.add(a), this.labels.push(l), this.updateLabelPosition(a, l, this.currentMorph);
    });
  }
  /**
   * Add custom labels (for cities, states, or any geographic points)
   * These are added to the existing country labels
   */
  addCustomLabels(e) {
    e.forEach((t) => {
      const i = (f) => String(parseInt(f) || f).toLowerCase(), r = (f) => f.toLowerCase().replace(/^the\s+/, "").trim(), n = i(t.id), s = r(t.name);
      if (this.labels.some((f) => {
        const m = i(f.country.id), d = r(f.country.name);
        return m === n || d === s;
      })) return;
      const l = t.size || "small", c = document.createElement("div");
      c.className = `country-label hidden size-${l} custom-label`, c.textContent = t.name;
      const u = new Fi(c), h = {
        id: t.id,
        code: t.id,
        name: t.name
      }, p = {
        element: c,
        object: u,
        country: h,
        lat: t.lat,
        lon: t.lon,
        sizeCategory: l
      };
      this.labelGroup.add(u), this.labels.push(p), this.dataIds.add(t.id), this.updateLabelPosition(u, p, this.currentMorph);
    }), this.setStyle(this.currentStyle);
  }
  /**
   * Clear all custom labels (keeps country labels)
   */
  clearCustomLabels() {
    this.labels.filter(
      (t) => t.element.classList.contains("custom-label")
    ).forEach((t) => {
      this.labelGroup.remove(t.object), t.element.remove(), this.dataIds.delete(t.country.code);
    }), this.labels = this.labels.filter(
      (t) => !t.element.classList.contains("custom-label")
    );
  }
  localPos = new A.Vector3();
  worldPos = new A.Vector3();
  cameraDirection = new A.Vector3();
  labelNormal = new A.Vector3();
  updateLabelPosition(e, t, i) {
    const { lat: r, lon: n, element: s } = t, a = (n + 180) / 360, l = (r + 90) / 180, c = (a - 0.5) * 2 * Math.PI, u = (l - 0.5) * Math.PI, h = this.sphereRadius + 0.3, p = h * Math.cos(u) * Math.sin(c), f = h * Math.sin(u), m = h * Math.cos(u) * Math.cos(c), d = 2 * Math.PI * this.sphereRadius, g = Math.PI * this.sphereRadius, y = (a - 0.5) * d, _ = (l - 0.5) * g, x = 0.3, v = i * i * (3 - 2 * i);
    if (this.localPos.set(
      y + v * (p - y),
      _ + v * (f - _),
      x + v * (m - x)
    ), this.globe) {
      this.worldPos.copy(this.localPos), this.worldPos.applyMatrix4(this.globe.matrixWorld), e.position.copy(this.worldPos);
      let b = 1;
      this.camera && v > 0.5 && (this.cameraDirection.copy(this.camera.position).normalize(), this.labelNormal.set(p, f, m).normalize(), this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize(), b = this.labelNormal.dot(this.cameraDirection) > 0.15 ? 1 : 0);
      let C = 1;
      if (this.camera) {
        let P = 150;
        switch (v > 0.5 ? P = this.camera.position.length() : P = Math.abs(this.camera.position.z), t.sizeCategory) {
          case "tiny":
            C = 1 - Math.min(1, Math.max(0, (P - 120) / 30));
            break;
          case "small":
            C = 1 - Math.min(1, Math.max(0, (P - 150) / 40));
            break;
          case "medium":
            C = 1 - Math.min(1, Math.max(0, (P - 200) / 50));
            break;
          case "large":
            C = 1 - Math.min(1, Math.max(0, (P - 300) / 100));
            break;
        }
      }
      const E = b * C;
      E < 0.05 ? s.style.opacity = "0" : s.style.opacity = String(E);
    } else {
      e.position.copy(this.localPos);
      let b = 1;
      if (this.camera) {
        const C = Math.abs(this.camera.position.z);
        switch (t.sizeCategory) {
          case "tiny":
            b = 1 - Math.min(1, Math.max(0, (C - 120) / 30));
            break;
          case "small":
            b = 1 - Math.min(1, Math.max(0, (C - 150) / 40));
            break;
          case "medium":
            b = 1 - Math.min(1, Math.max(0, (C - 200) / 50));
            break;
        }
      }
      s.style.opacity = b < 0.05 ? "0" : String(b);
    }
  }
  /**
   * Get the label group to add to scene
   */
  getGroup() {
    return this.labelGroup;
  }
  /**
   * Set the label display style
   */
  setStyle(e) {
    this.currentStyle = e, this.labels.forEach((t) => {
      const i = t.country.code;
      let r = !1;
      switch (e) {
        case "none":
          r = !1;
          break;
        case "minimal":
          r = Js.has(i);
          break;
        case "major":
          r = Ks.has(i);
          break;
        case "all":
        case "capitals":
          r = !0;
          break;
        case "all-countries":
          r = !0;
          break;
        case "data":
          r = this.dataIds.has(i);
          break;
      }
      e === "all-countries" && t.element.classList.contains("custom-label") && (r = !1), t.element.classList.toggle("hidden", !r);
    }), this.labelRenderer.domElement.className = `label-style-${e}`;
  }
  /**
   * Update morph value to sync label positions with globe
   */
  setMorph(e) {
    this.currentMorph = e;
  }
  /**
   * Set globe reference to sync rotation
   */
  setGlobe(e) {
    this.globe = e;
  }
  /**
   * Set camera reference for backface culling
   */
  setCamera(e) {
    this.camera = e;
  }
  /**
   * Set which entity IDs have data (for "data" label mode)
   */
  setDataIds(e) {
    this.dataIds = new Set(e), this.currentStyle === "data" && this.setStyle("data");
  }
  /**
   * Update label positions (call every frame to sync with globe rotation)
   */
  update() {
    this.currentStyle !== "none" && this.labels.forEach((e) => {
      this.updateLabelPosition(e.object, e, this.currentMorph);
    });
  }
  /**
   * Render labels
   */
  render(e, t) {
    this.currentStyle !== "none" && this.labelRenderer.render(e, t);
  }
  /**
   * Handle window resize
   */
  resize(e, t) {
    this.labelRenderer.setSize(e, t);
  }
  /**
   * Get current style
   */
  getStyle() {
    return this.currentStyle;
  }
  /**
   * Get visible labels with their screen positions for canvas rendering
   */
  getVisibleLabelsForCanvas(e, t, i) {
    if (this.currentStyle === "none") return [];
    const r = [], n = new A.Vector3();
    return this.labels.forEach((s) => {
      const a = s.element.style.opacity, l = a === "" ? 1 : parseFloat(a) || 0;
      if (l < 0.1 || s.element.classList.contains("hidden")) return;
      s.object.getWorldPosition(n), n.project(e);
      const c = (n.x * 0.5 + 0.5) * t, u = (-n.y * 0.5 + 0.5) * i;
      c >= 0 && c <= t && u >= 0 && u <= i && n.z < 1 && r.push({
        text: s.country.name,
        x: c,
        y: u,
        opacity: l
      });
    }), r;
  }
  /**
   * Dispose resources
   */
  dispose() {
    this.labels.forEach((e) => {
      this.labelGroup.remove(e.object), e.element.remove();
    }), this.labels = [], this.labelRenderer.domElement.remove();
  }
}
var ra = { trailer: 59 };
function dn(o = 256) {
  let e = 0, t = new Uint8Array(o);
  return { get buffer() {
    return t.buffer;
  }, reset() {
    e = 0;
  }, bytesView() {
    return t.subarray(0, e);
  }, bytes() {
    return t.slice(0, e);
  }, writeByte(r) {
    i(e + 1), t[e] = r, e++;
  }, writeBytes(r, n = 0, s = r.length) {
    i(e + s);
    for (let a = 0; a < s; a++) t[e++] = r[a + n];
  }, writeBytesView(r, n = 0, s = r.byteLength) {
    i(e + s), t.set(r.subarray(n, n + s), e), e += s;
  } };
  function i(r) {
    var n = t.length;
    if (n >= r) return;
    var s = 1024 * 1024;
    r = Math.max(r, n * (n < s ? 2 : 1.125) >>> 0), n != 0 && (r = Math.max(r, 256));
    let a = t;
    t = new Uint8Array(r), e > 0 && t.set(a.subarray(0, e), 0);
  }
}
var qt = 12, rr = 5003, na = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
function sa(o, e, t, i, r = dn(512), n = new Uint8Array(256), s = new Int32Array(rr), a = new Int32Array(rr)) {
  let l = s.length, c = Math.max(2, i);
  n.fill(0), a.fill(0), s.fill(-1);
  let u = 0, h = 0, p = c + 1, f = p, m = !1, d = f, g = (1 << d) - 1, y = 1 << p - 1, _ = y + 1, x = y + 2, v = 0, b = t[0], C = 0;
  for (let w = l; w < 65536; w *= 2) ++C;
  C = 8 - C, r.writeByte(c), P(y);
  let E = t.length;
  for (let w = 1; w < E; w++)
    e: {
      let T = t[w], D = (T << qt) + b, S = T << C ^ b;
      if (s[S] === D) {
        b = a[S];
        break e;
      }
      let L = S === 0 ? 1 : l - S;
      for (; s[S] >= 0; ) if (S -= L, S < 0 && (S += l), s[S] === D) {
        b = a[S];
        break e;
      }
      P(b), b = T, x < 1 << qt ? (a[S] = x++, s[S] = D) : (s.fill(-1), x = y + 2, m = !0, P(y));
    }
  return P(b), P(_), r.writeByte(0), r.bytesView();
  function P(w) {
    for (u &= na[h], h > 0 ? u |= w << h : u = w, h += d; h >= 8; ) n[v++] = u & 255, v >= 254 && (r.writeByte(v), r.writeBytesView(n, 0, v), v = 0), u >>= 8, h -= 8;
    if ((x > g || m) && (m ? (d = f, g = (1 << d) - 1, m = !1) : (++d, g = d === qt ? 1 << d : (1 << d) - 1)), w == _) {
      for (; h > 0; ) n[v++] = u & 255, v >= 254 && (r.writeByte(v), r.writeBytesView(n, 0, v), v = 0), u >>= 8, h -= 8;
      v > 0 && (r.writeByte(v), r.writeBytesView(n, 0, v), v = 0);
    }
  }
}
var aa = sa;
function pn(o, e, t) {
  return o << 8 & 63488 | e << 2 & 992 | t >> 3;
}
function fn(o, e, t, i) {
  return o >> 4 | e & 240 | (t & 240) << 4 | (i & 240) << 8;
}
function mn(o, e, t) {
  return o >> 4 << 8 | e & 240 | t >> 4;
}
function At(o, e, t) {
  return o < e ? e : o > t ? t : o;
}
function Dt(o) {
  return o * o;
}
function nr(o, e, t) {
  var i = 0, r = 1e100;
  let n = o[e], s = n.cnt;
  n.ac;
  let a = n.rc, l = n.gc, c = n.bc;
  for (var u = n.fw; u != 0; u = o[u].fw) {
    let p = o[u], f = p.cnt, m = s * f / (s + f);
    if (!(m >= r)) {
      var h = 0;
      h += m * Dt(p.rc - a), !(h >= r) && (h += m * Dt(p.gc - l), !(h >= r) && (h += m * Dt(p.bc - c), !(h >= r) && (r = h, i = u)));
    }
  }
  n.err = r, n.nn = i;
}
function Kt() {
  return { ac: 0, rc: 0, gc: 0, bc: 0, cnt: 0, nn: 0, fw: 0, bk: 0, tm: 0, mtm: 0, err: 0 };
}
function oa(o, e) {
  let t = e === "rgb444" ? 4096 : 65536, i = new Array(t), r = o.length;
  if (e === "rgba4444") for (let n = 0; n < r; ++n) {
    let s = o[n], a = s >> 24 & 255, l = s >> 16 & 255, c = s >> 8 & 255, u = s & 255, h = fn(u, c, l, a), p = h in i ? i[h] : i[h] = Kt();
    p.rc += u, p.gc += c, p.bc += l, p.ac += a, p.cnt++;
  }
  else if (e === "rgb444") for (let n = 0; n < r; ++n) {
    let s = o[n], a = s >> 16 & 255, l = s >> 8 & 255, c = s & 255, u = mn(c, l, a), h = u in i ? i[u] : i[u] = Kt();
    h.rc += c, h.gc += l, h.bc += a, h.cnt++;
  }
  else for (let n = 0; n < r; ++n) {
    let s = o[n], a = s >> 16 & 255, l = s >> 8 & 255, c = s & 255, u = pn(c, l, a), h = u in i ? i[u] : i[u] = Kt();
    h.rc += c, h.gc += l, h.bc += a, h.cnt++;
  }
  return i;
}
function la(o, e, t = {}) {
  let { format: i = "rgb565", clearAlpha: r = !0, clearAlphaColor: n = 0, clearAlphaThreshold: s = 0, oneBitAlpha: a = !1 } = t;
  if (!o || !o.buffer) throw new Error("quantize() expected RGBA Uint8Array data");
  if (!(o instanceof Uint8Array) && !(o instanceof Uint8ClampedArray)) throw new Error("quantize() expected RGBA Uint8Array data");
  let l = new Uint32Array(o.buffer), c = t.useSqrt !== !1, u = i === "rgba4444", h = oa(l, i), p = h.length, f = p - 1, m = new Uint32Array(p + 1);
  for (var d = 0, g = 0; g < p; ++g) {
    let R = h[g];
    if (R != null) {
      var y = 1 / R.cnt;
      u && (R.ac *= y), R.rc *= y, R.gc *= y, R.bc *= y, h[d++] = R;
    }
  }
  Dt(e) / d < 0.022 && (c = !1);
  for (var g = 0; g < d - 1; ++g) h[g].fw = g + 1, h[g + 1].bk = g, c && (h[g].cnt = Math.sqrt(h[g].cnt));
  c && (h[g].cnt = Math.sqrt(h[g].cnt));
  var _, x, v;
  for (g = 0; g < d; ++g) {
    nr(h, g);
    var b = h[g].err;
    for (x = ++m[0]; x > 1 && (v = x >> 1, !(h[_ = m[v]].err <= b)); x = v) m[x] = _;
    m[x] = g;
  }
  var C = d - e;
  for (g = 0; g < C; ) {
    for (var E; ; ) {
      var P = m[1];
      if (E = h[P], E.tm >= E.mtm && h[E.nn].mtm <= E.tm) break;
      E.mtm == f ? P = m[1] = m[m[0]--] : (nr(h, P), E.tm = g);
      var b = h[P].err;
      for (x = 1; (v = x + x) <= m[0] && (v < m[0] && h[m[v]].err > h[m[v + 1]].err && v++, !(b <= h[_ = m[v]].err)); x = v) m[x] = _;
      m[x] = P;
    }
    var w = h[E.nn], T = E.cnt, D = w.cnt, y = 1 / (T + D);
    u && (E.ac = y * (T * E.ac + D * w.ac)), E.rc = y * (T * E.rc + D * w.rc), E.gc = y * (T * E.gc + D * w.gc), E.bc = y * (T * E.bc + D * w.bc), E.cnt += w.cnt, E.mtm = ++g, h[w.bk].fw = w.fw, h[w.fw].bk = w.bk, w.mtm = f;
  }
  let S = [];
  var L = 0;
  for (g = 0; ; ++L) {
    let R = At(Math.round(h[g].rc), 0, 255), $ = At(Math.round(h[g].gc), 0, 255), F = At(Math.round(h[g].bc), 0, 255), k = 255;
    u && (k = At(Math.round(h[g].ac), 0, 255), a && (k = k <= (typeof a == "number" ? a : 127) ? 0 : 255), r && k <= s && (R = $ = F = n, k = 0));
    let J = u ? [R, $, F, k] : [R, $, F];
    if (ca(S, J) || S.push(J), (g = h[g].fw) == 0) break;
  }
  return S;
}
function ca(o, e) {
  for (let t = 0; t < o.length; t++) {
    let i = o[t], r = i[0] === e[0] && i[1] === e[1] && i[2] === e[2], n = i.length >= 4 && e.length >= 4 ? i[3] === e[3] : !0;
    if (r && n) return !0;
  }
  return !1;
}
function ua(o, e, t = "rgb565") {
  if (!o || !o.buffer) throw new Error("quantize() expected RGBA Uint8Array data");
  if (!(o instanceof Uint8Array) && !(o instanceof Uint8ClampedArray)) throw new Error("quantize() expected RGBA Uint8Array data");
  if (e.length > 256) throw new Error("applyPalette() only works with 256 colors or less");
  let i = new Uint32Array(o.buffer), r = i.length, n = t === "rgb444" ? 4096 : 65536, s = new Uint8Array(r), a = new Array(n);
  if (t === "rgba4444") for (let l = 0; l < r; l++) {
    let c = i[l], u = c >> 24 & 255, h = c >> 16 & 255, p = c >> 8 & 255, f = c & 255, m = fn(f, p, h, u), d = m in a ? a[m] : a[m] = ha(f, p, h, u, e);
    s[l] = d;
  }
  else {
    let l = t === "rgb444" ? mn : pn;
    for (let c = 0; c < r; c++) {
      let u = i[c], h = u >> 16 & 255, p = u >> 8 & 255, f = u & 255, m = l(f, p, h), d = m in a ? a[m] : a[m] = da(f, p, h, e);
      s[c] = d;
    }
  }
  return s;
}
function ha(o, e, t, i, r) {
  let n = 0, s = 1e100;
  for (let a = 0; a < r.length; a++) {
    let l = r[a], c = l[3], u = Ne(c - i);
    if (u > s) continue;
    let h = l[0];
    if (u += Ne(h - o), u > s) continue;
    let p = l[1];
    if (u += Ne(p - e), u > s) continue;
    let f = l[2];
    u += Ne(f - t), !(u > s) && (s = u, n = a);
  }
  return n;
}
function da(o, e, t, i) {
  let r = 0, n = 1e100;
  for (let s = 0; s < i.length; s++) {
    let a = i[s], l = a[0], c = Ne(l - o);
    if (c > n) continue;
    let u = a[1];
    if (c += Ne(u - e), c > n) continue;
    let h = a[2];
    c += Ne(h - t), !(c > n) && (n = c, r = s);
  }
  return r;
}
function Ne(o) {
  return o * o;
}
function pa(o = {}) {
  let { initialCapacity: e = 4096, auto: t = !0 } = o, i = dn(e), r = 5003, n = new Uint8Array(256), s = new Int32Array(r), a = new Int32Array(r), l = !1;
  return { reset() {
    i.reset(), l = !1;
  }, finish() {
    i.writeByte(ra.trailer);
  }, bytes() {
    return i.bytes();
  }, bytesView() {
    return i.bytesView();
  }, get buffer() {
    return i.buffer;
  }, get stream() {
    return i;
  }, writeHeader: c, writeFrame(u, h, p, f = {}) {
    let { transparent: m = !1, transparentIndex: d = 0, delay: g = 0, palette: y = null, repeat: _ = 0, colorDepth: x = 8, dispose: v = -1 } = f, b = !1;
    if (t ? l || (b = !0, c(), l = !0) : b = !!f.first, h = Math.max(0, Math.floor(h)), p = Math.max(0, Math.floor(p)), b) {
      if (!y) throw new Error("First frame must include a { palette } option");
      ma(i, h, p, y, x), sr(i, y), _ >= 0 && ga(i, _);
    }
    let C = Math.round(g / 10);
    fa(i, v, C, m, d);
    let E = !!y && !b;
    ya(i, h, p, E ? y : null), E && sr(i, y), _a(i, u, h, p, x, n, s, a);
  } };
  function c() {
    gn(i, "GIF89a");
  }
}
function fa(o, e, t, i, r) {
  o.writeByte(33), o.writeByte(249), o.writeByte(4), r < 0 && (r = 0, i = !1);
  var n, s;
  i ? (n = 1, s = 2) : (n = 0, s = 0), e >= 0 && (s = e & 7), s <<= 2, o.writeByte(0 | s | 0 | n), Se(o, t), o.writeByte(r || 0), o.writeByte(0);
}
function ma(o, e, t, i, r = 8) {
  let n = 1, s = 0, a = Oi(i.length) - 1, l = n << 7 | r - 1 << 4 | s << 3 | a;
  Se(o, e), Se(o, t), o.writeBytes([l, 0, 0]);
}
function ga(o, e) {
  o.writeByte(33), o.writeByte(255), o.writeByte(11), gn(o, "NETSCAPE2.0"), o.writeByte(3), o.writeByte(1), Se(o, e), o.writeByte(0);
}
function sr(o, e) {
  let t = 1 << Oi(e.length);
  for (let i = 0; i < t; i++) {
    let r = [0, 0, 0];
    i < e.length && (r = e[i]), o.writeByte(r[0]), o.writeByte(r[1]), o.writeByte(r[2]);
  }
}
function ya(o, e, t, i) {
  if (o.writeByte(44), Se(o, 0), Se(o, 0), Se(o, e), Se(o, t), i) {
    let r = 0, n = 0, s = Oi(i.length) - 1;
    o.writeByte(128 | r | n | 0 | s);
  } else o.writeByte(0);
}
function _a(o, e, t, i, r = 8, n, s, a) {
  aa(t, i, e, r, o, n, s, a);
}
function Se(o, e) {
  o.writeByte(e & 255), o.writeByte(e >> 8 & 255);
}
function gn(o, e) {
  for (var t = 0; t < e.length; t++) o.writeByte(e.charCodeAt(t));
}
function Oi(o) {
  return Math.max(Math.ceil(Math.log2(o)), 1);
}
class xa {
  renderer;
  scene;
  camera;
  isRecording = !1;
  frames = [];
  mediaRecorder = null;
  recordedChunks = [];
  captureCanvas;
  captureCtx;
  compositeCanvas;
  compositeCtx;
  gifWidth = 480;
  gifHeight = 270;
  legendElement = null;
  countryLabels = null;
  constructor(e, t, i) {
    this.renderer = e, this.scene = t, this.camera = i, this.captureCanvas = document.createElement("canvas"), this.captureCtx = this.captureCanvas.getContext("2d", { willReadFrequently: !0 }), this.compositeCanvas = document.createElement("canvas"), this.compositeCtx = this.compositeCanvas.getContext("2d");
  }
  /**
   * Set the legend element to include in exports
   */
  setLegendElement(e) {
    this.legendElement = e;
  }
  /**
   * Set the country labels component to include in exports
   */
  setCountryLabels(e) {
    this.countryLabels = e;
  }
  /**
   * Draw country labels onto canvas
   * @param camera - Optional camera to use for projection (defaults to main camera)
   */
  drawCountryLabelsOnCanvas(e, t, i, r) {
    if (this.countryLabels)
      try {
        this.countryLabels.getVisibleLabelsForCanvas(r || this.camera, t, i).forEach((s) => {
          e.save(), e.globalAlpha = s.opacity, e.font = "bold 12px Arial, sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.strokeStyle = "rgba(0, 0, 0, 0.8)", e.lineWidth = 3, e.strokeText(s.text, s.x, s.y), e.fillStyle = "#ffffff", e.fillText(s.text, s.x, s.y), e.restore();
        });
      } catch (n) {
        console.warn("Failed to draw country labels:", n);
      }
  }
  /**
   * Draw all overlays (legend + country labels) onto canvas
   * @param camera - Optional camera to use for label projection (defaults to main camera)
   */
  drawOverlaysOnCanvas(e, t, i, r) {
    this.drawCountryLabelsOnCanvas(e, t, i, r), this.drawLegendOnCanvas(e, t, i);
  }
  /**
   * Draw legend onto canvas at specified position
   */
  drawLegendOnCanvas(e, t, i) {
    try {
      if (!this.legendElement || !this.legendElement.classList.contains("visible")) return;
      const r = this.legendElement, n = r.querySelector(".gralobe-legend-title") || r.querySelector(".legend-title"), s = r.querySelector(".gralobe-legend-gradient") || r.querySelector(".legend-gradient"), a = r.querySelector(".gralobe-legend-min") || r.querySelector(".legend-min"), l = r.querySelector(".gralobe-legend-max") || r.querySelector(".legend-max"), c = r.querySelector(".gralobe-legend-description") || r.querySelector(".legend-description");
      if (!n || !s) return;
      const u = 280, h = 100, p = 20, f = t - u - p, m = i - h - p, d = 12;
      e.fillStyle = "rgba(0, 10, 20, 0.9)", e.strokeStyle = "rgba(100, 170, 255, 0.5)", e.lineWidth = 2, e.beginPath(), e.roundRect ? e.roundRect(f, m, u, h, d) : e.rect(f, m, u, h), e.fill(), e.stroke(), e.fillStyle = "#44aaff", e.font = "bold 18px Arial, sans-serif", e.fillText(n.textContent || "", f + 16, m + 28);
      const g = f + 16, y = m + 40, _ = u - 32, x = 20, v = s.style.background || "";
      let b = [];
      const C = v.match(/rgba?\([^)]+\)/g);
      if (C && C.length >= 2)
        b = C;
      else {
        const E = v.match(/#[0-9a-fA-F]{3,8}/g);
        E && E.length >= 2 && (b = E);
      }
      if (b.length >= 2) {
        const E = e.createLinearGradient(g, 0, g + _, 0);
        E.addColorStop(0, b[0]), b.length >= 3 ? (E.addColorStop(0.5, b[1]), E.addColorStop(1, b[2])) : E.addColorStop(1, b[1]), e.fillStyle = E, e.beginPath(), e.roundRect ? e.roundRect(g, y, _, x, 4) : e.rect(g, y, _, x), e.fill();
      } else {
        const E = e.createLinearGradient(g, 0, g + _, 0);
        E.addColorStop(0, "#cc6600"), E.addColorStop(0.5, "#ffaa44"), E.addColorStop(1, "#ffeecc"), e.fillStyle = E, e.beginPath(), e.roundRect ? e.roundRect(g, y, _, x, 4) : e.rect(g, y, _, x), e.fill(), console.log("Legend gradient style:", v);
      }
      if (e.fillStyle = "#cccccc", e.font = "14px Arial, sans-serif", a && e.fillText(a.textContent || "", g, m + 78), l) {
        const E = l.textContent || "", P = e.measureText(E).width;
        e.fillText(E, g + _ - P, m + 78);
      }
      c && c.textContent && (e.fillStyle = "#888888", e.font = "italic 12px Arial, sans-serif", e.fillText(c.textContent, g, m + 95));
    } catch (r) {
      console.warn("Failed to draw legend on canvas:", r);
    }
  }
  /**
   * Capture a single screenshot (includes legend if visible)
   * Uses an offscreen renderer to avoid disturbing the main display
   */
  screenshot(e = {}) {
    const { width: t = 1920, height: i = 1080, filename: r } = e, n = new A.WebGLRenderer({
      antialias: !0,
      preserveDrawingBuffer: !0
    });
    n.setSize(t, i), n.setPixelRatio(1);
    const s = this.camera.clone();
    s.aspect = t / i, s.updateProjectionMatrix(), n.render(this.scene, s), this.compositeCanvas.width = t, this.compositeCanvas.height = i, this.compositeCtx.drawImage(n.domElement, 0, 0), this.drawOverlaysOnCanvas(this.compositeCtx, t, i, s);
    const a = this.compositeCanvas.toDataURL("image/png");
    n.dispose();
    const l = r ? `${r}.png` : `globe-${Date.now()}.png`;
    this.downloadFile(a, l);
  }
  /**
   * Start recording video using MediaRecorder
   * Prefers MP4 format when available, falls back to WebM
   * Includes legend overlay if visible
   * Returns a promise that resolves when recording has started
   */
  startVideoRecording(e = {}) {
    return new Promise((t) => {
      if (this.isRecording) {
        t();
        return;
      }
      const i = this.renderer.domElement;
      this.compositeCanvas.width = i.width, this.compositeCanvas.height = i.height, this.compositeCtx.drawImage(i, 0, 0), this.drawOverlaysOnCanvas(this.compositeCtx, this.compositeCanvas.width, this.compositeCanvas.height);
      const r = this.compositeCanvas.captureStream(60), n = [
        { mime: "video/mp4;codecs=avc1", ext: "mp4" },
        { mime: "video/mp4", ext: "mp4" },
        { mime: "video/webm;codecs=h264", ext: "webm" },
        { mime: "video/webm;codecs=vp9", ext: "webm" },
        { mime: "video/webm;codecs=vp8", ext: "webm" },
        { mime: "video/webm", ext: "webm" }
      ];
      let s = "video/webm", a = "webm";
      for (const { mime: c, ext: u } of n)
        if (MediaRecorder.isTypeSupported(c)) {
          s = c, a = u, console.log(`Video recording using: ${c}`);
          break;
        }
      this.mediaRecorder = new MediaRecorder(r, {
        mimeType: s,
        videoBitsPerSecond: 8e6
      }), this.recordedChunks = [];
      const l = a;
      this.mediaRecorder.ondataavailable = (c) => {
        c.data.size > 0 && this.recordedChunks.push(c.data);
      }, this.mediaRecorder.onstop = () => {
        const c = s.split(";")[0], u = new Blob(this.recordedChunks, { type: c }), h = URL.createObjectURL(u);
        this.downloadFile(h, `globe-${Date.now()}.${l}`), URL.revokeObjectURL(h);
      }, this.mediaRecorder.onstart = () => {
        this.isRecording = !0, setTimeout(() => t(), 50);
      }, this.mediaRecorder.start(100);
    });
  }
  /**
   * Update video frame - call this in animation loop while recording video
   * Composites the renderer output with the legend overlay
   */
  updateVideoFrame() {
    if (!this.isRecording || !this.mediaRecorder) return;
    const e = this.compositeCanvas.width, t = this.compositeCanvas.height;
    this.compositeCtx.drawImage(this.renderer.domElement, 0, 0, e, t), this.drawOverlaysOnCanvas(this.compositeCtx, e, t);
  }
  /**
   * Stop video recording
   */
  stopVideoRecording() {
    !this.isRecording || !this.mediaRecorder || (this.mediaRecorder.stop(), this.isRecording = !1);
  }
  /**
   * Start GIF capture (frame collection)
   */
  startGifCapture(e = {}) {
    if (this.isRecording) return;
    this.frames = [], this.isRecording = !0;
    const { width: t = 480, height: i = 270 } = e;
    this.gifWidth = t, this.gifHeight = i, this.captureCanvas.width = t, this.captureCanvas.height = i;
  }
  /**
   * Capture a single GIF frame (call this in animation loop)
   * Captures RGBA data directly from canvas, includes legend if visible
   */
  captureGifFrame() {
    if (!this.isRecording) return;
    const e = this.renderer.domElement, t = this.gifWidth, i = this.gifHeight;
    this.captureCtx.drawImage(e, 0, 0, t, i), this.drawOverlaysOnCanvas(this.captureCtx, t, i);
    const r = this.captureCtx.getImageData(0, 0, t, i);
    this.frames.push({
      data: new Uint8ClampedArray(r.data),
      width: t,
      height: i
    });
  }
  /**
   * Stop GIF capture and generate GIF using gifenc
   * Uses a single global palette for smooth animation (no flickering)
   */
  async stopGifCapture(e = {}) {
    if (!this.isRecording) return;
    if (this.isRecording = !1, this.frames.length === 0) {
      console.warn("No frames captured for GIF");
      return;
    }
    const { fps: t = 20, filename: i } = e, r = Math.round(1e3 / t);
    console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);
    try {
      const n = this.frames[0], s = n.width, a = n.height, l = la(n.data, 256), c = pa();
      for (let m = 0; m < this.frames.length; m++) {
        const d = this.frames[m], g = ua(d.data, l);
        c.writeFrame(g, s, a, {
          palette: m === 0 ? l : void 0,
          // Only first frame needs palette
          delay: r,
          repeat: m === 0 ? 0 : void 0
          // 0 = loop forever
        }), m % 10 === 0 && await new Promise((y) => setTimeout(y, 0));
      }
      c.finish();
      const u = c.bytes(), h = new Blob([u], { type: "image/gif" }), p = URL.createObjectURL(h), f = i || `globe-${Date.now()}.gif`;
      this.downloadFile(p, f), setTimeout(() => URL.revokeObjectURL(p), 1e3), console.log(`GIF saved: ${f} (${this.frames.length} frames, ${(h.size / 1024).toFixed(1)}KB)`);
    } catch (n) {
      console.error("Failed to generate GIF:", n);
    }
    this.frames = [];
  }
  /**
   * Check if currently recording
   */
  getIsRecording() {
    return this.isRecording;
  }
  /**
   * Get frame count for GIF
   */
  getFrameCount() {
    return this.frames.length;
  }
  downloadFile(e, t) {
    const i = document.createElement("a");
    i.href = e, i.download = t, i.style.display = "none", document.body.appendChild(i), i.click(), document.body.removeChild(i);
  }
}
const ar = {
  "%": (o) => `${o.toFixed(1)}%`,
  $: (o) => `$${o.toLocaleString()}`,
  years: (o) => `${o.toFixed(1)} yrs`,
  "% GDP": (o) => `${o.toFixed(1)}%`,
  "% of GDP": (o) => `${o.toFixed(1)}%`,
  index: (o) => o.toFixed(3),
  "": (o) => o.toFixed(3)
}, ba = ["per capita", "per 100", "per 1000"];
function yn(o) {
  return ar[o] ? ar[o] : ba.some((e) => o.includes(e)) ? (e) => `${e.toFixed(1)}` : (e) => {
    const t = Number.isInteger(e) ? e.toLocaleString() : e.toFixed(1);
    return o ? `${t} ${o}` : t;
  };
}
function Ua(o, e, t) {
  return (t ?? yn(e))(o);
}
let or = !1;
function va() {
  if (or) return;
  or = !0;
  const o = document.createElement("style");
  o.setAttribute("data-gralobe-legend", "true"), o.textContent = `
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
  `, document.head.appendChild(o);
}
class Ea {
  element;
  parentContainer;
  visible = !1;
  resizeObserver = null;
  constructor(e) {
    va(), this.parentContainer = e, getComputedStyle(e).position === "static" && (e.style.position = "relative"), this.element = document.createElement("div"), this.element.className = "gralobe-legend", this.element.setAttribute("data-testid", "globe-legend"), this.element.innerHTML = `
      <div class="gralobe-legend-hint">G: view · F: fullscreen</div>
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `, e.appendChild(this.element), this.updateSize(), this.resizeObserver = new ResizeObserver(() => this.updateSize()), this.resizeObserver.observe(e);
  }
  getSizeClass(e, t) {
    const i = Math.min(e, t);
    return i < 200 ? "xs" : i < 300 ? "sm" : i < 450 ? "md" : "lg";
  }
  updateSize() {
    const e = this.parentContainer.clientWidth, t = this.parentContainer.clientHeight, i = this.getSizeClass(e, t);
    this.element.classList.remove("size-xs", "size-sm", "size-md", "size-lg"), this.element.classList.add(`size-${i}`);
  }
  show(e) {
    const t = this.element.querySelector(".gralobe-legend-title"), i = this.element.querySelector(".gralobe-legend-gradient"), r = this.element.querySelector(".gralobe-legend-min"), n = this.element.querySelector(".gralobe-legend-max"), s = this.element.querySelector(".gralobe-legend-description");
    t.textContent = e.name, s.textContent = e.description;
    const [a, l, c] = e.colorScale;
    i.style.background = `linear-gradient(to right, ${a}, ${l}, ${c})`;
    const u = e.format ?? yn(e.unit);
    r.textContent = u(e.domain[0]), n.textContent = u(e.domain[1]), this.element.classList.add("visible"), this.visible = !0;
  }
  hide() {
    this.element.classList.remove("visible"), this.visible = !1;
  }
  isVisible() {
    return this.visible;
  }
  getElement() {
    return this.element;
  }
  dispose() {
    this.resizeObserver?.disconnect(), this.element.remove();
  }
}
const q = 50, wa = `
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
const float RADIUS = ${q.toFixed(1)};

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
`, Ca = `
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
`, Pa = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

const float PI = 3.14159265359;
const float RADIUS = ${q.toFixed(1)};

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
`, Aa = `
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
`, Sa = `
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
`, Ta = `
uniform float uOpacity;
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9 * uOpacity);
}
`, lr = Math.PI / 180;
function Ma(o, e, t = q) {
  const i = (90 - o) * lr, r = (e + 180) * lr;
  return new A.Vector3(
    -t * Math.sin(i) * Math.cos(r),
    t * Math.cos(i),
    t * Math.sin(i) * Math.sin(r)
  );
}
function Da(o, e) {
  const t = 2 * Math.PI * q, i = Math.PI * q;
  return new A.Vector3(
    e / 180 * (t / 2),
    o / 90 * (i / 2),
    0
  );
}
const La = {
  style: "spike",
  color: "#0ea5e9",
  // Cyan/teal
  maxHeight: 15,
  pulseAnimation: !0,
  opacity: 0.9
};
class Ra {
  group;
  markers = [];
  config;
  markerMeshes = [];
  glowMeshes = [];
  morph = 1;
  time = 0;
  // Cached materials
  markerMaterial;
  glowMaterial;
  constructor(e = {}) {
    this.group = new A.Group(), this.config = { ...La, ...e }, this.markerMaterial = new A.MeshBasicMaterial({
      color: new A.Color(this.config.color),
      transparent: !0,
      opacity: this.config.opacity
    }), this.glowMaterial = new A.ShaderMaterial({
      uniforms: {
        uColor: { value: new A.Color(this.config.color) },
        uTime: { value: 0 },
        uPulse: { value: this.config.pulseAnimation ? 1 : 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
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
      `,
      transparent: !0,
      blending: A.AdditiveBlending,
      side: A.BackSide,
      depthWrite: !1
    });
  }
  /**
   * Get the Three.js group containing all markers
   */
  getGroup() {
    return this.group;
  }
  /**
   * Set marker data and rebuild meshes
   */
  setMarkers(e) {
    this.markers = e, this.rebuild();
  }
  /**
   * Update configuration
   */
  setConfig(e) {
    this.config = { ...this.config, ...e }, e.color && (this.markerMaterial.color.set(e.color), this.glowMaterial.uniforms.uColor.value.set(e.color)), e.opacity !== void 0 && (this.markerMaterial.opacity = e.opacity), e.pulseAnimation !== void 0 && (this.glowMaterial.uniforms.uPulse.value = e.pulseAnimation ? 1 : 0), this.rebuild();
  }
  /**
   * Set morph value (0 = flat, 1 = globe)
   */
  setMorph(e) {
    this.morph = e, this.updatePositions();
  }
  /**
   * Update animation time
   */
  update(e) {
    this.time = e, this.glowMaterial.uniforms.uTime.value = e;
  }
  /**
   * Clear and rebuild all marker meshes
   */
  rebuild() {
    if (this.group.clear(), this.markerMeshes = [], this.glowMeshes = [], this.markers.length === 0) return;
    const e = this.markers.map((i) => i.value), t = Math.max(...e, 1);
    for (const i of this.markers) {
      const r = i.value / t, n = this.createMarkerMesh(i, r);
      if (this.markerMeshes.push(n), this.group.add(n), this.config.style !== "dot") {
        const s = this.createGlowMesh(i, r);
        this.glowMeshes.push(s), this.group.add(s);
      }
    }
    this.updatePositions();
  }
  /**
   * Create a single marker mesh
   */
  createMarkerMesh(e, t) {
    let i;
    const r = 2 + t * this.config.maxHeight;
    switch (this.config.style) {
      case "dot":
        i = new A.SphereGeometry(1 + t * 2, 16, 12);
        break;
      case "pin":
        i = new A.ConeGeometry(1.5, r, 8);
        break;
      case "spike":
      default:
        i = new A.CylinderGeometry(0.3, 1.2, r, 8);
        break;
    }
    const n = e.color ? new A.MeshBasicMaterial({
      color: new A.Color(e.color),
      transparent: !0,
      opacity: this.config.opacity
    }) : this.markerMaterial, s = new A.Mesh(i, n);
    return s.userData = { marker: e, height: r }, s;
  }
  /**
   * Create glow mesh for marker
   */
  createGlowMesh(e, t) {
    const i = 2 + t * 3, r = new A.SphereGeometry(i, 16, 12), n = e.color ? new A.ShaderMaterial({
      ...this.glowMaterial,
      uniforms: {
        ...this.glowMaterial.uniforms,
        uColor: { value: new A.Color(e.color) }
      }
    }) : this.glowMaterial, s = new A.Mesh(r, n);
    return s.userData = { marker: e }, s;
  }
  /**
   * Update marker positions based on morph value
   */
  updatePositions() {
    for (let e = 0; e < this.markerMeshes.length; e++) {
      const t = this.markerMeshes[e], i = t.userData.marker, r = t.userData.height, n = Ma(i.lat, i.lng, q), s = Da(i.lat, i.lng), a = this.morph * this.morph * (3 - 2 * this.morph);
      if (t.position.lerpVectors(s, n, a), a > 0.01) {
        if (t.lookAt(t.position.clone().multiplyScalar(2)), this.config.style === "spike" || this.config.style === "pin") {
          t.rotateX(Math.PI / 2);
          const l = n.clone().normalize().multiplyScalar(r / 2);
          t.position.add(l.multiplyScalar(a));
        }
      } else
        t.rotation.set(-Math.PI / 2, 0, 0), (this.config.style === "spike" || this.config.style === "pin") && (t.position.z = r / 2);
      this.glowMeshes[e] && this.glowMeshes[e].position.copy(t.position);
    }
  }
  /**
   * Find marker at screen position (for click/hover)
   */
  getMarkerAtPosition(e, t, i) {
    e.setFromCamera(i, t);
    const r = e.intersectObjects(this.markerMeshes);
    return r.length > 0 ? r[0].object.userData.marker : null;
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    this.group.clear(), this.markerMaterial.dispose(), this.glowMaterial.dispose();
    for (const e of this.markerMeshes)
      e.geometry.dispose(), e.material !== this.markerMaterial && e.material.dispose();
    for (const e of this.glowMeshes)
      e.geometry.dispose(), e.material !== this.glowMaterial && e.material.dispose();
    this.markerMeshes = [], this.glowMeshes = [];
  }
}
const fi = {
  lifeExpectancy: {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Average life expectancy at birth",
    colorScale: ["#feedde", "#fdbe85", "#d94701"],
    domain: [55, 85],
    format: (o) => `${o.toFixed(1)} years`
  },
  humanDevIndex: {
    id: "humanDevIndex",
    name: "Human Development Index",
    unit: "",
    description: "UN composite index of life expectancy, education, and income",
    colorScale: ["#fee5d9", "#fcae91", "#cb181d"],
    domain: [0.4, 1],
    format: (o) => o.toFixed(3)
  },
  gdpPerCapita: {
    id: "gdpPerCapita",
    name: "GDP per Capita (PPP)",
    unit: "$",
    description: "Purchasing power parity adjusted GDP per person",
    colorScale: ["#edf8e9", "#74c476", "#006d2c"],
    domain: [1e3, 8e4],
    format: (o) => `$${(o / 1e3).toFixed(1)}k`
  },
  co2Emissions: {
    id: "co2Emissions",
    name: "CO₂ Emissions",
    unit: "t/capita",
    description: "Carbon dioxide emissions per capita",
    colorScale: ["#f7fbff", "#6baed6", "#08306b"],
    domain: [0, 20],
    format: (o) => `${o.toFixed(1)}t`
  },
  renewableEnergy: {
    id: "renewableEnergy",
    name: "Renewable Energy",
    unit: "%",
    description: "Share of renewable energy in total energy consumption",
    colorScale: ["#f7fcf5", "#74c476", "#00441b"],
    domain: [0, 100],
    format: (o) => `${o.toFixed(0)}%`
  },
  internetUsers: {
    id: "internetUsers",
    name: "Internet Penetration",
    unit: "%",
    description: "Percentage of population using the internet",
    colorScale: ["#f2f0f7", "#9e9ac8", "#54278f"],
    domain: [0, 100],
    format: (o) => `${o.toFixed(0)}%`
  },
  urbanPopulation: {
    id: "urbanPopulation",
    name: "Urbanization",
    unit: "%",
    description: "Percentage of population living in urban areas",
    colorScale: ["#fff5eb", "#fd8d3c", "#7f2704"],
    domain: [15, 100],
    format: (o) => `${o.toFixed(0)}%`
  },
  healthExpenditure: {
    id: "healthExpenditure",
    name: "Health Spending",
    unit: "% GDP",
    description: "Total health expenditure as percentage of GDP",
    colorScale: ["#fff5f0", "#fb6a4a", "#99000d"],
    domain: [2, 18],
    format: (o) => `${o.toFixed(1)}%`
  },
  forestArea: {
    id: "forestArea",
    name: "Forest Coverage",
    unit: "%",
    description: "Forest area as percentage of total land area",
    colorScale: ["#f7fcf5", "#41ab5d", "#00441b"],
    domain: [0, 75],
    format: (o) => `${o.toFixed(0)}%`
  },
  population: {
    id: "population",
    name: "Population",
    unit: "millions",
    description: "Total population",
    colorScale: ["#fff7bc", "#fec44f", "#d95f0e"],
    domain: [1, 1500],
    format: (o) => `${o.toFixed(0)}M`
  },
  accessElectricity: {
    id: "accessElectricity",
    name: "Electricity Access",
    unit: "%",
    description: "Percentage of population with access to electricity",
    colorScale: ["#ffeda0", "#feb24c", "#f03b20"],
    domain: [20, 100],
    format: (o) => `${o.toFixed(0)}%`
  },
  educationExpenditure: {
    id: "educationExpenditure",
    name: "Education Spending",
    unit: "% GDP",
    description: "Government expenditure on education as percentage of GDP",
    colorScale: ["#edf8fb", "#7bccc4", "#0868ac"],
    domain: [1, 10],
    format: (o) => `${o.toFixed(1)}%`
  }
};
fi.lifeExpectancy;
const Ia = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_urban_areas.geojson";
class Oa {
  static urbanFeatures = null;
  static isLoading = !1;
  static loadPromise = null;
  /**
   * Load the base urban areas topology
   */
  static async loadBaseTopology() {
    return this.urbanFeatures ? this.urbanFeatures : this.loadPromise ? this.loadPromise : (this.isLoading = !0, this.loadPromise = (async () => {
      try {
        const e = await fetch(Ia);
        if (!e.ok) throw new Error("Failed to load urban areas");
        const t = await e.json();
        return this.urbanFeatures = t.features, this.urbanFeatures || [];
      } catch (e) {
        return console.error("UrbanMapper load error:", e), [];
      } finally {
        this.isLoading = !1;
      }
    })(), this.loadPromise);
  }
  /**
   * Generate a synthetic circular polygon (approximate) for a point
   * @param lat Latitude
   * @param lon Longitude
   * @param radiusKm Radius in km (default 5km)
   */
  static generateSyntheticBoundary(e, t, i = 85) {
    const n = [], a = i / 6371 * (180 / Math.PI), l = a / Math.cos(e * Math.PI / 180);
    for (let c = 0; c <= 16; c++) {
      const u = c / 16 * 2 * Math.PI, h = e + a * Math.sin(u), p = t + l * Math.cos(u);
      n.push([p, h]);
    }
    return {
      type: "Feature",
      id: `synthetic_${e.toFixed(4)}_${t.toFixed(4)}_${i}`,
      properties: {
        name: "Unknown City",
        featurecla: "Synthetic Urban Area"
      },
      geometry: {
        type: "Polygon",
        coordinates: [n]
      }
    };
  }
  /**
   * Map points to urban areas or generate synthetic ones
   */
  static async mapPointsToTopology(e, t = 85, i = !1) {
    console.log(
      "UrbanMapper.mapPointsToTopology called with radius:",
      t,
      "forceSynthetic:",
      i
    );
    const r = i ? [] : await this.loadBaseTopology(), n = [], s = {}, a = /* @__PURE__ */ new Set();
    for (const l of e) {
      let c = null;
      if (!i) {
        for (const u of r)
          if (this.isPointInFeature(l, u)) {
            c = u;
            break;
          }
      }
      if (c) {
        const u = c.properties.name_conve || c.properties.name || `ua_${Math.random()}`, h = a.has(u) ? null : JSON.parse(JSON.stringify(c));
        h && (h.id = u, l.name ? h.properties.name = l.name : h.properties.name || (h.properties.name = u), n.push(h), a.add(u)), s[u] = (s[u] || 0) + l.value;
      } else {
        const u = this.generateSyntheticBoundary(
          l.lat,
          l.lon,
          t
        );
        l.id && (u.id = l.id), l.name && (u.properties.name = l.name), n.push(u), s[u.id] = l.value;
      }
    }
    return {
      features: n,
      statistics: s
    };
  }
  // Minimal Ray-Casting algorithm for Polygon/MultiPolygon
  static isPointInFeature(e, t) {
    const { lat: i, lon: r } = e, n = t.geometry;
    if (!n) return !1;
    const s = n.coordinates;
    if (n.type === "Polygon")
      return this.pointInPolygon([r, i], s);
    if (n.type === "MultiPolygon") {
      for (const a of s)
        if (this.pointInPolygon([r, i], a)) return !0;
    }
    return !1;
  }
  static pointInPolygon(e, t) {
    const i = e[0], r = e[1];
    let n = !1;
    const s = t[0];
    for (let a = 0, l = s.length - 1; a < s.length; l = a++) {
      const c = s[a][0], u = s[a][1], h = s[l][0], p = s[l][1];
      u > r != p > r && i < (h - c) * (r - u) / (p - u) + c && (n = !n);
    }
    return n;
  }
}
const cr = {
  satellite: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  natural: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",
  dark: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  light: "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
  night: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  topographic: "https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"
}, ur = {
  texture: "satellite",
  labels: "data",
  statistic: "lifeExpectancy",
  autoRotate: !1,
  initialView: "globe",
  showControls: !1,
  showLegend: !0,
  effects: {
    atmosphereIntensity: 0,
    atmosphere: !1,
    clouds: !1,
    starTwinkle: !0
  },
  extrudeHeight: !1,
  pointRadius: 140
};
class za {
  container;
  config;
  // Three.js core
  scene;
  camera;
  renderer;
  controls;
  // Globe components
  globe = null;
  material = null;
  atmosphere = null;
  stars = null;
  // Helper components
  gui = null;
  choropleth = null;
  legend = null;
  exporter = null;
  countryLabels = null;
  markerLayer = null;
  textureLoader = new A.TextureLoader();
  dataTexture = null;
  // State
  morph = 0;
  currentStatistic = null;
  currentValues = null;
  animationId = null;
  isDestroyed = !1;
  urbanPoints = null;
  /** Promise that resolves when fully initialized */
  ready;
  resolveReady;
  rejectReady;
  /**
   * Create a new GlobeViz instance
   * @param container CSS selector or HTMLElement
   * @param config Configuration options
   */
  constructor(e, t = {}) {
    if (typeof e == "string") {
      const i = document.querySelector(e);
      if (!i) throw new Error(`Container not found: ${e}`);
      this.container = i;
    } else
      this.container = e;
    this.config = {
      ...ur,
      ...t,
      effects: { ...ur.effects, ...t.effects }
    }, this.ready = new Promise((i, r) => {
      this.resolveReady = i, this.rejectReady = r;
    }), this.init();
  }
  async init() {
    try {
      const e = this.config.width || this.container.clientWidth || 800, t = this.config.height || this.container.clientHeight || 600;
      this.scene = new A.Scene(), this.scene.background = new A.Color(2066), this.camera = new A.PerspectiveCamera(50, e / t, 0.1, 1e3), this.camera.position.set(
        0,
        0,
        this.config.initialView === "flat" ? 350 : 150
      ), this.renderer = new A.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(e, t), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.container.appendChild(this.renderer.domElement), this.controls = new _n(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.minDistance = 2, this.controls.maxDistance = 400, this.choropleth = new Ze(
        this.config.topology,
        (r, n) => {
          this.config.onLoadProgress?.(r, n);
        },
        () => {
          this.material && this.material.uniforms.uDataTexture.value && (this.material.uniforms.uDataTexture.value.needsUpdate = !0, this.material.uniforms.uDataOverlay.value = 1, this.material.uniforms.uDataOpacity.value === 0 && j.to(this.material.uniforms.uDataOpacity, {
            value: 0.7,
            duration: 1
          }));
        }
      ), this.config.showLegend && (this.legend = new Ea(this.container)), await this.createGlobe(), this.createStars(), this.config.effects.atmosphere && this.createAtmosphere(), this.countryLabels = new ia(this.container, q), this.scene.add(this.countryLabels.getGroup()), this.globe && this.countryLabels.setGlobe(this.globe), this.countryLabels.setCamera(this.camera), this.countryLabels.setStyle(this.config.labels), this.exporter = new xa(this.renderer, this.scene, this.camera), this.legend && this.exporter.setLegendElement(this.legend.getElement()), this.countryLabels && this.exporter.setCountryLabels(this.countryLabels), this.config.showControls && this.createGUI(), this.setupInteraction(), await this.choropleth.waitForLoad();
      const i = this.choropleth.getFeatureLabels();
      i.length > 0 && this.addCustomLabels(i), this.setStatistic(this.config.statistic), this.morph = this.config.initialView === "globe" ? 1 : 0, this.material && (this.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), window.addEventListener("resize", this.handleResize), document.addEventListener(
        "fullscreenchange",
        this.handleFullscreenChange
      ), this.renderer.domElement.tabIndex = 0, this.renderer.domElement.style.outline = "none", this.renderer.domElement.addEventListener("mousedown", () => {
        this.renderer.domElement.focus();
      }), this.renderer.domElement.addEventListener("keydown", this.handleKeydown), this.animate(), this.resolveReady();
    } catch (e) {
      console.error("GlobeViz init failed:", e), this.rejectReady(e);
    }
  }
  // ... (existing code)
  handleKeydown = (e) => {
    this.isDestroyed || document.activeElement === this.renderer.domElement && ((e.key === "g" || e.key === "G") && (this.morph > 0.5 ? this.toFlat() : this.toGlobe()), (e.key === "f" || e.key === "F") && this.toggleFullscreen());
  };
  async createGlobe() {
    const e = this.textureLoader.loadAsync(
      cr[this.config.texture]
    ), t = new Promise(
      (s, a) => setTimeout(
        () => a(new Error("Texture load timed out after 10s")),
        1e4
      )
    ), i = await Promise.race([e, t]);
    i.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), i.minFilter = A.LinearMipmapLinearFilter, i.magFilter = A.LinearFilter;
    const r = document.createElement("canvas");
    r.width = 2048, r.height = 1024, this.dataTexture = new A.CanvasTexture(r);
    const n = new A.PlaneGeometry(
      Math.PI * 2 * q,
      Math.PI * q,
      256,
      128
    );
    this.material = new A.ShaderMaterial({
      vertexShader: wa,
      fragmentShader: Ca,
      uniforms: {
        // Core uniforms
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uParchment: { value: 0 },
        uExtremeParchment: { value: 0 },
        uTransitionEffect: { value: 0 },
        uTexture: { value: i },
        uDataTexture: { value: this.dataTexture },
        uCloudTexture: { value: null },
        uNightTexture: { value: null },
        uDataOpacity: { value: 0 },
        uDataOverlay: { value: 0 },
        uExtrudeHeight: { value: this.config.extrudeHeight ? 1 : 0 },
        uSunDir: { value: new A.Vector3(1, 0.5, 1).normalize() },
        // Effect uniforms
        uClouds: { value: this.config.effects.clouds ? 1 : 0 },
        uCloudSpeed: { value: this.config.effects.cloudSpeed || 1 },
        uCloudOpacity: { value: this.config.effects.cloudOpacity || 0.6 },
        uAtmosphereIntensity: {
          value: this.config.effects.atmosphereIntensity || 0
        },
        uAurora: { value: this.config.effects.aurora ? 1 : 0 },
        uAuroraIntensity: { value: 1 },
        uCityLights: { value: this.config.effects.cityLights ? 1 : 0 },
        uCityLightsIntensity: { value: 1 },
        uOceanSpecular: { value: this.config.effects.oceanSpecular ? 1 : 0 },
        uSpecularIntensity: { value: 1 },
        uSunGlow: { value: 0 },
        uGridLines: { value: this.config.effects.gridLines ? 1 : 0 },
        uGridOpacity: { value: this.config.effects.gridOpacity || 0.5 },
        uScanEffect: { value: 0 },
        uScanSpeed: { value: 1 },
        uHologram: { value: this.config.effects.hologramMode ? 1 : 0 },
        uHologramColor: { value: new A.Color(65535) },
        uVintage: { value: this.config.effects.vintageMode ? 1 : 0 },
        uThermal: { value: this.config.effects.thermalMode ? 1 : 0 },
        uBlueprint: { value: this.config.effects.blueprintMode ? 1 : 0 },
        uGlowPulse: { value: this.config.effects.glowPulse ? 1 : 0 },
        uGlowColor: { value: new A.Color(4491519) }
      },
      side: A.DoubleSide
    }), this.globe = new A.Mesh(n, this.material), this.scene.add(this.globe);
  }
  createAtmosphere() {
    const e = new A.PlaneGeometry(
      Math.PI * 2 * q * 1.15,
      Math.PI * q * 1.15,
      128,
      64
    ), t = new A.ShaderMaterial({
      vertexShader: Pa,
      fragmentShader: Aa,
      uniforms: {
        uMorph: { value: 0 },
        uOpacity: { value: 1 }
      },
      side: A.BackSide,
      transparent: !0,
      blending: A.AdditiveBlending,
      depthWrite: !1
    });
    this.atmosphere = new A.Mesh(e, t), this.scene.add(this.atmosphere);
  }
  createStars() {
    const t = new A.BufferGeometry(), i = new Float32Array(3e3 * 3), r = new Float32Array(3e3), n = new Float32Array(3e3);
    for (let a = 0; a < 3e3; a++) {
      const l = 300 + Math.random() * 300, c = Math.random() * Math.PI * 2, u = Math.acos(2 * Math.random() - 1);
      i[a * 3] = l * Math.sin(u) * Math.cos(c), i[a * 3 + 1] = l * Math.sin(u) * Math.sin(c), i[a * 3 + 2] = l * Math.cos(u), r[a] = 0.5 + Math.random() * 1.5, n[a] = Math.random() * Math.PI * 2;
    }
    t.setAttribute("position", new A.BufferAttribute(i, 3)), t.setAttribute("aSize", new A.BufferAttribute(r, 1)), t.setAttribute("aPhase", new A.BufferAttribute(n, 1));
    const s = new A.ShaderMaterial({
      vertexShader: Sa,
      fragmentShader: Ta,
      uniforms: {
        uTime: { value: 0 },
        uTwinkle: { value: this.config.effects.starTwinkle ? 1 : 0 },
        uOpacity: { value: 1 }
      },
      transparent: !0,
      blending: A.AdditiveBlending,
      depthWrite: !1
    });
    this.stars = new A.Points(t, s), this.scene.add(this.stars);
  }
  createGUI() {
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.gui = new Ii({
      container: this.container,
      title: "⚙ Controls",
      width: 220,
      closeFolders: !0
    });
    const t = this.gui.domElement;
    t.style.position = "absolute", t.style.top = "8px", t.style.right = "8px", t.style.zIndex = "100", this.gui.close();
    const i = this.gui.addFolder("View");
    i.add({ toGlobe: () => this.toGlobe() }, "toGlobe").name("→ Globe"), i.add({ toFlat: () => this.toFlat() }, "toFlat").name("→ Flat"), i.add({ morph: this.morph }, "morph", 0, 1).name("Morph").onChange((l) => this.setMorph(l));
    const r = this.gui.addFolder("Statistics"), n = Object.keys(fi);
    r.add({ stat: this.config.statistic }, "stat", n).name("Statistic").onChange((l) => this.setStatistic(l));
    const s = [
      "none",
      "minimal",
      "major",
      "all",
      "all-countries",
      "data"
    ];
    this.gui.addFolder("Display").add({ labels: this.config.labels }, "labels", s).name("Labels").onChange((l) => this.setLabels(l)), this.gui.add(this.config, "autoRotate").name("Auto Rotate"), this.gui.addFolder("Export").add(
      { screenshot: () => this.screenshot({ width: 1920, height: 1080 }) },
      "screenshot"
    ).name("📷 Screenshot");
  }
  handleResize = () => {
    if (this.isDestroyed) return;
    const e = this.config.width || this.container.clientWidth, t = this.config.height || this.container.clientHeight;
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.countryLabels?.resize(e, t);
  };
  handleFullscreenChange = () => {
    this.isDestroyed || setTimeout(() => this.handleResize(), 50);
  };
  animate = () => {
    if (this.isDestroyed) return;
    this.animationId = requestAnimationFrame(this.animate);
    const e = performance.now() * 1e-3;
    this.material && (this.material.uniforms.uTime.value = e), this.stars && (this.stars.material.uniforms.uTime.value = e), this.controls.update(), this.config.autoRotate && this.globe && (this.globe.rotation.y += 2e-3 * this.morph), this.countryLabels?.update(), this.markerLayer?.update(e), this.renderer.render(this.scene, this.camera), this.countryLabels?.render(this.scene, this.camera);
  };
  // Public API Implementation
  toGlobe() {
    this.controls.enableRotate = !0, this.controls.minAzimuthAngle = -1 / 0, this.controls.maxAzimuthAngle = 1 / 0, this.controls.minPolarAngle = 0, this.controls.maxPolarAngle = Math.PI, this.controls.screenSpacePanning = !1, this.controls.mouseButtons = {
      LEFT: A.MOUSE.ROTATE,
      MIDDLE: A.MOUSE.DOLLY,
      RIGHT: A.MOUSE.PAN
    };
    let e = 0;
    const t = this.choropleth?.getBounds();
    if (t) {
      const [i, r, n, s] = t;
      e = -((i + n) / 2) * (Math.PI / 180);
    }
    j.to(this, {
      morph: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), this.markerLayer?.setMorph(this.morph), this.config.onViewChange?.("globe", this.morph);
      }
    }), j.to(this.camera.position, {
      x: 0,
      y: 0,
      z: 200,
      duration: 2.5,
      ease: "power2.inOut"
    }), j.to(this.controls.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls.update();
      }
    }), this.globe && j.to(this.globe.rotation, {
      y: e,
      x: 0,
      z: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), this.stars && j.to(this.stars.material.uniforms.uOpacity, {
      value: 1,
      duration: 1
    }), this.atmosphere && j.to(
      this.atmosphere.material.uniforms.uOpacity,
      {
        value: 1,
        duration: 1
      }
    );
  }
  toFlat() {
    const e = this.choropleth?.getBounds(), t = Math.PI * 2 * q, i = Math.PI * q;
    let r = 0, n = 0, s = t, a = i;
    if (e) {
      const [f, m, d, g] = e, y = f / 180 * (t / 2), _ = d / 180 * (t / 2), x = m / 90 * (i / 2), v = g / 90 * (i / 2);
      r = (y + _) / 2, n = (x + v) / 2, s = (_ - y) * 1.2, a = (v - x) * 1.2;
    }
    const l = this.camera.fov * Math.PI / 180, c = this.camera.aspect, u = a / 2 / Math.tan(l / 2), h = s / (2 * Math.tan(l / 2) * c), p = Math.max(u, h);
    this.controls.enabled = !1, j.to(this, {
      morph: 0,
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => {
        this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), this.markerLayer?.setMorph(this.morph), this.config.onViewChange?.("flat", this.morph);
      },
      onComplete: () => {
        this.controls.enabled = !0, this.controls.enableRotate = !1, this.controls.enableZoom = !0, this.controls.enablePan = !0, this.controls.minAzimuthAngle = 0, this.controls.maxAzimuthAngle = 0, this.controls.minPolarAngle = Math.PI / 2, this.controls.maxPolarAngle = Math.PI / 2, this.controls.target.set(r, n, 0), this.controls.update();
      }
    }), this.globe && j.to(this.globe.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power3.inOut"
    }), this.atmosphere && j.to(this.atmosphere.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power3.inOut"
    }), j.to(this.camera.position, {
      x: r,
      y: n,
      z: p,
      duration: 2,
      ease: "power3.inOut"
    }), j.to(this.controls.target, {
      x: r,
      y: n,
      z: 0,
      duration: 2,
      ease: "power3.inOut"
    }), j.to(this.camera.up, {
      x: 0,
      y: 1,
      z: 0,
      duration: 2,
      ease: "power3.inOut"
    }), this.controls.screenSpacePanning = !0, this.controls.mouseButtons = {
      LEFT: A.MOUSE.PAN,
      MIDDLE: A.MOUSE.DOLLY,
      RIGHT: A.MOUSE.ROTATE
    }, this.stars && j.to(this.stars.material.uniforms.uOpacity, {
      value: 0,
      duration: 1
    }), this.atmosphere && j.to(
      this.atmosphere.material.uniforms.uOpacity,
      {
        value: 0,
        duration: 1
      }
    );
  }
  /**
   * Setup mouse interactions (Click to Zoom, etc.)
   */
  setupInteraction() {
    const e = new A.Raycaster(), t = new A.Vector2(), i = new A.Plane(new A.Vector3(0, 0, 1), 0), r = new A.Vector3();
    let n = !1, s = (/* @__PURE__ */ new Date()).getTime();
    this.renderer.domElement.addEventListener("mousedown", () => {
      n = !1, s = (/* @__PURE__ */ new Date()).getTime();
    }), this.renderer.domElement.addEventListener("mousemove", () => {
      n = !0;
    }), this.renderer.domElement.addEventListener("click", (a) => {
      if (n && (/* @__PURE__ */ new Date()).getTime() - s > 200) return;
      const l = this.renderer.domElement.getBoundingClientRect();
      if (t.x = (a.clientX - l.left) / l.width * 2 - 1, t.y = -((a.clientY - l.top) / l.height) * 2 + 1, this.morph < 0.1 && (e.setFromCamera(t, this.camera), e.ray.intersectPlane(i, r), r)) {
        const c = Math.PI * q, u = Math.PI * q / 2;
        Math.abs(r.x) <= c && Math.abs(r.y) <= u && (j.to(this.controls.target, {
          x: r.x,
          y: r.y,
          z: 0,
          duration: 1.5,
          ease: "power2.inOut"
        }), j.to(this.camera.position, {
          x: r.x,
          y: r.y,
          z: 50,
          duration: 1.5,
          ease: "power2.inOut"
        }));
      }
    }), this.renderer.domElement.addEventListener("dblclick", () => {
      this.morph < 0.1 && this.toFlat();
    });
  }
  setMorph(e) {
    this.morph = Math.max(0, Math.min(1, e)), this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), this.markerLayer?.setMorph(this.morph);
  }
  getMorph() {
    return this.morph;
  }
  setStatistic(e) {
    if (typeof e == "string") {
      const t = fi[e];
      if (!t) {
        console.warn(`Unknown statistic: ${e}`);
        return;
      }
      if (!t) {
        console.warn(`Unknown statistic: ${e}`);
        return;
      }
      this.currentStatistic = e, this.currentValues = null;
      const i = tr.find((r) => r.id === e);
      if (i && this.choropleth) {
        const r = this.choropleth.renderTexture(i);
        if (this.material && r) {
          const n = new A.CanvasTexture(r);
          n.needsUpdate = !0, this.material.uniforms.uDataTexture.value = n, this.material.uniforms.uDataOverlay.value = 1, this.material.uniforms.uDataOpacity.value = 0.7;
        }
      }
      if (this.legend && i && this.legend.show(i), this.countryLabels && this.choropleth) {
        const r = this.choropleth.getStatsMap(), n = r ? Array.from(r.values()).map((s) => s.code) : [];
        this.countryLabels.setDataIds(n);
      }
    } else {
      const t = e;
      if (this.currentStatistic = t.definition.id, this.currentValues = t.values instanceof Map ? Object.fromEntries(t.values) : t.values, this.choropleth) {
        const i = this.choropleth.renderCustomTexture(
          t.values,
          t.definition.colorScale,
          t.definition.domain
        );
        if (this.material && i) {
          const r = new A.CanvasTexture(i);
          r.needsUpdate = !0, this.material.uniforms.uDataTexture.value = r, this.material.uniforms.uDataOverlay.value = 1, this.material.uniforms.uDataOpacity.value = 0.7;
        }
      }
      if (this.legend && this.legend.show(t.definition), this.countryLabels) {
        const i = t.values instanceof Map ? Object.fromEntries(t.values) : t.values;
        this.countryLabels.setDataIds(Object.keys(i));
      }
    }
  }
  setLabels(e) {
    this.countryLabels?.setStyle(e);
  }
  /**
   * Add custom labels for cities, states, or any geographic points
   */
  addCustomLabels(e) {
    this.countryLabels?.addCustomLabels(e);
  }
  /**
   * Clear all custom labels (keeps country labels)
   */
  clearCustomLabels() {
    this.countryLabels?.clearCustomLabels();
  }
  async setTexture(e) {
    const t = cr[e];
    if (!(!t || !this.material))
      try {
        const i = await this.textureLoader.loadAsync(t);
        i.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), i.minFilter = A.LinearMipmapLinearFilter, i.magFilter = A.LinearFilter, this.material.uniforms.uTexture.value = i;
      } catch (i) {
        console.error("Failed to load texture:", e, i);
      }
  }
  setAutoRotate(e) {
    this.config.autoRotate = e;
  }
  screenshot(e) {
    this.exporter?.screenshot(e);
  }
  async recordGif(e) {
    if (!this.exporter) return;
    const t = e?.duration || 5, i = e?.fps || 20, r = t * i;
    this.exporter.startGifCapture(e);
    for (let n = 0; n < r; n++)
      this.exporter.captureGifFrame(), await new Promise((s) => setTimeout(s, 1e3 / i));
  }
  async recordVideo(e) {
    if (!this.exporter) return;
    const t = e?.duration || 5;
    await this.exporter.startVideoRecording(e), await new Promise((i) => setTimeout(i, t * 1e3)), this.exporter.stopVideoRecording();
  }
  setEffects(e) {
    Object.assign(this.config.effects, e), this.material && (e.atmosphere !== void 0 && (e.atmosphere && !this.atmosphere ? this.createAtmosphere() : !e.atmosphere && this.atmosphere && (this.scene.remove(this.atmosphere), this.atmosphere.geometry.dispose(), this.atmosphere.material.dispose(), this.atmosphere = null)), e.clouds !== void 0 && (this.material.uniforms.uClouds.value = e.clouds ? 1 : 0), e.cloudSpeed !== void 0 && (this.material.uniforms.uCloudSpeed.value = e.cloudSpeed), e.cloudOpacity !== void 0 && (this.material.uniforms.uCloudOpacity.value = e.cloudOpacity), e.atmosphereIntensity !== void 0 && (this.material.uniforms.uAtmosphereIntensity.value = e.atmosphereIntensity), e.gridLines !== void 0 && (this.material.uniforms.uGridLines.value = e.gridLines ? 1 : 0), e.gridOpacity !== void 0 && (this.material.uniforms.uGridOpacity.value = e.gridOpacity), e.glowPulse !== void 0 && (this.material.uniforms.uGlowPulse.value = e.glowPulse ? 1 : 0), e.starTwinkle !== void 0 && this.stars && (this.stars.material.uniforms.uTwinkle.value = e.starTwinkle ? 1 : 0));
  }
  setMarkers(e, t) {
    this.markerLayer ? t && this.markerLayer.setConfig(t) : (this.markerLayer = new Ra(t), this.scene.add(this.markerLayer.getGroup()), this.markerLayer.setMorph(this.morph)), this.markerLayer.setMarkers(e);
  }
  async setUrbanData(e) {
    if (!this.choropleth) return;
    this.urbanPoints = e;
    const t = this.config.pointRadius || 140, i = await Oa.mapPointsToTopology(
      e,
      t,
      !0
    );
    this.choropleth.setFeatures(i.features);
    const r = this.choropleth.getFeatureLabels();
    r.length > 0 && this.addCustomLabels(r);
    const n = [
      "#ffffb2",
      "#fd8d3c",
      "#bd0026"
    ], s = Object.values(i.statistics), a = Math.max(...s, 1);
    if (this.choropleth.renderCustomTexture(i.statistics, n, [
      0,
      a
    ]), this.material && this.material.uniforms.uDataTexture.value && (this.material.uniforms.uDataTexture.value.needsUpdate = !0, this.material.uniforms.uDataOverlay.value = 1), this.currentValues = i.statistics, this.material && (this.material.uniforms.uCityLights.value = 1, this.config.effects.cityLights = !0), this.countryLabels && (this.countryLabels.getGroup().visible = !0), this.gui) {
      let l = this.gui.folders.find(
        (h) => h._title === "Display"
      );
      if (l || (l = this.gui.addFolder("Display")), !l.controllers.some(
        (h) => h.property === "pointRadius"
      )) {
        const h = { pointRadius: this.config.pointRadius || 140 }, p = l.add(h, "pointRadius", 10, 500, 5).name("Point Marker Radius").onChange(async (f) => {
          this.config.pointRadius = f, this.urbanPoints && await this.setUrbanData(this.urbanPoints);
        });
        this.addTooltip(
          p,
          "<b>Synthetic Geometry Radius</b><br><br>If our data consists of point locations (like cities) without defined 2D borders, we generate synthetic circular boundaries for them.<br><br>This control scales the size (in km) of these generated circles. Larger values make small cities more visible on the global map."
        );
      }
    }
  }
  resize(e, t) {
    this.config.width = e, this.config.height = t, this.handleResize();
  }
  async toggleFullscreen() {
    document.fullscreenElement ? (await document.exitFullscreen(), setTimeout(() => this.handleResize(), 100)) : (await this.container.requestFullscreen(), setTimeout(() => this.handleResize(), 100));
  }
  isFullscreen() {
    return document.fullscreenElement === this.container;
  }
  getCurrentData() {
    if (this.currentStatistic) {
      if (this.currentValues) {
        if (this.choropleth) {
          const t = {}, i = Array.isArray(this.currentValues) ? this.currentValues : Object.entries(this.currentValues);
          for (const [r, n] of i) {
            const s = this.choropleth.getFeatureName(r) || r;
            t[s] = n;
          }
          return t;
        }
        return this.currentValues;
      }
      const e = tr.find(
        (t) => t.id === this.currentStatistic
      );
      if (e && this.choropleth) {
        const t = this.choropleth.getStatsMap(), i = {};
        return t.forEach((r, n) => {
          const s = e.accessor(r), a = r.name || n;
          s != null && (i[a] = s);
        }), i;
      }
    }
    return {};
  }
  destroy() {
    this.isDestroyed = !0, this.animationId && cancelAnimationFrame(this.animationId), window.removeEventListener("resize", this.handleResize), window.removeEventListener("keydown", this.handleKeydown), document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    ), this.gui?.destroy(), this.legend?.dispose(), this.countryLabels?.dispose(), this.markerLayer?.dispose(), document.querySelectorAll(".lil-gui-tooltip").forEach((e) => e.remove()), this.globe?.geometry.dispose(), this.globe?.material?.dispose(), this.atmosphere?.geometry.dispose(), this.atmosphere?.material?.dispose(), this.stars?.geometry.dispose(), this.stars?.material?.dispose(), this.renderer.dispose(), this.container.removeChild(this.renderer.domElement);
  }
  addTooltip(e, t) {
    const i = e.domElement;
    i && (i.title = t.replace(/<br>/g, `
`).replace(/<b>|<\/b>/g, ""), i.parentElement.addEventListener("mouseenter", (r) => {
      const n = document.createElement("div");
      n.className = "lil-gui-tooltip", n.innerHTML = t, n.style.position = "fixed", n.style.background = "rgba(0, 0, 0, 0.9)", n.style.color = "#fff", n.style.padding = "8px 12px", n.style.borderRadius = "4px", n.style.fontSize = "12px", n.style.maxWidth = "200px", n.style.pointerEvents = "none", n.style.zIndex = "10000", n.style.border = "1px solid #333", n.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)", document.body.appendChild(n);
      const s = (l) => {
        n.style.left = l.clientX + 10 + "px", n.style.top = l.clientY + 10 + "px";
      };
      window.addEventListener("mousemove", s);
      const a = () => {
        n.remove(), window.removeEventListener("mousemove", s), i.parentElement.removeEventListener(
          "mouseleave",
          a
        );
      };
      i.parentElement.addEventListener("mouseleave", a);
    }));
  }
}
export {
  fi as BUILT_IN_STATISTICS,
  za as GlobeViz,
  hn as WORLD_STATISTICS,
  yn as createFormatter,
  Ua as formatValue,
  Xs as normalizeCountryValues,
  ir as toNumericCode
};
//# sourceMappingURL=gralobe.js.map
