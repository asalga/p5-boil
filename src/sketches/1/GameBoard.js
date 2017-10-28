/*
  Singleton for managing the rats
*/
'use strict';

let Character = require('./Character');

let instance;

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
  [146, 164], //top
  [54, 212], // bottom left
  [190, 202], // center
  [329, 188], // far right
  [232, 246] // bottom
];

let GameBoard = function(p5) {

  if (instance) {
    return instance;
  }
  instance = this;

  var p5 = p5;
  var hits = 0;
  var misses = 0;
  var slots = [0, 0, 0, 0, 0];

  this.freeSlots = [2, 4, 0, 1, 3];
  var rats = [];
  let t;

  this.render = function() {
    rats.forEach(r => r.render());

    p5.fill(33, 66, 99, 200);
    p5.stroke(255);
    hitBoxPositions.forEach((a) => {
      // p5.rect(a[0], a[1], 80, 26);
    });
  };

  this.remove = function(rat) {
    this.freeSlots.push(rat.slotID);
   // p5.shuffle(this.freeSlots, true);

    let idx = rats.indexOf(rat);
    if(idx !== -1){
      rats.splice(idx, 1);
    }
  };

  this.pushOutRat = function() {

    if (this.freeSlots.length === 0) {
      console.log('no free slots!');
      return;
    }

    console.log(this.freeSlots);
    let slotIdx = this.freeSlots.pop();
    
    let rat = new Character({ p5: p5, name: 'rat', slotID: slotIdx });
    rats.push(rat);

    let x = ratSlotCoords[slotIdx][0];
    let y = ratSlotCoords[slotIdx][1];

    rat.position({ x: x, y: y });
    rat.enter();
  };

  this.update = function(dt) {
    t += dt;
    rats.forEach(r => r.update(dt));
  };

  /*
    User tried to hit a slot, did they succeed?
  */
  this.hit = function(x, y) {
    misses++;
    // Check if we hit one of the slots

    // if the slot is occupied, tell the rat to animate
  };

  /*
    Maybe we'll use this for something?
  */
  this.getNumMisses = function() {
    return misses;
  };
  this.getNumHits = function() {
    return hits;
  };
};

module.exports = GameBoard;