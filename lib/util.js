'use strict';

(function () {
  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var Util = MicroMunch.Util = {};

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

  Util.isVectorsParallel = function (predatorVec, preyVec) {
    var predatorMag = Math.sqrt(Math.pow(predatorVec[0], 2) + Math.pow(predatorVec[1], 2));
    var preyMag = Math.sqrt(Math.pow(preyVec[0], 2) + Math.pow(preyVec[1], 2));

    var predatorUnitVec = [Math.abs(predatorVec[1] / predatorMag), Math.abs((predatorVec[0] / predatorMag))];
    var preyUnitVec = [Math.abs(preyVec[1] / preyMag), Math.abs((preyVec[0] / preyMag))];

    return predatorUnitVec[0] === preyUnitVec[0] && predatorUnitVec[1] === preyUnitVec[1];
  };

  Util.calcVectorMag = function (vector) {
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  },

  Util.calcUnitVector = function (vector) {
    var vectorMag = Util.calcVectorMag(vector);

    return [vector[0] / vectorMag, vector[1] / vectorMag];
  },

  Util.calcDirectionVector = function (unitVec, mag) {
    return [unitVec[0] * mag, unitVec[1] * mag];
  };

  Util.calcPredatorTowardVec = function (predatorVec, predatorPos, preyVec, preyPos) {
    var predatorMag = Util.calcVectorMag(predatorVec);

    var connectVec = [preyPos[0] - predatorPos[0], preyPos[1] - predatorPos[1]];
    var connectUnitVect = Util.calcUnitVector(connectVec);

    return Util.calcDirectionVector(connectUnitVect, predatorMag);
  };

  Util.calcNormalVector = function (fishVec, fishPos, dolphVec, dolphPos, direction) {
    var dolphVectMag = Math.sqrt(Math.pow(dolphVec[0], 2) + Math.pow(dolphVec[1], 2));

    var unitNormalVectorOne = [dolphVec[1] / dolphVectMag, -1 * (dolphVec[0] / dolphVectMag)];
    var unitNormalVectorTwo = [-1 * (dolphVec[1] / dolphVectMag), dolphVec[0] / dolphVectMag];

    var fishPosOne = [fishPos[0] + unitNormalVectorOne[0], fishPos[1] + unitNormalVectorOne[1]];
    var fishPosTwo = [fishPos[0] + unitNormalVectorTwo[0], fishPos[1] + unitNormalVectorTwo[1]];

    var distOne = Util.distance(fishPosOne, dolphPos);
    var distTwo = Util.distance(fishPosTwo, dolphPos);

    var unitNormalVector = [NaN, NaN];
    if (distOne >= distTwo && direction === 'away') {
      unitNormalVector = unitNormalVectorOne;
    } else if (distTwo >= distOne && direction === 'away') {
      unitNormalVector = unitNormalVectorTwo;
    } else if (distOne <= distTwo && direction === 'toward') {
      unitNormalVector = unitNormalVectorOne;
    } else if (distTwo <= distOne && direction === 'toward') {
      unitNormalVector = unitNormalVectorTwo;
    }

    var fishVecMag = Math.sqrt(Math.pow(fishVec[0], 2) + Math.pow(fishVec[1], 2));

    var correctVector = [unitNormalVector[0] * fishVecMag, unitNormalVector[1] * fishVecMag];

    // correction for when user is not moving
    if (isNaN(unitNormalVector[0]) || isNaN(unitNormalVector[1])) {
      return fishVec;
    } else {
      return correctVector;
    }
  };

})();
