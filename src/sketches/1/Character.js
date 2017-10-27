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

  let timeExposed = 0;

  assets = new Assets(this.p5);

  this.curr = 'idle';

  // let animations = new Animations('data/animations/rat.json');
  this.animations = {
    'idle': new Animation({ p5:this.p5, name: 'idle', frames: ['idle_normal_0', 'idle_normal_1'] }),
    //'enter': new Animation({ name: 'enter', frames: ['enter_normal_0', 'enter_normal_1'] })
  };
};

Character.prototype = {

  play() {
    console.log(`play called on ${this.name}`);
  },

  hit() {
    if (state === 'idle') {
      if (health === 10) {
        // this.animation.play('hurt');
      } else if (heath > 50) {
        // this.animation.play('hurt2');
      }
    }
  },

  hide() {
    // this.animations.play('exit');
  },

  update(dt) {
    if (this.animations)
      this.animations[this.curr].update(dt);
  },

  position(x, y) {},

  draw() {
    let frame = this.animations[this.curr].getFrame();
    this.p5.image(frame, 55, 210);
  }
};

module.exports = Character;