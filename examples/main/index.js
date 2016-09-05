import './index.css';
import  React from 'react';
import ReactDOM from 'react-dom';
import Router, { Link, listenBefore, Route } from '../../src/index.js';
import Login from './Login';
import Layout from './Layout';
/** Stateless app */
const App = () => (
	<div className="app">
		<Router
			url="/login">
			<Login path="/login" />
			<Layout
				default
				className="content">
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
						path="/account/:id"
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
			</Layout>
		</Router>


	</div>
);

ReactDOM.render(<App />, document.getElementById('react-container'));
