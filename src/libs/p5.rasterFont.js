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

  this.splitImage = function(img) {
    img.loadPixels();
    sheet = img;

    this.glyphs['a'] = img.get(0, 0, 100, 100);


  }
  ///splitImage();

  this.getGlyph = function(char) {
    return this.glyphs['a'];
  };
};




/*
 */
p5.prototype.loadRasterFont = function(i, func) {

  let newFont = new RasterFont();


  p5.prototype.loadImage(i, function(img) {
    console.log('image loaded');


    newFont.splitImage(img);
    func();

  });

  console.log('>>', newFont);
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
//p5.prototype._registerPreloadFunc('loadRasterFont', p5.prototype);


/*

*/
p5.prototype.rasterText = function(str, x, y) {

  let g = currFont.getGlyph(str[0]);

  if (g) {
    image(g, x, y);
  }
  // console.log(p5.prototype.image);
  // console.log(image);

  // p5.rect(0,0,1200,100);

};