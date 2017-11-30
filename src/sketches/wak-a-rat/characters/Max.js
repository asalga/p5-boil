let Assets = require('../Assets');

let instance;

let Max = function(cfg) {

  Object.assign(this, cfg || {});

  if (instance) {
    return instance;
  }
  instance = this;

  assets = new Assets(this.p5);

  this.render = function() {
    this.p5.image(assets.get('data/images/max/head.png'), 0, 74);
    this.p5.image(assets.get('data/images/max/hand.png'), 0, 280);
  };

  this.update = function(dt) {};
};

module.exports = Max;