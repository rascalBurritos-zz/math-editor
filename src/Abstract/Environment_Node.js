import Document_Node from './Document_Node';

/**
 * @class
 */
export default class Environment_Node extends Document_Node {
  /**
   */
  updateChildBehavior() {
    this._behavior.childBehavior = this._child.behavior;
  }

  /**
   * @param {Document_Node} child Node array to
   *  set elements to
   */
  set child(child) {
    this._child = child;
    this.updateChildBehavior();
  }

  /**
   * @return {Document_Node}
   */
  get child() {
    return this._child;
  }
}
