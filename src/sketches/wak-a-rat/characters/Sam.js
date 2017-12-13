'use strict';

let Assets = require('../Assets');
let Animation = require('../Animation');

let instance;

let nextBlinkTimer,
  blinkSequence = {
    'blink': ['eyes_0', 'eyes_1', 'eyes_2', 'eyes_1', 'eyes_0']
  };

let nextLickTimer,
  lickSequence = {
    'lick': ['tongue_0', 'tongue_1', 'tongue_2', 'tongue_1', 'tongue_0']
  };

let armFrame = 'idle';
let hitTimer = 0;

//
let armData = {
  'idle': {
    x: 224,
    y: 90,
    img: 'data/images/sam/arms/images/idle.png'
  },
  'max': {
    x: 39,
    y: 124,
    img: 'data/images/sam/arms/images/max.png'
  },
  'center': {
    x: 198,
    y: 119,
    img: 'data/images/sam/arms/images/center.png'
  },
  'lower_left': {
    x: 61,
    y: 125,
    img: 'data/images/sam/arms/images/lower_left.png'
  },
  'lower_right': {
    x: 233,
    y: 132,
    img: 'data/images/sam/arms/images/lower_right.png'
  },
  'upper_right': {
    x: 254,
    y: 115,
    img: 'data/images/sam/arms/images/upper_right.png'
  },
  'upper_left': {
    x: 157,
    y: 133,
    img: 'data/images/sam/arms/images/upper_left.png'
  }
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
    return this.p5.random(1, 4) * 1000;
  };

  this.getNextLickTimer = function() {
    return this.p5.random(2, 7) * 1000;
  };

  nextBlinkTimer = this.getNextBlink();
  nextLickTimer = this.getNextLickTimer();
  this.slotHit = -1;

  var assets = new Assets(this.p5);
  this.blinkAni = new Animation({
    p5: this.p5,
    animations: blinkSequence,
    atlasName: 'sam',
    startFrame: 'eyes_0',
    endFrame: 'eyes_0'
  });

  this.lickAni = new Animation({
    p5: this.p5,
    animations: lickSequence,
    atlasName: 'sam',
    startFrame: 'tongue_0',
    endFrame: 'tongue_0'
  });

  /*
    Need to make sure rats are rendered above the 
    body but below the arm.
  */
  this.renderBody = function() {
    this.p5.image(assets.get('data/images/sam/sam.png'), 336, 3);
    let blinkFrame = this.blinkAni.getFrame();
    if (blinkFrame) {
      this.p5.image(blinkFrame, 443, 70);
    }

    let lickFrame = this.lickAni.getFrame();
    if (lickFrame) {
      this.p5.image(this.lickAni.getFrame(), 454, 110);
    }
  };

  this.renderArm = function() {
    let data = armData[armFrame];
    if (data) {
      let img = assets.get(data.img);
      this.p5.image(img, data.x, data.y);
    }
  };

  this.getArmPosition = function() {
    return this.slotHit;
  };

  /*
   */
  this.hit = function(slotIdx) {
    const slotNames = ['upper_left', 'lower_left', 'center', 'upper_right', 'lower_right', 'max'];
    hitTimer = 150;
    this.slotHit = slotIdx;
    armFrame = slotNames[slotIdx];
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;
    nextLickTimer -= dt;
    hitTimer -= dt;

    if (hitTimer <= 0) {
      armFrame = 'idle';
      this.slotHit = -1;
    }

    if (nextBlinkTimer <= 0) {
      nextBlinkTimer = this.getNextBlink();
      this.blinkAni.play('blink');
    }

    if (nextLickTimer <= 0) {
      nextLickTimer = this.getNextLickTimer();
      this.lickAni.play('lick');
    }

    this.blinkAni.update(dt);
    this.lickAni.update(dt);
  };
};

module.exports = Sam;