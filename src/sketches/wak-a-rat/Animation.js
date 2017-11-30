'use strict';

/*
  TODO:
    - fix onComplete
    - fix pause
    - figure out standard for queue
 */

let Assets = require('./Assets');
let Utils = require('./Utils');
let assets;

const msPerFrame = 150;

let animations;
let pausedTime = 0;

let Animation = function(cfg) {
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);

  this.reset();

  animations = {
    'hurt_0': ['hit_0_0', 'hit_0_1'],
    'hurt_1': ['hit_1_0', 'hit_1_1'],
    'hurt_2': ['hit_2_0', 'hit_2_1'],

    'enter_0': ['enter_0_0', 'enter_0_1', 'enter_0_2'],
    'enter_1': ['enter_1_0', 'enter_1_1', 'enter_1_2'],
    'enter_2': ['enter_2_0', 'enter_2_1', 'enter_2_2'],

    'idle_0': ['idle_0_0', 'idle_0_1'],
    'idle_1': ['idle_1_0', 'idle_1_1'],
    'idle_2': ['idle_2_0', 'idle_2_1'],

    'exit': ['exit'],
  };
}

Animation.prototype = {

  /*
  */
  nextAnimation() {
    this.currAnimation++;
    this.frameIdx = 0;

    if (this.currAnimation === this.queue.length) {
      this.done = true;
      this.complete();
    }
  },

  /*
   */
  update(dt) {

    if (this.done) {
      return;
    }

    // get the name of the animation ie) 'idle'
    let aniName = this.queue[this.currAnimation];
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

    if (typeof aniName === 'function') {
      aniName();
    }

    this.t += dt;
    if (aniName !== '_pause_' && this.t >= msPerFrame) {

      this.t -= msPerFrame;
      this.frameIdx++;

      // reached the end of the animation
      if (this.frameIdx === animations[aniName].length) {
        this.nextAnimation();
      }
    }
  },

  /*
    Return null if the animation is paused
  */
  getFrame() {
    if (this.queue.length === 0) {
      console.log('getFrame(): queue is empty');
      return null;
    }

    let aniName = this.queue[this.currAnimation];
    if (aniName === '_pause_' || this.done) {
      return null;
    }

    // console.log(aniName, animations[aniName]);
    let f = animations[aniName][this.frameIdx];
    return assets.atlases['rat1'].frames[f];
  },

  /*
   */
  reset() {
    this.queue = [];
    this.currAnimation = 0;
    this.frameIdx = 0;
    this.t = 0;
    this.done = false;
    this.complete = Utils.noop;
  },

  /*
   */
  onComplete(f) {
    this.complete = f;
    return this;
  },

  /*
    name - animation name
    count - {optional} number of times to play the animation
  */
  play(name, count) {
    if (typeof count === 'undefined') {
      this.queue.push(name);
    } else {
      // in case user passes in negative value
      count = this.p5.max(count, 0);

      while (count) {
        this.queue.push(name);
        count--;
      }
    }
    return this;
  },

  /*
   */
  pause(timeInMS) {
    if (timeInMS > 0) {
      this.queue.push('_pause_');
      pausedTime = timeInMS;
    }
    return this;
  },

  /*
   */
  stop() {
    this.t = 0;
    this.frameIdx = 0;
    this.currAnimation = 0;
    this.queue = [];
    return this;
  },
};

module.exports = Animation;