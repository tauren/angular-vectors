# ngBezier

AngularJS bezier curve directives.

This library provides AngularJS directives that can draw bezier curves. It is not dependent upon any 3rd party libraries, only using native SVG and SMIL browser capabilities.

# Objectives

1. Draw a bezier curve from one point to another
2. Adjust attributes of the curve
3. Provide simple config for drawing attractive curves between points
4. Connect two DOM elements with a bezier curve
5. API to find a point on a DOM element (NW,N,NE,W,Center,E,SW,S,SE)


# angular-vectors

AngularJS directives to simplify displaying and manipulating scalable vector graphics (SVG).

This library provides AngularJS directives that can draw vector graphics such as bezier curves and other SVG shapes. It is not dependent upon any 3rd party libraries, only using native SVG and SMIL browser capabilities.


```html
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
```

# angular-connectors


## Connectors

Usage:

```html
<connectors width="500" height="500">
</connectors>
```

## Connector

Usage:

```html
<connectors width="500" height="500">
  <connector ng-repeat="connector in connectors" model="connector"></connector>
</connectors>
```

Alternative usage:

```html
<connectors width="500" height="500">
  <connector source-el="#node1" source-loc="East" target-el="#node3" target-loc="West"></connector>
  <connector source-el="#node2" source-anchor="East" target-el="#node4" target-anchor="West"></connector>
</connectors>
```

### Model

Connectors accept a `model` that specifies the source and destination elements and anchor locations.

#### Model Structure

```js
{
  source: {
    el: '#node1',
    anchor: 'East',
    endpoint: null,
    marker: null,
    overlay: null
  },
  target: {
    el: '#node2',
    anchor: 'W',
    endpoint: null,
    marker: 'arrow',
    overlay: null
  }
}
```

Instead of passing a `model` attribute in the tag, values can be passed as individual attributes. If these attributes are specified, then the `model` attribute will be ignored.

- `source-el` - a jquery-lite compatible DOM element selector for the source element
- `source-loc` - an anchor location or set of locations where the connection will attach to the source element
- `target-el` - a jquery-lite compatible DOM element selector for the destination element
- `target-loc` - an anchor location or set of locations where the connection will attach to the destination element

### Anchors

Anchors are locations that connectors will be attached to DOM elements. The location can be specified anywhere on an object. Anchors can be specified by an array of values, an object, or a string alias.

```js
{
  x: 0,
  y: 0.5,
  dx: -1,
  dy: 0,
  ox: 0,
  oy: 0
}
```

Alternatively, anchors may be specified using an array format: `[x, y, dx, dy, ox, oy]`. The above object can be represented as `[0, 0.5, -1, 0, 0, 0]` or even `[0, 0.5, -1, 0]` since the last two values can be omitted and will default to `0`.

#### Anchor Properties

- `x, y` - specifies a relative position of anchor on object with values in interval `[0,1]`
- `dx, dy` - specifies the orientation of the curve incident to the anchor with values of `0`, `1`, or `-1`
- `ox, oy` - specifies an offset in pixels from the anchor location, default is `0, 0`

TODO: consider how to specify absolute pixel positions as an option to relative (percentage) values. Perhaps if values are strings such as `50%` then it is percentage based, but if they are numeric they are absolute pixel values. Or maybe there is another attribute that specifies a `mode` of `absolute` or `relative`.

#### Anchor Aliases

Anchor aliases are available for nine anchor locations.

- `NW`, `NorthWest`, `TopLeft` - positions anchor on the top left corner of the object
- `N`, `NC`, `North`, `Top` - positions anchor on the top center of the object
- `NE`, `NorthEast`, `TopRight` - positions anchor on the top right corner of the object
- `E`, `EC`, `East`, `Right` - positions anchor on the center right of the object
- `SE`, `SouthEast`, `BottomRight` - positions anchor on the bottom right corner of the object
- `S`, `SC`, `South`, `Bottom` - positions anchor on the bottom center of the object
- `SW`, `SouthWest`, `BottomLeft` - positions anchor on the bottom left corner of the object
- `W`, `WC`, `West`, `Left` - positions anchor on the center left of the object
- `C`, `CC`, `Center`- positions anchor in the center of the object

#### Anchor Sets

Sets of anchor locations can be specified, with the location closest to the other element in the connection automatically being selected. Anchor sets can be specified as a connection's source or destination anchor. This example specifies three evenly spaced possible anchors on the bottom of an element:

```js
[
  'S',
  {
    x: 0.25,
    y: 1,
    dx: 1,
    dy: 0
  },
  [0.75, 1, 1, 0]
]
```


#### Anchor Set Aliases

Three aliases are available for anchor sets.

- `A`, `Auto` - automatically positions anchor at `N`, `E`, `S`, or `W` based on which location is closer to the other element in the connection
- `H`, `Horizontal` - automatically positions anchor at `E` or `W` based on which location is closer to the other element in the connection
- `V`, `Vertical` - automatically positions anchor at `N` or `S` based on which location is closer to the other element in the connection

### Markers

Markers are SVG elements that can be used to render arrowheads or other shapes on paths. However, at this time markers are only rendered, as event listeners attached to SVG markers are not processed. For this reason, markers should be used only when adding non-interactive elements to a path, such as arrowheads. It may be attractive to use them to draw circular nodes at the ends of lines, but you will not be able to attache events to these markers. Instead, endpoints or overlays should be used.

### Endpoints

Endpoints represent SVG objects that are rendered at an anchor's location. They can be used to create connectors on the edges of DOM elements between which a connection is rendered. They can also be used as draggable handles for connections.

The `endpoint` property of a connection's `source` or `target` can contain one of these string values:

- `dot`
- `rectangle`
- `image`
- `none`

Alternatively, the `endpoint` property can be an object to facilate customizing the radius, height
At this time, only the following endpoints are supported. Ideally there will eventually be additional endpoint types where paths can be customized.



#### Dot

```js
{
  type: 'dot',
  radius: 10,
  cssClass: 'connector',
  hoverClass: 'connector-hover'
}
```

#### Rectangle

```js
{
  type: 'rectangle',
  width: 10,
  height: 10,
  cssClass: 'connector',
  hoverClass: 'connector-hover'
}
```

#### Image

```js
{
  type: 'image',
  src: 'cool.png',
  cssClass: 'connector',
  hoverClass: 'connector-hover'
}
```

#### None

Will not render any SVG object at the endpoint of the connection. This is the same as specifying `endpoint: null` or leaving a endpoint undefined. Because no endpoint object exists, there is nothing to attach event listeners to, so the end of the connection will not be draggable. To support endpoint dragging, specify a different type of endpoint.

### Overlays

SVG objects that are rendered on a connection path. Can be used to add labels to connections or interactive controls such as delete buttons.

