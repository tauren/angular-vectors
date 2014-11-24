'use strict';

angular.module('Connectors')
.directive('connectors', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'ConnectorsController',
    template:'<div ng-transclude></div>',
    transclude: true
  };
});