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

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */

let grid = [];
let xLen = 40;
let yLen = 20;

let noiseScale = 140;
let noiseIndex = 0;

let posStart = 800;
let pos = 0;
let speed = 0.25 * 6;

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
  noFill();
  stroke(0, 255, 0);
}

function draw() {
  background(0);

  rotateX(1);
  translate(pos - posStart, -200, 10);
  // var rt = mouseX / windowWidth * TWO_PI * 4;
  rotateX(6.2);

  let sc = 30;

  //
  for (let y = 0; y < yLen; ++y) {
    beginShape(LINES);
    // -1 since we need to 'look forward' 1 index
    // -1 since we need to draw the animated line.
    for (let x = 0; x < xLen - 2; ++x) {
      let f = (x < xLen - 1) ? 255 : 40;
      stroke(0, f, 0);
      vertex((x + 0) * sc, y * sc, grid[x][y] * noiseScale);
      vertex((x + 1) * sc, y * sc, grid[x + 1][y] * noiseScale);
    }
    endShape();
  }


  // towards user
  for (let x = 0; x < xLen - 1; ++x) {
    beginShape(LINES);
    for (let y = 0; y < yLen - 1; ++y) {
      vertex(x * sc, (y + 0) * sc, grid[x][y] * noiseScale);
      vertex(x * sc, (y + 1) * sc, grid[x][y + 1] * noiseScale);
    }
    endShape();
  }

  
  // Animated lines
  for (let y = 0; y < yLen; ++y) {
    push();

    // Get the angle between the where we start and where we need to end up.
    let startVector = new p5.Vector(
      (xLen - 3) * sc - (xLen - 2) * sc,
      0,
      grid[xLen - 3][y] * noiseScale - grid[xLen - 2][y] * noiseScale
    );
    let endVector = new p5.Vector(
      (xLen - 1) * sc - (xLen - 2) * sc,
      0,
      grid[xLen - 1][y] * noiseScale - grid[xLen - 2][y] * noiseScale);

    //
    var crossProduct = p5.Vector.cross(startVector, endVector);

    let theta = endVector.angleBetween(startVector);

    // start the end point at the edge
    translate((xLen - 2) * sc, y * sc, grid[xLen - 2][y] * noiseScale);

    let r = min(1, abs(pos / 20));
    var e = EasingFunctions.easeInOutQuad(r);
    let dir = crossProduct.y < 0 ? 1 : -1;
    rotateY(theta * -e * dir);
    // rotateY(mouseX / windowWidth * TWO_PI * 4);
    line(0, 0, 0, startVector.x, startVector.y, startVector.z);

    pop();
  }

  pos -= speed;
  if (pos % 30 === 0) {
    pos = 0;
    noiseIndex++;
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
    grid[xLen - 1][y] = getNoise(xLen + noiseIndex, y);
  }
}