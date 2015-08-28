/*
A fairly direct port of the Python `random` module to JavaScript
 */
var BaseRandom, BuiltinRandom, HighQualityRandom, LOG2E, NotImplementedError, POW_32, POW_NEG_32, Random, acos, bind, cos, exp, exports, extend, floor, lg, log, mod, pow, sqrt,
  slice = [].slice,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind1 = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

log = Math.log, sqrt = Math.sqrt, cos = Math.cos, acos = Math.acos, floor = Math.floor, pow = Math.pow, LOG2E = Math.LOG2E, exp = Math.exp;

POW_32 = pow(2, 32);

POW_NEG_32 = pow(2, -32);

lg = function(x) {
  return (LOG2E * log(x + 1e-10)) >> 0;
};

mod = function(x, y) {
  var jsmod;
  if (!((jsmod = x % y) && (x > 0 ^ y > 0))) {
    return jsmod;
  } else {
    return jsmod + y;
  }
};

extend = function() {
  var l, len, method, name, obj, sources, target;
  target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  for (l = 0, len = sources.length; l < len; l++) {
    obj = sources[l];
    for (name in obj) {
      method = obj[name];
      target[name] = method;
    }
  }
  return target;
};

bind = function(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
};

NotImplementedError = (function(superClass) {
  extend1(NotImplementedError, superClass);

  function NotImplementedError() {
    return NotImplementedError.__super__.constructor.apply(this, arguments);
  }

  return NotImplementedError;

})(Error);

BaseRandom = (function() {
  var E, LOG4, POW_NEG_26, POW_NEG_27, SG_MAGICCONST, TAU, _bits;

  BaseRandom.prototype._randint32 = function() {
    throw new NotImplementedError;
  };

  BaseRandom.prototype._getstate = function() {
    throw new NotImplementedError;
  };

  BaseRandom.prototype._setstate = function(state) {
    throw new NotImplementedError;
  };

  BaseRandom.prototype._seed = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    throw new NotImplementedError;
  };

  function BaseRandom() {
    this.weibullvariate = bind1(this.weibullvariate, this);
    this.paretovariate = bind1(this.paretovariate, this);
    this.betavariate = bind1(this.betavariate, this);
    this.gammavariate = bind1(this.gammavariate, this);
    this.vonmisesvariate = bind1(this.vonmisesvariate, this);
    this.expovariate = bind1(this.expovariate, this);
    this.lognormvariate = bind1(this.lognormvariate, this);
    this.triangular = bind1(this.triangular, this);
    this.gauss = bind1(this.gauss, this);
    this.shuffle = bind1(this.shuffle, this);
    this.sample = bind1(this.sample, this);
    this.choice = bind1(this.choice, this);
    this.randint = bind1(this.randint, this);
    this.randrange = bind1(this.randrange, this);
    this.uniform = bind1(this.uniform, this);
    this.getstate = bind1(this.getstate, this);
    this.setstate = bind1(this.setstate, this);
    this.random = bind1(this.random, this);
    this.seed = bind1(this.seed, this);
    this.normalvariate = bind(this.normalvariate, this);
    this._next_gauss = null;
    this.seed(+(new Date));
  }

  BaseRandom.prototype.seed = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this._seed.apply(this, args);
  };

  POW_NEG_26 = pow(2, -26);

  POW_NEG_27 = pow(2, -27);

  BaseRandom.prototype.random = function() {
    var high_bits, low_bits;
    low_bits = this._randint32() >>> 6;
    high_bits = this._randint32() >>> 5;
    return (high_bits + low_bits * POW_NEG_26) * POW_NEG_27;
  };

  BaseRandom.prototype.setstate = function(arg) {
    var state;
    this._next_gauss = arg[0], state = 2 <= arg.length ? slice.call(arg, 1) : [];
    return this._setstate(state);
  };

  BaseRandom.prototype.getstate = function() {
    return [this._next_gauss].concat(slice.call(this._getstate()));
  };

  _bits = {};

  BaseRandom.prototype._randbelow = function(n) {
    var bits, r;
    if (n <= 0x100000000) {
      bits = _bits[n] || (_bits[n] = (lg(n - 1)) + 1);
      while (true) {
        r = this._randint32() >>> (32 - bits);
        if (r < 0) {
          r += POW_32;
        }
        if (r < n) {
          break;
        }
      }
      return r;
    } else {
      return floor(this.random() * n);
    }
  };

  BaseRandom.prototype.uniform = function(a, b) {
    return a + this.random() * (b - a);
  };

  BaseRandom.prototype.randrange = function(start, stop, step) {
    if (stop == null) {
      return this._randbelow(start);
    } else if (!step) {
      return start + this._randbelow(stop - start);
    } else {
      return start + step * this._randbelow(floor((stop - start) / step));
    }
  };

  BaseRandom.prototype.randint = function(a, b) {
    return a + this._randbelow(1 + b - a);
  };

  BaseRandom.prototype.choice = function(seq) {
    return seq[this._randbelow(seq.length)];
  };

  BaseRandom.prototype.sample = function(population, k) {
    var i, j, l, m, n, pool, ref, ref1, ref2, ref3, results, results1, selected, val;
    if (k == null) {
      k = 1;
    }
    n = population.length;
    if (k > n) {
      throw new Error("can't take a sample bigger than the population");
    }
    if (k * 3 > n) {
      pool = slice.call(population);
      results = [];
      for (i = l = ref = n, ref1 = n - k; l > ref1; i = l += -1) {
        j = this._randbelow(i);
        val = pool[j];
        pool[j] = pool[i - 1];
        results.push(val);
      }
      return results;
    } else {
      selected = [];
      results1 = [];
      for (i = m = 0, ref2 = k; m < ref2; i = m += 1) {
        while (true) {
          if (ref3 = (j = this._randbelow(n)), indexOf.call(selected, ref3) < 0) {
            break;
          }
        }
        selected.push(j);
        results1.push(population[j]);
      }
      return results1;
    }
  };

  BaseRandom.prototype.shuffle = function(x) {
    var i, j, l, ref, tmp;
    for (i = l = ref = x.length - 1; l >= 1; i = l += -1) {
      j = this._randbelow(i + 1);
      tmp = x[i];
      x[i] = x[j];
      x[j] = tmp;
    }
    return x;
  };

  BaseRandom.prototype.gauss = function(mu, sigma) {
    var s, u, v, w, z;
    if (mu == null) {
      mu = 0;
    }
    if (sigma == null) {
      sigma = 1;
    }
    if ((z = this._next_gauss) != null) {
      this._next_gauss = null;
    } else {
      while (!(s && s < 1)) {
        u = 2 * this.random() - 1;
        v = 2 * this.random() - 1;
        s = u * u + v * v;
      }
      w = sqrt(-2 * (log(s)) / s);
      z = u * w;
      this._next_gauss = v * w;
    }
    return mu + z * sigma;
  };

  BaseRandom.prototype.normalvariate = BaseRandom.prototype.gauss;

  BaseRandom.prototype.triangular = function(low, high, mode) {
    var c, u;
    if (low == null) {
      high = 1;
      low = 0;
    } else if (high == null) {
      high = low;
      low = 0;
    }
    if (mode == null) {
      c = 0.5;
    } else {
      c = (mode - low) / (high - low);
    }
    u = this.random();
    if (u <= c) {
      return low + (high - low) * sqrt(u * c);
    } else {
      return high - (high - low) * sqrt((1 - u) * (1 - c));
    }
  };

  BaseRandom.prototype.lognormvariate = function(mu, sigma) {
    return exp(this.normalvariate(mu, sigma));
  };

  BaseRandom.prototype.expovariate = function(lambda) {
    return (-log(1 - this.random())) / lambda;
  };

  TAU = 2 * Math.PI;

  BaseRandom.prototype.vonmisesvariate = function(mu, kappa) {
    var a, b, c, f, r, rand, u1, u2, u3, z;
    rand = this.random;
    if (kappa <= 1e-6) {
      return TAU * rand();
    }
    a = 1 + sqrt(1 + 4 * kappa * kappa);
    b = (1 - sqrt(2)) * a / 2 / kappa;
    r = (1 + b * b) / 2 / b;
    while (true) {
      u1 = rand();
      z = cos(TAU * u1 / 2);
      f = (1 + r * z) / (r + z);
      c = kappa * (r - f);
      u2 = rand();
      if (u2 < c * (2 - c) || u2 <= c * exp(1 - c)) {
        break;
      }
    }
    u3 = rand();
    return (mod(mu, TAU)) + (u3 > 0.5 ? acos(f) : -acos(f));
  };

  LOG4 = log(4);

  SG_MAGICCONST = 1 + log(4.5);

  E = {
    Math: Math
  };

  BaseRandom.prototype.gammavariate = function(alpha, beta) {
    var ainv, b, bbb, ccc, p, r, rand, u, u1, u2, v, x, z;
    rand = this.random;
    if (alpha > 1) {
      ainv = sqrt(2 * alpha - 1);
      bbb = alpha - LOG4;
      ccc = alpha + ainv;
      while (true) {
        u1 = rand();
        if (!((1e-7 < u1 && u1 < 1 - 1e-7))) {
          continue;
        }
        u2 = 1 - rand();
        v = (log(u1 / (1 - u1))) / ainv;
        x = alpha * exp(v);
        z = u1 * u1 * u2;
        r = bbb + ccc * v - x;
        if (r + SG_MAGICCONST - 4.5 * z >= 0.0 || r >= log(z)) {
          break;
        }
      }
      return beta * x;
    } else if (alpha === 1) {
      while (true) {
        u = rand();
        if (u > 1e-7) {
          break;
        }
      }
      return -beta * log(u);
    } else {
      while (true) {
        u1 = rand();
        b = (E + alpha) / E;
        p = b * u1;
        u2 = rand();
        if (p > 1) {
          x = -log((b - p) / alpha);
          if (u2 <= pow(x, alpha - 1)) {
            break;
          }
        } else {
          x = pow(p, 1 / alpha);
          if (u2 <= exp(-x)) {
            break;
          }
        }
      }
      return beta * x;
    }
  };

  BaseRandom.prototype.betavariate = function(alpha, beta) {
    var y;
    y = this.gammavariate(alpha, 1);
    if (y === 0) {
      return 0;
    } else {
      return y / (y + this.gammavariate(beta, 1));
    }
  };

  BaseRandom.prototype.paretovariate = function(alpha) {
    var u;
    u = 1 - this.random();
    return 1 / (pow(u, 1 / alpha));
  };

  BaseRandom.prototype.weibullvariate = function(alpha, beta) {
    var u;
    u = 1 - this.random();
    return alpha * (pow(-log(u, 1 / beta)));
  };

  return BaseRandom;

})();

Random = (function(superClass) {
  extend1(Random, superClass);

  function Random() {
    return Random.__super__.constructor.apply(this, arguments);
  }

  Random.prototype._randint32 = function() {
    var z;
    this.x = 62904 * (this.x & 0xffff) + (this.x >>> 16);
    this.y = 41874 * (this.y & 0xffff) + (this.y >>> 16);
    z = (this.x << 16) + this.y;
    z ^= z >>> 13;
    z ^= z << 17;
    z ^= z >>> 5;
    return z;
  };

  Random.prototype._seed = function(j) {
    this.x = 3395989511 ^ j;
    return this.y = 1716319410 ^ j;
  };

  Random.prototype._getstate = function() {
    return [this.x, this.y];
  };

  Random.prototype._setstate = function(arg) {
    this.x = arg[0], this.y = arg[1];
  };

  return Random;

})(BaseRandom);

HighQualityRandom = (function(superClass) {
  extend1(HighQualityRandom, superClass);

  function HighQualityRandom() {
    return HighQualityRandom.__super__.constructor.apply(this, arguments);
  }

  HighQualityRandom.prototype._randint32 = function() {
    var v, x, y;
    x = this.u = this.u * 2891336453 + 1640531513;
    v = this.v;
    v ^= v >>> 13;
    v ^= v << 17;
    v ^= v >>> 5;
    this.v = v;
    y = this.w1 = 33378 * (this.w1 & 0xffff) + (this.w1 >>> 16);
    this.w2 = 57225 * (this.w2 & 0xffff) + (this.w2 >>> 16);
    x ^= x << 9;
    x ^= x >>> 17;
    x ^= x << 6;
    y ^= y << 17;
    y ^= y >>> 15;
    y ^= y << 5;
    return (x + v) ^ (y + this.w2);
  };

  HighQualityRandom.prototype._seed = function(j) {
    this.w1 = 521288629;
    this.w2 = 362436069;
    return this.v = this.u = j ^ 2244614371;
  };

  HighQualityRandom.prototype._getstate = function() {
    return [this.u, this.v, this.w1, this.w2];
  };

  HighQualityRandom.prototype._setstate = function(arg) {
    this.u = arg[0], this.v = arg[1], this.w1 = arg[2], this.w2 = arg[3];
  };

  return HighQualityRandom;

})(BaseRandom);

BuiltinRandom = (function(superClass) {
  var _lowbits, _rand;

  extend1(BuiltinRandom, superClass);

  function BuiltinRandom() {
    this._seed = bind1(this._seed, this);
    return BuiltinRandom.__super__.constructor.apply(this, arguments);
  }

  BuiltinRandom.prototype._seed = function(j) {};

  _rand = Math.random;

  _lowbits = function() {
    return (_rand() * pow(2, 64)) | 0;
  };

  if (_lowbits() | _lowbits() | _lowbits()) {
    ({
      random: _rand
    });
  } else {
    ({
      random: function() {
        return _rand() * POW_NEG_32 + _rand();
      }
    });
  }

  BuiltinRandom.prototype._randint32 = function() {
    return (_rand() * POW_32) | 0;
  };

  return BuiltinRandom;

})(BaseRandom);

exports = exports || window || this;

extend(exports, {
  NotImplementedError: NotImplementedError,
  BaseRandom: BaseRandom,
  Random: Random,
  HighQualityRandom: HighQualityRandom,
  BuiltinRandom: BuiltinRandom
});

// ---
// generated by coffee-script 1.9.2
