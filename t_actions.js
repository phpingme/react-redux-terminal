export const EXECUTE_INPUT = 'TERMINAL_EXECUTE_INPUT';
export const RECIEVED_OUTPUT = 'TERMINAL_RECIEVED_OUTPUT';
export const RECIEVED_ERROR = 'TERMINAL_RECIEVED_ERROR';

export const UPDATE_INPUT = 'TERMINAL_UPDATE_INPUT';
export const TOGGLE_ACTIVE = 'TERMINAL_TOGGLE_ACTIVE';
export const CURSOR_TOP = 'TERMINAL_CURSOR_TOP';

export const CURSOR_LEFT = 'TERMINAL_CURSOR_LEFT';
export const LINE_HEIGHT = 'TERMINAL_LINE_HEIGHT';
export const CURSOR_STATE = 'TERMINAL_CURSOR_STATE';
export const ADJUST_POSITION = 'TERMINAL_ADJUST_POSITION';

export const ACTIVATE_TERMINAL = 'TERMINAL_ACTIVATE_TERMINAL';
export const DEACTIVATE_TERMINAL = 'TERMINAL_DEACTIVATE_TERMINAL';
export const CURSOR_TO_LEFT = 'TERMINAL_CURSOR_TO_LEFT';
export const CURSOR_TO_RIGHT = 'TERMINAL_CURSOR_TO_RIGHT';

export const NEW_PROMPT = 'TERMINAL_NEW_PROMPT';
export const OLD_PROMPT = 'TERMINAL_OLD_PROMPT';
export const TO_PREV = 'TERMINAL_TO_PREV';
export const TO_NEXT = 'TERMINAL_TO_NEXT';
export const CUT_INPUT = 'TERMINAL_CUT_INPUT';

export function executeInput(payload, input) {
  return {
    type: EXECUTE_INPUT,
    payload,
    input,
  };
}

export function recievedOutput(output, id) {
  return {
    type: RECIEVED_OUTPUT,
    output,
    id,
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
