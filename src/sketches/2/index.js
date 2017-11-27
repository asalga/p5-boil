/*
  EP - Space Game
  Andor Saga
  Oct 2017


  public domain sprites:
  opengameart.org/content/1616-ship-collection
*/

let sonicFont;
let score = 4259;
let time1 = 0,
  time2 = 0;
let starBackground;
let gameTime = 0;

let scene = new Scene();

function setup() {
  createCanvas(640, 480);

  scene.createSprite({ type: 'user_ship' });
  scene.createSprite({ type: 'enemy_ship' });

  starBackground = new Background();
}

function preload() {
  sonicFont = loadBitmapFont(
    'data/font@2.png', 
      // Data.get('font'),
    {
    glyphWidth: 8 * 2,
    glyphHeight: 8 * 2,
    glyphBorder: 0,
    rows: 12,
    cols: 8
  });

  for (var i = 0; i < Assets.images.length; ++i) {
    let n = Assets.images[i].name;
    let p = Assets.images[i].path;
    
    loadImage(p, function(img){
      scene.createAsset(n, img);
      img.loadPixels();
    });
  }
}

function draw() {
  background(0, 0, 0);

  time1 = millis();
  var delta = time1 - time2;

  gameTime += delta;
  starBackground.update(delta);
  scene.update(delta);

  starBackground.draw();
  scene.draw();

  bitmapTextFont(sonicFont);
  bitmapText('score:' + nf(score, 7), 20, 20);
  bitmapText('HEALTH:' + scene.user.health, 20, 40);

  time2 = time1;
};