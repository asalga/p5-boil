/*
    - scanlines
    - sun
    - stars
    - mountain
    - grid
*/

let stars = new Array(150);
let img;
let c;

function preload() {
  img = loadImage('data/grunge.jpg');
}

function setup() {
  createCanvas(400, 400);
  initSun();

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


function initSun() {
  fill(196, 40, 123);
  ellipse(width / 2, height / 2 - 10, 280, 280);

  filter(BLUR, 14);
  c = get(0, 0, width, height);
}

function draw() {
  background(24, 30, 60);

  push();
  translate(0, -10);
  image(c, 0, 0);
  pop();

  drawSun();

  // drawStars();

  // drawGrid();
  // drawScanlines();

}

// create image
// draw sun
// cut out parts
//


function drawSun() {
  fill(250, 250, 100);
  //ellipse(width / 2, height / 2 - 10, 250, 250);

  noStroke();
  fill(24, 30, 60);

  let y = 20;
  let yPos = frameCount/10 % 20;

  for (let i = 1; i < 10; ++i) {
    rect(0, yPos + 150 + y * i, width, yPos/20 + pow(i, 1.1));
  }
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
  stroke(196, 40, 123);
  let r = 1.5;

  for (let i = 0; i < 20; i++) {
    let y = pow(((i + frameCount / 40) % 15), 2);
    line(0, height / r + y, width, height / r + y);
  }

  for (let i = 0; i < width; i += 10) {
    line(i, height / r, (i - width / 2) * 20, height);
  }

  // noStroke();
  // for (let i = 0; i < height; i += 10) {
  //   fill(0, 255 - (i / height * 255) * 1.5);
  //   rect(0, i - 2, width * 2, 10); // use -2 instead of extra call to rectMode(CENTER)
  // }
}