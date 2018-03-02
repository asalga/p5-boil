let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform sampler2D texture0;

void main() {
  vec4 col = texture2D(texture0, gl_FragCoord.xy / vec2(640.0, 480.0));
  gl_FragColor = col;
}`;