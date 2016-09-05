import React from 'react';
import {exec, pathRankSort} from './util';
import Route from './Route.jsx';

let customHistory = null;

const ROUTERS = [];
const EMPTY = {};
const LISTENRS = [];

function setUrl(url, type = 'push') {
    if (customHistory && customHistory[type]) {
        customHistory[type](url);
    } else if (typeof history !== 'undefined' && history[type + 'State']) {
        history[type + 'State'](null, null, url);
    }
}

function getCurrentUrl() {
    let url;
    if (customHistory && customHistory.getCurrentLocation) {
        url = customHistory.getCurrentLocation();
    } else {
        url = typeof location !== 'undefined'
            ? location
            : EMPTY;
    }
    return `${url.pathname || ''}${url.search || ''}`;
}

function listenBefore(func) {
    LISTENRS.push(func);
}


function route(url, replace = false) {
    return Promise.all(LISTENRS.map(func => func(url)))
    .then(() => {
        if (typeof url !== 'string' && url.url) {
            replace = url.replace;
            url = url.url;
        }
        setUrl(url, replace
            ? 'replace'
            : 'push');
        return routeTo(url);
    }).catch(() => {});
}

function routeTo(url) {
    let didRoute = false;
    ROUTERS.forEach(router => {
        if (router.routeTo(url) === true) {
            didRoute = true;
        }
    });
    return didRoute;
}

function routeFromLink(node) {
    // only valid elements
    if (!node || !node.getAttribute)
        return;

    let href = node.getAttribute('href') || node.getAttribute('to'),
        target = node.getAttribute('target');

    // ignore links with targets and non-path URLs
    if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i)))
        return;

    // attempt to route, if no match simply cede control to browser
    return route(href);
}

function handleLinkClick(e) {
    if (e.button !== 0)
        return;
    routeFromLink(e.currentTarget || e.target || this);
    return prevent(e);
}

function prevent(e) {
    if (e) {
        if (e.stopImmediatePropagation)
            e.stopImmediatePropagation();
        if (e.stopPropagation)
            e.stopPropagation();
        e.preventDefault();
    }
    return false;
}

if (typeof addEventListener === 'function') {
    addEventListener('popstate', () => routeTo(getCurrentUrl()));
}

class Router extends React.Component {
    constructor(props) {
        super(props);
        if (props.history) {
            customHistory = props.history;
        }

        this.state = {
            url: this.props.url || getCurrentUrl()
        };
    }

    shouldComponentUpdate(props, state) {
        return props.url !== this.props.url ||
            props.onChange !== this.props.onChange ||
            state.url !== this.state.url;
    }

    componentWillMount() {
        ROUTERS.push(this);
    }

    componentWillUnmount() {
        ROUTERS.splice(ROUTERS.indexOf(this), 1);
    }

    routeTo(url) {
        this._didRoute = false;
        this.setState({url});
        return this._didRoute;
    }

    render() {
        const {children, onChange} = this.props;
        const {url} = this.state;
        let routeElement = null;

        const childrenElements = React.Children
            .toArray(children)
            .sort(pathRankSort);

        for (let i = 0; i < childrenElements.length; i++) {
            let child = childrenElements[i],
                props = child.props,
                path = props.path,
                matches = exec(url, path, props);
            if (matches) {
                routeElement = React.cloneElement(
                    child,
                    {...child.props, url, matches}
                );

                this._didRoute = true;
                break;
            }
        }


        let previous = this.previousUrl;
        if (url !== previous) {
            this.previousUrl = url;
            if (typeof onChange === 'function') {
                onChange({ url, previous, router: this });
            }
        }
        return routeElement;
    }
}

const Link = ({
    children,
    ...props
}) => (
    <a {...props} onClick={handleLinkClick}>{children}</a>
);

Router.listenBefore = listenBefore;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

export {route, Router, Route, Link, listenBefore};
export default Router;
