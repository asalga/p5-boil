/*
  Grid TODO:
  - change color based on y position
  - animate lines
  - move blur to shader
 */


let gridHeight = 160;

class Grid {

  createColorGradient() {
    this.gfxColorGradient = createGraphics(width, gridHeight);
    this.lines = createGraphics(width, gridHeight);
    this.gfxColorGradient.loadPixels();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < gridHeight; ++y) {

        let i = y / gridHeight;

        let colA = color(255, 100, 100);
        let colB = color(200, 50, 100);

        let c = lerpColor(colA, colB, i);

        this.gfxColorGradient.set(x, y, c);
      }
    }
    this.gfxColorGradient.updatePixels();

    this.gradientImg = this.gfxColorGradient.get(0, 0, width, gridHeight);
  }

  constructor() {
    this.h = 160;
    this.gfx = createGraphics(width, this.h);
    this.gridColorGradient = createGraphics(width, this.h);

    this.gradientImg = createImage(width, gridHeight);
    this.createColorGradient();
  }

  drawLines(s) {
    this.lines.clear();

    let r = 50;

    // horizontal lines
    for (let i = s; i < 16; i++) {
      let y = pow((i % 15), 2);
      this.lines.line(0, 1 + this.h / r + y, width, 1 + this.h / r + y);
    }

    // perspective lines
    for (let i = 0; i < width; i += 20) {
      this.lines.line(
        i, 5,
        (i - width / 2) * 20,
        this.h * 5 // change constant for perspective
      );
    }
  }

  draw() {
    // BLURRY LINES
    // this.gfx.stroke(160, 180, 90);
    // this.gfx.stroke(220, 60, 120);
    this.lines.stroke(255);
    this.lines.strokeWeight(2);
    this.drawLines(5);
    this.lines.filter(BLUR, 2);

    push();
    // translate(0, height - this.h);
    // blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);
    pop();

    this.gradientImg = this.gfxColorGradient.get(0, 0, width, gridHeight);
    this.gradientImg.mask(this.lines);

    // CLEAR LINES
    // this.gfx.stroke(10, 255, 255);
    // this.gfx.stroke(220, 60, 120);

    push();
    translate(0, height - this.h);
    // this.gfx.image(this.gfx, 0, 0);
    image(this.gradientImg, 0, 1);
    // blend(this.gradientImg, 0, 0, width, height, 0, 0, width, height, SCREEN);
    pop();

    this.lines.clear();
    this.lines.stroke(255);
    this.lines.strokeWeight(2);
    this.drawLines(2);

    this.gradientImg = this.gfxColorGradient.get(0, 0, width, gridHeight);
    this.gradientImg.mask(this.lines);

    push();
    translate(0, height - this.h);
    // this.gfx.image(this.gfx, 0, 0);
    image(this.gradientImg, 0, 0);
    //blend(this.gfx, 0, 0, width, height, 0, 0, width, height, SCREEN);
    pop();

  }
}