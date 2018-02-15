
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