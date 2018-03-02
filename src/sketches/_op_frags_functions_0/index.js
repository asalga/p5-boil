let sh;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  sh = new p5.Shader(this._renderer, vert, frag);
}

function draw() {
  translate(-width / 2, -height / 2);
  shader(sh);
  sh.setUniform('time', millis()/1000);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
}