import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { RADICAL_TYPE } from '../../Functional/Node Types';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  isRightBound,
  getBoundLeft,
  isLeftBound,
  getBoundRight,
  isUpBound,
  isDownBound,
  getBoundUp,
  getBoundDown,
} from '../../Functional/BaseModel';
import Point from '../../../Abstract/Point';

export const RADICAL_INDEX = { DEGREE: 'Degree', RADICAND: 'Radicand' };

AccessContainer.register(
  RADICAL_TYPE,
  (model, key) => {
    return key.index === RADICAL_INDEX.RADICAND ? model.radicand : model.degree;
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  RADICAL_TYPE,
  (view, key, viewCollection) => {
    const c = view.childIds;
    const id = key.index === RADICAL_INDEX.RADICAND ? c.radicand : c.degree;
    return viewCollection[id];
  },
  ACCESS_TYPE.VIEW
);

const nextItem = nextItemGenerator({ getRight, getUp, getDown, getLeft });
const nextItemOnCaretPath = nextItem;

NodeTable.register(RADICAL_TYPE, {
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
  const degreeId = view.childIds.degree;
  if (!degreeId) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  }
  const degreeView = viewCollection[degreeId];
  if (point.left > degreeView.metrics.width) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  }
  return wrapCaret(RADICAL_INDEX.DEGREE);
}

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} key
 * @return {Point}
 */
function getRelativePositionOfBox(viewCollection, id, key) {
  if (key.index === RADICAL_INDEX.DEGREE) {
    const degreeId = viewCollection[id].childIds.degree;
    const cs = viewCollection[degreeId].componentStyle;
    const top = cs.marginTop;
    const left = cs.marginLeft;
    return new Point(top, left);
  }
  const metrics = viewCollection[id].metrics;
  const radicandID = viewCollection[id].childIds.radicand;
  const radicandCS = viewCollection[radicandID].componentStyle;
  const top = radicandCS.marginTop;
  const left = metrics.width - radicandCS.width;
  return new Point(top, left);
}

/**
 *
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 * @return {Array} insert keychain
 */
function insertAtBoxKey(model, key, toInsert) {
  if (key.index === RADICAL_INDEX.RADICAND) {
    model.radicand = toInsert;
  } else {
    model.degree = toInsert;
  }
  return [key];
}

/**
 *
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getLeft(model, key) {
  if (isRightBound(key)) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  } else if (key.index === RADICAL_INDEX.RADICAND && model.degree) {
    return wrapCaret(RADICAL_INDEX.DEGREE);
  } else {
    return getBoundLeft();
  }
}
/**
 *
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getRight(model, key) {
  if (isLeftBound(key)) {
    return model.degree
      ? wrapCaret(RADICAL_INDEX.DEGREE)
      : wrapCaret(RADICAL_INDEX.RADICAND);
  } else if (key.index === RADICAL_INDEX.DEGREE) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  } else {
    return getBoundRight();
  }
}
/**
 *
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getUp(model, key) {
  if (isDownBound(key)) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  } else {
    return getBoundUp();
  }
}
/**
 *
 * @param {*} model
 * @param {*} key
 * @return {Object}
 */
function getDown(model, key) {
  if (isUpBound(key)) {
    return wrapCaret(RADICAL_INDEX.RADICAND);
  } else {
    return getBoundDown();
  }
}

/**
 * @param {*} index
 * @return {Object}
 */
function wrapCaret(index) {
  return { isCaret: false, index };
}
