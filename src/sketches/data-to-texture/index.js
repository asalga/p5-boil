/*
  Andor Saga
  Feb 2018
*/
'use strict';

let capture,
  sobelShader,
  gfx, gfx3D,
  mouse = [0, 0, 0];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gfx = createGraphics(windowWidth, windowHeight);
  gfx3D = createGraphics(windowWidth, windowHeight, WEBGL);

  sobelShader = new p5.Shader(this._renderer, vert, frag);

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
  let scaleRatio = windowWidth / 480;
  gfx.scale(scaleRatio, scaleRatio);
  gfx.imageMode(CENTER);
  gfx.image(capture, 0, 0);
  gfx.pop();

  // SOBEL
  push();
  translate(-width / 2, -height / 2);
  shader(sobelShader);
  sobelShader.setUniform('time', millis());
  sobelShader.setUniform('res', [width, height]);
  sobelShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
  pop();
}