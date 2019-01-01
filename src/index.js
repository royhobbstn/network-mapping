import React from 'react';
import ReactDOM from 'react-dom';

import MapContainer from './Component/MapContainer.js';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Store from './Redux/combine_reducers';

import './index.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Store,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <MapContainer />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
