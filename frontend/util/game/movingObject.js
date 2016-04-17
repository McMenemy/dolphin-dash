module.exports = function () {
  if (typeof MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var MovingObject = MicroMunch.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.angle = 0;
    this.color = options.color;
    // this.img = img;
  };

  MovingObject.prototype.draw = function (ctx, img) {
    // for circles instead of PNGs - useful for seeing if PNG img matches game logic
    // ctx.fillStyle = this.color;
    //
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();

    this.angle = MicroMunch.Util.getRotationAngle(this.vel, this.angle, this.color);

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(
      img, -this.radius, -this.radius,
      2 * this.radius, 2 * this.radius
    );

    // ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
    ctx.restore();

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
