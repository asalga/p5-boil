/*
	Andor Saga
	Jan 2018
	unfold

	Make line spin from end of grid to future position.

	- get destination vector
	- get vector perp to both

	- rotate along perp vector
	- get angle between vectors

	- need to create artificial delay between 
*/

let multiUnfold = false;
let grid = [];
let xLen = 6;
let yLen = 2;

let intensityScale = 170;
let next = 0;
let xStart = 200;
let pos = 0;
let speed = 0.025;
let unfoldSpeed = 1.0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes({ 'antialias': true });
  noiseSeed(10);

  for (let x = 0; x < xLen; ++x) {
    grid.push([]);
    for (let y = 0; y < yLen; ++y) {
      grid[x].push(getNoise(x, y));
    }
  }
}

function draw() {
  background(0);

  rotateX(1);
  translate(pos - xStart, 20, 20);
  rotateX(mouseX / windowWidth * TWO_PI * 4);

  let sc = 30;

  //
  for (let y = 0; y < yLen; ++y) {

  	// -1 since we need to 'look forward' 1 index
  	// -1 since we need to draw the animated line.
    for (let x = 0; x < xLen - 2; ++x) {

      let f = (x < xLen - 1) ? 255 : 40;
      stroke(0, f, 0);

      line(
        (x + 0) * sc, y * sc, grid[x][y] * intensityScale,
        (x + 1) * sc, y * sc, grid[x + 1][y] * intensityScale
      );
    }
  }

  // towards user
  for (let x = 0; x < xLen; ++x) {
    stroke(255, 0, 0);
    for (let y = 0; y < yLen - 1; ++y) {
      line(
        x * sc, (y + 0) * sc, grid[x][y] * intensityScale,
        x * sc, (y + 1) * sc, grid[x][y + 1] * intensityScale
      );
    }
  }

  // draw animated lines
  for (let y = 0; y < yLen; ++y) {
    push();

    startVector = new p5.Vector(
      (xLen - 2) * sc - (xLen - 3) * sc,
      0,
      grid[xLen - 2][y] * intensityScale - grid[xLen - 3hp][y] * intensityScale
    );

    stroke(255, 0, 255);

    translate(
      (xLen - 3) * sc,
      y * sc,
      grid[xLen - 3][y] * intensityScale);
    // rotateX(1);

    line(0, 0, 0, startVector.x, startVector.y, startVector.z);

    pop();
  }

  pos -= speed;
  if (pos % 30 === 0) {
    pos = 0;
    next++;
    shiftValues();
  }
}

function getNoise(x, y) {
  return noise(x / 10, y / 10) * 2 - 0.5;
}

/*
	Shift all the noise values from right to left
	then generate a new noise value at the far right
*/
function shiftValues() {

  // shift
  for (let x = 0; x < xLen - 1; ++x) {
    for (let y = 0; y < yLen; ++y) {
      grid[x][y] = grid[x + 1][y];
    }
  }

  // create new values
  for (let y = 0; y < yLen; ++y) {
    grid[xLen - 1][y] = getNoise(xLen + next, y);
  }
}