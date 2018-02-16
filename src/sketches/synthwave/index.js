/*
  Andor Saga
  Feb 2018
*/

let grungeImage;
let layers = [];

function preload() {
  grungeImage = loadImage('data/g.png');
}

function setup() {
  createCanvas(500, 500);

  layers.push(
    new Sun(),
    new Grid(),
    new Mountain(),
    new Stars(),
    new ScanLines()
    );

  background(24, 30, 60);
  layers.forEach(l => l.draw());
  blend(grungeImage, 0, 0, width, height, 0, 0, width, height, ADD);
}
