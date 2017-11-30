'use strict';

let Utils = {

  pointInRect(p, r) {
    if (p.x >= r.x && p.x <= r.x + r.w &&
      p.y >= r.y && p.y <= r.y + r.h) {
      return true;
    }
    return false;
  },
  noop() {}
};

module.exports = Utils;