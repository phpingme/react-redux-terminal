import React from 'react';
import expect from 'expect';
import { createStore, combineReducers } from 'redux';
import TestUtils from 'react-addons-test-utils';
import Terminal from '../../index';
import { reducers as terminal } from '../../t_reducers';

describe('Terminal functionality', function () {

  const renderer = TestUtils.createRenderer();
  const store = createStore(combineReducers({ terminal }), { terminal: { prompt: { input: 'command' } } });
  renderer.render(<Terminal store={store} />);

  const output = renderer.getRenderOutput();

  it('prompt input', function () {
    expect(output.props.prompt.input).toBe('command');
  });
});
