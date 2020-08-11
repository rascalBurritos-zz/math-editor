import {
  AccessContainer,
  ACCESS_TYPE,
} from '../../../Interaction/Access/access';
import { FORMULA_TYPE } from '../../Functional/Node Types';
import { getChildViewsFromId } from '../../Functional/getChildViews';
import { NodeTable } from '../../../Interaction/Tables/nodeTable';
import {
  nextItemGenerator,
  isLeftBound,
  isRightBound,
} from '../../Functional/BaseModel';
import { getDirection } from '../../Functional/Text Block/TextBlockNode';
import Point from '../../../Abstract/Point';

AccessContainer.register(
  FORMULA_TYPE,
  (model, boxKey) => {
    const index = Math.floor(boxKey.index / 2);
    const block = model.elements[index];
    return block;
  },
  ACCESS_TYPE.MODEL
);
AccessContainer.register(
  FORMULA_TYPE,
  (view, boxKey, viewCollection) => {
    const elements = getChildViewsFromId(viewCollection, view.id);
    const index = Math.floor(boxKey.index / 2);
    const block = elements[index];
    return block;
  },
  ACCESS_TYPE.VIEW
);

const nextItem = nextItemGenerator(getDirection(minIndex, maxIndex));
const nextItemOnCaretPath = nextItem;

NodeTable.register(FORMULA_TYPE, {
  nextItem,
  nextItemOnCaretPath,
  insertAtBoxKey,
  getBoxKeyClosestToPoint,
  getRelativePositionOfBox,
  getElements,
});

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} point
 * @return {Object}
 */
function getBoxKeyClosestToPoint(viewCollection, id, point) {
  const childViews = getChildViewsFromId(viewCollection, id);
  let progress = 0;
  for (let i = 0; i < childViews.length; i++) {
    if (progress > point.left) {
      return { isCaret: true, index: i * 2 };
    }
    const cs = childViews[i].componentStyle;
    progress += cs.width;
    if (progress > point.left) {
      return { isCaret: false, index: i * 2 + 1 };
    }
    progress += cs.marginRight;
  }
  return { isCaret: true, index: childViews.length * 2 };
}

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} key
 * @return {Point}
 */
export function getRelativePositionOfBox(viewCollection, id, key) {
  const childViews = getChildViewsFromId(viewCollection, id);
  const numModels = Math.floor(key.index / 2);
  let left = 0;
  for (let i = 0; i < numModels; i++) {
    const cs = childViews[i];
    left += cs.width;
  }
  const numMargins = Math.floor(key.index / 2 - 1);
  for (let i = 0; i < numMargins; i++) {
    const cs = childViews[i];
    left += cs.marginRight;
  }
  let index = Math.floor(key.index / 2) - 1;
  index = index < 0 ? 0 : index;
  const top = childViews[index].componentStyle.marginTop;
  return new Point(top, left);
}

/**
 * @param {*} model
 * @return {Array}
 */
function getElements(model) {
  return model.elementsl;
}

/**
 * @param {*} model
 * @param {*} key
 * @param {*} toInsert
 * @return {*} insertedKeychain
 */
function insertAtBoxKey(model, key, toInsert) {
  let insertIndex;
  const index = Math.floor(key.index / 2);
  let elements = model.elements;
  if (isLeftBound(key)) {
    elements = [toInsert, ...model.content];
    insertIndex = 1;
  } else if (isRightBound(key)) {
    elements = [...model.content, toInsert];
    insertIndex = model.elements.length * 2 - 1;
  } else if (key.index % 2 == 0) {
    elements.splice(index, 0, toInsert);
    insertIndex = 2 * index + 1;
  } else {
    elements[index] = toInsert;
    insertIndex = 2 * index + 1;
  }
  model.elements = elements;
  return [{ isCaret: false, index: insertIndex }];
}

/**
 *@return {number}
 */
function minIndex() {
  return 0;
}
/**
 * @param {*} model
 * @return {number}
 */
function maxIndex(model) {
  return model.elements.length * 2;
}