/*
  Andor Saga
  Feb 2018
*/
'use strict';

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill(255);
  rectMode(CENTER);
}

function drawBox(s) {
  let sz = 50;
  rect(0, 0, s, s);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  scale(2, 2);

  let f = frameCount / 30;
  let maxSize = 75;

  let s1 = (f + 0) % maxSize;
  let s2 = (f + 25) % maxSize;
  let s3 = (f + 50) % maxSize;

  stroke(0, 255, 0);
  drawBox(s1);

  stroke(255, 0, 0);
  drawBox(s2);

  stroke(0, 0, 255);
  drawBox(s3);
}