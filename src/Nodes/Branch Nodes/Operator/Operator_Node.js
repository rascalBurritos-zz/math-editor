import Document_Node from '../../Abstract/Document_Node';

export default class Operator_Node extends Document_Node {
  _upperLimit;
  _nucleus;
  _target;
  _lowerLimit;

  /**
   * @param {Document_Node} node
   */
  set upperLimit(node) {
    this._upperLimit = node;
    this._behavior.upperLimitBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set target(node) {
    this._target = node;
    this._behavior.targetBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set nucleus(node) {
    this._nucleus = node;
    this._behavior.nucleusBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set lowerLimit(node) {
    this._lowerLimit = node;
    this._behavior.lowerLimitBehavior = node.behavior;
  }
}
