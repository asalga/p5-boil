'use strict';

let Assets = require('./Assets');
let assets;

let Animation = function(cfg) {
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);
  this.t = 0;
  this.frameIdx = 0;
}

Animation.prototype = {
  constructor: Animation,

  update(dt) {
    this.t += dt;
    
    if (this.t >= 500) {
      this.t -= 500;
      this.frameIdx = (this.frameIdx + 1 == this.frames.length) ? 0 : this.frameIdx + 1;
    }
  },

  getFrame() {
    return assets.atlases[0].frames[this.frames[this.frameIdx]];
  }

};

module.exports = Animation;