// ******************* STEP 1
// let frag = `
// // STEP 1
// #ifdef GL_ES
//   precision mediump float;
// #endif

// varying vec3 var_vertPos;
// varying vec4 var_vertCol;
// varying vec3 var_vertNormal;
// varying vec2 var_vertTexCoord;

// uniform sampler2D texture0;
// uniform vec2 res;
// uniform float time;
// uniform float aspect;

// void main() {
//   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
// }`;




// // ******************* STEP 2
// let frag = `
// #ifdef GL_ES
//   precision mediump float;
// #endif
// varying vec3 var_vertPos;
// varying vec4 var_vertCol;
// varying vec3 var_vertNormal;
// varying vec2 var_vertTexCoord;

// uniform sampler2D texture0;
// uniform vec2 res;
// uniform float time;
// uniform float aspect;

// void main() {
//   // normalize p
//   vec2 p = gl_FragCoord.xy / res;
//   p.y = 1.0 - p.y;

//   p.x = mod( 1.0/ p.x, 1.0);

//   gl_FragColor = texture2D(texture0, p);
// }`;



  // 3) ******
  // Now, we need to introduce a way perpective.
  // The farther down the immaginary tunnel we go (
  // (the closer to the center of the canvas),
  // the 'remapping process' needs to happen more frequently.
  // There's a neat trick how to do this.
  // Let's visit google and see a graph of this
  // we're going to get the length of x
  // which currently is the distance from the left side of the
  // canvas and invert it.
  //x = mod(- 1.0/(p.x * 5.0), 1.0);

  // As x increases in length, it will result in a value 
  // smaller and smaller, but never quite reaching 0.
  // This line creates a asymptotpe.

  // We dont' have to worry about the smushing that's happening
  // right now because we will eventually cleverly add fog
  // effectively hiding this unwanted

  
  // 4) ******
  // We need both the left and right sides to sample 'bigger'
  // numbers, so we'll need to offset x a bit.
  // we are going to once again re-map x to range from -1 to 1.
  
  //x = p.x * 2.0 -1.;
  //y = p.y * 2.0 -1.;
  // x = mod(- 1.0/(x * 5.0), 1.0);

  // What we have doesn't look like a tunnel yet. Let' fix that.
  // So far we've been sampling using Cartesian coordinate systems, 
  // There's another way to do sampleing, which uses polar coordinate.
  // Cartesian coordiantes have 2 componenets x and y. Both 
  // represent tie distance from the origin respectively.
  // Polar coordinates are a bit different. We still have 2 values
  // but one will represent an angle and the other the distance from
  // the origin.

  // This means, we'll need to convert our (x,y) sampling of the texture
  // we already know the distance from the center of the canvas
  // so one coordinate is taken care of
  
  //float nx = p.x * 2.0 -1.;
  // float ny = p.y;
  //float ny = p.y * 2.0 -1.
  //x = mod(1.0/length(p), 1.0);
  //y = mod(atan(ny/nx)/TAU, 1.0);
  // p will range from -1 to 1
  let frag = `
#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0
varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

uniform sampler2D texture0;
uniform vec2 res;
uniform float time;
uniform float aspect;

void main() {
  vec2 p = gl_FragCoord.xy / res.xy * 2.0 - 1.0;
  float len = length(p);
  float r =  mod(.25/len + time / 9000.0, 1.0);
  float theta =  mod( atan(p.y/p.x)/ TAU, 1.0);
  vec2 texel = vec2(r, theta);
  gl_FragColor = texture2D(texture0, texel) * (len  * 1.2);
}`;




/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ){

  p.x *= iResolution.x / iResolution.y;
  
  vec2 cursor = iMouse.xy/iResolution.xy * 2.0 - 1.0;
  p += cursor;
  
  
  
  // Use polar coordinate to sample the texture
  vec2 texel = vec2( 1.0/pLength * 0.3, atan(p.y/p.x)/TAU);
  

  

  



*/













