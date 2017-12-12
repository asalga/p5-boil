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

  var assets = new Assets(this.p5);
  this.blinkAni = new Animation({
    p5: this.p5,
    animations: blinkSequence,
    atlasName: 'sam',
    startFrame: 'blink_0',
    endFrame: 'blink_0'
  });

  this.lickAni = new Animation({
    p5: this.p5,
    animations: lickSequence,
    atlasName: 'sam',
    startFrame: 't_0',
    endFrame: 't_0'
  });

  this.render = function() {
    this.p5.image(assets.get('data/images/sam/sam.png'), 336, 3);

    let blinkFrame = this.blinkAni.getFrame();
    if (blinkFrame) {
      this.p5.image(blinkFrame, 443, 70);
    }

    let lickFrame = this.lickAni.getFrame();
    if (lickFrame) {
      this.p5.image(this.lickAni.getFrame(), 454, 110);
    }

    let data = armData[armFrame];
    if (data) {
      let img = assets.get(data.img);
      this.p5.image(img, data.x, data.y);
    }

  };

  /*
   */
  this.hit = function(idx) {
    const list = ['idle', 'upper_left', 'upper_right',
      'center', 'lower_left', 'lower_right', 'max'
    ];
    hitTimer = 200;
    armFrame = list[idx];
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;
    nextLickTimer -= dt;
    hitTimer -= dt;

    if (hitTimer <= 0) {
      armFrame = 'idle';
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