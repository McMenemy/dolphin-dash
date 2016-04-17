module.exports = function () {
  if (typeof window.MicroMunch === 'undefined') {
    window.MicroMunch = {};
  }

  var SMOOTH_ROTATION = 0.174533 * 5;
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

  Util.calcNormalVector = function (preyVec, preyPos, dolphVec, dolphPos, direction) {
    var dolphVectMag = Math.sqrt(Math.pow(dolphVec[0], 2) + Math.pow(dolphVec[1], 2));

    var unitNormalVectorOne = [dolphVec[1] / dolphVectMag, -1 * (dolphVec[0] / dolphVectMag)];
    var unitNormalVectorTwo = [-1 * (dolphVec[1] / dolphVectMag), dolphVec[0] / dolphVectMag];

    var preyPosOne = [preyPos[0] + unitNormalVectorOne[0], preyPos[1] + unitNormalVectorOne[1]];
    var preyPosTwo = [preyPos[0] + unitNormalVectorTwo[0], preyPos[1] + unitNormalVectorTwo[1]];

    var distOne = Util.distance(preyPosOne, dolphPos);
    var distTwo = Util.distance(preyPosTwo, dolphPos);

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

    var preyVecMag = Math.sqrt(Math.pow(preyVec[0], 2) + Math.pow(preyVec[1], 2));

    var correctVector = [unitNormalVector[0] * preyVecMag, unitNormalVector[1] * preyVecMag];

    // correction for when user is not moving
    if (isNaN(unitNormalVector[0]) || isNaN(unitNormalVector[1])) {
      return preyVec;
    } else {
      return correctVector;
    }
  };

  Util.dotProduct = function (vector1, vector2) {
    var dotProd = 0;
    for (var i = 0; i < vector1.length; i++) {
      dotProd += vector1[i] * vector2[i];
    }

    return dotProd;
  };

  // doesnt work
  // Util.smoothRotation = function (prevAngle, newAngle) {
  //   if (Math.abs(newAngle - prevAngle) <= SMOOTH_ROTATION) {
  //     return newAngle;
  //     // return newAngle += SMOOTH_ROTATION;
  //   } else if ((newAngle - prevAngle) > SMOOTH_ROTATION) {
  //     return prevAngle += SMOOTH_ROTATION;
  //   } else {
  //     return prevAngle -= SMOOTH_ROTATION;
  //   }
  // };

  Util.getRotationAngle = function (vector) {
    var baseVector = [-1, 0];
    var cosA = Math.abs(Util.dotProduct(baseVector, vector))
      / (Util.calcVectorMag(baseVector) * Util.calcVectorMag(vector));
    var angle = Math.acos(cosA);

    // only left
    if (vector[0] < 0 && vector[1] === 0) {
      return 0;

    // only right
    } else if (vector[0] > 0 && vector[1] === 0) {
      return Math.PI;

    // only up
    } else if (vector[0] == 0 && vector[1] < 0) {
      return Math.PI / 2;

    // only down
    } else if (vector[0] == 0 && vector[1] > 0) {
      return 3 * Math.PI / 2;

    // right and up
    } else if (vector[0] > 0 && vector[1] < 0) {
      return angle + Math.PI / 2;

    // right and down
    } else if (vector[0] > 0 && vector[1] > 0) {
      return angle + Math.PI;

    // left and down
    } else if (vector[0] < 0 && vector[1] > 0) {
      return -angle;

    // left and up
    } else if (vector[0] < 0 && vector[1] < 0) {
      return angle;
    }
  };
};
