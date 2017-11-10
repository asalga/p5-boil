var Bullet = function(cfg) {

  this.img = cfg.img;
  this.type = cfg.type;
  this.damage = cfg.damage;
  this.position = cfg.position;
  this.velocity = cfg.velocity;

  this.draw = function() {
    image(this.img, this.position.x, this.position.y);
  };

  this.update = function(dt) {
    this.position.x += this.velocity.x * (dt / 1000);
    this.position.y += this.velocity.y * (dt / 1000);

    // If we went past the bounds of the game
    if (this.position.x > width || this.position.x < -10) {
      scene.removeBullet(this);
    }
  };
};