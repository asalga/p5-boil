/*
  Assets.js
*/
'use strict';

const Atlas = require('./Atlas');
const Howl = require('Howler').Howl;
const Manifest = require('./Manifest');

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
    });
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