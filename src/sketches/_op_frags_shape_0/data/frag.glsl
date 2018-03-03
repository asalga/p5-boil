#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform vec2 res;
uniform float aspect;

float circle(vec2 p, float r){
	vec2 st = (gl_FragCoord.xy / res);
	return 1.0 - step(r, distance(st, p));
}

void main() {
  vec3 col = vec3( circle(vec2(0.5), 0.25) );
  gl_FragColor = vec4(col, 1.0);
}