/**
 * @typedef {Object} NODEmethods
 * @property {Function} nextItemOnCaretPath
 * @property {Function} nextItem
 * @property {Function} getBoxKeyClosestToPoint
 * @property {Function} getRelativePositionOfBox
 * @property {Function} insertAtBoxKey
 * @property {Function} [getCaretStyle]
 * @property {Function} [expandSelection]
 * @property {Function} [getElements]
 */

import Rectangle from '../../Abstract/Rectangle';
import Point from '../../Abstract/Point';

export const NodeTable = {
  _nodePool: {},
  /**
   *
   * @param {String} type
   * @param {NODEmethods} nodeFuncObj
   */
  register: function (type, nodeFuncObj) {
    this._nodePool[type] = nodeFuncObj;
  },
  retrieve: function (type) {
    return this._nodePool[type];
  },
};

/**
 * @typedef {Object} ATOMmethods
 * @property {Function} [getOwnRect]
 */

export const AtomTable = {
  _atomPool: {},
  /**
   * @param {String} type
   * @param {ATOMmethods} funcObj
   */
  register: function (type, funcObj) {
    this._atomPool[type] = funcObj;
  },
  retrieve: function (type) {
    return this._atomPool[type];
  },
  isAtom: function (type) {
    return type in this._atomPool;
  },
  getOwnRect: function (viewCollection, id) {
    const { height, width } = viewCollection[id].componentStyle;
    return new Rectangle(new Point(0, 0), height, width);
  },
};

/**
 * @typedef {Object} COMPOUNDmethods
 * @property {Function} getModelIndex
 * @property {Function} splice
 * @property {Function} merge
 * @property {Function} getSelectionRects
 * @property {Function} sort
 */

export const CompoundTable = {
  _compoundPool: {},
  /**
   * @param {String} type
   * @param {COMPOUNDmethods} funcObj
   */
  register: function (type, funcObj) {
    this._compoundPool[type] = funcObj;
  },
  retrieve: function (type) {
    return this._compoundPool[type];
  },
  isCompound: function (type) {
    return type in this._compoundPool;
  },
};

/**
 * @typedef {Object} PARSERmethods
 * @property {Function} wordify
 */

export const ParserTable = {
  _parserPool: {},
  /**
   * @param {String} type
   * @param {PARSERmethods} funcObj
   */
  register: function (type, funcObj) {
    this._parserPool[type] = funcObj;
  },
  retrieve: function (type) {
    return this._parserPool[type];
  },
};
