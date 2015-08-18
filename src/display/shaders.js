function getShader(gl, id) {
  var shaderScript = require("./shaders/"  + id );

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

