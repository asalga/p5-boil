let img = null;
let armPositions = {};

let max;
let maxHand;

function preload() {
  img = loadImage('data/_idle.png');

  max = loadImage('data/max.png');
  maxHand = loadImage('data/maxHand.png');

  armPositions.idle = {
    x: 224,
    y: 90,
    img: loadImage('data/arm_idle.png')
  }

  armPositions.slot3 = {
    x: 200,
    y: 125,
    img: loadImage('data/arm_slot3.png')
  }
}

function setup() {
  createCanvas(640, 400);
}

function draw() {
  image(img, 0, 0);

  image(max, 0, 74);
  image(maxHand, 20, 150)

  if (keyIsDown(51)) {
    drawArm('slot3');
  } else {
    drawArm('idle');
  }

}

function drawArm(key) {
  let k = armPositions[key];
  image(k.img, k.x, k.y);
}