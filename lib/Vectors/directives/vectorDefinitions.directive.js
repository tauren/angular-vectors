'use strict';

angular.module('Vectors')
.directive('vectorDefinitions', function() {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template: '<defs ng-transclude></defs>',
    transclude: true
  };
});