/*
 */
class Title {
  constructor() {

    this.gfx = createGraphics(width, height);
    this.fontBold = loadFont('data/f.otf');
    this.gfx.textAlign(CENTER);
    this.gfx.textFont(this.fontBold);
    this.gfx.textStyle(BOLD);

    this.titleString = 'INNER HEART';
  }

  draw() {
    this.gfx.push();

    this.gfx.clear();
    this.gfx.translate(width / 2, 40);

    this.gfx.fill(200);
    this.gfx.textSize(31);
    this.gfx.text(this.titleString, 0, 0);
    this.gfx.filter(BLUR, 2);

    this.gfx.fill(255);
    this.gfx.textSize(30);
    this.gfx.text(this.titleString, 0, 0);

    blend(this.gfx, 0, 0, width, height, 0, 0, width, height, LIGHTEST);

    this.gfx.pop();
  }
}