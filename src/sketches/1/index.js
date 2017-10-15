let img = null;
let armPositions = {};

function preload() {
  img = loadImage('data/_idle.png');


  armPositions.idle = {
    x: 224,
    y: 90,
    img: loadImage('data/arm_idle.png')
  }

  armPositions.slot3 = {
    x: 200,
    y: 125,
    img: loadImage('data/arm_3.png')
  }
}

function setup() {
  createCanvas(640, 400);
}

function draw() {
  image(img, 0, 0);

  
  
  if (keyIsDown(49)){
  	drawArm('slot3');
  }
  else {
  	drawArm('idle');
  }
}

function drawArm(key) {
  let k = armPositions[key];
  image(k.img, k.x, k.y);
}