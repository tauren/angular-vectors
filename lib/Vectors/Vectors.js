'use strict';

// Snapsvg library:
// http://snapsvg.io/start/
//
// AngularJS Flowcharting tool implementation:
// http://www.codeproject.com/Articles/709340/Implementing-a-Flowchart-with-SVG-and-AngularJS
// https://dl.dropboxusercontent.com/u/16408368/WebUI_FlowChart/index.html
// https://github.com/codecapers/AngularJS-FlowChart
//
// AngularJS SVG Icon Directive
// http://codepen.io/clintonhalpin/pen/xBDqs
//
// Splitting bezier curves:
// http://www.iscriptdesign.com/?sketch=tutorial/splitbezier
//
// Interactive bezier curve demo:
// http://www.petercollingridge.co.uk/svg-tutorial
//
// Demo of SVG Markers with arrowheads:
// http://wphooper.com/svg/examples/markers.php
// http://stackoverflow.com/questions/11808860/arrow-triangles-on-my-svg-line
// http://jsfiddle.net/Z5Qkf/3/
// http://phrogz.net/svg/mid-polygon-markers.html
//
// Demo converting SVG Path to Polygon
// http://phrogz.net/svg/convert_path_to_polygon.xhtml
//
// Angular Charts:
// http://crudbetter.com/angularjs-svg-directives/
// http://crudbetter.github.io/angular-charts/
// https://github.com/crudbetter/angular-charts
//
// Mozilla SVG Tutorial:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
//
// gridSVG package for R:
// https://sjp.co.nz/projects/gridsvg/
//

angular.module('Vectors', [])

.constant('vectorsConfig', {
})

.controller('VectorsController', [
  '$scope',
  '$attrs',
  'vectorsConfig',
  function($scope, $attrs, vectorsConfig) {
  }
])

;