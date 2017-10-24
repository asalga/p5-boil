/*

*/

let Global = require('./Global');
const Scene = require('./Scene').getInstance();


let lastTimeFired = 0;


let Ship = function(cfg) {
  Object.assign(this, cfg || {});

  this.health = 100;
  this.speed = 300;
  this.position = { x: 50, y: 50 };

  // 1 bullet every x milliseconds
  this.fireRate = 500;
};

Ship.prototype = {

  constructor: Ship,

  hit() {
    // health -= 40;
    if (this.heath <= 0) {
      // scene.restart();
    }
  },


  fire() {
    

    let now = window.p5.millis();

    if (now - lastTimeFired > this.fireRate) {

      let p = window.p5.createVector(0, 0);
      let v = window.p5.createVector(150, 0);
      Scene.createBullet({ position: p, velocity: v });
      
      lastTimeFired = window.p5.millis();
    }

  },

  update(dt) {

    if (this.p.keyIsDown(this.p.UP_ARROW)) {
      this.position.y -= this.speed * (dt / 1000);

      if (this.position.y < 0) {
        this.position.y = 0;
      }
    } else if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
      this.position.y += this.speed * (dt / 1000);

      if (this.position.y > Global.height - this.userShip.height) {
        this.position.y = Global.height - this.userShip.height;
      }
    }

    // 
    if (this.p.keyIsDown(32)) {
      this.fire();
    }
  },

  draw() {
    this.p.image(this.userShip, this.position.x, this.position.y);
  }
};

module.exports = Ship;