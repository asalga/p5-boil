'use strict';

/*
  - reqs.
  should be able to chain animations
  need to be able to specify time for animation
  need to be able to interrupt animation
 */

let Assets = require('./Assets');
let assets;

const msPerFrame = 200;

let frameIdx = 0,
  t = 0;

let animations;
let queue;
let currAnimation;

let pausedTime = 0;


let Animation = function(cfg) {
  console.log('Animation ctor');
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);

  animations = {
    'idle': ['idle_normal_0', 'idle_normal_1'],
    'enter': ['enter_normal_0', 'enter_normal_1', 'enter_normal_2'],
    'exit': ['enter_normal_2', 'exit'],
  };
  queue = [];
  currAnimation = 0;
}

Animation.prototype = {

  nextAnimation() {
    currAnimation++;
    frameIdx = 0;

    if (currAnimation === queue.length) {
      currAnimation = 0;
      frameIdx = 0;
      pausedTime = 2000;
    }
  },

  update(dt) {
    // get the name of the animation ie) 'idle'    
    let aniName = queue[currAnimation];
    if (!aniName) {
      return;
    }


    if (aniName === '_pause_' && pausedTime > 0) {
      pausedTime -= dt;
      ///console.log(pausedTime);

      if (pausedTime < 0) {
        pausedTime = 0;
        this.nextAnimation();
      }
      return;
    }


    t += dt;
    if (t >= msPerFrame) {

      t -= msPerFrame;
      frameIdx++;

      // reached the end of the animation
      if (frameIdx === animations[aniName].length) {
        this.nextAnimation();
      }
    }
  },

  /*
    Return null if the animation is paused
  */
  getFrame() {
    let aniName = queue[currAnimation];
    if (aniName === '_pause_') {
      return null;
    }

    let f = animations[aniName][frameIdx];
    return assets.atlases[0].frames[f];
  },

  play(name, count) {
    queue.push(name);
    return this;
  },

  pause(timeInMS) {
    queue.push('_pause_');
    pausedTime = timeInMS;
    return this;
  },

  stop() {},
  onComplete() {}
};

module.exports = Animation;