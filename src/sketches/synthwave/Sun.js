/*
    Sun TODO:
        - re-add noise
        - add soft-edge
        - move blur to shader
        - remove center pink glow
*/

// BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, 
// EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, 
// DODGE, BURN, ADD, NORMAL

const SunSize = 280;
const BlurOffset = 60;

class PlanetGenerator {

  constructor() {}

  create() {
    this.img = createImage(SunSize, SunSize);
    this.img.loadPixels();

    let xNoiseOffset = 1; //random(0, 10);
    let yNoiseOffset = 5; //random(0, 10);
    let noiseSeedVal = 40; //random(0, 100);

    noiseDetail(20, 0.6);
    noiseSeed(noiseSeedVal);

    for (let x = 0; x < this.img.width; ++x) {
      for (let y = 0; y < this.img.height; ++y) {

        let xNoise = xNoiseOffset + (x * 0.002);
        let yNoise = yNoiseOffset + (y * 0.002);

        let n = noise(xNoise, yNoise);
        // let v = map(n, 0, 1, 0, gradientMap.width - 2);
        // let col = gradientMap.get(v*2, 0);

        let col = 150 + (n * 255);
        let startColor = color(255, 255, 50, 255);

        if (dist(SunSize / 2, SunSize / 2, x + 0.5, y + 0.5) <= SunSize / 2) {
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

    this.gfxGlow = createGraphics(SunSize + BlurOffset, SunSize + BlurOffset);
    this.gfxSun = createGraphics(width, height);
    this.lines = createGraphics(width, height);
    this.gradientImg = createImage(width, height);
    this.g = createGraphics(width, height);

    this.createColorGradient();

    // BLURRY TIME!
    this.gfxGlow.fill(255, 40, 150);
    this.gfxGlow.ellipse(this.gfxGlow.height / 2, this.gfxGlow.height / 2, SunSize, SunSize);

    this.gfxGlow.fill(100,40, 100);
    this.gfxGlow.ellipse(this.gfxGlow.height / 2, this.gfxGlow.height / 2, SunSize-50, SunSize-50);

    this.gfxGlow.filter(BLUR, 20);
    this.sunGlowImg = this.gfxGlow.get(0, 0, this.gfxGlow.width, this.gfxGlow.height);

    // We only want the outer glow of the sun
    // // we don't want to blend the pink glow ontop of the sun diffuse color
    // this.sunGlowImg.loadPixels();
    // for (let x = 0; x < width; x++) {
    //   for (let y = 0; y < height; y++) {
    //     if (dist(width / 2 + (200 / 2), (SunSize / 2), x + 0.5, y + 0.5) <= SunSize / 2) {
    //        this.sunGlowImg.set(x, y, color(150, 25, 200));
    //     }
    //   }
    // }
    // this.sunGlowImg.updatePixels();
  }


  /*
   */
  createColorGradient() {
    this.gfxColorGradient = createGraphics(width, height);

    this.gfxColorGradient.loadPixels();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < SunSize; ++y) {

        let i = y / SunSize;

        let lerpR = lerp(250, 255, i);
        let lerpG = lerp(250, 50, i)
        let lerpB = lerp(100, 140, i);

        if (dist(SunSize / 2, SunSize / 2, x + 0.5, y + 0.5) <= SunSize / 2) {

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
    this.gfxGlow.clear();
    this.gfxSun.clear();
    this.lines.clear();

    this.gfxGlow.image(this.sunGlowImg, 0, 0);
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
    let yPos = (frameCount / 5) % 20;

    let bannerHeight = 10;

    this.lines.fill(255, 255);
    this.lines.noStroke();

    this.lines.push();
    for (let i = 0; i < 30; ++i) {
      this.lines.translate(0, ((i * 20) + yPos) / 20);
      this.lines.rect(0, -bannerHeight, width, bannerHeight);

      // this.lines.rect(0, -bannerHeight + yPos + (20 * i), width, bannerHeight);
      // this.lines.rect(0,yPos + 150 + y * i,width,yPos / 20 + pow(i, 1.1));
    }
    this.lines.pop();

    // this.gfxColorGradient.blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height,ADD);

    this.gradientImg = this.gfxColorGradient.get(0, 0, width, height);
    this.gradientImg.mask(this.lines);

    // this.gfxSun.blend(this.gfxColorGradient, 0, 0, width, height, 0, 0, width, height, MULTIPLY);
    // blend(this.lines, 0, 0, width, height, 0, 0, width, height,DIFFERENCE);

    let ySunPos = 50;



    // SUN GLOW
    push();
    imageMode(CENTER);
    translate(width / 2 - this.gfxGlow.width / 2, ySunPos - 40);
    blend(this.gfxGlow, 0, 0, width, height, 0, 0, width, height, ADD);
    pop();


    // GRADIENT IMAGE / ACTUAL SUN
    this.g.image(this.gradientImg, 0, 0);
    push();
    translate(width / 2 - SunSize / 2, ySunPos);
    image(this.g, 0, 0);
    // blend(this.gfxSun, 0, 0, width, height, 0, 0, width, height, SCREEN);
    // image(this.gfxSun, 0, 0);
    pop();

    // image(this.gfxColorGradient, 0, 0);
  }
}