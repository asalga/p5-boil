/*
  EP - Space Game
  Andor Saga
  Oct 2017

  TODO:
 
  - create BitmapFont plugin
    - create interface

  - Create Scene
  - Create Bullet
  - Create BoundingBox
*/

let rasterFont;

// const Ship = require('./Ship');
// const p5 = require('p5');
// const scene = require('./Scene').getInstance();

function setup() {
  console.log('setup');

  createCanvas(500, 500);
  rasterTextFont(rasterFont);
    console.log(rasterFont);

}

function draw() {
  background(0, 0, 0);
  rect(0,0,100,100);

  rasterText(32, 20, 20);
}

function preload() {
  rasterFont = loadRasterFont('data/font.png', function() {
    console.log('done!');
  });
}


// let _p5;
// let time1 = 0,
//   time2 = 0;
// let rasterFont;

// var update = function(dt) {
//   scene.update(dt);
// };

// /*
//  */
// var render = function() {
//   scene.draw();
// }

// var newp5 = new p5(function(p) {

//   window.p5 = p;

//   p.setup = function setup() {
//     p.createCanvas(640, 400);

//     let user = new Ship({ p: p, userShip: userShip });
//     scene.setUser(user);

//     console.log(user);
//   };

//   /*
//    */
//   p.preload = function() {

//     rasterFont = p.loadRasterFont('data/font.png','data/font_meta.json');

//     userShip = p.loadImage('data/user.png', function(){
//       scene.createAsset('user','data/user.png');
//     });

//     p.loadImage('data/user_bullet.png', function(){
//       scene.createAsset('user_bullet','data/user_bullet.png');
//     });
//   };

//   /*
//    */
//   p.draw = function() {
//     time1 = p.millis();
//     let delta = time1 - time2;

//     update(delta);
//     render();
//     time2 = time1;


//     // window.p5.textFont(rasterFont);
//     // window.p5.textSize(32);
//     // window.p5.stroke(255,0,0);
//     // window.p5.text('Hello, test', 0, 20);

//     // window.p5.rasterTextFont(rasterFont);
//     // window.p5.rasterTextSize(2);
//     // window.p5.stroke(255,0,0);
//     // window.p5.rasterText('asdf', 20);

//     // _p5.stroke(255, 0, 0);
//     // _p5.text(Math.round(delta), 10, 10);
//   }
// });