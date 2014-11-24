'use strict';

  var AbstractOverlay = jsPlumb.Overlays.AbstractOverlay = function(params) {
    this.visible = true;
    this.isAppendedAtTopLevel = true;
    this.component = params.component;
    this.loc = params.location == null ? 0.5 : params.location;
    this.endpointLoc = params.endpointLocation == null ? [0.5, 0.5] : params.endpointLocation;
  };
  AbstractOverlay.prototype = {
    cleanup: function() {
      this.component = null;
      this.canvas = null;
      this.endpointLoc = null;
    },
    setVisible: function(val) {
      this.visible = val;
      this.component.repaint();
    },
    isVisible: function() {
      return this.visible;
    },
    hide: function() {
      this.setVisible(false);
    },
    show: function() {
      this.setVisible(true);
    },
    incrementLocation: function(amount) {
      this.loc += amount;
      this.component.repaint();
    },
    setLocation: function(l) {
      this.loc = l;
      this.component.repaint();
    },
    getLocation: function() {
      return this.loc;
    }
  };

  /*
   * Class: Overlays.Arrow
   *
   * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
   * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
   * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
   * across the tail.
   */
  /*
   * Function: Constructor
   *
   * Parameters:
   *
   *  length - distance in pixels from head to tail baseline. default 20.
   *  width - width in pixels of the tail baseline. default 20.
   *  fillStyle - style to use when filling the arrow.  defaults to "black".
   *  strokeStyle - style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
   *  lineWidth - line width to use when stroking the arrow. defaults to 1, but only used if strokeStyle is not null.
   *  foldback - distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
   *  location - distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
   *  direction - indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
   */
  jsPlumb.Overlays.Arrow = function(params) {
    this.type = "Arrow";
    AbstractOverlay.apply(this, arguments);
    this.isAppendedAtTopLevel = false;
    params = params || {};
    var _ju = jsPlumbUtil,
      _jg = Biltong;

    this.length = params.length || 20;
    this.width = params.width || 20;
    this.id = params.id;
    var direction = (params.direction || 1) < 0 ? -1 : 1,
      paintStyle = params.paintStyle || {
        lineWidth: 1
      },
      // how far along the arrow the lines folding back in come to. default is 62.3%.
      foldback = params.foldback || 0.623;

    this.computeMaxSize = function() {
      return self.width * 1.5;
    };
    this.draw = function(component, currentConnectionPaintStyle) {

      var hxy, mid, txy, tail, cxy;
      if (component.pointAlongPathFrom) {

        if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {
          var l = parseInt(this.loc, 10),
            fromLoc = this.loc < 0 ? 1 : 0;
          hxy = component.pointAlongPathFrom(fromLoc, l, false);
          mid = component.pointAlongPathFrom(fromLoc, l - (direction * this.length / 2), false);
          txy = _jg.pointOnLine(hxy, mid, this.length);
        } else if (this.loc == 1) {
          hxy = component.pointOnPath(this.loc);
          mid = component.pointAlongPathFrom(this.loc, -(this.length));
          txy = _jg.pointOnLine(hxy, mid, this.length);

          if (direction == -1) {
            var _ = txy;
            txy = hxy;
            hxy = _;
          }
        } else if (this.loc === 0) {
          txy = component.pointOnPath(this.loc);
          mid = component.pointAlongPathFrom(this.loc, this.length);
          hxy = _jg.pointOnLine(txy, mid, this.length);
          if (direction == -1) {
            var __ = txy;
            txy = hxy;
            hxy = __;
          }
        } else {
          hxy = component.pointAlongPathFrom(this.loc, direction * this.length / 2);
          mid = component.pointOnPath(this.loc);
          txy = _jg.pointOnLine(hxy, mid, this.length);
        }

        tail = _jg.perpendicularLineTo(hxy, txy, this.width);
        cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);

        var d = {
            hxy: hxy,
            tail: tail,
            cxy: cxy
          },
          strokeStyle = paintStyle.strokeStyle || currentConnectionPaintStyle.strokeStyle,
          fillStyle = paintStyle.fillStyle || currentConnectionPaintStyle.strokeStyle,
          lineWidth = paintStyle.lineWidth || currentConnectionPaintStyle.lineWidth;

        return {
          component: component,
          d: d,
          lineWidth: lineWidth,
          strokeStyle: strokeStyle,
          fillStyle: fillStyle,
          minX: Math.min(hxy.x, tail[0].x, tail[1].x),
          maxX: Math.max(hxy.x, tail[0].x, tail[1].x),
          minY: Math.min(hxy.y, tail[0].y, tail[1].y),
          maxY: Math.max(hxy.y, tail[0].y, tail[1].y)
        };
      } else return {
        component: component,
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0
      };
    };
  };
  jsPlumbUtil.extend(jsPlumb.Overlays.Arrow, AbstractOverlay);

  /*
   * Class: Overlays.PlainArrow
   *
   * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
   * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
   * a 'call' to Arrow with foldback set appropriately.
   */
  /*
   * Function: Constructor
   * See <Overlays.Arrow> for allowed parameters for this overlay.
   */
  jsPlumb.Overlays.PlainArrow = function(params) {
    params = params || {};
    var p = jsPlumb.extend(params, {
      foldback: 1
    });
    jsPlumb.Overlays.Arrow.call(this, p);
    this.type = "PlainArrow";
  };
  jsPlumbUtil.extend(jsPlumb.Overlays.PlainArrow, jsPlumb.Overlays.Arrow);