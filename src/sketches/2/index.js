/*
  EP - Space Game
  Andor Saga
  Oct 2017

  TODO:
    - draw user ship
    - add control to ship

*/

const Ship = require('./Ship');

const KEY_D = 68;

let p5 = require('p5');
let debug = true;

let userShip;
let _p5;
let time1 = 0,
  time2 = 0;
let user;


/*
 */
var update = function(dt) {

  user.update(dt);

};

/*
 */
var render = function() {
  _p5.background(0, 0, 0);
  // _p5.image(userShip, 50, 50);
  user.draw();
}

var newp5 = new p5(function(p) {
  _p5 = p;
  window.p5 = p;

  p.setup = function setup() {
    p.createCanvas(640, 400);

    user = new Ship({p:p, userShip:userShip});

  };

  /*
   */
  p.preload = function() {
    userShip = p.loadImage('data/user.png');
  };

  /*
   */
  p.keyPressed = function(key) {

    // console.log(key);

    // if (key.code === 'ArrowUp') {
    //   user.moveUp = true;
    //   //user.setDirection(1);

    //   // user.moveUp();
    // } else if (key.code === 'ArrowDown') {
    //   user.moveDown = true;
    //   // user.moveDown();
    // }

  };



  /*
   */
  p.draw = function() {
    time1 = p.millis();
    let delta = time1 - time2;

    update(delta);
    render();

    //p.image(assets.get('data/user.png'), 0, 0);

    time2 = time1;
  }
});

function drawFPS() {}


function drawMouseCoords() {}