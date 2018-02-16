/*
 */
class Grid {
  constructor() {
    this.h = 160;

    this.gfx = createGraphics(width, this.h);


  }

  drawLines() {
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
        this.h * 5 // change constant for perspective
      );
    }
  }

  draw() {

    // BLURRY LINES
    this.gfx.stroke(160, 180, 90);
    this.gfx.strokeWeight(3);
    this.drawLines();
    this.gfx.filter(BLUR, 2);

    push();
    translate(0, height - this.h);
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);
    pop();


    // CLEAR LINES
    this.gfx.stroke(10, 255, 255);
    this.gfx.strokeWeight(1);
    this.drawLines();

    push();
    translate(0, height - this.h);
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, SCREEN);
    pop();
  }
}