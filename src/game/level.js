Pipe = require("./models/pipe");

var level = {
  draw: function(game){
    for (id in this.pipes) {
      this.pipes[id].draw(game)
    }
  },

  speed: function() {
    return -1
  },

  setup: function(game){
    this.pipes = [];
    for (i = 0; i < 10; i++) { 
      var pipe = new Pipe();
      pipe.setup({
        game: game,
        holeHeight: i,
        holeSize: 2.4,
        level: this,
        xPos: i
      });
      this.pipes.push(pipe);
    }
  }
}

module.exports = level;

