import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-redux-terminal';
import { store } from './t_store';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { reducer } from 'react-redux-terminal/t_reducers';

const store = createStore(reducer, {}, compose(
   window.devToolsExtension ? window.devToolsExtension() : f => f
));

function serverCallback(input, clientCallback) {

  let error = null;
  let output = null;
  let match = input.match(/echo\s+Hello Terminal/)

    if (match===null) {
      error = "Sorry, but not '"+input+"', just try to output element of the $courses array from above";
    }else{
      output = "Hola! you";
    }

    clientCallback([output], [error]);
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function promiseMiddleware({ dispatch }) {
  return next => action => (isPromise(action)
        ? action.then(dispatch)
        : next(action));
}

const store = createStore(reducer, {}, compose(
   applyMiddleware(promiseMiddleware),
   window.devToolsExtension ? window.devToolsExtension() : f => f
));

const serverPromiseAction = (input) => {
  return new Promise((resolve, reject) => {
    serverCallback(input, (output, error) => {
      if(error){
        return reject(error)
      }
      return resolve(input)
    })
  })
}

const TerminalProvider = (<Provider store={store}><Terminal /></Provider>);
ReactDOM.render(TerminalProvider, document.getElementById('terminal'));
