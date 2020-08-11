import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { MATH_GLYPH_TYPE } from '../../Functional/Node Types';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  isRightBound,
  getBoundRight,
  isLeftBound,
  getBoundLeft,
  isUpBound,
  getBoundDown,
  getBoundUp,
  isDownBound,
} from '../../Functional/BaseModel';
import Point from '../../../Abstract/Point';

AccessContainer.register(
  MATH_GLYPH_TYPE,
  (model, boxKey) => {
    console.log('SHOULD ACCESS GLYPH MODEL');
    const index = Math.floor(boxKey.index / 2);
    return model.content[index];
  },
  ACCESS_TYPE.MODEL
);

AccessContainer.register(
  MATH_GLYPH_TYPE,
  (view, boxKey, viewCollection) => {
    console.log('SHOULD ACCESS GLYPH VIEW');
  },
  ACCESS_TYPE.VIEW
);

const nextItem = nextItemGenerator({ getDown, getUp, getLeft, getRight });
const nextItemOnCaretPath = nextItem;

NodeTable.register(MATH_GLYPH_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  insertAtBoxKey,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
});

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} key
 * @return {Point}
 */
function getRelativePositionOfBox(viewCollection, id, key) {
  if (key.index === 0) {
    return new Point(0, 0);
  } else {
    const width = viewCollection[id].metrics.width;
    return new Point(0, width);
  }
}

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  const middle = viewCollection[id].metrics.width / 2;
  const index = point.left < middle ? 0 : 1;
  return { isCaret: true, index };
}

/**
 *
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 */
function insertAtBoxKey(model, key, toInsert) {
  console.log('inserting inside of glyph ');
}

/**
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getLeft(model, boxKey) {
  if (isRightBound(boxKey)) {
    return { isCaret: true, index: 1 };
  } else if (boxKey.index === 1) {
    return { isCaret: true, index: 0 };
  } else {
    return getBoundLeft();
  }
}
/**
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getRight(model, boxKey) {
  if (isLeftBound(boxKey)) {
    return { isCaret: true, index: 0 };
  } else if (boxKey.index === 0) {
    return { isCaret: true, index: 1 };
  } else {
    return getBoundRight();
  }
}

/**
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getUp(model, boxKey) {
  console.log('up into glyph');
  if (isDownBound(boxKey)) {
    return { isCaret: true, index: 0 };
  } else {
    return getBoundUp();
  }
}
/**
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getDown(model, boxKey) {
  console.log('down into glyph');
  if (isUpBound(boxKey)) {
    return { isCaret: true, index: 0 };
  } else {
    return getBoundDown();
  }
}
