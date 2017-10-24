/*

 */

let lastTimeFired = 0;

let Ship = function(cfg) {
  Object.assign(this, cfg || {});

  this.health = 100;
  this.speed = 300;
  this.position = { x: 50, y: 50 };

  // 1 bullet every this many milliseconds
  this.fireRate = 500;
};

Ship.prototype = {
  constructor: Ship,

  //   hit() {
  //     // health -= 40;
  //     if (this.heath <= 0) {
  //       // scene.restart();
  //     }
  //   },


  fire() {
    let now = millis();

    if (now - lastTimeFired > this.fireRate) {

      let p = createVector(0, 0);
      let v = createVector(150, 0);
      scene.createBullet({ position: p, velocity: v });

      lastTimeFired = millis();
    }
  },

  update(dt) {
    if (keyIsDown(UP_ARROW)) {
      this.position.y -= this.speed * (dt / 1000);

      if (this.position.y < 0) {
        this.position.y = 0;
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      this.position.y += this.speed * (dt / 1000);

      if (this.position.y > height - this.userShip.height) {
        this.position.y = height - this.userShip.height;
      }
    }

    // space key
    if (keyIsDown(32)) {
      this.fire();
    }
  },

  draw() {
    image(this.userShip, this.position.x, this.position.y);
  }
};