'use strict';
/*
  Wak-a-Rat
  Andor Saga
  Oct 2017
*/

let p5 = require('p5');
let p5BitmapFont = require('p5-bitmapfont')(p5);

let KB = require('./KB');
let Assets = require('./Assets');
let GameBoard = require('./GameBoard').instance;
let Max = require('./characters/Max');
let Sam = require('./characters/Sam');
let UI = require('./UI');

let debug = false;
let paused = true; //false;

let assets;
let _p5;

let now = 0,
  lastTime = 0,
  gameTime = 0;

let fps = 0;

let max, sam;

let bitmapFont;
let scummFont;

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


/*

*/
function renderPauseOverlay() {
  _p5.noStroke();
  _p5.fill(0, 120)
  _p5.rect(0, 0, _p5.width, _p5.height);

  let rectObj = {
    x: 110,
    y: 140,
    h: 20,
    w: 440
  };

  _p5.image(assets.get('data/images/pause_bar.png'), rectObj.x, rectObj.y);
  _p5.bitmapTextFont(scummFont);
  _p5.tint(80, 80, 80);
  _p5.bitmapText(`Game Paused. Press SPACE to Continue.`, rectObj.x + 5, rectObj.y + 1);
  _p5.noTint();;
}

/*
  Just the score
*/
function drawUI() {
  _p5.bitmapTextFont(bitmapFont);
  _p5.bitmapText(`${GameBoard.getNumHits()} - ${GameBoard.getNumMisses()}`, 58, 38);
}

/*
  Draw FPS & GameTime
*/
function drawDebug() {
  if (!debug) {
    return;
  }

  if (_p5.frameCount % 120 === 0) {
    fps = Math.round(_p5.frameRate());
  }

  _p5.bitmapTextFont(scummFont);
  _p5.bitmapText(`FPS: ${fps}`, 20, 60);
  _p5.bitmapText(`GameTime: ${~~(gameTime/1000)}`, 20, 80);
  _p5.bitmapText(`${_p5.mouseX} , ${_p5.mouseY}`, 20, 100);
}

/*
 */
function togglePause() {
  paused = !paused;
  if (paused === false) {
    lastTime = _p5.millis();
  }
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

    scummFont = p.loadBitmapFont('data/fonts/scumm.png', 'data/fonts/scumm.json');

    bitmapFont = p.loadBitmapFont('data/fonts/lucasFont.png', {
      glyphWidth: 14,
      glyphHeight: 16,
      glyphBorder: 0,
      rows: 12,
      cols: 9,
      charSpacing: 1
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
      sam.hit(5);
      max.hit();
    }
  };

  /*
   */
  p.keyPressed = function() {
    switch (p.keyCode) {
      case KB._D:
        debug = !debug;
        break;
      case KB._SPACE:
        togglePause();
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

    drawDebug();
    drawUI();

    if (paused) {
      renderPauseOverlay();
    }

    lastTime = now;
  };
});