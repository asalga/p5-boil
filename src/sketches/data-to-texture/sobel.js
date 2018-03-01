let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform vec3 mouse;
uniform vec2 res;
uniform float time;
uniform sampler2D texture0;

void main() {
  vec4 col = texture2D(texture0, vec2(0.0));
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}`;

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