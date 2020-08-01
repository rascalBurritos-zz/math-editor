import singleMove from './singleMove';
import singleSelectionMove from './singleSelectionMove';
import backspace from '../backspace';
import insertCharacter from './insertCharacter';
/**
 * @param {*} event
 * @param {*} prevState
 * @return {Object} new State
 */
export default function documentKeyEventHandler(event, prevState) {
  let assignee;
  if (/^.$/.test(event.key) || event.code === 'Space') {
    assignee = { f: insertCharacter, args: [prevState, event.key] };
  } else if (event.shiftKey) {
    const keyMap = {
      ArrowUp: { f: singleSelectionMove, args: [prevState, DIRECTION.UP] },
      ArrowDown: { f: singleSelectionMove, args: [prevState, DIRECTION.DOWN] },
      ArrowLeft: { f: singleSelectionMove, args: [prevState, DIRECTION.LEFT] },
      ArrowRight: {
        f: singleSelectionMove,
        args: [prevState, DIRECTION.RIGHT],
      },
      // Backspace: { f: testDelete },
    };
    assignee = keyMap[event.code];
  } else {
    const keyMap = {
      ArrowUp: { f: singleMove, args: [prevState, DIRECTION.UP] },
      ArrowDown: { f: singleMove, args: [prevState, DIRECTION.DOWN] },
      ArrowLeft: { f: singleMove, args: [prevState, DIRECTION.LEFT] },
      ArrowRight: { f: singleMove, args: [prevState, DIRECTION.RIGHT] },
      Backspace: { f: backspace, args: [prevState] },
    };
    assignee = keyMap[event.code];
  }
  if (assignee) {
    return assignee.f(...assignee.args);
  }
}
