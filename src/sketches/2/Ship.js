/*

  

*/

let Ship = function(cfg) {
  Object.assign(this, cfg || {});

  let health = 100;

  this.speed = 100;
  let direction = 0;

  let movingUp = false;

  this.moveUp;
  this.moveDown;

  this.position = { x: 50, y: 50 };
};

Ship.prototype = {

  constructor: Ship,

  hit() {},

  update(dt) {

    // if(movingUp){
    //   position.y -= dt * speed;
    // }

    if (this.p.keyIsDown(this.p.UP_ARROW)) {
      this.position.y -= this.speed * (dt / 1000);

      if (this.position.y < 0) {
        this.position.y = 0;
      }
    }

    else if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
      this.position.y += this.speed * (dt / 1000);

      if (this.position.y > 480) {
        this.position.y = 480 - this.userShip.height;
      }
    }

    console.log( this.position);
  },

  position(x, y) {},
  moveUp() {},
  setDirection(dir) {},
  moveDown() {},

  draw() {
    this.p.image(this.userShip, this.position.x, this.position.y);
  }
};

module.exports = Ship;