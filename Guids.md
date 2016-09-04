
## Router
Primary component of React Router. It keeps your UI and the URL in sync.
### Props

##### `url`
if not set, using `location.pathname + location.search`.

## Router.listenBefore

There is an opportunity to prevent or delay routing Jump
```js

    // prevent routing navigate
    Router.listenBefore(() => {
        return Promise.reject();
    })

    // delay routing navigate
    Router.listenBefore(() => {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve();
            }, 500)
        });
    })

```

## Router.route

dynamic routing navigate

```js
    const App = () => (
    	<div className="app">
    		<Router>
                <Home path="/" title="homepage" default />
                <Account path="/account/:id?" name="rainie" />
    		</Router>
    	</div>
    );

    ReactDOM.render(<App />, document.getElementById('react-container'));
    Router.route('/account/123');

```


## Router.Link
The primary way to allow users to navigate around your application. <Link> will render a fully accessible anchor tag with the proper href.

```js

    // Given a route like <Route path="/users/:userId" />:
    <Link to={`/users/${user.id}`}>{user.name}</Link>
```

## Router.Route
A <Route> is used to declaratively map routes to your application's component hierarchy.

### Props

##### `path`
The path used in the URL.

##### `component`
A single component to be rendered when the route matches the URL.

##### `getComponent(callback)`
Same as component but asynchronous, useful for code-splitting.

```js

<Route
    path="/account/:id?"
    name="rainie"
    getComponent={() => {
        return new Promise(function(resolve, reject) {
            require.ensure([], (require) => {
                const Account = require('./Account').default;
                resolve(Account);
            }, 'account');
        });
    }} />
```
