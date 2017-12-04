'use strict';

let Assets = require('../Assets');
let Animation = require('../Animation');

let instance;

let nextBlinkTimer,
  blinkSequence = {
    'blink': ['blink_0', 'blink_1', 'blink_2', 'blink_1', 'blink_0']
  };

let nextLickTimer,
  lickSequence = {
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

  this.getNextBlink = function() {
    return this.p5.random(2, 4) * 1000;
  };

  this.getNextLickTimer = function() {
    return this.p5.random(4, 7) * 1000;
  };

  nextBlinkTimer = this.getNextBlink();
  nextLickTimer = this.getNextLickTimer();

  var assets = new Assets(this.p5);
  this.blinkAni = new Animation({
    p5: this.p5,
    animations: blinkSequence,
    atlasName: 'sam'
  });
  this.startFrame('eyes_0');
  
  // this.blinkAni.holdFirstFrame();

  // .holdFirstFrame()
  // .holdLastFrame();

  // this.lickAni = new Animation({
  //   p5: this.p5,
  //   animations: lickSequence,
  //   atlasName: 'sam'
  // });

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);

    this.blinkAni.getFrame() && this.p5.image(this.blinkAni.getFrame(), 443, 70);
    // this.lickAni.getFrame() && this.p5.image(this.lickAni.getFrame(), 436, 110);
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;
    nextLickTimer -= dt;

    if (nextBlinkTimer <= 0) {
      nextBlinkTimer = this.getNextBlink();
      console.log('blink >>', nextBlinkTimer);

      this.blinkAni.play('blink')
        .holdLastFrame()
        .holdFirstFrame();
    }

    if (nextLickTimer <= 0) {
      nextLickTimer = this.getNextLickTimer();
      // this.lickAni.play('lick')
        // .holdLastFrame()
        // .holdFirstFrame();
    }

    this.blinkAni && this.blinkAni.update(dt);
    // this.lickAni && this.lickAni.update(dt);
  };
};

module.exports = Sam;