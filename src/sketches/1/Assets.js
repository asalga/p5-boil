const Atlas = require('./Atlas');

const Data = {
  images: [
    'data/images/background/background.png',
    'data/images/max/head.png',
    'data/images/max/hand.png'
  ],

  animations: [
    'data/images/rat/spritesheet.png'
  ],

  // animations: [
  //   'animations/rat.json',
  //   'animations/sam.json'
  // ],
  // audio: [
    // 'blahblah'
  // ]
};


let instance;

let Assets = function(p) {

  if (instance) {
    return instance;
  }

  instance = this;
  this.p5 = p;
  this.images = {};
  this.animations = {};
  this.atlases = [];

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function() {

    if (this.isDone()) {
      return;
    }

    let that = this;
    
    // 
    Data.animations.forEach((v)=>{

      that.p5.loadImage(v, function(atlasImg) {

        let xhr = new XMLHttpRequest();
        xhr.onload = function(response) {
          
          that.atlases.push(new Atlas(
            { img: atlasImg, meta: xhr.responseText, p:that.p5 })
          );

          that.numAssetsLoaded++;
        };
        xhr.open('GET', 'data/images/rat/spritesheet.json');
        xhr.send();
      });
    });


    Data.images.forEach(function(v, i, a) {

      that.p5.loadImage(v, function(p5img) {
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
    return this.numAssetsLoaded === (Data.images.length + Data.animations.length);
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