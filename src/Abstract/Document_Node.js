/** @typedef {import('./MathBehavior.js').default} MathBehavior  */

export default class Document_Node {
  _behavior;
  /**
   *
   * @param {MathBehavior} behavior
   */
  constructor(behavior) {
    this._behavior = behavior;
  }
  /**
   * @return {MathBehavior}
   */
  get behavior() {
    return this._behavior;
  }
}
