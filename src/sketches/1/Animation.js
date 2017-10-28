'use strict';

/*
  TODO:
    - fix onComplete
    - fix pause
    - figure out standard for queue
 */

let Assets = require('./Assets');
let assets;

const msPerFrame = 150;

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
    'exit': [/*'enter_normal_2',*/ 'exit'],
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
      pausedTime = 1000;
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

  /*
    name - animation name
    count - number of times to play the animation
  */
  play(name, count) {
    if ( typeof count === 'undefined') {
      queue.push(name);
    } else {

      // in case user passes in negative value
      count = this.p5.max(count, 0);

      while (count) {
        queue.push(name);
        count--;
      }
    }
    return this;
  },

  pause(timeInMS) {
    queue.push('_pause_');
    pausedTime = timeInMS;
    return this;
  },

  stop() {},
  onComplete(func) {
    func();
  }
};

module.exports = Animation;