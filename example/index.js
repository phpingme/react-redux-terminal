import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-redux-terminal';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from 'react-redux-terminal/t_reducers';
import { recievedOutput } from 'react-redux-terminal/t_actions';


function serverCallback(input, clientCallback) {

  let error = null;
  let output = null;
  const match = input.match(/echo/);

  if (match === null) {
    error = ["Sorry, but not '" + input + "', just try to output element of the $courses array from above"];
  } else {
    output = ["Hello World"];
  }

  clientCallback(output, error);
}

function isPromise(val) {
  console.log(val, val.then, (typeof val.then === 'function'))
  return val && typeof val.then === 'function';
}

function promiseMiddleware({ dispatch }) {
  return next => action => (isPromise(action)
        ? debug_action_then(action, dispatch)
        : debug_next(next, action));
}

function debug_action_then(action, dispatch){
  console.log('debug_action_then', action, dispatch)
  return action.then(dispatch)
}

function debug_next(next, action){
  console.log('debug_next', next, action)
  return next(action);
}

const store = createStore(reducer, {}, compose(
   applyMiddleware(promiseMiddleware),
   window.devToolsExtension ? window.devToolsExtension() : f => f
));

const serverPromiseAction = (input) => (new Promise((resolve, reject) => {
  return serverCallback(input, (output, error) => {
    if (error !== null) {
      return reject(error);
    }
    resolve(recievedOutput(output));
  });
}));


ReactDOM.render(
  (<Provider store={store}><Terminal serverPromise={serverPromiseAction} /></Provider>),
  document.getElementById('terminal')
);
