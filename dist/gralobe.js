import * as S from "three";
import { Controls as kr, Vector3 as se, MOUSE as tt, TOUCH as Qe, Quaternion as Yi, Spherical as Zi, Vector2 as de, Ray as Ur, Plane as Fr, MathUtils as zr, Matrix4 as Tn, Object3D as Nr } from "three";
function we(a) {
  if (a === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a;
}
function Sn(a, e) {
  a.prototype = Object.create(e.prototype), a.prototype.constructor = a, a.__proto__ = e;
}
var he = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, st = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Pi, K, z, fe = 1e8, k = 1 / fe, oi = Math.PI * 2, $r = oi / 4, Br = 0, Dn = Math.sqrt, Gr = Math.cos, Vr = Math.sin, Z = function(e) {
  return typeof e == "string";
}, G = function(e) {
  return typeof e == "function";
}, Ce = function(e) {
  return typeof e == "number";
}, Ci = function(e) {
  return typeof e > "u";
}, ve = function(e) {
  return typeof e == "object";
}, ee = function(e) {
  return e !== !1;
}, Ai = function() {
  return typeof window < "u";
}, Mt = function(e) {
  return G(e) || Z(e);
}, Mn = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, W = Array.isArray, li = /(?:-?\.?\d|\.)+/gi, Rn = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Je = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Xt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, On = /[+-]=-?[.\d]+/, In = /[^,'"\[\]\s]+/gi, Hr = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, N, _e, hi, Ti, ce = {}, Nt = {}, Ln, kn = function(e) {
  return (Nt = at(e, ce)) && re;
}, Si = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, vt = function(e, t) {
  return !t && console.warn(e);
}, Un = function(e, t) {
  return e && (ce[e] = t) && Nt && (Nt[e] = t) || ce;
}, Et = function() {
  return 0;
}, jr = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, kt = {
  suppressEvents: !0,
  kill: !1
}, Yr = {
  suppressEvents: !0
}, Di = {}, Re = [], ci = {}, Fn, ae = {}, Wt = {}, Ki = 30, Ut = [], Mi = "", Ri = function(e) {
  var t = e[0], i, n;
  if (ve(t) || G(t) || (e = [e]), !(i = (t._gsap || {}).harness)) {
    for (n = Ut.length; n-- && !Ut[n].targetTest(t); )
      ;
    i = Ut[n];
  }
  for (n = e.length; n--; )
    e[n] && (e[n]._gsap || (e[n]._gsap = new or(e[n], i))) || e.splice(n, 1);
  return e;
}, He = function(e) {
  return e._gsap || Ri(me(e))[0]._gsap;
}, zn = function(e, t, i) {
  return (i = e[t]) && G(i) ? e[t]() : Ci(i) && e.getAttribute && e.getAttribute(t) || i;
}, te = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, V = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, j = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, it = function(e, t) {
  var i = t.charAt(0), n = parseFloat(t.substr(2));
  return e = parseFloat(e), i === "+" ? e + n : i === "-" ? e - n : i === "*" ? e * n : e / n;
}, Zr = function(e, t) {
  for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, $t = function() {
  var e = Re.length, t = Re.slice(0), i, n;
  for (ci = {}, Re.length = 0, i = 0; i < e; i++)
    n = t[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Oi = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, Nn = function(e, t, i, n) {
  Re.length && !K && $t(), e.render(t, i, !!(K && t < 0 && Oi(e))), Re.length && !K && $t();
}, $n = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(In).length < 2 ? t : Z(e) ? e.trim() : e;
}, Bn = function(e) {
  return e;
}, ue = function(e, t) {
  for (var i in t)
    i in e || (e[i] = t[i]);
  return e;
}, Kr = function(e) {
  return function(t, i) {
    for (var n in i)
      n in t || n === "duration" && e || n === "ease" || (t[n] = i[n]);
  };
}, at = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, Xi = function a(e, t) {
  for (var i in t)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = ve(t[i]) ? a(e[i] || (e[i] = {}), t[i]) : t[i]);
  return e;
}, Bt = function(e, t) {
  var i = {}, n;
  for (n in e)
    n in t || (i[n] = e[n]);
  return i;
}, yt = function(e) {
  var t = e.parent || N, i = e.keyframes ? Kr(W(e.keyframes)) : ue;
  if (ee(e.inherit))
    for (; t; )
      i(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, Xr = function(e, t) {
  for (var i = e.length, n = i === t.length; n && i-- && e[i] === t[i]; )
    ;
  return i < 0;
}, Gn = function(e, t, i, n, r) {
  var s = e[n], o;
  if (r)
    for (o = t[r]; s && s[r] > o; )
      s = s._prev;
  return s ? (t._next = s._next, s._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = s, t.parent = t._dp = e, t;
}, Yt = function(e, t, i, n) {
  i === void 0 && (i = "_first"), n === void 0 && (n = "_last");
  var r = t._prev, s = t._next;
  r ? r._next = s : e[i] === t && (e[i] = s), s ? s._prev = r : e[n] === t && (e[n] = r), t._next = t._prev = t.parent = null;
}, Ie = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, je = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var i = e; i; )
      i._dirty = 1, i = i.parent;
  return e;
}, Wr = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, ui = function(e, t, i, n) {
  return e._startAt && (K ? e._startAt.revert(kt) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, n));
}, qr = function a(e) {
  return !e || e._ts && a(e.parent);
}, Wi = function(e) {
  return e._repeat ? ot(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, ot = function(e, t) {
  var i = Math.floor(e = j(e / t));
  return e && i === e ? i - 1 : i;
}, Gt = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Zt = function(e) {
  return e._end = j(e._start + (e._tDur / Math.abs(e._ts || e._rts || k) || 0));
}, Kt = function(e, t) {
  var i = e._dp;
  return i && i.smoothChildTiming && e._ts && (e._start = j(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Zt(e), i._dirty || je(i, e)), e;
}, Vn = function(e, t) {
  var i;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = Gt(e.rawTime(), t), (!t._dur || Dt(0, t.totalDuration(), i) - t._tTime > k) && t.render(i, !0)), je(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (i = e; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    e._zTime = -k;
  }
}, ye = function(e, t, i, n) {
  return t.parent && Ie(t), t._start = j((Ce(i) ? i : i || e !== N ? pe(e, i, t) : e._time) + t._delay), t._end = j(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Gn(e, t, "_first", "_last", e._sort ? "_start" : 0), di(t) || (e._recent = t), n || Vn(e, t), e._ts < 0 && Kt(e, e._tTime), e;
}, Hn = function(e, t) {
  return (ce.ScrollTrigger || Si("scrollTrigger", t)) && ce.ScrollTrigger.create(t, e);
}, jn = function(e, t, i, n, r) {
  if (Li(e, t, r), !e._initted)
    return 1;
  if (!i && e._pt && !K && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Fn !== oe.frame)
    return Re.push(e), e._lazy = [r, n], 1;
}, Qr = function a(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || a(t));
}, di = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, Jr = function(e, t, i, n) {
  var r = e.ratio, s = t < 0 || !t && (!e._start && Qr(e) && !(!e._initted && di(e)) || (e._ts < 0 || e._dp._ts < 0) && !di(e)) ? 0 : 1, o = e._rDelay, l = 0, c, h, u;
  if (o && e._repeat && (l = Dt(0, e._tDur, t), h = ot(l, o), e._yoyo && h & 1 && (s = 1 - s), h !== ot(e._tTime, o) && (r = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), s !== r || K || n || e._zTime === k || !t && e._zTime) {
    if (!e._initted && jn(e, t, n, i, l))
      return;
    for (u = e._zTime, e._zTime = t || (i ? k : 0), i || (i = t && !u), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(s, c.d), c = c._next;
    t < 0 && ui(e, t, i, !0), e._onUpdate && !i && le(e, "onUpdate"), l && e._repeat && !i && e.parent && le(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === s && (s && Ie(e, 1), !i && !K && (le(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, es = function(e, t, i) {
  var n;
  if (i > t)
    for (n = e._first; n && n._start <= i; ) {
      if (n.data === "isPause" && n._start > t)
        return n;
      n = n._next;
    }
  else
    for (n = e._last; n && n._start >= i; ) {
      if (n.data === "isPause" && n._start < t)
        return n;
      n = n._prev;
    }
}, lt = function(e, t, i, n) {
  var r = e._repeat, s = j(t) || 0, o = e._tTime / e._tDur;
  return o && !n && (e._time *= s / e._dur), e._dur = s, e._tDur = r ? r < 0 ? 1e10 : j(s * (r + 1) + e._rDelay * r) : s, o > 0 && !n && Kt(e, e._tTime = e._tDur * o), e.parent && Zt(e), i || je(e.parent, e), e;
}, qi = function(e) {
  return e instanceof q ? je(e) : lt(e, e._dur);
}, ts = {
  _start: 0,
  endTime: Et,
  totalDuration: Et
}, pe = function a(e, t, i) {
  var n = e.labels, r = e._recent || ts, s = e.duration() >= fe ? r.endTime(!1) : e._dur, o, l, c;
  return Z(t) && (isNaN(t) || t in n) ? (l = t.charAt(0), c = t.substr(-1) === "%", o = t.indexOf("="), l === "<" || l === ">" ? (o >= 0 && (t = t.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (o < 0 ? r : i).totalDuration() / 100 : 1)) : o < 0 ? (t in n || (n[t] = s), n[t]) : (l = parseFloat(t.charAt(o - 1) + t.substr(o + 1)), c && i && (l = l / 100 * (W(i) ? i[0] : i).totalDuration()), o > 1 ? a(e, t.substr(0, o - 1), i) + l : s + l)) : t == null ? s : +t;
}, xt = function(e, t, i) {
  var n = Ce(t[1]), r = (n ? 2 : 1) + (e < 2 ? 0 : 1), s = t[r], o, l;
  if (n && (s.duration = t[1]), s.parent = i, e) {
    for (o = s, l = i; l && !("immediateRender" in o); )
      o = l.vars.defaults || {}, l = ee(l.vars.inherit) && l.parent;
    s.immediateRender = ee(o.immediateRender), e < 2 ? s.runBackwards = 1 : s.startAt = t[r - 1];
  }
  return new H(t[0], s, t[r + 1]);
}, ke = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Dt = function(e, t, i) {
  return i < e ? e : i > t ? t : i;
}, X = function(e, t) {
  return !Z(e) || !(t = Hr.exec(e)) ? "" : t[1];
}, is = function(e, t, i) {
  return ke(i, function(n) {
    return Dt(e, t, n);
  });
}, pi = [].slice, Yn = function(e, t) {
  return e && ve(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ve(e[0])) && !e.nodeType && e !== _e;
}, ns = function(e, t, i) {
  return i === void 0 && (i = []), e.forEach(function(n) {
    var r;
    return Z(n) && !t || Yn(n, 1) ? (r = i).push.apply(r, me(n)) : i.push(n);
  }) || i;
}, me = function(e, t, i) {
  return z && !t && z.selector ? z.selector(e) : Z(e) && !i && (hi || !ht()) ? pi.call((t || Ti).querySelectorAll(e), 0) : W(e) ? ns(e, i) : Yn(e) ? pi.call(e, 0) : e ? [e] : [];
}, fi = function(e) {
  return e = me(e)[0] || vt("Invalid scope") || {}, function(t) {
    var i = e.current || e.nativeElement || e;
    return me(t, i.querySelectorAll ? i : i === e ? vt("Invalid scope") || Ti.createElement("div") : e);
  };
}, Zn = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Kn = function(e) {
  if (G(e))
    return e;
  var t = ve(e) ? e : {
    each: e
  }, i = Ye(t.ease), n = t.from || 0, r = parseFloat(t.base) || 0, s = {}, o = n > 0 && n < 1, l = isNaN(n) || o, c = t.axis, h = n, u = n;
  return Z(n) ? h = u = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !o && l && (h = n[0], u = n[1]), function(p, m, f) {
    var d = (f || t).length, g = s[d], _, y, x, v, b, P, E, C, w;
    if (!g) {
      if (w = t.grid === "auto" ? 0 : (t.grid || [1, fe])[1], !w) {
        for (E = -fe; E < (E = f[w++].getBoundingClientRect().left) && w < d; )
          ;
        w < d && w--;
      }
      for (g = s[d] = [], _ = l ? Math.min(w, d) * h - 0.5 : n % w, y = w === fe ? 0 : l ? d * u / w - 0.5 : n / w | 0, E = 0, C = fe, P = 0; P < d; P++)
        x = P % w - _, v = y - (P / w | 0), g[P] = b = c ? Math.abs(c === "y" ? v : x) : Dn(x * x + v * v), b > E && (E = b), b < C && (C = b);
      n === "random" && Zn(g), g.max = E - C, g.min = C, g.v = d = (parseFloat(t.amount) || parseFloat(t.each) * (w > d ? d - 1 : c ? c === "y" ? d / w : w : Math.max(w, d / w)) || 0) * (n === "edges" ? -1 : 1), g.b = d < 0 ? r - d : r, g.u = X(t.amount || t.each) || 0, i = i && d < 0 ? rr(i) : i;
    }
    return d = (g[p] - g.min) / g.max || 0, j(g.b + (i ? i(d) : d) * g.v) + g.u;
  };
}, mi = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(i) {
    var n = j(Math.round(parseFloat(i) / e) * e * t);
    return (n - n % 1) / t + (Ce(i) ? 0 : X(i));
  };
}, Xn = function(e, t) {
  var i = W(e), n, r;
  return !i && ve(e) && (n = i = e.radius || fe, e.values ? (e = me(e.values), (r = !Ce(e[0])) && (n *= n)) : e = mi(e.increment)), ke(t, i ? G(e) ? function(s) {
    return r = e(s), Math.abs(r - s) <= n ? r : s;
  } : function(s) {
    for (var o = parseFloat(r ? s.x : s), l = parseFloat(r ? s.y : 0), c = fe, h = 0, u = e.length, p, m; u--; )
      r ? (p = e[u].x - o, m = e[u].y - l, p = p * p + m * m) : p = Math.abs(e[u] - o), p < c && (c = p, h = u);
    return h = !n || c <= n ? e[h] : s, r || h === s || Ce(s) ? h : h + X(s);
  } : mi(e));
}, Wn = function(e, t, i, n) {
  return ke(W(e) ? !t : i === !0 ? !!(i = 0) : !n, function() {
    return W(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * 0.99)) / i) * i * n) / n;
  });
}, rs = function() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return function(n) {
    return t.reduce(function(r, s) {
      return s(r);
    }, n);
  };
}, ss = function(e, t) {
  return function(i) {
    return e(parseFloat(i)) + (t || X(i));
  };
}, as = function(e, t, i) {
  return Qn(e, t, 0, 1, i);
}, qn = function(e, t, i) {
  return ke(i, function(n) {
    return e[~~t(n)];
  });
}, os = function a(e, t, i) {
  var n = t - e;
  return W(e) ? qn(e, a(0, e.length), t) : ke(i, function(r) {
    return (n + (r - e) % n) % n + e;
  });
}, ls = function a(e, t, i) {
  var n = t - e, r = n * 2;
  return W(e) ? qn(e, a(0, e.length - 1), t) : ke(i, function(s) {
    return s = (r + (s - e) % r) % r || 0, e + (s > n ? r - s : s);
  });
}, wt = function(e) {
  for (var t = 0, i = "", n, r, s, o; ~(n = e.indexOf("random(", t)); )
    s = e.indexOf(")", n), o = e.charAt(n + 7) === "[", r = e.substr(n + 7, s - n - 7).match(o ? In : li), i += e.substr(t, n - t) + Wn(o ? r : +r[0], o ? 0 : +r[1], +r[2] || 1e-5), t = s + 1;
  return i + e.substr(t, e.length - t);
}, Qn = function(e, t, i, n, r) {
  var s = t - e, o = n - i;
  return ke(r, function(l) {
    return i + ((l - e) / s * o || 0);
  });
}, hs = function a(e, t, i, n) {
  var r = isNaN(e + t) ? 0 : function(m) {
    return (1 - m) * e + m * t;
  };
  if (!r) {
    var s = Z(e), o = {}, l, c, h, u, p;
    if (i === !0 && (n = 1) && (i = null), s)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (W(e) && !W(t)) {
      for (h = [], u = e.length, p = u - 2, c = 1; c < u; c++)
        h.push(a(e[c - 1], e[c]));
      u--, r = function(f) {
        f *= u;
        var d = Math.min(p, ~~f);
        return h[d](f - d);
      }, i = t;
    } else n || (e = at(W(e) ? [] : {}, e));
    if (!h) {
      for (l in t)
        Ii.call(o, e, l, "get", t[l]);
      r = function(f) {
        return Fi(f, o) || (s ? e.p : e);
      };
    }
  }
  return ke(i, r);
}, Qi = function(e, t, i) {
  var n = e.labels, r = fe, s, o, l;
  for (s in n)
    o = n[s] - t, o < 0 == !!i && o && r > (o = Math.abs(o)) && (l = s, r = o);
  return l;
}, le = function(e, t, i) {
  var n = e.vars, r = n[t], s = z, o = e._ctx, l, c, h;
  if (r)
    return l = n[t + "Params"], c = n.callbackScope || e, i && Re.length && $t(), o && (z = o), h = l ? r.apply(c, l) : r.call(c), z = s, h;
}, mt = function(e) {
  return Ie(e), e.scrollTrigger && e.scrollTrigger.kill(!!K), e.progress() < 1 && le(e, "onInterrupt"), e;
}, et, Jn = [], er = function(e) {
  if (e)
    if (e = !e.name && e.default || e, Ai() || e.headless) {
      var t = e.name, i = G(e), n = t && !i && e.init ? function() {
        this._props = [];
      } : e, r = {
        init: Et,
        render: Fi,
        add: Ii,
        kill: Cs,
        modifier: Ps,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Ui,
        aliases: {},
        register: 0
      };
      if (ht(), e !== n) {
        if (ae[t])
          return;
        ue(n, ue(Bt(e, r), s)), at(n.prototype, at(r, Bt(e, s))), ae[n.prop = t] = n, e.targetTest && (Ut.push(n), Di[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      Un(t, n), e.register && e.register(re, n, ie);
    } else
      Jn.push(e);
}, L = 255, gt = {
  aqua: [0, L, L],
  lime: [0, L, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, L],
  navy: [0, 0, 128],
  white: [L, L, L],
  olive: [128, 128, 0],
  yellow: [L, L, 0],
  orange: [L, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [L, 0, 0],
  pink: [L, 192, 203],
  cyan: [0, L, L],
  transparent: [L, L, L, 0]
}, qt = function(e, t, i) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (i - t) * e * 6 : e < 0.5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * L + 0.5 | 0;
}, tr = function(e, t, i) {
  var n = e ? Ce(e) ? [e >> 16, e >> 8 & L, e & L] : 0 : gt.black, r, s, o, l, c, h, u, p, m, f;
  if (!n) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), gt[e])
      n = gt[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (r = e.charAt(1), s = e.charAt(2), o = e.charAt(3), e = "#" + r + r + s + s + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return n = parseInt(e.substr(1, 6), 16), [n >> 16, n >> 8 & L, n & L, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), n = [e >> 16, e >> 8 & L, e & L];
    } else if (e.substr(0, 3) === "hsl") {
      if (n = f = e.match(li), !t)
        l = +n[0] % 360 / 360, c = +n[1] / 100, h = +n[2] / 100, s = h <= 0.5 ? h * (c + 1) : h + c - h * c, r = h * 2 - s, n.length > 3 && (n[3] *= 1), n[0] = qt(l + 1 / 3, r, s), n[1] = qt(l, r, s), n[2] = qt(l - 1 / 3, r, s);
      else if (~e.indexOf("="))
        return n = e.match(Rn), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = e.match(li) || gt.transparent;
    n = n.map(Number);
  }
  return t && !f && (r = n[0] / L, s = n[1] / L, o = n[2] / L, u = Math.max(r, s, o), p = Math.min(r, s, o), h = (u + p) / 2, u === p ? l = c = 0 : (m = u - p, c = h > 0.5 ? m / (2 - u - p) : m / (u + p), l = u === r ? (s - o) / m + (s < o ? 6 : 0) : u === s ? (o - r) / m + 2 : (r - s) / m + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, ir = function(e) {
  var t = [], i = [], n = -1;
  return e.split(Oe).forEach(function(r) {
    var s = r.match(Je) || [];
    t.push.apply(t, s), i.push(n += s.length + 1);
  }), t.c = i, t;
}, Ji = function(e, t, i) {
  var n = "", r = (e + n).match(Oe), s = t ? "hsla(" : "rgba(", o = 0, l, c, h, u;
  if (!r)
    return e;
  if (r = r.map(function(p) {
    return (p = tr(p, t, 1)) && s + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), i && (h = ir(e), l = i.c, l.join(n) !== h.c.join(n)))
    for (c = e.replace(Oe, "1").split(Je), u = c.length - 1; o < u; o++)
      n += c[o] + (~l.indexOf(o) ? r.shift() || s + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!c)
    for (c = e.split(Oe), u = c.length - 1; o < u; o++)
      n += c[o] + r[o];
  return n + c[u];
}, Oe = (function() {
  var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in gt)
    a += "|" + e + "\\b";
  return new RegExp(a + ")", "gi");
})(), cs = /hsl[a]?\(/, nr = function(e) {
  var t = e.join(" "), i;
  if (Oe.lastIndex = 0, Oe.test(t))
    return i = cs.test(t), e[1] = Ji(e[1], i), e[0] = Ji(e[0], i, ir(e[1])), !0;
}, Pt, oe = (function() {
  var a = Date.now, e = 500, t = 33, i = a(), n = i, r = 1e3 / 240, s = r, o = [], l, c, h, u, p, m, f = function d(g) {
    var _ = a() - n, y = g === !0, x, v, b, P;
    if ((_ > e || _ < 0) && (i += _ - t), n += _, b = n - i, x = b - s, (x > 0 || y) && (P = ++u.frame, p = b - u.time * 1e3, u.time = b = b / 1e3, s += x + (x >= r ? 4 : r - x), v = 1), y || (l = c(d)), v)
      for (m = 0; m < o.length; m++)
        o[m](b, p, P, g);
  };
  return u = {
    time: 0,
    frame: 0,
    tick: function() {
      f(!0);
    },
    deltaRatio: function(g) {
      return p / (1e3 / (g || 60));
    },
    wake: function() {
      Ln && (!hi && Ai() && (_e = hi = window, Ti = _e.document || {}, ce.gsap = re, (_e.gsapVersions || (_e.gsapVersions = [])).push(re.version), kn(Nt || _e.GreenSockGlobals || !_e.gsap && _e || {}), Jn.forEach(er)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && u.sleep(), c = h || function(g) {
        return setTimeout(g, s - u.time * 1e3 + 1 | 0);
      }, Pt = 1, f(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), Pt = 0, c = Et;
    },
    lagSmoothing: function(g, _) {
      e = g || 1 / 0, t = Math.min(_ || 33, e);
    },
    fps: function(g) {
      r = 1e3 / (g || 240), s = u.time * 1e3 + r;
    },
    add: function(g, _, y) {
      var x = _ ? function(v, b, P, E) {
        g(v, b, P, E), u.remove(x);
      } : g;
      return u.remove(g), o[y ? "unshift" : "push"](x), ht(), x;
    },
    remove: function(g, _) {
      ~(_ = o.indexOf(g)) && o.splice(_, 1) && m >= _ && m--;
    },
    _listeners: o
  }, u;
})(), ht = function() {
  return !Pt && oe.wake();
}, D = {}, us = /^[\d.\-M][\d.\-,\s]/, ds = /["']/g, ps = function(e) {
  for (var t = {}, i = e.substr(1, e.length - 3).split(":"), n = i[0], r = 1, s = i.length, o, l, c; r < s; r++)
    l = i[r], o = r !== s - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, o), t[n] = isNaN(c) ? c.replace(ds, "").trim() : +c, n = l.substr(o + 1).trim();
  return t;
}, fs = function(e) {
  var t = e.indexOf("(") + 1, i = e.indexOf(")"), n = e.indexOf("(", t);
  return e.substring(t, ~n && n < i ? e.indexOf(")", i + 1) : i);
}, ms = function(e) {
  var t = (e + "").split("("), i = D[t[0]];
  return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [ps(t[1])] : fs(e).split(",").map($n)) : D._CE && us.test(e) ? D._CE("", e) : i;
}, rr = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, sr = function a(e, t) {
  for (var i = e._first, n; i; )
    i instanceof q ? a(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? a(i.timeline, t) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = t)), i = i._next;
}, Ye = function(e, t) {
  return e && (G(e) ? e : D[e] || ms(e)) || t;
}, Xe = function(e, t, i, n) {
  i === void 0 && (i = function(l) {
    return 1 - t(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var r = {
    easeIn: t,
    easeOut: i,
    easeInOut: n
  }, s;
  return te(e, function(o) {
    D[o] = ce[o] = r, D[s = o.toLowerCase()] = i;
    for (var l in r)
      D[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = D[o + "." + l] = r[l];
  }), r;
}, ar = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Qt = function a(e, t, i) {
  var n = t >= 1 ? t : 1, r = (i || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), s = r / oi * (Math.asin(1 / n) || 0), o = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * Vr((h - s) * r) + 1;
  }, l = e === "out" ? o : e === "in" ? function(c) {
    return 1 - o(1 - c);
  } : ar(o);
  return r = oi / r, l.config = function(c, h) {
    return a(e, c, h);
  }, l;
}, Jt = function a(e, t) {
  t === void 0 && (t = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((t + 1) * s + t) + 1 : 0;
  }, n = e === "out" ? i : e === "in" ? function(r) {
    return 1 - i(1 - r);
  } : ar(i);
  return n.config = function(r) {
    return a(e, r);
  }, n;
};
te("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, e) {
  var t = e < 5 ? e + 1 : e;
  Xe(a + ",Power" + (t - 1), e ? function(i) {
    return Math.pow(i, t);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, t);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2;
  });
});
D.Linear.easeNone = D.none = D.Linear.easeIn;
Xe("Elastic", Qt("in"), Qt("out"), Qt());
(function(a, e) {
  var t = 1 / e, i = 2 * t, n = 2.5 * t, r = function(o) {
    return o < t ? a * o * o : o < i ? a * Math.pow(o - 1.5 / e, 2) + 0.75 : o < n ? a * (o -= 2.25 / e) * o + 0.9375 : a * Math.pow(o - 2.625 / e, 2) + 0.984375;
  };
  Xe("Bounce", function(s) {
    return 1 - r(1 - s);
  }, r);
})(7.5625, 2.75);
Xe("Expo", function(a) {
  return Math.pow(2, 10 * (a - 1)) * a + a * a * a * a * a * a * (1 - a);
});
Xe("Circ", function(a) {
  return -(Dn(1 - a * a) - 1);
});
Xe("Sine", function(a) {
  return a === 1 ? 1 : -Gr(a * $r) + 1;
});
Xe("Back", Jt("in"), Jt("out"), Jt());
D.SteppedEase = D.steps = ce.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var i = 1 / e, n = e + (t ? 0 : 1), r = t ? 1 : 0, s = 1 - k;
    return function(o) {
      return ((n * Dt(0, s, o) | 0) + r) * i;
    };
  }
};
st.ease = D["quad.out"];
te("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return Mi += a + "," + a + "Params,";
});
var or = function(e, t) {
  this.id = Br++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : zn, this.set = t ? t.getSetter : Ui;
}, Ct = /* @__PURE__ */ (function() {
  function a(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, lt(this, +t.duration, 1, 1), this.data = t.data, z && (this._ctx = z, z.data.push(this)), Pt || oe.wake();
  }
  var e = a.prototype;
  return e.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, e.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, lt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(i, n) {
    if (ht(), !arguments.length)
      return this._tTime;
    var r = this._dp;
    if (r && r.smoothChildTiming && this._ts) {
      for (Kt(this, i), !r._dp || r.parent || Vn(r, this); r && r.parent; )
        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && ye(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === k || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Nn(this, i, n)), this;
  }, e.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Wi(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, e.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Wi(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? ot(this._tTime, r) + 1 : 1;
  }, e.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -k ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? Gt(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -k ? 0 : this._rts, this.totalTime(Dt(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), Zt(this), Wr(this);
  }, e.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ht(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== k && (this._tTime -= k)))), this) : this._ps;
  }, e.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && ye(n, this, i - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(i) {
    return this._start + (ee(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(i) {
    var n = this.parent || this._dp;
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Gt(n.rawTime(i), this) : this._tTime : this._tTime;
  }, e.revert = function(i) {
    i === void 0 && (i = Yr);
    var n = K;
    return K = i, Oi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), K = n, this;
  }, e.globalTime = function(i) {
    for (var n = this, r = arguments.length ? i : n.rawTime(); n; )
      r = n._start + r / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : r;
  }, e.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, qi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(i) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = i, qi(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, e.seek = function(i, n) {
    return this.totalTime(pe(this, i), ee(n));
  }, e.restart = function(i, n) {
    return this.play().totalTime(i ? -this._delay : 0, ee(n)), this._dur || (this._zTime = -k), this;
  }, e.play = function(i, n) {
    return i != null && this.seek(i, n), this.reversed(!1).paused(!1);
  }, e.reverse = function(i, n) {
    return i != null && this.seek(i || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, e.pause = function(i, n) {
    return i != null && this.seek(i, n), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -k : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -k, this;
  }, e.isActive = function() {
    var i = this.parent || this._dp, n = this._start, r;
    return !!(!i || this._ts && this._initted && i.isActive() && (r = i.rawTime(!0)) >= n && r < this.endTime(!0) - k);
  }, e.eventCallback = function(i, n, r) {
    var s = this.vars;
    return arguments.length > 1 ? (n ? (s[i] = n, r && (s[i + "Params"] = r), i === "onUpdate" && (this._onUpdate = n)) : delete s[i], this) : s[i];
  }, e.then = function(i) {
    var n = this;
    return new Promise(function(r) {
      var s = G(i) ? i : Bn, o = function() {
        var c = n.then;
        n.then = null, G(s) && (s = s(n)) && (s.then || s === n) && (n.then = c), r(s), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? o() : n._prom = o;
    });
  }, e.kill = function() {
    mt(this);
  }, a;
})();
ue(Ct.prototype, {
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
  _zTime: -k,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var q = /* @__PURE__ */ (function(a) {
  Sn(e, a);
  function e(i, n) {
    var r;
    return i === void 0 && (i = {}), r = a.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = ee(i.sortChildren), N && ye(i.parent || N, we(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && Hn(we(r), i.scrollTrigger), r;
  }
  var t = e.prototype;
  return t.to = function(n, r, s) {
    return xt(0, arguments, this), this;
  }, t.from = function(n, r, s) {
    return xt(1, arguments, this), this;
  }, t.fromTo = function(n, r, s, o) {
    return xt(2, arguments, this), this;
  }, t.set = function(n, r, s) {
    return r.duration = 0, r.parent = this, yt(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new H(n, r, pe(this, s), 1), this;
  }, t.call = function(n, r, s) {
    return ye(this, H.delayedCall(0, n, r), s);
  }, t.staggerTo = function(n, r, s, o, l, c, h) {
    return s.duration = r, s.stagger = s.stagger || o, s.onComplete = c, s.onCompleteParams = h, s.parent = this, new H(n, s, pe(this, l)), this;
  }, t.staggerFrom = function(n, r, s, o, l, c, h) {
    return s.runBackwards = 1, yt(s).immediateRender = ee(s.immediateRender), this.staggerTo(n, r, s, o, l, c, h);
  }, t.staggerFromTo = function(n, r, s, o, l, c, h, u) {
    return o.startAt = s, yt(o).immediateRender = ee(o.immediateRender), this.staggerTo(n, r, o, l, c, h, u);
  }, t.render = function(n, r, s) {
    var o = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, h = n <= 0 ? 0 : j(n), u = this._zTime < 0 != n < 0 && (this._initted || !c), p, m, f, d, g, _, y, x, v, b, P, E;
    if (this !== N && h > l && n >= 0 && (h = l), h !== this._tTime || s || u) {
      if (o !== this._time && c && (h += this._time - o, n += this._time - o), p = h, v = this._start, x = this._ts, _ = !x, u && (c || (o = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (P = this._yoyo, g = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(g * 100 + n, r, s);
        if (p = j(h % g), h === l ? (d = this._repeat, p = c) : (b = j(h / g), d = ~~b, d && d === b && (p = c, d--), p > c && (p = c)), b = ot(this._tTime, g), !o && this._tTime && b !== d && this._tTime - b * g - this._dur <= 0 && (b = d), P && d & 1 && (p = c - p, E = 1), d !== b && !this._lock) {
          var C = P && b & 1, w = C === (P && d & 1);
          if (d < b && (C = !C), o = C ? 0 : h % c ? c : h, this._lock = 1, this.render(o || (E ? 0 : j(d * g)), r, !c)._lock = 0, this._tTime = h, !r && this.parent && le(this, "onRepeat"), this.vars.repeatRefresh && !E && (this.invalidate()._lock = 1), o && o !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, w && (this._lock = 2, o = C ? c : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !E && this.invalidate()), this._lock = 0, !this._ts && !_)
            return this;
          sr(this, E);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = es(this, j(o), j(p)), y && (h -= p - (p = y._start))), this._tTime = h, this._time = p, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, o = 0), !o && h && !r && !b && (le(this, "onStart"), this._tTime !== h))
        return this;
      if (p >= o && n >= 0)
        for (m = this._first; m; ) {
          if (f = m._next, (m._act || p >= m._start) && m._ts && y !== m) {
            if (m.parent !== this)
              return this.render(n, r, s);
            if (m.render(m._ts > 0 ? (p - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (p - m._start) * m._ts, r, s), p !== this._time || !this._ts && !_) {
              y = 0, f && (h += this._zTime = -k);
              break;
            }
          }
          m = f;
        }
      else {
        m = this._last;
        for (var T = n < 0 ? n : p; m; ) {
          if (f = m._prev, (m._act || T <= m._end) && m._ts && y !== m) {
            if (m.parent !== this)
              return this.render(n, r, s);
            if (m.render(m._ts > 0 ? (T - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (T - m._start) * m._ts, r, s || K && Oi(m)), p !== this._time || !this._ts && !_) {
              y = 0, f && (h += this._zTime = T ? -k : k);
              break;
            }
          }
          m = f;
        }
      }
      if (y && !r && (this.pause(), y.render(p >= o ? 0 : -k)._zTime = p >= o ? 1 : -1, this._ts))
        return this._start = v, Zt(this), this.render(n, r, s);
      this._onUpdate && !r && le(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && o) && (v === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (h === l && this._ts > 0 || !h && this._ts < 0) && Ie(this, 1), !r && !(n < 0 && !o) && (h || o || !l) && (le(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(n, r) {
    var s = this;
    if (Ce(r) || (r = pe(this, r, n)), !(n instanceof Ct)) {
      if (W(n))
        return n.forEach(function(o) {
          return s.add(o, r);
        }), this;
      if (Z(n))
        return this.addLabel(n, r);
      if (G(n))
        n = H.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? ye(this, n, r) : this;
  }, t.getChildren = function(n, r, s, o) {
    n === void 0 && (n = !0), r === void 0 && (r = !0), s === void 0 && (s = !0), o === void 0 && (o = -fe);
    for (var l = [], c = this._first; c; )
      c._start >= o && (c instanceof H ? r && l.push(c) : (s && l.push(c), n && l.push.apply(l, c.getChildren(!0, r, s)))), c = c._next;
    return l;
  }, t.getById = function(n) {
    for (var r = this.getChildren(1, 1, 1), s = r.length; s--; )
      if (r[s].vars.id === n)
        return r[s];
  }, t.remove = function(n) {
    return Z(n) ? this.removeLabel(n) : G(n) ? this.killTweensOf(n) : (n.parent === this && Yt(this, n), n === this._recent && (this._recent = this._last), je(this));
  }, t.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = j(oe.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), a.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(n, r) {
    return this.labels[n] = pe(this, r), this;
  }, t.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, t.addPause = function(n, r, s) {
    var o = H.delayedCall(0, r || Et, s);
    return o.data = "isPause", this._hasPause = 1, ye(this, o, pe(this, n));
  }, t.removePause = function(n) {
    var r = this._first;
    for (n = pe(this, n); r; )
      r._start === n && r.data === "isPause" && Ie(r), r = r._next;
  }, t.killTweensOf = function(n, r, s) {
    for (var o = this.getTweensOf(n, s), l = o.length; l--; )
      Te !== o[l] && o[l].kill(n, r);
    return this;
  }, t.getTweensOf = function(n, r) {
    for (var s = [], o = me(n), l = this._first, c = Ce(r), h; l; )
      l instanceof H ? Zr(l._targets, o) && (c ? (!Te || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && s.push(l) : (h = l.getTweensOf(o, r)).length && s.push.apply(s, h), l = l._next;
    return s;
  }, t.tweenTo = function(n, r) {
    r = r || {};
    var s = this, o = pe(s, n), l = r, c = l.startAt, h = l.onStart, u = l.onStartParams, p = l.immediateRender, m, f = H.to(s, ue({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: r.duration || Math.abs((o - (c && "time" in c ? c.time : s._time)) / s.timeScale()) || k,
      onStart: function() {
        if (s.pause(), !m) {
          var g = r.duration || Math.abs((o - (c && "time" in c ? c.time : s._time)) / s.timeScale());
          f._dur !== g && lt(f, g, 0, 1).render(f._time, !0, !0), m = 1;
        }
        h && h.apply(f, u || []);
      }
    }, r));
    return p ? f.render(0) : f;
  }, t.tweenFromTo = function(n, r, s) {
    return this.tweenTo(r, ue({
      startAt: {
        time: pe(this, n)
      }
    }, s));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(n) {
    return n === void 0 && (n = this._time), Qi(this, pe(this, n));
  }, t.previousLabel = function(n) {
    return n === void 0 && (n = this._time), Qi(this, pe(this, n), 1);
  }, t.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + k);
  }, t.shiftChildren = function(n, r, s) {
    s === void 0 && (s = 0);
    for (var o = this._first, l = this.labels, c; o; )
      o._start >= s && (o._start += n, o._end += n), o = o._next;
    if (r)
      for (c in l)
        l[c] >= s && (l[c] += n);
    return je(this);
  }, t.invalidate = function(n) {
    var r = this._first;
    for (this._lock = 0; r; )
      r.invalidate(n), r = r._next;
    return a.prototype.invalidate.call(this, n);
  }, t.clear = function(n) {
    n === void 0 && (n = !0);
    for (var r = this._first, s; r; )
      s = r._next, this.remove(r), r = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), je(this);
  }, t.totalDuration = function(n) {
    var r = 0, s = this, o = s._last, l = fe, c, h, u;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -n : n));
    if (s._dirty) {
      for (u = s.parent; o; )
        c = o._prev, o._dirty && o.totalDuration(), h = o._start, h > l && s._sort && o._ts && !s._lock ? (s._lock = 1, ye(s, o, h - o._delay, 1)._lock = 0) : l = h, h < 0 && o._ts && (r -= h, (!u && !s._dp || u && u.smoothChildTiming) && (s._start += h / s._ts, s._time -= h, s._tTime -= h), s.shiftChildren(-h, !1, -1 / 0), l = 0), o._end > r && o._ts && (r = o._end), o = c;
      lt(s, s === N && s._time > r ? s._time : r, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, e.updateRoot = function(n) {
    if (N._ts && (Nn(N, Gt(n, N)), Fn = oe.frame), oe.frame >= Ki) {
      Ki += he.autoSleep || 120;
      var r = N._first;
      if ((!r || !r._ts) && he.autoSleep && oe._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || oe.sleep();
      }
    }
  }, e;
})(Ct);
ue(q.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var gs = function(e, t, i, n, r, s, o) {
  var l = new ie(this._pt, e, t, 0, 1, pr, null, r), c = 0, h = 0, u, p, m, f, d, g, _, y;
  for (l.b = i, l.e = n, i += "", n += "", (_ = ~n.indexOf("random(")) && (n = wt(n)), s && (y = [i, n], s(y, e, t), i = y[0], n = y[1]), p = i.match(Xt) || []; u = Xt.exec(n); )
    f = u[0], d = n.substring(c, u.index), m ? m = (m + 1) % 5 : d.substr(-5) === "rgba(" && (m = 1), f !== p[h++] && (g = parseFloat(p[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || h === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: f.charAt(1) === "=" ? it(g, f) - g : parseFloat(f) - g,
      m: m && m < 4 ? Math.round : 0
    }, c = Xt.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = o, (On.test(n) || _) && (l.e = 0), this._pt = l, l;
}, Ii = function(e, t, i, n, r, s, o, l, c, h) {
  G(n) && (n = n(r || 0, e, s));
  var u = e[t], p = i !== "get" ? i : G(u) ? c ? e[t.indexOf("set") || !G(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : u, m = G(u) ? c ? vs : ur : ki, f;
  if (Z(n) && (~n.indexOf("random(") && (n = wt(n)), n.charAt(1) === "=" && (f = it(p, n) + (X(p) || 0), (f || f === 0) && (n = f))), !h || p !== n || gi)
    return !isNaN(p * n) && n !== "" ? (f = new ie(this._pt, e, t, +p || 0, n - (p || 0), typeof u == "boolean" ? ws : dr, 0, m), c && (f.fp = c), o && f.modifier(o, this, e), this._pt = f) : (!u && !(t in e) && Si(t, n), gs.call(this, e, t, p, n, m, l || he.stringFilter, c));
}, _s = function(e, t, i, n, r) {
  if (G(e) && (e = bt(e, r, t, i, n)), !ve(e) || e.style && e.nodeType || W(e) || Mn(e))
    return Z(e) ? bt(e, r, t, i, n) : e;
  var s = {}, o;
  for (o in e)
    s[o] = bt(e[o], r, t, i, n);
  return s;
}, lr = function(e, t, i, n, r, s) {
  var o, l, c, h;
  if (ae[e] && (o = new ae[e]()).init(r, o.rawVars ? t[e] : _s(t[e], n, r, s, i), i, n, s) !== !1 && (i._pt = l = new ie(i._pt, r, e, 0, 1, o.render, o, 0, o.priority), i !== et))
    for (c = i._ptLookup[i._targets.indexOf(r)], h = o._props.length; h--; )
      c[o._props[h]] = l;
  return o;
}, Te, gi, Li = function a(e, t, i) {
  var n = e.vars, r = n.ease, s = n.startAt, o = n.immediateRender, l = n.lazy, c = n.onUpdate, h = n.runBackwards, u = n.yoyoEase, p = n.keyframes, m = n.autoRevert, f = e._dur, d = e._startAt, g = e._targets, _ = e.parent, y = _ && _.data === "nested" ? _.vars.targets : g, x = e._overwrite === "auto" && !Pi, v = e.timeline, b, P, E, C, w, T, M, A, R, O, B, F, U;
  if (v && (!p || !r) && (r = "none"), e._ease = Ye(r, st.ease), e._yEase = u ? rr(Ye(u === !0 ? r : u, st.ease)) : 0, u && e._yoyo && !e._repeat && (u = e._yEase, e._yEase = e._ease, e._ease = u), e._from = !v && !!n.runBackwards, !v || p && !n.stagger) {
    if (A = g[0] ? He(g[0]).harness : 0, F = A && n[A.prop], b = Bt(n, Di), d && (d._zTime < 0 && d.progress(1), t < 0 && h && o && !m ? d.render(-1, !0) : d.revert(h && f ? kt : jr), d._lazy = 0), s) {
      if (Ie(e._startAt = H.set(g, ue({
        data: "isStart",
        overwrite: !1,
        parent: _,
        immediateRender: !0,
        lazy: !d && ee(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return le(e, "onUpdate");
        },
        stagger: 0
      }, s))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (K || !o && !m) && e._startAt.revert(kt), o && f && t <= 0 && i <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (h && f && !d) {
      if (t && (o = !1), E = ue({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !d && ee(l),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: _
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, b), F && (E[A.prop] = F), Ie(e._startAt = H.set(g, E)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (K ? e._startAt.revert(kt) : e._startAt.render(-1, !0)), e._zTime = t, !o)
        a(e._startAt, k, k);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = f && ee(l) || l && !f, P = 0; P < g.length; P++) {
      if (w = g[P], M = w._gsap || Ri(g)[P]._gsap, e._ptLookup[P] = O = {}, ci[M.id] && Re.length && $t(), B = y === g ? P : y.indexOf(w), A && (R = new A()).init(w, F || b, e, B, y) !== !1 && (e._pt = C = new ie(e._pt, w, R.name, 0, 1, R.render, R, 0, R.priority), R._props.forEach(function(Q) {
        O[Q] = C;
      }), R.priority && (T = 1)), !A || F)
        for (E in b)
          ae[E] && (R = lr(E, b, e, B, w, y)) ? R.priority && (T = 1) : O[E] = C = Ii.call(e, w, E, "get", b[E], B, y, 0, n.stringFilter);
      e._op && e._op[P] && e.kill(w, e._op[P]), x && e._pt && (Te = e, N.killTweensOf(w, O, e.globalTime(t)), U = !e.parent, Te = 0), e._pt && l && (ci[M.id] = 1);
    }
    T && fr(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !U, p && t <= 0 && v.render(fe, !0, !0);
}, ys = function(e, t, i, n, r, s, o, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], h, u, p, m;
  if (!c)
    for (c = e._ptCache[t] = [], p = e._ptLookup, m = e._targets.length; m--; ) {
      if (h = p[m][t], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== t && h.fp !== t; )
          h = h._next;
      if (!h)
        return gi = 1, e.vars[t] = "+=0", Li(e, o), gi = 0, l ? vt(t + " not eligible for reset") : 1;
      c.push(h);
    }
  for (m = c.length; m--; )
    u = c[m], h = u._pt || u, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + s * h.c, h.c = i - h.s, u.e && (u.e = V(i) + X(u.e)), u.b && (u.b = h.s + X(u.b));
}, xs = function(e, t) {
  var i = e[0] ? He(e[0]).harness : 0, n = i && i.aliases, r, s, o, l;
  if (!n)
    return t;
  r = at({}, t);
  for (s in n)
    if (s in r)
      for (l = n[s].split(","), o = l.length; o--; )
        r[l[o]] = r[s];
  return r;
}, bs = function(e, t, i, n) {
  var r = t.ease || n || "power1.inOut", s, o;
  if (W(t))
    o = i[e] || (i[e] = []), t.forEach(function(l, c) {
      return o.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: r
      });
    });
  else
    for (s in t)
      o = i[s] || (i[s] = []), s === "ease" || o.push({
        t: parseFloat(e),
        v: t[s],
        e: r
      });
}, bt = function(e, t, i, n, r) {
  return G(e) ? e.call(t, i, n, r) : Z(e) && ~e.indexOf("random(") ? wt(e) : e;
}, hr = Mi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", cr = {};
te(hr + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return cr[a] = 1;
});
var H = /* @__PURE__ */ (function(a) {
  Sn(e, a);
  function e(i, n, r, s) {
    var o;
    typeof n == "number" && (r.duration = n, n = r, r = null), o = a.call(this, s ? n : yt(n)) || this;
    var l = o.vars, c = l.duration, h = l.delay, u = l.immediateRender, p = l.stagger, m = l.overwrite, f = l.keyframes, d = l.defaults, g = l.scrollTrigger, _ = l.yoyoEase, y = n.parent || N, x = (W(i) || Mn(i) ? Ce(i[0]) : "length" in n) ? [i] : me(i), v, b, P, E, C, w, T, M;
    if (o._targets = x.length ? Ri(x) : vt("GSAP target " + i + " not found. https://gsap.com", !he.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = m, f || p || Mt(c) || Mt(h)) {
      if (n = o.vars, v = o.timeline = new q({
        data: "nested",
        defaults: d || {},
        targets: y && y.data === "nested" ? y.vars.targets : x
      }), v.kill(), v.parent = v._dp = we(o), v._start = 0, p || Mt(c) || Mt(h)) {
        if (E = x.length, T = p && Kn(p), ve(p))
          for (C in p)
            ~hr.indexOf(C) && (M || (M = {}), M[C] = p[C]);
        for (b = 0; b < E; b++)
          P = Bt(n, cr), P.stagger = 0, _ && (P.yoyoEase = _), M && at(P, M), w = x[b], P.duration = +bt(c, we(o), b, w, x), P.delay = (+bt(h, we(o), b, w, x) || 0) - o._delay, !p && E === 1 && P.delay && (o._delay = h = P.delay, o._start += h, P.delay = 0), v.to(w, P, T ? T(b, w, x) : 0), v._ease = D.none;
        v.duration() ? c = h = 0 : o.timeline = 0;
      } else if (f) {
        yt(ue(v.vars.defaults, {
          ease: "none"
        })), v._ease = Ye(f.ease || n.ease || "none");
        var A = 0, R, O, B;
        if (W(f))
          f.forEach(function(F) {
            return v.to(x, F, ">");
          }), v.duration();
        else {
          P = {};
          for (C in f)
            C === "ease" || C === "easeEach" || bs(C, f[C], P, f.easeEach);
          for (C in P)
            for (R = P[C].sort(function(F, U) {
              return F.t - U.t;
            }), A = 0, b = 0; b < R.length; b++)
              O = R[b], B = {
                ease: O.e,
                duration: (O.t - (b ? R[b - 1].t : 0)) / 100 * c
              }, B[C] = O.v, v.to(x, B, A), A += B.duration;
          v.duration() < c && v.to({}, {
            duration: c - v.duration()
          });
        }
      }
      c || o.duration(c = v.duration());
    } else
      o.timeline = 0;
    return m === !0 && !Pi && (Te = we(o), N.killTweensOf(x), Te = 0), ye(y, we(o), r), n.reversed && o.reverse(), n.paused && o.paused(!0), (u || !c && !f && o._start === j(y._time) && ee(u) && qr(we(o)) && y.data !== "nested") && (o._tTime = -k, o.render(Math.max(0, -h) || 0)), g && Hn(we(o), g), o;
  }
  var t = e.prototype;
  return t.render = function(n, r, s) {
    var o = this._time, l = this._tDur, c = this._dur, h = n < 0, u = n > l - k && !h ? l : n < k ? 0 : n, p, m, f, d, g, _, y, x, v;
    if (!c)
      Jr(this, n, r, s);
    else if (u !== this._tTime || !n || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (p = u, x = this.timeline, this._repeat) {
        if (d = c + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(d * 100 + n, r, s);
        if (p = j(u % d), u === l ? (f = this._repeat, p = c) : (g = j(u / d), f = ~~g, f && f === g ? (p = c, f--) : p > c && (p = c)), _ = this._yoyo && f & 1, _ && (v = this._yEase, p = c - p), g = ot(this._tTime, d), p === o && !s && this._initted && f === g)
          return this._tTime = u, this;
        f !== g && (x && this._yEase && sr(x, _), this.vars.repeatRefresh && !_ && !this._lock && p !== d && this._initted && (this._lock = s = 1, this.render(j(d * f), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (jn(this, h ? n : p, s, r, u))
          return this._tTime = 0, this;
        if (o !== this._time && !(s && this.vars.repeatRefresh && f !== g))
          return this;
        if (c !== this._dur)
          return this.render(n, r, s);
      }
      if (this._tTime = u, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = y = (v || this._ease)(p / c), this._from && (this.ratio = y = 1 - y), !o && u && !r && !g && (le(this, "onStart"), this._tTime !== u))
        return this;
      for (m = this._pt; m; )
        m.r(y, m.d), m = m._next;
      x && x.render(n < 0 ? n : x._dur * x._ease(p / this._dur), r, s) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && ui(this, n, r, s), le(this, "onUpdate")), this._repeat && f !== g && this.vars.onRepeat && !r && this.parent && le(this, "onRepeat"), (u === this._tDur || !u) && this._tTime === u && (h && !this._onUpdate && ui(this, n, !0, !0), (n || !c) && (u === this._tDur && this._ts > 0 || !u && this._ts < 0) && Ie(this, 1), !r && !(h && !o) && (u || o || _) && (le(this, u === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), a.prototype.invalidate.call(this, n);
  }, t.resetTo = function(n, r, s, o, l) {
    Pt || oe.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Li(this, c), h = this._ease(c / this._dur), ys(this, n, r, s, o, h, c, l) ? this.resetTo(n, r, s, o, 1) : (Kt(this, 0), this.parent || Gn(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? mt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!K), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, Te && Te.vars.overwrite !== !0)._first || mt(this), this.parent && s !== this.timeline.totalDuration() && lt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, l = n ? me(n) : o, c = this._ptLookup, h = this._pt, u, p, m, f, d, g, _;
    if ((!r || r === "all") && Xr(o, l))
      return r === "all" && (this._pt = 0), mt(this);
    for (u = this._op = this._op || [], r !== "all" && (Z(r) && (d = {}, te(r, function(y) {
      return d[y] = 1;
    }), r = d), r = xs(o, r)), _ = o.length; _--; )
      if (~l.indexOf(o[_])) {
        p = c[_], r === "all" ? (u[_] = r, f = p, m = {}) : (m = u[_] = u[_] || {}, f = r);
        for (d in f)
          g = p && p[d], g && ((!("kill" in g.d) || g.d.kill(d) === !0) && Yt(this, g, "_pt"), delete p[d]), m !== "all" && (m[d] = 1);
      }
    return this._initted && !this._pt && h && mt(this), this;
  }, e.to = function(n, r) {
    return new e(n, r, arguments[2]);
  }, e.from = function(n, r) {
    return xt(1, arguments);
  }, e.delayedCall = function(n, r, s, o) {
    return new e(r, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: r,
      onReverseComplete: r,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: o
    });
  }, e.fromTo = function(n, r, s) {
    return xt(2, arguments);
  }, e.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new e(n, r);
  }, e.killTweensOf = function(n, r, s) {
    return N.killTweensOf(n, r, s);
  }, e;
})(Ct);
ue(H.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
te("staggerTo,staggerFrom,staggerFromTo", function(a) {
  H[a] = function() {
    var e = new q(), t = pi.call(arguments, 0);
    return t.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), e[a].apply(e, t);
  };
});
var ki = function(e, t, i) {
  return e[t] = i;
}, ur = function(e, t, i) {
  return e[t](i);
}, vs = function(e, t, i, n) {
  return e[t](n.fp, i);
}, Es = function(e, t, i) {
  return e.setAttribute(t, i);
}, Ui = function(e, t) {
  return G(e[t]) ? ur : Ci(e[t]) && e.setAttribute ? Es : ki;
}, dr = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, ws = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, pr = function(e, t) {
  var i = t._pt, n = "";
  if (!e && t.b)
    n = t.b;
  else if (e === 1 && t.e)
    n = t.e;
  else {
    for (; i; )
      n = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + n, i = i._next;
    n += t.c;
  }
  t.set(t.t, t.p, n, t);
}, Fi = function(e, t) {
  for (var i = t._pt; i; )
    i.r(e, i.d), i = i._next;
}, Ps = function(e, t, i, n) {
  for (var r = this._pt, s; r; )
    s = r._next, r.p === n && r.modifier(e, t, i), r = s;
}, Cs = function(e) {
  for (var t = this._pt, i, n; t; )
    n = t._next, t.p === e && !t.op || t.op === e ? Yt(this, t, "_pt") : t.dep || (i = 1), t = n;
  return !i;
}, As = function(e, t, i, n) {
  n.mSet(e, t, n.m.call(n.tween, i, n.mt), n);
}, fr = function(e) {
  for (var t = e._pt, i, n, r, s; t; ) {
    for (i = t._next, n = r; n && n.pr > t.pr; )
      n = n._next;
    (t._prev = n ? n._prev : s) ? t._prev._next = t : r = t, (t._next = n) ? n._prev = t : s = t, t = i;
  }
  e._pt = r;
}, ie = /* @__PURE__ */ (function() {
  function a(t, i, n, r, s, o, l, c, h) {
    this.t = i, this.s = r, this.c = s, this.p = n, this.r = o || dr, this.d = l || this, this.set = c || ki, this.pr = h || 0, this._next = t, t && (t._prev = this);
  }
  var e = a.prototype;
  return e.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = As, this.m = i, this.mt = r, this.tween = n;
  }, a;
})();
te(Mi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(a) {
  return Di[a] = 1;
});
ce.TweenMax = ce.TweenLite = H;
ce.TimelineLite = ce.TimelineMax = q;
N = new q({
  sortChildren: !1,
  defaults: st,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
he.stringFilter = nr;
var Ze = [], Ft = {}, Ts = [], en = 0, Ss = 0, ei = function(e) {
  return (Ft[e] || Ts).map(function(t) {
    return t();
  });
}, _i = function() {
  var e = Date.now(), t = [];
  e - en > 2 && (ei("matchMediaInit"), Ze.forEach(function(i) {
    var n = i.queries, r = i.conditions, s, o, l, c;
    for (o in n)
      s = _e.matchMedia(n[o]).matches, s && (l = 1), s !== r[o] && (r[o] = s, c = 1);
    c && (i.revert(), l && t.push(i));
  }), ei("matchMediaRevert"), t.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), en = e, ei("matchMedia"));
}, mr = /* @__PURE__ */ (function() {
  function a(t, i) {
    this.selector = i && fi(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Ss++, t && this.add(t);
  }
  var e = a.prototype;
  return e.add = function(i, n, r) {
    G(i) && (r = n, n = i, i = G);
    var s = this, o = function() {
      var c = z, h = s.selector, u;
      return c && c !== s && c.data.push(s), r && (s.selector = fi(r)), z = s, u = n.apply(s, arguments), G(u) && s._r.push(u), z = c, s.selector = h, s.isReverted = !1, u;
    };
    return s.last = o, i === G ? o(s, function(l) {
      return s.add(null, l);
    }) : i ? s[i] = o : o;
  }, e.ignore = function(i) {
    var n = z;
    z = null, i(this), z = n;
  }, e.getTweens = function() {
    var i = [];
    return this.data.forEach(function(n) {
      return n instanceof a ? i.push.apply(i, n.getTweens()) : n instanceof H && !(n.parent && n.parent.data === "nested") && i.push(n);
    }), i;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(i, n) {
    var r = this;
    if (i ? (function() {
      for (var o = r.getTweens(), l = r.data.length, c; l--; )
        c = r.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(h) {
          return o.splice(o.indexOf(h), 1);
        }));
      for (o.map(function(h) {
        return {
          g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
          t: h
        };
      }).sort(function(h, u) {
        return u.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), l = r.data.length; l--; )
        c = r.data[l], c instanceof q ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof H) && c.revert && c.revert(i);
      r._r.forEach(function(h) {
        return h(i, r);
      }), r.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), n)
      for (var s = Ze.length; s--; )
        Ze[s].id === this.id && Ze.splice(s, 1);
  }, e.revert = function(i) {
    this.kill(i || {});
  }, a;
})(), Ds = /* @__PURE__ */ (function() {
  function a(t) {
    this.contexts = [], this.scope = t, z && z.data.push(this);
  }
  var e = a.prototype;
  return e.add = function(i, n, r) {
    ve(i) || (i = {
      matches: i
    });
    var s = new mr(0, r || this.scope), o = s.conditions = {}, l, c, h;
    z && !s.selector && (s.selector = z.selector), this.contexts.push(s), n = s.add("onMatch", n), s.queries = i;
    for (c in i)
      c === "all" ? h = 1 : (l = _e.matchMedia(i[c]), l && (Ze.indexOf(s) < 0 && Ze.push(s), (o[c] = l.matches) && (h = 1), l.addListener ? l.addListener(_i) : l.addEventListener("change", _i)));
    return h && n(s, function(u) {
      return s.add(null, u);
    }), this;
  }, e.revert = function(i) {
    this.kill(i || {});
  }, e.kill = function(i) {
    this.contexts.forEach(function(n) {
      return n.kill(i, !0);
    });
  }, a;
})(), Vt = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    t.forEach(function(n) {
      return er(n);
    });
  },
  timeline: function(e) {
    return new q(e);
  },
  getTweensOf: function(e, t) {
    return N.getTweensOf(e, t);
  },
  getProperty: function(e, t, i, n) {
    Z(e) && (e = me(e)[0]);
    var r = He(e || {}).get, s = i ? Bn : $n;
    return i === "native" && (i = ""), e && (t ? s((ae[t] && ae[t].get || r)(e, t, i, n)) : function(o, l, c) {
      return s((ae[o] && ae[o].get || r)(e, o, l, c));
    });
  },
  quickSetter: function(e, t, i) {
    if (e = me(e), e.length > 1) {
      var n = e.map(function(h) {
        return re.quickSetter(h, t, i);
      }), r = n.length;
      return function(h) {
        for (var u = r; u--; )
          n[u](h);
      };
    }
    e = e[0] || {};
    var s = ae[t], o = He(e), l = o.harness && (o.harness.aliases || {})[t] || t, c = s ? function(h) {
      var u = new s();
      et._pt = 0, u.init(e, i ? h + i : h, et, 0, [e]), u.render(1, u), et._pt && Fi(1, et);
    } : o.set(e, l);
    return s ? c : function(h) {
      return c(e, l, i ? h + i : h, o, 1);
    };
  },
  quickTo: function(e, t, i) {
    var n, r = re.to(e, ue((n = {}, n[t] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), s = function(l, c, h) {
      return r.resetTo(t, l, c, h);
    };
    return s.tween = r, s;
  },
  isTweening: function(e) {
    return N.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Ye(e.ease, st.ease)), Xi(st, e || {});
  },
  config: function(e) {
    return Xi(he, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, i = e.effect, n = e.plugins, r = e.defaults, s = e.extendTimeline;
    (n || "").split(",").forEach(function(o) {
      return o && !ae[o] && !ce[o] && vt(t + " effect requires " + o + " plugin.");
    }), Wt[t] = function(o, l, c) {
      return i(me(o), ue(l || {}, r), c);
    }, s && (q.prototype[t] = function(o, l, c) {
      return this.add(Wt[t](o, ve(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    D[e] = Ye(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? Ye(e, t) : D;
  },
  getById: function(e) {
    return N.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var i = new q(e), n, r;
    for (i.smoothChildTiming = ee(e.smoothChildTiming), N.remove(i), i._dp = 0, i._time = i._tTime = N._time, n = N._first; n; )
      r = n._next, (t || !(!n._dur && n instanceof H && n.vars.onComplete === n._targets[0])) && ye(i, n, n._start - n._delay), n = r;
    return ye(N, i, 0), i;
  },
  context: function(e, t) {
    return e ? new mr(e, t) : z;
  },
  matchMedia: function(e) {
    return new Ds(e);
  },
  matchMediaRefresh: function() {
    return Ze.forEach(function(e) {
      var t = e.conditions, i, n;
      for (n in t)
        t[n] && (t[n] = !1, i = 1);
      i && e.revert();
    }) || _i();
  },
  addEventListener: function(e, t) {
    var i = Ft[e] || (Ft[e] = []);
    ~i.indexOf(t) || i.push(t);
  },
  removeEventListener: function(e, t) {
    var i = Ft[e], n = i && i.indexOf(t);
    n >= 0 && i.splice(n, 1);
  },
  utils: {
    wrap: os,
    wrapYoyo: ls,
    distribute: Kn,
    random: Wn,
    snap: Xn,
    normalize: as,
    getUnit: X,
    clamp: is,
    splitColor: tr,
    toArray: me,
    selector: fi,
    mapRange: Qn,
    pipe: rs,
    unitize: ss,
    interpolate: hs,
    shuffle: Zn
  },
  install: kn,
  effects: Wt,
  ticker: oe,
  updateRoot: q.updateRoot,
  plugins: ae,
  globalTimeline: N,
  core: {
    PropTween: ie,
    globals: Un,
    Tween: H,
    Timeline: q,
    Animation: Ct,
    getCache: He,
    _removeLinkedListItem: Yt,
    reverting: function() {
      return K;
    },
    context: function(e) {
      return e && z && (z.data.push(e), e._ctx = z), z;
    },
    suppressOverwrites: function(e) {
      return Pi = e;
    }
  }
};
te("to,from,fromTo,delayedCall,set,killTweensOf", function(a) {
  return Vt[a] = H[a];
});
oe.add(q.updateRoot);
et = Vt.to({}, {
  duration: 0
});
var Ms = function(e, t) {
  for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
    i = i._next;
  return i;
}, Rs = function(e, t) {
  var i = e._targets, n, r, s;
  for (n in t)
    for (r = i.length; r--; )
      s = e._ptLookup[r][n], s && (s = s.d) && (s._pt && (s = Ms(s, n)), s && s.modifier && s.modifier(t[n], e, i[r], n));
}, ti = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, s) {
      s._onInit = function(o) {
        var l, c;
        if (Z(r) && (l = {}, te(r, function(h) {
          return l[h] = 1;
        }), r = l), t) {
          l = {};
          for (c in r)
            l[c] = t(r[c]);
          r = l;
        }
        Rs(o, r);
      };
    }
  };
}, re = Vt.registerPlugin({
  name: "attr",
  init: function(e, t, i, n, r) {
    var s, o, l;
    this.tween = i;
    for (s in t)
      l = e.getAttribute(s) || "", o = this.add(e, "setAttribute", (l || 0) + "", t[s], n, r, 0, 0, s), o.op = s, o.b = l, this._props.push(s);
  },
  render: function(e, t) {
    for (var i = t._pt; i; )
      K ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var i = t.length; i--; )
      this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1);
  }
}, ti("roundProps", mi), ti("modifiers"), ti("snap", Xn)) || Vt;
H.version = q.version = re.version = "3.13.0";
Ln = 1;
Ai() && ht();
D.Power0;
D.Power1;
D.Power2;
D.Power3;
D.Power4;
D.Linear;
D.Quad;
D.Cubic;
D.Quart;
D.Quint;
D.Strong;
D.Elastic;
D.Back;
D.SteppedEase;
D.Bounce;
D.Sine;
D.Expo;
D.Circ;
var tn, Se, nt, zi, Ge, nn, Ni, Os = function() {
  return typeof window < "u";
}, Ae = {}, $e = 180 / Math.PI, rt = Math.PI / 180, We = Math.atan2, rn = 1e8, $i = /([A-Z])/g, Is = /(left|right|width|margin|padding|x)/i, Ls = /[\s,\(]\S/, xe = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, yi = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, ks = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Us = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Fs = function(e, t) {
  var i = t.s + t.c * e;
  t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
}, gr = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, _r = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, zs = function(e, t, i) {
  return e.style[t] = i;
}, Ns = function(e, t, i) {
  return e.style.setProperty(t, i);
}, $s = function(e, t, i) {
  return e._gsap[t] = i;
}, Bs = function(e, t, i) {
  return e._gsap.scaleX = e._gsap.scaleY = i;
}, Gs = function(e, t, i, n, r) {
  var s = e._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(r, s);
}, Vs = function(e, t, i, n, r) {
  var s = e._gsap;
  s[t] = i, s.renderTransform(r, s);
}, $ = "transform", ne = $ + "Origin", Hs = function a(e, t) {
  var i = this, n = this.target, r = n.style, s = n._gsap;
  if (e in Ae && r) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = xe[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(o) {
        return i.tfm[o] = Pe(n, o);
      }) : this.tfm[e] = s.x ? s[e] : Pe(n, e), e === ne && (this.tfm.zOrigin = s.zOrigin);
    else
      return xe.transform.split(",").forEach(function(o) {
        return a.call(i, o, t);
      });
    if (this.props.indexOf($) >= 0)
      return;
    s.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(ne, t, "")), e = $;
  }
  (r || t) && this.props.push(e, t, r[e]);
}, yr = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, js = function() {
  var e = this.props, t = this.target, i = t.style, n = t._gsap, r, s;
  for (r = 0; r < e.length; r += 3)
    e[r + 1] ? e[r + 1] === 2 ? t[e[r]](e[r + 2]) : t[e[r]] = e[r + 2] : e[r + 2] ? i[e[r]] = e[r + 2] : i.removeProperty(e[r].substr(0, 2) === "--" ? e[r] : e[r].replace($i, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      n[s] = this.tfm[s];
    n.svg && (n.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), r = Ni(), (!r || !r.isStart) && !i[$] && (yr(i), n.zOrigin && i[ne] && (i[ne] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, xr = function(e, t) {
  var i = {
    target: e,
    props: [],
    revert: js,
    save: Hs
  };
  return e._gsap || re.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, br, xi = function(e, t) {
  var i = Se.createElementNS ? Se.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Se.createElement(e);
  return i && i.style ? i : Se.createElement(e);
}, ge = function a(e, t, i) {
  var n = getComputedStyle(e);
  return n[t] || n.getPropertyValue(t.replace($i, "-$1").toLowerCase()) || n.getPropertyValue(t) || !i && a(e, ct(t) || t, 1) || "";
}, sn = "O,Moz,ms,Ms,Webkit".split(","), ct = function(e, t, i) {
  var n = t || Ge, r = n.style, s = 5;
  if (e in r && !i)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(sn[s] + e in r); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? sn[s] : "") + e;
}, bi = function() {
  Os() && window.document && (tn = window, Se = tn.document, nt = Se.documentElement, Ge = xi("div") || {
    style: {}
  }, xi("div"), $ = ct($), ne = $ + "Origin", Ge.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", br = !!ct("perspective"), Ni = re.core.reverting, zi = 1);
}, an = function(e) {
  var t = e.ownerSVGElement, i = xi("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = e.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), nt.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), nt.removeChild(i), r;
}, on = function(e, t) {
  for (var i = t.length; i--; )
    if (e.hasAttribute(t[i]))
      return e.getAttribute(t[i]);
}, vr = function(e) {
  var t, i;
  try {
    t = e.getBBox();
  } catch {
    t = an(e), i = 1;
  }
  return t && (t.width || t.height) || i || (t = an(e)), t && !t.width && !t.x && !t.y ? {
    x: +on(e, ["x", "cx", "x1"]) || 0,
    y: +on(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Er = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && vr(e));
}, Ke = function(e, t) {
  if (t) {
    var i = e.style, n;
    t in Ae && t !== ne && (t = $), i.removeProperty ? (n = t.substr(0, 2), (n === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), i.removeProperty(n === "--" ? t : t.replace($i, "-$1").toLowerCase())) : i.removeAttribute(t);
  }
}, De = function(e, t, i, n, r, s) {
  var o = new ie(e._pt, t, i, 0, 1, s ? _r : gr);
  return e._pt = o, o.b = n, o.e = r, e._props.push(i), o;
}, ln = {
  deg: 1,
  rad: 1,
  turn: 1
}, Ys = {
  grid: 1,
  flex: 1
}, Le = function a(e, t, i, n) {
  var r = parseFloat(i) || 0, s = (i + "").trim().substr((r + "").length) || "px", o = Ge.style, l = Is.test(t), c = e.tagName.toLowerCase() === "svg", h = (c ? "client" : "offset") + (l ? "Width" : "Height"), u = 100, p = n === "px", m = n === "%", f, d, g, _;
  if (n === s || !r || ln[n] || ln[s])
    return r;
  if (s !== "px" && !p && (r = a(e, t, i, "px")), _ = e.getCTM && Er(e), (m || s === "%") && (Ae[t] || ~t.indexOf("adius")))
    return f = _ ? e.getBBox()[l ? "width" : "height"] : e[h], V(m ? r / f * u : r / 100 * f);
  if (o[l ? "width" : "height"] = u + (p ? s : n), d = n !== "rem" && ~t.indexOf("adius") || n === "em" && e.appendChild && !c ? e : e.parentNode, _ && (d = (e.ownerSVGElement || {}).parentNode), (!d || d === Se || !d.appendChild) && (d = Se.body), g = d._gsap, g && m && g.width && l && g.time === oe.time && !g.uncache)
    return V(r / g.width * u);
  if (m && (t === "height" || t === "width")) {
    var y = e.style[t];
    e.style[t] = u + n, f = e[h], y ? e.style[t] = y : Ke(e, t);
  } else
    (m || s === "%") && !Ys[ge(d, "display")] && (o.position = ge(e, "position")), d === e && (o.position = "static"), d.appendChild(Ge), f = Ge[h], d.removeChild(Ge), o.position = "absolute";
  return l && m && (g = He(d), g.time = oe.time, g.width = d[h]), V(p ? f * r / u : f && r ? u / f * r : 0);
}, Pe = function(e, t, i, n) {
  var r;
  return zi || bi(), t in xe && t !== "transform" && (t = xe[t], ~t.indexOf(",") && (t = t.split(",")[0])), Ae[t] && t !== "transform" ? (r = Tt(e, n), r = t !== "transformOrigin" ? r[t] : r.svg ? r.origin : jt(ge(e, ne)) + " " + r.zOrigin + "px") : (r = e.style[t], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = Ht[t] && Ht[t](e, t, i) || ge(e, t) || zn(e, t) || (t === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? Le(e, t, r, i) + i : r;
}, Zs = function(e, t, i, n) {
  if (!i || i === "none") {
    var r = ct(t, e, 1), s = r && ge(e, r, 1);
    s && s !== i ? (t = r, i = s) : t === "borderColor" && (i = ge(e, "borderTopColor"));
  }
  var o = new ie(this._pt, e.style, t, 0, 1, pr), l = 0, c = 0, h, u, p, m, f, d, g, _, y, x, v, b;
  if (o.b = i, o.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = ge(e, n.substring(4, n.indexOf(")")))), n === "auto" && (d = e.style[t], e.style[t] = n, n = ge(e, t) || n, d ? e.style[t] = d : Ke(e, t)), h = [i, n], nr(h), i = h[0], n = h[1], p = i.match(Je) || [], b = n.match(Je) || [], b.length) {
    for (; u = Je.exec(n); )
      g = u[0], y = n.substring(l, u.index), f ? f = (f + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (f = 1), g !== (d = p[c++] || "") && (m = parseFloat(d) || 0, v = d.substr((m + "").length), g.charAt(1) === "=" && (g = it(m, g) + v), _ = parseFloat(g), x = g.substr((_ + "").length), l = Je.lastIndex - x.length, x || (x = x || he.units[t] || v, l === n.length && (n += x, o.e += x)), v !== x && (m = Le(e, t, d, x) || 0), o._pt = {
        _next: o._pt,
        p: y || c === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: m,
        c: _ - m,
        m: f && f < 4 || t === "zIndex" ? Math.round : 0
      });
    o.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    o.r = t === "display" && n === "none" ? _r : gr;
  return On.test(n) && (o.e = 0), this._pt = o, o;
}, hn = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Ks = function(e) {
  var t = e.split(" "), i = t[0], n = t[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (e = i, i = n, n = e), t[0] = hn[i] || i, t[1] = hn[n] || n, t.join(" ");
}, Xs = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var i = t.t, n = i.style, r = t.u, s = i._gsap, o, l, c;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), c = r.length; --c > -1; )
        o = r[c], Ae[o] && (l = 1, o = o === "transformOrigin" ? ne : $), Ke(i, o);
    l && (Ke(i, $), s && (s.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", Tt(i, 1), s.uncache = 1, yr(n)));
  }
}, Ht = {
  clearProps: function(e, t, i, n, r) {
    if (r.data !== "isFromStart") {
      var s = e._pt = new ie(e._pt, t, i, 0, 0, Xs);
      return s.u = n, s.pr = -10, s.tween = r, e._props.push(i), 1;
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
}, At = [1, 0, 0, 1, 0, 0], wr = {}, Pr = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, cn = function(e) {
  var t = ge(e, $);
  return Pr(t) ? At : t.substr(7).match(Rn).map(V);
}, Bi = function(e, t) {
  var i = e._gsap || He(e), n = e.style, r = cn(e), s, o, l, c;
  return i.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? At : r) : (r === At && !e.offsetParent && e !== nt && !i.svg && (l = n.display, n.display = "block", s = e.parentNode, (!s || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, o = e.nextElementSibling, nt.appendChild(e)), r = cn(e), l ? n.display = l : Ke(e, "display"), c && (o ? s.insertBefore(e, o) : s ? s.appendChild(e) : nt.removeChild(e))), t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, vi = function(e, t, i, n, r, s) {
  var o = e._gsap, l = r || Bi(e, !0), c = o.xOrigin || 0, h = o.yOrigin || 0, u = o.xOffset || 0, p = o.yOffset || 0, m = l[0], f = l[1], d = l[2], g = l[3], _ = l[4], y = l[5], x = t.split(" "), v = parseFloat(x[0]) || 0, b = parseFloat(x[1]) || 0, P, E, C, w;
  i ? l !== At && (E = m * g - f * d) && (C = v * (g / E) + b * (-d / E) + (d * y - g * _) / E, w = v * (-f / E) + b * (m / E) - (m * y - f * _) / E, v = C, b = w) : (P = vr(e), v = P.x + (~x[0].indexOf("%") ? v / 100 * P.width : v), b = P.y + (~(x[1] || x[0]).indexOf("%") ? b / 100 * P.height : b)), n || n !== !1 && o.smooth ? (_ = v - c, y = b - h, o.xOffset = u + (_ * m + y * d) - _, o.yOffset = p + (_ * f + y * g) - y) : o.xOffset = o.yOffset = 0, o.xOrigin = v, o.yOrigin = b, o.smooth = !!n, o.origin = t, o.originIsAbsolute = !!i, e.style[ne] = "0px 0px", s && (De(s, o, "xOrigin", c, v), De(s, o, "yOrigin", h, b), De(s, o, "xOffset", u, o.xOffset), De(s, o, "yOffset", p, o.yOffset)), e.setAttribute("data-svg-origin", v + " " + b);
}, Tt = function(e, t) {
  var i = e._gsap || new or(e);
  if ("x" in i && !t && !i.uncache)
    return i;
  var n = e.style, r = i.scaleX < 0, s = "px", o = "deg", l = getComputedStyle(e), c = ge(e, ne) || "0", h, u, p, m, f, d, g, _, y, x, v, b, P, E, C, w, T, M, A, R, O, B, F, U, Q, ut, dt, pt, Ue, ji, Ee, Fe;
  return h = u = p = d = g = _ = y = x = v = 0, m = f = 1, i.svg = !!(e.getCTM && Er(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[$] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[$] !== "none" ? l[$] : "")), n.scale = n.rotate = n.translate = "none"), E = Bi(e, i.svg), i.svg && (i.uncache ? (Q = e.getBBox(), c = i.xOrigin - Q.x + "px " + (i.yOrigin - Q.y) + "px", U = "") : U = !t && e.getAttribute("data-svg-origin"), vi(e, U || c, !!U || i.originIsAbsolute, i.smooth !== !1, E)), b = i.xOrigin || 0, P = i.yOrigin || 0, E !== At && (M = E[0], A = E[1], R = E[2], O = E[3], h = B = E[4], u = F = E[5], E.length === 6 ? (m = Math.sqrt(M * M + A * A), f = Math.sqrt(O * O + R * R), d = M || A ? We(A, M) * $e : 0, y = R || O ? We(R, O) * $e + d : 0, y && (f *= Math.abs(Math.cos(y * rt))), i.svg && (h -= b - (b * M + P * R), u -= P - (b * A + P * O))) : (Fe = E[6], ji = E[7], dt = E[8], pt = E[9], Ue = E[10], Ee = E[11], h = E[12], u = E[13], p = E[14], C = We(Fe, Ue), g = C * $e, C && (w = Math.cos(-C), T = Math.sin(-C), U = B * w + dt * T, Q = F * w + pt * T, ut = Fe * w + Ue * T, dt = B * -T + dt * w, pt = F * -T + pt * w, Ue = Fe * -T + Ue * w, Ee = ji * -T + Ee * w, B = U, F = Q, Fe = ut), C = We(-R, Ue), _ = C * $e, C && (w = Math.cos(-C), T = Math.sin(-C), U = M * w - dt * T, Q = A * w - pt * T, ut = R * w - Ue * T, Ee = O * T + Ee * w, M = U, A = Q, R = ut), C = We(A, M), d = C * $e, C && (w = Math.cos(C), T = Math.sin(C), U = M * w + A * T, Q = B * w + F * T, A = A * w - M * T, F = F * w - B * T, M = U, B = Q), g && Math.abs(g) + Math.abs(d) > 359.9 && (g = d = 0, _ = 180 - _), m = V(Math.sqrt(M * M + A * A + R * R)), f = V(Math.sqrt(F * F + Fe * Fe)), C = We(B, F), y = Math.abs(C) > 2e-4 ? C * $e : 0, v = Ee ? 1 / (Ee < 0 ? -Ee : Ee) : 0), i.svg && (U = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !Pr(ge(e, $)), U && e.setAttribute("transform", U))), Math.abs(y) > 90 && Math.abs(y) < 270 && (r ? (m *= -1, y += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (f *= -1, y += y <= 0 ? 180 : -180)), t = t || i.uncache, i.x = h - ((i.xPercent = h && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + s, i.y = u - ((i.yPercent = u && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + s, i.z = p + s, i.scaleX = V(m), i.scaleY = V(f), i.rotation = V(d) + o, i.rotationX = V(g) + o, i.rotationY = V(_) + o, i.skewX = y + o, i.skewY = x + o, i.transformPerspective = v + s, (i.zOrigin = parseFloat(c.split(" ")[2]) || !t && i.zOrigin || 0) && (n[ne] = jt(c)), i.xOffset = i.yOffset = 0, i.force3D = he.force3D, i.renderTransform = i.svg ? qs : br ? Cr : Ws, i.uncache = 0, i;
}, jt = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, ii = function(e, t, i) {
  var n = X(t);
  return V(parseFloat(t) + parseFloat(Le(e, "x", i + "px", n))) + n;
}, Ws = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Cr(e, t);
}, ze = "0deg", ft = "0px", Ne = ") ", Cr = function(e, t) {
  var i = t || this, n = i.xPercent, r = i.yPercent, s = i.x, o = i.y, l = i.z, c = i.rotation, h = i.rotationY, u = i.rotationX, p = i.skewX, m = i.skewY, f = i.scaleX, d = i.scaleY, g = i.transformPerspective, _ = i.force3D, y = i.target, x = i.zOrigin, v = "", b = _ === "auto" && e && e !== 1 || _ === !0;
  if (x && (u !== ze || h !== ze)) {
    var P = parseFloat(h) * rt, E = Math.sin(P), C = Math.cos(P), w;
    P = parseFloat(u) * rt, w = Math.cos(P), s = ii(y, s, E * w * -x), o = ii(y, o, -Math.sin(P) * -x), l = ii(y, l, C * w * -x + x);
  }
  g !== ft && (v += "perspective(" + g + Ne), (n || r) && (v += "translate(" + n + "%, " + r + "%) "), (b || s !== ft || o !== ft || l !== ft) && (v += l !== ft || b ? "translate3d(" + s + ", " + o + ", " + l + ") " : "translate(" + s + ", " + o + Ne), c !== ze && (v += "rotate(" + c + Ne), h !== ze && (v += "rotateY(" + h + Ne), u !== ze && (v += "rotateX(" + u + Ne), (p !== ze || m !== ze) && (v += "skew(" + p + ", " + m + Ne), (f !== 1 || d !== 1) && (v += "scale(" + f + ", " + d + Ne), y.style[$] = v || "translate(0, 0)";
}, qs = function(e, t) {
  var i = t || this, n = i.xPercent, r = i.yPercent, s = i.x, o = i.y, l = i.rotation, c = i.skewX, h = i.skewY, u = i.scaleX, p = i.scaleY, m = i.target, f = i.xOrigin, d = i.yOrigin, g = i.xOffset, _ = i.yOffset, y = i.forceCSS, x = parseFloat(s), v = parseFloat(o), b, P, E, C, w;
  l = parseFloat(l), c = parseFloat(c), h = parseFloat(h), h && (h = parseFloat(h), c += h, l += h), l || c ? (l *= rt, c *= rt, b = Math.cos(l) * u, P = Math.sin(l) * u, E = Math.sin(l - c) * -p, C = Math.cos(l - c) * p, c && (h *= rt, w = Math.tan(c - h), w = Math.sqrt(1 + w * w), E *= w, C *= w, h && (w = Math.tan(h), w = Math.sqrt(1 + w * w), b *= w, P *= w)), b = V(b), P = V(P), E = V(E), C = V(C)) : (b = u, C = p, P = E = 0), (x && !~(s + "").indexOf("px") || v && !~(o + "").indexOf("px")) && (x = Le(m, "x", s, "px"), v = Le(m, "y", o, "px")), (f || d || g || _) && (x = V(x + f - (f * b + d * E) + g), v = V(v + d - (f * P + d * C) + _)), (n || r) && (w = m.getBBox(), x = V(x + n / 100 * w.width), v = V(v + r / 100 * w.height)), w = "matrix(" + b + "," + P + "," + E + "," + C + "," + x + "," + v + ")", m.setAttribute("transform", w), y && (m.style[$] = w);
}, Qs = function(e, t, i, n, r) {
  var s = 360, o = Z(r), l = parseFloat(r) * (o && ~r.indexOf("rad") ? $e : 1), c = l - n, h = n + c + "deg", u, p;
  return o && (u = r.split("_")[1], u === "short" && (c %= s, c !== c % (s / 2) && (c += c < 0 ? s : -s)), u === "cw" && c < 0 ? c = (c + s * rn) % s - ~~(c / s) * s : u === "ccw" && c > 0 && (c = (c - s * rn) % s - ~~(c / s) * s)), e._pt = p = new ie(e._pt, t, i, n, c, ks), p.e = h, p.u = "deg", e._props.push(i), p;
}, un = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, Js = function(e, t, i) {
  var n = un({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, o, l, c, h, u, p, m, f;
  n.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), s[$] = t, o = Tt(i, 1), Ke(i, $), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[$], s[$] = t, o = Tt(i, 1), s[$] = c);
  for (l in Ae)
    c = n[l], h = o[l], c !== h && r.indexOf(l) < 0 && (m = X(c), f = X(h), u = m !== f ? Le(i, l, c, f) : parseFloat(c), p = parseFloat(h), e._pt = new ie(e._pt, o, l, u, p - u, yi), e._pt.u = f || 0, e._props.push(l));
  un(o, n);
};
te("padding,margin,Width,Radius", function(a, e) {
  var t = "Top", i = "Right", n = "Bottom", r = "Left", s = (e < 3 ? [t, i, n, r] : [t + r, t + i, n + i, n + r]).map(function(o) {
    return e < 2 ? a + o : "border" + o + a;
  });
  Ht[e > 1 ? "border" + a : a] = function(o, l, c, h, u) {
    var p, m;
    if (arguments.length < 4)
      return p = s.map(function(f) {
        return Pe(o, f, c);
      }), m = p.join(" "), m.split(p[0]).length === 5 ? p[0] : m;
    p = (h + "").split(" "), m = {}, s.forEach(function(f, d) {
      return m[f] = p[d] = p[d] || p[(d - 1) / 2 | 0];
    }), o.init(l, m, u);
  };
});
var Ar = {
  name: "css",
  register: bi,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, i, n, r) {
    var s = this._props, o = e.style, l = i.vars.startAt, c, h, u, p, m, f, d, g, _, y, x, v, b, P, E, C;
    zi || bi(), this.styles = this.styles || xr(e), C = this.styles.props, this.tween = i;
    for (d in t)
      if (d !== "autoRound" && (h = t[d], !(ae[d] && lr(d, t, i, n, e, r)))) {
        if (m = typeof h, f = Ht[d], m === "function" && (h = h.call(i, n, e, r), m = typeof h), m === "string" && ~h.indexOf("random(") && (h = wt(h)), f)
          f(this, e, d, h, i) && (E = 1);
        else if (d.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(d) + "").trim(), h += "", Oe.lastIndex = 0, Oe.test(c) || (g = X(c), _ = X(h)), _ ? g !== _ && (c = Le(e, d, c, _) + _) : g && (h += g), this.add(o, "setProperty", c, h, n, r, 0, 0, d), s.push(d), C.push(d, 0, o[d]);
        else if (m !== "undefined") {
          if (l && d in l ? (c = typeof l[d] == "function" ? l[d].call(i, n, e, r) : l[d], Z(c) && ~c.indexOf("random(") && (c = wt(c)), X(c + "") || c === "auto" || (c += he.units[d] || X(Pe(e, d)) || ""), (c + "").charAt(1) === "=" && (c = Pe(e, d))) : c = Pe(e, d), p = parseFloat(c), y = m === "string" && h.charAt(1) === "=" && h.substr(0, 2), y && (h = h.substr(2)), u = parseFloat(h), d in xe && (d === "autoAlpha" && (p === 1 && Pe(e, "visibility") === "hidden" && u && (p = 0), C.push("visibility", 0, o.visibility), De(this, o, "visibility", p ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), d !== "scale" && d !== "transform" && (d = xe[d], ~d.indexOf(",") && (d = d.split(",")[0]))), x = d in Ae, x) {
            if (this.styles.save(d), m === "string" && h.substring(0, 6) === "var(--" && (h = ge(e, h.substring(4, h.indexOf(")"))), u = parseFloat(h)), v || (b = e._gsap, b.renderTransform && !t.parseTransform || Tt(e, t.parseTransform), P = t.smoothOrigin !== !1 && b.smooth, v = this._pt = new ie(this._pt, o, $, 0, 1, b.renderTransform, b, 0, -1), v.dep = 1), d === "scale")
              this._pt = new ie(this._pt, b, "scaleY", b.scaleY, (y ? it(b.scaleY, y + u) : u) - b.scaleY || 0, yi), this._pt.u = 0, s.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              C.push(ne, 0, o[ne]), h = Ks(h), b.svg ? vi(e, h, 0, P, 0, this) : (_ = parseFloat(h.split(" ")[2]) || 0, _ !== b.zOrigin && De(this, b, "zOrigin", b.zOrigin, _), De(this, o, d, jt(c), jt(h)));
              continue;
            } else if (d === "svgOrigin") {
              vi(e, h, 1, P, 0, this);
              continue;
            } else if (d in wr) {
              Qs(this, b, d, p, y ? it(p, y + h) : h);
              continue;
            } else if (d === "smoothOrigin") {
              De(this, b, "smooth", b.smooth, h);
              continue;
            } else if (d === "force3D") {
              b[d] = h;
              continue;
            } else if (d === "transform") {
              Js(this, h, e);
              continue;
            }
          } else d in o || (d = ct(d) || d);
          if (x || (u || u === 0) && (p || p === 0) && !Ls.test(h) && d in o)
            g = (c + "").substr((p + "").length), u || (u = 0), _ = X(h) || (d in he.units ? he.units[d] : g), g !== _ && (p = Le(e, d, c, _)), this._pt = new ie(this._pt, x ? b : o, d, p, (y ? it(p, y + u) : u) - p, !x && (_ === "px" || d === "zIndex") && t.autoRound !== !1 ? Fs : yi), this._pt.u = _ || 0, g !== _ && _ !== "%" && (this._pt.b = c, this._pt.r = Us);
          else if (d in o)
            Zs.call(this, e, d, c, y ? y + h : h);
          else if (d in e)
            this.add(e, d, c || e[d], y ? y + h : h, n, r);
          else if (d !== "parseTransform") {
            Si(d, h);
            continue;
          }
          x || (d in o ? C.push(d, 0, o[d]) : typeof e[d] == "function" ? C.push(d, 2, e[d]()) : C.push(d, 1, c || e[d])), s.push(d);
        }
      }
    E && fr(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Ni())
      for (var i = t._pt; i; )
        i.r(e, i.d), i = i._next;
    else
      t.styles.revert();
  },
  get: Pe,
  aliases: xe,
  getSetter: function(e, t, i) {
    var n = xe[t];
    return n && n.indexOf(",") < 0 && (t = n), t in Ae && t !== ne && (e._gsap.x || Pe(e, "x")) ? i && nn === i ? t === "scale" ? Bs : $s : (nn = i || {}) && (t === "scale" ? Gs : Vs) : e.style && !Ci(e.style[t]) ? zs : ~t.indexOf("-") ? Ns : Ui(e, t);
  },
  core: {
    _removeProperty: Ke,
    _getMatrix: Bi
  }
};
re.utils.checkPrefix = ct;
re.core.getStyleSaver = xr;
(function(a, e, t, i) {
  var n = te(a + "," + e + "," + t, function(r) {
    Ae[r] = 1;
  });
  te(e, function(r) {
    he.units[r] = "deg", wr[r] = 1;
  }), xe[n[13]] = a + "," + e, te(i, function(r) {
    var s = r.split(":");
    xe[s[1]] = n[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
te("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
  he.units[a] = "px";
});
re.registerPlugin(Ar);
var _t = re.registerPlugin(Ar) || re;
_t.core.Tween;
class be {
  constructor(e, t, i, n, r = "div") {
    this.parent = e, this.object = t, this.property = i, this._disabled = !1, this._hidden = !1, this.initialValue = this.getValue(), this.domElement = document.createElement(r), this.domElement.classList.add("lil-controller"), this.domElement.classList.add(n), this.$name = document.createElement("div"), this.$name.classList.add("lil-name"), be.nextNameID = be.nextNameID || 0, this.$name.id = `lil-gui-name-${++be.nextNameID}`, this.$widget = document.createElement("div"), this.$widget.classList.add("lil-widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.domElement.addEventListener("keydown", (s) => s.stopPropagation()), this.domElement.addEventListener("keyup", (s) => s.stopPropagation()), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(i);
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
class ea extends be {
  constructor(e, t, i) {
    super(e, t, i, "lil-boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => {
      this.setValue(this.$input.checked), this._callOnFinishChange();
    }), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.checked = this.getValue(), this;
  }
}
function Ei(a) {
  let e, t;
  return (e = a.match(/(#|0x)?([a-f0-9]{6})/i)) ? t = e[2] : (e = a.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? t = parseInt(e[1]).toString(16).padStart(2, 0) + parseInt(e[2]).toString(16).padStart(2, 0) + parseInt(e[3]).toString(16).padStart(2, 0) : (e = a.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (t = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), t ? "#" + t : !1;
}
const ta = {
  isPrimitive: !0,
  match: (a) => typeof a == "string",
  fromHexString: Ei,
  toHexString: Ei
}, St = {
  isPrimitive: !0,
  match: (a) => typeof a == "number",
  fromHexString: (a) => parseInt(a.substring(1), 16),
  toHexString: (a) => "#" + a.toString(16).padStart(6, 0)
}, ia = {
  isPrimitive: !1,
  match: (a) => Array.isArray(a) || ArrayBuffer.isView(a),
  fromHexString(a, e, t = 1) {
    const i = St.fromHexString(a);
    e[0] = (i >> 16 & 255) / 255 * t, e[1] = (i >> 8 & 255) / 255 * t, e[2] = (i & 255) / 255 * t;
  },
  toHexString([a, e, t], i = 1) {
    i = 255 / i;
    const n = a * i << 16 ^ e * i << 8 ^ t * i << 0;
    return St.toHexString(n);
  }
}, na = {
  isPrimitive: !1,
  match: (a) => Object(a) === a,
  fromHexString(a, e, t = 1) {
    const i = St.fromHexString(a);
    e.r = (i >> 16 & 255) / 255 * t, e.g = (i >> 8 & 255) / 255 * t, e.b = (i & 255) / 255 * t;
  },
  toHexString({ r: a, g: e, b: t }, i = 1) {
    i = 255 / i;
    const n = a * i << 16 ^ e * i << 8 ^ t * i << 0;
    return St.toHexString(n);
  }
}, ra = [ta, St, ia, na];
function sa(a) {
  return ra.find((e) => e.match(a));
}
class aa extends be {
  constructor(e, t, i, n) {
    super(e, t, i, "lil-color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("lil-display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = sa(this.initialValue), this._rgbScale = n, this._initialValueHexString = this.save(), this._textFocused = !1, this.$input.addEventListener("input", () => {
      this._setValueFromHexString(this.$input.value);
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$text.addEventListener("input", () => {
      const r = Ei(this.$text.value);
      r && this._setValueFromHexString(r);
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
class ni extends be {
  constructor(e, t, i) {
    super(e, t, i, "lil-function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", (n) => {
      n.preventDefault(), this.getValue().call(this.object), this._callOnChange();
    }), this.$button.addEventListener("touchstart", () => {
    }, { passive: !0 }), this.$disable = this.$button;
  }
}
class oa extends be {
  constructor(e, t, i, n, r, s) {
    super(e, t, i, "lil-number"), this._initInput(), this.min(n), this.max(r);
    const o = s !== void 0;
    this.step(o ? s : this._getImplicitStep(), o), this.updateDisplay();
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
      let y = parseFloat(this.$input.value);
      isNaN(y) || (this._stepExplicit && (y = this._snap(y)), this.setValue(this._clamp(y)));
    }, i = (y) => {
      const x = parseFloat(this.$input.value);
      isNaN(x) || (this._snapClampSetValue(x + y), this.$input.value = this.getValue());
    }, n = (y) => {
      y.key === "Enter" && this.$input.blur(), y.code === "ArrowUp" && (y.preventDefault(), i(this._step * this._arrowKeyMultiplier(y))), y.code === "ArrowDown" && (y.preventDefault(), i(this._step * this._arrowKeyMultiplier(y) * -1));
    }, r = (y) => {
      this._inputFocused && (y.preventDefault(), i(this._step * this._normalizeMouseWheel(y)));
    };
    let s = !1, o, l, c, h, u;
    const p = 5, m = (y) => {
      o = y.clientX, l = c = y.clientY, s = !0, h = this.getValue(), u = 0, window.addEventListener("mousemove", f), window.addEventListener("mouseup", d);
    }, f = (y) => {
      if (s) {
        const x = y.clientX - o, v = y.clientY - l;
        Math.abs(v) > p ? (y.preventDefault(), this.$input.blur(), s = !1, this._setDraggingStyle(!0, "vertical")) : Math.abs(x) > p && d();
      }
      if (!s) {
        const x = y.clientY - c;
        u -= x * this._step * this._arrowKeyMultiplier(y), h + u > this._max ? u = this._max - h : h + u < this._min && (u = this._min - h), this._snapClampSetValue(h + u);
      }
      c = y.clientY;
    }, d = () => {
      this._setDraggingStyle(!1, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", d);
    }, g = () => {
      this._inputFocused = !0;
    }, _ = () => {
      this._inputFocused = !1, this.updateDisplay(), this._callOnFinishChange();
    };
    this.$input.addEventListener("input", t), this.$input.addEventListener("keydown", n), this.$input.addEventListener("wheel", r, { passive: !1 }), this.$input.addEventListener("mousedown", m), this.$input.addEventListener("focus", g), this.$input.addEventListener("blur", _);
  }
  _initSlider() {
    this._hasSlider = !0, this.$slider = document.createElement("div"), this.$slider.classList.add("lil-slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("lil-fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("lil-has-slider");
    const e = (_, y, x, v, b) => (_ - y) / (x - y) * (b - v) + v, t = (_) => {
      const y = this.$slider.getBoundingClientRect();
      let x = e(_, y.left, y.right, this._min, this._max);
      this._snapClampSetValue(x);
    }, i = (_) => {
      this._setDraggingStyle(!0), t(_.clientX), window.addEventListener("mousemove", n), window.addEventListener("mouseup", r);
    }, n = (_) => {
      t(_.clientX);
    }, r = () => {
      this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", r);
    };
    let s = !1, o, l;
    const c = (_) => {
      _.preventDefault(), this._setDraggingStyle(!0), t(_.touches[0].clientX), s = !1;
    }, h = (_) => {
      _.touches.length > 1 || (this._hasScrollBar ? (o = _.touches[0].clientX, l = _.touches[0].clientY, s = !0) : c(_), window.addEventListener("touchmove", u, { passive: !1 }), window.addEventListener("touchend", p));
    }, u = (_) => {
      if (s) {
        const y = _.touches[0].clientX - o, x = _.touches[0].clientY - l;
        Math.abs(y) > Math.abs(x) ? c(_) : (window.removeEventListener("touchmove", u), window.removeEventListener("touchend", p));
      } else
        _.preventDefault(), t(_.touches[0].clientX);
    }, p = () => {
      this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("touchmove", u), window.removeEventListener("touchend", p);
    }, m = this._callOnFinishChange.bind(this), f = 400;
    let d;
    const g = (_) => {
      if (Math.abs(_.deltaX) < Math.abs(_.deltaY) && this._hasScrollBar) return;
      _.preventDefault();
      const x = this._normalizeMouseWheel(_) * this._step;
      this._snapClampSetValue(this.getValue() + x), this.$input.value = this.getValue(), clearTimeout(d), d = setTimeout(m, f);
    };
    this.$slider.addEventListener("mousedown", i), this.$slider.addEventListener("touchstart", h, { passive: !1 }), this.$slider.addEventListener("wheel", g, { passive: !1 });
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
class la extends be {
  constructor(e, t, i, n) {
    super(e, t, i, "lil-option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("lil-display"), this.$select.addEventListener("change", () => {
      this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange();
    }), this.$select.addEventListener("focus", () => {
      this.$display.classList.add("lil-focus");
    }), this.$select.addEventListener("blur", () => {
      this.$display.classList.remove("lil-focus");
    }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.options(n);
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
class ha extends be {
  constructor(e, t, i) {
    super(e, t, i, "lil-string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("spellcheck", "false"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => {
      this.setValue(this.$input.value);
    }), this.$input.addEventListener("keydown", (n) => {
      n.code === "Enter" && this.$input.blur();
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.value = this.getValue(), this;
  }
}
var ca = `.lil-gui {
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
function ua(a) {
  const e = document.createElement("style");
  e.innerHTML = a;
  const t = document.querySelector("head link[rel=stylesheet], head style");
  t ? document.head.insertBefore(e, t) : document.head.appendChild(e);
}
let dn = !1;
class Gi {
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
    width: n,
    title: r = "Controls",
    closeFolders: s = !1,
    injectStyles: o = !0,
    touchStyles: l = !0
  } = {}) {
    if (this.parent = e, this.root = e ? e.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = !1, this._hidden = !1, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("button"), this.$title.classList.add("lil-title"), this.$title.setAttribute("aria-expanded", !0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("touchstart", () => {
    }, { passive: !0 }), this.$children = document.createElement("div"), this.$children.classList.add("lil-children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(r), this.parent) {
      this.parent.children.push(this), this.parent.folders.push(this), this.parent.$children.appendChild(this.domElement);
      return;
    }
    this.domElement.classList.add("lil-root"), l && this.domElement.classList.add("lil-allow-touch-styles"), !dn && o && (ua(ca), dn = !0), i ? i.appendChild(this.domElement) : t && (this.domElement.classList.add("lil-auto-place", "autoPlace"), document.body.appendChild(this.domElement)), n && this.domElement.style.setProperty("--width", n + "px"), this._closeFolders = s;
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
  add(e, t, i, n, r) {
    if (Object(i) === i)
      return new la(this, e, t, i);
    const s = e[t];
    switch (typeof s) {
      case "number":
        return new oa(this, e, t, i, n, r);
      case "boolean":
        return new ea(this, e, t);
      case "string":
        return new ha(this, e, t);
      case "function":
        return new ni(this, e, t);
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
    return new aa(this, e, t, i);
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
    const t = new Gi({ parent: this, title: e });
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
      i instanceof ni || i._name in e.controllers && i.load(e.controllers[i._name]);
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
      if (!(i instanceof ni)) {
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
      const i = (r) => {
        r.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("lil-transition"), this.$children.removeEventListener("transitionend", i));
      };
      this.$children.addEventListener("transitionend", i);
      const n = e ? this.$children.scrollHeight : 0;
      this.domElement.classList.toggle("lil-closed", !e), requestAnimationFrame(() => {
        this.$children.style.height = n + "px";
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
const pn = { type: "change" }, Vi = { type: "start" }, Tr = { type: "end" }, Rt = new Ur(), fn = new Fr(), da = Math.cos(70 * zr.DEG2RAD), Y = new se(), J = 2 * Math.PI, I = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ri = 1e-6;
class pa extends kr {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = I.NONE, this.target = new se(), this.cursor = new se(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: tt.ROTATE, MIDDLE: tt.DOLLY, RIGHT: tt.PAN }, this.touches = { ONE: Qe.ROTATE, TWO: Qe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new se(), this._lastQuaternion = new Yi(), this._lastTargetPosition = new se(), this._quat = new Yi().setFromUnitVectors(e.up, new se(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Zi(), this._sphericalDelta = new Zi(), this._scale = 1, this._panOffset = new se(), this._rotateStart = new de(), this._rotateEnd = new de(), this._rotateDelta = new de(), this._panStart = new de(), this._panEnd = new de(), this._panDelta = new de(), this._dollyStart = new de(), this._dollyEnd = new de(), this._dollyDelta = new de(), this._dollyDirection = new se(), this._mouse = new de(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = ma.bind(this), this._onPointerDown = fa.bind(this), this._onPointerUp = ga.bind(this), this._onContextMenu = wa.bind(this), this._onMouseWheel = xa.bind(this), this._onKeyDown = ba.bind(this), this._onTouchStart = va.bind(this), this._onTouchMove = Ea.bind(this), this._onMouseDown = _a.bind(this), this._onMouseMove = ya.bind(this), this._interceptControlDown = Pa.bind(this), this._interceptControlUp = Ca.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(e) {
    super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLElement} domElement - The DOM element
   */
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(pn), this.update(), this.state = I.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    Y.copy(t).sub(this.target), Y.applyQuaternion(this._quat), this._spherical.setFromVector3(Y), this.autoRotate && this.state === I.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += J : i > Math.PI && (i -= J), n < -Math.PI ? n += J : n > Math.PI && (n -= J), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const s = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = s != this._spherical.radius;
    }
    if (Y.setFromSpherical(this._spherical), Y.applyQuaternion(this._quatInverse), t.copy(this.target).add(Y), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let s = null;
      if (this.object.isPerspectiveCamera) {
        const o = Y.length();
        s = this._clampDistance(o * this._scale);
        const l = o - s;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new se(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new se(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), s = Y.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      s !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position) : (Rt.origin.copy(this.object.position), Rt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Rt.direction)) < da ? this.object.lookAt(this.target) : (fn.setFromNormalAndCoplanarPoint(this.object.up, this.target), Rt.intersectPlane(fn, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const s = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), s !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > ri || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ri || this._lastTargetPosition.distanceToSquared(this.target) > ri ? (this.dispatchEvent(pn), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? J / 60 * this.autoRotateSpeed * e : J / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    Y.setFromMatrixColumn(t, 0), Y.multiplyScalar(-e), this._panOffset.add(Y);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? Y.setFromMatrixColumn(t, 1) : (Y.setFromMatrixColumn(t, 0), Y.crossVectors(this.object.up, Y)), Y.multiplyScalar(e), this._panOffset.add(Y);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      Y.copy(n).sub(this.target);
      let r = Y.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / i.clientHeight, this.object.matrix), this._panUp(2 * t * r / i.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const i = this.domElement.getBoundingClientRect(), n = e - i.left, r = t - i.top, s = i.width, o = i.height;
    this._mouse.x = n / s * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(J * this._rotateDelta.x / t.clientHeight), this._rotateUp(J * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(i, n);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panStart.set(i, n);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(i * i + n * n);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const i = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + i.x), r = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(n, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(J * this._rotateDelta.x / t.clientHeight), this._rotateUp(J * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panEnd.set(i, n);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(i * i + n * n);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const s = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(s, o);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new de(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, i = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
}
function fa(a) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(a) && (this._addPointer(a), a.pointerType === "touch" ? this._onTouchStart(a) : this._onMouseDown(a)));
}
function ma(a) {
  this.enabled !== !1 && (a.pointerType === "touch" ? this._onTouchMove(a) : this._onMouseMove(a));
}
function ga(a) {
  switch (this._removePointer(a), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Tr), this.state = I.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function _a(a) {
  let e;
  switch (a.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case tt.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(a), this.state = I.DOLLY;
      break;
    case tt.ROTATE:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = I.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = I.ROTATE;
      }
      break;
    case tt.PAN:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = I.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = I.PAN;
      }
      break;
    default:
      this.state = I.NONE;
  }
  this.state !== I.NONE && this.dispatchEvent(Vi);
}
function ya(a) {
  switch (this.state) {
    case I.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(a);
      break;
    case I.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(a);
      break;
    case I.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(a);
      break;
  }
}
function xa(a) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== I.NONE || (a.preventDefault(), this.dispatchEvent(Vi), this._handleMouseWheel(this._customWheelEvent(a)), this.dispatchEvent(Tr));
}
function ba(a) {
  this.enabled !== !1 && this._handleKeyDown(a);
}
function va(a) {
  switch (this._trackPointer(a), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Qe.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(a), this.state = I.TOUCH_ROTATE;
          break;
        case Qe.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(a), this.state = I.TOUCH_PAN;
          break;
        default:
          this.state = I.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Qe.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(a), this.state = I.TOUCH_DOLLY_PAN;
          break;
        case Qe.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(a), this.state = I.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = I.NONE;
      }
      break;
    default:
      this.state = I.NONE;
  }
  this.state !== I.NONE && this.dispatchEvent(Vi);
}
function Ea(a) {
  switch (this._trackPointer(a), this.state) {
    case I.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(a), this.update();
      break;
    case I.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(a), this.update();
      break;
    case I.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(a), this.update();
      break;
    case I.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(a), this.update();
      break;
    default:
      this.state = I.NONE;
  }
}
function wa(a) {
  this.enabled !== !1 && a.preventDefault();
}
function Pa(a) {
  a.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Ca(a) {
  a.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Aa(a) {
  return a;
}
function Ta(a) {
  if (a == null) return Aa;
  var e, t, i = a.scale[0], n = a.scale[1], r = a.translate[0], s = a.translate[1];
  return function(o, l) {
    l || (e = t = 0);
    var c = 2, h = o.length, u = new Array(h);
    for (u[0] = (e += o[0]) * i + r, u[1] = (t += o[1]) * n + s; c < h; ) u[c] = o[c], ++c;
    return u;
  };
}
function Sa(a, e) {
  for (var t, i = a.length, n = i - e; n < --i; ) t = a[n], a[n++] = a[i], a[i] = t;
}
function Da(a, e) {
  return typeof e == "string" && (e = a.objects[e]), e.type === "GeometryCollection" ? { type: "FeatureCollection", features: e.geometries.map(function(t) {
    return mn(a, t);
  }) } : mn(a, e);
}
function mn(a, e) {
  var t = e.id, i = e.bbox, n = e.properties == null ? {} : e.properties, r = Ma(a, e);
  return t == null && i == null ? { type: "Feature", properties: n, geometry: r } : i == null ? { type: "Feature", id: t, properties: n, geometry: r } : { type: "Feature", id: t, bbox: i, properties: n, geometry: r };
}
function Ma(a, e) {
  var t = Ta(a.transform), i = a.arcs;
  function n(h, u) {
    u.length && u.pop();
    for (var p = i[h < 0 ? ~h : h], m = 0, f = p.length; m < f; ++m)
      u.push(t(p[m], m));
    h < 0 && Sa(u, f);
  }
  function r(h) {
    return t(h);
  }
  function s(h) {
    for (var u = [], p = 0, m = h.length; p < m; ++p) n(h[p], u);
    return u.length < 2 && u.push(u[0]), u;
  }
  function o(h) {
    for (var u = s(h); u.length < 4; ) u.push(u[0]);
    return u;
  }
  function l(h) {
    return h.map(o);
  }
  function c(h) {
    var u = h.type, p;
    switch (u) {
      case "GeometryCollection":
        return { type: u, geometries: h.geometries.map(c) };
      case "Point":
        p = r(h.coordinates);
        break;
      case "MultiPoint":
        p = h.coordinates.map(r);
        break;
      case "LineString":
        p = s(h.arcs);
        break;
      case "MultiLineString":
        p = h.arcs.map(s);
        break;
      case "Polygon":
        p = l(h.arcs);
        break;
      case "MultiPolygon":
        p = h.arcs.map(l);
        break;
      default:
        return null;
    }
    return { type: u, coordinates: p };
  }
  return c(e);
}
const Sr = [
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
], Ra = [
  {
    id: "humanDevIndex",
    name: "Human Development Index",
    unit: "",
    description: "UN composite index of life expectancy, education, and income",
    colorScale: ["#fee5d9", "#fcae91", "#cb181d"],
    domain: [0.4, 1],
    accessor: (a) => a.humanDevIndex,
    format: (a) => a.toFixed(3)
  },
  {
    id: "gdpPerCapita",
    name: "GDP per Capita (PPP)",
    unit: "$",
    description: "Purchasing power parity adjusted GDP per person",
    colorScale: ["#edf8e9", "#74c476", "#006d2c"],
    domain: [1e3, 8e4],
    accessor: (a) => a.gdpPerCapita,
    format: (a) => `$${(a / 1e3).toFixed(1)}k`
  },
  {
    id: "co2Emissions",
    name: "CO₂ Emissions",
    unit: "t/capita",
    description: "Carbon dioxide emissions per capita",
    colorScale: ["#f7fbff", "#6baed6", "#08306b"],
    domain: [0, 20],
    accessor: (a) => a.co2Emissions,
    format: (a) => `${a.toFixed(1)}t`
  },
  {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Average life expectancy at birth",
    colorScale: ["#feedde", "#fdbe85", "#d94701"],
    domain: [55, 85],
    accessor: (a) => a.lifeExpectancy,
    format: (a) => `${a.toFixed(1)} yrs`
  },
  {
    id: "renewableEnergy",
    name: "Renewable Energy",
    unit: "%",
    description: "Share of renewable energy in total energy consumption",
    colorScale: ["#f7fcf5", "#74c476", "#00441b"],
    domain: [0, 100],
    accessor: (a) => a.renewableEnergy,
    format: (a) => `${a.toFixed(0)}%`
  },
  {
    id: "internetUsers",
    name: "Internet Penetration",
    unit: "%",
    description: "Percentage of population using the internet",
    colorScale: ["#f2f0f7", "#9e9ac8", "#54278f"],
    domain: [0, 100],
    accessor: (a) => a.internetUsers,
    format: (a) => `${a.toFixed(0)}%`
  },
  {
    id: "urbanPopulation",
    name: "Urbanization",
    unit: "%",
    description: "Percentage of population living in urban areas",
    colorScale: ["#fff5eb", "#fd8d3c", "#7f2704"],
    domain: [15, 100],
    accessor: (a) => a.urbanPopulation,
    format: (a) => `${a.toFixed(0)}%`
  },
  {
    id: "healthExpenditure",
    name: "Health Spending",
    unit: "% GDP",
    description: "Total health expenditure as percentage of GDP",
    colorScale: ["#fff5f0", "#fb6a4a", "#99000d"],
    domain: [2, 18],
    accessor: (a) => a.healthExpenditure,
    format: (a) => `${a.toFixed(1)}%`
  },
  {
    id: "forestArea",
    name: "Forest Coverage",
    unit: "%",
    description: "Forest area as percentage of total land area",
    colorScale: ["#f7fcf5", "#41ab5d", "#00441b"],
    domain: [0, 75],
    accessor: (a) => a.forestArea,
    format: (a) => `${a.toFixed(0)}%`
  },
  {
    id: "accessElectricity",
    name: "Electricity Access",
    unit: "%",
    description: "Percentage of population with access to electricity",
    colorScale: ["#ffffd4", "#fed98e", "#cc4c02"],
    domain: [15, 100],
    accessor: (a) => a.accessElectricity,
    format: (a) => `${a.toFixed(0)}%`
  }
];
function Oa(a, e) {
  const [t, i] = a.domain;
  return Math.max(0, Math.min(1, (e - t) / (i - t)));
}
const Ia = {
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
function gn(a) {
  const e = a.toUpperCase().trim();
  return /^\d{1,3}$/.test(a) ? a.padStart(3, "0") : Ia[e] || a;
}
function La(a) {
  const e = {};
  return a instanceof Map ? a.forEach((t, i) => {
    e[gn(i)] = t;
  }) : Object.entries(a).forEach(([t, i]) => {
    e[gn(t)] = i;
  }), e;
}
const Ot = 2048, It = 1024;
class ka {
  canvas;
  ctx;
  countries = [];
  loaded = !1;
  statsMap;
  constructor() {
    this.canvas = document.createElement("canvas"), this.canvas.width = Ot, this.canvas.height = It, this.ctx = this.canvas.getContext("2d"), this.statsMap = /* @__PURE__ */ new Map(), Sr.forEach((e) => {
      this.statsMap.set(e.id, e);
    }), this.loadCountries();
  }
  async loadCountries() {
    try {
      const t = await (await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      )).json(), i = Da(t, t.objects.countries);
      this.countries = i.features, this.loaded = !0, console.log(`Loaded ${this.countries.length} country boundaries`);
    } catch (e) {
      console.error("Failed to load country boundaries:", e);
    }
  }
  /**
   * Wait for country data to load
   */
  async waitForLoad() {
    for (; !this.loaded; )
      await new Promise((e) => setTimeout(e, 100));
  }
  /**
   * Render a choropleth texture for the given statistic
   */
  renderTexture(e) {
    return this.ctx.fillStyle = "#1a3a5c", this.ctx.fillRect(0, 0, Ot, It), this.loaded ? (this.countries.forEach((t) => {
      const i = this.statsMap.get(t.id);
      if (i) {
        const n = e.accessor(i), r = Oa(e, n), s = this.interpolateColor(e.colorScale, r);
        this.ctx.fillStyle = s;
      } else
        this.ctx.fillStyle = "#2a2a2a";
      this.drawCountry(t);
    }), this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)", this.ctx.lineWidth = 0.5, this.countries.forEach((t) => {
      this.strokeCountry(t);
    }), this.canvas) : this.canvas;
  }
  drawCountry(e) {
    const { geometry: t } = e;
    t.type === "Polygon" ? this.drawPolygon(t.coordinates) : t.type === "MultiPolygon" && t.coordinates.forEach((i) => {
      this.drawPolygon(i);
    });
  }
  strokeCountry(e) {
    const { geometry: t } = e;
    t.type === "Polygon" ? this.strokePolygon(t.coordinates) : t.type === "MultiPolygon" && t.coordinates.forEach((i) => {
      this.strokePolygon(i);
    });
  }
  drawPolygon(e) {
    this.ctx.beginPath(), e.forEach((t) => {
      let i = null;
      t.forEach((n, r) => {
        const s = n[0], o = n[1], [l, c] = this.projectPoint(s, o), h = i !== null && Math.abs(s - i) > 180;
        r === 0 ? this.ctx.moveTo(l, c) : h ? this.ctx.moveTo(l, c) : this.ctx.lineTo(l, c), i = s;
      }), this.ctx.closePath();
    }), this.ctx.fill("evenodd");
  }
  strokePolygon(e) {
    e.forEach((t) => {
      this.ctx.beginPath();
      let i = null;
      t.forEach((n, r) => {
        const s = n[0], o = n[1], [l, c] = this.projectPoint(s, o), h = i !== null && Math.abs(s - i) > 180;
        r === 0 ? this.ctx.moveTo(l, c) : h ? (this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(l, c)) : this.ctx.lineTo(l, c), i = s;
      }), this.ctx.stroke();
    });
  }
  /**
   * Project lat/lon to canvas coordinates (equirectangular projection)
   */
  projectPoint(e, t) {
    const i = (e + 180) / 360 * Ot, n = (90 - t) / 180 * It;
    return [i, n];
  }
  interpolateColor(e, t) {
    const i = (h) => ({
      r: parseInt(h.slice(1, 3), 16),
      g: parseInt(h.slice(3, 5), 16),
      b: parseInt(h.slice(5, 7), 16)
    }), [n, r, s] = e.map(i);
    let o, l, c;
    if (t < 0.5) {
      const h = t * 2;
      o = Math.round(n.r + (r.r - n.r) * h), l = Math.round(n.g + (r.g - n.g) * h), c = Math.round(n.b + (r.b - n.b) * h);
    } else {
      const h = (t - 0.5) * 2;
      o = Math.round(r.r + (s.r - r.r) * h), l = Math.round(r.g + (s.g - r.g) * h), c = Math.round(r.b + (s.b - r.b) * h);
    }
    return `rgb(${o}, ${l}, ${c})`;
  }
  /**
   * Render a choropleth texture with custom values
   */
  renderCustomTexture(e, t, i) {
    if (this.ctx.fillStyle = "#1a3a5c", this.ctx.fillRect(0, 0, Ot, It), !this.loaded)
      return this.canvas;
    const n = La(e);
    return this.countries.forEach((r) => {
      const s = n[r.id];
      if (s !== void 0) {
        const o = Math.max(0, Math.min(
          1,
          (s - i[0]) / (i[1] - i[0])
        )), l = this.interpolateColor(t, o);
        this.ctx.fillStyle = l;
      } else
        this.ctx.fillStyle = "#2a2a2a";
      this.drawCountry(r);
    }), this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)", this.ctx.lineWidth = 0.5, this.countries.forEach((r) => {
      this.strokeCountry(r);
    }), this.canvas;
  }
  /**
   * Get canvas for debugging
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * Get data URL of current texture
   */
  getDataURL() {
    return this.canvas.toDataURL("image/png");
  }
}
class Ua extends Nr {
  /**
   * Constructs a new CSS2D object.
   *
   * @param {HTMLElement} [element] - The DOM element.
   */
  constructor(e = document.createElement("div")) {
    super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new de(0.5, 0.5), this.addEventListener("removed", function() {
      this.traverse(function(t) {
        t.element && t.element instanceof t.element.ownerDocument.defaultView.Element && t.element.parentNode !== null && t.element.remove();
      });
    });
  }
  copy(e, t) {
    return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this;
  }
}
const qe = new se(), _n = new Tn(), yn = new Tn(), xn = new se(), bn = new se();
class Fa {
  /**
   * Constructs a new CSS2D renderer.
   *
   * @param {CSS2DRenderer~Parameters} [parameters] - The parameters.
   */
  constructor(e = {}) {
    const t = this;
    let i, n, r, s;
    const o = {
      objects: /* @__PURE__ */ new WeakMap()
    }, l = e.element !== void 0 ? e.element : document.createElement("div");
    l.style.overflow = "hidden", this.domElement = l, this.sortObjects = !0, this.getSize = function() {
      return {
        width: i,
        height: n
      };
    }, this.render = function(f, d) {
      f.matrixWorldAutoUpdate === !0 && f.updateMatrixWorld(), d.parent === null && d.matrixWorldAutoUpdate === !0 && d.updateMatrixWorld(), _n.copy(d.matrixWorldInverse), yn.multiplyMatrices(d.projectionMatrix, _n), h(f, f, d), this.sortObjects && m(f);
    }, this.setSize = function(f, d) {
      i = f, n = d, r = i / 2, s = n / 2, l.style.width = f + "px", l.style.height = d + "px";
    };
    function c(f) {
      f.isCSS2DObject && (f.element.style.display = "none");
      for (let d = 0, g = f.children.length; d < g; d++)
        c(f.children[d]);
    }
    function h(f, d, g) {
      if (f.visible === !1) {
        c(f);
        return;
      }
      if (f.isCSS2DObject) {
        qe.setFromMatrixPosition(f.matrixWorld), qe.applyMatrix4(yn);
        const _ = qe.z >= -1 && qe.z <= 1 && f.layers.test(g.layers) === !0, y = f.element;
        y.style.display = _ === !0 ? "" : "none", _ === !0 && (f.onBeforeRender(t, d, g), y.style.transform = "translate(" + -100 * f.center.x + "%," + -100 * f.center.y + "%)translate(" + (qe.x * r + r) + "px," + (-qe.y * s + s) + "px)", y.parentNode !== l && l.appendChild(y), f.onAfterRender(t, d, g));
        const x = {
          distanceToCameraSquared: u(g, f)
        };
        o.objects.set(f, x);
      }
      for (let _ = 0, y = f.children.length; _ < y; _++)
        h(f.children[_], d, g);
    }
    function u(f, d) {
      return xn.setFromMatrixPosition(f.matrixWorld), bn.setFromMatrixPosition(d.matrixWorld), xn.distanceToSquared(bn);
    }
    function p(f) {
      const d = [];
      return f.traverseVisible(function(g) {
        g.isCSS2DObject && d.push(g);
      }), d;
    }
    function m(f) {
      const d = p(f).sort(function(_, y) {
        if (_.renderOrder !== y.renderOrder)
          return y.renderOrder - _.renderOrder;
        const x = o.objects.get(_).distanceToCameraSquared, v = o.objects.get(y).distanceToCameraSquared;
        return x - v;
      }), g = d.length;
      for (let _ = 0, y = d.length; _ < y; _++)
        d[_].element.style.zIndex = g - _;
    }
  }
}
const za = {
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
}, Na = /* @__PURE__ */ new Set([
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
]), $a = /* @__PURE__ */ new Set([
  "CN",
  "IN",
  "US",
  "BR",
  "RU",
  "AU",
  "CA"
]), Ba = /* @__PURE__ */ new Set(["RU", "CA", "US", "CN", "BR", "AU"]), Ga = /* @__PURE__ */ new Set([
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
]), Va = /* @__PURE__ */ new Set([
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
class Ha {
  labelRenderer;
  labels = [];
  labelGroup;
  currentStyle = "none";
  sphereRadius;
  currentMorph = 0;
  globe = null;
  camera = null;
  constructor(e, t) {
    this.sphereRadius = t, this.labelRenderer = new Fa();
    const i = e.clientWidth || 800, n = e.clientHeight || 600;
    this.labelRenderer.setSize(i, n), this.labelRenderer.domElement.style.position = "absolute", this.labelRenderer.domElement.style.top = "0", this.labelRenderer.domElement.style.left = "0", this.labelRenderer.domElement.style.pointerEvents = "none", this.labelRenderer.domElement.style.zIndex = "5", e.appendChild(this.labelRenderer.domElement), this.labelGroup = new S.Group(), this.injectStyles(), this.createLabels();
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
    `, document.head.appendChild(e);
  }
  getSizeCategory(e) {
    return Ba.has(e) ? "large" : Ga.has(e) ? "medium" : Va.has(e) ? "small" : "tiny";
  }
  createLabels() {
    Sr.forEach((e) => {
      const t = za[e.code];
      if (!t) return;
      const [i, n] = t, r = this.getSizeCategory(e.code), s = document.createElement("div");
      s.className = `country-label hidden size-${r}`, s.textContent = e.name;
      const o = new Ua(s), l = {
        element: s,
        object: o,
        country: e,
        lat: i,
        lon: n,
        sizeCategory: r
      };
      this.labelGroup.add(o), this.labels.push(l), this.updateLabelPosition(o, l, this.currentMorph);
    });
  }
  localPos = new S.Vector3();
  worldPos = new S.Vector3();
  cameraDirection = new S.Vector3();
  labelNormal = new S.Vector3();
  updateLabelPosition(e, t, i) {
    const { lat: n, lon: r, element: s } = t, o = (r + 180) / 360, l = (n + 90) / 180, c = (o - 0.5) * 2 * Math.PI, h = (l - 0.5) * Math.PI, u = this.sphereRadius + 0.3, p = u * Math.cos(h) * Math.sin(c), m = u * Math.sin(h), f = u * Math.cos(h) * Math.cos(c), d = 2 * Math.PI * this.sphereRadius, g = Math.PI * this.sphereRadius, _ = (o - 0.5) * d, y = (l - 0.5) * g, x = 0.3, v = i * i * (3 - 2 * i);
    if (this.localPos.set(
      _ + v * (p - _),
      y + v * (m - y),
      x + v * (f - x)
    ), this.globe)
      if (this.worldPos.copy(this.localPos), this.worldPos.applyMatrix4(this.globe.matrixWorld), e.position.copy(this.worldPos), this.camera && v > 0.5) {
        this.cameraDirection.copy(this.camera.position).normalize(), this.labelNormal.set(p, m, f).normalize(), this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize();
        const b = this.labelNormal.dot(this.cameraDirection);
        s.style.opacity = b > 0.15 ? "" : "0";
      } else
        s.style.opacity = "";
    else
      e.position.copy(this.localPos), s.style.opacity = "";
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
      let n = !1;
      switch (e) {
        case "none":
          n = !1;
          break;
        case "minimal":
          n = $a.has(i);
          break;
        case "major":
          n = Na.has(i);
          break;
        case "all":
        case "capitals":
          n = !0;
          break;
      }
      t.element.classList.toggle("hidden", !n);
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
    const n = [], r = new S.Vector3();
    return this.labels.forEach((s) => {
      const o = s.element.style.opacity, l = o === "" ? 1 : parseFloat(o) || 0;
      if (l < 0.1 || s.element.classList.contains("hidden")) return;
      s.object.getWorldPosition(r), r.project(e);
      const c = (r.x * 0.5 + 0.5) * t, h = (-r.y * 0.5 + 0.5) * i;
      c >= 0 && c <= t && h >= 0 && h <= i && r.z < 1 && n.push({
        text: s.country.name,
        x: c,
        y: h,
        opacity: l
      });
    }), n;
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
var ja = { trailer: 59 };
function Dr(a = 256) {
  let e = 0, t = new Uint8Array(a);
  return { get buffer() {
    return t.buffer;
  }, reset() {
    e = 0;
  }, bytesView() {
    return t.subarray(0, e);
  }, bytes() {
    return t.slice(0, e);
  }, writeByte(n) {
    i(e + 1), t[e] = n, e++;
  }, writeBytes(n, r = 0, s = n.length) {
    i(e + s);
    for (let o = 0; o < s; o++) t[e++] = n[o + r];
  }, writeBytesView(n, r = 0, s = n.byteLength) {
    i(e + s), t.set(n.subarray(r, r + s), e), e += s;
  } };
  function i(n) {
    var r = t.length;
    if (r >= n) return;
    var s = 1024 * 1024;
    n = Math.max(n, r * (r < s ? 2 : 1.125) >>> 0), r != 0 && (n = Math.max(n, 256));
    let o = t;
    t = new Uint8Array(n), e > 0 && t.set(o.subarray(0, e), 0);
  }
}
var si = 12, vn = 5003, Ya = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
function Za(a, e, t, i, n = Dr(512), r = new Uint8Array(256), s = new Int32Array(vn), o = new Int32Array(vn)) {
  let l = s.length, c = Math.max(2, i);
  r.fill(0), o.fill(0), s.fill(-1);
  let h = 0, u = 0, p = c + 1, m = p, f = !1, d = m, g = (1 << d) - 1, _ = 1 << p - 1, y = _ + 1, x = _ + 2, v = 0, b = t[0], P = 0;
  for (let w = l; w < 65536; w *= 2) ++P;
  P = 8 - P, n.writeByte(c), C(_);
  let E = t.length;
  for (let w = 1; w < E; w++)
    e: {
      let T = t[w], M = (T << si) + b, A = T << P ^ b;
      if (s[A] === M) {
        b = o[A];
        break e;
      }
      let R = A === 0 ? 1 : l - A;
      for (; s[A] >= 0; ) if (A -= R, A < 0 && (A += l), s[A] === M) {
        b = o[A];
        break e;
      }
      C(b), b = T, x < 1 << si ? (o[A] = x++, s[A] = M) : (s.fill(-1), x = _ + 2, f = !0, C(_));
    }
  return C(b), C(y), n.writeByte(0), n.bytesView();
  function C(w) {
    for (h &= Ya[u], u > 0 ? h |= w << u : h = w, u += d; u >= 8; ) r[v++] = h & 255, v >= 254 && (n.writeByte(v), n.writeBytesView(r, 0, v), v = 0), h >>= 8, u -= 8;
    if ((x > g || f) && (f ? (d = m, g = (1 << d) - 1, f = !1) : (++d, g = d === si ? 1 << d : (1 << d) - 1)), w == y) {
      for (; u > 0; ) r[v++] = h & 255, v >= 254 && (n.writeByte(v), n.writeBytesView(r, 0, v), v = 0), h >>= 8, u -= 8;
      v > 0 && (n.writeByte(v), n.writeBytesView(r, 0, v), v = 0);
    }
  }
}
var Ka = Za;
function Mr(a, e, t) {
  return a << 8 & 63488 | e << 2 & 992 | t >> 3;
}
function Rr(a, e, t, i) {
  return a >> 4 | e & 240 | (t & 240) << 4 | (i & 240) << 8;
}
function Or(a, e, t) {
  return a >> 4 << 8 | e & 240 | t >> 4;
}
function Lt(a, e, t) {
  return a < e ? e : a > t ? t : a;
}
function zt(a) {
  return a * a;
}
function En(a, e, t) {
  var i = 0, n = 1e100;
  let r = a[e], s = r.cnt;
  r.ac;
  let o = r.rc, l = r.gc, c = r.bc;
  for (var h = r.fw; h != 0; h = a[h].fw) {
    let p = a[h], m = p.cnt, f = s * m / (s + m);
    if (!(f >= n)) {
      var u = 0;
      u += f * zt(p.rc - o), !(u >= n) && (u += f * zt(p.gc - l), !(u >= n) && (u += f * zt(p.bc - c), !(u >= n) && (n = u, i = h)));
    }
  }
  r.err = n, r.nn = i;
}
function ai() {
  return { ac: 0, rc: 0, gc: 0, bc: 0, cnt: 0, nn: 0, fw: 0, bk: 0, tm: 0, mtm: 0, err: 0 };
}
function Xa(a, e) {
  let t = e === "rgb444" ? 4096 : 65536, i = new Array(t), n = a.length;
  if (e === "rgba4444") for (let r = 0; r < n; ++r) {
    let s = a[r], o = s >> 24 & 255, l = s >> 16 & 255, c = s >> 8 & 255, h = s & 255, u = Rr(h, c, l, o), p = u in i ? i[u] : i[u] = ai();
    p.rc += h, p.gc += c, p.bc += l, p.ac += o, p.cnt++;
  }
  else if (e === "rgb444") for (let r = 0; r < n; ++r) {
    let s = a[r], o = s >> 16 & 255, l = s >> 8 & 255, c = s & 255, h = Or(c, l, o), u = h in i ? i[h] : i[h] = ai();
    u.rc += c, u.gc += l, u.bc += o, u.cnt++;
  }
  else for (let r = 0; r < n; ++r) {
    let s = a[r], o = s >> 16 & 255, l = s >> 8 & 255, c = s & 255, h = Mr(c, l, o), u = h in i ? i[h] : i[h] = ai();
    u.rc += c, u.gc += l, u.bc += o, u.cnt++;
  }
  return i;
}
function Wa(a, e, t = {}) {
  let { format: i = "rgb565", clearAlpha: n = !0, clearAlphaColor: r = 0, clearAlphaThreshold: s = 0, oneBitAlpha: o = !1 } = t;
  if (!a || !a.buffer) throw new Error("quantize() expected RGBA Uint8Array data");
  if (!(a instanceof Uint8Array) && !(a instanceof Uint8ClampedArray)) throw new Error("quantize() expected RGBA Uint8Array data");
  let l = new Uint32Array(a.buffer), c = t.useSqrt !== !1, h = i === "rgba4444", u = Xa(l, i), p = u.length, m = p - 1, f = new Uint32Array(p + 1);
  for (var d = 0, g = 0; g < p; ++g) {
    let O = u[g];
    if (O != null) {
      var _ = 1 / O.cnt;
      h && (O.ac *= _), O.rc *= _, O.gc *= _, O.bc *= _, u[d++] = O;
    }
  }
  zt(e) / d < 0.022 && (c = !1);
  for (var g = 0; g < d - 1; ++g) u[g].fw = g + 1, u[g + 1].bk = g, c && (u[g].cnt = Math.sqrt(u[g].cnt));
  c && (u[g].cnt = Math.sqrt(u[g].cnt));
  var y, x, v;
  for (g = 0; g < d; ++g) {
    En(u, g);
    var b = u[g].err;
    for (x = ++f[0]; x > 1 && (v = x >> 1, !(u[y = f[v]].err <= b)); x = v) f[x] = y;
    f[x] = g;
  }
  var P = d - e;
  for (g = 0; g < P; ) {
    for (var E; ; ) {
      var C = f[1];
      if (E = u[C], E.tm >= E.mtm && u[E.nn].mtm <= E.tm) break;
      E.mtm == m ? C = f[1] = f[f[0]--] : (En(u, C), E.tm = g);
      var b = u[C].err;
      for (x = 1; (v = x + x) <= f[0] && (v < f[0] && u[f[v]].err > u[f[v + 1]].err && v++, !(b <= u[y = f[v]].err)); x = v) f[x] = y;
      f[x] = C;
    }
    var w = u[E.nn], T = E.cnt, M = w.cnt, _ = 1 / (T + M);
    h && (E.ac = _ * (T * E.ac + M * w.ac)), E.rc = _ * (T * E.rc + M * w.rc), E.gc = _ * (T * E.gc + M * w.gc), E.bc = _ * (T * E.bc + M * w.bc), E.cnt += w.cnt, E.mtm = ++g, u[w.bk].fw = w.fw, u[w.fw].bk = w.bk, w.mtm = m;
  }
  let A = [];
  var R = 0;
  for (g = 0; ; ++R) {
    let O = Lt(Math.round(u[g].rc), 0, 255), B = Lt(Math.round(u[g].gc), 0, 255), F = Lt(Math.round(u[g].bc), 0, 255), U = 255;
    h && (U = Lt(Math.round(u[g].ac), 0, 255), o && (U = U <= (typeof o == "number" ? o : 127) ? 0 : 255), n && U <= s && (O = B = F = r, U = 0));
    let Q = h ? [O, B, F, U] : [O, B, F];
    if (qa(A, Q) || A.push(Q), (g = u[g].fw) == 0) break;
  }
  return A;
}
function qa(a, e) {
  for (let t = 0; t < a.length; t++) {
    let i = a[t], n = i[0] === e[0] && i[1] === e[1] && i[2] === e[2], r = i.length >= 4 && e.length >= 4 ? i[3] === e[3] : !0;
    if (n && r) return !0;
  }
  return !1;
}
function Qa(a, e, t = "rgb565") {
  if (!a || !a.buffer) throw new Error("quantize() expected RGBA Uint8Array data");
  if (!(a instanceof Uint8Array) && !(a instanceof Uint8ClampedArray)) throw new Error("quantize() expected RGBA Uint8Array data");
  if (e.length > 256) throw new Error("applyPalette() only works with 256 colors or less");
  let i = new Uint32Array(a.buffer), n = i.length, r = t === "rgb444" ? 4096 : 65536, s = new Uint8Array(n), o = new Array(r);
  if (t === "rgba4444") for (let l = 0; l < n; l++) {
    let c = i[l], h = c >> 24 & 255, u = c >> 16 & 255, p = c >> 8 & 255, m = c & 255, f = Rr(m, p, u, h), d = f in o ? o[f] : o[f] = Ja(m, p, u, h, e);
    s[l] = d;
  }
  else {
    let l = t === "rgb444" ? Or : Mr;
    for (let c = 0; c < n; c++) {
      let h = i[c], u = h >> 16 & 255, p = h >> 8 & 255, m = h & 255, f = l(m, p, u), d = f in o ? o[f] : o[f] = eo(m, p, u, e);
      s[c] = d;
    }
  }
  return s;
}
function Ja(a, e, t, i, n) {
  let r = 0, s = 1e100;
  for (let o = 0; o < n.length; o++) {
    let l = n[o], c = l[3], h = Ve(c - i);
    if (h > s) continue;
    let u = l[0];
    if (h += Ve(u - a), h > s) continue;
    let p = l[1];
    if (h += Ve(p - e), h > s) continue;
    let m = l[2];
    h += Ve(m - t), !(h > s) && (s = h, r = o);
  }
  return r;
}
function eo(a, e, t, i) {
  let n = 0, r = 1e100;
  for (let s = 0; s < i.length; s++) {
    let o = i[s], l = o[0], c = Ve(l - a);
    if (c > r) continue;
    let h = o[1];
    if (c += Ve(h - e), c > r) continue;
    let u = o[2];
    c += Ve(u - t), !(c > r) && (r = c, n = s);
  }
  return n;
}
function Ve(a) {
  return a * a;
}
function to(a = {}) {
  let { initialCapacity: e = 4096, auto: t = !0 } = a, i = Dr(e), n = 5003, r = new Uint8Array(256), s = new Int32Array(n), o = new Int32Array(n), l = !1;
  return { reset() {
    i.reset(), l = !1;
  }, finish() {
    i.writeByte(ja.trailer);
  }, bytes() {
    return i.bytes();
  }, bytesView() {
    return i.bytesView();
  }, get buffer() {
    return i.buffer;
  }, get stream() {
    return i;
  }, writeHeader: c, writeFrame(h, u, p, m = {}) {
    let { transparent: f = !1, transparentIndex: d = 0, delay: g = 0, palette: _ = null, repeat: y = 0, colorDepth: x = 8, dispose: v = -1 } = m, b = !1;
    if (t ? l || (b = !0, c(), l = !0) : b = !!m.first, u = Math.max(0, Math.floor(u)), p = Math.max(0, Math.floor(p)), b) {
      if (!_) throw new Error("First frame must include a { palette } option");
      no(i, u, p, _, x), wn(i, _), y >= 0 && ro(i, y);
    }
    let P = Math.round(g / 10);
    io(i, v, P, f, d);
    let E = !!_ && !b;
    so(i, u, p, E ? _ : null), E && wn(i, _), ao(i, h, u, p, x, r, s, o);
  } };
  function c() {
    Ir(i, "GIF89a");
  }
}
function io(a, e, t, i, n) {
  a.writeByte(33), a.writeByte(249), a.writeByte(4), n < 0 && (n = 0, i = !1);
  var r, s;
  i ? (r = 1, s = 2) : (r = 0, s = 0), e >= 0 && (s = e & 7), s <<= 2, a.writeByte(0 | s | 0 | r), Me(a, t), a.writeByte(n || 0), a.writeByte(0);
}
function no(a, e, t, i, n = 8) {
  let r = 1, s = 0, o = Hi(i.length) - 1, l = r << 7 | n - 1 << 4 | s << 3 | o;
  Me(a, e), Me(a, t), a.writeBytes([l, 0, 0]);
}
function ro(a, e) {
  a.writeByte(33), a.writeByte(255), a.writeByte(11), Ir(a, "NETSCAPE2.0"), a.writeByte(3), a.writeByte(1), Me(a, e), a.writeByte(0);
}
function wn(a, e) {
  let t = 1 << Hi(e.length);
  for (let i = 0; i < t; i++) {
    let n = [0, 0, 0];
    i < e.length && (n = e[i]), a.writeByte(n[0]), a.writeByte(n[1]), a.writeByte(n[2]);
  }
}
function so(a, e, t, i) {
  if (a.writeByte(44), Me(a, 0), Me(a, 0), Me(a, e), Me(a, t), i) {
    let n = 0, r = 0, s = Hi(i.length) - 1;
    a.writeByte(128 | n | r | 0 | s);
  } else a.writeByte(0);
}
function ao(a, e, t, i, n = 8, r, s, o) {
  Ka(t, i, e, n, a, r, s, o);
}
function Me(a, e) {
  a.writeByte(e & 255), a.writeByte(e >> 8 & 255);
}
function Ir(a, e) {
  for (var t = 0; t < e.length; t++) a.writeByte(e.charCodeAt(t));
}
function Hi(a) {
  return Math.max(Math.ceil(Math.log2(a)), 1);
}
class oo {
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
  drawCountryLabelsOnCanvas(e, t, i, n) {
    if (this.countryLabels)
      try {
        this.countryLabels.getVisibleLabelsForCanvas(n || this.camera, t, i).forEach((s) => {
          e.save(), e.globalAlpha = s.opacity, e.font = "bold 12px Arial, sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.strokeStyle = "rgba(0, 0, 0, 0.8)", e.lineWidth = 3, e.strokeText(s.text, s.x, s.y), e.fillStyle = "#ffffff", e.fillText(s.text, s.x, s.y), e.restore();
        });
      } catch (r) {
        console.warn("Failed to draw country labels:", r);
      }
  }
  /**
   * Draw all overlays (legend + country labels) onto canvas
   * @param camera - Optional camera to use for label projection (defaults to main camera)
   */
  drawOverlaysOnCanvas(e, t, i, n) {
    this.drawCountryLabelsOnCanvas(e, t, i, n), this.drawLegendOnCanvas(e, t, i);
  }
  /**
   * Draw legend onto canvas at specified position
   */
  drawLegendOnCanvas(e, t, i) {
    try {
      if (!this.legendElement || !this.legendElement.classList.contains("visible")) return;
      const n = this.legendElement, r = n.querySelector(".gralobe-legend-title") || n.querySelector(".legend-title"), s = n.querySelector(".gralobe-legend-gradient") || n.querySelector(".legend-gradient"), o = n.querySelector(".gralobe-legend-min") || n.querySelector(".legend-min"), l = n.querySelector(".gralobe-legend-max") || n.querySelector(".legend-max"), c = n.querySelector(".gralobe-legend-description") || n.querySelector(".legend-description");
      if (!r || !s) return;
      const h = 280, u = 100, p = 20, m = t - h - p, f = i - u - p, d = 12;
      e.fillStyle = "rgba(0, 10, 20, 0.9)", e.strokeStyle = "rgba(100, 170, 255, 0.5)", e.lineWidth = 2, e.beginPath(), e.roundRect ? e.roundRect(m, f, h, u, d) : e.rect(m, f, h, u), e.fill(), e.stroke(), e.fillStyle = "#44aaff", e.font = "bold 18px Arial, sans-serif", e.fillText(r.textContent || "", m + 16, f + 28);
      const g = m + 16, _ = f + 40, y = h - 32, x = 20, v = s.style.background || "";
      let b = [];
      const P = v.match(/rgba?\([^)]+\)/g);
      if (P && P.length >= 2)
        b = P;
      else {
        const E = v.match(/#[0-9a-fA-F]{3,8}/g);
        E && E.length >= 2 && (b = E);
      }
      if (b.length >= 2) {
        const E = e.createLinearGradient(g, 0, g + y, 0);
        E.addColorStop(0, b[0]), b.length >= 3 ? (E.addColorStop(0.5, b[1]), E.addColorStop(1, b[2])) : E.addColorStop(1, b[1]), e.fillStyle = E, e.beginPath(), e.roundRect ? e.roundRect(g, _, y, x, 4) : e.rect(g, _, y, x), e.fill();
      } else {
        const E = e.createLinearGradient(g, 0, g + y, 0);
        E.addColorStop(0, "#cc6600"), E.addColorStop(0.5, "#ffaa44"), E.addColorStop(1, "#ffeecc"), e.fillStyle = E, e.beginPath(), e.roundRect ? e.roundRect(g, _, y, x, 4) : e.rect(g, _, y, x), e.fill(), console.log("Legend gradient style:", v);
      }
      if (e.fillStyle = "#cccccc", e.font = "14px Arial, sans-serif", o && e.fillText(o.textContent || "", g, f + 78), l) {
        const E = l.textContent || "", C = e.measureText(E).width;
        e.fillText(E, g + y - C, f + 78);
      }
      c && c.textContent && (e.fillStyle = "#888888", e.font = "italic 12px Arial, sans-serif", e.fillText(c.textContent, g, f + 95));
    } catch (n) {
      console.warn("Failed to draw legend on canvas:", n);
    }
  }
  /**
   * Capture a single screenshot (includes legend if visible)
   * Uses an offscreen renderer to avoid disturbing the main display
   */
  screenshot(e = {}) {
    const { width: t = 1920, height: i = 1080, filename: n } = e, r = new S.WebGLRenderer({
      antialias: !0,
      preserveDrawingBuffer: !0
    });
    r.setSize(t, i), r.setPixelRatio(1);
    const s = this.camera.clone();
    s.aspect = t / i, s.updateProjectionMatrix(), r.render(this.scene, s), this.compositeCanvas.width = t, this.compositeCanvas.height = i, this.compositeCtx.drawImage(r.domElement, 0, 0), this.drawOverlaysOnCanvas(this.compositeCtx, t, i, s);
    const o = this.compositeCanvas.toDataURL("image/png");
    r.dispose();
    const l = n ? `${n}.png` : `globe-${Date.now()}.png`;
    this.downloadFile(o, l);
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
      const n = this.compositeCanvas.captureStream(60), r = [
        { mime: "video/mp4;codecs=avc1", ext: "mp4" },
        { mime: "video/mp4", ext: "mp4" },
        { mime: "video/webm;codecs=h264", ext: "webm" },
        { mime: "video/webm;codecs=vp9", ext: "webm" },
        { mime: "video/webm;codecs=vp8", ext: "webm" },
        { mime: "video/webm", ext: "webm" }
      ];
      let s = "video/webm", o = "webm";
      for (const { mime: c, ext: h } of r)
        if (MediaRecorder.isTypeSupported(c)) {
          s = c, o = h, console.log(`Video recording using: ${c}`);
          break;
        }
      this.mediaRecorder = new MediaRecorder(n, {
        mimeType: s,
        videoBitsPerSecond: 8e6
      }), this.recordedChunks = [];
      const l = o;
      this.mediaRecorder.ondataavailable = (c) => {
        c.data.size > 0 && this.recordedChunks.push(c.data);
      }, this.mediaRecorder.onstop = () => {
        const c = s.split(";")[0], h = new Blob(this.recordedChunks, { type: c }), u = URL.createObjectURL(h);
        this.downloadFile(u, `globe-${Date.now()}.${l}`), URL.revokeObjectURL(u);
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
    const n = this.captureCtx.getImageData(0, 0, t, i);
    this.frames.push({
      data: new Uint8ClampedArray(n.data),
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
    const { fps: t = 20, filename: i } = e, n = Math.round(1e3 / t);
    console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);
    try {
      const r = this.frames[0], s = r.width, o = r.height, l = Wa(r.data, 256), c = to();
      for (let f = 0; f < this.frames.length; f++) {
        const d = this.frames[f], g = Qa(d.data, l);
        c.writeFrame(g, s, o, {
          palette: f === 0 ? l : void 0,
          // Only first frame needs palette
          delay: n,
          repeat: f === 0 ? 0 : void 0
          // 0 = loop forever
        }), f % 10 === 0 && await new Promise((_) => setTimeout(_, 0));
      }
      c.finish();
      const h = c.bytes(), u = new Blob([h], { type: "image/gif" }), p = URL.createObjectURL(u), m = i || `globe-${Date.now()}.gif`;
      this.downloadFile(p, m), setTimeout(() => URL.revokeObjectURL(p), 1e3), console.log(`GIF saved: ${m} (${this.frames.length} frames, ${(u.size / 1024).toFixed(1)}KB)`);
    } catch (r) {
      console.error("Failed to generate GIF:", r);
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
function Lr(a) {
  return a === "%" ? (e) => `${e.toFixed(1)}%` : a === "$" ? (e) => `$${e.toLocaleString()}` : a === "years" ? (e) => `${e.toFixed(1)} yrs` : a.includes("per capita") || a.includes("per 100") || a.includes("per 1000") ? (e) => `${e.toFixed(1)}` : a === "% GDP" || a === "% of GDP" ? (e) => `${e.toFixed(1)}%` : a === "" || a === "index" ? (e) => e.toFixed(3) : (e) => {
    const t = Number.isInteger(e) ? e.toLocaleString() : e.toFixed(1);
    return a ? `${t} ${a}` : t;
  };
}
function yo(a, e, t) {
  return (t ?? Lr(e))(a);
}
let Pn = !1;
function lo() {
  if (Pn) return;
  Pn = !0;
  const a = document.createElement("style");
  a.setAttribute("data-gralobe-legend", "true"), a.textContent = `
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
  `, document.head.appendChild(a);
}
class ho {
  element;
  parentContainer;
  visible = !1;
  resizeObserver = null;
  constructor(e) {
    lo(), this.parentContainer = e, getComputedStyle(e).position === "static" && (e.style.position = "relative"), this.element = document.createElement("div"), this.element.className = "gralobe-legend", this.element.setAttribute("data-testid", "globe-legend"), this.element.innerHTML = `
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
    const t = this.element.querySelector(".gralobe-legend-title"), i = this.element.querySelector(".gralobe-legend-gradient"), n = this.element.querySelector(".gralobe-legend-min"), r = this.element.querySelector(".gralobe-legend-max"), s = this.element.querySelector(".gralobe-legend-description");
    t.textContent = e.name, s.textContent = e.description;
    const [o, l, c] = e.colorScale;
    i.style.background = `linear-gradient(to right, ${o}, ${l}, ${c})`;
    const h = e.format ?? Lr(e.unit);
    n.textContent = h(e.domain[0]), r.textContent = h(e.domain[1]), this.element.classList.add("visible"), this.visible = !0;
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
const Be = 50, co = `
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
const float RADIUS = ${Be.toFixed(1)};

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
`, uo = `
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
`, po = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

const float PI = 3.14159265359;
const float RADIUS = ${Be.toFixed(1)};

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
`, fo = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    intensity *= uMorph;

    vec3 innerColor = vec3(0.3, 0.6, 1.0);
    vec3 outerColor = vec3(0.1, 0.2, 0.5);
    vec3 color = mix(innerColor, outerColor, intensity);

    gl_FragColor = vec4(color, intensity * 0.6);
}
`, mo = `
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
`, go = `
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9);
}
`, wi = {
  lifeExpectancy: {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Average life expectancy at birth",
    colorScale: ["#feedde", "#fdbe85", "#d94701"],
    domain: [55, 85],
    format: (a) => `${a.toFixed(1)} years`
  },
  humanDevIndex: {
    id: "humanDevIndex",
    name: "Human Development Index",
    unit: "",
    description: "UN composite index of life expectancy, education, and income",
    colorScale: ["#fee5d9", "#fcae91", "#cb181d"],
    domain: [0.4, 1],
    format: (a) => a.toFixed(3)
  },
  gdpPerCapita: {
    id: "gdpPerCapita",
    name: "GDP per Capita (PPP)",
    unit: "$",
    description: "Purchasing power parity adjusted GDP per person",
    colorScale: ["#edf8e9", "#74c476", "#006d2c"],
    domain: [1e3, 8e4],
    format: (a) => `$${(a / 1e3).toFixed(1)}k`
  },
  co2Emissions: {
    id: "co2Emissions",
    name: "CO₂ Emissions",
    unit: "t/capita",
    description: "Carbon dioxide emissions per capita",
    colorScale: ["#f7fbff", "#6baed6", "#08306b"],
    domain: [0, 20],
    format: (a) => `${a.toFixed(1)}t`
  },
  renewableEnergy: {
    id: "renewableEnergy",
    name: "Renewable Energy",
    unit: "%",
    description: "Share of renewable energy in total energy consumption",
    colorScale: ["#f7fcf5", "#74c476", "#00441b"],
    domain: [0, 100],
    format: (a) => `${a.toFixed(0)}%`
  },
  internetUsers: {
    id: "internetUsers",
    name: "Internet Penetration",
    unit: "%",
    description: "Percentage of population using the internet",
    colorScale: ["#f2f0f7", "#9e9ac8", "#54278f"],
    domain: [0, 100],
    format: (a) => `${a.toFixed(0)}%`
  },
  urbanPopulation: {
    id: "urbanPopulation",
    name: "Urbanization",
    unit: "%",
    description: "Percentage of population living in urban areas",
    colorScale: ["#fff5eb", "#fd8d3c", "#7f2704"],
    domain: [15, 100],
    format: (a) => `${a.toFixed(0)}%`
  },
  healthExpenditure: {
    id: "healthExpenditure",
    name: "Health Spending",
    unit: "% GDP",
    description: "Total health expenditure as percentage of GDP",
    colorScale: ["#fff5f0", "#fb6a4a", "#99000d"],
    domain: [2, 18],
    format: (a) => `${a.toFixed(1)}%`
  },
  forestArea: {
    id: "forestArea",
    name: "Forest Coverage",
    unit: "%",
    description: "Forest area as percentage of total land area",
    colorScale: ["#f7fcf5", "#41ab5d", "#00441b"],
    domain: [0, 75],
    format: (a) => `${a.toFixed(0)}%`
  },
  population: {
    id: "population",
    name: "Population",
    unit: "millions",
    description: "Total population",
    colorScale: ["#fff7bc", "#fec44f", "#d95f0e"],
    domain: [1, 1500],
    format: (a) => `${a.toFixed(0)}M`
  },
  accessElectricity: {
    id: "accessElectricity",
    name: "Electricity Access",
    unit: "%",
    description: "Percentage of population with access to electricity",
    colorScale: ["#ffeda0", "#feb24c", "#f03b20"],
    domain: [20, 100],
    format: (a) => `${a.toFixed(0)}%`
  },
  educationExpenditure: {
    id: "educationExpenditure",
    name: "Education Spending",
    unit: "% GDP",
    description: "Government expenditure on education as percentage of GDP",
    colorScale: ["#edf8fb", "#7bccc4", "#0868ac"],
    domain: [1, 10],
    format: (a) => `${a.toFixed(1)}%`
  }
};
wi.lifeExpectancy;
const Cn = {
  satellite: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  natural: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",
  dark: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  light: "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
  night: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  topographic: "https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"
}, An = {
  texture: "satellite",
  labels: "all",
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
  extrudeHeight: !1
};
class xo {
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
  textureLoader = new S.TextureLoader();
  dataTexture = null;
  // State
  morph = 0;
  currentStatistic = null;
  animationId = null;
  isDestroyed = !1;
  /** Promise that resolves when fully initialized */
  ready;
  resolveReady;
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
      ...An,
      ...t,
      effects: { ...An.effects, ...t.effects }
    }, this.ready = new Promise((i) => {
      this.resolveReady = i;
    }), this.init();
  }
  async init() {
    const e = this.config.width || this.container.clientWidth || 800, t = this.config.height || this.container.clientHeight || 600;
    this.scene = new S.Scene(), this.scene.background = new S.Color(2066), this.camera = new S.PerspectiveCamera(50, e / t, 1, 1e3), this.camera.position.set(0, 0, this.config.initialView === "flat" ? 350 : 150), this.renderer = new S.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(e, t), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.container.appendChild(this.renderer.domElement), this.controls = new pa(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.minDistance = 80, this.controls.maxDistance = 400, this.choropleth = new ka(), this.config.showLegend && (this.legend = new ho(this.container)), await this.createGlobe(), this.createStars(), this.config.effects.atmosphere && this.createAtmosphere(), this.countryLabels = new Ha(this.container, Be), this.scene.add(this.countryLabels.getGroup()), this.globe && this.countryLabels.setGlobe(this.globe), this.countryLabels.setCamera(this.camera), this.countryLabels.setStyle(this.config.labels), this.exporter = new oo(this.renderer, this.scene, this.camera), this.legend && this.exporter.setLegendElement(this.legend.getElement()), this.countryLabels && this.exporter.setCountryLabels(this.countryLabels), this.config.showControls && this.createGUI(), await this.choropleth.waitForLoad(), this.setStatistic(this.config.statistic), this.morph = this.config.initialView === "globe" ? 1 : 0, this.material && (this.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), window.addEventListener("resize", this.handleResize), document.addEventListener("fullscreenchange", this.handleFullscreenChange), this.renderer.domElement.tabIndex = 0, this.renderer.domElement.style.outline = "none", this.renderer.domElement.addEventListener("mousedown", () => {
      this.renderer.domElement.focus();
    }), this.renderer.domElement.addEventListener("keydown", this.handleKeydown), this.animate(), this.resolveReady();
  }
  // ... (existing code)
  handleKeydown = (e) => {
    this.isDestroyed || document.activeElement === this.renderer.domElement && ((e.key === "g" || e.key === "G") && (this.morph > 0.5 ? this.toFlat() : this.toGlobe()), (e.key === "f" || e.key === "F") && this.toggleFullscreen());
  };
  async createGlobe() {
    const e = await this.textureLoader.loadAsync(
      Cn[this.config.texture]
    );
    e.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), e.minFilter = S.LinearMipmapLinearFilter, e.magFilter = S.LinearFilter;
    const t = document.createElement("canvas");
    t.width = 2048, t.height = 1024, this.dataTexture = new S.CanvasTexture(t);
    const i = new S.PlaneGeometry(
      Math.PI * 2 * Be,
      Math.PI * Be,
      256,
      128
    );
    this.material = new S.ShaderMaterial({
      vertexShader: co,
      fragmentShader: uo,
      uniforms: {
        // Core uniforms
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uParchment: { value: 0 },
        uExtremeParchment: { value: 0 },
        uTransitionEffect: { value: 0 },
        uTexture: { value: e },
        uDataTexture: { value: this.dataTexture },
        uCloudTexture: { value: null },
        uNightTexture: { value: null },
        uDataOpacity: { value: 0 },
        uDataOverlay: { value: 0 },
        uExtrudeHeight: { value: this.config.extrudeHeight ? 1 : 0 },
        uSunDir: { value: new S.Vector3(1, 0.5, 1).normalize() },
        // Effect uniforms
        uClouds: { value: this.config.effects.clouds ? 1 : 0 },
        uCloudSpeed: { value: this.config.effects.cloudSpeed || 1 },
        uCloudOpacity: { value: this.config.effects.cloudOpacity || 0.6 },
        uAtmosphereIntensity: { value: this.config.effects.atmosphereIntensity || 0 },
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
        uHologramColor: { value: new S.Color(65535) },
        uVintage: { value: this.config.effects.vintageMode ? 1 : 0 },
        uThermal: { value: this.config.effects.thermalMode ? 1 : 0 },
        uBlueprint: { value: this.config.effects.blueprintMode ? 1 : 0 },
        uGlowPulse: { value: this.config.effects.glowPulse ? 1 : 0 },
        uGlowColor: { value: new S.Color(4491519) }
      },
      side: S.DoubleSide
    }), this.globe = new S.Mesh(i, this.material), this.scene.add(this.globe);
  }
  createAtmosphere() {
    const e = new S.PlaneGeometry(
      Math.PI * 2 * Be * 1.15,
      Math.PI * Be * 1.15,
      128,
      64
    ), t = new S.ShaderMaterial({
      vertexShader: po,
      fragmentShader: fo,
      uniforms: {
        uMorph: { value: 0 }
      },
      side: S.BackSide,
      transparent: !0,
      blending: S.AdditiveBlending,
      depthWrite: !1
    });
    this.atmosphere = new S.Mesh(e, t), this.scene.add(this.atmosphere);
  }
  createStars() {
    const t = new S.BufferGeometry(), i = new Float32Array(3e3 * 3), n = new Float32Array(3e3), r = new Float32Array(3e3);
    for (let o = 0; o < 3e3; o++) {
      const l = 300 + Math.random() * 300, c = Math.random() * Math.PI * 2, h = Math.acos(2 * Math.random() - 1);
      i[o * 3] = l * Math.sin(h) * Math.cos(c), i[o * 3 + 1] = l * Math.sin(h) * Math.sin(c), i[o * 3 + 2] = l * Math.cos(h), n[o] = 0.5 + Math.random() * 1.5, r[o] = Math.random() * Math.PI * 2;
    }
    t.setAttribute("position", new S.BufferAttribute(i, 3)), t.setAttribute("aSize", new S.BufferAttribute(n, 1)), t.setAttribute("aPhase", new S.BufferAttribute(r, 1));
    const s = new S.ShaderMaterial({
      vertexShader: mo,
      fragmentShader: go,
      uniforms: {
        uTime: { value: 0 },
        uTwinkle: { value: this.config.effects.starTwinkle ? 1 : 0 }
      },
      transparent: !0,
      blending: S.AdditiveBlending,
      depthWrite: !1
    });
    this.stars = new S.Points(t, s), this.scene.add(this.stars);
  }
  createGUI() {
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.gui = new Gi({
      container: this.container,
      title: "⚙ Controls",
      width: 220,
      closeFolders: !0
    });
    const t = this.gui.domElement;
    t.style.position = "absolute", t.style.top = "8px", t.style.right = "8px", t.style.zIndex = "100", this.gui.close();
    const i = this.gui.addFolder("View");
    i.add({ toGlobe: () => this.toGlobe() }, "toGlobe").name("→ Globe"), i.add({ toFlat: () => this.toFlat() }, "toFlat").name("→ Flat"), i.add({ morph: this.morph }, "morph", 0, 1).name("Morph").onChange((l) => this.setMorph(l));
    const n = this.gui.addFolder("Statistics"), r = Object.keys(wi);
    n.add({ stat: this.config.statistic }, "stat", r).name("Statistic").onChange((l) => this.setStatistic(l));
    const s = ["none", "minimal", "major", "all"];
    this.gui.addFolder("Display").add({ labels: this.config.labels }, "labels", s).name("Labels").onChange((l) => this.setLabels(l)), this.gui.add(this.config, "autoRotate").name("Auto Rotate"), this.gui.addFolder("Export").add({ screenshot: () => this.screenshot({ width: 1920, height: 1080 }) }, "screenshot").name("📷 Screenshot");
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
    this.material && (this.material.uniforms.uTime.value = e), this.stars && (this.stars.material.uniforms.uTime.value = e), this.controls.update(), this.config.autoRotate && this.globe && (this.globe.rotation.y += 2e-3 * this.morph), this.countryLabels?.update(), this.renderer.render(this.scene, this.camera), this.countryLabels?.render(this.scene, this.camera);
  };
  // Public API Implementation
  toGlobe() {
    _t.to(this, {
      morph: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), this.config.onViewChange?.("globe", this.morph);
      }
    }), _t.to(this.camera.position, {
      z: 150,
      duration: 2.5,
      ease: "power2.inOut"
    });
  }
  toFlat() {
    _t.to(this, {
      morph: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph), this.config.onViewChange?.("flat", this.morph);
      }
    }), _t.to(this.camera.position, {
      z: 350,
      duration: 2.5,
      ease: "power2.inOut"
    });
  }
  setMorph(e) {
    this.morph = Math.max(0, Math.min(1, e)), this.material && (this.material.uniforms.uMorph.value = this.morph), this.atmosphere && (this.atmosphere.material.uniforms.uMorph.value = this.morph), this.countryLabels?.setMorph(this.morph);
  }
  getMorph() {
    return this.morph;
  }
  setStatistic(e) {
    if (typeof e == "string") {
      if (!wi[e]) {
        console.warn(`Unknown statistic: ${e}`);
        return;
      }
      this.currentStatistic = e;
      const i = Ra.find((n) => n.id === e);
      if (i && this.choropleth) {
        const n = this.choropleth.renderTexture(i);
        if (this.material && n) {
          const r = new S.CanvasTexture(n);
          r.needsUpdate = !0, this.material.uniforms.uDataTexture.value = r, this.material.uniforms.uDataOverlay.value = 1, this.material.uniforms.uDataOpacity.value = 0.7;
        }
      }
      this.legend && i && this.legend.show(i);
    } else {
      const t = e;
      if (this.currentStatistic = t.definition.id, this.choropleth) {
        const i = this.choropleth.renderCustomTexture(
          t.values,
          t.definition.colorScale,
          t.definition.domain
        );
        if (this.material && i) {
          const n = new S.CanvasTexture(i);
          n.needsUpdate = !0, this.material.uniforms.uDataTexture.value = n, this.material.uniforms.uDataOverlay.value = 1, this.material.uniforms.uDataOpacity.value = 0.7;
        }
      }
      this.legend && this.legend.show(t.definition);
    }
  }
  setLabels(e) {
    this.countryLabels?.setStyle(e);
  }
  async setTexture(e) {
    const t = Cn[e];
    if (!(!t || !this.material))
      try {
        const i = await this.textureLoader.loadAsync(t);
        i.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), i.minFilter = S.LinearMipmapLinearFilter, i.magFilter = S.LinearFilter, this.material.uniforms.uTexture.value = i;
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
    const t = e?.duration || 5, i = e?.fps || 20, n = t * i;
    this.exporter.startGifCapture(e);
    for (let r = 0; r < n; r++)
      this.exporter.captureGifFrame(), await new Promise((s) => setTimeout(s, 1e3 / i));
    await this.exporter.stopGifCapture(e);
  }
  async recordVideo(e) {
    if (!this.exporter) return;
    const t = e?.duration || 5;
    await this.exporter.startVideoRecording(e), await new Promise((i) => setTimeout(i, t * 1e3)), this.exporter.stopVideoRecording();
  }
  setEffects(e) {
    Object.assign(this.config.effects, e), this.material && (e.atmosphere !== void 0 && (e.atmosphere && !this.atmosphere ? this.createAtmosphere() : !e.atmosphere && this.atmosphere && (this.scene.remove(this.atmosphere), this.atmosphere.geometry.dispose(), this.atmosphere.material.dispose(), this.atmosphere = null)), e.clouds !== void 0 && (this.material.uniforms.uClouds.value = e.clouds ? 1 : 0), e.cloudSpeed !== void 0 && (this.material.uniforms.uCloudSpeed.value = e.cloudSpeed), e.cloudOpacity !== void 0 && (this.material.uniforms.uCloudOpacity.value = e.cloudOpacity), e.atmosphereIntensity !== void 0 && (this.material.uniforms.uAtmosphereIntensity.value = e.atmosphereIntensity), e.gridLines !== void 0 && (this.material.uniforms.uGridLines.value = e.gridLines ? 1 : 0), e.gridOpacity !== void 0 && (this.material.uniforms.uGridOpacity.value = e.gridOpacity), e.glowPulse !== void 0 && (this.material.uniforms.uGlowPulse.value = e.glowPulse ? 1 : 0), e.starTwinkle !== void 0 && this.stars && (this.stars.material.uniforms.uTwinkle.value = e.starTwinkle ? 1 : 0));
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
  destroy() {
    this.isDestroyed = !0, this.animationId && cancelAnimationFrame(this.animationId), window.removeEventListener("resize", this.handleResize), window.removeEventListener("keydown", this.handleKeydown), document.removeEventListener("fullscreenchange", this.handleFullscreenChange), this.gui?.destroy(), this.legend?.dispose(), this.countryLabels?.dispose(), this.globe?.geometry.dispose(), this.globe?.material?.dispose(), this.atmosphere?.geometry.dispose(), this.atmosphere?.material?.dispose(), this.stars?.geometry.dispose(), this.stars?.material?.dispose(), this.renderer.dispose(), this.container.removeChild(this.renderer.domElement);
  }
}
export {
  wi as BUILT_IN_STATISTICS,
  xo as GlobeViz,
  Sr as WORLD_STATISTICS,
  Lr as createFormatter,
  yo as formatValue,
  La as normalizeCountryValues,
  gn as toNumericCode
};
//# sourceMappingURL=gralobe.js.map
