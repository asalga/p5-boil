function makeBlurShader(cfg) {

  let vert = `
	#ifdef GL_ES
		precision highp float;
		precision mediump int;
	#endif

	attribute vec3 aPosition;
	attribute vec4 aVertexColor;
	attribute vec3 aNormal;
	attribute vec2 aTexCoord;

	varying vec3 var_vertPos;
	varying vec4 var_vertCol;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat3 uNormalMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0 );
		var_vertPos = aPosition;
		var_vertCol = aVertexColor;
		var_vertNormal = aNormal;
		var_vertTexCoord = aTexCoord;
	}`;

  let frag = `
	#ifdef GL_ES
	  precision mediump float;
	#endif

	varying vec3 var_vertPos;
	varying vec4 var_vertCol;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	const float kernelSize = ${cfg.kSize};
	uniform sampler2D texture0;
	uniform vec2 res;

	void main() {
		vec2 p = (gl_FragCoord.xy / res.xy);
		p.y = 1.0 - p.y;

		vec4 c = vec4(0.0);
		const float sz = floor(float(kernelSize)/2.0);

		for(float x = -sz; x < sz; ++x){
			for(float y = -sz; y < sz; ++y){
				vec2 uv = (gl_FragCoord.xy + vec2(x, y)) / res.xy;
				uv.y = 1.0 - uv.y;
				c += texture2D(texture0, uv);
			}
		}
		c /= kernelSize;
		gl_FragColor = c;
	}`;

  return cfg.gfx.createShader(vert, frag);
}