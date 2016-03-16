(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var RADIUS = 25;
  var COLOR = '#777';
  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  var DOLPHIN_MAX_VEL = 3;

  var Dolphin = DolphinDash.Dolphin = function (options) {
    options.pos = options.pos;
    options.vel = [0, 0];
    options.radius = RADIUS;
    options.color = COLOR;
    this.isEaten = false;

    DolphinDash.MovingObject.call(this, options);
  };

  DolphinDash.Util.inherits(Dolphin, DolphinDash.MovingObject);

  Dolphin.prototype.move = function (timeDelta, DIM_X, DIM_Y) {
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

    this.enforceMaxVel();

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };

  Dolphin.prototype.enforceMaxVel = function () {
    if (Math.abs(this.vel[0]) > DOLPHIN_MAX_VEL) {
      var direction = this.vel[0] / Math.abs(this.vel[0]);
      this.vel[0] = DOLPHIN_MAX_VEL * direction;
    }

    if (Math.abs(this.vel[1]) > DOLPHIN_MAX_VEL) {
      var direction = this.vel[1] / Math.abs(this.vel[1]);
      this.vel[1] = DOLPHIN_MAX_VEL * direction;
    }
  },

  Dolphin.prototype.accelerate = function (acceleration) {
    this.vel[0] += acceleration[0];
    this.vel[1] += acceleration[1];
  };

})();
