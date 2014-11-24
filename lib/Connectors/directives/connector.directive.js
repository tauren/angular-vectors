'use strict';

angular.module('Connectors')
.directive('connector', function() {
  return {
    restrict: 'E',
    // replace: true,
    require: '^connectors',
    template:'<vectors><vector-bezier model="model" foo="{{model.type}}"></vector-bezier></vectors>',
    scope: {
      model: '='
    }
  };
});