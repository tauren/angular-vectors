'use strict';

angular.module('Vectors')
.factory('calculations', function() {

  return {
    //
    // Helper function.
    //
    getTangentOffset: function (pt1, pt2, horizontal) {
      return horizontal ? (pt2.x - pt1.x) / 2 : (pt2.y - pt1.y);
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getSourceTangentX: function (pt1, pt2, horizontal) {
      return horizontal ? pt1.x + this.getTangentOffset(pt1, pt2, horizontal) : pt1.x;
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getSourceTangentY: function (pt1, pt2, horizontal) {
      return horizontal ? pt1.y : this.getTangentOffset(pt1, pt2, horizontal);
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getSourceTangent: function(pt1, pt2, horizontal) {
      return {
        x: this.getSourceTangentX(pt1, pt2, horizontal),
        y: this.getSourceTangentY(pt1, pt2, horizontal)
      };
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getDestTangentX: function (pt1, pt2, horizontal) {
      return horizontal ? pt2.x - this.getTangentOffset(pt1, pt2, horizontal) : pt2.x;
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getDestTangentY: function (pt1, pt2, horizontal) {
      return horizontal ? pt2.y : pt2.y - this.getTangentOffset(pt1, pt2, horizontal);
    },

    //
    // Compute the tangent for the bezier curve.
    //
    getDestTangent: function(pt1, pt2, horizontal) {
      return {
        x: this.getDestTangentX(pt1, pt2, horizontal),
        y: this.getDestTangentY(pt1, pt2, horizontal),
      };
    }
  };

});



