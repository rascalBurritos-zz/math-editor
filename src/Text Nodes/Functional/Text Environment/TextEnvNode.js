import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_ENV_TYPE } from './TextEnvViewFactory';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { nextItemGenerator } from '../BaseModel';
import { getDirection } from '../Text Block/TextBlockNode';
import Point from '../../../Abstract/Point';
import Rectangle from '../../../Abstract/Rectangle';

const nextItem = nextItemGenerator(getDirection(minIndex, maxIndex));

NodeTable.register(TEXT_ENV_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  combineRects,
});

/**
 *
 * @param {Array} rectArray
 * @return {Rectangle[]}
 */
function combineRects(rectArray) {
  const topMost = Math.min(...rectArray.map((rect) => rect.origin.top));
  const bottomMost = Math.max(
    ...rectArray.map((rect) => rect.origin.top + rect.height)
  );
  const leftMost = Math.min(...rectArray.map((rect) => rect.origin.left));
  const rightMost = Math.max(
    ...rectArray.map((rect) => rect.origin.left + rect.width)
  );
  const height = bottomMost - topMost;
  const width = rightMost - leftMost;
  return [new Rectangle(new Point(topMost, leftMost), height, width)];
}

/**
 * @param {Object} view
 * @param {Object} boxKey
 * @return {Point}
 */
export function getRelativePositionOfBox(view, boxKey) {
  // all keys are caret keys
  const index = Math.floor(boxKey.index / 2);
  const left = view.elements.slice(0, index).reduce((acc, curr) => {
    return acc + curr.metrics.width;
  }, 0);
  return new Point(0, left);
}

AccessContainer.register(
  TEXT_ENV_TYPE,
  (model, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    return model.elements[index];
  },
  ACCESS_TYPE.BOTH
);

/**
 * @param {Object} view
 * @param {Point} point
 *
 * @return {Object}
 */
function getBoxKeyClosestToPoint(view, point) {
  let progress = 0;
  const elements = view.elements;
  for (let i = 0; i < elements.length; i++) {
    progress += elements[i].metrics.width / 2;
    if (point.left < progress) {
      return { isCaret: true, index: i * 2 };
    }
    progress += elements[i].metrics.width / 2;
  }
  return { isCaret: true, index: elements.length * 2 };
}

/**
 * @param {Object} model
 * @param {Object} boxKey
 * @param {String} direction
 * @return {Object}
 */
function nextItemOnCaretPath(model, boxKey, direction) {
  return nextItem(model, boxKey, direction);
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
  return 2 * model.elements.length;
}
