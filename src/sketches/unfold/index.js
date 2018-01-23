/*
	Andor Saga
	Jan 2018
	
	 1) create 2D grid of noise
	 2) Draw lines connecting points

	 3) increase position
	   -> mod pos 
	   -> if pos  === 0
	   -> shift all elements in array
	   -> reset pos
*/

// Can a line unfold from two different directions at once?
let multiUnfold = false;
let grid = [];
let xLen = 5;
let yLen = 8;
let pos = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stroke(0, 200, 0);
  noFill();
  noiseSeed(0);

  for (let x = 0; x < xLen; ++x) {
    grid.push([]);

    for (let y = 0; y < yLen; ++y) {
      let n = noise(x / 10, y / 10);
      grid[x].push(n)
    }
  }

  console.table(grid);
}

function draw() {
  background(0);

  rotateX(PI / 3.18);
  translate(pos, 0, 0);

  let sc = 30;
  let zSc = 180;

  //
  for (let x = 0; x < xLen; ++x) {
    for (let y = 0; y < yLen - 1; ++y) {
      line(
        x * sc, (y + 0) * sc, grid[x][y] * zSc,
        x * sc, (y + 1) * sc, grid[x][y + 1] * zSc
      );
    }
  }

  //
  for (let y = 0; y < yLen; ++y) {
    for (let x = 0; x < xLen - 1; ++x) {
      line(
        (x + 0) * sc, y * sc, grid[x][y] * zSc,
        (x + 1) * sc, y * sc, grid[x + 1][y] * zSc
      );
    }
  }
  console.log(floor(frameRate()));


	// pos -= frameCount * 0.005 - 20;
	
}

















//