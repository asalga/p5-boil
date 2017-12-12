'use strict';
/*
  Wak-a-Rat
  Andor Saga
  Oct 2017

  fix jshint issues
*/

let p5 = require('p5');

let KB = require('./KB');
let setupBitmapFont = require('./p5BitmapFont');
let Assets = require('./Assets');
let GameBoard = require('./GameBoard').instance;
let Max = require('./characters/Max');
let Sam = require('./characters/Sam');
let UI = require('./UI');

setupBitmapFont(p5);

let debug = true;
// let hitBoxSize = 30;

let assets;
let _p5;

let time1 = 0,
  time2 = 0;
let fps = 0;
let max;
let sam;

let bitmapFont;

function update(dt) {
  GameBoard.update(dt);
  sam.update(dt);
  max.update(dt);
}

function render() {
  _p5.image(assets.get('data/images/background/bk.png'), 0, 0);
  _p5.image(assets.get('data/images/background/board.png'), 0, 238);
  max.render();
  sam.render();
  GameBoard.render();
}

function drawMouseCoords() {
  if (!debug) {
    return;
  }
  _p5.bitmapText(`${_p5.mouseX} , ${_p5.mouseY}`, 200, 10);
}

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


var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    console.log('>> SETUP');
    p.createCanvas(640, 400);
    GameBoard.p5 = p;
    p.bitmapTextFont(bitmapFont);

    max = new Max({ p5: p });
    sam = new Sam({ p5: p });
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

    if (p.keyCode >= KB._0 && p.keyCode <= KB._7) {
      let idx = p.keyCode - 48;
      sam.hit(idx);
      
      if(idx === 6){
        max.hit();
      }

      return;
    }

    switch (p.keyCode) {
      case KB._D:
        debug = !debug;
        break;
      case KB._A:
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
    render();

    drawMouseCoords();
    drawFPS();

    time2 = time1;
  };
});

// p.image(rat, hitBoxPositions[0][0] - 14, hitBoxPositions[0][1] - 90);
// if (_p5.keyIsDown(51)) {
//   drawArm('slot3');
// } else {
//   drawArm('idle');
// }