/*
	Andor Saga
	Jan 2018
*/

// Can a line unfold from two different directions at once?
let multiUnfold = false;
let grid = [];
let xLen = 10;
let yLen = 4;

let next = 0;
let xStart = 200;
let pos = 0;
let speed = 1.0;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes({ 'antialias': true });
  noiseSeed(10);

  for (let x = 0; x < xLen; ++x) {
    grid.push([]);

    for (let y = 0; y < yLen; ++y) {
      let n = noise(x / 10, y / 10);
      n = n * 2;
      n -= 0.5;
      grid[x].push(n)
    }
  }
}

function draw() {
  background(0);

  rotateX(1);
  translate(pos - xStart, 20, 20);
  // rotateX(mouseX / windowWidth * TWO_PI);

  let sc = 30;
  let zSc = 170;

  //
  for (let y = 0; y < yLen; ++y) {
    for (let x = 0; x < xLen - 1; ++x) {

      let col = 0;
      let prev = 0;

      if (x === -1 || x === xLen + 3) {
        // stroke(0, 0, 200);
      } else {

        let f = 255;
        let nPos = abs(pos / 30);
        // console.log(nPos);

        let prevCol = (x - 1) / xLen;
        let nextCol = (x + 1) / xLen;

        f = 255;
        // nextCol += sin( ((x + 1) / xLen + (frameCount/50)) * PI);

        nextCol = sin(((x + 1) / xLen + (pos / (30 * xLen))) * PI);

        if (x === 7) {
          // let test = lerp(prevCol, nextCol, nPos);
          // console.log(prevCol, nextCol);
        }

        // we cycle between 0 and 30
        // depending on where the pos is, our colors will need to lerp
        // lerp based on the position

        // let f = lerp(intensity, nextCol, pos / 30);
        stroke(255 * nextCol, 0, 0);
      }


      // let last = max(0,sin((x +1) / (xLen - 1.0) * PI) * 255);
      // let s = sin(x / (xLen - 1.0) * PI) * 255;
      // let test = lerp(last, s, pos / 60);


      line(
        (x + 0) * sc, y * sc, grid[x][y] * zSc,
        (x + 1) * sc, y * sc, grid[x + 1][y] * zSc
      );
    }
  }

  // // towards user
  for (let x = 0; x < xLen; ++x) {
    let last = sin((x - 1) / (xLen - 1.0) * PI) * 100;
    let s = sin(x / (xLen - 1.0) * PI) * 100;
    let test = lerp(last, s, pos / 30);
    // let nextCol = sin(((x + 1) / xLen + (pos / (30 * xLen))) * PI);
    stroke(255, 0, 0);

    for (let y = 0; y < yLen - 1; ++y) {
      line(
        x * sc, (y + 0) * sc, grid[x][y] * zSc,
        x * sc, (y + 1) * sc, grid[x][y + 1] * zSc
      );
    }
  }

  pos -= speed;
  if (pos % 30 === 0) {
    pos = 0;
    next++;
    shiftValues();
  }
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
    let n = noise((xLen + next) / 10, y / 10);
    n = n * 2;
    n -= 0.5;
    grid[xLen - 1][y] = n;
  }
}