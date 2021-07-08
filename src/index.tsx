import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { applyMiddleware, createStore } from "redux";
import DiagramReducer from "./Store/DiagramReducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from 'redux-logger';
import {Store } from "./Store/Store";
//_INITIAL_DATA_.type=""
//_INITIAL_DATA_. data=null

export const store=createStore(DiagramReducer,
  composeWithDevTools(
    applyMiddleware(logger)
    // other store enhancers if any
  ));
  
 
ReactDOM.render(
   <Provider store={store}>
    <App />
   </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(null);
