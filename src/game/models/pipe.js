Pipe = (function() {

  var obj =  function(params){
    this.draw = function(game){
      mat4.translate(this.modelMatrix, [this.level.speed() * game.dt, 0, 0]);
      
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
      mat4.translate(this.modelMatrix, [ 0.5 + params.xPos, 0.0, 0]);

      gl.uniformMatrix4fv(program.modelMatrixUniform, false, this.modelMatrix);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
      this.vertexBuffer.itemSize = 3;
      this.vertexBuffer.numItems = 4;
    }
  }
  return obj;
})();

module.exports = Pipe;
