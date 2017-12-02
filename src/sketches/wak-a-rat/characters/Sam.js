'use strict';

let Assets = require('../Assets');
let Animation = require('../Animation');

let instance;
let nextBlinkTimer = 0;
let nextLickTimer = 0;

let blinkSequence = {
  'blink': ['blink_0', 'blink_1', 'blink_2', 'blink_1', 'blink_0']
};

let lickSequence = {
  'lick': ['t_0', 't_1', 't_2', 't_1', 't_0']
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
    animations: blinkSequence,
    atlasName: 'sam'
  });

  this.lickAni = new Animation({
    p5: this.p5,
    animations: lickSequence,
    atlasName: 'sam'
  });

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);

    this.ani.getFrame() && this.p5.image(this.ani.getFrame(), 443, 70);
    this.lickAni.getFrame() && this.p5.image(this.lickAni.getFrame(), 436, 110);
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;
    nextLickTimer -= dt;

    if (nextBlinkTimer <= 0) {
      nextBlinkTimer = this.getNextBlink();

      this.ani.play('blink')
        .holdLastFrame();
    }

    if (nextLickTimer <= 0) {
      nextLickTimer = this.getNextLickTimer();
      this.lickAni.play('lick')
        .holdLastFrame();
    }

    this.ani && this.ani.update(dt);
    this.lickAni && this.lickAni.update(dt);
  };

  this.getNextBlink = function() {
    return this.p5.random(2, 4) * 1000;
  };

  this.getNextLickTimer = function() {
    return this.p5.random(4, 7) * 1000;
  };
};

module.exports = Sam;