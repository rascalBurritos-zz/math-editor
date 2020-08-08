import singleMove from '../Movement/singleMove';
import singleSelectionMove from '../Movement/singleSelectionMove';
import backspace from '../Removal/backspace';
import insertCharacter from '../Insertion/insertCharacter';
import { DIRECTION } from '../Tables/direction';
import produce from 'immer';
/**
 * @param {*} event
 * @param {*} prevState
 * @return {Object} new State
 */
export default function documentKeyEventHandler(event, prevState) {
  let assignee;
  if (/^.$/.test(event.key) || event.code === 'Space') {
    assignee = { f: insertCharacter, args: [event.key] };
  } else if (event.shiftKey) {
    const keyMap = {
      ArrowUp: { f: singleSelectionMove, args: [DIRECTION.UP] },
      ArrowDown: { f: singleSelectionMove, args: [DIRECTION.DOWN] },
      ArrowLeft: { f: singleSelectionMove, args: [DIRECTION.LEFT] },
      ArrowRight: {
        f: singleSelectionMove,
        args: [DIRECTION.RIGHT],
      },
      // Backspace: { f: testDelete },
    };
    assignee = keyMap[event.code];
  } else {
    const keyMap = {
      ArrowUp: { f: singleMove, args: [DIRECTION.UP] },
      ArrowDown: { f: singleMove, args: [DIRECTION.DOWN] },
      ArrowLeft: { f: singleMove, args: [DIRECTION.LEFT] },
      ArrowRight: { f: singleMove, args: [DIRECTION.RIGHT] },
      Backspace: { f: backspace, args: [] },
    };
    assignee = keyMap[event.code];
  }
  if (assignee) {
    const x = produce(prevState, (draftState) => {
      assignee.f(draftState, ...assignee.args);
    });
    return x;
  }
}
