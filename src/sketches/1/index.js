/*
  Wak-a-Rat
  Andor Saga
  Oct 2017

  TODO:
   - make p5 global
   - create keys file
   - figure out what manages the rats. the GameBoard?
*/


const KEY_D = 68;


let p5 = require('p5');

let Assets = require('./Assets');
let Character = require('./Character');
let GameBoard = require('./GameBoard');
let UI = require('./UI');

let debug = true;
let hitBoxSize = 30;

// let gameBoard, 
let assets;
let _p5;

let max, maxHand;
let rat, rat2, chars = [];

let time1 = 0,
  time2 = 0;
let fps = 0;


function update(dt) {
  chars.forEach(v => v.update(dt));

  gameBoard.update(dt);
};

function render() {
  chars.forEach(v => v.draw());
  gameBoard.render();
}

var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    p.createCanvas(640, 400);

    //gameBoard = new GameBoard(newp5);
    window.gameBoard = new GameBoard(newp5);

    // SequenceController.setGameBoard(gameBoard);
    // SequenceController.setDifficulty(5);
    // SequenceController.start();
  };

  /*
   */
  p.preload = function() {
    assets = new Assets(p);
    assets.preload();
  };

  /*
    User tried to hit a slot
  */
  p.mouseClicked = function() {
    let slotID = gameBoard.hit(p.mouseX, p.mouseY);
    // if(slotID > -1){
    //   Sam.play('hit_' + slotID);
    // }
  };

  /*
   */
  p.keyPressed = function() {
    if (p.keyCode === KEY_D) {
      debug = !debug;
    }
    else if(p.keyCode === 65){
      window.gameBoard.pushOutRat();
    }
  };

  /*
   */
  p.draw = function() {
    if (!assets.isDone()) {
      return;
    }

    time1 = p.millis();
    let delta = time1 - time2;

    update(delta);

    p.image(assets.get('data/_idle.png'), 0, 0);
    p.image(assets.get('data/max/head.png'), 0, 74);
    p.image(assets.get('data/max/hand.png'), 0, 280);

    render();

    drawMouseCoords();
    drawHitBoxes();
    drawFPS();

    time2 = time1;
  }
});

function drawFPS() {
  if (!debug) {
    return;
  }

  if (_p5.frameCount % 120 === 0) {
    fps = Math.round(_p5.frameRate());
  }

  _p5.textSize(30);
  _p5.noStroke(255, 255, 255);
  _p5.fill(255, 0, 0);
  _p5.text(`${fps}`, 20, 100);
}


function drawMouseCoords() {
  if (!debug) {
    return;
  }
  _p5.textSize(30);
  _p5.stroke(255, 255, 255);
  newp5.text(`${_p5.mouseX} , ${_p5.mouseY}`, 230, 30);

}

function drawHitBoxes() {

}

function drawArm(key) {
  let k = armPositions[key];
  //  _p5.image(k.img, k.x, k.y);
}


// _p5.textSize(30);
// _p5.stroke(255, 255, 255);
// newp5.text(`${_p5.mouseX} , ${_p5.mouseY}`, 230, 30);

// armPositions.idle = {
//   x: 224,
//   y: 90,
//   img: p.loadImage('data/arm_idle.png')
// }

// armPositions.slot3 = {
//   x: 200,
//   y: 125,
//   img: p.loadImage('data/arm_slot3.png')
// }

// p.image(rat, hitBoxPositions[0][0] - 14, hitBoxPositions[0][1] - 90);
// if (_p5.keyIsDown(51)) {
//   drawArm('slot3');
// } else {
//   drawArm('idle');
// }

// Sam.play('arm_slot3')