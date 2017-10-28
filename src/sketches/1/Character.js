/*
  Character manages state of 
  entering, idling and exiting
*/

let Assets = require('./Assets');
let Animation = require('./Animation');

let assets;

let Character = function(cfg) {
  Object.assign(this, cfg || {});

  // entering, exiting, idling
  let state = 'none';
  let health = 100;
  // let timeExposed = 0;

  assets = new Assets(this.p5);
  this.pos = {};
  this.ani = new Animation({ p5: this.p5 });

};

Character.prototype = {

  hit() {
    //invinsible = true;

    if (state === 'idle') {
      if (health <= 10) {
      } else if (heath > 50) {
        //ani.stop().play('hit');
        // this.animation.play('hurt2');
      }
    }
  },

  enter() {
    this.ani.play('enter')
      .play('idle', 4)
      .play('exit')
      .pause(1000);
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