let frag = `
#ifdef GL_ES
  precision highp float;
  precision mediump int;
#endif

	varying vec3 var_vertPos;
	varying vec4 var_vertCol;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

  // 
  uniform sampler2D texture0;
	uniform vec2 res;
	uniform vec4 mouse;
	uniform float time;
  uniform float aspect;

	void main() {
    vec2 pos = gl_FragCoord.xy / res; 

    // invert y for texture
    pos.y = 1.0 - pos.y;

		if(aspect <= 1.){
			pos.x *= aspect;
			pos.x += (1. - aspect) * .5;
		}else{
			pos.y *= 1./aspect;
			pos.y += (1. - 1./aspect) * .5;
		}

    vec4 col = vec4(1., pos.x * (cos(time/1000.) + 1.)/2., pos.y*(sin(time/1000.) + 1.)/2., 1.);

		if(mouse.z == 1.){ col.r = .5;}
		if(mouse.w == 1.){ col.g = .5;}

    float i = (mouse.x/res.x) * 10.0;
    float amp = (1.-mouse.y/res.y) * 0.06;
		pos.y += sin(time/1000.0 + (gl_FragCoord.x*i/100.0) ) * amp;

		vec4 texel = texture2D(texture0, pos);
    
		gl_FragColor = texel * col;

    // if still waiting for image....
    if(texel.xy == vec2(0.)){
      gl_FragColor = vec4(pos.x, pos.y, 1., 1.);
    }

    if(mouse.x < gl_FragCoord.x + 1. && mouse.x > gl_FragCoord.x - 1.){
      //gl_FragColor = vec4(0.);
    }
    if(mouse.y < gl_FragCoord.y + 1. && mouse.y > gl_FragCoord.y - 1.){
      //gl_FragColor = vec4(0.);
    }
}`;