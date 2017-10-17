/*
	Singleton for managing the rats

	Manages rats
*/
'use strict';

let GameBoard;

(function() {

  let instance;

  GameBoard = function(p5) {
    if (instance) {
      return instance;
    }
    instance = this;

 	var p5 = p5;
    var hits = 0;
    var misses = 0;
    var hitBoxes = [];

    /*
    	User tried to hit a slot, did they succeed?
    */
    this.hit = function(x, y) {
      // console.log(x,y);
      misses++;
    };

    /*
        Maybe we'll use this for something?
    */
    this.getNumMisses = function() {
      return misses;
    };
    this.getNumHits = function() {
      return misses;
    };


  };

})();

module.exports = GameBoard;