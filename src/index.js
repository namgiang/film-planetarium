import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/grommet-css';

import Header from './components/Header/Header';

import About from './components/About/About';
import Directors from './components/Directors/Directors';
import Director from './components/Director/Director';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router' // react-router v4
import { changeRange } from './services/actions';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import filmApp from './reducers/index'; // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
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
				    <Route exact path="/" component={Directors}/>
					<Route path="/directors" component={Directors} />
					<Route path="/about" component={About}/>
					<Route path="/director/:directorLabel" component={Director}/>
			    </Switch>
			</div>
		</ConnectedRouter>
		</div>
    </Provider>,
    rootEl
);