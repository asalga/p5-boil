// Cel Fragment Shader

let celShaderFrag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform vec3 mouse;
uniform vec2 res;
uniform float time;

float aspect = res.x/res.y;

vec4 sample(vec2 offset){
  vec2 p = vec2(gl_FragCoord.xy + offset) / res;
  p.y = 1.0 - p.y;
  return texture2D(texture0, p);
}

void main() {
  vec2 p = (gl_FragCoord.xy / res);
  p.y = 1.0 - p.y;

  vec4 diffuse = texture2D(texture0, p);


  // calculate the intensity of the color
  float intensity = (diffuse.r + diffuse.g + diffuse.b) /3.;

  vec4 col = vec4(0.111, 0.3333, 0.6666, 0.999);

  // lookup
  // float result = col[ int(floor(intensity))];

  float result = 0.0;

  if(intensity < 0.1){
    result = 0.1;
  }
  else if( intensity < 0.3333){
    result = 0.3;
  }
  else if( intensity < 0.6666){
    result = 0.6;
  }
  else if( intensity < 0.9){
    result = 0.9;
  }
  else{
    result = 1.0;
  }

  gl_FragColor = diffuse;
  
  // 0 -25%  Original
  if( gl_FragCoord.x < res.x * 0.25){
     gl_FragColor = diffuse;
  }
  // 25% - 50%
  else if(gl_FragCoord.x > 0.25 * res.x && gl_FragCoord.x < 0.5 * res.x){
    gl_FragColor = vec4( vec3(result), 1.0);
  }
  // 50% - 75%
  else if(gl_FragCoord.x > 0.5 * res.x && gl_FragCoord.x < 0.75 * res.x){  
    gl_FragColor = diffuse;
  }
  // 75% - 100%
  else if(gl_FragCoord.x > 0.75 * res.x){
    gl_FragColor = vec4( vec3(result), 1.0); 
  }
}`;

let celShaderVert = `
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