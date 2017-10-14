/*
[5, 10, 13, 15, 15, 12, 10, 8, 1]
[2, 7, 9, 12, 15, 14, 11, 9, 4]

[3, 8, 12, 14, 15, 13, 12, 8, 3]
6, 11, 13, 15, 15, 12, 10, 6, 0

[1, 5, 11, 14, 15, 14, 12, 10, 6]
[4, 8, 12, 15, 15, 13, 11, 8, 2]


-----
1,2,4,6,8, 2,4,6,8
*/

const pxSize = 4;
var img, subImg;


var sizes1 = [2, 7, 11, 15, 14, 15, 11, 9, 4];//P
var sizes2 = [5, 10, 13, 15, 15, 12, 10, 8]; //P

// sizes1 = [2, 6, 12, 15, 16, 14, 12, 10, 6];
// sizes2 = [5, 9, 13, 16, 16, 13, 11, 8, 2];

// sizes1 = [1, 5, 11, 14, 15, 14, 12, 10, 6]
// sizes2 = [4, 8, 12, 15, 15, 13, 11, 8, 2]

function preload() {
  brick = loadImage("data/brick@4.jpg");
}

function setup() {
  createCanvas(640, 480);
  // subImg = img.get(0, 0, 5 * pxSize, 8 * pxSize);
}

function draw() {
  background(0);
  noStroke();

  push();
  // row 1
  drawRow(sizes1);
  translate(0, pxSize * 8);
  drawRow(sizes2);
  pop();


  stroke(0);
  noFill();
  // rect(0, 0, width - 1, height - 1);
}

/*
	array containing widths
*/
function drawRow(arr) {

  push();
  for (let y = 0; y < 4; ++y) {

    translate(0, pxSize * 16);

    let xOffset = 10;

    for (let i = 0; i < arr.length; ++i) {
      if (i <= 4) {
        drawBrick(xOffset, 0, arr[i], 8, 1);
      } else {
        // xOffset += 1;
        drawBrick(xOffset, 0, arr[i], 8, -1);
      }

      xOffset += arr[i] + 1;
    }
  }
  pop();

  /*
  	d - direction to start copying (left or right)
  */
  function drawBrick(x, y, w, h, d) {

    if (d === 1) {
      image(brick,
        x * pxSize, y * pxSize,
        w * pxSize, h * pxSize,
        4, 0,
        w * pxSize, h * pxSize);
    } else {
      image(brick,
        x * pxSize, y * pxSize,
        w * pxSize, h * pxSize,
        (4 * 16) - (w * 4), 0,
        (w * 4), h * pxSize);
    }
  }
}