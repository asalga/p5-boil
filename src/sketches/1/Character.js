/*
  Character manages state of 
  entering, idling and exiting
*/

let Character = function(cfg) {
  Object.assign(this, cfg || {});

  // entering, exiting, idling
  let state = 'none';
  let health = 100;
  let timeExposed = 0;

  // let atlas = Assets.get('rat/atlas.png');

  // let animations = new Animations('data/animations/rat.json');
  // animations.play('enter');

  //this.currAnimation.play('enter');

  // this.getFrame();
};

Character.prototype = {

  constructor: Character,

  play() {
    console.log(`play called on ${this.name}`);
    // console.log(this.cfg.name);
  },

  hit() {

    if(state === 'idle'){
      if(health === 10){
        // this.animation.play('hurt');
      }
      else if(heath > 50){
        // this.animation.play('hurt2');
      }
    }
  },

  hide(){
    // this.animations.play('exit');
  },

  update(dt) {
    
    // this.animation.update(dt);

    // if(timeExposed > 0.5){
    //   hide();
    // }

  },

  position(x, y) {},

  draw() {
    // let frame = this.animation.getFrame();
    // p.image(frame);
    // this.animations['enter']
  }
};

module.exports = Character;