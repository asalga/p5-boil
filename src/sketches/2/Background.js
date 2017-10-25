function Background() {

  this.stars = new Array(50);

  for (let i = 0; i < this.stars.length; ++i) {
    this.stars[i] = {
      x: random(0, width * 2),
      y: random(0, height),
      s: random(-10, -100)
    };
  }

  this.update = function(dt) {
    for (let i = 0; i < this.stars.length; ++i) {
      this.stars[i].x += dt / 1000 * this.stars[i].s;
      if (this.stars[i].x < -5) {
        this.resetStar(i);
      }
    }
  };

  this.resetStar = function(i) {
    let star = this.stars[i];
    star.x = random(width, width * 2);
    star.y = random(0, height);
    star.s = random(-10, -100);
  }

  this.draw = function() {
    background(0, 0, 0);
    for (let i = 0; i < this.stars.length; ++i) {
      fill(255, 255, 255);
      rect(this.stars[i].x, this.stars[i].y, 4, 4);
    }
  };
}