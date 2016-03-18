'use strict';

(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var RADIUS = 7;
  var COLOR = '#ff9900';
  var FISH_VEL = 1.8;
  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  var FISH_TO_FIST_DETECTION_RADIUS = 20;
  var FISH_TO_DOLPHIN_DETECTION_RADIUS = 100;

  var Fish = DolphinDash.Fish = function (options) {
    options.pos = options.pos;
    options.vel = Fish.fishVel();
    options.radius = RADIUS;
    options.color = COLOR;
    this.changeTimeStamp = 0;
    this.prevVel = Fish.fishVel();

    DolphinDash.MovingObject.call(this, options);
  };

  Fish.fishVel = function () {
    var xVel = 0;
    var yVel = FISH_VEL;

    return [xVel, yVel];
  };

  DolphinDash.Util.inherits(Fish, DolphinDash.MovingObject);

  Fish.prototype.isVelChanged = function (prevVel) {
    return prevVel[0] !== this.vel[0] || prevVel[1] !== this.vel[1];
  };

  Fish.prototype.switchColor = function () {
    if (this.color === '#777') {
      this.color = '#fff';
    } else {
      this.color = '#777';
    }
  };

  Fish.prototype.move = function (timeDelta, timestamp, DIM_X, DIM_Y) {
    var timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (DolphinDash.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      // this.vel[1] = Math.abs(this.vel[1]);
      this.pos[1] = DIM_Y;
    }

    if (DolphinDash.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      // this.vel[1] = Math.abs(this.vel[1]) * -1;
      this.pos[1] = 0;
    }

    if (DolphinDash.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      // this.vel[0] = Math.abs(this.vel[0]);
      this.pos[0] = DIM_X;
    }

    if (DolphinDash.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
      // this.vel[0] = Math.abs(this.vel[0]) * -1;
      this.pos[0] = 0;
    }

    if (this.isVelChanged(this.prevVel)) {
      this.changeTimeStamp = timestamp;
      this.prevVel = this.vel.slice(0);
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };

  Fish.prototype.isNearOtherFish = function (otherFish) {
    return DolphinDash.Util.distance(this.pos, otherFish.pos) < FISH_TO_FIST_DETECTION_RADIUS;
  };

  Fish.prototype.isNearDolphin = function (dolphin) {
    return DolphinDash.Util.distance(this.pos, dolphin.pos) < FISH_TO_DOLPHIN_DETECTION_RADIUS;
  };

  Fish.prototype.moveWithMostRecentlyChangedFish = function (otherFish) {
    if (this.changeTimeStamp > otherFish.changeTimeStamp) {
      otherFish.vel = this.vel;
    } else if (this.changeTimeStamp < otherFish.changeTimeStamp) {
      this.vel = otherFish.vel;
    }
  };

  Fish.prototype.moveAwayFromPredator = function (predator) {
    this.vel = DolphinDash.Util.calcNormalVector(this.vel, this.pos, predator.vel, predator.pos, 'away');
  };

  Fish.prototype.isEaten = function (dolphin, dolphRadius) {
    var distFromDolph = DolphinDash.Util.distance(this.pos, dolphin.pos);
    return distFromDolph <= dolphRadius;
  };

})();
