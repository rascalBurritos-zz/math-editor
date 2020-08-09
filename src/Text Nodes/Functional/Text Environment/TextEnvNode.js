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
import { getChildViewsFromId } from '../getChildViews';

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
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  TEXT_ENV_TYPE,
  (view, boxKey, viewCollection) => {
    const elements = getChildViewsFromId(viewCollection, view.id);
    const block = elements[boxKey.index];
    return block;
  },
  ACCESS_TYPE.VIEW
);
/**
 * @param {Object} view
 * @param {number} id
 * @param {Object} boxKey
 * @return {Point}
 */
export function getRelativePositionOfBox(view, id, boxKey) {
  let top = 0;
  const elements = getChildViewsFromId(view, id);
  for (const [index, element] of elements.entries()) {
    if (index >= boxKey.index) {
      break;
    }
    top += element.componentStyle.height + element.componentStyle.marginBottom;
  }

  const left = 0;
  return new Point(top, left);
}
