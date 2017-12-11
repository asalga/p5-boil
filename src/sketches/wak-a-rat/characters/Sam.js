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
    //this.p5.image(assets.get('data/images/sam/arms/images/arm_idle.png'), 224, 90);


    // FInal coords
    // this.p5.image(assets.get('data/images/sam/arms/images/final_center.png'), 198, 119);
    // this.p5.image(assets.get('data/images/sam/arms/images/final_lower_left.png'), 61, 125);
    // this.p5.image(assets.get('data/images/sam/arms/images/final_lower_right.png'),233, 132);// this.p5.mouseX, this.p5.mouseY);
    // this.p5.image(assets.get('data/images/sam/arms/images/final_upper_right.png'), 254, 115);
    this.p5.image(assets.get('data/images/sam/arms/images/final_upper_left.png'), 158, 133);
    
    




    let blinkFrame = this.blinkAni.getFrame();
    if (blinkFrame) {
      this.p5.image(blinkFrame, 443, 70);
    }

    let lickFrame = this.lickAni.getFrame();
    if (lickFrame) {
      this.p5.image(this.lickAni.getFrame(), 454, 110);

      //this.p5.mouseX, this.p5.mouseY);
      //448, 120);
    }
  };

  /*
   */
  this.update = function(dt) {
    nextBlinkTimer -= dt;
    nextLickTimer -= dt;

    if (nextBlinkTimer <= 0) {
      nextBlinkTimer = this.getNextBlink();
      this.blinkAni.play('blink');
    }

    if (nextLickTimer <= 0) {
      nextLickTimer = this.getNextLickTimer();
      this.lickAni.play('lick');
    }

    // let blink_ = this.blinkAni;
    // if(blink_){
    this.blinkAni.update(dt);
    // }

    // this.lickAni && 
    this.lickAni.update(dt);
  };
};

module.exports = Sam;