'use strict';
/*
  Wak-a-Rat
  Andor Saga
  Oct 2017

  - add pause copy

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

let assets;
let _p5;

let now = 0,
  lastTime = 0,
  gameTime = 0;
let paused = false;

let fps = 0;

let max;
let sam;

let bitmapFont;


function update(dt) {
  if (paused) {
    return;
  }

  gameTime += dt;

  GameBoard.update(dt);
  sam.update(dt);
  max.update(dt);
}

function render() {
  _p5.image(assets.get('data/images/background/bk.png'), 0, 0);
  _p5.image(assets.get('data/images/background/board.png'), 0, 238);
  sam.renderBody();
  max.render();

  // render all the rats in the gameboard,
  // which takes care of rendering Sam's arm at the right time
  GameBoard.render(sam);
}

function renderOverlay() {
  _p5.noStroke();
  _p5.fill(0, 120)
  _p5.rect(0, 0, _p5.width, _p5.height);
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

/*
 */
function togglePause() {
  paused = !paused;
}

var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    p.createCanvas(640, 400);
    p.bitmapTextFont(bitmapFont);
    p.cursor(p.CROSS);

    GameBoard.p5 = p;

    max = new Max({ p5: p });
    sam = new Sam({ p5: p });
  };

  /*
   */
  p.preload = function() {
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
    if (paused) {
      return;
    }

    let slotIdx = GameBoard.hit({ x: p.mouseX, y: p.mouseY });

    if (slotIdx >= 0 && slotIdx <= 5) {
      sam.hit(slotIdx);
    }
    if (slotIdx === 5) {
      max.hit();
    }
  };

  /*
    Just for debugging
   */
  p.keyPressed = function() {
    // console.log(p.keyCode);

    switch (p.keyCode) {
      case KB._D:
        debug = !debug;
        break;
      case KB._A:
        GameBoard.pushOutRat();
        break;
      case KB._SPACE:
        togglePause();
        if (paused === false) {
          lastTime = p.millis();
        }
        break;
    }
  };

  /*
   */
  p.draw = function() {
    if (!assets.isDone()) {
      return;
    }

    now = p.millis();
    let delta = now - lastTime;

    update(delta);
    render();

    drawMouseCoords();
    drawFPS();

    if (paused) {
      renderOverlay();
    }

    p.bitmapText(`${parseInt(gameTime/1000)}`, 20, 140);

    lastTime = now;
  };
});