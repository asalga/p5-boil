let Scene = function() {

  this.assets = {};
  let actors = [];
  let bullets = [];
  this.user;
  

  this.draw = function() {
    bullets.forEach(v => v.draw());
    actors.forEach(v => v.draw());
  };

  this.update = function(dt) {
    bullets.forEach(v => v.update(dt));
    actors.forEach(v => v.update(dt));
    this.collisionChecks();

    if(frameCount % 100 == 0){
        scene.createSprite({ type: 'enemy_ship'});
    }
  };

  this.collisionChecks = function() {
    let bulletsToRemove = [];

    // enemy bullets <-> user
    bullets.forEach(v => {
      let collision = collidePointRect(v.position.x, v.position.y, this.user.position.x, this.user.position.y, 64, 64);

      if (collision && v.type == 'enemy_bullet') {
        this.user.hit(v);
        bulletsToRemove.push(v);
      }
    });

    // user bullets <-> enemies
    bullets.forEach(b => {
      actors.forEach(e => {
        let collision = collidePointRect(b.position.x, b.position.y, e.position.x, e.position.y, 64, 64);

        if (collision && b.type == 'user_bullet' && e.type == 'enemy_ship') {
          e.hit();
          bulletsToRemove.push(b);
        }
      });
    });

    bulletsToRemove.forEach(v => {
      this.removeBullet(v);
    });
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

    if (cfg.type == 'user_ship') {
      cfg.img = this.assets['user_ship'];
      this.user = new Ship(cfg);
      actors.push(this.user);
    }

    if (cfg.type === 'enemy_ship') {
      cfg.img = this.assets['enemy_ship'];
      actors.push(new EnemyShip(cfg));
    }
  };

  this.createAsset = function(name, img) {
    this.assets[name] = img;
  };

  this.removeShip = function(ship) {
    var idx = actors.indexOf(ship);
    if (idx > -1) {
      actors.splice(idx, 1);
    }
  };

  this.removeBullet = function(bullet) {
    var idx = bullets.indexOf(bullet);
    if (idx > -1) {
      bullets.splice(idx, 1);
    }
  };

};