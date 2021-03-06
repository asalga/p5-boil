let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform float time;

void main() {
  gl_FragColor = vec4( abs(sin(time)), 0.66, 0.99, 1.0);
}`;
