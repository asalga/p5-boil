'use strict';

/*
  Singleton for managing the rats
*/

let Character = require('./Character');

let hitBoxPositions = [
  [164, 260], // top
  [70, 310], // bottom left
  [210, 300], // center
  [344, 286], // far right
  [250, 340] // bottom
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
    hitBoxPositions.forEach((a) => {
      this.p5.rect(a[0], a[1], 80, 26);
    });
  };

  /*
   */
  this.pushOutRat = function() {

    if (freeSlots.length === 0) {
      console.log('no free slots!');
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