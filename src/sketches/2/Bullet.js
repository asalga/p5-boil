'use strict';

// let position, velocity;

let Scene = require('./Scene').getInstance();

let Bullet = function(cfg) {

  this.position = cfg.position;
  this.velocity = cfg.velocity;


  this.draw = function() {
    window.p5.fill(255, 0, 0);
    window.p5.rect(this.position.x, 200, 10, 10);
  };


  this.update = function(dt) {
    this.position.x += this.velocity.x * (dt / 1000);

    // If we went past the bounds of the game
    if (this.position.x > 640) {
      scene.removeBullet(this);
    }
  };

};

module.exports = Bullet;