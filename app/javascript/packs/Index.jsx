

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Dashboard'
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux"; // we get our store from redux library and we need middleware to wire up Thunk
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer"; 

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, storeEnhancers(applyMiddleware(thunk)));

// this is how you hook up to store with callback to view store in console.
store.subscribe(() => {
  console.log("the new state is", store.getState());
  console.log("----------");
});


  ReactDOM.render(
    <Provider store={store}>
      <Router><Dashboard /></Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  )
