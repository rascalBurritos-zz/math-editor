import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import {
  nextItemGenerator,
  isLeftBound,
  isRightBound,
  getBoundLeft,
  getBoundRight,
} from '../BaseModel';
import { getDirection } from '../Text Block/TextBlockNode';
import Point from '../../../Abstract/Point';
import { TEXT_LINE_TYPE } from '../Node Types';
import { getChildViewsFromId } from '../getChildViews';
import { getElements } from '../Vertical List/VerticalListNode';

const nextItem = nextItemGenerator(getDirection(minIndex, maxIndex));
const nextItemOnCaretPath = nextItem;

NodeTable.register(TEXT_LINE_TYPE, {
  insertAtBoxKey,
  getCaretStyle,
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  expandSelection,
  getElements,
});

AccessContainer.register(
  TEXT_LINE_TYPE,
  (item, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    return item.elements[index];
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  TEXT_LINE_TYPE,
  (view, boxKey, viewCollection) => {
    const index = Math.floor(boxKey.index / 2);
    const elements = getChildViewsFromId(viewCollection, view.id);
    return elements[index];
  },
  ACCESS_TYPE.VIEW
);

/**
 *
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 */
function insertAtBoxKey(model, key, toInsert) {
  let index = Math.floor(key.index / 2);
  if (key.index % 2 == 0) {
    if (index - 1 >= 0) {
      index--;
      const child = model.elements[index];
      const node = NodeTable.retrieve(child.type);
      const keychain = node.insertAtBoxKey(child, getBoundRight(), toInsert);
      return [{ isCaret: false, index: 2 * index + 1 }, ...keychain];
    } else {
      const child = model.elements[0];
      const node = NodeTable.retrieve(child.type);
      const keychain = node.insertAtBoxKey(child, getBoundLeft(), toInsert);
      return [{ isCaret: false, index: 1 }, ...keychain];
    }
  } else {
    model.elements[index] = toInsert;
    return [key];
  }
}

/**
 * @param {*} view
 * @param {*} rectangles
 * @return {Array}
 */
function expandSelection(view, rectangles) {
  const cs = view.componentStyle;
  const height = cs.height + cs.marginBottom;
  for (const rect of rectangles) {
    rect.origin.top = 0;
    rect.height = height;
  }
  return rectangles;
}

/**
 * @param {Object} viewCollection
 * @param {Object} view
 * @param {Object} boxKey
 * @return {Object}
 */
function getCaretStyle(viewCollection, view, boxKey) {
  let index = Math.floor((boxKey.index - 1) / 2);
  index = index < 0 ? 0 : index;
  const elements = getChildViewsFromId(viewCollection, view.id);
  const cs = elements[index].componentStyle;
  const height = cs.height;
  return { backgroundColor: 'green', height };
}

/**
 * @param {*} view
 * @param {*} id
 * @param {*} boxKey
 * @return {Point}
 */
function getRelativePositionOfBox(view, id, boxKey) {
  const elements = getChildViewsFromId(view, id);
  const colIndex = Math.floor(boxKey.index / 2);
  const colLength = elements.slice(0, colIndex).reduce((acc, curr) => {
    return acc + curr.metrics.width;
  }, 0);
  let topIndex = Math.floor((boxKey.index - 1) / 2);
  topIndex = topIndex < 0 ? 0 : topIndex;

  const top = view[id].metrics.height - elements[topIndex].metrics.height;
  return new Point(top, colLength);
}

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  const elements = getChildViewsFromId(viewCollection, id);
  const index = findBlock(viewCollection, elements, point);
  const isCaret = index % 2 === 0;
  return { isCaret, index };

  /**
   * @param {Object} viewCollection
   * @param {Object} viewArray
   * @param {*} point
   * @return {number}
   */
  function findBlock(viewCollection, viewArray, point) {
    let currentPoint = point;
    for (const [index, view] of viewArray.entries()) {
      const node = NodeTable.retrieve(view.type);
      const boxKey = node.getBoxKeyClosestToPoint(
        viewCollection,
        view.id,
        currentPoint,
        false
      );
      currentPoint = currentPoint.subtract(new Point(0, view.metrics.width));
      if (isLeftBound(boxKey)) {
        return index * 2;
      } else if (isRightBound(boxKey)) {
        continue;
      } else {
        return index * 2 + 1;
      }
    }
    return viewArray.length * 2;
  }
}

/**
 * @return {number}
 */
function minIndex() {
  return 0;
}

/**
 *
 * @param {*} model
 * @return {Object}
 */
function maxIndex(model) {
  return 2 * model.elements.length;
}
