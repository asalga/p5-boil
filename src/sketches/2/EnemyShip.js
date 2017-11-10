let EnemyShip = function(cfg) {
  Object.assign(this, cfg || {});

  this.damage = 100;
  this.health = 100;
  this.speed = 300;
  this.lastTimeFired = 0;
  this.fireRate = 400;

  var y = parseInt(random(1, 4)) * 100;
  this.position = createVector(width, y);

  this.velocity = createVector(100, height / 2);
  this.lifeTime = millis();



  this.fire = function() {
    var now = millis();

    if (now - this.lastTimeFired > this.fireRate) {
      var v = createVector(-350, 0);
      var gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        damage: 5,
        type: 'enemy_bullet',
        tag: 'bullet',
        position: gunPos,
        velocity: v
      });

      this.lastTimeFired = now;
    }
  };

  this.hit = function(obj) {
    this.health -= obj.damage;

    if (this.health <= 0) {
      scene.removeShip(this);
    }
  };

  this.update = function(dt) {
    this.position.x -= this.velocity.x * dt / 1000;

    if (sin(this.lifeTime + gameTime / 1000) > 0.4) {
      this.fire();
    }
  };

  this.draw = function() {
    image(this.img, this.position.x, this.position.y);
  };

};