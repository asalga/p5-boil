'use strict';

/*
  cfg{
   img - p5Image
   meta - string
  }
*/
function Atlas(cfg) {
  Object.assign(this, cfg);
  this.split();
}

Atlas.prototype = {
  get() {},

  split() {
    this.frames = {};

    let sheetFrames = JSON.parse(this.meta)['frames'];

    sheetFrames.forEach((f, i) => {

      // remove '.png' part of filename, we don't need it.
      let filename = (f.filename).split('.')[0];

      let x = f.frame.x;
      let y = f.frame.y;
      let w = f.frame.w;
      let h = f.frame.h;
      this.frames[filename] = this.img.get(x, y, w, h);
    });
  }
};

module.exports = Atlas;