'use strict';

/*
  Singleton for managing the rats
*/

let Rat = require('./characters/Rat');
let Utils = require('./Utils');

// make game more difficult by reducing size of hitboxes?
const HitboxWidth = 80;
const HitBoxHeight = 26;


let hitBoxPositions = [
  { x: 164, y: 260, w: HitboxWidth, h: HitBoxHeight }, // top
  { x: 70, y: 310, w: HitboxWidth, h: HitBoxHeight }, // bottom left
  { x: 210, y: 300, w: HitboxWidth, h: HitBoxHeight }, // center
  { x: 344, y: 286, w: HitboxWidth, h: HitBoxHeight }, // far right
  { x: 250, y: 340, w: HitboxWidth, h: HitBoxHeight }, // bottom
  { x: 30, y: 200, w: 120, h: 100 } // max
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

/*
  ratsIn - array of rats that are 'inside' the game board
  ratsOut - array of rats that are 'outside'/visible
  freeSlots - 
*/
(function() {

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
    {Object} p - point object with properties x & y

    order of slots indices in quinqunx ranges from 0-5
    the 'Max' slot is index 5.

    5     0       3

              2

          1       4

    return {Number} from -1 to 5 inclusive
  */
  this.hit = function(p) {
    let retIdx = -1;

    hitBoxPositions.forEach((rectangle, slotID) => {

      if (Utils.pointInRect(p, rectangle)) {

        // We hit one of the slots, is it occupied?
        ratsOut.forEach((rat) => {
          if (rat.slotID === slotID) {
            rat.hit();
          }
        });
        retIdx = slotID;
      }
    });

    return retIdx;
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

  this.getNumMisses = function() { return numMisses; };
  this.getNumHits = function() { return numHits; };

  /*
    Depending on where the user hit, we'll need 
    to adjust rendering order

    A = arm
    _ = rat hit that we omit rendering

    0: _  A, 2, 4, 3, 1
    1: 0, A, 2, 4, 3, _
    2: 0, A, _  4, 3, 1
    3: 0, A, 2, 4, _, 1
    4: 0, 2, A, _, 3, 1
    5: A, 0, 2, 4, 3, 1



   */
  this.renderAboveArm = function() {
    ratsOut.forEach(rat => rat.render());

    // this.p5.fill(33, 66, 99, 200);
    // this.p5.stroke(255);
    // hitBoxPositions.forEach(r => this.p5.rect(r.x, r.y, r.w, r.h));
    // this.p5.text("in: " + ratsIn.length, 100, 100);
    // this.p5.text("out: " + ratsOut.length, 100, 140);
    // this.p5.text(numHits, 30, 30);
    // this.p5.text(numMisses, 60, 30);
  };

  /*
   */
  this.renderBelowArm = function() {
    ratsOut.forEach(rat => rat.render());
  };

  /*
    Request that a rat enter the game.
   */
  this.pushOutRat = function() {

    // If all the slots are occupied, we can't do anything
    if (freeSlots.length === 0) {
      console.log('no free slots!');
      return;
    }

    // Try to get a rat that is inside the gameboard
    let rat = ratsIn.pop();

    // If no rats in the queue, create a new one
    if (rat === undefined) {
      rat = new Rat({ p5: this.p5, name: 'rat' });
    }

    let slotIdx = freeSlots.pop();
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