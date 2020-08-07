// import { NodeTable } from '../../../Interaction/Tables/nodeTable';
// import { TEXT_ENV_TYPE } from './TextEnvViewFactory';
// import {
//   AccessContainer,
//   ACCESS_TYPE,
// } from '../../../Interaction/Access/access';
// import {
//   nextItemGenerator,
//   isLeftBound,
//   isRightBound,
//   getBoundLeft,
//   isDownBound,
//   getBoundDown,
//   getBoundUp,
// } from '../BaseModel';
// import Point from '../../../Abstract/Point';
// import Rectangle from '../../../Abstract/Rectangle';
// import funcDocumentViewFactory from '../funcDocumentViewFactory';
// const nextItem = nextItemGenerator({ getUp, getLeft, getDown, getRight });

import {
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
} from '../Vertical List/VerticalListNode';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_ENV_TYPE } from './TextEnvViewFactory';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import Point from '../../../Abstract/Point';

NodeTable.register(TEXT_ENV_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  // combineRects,
});

AccessContainer.register(
  TEXT_ENV_TYPE,
  (model, boxKey) => {
    const block = model.elements[boxKey.index];
    return block;
  },
  ACCESS_TYPE.BOTH
);

// /**
//  *
//  * @param {*} view
//  * @param {*} boxKey
//  * @return {Object}
//  */
// function getCaretStyle(view, boxKey) {
//   const elements = view.lines[boxKey.rowIndex].elements;
//   let colIndex = Math.floor(boxKey.colIndex / 2);
//   colIndex = colIndex < elements.length ? colIndex : elements.length - 1;
//   const m = elements[colIndex].metrics;
//   const height = m.height + m.depth;
//   return { backgroundColor: 'blue', height };
// }

// /**
//  *
//  * @param {Array} rectArray
//  * @return {Rectangle[]}
//  */
// function combineRects(rectArray) {
//   const topMost = Math.min(...rectArray.map((rect) => rect.origin.top));
//   const bottomMost = Math.max(
//     ...rectArray.map((rect) => rect.origin.top + rect.height)
//   );
//   const leftMost = Math.min(...rectArray.map((rect) => rect.origin.left));
//   const rightMost = Math.max(
//     ...rectArray.map((rect) => rect.origin.left + rect.width)
//   );
//   const height = bottomMost - topMost;
//   const width = rightMost - leftMost;
//   return [new Rectangle(new Point(topMost, leftMost), height, width)];
// }

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

// /**
//  * @param {*} view
//  * @param {*} rowIndex
//  * @return {number}
//  */
// function getRowDepth(view, rowIndex) {
//   return view.lines.slice(0, rowIndex).reduce((acc, curr) => {
//     const m = curr.metrics;
//     return acc + m.height + m.depth + curr.componentStyle.marginBottom;
//   }, 0);
// }
// AccessContainer.register(
//   TEXT_ENV_TYPE,
//   (model, boxKey) => {
//     const rowIndex = boxKey.rowIndex;
//     const colIndex = Math.floor(boxKey.colIndex / 2);
//     const line = model.lines[rowIndex].elements[colIndex];
//     return line;
//   },
//   ACCESS_TYPE.VIEW
// );

// /**
//  * @param {Object} view
//  * @param {Point} point
//  *
//  * @return {Object}
//  */
// function getBoxKeyClosestToPoint(view, point) {
//   const rowIndex = findRow(view, point);
//   const rowDepth = getRowDepth(view, rowIndex);
//   const newPoint = point.add(new Point(rowDepth, 0));
//   const colIndex = findCol(view.lines[rowIndex], newPoint);
//   const isCaret = colIndex % 2 === 0;
//   return { isCaret, rowIndex, colIndex };

//   /**
//    * @param {Object} line
//    * @param {*} point
//    * @return {number}
//    */
//   function findCol(line, point) {
//     let currentPoint = point;
//     for (let i = 0; i < line.elements.length; i++) {
//       const node = NodeTable.retrieve(line.elements[i].type);
//       const boxKey = node.getBoxKeyClosestToPoint(
//         line.elements[i],
//         currentPoint
//       );
//       currentPoint = currentPoint.subtract(
//         new Point(0, line.elements[i].metrics.width)
//       );
//       if (isLeftBound(boxKey)) {
//         return i * 2;
//       } else if (isRightBound(boxKey)) {
//         continue;
//       } else {
//         return i * 2 + 1;
//       }
//     }
//     return line.elements.length * 2;
//   }

//   /**
//    * @param {*} view
//    * @param {*} point
//    * @return {number}
//    */
//   function findRow(view, point) {
//     let progress = 0;
//     const lines = view.lines;
//     for (let i = 0; i < lines.length; i++) {
//       progress +=
//         lines[i].componentStyle.marginBottom + lines[i].componentStyle.height;
//       if (point.top < progress) {
//         return i;
//       }
//     }
//     return view.lines.length - 1;
//   }
// }

// /**
//  * @param {Object} model
//  * @param {Object} boxKey
//  * @param {String} direction
//  * @return {Object}
//  */
// function nextItemOnCaretPath(model, boxKey, direction) {
//   return nextItem(model, boxKey, direction);
// }

// /**
//  *
//  * @param {*} model
//  * @param {*} boxKey
//  * @return {Object}
//  */
// function getLeft(model, boxKey) {
//   if (isRightBound(boxKey)) {
//     const maxRowIndex = getMaxRowIndex(model);
//     return wrapCaret(
//       true,
//       maxRowIndex,
//       getMaxColIndex(model, { rowIndex: maxRowIndex })
//     );
//   }
//   if (boxKey.colIndex === 0 && boxKey.rowIndex === 0) {
//     return getBoundLeft();
//   }
//   if (boxKey.colIndex === 0) {
//     const newRowIndex = boxKey.rowIndex - 1;
//     return wrapCaret(true, newRowIndex, model.lines[newRowIndex].length * 2);
//   }
//   return wrapCaret(!boxKey.isCaret, boxKey.rowIndex, boxKey.colIndex - 1);
// }

// /**
//  *
//  * @param {*} model
//  * @return {number};
//  */
// function getMaxRowIndex(model) {
//   const maxRowIndex = model.lines.length - 1;
//   return maxRowIndex;
// }

// /**
//  *
//  * @param {*} model
//  * @param {*} boxKey
//  * @return {number};
//  */
// function getMaxColIndex(model, boxKey) {
//   const maxColIndex = 2 * model.lines[boxKey.rowIndex].length;
//   return maxColIndex;
// }
// /**
//  * @param {*} model
//  * @param {*} boxKey
//  * @return {Object}
//  */
// function getRight(model, boxKey) {
//   if (isLeftBound(boxKey)) {
//     return wrapCaret(true, 0, 0);
//   }
//   const maxRowIndex = getMaxRowIndex(model);
//   const maxColIndex = getMaxColIndex(model, boxKey);
//   if (boxKey.colIndex === maxColIndex && boxKey.rowIndex === maxRowIndex) {
//     return getBoundLeft();
//   }
//   if (boxKey.colIndex === maxColIndex) {
//     const newRowIndex = boxKey.rowIndex + 1;
//     return wrapCaret(true, newRowIndex, 0);
//   }
//   return wrapCaret(!boxKey.isCaret, boxKey.rowIndex, boxKey.colIndex + 1);
// }
// /**
//  *
//  * @param {*} model
//  * @param {*} boxKey
//  * @return {Object}
//  */
// function getUp(model, boxKey) {
//   if (isDownBound(boxKey)) {
//     return wrapCaret(true, getMaxRowIndex(model), 0);
//   }
//   if (boxKey.rowIndex === 0) {
//     return getBoundUp();
//   }

//   return wrapCaret(!boxKey.isCaret, boxKey.rowIndex, boxKey.colIndex + 1);
// }
// function getDown(model, boxKey) {}

// /**
//  *
//  * @param {*} model
//  * @param {*} rowIndex
//  * @param {*} point
//  */
// function closestBoxKeyToPointInRow(model, rowIndex, point) {
//   const rowView = funcDocumentViewFactory(model.lines[rowIndex]);
//   rowView.closestBoxKeyToPoint(point);
// }

// /**
//  *
//  * @param {*} isCaret
//  * @param {*} rowIndex
//  * @param {*} colIndex
//  * @return {Object}
//  */
// function wrapCaret(isCaret, rowIndex, colIndex) {
//   return { isCaret, rowIndex, colIndex };
// }
