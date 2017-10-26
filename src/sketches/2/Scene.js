let Scene = function() {

  this.assets = {};
  // let user;
  let actors = [];
  let bullets = [];

  /*
   */
  this.draw = function() {
    bullets.forEach(v => v.draw());

    user.draw();
    actors.forEach(v => v.draw());

    bitmapText(bullets.length, 20, 50);
  };

  /*
   */
  this.update = function(dt) {
    bullets.forEach(v => v.update(dt));
    user.update(dt);
    actors.forEach(v => v.update(dt));
  };

  this.setUser = function(u) {
    user = u;
  };

  /*
   */
  this.createSprite = function(cfg) {

    if (cfg.type == 'user_bullet') {
      cfg.img = this.assets['user_bullet'];
      bullets.push(new Bullet(cfg));
    }

    if (cfg.type == 'enemy_bullet') {
      cfg.img = this.assets['enemy_bullet'];
      bullets.push(new Bullet(cfg));
    }

    if(cfg.type == 'user_ship'){
      cfg.img = this.assets['user_ship'];
      user = new Ship(cfg);
      this.user = user;
    }

    if (cfg.type === 'enemy_ship') {
      cfg.img = this.assets['enemy_ship'];
      actors.push(new EnemyShip(cfg));
    }
  };

  this.createAsset = function(name, img) {
    this.assets[name] = img;
  };

  this.removeBullet = function(bullet) {
    var idx = bullets.indexOf(bullet);
    if (idx > -1) {
      bullets.splice(idx, 1);
    }
  };

};