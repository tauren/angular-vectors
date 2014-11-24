'use strict';
angular.module('Vectors')
.directive('vectorMarker', function(paths) {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<marker '+
        'case-sensitive="refX" '+
        'id="{{model.name}}" '+
        'orient="auto" '+
        'markerWidth="2.5" '+
        'markerHeight="2.5" '+
        'viewBox="0 0 10 10" '+
        'ng-attr-refX="{{model.reverse ? 9 : 1}}" '+
        'refY="5" '+
      '>'+
        '<path '+
          'ng-attr-d="{{d}}" '+
          'ng-attr-fill="{{model.fill}}" '+
          // 'ng-attr-transform="{{model.reverse ? \'rotate(180 1.5 1.5)\' : null}}" '+
          // 'ng-attr-transform="{{model.reverse ? \'rotate(180 1 2)\' : null}}" '+
          'ng-attr-transform="{{model.reverse ? \'scale(-1,1) translate(-10,0)\' : null}}" '+
          // 'ng-attr-transform="{{model.reverse ? \'translate(5,5) scale(-1,1) translate(-5,-5)\' : null}}" '+
          'ng-attr-opacity="{{model.opacity}}" '+
        '/>'+
      '</marker>',
    scope: {
      model: '='
    },
    link: function(scope, element, attrs, parentCtrl) {
      // scope.d = Paths[scope.model.type];

      // TOOD: two way binding isn't working

      attrs.$observe('model', function(model) {
        console.log('model changed');
        scope.d = paths[scope.model.type];
      });

      // if (scope.model.reverse) {
      //   scope.transform = 'rotate(180 1 2)';
      //   element.attr('refX', 0);
      //   element.attr('refY', 2);
      // }
      // else {
      //   element.attr('refX', 2);
      //   element.attr('refY', 2);
      // }
    }
  };
});