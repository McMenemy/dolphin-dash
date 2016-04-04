'use strict';

(function () {

  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var RADIUS = 50;
  var COLOR = '#000';
  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  var MAX_VEL = 2.3;
  var PREDATORTO_PREY_DETECTION_RADIUS = 400;

  var Predator = MicroMunch.Predator = function (options) {
    options.pos = options.pos;
    options.vel = [MAX_VEL, 0];
    options.radius = RADIUS;
    options.color = COLOR;

    MicroMunch.MovingObject.call(this, options);
  };

  MicroMunch.Util.inherits(Predator, MicroMunch.MovingObject);

  Predator.prototype.move = function (timeDelta, DIM_X, DIM_Y) {
    timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (MicroMunch.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      this.pos[1] = DIM_Y;
    }

    if (MicroMunch.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      this.pos[1] = 0;
    }

    if (MicroMunch.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      this.pos[0] = DIM_X;
    }

    if (MicroMunch.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
      this.pos[0] = 0;
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };

  Predator.prototype.isNearPlayer = function (player) {
    return MicroMunch.Util.distance(this.pos, player.pos) < PREDATORTO_PREY_DETECTION_RADIUS;
  };

  Predator.prototype.isTouchingPlayer = function (player) {
    return MicroMunch.Util.distance(this.pos, player.pos) < RADIUS + player.radius;
  };

  Predator.prototype.chasePrey = function (player) {
    this.vel = MicroMunch.Util.calcPredatorTowardVec(this.vel, this.pos, player.vel, player.pos);
  };

})();
