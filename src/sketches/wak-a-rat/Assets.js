'use strict';

/*
  Assets.js
*/

const Atlas = require('./Atlas');
const Howl = require('Howler').Howl;

const Manifest = {
  // IMAGES
  images: [
    'data/images/background/bk.png',
    'data/images/background/board.png',

    'data/images/sam/arms/images/idle.png',
    'data/images/sam/arms/images/max.png',
    'data/images/sam/arms/images/center.png',
    'data/images/sam/arms/images/upper_left.png',
    'data/images/sam/arms/images/upper_right.png',
    'data/images/sam/arms/images/lower_left.png',
    'data/images/sam/arms/images/lower_right.png',

    'data/images/sam/sam.png'
  ],

  // ATLASES
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
  ],

  audio: [{
      name: 'max-hit',
      path: 'data/audio/max/max.mp3'
    },
    {
      path: 'data/audio/rat/hit0.mp3'
    },
    {
      path: 'data/audio/rat/hit1.mp3'
    },
    {
      path: 'data/audio/rat/hit2.mp3'
    },
    {
      path: 'data/audio/sam/miss.mp3'
    },
    {
      name: 'music',
      path: 'data/audio/background/music.mp3'
    }
  ]
};


let instance;

let Assets = function(p) {

  if (instance) {
    return instance;
  }

  instance = this;
  this.p5 = this.p5 || p;

  this.images = {};
  this.atlases = {};
  this.audio = {};

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function() {
    console.log('Preloading started');

    if (this.isDone()) {
      return;
    }

    let that = this;

    // ** ATLASES
    Manifest.atlases.forEach((v) => {

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

    // ** AUDIO
    Manifest.audio.forEach((v) => {
      // 
      that.audio[v.path] = new Howl({
        src: v.path,
        volume: 1,
        loop: false,
        autoplay: false,
        onload: v => {
          that.numAssetsLoaded++;
        }
      });
    });

    // ** IMAGES
    Manifest.images.forEach(v => {
      that.p5.loadImage(v, p5img => {
        that.images[v] = p5img;
        that.numAssetsLoaded++;
      });

      // loadAtlasImage()
      //   .then(()=> loadAtlasMeta())
      //   .then(() => {
      //     // split();
      //   });

      // Once we have the image, get the associated metaManifest file
      // and then create a spritesheet.

      //  var a = new Promise(function(resolve, reject) {

      //   that.p5.loadImage( 'Manifest/rat/rat_2.png', function(){
      //     resolve();
      //   });
      // })

      //  a.then(function(){
      //   console.log("TEST");
      //  });

      // xhr the spritesheet meta Manifest

      // once we have both the metaManifest and image, we can split
      // apart the spritesheet
    });

    // Manifest.animations.forEach(function() {
    //   // ajax animations
    //   that.numAssetsLoaded++;
    // });
  };

  /*
   */
  this.isDone = function() {
    let totalAssets = Manifest.images.length + Manifest.atlases.length + Manifest.audio.length;
    return this.numAssetsLoaded === totalAssets;
  };

  /*
    Should find a better way of deciding which object to peek in.
   */
  this.get = function(key) {

    // Fix this 
    if (!this.images[key] && !this.audio[key]) {
      throw Error(`${key} needs to be preloaded before it can be used.`);
    }

    if (this.images[key]) {
      return this.images[key];
    }

    if (this.audio[key]) {
      return this.audio[key];
    }
  };

};

module.exports = Assets;