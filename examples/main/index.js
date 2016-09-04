import './index.css';
import  React from 'react';
import ReactDOM from 'react-dom';
import Router, { Link, listenBefore, Route } from '../../src/index.js';


/** Stateless app */
const App = () => (
	<div className="app">
		<Router>
            <Route
                path="/"
                title="homepage"
                getComponent={() => {
                    return new Promise(function(resolve, reject) {
                        require.ensure([], (require) => {
                            const Home = require('./Home').default;
                            resolve(Home);
                        }, 'home');
                    });
                }} />
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
		</Router>
	</div>
);

ReactDOM.render(<App />, document.getElementById('react-container'));
