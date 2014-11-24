'use strict';

// TODO: is there a more elegant solution to this?
// See https://github.com/angular/angular.js/issues/1925

angular.module('Vectors')
.directive('caseSensitive', function() {
  return {
    link: function(scope, element, attr) {
      scope.attr = attr;
      var caseSensitive = attr.caseSensitive.split(',');
      angular.forEach(caseSensitive, function(a) {
        var lowercase = a.toLowerCase();
        scope.$watch('attr[lowercase]', function() {
          element[0].setAttribute(a, element[0].getAttribute(lowercase));
        });
      });
    }
  };
});