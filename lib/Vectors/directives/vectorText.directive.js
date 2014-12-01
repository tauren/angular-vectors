'use strict';

angular.module('Vectors')
.directive('vectorText', function() {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<text ng-attr-x="{{model.x}}" ng-attr-y="{{model.y}}"'+
      '  ng-attr-font-family="{{model.font}}"'+
      '  ng-attr-font-size="{{model.size}}">'+
      '   {{text}}'+
      '</text>',
    scope: {
      x: '=setX',
      y: '=setY',
      font: '=setFontFamily',
      size: '=setFontSize',
      text: '=setText',
      model: '='
    }
  };
})
;