#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform vec2 res;

vec2 aspectRatio = vec2(res.x / res.y, 1.0);

float circle(vec2 p, float r){
	vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;

	return 1.0 - step(r, distance(uv * aspectRatio, p));
}

void main() {
  vec3 col = vec3(circle(vec2(0.0, 0.0), .5));
  gl_FragColor = vec4(col, 1.0);
}

