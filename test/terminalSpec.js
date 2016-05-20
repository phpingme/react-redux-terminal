import React from 'react';
import expect from 'expect';
import Terminal from '../index';
import { createStore } from 'redux';
import TestUtils from 'react-addons-test-utils';
import { reducer } from '../t_reducers';

describe('Terminal functionality', function () {

  const renderer = TestUtils.createRenderer();
  const store = createStore(reducer, { prompt: { input: 'command' } });
  renderer.render(<Terminal store={store} />);

  const output = renderer.getRenderOutput();

  it('prompt input', function () {
    expect(output.props.prompt.input).toBe('command');
  });
});
