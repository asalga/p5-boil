/*
  Animation.js
  
  TODO:
    - fix onComplete
    - figure out standard for queue
*/
'use strict';

let Assets = require('./Assets');
let assets;

const msPerFrame = 150;
let pausedTime = 0;

/*
  cfg {
    {Object} p5
    {Array} animations - array
    {String} atlasName
    {String} startFrame
  }
*/
let Animation = function(cfg) {
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);
  this.firstTime = true;
  this.reset();
};

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
      this.isPlaying = false;
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

    // this.t += dt;
    this.t += dt;
    if (aniName !== '_pause_' && this.t >= msPerFrame) {

      this.t -= msPerFrame;
      this.frameIdx++;

      // reached the end of the animation
      if (this.frameIdx === this.animations[aniName].length) {
        this.nextAnimation();
      }
    }
  },

  /*
    Return null if the animation is paused
  */
  getFrame() {
    // If the animation playing hasn't started yet, but we
    // still need to show a frame, so the animation image
    // doesn't just 'jump' into existance
    if (!this.started && this.startFrame && this.firstTime) {
      return assets.atlases[this.atlasName].frames[this.startFrame];
    }

    // Animation has finished and we need to maintain the last frame.
    if (this.done && this.endFrame) {
      this.firstTime = false;
      return assets.atlases[this.atlasName].frames[this.endFrame];
    }

    //
    if (this.queue.length === 0) {
      // console.log('getFrame(): queue is empty');
      return null;
    }

    let aniName = this.queue[this.currAnimation];
    // let aniName = this.queue[this.currAnimation];
    if (aniName === '_pause_' || this.done) {
      return null;
    }

    let f = this.animations[aniName][this.frameIdx];
    return assets.atlases[this.atlasName].frames[f];
  },

  /*
   */
  reset() {
    // console.log('reset:', this.name);
    this.queue = [];
    this.currAnimation = 0;
    this.isPlaying = false;
    this.frameIdx = 0;
    this.t = 0;
    this.done = false;
    this.started = false;
    this.complete = require('./Utils').noop;

    return this;
  },

  /*
   */
  onComplete(f) {
    // console.log('onComplete');
    this.complete = f;
    return this;
  },

  /*
    name - animation name
    count - {optional} number of times to play the animation
  */
  play(name, count) {
    // console.log('play:', this.name);

    this.started = true;
    this.isPlaying = true;

    // If the animation is already finished, we'll need to reset it so 
    // it can replay.
    if (this.done) {
      this.reset();
    }

    if (typeof count === 'undefined') {
      this.queue.push(name);
    } else {
      // in case user passes in negative value
      count = Math.max(count, 0);

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
    // console.log('pause:', this.name);
    if (timeInMS > 0) {
      this.queue.push('_pause_');
      pausedTime = timeInMS;
    }
    return this;
  },

  /*
   */
  stop() {
    // console.log('stop:', this.name);
    this.t = 0;
    this.frameIdx = 0;
    this.currAnimation = 0;
    this.queue = [];
    this.isPlaying = false;
    return this;
  },
};

module.exports = Animation;