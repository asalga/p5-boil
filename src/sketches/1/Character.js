/*
  Character manages state of entering, idling and exiting
*/

let Assets = require('./Assets');
let Animation = require('./Animation');

let assets;
let damage = 25;

/*
  cfg{
    p5 - p5 instance
    name - string
    slotID - Number
  }
*/
let Character = function(cfg) {
  Object.assign(this, cfg || {});

  assets = new Assets(this.p5);
  this.ani = new Animation({ p5: this.p5 });
  this.health = 100;
  this.reset();
};

Character.prototype = {

  /*
    We only allow the rat to be hit once. After they are hit the first
    time, they are 'invincible' until their animations completes.
  */
  hit() {
    if (this.hasBeenHit) {
      return;
    }
    let GameBoard = require('./GameBoard').instance;
    this.hasBeenHit = true;
    this.ani.stop();

    if (this.health <= 25) {
      this.ani.play('hurt_2');
    } else if (this.health <= 50) {
      this.ani.play('hurt_1');
    } else {
      this.ani.play('hurt_0');
    }
    this.ani.onComplete(() => {
      GameBoard.increaseHits();
      GameBoard.freeSlot(this);
      this.reset();
    });

    this.health -= damage;
  },

  assignSlot(s) {
    this.slotID = s;
  },

  enterGame() {
    let enterAnim = 0;
    let idleAnim = 0;
    let GameBoard = require('./GameBoard').instance;

    if (this.health < 25) {
      enterAnim = 2;
      idleAnim = 2;
    } else if (this.health < 50) {
      enterAnim = 1;
      idleAnim = 1;
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
        this.reset();
      }.bind(this));
  },

  exit() {},

  reset() {
    this.pos = this.p5.createVector();
    this.hasBeenHit = false;
    this.slotID = -1;
    this.ani.reset();
  },

  update(dt) {
    this.ani && this.ani.update(dt);
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
  }
};

module.exports = Character;