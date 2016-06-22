import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-redux-terminal';
import promiseMiddleware from 'redux-payload-promise';
import { Provider } from 'react-redux';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducers as terminal } from 'react-redux-terminal/t_reducers';


function serverCallback(input, clientCallback) {
  let error = null;
  let output = null;
  const match = input.match(/echo "Hello World!"/);

  if (match === null) {
    error = ["Sorry, but not '" + input + "', just try to type what you see above"];
  } else {
    output = ['Hello World!'];
  }

  clientCallback(output, error);
}


const store = createStore(combineReducers({ terminal }), {}, compose(
   applyMiddleware(promiseMiddleware),
   window.devToolsExtension ? window.devToolsExtension() : f => f
));


const serverPromise = (input) => (new Promise((resolve, reject) =>
  (serverCallback(input, (output, error) => {
    if (error !== null) {
      return reject(error);
    }
    return resolve(output);
  }))));


ReactDOM.render(
  (<Provider store={store}><Terminal serverPromise={serverPromise} /></Provider>),
  document.getElementById('terminal')
);
