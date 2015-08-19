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
	flappybird = __webpack_require__(9);

	game = new Game({canvas: "game-canvas", debug: true, gameLogic: flappybird});
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
	      console.log(this);
	      this.initGameLogic();

	      this.debug('starting game');
	      this.gameLoop();
	    }

	    this.initGameLogic = function() {
	      models.push(__webpack_require__(8))

	      for (id in models) {
	        models[id].setup(this);
	      }
	    }

	    this.gameLoop = function loop(){
	      for (id in models) {
	        models[id].draw(this);
	      }
	      window.requestAnimationFrame(loop.bind(this));
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

	module.exports = "attribute vec3 aVertexPosition;\n\nvoid main(void) {\n  vec3 position = (aVertexPosition * 2.0) - 1.0;\n  gl_Position = vec4(position, 1);\n}\n"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {};


/***/ },
/* 8 */
/***/ function(module, exports) {

	obj = {
	  draw: function draw(game){
	    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    gl.clearColor(0.0, 0.0, 0.0, 1.0);

	    gl.useProgram(program);
	    gl.enableVertexAttribArray(program.vertexPositionAttribute);
	    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, triangleVertexPositionBuffer.numItems);

	    //game.debug("drawing in birds");
	  },

	  setup: function setup(game){
	    program = game.loadProgram("bird");
	    program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");

	    triangleVertexPositionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	    var vertices = [
	      0.1, 0.1, 0.0,
	      0.1, 0.9, 0.0,
	      0.9, 0.1, 0.0,
	      0.9, 0.9, 0.0
	    ];
	    //var vertices = [
	    //  0.0,  1.0,  0.0,
	    //  -1.0, -1.0,  0.0,
	    //  1.0, -1.0,  0.0
	    //    ];
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	    triangleVertexPositionBuffer.itemSize = 3;
	    triangleVertexPositionBuffer.numItems = 4;
	  }
	}

	module.exports = obj;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
	  
	}

	//  models: {
	//    { model: require('bird') }
	//  ]
	//};


/***/ }
/******/ ]);