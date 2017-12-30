'use strict';

/*
  Singleton for managing the rats

  TODO - deprecate freeslots
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
let assets;

/*
  ratsIn - array of rats that are 'inside' the game board
  ratsOut - array of rats that are 'outside'/visible
*/
(function() {


  let freeSlots = [2, 4, 0, 1, 3],
    ratsOut = [],
    ratsIn = [],
    numMisses = 0,
    numHits = 0,
    // When rendering, we need to render based on the order of the slots.
    ratSlots = [null, null, null, null, null],

    gameTimeElapsed = 0,
    nextTime = 2000;

  if (instance) {
    return instance;
  }
  instance = this;

  /*
    Get the next time we'll release a rat.
    frequency increases proportionally with time increase.
  */
  this.getNextTime = function() {
    let time = gameTimeElapsed / 1000;
    // console.log('gameTime:' , time);

    // if (time > 40) {return this.p5.random(100, 200);}
    if (time > 30) return this.p5.random(200, 400);
    if (time > 20) return this.p5.random(300, 500);
    if (time > 10) return this.p5.random(400, 700);
    return this.p5.random(500, 1000);
  };

  /*
    {Object} p - point object with properties x & y

    Order of slots indices in quinqunx ranges from 0-5
    the 'Max' slot is index 5.

    5     0       3
              2
          1       4

    return {Number} from -1 to 5 inclusive
  */
  this.hit = function(p) {
    let retIdx = -1;
    let hitRat = false;

    hitBoxPositions.forEach((rectangle, slotID) => {

      if (Utils.pointInRect(p, rectangle)) {

        // We hit one of the slots, is it occupied?
        ratsOut.forEach((rat) => {
          if (rat.slotID === slotID) {
            rat.hit();
            hitRat = true;
          }
        });
        retIdx = slotID;
      }
    });

    if(hitRat === false && retIdx !== -1){
      let Assets = require('./Assets');
      assets = new Assets();
      assets.get('data/audio/sam/miss.mp3').play();
    }

    return retIdx;
  };

  /*
    Let the GameBoard know this slot can now be re-used

    {Object} rat - Rat that is going back in the board
  */
  this.freeSlot = function(rat) {
    freeSlots.push(rat.slotID);
    // this.p5.shuffle(freeSlots, true);

    let idx = ratsOut.indexOf(rat);
    if (idx !== -1) {
      ratsIn.push(ratsOut.splice(idx, 1)[0]);
    }

    ratSlots[rat.slotIdx] = null;
    rat.slotID = -1;
  };

  /*
   */
  this.update = function(dt) {
    gameTimeElapsed += dt;
    nextTime -= dt;

    // if (timeElapsed >= nextTime) {
    if(nextTime <= 0){
      // timeElapsed = 0; //-= nextTime;
      nextTime = this.getNextTime();
      // console.log(nextTime);
      this.pushOutRat();
    }

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
    Depending on where Sam's arm, we'll need to adjust rendering order
    a = arm
    
    1: 0  a  2   4  3
    2: 0     a   4  3  1
    3: 0     2   4  a  1
    4: 0     2   a  3  1
    --------------------
    0: a     2   4  3  1
    5: a  0  2   4  3  1
   -1: a  0  2   4  3  1
   */
  this.render = function(sam) {
    let armPos = sam.getArmPosition();

    // If we are hitting Max or have an idle position, render arm first
    // then all rats above arm.
    if (armPos === 5 || armPos === -1) {
      sam.renderArm();
    }

    let renderOrder = [0, 2, 4, 3, 1];
    renderOrder.forEach(v => {
      if (armPos === v) {
        sam.renderArm();
      } else {
        if (ratSlots[v]) {
          ratSlots[v].render();
        }
      }
    });
  };

  /*
    Request that a rat enter the game.
   */
  this.pushOutRat = function() {

    // If all the slots are occupied, we can't do anything
    if (freeSlots.length === 0) {
      return;
    }

    // Try to get a rat that is inside the gameboard
    let rat = ratsIn.pop();

    // If no rats in the queue, create a new one
    if (rat === undefined) {
      rat = new Rat({ p5: this.p5, name: 'rat' });
    }

    let slotIdx = freeSlots.pop();
    ratSlots[slotIdx] = rat;
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