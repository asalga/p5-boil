/*
  Andor Saga
  Feb 2018
*/
'use strict';

let capture, myShader, gfx, mouse = [0, 0, 0];
let gfx3D;

let myShader2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gfx = createGraphics(windowWidth, windowHeight);
  gfx3D = createGraphics(windowWidth, windowHeight, WEBGL);

  myShader = new p5.Shader(this._renderer, vert, frag);
  myShader2 = new p5.Shader(gfx3D._renderer, vert1, frag1);

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


  gfx3D.push();  
  gfx3D.translate(-width / 2, -height / 2);
  gfx3D.shader(myShader2);
  myShader2.setUniform('time', millis());
  myShader2.setUniform('res', [width, height]);
  myShader2.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  myShader2.setUniform('texture0', gfx);

  gfx3D.noStroke();
  gfx3D.rect(0, 0, windowWidth, windowHeight, 1, 1);
  gfx3D.pop();

  push();
  translate(-width / 2, -height / 2);
  shader(myShader);
  myShader.setUniform('time', millis());
  myShader.setUniform('res', [width, height]);
  myShader.setUniform('_', [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1]);
  myShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  myShader.setUniform('texture0', gfx3D);
  rect(0, 0, windowWidth, windowHeight, 3, 3);
  pop();
}