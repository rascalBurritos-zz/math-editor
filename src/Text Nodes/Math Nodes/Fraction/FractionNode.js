import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { FRACTION_TYPE } from '../../Functional/Node Types';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  isLeftBound,
  isRightBound,
  getBoundLeft,
  getBoundUp,
  getBoundDown,
  getBoundRight,
  isDownBound,
  isUpBound,
} from '../../Functional/BaseModel';
import Point from '../../../Abstract/Point';

export const FRAC_INDEX = {
  NUM: 'num',
  DENOM: 'denom',
};

AccessContainer.register(
  FRACTION_TYPE,
  (model, boxKey) => {
    return boxKey.index === FRAC_INDEX.NUM
      ? model.numerator
      : model.denominator;
  },
  ACCESS_TYPE.MODEL
);

AccessContainer.register(
  FRACTION_TYPE,
  (view, boxKey, viewCollection) => {
    const childIds = view.childIds;
    const id = boxKey.index === FRAC_INDEX.NUM ? childIds.num : childIds.denom;
    return viewCollection[id];
  },
  ACCESS_TYPE.VIEW
);

const nextItem = nextItemGenerator({ getRight, getLeft, getDown, getUp });
const nextItemOnCaretPath = nextItem;

NodeTable.register(FRACTION_TYPE, {
  nextItemOnCaretPath,
  nextItem,
  insertAtBoxKey,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
});

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} boxKey
 * @return {Point}
 */
function getRelativePositionOfBox(viewCollection, id, boxKey) {
  const numId = viewCollection[id].childIds.num;
  const numCS = viewCollection[numId].componentStyle;
  if (boxKey.index === FRAC_INDEX.NUM) {
    const left = numCS.marginLeft;
    return new Point(0, left);
  } else {
    const view = viewCollection[id];
    const denomId = viewCollection[id].childIds.denom;
    const denomCS = viewCollection[denomId].componentStyle;
    const top =
      numCS.height +
      numCS.marginBottom +
      view.ruleStyle.height +
      denomCS.marginTop;
    const left = denomCS.marginLeft;
    return new Point(top, left);
  }
}
/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  const numId = viewCollection[id].childIds.num;
  const numCS = viewCollection[numId].componentStyle;
  if (point.top < numCS.height + numCS.marginBottom) {
    return { isCaret: false, index: FRAC_INDEX.NUM };
  } else {
    return { isCaret: false, index: FRAC_INDEX.DENOM };
  }
}

/**
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 */
function insertAtBoxKey(model, key, toInsert) {
  if (key.index === FRAC_INDEX.NUM) {
    model.numerator = toInsert;
  } else {
    model.denominator = toInsert;
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
    return { isCaret: false, index: FRAC_INDEX.NUM };
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
function getLeft(model, key) {
  if (isRightBound(key)) {
    return { isCaret: false, index: FRAC_INDEX.NUM };
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
function getDown(model, key) {
  if (isUpBound(key)) {
    return { isCaret: false, index: FRAC_INDEX.NUM };
  } else if (key.index === FRAC_INDEX.NUM) {
    return { isCaret: false, index: FRAC_INDEX.DENOM };
  } else {
    return getBoundDown();
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
    return { isCaret: false, index: FRAC_INDEX.DENOM };
  } else if (key.index === FRAC_INDEX.DENOM) {
    return { isCaret: false, index: FRAC_INDEX.NUM };
  } else {
    return getBoundUp();
  }
}
