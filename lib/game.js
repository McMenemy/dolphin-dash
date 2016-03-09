(function () {

  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var BG_COLOR = '#00ccff';
  var DIM_X = 600;
  var DIM_Y = 600;
  var FISH_ROWS = 5;
  var FISH_COLS = 4;

  var Game = window.DolphinDash.Game = function () {
    this.fish = [];
    this.timestamp = 0;

    this.addFish();
  };

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
  };

  Game.prototype.step = function (delta) {
    this.timestamp += 1;
    this.moveObjects(delta);
    this.schoolFish();
  };

  Game.prototype.moveObjects = function (timeDelta) {
    this.fish.forEach(function (fish) {
      fish.move(timeDelta, this.timestamp);
    });
  };

  Game.isOutOfXBounds = function (xCoord, radius) {
    return xCoord + radius > DIM_X || xCoord - radius < 0;
  };

  Game.isOutOfYBounds = function (yCoord, radius) {
    return yCoord + radius > DIM_Y || yCoord - radius < 0;
  };

  Game.prototype.schoolFish = function () {
    var _this = this;

    for (var f1 = 0; f1 < this.fish.length; f1++) {
      var fish = this.fish[f1];
      for (var f2 = f1 + 1; f2 < this.fish.length; f2++) {
        var otherFish = this.fish[f2];
        if (fish.isNearOtherFish(otherFish)) {
          fish.moveWithMostRecentlyChangedFish(otherFish, this.timestamp);
        }
      }
    }
  };

})();
