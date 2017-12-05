'use strict';
/*

*/

const Atlas = require('./Atlas');

const Data = {
  images: [
    'data/images/background/background.png',
    
    'data/images/sam/arms/images/arm_idle.png'
    // font
  ],

  atlases: [{
      name: 'rat',
      atlas: 'data/images/rat/spritesheet.png',
      meta: 'data/images/rat/spritesheet.json'
    },
    {
      name: 'sam',
      atlas: 'data/images/sam/atlas.png',
      meta: 'data/images/sam/atlas.json'
    },
    {
      name: 'max',
      atlas: 'data/images/max/atlas.png',
      meta: 'data/images/max/atlas.json'
    }
  ]
};


let instance;

let Assets = function(p) {

  if (instance) {
    return instance;
  }

  instance = this;
  this.p5 = p;
  this.images = {};
  this.atlases = {};

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function() {

    if (this.isDone()) {
      return;
    }

    let that = this;

    //
    Data.atlases.forEach((v) => {

      that.p5.loadImage(v.atlas, function(atlasImg) {
        // Once the image is loaded, get the meta file
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {

          let atlas = new Atlas({
            name: v.name,
            img: atlasImg,
            meta: xhr.responseText,
            p: that.p5
          });

          that.atlases[v.name] = atlas;

          that.numAssetsLoaded++;
        };
        xhr.open('GET', v.meta);
        xhr.send();
      });
    });

    //
    Data.images.forEach(v => {

      that.p5.loadImage(v, p5img => {
        that.images[v] = p5img;
        that.numAssetsLoaded++;
      });

      // var resolve = function(a){
      //   console.log('resolved! ', a);
      // }

      // loadAtlasImage()
      //   .then(()=> loadAtlasMeta())
      //   .then(() => {
      //     // split();
      //   });

      // Once we have the image, get the associated metadata file
      // and then create a spritesheet.



      //  var a = new Promise(function(resolve, reject) {

      //   that.p5.loadImage( 'data/rat/rat_2.png', function(){
      //     resolve();
      //   });

      // })

      //  a.then(function(){
      //   console.log("TEST");
      //  });

      // xhr the spritesheet meta data

      // once we have both the metadata and image, we can split
      // apart the spritesheet
    });

    // Data.animations.forEach(function() {
    //   // ajax animations
    //   that.numAssetsLoaded++;
    // });
  };

  /*
   */
  this.isDone = function() {
    return this.numAssetsLoaded ===
      (Data.images.length + Data.atlases.length);
  };

  /*
   */
  this.get = function(key) {
    if (!this.images[key]) {
      throw Error(`${key} needs to be preloaded before it can be used.`);
    }
    return this.images[key];
  };
};

module.exports = Assets;