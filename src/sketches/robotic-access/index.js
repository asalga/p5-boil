/*
  Andor Saga
  Feb 2018
*/

let looping = true;
const MaxSize = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function drawBox(s, c) {
  fill(255);

  if (s > MaxSize - 10) {
    let col = MaxSize - s;
    fill(255 * (col / 10));
  }

  rect(0, 0, s, s);
  fill(0);
  let n = max(0, s - 50 / 2);
  rect(0, 0, (s / 2) + (n / 3), s / 2 + n / 3);
  rect(0, 0, n / 2, windowHeight);
  rect(0, 0, windowWidth, n / 2);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(3,3);
  
  let f = frameCount/4;
  let arr = [(f + 0) % MaxSize,
    (f + 25) % MaxSize,
    (f + 50) % MaxSize
  ];
  arr = sort(arr).reverse();
  arr.forEach((v, i, a) => drawBox(v));
}