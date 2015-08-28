
obj = {
  draw: function draw(game){
    gl.useProgram(program);

    gl.uniformMatrix4fv(program.modelMatrixUniform, false, modelMatrix);

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

    modelMatrix = mat4.create();
    mat4.identity(modelMatrix);
    mat4.scale(modelMatrix, [0.2, 0.2, 0.0]);
    mat4.translate(modelMatrix, [-0.5, 1.3, 0]);

    gl.uniformMatrix4fv(program.modelMatrixUniform, false, modelMatrix);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numItems = 4;
  }
}

module.exports = obj;
