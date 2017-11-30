/*
  Wak-a-Rat
  Andor Saga
  Oct 2017
*/

const KEY_A = 65;
const KEY_D = 68;

let p5 = require('p5');
let setupBitmapFont = require('./p5BitmapFont');
let Assets = require('./Assets');
let GameBoard = require('./GameBoard').instance;
let Sam = require('./characters/Sam').instance;
let Max = require('./characters/Max');
let UI = require('./UI');

setupBitmapFont(p5);

let debug = true;
let hitBoxSize = 30;

let assets;
let _p5;

let time1 = 0,
  time2 = 0;
let fps = 0;
let max;


let bitmapFont;

function update(dt) {
  GameBoard.update(dt);
  // Sam.update(dt);
  max.update(dt);
};

function render() {
  GameBoard.render();
  // Sam.render();
  max.render();
}

var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    console.log('>> SETUP');
    p.createCanvas(640, 400);
    GameBoard.p5 = p;
    p.bitmapTextFont(bitmapFont);

    // Sam.p = p;
    max = new Max({ p5: p });
  };

  /*
   */
  p.preload = function() {
    console.log('>> PRELOAD');
    assets = new Assets(p);

    assets.preload();

    bitmapFont = p.loadBitmapFont('data/fonts/lucasFont.png', {
      glyphWidth: 14,
      glyphHeight: 16,
      glyphBorder: 0,
      rows: 12,
      cols: 9
    });
  };

  /*
    User tried to hit a slot
  */
  p.mousePressed = function() {
    GameBoard.hit({ x: p.mouseX, y: p.mouseY });
  };

  /*
   */
  p.keyPressed = function() {
    switch (p.keyCode) {
      case KEY_D:
        debug = !debug;
        break;
      case KEY_A:
        GameBoard.pushOutRat();
        break;
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

    // background
    p.image(assets.get('data/images/background/background.png'), 0, 0);

    render();

    drawMouseCoords();
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

  _p5.bitmapText(`${GameBoard.getNumHits()} - ${GameBoard.getNumMisses()}`, 58, 38);
  _p5.bitmapText(`${fps}`, 20, 100);
}

function drawMouseCoords() {
  if (!debug) {
    return;
  }
  _p5.bitmapText(`${_p5.mouseX} , ${_p5.mouseY}`, 200, 10);
}

function drawArm(key) {
  let k = armPositions[key];
  //  _p5.image(k.img, k.x, k.y);
}

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