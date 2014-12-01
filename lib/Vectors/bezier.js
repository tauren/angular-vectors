'use strict';

angular.module('bezier', [])

  .constant('bezierConfig', {
    radius: 10
  })

  .controller('BezierController', [
    // '$scope',
    // '$attrs',
    // 'bezierConfig',
    // function($scope, $attrs, bezierConfig) {
    function() {
      var curves;
      this.curves = curves = [];

      var arrows;
      this.arrows = arrows = [];

      this.addCurve = function(curveScope) {
        console.log('adding curve');
        curves.push(curveScope);
      };

      this.removeCurve = function(curveScope) {
        curves.splice(curves.indexOf(curveScope), 1);
      };

      this.addArrow = function(arrowScope) {
        console.log('adding arrow');
        arrows.push(arrowScope);
      };

      // this.setArcs = function() {
      //   var prevStartAngle = 0;
      //   var totalValue = 0;

      //   $scope.radius = angular.isDefined($attrs.radius) ? $scope.$eval($attrs.radius) : piechartConfig.radius;

      //   angular.forEach(slices, function(slice) {
      //     totalValue += slice.value;
      //   });

      //   angular.forEach(slices, function(slice) {
      //     slice.arc = getArc(
      //       prevStartAngle,
      //       prevStartAngle = (prevStartAngle + (360 / (totalValue / slice.value))) % 360
      //     );
      //     slice.arc.large = slice.value > (totalValue / 2);
      //   });
      // };
    }
  ])

  .directive('bezier', function() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'BezierController',
      template:
        // '<svg>'+
        //   '<path'+
        //   ' d="'+
        //     'M0,0 '+ // starting point
        //     'C100,0 '+ // first handle
        //     '100,100 '+ // second handle
        //     '200,100'+ // end point
        //   '" transform="translate(10,10)"'+
        //   ' fill="transparent"'+
        //   ' stroke="black"/>'+
        // '</svg>',


        '<svg ng-attr-height="{{radius * 2 + 10}}" ng-attr-width="{{radius * 2 + 10}}">' +
          '<g '+
           // ng-attr-transform="translate({{radius}}, {{radius}}), scale({{radius}})"' +
           //  ' ng-attr-stroke-width="{{1 / radius}}"' +
            ' ng-transclude>' +
          '</g>' +
        '</svg>',
      transclude: true,
      scope: {
        radius: '@'
      }
    };
  })


// Circle anchor/connector
// <svg style="position:absolute;left:0px;top:0px" width="18" height="18" pointer-events="all" position="absolute" version="1.1" xmlns="http://www.w3.org/1999/xhtml"><circle cx="9" cy="9" r="9" version="1.1" xmlns="http://www.w3.org/1999/xhtml" fill="gray" stroke="none" style=""></circle></svg>

  .directive('bezierCurve', function() {
    return {
      restrict: 'EA',
      require: '^bezier',
      replace: true,
      templateNamespace: 'svg',
      template:
        '<path '+
          'ng-attr-d="'+
            'M{{startX}},{{startY}} '+ // starting point
            'C{{endX/2}},{{startY}} '+ // first handle
            '{{endX/2}},{{endY}} '+ // second handle
            '{{endX-1}},{{endY}}'+ // end point
            // 'M0,0 '+ // starting point
            // 'C100,0 '+ // first handle
            // '100,100 '+ // second handle
            // '200,100'+ // end point
          '" '+
          'transform="translate(10,10)" '+
          'fill="transparent" '+
          'stroke-width="2" '+
          'stroke="grey"/>',

        // '<path ng-attr-d="M0,0L{{arc.start.x}},{{arc.start.y}}A1,1,1,{{arc.large ? 1 : 0}},1,{{arc.end.x}},{{arc.end.y}}Z" />',
      scope: {
        startX: '@',
        startY: '@',
        endX: '@',
        endY: '@'
      },
      // link: function(scope, element, attrs, parentCtrl) {
      link: function(scope) {
        scope.startX = parseInt(scope.startX, 10);
        scope.startY = parseInt(scope.startY, 10);
        scope.endX = parseInt(scope.endX, 10);
        scope.endY = parseInt(scope.endY, 10);
        // parentCtrl.addCurve(scope);

        // attrs.$observe('value', function(value) {
        //   scope.value = parseInt(value, 10);
        //   parentCtrl.setArcs();
        // });
      }
    };
  })

  .directive('bezierArrow', function() {
    return {
      restrict: 'EA',
      require: '^bezier',
      replace: true,
      templateNamespace: 'svg',
      template:
        '<path ng-attr-d="{{getSvg(x,y,direction)}}" ng-attr-fill="{{color}}" ng-attr-transform="translate(10,10), rotate({{direction}} {{x}} {{y}})"></path>',
        // '<path ng-attr-d="M{{x}},{{y}} L{{x-10}},{{y-6}} L{{x-8}},{{y}} L{{x-10}},{{y+6}} L{{x}},{{y}}" fill="grey" transform="translate(10,10)"></path>',
      scope: {
        x: '@',
        y: '@',
        direction: '@',
        color: '@'
      },
      // link: function(scope, element, attrs, parentCtrl) {
      link: function(scope, element, attrs) {
        scope.x = parseInt(scope.x, 10);
        scope.y = parseInt(scope.y, 10);
        scope.direction = parseInt(scope.direction, 10) || 0;
        scope.color = scope.color || 'grey';

        // scope.getSvg = function(x, y, direction) {
        scope.getSvg = function(x, y) {
          var out =
            svgMove(x,y) +
            svgLine(x-10, y-6) +
            svgLine(x-8, y) +
            svgLine(x-10, y+6) +
            svgLine(x,y);

          return out;
        };

        // parentCtrl.addArrow(scope);

        attrs.$observe('x', function(x) {
          scope.x = parseInt(x, 10);
          // parentCtrl.setArcs();
        });
        attrs.$observe('y', function(y) {
          scope.y = parseInt(y, 10);
          // parentCtrl.setArcs();
        });
        attrs.$observe('direction', function(direction) {
          scope.direction = parseInt(direction, 10);
          // parentCtrl.setArcs();
        });
        attrs.$observe('color', function(color) {
          scope.color = color || 'grey';
          // parentCtrl.setArcs();
        });
      }
    };
  });

var svgMove = function(x, y) {
  return 'M'+x+','+y+' ';
};

var svgLine = function(x, y) {
  return 'L'+x+','+y+' ';
};
