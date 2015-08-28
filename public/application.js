/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Game = __webpack_require__(1);

	mat4 = __webpack_require__(12);

	game = new Game({canvas: "game-canvas", debug: true});
	game.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	Game = (function() {
	  var initGL = function(canvasElementId){
	    var canvas = document.getElementById(canvasElementId);
	    try {
	      gl = canvas.getContext("experimental-webgl");
	      gl.viewportWidth = canvas.width;
	      gl.viewportHeight = canvas.height;
	    } catch (e) {
	      alert("Could not initialise WebGL, sorry :-(");
	    }
	  }

	  return obj = function(params){
	    var canvasID = params.canvas;
	    var doDebug = params.debug;
	    var gameLogic = params.gameLogic;
	    var models = [];
	    this.loadProgram = __webpack_require__(2);
	    this.loadModel = __webpack_require__(7);

	    this.debug = function(msg){
	      if (doDebug) {
	        console.log(msg);
	      }
	    }

	    this.start = function() {
	      initGL(canvasID);
	      this.initGameLogic();

	      this.debug('starting game');
	      this.lastFrameTime = this.time();
	      this.lost = false;
	      this.gameLoop();
	    }

	    this.time = function(){
	      return (new Date()).getTime() / 1000;
	    }

	    this.score = function() {
	      return Math.round(this.level.totalElapsedTime / 10) * 10;
	    }

	    this.initGameLogic = function() {
	      this.level = __webpack_require__(8);
	      models.push(this.level);

	      this.bird = __webpack_require__(11);
	      models.push(this.bird);

	      for (id in models) {
	        models[id].setup(this);
	      }
	    }

	    this.lose = function () {
	      this.lost = true;
	      // var audio = new Audio('lose.wav');
	      // audio.play();
	    }

	    this.restart = function(){
	      this.lost = false;
	      this.lastFrameTime = this.time();
	      this.gameLoop();
	      this.level.setup(this);
	    }
	    
	    this.clearScreen = function () {
	      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	      gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    }

	    this.gameLoop = function loop(){
	      document.getElementById("score").innerHTML = this.score();
	      this.dt = this.time() -  this.lastFrameTime;

	      this.clearScreen();

	      for (id in models) {
	        models[id].draw(this);
	      }

	      if (this.lost == false){
	        window.requestAnimationFrame(loop.bind(this));
	      }
	      this.lastFrameTime = this.time();
	    }

	  };

	  return obj;

	})();

	module.exports = Game;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	function getShader(gl, id) {
	  var shaderScript = __webpack_require__(3)("./"  + id);

	  var shader;
	  if (id.slice(-4) == "frag") {
	    shader = gl.createShader(gl.FRAGMENT_SHADER);
	  } else if (id.slice(-4) == "vert") {
	    shader = gl.createShader(gl.VERTEX_SHADER);
	  } else {
	    return null;
	  }

	  gl.shaderSource(shader, shaderScript);
	  gl.compileShader(shader);

	  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	    alert(gl.getShaderInfoLog(shader));
	    return null;
	  }

	  return shader;
	}

	function loadShader(name) {
	  var fragmentShader = getShader(gl, name + ".frag");
	  var vertexShader = getShader(gl, name + ".vert");

	  shaderProgram = gl.createProgram();
	  gl.attachShader(shaderProgram, vertexShader);
	  gl.attachShader(shaderProgram, fragmentShader);
	  gl.linkProgram(shaderProgram);

	  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	    alert("Could not initialise shaders");
	  }
	  return shaderProgram;
	}

	module.exports = loadShader;



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bird.frag": 4,
		"./bird.glsl": 5,
		"./bird.vert": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "void main(void) {\n  gl_FragColor = vec4(1,1,1,1);\n}\n"

/***/ },
/* 5 */
/***/ function(module, exports) {

	

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "attribute vec3 aVertexPosition;\nuniform mat4 modelMatrix;\n\nvoid main(void) {\n  gl_Position = modelMatrix * vec4(aVertexPosition, 1);\n}\n"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	Pipe = __webpack_require__(9);
	Random = new (__webpack_require__(10).Random);

	var level = {
	  draw: function(game){
	    this.handleLevelLogic()
	    for (id in this.pipes) {
	      this.pipes[id].draw(game)
	    }
	  },

	  handleLevelLogic: function() {
	    this.totalElapsedTime += game.dt;
	    this.elapsedTime += game.dt;

	    if (this.pipes.length > 0 && this.pipes[0].position < -6) {
	      this.pipes.shift()
	    }

	    for (id in this.pipes) {
	      if (this.pipes[id].position < -2.05 && this.pipes[id].position > -3.0){
	        if (this.game.bird.position[1] < this.pipes[id].holeHeight ||
	            this.game.bird.position[1] + 1 > this.pipes[id].holeHeight + this.pipes[id].holeSize){
	          this.game.lose();
	        }
	      }
	    }

	    if (this.elapsedTime > (6/ -this.speed())) {
	      var pipe = new Pipe();
	      pipe.setup({
	        game: game,
	        holeHeight: Random.gauss(5 - (3 / 2), 5 / 3),
	        holeSize: 3.0,
	        level: this,
	        xPos: 5
	      });
	      this.pipes.push(pipe);
	      this.elapsedTime = 0;
	    }
	  },

	  speed: function() {
	    return -1 - this.totalElapsedTime / 10;
	  },

	  setup: function(game){
	    this.game = game;
	    this.elapsedTime = 0;
	    this.totalElapsedTime = 0;
	    this.pipes = [];
	  }
	}

	module.exports = level;



/***/ },
/* 9 */
/***/ function(module, exports) {

	Pipe = (function() {

	  var obj =  function(params){
	    this.draw = function(game){
	      var posChange = this.level.speed() * game.dt;
	      this.position += posChange;
	      mat4.translate(this.modelMatrix, [posChange, 0, 0]);
	      
	      mat4.translate(this.modelMatrix, [0, -10 + this.holeHeight, 0]);
	      this.pipe(game);
	      mat4.translate(this.modelMatrix, [0, this.holeSize + 10, 0]);
	      this.pipe(game);
	      
	      mat4.translate(this.modelMatrix, [0, -this.holeHeight - this.holeSize , 0]);
	    }

	    this.pipe = function(game){
	      gl.useProgram(program);

	      gl.uniformMatrix4fv(program.modelMatrixUniform, false, this.modelMatrix);

	      gl.enableVertexAttribArray(program.vertexPositionAttribute);
	      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	      gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertexBuffer.numItems);

	    }

	    this.setup = function(params){
	      var game = params.game;
	      this.holeHeight = (-5 + params.holeHeight);
	      this.holeSize = params.holeSize;
	      this.level = params.level;
	      var program = game.loadProgram("bird");
	      program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
	      program.modelMatrixUniform = gl.getUniformLocation(program, "modelMatrix");
	      gl.useProgram(program);

	      this.vertexBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

	      this.vertices = [
	        0.0, 0.0, 0.0,
	        0.0, 10.0, 0.0,
	        0.2, 0.0, 0.0,
	        0.2, 10.0, 0.0
	      ];

	      this.modelMatrix = mat4.create();
	      mat4.identity(this.modelMatrix);
	      mat4.scale(this.modelMatrix, [0.2, 0.2, 0.0]);
	      this.position = params.xPos;
	      mat4.translate(this.modelMatrix, [ 0.5 + this.position, 0.0, 0]);

	      gl.uniformMatrix4fv(program.modelMatrixUniform, false, this.modelMatrix);
	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	      this.vertexBuffer.itemSize = 3;
	      this.vertexBuffer.numItems = 4;
	    }
	  }
	  return obj;
	})();

	module.exports = Pipe;


/***/ },
/* 10 */
/***/ function(module, exports) {

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


/***/ },
/* 11 */
/***/ function(module, exports) {

	addEventListener("keypress", function(event){
	  if (event.keyCode === 32) {
	    obj.onSpace();
	  };
	  if (event.keyCode === 114) {
	    obj.reset();
	  };
	});


	var obj = {
	  position: [-2.5,0,0],
	  speed: [0,0,0],
	  onSpace: function() {
	    this.speed = [0,5.0,0]
	    //var audio = new Audio('jump.wav');
	    //audio.play();
	  },
	  reset: function() {
	    this.position = [-2.5,0,0];
	    this.speed = [0,0,0];
	    this.game.restart();
	  },
	  draw: function draw(game){
	    gl.useProgram(program);
	    this.game = game;

	    //mat4.translate(this.modelMatrix, [0.0, -0.01, 0]);
	    this.speed[1] -= 9.8 * game.dt;
	    this.position[1] += this.speed[1] * game.dt;
	    mat4.identity(this.modelMatrix);
	    mat4.scale(this.modelMatrix, [0.2, 0.2, 0.0]);
	    mat4.translate(this.modelMatrix, this.position);
	    mat4.translate(this.modelMatrix, [0.5, 0.5, 0.0]);
	    mat4.rotate(this.modelMatrix, this.speed[1] / 30, [0, 0, 1]);
	    mat4.translate(this.modelMatrix, [-0.5, -0.5, 0.0]);
	    
	    if (this.position[1] < -5.0) {
	      game.lose();
	    }

	    if (this.position[1] > 4.0) {
	      game.lose();
	    }

	    gl.uniformMatrix4fv(program.modelMatrixUniform, false, this.modelMatrix);

	    gl.enableVertexAttribArray(program.vertexPositionAttribute);
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexBuffer.numItems);
	  },

	  setup: function setup(game){
	    program = game.loadProgram("bird");
	    program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
	    program.modelMatrixUniform = gl.getUniformLocation(program, "modelMatrix");
	    gl.useProgram(program);

	    vertexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	    var vertices = [
	      0.0, 0.0, 0.0,
	      0.0, 1.0, 0.0,
	      1.0, 0.0, 0.0,
	      1.0, 1.0, 0.0
	    ];

	    this.modelMatrix = mat4.create();
	    mat4.identity(this.modelMatrix);
	    mat4.scale(this.modelMatrix, [0.2, 0.2, 0.0]);
	    mat4.translate(this.modelMatrix, [-0.5, 1.3, 0]);

	    gl.uniformMatrix4fv(program.modelMatrixUniform, false, this.modelMatrix);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	    vertexBuffer.itemSize = 3;
	    vertexBuffer.numItems = 4;
	  }
	}

	module.exports = obj;


/***/ },
/* 12 */
/***/ function(module, exports) {

	// glMatrix v0.9.5
	glMatrixArrayType=typeof Float32Array!="undefined"?Float32Array:typeof WebGLFloatArray!="undefined"?WebGLFloatArray:Array;var vec3={};vec3.create=function(a){var b=new glMatrixArrayType(3);if(a){b[0]=a[0];b[1]=a[1];b[2]=a[2]}return b};vec3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];return b};vec3.add=function(a,b,c){if(!c||a==c){a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];return a}c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];return c};
	vec3.subtract=function(a,b,c){if(!c||a==c){a[0]-=b[0];a[1]-=b[1];a[2]-=b[2];return a}c[0]=a[0]-b[0];c[1]=a[1]-b[1];c[2]=a[2]-b[2];return c};vec3.negate=function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];return b};vec3.scale=function(a,b,c){if(!c||a==c){a[0]*=b;a[1]*=b;a[2]*=b;return a}c[0]=a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;return c};
	vec3.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=Math.sqrt(c*c+d*d+e*e);if(g){if(g==1){b[0]=c;b[1]=d;b[2]=e;return b}}else{b[0]=0;b[1]=0;b[2]=0;return b}g=1/g;b[0]=c*g;b[1]=d*g;b[2]=e*g;return b};vec3.cross=function(a,b,c){c||(c=a);var d=a[0],e=a[1];a=a[2];var g=b[0],f=b[1];b=b[2];c[0]=e*b-a*f;c[1]=a*g-d*b;c[2]=d*f-e*g;return c};vec3.length=function(a){var b=a[0],c=a[1];a=a[2];return Math.sqrt(b*b+c*c+a*a)};vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};
	vec3.direction=function(a,b,c){c||(c=a);var d=a[0]-b[0],e=a[1]-b[1];a=a[2]-b[2];b=Math.sqrt(d*d+e*e+a*a);if(!b){c[0]=0;c[1]=0;c[2]=0;return c}b=1/b;c[0]=d*b;c[1]=e*b;c[2]=a*b;return c};vec3.lerp=function(a,b,c,d){d||(d=a);d[0]=a[0]+c*(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);d[2]=a[2]+c*(b[2]-a[2]);return d};vec3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+"]"};var mat3={};
	mat3.create=function(a){var b=new glMatrixArrayType(9);if(a){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9]}return b};mat3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return b};mat3.identity=function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a};
	mat3.transpose=function(a,b){if(!b||a==b){var c=a[1],d=a[2],e=a[5];a[1]=a[3];a[2]=a[6];a[3]=c;a[5]=a[7];a[6]=d;a[7]=e;return a}b[0]=a[0];b[1]=a[3];b[2]=a[6];b[3]=a[1];b[4]=a[4];b[5]=a[7];b[6]=a[2];b[7]=a[5];b[8]=a[8];return b};mat3.toMat4=function(a,b){b||(b=mat4.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=0;b[4]=a[3];b[5]=a[4];b[6]=a[5];b[7]=0;b[8]=a[6];b[9]=a[7];b[10]=a[8];b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
	mat3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+"]"};var mat4={};mat4.create=function(a){var b=new glMatrixArrayType(16);if(a){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15]}return b};
	mat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b};mat4.identity=function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};
	mat4.transpose=function(a,b){if(!b||a==b){var c=a[1],d=a[2],e=a[3],g=a[6],f=a[7],h=a[11];a[1]=a[4];a[2]=a[8];a[3]=a[12];a[4]=c;a[6]=a[9];a[7]=a[13];a[8]=d;a[9]=g;a[11]=a[14];a[12]=e;a[13]=f;a[14]=h;return a}b[0]=a[0];b[1]=a[4];b[2]=a[8];b[3]=a[12];b[4]=a[1];b[5]=a[5];b[6]=a[9];b[7]=a[13];b[8]=a[2];b[9]=a[6];b[10]=a[10];b[11]=a[14];b[12]=a[3];b[13]=a[7];b[14]=a[11];b[15]=a[15];return b};
	mat4.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],g=a[4],f=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],o=a[11],m=a[12],n=a[13],p=a[14];a=a[15];return m*k*h*e-j*n*h*e-m*f*l*e+g*n*l*e+j*f*p*e-g*k*p*e-m*k*d*i+j*n*d*i+m*c*l*i-b*n*l*i-j*c*p*i+b*k*p*i+m*f*d*o-g*n*d*o-m*c*h*o+b*n*h*o+g*c*p*o-b*f*p*o-j*f*d*a+g*k*d*a+j*c*h*a-b*k*h*a-g*c*l*a+b*f*l*a};
	mat4.inverse=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],o=a[10],m=a[11],n=a[12],p=a[13],r=a[14],s=a[15],A=c*h-d*f,B=c*i-e*f,t=c*j-g*f,u=d*i-e*h,v=d*j-g*h,w=e*j-g*i,x=k*p-l*n,y=k*r-o*n,z=k*s-m*n,C=l*r-o*p,D=l*s-m*p,E=o*s-m*r,q=1/(A*E-B*D+t*C+u*z-v*y+w*x);b[0]=(h*E-i*D+j*C)*q;b[1]=(-d*E+e*D-g*C)*q;b[2]=(p*w-r*v+s*u)*q;b[3]=(-l*w+o*v-m*u)*q;b[4]=(-f*E+i*z-j*y)*q;b[5]=(c*E-e*z+g*y)*q;b[6]=(-n*w+r*t-s*B)*q;b[7]=(k*w-o*t+m*B)*q;b[8]=(f*D-h*z+j*x)*q;
	b[9]=(-c*D+d*z-g*x)*q;b[10]=(n*v-p*t+s*A)*q;b[11]=(-k*v+l*t-m*A)*q;b[12]=(-f*C+h*y-i*x)*q;b[13]=(c*C-d*y+e*x)*q;b[14]=(-n*u+p*B-r*A)*q;b[15]=(k*u-l*B+o*A)*q;return b};mat4.toRotationMat=function(a,b){b||(b=mat4.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
	mat4.toMat3=function(a,b){b||(b=mat3.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[4];b[4]=a[5];b[5]=a[6];b[6]=a[8];b[7]=a[9];b[8]=a[10];return b};mat4.toInverseMat3=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[4],f=a[5],h=a[6],i=a[8],j=a[9],k=a[10],l=k*f-h*j,o=-k*g+h*i,m=j*g-f*i,n=c*l+d*o+e*m;if(!n)return null;n=1/n;b||(b=mat3.create());b[0]=l*n;b[1]=(-k*d+e*j)*n;b[2]=(h*d-e*f)*n;b[3]=o*n;b[4]=(k*c-e*i)*n;b[5]=(-h*c+e*g)*n;b[6]=m*n;b[7]=(-j*c+d*i)*n;b[8]=(f*c-d*g)*n;return b};
	mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],o=a[9],m=a[10],n=a[11],p=a[12],r=a[13],s=a[14];a=a[15];var A=b[0],B=b[1],t=b[2],u=b[3],v=b[4],w=b[5],x=b[6],y=b[7],z=b[8],C=b[9],D=b[10],E=b[11],q=b[12],F=b[13],G=b[14];b=b[15];c[0]=A*d+B*h+t*l+u*p;c[1]=A*e+B*i+t*o+u*r;c[2]=A*g+B*j+t*m+u*s;c[3]=A*f+B*k+t*n+u*a;c[4]=v*d+w*h+x*l+y*p;c[5]=v*e+w*i+x*o+y*r;c[6]=v*g+w*j+x*m+y*s;c[7]=v*f+w*k+x*n+y*a;c[8]=z*d+C*h+D*l+E*p;c[9]=z*e+C*i+D*o+E*r;c[10]=z*
	g+C*j+D*m+E*s;c[11]=z*f+C*k+D*n+E*a;c[12]=q*d+F*h+G*l+b*p;c[13]=q*e+F*i+G*o+b*r;c[14]=q*g+F*j+G*m+b*s;c[15]=q*f+F*k+G*n+b*a;return c};mat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1];b=b[2];c[0]=a[0]*d+a[4]*e+a[8]*b+a[12];c[1]=a[1]*d+a[5]*e+a[9]*b+a[13];c[2]=a[2]*d+a[6]*e+a[10]*b+a[14];return c};
	mat4.multiplyVec4=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2];b=b[3];c[0]=a[0]*d+a[4]*e+a[8]*g+a[12]*b;c[1]=a[1]*d+a[5]*e+a[9]*g+a[13]*b;c[2]=a[2]*d+a[6]*e+a[10]*g+a[14]*b;c[3]=a[3]*d+a[7]*e+a[11]*g+a[15]*b;return c};
	mat4.translate=function(a,b,c){var d=b[0],e=b[1];b=b[2];if(!c||a==c){a[12]=a[0]*d+a[4]*e+a[8]*b+a[12];a[13]=a[1]*d+a[5]*e+a[9]*b+a[13];a[14]=a[2]*d+a[6]*e+a[10]*b+a[14];a[15]=a[3]*d+a[7]*e+a[11]*b+a[15];return a}var g=a[0],f=a[1],h=a[2],i=a[3],j=a[4],k=a[5],l=a[6],o=a[7],m=a[8],n=a[9],p=a[10],r=a[11];c[0]=g;c[1]=f;c[2]=h;c[3]=i;c[4]=j;c[5]=k;c[6]=l;c[7]=o;c[8]=m;c[9]=n;c[10]=p;c[11]=r;c[12]=g*d+j*e+m*b+a[12];c[13]=f*d+k*e+n*b+a[13];c[14]=h*d+l*e+p*b+a[14];c[15]=i*d+o*e+r*b+a[15];return c};
	mat4.scale=function(a,b,c){var d=b[0],e=b[1];b=b[2];if(!c||a==c){a[0]*=d;a[1]*=d;a[2]*=d;a[3]*=d;a[4]*=e;a[5]*=e;a[6]*=e;a[7]*=e;a[8]*=b;a[9]*=b;a[10]*=b;a[11]*=b;return a}c[0]=a[0]*d;c[1]=a[1]*d;c[2]=a[2]*d;c[3]=a[3]*d;c[4]=a[4]*e;c[5]=a[5]*e;c[6]=a[6]*e;c[7]=a[7]*e;c[8]=a[8]*b;c[9]=a[9]*b;c[10]=a[10]*b;c[11]=a[11]*b;c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15];return c};
	mat4.rotate=function(a,b,c,d){var e=c[0],g=c[1];c=c[2];var f=Math.sqrt(e*e+g*g+c*c);if(!f)return null;if(f!=1){f=1/f;e*=f;g*=f;c*=f}var h=Math.sin(b),i=Math.cos(b),j=1-i;b=a[0];f=a[1];var k=a[2],l=a[3],o=a[4],m=a[5],n=a[6],p=a[7],r=a[8],s=a[9],A=a[10],B=a[11],t=e*e*j+i,u=g*e*j+c*h,v=c*e*j-g*h,w=e*g*j-c*h,x=g*g*j+i,y=c*g*j+e*h,z=e*c*j+g*h;e=g*c*j-e*h;g=c*c*j+i;if(d){if(a!=d){d[12]=a[12];d[13]=a[13];d[14]=a[14];d[15]=a[15]}}else d=a;d[0]=b*t+o*u+r*v;d[1]=f*t+m*u+s*v;d[2]=k*t+n*u+A*v;d[3]=l*t+p*u+B*
	v;d[4]=b*w+o*x+r*y;d[5]=f*w+m*x+s*y;d[6]=k*w+n*x+A*y;d[7]=l*w+p*x+B*y;d[8]=b*z+o*e+r*g;d[9]=f*z+m*e+s*g;d[10]=k*z+n*e+A*g;d[11]=l*z+p*e+B*g;return d};mat4.rotateX=function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[4],g=a[5],f=a[6],h=a[7],i=a[8],j=a[9],k=a[10],l=a[11];if(c){if(a!=c){c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=a[3];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[4]=e*b+i*d;c[5]=g*b+j*d;c[6]=f*b+k*d;c[7]=h*b+l*d;c[8]=e*-d+i*b;c[9]=g*-d+j*b;c[10]=f*-d+k*b;c[11]=h*-d+l*b;return c};
	mat4.rotateY=function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[0],g=a[1],f=a[2],h=a[3],i=a[8],j=a[9],k=a[10],l=a[11];if(c){if(a!=c){c[4]=a[4];c[5]=a[5];c[6]=a[6];c[7]=a[7];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[0]=e*b+i*-d;c[1]=g*b+j*-d;c[2]=f*b+k*-d;c[3]=h*b+l*-d;c[8]=e*d+i*b;c[9]=g*d+j*b;c[10]=f*d+k*b;c[11]=h*d+l*b;return c};
	mat4.rotateZ=function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[0],g=a[1],f=a[2],h=a[3],i=a[4],j=a[5],k=a[6],l=a[7];if(c){if(a!=c){c[8]=a[8];c[9]=a[9];c[10]=a[10];c[11]=a[11];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[0]=e*b+i*d;c[1]=g*b+j*d;c[2]=f*b+k*d;c[3]=h*b+l*d;c[4]=e*-d+i*b;c[5]=g*-d+j*b;c[6]=f*-d+k*b;c[7]=h*-d+l*b;return c};
	mat4.frustum=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=e*2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=e*2/i;f[6]=0;f[7]=0;f[8]=(b+a)/h;f[9]=(d+c)/i;f[10]=-(g+e)/j;f[11]=-1;f[12]=0;f[13]=0;f[14]=-(g*e*2)/j;f[15]=0;return f};mat4.perspective=function(a,b,c,d,e){a=c*Math.tan(a*Math.PI/360);b=a*b;return mat4.frustum(-b,b,-a,a,c,d,e)};
	mat4.ortho=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2/i;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=-2/j;f[11]=0;f[12]=-(a+b)/h;f[13]=-(d+c)/i;f[14]=-(g+e)/j;f[15]=1;return f};
	mat4.lookAt=function(a,b,c,d){d||(d=mat4.create());var e=a[0],g=a[1];a=a[2];var f=c[0],h=c[1],i=c[2];c=b[1];var j=b[2];if(e==b[0]&&g==c&&a==j)return mat4.identity(d);var k,l,o,m;c=e-b[0];j=g-b[1];b=a-b[2];m=1/Math.sqrt(c*c+j*j+b*b);c*=m;j*=m;b*=m;k=h*b-i*j;i=i*c-f*b;f=f*j-h*c;if(m=Math.sqrt(k*k+i*i+f*f)){m=1/m;k*=m;i*=m;f*=m}else f=i=k=0;h=j*f-b*i;l=b*k-c*f;o=c*i-j*k;if(m=Math.sqrt(h*h+l*l+o*o)){m=1/m;h*=m;l*=m;o*=m}else o=l=h=0;d[0]=k;d[1]=h;d[2]=c;d[3]=0;d[4]=i;d[5]=l;d[6]=j;d[7]=0;d[8]=f;d[9]=
	o;d[10]=b;d[11]=0;d[12]=-(k*e+i*g+f*a);d[13]=-(h*e+l*g+o*a);d[14]=-(c*e+j*g+b*a);d[15]=1;return d};mat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+"]"};quat4={};quat4.create=function(a){var b=new glMatrixArrayType(4);if(a){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3]}return b};quat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b};
	quat4.calculateW=function(a,b){var c=a[0],d=a[1],e=a[2];if(!b||a==b){a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e));return a}b[0]=c;b[1]=d;b[2]=e;b[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e));return b};quat4.inverse=function(a,b){if(!b||a==b){a[0]*=1;a[1]*=1;a[2]*=1;return a}b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=a[3];return b};quat4.length=function(a){var b=a[0],c=a[1],d=a[2];a=a[3];return Math.sqrt(b*b+c*c+d*d+a*a)};
	quat4.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=Math.sqrt(c*c+d*d+e*e+g*g);if(f==0){b[0]=0;b[1]=0;b[2]=0;b[3]=0;return b}f=1/f;b[0]=c*f;b[1]=d*f;b[2]=e*f;b[3]=g*f;return b};quat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2];a=a[3];var f=b[0],h=b[1],i=b[2];b=b[3];c[0]=d*b+a*f+e*i-g*h;c[1]=e*b+a*h+g*f-d*i;c[2]=g*b+a*i+d*h-e*f;c[3]=a*b-d*f-e*h-g*i;return c};
	quat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2];b=a[0];var f=a[1],h=a[2];a=a[3];var i=a*d+f*g-h*e,j=a*e+h*d-b*g,k=a*g+b*e-f*d;d=-b*d-f*e-h*g;c[0]=i*a+d*-b+j*-h-k*-f;c[1]=j*a+d*-f+k*-b-i*-h;c[2]=k*a+d*-h+i*-f-j*-b;return c};quat4.toMat3=function(a,b){b||(b=mat3.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h;c=c*i;var l=d*h;d=d*i;e=e*i;f=g*f;h=g*h;g=g*i;b[0]=1-(l+e);b[1]=k-g;b[2]=c+h;b[3]=k+g;b[4]=1-(j+e);b[5]=d-f;b[6]=c-h;b[7]=d+f;b[8]=1-(j+l);return b};
	quat4.toMat4=function(a,b){b||(b=mat4.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h;c=c*i;var l=d*h;d=d*i;e=e*i;f=g*f;h=g*h;g=g*i;b[0]=1-(l+e);b[1]=k-g;b[2]=c+h;b[3]=0;b[4]=k+g;b[5]=1-(j+e);b[6]=d-f;b[7]=0;b[8]=c-h;b[9]=d+f;b[10]=1-(j+l);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};quat4.slerp=function(a,b,c,d){d||(d=a);var e=c;if(a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]<0)e=-1*c;d[0]=1-c*a[0]+e*b[0];d[1]=1-c*a[1]+e*b[1];d[2]=1-c*a[2]+e*b[2];d[3]=1-c*a[3]+e*b[3];return d};
	quat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"};

	module.exports = mat4;


/***/ }
/******/ ]);