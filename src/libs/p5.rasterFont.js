/*
	Andor Saga
	RasterFont
	Oct 2017

	Render text using a bitmap rather than a font type.
*/


let currFont = null;

let RasterFont = function() {
  console.log('RasterFont ctor');

  this.glyphs = [];
  let sheet;
  this.ready = false;
  this.glyphWidth = 14;

  this.splitImage = function(img) {
    img.loadPixels();
    sheet = img;


    let glyphHeight = 14;
    let border = 2;
    let charCode = 0;

    for (let y = 0; y < 12; ++y) {
      for (let x = 0; x < 8; ++x) {

        let test = img.get(x * (this.glyphWidth + border), y * (glyphHeight + 2), this.glyphWidth, glyphHeight);
        this.glyphs[charCode] = test;
        charCode++;
      }
    }
    this.ready = true;
  }

  this.getGlyph = function(char) {
    return this.glyphs[char];
  };
};




/*
 */
p5.prototype.loadRasterFont = function(i, func) {

  let newFont = new RasterFont();

  p5.prototype.loadImage(i, function(img) {
    newFont.splitImage(img);
    func();
  });

  return newFont;
};



/*

*/
p5.prototype.rasterTextFont = function(font) {
  currFont = font;
};


/*

*/
p5.prototype.rasterTextSize = function(size) {
};


/*

*/
p5.prototype.rasterText = function(str, x, y) {

  if (currFont.ready) {
    str.split('').forEach((v, i) => {
      let glyph = currFont.getGlyph(str.charCodeAt(i) - 32);
      image(glyph, x + (i * (currFont.glyphWidth + 2)), y);
    });
  }
};