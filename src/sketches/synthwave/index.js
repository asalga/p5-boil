/*
  Andor Saga
  Feb 2018

   - add key to toggle draw
   - add key to toggle reference image
*/

let grungeImage, referenceImage;
let isLooping = false;

let markerColor;
let Red;
let Green;

let layers = [];

function preload() {
  grungeImage = loadImage('data/g.png');
  reference = loadImage('data/reference.jpg');
}

function setup() {
  createCanvas(500, 500);

  Red = color(255, 0, 0);
  Green = color(0, 255, 0);

  layers.push(
    new Sun(),
    new Grid(),
    new Mountain(),
    new Stars(),
    new ScanLines()
  );

  markerColor = color(255, 0, 0);
  drawLayers();
}

function drawLayers() {
  background(24, 30, 60);
  layers.forEach(l => l.draw());
  blend(grungeImage, 0, 0, width, height, 0, 0, width, height, ADD);
}

function keyPressed(key) {
  if (key.code === 'KeyL') {
    isLooping = !isLooping;
  }

  if (isLooping) {
    markerColor = Green;
    loop();
  }
  // 
  else {
    markerColor = Red;
    noLoop();
  }
}

// Make it obvious that redrawing is happening.
function drawMaker(col) {
  push();
  noFill();
  stroke(col);
  rect(0, 0, width, height);
  pop();
}

function draw() {
  drawLayers();
  drawMaker(markerColor);
}