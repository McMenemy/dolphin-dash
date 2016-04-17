module.exports = function () {

  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var GameView = MicroMunch.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.images = this.loadImages(['img/player.png', 'img/prey.png', 'img/predator.png']);
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
    this.game.draw(this.ctx, this.images);
    this.lastTime = currentTime;

    if (this.game.shouldGameContinue) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      console.log('game over');
      requestAnimationFrame(this.finalAnimate.bind(this));
    }
  };

  GameView.prototype.finalAnimate = function () {
    this.game.finalDraw(this.ctx, this.images);
  };

  GameView.prototype.loadImages = function (imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i = 0; i < imagefiles.length; i++) {
      var image = new Image();

      image.onload = function () {
        loadcount++;
        if (loadcount == loadtotal) {
          preloaded = true;
        }
      };

      image.src = imagefiles[i];

      loadedimages[i] = image;
    }

    return loadedimages;
  };

};
