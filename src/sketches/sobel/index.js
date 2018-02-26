/*
  Andor Saga
  Feb 2018
*/
'use strict';

let capture, celShader, sobelShader, gfx, mouse = [0, 0, 0];
let gfx3D;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gfx = createGraphics(windowWidth, windowHeight);
  gfx3D = createGraphics(windowWidth, windowHeight, WEBGL);

  sobelShader = new p5.Shader(this._renderer, sobelShaderVert, sobelShaderFrag);
  celShader = new p5.Shader(gfx3D._renderer, celShaderVert, celShaderFrag);

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

  // CEL
  gfx3D.push();  
  gfx3D.translate(-width / 2, -height / 2);
  gfx3D.shader(celShader);
  celShader.setUniform('time', millis());
  celShader.setUniform('res', [width, height]);
  celShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  celShader.setUniform('texture0', gfx);
  gfx3D.rect(0, 0, windowWidth, windowHeight, 1, 1);
  gfx3D.pop();
  
  // push();
  // stroke(255,0,0);
  // translate(-width / 2, -height / 2);
  // rect(0,0, windowWidth, windowHeight,1,1);
  // pop();

  // SOBEL
  push();
  translate(-width / 2, -height / 2);
  shader(sobelShader);
  sobelShader.setUniform('time', millis());
  sobelShader.setUniform('res', [width, height]);
  sobelShader.setUniform('_', [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1]);
  sobelShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  sobelShader.setUniform('t1', gfx3D);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
  pop();
}