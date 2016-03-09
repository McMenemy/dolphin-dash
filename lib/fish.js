(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var RADIUS = 7;
  var SPEED = 4;
  var COLOR = '#777';
  var FISH_VEL = -1;

  var Fish = DolphinDash.Fish = function (options) {
    options.pos = options.pos;
    options.vel = Fish.randomVel();
    options.radius = RADIUS;
    options.color = COLOR;
    this.changeTimeStamp = 0;

    DolphinDash.MovingObject.call(this, options);
  };

  Fish.randomVel = function () {
    var xVel = FISH_VEL;
    var yVel = FISH_VEL;

    return [xVel, yVel];
  };

  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

  DolphinDash.Util.inherits(Fish, DolphinDash.MovingObject);

  Fish.prototype.isVelChanged = function (beforeVel) {
    return beforeVel[0] !== this.vel[0] || beforeVel[1] !== this.vel[1];
  };

  Fish.prototype.move = function (timeDelta, timestamp) {
    timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    var beforeVel = this.vel;

    if (DolphinDash.Game.isOutOfXBounds(this.pos[0], this.radius)) {
      this.vel[0] *= -1;
    }

    if (DolphinDash.Game.isOutOfYBounds(this.pos[1], this.radius)) {
      this.vel[1] *= -1;
    }

    if (this.isVelChanged(beforeVel)) {
      this.changeTimeStamp = timestamp;
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };

  Fish.prototype.isNearOtherFish = function (otherFish) {
    return DolphinDash.Util.distance(this.pos, otherFish.pos) < 25;
  };

  Fish.prototype.moveWithMostRecentlyChangedFish = function (otherFish, timestamp) {
    if (this.vel[0] !== otherFish.vel[0] || this.vel[1] !== otherFish.vel[1]) {
      if (this.changeTimeStamp > otherFish.changeTimeStamp) {
        otherFish.vel = this.vel;
        otherFish.changeTimeStamp = timestamp;
      } else {
        this.vel = otherFish.vel;
        this.changeTimeStamp = timestamp;
      }
    }
  };

})();
