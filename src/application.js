Game = require('./game');
flappybird = require("./flappybird");

game = new Game({canvas: "game-canvas", debug: true, gameLogic: flappybird});
game.start();
