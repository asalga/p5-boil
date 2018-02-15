/*
    Elements
    - scanlines
    - sun
    - stars
    - mountain
    - grid

    - Each layer is separate
    - Compositor adds layers on render
    - We don't want to set the background to 
    - complete 000 everyframe
    - we need the layer underneath to show through
*/


let grungeImage,
  gradientMap,
  scanLines,
  sun,
  mountain,
  grid;
let pimg;

class PlanetGenerator {

  constructor() {
    this.s = 250;
  }

  create() {
    this.img = createImage(this.s, this.s);
    this.img.loadPixels();

    let xNoiseOffset = 4; //random(0, 10);
    let yNoiseOffset = 5; //random(0, 10);
    let noiseSeedVal = 40; //random(0, 100);

    noiseDetail(20, 0.6);
    noiseSeed(noiseSeedVal);

    for (let x = 0; x < this.img.width; x++) {
      for (let y = 0; y < this.img.height; y++) {

        let xNoise = xNoiseOffset + (x * 0.01);
        let yNoise = yNoiseOffset + (y * 0.01);

        let n = noise(xNoise, yNoise);
        let v = map(n, 0, 1, 0, gradientMap.width - 2);

        if (dist(this.s / 2.0, this.s / 2.0, x + 0.5, y + 0.5) <= this.s / 2.0) {
          this.img.set(x, y, gradientMap.get(v, 0));
        }
      }
    }

    // softenEdge(img);
    this.img.updatePixels();
    return this.img;
  }
}



class Sun {
  constructor() {
    this.sunPos;

    this.gfx = createGraphics(width, height);
    this.gfxSun = createGraphics(width, height);

    this.gfx.fill(196, 40, 123);
    this.gfx.ellipse(width / 2, height / 2 - 10, 280, 280);

    this.gfx.filter(BLUR, 20);
    this.sunGlow = this.gfx.get(0, 0, width, height);
  }

  draw() {
    this.gfx.clear();
    this.gfxSun.clear();

    this.gfx.push();
    this.gfx.image(this.sunGlow, 0, 0);
    this.gfx.pop();

    // this.gfxSun.fill(150, 150, 50);
    // this.gfxSun.ellipse(width / 2, height / 2 - 10, 200, 200);

    this.gfxSun.push();
    this.gfxSun.imageMode(CENTER);
    this.gfxSun.translate(width / 2, height / 2);
    this.gfxSun.image(pimg, 0, 0);
    this.gfxSun.pop();

    // cut out parts of the sun
    this.gfxSun.noStroke();
    let y = 20;
    let yPos = frameCount / 10 % 20;
    this.gfxSun.fill(0, 255);
    for (let i = 1; i < 10; ++i) {
      this.gfxSun.rect(0, yPos + 150 + y * i, width, yPos / 20 + pow(i, 1.1));
    }

//BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN, ADD or NORMAL.
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);
    blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height, ADD);
    // image(this.gfx2, 0, 0);
  }
}


/*
 */
class Stars {
  constructor() {
    this.gfx = createGraphics(width, height);
    this.stars = new Array(150);
    this.gfx.fill(255);
    this.gfx.noStroke();

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = {
        x: random() * width * 2,
        y: random() * height / 2,
        s: random() * 3,
        i: 0 + random() * 100
      };
    }
  }

  draw() {
    this.gfx.clear();

    this.stars.forEach(i => {
      this.gfx.fill(255, i.i);
      this.gfx.ellipse(i.x - (i.s * frameCount / 10) % width, i.y, i.s, i.s);
    });

    image(this.gfx, 0, 0);
  }
}


/*
 */
class Grid {
  constructor() {
    this.gfx = createGraphics(width, height);
    // this.gfx.stroke(16, 240, 123);
    this.gfx.stroke(160, 80, 90);
    this.gfx.strokeWeight(1);
  }

  draw() {
    this.gfx.clear();
    let r = 1.5;

    for (let i = 0; i < 20; i++) {
      let y = pow(((i + frameCount / 40) % 15), 2);
      this.gfx.line(0, height / r + y, width, height / r + y);
    }

    for (let i = 0; i < width; i += 10) {
      this.gfx.line(i, height / r, (i - width / 2) * 20, height);
    }

    //BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN, ADD or NORMAL.
    // image(grungeImage, 0, 0);
    blend(grungeImage, 0, 0, width, height, 0, 0, width, height, ADD);

    // blend(grungeImage, 0, 0, width, height, 0, 0, width, height, DIFFERENCE);

    // blend(this.c, 0, 0, width, height, 0, 0, width, height, ADD);
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);

    // noStroke();
    // for (let i = 0; i < height; i += 10) {
    //   fill(0, 255 - (i / height * 255) * 1.5);
    //   rect(0, i - 2, width * 2, 10); // use -2 instead of extra call to rectMode(CENTER)
    // }
  }
}

/*
 */
class ScanLines {
  constructor() {
    this.gfx = createGraphics(width, height);

    this.gfx.stroke(255, 10);
    this.gfx.strokeWeight(1);

    for (let y = 0; y < height; y += 3) {
      this.gfx.line(0, y, width, y);
    }
  }

  draw() {
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, LIGHTEST);
  }
}

function preload() {
  grungeImage = loadImage('data/g.png');
  gradientMap = loadImage('data/6.png');
}

function setup() {
  createCanvas(400, 400);

  let p = new PlanetGenerator();
  pimg = p.create();

  sun = new Sun();
  stars = new Stars();
  scanLines = new ScanLines();
  grid = new Grid();
}

function draw() {
  background(24, 30, 60);

  grid.draw();  
  sun.draw();
  stars.draw();
  scanLines.draw();
}