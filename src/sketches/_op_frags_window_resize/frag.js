let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

uniform float mouseX;

void main() {
  gl_FragColor = vec4(mouseX, 1.0, 1.0, 1.0);
}`;