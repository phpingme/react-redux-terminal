# react-redux-terminal
Browser Terminal on React+Redux base

## How to install

there is a npm package for it:

```sh
npm install --save react-redux-terminal
```

To add it to your UI take a look at [example](https://github.com/phpingme/react-redux-terminal/tree/master/example)


## Basics

In general in order to get it running you need import Terminal and it's Redux promiseMiddleware to enable a handling of client/server communication on a Promise base.

```javascript
 import Terminal from 'react-redux-terminal';
 import promiseMiddleware from 'redux-payload-promise';
```

and provide your Server Promise implementation as a property to a ```Terminal``` component(within a redux ```Provider```)

```javascript
ReactDOM.render(
  (<Provider store={store}><Terminal serverPromise={serverPromise} /></Provider>),
  document.getElementById('terminal')
);
```

you can also provide optional ```id``` and  ```height``` props. Like:
```javascript
 ...>
   <Terminal serverPromise={serverPromise} id="some-id" height={400} />
  <...
```

## Talking to Server

In order to enable output on input you type into terminal you have to provide your own server Promise implementation.
Implementation of ```serverPromise``` could look like this:
```javascript
const serverPromise = (input) => (new Promise((resolve, reject) =>
  // your serverCallback function, that handles the whole routine of taking to a server part
  (serverCallback(input, (output, error) => {
    if (error !== null) {
      return reject(error);
    }
    return resolve(output);
  }))));
```

to enable Server Promise handling by redux you have to apply ```promiseMiddleware``` imported from **react-redux-terminal**

```javascript
 import Terminal from 'react-redux-terminal';
 import promiseMiddleware from 'redux-payload-promise';
 import { createStore, compose, applyMiddleware } from 'redux';

 const store = createStore(
   reducers,
   [ 'some provided state' ],
   applyMiddleware(promiseMiddleware)
 )
```

## State shape

Default state shape of terminal is the following:

```json
{
  "state":  {
    "terminal":  {
      "history":[],
      "input_status":null,
      "prompt_history":{"ref":0,"prompts":[]},
      "prompt": {
        "input":"",
        "isActive":false,
        "cursorLeftPos":0,
        "cursorLeftStack":[0],
        "lineHeight":0
      }
    }
  }
}

```

To append it to your existing state, you have to import it and assign like this:
```javascript
import { combineReducers } from 'redux';
import { reducers as terminal } from 'react-redux-terminal/t_reducers';


const reducers = combineReducers({ reducerFoo, reducerBar, terminal });
```
