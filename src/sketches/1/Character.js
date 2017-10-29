/*
  Character manages state of 
  entering, idling and exiting
*/

let Assets = require('./Assets');
let Animation = require('./Animation');

let assets;

let Character = function(cfg) {
  Object.assign(this, cfg || {});

  assets = new Assets(this.p5);

  this.pos = this.p5.createVector();
  this.ani = new Animation({ p5: this.p5 });
};

Character.prototype = {

  hit() {},

  enter() {
    let GameBoard = require('./GameBoard').instance;

    this.ani.play('enter')
      .play('idle', 4)
      .play('exit')
      .pause(0)
      .onComplete(function() {
        GameBoard.remove(this);
      }.bind(this));
  },
  exit() {},

  update(dt) {
    if (this.ani) {
      this.ani.update(dt);
    }
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