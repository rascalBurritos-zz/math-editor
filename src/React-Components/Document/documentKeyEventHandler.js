import { DIRECTION } from '../../../Experiment 2/caretTraverser';
import singleMove from './singleMove';
import singleSelectionMove from './singleSelectionMove';
import backspace from '../backspace';
/**
 * @param {*} event
 * @param {*} prevState
 * @return {Object} new State
 */
export default function documentKeyEventHandler(event, prevState) {
  let keyMap;
  if (event.shiftKey) {
    keyMap = {
      ArrowUp: { f: singleSelectionMove, args: [prevState, DIRECTION.UP] },
      ArrowDown: { f: singleSelectionMove, args: [prevState, DIRECTION.DOWN] },
      ArrowLeft: { f: singleSelectionMove, args: [prevState, DIRECTION.LEFT] },
      ArrowRight: {
        f: singleSelectionMove,
        args: [prevState, DIRECTION.RIGHT],
      },
      // Backspace: { f: testDelete },
    };
  } else {
    keyMap = {
      ArrowUp: { f: singleMove, args: [prevState, DIRECTION.UP] },
      ArrowDown: { f: singleMove, args: [prevState, DIRECTION.DOWN] },
      ArrowLeft: { f: singleMove, args: [prevState, DIRECTION.LEFT] },
      ArrowRight: { f: singleMove, args: [prevState, DIRECTION.RIGHT] },
      Backspace: { f: backspace, args: [prevState] },
    };
  }
  const assignee = keyMap[event.code];
  if (assignee) {
    return assignee.f(...assignee.args);
  }
}
