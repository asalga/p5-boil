/*
    Elements
    - scanlines
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
let sunNoise;

class PlanetGenerator {

  constructor() {
    this.s = 280;
  }

  create() {
    this.img = createImage(this.s, this.s);
    this.img.loadPixels();

    let xNoiseOffset = 1; //random(0, 10);
    let yNoiseOffset = 5; //random(0, 10);
    let noiseSeedVal = 40; //random(0, 100);

    noiseDetail(20, 0.6);
    noiseSeed(noiseSeedVal);

    for (let x = 0; x < this.img.width; x++) {
      for (let y = 0; y < this.img.height; y++) {

        let xNoise = xNoiseOffset + (x * 0.0021);
        let yNoise = yNoiseOffset + (y * 0.0021);

        let n = noise(xNoise, yNoise);
        // let v = map(n, 0, 1, 0, gradientMap.width - 2);
        // let col = gradientMap.get(v*2, 0);

        let col = 150 + (n * 255);
        let startColor = color(255, 255, 50, 255);

        if (dist(this.s / 2.0, this.s / 2.0, x + 0.5, y + 0.5) <= this.s / 2.0) {
          this.img.set(x, y, col);
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
    this.lines = createGraphics(width, height);
    this.gradientImg = createImage(width, height);
    this.g = createGraphics(width, height);

    this.createColorGradient();

    this.gfx.fill(255, 40, 150);
    this.gfx.ellipse(width / 2, height / 2 - 20, 300, 300);
    this.gfx.filter(BLUR, 20);
    this.sunGlowImg = this.gfx.get(0, 0, width, height);


    // We only want the outer glow of the sun
    // we don't want to blend the pink glow ontop of the sun diffuse color
    this.sunGlowImg.loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {

        if (dist(width / 4 + (200 / 2.0),
            50 + (280 / 2.0), x + 0.5, y + 0.5) <= 280 / 2.0) {
          this.sunGlowImg.set(x, y, color(150, 25, 200));
        }
      }
    }
    this.sunGlowImg.updatePixels();
  }

  createColorGradient() {
    this.gfxColorGradient = createGraphics(width, height);

    let h = 280;
    this.gfxColorGradient.loadPixels();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < h; ++y) {

        let i = y / h;
        let s = 280;

        let lerpR = lerp(250, 255, i);
        let lerpG = lerp(250, 50, i)
        let lerpB = lerp(100, 140, i);

        if (dist(s / 2, s / 2, x + 0.5, y + 0.5) <= s / 2) {

          let c = color(lerpR, lerpG, lerpB);
          // this.gfxColorGradient.stroke(color(lerpR, lerpG, lerpB));
          // this.gfxColorGradient.line(0, y, width, y);
          this.gfxColorGradient.set(x, y, c);
        }
      }
    }
    this.gfxColorGradient.updatePixels();


    this.gradientImg = this.gfxColorGradient.get(0, 0, width, height);

    // this.gfxColorGradient.filter(BLUR, 4);
  }

  draw() {
    this.g.clear();
    this.gfx.clear();
    this.gfxSun.clear();
    this.lines.clear();

    this.gfx.image(this.sunGlowImg, 0, 0);
    // this.gfx.ellipse(width / 2, height / 2 - 10, 200, 200);
    // this.gfxSun.fill(150, 150, 50);

    this.gfxSun.push();
    // this.gfxSun.imageMode(CENTER);
    // this.gfxSun.translate(width / 2, height / 2);
    this.gfxSun.image(sunNoise, 0, 0);
    // this.gfxSun.ellipse(width / 2, height / 2 - 10, 200, 200);
    this.gfxSun.pop();


    // horizontal lines on the lower part of the sun
    this.lines.noStroke();
    let y = 20;
    let yPos = frameCount / 10 % 20;
    this.lines.fill(0, 250);

    this.lines.rect(0, 0, width, 180);
    for (let i = 1; i < 10; ++i) {
      this.lines.rect(0, yPos + 150 + y * i, width, yPos / 20 + pow(i, 1.1));
    }

    // BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, 
    // EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, 
    // DODGE, BURN, ADD or NORMAL.
    // OVERLAY

    // this.gfxColorGradient.blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height,
    // ADD);


    this.gradientImg = this.gfxColorGradient.get(0, 0, width, height);
    // itest.mask(this.lines);
    // image(itest, 0, 0);

    this.gradientImg.mask(this.lines);

    this.g.push();
    this.g.translate(60, 50);
    this.g.image(this.gradientImg, 0, 0);
    // this.gfxColorGradient.mask(this.lines);
    this.g.pop();

    //!!!! use this one
    this.gfxSun.blend(this.gfxColorGradient, 0, 0, width, height, 0, 0, width, height,
      MULTIPLY);

    // blend(this.lines, 0, 0, width, height, 0, 0, width, height,
    // DIFFERENCE);

    // image(this.gfxColorGradient, 0, 0);

    // GLOW
    // blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);

    push();
    translate(60, 50);
    // blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height, SCREEN);
    // image(this.gfxSun, 0, 0);//, width, height, 0, 0, width, height, ADD);
    pop();

    // image(this.gfxColorGradient, 0, 0);
    image(this.g, 0, 0);
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
    this.gfx.stroke(160, 180, 90);
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
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, DODGE);

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
  gradientMap = loadImage('data/_6.png');
}

function setup() {
  createCanvas(400, 400);

  let p = new PlanetGenerator();
  sunNoise = p.create();

  sun = new Sun();
  stars = new Stars();
  scanLines = new ScanLines();
  grid = new Grid();
}

function draw() {
  background(24, 30, 60);

  // grid.draw();
  sun.draw();
  // stars.draw();
  // scanLines.draw();
}