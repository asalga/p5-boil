/*
  
*/
'use strict';

let Manifest = {
  // IMAGES
  images: [
    'data/images/background/bk.png',
    'data/images/background/board.png',
    'data/images/crosshair.png',
    'data/images/pause_bar.png',

    'data/images/sam/arms/images/idle.png',
    'data/images/sam/arms/images/max.png',
    'data/images/sam/arms/images/center.png',
    'data/images/sam/arms/images/upper_left.png',
    'data/images/sam/arms/images/upper_right.png',
    'data/images/sam/arms/images/lower_left.png',
    'data/images/sam/arms/images/lower_right.png',

    'data/images/sam/sam.png'
  ],

  // ATLASES
  atlases: [{
      name: 'rat',
      atlas: 'data/images/rat/spritesheet.png',
      meta: 'data/images/rat/spritesheet.json'
    },
    {
      name: 'sam',
      atlas: 'data/images/sam/atlas.png',
      meta: 'data/images/sam/atlas.json'
    },
    {
      name: 'max',
      atlas: 'data/images/max/atlas.png',
      meta: 'data/images/max/atlas.json'
    }
  ],

  // TODO: add slugs names?
  audio: [{
      path: 'data/audio/max/max.mp3'
    },
    {
      path: 'data/audio/rat/hit0.mp3'
    },
    {
      path: 'data/audio/rat/hit1.mp3'
    },
    {
      path: 'data/audio/rat/hit2.mp3'
    },
    {
      path: 'data/audio/sam/miss.mp3'
    },
    {
      path: 'data/audio/background/1_round.mp3'
      // path: 'data/audio/placeholder/test.mp3'
      // path: 'data/audio/placeholder/null.mp3'
    }
  ]
};

module.exports = Manifest;