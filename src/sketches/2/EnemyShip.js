let EnemyShip = function(cfg) {
  Object.assign(this, cfg || {});

  let y = parseInt(random(1, 4)) * 100;

  this.lastTimeFired = 0;
  this.health = 100;
  this.speed = 300;
  this.position = createVector(width, y);

  this.velocity = createVector(100, height / 2);
  this.lifeTime = millis();

  // 1 bullet every this many milliseconds
  this.fireRate = 400;
};

EnemyShip.prototype = {
  constructor: EnemyShip,

  fire() {
    let now = millis();

    if (now - this.lastTimeFired > this.fireRate) {
      let v = createVector(-250, 0);
      let gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        type: 'enemy_bullet',
        tag: 'bullet',
        position: gunPos,
        velocity: v
      });

      this.lastTimeFired = now;
    }
  },

  hit() {
    this.health -= 30;

    if (this.health <= 0) {
      scene.removeShip(this);
    }
  },

  update(dt) {
    this.position.x -= this.velocity.x * dt / 1000;
    // this.position.y = s

    // if(this.position.x < -100){
    //   this.position.x = width;
    // }

    if (sin(this.lifeTime + gameTime / 1000) > 0.4) {
      this.fire();
    }

  },

  draw() {
    image(this.img, this.position.x, this.position.y);
  }
};