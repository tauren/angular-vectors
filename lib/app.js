'use strict';

angular.module('App', ['Vectors','Connectors']);

angular.module('App').controller('AppController', function ($scope, models) {

  $scope.markers = window.markers = [];
  $scope.curves = window.curves = [];
  $scope.connectors = window.connectors = [];

  $scope.connectors.push({
    type: 'SmoothCurve',
    source: {x:10, y:10},
    dest: {x:400, y:100},
    color: 'purple',
    thickness: 4,
    markers: {
      start: 'circle-reverse',
      end: 'circle'
    }
  });

  $scope.icon = {
    fill: 'blue',
    opacity: '0.5',
    type: 'bookmark'
  };

  window.myscope = $scope;

  $scope.txt = 'hello';

  // $scope.$watch('txt', function(newValue, oldValue) {
  //   // $scope.$apply();
  //   //update the DOM with newValue
  // });

  $scope.text = window.text = {
    x: 100,
    y: 100,
    font: 'Veranda',
    size: '25',
    text: 'Hello world'
  };

  $scope.markers.push(models.newMarker({
    name: 'arrowhead',
    fill: 'green',
    // reverse: true,
    type: 'arrowhead',
    opacity: '0.3'
  }));
  $scope.markers.push(models.newMarker({
    name: 'arrowhead-reverse',
    fill: 'blue',
    reverse: true,
    type: 'arrowhead',
    opacity: '0.3'
  }));
  $scope.markers.push(models.newMarker({
    name: 'circle',
    fill: 'blue',
    // reverse: true,
    type: 'circle',
    opacity: '0.3'
  }));
  $scope.markers.push(models.newMarker({
    name: 'circle-reverse',
    fill: 'blue',
    reverse: true,
    type: 'circle',
    opacity: '0.3'
  }));
  $scope.markers.push(models.newMarker({
    name: 'square',
    fill: 'red',
    // reverse: true,
    type: 'square',
    opacity: '0.3'
  }));
  $scope.markers.push(models.newMarker({
    name: 'square-reverse',
    fill: 'red',
    reverse: true,
    type: 'square',
    opacity: '0.3'
  }));

  $scope.curves.push(models.newSmoothCurve({
    source: {x:10, y:10},
    dest: {x:400, y:100},
    color: 'purple',
    thickness: 4,
    markers: {
      start: 'circle-reverse',
      end: 'circle'
    }
  }));
  $scope.curves.push(models.newSmoothCurve({
    source: {x:490, y:10},
    dest: {x:10, y:290},
    color: 'orange',
    thickness: 4,
    markers: {
      start: 'square-reverse',
      end: 'square'
    }
  }));
  $scope.curves.push(models.newSmoothCurve({
    vertical: true,
    source: {x:20, y:50},
    dest: {x:80, y:150},
    thickness: 4,
    markers: {
      start: 'arrowhead-reverse',
      end: 'arrowhead'
    }
  }));
});
