/*
  Andor Saga
  Feb 2018
*/
'use strict';

let capture, myShader, gfx, mouse = [0, 0, 0];

/*
 */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gfx = createGraphics(windowWidth, windowHeight);
  myShader = new p5.Shader(this._renderer, vert, frag);
  capture = createCapture(VIDEO);
  capture.hide();
}

function mousePressed(event) {
  mouse[event.which - 1] = 1;
}

function mouseReleased(event) {
  mouse[event.which - 1] = 0;
}

function draw() {

  gfx.push();
  gfx.translate(width / 2, height / 2);
  gfx.imageMode(CENTER);
  gfx.image(capture, 0, 0);
  gfx.pop();

  push();
  translate(-width / 2, -height / 2);
  shader(myShader);
  myShader.setUniform('time', millis());
  myShader.setUniform('res', [width, height]);
  myShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  myShader.setUniform('_', [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1]);
  myShader.setUniform('texture0', gfx);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
  pop();
}