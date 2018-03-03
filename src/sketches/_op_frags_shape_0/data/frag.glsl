#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 res;

float circle(vec2 p, float r){
	vec2 aspectRatio = vec2(res.x / res.y, 1.0);
	vec2 uv = gl_FragCoord.xy / res * 2.0 - 1.0;
	return 1.0 - step(r, distance(uv * aspectRatio, p));
}

float ellipse(vec2 p, vec2 r){
	return 0.0;
}

void main() {
  vec3 col = vec3( circle(vec2(0.0), 1.0) );
  // vec3 col = vec3( ellipse(vec2(0.0), vec2(0.5, 0.5)) );
  gl_FragColor = vec4(col, 1.0);
}