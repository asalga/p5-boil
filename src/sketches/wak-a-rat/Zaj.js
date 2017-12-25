'use strict';
/*
	Zaj.js

	Manages playing audio
*/

let Howl = require('Howler').Howl;

let Zaj = {};

Zaj.play = function(k) {
  k.play();
};

module.exports = Zaj;