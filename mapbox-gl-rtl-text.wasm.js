(function(){
var Module = {
  TOTAL_MEMORY: 8*1024*1024,
  TOTAL_STACK: 2*1024*1024 ,
  preRun: [],
  postRun: [],
  print: function( text ) {
    console.log(text);
  },
  printErr: function(text) {
    text = Array.prototype.slice.call(arguments).join(' ');
    if ( text.indexOf( 'pre-main prep time' ) >= 0 ) {
      return;
    }
    console.error(text);
  }
};
var b;
b || (b = eval('(function() { try { return Module || {} } catch(e) { return {} } })()'));
var g = {}, p;
for (p in b)
    b.hasOwnProperty(p) && (g[p] = b[p]);
var r = !1, w = !1, y = !1, z = !1;
if (b.ENVIRONMENT)
    if ('WEB' === b.ENVIRONMENT)
        r = !0;
    else if ('WORKER' === b.ENVIRONMENT)
        w = !0;
    else if ('NODE' === b.ENVIRONMENT)
        y = !0;
    else if ('SHELL' === b.ENVIRONMENT)
        z = !0;
    else
        throw Error('The provided Module[\'ENVIRONMENT\'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.');
else
    r = 'object' === typeof window, w = 'function' === typeof importScripts, y = 'object' === typeof process && 'function' === typeof require && !r && !w, z = !r && !y && !w;
if (y) {
    b.print || (b.print = console.log);
    b.printErr || (b.printErr = console.warn);
    var aa, ba;
    b.read = function (a, c) {
        aa || (aa = require('fs'));
        ba || (ba = require('path'));
        a = ba.normalize(a);
        var d = aa.readFileSync(a);
        return c ? d : d.toString();
    };
    b.readBinary = function (a) {
        a = b.read(a, !0);
        a.buffer || (a = new Uint8Array(a));
        return a;
    };
    b.load = function (a) {
        ca(read(a));
    };
    b.thisProgram || (b.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, '/') : 'unknown-program');
    b.arguments = process.argv.slice(2);
    'undefined' !== typeof module && (module.exports = b);
    process.on('uncaughtException', function (a) {
        if (!(a instanceof A))
            throw a;
    });
    b.inspect = function () {
        return '[Emscripten Module object]';
    };
} else if (z)
    b.print || (b.print = print), 'undefined' != typeof printErr && (b.printErr = printErr), b.read = 'undefined' != typeof read ? read : function () {
        throw 'no read() available';
    }, b.readBinary = function (a) {
        if ('function' === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
        a = read(a, 'binary');
        return a;
    }, 'undefined' != typeof scriptArgs ? b.arguments = scriptArgs : 'undefined' != typeof arguments && (b.arguments = arguments), 'function' === typeof quit && (b.quit = function (a) {
        quit(a);
    }), eval('if (typeof gc === \'function\' && gc.toString().indexOf(\'[native code]\') > 0) var gc = undefined');
else if (r || w)
    b.read = function (a) {
        var c = new XMLHttpRequest();
        c.open('GET', a, !1);
        c.send(null);
        return c.responseText;
    }, w && (b.readBinary = function (a) {
        var c = new XMLHttpRequest();
        c.open('GET', a, !1);
        c.responseType = 'arraybuffer';
        c.send(null);
        return c.response;
    }), b.readAsync = function (a, c, d) {
        var e = new XMLHttpRequest();
        e.open('GET', a, !0);
        e.responseType = 'arraybuffer';
        e.onload = function () {
            200 == e.status || 0 == e.status && e.response ? c(e.response) : d();
        };
        e.onerror = d;
        e.send(null);
    }, 'undefined' != typeof arguments && (b.arguments = arguments), 'undefined' !== typeof console ? (b.print || (b.print = function (a) {
        console.log(a);
    }), b.printErr || (b.printErr = function (a) {
        console.warn(a);
    })) : b.print || (b.print = function () {
    }), w && (b.load = importScripts), 'undefined' === typeof b.setWindowTitle && (b.setWindowTitle = function (a) {
        document.title = a;
    });
else
    throw 'Unknown runtime environment. Where are we?';
function ca(a) {
    eval.call(null, a);
}
!b.load && b.read && (b.load = function (a) {
    ca(b.read(a));
});
b.print || (b.print = function () {
});
b.printErr || (b.printErr = b.print);
b.arguments || (b.arguments = []);
b.thisProgram || (b.thisProgram = './this.program');
b.quit || (b.quit = function (a, c) {
    throw c;
});
b.print = b.print;
b.d = b.printErr;
b.preRun = [];
b.postRun = [];
for (p in g)
    g.hasOwnProperty(p) && (b[p] = g[p]);
var g = void 0, D = {
        a: function (a) {
            return tempRet0 = a;
        },
        w: function () {
            return tempRet0;
        },
        m: function () {
            return C;
        },
        f: function (a) {
            C = a;
        },
        p: function (a) {
            switch (a) {
            case 'i1':
            case 'i8':
                return 1;
            case 'i16':
                return 2;
            case 'i32':
                return 4;
            case 'i64':
                return 8;
            case 'float':
                return 4;
            case 'double':
                return 8;
            default:
                return '*' === a[a.length - 1] ? D.h : 'i' === a[0] ? (a = parseInt(a.substr(1)), assert_em(0 === a % 8), a / 8) : 0;
            }
        },
        v: function (a) {
            return Math.max(D.p(a), D.h);
        },
        B: 16,
        R: function (a, c) {
            'double' === c || 'i64' === c ? a & 7 && (assert_em(4 === (a & 7)), a += 4) : assert_em(0 === (a & 3));
            return a;
        },
        L: function (a, c, d) {
            return d || 'i64' != a && 'double' != a ? a ? Math.min(c || (a ? D.v(a) : 0), D.h) : Math.min(c, 8) : 8;
        },
        j: function (a, c, d) {
            return d && d.length ? b['dynCall_' + a].apply(null, [c].concat(d)) : b['dynCall_' + a].call(null, c);
        },
        c: [],
        r: function (a) {
            for (var c = 0; c < D.c.length; c++)
                if (!D.c[c])
                    return D.c[c] = a, 2 * (1 + c);
            throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
        },
        A: function (a) {
            D.c[(a - 2) / 2] = null;
        },
        b: function (a) {
            D.b.l || (D.b.l = {});
            D.b.l[a] || (D.b.l[a] = 1, b.d(a));
        },
        k: {},
        N: function (a, c) {
            D.k[c] || (D.k[c] = {});
            var d = D.k[c];
            d[a] || (d[a] = 1 === c.length ? function () {
                return D.j(c, a);
            } : 2 === c.length ? function (d) {
                return D.j(c, a, [d]);
            } : function () {
                return D.j(c, a, Array.prototype.slice.call(arguments));
            });
            return d[a];
        },
        M: function () {
            throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
        },
        e: function (a) {
            var c = C;
            C = C + a | 0;
            C = C + 15 & -16;
            return c;
        },
        q: function (a) {
            var c = E;
            E = E + a | 0;
            E = E + 15 & -16;
            return c;
        },
        u: function (a) {
            var c = F[H >> 2];
            a = (c + a + 15 | 0) & -16;
            F[H >> 2] = a;
            return a >= I && !da() ? (F[H >> 2] = c, 0) : c;
        },
        o: function (a, c) {
            return Math.ceil(a / (c ? c : 16)) * (c ? c : 16);
        },
        Q: function (a, c, d) {
            return d ? +(a >>> 0) + 4294967296 * +(c >>> 0) : +(a >>> 0) + 4294967296 * +(c | 0);
        },
        g: 1024,
        h: 4,
        C: 0
    };
D.addFunction = D.r;
D.removeFunction = D.A;
var J = 0;
function assert_em(a, c) {
    a || K('Assertion failed: ' + c);
}
function ea(a) {
    var c = b['_' + a];
    if (!c)
        try {
            c = eval('_' + a);
        } catch (d) {
        }
    return c;
}
var fa;
(function () {
    var a = {
            stackSave: function () {
                D.m();
            },
            stackRestore: function () {
                D.f();
            },
            arrayToC: function (a) {
                var c = D.e(a.length);
                L.set(a, c);
                return c;
            },
            stringToC: function (a) {
                var c = 0;
                if (null !== a && void 0 !== a && 0 !== a) {
                    var f = (a.length << 2) + 1, c = D.e(f);
                    ga(a, M, c, f);
                }
                return c;
            }
        }, c = {
            string: a.stringToC,
            array: a.arrayToC
        };
    fa = function (a, e, f, h, l) {
        a = ea(a);
        var k = [], t = 0;
        if (h)
            for (var m = 0; m < h.length; m++) {
                var q = c[f[m]];
                q ? (0 === t && (t = D.m()), k[m] = q(h[m])) : k[m] = h[m];
            }
        f = a.apply(null, k);
        'string' === e && (f = ha(f));
        if (0 !== t) {
            if (l && l.async) {
                EmterpreterAsync.F.push(function () {
                    D.f(t);
                });
                return;
            }
            D.f(t);
        }
        return f;
    };
}());
b.ccall = fa;
function ia(a) {
    var c;
    c = 'i32';
    '*' === c.charAt(c.length - 1) && (c = 'i32');
    switch (c) {
    case 'i1':
        return L[a >> 0];
    case 'i8':
        return L[a >> 0];
    case 'i16':
        return P[a >> 1];
    case 'i32':
        return F[a >> 2];
    case 'i64':
        return F[a >> 2];
    case 'float':
        return Q[a >> 2];
    case 'double':
        return R[a >> 3];
    default:
        K('invalid type for setValue: ' + c);
    }
    return null;
}
function S(a, c, d) {
    var e, f, h;
    'number' === typeof a ? (f = !0, h = a) : (f = !1, h = a.length);
    var l = 'string' === typeof c ? c : null, k;
    4 == d ? k = e : k = [
        'function' === typeof T ? T : D.q,
        D.e,
        D.q,
        D.u
    ][void 0 === d ? 2 : d](Math.max(h, l ? 1 : c.length));
    if (f) {
        e = k;
        for (a = k + (h & -4); e < a; e += 4)
            F[e >> 2] = 0;
        for (a = k + h; e < a;)
            L[e++ >> 0] = 0;
        return k;
    }
    if ('i8' === l)
        return a.subarray || a.slice ? M.set(a, k) : M.set(new Uint8Array(a), k), k;
    e = 0;
    for (var t, m; e < h;) {
        var q = a[e];
        'function' === typeof q && (q = D.O(q));
        d = l || c[e];
        if (0 === d)
            e++;
        else {
            'i64' == d && (d = 'i32');
            f = k + e;
            var u = d, u = u || 'i8';
            '*' === u.charAt(u.length - 1) && (u = 'i32');
            switch (u) {
            case 'i1':
                L[f >> 0] = q;
                break;
            case 'i8':
                L[f >> 0] = q;
                break;
            case 'i16':
                P[f >> 1] = q;
                break;
            case 'i32':
                F[f >> 2] = q;
                break;
            case 'i64':
                tempI64 = [
                    q >>> 0,
                    (tempDouble = q, 1 <= +ja(tempDouble) ? 0 < tempDouble ? (ka(+la(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+ma((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
                ];
                F[f >> 2] = tempI64[0];
                F[f + 4 >> 2] = tempI64[1];
                break;
            case 'float':
                Q[f >> 2] = q;
                break;
            case 'double':
                R[f >> 3] = q;
                break;
            default:
                K('invalid type for setValue: ' + u);
            }
            m !== d && (t = D.p(d), m = d);
            e += t;
        }
    }
    return k;
}
function ha(a) {
    var c;
    if (0 === c || !a)
        return '';
    for (var d = 0, e, f = 0;;) {
        e = M[a + f >> 0];
        d |= e;
        if (0 == e && !c)
            break;
        f++;
        if (c && f == c)
            break;
    }
    c || (c = f);
    e = '';
    if (128 > d) {
        for (; 0 < c;)
            d = String.fromCharCode.apply(String, M.subarray(a, a + Math.min(c, 1024))), e = e ? e + d : d, a += 1024, c -= 1024;
        return e;
    }
    return b.UTF8ToString(a);
}
'undefined' !== typeof TextDecoder && new TextDecoder('utf8');
function ga(a, c, d, e) {
    if (0 < e) {
        e = d + e - 1;
        for (var f = 0; f < a.length; ++f) {
            var h = a.charCodeAt(f);
            55296 <= h && 57343 >= h && (h = 65536 + ((h & 1023) << 10) | a.charCodeAt(++f) & 1023);
            if (127 >= h) {
                if (d >= e)
                    break;
                c[d++] = h;
            } else {
                if (2047 >= h) {
                    if (d + 1 >= e)
                        break;
                    c[d++] = 192 | h >> 6;
                } else {
                    if (65535 >= h) {
                        if (d + 2 >= e)
                            break;
                        c[d++] = 224 | h >> 12;
                    } else {
                        if (2097151 >= h) {
                            if (d + 3 >= e)
                                break;
                            c[d++] = 240 | h >> 18;
                        } else {
                            if (67108863 >= h) {
                                if (d + 4 >= e)
                                    break;
                                c[d++] = 248 | h >> 24;
                            } else {
                                if (d + 5 >= e)
                                    break;
                                c[d++] = 252 | h >> 30;
                                c[d++] = 128 | h >> 24 & 63;
                            }
                            c[d++] = 128 | h >> 18 & 63;
                        }
                        c[d++] = 128 | h >> 12 & 63;
                    }
                    c[d++] = 128 | h >> 6 & 63;
                }
                c[d++] = 128 | h & 63;
            }
        }
        c[d] = 0;
    }
}
function na(a) {
    for (var c = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
        127 >= e ? ++c : c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : 2097151 >= e ? c + 4 : 67108863 >= e ? c + 5 : c + 6;
    }
    return c;
}
var oa = 'undefined' !== typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
b.UTF16ToString = function (a) {
    var c;
    for (c = a >> 1; P[c];)
        ++c;
    c <<= 1;
    if (32 < c - a && oa)
        return oa.decode(M.subarray(a, c));
    c = 0;
    for (var d = '';;) {
        var e = P[a + 2 * c >> 1];
        if (0 == e)
            return d;
        ++c;
        d += String.fromCharCode(e);
    }
};
b.stringToUTF16 = function (a, c, d) {
    void 0 === d && (d = 2147483647);
    if (2 > d)
        return 0;
    d -= 2;
    var e = c;
    d = d < 2 * a.length ? d / 2 : a.length;
    for (var f = 0; f < d; ++f)
        P[c >> 1] = a.charCodeAt(f), c += 2;
    P[c >> 1] = 0;
    return c - e;
};
function qa(a) {
    return a.replace(/__Z[\w\d_]+/g, function (a) {
        var d;
        a: {
            var e = b.___cxa_demangle || b.__cxa_demangle;
            if (e)
                try {
                    var f = a.substr(1), h = na(f) + 1, l = T(h);
                    ga(f, M, l, h);
                    var k = T(4), t = e(l, 0, 0, k);
                    if (0 === ia(k) && t) {
                        d = ha(t);
                        break a;
                    }
                } catch (m) {
                } finally {
                    l && ra(l), k && ra(k), t && ra(t);
                }
            else
                D.b('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
            d = a;
        }
        return a === d ? a : a + ' [' + d + ']';
    });
}
function sa() {
    var a;
    a: {
        a = Error();
        if (!a.stack) {
            try {
                throw Error(0);
            } catch (c) {
                a = c;
            }
            if (!a.stack) {
                a = '(no stack trace available)';
                break a;
            }
        }
        a = a.stack.toString();
    }
    b.extraStackTrace && (a += '\n' + b.extraStackTrace());
    return qa(a);
}
var ta = 65536, ua = 16777216, va = 16777216;
function wa(a, c) {
    0 < a % c && (a += c - a % c);
    return a;
}
var buffer, L, M, P, xa, F, ya, Q, R;
function za() {
    b.HEAP8 = L = new Int8Array(buffer);
    b.HEAP16 = P = new Int16Array(buffer);
    b.HEAP32 = F = new Int32Array(buffer);
    b.HEAPU8 = M = new Uint8Array(buffer);
    b.HEAPU16 = xa = new Uint16Array(buffer);
    b.HEAPU32 = ya = new Uint32Array(buffer);
    b.HEAPF32 = Q = new Float32Array(buffer);
    b.HEAPF64 = R = new Float64Array(buffer);
}
var U, E, Aa, C, Ba, Ca, H;
U = E = Aa = C = Ba = Ca = H = 0;
b.reallocBuffer || (b.reallocBuffer = function (a) {
    var c;
    try {
        if (ArrayBuffer.n)
            c = ArrayBuffer.n(buffer, a);
        else {
            var d = L;
            c = new ArrayBuffer(a);
            new Int8Array(c).set(d);
        }
    } catch (e) {
        return !1;
    }
    return Da(c) ? c : !1;
});
function da() {
    var a = b.usingWasm ? ta : ua, c = 2147483648 - a;
    if (F[H >> 2] > c)
        return !1;
    for (I = Math.max(I, va); I < F[H >> 2];)
        536870912 >= I ? I = wa(2 * I, a) : I = Math.min(wa((3 * I + 2147483648) / 4, a), c);
    a = b.reallocBuffer(I);
    if (!a || a.byteLength != I)
        return !1;
    b.buffer = buffer = a;
    za();
    return !0;
}
var Ea;
try {
    Ea = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get), Ea(new ArrayBuffer(4));
} catch (Fa) {
    Ea = function (a) {
        return a.byteLength;
    };
}
var Ga = b.TOTAL_STACK || 5242880, I = b.TOTAL_MEMORY || 16777216;
I < Ga && b.d('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + I + '! (TOTAL_STACK=' + Ga + ')');
b.buffer ? buffer = b.buffer : 'object' === typeof WebAssembly && 'function' === typeof WebAssembly.Memory ? (b.wasmMemory = new WebAssembly.Memory({ initial: I / ta }), buffer = b.wasmMemory.buffer) : buffer = new ArrayBuffer(I);
za();
F[0] = 1668509029;
P[1] = 25459;
if (115 !== M[2] || 99 !== M[3])
    throw 'Runtime error: expected the system to be little-endian!';
b.HEAP = void 0;
b.buffer = buffer;
b.HEAP8 = L;
b.HEAP16 = P;
b.HEAP32 = F;
b.HEAPU8 = M;
b.HEAPU16 = xa;
b.HEAPU32 = ya;
b.HEAPF32 = Q;
b.HEAPF64 = R;
function V(a) {
    for (; 0 < a.length;) {
        var c = a.shift();
        if ('function' == typeof c)
            c();
        else {
            var d = c.K;
            'number' === typeof d ? void 0 === c.i ? b.dynCall_v(d) : b.dynCall_vi(d, c.i) : d(void 0 === c.i ? null : c.i);
        }
    }
}
var Ia = [], Ja = [], Ka = [], La = [], Ma = [], Na = !1;
function Oa() {
    var a = b.preRun.shift();
    Ia.unshift(a);
}
function Pa(a) {
    var c = Array(na(a) + 1);
    ga(a, c, 0, c.length);
    return c;
}
Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (a, c) {
    var d = a & 65535, e = c & 65535;
    return d * e + ((a >>> 16) * e + d * (c >>> 16) << 16) | 0;
});
Math.P = Math.imul;
if (!Math.fround) {
    var Qa = new Float32Array(1);
    Math.fround = function (a) {
        Qa[0] = a;
        return Qa[0];
    };
}
Math.J = Math.fround;
Math.clz32 || (Math.clz32 = function (a) {
    a = a >>> 0;
    for (var c = 0; 32 > c; c++)
        if (a & 1 << 31 - c)
            return c;
    return 32;
});
Math.H = Math.clz32;
Math.trunc || (Math.trunc = function (a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a);
});
Math.trunc = Math.trunc;
var ja = Math.abs, ma = Math.ceil, la = Math.floor, ka = Math.min, W = 0, Ra = null, X = null;
function Sa() {
    W++;
    b.monitorRunDependencies && b.monitorRunDependencies(W);
}
function Ta() {
    W--;
    b.monitorRunDependencies && b.monitorRunDependencies(W);
    if (0 == W && (null !== Ra && (clearInterval(Ra), Ra = null), X)) {
        var a = X;
        X = null;
        a();
    }
}
b.preloadedImages = {};
b.preloadedAudios = {};
var Y = null;
(function (a) {
    function c(a, c) {
        var d = u;
        if (0 > a.indexOf('.'))
            d = (d || {})[a];
        else
            var e = a.split('.'), d = (d || {})[e[0]], d = (d || {})[e[1]];
        c && (d = (d || {})[c]);
        void 0 === d && K('bad lookupImport to (' + a + ').' + c);
        return d;
    }
    function d(c) {
        var d = a.buffer;
        c.byteLength < d.byteLength && a.printErr('the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
        var d = new Int8Array(d), e = new Int8Array(c);
        Y || d.set(e.subarray(a.STATIC_BASE, a.STATIC_BASE + a.STATIC_BUMP), a.STATIC_BASE);
        e.set(d);
        b.buffer = buffer = c;
        za();
    }
    function e() {
        var c;
        if (a.wasmBinary)
            c = a.wasmBinary, c = new Uint8Array(c);
        else if (a.readBinary)
            c = a.readBinary(m);
        else
            throw 'on the web, we need the wasm binary to be preloaded and set on Module[\'wasmBinary\']. emcc.py will do that for you when generating HTML (but not JS)';
        return c;
    }
    function f() {
        return a.wasmBinary || 'function' !== typeof fetch ? new Promise(function (a) {
            a(e());
        }) : fetch(m).then(function (a) {
            if (!a.ok)
                throw 'failed to load wasm binary file at \'' + m + '\'';
            return a.arrayBuffer();
        });
    }
    function h(c, d, e) {
        if ('function' !== typeof a.asm || a.asm === db)
            a.asmPreload ? a.asm = a.asmPreload : eval(a.read(q));
        return 'function' !== typeof a.asm ? (a.printErr('asm evalling did not set the module properly'), !1) : a.asm(c, d, e);
    }
    function l(c, e) {
        function h(c) {
            O = c.exports;
            O.memory && d(O.memory);
            a.asm = O;
            a.usingWasm = !0;
            Ta();
        }
        if ('object' !== typeof WebAssembly)
            return a.printErr('no native wasm support detected'), !1;
        if (!(a.wasmMemory instanceof WebAssembly.Memory))
            return a.printErr('no native wasm Memory in use'), !1;
        e.memory = a.wasmMemory;
        u.global = {
            NaN: NaN,
            Infinity: Infinity
        };
        u['global.Math'] = c.Math;
        u.env = e;
        Sa();
        if (a.instantiateWasm)
            try {
                return a.instantiateWasm(u, h);
            } catch (k) {
                return a.printErr('Module.instantiateWasm callback failed with error: ' + k), !1;
            }
        f().then(function (a) {
            return WebAssembly.instantiate(a, u);
        }).then(function (a) {
            h(a.instance);
        }).catch(function (c) {
            a.printErr('failed to asynchronously prepare wasm: ' + c);
            a.quit(1, c);
        });
        return {};
    }
    var k = a.wasmJSMethod || 'native-wasm';
    a.wasmJSMethod = k;
    var t = a.wasmTextFile || 'wrapper.wasm.wast', m = a.wasmBinaryFile || 'wrapper.wasm.wasm', q = a.asmjsCodeFile || 'wrapper.wasm.temp.asm.js';
    'function' === typeof a.locateFile && (t = a.locateFile(t), m = a.locateFile(m), q = a.locateFile(q));
    var u = {
            global: null,
            env: null,
            asm2wasm: {
                'f64-rem': function (a, c) {
                    return a % c;
                },
                'f64-to-int': function (a) {
                    return a | 0;
                },
                'i32s-div': function (a, c) {
                    return (a | 0) / (c | 0) | 0;
                },
                'i32u-div': function (a, c) {
                    return (a >>> 0) / (c >>> 0) >>> 0;
                },
                'i32s-rem': function (a, c) {
                    return (a | 0) % (c | 0) | 0;
                },
                'i32u-rem': function (a, c) {
                    return (a >>> 0) % (c >>> 0) >>> 0;
                },
                'debugger': function () {
                    debugger;
                }
            },
            parent: a
        }, O = null;
    a.asmPreload = a.asm;
    a.reallocBuffer = function (c) {
        c = wa(c, a.usingWasm ? ta : ua);
        var d = a.buffer, e = d.byteLength;
        if (a.usingWasm)
            try {
                return -1 !== a.wasmMemory.grow((c - e) / 65536) ? a.buffer = a.wasmMemory.buffer : null;
            } catch (f) {
                return null;
            }
        else
            return O.__growWasmMemory((c - e) / 65536), a.buffer !== d ? a.buffer : null;
    };
    a.asm = function (f, m, Ha) {
        if (!m.table) {
            var G = a.wasmTableSize;
            void 0 === G && (G = 1024);
            var N = a.wasmMaxTableSize;
            m.table = 'object' === typeof WebAssembly && 'function' === typeof WebAssembly.Table ? void 0 !== N ? new WebAssembly.Table({
                initial: G,
                maximum: N,
                element: 'anyfunc'
            }) : new WebAssembly.Table({
                initial: G,
                element: 'anyfunc'
            }) : Array(G);
            a.wasmTable = m.table;
        }
        m.memoryBase || (m.memoryBase = a.STATIC_BASE);
        m.tableBase || (m.tableBase = 0);
        for (var n, G = k.split(','), N = 0; N < G.length; N++)
            if (n = G[N], 'native-wasm' === n) {
                if (n = l(f, m))
                    break;
            } else if ('asmjs' === n) {
                if (n = h(f, m, Ha))
                    break;
            } else if ('interpret-asm2wasm' === n || 'interpret-s-expr' === n || 'interpret-binary' === n) {
                var B = f, x = m, pa = Ha;
                if ('function' !== typeof WasmJS)
                    a.printErr('WasmJS not detected - polyfill not bundled?'), n = !1;
                else {
                    var v = WasmJS({});
                    v.outside = a;
                    v.info = u;
                    v.lookupImport = c;
                    u.global = B;
                    u.env = x;
                    x.memory = pa;
                    v.providedTotalMemory = a.buffer.byteLength;
                    B = void 0;
                    B = 'interpret-binary' === n ? e() : a.read('interpret-asm2wasm' == n ? q : t);
                    x = void 0;
                    if ('interpret-asm2wasm' == n)
                        x = v._malloc(B.length + 1), v.writeAsciiToMemory(B, x), v._load_asm2wasm(x);
                    else if ('interpret-s-expr' === n)
                        x = v._malloc(B.length + 1), v.writeAsciiToMemory(B, x), v._load_s_expr2wasm(x);
                    else if ('interpret-binary' === n)
                        x = v._malloc(B.length), v.HEAPU8.set(B, x), v._load_binary2wasm(x, B.length);
                    else
                        throw 'what? ' + n;
                    v._free(x);
                    v._instantiate(x);
                    a.newBuffer && (d(a.newBuffer), a.newBuffer = null);
                    n = O = v.asmExports;
                }
                if (n)
                    break;
            } else
                throw 'bad method: ' + n;
        if (!n)
            throw 'no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods';
        return n;
    };
    var db = a.asm;
}(b));
U = D.g;
E = U + 70480;
Ja.push();
Y = 0 <= b.wasmJSMethod.indexOf('asmjs') || 0 <= b.wasmJSMethod.indexOf('interpret-asm2wasm') ? 'wrapper.wasm.js.mem' : null;
b.STATIC_BASE = U;
b.STATIC_BUMP = 70480;
var Ua = E;
E += 16;
b._sbrk = Va;
b._memset = Wa;
function Xa() {
    return !!Xa.n;
}
var Ya = 0, Za = {};
function Z() {
    var a = Ya;
    if (!a)
        return (D.a(0), 0) | 0;
    var c = Za[a], d = c.type;
    if (!d)
        return (D.a(0), a) | 0;
    var e = Array.prototype.slice.call(arguments);
    b.___cxa_is_pointer_type(d);
    Z.buffer || (Z.buffer = T(4));
    F[Z.buffer >> 2] = a;
    for (var a = Z.buffer, f = 0; f < e.length; f++)
        if (e[f] && b.___cxa_can_catch(e[f], d, a))
            return a = F[a >> 2], c.D = a, (D.a(e[f]), a) | 0;
    a = F[a >> 2];
    return (D.a(d), a) | 0;
}
b._memcpy = $a;
H = S(1, 'i32', 2);
Aa = C = D.o(E);
Ba = Aa + Ga;
Ca = D.o(Ba);
F[H >> 2] = Ca;
b.wasmTableSize = 23;
b.wasmMaxTableSize = 23;
b.s = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: Infinity,
    byteLength: Ea
};
b.t = {
    abort: K,
    assert_em: assert_em,
    enlargeMemory: da,
    getTotalMemory: function () {
        return I;
    },
    abortOnCannotGrowMemory: function () {
        K('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + I + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    },
    invoke_viiiii: function (a, c, d, e, f, h) {
        try {
            b.dynCall_viiiii(a, c, d, e, f, h);
        } catch (l) {
            if ('number' !== typeof l && 'longjmp' !== l)
                throw l;
            b.setThrew(1, 0);
        }
    },
    invoke_vi: function (a, c) {
        try {
            b.dynCall_vi(a, c);
        } catch (d) {
            if ('number' !== typeof d && 'longjmp' !== d)
                throw d;
            b.setThrew(1, 0);
        }
    },
    invoke_iiii: function (a, c, d, e) {
        try {
            return b.dynCall_iiii(a, c, d, e);
        } catch (f) {
            if ('number' !== typeof f && 'longjmp' !== f)
                throw f;
            b.setThrew(1, 0);
        }
    },
    invoke_viiiiii: function (a, c, d, e, f, h, l) {
        try {
            b.dynCall_viiiiii(a, c, d, e, f, h, l);
        } catch (k) {
            if ('number' !== typeof k && 'longjmp' !== k)
                throw k;
            b.setThrew(1, 0);
        }
    },
    invoke_iii: function (a, c, d) {
        try {
            return b.dynCall_iii(a, c, d);
        } catch (e) {
            if ('number' !== typeof e && 'longjmp' !== e)
                throw e;
            b.setThrew(1, 0);
        }
    },
    invoke_viiii: function (a, c, d, e, f) {
        try {
            b.dynCall_viiii(a, c, d, e, f);
        } catch (h) {
            if ('number' !== typeof h && 'longjmp' !== h)
                throw h;
            b.setThrew(1, 0);
        }
    },
    _abort: function () {
        b.abort();
    },
    ___setErrNo: function (a) {
        b.___errno_location && (F[b.___errno_location() >> 2] = a);
        return a;
    },
    _emscripten_memcpy_big: function (a, c, d) {
        M.set(M.subarray(c, c + d), a);
        return a;
    },
    ___gxx_personality_v0: function () {
    },
    ___resumeException: function (a) {
        Ya || (Ya = a);
        throw a + ' - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.';
    },
    __ZSt18uncaught_exceptionv: Xa,
    ___cxa_find_matching_catch: Z,
    DYNAMICTOP_PTR: H,
    tempDoublePtr: Ua,
    ABORT: J,
    STACKTOP: C,
    STACK_MAX: Ba
};
var ab = b.asm(b.s, b.t, buffer);
b.asm = ab;
b.setThrew = function () {
    return b.asm.setThrew.apply(null, arguments);
};
b._bidi_getParagraphEndIndex = function () {
    return b.asm._bidi_getParagraphEndIndex.apply(null, arguments);
};
b.___cxa_is_pointer_type = function () {
    return b.asm.___cxa_is_pointer_type.apply(null, arguments);
};
var Wa = b._memset = function () {
        return b.asm._memset.apply(null, arguments);
    }, Va = b._sbrk = function () {
        return b.asm._sbrk.apply(null, arguments);
    }, $a = b._memcpy = function () {
        return b.asm._memcpy.apply(null, arguments);
    };
b.stackAlloc = function () {
    return b.asm.stackAlloc.apply(null, arguments);
};
b._ushape_arabic = function () {
    return b.asm._ushape_arabic.apply(null, arguments);
};
b._memalign = function () {
    return b.asm._memalign.apply(null, arguments);
};
b.getTempRet0 = function () {
    return b.asm.getTempRet0.apply(null, arguments);
};
b.setTempRet0 = function () {
    return b.asm.setTempRet0.apply(null, arguments);
};
b._emscripten_get_global_libc = function () {
    return b.asm._emscripten_get_global_libc.apply(null, arguments);
};
b._bidi_getLine = function () {
    return b.asm._bidi_getLine.apply(null, arguments);
};
b.stackSave = function () {
    return b.asm.stackSave.apply(null, arguments);
};
b.___cxa_can_catch = function () {
    return b.asm.___cxa_can_catch.apply(null, arguments);
};
var ra = b._free = function () {
    return b.asm._free.apply(null, arguments);
};
b.runPostSets = function () {
    return b.asm.runPostSets.apply(null, arguments);
};
b.establishStackSpace = function () {
    return b.asm.establishStackSpace.apply(null, arguments);
};
b.stackRestore = function () {
    return b.asm.stackRestore.apply(null, arguments);
};
var T = b._malloc = function () {
        return b.asm._malloc.apply(null, arguments);
    }, Da = b._emscripten_replace_memory = function () {
        return b.asm._emscripten_replace_memory.apply(null, arguments);
    };
b._bidi_processText = function () {
    return b.asm._bidi_processText.apply(null, arguments);
};
b.dynCall_viiiii = function () {
    return b.asm.dynCall_viiiii.apply(null, arguments);
};
b.dynCall_vi = function () {
    return b.asm.dynCall_vi.apply(null, arguments);
};
b.dynCall_iiii = function () {
    return b.asm.dynCall_iiii.apply(null, arguments);
};
b.dynCall_viiiiii = function () {
    return b.asm.dynCall_viiiiii.apply(null, arguments);
};
b.dynCall_iii = function () {
    return b.asm.dynCall_iii.apply(null, arguments);
};
b.dynCall_viiii = function () {
    return b.asm.dynCall_viiii.apply(null, arguments);
};
D.e = b.stackAlloc;
D.m = b.stackSave;
D.f = b.stackRestore;
D.I = b.establishStackSpace;
D.a = b.setTempRet0;
D.w = b.getTempRet0;
b.asm = ab;
if (Y)
    if ('function' === typeof b.locateFile ? Y = b.locateFile(Y) : b.memoryInitializerPrefixURL && (Y = b.memoryInitializerPrefixURL + Y), y || z) {
        var bb = b.readBinary(Y);
        M.set(bb, D.g);
    } else {
        var eb = function () {
            b.readAsync(Y, cb, function () {
                throw 'could not load memory initializer ' + Y;
            });
        };
        Sa();
        var cb = function (a) {
            a.byteLength && (a = new Uint8Array(a));
            M.set(a, D.g);
            b.memoryInitializerRequest && delete b.memoryInitializerRequest.response;
            Ta();
        };
        if (b.memoryInitializerRequest) {
            var fb = function () {
                var a = b.memoryInitializerRequest;
                200 !== a.status && 0 !== a.status ? (console.warn('a problem seems to have happened with Module.memoryInitializerRequest, status: ' + a.status + ', retrying ' + Y), eb()) : cb(a.response);
            };
            b.memoryInitializerRequest.response ? setTimeout(fb, 0) : b.memoryInitializerRequest.addEventListener('load', fb);
        } else
            eb();
    }
function A(a) {
    this.name = 'ExitStatus';
    this.message = 'Program terminated with exit(' + a + ')';
    this.status = a;
}
A.prototype = Error();
A.prototype.constructor = A;
var gb = null, X = function hb() {
        b.calledRun || ib();
        b.calledRun || (X = hb);
    };
b.callMain = b.G = function (a) {
    function c() {
        for (var a = 0; 3 > a; a++)
            e.push(0);
    }
    a = a || [];
    Na || (Na = !0, V(Ja));
    var d = a.length + 1, e = [S(Pa(b.thisProgram), 'i8', 0)];
    c();
    for (var f = 0; f < d - 1; f += 1)
        e.push(S(Pa(a[f]), 'i8', 0)), c();
    e.push(0);
    e = S(e, 'i32', 0);
    try {
        var h = b._main(d, e, 0);
        jb(h, !0);
    } catch (l) {
        l instanceof A || ('SimulateInfiniteLoop' == l ? b.noExitRuntime = !0 : ((a = l) && 'object' === typeof l && l.stack && (a = [
            l,
            l.stack
        ]), b.d('exception thrown: ' + a), b.quit(1, l)));
    } finally {
    }
};
function ib(a) {
    function c() {
        if (!b.calledRun && (b.calledRun = !0, !J)) {
            Na || (Na = !0, V(Ja));
            V(Ka);
            if (b.onRuntimeInitialized)
                b.onRuntimeInitialized();
            b._main && kb && b.callMain(a);
            if (b.postRun)
                for ('function' == typeof b.postRun && (b.postRun = [b.postRun]); b.postRun.length;) {
                    var c = b.postRun.shift();
                    Ma.unshift(c);
                }
            V(Ma);
        }
    }
    a = a || b.arguments;
    null === gb && (gb = Date.now());
    if (!(0 < W)) {
        if (b.preRun)
            for ('function' == typeof b.preRun && (b.preRun = [b.preRun]); b.preRun.length;)
                Oa();
        V(Ia);
        0 < W || b.calledRun || (b.setStatus ? (b.setStatus('Running...'), setTimeout(function () {
            setTimeout(function () {
                b.setStatus('');
            }, 1);
            c();
        }, 1)) : c());
    }
}
b.run = b.run = ib;
function jb(a, c) {
    if (!c || !b.noExitRuntime) {
        if (!b.noExitRuntime && (J = !0, C = void 0, V(La), b.onExit))
            b.onExit(a);
        y && process.exit(a);
        b.quit(a, new A(a));
    }
}
b.exit = b.exit = jb;
var lb = [];
function K(a) {
    void 0 !== a ? (b.print(a), b.d(a), a = JSON.stringify(a)) : a = '';
    J = !0;
    var c = 'abort(' + a + ') at ' + sa() + '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';
    lb && lb.forEach(function (d) {
        c = d(c, a);
    });
    throw c;
}
b.abort = b.abort = K;
if (b.preInit)
    for ('function' == typeof b.preInit && (b.preInit = [b.preInit]); 0 < b.preInit.length;)
        b.preInit.pop()();
var kb = !0;
b.noInitialRun && (kb = !1);
b.noExitRuntime = !0;
ib();
'use strict';

function applyArabicShaping(input) {
    if (!input)
        { return input; }

    var nDataBytes = (input.length + 1) * 2;
    var stringInputPtr = Module._malloc(nDataBytes);
    Module.stringToUTF16(input, stringInputPtr, nDataBytes);
    var returnStringPtr = Module.ccall('ushape_arabic', 'number', ['number', 'number'], [stringInputPtr, input.length]);
    Module._free(stringInputPtr);

    if (returnStringPtr === 0)
        { return input; }

    var result = Module.UTF16ToString(returnStringPtr);
    Module._free(returnStringPtr);

    return result;
}

function mergeParagraphLineBreakPoints(lineBreakPoints, paragraphCount) {
    var mergedParagraphLineBreakPoints = [];

    for (var i = 0; i < paragraphCount; i++) {
        var paragraphEndIndex = Module.ccall('bidi_getParagraphEndIndex', 'number', ['number'], [i]);
        // TODO: Handle error?

        for (var i$1 = 0, list = lineBreakPoints; i$1 < list.length; i$1 += 1) {
            var lineBreakPoint = list[i$1];

            if (lineBreakPoint < paragraphEndIndex &&
                (!mergedParagraphLineBreakPoints[mergedParagraphLineBreakPoints.length - 1] || lineBreakPoint > mergedParagraphLineBreakPoints[mergedParagraphLineBreakPoints.length - 1]))
                { mergedParagraphLineBreakPoints.push(lineBreakPoint); }
        }
        mergedParagraphLineBreakPoints.push(paragraphEndIndex);
    }

    for (var i$2 = 0, list$1 = lineBreakPoints; i$2 < list$1.length; i$2 += 1) {
        var lineBreakPoint$1 = list$1[i$2];

        if (lineBreakPoint$1 > mergedParagraphLineBreakPoints[mergedParagraphLineBreakPoints.length - 1])
            { mergedParagraphLineBreakPoints.push(lineBreakPoint$1); }
    }

    return mergedParagraphLineBreakPoints;
}

function processBidirectionalText(input, lineBreakPoints) {
    if (!input) {
        return [input];
    }

    var nDataBytes = (input.length + 1) * 2;
    var stringInputPtr = Module._malloc(nDataBytes);
    Module.stringToUTF16(input, stringInputPtr, nDataBytes);
    var paragraphCount = Module.ccall('bidi_processText', 'number', ['number', 'number'], [stringInputPtr, input.length]);

    if (paragraphCount === 0) {
        Module._free(stringInputPtr);
        return [input]; // TODO: throw exception?
    }

    var mergedParagraphLineBreakPoints = mergeParagraphLineBreakPoints(lineBreakPoints, paragraphCount);

    var startIndex = 0;
    var lines = [];

    for (var i = 0, list = mergedParagraphLineBreakPoints; i < list.length; i += 1) {
        var lineBreakPoint = list[i];

        var returnStringPtr = Module.ccall('bidi_getLine', 'number', ['number', 'number'], [startIndex, lineBreakPoint]);

        if (returnStringPtr === 0) {
            Module._free(stringInputPtr);
            return []; // TODO: throw exception?
        }

        lines.push(Module.UTF16ToString(returnStringPtr));
        Module._free(returnStringPtr);

        startIndex = lineBreakPoint;
    }

    Module._free(stringInputPtr); // Input string must live until getLine calls are finished

    return lines;
}

self.registerRTLTextPlugin({'applyArabicShaping': applyArabicShaping, 'processBidirectionalText': processBidirectionalText});
})();
