'use strict';

angular.module('Vectors')
.directive('vectorBezier', function() {
  return {
    restrict: 'E',
    require: '^vectors',
    replace: true,
    templateNamespace: 'svg',
    template:
      '<path '+
        'ng-attr-d="M {{model.source.toCoord()}}'+
                   'C {{model.sourceTangent().toCoord()}}'+
                   '  {{model.destTangent().toCoord()}}'+
                   '  {{model.dest.toCoord()}}" '+
        'fill="transparent" '+
        'ng-attr-stroke-width="{{model.thickness}}" '+
        'ng-attr-stroke="{{model.color}}" '+
        'ng-attr-stroke-linecap="{{model.cap}}" '+
        'ng-attr-marker-start="{{model.markers.start ? \'url(#\'+model.markers.start+\')\' : null}}" '+
        'ng-attr-marker-mid="{{model.markers.mid ? \'url(#\'+model.markers.mid+\')\' : null}}" '+
        'ng-attr-marker-end="{{model.markers.end ? \'url(#\'+model.markers.end+\')\' : null}}" '+
      '></path>',
    scope: {
      thickness: '@',
      color: '@',
      model: '='
    },
    link: function(scope, element, attrs, parentCtrl) {
      // attrs.$observe('color', function(color) {
      //   scope.color = color || 'grey';
      // });
      // attrs.$observe('thickness', function(thickness) {
      //   scope.thickness = thickness || 4;
      // });

      // if (scope.model.markers.start) {
      //   element.attr('marker-start', 'url(#'+scope.model.markers.start+')');
      // }
      // if (scope.model.markers.mid) {
      //   element.attr('marker-mid', 'url(#'+scope.model.markers.mid+')');
      // }
      // if (scope.model.markers.end) {
      //   element.attr('marker-end', 'url(#'+scope.model.markers.end+')');
      // }
    }
  };
});
