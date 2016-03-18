'use strict';

(function () {
  if (typeof DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var MovingObject = DolphinDash.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
  };

  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  MovingObject.prototype.move = function (timeDelta) {
    var timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (DolphinDash.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      this.vel[1] = Math.abs(this.vel[1]);
    }

    if (DolphinDash.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      this.vel[1] = Math.abs(this.vel[1]) * -1;
    }

    if (DolphinDash.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      this.vel[0] = Math.abs(this.vel[0]);
    }

    if (DolphinDash.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
      this.vel[0] = Math.abs(this.vel[0]) * -1;
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };
})();
