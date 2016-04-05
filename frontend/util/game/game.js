module.exports = function () {

  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  // var BG_COLOR = '#00ccff';
  var DIM_X = 600;
  var DIM_Y = 600;
  var PREY_ROWS = 5;
  var PREY_COLS = 5;
  var NUM_PREY = PREY_ROWS * PREY_COLS;
  var PLAYER_START_POS = [280, 280];
  var PREDATOR_START_POS = [-50, 0];
  var GAME_DURATION = 45000; // milliseconds
  var TIME_PREDATOR_ENTERS = 42000;
  var TIME_PREY_ENTERS = 44900;
  var TIME_MORE_PREY_ENTERS = 15000;
  var NIGHT_DURATION = 10000;

  var Game = MicroMunch.Game = function () {
    this.prey = this.addPrey();
    this.player = new MicroMunch.Player({ pos: PLAYER_START_POS });
    this.predator = new MicroMunch.Predator({ pos: PREDATOR_START_POS });
    this.timestamp = 0;
    this.scoreboard = document.getElementById('scoreboard');
    this.score = 0;
    this.gamestatus = document.getElementById('gamestatus');
    this.startTime = new Date;
    this.timer = document.getElementById('timer');
    this.shouldGameContinue = true;
    this.timeRemaining = 30000;
  };

  Game.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
  };

  window.addEventListener('keydown', function (event) {
    var Game = this.MicroMunch.Game;
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        Game.userMoves.d = true;
        break;
      case 83: //s
        Game.userMoves.s = true;
        break;
      case 65: //a
        Game.userMoves.a = true;
        break;
      case 87: //w
        Game.userMoves.w = true;
        break;
    }
  });

  window.addEventListener('keyup', function (event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        Game.userMoves.d = false;
        break;
      case 83: //s
        Game.userMoves.s = false;
        break;
      case 65: //a
        Game.userMoves.a = false;
        break;
      case 87: //w
        Game.userMoves.w = false;
        break;
    }
  });

  Game.userMoves = {
    d: false,
    s: false,
    w: false,
    a: false,
  },

  Game.prototype.takePlayerMoveInput = function () {
    var _this = this;
    Object.keys(Game.userMoves).forEach(function (k) {
      if (Game.userMoves[k]) {
        _this.player.accelerate(Game.MOVES[k]);
      }
    });
  },

  Game.randomPos = function () {
    var xCoord = Math.round(Math.random() * DIM_X);
    var yCoord = Math.round(Math.random() * DIM_Y);

    return [xCoord, yCoord];
  },

  Game.prototype.addPrey = function () {
    var prey = [];
    var xCoord = 20;
    var yCoord = 250;
    for (var r = 0; r < PREY_ROWS; r++) {
      xCoord += 25;
      yCoord = 250;
      for (var c = 0; c < PREY_COLS; c++) {
        yCoord += 25;
        var newPrey = new MicroMunch.Prey({ pos: [xCoord, yCoord] });
        prey.push(newPrey);
      }
    }

    return prey;
  };

  Game.prototype.getLightSetting = function () {
    var timePassed = GAME_DURATION - this.timeRemaining;
    var transparency = (timePassed / (GAME_DURATION - NIGHT_DURATION)).toFixed(2);
    return 'rgba(0, 0, 0,' + transparency + ')';
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.fillStyle = this.getLightSetting();
    ctx.fillRect(0, 0, DIM_X, DIM_Y);
    this.prey.forEach(function (prey) {
      prey.draw(ctx);

      // ctx.drawImage('prey.png', prey.pos[0], prey.pos[1]);
    });

    this.predator.draw(ctx);
    this.player.draw(ctx);
  };

  Game.prototype.finalDraw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, DIM_X, DIM_Y);
    this.prey.forEach(function (prey) {
      prey.draw(ctx);

      // ctx.drawImage('prey.png', prey.pos[0], prey.pos[1]);
    });

    this.predator.draw(ctx);
    this.player.draw(ctx);
  };

  Game.prototype.step = function (delta) {
    this.timestamp += 1;
    this.takePlayerMoveInput();
    this.moveObjects(delta);
    this.schoolPrey();

    // if (this.shouldMorePreyEnter()) {
    //   this.prey.concat(this.addPrey());
    // }

    this.huntPrey();
    this.isGameOver();
  };

  Game.prototype.gettimeRemaining = function () {
    var currentTime = new Date;
    return GAME_DURATION - (currentTime - this.startTime);
  };

  Game.prototype.isGameOver = function () {
    this.timeRemaining = this.gettimeRemaining();
    this.timer.innerHTML = Math.round(this.timeRemaining / 1000);
    if (this.timeRemaining > GAME_DURATION) {
      this.gamestatus.innerHTML = 'time up';
      this.shouldGameContinue = false;
      return true;
    }

    if (this.player.isEaten) {
      this.gamestatus.innerHTML = 'you\'ve been eaten';
      this.shouldGameContinue = false;
      return true;
    }

    return false;
  };

  Game.prototype.hasPredatorEntered = function () {
    return this.timeRemaining <= TIME_PREDATOR_ENTERS;
  };

  Game.prototype.shouldMorePreyEnter = function () {
    return this.timeRemaining <= TIME_MORE_PREY_ENTERS;
  };

  Game.prototype.arePreyReady = function () {
    return this.timeRemaining <= TIME_PREY_ENTERS;
  };

  Game.prototype.moveObjects = function (timeDelta) {
    var _this = this;
    this.player.move(timeDelta, DIM_X, DIM_Y);

    if (this.arePreyReady()) {
      this.prey.forEach(function (prey) {
        prey.move(timeDelta, _this.timestamp, DIM_X, DIM_Y);
      });
    }

    if (this.hasPredatorEntered()) {
      this.predator.move(timeDelta, DIM_X, DIM_Y);
    }
  };

  Game.isOutOfBotBounds = function (yCoord, radius) {
    return yCoord > DIM_X;
  };

  Game.isOutOfTopBounds = function (yCoord, radius) {
    return yCoord < 0;
  };

  Game.isOutOfRightBounds = function (xCoord, radius) {
    return xCoord > DIM_Y;
  };

  Game.isOutOfLeftBounds = function (xCoord, radius) {
    return xCoord < 0;
  };

  Game.prototype.schoolPrey = function () {
    var _this = this;
    var player = this.player;
    var predator = this.predator;
    var eatenPrey = [];

    for (var f1 = 0; f1 < this.prey.length; f1++) {
      var prey = this.prey[f1];
      if (prey.isEaten(player, player.radius)) {
        eatenPrey.push(f1);
      }

      if (prey.isNearPlayer(player)) {
        prey.moveAwayFromPredator(player);
      }

      if (prey.isNearPlayer(predator)) {
        prey.moveAwayFromPredator(predator);
      }

      for (var f2 = f1 + 1; f2 < this.prey.length; f2++) {
        var otherPrey = this.prey[f2];

        if (prey.isNearOtherPrey(otherPrey)) {
          prey.moveWithMostRecentlyChangedPrey(otherPrey);
        }
      }

      var survivingPrey = [];
      this.prey.forEach(function (prey, i) {
        if (!eatenPrey.includes(i)) {
          survivingPrey.push(prey);
        }
      });

      this.score = NUM_PREY - this.prey.length;
      this.scoreboard.innerHTML = this.score;
      this.prey = survivingPrey.slice(0);
    }

    Game.prototype.huntPrey = function () {
      var predator = this.predator;
      var player = this.player;

      if (predator.isNearPlayer(player)) {
        predator.chasePrey(player);
      }

      if (predator.isTouchingPlayer(player)) {
        player.isEaten = true;
      }
    };

  };
};
