let Assets = require('../Assets');
let Animation = require('../Animation');

let instance,
  hitSequence = {
    'hit': ['hit_0', 'hit_1', 'hit_2']
  };

let Max = function(cfg) {

  Object.assign(this, cfg || {});

  if (instance) {
    return instance;
  }
  instance = this;

  assets = new Assets(this.p5);
  this.hitAni = new Animation({
    p5: this.p5,
    animations: hitSequence,
    atlasName: 'max',
    startFrame: 'idle',
    endFrame: 'idle'
  });

  this.render = function() {
    let frame = this.hitAni.getFrame();
    frame && this.p5.image(frame, 0, 70);
  };

  this.hit = function() {
    this.hitAni.play('hit');
  };

  this.update = function(dt) {
    this.hitAni.update(dt);
  };
};

module.exports = Max;