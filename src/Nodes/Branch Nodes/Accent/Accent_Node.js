import Document_Node from '../../Abstract/Document_Node';

export default class Accent_Node extends Document_Node {
  _accenter;
  _nucleus;

  /**
   * @param {Document_Node} node
   */
  set accenter(node) {
    this._accenter = node;
    this._behavior.accenterBehavior = node.behavior;
  }
  /**
   * @param {Document_Node} node
   */
  set nucleus(node) {
    this._nucleus = node;
    this._behavior.nucleusBehavior = node.behavior;
  }
}
