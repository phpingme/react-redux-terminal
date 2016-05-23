import {
  EXECUTE_INPUT, RECIEVED_OUTPUT, RECIEVED_ERROR, UPDATE_INPUT, LINE_HEIGHT,
  ADJUST_POSITION, DEACTIVATE_TERMINAL, ACTIVATE_TERMINAL, CURSOR_TO_LEFT, CURSOR_TO_RIGHT,
  NEW_PROMPT, TO_PREV, TO_NEXT, OLD_PROMPT, CUT_INPUT,
} from './t_actions';


const historyReducers = function (state = [], action) {
  switch (action.type) {
    case EXECUTE_INPUT:
      return [...state, { type: EXECUTE_INPUT.toLowerCase(), value: action.input }];
    case RECIEVED_OUTPUT:
      return state.concat(action.output.map(
        str => ({ type: RECIEVED_OUTPUT.toLowerCase(), value: str })
      ));
    case RECIEVED_ERROR:
      return state.concat(action.error.map(
        str => ({ type: RECIEVED_ERROR.toLowerCase(), value: str })
      ));
    default:
      return state;
  }
};

const inputStatusReducers = function (state = null, action) {
  switch (action.type) {
    case EXECUTE_INPUT:
    case RECIEVED_OUTPUT:
    case RECIEVED_ERROR:
      return action.type;
    default:
      return state;
  }
};


const getPromptHistory = (prompts = []) => ({
  ref: prompts.length,
  prompts,
});

const propmtHistoryReducers = function (state = getPromptHistory(), action, currentPrompt) {
  switch (action.type) {
    case EXECUTE_INPUT:
      return getPromptHistory([...state.prompts, currentPrompt]);
    case TO_PREV:
      return Object.assign({}, state,
        { ref: (state.ref > 0) ? (state.ref - 1) : 0 });
    case TO_NEXT:
      return Object.assign({}, state,
        { ref: (state.ref < state.prompts.length - 1) ? state.ref + 1 : state.ref });
    default:
      return state;
  }
};

const defaultPromptState = {
  input: '',
  isActive: false,
  cursorLeftPos: 0,
  cursorLeftStack: [0],
  lineHeight: 0,
};

const cutInput = ({ cursorLeftPos, input }) =>
 input.substring(0, cursorLeftPos - 1) + input.substring(cursorLeftPos, input.length);

const injectInput = ({ cursorLeftPos, input }, action) =>
  input.substring(0, cursorLeftPos) + action.input + input.substring(cursorLeftPos, input.length);


const promptReducers = function (state = defaultPromptState, action, inputsHistory) {
  switch (action.type) {
    case ADJUST_POSITION:
      if (typeof(state.cursorLeftStack[action.index]) !== 'number') {
        const stack = state.cursorLeftStack;
        stack[action.index] = action.pos;
        return Object.assign({}, state, { cursorLeftStack: stack });
      }
      return state;
    case DEACTIVATE_TERMINAL:
      return Object.assign({}, state, { isActive: false });
    case ACTIVATE_TERMINAL:
      return Object.assign({}, state, { isActive: true });
    case UPDATE_INPUT:
      return Object.assign({}, state,
        { input: injectInput(state, action), cursorLeftPos: state.cursorLeftPos + 1 });
    case CURSOR_TO_LEFT:
      return Object.assign({}, state, { cursorLeftPos: state.cursorLeftPos - 1 });
    case CURSOR_TO_RIGHT:
      return Object.assign({}, state, { cursorLeftPos: state.cursorLeftPos + 1 });
    case LINE_HEIGHT:
      return Object.assign({}, state, { lineHeight: action.lineheight });
    case NEW_PROMPT:
      return Object.assign({}, state, { input: '', cursorLeftPos: 0 });
    case OLD_PROMPT:
      return inputsHistory.prompts[inputsHistory.ref] || state;
    case CUT_INPUT:
      if (state.cursorLeftPos === 0) {
        return state;
      }
      return Object.assign({}, state,
        { input: cutInput(state), cursorLeftPos: state.cursorLeftPos - 1 });
    default:
      return state;
  }
};


export const reducers = (state = {}, action) => ({
  history: historyReducers(state.history, action),
  input_status: inputStatusReducers(state.input_status, action),
  prompt_history: propmtHistoryReducers(state.prompt_history, action, state.prompt),
  prompt: promptReducers(state.prompt, action, state.prompt_history),
});

export default function (state = {}, action) {
  return {
    terminal: reducers(state.terminal, action),
  };
}
