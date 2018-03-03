let sh;
let pimg;

function preload(){
  pimg = loadImage('data/public_domain.png');
  sh = loadShader('data/vert.glsl', 'data/frag.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  translate(-width / 2, -height / 2);
  shader(sh);
  sh.setUniform('texture0', pimg);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
}