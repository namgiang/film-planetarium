import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/grommet-css';
import 'es6-shim';

import Header from './components/Header/Header';

import About from './components/About/About';
import Directors from './components/Directors/Directors';
import Director from './components/Director/Director';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from "./store/configure-store";

const history = createHistory();

const store = configureStore();

const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	  { /* ConnectedRouter will use the store from Provider automatically */ }
	  <div>
	    <ConnectedRouter history={history}>
		    <div className="App">
					<Header />
			    <Switch>
				    <Route exact path="/" component={Directors} />
						<Route path="/directors" component={Directors} />
						<Route path="/about" component={About} />
						<Route path="/director/:directorLabel" component={Director} />
			    </Switch>
			  </div>
		  </ConnectedRouter>
		</div>
  </Provider>,
  rootEl
);