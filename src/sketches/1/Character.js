/*

*/

// let Character = (function() {
//   console.log('>>>>>> play');


//   this.play = function() {
//     console.log('>>>>>> play');
//   };

//   return this;

// })();


let Character = function(cfg) {
  this.cfg = cfg || {};

  this.p5 = cfg.p5;
};


Character.prototype = {

  play: function() {
    console.log('play called');
    console.log(this.cfg.name);
  },

  update: function(dt){

  },

  draw: function(){
  	
  }

};

module.exports = Character;