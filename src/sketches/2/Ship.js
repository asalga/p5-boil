let lastTimeFired = 0;

let Ship = function(cfg) {
  Object.assign(this, cfg || {});

  this.health = 100;
  this.speed = 300;

  this.position = createVector(50, height / 2);

  // 1 bullet every this many milliseconds
  this.fireRate = 250;
};

Ship.prototype = {
  constructor: Ship,

  fire() {
    let now = millis();

    if (now - lastTimeFired > this.fireRate) {
      let v = createVector(750, random(-10, 10));
      let gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        type: 'user_bullet',
        tag: 'bullet',
        position: gunPos,
        velocity: v
      });

      lastTimeFired = millis();
    }
  },

  hit() {

  },


  update(dt) {
    let s = this.speed * (dt / 1000);

    if (keyIsDown(UP_ARROW)) {
      this.position.y -= s;

      if (this.position.y < 50) {
        this.position.y = 50;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.position.y += s;

      if (this.position.y > height - this.img.height) {
        this.position.y = height - this.img.height;
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.position.x += s;

      if (this.position.x > width - this.img.width) {
        this.position.x = width - this.img.width;
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.position.x -= s;

      if (this.position.x < 0) {
        this.position.x = 0;
      }
    }

    if (keyIsDown(32)) {
      this.fire();
    }
  },

  draw() {
    image(this.img, this.position.x, this.position.y);
  }
};