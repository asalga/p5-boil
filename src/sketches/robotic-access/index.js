const MaxSize = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function drawBox(s, c) {
  let n = max(0, s - 50 / 2);

  fill(255);
  if (s > MaxSize - 10) {
    fill(255 * ((MaxSize - s) / 10));
  }
  rect(0, 0, s + 2, s + 2);

  if (s > 10) {
    fill(0);
    rect(0, 0, s - 10, s - 10);
  }

  fill(0);
  rect(0, 0, n / 2, windowHeight);
  rect(0, 0, windowWidth, n / 2);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(5, 5);

  let f = frameCount / 4;
  let arr = [(f + 0) % MaxSize, (f + 25) % MaxSize, (f + 50) % MaxSize];
  arr = sort(arr).reverse();
  arr.forEach(v => drawBox(v));
}