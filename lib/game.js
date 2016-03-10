(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var BG_COLOR = '#00ccff';
  var DIM_X = 600;
  var DIM_Y = 600;
  var FISH_ROWS = 5;
  var FISH_COLS = 4;
  var DOLPHIN_START_POS = [280, 280];

  var Game = DolphinDash.Game = function () {
    this.fish = [];
    this.dolphin = new DolphinDash.Dolphin({ pos: DOLPHIN_START_POS });
    this.timestamp = 0;

    this.addFish();
  };

  Game.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
  };

  window.addEventListener('keydown', function (event) {
    var Game = this.DolphinDash.Game;
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        Game.userMoves.d = true;
        console.log('d pressed');
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
        console.log('d unpressed');
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

  Game.prototype.takeDolphinMoveInput = function () {
    var _this = this;
    Object.keys(Game.userMoves).forEach(function (k) {
      if (Game.userMoves[k]) {
        _this.dolphin.accelerate(Game.MOVES[k]);
      }
    });
  },

  Game.randomPos = function () {
    var xCoord = Math.round(Math.random() * DIM_X);
    var yCoord = Math.round(Math.random() * DIM_Y);

    return [xCoord, yCoord];
  },

  Game.prototype.addFish = function () {
    var xCoord = 0;
    var yCoord = 250;
    for (var r = 0; r <= FISH_ROWS; r++) {
      xCoord += 25;
      yCoord = 250;
      for (var c = 0; c < FISH_COLS; c++) {
        yCoord += 25;
        var newFish = new DolphinDash.Fish({ pos: [xCoord, yCoord] });
        this.fish.push(newFish);
      }
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, DIM_X, DIM_Y);

    this.fish.forEach(function (fish) {
      fish.draw(ctx);
    });

    this.dolphin.draw(ctx);
  };

  Game.prototype.step = function (delta) {
    this.timestamp += 1;
    this.takeDolphinMoveInput();
    this.moveObjects(delta);
    this.schoolFish();
  };

  Game.prototype.moveObjects = function (timeDelta) {
    var _this = this;
    this.fish.forEach(function (fish) {
      fish.move(timeDelta, _this.timestamp);
    });

    this.dolphin.move(timeDelta);
  };

  Game.isOutOfBotBounds = function (yCoord, radius) {
    return yCoord + radius > DIM_X;
  };

  Game.isOutOfTopBounds = function (yCoord, radius) {
    return yCoord - radius < 0;
  };

  Game.isOutOfRightBounds = function (xCoord, radius) {
    return xCoord + radius > DIM_Y;
  };

  Game.isOutOfLeftBounds = function (xCoord, radius) {
    return xCoord - radius < 0;
  };

  Game.prototype.schoolFish = function () {
    var _this = this;
    var dolphin = this.dolphin;

    for (var f1 = 0; f1 < this.fish.length; f1++) {
      var fish = this.fish[f1];
      for (var f2 = f1 + 1; f2 < this.fish.length; f2++) {
        var otherFish = this.fish[f2];
        if (fish.isNearDolphin(dolphin)) {
          fish.moveAwayFromDolphin(dolphin);
        }

        if (fish.isNearOtherFish(otherFish)) {
          fish.moveWithMostRecentlyChangedFish(otherFish);
        }
      }
    }
  };

})();
