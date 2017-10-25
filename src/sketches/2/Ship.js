let lastTimeFired = 0;

let Ship = function(cfg) {
  Object.assign(this, cfg || {});

  this.health = 100;
  this.speed = 300;
  this.position = createVector(50, height/2);

  // 1 bullet every this many milliseconds
  this.fireRate = 100;
};

Ship.prototype = {
  constructor: Ship,

  fire() {
    let now = millis();

    if (now - lastTimeFired > this.fireRate) {
      let v = createVector(750, random(-10,10));
      let gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        type: 'userBullet',
        tag: 'bullet',
        imgName: 'userBullet',
        position: gunPos,
        velocity: v
      });

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