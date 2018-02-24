/*
  Andor Saga
  Feb 2018
*/
'use strict';

let test;

let capture;

navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);


let myShader,
  mouse = [0, 0, 0];
let pimg;
let gfx;

// Webcam goodness
let videoCanvas, videoCanvasCtx, videoEl;

let getEl = function(id) { return document.getElementById(id); }
let createEl = function(id) { return document.createElement(id); }

let onError = function(err) {
  let errStr = 'There was a problem accessing your webcam';
  alert(errStr);
  console.log(errStr);
  console.log('Error:' + err);
};

/*
 */
function setup() {
  windowWidth = windowWidth / 1;
  windowHeight = windowHeight / 1;

  createCanvas(windowWidth, windowHeight, WEBGL);
  gfx = createGraphics(windowWidth, windowHeight);
  myShader = new p5.Shader(this._renderer, vert, frag);
  capture = createCapture(VIDEO);

  videoCanvas = createEl('canvas');
  videoCanvas.id = 'videoCanvas'
  videoCanvas.width = windowWidth;
  videoCanvas.height = windowHeight;

  videoCanvasCtx = videoCanvas.getContext('2d');
  videoEl = createEl('video');
  videoEl.width = videoCanvas.width;
  videoEl.height = videoCanvas.height;



  navigator.getUserMedia({ video: true, audio: false }, function(stream) {
    // Moz uses a different property for source
    if (navigator.mozGetUserMedia) {
      console.log('using mozSrcObject');
      videoEl.mozSrcObject = stream;
    } else {
      console.log('using createObjectURL');
      videoEl.src = window.URL.createObjectURL(stream);
    }

    // TODO: change to use requestAnim
    window.videoEl = videoEl;
    window.videoEl.play();

    window.setInterval(() => {
      window.videoCanvasCtx = videoCanvasCtx;
      videoCanvasCtx.drawImage(videoEl, 0, 0, windowWidth, windowHeight);
      test = videoCanvasCtx.getImageData(0, 0, windowWidth, windowHeight);
    }, 33.3);
  }, onError);


  document.getElementsByTagName('body')[0].appendChild(videoEl);
  // navigator.getUserMedia({ video: true, audio: false },

  //   function(stream) {
  //     // Moz uses a different property for source
  //     if (navigator.mozGetUserMedia) {
  //       // console.log('using mozSrcObject');
  //       videoEl.mozSrcObject = stream;
  //     } else {
  //       console.log('using createObjectURL');
  //       videoEl.src = window.URL.createObjectURL(stream);
  //     }

  //     // TODO: change to use requestAnim
  //     videoEl.play();

  //     window.setInterval(render, 33.3);
  //   }, onError);

  // gfx.stroke(0, 255, 0);

  // document
  //   .getElementById('defaultCanvas0')
  //   .addEventListener('contextmenu', e => e.preventDefault());
}

function preload() {
  pimg = loadImage('data/eye.jpg');
}

function mousePressed(event) {
  mouse[event.which - 1] = 1;
}

function mouseReleased(event) {
  mouse[event.which - 1] = 0;
}

function draw() {

  //if (videoCanvas && videoCanvas.width > 1) {
  gfx.push();
  gfx.translate(width / 2, height / 2);
  gfx.imageMode(CENTER);
  // gfx.rotate(frameCount/100);


  gfx.image(pimg, 0, 0);
  if (test) {
    gfx.image(capture, 0, 0);
  }


  gfx.pop();

  push();
  translate(-width / 2, -height / 2);
  shader(myShader);
  myShader.setUniform('time', millis());
  myShader.setUniform('res', [width, height]);
  myShader.setUniform('mouse', [pmouseX, height - pmouseY, mouse[0], mouse[2]]);
  myShader.setUniform('_', [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1]);

  // if (videoCanvas && videoCanvas.width > 1) {
  // debugger;
  // myShader.setUniform('texture0', videoEl);
  // myShader.setUniform('texture0', videoCanvasCtx);
  myShader.setUniform('texture0', gfx);
  // }

  rect(0, 0, windowWidth, windowHeight, 1, 1);
  pop();
  //}
}