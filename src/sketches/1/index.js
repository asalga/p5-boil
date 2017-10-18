/*
  Wak-a-Rat
  Andor Saga
  Oct 2017
*/

let p5 = require('p5');
let GameBoard = require('./GameBoard');
let Assets = require('./Assets');
let Character = require('./Character');


let debug = true;
let hitBoxSize = 30;
let max, maxHand;
let gameBoard, assets;
let _p5;
let characters = [];
let hitBoxPositions = [
  [185, 282],
  [97, 330],
  [225, 320],
  [368, 310],
  [268, 363]
];
let time1 = 0,
  time2 = 0;
let fps = 0;

/*
 */
var update = function(dt) {

  characters.forEach((v) => {
    v.update(dt);
  });
};

var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    p.createCanvas(640, 400);
    gameBoard = new GameBoard(newp5);
  };

  /*
   */
  p.preload = function() {
    assets = new Assets(p);
    assets.preload();

    let rat = new Character({ p5: p, name: 'rat' });
    characters.push(rat);
    rat.play();
  };

  /*
    User tried to hit a slot
  */
  p.mouseClicked = function() {
    let slotID = gameBoard.hit(p.mouseX, p.mouseY);

    // if(slotID > -1){
    //   Sam.play('hit_' + slotID);
    // }

    // console.log(gameBoard.getNumMisses());
  }

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

    drawMouseCoords();
    drawHitBoxes();
    drawFPS();


    time2 = time1;
  }
});

function drawFPS() {
  if (_p5.frameCount % 120 === 0) {
    fps = Math.round(_p5.frameRate());
  }

  _p5.textSize(30);
  _p5.noStroke(255, 255, 255);
  _p5.fill(255,0,0);
  _p5.text(`${fps}`, 20, 100);
}


function drawMouseCoords() {
  if (debug) {
    _p5.textSize(30);
    _p5.stroke(255, 255, 255);
    newp5.text(`${_p5.mouseX} , ${_p5.mouseY}`, 230, 30);
  }
}

function drawHitBoxes() {
  if (debug) {
    _p5.fill(33, 66, 99);
    _p5.ellipse(185, 282, hitBoxSize, hitBoxSize);
    _p5.ellipse(97, 330, hitBoxSize, hitBoxSize);
    _p5.ellipse(225, 320, hitBoxSize, hitBoxSize);
    _p5.ellipse(368, 310, hitBoxSize, hitBoxSize);
    _p5.ellipse(268, 363, hitBoxSize, hitBoxSize);
  }
}

function drawArm(key) {
  let k = armPositions[key];
  //  _p5.image(k.img, k.x, k.y);
}




// let maxTest = new Max();
// maxTest.play('hit');

// ratTest = new Rat();
// ratTest.enter(2);
// ratTest.hit();
// ratTest.exit();

// ratTest.play('taunt');
// ratTest.play('enter');
// ratTest.play('exit');
// ratTest.play('hit');
// ratTest.play('idle');
// ratTest.play('dizzy1');
// ratTest.play('dizzy2');
// p.background(100, 100, 100);
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