# react-rainie-router

[![Travis][build-badge]][build] [![npm package][npm-badge]][npm] [![Coveralls][coveralls-badge]][coveralls]

**It has a similar and simple features for react-router,react-rainie-router is a fast, 2kb alternative to react-router.**

react-rainie-router provides a <Router /> component that conditionally renders its children when the URL matches their path. It also automatically wires up <a /> elements up to the router.

<div style="padding:30px">
<img src="https://raw.githubusercontent.com/lanjingling0510/react-rainie-router/master/.github/preview.gif" width="300" />
</div>


## Features

- It is only 2k!, We only use our frequently used functions. Including Route Mathing, Nesting, default routing, Link, dynamic routing...
- We can Asynchronously request some data from  `listenBefore` before routing jump to another. And `listenBefore` should return a promise object.
- It's no limit to the number of  `Router` component nested other component.
- Support coding Spliting by `getComponent` from  `Route` component.


## Docs & Help

* [Guides and Api docs](Guids.md)
* [Changelog](CHANGELOG.md)



## Getting Started
### Install

Using [npm](https://www.npmjs.com/):

	$ npm install react-rainie-router --save

### Import what you need

The following guide assumes you have some sort of ES2015 build set up using babel and/or webpack/browserify/gulp/grunt/etc.

```js
import  React from 'react';
import ReactDOM from 'react-dom';
import Router, { Link, listenBefore, Route } from 'react-rainie-router';
```

### Usage Example

```js

/** Stateless app */

function Home({url, title}) {
    return (
        <section className="home">
            <h2>Welcome to my {title}</h2>
            <p>current link: {url}</p>
            <Link href="/account/123">go account</Link>
        </section>
    );
}

function Account({url, matches, name}) {
    return (
        <section className="error">
            <h2>Account: {matches.id}</h2>
            <p>my name is : {name}</p>
            <pre>current link: {url}</pre>
            <Link href="/">go homepage</Link>
        </section>
    );
}

const App = () => (
	<div className="app">
		<Router>
            <Home path="/" title="homepage" />
            <Account path="/account/:id?" name="rainie" />
		</Router>
	</div>
);

ReactDOM.render(<App />, document.getElementById('react-container'));

```

## How to Contribute

Anyone and everyone is welcome to contribute to this project. The best way to
start is by checking our [open issues](https://github.com/lanjingling0510/react-rainie-router/issues),
[submit a new issues](https://github.com/lanjingling0510/react-rainie-router/issues/new?labels=bug) or
[feature request](https://github.com/lanjingling0510/react-rainie-router/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike.



[npm-badge]: https://img.shields.io/npm/v/react-rainie-router.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-rainie-router
[build-badge]: https://img.shields.io/travis/lanjingling0510/react-rainie-router/master.svg?style=flat-square
[build]: https://travis-ci.org/lanjingling0510/react-rainie-router
[coveralls-badge]: https://img.shields.io/coveralls/lanjingling0510/react-rainie-router.svg?style=flat-square
[coveralls]: https://coveralls.io/github/lanjingling0510/react-rainie-router
