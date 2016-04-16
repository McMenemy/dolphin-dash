module.exports = function () {

  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var RADIUS = 8;
  var COLOR = '#ff9900';
  var PREY_VEL = 1.8;
  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  var PREY_TO_FIST_DETECTION_RADIUS = 20;
  var PREY_TO_PLAYER_DETECTION_RADIUS = 100;

  var Prey = MicroMunch.Prey = function (options) {
    options.pos = options.pos;
    options.vel = Prey.preyVel();
    options.radius = RADIUS;
    options.color = COLOR;
    // options.img = '../../public/prey.png';
    this.changeTimeStamp = 0;
    this.prevVel = Prey.preyVel();

    MicroMunch.MovingObject.call(this, options);
  };

  Prey.preyVel = function () {
    var xVel = 0;
    var yVel = PREY_VEL;

    return [xVel, yVel];
  };

  MicroMunch.Util.inherits(Prey, MicroMunch.MovingObject);

  Prey.prototype.isVelChanged = function (prevVel) {
    return prevVel[0] !== this.vel[0] || prevVel[1] !== this.vel[1];
  };

  Prey.prototype.switchColor = function () {
    if (this.color === '#777') {
      this.color = '#fff';
    } else {
      this.color = '#777';
    }
  };

  Prey.prototype.move = function (timeDelta, timestamp, DIM_X, DIM_Y) {
    var timeDelta = timeDelta || 1;
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    if (MicroMunch.Game.isOutOfTopBounds(this.pos[1], this.radius)) {
      // this.vel[1] = Math.abs(this.vel[1]);
      this.pos[1] = DIM_Y;
    }

    if (MicroMunch.Game.isOutOfBotBounds(this.pos[1], this.radius)) {
      // this.vel[1] = Math.abs(this.vel[1]) * -1;
      this.pos[1] = 0;
    }

    if (MicroMunch.Game.isOutOfLeftBounds(this.pos[0], this.radius)) {
      // this.vel[0] = Math.abs(this.vel[0]);
      this.pos[0] = DIM_X;
    }

    if (MicroMunch.Game.isOutOfRightBounds(this.pos[0], this.radius)) {
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

  Prey.prototype.isNearOtherPrey = function (otherPrey) {
    return MicroMunch.Util.distance(this.pos, otherPrey.pos) < PREY_TO_FIST_DETECTION_RADIUS;
  };

  Prey.prototype.isNearPlayer = function (player) {
    return MicroMunch.Util.distance(this.pos, player.pos) < PREY_TO_PLAYER_DETECTION_RADIUS;
  };

  Prey.prototype.moveWithMostRecentlyChangedPrey = function (otherPrey) {
    if (this.changeTimeStamp > otherPrey.changeTimeStamp) {
      otherPrey.vel = this.vel;
    } else if (this.changeTimeStamp < otherPrey.changeTimeStamp) {
      this.vel = otherPrey.vel;
    }
  };

  Prey.prototype.moveAwayFromPredator = function (predator) {
    this.vel = MicroMunch.Util.calcNormalVector(this.vel, this.pos, predator.vel, predator.pos, 'away');
  };

  Prey.prototype.isEaten = function (player, dolphRadius) {
    var distFromDolph = MicroMunch.Util.distance(this.pos, player.pos);
    return distFromDolph <= dolphRadius;
  };

};
