import React from 'react';
import ReactDOM from 'react-dom';
import Terminal, { promiseMiddleware } from 'react-redux-terminal';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { reducers as terminal} from 'react-redux-terminal/t_reducers';
import { recievedOutput } from 'react-redux-terminal/t_actions';


function serverCallback(input, clientCallback) {

  let error = null;
  let output = null;
  const match = input.match(/echo "Hello World!"/);

  if (match === null) {
    error = ["Sorry, but not '" + input + "', just try to output element of the $courses array from above"];
  } else {
    output = ['Hello World!'];
  }

  clientCallback(output, error);
}


const store = createStore({ terminal }, {}, compose(
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
