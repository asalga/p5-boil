/*
  Andor Saga
  Feb 2018
*/
'use strict';

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  stroke(255);
  noFill(255);
  rectMode(CENTER);
}

// 0 - width
// mod(width)
// 

function drawBox(s) {
  let sz = 50; // (1 + (s % 2)) * 100;

  push();
  //scale(1 + s % 3);
  rect(0, 0, s, s);

  // fill(0);
  // rect(0, 0, 130, 130);
  // rect(0, 0, 50, windowHeight);
  // rect(0, 0, windowWidth, 50);
  pop();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let fc = frameCount;

  //  scale(1 + (frameCount / 100) % 2);
  let s1 = (fc / 2) % 100;
  let s2 = ((fc + 50) / 2) % 150;
  let s3 = ((fc + 100) / 2) % 200;

  stroke(0, 255, 0);
  drawBox(s1);

  stroke(255, 0, 0);
  drawBox(s2);

  stroke(255, 0, 0);
  drawBox(s3);

  // drawBox(s * 2);
  // drawBox(s * 3);
}