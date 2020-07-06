import Document_Node from '../../../Abstract/Document_Node';

export default class Scripts_Node extends Document_Node {
  _superscript;
  _nucleus;
  _subscript;

  /**
   * @param {Document_Node} node
   */
  set superscript(node) {
    this._superscript = node;
    this._behavior.superBehavior = node.behavior;
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
  set subscript(node) {
    this._subscript = node;
    this._behavior.subBehavior = node.behavior;
  }
}
