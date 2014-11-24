'use strict';

angular.module('Vectors')
.factory('models', function(calculations) {

  var Point = function(coord) {
    this.x = coord.x || 0;
    this.y = coord.y || 0;
  };
  Point.prototype.toCoord = function() {
    return this.x + ',' + this.y;
  };

  var SmoothCurve = function(model) {
    model = model || {};
    this.horizontal = model.vertical ? false : true;
    this.source = new Point(model.source);
    this.dest = new Point(model.dest);
    this.thickness = model.thickness || 2;
    this.color = model.color || 'grey';
    this.markers = model.markers || {};
    // http://www.w3.org/TR/2013/WD-SVG2-20130409/painting.html#LineCaps
    this.cap = model.cap;  // 'butt', 'round', 'square'
  };
  SmoothCurve.prototype.sourceTangent = function() {
    return new Point({
      x: calculations.getSourceTangentX(this.source, this.dest, this.horizontal),
      y: calculations.getSourceTangentY(this.source, this.dest, this.horizontal)
    });
  };
  SmoothCurve.prototype.destTangent = function() {
    return new Point({
      x: calculations.getDestTangentX(this.source, this.dest, this.horizontal),
      y: calculations.getDestTangentY(this.source, this.dest, this.horizontal)
    });
  };

  var Marker = function(model) {
    model = model || {};
    this.name = model.name;
    // this.reverse = /true|t|yes|y|1/i.test(model.reverse);
    this.reverse = model.reverse || false;
    this.type = model.type || 'triangle';
    this.fill = model.fill || 'grey';
    this.opacity = model.opacity;
  };

  return {
    newSmoothCurve: function(model) {
      return new SmoothCurve(model);
    },
    newMarker: function(model) {
      return new Marker(model);
    }
  };

});



