// 'use strict';


// // const Bullet = require('./Bullet');

// /*
//  Manages ships
// */
// let instance;

let Scene = function() {

  let assets = {};

  let user;
  let actors = [];
  let bullets = [];

  /*
   */
  this.draw = function() {
    user.draw();

    actors.forEach(v => v.draw());
    bullets.forEach(v => v.draw());
  };

  //   /*
  //    */
  this.update = function(dt) {

    user.update(dt);
    //     actors.forEach(function(v) {
    //       v.update(dt);
    //     });

    bullets.forEach(function(v) {
      v.update(dt);
    });

    // Check collisions
  };


  this.setUser = function(u) {
    user = u;
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

  this.createBullet = function(cfg) {
    bullets.push(new Bullet(cfg));
  };
};


// module.exports = {
//   getInstance: function() {
//     if (instance) {
//       return instance;
//     }
//     instance = new Scene();
//     return instance;
//   }
// };