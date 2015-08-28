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
    this.loadProgram = require("./game/shaders");
    this.loadModel = require("./game/models");

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
      this.level = require("./game/level");
      models.push(this.level);

      this.bird = require("./game/models/bird");
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

