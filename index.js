import {
  executeInput, recievedOutput, recievedError, updateInput, adjustPos,
  deactivate, activate, toLeft, toRight, lineHeight, newPrompt, toNext,
  toPrev, oldPropmt, cutInput,
} from './t_actions';
import { connect } from 'react-redux';
import Terminal from './Terminal';


export default connect(
  ({ terminal }) => ({
    prompt: terminal.prompt,
    history: terminal.history,
    input_status: terminal.input_status,
  }),
  (dispatch, { serverPromise, id, height }) => ({

    height: height === null ? 300 : height,

    onChange: (e) => {
      if (e.target.value.charCodeAt() === 10) {
        e.target.value = '';
        return;
      }
      const tmpChar = e.target.value;
      e.target.value = '';
      dispatch(updateInput(tmpChar));
    },

    onEnter: (input) =>
      dispatch(executeInput(serverPromise(input), input))
        .then(
          output => {
            dispatch(recievedOutput(output.result, id));
            return dispatch(newPrompt());
          },
          error => {
            dispatch(recievedError(error.result));
            return dispatch(newPrompt());
          }),

    toLeft: (e) => {
      dispatch(toLeft(e));
    },

    toPrev: (e) => {
      dispatch(toPrev(e));
      dispatch(oldPropmt());
    },

    toRight: (e) => {
      dispatch(toRight(e));
    },

    toNext: (e) => {
      dispatch(toNext(e));
      dispatch(oldPropmt());
    },

    adjustPos: (index, pos) => {
      dispatch(adjustPos(index, pos));
    },

    activate: () => {
      dispatch(activate());
    },

    deactivate: () => {
      dispatch(deactivate());
    },

    lineHeight: (lHeight) => {
      dispatch(lineHeight(lHeight));
    },

    toDelete: () => {
      dispatch(cutInput());
    },

  }))(Terminal);
