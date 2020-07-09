export default class Scripts {
  _nucleus;
  _super;
  _sub;

  /**
   * @return {boolean}
   */
  isSubValid() {
    return this._sub !== undefined;
  }
  /**
   * @return {boolean}
   */
  isSuperValid() {
    return this._super !== undefined;
  }
  /**
   * @param {Object} node
   */
  set nucleus(node) {
    this._nucleus = node;
  }
  /**
   * @param {Object} node
   */
  set super(node) {
    this._super = node;
  }
  /**
   * @param {Object} node
   */
  set sub(node) {
    this._sub = node;
  }

  /**
   * @return {Object}
   */
  get nucleus() {
    return this._nucleus;
  }
  /**
   * @return {Object}
   */
  get super() {
    return this._super;
  }
  /**
   * @return {Object}
   */
  get sub() {
    return this._sub;
  }
}
