'use strict';

let Assets = require('../Assets');
let Animation = require('../Animation');

let instance;

let animationSequences = {
  'blink': ['blink_0', 'blink_1', 'blink_2', 'blink_1', 'blink_0']
};

/*

*/
let Sam = function(cfg) {
  Object.assign(this, cfg || {});

  if (instance) {
    return instance;
  }
  instance = this;

  var assets = new Assets(this.p5);
  this.ani = new Animation({
    p5: this.p5,
    animations: animationSequences,
    atlasName: 'sam'
  });

  this.ani.play('blink')
    .holdLastFrame();

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);

    let i = parseInt(this.p5.random(0, 500));
    if (i === 0) {
      console.log('blink');
      this.ani.play('blink')
        .holdLastFrame();
    }

    let frame = this.ani.getFrame();

    if (frame) {
      this.p5.image(frame, 440, 67);
    }
  };

  this.update = function(dt) {
    this.ani && this.ani.update(dt);
  };
};

module.exports = Sam;