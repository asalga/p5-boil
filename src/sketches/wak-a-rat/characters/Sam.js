'use strict';

let Assets = require('../Assets');
let Animation = require('../Animation');

let instance;
let nextBlinkTimer = 0;

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

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);

    let frame = this.ani.getFrame();

    if (frame) {
      this.p5.image(frame, 440, 67);
    }
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;

    if (nextBlinkTimer <= 0) {
      nextBlinkTimer = this.getNextBlink();

      this.ani.play('blink')
        .holdLastFrame();
    }

    this.ani && this.ani.update(dt);
  };

  /*
    
  */
  this.getNextBlink = function() {
    return this.p5.random(1, 3) * 1000;
  };
};

module.exports = Sam;