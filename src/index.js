//

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './Component/AppContainer.js';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Store from './Redux/combine_reducers';
import openSocket from 'socket.io-client';
import { ioEvents} from "./WebSocket/ioEvents";
import 'semantic-ui-css/semantic.min.css'
import './index.css';

const socket = openSocket('http://localhost:4005');
window.socket = socket;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Store,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

ioEvents(store.dispatch, socket);


ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <AppContainer />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

