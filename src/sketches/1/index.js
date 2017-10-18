/*
  Wak-a-Rat
  Andor Saga
  Oct 2017
*/

/*
  
  Create Asset manager
  Create Animator
  Create Timer  
*/

var p5 = require('p5');
var GameBoard = require('./GameBoard');

// var AssetLoader = require('./AssetLoader');


let img = null;
let armPositions = {};

let hitBoxSize = 30;
let max, maxHand;
let rat;

let debug = true;

let hitBoxPositions = [
  [185, 282],
  [97, 330],
  [225, 320],
  [368, 310],
  [268, 363]
];

let ratTest;
let gameBoard;
let _p5;


var Sam = new Character(opts);

Sam.init(cfg);
Sam.update(dt);
Sam.play('str');


var newp5 = new p5(function(p) {
  _p5 = p;

  p.setup = function setup() {
    p.createCanvas(640, 400);

    gameBoard = new GameBoard(newp5);
  };

  p.preload = function() {
    img = p.loadImage('data/_idle.png');
    rat = p.loadImage('data/rat/rat_2.png');
    max = p.loadImage('data/max/head.png');
    maxHand = p.loadImage('data/max/hand.png');

    armPositions.idle = {
      x: 224,
      y: 90,
      img: p.loadImage('data/arm_idle.png')
    }

    armPositions.slot3 = {
      x: 200,
      y: 125,
      img: p.loadImage('data/arm_slot3.png')
    }
  }

  /*
    User tried to hit a slot
  */
  p.mouseClicked = function(){
    let slotID = gameBoard.hit(p.mouseX, p.mouseY);

    // if(slotID > -1){
    //   Sam.play('hit_' + slotID);
    // }

    // console.log(gameBoard.getNumMisses());
  }

  p.draw = function() {
    //characters.update(delta);

    p.image(img, 0, 0);
    p.image(max, 0, 74);
    p.image(maxHand, 0, 280)

    drawMouseCoords();
    drawHitBoxes();

    p.image(rat, hitBoxPositions[0][0] - 14, hitBoxPositions[0][1] - 90);

    if (_p5.keyIsDown(51)) {
      drawArm('slot3');
    } else {
      drawArm('idle');
    }

    Sam.play('arm_slot3')
  }
});


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
  _p5.image(k.img, k.x, k.y);
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
