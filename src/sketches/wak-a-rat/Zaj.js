'use strict';
/*
	Zaj.js

	Manages playing audio
*/

let Howl = require('Howler').Howl;


let Zaj = {};

let _sounds = {

};

let soundHit = new Howl({
  src: ['data/audio/max/max.mp3'],
  volume: 1,
  loop: false,
  autoplay: false
});

Zaj.play = function(key) {
  soundHit.play();
};

module.exports = Zaj;