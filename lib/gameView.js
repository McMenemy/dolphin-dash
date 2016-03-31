'use strict';

(function () {

  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var GameView = MicroMunch.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function () {
    this.lastTime = new Date;
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function () {
    var currentTime = new Date;
    var timeDelta = currentTime - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = currentTime;

    if (this.game.shouldGameContinue) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      console.log('game over');
      requestAnimationFrame(this.finalAnimate.bind(this));
    }
  };

  GameView.prototype.finalAnimate = function () {
    this.game.finalDraw(this.ctx);
  };

})();
