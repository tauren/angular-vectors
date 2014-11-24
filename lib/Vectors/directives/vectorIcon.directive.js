'use strict';

angular.module('Vectors')
.directive('vectorIcon', function(paths) {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<path '+
        'ng-attr-d="{{d}}" '+
        'ng-attr-fill="{{model.fill}}" '+
        'ng-attr-opacity="{{model.opacity}}" '+
      '/>',
    scope: {
      model: '='
    },
    link: function(scope, element, attrs, parentCtrl) {
      // TOOD: two way binding isn't working
      attrs.$observe('model', function(model) {
        console.log('model changed');
        scope.d = paths[scope.model.type];
      });
    }
  };
})
