'use strict';

angular.module('Vectors')
.directive('vectorGroup', function() {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template: '<g ng-transclude></g>',
    transclude: true
  };
});