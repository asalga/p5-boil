/*
  Andor Saga
  Feb 2018
*/

let grungeImage,
  scanLines,
  sun,
  grid,
  sunNoise;

function preload() {
  grungeImage = loadImage('data/g.png');
}

function setup() {
  createCanvas(500, 500);
  sun = new Sun();
  stars = new Stars();
  grid = new Grid();
  scanLines = new ScanLines();
}

function draw() {
  background(24, 30, 60);
  
  sun.draw();
  stars.draw();
  grid.draw();
  scanLines.draw();
  blend(grungeImage, 0, 0, width, height, 0, 0, width, height, ADD);
}