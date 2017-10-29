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

let animations;
let pausedTime = 0;

let Animation = function(cfg) {
  console.log('Animation ctor');
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);

  this.queue = [];
  this.currAnimation = 0;
  this.frameIdx = 0;
  this.t = 0;
  this.done = false;
  this.complete = function() {};

  animations = {
    'idle': ['idle_normal_0', 'idle_normal_1'],
    'enter': ['enter_normal_0', 'enter_normal_1', 'enter_normal_2'],
    'exit': [ /*'enter_normal_2',*/ 'exit'],
  };
}

Animation.prototype = {

  nextAnimation() {
    this.currAnimation++;
    this.frameIdx = 0;

    if (this.currAnimation === this.queue.length) {
      this.done = true;
      this.complete();
    }
  },

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
    let aniName = this.queue[this.currAnimation];
    if (aniName === '_pause_' || this.done) {
      return null;
    }

    let f = animations[aniName][this.frameIdx];
    return assets.atlases[0].frames[f];
  },

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

  stop() {},
};

module.exports = Animation;