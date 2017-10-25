let Scene = function() {

  let assets = {};
  let user;
  let actors = [];
  let bullets = [];

  /*
   */
  this.draw = function() {
    bullets.forEach(v => v.draw());
    
    user.draw();
    actors.forEach(v => v.draw());
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
  this.createSprite = function(cfg){
    if(cfg.tag == 'bullet'){
      cfg.img = assets[cfg.imgName];
      bullets.push(new Bullet(cfg));
    }
  };

  this.createAsset = function(key, img) {
    assets[key] = img;
  };

  this.removeBullet = function(bullet) {
    // Utils.removeFromList(this.bullets, bullet);
    // Utils.intersection

    //   this.createActor = function(str) {
    //     if (str == 'bullet') {
  };
};