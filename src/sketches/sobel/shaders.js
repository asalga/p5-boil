let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform sampler2D texture0;
uniform vec3 mouse;
uniform vec2 res;
uniform float time;

// vec2 sampling offsets
uniform float _[18];

float aspect = res.x/res.y;

mat3 sobel = mat3(  -1.0, 0.0, 1.0,
                    -1.0, 0.0, 1.0,
                    -1.0, 0.0, 1.0);

vec4 sample(vec2 offset){
  vec2 p = vec2(gl_FragCoord.xy + offset) / res;
  p.y = 1.0 - p.y;
  return texture2D(texture0, p);
}

void main() {




 //  // calculate the intensity of the color
 //  float intensity = (diffuse.r + diffuse.g + diffuse.b) /3.;

 //  vec4 col = vec4(0.111, 0.3333, 0.6666, 0.999);

 //  float result = 0.0;


 //  if(intensity < 0.1){ result = 0.1;}
 //  else if( intensity < 0.3333){result = 0.3;}
 //  else if( intensity < 0.6666){result = 0.6;}
 //  else if( intensity < 0.9){result = 0.9;}
 //  else{result = 1.;}

 // // gl_FragColor = vec4( vec3(result), 1.0);


  vec2 _00 = vec2(_[0], _[1]);
  vec2 _10 = vec2(_[2], _[2]);
  vec2 _20 = vec2(_[4], _[3]);

  vec2 _01 = vec2(_[6], _[7]);
  vec2 _11 = vec2(_[8], _[9]);
  vec2 _21 = vec2(_[10], _[11]);

  vec2 _02 = vec2(_[12], _[13]);
  vec2 _12 = vec2(_[14], _[15]);
  vec2 _22 = vec2(_[16], _[17]);

  vec2 p = gl_FragCoord.xy / res;
  p.y = 1.0 - p.y;
  vec4 diffuse = texture2D(texture0, p);

  vec4 colX = 
   sample(_00) * sobel[0][0] + sample(_01) * sobel[0][1] + sample(_02) * sobel[0][2] + 
   sample(_10) * sobel[1][0] + sample(_11) * sobel[1][1] + sample(_12) * sobel[1][2] + 
   sample(_20) * sobel[2][0] + sample(_21) * sobel[2][1] + sample(_22) * sobel[2][2];

  vec4 colY = 
   sample(_01) * sobel[0][0] + sample(_01) * sobel[1][0] + sample(_02) * sobel[2][0] + 
   sample(_12) * sobel[0][1] + sample(_11) * sobel[1][1] + sample(_12) * sobel[2][1] + 
   sample(_20) * sobel[0][2] + sample(_21) * sobel[1][2] + sample(_22) * sobel[2][2];

  float resCol = sqrt(colX.r * colX.r + colY.r * colY.r);

//  float i = (2.0 * sin(time/500.0)-1.0);

  if(gl_FragCoord.x > (res.x/3.0) + res.x/3.0){
    gl_FragColor = vec4( 0.0, resCol, 0.0, 1.0);  
  }
  else{
    gl_FragColor = diffuse;  
  }

  
  

  //if(mouse.z == 1.0){
//    gl_FragColor = gl_FragColor + diffuse;
  //}

  // if(mouse.x < gl_FragCoord.x){
  //  gl_FragColor = diffuse;
  // }
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