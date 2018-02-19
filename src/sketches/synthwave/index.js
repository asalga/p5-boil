/*
  Andor Saga
  Feb 2018
*/

let grungeImage, referenceImage;
let isLooping = false;
let drawReference = false;

let markerColor,
  Red,
  Green;

let blurShader, blurGfx;

let layers = [];

function preload() {
  grungeImage = loadImage('data/g.png');
  referenceImage = loadImage('data/reference.jpg');
}

function setup() {
  createCanvas(500, 500);


  blurGfx = createGraphics(500, 500, WEBGL);
  blurGfx.noStroke();
  blurShader = blurGfx.createShader(vert, frag);


  Red = color(255, 0, 0);
  Green = color(0, 255, 0);

  layers.push(
    // new Sun(),
    // new Grid(),
    // new Mountain(),
    // new Stars(),
    new Title(),
    new ScanLines()
  );

  markerColor = Red;
  // drawLayers();
}

function drawLayers() {
  // background(24, 30, 60);

  // layers.forEach(l => l.draw());
  // blend(grungeImage, 0, 0, width, height, 0, 0, width, height, ADD);

  if (drawReference) {
    // image(referenceImage, 0, 0);
  }
}

function keyPressed(key) {
  if (key.code === 'KeyL') {
    isLooping = !isLooping;

  }

  if (key.code === 'KeyR') {
    drawReference = !drawReference;
  }

  markerColor = isLooping ? Green : Red;
  isLooping ? loop() : noLoop();
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


  blurGfx.shader(blurShader);
  blurShader.setUniform('texture0', referenceImage);
  blurShader.setUniform('res', [width, height]);
  
  blurGfx.push();
  blurGfx.translate(-width/2, -height / 2);
  blurGfx.rect(0, 0, width, height);
  blurGfx.pop();

  // blend(blurGfx, 0, 0, width, height, 0, 0, width, height, ADD);

  image(blurGfx, 0, 0);
}