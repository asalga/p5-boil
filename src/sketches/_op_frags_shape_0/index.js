let sh;

function preload(){
  sh = loadShader('data/vert.glsl', 'data/frag.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  translate(-width / 2, -height / 2);

  shader(sh);
  sh.setUniform('res', [windowWidth, windowHeight]);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}