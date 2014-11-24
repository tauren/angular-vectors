'use strict';

angular.module('Vectors')
.directive('vectors', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'VectorsController',
    template:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ng-transclude></svg>',
    transclude: true
  };
});