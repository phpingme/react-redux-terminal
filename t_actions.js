export const EXECUTE_INPUT = 'EXECUTE_INPUT';
export const LOAD_OUTPUT = 'LOAD_OUTPUT';
export const RECIEVED_OUTPUT = 'RECIEVED_OUTPUT';
export const RECIEVED_ERROR = 'RECIEVED_ERROR';

export const UPDATE_INPUT = 'UPDATE_INPUT';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
export const CURSOR_TOP = 'CURSOR_TOP';

export const CURSOR_LEFT = 'CURSOR_LEFT';
export const LINE_HEIGHT = 'LINE_HEIGHT';
export const CURSOR_STATE = 'CURSOR_STATE';
export const ADJUST_POSITION = 'ADJUST_POSITION';

export const ACTIVATE_TERMINAL = 'ACTIVATE_TERMINAL';
export const DEACTIVATE_TERMINAL = 'DEACTIVATE_TERMINAL';
export const CURSOR_TO_LEFT = 'CURSOR_TO_LEFT';
export const CURSOR_TO_RIGHT = 'CURSOR_TO_RIGHT';

export const NEW_PROMPT = 'NEW_PROMPT';
export const OLD_PROMPT = 'OLD_PROMPT';
export const TO_PREV = 'TO_PREV';
export const TO_NEXT = 'TO_NEXT';
export const CUT_INPUT = 'CUT_INPUT';

export function executeInput(payload, input) {
  return {
    type: EXECUTE_INPUT,
    payload,
    input,
  };
}

export function recievedOutput(output) {
  return {
    type: RECIEVED_OUTPUT,
    output,
  };
}

export function recievedError(error) {
  return {
    type: RECIEVED_ERROR,
    error,
  };
}

export function updateInput(input) {
  return {
    type: UPDATE_INPUT,
    input,
  };
}

export function toggleActive() {
  return {
    type: TOGGLE_ACTIVE,
  };
}

export function adjustPos(index, pos) {
  return {
    type: ADJUST_POSITION,
    index,
    pos,
  };
}

export function activate() {
  return {
    type: ACTIVATE_TERMINAL,
  };
}

export function deactivate() {
  return {
    type: DEACTIVATE_TERMINAL,
  };
}

export function toLeft() {
  return {
    type: CURSOR_TO_LEFT,
  };
}

export function toRight() {
  return {
    type: CURSOR_TO_RIGHT,
  };
}

export function lineHeight(lineheight) {
  return {
    type: LINE_HEIGHT,
    lineheight,
  };
}

export function newPrompt() {
  return {
    type: NEW_PROMPT,
  };
}

export function toNext() {
  return {
    type: TO_NEXT,
  };
}

export function toPrev() {
  return {
    type: TO_PREV,
  };
}

export function oldPropmt() {
  return {
    type: OLD_PROMPT,
  };
}

export function cutInput() {
  return {
    type: CUT_INPUT,
  };
}
