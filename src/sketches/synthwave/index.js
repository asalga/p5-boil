/*
Elements

- starfield
    - movement
    - parallax

- scanlines

- sun
    - sun blur
    - sun blur offset
*/

let stars = new Array(150);

function setup() {
  createCanvas(400, 400);
  initStars();
}

function initStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i] = {
      x: random() * width * 2,
      y: random() * height / 2,
      s: random() * 3,
      i: 0 + random() * 100
    };
  }
}

function draw() {
  background(24, 30, 60);
  drawSun();
  drawStars();
  drawGrid();
  drawScanlines();
}

function drawSun() {
  fill(250, 250, 100);
  ellipse(width / 2, height / 2 - 10, 250, 250);
}

function drawStars() {
  stars.forEach(i => {
    fill(255, i.i);
    ellipse(i.x - (i.s * frameCount / 10) % width, i.y, i.s, i.s);
  });
}

function drawScanlines() {
  stroke(255, 40);
  strokeWeight(1);
  for (let y = 0; y < height; y += 3) {
    line(0, y, width, y);
  }
}

function drawGrid() {
  stroke(0, 255, 0);
  let r = 1.5;

  for (let i = 0; i < 20; i++) {
    let y = pow(((i + frameCount / 40) % 15), 2);
    line(0, height / r + y, width, height / r + y);
  }

  for (let i = 0; i < width; i += 10) {
    line(i, height / r, (i - width / 2) * 10, height);
  }

  // noStroke();
  // for (let i = 0; i < height; i += 10) {
  //   fill(0, 255 - (i / height * 255) * 1.5);
  //   rect(0, i - 2, width * 2, 10); // use -2 instead of extra call to rectMode(CENTER)
  // }
}