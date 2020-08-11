import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  getBoundLeft,
  isRightBound,
  getBoundRight,
  isLeftBound,
  isBound,
  isUpBound,
  getBoundDown,
  isDownBound,
  getBoundUp,
} from '../../Functional/BaseModel';
import { DISPLAY_ENV_TYPE } from '../../Functional/Node Types';
import Point from '../../../Abstract/Point';
import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';

const nextItem = nextItemGenerator({ getLeft, getRight, getDown, getUp });
const nextItemOnCaretPath = nextItem;
NodeTable.register(DISPLAY_ENV_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  insertAtBoxKey,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
});

AccessContainer.register(
  DISPLAY_ENV_TYPE,
  (model, boxKey) => {
    return model.rootFormula;
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  DISPLAY_ENV_TYPE,
  (view, boxKey, viewCollection) => {
    return viewCollection[view.childIds[0]];
  },
  ACCESS_TYPE.VIEW
);

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} boxKey
 * @return {Point}
 */
function getRelativePositionOfBox(viewCollection, id, boxKey) {
  return new Point(0, 0);
}

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  return { isCaret: false, index: 0 };
}

/**
 *
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 */
function insertAtBoxKey(model, key, toInsert) {
  if (isBound(key)) {
    console.log('only 1 place to isnert');
  } else {
    model.rootFormula = toInsert;
  }
}

/**
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getLeft(model, boxKey) {
  if (isRightBound(boxKey)) {
    return { isCaret: false, index: 0 };
  } else {
    return getBoundRight();
  }
}

/**
 *
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getRight(model, boxKey) {
  if (isLeftBound(boxKey)) {
    return { isCaret: false, index: 0 };
  } else {
    return getBoundLeft();
  }
}

/**
 *
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getDown(model, boxKey) {
  if (isUpBound(boxKey)) {
    return { isCaret: false, index: 0 };
  } else {
    return getBoundDown();
  }
}

/**
 *
 * @param {*} model
 * @param {*} boxKey
 * @return {Object}
 */
function getUp(model, boxKey) {
  if (isDownBound(boxKey)) {
    return { isCaret: false, index: 0 };
  } else {
    return getBoundUp();
  }
}
