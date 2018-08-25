'use strict';
/*
  Rat manages state of entering, idling and exiting
*/

let Assets = require('../Assets');
let Animation = require('../Animation');

let assets;
let damage = 8;

// references to the image names from the atlas.
let animationSequences = {
  'hurt_0': ['hit_0_0', 'hit_0_1'],
  'hurt_1': ['hit_1_0', 'hit_1_1'],
  'hurt_2': ['hit_2_0', 'hit_2_1'],

  'enter_0': ['enter_0_0', 'enter_0_1', 'enter_0_2'],
  'enter_1': ['enter_1_0', 'enter_1_1', 'enter_1_2'],
  'enter_2': ['enter_2_0', 'enter_2_1', 'enter_2_2'],
  'enter_3': ['enter_3_0', 'enter_3_1'], //taunt

  'idle_0': ['idle_0_0', 'idle_0_1'],
  'idle_1': ['idle_1_0', 'idle_1_1'],
  'idle_2': ['idle_2_0', 'idle_2_1'],
  'idle_3': ['idle_taunt_0', 'idle_taunt_1'],

  'exit': ['exit'],
};

/*
  cfg {
    p5 - p5 instance
    name - string
    slotID - Number
  }
*/
let Rat = function(cfg) {
  Object.assign(this, cfg || {});

  assets = new Assets(this.p5);
  this.ani = new Animation({
    p5: this.p5,
    animations: animationSequences,
    atlasName: 'rat'
  });
  this.health = 100;
  this.dirty = true;
  this.resetAnimation();
};

Rat.prototype = {

  /*
    We only allow the rat to be hit once. After they are hit the first
    time, they are 'invincible' until their animations completes.
  */
  hit() {

    if (this.hasBeenHit) {
      return;
    }
    let GameBoard = require('../GameBoard').instance;
    this.hasBeenHit = true;
    this.ani.stop();

    if (this.health <= 25) {
      this.ani.play('hurt_2');
    } else if (this.health <= 50) {
      this.ani.play('hurt_1');
    } else {
      this.ani.play('hurt_0');
    }

    let randomHit = ~~(this.p5.random(0, 3));
    assets.get(`data/audio/rat/hit${randomHit}.mp3`).play();

    this.ani.onComplete(() => {
      GameBoard.increaseHits();
      GameBoard.freeSlot(this);
      this.resetAnimation();
    });

    this.health -= damage;
  },

  assignSlot(s) {
    this.slotID = s;
  },

  enterGame() {
    let enterAnim = 0;
    let idleAnim = 0;
    let GameBoard = require('../GameBoard').instance;

    if (this.health < 10) { // taunt
      enterAnim = 3;
      idleAnim = 3;
    } else if (this.health < 25) {
      enterAnim = 2;
      idleAnim = 2;
    } else if (this.health < 50) {
      enterAnim = 1;
      idleAnim = 1;
    } else if (this.health < 100) {
      enterAnim = 0;
      idleAnim = 0;
    }

    this.ani
      .play('enter_' + enterAnim)
      .play('idle_' + idleAnim, 2)
      .play('exit')
      // .pause(500)
      // TODO: figure out a better way to handle this.
      // It looks like once exit is done, we call remote(), but that's
      // not exactly what actually happens.
      .onComplete(function() {
        GameBoard.freeSlot(this);
        GameBoard.increaseMisses();
        this.resetAnimation();
      }.bind(this));
  },

  exit() {},

  resetAnimation() {
    this.pos = this.p5.createVector();
    // this.health = 100;
    this.hasBeenHit = false;
    this.slotID = -1;
    this.ani.reset();
  },

  update(dt) {
    this.ani.update(dt);
    // if(this.ani.dirty){
    //   this.dirty = true;
    // }
    this.dirty = true; //this.ani.dirty;
  },

  position(p) {
    this.pos.x = p.x;
    this.pos.y = p.y;
  },

  render() {
    let frame = this.ani.getFrame();
    if (frame) {
      this.p5.image(frame, this.pos.x, this.pos.y);
    }
    this.dirty = false;
  }
};

module.exports = Rat;