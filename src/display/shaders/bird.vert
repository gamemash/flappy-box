attribute vec3 aVertexPosition;

void main(void) {
  vec3 position = (aVertexPosition * 2.0) - 1.0;
  gl_Position = vec4(position, 1);
}
