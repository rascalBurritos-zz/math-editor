/** @typedef {import('./Behavior.js').default} Behavior  */

export default class Document_Node {
  _behavior;
  /**
   *
   * @param {Behavior} behavior
   */
  constructor(behavior) {
    this._behavior = behavior;
  }
  /**
   * @return {Behavior}
   */
  get behavior() {
    return this._behavior;
  }
}
