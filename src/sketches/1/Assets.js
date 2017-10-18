/*

*/

let imagePaths = [
  'data/_idle.png',
  'data/rat/rat_2.png',
  'data/max/head.png',
  'data/max/hand.png'
];

let Assets;

(function() {
  let instance;

  Assets = function(p) {
    if (instance) {
      return instance;
    }

    this.p5 = p;
    this.images = {};
    this.numImagesLoaded = 0;

    /*
     */
    this.preload = function() {

      if (this.isDone()) {
        return;
      }

      let that = this;

      imagePaths.forEach(function(v, i, a) {
        that.p5.loadImage(v, function(p5img) {
          that.images[v] = p5img;
          that.numImagesLoaded++;
        });

      });
    };

    /*
     */
    this.isDone = function() {
      return this.numImagesLoaded === imagePaths.length;
    };

    /*
     */
    this.get = function(key) {
    	if(!this.images[key] ){
    		throw Error(`${key} needs to be preloaded before it can be used.`);
    	}
       return this.images[key];
    };
  };

})();

module.exports = Assets;