/*
  Character manages state of 
  entering, idling and exiting
*/

let Assets = require('./Assets');
let Animation = require('./Animation');
// let GameBoard = require('./GameBoard');

let assets;

let Character = function(cfg) {
  Object.assign(this, cfg || {});
  
  assets = new Assets(this.p5);

  this.pos = {};
  this.ani = new Animation({ p5: this.p5 });
};

Character.prototype = {

  hit() {},

  enter() {
    this.ani.play('enter')
      .play('idle', 4)
      .play('exit')
      .pause(1000)
      .onComplete(function(){
        window.gameBoard.remove(this);
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
    window.pos = this.pos;

  },

  render() {
    let frame = this.ani.getFrame();
    if (frame) {
      this.p5.image(frame, this.pos.x, this.pos.y);
    }
  }
};

module.exports = Character;