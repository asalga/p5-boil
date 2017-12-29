// 'use strict';
// /*
//   Andor Saga
//   Oct 2017

//   Render text using a bitmap.
// */

// let currFont = null;
// let p;

// let BitmapFont = function() {

//   let sheet;
//   this.glyphs = [];
//   this.ready = false;

//   // this.stuff = function(p5) {
//   //   p5.prototype.loadBitmapFont = loadBitmapFont;
//   // }

//   /*
//     Split up the spritesheet
//   */
//   this.splitImage = function(img, cfg) {
//     img.loadPixels();
//     sheet = img;

//     cfg.kerning = cfg.kerning || 0;
//     Object.assign(this, cfg);

//     let charCode = 0;

//     for (let y = 0; y < cfg.rows; ++y) {
//       for (let x = 0; x < cfg.cols; ++x) {

//         let xPos = x * (this.glyphWidth + this.glyphBorder);
//         let yPos = y * (this.glyphHeight + this.glyphBorder);

//         this.glyphs[charCode] = img.get(xPos, yPos, this.glyphWidth, this.glyphHeight);

//         charCode++;
//       }
//     }
//     this.ready = true;
//   }

//   /*
//     asciiCode - number between 0 and 127
//   */
//   this.getGlyph = function(asciiCode) {
//     return this.glyphs[asciiCode];
//   };
// };


// /*
//   sheet
//   callback
//  */
// let loadBitmapFont = function(sheet, cfg, callback) {

//   let newFont = new BitmapFont();

//   p5.prototype.loadImage(sheet, function(img) {
//     newFont.splitImage(img, cfg);
//     callback && callback();
//   });

//   return newFont;
// };


// /*

// */
// let bitmapTextFont = function(font) {
//   currFont = font;
// };


// /*

// */
// p5.prototype.bitmapTextSize = function(size) {};


// /*
//   Similar to text()

//   str - string to render
//   x - render from left to right
//   y - baseline
// */
// let bitmapText = function(str, x, y) {

//   if (currFont == null || !currFont.ready) {
//     return;
//   }

//   // If user tries to pass in zero,
//   // nothing renders, so let's just convert to a string.
//   if (typeof(str) === 'number') {
//     str = '' + str;
//   }

//   for (let i = 0, len = str.length; i < len; ++i) {
//     let asciiCode = str[i].charCodeAt(0) - 32;
//     let glyph = currFont.getGlyph(asciiCode);
//     this.image(glyph, x + (i * (currFont.glyphWidth + currFont.kerning)), y);
//   }
// };

// module.exports = function setupBitmapFont(p5) {
//   p = p5;
//   p5.prototype.loadBitmapFont = loadBitmapFont;
//   p5.prototype.bitmapTextFont = bitmapTextFont;
//   p5.prototype.bitmapText = bitmapText 
// }