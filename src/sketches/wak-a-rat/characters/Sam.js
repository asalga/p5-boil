/*
 */

let instance;

let Sam = (function() {

  if (instance) {
    return instance;
  }
  instance = this;

  this.render = function() {};

  this.update = function(dt) {
  };


})();

module.exports = {
  instance: instance
};

Object.defineProperty(module.exports, 'instance', {
  writable: false,
  instance: instance
})