let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform sampler2D texture0;
uniform vec2 res;

void main() {
	
	vec2 p = gl_FragCoord.xy / res.xy * 2.0 - 1.0;
	p.y = -p.y;
	gl_FragColor = texture2D(texture0, p );

}`;