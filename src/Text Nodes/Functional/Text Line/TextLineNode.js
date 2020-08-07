import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_LINE_TYPE } from './TextLineViewFactory';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { nextItemGenerator, isLeftBound, isRightBound } from '../BaseModel';
import { getDirection } from '../Text Block/TextBlockNode';
import Point from '../../../Abstract/Point';

const nextItem = nextItemGenerator(getDirection(minIndex, maxIndex));
const nextItemOnCaretPath = nextItem;

NodeTable.register(TEXT_LINE_TYPE, {
  getCaretStyle,
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  expandSelection,
});

AccessContainer.register(
  TEXT_LINE_TYPE,
  (item, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    return item.elements[index];
  },
  ACCESS_TYPE.BOTH
);

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
 * @param {Object} view
 * @return {Object}
 */
function getCaretStyle(view) {
  const cs = view.componentStyle;
  const height = cs.height;
  return { backgroundColor: 'green', height };
}

/**
 * @param {*} view
 * @param {*} boxKey
 * @return {Point}
 */
function getRelativePositionOfBox(view, boxKey) {
  const colIndex = Math.floor(boxKey.index / 2);
  if (colIndex >= view.elements.length) {
    return new Point(0, view.metrics.width);
  }
  const colLength = view.elements.slice(0, colIndex).reduce((acc, curr) => {
    return acc + curr.metrics.width;
  }, 0);
  const top = view.metrics.height - view.elements[colIndex].metrics.height;
  return new Point(top, colLength);
}

/**
 * @param {*} view
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(view, point) {
  const index = findBlock(view.elements, point);
  const isCaret = index % 2 === 0;
  return { isCaret, index };

  /**
   * @param {Object} viewArray
   * @param {*} point
   * @return {number}
   */
  function findBlock(viewArray, point) {
    let currentPoint = point;
    for (const [index, view] of viewArray.entries()) {
      const node = NodeTable.retrieve(view.type);
      const boxKey = node.getBoxKeyClosestToPoint(view, currentPoint, false);
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