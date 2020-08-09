import {
  insertAtBoxKey,
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
} from '../Vertical List/VerticalListNode';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import Point from '../../../Abstract/Point';
import { TEXT_ENV_TYPE } from '../Node Types';

NodeTable.register(TEXT_ENV_TYPE, {
  insertAtBoxKey,
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
});

AccessContainer.register(
  TEXT_ENV_TYPE,
  (model, boxKey) => {
    const block = model.elements[boxKey.index];
    return block;
  },
  ACCESS_TYPE.BOTH
);
/**
 * @param {Object} view
 * @param {Object} boxKey
 * @return {Point}
 */
export function getRelativePositionOfBox(view, boxKey) {
  let top = 0;
  for (const [index, element] of view.elements.entries()) {
    if (index >= boxKey.index) {
      break;
    }
    top += element.componentStyle.height + element.componentStyle.marginBottom;
  }

  const left = 0;
  return new Point(top, left);
}
