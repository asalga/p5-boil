let img = null;
let armPositions = {};

function preload() {
  img = loadImage('data/_idle.png');

  armPositions.idle = loadImage('data/_1.png');
}



function setup() {
  createCanvas(640, 400);
}

function draw() {
  image(img, 0, 0);

  image(armPositions.idle, 224, 90);
}
