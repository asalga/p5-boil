/*
  Andor Saga
*/

let myShader,
  mouse = [0, 0, 0];
let pimg;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 50, WEBGL);
  myShader = new p5.Shader(this._renderer, vert, frag);
  // shader(myShader);

  noStroke();
  pimg = loadImage('data/eye.jpg');

  document
    .getElementById('defaultCanvas0')
    .addEventListener('contextmenu', e => e.preventDefault());
}

function mousePressed(event) {
  mouse[event.which - 1] = 1;
}

function mouseReleased(event) {
  mouse[event.which - 1] = 0;
}

function draw() {
  translate(-width / 2, -height / 2);

  shader(myShader);
  // myShader.setUniform('time', millis());
  myShader.setUniform('res', [width, height]);
  myShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  myShader.setUniform('_', [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1]);
  myShader.setUniform('texture0', pimg);

  rect(0, 0, width, height, 1, 1);
}