module.exports = function () {
  if (typeof MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var MovingObject = MicroMunch.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    // this.img = img;
  };

  MovingObject.prototype.draw = function (ctx, img) {
    // ctx.fillStyle = this.color;
    //
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );

    // ctx.fill();
    _this = this;
    ctx.drawImage(img, _this.pos[0] - this.radius, _this.pos[1] - this.radius, 2 * _this.radius, 2 * _this.radius);
  };

  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  MovingObject.prototype.move = function (timeDelta) {
    var timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (MicroMunch.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      this.vel[1] = Math.abs(this.vel[1]);
    }

    if (MicroMunch.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      this.vel[1] = Math.abs(this.vel[1]) * -1;
    }

    if (MicroMunch.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      this.vel[0] = Math.abs(this.vel[0]);
    }

    if (MicroMunch.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
      this.vel[0] = Math.abs(this.vel[0]) * -1;
    }

    var moveX = this.vel[0] * velocityScale;
    var moveY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];
  };
};
