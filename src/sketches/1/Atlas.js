'use strict';

/*
	img - 
	meta - string
*/
function Atlas(cfg) {
  Object.assign(this, cfg);
  this.split();
}


Atlas.prototype = {
  get() {
  },

  split() {
  	this.frames = {};

    let sheetFrames = JSON.parse(this.meta)['frames'];

    sheetFrames.forEach((f, i) => {
      let filename = f.filename;
      let x = f.frame.x;
      let y = f.frame.y;
      let w = f.frame.w;
      let h = f.frame.h;
      this.frames[filename] = this.img.get(x,y,w,h);
      // console.log(this.frames[f]);
    });
  }
};

module.exports = Atlas;