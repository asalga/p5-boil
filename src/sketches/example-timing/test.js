const pxSize = 2;
let BrickHeight = 8;

let sizesA = [2, 7, 11, 15, 14, 15, 11, 9, 4];
let sizesB = [5, 10, 13, 15, 15, 12, 10, 8];
let sizesC = [1, 5, 11, 14, 15, 14, 12, 10, 6];
let sizesD = [4, 8, 12, 15, 15, 13, 11, 8, 2];

let states = [
  [sizesA, sizesB],
  [sizesC, sizesD],
  [sizesB, sizesA],
  [sizesD, sizesC]
];
let state = 3;

let xx = 0,
  img;
let easing = 0.005;
let px;

let lastTime = 0;
let timeStep = 1 / 60;
let accumTime = 0;
let speed = 100;
let yTest = 10;

function preload() {
  brick = loadImage("data/brick.jpg");
}

function setup() {
  createCanvas(320, 240);
  // frameRate(10);
}

function updateProxy(now) {
  accumTime += (now - lastTime) / 1000;
  let self = this;

  let test = 0;
  while (accumTime > timeStep) {
    self.update(timeStep);
    accumTime -= timeStep;
  }
  lastTime = now;
}

function update(delta) {
  yTest += (speed * delta);
}

function draw() {
  updateProxy(millis());

  background(0);

  push();
  translate(width / 2 - 100, 0);

  // let diff = mouseX - x;
  // px = diff * easing;

  // px = px > .025 ? .025 : px;
  // px = px < -.025 ? -.025 : px;

  // x += 0.025; //px;
  state = parseInt(xx * 10) % 4;


  drawTower(state);

  pop();

  noFill();
  stroke(255, 255, 255);
  rect(0, 0, width - 1, height - 1);
  text(millis(), 10, 10);
}

function drawTower(s) {
  push();
  drawRow(states[s][0]);
  translate(0, pxSize * 8);
  drawRow(states[s][1]);
  pop();
}

/*
  array containing widths
*/
function drawRow(arr) {

  push();
  for (let y = 0; y < 13; ++y) {
    let xOffset = 0;

    for (let i = 0; i < arr.length; ++i) {
      let yOffset = y * (BrickHeight * pxSize) + (parseInt(yTest / 2) % 32) / 2;

      // left side
      if (i <= 4) {
        drawBrick(xOffset, -16 + yOffset, arr[i], BrickHeight, 1);
        //right side
      } else {
        drawBrick(xOffset, -16 + yOffset, arr[i], BrickHeight, -1);
      }
      xOffset += arr[i] + 1;
    }
  }
  pop();
}
/*
  d - direction to start copying (left or right)
*/
function drawBrick(x, y, w, h, d) {

  if (d === 1) {
    image(brick,
      x * pxSize, y * pxSize,
      w * pxSize, h * pxSize,
      pxSize, 0,
      w * pxSize, h * pxSize);
  } else {
    image(brick,
      x * pxSize, y * pxSize,
      w * pxSize, h * pxSize,
      (pxSize * 16) - (w * pxSize), 0,
      (w * pxSize), h * pxSize);
  }
}