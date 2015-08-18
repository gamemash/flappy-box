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
    this.loadProgram = require("./display/shaders");

    this.debug = function(msg){
      if (doDebug) {
        console.log(msg);
      }
    }

    this.start = function() {
      initGL(canvasID);
      this.initGameLogic();

      this.debug('starting game');
      this.gameLoop();
    }

    this.initGameLogic = function() {
      models.push(require("./models/bird"))

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

