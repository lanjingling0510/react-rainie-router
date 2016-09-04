(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global.preactRouter = factory(global.React));
}(this, (function (React) { 'use strict';

React = 'default' in React ? React['default'] : React;

var EMPTY$1 = {};

function exec(url, route) {
    var opts = arguments.length <= 2 || arguments[2] === undefined ? EMPTY$1 : arguments[2];

    var reg = /(?:\?([^#]*))?(#.*)?$/,
        c = url.match(reg),
        matches = {},
        ret = void 0;
    if (c && c[1]) {
        var p = c[1].split('&');
        for (var i = 0; i < p.length; i++) {
            var r = p[i].split('=');
            matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
        }
    }
    url = segmentize(url.replace(reg, ''));
    route = segmentize(route || '');
    var max = Math.max(url.length, route.length);
    for (var _i = 0; _i < max; _i++) {
        if (route[_i] && route[_i].charAt(0) === ':') {
            var param = route[_i].replace(/(^\:|[+*?]+$)/g, ''),
                flags = (route[_i].match(/[+*?]+$/) || EMPTY$1)[0] || '',
                plus = ~flags.indexOf('+'),
                star = ~flags.indexOf('*'),
                val = url[_i] || '';
            if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
                ret = false;
                break;
            }
            matches[param] = decodeURIComponent(val);
            if (plus || star) {
                matches[param] = url.slice(_i).map(decodeURIComponent).join('/');
                break;
            }
        } else if (route[_i] !== url[_i]) {
            ret = false;
            break;
        }
    }
    if (opts.default !== true && ret === false) return false;
    return matches;
}

function pathRankSort(a, b) {
    var aAttr = a.props || EMPTY$1,
        bAttr = b.props || EMPTY$1;
    if (aAttr.default) return 1;
    if (bAttr.default) return -1;
    var diff = rank(aAttr.path) - rank(bAttr.path);
    return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
    return strip(url).split('/');
}

function rank(url) {
    return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
    return url.replace(/(^\/+|\/+$)/g, '');
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var Route = function (_React$Component) {
    inherits(Route, _React$Component);

    function Route() {
        var _temp, _this, _ret;

        classCallCheck(this, Route);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            SplitComponent: undefined
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    Route.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var _props2 = this.props;
        var component = _props2.component;
        var getComponent = _props2.getComponent;

        if (!component && getComponent) {
            var promise = getComponent();
            if (isPromise(promise)) {
                promise.then(function (SplitComponent) {
                    _this2.setState({ SplitComponent: SplitComponent });
                });
            }
        }
    };

    Route.prototype.render = function render() {
        var _props3 = this.props;
        var RoutedComponent = _props3.component;
        var getComponent = _props3.getComponent;

        var _props = objectWithoutProperties(_props3, ['component', 'getComponent']);

        var SplitComponent = this.state.SplitComponent;


        if (RoutedComponent) return React.createElement(RoutedComponent, _props);

        return SplitComponent ? React.createElement(SplitComponent, _props) : null;
    };

    return Route;
}(React.Component);

Route.PropTypes = {
    component: React.PropTypes.node,
    getComponent: React.PropTypes.func
};

var customHistory = null;

var ROUTERS = [];
var EMPTY = {};
var LISTENRS = [];

function setUrl(url) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'push' : arguments[1];

    if (customHistory && customHistory[type]) {
        customHistory[type](url);
    } else if (typeof history !== 'undefined' && history[type + 'State']) {
        history[type + 'State'](null, null, url);
    }
}

function getCurrentUrl() {
    var url = void 0;
    if (customHistory && customHistory.getCurrentLocation) {
        url = customHistory.getCurrentLocation();
    } else {
        url = typeof location !== 'undefined' ? location : EMPTY;
    }
    return '' + (url.pathname || '') + (url.search || '');
}

function listenBefore(func) {
    LISTENRS.push(func);
}

function route(url) {
    var replace = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return Promise.all(LISTENRS.map(function (func) {
        return func(url);
    })).then(function () {
        if (typeof url !== 'string' && url.url) {
            replace = url.replace;
            url = url.url;
        }
        setUrl(url, replace ? 'replace' : 'push');
        return routeTo(url);
    }).catch(function (e) {
        return console.log(e);
    });
}

function routeTo(url) {
    var didRoute = false;
    ROUTERS.forEach(function (router) {
        if (router.routeTo(url) === true) {
            didRoute = true;
        }
    });
    return didRoute;
}

function routeFromLink(node) {
    // only valid elements
    if (!node || !node.getAttribute) return;

    var href = node.getAttribute('href'),
        target = node.getAttribute('target');

    // ignore links with targets and non-path URLs
    if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) return;

    // attempt to route, if no match simply cede control to browser
    return route(href);
}

function handleLinkClick(e) {
    if (e.button !== 0) return;
    routeFromLink(e.currentTarget || e.target || this);
    return prevent(e);
}

function prevent(e) {
    if (e) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (e.stopPropagation) e.stopPropagation();
        e.preventDefault();
    }
    return false;
}

if (typeof addEventListener === 'function') {
    addEventListener('popstate', function () {
        return routeTo(getCurrentUrl());
    });
}

var Router = function (_React$Component) {
    inherits(Router, _React$Component);

    function Router(props) {
        classCallCheck(this, Router);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        if (props.history) {
            customHistory = props.history;
        }

        _this.state = {
            url: _this.props.url || getCurrentUrl()
        };
        return _this;
    }

    Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
        return props.url !== this.props.url || props.onChange !== this.props.onChange || state.url !== this.state.url;
    };

    Router.prototype.componentWillMount = function componentWillMount() {
        ROUTERS.push(this);
    };

    Router.prototype.componentWillUnmount = function componentWillUnmount() {
        ROUTERS.splice(ROUTERS.indexOf(this), 1);
    };

    Router.prototype.routeTo = function routeTo(url) {
        this._didRoute = false;
        this.setState({ url: url });
        return this._didRoute;
    };

    Router.prototype.render = function render() {
        var _props = this.props;
        var children = _props.children;
        var onChange = _props.onChange;
        var url = this.state.url;

        var routeElement = null;
        var active = React.Children.toArray(children).sort(pathRankSort).filter(function (child) {
            var props = child.props,
                path = props.path,
                matches = exec(url, path, props);
            if (matches) {
                routeElement = React.cloneElement(child, _extends({}, props, { url: url, matches: matches }));
                return true;
            }
        });

        var current = active[0] || null;
        this._didRoute = !!current;

        var previous = this.previousUrl;
        if (url !== previous) {
            this.previousUrl = url;
            if (typeof onChange === 'function') {
                onChange({ router: this, url: url, previous: previous, active: active, current: current });
            }
        }
        return routeElement;
    };

    return Router;
}(React.Component);

var Link = function (_ref) {
    var children = _ref.children;
    var props = objectWithoutProperties(_ref, ['children']);
    return React.createElement(
        'a',
        _extends({}, props, { onClick: handleLinkClick }),
        children
    );
};

Router.listenBefore = listenBefore;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

return Router;

})));
//# sourceMappingURL=preact-router.js.map
