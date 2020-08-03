/**
 * @typedef {Object} NODEmethods
 * @property {Function} nextItemOnCaretPath
 * @property {Function} nextItem
 * @property {Function} getBoxKeyClosestToPoint
 * @property {Function} getRelativePositionOfBox
 * @property {Function} [getCaretStyle]
 * @property {Function} [combineRects]
 */

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
 * @property {Function} setModel
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
};

/**
 * @typedef {Object} COMPOUNDmethods
 * @property {Function} getInsertIndex
 * @property {Function} getModelIndex
 * @property {Function} splice
 * @property {Function} merge
 * @property {Function} getSelectionRects
 * @property {Function} getElements
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
