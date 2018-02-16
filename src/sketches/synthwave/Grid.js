/*
 */
class Grid {
  constructor() {
    this.h = 160;

    this.gfx = createGraphics(width, this.h);
    this.gfx.stroke(160, 180, 90);
    this.gfx.strokeWeight(2);
  }

  draw() {
    this.gfx.clear();

    let r = 50;

    // horizontal lines
    for (let i = 0; i < 18; i++) {
      let y = pow((i % 15), 2);
      this.gfx.line(0, this.h / r + y, width, this.h / r + y);
    }

    // perspective lines
    for (let i = 0; i < width; i += 20) {
      this.gfx.line(
        i, 5,
        (i - width / 2) * 20,
        this.h * 5// change constant for perspective
      );
    }

    push();
    translate(0, height - this.h);
    // this.gfx.filter(BLUR, 1);
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);
    pop();
  }
}