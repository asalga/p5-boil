'use strict';

/*
  Singleton for managing the rats
*/

let Character = require('./Character');
let Utils = require('./Utils');

const HitboxWidth = 80;
const HitBoxHeight = 26;

let hitBoxPositions = [
  { x: 164, y: 260 }, // top
  { x: 70, y: 310 }, // bottom left
  { x: 210, y: 300 }, // center
  { x: 344, y: 286 }, // far right
  { x: 250, y: 340 } // bottom
];

// these coordinates are the slot positions offset
// by the rat image coords. so they can be used directly with image()
let ratSlotCoords = [
  { x: 146, y: 164 }, //top
  { x: 54, y: 212 }, // bottom left
  { x: 190, y: 202 }, //center
  { x: 329, y: 188 }, //far right
  { x: 232, y: 246 } // bottom
];

let instance;

let Board = (function() {

  let freeSlots = [2, 4, 0, 1, 3],
    ratsOut = [],
    ratsIn = [],
    t,
    numMisses = 0,
    numHits = 0;

  if (instance) {
    return instance;
  }
  instance = this;

  /*
    p - point object with x and y properties
  */
  this.hit = function(p) {

    hitBoxPositions.forEach((c, i) => {
      let slotID = i;
      let rect = {
        x: c.x,
        y: c.y,
        w: HitboxWidth,
        h: HitBoxHeight
      };

      if (Utils.pointInRect(p, rect)) {

        // We hit one of the slots, is it occupied?
        ratsOut.forEach((r, i) => {
          console.log(r.slotID, slotID);
          if (r.slotID === slotID) {
            r.hit();
          }
        });
        return i;
      }
    });
    return -1;
  };

  /*
    Let the GameBoard know this slot can now be re-used
  */
  this.freeSlot = function(rat) {
    freeSlots.push(rat.slotID);
    // this.p5.shuffle(freeSlots, true);

    let idx = ratsOut.indexOf(rat);
    if (idx !== -1) {
      ratsIn.push(ratsOut.splice(idx, 1)[0]);
    }
    rat.slotID = -1;
  };

  /*
   */
  this.update = function(dt) {
    t += dt;
    ratsOut.forEach(r => r.update(dt));
  };

  this.increaseMisses = function() {
    numMisses++;
  };

  this.increaseHits = function() {
    numHits++;
  };

  this.getNumMisses = function() { return numMisses };
  this.getNumHits = function() { return numHits };

  /*
   */
  this.render = function() {
    ratsOut.forEach(r => r.render());

    this.p5.fill(33, 66, 99, 200);
    this.p5.stroke(255);
    hitBoxPositions.forEach(b => {
      this.p5.rect(b.x, b.y, HitboxWidth, HitBoxHeight);
    });
    this.p5.stroke(255, 0, 0);




    this.p5.text("in: " + ratsIn.length, 100, 100);
    this.p5.text("out: " + ratsOut.length, 100, 140);

    this.p5.text(numHits, 30, 30);
    this.p5.text(numMisses, 60, 30);
  };

  /*
   */
  this.pushOutRat = function() {
    if (freeSlots.length === 0) {
      console.log('no free slots!');
      return;
    }

    let rat;
    let slotIdx = freeSlots.pop();

    // First let's see if there are any ratsIn in the queue.
    if (ratsIn.length > 0) {
      rat = ratsIn.pop();
    }
    // No ratsOut in the queue, so create a new one.
    else {
      rat = new Character({ p5: this.p5, name: 'rat' });
    }

    ratsOut.push(rat);
    rat.assignSlot(slotIdx);
    rat.position(ratSlotCoords[slotIdx]);
    rat.enterGame();
  };

}.bind(this)());

module.exports = {
  instance: instance
};

Object.defineProperty(module.exports, 'instance', {
  value: instance,
  writable: false
});