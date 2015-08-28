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
