var img;

function preload() {
  img = loadImage("data/brick.jpg");
}

function setup() {
  createCanvas(640, 320);
}

function draw() {
  background(0);
  image(img, width/2, height/2);
}

