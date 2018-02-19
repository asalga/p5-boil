/*
	- basically need to do everything
*/
let mountainHeight = 250;
let mountainWidth = 200;
let _strokeWeight;

class Mountain {

  constructor() {
    this.gfx = createGraphics(width, height);
  }

  drawMountainBlur() {
    this.gfx.strokeWeight(5);

    this.gfx.fill(30, 60, 100, 128);

    this.gfx.stroke(60, 150, 200, 255)

    this.gfx.push();
    this.gfx.translate(width / 2, height / 2 - 100);
    this.gfx.triangle(0, 0, -mountainWidth - 0, mountainHeight, mountainWidth + 0, mountainHeight);

    // base of mountian
    this.gfx.stroke(25, 170, 200, 255)
    this.gfx.line(-width, mountainHeight, width, mountainHeight);
    this.gfx.pop();
    this.gfx.filter(BLUR, 2);
  }

  drawMountain() {
    this.gfx.fill(33, 66, 99, 128);
    this.gfx.strokeWeight(2);
    // this.gfx.stroke(60, 150, 200, 210)
    this.gfx.stroke(255);

    this.gfx.push();
    this.gfx.translate(width / 2, height / 2 - 100);
    this.gfx.triangle(0, 0, -mountainWidth, mountainHeight, mountainWidth, mountainHeight);

    // base of mountian
    this.gfx.stroke(255);
	this.gfx.strokeWeight(1);
    this.gfx.line(-width, mountainHeight, width, mountainHeight);
    this.gfx.pop();
  }

  draw() {
    this.gfx.clear();

    this.drawMountainBlur();
    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, ADD);

    this.drawMountain();
    image(this.gfx, 0, 0);
  }
}