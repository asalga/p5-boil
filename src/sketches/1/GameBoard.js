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

  let freeSlots = [2, 4, 0, 1, 3];
  let rats = [];
  let t;

  if (instance) {
    return instance;
  }
  instance = this;

  /*
    point - object with x and y properties
  */
  this.hit = function(p) {

    hitBoxPositions.forEach((c, i) => {

      let rect = {
        x: c.x,
        y: c.y,
        w: HitboxWidth,
        h: HitBoxHeight
      };

      let slotID = i;

      if (Utils.pointInRect(p, rect)) {

        // Okay, we hit one of the slots, is it occupied?
        rats.forEach((v, i) => {
          if(v.slotID === slotID ){
            v.hit();
          }
        });
        return i;
      }
    });
    return -1;
  };

  /*
    Remove a mouse from the gameboard
  */
  this.remove = function(rat) {
    freeSlots.push(rat.slotID);
    // this.p5.shuffle(freeSlots, true);

    let idx = rats.indexOf(rat);
    if (idx !== -1) {
      rats.splice(idx, 1);
    }
  };

  /*
   */
  this.update = function(dt) {
    t += dt;
    rats.forEach(r => r.update(dt));
  };

  /*
   */
  this.render = function() {
    rats.forEach(r => r.render());

    this.p5.fill(33, 66, 99, 200);
    this.p5.stroke(255);
    hitBoxPositions.forEach(b => {
      // this.p5.rect(b.x, b.y, HitboxWidth, HitBoxHeight);
    });
  };

  /*
   */
  this.pushOutRat = function() {

    if (freeSlots.length === 0) {
      // console.log('no free slots!');
      return;
    }

    let slotIdx = freeSlots.pop();
    let rat = new Character({ p5: this.p5, name: 'rat', slotID: slotIdx });

    rats.push(rat);
    rat.position(ratSlotCoords[slotIdx]);
    rat.enter();
  };

}.bind(this)());

module.exports = {
  instance: instance
};

Object.defineProperty(module.exports, 'instance', {
  value: instance,
  writable: false
});