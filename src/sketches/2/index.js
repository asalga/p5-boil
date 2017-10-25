/*
  EP - Space Game
  Andor Saga
  Oct 2017
*/

let sonicFont;
let score = 4259;
let time1 = 0,
  time2 = 0;

let scene = new Scene();

function setup() {
  createCanvas(640, 480);

  let user = new Ship({ userShip: userShip });
  scene.setUser(user);
}


function preload() {
  sonicFont = loadBitmapFont('data/sonicFont@2.png', {
    glyphWidth: 8 * 2,
    glyphHeight: 8 * 2,
    glyphBorder: 0,
    rows: 12,
    cols: 8
  });

  userShip = loadImage('data/user.png', function(img) {
    scene.createAsset('user', img);
  });

  loadImage('data/user_bullet.png', function(img) {
    scene.createAsset('userBullet', img);
  });
}

function draw() {
  background(0, 0, 0);

  time1 = millis();
  let delta = time1 - time2;

  scene.update(delta);
  scene.draw();

  bitmapTextFont(sonicFont);
  bitmapText('score:' + nf(score, 7), 20, 20);

  time2 = time1;
};