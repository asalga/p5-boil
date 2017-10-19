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
  Object.assign(this, cfg || {});
};


Character.prototype = {

  play: function() {
    console.log(`play called on ${this.name}`);
    // console.log(this.cfg.name);
  },

  update: function(dt){

  },

  draw: function(){

  }

};

module.exports = Character;