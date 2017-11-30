let Assets = require('../Assets');

let instance;

let Sam = function(cfg) {

  Object.assign(this, cfg || {});

  if (instance) {
    return instance;
  }
  instance = this;

  assets = new Assets(this.p5);

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);
  };

  this.update = function(dt) {

  };
};

module.exports = Sam;