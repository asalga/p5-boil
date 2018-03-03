let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform vec2 res;

void main() {
  gl_FragColor = vec4(step(0.5, gl_FragCoord.x/res.x));
}`;
