let x = 0,
  speed = 410,
  accumTime = 0,
  lastTime = 0,
  timeStep = 1 / 60,
  simulationStates = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function updateProxy(now) {
  accumTime += (now - lastTime) / 1000;
  while (accumTime > timeStep) {
    this.update(timeStep);
    accumTime -= timeStep;
  }
  lastTime = now;
}

function update(delta) {
  x += (speed * delta);
  simulationStates.push({
    x
  });

  if (x > width) {
    x = 0;
  }
}

function draw() {
  updateProxy(millis());
  fill(255, 255);
  rect(0, 0, width, height);

  noStroke();
  fill(0, 0, 250, 50);

  let i = 0;
  simulationStates.forEach(obj => {
    window.setTimeout( () => {
      rect(obj.x, 200, 100, 100);
    }, i * 40);
    i += 10;
  });

  stroke(0)
  text(x, 10, 10);
  simulationStates = [];
}