import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-redux-terminal/TerminalFactory';
import { store } from './t_store';
import { Provider } from 'react-redux';


const TerminalProvider = (<Provider store={store}><Terminal /></Provider>);
ReactDOM.render(TerminalProvider, document.getElementById('terminal'));
