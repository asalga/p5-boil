let lastTimeFired = 0;

let Ship = function(cfg) {
  Object.assign(this, cfg || {});
  
  this.restart = function() {
    this.health = 100;
    this.damage = 100;
    this.speed = 300;
    this.position = createVector(0, height / 2);
    this.fireRate = 250;
    this.restartedTime = 0;
  };

  this.restart();


  this.fire = function() {
    let now = millis();

    if (now - lastTimeFired > this.fireRate) {
      let v = createVector(750, random(-10, 10));
      let gunPos = this.position.copy();
      gunPos.y += 26;
      gunPos.x += 50;

      scene.createSprite({
        damage: 50,
        type: 'user_bullet',
        tag: 'bullet',
        position: gunPos,
        velocity: v
      });

      lastTimeFired = millis();
    }
  };



  this.hit = function(obj) {
    this.health -= obj.damage;

    if (this.health <= 0) {
      scene.restart();
    }
  };



  this.update = function(dt) {
    let s = this.speed * (dt / 1000);

    this.restartedTime += (dt / 1000);

    if (keyIsDown(UP_ARROW)) { this.position.y -= s; }
    if (keyIsDown(DOWN_ARROW)) { this.position.y += s; }
    if (keyIsDown(LEFT_ARROW)) { this.position.x -= s; }
    if (keyIsDown(RIGHT_ARROW)) { this.position.x += s; }

    this.position.y = constrain(this.position.y, 0, height - this.img.height);
    this.position.x = constrain(this.position.x, 0, width - this.img.width);

    if (keyIsDown(32)) {
      this.fire();
    }
  };



  this.draw = function() {
    if (this.restartedTime < 1) {
      var c = color(255 * sin(frameCount * 10));
      // tint(c);
    } else {
      noTint();
    }
    image(this.img, this.position.x, this.position.y);
    noTint();
  };
};