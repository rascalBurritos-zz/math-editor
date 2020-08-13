import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { SCRIPTS_TYPE } from '../../Functional/Node Types';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  isUpBound,
  isDownBound,
  getBoundUp,
  getBoundDown,
  isRightBound,
  getBoundRight,
  isLeftBound,
  getBoundLeft,
} from '../../Functional/BaseModel';
import Point from '../../../Abstract/Point';

export const SCRIPTS_INDEX = {
  SUPER: 'Superscript',
  SUB: 'Subscript',
};

AccessContainer.register(
  SCRIPTS_TYPE,
  (model, boxKey) => {
    return boxKey.index === SCRIPTS_INDEX.SUPER
      ? model.superscript
      : model.subscript;
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  SCRIPTS_TYPE,
  (view, boxKey, viewCollection) => {
    const id = view.childIds[boxKey.index];
    return viewCollection[id];
  },
  ACCESS_TYPE.VIEW
);

const nextItem = nextItemGenerator({ getUp, getDown, getLeft, getRight });
const nextItemOnCaretPath = nextItem;

NodeTable.register(SCRIPTS_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  insertAtBoxKey,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
});

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  const view = viewCollection[id];
  if (view.childIds[SCRIPTS_INDEX.SUPER] === undefined) {
    return { isCaret: false, index: SCRIPTS_INDEX.SUB };
  } else if (view.childIds[SCRIPTS_INDEX.SUB] === undefined) {
    return { isCaret: false, index: SCRIPTS_INDEX.SUPER };
  }
  if (point.top < view.metrics.height) {
    return { isCaret: false, index: SCRIPTS_INDEX.SUPER };
  }
  return { isCaret: false, index: SCRIPTS_INDEX.SUB };
}

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} boxKey
 * @return {Point}
 */
function getRelativePositionOfBox(viewCollection, id, boxKey) {
  if (boxKey.index === SCRIPTS_INDEX.SUPER) {
    return new Point(0, 0);
  } else {
    const top = viewCollection[id].metrics.height;
    return new Point(top, 0);
  }
}

/**
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 * @return {Array}
 */
function insertAtBoxKey(model, key, toInsert) {
  if (key.index === SCRIPTS_INDEX.SUPER) {
    model.superscript = toInsert;
  } else {
    model.subscript = toInsert;
  }
  return [key];
}

/**
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getUp(model, key) {
  if (isDownBound(key)) {
    const index = model.subscript ? SCRIPTS_INDEX.SUB : SCRIPTS_INDEX.SUPER;
    return { isCaret: false, index };
  } else if (key.index === SCRIPTS_INDEX.SUB && model.superscript) {
    return { isCaret: false, index: SCRIPTS_INDEX.SUPER };
  } else {
    return getBoundUp();
  }
}

/**
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getDown(model, key) {
  if (isUpBound(key)) {
    const index = model.superscript ? SCRIPTS_INDEX.SUPER : SCRIPTS_INDEX.SUB;
    return { isCaret: false, index };
  } else if (key.index === SCRIPTS_INDEX.SUPER && model.subscript) {
    return { isCaret: false, index: SCRIPTS_INDEX.SUB };
  } else {
    return getBoundDown();
  }
}
/**
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getLeft(model, key) {
  if (isRightBound(key)) {
    const index = model.superscript ? SCRIPTS_INDEX.SUPER : SCRIPTS_INDEX.SUB;
    return { isCaret: false, index };
  }
  return getBoundLeft();
}

/**
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getRight(model, key) {
  if (isLeftBound(key)) {
    const index = model.superscript ? SCRIPTS_INDEX.SUPER : SCRIPTS_INDEX.SUB;
    return { isCaret: false, index };
  } else {
    return getBoundRight();
  }
}
