import {
  getBoundLeft,
  getBoundRight,
  isRightBound,
  isLeftBound,
  isUpBound,
  isDownBound,
  nextItemGenerator,
} from '../BaseModel';
import Point from '../../../Abstract/Point';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import { VERTICAL_LIST_TYPE } from '../Node Types';
import { getChildViewsFromId } from '../getChildViews';
/** @typedef {import('./VerticalListViewFactory').VerticalListView} VerticalListView  */

AccessContainer.register(
  VERTICAL_LIST_TYPE,
  (model, boxKey) => {
    return model.elements[boxKey.index];
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  VERTICAL_LIST_TYPE,
  (view, boxKey, viewCollection) => {
    const elements = getChildViewsFromId(viewCollection, view.id);
    return elements[boxKey.index];
  },
  ACCESS_TYPE.VIEW
);
export const nextItem = nextItemGenerator(getDirection());
NodeTable.register(VERTICAL_LIST_TYPE, {
  insertAtBoxKey,
  nextItem,
  nextItemOnCaretPath,
  getRelativePositionOfBox,
  getBoxKeyClosestToPoint,
});

/**
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 */
export function insertAtBoxKey(model, key, toInsert) {
  model.elements[key.index] = toInsert;
}

/**
 * @param {Object} model
 * @param {Object} boxKey
 * @param {String} direction
 * @return {*}
 */
export function nextItemOnCaretPath(model, boxKey, direction) {
  return nextItem(model, boxKey, direction);
}
/**
 * @param {Object} view
 * @param {number} id
 * @param {Object} boxKey
 * @return {Object}
 */
export function getRelativePositionOfBox(view, id, boxKey) {
  return getRelativePositionWithElementIndex(view, id, boxKey.index, true);
}
/**
 * @param {Object} viewCollection
 * @param {number} id
 * @param {Object} point
 * @return {Object}
 *  x, y
 */
export function getBoxKeyClosestToPoint(viewCollection, id, point) {
  let progress = 0;
  const elements = getChildViewsFromId(viewCollection, id);
  for (const [index, element] of elements.entries()) {
    const cs = element.componentStyle;
    progress += cs.height + cs.marginBottom;
    if (point.top < progress) {
      return boxWrap(index);
    }
  }
  return boxWrap(elements.length - 1);

  /**
   * @param {number} num
   * @return {Object}
   */
  function boxWrap(num) {
    return { isCaret: false, index: num };
  }
}

/**
 * @param {VerticalListView} view
 * @param {number} id
 * @param {number} index
 * @param {boolean} toLeft
 * @return {Object}
 */
function getRelativePositionWithElementIndex(view, id, index, toLeft) {
  const elements = getChildViewsFromId(view, id);
  const elementWidth = elements[index].metrics.width;
  const totalWidth = view[id].metrics.width;
  const leftMargin = (totalWidth - elementWidth) / 2;
  const left = toLeft ? leftMargin : leftMargin + elementWidth;
  const elementHeights = elements.slice(0, index).reduce((acc, curr) => {
    return acc + curr.metrics.height + curr.metrics.depth;
  }, 0);
  const bottomMargins = elements.slice(0, index).reduce((acc, curr) => {
    return acc + curr.componentStyle.marginBottom;
  }, 0);
  const top = elementHeights + bottomMargins;
  return new Point(top, left);
}

/**
 * @return {Object}
 */
function getDirection() {
  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getUp(model, boxKey) {
    return getLeft(model, boxKey);
  }

  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getDown(model, boxKey) {
    return getRight(model, boxKey);
  }

  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getRight(model, boxKey) {
    const safeKey = convertBounds(model, boxKey);
    const index = safeKey.index + 1;
    return finalize(model, index);
  }
  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getLeft(model, boxKey) {
    const safeKey = convertBounds(model, boxKey);
    const index = safeKey.index - 1;
    return finalize(model, index);
  }

  /**
   * @return {number}
   */
  function minIndex() {
    return 0;
  }

  /**
   * @param {Object} model
   * @return {number}
   */
  function maxIndex(model) {
    return model.elements.length - 1;
  }
  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object}
   */
  function convertBounds(model, boxKey) {
    const newKey = {};
    if (isLeftBound(boxKey) || isUpBound(boxKey)) {
      newKey.index = minIndex() - 1;
    } else if (isRightBound(boxKey) || isDownBound(boxKey)) {
      newKey.index = maxIndex(model) + 1;
    } else {
      newKey.index = boxKey.index;
    }
    return newKey;
  }

  /**
   * @param {Object} model
   * @param {number} num
   * @return {Object}
   */
  function finalize(model, num) {
    if (num < minIndex()) {
      return getBoundLeft();
    } else if (num > maxIndex(model)) {
      return getBoundRight();
    } else {
      return { isCaret: false, index: num };
    }
  }
  return { getUp, getDown, getLeft, getRight };
}
