# ngBezier

AngularJS bezier curve directives.

This library provides AngularJS directives that can draw bezier curves. It is not dependent upon any 3rd party libraries, only using native SVG and SMIL browser capabilities.

# Objectives

1. Draw a bezier curve from one point to another
2. Adjust attributes of the curve
3. Provide simple config for drawing attractive curves between points
4. Connect two DOM elements with a bezier curve
5. API to find a point on a DOM element (NW,N,NE,W,Center,E,SW,S,SE)


# ngVectors

AngularJS directives to simplify displaying and manipulating scalable vector graphics (SVG).

This library provides AngularJS directives that can draw vector graphics such as bezier curves and other SVG shapes. It is not dependent upon any 3rd party libraries, only using native SVG and SMIL browser capabilities.


```
<vectors>
  <vector-definitions>
    <vector-marker-arrow name="forward" type="triangle" direction="1">
    </vector-marker-arrow>
    <vector-marker-arrow name="reverse" type="triangle" direction="-1">
    </vector-marker-arrow>
  </vector-definitions>
  <vector-group>
    <vector-bezier start="0,0" end="100,100" marker-start="forward" marker-end="reverse">
    </vector-bezier>
  </vector-group>
</vectors>