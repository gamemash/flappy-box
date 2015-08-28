Pipe = require("./models/pipe");
Random = new (require("../lib/gaussian.js").Random);

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

