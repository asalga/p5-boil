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

