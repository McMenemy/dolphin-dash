'use strict';

(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var RADIUS = 50;
  var COLOR = '#000';
  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  var MAX_VEL = 2.3;
  var PREDATORTO_PREY_DETECTION_RADIUS = 400;

  var Predator = DolphinDash.Predator = function (options) {
    options.pos = options.pos;
    options.vel = [MAX_VEL, 0];
    options.radius = RADIUS;
    options.color = COLOR;

    DolphinDash.MovingObject.call(this, options);
  };

  DolphinDash.Util.inherits(Predator, DolphinDash.MovingObject);

  Predator.prototype.move = function (timeDelta, DIM_X, DIM_Y) {
    timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (DolphinDash.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      this.pos[1] = DIM_Y;
    }

    if (DolphinDash.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      this.pos[1] = 0;
    }

    if (DolphinDash.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      this.pos[0] = DIM_X;
    }

    if (DolphinDash.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
      this.pos[0] = 0;
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };

  Predator.prototype.isNearDolphin = function (dolphin) {
    return DolphinDash.Util.distance(this.pos, dolphin.pos) < PREDATORTO_PREY_DETECTION_RADIUS;
  };

  Predator.prototype.isTouchingDolphin = function (dolphin) {
    return DolphinDash.Util.distance(this.pos, dolphin.pos) < RADIUS + dolphin.radius;
  };

  Predator.prototype.chasePrey = function (dolphin) {
    this.vel = DolphinDash.Util.calcPredatorTowardVec(this.vel, this.pos, dolphin.vel, dolphin.pos);
  };

})();
