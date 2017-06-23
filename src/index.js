import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/grommet-css';

import 'es6-shim';

import Header from './components/Header/Header';

import About from './components/About/About';
import Directors from './components/Directors/Directors';
import Director from './components/Director/Director';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { changeRange } from './services/actions';

import createHistory from 'history/createHashHistory';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import filmApp from './reducers/index';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    filmApp,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

store.dispatch(changeRange([1955, 2010]));

const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	  { /* ConnectedRouter will use the store from Provider automatically */ }
	  <div>
	    <ConnectedRouter history={history}>
		    <div className="App">
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