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

  Util.calcAwayNormalVector = function (fishVec, fishPos, dolphVec, dolphPos) {
    var dolphVectMag = Math.sqrt(Math.pow(dolphVec[0], 2) + Math.pow(dolphVec[1], 2));
    var unitNormalVectorOne = [dolphVec[1] / dolphVectMag, -1 * (dolphVec[0] / dolphVectMag)];
    var unitNormalVectorTwo = [-1 * (dolphVec[1] / dolphVectMag), dolphVec[0] / dolphVectMag];

    var fishPosOne = [fishPos[0] + unitNormalVectorOne[0], fishPos[1] + unitNormalVectorOne[1]];
    var fishPosTwo = [fishPos[0] + unitNormalVectorTwo[0], fishPos[1] + unitNormalVectorTwo[1]];

    var distOne = Util.distance(fishPosOne, dolphPos);
    var distTwo = Util.distance(fishPosTwo, dolphPos);

    var unitNormalVector;
    if (distOne > distTwo) {
      unitNormalVector = unitNormalVectorOne;
    } else {
      unitNormalVector = unitNormalVectorTwo;
    }

    var fishVecMag = Math.sqrt(Math.pow(fishVec[0], 2) + Math.pow(fishVec[1], 2));

    return [unitNormalVector[0] * fishVecMag, unitNormalVector[1] * fishVecMag];
  };

})();
