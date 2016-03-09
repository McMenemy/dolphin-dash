(function () {
  if (typeof window.DolphinDash === 'undefined') {
    window.DolphinDash = {};
  }

  var Util = DolphinDash.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate() { this.constructor = ChildClass; };

    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

})();
