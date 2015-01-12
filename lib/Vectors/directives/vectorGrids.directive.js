'use strict';

// TODO: Support various grid styles
// cartisian, engineering, hex, polar, isometric, hexoganol, smith
// http://www.printfreegraphpaper.com/

angular.module('Vectors')
.directive('vectorGrids', function() {
  return {
    restrict: 'AE',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<g>'+
        '<vector-pattern-graph '+
          'name="vector-grid-small" '+
          'size="{{step}}" '+
          'thickness="0.5" '+
        '></vector-pattern-graph>'+
        '<vector-pattern-graph '+
          'name="vector-grid" '+
          'size="{{step * 10}}" '+
          'filler="vector-grid-small" '+
        '></vector-pattern-graph>'+
      '</g>',
    scope: {
      size: '@'
    },
    controller: function($scope) {
      $scope.step = parseInt($scope.size,10) || 10;
    }
  };
})
.directive('vectorPatternGraph', function() {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<pattern '+
        'id="{{name}}" '+
        'ng-attr-width="{{step}}" '+
        'ng-attr-height="{{step}}" '+
        'patternUnits="userSpaceOnUse"'+
      '>'+
        '<rect ng-if="fill!==\'none\'" '+
          'ng-attr-width="{{step * 10}}" '+
          'ng-attr-height="{{step * 10}}" '+
          'ng-attr-fill="{{fill}}"'+
          'ng-attr-stroke-width="{{strokeWidth}}" '+
        '></rect>'+
        '<path '+
          'ng-attr-d="M {{step}} 0 L 0 0 0 {{step}}" '+
          'fill="none" '+
          'ng-attr-stroke="{{stroke}}" '+
          'ng-attr-stroke-width="{{strokeWidth}}"'+
        '></path>'+
      '</pattern>',
    scope: {
      name: '@',
      size: '@',
      thickness: '@',
      color: '@',
      filler: '@'
    },
    controller: function($scope) {
      $scope.step = parseInt($scope.size,10) || 10;
      $scope.fill = $scope.filler ? 'url(#' + $scope.filler + ')' : 'none';
      $scope.stroke = $scope.color || 'gray';
      $scope.strokeWidth = $scope.thickness || 1;
    }
  };
})
;
