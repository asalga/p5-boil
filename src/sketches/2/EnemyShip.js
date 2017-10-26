let EnemyShip = function(cfg) {
  Object.assign(this, cfg || {});

  this.health = 100;
  this.speed = 300;
  this.position = createVector(250, height/2);
  this.velocity = createVector(100, height/2);

  // 1 bullet every this many milliseconds
  this.fireRate = 400;
};

EnemyShip.prototype = {
  constructor: EnemyShip,

  fire() {
    let now = millis();

    if (now - lastTimeFired > this.fireRate) {
      let v = createVector(-250, 0);
      let gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        type: 'enemy_bullet',
        tag: 'bullet',
        //imgName: 'userBullet',
        position: gunPos,
        velocity: v
      });

      lastTimeFired = millis();
    }
  },

  update(dt) {
    this.position.x -= this.velocity.x * dt/1000;

    if(this.position.x < -100){
      this.position.x = width;
    }

    this.fire();
  },

  draw() {
    image(this.img, this.position.x, this.position.y);
  }
};