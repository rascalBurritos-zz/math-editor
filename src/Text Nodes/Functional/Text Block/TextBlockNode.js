import {
  nextItemGenerator,
  isBound,
  isDownBound,
  isUpBound,
  getBoundLeft,
  getBoundRight,
  getBoundUp,
  getBoundDown,
  isLeftBound,
  isRightBound,
} from '../BaseModel';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import Point from '../../../Abstract/Point';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_BLOCK_TYPE } from './textBlockViewFactory';
import { TEXT_GLYPH_TYPE } from '../Text Glyph/textGlyphViewFactory';

/** @typedef {import("./textBlockViewFactory").TextBlockView} TextBlockView */

const nextItem = nextItemGenerator(getDirection(minIndex, maxIndex));

NodeTable.register(TEXT_BLOCK_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  getCaretStyle,
});

AccessContainer.register(
  TEXT_BLOCK_TYPE,
  (model, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    return { type: TEXT_GLYPH_TYPE, character: model.content.charAt(index) };
  },
  ACCESS_TYPE.MODEL
);

AccessContainer.register(
  TEXT_BLOCK_TYPE,
  (model, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    return model.elements[index];
  },
  ACCESS_TYPE.VIEW
);

/**
 * @param {Object} model
 * @param {Object} boxKey
 * @param {String} direction
 * @return {*}
 */
export function nextItemOnCaretPath(model, boxKey, direction) {
  let done = false;
  let item = boxKey;
  while (!done) {
    item = nextItem(model, item, direction);
    done = isBound(item) || item.isCaret;
  }
  return item;
}

/**
 * @param {TextBlockView} view
 * @param {Point} point
 * @param {boolean} forceInBounds
 * @return {Object}
 *  x, y
 */
export function getBoxKeyClosestToPoint(view, point, forceInBounds) {
  let progress = 0;
  const elements = view.elements;
  for (let i = 0; i < elements.length; i++) {
    progress += elements[i].metrics.width / 2;
    if (point.left < progress) {
      return i === 0 && !forceInBounds
        ? getBoundLeft()
        : { isCaret: true, index: i * 2 };
    }
    progress += elements[i].metrics.width / 2;
  }
  return forceInBounds
    ? { isCaret: true, index: view.elements.length * 2 }
    : getBoundRight();
}

/**
 * @param {TextBlockView} view
 * @param {Object} boxKey
 * @return {Point}
 */
export function getRelativePositionOfBox(view, boxKey) {
  // all keys are caret keys
  const index = Math.floor(boxKey.index / 2);
  const exactPos = getRelativePositionWithElementIndex(view, index);
  return new Point(0, exactPos.left);
}

/**
 * @param {TextBlockView} view
 * @return {Object}
 */
export function getCaretStyle(view) {
  const height = view.metrics.height + view.metrics.depth;
  return { backgroundColor: 'black', height };
}

/**
 * @param {TextBlockView} view
 * @param {number} index
 * @return {Point}
 *
 */
export function getRelativePositionWithElementIndex(view, index) {
  const top =
    index >= view.elements.length
      ? 0
      : view.metrics.height - view.elements[index].metrics.height;
  const left = view.elements.slice(0, index).reduce((acc, curr) => {
    return acc + curr.metrics.width;
  }, 0);
  return new Point(top, left);
}

/**
 * @return {number}
 */
function minIndex() {
  return 1;
}

/**
 * @param {Object} model
 * @return {number}
 */
function maxIndex(model) {
  return model.content.length * 2 - 1;
}

/**
 * @param {Function} minIndex
 * @param {Function} maxIndex
 * @return {Object}
 */
export function getDirection(minIndex, maxIndex) {
  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getUp(model, boxKey) {
    if (isDownBound(boxKey)) {
      return finalize(model, minIndex());
    }
    return getBoundUp();
  }
  /**
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  function getDown(model, boxKey) {
    if (isUpBound(boxKey)) {
      return finalize(model, minIndex());
    }
    return getBoundDown();
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
   * @param {Object} model
   * @param {Object} boxKey
   * @return {Object}
   */
  function convertBounds(model, boxKey) {
    const newKey = {};
    if (isLeftBound(boxKey)) {
      newKey.index = minIndex() - 1;
    } else if (isRightBound(boxKey)) {
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
      const isCaret = num % 2 === 0;
      return { isCaret, index: num };
    }
  }
  return { getRight, getLeft, getUp, getDown };
}
