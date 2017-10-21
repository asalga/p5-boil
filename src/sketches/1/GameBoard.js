/*
  Singleton for managing the rats
*/
'use strict';

let instance;

let hitBoxPositions = [
  [185, 282],
  [97, 330],
  [225, 320],
  [368, 310],
  [268, 363]
];

let GameBoard = function(p5) {

  if (instance) {
    return instance;
  }
  instance = this;

  var p5 = p5;
  var hits = 0;
  var misses = 0;
  var slots = [];
  var rats = [];

  /*
    User tried to hit a slot, did they succeed?
  */
  this.hit = function(x, y) {
    misses++;
    // Check if we hit one of the slots

    // if the slot is occupied, tell the rat to animate
    // rat.hit();
    // ui.addScore(1);
    //.play('hurt');
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