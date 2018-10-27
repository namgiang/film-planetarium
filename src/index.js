import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'es6-shim';

import './index.css';
import '../node_modules/grommet-css';

// import Main from './containers/Main';

import Header from './components/Header/Header';
import About from './containers/About/About';
import Directors from './containers/Directors/Directors';
import Director from './containers/Director/Director';
import store, {history} from "./store/configure-store";

const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	    <ConnectedRouter history={history}>
		    <div className="App">
				<Header />
				<div className="main-content">
					<Switch>
						<Route exact path="/" component={Directors} />
						<Route path="/directors" component={Directors} />
						<Route path="/about" component={About} />
						<Route path="/director/:directorLabel" exact component={Director} />
					</Switch>
				</div>
			  </div>
		  </ConnectedRouter>
  </Provider>,
  rootEl
);