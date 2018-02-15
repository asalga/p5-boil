
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