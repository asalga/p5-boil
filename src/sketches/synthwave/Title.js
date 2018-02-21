/*
 */
class Title {
  constructor() {

    this.gfx = createGraphics(width, height);
    let font = loadFont('data/f.otf');

    this.gfx.textAlign(CENTER);
    this.gfx.textFont(font);
    this.gfx.textStyle(BOLD);

    this.titleString = 'BLURRRRY!!!';

    this.blurGfx = createGraphics(width, height, WEBGL);
    this.blurShader = makeBlurShader({ gfx: this.blurGfx, kSize: "5.0" });
  }

  draw() {
    this.gfx.push();

    this.gfx.clear();
    this.gfx.translate(width / 2, 40);

    this.gfx.fill(200);
    this.gfx.textSize(31);
    this.gfx.text(this.titleString, 0, 0);

    // this.gfx.filter(BLUR, 2);
    // this.gfx.fill(255);
    // this.gfx.textSize(30);
    // this.gfx.text(this.titleString, 0, 0);

    this.blurGfx.shader(this.blurShader);
    this.blurShader.setUniform('texture0', this.gfx);
    this.blurShader.setUniform('res', [width, height]);

    this.blurGfx.push();
    this.blurGfx.translate(-width / 2, -height / 2);
    this.blurGfx.rect(0, 0, width, height);
    this.blurGfx.pop();

    // image(blurGfx, 0, 0);

    blend(this.blurGfx, 0, 0, width, height, 0, 0, width, height, ADD);

    this.gfx.pop();
  }
}