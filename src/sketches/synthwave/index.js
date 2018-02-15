/*
  Andor Saga
*/

let grungeImage,
  gradientMap,
  scanLines,
  sun,
  mountain,
  grid,
  sunNoise;


function preload() {
  grungeImage = loadImage('data/g.png');
  gradientMap = loadImage('data/_6.png');
}

function setup() {
  createCanvas(400, 400);

  let p = new PlanetGenerator();
  sunNoise = p.create();

  sun = new Sun();
  stars = new Stars();
  scanLines = new ScanLines();
  grid = new Grid();
}

function draw() {
  background(24, 30, 60);

  grid.draw();
  sun.draw();
  stars.draw();
  scanLines.draw();
}