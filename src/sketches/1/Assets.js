/*

  TODO: added error state if image wasn't loaded

*/

const Data = {
  images: [
    'data/_idle.png',
    'data/rat/rat_2.png',
    'data/max/head.png',
    'data/max/hand.png'
  ],

  animations: [
    'animations/rat.json',
    'animations/sam.json'
  ],

  audio: [
    'blahblah'
  ]
};


let instance;

let Assets = function(p) {

  if (instance) {
    return instance;
  }

  this.p5 = p;
  this.images = {};
  this.animations = {};

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function() {

    if (this.isDone()) {
      return;
    }

    let that = this;






    Data.images.forEach(function(v, i, a) {

      that.p5.loadImage(v, function(p5img) {
        that.images[v] = p5img;
        that.numAssetsLoaded++;
      });

      // var resolve = function(a){
      //   console.log('resolved! ', a);
      // }


      that.p5.loadImage('data/images/rat/spritesheet.png', function(a){


        var xhr = new XMLHttpRequest();
        xhr.onload = function(responce){
          console.log('loaded!! ', xhr.responseText);

        };
        xhr.open('GET',  'data/images/rat/spritesheet.json');
        xhr.send();


        // return new Promise((res,rej) => {


        // });

       // console.log('test');
      });


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

    Data.animations.forEach(function() {
      // ajax animations
      that.numAssetsLoaded++;
    });
  };

  /*
   */
  this.isDone = function() {

    return this.numAssetsLoaded === Data.images.length + Data.animations.length;
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