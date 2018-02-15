// BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, 
// EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, 
// DODGE, BURN, ADD or NORMAL.
// OVERLAY

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

    this.img.updatePixels();
    return this.img;
  }
}



class Sun {
  constructor() {

      let p = new PlanetGenerator();
  this.sunNoise = p.create();


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
    this.gfxSun.image(this.sunNoise, 0, 0);
    // this.gfxSun.ellipse(width / 2, height / 2 - 10, 200, 200);
    this.gfxSun.pop();

    // horizontal lines on the lower part of the sun
    this.lines.noStroke();
    let y = 20;
    let yPos = frameCount / 10 % 20;

    // this.lines.fill(50, 255);
    // this.lines.rect(0, 0, width, height);

    this.lines.fill(255, 255);
    this.lines.noStroke();

    this.lines.push();
    this.lines.rect(0, 0, width, 180);
    for (let i = 1; i < 10; ++i) {
      this.lines.rect(0, yPos + 150 + y * i, width, yPos / 20 + pow(i, 1.1));
    }
    this.lines.pop();

    // this.gfxColorGradient.blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height,ADD);

    this.gradientImg = this.gfxColorGradient.get(0, 0, width, height);
    this.gradientImg.mask(this.lines);

    this.g.push();
    this.g.image(this.gradientImg, 0, 0);
    this.g.pop();

    this.gfxSun.blend(this.gfxColorGradient, 0, 0, width, height, 0, 0, width, height,
      MULTIPLY);

    // blend(this.lines, 0, 0, width, height, 0, 0, width, height,
    // DIFFERENCE);

    // image(this.gfxColorGradient, 0, 0);

    // GLOW
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);

    push();
    translate(60, 50);
    image(this.g, 0, 0);
    // blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height, SCREEN);
    // image(this.gfxSun, 0, 0);
    pop();

    // image(this.gfxColorGradient, 0, 0);
  }
}