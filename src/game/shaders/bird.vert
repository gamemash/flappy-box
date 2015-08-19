attribute vec3 aVertexPosition;
uniform mat4 modelMatrix;

void main(void) {
  gl_Position = modelMatrix * vec4(aVertexPosition, 1);
}
