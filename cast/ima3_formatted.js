// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    var h, aa = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    , ba;
    if ("function" == typeof Object.setPrototypeOf)
        ba = Object.setPrototypeOf;
    else {
        var ca;
        a: {
            var da = {
                Md: !0
            }
              , ea = {};
            try {
                ea.__proto__ = da;
                ca = ea.Md;
                break a
            } catch (a) {}
            ca = !1
        }
        ba = ca ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var fa = ba
      , ha = function(a, b) {
        a.prototype = aa(b.prototype);
        a.prototype.constructor = a;
        if (fa)
            fa(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.da = b.prototype
    }
      , ia = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
      , ka = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this
      , la = function() {
        la = function() {}
        ;
        ka.Symbol || (ka.Symbol = ma)
    }
      , ma = function() {
        var a = 0;
        return function(b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }()
      , oa = function() {
        la();
        var a = ka.Symbol.iterator;
        a || (a = ka.Symbol.iterator = ka.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && ia(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return na(this)
            }
        });
        oa = function() {}
    }
      , na = function(a) {
        var b = 0;
        return pa(function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        })
    }
      , pa = function(a) {
        oa();
        a = {
            next: a
        };
        a[ka.Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
      , ra = function(a) {
        oa();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : na(a)
    }
      , sa = function(a) {
        if (!(a instanceof Array)) {
            a = ra(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }
      , ta = function(a, b) {
        if (b) {
            var c = ka;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ia(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
    ta("Array.prototype.find", function(a) {
        return a ? a : function(a, c) {
            a: {
                var b = this;
                b instanceof String && (b = String(b));
                for (var e = b.length, f = 0; f < e; f++) {
                    var g = b[f];
                    if (a.call(c, g, f, b)) {
                        a = g;
                        break a
                    }
                }
                a = void 0
            }
            return a
        }
    });
    var ua = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
      , va = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    ua(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    ta("Object.assign", function(a) {
        return a || va
    });
    ta("Math.trunc", function(a) {
        return a ? a : function(a) {
            a = Number(a);
            if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a)
                return a;
            var b = Math.floor(Math.abs(a));
            return 0 > a ? -b : b
        }
    });
    ta("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, d) {
            var b = this.length || 0;
            0 > c && (c = Math.max(0, b + c));
            if (null == d || d > b)
                d = b;
            d = Number(d);
            0 > d && (d = Math.max(0, b + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = a;
            return this
        }
    });
    ta("WeakMap", function(a) {
        function b(a) {
            ua(a, d) || ia(a, d, {
                value: {}
            })
        }
        function c(a) {
            var c = Object[a];
            c && (Object[a] = function(a) {
                b(a);
                return c(a)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var b = Object.seal({})
                  , c = Object.seal({})
                  , d = new a([[b, 2], [c, 3]]);
                if (2 != d.get(b) || 3 != d.get(c))
                    return !1;
                d["delete"](b);
                d.set(c, 4);
                return !d.has(b) && 4 == d.get(c)
            } catch (l) {
                return !1
            }
        }())
            return a;
        var d = "$jscomp_hidden_" + Math.random();
        c("freeze");
        c("preventExtensions");
        c("seal");
        var e = 0
          , f = function(a) {
            this.g = (e += Math.random() + 1).toString();
            if (a) {
                la();
                oa();
                a = ra(a);
                for (var b; !(b = a.next()).done; )
                    b = b.value,
                    this.set(b[0], b[1])
            }
        };
        f.prototype.set = function(a, c) {
            b(a);
            if (!ua(a, d))
                throw Error("WeakMap key fail: " + a);
            a[d][this.g] = c;
            return this
        }
        ;
        f.prototype.get = function(a) {
            return ua(a, d) ? a[d][this.g] : void 0
        }
        ;
        f.prototype.has = function(a) {
            return ua(a, d) && ua(a[d], this.g)
        }
        ;
        f.prototype["delete"] = function(a) {
            return ua(a, d) && ua(a[d], this.g) ? delete a[d][this.g] : !1
        }
        ;
        return f
    });
    ta("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var b = Object.seal({
                    x: 4
                })
                  , c = new a(ra([[b, "s"]]));
                if ("s" != c.get(b) || 1 != c.size || c.get({
                    x: 4
                }) || c.set({
                    x: 4
                }, "t") != c || 2 != c.size)
                    return !1;
                var d = c.entries()
                  , e = d.next();
                if (e.done || e.value[0] != b || "s" != e.value[1])
                    return !1;
                e = d.next();
                return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0
            } catch (E) {
                return !1
            }
        }())
            return a;
        la();
        oa();
        var b = new WeakMap
          , c = function(a) {
            this.h = {};
            this.g = f();
            this.size = 0;
            if (a) {
                a = ra(a);
                for (var b; !(b = a.next()).done; )
                    b = b.value,
                    this.set(b[0], b[1])
            }
        };
        c.prototype.set = function(a, b) {
            a = 0 === a ? 0 : a;
            var c = d(this, a);
            c.list || (c.list = this.h[c.id] = []);
            c.ma ? c.ma.value = b : (c.ma = {
                next: this.g,
                Ea: this.g.Ea,
                head: this.g,
                key: a,
                value: b
            },
            c.list.push(c.ma),
            this.g.Ea.next = c.ma,
            this.g.Ea = c.ma,
            this.size++);
            return this
        }
        ;
        c.prototype["delete"] = function(a) {
            a = d(this, a);
            return a.ma && a.list ? (a.list.splice(a.index, 1),
            a.list.length || delete this.h[a.id],
            a.ma.Ea.next = a.ma.next,
            a.ma.next.Ea = a.ma.Ea,
            a.ma.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this.h = {};
            this.g = this.g.Ea = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(a) {
            return !!d(this, a).ma
        }
        ;
        c.prototype.get = function(a) {
            return (a = d(this, a).ma) && a.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(a) {
                return [a.key, a.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(a) {
                return a.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(a) {
                return a.value
            })
        }
        ;
        c.prototype.forEach = function(a, b) {
            for (var c = this.entries(), d; !(d = c.next()).done; )
                d = d.value,
                a.call(b, d[1], d[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(a, c) {
            var d = c && typeof c;
            "object" == d || "function" == d ? b.has(c) ? d = b.get(c) : (d = "" + ++g,
            b.set(c, d)) : d = "p_" + c;
            var e = a.h[d];
            if (e && ua(a.h, d))
                for (a = 0; a < e.length; a++) {
                    var f = e[a];
                    if (c !== c && f.key !== f.key || c === f.key)
                        return {
                            id: d,
                            list: e,
                            index: a,
                            ma: f
                        }
                }
            return {
                id: d,
                list: e,
                index: -1,
                ma: void 0
            }
        }
          , e = function(a, b) {
            var c = a.g;
            return pa(function() {
                if (c) {
                    for (; c.head != a.g; )
                        c = c.Ea;
                    for (; c.next != c.head; )
                        return c = c.next,
                        {
                            done: !1,
                            value: b(c)
                        };
                    c = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
          , f = function() {
            var a = {};
            return a.Ea = a.next = a.head = a
        }
          , g = 0;
        return c
    });
    ta("Object.is", function(a) {
        return a ? a : function(a, c) {
            return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c
        }
    });
    ta("Array.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            var b = this;
            b instanceof String && (b = String(b));
            var e = b.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = b[c];
                if (f === a || Object.is(f, a))
                    return !0
            }
            return !1
        }
    });
    ta("String.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
            if (a instanceof RegExp)
                throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
            return -1 !== (this + "").indexOf(a, c || 0)
        }
    });
    ta("Promise", function(a) {
        function b() {
            this.g = null
        }
        function c(a) {
            return a instanceof e ? a : new e(function(b) {
                b(a)
            }
            )
        }
        if (a)
            return a;
        b.prototype.h = function(a) {
            null == this.g && (this.g = [],
            this.o());
            this.g.push(a)
        }
        ;
        b.prototype.o = function() {
            var a = this;
            this.l(function() {
                a.B()
            })
        }
        ;
        var d = ka.setTimeout;
        b.prototype.l = function(a) {
            d(a, 0)
        }
        ;
        b.prototype.B = function() {
            for (; this.g && this.g.length; ) {
                var a = this.g;
                this.g = [];
                for (var b = 0; b < a.length; ++b) {
                    var c = a[b];
                    a[b] = null;
                    try {
                        c()
                    } catch (l) {
                        this.w(l)
                    }
                }
            }
            this.g = null
        }
        ;
        b.prototype.w = function(a) {
            this.l(function() {
                throw a;
            })
        }
        ;
        var e = function(a) {
            this.h = 0;
            this.l = void 0;
            this.g = [];
            var b = this.o();
            try {
                a(b.resolve, b.reject)
            } catch (m) {
                b.reject(m)
            }
        };
        e.prototype.o = function() {
            function a(a) {
                return function(d) {
                    c || (c = !0,
                    a.call(b, d))
                }
            }
            var b = this
              , c = !1;
            return {
                resolve: a(this.K),
                reject: a(this.w)
            }
        }
        ;
        e.prototype.K = function(a) {
            if (a === this)
                this.w(new TypeError("A Promise cannot resolve to itself"));
            else if (a instanceof e)
                this.F(a);
            else {
                a: switch (typeof a) {
                case "object":
                    var b = null != a;
                    break a;
                case "function":
                    b = !0;
                    break a;
                default:
                    b = !1
                }
                b ? this.I(a) : this.B(a)
            }
        }
        ;
        e.prototype.I = function(a) {
            var b = void 0;
            try {
                b = a.then
            } catch (m) {
                this.w(m);
                return
            }
            "function" == typeof b ? this.G(b, a) : this.B(a)
        }
        ;
        e.prototype.w = function(a) {
            this.A(2, a)
        }
        ;
        e.prototype.B = function(a) {
            this.A(1, a)
        }
        ;
        e.prototype.A = function(a, b) {
            if (0 != this.h)
                throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.h);
            this.h = a;
            this.l = b;
            this.C()
        }
        ;
        e.prototype.C = function() {
            if (null != this.g) {
                for (var a = 0; a < this.g.length; ++a)
                    f.h(this.g[a]);
                this.g = null
            }
        }
        ;
        var f = new b;
        e.prototype.F = function(a) {
            var b = this.o();
            a.Hb(b.resolve, b.reject)
        }
        ;
        e.prototype.G = function(a, b) {
            var c = this.o();
            try {
                a.call(b, c.resolve, c.reject)
            } catch (l) {
                c.reject(l)
            }
        }
        ;
        e.prototype.then = function(a, b) {
            function c(a, b) {
                return "function" == typeof a ? function(b) {
                    try {
                        d(a(b))
                    } catch (Z) {
                        f(Z)
                    }
                }
                : b
            }
            var d, f, g = new e(function(a, b) {
                d = a;
                f = b
            }
            );
            this.Hb(c(a, d), c(b, f));
            return g
        }
        ;
        e.prototype["catch"] = function(a) {
            return this.then(void 0, a)
        }
        ;
        e.prototype.Hb = function(a, b) {
            function c() {
                switch (d.h) {
                case 1:
                    a(d.l);
                    break;
                case 2:
                    b(d.l);
                    break;
                default:
                    throw Error("Unexpected state: " + d.h);
                }
            }
            var d = this;
            null == this.g ? f.h(c) : this.g.push(c)
        }
        ;
        e.resolve = c;
        e.reject = function(a) {
            return new e(function(b, c) {
                c(a)
            }
            )
        }
        ;
        e.race = function(a) {
            return new e(function(b, d) {
                for (var e = ra(a), f = e.next(); !f.done; f = e.next())
                    c(f.value).Hb(b, d)
            }
            )
        }
        ;
        e.all = function(a) {
            var b = ra(a)
              , d = b.next();
            return d.done ? c([]) : new e(function(a, e) {
                function f(b) {
                    return function(c) {
                        g[b] = c;
                        k--;
                        0 == k && a(g)
                    }
                }
                var g = []
                  , k = 0;
                do
                    g.push(void 0),
                    k++,
                    c(d.value).Hb(f(g.length - 1), e),
                    d = b.next();
                while (!d.done)
            }
            )
        }
        ;
        return e
    });
    var n = this
      , p = function(a) {
        return void 0 !== a
    }
      , q = function(a) {
        return "string" == typeof a
    }
      , wa = function(a) {
        return "boolean" == typeof a
    }
      , r = function(a) {
        return "number" == typeof a
    }
      , u = function(a, b, c) {
        a = a.split(".");
        c = c || n;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            !a.length && p(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
    }
      , Aa = function() {
        if (null === ya) {
            a: {
                var a = n.document;
                if ((a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && za.test(a))
                    break a;
                a = null
            }
            ya = a || ""
        }
        return ya
    }
      , za = /^[\w+/_-]+[=]{0,2}$/
      , ya = null
      , Ba = function(a, b) {
        a = a.split(".");
        b = b || n;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
      , Ca = function() {}
      , Da = function(a) {
        a.pc = void 0;
        a.D = function() {
            return a.pc ? a.pc : a.pc = new a
        }
    }
      , Ea = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
      , Fa = function(a) {
        return "array" == Ea(a)
    }
      , Ga = function(a) {
        var b = Ea(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , v = function(a) {
        return "function" == Ea(a)
    }
      , Ha = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , Ia = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , Ja = 0
      , Ka = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , La = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , w = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? w = Ka : w = La;
        return w.apply(null, arguments)
    }
      , Ma = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
      , x = Date.now || function() {
        return +new Date
    }
      , y = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.da = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.zi = function(a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    };
    var Na = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
      , Oa = function(a, b) {
        var c = {}, d;
        for (d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
      , Qa = function(a) {
        var b = Pa, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return !0;
        return !1
    }
      , Ra = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , Sa = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
      , Ua = function(a, b) {
        var c = Ga(b)
          , d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a)
                return;
            a = a[d[c]]
        }
        return a
    }
      , Va = function(a, b) {
        return null !== a && b in a
    }
      , Wa = function(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
      , Ya = function(a) {
        var b = Xa, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return c
    }
      , Za = function(a) {
        for (var b in a)
            return !1;
        return !0
    }
      , $a = function(a, b, c) {
        return null !== a && b in a ? a[b] : c
    }
      , ab = function(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
      , bb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , cb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < bb.length; f++)
                c = bb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    n.console && "function" === typeof n.console.log && w(n.console.log, n.console);
    var db;
    var eb = function(a, b) {
        if (q(a))
            return q(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , z = function(a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , fb = function(a, b) {
        for (var c = q(a) ? a.split("") : a, d = a.length - 1; 0 <= d; --d)
            d in c && b.call(void 0, c[d], d, a)
    }
      , gb = function(a, b) {
        for (var c = a.length, d = [], e = 0, f = q(a) ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var k = f[g];
                b.call(void 0, k, g, a) && (d[e++] = k)
            }
        return d
    }
      , ib = function(a, b) {
        for (var c = a.length, d = Array(c), e = q(a) ? a.split("") : a, f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }
      , jb = function(a, b, c) {
        var d = c;
        z(a, function(c, f) {
            d = b.call(void 0, d, c, f, a)
        });
        return d
    }
      , kb = function(a, b) {
        for (var c = a.length, d = q(a) ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
      , nb = function(a, b) {
        b = lb(a, b, void 0);
        return 0 > b ? null : q(a) ? a.charAt(b) : a[b]
    }
      , lb = function(a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return f;
        return -1
    }
      , ob = function(a, b) {
        for (var c = q(a) ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
            if (d in c && b.call(void 0, c[d], d, a))
                return d;
        return -1
    }
      , pb = function(a, b) {
        return 0 <= eb(a, b)
    }
      , rb = function(a, b) {
        b = eb(a, b);
        var c;
        (c = 0 <= b) && qb(a, b);
        return c
    }
      , qb = function(a, b) {
        return 1 == Array.prototype.splice.call(a, b, 1).length
    }
      , sb = function(a, b) {
        var c = 0;
        fb(a, function(d, e) {
            b.call(void 0, d, e, a) && qb(a, e) && c++
        })
    }
      , tb = function(a) {
        return Array.prototype.concat.apply([], arguments)
    }
      , ub = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
      , vb = function(a) {
        for (var b = {}, c = 0, d = 0; d < a.length; ) {
            var e = a[d++];
            var f = e;
            f = Ha(f) ? "o" + (f[Ia] || (f[Ia] = ++Ja)) : (typeof f).charAt(0) + f;
            Object.prototype.hasOwnProperty.call(b, f) || (b[f] = !0,
            a[c++] = e)
        }
        a.length = c
    }
      , yb = function(a, b) {
        a.sort(b || xb)
    }
      , xb = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }
      , zb = function(a) {
        for (var b = [], c = 0; c < a; c++)
            b[c] = "";
        return b
    };
    var Ab = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }
      , Bb = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
      , Cb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
      , Db = function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    }
      , Lb = function(a) {
        if (!Eb.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(Fb, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(Gb, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(Hb, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(Ib, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Jb, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Kb, "&#0;"));
        return a
    }
      , Fb = /&/g
      , Gb = /</g
      , Hb = />/g
      , Ib = /"/g
      , Jb = /'/g
      , Kb = /\x00/g
      , Eb = /[\x00&<>"']/
      , Mb = function(a, b) {
        a.length > b && (a = a.substring(0, b - 3) + "...");
        return a
    }
      , Nb = function(a, b) {
        return -1 != a.toLowerCase().indexOf(b.toLowerCase())
    }
      , Ob = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
      , Pb = function(a, b) {
        a = p(void 0) ? a.toFixed(void 0) : String(a);
        var c = a.indexOf(".");
        -1 == c && (c = a.length);
        Ob("0", Math.max(0, b - c))
    }
      , Qb = function(a) {
        return null == a ? "" : String(a)
    }
      , Sb = function(a, b) {
        var c = 0;
        a = Cb(String(a)).split(".");
        b = Cb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)
                    break;
                c = Rb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || Rb(0 == f[2].length, 0 == g[2].length) || Rb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }
      , Rb = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
      , Tb = 2147483648 * Math.random() | 0
      , Ub = function(a) {
        var b = Number(a);
        return 0 == b && Bb(a) ? NaN : b
    }
      , Vb = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    }
      , Wb = function() {
        return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase()
    }
      , Xb = function(a) {
        var b = q(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])","g"), function(a, b, e) {
            return b + e.toUpperCase()
        })
    };
    var Yb;
    a: {
        var Zb = n.navigator;
        if (Zb) {
            var $b = Zb.userAgent;
            if ($b) {
                Yb = $b;
                break a
            }
        }
        Yb = ""
    }
    var A = function(a) {
        return -1 != Yb.indexOf(a)
    };
    var cc = function() {
        return A("Trident") || A("MSIE")
    }
      , ec = function() {
        return A("Safari") && !(dc() || A("Coast") || A("Opera") || A("Edge") || A("Silk") || A("Android"))
    }
      , dc = function() {
        return (A("Chrome") || A("CriOS")) && !A("Edge")
    };
    var fc = function() {
        return A("iPhone") && !A("iPod") && !A("iPad")
    };
    var gc = function(a) {
        gc[" "](a);
        return a
    };
    gc[" "] = Ca;
    var hc = function(a, b) {
        try {
            return gc(a[b]),
            !0
        } catch (c) {}
        return !1
    }
      , kc = function(a, b) {
        var c = ic;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var lc = A("Opera"), mc = cc(), nc = A("Edge"), oc = A("Gecko") && !(Nb(Yb, "WebKit") && !A("Edge")) && !(A("Trident") || A("MSIE")) && !A("Edge"), pc = Nb(Yb, "WebKit") && !A("Edge"), qc = A("Android"), sc = fc(), tc = A("iPad"), uc = function() {
        var a = n.document;
        return a ? a.documentMode : void 0
    }, vc;
    a: {
        var wc = ""
          , xc = function() {
            var a = Yb;
            if (oc)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (nc)
                return /Edge\/([\d\.]+)/.exec(a);
            if (mc)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (pc)
                return /WebKit\/(\S+)/.exec(a);
            if (lc)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        xc && (wc = xc ? xc[1] : "");
        if (mc) {
            var yc = uc();
            if (null != yc && yc > parseFloat(wc)) {
                vc = String(yc);
                break a
            }
        }
        vc = wc
    }
    var zc = vc, ic = {}, Ac = function(a) {
        return kc(a, function() {
            return 0 <= Sb(zc, a)
        })
    }, Bc;
    var Cc = n.document;
    Bc = Cc && mc ? uc() || ("CSS1Compat" == Cc.compatMode ? parseInt(zc, 10) : 5) : void 0;
    var Dc = !mc || 9 <= Number(Bc)
      , Ec = mc || lc || pc;
    var Gc = function() {
        this.g = "";
        this.h = Fc
    };
    Gc.prototype.Wa = !0;
    Gc.prototype.Ia = function() {
        return this.g
    }
    ;
    Gc.prototype.toString = function() {
        return "Const{" + this.g + "}"
    }
    ;
    var Hc = function(a) {
        return a instanceof Gc && a.constructor === Gc && a.h === Fc ? a.g : "type_error:Const"
    }
      , Fc = {}
      , Ic = function(a) {
        var b = new Gc;
        b.g = a;
        return b
    };
    Ic("");
    var Kc = function() {
        this.g = "";
        this.h = Jc
    };
    Kc.prototype.Wa = !0;
    Kc.prototype.Ia = function() {
        return this.g
    }
    ;
    Kc.prototype.oc = !0;
    Kc.prototype.bc = function() {
        return 1
    }
    ;
    var Lc = function(a) {
        if (a instanceof Kc && a.constructor === Kc && a.h === Jc)
            return a.g;
        Ea(a);
        return "type_error:TrustedResourceUrl"
    }
      , Jc = {}
      , Mc = function(a) {
        var b = new Kc;
        b.g = a;
        return b
    };
    var Oc = function() {
        this.g = "";
        this.h = Nc
    };
    Oc.prototype.Wa = !0;
    Oc.prototype.Ia = function() {
        return this.g
    }
    ;
    Oc.prototype.oc = !0;
    Oc.prototype.bc = function() {
        return 1
    }
    ;
    var Pc = function(a) {
        if (a instanceof Oc && a.constructor === Oc && a.h === Nc)
            return a.g;
        Ea(a);
        return "type_error:SafeUrl"
    }
      , Qc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , Nc = {}
      , Rc = function(a) {
        var b = new Oc;
        b.g = a;
        return b
    };
    Rc("about:blank");
    var Tc = function() {
        this.g = "";
        this.l = Sc;
        this.h = null
    };
    Tc.prototype.oc = !0;
    Tc.prototype.bc = function() {
        return this.h
    }
    ;
    Tc.prototype.Wa = !0;
    Tc.prototype.Ia = function() {
        return this.g
    }
    ;
    var Sc = {}
      , Uc = function(a, b) {
        var c = new Tc;
        c.g = a;
        c.h = b;
        return c
    };
    Uc("<!DOCTYPE html>", 0);
    Uc("", 0);
    Uc("<br>", 0);
    var Vc = function(a, b) {
        a.src = Lc(b);
        (b = Aa()) && a.setAttribute("nonce", b)
    };
    var Wc = function(a, b) {
        this.x = p(a) ? a : 0;
        this.y = p(b) ? b : 0
    };
    h = Wc.prototype;
    h.clone = function() {
        return new Wc(this.x,this.y)
    }
    ;
    h.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    h.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    h.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.x *= a;
        this.y *= b;
        return this
    }
    ;
    var B = function(a, b) {
        this.width = a;
        this.height = b
    }
      , Xc = function(a, b) {
        return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
    };
    h = B.prototype;
    h.clone = function() {
        return new B(this.width,this.height)
    }
    ;
    h.Ga = function() {
        return this.width * this.height
    }
    ;
    h.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    h.isEmpty = function() {
        return !this.Ga()
    }
    ;
    h.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    h.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    h.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.width *= a;
        this.height *= b;
        return this
    }
    ;
    var $c = function(a) {
        return a ? new Yc(Zc(a)) : db || (db = new Yc)
    }
      , ad = function() {
        var a = document;
        return a.querySelectorAll && a.querySelector ? a.querySelectorAll("SCRIPT") : a.getElementsByTagName("SCRIPT")
    }
      , gd = function(a, b) {
        Na(b, function(b, d) {
            b && b.Wa && (b = b.Ia());
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : fd.hasOwnProperty(d) ? a.setAttribute(fd[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }
      , fd = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , hd = function(a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new B(a.clientWidth,a.clientHeight)
    }
      , id = function(a) {
        var b = a.scrollingElement ? a.scrollingElement : pc || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return mc && Ac("10") && a.pageYOffset != b.scrollTop ? new Wc(b.scrollLeft,b.scrollTop) : new Wc(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , C = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    }
      , kd = function(a, b, c) {
        var d = arguments
          , e = document
          , f = String(d[0])
          , g = d[1];
        if (!Dc && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', Lb(g.name), '"');
            if (g.type) {
                f.push(' type="', Lb(g.type), '"');
                var k = {};
                cb(k, g);
                delete k.type;
                g = k
            }
            f.push(">");
            f = f.join("")
        }
        f = e.createElement(f);
        g && (q(g) ? f.className = g : Fa(g) ? f.className = g.join(" ") : gd(f, g));
        2 < d.length && jd(e, f, d);
        return f
    }
      , jd = function(a, b, c) {
        function d(c) {
            c && b.appendChild(q(c) ? a.createTextNode(c) : c)
        }
        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !Ga(f) || Ha(f) && 0 < f.nodeType ? d(f) : z(ld(f) ? ub(f) : f, d)
        }
    }
      , md = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
      , nd = function(a) {
        var b;
        if (Ec && !(mc && Ac("9") && !Ac("10") && n.SVGElement && a instanceof n.SVGElement) && (b = a.parentElement))
            return b;
        b = a.parentNode;
        return Ha(b) && 1 == b.nodeType ? b : null
    }
      , od = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , Zc = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , pd = function(a) {
        try {
            return a.contentWindow || (a.contentDocument ? C(a.contentDocument) : null)
        } catch (b) {}
        return null
    }
      , ld = function(a) {
        if (a && "number" == typeof a.length) {
            if (Ha(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (v(a))
                return "function" == typeof a.item
        }
        return !1
    }
      , qd = function(a, b) {
        a && (a = a.parentNode);
        for (var c = 0; a; ) {
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
      , Yc = function(a) {
        this.g = a || n.document || document
    };
    Yc.prototype.createElement = function(a) {
        return this.g.createElement(String(a))
    }
    ;
    Yc.prototype.contains = od;
    var rd = function(a) {
        for (var b = [], c = a = C(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement)
                b.push(c.frameElement);
            else
                break;
        return b
    };
    var sd = !mc || 9 <= Number(Bc)
      , td = mc && !Ac("9")
      , ud = function() {
        if (!n.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        n.addEventListener("test", Ca, b);
        n.removeEventListener("test", Ca, b);
        return a
    }();
    var vd = function() {
        this.K = this.K;
        this.I = this.I
    };
    vd.prototype.K = !1;
    vd.prototype.Pb = function() {
        return this.K
    }
    ;
    vd.prototype.X = function() {
        this.K || (this.K = !0,
        this.U())
    }
    ;
    var wd = function(a, b) {
        a.K ? p(void 0) ? b.call(void 0) : b() : (a.I || (a.I = []),
        a.I.push(p(void 0) ? w(b, void 0) : b))
    };
    vd.prototype.U = function() {
        if (this.I)
            for (; this.I.length; )
                this.I.shift()()
    }
    ;
    var xd = function(a) {
        a && "function" == typeof a.X && a.X()
    };
    var yd = function(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.pd = !0
    };
    yd.prototype.l = function() {
        this.pd = !1
    }
    ;
    var Ad = function(a, b) {
        yd.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.h = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            (b = a.relatedTarget) ? oc && (hc(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = q(a.pointerType) ? a.pointerType : zd[a.pointerType] || "";
            this.h = a;
            a.defaultPrevented && this.l()
        }
    };
    y(Ad, yd);
    var zd = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Ad.prototype.l = function() {
        Ad.da.l.call(this);
        var a = this.h;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        td)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    var Bd = "closure_listenable_" + (1E6 * Math.random() | 0)
      , Cd = function(a) {
        return !(!a || !a[Bd])
    }
      , Dd = 0;
    var Ed = function(a, b, c, d, e) {
        this.listener = a;
        this.g = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Kb = e;
        this.key = ++Dd;
        this.lb = this.Gb = !1
    }
      , Fd = function(a) {
        a.lb = !0;
        a.listener = null;
        a.g = null;
        a.src = null;
        a.Kb = null
    };
    var Gd = function(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    };
    Gd.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.h++);
        var g = Hd(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.Gb = !1)) : (b = new Ed(b,this.src,f,!!d,e),
        b.Gb = c,
        a.push(b));
        return b
    }
    ;
    var Id = function(a, b) {
        var c = b.type;
        c in a.g && rb(a.g[c], b) && (Fd(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    }
      , Jd = function(a, b, c, d, e) {
        a = a.g[b.toString()];
        b = -1;
        a && (b = Hd(a, c, d, e));
        return -1 < b ? a[b] : null
    }
      , Hd = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.lb && f.listener == b && f.capture == !!c && f.Kb == d)
                return e
        }
        return -1
    };
    var Kd = "closure_lm_" + (1E6 * Math.random() | 0)
      , Ld = {}
      , Md = 0
      , Od = function(a, b, c, d, e) {
        if (d && d.once)
            return Nd(a, b, c, d, e);
        if (Fa(b)) {
            for (var f = 0; f < b.length; f++)
                Od(a, b[f], c, d, e);
            return null
        }
        c = Pd(c);
        return Cd(a) ? a.O(b, c, Ha(d) ? !!d.capture : !!d, e) : Qd(a, b, c, !1, d, e)
    }
      , Qd = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = Ha(e) ? !!e.capture : !!e
          , k = Rd(a);
        k || (a[Kd] = k = new Gd(a));
        c = k.add(b, c, d, g, f);
        if (c.g)
            return c;
        d = Sd();
        c.g = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            ud || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(Td(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        Md++;
        return c
    }
      , Sd = function() {
        var a = Ud
          , b = sd ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
      , Nd = function(a, b, c, d, e) {
        if (Fa(b)) {
            for (var f = 0; f < b.length; f++)
                Nd(a, b[f], c, d, e);
            return null
        }
        c = Pd(c);
        return Cd(a) ? a.B.add(String(b), c, !0, Ha(d) ? !!d.capture : !!d, e) : Qd(a, b, c, !0, d, e)
    }
      , Vd = function(a, b, c, d, e) {
        if (Fa(b))
            for (var f = 0; f < b.length; f++)
                Vd(a, b[f], c, d, e);
        else
            d = Ha(d) ? !!d.capture : !!d,
            c = Pd(c),
            Cd(a) ? a.Oa(b, c, d, e) : a && (a = Rd(a)) && (b = Jd(a, b, c, d, e)) && Wd(b)
    }
      , Wd = function(a) {
        if (!r(a) && a && !a.lb) {
            var b = a.src;
            if (Cd(b))
                Id(b.B, a);
            else {
                var c = a.type
                  , d = a.g;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Td(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Md--;
                (c = Rd(b)) ? (Id(c, a),
                0 == c.h && (c.src = null,
                b[Kd] = null)) : Fd(a)
            }
        }
    }
      , Td = function(a) {
        return a in Ld ? Ld[a] : Ld[a] = "on" + a
    }
      , Yd = function(a, b, c, d) {
        var e = !0;
        if (a = Rd(a))
            if (b = a.g[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.lb && (f = Xd(f, d),
                    e = e && !1 !== f)
                }
        return e
    }
      , Xd = function(a, b) {
        var c = a.listener
          , d = a.Kb || a.src;
        a.Gb && Wd(a);
        return c.call(d, b)
    }
      , Ud = function(a, b) {
        if (a.lb)
            return !0;
        if (!sd) {
            var c = b || Ba("window.event");
            b = new Ad(c,this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                    if (e || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (e = b.g; e; e = e.parentNode)
                    c.push(e);
                a = a.type;
                for (e = c.length - 1; 0 <= e; e--) {
                    b.g = c[e];
                    var f = Yd(c[e], a, !0, b);
                    d = d && f
                }
                for (e = 0; e < c.length; e++)
                    b.g = c[e],
                    f = Yd(c[e], a, !1, b),
                    d = d && f
            }
            return d
        }
        return Xd(a, new Ad(b,this))
    }
      , Rd = function(a) {
        a = a[Kd];
        return a instanceof Gd ? a : null
    }
      , Zd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , Pd = function(a) {
        if (v(a))
            return a;
        a[Zd] || (a[Zd] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Zd]
    };
    var F = function() {
        vd.call(this);
        this.B = new Gd(this);
        this.$b = this;
        this.Pa = null
    };
    y(F, vd);
    F.prototype[Bd] = !0;
    h = F.prototype;
    h.addEventListener = function(a, b, c, d) {
        Od(this, a, b, c, d)
    }
    ;
    h.removeEventListener = function(a, b, c, d) {
        Vd(this, a, b, c, d)
    }
    ;
    h.dispatchEvent = function(a) {
        var b, c = this.Pa;
        if (c)
            for (b = []; c; c = c.Pa)
                b.push(c);
        c = this.$b;
        var d = a.type || a;
        if (q(a))
            a = new yd(a,c);
        else if (a instanceof yd)
            a.target = a.target || c;
        else {
            var e = a;
            a = new yd(d,c);
            cb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var g = a.g = b[f];
                e = $d(g, d, !0, a) && e
            }
        g = a.g = c;
        e = $d(g, d, !0, a) && e;
        e = $d(g, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++)
                g = a.g = b[f],
                e = $d(g, d, !1, a) && e;
        return e
    }
    ;
    h.U = function() {
        F.da.U.call(this);
        if (this.B) {
            var a = this.B, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    Fd(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.Pa = null
    }
    ;
    h.O = function(a, b, c, d) {
        return this.B.add(String(a), b, !1, c, d)
    }
    ;
    h.Oa = function(a, b, c, d) {
        var e = this.B;
        a = String(a).toString();
        if (a in e.g) {
            var f = e.g[a];
            b = Hd(f, b, c, d);
            -1 < b && (Fd(f[b]),
            qb(f, b),
            0 == f.length && (delete e.g[a],
            e.h--))
        }
    }
    ;
    var $d = function(a, b, c, d) {
        b = a.B.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.lb && g.capture == c) {
                var k = g.listener
                  , m = g.Kb || g.src;
                g.Gb && Id(a.B, g);
                e = !1 !== k.call(m, d) && e
            }
        }
        return e && 0 != d.pd
    };
    var ae = function(a) {
        return function() {
            return a
        }
    }
      , be = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    };
    var ce = function(a, b) {
        F.call(this);
        this.h = a || 1;
        this.g = b || n;
        this.l = w(this.bg, this);
        this.o = x()
    };
    y(ce, F);
    h = ce.prototype;
    h.wb = !1;
    h.va = null;
    h.setInterval = function(a) {
        this.h = a;
        this.va && this.wb ? (this.stop(),
        this.start()) : this.va && this.stop()
    }
    ;
    h.bg = function() {
        if (this.wb) {
            var a = x() - this.o;
            0 < a && a < .8 * this.h ? this.va = this.g.setTimeout(this.l, this.h - a) : (this.va && (this.g.clearTimeout(this.va),
            this.va = null),
            this.dispatchEvent("tick"),
            this.wb && (this.stop(),
            this.start()))
        }
    }
    ;
    h.start = function() {
        this.wb = !0;
        this.va || (this.va = this.g.setTimeout(this.l, this.h),
        this.o = x())
    }
    ;
    h.stop = function() {
        this.wb = !1;
        this.va && (this.g.clearTimeout(this.va),
        this.va = null)
    }
    ;
    h.U = function() {
        ce.da.U.call(this);
        this.stop();
        delete this.g
    }
    ;
    var de = function(a, b, c) {
        if (v(a))
            c && (a = w(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = w(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0)
    };
    var ee = function() {
        return Math.round(x() / 1E3)
    }
      , fe = function(a) {
        var b = window.performance && window.performance.timing && window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
        return null != b ? b : null != a ? a : ee()
    };
    var ge = function(a) {
        return ib(a, function(a) {
            a = a.toString(16);
            return 1 < a.length ? a : "0" + a
        }).join("")
    };
    var he = A("Firefox")
      , ie = fc() || A("iPod")
      , je = A("iPad")
      , oe = A("Android") && !(dc() || A("Firefox") || A("Opera") || A("Silk"))
      , pe = dc()
      , qe = ec() && !(fc() || A("iPad") || A("iPod"));
    var re = null
      , se = null;
    var te = function() {
        this.h = -1
    };
    var we = function(a) {
        var b = [];
        ue(new ve, a, b);
        return b.join("")
    }
      , ve = function() {}
      , ue = function(a, b, c) {
        if (null == b)
            c.push("null");
        else {
            if ("object" == typeof b) {
                if (Fa(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)
                        c.push(e),
                        ue(a, d[f], c),
                        e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)
                    b = b.valueOf();
                else {
                    c.push("{");
                    e = "";
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) && (f = b[d],
                        "function" != typeof f && (c.push(e),
                        xe(d, c),
                        c.push(":"),
                        ue(a, f, c),
                        e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
            case "string":
                xe(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                break;
            case "boolean":
                c.push(String(b));
                break;
            case "function":
                c.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }
    }
      , ye = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }
      , ze = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g
      , xe = function(a, b) {
        b.push('"', a.replace(ze, function(a) {
            var b = ye[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1),
            ye[a] = b);
            return b
        }), '"')
    };
    var Ae = function(a) {
        this.g = a || {
            cookie: ""
        }
    };
    h = Ae.prototype;
    h.set = function(a, b, c, d, e, f) {
        if (/[;=\s]/.test(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b))
            throw Error('Invalid cookie value "' + b + '"');
        p(c) || (c = -1);
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        f = f ? ";secure" : "";
        c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(x() + 1E3 * c)).toUTCString();
        this.g.cookie = a + "=" + b + e + d + c + f
    }
    ;
    h.get = function(a, b) {
        for (var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = Cb(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.substr(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    h.Sa = function() {
        return Be(this).keys
    }
    ;
    h.pa = function() {
        return Be(this).values
    }
    ;
    h.isEmpty = function() {
        return !this.g.cookie
    }
    ;
    h.Ha = function() {
        return this.g.cookie ? (this.g.cookie || "").split(";").length : 0
    }
    ;
    h.clear = function() {
        for (var a = Be(this).keys, b = a.length - 1; 0 <= b; b--) {
            var c = a[b];
            this.get(c);
            this.set(c, "", 0, void 0, void 0)
        }
    }
    ;
    var Be = function(a) {
        a = (a.g.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            e = Cb(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
      , Ce = new Ae("undefined" == typeof document ? null : document);
    Ce.h = 3950;
    var De = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
      , Ee = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? Db(e) : "")
            }
        }
    }
      , Fe = /#|$/
      , Ge = function(a, b) {
        var c = a.search(Fe);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e),
                    !f || 61 == f || 38 == f || 35 == f)
                        break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d)
            return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return Db(a.substr(d, e - d))
    };
    var He = function() {
        this.g = {};
        return this
    };
    He.prototype.set = function(a, b) {
        this.g[a] = b
    }
    ;
    var Ie = function(a, b) {
        a.g.eb = $a(a.g, "eb", 0) | b
    };
    He.prototype.get = function(a) {
        return $a(this.g, a, null)
    }
    ;
    var G = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    G.prototype.h = function() {
        return this.right - this.left
    }
    ;
    G.prototype.g = function() {
        return this.bottom - this.top
    }
    ;
    G.prototype.clone = function() {
        return new G(this.top,this.right,this.bottom,this.left)
    }
    ;
    G.prototype.contains = function(a) {
        return this && a ? a instanceof G ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    var Je = function(a, b) {
        return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
    };
    G.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    G.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    G.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    var Ke = function(a, b, c) {
        b instanceof Wc ? (a.left += b.x,
        a.right += b.x,
        a.top += b.y,
        a.bottom += b.y) : (a.left += b,
        a.right += b,
        r(c) && (a.top += c,
        a.bottom += c));
        return a
    };
    G.prototype.scale = function(a, b) {
        b = r(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    }
    ;
    var Le = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    Le.prototype.clone = function() {
        return new Le(this.left,this.top,this.width,this.height)
    }
    ;
    var Me = function(a) {
        return new G(a.top,a.left + a.width,a.top + a.height,a.left)
    };
    h = Le.prototype;
    h.contains = function(a) {
        return a instanceof Wc ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    h.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    h.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    h.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    }
    ;
    var Ne = null
      , Oe = function() {
        this.g = {};
        this.h = 0
    }
      , Pe = function(a, b) {
        this.B = a;
        this.o = !0;
        this.h = b
    };
    Pe.prototype.g = function() {
        return this.h
    }
    ;
    Pe.prototype.l = function() {
        return String(this.h)
    }
    ;
    var Qe = function(a, b) {
        Pe.call(this, String(a), b);
        this.w = a;
        this.h = !!b
    };
    y(Qe, Pe);
    Qe.prototype.l = function() {
        return this.h ? "1" : "0"
    }
    ;
    var Re = function(a, b) {
        Pe.call(this, a, b)
    };
    y(Re, Pe);
    Re.prototype.l = function() {
        return this.h ? Math.round(this.h.top) + "." + Math.round(this.h.left) + "." + (Math.round(this.h.top) + Math.round(this.h.height)) + "." + (Math.round(this.h.left) + Math.round(this.h.width)) : ""
    }
    ;
    var Se = function(a) {
        if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
            a = a.split(".");
            var b = Number(a[0])
              , c = Number(a[1]);
            return new Re("",new Le(c,b,Number(a[3]) - c,Number(a[2]) - b))
        }
        return new Re("",new Le(0,0,0,0))
    }
      , Te = function() {
        Ne || (Ne = new Oe);
        return Ne
    }
      , Ue = function(a, b) {
        a.g[b.B] = b
    };
    var We = function(a, b) {
        if (q(b))
            (b = Ve(a, b)) && (a.style[b] = void 0);
        else
            for (var c in b) {
                var d = a
                  , e = b[c]
                  , f = Ve(d, c);
                f && (d.style[f] = e)
            }
    }
      , Xe = {}
      , Ve = function(a, b) {
        var c = Xe[b];
        if (!c) {
            var d = Vb(b);
            c = d;
            void 0 === a.style[d] && (d = (pc ? "Webkit" : oc ? "Moz" : mc ? "ms" : lc ? "O" : null) + Xb(d),
            void 0 !== a.style[d] && (c = d));
            Xe[b] = c
        }
        return c
    }
      , Ye = function(a, b) {
        var c = a.style[Vb(b)];
        return "undefined" !== typeof c ? c : a.style[Ve(a, b)] || ""
    }
      , Ze = function(a) {
        try {
            var b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        mc && a.ownerDocument.body && (a = a.ownerDocument,
        b.left -= a.documentElement.clientLeft + a.body.clientLeft,
        b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }
      , $e = function(a) {
        var b = Zc(a)
          , c = new Wc(0,0);
        var d = b ? Zc(b) : document;
        d = !mc || 9 <= Number(Bc) || "CSS1Compat" == $c(d).g.compatMode ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = Ze(a);
        b = id($c(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , af = function(a, b) {
        var c = new Wc(0,0)
          , d = C(Zc(a));
        if (!hc(d, "parent"))
            return c;
        do {
            if (d == b)
                var e = $e(a);
            else
                e = Ze(a),
                e = new Wc(e.left,e.top);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));return c
    }
      , bf = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = pc && !b && !c;
        return p(b) && !d || !a.getBoundingClientRect ? new B(b,c) : (a = Ze(a),
        new B(a.right - a.left,a.bottom - a.top))
    };
    var cf = function(a) {
        var b = new Le(-Number.MAX_VALUE / 2,-Number.MAX_VALUE / 2,Number.MAX_VALUE,Number.MAX_VALUE)
          , c = new Le(0,0,0,0);
        if (!a || 0 == a.length)
            return c;
        for (var d = 0; d < a.length; d++) {
            a: {
                var e = b;
                var f = a[d]
                  , g = Math.max(e.left, f.left)
                  , k = Math.min(e.left + e.width, f.left + f.width);
                if (g <= k) {
                    var m = Math.max(e.top, f.top);
                    f = Math.min(e.top + e.height, f.top + f.height);
                    if (m <= f) {
                        e.left = g;
                        e.top = m;
                        e.width = k - g;
                        e.height = f - m;
                        e = !0;
                        break a
                    }
                }
                e = !1
            }
            if (!e)
                return c
        }
        return b
    }
      , df = function(a, b) {
        var c = a.getBoundingClientRect();
        a = af(a, b);
        return new Le(Math.round(a.x),Math.round(a.y),Math.round(c.right - c.left),Math.round(c.bottom - c.top))
    }
      , ef = function(a, b, c) {
        if (b && c) {
            a: {
                var d = Math.max(b.left, c.left);
                var e = Math.min(b.left + b.width, c.left + c.width);
                if (d <= e) {
                    var f = Math.max(b.top, c.top)
                      , g = Math.min(b.top + b.height, c.top + c.height);
                    if (f <= g) {
                        d = new Le(d,f,e - d,g - f);
                        break a
                    }
                }
                d = null
            }
            e = d ? d.height * d.width : 0;
            f = d ? b.height * b.width : 0;
            d = d && f ? Math.round(e / f * 100) : 0;
            Ue(a, new Pe("vp",d));
            d && 0 < d ? (e = Me(b),
            f = Me(c),
            e = e.top >= f.top && e.top < f.bottom) : e = !1;
            Ue(a, new Qe(512,e));
            d && 0 < d ? (e = Me(b),
            f = Me(c),
            e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;
            Ue(a, new Qe(1024,e));
            d && 0 < d ? (e = Me(b),
            f = Me(c),
            e = e.left >= f.left && e.left < f.right) : e = !1;
            Ue(a, new Qe(2048,e));
            d && 0 < d ? (b = Me(b),
            c = Me(c),
            c = b.right <= c.right && b.right > c.left) : c = !1;
            Ue(a, new Qe(4096,c))
        }
    };
    var ff = function(a, b) {
        var c = 0;
        Ua(C(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Te();
            a.g = {};
            var e = new Qe(32,!0);
            e.o = !1;
            Ue(a, e);
            e = C().document;
            e = e.visibilityState || e.webkitVisibilityState || e.mozVisibilityState || e.msVisibilityState || "";
            Ue(a, new Qe(64,"hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = C().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (t) {
                    g = !1
                }
                if (g) {
                    var k = rd(d);
                    var m = k && 0 != k.length ? "1" : "0"
                } else
                    m = "2"
            } catch (t) {
                m = "2"
            }
            Ue(a, new Qe(256,"2" == m));
            Ue(a, new Qe(128,"1" == m));
            k = g = C().top;
            "2" == m && (k = C());
            f = df(d, k);
            Ue(a, new Re("er",f));
            try {
                var l = k.document && !k.document.body ? null : hd(k || window)
            } catch (t) {
                l = null
            }
            l ? (k = id($c(k.document).g),
            Ue(a, new Qe(16384,!!k)),
            l = k ? new Le(k.x,k.y,l.width,l.height) : null) : l = null;
            Ue(a, new Re("vi",l));
            if (l && "1" == m) {
                m = rd(d);
                d = [];
                for (k = 0; k < m.length; k++)
                    (e = df(m[k], g)) && d.push(e);
                d.push(l);
                l = cf(d)
            }
            ef(a, f, l);
            a.h && (m = ee() - a.h,
            Ue(a, new Pe("ts",m)));
            a.h = ee()
        } else
            a = Te(),
            a.g = {},
            a.h = ee(),
            Ue(a, new Qe(32,!1));
        this.l = a;
        this.g = new He;
        this.g.set("ve", 4);
        c && Ie(this.g, 1);
        Ua(C(), "ima", "video", "client", "crossdomainTag") && Ie(this.g, 4);
        Ua(C(), "ima", "video", "client", "sdkTag") && Ie(this.g, 8);
        Ua(C(), "ima", "video", "client", "jsTag") && Ie(this.g, 2);
        b && $a(b, "fullscreen", !1) && Ie(this.g, 16);
        this.h = b = null;
        if (c && (c = Ua(C(), "ima", "video", "client"),
        c.getEData)) {
            this.h = c.getEData();
            if (c = Ua(C(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c())
                    this.h.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp),
                    c = this.l,
                    b = a.er,
                    a = a.vi,
                    b && a && (b = Se(b).g(),
                    a = Se(a).g(),
                    m = null,
                    $a(c.g, "er", null) && (m = $a(c.g, "er", null).g(),
                    m.top += b.top,
                    m.left += b.left,
                    Ue(c, new Re("er",m))),
                    $a(c.g, "vi", null) && (l = $a(c.g, "vi", null).g(),
                    l.top += b.top,
                    l.left += b.left,
                    d = [],
                    d.push(l),
                    d.push(b),
                    d.push(a),
                    b = cf(d),
                    ef(c, m, b),
                    Ue(c, new Re("vi",a))));
            a: {
                if (this.h) {
                    if (this.h.getTagLoadTimestamp) {
                        b = this.h.getTagLoadTimestamp();
                        break a
                    }
                    if (this.h.getTimeSinceTagLoadSeconds) {
                        b = this.h.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        this.g.set("td", ee() - fe(b))
    };
    var gf = new ce(200)
      , hf = function(a, b) {
        try {
            var c = new ff(a,b);
            a = [];
            var d = Number(c.g.get("eb"))
              , e = c.g.g;
            "eb"in e && delete e.eb;
            var f, g = c.g;
            e = [];
            for (var k in g.g)
                e.push(k + g.g[k]);
            (f = e.join("_")) && a.push(f);
            if (c.h) {
                var m = c.h.serialize();
                m && a.push(m)
            }
            var l, t = c.l;
            f = d;
            g = [];
            f || (f = 0);
            for (var E in t.g) {
                var Y = t.g[E];
                if (Y instanceof Qe)
                    Y.g() && (f |= Y.w);
                else {
                    var qa, T = t.g[E];
                    (qa = T.o ? T.l() : "") && g.push(E + qa)
                }
            }
            g.push("eb" + String(f));
            (l = g.join("_")) && a.push(l);
            c.g.set("eb", d);
            return a.join("_")
        } catch (Z) {
            return "tle;" + Mb(Z.name, 12) + ";" + Mb(Z.message, 40)
        }
    }
      , jf = function(a, b) {
        Od(gf, "tick", function() {
            var c = hf(b);
            a(c)
        });
        gf.start();
        gf.dispatchEvent("tick")
    };
    var kf = function() {}
      , lf = "function" == typeof Uint8Array
      , mf = []
      , nf = function(a, b) {
        if (b < a.l) {
            b += a.w;
            var c = a.g[b];
            return c === mf ? a.g[b] = [] : c
        }
        if (a.h)
            return c = a.h[b],
            c === mf ? a.h[b] = [] : c
    }
      , of = function(a, b) {
        if (b < a.l) {
            b += a.w;
            var c = a.g[b];
            return c === mf ? a.g[b] = [] : c
        }
        c = a.h[b];
        return c === mf ? a.h[b] = [] : c
    }
      , rf = function(a) {
        if (a.o)
            for (var b in a.o) {
                var c = a.o[b];
                if (Fa(c))
                    for (var d = 0; d < c.length; d++)
                        c[d] && pf(c[d]);
                else
                    c && pf(c)
            }
    }
      , pf = function(a) {
        rf(a);
        return a.g
    };
    kf.prototype.toString = function() {
        rf(this);
        return this.g.toString()
    }
    ;
    kf.prototype.clone = function() {
        return new this.constructor(sf(pf(this)))
    }
    ;
    var sf = function(a) {
        if (Fa(a)) {
            for (var b = Array(a.length), c = 0; c < a.length; c++) {
                var d = a[c];
                null != d && (b[c] = "object" == typeof d ? sf(d) : d)
            }
            return b
        }
        if (lf && a instanceof Uint8Array)
            return new Uint8Array(a);
        b = {};
        for (c in a)
            d = a[c],
            null != d && (b[c] = "object" == typeof d ? sf(d) : d);
        return b
    };
    var tf = document
      , H = window;
    var vf = function(a) {
        var b = a;
        a = uf;
        this.o = null;
        b || (b = []);
        this.w = -1;
        this.g = b;
        a: {
            if (b = this.g.length) {
                --b;
                var c = this.g[b];
                if (c && "object" == typeof c && !Fa(c) && !(lf && c instanceof Uint8Array)) {
                    this.l = b - -1;
                    this.h = c;
                    break a
                }
            }
            this.l = Number.MAX_VALUE
        }
        if (a)
            for (b = 0; b < a.length; b++)
                if (c = a[b],
                c < this.l)
                    c += -1,
                    this.g[c] = this.g[c] || mf;
                else {
                    var d = this.l + -1;
                    this.g[d] || (this.h = this.g[d] = {});
                    this.h[c] = this.h[c] || mf
                }
    };
    y(vf, kf);
    var uf = [1, 2, 3, 4];
    var wf = function() {
        this.g = new Ae(document)
    };
    wf.prototype.get = function(a) {
        a = this.g.get(a);
        return void 0 === a ? null : a
    }
    ;
    wf.prototype.set = function(a, b) {
        this.g.set(a, b, 0, "", "")
    }
    ;
    var xf = function() {
        var a = new wf;
        try {
            var b = a.get("DATA_USE_CONSENT")
        } catch (c) {}
        if (!b)
            return null;
        try {
            return new vf(b ? JSON.parse(b) : null)
        } catch (c) {
            return null
        }
    };
    var zf = function(a) {
        yf();
        return Mc(a)
    }
      , yf = Ca;
    var Bf = function() {
        return !Af() && (A("iPod") || A("iPhone") || A("Android") || A("IEMobile"))
    }
      , Af = function() {
        return A("iPad") || A("Android") && !A("Mobile") || A("Silk")
    };
    var Cf = function(a) {
        try {
            return !!a && null != a.location.href && hc(a, "foo")
        } catch (b) {
            return !1
        }
    }
      , Df = function(a, b) {
        if (a)
            for (var c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }
      , Ff = function() {
        var a = [];
        Df(Ef, function(b) {
            a.push(b)
        });
        return a
    }
      , Pf = /https?:\/\/[^\/]+/
      , Qf = function(a) {
        return (a = Pf.exec(a)) && a[0] || ""
    }
      , Rf = function() {
        var a = n;
        try {
            for (var b = null; b != a; b = a,
            a = a.parent)
                switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "file:":
                    return !1;
                case "http:":
                    return !1
                }
        } catch (c) {}
        return !0
    }
      , Tf = function() {
        var a = Sf;
        if (!a)
            return "";
        var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
        try {
            var c = b.exec(decodeURIComponent(a));
            if (c)
                return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
        } catch (d) {}
        return ""
    }
      , Uf = function(a, b) {
        try {
            return !(!a.frames || !a.frames[b])
        } catch (c) {
            return !1
        }
    };
    var Vf = be(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            n.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });
    function Wf(a) {
        return a ? a.passive && Vf() ? a : a.capture || !1 : a
    }
    var Xf = function(a, b, c, d) {
        a.addEventListener && a.addEventListener(b, c, Wf(d))
    }
      , Yf = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, Wf(void 0))
    };
    var Zf = function(a, b, c) {
        var d = !1
          , e = !1;
        e = void 0 === e ? !1 : e;
        d = void 0 === d ? !1 : d;
        a.google_image_requests || (a.google_image_requests = []);
        var f = a.document.createElement("img");
        if (c || d) {
            var g = function(b) {
                c && c(b);
                d && rb(a.google_image_requests, f);
                Yf(f, "load", g);
                Yf(f, "error", g)
            };
            Xf(f, "load", g);
            Xf(f, "error", g)
        }
        e && (f.referrerPolicy = "no-referrer");
        f.src = b;
        a.google_image_requests.push(f)
    };
    var $f = function(a) {
        var b = xf();
        if (!b)
            return 0;
        if (nf(b, 7))
            return 4;
        if (6048E5 < x() - nf(b, 5))
            return 0;
        if (a) {
            if (pb(of(b, 3), a))
                return 2;
            if (pb(of(b, 4), a))
                return 3
        }
        return 1
    };
    var ag = function(a) {
        a = void 0 === a ? n : a;
        var b = a.context || a.AMP_CONTEXT_DATA;
        if (!b)
            try {
                b = a.parent.context || a.parent.AMP_CONTEXT_DATA
            } catch (c) {}
        try {
            if (b && b.pageViewId && b.canonicalUrl)
                return b
        } catch (c) {}
        return null
    };
    var bg = !!window.google_async_iframe_id
      , cg = bg && window.parent || window
      , dg = function() {
        if (bg && !Cf(cg)) {
            var a = "." + tf.domain;
            try {
                for (; 2 < a.split(".").length && !Cf(cg); )
                    tf.domain = a = a.substr(a.indexOf(".") + 1),
                    cg = window.parent
            } catch (b) {}
            Cf(cg) || (cg = window)
        }
        return cg
    };
    var eg = function(a, b, c) {
        a && null !== b && b != b.top && (b = b.top);
        try {
            return (void 0 === c ? 0 : c) ? (new B(b.innerWidth,b.innerHeight)).round() : hd(b || window).round()
        } catch (d) {
            return new B(-12245933,-12245933)
        }
    };
    var fg = function(a) {
        var b = {};
        z(a, function(a) {
            var c = a.event
              , e = b[c];
            b.hasOwnProperty(c) ? null === e || a.g(e) || (b[c] = null) : b[c] = a
        });
        sb(a, function(a) {
            return null === b[a.event]
        })
    };
    var gg = {
        NONE: 0,
        Jg: 1
    }
      , hg = {
        ni: 1
    };
    var ig = function() {
        this.g = 0;
        this.l = !1;
        this.o = -1;
        this.Xa = !1;
        this.h = 0
    }
      , jg = function(a) {
        return a.Xa ? .3 <= a.g : .5 <= a.g
    };
    var kg = {
        Bd: 0,
        Pg: 1
    }
      , lg = {
        yh: 0,
        vh: 1,
        wh: 2
    }
      , mg = {
        370204044: 0,
        370204045: 1
    }
      , ng = {
        370204032: 0,
        370204033: 1
    }
      , og = {
        370204034: 0,
        370204035: 1,
        370204038: 0,
        370204039: 1
    }
      , pg = {
        370204028: 0,
        370204029: 1,
        370204040: 0,
        370204041: 1
    }
      , qg = {
        953563515: 0,
        953563516: 1,
        953563517: 2
    }
      , rg = {
        370204018: 0,
        370204019: 1,
        370204026: 0,
        370204027: 1
    }
      , sg = {
        668123008: 0,
        668123009: 1
    }
      , tg = {
        668123028: 0,
        668123029: 1
    }
      , ug = {
        NONE: 0,
        hh: 1
    }
      , vg = {
        480596784: 0,
        480596785: 1
    }
      , wg = {
        Bd: 0,
        kh: 1,
        jh: 2
    }
      , xg = {
        21061799: 0,
        21061800: 1,
        21061801: 2
    };
    var yg = function(a) {
        this.w = a;
        this.h = null;
        this.l = !1;
        this.o = null
    }
      , I = function(a) {
        a.l = !0;
        return a
    }
      , zg = function(a, b) {
        a.o = void 0 === b ? null : b
    }
      , Ag = function(a, b) {
        a.o && z(b, function(b) {
            b = a.o[b];
            void 0 !== b && null === a.h && Wa(a.w, b) && (a.h = b)
        })
    };
    yg.prototype.g = function() {
        return this.h
    }
    ;
    var Bg = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    };
    Bg.prototype.reset = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    }
    ;
    var J = function(a, b, c) {
        a.g[b] || (a.g[b] = new yg(c));
        return a.g[b]
    }
      , Cg = function(a, b, c) {
        (a = a.g[b]) && null === a.h && Wa(a.w, c) && (a.h = c)
    }
      , Dg = function(a, b) {
        if (Va(a.h, b))
            return a.h[b];
        if (a = a.g[b])
            return a.g()
    }
      , Eg = function(a) {
        var b = {}
          , c = Oa(a.g, function(a) {
            return a.l
        });
        Na(c, function(c, e) {
            c = void 0 !== a.h[e] ? String(a.h[e]) : c.l && null !== c.h ? String(c.h) : "";
            0 < c.length && (b[e] = c)
        }, a);
        return b
    }
      , Fg = function(a) {
        a = Eg(a);
        var b = [];
        Na(a, function(a, d) {
            d in Object.prototype || "undefined" != typeof a && b.push([d, ":", a].join(""))
        });
        return b
    }
      , Gg = function(a) {
        var b = K.D().N;
        b.l && z(Ra(b.g), function(b) {
            return Ag(b, a)
        })
    };
    var Hg = x(), Ig = -1, Jg = -1, Kg, Lg = -1, Mg = !1, L = function() {
        return x() - Hg
    }, Ng = function(a) {
        var b = 0 <= Jg ? L() - Jg : -1
          , c = Mg ? L() - Ig : -1
          , d = 0 <= Lg ? L() - Lg : -1;
        if (79463068 == a)
            return 500;
        if (947190542 == a)
            return 100;
        if (79463069 == a)
            return 200;
        a = [2E3, 4E3];
        var e = [250, 500, 1E3];
        var f = b;
        -1 != c && c < b && (f = c);
        for (b = 0; b < a.length; ++b)
            if (f < a[b]) {
                var g = e[b];
                break
            }
        void 0 === g && (g = e[a.length]);
        return -1 != d && 1500 < d && 4E3 > d ? 500 : g
    };
    var Og = function(a, b) {
        this.h = (void 0 === a ? 0 : a) || 0;
        this.g = (void 0 === b ? "" : b) || ""
    }
      , Pg = function() {
        var a = K.D().B;
        return !!a.h || !!a.g
    };
    Og.prototype.toString = function() {
        return this.h + (this.g ? "-" : "") + this.g
    }
    ;
    Og.prototype.matches = function(a) {
        return this.g || a.g ? this.g == a.g : this.h || a.h ? this.h == a.h : !1
    }
    ;
    var Qg = function(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.line = b.line || -1;
        this.msg = b.message || "";
        this.file = b.file || "";
        this.id = b.id || "jserror";
        this.meta = c
    };
    var Rg = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/
      , Vg = function(a) {
        a = a || Sg();
        for (var b = new Tg(n.location.href,n,!1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
            var f = a[e];
            !c && Rg.test(f.url) && (c = f);
            if (f.url && !f.tc) {
                b = f;
                break
            }
        }
        e = null;
        f = a.length && a[d].url;
        0 != b.depth && f && (e = a[d]);
        return new Ug(b,e,c)
    }
      , Sg = function() {
        var a = n
          , b = []
          , c = null;
        do {
            var d = a;
            if (Cf(d)) {
                var e = d.location.href;
                c = d.document && d.document.referrer || null
            } else
                e = c,
                c = null;
            b.push(new Tg(e || "",d));
            try {
                a = d.parent
            } catch (f) {
                a = null
            }
        } while (a && d != a);d = 0;
        for (a = b.length - 1; d <= a; ++d)
            b[d].depth = a - d;
        d = n;
        if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
            for (a = 1; a < b.length; ++a)
                e = b[a],
                e.url || (e.url = d.location.ancestorOrigins[a - 1] || "",
                e.tc = !0);
        return b
    }
      , Ug = function(a, b, c) {
        this.g = a;
        this.h = b;
        this.l = c
    }
      , Tg = function(a, b, c) {
        this.url = a;
        this.ea = b;
        this.tc = !!c;
        this.depth = r(void 0) ? void 0 : null
    };
    var Wg = function() {
        this.l = "&";
        this.o = p(void 0) ? void 0 : "trn";
        this.w = !1;
        this.h = {};
        this.B = 0;
        this.g = []
    }
      , Xg = function(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }
      , Zg = function(a, b, c, d, e) {
        var f = [];
        Df(a, function(a, k) {
            (a = Yg(a, b, c, d, e)) && f.push(k + "=" + a)
        });
        return f.join(b)
    }
      , Yg = function(a, b, c, d, e) {
        if (null == a)
            return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0,
            d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)
                    f.push(Yg(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)
            return e = e || 0,
            2 > e ? encodeURIComponent(Zg(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }
      , $g = function(a, b, c, d) {
        a.g.push(b);
        a.h[b] = Xg(c, d)
    }
      , bh = function(a, b, c, d) {
        b = b + "//" + c + d;
        var e = ah(a) - d.length;
        if (0 > e)
            return "";
        a.g.sort(function(a, b) {
            return a - b
        });
        d = null;
        c = "";
        for (var f = 0; f < a.g.length; f++)
            for (var g = a.g[f], k = a.h[g], m = 0; m < k.length; m++) {
                if (!e) {
                    d = null == d ? g : d;
                    break
                }
                var l = Zg(k[m], a.l, ",$");
                if (l) {
                    l = c + l;
                    if (e >= l.length) {
                        e -= l.length;
                        b += l;
                        c = a.l;
                        break
                    } else
                        a.w && (c = e,
                        l[c - 1] == a.l && --c,
                        b += l.substr(0, c),
                        c = a.l,
                        e = 0);
                    d = null == d ? g : d
                }
            }
        f = "";
        a.o && null != d && (f = c + a.o + "=" + d);
        return b + f + ""
    }
      , ah = function(a) {
        if (!a.o)
            return 4E3;
        var b = 1, c;
        for (c in a.h)
            b = c.length > b ? c.length : b;
        return 4E3 - a.o.length - b - a.l.length - 1
    };
    var ch = function(a, b, c, d, e) {
        if (Math.random() < (d || a.g))
            try {
                if (c instanceof Wg)
                    var f = c;
                else
                    f = new Wg,
                    Df(c, function(a, b) {
                        var c = f
                          , d = c.B++;
                        a = Xg(b, a);
                        c.g.push(d);
                        c.h[d] = a
                    });
                var g = bh(f, a.o, a.h, a.l + b + "&");
                g && ("undefined" === typeof e ? Zf(n, g, void 0) : Zf(n, g, e))
            } catch (k) {}
    };
    var dh = null
      , eh = function(a) {
        this.h = {};
        this.g = {};
        a = a || [];
        for (var b = 0, c = a.length; b < c; ++b)
            this.g[a[b]] = ""
    }
      , gh = function() {
        var a = fh()
          , b = new eh;
        Df(a.h, function(a, d) {
            b.h[d] = a
        });
        Df(a.g, function(a, d) {
            b.g[d] = a
        });
        return b
    };
    var hh = {
        pi: 0,
        uh: 1,
        Vh: 2,
        Og: 3,
        li: 4,
        Vg: 5,
        nh: 6,
        Wh: 7,
        wg: 8,
        Zg: 9,
        yg: 10,
        ai: 11,
        Yh: 12
    };
    var ih = function() {
        var a = n.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : x()
    }
      , jh = function() {
        var a = void 0 === a ? n : a;
        return (a = a.performance) && a.now ? a.now() : null
    };
    var kh = function(a, b, c, d, e) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = void 0 === d ? 0 : d;
        this.uniqueId = this.label + "_" + this.type + "_" + Math.random();
        this.slotId = e
    };
    var lh = n.performance
      , mh = !!(lh && lh.mark && lh.measure && lh.clearMarks)
      , nh = be(function() {
        var a;
        if (a = mh) {
            var b;
            if (null === dh) {
                dh = "";
                try {
                    a = "";
                    try {
                        a = n.top.location.hash
                    } catch (c) {
                        a = n.location.hash
                    }
                    a && (dh = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                } catch (c) {}
            }
            b = dh;
            a = !!b.indexOf && 0 <= b.indexOf("1337")
        }
        return a
    })
      , oh = function(a, b) {
        this.events = [];
        this.g = b || n;
        var c = null;
        b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [],
        this.events = b.google_js_reporting_queue,
        c = b.google_measure_js_timing);
        this.h = nh() || (null != c ? c : Math.random() < a)
    };
    oh.prototype.w = function() {
        this.h = !1;
        this.events != this.g.google_js_reporting_queue && (nh() && z(this.events, ph),
        this.events.length = 0)
    }
    ;
    oh.prototype.C = function(a) {
        this.h && this.events.push(a)
    }
    ;
    var ph = function(a) {
        a && lh && nh() && (lh.clearMarks("goog_" + a.uniqueId + "_start"),
        lh.clearMarks("goog_" + a.uniqueId + "_end"))
    };
    oh.prototype.start = function(a, b) {
        if (!this.h)
            return null;
        var c = jh() || ih();
        a = new kh(a,b,c);
        b = "goog_" + a.uniqueId + "_start";
        lh && nh() && lh.mark(b);
        return a
    }
    ;
    oh.prototype.end = function(a) {
        if (this.h && r(a.value)) {
            var b = jh() || ih();
            a.duration = b - a.value;
            b = "goog_" + a.uniqueId + "_end";
            lh && nh() && lh.mark(b);
            this.C(a)
        }
    }
    ;
    var sh = function() {
        var a = qh;
        this.o = rh;
        this.l = !0;
        this.h = null;
        this.w = this.La;
        this.g = void 0 === a ? null : a
    };
    h = sh.prototype;
    h.rd = function(a) {
        this.h = a
    }
    ;
    h.sd = function(a) {
        this.l = a
    }
    ;
    h.Rb = function(a, b, c, d) {
        try {
            if (this.g && this.g.h) {
                var e = this.g.start(a.toString(), 3);
                var f = b();
                this.g.end(e)
            } else
                f = b()
        } catch (k) {
            b = this.l;
            try {
                ph(e);
                var g = th(k);
                b = (d || this.w).call(this, a, g, void 0, c)
            } catch (m) {
                this.La(217, m)
            }
            if (!b)
                throw k;
        }
        return f
    }
    ;
    h.kd = function(a, b, c, d, e) {
        var f = this;
        return function(g) {
            for (var k = [], m = 0; m < arguments.length; ++m)
                k[m - 0] = arguments[m];
            return f.Rb(a, function() {
                return b.apply(c, k)
            }, d, e)
        }
    }
    ;
    h.La = function(a, b, c, d, e) {
        e = e || "jserror";
        try {
            var f = new Wg;
            f.w = !0;
            $g(f, 1, "context", a);
            b.error && b.meta && b.id || (b = th(b));
            b.msg && $g(f, 2, "msg", b.msg.substring(0, 512));
            b.file && $g(f, 3, "file", b.file);
            0 < b.line && $g(f, 4, "line", b.line);
            var g = b.meta || {};
            if (this.h)
                try {
                    this.h(g)
                } catch (m) {}
            if (d)
                try {
                    d(g)
                } catch (m) {}
            b = [g];
            f.g.push(5);
            f.h[5] = b;
            var k = Vg();
            k.h && $g(f, 6, "top", k.h.url || "");
            $g(f, 7, "url", k.g.url || "");
            ch(this.o, e, f, c)
        } catch (m) {
            try {
                ch(this.o, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: uh(m),
                    url: k && k.g.url
                }, c)
            } catch (l) {}
        }
        return this.l
    }
    ;
    var th = function(a) {
        return new vh(uh(a),a.fileName,a.lineNumber)
    }
      , uh = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    }
      , vh = function(a, b, c) {
        Qg.call(this, Error(a), {
            message: a,
            file: void 0 === b ? "" : b,
            line: void 0 === c ? -1 : c
        })
    };
    ha(vh, Qg);
    var wh = function() {
        this.h = !1;
        this.g = null
    };
    h = wh.prototype;
    h.rd = function(a) {
        this.g = a
    }
    ;
    h.sd = function(a) {
        this.h = a
    }
    ;
    h.La = function(a, b, c, d, e) {
        if (Math.random() > (void 0 === c ? .01 : c))
            return this.h;
        b.error && b.meta && b.id || (b = new Qg(b,{
            context: a,
            id: void 0 === e ? "jserror" : e
        }));
        if (d || this.g)
            b.meta = {},
            this.g && this.g(b.meta),
            d && d(b.meta);
        n.google_js_errors = n.google_js_errors || [];
        n.google_js_errors.push(b);
        n.error_rep_loaded || (b = n.document,
        a = b.createElement("script"),
        Vc(a, zf(n.location.protocol + "//pagead2.googlesyndication.com/pagead/js/err_rep.js")),
        (b = b.getElementsByTagName("script")[0]) && b.parentNode && b.parentNode.insertBefore(a, b),
        n.error_rep_loaded = !0);
        return this.h
    }
    ;
    h.Rb = function(a, b, c, d) {
        d = void 0 === d ? this.La : d;
        try {
            var e = b()
        } catch (f) {
            if (!d.call(this, a, f, .01, c, "jserror"))
                throw f;
        }
        return e
    }
    ;
    h.kd = function(a, b, c, d, e) {
        var f = this;
        e = void 0 === e ? this.La : e;
        return function(g) {
            for (var k = [], m = 0; m < arguments.length; ++m)
                k[m - 0] = arguments[m];
            return f.Rb(a, function() {
                return b.apply(c, k)
            }, d, e)
        }
    }
    ;
    var rh, xh, yh = dg(), qh = new oh(1,yh);
    rh = new function() {
        var a = void 0 === a ? H : a;
        this.o = "http:" === a.location.protocol ? "http:" : "https:";
        this.h = "pagead2.googlesyndication.com";
        this.l = "/pagead/gen_204?id=";
        this.g = .01
    }
    ;
    xh = new sh;
    "complete" == yh.document.readyState ? yh.google_measure_js_timing || qh.w() : qh.h && Xf(yh, "load", function() {
        yh.google_measure_js_timing || qh.w()
    });
    var zh = function(a) {
        xh.rd(function(b) {
            z(a, function(a) {
                a(b)
            })
        })
    }
      , Bh = function(a, b) {
        return xh.Rb(a, b, void 0, Ah)
    }
      , Ch = function(a, b, c, d) {
        return xh.kd(a, b, c, d, void 0)
    }
      , Ah = xh.La
      , Dh = function(a, b) {
        xh.La(a, b, void 0, void 0)
    };
    if (tf && tf.URL) {
        var Eh, Sf = tf.URL;
        Eh = !!Sf && 0 < Tf().length;
        xh.sd(!Eh)
    }
    var Fh = function(a, b, c, d) {
        c = Ch(d, c);
        Xf(a, b, c, {
            capture: !1
        });
        return c
    };
    var Gh = function(a) {
        var b = K.D().B;
        b && (b.h && (a[4] = b.h),
        b.g && (a[12] = b.g))
    }
      , Hh = function(a) {
        var b = [];
        Na(a, function(a, d) {
            d = encodeURIComponent(d);
            q(a) && (a = encodeURIComponent(a));
            b.push(d + "=" + a)
        });
        b.push("24=" + x());
        return b.join("\n")
    };
    var Ih = !mc && !ec();
    var Jh = function(a) {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        }[a.visibilityState || a.webkitVisibilityState || a.mozVisibilityState || ""] || 0
    };
    function Kh(a, b, c, d) {
        if (!a)
            return {
                value: d,
                done: !1
            };
        d = b(d, a);
        var e = c(d, a);
        return !e && hc(a, "parentElement") ? Kh(nd(a), b, c, d) : {
            done: e,
            value: d
        }
    }
    var Lh = function(a, b, c, d) {
        if (!a)
            return d;
        d = Kh(a, b, c, d);
        if (!d.done)
            try {
                var e = Zc(a)
                  , f = e && C(e);
                return Lh(f && f.frameElement, b, c, d.value)
            } catch (g) {}
        return d.value
    };
    function Mh(a) {
        var b = !mc || Ac(8);
        return Lh(a, function(a, d) {
            a = hc(d, "style") && d.style && Ye(d, "visibility");
            return {
                hidden: "hidden" === a,
                visible: b && "visible" === a
            }
        }, function(a) {
            return a.hidden || a.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
    var Nh = function(a) {
        return Lh(a, function(a, c) {
            return !(!hc(c, "style") || !c.style || "none" !== Ye(c, "display"))
        }, function(a) {
            return a
        }, !1) ? !0 : Mh(a)
    }
      , Oh = function(a) {
        return new G(a.top,a.right,a.bottom,a.left)
    }
      , Ph = function(a) {
        return null != a && 0 <= a && 1 >= a
    }
      , Qh = function(a, b) {
        b = void 0 === b ? H : b;
        null !== b && b != b.top && (b = b.top);
        var c = 0
          , d = 0;
        try {
            var e = b.document
              , f = e.body
              , g = e.documentElement;
            if ("CSS1Compat" == e.compatMode && g.scrollHeight)
                c = g.scrollHeight != a.height ? g.scrollHeight : g.offsetHeight,
                d = g.scrollWidth != a.width ? g.scrollWidth : g.offsetWidth;
            else {
                var k = g.scrollHeight
                  , m = g.scrollWidth
                  , l = g.offsetHeight
                  , t = g.offsetWidth;
                g.clientHeight != l && (k = f.scrollHeight,
                m = f.scrollWidth,
                l = f.offsetHeight,
                t = f.offsetWidth);
                k > a.height ? k > l ? (c = k,
                d = m) : (c = l,
                d = t) : k < l ? (c = k,
                d = m) : (c = l,
                d = t)
            }
            return new B(d,c)
        } catch (E) {
            return new B(-12245933,-12245933)
        }
    };
    var Rh = function(a, b, c, d, e) {
        this.time = a;
        this.h = b;
        this.l = c;
        this.volume = null;
        this.o = d;
        this.g = null;
        this.w = e
    };
    var Sh = function(a, b, c, d, e, f, g, k, m) {
        this.K = a;
        this.C = b;
        this.h = c;
        this.w = d;
        this.B = e;
        this.l = f;
        this.A = g;
        this.I = k;
        this.o = m
    };
    Sh.prototype.g = function() {
        return this.K
    }
    ;
    var K = function() {
        this.F = !1;
        this.C = void 0;
        this.h = !Cf(H.top);
        var a = Sg();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(De)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.H = a;
        this.w = this.G = this.A = this.l = null;
        this.J = 0;
        this.B = new Og(0,"");
        this.g = !1;
        this.o = null;
        this.I = 0;
        this.T = "geo";
        this.N = new Bg;
        zg(I(J(this.N, "nio_mode", lg)), qg);
        zg(I(J(this.N, "mv", ug)), vg);
        J(this.N, "omid", kg);
        I(J(this.N, "fcs", kg));
        I(J(this.N, "osd", kg));
        I(J(this.N, "srmi", kg));
        I(J(this.N, "epoh", kg));
        zg(I(J(this.N, "umt", kg)), sg);
        zg(I(J(this.N, "gmpd", kg)), tg);
        zg(I(J(this.N, "sel", kg)), rg);
        zg(I(J(this.N, "cll", wg)), xg);
        zg(I(J(this.N, "ioa", kg)), pg);
        zg(I(J(this.N, "isu", kg)), ng);
        zg(I(J(this.N, "ald", kg)), og);
        zg(I(J(this.N, "ftm", kg)), mg);
        I(J(this.N, "inapp", hg));
        this.K = -1
    };
    Da(K);
    var Th = function(a) {
        this.h = a;
        this.l = 0;
        this.g = null
    };
    Th.prototype.cancel = function() {
        H.clearTimeout(this.g);
        this.g = null
    }
    ;
    var Uh = function(a) {
        H && (a.g = H.setTimeout(Ch(143, function() {
            a.l++;
            a.h.W()
        }), Ng(K.D().C)))
    };
    var Vh = function(a, b, c) {
        this.ea = a;
        this.R = void 0 === c ? "na" : c;
        this.l = [];
        this.K = !1;
        this.o = new Rh(-1,new B(0,0),new B(0,0),!0,this);
        this.h = this;
        this.A = this.w = b;
        this.P = Af() || Bf();
        this.B = !1;
        this.J = null;
        this.F = this.H = !1;
        this.L = "uk";
        this.M = !1
    };
    h = Vh.prototype;
    h.Za = function() {
        return this.Aa()
    }
    ;
    h.Aa = function() {
        return !0
    }
    ;
    h.zc = function() {
        this.K = !0
    }
    ;
    h.gb = function() {
        return this.L
    }
    ;
    h.Va = function() {
        return this.F
    }
    ;
    var Xh = function(a, b) {
        a.F || (a.F = !0,
        a.L = b,
        a.A = 0,
        a.C(),
        a.h == a && (a.w = 0,
        Wh(a)))
    };
    Vh.prototype.Ma = function() {
        return this.h == this ? this.R : this.h.Ma()
    }
    ;
    Vh.prototype.Ba = function() {
        return {}
    }
    ;
    Vh.prototype.Ca = function() {
        return this.w
    }
    ;
    var Yh = function(a, b) {
        pb(a.l, b) || (a.l.push(b),
        b.Ua(a.h),
        b.Ka(a.o),
        b.Fa() && (a.B = !0))
    }
      , $h = function(a, b) {
        rb(a.l, b);
        a.B && b.Fa() && Zh(a)
    };
    Vh.prototype.W = function() {}
    ;
    var Zh = function(a) {
        a.B = a.l.length ? kb(a.l, function(a) {
            return a.Fa()
        }) : !1
    };
    Vh.prototype.C = function() {}
    ;
    Vh.prototype.g = function() {
        return this.o
    }
    ;
    var ai = function(a) {
        var b = ub(a.l);
        z(b, function(b) {
            b.Ka(a.o)
        })
    }
      , Wh = function(a) {
        var b = ub(a.l);
        z(b, function(b) {
            b.Ua(a.h)
        });
        a.h != a || ai(a)
    };
    Vh.prototype.Ua = function(a) {
        var b = this.w
          , c = a.Ca();
        this.h = c < this.A ? this : a;
        this.w = this.h != this ? c : this.A;
        this.h == this || 1 == c && 0 != this.A || this.C();
        this.w != b && Wh(this)
    }
    ;
    var bi = function(a, b) {
        var c;
        if (!(c = a.H)) {
            c = a.o;
            var d = a.B;
            c = !(b && (void 0 === d || !d || c.volume == b.volume) && c.o == b.o && Je(c.g, b.g) && Xc(c.l, b.l) && Xc(c.h, b.h))
        }
        a.o = b;
        c && ai(a)
    };
    Vh.prototype.Ka = function(a) {
        this.h != this && bi(this, a)
    }
    ;
    Vh.prototype.Fa = function() {
        return this.B
    }
    ;
    Vh.prototype.X = function() {
        this.M = !0
    }
    ;
    Vh.prototype.Pb = function() {
        return this.M
    }
    ;
    var ci = function(a, b, c, d) {
        this.element = a;
        this.o = this.g = b;
        this.N = c;
        this.C = d;
        this.A = !1;
        this.h = new Sh(b.g(),this.element,new G(0,0,0,0),null,this.vb(),0,0,L(),0)
    };
    h = ci.prototype;
    h.fd = function() {}
    ;
    h.yc = function() {}
    ;
    h.tb = function() {
        this.h = new Sh(this.g.g(),this.element,this.h.h,this.h.w,this.vb(),this.h.l,this.h.A,this.h.I,this.h.o)
    }
    ;
    h.X = function() {
        this.Pb() || ($h(this.g, this),
        this.A = !0)
    }
    ;
    h.Pb = function() {
        return this.A
    }
    ;
    h.Ba = function() {
        return this.o.Ba()
    }
    ;
    h.Ca = function() {
        return this.o.Ca()
    }
    ;
    h.gb = function() {
        return this.o.gb()
    }
    ;
    h.Va = function() {
        return this.o.Va()
    }
    ;
    h.Ua = function(a) {
        this.o = a;
        this.C.Ua(this)
    }
    ;
    h.Ka = function() {
        this.tb()
    }
    ;
    h.Fa = function() {
        return this.C.Fa()
    }
    ;
    var di = function(a) {
        this.w = !1;
        this.g = a
    };
    h = di.prototype;
    h.Ca = function() {
        return this.g.Ca()
    }
    ;
    h.gb = function() {
        return this.g.gb()
    }
    ;
    h.Va = function() {
        return this.g.Va()
    }
    ;
    h.create = function(a, b, c) {
        var d = null;
        this.g && (d = this.Mc(a, b, c),
        Yh(this.g, d));
        return d
    }
    ;
    h.Za = function() {
        return this.Aa()
    }
    ;
    h.Aa = function() {
        return !1
    }
    ;
    h.ed = function() {
        return !0
    }
    ;
    h.X = function() {
        this.w = !0
    }
    ;
    h.Pb = function() {
        return this.w
    }
    ;
    h.Ba = function() {
        return {}
    }
    ;
    var ei = function(a, b, c) {
        this.l = void 0 === c ? 0 : c;
        this.h = a;
        this.g = null == b ? "" : b
    }
      , fi = function(a, b) {
        return a.l < b.l ? !0 : a.l > b.l ? !1 : a.h < b.h ? !0 : a.h > b.h ? !1 : typeof a.g < typeof b.g ? !0 : typeof a.g > typeof b.g ? !1 : a.g < b.g
    };
    var gi = function() {
        this.l = 0;
        this.g = [];
        this.h = !1
    };
    gi.prototype.add = function(a, b, c) {
        ++this.l;
        a = new ei(a,b,c);
        this.g.push(new ei(a.h,a.g,a.l + this.l / 4096));
        this.h = !0;
        return this
    }
    ;
    var hi = function(a) {
        var b = new gi;
        var c = void 0 === c ? 0 : c;
        var d = void 0 === d ? !0 : d;
        Df(a, function(a, f) {
            d && void 0 === a || b.add(f, a, c)
        });
        return b
    }
      , ji = function(a) {
        var b = ii;
        a.h && (yb(a.g, function(a, b) {
            return fi(b, a) ? 1 : fi(a, b) ? -1 : 0
        }),
        a.h = !1);
        return jb(a.g, function(a, d) {
            d = b(d);
            return "" + a + ("" != a && "" != d ? "&" : "") + d
        }, "")
    };
    var ii = function(a) {
        var b = a.h;
        a = a.g;
        return "" === a ? b : wa(a) ? a ? b : "" : Fa(a) ? 0 === a.length ? b : b + "=" + a.join() : b + "=" + a
    };
    var ki = new Date(0);
    Pb(ki.getUTCFullYear(), 4);
    Pb(ki.getUTCMonth() + 1, 2);
    Pb(ki.getUTCDate(), 2);
    Pb(ki.getUTCHours(), 2);
    Pb(ki.getUTCMinutes(), 2);
    var li = function(a) {
        Df(a, function(b, c) {
            b instanceof Array && (a[c] = b.join(","))
        });
        return a
    }
      , mi = function(a) {
        var b = []
          , c = [];
        Na(a, function(a, e) {
            if (!(e in Object.prototype) && "undefined" != typeof a)
                switch (Fa(a) && (a = a.join(",")),
                a = [e, "=", a].join(""),
                e) {
                case "adk":
                case "r":
                case "tt":
                case "error":
                case "mtos":
                case "tos":
                case "p":
                case "bs":
                case "aio":
                case "nio":
                case "iem":
                    b.unshift(a);
                    break;
                case "req":
                case "url":
                case "referrer":
                case "iframe_loc":
                    c.push(a);
                    break;
                default:
                    b.push(a)
                }
        });
        return b.concat(c)
    }
      , ni = function(a) {
        a = a.toString();
        a = a.substring(0, 4E3);
        var b = dg() || H;
        Zf(b, a, void 0)
    };
    var oi = {}
      , pi = null;
    oi.le = 0;
    oi.nt = 2;
    oi.Fr = 3;
    oi.Po = 5;
    oi.me = 1;
    oi.om = 4;
    var qi = function(a) {
        oi.e = -1;
        oi.i = 6;
        oi.n = 7;
        oi.t = 8;
        if (!pi) {
            var b = [];
            Df(oi, function(a, c) {
                b[a + 1] = c
            });
            var c = b.join("")
              , d = a && a[c];
            pi = d && function(b, c) {
                return d.call(a, b, c)
            }
        }
        return pi
    };
    var ri = function() {
        this.h = this.l = this.o = this.g = 0
    }
      , si = function(a, b, c, d) {
        b && (a.g += c,
        a.h += c,
        a.o += c,
        a.l = Math.max(a.l, a.o));
        if (void 0 === d ? !b : d)
            a.o = 0
    };
    var ti = [1, .75, .5, .3, 0]
      , ui = function(a) {
        this.h = a = void 0 === a ? ti : a;
        this.g = ib(this.h, function() {
            return new ri
        })
    }
      , wi = function(a, b) {
        return vi(a, function(a) {
            return a.g
        }, void 0 === b ? !0 : b)
    }
      , Oi = function(a, b) {
        return xi(a, b, function(a) {
            return a.g
        })
    }
      , Pi = function(a) {
        return vi(a, function(a) {
            return a.l
        }, !0)
    }
      , Qi = function(a, b) {
        return xi(a, b, function(a) {
            return a.l
        })
    }
      , Ri = function(a, b) {
        return xi(a, b, function(a) {
            return a.h
        })
    }
      , Si = function(a) {
        z(a.g, function(a) {
            a.h = 0
        })
    }
      , Ti = function(a, b, c, d, e, f, g) {
        g = void 0 === g ? !0 : g;
        c = f ? Math.min(b, c) : c;
        for (f = 0; f < a.h.length; f++) {
            var k = a.h[f]
              , m = 0 < c && c >= k;
            k = !(0 < b && b >= k) || d;
            si(a.g[f], g && m, e, !g || k)
        }
    }
      , vi = function(a, b, c) {
        a = ib(a.g, function(a) {
            return b(a)
        });
        return c ? a : Ui(a)
    }
      , xi = function(a, b, c) {
        var d = ob(a.h, function(a) {
            return b <= a
        });
        return -1 == d ? 0 : c(a.g[d])
    }
      , Ui = function(a) {
        return ib(a, function(a, c, d) {
            return 0 < c ? d[c] - d[c - 1] : d[c]
        })
    };
    var Vi = function() {
        this.g = new ui;
        this.M = new ri;
        this.H = this.A = -1;
        this.V = 1E3;
        this.W = new ui([1, .9, .8, .7, .6, .5, .4, .3, .2, .1, 0])
    };
    Vi.prototype.F = function(a, b, c, d, e) {
        this.A = -1 != this.A ? Math.min(this.A, b.g) : b.g;
        e && (this.H = Math.max(this.H, b.g));
        Ti(this.W, b.h, c.h, b.l, a, d);
        Ti(this.g, b.g, c.g, b.l, a, d);
        si(this.M, d || c.Xa != b.Xa ? jg(c) && jg(b) : jg(c), a, !jg(b) || b.l)
    }
    ;
    Vi.prototype.Ya = function() {
        return this.M.l >= this.V
    }
    ;
    var Wi = function(a, b, c, d) {
        ci.call(this, a, b, c, d);
        this.l = new G(0,0,0,0)
    };
    ha(Wi, ci);
    var Yi = function(a, b, c, d) {
        return 0 >= a.h() || 0 >= a.g() ? !0 : c && d ? Bh(208, function() {
            return Xi(a, b, c)
        }) : !1
    }
      , Zi = function(a, b) {
        return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom ? new G(Math.max(a.top, b.top),Math.min(a.right, b.right),Math.min(a.bottom, b.bottom),Math.max(a.left, b.left)) : new G(0,0,0,0)
    }
      , aj = function(a, b) {
        b = $i(b);
        return 0 === b ? 0 : $i(a) / b
    }
      , $i = function(a) {
        return Math.max(a.g() * a.h(), 0)
    }
      , Xi = function(a, b, c) {
        if (!a || !b)
            return !1;
        b = Ke(a.clone(), -b.left, -b.top);
        a = (b.left + b.right) / 2;
        b = (b.top + b.bottom) / 2;
        var d = dg();
        Cf(d.top) && d.top && d.top.document && (d = d.top);
        d = qi(d && d.document);
        if (!d)
            return !1;
        a = d(a, b);
        if (!a)
            return !1;
        b = (b = (b = Zc(c)) && b.defaultView && b.defaultView.frameElement) && bj(b, a);
        d = a === c;
        a = !d && a && qd(a, function(a) {
            return a === c
        });
        return !(b || d || a)
    }
      , bj = function(a, b) {
        if (!a || !b)
            return !1;
        for (var c = 0; null !== a && 100 > c++; ) {
            if (a === b)
                return !0;
            try {
                if (a = nd(a) || a) {
                    var d = Zc(a)
                      , e = d && C(d)
                      , f = e && e.frameElement;
                    f && (a = f)
                }
            } catch (g) {
                break
            }
        }
        return !1
    };
    h = Wi.prototype;
    h.vb = function() {
        return !0
    }
    ;
    h.tb = function() {
        if (this.element) {
            var a = this.element.getBoundingClientRect()
              , b = a.right - a.left;
            a = a.bottom - a.top;
            var c = af(this.element, this.g.ea)
              , d = c.x;
            c = c.y;
            this.l = new G(Math.round(c),Math.round(d + b),Math.round(c + a),Math.round(d))
        }
        (b = this.g.g().g) ? (b = Zi(this.l, b),
        b = b.top >= b.bottom || b.left >= b.right ? new G(0,0,0,0) : Ke(b, -this.l.left, -this.l.top)) : b = new G(0,0,0,0);
        var e = this.g.g().g;
        c = d = a = 0;
        var f = 1 == Dg(this.N, "od")
          , g = (this.l.bottom - this.l.top) * (this.l.right - this.l.left);
        e && b && 0 < g && (Yi(b, e, this.element, f) ? b = new G(0,0,0,0) : (c = new G(0,window.screen.height,window.screen.width,0),
        a = aj(b, this.l),
        d = aj(b, e),
        c = aj(b, c)));
        e = this.g.g();
        f = -1 === e.time ? L() : e.time;
        this.h = new Sh(e,this.element,this.l,b,this.vb(),a,d,f,c)
    }
    ;
    h.Va = function() {
        return this.o.Va()
    }
    ;
    h.Ma = function() {
        return this.o.Ma()
    }
    ;
    h.Ka = function(a) {
        if (null == this.element)
            if (null != a.l) {
                var b = a.l;
                this.l = new G(0,b.width,b.height,0)
            } else
                this.l = new G(0,0,0,0);
        ci.prototype.Ka.call(this, a)
    }
    ;
    var cj = new G(0,0,0,0)
      , dj = {
        threshold: [0, .3, .5, .75, 1]
    }
      , ej = function(a, b, c) {
        this.position = cj.clone();
        this.Ga = 0;
        this.wc = this.Jb();
        this.vc = -2;
        this.cg = x();
        this.vd = -1;
        this.Bb = b;
        this.fb = -1 != b;
        this.Eb = this.gd = null;
        this.opacity = -1;
        this.nd = c;
        this.wd = this.xc = Ca;
        this.Ra = this.element = a;
        this.xd = this.kb = !1;
        this.Yb = 1;
        this.td = !0;
        this.Da = !1;
        K.D().J++;
        this.$c = 0;
        this.$ = this.dc();
        this.ud = -1;
        this.Vb = new G(0,0,0,0);
        a = this.N = new Bg;
        J(a, "od", gg);
        I(J(a, "opac", kg));
        J(a, "ud", kg);
        I(J(a, "mkm", kg));
        I(J(a, "xza", kg));
        I(J(a, "mza", kg));
        J(a, "lom", kg);
        I(J(a, "sela", kg));
        I(J(a, "sbeos", kg));
        a = dg().mraid;
        if (b = this.element && this.element.getAttribute)
            b = this.element,
            b = /-[a-z]/.test("googleAvInapp") ? !1 : Ih && b.dataset ? "googleAvInapp"in b.dataset : b.hasAttribute ? b.hasAttribute("data-" + Wb()) : !!b.getAttribute("data-" + Wb());
        (b || a) && Cg(K.D().N, "inapp", 1);
        1 == this.nd ? Cg(this.N, "od", 1) : Cg(this.N, "od", 0)
    };
    h = ej.prototype;
    h.Ka = function() {}
    ;
    h.Ua = function(a) {
        a.Va() && this.wd(this, a.gb(), a)
    }
    ;
    h.Fa = function() {
        return !1
    }
    ;
    h.Jb = function() {
        return new Vi
    }
    ;
    h.oa = function() {
        return this.wc
    }
    ;
    var hj = function(a, b, c) {
        if (a.fb) {
            var d = qi(H && H.document);
            d && (c || fj(a, H, !0),
            d = gj(a, d),
            a.$a(a.position, d, b, c, !0, !0))
        }
    }
      , ij = function(a, b, c) {
        if (c(b))
            return b;
        for (; ; ) {
            var d = Math.floor((a + b) / 2);
            if (d == a || d == b)
                return a;
            c(d) ? a = d : b = d
        }
    }
      , gj = function(a, b) {
        var c = id(document)
          , d = a.Yb
          , e = Math.floor(a.position.left - c.x) + 1
          , f = Math.floor(a.position.top - c.y) + 1
          , g = Math.floor(a.position.right - c.x) - d
          , k = Math.floor(a.position.bottom - c.y) - d;
        a = (k - f) * (g - e);
        if (f > k || e > g)
            return 0;
        c = !!b(e, f);
        d = !!b(g, k);
        if (c && d)
            return 1;
        var m = !!b(g, f)
          , l = !!b(e, k);
        if (c)
            k = ij(f, k, function(a) {
                return !!b(e, a)
            }),
            g = ij(e, g, function(a) {
                return !!b(a, f)
            });
        else if (m)
            k = ij(f, k, function(a) {
                return !!b(g, a)
            }),
            e = ij(g, e, function(a) {
                return !!b(a, f)
            });
        else if (l)
            f = ij(k, f, function(a) {
                return !!b(e, a)
            }),
            g = ij(e, g, function(a) {
                return !!b(a, k)
            });
        else if (d)
            f = ij(k, f, function(a) {
                return !!b(g, a)
            }),
            e = ij(g, e, function(a) {
                return !!b(a, k)
            });
        else {
            var t = Math.floor((e + g) / 2)
              , E = Math.floor((f + k) / 2);
            if (!b(t, E))
                return 0;
            f = ij(E, f, function(a) {
                return !!b(t, a)
            });
            k = ij(E, k, function(a) {
                return !!b(t, a)
            });
            e = ij(t, e, function(a) {
                return !!b(a, E)
            });
            g = ij(t, g, function(a) {
                return !!b(a, E)
            })
        }
        return (k - f) * (g - e) / a
    }
      , jj = function(a, b, c, d, e) {
        a.fb && (d || fj(a, H, e),
        a.$a(a.position, c, b, d, !1, !0))
    };
    ej.prototype.bd = function() {}
    ;
    ej.prototype.ad = function() {}
    ;
    ej.prototype.Sc = function() {}
    ;
    ej.prototype.Tb = function() {}
    ;
    var kj = function(a, b, c) {
        if (a.fb) {
            var d = a.$.h
              , e = c ? a.$.g : a.$c;
            a.Vb && !Je(a.Vb, new G(0,0,0,0)) && (e = Ke(a.Vb.clone(), a.position.left, a.position.top));
            a.$a(a.position, e, b, c, !0, !0, {}, void 0, d)
        }
    }
      , lj = function(a, b) {
        b = b.create(a.Ra, a.N, a);
        null != b && b.fd();
        b && (a.T = b)
    }
      , mj = function(a, b, c) {
        if (a.fb && a.T) {
            var d = dg()
              , e = K.D();
            fj(a, d, e.h);
            a.T.tb();
            d = a.T.h;
            e = d.g().g;
            var f = !(!d.B && !e);
            if (null != d.w && e) {
                var g = d.h;
                a.gd = new Wc(g.left - e.left,g.top - e.top);
                a.Eb = new B(e.right - e.left,e.bottom - e.top)
            }
            a.$a(a.position, d.l, b, c, !0, f, void 0, void 0, d.o)
        }
    };
    h = ej.prototype;
    h.$a = function(a, b, c, d, e, f, g, k, m) {
        g = void 0 === g ? {} : g;
        k = void 0 === k ? this.Rc(c, g) : k;
        g = this.Xb(a, b, d, g, void 0 === m ? -1 : m);
        r(b) || (this.gd = new Wc(a.left - b.left,a.top - b.top),
        this.Eb = new B(b.right - b.left,b.bottom - b.top));
        e = e && this.$.g >= (this.Xa() ? .3 : .5);
        this.Hc(k, g, e, f);
        this.Bb = c;
        0 < g.g && -1 === this.ud && (this.ud = c);
        -1 == this.vd && this.Ya() && (this.vd = c);
        if (-2 == this.vc)
            try {
                a: {
                    var l = r(b) ? null : b;
                    if (a && a != cj && 0 != this.Ga) {
                        if (!l) {
                            if (!this.Eb) {
                                var t = -1;
                                break a
                            }
                            l = new G(0,this.Eb.width,this.Eb.height,0)
                        }
                        t = l.h && 0 < l.h() && l.g && 0 < l.g() ? this.ub(a, l) : -1
                    } else
                        t = -1
                }
                this.vc = t
            } catch (E) {
                Dh(207, E)
            }
        this.$ = g;
        d && (this.$.g = 0);
        this.xc(this)
    }
    ;
    h.Hc = function(a, b, c, d) {
        this.oa().F(a, b, this.$, c, d)
    }
    ;
    h.dc = function() {
        return new ig
    }
    ;
    h.Xb = function(a, b, c, d, e) {
        e = void 0 === e ? -1 : e;
        d = this.dc();
        d.l = c;
        c = Jh(tf);
        d.o = 0 == c ? -1 : 1 == c ? 0 : 1;
        r(b) ? (d.g = this.ub(b),
        d.h = e) : (d.g = this.ub(a, b),
        d.h = 0 <= e ? e : d.g * $i(a) / (H.screen.height * H.screen.width));
        d.Xa = this.Xa();
        return d
    }
    ;
    h.Rc = function(a) {
        if (-1 == this.Bb)
            return 0;
        a = a - this.Bb || 1;
        return 1E4 < a ? 1 : a
    }
    ;
    h.ub = function(a, b) {
        if (0 === this.opacity && 1 === Dg(this.N, "opac"))
            return 0;
        if (r(a))
            return a;
        a = Zi(a, b);
        var c = 1 == Dg(this.N, "od");
        return 0 >= this.Ga || Yi(a, b, this.Ra, c) ? 0 : $i(a) / this.Ga
    }
    ;
    h.Xa = function() {
        return !1
    }
    ;
    var fj = function(a, b, c, d) {
        if (d)
            a.position = d;
        else {
            b = c ? b : b.top;
            try {
                var e = cj.clone()
                  , f = new Wc(0,0);
                if (a.Ra) {
                    var g = 1 == a.nd;
                    !c && g && Nh(a.Ra) || (e = a.Ra.getBoundingClientRect());
                    f = af(a.Ra, b)
                }
                c = f;
                var k = c.x
                  , m = c.y;
                a.position = new G(Math.round(m),Math.round(k + (e.right - e.left)),Math.round(m + (e.bottom - e.top)),Math.round(k))
            } catch (l) {
                a.position = cj.clone()
            }
        }
        a.Ga = (a.position.bottom - a.position.top) * (a.position.right - a.position.left)
    };
    ej.prototype.ua = function() {
        return 0
    }
    ;
    ej.prototype.Ya = function() {
        return this.wc.Ya()
    }
    ;
    var nj = function(a, b) {
        b = Math.pow(10, b);
        return Math.floor(a * b) / b
    }
      , oj = function(a) {
        a.T && a.T.yc()
    }
      , qj = function(a, b) {
        var c = !1
          , d = a.Ra;
        if (null === d)
            return !1;
        Bh(152, function() {
            var e = new b.IntersectionObserver(function(c) {
                try {
                    pj(b, c, a)
                } catch (g) {
                    try {
                        e.unobserve(d),
                        Dh("osd_adblock::nioc", g)
                    } catch (k) {}
                }
            }
            ,dj);
            e.observe(d);
            c = !0
        });
        return c
    }
      , rj = function(a, b) {
        var c = !1;
        Bh(151, function() {
            var d = ag(b).observeIntersection(function(c) {
                try {
                    pj(b, c, a)
                } catch (f) {
                    try {
                        d(),
                        Dh("osd_adblock::aioc", f)
                    } catch (g) {}
                }
            });
            c = !0
        });
        return c
    }
      , pj = function(a, b, c) {
        if (!b || !b.length || 0 >= b.length)
            b = null;
        else {
            for (var d = b[0], e = 1; e < b.length; e++)
                b[e].time > d.time && (d = b[e]);
            b = d
        }
        if (e = b) {
            d = e.intersectionRect.width * e.intersectionRect.height / (e.boundingClientRect.width * e.boundingClientRect.height);
            b = Oh(e.boundingClientRect);
            e = Oh(e.intersectionRect);
            var f = d * $i(b) / (a.screen.height * a.screen.width);
            c.$.g = Math.min(Math.max(d, 0), 1);
            c.$c = c.$.g;
            c.$.h = Math.min(Math.max(f, 0), 1);
            fj(c, a, !0, b);
            a = Zi(b, e);
            c.Vb = 0 >= c.Ga || a.top >= a.bottom || a.left >= a.right ? new G(0,0,0,0) : Ke(a, -b.left, -b.top)
        }
    }
      , sj = function(a, b, c, d) {
        if (d = void 0 === d ? Ca : d)
            a.wd = d;
        switch (c) {
        case "nio":
            return qj(a, b);
        case "aio":
            return rj(a, b);
        case "geo":
        case "iem":
            return !0
        }
        return !1
    };
    var tj = "StopIteration"in n ? n.StopIteration : {
        message: "StopIteration",
        stack: ""
    }
      , uj = function() {};
    uj.prototype.next = function() {
        throw tj;
    }
    ;
    uj.prototype.rb = function() {
        return this
    }
    ;
    var vj = function(a) {
        if (a instanceof uj)
            return a;
        if ("function" == typeof a.rb)
            return a.rb(!1);
        if (Ga(a)) {
            var b = 0
              , c = new uj;
            c.next = function() {
                for (; ; ) {
                    if (b >= a.length)
                        throw tj;
                    if (b in a)
                        return a[b++];
                    b++
                }
            }
            ;
            return c
        }
        throw Error("Not implemented");
    }
      , wj = function(a, b, c) {
        if (Ga(a))
            try {
                z(a, b, c)
            } catch (d) {
                if (d !== tj)
                    throw d;
            }
        else {
            a = vj(a);
            try {
                for (; ; )
                    b.call(c, a.next(), void 0, a)
            } catch (d) {
                if (d !== tj)
                    throw d;
            }
        }
    };
    var xj = function(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent; )
            a = a.parent,
            d++,
            Cf(a) && (c = a,
            b = d);
        return {
            ea: c,
            level: b
        }
    };
    var yj = function(a) {
        eh.call(this, a);
        this.dfltBktExt = this.h;
        this.lrsExt = this.g
    };
    ha(yj, eh);
    var zj = function() {
        this.S = {}
    }
      , Bj = function() {
        if (Aj)
            return Aj;
        var a = ag();
        a = (a ? Cf(a.master) ? a.master : null : null) || dg();
        var b = a.google_persistent_state_async;
        return null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? Aj = b : a.google_persistent_state_async = Aj = new zj
    }
      , Dj = function(a, b, c) {
        b = Cj[b] || "google_ps_" + b;
        a = a.S;
        var d = a[b];
        return void 0 === d ? a[b] = c : d
    }
      , Ej = function() {
        var a = Bj();
        var b = dg();
        var c = ag(b);
        c ? ((c = c || ag()) ? (b = c.pageViewId,
        c = c.clientId,
        q(c) && (b += c.replace(/\D/g, "").substr(0, 6))) : b = null,
        b = +b) : (b = xj(b).ea,
        (c = b.google_global_correlator) || (b.google_global_correlator = c = 1 + Math.floor(Math.random() * Math.pow(2, 43))),
        b = c);
        return Dj(a, 7, b)
    }
      , Aj = null
      , Fj = {}
      , Cj = (Fj[8] = "google_prev_ad_formats_by_region",
    Fj[9] = "google_prev_ad_slotnames_by_region",
    Fj);
    var Ef = {
        ah: 5,
        Rg: 7,
        ih: 17,
        Gg: 19,
        Cg: 41,
        Kg: 48,
        Rh: 62,
        Ch: 67,
        Ph: 69,
        ti: 74,
        mi: 79,
        Sh: 82,
        Th: 83,
        Lh: 87,
        Xh: 88,
        Eg: 89,
        Mh: 90,
        Hg: 103,
        rg: 104,
        bh: 106,
        ui: 107,
        Ug: 108,
        Dh: 114,
        Oh: 118,
        tg: 119,
        Ah: 121,
        Bh: 122,
        zh: 123,
        hg: 124,
        di: 125,
        ri: 126,
        qg: 127,
        sg: 128
    }
      , Gj = null
      , Hj = function(a) {
        try {
            return !!a && gc(!0)
        } catch (b) {
            return !1
        }
    }
      , Ij = function() {
        if (Hj(Gj))
            return !0;
        var a = Bj();
        if (a = Dj(a, 3, null)) {
            if (a && a.dfltBktExt && a.lrsExt) {
                var b = new yj;
                b.h = a.dfltBktExt;
                b.dfltBktExt = b.h;
                b.g = a.lrsExt;
                b.lrsExt = b.g;
                a = b
            } else
                a = null;
            a || (a = new yj,
            b = {
                context: "ps::gpes::cf",
                url: dg().location.href
            },
            ch(rh, "jserror", b, void 0, void 0))
        }
        return Hj(a) ? (Gj = a,
        !0) : !1
    }
      , fh = function() {
        if (Ij())
            return Gj;
        var a = Bj()
          , b = new yj(Ff());
        return Gj = a.S[Cj[3] || "google_ps_3"] = b
    }
      , Jj = null;
    var Kj = {
        currentTime: 1,
        duration: 2,
        isVpaid: 4,
        volume: 8,
        isYouTube: 16,
        isPlaying: 32
    }
      , Xa = {
        Jc: "start",
        FIRST_QUARTILE: "firstquartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdquartile",
        COMPLETE: "complete",
        Id: "metric",
        Ic: "pause",
        Kd: "resume",
        SKIPPED: "skip",
        VIEWABLE_IMPRESSION: "viewable_impression",
        Jd: "mute",
        Ld: "unmute",
        FULLSCREEN: "fullscreen",
        Fd: "exitfullscreen",
        Ag: "bufferstart",
        zg: "bufferfinish",
        Gd: "fully_viewable_audible_half_duration_impression",
        Hd: "measurable_impression",
        yd: "abandon",
        Ed: "engagedview",
        IMPRESSION: "impression",
        Cd: "creativeview",
        LOADED: "loaded",
        Qh: "progress",
        Bg: "close",
        Dg: "collapse",
        Gh: "overlay_resize",
        Hh: "overlay_unmeasurable_impression",
        Ih: "overlay_unviewable_impression",
        Kh: "overlay_viewable_immediate_impression",
        Jh: "overlay_viewable_end_of_session_impression",
        Dd: "custom_metric_viewable"
    }
      , Lj = "start firstquartile midpoint thirdquartile resume loaded".split(" ")
      , Mj = ["start", "firstquartile", "midpoint", "thirdquartile"]
      , Nj = ["abandon"]
      , Oj = {
        oi: -1,
        Jc: 0,
        FIRST_QUARTILE: 1,
        MIDPOINT: 2,
        THIRD_QUARTILE: 3,
        COMPLETE: 4,
        Id: 5,
        Ic: 6,
        Kd: 7,
        SKIPPED: 8,
        VIEWABLE_IMPRESSION: 9,
        Jd: 10,
        Ld: 11,
        FULLSCREEN: 12,
        Fd: 13,
        Gd: 14,
        Hd: 15,
        yd: 16,
        Ed: 17,
        IMPRESSION: 18,
        Cd: 19,
        LOADED: 20,
        Dd: 21
    };
    var Pj = function() {
        this.o = this.g = this.l = this.h = this.w = 0
    }
      , Qj = function(a) {
        var b = {};
        var c = x() - a.w;
        b = (b.ptlt = c,
        b);
        (c = a.h) && (b.pnk = c);
        (c = a.l) && (b.pnc = c);
        (c = a.o) && (b.pnmm = c);
        (a = a.g) && (b.pns = a);
        return b
    };
    var Rj = function() {
        ig.call(this);
        this.w = !1;
        this.volume = void 0;
        this.A = !1;
        this.B = -1
    };
    ha(Rj, ig);
    var Sj = function(a) {
        return Ph(a.volume) && .1 <= a.volume
    };
    var Tj = function() {
        var a = {};
        this.h = (a.vs = [1, 0],
        a.vw = [0, 1],
        a.am = [2, 2],
        a.a = [4, 4],
        a.f = [8, 8],
        a.bm = [16, 16],
        a.b = [32, 32],
        a.avw = [0, 64],
        a.cm = [128, 128],
        a.pv = [256, 256],
        a.gdr = [0, 512],
        a.p = [0, 1024],
        a.r = [0, 2048],
        a.m = [0, 4096],
        a.um = [0, 8192],
        a.ef = [0, 16384],
        a.s = [0, 32768],
        a.pmx = [0, 16777216],
        a);
        this.g = {};
        for (var b in this.h)
            0 < this.h[b][1] && (this.g[b] = 0);
        this.l = 0
    }
      , Uj = function(a, b) {
        var c = a.h[b]
          , d = c[1];
        a.l += c[0];
        0 < d && 0 == a.g[b] && (a.g[b] = 1)
    }
      , Wj = function(a) {
        return Vj(a, Sa(a.h))
    }
      , Vj = function(a, b) {
        var c = 0, d;
        for (d in a.g)
            pb(b, d) && 1 == a.g[d] && (c += a.h[d][1],
            a.g[d] = 2);
        return c
    }
      , Xj = function(a) {
        var b = 0, c;
        for (c in a.g) {
            var d = a.g[c];
            if (1 == d || 2 == d)
                b += a.h[c][1]
        }
        return b
    };
    var Yj = function() {
        this.h = this.l = 0
    };
    Yj.prototype.g = function() {
        return this.l
    }
    ;
    var Zj = function(a, b, c) {
        32 <= b || (a.h & 1 << b && !c ? a.l &= ~(1 << b) : a.h & 1 << b || !c || (a.l |= 1 << b),
        a.h |= 1 << b)
    };
    var ak = function() {
        Vi.call(this);
        this.l = new ri;
        this.L = this.I = this.G = 0;
        this.C = -1;
        this.Y = new ri;
        this.w = new ri;
        this.h = new ui;
        this.B = this.o = -1;
        this.K = new ri;
        this.V = 2E3;
        this.J = new Yj;
        this.R = new Yj;
        this.P = new Yj
    };
    ha(ak, Vi);
    var bk = function(a, b, c) {
        var d = a.L;
        Mg || c || -1 == a.C || (d += b - a.C);
        return d
    };
    ak.prototype.F = function(a, b, c, d, e) {
        if (!b.A) {
            Vi.prototype.F.call(this, a, b, c, d, e);
            e = Sj(b) && Sj(c);
            var f = .5 <= (d ? Math.min(b.g, c.g) : c.g);
            Ph(b.volume) && (this.o = -1 != this.o ? Math.min(this.o, b.volume) : b.volume,
            this.B = Math.max(this.B, b.volume));
            f && (this.G += a,
            this.I += e ? a : 0);
            Ti(this.h, b.g, c.g, b.l, a, d, e);
            si(this.l, !0, a);
            si(this.w, e, a);
            si(this.K, c.w, a);
            si(this.Y, e && !f, a);
            a = Math.floor(b.B / 1E3);
            Zj(this.J, a, jg(b));
            Zj(this.R, a, 1 <= b.g);
            Zj(this.P, a, Sj(b))
        }
    }
    ;
    var ck = function() {
        this.g = !1
    };
    var dk = function(a, b) {
        this.g = !1;
        this.o = a;
        this.I = b;
        this.h = 0
    };
    ha(dk, ck);
    var fk = function(a, b) {
        return a.l(b) ? (b = ek(a.I, a.o, b),
        a.h |= b,
        0 == b) : !1
    };
    dk.prototype.l = function() {
        return !0
    }
    ;
    dk.prototype.w = function() {
        return !1
    }
    ;
    dk.prototype.B = function() {
        var a = this
          , b = Ya(function(b) {
            return b == a.o
        });
        return Oj[b].toString()
    }
    ;
    dk.prototype.toString = function() {
        var a = "";
        this.w() && (a += "c");
        this.g && (a += "s");
        0 < this.h && (a += ":" + this.h);
        return this.B() + a
    }
    ;
    var gk = new G(0,0,0,0)
      , hk = {}
      , ik = (hk.firstquartile = 0,
    hk.midpoint = 1,
    hk.thirdquartile = 2,
    hk.complete = 3,
    hk)
      , jk = function(a, b, c, d, e, f) {
        e = void 0 === e ? null : e;
        f = void 0 === f ? [] : f;
        ej.call(this, b, c, d);
        this.P = 0;
        this.l = {};
        this.ba = new Tj;
        this.cd = {};
        this.ka = "";
        this.Na = null;
        this.Qa = !1;
        this.h = [];
        this.C = e;
        this.A = f;
        this.o = void 0;
        this.w = -1;
        this.Y = this.K = void 0;
        this.R = !1;
        this.G = this.F = 0;
        this.L = -1;
        this.W = this.na = !1;
        this.qb = this.za = 0;
        this.fa = !1;
        this.ra = this.xa = -1;
        this.J = this.I = this.g = 0;
        this.ec = this.$b = -1;
        this.ac = 0;
        this.bb = new ui;
        this.M = this.ga = this.Ib = 0;
        this.Pa = -1;
        this.la = 0;
        this.sa = !1;
        this.V = null;
        this.aa = 0;
        this.Z = Ca;
        this.H = [this.Jb()];
        this.xd = !0;
        this.Yb = 2;
        b = K.D();
        fj(this, a, b.h);
        this.ab = {};
        this.ab.pause = "p";
        this.ab.resume = "r";
        this.ab.skip = "s";
        this.ab.mute = "m";
        this.ab.unmute = "um";
        this.ab.exitfullscreen = "ef";
        this.B = null
    };
    ha(jk, ej);
    jk.prototype.Fa = function() {
        return !0
    }
    ;
    var kk = function(a, b, c) {
        a.aa = 1;
        a.l = {};
        a.l.firstquartile = !1;
        a.l.midpoint = !1;
        a.l.thirdquartile = !1;
        a.l.complete = !1;
        a.l.pause = !1;
        a.l.skip = !1;
        a.l.viewable_impression = !1;
        a.P = 0;
        c || (a.oa().C = b)
    };
    jk.prototype.Gc = function() {
        if (this.C) {
            var a = this.C;
            a.g || (a.g = fk(a, this))
        }
    }
    ;
    jk.prototype.bd = function(a) {
        var b = this
          , c = a - this.xa;
        this.fa && 1E3 >= c || (c = Ba("ima.bridge.getNativeViewability"),
        v(c) && (c(this.ka, function(a) {
            b.fa = !1;
            Za(a) && b.la++;
            b.Tb(a)
        }),
        this.fa = !0,
        this.xa = a))
    }
    ;
    jk.prototype.ad = function(a) {
        var b = K.D();
        a - this.ra > Ng(b.C) && (a = Ba("ima.admob.getViewability"),
        v(a) && a(this.ka))
    }
    ;
    var lk = function(a) {
        return p(a) ? Number(a) ? nj(a, 3) : 0 : a
    };
    h = jk.prototype;
    h.Sc = function(a) {
        this.ra = L();
        this.Tb(a)
    }
    ;
    h.Tb = function(a) {
        var b = a.opt_nativeViewBounds || {}
          , c = a.opt_nativeViewVisibleBounds || {}
          , d = a.opt_nativeTime || -1
          , e = a.opt_nativeVolume
          , f = a.opt_nativeViewAttached;
        a = a.opt_nativeViewHidden;
        void 0 !== f && (this.V = !!f);
        b = new G(b.top || 0,b.left + b.width || 0,b.top + b.height || 0,b.left || 0);
        c = a ? gk.clone() : new G(c.top || 0,c.left + c.width || 0,c.top + c.height || 0,c.left || 0);
        f = void 0;
        if ("n" == this.o || "ml" == this.o)
            f = {
                volume: e
            };
        e = f;
        e = void 0 === e ? {} : e;
        this.Ga = (b.bottom - b.top) * (b.right - b.left);
        this.position = b;
        this.$a(b, c, d, !1, !0, !0, e)
    }
    ;
    h.$a = function(a, b, c, d, e, f, g, k, m) {
        var l = this;
        g = void 0 === g ? {} : g;
        var t = this.Z(this) || {};
        cb(t, g);
        this.w = t.duration || this.w;
        this.K = t.isVpaid || this.K;
        this.Y = t.isYouTube || this.Y;
        this.R = f;
        ej.prototype.$a.call(this, a, b, c, d, e, f, t, k, m);
        z(this.A, function(a) {
            a.g || (a.g = fk(a, l))
        })
    }
    ;
    h.Hc = function(a, b, c, d) {
        ej.prototype.Hc.call(this, a, b, c, d);
        mk(this).F(a, b, this.$, c, d);
        this.W = Sj(this.$) && Sj(b);
        -1 == this.L && this.na && (this.L = this.oa().l.g);
        this.ba.l = 0;
        a = this.$;
        b = this.Ya();
        .5 <= a.g && Uj(this.ba, "vs");
        b && Uj(this.ba, "vw");
        Ph(a.volume) && Uj(this.ba, "am");
        this.W && Uj(this.ba, "a");
        this.Da && Uj(this.ba, "f");
        -1 != a.o && (Uj(this.ba, "bm"),
        1 == a.o && Uj(this.ba, "b"));
        this.W && b && Uj(this.ba, "avw");
        this.R && Uj(this.ba, "cm");
        this.R && 0 < a.g && Uj(this.ba, "pv");
        nk(this, this.oa().l.g, !0) && Uj(this.ba, "gdr");
        2E3 <= Qi(this.oa().g, 1) && Uj(this.ba, "pmx")
    }
    ;
    h.Jb = function() {
        return new ak
    }
    ;
    h.oa = function() {
        return this.wc
    }
    ;
    var mk = function(a, b) {
        var c;
        null != b && b < a.H.length ? c = b : c = a.H.length - 1;
        return a.H[c]
    };
    jk.prototype.dc = function() {
        return new Rj
    }
    ;
    jk.prototype.Xb = function(a, b, c, d, e) {
        a = ej.prototype.Xb.call(this, a, b, c, d, void 0 === e ? -1 : e);
        a.w = this.Da;
        a.A = 2 == this.aa;
        a.volume = d.volume;
        Ph(a.volume) || (this.za++,
        b = this.$,
        Ph(b.volume) && (a.volume = b.volume));
        d = d.currentTime;
        a.B = p(d) && 0 <= d ? d : -1;
        return a
    }
    ;
    var ok = function(a) {
        var b = !!Dg(K.D().N, "umt");
        return a.K || !b && !a.Y ? 0 : 1
    };
    jk.prototype.Rc = function(a, b) {
        b = p(b.currentTime) ? b.currentTime : this.F;
        if (-1 == this.Bb || 2 == this.aa)
            a = 0;
        else {
            a = a - this.Bb || 1;
            var c = 1E4;
            p(this.w) && -1 != this.w && (c = Math.max(c, this.w / 3));
            a = a > c ? 1 : a
        }
        c = b - this.F;
        var d = 0;
        0 <= c ? (this.G += a,
        this.M += Math.max(a - c, 0),
        d = Math.min(c, this.G)) : this.ga += Math.abs(c);
        0 != c && (this.G = 0);
        -1 == this.Pa && 0 < c && (this.Pa = 0 <= Lg ? L() - Lg : -1);
        this.F = b;
        return 1 == ok(this) ? d : a
    }
    ;
    jk.prototype.ub = function(a, b) {
        return this.sa ? 0 : this.Da ? 1 : ej.prototype.ub.call(this, a, b)
    }
    ;
    jk.prototype.ua = function() {
        return 1
    }
    ;
    var pk = function(a, b) {
        kb(a.A, function(a) {
            return a.o == b.o
        }) || a.A.push(b)
    }
      , nk = function(a, b, c) {
        return 15E3 <= b ? !0 : a.na ? (void 0 === c ? 0 : c) ? !0 : qk(a.w) ? b >= a.w / 2 : qk(a.L) ? b >= a.L : !1 : !1
    }
      , qk = function(a) {
        return 1 == Dg(K.D().N, "gmpd") ? 0 < a : -1 != a
    }
      , rk = function(a) {
        var b = {}
          , c = K.D();
        b.insideIframe = c.h;
        b.unmeasurable = a.kb;
        b.position = a.position;
        b.exposure = a.$.g;
        b.documentSize = c.w;
        b.viewportSize = c.l;
        null != a.B && (b.presenceData = a.B);
        b.screenShare = a.$.h;
        return b
    }
      , tk = function(a, b) {
        sk(a.h, b, function() {
            return {
                gg: 0,
                Nb: void 0
            }
        });
        a.h[b] = {
            viewableArea: nj(a.$.g, 2),
            instantaneousState: a.ba.l
        }
    }
      , sk = function(a, b, c) {
        for (var d = a.length; d < b + 1; )
            a.push(c()),
            d++
    }
      , wk = function(a, b, c) {
        var d = a.cd[b];
        if (null != d)
            return d;
        d = uk(a, b);
        var e = Ya(function(a) {
            return a == b
        });
        c = vk(a, d, d, c, ik[Xa[e]]);
        "fully_viewable_audible_half_duration_impression" == b && (c.std = "csm",
        c.ic = Vj(a.ba, ["gdr"]));
        return c
    }
      , vk = function(a, b, c, d, e) {
        if (a.kb)
            return {
                "if": 0
            };
        var f = a.position.clone();
        f.round();
        var g = ib(a.h, function(a) {
            return 100 * a.gg | 0
        })
          , k = K.D()
          , m = a.oa()
          , l = {};
        l["if"] = k.h ? 1 : void 0;
        l.sdk = a.o ? a.o : void 0;
        l.t = a.cg;
        l.p = [f.top, f.left, f.bottom, f.right];
        l.tos = wi(m.g, !1);
        l.mtos = Pi(m.g);
        l.mcvt = m.M.l;
        l.ps = void 0;
        l.pt = g;
        f = bk(m, L(), 2 == a.aa);
        l.vht = f;
        l.mut = m.Y.l;
        l.a = lk(a.$.volume);
        l.mv = lk(m.B);
        l.fs = a.Da ? 1 : 0;
        l.ft = m.K.g;
        l.at = m.w.g;
        l.as = .1 <= m.o ? 1 : 0;
        l.atos = wi(m.h);
        l.ssb = wi(m.W, !1);
        l.amtos = Pi(m.h);
        l.uac = a.za;
        l.vpt = m.l.g;
        "nio" == k.T && (l.nio = 1,
        l.avms = "nio");
        l.gmm = "4";
        l.gdr = nk(a, m.l.g, !0) ? 1 : 0;
        a.xd && (l.efpf = a.Yb);
        0 < a.la && (l.nnut = a.la);
        l.tcm = ok(a);
        l.nmt = a.ga;
        l.bt = a.M;
        l.pst = a.Pa;
        l.vpaid = a.K;
        l.dur = a.w;
        l.vmtime = a.F;
        l.is = a.ba.l;
        1 <= a.h.length && (l.i0 = a.h[0].Nb);
        2 <= a.h.length && (l.i1 = a.h[1].Nb);
        3 <= a.h.length && (l.i2 = a.h[2].Nb);
        4 <= a.h.length && (l.i3 = a.h[3].Nb);
        l.cs = Xj(a.ba);
        b && (l.ic = Wj(a.ba),
        l.dvpt = m.l.h,
        l.dvs = Ri(m.g, .5),
        l.dfvs = Ri(m.g, 1),
        l.davs = Ri(m.h, .5),
        l.dafvs = Ri(m.h, 1),
        c && (m.l.h = 0,
        Si(m.g),
        Si(m.h)),
        a.Ya() && (l.dtos = m.G,
        l.dav = m.I,
        l.dtoss = a.P + 1,
        c && (m.G = 0,
        m.I = 0,
        a.P++)),
        l.dat = m.w.h,
        l.dft = m.K.h,
        c && (m.w.h = 0,
        m.K.h = 0));
        k.w && (l.ps = [k.w.width, k.w.height]);
        k.l && (l.bs = [k.l.width, k.l.height]);
        k.A && (l.scs = [k.A.width, k.A.height]);
        l.dom = k.H;
        a.qb && (l.vds = a.qb);
        if (0 < a.A.length || a.C)
            b = ub(a.A),
            a.C && b.push(a.C),
            l.pings = ib(b, function(a) {
                return a.toString()
            });
        b = ib(gb(a.A, function(a) {
            return a.w()
        }), function(a) {
            return a.B()
        });
        vb(b);
        l.ces = b;
        a.g && (l.vmer = a.g);
        a.I && (l.vmmk = a.I);
        a.J && (l.vmiec = a.J);
        l.avms = a.T ? a.T.Ma() : K.D().T;
        a.T && cb(l, a.T.Ba());
        "exc" == k.T && (l.femt = a.$b,
        l.femvt = a.ec,
        l.emc = a.ac,
        l.emb = wi(a.bb, !1),
        l.emuc = a.Ib,
        l.avms = "exc");
        d ? (l.c = nj(a.$.g, 2),
        l.ss = nj(a.$.h, 2)) : l.tth = L() - Kg;
        l.mc = nj(m.H, 2);
        l.nc = nj(m.A, 2);
        l.mv = lk(m.B);
        l.nv = lk(m.o);
        l.lte = nj(a.vc, 2);
        d = mk(a, e);
        Pi(m.g);
        l.qmtos = Pi(d.g);
        l.qnc = nj(d.A, 2);
        l.qmv = lk(d.B);
        l.qnv = lk(d.o);
        l.qas = .1 <= d.o ? 1 : 0;
        l.qi = a.ka;
        null !== a.V && (l.nvat = a.V ? 1 : 0);
        l.avms || (l.avms = "geo");
        l.psm = m.J.h;
        l.psv = m.J.g();
        l.psfv = m.R.g();
        l.psa = m.P.g();
        k = Fg(k.N);
        k.length && (l.veid = k);
        a.B && cb(l, Qj(a.B));
        return l
    }
      , uk = function(a, b) {
        if (pb(Nj, b))
            return !0;
        var c = a.l[b];
        return p(c) ? (a.l[b] = !0,
        !c) : !1
    };
    var xk = x()
      , Ak = function() {
        this.g = {};
        var a = C();
        yk(this, a, document);
        var b = zk();
        try {
            if ("1" == b) {
                for (var c = a.parent; c != a.top; c = c.parent)
                    yk(this, c, c.document);
                yk(this, a.top, a.top.document)
            }
        } catch (d) {}
    }
      , zk = function() {
        var a = document.documentElement;
        try {
            if (!Cf(C().top))
                return "2";
            var b = []
              , c = C(a.ownerDocument);
            for (a = c; a != c.top; a = a.parent)
                if (a.frameElement)
                    b.push(a.frameElement);
                else
                    break;
            return b && 0 != b.length ? "1" : "0"
        } catch (d) {
            return "2"
        }
    }
      , yk = function(a, b, c) {
        Fh(c, "mousedown", function() {
            return Bk(a)
        }, 301);
        Fh(b, "scroll", function() {
            return Ck(a)
        }, 302);
        Fh(c, "touchmove", function() {
            return Dk(a)
        }, 303);
        Fh(c, "mousemove", function() {
            return Ek(a)
        }, 304);
        Fh(c, "keydown", function() {
            return Fk(a)
        }, 305)
    }
      , Bk = function(a) {
        Na(a.g, function(a) {
            1E5 < a.l || ++a.l
        })
    }
      , Ck = function(a) {
        Na(a.g, function(a) {
            1E5 < a.g || ++a.g
        })
    }
      , Dk = function(a) {
        Na(a.g, function(a) {
            1E5 < a.g || ++a.g
        })
    }
      , Fk = function(a) {
        Na(a.g, function(a) {
            1E5 < a.h || ++a.h
        })
    }
      , Ek = function(a) {
        Na(a.g, function(a) {
            1E5 < a.o || ++a.o
        })
    };
    var Gk = function() {
        this.g = this.h = null
    }
      , Hk = function(a, b) {
        if (null == a.h)
            return !1;
        var c = function(c, e) {
            a.g = null;
            b(c, e)
        };
        a.g = nb(a.h, function(a) {
            return null != a && a.Za() && a.ed(c)
        });
        return null != a.g
    };
    Da(Gk);
    var Ik = {
        threshold: [0, .25, .5, .75, 1]
    }
      , Jk = function(a, b, c, d) {
        ci.call(this, a, b, c, d);
        this.B = this.w = this.l = null
    };
    ha(Jk, ci);
    Jk.prototype.Ma = function() {
        return "nio"
    }
    ;
    Jk.prototype.vb = function() {
        return !0
    }
    ;
    Jk.prototype.fd = function() {
        var a = this;
        this.B || (this.B = L());
        Bh(298, function() {
            return Kk(a)
        }) || Xh(this.g, "msf")
    }
    ;
    Jk.prototype.yc = function() {
        if (this.l && this.element)
            try {
                this.l.unobserve(this.element)
            } catch (a) {}
    }
    ;
    var Kk = function(a) {
        if (!a.element)
            return !1;
        var b = a.element;
        a.l = new a.g.ea.IntersectionObserver(function(b) {
            return Lk(a, b)
        }
        ,Ik);
        a.l.observe(b);
        2 === Dg(K.D().N, "nio_mode") && Lk(a, a.l && a.l.takeRecords ? a.l.takeRecords() : []);
        return !0
    };
    Jk.prototype.tb = function() {
        ci.prototype.tb.call(this);
        if (2 === Dg(K.D().N, "nio_mode")) {
            var a = this.l && this.l.takeRecords ? this.l.takeRecords() : [];
            0 < a.length ? Lk(this, a) : this.h = new Sh(this.h.g(),this.h.C,this.h.h,this.h.w,this.h.B,this.h.l,this.h.A,this.g.ea.performance.now(),this.h.o)
        }
    }
    ;
    var Lk = function(a, b) {
        try {
            if (b.length) {
                a.w || (a.w = L());
                var c = Mk(b)
                  , d = Oh(c.boundingClientRect)
                  , e = Ke(Oh(c.intersectionRect), -d.left, -d.top)
                  , f = L()
                  , g = c.boundingClientRect.width * c.boundingClientRect.height
                  , k = c.intersectionRect.width * c.intersectionRect.height;
                var m = g ? k / g : 0;
                b = 0;
                var l = c.intersectionRect.width * c.intersectionRect.height
                  , t = a.g.g().g;
                t && (b = (t.bottom - t.top) * (t.right - t.left));
                var E = c.intersectionRect.width * c.intersectionRect.height
                  , Y = window.screen.height * window.screen.width;
                a.h = new Sh(a.g.g(),a.element,d,e,a.vb(),m,b ? l / b : 0,f,E && Y ? E / Y : 0)
            }
        } catch (qa) {
            a.yc(),
            Dh(299, qa)
        }
    }
      , Mk = function(a) {
        return jb(a, function(a, c) {
            return a.time > c.time ? a : c
        }, a[0])
    };
    Jk.prototype.Ba = function() {
        var a = {};
        return Object.assign(this.g.Ba(), (a.niot_obs = this.B,
        a.niot_cbk = this.w,
        a))
    }
    ;
    var Nk = function(a) {
        a = void 0 === a ? H : a;
        di.call(this, new Vh(a,2))
    };
    ha(Nk, di);
    Nk.prototype.Ma = function() {
        return "nio"
    }
    ;
    Nk.prototype.Za = function() {
        var a = Dg(K.D().N, "nio_mode")
          , b = 2 === a;
        a = 1 === a;
        var c = K.D().h;
        return (b || a && c) && this.Aa()
    }
    ;
    Nk.prototype.Aa = function() {
        return "exc" !== K.D().T && 1 != Dg(K.D().N, "inapp") && null != this.g.ea.IntersectionObserver
    }
    ;
    Nk.prototype.Mc = function(a, b, c) {
        return new Jk(a,this.g,b,c)
    }
    ;
    var Ok = function(a, b, c) {
        vd.call(this);
        this.o = null != c ? w(a, c) : a;
        this.l = b;
        this.h = w(this.Uf, this);
        this.g = []
    };
    y(Ok, vd);
    h = Ok.prototype;
    h.ob = !1;
    h.Db = 0;
    h.Ta = null;
    h.Oc = function(a) {
        this.g = arguments;
        this.Ta || this.Db ? this.ob = !0 : Pk(this)
    }
    ;
    h.stop = function() {
        this.Ta && (n.clearTimeout(this.Ta),
        this.Ta = null,
        this.ob = !1,
        this.g = [])
    }
    ;
    h.pause = function() {
        this.Db++
    }
    ;
    h.resume = function() {
        this.Db--;
        this.Db || !this.ob || this.Ta || (this.ob = !1,
        Pk(this))
    }
    ;
    h.U = function() {
        Ok.da.U.call(this);
        this.stop()
    }
    ;
    h.Uf = function() {
        this.Ta = null;
        this.ob && !this.Db && (this.ob = !1,
        Pk(this))
    }
    ;
    var Pk = function(a) {
        a.Ta = de(a.h, a.l);
        a.o.apply(null, a.g)
    };
    var Qk = function() {
        this.g = this.h = null
    }
      , Rk = function() {
        this.g = [];
        this.h = [];
        this.done = !1;
        this.l = {
            yi: 0,
            Nd: 0,
            qd: 0,
            Rd: 0,
            Hf: -1
        };
        this.F = this.w = this.C = this.B = this.I = null;
        this.H = !1;
        this.J = null;
        this.G = Af() || Bf();
        this.o = new Th(this)
    }
      , Sk = function() {
        var a = K.D().T;
        return "nio" == a || "aio" == a
    }
      , Uk = function() {
        var a = N;
        a.H || (a.H = !0,
        a.I || Sk() || (a.B = new Ok(Ch(137, function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
                c[d - 0] = arguments[d];
            return a.A.apply(a, sa(c))
        }),100),
        a.I = Fh(H, "scroll", function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
                c[d - 0] = arguments[d];
            null !== a.B && a.B.Oc.apply(a.B, sa(c))
        }, 138)),
        a.C || Sk() || (a.w = new Ok(Ch(140, function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
                c[d - 0] = arguments[d];
            return a.L.apply(a, sa(c))
        }),100),
        a.C = Fh(H, "resize", function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
                c[d - 0] = arguments[d];
            null !== a.w && a.w.Oc.apply(a.w, sa(c))
        }, 141)),
        Tk(a, function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
                c[d - 0] = arguments[d];
            return a.K.apply(a, sa(c))
        }),
        a.K())
    };
    Rk.prototype.L = function() {
        Vk(this, !1);
        this.A()
    }
    ;
    Rk.prototype.A = function() {
        Wk(this, Xk(this), !1)
    }
    ;
    var Yk = function(a) {
        var b = K.D();
        b.g || "exc" == b.T || Vk(a, !0);
        var c = new Qk;
        switch (b.T) {
        case "geo":
            a: {
                b = b.l;
                c = new Qk;
                c.h = b;
                if (null != b && -12245933 != b.width && -12245933 != b.height) {
                    var d = K.D();
                    if (d.g)
                        var e = d.o;
                    else
                        try {
                            d = H;
                            var f = a.G;
                            d = d.top;
                            var g = b || eg(!0, d, void 0 === f ? !1 : f)
                              , k = id($c(d.document).g);
                            if (-12245933 == g.width) {
                                var m = g.width;
                                var l = new G(m,m,m,m)
                            } else
                                l = new G(k.y,k.x + g.width,k.y + g.height,k.x);
                            e = l
                        } catch (t) {
                            a = c;
                            break a
                        }
                    c.g = e
                }
                a = c
            }
            return a;
        default:
            return c
        }
    };
    Rk.prototype.W = function() {
        Wk(this, Xk(this), !1)
    }
    ;
    var Wk = function(a, b, c, d) {
        if (!a.done && (a.o.cancel(),
        0 != b.length)) {
            a.J = null;
            var e = Yk(a);
            try {
                var f = L()
                  , g = K.D();
                g.K = f;
                if (null != Gk.D().g)
                    for (d = 0; d < b.length; d++)
                        mj(b[d], f, c);
                else
                    switch (g.T) {
                    case "exc":
                        for (d = 0; d < b.length; d++)
                            kj(b[d], f, c);
                        break;
                    case "nis":
                        for (e = 0; e < b.length; e++)
                            p(d) ? b[e].Tb(d) : b[e].bd(f);
                        break;
                    case "gsv":
                        for (e = 0; e < b.length; e++)
                            p(d) ? b[e].Sc(d) : b[e].ad(f);
                        break;
                    case "aio":
                    case "nio":
                        for (d = 0; d < b.length; d++)
                            kj(b[d], f, c);
                        break;
                    case "iem":
                        for (d = 0; d < b.length; d++)
                            hj(b[d], f, c);
                        break;
                    case "geo":
                        if (e.g)
                            for (d = 0; d < b.length; d++)
                                jj(b[d], f, e.g, c, g.h)
                    }
                for (d = 0; d < b.length; d++)
                    ;
                a.l.qd += L() - f;
                ++a.l.Rd
            } finally {
                c ? z(b, function(a) {
                    a.$.g = 0
                }) : Uh(a.o)
            }
        }
    }
      , Tk = function(a, b) {
        var c;
        tf.visibilityState ? c = "visibilitychange" : tf.mozVisibilityState ? c = "mozvisibilitychange" : tf.webkitVisibilityState && (c = "webkitvisibilitychange");
        c && (a.F = a.F || Fh(tf, c, b, 142))
    };
    Rk.prototype.K = function() {
        var a = Zk(this)
          , b = L();
        a ? (Mg || (Ig = b,
        z(this.g, function(a) {
            var c = a.oa();
            c.L = bk(c, b, 1 != a.aa)
        })),
        Mg = !0,
        Vk(this, !0)) : (Mg = !1,
        Kg = b,
        z(this.g, function(a) {
            a.fb && (a.oa().C = b)
        }));
        Wk(this, Xk(this), !a)
    }
    ;
    Rk.prototype.P = function(a) {
        var b;
        if (b = null != a.IntersectionObserver) {
            if (a = $k(a, Xk(this)))
                K.D().T = "nio";
            b = a
        }
        return b
    }
    ;
    Rk.prototype.M = function(a) {
        return mc && Ac(8) && v(qi(a && a.document)) ? (K.D().T = "iem",
        !0) : !1
    }
    ;
    var Zk = function(a) {
        if (al(a))
            return !0;
        var b = Jh(tf);
        a = 1 === b;
        b = 0 === b;
        return K.D(),
        a || b
    }
      , bl = function(a, b) {
        return null != b && kb(a.g, function(a) {
            return a.element == b
        })
    }
      , cl = function(a) {
        return nb(N.g, function(b) {
            return b.ka == a
        })
    }
      , Xk = function(a) {
        return 0 == a.g.length ? a.h : 0 == a.h.length ? a.g : tb(a.h, a.g)
    };
    Rk.prototype.reset = function() {
        this.g = [];
        this.h = []
    }
    ;
    var Vk = function(a, b) {
        a = a.G;
        var c = K.D(), d, e = Gk.D();
        null != e.g && (d = e.g.g);
        c.l = d ? d.g().h : c.g ? c.o ? (new B(c.o.h(),c.o.g())).round() : new B(0,0) : eg(!0, H, a);
        b || (c.G = H && H.outerWidth ? new B(H.outerWidth,H.outerHeight) : new B(-12245933,-12245933),
        c.w = Qh(c.l))
    }
      , dl = function() {
        var a = K.D();
        H.screen && (a.A = new B(H.screen.width,H.screen.height))
    }
      , $k = function(a, b) {
        var c = void 0 === c ? Ca : c;
        var d = !1;
        z(b, function(b) {
            sj(b, a, "nio", c) && (d = !0)
        });
        return d
    }
      , el = function(a) {
        var b = N
          , c = [];
        z(a, function(a) {
            bl(b, a.element) || (b.g.push(a),
            c.push(a))
        })
    }
      , fl = function(a) {
        var b = N
          , c = [];
        z(a, function(a) {
            null == nb(b.g, function(b) {
                return b.element == a.element && !0
            }) && (b.g.push(a),
            c.push(a))
        })
    }
      , al = function(a) {
        return kb(Xk(a), function(a) {
            return a.Da
        })
    };
    Da(Rk);
    var N = Rk.D();
    var gl = function() {
        var a = Yb;
        return a ? kb("AppleTV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;OMI/".split(";"), function(b) {
            return Nb(a, b)
        }) ? !0 : Nb(a, "Presto") && Nb(a, "Linux") && !Nb(a, "X11") && !Nb(a, "Android") && !Nb(a, "Mobi") : !1
    }
      , hl = function() {
        return Nb(Yb, "CrKey") || Nb(Yb, "PlayStation") || Nb(Yb, "Roku") || gl() || Nb(Yb, "Xbox")
    };
    var il = null
      , jl = ""
      , kl = !1
      , ll = function() {
        var a = il || H;
        if (!a)
            return "";
        var b = [];
        if (!a.location.href)
            return "";
        b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
        a.document && a.document.referrer && b.push("referrer=" + encodeURIComponent(a.document.referrer.substring(0, 512)));
        return b.join("&")
    };
    var ml = function(a) {
        return function(b) {
            return !p(b[a]) && p(0) ? 0 : b[a]
        }
    }
      , ol = function() {
        var a = [0, 2, 4];
        return function(b) {
            b = b.tos;
            if (Fa(b)) {
                for (var c = Array(b.length), d = 0; d < b.length; d++)
                    c[d] = 0 < d ? c[d - 1] + b[d] : b[d];
                return p(a) ? nl(c, a) : c
            }
        }
    }
      , pl = function(a, b) {
        return function(c) {
            c = c[a];
            if (Fa(c))
                return nl(c, b)
        }
    }
      , rl = function(a) {
        var b = ql;
        return function(c) {
            return b(c) ? c[a] : void 0
        }
    }
      , nl = function(a, b) {
        return gb(a, function(a, d) {
            return pb(b, d)
        })
    };
    var ql = function(a, b) {
        return function(c) {
            for (var d = 0; d < b.length; d++)
                if (b[d] === c[a] || !p(b[d]) && !c.hasOwnProperty(a))
                    return !0;
            return !1
        }
    }("e", [void 0, 1, 2, 3, 4, 8, 16])
      , sl = {
        sv: "sv",
        cb: "cb",
        e: "e",
        nas: "nas",
        msg: "msg",
        "if": "if",
        sdk: "sdk",
        p: "p",
        tos: "tos",
        mtos: "mtos",
        mcvt: "mcvt",
        ps: "ps",
        scs: "scs",
        bs: "bs",
        pt: "pt",
        vht: "vht",
        mut: "mut",
        a: "a",
        ft: "ft",
        dft: "dft",
        at: "at",
        dat: "dat",
        as: "as",
        vpt: "vpt",
        gmm: "gmm",
        std: "std",
        efpf: "efpf",
        swf: "swf",
        nio: "nio",
        px: "px",
        nnut: "nnut",
        vmer: "vmer",
        vmmk: "vmmk",
        vmiec: "vmiec",
        nmt: "nmt",
        tcm: "tcm",
        bt: "bt",
        pst: "pst",
        vpaid: "vpaid",
        dur: "dur",
        vmtime: "vmtime",
        dtos: "dtos",
        dtoss: "dtoss",
        dvs: "dvs",
        dfvs: "dfvs",
        dvpt: "dvpt",
        fmf: "fmf",
        vds: "vds",
        is: "is",
        i0: "i0",
        i1: "i1",
        i2: "i2",
        i3: "i3",
        ic: "ic",
        cs: "cs",
        c: "c",
        mc: "mc",
        nc: "nc",
        mv: "mv",
        nv: "nv",
        qmt: rl("qmtos"),
        qnc: rl("qnc"),
        qmv: rl("qmv"),
        qnv: rl("qnv"),
        raf: "raf",
        rafc: "rafc",
        lte: "lte",
        ces: "ces",
        tth: "tth",
        femt: "femt",
        femvt: "femvt",
        emc: "emc",
        emuc: "emuc",
        emb: "emb",
        avms: "avms",
        nvat: "nvat",
        qi: "qi",
        psm: "psm",
        psv: "psv",
        psfv: "psfv",
        psa: "psa",
        pnk: "pnk",
        pnc: "pnc",
        pnmm: "pnmm",
        pns: "pns",
        ptlt: "ptlt",
        dc_rfl: "urlsigs",
        pngs: "pings",
        obd: "obd",
        veid: "veid",
        ssb: "ssb"
    }
      , tl = {
        c: ml("c"),
        at: "at",
        atos: pl("atos", [0, 2, 4]),
        ta: function(a, b) {
            return function(c) {
                if (!p(c[a]))
                    return b
            }
        }("tth", "1"),
        a: "a",
        dur: "dur",
        p: "p",
        tos: ol(),
        j: "dom",
        mtos: pl("mtos", [0, 2, 4]),
        gmm: "gmm",
        gdr: "gdr",
        ss: ml("ss"),
        vsv: ae("w2"),
        t: "t"
    }
      , ul = {
        atos: "atos",
        amtos: "amtos",
        avt: pl("atos", [2]),
        davs: "davs",
        dafvs: "dafvs",
        dav: "dav",
        ss: ml("ss"),
        t: "t"
    }
      , vl = {
        a: "a",
        tos: ol(),
        at: "at",
        c: ml("c"),
        mtos: pl("mtos", [0, 2, 4]),
        dur: "dur",
        fs: "fs",
        p: "p",
        vpt: "vpt",
        vsv: ae("ias_w2"),
        dom: "dom",
        gmm: "gmm",
        gdr: "gdr",
        t: "t"
    }
      , wl = {
        tos: ol(),
        at: "at",
        c: ml("c"),
        mtos: pl("mtos", [0, 2, 4]),
        p: "p",
        vpt: "vpt",
        vsv: ae("dv_w4"),
        gmm: "gmm",
        gdr: "gdr",
        dom: "dom",
        t: "t",
        mv: "mv",
        qmpt: pl("qmtos", [0, 2, 4]),
        qvs: function(a, b) {
            return function(c) {
                var d = c[a];
                if (r(d))
                    return ib(b, function(a) {
                        return 0 < d && d >= a ? 1 : 0
                    })
            }
        }("qnc", [1, .5, 0]),
        qmv: "qmv",
        qa: "qas",
        a: "a"
    };
    var yl = function(a, b) {
        var c = {
            sv: "659",
            cb: "j"
        };
        c.nas = N.g.length;
        c.msg = a;
        p(b) && (a = xl(b)) && (c.e = Oj[a]);
        return c
    }
      , zl = function(a) {
        return 0 == a.lastIndexOf("custom_metric_viewable", 0)
    }
      , xl = function(a) {
        var b = zl(a) ? "custom_metric_viewable" : a.toLowerCase();
        return Ya(function(a) {
            return a == b
        })
    };
    var Al = function(a, b) {
        dk.call(this, a, b)
    };
    ha(Al, dk);
    Al.prototype.l = function(a) {
        return a.oa().Ya()
    }
    ;
    var Bl = function() {
        this.h = this.o = this.B = this.w = this.l = this.g = ""
    };
    var Cl = function() {}
      , Dl = function(a, b, c, d, e) {
        var f = {};
        if (p(a))
            if (null != b)
                for (var g in b) {
                    var k = b[g];
                    g in Object.prototype || null != k && (v(k) ? f[g] = k(a) : f[g] = a[k])
                }
            else
                cb(f, a);
        p(c) && cb(f, c);
        a = ji(hi(li(f)));
        0 < a.length && p(d) && p(e) && (e = e(a),
        a += "&" + d + "=" + e);
        return a
    };
    var El = function() {};
    ha(El, Cl);
    El.prototype.g = function(a) {
        var b = new Bl;
        b.g = Dl(a, sl);
        b.l = Dl(a, ul);
        return b
    }
    ;
    var Gl = function(a) {
        a = Fl(a);
        di.call(this, a.length ? a[a.length - 1] : new Vh(window,0));
        this.l = a;
        this.o = Ca;
        this.h = null
    };
    ha(Gl, di);
    h = Gl.prototype;
    h.Ma = function() {
        return (this.h ? this.h : this.g).Ma()
    }
    ;
    h.Ba = function() {
        return (this.h ? this.h : this.g).Ba()
    }
    ;
    h.Ca = function() {
        return (this.h ? this.h : this.g).Ca()
    }
    ;
    h.ed = function(a) {
        this.o = a;
        z(this.l, function(a) {
            return a.zc()
        });
        Yh(this.g, this);
        return !0
    }
    ;
    h.X = function() {
        z(this.l, function(a) {
            a.C();
            a.X()
        });
        di.prototype.X.call(this)
    }
    ;
    h.Za = function() {
        return kb(this.l, function(a) {
            return a.Za()
        })
    }
    ;
    h.Aa = function() {
        return kb(this.l, function(a) {
            return a.Aa()
        })
    }
    ;
    h.Mc = function(a, b, c) {
        return new Wi(a,this.g,b,c)
    }
    ;
    h.Ua = function(a) {
        0 == a.Ca() && this.o(a.gb(), this)
    }
    ;
    h.Ka = function(a) {
        this.h = a.w
    }
    ;
    h.Fa = function() {
        return !1
    }
    ;
    var Fl = function(a) {
        if (!a.length)
            return [];
        a = gb(a, function(a) {
            return null != a && a.Za()
        });
        for (var b = 1; b < a.length; b++)
            Yh(a[b - 1], a[b]);
        return a
    };
    var Hl = function() {
        Vh.call(this, H, 1, "osd");
        this.Y = [];
        this.V = this.G = this.I = 0;
        this.H = !0
    };
    ha(Hl, Vh);
    Hl.prototype.Ba = function() {
        return {
            si: 1
        }
    }
    ;
    var Il = function(a) {
        var b = 0;
        a = a.ea;
        try {
            if (a && a.Goog_AdSense_getAdAdapterInstance)
                return a
        } catch (c) {}
        for (; a && 5 > b; ) {
            try {
                if (a.google_osd_static_frame)
                    return a.google_osd_static_frame
            } catch (c) {}
            try {
                if (a.aswift_0 && a.aswift_0.google_osd_static_frame)
                    return a.aswift_0.google_osd_static_frame
            } catch (c) {}
            b++;
            a = a != a.parent ? a.parent : null
        }
        return null
    };
    Hl.prototype.zc = function() {
        var a = this;
        if (!this.K)
            if (this.K = !0,
            Pg()) {
                Fh(n, "message", function(b) {
                    if (null != b && b.data && q(b.data)) {
                        var c = b.data;
                        if (q(c)) {
                            var e = {};
                            c = c.split("\n");
                            for (var f = 0; f != c.length; ++f) {
                                var g = c[f]
                                  , k = g.indexOf("=");
                                if (!(0 >= k)) {
                                    var m = Number(g.substr(0, k));
                                    g = g.substr(k + 1);
                                    switch (m) {
                                    case 36:
                                    case 26:
                                    case 15:
                                    case 8:
                                    case 11:
                                    case 16:
                                    case 5:
                                    case 18:
                                        g = "true" == g;
                                        break;
                                    case 4:
                                    case 33:
                                    case 6:
                                    case 25:
                                    case 28:
                                    case 29:
                                    case 24:
                                    case 23:
                                    case 22:
                                    case 7:
                                    case 21:
                                    case 20:
                                        g = Number(g);
                                        break;
                                    case 19:
                                    case 3:
                                        if (v(decodeURIComponent))
                                            try {
                                                g = decodeURIComponent(g)
                                            } catch (t) {
                                                throw Error("Error: URI malformed: " + g);
                                            }
                                    }
                                    e[m] = g
                                }
                            }
                            e = e[0] ? e : null
                        } else
                            e = null;
                        if (e && (c = new Og(e[4],e[12]),
                        K.D().B.matches(c) && (c = e[29],
                        f = e[0],
                        pb(["goog_acknowledge_monitoring", "goog_get_mode", "goog_update_data", "goog_image_request"], f)))) {
                            Jl(a, e);
                            if ("goog_get_mode" == f && b.source) {
                                m = {};
                                Gh(m);
                                m[0] = "goog_provide_mode";
                                m[6] = 4;
                                m[16] = !1;
                                try {
                                    var l = Hh(m);
                                    b.source.postMessage(l, b.origin);
                                    Kl(a, l)
                                } catch (t) {
                                    Dh(406, t)
                                }
                            }
                            if ("goog_get_mode" == f || "goog_acknowledge_monitoring" == f)
                                a.I = 2,
                                Ll(a);
                            if (b = e[32])
                                a.R = b;
                            a.l.length && 4 != c && (c = !1,
                            b = a.o.h,
                            l = a.o.g,
                            "goog_acknowledge_monitoring" == e[0] && (a.w = (void 0 !== e[36] ? e[36] : !e[8]) ? 2 : 0,
                            Wh(a)),
                            isNaN(e[30]) || isNaN(e[31]) ? isNaN(e[22]) || isNaN(e[23]) || (c = !0,
                            b = new B(e[22],e[23])) : (c = !0,
                            b = new B(e[30],e[31])),
                            e[9] && (c = !0,
                            e = e[9].split("-"),
                            4 == e.length && (l = new G(Ub(e[0]),Ub(e[3]),Ub(e[2]),Ub(e[1])))),
                            c && (e = L(),
                            c = eg(!0, a.ea, a.P),
                            f = eg(!1, a.ea, a.P),
                            a.J || (a.J = Qh(c, a.ea)),
                            g = Jh(tf),
                            m = 1 === g,
                            g = 0 === g,
                            m = (K.D(),
                            m || g),
                            e = new Rh(e,c,f,m,a),
                            e.h = b,
                            e.g = l,
                            e.o = Zk(N),
                            bi(a, e)))
                        }
                    }
                }, 118);
                var b = Ch(197, function() {
                    ++a.V;
                    if (2 == a.I)
                        Ll(a);
                    else if (10 < a.V)
                        Xh(a, "no");
                    else if (a.ea.postMessage)
                        if (Pg()) {
                            var b = Il(a);
                            if (b) {
                                var d = {};
                                Gh(d);
                                d[0] = "goog_request_monitoring";
                                d[6] = 4;
                                d[16] = !1;
                                try {
                                    var e = Hh(d);
                                    b.postMessage(e, "*")
                                } catch (f) {}
                            }
                        } else
                            Xh(a, "ib");
                    else
                        Xh(a, "c")
                });
                this.I = 1;
                1 == Dg(K.D().N, "srmi") && b();
                this.G = this.ea.setInterval(b, 500)
            } else
                Xh(this, "ib")
    }
    ;
    Hl.prototype.C = function() {
        var a = {};
        Gh(a);
        a[0] = "goog_stop_monitoring";
        Kl(this, Hh(a));
        Ll(this)
    }
    ;
    var Ll = function(a) {
        a.ea.clearInterval(a.G);
        a.G = 0
    }
      , Kl = function(a, b) {
        var c = Il(a)
          , d = !c;
        d && (c = a.ea.parent);
        if (c && c.postMessage)
            try {
                c.postMessage(b, "*"),
                d && a.ea.postMessage(b, "*")
            } catch (e) {}
    }
      , Jl = function(a, b) {
        z(a.Y, function(a) {
            a(b)
        })
    };
    Hl.prototype.Za = function() {
        var a = K.D();
        return Dg(a.N, "osd") && this.Aa() ? 4 === a.I ? !!Dg(a.N, "mkm") : !0 : !1
    }
    ;
    Hl.prototype.Aa = function() {
        return K.D().h
    }
    ;
    Da(Hl);
    var Nl = function() {
        this.h = this.M = !1;
        this.l = null;
        this.o = new El;
        this.g = null;
        var a = {};
        this.J = (a.start = this.ge,
        a.firstquartile = this.be,
        a.midpoint = this.de,
        a.thirdquartile = this.he,
        a.complete = this.$d,
        a.pause = this.Cc,
        a.resume = this.od,
        a.skip = this.fe,
        a.viewable_impression = this.Ja,
        a.mute = this.pb,
        a.unmute = this.pb,
        a.fullscreen = this.ce,
        a.exitfullscreen = this.ae,
        a.fully_viewable_audible_half_duration_impression = this.Ja,
        a.measurable_impression = this.Ja,
        a.abandon = this.Cc,
        a.engagedview = this.Ja,
        a.impression = this.Ja,
        a.creativeview = this.Ja,
        a.progress = this.pb,
        a.custom_metric_viewable = this.Ja,
        a.bufferstart = this.Cc,
        a.bufferfinish = this.od,
        a);
        a = {};
        this.R = (a.overlay_resize = this.ee,
        a.abandon = this.fc,
        a.close = this.fc,
        a.collapse = this.fc,
        a.overlay_unmeasurable_impression = function(a) {
            return wk(a, "overlay_unmeasurable_impression", Zk(N))
        }
        ,
        a.overlay_viewable_immediate_impression = function(a) {
            return wk(a, "overlay_viewable_immediate_impression", Zk(N))
        }
        ,
        a.overlay_unviewable_impression = function(a) {
            return wk(a, "overlay_unviewable_impression", Zk(N))
        }
        ,
        a.overlay_viewable_end_of_session_impression = function(a) {
            return wk(a, "overlay_viewable_end_of_session_impression", Zk(N))
        }
        ,
        a);
        K.D().I = 3;
        Ml(this)
    };
    Nl.prototype.B = function(a) {
        a.Da = !1;
        Ol(a.ua(), a.ka)
    }
    ;
    Nl.prototype.C = function() {}
    ;
    var Pl = function(a, b, c, d) {
        b = a.A(null, d, !0, b);
        b.o = c;
        b.xc = function(b) {
            a.K(b)
        }
        ;
        el([b]);
        return b
    };
    Nl.prototype.A = function(a, b, c, d) {
        this.g || (this.g = this.Nc());
        b = c ? b : -1;
        if (null == this.g || this.h)
            return a = new jk(H,a,b,7),
            a.ka = d,
            a;
        a = new jk(H,a,b,7,new dk("measurable_impression",this.g),this.I());
        a.ka = d;
        return a
    }
    ;
    Nl.prototype.I = function() {
        return [new Al("viewable_impression",this.g)]
    }
    ;
    var Ql = function() {
        var a = []
          , b = K.D();
        Dg(b.N, "osd") && b.h && b.g && "exc" != b.T && (K.D().g = !1,
        a.push(Hl.D()));
        return [new Nk(H), new Gl(a)]
    }
      , Sl = function(a) {
        if (!a.M) {
            a.M = !0;
            try {
                var b = L()
                  , c = K.D();
                Jg = b;
                il = xj(H).ea;
                Vk(N, !1);
                dl();
                if ("nis" != c.T && "gsv" != c.T)
                    if (H.document.body && H.document.body.getBoundingClientRect) {
                        N.l.Nd = 0;
                        N.l.Hf = L() - b;
                        var d = Ql()
                          , e = Gk.D();
                        e.h = d;
                        if (Hk(e, function() {
                            c.g = !1;
                            Rl()
                        }))
                            N.done || (Uk(),
                            Yh(e.g.g, a));
                        else if (c.h && "exc" != c.T) {
                            var f = !!Dg(c.N, "osd");
                            if (c.g && !f) {
                                var g = Hl.D();
                                g.zc();
                                Yh(g, a)
                            } else
                                Rl()
                        } else
                            Uk()
                    } else
                        kl = !0
            } catch (k) {
                throw N.reset(),
                k;
            }
        }
    }
      , Tl = function(a) {
        var b = K.D();
        if (null == a.l)
            switch (b.T) {
            case "nis":
                a.l = "n";
                break;
            case "gsv":
                a.l = "m";
                break;
            default:
                a.l = "h"
            }
        return a.l
    }
      , Ul = function(a, b, c) {
        if (null == a.g)
            return b.qb |= 4,
            !1;
        a = ek(a.g, c, b);
        b.qb |= a;
        return 0 == a
    };
    Nl.prototype.Ua = function(a) {
        var b = K.D();
        switch (a.Ca()) {
        case 0:
            b.g = !1;
            (a = Gk.D().g) && $h(a.g, this);
            (a = Hl.D()) && $h(a, this);
            Rl();
            break;
        case 2:
            b.g && Uk()
        }
    }
    ;
    Nl.prototype.Ka = function(a) {
        var b = K.D();
        b.g && (b.l = a.h,
        b.o = a.g)
    }
    ;
    Nl.prototype.Fa = function() {
        return !1
    }
    ;
    var Rl = function() {
        a: {
            var a = N;
            if (void 0 === b) {
                var b = K.D().N;
                var c = [];
                0 === (Dg(b, "nio_mode") || 0) && c.push(a.P);
                c.push(a.M);
                b = c
            }
            b = ra(b);
            for (c = b.next(); !c.done; c = b.next())
                if (c.value.call(a, H)) {
                    a = !0;
                    break a
                }
            a = !1
        }
        a ? Uk() : (N.o.cancel(),
        jl = "i",
        N.done = !0)
    };
    Nl.prototype.P = function(a, b) {
        a.kb = !0;
        switch (a.ua()) {
        case 1:
            Vl(this, a, b);
            break;
        case 2:
            this.Dc(a)
        }
        this.Ec(a)
    }
    ;
    var Vl = function(a, b, c) {
        if (!b.Qa) {
            var d = wk(b, "start", Zk(N));
            a = a.o.g(d).g;
            var e = {};
            e.r = c;
            e.v = "659v";
            Ee(a, function(a, b) {
                return e[a] = "mtos" == a || "tos" == a ? b : encodeURIComponent(b)
            });
            c = ll();
            Ee(c, function(a, b) {
                return e[a] = encodeURIComponent(b)
            });
            e.id = "lidarvf";
            c = "//pagead2.googlesyndication.com/pagead/gen_204?" + ji(hi(e));
            ni(c);
            b.Qa = !0
        }
    };
    h = Nl.prototype;
    h.ge = function(a) {
        tk(a, 0);
        return wk(a, "start", Zk(N))
    }
    ;
    h.pb = function(a, b, c) {
        Wk(N, [a], !Zk(N), b);
        return this.Ja(a, b, c)
    }
    ;
    h.Ja = function(a, b, c) {
        return wk(a, c, Zk(N))
    }
    ;
    h.be = function(a, b) {
        return Wl(a, "firstquartile", 1, b)
    }
    ;
    h.de = function(a, b) {
        a.na = !0;
        return Wl(a, "midpoint", 2, b)
    }
    ;
    h.he = function(a, b) {
        return Wl(a, "thirdquartile", 3, b)
    }
    ;
    h.$d = function(a, b) {
        b = Wl(a, "complete", 4, b);
        0 != a.aa && (a.aa = 3);
        return b
    }
    ;
    var Wl = function(a, b, c, d) {
        Wk(N, [a], !Zk(N), d);
        tk(a, c);
        4 != c && sk(a.H, c, a.Jb);
        return wk(a, b, Zk(N))
    };
    h = Nl.prototype;
    h.od = function(a, b, c) {
        var d = Zk(N);
        if (2 == a.aa && !d) {
            var e = L();
            a.oa().C = e
        }
        Wk(N, [a], !d, b);
        2 == a.aa && (a.aa = 1);
        return wk(a, c, d)
    }
    ;
    h.fe = function(a, b) {
        b = this.pb(a, b || {}, "skip");
        0 != a.aa && (a.aa = 3);
        return b
    }
    ;
    h.ce = function(a, b) {
        a.Da = !0;
        return this.pb(a, b || {}, "fullscreen")
    }
    ;
    h.ae = function(a, b) {
        a.Da = !1;
        return this.pb(a, b || {}, "exitfullscreen")
    }
    ;
    h.Cc = function(a, b, c) {
        var d = a.oa()
          , e = L();
        d.L = bk(d, e, 1 != a.aa);
        Wk(N, [a], !Zk(N), b);
        1 == a.aa && (a.aa = 2);
        return wk(a, c, Zk(N))
    }
    ;
    h.ee = function(a, b) {
        Wk(N, [a], !Zk(N), b);
        return a.h()
    }
    ;
    h.fc = function(a, b) {
        Wk(N, [a], !Zk(N), b);
        this.md(a);
        0 != a.aa && (a.aa = 3);
        return a.h()
    }
    ;
    var Xl = function(a, b, c) {
        if (0 == b.aa) {
            "i" != jl && (N.done = !1);
            var d = Gk.D();
            null != d.g && lj(b, d.g);
            sj(b, H, K.D().T, function(b) {
                for (var c = [], d = 0; d < arguments.length; ++d)
                    c[d - 0] = arguments[d];
                return a.P.apply(a, sa(c))
            });
            d = p(c) ? c.opt_nativeTime : void 0;
            Lg = d = r(d) ? d : L();
            b.fb = !0;
            var e = Zk(N);
            kk(b, d, e);
            Wk(N, [b], !e, c)
        }
    }
      , Ml = function(a) {
        zh([function(b) {
            var c = Yl();
            null != a.l && (c.sdk = a.l);
            c.avms = K.D().T;
            cb(b, c)
        }
        ])
    }
      , Ol = function(a, b) {
        if (q(b)) {
            if (1 == a)
                var c = N.g;
            else if (2 == a)
                c = N.h;
            else
                return;
            var d = lb(c, function(c) {
                return c.ua() != a ? !1 : c.ka == b
            });
            0 <= d && (oj(c[d]),
            qb(c, d))
        }
    }
      , $l = function(a, b, c, d) {
        var e = nb(N.g, function(a) {
            return a.element == c
        });
        null !== e && e.ka != b && (a.B(e),
        e = null);
        e || (e = Zl(a, c, b),
        e.o = Tl(a),
        d && (e.Na = d));
        return e
    }
      , Zl = function(a, b, c) {
        b = a.A(b, L(), !1, c);
        b.xc = w(a.K, a);
        0 == N.h.length && (K.D().C = 79463069);
        fl([b]);
        Uk();
        return b
    };
    Nl.prototype.K = function() {}
    ;
    var bm = function(a, b) {
        b.I = 0;
        for (var c in Kj)
            null == a[c] && (b.I |= Kj[c]);
        am(a, "currentTime");
        am(a, "duration")
    };
    h = Nl.prototype;
    h.Dc = function() {}
    ;
    h.md = function() {}
    ;
    h.dd = function() {}
    ;
    h.Ec = function() {}
    ;
    h.Nc = function() {}
    ;
    var am = function(a, b) {
        var c = a[b];
        p(c) && 0 < c && (a[b] = Math.floor(1E3 * c))
    }
      , Yl = function() {
        var a = K.D()
          , b = {};
        return b.sv = "659",
        b["if"] = a.h ? "1" : "0",
        b.nas = String(N.g.length),
        b
    };
    var cm = {
        Qg: "visible",
        ug: "audible",
        hi: "time",
        ji: "timetype"
    }
      , dm = {
        visible: function(a) {
            return /^(100|[0-9]{1,2})$/.test(a)
        },
        audible: function(a) {
            return "0" == a || "1" == a
        },
        timetype: function(a) {
            return "mtos" == a || "tos" == a
        },
        time: function(a) {
            return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a)
        }
    }
      , em = function() {
        this.g = void 0;
        this.h = !1;
        this.l = 0;
        this.o = -1;
        this.w = "tos"
    }
      , fm = function(a) {
        try {
            var b = a.split(",");
            return b.length > Sa(cm).length ? null : jb(b, function(a, b) {
                b = b.toLowerCase().split("=");
                if (2 != b.length || !p(dm[b[0]]) || !dm[b[0]](b[1]))
                    throw Error("Entry (" + b[0] + ", " + b[1] + ") is invalid.");
                a[b[0]] = b[1];
                return a
            }, {})
        } catch (c) {
            return null
        }
    }
      , gm = function(a, b) {
        if (void 0 == a.g)
            return 0;
        switch (a.w) {
        case "mtos":
            return a.h ? Qi(b.h, a.g) : Qi(b.g, a.g);
        case "tos":
            return a.h ? Oi(b.h, a.g) : Oi(b.g, a.g)
        }
        return 0
    };
    var hm = function(a, b, c, d) {
        dk.call(this, b, d);
        this.C = a;
        this.A = c
    };
    ha(hm, dk);
    hm.prototype.B = function() {
        return this.C
    }
    ;
    hm.prototype.w = function() {
        return !0
    }
    ;
    hm.prototype.l = function(a) {
        var b = a.oa()
          , c = a.w;
        return kb(this.A, function(a) {
            if (void 0 != a.g)
                var d = gm(a, b);
            else
                b: {
                    switch (a.w) {
                    case "mtos":
                        d = a.h ? b.w.l : b.l.g;
                        break b;
                    case "tos":
                        d = a.h ? b.w.g : b.l.g;
                        break b
                    }
                    d = 0
                }
            0 == d ? a = !1 : (a = -1 != a.l ? a.l : p(c) && 0 < c ? a.o * c : -1,
            a = -1 != a && d >= a);
            return a
        })
    }
    ;
    var im = function(a) {
        dk.call(this, "fully_viewable_audible_half_duration_impression", a)
    };
    ha(im, dk);
    im.prototype.l = function(a) {
        var b = Oi(a.oa().h, 1);
        return nk(a, b)
    }
    ;
    var jm = x()
      , km = !1
      , lm = !1
      , mm = !1
      , O = function(a) {
        return !a || "function" !== typeof a || 0 > String(Function.prototype.toString).indexOf("[native code]") ? !1 : 0 <= String(a).indexOf("[native code]") && !0 || !1
    }
      , nm = function(a) {
        return !!(1 << a & jm)
    }
      , om = [function(a) {
        return !(!a.chrome || !a.chrome.webstore)
    }
    , function(a) {
        return !!a.document.documentMode
    }
    , function(a) {
        return !!a.document.fonts.ready
    }
    , function() {
        return nm(0)
    }
    , function(a) {
        return !!a.ActiveXObject
    }
    , function(a) {
        return !!a.chrome
    }
    , function(a) {
        return !!a.navigator.serviceWorker
    }
    , function(a) {
        return !!a.opera
    }
    , function(a) {
        return !!a.sidebar
    }
    , function() {
        return !+"\v1"
    }
    , function() {
        return nm(1)
    }
    , function(a) {
        return !a.ActiveXObject
    }
    , function(a) {
        return "-ms-ime-align"in a.document.documentElement.style
    }
    , function(a) {
        return "-ms-scroll-limit"in a.document.documentElement.style
    }
    , function(a) {
        return "-webkit-font-feature-settings"in a.document.body.style
    }
    , function() {
        return nm(2)
    }
    , function(a) {
        return "ActiveXObject"in a
    }
    , function(a) {
        return "MozAppearance"in a.document.documentElement.style
    }
    , function(a) {
        return "_phantom"in a
    }
    , function(a) {
        return "callPhantom"in a
    }
    , function(a) {
        return "content"in a.document.createElement("template")
    }
    , function(a) {
        return "getEntriesByType"in a.performance
    }
    , function() {
        return nm(3)
    }
    , function(a) {
        return "image-rendering"in a.document.body.style
    }
    , function(a) {
        return "object-fit"in a.document.body.style
    }
    , function(a) {
        return "open"in a.document.createElement("details")
    }
    , function(a) {
        return "orientation"in a.screen
    }
    , function(a) {
        return "performance"in a
    }
    , function(a) {
        return "shape-image-threshold"in a.document.body.style
    }
    , function() {
        return nm(4)
    }
    , function(a) {
        return "srcset"in a.document.createElement("img")
    }
    , function() {
        return lm
    }
    , function() {
        return mm
    }
    , function() {
        return nm(5)
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "-webkit-min-content";
        a.style.width = "min-content";
        return "1px" != a.style.width
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "calc(1px - 1px)";
        a.style.width = "-webkit-calc(1px - 1px)";
        return "1px" != a.style.width
    }
    , function() {
        var a = !1;
        eval('var DummyFunction1 = function(x){ "use strict"; var a = 12; b = a + x*35; }');
        try {
            DummyFunction1()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        var a = !1;
        try {
            DummyFunction2()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        return !1
    }
    , function() {
        return nm(6)
    }
    , function(a) {
        var b = a.document.createElement("canvas");
        b.width = b.height = 1;
        b = b.getContext("2d");
        b.globalCompositeOperation = "multiply";
        b.fillStyle = "rgb(0,255,255)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b.fillStyle = "rgb(255,255,0)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b = b.getImageData(0, 0, 1, 1).data;
        return b[0] == b[2] && b[1] == b[3] || O(a.navigator.vibrate)
    }
    , function(a) {
        a = a.document.createElement("canvas");
        a.width = a.height = 1;
        a = a.getContext("2d");
        a.globalCompositeOperation = "multiply";
        a.fillStyle = "rgb(0,255,255)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a.fillStyle = "rgb(255,255,0)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a = a.getImageData(0, 0, 1, 1).data;
        return a[0] == a[2] && a[1] == a[3]
    }
    , function(a) {
        return O(a.document.createElement("div").matches)
    }
    , function(a) {
        a = a.document.createElement("input");
        a.setAttribute("type", "range");
        return "text" !== a.type
    }
    , function(a) {
        return a.CSS.supports("image-rendering", "pixelated")
    }
    , function(a) {
        return a.CSS.supports("object-fit", "contain")
    }
    , function() {
        return nm(7)
    }
    , function(a) {
        return a.CSS.supports("object-fit", "inherit")
    }
    , function(a) {
        return a.CSS.supports("shape-image-threshold", "0.9")
    }
    , function(a) {
        return a.CSS.supports("word-break", "keep-all")
    }
    , function() {
        return eval("1 == [for (item of [1,2,3]) item][0]")
    }
    , function(a) {
        return O(a.CSS.supports)
    }
    , function() {
        return O(Intl.Collator)
    }
    , function(a) {
        return O(a.document.createElement("dialog").show)
    }
    , function() {
        return nm(8)
    }
    , function(a) {
        return O(a.document.createElement("div").animate([{
            transform: "scale(1)",
            easing: "ease-in"
        }, {
            transform: "scale(1.3)",
            easing: "ease-in"
        }], {
            duration: 1300,
            iterations: 1
        }).reverse)
    }
    , function(a) {
        return O(a.document.createElement("div").animate)
    }
    , function(a) {
        return O(a.document.documentElement.webkitRequestFullScreen)
    }
    , function(a) {
        return O(a.navigator.getBattery)
    }
    , function(a) {
        return O(a.navigator.permissions.query)
    }
    , function() {
        return !1
    }
    , function() {
        return nm(9)
    }
    , function() {
        return O(webkitRequestAnimationFrame)
    }
    , function(a) {
        return O(a.BroadcastChannel.call)
    }
    , function(a) {
        return O(a.FontFace)
    }
    , function(a) {
        return O(a.Gamepad)
    }
    , function() {
        return nm(10)
    }
    , function(a) {
        return O(a.MutationEvent)
    }
    , function(a) {
        return O(a.MutationObserver)
    }
    , function(a) {
        return O(a.crypto.getRandomValues)
    }
    , function(a) {
        return O(a.document.body.createShadowRoot)
    }
    , function(a) {
        return O(a.document.body.webkitCreateShadowRoot)
    }
    , function(a) {
        return O(a.fetch)
    }
    , function() {
        return nm(11)
    }
    , function(a) {
        return O(a.navigator.serviceWorker.register)
    }
    , function(a) {
        return O(a.navigator.webkitGetGamepads)
    }
    , function(a) {
        return O(a.speechSynthesis.speak)
    }
    , function(a) {
        return O(a.webkitRTCPeerConnection)
    }
    , function(a) {
        return a.CSS.supports("--fake-var", "0")
    }
    , function() {
        return nm(12)
    }
    , function(a) {
        return a.CSS.supports("cursor", "grab")
    }
    , function(a) {
        return a.CSS.supports("cursor", "zoom-in")
    }
    , function(a) {
        return a.CSS.supports("image-orientation", "270deg")
    }
    , function() {
        return nm(13)
    }
    , function(a) {
        return a.CSS.supports("position", "sticky")
    }
    , function(a) {
        return void 0 === a.document.createElement("style").scoped
    }
    , function(a) {
        return a.performance.getEntriesByType("resource")instanceof Array
    }
    , function() {
        return "undefined" == typeof InstallTrigger
    }
    , function() {
        return "object" == typeof (new Intl.Collator).resolvedOptions()
    }
    , function(a) {
        return "boolean" == typeof a.navigator.onLine
    }
    , function() {
        return nm(14)
    }
    , function(a) {
        return "undefined" == typeof a.navigator.Di
    }
    , function(a) {
        return "number" == typeof a.performance.now()
    }
    , function() {
        return 0 == (new Uint16Array(1))[0]
    }
    , function(a) {
        return -1 == a.ActiveXObject.toString().indexOf("native")
    }
    , function(a) {
        return -1 == Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")
    }
    ]
      , pm = [function(a) {
        a = a.document.createElement("div");
        var b = null
          , c = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
        try {
            a.style.behavior = "url(#default#clientcaps)"
        } catch (e) {}
        for (var d = 0; d < c.length; d++) {
            try {
                b = a.getComponentVersion(c[d], "componentid").replace(/,/g, ".")
            } catch (e) {}
            if (b)
                return b.split(".")[0]
        }
        return !1
    }
    , function() {
        return (new Date).getTimezoneOffset()
    }
    , function(a) {
        return (a.innerWidth || a.document.documentElement.clientWidth || a.document.body.clientWidth) / (a.innerHeight || a.document.documentElement.clientHeight || a.document.body.clientHeight)
    }
    , function(a) {
        return (a.outerWidth || a.document && a.document.body && a.document.body.offsetWidth) / (a.outerHeight || a.document && a.document.body && a.document.body.offsetHeight)
    }
    , function(a) {
        return a.screen.availWidth / a.screen.availHeight
    }
    , function(a) {
        return a.screen.width / a.screen.height
    }
    ]
      , qm = [function(a) {
        return a.navigator.userAgent
    }
    , function(a) {
        return a.navigator.platform
    }
    , function(a) {
        return a.navigator.vendor
    }
    ]
      , sm = function() {
        try {
            rm()
        } catch (d) {}
        var a = "a=1&b=" + jm + "&"
          , b = []
          , c = 99;
        z(om, function(a, c) {
            var d = !1;
            try {
                d = a(H)
            } catch (g) {}
            b[c / 32 >>> 0] |= d << c % 32
        });
        z(b, function(b, e) {
            a += String.fromCharCode(c + e) + "=" + (b >>> 0).toString(16) + "&"
        });
        c = 105;
        z(pm, function(b) {
            var d = "false";
            try {
                d = b(H)
            } catch (f) {}
            a += String.fromCharCode(c++) + "=" + d + "&"
        });
        z(qm, function(b) {
            var d = "";
            try {
                var f = b(H);
                b = [];
                for (var g = 0, k = 0; k < f.length; k++) {
                    var m = f.charCodeAt(k);
                    255 < m && (b[g++] = m & 255,
                    m >>= 8);
                    b[g++] = m
                }
                if (!re)
                    for (re = {},
                    se = {},
                    f = 0; 65 > f; f++)
                        re[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f),
                        se[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(f);
                f = se;
                m = [];
                for (g = 0; g < b.length; g += 3) {
                    var l = b[g]
                      , t = g + 1 < b.length
                      , E = t ? b[g + 1] : 0
                      , Y = g + 2 < b.length
                      , qa = Y ? b[g + 2] : 0;
                    k = l >> 2;
                    var T = (l & 3) << 4 | E >> 4
                      , Z = (E & 15) << 2 | qa >> 6
                      , jc = qa & 63;
                    Y || (jc = 64,
                    t || (Z = 64));
                    m.push(f[k], f[T], f[Z], f[jc])
                }
                d = m.join("")
            } catch (qf) {}
            a += String.fromCharCode(c++) + "=" + d + "&"
        });
        return a.slice(0, -1)
    }
      , rm = function() {
        if (!km) {
            var a = function() {
                lm = !0;
                H.document.removeEventListener("webdriver-evaluate", a, !0)
            };
            H.document.addEventListener("webdriver-evaluate", a, !0);
            var b = function() {
                mm = !0;
                H.document.removeEventListener("webdriver-evaluate-response", b, !0)
            };
            H.document.addEventListener("webdriver-evaluate-response", b, !0);
            km = !0
        }
    };
    var tm = function() {
        this.h = 64;
        this.g = Array(4);
        this.w = Array(this.h);
        this.o = this.l = 0;
        this.reset()
    };
    y(tm, te);
    tm.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.o = this.l = 0
    }
    ;
    var um = function(a, b, c) {
        c || (c = 0);
        var d = Array(16);
        if (q(b))
            for (var e = 0; 16 > e; ++e)
                d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
        else
            for (e = 0; 16 > e; ++e)
                d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
        b = a.g[0];
        c = a.g[1];
        e = a.g[2];
        var f = a.g[3];
        var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
        a.g[2] = a.g[2] + e & 4294967295;
        a.g[3] = a.g[3] + f & 4294967295
    }
      , vm = function(a, b) {
        if (!p(c))
            var c = b.length;
        for (var d = c - a.h, e = a.w, f = a.l, g = 0; g < c; ) {
            if (0 == f)
                for (; g <= d; )
                    um(a, b, g),
                    g += a.h;
            if (q(b))
                for (; g < c; ) {
                    if (e[f++] = b.charCodeAt(g++),
                    f == a.h) {
                        um(a, e);
                        f = 0;
                        break
                    }
                }
            else
                for (; g < c; )
                    if (e[f++] = b[g++],
                    f == a.h) {
                        um(a, e);
                        f = 0;
                        break
                    }
        }
        a.l = f;
        a.o += c
    };
    var wm = function() {
        this.h = null
    };
    ha(wm, El);
    wm.prototype.g = function(a) {
        var b = El.prototype.g.call(this, a);
        var c = jm = x();
        var d = nm(5);
        c = (lm ? !d : d) ? c | 2 : c & -3;
        d = nm(2);
        c = (mm ? !d : d) ? c | 8 : c & -9;
        c = {
            s1: (c >>> 0).toString(16)
        };
        this.h || (this.h = sm());
        b.w = this.h;
        b.B = Dl(a, tl, c, "h", xm("kArwaWEsTs"));
        b.o = Dl(a, vl, {}, "h", xm("b96YPMzfnx"));
        b.h = Dl(a, wl, {}, "h", xm("yb8Wev6QDg"));
        return b
    }
    ;
    var xm = function(a) {
        return function(b) {
            var c = new tm;
            vm(c, b + a);
            var d = Array((56 > c.l ? c.h : 2 * c.h) - c.l);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b)
                d[b] = 0;
            var e = 8 * c.o;
            for (b = d.length - 8; b < d.length; ++b)
                d[b] = e & 255,
                e /= 256;
            vm(c, d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)
                for (var f = 0; 32 > f; f += 8)
                    d[e++] = c.g[b] >>> f & 255;
            return ge(d).slice(-8)
        }
    };
    var ym = function(a, b) {
        this.h = a;
        this.l = b
    }
      , ek = function(a, b, c) {
        var d = a.g(c);
        if (v(d)) {
            var e = {};
            e = (e.sv = "659",
            e.cb = "j",
            e.e = zm(b),
            e);
            var f = wk(c, b, Zk(N));
            cb(e, f);
            c.cd[b] = f;
            a = 2 == c.ua() ? mi(e).join("&") : a.l.g(e).g;
            try {
                return d(c.ka, a, b),
                0
            } catch (g) {
                return 2
            }
        } else
            return 1
    }
      , zm = function(a) {
        var b = zl(a) ? "custom_metric_viewable" : a;
        a = Ya(function(a) {
            return a == b
        });
        return Oj[a]
    };
    ym.prototype.g = function() {
        return Ba(this.h)
    }
    ;
    var Am = function(a, b, c) {
        ym.call(this, a, b);
        this.o = c
    };
    ha(Am, ym);
    Am.prototype.g = function(a) {
        if (!a.Na)
            return ym.prototype.g.call(this, a);
        var b = this.o[a.Na];
        if (b)
            return function(a, d, e) {
                Bm(b, a, d, e)
            }
            ;
        Dh(393, Error());
        return null
    }
    ;
    var Cm = function(a, b) {
        this.g = a;
        this.depth = b
    }
      , Em = function(a) {
        a = a || Sg();
        var b = Math.max(a.length - 1, 0)
          , c = Vg(a);
        a = c.g;
        var d = c.h
          , e = c.l
          , f = [];
        c = function(a, b) {
            return null == a ? b : a
        }
        ;
        e && f.push(new Cm([e.url, e.tc ? 2 : 0],c(e.depth, 1)));
        d && d != e && f.push(new Cm([d.url, 2],0));
        a.url && a != e && f.push(new Cm([a.url, 0],c(a.depth, b)));
        var g = ib(f, function(a, b) {
            return f.slice(0, f.length - b)
        });
        !a.url || (e || d) && a != e || (d = Qf(a.url)) && g.push([new Cm([d, 1],c(a.depth, b))]);
        g.push([]);
        return ib(g, function(a) {
            return Dm(b, a)
        })
    };
    function Dm(a, b) {
        var c = jb(b, function(a, b) {
            return Math.max(a, b.depth)
        }, -1)
          , d = zb(c + 2);
        d[0] = a;
        z(b, function(a) {
            return d[a.depth + 1] = a.g
        });
        return d
    }
    var Fm = function() {
        var a = Em();
        return ib(a, function(a) {
            return Yg(a)
        })
    };
    var P = function() {
        Nl.call(this);
        this.G = void 0;
        this.H = null;
        this.F = !1;
        this.w = {};
        this.L = 0;
        this.o = new wm
    };
    ha(P, Nl);
    P.prototype.C = function(a, b) {
        var c = this;
        switch (K.D().T) {
        case "nis":
            var d = Gm(this, a, b);
            break;
        case "gsv":
            d = Hm(this, a, b);
            break;
        case "exc":
            d = Im(this, a);
            break;
        default:
            b.opt_overlayAdElement ? d = void 0 : b.opt_adElement ? d = $l(this, a, b.opt_adElement, b.opt_osdId) : d = cl(a) || void 0
        }
        d && 1 == d.ua() && (d.Z == Ca && (d.Z = function(a) {
            return c.dd(a)
        }
        ),
        Jm(this, d, b));
        return d
    }
    ;
    var Jm = function(a, b, c) {
        c = c.opt_configurable_tracking_events;
        if (null != a.g && Fa(c)) {
            var d = a.g;
            fg(c);
            z(c, function(a) {
                var c = ib(a.Ai, function(a) {
                    var b = fm(a);
                    if (null == b)
                        a = null;
                    else if (a = new em,
                    null != b.visible && (a.g = b.visible / 100),
                    null != b.audible && (a.h = 1 == b.audible),
                    null != b.time) {
                        var c = "mtos" == b.timetype ? "mtos" : "tos"
                          , d = Ab(b.time, "%") ? "%" : "ms";
                        b = parseInt(b.time, 10);
                        "%" == d && (b /= 100);
                        "ms" == d ? (a.l = b,
                        a.o = -1) : (a.l = -1,
                        a.o = b);
                        a.w = void 0 === c ? "tos" : c
                    }
                    return a
                });
                kb(c, function(a) {
                    return null == a
                }) || pk(b, new hm(a.id,a.event,c,d))
            })
        }
    };
    P.prototype.dd = function(a) {
        var b = K.D();
        a.g = 0;
        a.J = 0;
        if ("h" == a.o || "n" == a.o) {
            if ("exc" == b.T || "nis" == b.T)
                var c = Ba("ima.bridge.getVideoMetadata");
            else if (a.Na && Km(this)) {
                var d = this.w[a.Na];
                d ? c = function(a) {
                    return Lm(d, a)
                }
                : null !== d && Dh("lidar::missingPlayerCallback", Error())
            } else
                c = Ba("ima.common.getVideoMetadata");
            if (v(c))
                try {
                    var e = c(a.ka)
                } catch (f) {
                    a.g |= 4
                }
            else
                a.g |= 2
        } else if ("b" == a.o)
            if (b = Ba("ytads.bulleit.getVideoMetadata"),
            v(b))
                try {
                    e = b(a.ka)
                } catch (f) {
                    a.g |= 4
                }
            else
                a.g |= 2;
        else if ("ml" == a.o)
            if (b = Ba("ima.common.getVideoMetadata"),
            v(b))
                try {
                    e = b(a.ka)
                } catch (f) {
                    a.g |= 4
                }
            else
                a.g |= 2;
        else
            a.g |= 1;
        a.g || (p(e) ? null === e ? a.g |= 16 : Za(e) ? a.g |= 32 : null != e.errorCode && (a.J = e.errorCode,
        a.g |= 64) : a.g |= 8);
        null != e || (e = {});
        bm(e, a);
        Ph(e.volume) && Ph(this.G) && (e.volume *= this.G);
        return e
    }
    ;
    var Hm = function(a, b, c) {
        var d = cl(b);
        d || (d = c.opt_nativeTime || -1,
        d = Pl(a, b, Tl(a), d),
        c.opt_osdId && (d.Na = c.opt_osdId));
        return d
    }
      , Gm = function(a, b, c) {
        var d = cl(b);
        d || (d = Pl(a, b, "n", c.opt_nativeTime || -1),
        d.sa = K.D().F);
        return d
    }
      , Im = function(a, b) {
        var c = cl(b);
        c || (c = Pl(a, b, "h", -1));
        return c
    };
    P.prototype.Nc = function() {
        if (Km(this))
            return new Am("ima.common.triggerExternalActivityEvent",this.o,this.w);
        var a = Mm(this);
        return null != a ? new ym(a,this.o) : null
    }
    ;
    var Mm = function(a) {
        var b = K.D();
        switch (Tl(a)) {
        case "b":
            return "ytads.bulleit.triggerExternalActivityEvent";
        case "n":
            return "ima.bridge.triggerExternalActivityEvent";
        case "h":
            if ("exc" == b.T)
                return "ima.bridge.triggerExternalActivityEvent";
        case "m":
        case "ml":
            return "ima.common.triggerExternalActivityEvent"
        }
        return null
    };
    P.prototype.I = function() {
        var a = this.g
          , b = Nl.prototype.I.call(this);
        b.push(new im(a));
        return b
    }
    ;
    P.prototype.Dc = function(a) {
        !a.g && a.kb && Ul(this, a, "overlay_unmeasurable_impression") && (a.g = !0)
    }
    ;
    P.prototype.md = function(a) {
        a.td && (a.Ya() ? Ul(this, a, "overlay_viewable_end_of_session_impression") : Ul(this, a, "overlay_unviewable_impression"),
        a.td = !1)
    }
    ;
    var Nm = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        cb(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        if (e.opt_bounds)
            return a.o.g(yl("ol", d));
        if (p(d))
            if (c = xl(d),
            p(c))
                if (kl)
                    b = yl("ue", d);
                else if (b = a.C(b, e)) {
                    b: {
                        Sl(a);
                        "i" == jl && (b.kb = !0,
                        a.Ec(b));
                        c = e.opt_fullscreen;
                        p(c) && (b.Da = !!c);
                        hl() ? c = !1 : (c = K.D().T,
                        c = H && H.Bi || "nis" === c || "gsv" === c ? !1 : 0 === Jh(tf));
                        var f = c;
                        if (f) {
                            switch (b.ua()) {
                            case 1:
                                Vl(a, b, "pv");
                                break;
                            case 2:
                                a.Dc(b)
                            }
                            N.o.cancel();
                            jl = "pv";
                            N.done = !0
                        }
                        c = d.toLowerCase();
                        !f && pb(Lj, c) && Xl(a, b, e);
                        0 != b.aa && pb(Mj, c) && (b.kb || a.h || b.Gc());
                        (f = b.ab[c]) && Uj(b.ba, f);
                        switch (b.ua()) {
                        case 1:
                            var g = zl(c) ? a.J.custom_metric_viewable : a.J[c];
                            break;
                        case 2:
                            g = a.R[c]
                        }
                        if (g && (d = g.call(a, b, e, d),
                        p(d))) {
                            e = yl(void 0, c);
                            cb(e, d);
                            d = e;
                            break b
                        }
                        d = void 0
                    }
                    3 == b.aa && a.B(b);
                    b = d
                } else
                    b = yl("nf", d);
            else
                b = void 0;
        else
            kl ? b = yl("ue") : (b = a.C(b, e)) ? (d = yl(),
            cb(d, vk(b, !0, !1, !1)),
            b = d) : b = yl("nf");
        return a.o.g(b)
    };
    P.prototype.K = function(a) {
        this.h && 1 == a.ua() && Om(this, a)
    }
    ;
    P.prototype.Ec = function(a) {
        this.h && 1 == a.ua() && Om(this, a)
    }
    ;
    var Om = function(a, b) {
        var c;
        if (b.Na && Km(a)) {
            var d = a.w[b.Na];
            d ? c = function(a, b) {
                Pm(d, a, b)
            }
            : null !== d && Dh("lidar::missingPlayerCallback", Error())
        } else
            c = Ba("ima.common.triggerViewabilityMeasurementUpdate");
        if (v(c)) {
            var e = rk(b);
            e.nativeVolume = a.G;
            c(b.ka, e)
        }
    }
      , Qm = function(a, b, c) {
        a.w[b] = c
    }
      , Km = function(a) {
        return "exc" == K.D().T || "h" != Tl(a) && "m" != Tl(a) ? !1 : 0 != a.L
    };
    P.prototype.A = function(a, b, c, d) {
        a = Nl.prototype.A.call(this, a, b, c, d);
        this.F && (b = this.H,
        null == a.B && (a.B = new Pj),
        b.g[a.ka] = a.B,
        a.B.w = xk);
        return a
    }
    ;
    P.prototype.B = function(a) {
        a && 1 == a.ua() && this.F && delete this.H.g[a.ka];
        return Nl.prototype.B.call(this, a)
    }
    ;
    var Rm = function(a) {
        var b = {};
        return b.viewability = a.g,
        b.googleViewability = a.l,
        b.moatInit = a.w,
        b.moatViewability = a.B,
        b.integralAdsViewability = a.o,
        b.doubleVerifyViewability = a.h,
        b
    }
      , En = function(a, b, c) {
        c = void 0 === c ? {} : c;
        a = Nm(P.D(), b, c, a);
        return Rm(a)
    };
    Da(P);
    u("Goog_AdSense_Lidar_sendVastEvent", Ch(193, En, void 0, Yl), void 0);
    u("Goog_AdSense_Lidar_getViewability", Ch(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = Nm(P.D(), a, b);
        return Rm(a)
    }), void 0);
    u("Goog_AdSense_Lidar_getUrlSignalsArray", Ch(195, function() {
        return Fm()
    }), void 0);
    u("Goog_AdSense_Lidar_getUrlSignalsList", Ch(196, function() {
        return we(Fm())
    }), void 0);
    var Fn = function() {
        var a = dg();
        if (a == a.top)
            return 0;
        for (; a && a != a.top && Cf(a); a = a.parent) {
            if (a.sf_)
                return 2;
            if (a.$sf)
                return 3;
            if (a.inGptIF)
                return 4;
            if (a.inDapIF)
                return 5
        }
        return 1
    };
    var Gn = function(a, b) {
        this.h = {};
        this.g = [];
        this.o = this.l = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof Gn)
                for (c = a.Sa(),
                d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d])
    };
    h = Gn.prototype;
    h.Ha = function() {
        return this.l
    }
    ;
    h.pa = function() {
        Hn(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.h[this.g[b]]);
        return a
    }
    ;
    h.Sa = function() {
        Hn(this);
        return this.g.concat()
    }
    ;
    h.isEmpty = function() {
        return 0 == this.l
    }
    ;
    h.clear = function() {
        this.h = {};
        this.o = this.l = this.g.length = 0
    }
    ;
    var Hn = function(a) {
        if (a.l != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                In(a.h, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.l != a.g.length) {
            var e = {};
            for (c = b = 0; b < a.g.length; )
                d = a.g[b],
                In(e, d) || (a.g[c++] = d,
                e[d] = 1),
                b++;
            a.g.length = c
        }
    };
    h = Gn.prototype;
    h.get = function(a, b) {
        return In(this.h, a) ? this.h[a] : b
    }
    ;
    h.set = function(a, b) {
        In(this.h, a) || (this.l++,
        this.g.push(a),
        this.o++);
        this.h[a] = b
    }
    ;
    h.forEach = function(a, b) {
        for (var c = this.Sa(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    h.clone = function() {
        return new Gn(this)
    }
    ;
    h.rb = function(a) {
        Hn(this);
        var b = 0
          , c = this.o
          , d = this
          , e = new uj;
        e.next = function() {
            if (c != d.o)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length)
                throw tj;
            var e = d.g[b++];
            return a ? e : d.h[e]
        }
        ;
        return e
    }
    ;
    var In = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var Jn = function(a, b) {
        this.g = this.A = this.o = "";
        this.C = null;
        this.w = this.l = "";
        this.B = !1;
        var c;
        a instanceof Jn ? (this.B = p(b) ? b : a.B,
        Kn(this, a.o),
        this.A = a.A,
        this.g = a.g,
        Ln(this, a.C),
        this.l = a.l,
        Mn(this, a.h.clone()),
        this.w = a.w) : a && (c = String(a).match(De)) ? (this.B = !!b,
        Kn(this, c[1] || "", !0),
        this.A = Nn(c[2] || ""),
        this.g = Nn(c[3] || "", !0),
        Ln(this, c[4]),
        this.l = Nn(c[5] || "", !0),
        Mn(this, c[6] || "", !0),
        this.w = Nn(c[7] || "")) : (this.B = !!b,
        this.h = new On(null,this.B))
    };
    Jn.prototype.toString = function() {
        var a = []
          , b = this.o;
        b && a.push(Pn(b, Qn, !0), ":");
        var c = this.g;
        if (c || "file" == b)
            a.push("//"),
            (b = this.A) && a.push(Pn(b, Qn, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.C,
            null != c && a.push(":", String(c));
        if (c = this.l)
            this.g && "/" != c.charAt(0) && a.push("/"),
            a.push(Pn(c, "/" == c.charAt(0) ? Rn : Sn, !0));
        (c = this.h.toString()) && a.push("?", c);
        (c = this.w) && a.push("#", Pn(c, Tn));
        return a.join("")
    }
    ;
    Jn.prototype.resolve = function(a) {
        var b = this.clone()
          , c = !!a.o;
        c ? Kn(b, a.o) : c = !!a.A;
        c ? b.A = a.A : c = !!a.g;
        c ? b.g = a.g : c = null != a.C;
        var d = a.l;
        if (c)
            Ln(b, a.C);
        else if (c = !!a.l) {
            if ("/" != d.charAt(0))
                if (this.g && !this.l)
                    d = "/" + d;
                else {
                    var e = b.l.lastIndexOf("/");
                    -1 != e && (d = b.l.substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length; ) {
                    var k = e[g++];
                    "." == k ? d && g == e.length && f.push("") : ".." == k ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && g == e.length && f.push("")) : (f.push(k),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.l = d : c = "" !== a.h.toString();
        c ? Mn(b, a.h.clone()) : c = !!a.w;
        c && (b.w = a.w);
        return b
    }
    ;
    Jn.prototype.clone = function() {
        return new Jn(this)
    }
    ;
    var Kn = function(a, b, c) {
        a.o = c ? Nn(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }
      , Ln = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.C = b
        } else
            a.C = null
    }
      , Mn = function(a, b, c) {
        b instanceof On ? (a.h = b,
        Un(a.h, a.B)) : (c || (b = Pn(b, Vn)),
        a.h = new On(b,a.B))
    }
      , Nn = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
      , Pn = function(a, b, c) {
        return q(a) ? (a = encodeURI(a).replace(b, Wn),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
      , Wn = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
      , Qn = /[#\/\?@]/g
      , Sn = /[#\?:]/g
      , Rn = /[#\?]/g
      , Vn = /[#\?@]/g
      , Tn = /#/g
      , On = function(a, b) {
        this.h = this.g = null;
        this.l = a || null;
        this.o = !!b
    }
      , Xn = function(a) {
        a.g || (a.g = new Gn,
        a.h = 0,
        a.l && Ee(a.l, function(b, c) {
            a.add(Db(b), c)
        }))
    };
    On.prototype.Ha = function() {
        Xn(this);
        return this.h
    }
    ;
    On.prototype.add = function(a, b) {
        Xn(this);
        this.l = null;
        a = Yn(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    var Zn = function(a, b) {
        Xn(a);
        b = Yn(a, b);
        In(a.g.h, b) && (a.l = null,
        a.h -= a.g.get(b).length,
        a = a.g,
        In(a.h, b) && (delete a.h[b],
        a.l--,
        a.o++,
        a.g.length > 2 * a.l && Hn(a)))
    };
    On.prototype.clear = function() {
        this.g = this.l = null;
        this.h = 0
    }
    ;
    On.prototype.isEmpty = function() {
        Xn(this);
        return 0 == this.h
    }
    ;
    var $n = function(a, b) {
        Xn(a);
        b = Yn(a, b);
        return In(a.g.h, b)
    };
    h = On.prototype;
    h.forEach = function(a, b) {
        Xn(this);
        this.g.forEach(function(c, d) {
            z(c, function(c) {
                a.call(b, c, d, this)
            }, this)
        }, this)
    }
    ;
    h.Sa = function() {
        Xn(this);
        for (var a = this.g.pa(), b = this.g.Sa(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    h.pa = function(a) {
        Xn(this);
        var b = [];
        if (q(a))
            $n(this, a) && (b = tb(b, this.g.get(Yn(this, a))));
        else {
            a = this.g.pa();
            for (var c = 0; c < a.length; c++)
                b = tb(b, a[c])
        }
        return b
    }
    ;
    h.set = function(a, b) {
        Xn(this);
        this.l = null;
        a = Yn(this, a);
        $n(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    h.get = function(a, b) {
        if (!a)
            return b;
        a = this.pa(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    h.toString = function() {
        if (this.l)
            return this.l;
        if (!this.g)
            return "";
        for (var a = [], b = this.g.Sa(), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.pa(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.l = a.join("&")
    }
    ;
    h.clone = function() {
        var a = new On;
        a.l = this.l;
        this.g && (a.g = this.g.clone(),
        a.h = this.h);
        return a
    }
    ;
    var Yn = function(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
      , Un = function(a, b) {
        b && !a.o && (Xn(a),
        a.l = null,
        a.g.forEach(function(a, b) {
            var c = b.toLowerCase();
            b != c && (Zn(this, b),
            Zn(this, c),
            0 < a.length && (this.l = null,
            this.g.set(Yn(this, c), ub(a)),
            this.h += a.length))
        }, a));
        a.o = b
    };
    var ao = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/sul www.google.com/pagead/xsul www.youtube.com/pagead/sul www.youtube.com/pagead/psul www.youtube.com/pagead/slav".split(" ")
      , bo = /\bocr\b/
      , co = 0
      , eo = {}
      , fo = function(a) {
        if (Bb(Qb(a)))
            return !1;
        if (0 <= a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&"))
            return !0;
        try {
            var b = new Jn(a)
        } catch (c) {
            return null != nb(ao, function(b) {
                return 0 < a.search(b)
            })
        }
        return b.w.match(bo) ? !0 : null != nb(ao, function(b) {
            return null != a.match(b)
        })
    }
      , jo = function(a, b) {
        if (a && (a = go(a),
        !Bb(a))) {
            var c = 'javascript:"<body><img src=\\""+' + a + '+"\\"></body>"';
            b ? ho(function(b) {
                io(b ? c : 'javascript:"<body><object data=\\""+' + a + '+"\\" type=\\"text/html\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')
            }) : io(c)
        }
    }
      , io = function(a) {
        var b = kd("IFRAME", {
            src: a,
            style: "display:none"
        });
        a = Zc(b).body;
        var c = de(function() {
            Wd(d);
            md(b)
        }, 15E3);
        var d = Nd(b, ["load", "error"], function() {
            de(function() {
                n.clearTimeout(c);
                md(b)
            }, 5E3)
        });
        a.appendChild(b)
    }
      , ho = function(a) {
        var b = eo.imageLoadingEnabled;
        if (null != b)
            a(b);
        else {
            var c = !1;
            ko(function(b, e) {
                delete eo[e];
                c || (c = !0,
                null != eo.imageLoadingEnabled || (eo.imageLoadingEnabled = b),
                a(b))
            })
        }
    }
      , ko = function(a) {
        var b = new Image
          , c = "" + co++;
        eo[c] = b;
        b.onload = function() {
            clearTimeout(d);
            a(!0, c)
        }
        ;
        var d = setTimeout(function() {
            a(!1, c)
        }, 300);
        b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    }
      , lo = function(a) {
        if (a) {
            var b = document.createElement("OBJECT");
            b.data = a;
            b.width = "1";
            b.height = "1";
            b.style.visibility = "hidden";
            var c = "" + co++;
            eo[c] = b;
            b.onload = b.onerror = function() {
                delete eo[c]
            }
            ;
            document.body.appendChild(b)
        }
    }
      , mo = function(a) {
        if (a) {
            var b = new Image
              , c = "" + co++;
            eo[c] = b;
            b.onload = b.onerror = function() {
                delete eo[c]
            }
            ;
            b.src = a
        }
    }
      , no = function(a, b) {
        a && (b ? ho(function(b) {
            b ? mo(a) : lo(a)
        }) : mo(a))
    }
      , go = function(a) {
        a instanceof Oc || (a = a.Wa ? a.Ia() : String(a),
        Qc.test(a) || (a = "about:invalid#zClosurez"),
        a = Rc(a));
        var b = Pc(a);
        if ("about:invalid#zClosurez" === b)
            return "";
        b instanceof Tc ? a = b : (a = null,
        b.oc && (a = b.bc()),
        b = Lb(b.Wa ? b.Ia() : String(b)),
        a = Uc(b, a));
        a instanceof Tc && a.constructor === Tc && a.l === Sc ? a = a.g : (Ea(a),
        a = "type_error:SafeHtml");
        return encodeURIComponent(String(we(a)))
    };
    var oo = /(?:\[|%5B)([a-zA-Z0-9_]+)(?:\]|%5D)/g
      , po = function(a, b) {
        return a.replace(oo, function(a, d) {
            try {
                var c = $a(b, d);
                if (null == c)
                    return a;
                c = c.toString();
                if ("" == c || !Bb(Qb(c)))
                    return encodeURIComponent(c).replace(/%2C/g, ",")
            } catch (f) {}
            return a
        })
    };
    var qo = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    function ro() {
        Ce.set("GoogleAdServingTest", "Good");
        var a = "Good" == Ce.get("GoogleAdServingTest");
        a && (Ce.get("GoogleAdServingTest"),
        Ce.set("GoogleAdServingTest", "", 0, void 0, void 0));
        return a
    }
    ;var so = ["*.youtu.be", "*.youtube.com"]
      , to = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" ")
      , uo = ["c.googlesyndication.com"];
    function vo(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)","i")).test(a)
    }
    var xo = function(a, b) {
        try {
            var c = (new Jn(b)).g;
            c = c.replace(/^www./i, "");
            return a.some(function(a) {
                return wo(a, c)
            })
        } catch (d) {
            return !1
        }
    };
    function wo(a, b) {
        if (Bb(Qb(b)))
            return !1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return "*." == a.substr(0, 2) ? (a = a.substr(2),
        a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    }
    ;var yo = function(a, b, c) {
        Df(b, function(b, e) {
            !b && 0 !== b || c[e] || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(b)),
            c[e] = !0)
        });
        return a
    }
      , Eo = function(a, b, c, d, e, f, g, k) {
        f = void 0 === f ? Infinity : f;
        g = void 0 === g ? !1 : g;
        oh.call(this, a, k);
        var m = this;
        this.I = 0;
        this.F = f;
        this.R = b;
        this.G = c;
        this.P = d;
        this.V = e;
        this.L = !("csi.gstatic.com" !== this.G || !this.g.navigator || !this.g.navigator.sendBeacon);
        this.A = {};
        this.g.performance && this.g.performance.now || zo(this, "dat", 1);
        this.g.navigator && this.g.navigator.deviceMemory && zo(this, "dmc", this.g.navigator.deviceMemory);
        this.J = !g;
        this.H = function() {
            m.g.setTimeout(function() {
                return Ao(m)
            }, 1100)
        }
        ;
        this.W = [];
        this.M = function() {
            z(m.W, function(a) {
                try {
                    a()
                } catch (t) {}
            });
            Ao(m)
        }
        ;
        this.K = this.g.setTimeout(function() {
            return Ao(m)
        }, 5E3);
        this.l = {};
        this.B = b.length + c.length + d.length + e.length + 3;
        this.o = 0;
        z(this.events, function(a) {
            return Bo(m, a)
        });
        Co(this);
        Do(this)
    };
    ha(Eo, oh);
    var Do = function(a) {
        "complete" === a.g.document.readyState ? a.g.setTimeout(function() {
            return Ao(a)
        }, 0) : Xf(a.g, "load", a.H);
        Xf(a.g, "unload", a.M)
    }
      , zo = function(a, b, c) {
        c = String(c);
        a.B = null != a.A[b] ? a.B + (c.length - a.A[b].length) : a.B + (b.length + c.length + 2);
        a.A[b] = c
    }
      , Fo = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        var f = null == a.l[b] ? b.length + c.length + 2 : d ? c.length + e.length : c.length - a.l[b].length;
        8E3 < a.B + a.o + f && (Ao(a),
        f = b.length + c.length + 2);
        a.l[b] = d && null != a.l[b] ? a.l[b] + ("" + e + c) : c;
        a.o += f;
        6E3 <= a.B + a.o && Ao(a)
    }
      , Ao = function(a) {
        if (a.h && a.J) {
            try {
                if (a.o) {
                    var b = a.l;
                    a.I++;
                    var c = a.R + "//" + a.G + a.P + a.V
                      , d = {};
                    c = yo(c, a.A, d);
                    c = yo(c, b, d);
                    a.g.google_timing_params && (c = yo(c, a.g.google_timing_params, d),
                    a.g.google_timing_params = void 0);
                    var e = c;
                    b = !1;
                    try {
                        b = a.L && a.g.navigator && a.g.navigator.sendBeacon(e, null)
                    } catch (f) {
                        a.L = !1
                    }
                    b || Zf(a.g, e, void 0);
                    Co(a);
                    a.I === a.F && a.w()
                }
            } catch (f) {
                (new wh).La(358, f)
            }
            a.l = {};
            a.o = 0;
            a.events.length = 0;
            a.g.clearTimeout(a.K);
            a.K = 0
        }
    }
      , Co = function(a) {
        zo(a, "puid", (a.I + 1).toString(36) + "~" + x().toString(36))
    }
      , Bo = function(a, b) {
        var c = "met." + b.type
          , d = r(b.value) ? Math.round(b.value).toString(36) : b.value
          , e = Math.round(b.duration);
        b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") + ("." + d) + (0 < e ? "_" + e.toString(36) : "");
        Fo(a, c, b, !0, "~")
    };
    Eo.prototype.C = function(a) {
        this.h && this.I < this.F && (oh.prototype.C.call(this, a),
        Bo(this, a))
    }
    ;
    Eo.prototype.w = function() {
        oh.prototype.w.call(this);
        this.g.clearTimeout(this.K);
        this.o = this.K = 0;
        this.l = {};
        Yf(this.g, "load", this.H);
        Yf(this.g, "unload", this.M)
    }
    ;
    var Ho = function() {
        this.g = new Eo(1,"https:","csi.gstatic.com","/csi?v=2&s=","ima",void 0,!0);
        Go(this, "c", Ej());
        this.h = "0"
    }
      , Go = function(a, b, c) {
        null != c && zo(a.g, b, c)
    };
    Da(Ho);
    var ima = {};
    var Io = function(a) {
        this.h = a
    };
    Io.prototype.g = function() {
        return this.h
    }
    ;
    var Jo = function() {
        F.call(this);
        this.currentTime = 0
    };
    y(Jo, F);
    var Ko = function(a, b, c) {
        this.l = b;
        this.h = c;
        this.o = a
    };
    y(Ko, Error);
    h = Ko.prototype;
    h.je = function() {
        return this.g
    }
    ;
    h.ke = function() {
        return this.l
    }
    ;
    h.ie = function() {
        return this.h
    }
    ;
    h.Wd = function() {
        return 1E3 > this.h ? this.h : 900
    }
    ;
    h.ne = function() {
        return this.o
    }
    ;
    h.toString = function() {
        return "AdError " + this.h + ": " + this.l + (null != this.g ? " Caused by: " + this.g : "")
    }
    ;
    var Lo = function(a) {
        if (null == a.errorCode || null == a.errorMessage || null == a.type)
            return null;
        for (var b = new Ko(a.type,a.errorMessage,a.errorCode), c = b, d = a.innerError, e = 0; 3 > e; ++e)
            if (d instanceof Object) {
                var f = new Ko(d.type,d.errorMessage,d.errorCode);
                c = c.g = f;
                d = d.innerError
            } else {
                null != d && (c.g = Error(a.innerError));
                break
            }
        return b
    };
    var Mo = function(a, b) {
        yd.call(this, "adError");
        this.h = a;
        this.o = b ? b : null
    };
    y(Mo, yd);
    Mo.prototype.w = function() {
        return this.h
    }
    ;
    Mo.prototype.B = function() {
        return this.o
    }
    ;
    var Q = function(a, b, c) {
        yd.call(this, a);
        this.w = b;
        this.o = null != c ? c : null
    };
    y(Q, yd);
    Q.prototype.A = function() {
        return this.w
    }
    ;
    Q.prototype.C = function() {
        return this.o
    }
    ;
    var No = function(a) {
        this.g = a
    }
      , Qo = function() {
        var a = Oo(R);
        return Po(a, "disableExperiments")
    }
      , Po = function(a, b) {
        return Va(a.g, b) && (a = a.g[b],
        wa(a)) ? a : !1
    }
      , Ro = function(a) {
        if (Va(a.g, "forceExperimentIds")) {
            a = a.g.forceExperimentIds;
            var b = []
              , c = 0;
            Fa(a) && a.forEach(function(a) {
                r(a) && (b[c++] = a)
            });
            return b
        }
        return null
    };
    var S = function() {
        this.K = "always";
        this.C = 4;
        this.J = 1;
        this.g = 0;
        this.l = !0;
        this.h = !1;
        this.A = "en";
        this.V = this.G = !1;
        this.I = this.B = "";
        this.H = null;
        this.Y = this.P = -1;
        this.W = this.M = this.L = "";
        this.o = !1;
        this.w = !0;
        try {
            this.ga = Em(void 0)[0]
        } catch (a) {}
    }
      , So = "af am ar_eg ar_sa ar_xb ar be bg bn ca cs da de_at de_cn de el en_au en_ca en_gb en_ie en_in en_sg en_xa en_xc en_za en es_419 es_ar es_bo es_cl es_co es_cr es_do es_ec es_gt es_hn es_mx es_ni es_pa es_pe es_pr es_py es_sv es_us es_uy es_ve es et eu fa fi fil fr_ca fr_ch fr gl gsw gu he hi hr hu id in is it iw ja kn ko ln lo lt lv ml mo mr ms nb ne nl no pl pt_br pt_pt pt ro ru sk sl sr_latn sr sv sw ta te th tl tr uk ur vi zh_cn zh_hk zh_tw zh zu".split(" ")
      , To = function(a) {
        a = Qb(a);
        Bb(a) || (a = a.substring(0, 20));
        return a
    };
    h = S.prototype;
    h.qf = function(a) {
        this.K = a
    }
    ;
    h.df = function() {
        return this.K
    }
    ;
    h.xf = function(a) {
        this.C = a
    }
    ;
    h.hf = function() {
        return this.C
    }
    ;
    h.Af = function(a) {
        this.R = a
    }
    ;
    h.lf = function() {
        return this.R
    }
    ;
    h.Cf = function(a) {
        wa(a) && (this.J = a ? 1 : 0)
    }
    ;
    h.Df = function(a) {
        this.J = a
    }
    ;
    h.pf = function(a) {
        this.l = a
    }
    ;
    h.mf = function() {
        return this.l
    }
    ;
    h.fg = function() {
        return !1
    }
    ;
    h.eg = function() {
        return !1
    }
    ;
    h.Bf = function(a) {
        this.h = a
    }
    ;
    h.Lf = function() {
        return this.h
    }
    ;
    h.dg = function() {
        return !0
    }
    ;
    h.ca = function() {
        return !1
    }
    ;
    h.sc = function() {
        return !1
    }
    ;
    h.Kf = function() {
        return !1
    }
    ;
    h.uf = function(a) {
        this.G = a
    }
    ;
    h.nf = function() {
        return this.G
    }
    ;
    h.vf = function(a) {
        this.V = a
    }
    ;
    h.Qb = function() {
        return this.V
    }
    ;
    h.rc = function() {
        return !1
    }
    ;
    h.ag = function() {
        return !1
    }
    ;
    h.wf = function(a) {
        if (null != a) {
            a = a.toLowerCase().replace("-", "_");
            if (!So.includes(a) && (a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "",
            !So.includes(a)))
                return;
            this.A = a
        }
    }
    ;
    h.Ud = function() {
        return this.A
    }
    ;
    h.yf = function(a) {
        this.B = To(a)
    }
    ;
    h.jf = function() {
        return this.B
    }
    ;
    h.zf = function(a) {
        this.I = To(a)
    }
    ;
    h.kf = function() {
        return this.I
    }
    ;
    var Oo = function(a) {
        if (null == a.H) {
            var b = {}
              , c = (new Jn(C().location.href)).h;
            if ($n(c, "tcnfp"))
                try {
                    b = JSON.parse(c.get("tcnfp"))
                } catch (d) {}
            a.H = new No(b)
        }
        return a.H
    };
    S.prototype.Z = function(a) {
        this.P = a
    }
    ;
    S.prototype.fa = function(a) {
        this.Y = a
    }
    ;
    var Wo = function() {
        var a = R;
        Uo();
        a.L = Vo[1] || ""
    }
      , Xo = function() {
        var a = R;
        Uo();
        a.W = Vo[6] || ""
    }
      , Yo = function() {
        var a = R;
        Uo();
        a.M = Vo[4] || ""
    };
    h = S.prototype;
    h.sf = function(a) {
        this.o = a
    }
    ;
    h.ff = function() {
        return this.o
    }
    ;
    h.rf = function(a) {
        this.w = a
    }
    ;
    h.tf = function() {}
    ;
    h.gf = function() {
        return !0
    }
    ;
    var R = new S;
    var Zo = {
        Fg: "application/dash+xml",
        rh: "video/mp4",
        th: "video/mpeg",
        oh: "application/x-mpegURL",
        xh: "video/ogg",
        gi: "video/3gpp",
        xi: "video/webm",
        qh: "audio/mpeg",
        sh: "audio/mp4"
    };
    var $o = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var ap = function(a) {
        return (a = a.exec(Yb)) ? a[1] : ""
    };
    (function() {
        if (he)
            return ap(/Firefox\/([0-9.]+)/);
        if (mc || nc || lc)
            return zc;
        if (pe)
            return fc() || A("iPad") || A("iPod") ? ap(/CriOS\/([0-9.]+)/) : ap(/Chrome\/([0-9.]+)/);
        if (qe && !(fc() || A("iPad") || A("iPod")))
            return ap(/Version\/([0-9.]+)/);
        if (ie || je) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Yb);
            if (a)
                return a[1] + "." + a[2]
        } else if (oe)
            return (a = ap(/Android\s+([0-9.]+)/)) ? a : ap(/Version\/([0-9.]+)/);
        return ""
    }
    )();
    var bp = {}
      , cp = ""
      , dp = /OS (\S+) like/
      , ep = /Android ([\d\.]+)/
      , fp = function() {
        return sc && !tc || Nb(Yb, "iPod")
    }
      , gp = function() {
        return fp() || tc
    }
      , ip = function(a) {
        return gp() && hp(dp, a)
    }
      , hp = function(a, b) {
        null == bp[b] && (Bb(cp) && (a = a.exec(Yb)) && (cp = a[1]),
        (a = cp) ? (a = a.replace(/_/g, "."),
        bp[b] = 0 <= Sb(a, b)) : bp[b] = !1);
        return bp[b]
    }
      , jp = function() {
        var a = Yb;
        return a ? Nb(a, "Nintendo WiiU") : !1
    }
      , kp = function() {
        var a = Yb;
        return Nb(a, "AppleTV") || Nb(a, "tvOS")
    }
      , lp = function() {
        return oe || (R.ca() || !1) && qc && !(qc && hp(ep, 4.4))
    }
      , mp = function(a) {
        return R.ca() || R.Qb() || gp() && (!(tc || ip(10) && R.o) || !a) || qc && (!qc || !hp(ep, 4)) || hl() ? !0 : !1
    };
    var np = ["*.googlesyndication.com", "gcdn.2mdn.net"];
    var op = function(a) {
        try {
            a: {
                var b = a
                  , c = void 0
                  , d = b.length - 11 - 2;
                if (!(-1 == b.indexOf("URL_SIGNALS") || 2048 <= d || !c && !window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
                    c = c || window.Goog_AdSense_Lidar_getUrlSignalsArray();
                    d = {};
                    for (var e = 0; e < c.length; ++e) {
                        d.URL_SIGNALS = c[e];
                        var f = po(b, d);
                        if (2048 > f.length) {
                            a = f;
                            break a
                        }
                    }
                }
                a = b
            }
        } catch (l) {}
        try {
            f = a;
            var g = kp() ? "https" : window.location.protocol;
            g = void 0 === g ? window.location.protocol : g;
            b = !1;
            vo(f, uo) ? b = !1 : (null == f ? 0 : xo(so, f)) ? b = !0 : "https:" == g && vo(f, to) && (b = !0);
            if (b) {
                var k = new Jn(f);
                "https" == k.o ? a = f : (Kn(k, "https"),
                a = k.toString())
            } else
                a = f;
            var m = !R.ca();
            (g = a) && (fo(g) ? jo(g, m) : no(g, m))
        } catch (l) {}
    };
    var pp = function(a, b) {
        this.message = a;
        this.g = b
    }
      , qp = new pp("Invalid usage of the API. Cause: {0}",900)
      , rp = new pp("Failed to initialize ad playback element before starting ad playback.",400)
      , sp = new pp("The provided {0} information: {1} is invalid.",1101)
      , tp = function(a, b, c) {
        var d = b || null;
        if (!(d instanceof Ko)) {
            var e = a.g
              , f = a.message
              , g = Array.prototype.slice.call(arguments, 2);
            if (0 < g.length)
                for (var k = 0; k < g.length; k++)
                    f = f.replace(new RegExp("\\{" + k + "\\}","ig"), g[k]);
            e = new Ko("adPlayError",f,e);
            e.g = d;
            d = e
        }
        return d
    };
    var up = function(a) {
        vd.call(this);
        this.o = a;
        this.h = {}
    };
    y(up, vd);
    var vp = [];
    up.prototype.O = function(a, b, c, d) {
        return wp(this, a, b, c, d)
    }
    ;
    var wp = function(a, b, c, d, e, f) {
        Fa(c) || (c && (vp[0] = c.toString()),
        c = vp);
        for (var g = 0; g < c.length; g++) {
            var k = Od(b, c[g], d || a.handleEvent, e || !1, f || a.o || a);
            if (!k)
                break;
            a.h[k.key] = k
        }
        return a
    }
      , xp = function(a, b, c, d, e, f) {
        if (Fa(c))
            for (var g = 0; g < c.length; g++)
                xp(a, b, c[g], d, e, f);
        else
            (b = Nd(b, c, d || a.handleEvent, e, f || a.o || a)) && (a.h[b.key] = b)
    };
    up.prototype.Oa = function(a, b, c, d, e) {
        if (Fa(b))
            for (var f = 0; f < b.length; f++)
                this.Oa(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = Ha(d) ? !!d.capture : !!d,
            e = e || this.o || this,
            c = Pd(c),
            d = !!d,
            b = Cd(a) ? Jd(a.B, String(b), c, d, e) : a ? (a = Rd(a)) ? Jd(a, b, c, d, e) : null : null,
            b && (Wd(b),
            delete this.h[b.key])
    }
    ;
    var yp = function(a) {
        Na(a.h, function(a, c) {
            this.h.hasOwnProperty(c) && Wd(a)
        }, a);
        a.h = {}
    };
    up.prototype.U = function() {
        up.da.U.call(this);
        yp(this)
    }
    ;
    up.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var zp = function(a) {
        Jo.call(this);
        this.currentTime = a.currentTime;
        if (!("currentTime"in a) || isNaN(a.currentTime))
            throw tp(sp, null, "content", "currentTime");
        this.duration = "duration"in a && !isNaN(a.duration) ? a.duration : -1;
        this.h = a;
        this.g = new ce(250);
        this.l = new up(this);
        wp(this.l, this.g, "tick", this.o, !1, this)
    };
    y(zp, Jo);
    zp.prototype.start = function() {
        this.g.start()
    }
    ;
    zp.prototype.stop = function() {
        this.g.stop()
    }
    ;
    zp.prototype.U = function() {
        zp.da.U.call(this);
        this.l.X();
        this.g.X()
    }
    ;
    zp.prototype.o = function() {
        if ("currentTime"in this.h && !isNaN(this.h.currentTime)) {
            var a = this.currentTime;
            this.currentTime = this.h.currentTime;
            a != this.currentTime && this.dispatchEvent(new yd("currentTimeUpdate"))
        } else
            this.dispatchEvent(new yd("contentWrapperError")),
            this.stop()
    }
    ;
    var Ap = function() {
        this.loadVideoTimeout = R.ca() ? 15E3 : 8E3
    };
    h = Ap.prototype;
    h.autoAlign = !0;
    h.baseYouTubeUrl = null;
    h.bitrate = -1;
    h.uiElements = null;
    h.contentId = null;
    h.disableClickThrough = !1;
    h.enablePreloading = !1;
    h.customPlayerSupportsPreloading = !1;
    h.mimeTypes = null;
    h.restoreCustomPlaybackStateOnAdBreakComplete = !1;
    h.useLearnMoreButton = !1;
    h.useMuteToggleButton = !1;
    h.useStyledLinearAds = !1;
    h.useStyledNonLinearAds = !1;
    h.playAdsAfterTime = -1;
    h.useVideoAdUi = !0;
    h.enableVideoTouchMove = !1;
    h.youTubeAdNamespace = 0;
    h.loadVideoTimeout = 8E3;
    h.disableUi = !1;
    var Bp = function(a, b, c) {
        this.g = a;
        this.h = Math.min(Math.max(b || 0, 0), 1);
        this.l = null != c ? c : !0
    };
    var Cp = function(a) {
        this.l = a;
        this.h = new Gn;
        this.g = null
    }
      , Dp = function(a) {
        var b = Math.random()
          , c = 0
          , d = a.h.pa();
        d.forEach(function(a) {
            c += a.h
        });
        var e = 1 < c ? c : 1;
        a.g = null;
        for (var f = 0, g = 0; g < d.length; ++g)
            if (f += d[g].h,
            f / e >= b) {
                a.g = d[g];
                break
            }
    };
    var Gp = function() {
        this.h = null != n.G_testRunner;
        this.g = new Gn;
        U(this, "GvnExternalLayer", 31061774, .01);
        U(this, "GvnExternalLayer", 31061775, .01);
        U(this, "GvnExternalLayer", 41341310, 0);
        U(this, "GvnExternalLayer", 41341311, 0);
        U(this, "GvnExternalLayer", 420706068, .01);
        U(this, "GvnExternalLayer", 420706069, .01);
        U(this, "GvnExternalLayer", 41351070, .01);
        U(this, "GvnExternalLayer", 41351071, .01);
        U(this, "ActiveViewExternalLayer", 668123010, .01);
        U(this, "ActiveViewExternalLayer", 668123011, .01);
        U(this, "ActiveViewExternalLayer", 668123008, .01);
        U(this, "ActiveViewExternalLayer", 668123009, .01);
        U(this, "ActiveViewExternalLayer", 668123028, .01);
        U(this, "ActiveViewExternalLayer", 668123029, .01);
        U(this, "ActiveViewExternalLayer", 953563515, .01);
        U(this, "ActiveViewExternalLayer", 953563516, .01);
        U(this, "ActiveViewExternalLayer", 953563517, .01);
        U(this, "GvnExternalLayer", 413051065, .01);
        U(this, "GvnExternalLayer", 413051066, .01);
        U(this, "GvnExternalLayer", 651800003, .01);
        U(this, "GvnExternalLayer", 651800004, .01);
        U(this, "GvnExternalLayer", 667080011, .01);
        U(this, "GvnExternalLayer", 667080012, .01);
        U(this, "GvnExternalLayer", 231422001, .01);
        U(this, "GvnExternalLayer", 231422002, .01);
        U(this, "GvnExternalLayer", 667080009, 0);
        U(this, "GvnExternalLayer", 667080010, 0);
        U(this, "GvnExternalLayer", 4081988, 0);
        U(this, "GvnExternalLayer", 4081989, .01);
        U(this, "GvnExternalLayer", 651800005, .01);
        U(this, "GvnExternalLayer", 651800006, .01);
        U(this, "GvnExternalLayer", 231422003, .01);
        U(this, "GvnExternalLayer", 231422004, .01);
        U(this, "GvnExternalLayer", 1369610001, .05);
        U(this, "GvnExternalLayer", 40819880, .005);
        U(this, "GvnExternalLayer", 40819881, .005);
        U(this, "GvnExternalLayer", 1369610002, .01);
        U(this, "GvnExternalLayer", 1369610003, .01);
        if (!Nb(navigator.userAgent, "AppleTV")) {
            Ep(this);
            var a = Oo(R);
            a = Ro(a);
            null != a && (this.h = !1,
            Fp(this, a.map(String)))
        }
    }
      , Hp = ["ActiveViewExternalLayer"]
      , Ip = null
      , Jp = function() {
        Ip || (Ip = new Gp);
        return Ip
    }
      , U = function(a, b, c, d) {
        Bb(Qb(b)) || isNaN(c) || 0 >= c || (c = new Bp(c,d),
        Kp(a, b).h.set(c.g, c))
    }
      , Ep = function(a) {
        Qo() || R.rc() || a.g.pa().forEach(function(a) {
            Dp(a)
        })
    }
      , Fp = function(a, b) {
        b.forEach(function(b) {
            var c = Number(b);
            b = "FORCED_PUB_EXP_LAYER_" + b;
            isNaN(c) || 0 >= c || Bb(Qb(b)) || (Kp(a, b).g = new Bp(c,0,!0))
        })
    }
      , Lp = function() {
        var a = {};
        Jp().g.pa().forEach(function(b) {
            var c = b.g;
            if (c) {
                var d = {};
                d.experimentId = c.g;
                d.shouldReport = c.l;
                a[b.l] = d
            } else
                a[b.l] = {}
        });
        return a
    }
      , Mp = function(a, b) {
        return a.h ? !1 : a.g.pa().some(function(a) {
            return !!a.g && a.g.g == b
        })
    }
      , Np = function() {
        var a = Jp();
        if (a.h)
            return "";
        var b = [];
        a.g.pa().forEach(function(a) {
            (a = a.g) && a.l && b.push(a.g)
        });
        return b.sort().join(",")
    }
      , Kp = function(a, b) {
        var c = a.g.get(b);
        null == c && (c = new Cp(b),
        a.g.set(b, c));
        return c
    }
      , Op = function() {
        var a = []
          , b = Jp();
        Hp.forEach(function(c) {
            (c = (c = Kp(b, c)) ? c.g : null) && a.push(c.g)
        });
        return a
    };
    var Pp = function() {
        this.l = -1;
        this.h = this.g = null
    }
      , Qp = new Pp;
    Pp.prototype.clear = function() {
        this.h = this.g = null
    }
    ;
    var Rp = function() {
        var a = "h.3.221.0";
        null != Qp.h ? (a += "/n." + Qp.h,
        null != Qp.g && (a += "/" + Qp.g)) : R.ca() && (a += "/o.0.0.0");
        return a
    };
    var Sp = function() {
        this.h = .01 > Math.random();
        this.g = Math.floor(4503599627370496 * Math.random())
    };
    Da(Sp);
    var Wp = function(a, b, c, d) {
        if (null == n.G_testRunner && (a.h || d) && !kp()) {
            c = c || {};
            c.lid = b;
            c.sdkv = Rp();
            b = Np();
            Bb(Qb(b)) || (c.e = b);
            c = Tp(a, c);
            var e = new Jn("http://pagead2.googlesyndication.com/pagead/gen_204");
            Na(c, function(a, b) {
                e.h.set(b, null == a ? "" : "boolean" == typeof a ? a ? "t" : "f" : "" + a)
            }, a);
            a = Up();
            Kn(e, a.o);
            R.rc() || (a = e.toString(),
            b = e.h.get("url"),
            null != b && cc() && 2083 < a.length && (a = Vp(e, b)),
            op(a))
        }
    }
      , Vp = function(a, b) {
        a.h.set("url", "");
        try {
            var c = 2083 - a.toString().length - 1;
            if (0 >= c)
                return a.toString();
            for (var d = b.slice(0, c), e = encodeURIComponent(d), f = c; 0 < f && e.length > c; )
                d = b.slice(0, f--),
                e = encodeURIComponent(d);
            a.h.set("url", d)
        } catch (g) {}
        return a.toString()
    }
      , Tp = function(a, b) {
        b.id = "ima_html5";
        var c = Up();
        b.c = a.g;
        b.domain = c.g;
        return b
    }
      , Up = function() {
        var a = C()
          , b = document;
        return new Jn(a.parent == a ? a.location.href : b.referrer)
    };
    var Xp = function() {
        F.call(this);
        this.A = this.F = this.J = this.G = !1;
        this.h = 0;
        this.o = [];
        this.C = !1;
        this.M = this.L = Infinity;
        this.l = 0;
        this.w = new up(this);
        this.H = {}
    };
    y(Xp, F);
    var Zp = function(a, b) {
        null == b || a.G || (a.g = b,
        Yp(a),
        a.G = !0)
    }
      , aq = function(a) {
        null != a.g && a.G && ($p(a),
        a.G = !1,
        a.F = !1,
        a.A = !1,
        a.h = 0,
        a.o = [],
        a.C = !1)
    }
      , Yp = function(a) {
        $p(a);
        !(a.g instanceof F) && "ontouchstart"in document.documentElement && gp() ? (a.H = {
            touchstart: w(a.Y, a),
            touchmove: w(a.V, a),
            touchend: w(a.W, a)
        },
        Na(a.H, function(a, c) {
            this.g.addEventListener(c, a, !1)
        }, a)) : a.w.O(a.g, "click", a.R)
    }
      , $p = function(a) {
        a.w.Oa(a.g, "click", a.R);
        Na(a.H, function(a, c) {
            this.g.removeEventListener(c, a, !1)
        }, a);
        a.H = {}
    };
    Xp.prototype.Y = function(a) {
        this.F = !0;
        this.h = a.touches.length;
        this.l && (window.clearTimeout(this.l),
        this.l = 0,
        this.J = !0);
        (this.C = bq(this, a.touches) || 1 != a.touches.length) ? this.M = this.L = Infinity : (this.L = a.touches[0].clientX,
        this.M = a.touches[0].clientY);
        a = a.touches;
        this.o = [];
        for (var b = 0; b < a.length; b++)
            this.o.push(a[b].identifier)
    }
    ;
    Xp.prototype.V = function(a) {
        this.h = a.touches.length;
        if (!ip(8) || Math.pow(a.changedTouches[0].clientX - this.L, 2) + Math.pow(a.changedTouches[0].clientY - this.M, 2) > Math.pow(5, 2))
            this.A = !0
    }
    ;
    Xp.prototype.W = function(a) {
        !this.F || 1 != this.h || this.A || this.J || this.C || !bq(this, a.changedTouches) || (this.l = window.setTimeout(w(this.P, this), 300));
        this.h = a.touches.length;
        0 == this.h && (this.A = this.F = !1,
        this.o = []);
        this.J = !1
    }
    ;
    Xp.prototype.R = function() {
        this.P()
    }
    ;
    var bq = function(a, b) {
        for (var c = 0; c < b.length; c++)
            if (a.o.includes(b[c].identifier))
                return !0;
        return !1
    };
    Xp.prototype.P = function() {
        this.l = 0;
        this.dispatchEvent(new yd("click"))
    }
    ;
    Xp.prototype.U = function() {
        aq(this);
        this.w.X();
        this.w = null;
        Xp.da.U.call(this)
    }
    ;
    var cq = function(a) {
        F.call(this);
        this.g = a || "goog_" + Tb++;
        this.l = []
    };
    y(cq, F);
    cq.prototype.h = !1;
    cq.prototype.connect = function() {
        for (this.h = !0; 0 != this.l.length; ) {
            var a = this.l.shift();
            this.sendMessage(a.name, a.type, a.data)
        }
    }
    ;
    var dq = function(a, b, c, d) {
        a.h ? a.sendMessage(b, c, d) : a.l.push({
            name: b,
            type: c,
            data: d
        })
    }
      , eq = function(a, b, c, d, e) {
        yd.call(this, a);
        this.ia = b;
        this.ha = c;
        this.Lb = d;
        this.jd = e
    };
    y(eq, yd);
    eq.prototype.toString = function() {
        return ""
    }
    ;
    var fq = function(a, b) {
        cq.call(this, b);
        this.o = a;
        this.wa = null;
        this.w = new up(this);
        this.w.O(C(), "message", this.A)
    };
    y(fq, cq);
    var gq = function(a) {
        if (null == a || !q(a) || 0 != a.lastIndexOf("ima://", 0))
            return null;
        a = a.substr(6);
        try {
            return JSON.parse(a)
        } catch (b) {
            return null
        }
    };
    fq.prototype.sendMessage = function(a, b, c) {
        null != this.wa && null != this.wa.postMessage && this.wa.postMessage(hq(this, a, b, c), "*");
        null != this.wa && null == this.wa.postMessage && Wp(Sp.D(), 11)
    }
    ;
    fq.prototype.U = function() {
        this.w.X();
        fq.da.U.call(this)
    }
    ;
    fq.prototype.A = function(a) {
        a = a.h;
        var b = gq(a.data);
        if (iq(this, b)) {
            if (null == this.wa)
                this.wa = a.source,
                this.h || this.connect();
            else if (this.wa != a.source)
                return;
            iq(this, b) && this.dispatchEvent(new eq(b.name,b.type,b.data || {},b.sid,a.origin))
        }
    }
    ;
    var hq = function(a, b, c, d) {
        var e = {};
        e.name = b;
        e.type = c;
        null != d && (e.data = d);
        e.sid = a.g;
        e.channel = a.o;
        return "ima://" + we(e)
    }
      , iq = function(a, b) {
        if (null == b)
            return !1;
        var c = b.channel;
        if (null == c || c != a.o)
            return !1;
        b = b.sid;
        return null == b || "*" != a.g && b != a.g ? !1 : !0
    };
    var jq = function(a, b) {
        F.call(this);
        this.o = a;
        this.l = b;
        this.g = {};
        this.h = new up(this);
        this.h.O(C(), "message", this.w)
    };
    y(jq, F);
    var kq = function(a, b) {
        var c = b.h;
        a.g.hasOwnProperty(c) && dq(a.g[c], b.type, b.ia, b.ha)
    }
      , mq = function(a, b, c, d) {
        a.g.hasOwnProperty(b) || (c = new fq(b,c),
        a.h.O(c, a.o, function(a) {
            this.dispatchEvent(new lq(a.type,a.ia,a.ha,a.Lb,a.jd,b))
        }),
        c.wa = d,
        c.connect(),
        a.g[b] = c)
    };
    jq.prototype.U = function() {
        this.h.X();
        for (var a in this.g)
            xd(this.g[a]);
        jq.da.U.call(this)
    }
    ;
    jq.prototype.w = function(a) {
        a = a.h;
        var b = gq(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.l && !this.g.hasOwnProperty(c)) {
                var d = b.sid;
                mq(this, c, d, a.source);
                this.dispatchEvent(new lq(b.name,b.type,b.data || {},d,a.origin,c))
            }
        }
    }
    ;
    var lq = function(a, b, c, d, e, f) {
        eq.call(this, a, b, c, d, e);
        this.h = f
    };
    y(lq, eq);
    var oq = function() {
        var a = Ba("google.ima.gptProxyInstance", C());
        if (null != a)
            return a;
        up.call(this);
        this.l = new jq("gpt",!0);
        wd(this, Ma(xd, this.l));
        this.O(this.l, "gpt", this.B);
        this.g = null;
        nq() || C().top === C() || (this.g = new jq("gpt",!1),
        wd(this, Ma(xd, this.g)),
        this.O(this.g, "gpt", this.w))
    };
    y(oq, up);
    var nq = function() {
        return !!Ba("googletag.cmd", C())
    }
      , pq = function() {
        var a = Ba("googletag.console", C());
        return null != a ? a : null
    };
    oq.prototype.B = function(a) {
        var b = a.jd
          , c = "//imasdk.googleapis.com".match(De);
        b = b.match(De);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.g)
                mq(this.g, a.h, a.Lb, C().parent),
                null != this.g && kq(this.g, a);
            else if (c = a.ha,
            null != c && p(c.scope)) {
                b = c.scope;
                c = c.args;
                var d;
                if ("proxy" == b)
                    c = a.ia,
                    "isGptPresent" == c ? d = nq() : "isConsolePresent" == c && (d = null != pq());
                else if (nq())
                    if ("pubads" == b || "companionAds" == b) {
                        d = a.ia;
                        var e = C().googletag;
                        if (null != e && null != e[b] && (e = e[b](),
                        null != e && (d = e[d],
                        null != d)))
                            try {
                                var f = d.apply(e, c)
                            } catch (g) {}
                        d = f
                    } else if ("console" == b) {
                        if (f = pq(),
                        null != f && (e = f[a.ia],
                        null != e))
                            try {
                                e.apply(f, c)
                            } catch (g) {}
                    } else if (null === b) {
                        d = a.ia;
                        f = C();
                        if (["googleGetCompanionAdSlots", "googleSetCompanionAdContents"].includes(d) && (d = f[d],
                        null != d))
                            try {
                                e = d.apply(f, c)
                            } catch (g) {}
                        d = e
                    }
                p(d) && (a.ha.returnValue = d,
                kq(this.l, a))
            }
    }
    ;
    oq.prototype.w = function(a) {
        kq(this.l, a)
    }
    ;
    var qq = function() {
        F.call(this)
    };
    y(qq, F);
    var rq = {
        vg: "autoplayDisallowed",
        xg: "beginFullscreen",
        CLICK: "click",
        Lg: "end",
        Mg: "endFullscreen",
        Ng: "error",
        Tg: "focusSkipButton",
        LOADED: "loaded",
        ph: "mediaLoadTimeout",
        Ic: "pause",
        Nh: "play",
        bi: "skip",
        ci: "skipShown",
        Jc: "start",
        ki: "timeUpdate",
        ii: "timedMetadata",
        wi: "volumeChange"
    };
    qq.prototype.Yc = function() {
        return !0
    }
    ;
    qq.prototype.reset = function(a) {
        this.uc() || this.Ab() || this.pause();
        gp() && !a && (this.nb(.001),
        this.load("", ""));
        fp() && this.jb() && !a && this.Zb()
    }
    ;
    var sq = function() {
        this.w = this.G = this.o = this.l = this.h = null;
        this.K = this.F = this.I = this.C = this.A = !1;
        this.timeout = -1;
        this.g = !1;
        this.B = null
    };
    var uq = function(a, b) {
        var c = Array.prototype.slice.call(arguments)
          , d = c.shift();
        if ("undefined" == typeof d)
            throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, k, m, l, t, E) {
            if ("%" == l)
                return "%";
            var e = c.shift();
            if ("undefined" == typeof e)
                throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = e;
            return tq[l].apply(null, arguments)
        })
    }
      , tq = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + Ob(" ", Number(c) - a.length) : Ob(" ", Number(c) - a.length) + a
        },
        f: function(a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c))
                return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + Ob(" ", a) : f + Ob(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        },
        d: function(a, b, c, d, e, f, g, k) {
            return tq.f(parseInt(a, 10), b, c, d, 0, f, g, k)
        }
    };
    tq.i = tq.d;
    tq.u = tq.d;
    var xq = function(a, b) {
        F.call(this);
        this.l = new up(this);
        this.G = !1;
        this.H = "goog_" + Tb++;
        this.F = new Gn;
        var c = this.H
          , d = R.ca() ? (Rf() ? "https:" : "http:") + uq("//imasdk.googleapis.com/js/core/admob/bridge_%s.html", R.A) : (Rf() ? "https:" : "http:") + uq("//imasdk.googleapis.com/js/core/bridge3.221.0_%s.html", R.A);
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 == e.location.href.indexOf(d) || 0 == e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (g) {}
                    e = e.parent
                } while (e != e.top)
            } catch (g) {}
            f = !1
        }
        f && (d += "?f=" + c);
        c = kd("IFRAME", {
            src: d + "#" + c,
            allowFullscreen: !0,
            allow: "autoplay",
            style: "border:0; opacity:0; margin:0; padding:0; position:relative;"
        });
        xp(this.l, c, "load", this.Sd, void 0);
        a.appendChild(c);
        this.h = c;
        this.A = vq(this);
        this.C = b;
        this.g = this.C.h;
        this.w = this.o = null;
        this.l.O(this.A, "mouse", this.J);
        this.l.O(this.A, "touch", this.M);
        null != this.g && (this.l.O(this.A, "displayContainer", this.Yd),
        this.l.O(this.A, "videoDisplay", this.L),
        this.l.O(this.A, "preloadVideoDisplay", this.Zd),
        wq(this, this.g, this.Cb));
        a = C();
        b = Ba("google.ima.gptProxyInstance", a);
        null == b && (b = new oq,
        u("google.ima.gptProxyInstance", b, a))
    };
    y(xq, F);
    var vq = function(a, b) {
        b = b || "*";
        var c = a.F.get(b);
        null == c && (c = new fq(a.H,b),
        a.G && (c.wa = pd(a.h),
        c.connect()),
        a.F.set(b, c));
        return c
    }
      , zq = function(a, b) {
        null != a.g && yq(a, a.g, a.Cb);
        a.g = b;
        wq(a, a.g, a.Cb)
    };
    xq.prototype.U = function() {
        this.l.X();
        null !== this.w && (this.w.X(),
        this.w = null);
        wj(this.F.rb(!1), function(a) {
            a.X()
        });
        this.F.clear();
        md(this.h);
        xq.da.U.call(this)
    }
    ;
    xq.prototype.J = function(a) {
        var b = a.ha
          , c = $e(this.h)
          , d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.ia, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        if (!qe || gp() || 0 == document.webkitIsFullScreen)
            this.h.blur(),
            window.focus();
        this.h.dispatchEvent(d)
    }
    ;
    var Aq = function(a, b) {
        var c = $e(a.h)
          , d = !!("TouchEvent"in window && 0 < TouchEvent.length);
        b = b.map(function(b) {
            return d ? new Touch({
                identifier: b.identifier,
                target: a.h,
                clientX: b.clientX,
                clientY: b.clientY,
                screenX: b.screenX,
                screenY: b.screenY,
                pageX: b.pageX + c.x,
                pageY: b.pageY + c.y
            }) : document.createTouch(window, a.h, b.identifier, b.pageX + c.x, b.pageY + c.y, b.screenX, b.screenY)
        });
        return d ? b : document.createTouchList.apply(document, b)
    };
    xq.prototype.M = function(a) {
        var b = a.ha
          , c = $e(this.h);
        if ("TouchEvent"in window && 0 < TouchEvent.length)
            b = {
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: b.detail,
                ctrlKey: b.ctrlKey,
                altKey: b.altKey,
                shiftKey: b.shiftKey,
                metaKey: b.metaKey,
                touches: Aq(this, b.touches),
                targetTouches: Aq(this, b.targetTouches),
                changedTouches: Aq(this, b.changedTouches)
            },
            a = new TouchEvent(a.ia,b),
            this.h.dispatchEvent(a);
        else {
            var d = document.createEvent("TouchEvent");
            d.initTouchEvent(a.ia, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, Aq(this, b.touches), Aq(this, b.targetTouches), Aq(this, b.changedTouches), b.scale, b.rotation);
            this.h.dispatchEvent(d)
        }
    }
    ;
    xq.prototype.L = function(a) {
        if (null != this.g) {
            var b = a.ha;
            switch (a.ia) {
            case "startTracking":
                this.g.jc();
                break;
            case "stopTracking":
                this.g.ib();
                break;
            case "exitFullscreen":
                this.g.Zb();
                break;
            case "play":
                this.g.zb();
                break;
            case "pause":
                this.g.pause();
                break;
            case "load":
                this.g.load(b.videoUrl, b.mimeType);
                break;
            case "setCurrentTime":
                this.g.nb(b.currentTime);
                break;
            case "setPlaybackOptions":
                this.g.Fc(Bq(b));
                break;
            case "setVolume":
                this.g.Mb(b.volume)
            }
        }
    }
    ;
    var Bq = function(a) {
        a = a.playbackOptions;
        var b = new sq;
        b.h = a.adFormat;
        b.o = a.adSenseAgcid;
        b.G = a.contentVideoDocId;
        b.w = a.ctaAnnotationTrackingEvents;
        a.showAnnotations && (b.I = !0);
        a.viewCountsDisabled && (b.F = !0);
        b.timeout = a.loadVideoTimeout;
        a.ibaDisabled && (b.A = !0);
        a.enablePreloading && (b.g = !0);
        b.l = a.adQemId;
        a.isPharma && (b.C = !0);
        a.useAutoplayFlag && (b.K = !0);
        b.B = a.endscreenAdTracking;
        return b
    };
    h = xq.prototype;
    h.Zd = function(a) {
        if (null != this.o) {
            var b = a.ha;
            switch (a.ia) {
            case "startTracking":
                this.o.jc();
                break;
            case "stopTracking":
                this.o.ib();
                break;
            case "setPlaybackOptions":
                this.o.Fc(Bq(b));
                break;
            case "load":
                this.o.load(b.videoUrl, b.mimeType)
            }
        }
    }
    ;
    h.Bc = function(a) {
        switch (a.type) {
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        default:
            return
        }
        dq(this.A, "preloadVideoDisplay", a, {})
    }
    ;
    h.Cb = function(a) {
        var b = {};
        switch (a.type) {
        case "autoplayDisallowed":
            a = "autoplayDisallowed";
            break;
        case "beginFullscreen":
            a = "fullscreen";
            break;
        case "endFullscreen":
            a = "exitFullscreen";
            break;
        case "click":
            a = "click";
            break;
        case "end":
            a = "end";
            break;
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        case "mediaLoadTimeout":
            a = "mediaLoadTimeout";
            break;
        case "pause":
            a = "pause";
            b.ended = this.g.Ab();
            break;
        case "play":
            a = "play";
            break;
        case "skip":
            a = "skip";
            break;
        case "start":
            a = "start";
            break;
        case "timeUpdate":
            a = "timeupdate";
            b.currentTime = this.g.ya();
            b.duration = this.g.xb();
            break;
        case "volumeChange":
            a = "volumeChange";
            b.volume = this.g.Wc();
            break;
        case "loadedmetadata":
            a = a.type;
            b.duration = this.g.xb();
            break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
            a = a.type;
            break;
        default:
            return
        }
        dq(this.A, "videoDisplay", a, b)
    }
    ;
    h.Yd = function(a) {
        switch (a.ia) {
        case "showVideo":
            null == this.w ? (this.w = new Xp,
            this.l.O(this.w, "click", this.Vf)) : aq(this.w);
            Zp(this.w, Cq(this.C));
            a = this.C;
            null != a.g && a.g.show();
            break;
        case "hide":
            null !== this.w && (this.w.X(),
            this.w = null);
            a = this.C;
            null != a.g && Dq(a.g.g, !1);
            break;
        case "getPreloadDisplay":
            null != this.g && null == this.o && (this.o = this.C.l,
            wq(this, this.o, this.Bc));
            break;
        case "swapVideoDisplays":
            if (null != this.g && null != this.o) {
                yq(this, this.g, this.Cb);
                yq(this, this.o, this.Bc);
                a = this.C;
                if (a.g && a.h && a.o && a.l) {
                    var b = a.h;
                    a.h = a.l;
                    a.l = b;
                    b = a.g;
                    a.g = a.o;
                    a.o = b;
                    zq(a.I, a.h)
                }
                this.g = this.C.h;
                this.o = this.C.l;
                wq(this, this.g, this.Cb);
                wq(this, this.o, this.Bc)
            }
        }
    }
    ;
    h.Vf = function() {
        dq(this.A, "displayContainer", "videoClick")
    }
    ;
    h.Sd = function() {
        wj(this.F.rb(!1), function(a) {
            a.wa = pd(this.h);
            a.connect()
        }, this);
        this.G = !0
    }
    ;
    var wq = function(a, b, c) {
        a.l.O(b, Ra(rq), c);
        a.l.O(b, $o, c)
    }
      , yq = function(a, b, c) {
        a.l.Oa(b, Ra(rq), c);
        a.l.Oa(b, $o, c)
    };
    var Eq = function(a) {
        if (Bb(Qb(a)))
            return null;
        var b = a.match(/^https?:\/\/[^\/]*youtu\.be\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/video\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/watch\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)
            return b[1];
        a = (new Jn(a)).h;
        return $n(a, "v") ? a.get("v").toString() : $n(a, "video_id") ? a.get("video_id").toString() : null
    };
    var Fq = function() {};
    Fq.prototype.allowCustom = !0;
    var Gq = {
        gh: "Image",
        Sg: "Flash",
        zd: "All"
    }
      , Hq = {
        $g: "Html",
        eh: "IFrame",
        ei: "Static",
        zd: "All"
    }
      , Iq = {
        fh: "IgnoreSize",
        Zh: "SelectExactMatch",
        $h: "SelectNearMatch"
    }
      , Jq = {
        Ig: "DisallowResize",
        Uh: "ResizeSmaller"
    };
    var Kq = !1
      , Lq = function(a) {
        if (a = a.match(/[\d]+/g))
            a.length = 3
    };
    (function() {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (Kq = !0,
            a.description)) {
                Lq(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                Kq = !0;
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"],
        Kq = !(!a || !a.enabledPlugin))) {
            Lq(a.enabledPlugin.description);
            return
        }
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            Kq = !0;
            Lq(b.GetVariable("$version"));
            return
        } catch (c) {}
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            Kq = !0;
            return
        } catch (c) {}
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            Kq = !0,
            Lq(b.GetVariable("$version"))
        } catch (c) {}
    }
    )();
    var Mq = Kq;
    var Oq = function(a, b) {
        b = void 0 === b ? null : b;
        if (null == a || 0 >= a.width || 0 >= a.height)
            throw tp(sp, null, "ad slot size", a.toString());
        this.h = a;
        this.g = null != b ? b : new Fq;
        this.w = Nq(Hq, this.g.resourceType) ? this.g.resourceType : "All";
        this.o = Nq(Gq, this.g.creativeType) ? this.g.creativeType : "All";
        this.A = Nq(Iq, this.g.sizeCriteria) ? this.g.sizeCriteria : "SelectExactMatch";
        this.C = Nq(Jq, this.g.g) ? this.g.g : "DisallowResize";
        this.l = null != this.g.adSlotIds ? this.g.adSlotIds : [];
        this.B = r(this.g.nearMatchPercent) && 0 < this.g.nearMatchPercent && 100 >= this.g.nearMatchPercent ? this.g.nearMatchPercent : 90
    }
      , Rq = function(a, b) {
        var c = [];
        b.forEach(function(b) {
            a.g.allowCustom && (!Bb(b.h) && (isNaN(b.B) || isNaN(b.w) || b.w == b.B) && Pq(a, b) ? c.push(b) : (b = Qq(a, b),
            null != b && !Bb(b.h) && c.push(b)))
        });
        return c
    }
      , Pq = function(a, b) {
        var c;
        if (c = "Flash" != b.g || Mq) {
            if (c = "All" == a.w || a.w == b.K)
                c = b.g,
                c = null == c ? !0 : "All" == a.o || a.o == c;
            c && (c = b.F,
            c = 0 == a.l.length ? !0 : null != c ? a.l.includes(c) : !1)
        }
        if (c)
            if (b = b.l,
            "IgnoreSize" == a.A || Xc(a.h, b))
                a = !0;
            else {
                if (c = "SelectNearMatch" == a.A)
                    "ResizeSmaller" == a.C ? (b.width <= a.h.width && b.height <= a.h.height || (c = a.h,
                    c = Math.min(c.width / b.width, c.height / b.height),
                    b = new B(c * b.width,c * b.height)),
                    c = b.width,
                    b = b.height) : (c = b.width,
                    b = b.height),
                    c = c > a.h.width || b > a.h.height || c < a.B / 100 * a.h.width || b < a.B / 100 * a.h.height ? !1 : !0;
                a = c
            }
        else
            a = !1;
        return a
    }
      , Qq = function(a, b) {
        b = b.o;
        return null == b ? null : b.find(function(b) {
            return Pq(a, b)
        }) || null
    }
      , Nq = function(a, b) {
        return null != b && Wa(a, b)
    };
    var Sq = function(a) {
        var b = {};
        a.split(",").forEach(function(a) {
            var c = a.split("=");
            2 == c.length && (a = Cb(c[0]),
            c = Cb(c[1]),
            0 < a.length && (b[a] = c))
        });
        return b
    };
    var Tq = function(a) {
        this.h = a.content;
        this.g = a.contentType;
        this.l = a.size;
        this.w = a.masterSequenceNumber;
        this.K = a.resourceType;
        this.B = a.sequenceNumber;
        this.F = a.adSlotId;
        this.o = [];
        a = a.backupCompanions;
        null != a && (this.o = a.map(function(a) {
            return new Tq(a)
        }))
    };
    Tq.prototype.getContent = function() {
        return this.h
    }
    ;
    Tq.prototype.A = function() {
        return this.g
    }
    ;
    Tq.prototype.I = function() {
        return this.l.width
    }
    ;
    Tq.prototype.C = function() {
        return this.l.height
    }
    ;
    var Uq = function() {
        this.B = 1;
        this.l = -1;
        this.g = 1;
        this.w = this.o = 0;
        this.h = !1
    };
    h = Uq.prototype;
    h.te = function() {
        return this.B
    }
    ;
    h.qe = function() {
        return this.l
    }
    ;
    h.oe = function() {
        return this.g
    }
    ;
    h.re = function() {
        return this.o
    }
    ;
    h.se = function() {
        return this.w
    }
    ;
    h.pe = function() {
        return this.h
    }
    ;
    var V = function(a) {
        this.g = a
    };
    V.prototype.h = function() {
        return this.g.adId
    }
    ;
    V.prototype.l = function() {
        return this.g.creativeAdId
    }
    ;
    V.prototype.o = function() {
        return this.g.creativeId
    }
    ;
    var Vq = function(a) {
        return a.g.adQueryId
    };
    h = V.prototype;
    h.ve = function() {
        return this.g.adSystem
    }
    ;
    h.we = function() {
        return this.g.advertiserName
    }
    ;
    h.xe = function() {
        return this.g.apiFramework
    }
    ;
    h.Oe = function() {
        return this.g.adWrapperIds
    }
    ;
    h.Qe = function() {
        return this.g.adWrapperCreativeIds
    }
    ;
    h.Pe = function() {
        return this.g.adWrapperSystems
    }
    ;
    h.Re = function() {
        return this.g.linear
    }
    ;
    h.Se = function() {
        return this.g.skippable
    }
    ;
    h.ze = function() {
        return this.g.contentType
    }
    ;
    h.Td = function() {
        return this.g.description
    }
    ;
    h.Vd = function() {
        return this.g.title
    }
    ;
    h.gc = function() {
        return this.g.duration
    }
    ;
    h.Me = function() {
        return this.g.vastMediaWidth
    }
    ;
    h.Le = function() {
        return this.g.vastMediaHeight
    }
    ;
    h.Ne = function() {
        return this.g.width
    }
    ;
    h.Be = function() {
        return this.g.height
    }
    ;
    h.Ie = function() {
        return this.g.uiElements
    }
    ;
    h.De = function() {
        return this.g.minSuggestedDuration
    }
    ;
    h.ue = function() {
        var a = this.g.adPodInfo
          , b = new Uq;
        b.o = a.podIndex;
        b.w = a.timeOffset;
        b.B = a.totalAds;
        b.g = a.adPosition;
        b.h = a.isBumper;
        b.l = a.maxDuration;
        return b
    }
    ;
    h.ye = function(a, b, c) {
        var d = this.g.companions.map(function(a) {
            return new Tq(a)
        });
        return Rq(new Oq(new B(a,b),c), d)
    }
    ;
    h.Ge = function() {
        return Sq(Qb(this.g.traffickingParameters))
    }
    ;
    h.He = function() {
        return this.g.traffickingParameters
    }
    ;
    h.Ce = function() {
        return this.g.mediaUrl
    }
    ;
    h.Fe = function() {
        return this.g.surveyUrl
    }
    ;
    h.Ae = function() {
        return this.g.dealId
    }
    ;
    h.Ke = function() {
        return this.g.universalAdIdValue
    }
    ;
    h.Je = function() {
        return this.g.universalAdIdRegistry
    }
    ;
    h.Ee = function() {
        return this.g.skipTimeOffset
    }
    ;
    h.Te = function() {
        return this.g.disableUi
    }
    ;
    var Wq = function() {
        F.call(this);
        this.g = null;
        this.G = new up(this);
        wd(this, Ma(xd, this.G));
        this.h = new Map;
        this.o = new Map;
        this.A = this.w = !1;
        this.C = new Og;
        this.l = !1;
        this.F = null
    }, Xq;
    y(Wq, F);
    var Yq = null
      , Zq = function() {
        null == Yq && (Yq = new Wq);
        return Yq
    };
    Wq.prototype.Gc = function(a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        this.g ? dq(this.g, "activityMonitor", "measurableImpression", c) : this.dispatchEvent(new Q("measurable_impression",null,c))
    }
    ;
    var Pm = function(a, b, c) {
        var d = {};
        d.queryId = b;
        d.viewabilityData = c;
        a.g && dq(a.g, "activityMonitor", "viewabilityMeasurement", d)
    }
      , Bm = function(a, b, c, d) {
        var e = {};
        e.queryId = b;
        e.viewabilityString = c;
        e.eventName = d;
        a.g ? dq(a.g, "activityMonitor", "externalActivityEvent", e) : a.dispatchEvent(new Q("externalActivityEvent",null,e))
    };
    Wq.prototype.U = function() {
        this.G.Oa(this.g, "activityMonitor", this.H);
        this.l = !1;
        this.h.clear();
        this === Xq && (Xq = null);
        Wq.da.U.call(this)
    }
    ;
    var ar = function(a) {
        if (null == a)
            return !1;
        if (fp() && null != a.webkitDisplayingFullscreen)
            return a.webkitDisplayingFullscreen;
        var b = window.screen.availWidth || window.screen.width
          , c = window.screen.availHeight || window.screen.height;
        a = $q(a);
        return 0 >= b - a.width && 42 >= c - a.height
    }
      , $q = function(a) {
        var b = {
            left: a.offsetLeft,
            top: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight
        };
        try {
            v(a.getBoundingClientRect) && od(Zc(a), a) && (b = a.getBoundingClientRect())
        } catch (c) {}
        return b
    }
      , br = function(a, b, c, d, e) {
        if (a.l) {
            e = e || {};
            d && null == e.opt_osdId && (e.opt_osdId = d);
            if (a.F)
                return a.F(b, c, e);
            if (a = d ? a.o.get(d) : R.F)
                null == e.opt_fullscreen && (e.opt_fullscreen = ar(a)),
                null == e.opt_adElement && (e.opt_adElement = a);
            return Bh(469, Ma(En, b, c, e)) || {}
        }
        return {}
    };
    Wq.prototype.L = function(a) {
        this.A = a
    }
    ;
    Wq.prototype.J = function() {
        return this.A
    }
    ;
    Wq.prototype.M = function(a) {
        this.C = new Og(a.adk,a.awbidKey)
    }
    ;
    var cr = function(a, b) {
        var c = Jp()
          , d = String(Math.floor(1E9 * Math.random()));
        a.o.set(d, b);
        if (Mp(c, 31061775))
            try {
                jf(function(b) {
                    if (a.g) {
                        var c = {};
                        c.engagementString = b;
                        dq(a.g, "activityMonitor", "engagementData", c)
                    }
                }, function() {
                    return b
                })
            } catch (e) {}
        0 != R.g && Qm(P.D(), d, a);
        return d
    }
      , dr = function(a, b, c) {
        if (c)
            a.h.get(c) == b && a.h["delete"](c);
        else {
            var d = [];
            a.h.forEach(function(a, c) {
                a == b && d.push(c)
            });
            d.forEach(a.h["delete"], a.h)
        }
    }
      , Lm = function(a, b) {
        a = a.h.get(b);
        return v(a) ? a() : {}
    }
      , er = function(a) {
        if (v(window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
            var b = {};
            b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
            dq(a.g, "activityMonitor", "pageSignals", b)
        }
    };
    Wq.prototype.H = function(a) {
        var b = a.ha
          , c = b.queryId
          , d = {}
          , e = null;
        d.eventId = b.eventId;
        switch (a.ia) {
        case "getPageSignals":
            er(this);
            break;
        case "reportVastEvent":
            e = b.vastEvent;
            a = b.osdId;
            var f = {};
            f.opt_fullscreen = b.isFullscreen;
            b.isOverlay && (f.opt_bounds = b.overlayBounds);
            d.viewabilityData = br(this, e, c, a, f);
            dq(this.g, "activityMonitor", "viewability", d);
            break;
        case "fetchAdTagUrl":
            c = {},
            c.eventId = b.eventId,
            a = b.osdId,
            Va(b, "isFullscreen") && (e = b.isFullscreen),
            Va(b, "loggingId") && (b = b.loggingId,
            c.loggingId = b,
            Wp(Sp.D(), 43, {
                step: "beforeLookup",
                logid: b,
                time: x()
            }, !0)),
            c.engagementString = fr(this, a, e),
            this.g && dq(this.g, "activityMonitor", "engagement", c)
        }
    }
    ;
    var fr = function(a, b, c) {
        var d = b ? a.o.get(b) : R.F;
        a = {};
        null != c && (a.fullscreen = c);
        c = "";
        try {
            c = hf(function() {
                return d
            }, a)
        } catch (e) {
            c = "sdktle;" + Mb(e.name, 12) + ";" + Mb(e.message, 40)
        }
        return c
    };
    u("ima.common.getVideoMetadata", function(a) {
        return Lm(Zq(), a)
    }, void 0);
    u("ima.common.triggerViewEvent", function(a, b) {
        var c = Zq()
          , d = {};
        d.queryId = a;
        d.viewabilityString = b;
        c.g ? dq(c.g, "activityMonitor", "viewableImpression", d) : c.dispatchEvent(new Q("viewable_impression",null,d))
    }, void 0);
    u("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        Pm(Zq(), a, b)
    }, void 0);
    u("ima.common.triggerMeasurableEvent", function(a, b) {
        Zq().Gc(a, b)
    }, void 0);
    u("ima.common.triggerExternalActivityEvent", function(a, b, c) {
        Bm(Zq(), a, b, c)
    }, void 0);
    var gr = Zq();
    var hr = function() {
        this.h = 0;
        this.g = []
    };
    h = hr.prototype;
    h.add = function(a) {
        var b = this.g[this.h];
        this.g[this.h] = a;
        this.h = (this.h + 1) % 4;
        return b
    }
    ;
    h.get = function(a) {
        a = ir(this, a);
        return this.g[a]
    }
    ;
    h.set = function(a, b) {
        a = ir(this, a);
        this.g[a] = b
    }
    ;
    h.Ha = function() {
        return this.g.length
    }
    ;
    h.isEmpty = function() {
        return 0 == this.g.length
    }
    ;
    h.clear = function() {
        this.h = this.g.length = 0
    }
    ;
    h.pa = function() {
        var a = this.Ha()
          , b = this.Ha()
          , c = [];
        for (a = this.Ha() - a; a < b; a++)
            c.push(this.get(a));
        return c
    }
    ;
    h.Sa = function() {
        for (var a = [], b = this.Ha(), c = 0; c < b; c++)
            a[c] = c;
        return a
    }
    ;
    var ir = function(a, b) {
        if (b >= a.g.length)
            throw Error("Out of bounds exception");
        return 4 > a.g.length ? b : (a.h + Number(b)) % 4
    };
    var jr = function(a) {
        F.call(this);
        this.g = a;
        this.la = "";
        this.P = -1;
        this.na = !1;
        this.ra = new hr;
        this.w = 0;
        this.ga = this.H = this.o = this.M = this.W = this.G = !1;
        this.J = this.l = null;
        this.Z = this.yb();
        this.V = this.jb();
        this.xa = R.ca() ? 15E3 : 8E3;
        this.A = null;
        this.fa = !1
    };
    y(jr, qq);
    jr.prototype.Qc = function() {
        var a = this;
        return Ra(Zo).filter(function(b) {
            return !Bb(a.g.canPlayType(b))
        })
    }
    ;
    jr.prototype.Fc = function(a) {
        this.xa = 0 < a.timeout ? a.timeout : R.ca() ? 15E3 : 8E3;
        a.g && (this.g.preload = "auto")
    }
    ;
    var lr = function(a, b) {
        var c = 0 < a.g.seekable.length;
        a.na ? c ? (a.g.currentTime = a.P,
        kr(a),
        b()) : setTimeout(function() {
            return lr(a, b)
        }, 100) : (kr(a),
        b())
    };
    jr.prototype.Ib = function() {
        this.la = this.g.currentSrc;
        this.na = 0 < this.g.seekable.length;
        this.P = this.g.ended ? -1 : this.g.currentTime
    }
    ;
    jr.prototype.Y = function(a) {
        a = void 0 === a ? null : a;
        if (0 <= this.P) {
            var b = this
              , c = null == a ? function() {}
            : a;
            this.g.addEventListener("loadedmetadata", function e() {
                lr(b, c);
                b.g.removeEventListener("loadedmetadata", e, !1)
            }, !1);
            this.M = !1;
            this.g.src = this.la;
            this.g.load()
        } else
            null != a && a()
    }
    ;
    var kr = function(a) {
        a.P = -1;
        a.la = "";
        a.na = !1
    };
    h = jr.prototype;
    h.load = function(a, b) {
        mr(this);
        b && R.ca() && v(this.g.g) && this.g.g(b);
        this.M = !1;
        a && (this.g.src = a);
        this.g.load()
    }
    ;
    h.Mb = function(a) {
        this.g.volume = a;
        this.g.muted = 0 == a ? !0 : !1
    }
    ;
    h.Wc = function() {
        return this.g.volume
    }
    ;
    h.zb = function() {
        var a = this;
        R.Qb() && !this.o && (dc() || ec()) && "hidden" == n.document.visibilityState ? this.A || (this.A = w(this.sa, this),
        n.document.addEventListener("visibilitychange", this.A)) : this.sa();
        this.fa = !1;
        this.M || cc() ? (this.H = !1,
        this.l = this.g.play(),
        null != this.l && (this.J = null,
        this.l.then(function() {
            a.l = null;
            a.hd(a.J);
            a.J = null
        })["catch"](function(b) {
            nr(a);
            a.l = null;
            var c = "";
            null != b && null != b.name && (c = b.name);
            "AbortError" == c || "NotAllowedError" == c ? a.dispatchEvent("autoplayDisallowed") : a.Ac()
        }))) : this.H = !0
    }
    ;
    h.pause = function() {
        null == this.l && (this.fa = !0,
        this.g.pause(),
        nr(this))
    }
    ;
    h.uc = function() {
        return this.g.paused ? gp() || pe ? this.g.currentTime < this.g.duration : !0 : !1
    }
    ;
    h.Zb = function() {
        fp() && this.g.webkitDisplayingFullscreen && this.g.webkitExitFullscreen()
    }
    ;
    h.jb = function() {
        return ar(this.g)
    }
    ;
    h.nb = function(a) {
        this.g.currentTime = a
    }
    ;
    h.ya = function() {
        return this.g.currentTime
    }
    ;
    h.xb = function() {
        return isNaN(this.g.duration) ? -1 : this.g.duration
    }
    ;
    h.Ab = function() {
        return this.g.ended
    }
    ;
    h.yb = function() {
        return new B(this.g.offsetWidth,this.g.offsetHeight)
    }
    ;
    h.U = function() {
        this.ib();
        jr.da.U.call(this)
    }
    ;
    h.jc = function() {
        this.ib();
        this.h = new up(this);
        this.h.O(this.g, $o, this.za);
        this.h.O(this.g, "canplay", this.Nf);
        this.h.O(this.g, "ended", this.Of);
        this.h.O(this.g, "webkitbeginfullscreen", this.kc);
        this.h.O(this.g, "webkitendfullscreen", this.Xc);
        this.h.O(this.g, "loadedmetadata", this.Pf);
        this.h.O(this.g, "pause", this.Sf);
        this.h.O(this.g, "playing", this.hd);
        this.h.O(this.g, "timeupdate", this.Tf);
        this.h.O(this.g, "volumechange", this.Xf);
        this.h.O(this.g, "error", this.Ac);
        this.h.O(this.g, lp() || gp() && !ip(8) ? "loadeddata" : "canplay", this.Qf);
        this.F = new Xp;
        this.h.O(this.F, "click", this.Ef);
        Zp(this.F, this.g);
        this.L = new ce(1E3);
        this.h.O(this.L, "tick", this.Ff);
        this.L.start()
    }
    ;
    h.ib = function() {
        null != this.F && (aq(this.F),
        this.F = null);
        null != this.L && this.L.X();
        null != this.h && (this.h.X(),
        this.h = null);
        mr(this)
    }
    ;
    var mr = function(a) {
        a.W = !1;
        a.o = !1;
        a.G = !1;
        a.H = !1;
        a.w = 0;
        a.ga = !1;
        a.l = null;
        a.J = null;
        a.ra.clear();
        nr(a);
        xd(a.C)
    };
    jr.prototype.za = function(a) {
        this.dispatchEvent(a.type)
    }
    ;
    var or = function(a, b) {
        if (!a.o) {
            a.o = !0;
            nr(a);
            a.dispatchEvent("start");
            var c = v(a.g.getAttribute) && null != a.g.getAttribute("playsinline");
            (tc || ip(10) && R.o) && c || (!fp() || R.ca()) && (!qc || qc && hp(ep, 4)) && !hl() || !qc || qc && hp(ep, 3) || fp() && !ip(4) || a.kc(b)
        }
    };
    h = jr.prototype;
    h.Nf = function() {
        var a;
        if (a = qe)
            a = Yb,
            a = !(a && (Nb(a, "SMART-TV") || Nb(a, "SmartTV")));
        a && !this.ga && (this.nb(.001),
        this.ga = !0)
    }
    ;
    h.Pf = function() {
        this.M = !0;
        this.H && this.zb();
        this.H = !1
    }
    ;
    h.Qf = function() {
        this.W || (this.W = !0,
        this.dispatchEvent("loaded"))
    }
    ;
    h.hd = function(a) {
        null != this.l ? this.J = a : (this.dispatchEvent("play"),
        gp() || lp() || or(this, a))
    }
    ;
    h.Tf = function(a) {
        if (!this.o && (gp() || lp())) {
            if (0 >= this.ya())
                return;
            if (lp() && this.Ab() && 1 == this.xb()) {
                this.Ac(a);
                return
            }
            or(this, a)
        }
        if (gp() || jp()) {
            if (1.5 < this.ya() - this.w) {
                this.G = !0;
                this.nb(this.w);
                return
            }
            this.G = !1;
            this.ya() > this.w && (this.w = this.ya())
        }
        this.ra.add(this.g.currentTime);
        this.dispatchEvent("timeUpdate")
    }
    ;
    h.Xf = function() {
        this.dispatchEvent("volumeChange")
    }
    ;
    h.Sf = function() {
        if (this.o && gp() && !this.fa && (2 > pr(this) || this.G)) {
            this.C = new ce(250);
            this.h.O(this.C, "tick", this.Mf);
            this.C.start();
            var a = !0
        } else
            a = !1;
        a || this.l || this.dispatchEvent("pause")
    }
    ;
    h.Of = function() {
        var a = !0;
        if (gp() || jp())
            a = this.w >= this.g.duration - 1.5;
        !this.G && a && this.dispatchEvent("end")
    }
    ;
    h.kc = function() {
        this.dispatchEvent("beginFullscreen")
    }
    ;
    h.Xc = function() {
        this.dispatchEvent("endFullscreen")
    }
    ;
    h.Ac = function() {
        nr(this);
        this.dispatchEvent("error")
    }
    ;
    h.Ef = function() {
        this.dispatchEvent("click")
    }
    ;
    h.Ff = function() {
        var a = this.yb()
          , b = this.jb();
        if (a.width != this.Z.width || a.height != this.Z.height)
            !this.V && b ? this.kc() : this.V && !b && this.Xc(),
            this.Z = a,
            this.V = b
    }
    ;
    h.Od = function() {
        if (!this.o) {
            try {
                Wp(Sp.D(), 16)
            } catch (a) {}
            mr(this);
            this.dispatchEvent("mediaLoadTimeout")
        }
    }
    ;
    h.Mf = function() {
        if (this.Ab() || !this.uc())
            xd(this.C);
        else {
            var a = this.g.duration - this.g.currentTime
              , b = pr(this);
            0 < b && (2 <= b || 2 > a) && (xd(this.C),
            this.zb())
        }
    }
    ;
    var pr = function(a) {
        var b;
        a: {
            for (b = a.g.buffered.length - 1; 0 <= b; ) {
                if (a.g.buffered.start(b) <= a.g.currentTime) {
                    b = a.g.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.g.currentTime
    };
    jr.prototype.sa = function() {
        this.R || (this.R = de(this.Od, this.xa, this));
        qr(this)
    }
    ;
    var nr = function(a) {
        a.R && (n.clearTimeout(a.R),
        a.R = null);
        qr(a)
    }
      , qr = function(a) {
        a.A && (n.document.removeEventListener("visibilitychange", a.A),
        a.A = null)
    };
    var rr = {}
      , sr = function(a, b) {
        var c = "key_" + a + ":" + b
          , d = rr[c];
        if (void 0 === d || 0 > d)
            rr[c] = 0;
        else if (0 == d)
            throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
    };
    sr("a", "");
    sr("a", "redesign2014q4");
    sr("b", "");
    sr("b", "redesign2014q4");
    sr("b", "forcedlinebreak");
    var ur = function() {
        F.call(this);
        this.buffered = new tr;
        this.o = new tr;
        this.h = new up(this);
        this.l = "";
        this.w = !1;
        this.g = null;
        var a = Oo(R);
        if (a) {
            a: {
                if (Va(a.g, "videoElementMockDuration") && (a = a.g.videoElementMockDuration,
                r(a)))
                    break a;
                a = NaN
            }
            this.duration = a
        }
    };
    y(ur, F);
    var vr = new Gn
      , wr = function() {
        var a = ["video/mp4"]
          , b = ["video/ogg"]
          , c = new ur;
        c.canPlayType = function(c) {
            return a.includes(c) ? "probably" : b.includes(c) ? "maybe" : ""
        }
        ;
        c.width = 0;
        c.height = 0;
        c.offsetWidth = 0;
        c.offsetHeight = 0;
        return c
    }
      , xr = function(a) {
        this.startTime = 0;
        this.endTime = a
    }
      , tr = function() {
        this.length = 0;
        this.g = []
    };
    tr.prototype.start = function(a) {
        return this.g[a].startTime
    }
    ;
    tr.prototype.end = function(a) {
        return this.g[a].endTime
    }
    ;
    h = ur.prototype;
    h.readyState = 0;
    h.currentTime = 0;
    h.duration = NaN;
    h.lc = !0;
    h.autoplay = !1;
    h.loop = !1;
    h.controls = !1;
    h.volume = 1;
    h.muted = !1;
    Object.defineProperty(ur.prototype, "src", {
        get: function() {
            return ur.prototype.l
        },
        set: function(a) {
            var b = ur.prototype;
            b.w && null != b.g ? (b.g.reject(),
            b.g = null) : b.l = a
        }
    });
    h = ur.prototype;
    h.sb = null;
    h.Sb = null;
    h.pause = function() {
        this.autoplay = !1;
        this.lc || (null.stop(),
        this.lc = !0,
        this.dispatchEvent("timeupdate"),
        this.dispatchEvent("pause"))
    }
    ;
    h.load = function() {
        this.readyState = 0;
        this.lc = !0;
        this.dispatchEvent("loadstart");
        var a;
        isNaN(this.duration) ? a = 10 + 20 * Math.random() : a = this.duration;
        this.duration = Number(a);
        this.dispatchEvent("durationchange");
        a = this.o;
        a.g.push(new xr(this.duration));
        a.length = a.g.length;
        a = this.buffered;
        a.g.push(new xr(this.duration));
        a.length = a.g.length;
        this.dispatchEvent("loadedmetadata");
        0 < this.currentTime && this.dispatchEvent("timeupdate");
        this.dispatchEvent("loadeddata");
        this.dispatchEvent("canplay");
        this.dispatchEvent("canplaythrough");
        this.dispatchEvent("progress")
    }
    ;
    h.setAttribute = function(a, b) {
        null != a && vr.set(a, b)
    }
    ;
    h.U = function() {
        this.h.X()
    }
    ;
    h.Wf = function(a) {
        var b = null
          , c = null;
        switch (a.type) {
        case "loadeddata":
            b = "Loaded";
            break;
        case "playing":
            b = "Playing";
            c = "#00f";
            break;
        case "pause":
            b = "Paused";
            break;
        case "ended":
            b = "Ended",
            c = "#000"
        }
        b && this.Sb && (this.Sb.innerText = b);
        c && this.sb && (this.sb.style.backgroundColor = c)
    }
    ;
    var yr = function(a, b, c) {
        if (null == a || !od(Zc(a), a))
            throw tp(sp, null, "containerElement", "element");
        this.w = a;
        this.h = this.g = null;
        this.o = b;
        this.B = c;
        this.l = null;
        this.g = kd("DIV", {
            style: "display:none;"
        });
        this.w.appendChild(this.g);
        a = Oo(R);
        if (Po(a, "useVideoElementMock")) {
            a = wr();
            b = kd("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
            });
            for (d in a)
                b[d] = a[d];
            a.sb = kd("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
            });
            a.Sb = kd("P", {
                style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
            });
            a.sb.appendChild(a.Sb);
            b.appendChild(a.sb);
            a.h.O(a, ["loadeddata", "playing", "pause", "ended"], a.Wf);
            var d = b
        } else
            d = kd("VIDEO", {
                style: "background-color:#000;position:absolute;width:100%;height:100%;left:0px;top:0px;",
                title: "Advertisement"
            });
        d.setAttribute("webkit-playsinline", !0);
        d.setAttribute("playsinline", !0);
        this.h = d;
        this.g.appendChild(this.h);
        this.o && (d = kd("DIV", {
            id: this.o,
            style: "display:none;position:absolute;width:100%;height:100%;left:0px;top:0px;background-color:#000;"
        }),
        this.g.appendChild(d));
        this.B && (this.l = kd("DIV", {
            style: "position:absolute;width:100%;height:100%;left:0px;top:0px"
        }),
        this.g.appendChild(this.l))
    };
    y(yr, vd);
    yr.prototype.U = function() {
        md(this.g);
        yr.da.U.call(this)
    }
    ;
    yr.prototype.show = function() {
        Dq(this.g, !0)
    }
    ;
    var Dq = function(a, b) {
        null != a && (a.style.display = b ? "block" : "none")
    };
    var Cr = function(a) {
        F.call(this);
        this.L = "ima-chromeless-video";
        var b = null;
        null != a && (q(a) ? this.L = a : b = a);
        this.M = new up(this);
        this.w = null;
        this.o = !1;
        this.ga = this.yb();
        this.fa = this.jb();
        this.G = -1;
        this.V = !1;
        this.A = -1;
        this.g = this.R = this.H = null;
        this.ra = "";
        this.l = !1;
        this.Z = null != b;
        this.sa = this.J = this.W = this.h = null;
        this.C = void 0;
        this.na = null;
        this.F = 0;
        this.Z ? (this.l = !0,
        this.h = b,
        this.C = 2) : (a = w(this.Pd, this),
        zr ? a() : (Ar.push(a),
        a = document.createElement("SCRIPT"),
        Vc(a, Br),
        b = document.getElementsByTagName("script")[0],
        b.parentNode.insertBefore(a, b)))
    };
    y(Cr, qq);
    var Br = Mc(Hc(Ic("https://www.youtube.com/iframe_api")))
      , Dr = {
        el: "adunit",
        controls: 0,
        html5: 1,
        playsinline: 1,
        ps: "gvn",
        showinfo: 0
    }
      , Ar = []
      , zr = !1;
    h = Cr.prototype;
    h.Fc = function(a) {
        this.g = a
    }
    ;
    h.load = function(a, b) {
        null !== a && (this.ra = a,
        this.l ? Er(this, a, b) : (this.H = a,
        this.R = b))
    }
    ;
    h.Mb = function(a) {
        this.Z ? this.dispatchEvent("volumeChange") : this.l ? (a = Math.min(Math.max(100 * a, 0), 100),
        this.h.setVolume(a),
        this.A = -1,
        this.dispatchEvent("volumeChange")) : this.A = a
    }
    ;
    h.Wc = function() {
        return this.l ? this.h.getVolume() / 100 : this.A
    }
    ;
    h.zb = function() {
        if (!Bb(Qb(this.ra))) {
            if (!this.o) {
                Fr(this);
                var a = R.ca() ? 15E3 : 8E3;
                null != this.g && 0 < this.g.timeout && (a = this.g.timeout);
                this.bb = de(this.ac, a, this)
            }
            this.l ? (this.V = !1,
            !this.o && this.g && this.g.g ? this.h.loadVideoByPlayerVars(this.na) : this.h.playVideo()) : this.V = !0
        }
    }
    ;
    h.pause = function() {
        this.l && this.o && this.h.pauseVideo()
    }
    ;
    h.uc = function() {
        return this.l ? 2 == this.h.getPlayerState(this.C) : !1
    }
    ;
    h.Zb = function() {}
    ;
    h.jb = function() {
        var a = document.getElementById(this.L);
        return a ? ar(a) : !1
    }
    ;
    h.nb = function(a) {
        this.l ? this.h.seekTo(a, !1) : this.G = a
    }
    ;
    h.ya = function() {
        return this.l ? this.h.getCurrentTime(this.C) : -1
    }
    ;
    h.xb = function() {
        return this.l && this.o ? this.h.getDuration(this.C) : -1
    }
    ;
    h.Qc = function() {
        return Ra(Zo)
    }
    ;
    h.Ab = function() {
        return this.l ? 0 == this.h.getPlayerState(this.C) : !1
    }
    ;
    h.yb = function() {
        var a = document.getElementById(this.L);
        return a ? new B(a.offsetWidth,a.offsetHeight) : new B(0,0)
    }
    ;
    h.Yc = function() {
        return this.l ? 1 == this.h.getPlayerState(this.C) : !1
    }
    ;
    h.Gf = function() {
        var a = this.yb()
          , b = this.jb();
        if (a.width != this.ga.width || a.height != this.ga.height)
            !this.fa && b ? this.dispatchEvent("beginFullscreen") : this.fa && !b && this.dispatchEvent("endFullscreen"),
            this.ga = a,
            this.fa = b
    }
    ;
    h.jc = function() {
        this.W = w(this.za, this);
        this.J = w(this.la, this);
        this.sa = w(this.Qa, this);
        this.Z && (this.h.addEventListener("onAdStateChange", this.J),
        this.h.addEventListener("onReady", this.W),
        this.h.addEventListener("onStateChange", this.J),
        this.h.addEventListener("onVolumeChange", this.sa));
        this.P = new ce(1E3);
        this.M.O(this.P, "tick", this.Gf);
        this.P.start()
    }
    ;
    h.ib = function() {
        this.Z && (this.h.removeEventListener("onAdStateChange", this.J),
        this.h.removeEventListener("onReady", this.W),
        this.h.removeEventListener("onStateChange", this.J),
        this.h.removeEventListener("onVolumeChange", this.sa));
        null != this.P && this.P.X()
    }
    ;
    h.Pd = function() {
        var a = {
            playerVars: ab(Dr),
            events: {
                onError: w(this.ec, this),
                onReady: w(this.za, this),
                onAdStateChange: w(this.la, this),
                onStateChange: w(this.la, this),
                onVolumeChange: w(this.Qa, this)
            }
        }
          , b = Ba("YT");
        this.h = null != b && null != b.Player ? new b.Player(this.L,a) : null
    }
    ;
    var Er = function(a, b, c) {
        var d = {
            autoplay: "1"
        };
        null != a.g && (null != a.g.o && (d.agcid = a.g.o),
        null != a.g.h && (d.adformat = a.g.h),
        null != a.g.l && (d.ad_query_id = a.g.l),
        a.g.w && (d.cta_conversion_urls = a.g.w),
        a.g.B && (d.endscreen_ad_tracking_data = a.g.B),
        a.g.C && (d.is_pharma = 1),
        d.iv_load_policy = a.g.I ? 1 : 3,
        a.g.A && (d.noiba = 1),
        a.g.F && (d.utpsa = 1),
        a.g.K && (d.autoplay = "1"));
        if (null == b)
            var e = null;
        else
            xo(np, b) ? (e = b.match(/yt_vid\/([a-zA-Z0-9_-]{11})/),
            e = null != e && 1 < e.length ? e[1] : null) : e = (null == b ? 0 : xo(so, b)) ? Eq(b) : null;
        null === e ? (c = null === c ? "" : c,
        b = "url=" + encodeURIComponent(b) + "&type=" + encodeURIComponent(c),
        d.url_encoded_third_party_media = b) : d.videoId = e;
        d.enabled_engage_types = "3,4,5,6";
        a.o = !1;
        a.g && a.g.g ? (a.na = d,
        a.h.preloadVideoByPlayerVars(a.na)) : a.h.cueVideoByPlayerVars(d);
        a.dispatchEvent("loaded")
    };
    Cr.prototype.ec = function() {
        this.dispatchEvent("error")
    }
    ;
    Cr.prototype.za = function() {
        this.l = !0;
        -1 != this.A && (this.Mb(this.A),
        this.A = -1);
        null != this.H && (Er(this, this.H, this.R),
        this.R = this.H = null);
        -1 != this.G && (this.nb(this.G),
        this.G = -1);
        this.V && this.zb()
    }
    ;
    Cr.prototype.la = function(a) {
        switch (a.data) {
        case 0:
            this.o ? this.dispatchEvent("end") : this.dispatchEvent("error");
            break;
        case 1:
            this.o || (Fr(this),
            this.o = !0,
            this.F = 0,
            this.dispatchEvent("start"));
            this.dispatchEvent("play");
            Gr(this);
            this.w = new ce(100);
            this.M.O(this.w, "tick", this.xa);
            this.w.start();
            break;
        case 2:
            this.dispatchEvent("pause"),
            Gr(this)
        }
    }
    ;
    Cr.prototype.Qa = function() {
        this.dispatchEvent("volumeChange")
    }
    ;
    var Gr = function(a) {
        a.M.Oa(a.w, "tick", a.xa);
        null != a.w && (a.w.stop(),
        a.w = null)
    }
      , Fr = function(a) {
        null != a.bb && n.clearTimeout(a.bb)
    };
    Cr.prototype.xa = function() {
        if (ie || jp()) {
            if (1.5 < this.ya() - this.F) {
                this.l && this.h.seekTo(this.F, !0);
                return
            }
            this.ya() > this.F && (this.F = this.ya())
        }
        this.dispatchEvent("timeUpdate")
    }
    ;
    Cr.prototype.ac = function() {
        this.dispatchEvent("mediaLoadTimeout")
    }
    ;
    Cr.prototype.U = function() {
        Gr(this);
        Fr(this);
        this.ib();
        this.l = !1;
        this.M.X();
        this.G = -1;
        this.R = null;
        this.V = !1;
        this.H = null;
        this.A = -1;
        this.W = this.h = this.g = null;
        this.o = !1;
        this.ra = "";
        Cr.da.U.call(this)
    }
    ;
    u("onYouTubeIframeAPIReady", function() {
        zr = !0;
        Ar.forEach(function(a) {
            a()
        });
        Ar = []
    }, window);
    var Ir = function(a, b, c, d, e) {
        if (!(e || null != a && od(Zc(a), a)))
            throw tp(sp, null, "containerElement", "element");
        this.H = !1;
        this.K = a;
        this.L = null != b || null != d;
        if (!this.L && R.h)
            throw tp(qp, null, "Custom video element was not provided even though the setting restrictToCustomPlayback is set to true.");
        R.ca() || (R.g = 2);
        this.F = Hr(b ? b : null);
        this.Z = (this.C = R.h ? !0 : mp(this.F) && this.L) && null != d;
        e = kd("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(e, a.firstChild);
        this.A = e;
        a = this.g = null;
        this.C ? b ? a = new jr(b) : d && (a = new Cr(d)) : (this.g = new yr(this.A,null,!0),
        a = new jr(this.g.h));
        this.h = a;
        this.l = this.o = null;
        a = qc && !(qc && hp(ep, 4));
        e = fp();
        if (R.ca() || this.g && this.h && !this.C && R.l && !hl() && !a && !e)
            this.o = new yr(this.A,null,!0),
            this.l = new jr(this.o.h);
        this.B = this.h ? c || null : null;
        this.P = null != this.B;
        Wp(Sp.D(), 8, {
            enabled: this.C,
            yt: null != d,
            customClick: null != this.B
        });
        this.C && b ? v(b.getBoundingClientRect) ? c = b : (c = this.K,
        R.F = c) : c = this.A;
        this.G = c;
        this.I = new xq(this.A,this);
        this.M = new B(0,0);
        this.J = "";
        b && (b = b.src || b.currentSrc,
        b = b instanceof Jn ? b.clone() : new Jn(b,void 0),
        200 > b.toString().length ? this.J = b.toString() : 200 > b.g.length && (this.J = b.g))
    };
    Ir.prototype.W = function() {
        this.H = !0;
        if (null != this.g) {
            var a = this.g;
            a.h && a.h.load()
        }
        null != this.o && (a = this.o,
        a.h && a.h.load())
    }
    ;
    Ir.prototype.V = function() {
        var a = this;
        xd(this.g);
        xd(this.o);
        xd(this.I);
        null != this.h && this.h.Y(function() {
            return xd(a.h)
        });
        null != this.l && this.l.Y(function() {
            return xd(a.l)
        });
        md(this.A)
    }
    ;
    var Cq = function(a) {
        return a.P && a.B ? a.B : null != a.g ? a.g.l : null
    };
    Ir.prototype.w = function() {
        return this.C
    }
    ;
    Ir.prototype.Y = function() {
        return !1
    }
    ;
    Ir.prototype.R = function() {
        return this.Z
    }
    ;
    var Hr = function(a) {
        return null != a && v(a.getAttribute) && null != a.getAttribute("playsinline") ? !0 : !1
    };
    var Jr = function(a, b) {
        Q.call(this, "adMetadata", a);
        this.h = b || null
    };
    y(Jr, Q);
    Jr.prototype.B = function() {
        return this.h
    }
    ;
    var Kr = function(a) {
        if (a) {
            var b = /iu=\/(\d+)\//.exec(Db(a));
            (b = b && 2 == b.length ? b[1] : null) || (a = Qb((new Jn(a)).h.get("client")),
            b = Bb(a) ? null : a);
            a = b
        } else
            a = null;
        return a
    };
    var Lr = function() {
        this.g = Ho.D();
        var a = Np();
        Bb(Qb(a)) || Go(this.g, "e", a);
        Go(this.g, "alt", "0")
    }
      , Mr = function(a) {
        var b = Lr.D();
        if (hh) {
            var c = Rp();
            Go(b.g, "sdkv", c);
            Go(b.g, "pid", b.g.h);
            Go(b.g, "ppt", R.B);
            Go(b.g, "ppv", R.I);
            Go(b.g, "mrd", R.C);
            Go(b.g, "aab", R.l ? 1 : 0);
            Go(b.g, "itv", document.hidden ? 0 : 1);
            if (c = jh()) {
                var d = b.g.g;
                d.h && d.C(new kh(a,4,c,0,void 0))
            }
            if ("vl" == a || "ff" == a || "er" == a || "cl" == a)
                "0" == b.g.h ? b.g.g.w() : (a = b.g.g,
                a.J = !0,
                Ao(a))
        }
    };
    Da(Lr);
    var Nr = function(a, b, c) {
        this.h = c;
        0 == b.length && (b = [[]]);
        this.g = b.map(function(b) {
            b = a.concat(b);
            for (var c = [], d = 0, g = 0; d < b.length; ) {
                var k = b[d++];
                if (128 > k)
                    c[g++] = String.fromCharCode(k);
                else if (191 < k && 224 > k) {
                    var m = b[d++];
                    c[g++] = String.fromCharCode((k & 31) << 6 | m & 63)
                } else if (239 < k && 365 > k) {
                    m = b[d++];
                    var l = b[d++]
                      , t = b[d++];
                    k = ((k & 7) << 18 | (m & 63) << 12 | (l & 63) << 6 | t & 63) - 65536;
                    c[g++] = String.fromCharCode(55296 + (k >> 10));
                    c[g++] = String.fromCharCode(56320 + (k & 1023))
                } else
                    m = b[d++],
                    l = b[d++],
                    c[g++] = String.fromCharCode((k & 15) << 12 | (m & 63) << 6 | l & 63)
            }
            return new RegExp(c.join(""))
        })
    };
    Nr.prototype.match = function(a) {
        var b = this;
        return this.g.some(function(c) {
            c = a.match(c);
            return null == c ? !1 : !b.h || 1 <= c.length && "3.221.0" == c[1] || 2 <= c.length && "3.221.0" == c[2] ? !0 : !1
        })
    }
    ;
    var Or = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , Pr = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47]
      , Qr = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , Rr = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 99, 111, 114, 101, 47, 97, 100, 109, 111, 98, 47]
      , Sr = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 47]
      , Tr = [[105, 109, 97, 51, 92, 46, 106, 115], [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , Ur = [[98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]]
      , Vr = [[111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115], [111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , Wr = new Nr(Or,Tr,!1)
      , Xr = new Nr(Or,Ur,!0)
      , Yr = new Nr(Pr,Tr,!1)
      , Zr = new Nr(Pr,Ur,!0)
      , $r = new Nr(Qr,[],!1)
      , as = new Nr(Qr,Ur,!0)
      , bs = new Nr(Rr,Ur,!1)
      , cs = new Nr(Rr,[[97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115], [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115]],!1)
      , ds = new Nr([104, 116, 116, 112, 115, 63, 58, 47, 47, 103, 111, 111, 103, 108, 101, 97, 100, 115, 92, 46, 103, 92, 46, 100, 111, 117, 98, 108, 101, 99, 108, 105, 99, 107, 92, 46, 110, 101, 116, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47],[],!1)
      , es = new Nr([104, 116, 116, 112, 115, 63, 58, 47, 47, 119, 119, 119, 92, 46, 103, 115, 116, 97, 116, 105, 99, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 106, 115, 47],[],!1)
      , fs = new Nr([104, 116, 116, 112, 115, 63, 58, 47, 47, 109, 105, 110, 116, 45, 109, 97, 100, 92, 46, 115, 97, 110, 100, 98, 111, 120, 92, 46, 103, 111, 111, 103, 108, 101, 92, 46, 99, 111, 109, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47, 102, 111, 114, 109, 97, 116, 115, 47],[],!1)
      , gs = new Nr([104, 116, 116, 112, 115, 63, 58, 47, 47, 118, 105, 100, 101, 111, 45, 97, 100, 45, 116, 101, 115, 116, 92, 46, 97, 112, 112, 115, 112, 111, 116, 92, 46, 99, 111, 109, 47],[],!1)
      , hs = new Nr(Sr,Tr,!1)
      , is = new Nr([104, 116, 116, 112, 115, 63, 58, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47],[],!1)
      , js = new Nr(Or,Vr,!1)
      , ks = new Nr(Sr,Vr,!1)
      , Pa = {
        Xg: Wr,
        Wg: Xr,
        mh: Yr,
        lh: Zr,
        ng: $r,
        kg: as,
        jg: bs,
        lg: cs,
        og: ds,
        mg: es,
        ig: fs,
        pg: gs,
        Yg: hs,
        fi: is,
        Eh: js,
        Fh: ks
    };
    var ls = oc || pc || mc && Ac(11) || nc
      , ms = pc && "srcdoc"in document.createElement("IFRAME")
      , ns = function(a, b) {
        a.open("text/html", "replace");
        a.write(b);
        a.close()
    }
      , ts = function(a, b) {
        mc && Ac(7) && !Ac(10) && 6 > os() && ps(b) && (b = qs(b));
        var c = function() {
            var c = a.contentWindow;
            c && (c.goog_content = b,
            c.location.replace("javascript:window.goog_content"))
        }, d;
        if (d = mc) {
            try {
                var e = Cf(a.contentWindow)
            } catch (f) {
                e = !1
            }
            d = !e
        }
        d ? rs(a, c) : c()
    }
      , os = function() {
        var a = navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
        return a ? parseFloat(a[1]) : 0
    }
      , us = 0
      , rs = function(a, b) {
        var c = "goog_rendering_callback" + us++;
        n[c] = b;
        a.src = "javascript:'<script>(function() {document.domain = \"" + document.domain + '";var continuation = window.parent.' + c + ";window.parent." + c + " = null;continuation();})()\x3c/script>'"
    }
      , ps = function(a) {
        for (var b = 0; b < a.length; ++b)
            if (127 < a.charCodeAt(b))
                return !0;
        return !1
    }
      , qs = function(a) {
        a = unescape(encodeURIComponent(a));
        for (var b = Math.floor(a.length / 2), c = [], d = 0; d < b; ++d)
            c[d] = String.fromCharCode(256 * a.charCodeAt(2 * d + 1) + a.charCodeAt(2 * d));
        1 == a.length % 2 && (c[b] = a.charAt(a.length - 1));
        return c.join("")
    };
    var vs = function(a, b) {
        this.l = a;
        this.g = null;
        this.F = "";
        this.G = 0;
        this.o = this.h = null;
        this.w = b;
        this.C = null;
        this.A = ""
    };
    y(vs, F);
    vs.prototype.J = function(a) {
        try {
            var b = a.h.data;
            try {
                var c = JSON.parse(b)
            } catch (bd) {
                return
            }
            var d = c.session;
            if (null != d && this.A == d)
                switch (c.type) {
                case "friendlyReady":
                    var e = ws(this);
                    if (null != e) {
                        this.g = e;
                        this.F = e.currentSrc;
                        this.G = e.currentTime;
                        var f = this.l;
                        null != f.g && f.g.show()
                    } else {
                        var g = this.l.K
                          , k = this.l.M;
                        var m = "border: 0; margin: 0; padding: 0; position: absolute; " + ("width:" + k.width + "px; ");
                        m += "height:" + k.height + "px;";
                        this.g = kd("VIDEO", {
                            style: m,
                            autoplay: !0
                        });
                        null != ws(this) && r(ws(this).volume) && (this.g.volume = ws(this).volume);
                        g.appendChild(this.g)
                    }
                    var l = this.l.K;
                    a = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var t = this.g;
                    b: {
                        var E = Zc(t);
                        if (E.defaultView && E.defaultView.getComputedStyle) {
                            var Y = E.defaultView.getComputedStyle(t, null);
                            if (Y) {
                                var qa = Y.display || Y.getPropertyValue("display") || "";
                                break b
                            }
                        }
                        qa = ""
                    }
                    if ("none" != (qa || (t.currentStyle ? t.currentStyle.display : null) || t.style && t.style.display))
                        var T = bf(t);
                    else {
                        var Z = t.style
                          , jc = Z.display
                          , qf = Z.visibility
                          , Gf = Z.position;
                        Z.visibility = "hidden";
                        Z.position = "absolute";
                        Z.display = "inline";
                        var Hf = bf(t);
                        Z.display = jc;
                        Z.position = Gf;
                        Z.visibility = qf;
                        T = Hf
                    }
                    a += "width:" + T.width + "px; ";
                    a += "height:" + T.height + "px;";
                    this.o = kd("DIV", {
                        style: a
                    });
                    l.appendChild(this.o);
                    try {
                        this.h.contentWindow.loader.initFriendly(this.g, this.o)
                    } catch (bd) {
                        xs(this)
                    }
                    dq(this.w, "vpaid", "", b);
                    break;
                case "destroyFriendlyIframe":
                    this.X();
                    break;
                case "becameLinear":
                    this.g && !Bf() && !Af() && We(this.g, {
                        visibility: "visible"
                    });
                    dq(this.w, "vpaid", "", b);
                    break;
                case "becameNonlinear":
                    ys(this);
                    dq(this.w, "vpaid", "", b);
                    break;
                default:
                    dq(this.w, "vpaid", "", b)
                }
        } catch (bd) {
            xs(this)
        }
    }
    ;
    var xs = function(a) {
        var b = {
            type: "error"
        };
        b.session = a.A;
        a = we(b);
        window.postMessage(a, "*")
    }
      , ws = function(a) {
        a = a.l.h;
        return a instanceof jr && a.g instanceof HTMLVideoElement ? a.g : null
    }
      , ys = function(a) {
        a.g && !Bf() && !Af() && We(a.g, {
            visibility: "hidden"
        })
    };
    vs.prototype.U = function() {
        F.da.U.call(this);
        xd(this.H);
        this.H = null;
        md(this.o);
        this.o = null;
        md(this.h);
        this.h = null;
        var a = ws(this);
        (Bf() || Af()) && null != a ? (a.src = this.F,
        a.currentTime = this.G) : null != a ? (a.src = "",
        a = this.l,
        null != a.g && Dq(a.g.g, !1)) : (md(this.g),
        this.g = null)
    }
    ;
    var zs = function() {
        this.g = [];
        this.h = []
    };
    h = zs.prototype;
    h.Ha = function() {
        return this.g.length + this.h.length
    }
    ;
    h.isEmpty = function() {
        return 0 == this.g.length && 0 == this.h.length
    }
    ;
    h.clear = function() {
        this.g = [];
        this.h = []
    }
    ;
    h.contains = function(a) {
        return pb(this.g, a) || pb(this.h, a)
    }
    ;
    h.pa = function() {
        for (var a = [], b = this.g.length - 1; 0 <= b; --b)
            a.push(this.g[b]);
        var c = this.h.length;
        for (b = 0; b < c; ++b)
            a.push(this.h[b]);
        return a
    }
    ;
    var W = function(a, b, c, d, e, f, g) {
        F.call(this);
        this.L = a;
        this.g = b;
        this.J = c;
        this.Qa = e;
        this.l = null;
        this.Y = g;
        this.P = !1;
        this.H = 1;
        this.za = d;
        this.la = this.Z = this.W = -1;
        this.o = this.h = null;
        this.F = new zs;
        this.sa = !1;
        this.R = new Map;
        this.V = this.na = !1;
        this.C = null;
        this.ga = f && null != this.g.B;
        this.M = w(this.Xd, this);
        this.fa = new up(this);
        this.fa.O(this.Y, "adsManager", this.bb)
    };
    y(W, F);
    W.prototype.bb = function(a) {
        var b = a.ia
          , c = a.ha;
        switch (b) {
        case "error":
            As(this);
            Bs(this, c);
            break;
        case "contentPauseRequested":
            b = this.g.h;
            this.g.w() && null != this.l && this.l.restoreCustomPlaybackStateOnAdBreakComplete && null != b.Ib && b.Ib();
            this.w(a.ia, a.ha);
            break;
        case "contentResumeRequested":
            a = w(W.prototype.w, this, b, c);
            As(this, a);
            break;
        case "remainingTime":
            this.W = c.currentTime;
            this.Z = c.duration;
            this.la = c.remainingTime;
            break;
        case "skip":
            this.w(b, c);
            break;
        case "log":
            a = c.adData;
            this.w(b, a, c.logData);
            break;
        case "companionBackfill":
            a = Ba("window.google_show_companion_ad");
            null != a && a();
            break;
        case "skipshown":
            this.P = !0;
            this.w(b, c);
            break;
        case "interaction":
            a = c.adData;
            this.w(b, a, c.interactionData);
            break;
        case "vpaidEvent":
            try {
                var d = a.ha
                  , e = d.vpaidEventType;
                if ("createFriendlyIframe" == e) {
                    var f = this.C = new vs(this.g,this.Y);
                    f.A = d.session;
                    a = "about:self";
                    mc && (a = "");
                    f.h = kd("IFRAME", {
                        src: a,
                        allowtransparency: !0,
                        background: "transparent"
                    });
                    We(f.h, {
                        display: "none",
                        width: "0",
                        height: "0"
                    });
                    var g = f.l.K;
                    g.appendChild(f.h);
                    var k = g.ownerDocument
                      , m = k.defaultView || k.parentWindow;
                    null == f.C && (f.C = new up(f));
                    f.C.O(m, "message", f.J);
                    var l = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>' + ('loader = new VPAIDLoader(false, "' + f.A + '");') + "\x3c/script></body>";
                    if (pe || he || nc) {
                        var t = f.h;
                        if (ls) {
                            var E = t.contentWindow;
                            E && ns(E.document, l)
                        } else
                            ts(t, l)
                    } else {
                        var Y = f.h;
                        if (ms)
                            Y.srcdoc = l;
                        else if (ls) {
                            var qa = Y.contentWindow;
                            qa && ns(qa.document, l)
                        } else
                            ts(Y, l)
                    }
                } else
                    "vpaidNonLinear" == e && ys(this.C)
            } catch (T) {
                Bs(this, T.ha)
            }
            break;
        case "skippableStateChanged":
            a = c.adData;
            null != a.skippable && (this.P = a.skippable);
            this.w(b, c);
            break;
        case "cacheAbandonUrls":
            break;
        case "volumeChange":
            a = c.adData;
            null != a && r(a.volume) && (this.H = a.volume);
            this.w(b, c);
            break;
        default:
            this.w(b, c)
        }
    }
    ;
    W.prototype.w = function(a, b, c) {
        if (null == b.companions) {
            var d = this.R.get(b.adId);
            b.companions = null != d ? d : []
        }
        var e = b.adData;
        this.h = d = null == e ? null : new V(e);
        switch (a) {
        case "adBreakReady":
        case "trackingUrlPinged":
        case "mediaUrlPinged":
            a = new Q(a,null,b);
            break;
        case "adMetadata":
            a = null;
            null != b.adCuePoints && (a = new Io(b.adCuePoints));
            a = new Jr(d,a);
            break;
        case "allAdsCompleted":
            this.h = null;
            this.na = !0;
            a = new Q(a,d);
            break;
        case "contentPauseRequested":
            this.V = !1;
            a = new Q(a,d);
            break;
        case "contentResumeRequested":
            this.h = null;
            this.V = !0;
            a = new Q(a,d);
            break;
        case "loaded":
            this.W = 0;
            this.Z = d.gc();
            this.la = d.gc();
            c = this.L;
            var f = this.M;
            b = this.Qa;
            P.D();
            c.h.set(Vq(d), f);
            c.A && c.C && (K.D().g = !0,
            f = c.C,
            K.D().B = f);
            (0 != R.g ? P.D().h : c.w) && br(c, "loaded", Vq(d), b);
            Mp(Jp(), 667080010) && null != e.gfpCookie && R.w && ro() && (c = e.gfpCookie,
            Ce.set("__gads", c.value, c.expires, c.path, c.domain),
            delete e.gfpCookie);
            a = new Q(a,d,e);
            break;
        case "start":
            this.R.set(b.adId, b.companions);
            null != Cq(this.g) && (null == this.o ? (this.o = new Xp,
            this.fa.O(this.o, "click", this.Rf)) : aq(this.o),
            Zp(this.o, Cq(this.g)));
            a = new Q(a,d);
            break;
        case "complete":
            null != this.o && aq(this.o);
            dr(this.L, this.M, Vq(d));
            this.h = null;
            this.R["delete"](b.adId);
            a = new Q(a,d);
            break;
        case "log":
            e = null;
            null != c && null != c.type ? (b = c.type,
            b = "adLoadError" == b || "adPlayError" == b) : b = !1;
            b && (e = {
                adError: Lo(c)
            });
            a = new Q(a,d,e);
            break;
        case "interaction":
            a = new Q(a,d,c);
            break;
        case "urlNavigationRequested":
            a = new Q(a,d,b.urlNavigationData);
            break;
        default:
            a = new Q(a,d)
        }
        this.dispatchEvent(a);
        this.na && this.V && this.Tc()
    }
    ;
    var Bs = function(a, b) {
        var c = new Mo(Lo(b));
        a.sa ? (a.dispatchEvent(c),
        a.h && dr(a.L, a.M, Vq(a.h)),
        a.h = null) : a.F.h.push(c);
        a = {
            error: b.errorCode,
            vis: Jh(document)
        };
        Wp(Sp.D(), 7, a, !0)
    }
      , Cs = function(a, b, c) {
        dq(a.Y, "adsManager", b, c)
    };
    W.prototype.ra = function() {
        Cs(this, "contentTimeUpdate", {
            currentTime: this.A.currentTime
        })
    }
    ;
    var As = function(a, b) {
        var c = a.g.h;
        a.g.w() && null != a.l && a.l.restoreCustomPlaybackStateOnAdBreakComplete && null != c.Y ? c.Y(b) : null != b && b()
    };
    h = W.prototype;
    h.af = function(a, b, c, d) {
        if (this.F.isEmpty()) {
            var e = this.g;
            null != d && (Wp(Sp.D(), 54, {}, !0),
            e.F = Hr(d),
            R.h || mp(e.F) ? (e.C = !0,
            xd(e.g),
            xd(e.o),
            xd(e.l),
            e.g = null,
            e.o = null,
            e.l = null,
            xd(e.h),
            e.h = new jr(d),
            v(d.getBoundingClientRect) ? e.G = d : (e.G = e.K,
            R.F = e.G),
            zq(e.I, e.h)) : e.C = !1);
            this.sa = !0;
            this.Uc(a, b, c);
            Cs(this, "init", {
                width: a,
                height: b,
                viewMode: c
            })
        } else {
            for (; !this.F.isEmpty(); )
                b = a = this.F,
                0 == b.g.length && (b.g = b.h,
                b.g.reverse(),
                b.h = []),
                a = a.g.pop(),
                this.dispatchEvent(a);
            this.X()
        }
    }
    ;
    h.Jf = function() {
        return this.g.w()
    }
    ;
    h.If = function() {
        return this.ga
    }
    ;
    h.Ze = function() {
        return this.la
    }
    ;
    h.We = function() {
        return this.P
    }
    ;
    h.Qd = function() {
        Cs(this, "discardAdBreak")
    }
    ;
    h.bf = function() {
        Cs(this, "requestNextAdBreak")
    }
    ;
    h.Vc = function(a) {
        null != a && (this.l = a,
        Cs(this, "updateAdsRenderingSettings", {
            adsRenderingSettings: Ds(this)
        }))
    }
    ;
    h.Xd = function() {
        var a = null != this.h ? this.h.g.vpaid : !1
          , b = this.g.h
          , c = null != b ? b.ya() : this.W
          , d = null != b ? b.xb() : this.Z;
        return {
            currentTime: c,
            duration: d,
            isPlaying: null != b ? b.Yc() : !1,
            isVpaid: a,
            isYouTube: !1,
            volume: this.H
        }
    }
    ;
    h.cf = function() {
        Cs(this, "skip")
    }
    ;
    h.start = function() {
        if (this.J && !R.ca()) {
            fp() && Wp(Sp.D(), 50, {
                customPlayback: this.g.w()
            });
            this.g.H || Wp(Sp.D(), 26, {
                adtagurl: this.J,
                customPlayback: this.g.w()
            });
            Nh(this.g.A) && Wp(Sp.D(), 30, {
                adtagurl: this.J,
                customPlayback: this.g.w()
            });
            var a = this.g.B, b = this.g.A, c;
            if (c = a && b && !Nh(a))
                a = $q(a),
                b = $q(b),
                c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            c && Wp(Sp.D(), 31, {
                adtagurl: this.J,
                customPlayback: this.g.w()
            })
        }
        if (!this.g.H && !this.g.w())
            throw tp(rp);
        b = this.g;
        b.P = this.ga && null != b.B;
        this.g.I.h.style.opacity = 1;
        null != this.A && 1 == this.H && (wa(this.A.muted) && this.A.muted ? this.hc(0) : r(this.A.volume) && (b = this.A.volume,
        0 <= b && 1 >= b && this.hc(this.A.volume)));
        Cs(this, "start")
    }
    ;
    h.Rf = function() {
        if ((null == this.l || !this.l.disableClickThrough) && null != this.h) {
            var a = this.h.g.clickThroughUrl;
            null != a && (Bb(Qb(a)) || window.open(a, "_blank"))
        }
    }
    ;
    h.Uc = function(a, b, c) {
        var d = this.g
          , e = d.A;
        null != e && (-1 == a ? (e.style.right = "0",
        e.style.left = "0") : e.style.width = a + "px",
        -1 == b ? (e.style.bottom = "0",
        e.style.top = "0") : e.style.height = b + "px");
        e = d.I;
        e.h.width = -1 == a ? "100%" : a;
        e.h.height = -1 == b ? "100%" : b;
        e.h.offsetTop = e.h.offsetTop;
        d.M = new B(a,b);
        Cs(this, "resize", {
            width: a,
            height: b,
            viewMode: c
        })
    }
    ;
    h.stop = function() {
        Cs(this, "stop")
    }
    ;
    h.Ve = function() {
        Cs(this, "expand")
    }
    ;
    h.Ue = function() {
        Cs(this, "collapse")
    }
    ;
    h.$e = function() {
        return this.H
    }
    ;
    h.hc = function(a) {
        this.H = a;
        if (!R.ca()) {
            var b = this.g.h;
            null != b && b.Mb(a)
        }
        Cs(this, "volume", {
            volume: a
        })
    }
    ;
    h.pause = function() {
        Cs(this, "pause")
    }
    ;
    h.resume = function() {
        Cs(this, "resume")
    }
    ;
    h.Tc = function() {
        null != this.C && (this.C.X(),
        this.C = null);
        this.X()
    }
    ;
    h.Xe = function() {
        return this.za
    }
    ;
    h.Ye = function() {
        return this.h
    }
    ;
    h.U = function() {
        Cs(this, "destroy");
        null != this.o && this.o.X();
        this.fa.X();
        this.F.clear();
        this.G && (this.G.stop(),
        this.G.X());
        dr(this.L, this.M);
        W.da.U.call(this)
    }
    ;
    var Ds = function(a) {
        var b = {};
        null != a.l && cb(b, a.l);
        a.ga && (b.useClickElement = !1,
        b.disableClickThrough = !0);
        return b
    };
    W.prototype.xa = function() {
        Cs(this, "click")
    }
    ;
    var Es = function(a, b, c) {
        yd.call(this, "adsManagerLoaded");
        this.h = a;
        this.w = b;
        this.C = c || ""
    };
    y(Es, yd);
    Es.prototype.B = function(a, b) {
        var c = this.h;
        c.A = a;
        null != b && (c.l = b);
        null != a.currentTime && (c.G = new zp(a),
        c.G.O("currentTimeUpdate", c.ra, !1, c),
        c.G.start(),
        c.ra(null));
        Cs(c, "configure", {
            adsRenderingSettings: Ds(c)
        });
        b && this.h.Vc(b);
        return this.h
    }
    ;
    Es.prototype.A = function() {
        return this.w
    }
    ;
    Es.prototype.o = function() {
        return this.C
    }
    ;
    var Fs = function(a) {
        try {
            var b = new Jn(a);
            if (!b.g.includes(".cdn.ampproject.org"))
                return null;
            var c = b.l.split("/").slice(1)
              , d = "s" == c[1] && 3 > c.length;
            if (2 > c.length || d)
                return null;
            var e = "s" == c[1];
            c = e ? c.slice(2) : c.slice(1);
            var f = decodeURIComponent(c[0]) + "/";
            return e ? "https://" + f + c.slice(1).join("/") : "http://" + f + c.slice(1).join("/")
        } catch (g) {
            return null
        }
    };
    var Gs = function(a, b, c) {
        var d = "script";
        d = void 0 === d ? "" : d;
        var e = a.createElement("link");
        try {
            e.rel = "preload";
            if (Nb("preload", "stylesheet"))
                var f = Lc(b);
            else {
                if (b instanceof Kc)
                    var g = Lc(b);
                else {
                    if (b instanceof Oc)
                        var k = Pc(b);
                    else {
                        if (b instanceof Oc)
                            var m = b;
                        else
                            b = b.Wa ? b.Ia() : String(b),
                            Qc.test(b) || (b = "about:invalid#zClosurez"),
                            m = Rc(b);
                        k = m.Ia()
                    }
                    g = k
                }
                f = g
            }
            e.href = f
        } catch (l) {
            return
        }
        d && (e.as = d);
        c && (e.nonce = c);
        if (a = a.getElementsByTagName("head")[0])
            try {
                a.appendChild(e)
            } catch (l) {}
    };
    var Hs = /^\.google\.(com?\.)?[a-z]{2,3}$/, Is = /\.(cn|com\.bi|do|sl|ba|by|ma|am)$/, Js = n, Ks = function(a) {
        a = "https://" + ("adservice" + a + "/adsid/integrator.js");
        var b = ["domain=" + encodeURIComponent(n.location.hostname)];
        Vo[3] >= x() && b.push("adsid=" + encodeURIComponent(Vo[1]));
        return a + "?" + b.join("&")
    }, Vo, Ls, Uo = function() {
        Js = n;
        Vo = Js.googleToken = Js.googleToken || {};
        var a = x();
        Vo[1] && Vo[3] > a && 0 < Vo[2] || (Vo[1] = "",
        Vo[2] = -1,
        Vo[3] = -1,
        Vo[4] = "",
        Vo[6] = "");
        Ls = Js.googleIMState = Js.googleIMState || {};
        a = Ls[1];
        Hs.test(a) && !Is.test(a) || (Ls[1] = ".google.com");
        Fa(Ls[5]) || (Ls[5] = []);
        wa(Ls[6]) || (Ls[6] = !1);
        Fa(Ls[7]) || (Ls[7] = []);
        r(Ls[8]) || (Ls[8] = 0)
    }, Ms = {
        cc: function() {
            return 0 < Ls[8]
        },
        Yf: function() {
            Ls[8]++
        },
        Zf: function() {
            0 < Ls[8] && Ls[8]--
        },
        $f: function() {
            Ls[8] = 0
        },
        Ci: function() {
            return !1
        },
        Pc: function() {
            return Ls[5]
        },
        Kc: function(a) {
            try {
                a()
            } catch (b) {
                n.setTimeout(function() {
                    throw b;
                }, 0)
            }
        },
        ld: function() {
            if (!Ms.cc()) {
                var a = n.document
                  , b = function(b) {
                    b = Ks(b);
                    a: {
                        try {
                            var c = Aa();
                            break a
                        } catch (k) {}
                        c = void 0
                    }
                    var d = c;
                    Gs(a, b, d);
                    c = a.createElement("script");
                    c.type = "text/javascript";
                    d && (c.nonce = d);
                    c.onerror = function() {
                        return n.processGoogleToken({}, 2)
                    }
                    ;
                    b = zf(b);
                    Vc(c, b);
                    try {
                        (a.head || a.body || a.documentElement).appendChild(c),
                        Ms.Yf()
                    } catch (k) {}
                }
                  , c = Ls[1];
                b(c);
                ".google.com" != c && b(".google.com");
                b = {};
                var d = (b.newToken = "FBT",
                b);
                n.setTimeout(function() {
                    return n.processGoogleToken(d, 1)
                }, 1E3)
            }
        }
    }, Ns = function(a) {
        Uo();
        var b = Js.googleToken[5] || 0;
        a && (0 != b || Vo[3] >= x() ? Ms.Kc(a) : (Ms.Pc().push(a),
        Ms.ld()));
        Vo[3] >= x() && Vo[2] >= x() || Ms.ld()
    }, Os = function(a) {
        n.processGoogleToken = n.processGoogleToken || function(a, c) {
            var b = a;
            b = void 0 === b ? {} : b;
            c = void 0 === c ? 0 : c;
            a = b.newToken || "";
            var e = "NT" == a
              , f = parseInt(b.freshLifetimeSecs || "", 10)
              , g = parseInt(b.validLifetimeSecs || "", 10)
              , k = b["1p_jar"] || "";
            b = b.pucrd || "";
            Uo();
            1 == c ? Ms.$f() : Ms.Zf();
            var m = Js.googleToken = Js.googleToken || {}
              , l = 0 == c && a && q(a) && !e && r(f) && 0 < f && r(g) && 0 < g && q(k);
            e = e && !Ms.cc() && (!(Vo[3] >= x()) || "NT" == Vo[1]);
            var t = !(Vo[3] >= x()) && 0 != c;
            if (l || e || t)
                e = x(),
                f = e + 1E3 * f,
                g = e + 1E3 * g,
                1E-5 > Math.random() && Zf(n, "https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err=" + c, void 0),
                m[5] = c,
                m[1] = a,
                m[2] = f,
                m[3] = g,
                m[4] = k,
                m[6] = b,
                Uo();
            if (l || !Ms.cc()) {
                c = Ms.Pc();
                for (a = 0; a < c.length; a++)
                    Ms.Kc(c[a]);
                c.length = 0
            }
        }
        ;
        Ns(a)
    };
    (function() {
        if (!Qa(function(a) {
            return a.match(C().location.href)
        })) {
            for (var a = ad(), b = null, c = null, d = 0; d < a.length; d++)
                if (c = a[d],
                Qa(function(a) {
                    return a.match(c.src)
                })) {
                    b = c;
                    break
                }
            if (null == b)
                throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
        }
    }
    )();
    var Qs = function(a) {
        F.call(this);
        this.g = a;
        this.w = new Map;
        this.l = this.g.I;
        this.A = new up(this);
        0 != R.g ? (this.h = new Wq,
        wd(this, Ma(xd, this.h))) : this.h = Zq();
        if (this.l) {
            a = this.h;
            var b = vq(this.l);
            if (!a.l) {
                a.g = b || null;
                a.g && (a.G.O(a.g, "activityMonitor", a.H),
                er(a));
                if (!(n.ima && n.ima.video && n.ima.video.client && n.ima.video.client.tagged)) {
                    u("ima.video.client.sdkTag", !0, void 0);
                    var c = n.document;
                    b = document.createElement("SCRIPT");
                    var d = Mc(Hc(Ic("https://s0.2mdn.net/instream/video/client.js")));
                    Vc(b, d);
                    b.async = !0;
                    b.type = "text/javascript";
                    c = c.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(b, c)
                }
                b = Op();
                Gg(b);
                P.D().L = R.g;
                R.G || (a.w = !0,
                P.D().h = !0);
                a.F = (v(null),
                null);
                R.ca() && (K.D().T = "gsv",
                K.D().C = 79463068);
                b = P.D();
                c = "h" == Tl(b) || "b" == Tl(b);
                d = "exc" != K.D().T;
                c && d && (b.F = !0,
                b.H = new Ak);
                a.l = !0
            }
            this.o = cr(this.h, this.g.G)
        }
        a: {
            try {
                var e = window.top.location.href
            } catch (f) {
                e = 2;
                break a
            }
            e = null == e ? 2 : e == window.document.location.href ? 0 : 1
        }
        Qp.l = e;
        Ps()
    };
    y(Qs, F);
    Qs.prototype.U = function() {
        this.A.X();
        var a = this.o;
        this.h.o["delete"](a);
        0 != R.g && (P.D().w[a] = null);
        Qs.da.U.call(this)
    }
    ;
    Qs.prototype.H = function() {
        this.X()
    }
    ;
    Qs.prototype.J = function(a, b) {
        var c = this;
        Mr("ar");
        R.ca() || R.sc() ? Rs(this, a, b) : Os(function() {
            Wo();
            Xo();
            Yo();
            Rs(c, a, b)
        })
    }
    ;
    var Rs = function(a, b, c) {
        b.adTagUrl && Wp(Sp.D(), 8, {
            adtagurl: b.adTagUrl,
            customPlayback: a.g.w(),
            customClick: null != a.g.B,
            restrict: R.h
        });
        var d = Vg()
          , e = d.h
          , f = d.g
          , g = d.l
          , k = null;
        g && (k = Fs(g.url));
        b.location = k ? k : e && e.url ? e.url : f && f.url ? f.url : "";
        b.referrer = window.document.referrer;
        var m = C().location.ancestorOrigins;
        b.h = m ? 0 < m.length && 200 > m[m.length - 1].length ? m[m.length - 1] : "" : null;
        b.supportsYouTubeHosted = a.g.R();
        var l = b.adTagUrl
          , t = a.g.K
          , E = []
          , Y = ""
          , qa = "";
        if (null != t) {
            for (var T = t, Z = [], jc = 0; T && 25 > jc; ++jc) {
                a: {
                    if (T && T.nodeName && T.parentElement)
                        for (var qf = T.nodeName.toString().toLowerCase(), Gf = T.parentElement.childNodes, Hf = 0, bd = 0; bd < Gf.length; ++bd) {
                            var yi = Gf[bd];
                            if (yi.nodeName && yi.nodeName.toString().toLowerCase() === qf) {
                                if (T === yi) {
                                    var Sm = "." + Hf;
                                    break a
                                }
                                ++Hf
                            }
                        }
                    Sm = ""
                }
                Z.push((T.nodeName && T.nodeName.toString().toLowerCase()) + "" + Sm);
                T = T.parentElement
            }
            Y = Z.join();
            if (t) {
                var zi = t.ownerDocument
                  , cd = zi && (zi.defaultView || zi.parentWindow) || null
                  , Tm = [];
                if (cd)
                    try {
                        for (var ke = cd.parent, Um = 0; ke && ke !== cd && 25 > Um; ++Um) {
                            for (var Vm = ke.frames, If = 0; If < Vm.length; ++If)
                                if (cd === Vm[If]) {
                                    Tm.push(If);
                                    break
                                }
                            cd = ke;
                            ke = cd.parent
                        }
                    } catch (Wm) {}
                qa = Tm.join()
            } else
                qa = ""
        }
        E.push(Y, qa);
        if (null != l) {
            for (var Ai = 0; Ai < qo.length - 1; ++Ai)
                E.push(Ge(l, qo[Ai]) || "");
            var Xm = Ge(l, "videoad_start_delay")
              , Ym = "";
            if (Xm) {
                var Zm = parseInt(Xm, 10);
                Ym = 0 > Zm ? "postroll" : 0 == Zm ? "preroll" : "midroll"
            }
            E.push(Ym)
        } else
            for (var $m = 0; $m < qo.length; ++$m)
                E.push("");
        var an = E.join(":")
          , bn = an.length;
        if (0 == bn)
            var cn = 0;
        else {
            for (var dd = 305419896, Bi = 0; Bi < bn; Bi++)
                dd ^= (dd << 5) + (dd >> 2) + an.charCodeAt(Bi) & 4294967295;
            cn = 0 < dd ? dd : 4294967296 + dd
        }
        b.videoAdKey = cn.toString();
        b.g = a.g.J;
        var dn = b.adTagUrl;
        if (null == dn)
            var en = !1;
        else {
            var fn = new Jn(dn)
              , gn = fn.l;
            en = Ab(fn.g, "googleads.g.doubleclick.net") && (Bb(Qb(gn)) ? !1 : /\/pagead\/(live\/)?ads/.test(gn))
        }
        if (en) {
            var le = window
              , xa = dg().document
              , Ta = {}
              , Jf = dg();
            var wb = xj(dg()).ea;
            var me = wb.location.href;
            if (wb == wb.top)
                var hn = {
                    url: me,
                    Zc: !0
                };
            else {
                var Ci = !1
                  , Di = wb.document;
                Di && Di.referrer && (me = Di.referrer,
                wb.parent == wb.top && (Ci = !0));
                var Ei = wb.location.ancestorOrigins;
                if (Ei) {
                    var Fi = Ei[Ei.length - 1];
                    Fi && -1 == me.indexOf(Fi) && (Ci = !1,
                    me = Fi)
                }
                hn = {
                    url: me,
                    Zc: Ci
                }
            }
            var Ss = hn;
            a: {
                var ac = dg()
                  , jn = le.google_ad_width || ac.google_ad_width
                  , kn = le.google_ad_height || ac.google_ad_height;
                if (ac && ac.top == ac)
                    var Gi = !1;
                else {
                    var Kf = xa.documentElement;
                    if (jn && kn) {
                        var Lf = 1
                          , Mf = 1;
                        ac.innerHeight ? (Lf = ac.innerWidth,
                        Mf = ac.innerHeight) : Kf && Kf.clientHeight ? (Lf = Kf.clientWidth,
                        Mf = Kf.clientHeight) : xa.body && (Lf = xa.body.clientWidth,
                        Mf = xa.body.clientHeight);
                        if (Mf > 2 * kn || Lf > 2 * jn) {
                            Gi = !1;
                            break a
                        }
                    }
                    Gi = !0
                }
            }
            var bc = Gi;
            var Ts = Ss.Zc
              , Hi = dg()
              , Nf = Hi.top == Hi ? 0 : Cf(Hi.top) ? 1 : 2
              , ed = 4;
            bc || 1 != Nf ? bc || 2 != Nf ? bc && 1 == Nf ? ed = 7 : bc && 2 == Nf && (ed = 8) : ed = 6 : ed = 5;
            Ts && (ed |= 16);
            var Us = "" + ed;
            var ln = Fn();
            var Ii = !!le.google_page_url;
            Ta.google_iframing = Us;
            0 != ln && (Ta.google_iframing_environment = ln);
            if (!Ii && "ad.yieldmanager.com" == xa.domain) {
                for (var ne = xa.URL.substring(xa.URL.lastIndexOf("http")); -1 < ne.indexOf("%"); )
                    try {
                        ne = decodeURIComponent(ne)
                    } catch (Wm) {
                        break
                    }
                le.google_page_url = ne;
                Ii = !!ne
            }
            var Ji = ag(Jf);
            if (Ii)
                Ta.google_page_url = le.google_page_url,
                Ta.google_page_location = (bc ? xa.referrer : xa.URL) || "EMPTY";
            else {
                Jj || (Jj = gh());
                var mn = Jj;
                "21061977" == (mn.g.hasOwnProperty(119) ? mn.g[119] : "") && Ji && Ji.canonicalUrl ? (Ta.google_page_url = Ji.canonicalUrl,
                Ta.google_page_location = (bc ? xa.referrer : xa.URL) || "EMPTY") : (bc && Cf(Jf.top) && xa.referrer && Jf.top.document.referrer === xa.referrer ? Ta.google_page_url = Jf.top.document.URL : Ta.google_page_url = bc ? xa.referrer : xa.URL,
                Ta.google_page_location = null)
            }
            a: {
                if (xa.URL == Ta.google_page_url)
                    try {
                        var nn = Date.parse(xa.lastModified) / 1E3;
                        break a
                    } catch (Wm) {}
                nn = null
            }
            Ta.google_last_modified_time = nn;
            if (wb == wb.top)
                var on = wb.document.referrer;
            else {
                var pn = ag();
                on = pn && pn.referrer || ""
            }
            Ta.google_referrer_url = on;
            b.adSenseParams = Ta
        }
        a: {
            for (var Vs = Sg(), qn = ra(Vs), Ki = qn.next(); !Ki.done; Ki = qn.next()) {
                var rn = Ki.value;
                if (rn.url && rn.url.includes("amp=1")) {
                    var sn = !0;
                    break a
                }
            }
            sn = null != window.context ? 0 < parseInt(window.context.ampcontextVersion, 10) : null != Vg().l
        }
        b.Ob = sn;
        var tn = "goog_" + Tb++;
        a.w.set(tn, c || null);
        var Li = Kr(b.adTagUrl) || ""
          , un = $f(Li);
        if (0 != un)
            var vn = un;
        else {
            var Mi = n.top;
            vn = Uf(Mi, "googlefcInactive") ? 4 : Li && Uf(Mi, "googlefcPA-" + Li) ? 2 : Uf(Mi, "googlefcNPA") ? 3 : 0
        }
        var wn = vn;
        var Ws = Uf(n.top, "googlefcPresent") && 4 != wn;
        var rc = {}
          , M = a.C()
          , D = {};
        D.adSenseParams = b.adSenseParams;
        D.adsResponse = b.adsResponse;
        D.adContainerBounds = b.Fb;
        D.videoPlayActivation = b.videoPlayActivation;
        D.videoPlayMuted = b.videoPlayMuted;
        D.adTagUrl = b.adTagUrl;
        D.mediaUrl = b.g;
        D.contentDuration = b.contentDuration;
        D.contentKeywords = b.contentKeywords;
        D.contentTitle = b.contentTitle;
        D.forcedSkipOffsetSeconds = b.l;
        D.location = b.location;
        D.referrer = b.referrer;
        D.topOrigin = b.h;
        D.language = b.language;
        D.linearAdSlotWidth = b.linearAdSlotWidth;
        D.linearAdSlotHeight = b.linearAdSlotHeight;
        D.nonLinearAdSlotWidth = b.nonLinearAdSlotWidth;
        D.nonLinearAdSlotHeight = b.nonLinearAdSlotHeight;
        D.requestCorrelatorId = b.B;
        D.videoAdKey = b.videoAdKey;
        D.tagForChildDirectedContent = b.tagForChildDirectedContent;
        D.usePostAdRequests = b.usePostAdRequests;
        D.supportsYouTubeHosted = b.supportsYouTubeHosted;
        D.youTubeAdType = b.youTubeAdType;
        D.youTubeVideoAdStartTime = b.youTubeVideoAdStartTime;
        D.afcRmFallback = b.Wb;
        D.marketAppVersion = b.w;
        D.marketAppPackageName = b.o;
        D.forceNonLinearFullSlot = b.forceNonLinearFullSlot;
        D.liveStreamPrefetchSeconds = b.liveStreamPrefetchSeconds;
        D.isAdContainerAttachedToWindow = b.qc;
        D.isAmp = b.Ob;
        D.vastLoadTimeout = b.Ub;
        cb(rc, D);
        rc.settings = {
            "1pJar": M.M,
            activeViewPushUpdates: 0 != R.g ? P.D().h : a.h.w,
            activityMonitorMode: M.g,
            adsToken: M.L,
            autoPlayAdBreaks: M.l,
            cacheAbandonUrls: !1,
            chromelessPlayer: !0,
            companionBackfill: M.K,
            cookiesEnabled: M.w,
            disableCustomPlaybackForIOS10Plus: M.o,
            engagementDetection: !0,
            isAdMob: M.ca(),
            isGdpr: M.Kf() || !1,
            isInChina: M.sc() || !1,
            isFunctionalTest: M.rc(),
            isVpaidAdapter: M.Qb(),
            numRedirects: M.C,
            onScreenDetection: !0,
            pageCorrelator: M.P,
            persistentStateCorrelator: Ej(),
            playerType: M.B,
            playerVersion: M.I,
            ppid: M.R,
            privacyControls: M.W,
            reportMediaRequests: M.ag(),
            restrictToCustomPlayback: M.h,
            streamCorrelator: M.Y,
            testingConfig: Oo(M).g,
            unloadAbandonPingEnabled: M.dg(),
            urlSignals: M.ga,
            useCompanionsAsEndSlate: !1,
            useNewLogicForRewardedEndSlate: M.eg(),
            useRewardedEndSlate: M.fg(),
            useRefactoredDelayLearnMore: !1,
            vpaidMode: M.J
        };
        rc.consentSettings = {
            gfcPresent: Ws,
            gfcUserConsent: wn
        };
        var Ni;
        if (Ni = Mp(Jp(), 667080010))
            Ni = R.w;
        if (Ni) {
            var xn = ro(), yn = {
                isBrowserCookieEnabled: xn
            }, Of;
            if (Of = xn) {
                var zn = b.adTagUrl;
                if (null == zn)
                    Of = !1;
                else {
                    var An = new Jn(zn)
                      , Bn = An.l;
                    Of = Ab(An.g, "doubleclick.net") && (Bb(Qb(Bn)) ? !1 : /\/gampad\/(live\/)?ads/.test(Bn))
                }
            }
            if (Of) {
                var Xs = Ce.get("__gads");
                yn.gfpCookieValue = Qb(Xs)
            }
            rc.cookieSettings = yn
        }
        var Cn = a.g.h;
        rc.videoEnvironment = {
            customClickTrackingProvided: null != a.g.B,
            iframeState: Qp.l,
            osdId: a.o,
            supportedMimeTypes: null != Cn ? Cn.Qc() : null,
            usesChromelessPlayer: a.g.Y(),
            usesCustomVideoPlayback: a.g.w(),
            usesYouTubePlayer: a.g.R(),
            usesInlinePlayback: a.g.F
        };
        rc.experimentState = Lp();
        var Dn = vq(a.l, tn);
        a.A.O(Dn, "adsLoader", a.F);
        dq(Dn, "adsLoader", "requestAds", rc)
    };
    Qs.prototype.C = function() {
        return R
    }
    ;
    Qs.prototype.G = function() {
        dq(vq(this.l), "adsLoader", "contentComplete")
    }
    ;
    var Ps = function() {
        R.ca() || R.sc() || Os(function() {
            Wo();
            Xo();
            Yo()
        })
    };
    Qs.prototype.F = function(a) {
        var b = a.ia;
        switch (b) {
        case "adsLoaded":
            b = a.ha;
            a = a.Lb;
            var c = Lr.D()
              , d = b.adTagUrl;
            d ? (d = Kr(d) || "0",
            c.g.h = d) : c.g.h = "0";
            null != a && Fo(c.g.g, "rcid", a, !1);
            Mr("vl");
            c = new W(this.h,this.g,b.adTagUrl || "",b.adCuePoints,this.o,b.isCustomClickTrackingAllowed,vq(this.l, a));
            this.dispatchEvent(new Es(c,this.w.get(a),b.response));
            break;
        case "error":
            b = a.ha;
            a = a.Lb;
            c = Lo(b);
            this.dispatchEvent(new Mo(c,this.w.get(a)));
            b = {
                error: b.errorCode,
                vis: Jh(document)
            };
            Wp(Sp.D(), 7, b, !0);
            break;
        case "trackingUrlPinged":
            this.dispatchEvent(new Q(b,null,a.ha))
        }
    }
    ;
    var X = function() {
        this.slotId = Math.floor(2147483646 * Math.random()) + 1
    };
    h = X.prototype;
    h.clone = function() {
        var a = new X;
        "auto" == this.videoPlayActivation ? a.setAdWillAutoPlay(!0) : "click" == this.videoPlayActivation && a.setAdWillAutoPlay(!1);
        "muted" == this.videoPlayMuted ? a.setAdWillPlayMuted(!0) : "unmuted" == this.videoPlayMuted && a.setAdWillPlayMuted(!1);
        a.adTagUrl = this.adTagUrl;
        a.g = this.g;
        a.adSenseParams = ab(this.adSenseParams);
        a.adsResponse = this.adsResponse;
        a.contentDuration = this.contentDuration;
        a.contentKeywords = this.contentKeywords ? this.contentKeywords.slice() : null;
        a.contentTitle = this.contentTitle;
        a.customMacros = ab(this.customMacros);
        a.l = this.l;
        a.location = this.location;
        a.referrer = this.referrer;
        a.h = this.h;
        a.language = this.language;
        a.linearAdSlotWidth = this.linearAdSlotWidth;
        a.linearAdSlotHeight = this.linearAdSlotHeight;
        a.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
        a.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
        a.B = this.B;
        a.videoAdKey = this.videoAdKey;
        a.tagForChildDirectedContent = this.tagForChildDirectedContent;
        a.usePostAdRequests = this.usePostAdRequests;
        a.supportsYouTubeHosted = this.supportsYouTubeHosted;
        a.youTubeAdType = this.youTubeAdType;
        a.youTubeVideoAdStartTime = this.youTubeVideoAdStartTime;
        a.Lc = this.Lc;
        a.Wb = this.Wb;
        a.w = this.w;
        a.o = this.o;
        a.forceNonLinearFullSlot = this.forceNonLinearFullSlot;
        a.liveStreamPrefetchSeconds = this.liveStreamPrefetchSeconds;
        a.qc = this.qc;
        a.Ob = this.Ob;
        a.Ub = this.Ub;
        a.Fb = this.Fb ? this.Fb.clone() : null;
        return a
    }
    ;
    h.adSenseParams = null;
    h.customMacros = null;
    h.videoPlayActivation = "unknown";
    h.videoPlayMuted = "unknown";
    h.liveStreamPrefetchSeconds = 0;
    h.linearAdSlotWidth = 0;
    h.linearAdSlotHeight = 0;
    h.nonLinearAdSlotWidth = 0;
    h.nonLinearAdSlotHeight = 0;
    h.forceNonLinearFullSlot = !1;
    h.videoAdKey = null;
    h.tagForChildDirectedContent = !1;
    h.usePostAdRequests = !1;
    h.slotId = 0;
    h.supportsYouTubeHosted = !0;
    h.youTubeVideoAdStartTime = 0;
    h.Lc = null;
    h.Wb = !1;
    h.setAdWillAutoPlay = function(a) {
        this.videoPlayActivation = a ? "auto" : "click"
    }
    ;
    h.setAdWillPlayMuted = function(a) {
        this.videoPlayMuted = a ? "muted" : "unmuted"
    }
    ;
    h.qc = !0;
    h.Ob = !1;
    h.Ub = 5E3;
    h.Fb = null;
    V.prototype.getCompanionAds = V.prototype.ye;
    V.prototype.isLinear = V.prototype.Re;
    V.prototype.isSkippable = V.prototype.Se;
    V.prototype.isUiDisabled = V.prototype.Te;
    V.prototype.getAdId = V.prototype.h;
    V.prototype.getAdSystem = V.prototype.ve;
    V.prototype.getAdvertiserName = V.prototype.we;
    V.prototype.getApiFramework = V.prototype.xe;
    V.prototype.getContentType = V.prototype.ze;
    V.prototype.getCreativeId = V.prototype.o;
    V.prototype.getCreativeAdId = V.prototype.l;
    V.prototype.getDescription = V.prototype.Td;
    V.prototype.getTitle = V.prototype.Vd;
    V.prototype.getDuration = V.prototype.gc;
    V.prototype.getHeight = V.prototype.Be;
    V.prototype.getWidth = V.prototype.Ne;
    V.prototype.getVastMediaHeight = V.prototype.Le;
    V.prototype.getVastMediaWidth = V.prototype.Me;
    V.prototype.getWrapperCreativeIds = V.prototype.Qe;
    V.prototype.getWrapperAdIds = V.prototype.Oe;
    V.prototype.getWrapperAdSystems = V.prototype.Pe;
    V.prototype.getTraffickingParameters = V.prototype.Ge;
    V.prototype.getTraffickingParametersString = V.prototype.He;
    V.prototype.getAdPodInfo = V.prototype.ue;
    V.prototype.getUiElements = V.prototype.Ie;
    V.prototype.getMinSuggestedDuration = V.prototype.De;
    V.prototype.getMediaUrl = V.prototype.Ce;
    V.prototype.getSurveyUrl = V.prototype.Fe;
    V.prototype.getSkipTimeOffset = V.prototype.Ee;
    V.prototype.getDealId = V.prototype.Ae;
    V.prototype.getUniversalAdIdValue = V.prototype.Ke;
    V.prototype.getUniversalAdIdRegistry = V.prototype.Je;
    Io.prototype.getCuePoints = Io.prototype.g;
    u("google.ima.AdCuePoints.PREROLL", 0, window);
    u("google.ima.AdCuePoints.POSTROLL", -1, window);
    u("google.ima.AdDisplayContainer", Ir, window);
    Ir.prototype.initialize = Ir.prototype.W;
    Ir.prototype.destroy = Ir.prototype.V;
    Uq.prototype.getPodIndex = Uq.prototype.re;
    Uq.prototype.getTimeOffset = Uq.prototype.se;
    Uq.prototype.getTotalAds = Uq.prototype.te;
    Uq.prototype.getMaxDuration = Uq.prototype.qe;
    Uq.prototype.getAdPosition = Uq.prototype.oe;
    Uq.prototype.getIsBumper = Uq.prototype.pe;
    u("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window);
    u("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window);
    u("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window);
    u("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window);
    u("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window);
    u("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window);
    u("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window);
    u("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window);
    u("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window);
    u("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window);
    u("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window);
    u("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window);
    u("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window);
    u("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window);
    u("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window);
    u("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_DURATION_ERROR", 202, window);
    u("google.ima.AdError.ErrorCode.VAST_WRAPPER_ERROR", 300, window);
    u("google.ima.AdError.ErrorCode.NONLINEAR_DIMENSIONS_ERROR", 501, window);
    u("google.ima.AdError.ErrorCode.COMPANION_REQUIRED_ERROR", 602, window);
    u("google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE", 1009, window);
    u("google.ima.AdError.ErrorCode.UNSUPPORTED_LOCALE", 1011, window);
    u("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window);
    u("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window);
    u("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window);
    u("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window);
    u("google.ima.AdError.ErrorCode.AUTOPLAY_DISALLOWED", 1205, window);
    u("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    u("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    u("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    u("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    u("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    u("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    u("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    u("google.ima.AdError.Type.AD_LOAD", "adLoadError", window);
    u("google.ima.AdError.Type.AD_PLAY", "adPlayError", window);
    Ko.prototype.getErrorCode = Ko.prototype.ie;
    Ko.prototype.getVastErrorCode = Ko.prototype.Wd;
    Ko.prototype.getInnerError = Ko.prototype.je;
    Ko.prototype.getMessage = Ko.prototype.ke;
    Ko.prototype.getType = Ko.prototype.ne;
    u("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window);
    Mo.prototype.getError = Mo.prototype.w;
    Mo.prototype.getUserRequestContext = Mo.prototype.B;
    u("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window);
    u("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window);
    u("google.ima.AdEvent.Type.CLICK", "click", window);
    u("google.ima.AdEvent.Type.DURATION_CHANGE", "durationChange", window);
    u("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window);
    u("google.ima.AdEvent.Type.STARTED", "start", window);
    u("google.ima.AdEvent.Type.IMPRESSION", "impression", window);
    u("google.ima.AdEvent.Type.PAUSED", "pause", window);
    u("google.ima.AdEvent.Type.RESUMED", "resume", window);
    u("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstquartile", window);
    u("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window);
    u("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdquartile", window);
    u("google.ima.AdEvent.Type.COMPLETE", "complete", window);
    u("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window);
    u("google.ima.AdEvent.Type.LINEAR_CHANGED", "linearChanged", window);
    u("google.ima.AdEvent.Type.LOADED", "loaded", window);
    u("google.ima.AdEvent.Type.AD_CAN_PLAY", "adCanPlay", window);
    u("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window);
    u("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window);
    u("google.ima.AdEvent.Type.INTERACTION", "interaction", window);
    u("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window);
    u("google.ima.AdEvent.Type.SKIPPED", "skip", window);
    u("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window);
    u("google.ima.AdEvent.Type.LOG", "log", window);
    u("google.ima.AdEvent.Type.VIEWABLE_IMPRESSION", "viewable_impression", window);
    u("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window);
    u("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window);
    Q.prototype.type = Q.prototype.type;
    Q.prototype.getAd = Q.prototype.A;
    Q.prototype.getAdData = Q.prototype.C;
    Jr.prototype.getAdCuePoints = Jr.prototype.B;
    u("google.ima.AdsLoader", Qs, window);
    Qs.prototype.getSettings = Qs.prototype.C;
    Qs.prototype.requestAds = Qs.prototype.J;
    Qs.prototype.contentComplete = Qs.prototype.G;
    Qs.prototype.destroy = Qs.prototype.H;
    u("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window);
    Es.prototype.getAdsManager = Es.prototype.B;
    Es.prototype.getUserRequestContext = Es.prototype.A;
    Es.prototype.getResponse = Es.prototype.o;
    u("google.ima.CompanionAdSelectionSettings", Fq, window);
    u("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0);
    u("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0);
    u("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0);
    u("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0);
    u("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0);
    u("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0);
    u("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0);
    u("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0);
    u("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0);
    u("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0);
    u("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    u("ima.ImaSdkSettings", S, window);
    u("google.ima.settings", R, window);
    S.prototype.setCompanionBackfill = S.prototype.qf;
    S.prototype.getCompanionBackfill = S.prototype.df;
    S.prototype.setAutoPlayAdBreaks = S.prototype.pf;
    S.prototype.isAutoPlayAdBreak = S.prototype.mf;
    S.prototype.setPpid = S.prototype.Af;
    S.prototype.getPpid = S.prototype.lf;
    S.prototype.setVpaidAllowed = S.prototype.Cf;
    S.prototype.setVpaidMode = S.prototype.Df;
    S.prototype.setIsVpaidAdapter = S.prototype.vf;
    S.prototype.isVpaidAdapter = S.prototype.Qb;
    S.prototype.setRestrictToCustomPlayback = S.prototype.Bf;
    S.prototype.isRestrictToCustomPlayback = S.prototype.Lf;
    S.prototype.setNumRedirects = S.prototype.xf;
    S.prototype.getNumRedirects = S.prototype.hf;
    S.prototype.getLocale = S.prototype.Ud;
    S.prototype.setLocale = S.prototype.wf;
    S.prototype.getPlayerType = S.prototype.jf;
    S.prototype.setPlayerType = S.prototype.yf;
    S.prototype.getDisableFlashAds = S.prototype.gf;
    S.prototype.setDisableFlashAds = S.prototype.tf;
    S.prototype.getPlayerVersion = S.prototype.kf;
    S.prototype.setPlayerVersion = S.prototype.zf;
    S.prototype.setPageCorrelator = S.prototype.Z;
    S.prototype.setStreamCorrelator = S.prototype.fa;
    S.prototype.setIsOutstreamVideo = S.prototype.uf;
    S.prototype.isOutstreamVideo = S.prototype.nf;
    S.prototype.setDisableCustomPlaybackForIOS10Plus = S.prototype.sf;
    S.prototype.getDisableCustomPlaybackForIOS10Plus = S.prototype.ff;
    S.prototype.setCookiesEnabled = S.prototype.rf;
    u("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0);
    u("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0);
    u("google.ima.ImaSdkSettings.VpaidMode.DISABLED", 0, void 0);
    u("google.ima.ImaSdkSettings.VpaidMode.ENABLED", 1, void 0);
    u("google.ima.ImaSdkSettings.VpaidMode.INSECURE", 2, void 0);
    u("google.ima.common.adTrackingMonitor", gr, window);
    Wq.prototype.setActiveViewUseOsdGeometry = Wq.prototype.L;
    Wq.prototype.getActiveViewUseOsdGeometry = Wq.prototype.J;
    Wq.prototype.setBlockId = Wq.prototype.M;
    u("google.ima.AdsRenderingSettings", Ap, window);
    u("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    u("google.ima.AdsRequest", X, window);
    X.prototype.adTagUrl = X.prototype.adTagUrl;
    X.prototype.adsResponse = X.prototype.adsResponse;
    X.prototype.nonLinearAdSlotHeight = X.prototype.nonLinearAdSlotHeight;
    X.prototype.nonLinearAdSlotWidth = X.prototype.nonLinearAdSlotWidth;
    X.prototype.linearAdSlotHeight = X.prototype.linearAdSlotHeight;
    X.prototype.linearAdSlotWidth = X.prototype.linearAdSlotWidth;
    X.prototype.setAdWillAutoPlay = X.prototype.setAdWillAutoPlay;
    X.prototype.setAdWillPlayMuted = X.prototype.setAdWillPlayMuted;
    X.prototype.contentDuration = X.prototype.contentDuration;
    X.prototype.contentKeywords = X.prototype.contentKeywords;
    X.prototype.contentTitle = X.prototype.contentTitle;
    X.prototype.vastLoadTimeout = X.prototype.Ub;
    u("google.ima.VERSION", "3.221.0", void 0);
    u("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0);
    u("google.ima.UiElements.COUNTDOWN", "countdown", void 0);
    u("google.ima.ViewMode.NORMAL", "normal", void 0);
    u("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0);
    W.prototype.isCustomPlaybackUsed = W.prototype.Jf;
    W.prototype.isCustomClickTrackingUsed = W.prototype.If;
    W.prototype.destroy = W.prototype.Tc;
    W.prototype.init = W.prototype.af;
    W.prototype.start = W.prototype.start;
    W.prototype.stop = W.prototype.stop;
    W.prototype.pause = W.prototype.pause;
    W.prototype.resume = W.prototype.resume;
    W.prototype.getCuePoints = W.prototype.Xe;
    W.prototype.getCurrentAd = W.prototype.Ye;
    W.prototype.getRemainingTime = W.prototype.Ze;
    W.prototype.expand = W.prototype.Ve;
    W.prototype.collapse = W.prototype.Ue;
    W.prototype.getAdSkippableState = W.prototype.We;
    W.prototype.resize = W.prototype.Uc;
    W.prototype.skip = W.prototype.cf;
    W.prototype.getVolume = W.prototype.$e;
    W.prototype.setVolume = W.prototype.hc;
    W.prototype.discardAdBreak = W.prototype.Qd;
    W.prototype.requestNextAdBreak = W.prototype.bf;
    W.prototype.updateAdsRenderingSettings = W.prototype.Vc;
    W.prototype.clicked = W.prototype.xa;
    Tq.prototype.getContent = Tq.prototype.getContent;
    Tq.prototype.getContentType = Tq.prototype.A;
    Tq.prototype.getHeight = Tq.prototype.C;
    Tq.prototype.getWidth = Tq.prototype.I;
}
)();