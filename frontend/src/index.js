import React from 'react';
import ReactDOM from 'react-dom';
// import 'babel-polyfill';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import App from './comps/App';
import reducers from './reducers';

import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appStore = createStore(reducers, /* preloadedState, */ composeWithDevTools(applyMiddleware(thunk)));


window.version = "1.0.0";
console.log("version = " + window.version);

console.log('process.env.ENV', process.env.NODE_ENV);

ReactDOM.render(
  <Provider store={appStore}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  , document.getElementById('app'));
