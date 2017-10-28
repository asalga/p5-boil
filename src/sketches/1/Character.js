/*
  Character manages state of 
  entering, idling and exiting
*/

let Assets = require('./Assets');
let Animation = require('./Animation');

let assets;
let ani;


let Character = function(cfg) {
  Object.assign(this, cfg || {});

  // entering, exiting, idling
  let state = 'none';
  let health = 100;
  let timeExposed = 0;

  assets = new Assets(this.p5);

  this.curr = 'enter';

  ani = new Animation({ p5: this.p5 });

  //'data/animations/rat.json');
  // this.animations = {
  //   'idle': new Animation({ p5: this.p5, name: 'idle', frames: ['idle_normal_0', 'idle_normal_1'] }),
  //   'enter': new Animation({ p5: this.p5, name: 'enter', frames: ['enter_normal_0', 'enter_normal_1', 'enter_normal_2'] })
  // };
};

Character.prototype = {

  hit() {
    //invinsible = true;

    if (state === 'idle') {
      if (health <= 10) {
        // ani.stop().play('exit_3').onComplete(freeSlot);
        // stop
        // pause
        // onComplete
        // play
        // 

      } else if (heath > 50) {
        //ani.stop().play('hit');
        // this.animation.play('hurt2');
      }
    }
  },

  enter() {
    ani.play('enter')
      .play('idle', 4)
      .play('exit')
      .onComplete(()=>console.log('DONE!'));
  },
  exit() {
  },

  update(dt) {
    if (ani) {
      ani.update(dt);
    }
  },

  position(x, y) {},

  draw() {
    let frame = ani.getFrame();
    if (frame) {
      this.p5.image(frame, 55, 210);
    }
  }
};

module.exports = Character;