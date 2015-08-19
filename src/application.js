Game = require('./game');

mat4 = require('./lib/glmatrix');

game = new Game({canvas: "game-canvas", debug: true});
game.start();
