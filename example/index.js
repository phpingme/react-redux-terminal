import React from 'react';
import ReactDOM from 'react-dom'

import TerminalFactory from 'TerminalFactory'
import {store} from './t_store'
import {Provider} from 'react-redux'


const TerminalProvider = (<Provider store={store}>
    <span>
      <TerminalFactory mode="terminal"/>

    </span>
  </Provider>)

ReactDOM.render(TerminalProvider, document.getElementById("course"))
