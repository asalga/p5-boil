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
let pausedTime = 0;

/*
  cfg {
    p5,
    atlasName
    animations
  }
*/
let Animation = function(cfg) {
  Object.assign(this, cfg || {});
  assets = new Assets(this.p5);
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
      if (this.frameIdx === this.animations[aniName].length) {
        this.nextAnimation();
      }
    }
  },

  /*
    Return null if the animation is paused
  */
  getFrame() {


    // console.log('this.done:', this.done);
    // console.log('aniName', aniName);
    // console.log('this.doesHoldLastFrame:', this.doesHoldLastFrame);
    // console.log('this.animations:', this.animations);
    // console.log('this.animations[aniName]:', this.animations[aniName]);

    // If we are holding the last frame
    if (this.done && this.doesHoldLastFrame) {
      // let aniName = this.queue[this.currAnimation];
      // console.log('hold last frame:', this.doesHoldLastFrame);

      let lastAnim = this.queue[this.currAnimation - 1];
      this.animations[lastAnim];

      var idx = this.animations[lastAnim].length - 1;

      let f = this.animations[lastAnim][idx];
      return assets.atlases[this.atlasName].frames[f];
    }

    if (this.queue.length === 0) {
      console.log('getFrame(): queue is empty');
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
    Once the animation is complete, it will return null
    images unless this method is called.
  */
  holdLastFrame() {
    this.doesHoldLastFrame = true;
  },

  /*
   */
  reset() {
    this.queue = [];
    this.currAnimation = 0;
    this.frameIdx = 0;
    this.t = 0;
    this.done = false;
    this.doesHoldLastFrame = false;
    this.complete = require('./Utils').noop;
    return this;
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

    if (this.done) {
      this.reset();
      this.queue.push(name);
    }

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