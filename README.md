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
 import Terminal, { promiseMiddleware } from 'react-redux-terminal';
```

and provide your Server Promise implementation as a property to a ```Terminal``` component(within a redux ```Provider```)

```javascript
ReactDOM.render(
  (<Provider store={store}><Terminal serverPromise={serverPromise} /></Provider>),
  document.getElementById('terminal')
);
```

implementation of ```serverPromise``` could look like this:
```javascript
const serverPromiseAction = (input) => (new Promise((resolve, reject) =>
  // your serverCallback function, that handles the whole routine of taking to a server part
  (serverCallback(input, (output, error) => {
    if (error !== null) {
      return reject(error);
    }
    return resolve(output);
  }))));


```
