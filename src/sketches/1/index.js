let img = null;
let _1;

function preload() {
  img = loadImage('data/_idle.png');
  _1 = loadImage('data/_1.png');
}

function draw() {

  image(img, 0, 0);
  image(_1, 224, 90);
}

function setup() {
  createCanvas(640, 400);
}