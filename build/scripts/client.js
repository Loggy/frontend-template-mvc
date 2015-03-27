(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, React;

React = require('react');

App = require('./app');

React.render(React.createElement(App, null), document.getElementById('app'));



},{"./app":3,"react":"react"}],2:[function(require,module,exports){
var Address, React;

React = require('react');

Address = React.createClass({
  displayName: 'Address',
  render: function() {
    return React.createElement("div", {
      "className": "address"
    }, React.createElement("span", {
      "className": "address__icon"
    }), React.createElement("span", {
      "className": "address__name"
    }), React.createElement("span", {
      "className": "address__distance"
    }));
  }
});

module.exports = Address;



},{"react":"react"}],3:[function(require,module,exports){
var Address, App, MapView, React, Tip;

React = require('react');

Tip = require('./tip');

MapView = require('./map');

Address = require('./address');

App = React.createClass({
  displayName: 'App',
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      text: 'Hello, world'
    };
  },
  getInitialState: function() {
    return {
      value: 'Привет!'
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "app"
    }, React.createElement(Tip, null), React.createElement(MapView, null), React.createElement("p", null, this.state.value), React.createElement("input", {
      "type": "text",
      "onChange": this.handleChange
    }));
  },
  handleChange: function(e) {
    var value;
    value = e.target.value;
    return this.setState({
      value: value
    });
  }
});

module.exports = App;



},{"./address":2,"./map":4,"./tip":5,"react":"react"}],4:[function(require,module,exports){
var Circle, GoogleMapsAPI, Map, MapView, Marker, OverlayView, React, ReactGoogleMaps;

React = require('react');

ReactGoogleMaps = require('react-googlemaps');

GoogleMapsAPI = window.google.maps;

Map = ReactGoogleMaps.Map;

Marker = ReactGoogleMaps.Marker;

OverlayView = ReactGoogleMaps.OverlayView;

Circle = ReactGoogleMaps.Circle;

MapView = React.createClass({
  displayName: 'MapView',
  getInitialState: function() {
    var addressesObj, r;
    r = new XMLHttpRequest();
    r.open("GET", "scripts/postorgs.json", false);
    r.send(null);
    addressesObj = JSON.parse(r.responseText);
    return {
      addressesArr: Object.keys(addressesObj).map(function(key) {
        return addressesObj[key];
      }),
      circleCenter: new GoogleMapsAPI.LatLng(59.95000, 30.31667)
    };
  },
  handleClick: function(e) {
    return this.setState({
      circleCenter: new GoogleMapsAPI.LatLng(e.latLng.k, e.latLng.D)
    });
  },
  render: function() {
    var addresses;
    addresses = this.state.addressesArr.map(function(addr) {
      return React.createElement("p", null, React.createElement("span", null, " ", addr.address, " "), React.createElement("br", null), React.createElement("span", null, " ", addr.lon, " "), React.createElement("br", null), React.createElement("span", null, " ", addr.lat, " "));
    });
    return React.createElement("div", null, React.createElement(Map, {
      "className": "map",
      "onClick": this.handleClick,
      "initialZoom": 11.,
      "initialCenter": new GoogleMapsAPI.LatLng(59.95000, 30.31667)
    }, React.createElement(Marker, {
      "position": this.state.circleCenter
    }), React.createElement(Circle, {
      "strokeColor": "#2980b9",
      "fillColor": "#2980b9",
      "fillOpacity": .35,
      "center": this.state.circleCenter,
      "radius": 5000.
    })), addresses);
  }
});

module.exports = MapView;



},{"react":"react","react-googlemaps":7}],5:[function(require,module,exports){
var React, Tip;

React = require('react');

Tip = React.createClass({
  displayName: 'Tip',
  render: function() {
    return React.createElement("div", {
      "className": "tip-container"
    }, React.createElement("div", {
      "className": "tip-container__tip"
    }, "\t\t\t\t\u041a\u043b\u0438\u043a\u043d\u0438\u0442\u0435 \u043d\u0430 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0449\u0435\u0435 \u0432\u0430\u0441 \u043c\u0435\u0441\u0442\u043e, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 5\u043a\u043c."));
  }
});

module.exports = Tip;



},{"react":"react"}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],7:[function(require,module,exports){
"use strict";

var assign = require('react/lib/Object.assign');
var ReactDefaultInjection = require('./src/ui/ReactDefaultInjection');
var ReactMapComponents = require('./src/ReactMapComponents');
var MapPropTypes = require('./src/ui/MapPropTypes');

ReactDefaultInjection.inject();

module.exports = assign(
  {},
  ReactMapComponents,
  {
    PropTypes: MapPropTypes
  }
);


},{"./src/ReactMapComponents":9,"./src/ui/MapPropTypes":16,"./src/ui/ReactDefaultInjection":17,"react/lib/Object.assign":24}],8:[function(require,module,exports){
"use strict";

var invariant = require('react/lib/invariant');

invariant(
  window.google && window.google.maps,
  '`google.maps` global object not found, make sure ' +
    'Google maps in included before react-googlemaps is defined'
);

module.exports = window.google.maps;

},{"react/lib/invariant":31}],9:[function(require,module,exports){
"use strict";

var assign = require('react/lib/Object.assign');
var mapObject = require('react/lib/mapObject');
var GoogleMapsAPI = require('./GoogleMapsAPI');
var ReactMapComponent = require('./ui/ReactMapComponent');

function createMapComponentClass(constructorFn, constructorName) {
  return ReactMapComponent.create(constructorName, constructorFn);
}

function constructGoogleMapsMapClass() {
  return new GoogleMapsAPI.Map(this.props.mapDiv);
}

/**
 * Creates a mapping from supported GoogleMap classes to `ReactMapComponent` classes.
 *
 * @public
 */
var ReactMapComponents = mapObject({
  Map: constructGoogleMapsMapClass, // NOTE: Injected, see `ReactMap`.
  Marker: null,
  Polyline: null,
  Circle: null,
  Rectangle: null,
  Polygon: null
  // OverlayView: Note: Injected, see `ReactOverlayView`.
  // Frag: Note: Injected, see `ReactFrag`.
}, createMapComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    assign(ReactMapComponents, componentClasses);
  }
};

ReactMapComponents.injection = injection;

module.exports = ReactMapComponents;


},{"./GoogleMapsAPI":8,"./ui/ReactMapComponent":18,"react/lib/Object.assign":24,"react/lib/mapObject":35}],10:[function(require,module,exports){
"use strict";

var eventTypes = {
  onClick: {
    name: 'click'
  },
  onDoubleClick: {
    name: 'dblclick'
  },
  onDrag: {
    name: 'drag'
  },
  onDragEnd: {
    name: 'dragend'
  },
  onDragStart: {
    name: 'dragstart'
  },
  onMouseDown: {
    name: 'mousedown'
  },
  onMouseMove: {
    name: 'mousemove'
  },
  onMouseOut: {
    name: 'mouseout'
  },
  onMouseOver: {
    name: 'mouseover'
  },
  onMouseUp: {
    name: 'mouseup'
  },
  onRightClick: {
    name: 'rightclick'
  }
};

var MouseEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var listener = instance.props[eventName];

    return listener(event, instance.getMapNode());
  }
};

module.exports = MouseEventPlugin;


},{}],11:[function(require,module,exports){
"use strict";

var SimpleEventPlugin = require('./SimpleEventPlugin');

var eventTypes = {
  onCenterChange: {
    name: 'center_changed',
    effects: 'center'
  },
  onZoomChange: {
    name: 'zoom_changed',
    effects: 'zoom'
  },
  onBoundsChange: {
    name: 'bounds_changed',
    effects: 'bounds'
  },
  onHeadingChange: {
    name: 'heading_changed',
    effects: 'heading'
  },
  onMapTypeIdChange: {
    name: 'maptypeid_changed',
    effects: 'mapTypeId'
  },
  onTiltChange: {
    name: 'tilt_changed',
    effects: 'tilt'
  },
  onAnimationChange: {
    name: 'animation_changed',
    effects: 'animation'
  },
  onClickableChange: {
    name: 'clickable_changed',
    effects: 'clickable'
  },
  onCursorChange: {
    name: 'cursor_changed',
    effects: 'cursor'
  },
  onDraggableChange: {
    name: 'draggable_changed',
    effects: 'draggable'
  },
  onIconChange: {
    name: 'icon_changed',
    effects: 'icon'
  },
  onPositionChange: {
    name: 'position_changed',
    effects: 'position'
  },
  onShapeChange: {
    name: 'shape_changed',
    effects: 'shape'
  },
  onTitleChange: {
    name: 'title_changed',
    effects: 'title'
  },
  onVisibleChange: {
    name: 'visible_changed',
    effects: 'visible'
  },
  onZIndexChange: {
    name: 'zindex_changed',
    effects: 'zindex'
  },
  onRadiusChange: {
    name: 'radius_changed',
    effects: 'radius'
  }
};

var SideEffectEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var effects = eventTypes[eventName].effects;

    if (instance.props[effects] == null) {
      // The effected property is not set so this event listener
      // only needs to be passive.
      return SimpleEventPlugin.executeDispatch(event, eventName, instance)
    }

    var listener = instance.props[eventName];
    var returnVal;
    if (listener) {
      instance.queueDirtyCheck();
      returnVal = listener(instance.getMapNode());
    }
    instance.flushDirtyChangesTo(effects);

    return returnVal;
  }
};

module.exports = SideEffectEventPlugin;


},{"./SimpleEventPlugin":12}],12:[function(require,module,exports){
"use strict";

var eventTypes = {
  onIdle: {
    name: 'idle'
  },
  onResize: {
    name: 'resize'
  },
  onTilesLoaded: {
    name: 'tilesloaded'
  },
  onProjectionChange: {
    name: 'projection_changed'
  },
  onFlatChange: {
    name: 'flat_changed'
  }
};

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var listener = instance.props[eventName];

    return listener(instance.getMapNode());
  }
};

module.exports = SimpleEventPlugin;


},{}],13:[function(require,module,exports){
"use strict";

var invariant = require('react/lib/invariant');

var MapEventInjection = {

  /**
   * Inject some specialized knowledge about the GoogleMaps Events. This takes a object
   * of config objects with the following properties:
   *
   * eventTypes: event config, requires a `name` property is set, this is the name of
   * the googlemaps event name. Also can have and `effects` property.
   *
   * executeDispatch: A function for handling the event dispatch logic.
   *
   * @param {object} injectedNamesToPlugins the config as described above.
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }

      var PluginModule = injectedNamesToPlugins[pluginName];
      for (var eventName in PluginModule.eventTypes) {
        if (!PluginModule.eventTypes.hasOwnProperty(eventName)) {
          continue;
        }

        invariant(
          !MapEvent.isStandardName[eventName],
          'injectEventPluginsByName(...): Event `%s` has already been defined, ' +
            'an event can only be handled once',
          eventName
        );

        var EventConfig = PluginModule.eventTypes[eventName];

        MapEvent.isStandardName[eventName] = true;
        MapEvent.getEventName[eventName] = EventConfig.name || eventName;
        MapEvent.getDispatcher[eventName] = PluginModule.executeDispatch;
        if (EventConfig.effects) {
          MapEvent.getOptionSideEffectEvent[EventConfig.effects] = eventName;
        }
      }
    }
  }
};

/**
 * MapEvent exports lookup objects that can be used like functions:
 *
 *   > MapEvent.isValid['id']
 *   true
 *   > MapEvent.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var MapEvent = {

  /**
   * Checks whether an event name is a standard event.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from side effect options to normalized event names.
   * @type {Object}
   */
  getOptionSideEffectEvent: {},

  /**
   * Mapping from normalized event names to GoogleMaps event name.
   * @type {Object}
   */
  getEventName: {},

  /**
   * Mapping over normalized event names to event dispatchers
   * @type {Object}
   */
  getDispatcher: {},

  createEventDispatcher: function(eventName, instance) {
    var executeDispatch = MapEvent.getDispatcher[eventName];
    return function listener(event) {
      if (!MapEvent.isEnabled) {
        return;
      }

      return executeDispatch(event, eventName, instance);
    }
  },

  isEnabled: true,

  setEnabled: function(enabled) {
    MapEvent.isEnabled = enabled;
  },

  injection: MapEventInjection
};

module.exports = MapEvent;


},{"react/lib/invariant":31}],14:[function(require,module,exports){
"use strict";

var invariant = require('react/lib/invariant');

function createInitialOptionName(name) {
  return 'initial' + name.charAt(0).toUpperCase() + name.slice(1)
}

var MapOptionInjection = {

  /**
   * Inject some specialized knowledge about the GoogleMaps. This takes a config object
   * with the following properties:
   *
   * Options: object mapping Map option name to a React.PropType validator. If your option
   * isn't in here, it won't get passed to your Map class.
   *
   * MapOptionNames: object mapping React attribute name to the Map
   * option name.
   *
   * @param {object} mapOptionConfig the config as described above.
   */
  injectMapOptionConfig: function(mapOptionConfig) {
    var Options = mapOptionConfig.Options || {};
    var MapOptionNames = mapOptionConfig.MapOptionNames || {};

    for (var propName in Options) {
      invariant(
        !MapOption.isStandardName.hasOwnProperty(propName),
        'injectMapOptionConfig(...): You\'re trying to inject DOM property ' +
        '\'%s\' which has already been injected. You may be accidentally ' +
        'injecting the same DOM property config twice, or you may be ' +
        'injecting two configs that have conflicting property names.',
        propName
      );

      MapOption.isStandardName[propName] = true;

      MapOption.getOptionName[propName] =
        MapOptionNames.hasOwnProperty(propName) ?
          MapOptionNames[propName] :
          propName;

      MapOption.getInitialOptionName[createInitialOptionName(propName)] =
        MapOption.getOptionName[propName];
    }
  }
};

/**
 * MapOption exports lookup objects that can be used like functions:
 *
 *   > MapOption.isValid['id']
 *   true
 *   > MapOption.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var MapOption = {

  /**
   * Checks whether a option name is a standard option.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from normalized names to option on Map class instances.
   * @type {Object}
   */
  getOptionName: {},

  /**
   * Mapping from normalized initial names to option on Map class instances.
   * @type {Object}
   */
  getInitialOptionName: {},

  injection: MapOptionInjection
};

module.exports = MapOption;


},{"react/lib/invariant":31}],15:[function(require,module,exports){
"use strict";

var React = require('react');
var CustomPropTypes = require('./MapPropTypes');

var MapOptionConfig = {
  Options: {
    backgroundColor: React.PropTypes.string,
    center: CustomPropTypes.LatLng,
    disableDefaultUI: React.PropTypes.bool,
    disableDoubleClickZoom: React.PropTypes.bool,
    draggable: React.PropTypes.bool,
    draggableCursor: React.PropTypes.string,
    draggingCursor: React.PropTypes.string,
    heading: React.PropTypes.number,
    keyboardShortcuts: React.PropTypes.bool,
    mapMaker: React.PropTypes.bool,
    mapTypeControl: React.PropTypes.bool,
    mapTypeControlOptions: React.PropTypes.object,
    mapTypeId: React.PropTypes.string,
    maxZoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    noClear: React.PropTypes.bool,
    overviewMapControl: React.PropTypes.bool,
    overviewMapControlOptions: React.PropTypes.object,
    panControl: React.PropTypes.bool,
    panControlOptions: React.PropTypes.object,
    rotateControl: React.PropTypes.bool,
    rotateControlOptions: React.PropTypes.object,
    scaleControl: React.PropTypes.bool,
    scaleControlOptions: React.PropTypes.object,
    scrollwheel: React.PropTypes.bool,
    streetView: React.PropTypes.object,
    streetViewControl: React.PropTypes.bool,
    streetViewControlOptions: React.PropTypes.object,
    styles: React.PropTypes.array,
    tilt: React.PropTypes.number,
    zoom: React.PropTypes.number,
    zoomControl: React.PropTypes.bool,
    zoomControlOptions: React.PropTypes.object,
    anchorPoint: CustomPropTypes.Point,
    animation: CustomPropTypes.Animation,
    clickable: React.PropTypes.bool,
    crossOnDrag: React.PropTypes.bool,
    cursor: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      CustomPropTypes.Icon,
      CustomPropTypes.Symbol
    ]),
    map: CustomPropTypes.Map,
    opacity: React.PropTypes.number,
    optimized: React.PropTypes.bool,
    position: CustomPropTypes.LatLng,
    shape: CustomPropTypes.MarkerShape,
    title: React.PropTypes.string,
    visible: React.PropTypes.bool,
    zIndex: React.PropTypes.number,
    editable: React.PropTypes.bool,
    geodesic: React.PropTypes.bool,
    icons: React.PropTypes.array,
    path: React.PropTypes.array,
    strokeColor: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    strokeWeight: React.PropTypes.number,
    fillColor: React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    paths: React.PropTypes.array,
    strokePosition: React.PropTypes.any,
    bounds: CustomPropTypes.LatLngBounds,
    radius: React.PropTypes.number
  },

  MapOptionNames: {
    // Format:
    // autoCapitalize: 'autocapitalize'
  }
};

module.exports = MapOptionConfig;


},{"./MapPropTypes":16,"react":"react"}],16:[function(require,module,exports){
"use strict";

var React = require('react');
var GoogleMaps = require('../GoogleMapsAPI');

/**
 * Checks whether a prop provides a `GoogleMaps.LatLng`
 */
exports.LatLng = React.PropTypes.instanceOf(GoogleMaps.LatLng);

/**
 * Checks whether a prop provides a `GoogleMaps.LatLngBounds`
 */
exports.LatLngBounds = React.PropTypes.instanceOf(GoogleMaps.LatLngBounds);

/**
 * Checks whether a prop provides a `GoogleMaps.Map`
 */
exports.Map = React.PropTypes.instanceOf(GoogleMaps.Map);

/**
 * Checks whether a prop provides a `GoogleMaps.Point`
 */
exports.Point = React.PropTypes.instanceOf(GoogleMaps.Point);

/**
 * Checks whether a prop provides a `GoogleMaps.Animation`
 */
exports.Animation = React.PropTypes.oneOf(
  Object.keys(GoogleMaps.Animation)
    .map(function(key) {return GoogleMaps.Animation[key];})
);

/**
 * Checks whether a prop provides a `GoogleMaps.Icon`
 */
exports.Icon = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.Symbol`
 */
exports.Symbol = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MarkerShape`
 */
exports.MarkerShape = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MapPanes`
 */
exports.MapPanes = React.PropTypes.oneOf(['floatPane', 'mapPane', 'markerLayer', 'overlayLayer', 'overlayMouseTarget']);

},{"../GoogleMapsAPI":8,"react":"react"}],17:[function(require,module,exports){
"use strict";

var ReactMapComponents = require('../ReactMapComponents');
var MapOption = require('./MapOption');
var MapEvent = require('./MapEvent');
var MapOptionConfig = require('./MapOptionConfig');
var ReactMap = require('./components/ReactMap');
var ReactOverlayView = require('./components/ReactOverlayView');
var ReactFrag = require('./components/ReactFrag');
var SimpleEventPlugin = require('../eventPlugins/SimpleEventPlugin');
var MouseEventPlugin = require('../eventPlugins/MouseEventPlugin');
var SideEffectEventPlugin = require('../eventPlugins/SideEffectEventPlugin');

var ReactInjection = {
  EventEmitter: null,
  MapEvent: MapEvent.injection,
  MapOption: MapOption.injection,
  MapComponents: ReactMapComponents.injection
};

function inject() {
  ReactInjection.MapEvent.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    MouseEventPlugin: MouseEventPlugin,
    SideEffectEventPlugin: SideEffectEventPlugin
  });

  ReactInjection.MapComponents.injectComponentClasses({
    Map: ReactMap,
    OverlayView: ReactOverlayView,
    Frag: ReactFrag
  });

  ReactInjection.MapOption.injectMapOptionConfig(MapOptionConfig);
}

module.exports = {
  inject: inject
};


},{"../ReactMapComponents":9,"../eventPlugins/MouseEventPlugin":10,"../eventPlugins/SideEffectEventPlugin":11,"../eventPlugins/SimpleEventPlugin":12,"./MapEvent":13,"./MapOption":14,"./MapOptionConfig":15,"./components/ReactFrag":20,"./components/ReactMap":21,"./components/ReactOverlayView":22}],18:[function(require,module,exports){
"use strict";

var React = require('react');
var invariant = require('react/lib/invariant');
var GoogleMapsAPI = require('../GoogleMapsAPI');
var ReactMapComponentMixin = require('./ReactMapComponentMixin');

/**
 * React render implementation
 *
 * @returns {null}
 */
function nullRenderer() {
  return null;
}

/**
 * Create base constructor for google map class
 *
 * @param {string} constructorName
 * @returns {Function}
 */
function createGoogleMapClassConstructor(constructorName) {
  var Constructor = GoogleMapsAPI[constructorName];

  invariant(Constructor, 'Google Maps class of `%s` does not exist', constructorName);

  return function() {
    return new Constructor();
  }
}


var ReactMapComponent = {

  /**
   * Create base map component of type
   *
   * @param {string} constructorName
   * @param {function?} constructorFn
   * @return {ReactComponent}
   */
  create: function(constructorName, constructorFn) {
    return React.createClass({
      displayName: constructorName,

      mixins: [ReactMapComponentMixin],

      constructGoogleMapsClass: constructorFn || createGoogleMapClassConstructor(constructorName),

      render: nullRenderer
    });
  }
};

module.exports = ReactMapComponent;


},{"../GoogleMapsAPI":8,"./ReactMapComponentMixin":19,"react":"react","react/lib/invariant":31}],19:[function(require,module,exports){
"use strict";

var assign = require('react/lib/Object.assign');
var invariant = require('react/lib/invariant');
var MapOption = require('./MapOption');
var MapOptionConfig = require('./MapOptionConfig');
var MapEvent = require('./MapEvent');
var GoogleMapsAPI = require('../GoogleMapsAPI');

/**
 * Cached reset map option object
 */
var resetMapOptionObject = {map: null};

/**
 * Empty props cache
 */
var emptyPropsCache = {};

/**
 * Empty function to be provided to event handlers
 */
function noop() {}

/**
 * GoogleMaps React component mixin
 */
var ReactMapComponentMixin = {
  propTypes: assign({}, MapOptionConfig.Options),

  shouldComponentUpdate: function() {
    return this.__shouldComponentUpdate;
  },

  componentDidMount: function() {
    this.__shouldComponentUpdate = true;
    this.__dirtyOptions = {};
    this.__eventCache = {};
    this.__node = this.constructGoogleMapsClass();
    this._setInitialMapProperties();
    this._updateMapProperties(emptyPropsCache);
  },

  componentDidUpdate: function(prevProps) {
    this._updateMapProperties(prevProps);
  },

  _setInitialMapProperties: function() {
    var initialMapOptions = {};
    var props = this.props;
    for (var propKey in props) {
      var optionName = MapOption.getInitialOptionName[propKey];
      if (!props.hasOwnProperty(propKey) || !optionName) {
        continue;
      }

      initialMapOptions[optionName] = props[propKey];
    }

    this.flushOptionChanges(initialMapOptions);
  },

  _updateMapProperties: function(lastProps) {
    var nextProps = this.props;
    var mapOptionChanges = {};
    var mapEventChanges = {};
    var propKey;

    // Remove any options or events that no longer
    // exist in the new set of props.
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) ||
        !lastProps.hasOwnProperty(propKey)) {
        continue;
      }

      if (MapEvent.isStandardName[propKey]) {
        mapEventChanges[propKey] = null;
      } else if (MapOption.isStandardName[propKey]) {
        mapOptionChanges[propKey] = null;
      }
    }

    // Add any changed options or new events.
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) ||
        (nextProp === lastProp && !this.__dirtyOptions[propKey])) {
        continue;
      }

      if (MapEvent.isStandardName[propKey] && !lastProp) {
        mapEventChanges[propKey] = nextProp;
      } else if (MapOption.isStandardName[propKey]) {
        mapOptionChanges[MapOption.getOptionName[propKey]] = nextProps[propKey];
      }
    }

    // Added check of changed options that have side effect events,
    // if they don't have a handler then add a noop one for this event
    // to trigger the side effect dirty checking.
    for (propKey in mapOptionChanges) {
      var sideEffectEvent = MapEvent.getOptionSideEffectEvent[propKey];
      if (!mapOptionChanges.hasOwnProperty(propKey) || !sideEffectEvent || nextProps[sideEffectEvent]) {
        continue;
      }

      var hasNextProp = nextProps[propKey] != null;
      var hasLastProp = lastProps[propKey] != null;

      if (hasLastProp && !hasNextProp) {
        mapEventChanges[sideEffectEvent] = null;
      } else if (!hasLastProp && hasNextProp) {
        mapEventChanges[sideEffectEvent] = noop;
      }
    }

    this.flushOptionChanges(mapOptionChanges);
    this.flushEventChanges(mapEventChanges);
  },

  flushOptionChanges: function(optionChanges) {
    MapEvent.setEnabled(false);
    this.__node.setOptions(optionChanges);
    MapEvent.setEnabled(true);
  },

  flushEventChanges: function(eventChanges) {
    for (var eventName in eventChanges) {
      if (!eventChanges.hasOwnProperty(eventName)) {
        continue;
      }

      if (eventChanges[eventName]) {
        this.putListener(eventName);
      } else {
        this.deleteListener(eventName);
      }
    }
  },

  componentWillUnmount: function() {
    this.deleteAllListeners();

    if (this.props.map) {
      // If we still have a map prop at this point we should unset it from the node
      this.flushOptionChanges(resetMapOptionObject);
    }
    this.__node = null;
  },

  putListener: function(eventName) {
    invariant(!this.__eventCache[eventName], 'Already has `%s` event bound', eventName);

    this.__eventCache[eventName] = GoogleMapsAPI.event.addListener(
      this.__node,
      MapEvent.getEventName[eventName],
      MapEvent.createEventDispatcher(eventName, this)
    );
  },

  deleteListener: function(eventName) {
    invariant(this.__eventCache[eventName], 'No event of `%s` bound to remove', eventName);

    GoogleMapsAPI.event.removeListener(this.__eventCache[eventName]);
    delete this.__eventCache[eventName];
  },

  deleteAllListeners: function() {
    for (var eventName in this.__eventCache) {
      if (this.__eventCache.hasOwnProperty(eventName)) {
        this.deleteListener(eventName);
      }
    }
  },

  queueDirtyCheck: function() {
    this.__shouldComponentUpdate = false;
  },

  flushDirtyChangesTo: function(effects) {
    this.__shouldComponentUpdate = true;
    this.__dirtyOptions[effects] = true;
    this.forceUpdate();
    this.__dirtyOptions = {};
  },

  getMapNode: function() {
    return this.__node;
  }
};

module.exports = ReactMapComponentMixin;


},{"../GoogleMapsAPI":8,"./MapEvent":13,"./MapOption":14,"./MapOptionConfig":15,"react/lib/Object.assign":24,"react/lib/invariant":31}],20:[function(require,module,exports){
"use strict";

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var MapPropTypes = require('../MapPropTypes');

function injectMapInto(child) {
  return React.isValidElement(child) ?
    cloneWithProps(child, {map: this.props.map}) : child;
}

var ReactFrag = React.createClass({displayName: "ReactFrag",
  propTypes: {
    map: MapPropTypes.Map.isRequired,
  },

  render: function() {
    // Inject the `mapProps` into all children that are
    // valid components.
    var children = React.Children
      .map(this.props.children, injectMapInto, this);

    return (
      React.createElement("span", null, children)
      );
  }
});

module.exports = ReactFrag;


},{"../MapPropTypes":16,"react":"react","react/lib/cloneWithProps":29}],21:[function(require,module,exports){
"use strict";

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var keyMirror = require('react/lib/keyMirror');
var ReactMapComponents = require('../../ReactMapComponents');
var MapPropTypes = require('../MapPropTypes');
var PropTypeUtils = require('../../utils/PropTypeUtils');
var ReactFrag = require('./ReactFrag');

var GoogleMapsMap = ReactMapComponents.Map;

// TODO: Remove the need for this, we shouldn't need to render 3 times to initialise
var MapLifeCycle = keyMirror({
  CREATING_HOLDER: null,
  CREATING_MAP: null
});

var ReactMap = React.createClass({displayName: "ReactMap",
  propTypes: {
    zoom: PropTypeUtils.or('initialZoom', React.PropTypes.number).isRequired,
    center: PropTypeUtils.or('initialCenter', MapPropTypes.LatLng).isRequired,
    width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  getInitialState: function() {
    return {
      mapLifeCycleState: MapLifeCycle.CREATING_HOLDER
    };
  },

  componentDidMount: function() {
    // Now we have the map created, we need to run the render
    // cycle again to pass down the `map` holder for the
    // components to render into.
    this.setState({mapLifeCycleState: MapLifeCycle.CREATING_MAP});
  },

  componentDidUpdate: function() {
    if (this.state.mapLifeCycleState === MapLifeCycle.CREATING_MAP) {
      this.setState({mapLifeCycleState: null});
    }
  },

  render: function() {
    var holderStyle = {
      width: this.props.width,
      height: this.props.height
    };

    var map;
    if (this.state.mapLifeCycleState !== MapLifeCycle.CREATING_HOLDER) {
      map = (
        React.createElement(GoogleMapsMap, React.__spread({}, 
          this.props, 
          {ref: "map", 
          mapDiv: this.refs.mapHolder.getDOMNode(), 
          width: null, 
          height: null}))
      );
    }

    var children;
    if (!this.state.mapLifeCycleState) {
      children = (
        React.createElement(ReactFrag, {map: this.refs.map.__node}, 
          this.props.children
        )
      );
    }

    return (
      React.createElement("div", null, 
        React.createElement("div", {
          ref: "mapHolder", 
          className: this.props.className, 
          style: holderStyle}), 

        map, 
        children
      )
      );
  }
});

module.exports = ReactMap;


},{"../../ReactMapComponents":9,"../../utils/PropTypeUtils":23,"../MapPropTypes":16,"./ReactFrag":20,"react":"react","react/lib/cloneWithProps":29,"react/lib/keyMirror":33}],22:[function(require,module,exports){
"use strict";

var React = require('react');
var assign = require('react/lib/Object.assign');
var cloneWithProps = require('react/lib/cloneWithProps');
var GoogleMapsAPI = require('../../GoogleMapsAPI');
var MapPropTypes = require('../MapPropTypes');

function MapOverlayView(props) {
  this.props = props;
  this.setMap(props.map);
}

MapOverlayView.prototype = new GoogleMapsAPI.OverlayView();

MapOverlayView.prototype.onAdd = function() {
  this._containerElement = document.createElement('div');
  this.getPanes()[this.props.mapPane]
    .appendChild(this._containerElement);
};

MapOverlayView.prototype.draw = function() {
  var props = assign({}, this.props, {position: null, mapPane: null});
  if (this.props.position) {
    var point = this.getProjection()
      .fromLatLngToDivPixel(this.props.position);

    props.style = assign({}, {
      position: 'absolute',
      left: point.x,
      top: point.y
    }, this.props.style);
  }

  React.render(
    cloneWithProps(React.createElement("div", null), props),
    this._containerElement
  )
};

MapOverlayView.prototype.onRemove = function() {
  React.unmountComponentAtNode(this._containerElement);
  this._containerElement.parentNode
    .removeChild(this._containerElement);
  this._containerElement = null;
};

var ReactOverlayView = React.createClass({
  displayName: 'OverlayView',

  propTypes: {
    mapPane: MapPropTypes.MapPanes.isRequired
  },

  getDefaultProps: function() {
    return {
      mapPane: 'overlayLayer'
    };
  },

  render: function() {
    // Nothing to render
    return null;
  },

  componentDidMount: function() {
    this.__node = new MapOverlayView(this.props);
  },

  componentDidUpdate: function(prevProps) {
    this.__node.props = this.props;
    this.__node.draw();

    if (this.props.mapPane != prevProps.mapPane) {
      // Unmount then, mount again onto the correct map pane
      this.__node.setMap(null);
      this.__node.setMap(this.props.map);
    }
  },

  componentWillUnmount: function() {
    this.__node.setMap(null);
    this.__node = null;
  }
});

module.exports = ReactOverlayView;


},{"../../GoogleMapsAPI":8,"../MapPropTypes":16,"react":"react","react/lib/Object.assign":24,"react/lib/cloneWithProps":29}],23:[function(require,module,exports){
"use strict";

/**
 * Check if a prop or another specified prop has a valid value
 * @type {function}
 */
exports.or = createChainableOrTypeChecker;

function createChainableOrTypeChecker(orPropName, validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null && props[orPropName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` or `' + orPropName + '` was not specified in ' +
            '`' + componentName + '`.'
        );
      }
    } else {
      var validatePropName = props[propName] == null ? orPropName : propName;
      return validate(props, validatePropName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

},{}],24:[function(require,module,exports){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

},{}],25:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactContext
 */

"use strict";

var assign = require("./Object.assign");

/**
 * Keeps track of the current context.
 *
 * The context is automatically passed down the component ownership hierarchy
 * and is accessible via `this.context` on ReactCompositeComponents.
 */
var ReactContext = {

  /**
   * @internal
   * @type {object}
   */
  current: {},

  /**
   * Temporarily extends the current context while executing scopedCallback.
   *
   * A typical use case might look like
   *
   *  render: function() {
   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
   *
   *    ));
   *    return <div>{children}</div>;
   *  }
   *
   * @param {object} newContext New context to merge into the existing context
   * @param {function} scopedCallback Callback to run with the new context
   * @return {ReactComponent|array<ReactComponent>}
   */
  withContext: function(newContext, scopedCallback) {
    var result;
    var previousContext = ReactContext.current;
    ReactContext.current = assign({}, previousContext, newContext);
    try {
      result = scopedCallback();
    } finally {
      ReactContext.current = previousContext;
    }
    return result;
  }

};

module.exports = ReactContext;

},{"./Object.assign":24}],26:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 */

"use strict";

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 *
 * The depth indicate how many composite components are above this render level.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

},{}],27:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElement
 */

"use strict";

var ReactContext = require("./ReactContext");
var ReactCurrentOwner = require("./ReactCurrentOwner");

var warning = require("./warning");

var RESERVED_PROPS = {
  key: true,
  ref: true
};

/**
 * Warn for mutations.
 *
 * @internal
 * @param {object} object
 * @param {string} key
 */
function defineWarningProperty(object, key) {
  Object.defineProperty(object, key, {

    configurable: false,
    enumerable: true,

    get: function() {
      if (!this._store) {
        return null;
      }
      return this._store[key];
    },

    set: function(value) {
      ("production" !== process.env.NODE_ENV ? warning(
        false,
        'Don\'t set the ' + key + ' property of the component. ' +
        'Mutate the existing props object instead.'
      ) : null);
      this._store[key] = value;
    }

  });
}

/**
 * This is updated to true if the membrane is successfully created.
 */
var useMutationMembrane = false;

/**
 * Warn for mutations.
 *
 * @internal
 * @param {object} element
 */
function defineMutationMembrane(prototype) {
  try {
    var pseudoFrozenProperties = {
      props: true
    };
    for (var key in pseudoFrozenProperties) {
      defineWarningProperty(prototype, key);
    }
    useMutationMembrane = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

/**
 * Base constructor for all React elements. This is only used to make this
 * work with a dynamic instanceof check. Nothing should live on this prototype.
 *
 * @param {*} type
 * @param {string|object} ref
 * @param {*} key
 * @param {*} props
 * @internal
 */
var ReactElement = function(type, key, ref, owner, context, props) {
  // Built-in properties that belong on the element
  this.type = type;
  this.key = key;
  this.ref = ref;

  // Record the component responsible for creating this element.
  this._owner = owner;

  // TODO: Deprecate withContext, and then the context becomes accessible
  // through the owner.
  this._context = context;

  if ("production" !== process.env.NODE_ENV) {
    // The validation flag and props are currently mutative. We put them on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    this._store = { validated: false, props: props };

    // We're not allowed to set props directly on the object so we early
    // return and rely on the prototype membrane to forward to the backing
    // store.
    if (useMutationMembrane) {
      Object.freeze(this);
      return;
    }
  }

  this.props = props;
};

// We intentionally don't expose the function on the constructor property.
// ReactElement should be indistinguishable from a plain object.
ReactElement.prototype = {
  _isReactElement: true
};

if ("production" !== process.env.NODE_ENV) {
  defineMutationMembrane(ReactElement.prototype);
}

ReactElement.createElement = function(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;

  if (config != null) {
    ref = config.ref === undefined ? null : config.ref;
    if ("production" !== process.env.NODE_ENV) {
      ("production" !== process.env.NODE_ENV ? warning(
        config.key !== null,
        'createElement(...): Encountered component with a `key` of null. In ' +
        'a future version, this will be treated as equivalent to the string ' +
        '\'null\'; instead, provide an explicit key or use undefined.'
      ) : null);
    }
    // TODO: Change this back to `config.key === undefined`
    key = config.key == null ? null : '' + config.key;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (config.hasOwnProperty(propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (typeof props[propName] === 'undefined') {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return new ReactElement(
    type,
    key,
    ref,
    ReactCurrentOwner.current,
    ReactContext.current,
    props
  );
};

ReactElement.createFactory = function(type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
  var newElement = new ReactElement(
    oldElement.type,
    oldElement.key,
    oldElement.ref,
    oldElement._owner,
    oldElement._context,
    newProps
  );

  if ("production" !== process.env.NODE_ENV) {
    // If the key on the original is valid, then the clone is valid
    newElement._store.validated = oldElement._store.validated;
  }
  return newElement;
};

/**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function(object) {
  // ReactTestUtils is often used outside of beforeEach where as React is
  // within it. This leads to two different instances of React on the same
  // page. To identify a element from a different React instance we use
  // a flag instead of an instanceof check.
  var isElement = !!(object && object._isReactElement);
  // if (isElement && !(object instanceof ReactElement)) {
  // This is an indicator that you're using multiple versions of React at the
  // same time. This will screw with ownership and stuff. Fix it, please.
  // TODO: We could possibly warn here.
  // }
  return isElement;
};

module.exports = ReactElement;

}).call(this,require('_process'))
},{"./ReactContext":25,"./ReactCurrentOwner":26,"./warning":36,"_process":6}],28:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTransferer
 */

"use strict";

var assign = require("./Object.assign");
var emptyFunction = require("./emptyFunction");
var invariant = require("./invariant");
var joinClasses = require("./joinClasses");
var warning = require("./warning");

var didWarn = false;

/**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */
function createTransferStrategy(mergeStrategy) {
  return function(props, key, value) {
    if (!props.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      props[key] = mergeStrategy(props[key], value);
    }
  };
}

var transferStrategyMerge = createTransferStrategy(function(a, b) {
  // `merge` overrides the first object's (`props[key]` above) keys using the
  // second object's (`value`) keys. An object's style's existing `propA` would
  // get overridden. Flip the order here.
  return assign({}, b, a);
});

/**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 * NOTE: if you add any more exceptions to this list you should be sure to
 * update `cloneWithProps()` accordingly.
 */
var TransferStrategies = {
  /**
   * Never transfer `children`.
   */
  children: emptyFunction,
  /**
   * Transfer the `className` prop by merging them.
   */
  className: createTransferStrategy(joinClasses),
  /**
   * Transfer the `style` prop (which is an object) by merging them.
   */
  style: transferStrategyMerge
};

/**
 * Mutates the first argument by transferring the properties from the second
 * argument.
 *
 * @param {object} props
 * @param {object} newProps
 * @return {object}
 */
function transferInto(props, newProps) {
  for (var thisKey in newProps) {
    if (!newProps.hasOwnProperty(thisKey)) {
      continue;
    }

    var transferStrategy = TransferStrategies[thisKey];

    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
      transferStrategy(props, thisKey, newProps[thisKey]);
    } else if (!props.hasOwnProperty(thisKey)) {
      props[thisKey] = newProps[thisKey];
    }
  }
  return props;
}

/**
 * ReactPropTransferer are capable of transferring props to another component
 * using a `transferPropsTo` method.
 *
 * @class ReactPropTransferer
 */
var ReactPropTransferer = {

  TransferStrategies: TransferStrategies,

  /**
   * Merge two props objects using TransferStrategies.
   *
   * @param {object} oldProps original props (they take precedence)
   * @param {object} newProps new props to merge in
   * @return {object} a new object containing both sets of props merged.
   */
  mergeProps: function(oldProps, newProps) {
    return transferInto(assign({}, oldProps), newProps);
  },

  /**
   * @lends {ReactPropTransferer.prototype}
   */
  Mixin: {

    /**
     * Transfer props from this component to a target component.
     *
     * Props that do not have an explicit transfer strategy will be transferred
     * only if the target component does not already have the prop set.
     *
     * This is usually used to pass down props to a returned root component.
     *
     * @param {ReactElement} element Component receiving the properties.
     * @return {ReactElement} The supplied `component`.
     * @final
     * @protected
     */
    transferPropsTo: function(element) {
      ("production" !== process.env.NODE_ENV ? invariant(
        element._owner === this,
        '%s: You can\'t call transferPropsTo() on a component that you ' +
        'don\'t own, %s. This usually means you are calling ' +
        'transferPropsTo() on a component passed in as props or children.',
        this.constructor.displayName,
        typeof element.type === 'string' ?
        element.type :
        element.type.displayName
      ) : invariant(element._owner === this));

      if ("production" !== process.env.NODE_ENV) {
        if (!didWarn) {
          didWarn = true;
          ("production" !== process.env.NODE_ENV ? warning(
            false,
            'transferPropsTo is deprecated. ' +
            'See http://fb.me/react-transferpropsto for more information.'
          ) : null);
        }
      }

      // Because elements are immutable we have to merge into the existing
      // props object rather than clone it.
      transferInto(element.props, this.props);

      return element;
    }

  }
};

module.exports = ReactPropTransferer;

}).call(this,require('_process'))
},{"./Object.assign":24,"./emptyFunction":30,"./invariant":31,"./joinClasses":32,"./warning":36,"_process":6}],29:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule cloneWithProps
 */

"use strict";

var ReactElement = require("./ReactElement");
var ReactPropTransferer = require("./ReactPropTransferer");

var keyOf = require("./keyOf");
var warning = require("./warning");

var CHILDREN_PROP = keyOf({children: null});

/**
 * Sometimes you want to change the props of a child passed to you. Usually
 * this is to add a CSS class.
 *
 * @param {object} child child component you'd like to clone
 * @param {object} props props you'd like to modify. They will be merged
 * as if you used `transferPropsTo()`.
 * @return {object} a clone of child with props merged in.
 */
function cloneWithProps(child, props) {
  if ("production" !== process.env.NODE_ENV) {
    ("production" !== process.env.NODE_ENV ? warning(
      !child.ref,
      'You are calling cloneWithProps() on a child with a ref. This is ' +
      'dangerous because you\'re creating a new child which will not be ' +
      'added as a ref to its parent.'
    ) : null);
  }

  var newProps = ReactPropTransferer.mergeProps(props, child.props);

  // Use `child.props.children` if it is provided.
  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
      child.props.hasOwnProperty(CHILDREN_PROP)) {
    newProps.children = child.props.children;
  }

  // The current API doesn't retain _owner and _context, which is why this
  // doesn't use ReactElement.cloneAndReplaceProps.
  return ReactElement.createElement(child.type, newProps);
}

module.exports = cloneWithProps;

}).call(this,require('_process'))
},{"./ReactElement":27,"./ReactPropTransferer":28,"./keyOf":34,"./warning":36,"_process":6}],30:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],31:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":6}],32:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */

"use strict";

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} classes
 * @return {string}
 */
function joinClasses(className/*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;

},{}],33:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))
},{"./invariant":31,"_process":6}],34:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};


module.exports = keyOf;

},{}],35:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule mapObject
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;

},{}],36:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== process.env.NODE_ENV) {
  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (!condition) {
      var argIndex = 0;
      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"./emptyFunction":30,"_process":6}]},{},[1]);
